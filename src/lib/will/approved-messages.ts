// ============================================================
// Approved customer-facing messages, VERBATIM from the Master
// Build Spec (§6, §7). These seed the templates table and are
// embedded in the AI playbook. Nothing here may be reworded
// without the owner's approval (small natural adjustments by the
// AI are allowed per §8.29, but price/guarantee/policy meaning
// and tax boundaries never change).
// ============================================================

export const APPROVED = {
  // Reworded by Jo, 24 Aug. Still one emoji and still ends on the TFN or ABN
  // question, which is what the state machine keys off.
  opening: `Hey! 😊 Of course, we'd be happy to help.

We'll review your tax residency, Medicare status and any deductions you can claim.

Which country are you from, and did you only work on a TFN or did you have any other income too, like ABN?`,

  // Reworded by Jo, 24 Aug, and already live in the Message Library. The source
  // is updated to match so a fresh seed or a new environment does not put the
  // old wording back. Both messages are now spaced into blocks, "for our
  // service" is dropped from the guarantee to match the wording used on every
  // page of the website, and the account line reads "Account Number".
  price_tfn: `Perfect!

Our team will handle everything from start to finish and help maximise your tax refund.

The total fee is $220. If you get a refund and it comes to less than $220, we top up the difference, so our fee never costs you more than the refund you get back. If you owe tax instead of a refund, the $220 covers our review either way and isn't refundable.

Account Name: Simple Tax Services
BSB: 062692
Account Number: 81049952

Once paid, send us a screenshot and we'll get started.`,

  price_tfn_abn: `Perfect!

Our team will handle everything from start to finish and help maximise your tax refund.

The total fee is $385. If you get a refund and it comes to less than $385, we top up the difference, so our fee never costs you more than the refund you get back. If you owe tax instead of a refund, the $385 covers our review either way and isn't refundable.

Account Name: Simple Tax Services
BSB: 062692
Account Number: 81049952

Once paid, send us a screenshot and we'll get started.`,

  // For a customer who already lodged their return themselves (or through
  // someone else) and wants it checked/reviewed — a genuinely different
  // service from a fresh return, not a decline. Since there's no return
  // being freshly prepared, the refund guarantee doesn't apply, and that is
  // stated plainly rather than silently dropped, so the customer isn't
  // caught out later. Same bank details, same fee amounts as the normal
  // service, matched to what they mention (TFN only vs TFN + ABN).
  price_tfn_review: `No problem, we can review a return you've already lodged.

Since it's already been lodged, this is a review rather than a fresh tax return, so the refund guarantee doesn't apply here. The fee is $220 and is non-refundable.

Account Name: Simple Tax Services
BSB: 062692
Account Number: 81049952

Once paid, send us a screenshot and we'll get started.`,

  price_tfn_abn_review: `No problem, we can review a return you've already lodged.

Since it's already been lodged, this is a review rather than a fresh tax return, so the refund guarantee doesn't apply here. The fee is $385 and is non-refundable.

Account Name: Simple Tax Services
BSB: 062692
Account Number: 81049952

Once paid, send us a screenshot and we'll get started.`,

  objections: {
    o1_refund_before_pay: `Absolutely 😊 Working out your expected refund is part of the review. We need to go through your full situation first before we can give you an accurate estimate, which is why we start the review once payment is made. And if you get a refund and it comes to less than our fee, we refund you the difference, so our fee never costs you more than the refund you get back. If you owe tax instead of getting a refund, the fee covers our review either way and isn't refundable.`,
    o2_why_pay_first: `I completely understand. The reason payment comes first is that reviewing your situation and working out what you're entitled to is the main part of the service. If you get a refund and it comes to less than our fee, we refund you the difference, so our fee never costs you more than the refund you get back. If you owe tax instead of getting a refund, the fee covers our review either way and isn't refundable.`,
    o3_thought_free: `I understand. We previously offered a free eligibility check, but we've changed how the service works. We now focus on giving you a proper review and personal guidance based on your situation, rather than just a quick eligibility check. That's why the service is paid upfront, and if you get a refund and it comes to less than our fee, we refund you the difference, so our fee never costs you more than the refund you get back. If you owe tax instead of getting a refund, the fee covers our review either way and isn't refundable.`,
    o4_mygov: `Yes, absolutely, you can lodge your tax return yourself through myGov. The difference is that myGov is just where you lodge it. It won't review your situation, guide you on your tax residency, Medicare, or what you can claim, and make sure everything is correct. That's part of what we do, so you know everything has been properly reviewed and you're not left figuring it all out on your own.`,
    o5_too_expensive: `I understand. The fee covers the full review and personal guidance, so you're not left trying to work everything out on your own. And if you get a refund and it comes to less than our fee, we refund you the difference, so our fee never costs you more than the refund you get back. If you owe tax instead of getting a refund, the fee covers our review either way and isn't refundable.`,
    o6_pay_after_refund: `Payment is made upfront because the review and personal guidance are the main part of the service, and that's where our work starts. Once payment is received, we can start going through your situation properly. And if you get a refund and it comes to less than our fee, we refund you the difference, so our fee never costs you more than the refund you get back. If you owe tax instead of getting a refund, the fee covers our review either way and isn't refundable.`,
    o7_professional_question: `That's definitely something we can check for you. It depends on your individual situation, so we'd need to review your details properly before giving you an accurate answer. That's all included as part of the service once we get started.`,
    o8_simple_return: `I understand. Even with just one job, there's more to check than the income on your payslip. Your tax residency, Medicare, and what you're entitled to claim can still make a difference. Our fee is based on reviewing your situation properly and guiding you through it, not on how many jobs or payslips you've had.`,
    o9_no_refund: `No problem. If you get a refund and it comes to less than our fee, we refund you the difference. So if your refund was only $100 and our fee was $220, we'd refund you $120, so our fee never costs you more than the refund you get back. If you owe tax instead of a refund, the fee covers our review either way and isn't refundable.`,
    o10a_why_not_accountant: `Of course, you can use an accountant. The difference is that we focus specifically on Working Holiday Makers and deal with situations like yours every day. Our team knows the common issues backpackers run into, things like tax residency, Medicare, ABN income, and work-related expenses, so the whole service is built around people in your situation.`,
    o10b_found_cheaper: `No worries, I completely understand. Just make sure you're comparing the same level of service. With us, you're not just paying to submit a tax return. Your situation is properly reviewed and you get personal guidance throughout the process. If you've found someone cheaper, just make sure you know exactly what's included before you decide.`,
    o11_think_about_it: `Of course, no problem. Before you go, is there anything you're unsure about or anything you'd like me to clarify for you? Happy to answer any questions before you decide.`,
    o12_ask_partner: `Of course, no problem. If there's anything you or your partner are unsure about, just let me know and I'm happy to clarify it before you decide.`,
    o13_one_question: `Of course, if it's a general question, I'm happy to help. It depends on your individual situation, we'd need to review your details properly before giving you an accurate answer, and that's included as part of the service. What would you like to know?`,
    o14_check_eligible_first: `Yes, that's exactly what we'll check as part of your review. Eligibility can depend on your individual situation, so we need to go through your details properly before giving you an answer. That's why the review starts once payment is made, and if you get a refund and it comes to less than our fee, we refund you the difference, so our fee never costs you more than the refund you get back. If you owe tax instead of getting a refund, the fee covers our review either way and isn't refundable.`,
  },

  followups_pre_payment: {
    h24: `Hi {{1}}, still want us to take a look at your tax situation? If anything about how the review works is unclear, just ask and I'll happily explain.`,
    d3: `Hi {{1}}, the part most people miss on their own is what they're actually entitled to claim. That's exactly what our team goes through with you, and if you get a refund and it's less than the fee, we top up the difference.`,
    d7: `Hi {{1}}, last message from me 😊 If you want your tax looked at later, just text me any time.`,
  },

  payment_received: `Payment received! 🎉

Please fill out this quick form so we can start reviewing your situation:

https://workingholidaytax.com.au/tax-form

Once you've submitted it, we'll go through everything and get back to you within 24 hours.`,

  followups_form: {
    h6: `Hi {{1}}, we haven't got your form yet 😊 It only takes about 5 minutes and we can start as soon as it's in.`,
    d3: `Hi {{1}}, your review is waiting on your form. If any question in it is confusing, tell me which one and I'll walk you through it 😊`,
    d7: `Hi {{1}}, still waiting on your form to get started. Send it through whenever you can 😊`,
  },

  request_abn_detail: `Hey! I've gone through your details. Since you also had ABN income, please send me:

What kind of work did you do under your ABN?

Proof of all your ABN income, such as invoices you've issued or income reports.

Any receipts or invoices for expenses related to your ABN work.

You can send everything here on WhatsApp.`,

  request_expenses: `Hey! I can see you mentioned having some work-related expenses. Could you please send me any receipts or invoices you have for them here on WhatsApp?`,

  request_missing_doc: `Hey! I've gone through everything and we're just missing your {{DOCUMENT}}. Could you please send it here on WhatsApp? Once we have it, we can continue with your tax return.`,

  medicare_exemption: `Hey! Since you weren't covered by Medicare, you can apply for a Medicare Levy Exemption. It only takes a few minutes. Here's a quick guide:

https://youtu.be/oj7ZSOHAxJk?si=KDMFlLoR0jYdpulB

Once you've applied, send me a screenshot of the application and we'll include the exemption in your tax return. If the application isn't approved, the Medicare Levy will still apply.`,

  estimate_ready: `Hey! We've now gone through all your details and completed the review of your tax situation. Based on everything we've checked, your estimated tax refund is {{AMOUNT}}.

We'll now send everything for final review. Once approved, I'll send it to you for signature. I'll let you know as soon as it's ready.`,

  signature_ready: `Your tax return is ready! 🎉

I've emailed it to you for review and signature 📧`,

  followups_signature: {
    h24: `Hi {{1}}, your tax return is ready and just needs your signature before we can lodge it. Let me know if it didn't reach you 😊`,
    d3: `Hi {{1}}, once you sign, we lodge it with the ATO. If anything in it looks off, tell me and I'll check it 😊`,
    d7: `Hi {{1}}, your return is still waiting on your signature. Send it through when you can and we'll lodge it 😊`,
  },

  lodged: `Your tax return has been lodged successfully! 🎉 Your refund should arrive in your bank account within 14 business days.`,

  legitimacy: `Yes, absolutely! We operate under the supervision of a registered tax agent. You can find more details here: https://workingholidaytax.com.au/client-agreement`,

  // ============================================================
  // Messages that Will (or the team, through Will) can put in front of a
  // customer but which used to be written inline in the code, so they were
  // invisible in the Message Library and could not be edited without a deploy.
  // Nothing below is new wording: each string is the exact text the code was
  // already sending, moved here so seed.ts can expose it as a Library entry
  // and the send path can read the (editable) Library copy instead.
  // ============================================================

  /** "Send Estimate + Invoice" button (Review stage). Interpolated at send
   *  time: {{AMOUNT}} is the refund figure typed by the team, {{INVOICE_LINK}}
   *  the invoice URL pasted with it. Both are filled by the action before the
   *  message leaves, so a leftover placeholder is refused as it is anywhere. */
  estimate_invoice: `Your estimated tax refund is {{AMOUNT}} I'll send it for final review and then for your signature.

Here is your invoice:
{{INVOICE_LINK}}`,

  /** "Mark Lodged" button (Signature stage). The Google review ask was SPLIT out
   *  of this message (Jo, 31 Aug): the lodgement note is now just the good news,
   *  and the review request is a separate, warmer message sent an hour later (see
   *  `review_request` below and the REVIEW_REQUEST job). */
  lodged_confirmation: `Your tax return has been lodged successfully! ✅

Your refund should arrive in your bank account within 14 business days.`,

  // The Google review request (sent 1 hour after lodgement) is per-language and
  // lives in i18n.ts (REVIEW_REQUEST_MSG), seeded as review_request_<lang>, the
  // same shape as the questionnaire-received confirmation.

  /** The proposed replies attached to a handoff task (see suggest.ts). They are
   *  drafts for a human, but "Send Reply" transmits them verbatim in one click,
   *  so they are messages a customer can receive and belong in the Library. */
  handoff: {
    holding: `Thanks for that 😊 Let me look into it properly and come straight back to you.`,
    attachment: `Got it, thanks for sending that through 😊 I'll go through it and come back to you shortly.`,
    unreadable: `Thanks for your message 😊 It didn't come through on my end, would you mind sending it again as text?`,
    returning_customer: `Hey, good to hear from you again 😊 What can I help you with?`,
    many_questions: `Thanks for all the questions 😊 Let me jump in personally and go through everything with you properly.`,
    /** Files from someone who has ALREADY PAID. Not a question, so it asks none
     *  back: it confirms the pile arrived and buys the time to work through it.
     *  Jo, 28 Aug. */
    documents_after_payment: `Perfect, got it all, thank you 😊 Let me work through everything and I'll come back to you soon.`,
  },
} as const;

