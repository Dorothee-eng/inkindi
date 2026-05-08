# INKINDI — Modern Luxury Jewelry, Online

A production-ready Next.js storefront for a women's luxury jewelry brand
designed to launch online and scale into Rwanda and across Africa.

```
Designed in Paris · Rooted in African heritage · Made for the modern muse
```

---

## Tech Stack

- **Next.js 14** (App Router, Server Components, ISR-ready)
- **TypeScript** strict
- **Tailwind CSS** (custom luxe palette, serif/sans pairing)
- **Framer Motion** (page + scroll animations)
- **Zustand** (cart, wishlist, currency — persisted to `localStorage`)
- **next/font** (Playfair Display, Cormorant Garamond, Inter)
- **next/image** (Unsplash configured; swap in your CDN)
- **Lucide** icons

## Run it

```powershell
# from C:\Users\mukan\inkindi
npm.cmd install        # use npm.cmd on Windows if PowerShell exec policy blocks npm
npm.cmd run dev        # http://localhost:3000
```

Production build:

```powershell
npm.cmd run build
npm.cmd run start
```

## Project Structure

```
src/
├── app/                    Next.js App Router
│   ├── layout.tsx          Root layout, fonts, SEO, structured data
│   ├── page.tsx            Homepage
│   ├── shop/               Filtered + sorted product listing
│   ├── product/[slug]/     Product detail (gallery, zoom, reviews, related)
│   ├── about/              Brand story, values, roadmap
│   ├── contact/            Form, FAQ, WhatsApp, concierge details
│   ├── cart/               Cart + promo code + summary
│   ├── wishlist/           Saved pieces (localStorage)
│   ├── account/            Sign-in scaffold
│   ├── api/                Newsletter + contact form stubs
│   ├── sitemap.ts          Auto-generated sitemap
│   └── robots.ts           Auto-generated robots.txt
├── components/
│   ├── layout/             Navbar, Footer, AnnouncementBar
│   ├── home/               Hero + every homepage section
│   ├── product/            Card, Grid, Gallery, Filters, Actions
│   ├── cart/               Slide-in cart drawer
│   ├── contact/            Contact form (client)
│   ├── ui/                 Price, Rating, CurrencySelector
│   └── motion/             Reusable FadeIn
├── data/products.ts        24 sample SKUs, 4 collections, testimonials
├── lib/                    currency.ts (USD/EUR/GBP/RWF/KES/NGN/ZAR), i18n.ts (en/fr/rw/sw), utils.ts
├── store/                  cart.ts, wishlist.ts, currency.ts (Zustand + persist)
└── types/                  Product, Collection, Review, Locale
```

## What ships

| Capability | Status |
| --- | --- |
| Responsive luxury UI (homepage, shop, product, about, contact, cart, wishlist, account, 404) | ✅ |
| Cart drawer + cart page + promo codes (`WELCOME10`, `KIGALI25`) | ✅ |
| Wishlist with localStorage persistence | ✅ |
| Multi-currency selector (USD, EUR, GBP, RWF, KES, NGN, ZAR) | ✅ |
| Multi-language scaffold (en, fr, rw, sw) | ✅ |
| SEO: metadata, OG tags, sitemap, robots, Organization + Product JSON-LD | ✅ |
| Framer Motion animations (hero, scroll-reveals, drawers, testimonials) | ✅ |
| Mobile-first responsive design with luxury hover states | ✅ |
| Newsletter + contact form API endpoints (stubs, easy to wire) | ✅ |
| User authentication | 🟡 UI scaffold only — wire NextAuth |
| Real checkout / payments | 🟡 Architecture-ready — see "Payments" |
| Order tracking | 🟡 Awaiting backend |
| CMS-driven products | 🟡 `src/data/products.ts` is the seam — swap for Shopify, Sanity, Medusa |

## Design System

- **Palette:** white `#FFFFFF` · cream `#FBF7F0`/`#F7F1E8` · gold accents `#C9A96E`–`#A98841` · ink black `#0E0E0C` · nude pink highlight
- **Typography:** Playfair Display + Cormorant Garamond (serif/display) · Inter (sans)
- **Motion:** custom luxe easing `cubic-bezier(0.22, 1, 0.36, 1)`, generous 700–1200ms transitions
- **Components:** `.btn-primary`, `.btn-gold`, `.btn-ghost`, `.eyebrow`, `.display-1`, `.display-2`, `.lead`, `.card-product`, `.luxe-divider`

## Scaling into Rwanda & Africa

The codebase is set up so that going live in Rwanda is a configuration change, not a rewrite:

- **Currencies** — `src/lib/currency.ts` already supports RWF, KES, NGN and ZAR. Replace the static rates with a live FX call (BNR feed for RWF, OpenExchangeRates for the rest).
- **Languages** — `src/lib/i18n.ts` has English, French, Kinyarwanda and Swahili dictionaries. Move to `next-intl` or `next/intl` when you wire locale routing (`/rw/shop`, `/fr/shop`).
- **Payments** — `.env.example` lists the providers we recommend:
  - **Stripe** for card payments globally
  - **Flutterwave** as the African aggregator (cards + bank transfer + USSD)
  - **MTN MoMo** + **Airtel Money** for direct mobile money in Rwanda, Uganda, Tanzania
  - **Klarna / Afterpay** for buy-now-pay-later in EU/US
- **Shipping** — Cart already shows free shipping over $200 and a flat $25 otherwise. From 2027 we plan in-country fulfilment from Kigali; integrate DHL Africa + the Rwandan Postal Service.
- **WhatsApp Business** — Contact page already has a `wa.me` deep link; pair with the WhatsApp Cloud API for two-way concierge.

## Image assets

All imagery is currently from Unsplash, configured under `images.remotePatterns` in `next.config.mjs`. When you receive your studio shots:

1. Drop them into `/public/products/<slug>/01.jpg` etc.
2. Replace the URLs in `src/data/products.ts` with `/products/<slug>/01.jpg`.
3. Remove the Unsplash hosts from `next.config.mjs` if no longer needed.

## SEO & analytics

- Open Graph + Twitter card metadata is set globally in `app/layout.tsx`, with per-page overrides on shop, product, about and contact pages.
- Organization + Product JSON-LD is emitted from `app/layout.tsx` and product pages — Google Merchant ready.
- `sitemap.ts` and `robots.ts` are dynamic — they pick up new products automatically.
- Add a `<Script>` for GA4 / Plausible / Klaviyo Onsite in `app/layout.tsx` body.

## Renaming the brand

Brand strings live in three places:

- `src/app/layout.tsx` — the `SITE` constant
- `src/components/layout/Navbar.tsx` & `Footer.tsx` — wordmark
- `src/data/products.ts` — testimonial mentions
- `README.md` — this file

A find-and-replace on `INKINDI` / `Inkindi` / `inkindi` covers it.

## Roadmap from here

1. **Wire a CMS** — swap `src/data/products.ts` for Shopify Storefront API (recommended) or Sanity.
2. **Add NextAuth** for accounts (Google + magic links).
3. **Stripe + Flutterwave** at `/api/checkout` — mirror the cart's line shape.
4. **Locale routing** — move pages under `app/[locale]/` and use the dictionaries already in `lib/i18n.ts`.
5. **Studio photography** — replace Unsplash with branded shots, target 4:5 portrait.
6. **Klaviyo flows** — welcome, abandoned cart, replenishment, post-purchase care.

---

© INKINDI · A modern luxury jewelry house.
