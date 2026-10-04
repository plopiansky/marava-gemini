# מדריך העלאה והרצה בקלאודפלייר (Cloudflare Pages)

הפרויקט הותאם באופן מלא להרצה מהירה ובטוחה ב-**Cloudflare Pages**.

---

## מה הוגדר והותאם:
1. **ניתוב SPA תקין (`public/_redirects`)**:
   כל נתיב (כולל `/admin` וכל דף עתידי) מנותב ישירות ל-`index.html` עם קוד תשובה 200, כך שאין שגיאות 404 בעת רענון הדפדפן.
2. **אבטחה ומטמון (`public/_headers`)**:
   - מטמון של שנה לקבצי ה-assets הסטטיים (`Cache-Control: immutable`).
   - הגדרות אבטחה (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`).
3. **הגדרות פריסה (`wrangler.toml`)**:
   - `pages_build_output_dir = "dist"`
   - שם פרויקט: `maarava-yeshiva`

---

## אפשרות 1: העלאה אוטומטית דרך לוח הבקרה של Cloudflare (מומלץ)
1. היכנסו ל-**[Cloudflare Dashboard](https://dash.cloudflare.com/)** ועברו ל-**Workers & Pages**.
2. לחצו על **Create application** -> **Pages** -> **Connect to Git**.
3. בחרו את מאגר ה-GitHub / GitLab של האתר.
4. הגדירו את פרטי הבנייה:
   - **Framework Preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js Version**: 20 או 22
5. לחצו על **Save and Deploy**. תוך פחות מדקה האתר שלכם יהיה באוויר עם תעודת SSL ו-CDN עולמי מהיר!

---

## אפשרות 2: פריסה ישירה משורת הפקודה (Wrangler CLI)
אם התקנתם את ה-CLI של קלאודפלייר, ניתן לבנות ולפרוס ישירות:

```bash
# 1. בניית האתר
npm run build

# 2. פריסה ל-Cloudflare Pages
npx wrangler pages deploy dist --project-name maarava-yeshiva
```

---

## כניסה לפאנל הניהול באתר הפרוס:
באתר הפרוס בקלאודפלייר, תוכלו להיכנס לניהול באמצעות:
* `https://YOUR-DOMAIN.pages.dev/admin`
* או `https://YOUR-DOMAIN.pages.dev/#admin`
* או לחיצה על הקישור בתחתית הדף (Footer): **"כניסה לפאנל ניהול (ADMIN)"**.
