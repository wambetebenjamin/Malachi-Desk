# Malachi Desk

Your customers get answers. Instantly.

Malachi Desk is an AI chatbot powered help desk platform for businesses. Businesses embed the Malachi Desk widget on their own websites and it handles customer queries automatically, escalating to a human only when needed. Built for Kenya and East Africa, with global reach.

WhatsApp: +254 112 272 061

## Quick start

```bash
npm ci
cp .env.example .env.local   # fill in your keys
npm run dev
```

Demo dashboard account: demo@malachidesk.co.ke / demo1234 (or create a free account on the sign up page).

## What is included

- Marketing site: home, features (tabbed), pricing with full comparison and FAQ, blog, docs, contact, legal pages, branded 404 and 500.
- Live demo: the real ChatWidget component answers from data/faq.json (24 entries) with keyword matching, typing indicator, timestamps, clear conversation, suggestion chips, WhatsApp fallback, and button triggered voice input. Try it on the home page demo section and on /demo.
- Business dashboard (sign in required): overview stats, paginated conversation log, knowledge base editor (Vercel KV with in memory fallback), widget customiser with live preview, embed code generator with QR code, recharts analytics, and a ticket inbox that replies by email via nodemailer.
- APIs: /api/chat/message, /api/dashboard/stats, /api/dashboard/conversations, /api/dashboard/faq, /api/dashboard/widget-config, /api/tickets/reply, /api/contact, /api/recaptcha/verify, plus NextAuth at /api/auth/[...nextauth].
- Site furniture: loading screen, cookie consent (localStorage key malachi_desk_consent), reCAPTCHA v3 with v2 fallback, voice tour (bottom left), WhatsApp button (bottom right), Lenis smooth scroll.

## Template audit (Step 1)

Source zip: chatdeck-v1.0.0.zip. Extracted tree (before Malachi Desk additions): .gitignore, README.md, app/favicon.ico, app/globals.css, app/layout.tsx, app/page.tsx, components.json, components/Blocks (FaqSection, FeatureSection, Footer, Hero, LogoCarousel, PricingSection, TeamSection, TestSection, TestimonialSection), components/navbar.tsx, components/ui (accordion, animated-theme-toggler, avatar, badge, button, card, hero-video-dialog, marquee, separator, shimmer-button, toggle-group, toggle), eslint.config.mjs, lib/utils.ts, next.config.ts, package.json, package-lock.json, pnpm-lock.yaml, postcss.config.mjs, public (file.svg, globe.svg, next.svg, vercel.svg, window.svg, team/alena.png, team/cristofer.png, team/james.png, team/phillip.png), tsconfig.json. No hidden files beyond .gitignore.

- CSS custom properties: all preserved verbatim in app/globals.css (:root light set, .dark set, @theme inline mappings, radius scale, chart and sidebar tokens, keyframes for gradient, shimmer, marquee, logo-scroll). Malachi Desk rules are appended at the end only (typing dots, reduced motion).
- @font-face rules: none in the zip. Fonts came from next/font/google (Geist, Geist Mono, Inter). The variables --font-sans, --font-geist-sans and --font-geist-mono are preserved. Geist is now loaded locally via the geist npm package so builds never depend on Google Fonts; --font-sans keeps the Inter stack name with a local fallback.
- API route names in zip: none. All API routes were built new (listed above).
- Env variable names in zip: none. See .env.example for the full Malachi Desk list.
- Loading screen in zip: absent. Built new (chat bubble draw, checkmark, percentage, 3s max, skippable after 1s).
- Cookie consent in zip: absent. Built new.
- CAPTCHA in zip: absent. Built new (reCAPTCHA v3, v2 fallback below score 0.5).
- Legal pages in zip: absent (footer links were placeholders). Built new: privacy, terms, cookie policy.
- 404 / 500 in zip: absent. Built new: app/not-found.tsx and app/error.tsx.

Every zip file still exists at its original path. No renames, no deletions. Content inside Blocks, navbar and Footer was rebranded to Malachi Desk while keeping their layout structure and classes.

## Security-driven version notes

The Step 19 gate (npm audit with zero critical and zero high) required bumps beyond the pinned list. Current audit result: 0 vulnerabilities.

- next-auth 5.0.0-beta.28 to 5.0.0-beta.32 (fixes critical @auth/core advisories; same v5 API).
- nodemailer 6.10.1 to 10.1.7 and jspdf 3.0.1 to 4.2.1 (patched releases; our createTransport, sendMail usage is unchanged).
- @vercel/blob 0.29.4 does not exist on npm; using the current 2.x line. Blob is in the stack but not yet used by a route.
- shadcn CLI package removed from runtime dependencies: its tailwind.css is vendored verbatim at app/shadcn-tailwind.css (one import line changed in globals.css). The CLI tree (fast-glob, micromatch, braces) carried an unpatched high severity advisory. Reinstall the shadcn CLI as a dev tool when needed.
- eslint and eslint-config-next removed for the same braces advisory in @next/eslint-plugin-next. eslint.config.mjs is preserved; reinstall eslint once upstream ships a patched fast-glob chain to restore npm run lint.
- Animations use motion/react (the Framer Motion successor, same API, also what the template components already used). framer-motion 12.18.0 remains in the dependency stack; pinning both runtimes side by side breaks motion-dom, so the codebase standardises on motion/react.
- @hookform/resolvers added (required to use react-hook-form with zod). geist added for local fonts.
- Node: engines require Node 24 (.nvmrc: 24), matching Vercel. Older local Node versions still install with an EBADENGINE warning.

## Environment variables

See .env.example: NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_WHATSAPP_NUMBER, NEXT_PUBLIC_RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY, NEXTAUTH_SECRET, NEXTAUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PEXELS_API_KEY, KV_REST_API_URL, KV_REST_API_TOKEN, BLOB_READ_WRITE_TOKEN, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM.

Without keys the site still runs: reCAPTCHA verification is bypassed in development, email sends are logged as mock sends, KV falls back to memory, and Google sign in appears only when Google credentials are configured.

## Verification (Step 19)

npm ci, npx tsc --noEmit, npx next build and npm audit --audit-level=high all pass. Runtime smoke tests passed for every page, the chat API (match, Swahili, fallback), sign in with the demo account, dashboard APIs, FAQ create and delete, widget config save, ticket reply and contact.
