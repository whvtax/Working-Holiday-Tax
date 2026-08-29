/**
 * The root layout must import real fonts, not the offline build stub.
 *
 * WHY THIS TEST EXISTS. This sandbox has no network route to
 * fonts.googleapis.com, so `next build` cannot run with the real
 * `next/font/google` imports. The workaround is to stub them, build, and put
 * the real imports back. It only takes forgetting the last step once.
 *
 * The cost of forgetting is invisible and total: `variable: '--font-serif'`
 * comes back as a plain string that lands as a CSS CLASS name, so the custom
 * property is never defined, no @font-face is emitted, no font file is written
 * to .next/static/media, and all 29 `var(--font-serif)` rules in globals.css
 * silently resolve to Georgia. The site still builds, still deploys, still
 * looks like a website, and every typographic decision in the design is gone.
 *
 * Nothing else in the pipeline notices, which is exactly why it needs a test.
 * A failure here means: put the real imports back before shipping.
 */
import { readFileSync } from 'fs';
import { join } from 'path';

// Moved 29 Aug: the fonts live in the shared document shell now, because
// there is one root layout per language and all three render this.
const layout = readFileSync(join(process.cwd(), 'src/components/layout/RootDocument.tsx'), 'utf8');

describe('the shared document ships real webfonts', () => {
  it('imports them from next/font/google', () => {
    expect(layout).toMatch(/import\s*\{[^}]*\}\s*from\s*'next\/font\/google'/);
  });

  it('does not contain the offline build stub', () => {
    // The exact shape of the workaround, so this fails loudly rather than
    // subtly if it is ever left behind again.
    expect(layout).not.toContain('__stub');
    expect(layout).not.toContain('__FontOpts');
  });

  it('still declares all three families', () => {
    for (const family of ['Fraunces', 'DM_Sans', 'Inter']) {
      expect(layout).toContain(family);
    }
  });
});
