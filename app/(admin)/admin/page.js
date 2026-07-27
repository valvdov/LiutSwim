'use client';

import React, {useEffect, useState} from 'react';
import {getFirebase, firebaseConfigured} from '@/lib/firebaseClient';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {doc, getDoc, setDoc, serverTimestamp} from 'firebase/firestore';
import defaultContent from '@/content/defaults';

// ---------------------------------------------------------------------------
// The admin UI itself is bilingual (RU/EN toggle in the header). Labels are
// {ru, en} objects resolved through tx(); tx also accepts plain strings.
// ---------------------------------------------------------------------------
const tx = (v, lang) => (typeof v === 'string' ? v : (v?.[lang] ?? v?.ru ?? ''));

const UI = {
    ru: {
        adminTitle: 'Liut Swim — админка',
        demoStatus: 'Демо-режим: изменения не сохраняются',
        save: 'Сохранить и опубликовать', saved: 'Сохранено', demoBtn: 'Демо',
        signout: 'Выйти',
        siteStructure: 'Структура сайта',
        legend1: '✏️ — можно менять здесь', legend2: '🔒 — статичный текст (меняется в коде)',
        editableTip: 'Редактируемый блок', staticTip: 'Статичный блок',
        staticNote1: 'Этот блок — статичный: его текст задаётся в коде сайта',
        staticNote1b: 'и меняется редко.',
        staticWhat: 'Что внутри: ',
        staticNote2: 'Если нужно поменять текст здесь — напишите разработчику, или попросите вынести этот блок в редактируемые.',
        up: 'Вверх', down: 'Вниз', hide: 'Скрыть', show: 'Показать',
        hiddenBadge: 'скрыт с сайта',
        hideTip: 'Скрытый элемент не показывается на сайте, но остаётся здесь',
        del: 'Удалить', confirmDel: 'Удалить элемент?', add: '+ Добавить',
        loading: 'Загрузка…', loadingContent: 'Загрузка контента…',
        signinTitle: 'Liut Swim — вход', password: 'Пароль', signin: 'Войти',
        loginError: 'Не удалось войти: проверьте email и пароль.',
        notConfiguredTitle: 'Админка не настроена',
        notConfiguredText1: 'Заполните переменные', notConfiguredText2: 'в',
        notConfiguredText3: '(см.', notConfiguredText4: 'в корне проекта), затем перезапустите сайт.',
        demoView: 'Посмотреть интерфейс (демо, без сохранения)',
        stSaving: 'Сохранение…',
        stSavedUpdating: 'Сохранено. Обновляем сайт…',
        stLive: 'Сохранено — изменения уже на сайте.',
        stDelayed: 'Сохранено. Сайт обновится в течение часа (ревалидация не сработала).',
        errLoad: 'Ошибка загрузки: ', errSave: 'Ошибка сохранения: ',
        upload: 'Загрузить фото', uploading: 'Загрузка…',
        uploadDemo: 'В демо-режиме загрузка фото недоступна',
        uploadErr: 'Не удалось загрузить фото: ',
        orPath: 'или путь к файлу (напр. /images/Anna_new.jpg)',
        manualPaths: 'Пути к файлам вручную', removePhoto: 'Убрать фото',
        photoLeft: 'Передвинуть раньше', photoRight: 'Передвинуть позже',
    },
    en: {
        adminTitle: 'Liut Swim — admin',
        demoStatus: 'Demo mode: changes are not saved',
        save: 'Save & publish', saved: 'Saved', demoBtn: 'Demo',
        signout: 'Sign out',
        siteStructure: 'Site structure',
        legend1: '✏️ — editable here', legend2: '🔒 — static copy (changed in code)',
        editableTip: 'Editable block', staticTip: 'Static block',
        staticNote1: 'This block is static: its copy lives in the site code',
        staticNote1b: 'and rarely changes.',
        staticWhat: 'What is inside: ',
        staticNote2: 'If you need to change this copy — contact the developer, or ask to make this block editable.',
        up: 'Move up', down: 'Move down', hide: 'Hide', show: 'Show',
        hiddenBadge: 'hidden from site',
        hideTip: 'A hidden item is not shown on the site but stays here',
        del: 'Delete', confirmDel: 'Delete this item?', add: '+ Add',
        loading: 'Loading…', loadingContent: 'Loading content…',
        signinTitle: 'Liut Swim — sign in', password: 'Password', signin: 'Sign in',
        loginError: 'Could not sign in: check your email and password.',
        notConfiguredTitle: 'Admin is not configured',
        notConfiguredText1: 'Fill in the', notConfiguredText2: 'variables in',
        notConfiguredText3: '(see', notConfiguredText4: 'in the project root), then restart the site.',
        demoView: 'Browse the interface (demo, no saving)',
        stSaving: 'Saving…',
        stSavedUpdating: 'Saved. Updating the site…',
        stLive: 'Saved — the changes are live.',
        stDelayed: 'Saved. The site will update within an hour (revalidation failed).',
        errLoad: 'Failed to load: ', errSave: 'Failed to save: ',
        upload: 'Upload photo', uploading: 'Uploading…',
        uploadDemo: 'Photo upload is unavailable in demo mode',
        uploadErr: 'Failed to upload the photo: ',
        orPath: 'or a file path (e.g. /images/Anna_new.jpg)',
        manualPaths: 'Edit file paths manually', removePhoto: 'Remove photo',
        photoLeft: 'Move earlier', photoRight: 'Move later',
    },
};

