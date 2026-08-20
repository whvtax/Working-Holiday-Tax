# Working Holiday Tax — CRM + "Will" WhatsApp Assistant — Project Handoff

> Supersedes `PROJECT_HANDOFF_OLD_SUPERSEDED.md` (2026-08-20, morning). That document's diagnosis of
> the WhatsApp problem was **wrong in its central claim**, and acting on it cost months. This version
> records what was verified directly in Meta's own console, screen by screen.
>
> Read §5 before touching anything WhatsApp-related.

---

## 1. What this is

A production CRM for **Working Holiday Tax** (workingholidaytax.com.au), an Australian tax-refund
service for Working Holiday Visa backpackers. Stack: **Next.js 14 (App Router) + React 18 +
Supabase (Postgres) + Tailwind + Vercel**.

Inside the CRM lives **"Will"** — an AI WhatsApp assistant that reads incoming customer WhatsApp
messages, drafts replies, and (once outbound is connected) sends them. Two modes:
- **Approval (SUPERVISED)** — Will drafts every reply, the owner approves/sends. *Currently active.*
- **Autopilot (FULL_AUTO)** — Will sends on its own, escalating anything unclear.

The owner is **Jo** (Hebrew speaker; talk to them in Hebrew, but ALL code/site/filenames must be
**English only** — this is a hard rule they enforce).

---

## 2. Hard business rules (never break these)

1. **myGov / ATO / Digital ID / IHI never answered.** Will must NEVER answer, troubleshoot, or give
   step-by-step help on myGov login, ATO login, myGovID/Digital ID, IHI, account linking, or exemption
   form errors. It may ONLY give the reassurance "you don't need myGov, we handle everything with the
   ATO directly and your refund goes to your bank." Anything deeper → human handoff. This is the
   owner's single biggest pain point.
2. **Learn CONTENT, never the owner's phrasing/tone/impatience.**
3. **Payment-on-word is kept by business choice** (WILL-PAY-01). Do not "fix" it.
4. **No price negotiation.** Fixed fees: **$220 (TFN)** / **$385 (TFN+ABN)**.
5. **No personal tax/residency determinations.**
6. **100% English** in all code, site content, and filenames.
7. **The +61 number must never leave the phone.** Never click "Add phone number" / "Add new number"
   in WhatsApp Manager or the app dashboard. Never complete a flow that asks to verify
   +61 424 513 998 by SMS or voice call. That is the flow that migrates the number off the
   WhatsApp Business app.

---

## 3. Architecture (key files under `src/lib/will/` unless noted)

- `playbook.ts` — the model's system prompt: approved messages, objection matching, operating rules,
  the myGov hard boundary, RAG `sanitizeReference()` + `<reference>` DATA fence, rule 15 (greet a new
  customer by first name).
- `policy-guard.ts` — deterministic safety layer between model output and the customer.
- `channel.ts` — **outbound layer.** `sendWhatsAppText` (Graph API), `deliverOut` (outbox pattern),
  `verifyChannel` (real Meta check for the health dot), `resolveWaCreds` / `saveWaCreds` (runtime
  credentials in the DB; stored values beat env vars, so the channel can go live with no redeploy).
- `service.ts` — engine: `handleIncoming`, income inference, AI budget cap.
- `store.ts` / `store-file.ts` (dev) / `store-supabase.ts` (prod) — data layer behind `getStore()`.
- `state-machine.ts` — customer pipeline states.
- `src/app/api/will/webhook/route.ts` — **public inbound webhook.** HMAC-verified, idempotent,
  phone-id filtered, rate-limited, timestamp cutoff, returning-contact filter. Now also writes an
  `inbound_received` audit line before any filter runs (see §7).
- `src/app/api/will/whatsapp/connect/route.ts` — exchanges an Embedded Signup code for a token, or
  accepts a pasted token; verifies against Meta; saves via `saveWaCreds`.
