# TESTS-01 report

Scope: security test coverage of 132 test files (22,000 lines by the unit list). This unit was reviewed by the method the task set, which differs from the default brief: describe/it titles of every file by grep, and a full read only of the files that test authentication, authorisation, sessions, rate limits, uploads, webhooks, the policy guard, encryption and secrets. No test, build or script was run. Nothing was changed except this file.

Totals: 23 files read in full (5,063 lines), 3 files read in part (155 lines), 104 files by titles only, 2 binary fixtures not opened. About 5,218 of 22,000 lines were read line by line.

## Coverage

"titles only" means: the describe/it/test title lines were read from grep output, the bodies were not. Claims about those files rest on titles and on targeted greps (mocks, imports, phone-like strings), not on the assertions.

| file | lines | ranges read | status |
|---|---|---|---|
| __tests__/forms.test.js | 251 | 1-120, titles for 121-251 | PARTIALLY_REVIEWED |
| __tests__/partners-client.test.tsx | 153 | titles only | PARTIALLY_REVIEWED (titles only) |
| __tests__/security/sec2-supply-ir.test.ts | 607 | 1-607 | REVIEWED |
| e2e/brand-isolation.spec.ts | 219 | titles only | PARTIALLY_REVIEWED (titles only) |
| e2e/fixtures/test.pdf | 0 | none | BLOCKED: binary fixture (45 and 70 bytes by ls), not opened |
| e2e/fixtures/test.png | 0 | none | BLOCKED: binary fixture (45 and 70 bytes by ls), not opened |
| src/app/api/tax-form/__tests__/brand-26oct.test.ts | 109 | 1-109 | REVIEWED |
| src/app/api/tax-form/__tests__/notes-injection.test.ts | 136 | 1-136 | REVIEWED |
| src/app/api/tax-form/upload/__tests__/content-sniffing.test.ts | 140 | 1-140 | REVIEWED |
| src/lib/__tests__/api-handler-inventory-round2.test.ts | 236 | 1-236 | REVIEWED |
| src/lib/__tests__/brand-isolation-round2.test.ts | 223 | 1-223 | REVIEWED |
| src/lib/__tests__/brand-routing-26oct.test.ts | 168 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/__tests__/db-brand-scope-round2.test.ts | 117 | 1-117 | REVIEWED |
| src/lib/__tests__/field-crypto.test.ts | 122 | 1-122 | REVIEWED |
| src/lib/__tests__/leads.test.ts | 112 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/__tests__/new-locales-sitemap.test.ts | 127 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/__tests__/normalise-labels.test.ts | 127 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/__tests__/round2-frontend-security.test.ts | 335 | 1-335 | REVIEWED |
| src/lib/__tests__/sec2-rate-limit-abuse.test.ts | 167 | 1-167 | REVIEWED |
| src/lib/__tests__/sec2-security-email.test.ts | 70 | 1-70 | REVIEWED |
| src/lib/__tests__/security-fixes.test.ts | 226 | 1-226 | REVIEWED |
| src/lib/__tests__/submit-invoices.test.ts | 189 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/__tests__/supabase-schema-guards.test.ts | 109 | 1-109 | REVIEWED |
| src/lib/svt/__tests__/i18n-rules-26oct.test.ts | 123 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/after-reply.test.ts | 129 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/answer-first.test.ts | 109 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit-72h-fixes.test.ts | 134 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-actions-2.test.ts | 150 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-actions-3.test.ts | 125 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-actions-34.test.ts | 113 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-actions-56.test.ts | 138 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-actions-63.test.ts | 136 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-actions-7.test.ts | 109 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-actions-u14.test.ts | 131 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-actions-u19.test.ts | 170 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-actions-u3.test.ts | 140 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-core-0.test.ts | 130 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-core-12.test.ts | 158 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-core-15.test.ts | 119 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-core-25.test.ts | 138 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-core-32.test.ts | 137 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-core-39.test.ts | 125 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-core-4.test.ts | 131 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-core-41.test.ts | 166 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-core-43.test.ts | 108 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-core-48.test.ts | 128 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-core-5.test.ts | 147 | 110-125, titles for the rest | PARTIALLY_REVIEWED |
| src/lib/will/__tests__/audit3-core-52.test.ts | 158 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-core-55.test.ts | 109 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-core-u44.test.ts | 121 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-sched-14.test.ts | 148 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-sched-21.test.ts | 219 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-sched-26.test.ts | 169 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-sched-33.test.ts | 122 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-sched-35.test.ts | 133 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-sched-40.test.ts | 147 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-sched-42.test.ts | 224 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-sched-54.test.ts | 129 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-sched-6.test.ts | 169 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-sched-60.test.ts | 120 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/audit3-sched-75.test.ts | 118 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/autopilot-debounce.test.ts | 222 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/chat-preview-truth.test.ts | 125 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/choice-then-price.test.ts | 113 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/deliver-out.test.ts | 178 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/delivery-status.test.ts | 161 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/document-drop.test.ts | 133 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/engine-payment-thanks-30oct.test.ts | 129 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/estimate-send.test.ts | 127 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/expense-pdf.test.ts | 108 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/followup-gates-30oct.test.ts | 223 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/followup-language.test.ts | 125 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/followups-route.test.ts | 175 | 60-78, titles for the rest | PARTIALLY_REVIEWED |
| src/lib/will/__tests__/guard-bypasses.test.ts | 195 | 1-195 | REVIEWED |
| src/lib/will/__tests__/guard-false-positives-30oct.test.ts | 207 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/inbound-window.test.ts | 111 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/invalid-transition.test.ts | 235 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/jo-decisions-30oct-b.test.ts | 299 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/judgement-rulebook.test.ts | 116 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/language-30oct.test.ts | 168 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/lost-leads.test.ts | 174 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/many-questions.test.ts | 149 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/mark-read-pauses-will.test.ts | 163 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/media.test.ts | 120 | 1-120 | REVIEWED |
| src/lib/will/__tests__/medicare-auto.test.ts | 153 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/monthly-conversion.test.ts | 181 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/one-confirmation-scheduler-23oct.test.ts | 109 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/paid-never-chased.test.ts | 149 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/payable-followup-30oct.test.ts | 155 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/payment-claim.test.ts | 207 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/payment-confirmation-template-autoreply.test.ts | 128 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/payment-proof-approval.test.ts | 363 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/payment-proof-documents-30oct.test.ts | 202 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/payment-proof-once.test.ts | 141 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/payment-proof.test.ts | 141 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/phone-candidates.test.ts | 125 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/playbook-30oct.test.ts | 126 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/playbook-rules.test.ts | 165 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/policy-guard.test.ts | 700 | 1-700 | REVIEWED |
| src/lib/will/__tests__/pre-payment-one-line.test.ts | 113 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/price-flow-e2e-16nov.test.ts | 250 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/residency-quiz-22oct.test.ts | 119 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/review-flow-9nov.test.ts | 143 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/scheduler-auto-reply-timer.test.ts | 111 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/scheduler-job-crash.test.ts | 144 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/sec2-redteam-corpus.ts | 335 | 1-335 | REVIEWED |
| src/lib/will/__tests__/sec2-will-redteam-guard.test.ts | 113 | 1-113 | REVIEWED |
| src/lib/will/__tests__/sec2-will-redteam-media.test.ts | 123 | 1-123 | REVIEWED |
| src/lib/will/__tests__/sec2-will-redteam-service.test.ts | 241 | 1-241 | REVIEWED |
| src/lib/will/__tests__/sec2-will-redteam-webhook.test.ts | 207 | 1-207 | REVIEWED |
| src/lib/will/__tests__/send-failure-30oct.test.ts | 109 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/send-followup-auto-pick.test.ts | 112 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/send-guards-30oct.test.ts | 188 | 1-188 | REVIEWED |
| src/lib/will/__tests__/silence-net-1nov.test.ts | 186 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/svt-mia-review-27oct.test.ts | 140 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/system-placeholders.test.ts | 141 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/system-report.test.ts | 116 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/template-coverage.test.ts | 195 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/text-normalize.test.ts | 216 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/thanks-after-team-21oct.test.ts | 116 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/thanks-send-chain-29oct.test.ts | 513 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/w2-handoff-3nov.test.ts | 140 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/w2-knowledge-3nov.test.ts | 204 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/w2-language-3nov.test.ts | 163 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/w2-payments-3nov.test.ts | 200 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/w2-scheduler-3nov.test.ts | 219 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/w2-send-failure-3nov.test.ts | 130 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/w2-service-3nov.test.ts | 162 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/w2-stages-3nov.test.ts | 118 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/w3-scheduler-3nov.test.ts | 319 | titles only | PARTIALLY_REVIEWED (titles only) |
| src/lib/will/__tests__/webhook.test.ts | 244 | 1-244 | REVIEWED |
| src/lib/will/__tests__/will-decides-engine-22oct.test.ts | 146 | titles only | PARTIALLY_REVIEWED (titles only) |

