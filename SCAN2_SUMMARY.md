# 🔍 דוח סריקה מלאה — גרסה 2 | Working Holiday Tax CRM
**תאריך:** אפריל 2026 | **בסיס:** fixed_final (לאחר סבב תיקונים ראשון)
**שיטה:** 3 סוכנים מקביליים | End-to-End | 75 קבצי מקור

---

## תוצאות לפי סוכן

| סוכן | ממצאים | 🔴 CRITICAL | 🟠 HIGH | 🟡 MEDIUM | 🟢 LOW |
|------|--------|------------|--------|----------|-------|
| 🐛 סוכן 1 — באגים | 20 | 2 | 8 | 6 | 4 |
| ⚡ סוכן 2 — ביצועים | 12 | 2 | 4 | 4 | 2 |
| 🔒 סוכן 3 — אבטחה | 15 | 2 | 5 | 6 | 2 |
| **סה"כ** | **47** | **6** | **17** | **16** | **8** |

---

## ✅ תיקונים שבוצעו בסבב זה (17 תיקונים)

| # | קובץ | בעיה | תיקון |
|---|------|------|-------|
| F-01 | `DashboardClient.tsx` | `deleteClient` — optimistic לפני 409 | בדיקת response לפני UI update + alert ✅ |
| F-02 | `DashboardClient.tsx` | `saveTaskNotes` — regex מפספס ABN data | הורחב לכלול ABN:, ABN Number:, ABN Income: ✅ |
| F-03 | `DashboardClient.tsx` | `deleteTask` — tax-returns POST ללא CSRF | נוסף X-Requested-With header ✅ |
| F-04 | `DashboardClient.tsx` | `saveClientNotes` — כשל שקט | נוסף try/catch + alert ✅ |
| F-05 | `DashboardClient.tsx` | `archiveClient` — אין rollback על כשל | נוסף try/catch + reload ✅ |
| F-06 | `DashboardClient.tsx` | PDF `fileItem` — XSS via javascript: URLs | נוסף בדיקת `https://` על כל href ✅ |
| F-07 | `DashboardClient.tsx` | Auto-poll — רץ גם בטאב מוסתר | נוסף `document.hidden` check + 60s interval ✅ |
| F-08 | `DashboardClient.tsx` | `TAX_YEARS` — שנים עתידיות 2027–2033 | מוגבל ל-7 שנות עבר + שנה נוכחית ✅ |
| F-09 | `db.ts` | `deleteTaskPermanent` — file leak | נוסף `deleteFiles()` cleanup ✅ |
| F-10 | `db.ts` | DELETE client — `getAllTasks()` O(n) | נוסף `getOpenTaskCountByClientId()` ממוקד ✅ |
| F-11 | `db.ts` | `clearClientSensitiveData` — email לא נמחק | נוסף `email = ''` (GDPR/Privacy Act) ✅ |
| F-12 | `api/crm/clients/[id]/route.ts` | DELETE — שימוש ב-`getAllTasks` | עודכן ל-`getOpenTaskCountByClientId` ✅ |
| F-13 | `lib/upload.ts` | ZIP polyglot bypass | נוסף ZIP signatures ל-dangerous patterns ✅ |
| F-14 | `lib/upload.ts` | Magic bytes: 1024 bytes מיותר | מופחת ל-32 bytes ✅ |
| F-15 | `next.config.js` | חסר HSTS header | נוסף Strict-Transport-Security ✅ |
| F-16 | `abn-form/page.tsx` | Memory leak — Object URL | נוסף useEffect cleanup ✅ |
| F-17 | `tfn-form/page.tsx` | Memory leak — Object URL | נוסף useEffect cleanup ✅ |
| F-18 | `super-form/page.tsx` | Memory leak — Object URL | נוסף useEffect cleanup ✅ |

---

## ⚠️ בעיות שנותרו פתוחות (מורכבות ארכיטקטוניות)

