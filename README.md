# 🛕 Sri Bhoomi Alantha Perumal & Sri Isakki Amman Temple — Website

A production-ready, bilingual (Tamil + English) temple website built with **React 19, Vite, React Router, Framer Motion,** and **Lucide Icons**. No TypeScript, no Bootstrap — pure custom CSS with a premium gold/maroon/saffron devotional theme.

---

## ✨ Features

- Bilingual (Tamil + English) content throughout
- Animated hero banner with floating temple bell (real sound via Web Audio API) & Om loading screen
- 21 Sacred Peedams — 11 main deities + 10 parivara deities, animated cards
- Weekly Pooja schedule (Tue & Fri, 12:00 PM)
- Annual Kodai Festival page with a **live countdown timer**
- Photo gallery with filter + lightbox, responsive YouTube video gallery
- Donation page — UPI ID, copy-to-clipboard, QR placeholder, `upi://pay` deep link
- Ennai Kaappu section — Call Now / WhatsApp buttons
- Contact page — validated contact form, embedded Google Map, click-to-call
- Scrolling announcement marquee
- Dark mode / Light mode toggle (persisted)
- Sticky navbar, scroll-to-top button, smooth scroll, mobile-first responsive layout
- Full SEO: meta tags, Open Graph, Twitter Card, JSON-LD, `robots.txt`, `sitemap.xml`, favicon
- Accessible: skip-link, `aria-*` labels, focus states, `prefers-reduced-motion` support

---

## 🗂️ Project Structure

```
src/
  assets/        → place real temple photos/videos here
  components/    → reusable UI (Navbar, Footer, DeityCard, GalleryLightbox, ...)
  data/          → templeData.js — ALL editable Tamil/English text lives here
  hooks/         → useTheme, useCountdown, useSEO, useScrollToTopOnRoute
  pages/         → Home, About, Deities, PoojaFestival, Gallery, Donation, Contact, NotFound
  styles/        → variables.css (design tokens) + global.css (base styles)
  App.jsx        → routes
  main.jsx       → app entry point
public/
  favicon.svg, robots.txt, sitemap.xml
index.html       → SEO / Open Graph / Twitter Card / JSON-LD tags
```

---

## ✍️ How to Edit Content

**Almost all text lives in one file:** `src/data/templeData.js`.
Edit temple names, phone numbers, UPI ID, deity names/descriptions, pooja timings, festival dates, gallery captions, and nav links there — no need to touch components.

To change the **next festival countdown date**, update `annualFestival.nextFestivalDate` (ISO format `YYYY-MM-DDTHH:mm:ss`).

To swap placeholder image/icon blocks for real photos, replace the `<Flame />` / `<ImageIcon />` placeholders in `DeityCard.jsx` and `GalleryLightbox.jsx` with `<img src="..." />`, and add your images to `src/assets/`.

To update colors/fonts, edit `src/styles/variables.css` (CSS custom properties).

---

## 🚀 Getting Started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

---

## ☁️ Deploying to Vercel

1. Push this project to a GitHub repository.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: **Vite**. Build command: `npm run build`. Output dir: `dist`.
4. `vercel.json` is already included with a SPA rewrite rule so all React Router routes work correctly on refresh.

---

## 🔌 Connecting to Spring Boot + MySQL Later

The project is structured so the UI never needs to change when a backend is added:

- `src/data/templeData.js` exports plain JS objects/arrays. Replace the static exports with `fetch("/api/...")` calls that return the **same shape**, and the components will keep working unmodified.
- `ContactForm.jsx` already has a `// TODO` marking exactly where to add the `fetch("/api/contact", ...)` POST call.
- Recommended REST endpoints: `GET /api/deities`, `GET /api/announcements`, `GET /api/gallery`, `GET /api/festival`, `POST /api/contact`.
- Keep response JSON keys identical to the current field names (`tamil`, `english`, `titleTamil`, etc.) to avoid touching component code.

---

## 🆕 Recently Added

