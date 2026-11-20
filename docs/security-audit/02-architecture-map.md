# 02. Architecture map

Built from the unit reports. Everything here is a STATIC ANALYSIS CONCLUSION from reading code unless marked otherwise. Nothing was observed running.

## Components

| component | where | role |
|---|---|---|
| Public sites | `src/app/(site)`, `(de)`, `(es)`, `(fr)`, `(it)`, `(ja)`, `(svt*)` | Static server-rendered pages and articles for both brands. No user input in the Student Visa Tax routes (all static). |
| Public forms | `src/app/(site)/start`, the super form page; `/api/tax-form`, `/api/tax-form/upload`, `/api/tax-form/fix`, `/api/tax-form/link`, `/api/super-form`, `/api/analytics/funnel` | Unauthenticated intake of personal data and documents. TFN and ABN application forms were removed on 18 Nov. |
| Edge proxy | `src/proxy.ts` | Per-request CSP nonce for `/crm` and `/atlas`; cross-site guard for `/api/crm`, `/api/will`, `/api/atlas`, `/api/mia`. It does not check the session. |
| Host routing | `config/brand-routing.js`, `next.config.js` | Brand from the Host header. Default-deny rewrites on Student Visa Tax hosts; API allowlist empty unless `SVT_FORMS_ENABLED=true`. |
| CRM (staff) | `src/app/(site)/crm/*`, `src/components/will/Dashboard.tsx`, `/api/crm/*` | Tasks, clients, partners, leads, documents. One staff role. |
| Will (WhatsApp assistant) | `src/lib/will/*`, `/api/will/*` | Webhook intake, state machine, model call, policy guard, scheduler, sending. |
| Mia (Student Visa Tax board) | `src/lib/mia/data.ts`, `/api/mia/*`, `src/components/mia/*` | Staff view of SVT customers; SVT WhatsApp line not live. |
| Atlas (staff assistant) | `src/lib/atlas/*`, `/api/atlas/*`, `src/components/atlas/*` | Questions over CRM data via the model; proposals executed through `/api/will/actions`. |
| Scheduler | `/api/will/tick`, `/api/will/orphan-sweep` (Vercel cron) | Due jobs, follow-ups, nightly sweeps, orphan upload cleanup. |

## External services and trust boundaries

| boundary | direction | protection in code |
|---|---|---|
| Browser to public forms | in | Sec-Fetch-Site guard, rate limits per IP and per person, input sanitising and validation, upload type and signature checks |
| Browser to CRM | in | password plus emailed one-time code; signed session cookie; cross-site guard |
| Meta to webhook | in | HMAC-SHA256 over the raw body, constant-time; phone-number-id filter; 256 KB cap; idempotency by message id |
| Vercel cron to tick and sweep | in | Bearer cron secret or session, constant-time |
| App to Meta Graph API | out | token sent only to exact Meta hosts; send timeout; brand check on the payload |
| App to Anthropic API | out | key from environment; forced tool call; output validated; failures become a human task |
| App to Supabase Postgres | out | service-role client, server only; RLS bypassed, so authorisation rests on the routes |
| App to Supabase Storage | out | private-bucket assertion before each write; server-built paths |
| App to Redis | out | lockout, one-time code, rate limits; memory fallback for rate limits |
| App to Resend | out | one-time code and security alerts to the admin address; HTML escaped |
| Browser to Google Analytics, Facebook SDK | out | consent-gated loader; Facebook SDK only on the WhatsApp connect screen |

## Data stores

- Postgres tables: `crm_clients`, `crm_tasks`, `crm_audit`, `crm_leads`, `partners`, `form_funnel_events`, and the `will_*` tables (customers, messages, tasks, templates, jobs, state history, settings, knowledge, audit, processed messages, known contacts, lost analysis, AI usage). Inventory: file 08.
- Storage: one private `uploads` bucket (customer documents, internal expense PDFs).
- Redis: login lockout counters, one-time code hash, session revocation, rate-limit counters.
- Local file store (`.data/store.json`): development and simulator only; refused in production.

## Request paths (simplified)

1. Inbound WhatsApp message: Meta, `/api/will/webhook` (signature, size, claim), `service.ts` (state, opt-out, kill switch), `claude.ts` (model), `engine.ts` and `policy-guard.ts`, then either a draft for approval, a human task, or `channel.ts` `deliverOut` to Meta.
2. Tax form: browser, `/api/tax-form/upload` (files to Storage), `/api/tax-form` (validate, optional signed token, find or create client, insert task with TFN and bank details sealed when keys are set), `form-link.ts` (confirmation to the matched chat).
3. Staff action: CRM browser, proxy guard, `/api/will/actions` or `/api/crm/*` (session check), store, optional WhatsApp send.
4. Scheduled work: cron, `/api/will/tick`, `scheduler.ts` (claim job, re-check gates, send).

## UNVERIFIED ASSUMPTIONS

- Deployment topology (regions, number of instances, Node version) was not inspected.
- That no other entry point exists outside the repository (for example database webhooks or dashboard-made functions).

## NOT TESTED

- No request was sent to any route. Middleware order and header results on a running server were not observed.
