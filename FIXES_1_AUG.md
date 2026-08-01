# Fixes — 1 August 2026

## 1. CONTENT BUG (was live on the site)
/blog/minimum-wage-australia-2026-27 stated:
  "For reference, the 2025-26 rates ... were $26.44 per hour, or $33.05 casual."
Those are the 2026-27 figures. The blanket find-and-replace that updated the current rates
also overwrote the historical reference line I had written.
Corrected to: "$24.95 per hour, or $31.19 casual."
Verified the current-year figures ($26.44 / $33.05 / $1,004.90) are untouched and correct
in all three languages.

## 2. WHM tax-status modal — block removed (re-applied)
- Primary button: "No, let me check Residency" (opens the residency explainer)
- Secondary button: "I'm sure I'm a WHM for tax purposes" -> submits the form
- Confirming once lets any later submit go straight through
- Copy: "...you aren't eligible for a tax refund this year unless you have work-related
  expenses you'd like to claim." (EN, DE and JA)

Files touched: src/app/blog/data.ts, src/app/tax-form/FormClient.tsx
Verified: tsc --noEmit clean, eslint clean.

## Deploy note
Re-upload and, in Search Console, request indexing for
/blog/minimum-wage-australia-2026-27 so the corrected figure is picked up quickly.
