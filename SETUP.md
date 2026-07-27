# Настройка Firebase и деплой

## 1. Firebase (контент + логин админки)

Проект **уже создан и настроен** (проект `liutswim`, аккаунт valvdov@gmail.com):

- ✅ Firebase-проект `liutswim` + web-приложение
- ✅ Firestore Database, регион `europe-west2 (London)`
- ✅ Правила безопасности из `firestore.rules` задеплоены
  (редактировать могут только: liutswim@gmail.com, valvdov@gmail.com —
  при изменении списка синхронно меняйте `ADMIN_EMAILS` в env и передеплойте
  правила: `firebase deploy --only firestore`)
- ✅ Вход по Email/Password включён
- ✅ Конфиг вписан в `.env.local`

**Остался один ручной шаг** — создать аккаунт(ы) администратора:

[console.firebase.google.com](https://console.firebase.google.com/project/liutswim/authentication/users)
→ **Authentication → Users → Add user** — email `liutswim@gmail.com` (и/или
`valvdov@gmail.com`) + надёжный пароль. Это логин для `/admin`.

Готово: откройте `http://localhost:3000/admin`, войдите, отредактируйте что-нибудь,
нажмите «Сохранить и опубликовать» — изменение появится на сайте.

## 2. Деплой на Vercel

1. Запушьте ветку на GitHub.
2. [vercel.com](https://vercel.com) → **Add New → Project** → импортируйте репозиторий.
   Vercel сам определит Next.js — ничего менять не нужно.
3. В **Settings → Environment Variables** добавьте все переменные из `.env.local`
   (EmailJS + Firebase + `ADMIN_EMAILS`).
4. Deploy. Проверьте preview-URL: сайт, `/ru`, `/admin`.
5. **Домен** (куплен на names.co.uk, DNS управляется там же):
   1. В Vercel: Settings → Domains → добавьте три домена:
      `liutswim.co.uk`, `www.liutswim.co.uk`, `admin.liutswim.co.uk`.
      Vercel покажет для каждого нужную DNS-запись.
   2. В панели names.co.uk (управление DNS домена liutswim.co.uk):
      - запись **A @** `75.2.60.5` (Netlify) → замените на IP, который покажет
        Vercel (обычно `76.76.21.21`);
      - **www** → CNAME `cname.vercel-dns.com`;
      - добавьте **admin** → CNAME `cname.vercel-dns.com`.
   3. Подождите 10–60 минут (обновление DNS). Vercel сам выпустит SSL-сертификаты —
      в Domains все три станут зелёными «Valid Configuration».
   4. В Firebase Console → Authentication → Settings → **Authorized domains** —
      добавьте `liutswim.co.uk` и `admin.liutswim.co.uk` (для входа в админку).
   5. Netlify пока не удаляйте — просто убедитесь, что сайт открывается с Vercel
      (по заголовкам/новому виду), после этого сайт на Netlify можно остановить.

## 3. После переезда (SEO)

1. [Google Search Console](https://search.google.com/search-console) — сайт уже
   верифицирован метатегом; отправьте карту сайта: `https://liutswim.co.uk/sitemap.xml`.
2. Проверьте страницы через **URL Inspection** → Request indexing (`/` и `/ru`).
3. Через 1–2 недели проверьте в отчёте Core Web Vitals, что показатели зелёные.
