# A17 Privacy and data protection / A19 Infrastructure, deployment, disaster recovery

Baseline d9dbac0, branch svt-build. Read-only review of source; no live systems queried. All
line numbers are from the files as read on 27 Oct 2026.

---

# PART A17: Privacy and data protection (Privacy Act 1988, APPs, TFN Rule 2015)

## Applicability (stated, not assumed)

- **Privacy (Tax File Number) Rule 2015** (OAIC page "Tax file numbers", and the Rule itself,
  issued under s17 Privacy Act): binds every "TFN recipient" regardless of turnover, so it
  applies to this system from the first SVT submission. Relevant rules: collect TFN
  information only where authorised (r.7-8, tax agents are authorised under taxation law),
  protect it with reasonable security safeguards (r.11), destroy or permanently de-identify it
  when no longer required or permitted to be retained (r.11), do not record or display it
  unnecessarily.
- **Australian Privacy Principles** (OAIC "APP guidelines", Chapters 1, 3, 5, 6, 8, 11):
  bind "APP entities". A business with annual turnover under AUD 3M is normally exempt
  (s6D small business exemption) unless an exception applies. Turnover of the trading entity
  is NOT VERIFIED. However the published policy (legal-text.ts:217) states that the business
  complies with the Privacy Act, the APPs and the NDB scheme, so the APPs are the standard
  the business has publicly adopted; a false statement of that kind is a consumer-law issue
  independently of the Privacy Act. The findings below therefore measure the policy against
  the APPs as the business itself promises.
- **Tax Agent Services Act 2009, Code of Professional Conduct item 6** (confidentiality):
  applies to the supervising registered tax agent; the business claims supervision
  (legal-text.ts:171, 302-304). Noted, not assessed further (A15/A16 scope).
- **GDPR**: not applicable on the facts in the code. The SVT site targets students in
  Australia in en/zh/vi (brand-public.ts, i18n.ts); no EEA targeting, pricing in AUD, no EU
  establishment. Australia has no cookie-consent law; APP 5 notice plus a cookie section in
  the policy is the applicable standard (OAIC, APP guidelines Chapter 5; OAIC "Cookies"
  guidance in the Privacy Act review discussion). No consent banner is required.

## What the SVT form actually collects (code, not policy)

`src/lib/submit-tax-form.ts:14-44, 221-252` and `src/app/api/tax-form/route.ts:85-173`:
WhatsApp number, AU phone, full name, residential address, email, country (of passport),
date of birth, marital status, Medicare entitlement (yes/no), TFN, employer/primary job,
has-expenses flag, tax years, how heard, referral code, declaration text, tax residency
status, up to 5 "extra notes" (SVT: visa subclass and course length), a bank statement file,
a passport selfie file, up to 10 receipt files. Files go to the private Supabase bucket
`uploads` under `svt/tax-form/{bank|selfie|invoices}/` (upload/route.ts:118-131, 157-166).
Row goes to `crm_tasks` with `brand='svt'` (db.ts:203-235); a Postgres trigger copies
email/name/WhatsApp into `crm_leads` (migration 048). Funnel analytics: random UUID session
id + event name + lang only (funnel/route.ts:26-41); on the SVT host this route is blocked by
the API allowlist (config/brand-routing.js:36-38) so nothing is recorded for SVT.

## Where the TFN travels (trace)

