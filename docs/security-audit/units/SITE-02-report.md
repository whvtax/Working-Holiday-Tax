# SITE-02 report

## Coverage

| file | lines | ranges read | status |
|---|---|---|---|
| src/app/(site)/abn/page.tsx | 486 | 1-486 | REVIEWED |
| src/app/(site)/blog/[slug]/GuideArticle.tsx | 641 | 1-320, 321-641 | REVIEWED |
| src/app/(site)/blog/[slug]/page.tsx | 890 | 1-450, 451-890 | REVIEWED |
| src/app/(site)/crm/crm-design.css | 547 | 1-547 | REVIEWED |
| src/app/(site)/expenses/delivery-drivers/page.tsx | 347 | 1-347 | REVIEWED |
| src/app/(site)/page.tsx | 429 | 1-429 | REVIEWED |
| src/app/(site)/superannuation/page.tsx | 552 | 1-552 | REVIEWED |
| src/app/(site)/tax-return/page.tsx | 606 | 1-300, 301-606 | REVIEWED |
| src/app/(site)/tfn/page.tsx | 500 | 1-500 | REVIEWED |

Total: 9 of 9 files, 4,998 lines, every line read.

Files outside the unit opened to judge a finding (read in full unless a range is given):
- src/lib/json-ld-html.ts (7 lines)
- src/lib/render-inline.ts (41 lines)
- src/lib/wa.ts (lines 1-200)
- src/lib/agent.ts (6 lines)
- src/components/ui/Accordion.tsx (67 lines)
- src/app/(site)/crm/layout.tsx (108 lines; owned by SITE-04, read only to see where crm-design.css is loaded)
- grep only (not read): src/components/wht/ExpensesBlocks.tsx (jsonLdHtml use, lines 175-178), src/lib/constants.ts (names WA_NUMBER, SITE_URL), src/app/(site)/blog/data.ts (import lines and a sample of body lines)

Nature of the unit: eight of the nine files are static public marketing pages (server components, no forms, no uploads, no request input other than the `slug` route parameter, no database or network calls) and one is a stylesheet. There is no CRM page logic, no form, no upload handler and no token-in-URL handling in this unit. The findings are therefore low severity.

## Findings

### SITE-02-F01: Copy implies the business itself is a tax agent and deals with the ATO directly, against the pages' own stated rule
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE (the wording); the legal effect REQUIRES review by the supervising agent
- CWE: n/a (regulatory / misleading representation)
- Files and lines:
  - src/app/(site)/page.tsx:392-393 ("A tax agent will never ask for your myGov login details." followed by "Anyone who asks for them is not us.")
  - src/app/(site)/page.tsx:151 ("You need nothing. We deal with the ATO"), :310 ("We deal with the ATO directly")
  - src/app/(site)/abn/page.tsx:426, src/app/(site)/tfn/page.tsx:432, src/app/(site)/superannuation/page.tsx:349 (same "We deal with the ATO directly" sentence)
  - src/app/(site)/tfn/page.tsx:113-114 ("someone has to ring them, and it will not be you")
  - src/app/(site)/page.tsx:163 (guide link titled "Doing it yourself or using an agent", placing the business on the "agent" side)
- Evidence: the files carry explicit rules in comments: "no claim to be a registered agent" (tax-return/page.tsx:26), "no first person claim to being a registered tax agent" (tfn/page.tsx:23), "no title or keyword that asserts we are a tax agent" (abn/page.tsx:21). The approved formula used elsewhere is "reviewed and signed off by a registered tax agent" / "operates under the supervision of a registered tax agent". The lines above go further: the home page sentence pair equates "a tax agent" with "us", and "We deal with the ATO directly" attributes ATO representation to the business in the first person. The supervision statement with the Tax Agent Number and the register link appears only on /tax-return (tax-return/page.tsx:565-566); the home, ABN, TFN, superannuation and delivery-drivers pages make the "we deal with the ATO" claim without it.
- Root cause: approved wording is enforced by comment only; there is no shared constant or test for the first-person ATO and "tax agent" phrases on these pages.
- Attack prerequisites: none (public copy).
- Impact: risk of a holding-out or misleading-advertising complaint under the tax agent services regime; reputational. No technical exposure.
- Recommended fix: reword page.tsx:392 to the neutral form already used at tax-return/page.tsx:570 ("Nobody legitimate will ask you for your myGov password"); replace "We deal with the ATO directly" with wording that attributes ATO dealings to the supervising registered tax agent; add the supervision line with the AGENT_TPB link to every page that makes the claim (or to the shared footer).
- Regression test: a content test that fails if any file under src/app/(site) contains "We deal with the ATO" or "A tax agent will never" without the supervision sentence on the same page.
- Limits of this verification: I did not read the root layout or footer, which may already carry the supervision statement site-wide. I did not read the localized (de, ja, fr, it, es) versions. Whether these phrases breach the law is a legal judgement I cannot make.

