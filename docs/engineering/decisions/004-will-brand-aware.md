# 004: Will (WhatsApp assistant) brand-aware for Student Visa Tax (milestone 5)

Date: 26 Oct 2026. Status: ACCEPTED (Jo's answers in section 7); infrastructure built (section 8).

## 1. Why this is planned separately
Will is the live sales and service channel for Working Holiday Tax: about 24,000 lines in
`src/lib/will`, a webhook, a cron tick, templates, a reviewer pass and a policy guard. Every
change here is a change to what WHT customers receive. The rule is the same as for the site:
nothing changes for WHT, and SVT stays switched off until it is complete and tested.

## 2. What already protects us today (verified in code, 26 Oct)
- The webhook drops any delivery whose `metadata.phone_number_id` is not WHT's
  (`src/app/api/will/webhook/route.ts`, `extract`). Adding the SVT number to the WhatsApp
  Business account today would NOT make Will answer it: those messages are ignored.
- The SVT site has no way to create a Will customer: its API is closed (decision 003), and
  an SVT form submission does not call `notifyFormReceived`.

## 3. Inventory: where the brand is fixed in Will
Files that name WHT, its number, domain, email or site URL (count of lines):
i18n.ts 13, knowledge-seed.ts 8, playbook.ts 8, claude.ts 5 (system prompt), account-name.ts 3,
approved-messages.ts 2, engine.ts 2, policy-guard.ts 2, service.ts 2, winback-decision.ts 2,
daily-digest.ts 1, later-plan.ts 1, payment-proof.ts 1, residency-quiz.ts 1, reviewer.ts 1,
will-decides.ts 1. Plus: the send path (`channel.ts`: one phone number id), Meta templates
(approved per number/WABA, `en` only), the form link builder (`form-link.ts`), the residency
quiz (WHM logic), and the stored Library texts in `will_templates`.

## 4. Design
1. **Brand on the customer.** `will_customers.brand` (migration 047). Set once, when the
   customer first writes in, from the `phone_number_id` the message arrived on. Never from
   message text.
2. **Inbound.** The webhook accepts deliveries for either configured number id
   (WHT: existing setting; SVT: `SVT_WHATSAPP_PHONE_NUMBER_ID`). Unknown ids are still
   dropped. SVT id unset = today's behaviour exactly.
3. **Outbound.** `deliverOut` picks the phone number id from the customer's brand. A
   customer can never be messaged from the other brand's number (test: every send path).
4. **Brand context.** One `BrandVoice` object per brand (name, site URL, form URL, email,
   agent wording, price, guarantee, languages). Every text builder, prompt and guard reads
   from it instead of constants. WHT's object reproduces today's strings byte for byte
   (snapshot tests on every approved message before and after).
5. **Student adaptations (SVT only).** Playbook rules for: 6 month course residency
   ("may be"), Medicare Entitlement Statement timing, ABN delivery work, two jobs at once,
   485 graduates, prior WHM visa (DASP 65% rule), DASP service. No WHM tax-rate logic for
   SVT customers. Residency quiz: SVT version or off.
6. **Languages.** SVT approved texts in en, zh (Simplified), vi, written natively
   (milestone 6). WHT keeps en, de, ja.
7. **Templates.** Meta templates are per WABA and language; SVT needs its own approved set
   (en, zh_CN, vi). Until approved, SVT sends free text only inside the 24-hour window and
   creates a task when a template would be needed.
8. **Staff side.** CRM chats, tasks and digest show the brand; the morning digest splits by
   brand. Reports filter by brand.
9. **Policy guard and reviewer.** Gain brand checks: an SVT reply that names WHT (or the
   reverse) is blocked like any other policy breach.

## 5. Order of work (each step shippable, WHT unchanged at every step)
A. BrandVoice + snapshot tests proving WHT strings are identical.
B. Customer brand + inbound routing by number id (SVT id unset in production).
C. Outbound number selection + guard against cross-brand sends.
D. SVT playbook, prompt and texts (en first), reviewed by Jo.
E. zh and vi texts (native), templates submitted to Meta.
F. Turn on: set `SVT_WHATSAPP_PHONE_NUMBER_ID`, then `SVT_FORMS_ENABLED`.

## 6. Questions for Jo
1. Same WhatsApp Business account (WABA) for the new number, or a separate one? Same is
   simpler (one token, one webhook); separate isolates the two brands at Meta.
2. Will's name for SVT customers: also "Will", or another name?
3. Who approves the SVT texts (en, zh, vi) before they go live, and is there a native
   Chinese and a native Vietnamese reader to check them?
4. DASP service: price and what is included (Will cannot quote it until decided).
5. Should the WHT residency quiz exist for SVT at all, or does the reviewer decide
   residency from the form (current SVT form behaviour)?

## 7. Jo's answers (26 Oct)
1. Same WhatsApp Business account, to save on templates.
2. A new name for the SVT assistant: **Mia** (Jo, 26 Oct; set in `brand-voice.ts`).
3. Chinese and Vietnamese texts are checked by a separate review agent.
4. DASP for SVT: $220 including the claim. Infrastructure only for now (`daspFeeAud`);
   Will hands DASP questions to the team and quotes nothing yet.
5. Residency for students: the form explains the 6 month course rule and the customer marks
   resident or foreign resident; the reviewer confirms.
And: SVT Will is the same engine, model and rules, not a new one.

## 8. What was built (design changed for the better after the inventory)
Instead of threading a brand through 24,000 lines, the brand is applied at the two places
text leaves Will, and carried in an AsyncLocalStorage context (`brand-context.ts`):
- `brand-voice.ts`: `rebrandText` (customer text) and `rebrandPrompt` (system prompts +
  student rules). Both return their input unchanged for WHT; a test runs every approved
  message through them and proves it.
- `llm-transport.ts`: the only route to the model (9 call sites moved onto it).
- `channel.ts`: words rebranded in `deliverOut` (the CRM records what was sent); `postMessage`
  refuses any message carrying the other brand, and sends SVT only from
  `SVT_WHATSAPP_PHONE_NUMBER_ID` (never the WHT number). Templates: `_svt` twin unless the
  name is in `SVT_SHARED_TEMPLATES`; `svtTemplateReadiness` sorts Meta's list into shareable /
  needs a twin, from the approved text.
- Webhook: the arriving number decides the brand (`brandForPhoneNumberId`); with no SVT id set
  this is exactly the old filter. Echoes from the phone app likewise.
- Store: one customer per number PER BRAND (migration 047 replaces UNIQUE(wa_id) with
  UNIQUE(wa_id, brand)); lookups filter by brand only once the SVT line is on; the health
  check probes the brand column then.
- Policy guard: only the current brand's site is an allowed link; the "no form link before
  payment" rule recognises either brand's form link.
- Scheduler and win-back: each job runs in its customer's brand.
- CRM: "SVT" chip on chats and tasks (a code, not the name: the CRM bundle is on the WHT domain).
- SVT pages import only `src/lib/svt/brand-public.ts`, so no WHT detail ships in SVT
  JavaScript (e2e checks the scripts each brand's pages load, both ways).

## 9. Still to do before the SVT line goes live
- Jo picks the assistant's name.
- SVT texts reviewed (en), zh and vi written and checked (milestone 6).
- SVT twins submitted to Meta for every template that names WHT (run the readiness check).
- Turn-on order in DEPLOYMENT_CHECKLIST.md.

## 9. Learning (27 Oct, Jo: "Mia must not learn from zero")
One Library for both assistants. Every answer Will has learned (no brand tag) is used by Mia
too. The nightly mining runs once per brand: drafts from WHT chats stay untagged (shared,
as before); drafts from SVT chats get the tag `brand:svt` and are used only for SVT
(`usableFor` in knowledge.ts; retrieval and the nearest-answer diagnostic both filter).
`brand:wht` marks an answer that must never reach a student. The CRM Library shows
"SVT only" on those entries. WHT is unchanged until the SVT line exists: no entry carries a
tag, and the extra customer lookup runs only when `svtLineEnabled()`.
