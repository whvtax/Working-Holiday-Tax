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
Our team will fully review your tax return, including your tax residency, Medicare and all eligible deductions, to maximise your tax refund.

*TFN + ABN: $385*
Everything included in the TFN option, plus a full business schedule covering your ABN income and expenses, all combined into one tax return.

In both cases, if your refund is less than the fee, we'll refund the difference. If you owe tax, the fee covers the review and is non-refundable.

Which option suits you?`,

  // Sent once the customer has chosen a track (Jo, 3 Sep). The prices and the
  // guarantee already went out in the opening, so this only confirms the total
  // for the chosen track and gives the bank details. Same shape for both
  // tracks; only the amount differs.
  price_tfn: `Perfect! The total is $220.

Here are the payment details:
Account Name: Simple Tax Services
BSB: 062692
Account Number: 81049952

Once you've made the payment, just send us a screenshot and we'll get started!`,

  price_tfn_abn: `Perfect! The total is $385.

Here are the payment details:
Account Name: Simple Tax Services
BSB: 062692
Account Number: 81049952

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

  // Sent automatically to a TFN + ABN customer right after their form comes in
  // (Jo, 3 Sep), as a second message after the form-received confirmation. It
  // asks for what the business schedule needs. Also in the Library (req_abn)
  // so it can be re-sent by hand.
  request_abn_detail: `Just a few quick questions about your ABN income:

• What type of work did you do?
• Do you have any invoices or records of your ABN income?
• Did you have any work-related expenses that you can provide proof of payment for?`,

  request_expenses: `Hey! I can see you mentioned having some work-related expenses. Could you please send me any receipts or invoices you have for them here on WhatsApp?`,

  request_missing_doc: `Hey! I've gone through everything and we're just missing your {{DOCUMENT}}. Could you please send it here on WhatsApp? Once we have it, we can continue with your tax return.`,

  medicare_exemption: `Hey! Since you weren't covered by Medicare, you can apply for a Medicare Levy Exemption. It only takes a few minutes. Here's a quick guide:

https://youtu.be/oj7ZSOHAxJk?si=KDMFlLoR0jYdpulB

Once you've applied, send me a screenshot of the application and we'll include the exemption in your tax return. If the application isn't approved, the Medicare Levy will still apply.`,

  estimate_ready: `Hey! We've now gone through all your details and completed the review of your tax situation. Based on everything we've checked, your estimated tax refund is {{AMOUNT}}.

We'll now send everything for final review. Once approved, I'll send it to you for signature. I'll let you know as soon as it's ready.`,

  // Matches the Meta-approved `signature` template word for word (Jo, 3 Sep),
  // so the customer gets the identical text inside and outside the 24h window.
  signature_ready: `Your tax return is ready! 🎉
I've emailed it to you for review and signature.`,

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

