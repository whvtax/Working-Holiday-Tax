# sec-will-cron-ir: WhatsApp assistant, cron, email, logging and incident readiness

Method: static review plus local jest only. No production access, no real data, no secrets printed. Prior audit notes in `.audit-state/findings/A12-security.md` and `A17-A19-privacy-infra.md` were read; duplicates are marked "re-confirmed".

## Scope covered

- `src/app/api/will/*` (23 routes) and `src/lib/will/*`: webhook, tick, actions, export, media, mine, knowledge, auth.
- Meta signature verification, replay and duplicate handling, rate limiting, prompt-injection surface (decide tool, policy guard, payment-proof vision, knowledge mining), kill switch, opt-out, cross-customer retrieval, cron auth and idempotency, outbound email (Resend), logging and audit trail, migrations/RLS, backup and incident documentation.
- Output: `security-assessment/INCIDENT_RESPONSE_RUNBOOK_PROPOSAL.md`.

## Specialist perspectives

- API security (Agent 08): webhook is the only unauthenticated Will endpoint. All 22 other routes call `sessionValid()` (or `cronAuthorized()` for tick) as the first statement (grep-verified). Actions has Origin check. Signature, size cap, dedupe and flood control all present.
- Red team (Agent 03): attacker with only a WhatsApp number can send text and media. The model has one tool (`decide`: reply / human_task / wait, state, task text), no recipient field, no fetch/DB/shell. Output passes a deterministic guard in code. Nothing found that lets customer text reach another number, another bank account or another customer's data.
- Blue team (Agent 04) and Incident response (Agent 18): good detective logging for login and Will decisions, weak on read-access logging, push alerting and retention (F-04 to F-07).
- Data protection and Privacy (Agents 09, 10): retention and NDB readiness items F-07, F-08, F-10. Legal applicability not asserted.

## Findings

| ID | Sev | Status | Title | Evidence |
|---|---|---|---|---|
| F-01 | Low | Confirmed | Webhook replay window: dedupe markers purged at 30 days, no max-age on message timestamp | `scheduler.ts:2269`, `webhook/route.ts:748-751`, `channel.ts:507-519` |
| F-02 | Low | Confirmed (re-confirmed A12-5) | WhatsApp token sent to whatever host Meta's media lookup returns | `channel.ts:751-754` |
| F-03 | Low | Confirmed | `will_ai_usage` has no RLS (missed by 028) | `supabase/migrations/042_will_ai_usage.sql` |
| F-04 | Medium (readiness) | Confirmed | No audit trail for data reads: bulk export, media view, search, chats | `export/route.ts:27-60`, `media/[id]/route.ts:22`, `search/route.ts` |
| F-05 | Medium (readiness) | Confirmed | Audit log retention 90 days, mutable, single shared actor "owner" | `scheduler.ts:2292`, `023_will_audit.sql`, `actions/route.ts:1117` |
| F-06 | Medium (readiness) | Confirmed | No push alerting for security-relevant signals (signature failures, cron dead, export, budget) | `webhook/route.ts:661-676` (audit only), `tick/route.ts`, health is pull |
| F-07 | Medium (readiness) | Confirmed | No incident response, backup/restore or NDB documentation in repo | grep of docs/ and PROJECT_HANDOFF.md; earlier A19-2 |
| F-08 | Low | Confirmed | `delete_customer` writes the raw WhatsApp number into the 90-day audit log and removes the opt-out record | `actions/route.ts:1027-1028` |
| F-09 | Low | Confirmed | Kill switch fails open if the settings read errors; enforcement is per call site, not at the send chokepoint | `store-supabase.ts:1036-1039`, ~20 call sites pass `killSwitch: false` literal (owner-initiated or already-gated) |
| F-10 | Low | Confirmed | Knowledge mining stores verbatim customer phrasing in `examples` with no PII-exclusion instruction | `claude.ts:562-584`, `mine/route.ts:57`, `daily-digest.ts:242` |
| F-11 | Info | Confirmed | Fully automated follow-ups carry no opt-out wording; opt-out is silent (no confirmation) | `service.ts:290-297`; no "stop" text in templates |
| F-12 | Info | Confirmed | Payment trust model: typed "paid" or an unreadable document moves a lead to Paid and sends the form link; injection in a screenshot could do the same | `payment-proof.ts` header, `service.ts:2430+`, `injection-defence.test.ts:6-9` |
| F-13 | Info | Confirmed | Bank constants duplicated in code (`policy-guard.ts:938-939`, `security-watch.ts:20-21`); nightly mismatch check runs once per 24h | `scheduler.ts:2280` |
| F-14 | Info | Confirmed | Rate limiter falls back to per-instance memory when Redis fails; flood control becomes per warm instance | `rate-limit.ts:63-95` |
| F-15 | Info | Confirmed | `claimInbound` fails open on unexpected DB error (deliberate, at-least-once) | `store-supabase.ts:1447-1456` |

