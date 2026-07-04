# 🚀 Migrating from Vercel Storage to Supabase - Full Guide

The site moved from Vercel Postgres + Vercel Blob to **Supabase** (free + more flexible).

This is a step-by-step guide. Follow it in order.

---

# 📋 Part 1: Setting up Supabase (new)

## Step 1.1: Create a project (5 minutes)

1. Log in: https://supabase.com/dashboard
2. **"New project"**
3. Details:
   - **Name:** `working-holiday-tax`
   - **Database Password:** choose a strong one and save it (you'll need it)
   - **Region:** `Southeast Asia (Singapore)` or `Asia Pacific (Sydney)` - closest to Australia
4. **"Create new project"**
5. Wait 1-2 minutes for the project to be ready

## Step 1.2: Create the tables

1. In the Dashboard click **SQL Editor** (`</>` icon on the left)
2. **"New query"**
3. Open the file `supabase/migrations/001_init_crm.sql` in your code
4. **Copy all the content**
5. **Paste** into the SQL Editor
6. **Run** (green button in the bottom right corner, or `Ctrl+Enter`)
7. ✅ You should see: "Success. No rows returned"

### 1.2.1: Migration 002 - Stats RPC (required for scale!)

⚠️ **You must also run the second migration** - without it the Dashboard won't scale to 5,000+ clients:

1. SQL Editor → **"New query"**
2. Open `supabase/migrations/002_dashboard_stats.sql`
3. **Copy and paste**
4. **Run**
5. ✅ "Success. No rows returned"
6. Test (optional): `SELECT get_dashboard_stats('2024-25', '2023-24');`
   - Should return JSON with all the statistics

## Step 1.3: Create a Storage Bucket

1. In the Dashboard click **Storage** (folder icon)
2. **"New bucket"**
3. Settings:
   - **Name:** `uploads`
   - ☑ **Public bucket** (required!)
   - **File size limit:** `10 MB`
   - **Allowed MIME types:** `image/jpeg, image/png, image/webp, image/gif, application/pdf`
4. **"Save"**

## Step 1.4: Copy the keys

In the Dashboard → **Settings** (gear icon) → **API**:

Copy 2 values:

```
Project URL:      https://xxxxxxxxxxx.supabase.co
service_role key: eyJhbGc...  (long secret key)
```

⚠️ **Very important:**
- `service_role` is a **secret**! Never expose it on the client/frontend!
- If it leaks - immediately create a new one at Settings → API → Reset

---

# 📋 Part 2: Vercel Configuration (existing)

## Step 2.1: Update environment variables

1. Log in to Vercel: https://vercel.com/dashboard
2. **Select your project** (workingholidaytax)
3. **Settings** → **Environment Variables**

### A. Add new variables:

| Variable name | Value |
|----------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | the URL from Supabase (step 1.4) |
| `SUPABASE_SERVICE_ROLE_KEY` | the Service Role Key (step 1.4) |

For each one:
- **Add Another**
- Variable name
- Value
- **Production / Preview / Development** (select all)
- **Save**

### B. Delete old variables (Vercel Storage):

Click the `...` next to each of these and remove it:

- ❌ `POSTGRES_URL`
- ❌ `POSTGRES_PRISMA_URL`
- ❌ `POSTGRES_URL_NO_SSL`
- ❌ `POSTGRES_URL_NON_POOLING`
- ❌ `POSTGRES_USER`
- ❌ `POSTGRES_HOST`
- ❌ `POSTGRES_PASSWORD`
- ❌ `POSTGRES_DATABASE`
- ❌ `BLOB_READ_WRITE_TOKEN`

⚠️ **Do not delete:** `JWT_SECRET`, `CRM_PASSWORD`, `RESEND_API_KEY`, `REDIS_URL`, `REVIEWER_SALT`, and everything else.

## Step 2.2: Disconnect Vercel Storage Integrations

### A. Disconnect Vercel Postgres:

1. **Storage** (top bar in the Dashboard)
2. Select your Postgres database
3. **Settings** (tab)
4. Scroll down → **"Disconnect Project"**
5. ✅ Confirm

The DB will still remain in your Storage - you can **delete** it entirely:
- In Storage → the DB → **Settings** → **Delete Database**
- ⚠️ This permanently deletes the data! Make sure you've migrated the data first (Part 4 below).

### B. Disconnect Vercel Blob:

1. **Storage** → select the Blob store
2. **Settings** → **"Disconnect Project"**
3. You can also **delete** the Blob store (after confirming there are no important files)

### C. Optional - Redis:

If you're using **Vercel KV (Redis)** - **keep it!** The site still uses Redis for OTP and rate limiting.

If you want to migrate Redis too - switch to **Upstash** (free):
- https://upstash.com
- Create a Redis database
- Copy the `UPSTASH_REDIS_URL`
- Update `REDIS_URL` in Vercel

## Step 2.3: Redeploy

1. **Deployments** (tab)
2. The most recent deployment → `...` → **"Redeploy"**
3. ✅ **"Use existing Build Cache"** = OFF (for a clean build)
4. **Redeploy**

Wait 2-3 minutes for the build.

---

# 📋 Part 3: Deploying the new code

## Step 3.1: Via Git

```bash
cd /path/to/site-updated
git add .
git commit -m "Migrate from Vercel Storage to Supabase"
git push
```

Vercel will auto-deploy.

## Step 3.2: Without Git (Manual Upload)

1. In the Vercel Dashboard → **Settings** → **Git** → see the repo
2. Update the code on GitHub/GitLab
3. Vercel will detect it and deploy

---

# 📋 Part 4: Importing data from Vercel Postgres (optional)

⚠️ Do this **before** deleting the old DB!

## Export from Vercel:

1. Vercel Dashboard → **Storage** → the Postgres DB → **Data**
2. You'll see the tables `crm_clients` and `crm_tasks`
3. In each table → **Export** → CSV

## Import into Supabase:

1. Supabase Dashboard → **Table Editor** → `crm_clients`
2. **"Insert"** → **"Import data from CSV"**
3. Select the CSV you exported
4. Confirm
5. Repeat the same for `crm_tasks`

---

# 📋 Part 5: Post-migration checks

## Check 1: The site loads

```
https://workingholidaytax.com.au
```

Should load without errors.

## Check 2: TFN form

1. Go to: `/tfn-form`
2. Fill out the form
3. Upload a passport photo (test)
4. Submit
5. ✅ A success confirmation should appear

## Check 3: CRM Dashboard

1. Go to: `/crm/login`
2. CRM password
3. ✅ You should see the new submission
4. Check that you can view the uploaded file

## Check 4: Supabase Dashboard

In Supabase → **Table Editor** → `crm_tasks`:
- ✅ The new row should appear

In Supabase → **Storage** → `uploads`:
- ✅ The file you uploaded should appear

---

# 💰 Cost comparison

| | Vercel | Supabase (Free) |
|--|--------|-----------------|
| Database | $20-25/month | Free (500MB) |
| Storage | $0.15/GB | Free (1GB) |
| API calls | Limited | 50K/month free |
| Backups | Pro plan only | Automatic |

**Savings:** ~$25-30/month = ~$300/year 💰

---

# 🆘 Common issues

## "Missing env var: NEXT_PUBLIC_SUPABASE_URL"
→ Did you set the variable in Vercel? Check Settings → Environment Variables.

## "Upload failed"
→ In Supabase, did you create the `uploads` bucket as **Public**? Check in Storage.

## "Refusing to fetch" (CSP error)
→ The new code already has the correct CSP. But if you still get an error - check Vercel → Deployments → Latest → look in the logs.

## You want to go back to Vercel Storage
→ It's complicated but possible. Keep a backup of the CSV from Vercel **before** you delete it.

---

# ✅ Summary

After completing all the steps:
- ✅ The site runs on Supabase
- ✅ Vercel Storage disconnected and deleted
- ✅ ENV vars updated
- ✅ CSP supports Supabase domains
- ✅ File uploads work
- ✅ CRM works

Success! 🎉