// ============================================================
// Refund-nationality owing caveat (Jo, 31 Aug).
//
// The price messages end on a sentence that spells out that if the customer
// OWES tax rather than getting a refund, the fee still isn't refundable.
//
// Jo's rule: Germans, Japanese and British backpackers reliably GET a refund,
// so that owing line only muddies their price message and is DROPPED for them.
// Everyone else KEEPS it, because owing is a real possibility and they must be
// told upfront the fee isn't refundable.
//
// The hard part is that a phone number alone is not enough: backpackers in
// Australia mostly use a local +61 SIM, so a Japanese or British customer often
// writes from an Australian number. Jo, explicitly: it must not matter whether
// they wrote from their own country's number or an Australian one. So THREE
// signals are combined, and ANY one of them drops the caveat:
//   1. Conversation language German or Japanese (holds on any number).
//   2. Phone country code +44 / +49 / +81 (UK / Germany / Japan).
//   3. The customer says where they are from in the chat ("from England",
//      "I'm British", "from Germany", "from Japan"...), which is the only way to
//      catch a Brit on a +61 number writing English.
//
// English on its own is NOT a signal (it is also Irish, Australian, American),
// so a plain English chat with no British tell keeps the caveat. This never
// touches the guarantee itself and never states or predicts a refund figure.
// ============================================================

