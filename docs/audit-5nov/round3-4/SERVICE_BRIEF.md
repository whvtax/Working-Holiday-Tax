# Round 4 brief: one service page, one language, goal = position 1 on Google and the page AI answers cite

Read-only on the repository. Write only your output file.

Site: workingholidaytax.com.au (Working Holiday Tax, WHT), for working holiday makers on visas 417 and 462.
Repository `/home/claude/v3/whvtax-FINAL58`. Service pages:
- EN `src/app/(site)/<service>/page.tsx`, others `src/app/(<l>)/<l>/<service>/page.tsx` (l = de, ja, fr, it, es).
- service = tfn | abn | tax-return | superannuation. FR/IT/ES also have a flagship tax return guide
  (`/fr/tax-return-australie-pvt`, `/it/dichiarazione-redditi-australia`, `/es/devolucion-impuestos-australia`); if your page
  is tax-return in FR/IT/ES, audit both and keep their split (flagship = complete guide, tax-return = process).
- Today the pages were already audited and fixed once (`.../scratchpad/plan/findings-*.json`, logs in `.../plan/fix/`).
  Do not repeat those findings; go deeper.
- Fact base: `public/llms.txt` Key facts. Search Console per page and queries: `.../scratchpad/agents/<lang>.json`
  (EN, DE, JA have data; FR/IT/ES launched days ago). Raw: `/mnt/user-data/attachments/9ea64e4e-f7cd-5716-bf6b-c9c7b3587de4/97a62c61-workingholidaytax.com.au-Performance-on-Search-2026-11-05.xlsx`.
  (`...` = `/tmp/claude-0/-home-claude/9ea64e4e-f7cd-5716-bf6b-c9c7b3587de4`)
- DASP research for super pages may appear at `.../scratchpad/plan/round3/dasp-plan.json`; use it if present.

## Your job
1. Find the 3-6 queries this page must win in your language (GSC data where available; otherwise the native phrases
   people type, e.g. FR "numéro TFN Australie PVT", IT "codice fiscale australiano TFN", ES "cómo sacar el TFN en Australia",
   JA "TFN 申請 ワーホリ", DE "TFN beantragen Work and Travel").
2. Use web search in that language to see who ranks top 5 for those queries and what their pages cover that ours does not
   (sections, figures, FAQs, tables, steps, official sources, freshness, format). Do not copy their text.
3. Read our page fully. Produce an exact, prioritised rewrite plan: what to add, cut or reorder, with the new copy written
   natively in the page language (headings, answer-first opening of 40-60 words that an AI can quote, FAQ items with short
   self-contained answers, key-figures block with dates and official source names), plus internal links to add (to the
   other three services where natural, and to 2-3 guides), and schema changes (FAQPage must match visible FAQs).
4. Conversion: the page must make the next step obvious (WhatsApp message). Do not invent proof or numbers.

## Rules (a single breach makes the plan unusable)
- Never say or imply the business IS a tax agent / Steuerberater / 税理士 / agent fiscal / agente fiscale / agente fiscal /
  contador / accountant, or lodges as the agent. Allowed: "operates under the supervision of a registered tax agent" and the
  approved sign-off sentence ("Reviewed and signed off by a registered tax agent before it is lodged with the ATO" and its
  existing translations on the site). "We deal with the ATO directly" is approved reassurance.
- Never promise a refund, a DASP amount or an average. Never mention AI, bots, Student Visa Tax.
- No em or en dashes. No prices on WHT pages except where the page already shows them. Sentence case headings (EN/FR/IT/ES).
- Facts: only from llms.txt Key facts, our English page, or official sites you fetch (ato.gov.au, servicesaustralia.gov.au,
  homeaffairs.gov.au, fairwork.gov.au, abr.gov.au, business.gov.au); cite the URL. TFN applications from outside Australia:
  check the ATO rule, do not assume.
- What works stays: if the page has strong GSC performance, keep its opening and title; add, do not rewrite.

## Output
`.../scratchpad/plan/round4/svc-<service>-<lang>.json`:
`{"page": "/fr/tfn", "target_queries": [...], "competitors": [{"url": "...", "what_they_have": "..."}],
  "changes": [{"priority": "P1|P2", "where": "file + section/locator (quote current text)", "action": "add|replace|remove|move",
  "new_text": "final copy in the page language", "why": "..."}], "facts": [{"fact": "...", "source": "url"}]}`
Reply in 4 lines: top 3 changes and the competitor to beat.
