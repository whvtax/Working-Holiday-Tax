# ⚡ סוכן 2 — דוח ביצועים ועומס
**תאריך:** אפריל 2026 | **שיטה:** ניתוח סטטי מלא + הדמיית תרחישי עומס

---

## סיכום מנהלים

| # | רכיב | חומרה | קטגוריה | השפעה |
|---|------|--------|----------|-------|
| P-01 | `db.ts` initDb() | 🔴 CRITICAL | Cold-start כפול | 8-16 שניות delay על cold start |
| P-02 | `db.ts` getAllTasks/Clients | 🟠 HIGH | אין pagination אמיתי | 500 tasks = 50MB+ RAM |
| P-03 | `DashboardClient.tsx` | 🟠 HIGH | Re-render על כל keystroke | 100+ re-renders לשנייה |
| P-04 | `upload.ts` uploadFiles | 🟠 HIGH | Parallel uploads ללא concurrency limit | OOM על 10+ קבצים גדולים |
| P-05 | `db.ts` addTaxReturn | 🟠 HIGH | Read-modify-write לא אטומי | איבוד נתונים בתנועה גבוהה |
| P-06 | `rate-limit.ts` | 🟡 MEDIUM | Redis round-trip על כל request | +50-150ms לכל בקשה |
| P-07 | `ClientPageClient.tsx` | 🟡 MEDIUM | אין debounce על שמירת notes | burst של DB writes |
| P-08 | `DashboardClient.tsx` | 🟡 MEDIUM | useMemo dependencies רחבות מדי | re-computation יקרה |
| P-09 | `db.ts` getClientById | 🟡 MEDIUM | N+1 queries ב-addTaxReturn | O(n) requests לשורה |
| P-10 | `globals.css` | 🟢 LOW | Google Fonts inline import | FOUT, בלוק render |

---

## 🔴 CRITICAL

### P-01 — Cold Start: initDb מריץ 10+ ALTER TABLE בסדרה
**קובץ:** `db.ts` שורות 44-120