### SITE-02-F02: ABN page hard-codes a single "flat $385" fee, contradicting the file's "no price anywhere" rule and omitting the foreign-income tier
- Severity: LOW
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a (business logic / price consistency)
- Files and lines: src/app/(site)/abn/page.tsx:438 (price), :21 (rule "No price anywhere"), :440 ("The fee is flat")
- Evidence: line 438 states "The fee for a return with ABN income is a flat $385, including GST." The audit brief's price list has $385 for TFN+ABN and $495 for TFN+ABN with foreign income, so "flat $385" is wrong for a customer with ABN and foreign income. A grep for the five price figures across src/app/(site)/**/*.tsx returns this file only, so it is the one English marketing page with a literal price, typed in rather than read from a shared price source.
- Root cause: literal price in page copy with no single source of truth.
- Attack prerequisites: none.
- Impact: a customer quoted $495 on WhatsApp can point to a published "flat $385"; misleading-price exposure; drift when prices change.
- Recommended fix: either remove the figure (as the comment at line 21 requires and as every other page in the unit does: "We confirm the fee on WhatsApp") or render it from the shared price constants and add "from" plus the foreign-income condition.
- Regression test: content test asserting no "$" + price literal in src/app/(site) pages outside the shared price module; or a test that the ABN page figure equals the price constant.
- Limits of this verification: I did not read the price module (src/lib/svt/price-check.ts appeared in grep but is SVT) or the localized ABN pages.

### SITE-02-F03: Guide share row: WhatsApp share URL depends on `window` during render, and "Copied" is shown without checking the clipboard result
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: n/a (plain broken code)
- Files and lines: src/app/(site)/blog/[slug]/GuideArticle.tsx:545 (share URL), :596-604 (anchor), :534-539 (copy handler)
- Evidence: `waShareUrl` is computed in the render body with `typeof window !== 'undefined' ? window.location.href : ''`. The server render produces an href with the title only; the first client render produces title plus URL. That is a hydration attribute mismatch on the `<a href>`; React does not patch mismatched attributes on hydration, and later re-renders see no prop change, so the link can keep the server value and share the title without the page URL. Separately, `handleCopy` calls `navigator.clipboard.writeText(...)` without awaiting or catching it and sets `copied` to true unconditionally, so a denied or unavailable clipboard still shows the "Copied" label and leaves an unhandled rejection.
- Root cause: browser-only value read during render instead of in an effect or the click handler.
- Attack prerequisites: none; not a security issue.
- Impact: share feature may silently share no link; false success message.
- Recommended fix: build the WhatsApp URL from `SITE_URL + '/blog/' + guide.slug` (locale-aware), which is identical on server and client; in `handleCopy`, await the promise and set `copied` only on success.
- Regression test: render test asserting the share href contains the canonical article URL in server output; unit test that a rejected `writeText` does not set the copied label.
- Limits of this verification: not run; the hydration outcome depends on the React version in use.

