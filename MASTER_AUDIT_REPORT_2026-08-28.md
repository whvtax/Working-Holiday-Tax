# Master audit — WHVTAX — 28 August 2026

Ten specialist agents: security, performance, dead code, resilience, architecture, SEO, design consistency, mobile density, mobile flow, marketing copy. Every finding grounded in a real file read, then implemented and verified the same night.

**Result: 953 tests passing, production build clean, six key pages verified in a real browser at phone width.**

---

## Scope, method and limits

**Checked:** 317 TS/TSX files, 106,373 lines, 48 API routes, 34 migrations, in all three languages.

**Method:** static code review plus, where it mattered, empirical verification — a real Chromium render at 390px, the actual build artefacts in `.next`, and `npm audit`. It was **not** a penetration test and there is no field Core Web Vitals data, so mobile and performance findings are reasoned from code and are labelled as such.

**Not checked:** full accessibility audit, real load testing.

**Protected area, untouched by instruction:** how a customer payment is confirmed and how they move to the next stage, and the whole trust flow. That covers `payment-claim.ts`, the payment-proof path in `service.ts`, `assessPaymentProofImage`, and the trust messages. Three real findings landed inside it. They are reported at the bottom and **nothing there was changed**.

---

## Maturity, before and after

| Area | Was | Now | What moved it |
|---|---|---|---|
| Security | 3.4 | 4.0 | Two unguarded admin pages closed, upload byte budget, fail-closed store, body ceiling on the knowledge route |
| Performance | 3.5 | 4.0 | Health probe stopped dumping the customer table, scroll handler throttled, phone metadata trimmed, middleware no longer runs on every static page |
| Dead code | 3.0 | 3.5 | 17 verified-dead symbols and an unreferenced route removed |
| Resilience | 3.0 | 4.0 | The three duplicate-send paths and the total-silence path all closed |
| Architecture | 2.4 | 3.0 | Tax year 8 copies → 1, phone rule fixed, column map type-enforced |
| SEO | 4.0 | 4.5 | Reviewer schema node now exists, form pages crawlable-to-noindex, real OG cards, generic `en` hreflang |
| Design consistency | 2.6 | 3.2 | CTA hover contrast, trust hierarchy, error text, off-token borders |
| Mobile density | 3.0 | 3.6 | Single-column cards, section padding, footer legibility, calculator labels |
| Mobile flow | 3.0 | 4.0 | Back button, session-loss recovery, consent mis-tap, tap targets, upload progress |
| Marketing copy | 4.0 | 4.2 | The one unsubstantiated outcome promise removed |
| **Overall** | **3.2** | **3.8** | |

---

## The eight that actually mattered

**1. One bad insert could silence every scheduled message, indefinitely and invisibly.**
`ensureNightly()` and `ensureDailyDigest()` only *queue* future work, and both ran unguarded ahead of `processDueJobs()`, the loop that actually sends. One throw and every Autopilot reply froze unsent and every follow-up stopped, with a green dashboard. Largest blast radius in the system; two lines.

**2. The same reply could reach a customer twice.** Three separate paths, all closed. The Autopilot send had no atomic claim, so a killed invocation left the message QUEUED, the reclaim put it back, and the "is it still QUEUED?" guard passed — because that write is precisely what had not happened. Arming the follow-up cadence after the send could throw, which the webhook read as "this message failed", releasing the claim and asking Meta to redeliver the whole thing. And the outbound WhatsApp call had **no timeout at all**, inside a serial loop under a 60-second ceiling.

**3. The scheduler health dot could not go red.** It was the literal `true`. Every failure above presented as green. There is now a last-tick heartbeat and the dot goes red after three missed crons.

**4. A photo could be silently lost.** A throw while raising the task was swallowed by an empty catch, with the idempotency claim already taken and Meta told 200. The photo sat in the thread with no task, no reply, and nothing to distinguish it from a handled message. For a message Will cannot read, the task **is** the only route to a human.

**5. One malformed message discarded the rest of the batch.** A single `try` wrapped the whole nested walk, so a throw anywhere abandoned every remaining message in the delivery — and Meta batches senders. This file's own notes record what that costs: 105 leads lost with every dot green.

**6. An Australian typing their own number could not be found.** The CRM stores what the customer typed; Will stores what WhatsApp sends. `"0412 345 678"` and `"61412345678"` are different digit strings and nothing converted the trunk zero, so the CRM's "open this chat" lookup failed for exactly the people most likely to be customers. The store's own doc comment names that number as its first example.

**7. The tax year had eight implementations in two timezones.** Some anchored to Sydney, some to whatever timezone the browser is in; two frozen at module load, so a tab open across 1 July served last year's list. Every failure lands in the first week of July and every one is silent.

**8. The site was shipping no webfonts at all.** `next/font` was stubbed — my own offline build workaround, left in. No `@font-face` was emitted, `variable: '--font-serif'` landed as a CSS class name instead of a custom property, and all 29 `var(--font-serif)` rules fell back to Georgia. It built, deployed and looked like a website. Real imports restored, plus a test that fails if the stub ever returns and a script that restores it automatically.

