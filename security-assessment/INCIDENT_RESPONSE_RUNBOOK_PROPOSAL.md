# Incident response runbook (PROPOSAL)

Status: proposal for Jo's review (round 2 update, 2 Nov 2026: one page checklist added as section 0, backup and restore test added as section 10, and the read logging and alert hooks of section 9 are now implemented in code but alerts stay OFF until switched on). Nothing here has been executed, and nothing in it rotates a credential or changes infrastructure by itself. Items marked [CONFIRM] need a fact only the dashboards (Vercel, Supabase, Meta, Upstash, Resend, Anthropic) or a lawyer can supply.

Scope: Working Holiday Tax and Student Visa Tax, shared CRM, tax form, uploads and Will/Mia (the WhatsApp assistant). Single operator (Jo) plus the supervising registered tax agent.

## 0. ONE PAGE CHECKLIST FOR THE OWNER (print this, keep a copy outside the system)

Use it when something feels wrong: a customer says Will told them wrong bank details, an email says "new login to your CRM" and it was not you, a customer says their TFN was misused, Meta or Vercel or Supabase emails you about a leak, or you find a file or password where it should not be. If unsure, treat it as real. You cannot make it worse by pausing Will.

**A. First 10 minutes (do these in order, write the time next to each)**
1. Write down the time you found out and what you saw. This starts the 30 day assessment clock in section D.
2. **Pause Will.** CRM, Will dashboard, top bar button "Pause Will" (turns red: "WILL STOPPED"). Will stops sending, the scheduler skips every job, new customer messages become tasks for you. Check the System panel shows the kill switch ON. Pausing loses nothing: every chat is still yours to answer by hand. To undo it, press the same button.
3. Do not delete anything (no "delete customer", no purge, no template deletes) and do not clean up. Evidence first.
4. Save evidence: CRM decision log (Settings, or `/api/will/audit?limit=500`), screenshot of the Vercel deployments list and the last runtime logs, and note the current deployment id. Look in the decision log for rows by actor `auth` (logins), `access` (exports, document views, searches), `owner` (what was done) and `channel` (webhook signature rejections). Rows carry a session tag, masked IP and device, so you can see whether it was you.
5. Phone the people in section B. Do not use WhatsApp, the CRM or email only: if those are compromised the attacker reads them.

**B. Who to call (fill in, keep outside the CRM) [CONFIRM every blank]**

| Role | Name | Phone | When |
|---|---|---|---|
| Technical responder with Vercel and Supabase access | ______ | ______ | Always, first |
| Supervising registered tax agent (The Accounting Academy) | ______ | ______ | Anything touching TFNs, returns, ATO client data |
| Privacy or legal adviser | ______ | ______ | Before deciding whether to notify (section D) |
| Bank (business account) | ______ | ______ | Wrong bank details, misdirected payments |
| Vercel, Supabase, Meta Business, Resend, Anthropic, Upstash account owners and support | ______ | ______ | Rotation and log requests |
| ReportCyber (cyber.gov.au) and OAIC | online forms | none | Criminal activity, notifications |

**C. What to rotate, in what order (only with your explicit approval, one at a time, note each time)**
The principle: first close the door the attacker is using, then the keys to the biggest room, then the rest. Change all Vercel values in one batch and redeploy once, because each change only takes effect on a redeploy.
1. If you think your own accounts are taken (Vercel, GitHub, Supabase, Meta, Google, the email that receives CRM codes): change those passwords, turn on or reset 2 factor, remove unknown team members and sessions. Everything below is pointless if they can read Vercel env.
2. CRM access: change `CRM_PASSWORD` and `JWT_SECRET` in Vercel. This signs everyone out, including the attacker. Optionally `PASSWORD_SALT`. Redeploy.
3. Database: Supabase, roll the service-role key (`SUPABASE_SERVICE_ROLE_KEY`) and update Vercel. This is the key to every customer record, so do it in the same redeploy as step 2.
4. WhatsApp: Meta Business, revoke the system user token (`WHATSAPP_TOKEN`) and issue a new one. The token is also saved inside the CRM settings: reconnect through the CRM "Connect WhatsApp" page so the stored copy is replaced. If forged webhooks are the worry, change `META_APP_SECRET` and `META_VERIFY_TOKEN` at Meta and in Vercel at the same moment (real messages are refused in between).
5. Machine to machine: `CRON_SECRET` (and `WILL_CRON_SECRET` if set), then `REDIS_URL` (Upstash password), `RESEND_API_KEY`, `ANTHROPIC_API_KEY`.
6. Confirm: login works with a new code email, `/api/will/health` is green, send one test message to yourself, then resume Will in Approval mode (not Autopilot) and watch it for a day.
Do not paste any key into chat, email or AI tools. Do not rotate from a device you think is infected.

