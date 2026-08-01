# Service pages — Phase 1 (1 August 2026)

## 1. HowTo schema removed (12 files)
/tfn /abn /tax-return /superannuation in EN, DE and JA carried a schema.org HowTo block
("How to claim your DASP super refund", "How to lodge...") with step-by-step instructions.
Google was presenting these pages as tutorials, which is the opposite of what a paid-service
page should signal. The HowTo objects and their <script> tags are gone; the existing Service,
FAQPage and BreadcrumbList schemas remain untouched.
The visible step cards stay — they are already written as "we handle it for you", not as
instructions the visitor can follow alone.

## 2. Titles and meta descriptions rewritten — 15 pages
Every service page now leads with the done-for-you promise instead of the topic.

EN — "Claim Your Super Back From Australia - We Do It For You | DASP"
     "Working Holiday Tax Refund - Lodged For You By Tax Agents"
     "Get Your TFN - We Apply For You (No 45% Tax)"
     "ABN Registration Done For You - 417 & 462 Visa | Tax Agents"
     "Medicare Levy Exemption - We Claim The 2% Back For You"

DE — built around "lassen" (let someone do it for you), the German equivalent of the
     Japanese 代行 that already ranks 3rd:
     "Superannuation zurückholen lassen", "Steuererklärung Australien machen lassen",
     "TFN beantragen lassen", "ABN in Australien anmelden lassen",
     "Medicare-Levy-Befreiung - wir holen die 2 % für dich zurück"
     The German Medicare description now states plainly that Germany has no Medicare
     agreement — a real pain point unique to that audience.

JA — built around 代行 (do it on my behalf), which is already the highest-CTR query:
     スーパーアニュエーション返金代行 / タックスリターン代行 / TFN申請代行 / ABN登録代行 /
     メディケア・レヴィ免除の申請代行

## 3. Mobile sticky CTA — new component
src/components/ui/MobileCta.tsx, added to all 15 service pages.
- Mobile only (hidden at >=768px), appears after ~420px of scroll, hides near the footer
  so it never covers the closing CTA.
- Two lines: action + reassurance ("Free check · reply in ~1 hour"), localized EN/DE/JA.
- Styles appended to globals.css, including safe-area padding for notched phones.
Mobile is 64% of clicks and converts at nearly double the desktop CTR, so this is the single
highest-leverage layout change on the site.

## Files changed
16 modified, 1 new component. No content pages, blog files or CRM code touched beyond the above.
Verified: tsc --noEmit clean, eslint clean across src.

## Not done yet (Phase 2)
Full body rewrite of /superannuation and /tax-return to the 8-screen template
(hero with number, how much, 3 steps, alone-vs-us, price, proof, objections, close).

---

# Phase 2 (1 August 2026) — /superannuation and /tax-return

## Heroes rewritten: loss-framing instead of describing the service
/superannuation: "Claim your super back when you leave Australia"
             ->  "Your super is still in Australia. We get it back for you."
             sub: "Your employer paid 12% of every wage into a super fund. It is your money
             and it is still sitting there."
/tax-return:   "Working holiday tax return fast & stress-free"
             ->  "You probably overpaid tax. We get it back for you."
             sub: "Most working holiday makers are owed money and never claim it."

## New screen on /superannuation: "How much comes back to you?"
Three worked figures after the 65% DASP tax ($3,000 -> $1,050, $6,000 -> $2,100,
$10,000 -> $3,500) plus a note that fees erode an unclaimed balance. It answers the first
question every visitor has, which no screen on the page previously did.

## Removed — repetition and teaching (11,790 characters)
- /tax-return TAX RATES table (4,600) and DEDUCTIONS list (3,269): reference material that
  belongs in the blog, where it already exists. On a sales page it is 8,000 characters of
  scrolling before the visitor reaches a decision.
- /superannuation CLARITY / "Why choose our service" (3,921): said the same thing as the
  COMPARISON block that follows it, less well.
