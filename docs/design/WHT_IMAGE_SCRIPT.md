# Working Holiday Tax: image script (ChatGPT)

Jo uses this script to generate every Working Holiday Tax photo with ChatGPT image generation. The slots and exact file names come from `src/lib/wht/images.ts`. Files go in `public/wht-assets/img/` and a slot shows its photo as soon as every file it lists exists, with no code change. Until then the page shows a dev-only placeholder (home) or no photo (inner pages).

Same method as `docs/content/svt-image-prompts.md`, adapted for backpackers on a 417 or 462 working holiday visa in Australia.

## How to work

1. Open a new ChatGPT chat for the whole session. Paste the fixed style block below first and send it. Say: "Remember this style for every image I ask for next. Reply OK."
2. For each image, paste only its prompt. Ask ChatGPT for the stated canvas (3:2 landscape 1536x1024, or 2:3 portrait 1024x1536 where the table says so).
3. Make 3 or 4 variants. Pick the most ordinary looking one. Run the review checklist.
4. Convert with the one line command under the image, then save into `public/wht-assets/img/` with the exact file name.
5. Keep one chat per batch of about 5 images, otherwise the style drifts. Paste the style block again at the start of each new chat.

## Fixed style block (paste first)

```
Documentary photograph, shot on a 35mm lens in real available light. Warm natural colour grade with deep forest green tones in the shadows and foliage, soft highlights, gentle film-like contrast. Candid and unposed, never staged, not a stock photo, no glossy or plastic sheen, no HDR look. Everyday working holiday life in Australia, a backpacker on a 417 or 462 visa. If people appear they are seen from behind, in the distance, or only as hands, and no face is the focus. No text, no signage with readable words, no logos, no recognisable brands or app colours, no flags. Australian details must be accurate: Australian road and street furniture, Australian power points and plugs, Australian vegetation and light, driving on the left, hi-vis in orange or yellow, no US or European details.
```

## Negative notes used on every image

no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. Each image below adds its own extra negatives. ChatGPT has no negative prompt field, so paste the negative line at the end of the prompt as "Avoid: ...".

## Review checklist (every generated image)

- No readable text anywhere: signs, packaging, screens, paperwork, number plates. Melted letters count as text. Reject.
- No logos or recognisable brands, and no delivery app colours.
- No face in focus. People only from behind, small and far away, or as hands. Check hands: five fingers, natural size.
- Not staged or stocky: no posed smiles, no perfect symmetry, no plastic sheen. A little clutter and wear is good.
- Colour grade matches the others: warm and natural with forest green tones. Reject cold blue or oversaturated.
- Australian details are right: three-pin angled plug, left side driving, gum trees and local light, hi-vis in orange or yellow, no US school buses, no European street signs.
- Nothing that implies a result, a refund, a real customer or a testimonial. Scene setting only.
- Subject sits clear of the crop edges for the crop you will make.
- After conversion: file name exact, dimensions exact, file under about 150 KB for scenes and 250 KB for home images, opens in a browser.
- Alt text check: the alt text in `src/lib/wht/images.ts` (or the home page) describes what is really in the picture. If the image differs, change the picture, not the alt.

## Ids to files

| Id | File(s) | Size (px) | Where |
|---|---|---|---|
| IMG-W01 | IMG-W01-mobile.webp | 1448x891 | Home hero, phone (band under the headline) |
| IMG-W01 | IMG-W01-desktop.webp | 1122x1402 | Home hero, from 1024px (tall, beside the headline) |
| IMG-W02 | IMG-W02-mobile.webp | 1448x891 | Home band between services and guides, phone |
| IMG-W02 | IMG-W02-desktop.webp | 1975x724 | Home band, from 1024px (full width) |
| IMG-W10 | IMG-W10.webp | 1536x1024 | tfn page |
| IMG-W11 | IMG-W11.webp | 1536x1024 | abn page |
| IMG-W12 | IMG-W12.webp | 1536x1024 | tax-return page and calculator page |
| IMG-W13 | IMG-W13.webp | 1536x1024 | superannuation page |
| IMG-W14 | IMG-W14.webp | 1536x1024 | medicare page |
| IMG-W15 | IMG-W15.webp | 1536x1024 | expenses/fifo page |
| IMG-W16 | IMG-W16.webp | 1536x1024 | expenses/delivery-drivers page |
| IMG-W17 | IMG-W17.webp | 1536x1024 | expenses/hospitality page |
| IMG-W18 | IMG-W18.webp | 1536x1024 | expenses/construction page |
| IMG-W19 | IMG-W19.webp | 1536x1024 | expenses/farm-work page |
| IMG-W20 | IMG-W20.webp | 1536x1024 | expenses/labouring page |
| IMG-W21 | IMG-W21.webp | 1536x1024 | expenses/cleaners page |
| IMG-W22 | IMG-W22.webp | 1536x1024 | about, contact, uk-working-holiday-tax, german-working-holiday-tax pages |

