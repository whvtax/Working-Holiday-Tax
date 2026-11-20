// ============================================================
// Approved customer-facing messages, VERBATIM from the Master
// Build Spec (§6, §7). These seed the templates table and are
// embedded in the AI playbook. Nothing here may be reworded
// without the owner's approval (small natural adjustments by the
// AI are allowed per §8.29, but price/policy meaning
// and tax boundaries never change).
// ============================================================

import { langOf, nineLanguages, type Lang } from './i18n';

export const APPROVED = {
  // The "menu" opening (Jo, 3 Sep): one message that presents BOTH tracks with
  // their prices, then asks the customer to choose. It
  // replaces the old two-step "ask TFN/ABN, then quote" pair, so the price is
  // shown up front and the customer picks. The greeting takes the customer's
  // first name dynamically ("Hey Sarah! 😊") when a clean one is known; see
  // greetingName() and the NEW_LEAD branch in claude.ts. Paragraphs are
  // separated by blank lines on purpose: WhatsApp renders them as blocks.
  // 27 Sep (Jo): tightened again, 73 -> 54 words; the TFN line now says
  // "prepare and lodge" so "review" never reads as check-only.
  // 24 Sep (Jo): shorter opener, "don't miss anything you're entitled to"
  // instead of "maximise your refund" (no implied refund promise now that the
  // fee is for the review), and "works best for you" as the closing question.
  // 11 Oct (Jo, after the full audit of 386 conversations): the prices left
  // the opening. One qualifying question first; the chosen track's price and
  // the bank details follow in the next message. The two-price list lives
  // under [prices] for whoever asks "how much?" outright.
  // Jo, 18 Nov (template review, FINAL): shorter, the customer's name when there is one
  // ("Hey Sam!"), a blank line between the two parts, the emoji closing the greeting line.
  opening: `Hey! Happy to help😊

Did you work for employers only (TFN), or also on an ABN (Uber, self-employed)?`,

  // The two prices side by side. Only for a direct price question ("how much
  // does it cost?"); never the reply to an opening, a story or a question.
  // Jo, 18 Nov (template review, FINAL): shorter, no name and no emoji (both were in the opening).
  prices: `Two options!

*TFN: $220*
We check your tax residency, Medicare and deductions then prepare and lodge your return so you don't miss anything you're entitled to.

*TFN + ABN: $385*
Everything above, plus your ABN income and expenses.

Which one fits you?`,

  // Sent once the customer has chosen a track (Jo, 3 Sep). The prices already
  // went out in the opening, so this only gives the bank details, the amount,
  // and the guarantee (Jo, 27 Sep: brought back, "super important, gives the
  // customer confidence": refund below the fee -> we refund the difference; no
  // refund -> full fee applies, said quietly). No account name line (27 Sep,
  // it confused people; whoever asks gets the Library answer). Same shape for
  // both tracks; only the amount differs. Jo, 21 Oct: the guarantee is
  // TFN-only again; [price_tfn_abn] does not carry it (see abn-income.ts).
  price_tfn: `Got it, so that's the TFN option, $220. We review your tax residency, Medicare and deductions, then prepare and lodge your tax return, making sure you don't miss anything you're entitled to.

BSB: 062692
Account: 81049952

If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.

Just send a screenshot once paid and we'll get started!`,

  price_tfn_abn: `Got it, so that's the TFN + ABN option, $385. We review your tax residency, Medicare and deductions, add a business schedule for your ABN income and expenses, then prepare and lodge your tax return, making sure you don't miss anything you're entitled to.

BSB: 062692
Account: 81049952

Just send a screenshot once paid and we'll get started!`,

  // Jo, 12 Oct: income from outside Australia adds $110 (TFN $330, TFN +
  // ABN $495). Same shape as the two above, WITHOUT the guarantee: it does
  // not apply to a return with foreign income.
  price_tfn_foreign: `Got it, so that's the TFN option with foreign income, $330. We review your tax residency, Medicare and deductions, include your foreign income, then prepare and lodge your tax return, making sure you don't miss anything you're entitled to.

BSB: 062692
Account: 81049952

Just send a screenshot once paid and we'll get started!`,

  price_tfn_abn_foreign: `Got it, so that's the TFN + ABN option with foreign income, $495. We review your tax residency, Medicare and deductions, add a business schedule for your ABN income and expenses, include your foreign income, then prepare and lodge your tax return, making sure you don't miss anything you're entitled to.

BSB: 062692
Account: 81049952

Just send a screenshot once paid and we'll get started!`,

  // Jo, 18 Nov (template review 18): locked, same shape as `prices`.
  prices_foreign: `With foreign income, there are two options:

*TFN: $330*
We check your tax residency, Medicare and deductions, include your foreign income, then prepare and lodge your return so you don't miss anything you're entitled to.

*TFN + ABN: $495*
Everything above, plus your ABN income and expenses.

Which one fits you?`,

  // For a customer who already lodged their return themselves (or through
  // someone else) and wants it checked/reviewed - a genuinely different
  // service from a fresh return, not a decline. Same bank details, same fee amounts as the normal
  // service, matched to what they mention (TFN only vs TFN + ABN).
  // NO GUARANTEE HERE (Jo, 29 Sep, Holly +61 409): a review of a return the
  // customer already lodged is paid for the review, whatever the result. The
  // refund-shortfall guarantee is for returns WE prepare and lodge only.
  price_tfn_review: `No problem, we can review a return you've already lodged.

Since it's already been lodged, this is a review of an existing return rather than a fresh one. The fee is $330 for the review itself and is the same whatever the result. It also covers lodging the amended return, if one is needed.

BSB: 062692
Account: 81049952

Just send a screenshot once paid and we'll get started!`,

  price_tfn_abn_review: `No problem, we can review a return you've already lodged.

Since it's already been lodged, this is a review of an existing return rather than a fresh one. The fee is $440 for the review itself (GST included) and is the same whatever the result.

BSB: 062692
Account: 81049952

Just send a screenshot once paid and we'll get started!`,

  objections: {
    o1_refund_before_pay: `Absolutely 😊 Working out your expected refund is part of the review. We need to go through your full situation first before we can give you an accurate estimate, which is why we start the review once payment is made. If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.`,
    o2_why_pay_first: `I completely understand. The reason payment comes first is that reviewing your situation and working out what you're entitled to is the main part of the service. If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.`,
    o3_thought_free: `I understand. We previously offered a free eligibility check, but we've changed how the service works. We now focus on giving you a proper review and personal guidance based on your situation, rather than just a quick eligibility check. That's why the service is paid upfront. If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.`,
    o4_mygov: `I understand. The difference is that myGov is just where a return gets lodged. It won't review your situation, guide you on your tax residency, Medicare, or what you can claim, and make sure everything is correct. That's part of what we do, so you know everything has been properly reviewed and you're not left figuring it all out on your own.`,
    o5_too_expensive: `I understand. The fee covers the full review and personal guidance, so you're not left trying to work everything out on your own. If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.`,
    o6_pay_after_refund: `Payment is made upfront because the review and personal guidance are the main part of the service, and that's where our work starts. Once payment is received, we can start going through your situation properly. If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.`,
    // 30 Oct (Jo): the stock line is retired for everything except the refund_chance wording.
    o7_professional_question: `Yes, that is covered in the review of your case, which starts once payment is made. Reviewed and signed off by a registered tax agent before it is lodged with the ATO. 😊`,
    o8_simple_return: `I understand. Even with just one job, there's more to check than the income on your payslip. Your tax residency, Medicare, and what you're entitled to claim can still make a difference. Our fee is based on reviewing your situation properly and guiding you through it, not on how many jobs or payslips you've had.`,
    o9_no_refund: `No problem. If your tax refund is less than our fee, we'll refund the difference. If there's no refund at all, or you have an amount to pay, our full fee applies, as the work is the same. What the review makes sure of is that nothing you're entitled to is missed.`,
    o10a_why_not_accountant: `Of course, you can use an accountant. The difference is that we focus specifically on Working Holiday Makers and deal with situations like yours every day. Our team knows the common issues backpackers run into, things like tax residency, Medicare, ABN income, and work-related expenses, so the whole service is built around people in your situation.`,
    o10b_found_cheaper: `No worries, I completely understand. Just make sure you're comparing the same level of service. With us, you're not just paying to submit a tax return. Your situation is properly reviewed and you get personal guidance throughout the process. If you've found someone cheaper, just make sure you know exactly what's included before you decide.`,
    o11_think_about_it: `Of course, no problem. Before you go, is there anything you're unsure about or anything you'd like me to clarify for you? Happy to answer any questions before you decide.`,
    o12_ask_partner: `Of course, no problem. If there's anything you or your partner are unsure about, just let me know and I'm happy to clarify it before you decide.`,
    o13_one_question: `Of course, happy to help. What would you like to know?`,
    // Jo, 22 Oct (+44 7809): "In what cases would there be no refund?" right
    // after the price message got the stock line. It is a question about OUR
    // guarantee's wording, not about their tax: it gets a general answer.
    o15_when_no_refund: `Usually when the tax taken from your pay during the year already matches what you owe, or when too little was taken (for example from a second job), so there's tax to pay instead. Whether that's the case for you is one of the things we check in the review 😊`,
    // Jo, 23 Oct (Laura & Felix): a couple asking together. Each partner
    // writes from their own WhatsApp (security and confidentiality), the fee
    // is per person and the same for everyone, never a couple discount.
    // Jo, 18 Nov (template review 24): locked.
    o16_couple: `Of course, happy to help you both!

Each of you just needs to message us from your own WhatsApp, so your details stay private.

The fee is per person: $220 for a TFN return, or $385 with ABN income.`,
    o14_check_eligible_first: `Yes, that's exactly what we'll check as part of your review. Eligibility can depend on your individual situation, so we need to go through your details properly before giving you an answer. That's why the review starts once payment is made. If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.`,
  },

  followups_pre_payment: {
    // Jo, 4 Sep. The old line was "still want us to take a look at your tax
    // situation? If anything about how the review works is unclear, just ask and
    // I'll happily explain." Two problems: "still" plants the doubt and invites
    // "actually, no", and the second half is the polite scaffolding the playbook
    // bans, which invites another round of questions instead of a decision.
    // 14 Oct (Jo, chosen from five): a question about THEIR life, not our
    // service. Any answer reopens the chat; "already left" gets "we can do
    // everything from here, wherever you are".
    h24: `Hey {{1}}😊\n\nJust checking in on your tax return. Anything I can explain before you get started?`,
    // Jo, 4 Sep, his wording, after working through it line by line.
    //
    // WHO THIS IS FOR. Whoever is still here on day three is almost always the
    // customer who came NOT intending to pay and is weighing up doing it alone;
    // the one who came to pay has already paid. So it uses the single lever
    // that moves that person: not comfort, not thoroughness, but what they
    // stand to lose by doing it themselves, said without blaming them for
    // considering it ("most people", not "you").
    //
    // No fee talk here. What the fee is for is said in the price message, at
    // the moment they are about to pay, and nowhere else.
    //
    // Three nudges, three angles, no overlap: 24h is availability, this is
    // value, 7d is the door left open.
    // 11 Oct (full audit, decision 9): "most people doing it alone miss
    // things" went out 46 times in one slice with zero conversions, and read
    // as a dig at anyone who had said "I'll do it myself". The 3-day nudge
    // now opens the door to a question instead.
    // 14 Oct (Jo): a question that is safe to answer "no" to. "No, not yet!"
    // is them saying out loud that they still want it.
    d3: `Hi {{1}}😊\nIf you need help with your tax return later on, just message me here.`,
    // 11 Oct (decision 9): for a lead who already has the bank details, the
    // 24h and 3d nudges above make no sense ("want me to get you started?"
    // to someone holding the BSB). This one replaces them, once.
    // 14 Oct (Jo): assumes they are already on it; easy to answer.
    // 1 Nov (Jo, approved in Meta): invites a question instead of only asking
    // whether they paid. Jo, 18 Nov: shorter, two lines.
    priceSent: `Hi {{1}}😊\nDid the transfer go through on your end?`,
    // 18 Nov (decision 018): the German and Japanese versions (and the other seven) are FOLLOWUP_MSG.fu_price_sent in i18n.ts.
  },

  // Jo, 18 Nov (template review, FINAL, approved): a thank you, the link right after the ask.
  // Inside the 24-hour window the link goes as a "Start here" button (channel.ts, sendWhatsAppCtaUrl).
  payment_received: `Payment received, thank you!

Please fill out this short form so we can start your tax return:
https://workingholidaytax.com.au/start

Once submitted our team will review everything and update you here.`,

  followups_form: {
    // Jo, 4 Sep: no number. The form is two steps, ten or so fields, a residency
    // declaration and two document uploads; anyone who has to find their TFN or
    // photograph a passport is well past five minutes, let alone two. Promising
    // a number we break at minute four, at exactly the point people abandon a
    // form, costs more than the friction it saves. "Quick to fill in" carries
    // the same message and cannot be held against us.
    // 14 Oct (Jo): a short, easy question; "not yet" opens the door to help.
    h6: `Hi {{1}}😊\nDid you get a chance to fill out the form yet?`,
    // Jo, 18 Nov: the 3-day and 7-day form reminders are removed (one reminder after 6 hours is enough).
  },

  // Sent automatically to a TFN + ABN customer right after their form comes in
  // (Jo, 3 Sep), as a second message after the form-received confirmation. It
  // asks for what the business schedule needs. Also in the Library (req_abn)
  // so it can be re-sent by hand.
  request_abn_detail: `A few quick questions about your ABN income:

1. What work did you do?
2. Do you have invoices or records of what you earned?
3. Any work expenses you can show proof of payment for?`,

  // 30 Oct (Jo): the full one message intake lives in EXPENSES_INTAKE_MSG below.
  // 30 Oct (Jo): the expenses module (see EXPENSES_INTAKE_MSG below for de and ja). Registered here so the Policy Guard counts it as approved wording.
  // 30 Oct (Jo): the expenses module (de and ja: EXPENSES_INTAKE_MSG below). Four parts, sent together as one message, so each part stays below the longest approved script (the Policy Guard sizes its length allowance from that) and each is a Library entry.
  expenses: {
    intake_a: `Thanks! One quick thing on work expenses. I'll ask for everything in one go, so you only need to reply once.

What did you spend on for work? For example phone or internet, a car or kilometres driven, a bike, scooter or rental car, tools, uniform or protective clothing, courses, licences, registrations or union fees, or working from home. Just tell me what applies. "None" is a fine answer.`,
    intake_b: `If you used a car or have fuel receipts: were these trips from home to work, or between work sites or to another job during working hours? Trips from home to work and personal trips, like lunch runs, can't go in. Trips between work sites during working hours may be included.`,
    intake_c: `If they were between sites, please send a logbook (trip diary) covering up to 5,000 km, with the date, from, to, purpose and km (a screenshot of your notes app is fine). We use the cents per kilometre method: 88 cents per km, up to 5,000 km. Please also send the car's registration number (rego), when you bought it, how much it cost, and the make and model, and tell us whether you own it or rent it. For a rental car, send the rental invoices and the logbook. For rideshare or delivery, send the app's yearly km report and your earnings summary.`,
    intake_d: `Working from home: a diary or timesheet with the dates and hours.

Phone and internet: the bills, and roughly what percentage you use for work.

Clothing: tell us exactly what you bought. If it was everyday clothing, like jeans, trainers or black pants, let us know whether it was compulsory at work or used for work purposes. What can be claimed is confirmed in the review, before anything is lodged.

Tools, courses and licences: a receipt, or a bank statement with the item highlighted.

No receipts? A list of the items is fine, up to $300. Just tell us what the items were.`,
    done: `Thanks, I have what we need on expenses.`,
  },

  request_expenses: `Hey! I can see you mentioned having some work-related expenses. Could you please send me any receipts or invoices you have for them here on WhatsApp?`,

  request_missing_doc: `Hey! I've gone through everything and we're just missing your {{DOCUMENT}}. Could you please send it here on WhatsApp? Once we have it, we can continue with your tax return.`,

  // Jo, 4 Sep. Three paragraphs, word for word the Meta template `medicare`,
  // so what the customer receives and what the chat shows are the same text.
  //
  // WHAT CHANGED AND WHY. "you can apply" became "you may be eligible to apply":
  // the exemption is not everyone's, and the playbook already forbids pushing it
  // at somebody who probably is not entitled. The guide link moved out of the
  // body and onto a "Watch the guide" button on the template. And the last line,
  // which is the one that protects us, now names WHO decides and what it costs
  // THEM: "If Services Australia doesn't approve it, the levy still applies and
  // you'll need to pay it." The old "the Medicare Levy will still apply" was
  // passive and easy to skim, and this is the sentence a customer quotes back
  // when the ATO charges them the levy after we lodged with the exemption.
  // Jo, 18 Nov (template review, FINAL): shorter. Inside the window it carries the "How to apply" video button.
  medicare_exemption: `You weren't covered by Medicare, so you may be able to get a Medicare Levy Exemption.

Once you've applied send me a screenshot and we'll include it in your tax return.

If it isn't approved, the levy still applies.`,

  // Matches the Meta-approved `signature` template word for word (Jo, 3 Sep),
  // so the customer gets the identical text inside and outside the 24h window.
  signature_ready: `Your tax return is ready! 🎉
I've emailed it to you to review and sign so we can lodge it.`,

  followups_signature: {
    // 14 Oct (Jo, all three together). Never "refund": these also go to a
    // customer who owes tax.
    // Jo, 18 Nov: one signature reminder only, 18 hours after the notice; the 3-day and 7-day ones are removed.
    h24: `Hi {{1}}😊\nDid you get a chance to review and sign your tax return?`,
  },


  legitimacy: `Of course. We operate under the supervision of a registered tax agent. You can find more details here: https://workingholidaytax.com.au/client-agreement`,

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
  // Matches the Meta-approved `estimate_invoice` template word for word
  // ({{AMOUNT}} = its {{1}}, {{INVOICE_LINK}} = its {{2}}; Jo, 3 Sep), so the
  // customer gets the identical text inside and outside the 24h window. The
  // link sits on its own line and the message does not end on a variable.
  // Jo, 18 Nov (template review 10): no invoice in this message for now
  // ("maybe later"), and "it" became "your tax return". The Meta template
  // keeps its old wording until Jo enters the new one.
  estimate_invoice: `Your estimated tax refund is {{AMOUNT}}.

I'll send your tax return for final review and then for your signature.`,

  /** "Mark Lodged" button (Signature stage). The Google review ask was SPLIT out
   *  of this message (Jo, 31 Aug): the lodgement note is now just the good news,
   *  and the review request is a separate, warmer message sent an hour later (see
   *  `review_request` below and the REVIEW_REQUEST job). */
  // Matches the Meta-approved `lodged_confirmation` template line for line
  // (Jo, 3 Sep): two consecutive lines, no blank line between them.
  lodged_confirmation: `Your tax return has been lodged! ✅
Your refund should arrive in your bank account within 14 business days.`,

  // The Google review request (sent 1 hour after lodgement) is per-language and
  // lives in i18n.ts (REVIEW_REQUEST_MSG), seeded as review_request_<lang>, the
  // same shape as the questionnaire-received confirmation.

  /** The proposed replies attached to a handoff task (see suggest.ts). They are
   *  drafts for a human, but "Send Reply" transmits them verbatim in one click,
   *  so they are messages a customer can receive and belong in the Library. */
  handoff: {
    holding: `I've passed this to the team, and they'll usually reply here within one business day.`,
    attachment: `Got it, thanks for sending that through 😊 I'll go through it and come back to you shortly.`,
    unreadable: `Thanks for your message 😊 It didn't come through on my end, would you mind sending it again as text?`,
    returning_customer: `Hey, good to hear from you again 😊 What can I help you with?`,
    many_questions: `Thanks for all the questions 😊 Let me jump in personally and go through everything with you properly.`,
    /** Files from someone who has ALREADY PAID. Not a question, so it asks none
     *  back: it confirms the pile arrived and buys the time to work through it.
     *  Jo, 28 Aug. */
    documents_after_payment: `Perfect, got it all, thank you!`,
    /** The customer deleted a message they sent before anyone (or Will) could
     *  read it (WhatsApp "Delete for everyone", Meta's `type: 'revoke'`). This
     *  is NOT the generic "no readable text" case (approved-messages.ts
     *  `unreadable`, above): that one is honestly unsure whether a message from
     *  the customer arrived at all; this one knows one did, so the reply does
     *  not claim otherwise ("it didn't come through") - it only offers to help
     *  if they still want to send whatever it was. */
    revoked: `No worries 😊 Looks like that got deleted before I could see it. Happy to help if you still want to send it.`,
  },
} as const;


