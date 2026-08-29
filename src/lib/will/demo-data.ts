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

// Everything that used to follow here (fee, incLabel, demoChatItems, ConvItem,
// demoConv, demoDraft, demoTasks, demoLibrary) was removed on 28 Aug. Only
// `demoCustomers` is imported anywhere, by seed.ts. The demoLibrary block in
// particular had become a stale second copy of the sales script: the live one
// is approved-messages.ts, reaching the Library through seedTemplates().
