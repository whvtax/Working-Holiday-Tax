# Density pass — 24 August 2026

A second pass, after the review pass documented in `CHANGELOG_FINAL_REVIEW_AUG24.md`. That pass
cut words. This one fixes what actually made the site feel crowded: paragraph structure, repeated
furniture, and sentences that existed to fill a slot.

Applied to all 86 public pages in all three languages. Build, typecheck, lint and the 434 unit
tests all pass; all 541 pages still prerender.

---

## What was wrong

Four things, measured on a 390 px phone before any of this:

1. **Text packed too tightly.** `/expenses` had paragraphs of six sentences. The amber "changing
   from 1 July 2026" callout was eleven unbroken lines.
2. **Pages too long.** Home was 11 phone screens, `/expenses` 15.
3. **Everything looked the same.** Every section: small uppercase kicker, heading, lede paragraph
   that restated the heading, content block. Eleven to fourteen times per page.
4. **Not enough air around headings.** A 30 px serif heading with 12 px under it.

---

## The six moves

### 1. Comparison tables print their labels once

Every "On myGov / With us" table printed both labels on all eight cells. On a phone the rows
stack, so the same two words marched down the screen eight times. It was the single biggest
source of the crowded feeling. They now print on the first row only, where they read as column
headings on desktop and as the key on mobile; the alternating background and the heavier weight
on the "with us" side carry it from there. Cell padding went from `15px 18px` to `13px 16px`.

**The table copy is approved and did not change.** This is layout only.

Applied on the home page, `/expenses`, `/calculator`, `/superannuation`, `/medicare`,
`/uk-working-holiday-tax` and the German and Japanese equivalents. On the home page alone the
section went from 1,259 px to 1,087 px.

### 2. Ledes that restated their own heading are gone

`What decides the size of a working holiday tax refund?` followed by *"Three things, most of the
time, and they are the three below"* is the heading twice. Roughly thirty of these across the
site were cut or shortened to one line.

### 3. Long paragraphs are broken

Two or three sentences per paragraph, split at the turn in the argument rather than chopped in
the middle. Paragraph counts went **up** while word counts went **down**, which is the point: the
home page went from 44 paragraphs to 47 while losing 8.8% of its words, and `/expenses` from 47
to 54.

### 4. FAQ answers render as paragraphs

An answer used to be one text node, so a ninety word answer arrived as a wall. A blank line in
the answer now becomes a paragraph break. The shared `Accordion` component was changed once, so
`/superannuation`, `/medicare` and their DE and JA versions all got it together; pages using
`<details>` got the same treatment inline. **Every `FAQPage` JSON-LD block still serialises the
raw string, so no structured data changed.**

### 5. More air under headings

Section `<h2>` bottom margin from 12 px to 16 px. Section padding was left alone: it was already
generous at 48 px, and increasing it would only have made the pages longer.

### 6. Rambling and unnecessary sentences removed

The main lever, and Jo's explicit instruction. What came out:

- sentences that restate the sentence before them
- closing flourishes carrying no fact: *"and it is enough of one"*, *"which is the part that
  actually hurts"*, *"and that surprises people"*, *"There is no deadline that closes on you here"*
- throat-clearing openers: *"It is a fair question to ask a website"*, *"There is one concession"*
- second examples where the first already made the point
- "which is why" clauses that only restate the cause

In German the equivalent closing clauses (`, und genau das ist der Punkt`, `, was viele
überrascht`) and in Japanese the hedging tails (「〜ということになります」「〜のが実情です」
「〜と言えるでしょう」) were the first things to go.

---

## Result

Rendered word count, production build before against after, across 521 pages:

| | pages | before | after | change |
|---|---|---|---|---|
| English pages | 32 | 42,560 | 38,796 | **−8.8%** |
| German pages | 24 | 30,984 | 28,389 | **−8.4%** |
| Japanese pages | 24 | 39,026 | 36,086 | **−7.5%** |
| Blog guides and category pages | 441 | 713,181 | 712,792 | −0.1% |