Scenes IMG-W10 to IMG-W22 are one file each, the same in every language (en, de, ja). The alt text per language lives in `SCENES` in `src/lib/wht/images.ts`.

## Conversion commands

Tools: `sharp` is in `node_modules` (crops and resizes, used for the home images). `cwebp` also works for plain scenes if installed.

Scene, 3:2 source to exact size (replace NN with the number, input is the PNG you saved):

```
node -e "require('sharp')('in.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-WNN.webp')"
```

or with cwebp: `cwebp -q 80 -resize 1536 1024 in.png -o public/wht-assets/img/IMG-WNN.webp`

Home images crop to the exact ratio first (sharp does it with `fit:'cover'`, keeping the centre). Command pattern, with the three values from the table:

```
node -e "require('sharp')('in.png').resize(W,H,{fit:'cover',position:'centre'}).webp({quality:80}).toFile('public/wht-assets/img/FILE.webp')"
```

## Home images: phone and desktop crops

IMG-W01 and IMG-W02 each have a phone file and a desktop file because the layout changes shape at 1024px. The shapes differ too much for one picture to serve both (a tall 4:5 hero cannot be cut from a wide frame, and a 2.7:1 band cannot be cut from a 3:2 frame without losing the subject). So generate two separate images per slot, from the same scene description, with different framing:

- IMG-W01-mobile.webp: phone crop, 1.625:1 landscape (ask for 3:2, 1536x1024, then crop).
- IMG-W01-desktop.webp: desktop crop, 4:5 portrait (ask for 2:3, 1024x1536, then crop).
- IMG-W02-mobile.webp: phone crop, 1.625:1 landscape (ask for 3:2, then crop).
- IMG-W02-desktop.webp: desktop crop, ultra wide 21:9 (ask for 3:2 with the subject kept in the middle third, then crop to the wide band; the crop upscales a little, so keep the scene soft and simple).

Keep the same place, light and props in both prompts so the two crops feel like one photograph.

## IMG-W01 Home hero

Files: IMG-W01-mobile.webp (1448x891) and IMG-W01-desktop.webp (1122x1402).
Where: top of the home page, beside the headline on desktop and as a band under the text on phones. This is the first photo a visitor sees, so it must feel calm, real and Australian.
Alt text (to set in the home hero ImageSlot): "A backpacker walking along a quiet Australian coastal path at sunrise with a backpack, seen from behind".

Prompt, phone (paste after the style block):

```
A backpacker seen from behind walking along a quiet coastal path in Australia at sunrise, a worn green backpack with a rolled sleeping mat strapped on, a hat, gum trees and low coastal scrub on one side and a calm sea on the other. Wide landscape composition, the person small in the middle third with clear space on both sides and open sky above. Warm gold light, forest green tones in the foliage. No face visible. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no beach tourist poster look, no kangaroo, no flag.
```

Prompt, desktop:

```
The same scene as a tall portrait composition: a backpacker seen from behind walking up a quiet coastal path in Australia at sunrise, worn green backpack with a rolled sleeping mat, a hat, gum trees and coastal scrub, calm sea in the lower distance. The person in the lower middle of the frame, framed from the knees up, lots of open sky above, nothing important within the outer 10 percent of the frame. Warm gold light, forest green foliage. No face visible. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no beach tourist poster look, no kangaroo, no flag.
```

Negative notes: no readable text, no flags, no backpack brand marks, no posing, no raised arms or sunset silhouette cliche.
Convert:

```
node -e "const s=require('sharp');s('w01-mobile.png').resize(1448,891,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W01-mobile.webp');s('w01-desktop.png').resize(1122,1402,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W01-desktop.webp')"
```

Alt text check: the person is seen from behind, with a backpack, near the coast, with warm sunrise light. If you changed the scene, change the alt.

