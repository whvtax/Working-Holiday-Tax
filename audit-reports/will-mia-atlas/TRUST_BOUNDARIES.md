# Trust boundaries: WILL MIA ATLAS

| # | Boundary | Who crosses it | Control | Status |
|---|---|---|---|---|
| TB-1 | Public internet → public sites | anyone | static pages, CSP and headers in `next.config.js` | Verified in code |
| TB-2 | Public internet → customer forms | customers | signed form token, upload checks | Verified in code |
| TB-3 | Internet → owner CRM | owner (and attackers) | login via OTP, lockout, session cookie flags, cross-site guard | Verified in code. Cross-site guard now includes Mia |
| TB-4 | Meta → webhook | Meta only | HMAC-SHA256 with `timingSafeEqual` | Verified in code |
| TB-5 | Owner browser → Mia/Atlas APIs | owner | `sessionValid()` on each route | Verified in code for all 12 Mia and Atlas routes |
| TB-6 | Model output → system action | AI proposal | human Approve click in Atlas UI | Verified in code |
| TB-7 | Server → Supabase | server only | service role; key never sent to the browser | Verified in code; live RLS NOT VERIFIED |
| TB-8 | Server → storage | server only | bucket privacy check before upload | Verified in code; live bucket setting NOT VERIFIED |
| TB-9 | Cron/scheduler → engine | scheduler with secret | `cronAuthorized()` | Verified in code |
| TB-10 | Repo → production | developer, CI | CI read-only token, no secrets in CI | Verified in workflow; GitHub settings NOT VERIFIED |

## Boundary risks not yet closed
- TB-3: the owner's email account is the second factor. Its security is outside this code.
- TB-6: a customer message could try to influence the model's proposal (prompt injection). The Approve click limits the damage, but the owner must read the proposal before approving.