## Findings

Findings here are about test coverage and about data inside test files, as the task asked. They are not bugs in production code; where a test only suggests a production weakness it is marked REQUIRES_RUNTIME_VALIDATION.

### TESTS-01-F01: Real customer phone numbers and names in test comments, titles and one fixture
- Severity: MEDIUM
- Confidence: medium (the files themselves label these as production cases; I did not check them against the database)
- Status: CONFIRMED_BY_STATIC_EVIDENCE (that the strings are present); whether each belongs to a living customer is not verifiable here
- CWE: CWE-359, CWE-540
- Files and lines (location only, values not reproduced):
  - Full international number with a first name or full name, in a comment: `src/lib/will/__tests__/policy-guard.test.ts:604` (first name, "real Decision Log entry"), `:635` (full name, described as a paid customer), `src/lib/will/__tests__/pre-payment-one-line.test.ts:2`, `src/lib/will/__tests__/playbook-rules.test.ts:128`, `src/lib/will/__tests__/system-placeholders.test.ts:98`
  - Full number, no name, in a comment marked as found in production: `src/lib/will/__tests__/invalid-transition.test.ts:4`, `src/lib/will/__tests__/inbound-window.test.ts:4`, `src/lib/will/__tests__/one-confirmation-scheduler-23oct.test.ts:2`
  - Full number inside a `describe` title, so it is printed in every test run and CI log: `src/lib/will/__tests__/payment-proof.test.ts:127`
  - Fixture value: `waId` that does not follow the synthetic pattern used elsewhere, with a first name, in a file whose title says "her case": `src/lib/will/__tests__/residency-quiz-22oct.test.ts:12` and `:47`
  - First name plus country code and operator prefix (partial number): `src/lib/will/__tests__/audit-72h-fixes.test.ts:28`, `:51` (five first names in a title), `:99`; `src/lib/will/__tests__/playbook-rules.test.ts:59`, `:81`, `:149`, `:158`; `src/lib/will/__tests__/invalid-transition.test.ts:191`; `src/lib/will/__tests__/payment-proof.test.ts:41`; `src/lib/will/__tests__/policy-guard.test.ts:658`
  - Unverified, may be invented: full personal name in a fixture `src/lib/will/__tests__/review-flow-9nov.test.ts:33`; mobile number in a fixture `src/lib/__tests__/security-fixes.test.ts:147`; several numbers in `src/lib/__tests__/leads.test.ts:78-110`