The blog corpus is flat on purpose. It is the search asset and the standing instruction is not to
cut it for length.

Biggest single pages: `/abn` −24%, `/tfn` −26%, `/uk-working-holiday-tax` −20%, `/about` −24%,
and the same three pages in German and Japanese within a point or two of each other. `/expenses`
−10%, `/de/expenses` −10%.

One extra change on the home page only: the five service cards were a single column of five
near-identical blocks running about a thousand pixels. They are now two columns with the fifth
card spanning the row, and the guides grid went to two columns as well. Desktop is unchanged, five
across.

**Honest note on page length.** The home page went from 11 phone screens to 10.2, `/tfn` from 8.5
to 8.3, `/expenses` from 15 to 14.6. Breaking paragraphs adds height back, so the pages read much
better without getting dramatically shorter. Going below about ten screens on the home page means
removing a whole section, and the candidates are on the table for Jo rather than decided here:
the Guides block (663 px, four internal links to guides that rank), "Which of these two was your
year" (743 px, two WhatsApp CTAs that qualify a lead), and the trust block (389 px, Google reviews
and the myGov password warning). Nothing was removed.

---

## Tried and rejected

**Two column card grids on the inner pages.** Tested on `/tfn`, measured: the six "what we do"
cards at two columns saved 26 px on a 7,100 px page while wrapping every card title onto three
lines. Reverted. Columns only pay where the cards are genuinely short, which is why the home page
services grid is the one place they were kept.

---

## Also fixed in this pass

- A German grammatical error on `/de/expenses/construction`: *"ist die Kost, für den Beruf
  überhaupt in Frage zu kommen"* → *"sind die Kosten dafür, …"*. The same odd singular `Kost`
  appears in a few other German pages (`private Kost`, `Lebenshaltungskost`, `Arbeitskost`) and
  looks like it came from one translation pass, so it is worth a separate sweep.
- The Japanese blog category intros had no measure, so lines ran to about 48 Japanese characters.
  They now use the same `68ch` cap as the English page, which in a Japanese context lands near 34
  characters a line.

---

## Verified

| check | result |
|---|---|
| `npx tsc --noEmit` | clean |
| `npx next lint` | clean, one pre-existing warning in `src/components/will/Dashboard.tsx` |
| `npx jest` | 15 suites, 434 tests, all passing |
| `npm run build` | succeeds, 541 static pages prerendered |
| `npm run generate:llms` | regenerated |
| 86 routes at 360 px and 1440 px | 0 horizontal overflow, 0 broken routes, 0 invalid JSON-LD |
| internal links | 225 unique paths, all resolve |
| duplicated title suffixes | 0 |

**Protected wording, counted in the rendered HTML of the production build:**

| sentence | occurrences | pages |
|---|---|---|
| `Reviewed and signed off by a registered tax agent before it is lodged with the ATO.` | 27 | 12 |
| `Reviewed and signed off by a registered tax agent.` | 171 | 171 |
| `Replies in about an hour.` | 204 | 157 |

Identical to before this pass. The German and Japanese equivalents were counted per file by the
agents that touched them and none dropped.

Still clean from the earlier pass: no `form MS015` or `item M1` anywhere, zero myGov or myTax
mentions in `llms.txt` and `llms-full.txt`, no residency tests or indicators outside the residency
assessment form, no self-lodgement walkthrough, and nothing implying Working Holiday Tax is itself
a registered tax agent.

**Unchanged throughout:** the guarantee, all fees, `/client-agreement`, `/privacy`, every slug,
`href`, `metadata` keyword, JSON-LD `@id` and `alternates.languages` entry, and every section on
every page.

---

## Still open, from the earlier pass

The Xero badge in the mobile menu, the Facebook link that is not in the site's `sameAs` schema,
the client-side rendering of `/tax-form`, and the three `JO:` markers on `/about` and `/contact`.
See `CHANGELOG_FINAL_REVIEW_AUG24.md`.
