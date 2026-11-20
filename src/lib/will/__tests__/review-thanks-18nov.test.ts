/** Jo, 18 Nov: after the refund check-in and the review ask, a "yes, thank
 *  you so much" never gets a "You're very welcome" from Will. */
import fs from 'fs';
import path from 'path';
import { saysYesToRefundCheckin } from '@/lib/will/review-asks';
import { isPureThanks } from '@/lib/will/judgement';
import { isClosingOnly } from '@/lib/will/text-normalize';

const svc = fs.readFileSync(path.join(__dirname, '..', 'service.ts'), 'utf8');

it('a yes-with-thanks to the check-in is a yes in every language we serve', () => {
  for (const t of ['Yes thank you so much!', 'yes thanks', 'Yes it did, thank you very much 🙏', 'Sí, gracias!', 'Si, grazie mille', 'Sì, grazie!', 'Sim, obrigado!', 'Ja, danke!', 'Oui merci beaucoup', 'はい、ありがとうございます']) {
    expect(saysYesToRefundCheckin(t)).toBe(true);
  }
  expect(saysYesToRefundCheckin('Simon here')).toBe(false);
});

it('a yes-with-thanks to the check-in is answered only by the review ask (no message before it)', () => {
  expect(svc).toMatch(/\(yesToCheckin \|\| saysRefundLanded\(text\)\) && !hasQuestionOrRequest\(text\)[\s\S]{0,200}kind: 'silent'/);
});

it('a thank-you after the review ask gets no reply, in the engine and in the silence net', () => {
  expect(svc).toMatch(/rec\?\.askedAt && !hasQuestionOrRequest\(text\)[\s\S]{0,120}isPureThanks\(text\) \|\| isClosingOnly\(text\)[\s\S]{0,200}thanks_after_review_ask_noted[\s\S]{0,120}kind: 'silent'/);
  expect(svc).toMatch(/isPureThanks\(cleaned\) \|\| isClosingOnly\(cleaned\) \|\| saysLeftReview\(cleaned\)\)[\s\S]{0,160}askedAt\) return;/);
  expect(isPureThanks('Thank you so much!') || isClosingOnly('Thank you so much!')).toBe(true);
});
