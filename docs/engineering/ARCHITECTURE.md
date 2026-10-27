# Architecture proposal: Student Visa Tax on the Working Holiday Tax platform

Status: ACCEPTED (26 Oct 2026): option A, fully separate brands. Host routing is done
with rewrites, not proxy.ts: see decisions/001-host-routing-with-rewrites.md.

## 1. What already exists (Working Holiday Tax, in production)

| Layer | Today |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript strict, Tailwind |
| Hosting | Vercel, region syd1, cron every 5 min (`/api/will/tick`) |
| Database | Supabase Postgres (service-role key server-side only), 46 SQL migrations |
| File storage | Supabase Storage, PRIVATE bucket for identity documents, fail-closed |
| Cache / rate limit | Redis (`REDIS_URL`), per-IP limits on public forms |
| Public site | ~540 prerendered pages, 3 languages (en, de, ja), static CSP with `unsafe-inline` |
| CRM | `/crm`, password + email OTP, httpOnly `SameSite=Strict` cookies, JWT, nonce-based CSP |
| Messaging | WhatsApp Cloud API webhook (signature-verified), Will (Anthropic API) with a policy guard and a reviewer pass |
| Email | Resend |
| Tests | Jest, about 3,100 tests; no browser end-to-end tests yet |
| CI | None. Checks run by hand before each release zip |

## 2. Requirements for Student Visa Tax

- Separate brand and domain (`studentvisatax.com.au`), separate look, separate SEO.
- Same price, same Client Agreement and Privacy Policy text (brand name swapped), same
  tax form flow, same CRM, same Will settings with small student adaptations.
- Languages: English, Simplified Chinese, Vietnamese.
- A second WhatsApp number in the same WABA (later).
- Mobile first. Premium, brand-specific design (locked canvas).
- Customers must be tagged by brand so reports, templates and replies stay separate.
- Fully separate to customers: neither brand mentions or links to the other anywhere
  customer-facing (pages, footers, emails, WhatsApp, invoices, structured data, analytics,
  social profiles). Tests check that SVT HTML never contains "Working Holiday Tax" or the
  WHT domain, and the reverse.

## 3. Options considered

| | A. One app, two domains (recommended) | B. Monorepo, two apps, shared packages | C. Separate app calling WHT's API |
|---|---|---|---|
| How | Host header picks the brand (host rewrites, decision 001); SVT pages live in their own route group | Move `src/lib` into packages, two Next apps, two Vercel projects | New Next app; form posts cross-origin to WHT |
| Reuse | Full: form, uploads, CRM, Will, cron, legal text | Full, after a large refactor | Partial; form and uploads cross a domain boundary |
| Risk | Brand leakage between domains if routing is wrong (testable) | Big refactor of a live system before any SVT work | CORS, auth between apps, two places to secure |
| Cost | Lowest | Highest | Medium, and grows |
| Security | One CSP, one secrets set, one audit surface | Two deploys to keep in step | Wider attack surface (public cross-origin API) |

Recommendation: A. The backend is the valuable, security-sensitive part and it is
already built and tested; duplicating or splitting it adds risk without a user benefit.
Option B stays open later if the brands grow apart.

## 4. Proposed design (option A)

### Routing and brand resolution
- `src/lib/brand.ts`: one `Brand` type (`'wht' | 'svt'`) and a `BRANDS` config (name, domain,
  email, phone, WhatsApp number, legal details, locales, theme tokens).
- Host-conditioned rewrites in `next.config.js` (decision 001) send SVT hosts into
  `src/app/(svt)/svt-site/...`; `proxy.ts` stays CRM-only. Unknown hosts fall back to WHT. The brand is never taken from a query
  string or a client value.
- Each brand has its own `sitemap.xml`, `robots.txt`, canonical URLs, hreflang and
  `llms.txt`. A WHT page must never be reachable on the SVT domain and vice versa
  (enforced by the rewrites, covered by unit and e2e tests).

### Frontend boundaries
- `src/app/(site)`, `(de)`, `(ja)`: WHT, unchanged.
- `src/app/(svt)`: SVT pages, with `/zh` and `/vi` sub-trees. Server components by
  default; client islands only for the price check, payslip explainer and FAQ accordion.
- `src/components/svt/`: SVT design system components. No imports from WHT components and
  the reverse, apart from shared primitives in `src/components/shared/`.

### Backend boundaries (shared)
- Route handlers in `src/app/api/*` stay shared. Every write path records `brand`,
  derived on the server from the host, never from the request body.
- Business logic in `src/lib/*` (form validation, upload, Will, CRM store) gets a `brand`
  parameter where behaviour differs (WhatsApp number, templates, wording). Defaults stay
  WHT so nothing changes for the live brand.
- Data access stays in `src/lib/will/store*.ts` and `src/lib/db.ts`.

### Data
- Migration: `brand text not null default 'wht' check (brand in ('wht','svt'))` on
  customers, tax form submissions and leads; index on `(brand, state)`.
- No customer data is copied between brands. CRM filters by brand; staff see both.
- Uploads keep the same private bucket with a `brand/` path prefix, served only through
  the existing authenticated CRM file route (`/api/crm/file`), never by public URL.

### Authentication and authorisation
- Customers: no accounts (unchanged). Access to their own submission is by WhatsApp chat
  and signed one-time form links.
- Staff: existing CRM login (password + email OTP, httpOnly cookies). Every `/api/crm/*`
  handler checks the session server-side. A future role split (admin / reviewer) is noted
  as an option, not built now.

### WhatsApp and Will
- Second phone number in the same WABA. The webhook already receives every number in the
  WABA; the `phone_number_id` on each inbound message decides the brand.
- Will gets the brand from the customer record: SVT wording, SVT form link, student
  playbook rules (residency after 6 months of study, Medicare Entitlement Statement, ABN
  delivery work). Approved message texts gain `zh` and `vi`, written by native speakers.

### Security posture (unchanged principles, extended to SVT)
- Static CSP on public pages, nonce CSP on `/crm`. The SVT CSP adds no new third-party
  origins at launch (no Google Fonts or reCAPTCHA on `/zh`; fonts self-hosted).
- Secrets only in Vercel environment variables; SVT adds `SVT_WHATSAPP_PHONE_NUMBER_ID`
  and nothing secret on the client.

## 5. Folder structure (additions only)

```
src/
  app/
    (svt)/                 SVT pages: layout, home, pricing, guides, legal, /zh, /vi
  components/
    svt/                   SVT design system: Button, PriceTag, Docket, Section, Faq, PriceCheck, Payslip
    shared/                Brand-neutral primitives used by both brands
  lib/
    brand.ts               Brand type, config, host -> brand
    legal/                 Shared legal text (exists)
    i18n/svt/              SVT dictionaries (en, zh, vi)
supabase/migrations/       047_brand_column.sql
e2e/                       Playwright tests (both brands)
docs/engineering/          This folder
```

## 6. Decisions log

Each significant decision gets a short file in `docs/engineering/decisions/`
(`NNN-title.md`: context, decision, alternatives, consequences).

## 7. Open decisions for Jo

1. Option A (one app, two domains) or B/C.
2. Patch the dependency vulnerabilities now (Next.js 16.4.3 and `npm audit fix`; see
   DEPLOYMENT_CHECKLIST.md), as a separate small release before any SVT work.
3. Add a CI pipeline on GitHub (needs a GitHub repository; today the project ships as a zip).
4. Final WhatsApp number for SVT, and the domain on Vercel.
