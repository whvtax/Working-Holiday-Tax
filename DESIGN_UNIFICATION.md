# One design language for the admin — CRM + Will

**26 August 2026**

The admin had two visual systems. Will (`/crm/whatsapp`) had a real one: a scoped
stylesheet with tokens, a type scale and named component classes. The CRM had
none — it was built from roughly 550 inline `style={{}}` objects with hardcoded
hex colours and hand-typed pixel font sizes, duplicated across six screens.

The CRM now speaks Will's language. Same font, same 12.5px base, same palette,
same radii, same spacing, same side rail, same zoom factor.

---

## What was added

### `src/app/crm/crm-design.css`
The single source of truth for the whole admin. Imported once, in
`src/app/crm/layout.tsx`, so every screen under `/crm` gets it — Will included.

It declares the tokens for **both** scopes at once:

```css
.will-scope,
.crm-scope { --ink: …; --line: …; --brand1: …; --r: 14px; --nav: 245px; … }
```

That is the part that matters. There is now exactly one definition of "what
green is" and "how round a card is". The two halves can no longer drift apart,
because changing one changes both.

Below the tokens are the CRM's component classes, built to match Will's:
`.side` / `.ni` / `.slogo` (the rail), `.phead` / `.pbody` (the page frame),
`.kpi`, `.card`, `.panel`, `.task`, `.rowcard`, `.btn` and its variants,
`.chip`, `.ptab`, `.tbl`, `.modal`, `.toast`, `.avatar`, `.mono`, `.code`.

### `src/components/crm/Shell.tsx`
One side rail, one logo, one set of nav icons. It replaces three hand-rolled
copies that were already drifting — 260px in one file and 245px in another, the
"Will" row missing its icon in a third, the same logo SVG pasted three times.
`crmNav()` builds the six standard rows; screens that switch views in local
state pass handlers, screens that navigate pass nothing and get links.

### The one scale knob
`--crm-fit` (0.9375 = 75/80, for working at 80% browser zoom) used to live in
Will's stylesheet only. It is now in `crm-design.css` under both scopes, so the
whole admin scales together. **To resize everything, change that one number.**

---

## What changed in the existing files

| File | What happened |
|---|---|
| `crm/dashboard/DashboardClient.tsx` | 419 → 242 inline styles, 243 → 48 hardcoded font sizes, 73 → 0 hex colours. Local `S` object, both `<style>` blocks, the hand-rolled sidebar, `SbButton` and the mobile top bar all deleted. |
| `crm/partners/PartnersClient.tsx` | Shell, tables, filters, modal converted. 0 hex colours. |
| `crm/partners/[id]/PartnerDetailClient.tsx` | Same. Also gained the Leads and Will rail rows it was missing. |
| `crm/client/[id]/ClientPageClient.tsx` | Converted off Tailwind utilities and its own 50-line `<style>` block. |
| `components/crm/LeadsTab.tsx` | Its hand-built 5-column CSS grid became a real `<table className="tbl">`. |
| `crm/page.tsx` (login) | Converted. |
| `crm/layout.tsx` | Imports the shared stylesheet. |
| `crm/whatsapp/will-scoped.css` | Token block removed (it reads them from the shared file now). Keeps only what is genuinely Will's: chat bubbles, kanban, drawer, simulator. |

---

## Bugs found and fixed along the way

These were pre-existing. They surfaced because unifying the stylesheets meant
reading both of them closely.

1. **`will-scoped.css` was leaking onto the public site.** A scoping pass had
   left a stray `.will-scope` in front of three at-rules. A selector before an
   at-rule invalidates it, so:
   - `@keyframes rise` was never defined — the card and KPI entrance animations
     silently did nothing;
   - the `prefers-reduced-motion` block applied `*{transition-duration:.01ms}`
     **globally**, killing transitions across the whole marketing site for
     anyone with reduced motion on;
   - a `@media(hover:none), .will-scope (pointer:coarse)` query was malformed
     and dropped entirely.

2. **Neither half was actually rendering DM Sans.** Both wrote
   `font-family:"DM Sans"`, but `next/font/google` generates a hashed family
   name and exposes it as `var(--font-sans)`. The literal name matched nothing,
   so the admin has been rendering in system-ui. Now
   `font-family: var(--font-sans, "DM Sans"), …` — with the fallback *inside*
   `var()`, so an undefined variable degrades to DM Sans instead of
   invalidating the whole declaration.

3. **`input[type="text"]` does not match `<input>`.** An input written without
   a `type` attribute is still a text field but matches no `[type=…]` selector.
   Seven inputs in the dashboard, including the task search box, were rendering
   as unstyled 22px rectangles. The selector list now includes
   `input:not([type])`.

---

## Deliberately left alone

