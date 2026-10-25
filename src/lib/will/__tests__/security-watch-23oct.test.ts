/** Jo, 23 Oct: "how do I know nobody broke into the site or the systems?" */
const settings = new Map<string, unknown>();
const audits: { actor: string; action: string; detail: unknown }[] = [];
let templates: { key: string; title: string; body: string }[] = [];
const store = {
  getSetting: async (k: string) => settings.get(k),
  setSetting: async (k: string, v: unknown) => { settings.set(k, v); },
  audit: async (actor: string, action: string, detail: unknown) => { audits.push({ actor, action, detail }); },
  listTemplates: async () => templates,
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));

import fs from 'fs';
import path from 'path';
import { describeDevice, maskIp, foreignBankNumbers, checkBankDetails, checkNewDevice, recordLoginEvent, type RequestInfo } from '@/lib/security-watch';
import { buildMorningReport } from '@/lib/will/morning-report';
import { explainHandoffReason } from '@/lib/will/handoff-reasons';

beforeEach(() => { settings.clear(); audits.length = 0; templates = []; });

const mac: RequestInfo = { ip: '1.2.3.x', country: 'AU', city: 'Sydney', device: 'Chrome on macOS' };

it('names the device and hides the end of the IP', () => {
  expect(describeDevice('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit Version/17.0 Mobile Safari/604.1')).toBe('Safari on iPhone');
  expect(describeDevice('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit Chrome/129.0 Safari/537.36')).toBe('Chrome on macOS');
  expect(describeDevice('Mozilla/5.0 (Windows NT 10.0) Chrome/129.0 Safari/537.36 Edg/129.0')).toBe('Edge on Windows');
  expect(describeDevice(null)).toBe('unknown browser on unknown system');
  expect(maskIp('203.45.67.89')).toBe('203.45.67.x');
  expect(maskIp('')).toBe('unknown');
});

it('records every login step under actor auth', async () => {
  await recordLoginEvent('password_failed', mac);
  expect(audits[0]).toEqual({ actor: 'auth', action: 'crm_password_failed', detail: mac });
});

it('first login is remembered quietly; a new device later emails Jo; a known one does not', async () => {
  const send = jest.fn(async () => {});
  expect(await checkNewDevice(mac, send)).toBe(true);
  expect(send).not.toHaveBeenCalled();
  expect(await checkNewDevice(mac, send)).toBe(false);
  expect(send).not.toHaveBeenCalled();
  expect(await checkNewDevice({ ...mac, device: 'Chrome on Windows', country: 'RU', city: 'Moscow' }, send)).toBe(true);
  expect(send).toHaveBeenCalledTimes(1);
  const [subject, html] = (send.mock.calls[0] as unknown) as [string, string];
  expect(subject).toBe('New login to your CRM');
  expect(html).toContain('Chrome on Windows, Moscow, RU');
  expect(html).toContain('CRM_PASSWORD');
  expect(audits.filter((a) => a.action === 'crm_new_device')).toHaveLength(2);
});

it('spots bank numbers that are not ours, in any form', () => {
  expect(foreignBankNumbers('BSB: 062-692\nAccount number: 8104 9952')).toEqual([]);
  expect(foreignBankNumbers('BSB 012-345 Account: 98765432')).toEqual(['BSB 012-345', 'account 98765432']);
  expect(foreignBankNumbers('口座番号: 11223344')).toEqual(['account 11223344']);
  expect(foreignBankNumbers('Your refund is $1,200')).toEqual([]);
});

it('nightly check passes on our details and fails on a changed setting or Library message', async () => {
  settings.set('bank_details', { bsb: '062-692', account: '81049952' });
  templates = [{ key: 'price_tfn', title: 'Price', body: 'BSB: 062-692\nAccount: 81049952' }];
  expect(await checkBankDetails()).toEqual({ ok: true, problems: [] });
  settings.set('bank_details', { bsb: '111-222', account: '81049952' });
  templates.push({ key: 'evil', title: 'Payment', body: 'BSB 999-888 Account 12345678' });
  const r = await checkBankDetails();
  expect(r.ok).toBe(false);
  expect(r.problems).toEqual([
    'the saved BSB is 111-222, not 062-692',
    'Library "Payment" contains BSB 999-888',
    'Library "Payment" contains account 12345678',
  ]);
});

it('the bank task is classified, the nightly runs the check and both login routes record', () => {
  expect(explainHandoffReason('Bank details do not match ours: the saved BSB is 1').label).toBe('Bank details changed');
  const sched = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/scheduler.ts'), 'utf8');
  expect(sched).toContain("store.audit('nightly', 'bank_details_mismatch'");
  const login = fs.readFileSync(path.join(process.cwd(), 'src/app/api/crm/login/route.ts'), 'utf8');
  for (const e of ['locked_out', 'password_failed', 'password_ok']) expect(login).toContain(`'${e}'`);
  const otp = fs.readFileSync(path.join(process.cwd(), 'src/app/api/crm/verify-otp/route.ts'), 'utf8');
  for (const e of ['otp_failed', 'otp_ok', 'otp_too_many']) expect(otp).toContain(`'${e}'`);
  expect(otp).toContain('checkNewDevice(info, sendSecurityEmail)');
});

it('the morning report shows CRM logins, failures and new devices from the last 24 hours', () => {
  const now = Date.parse('2026-10-23T08:00:00+11:00');
  const h = (n: number) => new Date(now - n * 3600_000).toISOString();
  const r = buildMorningReport({
    now, customers: [], messages: [], tasks: [], history: [],
    auth: [
      { id: '1', actor: 'auth', action: 'crm_otp_ok', detail: { ...mac }, at: h(2) },
      { id: '2', actor: 'auth', action: 'crm_password_failed', detail: { ...mac }, at: h(3) },
      { id: '3', actor: 'auth', action: 'crm_otp_failed', detail: { ...mac }, at: h(3) },
      { id: '4', actor: 'auth', action: 'crm_locked_out', detail: { ...mac }, at: h(4) },
      { id: '5', actor: 'auth', action: 'crm_new_device', detail: { ...mac, label: 'Chrome on macOS, Sydney, AU' }, at: h(2) },
      { id: '6', actor: 'auth', action: 'crm_otp_ok', detail: { ...mac }, at: h(40) },
    ],
  });
  expect(r.security.logins).toBe(1);
  expect(r.security.failed).toBe(2);
  expect(r.security.lockouts).toBe(1);
  expect(r.security.newDevices).toEqual([{ label: 'Chrome on macOS, Sydney, AU', at: h(2) }]);
  expect(r.security.recent[0]).toEqual({ at: h(2), device: 'Chrome on macOS', ip: '1.2.3.x', where: 'Sydney, AU' });
});
