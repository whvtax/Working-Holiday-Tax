# Proposal: form completion token (closes AUTH-4 / F-1)

Status: PROPOSAL with a tested, inert library already in the tree and a ready patch. Not wired. Needs Jo's decision because it changes the link customers receive.

## The problem (round 1, Medium)

`POST /api/tax-form` is public and, after saving the task, calls `notifyFormReceived(typedPhone, ...)`. That looks up the Will customer by the number the submitter typed and, if the customer is in PAID or FORM_PENDING, queues FORM_RECEIVED (marks the questionnaire complete, cancels reminders, sends "we received your questionnaire") and, on Medicare "No", queues the Medicare exemption message. A phone number is a public identifier, so anyone who knows it can do this to that customer. The reverse also happens by accident: a customer who types a different number than their WhatsApp number is not matched at all and the owner has to link them by hand.

Bounded today by per-IP limits, the state gate and the one-MEDICARE_INFO-ever guard. No data is disclosed. Severity stays Medium (operational and reputational).

## Design

1. `src/lib/will/form-token.ts` (in the tree, 7 tests, not imported by any route): `v1.<payload>.<mac>`, payload `{c: customerId, b: brand, e: expiry, n: nonce}`, MAC is HMAC-SHA256 over a domain-separated string with its own secret `FORM_TOKEN_SECRET` (at least 32 characters; shorter or missing means no token is ever issued or accepted, so it fails closed). Brand is a signed claim, so a WHT token is useless on SVT and the reverse. Default lifetime 21 days, hard maximum 60 days at verify time.
2. Issue: `deliverOut` (the single outbound path) rewrites every bare form link in the text to `.../tax-form?k=<token>` after the repair and scrub steps, so it covers model drafts, canned messages and the team's own text. Policy-guard and `FORM_LINK_ANY_BRAND` regexes match the slug followed by a non-word character, so `?k=` does not break them.
3. Carry: the form page already reads `?ref=`; it also reads `k` and posts it as a form field. The handoff to the residency page keeps it in the payload.
4. Verify: the route calls `verifyFormToken(k, brand)`. Valid: the customer named by the token is used and the typed number is only compared and audited (`form_token_phone_differs`). Not valid or absent: phase 1 keeps today's phone match; phase 2 (`FORM_TOKEN_ENFORCE=true`) saves the task but only raises the existing "Link to chat" task, touching no customer.
5. Not single use, on purpose. Customers resubmit ("forgot a receipt") and the existing one-FORM_RECEIVED guard already makes a resubmission harmless. Bound by customer, brand and expiry. Per-customer revocation is available as a setting (`form_token_revoked_before:<id>`) if ever wanted; not in the patch.
6. No PII in the token. A customer id is an opaque UUID; the token is signed, not encrypted.

## Rollout

1. Deploy the patch with no secret set. Nothing changes (tokens are not issued, the route falls through to the legacy match).
2. Set `FORM_TOKEN_SECRET` (new random 32+ byte value, Vercel env, Production and Preview). Links sent from then on carry a token; the legacy match still catches everything else.
3. After about 3 weeks (token lifetime) check the audit log: count `form_received_queued` with `matchedOn: completion-token` against `phone-tail-9`. When almost all are token matches, set `FORM_TOKEN_ENFORCE=true`.
4. Rollback at any time: unset `FORM_TOKEN_ENFORCE` (legacy match returns); unset the secret (no tokens issued or accepted).

## Hazards found while wiring, and how the patch handles them

- Duplicate guard: `wasAlreadySentVerbatim` compares stored message bodies. A per-send nonce would defeat it, so `normalizeForDedup` strips `?k=v1....` before comparing.
- Staff-created tasks (`/api/crm/tasks`) also call `notifyFormReceived`; they stay on the phone match because a signed-in member of staff is trusted. Only the public route changes.
- The CRM shows the message the customer received, so staff will see the token in the thread. Staff already see everything in the thread; treat the token as a bearer credential for one customer's questionnaire only.
- Link redirects: retired form slugs redirect to the current one. Next.js forwards the query string on redirects, but confirm with `e2e` that `?k=` survives `/tax-form` to `/start` before enabling.
- Meta template messages with a fixed button URL cannot carry a per-customer token. Any template that links to the form needs a URL parameter button (`.../tax-form?k={{1}}`) or stays on the legacy match.
- A customer who opens the plain site link (not the WhatsApp one) still has no token. Under enforce they are saved and appear as one "Link to chat" task, the same as an unmatched number today.
- SVT: the same patch works for SVT because the brand is a signed claim; the SVT branch of the route is not touched in this patch (it calls `notifyFormReceived` inside `withBrand('svt')`). Add the same three-way branch there when the SVT line launches.

## Files

- `wiring.patch`: unified diff (`patch -p1`), applies to the FINAL7 tree as of 2 Nov 15:xx UTC. Touches channel.ts, form-link.ts, tax-form/route.ts, submit-tax-form.ts, start/FormClient.tsx and form-token.ts.
- `completion-token-wiring.test.ts.txt`: the route-level test (3 cases). Rename to `.ts` and put it in `src/app/api/tax-form/__tests__/` when applying.
- Library tests: `src/lib/will/__tests__/form-token.test.ts` (already in the tree).

## Tests that must change when the patch is applied

- `src/lib/will/__tests__/medicare-auto.test.ts` pins the exact source text of the `notifyFormReceived(whatsapp, email, 'tax-return', medicareAnswerFor(...` call in the route (it failed against the wired tree while this patch was being verified). Update its expected pattern to the new three-way branch; the behaviour it protects (the Medicare answer reaches `notifyFormReceived`) is unchanged.
- Add `completion-token-wiring.test.ts.txt` as a `.ts` test.

## Residual risk after full rollout

A leaked token (a screenshot of the chat, a forwarded link) lets its holder act as that customer's questionnaire for up to 21 days. That is the same trust as the WhatsApp thread itself. A customer who submits twice with different numbers is audited, not blocked.
