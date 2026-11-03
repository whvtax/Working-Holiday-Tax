/**
 * 3 Nov 2026 (wave 2, theme: wrong language). English follow-up templates went to
 * German, Japanese, French and Korean customers, and an unknown Meta approval
 * lookup counted as approved for German. Synthetic names and chats only.
 */
import {
  planFollowUp, insideServiceWindow, otherScript, resolveOtherScript, refreshCustomerLang,
  englishToForeignReason, hasTemplateVariant, LOOKUP_DEFER_LIMIT, type FollowUpPlanInput,
} from '@/lib/will/language-30oct';
import { FOLLOWUP_MSG, followUpMessage, type FollowUpKey } from '@/lib/will/i18n';
import { APPROVED } from '@/lib/will/approved-messages';
import { FLOW_TEMPLATES } from '@/lib/will/state-machine';

const IN = (body: string) => ({ direction: 'IN' as const, author: 'CUSTOMER' as const, body, meta: {} });
const KEYS = Object.keys(FOLLOWUP_MSG) as FollowUpKey[];
const base = (o: Partial<FollowUpPlanInput>): FollowUpPlanInput => ({
  templateKey: 'fu_form_6h', sendName: 'fu_form_6h', lang: 'de', approved: true, insideWindow: false,
  paidFlow: true, libraryBody: 'Hi {{1}}, did you get a chance to look at the form yet?', ...o,
});

describe('follow-up wording table', () => {
  it('covers every step of every flow plus the price-sent nudge', () => {
    for (const k of [...Object.values(FLOW_TEMPLATES).flat(), 'fu_price_sent']) expect(KEYS).toContain(k);
  });
  it('English column equals the approved English text', () => {
    const A = APPROVED;
    expect(FOLLOWUP_MSG.fu_pre_24h.en).toBe(A.followups_pre_payment.h24);
    expect(FOLLOWUP_MSG.fu_pre_3d.en).toBe(A.followups_pre_payment.d3);
    expect(FOLLOWUP_MSG.fu_pre_7d.en).toBe(A.followups_pre_payment.d7);
    expect(FOLLOWUP_MSG.fu_price_sent.en).toBe(A.followups_pre_payment.priceSent);
    expect(FOLLOWUP_MSG.fu_price_sent.de).toBe(A.followups_pre_payment.priceSentDe);
    expect(FOLLOWUP_MSG.fu_price_sent.ja).toBe(A.followups_pre_payment.priceSentJa);
    expect(FOLLOWUP_MSG.fu_form_6h.en).toBe(A.followups_form.h6);
    expect(FOLLOWUP_MSG.fu_form_3d.en).toBe(A.followups_form.d3);
    expect(FOLLOWUP_MSG.fu_form_7d.en).toBe(A.followups_form.d7);
    expect(FOLLOWUP_MSG.fu_sig_24h.en).toBe(A.followups_signature.h24);
    expect(FOLLOWUP_MSG.fu_sig_3d.en).toBe(A.followups_signature.d3);
    expect(FOLLOWUP_MSG.fu_sig_7d.en).toBe(A.followups_signature.d7);
  });
  it('German and Japanese keep the name slot, carry no dashes, no brand rule breaks and no refund promise', () => {
    for (const k of KEYS) for (const l of ['de', 'ja'] as const) {
      const t = FOLLOWUP_MSG[k][l];
      expect(t).toContain('{{1}}');
      expect(t).not.toMatch(/[‒-―−⸺⸻﹘]/);
      expect(t).not.toMatch(/registered tax agent|AI\b|\bbot\b|KI\b|Roboter|ボット|税理士/i);
      expect(t).not.toMatch(/\$|AUD|garant/i);
    }
    for (const k of ['fu_sig_24h', 'fu_sig_3d', 'fu_sig_7d'] as const) {
      expect(FOLLOWUP_MSG[k].de).not.toMatch(/Rückerstattung|erstattung/i);
      expect(FOLLOWUP_MSG[k].ja).not.toMatch(/還付/);
    }
  });
  it('German is not English and Japanese has kana', () => {
    for (const k of KEYS) {
      expect(FOLLOWUP_MSG[k].de).not.toBe(FOLLOWUP_MSG[k].en);
      expect(FOLLOWUP_MSG[k].ja).toMatch(/[぀-ヿ]/);
    }
  });
  it('followUpMessage: null for a language with no wording, never English', () => {
    expect(followUpMessage('fu_form_6h', 'fr')).toBeNull();
    expect(followUpMessage('fu_form_6h', 'ko')).toBeNull();
    expect(followUpMessage('fu_form_6h', null)).toBe(FOLLOWUP_MSG.fu_form_6h.en);
    expect(followUpMessage('fu_form_6h', 'de')).toBe(FOLLOWUP_MSG.fu_form_6h.de);
    expect(followUpMessage('not_a_followup', 'de')).toBeNull();
  });
});

