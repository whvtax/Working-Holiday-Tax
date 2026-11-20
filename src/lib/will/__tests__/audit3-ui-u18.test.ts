/**
 * Long instructional refusals (unfilled placeholder, outside-the-24h-window,
 * etc.) used to show in the same 2.6s nowrap toast as "Sent ✓", so the
 * longest and most useful ones raced off a phone-width screen before anyone
 * could read them (audit, 5 Sep). `say()` now holds a long message (over 60
 * chars) for 8s and lets it wrap via a `.toast.long` class; short toasts are
 * unchanged. No wording changed anywhere, only how long it stays and whether
 * it wraps.
 */
import fs from 'fs';
import path from 'path';

describe('toast readability for long refusals', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  const css = fs.readFileSync(
    path.join(process.cwd(), 'src/app/(site)/crm/whatsapp/will-scoped.css'),
    'utf8'
  );

  it('say() classifies long messages and holds them longer than the 2.6s default', () => {
    expect(src).toMatch(/const say = \(m: string\) => \{[\s\S]{0,300}const long = m\.length > 60;/);
    expect(src).toMatch(/setToastLong\(long\)/);
    expect(src).toMatch(/setTimeout\(\(\) => setToast\(''\), long \? 8000 : 2600\)/);
  });

  it('the toast element carries the long class so it can wrap', () => {
    expect(src).toMatch(/className=\{`toast \$\{toast \? 'show' : ''\} \$\{toastLong \? 'long' : ''\}`\}/);
  });

  it('CSS gives .toast.long room to wrap instead of a fixed nowrap line', () => {
    expect(css).toMatch(/\.toast\{[^}]*white-space:nowrap/);
    expect(css).toMatch(/\.toast\.long\{[^}]*white-space:normal/);
  });

  // (audit, 5 Sep) The general CRM stylesheet defines the same .toast base
  // rule (nowrap) for .crm-scope; keep its .long variant in step with the
  // WhatsApp panel's so a future crm-scope toast can't regress to a clipped
  // one-line message on a phone.
  it('the general CRM stylesheet keeps its .toast.long in step with the WhatsApp one', () => {
    const crmCss = fs.readFileSync(
      path.join(process.cwd(), 'src/app/(site)/crm/crm-design.css'),
      'utf8'
    );
    expect(crmCss).toMatch(/\.crm-scope \.toast\{[^}]*white-space:nowrap/);
    expect(crmCss).toMatch(/\.crm-scope \.toast\.long\{[^}]*white-space:normal/);
  });
});
