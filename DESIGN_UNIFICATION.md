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
