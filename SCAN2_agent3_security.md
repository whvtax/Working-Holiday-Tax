# 🔒 סוכן 3 — דוח אבטחה מלא
**תאריך:** אפריל 2026 | **גרסה:** fixed_final | **שיטה:** OWASP Top 10, ASVS L2, סריקה מלאה

---

## טבלת סיכום

| # | רכיב | חומרה | קטגוריה | OWASP |
|---|------|--------|----------|-------|
| S-01 | `api/crm/tasks/route.ts` | 🔴 CRITICAL | Info disclosure | TFN/bank נשלח לreviewer ב-decrypted form (לפני masking) |
| S-02 | `DashboardClient.tsx` | 🔴 CRITICAL | XSS | `downloadTaskPdf`: HTML injection ב-PDF — esc() לא מגן מספיק |
| S-03 | `crm-store.ts` | 🟠 HIGH | Auth bypass | Session token: iat validation לא מגן מ-future tokens (clock drift) |
| S-04 | `api/crm/login` | 🟠 HIGH | Timing oracle | `hashPassword` + `timingSafeEqual` — אבל catch מוחזר מהר → timing diff |
| S-05 | `upload.ts` | 🟠 HIGH | File upload | ZIP polyglot: קובץ ZIP שמוצהר כ-PDF עובר validation |
| S-06 | `DashboardClient.tsx` | 🟠 HIGH | Sensitive data | `downloadTaskPdf` שולח TFN + bank ב-plain HTML לב-blob URL הנשמר בזיכרון |
| S-07 | `api/crm/clients/[id]/notes` | 🟠 HIGH | Direct DB write | PATCH notes → `sql` ישיר ב-route (לא דרך db.ts abstraction) |
| S-08 | `vercel.json` | 🟡 MEDIUM | Headers | HSTS header חסר (Strict-Transport-Security) |
| S-09 | `crm-store.ts` | 🟡 MEDIUM | Session | JWT secret ב-Buffer — אין key rotation mechanism |
| S-10 | `middleware.ts` | 🟡 MEDIUM | CSRF | GET /api/crm/tasks לא מוגן — enumeration אפשרי אם cookie נגנב |
| S-11 | `api/super-form` | 🟡 MEDIUM | Data validation | `superFunds` field: אין validation על content — עשוי להכיל URLs |
| S-12 | `api/crm/seed` | 🟡 MEDIUM | Auth | seed עדיין נגיש בdev mode ללא הגנה מספקת |
| S-13 | `get-ip.ts` | 🟡 MEDIUM | IP spoofing | `x-forwarded-for` last entry בlocaldev עלול להיות spoofed |
| S-14 | `db.ts` | 🟡 MEDIUM | PII retention | `clearClientSensitiveData` לא מוחק email — email נחשב PII |
| S-15 | `ReviewerClient.tsx` | 🟢 LOW | Info leak | Error messages חושפים stack traces ל-console ב-production |

---

## 🔴 CRITICAL

### S-01 — TFN/Bank: decryption מתבצע לפני reviewer masking
**קובץ:** `api/crm/tasks/route.ts`

```ts
async function getTasks() {
  const { getAllTasks } = await import('@/lib/db')
  return await getAllTasks()  // ← toTask() מפענח TFN + bank לכל task
}

export async function GET(req: NextRequest) {
  const tasks = await getTasks()  // ← כל 500 tasks כבר מפוענחים ב-RAM
  const isReviewerOnly = !validateSession(req.cookies.get('crm_session')?.value)
  const safeTasks = isReviewerOnly
    ? tasks.map(t => ({ ...t, tfn: '••••••••••', bankDetails: '••• redacted •••' }))
    : tasks
}
```

**בעיה:** `getAllTasks()` → `toTask()` → `decryptField(tfn)` לכל task, אפילו אם Reviewer לא צריך את זה. ה-decrypted data קיים ב-RAM של serverless function. אם יש logging/error tracking (Sentry, Datadog) — מסוכן שה-TFN יופיע ב-logs.

