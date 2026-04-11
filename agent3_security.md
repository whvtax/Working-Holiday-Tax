# 🔒 סוכן 3 — דוח אבטחה ופרצות
**תאריך:** אפריל 2026 | **שיטה:** OWASP Top 10, ASVS Level 2, סריקת קוד מלאה

---

## סיכום מנהלים

| # | רכיב | חומרה | קטגוריה | OWASP |
|---|------|--------|----------|-------|
| S-01 | `api/crm/tasks/route.ts` | 🔴 CRITICAL | Reviewer רואה TFN/bank | A01 |
| S-02 | `crm-store.ts` | 🟠 HIGH | Session stateless — אי-אפשר לבטל token | A07 |
| S-03 | `api/crm/seed/route.ts` | 🟠 HIGH | Seed endpoint פתוח ללא auth | A01 |
| S-04 | `middleware.ts` | 🟠 HIGH | CSRF exempt list — path traversal attack | A05 |
| S-05 | `upload.ts` | 🟠 HIGH | Magic bytes: GIF ב-WEBP slot | A03 |
| S-06 | `crm-store.ts` | 🟡 MEDIUM | Session payload לא encrypted — info leak | A02 |
| S-07 | `encrypt.ts` | 🟡 MEDIUM | Key derivation: getKey() קורא process.env כל פעם | A02 |
| S-08 | `api/crm/login/route.ts` | 🟡 MEDIUM | Timing oracle: password hash comparison | A07 |
| S-09 | `rate-limit.ts` | 🟡 MEDIUM | Fail-open — Redis timeout עוקף rate limit | A05 |
| S-10 | `middleware.ts` | 🟡 MEDIUM | CSRF header לא מאומת על GET /api/crm/clients (enum) | A05 |
| S-11 | `db.ts` | 🟡 MEDIUM | notes field: 10,000 תווים ללא sanitization | A03 |
| S-12 | Various forms | 🟡 MEDIUM | howHeard, taxYear — לא מאומתים ב-server | A03 |
| S-13 | `vercel.json` | 🟡 MEDIUM | CSP חסר (אין Content-Security-Policy header) | A05 |
| S-14 | `api/crm/clients/[id]/route.ts` | 🟢 LOW | DELETE client — לא בודק ownership | A01 |
| S-15 | `sitemap.ts` / `robots.ts` | 🟢 LOW | /crm/dashboard לא ב-robots.txt Disallow | A05 |

---

## 🔴 CRITICAL

### S-01 — Reviewer קיבל גישה ל-TFN ו-bankDetails (תוקן חלקית)
**קובץ:** `api/crm/tasks/route.ts`

**מצב נוכחי (תוקן):**
```ts
const safeTasks = isReviewerOnly
  ? tasks.map(t => ({ ...t, tfn: '••••••••••', bankDetails: '••• redacted •••' }))
  : tasks
```

**בעיה שנותרה:** הנתונים עדיין מגיעים מ-`toTask()` שמפענח את ה-TFN/bank לפני שהם מוחלפים. זה נכון מבחינת רשת, אבל ה-decryption מתבצע גם כשלא צריך — עלות מיותרת + סיכון שאם הlog/error reporting מדפיס את ה-task object לפני ה-masking, יודפסו נתונים רגישים.

**תיקון מוצע:**
```ts
// הרץ decryption רק על admin sessions
async function getTasks(isReviewerOnly: boolean) {
  const rows = await getAllTasksRaw()  // ללא decryption
  if (isReviewerOnly) return rows.map(toTaskSafe)  // never decrypt
  return rows.map(toTask)  // decrypt only for admin
}
```

---

## 🟠 HIGH

### S-02 — Sessions stateless: אי-אפשר לבטל session (logout = cookie delete בלבד)
**קובץ:** `crm-store.ts` — `createSession()`, `destroySession()`

```ts
export function destroySession() { /* stateless — cookie cleared client-side */ }
```

**בעיה:** אם session token נגנב (XSS, network sniff), לא ניתן לבטל אותו. Token תקף 8 שעות ויש לו גישה מלאה לכל ה-CRM כולל TFN/bank של לקוחות.

**תיקון:** Redis-based session store — שמור token hash ב-Redis עם TTL. `logout()` מוחק מ-Redis. `validateSession()` בודק Redis.

### S-03 — `/api/crm/seed` — endpoint פתוח ללא authentication
**קובץ:** `api/crm/seed/route.ts`

```ts
export async function POST() {
  // ← אין auth check!
  const { seedDb } = await import('@/lib/seed')
  await seedDb()
  return NextResponse.json({ ok: true })
}
```

**סיכון:** כל מי שיודע על ה-endpoint יכול לאפס את ה-DB ולמלא אותו בנתוני seed. **השמד עתה בפרודקשן.**

**תיקון מיידי:**
```ts
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') 
    return NextResponse.json({ ok: false }, { status: 403 })
  const auth = validateSession(req.cookies.get('crm_session')?.value)
  if (!auth) return NextResponse.json({ ok: false }, { status: 401 })
  ...
}
```

### S-04 — CSRF exempt list: path prefix attack
**קובץ:** `middleware.ts`

```ts
const CSRF_EXEMPT = [
  '/api/abn-form',
  '/api/super-form',
  ...
]
// בדיקה:
!CSRF_EXEMPT.some(p => pathname.startsWith(p))
```

**attack vector:** אם תווסף route בעתיד `/api/abn-form-admin` היא תהיה אוטומטית פטורה מ-CSRF כי `pathname.startsWith('/api/abn-form')` יחזיר true.

**תיקון:**
```ts
!CSRF_EXEMPT.some(p => pathname === p || pathname.startsWith(p + '/'))
```

