# Design language: one set for CRM, Will and Atlas

Status: proposed, 15 Nov 2026. Waiting for Jo's approval before any screen changes.
Scope: every size, box, card, tile, button, input, row and table in the CRM, Will and Atlas. Colours stay as they are today (brand green, lime for status only, red for attention).

## Why
Today the three systems use 20+ font sizes (9px to 26px), 10 different corner radii and many different gaps. Measured in the code on 15 Nov: 13px appears 89 times, 12px 85 times, 11px 83 times, 12.5px 46 times, 14px 65 times. This language replaces all of them with one set.

## 1. Type (4 sizes, plus one display size)
| Token | Size | Weight | Used for |
|---|---|---|---|
| label | 12px | 500 | tags, meta lines, table headers, small captions |
| body | 14px | 400 | everything you read: names, messages, table cells, inputs, buttons |
| title | 16px | 600 | card and panel titles, section headings |
| display | 24px | 600 | page titles and big numbers (KPI tiles) |

Rules
- No other font sizes. Anything that looks like it needs 13px uses body (14px).
- Numbers in tiles and tables use tabular figures, so columns line up.
- Line height: label 16px, body 20px, title 22px, display 28px.

## 2. Spacing (8px grid, with 4px for tight fits)
Allowed values only: 4, 8, 12, 16, 24, 32.
- 4 inside a control (icon to text).
- 8 between items in a row or a list.
- 12 inside a compact card or row.
- 16 inside a standard card and between cards.
- 24 between sections.
- 32 between major blocks of a page.

## 3. Shape (4 radii)
| Token | Radius | Used for |
|---|---|---|
| r-sm | 6px | inputs, small chips, badges |
| r-md | 10px | buttons, rows that are clickable |
| r-lg | 14px | cards, tiles, panels, modals |
| r-pill | 999px | status pills, module pills, the search bar |

## 4. Size of clickable things
- Minimum height 24px and width 24px (WCAG 2.2 AA), and never closer than 8px to another target.
- Standard height on desktop: 32px (buttons, inputs, pills, tabs, close buttons).
- Table rows: 40px high.
- Icon-only buttons: 32 by 32.

## 5. Elements
- **Card**: white surface, 1px hairline border, r-lg, padding 16, no shadow except on hover or a floating panel.
- **Tile (KPI box)**: card with a label (12px) above and a display number (24px) below, padding 16.
- **Button**: 32px high, padding 0 12, body text (14px, 500). Primary uses the brand colour, secondary is white with a hairline border, ghost is text only.
- **Input / search**: 32px high (search bar 44px, pill), body text, r-sm (or r-pill for the search bar).
- **Status pill / badge**: 24px high, label text (12px, 500), r-pill, padding 0 8.
- **Table**: header label (12px, muted), cells body (14px), rows 40px, hairline dividers, no zebra stripes.
- **Panel / modal**: r-lg, padding 24, title 16px, body 14px, close button 32 by 32.
- **Hover**: a clickable card lifts 2px with a soft shadow. Reduced-motion users get no motion.

## 6. Mapping from today to the new set
| Today | New |
|---|---|
| 9px, 9.5px, 10px, 10.5px, 11px, 11.5px | label 12px |
| 12px, 12.5px, 13px, 13.5px, 14px, 14.5px | body 14px |
| 15px, 16px, 17px, 18px | title 16px |
| 20px, 22px, 24px, 26px | display 24px |
| radii 8, 9, 10, 12, 16, 20, 100 | r-sm 6, r-md 10, r-lg 14 |

## 7. How we apply it
1. Jo approves this document, or changes it.
2. Write the tokens once (one file), and make CRM, Will and Atlas read from it.
3. Change the screens one at a time, in this order: Atlas, then the CRM dashboard, then Will's chat, then the rest.
4. After each screen: measure the sizes in the browser with the same numbers as this document, and report any value that is not on the list.
