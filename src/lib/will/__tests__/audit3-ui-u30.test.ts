/**
 * On a phone (<=840px) the whole `.health` block used to be
 * `display:none`. That block is where Dashboard.tsx renders the
 * WhatsApp-down pill, the TEST MODE pill and the "DATABASE OUT OF DATE.
 * New customers are being dropped" alarm, alongside the quiet per-check
 * `.hdot` status dots. Hiding the block hid the alarms too, so Will could
 * be silently offline on the exact device Jo carries. Only the quiet dots
 * should hide on narrow screens; the alarm pills must stay visible at
 * every width (audit, 5 Sep — see the CSS comment at the same rule).
 */
import fs from 'fs';
import path from 'path';

describe('mobile health row hides only the quiet dots, keeps the alarm pills visible', () => {
  const css = fs.readFileSync(
    path.join(process.cwd(), 'src/app/(site)/crm/whatsapp/will-scoped.css'),
    'utf8'
  );

  const mobileBlockMatch = css.match(/@media\(max-width:840px\)\{([\s\S]*?)\n\}/);
  const mobileBlock = mobileBlockMatch ? mobileBlockMatch[1] : '';

  it('has a max-width:840px block containing the health rules', () => {
    expect(mobileBlock).toContain('.health');
  });

  it('does not hide the whole .health row', () => {
    expect(mobileBlock).not.toMatch(/\.will-scope \.health\{[^}]*display:none/);
  });

  it('hides only the per-check dots (.health .hdot)', () => {
    expect(mobileBlock).toMatch(/\.will-scope \.health \.hdot\{[^}]*display:none/);
  });

  it('lets the remaining pills wrap instead of overflowing', () => {
    expect(mobileBlock).toMatch(/\.will-scope \.health\{[^}]*flex-wrap:wrap/);
  });
});