- Evidence: comments of the form "FOUND IN PRODUCTION", "real Decision Log entry", "Real case", followed by a name and a complete number. The red-team corpus header (`sec2-redteam-corpus.ts:4`) says no real customer or number is used, which holds for that file but not for the unit.
- Root cause: regression tests were written from live conversations and the identifying reference was copied into the test.
- Attack prerequisites: read access to the repository, a source zip, or CI logs.
- Impact: personal data of tax clients (identity plus the fact that they are a client, and in places their payment status or tax question) leaves the CRM. The title at `__tests__/security/sec2-supply-ir.test.ts:173` says the source release profile covers docs and tests (the body shows docs only; the script was not opened), and the release scanner tested there looks for TFNs and credential shapes only, not phone numbers, so nothing stops these from being packaged.
- Recommended fix: replace each with a neutral case id; use reserved or obviously synthetic numbers in fixtures; add a phone-number rule to `scripts/lib/secret-scan.cjs` for the source profile. A grep outside this unit showed the same comment pattern in other test files under `src/lib/will/__tests__/` (not in my list, not reviewed).
- Regression test: scanner test that a line holding a name followed by a bracketed international number is flagged in the source profile and that the finding does not echo the value.
- Limits of this verification: 104 files were read by title only; the location list comes from pattern greps over all 130 text files, so numbers written in an unusual format may be missed.

### TESTS-01-F02: Authorisation of gated routes is proved by source-text regex, not by calling the route
- Severity: MEDIUM
- Confidence: high
- Status: CONFIRMED_BY_STATIC_EVIDENCE
- CWE: CWE-306, CWE-862 (as a coverage gap)
- Files and lines: `src/lib/__tests__/api-handler-inventory-round2.test.ts:110-124`, `:144-165`
- Evidence: for each of the roughly 60 session or cron handlers the test passes when (a) the handler text contains one of the tokens `validateSession(`, `sessionValid(`, `cronAuthorized(`, `auth(req)`, `authed(`; (b) that token appears before the first body, store or database token; (c) the text contains `401` somewhere. It does not check that the result of the call is used, that the token is not in a comment or string, or that the 401 is returned on the failing branch. The handler text is cut at the next `\nexport ` or `// =====`, so a helper declared after the handler is counted as part of it, and work done in a helper declared above the handler is not seen at all. `will/actions` is special-cased by slicing from `async function handlePost` to the end of the file (`:154`).
- Behavioural missing-session tests found in this unit: `will/export` (`__tests__/security/sec2-supply-ir.test.ts:308-314`), `will/media/[id]` (`src/lib/will/__tests__/sec2-will-redteam-media.test.ts:115-122`), `will/state` (`src/lib/will/__tests__/audit3-core-5.test.ts:119-123`), `will/followups` (`src/lib/will/__tests__/followups-route.test.ts:71-76`). That is 4 handlers. The sibling unit lists two more by title (`crm/file`, `crm/leads`), not read by me.
- `will/actions`, the route that sends messages, moves stages and deletes customers, is driven by ten test files in this unit and every one of them mocks `sessionValid` to true (for example `audit3-actions-2.test.ts:37`, `audit3-actions-u14.test.ts:41`, `send-followup-auto-pick.test.ts:42`). I found no test in this unit that calls it without a session.
- Root cause: the inventory test was built to catch a newly added unguarded method cheaply; behaviour tests were added only where a route was being changed for another reason.
- Attack prerequisites: none for the test gap itself. It matters only if a handler has the token but the wrong control flow.
- Impact: a handler such as `const ok = await sessionValid(req)` with a missing `if (!ok) return 401`, or a 401 on one branch only, would pass the whole suite.
- Recommended fix: one table-driven test that imports every gated route module, calls every exported method with no cookie and with a garbage cookie, and asserts status 401 and zero calls on mocked `getStore`, `getSupabase`, `deliverOut` and `fetch`.
- Regression test: proposed tests 1 and 2 below.
- Limits of this verification: I did not open the route files, so I do not claim any route is actually unguarded.

### TESTS-01-F03: No behavioural CSRF or origin test in this unit; cookie flags are checked by regex on source
- Severity: LOW
- Confidence: medium
- Status: CONFIRMED_BY_STATIC_EVIDENCE for this unit; REQUIRES_RUNTIME_VALIDATION for the product
- CWE: CWE-352
- Files and lines: `src/lib/__tests__/round2-frontend-security.test.ts:320-334` (regex over `cookies.set(...)` blocks in the login and verify-otp route files for `httpOnly`, `sameSite: 'strict'`, `secure`, `path`, `maxAge`); `:229-233` (postMessage origin check, regex on one line of a client file)
- Evidence: no test in the 132 files sends a state-changing request with a foreign `Origin` or `Sec-Fetch-Site` and asserts a refusal. A grep for origin, sec-fetch and csrf across the unit found only CORS-absence checks, brand host tests and unrelated wording. The sibling unit has `src/lib/__tests__/request-guard-mia-17nov.test.ts` whose titles cover four Mia routes; whether `will/actions` and `crm/*` writes are covered there I did not verify.
- Root cause: reliance on SameSite=Strict as the control, proved by text.
- Attack prerequisites: n/a (coverage gap).
- Impact: a change that drops the cross-site guard from a write route, or sets the cookie through a helper the regex does not see, is not caught here.
- Recommended fix: proposed test 3; and replace the cookie regex with a call to the login/OTP handlers that reads `Set-Cookie` from the response.
- Regression test: proposed test 3.
- Limits of this verification: the guard implementation was not opened.

