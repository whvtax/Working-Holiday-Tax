/**
 * Jo, 20 Nov: Will and Mia are the same screen (Pipeline, Chats, Follow-ups),
 * each with its own customers and colour; Control holds everything else for
 * both brands; each brand has its own pause.
 */
import fs from 'fs';
import path from 'path';

const settings: Record<string, unknown> = {};
const store = { getSetting: async (k: string) => settings[k] ?? null };

import { brandPaused, pauseSettingFor } from '../pause';
import { brandParam, rowBrand } from '../brand-param';

const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), 'utf8');

beforeEach(() => { for (const k of Object.keys(settings)) delete settings[k]; });

describe('pause per brand', () => {
  it('Pause Will stops only Will, Pause Mia only Mia, Pause all both', async () => {
    settings.will_paused = true;
    expect(await brandPaused(store, 'wht')).toBe(true);
    expect(await brandPaused(store, 'svt')).toBe(false);
    delete settings.will_paused; settings.mia_paused = true;
    expect(await brandPaused(store, 'wht')).toBe(false);
    expect(await brandPaused(store, 'svt')).toBe(true);
    delete settings.mia_paused; settings.kill_switch = true;
    expect(await brandPaused(store, 'wht')).toBe(true);
    expect(await brandPaused(store, 'svt')).toBe(true);
    expect(pauseSettingFor('svt')).toBe('mia_paused');
  });
  it('the service reads the per-brand pause, never the bare kill switch', () => {
    const src = read('src/lib/will/service.ts');
    expect(src).not.toMatch(/getSetting\('kill_switch'\)\)\s*[!=]==/);
    expect(src).toMatch(/pausedNow\(store\)/);
  });
  it('the scheduler leaves a paused brand\'s jobs scheduled', () => {
    const src = read('src/lib/will/scheduler.ts');
    expect(src).toMatch(/j\.customerId && paused\[await brandOf\(j\)\] \? null : j/);
  });
});

describe('brand param', () => {
  it('reads wht or svt, anything else is both', () => {
    expect(brandParam(new Request('https://x/api?brand=svt'))).toBe('svt');
    expect(brandParam(new Request('https://x/api?brand=wht'))).toBe('wht');
    expect(brandParam(new Request('https://x/api?brand=x'))).toBeUndefined();
    expect(brandParam()).toBeUndefined();
    expect(rowBrand({ brand: null })).toBe('wht');
  });
  it('every dashboard read takes the brand', () => {
    for (const r of ['state', 'followups', 'morning']) {
      expect(read(`src/app/api/will/${r}/route.ts`)).toMatch(/brandParam\(req\)/);
    }
  });
});

describe('screens', () => {
  const dash = read('src/components/will/Dashboard.tsx');
  it('Will and Mia show Pipeline, Chats and Follow-ups only; Control the rest', () => {
    expect(dash).toContain("wht: ['pipeline', 'chats', 'followups'],");
    expect(dash).toContain("svt: ['pipeline', 'chats', 'followups'],");
    expect(dash).toContain("control: ['pipeline', 'tasks', 'chats', 'library', 'templates', 'learning', 'insights'],");
  });
  it('Mia is the same screen in Mia\'s colour, Control its own page', () => {
    expect(read('src/app/(site)/(admin)/mia/page.tsx')).toContain('<ClientOnly scope="svt" />');
    expect(read('src/app/(site)/(admin)/mia/page.tsx')).toContain('mia-theme');
    expect(read('src/app/(site)/(admin)/control/page.tsx')).toContain('<ClientOnly scope="control" />');
  });
  it('the reports are in Control only, split by brand', () => {
    expect(dash).toMatch(/scope === 'control' && <MorningReport brand=/);
  });
  it('Atlas links to Control', () => {
    expect(read('src/components/atlas/AtlasCentre.tsx')).toContain('href="/control"');
  });
});

describe('Control: reports and tasks split by brand (Jo, 20 Nov)', () => {
  it('system report and follow-up results take ?brand=', () => {
    const sys = read('src/app/api/will/system/route.ts');
    expect(sys).toMatch(/export async function GET\(req\?: Request\)/);
    expect(sys).toMatch(/brandParam\(req\)/);
    expect(sys).toMatch(/reviewConversion\(asksScoped\)/);
    expect(sys).toMatch(/ledgerRows\.filter\(\(r\) => inBrand\(r\.customerId\)\)/);
    const fu = read('src/app/api/will/followup-stats/route.ts');
    expect(fu).toMatch(/brandParam\(req\)/);
  });
  it('Control has brand buttons on Tasks and System, and a Will/Mia tag on each task', () => {
    const d = read('src/components/will/Dashboard.tsx');
    expect((d.match(/\{brandChips\(\)\}/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect(d).toMatch(/brandTag\(custById\(t\.customerId\)\?\.brand\)/);
    expect(d).toMatch(/\/api\/will\/system\$\{brandQ/);
    expect(d).toMatch(/<FollowUpStatsCard brand=/);
  });
});

describe('10-agent review fixes (Jo, 20 Nov)', () => {
  it('every dashboard action runs as the customer\'s brand', () => {
    const a = read('src/app/api/will/actions/route.ts');
    expect(a).toMatch(/return withBrand\(actionBrand, \(\) => dispatchAction\(req, store, b\)\)/);
    expect(a).toMatch(/customer\.brand === 'svt'\s*\? await reviewLink\(store, 'svt'\)/);
  });
  it('a paused brand cannot starve the other, and the repair sweep honours the pause', () => {
    const s = read('src/lib/will/scheduler.ts');
    expect(s).toMatch(/store\.dueJobs\(new Date\(\), DUE_JOBS_BATCH \* 20\)/);
    expect(s).toMatch(/\.slice\(0, DUE_JOBS_BATCH\)/);
    expect(s).toMatch(/brandStopped\.get\(cb\) === true/);
    expect(s).toMatch(/withBrand\('wht', \(\) => runRepairSweep\(store\)\)/);
  });
  it('Mia\'s templates are checked in Mia\'s own WhatsApp account', () => {
    const c = read('src/lib/will/channel.ts');
    expect(c).toMatch(/verifyTemplates\(currentBrand\(\)\)/);
    expect(c).toMatch(/SVT_WHATSAPP_WABA_ID/);
  });
  it('a task raised on Mia\'s line with no customer yet lands on Mia\'s side', async () => {
    const { orphanTaskBrand, MIA_TASK_MARK } = await import('../brand-param');
    expect(orphanTaskBrand({ customerName: MIA_TASK_MARK + '+61 4…' })).toBe('svt');
    expect(orphanTaskBrand({ customerName: 'Sam' })).toBe('wht');
    expect(orphanTaskBrand({})).toBe('wht');
  });
  it('search and chat threads are scoped by brand on the server', () => {
    expect(read('src/app/api/will/search/route.ts')).toMatch(/brandParam\(req\)/);
    expect(read('src/app/api/will/messages/route.ts')).toMatch(/rowBrand\(c\) !== brand/);
  });
  it('Atlas shows Will\'s and Mia\'s own counts', () => {
    expect(read('src/lib/atlas/atlas-view.ts')).toMatch(/willR\.handledByWill/);
    expect(read('src/lib/atlas/load-report.ts')).toMatch(/byBrand = \{ wht: forBrand\('wht'\), svt: forBrand\('svt'\) \}/);
  });
});
