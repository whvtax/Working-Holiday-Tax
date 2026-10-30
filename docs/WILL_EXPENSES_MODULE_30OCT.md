# Will expenses module, 30 Oct

Jo, 30 Oct: all expenses are fully Will's (and Mia's for Student Visa Tax, same engine and same flow). Will collects, never decides. The tax agent and Jo decide in the review.

Source of truth for the wording: `EXPENSES_INTAKE_MSG` and `EXPENSES_DONE_MSG` in `src/lib/will/approved-messages.ts` (English, German, Japanese). The playbook block is "EXPENSES: ALL OF IT IS YOURS". Library entries: "work expenses intake after payment" (en, de, ja), "what can i claim before paying" (en, de, ja), car trips, expenses mentioned after ticking No, and the existing clothing, courses and tolls entries (reworded to avoid "claimable").

## Flow

1. When: a paid customer whose form is in, or any paid customer who mentions expenses earlier. Will asks once, in one message, for everything. An unpaid customer asking "what can I claim?" gets a SHORT answer only (Jo, 30 Oct): anything they used for work and paid for themselves, with no reimbursement, may be claimable (always "may"), and after payment we ask for everything in one message and go through it with them. Never the intake, never the logbook or receipts detail, before payment.
2. What Will asks for:
   * What they spent on for work: phone or internet, car or kilometres, bike or scooter or rental car, tools, uniform or protective clothing, courses, licences, registrations, union fees, working from home.
   * Car and fuel (Jo, 30 Oct): whenever the customer mentions fuel receipts or any car expense, Will (1) checks the trips: home to work is NOT included, trips between work sites during working hours may be; (2) only for the between sites case, asks for a logbook (trip diary) covering up to 5,000 km (date, from, to, purpose, km; a notes app screenshot is fine) and explains the cents per kilometre method in one line: 88 cents per km, up to 5,000 km; (3) asks for the car details: registration number (rego), when it was bought, how much it cost, make and model, owned or rented. Always "may", never "will be accepted". Rental: invoices plus logbook. Rideshare and delivery: the app's yearly km report plus the earnings summary.
   * Working from home: a diary or timesheet with dates and hours.
   * Phone and internet: the bills and roughly what percentage is used for work (Will asks, never suggests a number).
   * Clothing (Jo, 30 Oct): ask what exactly was bought. For everyday clothing (jeans, trainers, black pants) Will asks whether it was compulsory at work or used for work purposes and records the answer. Will never decides eligibility and never promises it will be accepted; neutral wording only ("What can be claimed is confirmed in the review, before anything is lodged.").
   * Tools, courses, licences: receipt, or a bank statement with the item highlighted.
   * No receipts: a list of the items is fine up to $300; Will asks what the items were.
3. A customer who ticked No expenses in the form but mentions some later: collected anyway, no fuss.
4. When done, Will says once "Thanks, I have what we need on expenses." and the chat is the record. Will never promises what will be claimed, never gives a percentage, never says "claimable" or "no need".

## For the tax agent: verification list

Approved by Jo on 30 Oct (no further check needed):

1. Kilometre rate 88 cents per km and the 5,000 km cap (cents per kilometre method). Approved by Jo on 30 Oct.
2. The $300 rule: a list of the items is fine up to $300 without receipts. Approved by Jo on 30 Oct.
3. Phone and internet percentage: Will asks the customer for a rough work percentage and never suggests one. Approved by Jo on 30 Oct.

Still to verify by Jo or the registered tax agent:

4. Everyday clothing (jeans, trainers, black pants): collected on the basis "compulsory at work or used for work purposes". Will records the answer and never decides. This needs verification before anything is lodged.
5. Home to work travel and trips between sites. Will treats home to work as not included and trips between work sites during working hours as possibly included. Check the exceptions (carrying bulky tools, itinerant work).
6. Car details asked for the logbook: registration number, purchase date, cost, make and model. Check whether the agent needs anything else.
7. Rideshare and delivery: the app's yearly km report plus the earnings summary. Check what the agent needs for the ABN schedule.
8. Working from home: diary or timesheet with dates and hours. Check whether the agent wants anything else (fixed rate method records).
9. Rental car: invoices plus logbook. Check how a rental should be treated.


## Open points for Jo

* There is no structured "expenses collected" field: the chat is the record, so the team still reads the chat for the file. A field would need a change in the engine.
* The module triggers when Will next speaks after the form or when expenses are mentioned. There is no automatic message when the form comes in; the old automatic `request_expenses` text is unchanged.
