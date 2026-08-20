# Working Holiday Tax — CRM + "Will" WhatsApp Assistant — Project Handoff

> Hand this document to a new Claude session to continue seamlessly. It captures the goal,
> the architecture, everything built, and — most importantly — the exact current state of the
> WhatsApp connection problem and the decision that is pending.

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
2. **Learn CONTENT, never the owner's phrasing/tone/impatience.** The knowledge base was mined from
   real conversations for *what* customers ask, never *how* the owner writes.
3. **Payment-on-word is kept by business choice** (WILL-PAY-01). Will can mark a payment PAID on the
   customer's word. The owner explicitly keeps this — do not "fix" it.
4. **No price negotiation.** Fixed fees: **$220 (TFN)** / **$385 (TFN+ABN)**. Never invent/change price.
5. **No personal tax/residency determinations.** Will gives general framing and hands off specifics.
6. **100% English** in all code, site content, and filenames.

---

## 3. Architecture (key files under `src/lib/will/` unless noted)

- `playbook.ts` — the model's system prompt: approved messages, objection matching, operating rules,
  the myGov hard boundary, RAG `sanitizeReference()` + `<reference>` DATA fence, and **rule 15:
  greet a new customer by first name** when a WhatsApp profile name is present.
- `policy-guard.ts` — deterministic safety layer between model output and the customer. Catches
  `MYGOV_TROUBLESHOOTING`, `TAX_DETERMINATION`, `REFUND_PROMISE`, fail-closed English check, etc.
- `channel.ts` — **outbound layer.** `sendWhatsAppText` (Graph API), `deliverOut` (outbox pattern:
  QUEUED → send → SENT/FAILED + human task on failure), `verifyChannel` (real Meta check for the
  health dot), and **`resolveWaCreds` / `saveWaCreds`** (NEW — runtime credentials stored in the DB
  so the channel can go live WITHOUT a redeploy; stored creds win over env vars).
- `service.ts` — engine: `handleIncoming`, income inference, AI budget cap.
- `store.ts` / `store-file.ts` (dev JSON) / `store-supabase.ts` (prod) — data layer behind `getStore()`.
- `state-machine.ts` — customer pipeline states.
- `src/app/api/will/webhook/route.ts` — **public inbound webhook.** HMAC-verified, idempotent, phone-id
  filtered, rate-limited. NEW: `WILL_MIN_MESSAGE_TS` timestamp cutoff + `isBlockedContact` returning-
  customer filter (fresh-start feature).
- `src/app/api/will/health/route.ts` — status dots; now calls `verifyChannel` for a truthful WhatsApp state.
- `src/app/api/will/whatsapp/connect/route.ts` — **NEW** server endpoint: exchanges an Embedded Signup
  code for a token (or accepts a manually pasted token), verifies it against Meta, saves via `saveWaCreds`.
- `src/app/crm/whatsapp/connect/page.tsx` — **NEW** "Connect WhatsApp" UI: Facebook Embedded Signup
  button + manual token-paste fallback.
- `src/components/will/Dashboard.tsx` — the CRM dashboard UI.

Supabase migrations under `supabase/migrations/`. The ad-hoc reset script is `supabase/RESET_WILL_FRESH_START.sql`.

---

## 4. Everything built/changed in THIS session (most recent work)

