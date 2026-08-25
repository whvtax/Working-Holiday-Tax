# Third pass: cutting the length — 24 August 2026

Jo's instruction: *"Put the emphasis on long rambling sentences and long convoluted
answers. Shorten it, the site is really long. Cut up to 30% of the text without harming
the content itself."*

This pass went after sentence length across all 521 pages in all three languages, including
the 423 blog guide bodies that the two earlier passes had deliberately left alone. Build,
typecheck, lint and the 434 unit tests all pass; all 541 pages still prerender.

---

## Result

Measured on the rendered HTML of a production build, against the site as it arrived:

| | pages | before | after | change |
|---|---|---|---|---|
| English pages | 32 | 42,560 | 36,313 | **−14.7%** |
| German pages | 24 | 30,984 | 27,155 | **−12.4%** |
| Japanese pages | 24 | 39,026 | 34,996 | **−10.3%** |
| Blog guides and category pages | 441 | 713,181 | 668,430 | −6.3% |
| **Whole site** | **521** | **825,751** | **766,894** | **−7.1%** |

The blog line understates the work, because a rendered guide page is roughly a third
navigation, footer, related-guide cards and CTA, none of which shrinks. Measured on the
guide bodies themselves:

| | before | after | change |
|---|---|---|---|
| English guide bodies | 129,632 | 113,053 | **−12.8%** |
| German guide bodies | 124,852 | 110,476 | **−11.5%** |
| Japanese guide bodies | 158,629 | 141,880 | **−10.6%** |
| **All 423 guide bodies** | **413,113** | **365,409** | **−11.5%** |

The three source data files went from 820 KB, 911 KB and 1,053 KB to 731 KB, 824 KB and
952 KB.

---

## Why it is not 30%

Because the constraint was the second half of the instruction, not the first. Two earlier
passes had already removed the duplicated sections, the repeated furniture and the closing
flourishes. What remained in most files is dense: roughly a quarter to a third of a typical
guide is bulleted enumeration of rates, thresholds, award classifications, named schemes and
conditions, none of which can be touched without losing content.

Where genuine padding survived, the cut was deep. Individual guides came down 17 to 27
per cent: `1000-dollar-instant-deduction-rule-2026` −27%, `do-working-holiday-makers-pay-tax-on-tips`
−21.5%, `super-multiple-funds-consolidation` −19%, `bringing-money-into-australia` −18.5%,
`dasp-rejected-what-to-do` −18.4%, `ato-tax-debt-failure-to-pay-penalty` −17.8%. On the
marketing side, `/expenses` came down 12% on top of the earlier passes and is no longer the
outlier it was.

Where it stopped short, every editor gave the same reason and I checked a sample of them:
the next available cut was a figure, a condition or a rule. The honest number is 11.5% on
the guides and 10 to 15% on the pages people actually walk through, on top of what the two
earlier passes already took.

---

## Method

For each sentence: what does this add that the reader did not already have? If nothing,
it goes. Specifically:

- **Compress rather than delete.** Most of the win was rewriting a 46 word sentence as a
  26 word one, not removing it.
- Cut the second half of sentences that restate the first.
- Cut throat-clearing openers: *"The thing to understand here is that…"*, *"There is one
  concession."*, *"It is a fair question to ask a website."*
- Cut closing flourishes carrying no fact: *"…which is the part that actually hurts"*,
  *"…and it is enough of one"*, *"…and that surprises people"*.
- Cut the second example when the first already carried a number.
- Collapse three sentence build-ups into one.
- In German: the trailing clauses (`, und genau das ist der Punkt`, `, was viele überrascht`)
  and the `Der Punkt ist, dass…` openers.
- In Japanese: the hedging tails (「〜ということになります」「〜のが実情です」「〜と言えるでしょう」)
  reduced to the plain polite form.

Nothing was allowed to go that carried a number, rate, threshold, dollar figure, date,
deadline, named rule, risk, consequence or condition. No `##` heading was removed or
reordered. No internal link was dropped. Paragraphs the previous pass split stayed split.

---

## Corrections found along the way

- **A wrong figure.** The no-ABN withholding rate was given as **45%** in
  `what-is-a-tax-invoice` in English and Japanese, and as **47%** in five other guides, in
  the German version of the same guide, and in the site's own sourced key-facts file.
  47% is correct. Fixed in both languages, including the consequential "you keep 55%" which
  is now 53%. Flagging it because it was a live factual error, not a length issue.
