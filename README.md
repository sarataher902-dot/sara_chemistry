# Sara Mohamed — Chemistry Educator Website

A production-ready, fully bilingual (English + Arabic) personal website for chemistry educator **Sara Mohamed**. Built with Next.js 15, TypeScript, and Tailwind CSS.

---

## ✨ Features

- **Bilingual (EN / AR)** — full RTL support for Arabic via `next-intl`
- **9 fully-built pages** — Home, About, Learn, Resources, Kids, Blog, Services, Shop, Contact
- **SEO optimised** — per-page metadata, Open Graph tags, `<html lang>` and `dir` attributes
- **Mobile-first responsive design** — works seamlessly on all screen sizes
- **Interactive components** — search, category filters, contact form with validation
- **Chemistry design system** — navy + teal palette, molecule SVG decorations, gradient text
- **Scalable architecture** — component-based, locale-aware routing, data layer separated in `lib/data.ts`
- **Blog system** — dynamic `[slug]` routes, related posts, sidebar with author bio
- **Shop structure** — product cards, coming-soon states, bundle upsell banner
- **Ready for extension** — add payment (Stripe), CMS (Contentful/Sanity), AI assistant, email service

---

## 🗂 Project Structure

```
sara-chemistry/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Locale-aware layout (fonts, dir, lang)
│   │   ├── page.tsx            # Home page
│   │   ├── about/page.tsx
│   │   ├── learn/page.tsx
│   │   ├── resources/page.tsx
│   │   ├── kids/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing
│   │   │   └── [slug]/page.tsx # Individual article
│   │   ├── services/page.tsx
│   │   ├── shop/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── loading.tsx         # Skeleton UI
│   │   └── not-found.tsx       # Custom 404
│   ├── globals.css             # Global styles + Tailwind base
│   ├── layout.tsx              # Root layout (delegates to locale layout)
│   └── page.tsx                # Redirects / → /en
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky nav with language switcher
│   │   ├── Footer.tsx          # Links, newsletter, social icons
│   │   └── PageLayout.tsx      # Header + children + Footer wrapper
│   ├── sections/               # Page-specific section components
│   │   ├── HeroSection.tsx
│   │   ├── AboutPreview.tsx
│   │   ├── TopicsGrid.tsx
│   │   ├── LatestArticles.tsx
│   │   ├── FeaturedResources.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── CTABanner.tsx
│   │   ├── NewsletterSection.tsx
│   │   ├── PageHero.tsx        # Reusable inner-page hero
│   │   ├── LearnPageClient.tsx # Search + topic grid (client)
│   │   ├── ResourcesPageClient.tsx
│   │   ├── BlogPageClient.tsx
│   │   ├── ShopPageClient.tsx
│   │   └── ContactPageClient.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── SectionBadge.tsx
│
├── i18n/
│   ├── routing.ts              # next-intl locale routing config
│   └── request.ts              # next-intl server request config
│
├── lib/
│   ├── data.ts                 # All static content (topics, posts, resources, shop, etc.)
│   └── utils.ts                # cn(), formatDate(), slugify(), truncate()
│
├── messages/
│   ├── en.json                 # English translations
│   └── ar.json                 # Arabic translations
│
├── middleware.ts               # next-intl locale detection + redirect
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ (Node 22 recommended)
- npm 9+ or pnpm

### Installation

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Add Tailwind Typography plugin for richer blog prose styles
npm install @tailwindcss/typography
# Then uncomment it in tailwind.config.ts → plugins array

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/en` automatically.

Switch to Arabic at [http://localhost:3000/ar](http://localhost:3000/ar).

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Localisation

All UI strings live in `messages/en.json` and `messages/ar.json`. Add or edit any string there — no code changes needed for copy updates.

To add a third language (e.g. French):
1. Add `"fr"` to `i18n/routing.ts` → `locales` array
2. Create `messages/fr.json` (copy from `en.json` and translate)

---

## 🎨 Design System

| Token         | Value        | Usage                         |
|---------------|--------------|-------------------------------|
| `navy-950`    | `#080f21`    | Hero backgrounds, footer      |
| `navy-900`    | `#0f1f42`    | Dark cards, nav on scroll     |
| `teal-500`    | `#14b8b8`    | Primary accent, CTAs          |
| `cyan-400`    | `#22d3ee`    | Gradient highlights           |
| White         | `#ffffff`    | Main content background       |

CSS custom utilities: `.gradient-text`, `.glass-card`, `.glass-navy`, `.molecule-bg`, `.orb`

---

## 📝 Content Updates

All content (blog posts, chemistry topics, resources, shop products, testimonials, services) is in **`lib/data.ts`**. Replace placeholder data there before launch:

- `chemistryTopics` — IGCSE topic list with icons, descriptions, difficulty
- `blogPosts` — Article metadata (full body is placeholder in `[slug]/page.tsx`)
- `resources` — Downloadable resource cards (free + premium)
- `shopProducts` — Shop product cards with pricing
- `testimonials` — Student testimonial quotes
- `kidsActivities` — Kids science experiment cards
- `services` — Service offering metadata

---

## 🔌 Integration Checklist

| Feature               | Status     | Next step                                         |
|-----------------------|------------|---------------------------------------------------|
| Contact form          | ✅ UI ready | Connect to Resend / Formspree / custom API         |
| Newsletter signup     | ✅ UI ready | Connect to Mailchimp / ConvertKit                 |
| Blog content          | ✅ Routing  | Replace placeholder with MDX / Contentful / Sanity |
| Shop / checkout       | ✅ UI ready | Add Stripe / Gumroad / LemonSqueezy               |
| Premium content lock  | ✅ UI ready | Add auth (NextAuth / Clerk)                       |
| Image optimisation    | ✅ Config   | Replace emoji placeholders with real photos       |
| AI Chemistry Assistant| 🔲 Planned | Add Claude API integration                        |

---

## 🚢 Deployment

### Vercel (recommended — zero config)

```bash
npx vercel
```

### Self-hosted

```bash
npm run build
npm start   # Requires Node.js server
```

Set these environment variables for production:
- `NEXT_PUBLIC_SITE_URL` — e.g. `https://sarachemistry.com`

---

## 📸 Adding Sara's Photos

Replace the emoji placeholder portraits:

1. Place photos in `public/images/` (e.g. `public/images/sara-portrait.jpg`)
2. Import `Image` from `next/image` in the relevant component
3. Replace the placeholder `<div>` with `<Image src="/images/sara-portrait.jpg" alt="Sara Mohamed" fill className="object-cover" />`

---

## 🤝 Contributing / Extending

The codebase is structured for easy extension:
- Add pages: create `app/[locale]/new-page/page.tsx`
- Add translations: add keys to both `messages/en.json` and `messages/ar.json`
- Add data: add arrays or objects to `lib/data.ts`
- Add components: drop into `components/sections/` or `components/ui/`

---

*Built for Sara Mohamed — Chemistry Educator & Science Content Creator*