- Unused DEDUCTIONS constant removed with its section.

## 6 objection-handling FAQs added (3 per page)
Price and no-win-no-fee, "I don't know which fund I was with" / "I already left Australia",
and an honest answer to "can I just do this myself" that concedes the easy case and names
the hard parts. These are the questions that actually block a sale.

## "Free initial consultation" removed from 5 service pages
It contradicted the paid eligibility assessment in the client agreement. Replaced with
"Tell us your situation and we will tell you what you are owed."

## Result
/superannuation ~21,500 chars of sections (was ~25,400)
/tax-return     ~23,700 chars (was ~31,600)
Shorter, no duplicated pitch, and no page that teaches the visitor to do the job alone.
Verified: tsc --noEmit clean, eslint clean across src.

---

# Phase 2 mirrored to German and Japanese (1 August 2026)

Same treatment applied to /de and /ja versions of the two money pages.

## Removed — 22,689 characters of repetition and teaching
/de/superannuation, /ja/superannuation: CLARITY "why choose us" block (duplicated COMPARISON)
/de/tax-return, /ja/tax-return: TAX RATES table and DEDUCTIONS list, plus the unused constant

## Heroes rewritten to loss-framing, natively (not translated)
DE super:  "Deine Super liegt noch in Australien. Wir holen sie für dich zurück."
DE tax:    "Du hast wahrscheinlich zu viel Steuer gezahlt. Wir holen sie für dich zurück."
JA super:  「あなたのスーパーは、まだオーストラリアにあります。代わりに取り戻します。」
JA tax:    「税金を払いすぎている可能性があります。代わりに取り戻します。」

## "How much comes back to you?" screen added to /de and /ja superannuation
Same three worked figures after the 65% DASP tax, with locally written copy.

## 12 objection-handling FAQs added (3 per page x 4 pages)
Price and fee waiver, "I don't know which fund", "I've already left", and an honest answer
to "can I do this myself" — written natively in German and Japanese.

## Totals across all six money pages
EN: /superannuation 25,400 -> 21,500 · /tax-return 31,600 -> 23,700
DE: /superannuation 22,800 -> ~21,400 · /tax-return 31,900 -> ~23,900
JA: /superannuation 20,600 -> ~19,300 · /tax-return 28,300 -> ~21,200
Roughly 34,500 characters of duplicated pitch and DIY instruction removed site-wide.

Verified: tsc --noEmit clean, eslint clean across src.

---

# Phase 3 (1 August 2026) — /tfn, /abn, /medicare in all three languages

## Heroes rewritten to lead with the consequence, not the task
/tfn      "Apply for your TFN to start working legally"
       -> "No TFN means 45% tax. We sort it for you."
          sub: "...taxed at 15% instead of 45% - about $7.50 an hour back on a $25 job."
/abn      "Set up your ABN and start working as a contractor"
       -> "Need an ABN for your job? We register it properly."
/medicare "Understand your Medicare status before lodging"
       -> "Most backpackers never owed the 2% levy. We claim it back for you."
          sub: "...about $500 on $25,000 earned."
DE and JA mirrored natively (e.g. "Ohne TFN 45 % Steuer. Wir erledigen das für dich." /
「TFNがないと税率45%。取得を代行します。」).

## 18 objection FAQs added (2 per page x 9 pages)
The important one is handled head-on rather than hidden: the TFN and ABN registrations are
free on the government sites, and the pages now say so plainly, then explain what the fee
actually buys - a first-time-correct application, follow-up when the ATO stalls, and a warning
when an employer is pushing an ABN to avoid paying super and minimum rates.
Being upfront about the free option builds more trust than concealing it, and it keeps the
pages consistent with the blog, which already explains both.

The /abn pages also now answer "my employer says I need an ABN for a normal shift job" —
a real question that protects the visitor and positions the service as being on their side.

