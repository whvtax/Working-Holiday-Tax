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

# Password hash — generate with:
# node -e "const c=require('crypto'); console.log(c.pbkdf2Sync('your_password','whvtax-salt-2024',100000,64,'sha512').toString('hex'))"
CRM_PASSWORD_HASH=

# Salt for hashing (change in production!)
PASSWORD_SALT=whvtax-salt-2024
```

> **Default development password:** `WHVAdmin2024!`
> **Change it before deploying to production!**

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
