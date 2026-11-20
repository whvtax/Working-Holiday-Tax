# 23. Final security verdict

Operation Iron Fortress, 18 Nov 2026. This verdict is bounded by what was and was not assessed. It is not a certification, not a penetration test result and not a statement that the system has no vulnerabilities.

## Scope of the verdict

Assessed: the source code, configuration, migrations, scripts and published content in the working copy, by static reading, to the coverage in file 21.

Not assessed: the running production system; the live database (tables, policies, grants, data); Vercel, Meta, Supabase, Redis, email and Google Analytics settings; `node_modules`; behaviour under load or attack; any tax, wage or visa fact against its source; the production build.

## VERIFIED FACTS

- 462 findings were reported, none CRITICAL, 3 HIGH. After merging: 279 rows, of which 77 are fixed, 108 wait for the owner and 94 were accepted with a written reason.
- All fixes decided as FIX_NOW were found in the tree by text search, except two (file 19, note 3).
- The test suite after the fixes: 6,526 passing, 2 failing for a missing `.env.example`.
- 93% of non-test source lines are in files read in full. 22% of test lines are. 64 small content pages were pattern-searched only.

## STATIC ANALYSIS CONCLUSIONS

1. Within the code that was read, the core controls are present and consistently applied: authentication on every staff API handler, signature check on the webhook, upload validation, a policy guard on outgoing text, brand separation at the point of sending, and fail-safe defaults on the kill switch, the model path and the AI budget.
2. No unit report describes a path by which an unauthenticated outsider can read another customer's TFN, bank details, documents or chat through the application code as written. (A holder of a signed form link is shown that customer's own WhatsApp number, by design.)
3. The most serious residual risks are not coding errors. They are settings and decisions:
   - sealing of TFN and bank details at rest is off until two environment variables are set, and old rows stay in plain text until the sealing script is run;
   - row level security and grant lockdown for one table and three functions exist only in a migration marked not applied;
   - form-to-customer binding by signed token is optional until `FORM_TOKEN_ENFORCE=true`;
   - a public form can be merged into an existing client record by a typed email or phone;
   - live knowledge answers carry a guarantee without its limit and a fixed temporary password.
4. Published content has no script, raw HTML, unsafe link scheme, secret or personal value in the files that were read or pattern-searched. Its risk is accuracy and wording: guarantee scope, refund timing and tax facts stated two ways.

## HYPOTHESES

- If P0 items 1 to 3 of the roadmap are already done in production, the HIGH and MEDIUM exposure that remains is mostly wording and business-rule decisions.
- If they are not done, sensitive fields may be stored unsealed and one table may be reachable with the anonymous key. Neither could be confirmed.

## UNVERIFIED ASSUMPTIONS

Listed in file 22. The verdict depends on them, in particular: private storage bucket, RLS enabled as the migrations say, no anonymous key shipped to browsers, edge-controlled IP headers, secrets held only in the hosting environment.

## NOT TESTED

Everything dynamic. See file 22.

## Verdict

On static evidence, and within the coverage stated, the application code shows a deliberate, layered security design with no critical finding and one high finding in code, which is fixed. The system should not be described as secure without qualification: 108 rows are open, two of them high, and the protections for TFN and bank data at rest and for database access depend on production settings this audit did not see.

Before relying on this audit as assurance, the owner should complete roadmap P0, record the evidence (the 049 check-query output, the sealing script counts, the Vercel variable list without values), and have the open P1 wording decisions made. A dynamic test of the deployed system and an external dependency check would be needed to move any statement here from "read in the code" to "observed".
