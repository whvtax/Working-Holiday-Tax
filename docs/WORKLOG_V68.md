# Work log: Phase 1 on Jo's v68 zip (started 24 Nov 2026, night)

Source of truth: Jo's zip `base20-FINAL-production-v68.zip`, extracted to /home/claude/v68/base20, git baseline 87ab210.
Never copy files from older versions (whvtax-FINAL58 etc.); read them only to check something.
Jo's rules: work only on this zip; no deploy; locked production zip by morning; no outreach; Jo's 24 Nov decisions
(scratchpad plan2/PLAN_CURRENT.md, end): no Medicare Entitlement Statement service, ATO address update yes, no SVT super
consolidation, no TFN mail-holding address, no new fee displays, no named reviewer, no new languages.
Priority (Jo): tax returns and super/DASP first in every language; TFN/ABN feed those.

Baseline checks on the zip as received: tsc clean; jest 521 suites, 8 failed suites / 7 failed tests, all Will/form-lang
tests already failing in Jo's zip (templates-nine-languages-18nov, redteam-injection-18nov, jo-decisions-30oct-b,
form-start-lang-18nov, playbook-30oct, stale-payee-30oct, review-fixes-27oct, language-rules-loader). Not touched.
Zip lacks scripts/ and docs/ (generate-llms, indexnow, build-offline): public/llms*.txt edited minimally by hand.

## Tasks (status: todo / doing / done)
- [x] T1 whatsapp_click tracking + consent (both sites)
- [x] T2 Jo-decision wording fixes (Medicare statement, SVT super consolidation, TFN mail address), all languages + llms files
- [x] T3 /tax-return social title "Lodge Your..." and any "lodged" claims in metadata
- [x] T4 301s for the 11 GSC 404 URLs
- [x] T5 Internal links feeding /tax-return and /superannuation (all WHT languages), tax-back guide CTA, TFN guides to tax return
- [x] T6 Money pages /tax-return and /superannuation per language: answer-first, missed-deadline/past-years section
- [x] T7 Mobile sticky WhatsApp passes guide topic
- [x] T8 SVT: vi TRS box to /vi, zh/vi home answer blocks, super page per plan
- [x] T9 Technical: duplicate Article schema, 404 sources, category noindex decision (done: Article microdata removed, Organization only; category noindex not in tech brief)
- [x] T10 Verify all (tsc, eslint, jest, build, crawl, rule scan, browser) and deliver zip + Hebrew summary

## Progress
- 24 Nov night: planning reports in scratchpad plan2 (p2, p4, p5 done; p1, p3 running). Implementation agents launched:
  tech (T1, T4, T7, T9, llms wording), en, de, ja, fr-it-es, svt (T2, T3, T5, T6, T8 per language; briefs in
  scratchpad plan2/IMPL_RULES.md and CONTENT_BRIEF.md; logs plan2/impl-<id>.md).
- Next after they finish: review diffs, rule scan, tsc, eslint, jest, build, crawl both sites, browser + axe check,
  then zip (T10). Jo (24 Nov): "nothing untested: test everything, improve everything".
- Reviewed tech agent: it removed TFN/ABN service offers from the Organization schema and llms files citing a "Jo, 18 Nov"
  decision that does not exist (the /tfn page sells "We prepare the TFN application with you"). Reverted that part; kept
  the tax return wording fix and the Medicare Entitlement Statement fix. SVT agent done (impl-svt.md).
- Crawl found 3 German guide links going through redirects (super-rate-12-percent, super-stapling-rule, what-is-superannuation);
  pointed them at live pages and removed "(bisher auf Englisch)". "Share on WhatsApp" buttons (wa.me/?text=, no number)
  no longer count as whatsapp_click: only links with a phone number are counted (test added).

## T10 final verification (24 Nov, final state)
- tsc: clean. eslint: clean.
- jest: 522 suites, 514 passed, 8 failed / 7 tests, the same 8 that fail on the v68 zip as received (they read docs/ and
  scripts/ files that are not in the zip: templates-nine-languages-18nov, redteam-injection-18nov, jo-decisions-30oct-b,
  form-start-lang-18nov, playbook-30oct, stale-payee-30oct, review-fixes-27oct, language-rules-loader). 6,887 passed.
- next build: OK, 1,649 static pages (fonts stubbed in a throwaway copy only, no network here).
- Crawl WHT: 1,019 sitemap pages, 1,022 internal link targets, 0 errors, 0 compliance hits; 20 warnings, all pre-existing
  FR/IT/ES meta description lengths (frozen until December). No links via redirects.
- Crawl SVT: 561 pages, 567 link targets, 0 errors, 0 compliance hits; 138 pre-existing length warnings (frozen).
- Rule scan of every added line: 0 dashes, 0 agent/lodge claims, 0 refund promises, 0 AI mentions, 0 Medicare claims.
- Phone browser + axe (WCAG 2 A/AA) on 21 key pages, both brands, all languages: 0 failures, 0 violations, 1 H1, no overflow.
- Redirects for the 11 GSC 404s answer 308 to live pages.