- `src/app/crm/whatsapp/connect/page.tsx` — "Connect WhatsApp" UI.
- `src/app/api/will/whatsapp/inbound-check/route.ts` + `src/app/crm/whatsapp/inbound-check/page.tsx`
  — **NEW.** "Why didn't that message arrive?" diagnostics (see §7).
- `src/components/will/Dashboard.tsx` — the CRM dashboard UI.

Supabase migrations under `supabase/migrations/`. Reset script: `supabase/RESET_WILL_FRESH_START.sql`.

---

## 4. VERIFIED Meta account facts

Every line below was read directly off Meta's console. Treat these as facts, not assumptions —
the previous handoff's assumptions are what cost the time.

| Thing | Value | Verified how |
|---|---|---|
| Real number | **+61 424 513 998** | WhatsApp Manager → Phone numbers |
| Status / quality | **Connected**, quality **High**, display name verified ✓ | same screen |
| **Phone number ID** | **`448522015011534`** | number detail panel — matches `WHATSAPP_PHONE_NUMBER_ID` |
| **WABA (the live one)** | **`445188805337133`** | URL `asset_id=` + WABA switcher |
| WABA type | **"WhatsApp Business app"** (coexistence) | label under the WABA name |
| Business portfolio | `1758841241948701` — **Verified**, **Approved** | Business Settings → Summary |
| Meta app | **`1388978866435944`** "Working Holiday Tax" — the only **Live** app | My Apps |
| System user | **"API Bot"** — **Full access ("Everything")** on WABA `445188805337133` | WABA → People |
| Payment method | **None** — "No payment method found" | WABA → Summary |

### The five WABAs (this is the trap)

The business owns **five** WhatsApp Business Accounts, four of them named almost identically:

| WABA ID | Name | Contents |
|---|---|---|
| **`445188805337133`** | Working Holiday Tax | **the real +61 number** ← the only one that matters |
| `2118932992305299` | Working Holiday Tax | empty |
| `1593641829093167` | Working Holiday Tax | not inspected |
| `1040708112050005` | Q | not inspected |
| `1491962078972625` | Test WhatsApp Business Account | Meta test number +1 555-639-6212 |

A token scoped to `1491962078972625` returns `#100 subcode 33 "object does not exist or missing
permissions"` when used against the real number. **That error was read as a permissions problem for
months. It was the wrong WABA.**

There were also **ten near-identically named Meta apps** ("WHT Signup App" ×3, "WHT Will Assistant"
×5, "Working Holiday Tax" ×2). Only `1388978866435944` is Live and linked to the business portfolio.
The Graph API Explorer dropdown showed the duplicates with identical labels and no IDs, so tokens
were repeatedly generated from the wrong app with no way to tell. Jo has since cleared the extras;
confirm only one app remains before generating any token.

---

## 5. WhatsApp connection — actual state

**Inbound: was working, currently NOT delivering into Will.** A real customer message on
2026-08-20 23:46 AEST reached the phone but never appeared in the CRM. Undiagnosed at handoff time —
use `/crm/whatsapp/inbound-check` (§7), which was built for exactly this and will name the cause.
Inbound needs only `META_APP_SECRET` + `META_VERIFY_TOKEN`; it does **not** use the access token.

**Outbound: blocked, by exactly two things.**

1. **No access token.** The "API Bot" system user already has full access to the correct WABA —
   nothing needs to be created or granted. Generating its token requires Meta 2FA re-auth, and
   **the SMS code never arrives** on +61 424 513 998. Confirmed: the code is sent to the correct
   number (`+*********98`), "Try another way" offers **SMS only** — no authenticator app, no recovery
   codes, no device approval. Every action under Business Settings → **Users** sits behind this wall,
   including adding a second admin. The daily code limit was exhausted on 2026-08-20.
2. **No payment method on the WABA.** Meta will not send without one. A valid token alone is
   **not** sufficient — expect this to bite immediately after the token problem is solved.

### What the previous handoff got wrong