## State after Phase 3
All 15 service pages: loss-framed hero, objection FAQs, mobile sticky CTA, service-intent
title and meta, no HowTo schema, no "free consultation" claim, no DIY instructions.
Verified: tsc --noEmit clean, eslint clean across src.

---

# Em-dash sweep + /calculator and /expenses (1 August 2026)

## All long dashes removed site-wide (313 occurrences, 32 files)
The em dash and en dash are the most recognisable tells of AI-written copy, so they are now
gone from every .ts, .tsx and .css file plus public/llms-full.txt.
- English and German: replaced with a spaced hyphen or a full stop, whichever read naturally
- Japanese: replaced with the full-width comma, which is the correct native break - a Latin
  em dash in Japanese text reads as foreign
- This included dashes I had introduced myself in the new service page titles
  ("Claim Your Super Back From Australia - We Do It For You")
Verified: 0 remaining in src/ and public/.

## /calculator and /expenses reviewed
Both are top-of-funnel content pages, correctly so, and both already avoid the problems the
service pages had - no HowTo schema, no duplicated pitch.
The gap was conversion, not content:
- /expenses had a single CTA at the very bottom of a 344-line page. On a phone that is a long
  scroll before any way to act.
- /calculator had CTAs but nothing persistent.
Fix: the mobile sticky CTA now runs on both, in all three languages, pointing at the localized
tax form (/tax-form, /de/tax-form, /ja/tax-form) rather than WhatsApp, matching the existing
button on those pages.

GSC context for these two pages (7 days): /calculator 110 impressions at position 12.2 with a
2.73% CTR - the best CTR of any non-blog page on the site. /expenses does not register yet.

---

# Pre-deploy fixes (1 August 2026)

## /expenses was missing from the sitemap
This is why it does not register in Search Console at all - Google was never told the page
exists. Added at priority 0.8 with translated: true, so /expenses, /de/expenses and
/ja/expenses all enter the sitemap. The page is linked in the nav in all three languages,
so this was purely a sitemap omission.

## sitemap lastModified refreshed
Was hard-coded to 2026-06-01, which told Google nothing had changed since June even though
almost every page has. Set to 2026-08-01.

## Mobile CTA sub-label no longer says "free"
I had written "Free check" into the sticky CTA, which contradicts the $110 eligibility
assessment in the client agreement. Replaced with wording that is both accurate and stronger:
EN "No refund, no fee" · DE "Kein Anspruch, keine Gebühr" · JA 「資格がなければ費用なし」

## Stale comment removed
A leftover "// HowTo schema" comment on /tfn from the schema removal.

---

# Calculator fixed to actually calculate (1 August 2026)

## The problem
The "Calculate my refund" button was an <a href={WA_URL}> - it sent the visitor to WhatsApp
without ever showing a number. All the calculation logic (calc(), run(), the result state)
already existed in the file; nothing was wired to it and the result was never rendered.

This mattered for two reasons:
- /calculator has the best CTR of any non-blog page (2.73% at position 12.2). People
  searching "calculator" want a figure, not a chat window.
- The outreach emails describe it as a free calculator. If a blogger clicked through and
  found a WhatsApp redirect, they would not link to it - and rightly so.

## The fix (EN, DE and JA)
- The button is now a <button onClick={run}> and runs the existing calculation
- A result panel renders below it: label, the figure in large type, the rate note, and then
  a WhatsApp CTA to have it lodged - number first, contact second
- Green panel for a refund, amber for tax owing, with role="status" and aria-live for
  screen readers
- Added an honest line that deductions and the Medicare levy exemption usually make the real
  figure higher, which is both true and a reason to get in touch

## Verified
Calculation checked against five hand-worked scenarios including the above-$45,000 bracket
(income $50,000, withheld $8,000 -> correctly reports $250 owing, not a refund).
tsc --noEmit clean, eslint clean.