// ---------------------------------------------------------------------------
// Photo upload: compressed in the browser (canvas → JPEG), stored as base64 in
// a Firestore `images/{id}` document, served by /api/img/{id}. Firestore docs
// max out at ~1MB, so quality steps down until the image fits.
// ---------------------------------------------------------------------------
async function compressToDataUrl(file, maxDim = 1920) {
    const img = await new Promise((resolve, reject) => {
        const i = new window.Image();
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error('bad image file'));
        i.src = URL.createObjectURL(file);
    });
    // Downscale in halving steps — a single big jump loses sharpness
    let source = img;
    let w = img.width, h = img.height;
    while (w / 2 > maxDim) {
        const half = document.createElement('canvas');
        half.width = Math.round(w / 2);
        half.height = Math.round(h / 2);
        const hctx = half.getContext('2d');
        hctx.imageSmoothingQuality = 'high';
        hctx.drawImage(source, 0, 0, half.width, half.height);
        source = half;
        w = half.width;
        h = half.height;
    }
    const scale = Math.min(1, maxDim / Math.max(w, h));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(img.src);
    let quality = 0.92;
    let dataUrl = canvas.toDataURL('image/jpeg', quality);
    while (dataUrl.length > 950_000 && quality > 0.45) {
        quality -= 0.07;
        dataUrl = canvas.toDataURL('image/jpeg', quality);
    }
    return dataUrl;
}

async function uploadPhoto(file) {
    const dataUrl = await compressToDataUrl(file);
    const id = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    const {db, auth} = getFirebase();
    await setDoc(doc(db, 'images', id), {
        data: dataUrl,
        name: file.name,
        uploadedBy: auth.currentUser?.email || '',
        createdAt: serverTimestamp(),
    });
    return `/api/img/${id}`;
}

function UploadButton({onUploaded, demo, lang, multiple}) {
    const L = UI[lang];
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState('');
    if (demo) return <span className="adm-hint">{L.uploadDemo}</span>;
    return (
        <>
            <label className="adm-upload">
                {busy ? L.uploading : L.upload}
                <input type="file" accept="image/*" multiple={multiple} disabled={busy}
                       onChange={async (e) => {
                           const files = [...e.target.files];
                           e.target.value = '';
                           if (!files.length) return;
                           setBusy(true);
                           setErr('');
                           try {
                               const urls = [];
                               for (const f of files) urls.push(await uploadPhoto(f));
                               onUploaded(urls);
                           } catch (uploadError) {
                               setErr(L.uploadErr + uploadError.message);
                           }
                           setBusy(false);
                       }}/>
            </label>
            {err && <span className="adm-error">{err}</span>}
        </>
    );
}