For the record, so nobody re-walks it:
- It claimed every self-serve path was blocked by Meta account-level problems and recommended paying
  a BSP ~US$30–50/mo. In fact business verification was already **green**, the number was already
  **Connected**, and a fully-privileged system user already existed.
- It never identified WABA `445188805337133`. That single missing ID is the whole story.
- `1758841241948701 isn't a valid Business ID` was noise, not a signal.
- It assumed one Meta app existed. Ten did.

### The remaining blocker, precisely

**SMS delivery to +61 424 513 998.** Not Meta, not permissions, not code. Open questions worth
answering before anything else:
- Is the Australian SIM active and in a device right now? WhatsApp keeps working indefinitely once
  registered, even if the SIM is long dead — so a "working" WhatsApp number proves nothing about SMS.
- Is the line roaming outside Australia? A2P/shortcode messages frequently do not deliver on roaming.
- Does the phone receive any other SMS? Check spam/blocked-sender folders.

Decisive one-minute test: have someone send an ordinary SMS to the number.

### Routes forward, in order of cost

1. **Fix SMS delivery** (carrier/handset). Unblocks everything at once.
2. **Meta Business Support live chat** — `business.facebook.com/business-support-home`. Available
   because the business is Verified; account-access issues are in scope.
3. **Second business admin** — blocked today (adding people is behind the same 2FA wall), but works
   the moment 2FA clears once.
4. **Official BSP supporting coexistence** (360dialog / Wati / Twilio) — last resort, ~US$30–50/mo.

Meanwhile Will drafts every reply and Jo sends from the phone. Zero risk, business keeps running.

---

## 6. Bugs fixed in this session

**1. Embedded Signup asked Meta for the wrong flow.**
`connect/page.tsx` sent `featureType: ''`. Empty means Meta's default — "create a new WhatsApp
Business account" — which is why the flow only ever offered a virtual number or a fresh registration
and never surfaced the existing +61. Coexistence requires
`featureType: 'whatsapp_business_app_onboarding'`, where the number **stays on the phone** and the
confirmation code arrives **inside WhatsApp, not by SMS**. The page now has two clearly separated
buttons (coexistence / standard) and an explicit warning to stop if SMS verification appears.
Caveat: Meta documents coexistence onboarding as requiring Solution Partner or Tech Provider status,
so it may still be refused. Untested — it was never reachable before.

**2. A documented env var the code never read.**
`.env.example` said `NEXT_PUBLIC_META_CONFIG_ID`; the code read only
`NEXT_PUBLIC_META_EMBEDDED_CONFIG_ID`. Setting the documented name in Vercel did nothing at all and
fell through to a hardcoded default, silently. Both names are accepted now.

**3. The webhook and the sender disagreed about which number we are.** *(the dangerous one)*
Outbound resolved the phone number id via `resolveWaCreds()` — **DB first**, env second. The webhook
read `waPhoneNumberId()` — **env only**. So connecting successfully through the Connect page would
switch sending to the stored id while inbound kept matching the stale env id, discarding every
incoming message with no error anywhere. This would have fired at the exact moment the connection
finally appeared to succeed. Both directions now resolve identically; regression test added
(`webhook.test.ts` → "honours a phone number id stored in the DB over the env var").

Also: `WHATSAPP_GRAPH_VERSION` default raised `v21.0` → `v23.0`, and `.env.example` now documents the
verified IDs above plus the three variables (`WHATSAPP_WABA_ID`, `WA_HEALTH_ALERTS_DISABLED`,
`NEXT_PUBLIC_SITE_URL`) that **no code path reads** — they were quietly misleading.

---

## 7. NEW: inbound diagnostics — `/crm/whatsapp/inbound-check`

Inbound drops messages in five places on purpose, and all five look identical from the CRM (nothing
appears): bad signature → 401 before parsing; phone-number-id mismatch; the `WILL_MIN_MESSAGE_TS`
cutoff; the returning-contact list; the flood limits. This page names the one that fired.

