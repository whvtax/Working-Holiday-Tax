# Will rulebook v1 (November 2026)

Source: a review of 679 WhatsApp conversations (16,830 messages, 20 Aug to 15 Nov 2026), read from a private export. This file holds aggregate numbers and rule wording only. No names, phone numbers or message text from customers is stored in the repo.

## What the review found (aggregate)

- After payment, the team (JO OR TEAM) sent 3,315 replies and Will sent 2,188. Target for Will is most of the post-payment work, with the team only for real decisions.
- 40 paid customers ended on an unanswered message. 81 conversations ended on a customer message with no answer, 66 of them more than a week old.
- 488 handoffs to the team. The largest causes: a paid customer sent a file and needed no answer (50); a form requested before signing (12); a file stuck in "waiting for signature" (12); a silent message no mechanism picked up (11); a message that never reached the customer (8).
- 196 send failures. The most common was the payment-received message with the form link (22 failures).
- 72 repeated identical Will messages across 60 conversations.
- 49 review requests went out directly after a customer's thank-you, before any refund.
- One lead wrote "thanks, found someone else" and got a sales reply.

## Rules

| ID | Rule | Status |
|---|---|---|
| L1 | A lead who is leaving gets one short goodbye: no price, no fee, no refund talk, no question, no "just reply here". | Implemented and wired in `service.ts` (decideAndAct), tests in `judgement-rulebook.test.ts`. |
| L2 | A thank-you that asks nothing gets a short thank-you reply, nothing more. | Existing (`thanksReply`, `isThanksLine`). Not re-tested in this batch. |
| R1 | Review timing (Jo, 15 Nov). Day 10: ask whether the refund arrived; a customer who owes tax gets nothing. Refund arrived: one message, the thank-you and the review ask together, once. No refund: ask again after 7 days, then the review ask. A bare thank-you after a refund someone already confirmed: one message with the review ask. A bare thank-you with no refund is never a review moment. | Wired in `service.ts` and `review-asks.ts` (retry 7 days; pull-forward 5 minutes). Tests in `judgement-rulebook.test.ts` and `review-flow-9nov.test.ts`. |
| F1 | A paid customer who sends a file gets an acknowledgement and the file is stored. It is not handed to the team. | Existing since 28 Aug (`document-drop.ts`: one task per burst, short acknowledgement). Most of the 50 export handoffs are probably older; to confirm by date. |
| A1 | Answer the customer's open question before moving to the next stage. | Prompt-level only. To do. |
| D1 | Do not resend an identical or near-identical message to the same customer. | Verbatim repeats are blocked (`wasAlreadySentVerbatim`). Near-duplicate check `isNearDuplicate` (0.9 word overlap) is written and tested but NOT wired: a silent drop would leave the customer unanswered, so it needs a human-task fallback first. |
| P1 | Before a payment-received message goes out, check the template and form link. | Root cause found: the export's failures on 19 and 28 Oct were Meta error 131042 (unsettled balance on the WhatsApp Business account). Not a code fault. Last such error 28 Oct; the code already re-queues it. Confirm the balance stays settled. |
| S1 | Keep replies short; a reply over the length limit is shortened before send. | Prompt-level. Length check not yet enforced in code. To do. |
| Y1 | Several tax years in one request (Jo, 15 Nov). Will uses judgement to split them. Each tax year is its own return, its own fee ($220 TFN only, $385 with ABN income), and its own folder of documents and PDFs (1 July to 30 June). The PDFs cover both expenses (one per category) and ABN income records (invoices issued and received), each with a summary page first. All PDFs are internal: saved with the customer's documents, never shown in the customer's tab, and never sent to the customer. A customer who sends three years of documents gets three returns, never one bundled return. Will confirms the years with the customer before any fee is quoted. | To do. Covered in the expense design below and in the Library answer for multi-year requests. |

## Compliance guardrails (apply to every rule)

- No tax verdicts, no refund promises, no predicted amounts. Follow the existing playbook.
- No "maximise" wording. The phrase "we'll refund the difference" is only used as the approved guarantee text.
- No em dashes or en dashes in customer-facing text.
- Personal data never goes into code, tests or docs.

## How this is "trained"

Will does not learn from the export by itself. The rules above reach Will in three ways: the playbook prompt (`playbook.ts`), deterministic guards that run after the model (`judgement.ts`), and the Library answers. A future step is an evaluation set: anonymised example exchanges with the expected action, run before any prompt or guard change goes live.

## Open item found in the review (not code)

98 messages were held by Meta with "In order to maintain a healthy ecosystem engagement". That is Meta's quality hold on template sends, usually from low recipient engagement. The latest was 6 Nov, so it is still happening. The fix is in the template volume to cold leads (follow-ups and win-backs), not in Will's wording. Check the WhatsApp quality rating in Meta Business Manager and cut sends to leads who have not replied.

## Next steps, in order

1. Check the Meta quality rating and reduce template sends to cold leads (see above).
2. Confirm the WhatsApp account balance stays settled.
3. Wire D1 with a human-task fallback, then test it.
4. Add a length check (S1).
5. Build the evaluation set from anonymised exchanges and run it on every change.

## Status update (15 Nov, later the same day)

- **M1, cap of three unanswered messages:** wired in `followup-gate-30oct.ts` for all follow-up flows, and in the review request job in `scheduler.ts`. Tests in `unanswered-cap-m1.test.ts`.
- **S2, lodged before signing:** fixed Library wording replaces the reply (en, de, ja). Other languages keep the team handoff. Tests in `judgement-rulebook.test.ts`.
- **D1, near-duplicate:** wired in `service.ts`. A near-copy of one of the last five messages becomes a team task with the draft. Not sent.
- **F2, malformed model answer:** retried once in `claude.ts` before it becomes an urgent task (the export had 47).
- **S1, length:** already in place. The engine asks the model for a shorter version once before any handoff.
- **Stuck sends:** the existing recovery turns a message stuck for 15 minutes into a one-click resend task. Left as it is on purpose: an automatic resend could duplicate a message. The cause of the stuck rows has not been found yet.
- **Win-back:** removed completely (files, scheduling, templates, Library entry, playbook rules, morning report fields, six test files).
- **Review ask after a thank-you:** one message, as described in R1.

## Status update (15 Nov, later)
- Behaviour evals: 100 anonymised cases in `src/lib/will/evals/behaviour-cases.ts`. One known gap ("I am out"), documented in the case file.
- Leaving-customer detector: added narrow English exit phrases. Broad phrases ("no need", "no thanks") were left out on purpose.
- Review gate: any thank-you without a landed refund blocks the review ask.
- Library: added entries for multi-year requests, missed years, ABN records, work expenses, gig-app earnings, and an ABN with no income.
- Multi-year (Y1): each tax year is its own return, fee and folder, confirmed with the customer before a total is quoted.
- Internal PDFs: built from invoice files on a CRM task, one per tax year and kind, saved under `will-internal/`. The model decides expense or ABN income, and an unreadable file is listed, never guessed.
- Analysis notes: `docs/engineering/went-cold-analysis-15nov.md` and `docs/engineering/meta-cleanup-15nov.md`.