### S-05 — Magic bytes validation: WEBP מבלבל עם GIF
**קובץ:** `upload.ts` שורה 28

```ts
// GIF: 47 49 46 38 — "GIF8"
{ mime: 'image/gif', offset: 0, bytes: [0x47, 0x49, 0x46, 0x38] },
// WEBP: 52 49 46 46 (?? ?? ?? ??) 57 45 42 50
{ mime: 'image/webp', offset: 0, bytes: [0x52, 0x49, 0x46, 0x46] },
```

GIF file עם MIME type `image/webp` יעבור את בדיקת ה-RIFF header אבל ייכשל בבדיקת ה-WEBP marker — זה נכון. אבל קובץ GIF שמוצהר כ-`image/gif` עם content שמתחיל ב-RIFF יעבור — edge case שיש לבדוק.

**גדול יותר:** קובץ PDF חוקי עם `<script>` ב-metadata יחמוק כי `containsDangerousPattern` בודק רק 512 בייטים ראשונים, אבל metadata ב-PDF יכול להיות בכל מקום.

---

## 🟡 MEDIUM

### S-06 — Session payload לא מוצפן — JWT-like token חשוף
**קובץ:** `crm-store.ts` שורה 58

```ts
const payload = Buffer.from(JSON.stringify({ iat, exp })).toString('base64url')
```

ה-payload הוא base64url גלוי (לא encrypted) עם timestamp. מישהו שמוצא cookie יכול לראות מתי Session נוצר ומתי פג תוקפו. לא נתונים רגישים, אבל info leak.

### S-07 — `getKey()` קורא process.env על כל פעולת הצפנה
**קובץ:** `encrypt.ts` שורה 14

```ts
function getKey(): Buffer {
  const hex = process.env.FIELD_ENCRYPTION_KEY
  // ← אין caching → Buffer.from על כל encrypt/decrypt call
  return Buffer.from(hex, 'hex')
}
```

**תיקון:** Cache את ה-key buffer:
```ts
let _key: Buffer | null = null
function getKey(): Buffer {
  return (_key ??= Buffer.from(process.env.FIELD_ENCRYPTION_KEY!, 'hex'))
}
```

### S-08 — Login: timing side-channel על hash comparison
**קובץ:** `crm-store.ts` שורה 17-23

```ts
export function verifyPassword(password: string, hash: string): boolean {
  try {
    const attempt = hashPassword(password)  // ~100ms (PBKDF2)
    return crypto.timingSafeEqual(...)      // ✓ timing-safe comparison
  } catch { return false }
}
```

**ניתוח:** `timingSafeEqual` מגן על comparison, אבל אם `hashPassword` נכשל (salt חסר) → `catch → false` מוחזר מיידית בלי 100ms delay → attacker יכול לזהות "password processed" vs "error" by timing. בסיכון נמוך (salt env var כנראה תמיד קיים) אבל לתשומת לב.

### S-09 — Rate limiter: fail-open — Redis timeout עוקף הגנה
**קובץ:** `rate-limit.ts`

```ts
} catch (err) {
  return false // fail open — never block legit users due to Redis issues
}
```

אם Redis לא זמין (timeout, restart), rate limiter מאשר **כל** בקשה. attackers יכולים לגרום ל-Redis DoS ואז לשלוח unlimited requests.

**תיקון:** Fallback ל-in-memory counter (LRU cache) כשRedis לא זמין.

### S-11 — notes field: 10,000 תווים ללא XSS sanitization
**קובץ:** `db.ts` + API routes

Notes field מוגבל ל-10,000 תווים אבל לא מסנן HTML. אם notes מוצגות ב-dangerouslySetInnerHTML (לא זוהה בקוד הנוכחי) — XSS.  
**מצב נוכחי:** מוצגות ב-React JSX (בטוח). אבל: `downloadTaskPdf` מכניס notes לתוך HTML string בלי escape — XSS ב-PDF generation.

### S-13 — CSP חסר
**קובץ:** `next.config.js` / `vercel.json`

אין `Content-Security-Policy` header. אם XSS נמצא, אין הגנה שניה. יש `X-Frame-Options` ב-next.config? לא נבדק — יש להוסיף.

```js
// next.config.js — להוסיף:
headers: [{ key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline'" }]
```

---

## 🟢 LOW

### S-14 — DELETE /api/crm/clients/[id] — Insecure Direct Object Reference
**קובץ:** `api/crm/clients/[id]/route.ts`

כל admin session יכול למחוק **כל** לקוח לפי ID. בסביבה single-admin זה בסדר. אבל אם בעתיד יהיו מספר admins — IDOR.

### S-15 — robots.txt לא מסתיר /crm
**קובץ:** `robots.ts`

```ts
// אין Disallow: /crm/
```

Google יאנדקס את `/crm` (אם לא מוגן). הדף עצמו דורש auth — אבל URL קיומו נחשף.

---

## ממצאים חיוביים (סיכום אבטחה טובה)

✅ AES-256-GCM encryption על TFN ו-bankDetails  
✅ PBKDF2 (100,000 iterations) לסיסמאות  
✅ timingSafeEqual על hash comparison  
✅ CSRF protection עם custom header  
✅ Rate limiting ב-Redis (3 attempts, 30min lockout)  
✅ Magic bytes validation על uploads  
✅ Dangerous patterns detection (PHP, ELF, PE)  
✅ sanitiseField / sanitiseShort על inputs  
✅ OTP flow ל-2FA  
✅ Reviewer sessions נפרדות (role: 'reviewer')  
✅ httpOnly + secure + sameSite: strict cookies  
✅ File URLs validated (must start with https://)  
✅ File type whitelist  
✅ DB timeout (8s) על כל query  