It reports resolved config (which phone id is in use and whether it came from the DB or the env),
whether `will_known_contacts` actually exists — **if migration 027 never ran, `isBlockedContact`
throws on every message, the webhook releases the claim, and inbound dies while everything else looks
healthy** — whether the cutoff is accidentally set in the future, and the recent inbound audit trail.
It takes an optional `?number=` to answer "is this specific person on the blocked list?".

Backing it, the webhook now records:
- `inbound_received` — before any filter, with **WABA id**, phone number id, display number, message
  count, types, masked senders, timestamps, whether it was a history sync or statuses-only, and
  whether the phone id matched ours.
- `inbound_signature_rejected` — throttled to once a minute (public endpoint; unthrottled writes
  would be an amplification vector). A wrong `META_APP_SECRET` previously left **no trace at all**.

**First thing to do on the next session:** open that page. It will answer the 23:46 question.

---

## 8. Deploy / operate checklist

1. Deploy the code (zip → Vercel, or push to the connected GitHub repo).
2. Run migrations in order: **025_will_unread_count**, **026_will_last_message_at**,
   **027_will_known_contacts**. 027 is not optional — see §7.
3. Optional fresh start: `supabase/RESET_WILL_FRESH_START.sql`, then set
   `WILL_MIN_MESSAGE_TS = 1787187600` (2026-08-20 11:00 AEST) and redeploy.
   ⚠️ That script marks **every contact currently in Will** as "returning", including everyone the
   coexistence history sync imported. Someone Jo considers a brand-new customer can be silently
   dropped by it. `/crm/whatsapp/inbound-check?number=…` confirms; the fix is deleting that one row
   from `will_known_contacts`.
4. WhatsApp outbound: see §5.

### Environment variables

- `META_APP_SECRET` — set ✅ (must match app `1388978866435944`)
- `META_VERIFY_TOKEN` — set ✅
- `WHATSAPP_PHONE_NUMBER_ID` = `448522015011534` — **confirmed correct** ✅
- `WHATSAPP_TOKEN` — **missing, blocked on SMS 2FA** (§5)
- `WILL_MIN_MESSAGE_TS` — optional fresh-start cutoff
- `META_APP_ID` / `NEXT_PUBLIC_META_APP_ID` — optional; defaults to `1388978866435944`
- `NEXT_PUBLIC_META_CONFIG_ID` *or* `NEXT_PUBLIC_META_EMBEDDED_CONFIG_ID` — either works now
- `WHATSAPP_GRAPH_VERSION` — optional; defaults to `v23.0`
- `CRON_SECRET` — **required in prod**, or the scheduler cron 401s and every follow-up stops silently
- Supabase URL/keys, `REDIS_URL`/`KV_URL`, `RESEND_API_KEY`, `ANTHROPIC_API_KEY`

Runtime credentials (`wa_access_token`, `wa_phone_number_id`, `wa_waba_id`) saved via the Connect
flow live in `will_settings` and **override** the env vars — a good token goes live with no redeploy.

---

## 9. Verification

- `npx tsc --noEmit` → clean.
- `npx jest` → **181 passing** (was 180; +1 regression test for bug 3).
- `npx next lint` → one pre-existing warning in `Dashboard.tsx` (unrelated).
- Build note: `next/font/google` fetches at build time; in a sandbox without network to Google,
  temp-stub the fonts to build, then restore. On Vercel it builds normally.

---

## 10. Suggested first moves for the next session

1. Open `/crm/whatsapp/inbound-check`. Inbound is the only problem costing money right now —
   customers are writing and Jo cannot see them.
2. Ask whether the Australian SIM is active and in a device, and whether it is roaming. That one
   answer probably explains three months of missing SMS.
3. Do not touch "Add phone number" anywhere, and do not delete WABAs or apps.
4. The payment method on WABA `445188805337133` still needs adding before any send will work.
