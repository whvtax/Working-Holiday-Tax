| finding ids | severity | real today? | devil's advocate (one line) | decision | exact fix or what the owner must do |
|---|---|---|---|---|---|
| API-02-F01, LIB-02-F01 | MEDIUM | No. `src/proxy.ts:126` matcher now lists `/api/mia/:path*` | Nothing left to argue | ALREADY_FIXED | src/proxy.ts:126 |
| API-02-F02 | MEDIUM | No. `src/lib/mia/data.ts:46-49` checks `ALL_STATES` and `customer.brand === 'svt'` before `setState` | Transition order is still not checked, but that is the owner dragging a card on her own board | ALREADY_FIXED | src/lib/mia/data.ts:46-49 |
| API-02-F03 | LOW | Mostly no. `src/lib/mia/data.ts:70-71` refuses a non-SVT customer. Still true: the approve path (actions/route.ts:476-560) never reads `meta.reason: 'svt_number_not_live'` | Sending needs the owner to press Approve, the guard runs again at 503, and the send uses the SVT brand, which has no credentials until the line is live | ALREADY_FIXED | src/lib/mia/data.ts:70-71. The leftover (approve ignores the marker) is not worth a change |
| API-01-F01 | MEDIUM | No for the global limit: `webhook/route.ts:812-814` releases the claim and asks Meta to retry. A single sender over 40 per 15 min is still dropped | Dropping one flooding sender is the stated design (comment at 800-807) | ALREADY_FIXED | src/app/api/will/webhook/route.ts:812-814 |
| API-01-F02 | MEDIUM | Yes. `manual_reply` (actions/route.ts:856-899) goes `humanSend` then `deliverOut` with no `policyGuard`; `send_estimate` accepts any http(s) `invoiceLink` (1321-1324) | The owner is the sender. A guard on her own typed text would stop her quoting a special price or promising a refund on purpose; a stolen session can do worse things than send text | NEEDS_OWNER | Decide: (1) should text you type by hand in the chat box pass the same content rules as Will's drafts (it would sometimes refuse your own message)? (2) which invoice website(s) may an estimate link point to, so all others can be refused? |
| API-01-F03 (wildcard part), LIB-01-F01 (wildcard part) | MEDIUM | No. `src/lib/db.ts:145-146` strips `*` `,` `(` `)` before `ilike` | Nothing left to argue | ALREADY_FIXED | src/lib/db.ts:145-146 |
| API-01-F03, LIB-01-F01, API-02-F11 (merge by typed email or phone) | MEDIUM | Yes for `/api/tax-form` (route.ts:106-108) and `/api/super-form`. TFN and ABN routes are removed | No data comes back to the submitter, the match is brand scoped and rate limited, and staff read every task before lodging. Not reusing the id would end the "Returning client" label staff rely on | NEEDS_OWNER | Decide: when a form's email or number matches an existing client, keep attaching it to that client automatically, or show "possible returning client, confirm" and attach only after you confirm? |
| API-01-F04 (a), INFRA-01-F06 | MEDIUM / LOW | Yes. Without a token and with `FORM_TOKEN_ENFORCE` not `true`, `notifyFormReceived` matches the chat by the typed number (tax-form/route.ts:306-312); the database trigger `will_on_form_received` (048:21-43) does the same match on its own | Old customers still hold links without a token; enforcing now would leave their forms unlinked until linked by hand. The damage is one wrong "we received your questionnaire" message | NEEDS_OWNER | Set `FORM_TOKEN_ENFORCE=true` in Vercel once the old open links are done, and decide whether the database trigger `will_on_form_received` should then be dropped (a migration) |
| API-01-F04 (b) | MEDIUM | Yes. Both SVT branches return at tax-form/route.ts:267 and 275, before the "mark used" write at 278-282, so an SVT link is never closed | SVT forms are still off (`SVT_FORMS_ENABLED`), so nobody can use this today | FIX_NOW | Move the "mark used" block above the SVT branches. See details 1 |
| API-01-F04 (c), API-02-F07 | LOW | Yes. Read then write, not atomic (tax-form/route.ts:55-56 and 278-282; fix/route.ts:32, 41). The fail-open part cannot be closed in the route: `getSetting` swallows read errors itself (store-supabase.ts:1041-1049) | Only the holder of the signed link can replay it, and only to send their own form again or re-answer one two-value question on their own task. A real fix needs a unique key in the database | NO_FIX | Harm is limited to the link holder's own record; an atomic claim needs a migration |
| API-01-F05 | MEDIUM | No. knowledge/route.ts:117-126: 500 entry cap, 500 / 4000 character caps, an entry that breaks a rule is stored as draft. Still open: weight not clamped, no audit row | Session only, and every reply is guarded again at send time | ALREADY_FIXED | src/app/api/will/knowledge/route.ts:117-126 |
| API-01-F06 | LOW | Partly. `format=json` still returns raw rows and bodies (export/route.ts:157-164). `no-store` is already sent for every `/api/` response (vercel.json:19-32). No button in the CRM asks for JSON (Dashboard.tsx:2264-2285) | It is the owner downloading her own data behind login, logged and alerted as a bulk export | NEEDS_OWNER | Decide: remove the unused JSON format of the export, or keep it and strip phone numbers, emails and long digit runs as the text format does (your 15 Nov rule) |
| API-01-F07 | LOW | Yes. `markDeliveryFailedByProviderId` (store-supabase.ts:843-855) returns the row again when it is already FAILED, so a redelivered status adds another job or card | The resend job checks `wasAlreadySentVerbatim` first (scheduler.ts:1546), so no second copy reaches the customer; the cost is a duplicate card on a rare Meta redelivery | NO_FIX | No customer impact; changing what the store returns risks hiding a real second failure |
| API-01-F08 | LOW | Yes. `handlePaymentProofMedia` runs before the note limiter (webhook/route.ts:906-907, 927-941) | Owner rule in the code: "we trust the customer", and the comment says the checks sit after it on purpose. Spend is capped by the daily AI budget | NO_FIX | Deliberate owner decision written at webhook/route.ts:900-905 and 930-933 |
| API-01-F09 | LOW | Yes. actions/route.ts:1142 stores `b.value === true`, so a missing or non-boolean `value` turns the switch OFF (the 18 Nov read-back does not stop this) | The only caller sends a real boolean (Dashboard.tsx:1204) | FIX_NOW | Refuse a non-boolean `value`. See details 2 |
| API-01-F10 | LOW | Yes. No `withBrand` anywhere in actions/route.ts; guard calls at 503, 714, 821 run with the default brand `wht` | Transmission itself uses `customer.brand`, and the SVT WhatsApp line is not live, so no SVT customer is affected today | NEEDS_OWNER | Before switching on the SVT WhatsApp line, have each customer action in /api/will/actions wrapped in that customer's brand. Not needed while the line is off; too wide for a same-day change |
| API-01-F11 | LOW | Yes (actions/route.ts:241-242) | Session only, input capped at 64 KB, the pattern comes from the owner's own Library, and the guard still judges the whole text | NO_FIX | Only the owner can trigger it, against herself |
| API-01-F12 | INFORMATIONAL | Yes, all eight points are as described | Each is a small cost or tidiness point behind a session or a rate limit | NO_FIX | No harm shown |
| API-02-F04, LIB-01-F02 (client write not checked) | MEDIUM | No. `src/lib/db.ts:495-496` and `558` read the error before the delete at 562 | Nothing left to argue | ALREADY_FIXED | src/lib/db.ts:495-496, 558 |
| LIB-01-F02 (documents left behind) | MEDIUM | Yes. `deleteTaskAndArchive` (db.ts:406-565) never calls `deleteFiles`; a task archived without Done first keeps its uploads in storage | Normal flow is Done first, which deletes the files (db.ts:280). Deleting documents here by default could remove files staff still need | NEEDS_OWNER | Decide: when a task is archived without being marked Done, should its uploaded documents be deleted then, or refused until Done? Also decide whether to set `ORPHAN_UPLOAD_DELETE=true` |
| API-02-F05 | LOW | Yes. `GET /api/crm/tasks` (route.ts:11-23) returns decrypted TFN and bank details and writes no access-log row; same for will/messages and the others listed | One owner, and a stolen session should be assumed to have read everything anyway | FIX_NOW | Log the task list read (the one that carries TFN and bank details), throttled like `clients`. See details 3. The other routes stay as they are |
| API-02-F06 | LOW | Yes (leads/route.ts:70-76 and the others) | Only the logged-in owner sees the text and it is what lets her report a fault; the connect screen shows Meta's message on purpose | NO_FIX | The reader is the owner |
| API-02-F08 | LOW | Yes. connect/route.ts:50-52 only trims the ids; `saveWaCreds` at 103 writes no audit row | The caller holds a session and supplies her own token; the host is fixed to graph.facebook.com | FIX_NOW | Digits-only check on both ids and one audit row without the token. See details 4 |
| API-02-F09 | LOW | Yes for the missing limiter on from-task and atlas/ask | Session only, guarded prefixes, one operator | NO_FIX | A stolen session has cheaper ways to hurt; no outside caller can reach these |
| API-02-F10 | LOW | Yes (db.ts add/remove return helpers read then write) | One operator; two tabs editing the same client's returns in the same second is not a real workflow | NO_FIX | Fix costs more than the harm |
| API-02-F11 (typed number in `form_received_unmatched`) | INFORMATIONAL | Yes (form-link.ts:407) | The same number is put on the task card on purpose so the owner can link the chat; the audit log is owner only | NO_FIX | The number is already shown to the same reader by design |
| API-02-F12, LIB-01-F05 | INFORMATIONAL / LOW | Yes. Lockout key is per IP (crm-store.ts:243-251); `EXPIRE` is a second call after `INCR` | A global counter was removed on purpose (comment AUTHZ-DOS-01) because it lets anyone lock the owner out; the emailed 8 digit code is still needed | NO_FIX | Deliberate trade; the second factor carries it |
| API-02-F13 | INFORMATIONAL | Yes (tick and orphan-sweep act on GET with a session) | The dashboard itself calls tick by GET every 15 s; both are built to be repeated | NO_FIX | A forced early tick changes nothing |
| LIB-01-F03, LIB-02-F03 | MEDIUM | Yes in code. `sealField` returns the plain value when no key ring is set (field-seal.ts:39-44); passport number, date of birth and address are never sealed | Fail-open is the written rollout plan (field-seal.ts:8-11) so no submission is lost while keys are being set | NEEDS_OWNER | Confirm `FIELD_ENC_KEYS` and `FIELD_ENC_ACTIVE` are set in Vercel production, run `scripts/seal-legacy-task-fields.mjs` with apply, then say whether a missing key should make the form fail (needs a new variable) and whether passport number should be sealed too |
| LIB-02-F02, INFRA-01-F01 | MEDIUM | Code: no. `scripts/seal-legacy-task-fields.mjs:66-73` now clears `tfn_norm`. The live column is unknown | No code reads the column | ALREADY_FIXED | scripts/seal-legacy-task-fields.mjs:66-73. The owner still has to run that script with apply; dropping the column is a later migration |
| LIB-01-F04 | LOW | Yes. `_lastRefresh = now` is set before the refresh succeeds (crm-store.ts:116) | Written as a deliberate fail-open (104-110): failing closed locks the owner out of the live system during a Redis fault; retrying on every request adds 1.5 s to each one | NO_FIX | Deliberate, documented choice |
| LIB-01-F06 | LOW | Yes in code (get-ip.ts:84-98) | Vercel's edge overwrites `x-real-ip` and `x-forwarded-for`; there is no other path to the origin | NO_FIX | Platform guarantee; the file header states the assumption |
| LIB-01-F07 | LOW | Yes (security-watch.ts:32-39, 62-64) | Every login already sends the 8 digit code to the owner's email, which is itself the alert; templates are guarded when saved | NO_FIX | The login email already tells the owner |
| LIB-01-F08 | LOW | Yes. `findOpenTaxTaskByWhatsapp` (db.ts:358-363) has no brand filter although its only caller is WHT only | Needs a staff-made link and a newer task ending in the same 9 digits | FIX_NOW | Skip SVT tasks in the match. See details 5. The 300 row window stays |
| LIB-01-F09 | LOW | Yes (upload.ts:222-246) | Needs a CRM session, or an object URL with a random part that only its uploader ever sees | NO_FIX | Not reachable by an outsider |
| LIB-01-F10 | LOW | Yes. ask.ts:145-146 sends `history` and `question` without redaction | Staff type the question themselves | FIX_NOW | Pass both through the redaction already imported. See details 6 |
| LIB-02-F04 | LOW | Yes (redact.ts:11-21) | Lowering the digit threshold would also remove amounts, years and reference numbers Atlas needs; Will already sends the same customer text to the same provider | NO_FIX | A tighter pattern breaks answers for little gain |
| LIB-01-F11 | LOW | Yes in code (rate-limit.ts:108-134, `EXPIRE ... NX` at 118 and 170) | The memory fallback is the documented degrade mode, bounded, never open | NEEDS_OWNER | Confirm the Redis in use is version 7 or later (`EXPIRE NX`); if it is older, every limit silently runs per instance |
| LIB-01-F12 | INFORMATIONAL | Yes (legal-text.ts:64-76, 203-204, 272-273 against db.ts:276-321) | Legal wording, not code | NEEDS_OWNER | Have the registered agent confirm the fee list in clause 6 ($330 / $495 and review fees are absent) and the "copy of your documents at any time" and 5 to 7 year wording, given documents are deleted at Done |
| LIB-01-F13 | INFORMATIONAL | Yes (security-watch.ts:18-19, 134-135) | Public payment details kept in code on purpose so a database edit cannot change them | NO_FIX | Not a secret |
| LIB-02-F05 | LOW | Yes (heic-guard.ts:19-33) | Costs one serverless call when staff open one file, which then falls back to the original bytes; treating "no box found" as too large would stop real photos showing | NO_FIX | Bounded harm; the stricter rule breaks real files |
| LIB-02-F06 | LOW | Yes. orphan-sweep-run.ts:51 swallows a bad `file_urls` row, against the file's own header (line 7) | The column is NOT NULL DEFAULT '[]' and only ever written with `JSON.stringify`; deletion is off unless `ORPHAN_UPLOAD_DELETE=true` | FIX_NOW | Throw on an unreadable row so the run deletes nothing. See details 7 |
| LIB-02-F07 | LOW | Yes (sanitise.ts:18, 40) | Part (b) is unreachable today. For (a), a bare "<" in a form answer is rare, and loosening a security filter invites edge cases | NO_FIX | Leave the filter strict |
| LIB-02-F08 | LOW | Yes (validate.ts:21-28) | The form sends a date picker value; only a hand-made POST gets a loose date in, onto the sender's own record | NO_FIX | No harm to anyone else |
| INFRA-01-F07 (image optimizer), INFRA-02-F04 | LOW | Yes. next.config.js:139-145 allows `**.supabase.co` and `**.supabase.in`; no file in `src` imports `next/image` | Fetches public images only, no credentials | FIX_NOW | Empty the remote pattern list. See details 8 |
| LIB-02-F09, INFRA-01-F07 (CSP part), INFRA-02-F03 | INFORMATIONAL / LOW | Yes (next.config.js:18-46; proxy.ts:40, 44) | Defence in depth only; needs an existing script injection; a tighter list can break GA, Facebook signup or the CRM file view | NEEDS_OWNER | Set `CSP_REPORT_ONLY=true` on a Vercel preview, check the reports, then approve promoting the tighter list in config/csp-report-only.js |
| LIB-02-F10 | INFORMATIONAL | Yes | No client component imports these today; the marker can break unit tests that load the modules | NO_FIX | No exposure today |
| INFRA-01-F02, INFRA-02-F01, INFRA-01-F03, INFRA-01-F11 | MEDIUM / LOW / INFORMATIONAL | Yes per the files: 049 header still says "NOT YET RUN ANYWHERE" (049:3); it alone enables RLS on `will_ai_usage` (049:40), revokes anon grants (58-63), pins `search_path` (70-72) and forces the bucket private (76) | The app never ships the anon key and the table holds no TFN, bank or message text | NEEDS_OWNER | After a backup, run 047 and 048 first if they are wanted, then 049 LAST in the Supabase SQL editor, then run its check queries (049:78-94) and keep the output. Running 048 after 049 removes the `search_path` pin again |
| INFRA-01-F04 | LOW | Yes (049:63 is per schema) | No function is planned; today's functions are covered by 049:60 and the check query at 049:85-88 shows any new one | NO_FIX | Hypothetical; rerun the check query after any new function |
| INFRA-01-F05 | LOW | Yes (hand-run migrations, two files numbered 003, three marked not applied) | A one-person project; a ledger tool is process, not a hole | NEEDS_OWNER | Write down which migrations have run on production and in what order (a short list in the repo is enough), in particular 047, 048, 049, 050 |
| INFRA-01-F08, INFRA-02-F02 | LOW | Yes. `NOT_CRM` (next.config.js:112) still matches `/atlas`, so the rule at 155 adds the static policy there | Which header reaches the browser is unknown; if both arrive the stricter one still applies. Two tests pin the pattern text (brand-routing-26oct.test.ts:156, csp-report-only.test.ts:72) | NEEDS_OWNER | Open `/atlas` on production, look at the response headers (Vercel). If a policy with `'unsafe-inline'` in `script-src` is there, change line 112 to `'/((?!crm(?:/|$))(?!atlas(?:/|$)).*)'` and update the two tests |
| INFRA-01-F09 | LOW | Yes. secret-scan.cjs:35 lacks six names used in `src`; `.gitignore` lacks `audit-output/`, `security-assessment/`, `.audit-state` | The folder is not a git repository today and `.vercelignore` already lists them | FIX_NOW | Add the names and the three paths. See details 9 and 10 |
| INFRA-01-F10 | LOW | Yes. generate-llms.mjs:187-188 and `public/llms.txt:21` state the guarantee with no TFN-only limit | The script says the sentence is verbatim from the site and the client agreement; changing it alone makes them disagree | NEEDS_OWNER | Approve TFN-only wording for the Working Holiday Tax guarantee sentence in the AI-crawler files, in English and the five translations (native check), in step with the site text |
| INFRA-01-F12, INFRA-02-F08 | INFORMATIONAL | Yes, as listed | Hygiene points with no shown impact | NO_FIX | None is exploitable |
| INFRA-02-F05 | LOW | Unknown without the database: 046 matches on the bare sentence but removes it only after two line feeds (046:15-27) | The send path strips or bars the guarantee for ABN customers in code (comment 046:6-7; `guaranteeBarredFor`) | NEEDS_OWNER | In Supabase run: `SELECT key FROM will_templates WHERE key = 'price_tfn_abn' AND (body LIKE '%refund the difference%' OR variant_b LIKE '%refund the difference%');` and expect no rows; if a row comes back, edit that Library message |
| INFRA-02-F06 | LOW | Yes. `supabase/RESET_WILL_FRESH_START.sql` still truncates both brands' chats and names the dropped `will_suggestions` (30-38) | Only someone with SQL editor access can run it, and it now fails on the missing table | NEEDS_OWNER | Delete this file or move it to an archive folder; it is your operations script, so your call |
| INFRA-02-F07 | LOW | Yes (next.config.js:51, 53) | `includeSubDomains` breaks any subdomain that is not HTTPS for a year; the old XSS header is harmless | NEEDS_OWNER | Confirm every subdomain of both domains serves HTTPS only; then `includeSubDomains` can be added |