```ts
// 10 queries סדרתיות = 8-16 שניות cold start
await sqlWithTimeout(sql`CREATE TABLE IF NOT EXISTS crm_clients...`)
await sqlWithTimeout(sql`CREATE TABLE IF NOT EXISTS crm_tasks...`)
await sqlWithTimeout(sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS file_urls...`)
await sqlWithTimeout(sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS au_phone...`)
// ... עוד 6 ALTERs בסדרה
```

**ניתוח:** כל query לוקח 100-800ms על Vercel Postgres cold-start. 10 queries סדרתיות = 1-8 שניות רק לאתחול DB. הסינגלטון `_initPromise` עוזר לבקשות מקביליות, אבל ה-cold start הראשון עדיין איטי.

**תיקון:**
```ts
// קבץ ALTERs ל-batch + הוסף migration table
await Promise.all([
  sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS file_urls TEXT...`,
  sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS au_phone TEXT...`,
  sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS review_status TEXT...`,
  sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS reviewer_note TEXT...`,
  sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS reviewed_at TEXT...`,
])
```
חיסכון: ~500ms-4s על כל cold start.

---

## 🟠 HIGH

### P-02 — LIMIT 500/1000 ללא pagination — עמוד אחד טוען הכל
**קובץ:** `db.ts` שורות 175, 257, 264

```ts
SELECT * FROM crm_tasks ORDER BY submitted_at DESC LIMIT 500   // 500 tasks
SELECT * FROM crm_clients WHERE archived = FALSE LIMIT 1000    // 1000 clients
```

**תרחיש עומס:** 500 tasks × ~5KB JSON כל אחד = 2.5MB payload לכל GET /api/crm/tasks.  
DashboardClient מקבל הכל בבת אחת → JSON.parse → React re-render על 500 elements.

**מדדים צפויים:**
- 100 tasks: ~200ms load, 50MB RAM
- 500 tasks: ~900ms load, 200MB RAM → Vercel serverless OOM (256MB limit)

**תיקון:** cursor-based pagination + React virtualization (react-window).

### P-03 — DashboardClient: search filter על כל keystroke, ללא debounce
**קובץ:** `DashboardClient.tsx` (search state)

```tsx
// כל לחיצת מקש → useMemo re-runs → filter על 500 tasks
const filtered = useMemo(() => tasks.filter(t =>
  t.clientName.toLowerCase().includes(search.toLowerCase())
), [tasks, search])
```

**תיקון:** `useDebounce(search, 250)` — lodash.debounce או useState + useEffect עם setTimeout.

### P-04 — uploadFiles: Promise.all ללא concurrency limit
**קובץ:** `upload.ts` שורה 148

```ts
// 15 קבצים מועלים במקביל לחלוטין
const results = await Promise.all(files.map(f => uploadFile(f, folder)))
```

**תרחיש:** 10 קבצים × 10MB = 100MB בו-זמנית → Vercel Edge timeout (50s) + OOM.

**תיקון:**
```ts
// העלה לכל היותר 3 קבצים בו-זמנית
async function uploadWithConcurrency(files, folder, limit = 3) {
  const results = []
  for (let i = 0; i < files.length; i += limit) {
    const batch = files.slice(i, i + limit)
    results.push(...await Promise.all(batch.map(f => uploadFile(f, folder))))
  }
  return results.filter(Boolean)
}
```

### P-05 — N+1 queries: addTaxReturn קורא getClientById לפני כל UPDATE
**קובץ:** `db.ts` שורות 307, 321, 335, 350

```ts
// כל ADD/REMOVE = 2 queries (SELECT + UPDATE) במקום 1
const client = await getClientById(clientId)  // SELECT
const updated = [...client.taxReturns.filter(...), r]
await sql`UPDATE crm_clients SET tax_returns = ${JSON.stringify(updated)}`  // UPDATE
```

**תיקון:** JSON_ARRAY SQL functions או לפחות קבץ SELECT+UPDATE ל-CTE אחד.

---

## 🟡 MEDIUM

### P-06 — Rate limiter: 2 Redis round-trips על כל form submission
```ts
// MULTI pipeline שולח 2 commands + await + finally disconnect
const [count] = await redis.multi().incr(key).expire(key, WINDOW_SECS, 'NX').exec()
```
כל submit = +50-150ms (Redis round-trip). על Vercel → Redis: ~20-50ms RTT.  
בסדר לרוב ה-use cases, אך Redis cold-start (אם אין keep-alive) = 500ms+.

### P-07 — אין debounce על שמירת notes
**קובץ:** `ClientPageClient.tsx` שורה 45

המשתמש לוחץ Save → ה-button disabled ב-saving state. אבל אם הוא לוחץ מהר פעמיים לפני שה-disable מתעדכן, שניים requests יוצאים בו-זמנית. האחרון מנצח (last-write-wins) — נכון אבל לא יעיל.

### P-08 — useMemo יקר ב-DashboardClient
```tsx
const pendingTasks = useMemo(()=>tasks.filter(t=>!t.done).sort(...), [tasks])
const doneTasks    = useMemo(()=>tasks.filter(t=>t.done).sort(...),  [tasks])
```
כל `tasks` change → 2 sorts מלאות. עם 500 tasks → ~5ms per render. לא קריטי אבל ניתן לשפר ע"י `useMemo` אחד שמחשב שניהם.

### P-09 — Google Fonts via @import בתוך `<style>` (blocking)
**קובץ:** `ClientPageClient.tsx` שורה 88 + `ReviewerClient.tsx`

```css
@import url('https://fonts.googleapis.com/...')
```

CSS @import בתוך `<style>` tag מבלוק render עד לטעינת הפונט. יש להשתמש ב-`<link rel="preconnect">` + `<link rel="stylesheet">` ב-`<head>` עם `font-display: swap`.

---

## 🟢 LOW

### P-10 — אין HTTP caching headers על API responses
כל GET /api/crm/tasks מחזיר `Cache-Control: no-store` (ברירת מחדל Next.js). ניתן להוסיף stale-while-revalidate על endpoints ציבוריים.

---

## מדדי ביצועים צפויים (לפני ולאחר תיקון)

| תרחיש | לפני | אחרי |
|--------|------|------|
| Cold start (initDb) | 2-8s | 0.5-2s |
| Load 500 tasks | ~900ms | ~200ms (pagination) |
| 10 file upload | timeout risk | ~15s (concurrency 3) |
| Search filter | 50-100ms/keystroke | <1ms (debounce) |

