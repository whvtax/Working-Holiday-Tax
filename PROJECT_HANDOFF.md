# Working Holiday Tax: Project Handoff

Last updated: 23 October 2026. This replaces every earlier handoff, audit report and
changelog that used to sit in the repository root (they described the system as it was in
August and are now misleading). Read this first.

---

## 1. What this is

One Next.js app serving two things:

1. **The public website** workingholidaytax.com.au, in English, German and Japanese:
   service pages, the tax calculator, four intake forms, the job-expenses pages and about
   150 guides per language.
2. **The CRM** at `/crm`, with **Will**, the AI WhatsApp assistant that answers customers,
   moves them through the pipeline, chases follow-ups and hands anything unclear to the team.

The owner is **Jo**. Talk to him in Hebrew. Everything in the code, the site and file names
is **English only** (his rule).

### Stack

| Part | What |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript, Tailwind 3 |
| Data | Supabase (Postgres). `lib/will/store-supabase.ts` in production, `store-file.ts` (`.data/store.json`) in local dev |
| AI | Anthropic API. Will's decisions, vision on attachments, the second check, Library mining |
| WhatsApp | Meta Cloud API (coexistence with the WhatsApp Business app), webhook at `/api/will/webhook` |
| Hosting | Vercel, region `syd1`. Cron `/api/will/tick` every 5 minutes (`vercel.json`) |
| Rate limits | Redis (`REDIS_URL` / `KV_URL`), in-memory fallback per instance |

---

## 2. Hard business rules (never break these)

1. **Never answer myGov / ATO login / Digital ID / IHI questions.** Only the reassurance
   "you don't need myGov, we handle everything with the ATO directly". Anything deeper goes
   to a person.
2. **The business is never described as a tax agent.** Only the approved sentence:
   "Reviewed and signed off by a registered tax agent before it is lodged with the ATO."
3. **No refund figure and no personal tax determination before payment** (residency,
   Medicare, deductions). The one exception is the residency check in the chat (section 5),
   which Jo approved word for word.
4. **Fixed fees, no negotiation:** $220 TFN, $385 TFN + ABN. With foreign income to report:
   $330 / $495.