## IMG-W02 Home band

Files: IMG-W02-mobile.webp (1448x891) and IMG-W02-desktop.webp (1975x724).
Where: full width band on the home page between the services and the guides.
Alt text (to set in the home band ImageSlot): "Hands holding a phone and a passport at a kitchen table in a shared house, morning light".

Prompt, phone:

```
Two hands, seen from just above and slightly behind, holding a smartphone beside a closed passport with a plain cover on a wooden kitchen table in an Australian shared house, a mug and a small bowl of fruit nearby, a window with gum tree leaves outside. Wide landscape, hands in the middle third, soft morning light, forest green tones from the leaves, shallow depth of field. No face. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no readable screen content, no chat app colours.
```

Prompt, desktop:

```
The same scene as an ultra wide panoramic composition: a long wooden kitchen table in an Australian shared house, two hands holding a smartphone beside a closed passport in the middle third, a mug and fruit bowl, a window with gum tree leaves on the right, lots of calm empty table and wall on both sides. Soft morning light, forest green tones, shallow depth of field. No face. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no readable screen content, no chat app colours.
```

Negative notes: no readable screen content, no WhatsApp or other app colours or logos, no passport crest or photo page, no money.
Convert:

```
node -e "const s=require('sharp');s('w02-mobile.png').resize(1448,891,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W02-mobile.webp');s('w02-desktop.png').resize(1975,724,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W02-desktop.webp')"
```

Alt text check: hands, phone, passport, kitchen table. No face.

## IMG-W30 Expenses hub hero (missing from the first version of this script)

Files: IMG-W30-mobile.webp (1448x891) and IMG-W30-desktop.webp (1122x1402).
Where: top of /expenses (and /de/expenses, /ja/expenses). Until these two files exist the page shows no photo in production.
Idea: seven work objects laid out tidily on one plain surface, one object per job (fruit picking, kitchen, building, driving, cleaning, labouring, FIFO). A flat lay is far easier to generate than seven people in one frame.
Alt text: "Seven everyday work items laid out together: a picking bucket, an apron, a hard hat, a delivery bag, cleaning gloves, work boots and a hi-vis vest".

Prompt, phone (paste after the style block):

```
A tidy top-down flat lay on a plain pale warm-grey surface: a fruit picking bucket, a cafe apron, a hard hat, an insulated delivery bag, yellow cleaning gloves, a pair of muddy work boots and a hi-vis vest, arranged in a calm balanced grid with even gaps. Wide landscape composition, soft daylight from the left, forest green and warm amber accents only. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no people, no hands, no extra fingers, no warped objects, no HDR, no neon colours.
```

Prompt, desktop:

```
The same flat lay as a tall portrait composition: the same seven work items arranged in a vertical balanced grid on a plain pale warm-grey surface, nothing important within the outer 10 percent of the frame, soft daylight from the left. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no people, no hands, no warped objects, no HDR, no neon colours.
```

Convert:

```
node -e "const s=require('sharp');s('w30-mobile.png').resize(1448,891,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W30-mobile.webp');s('w30-desktop.png').resize(1122,1402,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W30-desktop.webp')"
```

## Inner page scenes IMG-W10 to IMG-W22

All are 3:2, 1536x1024, one file per scene, used at one per page at most. Ask ChatGPT for a 3:2 landscape canvas. The English alt text below is what `SCENES` already holds; the German and Japanese versions are in `src/lib/wht/images.ts` and must still be true of the picture.


### IMG-W10

- File: IMG-W10.webp
- Size: 1536x1024
- Appears on: tfn page
- Alt text (English): A backpack and a passport on a hostel bunk

Prompt:

```
A worn travel backpack and a closed passport with a plain unmarked cover resting on a hostel bunk bed with a grey blanket, a phone charger cable with an Australian three-pin plug in the wall socket behind, warm morning window light, a little lived-in clutter, no person in frame. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no visible passport crest text, no photo page, no visa stickers.
```

Negative notes: no visible passport crest text, no photo page, no visa stickers.
Convert:

```
node -e "require('sharp')('img-w10.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W10.webp')"
```

Alt text check: the picture must really show "a backpack and a passport on a hostel bunk". 

### IMG-W11

- File: IMG-W11.webp
- Size: 1536x1024
- Appears on: abn page
- Alt text (English): A laptop and an invoice on a cafe table