## FIX_NOW details

### 1. API-01-F04 (b): close the SVT form link after use
File: `src/app/api/tax-form/route.ts`

Step A. Remove this existing text (lines 278-282), including the blank line after it:
```
    // The link worked: close it. Only now, so a failed save leaves it usable for a retry.
    if (tokenClaims) {
      await getStore().setSetting(formTokenUsedKey(tokenClaims.nonce), Date.now())
        .catch((e) => console.error('[tax-form] could not mark the form link used:', safeErr(e)))
    }

```
Step B. Existing text (line 243):
```
    // Student Visa Tax. Once the SVT WhatsApp line exists, the form goes
```
Replace with:
```
    // The link worked: close it. Only now, so a failed save leaves it usable for a retry.
    // 18 Nov (audit API-01-F04): above the SVT branches, which return early and left an SVT link open.
    if (tokenClaims) {
      await getStore().setSetting(formTokenUsedKey(tokenClaims.nonce), Date.now())
        .catch((e) => console.error('[tax-form] could not mark the form link used:', safeErr(e)))
    }

    // Student Visa Tax. Once the SVT WhatsApp line exists, the form goes
```

### 2. API-01-F09: kill switch refuses a non-boolean value
File: `src/app/api/will/actions/route.ts`

Existing text:
```
    case 'set_kill_switch':
      await store.setSetting('kill_switch', b.value === true);
```
Replace with:
```
    case 'set_kill_switch':
      // 18 Nov (audit API-01-F09): a missing or malformed value must not release the switch.
      if (typeof b.value !== 'boolean') return bad('value must be true or false');
      await store.setSetting('kill_switch', b.value === true);
```