### TESTS-01-F04: Tests that pin a weak or fail-open behaviour, or assert so loosely that they cannot fail
- Severity: LOW
- Confidence: high for the test text; low for production impact
- Status: CONFIRMED_BY_STATIC_EVIDENCE (tests); REQUIRES_RUNTIME_VALIDATION (production)
- CWE: CWE-636, CWE-1164
- Files and lines:
  - `src/lib/will/__tests__/sec2-will-redteam-service.test.ts:77-82`: the kill switch stored as the string "true" is documented as not counting as ON ("the check is `=== true`"). The assertion only reads the setting back; it does not show what the service then does. If the comment is right, a setting of the wrong type leaves the kill switch off.
  - `src/lib/will/__tests__/sec2-will-redteam-service.test.ts:233-240`: "a 200 KB message is stored bounded" asserts a stored length of at most 210 KB for a 200 KB input, which is no bound.
  - `src/lib/will/__tests__/sec2-will-redteam-service.test.ts:117-124`: the jailbreak cases assert that no sent body matches a marker; the test passes equally when nothing is sent, so it does not show which layer stopped the text.
  - `src/lib/will/__tests__/sec2-will-redteam-webhook.test.ts:122-127`: wrong-shape JSON may answer 200 or 400.
  - `src/lib/will/__tests__/webhook.test.ts:181-196`: pins unlimited redelivery requests when Redis is unavailable, described in the test as a deliberate fail-open.
  - `__tests__/forms.test.js:38-42`: titled "hashPassword is deterministic" but only checks verify; nothing in the unit asserts a salt, a slow hash or a CSPRNG for the OTP (`:47-49` checks the format only).
  - `__tests__/security/sec2-supply-ir.test.ts:281`: `jest.resetModules` is named without being called, so module state carries across the D, E and F blocks.
- Root cause: documentation-style tests.
- Attack prerequisites: for the kill switch item, write access to settings (owner or database), so it is an operational-error risk rather than an attack.
- Impact: false assurance; the kill switch item could mean Will keeps sending after someone sets the switch by hand in the database.
- Recommended fix: proposed tests 4, 9 and 10; tighten the listed assertions.
- Regression test: proposed test 9.
- Limits of this verification: the service and store code were not opened; the sibling unit has `sec2-will-redteam-killswitch-store.test.ts` (titles: a failed read reports ON), which covers a different case.

### TESTS-01-F05: Business bank details, agent number, ABN and a Meta phone-number id are hard-coded across fixtures
- Severity: INFORMATIONAL
- Confidence: medium
- Status: INFORMATIONAL
- CWE: n/a
- Files and lines: bank block and agent identifiers labelled "real" in `src/lib/will/__tests__/sec2-redteam-corpus.ts:184`, `:190`, `:191`, also `:33`, `:35`, `:95`; the same account pair as sample plaintext in `src/lib/__tests__/field-crypto.test.ts:24`; repeated in 13 further files (list in section 3). A 15-digit WhatsApp phone-number id described as "what Connect saved" in `src/lib/will/__tests__/webhook.test.ts:137`.
- Evidence: the guard tests need the true account pair because the guard allows only that pair. The values are sent to every customer, so this is not a secret; it is recorded because the brief asks for bank numbers by location, and because the phone-number id looks like the live configuration value rather than a placeholder.
- Root cause: the guard's allowlist is the real value.
- Attack prerequisites: none.
- Impact: none beyond what the price message already discloses; the phone-number id is an identifier, not a credential.
- Recommended fix: import the pair from the one config constant instead of repeating literals; replace the phone-number id with an obviously fake one.
- Regression test: n/a.
- Limits of this verification: I did not confirm the phone-number id against the environment.

## 1. Security controls and negative tests

Legend: B = behavioural negative test (calls the code and asserts the refusal); S = source-text assertion only; none = nothing found in this unit. "TESTS-02" marks a sibling-unit file seen by title only.

