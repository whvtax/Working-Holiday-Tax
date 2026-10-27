/** Final review, 27 Oct. Pins the agent details, and blocks an SVT launch with
 *  the placeholder number. The launch case runs when SVT_LAUNCH=true
 *  (`SVT_LAUNCH=true npx jest launch-gate` before turning the SVT line on). */
import { AGENT_NAME, AGENT_ABN, AGENT_TPB } from '@/lib/constants';
import { BRANDS } from '@/lib/brand';
import { SVT_LEGAL, WHT_LEGAL } from '@/lib/legal/brands';
import { brandLeaks } from '@/lib/will/brand-voice';
import { GUIDES_EN } from '@/lib/svt/content/guides-en';
import { GUIDES_ZH } from '@/lib/svt/content/guides-zh';
import { GUIDES_VI } from '@/lib/svt/content/guides-vi';

it('agent details are exactly what Jo confirmed (27 Oct)', () => {
  expect([AGENT_NAME, AGENT_ABN, AGENT_TPB]).toEqual(['The Accounting Academy Services Pty Limited', '93 671 788 355', '26233096']);
});

it('SVT content never carries a different Tax Agent Number or agent name', () => {
  const all = JSON.stringify([GUIDES_EN, GUIDES_ZH, GUIDES_VI]);
  for (const m of all.matchAll(/registrations_search\?number=(\d+)/g)) expect(m[1]).toBe(AGENT_TPB);
  for (const m of all.matchAll(/The Accounting Academy Services(?: P[a-z]+)*(?: L[a-z]+)?/g)) expect(m[0].trim()).toBe(AGENT_NAME);
});

it('legal contacts come from the brand config, so one change reaches both', () => {
  expect(SVT_LEGAL.phone).toBe(BRANDS.svt.phone);
  expect(SVT_LEGAL.email).toBe(BRANDS.svt.email);
  expect(WHT_LEGAL.phone).toBe(BRANDS.wht.phone);
});

it('the SVT number never reaches a WHT customer', () => {
  expect(brandLeaks(`call ${BRANDS.svt.phone}`, 'wht')).toContain('SVT phone');
  expect(brandLeaks(`https://wa.me/${BRANDS.svt.whatsappNumber}`, 'wht')).toContain('SVT phone');
  expect(brandLeaks(`call ${BRANDS.wht.phone}`, 'wht')).toEqual([]);
});

(process.env.SVT_LAUNCH === 'true' ? it : it.skip)('SVT launch: the WhatsApp number is real', () => {
  expect(BRANDS.svt.whatsappIsPlaceholder).toBe(false);
  expect(BRANDS.svt.phone).not.toBe('04123123123');
});