### 3. API-02-F05: log reads of the task list (TFN and bank details)
File: `src/lib/will/access-log.ts`

Existing: `export type ReadRoute = 'export' | 'media' | 'search' | 'chats' | 'crm_file' | 'leads_csv' | 'clients';`
Replace with: `export type ReadRoute = 'export' | 'media' | 'search' | 'chats' | 'crm_file' | 'leads_csv' | 'clients' | 'tasks';`

Existing:
```
  clients: 5 * 60_000,
};
```
Replace with:
```
  clients: 5 * 60_000,
  tasks: 5 * 60_000,
};
```

Existing: `  clients: ['archived', 'offset', 'limit'],`
Replace with:
```
  clients: ['archived', 'offset', 'limit'],
  tasks: ['offset', 'limit'],
```

File: `src/app/api/crm/tasks/route.ts`

Existing: `import { safeErr } from '@/lib/log-safe'`
Replace with:
```
import { safeErr } from '@/lib/log-safe'
import { recordDataRead } from '@/lib/will/access-log'
```

Existing: `    const { getAllTasks, countTasks } = await import('@/lib/db')`
Replace with:
```
    // 18 Nov (audit API-02-F05): this list carries TFN and bank details. Logged at most once per five minutes per session.
    await recordDataRead(req, 'tasks', { offset, limit })
    const { getAllTasks, countTasks } = await import('@/lib/db')
```