### Verified controls (no finding)

- Signature: HMAC-SHA256 over the raw body, hex decode, length check, `timingSafeEqual`, fails closed with no secret, body cap 256 KB checked on Content-Length and real bytes before parsing (`webhook/route.ts:130-141, 653-677`). Verify-token handshake is timing-safe and fails closed (`:119-127`). New edge-case tests added (missing header, sha1 prefix, non-hex, truncated, wrong secret, oversize, replay, unset verify token).
- Duplicates: atomic insert-claim on Meta message id with unique violation = skip; failed messages release the claim and return 500 so Meta redelivers; after MAX attempts the claim stays and a human task is raised (`:741-830`). Edits, echoes and notes claim too.
- Cron: `Authorization: Bearer $CRON_SECRET` or `x-cron-secret` compared with `timingSafeEqual` after length check, empty secrets rejected, session fallback (`auth.ts:8-35`). Only one cron in `vercel.json` (`/api/will/tick`). Tick is idempotent: single-flight mutex, `claimJob`, stale-claim reclaim at 2 minutes, 45s budget under `maxDuration` 60, arming failures cannot block sending (`tick/route.ts`, `scheduler.ts:654-740`). The heartbeat distinguishes real cron from a browser session.
- Recipient control: the send recipient is always the stored customer wa_id (`channel.ts:268-275, 335`). The decide schema has no phone/recipient field. Owner template/estimate sends go through the same customer id. No route lets a request body name an arbitrary destination (checked `actions/route.ts`).
- Bank details: guard rejects any BSB/account figure that is not ours in any outgoing message, exempt-proof (`policy-guard.ts:936-945, 1099`); template save runs the guard; bank setting has no write route (only DB); nightly check plus URGENT task plus email on mismatch.
- Prompt injection: playbook treats customer text as data; low-confidence goes to a human; approval-time re-guard (`actions/route.ts:495`); guard also blocks prompt echo, credentials, foreign URLs, invented prices, myGov steps, non-dollar currency (`policy-guard.ts:1074-1130`); injection-defence suite exists. Media served to the CRM is sandboxed with CSP and attachment disposition for non-image types (`media/[id]/route.ts:33-53`).
- Kill switch: checked in tick (returns before any job), inbound engine paths, owner approvals/sends, follow-ups, payment confirmations, with audit rows `kill_switch_on/off` (`actions/route.ts:1115-1118`).
- Opt-out: multilingual regex, deliberately narrow, applies to customer's own words not to media descriptions; cancels jobs, discards pending drafts, guard blocks `CUSTOMER_OPTED_OUT`, all send paths re-check (`service.ts:64-71, 286-297`; 14 re-checks counted).
- Cross-customer leakage: conversation history, profile and backstory are built from the single customer record (`claude.ts:131-150`, `service.ts:1127`). Retrieval returns only `intent/question/answer` of human-approved `active` entries, brand-filtered (`knowledge.ts:36-41, 55-80`). Mined entries are saved as `draft`; the only `active` writers are manual, seed (`knowledge/route.ts:173`, `seed.ts:494`).
- Email: Resend JSON API (no SMTP headers, so no header injection). Recipient is `CRM_ADMIN_EMAIL` env; subjects are constants; body interpolations are escaped (`security-watch.ts:101-107, 144-163`, `scheduler.ts:2288`). No customer-controlled recipient anywhere.
- RLS: all 14 `will_*` tables except `will_ai_usage` have RLS enabled; service role only; Realtime publication removed (`028`, `031`). The anon key is not referenced anywhere in app code.
- Logging hygiene: Will code uses the audit table, not console; sender numbers masked in audit (`webhook/route.ts:257`); only one `console.error` in store-file (dev store). No TFN or bank figures logged in the code paths read.

### Finding detail