Prompt:

```
A laptop and a printed invoice sheet with only blurred unreadable lines on a small wooden cafe table, a flat white coffee in a plain cup beside it, a pair of hands resting near the keyboard, seen from behind the shoulder, soft window light, shallow depth of field. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no readable amounts, no ABN digits, no company names on the invoice.
```

Negative notes: no readable amounts, no ABN digits, no company names on the invoice.
Convert:

```
node -e "require('sharp')('img-w11.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W11.webp')"
```

Alt text check: the picture must really show "a laptop and an invoice on a cafe table". 

### IMG-W12

- File: IMG-W12.webp
- Size: 1536x1024
- Appears on: tax-return page and calculator page
- Alt text (English): A kitchen table in the morning with a laptop and paperwork

Prompt:

```
A shared kitchen table in a rental house in the morning, an open laptop, a stack of blurred unreadable paperwork, a mug and a window with a gum tree outside, soft low sunlight, a person only as a partial back or hands at the edge, relaxed and ordinary. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no readable form text, no tax office marks, no screen content you can read.
```

Negative notes: no readable form text, no tax office marks, no screen content you can read.
Convert:

```
node -e "require('sharp')('img-w12.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W12.webp')"
```

Alt text check: the picture must really show "a kitchen table in the morning with a laptop and paperwork". 

### IMG-W13

- File: IMG-W13.webp
- Size: 1536x1024
- Appears on: superannuation page
- Alt text (English): A backpack and a suitcase in an airport departure hall

Prompt:

```
A backpack and a mid-size suitcase standing together on the floor of a bright airport departure hall, large windows, blurred distant travellers, no readable signs or screens, clean daylight, calm mood of leaving Australia. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no airline colours or logos, no departure board text.
```

Negative notes: no airline colours or logos, no departure board text.
Convert:

```
node -e "require('sharp')('img-w13.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W13.webp')"
```

Alt text check: the picture must really show "a backpack and a suitcase in an airport departure hall". 

### IMG-W14

- File: IMG-W14.webp
- Size: 1536x1024
- Appears on: medicare page
- Alt text (English): The waiting area of a medical clinic

Prompt:

```
The waiting area of a small Australian medical clinic, a row of plain chairs, a low table with a few magazines with blank unreadable covers, a pot plant, soft daylight through a window, one person seen only as a distant blurred back, no signage. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no Medicare card, no red cross or green cross symbols, no posters with words.
```

Negative notes: no Medicare card, no red cross or green cross symbols, no posters with words.
Convert:

```
node -e "require('sharp')('img-w14.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W14.webp')"
```

Alt text check: the picture must really show "the waiting area of a medical clinic". 

### IMG-W15

- File: IMG-W15.webp
- Size: 1536x1024
- Appears on: expenses/fifo page
- Alt text (English): A remote work camp at dusk with a hi-vis vest on a rail

Prompt:

```
A remote mining work camp in the Australian outback at dusk, rows of low demountable accommodation units, red earth, a hi-vis vest and a hard hat hanging on a rail in the foreground, warm last light on the dust, no people, no company logos. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no mining company logos, no machinery brands.
```

Negative notes: no mining company logos, no machinery brands.
Convert:

```
node -e "require('sharp')('img-w15.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W15.webp')"
```

Alt text check: the picture must really show "a remote work camp at dusk with a hi-vis vest on a rail". 

### IMG-W16

- File: IMG-W16.webp
- Size: 1536x1024
- Appears on: expenses/delivery-drivers page
- Alt text (English): A delivery bike with an insulated bag on a city corner

Prompt:

```
A bicycle leaning against a pole on an Australian city street corner at golden hour, a plain black insulated delivery backpack on the rear rack, tram or kerbside details out of focus, no person, no app colours, no logos, no neon green, no orange or teal brand colours. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no Uber Eats, DoorDash or Menulog colours, bags or marks, no neon green.
```

Negative notes: no Uber Eats, DoorDash or Menulog colours, bags or marks, no neon green.
Convert:

```
node -e "require('sharp')('img-w16.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W16.webp')"
```

Alt text check: the picture must really show "a delivery bike with an insulated bag on a city corner". 

### IMG-W17

- File: IMG-W17.webp
- Size: 1536x1024
- Appears on: expenses/hospitality page
- Alt text (English): A restaurant kitchen during a busy service