// ============================================================
// EXPENSES MODULE (Jo, 30 Oct: "all expenses must be fully Will's").
// ONE message that asks for everything; Will collects, never decides.
// No dashes of any kind. Items marked in docs/WILL_EXPENSES_MODULE_30OCT.md
// must be verified by Jo or the registered tax agent.
// ============================================================
export const EXPENSES_INTAKE_MSG: Record<Lang, string> = nineLanguages('EXPENSES_INTAKE_MSG',
  [APPROVED.expenses.intake_a, APPROVED.expenses.intake_b + ' ' + APPROVED.expenses.intake_c, APPROVED.expenses.intake_d].join('\n\n'),
);

/** Said once, after the expenses are collected. */
export const EXPENSES_DONE_MSG: Record<Lang, string> = nineLanguages('EXPENSES_DONE_MSG', APPROVED.expenses.done);

// ============================================================
// THE OPENING AND THE TWO PRICE MENUS IN ALL NINE LANGUAGES (decision 018).
// English is APPROVED.opening / prices / prices_foreign above (locked by Jo);
// the other eight are the translators' wording, verbatim.
// ============================================================
export const OPENING_MSG: Record<Lang, string> = nineLanguages('APPROVED.opening', APPROVED.opening);
export const PRICES_MSG: Record<Lang, string> = nineLanguages('APPROVED.prices', APPROVED.prices);
export const PRICES_FOREIGN_MSG: Record<Lang, string> = nineLanguages('APPROVED.prices_foreign', APPROVED.prices_foreign);
/** The opening in this language, with the customer's first name when there is one. */
export function openingMessage(lang: string | null | undefined, firstName?: string | null): string {
  return withGreetingName(OPENING_MSG[langOf(lang)], firstName);
}
/** Puts the first name into the opening's greeting, per language (the English "Hey!" becomes
 *  "Hey Sam!"). The translators' greeting lines have no name slot, so the name goes where the
 *  language puts it: after the greeting word, or before さん in Japanese. */
