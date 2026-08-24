# Final site review — 24 August 2026

A full editorial, design, accessibility, SEO and compliance pass across every public page,
component, form and language version. Nothing was redesigned; the brand, tone, structure and
visual identity are unchanged. 95 files changed. Build, typecheck, lint and the 434 unit tests
all pass, and all 541 pages still prerender.

---

## 1. Length and repetition

Measured on the rendered HTML of a production build, before against after:

| | pages | before | after | change |
|---|---|---|---|---|
| English pages | 32 | 42,560 | 40,327 | −5.2% |
| German pages | 24 | 30,984 | 29,583 | −4.5% |
| Japanese pages | 24 | 39,026 | 37,495 | −3.9% |
| Blog guides and category pages | 441 | 713,181 | 712,933 | −0.0% |

The blog corpus is close to flat on purpose. It is the site's search asset and the brief was
explicit that long content is not to be cut for being long. Guide bodies did lose roughly 2,900
words to compliance rewrites and filler, but every page in the site gained two footer links,
which nets most of it back on a 441 page corpus.

Largest single page reductions: `/tfn` −21%, `/de/tfn` −21%, `/ja/tfn` −19%, `/abn` −17%,
`/ja/abn` −15%, `/de/abn` −17%, `/uk-working-holiday-tax` −16%, `/about` −15% (and the DE and JA
equivalents), `/blog/how-to-register-for-an-abn` −11%.

### What was actually cut

**The same argument told three times on one page.** `/tfn` and `/abn` each carried a four row
"On myGov / With us" comparison table whose rows mapped one to one onto the "what we do" cards
below it, and then a FAQ that restated the whole table a third time. The table was removed on
both pages in all three languages; the conversion line that closed it was kept and moved to the
end of the "what we do" section. `/superannuation` carried the same argument a third time as a
two column "on your own / with us" list near the bottom; that block is gone and one paragraph now
carries the two points the table above does not make.

**"Can I not just do this myself on myGov?"** appeared on six pages, each answer 120 to 175 words
restating that page's own comparison table and repeating the myGov closing line a second time on
the same page. Each is now two or three sentences, and the stilted `Can I not just …` phrasing is
now natural English in all three languages.

**Cross page duplication.** The guides section heading "Read the whole answer first, if you would
rather" and its lede were identical on three pages; `/tfn` and `/abn` now have headings specific
to their own subject. `/about` and `/contact` both carried a near identical "Do I need a myGov
account?" answer and both explained the "no myGov, no Australian ID, no payslips, we reply in your
language" idea at length; `/contact` now owns that material and `/about` links across to it.

**Filler.** Sentences that only restated the sentence before them, windy closings, and generic
marketing language, throughout. Every concrete number, rate, threshold, deadline and named rule
was kept.

---

## 2. Compliance

### Protected wording — unchanged, and verified in the rendered HTML

All three sentences appear byte for byte in the built output:

| sentence | occurrences | pages |
|---|---|---|
| `Reviewed and signed off by a registered tax agent before it is lodged with the ATO.` | 27 | 12 |
| `Reviewed and signed off by a registered tax agent.` | 171 | 171 |
| `Replies in about an hour.` | 204 | 157 |

Counts are the same or higher than before the pass. Where a page carried a near miss paraphrase of
the sign off line ("before it reaches the ATO", "before lodgement", "before it goes to the ATO"),
it was normalised onto the exact approved sentence rather than left to drift. Nowhere does the
site state or imply that Working Holiday Tax is itself a registered tax agent.

### Tax residency

Detailed criteria now appear only inside the residency assessment step
(`ResidencyStep.tsx` / `ResidencyDeclaration.tsx`, reachable at `/tax-residency`, `/de/tax-residency`,
`/ja/tax-residency`). Removed from everywhere else:

- Ten guides across the three languages said residency "is not settled by a day count", "is not
  settled by a visa or a day count", or "there is no count you can do on a calendar". Naming what
  does not decide it still names a factor, so all of them now say only that residency depends on
  the person's own circumstances and has to be properly reviewed.
- Five occupation pages (and their DE and JA versions) closed by sketching the circumstances that
  make residency a live question: a settled address, a long stay in one city, a fixed base between
  swings. All removed.