**תיקון:**
```ts
// db.ts: הוסף toTaskSafe שלא מפענח
function toTaskSafe(r: Record<string,unknown>): TaskSafe {
  return { ...toTask(r), tfn: '', bankDetails: '' }  // never decrypt
}

export async function getAllTasksForReviewer(): Promise<TaskSafe[]> {
  const { rows } = await sql`SELECT * FROM crm_tasks ORDER BY submitted_at DESC LIMIT 500`
  return rows.map(toTaskSafe)
}
```

---

### S-02 — downloadTaskPdf: XSS דרך task data
**קובץ:** `DashboardClient.tsx` — `downloadTaskPdf` function

```ts
const esc = (s: string) => (s||'—')
  .replace(/&/g,'&amp;')
  .replace(/</g,'&lt;')
  .replace(/>/g,'&gt;')
  .replace(/"/g,'&quot;')
  .replace(/'/g,'&#x27;')
```

נראה בטוח — אבל:

```ts
const html = `...
<a href="${esc(url)}" style="...">View ↗</a>  // ← url הוא Blob URL מה-DB
`
```

**attack vector:** אם Blob URL מ-DB מכיל `javascript:` (לא נבדק מספיק ב-upload validation) → XSS ב-popup window.

יתרה מכך:
```ts
const blob = new Blob([html], { type: 'text/html' })
const win  = window.open(url, '_blank')
```

ה-PDF HTML נפתח כ-`text/html` ב-window — כלומר JavaScript יכול לרוץ בתוכו. אם `task.notes` מכיל HTML שלא עבר `esc()` — XSS.

**בדיקה:** `task.notes` מגיע מה-DB ועובר דרך `esc()`. אבל `task.taxStatus`, `task.primaryJob`, `task.marital` — כולם עוברים `esc()`. **הסיכון האמיתי:** `fileUrls` שמגיעים מה-DB לא עוברים validation מחדש ב-downloadTaskPdf — רק מוצגים ישירות ב-`href`.

**תיקון:** הוסף validation על URLs בPDF:
```ts
const safeUrl = (url: string) => url.startsWith('https://') ? esc(url) : '#'
```

---

## 🟠 HIGH

### S-03 — Session: iat validation לא מגן מ-clock skew
**קובץ:** `crm-store.ts`

```ts
if (iat && now - iat > SESSION_TTL + 60_000) return false
```

בדיקה זו מגינה מ-tokens ישנים אבל **לא** מ-tokens שנוצרו בעתיד (clock skew שלילי). אם שרת אחד מחזיר זמן עתידי ב-1ms, token שנוצר שם ייכשל ב-iat check.

### S-05 — ZIP polyglot bypass
**קובץ:** `upload.ts`

```ts
const DANGEROUS_PATTERNS = [
  [0x3C, 0x3F, 0x70, 0x68, 0x70],  // <?php
  [0x3C, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74], // <script
  [0x7F, 0x45, 0x4C, 0x46],   // ELF
  [0x4D, 0x5A],               // PE
  // ZIP: [0x50, 0x4B, 0x03, 0x04] — חסר!
]
```

PDF חוקי שמשוקע בתוכו ZIP archive (polyglot file) יעבור את כל הבדיקות:
- PDF magic bytes: `%PDF` ✓
- אין PHP/script/ELF/PE ✓
- ZIP bytes אינם ב-dangerous patterns ✗

**תיקון:** הוסף ZIP ל-DANGEROUS_PATTERNS:
```ts
[0x50, 0x4B, 0x03, 0x04],  // ZIP
[0x50, 0x4B, 0x05, 0x06],  // ZIP (empty)
```

### S-06 — TFN + Bank ב-plain HTML blob בזיכרון
**קובץ:** `DashboardClient.tsx`

```ts
const html = `...
  ${field('TFN 🔒', task.tfn)}       // ← TFN ב-plain text
  ${field('Bank 🔒', task.bankDetails)}  // ← bank ב-plain text