**D. Do we have to tell anyone? (decision flow, NOT legal advice, confirm with your adviser) [CONFIRM]**
1. Was personal information accessed, disclosed or lost without authority? (customer names, phones, TFNs, passports, bank details, tax returns, conversations). If clearly no, log it in the breach register and stop.
2. If yes or maybe: could it likely cause **serious harm** to a person? TFNs, passports and bank details usually mean yes. Can we stop the harm quickly (for example the data was never opened, or the file was recalled)? If harm is not likely after our remedial action, no notification is needed, write down why.
3. If you only SUSPECT an eligible breach: the law requires a reasonable and expeditious assessment, to be finished within **30 days** of becoming aware. This 30 day window is the figure we understand applies and it MUST be confirmed by a lawyer before anyone relies on it. Start the assessment the same day, do not wait for day 30.
4. If you BELIEVE it is an eligible breach: notify the OAIC and the affected people as soon as practicable, with what happened, what information, and what they should do (watch for scams using their TFN, call the ATO about TFN misuse, change passwords).
5. Agree in writing with the supervising tax agent who notifies, so it is done once and nothing is missed. Ask the adviser about customers overseas (EU, UK and other countries may have their own rule).
6. Keep a breach register: date aware, assessment, decision, who notified, when, evidence references.

**E. Customers and wording.** Only you or the team speak to customers, in approved wording, one brand at a time (Working Holiday Tax and Student Visa Tax never mention each other). Will stays paused until you resume it. Never confirm a cause or numbers until the investigation questions in section 5 are answered.

**F. After.** Restore or resume only after you know how they got in. Re-apply customer opt-outs. Review this page within a week. Test a restore once a year (section 10).

## 1. What we can see today (evidence base)

| Source | What it records | Retention | Gap |
|---|---|---|---|
| `will_audit` table (Settings, CRM "decision log", `/api/will/audit`) | Every Will decision, guard verdict, owner action (reply, template edit, kill switch, delete customer, state change), CRM login steps (password ok/failed, OTP, lockout, new device, masked IP, country, city, device), webhook signature rejections (max 1 per minute), inbound snapshot (masked sender), delivery failures, nightly bank-details check | Purged at 90 days (`scheduler.ts:2292`) | 90 days is short for an investigation; no actor identity beyond "owner" (one shared CRM login); reads (export, media view, search, chats) are not logged; not append-only (service role can delete) |
| `will_messages`, `will_customers`, `will_state_history` | Full conversation, state changes, payment flags | Messages never purged | Retention vs APP 11.2 is undecided (see 6) |
| Vercel runtime logs | Function stdout/stderr (Will code itself logs almost nothing to console) | [CONFIRM] plan-dependent, typically hours to days | Probably too short to reconstruct an incident |
| Supabase logs and backups | DB, auth and storage logs; backups | [CONFIRM] plan, PITR | Not evidenced in repo (earlier audit A19-2) |
| Email alerts via Resend to `CRM_ADMIN_EMAIL` | New-device CRM login, repeated failed logins, nightly bank-details mismatch | n/a | No alert for: webhook signature failures, cron not firing, AI budget hit, unusual export volume, outbound send spike |
| Health page (`/api/will/health`, System panel) | Scheduler heartbeat, cron heartbeat, kill switch, credentials present | live only | Pull, not push: nobody is told when the dot goes red |

## 2. Roles