/** Phone country codes that map to a refund nationality (UK, Germany, Japan). */
export const REFUND_PHONE_PREFIXES = ['44', '49', '81'] as const;

/** Conversation languages that map unambiguously to a refund nationality. */
export const REFUND_CAVEAT_DROP_LANGS = ['de', 'ja'] as const;

/** A refund-nationality country named anywhere in the customer's own messages.
 *  Will now asks "Which country are you from" in the opening, so the reply is the
 *  country itself, often on its own ("Japan", "UK", "Germany"). Customers answer
 *  in ANY language, so the country names for the UK, Germany and Japan are listed
 *  across the languages Will handles (English, German, Japanese, Spanish, French,
 *  Italian, Portuguese). The conversation-language and phone-prefix signals stay
 *  as backups. Bare CJK names have no word boundary, so they sit outside \b. */
const REFUND_COUNTRY = new RegExp(
  '\\b(' + [
    // United Kingdom (and its nations)
    'uk', 'u\\.k\\.', 'united\\s+kingdom', 'great\\s+britain', 'britain',
    'england', 'scotland', 'wales',
    'gro(?:ß|ss)britannien', 'vereinigtes\\s+k(?:ö|oe)nigreich',
    'royaume[-\\s]?uni', 'angleterre', 'grande[-\\s]?bretagne',
    'reino\\s+unido', 'inglaterra', 'gran\\s+breta(?:ñ|n)a',
    'regno\\s+unito', 'inghilterra',
    // Germany
    'germany', 'deutschland', 'allemagne', 'alemania', 'germania', 'alemanha',
    // Japan
    'japan', 'japon', 'jap(?:ó|o)n', 'giappone', 'jap(?:ã|a)o', 'nihon',
  ].join('|') + ')\\b|日本|ドイツ|イギリス|英国',
  'i',
);
/** A stated nationality ("I'm British/German/Japanese") that the country-word
 *  list above does not cover. */