| negative case | status in this unit | where | gap |
|---|---|---|---|
| Authentication failure (wrong secret, bad signature) | B for webhook HMAC, verify token, missing app secret; B for session token garbage and suffix tamper; none for wrong password, wrong OTP, wrong cron secret | `webhook.test.ts:81-110`, `sec2-will-redteam-webhook.test.ts:60-85`, `__tests__/forms.test.js:56-63` | login, OTP and cron are in TESTS-02 (`round2-auth`, `sec2-otp-keys`, `sec2-cron-auth`); no expiry or re-signed-payload case here |
| Missing session | B for 4 routes; S for all other gated handlers | see F02 | `will/actions`, all `crm/*`, `mia/*`, `atlas/*` have no behavioural test here |
| CSRF / origin | S (cookie flags, postMessage origin); none behavioural | `round2-frontend-security.test.ts:229-233`, `:320-334` | see F03 |
| IDOR / object ownership | B for brand scope in db lookups and for "opt out another number"; B for media id shape; none for file URL ownership or record ids | `db-brand-scope-round2.test.ts:61-117`, `sec2-will-redteam-service.test.ts:96-102`, `sec2-will-redteam-media.test.ts:109-114` | a public submitter attaching another submission's in-bucket URL is not tested (`notes-injection.test.ts:108-131` accepts any in-bucket path) |
| Invalid input | B, strong | `content-sniffing.test.ts`, `notes-injection.test.ts`, `security-fixes.test.ts:88-200`, `sec2-will-redteam-webhook.test.ts:117-152`, `sec2-will-redteam-service.test.ts:135-176` | none noted |
| Oversized body | B for webhook (declared and actual), upload (10 MB boundary), media download (declared length), upload byte budget | `sec2-will-redteam-webhook.test.ts:129-140`, `content-sniffing.test.ts:129-139`, `sec2-will-redteam-media.test.ts:65-70`, `sec2-rate-limit-abuse.test.ts:123-166` | no size test for the multipart form routes (`tax-form`, `tfn-form`, `abn-form`, `super-form`) or for `will/actions` JSON; media download without a declared length |
| Replay / duplicate | B for webhook message id (claim mocked), duplicate sends in `deliverOut`, one confirmation per kind | `webhook.test.ts:154-160`, `sec2-will-redteam-webhook.test.ts:111-116`, `send-guards-30oct.test.ts:48-96`; by title `thanks-send-chain-29oct.test.ts:295-344`, `deliver-out.test.ts:148-170`, `payment-proof-once.test.ts` | the atomicity of the claim itself is mocked in the two webhook files I read |
| Concurrency | by title only: rival autopilot timers, one pending timer per customer | `audit3-core-32.test.ts`, `audit3-core-39.test.ts` (titles) | no parallel-request test of a real store claim; no double-tick test for follow-ups seen in titles; login burst is in TESTS-02 |
| Sensitive data in output | B for audit rows (no name, number, raw sid, media id, search text), rate-limit keys (hashed), security email log, flood audit, crypto error messages, scanner output; S for stack/env in responses and error echo | `sec2-supply-ir.test.ts:286-354`, `sec2-rate-limit-abuse.test.ts:63-90`, `sec2-security-email.test.ts:33-42`, `sec2-will-redteam-webhook.test.ts:172-177`, `field-crypto.test.ts:69-76`, `api-handler-inventory-round2.test.ts:217-235` | no test that console logs on the webhook failure path, or the model prompt, are free of TFN and bank text |
| Privilege escalation | B for mass assignment on the public form, model-supplied recipient/state/approved_key, template flag not exempting bank or agent claims | `notes-injection.test.ts:71-87`, `sec2-will-redteam-service.test.ts:137-162`, `sec2-will-redteam-guard.test.ts:50-54` | no test that a pre-auth (password-step) cookie is refused as a session |

By control area:

| control | negative tests present | kind |
|---|---|---|
| WhatsApp webhook signature, size, shape, flood | yes | B |
| Webhook phone-number-id routing | yes (`webhook.test.ts:113-151`) | B |
| Upload type sniffing, object name, size, brand prefix | yes | B, storage and limiter mocked |
| Upload rate limit and byte budget at the route | limiter unit-tested; route always sees "not limited" (`content-sniffing.test.ts:18`) | B for the library only |
| Rate limiter (IPv6 /64, Redis failure, key flood, PII in keys) | yes | B |
| Field encryption (AAD binding, tamper, rotation, plaintext refusal) | yes; no truncated or malformed-envelope case | B |
| Policy guard (content rules, hard gates, 24-hour window) | yes, extensive; 24-hour window in `sec2-will-redteam-guard.test.ts:55-58` | B |
| Model output validation and cross-customer history | yes | B |
| Media proxy SSRF, token scope, content type | yes | B |
| Brand isolation (routing, host spellings, db lookups) | yes | B on Next matchers, plus S for header use |
| CRM session, login, OTP, logout | only token validity basics here | B (minimal); rest in TESTS-02 |
| Cron secret | none here | S (`api-handler-inventory-round2.test.ts:202-206`); B in TESTS-02 by title |
| Database RLS, grants, function privileges | S over migration SQL only | S |
| Security headers and CSP | computed from config with Next's matcher | B on config, not on a running server |
| XSS sinks, storage use, third-party origins | S | S |
| Release packaging and secret scanner | yes, runs the script on a temp fixture | B |

## 2. Tests that assert on source text rather than behaviour

30 of the 130 text files call `readFileSync`. Those I read in full:

- `src/lib/__tests__/api-handler-inventory-round2.test.ts`: the whole file (route inventory, auth ordering `:144-165`, rate-limiter presence `:175-180`, HMAC-before-parse by `indexOf` `:191-197`, constant-time compare by token name `:198-206`, no CORS, no stack, no error echo `:209-235`).
- `src/lib/__tests__/supabase-schema-guards.test.ts`: the whole file (RLS, grants, SECURITY DEFINER search_path, service-role key users, PostgREST filter strings, LIKE escaping by regex `:103-108`). No database is contacted, so the live schema is not proved.
- `src/lib/__tests__/round2-frontend-security.test.ts`: `:83-92` (CSV encoder imported), `:162-166`, `:174-179`, `:182-225` (XSS sinks), `:228-278` (postMessage, storage, third parties), `:291-313` (noindex), `:320-334` (cookie flags). The header tests `:95-160` and the CSV cell tests `:55-82` are behavioural.
- `src/lib/__tests__/brand-isolation-round2.test.ts:198-222`: forwarded-host headers and `brandFromHost` callers by regex. The rest is behavioural.
- `__tests__/security/sec2-supply-ir.test.ts`: `:396-407` (routes call `recordDataRead`), `:483-488` (stores stamp audit rows; actions route wraps requests), `:499`, `:502-507` (the `customer_deleted` audit line contains `slice(-4)`), `:509-513`, plus config-file checks `:197-235`.
- `src/lib/will/__tests__/send-guards-30oct.test.ts:180-187`: the knowledge seed contains a fixed password sentence.

