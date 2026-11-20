/**
 * The stage-move badge, the chat filter chips, the follow-up/quick-fill
 * chips and the task dismiss were all well under the ~44px touch guideline,
 * and the CRM "In Progress" checkbox was a literal 16x16 button inside a
 * card whose whole surface opens the task on click(): a near-miss on a
 * phone opened the task instead of toggling it (audit, 5 Sep). Grown on
 * coarse pointers only, so desktop's tighter rows and the visible box size
 * are unchanged; same labels, same colours, same behaviour.
 */
import fs from 'fs';
import path from 'path';

describe('key one-tap controls have a real touch target, not just a visual one', () => {
  const willCss = fs.readFileSync(
    path.join(process.cwd(), 'src/app/(site)/crm/whatsapp/will-scoped.css'),
    'utf8'
  );
  const crmCss = fs.readFileSync(
    path.join(process.cwd(), 'src/app/(site)/crm/crm-design.css'),
    'utf8'
  );
  const dashboardClientSrc = fs.readFileSync(
    path.join(process.cwd(), 'src/app/(site)/crm/dashboard/DashboardClient.tsx'),
    'utf8'
  );

  const willCoarseBlockMatch = willCss.match(/@media\(hover:none\),\(pointer:coarse\)\{([\s\S]*?)\n\}/);
  const crmCoarseBlockMatch = crmCss.match(/@media\(hover:none\),\(pointer:coarse\)\{([\s\S]*?)\n\}/);
  const willCoarseBlock = willCoarseBlockMatch ? willCoarseBlockMatch[1] : '';
  const crmCoarseBlock = crmCoarseBlockMatch ? crmCoarseBlockMatch[1] : '';

  it('grows the stage badge, filter chips, quick-fill chips and dismiss button on coarse pointers only', () => {
    // the visible, always-on rules stay exactly as they were (small, dense)
    expect(willCss).toMatch(/\.will-scope \.chtitle \.cstate-btn\{[^}]*padding:1px 5px/);
    expect(willCss).toMatch(/\.will-scope \.cfchip\{[^}]*padding:4px 8px/);
    // the coarse-pointer-only rule grows the hit area without touching those
    expect(willCoarseBlock).toMatch(
      /\.will-scope \.cstate-btn,\.will-scope \.cfchip,\.will-scope \.chipbtn,\.will-scope \.tdismiss\{min-height:36px/
    );
  });

  it('gives the CRM In-Progress checkbox an invisible padded hit area on coarse pointers, without resizing the visible box', () => {
    // visible box stays 16x16 everywhere
    expect(dashboardClientSrc).toMatch(/className="tinprog"[\s\S]{0,400}width:16,height:16/);
    // the coarse-pointer rule pads the target via a pseudo-element, not by
    // resizing the button itself
    expect(crmCoarseBlock).toMatch(/\.crm-scope \.tinprog::before\{content:'';position:absolute;inset:-10px\}/);
  });

  it('still stops the click reaching the card (toggling, not opening, the task)', () => {
    expect(dashboardClientSrc).toMatch(/className="tinprog"[\s\S]{0,200}onClick=\{e=>\{e\.stopPropagation\(\);toggleInProgress\(t\)\}\}/);
  });
});