### 4. API-02-F08: WhatsApp connect, digits-only ids and an audit row
File: `src/app/api/will/whatsapp/connect/route.ts`

Existing: `import { metaAppSecret, saveWaCreds } from '@/lib/will/channel';`
Replace with:
```
import { metaAppSecret, saveWaCreds } from '@/lib/will/channel';
import { getStore } from '@/lib/will/store';
```

Existing: `  let phoneId = (body.phoneNumberId || '').trim();`
Replace with:
```
  let phoneId = (body.phoneNumberId || '').trim();
  // 18 Nov (audit API-02-F08): Meta ids are digits only; anything else could point the Graph calls elsewhere.
  if ((wabaId && !/^\d{5,25}$/.test(wabaId)) || (phoneId && !/^\d{5,25}$/.test(phoneId))) {
    return NextResponse.json({ ok: false, error: 'wabaId and phoneNumberId must be digits only' }, { status: 400 });
  }
```

Existing: `  await saveWaCreds(token, phoneId, wabaId);`
Replace with:
```
  await saveWaCreds(token, phoneId, wabaId);
  // The sending number changed: leave a trace (ids only, never the token).
  await getStore().audit('owner', 'whatsapp_credentials_saved', { phoneNumberId: phoneId, wabaId: wabaId ?? null }).catch(() => undefined);
```

