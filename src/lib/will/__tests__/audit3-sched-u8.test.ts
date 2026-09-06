/**
 * audit3 / sched / unverified[8]: editing a META follow-up in the Library
 * changes the CRM transcript, not what the customer receives.
 *
 * For a `requiresMeta` row, Meta sends the body approved in WhatsApp
 * Manager and only fills {{1}} (channel.ts); the scheduler logs the Library
 * body as the sent message, so the transcript and the Follow-ups preview
 * show new wording the customer never gets until WhatsApp Manager is also
 * updated to match. This pins the edit-modal notice and the save toast that
 * now say so, without changing what is sent, stored or logged.
 */
import fs from 'fs';
import path from 'path';
import { metaEditNotice, templateSaveOutcome } from '@/components/will/Dashboard';

describe('metaEditNotice', () => {
  it('warns on a Meta-backed row that the Library copy is not what the customer receives', () => {
    const notice = metaEditNotice({ key: 'fu_pre_24h', requiresMeta: true });
    expect(notice).toMatch(/WhatsApp Manager template fu_pre_24h/);
    expect(notice).toMatch(/24h window/);
    expect(notice).not.toContain('-');
  });
  it('says nothing for a Custom (non-Meta) row', () => {
    expect(metaEditNotice({ key: 'custom_ab12', requiresMeta: false })).toBeNull();
    expect(metaEditNotice({ key: 'custom_ab12' })).toBeNull();
  });
});

describe('templateSaveOutcome with a Meta key', () => {
  it('tells the owner to update WhatsApp Manager instead of claiming the edit is live', () => {
    const o = templateSaveOutcome({ ok: true, version: 4 }, 'update', 'fu_pre_24h');
    expect(o.saved).toBe(true);
    expect(o.message).toMatch(/update template fu_pre_24h in WhatsApp Manager/);
    expect(o.message).not.toContain('-');
  });
  it('keeps the original success line for a Custom row (no metaKey)', () => {
    const o = templateSaveOutcome({ ok: true, version: 2 }, 'update');
    expect(o.message).toBe('Saved, live for all new conversations ✓');
  });
  it('a failed save still reports the failure, metaKey or not', () => {
    const o = templateSaveOutcome({ ok: false, error: 'boom' }, 'update', 'fu_pre_24h');
    expect(o.saved).toBe(false);
    expect(o.message).toContain('boom');
  });
  it('a blocked save still reports the block, metaKey or not', () => {
    const o = templateSaveOutcome({ ok: true, blocked: ['EM_DASH_FORBIDDEN'] }, 'update', 'fu_pre_24h');
    expect(o.saved).toBe(false);
    expect(o.message).toMatch(/^Blocked:/);
  });
});

describe('Dashboard wiring', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  it('the edit modal renders the notice and passes the Meta key into the save toast', () => {
    expect(src).toContain('{metaEditNotice(tpl) && <div className="sysline"');
    expect(src).toContain("templateSaveOutcome(r, 'update', tpl.requiresMeta ? tpl.key : null)");
  });
});