| Hop | File:line | TFN present? | Protection |
|---|---|---|---|
| Browser form state | tax-form/FormClient.tsx:306-416, tax-form-handoff.ts:1-60 | yes, in memory only | Deliberately excluded from the `whv_taxform_return` sessionStorage snapshot (FormClient.tsx:374-415). Good. |
| POST multipart body | submit-tax-form.ts:230 | yes | HTTPS body, never a URL. |
| Server validation | tax-form/route.ts:55-66, intake-validate.ts:62 | yes (format check) | Not logged. |
| DB `crm_tasks.tfn` | db.ts:219 | yes, plaintext column | Service-role only; wiped to '' on task done (db.ts:284-287). |
| CRM UI | DashboardClient.tsx:2017, 2047 ("TFN 🔒") and print/export HTML :1090,1132,1172 | yes | Behind CRM auth; the HTML export writes it to a local file. |
| Will/Mia WhatsApp messages | tax-form/route.ts:182-200, form-link.ts, channel.ts | no | notifyFormReceived passes whatsapp, email, medicare answer, abn flag, country, taxStatus; never the TFN. Knowledge item tells customers not to send TFN in chat (knowledge-seed.ts:62-69). |
| Email (Resend) | security-watch.ts:146, crm/login/route.ts:113-157 | no | Resend is used only for staff OTP and security alerts; no customer data is emailed. |
| Anthropic API | will/claude.ts:166-240 | only if a customer types it in chat | Full chat history is sent; see A17-2. |
| Server logs | tax-form/route.ts:257 | possibly (see A17-3) | |
| Audit table `will_audit` | tax-form/route.ts:204, 236, 262 | no (clientId, taxYear, error.message only) | |
| Google Analytics | SvtDocument.tsx:8-9,27; Analytics.tsx:44-46, 105 | no | /tax-form, /zh/tax-form, /vi/tax-form and their /residency sub-paths are untagged on SVT (prefix match on `/tax-form/`). Confirmed by code; browser check NOT RUN (form closed in this build). |

## Findings

### A17-1 MEDIUM: privacy policy is silent on overseas disclosure (APP 8 / APP 1.4(f),(g)) and understates processors
- Files: `src/lib/legal/legal-text.ts:263-269` (section 7), `:217` (section 1).
- Evidence: the code discloses personal information to at least these third parties: Supabase
  (all records and files; region NOT VERIFIED), Vercel (function execution, region syd1 per
  vercel.json:7, but logs and build infra are Vercel's), Meta/WhatsApp (names, numbers,
  message bodies; channel.ts:189-197), Anthropic (full chat history incl. customer name and
  whatever a customer types; claude.ts:201-214, US-based API), Google Analytics (page views,
  no form data), Upstash Redis (IP + normalised phone or email as a rate-limit key for 15 min;
  tax-form/route.ts:44-50), Resend (staff emails only). The policy names only Google
  Analytics and "trusted service providers assisting in operations or communications" with
  "limited information". It never says that personal information is likely to be disclosed to
  recipients outside Australia, nor which countries, which APP 1.4(f)-(g) require a policy to
  state (OAIC APP guidelines Chapter 1, paras 1.26-1.30; Chapter 8 for APP 8.1 reasonable
  steps). The Client Agreement clause 16 (legal-text.ts:135) does mention subcontractors
  "located outside Australia", but a client agreement is not the privacy policy.
- Impact: the policy does not describe the actual handling; a complaint to the OAIC or an
  ACL "misleading" argument would start from this gap. Not a data-exposure bug.
- Smallest fix: in `privacySections`, section 7, add one item: "Our service providers include
  cloud hosting and database providers, our WhatsApp messaging provider (Meta), our email
  provider, and the provider of the software that helps us draft replies. Some of these
  providers store or process information outside Australia, including in the United States
  and Singapore [confirm Supabase region]. We take reasonable steps to ensure they handle
  your information in line with the Australian Privacy Principles." (Wording must not
  mention AI or bots: "software that helps us draft replies" or simply "communications and
  productivity software providers" keeps the business rule.) Both brands update at once
  because the text is shared.
- Verify: render /privacy on svt.localhost and workingholidaytax; the new item appears.
- Unchanged acceptable? For a soft launch, yes for days, not for the season: the gap is
  disclosure, not security. Fix before marketing spend.

### A17-2 LOW: whole chat history, including anything a customer types, is sent to a third-party model API; no redaction of TFN-shaped numbers
- Files: `src/lib/will/claude.ts:201-214` (`messages: apiMessages(history)`),
  `src/lib/will/knowledge-seed.ts:62-69` (the "don't send your TFN here" answer).
