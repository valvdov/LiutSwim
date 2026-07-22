'use client';

import React, {useEffect, useState} from 'react';
import {getFirebase, firebaseConfigured} from '@/lib/firebaseClient';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {doc, getDoc, setDoc, serverTimestamp} from 'firebase/firestore';
import defaultContent from '@/content/defaults';

// ---------------------------------------------------------------------------
// Section schemas: describe editable content so the editors below are generic.
// Field types: text | i18n (ru/en single line) | i18n-multi (ru/en textarea)
//              | i18n-list (ru/en, one item per line) | select
// ---------------------------------------------------------------------------
const SECTIONS = {
    services: {
        label: 'Услуги и цены',
        type: 'array',
        itemLabel: (it) => it.title?.ru || it.title?.en || it.value || 'Услуга',
        fields: [
            {key: 'value', type: 'text', label: 'ID (латиницей, попадает в форму записи)'},
            {key: 'title', type: 'i18n', label: 'Название'},
            {key: 'text', type: 'i18n-multi', label: 'Описание'},
            {key: 'price', type: 'i18n-multi', label: 'Цена (каждая строка — с новой строки)'},
        ],
        blank: {value: '', title: {ru: '', en: ''}, text: {ru: '', en: ''}, price: {ru: '', en: ''}},
    },
    team: {
        label: 'Тренеры',
        type: 'array',
        itemLabel: (it) => it.name?.ru || it.name?.en || 'Тренер',
        fields: [
            {key: 'id', type: 'text', label: 'ID (латиницей)'},
            {key: 'name', type: 'i18n', label: 'Имя'},
            {key: 'image', type: 'text', label: 'Фото (путь, напр. /images/Anna_new.jpg)'},
            {key: 'bullets', type: 'i18n-list', label: 'Пункты о тренере (по одному на строку)'},
        ],
        blank: {id: '', name: {ru: '', en: ''}, image: '/images/Anna_new.jpg', bullets: {ru: [], en: []}},
    },
    locations: {
        label: 'Локации и часы',
        type: 'array',
        itemLabel: (it) => it.name || 'Локация',
        fields: [
            {key: 'id', type: 'text', label: 'ID (латиницей, попадает в форму записи)'},
            {key: 'name', type: 'text', label: 'Название'},
            {key: 'address', type: 'text', label: 'Адрес'},
            {key: 'hours', type: 'i18n-list', label: 'Часы работы (по одному дню на строку)'},
        ],
        blank: {id: '', name: '', address: '', hours: {ru: [], en: []}},
    },
    reviews: {
        label: 'Отзывы',
        type: 'array',
        itemLabel: (it) => it.name?.ru || it.name?.en || 'Отзыв',
        fields: [
            {key: 'name', type: 'i18n', label: 'Имя'},
            {key: 'review_content', type: 'i18n-multi', label: 'Текст отзыва'},
            {key: 'hashtag', type: 'i18n', label: 'Хэштег (без #)'},
            {
                key: 'circle_tag', type: 'select', label: 'Аватар',
                options: [
                    {value: 'circletag-white-girl', label: 'Девушка (светлый фон)'},
                    {value: 'circletag-black-girl', label: 'Девушка (тёмный фон)'},
                    {value: 'circletag-white-girl-curved', label: 'Девушка (кудрявая)'},
                    {value: 'circletag-beard-man', label: 'Мужчина с бородой'},
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
        itemLabel: (it) => (it.question?.ru || it.question?.en || 'Вопрос').slice(0, 60),
        fields: [
            {key: 'question', type: 'i18n-multi', label: 'Вопрос'},
            {key: 'answer', type: 'i18n-multi', label: 'Ответ'},
        ],
        blank: {question: {ru: '', en: ''}, answer: {ru: '', en: ''}},
    },
    contacts: {
        label: 'Контакты',
        type: 'object',
        fields: [
            {key: 'phone', type: 'text', label: 'Телефон'},
            {key: 'email', type: 'text', label: 'E-mail'},
            {key: 'facebook', type: 'text', label: 'Facebook (ссылка)'},
            {key: 'instagram', type: 'text', label: 'Instagram (ссылка)'},
        ],
    },
};

const CONTENT_DOC = ['site', 'content'];

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

function SelectField({label, value, options, onChange}) {
    return (
        <label className="adm-field">
            <span>{label}</span>
            <select value={value || ''} onChange={(e) => onChange(e.target.value)}>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </label>
    );
}

function Field({field, value, onChange}) {
    switch (field.type) {
        case 'i18n':
            return <I18nField label={field.label} value={value} onChange={onChange}/>;
        case 'i18n-multi':
            return <I18nField label={field.label} value={value} onChange={onChange} multi/>;
        case 'i18n-list':
            return <I18nListField label={field.label} value={value} onChange={onChange}/>;
        case 'select':
            return <SelectField label={field.label} value={value} options={field.options} onChange={onChange}/>;
        default:
            return <TextField label={field.label} value={value} onChange={onChange}/>;
    }
}

// --- Section editors ----------------------------------------------------------

function ArrayEditor({schema, items, onChange}) {
    const move = (i, dir) => {
        const next = [...items];
        const j = i + dir;
        if (j < 0 || j >= next.length) return;
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };
    const remove = (i) => {
        if (!confirm('Удалить элемент?')) return;
        onChange(items.filter((_, idx) => idx !== i));
    };
    const update = (i, key, value) => {
        onChange(items.map((it, idx) => (idx === i ? {...it, [key]: value} : it)));
    };

    return (
        <div>
            {items.map((item, i) => (
                <details key={i} className="adm-item">
                    <summary>
                        <b>{schema.itemLabel(item)}</b>
                        <span className="adm-item-actions" onClick={(e) => e.preventDefault()}>
                            <button type="button" onClick={() => move(i, -1)} title="Вверх">↑</button>
                            <button type="button" onClick={() => move(i, 1)} title="Вниз">↓</button>
                            <button type="button" className="adm-danger" onClick={() => remove(i)}>Удалить</button>
                        </span>
                    </summary>
                    <div className="adm-item-body">
                        {schema.fields.map((f) => (
                            <Field key={f.key} field={f} value={item[f.key]}
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
                + Добавить
            </button>
        </div>
    );
}

function ObjectEditor({schema, value, onChange}) {
    return (
        <div className="adm-item-body">
            {schema.fields.map((f) => (
                <Field key={f.key} field={f} value={value?.[f.key]}
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
    const [tab, setTab] = useState('services');
    const [status, setStatus] = useState('');
    const [dirty, setDirty] = useState(false);
    const [loginForm, setLoginForm] = useState({email: '', password: ''});
    const [loginError, setLoginError] = useState('');

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
                setStatus('Ошибка загрузки: ' + e.message);
                setContent(JSON.parse(JSON.stringify(defaultContent)));
            }
        })();
    }, [user]);

    const login = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const {auth} = getFirebase();
            await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
        } catch (err) {
            setLoginError('Не удалось войти: проверьте email и пароль.');
        }
    };

    const save = async () => {
        setStatus('Сохранение…');
        try {
            const {db, auth} = getFirebase();
            await setDoc(doc(db, ...CONTENT_DOC), {
                json: JSON.stringify(content),
                updatedAt: serverTimestamp(),
                updatedBy: auth.currentUser?.email || '',
            });
            setDirty(false);
            setStatus('Сохранено. Обновляем сайт…');
            const token = await auth.currentUser.getIdToken();
            const res = await fetch('/api/revalidate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token}),
            });
            setStatus(res.ok
                ? 'Сохранено — изменения уже на сайте.'
                : 'Сохранено. Сайт обновится в течение часа (ревалидация не сработала).');
        } catch (e) {
            setStatus('Ошибка сохранения: ' + e.message);
        }
    };

    const updateSection = (key, value) => {
        setContent({...content, [key]: value});
        setDirty(true);
    };

    // --- render states ---
    if (!firebaseConfigured) {
        return (
            <div className="adm-center">
                <div className="adm-card">
                    <h1>Админка не настроена</h1>
                    <p>Заполните переменные <code>NEXT_PUBLIC_FIREBASE_*</code> в <code>.env.local</code> (см.
                        <code> SETUP.md</code> в корне проекта), затем перезапустите сайт.</p>
                </div>
            </div>
        );
    }

    if (!authReady) {
        return <div className="adm-center"><p>Загрузка…</p></div>;
    }

    if (!user) {
        return (
            <div className="adm-center">
                <form className="adm-card adm-login" onSubmit={login}>
                    <h1>Liut Swim — вход</h1>
                    <input type="email" placeholder="Email" autoComplete="username" required
                           value={loginForm.email}
                           onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}/>
                    <input type="password" placeholder="Пароль" autoComplete="current-password" required
                           value={loginForm.password}
                           onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}/>
                    {loginError && <p className="adm-error">{loginError}</p>}
                    <button type="submit">Войти</button>
                </form>
            </div>
        );
    }

    if (!content) {
        return <div className="adm-center"><p>Загрузка контента…</p></div>;
    }

    const schema = SECTIONS[tab];

    return (
        <div className="adm-layout">
            <header className="adm-header">
                <b>Liut Swim — админка</b>
                <span className="adm-status">{status}</span>
                <div>
                    <button className="adm-save" onClick={save} disabled={!dirty}>
                        {dirty ? 'Сохранить и опубликовать' : 'Сохранено'}
                    </button>
                    <button className="adm-signout" onClick={() => signOut(getFirebase().auth)}>Выйти</button>
                </div>
            </header>
            <nav className="adm-tabs">
                {Object.entries(SECTIONS).map(([key, s]) => (
                    <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>
                        {s.label}
                    </button>
                ))}
            </nav>
            <main className="adm-main">
                <h2>{schema.label}</h2>
                {schema.type === 'array' ? (
                    <ArrayEditor schema={schema} items={content[tab] || []}
                                 onChange={(v) => updateSection(tab, v)}/>
                ) : (
                    <ObjectEditor schema={schema} value={content[tab] || {}}
                                  onChange={(v) => updateSection(tab, v)}/>
                )}
            </main>
        </div>
    );
}