### SITE-02-F04: FAQ JSON-LD deep-link anchor is built by a different function from the one that sets the heading id
- Severity: INFORMATIONAL
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: src/app/(site)/blog/[slug]/page.tsx:531-534 (`headingAnchor`), :551, :695; src/app/(site)/blog/[slug]/GuideArticle.tsx:89-93 (`slugify`), :357
- Evidence: the comment at page.tsx:531 says the anchor "Matches the id GuideArticle gives every H2". `slugify` first applies NFD normalisation and strips combining accents; `headingAnchor` does not. A question heading containing an accented letter gets id "cafe-..." in the page and anchor "caf-..." in the FAQPage `url`, so the published deep link points at no element.
- Root cause: two copies of the same slug function (the accent fix of 5 Nov was applied to one only).
- Attack prerequisites: none.
- Impact: broken fragment links in structured data for affected headings only. No security impact.
- Recommended fix: export one slug function and use it in both files.
- Regression test: for every guide, assert each FAQ anchor equals the id of an H2 produced by the article renderer.
- Limits of this verification: I did not scan the English guide bodies for accented question headings, so I cannot say how many guides are affected today (possibly none).

### SITE-02-F05: Scroll effect in GuideArticle is torn down and re-registered on every render
- Severity: INFORMATIONAL
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: src/app/(site)/blog/[slug]/GuideArticle.tsx:477 (`headings` recomputed each render), :491-532 (effect with dependency `[headings]`)
- Evidence: `getHeadings(guide.body)` returns a new array on every render, so the dependency changes every time. Each scroll tick that changes `scrollProgress` re-renders, removes and re-adds the scroll listener, repeats the `getElementById` lookups the comment at :494-495 says are cached "once", and calls `compute()` again.
- Root cause: unmemoised derived value used as an effect dependency.
- Attack prerequisites: none.
- Impact: wasted work on long guides on low-end phones. No security impact.
- Recommended fix: `useMemo(() => getHeadings(guide.body), [guide.body])`.
- Regression test: test that `addEventListener('scroll')` is called once across several state updates.
- Limits of this verification: not profiled.

### SITE-02-F06: Seasonal guide ordering and "deadline has passed" wording are fixed at build time
- Severity: INFORMATIONAL
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: n/a
- Files and lines: src/app/(site)/blog/[slug]/page.tsx:346-355 (`new Date().getMonth()`), :111-113 (`generateStaticParams`); src/app/(site)/tax-return/page.tsx:191, :221, :448 (hard-coded "31 October 2026, which has passed")
- Evidence: the guide page is statically generated and sets no `revalidate` (grep found none), so `decisionOrder` reflects the month of the last deploy, not the month of the visit. The tax-return page states the 2025-26 deadline has passed as literal text; it will be stale again from 1 July 2027.
- Root cause: date-dependent content in static output.
- Attack prerequisites: none.
- Impact: stale ordering or stale tax-deadline statement if no deploy happens around 1 July and 1 November. Accuracy only.
- Recommended fix: add a calendar reminder or a build-time test that fails when the hard-coded financial year is no longer current; or set a daily `revalidate` on the guide route.
- Regression test: test with a mocked date in July asserting the deadline guide leads.
- Limits of this verification: I did not check next.config or a parent layout for a route-level revalidate setting.

## Checked and found sound

