# Template review with Jo (started 18 Nov 2026)

Rule for every template: can it be shorter, sharper, simpler, or convert better? Customer first name when there is one.
Destination: WILL = free text inside the 24-hour window only. META = also a WhatsApp Manager template (outside the window).
English is final here. Other languages are written after the English pass, then all go into the Templates tab, then one PDF per language with what to enter in Meta.

| # | key | destination | approved English | notes |
|---|-----|-------------|------------------|-------|
| 1 | opening | WILL | see below | FINAL. No name: "Hey! Happy to help😊" |

Formatting rule (Jo, 18 Nov): every template keeps its real line breaks, a blank line between paragraphs, never one block. Emoji at the end of the greeting line, no space before it.

Name rule (Jo, 18 Nov): the customer's name appears once per conversation, in the opening, and again in follow-up reminders. Not in every message.

Emoji rule (Jo, 18 Nov): one emoji at the start of the conversation. After that only now and then, where it fits completely.

### 1. opening (FINAL, WILL only, LOCKED in code 18 Nov)
```
Hey {{name}}! Happy to help😊

Did you work for employers only (TFN), or also on an ABN (Uber, self-employed)?
```

### 2. prices (FINAL, WILL only, LOCKED in code 18 Nov)
Sent only as the reply to a price question, so always inside the window. No name, no emoji.
```
Two options!

*TFN: $220*
We check your tax residency, Medicare and deductions then prepare and lodge your return so you don't miss anything you're entitled to.

*TFN + ABN: $385*
Everything above, plus your ABN income and expenses.

Which one fits you?
```
The two headings keep WhatsApp bold (as before). Jo to confirm bold or plain.

### Decision (Jo, 18 Nov): the two-message price flow is the standard, for every language
Message 1 explains the steps and asks; message 2 (bank details) goes only after a yes, three to five minutes later.
The one-message price (price_tfn and the others) stays in the code behind the System & Costs switch.

### 3a. price flow, message 1, TFN (FINAL, WILL only, LOCKED in code 18 Nov)
```
Got it, TFN option! Here's how it works:

1. Pay $220.
2. Fill out a short form (details, expenses, Medicare & tax residency test).
3. We prepare your tax return and send it for review and signature.

If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.

Shall I send the payment details?
```

### 3b. price flow, message 1, TFN + ABN (FINAL, WILL only, LOCKED in code 18 Nov)
No guarantee sentence (TFN-only returns).
```
Got it, TFN + ABN option! Here's how it works:

1. Pay $385.
2. Fill out a short form (details, expenses, Medicare & tax residency test).
3. We prepare your tax return, including your ABN income and expenses, and send it for review and signature.

Shall I send the payment details?
```

### 3c. price flow, message 2, payment details (FINAL, WILL only, LOCKED in code 18 Nov)
Sent three to five minutes after the customer's yes. Amount is $220 or $385 by track.
```
Perfect, here are the payment details:

BSB: 062692
Account: 81049952
Amount: $220

Send a screenshot once paid and we'll get started!
```

### Decision (Jo, 18 Nov): fixed fees only
No special prices and no discounts. The "price the team quoted" rule is removed from the playbook.

### 4. payment_received: IN DISCUSSION, not approved, not in code.

