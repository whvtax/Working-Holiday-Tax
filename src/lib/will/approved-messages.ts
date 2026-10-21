// ============================================================
// Approved customer-facing messages, VERBATIM from the Master
// Build Spec (§6, §7). These seed the templates table and are
// embedded in the AI playbook. Nothing here may be reworded
// without the owner's approval (small natural adjustments by the
// AI are allowed per §8.29, but price/policy meaning
// and tax boundaries never change).
// ============================================================

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
  opening: `Hey! 😊 Happy to help.

Quick one so I point you to the right option: did you work for employers on a TFN only, or also on an ABN (Uber, delivery, contracting)?`,

  // The two prices side by side. Only for a direct price question ("how much
  // does it cost?"); never the reply to an opening, a story or a question.
  prices: `We have two options:

*TFN: $220*
We review your tax residency, Medicare and deductions, then prepare and lodge your tax return, making sure you don't miss anything you're entitled to.

*TFN + ABN: $385*
Everything in the TFN option, plus a business schedule for your ABN income and expenses.

Which option works best for you?`,

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

  prices_foreign: `With foreign income to report, we have two options:

*TFN: $330*
We review your tax residency, Medicare and deductions, include your foreign income, then prepare and lodge your tax return, making sure you don't miss anything you're entitled to.

*TFN + ABN: $495*
Everything in the TFN option, plus a business schedule for your ABN income and expenses.

Which option works best for you?`,

  // For a customer who already lodged their return themselves (or through
  // someone else) and wants it checked/reviewed — a genuinely different
  // service from a fresh return, not a decline. Same bank details, same fee amounts as the normal
  // service, matched to what they mention (TFN only vs TFN + ABN).
  // NO GUARANTEE HERE (Jo, 29 Sep, Holly +61 409): a review of a return the
  // customer already lodged is paid for the review, whatever the result. The
  // refund-shortfall guarantee is for returns WE prepare and lodge only.
  price_tfn_review: `No problem, we can review a return you've already lodged.

Since it's already been lodged, this is a review of an existing return rather than a fresh one. The fee is $220 for the review itself and is the same whatever the result.

BSB: 062692
Account: 81049952

Just send a screenshot once paid and we'll get started!`,

  price_tfn_abn_review: `No problem, we can review a return you've already lodged.

Since it's already been lodged, this is a review of an existing return rather than a fresh one. The fee is $385 for the review itself and is the same whatever the result.

BSB: 062692
Account: 81049952

Just send a screenshot once paid and we'll get started!`,

  objections: {
    o1_refund_before_pay: `Absolutely 😊 Working out your expected refund is part of the review. We need to go through your full situation first before we can give you an accurate estimate, which is why we start the review once payment is made. If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.`,
    o2_why_pay_first: `I completely understand. The reason payment comes first is that reviewing your situation and working out what you're entitled to is the main part of the service. If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.`,
    o3_thought_free: `I understand. We previously offered a free eligibility check, but we've changed how the service works. We now focus on giving you a proper review and personal guidance based on your situation, rather than just a quick eligibility check. That's why the service is paid upfront. If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.`,
    o4_mygov: `Yes, absolutely, you can lodge your tax return yourself through myGov. The difference is that myGov is just where you lodge it. It won't review your situation, guide you on your tax residency, Medicare, or what you can claim, and make sure everything is correct. That's part of what we do, so you know everything has been properly reviewed and you're not left figuring it all out on your own.`,
    o5_too_expensive: `I understand. The fee covers the full review and personal guidance, so you're not left trying to work everything out on your own. If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.`,
    o6_pay_after_refund: `Payment is made upfront because the review and personal guidance are the main part of the service, and that's where our work starts. Once payment is received, we can start going through your situation properly. If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.`,
    o7_professional_question: `Yes, that's definitely one of the many things we check before we lodge your tax return, so leave that with us. 😊`,
    o8_simple_return: `I understand. Even with just one job, there's more to check than the income on your payslip. Your tax residency, Medicare, and what you're entitled to claim can still make a difference. Our fee is based on reviewing your situation properly and guiding you through it, not on how many jobs or payslips you've had.`,
    o9_no_refund: `No problem. If your tax refund is less than our fee, we'll refund the difference. If there's no refund at all, or you have an amount to pay, our full fee applies, as the work is the same. What the review makes sure of is that nothing you're entitled to is missed.`,
    o10a_why_not_accountant: `Of course, you can use an accountant. The difference is that we focus specifically on Working Holiday Makers and deal with situations like yours every day. Our team knows the common issues backpackers run into, things like tax residency, Medicare, ABN income, and work-related expenses, so the whole service is built around people in your situation.`,
    o10b_found_cheaper: `No worries, I completely understand. Just make sure you're comparing the same level of service. With us, you're not just paying to submit a tax return. Your situation is properly reviewed and you get personal guidance throughout the process. If you've found someone cheaper, just make sure you know exactly what's included before you decide.`,
    o11_think_about_it: `Of course, no problem. Before you go, is there anything you're unsure about or anything you'd like me to clarify for you? Happy to answer any questions before you decide.`,
    o12_ask_partner: `Of course, no problem. If there's anything you or your partner are unsure about, just let me know and I'm happy to clarify it before you decide.`,
    o13_one_question: `Of course, happy to help. Anything about your own situation is one of the many things we check before we lodge your tax return, so leave that with us. What would you like to know?`,
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
    h24: `Hi {{1}}, are you still in Australia or have you already left? 😊`,
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
    d3: `Hi {{1}}, have you given up on your tax refund this year?`,
    // 14 Oct (Jo): a warm goodbye about THEIR trip, door left open.
    // 14 Oct (Jo): the last message gives a real reason to answer now. "No,
    // wait" reopens; "yes" closes cleanly (Not Interested); silence closes anyway.
    d7: `Hi {{1}}, should I close your file for now?`,
    // 11 Oct (decision 9): for a lead who already has the bank details, the
    // 24h and 3d nudges above make no sense ("want me to get you started?"
    // to someone holding the BSB). This one replaces them, once.
    // 14 Oct (Jo): assumes they are already on it; easy to answer.
    priceSent: `Hi {{1}}, did the transfer go through on your end?`,
  },

  payment_received: `Payment received.

Please fill out this quick form so we can start reviewing your situation.

Once you've submitted it, we'll go through everything and get back to you within 24 hours.

https://workingholidaytax.com.au/tax-form`,

  followups_form: {
    // Jo, 4 Sep: no number. The form is two steps, ten or so fields, a residency
    // declaration and two document uploads; anyone who has to find their TFN or
    // photograph a passport is well past five minutes, let alone two. Promising
    // a number we break at minute four, at exactly the point people abandon a
    // form, costs more than the friction it saves. "Quick to fill in" carries
    // the same message and cannot be held against us.
    // 14 Oct (Jo): a short, easy question; "not yet" opens the door to help.
    h6: `Hi {{1}}, did you get a chance to look at the form yet?`,
    // Jo, 4 Sep: "if any question is confusing" opened the door to only ONE of
    // the three reasons a paid customer has not filled the form in. The others
    // are not having a document to hand and simply not getting to it, and
    // "anything is holding you up" catches all three in fewer words.
    // 14 Oct (Jo): permission to say they are stuck.
    d3: `Hi {{1}}, is anything in the form holding you up?`,
    // Jo, 4 Sep: the last one CLOSES the conversation rather than asking a third
    // time. Three variations of "we still need your form" is not a cadence, it
    // is nagging, and after this nothing else is scheduled.
    //
    // NOTHING MOVES IN THE PIPELINE. This customer has PAID, and Jo closes the
    // card himself when he decides to; the message says we have stopped chasing,
    // the stage says what is actually true. And because they paid, the door is
    // left genuinely open: a customer who sends the form in three weeks is
    // picked up where they left off, which is both the right service and the
    // right answer if they ever say they paid and got nothing.
    // 14 Oct (Jo): they name the day themselves (commitment), and the system
    // keeps the promise: one check-back on that day (scheduleFollowUp).
    d7: `Hi {{1}}, when do you think you'll have a moment for the form? I'll check back with you then 😊`,
  },

  // Sent automatically to a TFN + ABN customer right after their form comes in
  // (Jo, 3 Sep), as a second message after the form-received confirmation. It
  // asks for what the business schedule needs. Also in the Library (req_abn)
  // so it can be re-sent by hand.
  request_abn_detail: `A few quick questions about your ABN income:

• What type of work did you do?
• Do you have any invoices or records of your ABN income?
• Did you have any work-related expenses that you can provide proof of payment for?`,

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
  medicare_exemption: `Since you weren't covered by Medicare, you may be eligible to apply for a Medicare Levy Exemption.

Once you've submitted your application, send me a screenshot and we'll include the exemption in your tax return.

If Services Australia doesn't approve it, the levy still applies and you'll need to pay it.`,

  estimate_ready: `Hey! We've now gone through all your details and completed the review of your tax situation. Based on everything we've checked, your estimated tax refund is {{AMOUNT}}.

We'll now send everything for final review. Once approved, I'll send it to you for signature. I'll let you know as soon as it's ready.`,

  // Matches the Meta-approved `signature` template word for word (Jo, 3 Sep),
  // so the customer gets the identical text inside and outside the 24h window.
  signature_ready: `Your tax return is ready! 🎉
I've emailed it to you for review and signature.`,

  followups_signature: {
    // 14 Oct (Jo, all three together). Never "refund": these also go to a
    // customer who owes tax.
    h24: `Hi {{1}}, did the email with your tax return reach you okay?`,
    d3: `Hi {{1}}, is there anything in your return you'd like me to explain before you sign?`,
    // They name the day; the system checks back on it (scheduleFollowUp).
    d7: `Hi {{1}}, your return is ready and waiting. When do you think you'll have a moment to sign it? I'll check back with you then 😊`,
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
  // Matches the Meta-approved `estimate_invoice` template word for word
  // ({{AMOUNT}} = its {{1}}, {{INVOICE_LINK}} = its {{2}}; Jo, 3 Sep), so the
  // customer gets the identical text inside and outside the 24h window. The
  // link sits on its own line and the message does not end on a variable.
  estimate_invoice: `Your estimated tax refund is {{AMOUNT}}.

Here is your invoice:
{{INVOICE_LINK}}

I'll send it for final review and then for your signature.`,

  /** "Mark Lodged" button (Signature stage). The Google review ask was SPLIT out
   *  of this message (Jo, 31 Aug): the lodgement note is now just the good news,
   *  and the review request is a separate, warmer message sent an hour later (see
   *  `review_request` below and the REVIEW_REQUEST job). */
  // Matches the Meta-approved `lodged_confirmation` template line for line
  // (Jo, 3 Sep): two consecutive lines, no blank line between them.
  lodged_confirmation: `Your tax return has been lodged successfully! ✅
Your refund should arrive in your bank account within 14 business days.`,

  // The Google review request (sent 1 hour after lodgement) is per-language and
  // lives in i18n.ts (REVIEW_REQUEST_MSG), seeded as review_request_<lang>, the
  // same shape as the questionnaire-received confirmation.

  /** The proposed replies attached to a handoff task (see suggest.ts). They are
   *  drafts for a human, but "Send Reply" transmits them verbatim in one click,
   *  so they are messages a customer can receive and belong in the Library. */
  handoff: {
    holding: `I've passed this to the team. They'll reply here, usually within one business day. If you don't hear back by then, just nudge me 😊`,
    attachment: `Got it, thanks for sending that through 😊 I'll go through it and come back to you shortly.`,
    unreadable: `Thanks for your message 😊 It didn't come through on my end, would you mind sending it again as text?`,
    returning_customer: `Hey, good to hear from you again 😊 What can I help you with?`,
    many_questions: `Thanks for all the questions 😊 Let me jump in personally and go through everything with you properly.`,
    /** Files from someone who has ALREADY PAID. Not a question, so it asks none
     *  back: it confirms the pile arrived and buys the time to work through it.
     *  Jo, 28 Aug. */
    documents_after_payment: `Perfect, got it all, thank you 😊`,
    /** The customer deleted a message they sent before anyone (or Will) could
     *  read it (WhatsApp "Delete for everyone", Meta's `type: 'revoke'`). This
     *  is NOT the generic "no readable text" case (approved-messages.ts
     *  `unreadable`, above): that one is honestly unsure whether a message from
     *  the customer arrived at all; this one knows one did, so the reply does
     *  not claim otherwise ("it didn't come through") — it only offers to help
     *  if they still want to send whatever it was. */
    revoked: `No worries 😊 Looks like that got deleted before I could see it. Happy to help if you still want to send it.`,
  },
} as const;