5. **The guarantee** ("If your tax refund is less than our fee, we'll refund the difference.
   If there's no refund, our full fee applies.") is for **TFN-only** returns. Never with ABN
   income, never with foreign income, never on a review of a return already lodged.
6. **"Are you a bot?"** is never answered, not even as a draft. It goes to Jo.
7. **Payment on the customer's word is kept on purpose.** A customer saying they paid, or a
   receipt screenshot showing our fee to our account, moves them to Paid.
8. **The +61 number must never leave the phone.** Never start a flow in WhatsApp Manager that
   re-verifies +61 424 513 998 by SMS or call.
9. **Learn content, never Jo's phrasing or tone.**

---

## 3. Will: how a message is handled

### Modes and switches (top of the CRM)

- **Approval / Autopilot**: Approval drafts everything for Jo. Autopilot sends. Live: Autopilot.
- **Decides: Rules / Will** (setting `decision_mode`, default **will**, `lib/will/will-decides.ts`):
  - **Will**: every message reaches the model. It reads the whole chat and decides. When an
    approved message is the right answer it names it (`approved_key`) and the code sends
    Jo's exact wording in the customer's language.
  - **Rules**: the older behaviour, where about ten keyword shortcuts answer some messages
    before the model sees them. Kept as a one-click fallback.
- **Pause Will** (kill switch), the per-chat **Will Active** toggle, and opt-out ("stop").

### The path of a text message (`lib/will/service.ts`, `engine.ts`)

1. Webhook (HMAC-verified, idempotent) stores the message and detects the language.
2. Pre-checks: opt-out, "are you a bot", the runaway guard (25 messages before payment),
   reopening a closed customer, and "I'll do it on Wednesday" (pauses reminders to that date).
3. Urgent messages (the customer chose a track, or asks what name to put on the transfer)
   go to Will at once. Everything else arms a 1 to 5 minute timer, reset by every new
   message, so Will answers the whole burst once.
4. When the timer fires: skipped if a newer message superseded it, if Jo already answered,
   or (for anything but a plain thank-you) if a person on the team wrote in the last 30
   minutes. In that last case it is re-armed for when the 30 minutes are up.
5. **The engine** builds the prompt: the playbook (all of Jo's rules), the approved messages,
   relevant Library answers, a one-line backstory of the customer, and the last 60 turns.
   Will returns reply / wait / human_task, an optional new stage, and an optional
   `approved_key`.
6. **Code corrections after the model**: no move to Paid without a payment report; the
   guarantee is removed where it does not apply; bank details are not repeated unasked;
   English price messages are pasted verbatim; no bank details before any exchange;
   "Payment received" is always the fixed text; replies that are too long are rewritten.
   - **Pricing rules held in code**, whatever Will picks: any ABN income gets the TFN + ABN
     price; freelance / UGC / side income is never priced as TFN, it becomes a task.
7. **Policy Guard** (`policy-guard.ts`): the deterministic hard rules. A blocked reply becomes
   a safe stand-in line, the approved price message, or a task.
8. **The second check** (`reviewer.ts`, Will mode only): a reply Will wrote himself is read
   against the rules before it leaves. "revise" uses the better text if it still passes the
   guard. "hold" makes Will write it once more; held twice becomes a task. Jo's exact wording
   is not reviewed. Fail-open. `WILL_REVIEWER=off` disables it.
9. **Sending** (`channel.ts`): free text inside the 24-hour window; a Meta template outside
   it. For a missing translation the code tries `<name>` + language and `<name>_<lang>`, and
   inside the window sends the localized text rather than the English template.

### Attachments

- **Before payment**: the vision check reads amount, recipient and status. Our fee to our
  account confirms the payment; the confirmation goes out after the usual delay with the
  form link. More screenshots of the same payment within 15 minutes are absorbed.
- **After payment**: one small "collect the files" task with a count. In Will mode Will
  answers the batch once (an acknowledgement, or the question sent with it). A myGov
  "success" screenshot opens no task.
- **Anything else**: described by vision and answered in context.

### Tasks (the Decision Log)

Everything Will does not close becomes a task with a reason, an explanation
(`handoff-reasons.ts`) and a draft reply. Every reason string the code writes must have a
rule there; a test enforces it.

---

## 4. The scheduler (`lib/will/scheduler.ts`, `/api/will/tick`)

- **Follow-ups**: before payment 24h / 3d / 7d; form 6h / 3d / 7d; signature 24h / 3d / 7d.
  Quiet hours apply. `FOLLOWUP_MODE` must stay unset in production (real timing).
- **After the form**: questionnaire acknowledgement, the ABN questions, the Medicare
  exemption message, and the residency check (UK / Germany / Japan + Working Holiday Maker).
- **Handoffs**: holding line, a 24h bump, a 48h apology.
- **After lodgement**: refund check-in, Google review request, referral line.
- **Nightly**: auto-close cold leads, audit retention, Library suggestions mined from the
  day's conversations (Learning tab), lost-lead analysis.

---

## 5. Flows added in October 2026

| Flow | Where | What |
|---|---|---|
| Residency check in the chat | `residency-quiz.ts` | A question or doubt after the residency check starts the form's five Yes/No questions, one at a time, for the tax year being lodged. 4+ Yes: "fill out the questionnaire again with the correct details" + a task. Fewer: "you're a Working Holiday Maker, the team will take it from here". |
| "I'll do it after work" | `later-plan.ts` | One line by stage: the form link, or "send a screenshot once it's done". |
| "When is there no refund?" | `i18n.ts` (`NO_REFUND_CASES_MSG`), Library `obj_15` | A general answer about our guarantee's wording. |
| Thank-you in their language | `text-normalize.ts` | Never for a first message; a goodbye ("going elsewhere") goes to Will. |
| ABN = no guarantee | `abn-income.ts`, migration 046 | |
| Mixed income | `instant-choice.ts`, playbook | TFN + freelance / UGC / side work is not a clear choice: Will asks how they were paid. |
| One payment, one confirmation | `payment-confirmation.ts` | A confirmation is recognised by its flags or first line in any language; the queued one, the typed-"I paid" route and Will's own draft all skip it if one already went (23 Oct: two "Zahlung erhalten" five minutes apart). |
| Review link | `will-decides.ts` (`review_link`) | "Is there a link to leave a review?" gets thanks and the Google link; the scheduled review ask is not sent on top. |
| Short paragraphs | `layout.ts`, playbook | After the guard passes a reply, a long block of Will's own prose is split at sentence ends into short paragraphs (2 to 3 sentences; 1 to 2 in Japanese). Words never change; Jo's approved wording, lists and bank lines are left as laid out. |
| Couples | `approved-messages.ts` (`o16_couple`, Library `obj_16`), `will-decides.ts` (`couple`) | Two people asking together: each writes separately from their own WhatsApp (security and confidentiality), the fee is per person, never a couple price or discount. |
| Foreign-income price guard | `engine.ts` (`fixForeignPrice`) | $495 / $330 become $385 / $220 in every language unless the customer reported foreign income (being back home is not foreign income). A reply that quotes the fee to someone who asked the price gets the bank details and the screenshot line. |
| Residency, counted by the customer | `will-decides.ts` (`residency_resident` / `residency_whm`), playbook | After the residency double-check, a customer who counted the points themselves gets Jo's result from their latest count, without the questions again. The old "hand it to the team" line was removed (it contradicted the 21 Oct rule). |
| Morning report | `morning-report.ts`, `/api/will/morning`, `MorningReport.tsx` | On the Overview: handled by Will alone, tasks and why, waiting on us, stuck after paying. Replaced the "Ask Will" bot, which was removed. |

---

## 5a. Security watch (`lib/security-watch.ts`, 23 Oct)

- Every CRM login step is written to `will_audit` with actor `auth`: `crm_password_ok`, `crm_password_failed`, `crm_locked_out`, `crm_otp_ok`, `crm_otp_failed`, `crm_otp_too_many`. Each row has the device ("Chrome on macOS"), Vercel's city/country and a masked IP.
- A successful login from a device + country the CRM has not seen before emails `CRM_ADMIN_EMAIL` (via Resend) "New login to your CRM". The very first login is remembered silently. Known devices live in setting `security_known_devices`.
- Nightly (`runNightly`) checks the `bank_details` setting and every Library message for any BSB/account that is not 062-692 / 81049952. A mismatch raises an URGENT task "Bank details do not match ours: ..." and an email.
- The morning report has a "CRM logins" tile: logins, failed attempts, lockouts, new devices and the last logins in 24 hours.
- If a login was not Jo: change `CRM_PASSWORD` and `JWT_SECRET` in Vercel and redeploy (signs everyone out).

## 5b. 24 Oct fixes

- ABN reading (`abnStance` in `instant-choice.ts`): the newest customer message that says anything about an ABN decides. "not sure if that's an ABN?" is `unsure` (TFN price), "I never worked under an ABN" is `no_abn`. The engine can step a $385 choice down to $220 on a correction.
- No silent repeats: a reply that is word for word a message already sent becomes a task ("Will was about to repeat a message he already sent") instead of being dropped by `deliverOut`.
- Review of a lodged return (amendment, "lodge it again"): Will-decides keys `price_tfn_review` / `price_tfn_abn_review`, in English, German and Japanese; never a handover, exempt from the opening question and from the "answer first" guard. The Oct 31 deadline is for new returns only.

- Bank document (25 Oct): always required, an official document from the Australian bank with full name, BSB and account number. Will-decides key `bank_document` (en/de/ja); the engine replaces any "you don't need a bank statement" reply with that wording (`BANK_DOC_DENIED_RE`), or hands it to the team in other languages.

- Careful buyer (25 Oct): invoice is sent after payment; TPB/agent → [legitimacy]; account name The Accounting Academy; no myGov link needed. A message with several questions is answered point by point; only a truly unknown point goes to the team, with the rest drafted.

- Account name (25 Oct): "アカウントネーム", "口座名", "is the name Working Holiday Tax?" are account-name questions; in Will mode a handover on one is replaced by the fixed answer (The Accounting Academy), and the "answer first" guard no longer blocks it.
- Refund chance (25 Oct): "how likely / will I get anything back / how much" before paying → key `refund_chance` (en/de/ja): depends on many factors, estimate only after the review, which starts after payment. A handover on it is replaced by that answer.

- Prompt caching (25 Oct, Anthropic "low cache hit rate" email): the playbook block in `decide` and the reviewer's rules are cached with a 1-hour TTL (`cache_control: { type: 'ephemeral', ttl: '1h' }`). `ai-usage.ts` costs 1-hour writes at 2x input.

- 72-hour review (25 Oct, 107 conversations): "per person" price questions no longer read as "are you a bot?"; the reviewer has an explicit pass list (declines, refund-chance wording, residency counting, careful buyer); no sales nudge once the team has sent an invoice/estimate; "transfer request / IBAN / how do I pay" counts as a payment question; long residency answers that open with yes/no count; playbook rules for residency counting after payment (also with the team in the chat; Will never counts days, the customer answers question 1 themselves), amendments after lodgement and "I haven't seen a transfer request".

- Paying from overseas (25 Oct): keys `payment_link_offer` → `payment_link_name` → `payment_link_ready`; the last one opens an URGENT task "PAYMENT LINK: send a card payment link to …" and the team sends the link by hand. Never an IBAN, never a currency conversion.
- No super (DASP) service for now (25 Oct): key `no_dasp`; the two Library answers are updated by `applyKnowledgeFixes` (marker `fix-25oct`).
- Tax form (25 Oct): the WhatsApp field asks for "The WhatsApp number you messaged us from", so the form lands in the right chat.

- A price that is not ours (25 Oct, Katie "$100", Matilde "$130"): key `not_our_price` (en/de/ja), and a handover on a message quoting another price is replaced by it (`quotesOtherPrice`). Never a discount.

## 6. Running it

### Environment variables (Vercel)

Required: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ANTHROPIC_API_KEY`,
`WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID` (448522015011534), `WHATSAPP_WABA_ID`
(445188805337133), `META_APP_SECRET`, `META_VERIFY_TOKEN`, `CRON_SECRET`, `JWT_SECRET`,
`CRM_PASSWORD`, `PASSWORD_SALT`, `REDIS_URL`.

Optional: `RESEND_API_KEY`, `CRM_ADMIN_EMAIL`, `NEXT_PUBLIC_FEATURABLE_ID`, `GOOGLE_PLACE_ID`,
`CLAUDE_MODEL`, `CLAUDE_ASSISTANT_MODEL` (reviewer), `WILL_REVIEWER` (`off` to disable the
second check), `WHATSAPP_GRAPH_VERSION`, `WHATSAPP_TEMPLATE_LANG`, `WILL_MIN_MESSAGE_TS`,
`AI_PRICES_JSON`, `ANTHROPIC_ADMIN_API_KEY`.

Never set in production: `FOLLOWUP_MODE`, `FOLLOWUP_STEPS`, `WILL_ALLOW_MOCK_BRAIN`, `SEED_ENABLED`.

### Database

Migrations are in `supabase/migrations/` (001 to 046) and are run by hand in the Supabase SQL
editor. **Every one up to 046 has been run on production** (046 confirmed on 22 Oct).
`supabase/RESET_WILL_FRESH_START.sql` wipes Will's data: never run it on production by accident.

### Commands

```bash
npm ci
npm run dev                     # http://localhost:3000
npx tsc --noEmit                # types
npm test                        # 3,000+ tests
npm run lint
npm run build                   # needs network to Google Fonts
./scripts/build-offline.sh      # build without Google Fonts access (stubs and restores the fonts)
npm run generate:llms           # regenerate llms.txt files after guide changes
npm run indexnow                # tell Bing about changed URLs after a deploy
```

Deploy: push to `main`, Vercel builds and deploys.

### Health

The CRM header shows Store, Schema, Guard, Engine, Scheduler, Cadence, Templates and
WhatsApp. Schema red means a migration was not run. `/crm/whatsapp/inbound-check` answers
"why didn't that message arrive?".

---

## 7. Open items

- **Meta templates per language**: check WhatsApp Manager has Japanese and German versions
  (approved, not pending) of every template the code sends outside the 24-hour window. The
  health panel lists missing ones.
- **Per-user identity in the CRM**: sessions have no user, so audit rows say "owner".
- **Watch Will mode for a few days** (switched on 22 Oct): the morning report's "waiting on
  us" list and any "Second check held Will's reply twice" tasks are the signals.
- Not yet built: a watchdog that re-asks Will (then raises an urgent task) for any customer
  message left with no reply, no wait decision and no task after 30 minutes.

---

## 8. Working on this code

- Every change ships with tests; run the full suite and a production build before a zip.
- Real customer cases are pinned as tests (search `__tests__` for the date or the number).
- Comments say **why**, with the date and the case that caused the rule. Keep that habit:
  most rules exist because of a specific customer.
- Never remove a keyword path without checking the Rules mode still needs it.
