# Audit coverage: WILL MIA ATLAS (updated 17 Nov 2026)

## Access
- Repository on disk: yes. Not a git repository (no commit SHA recorded).
- GitHub remote and settings: NO (session has no GitHub access; `add_repo` not called).
- Supabase dashboard and live SQL: NO.
- Vercel dashboard: NO.
- WhatsApp live account: NO. No message was sent.
- Browser: NO (no Chrome run in this pass).
- Production build: attempted, blocked by Google Fonts network access in this sandbox.

## Deliverables (22 requested) and status

| # | Deliverable | Status |
|---|---|---|
| 1 | EXECUTIVE_SUMMARY.md | Done (Hebrew management summary) |
| 2 | SYSTEM_INVENTORY.md | Done |
| 3 | ARCHITECTURE_MAP.md | Done |
| 4 | DATA_FLOW_MAP.md | Done |
| 5 | TRUST_BOUNDARIES.md | Done |
| 6 | AUDIT_COVERAGE.md | Done (this file) |
| 7 | SECURITY_FINDINGS.md | Done |
| 8 | SUPABASE_SECURITY_REPORT.md | Done for code. Live checks NOT VERIFIED |
| 9 | AUTH_SECURITY_REPORT.md | Done |
| 10 | API_SECURITY_REPORT.md | Done |
| 11 | INTEGRATION_SECURITY_REPORT.md | Done for code. Live webhook test NOT RUN |
| 12 | FRONTEND_SECURITY_REPORT.md | Done for code. Browser test NOT RUN |
| 13 | INFRASTRUCTURE_REPORT.md | Done for repo. Dashboard items NOT VERIFIED |
| 14 | PERFORMANCE_REPORT.md | Done as a static review. NO measurements (build blocked) |
| 15 | CODE_QUALITY_REPORT.md | Done (text-based candidate search, 3 candidates) |
| 16 | SUPPLY_CHAIN_REPORT.md | Done |
| 17 | BUSINESS_LOGIC_PRIVACY_REPORT.md | Done for the areas read. Full form-to-CRM mapping NOT done |
| 18 | TEST_COVERAGE_REPORT.md | Done. Full Jest run passed; build not completed |
| 19 | INDEPENDENT_VALIDATION_REPORT.md | Done as a second reading by the same reviewer. Not an independent party |
| 20 | REMEDIATION_ROADMAP.md | Done |
| 21 | REGRESSION_TEST_PLAN.md | Done |
| 22 | FINAL_RISK_ASSESSMENT.md | Done (no numeric score) |

Also produced: `findings.json` (machine-readable, no customer data, no secret values).

## Workstream coverage
| Workstream | Coverage | Limit |
|---|---|---|
| Auth and access | Full read of login, OTP, sessions, revocation, cookies, all Mia and Atlas routes | Live Auth not checked |
| Supabase | Migrations, function lockdown, RLS presence per migration, service-role usage | Live state not checked; no policies exist in migrations |
| API | Auth on all 65 route files via scripted pass; cross-site guard; seed and export routes read | Input fuzzing not run |
| Integrations | Webhook signature, Meta paging host check, Atlas action path | No live replay or retry test |
| Frontend | CSP, headers, storage use, HTML sinks (JSON-LD, inline rendering) | No browser run |
| Infrastructure | CI workflow, release allowlist, Vercel ignore file | Dashboard NOT VERIFIED |
| Performance | Static review only | No measurements |
| Code quality | Text-based unreferenced-file search, large-file review | No typed dead-code analysis |
| Dependencies | npm audit (production), lockfile, pinned packages | No SBOM generated |
| Business logic and privacy | Mia state rules, draft safety, access log content, Atlas data sent to model | Retention and full form mapping not checked |
| Tests | Full Jest run, targeted tests added, release check | Build and database migrations not run |
| Independent validation | Second reading of every finding | Same reviewer; not independent |

## Scripted pass (final)
- Command: `node scripts/security/full-code-audit.mjs --no-audit`
- Result: 0 high, 0 medium, 7 low (route public-by-design notes).
- Reviewed false positives are listed with reasons in the script's ACCEPTED map.
