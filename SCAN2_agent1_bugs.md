# 🔴 סוכן 1 — דוח איתור באגים מלא
**תאריך:** אפריל 2026 | **גרסה:** fixed_final | **כיסוי:** כל 75 קבצי המקור

---

## טבלת סיכום

| # | קובץ | חומרה | קטגוריה | תיאור קצר |
|---|------|--------|----------|-----------|
| B-01 | `DashboardClient.tsx` | 🔴 CRITICAL | לוגיקת קריסה | `deleteClient` — אופטימיסטי לפני בדיקת 409 |
| B-02 | `DashboardClient.tsx` | 🔴 CRITICAL | Data loss | `saveTaskNotes` — regex לא תופס כל סוגי structured data |
| B-03 | `api/tax-form/upload` | 🟠 HIGH | Edge case | WEBP magic bytes: חסר בדיקת bytes[8..11] = WEBP |
| B-04 | `DashboardClient.tsx` | 🟠 HIGH | UX bug | `archiveClient` — optimistic update לפני API; אין rollback על כשל |
| B-05 | `DashboardClient.tsx` | 🟠 HIGH | Logic error | `addClient` — POST ל-`/api/crm/tasks` ללא `X-Requested-With` → CSRF 403 |
| B-06 | `DashboardClient.tsx` | 🟠 HIGH | Logic error | `deleteTask` — POST ל-`/api/crm/clients/[id]/tax-returns` ללא CSRF header |
| B-07 | `ReviewerClient.tsx` | 🟠 HIGH | UI race | setStatus optimistic update עם auto-poll — status יכול להתאפס |
| B-08 | `tax-form/page.tsx` | 🟠 HIGH | UX | submit button נשאר `disabled={loading}` — אחרי optimistic submit לא חוזר ל-enabled |
| B-09 | `db.ts` | 🟠 HIGH | Orphan data | `deleteTaskPermanent` לא מוחק fileUrls מ-Blob storage |
| B-10 | `api/crm/clients/[id]/route.ts` | 🟠 HIGH | Logic error | DELETE: בדיקת open tasks קוראת `getAllTasks()` — O(n) על כל delete |
| B-11 | `DashboardClient.tsx` | 🟡 MEDIUM | UX | `saveClientNotes` — אין error handling; כשל שקט |
| B-12 | `DashboardClient.tsx` | 🟡 MEDIUM | Edge case | TAX_YEARS: שנים עתידיות (CY+7) מופיעות ב-dropdown בלי validation |
| B-13 | `crm-store.ts` | 🟡 MEDIUM | Logic | `validateSession` — `iat` check מאפשר token שנוצר בעתיד (clock skew) |
| B-14 | `upload.ts` | 🟡 MEDIUM | Edge case | `containsDangerousPattern`: לא בודק ZIP headers (0x50 0x4B) — ZIP יכול לעבור |
| B-15 | `api/crm/review/route.ts` | 🟡 MEDIUM | Logic | `note` ו-`status` ניתן לשלוח ביחד — מסתיר שגיאה אם `status` invalid אבל `note` תקין |
| B-16 | `DashboardClient.tsx` | 🟡 MEDIUM | UX | `removeTaxReturn` / `removeSuperReturn` — אין confirmation modal; מחיקה מיידית |
| B-17 | `abn-form/page.tsx` | 🟡 MEDIUM | UX | `submit-btn` disabled רק על `!declared || !terms` — אין validation לפני disabled |
| B-18 | `db.ts` | 🟡 MEDIUM | SQL injection risk | `extractUserNotes` regex: אם structured part מכיל `|` — parse שגוי |
| B-19 | `ReviewerClient.tsx` | 🟢 LOW | Memory leak | `URL.createObjectURL` אינו מנוקה בסיום session |
| B-20 | `super-form/page.tsx` | 🟢 LOW | UX | `homeAddress` field מקבל כתובת בית אבל label אומר "Current address in Australia" |

---

## 🔴 CRITICAL

### B-01 — deleteClient: אופטימיסטי לפני תגובת 409 מהשרת
**קובץ:** `DashboardClient.tsx` שורות 295-300

