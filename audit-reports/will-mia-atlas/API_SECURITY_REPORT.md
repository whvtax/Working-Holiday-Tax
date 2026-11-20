# API security report: WILL MIA ATLAS

Scope: every route under `src/app/api/` for the Will, Mia, Atlas and CRM areas, plus the public forms. Method: scripted auth-marker check on each `route.ts`, plus targeted reads.

## Route inventory (summary)
- Mia (10 routes): `chats`, `clients`, `form-link`, `move`, `pipeline`, `send`, `status`, `tasks`. All call `sessionValid()` first.
- Atlas (2 routes): `ask`, `action`. Both call `sessionValid()` first.
- Will (about 20 routes): `actions`, `audit`, `chats`, `export`, `followups`, `health`, `insights/monthly`, `knowledge`, `link`, `media/[id]`, `messages`, `metrics`, `mine`, `morning`, `orphan-sweep`, `report`, `search`, `seed`, `state`, `system`, `tick`, `version`, `webhook`, `whatsapp/connect`, `whatsapp/inbound-check`. Cron and session auth on the scheduled routes. The webhook is HMAC-signed.
- CRM (about 25 routes): login and OTP are public by design. Everything else requires a session.
- Public forms: `abn-form`, `tfn-form`, `super-form`, `tax-form`, `tax-form/fix`, `tax-form/link`, `tax-form/upload`. These use signed tokens and upload guards.

## Findings
- **WMA-01 (Medium):** Mia routes are not in the cross-site guard list. See `SECURITY_FINDINGS.md`.
- **WMA-02 (Medium):** Will seed route has no environment gate, and its `overwrite` mode changes templates. See `SECURITY_FINDINGS.md`.
- **WMA-06 (Low):** Raw error text on the Will seed 500 path.
- **WMA-09 (Low):** Public routes need a review of input limits and rate limits. The OTP route is rate-limited inside the route per its comment. This has not been tested.

## Controls confirmed
- Session checks on every Mia and Atlas route, before any body parsing.
- Form tokens are verified in the tax-form routes.
- The Meta webhook verifies an HMAC signature with `timingSafeEqual`.
- Mia's move route audits failures and returns a fixed `move_failed` code.

## Not tested
Input fuzzing, rate-limit behaviour, replay of webhooks, and idempotency were not tested. Those need a staging environment with synthetic data, and approval before any run.
