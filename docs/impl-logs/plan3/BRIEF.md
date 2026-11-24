# Plan 3 research brief (24 Nov 2026): tax returns and super, both sites, all languages

S = /tmp/claude-0/-home-claude/9ea64e4e-f7cd-5716-bf6b-c9c7b3587de4/scratchpad

## Jo's request (verbatim intent)
Jo owns workingholidaytax.com.au (WHT: working holiday makers, visas 417/462; languages en, de, ja, fr, it, es) and
studentvisatax.com.au (SVT: international students, visas 500/485; languages en, zh, vi). One Next.js codebase.
"I want to be strongest on tax refund and super withdrawal pages, both sites, all languages."
Jo's idea (24 Nov), which the data supports: head terms ("tax return Australia") are owned by Taxback, Etax, H&R Block and
the ATO; we win where a visitor has a specific PROBLEM, like we already win on TFN questions (positions 5 to 7, beating
community.ato.gov.au threads). Above all myGov problems: "no access to myGov", "not getting the SMS code" (old Australian
number after leaving), "locked out", "can't link the ATO", "myID with a foreign passport"... and every other problem that
blocks a refund or a super withdrawal. The answer ends with: you don't need myGov; we deal with the ATO directly; the
return is reviewed and signed off by a registered tax agent before it is lodged; message us on WhatsApp.
Searches on 24 Nov for these myGov problems returned only community.ato.gov.au threads and ATO pages: weak competition.

## You are a RESEARCH agent. Do not edit the repository.
Code (read only): /home/claude/v68/base20 (= the v69 zip delivered to Jo; this is the only valid code base).
Data: S/gsc24/wht and S/gsc24/svt (Search Console, 3 months to 21 Nov: Queries.csv, Pages.csv, Countries.csv ...),
older exports S/gsc24/wht-1021, wht-1105, svt-1105; Bing AI citations S/gsc24/bing/*.csv (WHT only).
Earlier analysis: S/analysis/a*.md (a16 English SERPs, a17 German/Japanese SERPs, a18 AI search, a13 SVT queries, a20 gaps);
earlier plan S/plan2/PLAN_CURRENT.md and p1 to p5; rules S/plan2/IMPL_RULES.md (READ IT: every rule there applies).
Phase 1 changes already done: S/../ (see /home/claude/v68/base20/docs/SEO_AI_PHASE1_V68_2026-11-24.md). Do not propose
what is already there; read the current page/guide before proposing a change to it.
Web: use WebSearch / WebFetch for SERPs and for facts. Facts ONLY from official sources (ato.gov.au, my.gov.au,
servicesaustralia.gov.au, homeaffairs.gov.au, fairwork.gov.au, the super funds' own pages for fund processes). Give the
URL for every fact. If you cannot verify something, say so and leave it out of proposed text.

## How content works in the code (check details yourself)
WHT guides: EN src/app/(site)/blog/data.ts; DE/JA src/app/(de|ja)/<l>/blog/data.ts; FR/IT/ES src/app/(<l>)/<l>/blog/chunks/*.ts.
Money pages: src/app/(<group>)/.../tax-return/page.tsx, superannuation/page.tsx and the native-slug FR/IT/ES flagships.
SVT: src/lib/svt/content/** (guide bodies cannot hold links; related lists in long/en/links.ts, long/library.ts, pages.ts).
New guides ARE allowed now (Jo asked for them). Titles/descriptions of EXISTING pages stay frozen until the December
measurement; new guides need a title and description (title up to 60 chars, description 120 to 160).

## Output
Write ONE report to S/plan3/rNN-<topic>.md (your NN and topic are in your task). Structure:
1. Findings (fact vs inference marked, with the data row or URL behind each).
2. Proposals, ranked P1/P2/P3. For each: exact file(s), what to add or change, and for content the READY text in the
   target language (native, not translated word for word), with the official source URL for every fact in it. A new guide
   proposal needs: slug, title, description, answer-first opening (2 to 3 sentences), H2 questions with answers, the
   internal links (to /tax-return and/or /superannuation of the same language, and to related guides), and the closing CTA
   in approved wording.
3. What NOT to do (risks, rule conflicts, cannibalisation with existing pages: check slugs before proposing).
Keep it under about 400 lines. Reply to the lead in 5 lines: the report path and the 3 most valuable proposals.
Rules reminder: no "we are a tax agent / we lodge" (JA never 税理士 for us), no refund promises or amounts, no prices
added, no em/en dashes, no AI mentions, brands fully separate, SVT residency "may be"/"usually", Organization schema only.
