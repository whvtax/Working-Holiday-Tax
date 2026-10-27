# 003: SVT tax form and brand tagging (milestone 4)

Date: 26 Oct 2026. Status: accepted, staged behind a build flag.

## Context
The SVT form must reuse the shared backend (validation, uploads, CRM task, rate limits)
and every record must carry its brand. Two facts found while reading the code:
1. After a submission, `/api/tax-form` calls `notifyFormReceived`, which makes Will send a
   WhatsApp confirmation from the WHT number in WHT wording. For an SVT customer that would
   be a cross-brand message. Will becomes brand-aware in milestone 5; the SVT number does
   not exist yet.
2. Tax forms are stored in `crm_tasks`, which migration 047 did not cover.

## Decision
- Migration 047 also adds `brand` to `crm_tasks` (default 'wht', check constraint, index).
- The brand comes from the request Host header on the server (`brandFromHost`), never from
  the form body.
- `createTask` adds `brand` to the insert ONLY when it is 'svt'. WHT inserts are unchanged,
  so WHT keeps working before and after the migration is applied.
- SVT uploads go under an `svt/` path prefix in the same PRIVATE bucket.
- For SVT submissions, `notifyFormReceived` is NOT called until Will is brand-aware. An
  audit event `svt_form_received` is written instead so staff see it and follow up by hand.
- The SVT host keeps every API closed unless the build has `SVT_FORMS_ENABLED=true`, which
  opens exactly `/api/tax-form` and `/api/tax-form/upload`. The SVT `/tax-form` page shows
  the form only in that build; otherwise it points to WhatsApp.
- CRM: tasks read `brand` (missing column = 'wht') and show an SVT badge. Staff-only.

## Order to go live (all need Jo)
1. Back up the database, apply migration 047.
2. Will brand-aware (milestone 5) and the SVT WhatsApp number connected.
3. Set `SVT_FORMS_ENABLED=true` in Vercel and redeploy.

## Consequences
- Nothing changes for WHT customers or WHT data at any step.
- An SVT submission before step 2 cannot happen: the flag is off.
