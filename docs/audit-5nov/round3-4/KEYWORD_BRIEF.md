# Keyword map, one site and one language (read-only)

Goal: rank first on Google and be cited by AI answers for four services: TFN, ABN, tax return (refund), super (DASP).
Sites: WHT = workingholidaytax.com.au (working holiday makers, visas 417/462; en, de, ja, fr, it, es);
SVT = studentvisatax.com.au (international students, visas 500/485; en, zh, vi). Repository (read-only):
`/home/claude/v3/whvtax-FINAL58`. WHT routes `src/app/(site)` and `src/app/(<l>)/<l>/...`; WHT guides in blog data files;
SVT routes `src/app/(svt*)`, content `src/lib/svt/**`.
Search Console exports (3 months):
- WHT `/mnt/user-data/attachments/9ea64e4e-f7cd-5716-bf6b-c9c7b3587de4/97a62c61-workingholidaytax.com.au-Performance-on-Search-2026-11-05.xlsx`
- SVT `/mnt/user-data/attachments/9ea64e4e-f7cd-5716-bf6b-c9c7b3587de4/60b04d4c-studentvisatax.com.au-Performance-on-Search-2026-11-05.xlsx`

No Keyword Planner access: do NOT invent search volumes. Use (a) our Search Console impressions where they exist,
(b) web search in the language and target countries to see what ranks, the People also ask / related questions you can
see, and the wording competitors use, and (c) native knowledge of how people phrase it. Mark every keyword with its
evidence: "GSC n impressions" or "SERP observed" or "native phrasing".

## Output
`/home/claude/v3/whvtax-FINAL58/docs/keywords/<site>-<lang>.md` (you may create this one file only; no other edits):
1. For each service (TFN, ABN, tax return, super/DASP): a table of 8 to 15 keywords: keyword, intent (info / service),
   evidence, our page that should win it (exact URL), current state (ranks pos X / page exists but weak / no page).
2. Gaps: keywords with clear demand and no matching page or section (max 5), each with the page to add or extend.
3. Cannibalisation: keywords where two of our pages compete, and which one should own it.
4. AI answers: 5 questions in the language that AI assistants are likely asked for these services, and which of our
   pages should be the quotable answer.
Write in English, keywords in the native language. No dashes. Reply in 3 lines.