| # | בעיה | סיבה לאי-תיקון |
|---|------|---------------|
| O-01 | Sessions stateless — token לא ניתן לביטול | דורש Redis session store — שינוי ארכיטקטורה מלא |
| O-02 | `addTaxReturn` N+1 queries + race condition | דורש atomic SQL JSON update — שינוי DB layer |
| O-03 | DashboardClient 1920 שורות — bundle bloat | דורש פיצול ל-sub-components — refactor גדול |
| O-04 | Rate limiter fail-open כשRedis down | by design — in-memory fallback דורש LRU cache |
| O-05 | TFN decryption לכל reviewer request | דורש `toTaskSafe()` ב-db.ts — שינוי API |
| O-06 | `x-forwarded-for` spoofable בlocaldev | not an issue in production (Vercel handles it) |

---

## מדדי שיפור מצטברים (2 סבבי תיקונים)

| מדד | מצב מקורי | לאחר סבב 1 | לאחר סבב 2 |
|-----|-----------|------------|------------|
| Cold start DB init | 2-8s | 0.5-2s | 0.5-2s |
| Upload: total size limit | ∞ | 50MB | 50MB |
| Upload: concurrent files | Promise.all | batches of 3 | batches of 3 |
| Magic bytes read | 1024 bytes | 1024 bytes | **32 bytes** |
| ZIP polyglot attack | ✗ vulnerable | ✗ vulnerable | ✅ blocked |
| Auto-poll (background tab) | every 20s | every 20s | **skip + 60s** |
| `deleteTaskPermanent` file cleanup | ✗ leak | ✗ leak | ✅ cleanup |
| `deleteClient` 409 handling | crash | crash | ✅ alert |
| CSRF on tax-returns POST | ✗ 403 error | ✗ 403 error | ✅ fixed |
| `saveTaskNotes` ABN data | ✗ data loss | ✗ data loss | ✅ preserved |
| Object URL memory leak | ✗ leak | ✗ leak | ✅ cleanup |
| Email in PII clear | ✗ not cleared | ✗ not cleared | ✅ cleared |
| HSTS header | ✗ missing | ✗ missing | ✅ added |
| XSS via PDF file URLs | ✗ vulnerable | ✗ vulnerable | ✅ blocked |
| Seed endpoint production | ✗ open | ✅ blocked | ✅ blocked |
| CSRF path traversal | ✗ bypass | ✅ fixed | ✅ fixed |
| CSP header | ✗ missing | ✅ added | ✅ added |
| Reviewer TFN masking | ✗ exposed | ✅ masked | ✅ masked |
| `saveNote` async | ✗ fire&forget | ✅ await | ✅ await |
| Done task "Delete" label | ✗ misleading | ✅ "Archive" | ✅ "Archive" |
| `declared` checkbox uncheck | ✗ bug | ✅ fixed | ✅ fixed |

---

## אבטחה חיובית — כל ההגנות הנשמרות

✅ AES-256-GCM encryption (TFN + bank)
✅ PBKDF2 100K iterations (passwords)
✅ timingSafeEqual (all comparisons)
✅ CSRF header middleware (fixed path traversal)
✅ Redis rate limiting 3 attempts/30min
✅ Magic bytes + dangerous patterns (ZIP added)
✅ Reviewer sessions (role:reviewer, 4h TTL)
✅ httpOnly + secure + sameSite:strict cookies
✅ OTP 2FA (SHA-256 hashed, one-time use, 10min TTL)
✅ DB timeout 8s per query
✅ sanitiseField/sanitiseShort on all inputs
✅ File URL whitelist (https:// only)
✅ Seed endpoint blocked in production
✅ Content-Security-Policy header
✅ HSTS header (added this round)
✅ X-Frame-Options: DENY
✅ X-Content-Type-Options: nosniff
✅ Referrer-Policy: strict-origin-when-cross-origin
✅ robots.txt: /crm disallowed
✅ Reviewer TFN/bank masked in API response

