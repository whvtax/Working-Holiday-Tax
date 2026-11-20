# 13. Business logic audit

Sources: WILL-01 to WILL-07, WILLDATA-01, SITE-01, UI-01, SVTAPP-01, CONTENT and READ units, DEBATE-2 to DEBATE-5. Rows (Rnnn) refer to file 19.

## Business rules the reviewers checked against (from the audit brief)

- Prices: $220 TFN, $385 TFN+ABN, $330 and $495 with foreign income, $330 and $440 review.
- The refund guarantee applies to TFN-only returns.
- Nothing is sent to a customer without the policy guard.
- Free text only inside the 24-hour WhatsApp window.
- The business works under the supervision of a registered tax agent and must not say it is one.
- Working Holiday Tax and Student Visa Tax must not leak into each other.

## VERIFIED FACTS

- The engine, guard, scheduler, service and knowledge seed were read in full.
- No conversation was simulated. No message was sent. No price or tax statement was checked against an outside source.

## STATIC ANALYSIS CONCLUSIONS

### Prices

- Fixed texts, the model prompt, the guard's price list and the CRM show only the approved amounts (WILL-02, WILL-03, WILL-04, UI-01, SVTAPP-01).
- Open: the paid amount is accepted if it equals any fee, even when lower than this customer's track or quote (R102). Income mentioned inside a question can tip the quote either way (R126). The French language rules carry extra amounts (R146). One page shows $385 where the file's own rule says no price (R186).

### Guarantee (TFN-only)

- Code: the guard and the reply path strip or refuse the guarantee for ABN income, foreign income and an already-lodged return. Fixed on 18 Nov: the negated "not lodged" case, the partial-answer path, Student Visa Tax site text in three languages.
- Open wording: nine knowledge answers with no limit (R134, HIGH); "returns with TFN income" in about 100 places in five languages (R218); AI-crawler files (R054); two prompt lines (R096); three meta descriptions (R217); the CRM warning banner (R153); bands on TFN and Medicare pages (R219); a possible leftover in one Library message (R056).
- Accepted: the already-lodged detector fails toward "guarantee kept" in languages other than English (owner direction, WILL-06-F04).

### Policy guard before every send

- Normal replies, follow-ups, legacy autopilot replies and approved drafts are guarded, most of them twice (at decision and at send).
- Fixed: model-written holding reply (R071, HIGH); free-advice boundary line (R083); account-name stand-in to a silenced chat (WILL-03-F01 row).
- Open: hand-typed staff replies and the estimate link (R005); system sends built from Library rows (R066); partial hand-over reply skips later scrubbing (R085).

### Approval mode and silencing

- Only the exact Autopilot value transmits without approval. Kill switch read fails safe.
- Fixed: legacy and paused checks on three job kinds; fresh opt-out read at the transmit point; "Is that you?" answer only on Autopilot.
- Open: six job kinds send in Approval mode by design or oversight (R072).
- Accepted: pause and kill-switch races of seconds; the holding line under the kill switch is a written owner decision (R061).

### 24-hour window

- The guard fails closed on a missing timestamp; the scheduler re-checks with the real timestamp; Meta rejects out-of-window text and a card is raised.
- Open: a deferred reply that waits more than 24 hours (for example after a long pause) is still treated as inside the window (R062). The template-missing fallback matches Meta errors loosely (R068).

### Payment and stage

- A customer's typed "paid" or a payment picture moves the stage to Paid; "I signed" moves it to Signed. This is the owner's "trust the customer" rule (R063, open as a business decision; R103 accepted).
- Invalid jumps into Paid, Signed, Lodged or Completed by the model are held as conflict tasks.
- CRM: an amount payable is stored as a refund on the task (R174, open). Done resumes Will even for a chat paused on purpose (R175, open). Estimate and signature can be re-sent with no repeat guard (accepted, deliberate resend feature).

### Identity and records

- Public form merged into an existing client by typed email or phone (R007). Form linked to a chat by typed number unless enforcement is on (R008, R101).
- Knowledge answers: confirm bank details "even if your bank shows a different name" (R136); ask for refund bank details in chat (R137); promise to join a new number to an old file (R141); fixed temporary password (R135, HIGH).

### Agent status and service claims

- No sentence found says the business is a registered tax agent. Supervision wording is used.
- Open for the supervising agent: "We deal with the ATO directly" and similar lines (R185, R220); client agreement fee list and retention wording (R039); a 5.0 rating badge on the Student Visa Tax form that belongs to the other brand (R164).

### Refund figures and timing

- Refund timing appears as 10, 12 and 14 days and "two weeks" (R226, open). A refund range on two pages is owner-approved wording (accepted, READ-17-F02 row). Several knowledge answers conflict with the language rules of 18 Nov (R139).

### Brand separation

- Enforced at host routing, lookups and the transmit point. One untagged knowledge answer about working holiday withholding was tagged for Working Holiday Tax only (fixed). The shared Library is a recorded owner decision (accepted).
- Open before Student Visa Tax launch: R016, R124, R201.

## HYPOTHESES

- A customer who knows the rules could obtain the paid-stage form link without paying. The debate pass records the cost as one form link, with the bank account checked by staff before lodging.

## UNVERIFIED ASSUMPTIONS

- That staff check the bank account and the signing platform before lodging, as the accepted decisions assume.
- That the Library rows in the live database match the seed in the repository.

## NOT TESTED

- No end-to-end conversation, payment claim, approval flow or follow-up cadence was run.
