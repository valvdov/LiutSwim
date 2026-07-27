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
5. **Домен**: Settings → Domains → добавьте `liutswim.co.uk` и `www.liutswim.co.uk`,
   затем у регистратора домена поменяйте DNS-записи на те, что покажет Vercel
   (A-запись `76.76.21.21` и CNAME для www). Старый хостинг (Netlify) можно
   отключить после переключения DNS.

## 3. После переезда (SEO)

1. [Google Search Console](https://search.google.com/search-console) — сайт уже
   верифицирован метатегом; отправьте карту сайта: `https://liutswim.co.uk/sitemap.xml`.
2. Проверьте страницы через **URL Inspection** → Request indexing (`/` и `/ru`).
3. Через 1–2 недели проверьте в отчёте Core Web Vitals, что показатели зелёные.
