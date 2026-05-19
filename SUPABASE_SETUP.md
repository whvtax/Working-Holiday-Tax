# 🚀 מעבר מ-Vercel Storage ל-Supabase - מדריך מלא

האתר עבר מ-Vercel Postgres + Vercel Blob ל-**Supabase** (חינמי + יותר גמיש).

זה מדריך step-by-step. עקוב לפי הסדר.

---

# 📋 חלק 1: הגדרת Supabase (חדש)

## שלב 1.1: יצירת פרויקט (5 דקות)

1. כניסה: https://supabase.com/dashboard
2. **"New project"**
3. פרטים:
   - **Name:** `working-holiday-tax`
   - **Database Password:** בחר חזקה ושמור (תצטרך אותה)
   - **Region:** `Southeast Asia (Singapore)` או `Asia Pacific (Sydney)` - הכי קרוב לאוסטרליה
4. **"Create new project"**
5. המתנה 1-2 דקות עד שהפרויקט מוכן

## שלב 1.2: יצירת הטבלאות

1. בDashboard לחיצה על **SQL Editor** (אייקון `</>` בצד שמאל)
2. **"New query"**
3. פותח את הקובץ `supabase/migrations/001_init_crm.sql` בקוד שלך
4. **העתק את כל התוכן**
5. **הדבק** ב-SQL Editor
6. **Run** (כפתור ירוק בפינה ימנית למטה, או `Ctrl+Enter`)
7. ✅ אמור להופיע: "Success. No rows returned"

## שלב 1.3: יצירת Storage Bucket

1. בDashboard לחיצה על **Storage** (אייקון תיקייה)
2. **"New bucket"**
3. הגדרות:
   - **Name:** `uploads`
   - ☑ **Public bucket** (חובה!)
   - **File size limit:** `10 MB`
   - **Allowed MIME types:** `image/jpeg, image/png, image/webp, image/gif, application/pdf`
4. **"Save"**

## שלב 1.4: העתקת המפתחות

בDashboard → **Settings** (גלגל שיניים) → **API**:

תעתיק 2 ערכים:

```
Project URL:      https://xxxxxxxxxxx.supabase.co
service_role key: eyJhbGc...  (long secret key)
```

⚠️ **חשוב מאוד:**
- `service_role` הוא **סוד**! אסור לחשוף ב-client/frontend!
- אם דלף - מיד צור חדש ב-Settings → API → Reset

---

# 📋 חלק 2: הגדרת Vercel (קיים)

## שלב 2.1: עדכון משתני סביבה

1. כניסה ל-Vercel: https://vercel.com/dashboard
2. **בחר את הפרויקט שלך** (workingholidaytax)
3. **Settings** → **Environment Variables**

### א. הוסף משתנים חדשים:

| שם משתנה | ערך |
|----------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | ה-URL מ-Supabase (שלב 1.4) |
| `SUPABASE_SERVICE_ROLE_KEY` | ה-Service Role Key (שלב 1.4) |

עבור כל אחד:
- **Add Another**
- שם המשתנה
- ערך
- **Production / Preview / Development** (תבחר את כולם)
- **Save**

### ב. מחק משתנים ישנים (Vercel Storage):

לחיצה על ה-`...` ליד כל אחד מאלה והסרה:

- ❌ `POSTGRES_URL`
- ❌ `POSTGRES_PRISMA_URL`
- ❌ `POSTGRES_URL_NO_SSL`
- ❌ `POSTGRES_URL_NON_POOLING`
- ❌ `POSTGRES_USER`
- ❌ `POSTGRES_HOST`
- ❌ `POSTGRES_PASSWORD`
- ❌ `POSTGRES_DATABASE`
- ❌ `BLOB_READ_WRITE_TOKEN`

⚠️ **לא למחוק:** `JWT_SECRET`, `CRM_PASSWORD`, `RESEND_API_KEY`, `REDIS_URL`, `REVIEWER_SALT`, וכל השאר.

## שלב 2.2: ניתוק Vercel Storage Integrations

### א. ניתוק Vercel Postgres:

1. **Storage** (סרגל עליון בDashboard)
2. בחר את ה-Postgres database שלך
3. **Settings** (טאב)
4. גלילה למטה → **"Disconnect Project"**
5. ✅ אישור

ב-Storage שלך עדיין יישאר ה-DB - תוכל **למחוק** אותו לחלוטין:
- בStorage → ה-DB → **Settings** → **Delete Database**
- ⚠️ זה ימחק את הנתונים לצמיתות! וודא שהעברת נתונים קודם (חלק 4 למטה).

### ב. ניתוק Vercel Blob:

