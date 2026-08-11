# DRYAM FOODS — Coming Soon

A premium, animated "coming soon" landing page for **DRYAM FOODS**, a manufacturer & exporter of dehydrated garlic, dehydrated onion & fried products, and dehydrated vegetable powders from Surat, Gujarat, India.

Built with **Next.js 16**, **React 19**, and **TypeScript**.

![DRYAM FOODS](public/dryam-logo.png)

## ✨ Features

- **Cinematic layered background** — aurora blobs, drifting powder particles (canvas), film grain overlay, and a cursor spotlight (fine pointers only)
- **Staggered entrance animations** — logo ring, headline line-reveal, and content fade-ins
- **Email notify form** — client-side validation with inline error/success states and a `mailto:` fallback
- **Accessibility-minded** — respects `prefers-reduced-motion`, semantic labels, `role="alert"` / `role="status"` messaging, and keyboard focus styles
- **Responsive** — tuned breakpoints for tablet and mobile
- **SEO & social ready** — Open Graph, Twitter Card, and viewport metadata configured

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ (or 20+ recommended)
- npm

### Install

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## 📁 Project Structure

```
.
├── app/
│   ├── components/
│   │   └── ComingSoon.tsx   # Main landing page component (client)
│   ├── globals.css          # Design tokens, layers, components, motion, media queries
│   ├── layout.tsx           # Root layout — fonts, metadata, viewport
│   └── page.tsx             # Home page → renders <ComingSoon />
├── public/
│   └── dryam-logo.png       # Brand logo
├── next.config.ts
├── package.json
├── tsconfig.json
└── eslint.config.mjs
```

## 🎨 Design System

The visual language is defined via CSS custom properties in `app/globals.css`:

| Token | Value | Usage |
| ----- | ----- | ----- |
| `--ink` | `#0E0B08` | Background |
| `--cream` | `#F4EDE1` | Primary text |
| `--amber` | `#E8A83A` | Accent / brand |
| `--paprika` | `#C4562A` | Secondary accent / errors |
| `--sage` | `#7C8A5C` | Success |

**Fonts** (loaded via `next/font/google`):

- **Fraunces** — display / headlines
- **Archivo** — body
- **DM Mono** — eyebrow, footer, edge text

## 📧 Notify Form

The form performs client-side email validation and shows inline feedback. It currently does **not** persist submissions — the `.env` / `.env.local` files reference a Resend API key, but no API route is wired up yet. To connect it:

1. Create an API route (e.g. `app/api/notify/route.ts`) that calls the [Resend](https://resend.com) API.
2. Use `RESEND_API_KEY`, `RESEND_SEGMENT_ID`, and `RESEND_FROM` from `.env.local`.
3. Update `handleSubmit` in `app/components/ComingSoon.tsx` to `POST` to that route.

> ⚠️ **Security note:** `.env.local` is git-ignored. If the `RESEND_API_KEY` was ever committed or exposed, rotate it in the Resend dashboard.

## 🧱 Tech Stack

- [Next.js 16](https://nextjs.org) — App Router
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [ESLint](https://eslint.org) + `eslint-config-next`

## 📄 License

[MIT](LICENSE) © 2026 dryamfoods

---

**DRYAM FOODS** — Surat, Gujarat, India · [Bulk & export inquiries](mailto:export@dryamfoods.com)