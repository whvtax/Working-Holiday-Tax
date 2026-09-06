// ============================================================
// Approved customer-facing messages, VERBATIM from the Master
// Build Spec (§6, §7). These seed the templates table and are
// embedded in the AI playbook. Nothing here may be reworded
// without the owner's approval (small natural adjustments by the
// AI are allowed per §8.29, but price/guarantee/policy meaning
// and tax boundaries never change).
// ============================================================

export const APPROVED = {
  // The "menu" opening (Jo, 3 Sep): one message that presents BOTH tracks with
  // their prices and the guarantee, then asks the customer to choose. It
  // replaces the old two-step "ask TFN/ABN, then quote" pair, so the price is
  // shown up front and the customer picks. The greeting takes the customer's
  // first name dynamically ("Hey Sarah! 😊") when a clean one is known; see
  // greetingName() and the NEW_LEAD branch in claude.ts. Paragraphs are
  // separated by blank lines on purpose: WhatsApp renders them as blocks.
  opening: `Hey! 😊 Of course, we'd be happy to help.

We have two options, depending on your situation:

*TFN: $220*
Our team will fully review your tax return, including your tax residency, Medicare and all eligible deductions, to maximise your refund.

*TFN + ABN: $385*
This includes everything in the TFN option, plus a full business schedule covering your ABN income and expenses, all in one tax return.

Which option suits you?`,

  // Sent once the customer has chosen a track (Jo, 3 Sep). The prices and the
  // guarantee already went out in the opening, so this only confirms the total
  // for the chosen track and gives the bank details. Same shape for both
  // tracks; only the amount differs.
  price_tfn: `Perfect! Here are the payment details for the $220:
Account Name: Simple Tax Services
BSB: 062692
Account Number: 81049952

If your refund is less than our fee, we'll refund the difference. If you owe money to the ATO instead, the fee covers the work completed and is non-refundable.

Once you've made the payment, just send us a screenshot and we'll get started!`,

  price_tfn_abn: `Perfect! Here are the payment details for the $385:
Account Name: Simple Tax Services
BSB: 062692
Account Number: 81049952

If your refund is less than our fee, we'll refund the difference. If you owe money to the ATO instead, the fee covers the work completed and is non-refundable.

Once you've made the payment, just send us a screenshot and we'll get started!`,

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
    o1_refund_before_pay: `Absolutely 😊 Working out your expected refund is part of the review. We need to go through your full situation first before we can give you an accurate estimate, which is why we start the review once payment is made. And if you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn't refundable.`,
    o2_why_pay_first: `I completely understand. The reason payment comes first is that reviewing your situation and working out what you're entitled to is the main part of the service. If you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn't refundable.`,
    o3_thought_free: `I understand. We previously offered a free eligibility check, but we've changed how the service works. We now focus on giving you a proper review and personal guidance based on your situation, rather than just a quick eligibility check. That's why the service is paid upfront, and if you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn't refundable.`,
    o4_mygov: `Yes, absolutely, you can lodge your tax return yourself through myGov. The difference is that myGov is just where you lodge it. It won't review your situation, guide you on your tax residency, Medicare, or what you can claim, and make sure everything is correct. That's part of what we do, so you know everything has been properly reviewed and you're not left figuring it all out on your own.`,
    o5_too_expensive: `I understand. The fee covers the full review and personal guidance, so you're not left trying to work everything out on your own. And if you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn't refundable.`,
    o6_pay_after_refund: `Payment is made upfront because the review and personal guidance are the main part of the service, and that's where our work starts. Once payment is received, we can start going through your situation properly. And if you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn't refundable.`,
    o7_professional_question: `That's definitely something we can check for you. It depends on your individual situation, so we'd need to review your details properly before giving you an accurate answer. That's all included as part of the service once we get started.`,
    o8_simple_return: `I understand. Even with just one job, there's more to check than the income on your payslip. Your tax residency, Medicare, and what you're entitled to claim can still make a difference. Our fee is based on reviewing your situation properly and guiding you through it, not on how many jobs or payslips you've had.`,
    o9_no_refund: `No problem. If you get a refund and it comes to less than our fee, we refund you the difference. So if your refund was only $100 and our fee was $220, we'd refund you $120. If you owe tax instead of a refund, the fee covers our review either way and isn't refundable.`,
    o10a_why_not_accountant: `Of course, you can use an accountant. The difference is that we focus specifically on Working Holiday Makers and deal with situations like yours every day. Our team knows the common issues backpackers run into, things like tax residency, Medicare, ABN income, and work-related expenses, so the whole service is built around people in your situation.`,
    o10b_found_cheaper: `No worries, I completely understand. Just make sure you're comparing the same level of service. With us, you're not just paying to submit a tax return. Your situation is properly reviewed and you get personal guidance throughout the process. If you've found someone cheaper, just make sure you know exactly what's included before you decide.`,
    o11_think_about_it: `Of course, no problem. Before you go, is there anything you're unsure about or anything you'd like me to clarify for you? Happy to answer any questions before you decide.`,
    o12_ask_partner: `Of course, no problem. If there's anything you or your partner are unsure about, just let me know and I'm happy to clarify it before you decide.`,
    o13_one_question: `Of course, if it's a general question, I'm happy to help. It depends on your individual situation, we'd need to review your details properly before giving you an accurate answer, and that's included as part of the service. What would you like to know?`,
    o14_check_eligible_first: `Yes, that's exactly what we'll check as part of your review. Eligibility can depend on your individual situation, so we need to go through your details properly before giving you an answer. That's why the review starts once payment is made, and if you get a refund and it comes to less than our fee, we refund you the difference. If you owe tax instead of getting a refund, the fee covers our review either way and isn't refundable.`,
  },

  followups_pre_payment: {
    // Jo, 4 Sep. The old line was "still want us to take a look at your tax
    // situation? If anything about how the review works is unclear, just ask and
    // I'll happily explain." Two problems: "still" plants the doubt and invites
    // "actually, no", and the second half is the polite scaffolding the playbook
    // bans, which invites another round of questions instead of a decision.
    h24: `Hi {{1}}, just checking in about your tax return. Any questions? Otherwise, just say the word and we'll get started.`,
    // Jo, 4 Sep, his wording, after working through it line by line.
    //
    // WHO THIS IS FOR. Whoever is still here on day three is almost always the
    // customer who came NOT intending to pay and is weighing up doing it alone;
    // the one who came to pay has already paid. So it uses the single lever
    // that moves that person: not comfort, not thoroughness, but what they
    // stand to lose by doing it themselves, said without blaming them for
    // considering it ("most people", not "you").
    //
    // The guarantee is deliberately NOT here. It is said in full, both halves,
    // in the price message, at the moment they are about to pay. Half of it in
    // a nudge is the thing that went wrong before.
    //
    // Three nudges, three angles, no overlap: 24h is availability, this is
    // value, 7d is the door left open.
    d3: `Hi {{1}}, most people doing it alone miss things they could have claimed. That's exactly what our team helps you with.\n\nWant me to get you started?`,
    d7: `Hi {{1}}, last message from me 😊 If you want your tax looked at later, just text me any time.`,
  },

  payment_received: `Payment received!

Please fill out this quick form so we can start reviewing your situation:

https://workingholidaytax.com.au/tax-form

Once you've submitted it, we'll go through everything and get back to you within 24 hours.`,

  followups_form: {
    // Jo, 4 Sep: no number. The form is two steps, ten or so fields, a residency
    // declaration and two document uploads; anyone who has to find their TFN or
    // photograph a passport is well past five minutes, let alone two. Promising
    // a number we break at minute four, at exactly the point people abandon a
    // form, costs more than the friction it saves. "Quick to fill in" carries
    // the same message and cannot be held against us.
    h6: `Hi {{1}}, we haven't got your form yet. It's quick to fill in and we can start as soon as it's in.`,
    // Jo, 4 Sep: "if any question is confusing" opened the door to only ONE of
    // the three reasons a paid customer has not filled the form in. The others
    // are not having a document to hand and simply not getting to it, and
    // "anything is holding you up" catches all three in fewer words.
    d3: `Hi {{1}}, your review is waiting on your form. If anything in it is holding you up, tell me what and I'll sort it 😊`,
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
    d7: `Hi {{1}}, I haven't heard back, so I'll leave it here for now. Whenever you send your form, just text me and we'll pick it straight back up.`,
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
    // Jo, 4 Sep. The old line repeated the signature notice he had had a day
    // earlier almost word for word; he already knows it is ready. What he needs
    // is how close he is ("we're good to lodge") and the way out of the single
    // most common reason nobody signs: the email went to spam or to the wrong
    // address, which is why it names the EMAIL rather than a vague "it".
    h24: `Hi {{1}}, we just need your signature and we're good to lodge. Let me know if the email didn't reach you`,
    // Jo, 4 Sep. The angle moves with the likely reason: at 24h the guess is the
    // email never arrived, by day three he has seen it and something in it is
    // holding him back. Naming that, and offering to look, is what unblocks
    // somebody who is unsure rather than uninterested, and it says that signing
    // is not a point of no return.
    d3: `Hi {{1}}, once you sign, we lodge it with the ATO. If anything in it looks off, tell me and I'll check it.`,
    // Jo, 4 Sep. This is the most valuable stuck customer in the system: they
    // have paid, the return is finished and sitting there, and one signature is
    // all that stands between them and their money. "Still waiting on your
    // signature. Send it through when you can" was a third variation of the same
    // request with nothing new in it, and it gave away that fact. This says the
    // work is DONE and names the consequence plainly, without pressure.
    d7: `Hi {{1}}, your return is finished and ready to go, it just needs your signature.\n\nNothing gets lodged until it's signed, so send it through whenever you're ready.`,
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

