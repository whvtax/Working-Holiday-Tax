# Regression test plan: WILL MIA ATLAS

Run these before promoting FINAL59 (or any later build) to production. Each step records pass or fail; nothing is marked passed unless it was run.

## Automated (repo)
1. `npx tsc --noEmit`: must pass.
2. `npm run lint`: must pass.
3. `npx jest --forceExit`: must pass (last run: 479 suites, 6,452 tests, 2 skipped).
4. `npm audit --omit=dev --audit-level=high`: must report 0 high.
5. `node scripts/security/full-code-audit.mjs --no-audit`: must report 0 high.
6. `node scripts/package-release.cjs --check-only --profile deploy`: must pass.

## Build (Vercel preview, not local)
7. `next build` completes with the Google Fonts fetch available.
8. Preview deployment loads `/`, `/crm`, and `/crm/mia` without console errors.

## Manual on preview (owner, with synthetic or test customers only)
9. CRM login with a new OTP. A wrong code five times is refused.
10. Mia: move a test customer between two stages. The change shows in the CRM too.
11. Mia: save a draft message. Confirm nothing is sent to WhatsApp (status `PENDING_APPROVAL`).
12. Mia: generate an expense PDF for a test customer. The file opens through the CRM file view.
13. Atlas: ask a question; confirm the proposal is shown and nothing runs until Approve.
14. Cross-site check: send a POST to `/api/mia/move` with an `Origin` of another site. Expect 403 `bad_origin`.
15. Will seed: run the sync once on the preview. Confirm an audit row `library_sync_overwrite` is written.
16. Partner creation: create a partner whose name has no letters or digits (for example, emoji only). The generated code starts with `PTR` and is unique.
17. Form submission on the SVT form (test data): arrives in CRM as an SVT task.

## Production (after all of the above pass)
18. Deploy. Repeat steps 9, 10, and 14 on production.
19. Watch Vercel logs for 24 hours for new `[will seed]` or `bad_origin` lines.

## Rollback
- Vercel: promote the previous deployment. No database change is part of FINAL59, so rollback is a deploy switch only.
- Migration 050 is not part of this zip and was already applied; do not roll it back.