Titles only, flagged by a `readFileSync` count and by titles such as "source shape", "wiring", "source-pinned": `audit3-actions-u14` (`:123-124`), `audit3-actions-u3` (`:66-67`, `:83-84`, `:136`), `audit3-core-15` (`:88-110`), `audit3-core-25` (`:108-130`), `audit3-core-32` (`:129-130`, migration text), `audit3-core-4`, `audit3-core-48` (`:113-117`), `audit3-core-52` (`:141-151`), `audit3-sched-14` (`:127-141`), `audit3-sched-21` (`:212-213`), `audit3-sched-26` (`:158-159`), `audit3-sched-35` (`:109-129`), `audit3-sched-54` (`:91-122`), `audit3-sched-60` (`:93-114`), `choice-then-price` (`:81-83`, `:108`), `jo-decisions-30oct-b`, `medicare-auto` (`:103-147`), `payable-followup-30oct` (`:142-150`), `payment-proof`, `playbook-30oct`, `review-flow-9nov` (`:127`), `svt-mia-review-27oct`, `w2-service-3nov`, `new-locales-sitemap`. Line numbers are the title lines; the assertions were not read.

Security relevance: the items that matter are the first four files above. The Will "wiring" tests pin business flow, not access control.

## 3. Secrets, real phone numbers, real names and TFN-like values in fixtures (location only)

No live credential shape was found. Token-shaped strings are synthetic or split so the file never holds one: `__tests__/security/sec2-supply-ir.test.ts:26-28`, `:103`, `:154`; `src/lib/will/__tests__/sec2-redteam-corpus.ts:60`; `src/lib/will/__tests__/policy-guard.test.ts:226`; `src/lib/__tests__/sec2-security-email.test.ts:7`; `src/lib/will/__tests__/webhook.test.ts:34-35`; `src/lib/will/__tests__/sec2-will-redteam-media.test.ts:5`, `:30`.

- Real or probably real customer phone numbers and names: see F01 for the full list.
- TFN-like values, all the public test number, a non-checksum number, or generated at run time: `src/lib/__tests__/field-crypto.test.ts:12`, `:79-80`, `:114-118`; `__tests__/security/sec2-supply-ir.test.ts:30-37`, `:42-43`, `:54-55`; `src/lib/__tests__/security-fixes.test.ts:146`; `src/lib/__tests__/submit-invoices.test.ts:34`; `src/lib/will/__tests__/choice-then-price.test.ts:67`; `src/lib/will/__tests__/sec2-will-redteam-service.test.ts:111`; `src/lib/will/__tests__/sec2-redteam-corpus.ts:51`, `:52`, `:308`. A Medicare-card-shaped number: `sec2-redteam-corpus.ts:53`.
- Password-like literal allowed as customer text (a third-party temporary password): `src/lib/will/__tests__/policy-guard.test.ts:215`, `:230`; `src/lib/will/__tests__/send-guards-30oct.test.ts:184`.
- Business bank account pair, agent number or ABN: `src/lib/__tests__/field-crypto.test.ts:24`; `src/lib/will/__tests__/sec2-redteam-corpus.ts:33`, `:35`, `:95`, `:184`, `:190`, `:191`; `answer-first.test.ts:20`, `:102`; `audit-72h-fixes.test.ts:21`, `:47`, `:87`, `:92`; `choice-then-price.test.ts:45`, `:63`, `:69`, `:77`, `:98`; `engine-payment-thanks-30oct.test.ts:19`; `guard-false-positives-30oct.test.ts:16-19`; `invalid-transition.test.ts:42`; `price-flow-e2e-16nov.test.ts:146`, `:182`, `:199`, `:209`, `:239`, `:248`; `silence-net-1nov.test.ts:141`; `svt-mia-review-27oct.test.ts:17`, `:60`, `:93`; `thanks-send-chain-29oct.test.ts:169`; `w2-payments-3nov.test.ts:65-66`; `will-decides-engine-22oct.test.ts:22`, `:73` (all under `src/lib/will/__tests__/`).
- Meta phone-number id: `src/lib/will/__tests__/webhook.test.ts:137`, `:142`.
- Email addresses: fixtures use reserved domains except `src/lib/__tests__/leads.test.ts:16-64` (invented-looking names on a consumer mail domain, 14 lines) and the business contact address at `guard-false-positives-30oct.test.ts:178`, `send-guards-30oct.test.ts:130`, `e2e/brand-isolation.spec.ts:147`.
- Binary fixtures `e2e/fixtures/test.pdf` and `test.png` were not opened.

## 4. Proposed missing tests (15)