---

## Also fixed

**Security.** Two CRM pages had no server-side session gate. The public upload allowed 1GB per IP per window into the bucket holding passports; it now has a byte budget as well as a request count. The store failed *open* to a local file in production, which would have written customer records and the plaintext WhatsApp token to an ephemeral disk. The knowledge route bypassed the shared 64KB body reader and stored uncapped text that feeds the model prompt. The inbound retry cap was gated on Redis, which fails open, so a failing message could loop forever and never reach the dead-letter path.

**Conversion.** Step 2 of the form had no way back to step 1, so a typo in an early field was unrecoverable *after* the uploads had succeeded. The last screen before submission rendered nothing when the in-memory hand-off died — no button, no explanation, TFN and uploads gone; it now offers a way back. Tapping "Privacy Policy" silently flipped the consent checkbox, because both sit inside the same label. The file-remove button was 30px, the only way to undo a wrong passport photo. Both phone fields claimed `autoComplete="tel"`, so the home number autofilled into the Australian one. Twelve uploads now show "3 of 12" instead of a static label.

**SEO.** All 423 guide pages pointed `reviewedBy` at `#supervising-agent`, a node that had never existed — the strongest E-E-A-T signal on a YMYL site resolving to an anonymous stub. It now carries the agent's name, ABN, TPB number and register link, as a separate entity, deliberately not merged into the business node. The form pages carried both `Disallow` and `noindex`, which cancel each other out. Six matched OG cards existed in the repo unused. Self-serving `aggregateRating` removed.

**Design.** The primary CTA measured 3.31:1 on hover, below AA — the one element that got harder to read the moment you touched it, on every conversion path. Error text on the four forms that collect passport and TFN data was 11px. In the footer the Google rating was more salient than the tax agent credential; the credential now leads, with the sentence itself byte-for-byte unchanged.

---

## Deliberately not done

**The copy rewrites.** Ten proposed rewrites of marketing copy are in the agent output, not in the code. You have spent hours on that wording and none of it is broken. One exception was applied: `/tax-form` promised "we maximise your refund", the single unsubstantiated outcome promise on the site, on the page where money is committed, contradicting every other page.

**"Replies in about an hour", unqualified in 92 places** while two pages correctly say business hours only. A promise that fails at 11pm is cheap trust to lose, but it is 92 edits to your copy and it is your call.

**`ResidencyStep.tsx:51` mentions a $700 figure.** Flagged, not touched: it is substantive tax content (the Low Income Tax Offset), which is a red line.

**German uses two different terms** for the credential — `registrierten Steuerberater` on marketing pages, `registrierten Steueragenten` in the footer and client agreement. Both are inside the protected phrase. Your compliance decision, not a copy edit.

**`next@14.2.35` is 21 advisories behind.** The fix is `next@16`, two major versions and a full regression pass on 48 route handlers. Not something to do unattended overnight. Worth scheduling as its own change; add `npm audit --audit-level=high` to CI so it stops drifting.

**The i18n triplication.** 40.7% of the codebase is copies of pages that are ~98% structurally identical, `blog/data.ts` alone triplicated at 27,587 lines. The largest single win available and the right pattern already exists in-repo (`formStrings.ts`). It is a week of work, not a night.

---

## Protected area — reported, not touched

Three real findings inside the payment and trust flow. **No change was made to any of them.**

1. **"Payment received" can be sent twice.** `handlePaymentProofMedia` runs outside the per-customer mutex, so two attachments arriving together can both pass the `!customer.paid` gate before either writes PAID. Realistic trigger: a screenshot and a receipt PDF sent back to back.

2. **A confirmed payment can advance with no message and no task.** The order is setState → advance → send → task. A throw at the send or the task is swallowed by the note loop's catch with the claim already taken, so the customer is PAID and FORM_PENDING, was never told, and no task exists. Meta will not redeliver.

3. **The vision check is outside the daily AI budget.** `assessPaymentProofImage` is the most expensive call the system makes and `aiBudgetExhausted()` is not consulted before it. Adding a gate would mean a genuine payment screenshot silently failing to confirm on a budget-exhausted day, which is a change to how payment is confirmed — your decision, not the audit's.

---

## Migrations to run

- `032_estimate_invoice_layout.sql` — the estimate message layout
- `033_lost_recovery_message.sql` — the win-back message column
- `034_one_pending_followup.sql` — one pending follow-up per customer, enforced in Postgres

---

## Recommended next, in order

1. Answer the two open Library decisions (super/DASP, data deletion).
2. Schedule the `next` upgrade as its own change with a full regression pass.
3. Enable `CSP_NONCE_ENABLED` on a Preview deployment first, verify hydration and the Facebook popup, then promote. The implementation is already written and simply switched off.
4. Turn on `noUnusedLocals` and `@typescript-eslint/no-unused-vars` — two lines that would have caught most of the dead code found here.
5. The i18n consolidation, starting with `blog/data.ts`.
