// Demo data for Phase 1 (DEMO_MODE). Replaced by Supabase queries in Phase 2+.
import { CustomerState } from './state-machine';

export interface DemoCustomer {
  name: string; flag: string; state: CustomerState; inc: 'UNKNOWN' | 'TFN' | 'TFN_ABN';
  time: string; msg?: string; unread?: boolean; stuck?: boolean;
}

export const demoCustomers: DemoCustomer[] = [
  { name: 'Luca Moretti', flag: '🇮🇹', state: 'NEW_LEAD', inc: 'UNKNOWN', time: '12m', msg: 'Hi, do you help with tax returns?', unread: true },
  { name: 'Yuki Tanaka', flag: '🇯🇵', state: 'NEW_LEAD', inc: 'UNKNOWN', time: '48m', msg: 'A friend recommended you 😊', unread: true },
  { name: 'Sofia Herrera', flag: '🇦🇷', state: 'QUALIFIED', inc: 'TFN', time: '2h', msg: 'Only TFN, I worked on farms' },
  { name: 'Tom Berger', flag: '🇩🇪', state: 'QUALIFIED', inc: 'TFN_ABN', time: '3h', msg: 'I also did some delivery work on ABN' },
  { name: 'Marie Dubois', flag: '🇫🇷', state: 'PRICE_SENT', inc: 'TFN', time: '1h', msg: 'Ok I will think about it', unread: true },
  { name: "Jack O'Neill", flag: '🇮🇪', state: 'PRICE_SENT', inc: 'TFN_ABN', time: '26h', msg: 'Why do I pay before the estimate?', stuck: true },
  { name: 'Nina Larsen', flag: '🇸🇪', state: 'PAYMENT_PENDING', inc: 'TFN', time: '4h', msg: 'Transferring tonight 👍' },
  { name: 'Diego Silva', flag: '🇧🇷', state: 'PAYMENT_PENDING', inc: 'TFN', time: '2d', stuck: true },
  { name: 'Emma Fischer', flag: '🇩🇪', state: 'FORM_PENDING', inc: 'TFN', time: '2h', msg: 'Just paid! ✅', unread: true },
  { name: 'Liam Walsh', flag: '🇬🇧', state: 'FORM_PENDING', inc: 'TFN_ABN', time: '9h', msg: 'Will do the form tomorrow' },
  { name: 'Noa Cohen', flag: '🇮🇱', state: 'FORM_COMPLETE', inc: 'TFN', time: '5h', msg: 'Sent everything 🙏' },
  { name: 'Chloe Martin', flag: '🇫🇷', state: 'DOCUMENTS_COMPLETE', inc: 'TFN', time: '1h', msg: 'Here is the receipt photo' },
  { name: 'Felipe Rojas', flag: '🇨🇱', state: 'UNDER_REVIEW', inc: 'TFN_ABN', time: '22h' },
  { name: 'Anna Kowalska', flag: '🇵🇱', state: 'UNDER_REVIEW', inc: 'TFN', time: '6h' },
  { name: 'Ben Taylor', flag: '🇬🇧', state: 'ESTIMATE_READY', inc: 'TFN', time: '30m', msg: 'That sounds great!!' },
  { name: 'Mia Jensen', flag: '🇩🇰', state: 'FINAL_REVIEW', inc: 'TFN', time: '3h' },
  { name: 'Sara Rossi', flag: '🇮🇹', state: 'SIGNATURE_PENDING', inc: 'TFN', time: '1d', msg: 'I have one question first', unread: true },
  { name: 'Kenji Sato', flag: '🇯🇵', state: 'SIGNED', inc: 'TFN', time: '2h', msg: 'Signed and sent back ✍️' },
  { name: 'Lena Weber', flag: '🇩🇪', state: 'LODGED', inc: 'TFN_ABN', time: '1d', msg: 'Thank you so much!! 🎉' },
  { name: 'Oliver Brown', flag: '🇬🇧', state: 'COMPLETED', inc: 'TFN', time: '6d', msg: 'Left you a Google review ⭐' },
  { name: 'Emily White', flag: '🇬🇧', state: 'COMPLETED', inc: 'TFN', time: '12d' },
  { name: 'Hugo Petit', flag: '🇫🇷', state: 'WENT_COLD', inc: 'TFN', time: '21d' },
  { name: 'Marco Bianchi', flag: '🇮🇹', state: 'NOT_INTERESTED', inc: 'TFN', time: '9d', msg: 'I will do it myself, thanks' },
  { name: 'Unknown', flag: '🌐', state: 'NOT_RELEVANT', inc: 'UNKNOWN', time: '15d', msg: 'Do you sell car parts?' },
];

export const fee = (c: DemoCustomer) => (c.inc === 'TFN_ABN' ? '$385' : c.inc === 'TFN' ? '$220' : null);
export const incLabel = (c: DemoCustomer) => (c.inc === 'TFN_ABN' ? 'TFN+ABN' : c.inc === 'TFN' ? 'TFN' : '?');

export const demoChatItems = [
  { f: '🇩🇪', n: 'Emma Fischer', m: '✨ Draft waiting for approval', t: 'now', s: 'Form Pending', c: '#5a92d8', sel: true },
  { f: '🇮🇹', n: 'Luca Moretti', m: 'Hi, do you help with tax returns?', t: '12m', s: 'New Lead', c: '#c69337' },
  { f: '🇮🇪', n: "Jack O'Neill", m: 'Why do I pay before the estimate?', t: '1h', s: 'Price Sent', c: '#c69337' },
  { f: '🇮🇹', n: 'Sara Rossi', m: 'I have one question first', t: '3h', s: 'Signature', c: '#3aa89b' },
  { f: '🇬🇧', n: 'Ben Taylor', m: 'That sounds great!!', t: '5h', s: 'Estimate', c: '#8a7cd0' },
  { f: '🇩🇪', n: 'Lena Weber', m: 'Thank you so much!! 🎉', t: '1d', s: 'Lodged', c: '#3aa89b' },
];