UI / UX (all in `Dashboard.tsx` + `src/app/crm/whatsapp/will-scoped.css`):
- **Phone number only, no names** in the chat list/pipeline/drawer (owner's request). Formatted exactly
  like WhatsApp via **libphonenumber-js** (`+44 7851 436936`). Number rendered at normal weight (not bold).
- **WhatsApp-style unread badges** — green pill with unread count, resets to 0 when the chat is opened
  (`markCustomerRead` + `mark_read` action). Data: `unread_count` column (migration 025).
- **Most-recent-first ordering** — chat list bumps to top on ANY message in/out, via a `last_message_at`
  column (migration 026).
- **Default grey WhatsApp-style avatar** for everyone (Meta's Cloud API does NOT expose customer profile
  photos — privacy — so a silhouette is correct).
- **First-outreach greeting by first name** (playbook rule 15).
- **Inbound delay reduced** — dashboard poll 8s → 3s.
- **Truthful WhatsApp health indicator** — the header pill actually calls Meta (`verifyChannel`) and shows
  🟢 Connected / 🔴 NOT WORKING / 🟠 TEST MODE; the not-live states link to `/crm/whatsapp/connect`.

Fresh-start feature (owner wants ONLY brand-new customers in Will, none of the coexistence history sync):
- `WILL_MIN_MESSAGE_TS` env var — webhook drops inbound messages older than this Unix timestamp.
  Value for **2026-08-20 11:00 AEST = `1787187600`** (Perth/AWST = `1787194800`).
- `will_known_contacts` table (migration 027) + `isBlockedContact` — returning/pre-existing contacts are
  dropped so only 100% new numbers enter. `RESET_WILL_FRESH_START.sql` seeds the current contacts into
  that table then wipes customers/messages/tasks (keeps templates/knowledge/settings).

WhatsApp connection (the big one):
- **Embedded Signup** page + endpoint (see §3) so a working token can be obtained via Facebook login
  (no SMS, no Business Settings) and saved to the DB with no redeploy. Manual token paste as fallback.
- **CSP / COOP opened for Facebook** in `next.config.js` and `src/middleware.ts`: added
  `connect.facebook.net` (script-src), `graph.facebook.com`/`www.facebook.com` (connect-src),
  `www.facebook.com`/`web.facebook.com`/`staticxx.facebook.com` (frame-src), and changed
  `Cross-Origin-Opener-Policy` to `same-origin-allow-popups` (so the FB login popup can post back).

Tests: **180 passing** (`npx jest`), typecheck clean (`npx tsc --noEmit`).

---

## 5. WhatsApp connection — the full diagnosis and CURRENT STATE (read carefully)

**Inbound WORKS.** Real customer messages arrive in Will (and on the owner's phone). Inbound needs
only `META_APP_SECRET` + `META_VERIFY_TOKEN` (both set) — NOT the access token. The number is in
**Coexistence** (app + API on the same number), which is why history synced and messages appear in both places.

**Outbound is BROKEN** because there is no valid access token that can send from the real number. The
saga, in order, all dead ends:
1. Env `WHATSAPP_PHONE_NUMBER_ID = 448522015011534` is (almost certainly) the REAL number's phone-id —
   it's the id inbound arrives on. But every token tried gets `#100 / subcode 33: object does not exist
   or missing permissions` on it → the token lacks access to that number's WABA.
2. **System User / permanent token** (business.facebook.com) — BLOCKED: the owner's Meta **2FA SMS never
   arrives** (broken ~3 months, Meta support unhelpful). Business Settings is unreachable.
3. **Graph API Explorer** token (developers.facebook.com works without SMS) — succeeds and has
   `whatsapp_business_management` + `whatsapp_business_messaging`, BUT its granular scope only covers WABA
   **`1491962078972625`**, which contains only a **Meta TEST number** (`+1 555-639-6212`, phone-id
   `1137884819403971`). It does NOT reach the real +61 number's WABA. `business_management` permission
   could not be added in the Explorer.
4. **Embedded Signup** (our new page) — the FB popup works (great!), but the flow only offers to *create a
   new* WhatsApp Business account and does NOT surface the existing real +61 number. The phone-number step
   offers only: "Use a display name only" (a generated virtual number — owner rejected, their +61 is their
   identity) or "Add a new number" (fresh registration of +61 424 513 998 with SMS/phone-call verification).
   **"Add a new number" would MIGRATE the number to Cloud API and LOG IT OUT of the WhatsApp app on the
   phone** — the owner must NOT do this. They stopped at that screen. A Meta error also appeared mid-flow:
   `1758841241948701 isn't a valid Business ID`.

**Conclusion:** every self-serve path to make the REAL +61 number send is blocked by Meta ACCOUNT-level
issues (broken 2FA, "invalid Business ID", coexistence number not surfaced). This is NOT a code problem —
Will is 100% ready. The only safe self-serve outbound option (display-name-only virtual number) is
unacceptable to the owner because they must send from their real number.

Key IDs discovered:
- App ID: `1388978866435944` ("Working Holiday Tax")
- Business (portfolio) ID: `1758841241948701`
- Embedded Signup config ID: `1723636208969628`
- Real number: **+61 424 513 998**, env phone-number-id `448522015011534`
- Test WABA `1491962078972625` → test number `+1 555-639-6212` (phone-id `1137884819403971`)

---

## 6. The pending DECISION (this is where the conversation left off)

To send from the REAL +61 number without losing the phone app, the two realistic paths are:

- **A. Official BSP that supports Coexistence** (e.g. 360dialog, Wati, Twilio). They connect the existing
  +61 number from their verified infrastructure — number stays on the phone AND Will can send from it.
  Onboarding is via Facebook login (which works for the owner), not the blocked SMS path. ~US$30–50/mo.
  This is the recommended real fix. NOTE: still requires the owner's Meta business to cooperate; a BSP
  is best positioned to work around the account issues.
- **B. Interim, zero-risk, works today:** Will drafts every reply (inbound already works); the owner
  sends from their phone (real number). Not automated, but the business keeps running with no risk.

Owner's constraints to respect: **the +61 number is critical and must stay on the phone**; **do not
trigger any SMS/verification that migrates or disconnects it**; no unofficial hacks (Meta-approved only).

Suggested next step for the new session: help the owner pick/connect a BSP (path A) while running path B
in the meantime. If the owner ever gets a working token by any route, the app is ready — just paste it at
`/crm/whatsapp/connect` (Option 2) or complete Embedded Signup; it saves to the DB and goes live instantly.

---

## 7. Deploy / operate checklist

1. Deploy the code (zip → Vercel, or push to the connected GitHub repo).
2. Run the new Supabase migrations in order: **025_will_unread_count**, **026_will_last_message_at**,
   **027_will_known_contacts** (SQL Editor).
3. (Optional, owner's fresh-start request) run `supabase/RESET_WILL_FRESH_START.sql` to wipe current
   Will data and remember existing contacts as "returning" so only new customers enter. Then set env
   `WILL_MIN_MESSAGE_TS = 1787187600` (AEST 11:00 on 2026-08-20) and redeploy.
4. WhatsApp outbound: unresolved — see §5/§6.

### Environment variables
- `META_APP_SECRET` (a.k.a. `WHATSAPP_APP_SECRET`) — set ✅ (inbound works)
- `META_VERIFY_TOKEN` (a.k.a. `WHATSAPP_WEBHOOK_VERIFY_TOKEN`) — set ✅
- `WHATSAPP_PHONE_NUMBER_ID` = `448522015011534` — set (likely correct id, no working token yet)
- `WHATSAPP_TOKEN` (a.k.a. `WHATSAPP_ACCESS_TOKEN`) — the missing piece (no valid token yet)
- `WILL_MIN_MESSAGE_TS` — optional fresh-start cutoff
- `META_APP_ID` / `NEXT_PUBLIC_META_APP_ID` — optional; code defaults to `1388978866435944`
- `NEXT_PUBLIC_META_EMBEDDED_CONFIG_ID` — optional; defaults to `1723636208969628`
- `CRON_SECRET` — required in prod for the scheduler cron
- Supabase URL/keys, `ANTHROPIC_API_KEY` (Will's brain; falls back to mock without it)

Runtime credentials (`wa_access_token`, `wa_phone_number_id`, `wa_waba_id`) saved via the Connect flow live
in `will_settings` and OVERRIDE the env vars — so a good token can be dropped in with no redeploy.

### One-time Meta app setup for Embedded Signup (developers.facebook.com — not SMS-blocked)
- App Settings → Basic → App Domains: `workingholidaytax.com.au`
- Facebook Login for Business → Settings → "Login with the JavaScript SDK" = Yes; "Allowed Domains for
  the JavaScript SDK": `https://workingholidaytax.com.au/` (already done by the owner).

---

## 8. Verification
- `npx tsc --noEmit` → clean.
- `npx jest` → 180 passing.
- Build note: Google Fonts are fetched at build time by `next/font/google`; in a sandbox without network
  to Google, temp-stub the fonts to build, then restore. On Vercel it builds normally.