// ---------------------------------------------------------------------------
// Section schemas: describe editable content so the editors below are generic.
// Field types: text | i18n (ru/en single line) | i18n-multi (ru/en textarea)
//              | i18n-list (ru/en, one item per line) | select
// ---------------------------------------------------------------------------
const SECTIONS = {
    services: {
        label: {ru: 'Услуги и цены', en: 'Services & prices'},
        type: 'array',
        itemLabel: (it, lang) =>
            it.title?.[lang] || it.title?.ru || it.title?.en || it.value
            || tx({ru: 'Услуга', en: 'Service'}, lang),
        fields: [
            {key: 'value', type: 'text', label: {ru: 'ID (латиницей, попадает в форму записи)', en: 'ID (latin letters, used in the booking form)'}},
            {key: 'title', type: 'i18n', label: {ru: 'Название', en: 'Title'}},
            {key: 'text', type: 'i18n-multi', label: {ru: 'Описание', en: 'Description'}},
            {key: 'price', type: 'i18n-multi', label: {ru: 'Цена (каждая строка — с новой строки)', en: 'Price (one entry per line)'}},
        ],
        blank: {value: '', title: {ru: '', en: ''}, text: {ru: '', en: ''}, price: {ru: '', en: ''}},
    },
    team: {
        label: {ru: 'Тренеры', en: 'Coaches'},
        type: 'array',
        itemLabel: (it, lang) =>
            it.name?.[lang] || it.name?.ru || it.name?.en
            || tx({ru: 'Тренер', en: 'Coach'}, lang),
        fields: [
            {key: 'id', type: 'text', label: {ru: 'ID (латиницей)', en: 'ID (latin letters)'}},
            {key: 'name', type: 'i18n', label: {ru: 'Имя', en: 'Name'}},
            {key: 'image', type: 'image', label: {ru: 'Фото', en: 'Photo'}},
            {key: 'bullets', type: 'i18n-list', label: {ru: 'Пункты о тренере (по одному на строку)', en: 'Bio bullet points (one per line)'}},
        ],
        blank: {id: '', name: {ru: '', en: ''}, image: '', bullets: {ru: [], en: []}},
    },
    locations: {
        label: {ru: 'Локации: адрес, часы, описание, фото', en: 'Locations: address, hours, description, photos'},
        type: 'array',
        itemLabel: (it, lang) => it.name || tx({ru: 'Локация', en: 'Location'}, lang),
        fields: [
            {key: 'id', type: 'text', label: {ru: 'ID (латиницей — адрес страницы: liutswim.co.uk/ID)', en: 'ID (latin letters — page URL: liutswim.co.uk/ID)'}},
            {key: 'name', type: 'text', label: {ru: 'Название', en: 'Name'}},
            {key: 'area', type: 'text', label: {ru: 'Район (для заголовка страницы, напр. Fulham)', en: 'Area (for the page heading, e.g. Fulham)'}},
            {key: 'address', type: 'text', label: {ru: 'Адрес', en: 'Address'}},
            {key: 'hours', type: 'i18n-list', label: {ru: 'Часы работы (по одному дню на строку)', en: 'Opening hours (one day per line)'}},
            {key: 'description', type: 'i18n-multi', label: {ru: 'Описание для страницы локации', en: 'Description for the location page'}},
            {key: 'photos', type: 'images', label: {ru: 'Фотографии', en: 'Photos'}},
        ],
        blank: {
            id: '', name: '', area: '', address: '',
            hours: {ru: [], en: []}, description: {ru: '', en: ''}, photos: [],
        },
    },
    reviews: {
        label: {ru: 'Отзывы', en: 'Reviews'},
        type: 'array',
        itemLabel: (it, lang) =>
            it.name?.[lang] || it.name?.ru || it.name?.en
            || tx({ru: 'Отзыв', en: 'Review'}, lang),
        fields: [
            {key: 'name', type: 'i18n', label: {ru: 'Имя', en: 'Name'}},
            {key: 'review_content', type: 'i18n-multi', label: {ru: 'Текст отзыва', en: 'Review text'}},
            {key: 'hashtag', type: 'i18n', label: {ru: 'Хэштег (без #)', en: 'Hashtag (without #)'}},
            {
                key: 'circle_tag', type: 'select', label: {ru: 'Аватар', en: 'Avatar'},
                options: [
                    {value: 'circletag-white-girl', label: {ru: 'Девушка (светлый фон)', en: 'Girl (light background)'}},
                    {value: 'circletag-black-girl', label: {ru: 'Девушка (тёмный фон)', en: 'Girl (dark background)'}},
                    {value: 'circletag-white-girl-curved', label: {ru: 'Девушка (кудрявая)', en: 'Girl (curly hair)'}},
                    {value: 'circletag-beard-man', label: {ru: 'Мужчина с бородой', en: 'Man with a beard'}},
                ],
            },
        ],
        blank: {
            circle_tag: 'circletag-white-girl',
            name: {ru: '', en: ''},
            review_content: {ru: '', en: ''},
            hashtag: {ru: '', en: ''},
        },
    },
    faqs: {
        label: 'FAQ',
        type: 'array',
        itemLabel: (it, lang) =>
            (it.question?.[lang] || it.question?.ru || it.question?.en
                || tx({ru: 'Вопрос', en: 'Question'}, lang)).slice(0, 60),
        fields: [
            {key: 'question', type: 'i18n-multi', label: {ru: 'Вопрос', en: 'Question'}},
            {key: 'answer', type: 'i18n-multi', label: {ru: 'Ответ', en: 'Answer'}},
        ],
        blank: {question: {ru: '', en: ''}, answer: {ru: '', en: ''}},
    },
    contacts: {
        label: {ru: 'Контакты', en: 'Contacts'},
        type: 'object',
        fields: [
            {key: 'phone', type: 'text', label: {ru: 'Телефон', en: 'Phone'}},
            {key: 'email', type: 'text', label: 'E-mail'},
            {key: 'facebook', type: 'text', label: {ru: 'Facebook (ссылка)', en: 'Facebook (link)'}},
            {key: 'instagram', type: 'text', label: {ru: 'Instagram (ссылка)', en: 'Instagram (link)'}},
        ],
    },
};

