# Integration security report: WhatsApp and third parties

Scope: the Meta WhatsApp webhook and send path, the Resend email service, the Anthropic API calls, the Redis rate-limit store, and the Google reviews fetch. No live messages were sent. No live webhook was called.

## WhatsApp webhook (`src/app/api/will/webhook/route.ts`)
- Signature check: the route reads `x-hub-signature-256`, computes HMAC-SHA256 of the raw body, and compares with `timingSafeEqual`. The comparison runs on equal-length buffers. This matches Meta's documented scheme.
- Idempotency: the route states that it is idempotent on the Meta message id. The code path was not executed here.
- Cross-account: the route maps the phone number id to a brand (`brandForPhoneNumberId`). A message for one brand is processed under that brand's context. This is the design; the mapping table itself was not reviewed in depth.
- Replay: no timestamp check is visible. Meta does not send a timestamp in this header, so the protection is idempotency on message id. Confirm this in the live processing path.

## Outbound sends
- Tokens are read from environment variables. The token is also stored in CRM settings after "Connect WhatsApp". That copy is a second place the token lives, and the rotation guide in the incident runbook already names it.
- The Mia send route saves a draft with status `PENDING_APPROVAL` and never sends. This is a safe default.

## Anthropic (`src/lib/will/claude.ts`)
- Calls the model with the customer's text. Retries use `Math.random` only for back-off timing. That is not a security issue.
- The system prompt and brand rules are in the code. Prompt injection from customer messages was not tested.

## Email (Resend) and Redis
- Keys are read from environment variables. Test values in the test suite are synthetic.

## Findings
- No new high or medium integration findings beyond WMA-01 and WMA-02.
- Action: confirm in the live system that the webhook rejects a request with a bad signature (a read-only test with an invalid signature, using a test account, is acceptable with approval).
- Action: decide whether the CRM copy of the WhatsApp token is still needed, or whether environment variables alone should be the source.

## Not tested
Live webhook behaviour, retry storms, rate limits from Meta, and message loss were not tested. These need approval and a test number.
