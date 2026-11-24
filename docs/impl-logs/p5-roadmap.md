# p5-roadmap: critic and sequencer (read only; no code changed)

Sources: PLAN_CURRENT.md (including "Jo's decisions, 24 Nov (final)"), analysis a01 to a20, `gsc24/bing/*` (Copilot, 20 Oct to
21 Nov), `gsc24/wht-coverage-1124.xlsx`, `svt-coverage-1124.xlsx`, `wht-crawled-not-indexed-1124.xlsx`. Every target below is
an ESTIMATE. Rankings are never guaranteed.

## 1. Binding constraints, ranked

C1. Authority (off-site links and mentions) is the main limit on money terms. Evidence: /tax-return already has about 3,000
words, 15 FAQs, a key figures table (a16 F4) and still sits at pos 30.15 (760 impr); /superannuation 16.65 and "claim
superannuation" 38.41 even after the rewrite; SVT buyer queries at 27 to 91 (a13 F3); FR/IT/ES flagships have no Pages row
(a09 F1); the WebSearch index did not return either domain for 30 searches, brand included (a16 F1, a18 F5). Competitors that
outrank us on head terms (ATO, Taxback, etax, H&R Block, Lawpath) have thinner pages but years of links.
C2. Indexing. WHT: 503 indexed vs 1,019 sitemap URLs; 394 discovered not indexed (mostly new FR/IT/ES), 156 crawled not indexed.
Of the 156: ja 58, de 50, en 26, old /guides 20, fr 1, it 1; 119 last crawled May to July (coverage file). So Google has
declined mainly the TRANSLATED guides, not English ones. Index count rose 292 (20 Oct) to 503 (16 Nov), so the trend is right.
SVT: 503 indexed, 73 not (63 discovered).
C3. Content quality of translations: near duplicate topics x 6 languages (a15 F1, F2). Adding more translated pages adds to
the pile Google already declines.
C4. Seasonality: no year on year data exists (WHT Chart starts 19 Jul). Dec to Jan is the holiday trough; Feb is the SVT intake;
Mar to Jun departures (DASP, leaving Australia); Jul to Oct tax return season (a20 F8). Clicks from 1 Dec to 22 Feb will mostly
reflect season, not our work.
C5. Measurement: GA4 whatsapp_click broken since early Oct; consent banner undercounts; GSC exports overlap and cap at 1,000 rows;
42,974 zero click #fragment impressions distort page CTR (a15 F5); Jo deploys daily.

Honest limit of code only work. Code can win (a) long tail questions where we already rank 2 to 7 and are cited by Copilot,
(b) soft native SERPs (DE blogs from 2016 to 2019, a17 F2 F3; JA 代行 pos 2.69), (c) AI citation share, (d) indexing and
conversion. Code alone is unlikely to put /tax-return, /superannuation, "claim superannuation", "working holiday visa tax
return" or SVT money terms at #1 against ATO and Taxback; a realistic code only range is page 1 to 2 for some of them by
July 2027 (estimate). Safest off-site options Jo can choose later, in order of risk: (1) Bing and Google entity hygiene
(consistent Organization name, logo, sameAs; SVT legalName, a15 R9); (2) the existing free partner guide programme to
education agents, hostels, WHV communities (pvtistes, jawhm.or.jp, DE backpacker blogs with outdated facts, a17 R8), earned
and disclosed; (3) listing requests on resource or comparison pages that already rank (finder, backpackerjobboard, a16 R8);
(4) a small original data piece (for example TFN wait times reported by clients, anonymised) offered to press. Never: paid
links, fake reviews, undisclosed posts, cross brand links, separate outreach lists per brand.