- `/about` said residency "turns on far more than a day count". Removed.
- The Tax Return blog category intro said residency is "not settled by a visa or a day count".
  Removed in all three languages.
- `src/lib/nda-countries.ts` carried a source comment enumerating the conditions. Generalised.
- `/tax-residency` and its DE and JA versions are now disallowed in `robots.txt` as well as
  `noindex`. noindex keeps a page out of the index but does not stop it being read; the file
  explicitly enumerates two dozen AI crawlers, and the questions on that page are the assessment
  method.

The Addy decision is still referenced by name throughout. A named court decision is not a test.

### Self lodgement and myGov

Reader visible myGov mentions on `/tfn` went from 14 to 3, and on `/abn` from 14 to 3. The
generated `llms.txt` and `llms-full.txt` now contain zero mentions of myGov or myTax, down from 16
and 3. Every surviving mention is either one comparison table per page, the fraud warning that a
tax agent will never ask for your myGov credentials, or a statement that identity verification
from overseas is hard. None is an instruction and none presents myGov as an alternative to the
service.

Rewritten, keeping the slug, the heading structure and the SEO substance in all three languages:

- **`diy-tax-return-vs-tax-agent-working-holiday`** — removed the myTax and myGov walkthrough (what
  myTax is, that it is reached through a myGov account linked to the ATO, how income statements
  pre-fill), the section recommending self lodgement for simple years, the "middle option" that
  told the reader to prepare their own figures, and the closing advice on establishing and linking
  a myGov account. The five places money gets lost and the warning against percentage of refund
  pricing are kept in full.
- **`how-to-register-for-an-abn`** — removed the pre application checklist and the walkthrough of
  three specific form fields, and the claim that paid ABN services are middlemen, which also
  contradicted the service sold on `/abn`. Entitlement, sham contracting, the $75,000 GST
  threshold, the 47% withholding rule and cancellation all stay.
- **`how-to-apply-for-a-tfn`** — title and description no longer promise "the exact steps" or "free
  in 10 minutes"; the "something you can do yourself in ten minutes" passage is gone; imperatives
  are now descriptive. The address problem, the name match problem, the 28 days and the 45% stay.
- **`dasp-documents-required`** — the section endorsing the free direct to ATO route is replaced by
  one explaining what makes a claim difficult. Document requirements, certification, eligibility
  and withholding all stay.
- Smaller fixes in `what-is-a-tax-agent`, `tax-back-australia-working-holiday`, `how-to-find-lost-tfn`,
  `how-to-cancel-your-abn`, `tax-deductions-working-holiday-makers` (a diary method instruction),
  `backpacker-tax-rate-australia` and `how-long-does-it-take-to-get-a-tfn` (a four step list).
- **Form numbers removed**: `form MS015` and `item M1 of the return` appeared 15 times across the
  three languages. The Medicare Entitlement Statement, its issuer and its lead time are kept,
  because those are the reason to use the service; the form number and the return item are not.
- The TFN and ABN blog category FAQs said the application "takes around 10 minutes" and that any
  service charging for ABN registration is "marking up a free government process". Both rewritten
  in all three languages so the honest "there is no government fee" point survives without the
  invitation.

### Structured data

`/superannuation` published a `HowTo` whose steps were "Gather your details", "Find every fund",
"Lodge a claim with each fund" — a machine readable, search engine surfaced walkthrough of the
exact process the service is engaged to run. Rewritten in all three languages to describe what a
DASP claim consists of rather than what the reader should go and do. The `/tax-return` `HowTo`
describes our own sequence and was left alone.

### Invented or conflicting claims

- **The guarantee.** The eight `expenses` pages each paraphrased it differently — seven distinct
  wordings per language, 21 in total. All standardised onto the canonical line already used on
  eleven other pages. The legal version in `/client-agreement` is untouched.
- **`llms.txt` stated a different guarantee** from the rest of the site: "If you do not receive a
  tax refund, we refund our fee." That is only the second half of clause 6. The generator now
  carries both sentences, taken verbatim from the site and from the client agreement.
- **An invented statistic.** The German and Japanese Tax Return category FAQs claimed an average
  working holiday refund of $2,000 to $3,500, contradicting the site's own guides in all three
  languages ("there is no average refund worth quoting"). Replaced with the honest answer. The
  German category intro's "most get thousands of dollars back" was brought into line with the
  English. Two dead `blogUI` strings, `statsCountries` and `statsBackpackers`, were removed from
  all three blog data files so no unverifiable figure can be wired back up.
