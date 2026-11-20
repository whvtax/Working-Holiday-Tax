# Test coverage report: WILL MIA ATLAS

## Executed in this pass (17 Nov 2026, after the fixes)
| Check | Result |
|---|---|
| `npx tsc --noEmit` | passes |
| `npx eslint` on changed files | passes |
| `npx jest --forceExit` (full) | 479 suites passed; 6,452 tests passed; 2 skipped |
| New test: `request-guard-mia-17nov.test.ts` | 5 passed |
| `node scripts/security/full-code-audit.mjs --no-audit` | 0 high, 0 medium, 7 low (route public-by-design notes) |
| `node scripts/package-release.cjs --check-only` (deploy profile) | passes, 1,398 files |
| `npm audit --omit=dev` | 0 vulnerabilities |
| `next build` | NOT COMPLETED here (Google Fonts unreachable). Must run on a Vercel preview |

## Matrix (per the brief's list)

| Area | Existing tests | Result | Gap |
|---|---|---|---|
| Authentication (login, OTP, lockout, logout) | yes (`crm` and `security` suites) | passing | live Redis behaviour not tested |
| Authorization on Mia and Atlas routes | route inventory tests | passing | not an exhaustive per-route test |
| RLS | none in Jest | not applicable in Jest | needs a live check (SUPABASE) |
| API input validation | many route tests | passing | not exhaustive |
| CRM workflows | yes | passing | |
| Messaging (webhook signature, duplicates) | yes (`webhook`, `inbound`) | passing | replay under Meta retry not run live |
| Cross-domain / brand separation | yes | passing | |
| Frontend behaviour | component tests | passing | no browser tests in this pass |
| Error handling | yes | passing | |
| Database migrations | none run against a database | not executed | needs a staging Supabase project |
| Performance regression | none | not applicable | |
| Dependency security | `npm audit` in CI (high level) | passing | |
| Critical business flows (Mia move, draft, PDF) | yes | passing | |

## Categories for the brief
- Existing and passing: the 479 suites above.
- Newly proposed: the regression plan (REGRESSION_TEST_PLAN.md).
- Newly executed: the request guard test and the scripted pass.
- Blocked by environment: `next build`, live RLS, webhook live test.
- Requires approval: any test that writes to a database or sends a message.

No unexecuted test is recorded as passed.