- JSON-LD injection: every `<script type="application/ld+json">` in the unit goes through `jsonLdHtml`, which escapes `<`, `>` and `&` after `JSON.stringify` (src/lib/json-ld-html.ts:5-7). Uses: abn/page.tsx:314-317; blog/[slug]/page.tsx:757-765; page.tsx:270-274; superannuation/page.tsx:269-272; tax-return/page.tsx:420-424; tfn/page.tsx:337-340; delivery-drivers via JobExpensesPage (ExpensesBlocks.tsx:175-178, grep only). All inputs are static repository constants or guide data.
- XSS in guide bodies: the four `dangerouslySetInnerHTML` sinks (GuideArticle.tsx:397, 416, 430, 440) all receive `renderInlineMarkdown` output, which escapes `<` and `>` before adding markup and renders a link only when the href matches an allowlist of internal path, `#`, `https://` or `mailto:` with no quotes, whitespace or backslash (src/lib/render-inline.ts:26-40). Headings (GuideArticle.tsx:368, 379) and TOC entries (:630) are rendered as React text. `&` is not escaped, which allows character entities but cannot create a tag or break out of the href attribute.
- The inline `<style dangerouslySetInnerHTML>` at blog/[slug]/page.tsx:778 is a constant string with no interpolation.
- Route parameter handling: `slug` is used only as a lookup key in `getGuideBySlug`; an unknown slug gives `notFound()` (blog/[slug]/page.tsx:164-165, 567-568). The slug that reaches URLs and JSON-LD is `guide.slug` from the data file, not the raw request value.
- FAQ rendering: Accordion renders answers as text nodes split on blank lines, no HTML sink (src/components/ui/Accordion.tsx:57-59).
- WhatsApp links: `waUrl` builds the prefill from fixed phrase tables, truncates `detail` to 120 characters and applies `encodeURIComponent` (src/lib/wa.ts:188-198). All `detail` values in this unit are static strings or guide titles (GuideArticle.tsx:290; delivery-drivers/page.tsx:66; tax-return/page.tsx:528). No token, identifier or personal data is placed in any URL in this unit.
- External links opened in a new tab carry `rel="noopener"` or `rel="noopener noreferrer"` (GuideArticle.tsx:305-306, 598-599; superannuation/page.tsx:342, 379; tax-return/page.tsx:566).
- Tax Practitioners Board link is built from the constant AGENT_TPB, not from input (tax-return/page.tsx:565-566).
- Guarantee wording: every statement of the guarantee in the unit carries the "returns with TFN income only" limit, including on ABN-facing pages: abn/page.tsx:438; delivery-drivers/page.tsx:71; page.tsx:180, :330; superannuation/page.tsx:509; tax-return/page.tsx:557; tfn/page.tsx:482.
- Registered-agent wording other than F01: "reviewed and signed off by a registered tax agent" / "operates under the supervision of a registered tax agent" at page.tsx:142, :249, :387-388; tax-return/page.tsx:79, :132, :236, :286, :344, :372, :563, :565; tfn/page.tsx:447-448; superannuation/page.tsx:513; delivery-drivers/page.tsx:72; blog/[slug]/page.tsx:835. None says the business is the agent.
- Analytics events in GuideArticle send only slug, title, category, read time and share method (GuideArticle.tsx:483-488, 538, 542, 294-295); no personal data.
- crm-design.css: no `url()`, no `@import`, no `expression()` (grep), so no external resource loads and no data-exfiltrating selectors; it is tokens and layout only. No secrets or customer data in comments.
- No secrets, keys, tokens, phone numbers or customer data are hard-coded in any of the nine files. (WA_NUMBER and AGENT_TPB are imported by name from src/lib.)
- No forms, uploads, client-side-only validation, server actions, fetch calls or database access exist in this unit.
- Cross-brand: all nine files are Working Holiday Tax only; nothing imports from src/lib/svt. The `.mia-theme` rule (crm-design.css:547) changes one colour token and nothing else.

## Open questions

1. CRM session check: the only CRM file in this unit is the stylesheet. `src/app/(site)/crm/layout.tsx`, which imports it, is a client component (`'use client'`, line 1) and performs no server-side session check itself; its idle logout is browser-side (lines 18-55). Whether each CRM page or src/proxy.ts checks the session on the server before render must be confirmed by the unit that owns those files (SITE-04 and whichever unit owns src/proxy.ts). I did not read src/proxy.ts.
2. crm-design.css:243-245 says the `.mono` class is for "Codes, references, TFNs", which indicates full tax file numbers are rendered in the admin browser. Whether they are masked, and which API returns them, is for the CRM and API units.
3. tax-return/page.tsx:486 "Refunds for our clients range from a few hundred dollars to several thousand" and the "Replies in about an hour" notes are marketing claims I cannot verify from code.
4. F01: does the root layout or footer already show the supervision statement and Tax Agent Number on every page? If yes, F01 reduces to rewording page.tsx:392 and the "We deal with the ATO directly" sentence.
5. The tax figures and rates quoted on these pages (rates, thresholds, cents-per-kilometre, DASP percentages, processing times) were not checked against the ATO, because the brief forbids network use.
