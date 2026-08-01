# Working Holiday Tax - complete site (1 August 2026)

Full Next.js project. Unzip, drop into your repo, commit, push. Vercel deploys automatically.

## What's inside
- src/app          public site (EN + /de + /ja), CRM, API routes, blog data
- src/components   shared UI including the new MobileCta
- src/lib          helpers (Supabase, constants, uploads, rate limiting, sanitising)
- supabase         13 migration files (data untouched)
- public           llms.txt, llms-full.txt, sitemap-llms.xml, 6 category OG images, icons
- __tests__        existing test files
- configs          package.json, package-lock.json, next.config.js, vercel.json,
                   tsconfig.json, tailwind, postcss, jest, eslint, .env.example
- *.md             changelogs for every phase of work

Excluded on purpose: node_modules, .next, .git (run `npm install` after unzipping).

## Verified before packaging
- tsc --noEmit on the whole project: clean
- eslint src --ext .ts,.tsx: clean
- Every local import resolves (0 unresolved)
- next.config.js loads, 6 redirect rules valid
- vercel.json valid, no cron jobs
- 0 em/en dashes anywhere in src or public
- next build cannot complete in the sandbox (no network for Google Fonts); builds on Vercel

## Work completed in this engagement
1. Blog: 154 posts, all titles/metas rewritten, ~110 new sections, 5 new commercial articles,
   FAQ blocks, per-article emoji artwork, E-E-A-T (Last updated, author line), OG images
2. Three languages brought to parity: DE and JA localized, not machine-translated
3. Client agreement: 26 clauses in EN/DE/JA, $110/$220 fee structure, ACL wording
4. WhatsApp automation removed (public wa.me contact links kept)
5. Tax form: WHM hard block replaced with a two-button confirmation
6. Service pages: HowTo schema removed, service-intent titles in all languages,
   loss-framed heroes, objection FAQs, mobile sticky CTA on 21 pages, ~34,500 characters
   of duplicated pitch and DIY instruction removed
7. /expenses added to the sitemap (it was missing entirely), sitemap date refreshed

## After deploy
1. Vercel env vars: delete WHATSAPP_APP_SECRET, WHATSAPP_WEBHOOK_VERIFY_TOKEN, CRON_SECRET.
   KEEP RESEND_API_KEY - it sends the CRM login codes.
2. Meta: remove the webhook subscription.
3. Search Console: resubmit sitemap.xml, then request indexing for /superannuation,
   /tax-return and /expenses.
4. In ~4 weeks: export a 28-day GSC report and compare against the 28 July 2026 baseline.

## Still outstanding
- Australian lawyer review of client agreement clause 6 before the fee terms go live
- Design refresh (deliberately deferred until the content changes can be measured)
- ~16 long-tail blog sections remain English-only
