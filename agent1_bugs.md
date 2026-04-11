# 🔴 סוכן 1 — דוח איתור באגים (Frontend + Backend)
**תאריך:** אפריל 2026 | **כיסוי:** End-to-End — כל הקוד, טפסים, API, DB, Auth

---

## סיכום מנהלים

| # | קובץ | חומרה | קטגוריה | סטטוס |
|---|------|--------|----------|-------|
| B-01 | `ReviewerClient.tsx` | 🔴 CRITICAL | UX/עיצוב — saveNote לא await | פתוח |
| B-02 | `tax-form/page.tsx` | 🟠 HIGH | לוגיקה שגויה — declared checkbox | פתוח |
| B-03 | `DashboardClient.tsx` | 🟠 HIGH | "Delete" מבצע Archive — תיוג מטעה | פתוח |
| B-04 | `DashboardClient.tsx` | 🟠 HIGH | PDF Download גלוי על Done tasks | פתוח |
| B-05 | `DashboardClient.tsx` | 🟠 HIGH | Archive מ-detail panel — אין משוב כשל | פתוח |
| B-06 | `api/crm/clients/[id]/route.ts` | 🟠 HIGH | DELETE client ללא בדיקת tasks פתוחים | חדש |
| B-07 | `db.ts` | 🟠 HIGH | addTaxReturn/addSuperReturn — אין הגנה מ-race condition | חדש |
| B-08 | `upload.ts` | 🟡 MEDIUM | אין מגבלת גודל כוללת לכל הקבצים | פתוח |
| B-09 | `ReviewerClient.tsx` | 🟡 MEDIUM | saveNote — אין feedback על כשל רשת | פתוח |
| B-10 | `tax-form/page.tsx` | 🟡 MEDIUM | `declared = ''` (לא 'no') — submit button לא disabled | פתוח |
| B-11 | `DashboardClient.tsx` | 🟡 MEDIUM | Badge לא מציג doneTasks (תוקן חלקית) | בדוק |
| B-12 | `db.ts` | 🟡 MEDIUM | addTaxReturn מחליף שנה קיימת ללא אזהרה | פתוח |
| B-13 | `ClientPageClient.tsx` | 🟢 LOW | Client type חסר taxReturns/superReturns | חדש |
| B-14 | Various forms | 🟢 LOW | howHeard חסר ב-ABN/TFN/Super forms | פתוח |
| B-15 | `sitemap.ts` | 🟢 LOW | Sitemap לא כולל /crm (נכון), אך חסר /calculator | חדש |

---

## 🔴 CRITICAL

### B-01 — `saveNote` לא מחכה לתגובה — spinner מתנקה לפני שהשרת ענה
**קובץ:** `ReviewerClient.tsx` שורה 551  

```ts
// בעיה: fetch ללא await — finally רץ מיד, לפני שהרשת הגיבה
async function saveNote(taskId: string, note: string) {
  setSavingNote(taskId)
  fetch('/api/crm/review', { ... })
    .catch(console.error)
    .finally(() => setSavingNote(null))  // ← רץ תוך אלפיות שנייה
}
```

**תיקון:**
```ts
async function saveNote(taskId: string, note: string) {
  setSavingNote(taskId)
  try {
    const res = await fetch('/api/crm/review', { ... })
    if (!res.ok) throw new Error('Server error')
  } catch {
    setSaveNoteError('Failed to save note. Please try again.')
  } finally {
    setSavingNote(null)
  }
}
```

---

## 🟠 HIGH

### B-02 — Declared checkbox: uncheck מחזיר `''` אבל submit לא נחסם
**קובץ:** `tax-form/page.tsx` שורה 584

המשתמש מסמן "I agree" → מבטל → מנסה לשלוח → שגיאת validation מוצגת → גולל למעלה ושולח שנית → הטופס עדיין נשלח בהצלחה (כי React state לא רוענן נכון).

**שורש הבעיה:** 
```tsx
onChange={e => setDeclared(e.target.checked ? 'yes' : '')}  // '' במקום 'no'
```

### B-03 — כפתור "Delete" ב-Done tasks מבצע Archive (לא מחיקה)
**קובץ:** `DashboardClient.tsx` שורות 889, 1810

`action: 'delete'` → `deleteTaskAndArchive` → יוצר כרטיס לקוח. זה לא מחיקה.

### B-04 — "Download PDF" גלוי על Done tasks
**קובץ:** `DashboardClient.tsx` שורה 1211

כשמשימה מסומנת Done, כל הנתונים הרגישים נמחקים מה-DB. הכפתור נשאר גלוי ומוריד PDF עם `—` בכל שדה. מטעה.

### B-05 — Archive לקוח מ-detail panel: פאנל נסגר מיד ואין feedback על כשל
**קובץ:** `ClientPageClient.tsx`

`setActiveClient(null)` נקרא סינכרונית לפני `await archiveClient`. אם ה-API נכשל — המשתמש לא מקבל הודעה.

### B-06 — DELETE client לא בודק אם יש tasks פתוחים
**קובץ:** `api/crm/clients/[id]/route.ts`

ניתן למחוק לקוח עם tasks פתוחים (pending). ה-tasks נשארים ב-DB עם `client_id` שלא קיים יותר — orphan records.

### B-07 — race condition ב-addTaxReturn / addSuperReturn
**קובץ:** `db.ts` שורות 307, 321

```ts
// קריאה ועדכון לא אטומיים — שני requests במקביל יכולים לאבד נתונים
const client = await getClientById(clientId)   // READ
const updated = [...client.taxReturns.filter(...), r]
await sql`UPDATE ... SET tax_returns = ${JSON.stringify(updated)}` // WRITE
```

---

## 🟡 MEDIUM

### B-08 — אין מגבלת גודל כוללת להעלאת קבצים
**קובץ:** `upload.ts`

כל קובץ מוגבל ל-10MB. אין מגבלה על הסכום הכולל. 15 קבצים × 10MB = 150MB timeout.

### B-09 — saveNote אין feedback ויזואלי על כשל
אם Redis לא זמין → API מחזיר 500 → `.catch(console.error)` בולע השגיאה → המשתמש רואה שה-Save עבר, בפועל לא.

### B-10 — declared = '' במקום 'no'
**תיקון:** `setDeclared(e.target.checked ? 'yes' : 'no')`

### B-12 — addTaxReturn מחליף שנה קיימת ללא אישור
`.filter(x => x.year !== r.year)` → שנה כפולה מוחלפת בשקט.

---

## 🟢 LOW

### B-13 — ClientPageClient.tsx: type חסר taxReturns
Type `Client` מקומי חסר `taxReturns`, `superReturns`, `tfnService`, `abnService` — שדות שקיימים ב-DB ומוחזרים מה-API.

### B-15 — Sitemap חסר /calculator
`sitemap.ts` לא כולל את דף ה-Calculator.

---

## המלצות לסדר עדיפויות

1. B-01 — תיקון saveNote ל-async/await עם error state
2. B-06 — הוסף בדיקת tasks פתוחים לפני DELETE client
3. B-09 — הצג toast על כשל saveNote
4. B-03 — שנה תיוג "Delete" ל-"Move to Clients"
5. B-04 — הסתר Download PDF על Done tasks
6. B-10 — תקן declared checkbox ל-'no' בביטול
7. B-08 — הוסף מגבלת 50MB כוללת לקבצים
