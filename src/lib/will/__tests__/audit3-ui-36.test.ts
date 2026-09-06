import fs from 'fs';
import path from 'path';

// Pins the fix for audit3 finding unverified[36]: the notification popover
// must never be trapped under the side rail's higher stacking context, and
// its width must never run under the rail on a narrow (phone) viewport.
describe('notification popover mobile stacking (audit3 unverified[36])', () => {
  const src = fs.readFileSync(
    path.join(__dirname, '../../../components/will/Dashboard.tsx'),
    'utf8'
  );

  it('raises the header above the side rail while the popover is open', () => {
    // aside.side is z-index:70 and header is z-index:60 in will-scoped.css;
    // the header must out-rank it whenever notifOpen is true, or the
    // popover's own z-index can never lift it above the rail.
    expect(src).toMatch(/<header\s+style=\{notifOpen \? \{ zIndex: 80 \} : undefined\}>/);
  });

  it('caps the popover width so it cannot run under the side rail', () => {
    expect(src).toContain("width: 'min(320px, calc(100vw - 70px))'");
    // must not have regressed back to a bare fixed width
    expect(src).not.toMatch(/right: 0, width: 320,/);
  });
});
