# PROGRESS — Upgrade round (6 June 2026)

Implemented on a working copy (branch intent: `upgrade`). Items follow the owner's
priority list. Verified by static analysis (markers, data integrity, XML validity);
full `tsc`/`lint`/`next build` must be run in the owner's environment (see Verification).

## Done

| # | Item | Files | Status |
|---|------|-------|--------|
| 1 | Private storage bucket + service-role file proxy | api/crm/file/route.ts, lib/upload.ts, migrations/001 | ✅ code (needs Supabase dashboard step) |
| 2+9 | AI feeds rebuilt for EN+DE+JA, correct counts | public/llms.txt, llms-full.txt, sitemap-llms.xml | ✅ |
| 3 | Server-rendered `<html lang>` per locale | middleware.ts (new), app/layout.tsx | ✅ (dynamic-render trade-off — verify build) |
| 4 | Tax-form success/email screen localized (DE/JA) | tax-form/FormClient.tsx, lib/formStrings.ts | ✅ |
| 6 | Real article dates: 52 clumped dates spread; sitemap + Article schema use real date | blog/data.ts, sitemap.ts, blog/[slug] x3 | ✅ |
| 7 | DE term unified (Steuerrückerstattung); JA super name already consistent | de/* | ✅ |
| 8 | AEST → AEST/AEDT (factual fix, all langs) | contact x3, page.tsx, de/page.tsx, CRM | ✅ |
| 10 | 30-min idle auto-logout + in-memory rate-limit fallback | crm/layout.tsx, crm/page.tsx, lib/rate-limit.ts | ✅ |

## Counts (verified against data)
143 articles + 6 categories. TFN 18 · ABN 14 · Tax Return 30 · Super 20 · Work Rights 43 · Medicare & Other 18.

## Requires owner action
- **Supabase dashboard:** set the `uploads` bucket to **Private** (code now serves via authenticated proxy). Until then files stay public.
- **E-E-A-T (not done — needs real data):** named author + reviewedBy registered agent (name/TAN). Not invented.
- **Tax figures:** verify §8b numbers with ATO before publishing (unchanged here).
- **CSP nonce:** left as-is (unsafe-inline). Converting to nonce is risky without a live build test — recommended as a separate, verified change.

## Verification to run locally
```
npx tsc --noEmit
npx next lint
npm test
npx next build      # confirm 514 routes; note: layout now uses headers() → dynamic render
```
Static checks done here: all edited files intact; blog/data.ts parses (143 guides); sitemap-llms.xml well-formed; no hardcoded English left in tax-form success flow; 143 distinct article dates.

## Trade-off to decide
`#3` makes pages render dynamically (headers() in root layout). This is the correct SSR-lang fix but changes rendering from static. If you prefer to keep static rendering, revert `middleware.ts` + the `layout.tsx` lang lines (the client-side lang script still runs).


---

## Hardening round 2 (no impact on public forms)

| Item | Files | Notes |
|------|-------|-------|
| Server-side session revocation | lib/crm-store.ts, api/crm/logout/route.ts | Logout now bumps a "revoked-before" epoch (in-memory + Redis). Stolen tokens issued before logout are rejected. validateSession stays SYNC (no route changes) and FAIL-SAFE — it can only add a rejection, never bypass; if Redis is down it degrades to in-memory. Cross-instance propagation within ~60s. |
| Tests rewritten | __tests__/forms.test.js | Replaced the dead @vercel/postgres mock with 19 real unit tests (sanitise, password/OTP, session tokens, Supabase URL validation, IP extraction, rate-limit memory fallback). |
| Dead code / docs | lib/crm-store.ts, .env.example | Removed unused `requiredRole` param from checkToken; removed unimplemented REVIEWER_* env vars from .env.example. |

NOT done (deliberately): nonce-CSP (needs a live build + form smoke test) and the vercel.json/next.config header dedup (kept duplicated-but-consistent; removing is unverifiable here and could drop a header). Re-enabling tsc/eslint in the build is left as a recommendation.

These three changes do not touch any public form (tax/abn/tfn/super) runtime code.