- **`downloadTaskPdf`** in `DashboardClient.tsx` keeps its literal hex colours.
  It builds a standalone HTML document that is downloaded and printed *outside*
  the app, where `.crm-scope` and every token are absent — `var(--brand1)` would
  resolve to nothing and the printout would come out colourless.
- **`#25D366`** on the three "message on WhatsApp" buttons. That is WhatsApp's
  brand green, not ours. Each occurrence carries a comment saying so.
- **The hydration warning in dev** from the `<style>` block in
  `crm/layout.tsx` that hides the public site's nav and footer. It predates this
  work and is dev-only; fixing it means changing how site chrome is hidden,
  which is a behaviour change, not a design one.

---

## Verified

- `npx tsc --noEmit` — clean
- `npx jest` — 498/498 pass
- `npx next build` — compiles (in the sandbox only with `next/font` stubbed,
  since it cannot reach fonts.googleapis.com; that is a network limit, not a
  code problem)
- Rendered in Chromium at 1440×900 and measured: the rail is 287.1px in both
  halves, `.ni` is 12.5px / 8px 11px / 10px radius in both. Identical.

## Still a seam

Will keeps its own six rail rows (Pipeline, Chats, Tasks, Library, Insights,
Learning) and swaps the whole rail when you enter it. The rail now *looks*
identical, but its contents still change. Merging both sets into one rail, or
nesting Will's sections under a "Will" group, is a separate decision about
navigation rather than about styling.

---

# Follow-up pass — 26 August 2026

## Typography, verified rather than asserted

The first pass claimed the two halves matched. That was measured properly this
time: DM Sans installed locally, both halves rendered in Chromium, and the
**computed** styles read off every element.

Result: one font stack across all 92 CRM elements and all 87 Will elements, and
0 differences on every comparable component (rail row active and inactive, logo,
page title, KPI value and label). Two real mismatches turned up and were fixed:

1. **Headings were running on another font's axes.** `globals.css` carries
   `:where(h1,h2,h3,h4){font-variation-settings:'SOFT' 40,'WONK' 0,'opsz' 36}`
   for the marketing site, where headings are Fraunces. A declaration on an
   element beats an inherited one regardless of specificity, so every admin
   heading inherited it. DM Sans has no SOFT or WONK — but it does have `opsz`,
   and 36 is the *display* optical size, rendering a 14.5px heading with the
   strokes and spacing of something four times the size. Reset for both scopes.

2. **KPI tile labels were uppercased in the CRM and sentence case in Will.**
   "READY TO GO" beside Will's "Worth a Nudge" was the last place the two halves
   still read as different products. The `text-transform` is gone; labels render
   as written.

## The conversation now reads in WhatsApp's own typeface

A deliberate line was drawn: anything that **is a message** — the bubbles, the
composer, a draft awaiting approval, a customer's line quoted onto a task card,
the chat-list previews — is set in WhatsApp's stack. Everything else stays in
the admin's DM Sans, because it is Jo's software, not the conversation.

`--wa-font` is
`"Segoe UI","Helvetica Neue",Helvetica,"Lucida Grande",Arial,Ubuntu,Cantarell,"Fira Sans",sans-serif`
— WhatsApp Web's own system stack, which resolves to Segoe UI on Windows,
Helvetica Neue on macOS and Ubuntu/Cantarell/Fira Sans on Linux. Deliberately
**not** prefixed with `-apple-system`: that would give SF Pro on a Mac and
diverge from WhatsApp, which lands on Helvetica Neue there.

"WhatsApp Sans" is a real font, but it is Meta's proprietary brand face, used on
whatsapp.com and in the apps' chrome. It is not licensed for third-party use and
it is **not** what message text is set in on WhatsApp Web. The stack above is
both the accurate match and the only lawful one.

## Interface fixes

| Fix | What was wrong |
|---|---|
| Search icon | The colour emoji 🔍 rendered as a blue-and-pink magnifier. Replaced with WhatsApp's thin grey line-art glyph as inline SVG on `currentColor`, and the field is now a fully rounded pill on quiet grey with no outline until focus — WhatsApp's own treatment. |
| Stage dropdown underline | `.cstate-btn` is `inline-flex`, so "Review" and the ▾ were separate flex items. `text-decoration:underline` on the container made each draw its **own** underline at its own font-size and baseline — a 12px line under the word and a 16px line under the caret, at different heights. That was the "two different lines". The underline now goes on the label alone; the caret is smaller and never underlined. |
| Back buttons | `btn ghost` (grey fill) → `btn quiet` (white with a hairline). |
| Task detail scrolling | The finishing actions sat at the end of a long scroll. `.frow` tightened from 9px to 7px, and the action row is now a pinned `.pfoot` — the mirror of `.phead` — so Download PDF / Mark as done / Delete are on screen no matter how much detail a record carries. |
| Task row highlight | A permanent green ring marked the row you last opened, competing with the row the mouse was on and never going away. It is now a soft tint (`.task.seen`), and the **border follows the pointer** — hover only, and only on real pointers, so a tap does not leave a row framed. |
| Tile order | Tasks tiles swapped to Ready to go / Done / Clients, so the two task counts sit together and Clients — which jumps to another view — is on the end. |
| Estimate button | 💰 removed. |