- **A repeated line that had drifted.** A cut on four pages left the site saying
  *"You will never log into myGov, link an ID, or work out which form is which"* on four
  pages and a shorter version on four others. Restored to the full form everywhere: it is a
  recognisable repeated line, and the identity check is the single thing that actually blocks
  the overseas reader.
- **Absolute claims softened**, roughly a dozen across the three languages, each flagged by
  the editor who found it: *"Yes, in full"* about getting money back, *"fully recoverable"*,
  *"removes the failure point entirely"*, *"objections are routinely successful"*, *"visa
  cancellation is not triggered by a workers compensation claim"*, and the Japanese and
  German equivalents.
- **Residency wording tightened further.** `low-income-tax-offset-working-holiday` said
  residency "is not settled by your visa or by anything you can count on a calendar" and
  "is a holistic judgement with no numeric threshold". Both disclose that no day count
  applies, which is still disclosing something about the test. Replaced with the permitted
  wording in English, and the equivalents removed in German and Japanese.
- **Do-it-yourself framing removed** in six more places: a numbered DASP walkthrough in the
  German `dasp-vs-leaving-super`, imperative TFN declaration instructions in three languages'
  `what-is-a-tfn`, an ABN cancellation sequence in `uber-driver`, and a
  "you can apply to Home Affairs to cancel your visa" line on `/ja/superannuation`.
- **A German grammatical error** on `/de/expenses/construction` (`ist die Kost` →
  `sind die Kosten dafür`) was fixed in the previous pass; the same odd singular `Kost`
  appears elsewhere in the German tree and still deserves its own sweep.

---

## Verified

| check | result |
|---|---|
| `npx tsc --noEmit` | clean |
| `npx next lint` | clean, one pre-existing warning in `src/components/will/Dashboard.tsx` |
| `npx jest` | 15 suites, 434 tests, all passing |
| `npm run build` | succeeds, 541 static pages prerendered |
| `npm run generate:llms` | regenerated: 141 English, 141 German, 141 Japanese, 496 sitemap URLs |
| 86 routes at 360 px and 1440 px | 0 horizontal overflow, 0 broken routes, 0 invalid JSON-LD, 0 missing descriptions |
| internal links | 225 site links and 238 markdown links inside the guides, all resolve |
| duplicated title suffixes | 0 |

**Protected wording, counted in the rendered HTML of the production build:**

| sentence | occurrences | pages |
|---|---|---|
| `Reviewed and signed off by a registered tax agent before it is lodged with the ATO.` | 27 | 12 |
| `Reviewed and signed off by a registered tax agent.` | 171 | 171 |
| `Replies in about an hour.` | 204 | 157 |

Unchanged through all three passes. The German and Japanese equivalents were counted per
file by each editor and none dropped.

**Still clean:** no `form MS015` or `item M1` anywhere; zero myGov or myTax mentions in
`llms.txt` and `llms-full.txt`; no residency tests, indicators or day counts outside the
residency assessment form (the surviving "88 days" references are the second-year visa work
requirement, and the surviving "183 day" reference is the Zone Tax Offset residence test,
both different rules); no self-lodgement walkthrough; nothing implying Working Holiday Tax
is itself a registered tax agent.

**Unchanged:** the guarantee, all fees, `/client-agreement`, `/privacy`, every slug, `href`,
`metadata` keyword, JSON-LD `@id` and `alternates.languages` entry, every section, heading,
card and table row, and every grid class and layout value.

---

## Flagged for a decision, not changed

Four guides sit close to the do-it-yourself line and were left alone because the material
is the substance the title promises, not padding around it. Each is a judgement about what
the guide is for rather than a length question:

- `tfn-application-rejected` — remediation steps after a rejected application
- `how-to-find-lost-tfn` — the ATO phone numbers and the identity details a lookup runs on
- `can-you-start-work-without-a-tfn` — what to tell an employer on day one
- `uk-medicare-reciprocal-agreement-australia` — enrolling at a Services Australia counter

Also still open from the earlier passes: the Xero badge in the mobile menu, the Facebook link
that is not in the site's `sameAs` schema, the client-side rendering of `/tax-form`, and the
three `JO:` markers on `/about` and `/contact`.
