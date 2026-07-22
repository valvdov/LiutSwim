# Настройка Firebase и деплой

## 1. Firebase (контент + логин админки)

1. Зайдите на [console.firebase.google.com](https://console.firebase.google.com) → **Add project**
   (например, `liutswim`). Google Analytics можно не включать.
2. **Build → Firestore Database → Create database** → Production mode → регион `europe-west2 (London)`.
3. **Build → Authentication → Get started → Sign-in method** → включите **Email/Password**.
4. Там же во вкладке **Users → Add user** — создайте пользователя-администратора
   (например, `liutswim@gmail.com` + надёжный пароль). Это логин для `/admin`.
5. **Project settings (шестерёнка) → General → Your apps → Web (</>)** — зарегистрируйте
   web-приложение и скопируйте из конфига 4 значения в `.env.local`:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=liutswim.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=liutswim
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```

6. **Firestore Database → Rules** — вставьте содержимое файла `firestore.rules`
   из корня проекта и нажмите **Publish**. В списке email-ов в правилах должны
   быть те, кому разрешено редактировать (сейчас: liutswim@gmail.com, valvdov@gmail.com —
   поменяйте при необходимости, и синхронно поменяйте `ADMIN_EMAILS` в env).

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
