# WHM form-submission block removed (27 August 2026)

Owner's instruction: "the WHM form-submission block — cancel it, delete it completely."

## It never took effect. No customer behaviour changed.

This is the most important line in this document. The feature was fully built across
four layers but was never wired to anything: no form ever called `/api/form-settings`,
and neither `WhmNoRefundScreen` nor `WhmSubmissionsToggle` was imported anywhere. No
working holiday maker was ever blocked from lodging, no one ever saw the explanation
screen, and no operator ever flipped the toggle. Removing it changes nothing that any
client or any staff member could observe. There is no rollout, no announcement and no
customer to notify.

## What was removed

DELETED:
- `src/components/ui/WhmNoRefundScreen.tsx` — the client-facing "no refund to claim"
  screen that was to be shown instead of letting a WHM lodge (106 lines, imported nowhere)
- `src/components/crm/WhmSubmissionsToggle.tsx` — the CRM operator override switch
  (112 lines, imported nowhere, never mounted on any dashboard)
- `src/app/api/form-settings/route.ts` — the public read endpoint the form was meant
  to call at submit time. No caller ever existed.
- `src/app/api/crm/settings/route.ts` — the authenticated GET/POST write endpoint.
  Checked before deleting (see below); it served this feature and nothing else.

EDITED:
- `supabase/migrations/014_form_settings.sql` — header comment added recording that the
  feature was removed on 27 Aug 2026 and that the table is now unused. The SQL itself is
  untouched.

## The `/api/crm/settings` route — why it went entirely

It was checked for other callers and other settings before deletion, and had neither:

- Its only caller in the whole codebase was `WhmSubmissionsToggle`, which is itself
  deleted.
- It touched exactly one table, `form_settings`, and exactly one column,
  `allow_whm_submissions`. There was no second setting to preserve.
- Its POST handler wrote `form_settings.whm_enabled` / `form_settings.whm_disabled`
  rows to `crm_audit`. Those audit actions can no longer be produced. Existing rows in
  `crm_audit` are untouched — but since the toggle was never mounted, there are none.

Despite its generic name, this route was not a general CRM settings endpoint. Nothing
else in the CRM reads or writes settings through it. Keeping an authenticated route
whose only job was reading and writing a column no code consults would leave a live,
writable endpoint behind a dead feature, so it went with the rest.

## What was deliberately KEPT

**The `form_settings` table, and migration `014`.** Not dropped, not deleted. The
migration has already run against production, and a migration that has run must not
vanish from history — a fresh database rebuilt from the migration folder has to pass
through the same states the live one did. Dropping a table is irreversible for the sake
of tidiness. The table now sits unused: one row, `allow_whm_submissions = false`,
nothing reading it and nothing writing to it. It is harmless where it is. Same reasoning
as the WhatsApp tables in `WHATSAPP_REMOVAL.md`.

**Everything that mentions WHM as a tax concept.** The site is a working-holiday-maker
tax business; the concept is the product. What was removed is one submission-blocking
*feature*, not the subject matter. Left completely alone:

- `src/components/ui/ResidencyStep.tsx` and `src/components/ui/ResidencyDeclaration.tsx`
  — the eligibility quiz and the declaration. These *classify* residency (resident vs
  WHM) and pass the verdict to the normal submit path. They never had any connection to
  the block and never gained one.
- The `taxStatus` field (`'resident' | 'whm'`) throughout `src/app/tax-form/FormClient.tsx`,
  `src/lib/submit-tax-form.ts`, `src/lib/intake-validate.ts` and the CRM dashboard.
- The three refund calculators (`en` / `de` / `ja`), which apply WHM tax rates.
- All blog content, SEO keywords and search synonyms about working holiday maker tax.
- `src/lib/formStrings.ts` — see the translation section below.

**The `whm_blocked` analytics event name** in
`src/app/api/analytics/funnel/route.ts` (`ALLOWED_EVENTS`). Left in place on the owner's
instruction. It is now an event name that nothing emits — the only code that would have
sent it was the explanation screen. It is one string in an allow-list, it costs nothing,
and removing it would narrow what `form_funnel_events` will accept for no gain. The
example queries at the bottom of migration 014 that count `whm_blocked` events will
therefore always return zero.

## Translation keys

**No translation keys were removed.** Worth stating precisely, because the copy question
here is not what it looked like:

`WhmNoRefundScreen` did not use `src/lib/formStrings.ts` at all. It carried its own
inline `COPY` object with six strings (`title`, `p1`, `p2`, `wa`, `again`, `note`) in
English, German and Japanese — eighteen translated strings in total, including two long
explanatory paragraphs per language. Those went with the component file. They are
recoverable from `WHM_BLOCK_REMOVED_BACKUP.zip` if the decision is ever revisited; they
are not recoverable from `formStrings.ts`, because they were never there.

The only WHM-specific key in `formStrings.ts` is:

    workingHolidayMakerTax   ('Working holiday maker for tax purposes' / DE / JA, line 364)

**It was kept.** It is not a key of the removed screen — the screen never referenced it.
It is a tax-status label belonging to the residency/`taxStatus` vocabulary, which is
explicitly out of scope. It currently has no caller in the codebase (it appears to be an
orphan from an earlier version of the residency wording, which now holds its labels
inline in `ResidencyStep` / `ResidencyDeclaration`), but that makes it a separate,
pre-existing tidy-up question about residency copy, not part of this removal. Removing a
tax-concept string on the way past would blur exactly the line the instruction drew.
Flagging it here so the decision is visible rather than silent.

## Environment variables now unused

None. This feature used no environment variables — it read its single flag from the
database. Nothing needs changing in Vercel.

## Database objects now unused

- Table `form_settings` (migration 014) — retained, dormant, one row. Drop it only as a
  deliberate, separate decision.
- Event type `whm_blocked` in `form_funnel_events` — still an accepted value, now never
  written. No rows exist with it.

## Reversible

`WHM_BLOCK_REMOVED_BACKUP.zip` in the project root holds all four deleted files plus the
original migration 014, at their pre-removal contents.

## Verified

`npx tsc --noEmit` clean · `npx jest --forceExit` green · no dangling imports and no
remaining references to `form-settings`, `allow_whm_submissions`, `WhmNoRefundScreen` or
`WhmSubmissionsToggle` anywhere in `src/`.