```ts
async function deleteClient(id:string) {
  setArchivedClients(prev => prev.filter(c => c.id !== id))  // ← לקוח נמחק מה-UI
  setActiveClient(null); setView('archive'); setConfirmDeleteClient(null)
  await fetch(`/api/crm/clients/${id}`,{method:'DELETE',...})  // ← API עשוי להחזיר 409
  await loadClients()  // ← ה-reload מחזיר את הלקוח, אבל state UI כבר השתנה
}
```

**תרחיש:** לקוח עם tasks פתוחים → UI מסיר אותו → API מחזיר 409 → `loadClients()` מחזיר אותו → אבל `setView('archive')` ו-`setActiveClient(null)` כבר בוצעו → המשתמש עבר לתצוגה אחרת עם אין הודעת שגיאה.

**תיקון:**
```ts
async function deleteClient(id:string) {
  setConfirmDeleteClient(null)
  try {
    const res = await fetch(`/api/crm/clients/${id}`,{method:'DELETE',headers:{'X-Requested-With':'XMLHttpRequest'}})
    const data = await res.json()
    if (!res.ok) {
      if (res.status === 409) alert(`Cannot delete: client has ${data.count} open task(s). Archive tasks first.`)
      else alert('Delete failed. Please try again.')
      return
    }
    setArchivedClients(prev => prev.filter(c => c.id !== id))
    setActiveClient(null); setView('archive')
  } catch {
    alert('Delete failed. Please try again.')
  }
  await loadClients()
}
```

---

### B-02 — saveTaskNotes: regex מפספס structured parts → data loss
**קובץ:** `DashboardClient.tsx` שורות 230-240

```ts
const structuredParts = (activeTask.notes||'').split(' | ').filter(p =>
  p.match(/^(Passport No:|Super Funds:|Home Country Address:|Gender:|→|I confirm|I declare|I have read|Working Holiday)/i)
)
```

**בעיה:** Notes שמגיעים מה-forms כוללים גם prefixes כמו:
- `ABN: Yes` — לא תופס
- `ABN Number: 123456789` — לא תופס  
- `ABN Income: $5000` — לא תופס
- `Tax status text...` — לא תופס

כשמנהל שומר notes, כל הdata הזה **נמחק לצמיתות**.

**תיקון:** הוסף לרשימה:
```ts
p.match(/^(Passport No:|Super Funds:|Home Country Address:|Gender:|→|I confirm|I declare|I have read|Working Holiday|ABN:|ABN Number:|ABN Income:|Tax status)/i)
```

---

## 🟠 HIGH

### B-05 — addClient: חסר CSRF header → 403 Forbidden
**קובץ:** `DashboardClient.tsx` שורה 310

```ts
await fetch('/api/crm/tasks',{method:'POST',
  headers:{'Content-Type':'application/json'},  // ← חסר X-Requested-With!
  body:JSON.stringify({...})
})
```

המידלוור דורש `X-Requested-With: XMLHttpRequest` על כל POST. הוספת לקוח ידנית תחזיר **403 CSRF error** ולא תיצור task.

**תיקון:** הוסף `'X-Requested-With':'XMLHttpRequest'` ל-headers.

---

### B-06 — deleteTask: tax-returns POST חסר CSRF header
**קובץ:** `DashboardClient.tsx` שורות 272-283

```ts
await fetch(`/api/crm/clients/${refundData.clientId}/tax-returns`, {
  method: 'POST',
  headers: {'Content-Type':'application/json'},  // ← חסר X-Requested-With!
  body: JSON.stringify({...})
})
```

שמירת refund data בעת archive יחזיר 403. שנה תשלום לא נשמר.

---

### B-07 — ReviewerClient: auto-poll מאפס status אחרי Approve/Reject
**קובץ:** `ReviewerClient.tsx` שורות 510-530

```ts
// Auto-poll כל 20s מחזיר server state:
setTasks(prev => {
  const localById = new Map(prev.map(t => [t.id, t]))
  return active.map((t: Task) => {
    const local = localById.get(t.id)
    if (local && local.reviewStatus !== 'pending') return { ...t, reviewStatus: local.reviewStatus }
    return t  // ← אם server החזיר pending (race: reviewer הרגע החליט)
  })
})
```

