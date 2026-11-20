# What the 3-month Will export shows (15 Nov 2026)

Scope: all 679 conversations, read by script (structured features per conversation), not by
reading each chat. Counts only. The per-conversation file stays outside the repository because it
holds customer text.

## Engagement and payment
- 209 of 679 conversations (31%) paid.
- Customers who wrote 7 or more messages paid in about 70% of cases (195 of 279).
- Customers who wrote 6 or fewer paid in about 4% of cases.
- This is a correlation. Engaged customers are more likely to pay, so the lever is probably what
  gets a customer to keep talking, not the count itself.

## Speed and follow-ups
- The median reply time was 6 minutes for both paid and unpaid chats. Speed is not the difference.
- Unpaid chats had a median of 2 follow-ups. Paid chats had none. Follow-ups are sent to people
  who do not reply, so they are a symptom, but they add noise.

## Went cold
- 224 chats went cold. 10 of them later paid.

## Guard blocks (Will's drafts stopped before sending)
- FORBIDDEN_AMOUNT: 160 mentions. Most are personal figures (income, refund estimates) that the
  rule correctly blocks. Some are fixed prices ($220, $385) blocked in a stage where the price is not
  allowed. Review before loosening anything.
- REPLY_TOO_LONG: 81 mentions.
- LODGEMENT_BEFORE_SIGNATURE: 67 mentions.
- In 67 conversations, the team wrote a reply after a blocked or discarded Will draft.
- 105 conversations had at least one failed Will send.

## Next steps (need approval)
1. Check the 5 cases where $220 or $385 was blocked after the customer had paid.
2. Find what makes a customer send the seventh message, using the paid chats.
3. Reduce REPLY_TOO_LONG at the source: shorter replies instead of later cuts.

## Results of the three follow-up checks (15 Nov)
1. **Fixed-price blocks after payment**: 13 blocks of $220 (and one of $385) in 12 chats. All were in
   chats where the customer had already paid, mostly at the Lodged stage, and mostly when the
   customer asked whether they still owed money. A simple reply that restates the paid fee passes the
   guard (regression test added: `paid-fee-restate.test.ts`). The full drafts in the export are cut
   short, so the exact cause of each block cannot be reproduced from the export. Left open.
2. **What keeps a customer talking**: among chats with 3 or more customer messages (518):
   - Sent a document or photo: 76% paid (84 chats). This is the strongest signal we have.
   - Received a form or upload link: 54% paid (366 chats).
   - Asked about the price: 40% paid (507 chats).
   - Mentioned an ABN: 39% paid (453 chats).
   These are correlations. The hypothesis to test: asking for a document early brings the customer
   into the flow. Changing the flow needs your approval.
3. **Reply length**: the playbook already limits replies to under 40 words, and the guard blocks
   longer ones (81 mentions). No further change was made, because the rule is already in the
   instructions and its effect should be measured first.