- Incident lead: Jo (decides, approves any customer-facing wording).
- Technical responder: whoever Jo engages with Vercel/Supabase access [CONFIRM name and phone, keep outside the CRM].
- Supervising registered tax agent (The Accounting Academy): must be told for any incident touching TFNs, tax returns or ATO client data, because their own obligations may apply [CONFIRM with them].
- Legal/privacy adviser [CONFIRM name]: on call for the notification decision in section 7.

Keep an out-of-band contact sheet (phone numbers, Vercel/Supabase/Meta/Resend/Anthropic account owners, support links) printed or in a password manager, NOT only in the system that may be down.

## 3. Severity and first response

| Level | Examples | Target first action |
|---|---|---|
| SEV1 | Customer data (TFN, passport, bank, conversations) accessed or exposed; wrong bank details sent to customers; CRM account takeover; leaked service-role or Meta token | Contain within 1 hour of awareness |
| SEV2 | Will sent wrong or off-policy content to customers; webhook or cron compromised without data loss; dependency compromise with no evidence of use | Contain same day |
| SEV3 | Suspicious but unconfirmed (new-device login that was Jo, spike of rejected webhooks) | Investigate within 2 business days |

First 15 minutes, any SEV1/SEV2:
1. Write down the time you became aware and who/what raised it (this starts the 30-day assessment clock, see 7).
2. Open an incident log (a dated note, one line per action with time). Do not paste secrets or customer data into it.
3. Preserve evidence BEFORE cleaning up: export the `will_audit` rows for the window (CRM decision log or Supabase table export), screenshot the Vercel deployment list and runtime logs, note the current deployment id. Do not run `delete_customer`, purge jobs or template deletes while investigating.
4. Contain (section 4) then investigate (section 5).

## 4. Containment playbooks (what to press, in order)

All steps below are switches that already exist. Credential rotation is Category C: do it only with Jo's explicit approval and after noting the rollback.

### 4.1 Will is saying or doing something wrong
1. CRM, "Pause Will" (kill switch, `set_kill_switch`). Effect: scheduler returns before running any job (`scheduler.ts:656`), inbound replies become tasks, owner sends are refused. Verify on the System panel (kill switch shows ON) and `/api/will/version`.
2. Set AI mode to Approval (SUPERVISED) so nothing auto-sends when you resume.
3. Check the audit log for `reply_blocked`, `second_check`, `inbound_rate_limited` around the time; list sent messages in the window and contact affected customers with approved wording only.
4. Known limit: the kill switch is read from the database at each call site. If the database is unreachable the read returns "off" (`store-supabase.ts:1036`). In that case also disable the WhatsApp number or unset the access token at Meta, see 4.3.

### 4.2 Wrong bank details suspected (highest customer-harm path)
1. Kill switch ON immediately.
2. Compare the `bank_details` setting and every Library template body to the published account (the nightly check does this once a day, `scheduler.ts:2280`; run it by reading the Settings and Library by eye now, do not wait for 24h).
3. The reply guard blocks any BSB/account that is not ours in every outgoing message (`policy-guard.ts:938`), so exposure is limited to text that bypassed it (owner-typed manual replies, template rows edited directly in the database, the website). Search `will_messages` for outgoing bodies containing "BSB" or "account" since the last known-good date.
4. Contact every customer who received wrong details (list from step 3) by phone or WhatsApp, and ask your bank to flag/stop inbound payments if misdirected money is suspected.

### 4.3 WhatsApp channel compromised (token leaked, webhook abuse)
1. Meta Business Manager: revoke the system-user token, or pause/disable the phone number (Category C, Jo approves). Without a token, nothing can be sent.
2. The token also lives in `will_settings` (`wa_access_token`, plaintext) and in Vercel env: after revoking, issue a new one and update only through the CRM "Connect WhatsApp" flow or Vercel env, then redeploy.
3. If webhook forgery is suspected: signature failures appear as `inbound_signature_rejected` in the audit log (logged at most once per minute). Rotating `META_APP_SECRET` invalidates old forged signatures; it also rejects all real traffic until Vercel is updated and redeployed, so do both in one sitting.