**בעיה בעת עומס:** Reviewer לוחץ Approve → setStatus() → API call → בתוך 20s poll מגיע לפני ש-API הספיק לכתוב → server עדיין מחזיר `pending` → merge logic מחזיר את ה-local (approved) — בסדר. אבל אם ה-reviewer סגר ופתח שוב את הכרטיס בין לבין — ה-local map מתאפס.

---

### B-09 — deleteTaskPermanent: fileUrls נשארות ב-Blob storage
**קובץ:** `db.ts` שורה 214

```ts
export async function deleteTaskPermanent(taskId: string): Promise<void> {
  await initDb()
  await sql`DELETE FROM crm_tasks WHERE id = ${taskId}`
  // ← deleteFiles לא נקרא! Files נשארים ב-Vercel Blob לנצח
}
```

בניגוד ל-`markTaskDone` ו-`deleteTaskAndArchive` שמנקים files, `deleteTaskPermanent` לא עושה cleanup.

**תיקון:**
```ts
export async function deleteTaskPermanent(taskId: string): Promise<void> {
  await initDb()
  const task = await getTask(taskId)
  await sql`DELETE FROM crm_tasks WHERE id = ${taskId}`
  if (task?.fileUrls?.length) {
    deleteFiles(task.fileUrls).catch(err => console.error('[deleteTaskPermanent] cleanup failed:', err))
  }
}
```

---

### B-10 — DELETE client: getAllTasks() על כל מחיקה — O(n) בעיית ביצועים
**קובץ:** `api/crm/clients/[id]/route.ts`

```ts
const allTasks = await getAllTasks()  // ← מוריד עד 500 tasks מה-DB
const openTasks = allTasks.filter(t => t.clientId === params.id && !t.done)
```

**תיקון:** הוסף query ממוקד ל-db.ts:
```ts
export async function getOpenTasksByClientId(clientId: string): Promise<Task[]> {
  const { rows } = await sql`SELECT * FROM crm_tasks WHERE client_id = ${clientId} AND done = FALSE`
  return rows.map(toTask)
}
```

---

## 🟡 MEDIUM

### B-11 — saveClientNotes: כשל שקט
```ts
async function saveClientNotes() {
  if(!activeClient) return
  await fetch(`/api/crm/clients/${activeClient.id}`,{...})
  // ← אין בדיקת res.ok, אין error state, אין toast
  setClientNotesSaved(true)
}
```

### B-12 — TAX_YEARS כולל שנים לא תקינות
```ts
const CY = new Date().getFullYear()  // 2026
const TAX_YEARS = Array.from({length:9},(_,i)=>`${CY-2+i}-${String(CY-1+i).slice(2)}`)
// → ['2024-25','2025-26','2026-27','2027-28','2028-29','2029-30','2030-31','2031-32','2032-33']
```
שנות מס עתידיות (2027-28 ועילה) לא קיימות ומבלבלות.

### B-14 — upload.ts: ZIP files יכולים לעבור
`DANGEROUS_PATTERNS` לא כולל ZIP signature (`0x50 0x4B 0x03 0x04`). ZIP עם תוכן מסוכן יכול להיות מועלה אם ה-MIME type שלו הוצהר כ-PDF.

### B-16 — removeTaxReturn/Super: מחיקה ללא אישור
```tsx
<button onClick={()=>removeTaxReturn(r.year)}>×</button>  // ← מחיקה מיידית, ללא confirm
```

---

## 🟢 LOW

### B-19 — Memory leak: Object URLs לא מנוקים
ב-`FileUpload` ב-`abn-form`, `tfn-form`, `super-form` — `URL.createObjectURL` נוצר ב-`handleChange` אבל נמחק רק ב-`handleRemove`. אם המשתמש לא לוחץ Remove (למשל submit) → URL object נשאר בזיכרון.

**תיקון:** הוסף cleanup ב-`useEffect`:
```ts
useEffect(() => () => { if (value.preview) URL.revokeObjectURL(value.preview) }, [value.preview])
```

