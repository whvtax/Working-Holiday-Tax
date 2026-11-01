# 006: Working Holiday Tax refresh (Jo, 31 Oct 2026)

Status: design agreed in principle, nothing built on the live site yet.

## Decided
- Full visual refresh (logo, colour, type, layout, components). Text, headings, URLs, structured data and links stay as they are (SEO and AI search, #1 in en, de, ja).
- Concept: field notebook. White background, round corners, deep green #1F4A42, pencil yellow as accent, pencil slash mark in a green circle, Bricolage Grotesque headings with DM Sans body (Zen Kaku Gothic New for Japanese, subset). Mobile first (99 percent of visitors), desktop derived from it.
- Not like Student Visa Tax: no highlighter bar behind words (pencil underline instead), different fonts and palette.
- One WhatsApp primary button in the hero. No agent name or registration number shown. Hero subline text unchanged.
- No logo icon for now (name in text). All logo attempts were rejected.
- Real photos from Jo (objects, no faces), spread next to related content, none in the first screen, re-exported at 1200 px (3:2), 900x1125 (4:5), 1200x514 (21:9), WebP/AVIF, fixed dimensions, literal alt text per language.
- Guarantee line shows the full-fee caveat next to it.
- Example chat is labelled "Illustrative example, not a real customer", no advice, no promise, data-nosnippet.
- Launch as an A/B test (see ROADMAP item 11 gate), not a straight swap.

## Open
- myGov comparison wording (compliance reviewer asked to soften absolutes about the ATO): Jo to decide.
- Whether to test photos against no photos first (some may read as AI).
- Logo.
- Japanese layout rules from review: no letter-spaced capital eyebrows, no underline in the headline, headline weight 700 at about 26 to 28 px with line-height 1.4, tighter section spacing, fee and steps in a ruled block. German: lang=de, hyphens:auto, privacy line near the button and a privacy link in the footer.

## Build rules (from the review panel)
One h1; real headings, ol/ul, anchors with href and name; focus ring; 44 px targets; reduced-motion guard; h1 never animated or hidden; next/font with size-adjusted fallbacks; keep JSON-LD, FAQ markup, meta and canonical; diff DOM and schema against the live page before launch.