const CONTENT_DOC = ['site', 'content'];

// ---------------------------------------------------------------------------
// The site's page structure, top to bottom. The admin sidebar mirrors it so
// you edit "the block on the site", not abstract fields. Static blocks hold
// copy that lives in code (content/translations.js).
// ---------------------------------------------------------------------------
const BLOCKS = [
    {
        id: 'hero',
        label: {ru: 'Шапка + главный экран', en: 'Header + hero'},
        hint: {ru: 'Слоган «from non-swimmers to advanced», меню', en: 'The “from non-swimmers to advanced” slogan, menu'},
    },
    {
        id: 'about',
        label: {ru: 'О нас — 4 преимущества', en: 'About us — 4 highlights'},
        hint: {ru: 'Задания, среда, тренеры, атмосфера', en: 'Tasks, environment, coaches, atmosphere'},
    },
    {id: 'services', label: {ru: 'Услуги и цены', en: 'Services & prices'}, sections: ['services'], accent: true},
    {
        id: 'metodology',
        label: {ru: 'Методология', en: 'Methodology'},
        hint: {ru: 'Список из 5 пунктов', en: 'A list of 5 points'},
    },
    {id: 'mission', label: {ru: 'Миссия', en: 'Mission'}, hint: '«Driven by Passion»'},
    {
        id: 'team', label: {ru: 'Команда — тренеры', en: 'Team — coaches'}, sections: ['team'], accent: true,
        hint: {
            ru: 'Новый тренер: «+ Добавить» внизу списка. Фото загружается прямо здесь — кнопка «Загрузить фото» (сжимается автоматически). Пока фото нет, на сайте будет фирменная заглушка.',
            en: 'New coach: “+ Add” at the bottom of the list. Upload the photo right here via “Upload photo” (it is compressed automatically). Until then the site shows a branded placeholder.',
        },
    },
    {
        id: 'advantages',
        label: {ru: 'Преимущества', en: 'Advantages'},
        hint: {ru: '5 пунктов со значками', en: '5 points with icons'},
    },
    {
        id: 'loyalty',
        label: {ru: 'Программа лояльности', en: 'Loyalty programme'},
        hint: {ru: '50% / 10% / 6 месяцев', en: '50% / 10% / 6 months'},
    },
    {id: 'reviews', label: {ru: 'Отзывы', en: 'Reviews'}, sections: ['reviews'], accent: true},
    {
        id: 'register',
        label: {ru: 'Форма записи', en: 'Booking form'},
        hint: {
            ru: 'Списки «Услуга» и «Адрес» берутся из блоков «Услуги» и «Футер»',
            en: 'The “Service” and “Address” dropdowns come from the “Services” and “Footer” blocks',
        },
    },
    {id: 'faq', label: {ru: 'FAQ — вопросы и ответы', en: 'FAQ — questions & answers'}, sections: ['faqs'], accent: true},
    {
        id: 'question',
        label: {ru: '«Задать вопрос» + попап', en: '“Ask a question” + popup'},
        hint: {ru: 'Форма отправляет письмо на почту клуба', en: 'The form sends an email to the club'},
    },
    {
        id: 'footer',
        label: {ru: 'Футер — контакты', en: 'Footer — contacts'},
        sections: ['contacts'], accent: true,
        hint: {
            ru: 'Телефон, e-mail и соцсети. Адреса и часы в футере берутся из «Страниц локаций» ниже.',
            en: 'Phone, e-mail and social links. Addresses and hours in the footer come from “Location pages” below.',
        },
    },
    {
        id: 'locations',
        label: {ru: 'Страницы локаций (/fulham, /hounslow…)', en: 'Location pages (/fulham, /hounslow…)'},
        sections: ['locations'], accent: true,
        hint: {
            ru: 'Каждая локация — отдельная страница сайта с описанием, фото, часами и формой записи. Эти же данные показываются в футере и в форме «Адрес».',
            en: 'Each location is a separate page with a description, photos, hours and a booking form. The same data appears in the footer and the “Address” dropdown.',
        },
    },
];

