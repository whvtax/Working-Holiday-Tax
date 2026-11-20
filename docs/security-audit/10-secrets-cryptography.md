# 10. Secrets and cryptography

Sources: LIB-01, LIB-02, INFRA-01, INFRA-02, REST-01, WILL-06, TESTS units, DEBATE files. This file names variables and locations only. No secret value appears here or in any unit report. Rows (Rnnn) refer to file 19.

## VERIFIED FACTS

- No `.env*` file exists in this working copy. `.env.example` is absent (two tests fail for that reason).
- Pattern scans over all non-application text files (REST-01) and full reads of the code units found no API key, access token, JWT, private key, connection string with credentials or password literal. The few matches are documentation examples and one synthetic test value.
- The values held in the hosting environment, Supabase, Meta and Redis were NOT inspected.

## Secret names used by the code (names only)

`JWT_SECRET`, password hash and salt variables, `CRM_ADMIN_EMAIL`, `SUPABASE_SERVICE_ROLE_KEY`, `WHATSAPP_TOKEN` and related WhatsApp variables, `META_APP_SECRET`, Meta verify token, `CRON_SECRET`, `ANTHROPIC_API_KEY`, `ANTHROPIC_ADMIN_API_KEY`, `RESEND_API_KEY`, `REDIS_URL`, `FIELD_ENC_KEYS`, `FIELD_INDEX_KEY`, `FIELD_ENC_ACTIVE`, `FORM_TOKEN_SECRET`, `FORM_TOKEN_ENFORCE`.

## STATIC ANALYSIS CONCLUSIONS

### Cryptographic primitives

| use | primitive | location | assessment |
|---|---|---|---|
| Staff password | PBKDF2-SHA512, 100,000 rounds, constant-time compare | `src/lib/crm-store.ts:8-19` | sound as read |
| Session token | HMAC-SHA256, constant-time compare with length check, random 128-bit id | `src/lib/crm-store.ts:43-72` | sound as read |
| One-time code | `crypto.randomInt`, stored hashed, constant-time compare | `src/lib/crm-store.ts:21-23` | sound as read |
| Webhook signature | HMAC-SHA256 over raw body, constant-time | `src/app/api/will/webhook/route.ts:154-165` | sound as read |
| Cron secret, verify token | constant-time compare; unset never matches | `src/lib/will/auth.ts:9-13` | sound as read |
| Form link token | MAC verified in constant time before parsing; own secret; brand, purpose and expiry claims | `src/lib/will/form-token.ts` | sound; no revocation exists (header corrected) |
| Field sealing (TFN, bank details) | AES-256-GCM, fresh random 12-byte IV, tag checked, row-bound associated data, keys exactly 32 bytes, key ring with ids | `src/lib/field-crypto.ts:63-156`, `src/lib/field-seal.ts` | sound as read; off until keys are set |
| CSP nonce | `crypto.randomUUID()` per request | `src/proxy.ts:27-52` | sound as read |
| Form address slugs | random bytes with a slightly biased reduction | `scripts/reset-form-links.mjs` | addresses are not a control (accepted) |
| Rate-limit keys | phone and email shaped identifiers hashed | `src/lib/rate-limit.ts:69-80` | sound as read |

No use of MD5 or SHA-1 for security, no home-made cipher and no fixed IV was reported.

### Secrets handling findings

| topic | status | rows |
|---|---|---|
| Field sealing stores plain text when no key ring is set; legacy rows need the script; passport number, date of birth, address never sealed | OPEN | R029, R209 |
| `tfn_norm` plain copy | FIXED in the script; live column unknown | INFRA-01-F01 row |
| WhatsApp access token stored in clear text in `will_settings`; read only by key | ACCEPTED | R070 |
| WhatsApp connect screen used a plain text input for the token | FIXED | SITE-01-F12 row |
| Fixed temporary password for the customer signing account in two knowledge answers and the guard's allow rule | OPEN (HIGH) | R135, R088 |
| Release secret scanner lacks six newer variable names | OPEN (decided fix not in the tree) | R053 |
| `.gitignore` lacked audit folders | FIXED | R052 |
| Two Meta account identifiers in a handover document; business bank details and agent number in fixtures | ACCEPTED (not secrets) | TESTS-01-F05 row |
| Business bank details hard-coded in code | ACCEPTED: it is a control, a tampered setting cannot redirect payments | R070 |
| Mock model allowed by an environment variable | ACCEPTED (explicit opt-in); confirm it is absent in production | WILL-03-F11 row, R209 |

### Logging of secrets

- `safeErr` never returns details, hints or stacks and masks digit runs and emails. `openField` logs column and row id only.
- The WhatsApp connect audit row records ids, never the token.

## HYPOTHESES

- If the field-encryption keys were set after some rows were written, the table holds a mix of sealed and plain values until the sealing script is run.

## UNVERIFIED ASSUMPTIONS

- Secrets are long, random, unique per environment and never shared between preview and production.
- Key rotation for `FIELD_ENC_KEYS` works as the key-ring code reads; no rotation was performed.
- No secret has ever been committed to a repository. There is no git history in this copy to check.

## NOT TESTED

- Decryption of sealed rows, tamper detection, token expiry and signature rejection were not exercised. Tests for malformed sealed values are proposed in file 18.
