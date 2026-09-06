/**
 * CRM task detail grid collapses to one column on a phone (audit, 5 Sep).
 *
 * The four detail panels used a hard-coded two-column grid
 * (`minmax(0,1fr) minmax(0,1fr)`) regardless of viewport width. On a phone
 * (~305px main column) each panel is ~140px, and the .fk label's 110px
 * min-width (crm-design.css) leaves ~20px for the value, so TFN/bank/address
 * fields wrap to one digit per line. Switching to
 * `repeat(auto-fit,minmax(280px,1fr))` keeps exactly two columns at desktop
 * widths (each panel still clears 280px there) and drops to one column once
 * the viewport can no longer fit two 280px panels, so the label always has
 * room beside the value.
 */
import fs from 'fs';
import path from 'path';

describe('DashboardClient task detail grid', () => {
  const src = fs.readFileSync(
    path.join(process.cwd(), 'src/app/(site)/crm/dashboard/DashboardClient.tsx'),
    'utf8'
  );

  it('no longer forces a fixed two-column split for the 4 detail panels', () => {
    expect(src).not.toContain("gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)'");
  });

  it('uses an auto-fit grid that collapses to one column under ~600px', () => {
    expect(src).toContain("gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))'");
  });
});