const REFUND_NATIONALITY_SELF =
  /\bi'?m\s+(a\s+)?(british|english|scottish|welsh|german|japanese)\b|\bich\s+komme\s+aus\s+deutschland\b|\bich\s+bin\s+deutsche?r?\b|\b日本(から|人)\b/i;

/** Signals that a customer is a refund nationality (UK / Germany / Japan), from
 *  whichever of the three is available. ANY match drops the owing caveat; all
 *  absent keeps it. Fail-safe: unknown stays "keep". */
export function shouldDropOwingCaveat(opts: {
  lang?: string | null;
  waId?: string | null;
  text?: string | null;
}): boolean {
  const lang = opts.lang?.toLowerCase();
  if (lang && (REFUND_CAVEAT_DROP_LANGS as readonly string[]).includes(lang)) return true;

  const digits = (opts.waId ?? '').replace(/\D/g, '');
  if (digits && REFUND_PHONE_PREFIXES.some((p) => digits.startsWith(p))) return true;

  const text = opts.text ?? '';
  if (text && (REFUND_COUNTRY.test(text) || REFUND_NATIONALITY_SELF.test(text))) return true;

  return false;
}

/** The trailing owing-tax caveat, for either fee ($220 or $385) and either
 *  apostrophe style. Matched as a whole sentence (with the space that joins it
 *  to the guarantee before it) so removing it leaves clean text. */
const OWING_CAVEAT_RE =
  /\s*If you owe tax instead of a refund, the \$\d+ covers our review either way and isn'?t refundable\.?/i;

/** Remove the owing-tax caveat from a price message. Used for refund
 *  nationalities only. If the text has been edited in the Library and no longer
 *  holds the exact sentence, nothing is removed and the caveat safely stays. */
export function stripOwingCaveat(text: string): string {
  return text.replace(OWING_CAVEAT_RE, '');
}

/** Given a price message body and what we know about the customer, return the
 *  copy that should actually be sent: caveat dropped for UK/German/Japanese
 *  customers (by language, number, or a stated origin), kept for everyone else.
 *  Applies only to the two price templates; every other message is untouched. */
export function priceForCustomer(
  body: string,
  who: { lang?: string | null; waId?: string | null; text?: string | null },
): string {
  return shouldDropOwingCaveat(who) ? stripOwingCaveat(body) : body;
}
