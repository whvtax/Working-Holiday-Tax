# Development roadmap: Student Visa Tax

Each milestone ends with the quality gate in CODING_STANDARDS.md. Nothing starts until
ARCHITECTURE.md is approved.

## Status (26 Oct 2026, branch svt-build, nothing deployed)
| # | Status |
|---|---|
| 0 | Done: Next 16.4.3, 0 critical/high (3 moderate build-time, accepted) |
| 1 | Done: host routing by rewrites (decision 001), migration 047 written and tested locally (not applied), e2e |
| 2 | Done: tokens, self-hosted fonts, CSS Modules components (decision 002) |
| 3 | Done: home + 10 guides + questions + legal (EN), facts sourced in docs/content |
| 4 | Done, gated: SVT form + brand tagging behind SVT_FORMS_ENABLED (decision 003) |
| 5 | Infrastructure done (decision 004); assistant name Mia (Jo, 26 Oct). Left for launch (Jo, 26 Oct): migration 047 (approved, after a backup), SVT number, Meta template twins |
| 7 | In progress: blog batch 1 done (5 articles, en/zh/vi); batches 2-5 per docs/content/svt-topic-map.md |
| 6 | Done: zh and vi home, guides, questions; reviewed by independent agents |
| 8 | Done: photo slots filled (IMG-01, IMG-02), share images per language, prompts in docs/content/svt-image-prompts.md |
| 9 | In progress: pre-launch checks |
| 9b | Before launch (Jo, 26 Oct): final content audit by 10 independent review agents, see below |
| 10-11 | Not started |

### Final content audit (Jo, 26 Oct): 10 agents, after the last content batch
Every guide, article, the home page and the questions page, in en, zh and vi. Each agent
works alone and reports edits as exact current text -> proposed text; findings are applied
and the tests re-run. The slices:
1. ATO facts, guides (en): every claim against the linked official page, today's version.
2. ATO facts, articles (en): same.
3. Chinese, guides + home + questions: native mainland reading, not machine translation,
   flow, terms consistent, meaning identical to en.
4. Chinese, articles: same.
5. Vietnamese, guides + home + questions: same, for Vietnamese.
6. Vietnamese, articles: same.
7. English voice: plain English for second-language readers, flow, no AI tells (no dashes,
   no filler, sentence case), consistent terms.
8. SEO, all languages: titles and descriptions (length, intent, keyword in the language
   people search in), one h1, headings, internal links, hreflang and canonicals, duplicate
   or cannibalising topics.
9. AI search (ChatGPT, Perplexity, Google AI answers): answer-first openings, quotable
   facts with sources, FAQ and Article structured data, llms.txt for the SVT host.
10. Rules and consistency: the two approved tax agent phrasings only, no refund promise,
    residency always "may be", fees, no AI mention, no immigration advice, no
    cross-brand mention, the three languages saying the same thing.

| # | Milestone | Output | Gate |
|---|---|---|---|
| 0 | Security patch release (WHT) | Next.js 16.4.3, `npm audit fix` for dev tooling, retest, release zip | 0 critical/high in `npm audit`, all tests green, browser smoke test |
| 1 | Foundations | `brand.ts`, host routing in `proxy.ts`, brand column migration, brand-aware sitemaps/robots/canonicals, Playwright set-up, CI workflow (if approved) | Tests prove a WHT page cannot load on the SVT host and the reverse |
| 2 | SVT design system | Tokens, fonts self-hosted, components (Button, PriceTag, Docket, Section, Faq, PriceCheck, Payslip, Header, Footer, StickyWhatsApp), each with tests and a11y checks | Screenshot review at 390 / 768 / 1440 |
| 3 | Core pages (EN) | Home, pricing, how it works, tax residency, Medicare, ABN delivery, do I need to lodge, past years, leaving Australia, super/DASP, about, FAQ, client agreement, privacy | Lighthouse mobile >= 90 perf, 100 a11y; copy passes the humanizer review |
| 4 | Form and backend | Tax form under SVT brand, uploads with brand prefix, CRM brand filter and badge, emails per brand | Integration tests for submit, upload, CRM read; security review of each route |
| 5 | Will for students | Brand-aware replies, student playbook rules, SVT approved texts, second number wiring (when the number exists) | Will test suite extended; no WHT behaviour change |
| 6 | Vietnamese and Chinese | `/vi` and `/zh` pages and Will texts, written by native speakers, back-translation check | Native review sign-off; layout checks with long Vietnamese strings |
| 7 | Content | Blog topics from the topic map, in batches, all three languages | Each article reviewed for facts, wording rules and AI tells |
| 8 | Images | Prompt document for Gemini, image slots filled, optimised (AVIF/WebP, sized) | No layout shift; alt text in all languages |
| 9 | Pre-launch | Security, performance, accessibility, mobile and business-flow testing (DEPLOYMENT_CHECKLIST.md) | Every item checked with evidence |
| 10 | Launch | Domain on Vercel, Search Console and Bing, monitoring | Post-launch smoke test on production |
| 11 | Working Holiday Tax refresh (after SVT launch) | New logo and visual identity for backpackers (separate from SVT), then home and key sales pages first; URLs and content kept for SEO | A/B test, not a straight swap (Jo, 31 Oct): 50/50 on the home page only, old page kept live, same canonical, at least 3 weeks or 400 WhatsApp clicks per arm; primary metric WhatsApp click-through, also paid returns, reply rate, bounce, Core Web Vitals; roll back if clicks fall 10 percent or more, LCP over 2.5 s, or organic landings drop for two weeks; 28-day baseline captured first; same quality gates |
| 12 | SVT motion (Jo, 31 Oct) | Purposeful motion on the SVT site, mobile first: pen mark drawn beside the supervision line, live WhatsApp-style example chat, myGov vs us rows revealing in turn, step line filling on scroll, sticky WhatsApp pill after first scroll; real counters only where a real number exists | Text always in the HTML and visible without JS; opacity/transform only (no layout shift); honours prefers-reduced-motion; no scroll-reveal on everything; Lighthouse mobile >= 90 perf before and after |
| 13 | Mobile menu (Jo, 31 Oct) | The mobile menu currently has everything dumped in it. Redesign it as a clear, grouped menu (main sections first, WhatsApp and Start your tax return pinned, language switch easy to reach). Brand scope (WHT, SVT or both) to be confirmed with Jo | Same links, anchor text and order in the HTML (SEO); touch targets >= 44 px; keyboard and screen reader checked; checked on 390 / 768 px |