- Evidence: the business already tells customers not to put TFN or passport numbers in the
  chat, which is the right data-minimisation message, but nothing strips an 8-9 digit TFN or
  a passport number from a message before it goes to Anthropic, is stored in `will_messages`
  or appears in CRM previews. TFN Rule 2015 r.11 asks for reasonable steps against
  unauthorised disclosure; sending a TFN to a processor that does not need it is avoidable.
- Impact: low likelihood per message, high sensitivity when it happens; Anthropic's API
  terms do not train on API data by default, so exposure is contractual rather than public.
- Smallest fix: in `apiMessages` (or before storing inbound text) replace
  `/\b\d{3}[ -]?\d{3}[ -]?\d{2,3}\b/` with `[number removed]` only for the copy sent to the
  model; keep the stored message intact for staff. One regex, one test.
- Verify: unit test that a history turn "my TFN is 123 456 789" reaches the request body as
  "[number removed]".
- Unchanged acceptable? Yes. Residual risk is small and the customer guidance exists.

### A17-3 LOW: a failed `crm_tasks` insert logs the raw Postgres error object, which can contain the full row (TFN, DOB, address)
- File: `src/app/api/tax-form/route.ts:257` `console.error(\`[tax-form] FAILED ref=${ref}:\`, err)`.
- Evidence: `createTask` throws the Supabase `PostgrestError` as-is (db.ts:234). For NOT
  NULL and CHECK violations Postgres puts "Failing row contains (col1, col2, ...)" in the
  error DETAIL, which PostgREST returns in `details` and which `console.error(err)` prints in
  full to the Vercel function log. Migration 047 adds `CHECK (brand IN ('wht','svt'))`; the
  code only writes 'svt' or omits the column, so today this cannot fire, but any future
  constraint on `crm_tasks` turns a single bad submission into a TFN in the hosting
  provider's log retention. The audit row (route.ts:262-265) correctly stores only
  `err.message` (300 chars), so the DB side is fine.
- Impact: TFN Rule r.11 (unnecessary recording). Likelihood currently near zero.
- Smallest fix: log `err instanceof Error ? err.message : String(err)` plus
  `(err as {code?:string}).code`, not the object. Same pattern at upload/route.ts:169,179 is
  harmless (no row data).
- Verify: force a constraint error in a local DB and read the log line.
- Unchanged acceptable? Yes, with the fix queued.

### A17-4 LOW: the uploaded file's original name travels in the request URL
- Files: `src/lib/submit-tax-form.ts:95-98` (`?kind=...&filename=...`),
  `src/app/api/tax-form/upload/route.ts:98,124,131`.
- Evidence: a customer's file is often named after them ("Passport_Nguyen_Van_A.jpg",
  "CommBank statement March.pdf"); the query string is written to Vercel request logs and
  the sanitised name is persisted in the object path and in the URL stored in
  `crm_tasks.file_urls`. The content is never in the URL; only the name is.
- Impact: minor metadata leakage into logs. Not a TFN issue.
- Smallest fix: send the filename in a header (`x-filename`) or drop it and keep only the
  extension in the stored path.
- Unchanged acceptable? Yes.

### A17-5 LOW: rate-limit key puts normalised phone number or email in Redis (Upstash) in plaintext
- File: `src/app/api/tax-form/route.ts:44-45` (`${ip}:${person}`), `src/lib/rate-limit.ts:77`.
- Evidence: the key `rl:tax-form:<ip>:<phone|email>` lives in a third-party Redis for 15
  minutes (WINDOW_SECS). Purpose is legitimate (per-person limit behind NAT), but a SHA-256
  of the person string works identically.
- Smallest fix: `crypto.createHash('sha256').update(person).digest('hex').slice(0,16)`.
- Unchanged acceptable? Yes.

### A17-6 INFO: policy text vs code, items that are accurate or more protective than stated
- Collection list (legal-text.ts:224-235) covers name, contact, TFN, income, ID documents,
  bank details. Not named explicitly: date of birth, marital status, Medicare entitlement,
  visa subclass/course length, a photograph of the customer holding their passport, employer.
  All fall under "personal details"/"identification documents"/"information provided through
  forms", so this is a clarity point, not a breach. Marital status and Medicare entitlement
  are not "sensitive information" under s6; Medicare entitlement is collected for the
  Medicare levy exemption, i.e. reasonably necessary (APP 3.2).