## 2. What is missing from the plan
M1 P1 S. Copilot citations are our biggest proven AI asset and the plan does not protect or measure them: 6,621 citations in
33 days; 9 to 20 Nov average 236/day (20 Oct to 5 Nov 201/day); 98 pages cited; top 10 pages = 4,080 of 5,888 page citations
(69%): how-long-does-it-take-to-get-a-tfn 1,664, countries-with-medicare-agreement 633, six-month-employer-rule 397,
can-you-start-work-without-a-tfn 281, tax-back 267, how-to-update-address-with-ato 245, what-happens-without-your-tfn 190,
how-many-hours 142, tfn-reference-number 140, how-to-find-lost-tfn 121. Add a FROZEN list: these 10 keep title, H1, first
two paragraphs and H2 ids; only additive links/CTAs below the opening. This overrides a18 P1 and a19 R1 (rewrite the opening
and title of the TFN timing page): do not do it; its zero click on Google is the price of 1,664 citations.
M2 P1 S. Grow citation share where it is low and the page is ours already: "how to change address with ato" 16.99%, "medicare
reciprocal countries with australia" 17.99%, "how to get a tax refund if i am on a working holiday visa" 19.23% (110 cit.),
"tax return for working holiday" 22.49% (74). Fix by adding a dated fact table or a short summary BELOW the frozen opening,
not by rewriting. Measure: share per grounding query in the next Bing export.
M3 P1 S. AI referral tracking: GA4 sessions from chatgpt.com, copilot.microsoft.com, perplexity.ai, gemini.google.com with
landing page (a18 section 4). Add to plan item 0. Plus a fortnightly 10 question prompt panel (a18 F5 list), owner Jo.
M4 P1 S. A dated change log (date, URL, what, old text) for every deploy, including Jo's daily small edits. Without it no
checkpoint below can attribute anything. Five pages are still on BEFORE text (/abn, /medicare, can-you-start-work-without-a-tfn,
/blog, /de/tax-return, a14 1b): record them as "not changed" in cohorts.
M5 P1 S. Translation control rule: no new translated guides in fr/it/es until each language has at least 100 of 169 URLs with
impressions (now 57/53/54); new pages ship EN first, then DE and JA where GSC shows native demand. For the 108 ja/de crawled not
indexed URLs: internal links and request indexing for the money and top topics only; no bulk noindex (a15 R3).
M6 P2 S. Stale /blog hub (BEFORE title live, a14, a15 F3) and client only pagination (a15 F9): purge cache, then server
rendered page links. /tax-residency 302 with 736 impr (a15 R8): Jo decides 301 to the residency guide.
M7 P2 S. Seasonal SVT pages the plan omits: summer break work guide and "graduating this summer" section by mid Dec (a20 SVT
1, 11); first job hub by late Jan for the Feb intake (a20 SVT 3); 2026-27 student tax rates (a20 SVT 2).
M8 P2 S. SVT in Bing: the IndexNow script has no SVT host (a18 F10); add it now that the SVT sitemap is in Bing (24 Nov).

## 3. What is wrong, low value or risky in the plan
W1. Removed per Jo (24 Nov, final): Phase 3 Korean and Traditional Chinese; named reviewer line (a16 R6); any new fee display
(a16 R4 on /tax-return, a17 R2 JA/DE "料金/Was kostet"); TFN mail-holding service; SVT super consolidation service. What
STAYS, as wording fixes in Wave 1 (all languages): Medicare Entitlement Statement "we explain how to apply" (includes the
medicare-levy guide sentence "We take care of this for you" if it refers to the statement, a11 F5); remove any SVT text that
says we consolidate or roll over super; remove the "verified address that holds mail" claim from the EN TFN guide and
translations. Also check the live /medicare description for "never owed" (a14 R5).
W2. Plan item 5 puts the target phrase into the /superannuation H1. a02, a05, a19 all say do not rewrite /superannuation
again (pos 19.9 to 16.65 improving, on-page passes). Do it on /tax-return only; feed /superannuation with links.
W3. Plan item 11 (visible sources line on every guide in one deploy) is a template change on all 144 x 6 guides including the
frozen 10. Ship it to a cohort first (EN Medicare and Work Rights guides), keep the TFN cohort as control, extend after one
checkpoint. Place it at the end of the article so openings are untouched. The text must be true per page ("checked" only
where a person checked).
W4. Cannibalisation risks in Phase 2: /leaving-australia vs /superannuation, tax-obligations-after-leaving, early-tax-return
(hub must link, not repeat DASP steps); "what changed 1 July 2026" vs calculator and backpacker-tax-rate guide; JA "choosing
help" guide vs /ja/blog/what-is-a-tax-agent (96 clicks, the top JA URL, a07 F3): defer the JA guide to after checkpoint 4,
or skip; SVT /abn hub vs 6 ABN posts (a13 R4); homepage vs /tax-return (a02 F5). Rule: each new page gets one owner query set
written in the change log; at 6 weeks check that two of our URLs do not share a query (GSC query filter, Pages tab).
W5. 13 items in one December zip = unreadable results. Split into waves with a hold out cohort (section 4).
W6. Low value for now: llms.txt regeneration (few engines read it, a18 F7), duplicate Article microdata (warnings only),
Ireland/Canada guides (P3), payroll drift guides. Keep as S fillers; never ahead of M1 to M5.
W7. "DASP pair merge (decide in Dec)": data says the non owner tax-on-super-withdrawal ranks better (8.85 vs 10.15, growing,
a05 R5). Decision rule: do not merge; retarget the 65% explainer instead.

