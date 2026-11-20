# Business logic, data integrity and privacy report: WILL MIA ATLAS

## Verified in code
- **Mia stage moves use Will's state machine.** `moveMiaCustomer` calls `setState` under `withBrand('svt')`, so the rules that apply in the CRM apply to Mia.
- **Mia drafts never send.** `saveMiaDraft` stores a `PENDING_APPROVAL` message with reason `svt_number_not_live`.
- **Mia pause is separate.** `setMiaPaused` writes the `mia_paused` setting only.
- **Access logging without identifiers.** `recordDataRead` stores session id, masked IP, device, and a whitelist of non-identifying parameters. The module states that it never holds names, phone numbers, search text, or file names.
- **Export requires a session.** `/api/will/export` checks `sessionValid()`.
- **Retention and orphan cleanup exist.** `orphan-uploads.ts` and `orphan-sweep-run.ts` remove unreferenced storage objects. Retention periods for customer records are NOT documented in code.
- **Atlas actions need a human click** (see TRUST_BOUNDARIES TB-6).

## Findings
- **BL-1 (Low): Atlas sends a summary to the model provider.** `loadMorningReport` feeds a report into `askAtlas`. Names may be in the report. This is a privacy disclosure to a third party. Recommend recording it in the privacy notice and minimising the report fields sent. Not changed.
- **BL-2 (Low): Seed overwrite changes live message templates.** Recorded and audited now. See WMA-02.
- **BL-3 (NOT VERIFIED): customer deletion and retention.** The code has deletion paths in the store, but no documented retention period. Decide a period and record it.
- **BL-4 (Info): duplicate customers.** Dedupe migrations exist (`017_leads_dedupe.sql`). The live effect was not checked.

## Not reviewed in this pass
- Form-to-CRM mapping for every field, bulk export limits on every list route, and the brand-data separation tests beyond the existing suite.