- **Softened absolutes**: refund arrival in "about 14 business days" now reads "usually" in the
  page copy and in the metadata; "makes you eligible immediately", "saves months", "claiming has
  no bearing on any future visa application", "a late return is not treated as a problem by the
  ATO", and "which is what makes the claim stand up later" were each softened, in all three
  languages.
- **A factual contradiction on `/contact`** — the page said a refund could be paid into a local
  account while also stating, three lines above, that the ATO can only pay a tax refund into an
  Australian bank account. The German page carried it twice and the Japanese page twice, and the
  Japanese page never stated the actual rule. Fixed in all three.

---

## 3. Design, accessibility and responsiveness

Checked by rendering all 86 routes at 360 px and at 1440 px in Chromium.

- **No horizontal overflow on any route at either width.**
- **Colour contrast**: fixed nine failures against WCAG AA, including breadcrumbs at 2.3:1, the
  `NextStep` eyebrow at 3.5:1 on forest green, the language switcher border at 2.4:1, and three
  components still using `#9DB5AC`, which `tailwind.config.js` documents as retired for measuring
  2.45:1 on white.
- **Touch targets**: pagination buttons 40 → 44 px, the search clear button from a 24 px hit area
  to 44 px, the security notice and language banner close buttons to 44 px. Footer links were a
  19 px line box with a 10 px dead gap between them; the margin is now padding, so the rows are
  contiguous and each target is ~29 px at identical visual spacing. Taking them to the full 44 px
  would make the footer noticeably taller, which is a design decision rather than a defect fix.
- **Screen readers**: the mobile table of contents declared `aria-modal` but trapped no focus, and
  its Escape handler was mounted site wide even when closed. The sticky breadcrumb bar was hidden
  with opacity only, so its links stayed in the tab order while invisible. Closed accordion panels
  were still read out. The reading progress badge was inside a polite live region and announced on
  every scroll frame. Google review ratings were announced as five star characters. All fixed.
- **A latent bug**: the mobile TOC's active section indicator was never painted, because a
  `border: 'none'` reset sat after `borderLeft` in the same style object.
- **The article column was uncapped** on desktop without the sidebar, running about 130 characters
  a line. Capped at 70ch.
- **Duplicated sentence** in the "About this guide" aside: two drafts of the opening line had both
  been left in.
- **Nav**: the hamburger announced "Menu" in both states and is now state aware and localised. The
  "secure and encrypted" badge was labelled only by a `title` tooltip, which never appears on a
  touch device, and this drawer only renders on touch devices; it now has a real accessible name.

### Forms

All eight intake forms render, validate in the right language and submit in all three languages.
The residency step renders with 44 px controls.

- **Labels were not associated with their controls.** The `<label>` carried no `htmlFor` and the
  input arrived as a sibling, so a screen reader announced every text field on every form as
  unlabelled: 11 of 17 on the TFN form, 11 of 15 on the ABN form, 19 of 20 on the super form, 9 of
  9 on the tax form. All now associated, with `aria-invalid` and `aria-describedby` wired to the
  error text and `aria-required` where the field is required. Radio and checkbox groups, which
  arrive as a container rather than one control, are labelled as groups.
- **Validation errors were never announced.** They rendered as red text with no `role`. They now
  carry `role="alert"`; an empty submit goes from 0 announcements to 18 to 37 depending on the form.
- **Document upload was keyboard inaccessible.** The file input is `display: none` and the drop
  zone was a plain `div` with an `onClick`, so it could be neither tabbed to nor announced. The
  zone now carries the button role, an accessible name and Enter/Space handling.

---

## 4. SEO and internal linking

- **All 225 unique internal links across the site resolve, and all 238 unique markdown links inside
  the 441 guide bodies resolve.** No redirects, no 404s.
- **Duplicated title suffix**: twelve pages, including `/client-agreement` in English and German,
  rendered as "X | Working Holiday Tax | Working Holiday Tax" because the page title already
  contained the site name that the layout template appends. Fixed. The Japanese section
  deliberately uses a `'%s'` template so that Japanese titles do not spend a third of the SERP line
  on a Latin brand name; those pages correctly keep their own suffix and were left alone.
