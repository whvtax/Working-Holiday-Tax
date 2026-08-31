// Renders every frame in stories.html to a 1080x1920 PNG in ./output/
//
// Requirements: node + playwright + a Chromium binary.
//   npm i -D playwright
//   npx playwright install chromium        (or point executablePath at one)
//
// Run:  node render.mjs
//
// Each .frame element in stories.html is screenshotted 1:1 at 1080x1920 (the
// exact Instagram Story size). File order = swipe order:
//   story-00 = cover, story-01..N = reviews, story-(last) = closing CTA.
import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, 'output');
mkdirSync(outDir, { recursive: true });

// If Chromium is at a fixed path in your environment, set it here; otherwise
// Playwright's downloaded browser is used.
const exe = process.env.CHROMIUM_PATH || undefined;

const b = await chromium.launch(exe ? { executablePath: exe } : {});
const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await p.goto('file://' + join(here, 'stories.html'), { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.evaluate(() => Promise.all([...document.images].map(img =>
  img.complete ? Promise.resolve() : new Promise(res => { img.onload = img.onerror = res; }))));
await p.waitForTimeout(600);

const ids = await p.$$eval('.frame', els => els.map(e => e.id));
let n = 0;
for (const id of ids) {
  const el = await p.$('#' + id);
  const num = String(n).padStart(2, '0');
  await el.screenshot({ path: join(outDir, `story-${num}-${id.replace('f-', '')}.png`) });
  n++;
}
await b.close();
console.log('rendered ' + n + ' frames to ' + outDir);
