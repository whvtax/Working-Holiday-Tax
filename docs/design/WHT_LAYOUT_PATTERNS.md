# WHT layout patterns (reference: src/app/(site)/page.tsx)

Primitives: `@/components/wht/{Section,Hero,Type,Button,ImageSlot,WaButton,Blocks}`. Blocks and WaButton were added for the home page.

## Old markup to new primitive

| Old (Tailwind / inline) | New |
|---|---|
| `<section className="pt-[68px]" style=gradient>` + centered `max-w-[780px] text-center` hero | `<Hero title media>` (left aligned, photo right on desktop, band on phones) |
| `h1.font-serif.font-black` with coloured second line | plain h1 text with `<Mark>` on 2 to 4 words |
| kicker `<p style={KICKER}>` / 10.5px uppercase span | `eyebrow` prop on `Section` (mono). Kicker inside the H1 for SEO: `<span className={blocks.kicker}>` |
| `section py-12 bg-white` + `max-w-[880px] mx-auto reveal` | `<Section title titleId>` (heading left, content right from 1024px) |
| `bg-[#F2FAF7]` section | `tone="pale"`; alternate white, pale, white |
| dark forest promise band | ONE `tone="amber"` band (ink text), only for the key promise |
| closing forest band, centered | `<Section tone="forest" title>` + `<WaButton tone="light">` |
| `btn-primary` + inline height/radius + WhatsApp icon | `<WaButton>` (tracking kept) or `<LinkButton>` for plain links. No icon |
| bordered 14px comparison grid | `<Compare rows leftLabel rightLabel>` (one pale card) |
| 3 columns of figures | `<Figures items>`, `Section width="wide"` |
| numbered `ol` with flex | `<Steps items>` |
| 5 icon cards with shadow, guide cards | `<LinkRows items>` (hairline rows, no icons, no shadow) |
| white card + shadow | `blocks.card` (white, 1px line, 10px radius) on pale sections |
| `details.contact-faq-item` loop | `<Accordion items={FAQS}/>` inside a `Section` |
| `.reveal`, `hero-animate*` | removed |

## Snippets

```tsx
// 1 Hero (wrap in underHeader: the site header is fixed)
<div className={blocks.underHeader}><Hero
  title={<><span className={blocks.kicker}>Eyebrow</span>Plain words <Mark>key words.</Mark></>}
  media={<ImageSlot id="IMG-W01" className={heroStyles.media} subject="..." alt="..." priority />}>
  <Lead>Lead.</Lead>
  <WaButton href={WA} position="hero" topic="tax-return" lang="en">Message us on WhatsApp</WaButton>
  <p className={heroStyles.note}>Replies in about an hour.</p>
</Hero></div>
```
```tsx
// 2 Section, heading left, content right
<Section eyebrow="Kicker" title="Heading" titleId="x-title" tone="pale">
  <p className={`${blocks.text} ${blocks.muted}`}>Intro.</p>
  ...content...
</Section>
```
```tsx
// 3 Comparison, figures, rows
<Compare rows={rows.map(r => ({ left: r.a, right: r.b }))} leftLabel="On myGov" rightLabel="With us" />
<Figures items={FIGURES} />   <Steps items={STEPS} />
<LinkRows items={[{ href, eyebrow, title, desc, cta: 'Learn more →' }]} />
```
```tsx
// 4 Amber band (one per page)
<Section tone="amber" title="Our guarantee" titleId="g-title">
  <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>Promise copy.</p>
</Section>
```
```tsx
// 5 Forest CTA band
<Section tone="forest" title="Closing heading" titleId="cta-title">
  <p className={`${blocks.text} ${blocks.onForest}`}>Copy.</p>
  <WaButton href={WA} position="footer" topic="tax-return" lang="en" tone="light">Message us on WhatsApp</WaButton>
</Section>
```

## Pitfalls hit

- `LinkButton` is a server component and cannot take `onClick`. WhatsApp links with analytics must be `WaButton` (client, wraps `WaLink`).
- `RevealObserver` adds `.reveal` (opacity 0) to every `main section h2`, so new headings fade in and stay invisible in full-page screenshots. Scroll first, or inject `.reveal{opacity:1!important}`. It should skip `.wht` sections (not owned here).
- The header is fixed: `Hero` has no top offset, so the first line was hidden. Wrap in `blocks.underHeader` (68px) until `Hero` handles it.
- `Section` puts every child in the right column: wrap related blocks so the grid stays 5fr/7fr; use `width="wide"` for a full-width row (figures).
- Cards on pale sections must be white with a line border, or they vanish.
- `Section.tsx` mentions the other brand in a comment, which fails `brand-separation-26oct.test.ts`.
- Amber is a fill only; use `tone="amber"` with ink text, never amber text or buttons. Dropped the amber warning icon for this reason.
- No em or en dashes, including in comments and the arrow copy ("Learn more →" is fine).