...`
const blob = new Blob([html], { type: 'text/html' })
const url  = URL.createObjectURL(blob)
window.open(url, '_blank')
// ← URL + Blob נשארים בזיכרון ב-browser עד לסגירת tab
```

TFN ו-bank details מופיעים ב-plain text ב-Blob שנשמר בזיכרון. אם מישהו מקבל גישה ל-browser memory dump — הנתונים חשופים.

### S-07 — notes route: SQL ישיר ב-route handler
**קובץ:** `api/crm/clients/[id]/notes/route.ts`

```ts
import { sql } from '@vercel/postgres'
await sql`UPDATE crm_clients SET notes = ${notes} WHERE id = ${params.id}`
```

בניגוד לשאר ה-routes שמשתמשים ב-`db.ts` abstraction, route זה מריץ SQL ישיר. Vercel Postgres משתמש ב-tagged template literals (parameterized) — אז אין SQL injection. אבל הביקורתיות: `params.id` לא עובר validation (format check). אפשרי שID לא תקין יצור unexpected behavior.

---

## 🟡 MEDIUM

### S-08 — חסר HSTS Header
**קובץ:** `next.config.js`

```js
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // ... אין HSTS!
]
```

**תיקון:** הוסף:
```js
{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' }
```

### S-11 — superFunds: אין validation על content
**קובץ:** `api/super-form/route.ts`

```ts
formData.get('superFunds') ? `Super Funds: ${sanitiseField(formData.get('superFunds'))}` : ''
```

`sanitiseField` מסיר HTML tags אבל לא URLs. משתמש יכול להזין URL לאתר זדוני שיופיע ב-notes ב-CRM.

### S-13 — x-forwarded-for: spoofable בlocaldev
**קובץ:** `get-ip.ts`

```ts
const forwarded = req.headers.get('x-forwarded-for')
// ...
const last = parts[parts.length - 1]  // "last" entry בlocaldev
```

ב-Vercel production, `x-vercel-forwarded-for` נלקח קודם (מאובטח). אבל בdevelopment, attacker יכול לזייף IP ע"י הוספת header. Rate limiting לא יעיל בdevelopment.

### S-14 — clearClientSensitiveData: email לא נמחק
**קובץ:** `db.ts`

```ts
await sql`
  UPDATE crm_tasks SET
    address='', tfn='', bank_details='', primary_job='', marital='', au_phone='', file_urls='[]'
  WHERE client_id = ${id}
`
```

Email נשאר שמור — email נחשב PII תחת GDPR/Privacy Act האוסטרלי. לפי הפונקציונליות (PII clearance) — email צריך להימחק.

---

## 🟢 LOW

### S-15 — Console logs עם sensitive info ב-production
```ts
} catch(e){ console.error('[loadTasks]',e) }
```

ב-Vercel, console.error מתועד ב-Function Logs. אם `e` מכיל task data (שמכיל TFN) — נתונים רגישים עלולים להיות ב-logs.

---

## ✅ ממצאים חיוביים (אבטחה טובה)

✅ AES-256-GCM encryption על TFN + bank (מלא)
✅ PBKDF2 100K iterations על passwords
✅ timingSafeEqual בכל comparisons
✅ CSRF custom header + middleware
✅ Redis rate limiting (3 attempts/30min)
✅ Magic bytes + dangerous patterns validation
✅ Separate reviewer sessions (role claim)
✅ httpOnly + secure + sameSite:strict cookies
✅ OTP 2FA (SHA-256 hash ב-Redis, one-time use)
✅ DB timeouts (8s)
✅ sanitiseField/sanitiseShort על כל inputs
✅ File URL whitelist (https:// only)
✅ Seed endpoint חסום ב-production ✅ (תוקן)
✅ CSRF path traversal תוקן ✅
✅ CSP header נוסף ✅
✅ Reviewer TFN masking (partial) ✅