- Retention: the policy says 5-7 years (section 8). The code is stricter for the most
  sensitive items: on task completion `markTaskDone` deletes the passport/bank/receipt
  files from storage and blanks tfn, address, bank_details, primary_job, marital, au_phone
  (db.ts:239-299), and refuses to clear file references if the delete did not succeed. This
  matches TFN Rule r.11 (destroy when no longer required). The client record keeps name,
  DOB, email, WhatsApp, refund figures, which the tax agent's record-keeping needs. No
  purge exists for `will_messages`; retention there relies on the 5-7 year statement.
- Cookies: GA4 sets `_ga`/`_ga_*` first-party cookies on SVT (gtag config,
  Analytics.tsx:109-120). sessionStorage keys on the SVT host: `whv_taxform_return`
  (text fields, no TFN, cleared on return, 2h expiry) and `wht_ai_source` (referrer
  classification). localStorage `wht-lang-banner-seen` is WHT-only
  (MobileLanguageBanner). The key names carry WHT initials; visible only in developer tools,
  not to customers, so no brand-separation breach, but renaming to a neutral prefix would be
  cleaner.
- Privacy and Client Agreement pages are English only on the zh/vi SVT sites; the footer
  labels say so ("Privacy Policy（隐私政策）", i18n.ts:124,172, `legalEnglishOnly`). APP 5
  "reasonable steps" is a judgement; for a zh/vi audience a native summary would be
  better, not required.