export type ConvItem =
  | { kind: 'day'; label: string }
  | { kind: 'sys'; text: string }
  | { kind: 'msg'; in?: boolean; ai?: boolean; text: string; time: string; isNew?: boolean };

export const demoConv: ConvItem[] = [
  { kind: 'day', label: 'Yesterday' },
  { kind: 'msg', in: true, text: 'Hi! How much do you charge for a tax return?', time: '18:02' },
  { kind: 'msg', ai: true, text: 'Hey! 😊 We help hundreds of backpackers every year get their Australian tax sorted properly.\nQuick question first: did you only work on a TFN, or did you also earn income through an ABN?', time: '18:03' },
  { kind: 'msg', in: true, text: 'Only TFN, I worked in hospitality in Sydney', time: '18:05' },
  { kind: 'msg', ai: true, text: "Perfect 😊 You'll get personal guidance and support from our team from start to finish, with everything reviewed properly for your situation. The total fee is $220.\nIf your refund is less than our fee, we'll refund the difference, so you're never out of pocket.", time: '18:06' },
  { kind: 'day', label: 'Today' },
  { kind: 'msg', in: true, text: 'Just paid! ✅', time: '09:41' },
  { kind: 'sys', text: 'State changed: Payment Pending → Paid · sales flow stopped' },
  { kind: 'msg', ai: true, text: 'Perfect, payment received! 🎉\nPlease fill out this quick form so we can start reviewing your situation: workingholidaytax.com.au/tax-form', time: '09:42' },
];

export const demoDraft = "Hey Emma! Just checking in 😊 We haven't received your form yet. Once you submit it, we can start reviewing your tax situation: workingholidaytax.com.au/tax-form";

export const demoTasks = [
  { sev: 'URGENT', color: '#d65959', icon: '💸', title: 'Refund request', who: '🇫🇷 Marie Dubois · Price Sent · 14 min ago', ctx: '"Actually I changed my mind, can I get my money back? I found someone cheaper."', note: 'AI paused the conversation. Refunds always require you.' },
  { sev: 'REVIEW', color: '#b56a00', icon: '📄', title: 'Document unclear', who: '🇮🇱 Noa Cohen · Form Complete · 1h ago', ctx: 'Uploaded receipt photo is blurry. AI could not verify the amount and asked once for a clearer copy. Second photo still unreadable.', note: '' },
  { sev: 'CONFLICT', color: '#b56a00', icon: '⚠️', title: 'Payment claim mismatch', who: '🇧🇷 Diego Silva · Payment Pending · 3h ago', ctx: '"I transferred the $220 on Monday", but no matching transfer found in reported payments. AI stopped, did not guess.', note: '' },
];

export const demoLibrary = [
  { cat: 'Opening & Qualification', items: [
    { n: 'Opening message', v: 'Hey! 😊 We help hundreds of backpackers every year get their Australian tax sorted properly…', ed: '2d ago' },
  ]},
  { cat: 'Pricing', items: [
    { n: 'Price: TFN only ($220)', v: "Perfect 😊 You'll get personal guidance and support from our team from start to finish… The total fee is $220.", ed: '2d ago' },
    { n: 'Price: TFN + ABN ($385)', v: "Since you also have ABN income, you'll get personal guidance for both… The total fee is $385.", ed: '1w ago' },
  ]},
  { cat: 'Objections · 14', items: [
    { n: '#1 Refund amount before paying', v: 'Absolutely 😊 Working out your expected refund is part of the review…', ed: '3d ago' },
    { n: '#4 "I\'ll just use myGov"', v: 'Yes, absolutely, you can lodge yourself through myGov. The difference is…', ed: '1w ago' },
    { n: '#5 "Too expensive"', v: 'I understand. The fee covers the full review and personal guidance…', ed: '2w ago' },
    { n: '#9 "What if no refund?"', v: "No problem. If your refund is less than our service fee, we'll refund the difference…", ed: '2w ago' },
  ]},
  { cat: 'Follow-ups', items: [
    { n: 'Pre-payment · 24h / 3d / 7d', v: 'Hey! Just checking in. Did you still want us to go through your tax situation?', ed: '5d ago', tpl: true },
    { n: 'Form · 6h / 3d / 7d', v: "Hey! Just checking in. We haven't received your form yet…", ed: '5d ago', tpl: true },
    { n: 'Signature · 24h / 3d / 7d', v: 'Hey! Just checking in. Your tax return is ready for review and signature…', ed: '1w ago', tpl: true },
  ]},
  { cat: 'Post-payment & Service', items: [
    { n: 'Payment received + form link', v: 'Perfect, payment received! 🎉 Please fill out this quick form…', ed: '2d ago' },
    { n: 'Medicare exemption guide', v: "Hey! Since you weren't covered by Medicare, you can apply for a Medicare Levy Exemption…", ed: '3w ago' },
    { n: 'Estimate ready', v: "We've now gone through all your details… your estimated tax refund is $[amount].", ed: '3w ago' },
    { n: 'Lodged + Google review', v: 'Your tax return has been lodged successfully! 🎉 Refund within 14 business days…', ed: '3w ago' },
  ]},
  { cat: 'FAQ · Operational', items: [
    { n: 'How long does it take?', v: 'Once we have everything, the review usually takes 24 hours, and the ATO…', ed: '4d ago' },
    { n: 'Is this legit / registered?', v: 'Yes, absolutely! We operate under the supervision of a registered tax agent…', ed: '1mo ago' },
  ]},
];