1. **Storage** → בחר את ה-Blob store
2. **Settings** → **"Disconnect Project"**
3. ניתן גם **למחוק** את ה-Blob store (אחרי שוודאת שאין קבצים חשובים)

### ג. אופציונלי - Redis:

אם אתה משתמש ב-**Vercel KV (Redis)** - **השאר אותו!** האתר עדיין משתמש בRedis עבור OTP ו-rate limiting.

אם אתה רוצה להעביר גם את Redis - עבור ל-**Upstash** (חינמי):
- https://upstash.com
- צור Redis database
- העתק את ה-`UPSTASH_REDIS_URL`
- עדכן את `REDIS_URL` ב-Vercel

## שלב 2.3: Redeploy

1. **Deployments** (טאב)
2. הdeployment הכי עדכני → `...` → **"Redeploy"**
3. ✅ **"Use existing Build Cache"** = OFF (לבנייה נקייה)
4. **Redeploy**

המתנה 2-3 דקות לבנייה.

---

# 📋 חלק 3: העלאת הקוד החדש

## שלב 3.1: דרך Git

```bash
cd /path/to/site-updated
git add .
git commit -m "Migrate from Vercel Storage to Supabase"
git push
```

Vercel יעשה auto-deploy.

## שלב 3.2: בלי Git (Manual Upload)

1. ב-Vercel Dashboard → **Settings** → **Git** → ראה את ה-repo
2. עדכן את הקוד ב-GitHub/GitLab
3. Vercel יזהה ויעשה deploy

---

# 📋 חלק 4: ייבוא נתונים מ-Vercel Postgres (אופציונלי)

⚠️ עשה את זה **לפני** שמוחק את ה-DB הישן!

## ייצוא מ-Vercel:

1. Vercel Dashboard → **Storage** → ה-Postgres DB → **Data**
2. תוכל לראות את הטבלאות `crm_clients` ו-`crm_tasks`
3. בכל טבלה → **Export** → CSV

## ייבוא ל-Supabase:

1. Supabase Dashboard → **Table Editor** → `crm_clients`
2. **"Insert"** → **"Import data from CSV"**
3. בחר את הCSV שיצאת
4. אישור
5. חזור על אותו דבר ל-`crm_tasks`

---

# 📋 חלק 5: בדיקות אחרי המעבר

## בדיקה 1: האתר עולה

```
https://workingholidaytax.com.au
```

אמור לעלות בלי שגיאות.

## בדיקה 2: טופס TFN

1. כניסה ל: `/tfn-form`
2. מילוי הטופס
3. העלאת תמונת פספורט (test)
4. שליחה
5. ✅ אמור להופיע אישור הצלחה

## בדיקה 3: CRM Dashboard

1. כניסה ל: `/crm/login`
2. סיסמת CRM
3. ✅ אמור לראות את ההגשה החדשה
4. בדוק שאפשר לראות את הקובץ שהועלה

## בדיקה 4: Supabase Dashboard

ב-Supabase → **Table Editor** → `crm_tasks`:
- ✅ אמורה להופיע השורה החדשה

ב-Supabase → **Storage** → `uploads`:
- ✅ אמור להופיע הקובץ שהעלית

---

# 💰 השוואת עלויות

| | Vercel | Supabase (Free) |
|--|--------|-----------------|
| Database | $20-25/חודש | חינם (500MB) |
| Storage | $0.15/GB | חינם (1GB) |
| API calls | מוגבל | 50K/חודש חינם |
| Backups | בPro plan בלבד | אוטומטי |

**חיסכון:** ~$25-30/חודש = ~$300/שנה 💰

---

# 🆘 בעיות נפוצות

## "Missing env var: NEXT_PUBLIC_SUPABASE_URL"
→ הגדרת את המשתנה ב-Vercel? בדוק ב-Settings → Environment Variables.

## "Upload failed"
→ ב-Supabase, האם יצרת את ה-bucket `uploads` כ-**Public**? בדוק ב-Storage.

## "Refusing to fetch" (CSP error)
→ הקוד החדש כבר עם CSP נכון. אבל אם עדיין שגיאה - בדוק ב-Vercel → Deployments → Latest → לחפש בlogs.

## אתה רוצה לחזור ל-Vercel Storage
→ זה מסובך אבל אפשרי. שמור גיבוי של ה-CSV מ-Vercel **לפני** שתמחק.

---

# ✅ סיכום

לאחר ביצוע כל השלבים:
- ✅ האתר רץ על Supabase
- ✅ Vercel Storage מנותק ומחוק
- ✅ ENV vars מעודכנים
- ✅ CSP תומך ב-Supabase domains
- ✅ העלאות קבצים עובדות
- ✅ CRM פועל

הצלחה! 🎉
