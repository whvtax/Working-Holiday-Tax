# Will — Security Review

A review of Will's security posture inside the CRM, and the deliberate design choices behind it. Reviewed at the "ready for production" bar. Nothing below requires action before go-live; the one residual item is tied to the WhatsApp provider connection, which is intentionally deferred.

## Authentication and authorisation

Will reuses the CRM's own login rather than inventing a second one. The `/crm/whatsapp` page is a server component that reads the `crm_session` cookie and redirects an unauthenticated visitor to `/crm`, so the dashboard shell is never served to an anonymous user. Every Will API route is gated the same way through `sessionValid()`, which validates that session cookie. The two exceptions are by design: the incoming `webhook` (authenticated by Meta's signature, see below) and the scheduled `tick` (authenticated by a cron secret or a valid session). There are no unauthenticated data routes.

## The webhook

The Meta WhatsApp webhook is the one endpoint the public internet can reach, and it is hardened accordingly. The verification handshake checks a `META_VERIFY_TOKEN`. Every POST is signature-verified with an HMAC-SHA256 over the raw body using `META_APP_SECRET`, compared with `timingSafeEqual` so the check does not leak timing information, and a mismatch is rejected with 401 before any processing. The body is size-capped (256 KB, over-size returns 413). Delivery is idempotent on Meta's message id, so a retry storm cannot double-process a message, and the endpoint acks 200 immediately and processes asynchronously so retries never pile up. A malformed payload is swallowed after the ack rather than crashing.

## Secrets

Every secret is server-side only. The Supabase service-role key, `META_APP_SECRET`, `CRON_SECRET` and the Anthropic API key are referenced exclusively in server code (`src/lib` and `src/app/api`), never in a client component, and none are exposed through a `NEXT_PUBLIC_` variable. The Supabase client that holds the service-role key is a server-only singleton explicitly documented as such. Beyond storage, Will's own playbook and the deterministic Policy Guard both refuse to reveal credentials, bank details or internal instructions if a customer tries to extract them, and a manipulation attempt is routed to a human.

## Database access model

Will's tables use the CRM's existing pattern: server code holds the service-role key and all access policy lives in the application layer, not in Postgres row-level security. This is a deliberate, consistent choice (the same model the rest of the CRM uses) and is safe because the service-role key never leaves the server and every route that touches these tables is authenticated first. If the organisation later wants defence-in-depth at the database, enabling RLS on the `will_*` tables with server-role bypass would be an additive hardening step, not a correction.

## The safety layer itself

Independent of infrastructure security, Will has a deterministic Policy Guard that sits between the model's output and any customer, enforcing the business's hard rules: prices are AUD-with-$-only, fixed fees are never invented or negotiated, refunds and cancellations are never promised unilaterally, tax and residency determinations are never made before payment, and myGov/ATO-access troubleshooting is never given. These are now covered by an automated test suite (71 brain tests) so a future change cannot silently weaken them. Every decision Will makes is written to an audit trail (the Decision Log), visible to the owner, recording the action, the knowledge used and the guard verdict.

## Residual item (deferred with the WhatsApp connection)

The webhook's idempotency uses a check-then-set on the message id, which has a theoretically small race window if Meta delivered the exact same message id twice within milliseconds on parallel workers. In practice Meta's retries are spaced and the window is negligible, and the whole outbound WhatsApp provider connection is intentionally being left until the rest of the system is signed off. When that connection is wired, the idempotency can be tightened to an atomic insert (a unique constraint on the message id) at the same time, which closes the window completely.