## 4. Change rules for daily deploys
- Waves: Wave 1 compliance, tracking, technical (no title or opening changes); Wave 2 additive internal links; Wave 3 money
  page copy; Wave 4 new pages. Jo's daily edits go in the change log and avoid cohorts under test.
- Control cohorts: frozen top 10 Copilot pages (M1); 20 established EN URLs from a01 R1 left without new links in Wave 2
  (for example can-you-have-tfn-and-abn, tax-free-threshold, white-card, apply-for-tfn-before-arriving, bicycle deductions).
- Freeze: no deploys 21 Dec to 3 Jan except fixes. Never judge clicks across 24 Dec to 2 Jan.
- Strip #fragment rows; report positions for the fixed set, not the site average (mix from new FR/IT/ES pages moved site
  position 7.88 to 9.12, a01 F2).

STOP / ROLLBACK RULE (apply at each checkpoint, per changed URL or cohort, after at least 14 days live):
R-a Rollback if the page's main query or page position worsens by 3 or more AND clicks fall 25% or more vs the control cohort
    over the same 14 days, with at least 200 impressions in the window. Under 200: wait to 28 days.
R-b Rollback if Bing citations of a changed top 20 cited page fall 30% or more vs its previous 14 days while site citations
    move less than 10%.
R-c Rollback if a changed indexed URL moves to "crawled, currently not indexed" or drops out of Pages.
R-d Title tests: revert if CTR at stable position (within 1) is lower than baseline after 28 days (casual-shift: under 0.6%).
R-e Any rule breach found (agent, lodging, refund, cross brand, Medicare statement, residency wording): fix the same day.
Rollback = restore old text from the change log within 1 day, log it, no second change on that URL for 28 days.

## 5. Twelve week roadmap (owner, dependency). Checkpoints use GSC data to about 3 days before.
| Wk | Dates | Owner | Work | Depends on |
|---|---|---|---|---|
| 1 | 1 to 7 Dec | Claude | Wave 1 zip: whatsapp_click + Consent Mode both sites; mobile bar topic and title (a11 R1); AI referral report spec (M3); compliance wording (W1 list, /tax-return OG "Lodge Your"/"then lodged"); 301s for 11 404s; /blog/category/super noindex; IndexNow with SVT host | none |
| 1 | 1 to 7 Dec | Jo | Start change log; record weekly CRM chat count (baseline); purge /blog cache; casual-shift CTR check (28 days since about 9 Nov) | none |
| 2 | 8 to 14 Dec | Jo | Deploy Wave 1 (by 8 Dec); request indexing for changed money URLs; first prompt panel | Wave 1 |
| 2 | 8 to 14 Dec | Claude | SVT summer break guide + graduating section en/zh/vi; vi TRS routing box; zh/vi home answer blocks (plan 9) | none |
| CP1 | Mon 14 Dec | both | Tracking events arrive by topic; wording fixes live; index counts; Bing export | Wave 1 live |
| 3 | 15 to 20 Dec | Claude, Jo deploys by 18 Dec | Wave 2 links (EN): plan 3, 4, 6; Medicare levy guide to /medicare, TFN delayed to /tfn (a11 R2 R3); DASP guides to /superannuation with "claim superannuation" anchor; tax return anchors from refund-time and deductions guides. Control cohort untouched | CP1 |
| 4 | 21 Dec to 3 Jan | none | FREEZE. Claude drafts Wave 3 offline | none |
| CP2 | Mon 28 Dec | Claude | Indexing and Bing citations only (clicks are holiday noise) | none |
| 5 | 4 to 10 Jan | Jo deploys 5 Jan | Wave 3: /tax-return H1 phrase + answer-first + "missed 31 October or earlier years?" section; DE links to /de/tfn and 34 zero impression guides; JA wage table and links, /ja/tax-return anchor from tax agent guide (plan 5 to 7) | CP2 |
| CP3 | Mon 11 Jan | both | Wave 1 and 2 at 3 to 4 weeks: apply stop rule; casual-shift decision; DASP merge closed (W7) | 14 days data |
| 6 | 11 to 17 Jan | Claude | Wave 4a: WHT /leaving-australia EN, DE, JA; "what changed 1 July 2026" EN, DE, JA; calculator 2026-27 option. All facts checked on ato.gov.au, dated | CP3 |
| 7 | 18 to 24 Jan | Claude, Jo | SVT first job hub (Feb intake), SVT 2026-27 rates, SVT /abn hub en/zh/vi; Jo deploys 4a + SVT by 21 Jan; request indexing | 4a done |
| CP4 | Mon 25 Jan | both | Wave 3 at about 3 weeks; FR/IT/ES 28+ day baseline; owner query check for new pages starts | none |
| 8 | 25 to 31 Jan | Claude | FR/IT/ES snippet fixes on the zero click pages only (a08 R3) + links to flagships; Payday Super guide EN, DE, JA | CP4 |
| 9 | 1 to 7 Feb | Claude | Sources line on cohort 1 (W3); citation share additions below openings (M2) | CP4 |
| CP5 | Mon 8 Feb | both | Wave 3 at 5 weeks; new pages indexed?; crawled not indexed list re-export; consolidation shortlist for Jo | coverage export |
| 10 | 8 to 14 Feb | Jo | Decide consolidation (merge + 301 in all languages) for guides with 0 impressions for 3 months; decide off-site option | CP5 |
| 11 | 15 to 21 Feb | Claude | /leaving-australia FR/IT/ES only if M5 threshold met; DE country page in German; DASP departure season links (Mar to Jun peak) | CP5 |
| 12 | 22 to 28 Feb | Claude | CP6 quarter review (Mon 22 Feb): KPI table vs baselines, what to roll back, next quarter (EOFY and tax time 2027 pages live by May/June) | all |

