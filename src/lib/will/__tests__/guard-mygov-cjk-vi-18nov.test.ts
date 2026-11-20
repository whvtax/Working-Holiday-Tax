/**
 * Verification, 18 Nov (decision 018): myGov / ATO walkthroughs must be refused in every one of
 * the nine languages, as in English. The Japanese step cues sat behind an ASCII \b, which never
 * fires between two Japanese characters, so "myGovにログインして…" passed; Chinese and Vietnamese
 * had no step cues at all. The approved reassurance ("you never need to log in") still passes in
 * every language, and so does every fixed text the code sends.
 */
import { policyGuard } from '@/lib/will/policy-guard';
import { withMygovReassurance } from '@/lib/will/instant-choice';
import { LANGS } from '@/lib/will/i18n';

const ctx = {
  state: 'PRICE_SENT' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
  lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null, customerText: 'myGov?',
};

const STEPS: Record<string, string> = {
  ja: 'myGovにログインして、税金のタブをクリックしてください。',
  zh: '登录 myGov，然后点击税务。',
  vi: 'Bạn đăng nhập myGov rồi bấm vào mục thuế.',
  de: 'Melde dich bei myGov an und klicke auf Steuern.',
  es: 'Inicia sesión en myGov y haz clic en impuestos.',
};

describe('myGov step instructions are refused in Japanese, Chinese and Vietnamese too', () => {
  for (const [lang, text] of Object.entries(STEPS)) {
    it(lang, () => {
      expect(policyGuard(text, ctx).violations).toContain('MYGOV_TROUBLESHOOTING');
    });
  }
});

describe('the approved myGov reassurance still passes in every language', () => {
  for (const lang of LANGS) {
    it(lang, () => {
      const line = withMygovReassurance('', ['how do I link myGov?'], lang).trim();
      expect(line.length).toBeGreaterThan(0);
      expect(policyGuard(line, ctx).violations).not.toContain('MYGOV_TROUBLESHOOTING');
    });
  }
});

describe('free reassurance in Chinese and Vietnamese is not read as a step', () => {
  it.each([
    ['zh', '你不需要登录 myGov，我们会直接和 ATO 处理。'],
    ['vi', 'Bạn không cần đăng nhập myGov, bên mình làm việc trực tiếp với ATO.'],
    ['ja', 'myGovにログインする必要はありません。'],
  ])('%s', (_l, text) => {
    expect(policyGuard(text, ctx).violations).not.toContain('MYGOV_TROUBLESHOOTING');
  });
});