1. TEST NAME: will/actions refuses every action without a session. TARGET: `src/app/api/will/actions/route.ts` POST. PRECONDITIONS: `sessionValid` resolves false; store, channel and fetch mocked with spies; one request per action name the route accepts. EXPECTED SECURE RESULT: 401 for each; zero store writes, zero `deliverOut` calls, zero audit rows with actor owner. RELEVANT CWE: CWE-306, CWE-862. REQUIRED ISOLATION: mocked store and channel, no network, no real data.
2. TEST NAME: every gated handler answers 401 with no cookie and with a garbage cookie. TARGET: all routes classed session or cron in `api-handler-inventory-round2.test.ts:27-93`. PRECONDITIONS: real `validateSession`; `getStore`, `getSupabase`, `@/lib/db` and `fetch` replaced by throwing spies. EXPECTED SECURE RESULT: 401 from every exported method; no spy called; body carries no data. RELEVANT CWE: CWE-306. REQUIRED ISOLATION: module mocks only; test env secrets; no database.
3. TEST NAME: a cross-site POST to a state-changing CRM or Will route is refused. TARGET: the cross-site request guard (file not opened; named in `request-guard-mia-17nov.test.ts`) with `/api/will/actions`, `/api/crm/clients/[id]` DELETE, `/api/crm/partners` POST, `/api/will/whatsapp/connect`. PRECONDITIONS: valid session cookie; `Origin` of another site, and separately `Sec-Fetch-Site: cross-site`, and a missing Origin with a foreign Referer. EXPECTED SECURE RESULT: 403 before the handler runs; same-origin control passes. RELEVANT CWE: CWE-352. REQUIRED ISOLATION: handler mocked; no network.
4. TEST NAME: session token is rejected when expired, re-signed with another secret, or its payload is edited under the old signature. TARGET: `validateSession` in `src/lib/crm-store`. PRECONDITIONS: token minted with a fake clock; second secret for the forgery; payload edit that extends expiry. EXPECTED SECURE RESULT: false in all three cases; true only for the untouched, unexpired token. RELEVANT CWE: CWE-613, CWE-347. REQUIRED ISOLATION: fake timers; test secret.
5. TEST NAME: a password-step cookie cannot be used as a session. TARGET: `crm/login`, `crm/verify-otp`, any gated route. PRECONDITIONS: complete the password step only; copy the pre-auth value into `crm_session`. EXPECTED SECURE RESULT: 401 on gated routes; no session audit row. RELEVANT CWE: CWE-287, CWE-269. REQUIRED ISOLATION: in-memory Redis fake; mocked email sender.
6. TEST NAME: password hashing is salted and slow, OTP comes from a CSPRNG. TARGET: `hashPassword`, `verifyPassword`, `generateOtp` in `src/lib/crm-store`. PRECONDITIONS: none. EXPECTED SECURE RESULT: two hashes of one password differ; the stored form names a memory-hard or iterated algorithm with its parameters; `generateOtp` calls `crypto.randomInt` or `randomBytes` (spy) and never `Math.random`. RELEVANT CWE: CWE-916, CWE-338. REQUIRED ISOLATION: pure unit test.
7. TEST NAME: the same message id delivered in parallel is processed once on a real store. TARGET: `POST /api/will/webhook` with the file store's `claimInbound`. PRECONDITIONS: temp directory store as in `sec2-will-redteam-service.test.ts:48-58`; 20 identical signed requests started with `Promise.all`. EXPECTED SECURE RESULT: `handleIncoming` called once; one inbound row. RELEVANT CWE: CWE-362, CWE-294. REQUIRED ISOLATION: temp dir; mocked service; synthetic sender.
8. TEST NAME: two overlapping scheduler ticks send a due follow-up once. TARGET: `src/lib/will/scheduler.ts` tick and the store job claim. PRECONDITIONS: one due FOLLOW_UP job; two ticks started together; channel mocked. EXPECTED SECURE RESULT: one `deliverOut`; the losing tick records a lost claim, not a failure. RELEVANT CWE: CWE-362. REQUIRED ISOLATION: temp file store; fake clock; no network.
9. TEST NAME: a kill switch value of the wrong type fails closed. TARGET: kill-switch read in `src/lib/will/service.ts` and the scheduler. PRECONDITIONS: setting stored as "true", 1, "on", "TRUE". EXPECTED SECURE RESULT: no model call and no send for each value, or the setter refuses non-boolean values so the state cannot exist. RELEVANT CWE: CWE-636. REQUIRED ISOLATION: temp file store; `decide` and channel mocked.
10. TEST NAME: an oversized inbound text is truncated before storage and before the model. TARGET: `handleIncoming` in `src/lib/will/service.ts`. PRECONDITIONS: one 200 KB message. EXPECTED SECURE RESULT: stored body and the history passed to `decide` are each at or below the documented cap (a fixed number, far below the input). RELEVANT CWE: CWE-770, CWE-400. REQUIRED ISOLATION: temp store; `decide` mocked.
11. TEST NAME: public form routes refuse an oversized multipart body before parsing. TARGET: `POST /api/tax-form`, `/api/tfn-form`, `/api/abn-form`, `/api/super-form`. PRECONDITIONS: declared Content-Length above the limit; separately a real body with one multi-megabyte text field. EXPECTED SECURE RESULT: 413 (or 400); `createTask` not called; nothing stored. RELEVANT CWE: CWE-770. REQUIRED ISOLATION: db and limiter mocked.
12. TEST NAME: a submitter cannot attach a stored object that is not from their own upload session. TARGET: `POST /api/tax-form` handling of `bankStatementUrl`, `selfiePassportUrl`, `invoiceUrls`. PRECONDITIONS: a valid in-bucket URL that was not returned by this client's uploads (and an `svt/` path sent to the WHT host). EXPECTED SECURE RESULT: refused, or the task is created without the foreign file. If no session binding exists by design, the test records that decision. RELEVANT CWE: CWE-639. REQUIRED ISOLATION: storage and db mocked; synthetic paths.
13. TEST NAME: a malformed or truncated encryption envelope is an error, never plaintext. TARGET: `decryptField`, `isEncrypted`, `rewrapField` in `src/lib/field-crypto`. PRECONDITIONS: envelopes with a missing part, an extra part, an empty IV, a body shorter than the tag, an unknown version prefix, and the prefix alone. EXPECTED SECURE RESULT: `FieldCryptoError` for each with `allowPlaintext` on and off; `rewrapField` does not treat them as plaintext to encrypt. RELEVANT CWE: CWE-347, CWE-354. REQUIRED ISOLATION: random test keys.
14. TEST NAME: logs and audit rows on the webhook failure path carry no message text and no full number. TARGET: `POST /api/will/webhook` when `handleIncoming` throws, and when a status callback fails. PRECONDITIONS: body with a TFN-shaped number, a bank pair and a full sender id; `console.error`, `console.warn` and `audit` spied. EXPECTED SECURE RESULT: none of the three values appears in any captured argument. RELEVANT CWE: CWE-532. REQUIRED ISOLATION: mocked store and service; synthetic values.
15. TEST NAME: the context sent to the model holds no TFN, bank detail or document URL from the CRM record. TARGET: the context builder that feeds `decide` in `src/lib/will/service.ts` and `src/lib/will/claude`. PRECONDITIONS: a customer linked to a CRM task holding a synthetic TFN, bank string and file URLs. EXPECTED SECURE RESULT: the serialised arguments of `decide` contain none of them; a SVT customer's context contains no WHT record and the reverse. RELEVANT CWE: CWE-200, CWE-359. REQUIRED ISOLATION: temp store; `decide` mocked; no network.