### 5. LIB-01-F08: residency correction never touches an SVT task
File: `src/lib/db.ts` (line 362)

Existing: `  return tasks.find((t) => !t.done && t.taskType === 'tax-return' && (t.whatsapp ?? '').replace(/\D/g, '').endsWith(key)) ?? null`
Replace with: `  return tasks.find((t) => !t.done && t.brand !== 'svt' && t.taskType === 'tax-return' && (t.whatsapp ?? '').replace(/\D/g, '').endsWith(key)) ?? null`

### 6. LIB-01-F10: redact the typed question and the replayed history before the model call
File: `src/lib/atlas/ask.ts` (lines 145-146)

Existing: `    ...history,`
Replace with: `    ...(redactForModel(history) as AtlasTurn[]),`

Existing: `\n\nQUESTION:\n${question}` }`
Replace with: `\n\nQUESTION:\n${String(redactForModel(question))}` }`

### 7. LIB-02-F06: orphan sweep stops on an unreadable row
File: `src/lib/orphan-sweep-run.ts` (line 51)

Existing: `catch { /* unreadable row: its files stay protected only if a URL parses; see below */ }`
Replace with: `catch { throw new Error('unreadable file_urls row') /* 18 Nov (audit LIB-02-F06): stop, delete nothing */ }`

