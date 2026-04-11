# 🔍 דוח סריקה מלאה — Working Holiday Tax CRM
**תאריך:** אפריל 2026 | **גרסה:** crm_forms_final_v3 | **שיטה:** 3 סוכנים מקביליים, End-to-End

---

## תוצאות לפי סוכן

| סוכן | ממצאים כלליים | קריטי | HIGH | MEDIUM | LOW |
|------|--------------|-------|------|--------|-----|
| 🔴 סוכן 1 — באגים | 15 | 1 | 4 | 5 | 4 |
| ⚡ סוכן 2 — ביצועים | 10 | 1 | 4 | 4 | 1 |
| 🔒 סוכן 3 — אבטחה | 15 | 1 | 3 | 7 | 4 |
| **סה"כ** | **40** | **3** | **11** | **16** | **9** |

---

## תיקונים שבוצעו בגרסה זו

| # | קובץ | בעיה | סטטוס |
|---|------|------|-------|
| F-01 | `api/crm/seed/route.ts` | Seed endpoint ללא auth — חסימה ב-production + דרישת session | ✅ תוקן |
| F-02 | `middleware.ts` | CSRF path traversal bypass — תוקן לבדיקת exact + trailing slash | ✅ תוקן |
| F-03 | `reviewer/ReviewerClient.tsx` | `saveNote` לא await — spinner מנוקה לפני תגובה | ✅ תוקן |
| F-04 | `reviewer/ReviewerClient.tsx` | אין feedback ויזואלי על כשל saveNote | ✅ תוקן |
| F-05 | `dashboard/DashboardClient.tsx` | כפתור "Delete" ב-Done tasks — שם מטעה (בפועל Archive) | ✅ תוקן → "📁 Archive" |
| F-06 | `dashboard/DashboardClient.tsx` | מודל "Delete & archive" — שם מטעה | ✅ תוקן → "Archive to Clients" |
| F-07 | `tax-form/page.tsx` | `declared` checkbox uncheck מחזיר `''` במקום `'no'` | ✅ תוקן |
| F-08 | `lib/upload.ts` | אין מגבלת גודל כוללת (total) לקבצים | ✅ תוקן → 50MB cap |
| F-09 | `lib/upload.ts` | `Promise.all` על כל הקבצים — risk of OOM/timeout | ✅ תוקן → batches of 3 |
| F-10 | `lib/db.ts` | ALTER TABLE queries סדרתיות — cold start איטי | ✅ תוקן → parallel batch |
| F-11 | `lib/encrypt.ts` | `getKey()` allocates Buffer על כל קריאה | ✅ תוקן → cached key |
| F-12 | `api/crm/clients/[id]/route.ts` | DELETE client ללא בדיקת open tasks (orphan records) | ✅ תוקן → 409 אם יש tasks |
| F-13 | `crm/client/[id]/ClientPageClient.tsx` | `saveNotes` ללא error handling | ✅ תוקן |
| F-14 | `next.config.js` | חסר Content-Security-Policy header | ✅ תוקן → CSP מלא |

---

## בעיות שנותרו פתוחות (ידועות, דורשות החלטה עסקית)

| # | בעיה | סיבה |
|---|------|------|
| O-01 | Sessions stateless — לא ניתן לביטול token גנוב | דורש Redis session store — שינוי ארכיטקטורה גדול |
| O-02 | addTaxReturn/Super — race condition ב-concurrent edits | נדיר בתנועה נמוכה; תיקון דורש SQL CTE |
| O-03 | Rate limiter: fail-open כשRedis down | על פי תכנון (לא לחסום משתמשים); ניתן להוסיף in-memory fallback |
| O-04 | addTaxReturn: החלפת שנה קיימת ללא אזהרה | דורש UI modal לאישור — לא נגע בקוד הטופס |
| O-05 | howHeard חסר ב-ABN/TFN/Super forms | החלטה עסקית: להוסיף שדה או להסיר מה-DB |
| O-06 | PDF generation: notes לא מה-escaped | PDFs אינם מוצגים ב-browser (Blob download) — סיכון נמוך |

---

## מדדי שיפור צפויים לאחר תיקונים

| מדד | לפני | אחרי |
|-----|------|------|
| Cold start (initDb) | 2–8 שניות | 0.5–2 שניות |
| 10 קבצים × 10MB upload | timeout / OOM | ~15 שניות מסודר |
| Reviewer saveNote — כשל רשת | משתמש לא יודע | הודעת שגיאה מיידית |
| Done task "Delete" | מבצע Archive — מבלבל | ברור: "📁 Archive" |
| מחיקת לקוח עם tasks פתוחים | מחיקה שקטה | 409 עם הסבר |
| CSRF bypass via path prefix | אפשרי | חסום |
| Seed endpoint בפרודקשן | פתוח לכל | חסום (403) |
| Content-Security-Policy | חסר | מלא |

---

## ממצאי אבטחה חיוביים (נשמרים)

✅ AES-256-GCM encryption על TFN ו-bank details  
✅ PBKDF2 (100,000 iterations) לסיסמאות  
✅ timingSafeEqual על כל hash comparisons  
✅ CSRF protection עם custom header  
✅ Rate limiting ב-Redis (3 attempts, 30min lockout)  
✅ Magic bytes + dangerous patterns validation על uploads  
✅ Reviewer sessions נפרדות עם role claim  
✅ httpOnly + secure + sameSite:strict cookies  
✅ OTP 2FA לכניסת admin  
✅ DB timeout (8s) על כל query  
✅ sanitiseField / sanitiseShort על כל inputs  

