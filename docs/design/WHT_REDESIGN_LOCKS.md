# WHT redesign: locked decisions (Jo, 1 Nov)

Order of work: lock colours, then fonts, then design, then change the whole site at once. Nothing is built before all three are locked.

## 1. Colours: LOCKED (palette A, forest and amber)
- Page background is ALWAYS white, on every page.
- Ink `#0F1A16`: text and headings.
- Forest green `#0B5240`: brand, buttons, links.
- Amber `#F2B632`: highlighter band behind words only, never text colour, never a button fill.
- Pale green `#F2FAF7`: small strips only (footer, cards), never the page background.
- Everything else in tailwind.config.js (about 15 values today) is removed, except danger `#9A3412` for warnings and WhatsApp's own green inside their icon.

## 2. Fonts: LOCKED
- Be Vietnam Pro for headings and body (same as SVT).
- IBM Plex Mono for prices, figures and small uppercase labels.
- Japanese pages keep a separate Japanese font (Be Vietnam Pro has no kana or kanji).
- Scale from SVT: H1 38 / 48 / 60px, weight 700, line height 1.06, tracking -0.025em; body 16px.
## 3. Design: not locked yet (three options shown; messaging rules below apply to all)

### Messaging rules from Jo (1 Nov)
1. We lodge tax returns WITHOUT myGov at all: the customer never needs a myGov account.
2. Make the difference clear between myGov and us. myGov only SUBMITS a return. We do the work BEFORE it is submitted: review, find every deduction, maximise, check residency and Medicare. (Wording must still never promise a refund.)
3. Everything is simple, on WhatsApp, and we deal with the ATO for the customer.
4. The price is low, so it is NOT a headline. It appears only in passing, small (no big price card, no price in the hero).

### SEO rule (Jo, 1 Nov)
The existing page content stays. Wording may change only very slightly, because the site's SEO is strong (#1 in en, de, ja).
The mockup texts above are illustrations of layout only. In the real build keep every existing H1 and H2, body text, meta title and
description, URLs, internal links and structured data as they are; the redesign changes layout, colours and fonts, not the words.
Adding a small new block (such as the myGov comparison) is allowed; replacing existing headings or copy is not.

### Motion: MANDATORY on both sites (Jo, 1 Nov)
Both Working Holiday Tax and Student Visa Tax must have motion, whatever else is decided.
Rules: opacity and transform only, once per element on scroll-in, content fully visible without JavaScript,
off under prefers-reduced-motion, nothing infinite. SVT already has it (chat thread, docket, sticky WhatsApp);
the WHT redesign must include its own set (hero chat, myGov rows, figures, guarantee, steps, final CTA).
