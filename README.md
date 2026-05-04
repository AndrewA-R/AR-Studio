# A+R Studio — Website

Next.js 15 + Sanity 4 + Tailwind. Marketing site at `/`, embedded CMS at `/admin`.

## Quick start (local)

```bash
npm install
cp .env.local.example .env.local   # fill in projectId, tokens
npm run dev
```

Visit `http://localhost:3000` for the site, `http://localhost:3000/admin` for the CMS.

The site renders with built-in fallback copy until you populate Sanity, so you can preview design changes without any CMS setup.

---

## Handoff checklist — accounts to create

You only have to do these five things. I've stubbed everything else.

### 1. GitHub
- Create a private repo `ar-studio` (or whatever you prefer).
- I'll push this codebase to it. You add me as a collaborator if you want me to deploy.

### 2. Vercel — https://vercel.com/signup
- Sign up with the same GitHub account.
- Click **Add New → Project** → import the `ar-studio` repo.
- Vercel auto-detects Next.js. Don't deploy yet — env vars first (next step).

### 3. Sanity — https://sanity.io/manage
- Create a new project named `A+R Studio`. Dataset: `production`.
- Copy the **Project ID** — paste into Vercel as `NEXT_PUBLIC_SANITY_PROJECT_ID`.
- Go to **API → Tokens → Add API token**. Name: `web read`. Permissions: **Viewer**. Copy the token → paste into Vercel as `SANITY_API_READ_TOKEN`.
- Go to **API → CORS origins → Add CORS origin**. Add `https://www.a-r.studio` (and your Vercel preview URL like `https://ar-studio.vercel.app`). Allow credentials: yes.

### 4. Resend — https://resend.com/signup
- Add the domain `a-r.studio` and verify (DNS records — Resend gives you exact values).
- **API Keys → Create API Key**. Permission: **Sending access**. Copy → paste into Vercel as `RESEND_API_KEY`.

### 5. Domain DNS (Squarespace → Vercel)
- In Vercel: **Settings → Domains → Add** `www.a-r.studio` and `a-r.studio`.
- Vercel shows you the exact DNS records (A record + CNAME).
- Log into your registrar (where the domain is registered, not Squarespace) and add those records.
- Once green checkmarks in Vercel, the new site is live. Squarespace can be cancelled.

---

## Vercel environment variables (paste in Vercel → Settings → Environment Variables)

| Name | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | from step 3 | |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-01-01` | |
| `SANITY_API_READ_TOKEN` | from step 3 | mark as **Sensitive** |
| `RESEND_API_KEY` | from step 4 | mark as **Sensitive** |
| `CONTACT_TO_EMAIL` | `andrew@a-r.studio` | **change anytime, no redeploy** |
| `CONTACT_FROM_EMAIL` | `hello@a-r.studio` | must be on a Resend-verified domain |
| `NEXT_PUBLIC_SITE_URL` | `https://www.a-r.studio` | |

After adding env vars: **Deployments → Redeploy** the latest deploy.

---

## Editing content (your future workflow)

1. Go to `https://www.a-r.studio/admin` and log in (Sanity uses Google or GitHub auth — first user becomes admin).
2. Left sidebar:
   - **Homepage** — every line of copy on the home page
   - **Site settings** — masthead tagline, footer sign-off, default OG image
   - **Case studies** — add/edit case studies (homepage features the ones flagged "Show on homepage")
   - **Essays** — long-form articles, with rich text editor
   - **Services** — the three tier descriptions on `/services`
   - **Founders** — Andrew + Robin cards on the homepage
   - **Clients (logo wall)** — the dark logo grid
   - **FAQs** — the `/faqs` page accordion
3. Click **Publish**. The site rebuilds in ~30 seconds (ISR revalidates every 60s).

For instant updates after publish, set up a Sanity webhook → Vercel deploy hook (see "Webhook" section below).

---

## Architecture

```
src/
  app/
    page.tsx              # Homepage (HomeAv2 design, data-driven)
    layout.tsx            # Root layout, metadata, fonts
    globals.css           # Tailwind + design tokens
    services/             # /services
    carousel/             # /carousel
    thinking/             # /thinking + /thinking/[slug]
    work/[slug]/          # /work/km-tools, /work/concentric-travel, etc.
    contact/              # /contact (form → /api/contact)
    join-our-roster/      # /join-our-roster (form → /api/contact, kind=roster)
    faqs/                 # /faqs (Sanity-driven accordion)
    api/contact/route.ts  # Resend handler — destination = $CONTACT_TO_EMAIL
    admin/[[...tool]]/    # Embedded Sanity Studio
    sitemap.ts            # /sitemap.xml (dynamic from Sanity)
    robots.ts             # /robots.txt
  components/             # Pure presentational; data passed in as props
  lib/
    data.ts               # All getX() — Sanity → fallback graceful degradation
    site.ts               # Fallback content matching the design's copy verbatim
    image.ts              # Sanity image URL builder + placeholder fallback
  sanity/
    schemas/              # Document types (caseStudy, article, founder, ...)
    queries.ts            # GROQ
    structure.ts          # Studio sidebar shape (singletons grouped at top)
    client.ts             # Sanity client (cached, ISR-friendly)
    env.ts                # All env var reads in one place
sanity.config.ts          # Studio config (basePath: /admin)
next.config.ts            # Image domains + Squarespace URL redirects
tailwind.config.ts        # A+R color tokens, font families, custom letter-spacing
```

### URL redirects (already wired, see `next.config.ts`)
- `/km-tools` → `/work/km-tools`
- `/joinourroster` → `/join-our-roster`
- `/what-we-do` → `/services`
- `/who-we-are` → `/#studio`

### Webhook for instant rebuilds (optional, recommended)
1. Vercel → **Settings → Git → Deploy Hooks → Create Hook** for `main`. Copy URL.
2. Sanity → **API → Webhooks → Create Webhook**. Trigger: Create/Update/Delete. URL: paste from step 1. Method: GET.

---

## Common edits

### Change the contact destination email
Vercel → Env Vars → edit `CONTACT_TO_EMAIL`. **Redeploy** (~30s). Done.

### Add a new case study
1. `/admin` → **Case studies → Create**.
2. Fill in client, headline, hero image, result line, etc.
3. Toggle **Show on homepage** if you want it on `/`.
4. **Publish**.

### Add a new essay
1. `/admin` → **Essays → Create**. Status: `published`. Set `publishedAt`.
2. **Publish**. New essay appears on `/thinking` and at `/thinking/<slug>`.

### Update homepage copy
1. `/admin` → **Homepage**. Edit any of the structured fields.
2. **Publish**.

---

## Tech notes

- Next 15 App Router, React 19, RSC by default. Only `ContactForm` and the embedded Studio use `"use client"`.
- ISR via `next: { revalidate: 60 }` on Sanity queries — cached 60s, served instantly.
- Sanity image URLs use the `cdn.sanity.io` domain (whitelisted in `next.config.ts`).
- Honeypot field (`website`) on the contact form blocks the dumb bots; for serious abuse, add Cloudflare Turnstile later.
- All schemas live in `src/sanity/schemas/*` — adding a field = edit the file, run `npm run dev`, the Studio picks it up automatically.
