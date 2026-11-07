// ============================================================
// Student Visa Tax enquiries on the shared WhatsApp number (Jo, 5 to 6 Nov 2026)
//
// Until Student Visa Tax has its own WhatsApp number, its site sends people to
// the business number Will answers. Every SVT site link prefills a message that
// names "Student Visa Tax" (src/lib/svt/brand-public.ts, svtWhatsappUrl), so the
// chat can be recognised.
//
// Will must not answer those chats: it would reply as the other brand, with the
// working holiday rules, to an international student. So a conversation where
// the customer has written "Student Visa Tax" is handed to a person (a task with
// no suggested reply), and nothing automated is sent in it afterwards: no
// auto-reply, no follow-up, no win-back. A person replies from the CRM.
//
// Only applies to conversations on the shared number (brand 'wht'). Once SVT has
// its own number its chats arrive with brand 'svt' and this never fires.
// ============================================================

import type { MessageRow } from './store';

const MARKER = /student\s*visa\s*tax/i;

/** True when this text was written by someone who came from the SVT site. */
export function isSvtEnquiry(text: string | null | undefined): boolean {
  return !!text && MARKER.test(text);
}

/** True when any message the customer has written in this chat names SVT. */
export function conversationIsSvt(msgs: ReadonlyArray<Pick<MessageRow, 'direction' | 'body'>>): boolean {
  return msgs.some((m) => m.direction === 'IN' && isSvtEnquiry(m.body));
}

/** The task reason. Kept as one constant so handoff-reasons.ts matches it. */
export const SVT_ENQUIRY_REASON = 'Student Visa Tax enquiry on the shared WhatsApp number, needs a person to reply';
