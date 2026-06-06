# Production build — what changed vs your FINAL upload

Base = your uploaded working-holiday-tax-FINAL (forms + CRM are byte-identical, untouched).

Added (non-form improvements only):
1. AI feeds rebuilt for EN+DE+JA with correct counts (143 articles + 6 categories):
   public/llms.txt (added Japanese section), public/llms-full.txt (all 3 languages),
   public/sitemap-llms.xml (all 143x3 + categories + services, with <lastmod>).
2. Article dates: 52 articles that shared "25 May 2026" were spread to distinct real
   dates; src/app/sitemap.ts now uses each article's real date for <lastmod>.
3. German terminology unified: Steuerrueckzahlung -> Steuerrueckerstattung (content/SEO
   pages only; legal client-agreement left as-is).
4. "AEST" -> "AEST/AEDT" on public contact/FAQ pages (Sydney observes daylight saving).
5. Two Japanese blog link anchors translated from English to Japanese.

NOT touched: all forms (tax/abn/tfn/super), file upload, CRM, auth, storage, libs.
No middleware added. No bucket/security changes. Nothing that needs a Supabase toggle.

Deploy: push to a Vercel PREVIEW first, submit one form with a file upload to confirm,
then promote to Production.
