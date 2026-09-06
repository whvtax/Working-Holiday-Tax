/**
 * Quick-fill chips work outside the 24h window (audit, 5 Sep).
 *
 * The four numbered Quick-fill chips load a Library body into the compose
 * box. That text used to leave as a plain manual_reply, which the server
 * refuses once the customer has been quiet for a day, so the day-3 Medicare
 * send failed with a red toast while the banner pointed at those very
 * buttons. Now an unedited Quick-fill body sent outside the window goes via
 * `send_template` (approved Meta template of that key, same wording); inside
 * the window, or once edited, it stays a manual_reply.
 */
import fs from 'fs';
import path from 'path';
import { quickTemplateKeyFor, outside24hWindow } from '@/components/will/Dashboard';

const templates = [
  { key: 'req_abn', body: 'Please send your ABN.' },
  { key: 'medicare', body: 'Hi {{1}}, a quick one about Medicare.\nCould you confirm?' },
  { key: 'followup_form_1', body: 'Just checking in.' },
];

describe('quickTemplateKeyFor', () => {
  it('recognises an unedited Quick-fill body, whitespace aside', () => {
    expect(quickTemplateKeyFor(templates[1].body, templates)).toBe('medicare');
    expect(quickTemplateKeyFor('  ' + templates[0].body + '\n', templates)).toBe('req_abn');
  });
  it('falls back to free text once the body is edited, empty, or not a Quick-fill', () => {
    expect(quickTemplateKeyFor(templates[1].body + ' Thanks!', templates)).toBeNull();
    expect(quickTemplateKeyFor('', templates)).toBeNull();
    expect(quickTemplateKeyFor('Just checking in.', templates)).toBeNull();
  });
});

describe('outside24hWindow', () => {
  const now = Date.parse('2026-09-05T10:00:00Z');
  it('matches the banner rule: more than 24h since the customer last wrote', () => {
    expect(outside24hWindow(new Date(now - 23 * 3600_000).toISOString(), now)).toBe(false);
    expect(outside24hWindow(new Date(now - 25 * 3600_000).toISOString(), now)).toBe(true);
    expect(outside24hWindow(null, now)).toBe(true);
  });
});

describe('Dashboard wiring', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  it('sendManual routes an unedited Quick-fill outside the window through send_template', () => {
    const fn = src.slice(src.indexOf('const sendManual = async'), src.indexOf('return !!r?.ok;'));
    expect(fn).toContain("outside24hWindow(opts.lastCustomerMsgAt) ? quickTemplateKeyFor(text, data.templates)");
    expect(fn).toContain("act({ action: 'send_template', customerId, id: tplKey })");
    expect(fn).toContain("act({ action: 'manual_reply', customerId, body: text })");
  });
  it('both chat composer sends pass the customer window so the routing can apply', () => {
    const calls = src.match(/sendManual\(chatSel\.id, text, \{ lastCustomerMsgAt: chatSel\.lastCustomerMsgAt \}\)/g) ?? [];
    expect(calls.length).toBe(2);
  });
  it('the 24h banner no longer points only at the follow-up chips', () => {
    expect(src).not.toContain('Use one of the template buttons above.');
    expect(src).toContain('Use a numbered Quick-fill (sent unedited) or a Follow-up chip above.');
  });
});