## 6. Success metrics (baseline from data; W12 targets are estimates)
| Metric | Baseline (source) | Week 12 direction / target |
|---|---|---|
| WHT indexed pages | 503; crawled not indexed 156; discovered 394 (coverage 1124) | 620 to 700 indexed; crawled not indexed under 130 |
| SVT indexed pages | 503 of 561; 73 not (svt coverage) | 530+ |
| Copilot citations WHT | 236/day (9 to 20 Nov); 98 pages; top 10 = 4,080 (bing/*) | hold 200+/day; no frozen page down 30%; 110+ pages cited |
| Copilot citations SVT | 0 (no sitemap until 24 Nov) | first citations by CP3 |
| WHT clicks/day, fixed baseline | 32.0 (9 to 20 Nov), 30.1 (22 Sep to 20 Oct) (a01) | Feb weekdays at or above 32 (season unknown) |
| "working holiday tax return" / /tax-return | 17.58 / page 30.15, 760 impr (a02) | under 12 / under 20 |
| /superannuation / "claim superannuation" | 16.65 / 38.41 | under 14 / likely still over 20 without links (honest) |
| /tfn CTR, /abn, /medicare | 0.41% @7.84; 41 clicks @6.28; 95 @5.35 | no loss (stop rule) |
| FR/IT/ES URLs with impressions; flagships | 57/53/54; 0 flagship rows (a08, a09) | 90+ each; all 3 flagships with rows |
| DE guides with 0 impressions | 34 of 144 (a06 F6) | under 20 |
| JA wage cluster | 917 impr, 0 clicks; page pos 8.15 (a07 F5) | page under 6.5; clicks above 0 |
| SVT clicks/day; money query | 2.46 (9 to 21 Nov); "international student tax return" @51.1 (a12, a13) | 3+ in Feb intake; under 30 |
| WhatsApp chats by topic | GA broken; Jo's CRM count (W1) | events recorded for 100% of site chats by topic |
| Prompt panel (10 questions x 3 engines) | 0 of 30 domain appearances (a18 F5, one search tool) | at least 5 of 30 |

## 7. Where #1 is realistic now (prioritise these, code only)
Google: "オーストラリア タックスリターン 代行" 2.69; DE "superannuation australien zurück bekommen" 4.59, "steuerjahr australien"
5.2; "ato dasp" 5.38; "abn working holiday visa" 5.0; TFN arrival guides 4.9 to 5.6; JA trial shift query pos 2.
Copilot: queries where share is already 37 to 63% ("what is reference number for tfn application" 63.46%, "tfn application
reference number" 42.86%, "how long does it take to get a tax file number" 39.16%, "how long does it take to get a tfn" 37.04%).
Not realistic without authority in 12 weeks: backpacker tax head term (news SERP), DASP/ATO definitional terms, SVT money terms.
