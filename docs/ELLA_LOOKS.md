# Ella looks: how to make a new one and add it

Every video uses a different look (outfit, hair, place in the room). The code draws it at random
(`src/lib/ella/looks.ts`) from the looks not yet used in this cycle: never the same look twice
in a row, and every look gets a turn before any look repeats. A video keeps its look for every later run, scene redo and render.

## Looks in use (25 Nov 2026)

76 looks: L1 to L87 (the full list with what each one wears is in `src/lib/ella/looks.ts`).
IDs are never reused: a rejected or retired look keeps its number. Missing numbers were rejected
or not made: L22, L24, L28, L34, L40, L49, L61, L63, L72, L85, L86, L88, L89.

## Making a new look

1. Upload `src/lib/ella/assets/character/ella-master.png` as the reference image.
2. Paste the IDENTITY block, then one LOOK block. One look per image.
3. Make 3 to 4 variants and keep the best one.

### IDENTITY (paste every time, unchanged)

```
Use the reference image as the exact same woman. Keep her face, facial structure, eye shape and colour, eyebrows, skin tone, freckles and smile identical to the reference. Same age (mid twenties). Small gold hoop earrings. Natural, polished everyday makeup. A small black clip-on lavalier microphone on her top, near the collar.

Photoreal phone footage still, vertical 9:16, 1536 x 2720, realistic soft daylight, shallow depth of field, sharp focus on her face. Her body faces the camera almost straight on, turned only very slightly, and her face looks directly into the camera, fully frontal, both ears equally visible. Warm, calm, confident expression, mouth relaxed or lightly smiling. Upper body framed from the waist up, head in the upper third of the frame, space above her head. Polished, tidy, put-together styling, never messy, never sexy or glamorous. No text, no logos, no symbols, no brand names anywhere in the image, including on any laptop, phone, mug or object.
```

### LOOK block (fill in, one change of place or pose per look)

```
OUTFIT: [one clear outfit, colour and fabric, neat and well fitted]
HAIR: [one neat style: sleek ponytail, low bun, side braid, smooth waves...]
SETTING: [the same bright home office, from a different side: window left or right, shelves with colourful binders, trailing pothos plant, framed coastal print, warm lamp]
POSITION AND CAMERA: [seated in the black mesh chair / at the desk / standing], hands resting together, medium close-up, camera at eye level directly in front of her.
LIGHT: [soft daylight from one side, face clearly and evenly lit]
```

If the face drifts, add at the end:
`The face must match the reference image exactly: same person, same features. Change only the clothes, hair styling, pose and background.`

### Ideas for the next looks

- Black fitted cardigan over a white tee, sleek low ponytail, window on the right.
- Soft pink knit sweater, hair in a neat half-up, seated at the desk with a plain notebook.
- White linen shirt, sleeves rolled, hair tucked behind both ears, standing by the shelves.
- Mustard knit cardigan over a cream top, side braid, evening lamp light.
- Light grey blazer over a navy top, smooth low bun, shelves behind her.
- Striped navy and white long-sleeve top, hair down in soft waves, window behind her.

## Checking a look before it goes in

Reject it if any of these is true:

- The face is not clearly the same person as the master.
- The face is turned to the side (HeyGen lip sync looks best with a frontal face).
- Any text, logo or symbol is visible (laptop lids are the usual problem).
- Hands or fingers look wrong, or the microphone is missing.
- The hair or clothes look messy.

## Adding a look to the code

1. Save the image as JPEG, quality 92, 1080 x 1912, named `ella-L<number>.jpg`.
2. Put it in `src/lib/ella/assets/character/`.
3. Add one line to `ELLA_LOOKS` in `src/lib/ella/looks.ts`.
4. Run `npm run test:ella`, then deploy. A new look joins the cycle first.