export function withGreetingName(opening: string, firstName?: string | null): string {
  const name = (firstName ?? '').trim();
  if (!name) return opening;
  const nl = opening.indexOf('\n');
  const first = nl < 0 ? opening : opening.slice(0, nl);
  const rest = nl < 0 ? '' : opening.slice(nl);
  let line: string | null = null;
  if (/^Hey!/.test(first)) line = first.replace(/^Hey!/, `Hey ${name}!`);
  else if (/^こんにちは！/.test(first)) line = first.replace(/^こんにちは！/, `こんにちは、${name}さん！`);
  else if (/^嗨！/.test(first)) line = first.replace(/^嗨！/, `嗨 ${name}！`);
  else if (/^Chào bạn!/.test(first)) line = first.replace(/^Chào bạn!/, `Chào ${name}!`);
  // Jo, 18 Nov: Spanish writes the vocative comma ("¡Hola, Ana!"), as its follow-ups do.
  else if (/^¡Hola!/.test(first)) line = first.replace(/^¡Hola!/, `¡Hola, ${name}!`);
  else {
    const m = /^(¡?)([^\s!¡！,]+)(\s?)!/.exec(first);
    if (m) line = `${m[1]}${m[2]} ${name}${m[3]}!${first.slice(m[0].length)}`;
  }
  return (line ?? first) + rest;
}

