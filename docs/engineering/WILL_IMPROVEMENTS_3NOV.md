# Will improvements from the 3 Nov report (140 conversations, 4224 messages)

Twenty parallel reviews of the 72 hour export. No customer names or numbers are kept here.

## Done in this release
- Today's date prompt now says whether 31 October has passed (tax-calendar.ts), so the "before 31 October / 15 May" wording is not used after it.
- Duplicate-send guard only looks back 6 hours, so a holding line is not swallowed because it was sent yesterday (channel.ts).
- payment_received no longer promises "within 24 hours" (code text; the Meta template must be edited by hand to match).
- Eight new Library answers: "I have signed", account name, paid less than the fee, documents after the form, two financial years, no Australian bank login, reply hours, ABN income in an earlier year.
- Attention report: only unanswered, blocked, discarded, failed and handed-over items, each with the customer message, Will's proposal and the reason; each download starts where the previous one ended.
- Tax form requires a real Australian mobile number (client and server).

## Open, ordered by how often it appeared
1. Approved texts that still say "within 24 hours" (PAYMENT_RECEIVED in i18n.ts and approved-messages.ts) although the playbook forbids that promise. Needs the Meta template and Library text changed together.
2. Price message and several templates omit the "Account Name" line; customers ask who they are paying.
3. English follow-up templates (fu_price_sent, fu_form_6h, fu_pre_3d, fu_sig_*) reaching German and Japanese customers; each needs a translated variant and the scheduler must not treat a missing lookup as approved.
4. Residency quiz and residency_check state a conclusion ("you count as a resident / Working Holiday Maker"); wording must stay neutral and a mismatch should open a team task.
5. Silence while the team is active (service.ts silence net): paid customers waiting 15 to 24 hours for questions the Library answers.
6. Failed payment_received or form-link sends are not repaired, so the form arrives days late. Retry or fall back to a text that includes the link.
7. Policy guard false positives: "I've signed" replies (LODGEMENT_BEFORE_SIGNATURE), "1 July" read as an amount (FORBIDDEN_AMOUNT), DIY_INSTRUCTIONS negation.
8. Payment amount is not compared with the fee (a short payment was confirmed).
9. Scheduler: any system message cancels pre-payment follow-ups; follow-ups ignore promised payment dates; signature follow-ups reach cancelled clients; refund check-ins go to customers who owe tax.
10. No automatic post-payment checklist for paperwork (passport, bank statement, highlighted statements, receipts, ABN invoices, Medicare answer). The Library now answers the question, but Will should send it unprompted once the form arrives.
11. Winback text can say "registered tax agent" in Japanese; WINBACK_SYSTEM must use the approved phrases only.
12. Meta error 130403 (customer blocked the number) is not mapped in send-errors.ts.