- **`<html lang>` disagreed with itself**: the pre paint script sets `de-DE` and `ja-JP`, and
  `LangSync` then set `de` and `ja` a moment after load. Now consistent.
- **Missing internal links**: `/expenses` and `/calculator` had no footer link on any page, in any
  language, despite being eight and one indexed pages respectively. Both added to the footer's
  Learn column in all three languages.
- **`robots.txt`**: the German and Japanese intake forms were not disallowed, only the English
  ones, so two thirds of the intake was still being crawled despite carrying `noindex`.
- Canonicals, hreflang maps, `metadata` keywords, JSON-LD `@id`s and all slugs are unchanged.
  Every indexable page has a canonical, a description under 170 characters, at least three hreflang
  alternates and valid JSON-LD. No page has invalid JSON-LD or a missing description.

---

## 5. Checks run

| check | result |
|---|---|
| `npx tsc --noEmit` | clean |
| `npx next lint` | clean, one pre-existing warning in `src/components/will/Dashboard.tsx` |
| `npx jest` | 15 suites, 434 tests, all passing |
| `npm run build` | succeeds, 541 static pages prerendered |
| `npm run generate:llms` | regenerated, 141 DE and 141 JA translations, 496 sitemap URLs |
| 86 routes at 360 px and 1440 px | 0 horizontal overflow, 0 broken routes, 0 invalid JSON-LD |
| internal links | 225 site links + 238 guide markdown links, all resolve |
| forms | 8 intake forms plus the residency step, all render, validate and submit |

---

## 6. Left alone deliberately

- **The Xero badge in the mobile menu** links to xero.com with no explanation. An unlabelled
  third party logo in a trust badge row reads as an accreditation. It may well be legitimate, so it
  was not removed, but it should either be labelled with what the relationship actually is or taken
  out. **Needs a decision.**
- **The Facebook link in the footer** points at a page that is not listed in the `sameAs` array of
  the site's Organization schema, which lists only TikTok and Instagram. Either the page exists and
  belongs in `sameAs`, or the link should go. **Needs a decision.**
- **`/tax-form` is not server rendered.** `useSearchParams` in a client component with no Suspense
  boundary opts the whole route into client side rendering, which is where the three React
  hydration errors in the console on that route come from. It is `noindex`, so there is no SEO
  cost, but first paint on a phone is slower than it needs to be. The fix is a Suspense boundary
  around the search params read; it was not applied because it touches the revenue path and the
  brief asked for functionality to be preserved. **Pre-existing, unchanged.**
- **`GoogleReviews` has no pause control.** It pauses on hover and on focus and respects reduced
  motion, but a touch user cannot stop it (WCAG 2.2.2). A real fix is new UI.
- **`SecurityNotice` auto dismisses after four seconds** (WCAG 2.2.1). Changing the timing changes
  behaviour, so only the close target was enlarged.
- **`MobileLanguageBanner` covers the guide page table of contents button** on German and Japanese
  guide pages until it is dismissed. Fixing it means moving one of two fixed elements that other
  pages depend on.
- **`de/tax-return` uses "ohne myGov" as a title keyword** in its page, OpenGraph and Twitter
  titles. It positions against myGov rather than promoting it, and it is a deliberate German SEO
  play, so it stays.
- **The FIFO Zone Tax Offset 183 day normal residence test** is stated in full. It is a test for
  that offset, not for tax residency, and it carries real search value.
- **Two `JO:` markers on `/about`** still ask for a real origin story and a confirmed founding year,
  and one on `/contact` flags a misspelling in the WhatsApp Business profile. All three are
  outstanding and were left for you.
- **Unverifiable claims left as written**, because they are business facts rather than editorial:
  "between two hundred ordinary returns" about general accountants, "a large share of our work",
  "every client we have is on a 417 or a 462 visa", "the three places most of our clients message
  us from", "the most common pattern we see".
- **The blog corpus was not rewritten.** 147 guides across three languages, roughly 400,000 words.
  Compliance breaches were fixed and fifteen of the longest guides were trimmed of filler; the rest
  is the site's search asset and was left intact, as the brief required.
