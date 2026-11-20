# Will go-live checklist (15 Nov 2026)

Status of the code: all tests pass (471 suites), type check is clean, and the release zip excludes
secrets, node_modules and git data. Nothing here has been deployed or tested against production.

## Owner decisions needed first
- [ ] Approve the release zip, or the commit and push to a separate branch.
- [ ] Approve the follow-up wording (one-word question) and submit its templates to Meta.
- [ ] Approve sending customer invoices to the model for expense PDFs.
- [ ] Decide whether to delete the original invoice files after a PDF is saved (not done; needs explicit approval).
- [ ] Decide where the expense PDF button lives (currently: Documents card on the CRM task).

## Meta (Jo, in WhatsApp Manager and Meta Business settings)
- [ ] Check the account quality rating (98 quality holds in the export).
- [ ] Fix or remove the templates that do not exist in the translation (74 errors).
- [ ] Clear the billing problem if it is still open (28 errors).
- [ ] Remove win-back templates if they are no longer wanted.

## Checks before switching anything on
- [ ] Run the review flow once with a test number (refund not landed, then landed).
- [ ] Open the expense PDF button on a test task and confirm the summary page and receipts.
- [ ] Call /api/will/metrics as the owner and confirm the four numbers look sensible.
- [ ] Confirm /api/crm/file refuses a will-internal path to anyone without a CRM session.

## Rollout
- [ ] Run in supervised mode for two weeks: drafts go to the team for approval.
- [ ] Review the four metrics weekly: reply after follow-up, team messages per paid customer,
      failed sends by kind, failed model decisions.
- [ ] Widen only when the numbers hold for two weeks in a row.

## Known gaps (kept on purpose)
- "I am out, thanks" is not detected as leaving.
- Amended returns and cash work have few Library entries.
- Stuck sends (QUEUED or SENDING) have no root cause yet; needs production logs.