## Checked and found sound

- Webhook HMAC: tampered body, missing secret, unsigned message and unsigned status callback all end in 401 with no claim and no engine call (`webhook.test.ts:94-110`, `sec2-will-redteam-webhook.test.ts:60-85`).
- Webhook size cap on declared and actual length, 413 (`sec2-will-redteam-webhook.test.ts:129-140`).
- Unrecognised `ai_mode` values resolve to approval mode (`webhook.test.ts:238-243`).
- Upload: declared type must match magic bytes; SVG, HTML, ZIP, PHP, ELF, PE refused; non-HEIF `ftyp` brands refused; object name cannot carry a separator or traversal; `kind` is an enum; brand prefix ignores body, query and forwarded headers; 10 MB boundary (`content-sniffing.test.ts:35-139`).
- Public form: notes cannot be forged, control and bidi characters stripped, mass assignment ignored, brand taken from Host only (`notes-injection.test.ts:36-87`, `tax-form/__tests__/brand-26oct.test.ts:57-62`).
- Rate limiter: IPv6 /64 bucketing, hashed identities in Redis keys, memory fallback on Redis error, bounded memory, byte budget no longer fail-open (`sec2-rate-limit-abuse.test.ts:33-166`).
- Field crypto: AAD binds table, column and row; bit flips, wrong key and unknown key id fail; plaintext refused by default; key ring validation (`field-crypto.test.ts:37-106`).
- Media proxy: non-Meta hosts never fetched, look-alike hosts never get the bearer token, active content types forced to attachment with nosniff and sandbox CSP, bad ids 400, no session 401 (`sec2-will-redteam-media.test.ts:32-122`).
- Model output: unknown actions, bad confidence, model-supplied recipients, invalid states and unknown template keys never produce a send (`sec2-will-redteam-service.test.ts:135-176`).
- Policy guard hard gates and the 24-hour window refuse a harmless reply; the template flag does not exempt bank, agent or AI claims (`sec2-will-redteam-guard.test.ts:43-59`, `policy-guard.test.ts:338-348`).
- Brand isolation: every non-SVT route closed on nine SVT host spellings, look-alike hosts stay WHT, db lookups scoped by brand and not widened by LIKE wildcards (`brand-isolation-round2.test.ts:108-196`, `db-brand-scope-round2.test.ts:61-117`).
- Audit rows for bulk reads carry counts, masked IP and a session tag, not names, numbers, raw session ids or search text (`sec2-supply-ir.test.ts:286-354`).
- Security emails: recipient from environment only, HTML from request headers escaped, key and recipient absent from logs (`sec2-security-email.test.ts:14-64`).
- Release script refuses env files, keys, symlinks, credential shapes and real-looking TFNs and does not echo the value (`sec2-supply-ir.test.ts:141-171`).

## Open questions

1. Are the numbers and names listed in F01 real clients? The comments say so; confirming needs the CRM, which I did not touch.
2. Does the cross-site guard cover `will/actions` and the `crm/*` write routes? Only the Mia titles in the sibling unit were seen.
3. What does the service do when `kill_switch` holds a non-boolean value (F04)? The test comment says it is not honoured; the code was not opened.
4. Is there any binding between an upload and the submission that later references it (proposed test 12), or is any in-bucket URL accepted by design?
5. `e2e/brand-isolation.spec.ts` skips three blocks unless the viewport is 1440 wide (`:33`, `:140`, `:195`); whether CI runs a 1440 project was not checked.
6. 104 files were read by title only. A source-text assertion or a real identifier inside a test body in those files, written in a form my greps did not match, would not appear in this report.