**F-01 Replay window (Low, Confirmed).** A signed webhook body is only useful to someone who already holds a Meta-signed payload (Meta, a TLS-breaking proxy, or the app secret). If such a body were replayed after the 30-day purge of `will_processed_messages`, it would be re-processed: the only age filter is a fixed fresh-start cutoff, not a rolling max age. Exploitability in this architecture is very low (needs a captured signed payload; impact is a duplicate customer reply or task, still guarded). Fix: reject message timestamps older than 7 days (Meta's retry horizon) except when history-sync is expected, or purge markers at 90 days. Category B: patch proposed, not applied (a max-age risks dropping a legitimately delayed delivery). Verification: unit test with a stale `timestamp`.

**F-02 Media host not pinned (Low, re-confirmed).** `fetchWaMedia` attaches the bearer token to `info.url` returned by Graph. Only exploitable if Graph's response is attacker-controlled. Fix is a host allowlist, but a wrong allowlist breaks every photo and payment screenshot in production, so: patch only.

**F-03 `will_ai_usage` without RLS (Low).** Holds token counts, cost and an internal `customer_id`; no names or message text. Exposure needs the project's anon key, which this app never uses or ships, so practical risk is low; defence in depth fix is one line, Category B (schema, needs Jo approval to run). Patch below.

**F-04 Reads not audited (Medium for incident readiness).** `/api/will/export?all=1` returns every conversation ever (`export/route.ts:46-49`), plus media and search, behind one shared login with no audit row. In an incident you cannot prove or disprove bulk exfiltration by a hijacked session. Fix: write one audit row per call (action, masked IP, count) via the existing `store.audit`. Category A/B boundary (touches authenticated routes only, no behaviour change); patch proposed, not applied because three route files fall outside "own findings" test coverage and I could not run them without a session mock.

**F-05 Retention and integrity of the audit trail (Medium for readiness).** 90-day purge; security events share the table with noisy rows; actor is the constant "owner" so a stolen session is indistinguishable from Jo. Fix: longer retention for `auth` and `owner` actions; store session id hash and masked IP on owner actions. Category C (retention policy, approval needed).

**F-06 No push alerts (Medium for readiness).** Only three signals email Jo (new device, failed logins, bank mismatch). Signature rejection bursts, a dead cron, budget exhaustion, kill-switch toggles and exports are pull-only. Fix list is in the runbook, section 9.

**F-07 No IR/backup docs.** Added a proposed runbook. Supabase plan, PITR and restore rehearsal remain unknown (needs dashboard).

**F-08 Delete removes evidence and keeps PII (Low).** Audit detail contains the raw number for up to 90 days, which contradicts the purpose of deletion, while the opt-out flag is lost with the row so a deleted opted-out person who writes again is treated as new and messaged. Fix: audit a hash or masked number; keep a minimal suppression list. Needs product decision.

**F-09 Kill switch semantics (Low).** `getSetting` swallows errors and returns undefined, which reads as "switch off". In a DB outage, sends would fail anyway, but the 4.1 runbook step 4 tells the operator to disable at Meta in that case. Fail-safe alternative: treat a read error as ON in the send path.

**F-10 Mining stores verbatim phrasing (Low).** `examples` and keywords come from customer wording and are used for scoring only, never shown to another customer, and drafts need human approval. A TFN or phone typed in a question could persist in the knowledge table indefinitely. Fix: add one instruction to `MINE_SYSTEM` to exclude personal identifiers and a regex scrub before save. Prompt wording change is Category B for model behaviour, patch only.

**F-11 / F-12 / F-13 / F-14 / F-15** are accepted design trade-offs or defence-in-depth notes; see the table. F-12 deserves one sentence for Jo: the business accepts that a claim of payment moves a lead forward and that the team checks the bank before lodging, so the loss ceiling is a form link and a few team minutes, not money or data.

## Fixes applied (files)

- Added `src/lib/will/__tests__/sec-webhook-edge-cases.test.ts` (test only, 8 tests). No production code changed.
- Added `security-assessment/INCIDENT_RESPONSE_RUNBOOK_PROPOSAL.md`.

## Patches proposed (diffs, context-based, not applied)

F-03 (new migration `supabase/migrations/049_will_ai_usage_rls.sql`, Jo to approve and run after a backup):

```diff
+ALTER TABLE will_ai_usage ENABLE ROW LEVEL SECURITY;
+-- No policies: deny-all for anon/authenticated, service role bypasses (same as 028).
```

F-02 (`src/lib/will/channel.ts`, before the second fetch; verify the allowed suffixes against real Meta responses in a test number first):

```diff
     if (!info.url) return { ok: false, status: 404, error: 'media expired or unavailable' };
+    let host = '';
+    try { host = new URL(info.url).hostname.toLowerCase(); } catch { /* handled below */ }
+    if (!/(^|\.)(fbcdn\.net|fbsbx\.com|facebook\.com|whatsapp\.net)$/.test(host)) {
+      return { ok: false, status: 502, error: 'unexpected media host' };
+    }
```

F-01 (`src/app/api/will/webhook/route.ts` inside the text loop, or `extract`):

```diff
+      const MAX_AGE_SECS = 7 * 24 * 3600;
+      if (msg.timestamp && Date.now() / 1000 - Number(msg.timestamp) > MAX_AGE_SECS) {
+        await store.audit('policy_guard', 'inbound_stale_dropped', { from: maskWa(msg.from) }).catch(() => {});
+        continue;
+      }
```
(or the one-line alternative: `store.purgeProcessedMessages(90 * 24 * 60 * 60 * 1000)` at `scheduler.ts:2269`.)

F-04 (each of export, media, search routes, after `sessionValid`):

```diff
+  await getStore().audit('owner', 'data_read', { route: 'export', all, hours }).catch(() => {});
```

F-08 (`actions/route.ts:1028`):

```diff
-      await store.audit('owner', 'customer_deleted', { customerId: b.customerId, waId: customer.waId });
+      await store.audit('owner', 'customer_deleted', { customerId: b.customerId, waId: `***${customer.waId.slice(-4)}` });
```

F-09 (send path; helper):

```diff
-  const killSwitch = (await store.getSetting('kill_switch')) === true;
+  const killSwitch = await store.getSetting('kill_switch').then((v) => v === true, () => true); // read error = paused
```

## Tests run

- `npx tsc --noEmit`: clean.
- `npx jest` on `sec-webhook-edge-cases`, `webhook`, `audit3-sched-45` (cron auth), `injection-defence`, `opt-out`: 5 suites, 52 tests, all pass (the in-memory rate-limit warnings in output are expected with no Redis).
- `npm audit`: not run (out of scope for this part).

## Not assessed / needs infrastructure access

- Vercel: whether `CRON_SECRET` is set in production, log retention, env scoping (preview vs production Supabase), WAF/rate limits at the edge.
- Supabase: plan, backup/PITR, region, storage bucket privacy and access logs, whether `will_ai_usage` has grants to anon, service-role key holders.
- Meta: webhook subscription fields, app secret rotation procedure, phone-number and WABA ownership, template approvals.
- Upstash/Redis region and retention; Resend domain and DMARC; Anthropic data-retention terms for message content and payment screenshots sent for analysis.
- Legal: Privacy Act and TFN Rule applicability, Spam Act 2003 consent and unsubscribe for automated follow-ups (F-11), retention periods, foreign-resident breach rules. Not asserted by this review.
- The tax form and upload paths are outside this part's scope.

## Devil's advocate on the top findings

- F-04/F-05/F-06 (readiness, rated Medium): they are not vulnerabilities, they decide whether a future incident can be scoped. If Jo is the only user and logs in rarely, the real risk of an unlogged export is small. But NDB scoping without logs forces the assumption "everything was taken". Cost of the fix is one audit line per route; a longer retention costs a few MB. Risk of breaking production: low, wrap in `.catch`. A noisy alert could train Jo to ignore email, so start with four alerts only.
- F-01 max-age drop: could discard a real delayed delivery or coexistence history sync and silently lose a customer message. That is worse than the risk it removes, which is why it stays a proposal and the safer variant is lengthening marker retention.
- F-02 host allowlist: a wrong suffix breaks all media including payment proof, which is the exact flow that gates revenue. Test on a real Meta sandbox before shipping.
- F-09 fail-closed kill switch: a flaky settings read would silence Will for real customers, a business-hours cost, so scope it to the send path only and alert when it triggers.
- Rate limits: no new rate limit is proposed. The existing per-sender cap (`PER_SENDER_MAX`) already drops messages and could in principle drop a real customer who sends many short messages; I did not change it.
- False positives I considered and dropped: webhook has no auth beyond HMAC (correct, Meta cannot send a session); tick accepts GET with a session (SameSite=Strict, idempotent, no input); knowledge retrieval cross-brand (filtered by `usableFor`); bank numbers in source (public business details, guard constants, not secrets).