describe('planFollowUp', () => {
  it('German with an approved template: the template, German body for the CRM', () => {
    const p = planFollowUp(base({ approved: true }));
    expect(p).toEqual({ action: 'template', name: 'fu_form_6h', body: FOLLOWUP_MSG.fu_form_6h.de });
  });
  it('the 30 Oct hole: an UNKNOWN lookup for German is not approved (outside the window it waits, then stops)', () => {
    expect(planFollowUp(base({ approved: null })).action).toBe('defer');
    expect(planFollowUp(base({ approved: null, lookupDefers: LOOKUP_DEFER_LIMIT }))).toMatchObject({ action: 'skip', task: true });
  });
  it('German, template not approved, window open: German free text, never English', () => {
    const p = planFollowUp(base({ approved: false, insideWindow: true, sendName: 'fu_price_sent_de', templateKey: 'fu_price_sent' }));
    expect(p).toEqual({ action: 'text', body: FOLLOWUP_MSG.fu_price_sent.de });
  });
  it('Japanese, unknown lookup, window open: Japanese free text', () => {
    const p = planFollowUp(base({ lang: 'ja', approved: null, insideWindow: true, templateKey: 'fu_sig_24h', sendName: 'fu_sig_24h' }));
    expect(p).toEqual({ action: 'text', body: FOLLOWUP_MSG.fu_sig_24h.ja });
  });
  it('German, not approved, window closed: nothing sent; a paid customer becomes a task, a lead does not', () => {
    expect(planFollowUp(base({ approved: false }))).toMatchObject({ action: 'skip', task: true });
    expect(planFollowUp(base({ approved: false, paidFlow: false, templateKey: 'fu_pre_3d' }))).toMatchObject({ action: 'skip', task: false });
  });
  it('Korean and French: no English ever. Approved foreign template only, else a task (paid) or nothing (lead)', () => {
    for (const lang of ['ko', 'fr']) {
      for (const inside of [true, false]) {
        for (const approved of [false, null] as const) {
          const p = planFollowUp(base({ lang, approved, insideWindow: inside }));
          expect(p).toMatchObject({ action: 'skip', task: true });
          expect(p.action === 'text' || p.action === 'template').toBe(false);
        }
      }
      expect(planFollowUp(base({ lang, approved: false, paidFlow: false }))).toMatchObject({ action: 'skip', task: false });
    }
    expect(planFollowUp(base({ lang: 'fr', approved: true })).action).toBe('template');
  });
  it('Chinese / Vietnamese: nothing', () => {
    expect(planFollowUp(base({ lang: 'en', unsupported: 'zh', approved: true }))).toMatchObject({ action: 'skip' });
  });
  it('English customers are unchanged', () => {
    expect(planFollowUp(base({ lang: 'en', approved: true })).action).toBe('template');
    expect(planFollowUp(base({ lang: null, approved: null })).action).toBe('template');
    expect(planFollowUp(base({ lang: 'en', approved: false }))).toMatchObject({ action: 'skip' });
  });
  it('whatever the language and the Meta answer, an English body never comes back for a non English customer', () => {
    const HELD = ['de', 'ja', 'fr', 'ko', 'it', 'es'];
    for (const key of KEYS) for (const lang of HELD) for (const approved of [true, false, null] as const) for (const insideWindow of [true, false]) {
      const p = planFollowUp(base({ templateKey: key, sendName: key, lang, approved, insideWindow, libraryBody: FOLLOWUP_MSG[key].en }));
      if (p.action === 'text') expect(p.body).not.toBe(FOLLOWUP_MSG[key].en);
      if (p.action === 'text') expect(['de', 'ja']).toContain(lang);
    }
  });
});

describe('service window', () => {
  const now = Date.UTC(2026, 10, 3, 12, 0);
  it('open inside 24h only', () => {
    expect(insideServiceWindow(new Date(now - 3600_000).toISOString(), now)).toBe(true);
    expect(insideServiceWindow(new Date(now - 25 * 3600_000).toISOString(), now)).toBe(false);
    expect(insideServiceWindow(null, now)).toBe(false);
    expect(insideServiceWindow('garbage', now)).toBe(false);
  });
});

describe('script-only languages (Korean and others)', () => {
  it('reads Hangul, Thai, Arabic, Cyrillic; Japanese kana never counts', () => {
    expect(otherScript('안녕하세요 세금 환급 문의드립니다')).toBe('ko');
    expect(otherScript('สวัสดีครับ')).toBe('th');
    expect(otherScript('مرحبا')).toBe('ar');
    expect(otherScript('Здравствуйте')).toBe('ru');
    expect(otherScript('こんにちは 한')).toBeNull();
    expect(otherScript('Hello there')).toBeNull();
  });
  it('uses the latest customer message and ignores the website form text', () => {
    expect(resolveOtherScript([IN('안녕하세요'), IN("Hi! I've just sent through my form 😊")] as never)).toBe('ko');
    expect(resolveOtherScript([IN('안녕하세요'), IN('Thanks, I will send it tomorrow')] as never)).toBeNull();
  });
  it('refreshCustomerLang stores ko once, so the English guards refuse English afterwards', async () => {
    const store = {
      listMessages: jest.fn(async () => [IN('안녕하세요, 세금 환급 문의드립니다')]),
      updateCustomer: jest.fn().mockResolvedValue(undefined),
      audit: jest.fn().mockResolvedValue(undefined),
    };
    const r = await refreshCustomerLang(store as never, { id: 'c1', lang: 'en' });
    expect(r).toMatchObject({ lang: 'ko', changed: true });
    expect(store.updateCustomer).toHaveBeenCalledWith('c1', { lang: 'ko' });
    store.updateCustomer.mockClear();
    expect((await refreshCustomerLang(store as never, { id: 'c1', lang: 'ko' })).changed).toBe(false);
    expect(store.updateCustomer).not.toHaveBeenCalled();
    expect(hasTemplateVariant('ko')).toBe(false);
    expect(englishToForeignReason('ko', null, 'Hi Sam, did you get a chance to look at the form yet? Please let me know.')).toMatch(/English/);
  });
});