### 4.4 CRM account takeover or leaked session
1. In Vercel change `CRM_PASSWORD` and `JWT_SECRET`, redeploy: this signs everyone out (documented in `security-watch.ts` email text).
2. Review `crm_new_device`, `crm_password_failed`, `crm_otp_*` audit rows; check Resend dashboard for OTP emails you did not request.
3. Assume anything visible in the CRM in that window was read: go to section 5 and 7.

### 4.5 Supabase service-role key or database exposure
1. Supabase dashboard: roll the service-role key, update Vercel env, redeploy (Category C).
2. Check Storage bucket `uploads` is private; check no signed URLs were shared.
3. Pull Supabase API/auth/storage logs for the window before they age out.

### 4.6 Dependency or build compromise
1. Roll back to the last known-good Vercel deployment (documented path in DEPLOYMENT_CHECKLIST.md).
2. Compare `package-lock.json` against the last good commit; do not run `npm update`. Treat env vars as exposed to the build: rotate those the compromised package could have read (Category C).

### 4.7 Cron not firing / tick failing
1. Health page: cronTick red. Check `CRON_SECRET` is set in Vercel (without it the cron call gets 401 silently, `auth.ts:27`).
2. Open the CRM dashboard (its 15s keepalive keeps the scheduler running via session) while you fix the cron.
3. Nothing is lost: jobs are claimed atomically and stale claims are reclaimed after 2 minutes.

## 5. Investigation checklist (scoping the data involved)

Answer in writing, with evidence, for the incident log:
1. What systems/tables/buckets were reachable by the actor or fault? (CRM, `will_*`, `crm_*`, Storage `uploads`, Meta media, Anthropic requests, Resend.)
2. Which customers' records, which fields (name, phone, DOB, TFN, passport, visa, bank/BSB, income, returns, payslips, conversations)?
3. Was data viewed, copied, altered or just exposed? Evidence sources: `will_audit` owner and auth rows; bulk `GET /api/will/export?all=1` (logged since round 2 as actor `access`, action `data_read`, with counts, masked IP, device and session tag; rows from before the change do not exist, so for older periods absence of a line proves nothing: check Vercel request logs if still retained); Supabase API logs; Storage access logs.
4. Time window: first and last possible malicious activity.
5. Was the data encrypted/unreadable to the actor? (Supabase encrypts at rest, but a service-role or CRM session reads plaintext, so treat as readable.)
6. Remediation done so far and whether risk of serious harm has been reduced.

## 6. Recovery

- App: redeploy the previous Vercel deployment; re-verify `/api/will/health`.
- Data: restore from Supabase backup/PITR [CONFIRM plan and that a restore has been rehearsed]. Restore into a NEW project first and compare, never over production without Jo's approval. Uploaded documents in Storage are not covered by DB backups [CONFIRM separate export].
- After restore: re-run migrations only if missing, verify RLS is enabled on every `will_*` table (query in the footer of `028_will_rls.sql`; note `will_ai_usage` is not in it), verify kill switch state is what you intend before resuming.
- Resume Will in Approval mode, watch the first day, then Autopilot.
- Customers who opted out: do not rely on restore to keep opt-outs current. Re-apply opt-outs from the incident log, a restore can bring back customers who had since stopped (suppression is the `opted_out` flag on the customer row).

## 7. Notifiable data breach (Australia): decision path

Facts to establish [CONFIRM with the privacy adviser, this is not legal advice and the code review cannot establish that the Privacy Act applies to this business]:

1. Does the Privacy Act 1988 (including Part IIIC, the Notifiable Data Breaches scheme) and/or the Privacy (Tax File Number) Rule 2015 apply to the operating entity? Tax file number information is within the scheme.
2. Is it an eligible data breach: unauthorised access to, unauthorised disclosure of, or loss of personal information that is likely to result in serious harm to an individual? Tax file numbers, passports, bank details and identity documents make "serious harm" a realistic conclusion, so default to assuming it applies until the adviser says otherwise.
3. Clock: if there are reasonable grounds to SUSPECT an eligible breach, an assessment must be completed within 30 days of becoming aware, and reasonably quickly. If there are reasonable grounds to BELIEVE one occurred, notify the OAIC and affected individuals as soon as practicable. Remedial action that prevents serious harm can remove the duty, so record what was done and when.
4. Who must notify: the entity that holds the information. If both Jo's business and the supervising agent hold the same records, agree in writing who notifies so duplicates and gaps are avoided. [CONFIRM contract position]
5. Other parties: the supervising registered tax agent (their own TPB/ATO obligations, ATO guidance for tax practitioners on data breaches [CONFIRM current channel]), payment provider/bank if bank details are involved, police/ReportCyber for criminal activity, and processors to ask for their logs (Vercel, Supabase, Meta, Anthropic, Resend, Upstash).
6. Customers are international backpackers and students: some may be in the EU/UK or elsewhere. Ask the adviser whether any foreign breach-notification rule is triggered. [CONFIRM]
7. Notification content (OAIC statement and individual notices): who we are, what happened, what information, what we recommend people do (watch for scams quoting their TFN, contact the ATO about TFN misuse, change passwords, treat unexpected "refund" messages with suspicion), how to contact us. Use plain English; translate for the customer's language if needed, wording approved by Jo, no em/en dashes, no brand cross-mention between WHT and SVT customers.
8. Keep a breach register: date aware, assessment, decision, notifications sent, evidence references.

## 8. Communications rules during an incident

- Customers hear from Jo or the team in approved wording, never from Will improvising. Kill switch on means Will is silent, so nothing automated contradicts the message.
- WHT and SVT customers receive separate messages with no mention of the other brand.
- Do not paste customer data, tokens or the incident log into WhatsApp, email, AI tools or tickets. Redact.
- Do not confirm cause or numbers publicly until the investigation checklist is answered.

## 9. Readiness gaps and the smallest fixes (status after round 2)

1. Audit retention as configuration: DONE in code, defaults unchanged. `AUDIT_RETENTION_DAYS` (ordinary rows, default 90) and `AUDIT_SECURITY_RETENTION_DAYS` (actors auth, owner, access, channel, default 90, recommended 365 and never shorter than the first). Setting it is the owner's decision (APP 11.2), confirm with the supervising agent. Rows are still deletable by anyone with database access, so for real tamper evidence copy the security rows to storage you control each month (see 10.5).
2. Reads are logged: DONE. Actor `access`, action `data_read`, for export, WhatsApp media, search, chat paging, stored document views (`/api/crm/file`), the leads CSV and the clients list. Search is logged as length and kind only, ids and paths as a short hash, never names, numbers or text. Chat paging, search and clients are rate limited to one row per session per window with a call count, so a scraper still shows up as a pattern.
3. Who did it: PARTLY. Every login creates a random session id; audit rows for owner actions and reads carry a one way session tag, masked IP and device, and a `crm_session_started` row ties the tag to the login. This does not identify a person: the CRM still has one shared password, so telling two staff apart needs per person logins (a product change, not applied).
4. Push alerts: DONE, all OFF by default. Set to `1` in Vercel to enable: `SECURITY_ALERT_BULK_EXPORT`, `SECURITY_ALERT_KILL_SWITCH`, `SECURITY_ALERT_SIGNATURE_BURST` (threshold `SECURITY_ALERT_SIGNATURE_THRESHOLD`, default 5 an hour), `SECURITY_ALERT_CRON_STALE` (`SECURITY_ALERT_CRON_STALE_MINUTES`, default 20). They email `CRM_ADMIN_EMAIL` through the existing Resend helper, one email per kind per 15 minutes per server instance, no customer data in the body. Still missing: AI budget exhausted, outbound send spike, and an external uptime ping (the health route is behind login, so use a status page or a monitor that can send the secret header).
5. Write down in PROJECT_HANDOFF.md: Supabase plan, backup/PITR status, region, last successful restore rehearsal, Vercel log retention, who holds each account (earlier audit A19-2). OPEN.
6. Rehearse a restore once: section 10. OPEN.
7. Decide data retention for conversations, payment screenshots and uploaded documents after lodgement (APP 11.2). OPEN, proposal belongs under security-assessment/proposals.
8. Keep a reviewed copy of this runbook outside the system and review it after every incident and each tax season. OPEN.

## 10. Backup and restore test procedure

