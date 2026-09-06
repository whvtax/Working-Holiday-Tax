/**
 * "Save & Go Live" / "Save Message" only report success on a confirmed save
 * (audit, 5 Sep).
 *
 * Both Library save handlers used to check `blocked` alone and then say
 * "Saved, live" for a 400 (too long), an expired session, a 500, a dropped
 * connection, or an update on a row another tab or Sync had removed (the
 * server answers ok with `version: null` there). The modal closed and Will
 * kept sending the old text. Now anything that is not a confirmed save keeps
 * the modal open and says why; the guard path reads exactly as before.
 */
import fs from 'fs';
import path from 'path';
import { templateSaveOutcome } from '@/components/will/Dashboard';

describe('templateSaveOutcome', () => {
  it('a confirmed save reads exactly as before and closes the modal', () => {
    expect(templateSaveOutcome({ ok: true, key: 'medicare', version: 3 } as never, 'update'))
      .toEqual({ saved: true, message: 'Saved, live for all new conversations ✓' });
    expect(templateSaveOutcome({ ok: true, id: 'x' } as never, 'add'))
      .toEqual({ saved: true, message: 'New message added ✓' });
  });

  // Known codes are now explained (audit3-ui-u11); an unmapped code still
  // shows as itself, so this case reads exactly as before.
  it('a guard block with an unmapped code reads exactly as before', () => {
    expect(templateSaveOutcome({ ok: false, blocked: ['PRICE_MISMATCH'], error: 'x' }, 'update'))
      .toEqual({ saved: false, message: 'Blocked: PRICE_MISMATCH' });
    expect(templateSaveOutcome({ ok: false, blocked: ['PRICE_MISMATCH'] }, 'add').saved).toBe(false);
  });

  it('a server refusal (bad(): {error} with no ok) is not a save', () => {
    const o = templateSaveOutcome({ error: 'template too long' }, 'update');
    expect(o.saved).toBe(false);
    expect(o.message).toBe('❌ Not saved: template too long');
  });

  it('a dropped connection or non-JSON body is not a save', () => {
    expect(templateSaveOutcome({ ok: false, error: 'Could not reach the server. Nothing was sent.' }, 'add'))
      .toEqual({ saved: false, message: '❌ Not saved: Could not reach the server. Nothing was sent.' });
    expect(templateSaveOutcome({}, 'update')).toEqual({ saved: false, message: '❌ Not saved: connection problem, try again' });
    expect(templateSaveOutcome(undefined, 'update').saved).toBe(false);
  });

  it('an unhandled 500 shows the server wording', () => {
    expect(templateSaveOutcome({ ok: false, error: 'action failed' }, 'update').message).toBe('❌ Not saved: action failed');
  });

  it('an update on a row the Library no longer has (ok but version null) is not a save', () => {
    const o = templateSaveOutcome({ ok: true, version: null }, 'update');
    expect(o.saved).toBe(false);
    expect(o.message).toMatch(/no longer in the Library/);
    // add_template never carries a version, so null there is fine
    expect(templateSaveOutcome({ ok: true, version: null }, 'add').saved).toBe(true);
  });
});

describe('Dashboard wiring', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/will/Dashboard.tsx'), 'utf8');
  it('both Library save handlers branch on templateSaveOutcome and only close on a confirmed save', () => {
    // templateSaveOutcome's optional third argument (audit3 sched, 5 Sep)
    // lets a Meta-backed row's save toast say to update WhatsApp Manager too.
    expect(src).toMatch(/action: 'update_template'[\s\S]{0,300}templateSaveOutcome\(r, 'update'(?:, [^)]+)?\)[\s\S]{0,120}if \(!o\.saved\) return;\s*setTpl\(null\)/);
    expect(src).toMatch(/action: 'add_template'[\s\S]{0,300}templateSaveOutcome\(r, 'add'\)[\s\S]{0,120}if \(!o\.saved\) return;\s*setNewTpl\(null\)/);
    // the old unconditional success line is gone from the handlers
    expect(src.match(/say\('Saved, live for all new conversations ✓'\); setTpl\(null\)/)).toBeNull();
    expect(src.match(/say\('New message added ✓'\); setNewTpl\(null\)/)).toBeNull();
  });
});
