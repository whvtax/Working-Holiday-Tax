# Architecture map: WILL MIA ATLAS

Evidence: source reading and the scripted pass. Diagram in text form.

```
Browser (public sites)  ──►  Next.js pages (static + SSR)
                                   │
Customer forms (signed token) ──► /api/tax-form*, /api/abn-form, /api/tfn-form, /api/super-form
                                   │ service role
Owner browser (/crm, /crm/mia, /crm/atlas)
   │ crm_session cookie (httpOnly, strict)
   ▼
proxy.ts  ──► cross-site guard for /api/crm, /api/will, /api/atlas (and /api/mia after the fix)
   │
   ▼
/api/crm/*  ·  /api/will/*  ·  /api/mia/*  ·  /api/atlas/*
   │
   ├── Will engine (src/lib/will): state machine, templates, scheduler, audit
   │      └── store-supabase.ts ──► Supabase Postgres (service role)
   ├── Mia (src/lib/mia/data.ts): reads and writes SVT rows in will_* tables through Will
   ├── Atlas (src/lib/atlas): model call ──► proposal ──► human Approve ──► /api/will/actions
   └── Uploads (src/lib/upload.ts) ──► Supabase Storage (private, checked at runtime)

Meta WhatsApp  ──► /api/will/webhook (HMAC-SHA256 verified) ──► Will engine
Meta Graph API ◄── outbound sends and template checks (fixed host, paging URLs checked)
Resend (email OTP, alerts)  ◄── /api/crm/login
Redis (rate limits, lockouts, revoked sessions)
Anthropic API ◄── Will and Atlas model calls
```

## Shared code paths
- All Mia mutations go through the Will state machine (`setState`), so stage rules are the same as the CRM.
- Atlas actions are re-sent as requests to `/api/will/actions`, with the owner's cookie and same-origin headers. The owner must press Approve first.
- The CRM dashboard reads Will data through the same store.

## Brand separation
- Brand is a column on the shared tables (`brand = 'wht' | 'svt'`). Routing is by WhatsApp phone number id (`brandForPhoneNumberId`) and by form host. Brand-scoped queries are wrapped in `withBrand`.
