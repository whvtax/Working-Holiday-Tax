# Final risk assessment: WILL MIA ATLAS (17 Nov 2026)

## Scope and limits
This is an assessment of the repository on disk, plus the scripted pass and tests run on 17 Nov 2026. It does not cover live Supabase, Vercel, GitHub, WhatsApp, or a running browser. No numeric security score is given. The inputs for a score (live configuration, runtime tests, a second reviewer) are not complete, so a score would overstate what is known.

## Verified findings by severity (after this pass)
- Critical: 0
- High: 0 (open high items in the scanner: none after rule tuning)
- Medium: 0 open in code. (WMA-01 and WMA-04 fixed. WMA-03 downgraded.)
- Low: WMA-02b (decision), WMA-05 and WMA-06 (fixed), WMA-10, WMA-11, WMA-12 (kept), WMA-13, BL-1, BL-3, FE-1 (same as WMA-10), INFRA-1 (same as WMA-11), SC-2 to SC-6.
- Not verified: WMA-07, WMA-08, live build, live webhook, live Redis, git history.

## Main remaining exposures
1. **Live database and storage settings are unverified.** This is the largest unknown. If RLS or the bucket setting is wrong in production, the code checks would not prevent exposure through other routes (the service role bypasses RLS). A 20-minute dashboard check removes most of this uncertainty.
2. **Single-owner account.** Security depends on the owner's email account and devices. Not a code issue; it is the main real-world risk.
3. **Wording sync can overwrite live templates.** Now audited, not gated. A deliberate trade-off.
4. **Model-generated proposals.** Mitigated by the Approve click and the three-action limit.
5. **Build not verified in this sandbox.** A Vercel preview build is required before release.

## What changed the risk in this pass
- Cross-site guard now covers Mia (closes a real gap, low likelihood).
- Next.js moved past the advisory (removes a known dependency issue).
- Seed overwrite is audited (improves traceability).
- Partner codes are random (removes a guessable-code weakness).
- Seed errors no longer reveal database text.

## Residual risk after the owner's checks
If the dashboard checks in INFRASTRUCTURE_REPORT.md and SUPABASE_SECURITY_REPORT.md come back clean, the remaining exposure is the owner's account security, the model proposal flow, and ordinary software risk. The recommended next step is an independent penetration test on a staging copy with synthetic data, after these checks.