Goal: prove, before an incident, that a backup of Will's data can be turned back into a working system, and learn how long it takes. Nothing here touches production writes. Never restore over production without the owner's explicit approval.

### 10.1 What must be recoverable
| Asset | Where | Covered by database backup? |
|---|---|---|
| Customers, messages, state history, tasks, templates, knowledge, settings (kill switch, bank details), audit log, jobs | Supabase Postgres, tables `will_*` and `crm_*` | Yes, if the plan has backups [CONFIRM plan: free plans have none, Pro has daily, point in time recovery is an add on] |
| Uploaded documents (identity, tax documents) | Supabase Storage bucket `uploads` (private) | No. Needs its own export [CONFIRM] |
| WhatsApp media | Meta keeps it 30 days only | No. Not recoverable after 30 days |
| Secrets | Vercel env, a password manager | Not in any backup. Keep an encrypted copy of the list of NAMES and where each value comes from, never the values in a document |
| Code | The release zip or the repository | Keep the last two release zips offline |

### 10.2 Two kinds of test
- **Tier A, drill with synthetic data (any time, no approval needed).** Proves the procedure and that the migrations in `supabase/migrations` rebuild a working schema.
- **Tier B, rehearsal with a real backup (once a year and after any plan or region change, owner approves, 60 to 90 minutes).** Proves the real backup is complete. The scratch project holds real customer data, so treat it exactly like production: same region, strong password, only you and the technical responder have access, deleted the same day. Real data never goes into development, tests or screenshots.

### 10.3 Tier A steps
1. Create a new empty Supabase project (name it `restore-drill-YYYYMMDD`, same region as production). Do not point any env var of the live site at it.
2. In its SQL editor apply the files in `supabase/migrations` in number order. Never run anything from `RESET_WILL_FRESH_START.sql`. Write down any migration that fails: that is a finding.
3. Run the local app (or a Vercel preview with its own env) against the scratch project with the dev seed (the synthetic customers in `src/lib/will/demo-data.ts`).
4. Use the app: send a test message, change a stage, toggle the kill switch, open the decision log. Take a backup or export of the scratch database (dashboard backup, or `pg_dump` from a trusted machine).
5. Create a second empty project and restore that backup into it. Compare table row counts and the newest message id between the two. They must match.
6. Delete both projects. Record date, time taken, problems.

### 10.4 Tier B steps (real data)
1. Before starting: write the date and who approved. Confirm the backup list in the Supabase dashboard (date of newest backup, retention, whether point in time recovery is on). Record these in PROJECT_HANDOFF.md.
2. Download the most recent backup (or request a point in time restore into a NEW project, never in place).
3. Restore into a new project in the same region. Do not connect the live site to it.
4. Compare with production, read only: row counts per table (`will_customers`, `will_messages`, `will_audit`, `will_state_history`, `crm_*`), newest message timestamp, the `kill_switch`, `bank_details` and `ai_mode` settings, the count of customers with `opted_out` true. Differences must be explained by the age of the backup.
5. Check security on the restored copy: row level security is enabled on every `will_*` table (query in the footer of `028_will_rls.sql`, and note `will_ai_usage` is not in it), the `uploads` bucket is private, no anon grants.
6. Storage: list the `uploads` bucket in production and in the restored project and compare the number of objects. If the restored project has none, record that documents need a separate export, and decide how often to take one.
7. Start a stopwatch at step 2 and stop it when step 5 is finished: that number is your real recovery time. Write it on the checklist.
8. Delete the scratch project and any downloaded dump the same day (secure delete), and record that you did.

### 10.5 Evidence kept after every test (one paragraph in a dated note)
Date, tier, who did it, backup age, minutes to restore, what mismatched, what was fixed, next test date. Once a month, as an extra control, export the security rows of the decision log (actors auth, owner, access, channel) and store the file offline: the table itself can be edited by anyone holding the service-role key.

### 10.6 Pass criteria
Restore completes without manual SQL repair, counts match within the backup age, RLS and bucket privacy verified, recovery time known and acceptable to the owner (for example under 4 hours), the kill switch state after restore is what you intend (restored Will can start messaging again: restore with the kill switch ON, set it in the restored copy before any traffic), opt-outs are re-applied from the incident log.