function blockCount(block, content) {
    if (!block.sections) return null;
    let total = 0, hidden = 0, hasArray = false;
    for (const s of block.sections) {
        if (!Array.isArray(content?.[s])) continue;
        hasArray = true;
        total += content[s].length;
        hidden += content[s].filter((i) => i.hidden).length;
    }
    if (!hasArray) return null;
    return hidden ? `${total - hidden} +${hidden} 🙈` : String(total);
}

// --- Admin UI language toggle -------------------------------------------------

function LangToggle({lang, onChange}) {
    return (
        <span className="adm-lang" title="Язык админки / Admin language">
            {['ru', 'en'].map((l) => (
                <button key={l} type="button"
                        className={lang === l ? 'active' : ''}
                        onClick={() => onChange(l)}>
                    {l === 'ru' ? 'РУ' : 'EN'}
                </button>
            ))}
        </span>
    );
}

// --- Small generic field editors ---------------------------------------------

function TextField({label, value, onChange}) {
    return (
        <label className="adm-field">
            <span>{label}</span>
            <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)}/>
        </label>
    );
}

function I18nField({label, value, onChange, multi}) {
    const v = value || {ru: '', en: ''};
    const Input = multi ? 'textarea' : 'input';
    return (
        <div className="adm-field">
            <span>{label}</span>
            <div className="adm-i18n">
                {['ru', 'en'].map((lang) => (
                    <label key={lang} className="adm-i18n-col">
                        <em>{lang.toUpperCase()}</em>
                        <Input
                            value={v[lang] || ''}
                            rows={multi ? 4 : undefined}
                            onChange={(e) => onChange({...v, [lang]: e.target.value})}
                        />
                    </label>
                ))}
            </div>
        </div>
    );
}

function I18nListField({label, value, onChange}) {
    const v = value || {ru: [], en: []};
    return (
        <div className="adm-field">
            <span>{label}</span>
            <div className="adm-i18n">
                {['ru', 'en'].map((lang) => (
                    <label key={lang} className="adm-i18n-col">
                        <em>{lang.toUpperCase()}</em>
                        <textarea
                            rows={4}
                            value={(v[lang] || []).join('\n')}
                            onChange={(e) =>
                                onChange({...v, [lang]: e.target.value.split('\n')})
                            }
                        />
                    </label>
                ))}
            </div>
        </div>
    );
}

function LinesField({label, value, onChange}) {
    return (
        <label className="adm-field">
            <span>{label}</span>
            <textarea
                rows={3}
                value={(value || []).join('\n')}
                onChange={(e) => onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
            />
        </label>
    );
}

function ImageField({label, value, onChange, lang, demo}) {
    const L = UI[lang];
    return (
        <div className="adm-field">
            <span>{label}</span>
            <div className="adm-photo-row">
                {value && <img src={value} alt="" className="adm-thumb"/>}
                <UploadButton demo={demo} lang={lang} onUploaded={(urls) => onChange(urls[0])}/>
            </div>
            <label className="adm-subfield">
                <span>{L.orPath}</span>
                <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)}/>
            </label>
        </div>
    );
}

