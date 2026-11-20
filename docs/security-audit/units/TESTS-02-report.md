# TESTS-02 report

Unit: 373 smaller test files (the list has 373 entries; its last line has no newline, so `wc -l` says 372) (21,097 lines by the unit list). Purpose: security test coverage, not bugs in tests.
No test, build or project code was run. Only `grep`, `sed -n`, `cat -n`, `wc`, `ls`, `find` were used.

Method, as instructed for this unit (it differs from the general brief, which asks for every line):
- every file: `describe` / `it` / `test` titles and every `readFileSync(` line were listed by grep ("titles only");
- files that test authentication, authorisation, sessions, rate limits, uploads, webhooks, the policy guard (security-specific suites), encryption, secrets, logging/redaction and brand isolation were read in full.
- Limits: when a file was printed in full, lines longer than about 210 to 330 columns were cut at that width on screen. Title lines were cut at 90 to 120 columns.
- Files outside this unit that were opened (by grep or a short range) to judge a finding: `src/app/api/tax-form/route.ts` (grep hits, lines 16-17, 49, 259, 304-311), `src/app/api/tax-form/fix/route.ts` (lines 25-45), `src/app/api/tax-form/link/route.ts` (grep hits), `src/app/api/mia/*/route.ts` and `src/app/api/atlas/*/route.ts` (grep for the session check), `src/lib/field-seal.ts` (grep, lines 9 and 30), `jest.config.js` (lines 20-21), and repo-wide greps over test files to see whether a test for a gap exists in another unit.

## Coverage

Totals: 373 files in the unit. 81 read in full (4286 lines), 292 read by titles only or in part (16811 lines in those files; only title lines were read).

