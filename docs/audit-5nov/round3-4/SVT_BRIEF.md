# Round 4 brief: Student Visa Tax (SVT) audit, read-only

Goal: studentvisatax.com.au first on Google and the source AI answers cite, in English, Chinese (zh) and Vietnamese (vi),
for four services: TFN, ABN, tax return, super (DASP). Audience: international students on visas 500 and 485.

The SVT site lives in the same Next.js repository as another brand: `/home/claude/v3/whvtax-FINAL58` (read-only for you).
- Routes: `src/app/(svt)/svt-site/...`, `src/app/(svt-zh)`, `src/app/(svt-vi)` (served on the SVT domain via rewrites in
  `config/brand-routing.js`; `/x` on the SVT domain is `/svt-site/x` internally).
- Content: `src/lib/svt/**` (content/home-*.ts, guides-*.ts, blog-*.ts, content/long/<lang>/batch-*.ts, i18n, jsonld.ts).
- Search Console for SVT (launched 26 Oct 2026, 3 months export):
  `/mnt/user-data/attachments/9ea64e4e-f7cd-5716-bf6b-c9c7b3587de4/60b04d4c-studentvisatax.com.au-Performance-on-Search-2026-11-05.xlsx`
  (sheets Queries, Pages, Countries, Devices). Example: DASP queries rank 50-90; "http://studentvisatax.com.au/" appears as a
  separate page.
- Project rules: `CLAUDE.md` and `docs/engineering/PRELAUNCH_REPORT_SVT.md` in the repo.

## SVT rules (a single breach makes your findings unusable)
- The brands are fully separate: nothing on SVT may mention, link to or resemble Working Holiday Tax / workingholidaytax.
- Never say or imply SVT IS a tax agent. Allowed only: "operates under the supervision of a registered tax agent" and
  "Reviewed and signed off by a registered tax agent before it is lodged with the ATO" (and their existing zh/vi versions).
- Fees shown on SVT: $220 TFN-only return, $385 with ABN (incl. GST). Guarantee wording unchanged.
- Residency is always "may be" or "usually", never definitive. Never promise a refund or amount. Never mention AI or bots.
- No em or en dashes and no Chinese double dash. Sentence case headings. Chinese and Vietnamese are written natively.

## Your slice
Given in your prompt. Look for, in priority order: rule breaches (P0); wrong or stale facts against official sources
(ato.gov.au, homeaffairs.gov.au for visa 500 work conditions, fairwork.gov.au) (P0/P1); technical/indexing problems
(canonical, hreflang en/zh/vi, sitemap, robots, llms.txt, http vs https, JSON-LD) (P1); answer-first and AI-quotable
openings, FAQ quality (P1); links from guides to the four service pages and between languages (P1); search intent gaps
versus the queries and versus top-ranking competitors (use web search in the language) (P2); native quality zh/vi (P2).
Work efficiently: extract with a script, deep-read what the data flags. Group repeated patterns into one finding.

## Output
`/tmp/claude-0/-home-claude/9ea64e4e-f7cd-5716-bf6b-c9c7b3587de4/scratchpad/plan/round4/svt-<slice>.json`
`{"slice": "...", "summary": "...", "findings": [{"id","priority","category","url","file","locator","problem","fix","evidence"}]}`
Every P0/P1 quotes the current text in `locator`. Fixes in the page language. Reply in 4 lines.