- **Design refresh** — color palette updated to the exact temple palette (Gold `#D4AF37`, Deep Maroon `#7B1113`, Saffron `#FF9933`, White, Dark Brown), all driven from `src/styles/variables.css` so it applies site-wide automatically.
- **Ripple effect** on all `.btn` buttons, **golden-glow hover** on glass cards, **image zoom-on-hover** in the gallery, **masonry photo grid**, **smooth page-fade transitions** on route change, and a **parallax + floating petals + divine light rays** hero on the homepage (`src/components/HeroPetals.jsx`).
- **Festival Videos page removed** — the page, its route, nav link, and seed video assets are gone. The photo Gallery and its upload system are unaffected.
- **Contact Persons merged into "Get in Touch"** — Paramasivan Nadar and Velmurugan now appear directly under a "📞 தொடர்புக்கு" heading in the Contact page's existing contact section, each with a clickable `tel:` link.
- **Photo Gallery** now pulls from the same dynamic media system instead of static placeholders.
- **Upload system** (admin-only) for Photos:
  - Drag-and-drop or click-to-browse, multi-file
  - Live preview, per-file title/description
  - File-type validation (JPG/JPEG/PNG/WEBP) and a 100MB size cap
  - Progress bar per file, success/error messaging
  - Edit and delete any item (with confirmation) from the grid
  - "Load More" pagination (8 items per page) so large libraries stay fast
- **Admin gating**: click "Admin login" in the top-right of the Gallery page header. Demo passcode: `temple-admin` (set in `src/hooks/useAdminMode.jsx`). **This is a client-side-only placeholder, not real security** — see the backend note below.

### ⚠️ Important: no real backend is connected yet
This project is a static React/Vite site with no server. To make "upload → appears in gallery instantly" actually work without a backend, uploaded files and their metadata (title, description, filename, upload date, category) are stored in the **browser's IndexedDB** via `src/services/mediaStore.js`. That means:
- Uploads persist only in that browser/device — they are **not shared across visitors** and **not visible to you on another device** until a real backend is connected.
- The admin passcode is a simple client-side gate, not authentication — anyone who reads the source can bypass it.

**To make this production-ready with Spring Boot + MySQL (or S3/Cloud Storage):**
1. Build REST endpoints: `GET /api/media?category=`, `POST /api/media` (multipart file + metadata), `PUT /api/media/{id}`, `DELETE /api/media/{id}`.
2. Replace the function bodies in `src/services/mediaStore.js` with `fetch()` calls to those endpoints — the function names/signatures are already designed to match, so `useMediaLibrary.js` and every page/component using it needs **no changes**.
3. Add real authentication (e.g. Spring Security + JWT) and gate the POST/PUT/DELETE endpoints to admins only; then swap `useAdminMode.jsx` to check a real logged-in session instead of the hardcoded passcode.
4. Store files in cloud storage (S3, Cloudinary, etc.) and save the returned URL in MySQL alongside the metadata.

---

## 🆕 Previously Added

- **WhatsApp Group section** (on Home) — `src/components/WhatsAppGroupSection.jsx`. Set `templeInfo.whatsappGroupLink` in `templeData.js` once you have a real `https://chat.whatsapp.com/...` invite link; until then the QR image is shown.
- **Swami Gallery** — `src/components/SwamiGallery.jsx`, featured on the Deities page with a lightbox. Real deity photos are mapped by name in `src/assets/deityImages.js`.
- **Google Map** — working search-based embed for Usarathukudieruppu, Tirunelveli District (no API key needed).
- **Footer** — developer credit (Mathan S/o Rajalingam) with clickable phone/email.

### Placeholder images added (`src/assets/`)
`whatsapp-qr.jpg` and the deity photos are now real uploaded images. Add more real photos any time by dropping files into `src/assets/` and updating `deityImages.js` or uploading directly via the admin gallery uploader.

---

## 🖼️ Replacing Placeholders

| Placeholder | Location | Replace with |
|---|---|---|
| Hero background | `Home.css` `.hero` | Add a background image / video |
| Deity card images | `DeityCard.jsx` | Real deity photos |
| Gallery images | `GalleryLightbox.jsx` | Real temple/festival photos |
| QR code | `Donation.jsx` `.donation-qr__box` | Real UPI QR image |
| OG banner | `index.html` `og:image` | A real 1200×630 banner image, hosted publicly |
| YouTube video IDs | `templeData.js` → `videoGallery` | Real YouTube video IDs |

---

Developed with devotion 🙏