### 8. INFRA-01-F07, INFRA-02-F04: image optimizer fetches no remote host
File: `next.config.js` (lines 140-143)

Existing:
```
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.supabase.in' },
    ],
```
Replace with:
```
    // 18 Nov (audit): no page uses next/image, so the optimizer fetches no remote host.
    remotePatterns: [],
```

### 9. INFRA-01-F09: secret scanner knows the newer secret names
File: `scripts/lib/secret-scan.cjs` (line 35)

Existing: `|REDIS_URL|KV_URL)\b["']?\s*[:=]\s*["']?([A-Za-z0-9+/_=.-]{20,})/],`
Replace with: `|REDIS_URL|KV_URL|FIELD_ENC_KEYS|FIELD_INDEX_KEY|FORM_TOKEN_SECRET|ANTHROPIC_ADMIN_API_KEY|WA_ACCESS_TOKEN|WHATSAPP_WEBHOOK_VERIFY_TOKEN)\b["']?\s*[:=]\s*["']?(?:[A-Za-z0-9_-]{1,16}:)?([A-Za-z0-9+/_=.-]{20,})/],`

(The optional `name:` part lets the rule see a `FIELD_ENC_KEYS` value written as `kid:key`. Checked by search: the only line in `src`, `scripts`, `config`, `__tests__` and `e2e` the wider rule newly matches is a test value starting with "synthetic", which the placeholder list already ignores.)

### 10. INFRA-01-F09: .gitignore
File: `.gitignore` (last two lines)

Existing:
```
*.key
.vercel/
```
Replace with:
```
*.key
.vercel/

# Audit output and tool state (already in .vercelignore)
audit-output/
security-assessment/
.audit-state
```