function ImagesField({label, value, onChange, lang, demo}) {
    const L = UI[lang];
    const photos = value || [];
    const move = (i, dir) => {
        const j = i + dir;
        if (j < 0 || j >= photos.length) return;
        const next = [...photos];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };
    return (
        <div className="adm-field">
            <span>{label}</span>
            <div className="adm-photo-grid">
                {photos.map((p, i) => (
                    <span key={p + i} className="adm-photo-cell">
                        <img src={p} alt="" className="adm-thumb"/>
                        <button type="button" className="adm-photo-del" title={L.removePhoto}
                                onClick={() => onChange(photos.filter((_, idx) => idx !== i))}>×</button>
                        {i > 0 && (
                            <button type="button" className="adm-photo-nav adm-photo-prev" title={L.photoLeft}
                                    onClick={() => move(i, -1)}>‹</button>
                        )}
                        {i < photos.length - 1 && (
                            <button type="button" className="adm-photo-nav adm-photo-next" title={L.photoRight}
                                    onClick={() => move(i, 1)}>›</button>
                        )}
                    </span>
                ))}
                <UploadButton demo={demo} lang={lang} multiple
                              onUploaded={(urls) => onChange([...photos, ...urls])}/>
            </div>
            <details className="adm-manual-paths">
                <summary>{L.manualPaths}</summary>
                <textarea
                    rows={3}
                    value={photos.join('\n')}
                    onChange={(e) => onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
                />
            </details>
        </div>
    );
}

function SelectField({label, value, options, onChange, lang}) {
    return (
        <label className="adm-field">
            <span>{label}</span>
            <select value={value || ''} onChange={(e) => onChange(e.target.value)}>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>{tx(o.label, lang)}</option>
                ))}
            </select>
        </label>
    );
}

function Field({field, value, onChange, lang, demo}) {
    const label = tx(field.label, lang);
    switch (field.type) {
        case 'i18n':
            return <I18nField label={label} value={value} onChange={onChange}/>;
        case 'i18n-multi':
            return <I18nField label={label} value={value} onChange={onChange} multi/>;
        case 'i18n-list':
            return <I18nListField label={label} value={value} onChange={onChange}/>;
        case 'lines':
            return <LinesField label={label} value={value} onChange={onChange}/>;
        case 'image':
            return <ImageField label={label} value={value} onChange={onChange} lang={lang} demo={demo}/>;
        case 'images':
            return <ImagesField label={label} value={value} onChange={onChange} lang={lang} demo={demo}/>;
        case 'select':
            return <SelectField label={label} value={value} options={field.options} onChange={onChange} lang={lang}/>;
        default:
            return <TextField label={label} value={value} onChange={onChange}/>;
    }
}

// --- Section editors ----------------------------------------------------------

function ArrayEditor({schema, items, onChange, lang, demo}) {
    const L = UI[lang];
    const move = (i, dir) => {
        const next = [...items];
        const j = i + dir;
        if (j < 0 || j >= next.length) return;
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };
    const remove = (i) => {
        if (!confirm(L.confirmDel)) return;
        onChange(items.filter((_, idx) => idx !== i));
    };
    const update = (i, key, value) => {
        onChange(items.map((it, idx) => (idx === i ? {...it, [key]: value} : it)));
    };

    return (
        <div>
            {items.map((item, i) => (
                <details key={i} className={`adm-item ${item.hidden ? 'adm-item-hidden' : ''}`}>
                    <summary>
                        <b>
                            {schema.itemLabel(item, lang)}
                            {item.hidden && <span className="adm-hidden-badge">{L.hiddenBadge}</span>}
                        </b>
                        <span className="adm-item-actions" onClick={(e) => e.preventDefault()}>
                            <button type="button" onClick={() => move(i, -1)} title={L.up}>↑</button>
                            <button type="button" onClick={() => move(i, 1)} title={L.down}>↓</button>
                            <button type="button" className="adm-hide-btn"
                                    title={L.hideTip}
                                    onClick={() => update(i, 'hidden', !item.hidden)}>
                                {item.hidden ? L.show : L.hide}
                            </button>
                            <button type="button" className="adm-danger" onClick={() => remove(i)}>{L.del}</button>
                        </span>
                    </summary>
                    <div className="adm-item-body">
                        {schema.fields.map((f) => (
                            <Field key={f.key} field={f} value={item[f.key]} lang={lang} demo={demo}
                                   onChange={(v) => update(i, f.key, v)}/>
                        ))}
                    </div>
                </details>
            ))}
            <button
                type="button"
                className="adm-add"
                onClick={() => onChange([...items, JSON.parse(JSON.stringify(schema.blank))])}
            >
                {L.add}
            </button>
        </div>
    );
}

