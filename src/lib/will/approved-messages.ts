// ============================================================
// Approved customer-facing messages, VERBATIM from the Master
// Build Spec (§6, §7). These seed the templates table and are
// embedded in the AI playbook. Nothing here may be reworded
// without the owner's approval (small natural adjustments by the
// AI are allowed per §8.29, but price/guarantee/policy meaning
// and tax boundaries never change).
// ============================================================

export const APPROVED = {
  opening: `Hey! 😊 We help hundreds of backpackers every year get their Australian tax sorted properly.
We'll check your tax residency, what you can claim, Medicare, and make sure you're not missing anything you're entitled to.
Quick question first: did you only work on a TFN, or did you also earn income through an ABN?`,

  price_tfn: `Perfect 😊
You'll get personal guidance and support from our team from start to finish, with everything reviewed properly for your situation. The total fee is $220.
If your refund is less than our fee, we'll refund the difference, so you're never out of pocket for our service.
Please make the payment using the bank details below:
BSB: {{BSB}}
Account: {{ACCOUNT}}
Once you've made the payment, just send me a quick message and we'll get started 😊`,

  price_tfn_abn: `Perfect 😊
Since you also have ABN income, you'll get personal guidance and support from our team for both your TFN and ABN income, with everything reviewed properly for your situation. The total fee is $385.
If your refund is less than our fee, we'll refund the difference, so you're never out of pocket for our service.
Please make the payment using the bank details below:
BSB: {{BSB}}
Account: {{ACCOUNT}}
Once you've made the payment, just send me a quick message and we'll get started 😊`,

  objections: {
    o1_refund_before_pay: `Absolutely 😊 Working out your expected refund is part of the review. We need to go through your full situation first before we can give you an accurate estimate, which is why we start the review once payment is made. And if your refund ends up being less than our fee, we'll refund the difference, so you're never out of pocket for our service.`,
    o2_why_pay_first: `I completely understand. The reason payment comes first is that reviewing your situation and working out what you're entitled to is the main part of the service. There's no risk of paying more than you get back. If your refund is less than our fee, we'll refund the difference, so you're never out of pocket for our service.`,
    o3_thought_free: `I understand. We previously offered a free eligibility check, but we've changed how the service works. We now focus on giving you a proper review and personal guidance based on your situation, rather than just a quick eligibility check. That's why the service is paid upfront, and if your refund is less than our fee, we'll refund the difference so you're never out of pocket.`,
    o4_mygov: `Yes, absolutely, you can lodge your tax return yourself through myGov. The difference is that myGov is just where you lodge it. It won't review your situation, guide you on your tax residency, Medicare, or what you can claim, and make sure everything is correct. That's part of what we do, so you know everything has been properly reviewed and you're not left figuring it all out on your own.`,
    o5_too_expensive: `I understand. The fee covers the full review and personal guidance, so you're not left trying to work everything out on your own. And if your refund is less than our fee, we'll refund the difference, so you're never out of pocket for our service.`,
    o6_pay_after_refund: `Payment is made upfront because the review and personal guidance are the main part of the service, and that's where our work starts. Once payment is received, we can start going through your situation properly. And if your refund ends up being less than our fee, we'll refund the difference, so you're never out of pocket for our service.`,
    o7_professional_question: `That's definitely something we can check for you. It depends on your individual situation, so we'd need to review your details properly before giving you an accurate answer. That's all included as part of the service once we get started.`,
    o8_simple_return: `I understand. Even with just one job, there's more to check than the income on your payslip. Your tax residency, Medicare, and what you're entitled to claim can still make a difference. Our fee is based on reviewing your situation properly and guiding you through it, not on how many jobs or payslips you've had.`,
    o9_no_refund: `No problem. If your refund is less than our service fee, we'll refund the difference. So if your refund was only $100 and our fee was $220, we'd refund you $120. That way, you're never out of pocket for our service.`,
    o10a_why_not_accountant: `Of course, you can use an accountant. The difference is that we focus specifically on Working Holiday Makers and deal with situations like yours every day. Our team knows the common issues backpackers run into, things like tax residency, Medicare, ABN income, and work-related expenses, so the whole service is built around people in your situation.`,
    o10b_found_cheaper: `No worries, I completely understand. Just make sure you're comparing the same level of service. With us, you're not just paying to submit a tax return. Your situation is properly reviewed and you get personal guidance throughout the process. If you've found someone cheaper, just make sure you know exactly what's included before you decide.`,
    o11_think_about_it: `Of course, no problem. Before you go, is there anything you're unsure about or anything you'd like me to clarify for you? Happy to answer any questions before you decide.`,
    o12_ask_partner: `Of course, no problem. If there's anything you or your partner are unsure about, just let me know and I'm happy to clarify it before you decide. I'll leave everything here for you in the meantime.`,
    o13_one_question: `Of course, if it's a general question, I'm happy to help. It depends on your individual situation, we'd need to review your details properly before giving you an accurate answer, and that's included as part of the service. What would you like to know?`,
    o14_check_eligible_first: `Yes, that's exactly what we'll check as part of your review. Eligibility can depend on your individual situation, so we need to go through your details properly before giving you an answer. That's why the review starts once payment is made, and if your refund is less than our fee, we'll refund the difference so you're never out of pocket.`,
  },

  followups_pre_payment: {
    h24: `Hi {{1}}, still want us to take a look at your tax situation? If anything about how the review works is unclear, just ask and I'll happily explain.`,
    d3: `Hi {{1}}, the part most people miss on their own is what they're actually entitled to claim. That's exactly what our team goes through with you, and if your refund is less than the fee, we refund the difference.`,
    d7: `Hi {{1}}, last message from me 😊 If you want your tax looked at later, just text me any time.`,
  },

  payment_received: `Perfect, payment received! 🎉
Please fill out this quick form so we can start reviewing your situation: https://workingholidaytax.com.au/tax-form
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

  medicare_exemption: `Hey! Since you weren't covered by Medicare, you can apply for a Medicare Levy Exemption. It only takes a few minutes. Here's a quick guide: https://youtu.be/oj7ZSOHAxJk?si=KDMFlLoR0jYdpulB
Once you've applied, send me a screenshot of the application and we'll include the exemption in your tax return. If the application isn't approved, the Medicare Levy will still apply.`,

  estimate_ready: `Hey! We've now gone through all your details and completed the review of your tax situation. Based on everything we've checked, your estimated tax refund is {{AMOUNT}}.
We'll now send everything for final review. Once approved, I'll send it to you for signature. I'll let you know as soon as it's ready.`,

  signature_ready: `Your tax return is ready! 🎉 I've emailed it to you for review and signature 📧`,

  followups_signature: {
    h24: `Hi {{1}}, your tax return is ready and just needs your signature before we can lodge it. Let me know if it didn't reach you 😊`,
    d3: `Hi {{1}}, once you sign, we lodge it with the ATO. If anything in it looks off, tell me and I'll check it 😊`,
    d7: `Hi {{1}}, your return is still waiting on your signature. Send it through when you can and we'll lodge it 😊`,
  },

  lodged: `Your tax return has been lodged successfully! 🎉 Your refund should arrive in your bank account within 14 business days.
If you have a minute, we'd really appreciate a Google review 🙏 {{REVIEW_LINK}}`,

  legitimacy: `Yes, absolutely! We operate under the supervision of a registered tax agent. You can find more details here: https://workingholidaytax.com.au/client-agreement`,
} as const;
