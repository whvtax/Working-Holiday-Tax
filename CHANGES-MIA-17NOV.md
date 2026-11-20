# Mia (SVT) + Will changes, 17 Nov. NOT DEPLOYED.

Before deploying:
1. Back up the database.
2. Run supabase/migrations/050_mia_tables.sql (creates mia_* tables; adds source columns to will_customers). Additive, existing rows unaffected.
3. Nothing is sent to WhatsApp for Mia: the SVT number is not live yet, so Mia messages are saved as not_sent.
4. Not yet browser-tested. Check /crm/mia before relying on it.

Included:
- Mia pipeline, chats, tasks, follow-ups, status bar (own Pause), stage moves (also mirrored to Will), client file with lead source kept, expense PDF (existing CRM endpoint), message save (not sent).
- Will: System faults show Mia faults tagged "Mia"; SVT leads block; removed cost/review/autopilot cards; Atlas: Accounting rename, Mia placed in CRM position.
- CRM dashboard: pause/resume Will and task lookup now pass the task's brand (SVT tasks match SVT customers only).

Not done:
- Mia forms link button; Mia signing flow beyond stage moves; Mia downloads/Learning verified end to end; SVT WhatsApp number and templates; follow-up 2 Meta template.

## Review (10 read-only agents) and fixes applied
Fixed:
- WHT monthly chart no longer includes SVT leads when no brand is given; the WHT block asks for brand=wht.
- Mia phone normalisation now matches Will (00 stripped, 7-digit minimum).
- Mia copy: a failed Will source update now fails the create instead of silently losing the lead source.
- Mia message draft no longer carries over to the next customer selected.
- Pipeline move: failed moves show a local message; the board reloads after a successful move.
- Expense PDF: amount validated; network errors handled.
- Mia API errors no longer return raw database text.
- Indexes added for the Mia chat list and pipeline.

Known, NOT fixed (decide or accept before production):
- Will System faults: Mia faults are wired but nothing yet writes Mia audit rows, so they will not appear. Harmless, but not working yet.
- Mia stage move: if the history write fails after the customer row changes, the two can drift until fixed manually. Needs one transaction (RPC).
- Mia pipeline and client file show at most 500 rows.
- Close-file question (isCloseFileQuestion) still matches the removed 7-day template; the final 3-day message is not treated as a close-file answer.
- Mia copy id differs from the Mia id (lookups use wa_id + brand, so this works, but do not upsert with the mapping in sync.ts).
- Stale 7-day comments and a seeded fu_pre_7d template remain (harmless).
- Migration 050 must run after 045 (service-role grants), or Mia tables will be denied.

## Decisions 17 Nov
- Follow-up 1 (24 hours) text, approved by Jo: "Hi {{1}}, just following up on your tax return. Is there anything you would like me to explain?" Needs a new Meta template before it is used in code.
- Follow-up 2 (3 days, last message): close-file question still open. Options were CONTINUE/CLOSE (recommended) or YES/NO. Needs a Meta template and a code update to read the reply.
- Follow-up 2 (3 days, last message), approved by Jo: "Hi {{1}}, if you have any questions or would like help in the future, feel free to reach out :)" The file closes automatically 3 days after this message if there is no reply. Needs a new Meta template before use, and the code text (approved-messages.ts, followups_pre_payment d3) must be updated to match.
- Open code item: isCloseFileQuestion still matches the removed 7-day template. Needs updating so replies to the new last message are handled correctly.
- Correction: the approved second follow-up does not ask "close the file", so isCloseFileQuestion (which matches only the removed 7-day text) no longer has a live purpose. Left in place, harmless. Remove in a later cleanup.

## Fixed in this round
- Mia faults: failed Mia saves and stage moves are recorded in Will's audit and appear in System faults as "Mia · ..." (rules added in system-report.ts). The separate tagged merge was removed so nothing is counted twice.
- Mia pipeline and client file read every row in pages, up to 10,000, and report if the list is cut. No more silent 500-row cap.

## Blocked
- Mia form link button: the tax-form link route only accepts WHT tokens (tax-form/link/route.ts checks brand === 'wht'). An SVT link would show as invalid. Needs the SVT questionnaire intake wired before the button is useful.

## SVT form (17 Nov)
- SVT form uses the same form as WHT: same questions, documents, steps, behaviour after signing.
- Differences only: SVT colours, SVT logo, student residency question, languages English, Chinese, Vietnamese.
- Google reviews badge and registration seal: same as WHT (Jo confirmed same company and agent).
- Signed token accepted on SVT host (tax-form and tax-form/link). Mia form-link route issues SVT links.
- Requires in production: SVT_FORMS_ENABLED=true, FORM_TOKEN_SECRET set, SVT_FORM page opened on studentvisatax.com.au.

## Architecture change (17 Nov, Jo's decision): shared tables
- Mia no longer has its own tables. SVT customers are will_customers with brand 'svt', SVT clients are crm_clients with brand 'svt', SVT tasks are crm_tasks with brand 'svt'. Nothing is copied.
- Mia screens are views of those rows. Stage moves use Will's setState (same rules and history).
- Migration 050 now only adds source columns (source, source_detail, source_at) to will_customers, plus one index.
- Messages typed in Mia are saved as drafts (PENDING_APPROVAL) and are not sent until the SVT number is live.
- Mia pause is a setting (mia_paused), separate from Will's pause.
- Removed: mia_* tables, the copy to Will, mia follow-up count, Mia promote route, task lock.
- Open: Mia tasks and client file are read-only views for now.