function ObjectEditor({schema, value, onChange, lang, demo}) {
    return (
        <div className="adm-item-body">
            {schema.fields.map((f) => (
                <Field key={f.key} field={f} value={value?.[f.key]} lang={lang} demo={demo}
                       onChange={(v) => onChange({...value, [f.key]: v})}/>
            ))}
        </div>
    );
}

// --- Page ---------------------------------------------------------------------

export default function AdminPage() {
    const [user, setUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);
    const [content, setContent] = useState(null);
    const [blockId, setBlockId] = useState('services');
    // Status is stored as {key, msg} and rendered in the current UI language
    const [status, setStatus] = useState(null);
    const [dirty, setDirty] = useState(false);
    const [loginForm, setLoginForm] = useState({email: '', password: ''});
    const [loginError, setLoginError] = useState(false);
    // Demo mode: browse the admin UI on default content without Firebase (no saving)
    const [demo, setDemo] = useState(false);
    // Admin UI language; loaded from localStorage after mount (avoids hydration mismatch)
    const [uiLang, setUiLang] = useState('ru');
    const L = UI[uiLang];

    useEffect(() => {
        const saved = localStorage.getItem('adm-lang');
        if (saved === 'en' || saved === 'ru') setUiLang(saved);
    }, []);

    const changeUiLang = (l) => {
        setUiLang(l);
        localStorage.setItem('adm-lang', l);
    };

    useEffect(() => {
        if (demo && !content) {
            setContent(JSON.parse(JSON.stringify(defaultContent)));
        }
    }, [demo, content]);

    useEffect(() => {
        const fb = getFirebase();
        if (!fb) {
            setAuthReady(true);
            return;
        }
        return onAuthStateChanged(fb.auth, (u) => {
            setUser(u);
            setAuthReady(true);
        });
    }, []);

    useEffect(() => {
        if (!user) return;
        (async () => {
            const {db} = getFirebase();
            try {
                const snap = await getDoc(doc(db, ...CONTENT_DOC));
                if (snap.exists() && snap.data().json) {
                    setContent({...defaultContent, ...JSON.parse(snap.data().json)});
                } else {
                    setContent(JSON.parse(JSON.stringify(defaultContent)));
                }
            } catch (e) {
                setStatus({key: 'errLoad', msg: e.message});
                setContent(JSON.parse(JSON.stringify(defaultContent)));
            }
        })();
    }, [user]);

    const login = async (e) => {
        e.preventDefault();
        setLoginError(false);
        try {
            const {auth} = getFirebase();
            await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
        } catch (err) {
            setLoginError(true);
        }
    };

    const save = async () => {
        setStatus({key: 'stSaving'});
        try {
            const {db, auth} = getFirebase();
            await setDoc(doc(db, ...CONTENT_DOC), {
                json: JSON.stringify(content),
                updatedAt: serverTimestamp(),
                updatedBy: auth.currentUser?.email || '',
            });
            setDirty(false);
            setStatus({key: 'stSavedUpdating'});
            const token = await auth.currentUser.getIdToken();
            const res = await fetch('/api/revalidate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token}),
            });
            setStatus({key: res.ok ? 'stLive' : 'stDelayed'});
        } catch (e) {
            setStatus({key: 'errSave', msg: e.message});
        }
    };

    const updateSection = (key, value) => {
        setContent({...content, [key]: value});
        setDirty(true);
    };

    // --- render states ---
    if (!firebaseConfigured && !demo) {
        return (
            <div className="adm-center">
                <div className="adm-card">
                    <h1>{L.notConfiguredTitle} <LangToggle lang={uiLang} onChange={changeUiLang}/></h1>
                    <p>{L.notConfiguredText1} <code>NEXT_PUBLIC_FIREBASE_*</code> {L.notConfiguredText2}{' '}
                        <code>.env.local</code> {L.notConfiguredText3} <code>SETUP.md</code> {L.notConfiguredText4}</p>
                    <button className="adm-demo-btn" onClick={() => setDemo(true)}>
                        {L.demoView}
                    </button>
                </div>
            </div>
        );
    }

    if (!demo && !authReady) {
        return <div className="adm-center"><p>{L.loading}</p></div>;
    }

    if (!demo && !user) {
        return (
            <div className="adm-center">
                <form className="adm-card adm-login" onSubmit={login}>
                    <h1>{L.signinTitle} <LangToggle lang={uiLang} onChange={changeUiLang}/></h1>
                    <input type="email" placeholder="Email" autoComplete="username" required
                           value={loginForm.email}
                           onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}/>
                    <input type="password" placeholder={L.password} autoComplete="current-password" required
                           value={loginForm.password}
                           onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}/>
                    {loginError && <p className="adm-error">{L.loginError}</p>}
                    <button type="submit">{L.signin}</button>
                </form>
            </div>
        );
    }

    if (!content) {
        return <div className="adm-center"><p>{L.loadingContent}</p></div>;
    }

    const block = BLOCKS.find((b) => b.id === blockId) || BLOCKS[0];
    const statusText = status ? L[status.key] + (status.msg || '') : '';

    return (
        <div className="adm-layout">
            <header className="adm-header">
                <b>{L.adminTitle}</b>
                <span className="adm-status">{demo ? L.demoStatus : statusText}</span>
                <div className="adm-header-actions">
                    <LangToggle lang={uiLang} onChange={changeUiLang}/>
                    <button className="adm-save" onClick={save} disabled={!dirty || demo}>
                        {demo ? L.demoBtn : dirty ? L.save : L.saved}
                    </button>
                    {!demo && (
                        <button className="adm-signout" onClick={() => signOut(getFirebase().auth)}>{L.signout}</button>
                    )}
                </div>
            </header>
            <div className="adm-columns">
                <nav className="adm-page-map">
                    <p className="adm-map-title">{L.siteStructure}</p>
                    {BLOCKS.map((b) => {
                        const count = blockCount(b, content);
                        const editable = Boolean(b.sections);
                        return (
                            <button
                                key={b.id}
                                className={[
                                    'adm-block',
                                    editable ? 'adm-block-editable' : 'adm-block-static',
                                    blockId === b.id ? 'active' : '',
                                ].join(' ')}
                                onClick={() => setBlockId(b.id)}
                                title={editable ? L.editableTip : L.staticTip}
                            >
                                <span className="adm-block-label">
                                    {editable ? '✏️ ' : '🔒 '}{tx(b.label, uiLang)}
                                </span>
                                {count !== null && <span className="adm-block-count">{count}</span>}
                            </button>
                        );
                    })}
                    <p className="adm-map-legend">{L.legend1}<br/>{L.legend2}</p>
                </nav>
                <main className="adm-main">
                    <h2>{tx(block.label, uiLang)}</h2>
                    {!block.sections ? (
                        <div className="adm-static-note">
                            <p>{L.staticNote1} (<code>content/translations.js</code>) {L.staticNote1b}</p>
                            {block.hint && <p className="adm-hint">{L.staticWhat}{tx(block.hint, uiLang)}</p>}
                            <p className="adm-hint">{L.staticNote2}</p>
                        </div>
                    ) : (
                        <>
                            {block.hint && <p className="adm-hint">{tx(block.hint, uiLang)}</p>}
                            {block.sections.map((key) => {
                                const schema = SECTIONS[key];
                                return (
                                    <section key={key} className="adm-section">
                                        {block.sections.length > 1 && <h3>{tx(schema.label, uiLang)}</h3>}
                                        {schema.type === 'array' ? (
                                            <ArrayEditor schema={schema} items={content[key] || []} lang={uiLang}
                                                         demo={demo} onChange={(v) => updateSection(key, v)}/>
                                        ) : (
                                            <ObjectEditor schema={schema} value={content[key] || {}} lang={uiLang}
                                                          demo={demo} onChange={(v) => updateSection(key, v)}/>
                                        )}
                                    </section>
                                );
                            })}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