## Verified

`npx tsc --noEmit` clean · `npx jest` 498/498 · all four screens render with no
new console errors · `package.json`, `package-lock.json`, `layout.tsx` and
`.data/store.json` byte-identical to the originals.

---

# Typography pass — the admin gets its own font

Scope: **the internal systems only** — the CRM and Will's interface. The public
site is untouched, and Will's conversation stays in WhatsApp's typeface.

## 1. The secondary grey was below the accessibility floor

`--ink3` was `#8f97a3`: **2.95:1** on white, **2.77:1** on the app ground, against
the 4.5:1 WCAG AA asks of normal text. That token is not decoration — it carries
every field label, KPI caption, date, message preview, table sub-column, mono
value and empty state in the admin, at 9.5–11px. It is precisely the text the
eye works hardest on.

Now `#6a7381` — same hue (216°), same saturation, darker:

| token | on white | AA 4.5 |
|---|---|---|
| `--ink` `#1f2328` | 15.80 | pass |
| `--ink2` `#5c6572` | 5.90 | pass |
| `--ink3` `#6a7381` *(was 2.95)* | **4.79** | **pass** |

Three distinct steps survive, so secondary text still reads as secondary.
One token, shared — it fixed the CRM and Will at once.

## 2. The admin is set in Inter; the site keeps DM Sans

Not a matter of taste. Two things were measured off the font binaries with
fontTools before deciding:

| | DM Sans | Inter |
|---|---|---|
| x-height | 0.504 em | **0.546 em** (+8%) |
| x/cap ratio | 0.720 | 0.750 |
| tabular figures (`tnum`) | **absent** | **present** |

**DM Sans has no tabular-figures feature at all.** The admin's CSS asks for
`font-variant-numeric: tabular-nums` on every KPI value and numeric table
column — and on DM Sans that request did nothing. Measured in the browser, the
strings "111" and "000" rendered **31.5px apart** at 40px. Columns of TFNs,
phone numbers, refund amounts and counts never actually lined up.

With Inter, the same measurement is **0.00px**. The columns align for the first
time. In a product that is almost entirely numbers, that was the argument.

An earlier claim in conversation — that Inter disambiguates `1`/`l`/`I` and
`0`/`O` by default — was **wrong and was withdrawn**. Those are opt-in character
variants (`cv05`, `zero`) and are not in this build. Inter's default `l` is a
plain stem, exactly like DM Sans'.

### How it is wired

- `Inter` is loaded in the root layout as `--font-ui`, with **`preload: false`**
  and **no `weight` array**.
  - `preload:false` because only `.crm-scope` and `.will-scope` reference it;
    a browser fetches a webfont only when something renders in it, so a visitor
    to the marketing site never downloads Inter.
  - no `weight` array so the **variable** font loads. The stylesheet asks for
    450 and 650 in thirteen places; static instances exist only at the hundreds,
    so those weights would have snapped or been synthesised and the type
    hierarchy would have flattened by a step.
- `--ui-font` is a token in `crm-design.css`, with the fallback **inside**
  `var()` so an undefined variable degrades to Inter rather than invalidating
  the declaration and silently inheriting the site's font.
- `--wa-font` is untouched: the chat bubbles, composer, drafts, quoted customer
  text and chat-list previews stay on WhatsApp's stack.

### Verified in the browser

| | result |
|---|---|
| Admin title / rail / KPI | Inter, weight 650 honoured (variable font live) |
| `--ink3` computed | `rgb(106,115,129)` = `#6a7381` |
| Tabular digits | proportional 31.5px apart → tabular **0.00px** |
| Will's rail | Inter |
| Will's chat preview / composer / name | **Segoe UI** — WhatsApp stack held |
| Public site body / h1 | **DM Sans / Fraunces** — untouched |

`npx tsc --noEmit` clean · `npx jest` 498/498.

## On copying Söhne or Styrene

ChatGPT is set in **Söhne** (Klim Type Foundry) and Claude in **Styrene** and
**Tiempos** — all commercially licensed, all paid for by the companies using
them. The files are downloadable from any page that serves them, but a font file
is copyrighted software and a web licence is per-domain and per-traffic-tier.
Serving one unlicensed from workingholidaytax.com.au would be plain
infringement, trivially detectable, and a poor look for a firm whose business is
compliance. Buying a licence is a legitimate option and cheap at this traffic
level. Inter was chosen instead because for a dense numeric admin it is not a
compromise — it is the better tool, and Söhne's strength is brand presence on a
marketing site, which is out of scope here.
