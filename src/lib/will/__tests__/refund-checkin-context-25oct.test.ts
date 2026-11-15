/** Jo, 25 Oct (Lauren, +44 7472): "My tax return has come through. Is there a
 *  link I can leave you a review?", the team sent the link, and two days later
 *  the check-in still asked "has your refund landed yet?". */
import fs from 'fs';
import path from 'path';
import { saysRefundLanded, checkinAlreadyAnswered } from '@/lib/will/review-asks';

const lodged = '2026-10-15T08:00:00.000Z';
const m = (direction: 'IN' | 'OUT', body: string, createdAt: string) => ({ direction, status: 'SENT', body, createdAt });

it('"my tax return has come through" means the refund landed', () => {
  expect(saysRefundLanded('Thank you so much! My tax return has come through. Is there a link I can leave you a review? ☺️')).toBe(true);
  expect(saysRefundLanded('When will my tax return come through?')).toBe(false);
});

it('the check-in is not needed once the refund landed or the review link went out', () => {
  expect(checkinAlreadyAnswered([
    m('IN', 'Thank you so much! My tax return has come through. Is there a link I can leave you a review?', '2026-10-23T00:17:00.000Z'),
  ], lodged)?.why).toBe('refund_landed');
  expect(checkinAlreadyAnswered([
    m('OUT', 'https://maps.app.goo.gl/ukWWESHD3WczYWwY9?g_st=ic', '2026-10-23T06:54:00.000Z'),
  ], lodged)).toEqual({ why: 'review_link_sent', at: '2026-10-23T06:54:00.000Z' });
  expect(checkinAlreadyAnswered([m('IN', 'Where can I leave a review?', '2026-10-20T00:00:00.000Z')], lodged)?.why).toBe('asked_for_review');
  // Before lodgement does not count, and an ordinary chat still gets the check-in.
  expect(checkinAlreadyAnswered([m('IN', 'I got my refund last year', '2026-10-01T00:00:00.000Z')], lodged)).toBeNull();
  expect(checkinAlreadyAnswered([m('IN', 'Thanks!', '2026-10-20T00:00:00.000Z')], lodged)).toBeNull();
});

it('the scheduler reads the chat before the check-in, and "it landed" cancels the check-in', () => {
  const s = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/scheduler.ts'), 'utf8');
  expect(s).toContain('const done = checkinAlreadyAnswered(await store.listMessages(c.id), lodgedAt);');
  expect(s).toContain("'refund_checkin_not_needed'");
  const svc = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/service.ts'), 'utf8');
  expect(svc).toContain("await store.cancelJobsFor(customer.id, ['REVIEW_REQUEST', 'REFUND_CHECKIN'])");
});
