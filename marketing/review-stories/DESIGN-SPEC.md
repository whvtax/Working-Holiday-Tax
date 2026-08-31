# Google review stories — design spec & how to add more

Instagram Story cards (1080×1920) that turn our real Google reviews into a
Highlight. Built so you can **add new reviews later without repeating old ones
and without the design drifting**. Nothing here is part of the website build —
it is a standalone generator.

## Files

| File | What it is |
|------|-----------|
| `stories.html` | The generator. Holds the design (CSS) **and** the review data. Edit the `reviews` array to add reviews. |
| `render.mjs` | Screenshots every frame in `stories.html` to a 1080×1920 PNG in `output/`. |
| `output/` | The rendered PNGs, in swipe order. `story-00` = cover, then one per review, last = closing CTA. |

## How to render

```
cd marketing/review-stories
npm i -D playwright          # once
npx playwright install chromium   # once (or set CHROMIUM_PATH to an existing one)
node render.mjs
```

Output lands in `output/`. Upload each PNG to an Instagram Story in filename
order, then add them all to one Highlight. Add an Instagram **link sticker**
to the cover and the closing card only, pointing at the Google reviews page.

## Add new reviews (the important part)

1. **Get the latest reviews.** They live on the free Featurable widget that the
   site already uses (`src/app/api/google-reviews/route.ts`). Widget id:
   `e9befa26-d16a-4bc5-90e8-a857cb8cbb0c`.
   Endpoint: `https://api.featurable.com/v1/widgets/<widgetId>` → JSON with
   `reviews[].reviewer.displayName`, `starRating`, `comment`, `createTime`.
2. **Open `stories.html`** and find the `reviews` array. Each entry is:
   `{ n: 'Name', d: 'YYYY-MM-DD', t: "review text" }`
   - `n` = display name (you can tidy a name, e.g. write a Japanese reviewer's
     romanised name; keep it truthful).
   - `d` = the review's `createTime` date (drives the "3 weeks ago" label).
   - `t` = the review text. Light copy-editing is fine (fix typos, trim); never
     invent or change the meaning.
3. **Only APPEND reviews that are not already in the array.** De-dupe by name +
   date so you never post the same review twice. Keep newest first (top of the
   array) to match how they read.
4. Re-run `node render.mjs`. New cards are created; existing ones are identical.

That's it — the design never changes because it is fixed in the CSS below; you
only ever touch the data.

## Design tokens (do not change unless rebranding)

| Token | Value | Where |
|-------|-------|-------|
| Brand forest | `#0B5240` | card background gradient, headings, footer url, WhatsApp button |
| Gold | `#E9A020` | logo accent, closing pill; **stars use Google gold `#FBBC04`** |
| Cream / page | `#F5F9F7` | — |
| Heading font | **Fraunces** (serif) | "5.0", "What backpackers…", review quote, card name |
| Body font | **DM Sans** | sub-text, dates, "Google review", footer url |
| Card | white, radius 48px, soft shadow | review frames |
| Frame size | **1080×1920** (9:16) | every frame |
| Safe margins | ~200px top / ~210px bottom | keeps content clear of Instagram's UI |

Stars are always five and always gold — every review we show is 5★.

## Frame types

- **Cover (`f-cover`)** — brand mark + "Working Holiday Tax", a "Google Reviews"
  pill, a big **5.0**, five stars, "What backpackers say about us", one line of
  sub-text, "Swipe to read them →". Doubles as the Highlight cover.
- **Review card (`f-0…`)** — white card: a quote mark, "Google review" with the
  Google G, avatar (coloured circle + initial; see photos note), name + relative
  date, five gold stars, the quote (auto-sized: shorter = bigger), and
  `workingholidaytax.com.au` at the foot.
- **Closing CTA (`f-cta`)** — brand mark + url, five stars, "Your turn to get tax
  back", the services line, the gold "Start your tax return →" pill, and
  `WhatsApp +61 424 513 998 · @workingholidaytax`.

## The logo

Taken verbatim from `public/favicon.svg` (`markReal` in `stories.html`): mint
outer square, gold accent line + dot, forest shield with a tick on a white tile.
Designed for a green ground, so it is used on the cover and CTA. Don't redraw it
by hand — copy it from the favicon if it ever needs updating.

## Profile photos (why they're initials)

We use a coloured circle with the reviewer's initial, not their Google photo.
Google's image host (`lh3.googleusercontent.com`) is not reachable from the
build environment, so the photos can't be pulled in automatically — and for most
reviewers Google only stores a default letter avatar anyway. To use a real face:
screenshot that review from Google Maps, crop the face, and drop it into the
avatar (the card already supports an `<img class="avaImg">` overlay with an
initial fallback).

## Links

A Story image can't hold a clickable link — add Instagram's **link sticker**
when posting (cover + closing card), pointing at:
- Read reviews: `https://search.google.com/local/reviews?placeid=ChIJPeN9duNX320Rpa3iRXRSZj4`
- Leave a review: `https://search.google.com/local/writereview?placeid=ChIJPeN9duNX320Rpa3iRXRSZj4`