### 4. payment_received (FINAL, approved by Jo 18 Nov, LOCKED in code)
WILL inside the window: free text with the form link on a "Start here" button (each customer's own link). The plain text with the link, and the Meta template, remain as fallbacks. Delay stays one to five minutes.
```
Payment received, thank you!

Please fill out this short form so we can start your tax return:
https://workingholidaytax.com.au/start

Once submitted our team will review everything and update you here.
```
Button version (text without the link line): "...so we can start your tax return." + button "Start here".

### Decisions 18 Nov
- Templates 1 to 6 all go from Will inside the 24-hour window (no Meta cost). Meta is the fallback only when the window is closed.
- A payment in another currency: the screenshot reader looks harder for an AUD figure; with none, the owner's task shows a rough AUD value and whether it is in the range of a fee (fixed rates, 15% either way). Will never confirms from a conversion.
- Rule (Jo): a wording Jo sends is a proposal. Lock only after an explicit "approved".
- Rule (Jo): number every point in replies so he can answer by number.
- Open discussion: the forms (Will and Mia) in all nine languages, and the language picker design on a phone.

### 5. form_received (FINAL, approved by Jo 18 Nov, LOCKED in code)
WILL inside the window. META needed when the customer submits the form more than a day after their last message (the existing Meta template must be edited to this wording and resubmitted).
```
Got your form, thank you!

Our team will review everything and get back to you.
```

### 6. residency_check (FINAL, approved by Jo 18 Nov, LOCKED in code)
WILL inside the window, with the page link on a "Tax residency test" button. META (template residency_check) when the window is closed: the Meta template must be edited to this wording and resubmitted (it currently takes the first name as {{1}}; the new wording has no name).
```
One quick check before we start your tax return.

You marked yourself as a Working Holiday Maker for tax purposes. Some people on this visa count as Australian tax residents instead, and it changes how the return is done.

Please read this short page:
https://workingholidaytax.com.au/y8vwp4bf7

Is your answer still correct?
```

Rule (Jo, 18 Nov): every template, button and behaviour built in this review applies to BOTH brands, Will (WHT) and Mia (SVT). No WHT-only features.

### 7. medicare (FINAL, approved by Jo 18 Nov, LOCKED in code)
WILL inside the window, with a "How to apply" button to Jo's video (both brands). META when the window is closed: the Meta template must be edited to this wording, with the same button, and resubmitted.
```
You weren't covered by Medicare, so you may be able to get a Medicare Levy Exemption.

Once you've applied send me a screenshot and we'll include it in your tax return.

If it isn't approved, the levy still applies.
```
Button: How to apply -> https://www.youtube.com/watch?v=oj7ZSOHAxJk

Decision (Jo, 18 Nov): no exception for Mia in the Medicare message. Same wording for both brands (the earlier SVT rewrite that waited for the Services Australia statement is removed).

## Template 10: estimate (estimate_invoice / estimate_payable), locked 18 Nov

- Refund: "Your estimated tax refund is {{AMOUNT}}.\n\nI'll send your tax return for final review and then for your signature."
- Payable: "The estimated amount payable to the ATO is {{AMOUNT}}.\n\nI'll send your tax return for final review and then for your signature.\n\nOnce it's lodged, our team will walk you through the ATO payment."
- No invoice in the message, no button (Jo: "not needed for now, maybe later"). No "Good news!", no emoji.
- Target: Will and Meta. The Meta template still has the old two-parameter wording until Jo enters the new one; then the send switches to one parameter (amount) and the invoice field becomes optional.
- de/ja still carry the old wording (invoice lines hidden at send); rewritten in the all-languages pass.

## Template 11: signature request (signature_ready), locked 18 Nov

- "Your tax return is ready! 🎉\nI've emailed it to you to review and sign so we can lodge it."
- Two lines with no blank line between them; no spam-folder line (Jo).
- Target: Will and Meta.

## Template 12: lodged confirmation, 18 Nov

- Two versions only, refund or payable (Jo: "there is no third version"). The "outcome not known" message (lodged_neutral) is no longer sent; when nothing on record says which, Mark Lodged asks the team R or P and stores the choice.
- Refund, locked: "Your tax return has been lodged! ✅\nYour refund should arrive in your bank account within 14 business days."
- Payable, locked: "Your tax return has been lodged! ✅\nWithin 14 days the ATO will email you a payment request.\nIf it doesn't arrive, message us here and we'll send it to you." (Jo chose "email you a payment request" after hearing the ATO calls it a notice of assessment.)

## Template 13: refund check-in (refund_checkin), locked 18 Nov

- "Hi {{1}}😊\nHas your refund landed in your account yet?"
- Sent 14 days after lodging (was 10), retry after 7 days unchanged.
- Refund customers only: no job is scheduled for a payable customer, and the send-time gate still blocks anyone who owes tax.
- Target: Meta (free text if the window happens to be open).

## Template 14: Google review ask (REVIEW_ASK_SHORT_MSG), locked 18 Nov

- "Great to hear! Could you leave us a quick Google review?🙏" with a "Leave a review" button (the link rides on the button; plain text with the link if Meta refuses the button).
- Two lines on a phone (Jo). Target: Will only (always inside the window).
- After the ask, a thank-you or "done" gets no reply from Will and no task (Jo). "Sí", "Sì", "Sim" now count as yes to the refund check-in.

## Google review metric, 18 Nov

- System & Costs shows "X of Y left a review (Z%)": Y = everyone asked; X = matched on the Google feed (first name + date) or said so in the chat ("Done!", "Erledigt", "書きました"...).
- Nobody gets a message for it: a "done" reply is recorded silently (no reply, no task).
- Gmail notification emails are not read: the app has no access to the inbox.
- 18 Nov: each brand has its own review link on the button: WHT https://g.page/r/CaWt4kV0UmY-EBM/review, SVT https://g.page/r/CW65-TcfMaArECE/review. The refund check-in reply, review ask and silent "done"/thanks handling now run for Mia too (the old SVT exclusions are gone). Free text only, never a Meta template.

## Template 15: handoff holding (handoff_holding), locked 18 Nov

- "I've passed this to the team, and they'll usually reply here within one business day." (Jo's wording; no nudge invite, no emoji).
- Target: Will (window almost always open); Meta template kept as fallback.

## Template 16: handoff bump (handoff_bump), locked 18 Nov

- "Sorry for the wait. I've followed up with the team for you."
- Will only, free text, never a Meta template. Sent 23 hours after the customer's last message (moves if they write again); skipped if the window is somehow closed. Not sent if the team answered or the task is closed.

## Template 17: 48h handoff apology, REMOVED 18 Nov

- Jo: "no need, remove completely". No stage 2 is scheduled; an old stage 2 job in the queue closes without sending. Removed from the Library seed and the Meta template list (the bump has no Meta template either).

## Follow-up 1: pre-payment nudge (fu_pre_24h), locked 18 Nov

- "Hey {{1}}😊\n\nJust checking in on your tax return. Anything I can explain before you get started?"
- Timing (Jo): 20 to 23 hours after the customer's last message, so it is free text inside the 24h window. Inside that band: earliest moment 5pm to 11pm Sydney; else daytime (7am to 5pm) as late as possible; else (band entirely at night, customer wrote 3am to 8am) the end of the band. Not held for the 7pm follow-up window. Falls back to the Meta template if the window has closed.

## Follow-up 2: bank details already sent (fu_price_sent), locked 18 Nov

- "Hi {{1}}😊\nDid the transfer go through on your end?" (Jo's wording, two lines, no blank line).
- Same 20 to 23 hour free-text timing as follow-up 1 (it takes follow-up 1's slot for anyone who has the bank details).

## Follow-up 3: last pre-payment nudge (fu_pre_3d), locked 18 Nov

- "Hi {{1}}😊\nIf you need help with your tax return later on, just message me here." Meta only (3 days, window closed).

## Follow-up results metric, 18 Nov

- System & Costs, "Follow-ups before payment": per step (1, 2, 3) how many leads got it, how many paid after it, the rate, and how many paid with it as the last nudge. Last 12 months, from the follow_up_sent audit rows and the first PAID in the state history. For deciding in a few months whether to keep, change or remove each step.

## Follow-up 4: form not filled, 6 hours after payment (fu_form_6h), locked 18 Nov

- "Hi {{1}}😊\nDid you get a chance to fill out the form yet?" No button (the form link is in the message just above).
- Will only: free text inside the 24h window, never a Meta template; skipped if the window has closed. The promised-day check-back that reuses this text is unchanged.

## Form reminders after 3 and 7 days, REMOVED 18 Nov

- Jo: "one follow-up after 6 hours is enough; if he didn't fill it in, that's his business". The form flow is now only fu_form_6h. Removed from the cadence, the Library seed and the Meta template list. A date the customer names themselves still gets its one check-back.

## All follow-ups: free text while the window is open, 18 Nov

- Jo's standing rule (check free text before any paid template) applied to every follow-up: deliverOut sends the text while the 24h window is open and the Meta template only after it closes.

## Form check-back, REMOVED 18 Nov
- Jo: "remove that too". A date the customer names for the form no longer arms a check-back.

## Follow-up 5: signature reminder (fu_sig_24h), locked 18 Nov
- "Hi {{1}}😊\nDid you get a chance to review and sign your tax return?"
- One reminder only, 18 hours after the "ready for signature" notice. The 3-day and 7-day reminders and the named-day check-back are removed ("from here it is the customer's business"). Free text if the window is open, otherwise the Meta template.

## Template 18: prices with foreign income (prices_foreign), locked 18 Nov
- "With foreign income, there are two options:\n\n*TFN: $330*\nWe check your tax residency, Medicare and deductions, include your foreign income, then prepare and lodge your return so you don't miss anything you're entitled to.\n\n*TFN + ABN: $495*\nEverything above, plus your ABN income and expenses.\n\nWhich one fits you?"

## Our address, 18 Nov
- Anyone who asks for our address (bank transfer, international payment, or anything else) gets: "Our address is 98 George Street, Sydney NSW 2000, Australia." Library entry (knowledge seed, intent "our business address for a payment") and the playbook; no longer handed to the team.

## Template 19: two-message flow with foreign income, locked 18 Nov
- PRICE_FLOW_STEPS_TFN_FOREIGN ($330) and PRICE_FLOW_STEPS_TFN_ABN_FOREIGN ($495), no guarantee line; the "yes" brings the payment details with Amount: $330 / $495, 3 to 5 minutes later. Foreign income is no longer excluded from flow B.

## Template 20: ABN questions (request_abn), locked 18 Nov
- "A few quick questions about your ABN income:\n\n1. What work did you do?\n2. Do you have invoices or records of what you earned?\n3. Any work expenses you can show proof of payment for?" Numbered so the customer can answer by number. Will and Meta.

## Template 21: documents received (documents_after_payment), locked 18 Nov
- "Perfect, got it all, thank you!" (no emoji mid-conversation). Will only; removed from the Meta template list.

## Template 22: refund not yet (refund_not_yet), locked 18 Nov
- "No worries, the ATO sometimes needs a bit more time." No number (the lodged message says 14 business days), no promise. Will only. The 7-day repeat check-in still runs.

## Template 23: card payment link, locked 18 Nov
- offer unchanged: "No problem! Would you prefer to pay by card through a payment link? It works from any country."
- name: "Great! What's your full name for the payment link?"
- ready: "Thanks! We'll send you the payment link shortly." (Jo kept "shortly"; no emoji). Will only.

## Template 24: couple (couple), locked 18 Nov
- "Of course, happy to help you both!\n\nEach of you just needs to message us from your own WhatsApp, so your details stay private.\n\nThe fee is per person: $220 for a TFN return, or $385 with ABN income."
- Never a price twice (Jo): when any price already went out in the chat, the fee paragraph is left out. With foreign income the fee line says $330 / $495.

## Template 25: superannuation not available (no_dasp), locked 18 Nov
- "Sorry, our superannuation (DASP) service isn't available at the moment, but we're happy to take care of your tax return." Also the two Library answers about DASP.

## Template 26: Medicare exemption did not work (medicare_cant_help), locked 18 Nov
- "Sorry to hear that. The exemption is handled by Services Australia, so we can't help with it directly.\n\nWe can go ahead without it, and the Medicare levy will just stay on your return. Is that ok with you?" Will only.

## Translations match the English, nothing added (Jo, 18 Nov)
- "Everything should be like the English." The extra residency sentence ("our team will verify this when preparing your return") is removed from de, ja, fr, it and es. Any future translation says what the English says, no more and no less.

## All nine languages for both brands (Jo, 18 Nov)
- "All the languages are for both Mia and Will." Working holiday makers and students both get Will/Mia in their own language (en de ja es fr it pt zh vi). No brand + language restriction anywhere.
- Links point to the page in the customer's language when that page exists (residency test, form).

## Working rule: check before asking (Jo, 18 Nov)
- Before putting a question to Jo, look for the answer in the code, in this decisions file and earlier decisions, and in ATO information. Ask only what is genuinely his to decide and not answered anywhere.

## Will and Mia are one product (Jo, 18 Nov)
- Same engine, same rules, same languages, same templates, same everything. Mia exists only because people like a specialist for students. The only differences: the WhatsApp number, the brand name and links, and a few short answers that are specific to students (for example OSHC is not Medicare). Anything built for one is built for both, without asking.

## Security audit open highs, 18 Nov
- R134: the nine Library answers now say "On the TFN only option, if your tax refund is less than our fee..." (the wording already approved in another answer). Live Library rows update on "Sync library from file".
- R135: Jo keeps the signing-account temporary password in the two answers ("it's just a password, it's fine"). Closed as accepted by the owner.
- .env.example restored with variable names only (no values).

## New Meta template names, 19 Nov
- Jo deleted every template in Meta; a deleted name is locked for 30 days, so all templates are entered again as "wm_" + the internal name (wm = Will and Mia). The prefix is added only on the wire to Meta (channel.ts metaWireName) and stripped when Meta's list is read; Library keys, tasks and audit keep the internal names. Only wm_ templates count as ours in the health check.
- Upload: the separate kit meta-templates-upload-kit-19nov.zip (script + templates.json + PDFs), never in the production zip.

## 20 Nov 2026: Mia on her own number and her own Meta account
- Mia (SVT) has her own WhatsApp number 0431 667 124 (amaysim eSIM, API only, no phone app, no 14-day rule), in the SVT business portfolio, with her own Meta app "Student Visa Tax" and system user "Mia API".
- Configured by Vercel env vars only (values never in code): SVT_WHATSAPP_PHONE_NUMBER_ID, SVT_WHATSAPP_WABA_ID, SVT_WHATSAPP_TOKEN, SVT_META_APP_SECRET. Will's vars are untouched.
- The webhook accepts the signature of either app (META_APP_SECRET or SVT_META_APP_SECRET).
- Template names: the original names (no wm_ prefix), because SVT is a new Meta account. Upload with the kit and --brand svt.
- Every SVT site link points to 0431 667 124; the policy guard allows it as Mia's own number.
- The old facebook-domain-verification meta tag was removed from the WHT layout; both domains are verified by DNS in the SVT portfolio.