| file | lines | ranges read | status |
|---|---|---|---|
| `__tests__/security/supply-chain-secrets.test.js` | 107 | 1-107 | REVIEWED |
| `__tests__/seo-legal-og.test.ts` | 22 | titles only | PARTIALLY_REVIEWED (titles only) |
| `__tests__/setup.js` | 6 | 1-6 | REVIEWED |
| `__tests__/wht-copy-compliance-6-languages.test.ts` | 85 | titles only | PARTIALLY_REVIEWED (titles only) |
| `e2e/svt-a11y.spec.ts` | 32 | titles only | PARTIALLY_REVIEWED (titles only) |
| `e2e/svt-form.spec.ts` | 83 | 1-83 | REVIEWED |
| `e2e/svt-pages.spec.ts` | 71 | titles only | PARTIALLY_REVIEWED (titles only) |
| `security-assessment/proposals/form-completion-token/completion-token-wiring.test.ts.txt` | 45 | 1-45 | REVIEWED |
| `security-assessment/proposals/retention-and-deletion/delete-archive-files.proposed.test.ts` | 52 | 1-52 | REVIEWED |
| `src/app/api/__tests__/sec2-form-ratelimit.test.ts` | 59 | 1-59 | REVIEWED |
| `src/app/api/crm/__tests__/round2-auth.test.ts` | 106 | 1-106 | REVIEWED |
| `src/app/api/crm/file/__tests__/heic-bomb.test.ts` | 37 | 1-37 | REVIEWED |
| `src/app/api/crm/file/__tests__/path-hardening.test.ts` | 58 | 1-58 | REVIEWED |
| `src/app/api/crm/verify-otp/__tests__/sec2-otp-keys.test.ts` | 60 | 1-60 | REVIEWED |
| `src/app/api/tax-form/__tests__/cross-site-guard.test.ts` | 41 | 1-41 | REVIEWED |
| `src/app/api/tax-form/__tests__/fix-route.test.ts` | 43 | 1-43 | REVIEWED |
| `src/app/api/tax-form/__tests__/invoice-urls-scope.test.ts` | 21 | 1-21 | REVIEWED |
| `src/app/api/tax-form/__tests__/ratelimit-key-pii.test.ts` | 36 | 1-36 | REVIEWED |
| `src/app/api/tax-form/upload/__tests__/brand-26oct.test.ts` | 59 | 1-59 | REVIEWED |
| `src/app/api/tax-form/upload/__tests__/sec2-budget.test.ts` | 46 | 1-46 | REVIEWED |
| `src/app/api/tfn-form/__tests__/upload-error-leak.test.ts` | 53 | 1-53 | REVIEWED |
| `src/components/mia/__tests__/MiaActions-formlink-17nov.test.tsx` | 29 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/__tests__/ai-source.test.ts` | 15 | 1-15 | REVIEWED |
| `src/lib/__tests__/analytics-privacy.test.ts` | 24 | 1-24 | REVIEWED |
| `src/lib/__tests__/api-route-auth-inventory.test.ts` | 57 | 1-57 | REVIEWED |
| `src/lib/__tests__/au-mobile-3nov.test.ts` | 10 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/__tests__/auth-lockout-scope.test.ts` | 21 | 1-21 | REVIEWED |
| `src/lib/__tests__/auth-session-revocation.test.ts` | 79 | 1-79 | REVIEWED |
| `src/lib/__tests__/blog-dates.test.ts` | 73 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/__tests__/brand-host-absolute-form.test.ts` | 50 | 1-50 | REVIEWED |
| `src/lib/__tests__/brand-separation-26oct.test.ts` | 97 | 1-97 | REVIEWED |
| `src/lib/__tests__/csp-report-only.test.ts` | 74 | 1-74 | REVIEWED |
| `src/lib/__tests__/db-brand-26oct.test.ts` | 49 | 1-49 | REVIEWED |
| `src/lib/__tests__/field-seal-18nov.test.ts` | 46 | 1-46 | REVIEWED |
| `src/lib/__tests__/font-imports.test.ts` | 50 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/__tests__/form-inputs.test.ts` | 82 | 1-82 | REVIEWED |
| `src/lib/__tests__/frontend-security.test.ts` | 65 | 1-65 | REVIEWED |
| `src/lib/__tests__/ga-consent-3nov.test.ts` | 16 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/__tests__/google-reviews-shaping.test.ts` | 33 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/__tests__/heic-guard.test.ts` | 28 | 1-28 | REVIEWED |
| `src/lib/__tests__/json-ld-html-17nov.test.ts` | 14 | 1-14 | REVIEWED |
| `src/lib/__tests__/launch-gate.test.ts` | 47 | 1-47 | REVIEWED |
| `src/lib/__tests__/locale-blog.test.ts` | 56 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/__tests__/log-safe.test.ts` | 46 | 1-46 | REVIEWED |
| `src/lib/__tests__/mark-task-done-erases.test.ts` | 51 | 1-51 | REVIEWED |
| `src/lib/__tests__/orphan-sweep-run.test.ts` | 51 | 1-51 | REVIEWED |
| `src/lib/__tests__/orphan-uploads.test.ts` | 56 | 1-56 | REVIEWED |
| `src/lib/__tests__/page-photo-priority.test.tsx` | 34 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/__tests__/public-form-upload-url.test.ts` | 42 | 1-42 | REVIEWED |
| `src/lib/__tests__/redirect-loop-30oct.test.ts` | 23 | 1-23 | REVIEWED |
| `src/lib/__tests__/request-guard-mia-17nov.test.ts` | 10 | 1-10 | REVIEWED |
| `src/lib/__tests__/request-guard.test.ts` | 46 | 1-46 | REVIEWED |
| `src/lib/__tests__/reviews-ssr.test.tsx` | 33 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/__tests__/seal-script-matches-18nov.test.ts` | 17 | 1-17 | REVIEWED |
| `src/lib/__tests__/set-task-tax-status.test.ts` | 38 | 1-38 | REVIEWED |
| `src/lib/__tests__/svt-ga4-27oct.test.ts` | 22 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/__tests__/tax-year.test.ts` | 90 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/__tests__/upload-dangerous.test.ts` | 66 | 1-66 | REVIEWED |
| `src/lib/__tests__/upload-sniffing.test.ts` | 41 | 1-41 | REVIEWED |
| `src/lib/atlas/__tests__/ask.test.ts` | 33 | 1-33 | REVIEWED |
| `src/lib/atlas/__tests__/atlas-view.test.ts` | 98 | 1-98 | REVIEWED |
| `src/lib/atlas/__tests__/lookup.test.ts` | 102 | 1-102 | REVIEWED |
| `src/lib/atlas/__tests__/redact.test.ts` | 39 | 1-39 | REVIEWED |
| `src/lib/legal/__tests__/legal-26oct.test.ts` | 31 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/svt/__tests__/content-rules-26oct.test.ts` | 83 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/svt/__tests__/deadline-27oct.test.ts` | 12 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/svt/__tests__/images-26oct.test.ts` | 30 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/svt/__tests__/library-26oct.test.ts` | 51 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/svt/__tests__/llms-26oct.test.ts` | 39 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/svt/__tests__/long-articles-27oct.test.ts` | 67 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/svt/__tests__/price-check-26oct.test.ts` | 42 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/abn-intake.test.ts` | 44 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/abn-no-guarantee-21oct.test.ts` | 72 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/abn-order.test.ts` | 70 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/abn-unsure-24oct.test.ts` | 43 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/account-name-21oct.test.ts` | 30 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/account-name-25oct.test.ts` | 47 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/account-name.test.ts` | 83 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/after-lodgement-pay-29oct.test.ts` | 13 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/ai-usage.test.ts` | 42 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/already-checked.test.ts` | 44 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/already-lodged-review.test.ts` | 34 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/amendment-review-24oct.test.ts` | 52 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/another-year-after-payment.test.ts` | 38 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/answer-from-what-you-have-23oct.test.ts` | 13 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/approve-payment-draft.test.ts` | 83 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/approved-price-es-fr-it-pt-18nov.test.ts` | 37 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/approved-verbatim.test.ts` | 37 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/ato-payment-task-gone-4nov.test.ts` | 28 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/attention-report-3nov.test.ts` | 35 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit-fixes-4nov.test.ts` | 56 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-actions-29.test.ts` | 79 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-actions-31.test.ts` | 90 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-actions-u12-sched.test.ts` | 99 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-actions-u12.test.ts` | 92 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-actions-u13.test.ts` | 71 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-2.test.ts` | 79 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-22.test.ts` | 102 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-23.test.ts` | 57 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-40.test.ts` | 96 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-44.test.ts` | 106 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-45.test.ts` | 94 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-50.test.ts` | 74 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-57.test.ts` | 105 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-59.test.ts` | 19 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-64.test.ts` | 55 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-65.test.ts` | 60 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-68.test.ts` | 67 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-74.test.ts` | 72 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-8.test.ts` | 64 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-u41.test.ts` | 41 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-unverified-0.test.ts` | 101 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-core-unverified-10.test.ts` | 105 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-guard-1.test.ts` | 69 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-guard-10.test.ts` | 58 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-guard-11.test.ts` | 78 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-guard-36.test.ts` | 59 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-guard-37.test.ts` | 105 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-guard-38.test.ts` | 61 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-guard-9.test.ts` | 77 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-sched-13.test.ts` | 27 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-sched-24.test.ts` | 105 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-sched-27.test.ts` | 92 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-sched-30.test.ts` | 101 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-sched-45.test.ts` | 97 | 1-97 | REVIEWED |
| `src/lib/will/__tests__/audit3-sched-47.test.ts` | 47 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-sched-49.test.ts` | 108 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-sched-58.test.ts` | 98 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-sched-61.test.ts` | 81 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-sched-62.test.ts` | 78 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-sched-70.test.ts` | 74 | 1-74 | REVIEWED |
| `src/lib/will/__tests__/audit3-sched-72.test.ts` | 102 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-sched-76.test.ts` | 105 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-sched-u42.test.ts` | 73 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-sched-u8.test.ts` | 58 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-18.test.ts` | 59 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-20.test.ts` | 85 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-22.test.ts` | 77 | 1-77 | REVIEWED |
| `src/lib/will/__tests__/audit3-ui-23.test.ts` | 72 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-25.test.ts` | 71 | 1-71 | REVIEWED |
| `src/lib/will/__tests__/audit3-ui-28.test.ts` | 54 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-36.test.ts` | 25 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-47.test.ts` | 54 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-50.test.ts` | 45 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-52.test.ts` | 46 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-66.test.ts` | 73 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-67.test.ts` | 72 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-73.test.ts` | 70 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-77.test.ts` | 49 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-78.test.ts` | 72 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-u11.test.ts` | 54 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-u17.test.ts` | 66 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-u18.test.ts` | 47 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-u20.test.ts` | 48 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-u29.test.ts` | 47 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-u30.test.ts` | 38 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-u33.test.ts` | 39 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-u34.test.ts` | 53 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-u6.test.ts` | 69 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/audit3-ui-u7.test.ts` | 38 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/autopilot-delay.test.ts` | 80 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/bank-document-25oct.test.ts` | 49 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/bank-repeat.test.ts` | 94 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/behaviour-evals.test.ts` | 37 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/brain.test.ts` | 93 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/brand-voice-26oct.test.ts` | 107 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/card-photo-31oct.test.ts` | 23 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/careful-buyer-25oct.test.ts` | 12 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/channel-brand-26oct.test.ts` | 80 | 1-80 | REVIEWED |
| `src/lib/will/__tests__/channel.test.ts` | 89 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/chat-page-and-counts.test.ts` | 84 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/closing-only.test.ts` | 99 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/couple-23oct.test.ts` | 55 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/courtesy-4nov.test.ts` | 10 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/courtesy-reply-length.test.ts` | 94 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/crm-nav-25oct.test.ts` | 12 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/curly-apostrophe-1nov.test.ts` | 28 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/daily-digest.test.ts` | 75 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/decision-log-16oct.test.ts` | 41 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/decision-log-5sep.test.ts` | 81 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/decisions-19oct.test.ts` | 89 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/dedup-window-3nov.test.ts` | 14 | 1-14 | REVIEWED |
| `src/lib/will/__tests__/delayed-payment-confirmation.test.ts` | 92 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/describe-attachment.test.ts` | 24 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/documents-acknowledged.test.ts` | 96 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/estimate-invoice-i18n.test.ts` | 59 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/estimate-no-invoice-9nov.test.ts` | 46 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/evening-window.test.ts` | 68 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/expense-from-task.test.ts` | 39 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/expense-rules-3nov.test.ts` | 31 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/export-72h.test.ts` | 87 | 1-87 | REVIEWED |
| `src/lib/will/__tests__/fault-dismiss.test.ts` | 55 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/fee-questions-routing-16nov.test.ts` | 35 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/first-message-thanks-22oct.test.ts` | 49 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/fixes-from-chats-29oct.test.ts` | 70 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/followup-approval.test.ts` | 84 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/followups-oct14.test.ts` | 43 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/foreign-income.test.ts` | 77 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/form-ack-no-repeat-22oct.test.ts` | 61 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/form-before-payment.test.ts` | 54 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/form-link-retry.test.ts` | 85 | 40-58, 66-74, plus titles | PARTIALLY_REVIEWED |
| `src/lib/will/__tests__/form-link.test.ts` | 50 | 1-50 | REVIEWED |
| `src/lib/will/__tests__/form-token-compact-3nov.test.ts` | 42 | 1-42 | REVIEWED |
| `src/lib/will/__tests__/form-token.test.ts` | 77 | 1-77 | REVIEWED |
| `src/lib/will/__tests__/free-advice-seeker-28oct.test.ts` | 75 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/greeting-name.test.ts` | 89 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/guarantee-back.test.ts` | 69 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/guarantee-barred-approve.test.ts` | 27 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/guarantee-example-25oct.test.ts` | 11 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/guarantee-repeat.test.ts` | 39 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/guard-audit-4sep.test.ts` | 88 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/guard-can-claim.test.ts` | 97 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/guard-false-positives.test.ts` | 102 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/guard-lodgement-28oct.test.ts` | 38 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/guard-paid-expense-answers-1nov.test.ts` | 36 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/guard-review-18nov.test.ts` | 35 | 1-35 | REVIEWED |
| `src/lib/will/__tests__/guard-unicode-18nov.test.ts` | 18 | 1-18 | REVIEWED |
| `src/lib/will/__tests__/handoff-bump.test.ts` | 95 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/handoff-diagnostic.test.ts` | 37 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/handoff-reasons.test.ts` | 106 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/handovers-27oct.test.ts` | 12 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/identity-question.test.ts` | 79 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/ihi-link-trouble-2nov.test.ts` | 39 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/inbound-edit.test.ts` | 101 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/inbound-note-after-payment.test.ts` | 80 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/inbound-note.test.ts` | 91 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/income-from-receipt.test.ts` | 76 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/injection-defence.test.ts` | 57 | 1-57 | REVIEWED |
| `src/lib/will/__tests__/invoice-extract.test.ts` | 64 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/knowledge-backfill.test.ts` | 91 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/knowledge-brand-27oct.test.ts` | 29 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/knowledge-fix-21oct.test.ts` | 42 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/knowledge-i18n.test.ts` | 55 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/language-lock.test.ts` | 57 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/language-rules-loader.test.ts` | 37 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/lars-300-21oct.test.ts` | 29 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/later-plan-21oct.test.ts` | 72 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/layout-23oct.test.ts` | 50 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/layout-engine-23oct.test.ts` | 34 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/library-gap-coverage-16nov.test.ts` | 47 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/library-new-entries.test.ts` | 31 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/llm-transport-26oct.test.ts` | 48 | 1-48 | REVIEWED |
| `src/lib/will/__tests__/lodged-confirmation-i18n.test.ts` | 47 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/lodged-files-client.test.ts` | 48 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/long-message.test.ts` | 96 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/loop-guard-sales-only-4nov.test.ts` | 10 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/lost-analysis.test.ts` | 46 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/medicare-cant-help-11nov.test.ts` | 37 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/medicare-levy-amount-7nov.test.ts` | 44 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/medicare-question-file-3nov.test.ts` | 36 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/medicare-whm-gate.test.ts` | 41 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/message-while-ai-paused.test.ts` | 99 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/meta-outbound-url-round2.test.ts` | 103 | 1-103 | REVIEWED |
| `src/lib/will/__tests__/meta-template-lang.test.ts` | 32 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/metrics.test.ts` | 75 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/mining-criteria.test.ts` | 26 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/mining-dedup.test.ts` | 43 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/mixed-income-choice-22oct.test.ts` | 27 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/mode-digest.test.ts` | 73 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/morning-report-22oct.test.ts` | 45 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/multilingual-autopilot.test.ts` | 108 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/never-silent.test.ts` | 96 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/nightly-card-links.test.ts` | 76 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/no-dashes-26oct.test.ts` | 23 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/no-key-in-production.test.ts` | 48 | 1-48 | REVIEWED |
| `src/lib/will/__tests__/no-price-resend-27oct.test.ts` | 66 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/no-refund-cases-22oct.test.ts` | 59 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/not-our-price-25oct.test.ts` | 32 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/nothing-after-no-30oct.test.ts` | 105 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/one-confirmation-23oct.test.ts` | 65 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/one-confirmation-26oct.test.ts` | 41 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/one-guarantee.test.ts` | 75 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/open-question-15nov.test.ts` | 35 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/opt-out.test.ts` | 40 | 1-40 | REVIEWED |
| `src/lib/will/__tests__/outcome-and-promised-date.test.ts` | 63 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/own-account-27oct.test.ts` | 30 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/paid-fee-restate.test.ts` | 25 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/payable-followup.test.ts` | 21 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/payable-from-words.test.ts` | 26 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/payment-burst-ja-21oct.test.ts` | 41 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/payment-burst-service-21oct.test.ts` | 53 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/payment-claim-conditional.test.ts` | 38 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/payment-claim-forces-paid.test.ts` | 72 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/payment-link-dasp-25oct.test.ts` | 38 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/payment-link-name-9nov.test.ts` | 62 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/payment-logistics.test.ts` | 27 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/payment-proof-states.test.ts` | 26 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/policy-guard-brand-26oct.test.ts` | 38 | 1-38 | REVIEWED |
| `src/lib/will/__tests__/pre-payment-medicare.test.ts` | 22 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/price-de-ja.test.ts` | 49 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/price-flow-variant.test.ts` | 49 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/price-message-padded.test.ts` | 36 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/prompt-cache-25oct.test.ts` | 18 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/protected-titles-fr-it-es-pt-18nov.test.ts` | 24 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/reaction-unread.test.ts` | 63 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/refund-chance-25oct.test.ts` | 44 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/refund-checkin-context-25oct.test.ts` | 35 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/refund-checkin-yes-27oct.test.ts` | 9 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/refund-tracking.test.ts` | 58 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/reopen-target.test.ts` | 28 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/report-11nov.test.ts` | 53 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/report-14nov.test.ts` | 39 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/residency-check.test.ts` | 48 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/residency-personal-link-3nov.test.ts` | 33 | 1-33 | REVIEWED |
| `src/lib/will/__tests__/residency-self-count-23oct.test.ts` | 47 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/resolve-needs-reply.test.ts` | 66 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/review-72h-25oct.test.ts` | 56 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/review-fixes-27oct.test.ts` | 58 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/review-system.test.ts` | 92 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/scheduler-cadence.test.ts` | 49 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/search-customers.test.ts` | 79 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/sec-webhook-edge-cases.test.ts` | 82 | 1-82 | REVIEWED |
| `src/lib/will/__tests__/sec2-cron-auth.test.ts` | 87 | 1-87 | REVIEWED |
| `src/lib/will/__tests__/sec2-will-redteam-killswitch-store.test.ts` | 25 | 1-25 | REVIEWED |
| `src/lib/will/__tests__/sec2-will-redteam-template.test.ts` | 67 | 1-67 | REVIEWED |
| `src/lib/will/__tests__/second-check-22oct.test.ts` | 95 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/security-watch-23oct.test.ts` | 104 | 1-104 | REVIEWED |
| `src/lib/will/__tests__/send-rate-limit.test.ts` | 73 | 1-73 | REVIEWED |
| `src/lib/will/__tests__/sentence-asks-27oct.test.ts` | 15 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/several-years-26oct.test.ts` | 12 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/several-years-price-9nov.test.ts` | 60 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/sig-12h-4nov.test.ts` | 12 | 1-12 | REVIEWED |
| `src/lib/will/__tests__/sig-guard-5nov.test.ts` | 21 | 1-21 | REVIEWED |
| `src/lib/will/__tests__/stage-badge-back-to-sales.test.ts` | 87 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/stage-facts-1nov.test.ts` | 45 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/stage-sync.test.ts` | 81 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/stale-payee-30oct.test.ts` | 102 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/started-in-mygov-2nov.test.ts` | 48 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/still-in-time-27oct.test.ts` | 13 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/store-brand-26oct.test.ts` | 64 | 1-64 | REVIEWED |
| `src/lib/will/__tests__/stranded-covered-4nov.test.ts` | 15 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/stuck-24h-20oct.test.ts` | 70 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/success-confirmation-image.test.ts` | 95 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/svt-all-languages-18nov.test.ts` | 37 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/svt-audit-28oct.test.ts` | 21 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/svt-enquiry-6nov.test.ts` | 91 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/svt-form-link-18nov.test.ts` | 14 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/taiki-23oct.test.ts` | 72 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/tasks-10nov.test.ts` | 26 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/tax-calendar.test.ts` | 45 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/team-tone.test.ts` | 63 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/template-free-text-18nov.test.ts` | 37 | 1-37 | REVIEWED |
| `src/lib/will/__tests__/template-keeps-language-21oct.test.ts` | 65 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/template-name-suffix-21oct.test.ts` | 57 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/template-sync.test.ts` | 86 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/thanks-after-service-19oct.test.ts` | 29 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/thanks-language-21oct.test.ts` | 62 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/thanks-never-silent-29oct.test.ts` | 37 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/thanks-one-line.test.ts` | 69 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/timezone.test.ts` | 75 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/too-long-rewrite.test.ts` | 101 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/track-choice-18nov.test.ts` | 29 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/translated-price-message.test.ts` | 98 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/unanswered-cap-m1.test.ts` | 28 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/upset-strict-17nov.test.ts` | 18 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/w2-abn-3nov.test.ts` | 97 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/w2-identity-3nov.test.ts` | 70 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/w2-medicare-expenses-3nov.test.ts` | 47 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/w2-paperwork-3nov.test.ts` | 94 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/w2-policy-guard-3nov.test.ts` | 74 | 1-74 | REVIEWED |
| `src/lib/will/__tests__/w2-report-3nov.test.ts` | 48 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/w2-residency-3nov.test.ts` | 61 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/w3-helpers-guard.ts` | 2 | 1-2 | REVIEWED |
| `src/lib/will/__tests__/w3-library-3nov.test.ts` | 77 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/w3-service-3nov.test.ts` | 98 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/wasAlreadySentVerbatim.test.ts` | 79 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/webhook-brand-26oct.test.ts` | 82 | 1-82 | REVIEWED |
| `src/lib/will/__tests__/webhook-no-sender.test.ts` | 48 | 1-48 | REVIEWED |
| `src/lib/will/__tests__/whole-chat-context.test.ts` | 39 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/will-decides-rest-22oct.test.ts` | 100 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/will-decides-service-22oct.test.ts` | 102 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/yes-to-estimate-27oct.test.ts` | 12 | titles only | PARTIALLY_REVIEWED (titles only) |
| `src/lib/will/__tests__/zh-vi-guard.test.ts` | 34 | titles only | PARTIALLY_REVIEWED (titles only) |

## Part 1: security controls and negative tests (this unit, with notes where another unit holds the test)

"Yes" means a test asserts the refusal by behaviour (a call is made and the result checked). "Source text" means the only evidence is a regex over a source file. "None" means no test was found by grep in the whole repository.

| control | auth failure / missing session | CSRF / origin | IDOR / object scope | invalid input | oversized body | replay / duplicate | concurrency | sensitive data in output | privilege escalation |
|---|---|---|---|---|---|---|---|---|---|
| CRM login (`/api/crm/login`) | Yes: wrong password 401 (`round2-auth.test.ts:38-44`) | Yes: proxy 403 (`request-guard.test.ts:35-42`) | n/a | not tested | not tested | n/a | Yes: 30 parallel guesses, at most 3 verified (`round2-auth.test.ts:38`; `auth-session-revocation.test.ts:67-71`) | Yes: DB error text not returned for partners / referral-payment (`round2-auth.test.ts:47-58`) | n/a |
| OTP step (`/api/crm/verify-otp`) | Yes: forged, missing, malformed pre-auth id 401 (`sec2-otp-keys.test.ts:31-38, 56-60`) | Yes (proxy, same test as login) | Yes: forged id writes nothing to Redis | wrong code 401 | not tested | Partly: code is deleted after success (`:40-46`); no test that a second use fails | No: 5-guess cap tested sequentially only (`:48-54`) | not tested | Not tested: nothing shows a pre-auth cookie is useless as a session |
| Session validation and revocation | Yes: garbage, unsigned, tampered token; revoked token on a cold instance (`auth-session-revocation.test.ts:28-63`) | n/a | n/a | Yes | n/a | Yes: token issued before logout is dead | Not tested | n/a | Yes: one revoked session does not kill another (`:57-63`) |
| CRM logout | Yes: unauthenticated idle call revokes nobody (`audit3-ui-22.test.ts:71-76`) | Yes (proxy) | n/a | not tested | not tested | n/a | n/a | n/a | n/a |
| Session-gated CRM data routes (`/api/crm/tasks`, `/clients`, `/clients/[id]`, `/search`, `/stats`, `/expense-pdf`, `/seed`) | Source text only (`api-route-auth-inventory.test.ts:48-51`, `round2-auth.test.ts:79-105`). Behavioural 401 only for `/api/crm/leads` (`round2-auth.test.ts:73-75`) and `/api/crm/file` (`path-hardening.test.ts:24-28`) | Yes at proxy level for `/api/crm/:path*` | n/a (single owner account) | Yes for referral `partnerId` (`round2-auth.test.ts:60-65`) | not tested | not tested | not tested | Yes: leads CSV formula cell and audit row (`round2-auth.test.ts:67-72`) | n/a |
| `/api/crm/file` (document proxy) | Yes | Yes (proxy) | Yes: foreign host, encoded traversal, malformed escape (`path-hardening.test.ts:41-58`) | Yes | Yes: HEIC decompression bomb (`heic-bomb.test.ts:30-37`, `heic-guard.test.ts`) | n/a | n/a | Yes: `no-store`, `nosniff` | n/a |
| `/api/will/actions` and other Will dashboard routes | In this unit every test mocks the session as valid (see F01). Behavioural 401 exists in other units only for `will/state`, `will/followups`, `will/media/[id]`, `will/export`, `will/search` | Yes (proxy, `request-guard.test.ts:35`) | not tested | Partly (guard at save time, `audit3-actions-u13.test.ts`) | not tested | Partly: UI double-click guard (`audit3-ui-20`, `audit3-ui-28`, titles only) | not tested at the route | Yes: export has no names or numbers (`export-72h.test.ts:40-41, 84-85`) | n/a |
| `/api/mia/*` (8 routes), `/api/atlas/action`, `/api/atlas/ask` | None at route level. Source-text inventory only | Yes: `isGuardedApiPath` for four Mia paths (`request-guard-mia-17nov.test.ts`); no test for atlas paths in this unit | None | None | None | None | None | Library level only: Atlas redaction and no phone in views (`atlas/__tests__/redact.test.ts`, `ask.test.ts:13-19`, `lookup.test.ts`, `atlas-view.test.ts:79-88`) | None |
| Cron routes (`/api/will/tick`, `/orphan-sweep`) | Yes: missing or empty secret, near misses, forged cookie (`sec2-cron-auth.test.ts:26-74`, `audit3-sched-45.test.ts:71-76`) | n/a | n/a | Yes | n/a | n/a | not tested | n/a | Yes: session is told apart from cron secret (`audit3-sched-45.test.ts:64-69`); route wiring is source text (`sec2-cron-auth.test.ts:76-86`) |
| Meta webhook (`/api/will/webhook`) | Yes: no signature, sha1, non-hex, truncated, other secret; GET handshake fails closed (`sec-webhook-edge-cases.test.ts:41-58, 74-81`). Tampered body is tested in another unit (`sec2-will-redteam-webhook.test.ts:72`) | n/a (not blocked by the proxy, `request-guard.test.ts:43-45`) | Yes: unknown receiving number dropped (`webhook-brand-26oct.test.ts:54-69`) | Yes: no sender (`webhook-no-sender.test.ts`) | Yes: 413 (`sec-webhook-edge-cases.test.ts:62-67`) | Yes, but with `claimInbound` mocked (`:68-73`) | No: atomicity of the claim is not tested here | n/a | n/a |
| Public forms (`/api/tax-form`, `/tfn-form`, `/abn-form`, `/super-form`) | n/a (public) | Yes: `sec-fetch-site: cross-site` 403 (`cross-site-guard.test.ts:29-41`). No test with only an `Origin` header | Yes: other customers' and other brand's upload URLs dropped (`invoice-urls-scope.test.ts`, `public-form-upload-url.test.ts`) | Partly: upload type errors (`upload-error-leak.test.ts:47-52`); field validation not seen in this unit | Not tested for the multipart form bodies | not tested (duplicate submit is covered for the scheduler only, `audit3-sched-58`, titles) | not tested | Yes: internal upload errors not echoed; rate-limit keys hold a hash (`upload-error-leak.test.ts`, `ratelimit-key-pii.test.ts`, `sec2-form-ratelimit.test.ts:39-41`) | n/a |
| Rate limits on public forms | Yes: per-person and per-IP 429 (`sec2-form-ratelimit.test.ts`, `audit3-sched-70.test.ts`) | | | | | | | | |
| Public upload (`/api/tax-form/upload`) and multipart upload | n/a | Yes: cross-site 403 (`cross-site-guard.test.ts:38-41`) | Yes: brand prefix, SVT closed unless flag (`brand-26oct.test.ts`) | Yes: SVG, HTML, MP4-as-HEIC, PNG-as-PDF, exe, traversal names (`upload-sniffing.test.ts`, `upload-dangerous.test.ts`) | Partly: declared `content-length` over 10 MB is 400 and byte budget 429 (`sec2-budget.test.ts`). A large body with no or a false `content-length` is not tested | n/a | not tested | n/a | n/a |
| Form token (`form-token.ts`) | Yes: expiry, wrong brand, other key, tamper, junk, `alg none`, short secret (`form-token.test.ts:20-44`, `form-token-compact-3nov.test.ts:28-36`) | n/a | Yes: forged customer id fails signature | Yes | Yes: 600-character junk | Library has a nonce key only | n/a | Yes: no phone number in the token (`form-token.test.ts:14-19`) | Yes: form token refused as fix token, purpose change breaks signature (`:67-73`, `fix-route.test.ts:37-43`) |
| Form token used by `/api/tax-form` (binding a submission to a customer) | None that runs (see F02) | | None | None | | None | None | | |
| Residency fix link (`/api/tax-form/fix`) | Yes: missing token 403 | Not tested: the guard is mocked away (`fix-route.test.ts:19`) | Yes by token | Yes: bad status 400 | not tested | Yes, sequential: second use 409 (`fix-route.test.ts:29-36`) | No (see F03) | n/a | Yes |
| `/api/tax-form/link` | None | None | None | None | None | None | None | None | None |
| Policy guard (outbound text) | n/a | n/a | n/a | Yes, many: prompt-injection outputs, unicode tricks, six languages, card details, bank details that are not ours (`injection-defence.test.ts`, `guard-unicode-18nov.test.ts`, `guard-review-18nov.test.ts`, `w2-policy-guard-3nov.test.ts`, `policy-guard-brand-26oct.test.ts`, `sig-guard-5nov.test.ts`; `audit3-guard-*`, `guard-*`, `zh-vi-guard` by titles) | Yes for template parameters (`sec2-will-redteam-template.test.ts:47-51`) | Yes: verbatim duplicate (`dedup-window-3nov.test.ts`, `wasAlreadySentVerbatim.test.ts` titles) | not tested | Yes: credentials and internal rules in a reply are blocked (`injection-defence.test.ts:44-45`) | Yes: model tool has three actions only (`injection-defence.test.ts:21-25`) |
| Kill switch, missing API key | Yes: failed read reports ON (`sec2-will-redteam-killswitch-store.test.ts`); no key in production gives a task (`no-key-in-production.test.ts:24-32`) | | | | | | | | |
| Outbound send limits and 24-hour window | Yes: 11th send refused (`send-rate-limit.test.ts:43-48`); free text outside the window refused (`followup-approval.test.ts:47`, `template-keeps-language-21oct.test.ts:58`, titles) | | | | | | | | |
| Outbound URLs (SSRF, token leak to Meta look-alikes) | n/a | n/a | n/a | Yes: metadata IP, localhost, userinfo, ports, look-alike hosts; token never sent to a non-Meta host (`meta-outbound-url-round2.test.ts`) | n/a | n/a | n/a | Yes | n/a |
| Brand isolation (WHT / SVT) | n/a | n/a | Yes: host with trailing dot, look-alike hosts, store filter, send number, webhook number (`brand-host-absolute-form.test.ts`, `store-brand-26oct.test.ts`, `channel-brand-26oct.test.ts`, `webhook-brand-26oct.test.ts`) | Yes | n/a | n/a | n/a | Yes for names and domains; the phone-number check is switched off (see F05) | n/a |
| Field encryption (TFN, bank) | n/a | n/a | Yes: other row, other column do not open (`field-seal-18nov.test.ts:25-33`) | Not tested: tampered ciphertext, unknown key id, wrong key | n/a | n/a | n/a | Yes: sealed value does not contain the digits | n/a. Note F04: no keys means plaintext, and the test pins that |
| Logs, analytics, model prompts | n/a | n/a | n/a | Yes | Yes: bounded length (`log-safe.test.ts:26-31`) | n/a | n/a | Yes (`log-safe.test.ts`, `analytics-privacy.test.ts`, `atlas/__tests__/redact.test.ts`). Route use of `safeErr` is source text (`log-safe.test.ts:34-45`) | n/a |
| Data deletion (mark done, orphan sweep) | n/a | n/a | Yes: sweep never leaves the public-form prefixes (`orphan-uploads.test.ts:31-40`) | Yes | Yes: cap per run | n/a | n/a | Yes: TFN, bank, address blanked (`mark-task-done-erases.test.ts`) | n/a |
| Frontend (XSS, postMessage, JSON-LD, CSP) | n/a | Yes: Facebook origin check (`frontend-security.test.ts:57-65`) | n/a | Yes: `javascript:` links, tags, script close tag (`frontend-security.test.ts:34-55`, `json-ld-html-17nov.test.ts`) | n/a | n/a | n/a | n/a | n/a. Only the report-only CSP is tested here (`csp-report-only.test.ts`) |
| Supply chain and secrets in the tree | Yes (`__tests__/security/supply-chain-secrets.test.js`). The scan skips `security-assessment`, `audit-output`, `output`, `.claude` and has no rule for Supabase service keys other than the generic JWT rule (`:65-82`) | | | | | | | | |

## Part 2: tests that assert on source text rather than behaviour

Count: 104 of the 373 files call `readFileSync`; about 100 of them read application source (`route.ts`, `service.ts`, `scheduler.ts`, `playbook.ts`, `engine.ts`, `Dashboard.tsx`, CSS) and match a regex or substring. Four read data or config only (`package-lock.json`, `.gitignore`, `vercel.json`, rule files).

Security-relevant ones (a refactor that keeps the string but breaks the behaviour would still pass; a harmless rename would fail):

| file:line | what is asserted on text |
|---|---|
| `src/lib/__tests__/api-route-auth-inventory.test.ts:29, 48-51` | a route "is gated" if `validateSession`, `sessionValid(` or `cronAuthorized(` appears anywhere in the file, including an import or a comment |
| `src/app/api/crm/__tests__/round2-auth.test.ts:79-105` | per handler: text index of the auth call is before the text index of `req.json(`, `getStore(`, `getSupabase(` and so on |
| `src/lib/will/__tests__/sec2-cron-auth.test.ts:76-86` | `cronAuthorized()` appears before `processDueJobs()` / `runOrphanSweep()` in the two cron routes |
| `src/lib/will/__tests__/audit3-sched-45.test.ts:84-96` | tick route stamps the cron heartbeat only for a cron secret |
| `src/lib/will/__tests__/security-watch-23oct.test.ts:74-83` | login and OTP routes contain the audit event names and the new-device call |
| `src/lib/__tests__/log-safe.test.ts:34-45` | nine routes do not contain `console.error(..., err)` |
| `src/lib/__tests__/analytics-privacy.test.ts:20-23` | `analytics.ts` has no parameter named tfn, passport, bank, email, phone |
| `src/lib/will/__tests__/audit3-sched-70.test.ts:62-73` | tax-form route contains the per-person and per-IP rate-limit calls |
| `src/lib/will/__tests__/audit3-ui-22.test.ts:16-31` | idle logout sends `reason: 'idle'` |
| `src/lib/will/__tests__/policy-guard-brand-26oct.test.ts:13-18` | guard source contains `ownSiteHostPattern(brand)` |
| `src/lib/will/__tests__/injection-defence.test.ts:28-38` | prompt text says customer messages are data (this is a prompt pin, built by the real function) |
| `src/lib/will/__tests__/audit3-core-22.test.ts:95-96`, `audit3-ui-77.test.ts:41-42`, `lodged-files-client.test.ts:18`, `payable-followup.test.ts:7`, `refund-tracking.test.ts:42`, `stage-sync.test.ts:65`, `review-system.test.ts:66`, `payable-from-words.test.ts:17` | behaviour of `/api/will/actions` (what is stripped, moved, scheduled) read from the route source |
| `src/lib/will/__tests__/documents-acknowledged.test.ts:15-75`, `never-silent.test.ts:77-90`, `closing-only.test.ts:33-95` | "never past the kill switch", "never to someone who opted out", cooldown written before send: all from `service.ts` / `scheduler.ts` text |
| `src/lib/will/__tests__/residency-personal-link-3nov.test.ts:28-32` | personal fix link is on by default (env flag read from scheduler source) |
| `src/lib/will/__tests__/stuck-24h-20oct.test.ts:53-66`, `report-11nov.test.ts:32-36` | webhook route text |

Other source-text files (UI, CSS, playbook wording; not security controls), by titles: `abn-intake`, `abn-order`, `abn-unsure-24oct`, `account-name`, `after-lodgement-pay-29oct`, `answer-from-what-you-have-23oct`, `ato-payment-task-gone-4nov`, `audit3-core-23`, `audit3-core-40`, `audit3-core-59`, `audit3-core-u41`, `audit3-sched-24`, `audit3-sched-62`, `audit3-sched-u42`, `audit3-sched-u8`, `audit3-ui-18`, `-20`, `-23`, `-28`, `-36`, `-52`, `-66`, `-67`, `-73`, `-78`, `-u11`, `-u17`, `-u18`, `-u20`, `-u29`, `-u30`, `-u33`, `-u34`, `-u6`, `-u7`, `bank-document-25oct`, `careful-buyer-25oct`, `courtesy-reply-length`, `crm-nav-25oct`, `decision-log-16oct`, `decision-log-5sep`, `estimate-no-invoice-9nov`, `fixes-from-chats-29oct`, `followups-oct14`, `foreign-income`, `guarantee-example-25oct`, `handovers-27oct`, `loop-guard-sales-only-4nov`, `medicare-cant-help-11nov`, `medicare-levy-amount-7nov`, `medicare-whm-gate`, `mining-criteria`, `nightly-card-links`, `no-price-resend-27oct`, `one-guarantee`, `payment-link-dasp-25oct`, `payment-link-name-9nov`, `price-de-ja`, `prompt-cache-25oct`, `refund-checkin-context-25oct`, `report-14nov`, `residency-check`, `review-72h-25oct`, `review-fixes-27oct`, `several-years-26oct`, `several-years-price-9nov`, `stale-payee-30oct`, `still-in-time-27oct`, `stranded-covered-4nov`, `tasks-10nov`, `team-tone`, `thanks-one-line` (all under `src/lib/will/__tests__/`), and `__tests__/seo-legal-og.test.ts`, `__tests__/wht-copy-compliance-6-languages.test.ts`, `src/lib/__tests__/font-imports.test.ts`, `ga-consent-3nov.test.ts`, `svt-ga4-27oct.test.ts`, `page-photo-priority.test.tsx`, `brand-separation-26oct.test.ts` (a deliberate source scan).

## Part 3: secrets, real phone numbers, real names, TFN-like values in fixtures (location only)

No live credential was seen in the files read in full. Values are not repeated here.

Test placeholders (not real, but credential-shaped names):
- `__tests__/setup.js:3-5`: `JWT_SECRET`, `PASSWORD_SALT`, `CRM_PASSWORD` set to fixed dummy strings for every test.
- `src/app/api/crm/__tests__/round2-auth.test.ts:35`: `CRM_PASSWORD`, `PASSWORD_SALT` dummies. `sec2-cron-auth.test.ts:46`, `audit3-sched-45.test.ts:42-43`: `CRON_SECRET`, `WILL_CRON_SECRET` dummies. `form-token.test.ts:4-5`, `form-token-compact-3nov.test.ts:3-4`, `fix-route.test.ts:2`, `residency-personal-link-3nov.test.ts:6`, proposal `.txt:5`: `FORM_TOKEN_SECRET` dummies. `sec-webhook-edge-cases.test.ts:22`, `webhook-brand-26oct.test.ts:34`, `webhook-no-sender.test.ts:31`: `META_APP_SECRET` dummies. `sec2-will-redteam-template.test.ts:7, 16`, `meta-outbound-url-round2.test.ts:53`: `WHATSAPP_ACCESS_TOKEN` dummies.

Phone numbers that do not look synthetic:
- `src/lib/will/__tests__/form-link-retry.test.ts:45, 55` (a UK mobile, in two spellings, next to a first name and a comment calling it the customer's "real situation") and `:70` (a second number).
- `src/lib/will/__tests__/stage-badge-back-to-sales.test.ts:18` (an Australian mobile as `waId` with a first name).
- `src/lib/will/__tests__/decision-log-16oct.test.ts:18, 19` (a UK and an Australian mobile).
- `src/lib/will/__tests__/thanks-one-line.test.ts:60` (a Canadian number, in the title).
- `src/lib/will/__tests__/form-link.test.ts:31, 32` (two numbers; the comment at `:31` says "a different customer entirely").
- The business WhatsApp number (public, but a real number): `form-link.test.ts:10, 14-20`, `brand-voice-26oct.test.ts:23, 76`, `mode-digest.test.ts:49`, `src/lib/__tests__/brand-separation-26oct.test.ts:33`.

E-mail addresses that look real:
- `src/lib/will/__tests__/form-link-retry.test.ts:45` and `:70` (two personal webmail addresses).

Bank details (the business's own BSB and account number, which customers are sent; real values): many files, for example `src/lib/will/__tests__/injection-defence.test.ts:42`, `security-watch-23oct.test.ts:53, 60, 61, 68`, `guard-false-positives.test.ts:34-35, 43-44`, `bank-repeat.test.ts:10-11, 18, 30-31, 53`, `translated-price-message.test.ts:21-22, 40, 60, 76-77`, `account-name.test.ts:33-35, 46, 57, 66`, `stale-payee-30oct.test.ts:60, 94-95`, `src/lib/__tests__/log-safe.test.ts:5, 8, 18, 19`, `field-seal-18nov.test.ts:31`. About 90 lines in total across the Will tests.

Registration numbers (public register values): `src/lib/__tests__/launch-gate.test.ts:13` (agent ABN and TPB number).

TFN-like values: only the well-known nine-digit test value is used, at `e2e/svt-form.spec.ts:46`, `src/lib/__tests__/field-seal-18nov.test.ts:19-44`, `log-safe.test.ts:5-22`, `mark-task-done-erases.test.ts:26`, `seal-script-matches-18nov.test.ts:11, 15`, `analytics-privacy.test.ts:7`, `src/lib/atlas/__tests__/redact.test.ts:6, 24`. A synthetic passport number at `mark-task-done-erases.test.ts:29`. No other TFN-shaped value was found by grep.

Customer first names (some with a quoted message from a real chat, by the test's own comments):
- in file names: two files under `src/lib/will/__tests__/` are named after a customer first name plus a date (the files dated 21 Oct and 23 Oct whose names start with a person's name);
- in upper-case constants holding a customer's message: `abn-no-guarantee-21oct.test.ts:13`, `couple-23oct.test.ts:16`, `foreign-income.test.ts:12`, `one-confirmation-26oct.test.ts:14`, the 23 Oct file `:11`, `courtesy-reply-length.test.ts:17`, `first-message-thanks-22oct.test.ts:11`, `long-message.test.ts:17`, `started-in-mygov-2nov.test.ts:20`, `already-lodged-review.test.ts` (constant used at `:11`);
- in test titles: `sig-guard-5nov.test.ts:9, 12, 15`, `guard-false-positives.test.ts:14, 24, 34, 59, 70, 81`, `will-decides-service-22oct.test.ts:54, 67, 81`, `stage-sync.test.ts:45`, `stuck-24h-20oct.test.ts:41`, `report-14nov.test.ts:34`, `review-72h-25oct.test.ts:10, 20, 41`, `payment-link-name-9nov.test.ts:25`, `thanks-language-21oct.test.ts:51`, `sentence-asks-27oct.test.ts:10`, `decision-log-16oct.test.ts:29, 33`, `documents-acknowledged.test.ts:84, 89, 93`, `closing-only.test.ts:53`, `audit3-sched-30.test.ts:52`, `started-in-mygov-2nov.test.ts:26`, `abn-no-guarantee-21oct.test.ts:29, 45`, `couple-23oct.test.ts:38`, `translated-price-message.test.ts:56`.
- Titles-only files were not searched line by line for names inside fixtures, so this list is a lower bound. The Coverage table has to give those two file paths in full; that is the only place a first name appears in this report.

## Findings

### TESTS-02-F01: Authentication of most session-gated routes is proven only by a regex over source text; Mia and Atlas routes have no route test at all
- Severity: MEDIUM
- Confidence: high (for the gap), n/a for exploitability: the routes read today do contain the check
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-306 (coverage gap for it)
- Files and lines: `src/lib/__tests__/api-route-auth-inventory.test.ts:29, 48-51`; `src/app/api/crm/__tests__/round2-auth.test.ts:79-105`; session mocked as always valid in `src/lib/will/__tests__/approve-payment-draft.test.ts:41`, `audit3-actions-29.test.ts:39`, `audit3-actions-u12.test.ts:23`, `audit3-actions-u13.test.ts:21`, `resolve-needs-reply.test.ts:15`, `stage-badge-back-to-sales.test.ts:40`, `export-72h.test.ts:24`, `audit3-sched-61.test.ts:30`, `audit3-core-74.test.ts:14-15`
- Evidence: the inventory test passes when the marker string appears anywhere in the route file. The per-method test compares text positions. A repo-wide grep found no test file that imports any `/api/mia/*` route, `/api/atlas/action`, `/api/atlas/ask`, `/api/crm/clients/[id]`, `/api/crm/clients/search`, `/api/crm/stats`, `/api/crm/expense-pdf`, `/api/crm/seed`, `/api/will/seed`, `/api/will/mine`, `/api/will/audit`, `/api/will/messages`. 24 test files import `/api/will/actions`; none of them asserts a 401 (grep for `toBe(401)`).
- Root cause: route tests were written for behaviour after login, and the auth gate was left to the inventory scan.
- Attack prerequisites: none today. The risk is a future edit (a check moved behind an early return, a wrapper that no longer awaits, a commented-out line that keeps the marker text) that the suite would not catch.
- Impact: an unauthenticated route that sends WhatsApp messages (`mia/send`, `will/actions`), moves customers or runs Atlas actions could ship with a green test run.
- Recommended fix: one table-driven behavioural test that calls every exported handler of every non-public route with no cookie and with a forged cookie, and expects 401 and no store, database or network call (see proposed test 1).
- Regression test: proposed tests 1 and 2.
- Limits of this verification: the routes themselves belong to other units; only a grep for `sessionValid` in the Mia and Atlas routes was done here. Tests in TESTS-01 were checked by grep only.

### TESTS-02-F02: The form-token binding in the live `/api/tax-form` route has no test that runs; the only tests are parked outside the Jest match
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-639 (coverage gap for it)
- Files and lines: `security-assessment/proposals/form-completion-token/completion-token-wiring.test.ts.txt:1-45`; `security-assessment/proposals/retention-and-deletion/delete-archive-files.proposed.test.ts:1-52`; `jest.config.js:20`; target code `src/app/api/tax-form/route.ts:49, 304-311`
- Evidence: `jest.config.js` matches only `**/__tests__/**/*.test.(js|ts|tsx)`. The first file is a `.txt` and imports `../route`, which does not exist beside it. The second is not under `__tests__`. The live route already calls `verifyFormToken`, `notifyFormReceivedForCustomer` and reads `FORM_TOKEN_ENFORCE`. A repo-wide grep over test files for `FORM_TOKEN_ENFORCE` and `notifyFormReceivedForCustomer` returned nothing. `/api/tax-form/link` is imported by no test.
- Root cause: the proposal was applied to the route but its test was not moved into the suite.
- Attack prerequisites: none for the gap itself.
- Impact: the control that stops a form submission from being attached to another customer's chat (by typing their number) can regress unnoticed. Note also what the parked test pins for phase 1 (`.txt:32-39`): a forged, expired or other-brand token falls back to matching by the typed phone number, so until `FORM_TOKEN_ENFORCE=true` the token adds no protection against a typed number.
- Recommended fix: move both tests under a `__tests__` folder with working imports; add the enforce-mode cases (proposed test 3).
- Regression test: proposed tests 3 and 4.
- Limits of this verification: whether `FORM_TOKEN_ENFORCE` is set in production is unknown. `deleteTaskAndArchive` was not opened; whether the retention patch was applied is unknown.

### TESTS-02-F03: Single use of the residency fix link is tested one request after another only; store failures and the cross-site guard are mocked away
- Severity: LOW
- Confidence: medium
- Status: REQUIRES_RUNTIME_VALIDATION
- CWE: CWE-367
- Files and lines: `src/app/api/tax-form/__tests__/fix-route.test.ts:18-19, 29-36`; target `src/app/api/tax-form/fix/route.ts:32-42`
- Evidence: the test sends the same token twice in sequence and expects 409. The route reads the used marker, does the update, then writes the marker; a failed read is treated as "not used" (`.catch(() => null)`), and a failed write is logged only. The test mocks `isRateLimited` to false and `crossSiteFormReason` to null, so neither refusal path is exercised for this route.
- Root cause: check-then-set with no atomic claim; tests cover the happy order only.
- Attack prerequisites: possession of a valid fix link (the customer, or anyone the message is forwarded to) and two near-simultaneous requests, or a store outage.
- Impact: the tax status on an open task can be changed more than once with one link. Limited to `resident` / `whm` on that customer's own task.
- Recommended fix: claim the nonce atomically before the update (insert-if-absent), fail closed when the marker cannot be read.
- Regression test: proposed test 5.
- Limits of this verification: not run. The store's `setSetting` semantics were not read.

### TESTS-02-F04: Several tests pin fail-open behaviour, so making the code fail closed would break the suite
- Severity: LOW
- Confidence: high (that the tests assert it)
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-636
- Files and lines:
  - `src/lib/__tests__/field-seal-18nov.test.ts:41-45`: with no `FIELD_ENC_KEYS` / `FIELD_ENC_ACTIVE`, `sealField` returns the TFN in plaintext (the code only warns, `src/lib/field-seal.ts:30`).
  - `src/lib/__tests__/auth-session-revocation.test.ts:34`: the synchronous `validateSession` accepts a revoked token on a cold instance ("documented weakness"); `:43-47`: with Redis down, validation falls back to memory and still returns true. `src/lib/will/__tests__/audit3-ui-25.test.ts:47` and `sec2-cron-auth.test.ts:6, 68-73` show callers that use the synchronous check (the cron path with `ensureRevocationFresh` mocked).
  - `src/lib/will/__tests__/send-rate-limit.test.ts:65-72`: a store failure allows the send.
  - `src/lib/will/__tests__/webhook-brand-26oct.test.ts:75-76`: with no phone-number id configured, or none in the payload, any inbound message is treated as WHT.
  - `src/lib/will/__tests__/no-key-in-production.test.ts:42-48`: `WILL_ALLOW_MOCK_BRAIN=true` lets the keyword mock answer customers in production.
- Evidence: each line is an `expect` on the permissive outcome.
- Root cause: availability was chosen over refusal, and the choice was frozen into tests without a production-only counterpart.
- Attack prerequisites: a mis-set or missing environment variable, or a Redis / database outage.
- Impact: TFN and bank details stored unencrypted without any failing check; a logged-out session accepted during an outage; no test would flag either.
- Recommended fix: add production-mode tests that expect refusal or a loud fault (proposed tests 6 and 7), and keep the permissive cases for non-production only.
- Regression test: proposed tests 6 and 7.
- Limits of this verification: the production code paths were not read beyond the grep lines named above.

### TESTS-02-F05: The cross-brand phone-number leak check is switched off in three places, and the SVT form end-to-end test is skipped by default
- Severity: INFORMATIONAL
- Confidence: high
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: `src/lib/__tests__/launch-gate.test.ts:28-42` (`it.skip` while the two brands share a number), `src/lib/__tests__/brand-separation-26oct.test.ts:32-34`, `e2e/svt-form.spec.ts:16, 37-39`; `launch-gate.test.ts:44-47` runs only with `SVT_LAUNCH=true`
- Evidence: comments dated 5 Nov say the number check is to be restored when SVT has its own number.
- Root cause: a temporary business decision.
- Attack prerequisites: n/a
- Impact: when SVT gets its own number nothing forces the checks back on.
- Recommended fix: make the launch gate fail when the numbers differ and the phone mark is still absent from the scans.
- Regression test: proposed test 15.
- Limits of this verification: none.

### TESTS-02-F06: Fixtures hold what look like real customer contact details and first names
- Severity: LOW
- Confidence: medium (the test comments call them real cases; the values were not checked against any customer record)
- Status: STRONGLY_SUSPECTED
- CWE: CWE-359
- Files and lines: see Part 3. The clearest: `src/lib/will/__tests__/form-link-retry.test.ts:43-55, 70`; `stage-badge-back-to-sales.test.ts:18`; `decision-log-16oct.test.ts:18-19`; `form-link.test.ts:31-32`
- Evidence: non-reserved mobile numbers and personal webmail addresses beside a first name, with comments such as "exactly ...'s case" and "real situation".
- Root cause: tests were written from production chats.
- Attack prerequisites: read access to the repository or to a build artefact that ships test files.
- Impact: personal information of customers kept in source control with no retention limit.
- Recommended fix: replace with reserved test numbers and `example.invalid` addresses; rename the two files named after a person.
- Regression test: extend the tree scan in `__tests__/security/supply-chain-secrets.test.js` with a rule for phone numbers and e-mail addresses in test files outside an allow-list.
- Limits of this verification: titles-only files were not scanned for names inside fixture bodies.

## Part 4: proposed missing tests (at most 15)

1. TEST NAME: every non-public API handler refuses a caller with no session or a forged session.
   TARGET: all exported handlers under `src/app/api/**/route.ts` except the public list, with priority `mia/*`, `atlas/action`, `atlas/ask`, `will/actions`, `crm/tasks`, `crm/clients/[id]`, `crm/seed`, `will/seed`.
   PRECONDITIONS: no `crm_session` cookie; then a cookie with a random value; `validateSession` real, not mocked; store, Supabase and `fetch` replaced by spies.
   EXPECTED SECURE RESULT: 401 for every method; no spy called; no body parsed.
   RELEVANT CWE: CWE-306.
   REQUIRED ISOLATION: mocked store, Supabase, Redis and network; no environment secrets beyond dummies.

2. TEST NAME: Mia send and move cannot act on a customer of the other brand.
   TARGET: `/api/mia/send`, `/api/mia/move`, `/api/mia/form-link`.
   PRECONDITIONS: valid session; a customer row with brand `wht`; request names that customer id.
   EXPECTED SECURE RESULT: refusal (404 or 403), nothing sent, no stage change, no token issued.
   RELEVANT CWE: CWE-639.
   REQUIRED ISOLATION: in-memory store, `fetch` mocked.

3. TEST NAME: a tax-form submission is bound to the token's customer, and with enforcement on an untokened or wrongly tokened submission touches no customer.
   TARGET: `POST /api/tax-form` (`route.ts:49, 304-311`).
   PRECONDITIONS: `FORM_TOKEN_SECRET` dummy; cases: valid token for customer A with customer B's number typed; forged, expired, other-brand, fix-purpose and missing token with `FORM_TOKEN_ENFORCE=true`.
   EXPECTED SECURE RESULT: valid token drives customer A only; every other case calls neither the bound nor the phone-match notifier and records an unverified submission.
   RELEVANT CWE: CWE-639.
   REQUIRED ISOLATION: mocked db, rate limit, store and form-link module (as in the parked `.txt` test).

4. TEST NAME: the personal form link endpoint gives nothing without a valid token and never returns contact details.
   TARGET: `GET /api/tax-form/link`.
   PRECONDITIONS: no token, junk, expired, other-brand token, token for an unknown customer; then a valid one.
   EXPECTED SECURE RESULT: the invalid cases return the same generic answer with no customer data; the valid case returns no phone number, e-mail, TFN or bank field; cross-site request refused; rate limit applied.
   RELEVANT CWE: CWE-639, CWE-200.
   REQUIRED ISOLATION: mocked store and rate limit.

5. TEST NAME: a fix link changes the status once under two parallel requests, and fails closed when the used marker cannot be read.
   TARGET: `POST /api/tax-form/fix`.
   PRECONDITIONS: one valid fix token; two requests started together with different statuses; second case: `getSetting` rejects.
   EXPECTED SECURE RESULT: exactly one `setTaskTaxStatus` call; the other request gets 409; on a read failure no status change.
   RELEVANT CWE: CWE-367.
   REQUIRED ISOLATION: in-memory store with an artificial delay in `setTaskTaxStatus`; real cross-site guard and rate limiter mock left on.

6. TEST NAME: in production, missing field-encryption keys are a fault, not silent plaintext.
   TARGET: `sealField` and the task write path in `src/lib/db.ts`.
   PRECONDITIONS: `NODE_ENV=production`, `FIELD_ENC_KEYS` unset or `FIELD_ENC_ACTIVE` naming a key that is not in the ring.
   EXPECTED SECURE RESULT: the write is refused or a fault row is raised; no row is inserted with a readable TFN. (This is a proposed behaviour change: today the test at `field-seal-18nov.test.ts:41-45` expects plaintext.)
   RELEVANT CWE: CWE-311, CWE-636.
   REQUIRED ISOLATION: mocked Supabase; random keys generated in the test.

7. TEST NAME: a sealed field that was altered, truncated or sealed under an unknown key id does not open and does not throw.
   TARGET: `openField`.
   PRECONDITIONS: a valid envelope with one flipped character in the ciphertext, in the IV, in the tag; an envelope with key id `k9`; an envelope sealed with another key under the same id.
   EXPECTED SECURE RESULT: empty string each time, no exception, no plaintext fragment.
   RELEVANT CWE: CWE-347.
   REQUIRED ISOLATION: none beyond random keys.

8. TEST NAME: an OTP cannot be reused, and parallel guesses cannot exceed the cap.
   TARGET: `POST /api/crm/verify-otp`.
   PRECONDITIONS: a stored code; (a) the right code sent twice; (b) 20 wrong codes sent in parallel, then the right one.
   EXPECTED SECURE RESULT: (a) the second request is 401 and sets no cookie; (b) at most five comparisons happen and the right code then fails.
   RELEVANT CWE: CWE-294, CWE-307.
   REQUIRED ISOLATION: fake Redis with atomic `incr`.

9. TEST NAME: a pre-auth id or a form token is not accepted as a CRM session.
   TARGET: `validateSessionFresh`, one gated route.
   PRECONDITIONS: `crm_session` cookie set to a valid `crm_preauth` value; to a valid signed form token; to a session token signed with the form-token secret.
   EXPECTED SECURE RESULT: 401 each time.
   RELEVANT CWE: CWE-287, CWE-269.
   REQUIRED ISOLATION: dummy secrets, fake Redis.

10. TEST NAME: gated routes use the fresh session check, so a logged-out token is refused on a cold instance.
    TARGET: `sessionValid` / `cronAuthorized` in `src/lib/will/auth.ts` and the CRM pages.
    PRECONDITIONS: create a session, call `destroySession`, reset modules (cold instance), call a gated route with the old token; repeat with Redis failing.
    EXPECTED SECURE RESULT: 401 on the cold instance; with Redis down the outcome is whatever the owner decides, but it is asserted and not left to the sync path by accident.
    RELEVANT CWE: CWE-613.
    REQUIRED ISOLATION: fake Redis shared across module reloads.

11. TEST NAME: an upload larger than 10 MB with no or a false `content-length` is refused without buffering it all.
    TARGET: `POST /api/tax-form/upload`; multipart uploads on `/api/tfn-form`, `/abn-form`, `/super-form`.
    PRECONDITIONS: a streamed body of 12 MB with `content-length` absent, and one with `content-length: 100`.
    EXPECTED SECURE RESULT: 400 or 413; storage upload never called; the byte budget charged at most the cap.
    RELEVANT CWE: CWE-770.
    REQUIRED ISOLATION: mocked Supabase storage and rate limiter; body generated in memory.

12. TEST NAME: two deliveries of the same WhatsApp message arriving together are processed once.
    TARGET: `claimInbound` in the file store and the Supabase store, through `POST /api/will/webhook`.
    PRECONDITIONS: the same signed payload posted twice with `Promise.all`; real store implementation (file store in a temp folder; Supabase store with a mock that enforces the unique key).
    EXPECTED SECURE RESULT: `handleIncoming` called once; second call returns 200 without side effects.
    RELEVANT CWE: CWE-362.
    REQUIRED ISOLATION: temp directory, mocked engine, dummy app secret.

13. TEST NAME: public form endpoints refuse a request whose `Origin` is another site when `Sec-Fetch-Site` is absent.
    TARGET: `crossSiteFormReason` for `/api/tax-form`, `/tfn-form`, `/abn-form`, `/super-form`, `/tax-form/upload`, `/tax-form/fix`.
    PRECONDITIONS: `Origin: https://evil.example`, `Origin: null`, and the other brand's origin, with no `Sec-Fetch-Site` header; control with the own origin.
    EXPECTED SECURE RESULT: 403 and no task created for the three hostile cases; 200 for the control.
    RELEVANT CWE: CWE-352.
    REQUIRED ISOLATION: mocked db, upload and rate limit. (The intended rule for an absent `Sec-Fetch-Site` was not confirmed; see Open questions.)

14. TEST NAME: no customer-facing send path skips the policy guard.
    TARGET: `deliverOut` / `sendWhatsAppText` / `sendWhatsAppTemplate` callers: `will/actions` manual reply and template send, `mia/send`, scheduler jobs, `atlas/action`.
    PRECONDITIONS: valid session; a body that the guard blocks (a refund promise, foreign bank details) sent through each path; a free-text send to a customer whose last message is older than 24 hours.
    EXPECTED SECURE RESULT: nothing reaches `fetch`; the message is stored as blocked or a task is raised; outside the window only an approved template goes.
    RELEVANT CWE: CWE-693.
    REQUIRED ISOLATION: in-memory store, `fetch` mocked, fixed clock.

15. TEST NAME: when the two brands have different numbers, the other brand's number is a leak everywhere.
    TARGET: `brandLeaks`, the SVT source scan, the SVT form page.
    PRECONDITIONS: brand config with two different numbers (injected).
    EXPECTED SECURE RESULT: the three disabled checks (`launch-gate.test.ts:32`, `brand-separation-26oct.test.ts:34`, `e2e/svt-form.spec.ts:39`) run and fail on a WHT number in SVT output; the launch gate fails if the numbers differ and the checks are still skipped.
    RELEVANT CWE: CWE-200.
    REQUIRED ISOLATION: config injected in the test; no network.

## Checked and found sound
- Cron authorisation fails closed on a missing or empty secret and on near misses: `src/lib/will/__tests__/sec2-cron-auth.test.ts:26-74`.
- Webhook signature: missing, wrong algorithm, malformed, wrong secret, oversize, handshake without a configured token: `src/lib/will/__tests__/sec-webhook-edge-cases.test.ts:41-81`.
- OTP: forged pre-auth ids create no Redis state; five-guess cap burns the code: `src/app/api/crm/verify-otp/__tests__/sec2-otp-keys.test.ts:31-54`.
- Login lockout is atomic under parallel attempts and scoped per IPv6 /64: `src/lib/__tests__/auth-session-revocation.test.ts:66-78`, `auth-lockout-scope.test.ts`.
- CSRF guard for CRM and Will API trees including `Origin: null` and same-site: `src/lib/__tests__/request-guard.test.ts:19-42`.
- Document proxy path hardening and no-session refusal: `src/app/api/crm/file/__tests__/path-hardening.test.ts`.
- Upload content sniffing and file-name confinement: `src/lib/__tests__/upload-sniffing.test.ts:18-41`.
- Anonymous submissions cannot reference other customers' or the other brand's stored files: `src/app/api/tax-form/__tests__/invoice-urls-scope.test.ts:14-21`, `src/lib/__tests__/public-form-upload-url.test.ts`.
- Form token library: expiry, brand, key, tamper, purpose: `src/lib/will/__tests__/form-token.test.ts:20-73`.
- SSRF and bearer-token scope for Meta media URLs: `src/lib/will/__tests__/meta-outbound-url-round2.test.ts`.
- Kill switch reads fail safe: `src/lib/will/__tests__/sec2-will-redteam-killswitch-store.test.ts:10-13`.
- Template parameters cannot change recipient, type or layout: `src/lib/will/__tests__/sec2-will-redteam-template.test.ts:25-56`.
- Brand isolation on host parsing, store lookups, send number and receiving number: `src/lib/__tests__/brand-host-absolute-form.test.ts`, `src/lib/will/__tests__/store-brand-26oct.test.ts`, `channel-brand-26oct.test.ts`, `webhook-brand-26oct.test.ts`.
- Error and log redaction: `src/lib/__tests__/log-safe.test.ts:3-32`; rate-limit keys hold hashes: `src/app/api/tax-form/__tests__/ratelimit-key-pii.test.ts`.
- Test fixtures in the files read in full use reserved ranges for IPs and `example.invalid` for e-mail, with the exceptions listed in Part 3.

## Open questions
- Is `FORM_TOKEN_ENFORCE` set to `true` in production? If not, the token does not stop a submission from being matched by a typed phone number (F02).
- Was the retention patch that `delete-archive-files.proposed.test.ts` describes applied to `src/lib/db.ts`? Not checked.
- Which gated routes use the synchronous `validateSession` rather than `validateSessionFresh`? The tests show both exist (F04); the callers were not traced.
- What should a public form do with a request that has an `Origin` from another site but no `Sec-Fetch-Site` header? `cross-site-guard.test.ts:34` allows an absent `Sec-Fetch-Site`; the `Origin` rule for public forms was not read.
- Are the phone numbers and e-mail addresses listed in Part 3 real customer data? The comments suggest so; not verified.
- The secrets scan (`supply-chain-secrets.test.js:65`) skips `security-assessment`, `audit-output`, `output` and `.claude`. Whether those folders are committed or deployed was not checked.
- 292 files were reviewed by titles only (one of them in part). A security assertion or a sensitive fixture inside the body of those files can have been missed.
