# Master audit — WHVTAX — 29 August 2026 (second run)

Ten specialist agents run in parallel, each with a regression check against
`MASTER_AUDIT_REPORT_2026-08-28.md`. Every finding grounded in a real file or
build-artefact read. Red-line control layer passed: no finding proposes
changing the "registered tax agent" sign-off, implying the business is itself a
registered tax agent, or altering substantive tax content. No proposed text
contains an em or en dash.

## Maturity scorecard

| # | Area | Score (1-5) | Was (28 Aug) | The finding dragging it down most |
|---|---|---|---|---|
| 1 | Security | 3.9 | 3.9 | The nonce CSP is written, correctly scoped, and switched off |
| 2 | Performance | 3.8 | 3.8/4.0 | Three "half-fixed" regressions: proxy, GuideArticle, form-link scan |
| 3 | Dead code | 3.5 | 3.5 | 1,048 lines of dead CSS shipped to every public page |
| 4 | Resilience | 3.6 | ~3.6 | `FOLLOWUP_MODE` unset silently runs demo timing in production |
| 5 | Architecture | 3.2 | 3.0 | Three phone-identity rules; tax brackets duplicated ×3, no test |
| 6 | SEO | 3.9 | ~3.8 | English guides carry weaker Article schema than their translations |
| 7 | Design | 2.9 | 3.2* | Dead German typography layer; nav CTA hover below AA |
| 8 | Mobile density | 3.4 | 3.6* | Three of four Aug-28 fixes reached English only |
| 9 | Mobile flow | 3.7 | 4.0 | Invoice upload has no interface half (silent failures, over-cap) |
| 10 | Copy | 3.4 | 4.2* | Guarantee stated without its TFN scope in 22 places, all languages |

**Overall: 3.6 / 5.** (*Design, density and copy scored on all three languages
and broader axes this run, so not directly comparable to the single-axis 28 Aug
numbers; the direction of travel is not down.)

## The one theme: fixes landed next to the problem, not on it

Five independent agents found the same shape. A fix was applied in one place
and its triggers or siblings were left untouched, so the work reads as done and
measures as unchanged:

- The store gained an indexed phone lookup; the four form routes still call the
  full-table scan (perf, resilience, architecture — three agents).
- The proxy stopped cloning headers; its matcher still runs it on all 519 pages.
- `GuideArticle` got rAF throttling; with no `useMemo` the cache it added is
  rebuilt every frame.
- The tax form got a back button, phone validation, error references and the
  `autoComplete` fix; the ABN/TFN/Super forms got none of them.
- The German credential term, the Aug-28 density fixes, and the guarantee scope
  were fixed in English (or the library) and not in de/ja.

## Top 5 cross-domain findings

1. **The money-back guarantee is stated without its TFN scope on 22 marketing
   pages, in all three languages** (copy HIGH; directly continues the 036
   library fix). The contract defines a case (refund offset against an ATO
   debt) where the customer pays and receives nothing, yet the pages say "never
   out of pocket" absolutely.

2. **The form-to-Will match scans the whole `will_customers` table in JS on
   every public form submission** (perf HIGH + resilience HIGH + architecture
   HIGH). The correct indexed lookup exists two files away and is unused. Breaks
   silently past PostgREST's 1,000-row cap, and the tail-9 rule does not match
   German or Japanese domestic number spellings anyway.

3. **`FOLLOWUP_MODE` is an unguarded, undocumented env var that defaults to demo
   timing** (resilience HIGH). If it is ever dropped, the whole contact cadence
   fires in seconds, at 3am, and auto-closes the lead in one minute, with a
   green dashboard.

4. **The nonce CSP is still off** (security + on the existing to-do). `/crm`,
   the one screen rendering customer-authored WhatsApp text, ships with the
   weakest script policy in the system.

5. **English guide pages carry weaker Article schema than their de/ja
   translations** (SEO HIGH + architecture + dead-code). The consolidation moved
   de/ja onto the richer shared template and left the 141 canonical English
   pages behind, missing `citation`, `mentions`, `articleBody` and `image`.

## A note on the font finding

Several agents flagged that the `.next` build in this workspace shipped zero
webfonts. That is a **sandbox artefact, not a production regression**: this
build was made with `scripts/build-offline.sh`, which stubs `next/font` because
the sandbox cannot reach fonts.googleapis.com. The source imports are real and
Jo's Vercel build (network reachable) ships fonts correctly, verified 28 Aug.
The real, valid finding underneath it: the guard test checks the source, not the
build artefact, so it cannot catch a genuine stub-left-in. A one-line CI check
on the built CSS closes that gap.

## Regression summary across all ten agents

Everything the 28 Aug report closed was re-verified as still closed: the
duplicate-send paths, scheduler heartbeat, per-customer mutex, `deliverOut`
result handling, AI-budget gate, payment `TROUBLE` override, the `#supervising-agent`
node, form-page noindex, OG cards, `aggregateRating` removal, tax-year single
source, Next 16 upgrade (0 vulnerabilities), `noUnusedLocals`. No prior finding
regressed. The new findings are concentrated in three places: the "half-fixed"
items above, the de/ja parity gaps, and pre-existing items no prior audit had
reached (dead CSS, phone identity, `FOLLOWUP_MODE`).

Full per-agent reports with file:line evidence, likelihood×impact and confidence
levels are retained in the session transcript.
