# WHV Tax CRM — Setup and Run Instructions

## What was built

A secure CRM system for managing tax refund clients, with:

- **Two-factor login (2FA)** — password + OTP code by email (via Resend)
- **Lockout after 3 attempts** + security alert by email
- **Client dashboard** — Pending / Done tabs
- **Filter by tax year** — 2019-20 through 2024-25
- **Client folder** — all details in a table, editable
- **Delete sensitive details** — keeps only name/DOB/WhatsApp
- **✅ Mark as done** — removes from the pending list

---

## Installation

```bash
cd WHVTAX_WITH_CRM
npm install
cp .env.example .env.local
# fill in the values in .env.local
npm run dev
```

---

## Environment variables (`.env.local`)

```env
# Resend API key for sending emails
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Admin email — OTP codes and security alerts are sent here
CRM_ADMIN_EMAIL=your@email.com

# Admin password (plaintext; it is hashed at runtime with PASSWORD_SALT)
CRM_PASSWORD=

# Salt for password hashing — generate a fresh random value, never reuse one
PASSWORD_SALT=
```

> ### Generating these two values
>
> `PASSWORD_SALT` is the ONE global salt for the ONE admin password, so a salt
> that anyone can read defeats its entire purpose: an attacker can precompute
> hashes for a wordlist offline instead of having to guess online.
>
> This file previously printed a real, fixed salt and a default password. Both
> have been removed and rotated. **Never write either value into a file that
> lives in the repository** — they belong only in the deployment's environment
> variables.
>
> Generate each one separately:
>
> ```bash
> openssl rand -hex 32                                    # macOS / Linux
> ```
> ```powershell
> -join ((1..64) | ForEach-Object { '0123456789abcdef'[(Get-Random -Max 16)] })
> ```
>
> Changing `PASSWORD_SALT` invalidates the existing password hash, so the salt
> and the password must always be rotated **together** — otherwise the next
> login fails and nobody can get in.

---

## CRM routes

| Route | Description |
|------|--------|
| `/crm` | Login page — password + OTP |
| `/crm/dashboard` | Dashboard — client list |
| `/crm/client/[id]` | Client folder — full details |

---

## API Routes

| Method | Path | Description |
|--------|------|--------|
| POST | `/api/crm/login` | Check password + send OTP |
| POST | `/api/crm/verify-otp` | Verify OTP code + create session |
| POST | `/api/crm/logout` | Delete session |
| GET | `/api/crm/session` | Check session validity |
| GET | `/api/crm/clients` | List all clients |
| POST | `/api/crm/clients` | Add a new client |
| GET | `/api/crm/clients/[id]` | Single client details |
| PATCH | `/api/crm/clients/[id]` | Update / mark done / delete details |

---

## Security

- **PBKDF2** (100,000 iterations) for password hashing
- **Timing-safe comparison** to prevent timing attacks
- **HttpOnly cookies** for sessions — not accessible to JavaScript
- **OTP valid for 10 minutes** — single-use
- **30-minute lockout** after 3 failed attempts
- **Session TTL: 8 hours**
- **Nav/Footer hidden** on `/crm/*` routes

---

## Storage in Production

The CRM uses **Supabase** for:
- **PostgreSQL Database** - client and task data
- **Supabase Storage** - files uploaded by clients
- **bcrypt** instead of PBKDF2 (npm install bcryptjs)