// ============================================================
// THE TWO APPROVED AGENT PHRASES, PER LANGUAGE (Jo, 30 Oct).
// "Steuerberater" (German) and 税理士 (Japanese) are protected titles and must
// never be used for our agent. German says "registrierten australischen Tax
// Agent", Japanese says "オーストラリアの登録タックスエージェント". These are the
// only agent wordings a German or Japanese customer is shown. The Policy Guard
// refuses the protected titles (PROTECTED_AGENT_TITLE).
// ============================================================
export const AGENT_PHRASES = {
  /** 'operates under the supervision of a registered tax agent' */
  supervision: {
    en: 'operates under the supervision of a registered tax agent',
    de: 'unter der Aufsicht eines registrierten australischen Tax Agent',
    ja: 'オーストラリアの登録タックスエージェントの監督のもとで運営',
    // 18 Nov (language reviews, Jo): the same approved meaning in French, Italian, Portuguese,
    // Vietnamese and Chinese, with "registered tax agent" kept in English (the local titles are
    // protected or mean something else: expert-comptable, agente fiscal, đại lý thuế, 注册税务师).
    fr: "travaille sous la supervision d'un registered tax agent",
    it: 'opera sotto la supervisione di un registered tax agent',
    pt: 'opera sob a supervisão de um registered tax agent',
    vi: 'hoạt động dưới sự giám sát của một registered tax agent',
    zh: '在一名 registered tax agent 的监督下运营',
  },
  /** 'Reviewed and signed off by a registered tax agent before it is lodged with the ATO' */
  signedOff: {
    en: 'Reviewed and signed off by a registered tax agent before it is lodged with the ATO',
    de: 'Von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird',
    ja: 'ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します',
    fr: "Vérifiée et validée par un registered tax agent avant d'être déposée auprès de l'ATO",
    it: "Controllata e approvata da un registered tax agent prima di essere presentata all'ATO",
    pt: 'Revisada e aprovada por um registered tax agent antes de ser enviada à ATO',
    vi: 'Được một registered tax agent kiểm tra và ký duyệt trước khi nộp cho ATO',
    zh: '在提交给 ATO 之前，由一名 registered tax agent 审核并签字确认',
  },
  /** The legitimacy answer's first sentence, per language (English: [legitimacy], "Of course. We
   *  operate under the supervision of a registered tax agent."), 18 Nov. */
  legitimacy: {
    fr: "Bien sûr. Nous travaillons sous la supervision d'un registered tax agent.",
    it: 'Certo. Operiamo sotto la supervisione di un registered tax agent.',
    pt: 'Claro. Operamos sob a supervisão de um registered tax agent.',
    vi: 'Tất nhiên rồi. Bên mình hoạt động dưới sự giám sát của một registered tax agent.',
    zh: '当然。我们在一名 registered tax agent 的监督下运营。',
  },
} as const;