- SVT privacy page `updated` string duplicates the intro sentence ("We are committed to
  protecting your privacy" appears twice, privacy/page.tsx:19-20). Cosmetic.
- Will/Mia audit rows mask phone numbers (`maskWa`, webhook/route.ts:256-259) and store
  120-char previews of outbound bodies (channel.ts:472-493). `security-watch.ts:42` masks
  IPs. Good minimisation.
- The CRM print/export of a task is branded "Working Holiday Tax · workingholidaytax.com.au"
  for every task including SVT ones (DashboardClient.tsx:1247). Internal document (CRM
  only); if it is ever handed to an SVT customer it would breach brand separation. Flagged
  for the CRM agent.

## Reviewed with no finding
- `src/lib/legal/brands.ts` (SVT details read from the single SVT source; placeholder phone
  flagged under A19-3).
- `src/components/svt/LegalDocument.tsx` (renders shared text only, adds no words).
- `src/app/(svt)/svt-site/privacy/page.tsx`, `client-agreement/page.tsx` (noindex, follow;
  canonical set; brand correct; disclosure wording is the approved one).
- `src/lib/upload.ts`, `src/app/api/tax-form/upload/route.ts`: private-bucket assertion fails
  closed; magic-byte checks; SVT prefix from host.
- `src/components/layout/Analytics.tsx` and `SvtDocument.tsx`: form paths untagged; GA
  measurement id is the SVT property; no PII in event params (`src/lib/analytics.ts`).
- `src/app/api/analytics/funnel/route.ts`: random session id, event, lang only.
- `src/lib/will/channel.ts`: no logging of message bodies to console; brand leak guard
  before send.

---

# PART A19: Infrastructure, deployment, disaster recovery

## Findings

### A19-1 MEDIUM: no error reporting or uptime monitoring exists; production failures are visible only in Vercel logs and in the in-app audit table
- Evidence: no Sentry/Datadog/Axiom/`@vercel/analytics` dependency (package.json:14-39;
  grep of `src` returns nothing). The code compensates by writing failures to `will_audit`
  (tax-form/route.ts:262, tick/route.ts:46-60) and the `/api/will/health` page probes
  Meta, schema and cron heartbeat (health/route.ts). Nothing pages a human when the cron
  stops, when Supabase is down, or when the form 500s; DEPLOYMENT_CHECKLIST lists
  "monitoring" under milestone 10 (ROADMAP.md:56) as not done.
- Impact: a broken SVT form at launch would be discovered by a customer, not by the team.
- Smallest fix: Vercel's built-in log drains or a free-tier Sentry DSN wired in
  `instrumentation.ts`, plus an external HTTP check on `/api/will/health` every 5 minutes
  (any uptime service). No code change needed for the uptime check.
- Unchanged acceptable? For a soft launch with Jo watching the CRM daily, barely. Not for
  the tax season.

### A19-2 LOW: backups are assumed, not evidenced
- Evidence: DEPLOYMENT_CHECKLIST.md:30,43 require "a database backup" before 047/048;
  nothing in the repo records the Supabase plan, whether PITR is enabled, or where a manual
  dump is kept. Supabase Free plan has no automated backups; Pro has daily backups, PITR is
  an add-on. Uploaded files (passports, bank statements) in Storage are not covered by
  database backups at all. NOT VERIFIED: Supabase plan and region (requires dashboard).
- Smallest fix: one line in PROJECT_HANDOFF.md stating plan, backup schedule, region and
  how to restore; take `pg_dump` + storage listing before 047.
- Unchanged acceptable? Yes for launch day if a manual dump is taken as the checklist says;
  document it afterwards.

### A19-3 LOW: placeholder phone number is live code and only a test guards it
- Files: `src/lib/svt/brand-public.ts:16-19` (`phone: '04123123123'`,
  `whatsappNumber: '614123123123'`, `whatsappIsPlaceholder: true`), `src/lib/legal/brands.ts:19`.
- Evidence: the legal pages, footer and every wa.me link render this number. The gate is
  `SVT_LAUNCH=true npx jest launch-gate` (DEPLOYMENT_CHECKLIST.md:40-42), a manual step,
  not a build-time check. A deploy that forgets it ships a wrong number on the privacy
  policy's "Contact us" line, which is an APP 1.4(e)/APP 5 defect as well as a dead link.
- Smallest fix: in `SvtDocument` or the SVT layout, `if (process.env.VERCEL_ENV ===
  'production' && SVT_PUBLIC.whatsappIsPlaceholder) throw` at build/render time, or make
  the Jest gate part of `npm run build` when `VERCEL_ENV=production`.
- Unchanged acceptable? Only while the domain is not attached (the checklist's own
  condition). Not after.

### A19-4 LOW: `.env.example` carries real Meta account identifiers and operational history
- File: `.env.example:77-96`.
- Evidence: real phone number, phone number ID, WABA IDs, Meta app ID, business portfolio
  ID, system user name and a note about which 2FA code "never arrives". None are secrets
  (the phone number ID appears in every webhook payload) and the file is in the repo, not
  the client bundle, so no hard rule is broken. It is reconnaissance material if the repo
  is ever shared with a contractor, and `.env.example` is normally the first file they
  open.
- Smallest fix: move lines 77-96 to PROJECT_HANDOFF.md (already the system of record) and
  leave the variable names only.
- Unchanged acceptable? Yes.

### A19-5 INFO: SVT form open-switch and migration order create a hard failure if done out of order
- Files: `config/brand-routing.js:36-38` (allowlist from `SVT_FORMS_ENABLED` at build
  time), `src/lib/db.ts:230-231` (writes `brand:'svt'`), migrations 047/048.
- Evidence: with `SVT_FORMS_ENABLED=true` and 047 not applied, every SVT submission fails
  with "column brand does not exist" (500, customer sees the generic error with a ref).
  With 048 applied before 047, `CREATE OR REPLACE FUNCTION` succeeds (plpgsql does not
  validate `NEW.brand` at definition time) but every `crm_tasks` INSERT on both brands then
  fails at runtime: WHT form down too. The checklist orders this correctly ("047 AND 048 in
  the same session"); the risk is human.
- Smallest fix: prepend to 048 `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM
  information_schema.columns WHERE table_name='crm_tasks' AND column_name='brand') THEN
  RAISE EXCEPTION '047 must run first'; END IF; END $$;`.
- Unchanged acceptable? Yes, if the checklist is followed.

### A19-6 INFO: environment separation and preview behaviour
- `config/brand-routing.js:27` lists only the two production hosts and `svt.localhost`, so
  a Vercel preview URL (`*.vercel.app`) always renders WHT. SVT cannot be exercised on a
  preview without adding a preview domain alias to SVT_HOSTS (and then the e2e test that
  pins the list). Not a defect, a limitation to know.
- The checklist asks for `SVT_FORMS_ENABLED=true` on preview too (DEPLOYMENT_CHECKLIST.md:51)
  while also requiring "preview never points at production data unless deliberately
  approved" (:28-29). Whether preview env vars point at the production Supabase project is
  NOT VERIFIED (Vercel dashboard). If they do, a preview form submission writes to
  production `crm_tasks` and fires the production Will trigger.
- Fail-closed protections present: the file store refuses to start in production without
  Supabase (store.ts:574-575); uploads refuse a public bucket (supabase.ts:60-80);
  `/api/will/tick` requires `CRON_SECRET` bearer, `WILL_CRON_SECRET` header or a CRM
  session with constant-time compare (auth.ts:24-32); with `CRON_SECRET` unset the cron
  cannot run at all (fails closed, no fallback). The SVT WhatsApp send refuses to fall back
  to the WHT number (channel.ts:184-185).
- Rate limiting fails OPEN when Redis is unavailable, by design and documented
  (upload/route.ts:142-155, rate-limit.ts).

### A19-7 INFO: build reproducibility
- `package-lock.json` present; `vercel.json:4` uses `npm ci`. Good.
- `scripts/build-offline.sh` stubs the three `next/font/google` imports in
  `RootDocument.tsx` and restores from a `trap ... EXIT INT TERM`; `src/lib/__tests__/
  font-imports.test.ts` fails if the stub is left. The script is for the offline audit
  machine only; Vercel builds fetch Google Fonts normally. The script uses `mktemp` and
  `python3`, both present on a dev machine but not required by Vercel.
- SVT fonts are vendored under `public/svt-assets/fonts/5.3.0` with `SHA256SUMS` and
  licences; nothing SVT depends on at build time exists only on a dev machine.
- `SVT_FORMS_ENABLED` is read at build time in four page files and in `next.config.js`
  (through brand-routing.js), so a change requires a redeploy without build cache
  (`.env.example:112-113` says so). Vercel reuses the build cache by default; a redeploy
  from the dashboard with "use existing build cache" ticked would keep the old value in the
  prerendered form page while the new `rewrites()` from next.config are fresh, producing a
  half-open state (API open, page says closed, or the reverse). Mitigation: untick the cache
  or bump an env var that invalidates it.
- `typescript.ignoreBuildErrors: false` (next.config.js:107). Next 16 no longer lints in
  build; `npm run lint` is separate and the checklist runs it.
- `npm audit` status is documented (0 critical/high, 3 moderate build-time) in
  DEPLOYMENT_CHECKLIST.md:14-21; not re-run here (would need the registry).

### A19-8 INFO: rollback path
- App: previous Vercel deployment (checklist :37). Fine because 047/048 are additive:
  rolling the code back after 047 leaves an unused column with a default; nothing breaks.
- Data: no rollback for 047's replacement of `UNIQUE(wa_id)` with `UNIQUE(wa_id, brand)`
  once an SVT customer row exists for a number that also exists under WHT (checklist :68-69
  says so). Acceptable and documented.
- `SVT_WHATSAPP_PHONE_NUMBER_ID` is runtime (not build time), so the SVT line can be turned
  off by unsetting it and redeploying; the checklist correctly says to disable the number in
  Meta instead once customers exist.

## Reviewed with no finding (A19)
- `vercel.json`: region syd1, cron every 5 min, `no-store` on `/api/*`, immutable static.
- `next.config.js`: security headers complete (HSTS preload, COOP, CORP, Permissions-Policy);
  svtCsp least-privilege and does not name WHT; SVT headers override via `has: host`.
- `config/brand-routing.js`: default-deny API on SVT host, anchored host regex.
- Migrations 047 and 048: idempotent (`IF NOT EXISTS`, guarded constraint loop,
  `CREATE OR REPLACE`), backward compatible (defaults to 'wht'; WHT code path writes no
  brand column). 048 references `NEW.source`, which exists on `crm_tasks` since 015:26.
- `src/lib/will/auth.ts` cron auth; `src/app/api/will/tick/route.ts`.
- `.gitignore`: `.env*`, `.data/`, `.vercel/`, keys excluded.

## NOT VERIFIED (needs Vercel / Supabase / Meta access)
- Supabase project region, plan tier, backup/PITR status, Storage bucket `uploads` is
  private in production (code asserts it at runtime, but the current setting is not visible).
- Vercel: which env vars are scoped to preview vs production; whether preview uses the
  production Supabase URL; whether `CRON_SECRET` is set (cron silently 401s otherwise, and
  only the health page shows it); log retention period.
- Meta: WABA ownership of the SVT number, template approvals, webhook subscription.
- Upstash region and retention.
- Anthropic data-handling terms applicable to the account (zero data retention or not).
- Annual turnover of the trading entity (small business exemption, A17 applicability).

---

## Coverage

Reviewed in full: `src/lib/legal/legal-text.ts`, `src/lib/legal/brands.ts`,
`src/components/svt/LegalDocument.tsx`, `src/app/(svt)/svt-site/privacy/page.tsx`,
`src/app/(svt)/svt-site/client-agreement/page.tsx`, `src/lib/svt/brand-public.ts`,
`src/lib/submit-tax-form.ts`, `src/app/api/tax-form/route.ts`,
`src/app/api/tax-form/upload/route.ts`, `src/lib/upload.ts`, `src/lib/will/channel.ts`,
`src/components/layout/Analytics.tsx`, `src/components/svt/SvtDocument.tsx`,
`src/app/api/analytics/funnel/route.ts`, `src/lib/analytics.ts`, `src/lib/tax-form-handoff.ts`
(lines 1-60), `vercel.json`, `next.config.js`, `package.json`, `.env.example`, `.gitignore`,
`docs/engineering/DEPLOYMENT_CHECKLIST.md`, `scripts/build-offline.sh`,
`config/brand-routing.js`, `supabase/migrations/047_brand_column.sql`,
`supabase/migrations/048_brand_triggers.sql`, `src/app/api/will/tick/route.ts`,
`src/lib/will/auth.ts` (cron functions).

Reviewed partially (targeted reads/greps): `src/app/(site)/tax-form/FormClient.tsx`
(270-420, 806-812), `src/app/(site)/crm/dashboard/DashboardClient.tsx` (TFN display and
export, 1020-1300, 2017, 2047), `src/lib/db.ts` (1-130, 200-300), `src/lib/supabase.ts`
(1-80), `src/lib/will/store.ts` (getStore), `src/lib/will/claude.ts` (160-240),
`src/lib/will/knowledge-seed.ts` (55-80), `src/app/api/will/webhook/route.ts` (maskWa and
audit calls via grep), `src/lib/will/brand-context.ts` (32-53), `src/lib/brand.ts`
(brandFromHost), `src/lib/rate-limit.ts` (key shape), `src/components/svt/form-brand-svt.tsx`
(legal links, residency URL), `src/components/svt/Footer.tsx` and `src/lib/svt/i18n.ts`
(legal links), `PROJECT_HANDOFF.md` (1-60 and grep), `src/app/api/will/health/route.ts`
(grep), migrations 015/016/020/021 (grep for `source` and triggers), the migrations
directory listing (001-048).

Not reviewed: `src/lib/will/form-link.ts` body, `src/lib/will/store-supabase.ts`,
`src/app/api/crm/file/route.ts`, `src/proxy.ts` beyond the CSP line, the SVT zh/vi page
trees, `docs/engineering/SECURITY_CHECKLIST.md`, decisions 001-004 bodies, the e2e specs.
No browser or Playwright run was made for this report (the SVT form is closed in the test
build, so GA untagging on the form could only be confirmed from code).
