# 014 Atlas command centre at /crm/atlas (internal, read-only)

Status: proposed for Jo's review (15 Nov 2026). Code is written behind the CRM login only.

## Why

Jo wants one screen after login that shows the last 24 hours across WHT and SVT: what Will handled alone, what needs a person, who is waiting, and which connected systems need attention. The design is the "Atlas" dashboard (globe in the middle, six modules around it, a status dot that turns red with a reason when something needs review).

## Decisions

1. Internal only. The page lives inside the existing CRM segment (`src/app/(site)/crm/atlas`), so the CRM login, idle logout and CSP apply. It is not linked from any public page and does not mention Student Visa Tax to customers.
2. Read-only. The page reads the same data the morning report reads (`buildMorningReport` over the existing store). It writes nothing, sends nothing and calls no external service.
3. No mock data in production. A figure is shown only when the code reads it from a real source. Anything without a source (bank lines, payment amounts, ATO due date, Mia drafts, Instagram, TikTok) shows "Not connected yet" and is never filled with a sample number.
4. Attention rules come from the existing report fields: customers waiting on us over an hour (`waitingOnUs`), paid customers stuck after payment (`stuckAfterPayment`) and blocked tasks (`blocked`). The status dot is lime when none of these is above zero and red, with the reason in a tooltip, when one is.
5. Globe and connectors are client-only drawing code. Reduced motion stops the rotation. The animation pauses when the globe is off screen.
6. Brand rules: no em dashes or en dashes in any interface text; labels in English.

## Alternatives considered

- Keep the standalone HTML file with sample data. Rejected: it shows numbers that are not real and cannot be checked against the CRM.
- Call the existing `/api/will/morning` route from the page. Rejected for now: it adds a second HTTP hop for the same data. The page calls the same store and builder directly.
- Add bank reconciliation or Xero reads now. Rejected: no accounting connection exists yet, and it needs its own decision record and credentials.

## Consequences

- The 06:00 summary, the bank line count, the payments amount and the ATO date are not live until their sources are connected in later decision records.
- Jo sees the page only after logging in to the CRM. No credentials are stored or needed in code.
- Deployment is Jo's call. Nothing is pushed by this change.
