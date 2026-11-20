# 00. Executive summary

Operation Iron Fortress: read-only security audit of the Working Holiday Tax and Student Visa Tax codebase, 18 Nov 2026.

## What was done

- The repository was inventoried and split into units. Parallel reviewers read each unit statically and wrote one report per unit (`units/*-report.md`).
- Published content was pattern-scanned first, then every content file of 300 lines or more was read line by line (READ-01 to READ-21).
- A devil's advocate pass re-opened the cited lines for every finding and decided: fix now, needs owner, no fix, or already fixed (`units/DEBATE-1.md` to `DEBATE-5.md`).
- The owner then authorised fixes. They were applied on 18 Nov.

## VERIFIED FACTS

- Method: static reading only. No project code, tests-as-evidence, scanners or network were used for findings.
- NOT inspected: the live database, Vercel, Meta and Supabase settings. No tax fact was checked against the ATO.
- `npm audit --omit=dev` was run once earlier in the session and reported 0 known vulnerabilities at that time. This is a point-in-time note, not a guarantee.
- Coverage: 2,113 files inventoried. Of 856 source, config, script and migration files, 777 were read in full, 15 in part and 64 small content pages by pattern search only. Of 505 test files, 104 were read in full and the rest by titles. 755 non-application files were scan-based. Details: file 21.
- Findings as written by the units: 462 (CRITICAL 0, HIGH 3, MEDIUM 100, LOW 261, INFORMATIONAL 98). Merged into 279 decision rows: 77 FIXED (18 Nov), 108 OPEN - NEEDS OWNER, 94 ACCEPTED (NO FIX). Details: file 19.
- Tests after the fixes: 6,526 passing, 2 failing only because `.env.example` is absent from this working copy.
- The production build was not verified in this environment (Google Fonts unreachable).
- Two decided fixes are not in the tree: three `.pyc` files under `.claude/` were left on purpose, and the wider name list for the release secret scanner is not in `scripts/lib/secret-scan.cjs`.

## STATIC ANALYSIS CONCLUSIONS

What reads as sound in the code:

- Every CRM, Will, Atlas and Mia API handler checks the session or the cron secret first. Login is password plus an emailed one-time code, with a signed 8-hour cookie (httpOnly, SameSite=Strict).
- The WhatsApp webhook verifies Meta's signature over the raw body in constant time before parsing, caps size and de-duplicates by message id.
- Uploads are checked by type, size and file signature and go to a private bucket. The CRM file proxy pins host and bucket and refuses path traversal.
- Outgoing customer text passes a policy guard (prices, guarantee limits, bank details, 24-hour window). Only the exact Autopilot mode transmits without approval.
- Brand separation (Working Holiday Tax and Student Visa Tax) is enforced at host routing, customer lookup and at the point of sending.
- No secret, token or key literal was found in the reviewed source. No critical finding was reported.

The three HIGH findings:

1. A model-written holding reply could be sent without the guard. FIXED (R071).
2. Nine knowledge answers state the fee guarantee with no TFN-only limit. OPEN, owner wording (R134).
3. Two knowledge answers give one fixed temporary password for the signing account. OPEN, owner decision (R135).

Main open themes (all need an owner action, file 20):

- Protections that exist in code but depend on settings: run migration 048 then 049; set `FIELD_ENC_KEYS` and `FIELD_ENC_ACTIVE` and run the sealing script; set `FORM_TOKEN_ENFORCE=true`.
- A public form whose typed email or phone matches an existing client is merged into that client's record without proof of identity.
- Guarantee wording "returns with TFN income" in five languages; refund timing stated as 10, 12 and 14 days in different places.
- Trust-based payment confirmation, Approval mode exceptions, and cross-instance races that need a database change.
- Many tax, wage and visa facts in the articles are stated in two ways or could not be checked.

## HYPOTHESES

- If migration 049 has not been run on production, `will_ai_usage` has no row level security and default grants to the anonymous role may still apply. The table holds no TFN, bank or message text.
- If the field-encryption keys are not set in production, TFN and bank details are stored in plain text today.

## UNVERIFIED ASSUMPTIONS

- That the hosting edge overwrites client IP headers, that the storage bucket is private, that the browser never receives the Supabase anonymous key, and that Redis supports the commands the rate limiter uses. The code assumes these; the audit could not check them.
- That the fixes applied on 18 Nov behave as intended in production. They are covered by the test run above, not by a deployment.

## NOT TESTED

No penetration test, no dynamic test, no load test, no dependency scan as part of the findings, no review of `node_modules`, no check of third-party account settings.

## Reading order

19 (findings), 20 (roadmap), 21 (coverage), 22 (unverified risks), 23 (verdict). Files 01 to 18 give the detail by topic.
