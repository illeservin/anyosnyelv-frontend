# Headless News Starter (Astro + WordPress)

Ultra gyors, Google Discover‑barát híroldal kezdőkészlet **Astro** frontenddel és **WordPress (WPGraphQL)** backenden.

## Gyors start
1) WordPressben telepítsd a **WPGraphQL** plugint és kapcsold be a kiemelt képeket (legalább 1200 px széles).
2) Másold át a `.env.example` fájlt `.env` néven és töltsd ki (`WP_ENDPOINT`, `SITE_URL`, `SITE_NAME`).
3) `npm install` → `npm run build` → `npm run preview` (helyi teszt).
4) Deploy Vercelre. Állíts be **Deploy Hookot**; WordPressből (pl. WP Webhooks) hívd meg publikálás után.
5) Add hozzá a domain-t Vercelben, és ellenőrizd a `https` működését.

## Fő jellemzők
- Címlap rács + cikkoldal nagy hero képpel
- `NewsArticle` JSON‑LD, `max-image-preview: large`
- RSS (`/rss.xml`) + sitemap (`/sitemap.xml`)
- Reklámslot helyőrzők (Google Ad Manager)
- Nincs WordPress téma a frontenden

*Készült: 2025-08-09*
