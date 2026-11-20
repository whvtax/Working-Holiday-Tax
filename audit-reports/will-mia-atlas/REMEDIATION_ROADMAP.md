# Remediation roadmap: WILL MIA ATLAS (updated 17 Nov 2026)

Status key: DONE (in FINAL59 zip), OPEN (needs your decision or access), NOT CHANGED (reviewed, kept on purpose).

## P0: Immediate containment
None verified in code.

## P1: High priority
| ID | Item | Status | Owner action needed |
|---|---|---|---|
| WMA-07 | Live Supabase: RLS on every table, grants, `search_path` on SECURITY DEFINER functions, bucket visibility | OPEN (no dashboard access) | Read-only check (checklist in SUPABASE_SECURITY_REPORT.md) |
| WMA-08 | Vercel env scopes, preview protection, GitHub branch protection | OPEN (no dashboard access) | Read-only check (checklist in INFRASTRUCTURE_REPORT.md) |
| WMA-11 | Pin CI actions to commit SHAs | OPEN (needs GitHub access to read SHAs) | Approve `add_repo` for read access, or provide the SHAs |

## P2: Hardening
| ID | Item | Status |
|---|---|---|
| WMA-01 | `/api/mia/` in cross-site guard | DONE |
| WMA-04 | Next.js to 16.4.6 | DONE |
| WMA-05 | Partner code with `crypto` | DONE |
| WMA-06 | Seed error returns fixed code | DONE |
| WMA-02 | Seed overwrite audited | DONE (audit). Gate NOT ADDED (would break wording sync) |
| WMA-02b | Add a confirmation step for overwrite | OPEN (your decision) |
| WMA-03 | Public-URL uploads | Downgraded to Low, mitigated by runtime bucket check. Confirm bucket setting once (WMA-07) |
| WMA-10 | JSON-LD escaping (`<` to `<`) on public pages | OPEN, low. Not changed: touches about 100 static pages with no current exposure |
| WMA-12 | Atlas proposals: keep Approve click | NOT CHANGED (kept on purpose) |
| WMA-13 | Remove three unreferenced components (`NextStep`, `PageHeader`, `CostCards`) | OPEN, needs your approval |
| BL-1 | Minimise the Atlas report sent to the model; state it in the privacy notice | OPEN |
| BL-3 | Set a customer retention period | OPEN (your decision) |

## P3: Performance
Not measured. Needs a Vercel preview build first (PERFORMANCE_REPORT.md, method section).

## P4: Code cleanup
- Remove the three unreferenced components (WMA-13) after approval.
- Split `service.ts` (3,207 lines) when there is time (CQ-1). Not a security item.
- Move tests out of `src` to shrink the zip (CQ-2). Tidy-up only.

## Regression checks
See REGRESSION_TEST_PLAN.md.