Prompt:

```
A professional restaurant kitchen mid service, stainless steel pass, pans on flame, steam rising, a cook seen from behind in a plain apron, motion slightly blurred, warm kitchen light, no faces, no logos, no readable tickets. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no plated food shown as an advert, no chef portrait.
```

Negative notes: no plated food shown as an advert, no chef portrait.
Convert:

```
node -e "require('sharp')('img-w17.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W17.webp')"
```

Alt text check: the picture must really show "a restaurant kitchen during a busy service". 

### IMG-W18

- File: IMG-W18.webp
- Size: 1536x1024
- Appears on: expenses/construction page
- Alt text (English): A hard hat and a hi-vis vest on a building site fence

Prompt:

```
A white hard hat and an orange hi-vis vest hanging on a temporary mesh building site fence, a half-built concrete frame and a crane blurred behind, bright Australian morning sun, no people, no company names, no readable signs. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no site safety signs with words, no builder names.
```

Negative notes: no site safety signs with words, no builder names.
Convert:

```
node -e "require('sharp')('img-w18.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W18.webp')"
```

Alt text check: the picture must really show "a hard hat and a hi-vis vest on a building site fence". 

### IMG-W19

- File: IMG-W19.webp
- Size: 1536x1024
- Appears on: expenses/farm-work page
- Alt text (English): Rows of fruit trees on a farm in morning light

Prompt:

```
Long rows of citrus or stone fruit trees on an Australian farm in early morning light, low mist, bins of picked fruit at the end of a row, a picker seen small and far away from behind, green and golden tones. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no branded crates, no smiling posed picker.
```

Negative notes: no branded crates, no smiling posed picker.
Convert:

```
node -e "require('sharp')('img-w19.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W19.webp')"
```

Alt text check: the picture must really show "rows of fruit trees on a farm in morning light". 

### IMG-W20

- File: IMG-W20.webp
- Size: 1536x1024
- Appears on: expenses/labouring page
- Alt text (English): A quiet warehouse aisle with safety boots by a trolley

Prompt:

```
A quiet warehouse aisle with tall plain pallet racking, a hand trolley and a pair of steel-cap safety boots standing beside it, daylight from a high skylight, concrete floor, no people, no readable labels or boxes with branding. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no brand names on boxes or racking, no forklift logos.
```

Negative notes: no brand names on boxes or racking, no forklift logos.
Convert:

```
node -e "require('sharp')('img-w20.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W20.webp')"
```

Alt text check: the picture must really show "a quiet warehouse aisle with safety boots by a trolley". 

### IMG-W21

- File: IMG-W21.webp
- Size: 1536x1024
- Appears on: expenses/cleaners page
- Alt text (English): A cleaning trolley in a hotel corridor

Prompt:

```
A housekeeping cleaning trolley with folded white towels and plain unmarked bottles in a calm hotel corridor, patterned carpet, an open room door with soft light, no person visible, no hotel name or logo. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no hotel logos, no brand names on bottles.
```

Negative notes: no hotel logos, no brand names on bottles.
Convert:

```
node -e "require('sharp')('img-w21.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W21.webp')"
```

Alt text check: the picture must really show "a cleaning trolley in a hotel corridor". 

### IMG-W22

- File: IMG-W22.webp
- Size: 1536x1024
- Appears on: about, contact, uk-working-holiday-tax, german-working-holiday-tax pages
- Alt text (English): A beach car park at sunrise with a van and surfboards

Prompt:

```
A coastal car park at sunrise on the Australian coast, an older white campervan with surfboards leaning on its side, pale pink and gold sky, low dune grass, a person only as a tiny distant silhouette from behind, no number plate readable, no logos. Avoid: no text or letters anywhere, no logos or brand marks, no recognisable brands, no readable signs, no flags, no stock-photo smile, no face in focus, no extra fingers, no warped objects, no HDR, no lens flare, no neon colours. no number plate, no brand names on boards, no tourist poster look, no kangaroo.
```

Negative notes: no number plate, no brand names on boards, no tourist poster look, no kangaroo.
Convert:

```
node -e "require('sharp')('img-w22.png').resize(1536,1024,{fit:'cover'}).webp({quality:80}).toFile('public/wht-assets/img/IMG-W22.webp')"
```

Alt text check: the picture must really show "a beach car park at sunrise with a van and surfboards". 
