# דוח ביקורת-על מאוחד — WHVTAX — 29 באוגוסט 2026 (ריצה שלישית)
פאנל של 10 מומחים: אבטחה • ביצועים • קוד מת • אמינות • ארכיטקטורה • SEO • עיצוב/UX • צפיפות מובייל • זרימת מובייל • קופירייטינג/פסיכולוגיה

## היקף, מתודולוגיה ומגבלות
- **מה נבדק:** כל 10 התחומים רצו בפועל במקביל (Task), כל אחד קרא את הגדרת הסוכן שלו וביצע קריאת-קוד אמיתית בשלוש השפות (en, de, ja).
- **שיטה:** ביקורת קוד סטטית (Read/Grep/Glob) — לא pentest חי, לא רינדור אמיתי בדפדפן, לא מדידת Core Web Vitals בשטח. ממצאי מובייל/ביצועים מסומנים ברמת ודאות (ראה כל ממצא).
- **בסיס השוואה:** `MASTER_AUDIT_REPORT_2026-08-29.md` (הריצה הקודמת, ציון-על 3.6). ראה סעיף מעקב רגרסיה.
- **שכבת קווים אדומים:** עברה. אף המלצה לא מציעה לשנות/להזיז את "Reviewed and signed off by a registered tax agent", לא מרמזת שהעסק עצמו הוא סוכן מס רשום, ולא נוגעת בתוכן מס מהותי. שני הסוכנים שנגעו קרוב (SEO, קופי) **דחו את הממצא מיוזמתם** וסימנו אותו לבדיקה משפטית בלבד — הבקרה עבדה. אף מקף (— / –) לא מוצע בשום נוסח.

## תקציר מנהלים — כרטיס בגרות מאוחד

| # | תחום | ציון (1-5) | קודם (29.8) | הממצא שהכי מוריד |
|---|---|---|---|---|
| 1 | אבטחה | 4.0 | 3.9 | תלות ב-`X-Real-IP` מול brute-force על סיסמת CRM משותפת |
| 2 | ביצועים | 4.2 | 3.8 | 2 אינדקסים חסרים בנתיב ה-change-token (כל 15ש) |
| 3 | קוד מת | 3.5 | 3.5 | ~130 שורות CSS de/ja מת + דיאלוג ארכוב בלתי-נגיש |
| 4 | אמינות | 4.4 | 3.6 | אין backoff ל-429 מ-WhatsApp |
| 5 | ארכיטקטורה | 2.8 | 3.2 | שכפול i18n מלא (~75 דפים + 27k שורות ×3) |
| 6 | SEO | 4.0 | 3.9 | ייחוס חותמת TPB ב-Footer (לבדיקה משפטית) |
| 7 | עיצוב | 4.2 | 2.9 | הוי הירוק ~1.9:1 — כמעט בלתי-נראה |
| 8 | צפיפות מובייל | 4.5 | 3.4 | בלוק Guides ב-de/ja נשאר grid-cols-2 |
| 9 | זרימת מובייל | 4.0 | 3.7 | כפתור הסרת מסמך 30px בטפסי tfn/abn/super |
| 10 | קופי | 4.6 | 3.4 | subhead myGov ב-EN כבד מ-de/ja |

**ציון-על כללי: 4.0 / 5** (עלייה מ-3.6) — **רמת פרודקשן, מוכן ברובו לסקייל.** שני התחומים החלשים: **ארכיטקטורה (2.8)** ו-**קוד מת (3.5)**.

הערה על ארכיטקטורה (2.8 מול 3.2): לא רגרסיה אמיתית — הסוכן השנה ניקד את שכפול ה-i18n (~75 דפים ×3, קיים מאז ומעולם) בחומרה גבוהה יותר. החוב לא גדל, רק נמדד קשה יותר.

## מעקב רגרסיה — כל 5 הממצאים חוצי-התחומים המובילים מהריצה הקודמת **נסגרו** ✅

| ממצא קודם (Top-5) | סטטוס | עדות |
|---|---|---|
| הערבות ללא scope TFN ב-22 דפים, כל השפות | ✅ נסגר | סוכן הקופי לא מצא ממצא ערבות השנה |
| התאמת טופס→Will סורקת כל הטבלה ב-JS | ✅ נסגר | perf/resilience/arch לא דיווחו; `findCustomerByPhone` אינדקסי |
| `FOLLOWUP_MODE` מוגדר demo כברירת מחדל | ✅ נסגר | אמינות לא דיווחה; `schedulerConfig` הפוך (wantsDemo) |
| CSP nonce כבוי | ✅ נסגר | אבטחה לא דיווחה על CSP-off; ברירת מחדל דלוקה |
| דפי מדריך אנגליים עם schema חלש | ✅ נסגר | SEO לא דיווחה; blog קיבל articleBody/citation/mentions |

**זו תוצאת רגרסיה חזקה: 5/5 מהחוסמים המובילים נסגרו, וציון-העל עלה 3.6→4.0.** התחומים שקפצו הכי הרבה: אמינות (3.6→4.4), קופי (3.4→4.6), צפיפות (3.4→4.5), עיצוב (2.9→4.2), ביצועים (3.8→4.2).

## רשימת "עצור הכל" (Blockers) — CRITICAL/HIGH מכל 10 התחומים

**CRITICAL:** 0.

**HIGH:**
1. **ביצועים — 2 אינדקסים חסרים בנתיב החם.** `will_messages.created_at` ו-`will_customers.state_changed_at` לא מאונדקסים; ה-change-token (`version/route.ts:15-16`) שנקרא כל 15ש לכל טאב מריץ 2 סריקות טבלה מלאות. תיקון: 2 שורות SQL. (ודאות גבוהה)
2. **ביצועים — חיפוש ILIKE ללא pg_trgm.** `searchCustomers` (`store-supabase.ts:302-315`) מריץ עד 6 סריקות רצף מקבילות עם wildcard מוביל. תיקון: `pg_trgm` + GIN, או חיפוש טלפוני prefix.
3. **אמינות — אין backoff ל-429 מ-WhatsApp.** `channel.ts:148-175` לא מזהה 429; צרור נודניקים בבוקר עמוס מציף tasks ללא התאוששות אוטומטית.
4. **ארכיטקטורה — שכפול i18n מלא.** ~75 דפים ×3 + 27k שורות blog-data ×3; מס תחזוקה מובנה + drift בין שפות.
5. **ארכיטקטורה — `actions/route.ts` fat controller (689 ש', 25 cases).** לוגיקה עסקית inline בנתיב הרגיש ביותר.
6. **עיצוב — הוי הירוק כמעט בלתי-נראה.** `#7cc6a4` על לבן ~1.9:1 (`will-scoped.css:218`), מתחת ל-3:1. **מתח מול בקשת המשתמש** (ראה סינתזה).
7. **זרימת מובייל — כפתור הסרת מסמך 30px** בטפסי tfn/abn/super (`tfn:398`, `abn:369`, `super:399`) — תיקון ה-44px של tax-form לא הופץ.
8. **SEO — ייחוס חותמת TPB ב-Footer** (`Footer.tsx:187-195`) — **לבדיקה משפטית בלבד, לא תיקון עצמי.**

## סינתזה חוצת-תחומים

### טופ 5 ממצאים חוצי-תחומים
1. **שכבת ה-DB בסקייל (perf + arch + resilience):** אינדקסים חסרים + חיפוש ללא trgm + OFFSET pagination + 6 ספירות per-state ב-`/state`. כולם מתכנסים לצוואר בקבוק אחד — עומס Supabase מצטבר בסקייל 5000+. quick-win עם ההשפעה הגבוהה ביותר: 2 האינדקסים.
2. **תבנית ה"תיקון ליד הבעיה" ממשיכה בשוליים (dead-code + mobile-flow + mobile-density):** file-remove 44px תוקן ב-tax-form ולא בשלושת האחים; בלוק Guides תוקן ב-en ולא ב-de/ja; `<main>` מקונן ברוחב הדפים. הדפוס פחת מאוד מהריצה הקודמת אבל לא נעלם.
3. **צבעי מותג/ירוקים מחוץ לטוקנים (design):** `#7cc6a4` (fu-tick), hex ב-hero, שלושה ירוקים באותה עמודה — עקביות מערכת.
4. **CRM לא מכוסה בטסטים (arch + security):** `db.ts` (846 ש') ו-`crm-store.ts` (auth/session) כמעט ללא טסטים, בעוד בוט Will מכוסה מצוין.
5. **E-E-A-T/אמון (seo + design):** ייחוס חותמת TPB + פער About + 3 גדלי חותמת — כולם נוגעים בתפיסת האמון של אתר YMYL.

### מתחים בין המלצות (חשוב)
- **הוי הירוק:** המשתמש (Jo) ביקש במפורש לרכך את הצבע כי היה "חזק מדי" — ושיניתי ל-`#7cc6a4`. סוכן העיצוב מסמן שעכשיו הוא **כמעט בלתי-נראה** (1.9:1). **המלצה מאוזנת:** לבחור ירוק-אמצע שהוא גם רך וגם קריא — למשל `#4aa872`/`--done` (~3.0:1), שמשביע את שתי הדרישות. זו החלטת המשתמש הסופית.
- **About E-E-A-T:** SEO ממליץ להוסיף `#supervising-agent` ל-schema של About, אבל זה מתנגש עם כלל עסקי מפורש של Jo (החותמת מוסתרת ב-About). ההמלצה מותנית באישור Jo, schema בלבד, ללא טקסט גלוי.

## חלק א׳ — הנדסה וטכני

### 1. אבטחה (4.0/5)
0 CRITICAL/HIGH. **MEDIUM:** אמון ב-`X-Real-IP` הוא load-bearing מול brute-force על סיסמת CRM משותפת (`get-ip.ts:84-97` → `login/route.ts:47-53`) — עוקף lockout/rate-limit אם ה-origin נגיש ישירות. **LOW:** escaping JSON-LD לא-עקבי (~15 מופעים, כרגע לא נצול כי הנתונים סטטיים); סיסמת CRM משותפת יחידה (Repudiation); CSRF Origin-check לא אחיד ב-CRM routes. **INFO:** מודל אמון "I paid" — החלטה עסקית מודעת. **חזק:** webhook (HMAC constant-time, idempotency, rate-limit), endpoints חדשים search/chats (sessionValid + escaping פרמטרי — ללא injection), upload (magic-bytes, allowlist), policy-guard fail-closed.

### 2. ביצועים (4.2/5)
**HIGH:** 2 אינדקסים חסרים בנתיב change-token; חיפוש ILIKE ללא pg_trgm (עד 6 סריקות). **MEDIUM:** `/state` טוען עד 1000 שורות מלאות + כל ה-tasks (כולל RESOLVED, `listTasks` ללא סינון); 6 ספירות COUNT per-state (מומלץ COUNT יחיד GROUP BY); `listChatPage` OFFSET → O(offset) בדפים עמוקים (מומלץ keyset — המבנה כבר מוכן). **LOW:** `listTemplates()` בלולאת scheduler; `<img>` גולמי (תמונות קטנות, השפעה זניחה). **חזק:** Server Components בכל השיווק, ISR בבלוג, scheduler מתוכנן לסקייל (caps, claim אטומי, head-counts).

### 3. קוד מת (3.5/5)
0 קבצים יתומים, 0 deps מתים, 0 debug logging. **למחיקה:** `NDA_COUNTRIES` (`nda-countries.ts:26`), `humanDelaySeconds` (`config.ts:111`), `t` (`formStrings.ts:397`), `initDb` (בדיקה). **בלתי-נגיש (רגרסיה שלי):** דיאלוג `confirmArchive` + `archiveClient` צד-לקוח ב-`DashboardClient.tsx:348,625,2628-2641` — `setConfirmArchive` נקבע רק ל-null (נוצר כשהסרתי את כפתור הארכוב לבקשתך). **CSS מת:** ~130 שורות de/ja (`globals.css:2149-2234,2248-2295`) — הבורר `html[lang="de"]` לא תואם `lang="de-DE"` בפועל. **כפילות:** לוגיקת מס ×3 ב-CalculatorClient ללא test משותף; 6 עותקי ClientOnly; ~45 קבצי .md ב-root.

### 4. אמינות (4.4/5)
**MEDIUM:** אין backoff/זיהוי ל-429 מ-WhatsApp (`channel.ts:148-175`). **LOW:** HEIC ללא timeout/size-guard (`crm/file/route.ts:111-120`); `setState` כותב state_history לפני ה-UPDATE המותנה (`store-supabase.ts:412-436`); mutex per-customer in-process בלבד לנתיבים שאינם PAID (`service.ts:91`); נתיבי GET (`state`,`messages`) ללא try/catch+audit. **חזק (אושר):** `dueJobs` זורק-בקול, טאטוא stranded outbound, webhook עמיד, נתיב PAID חוצה-instances, timeouts כמעט מלאים. **5 SPOF מובילים:** cron של ה-tick (אין uptime monitor חיצוני), Supabase, טוקן WhatsApp, service-role key, mutex in-process.

### 5. ארכיטקטורה (2.8/5)
**HIGH:** שכפול i18n מלא (~75 דפים + 27k שורות blog ×3); `actions/route.ts` fat controller (689 ש'); שתי ארכיטקטורות data-layer + שתי מערכות auth (CRM `db.ts` ישיר מול Will `Store` interface). **MEDIUM:** פורמט שגיאה לא עקבי (`{error}` מול `{ok:false}`); מפתחות settings כ-magic-strings; CRM לא מכוסה בטסטים; טסטים רצים `strict:false`. **LOW:** `Store` interface בן 72 מתודות; `any` ב-boundary של Google + אין `state-machine.test.ts`. **חזק:** ליבת Will (Store מתועד, strict types, כיסוי טסטים בנתיבי כסף/policy).

## חלק ב׳ — SEO, עיצוב וחוויית משתמש

### 6. SEO (4.0/5, E-E-A-T 8/10)
**HIGH (לבדיקה משפטית):** ייחוס חותמת TPB ב-Footer — **לא הוצע ניסוח.** **MEDIUM:** `<main>` מקונן ברוחב דפי התוכן (`RootDocument.tsx:317` + פנימיים); שני sitemaps עם lastmod סותר (2024 מול 2026); פער E-E-A-T ב-About (schema בלבד, בכפוף לאישור). **LOW:** hreflang `en` מול `en-AU` לא עקבי; הערת middleware שגויה; casing `inLanguage`. **חזק:** גרף schema עשיר, reviewedBy נפרד, noindex+canonical למדריך לא-מתורגם, escaping ל-`</script>`.

### 7. עיצוב (4.2/5)
**HIGH:** הוי הירוק ~1.9:1 (`will-scoped.css:218`) — מתח מול בקשת המשתמש (ראה סינתזה). **MEDIUM:** 3 גדלי חותמת TPB (Nav 116px מול Footer 104px×scale0.92); line-height יפני שההערה מבטיחה ולא מומש (`globals.css:2276`); hex מוקשח ב-hero (`page.tsx:333-343`). **LOW:** `overflow:hidden` בפילטר הצ'אט סותר הערה; יישור `.st` מניח "+". **חזק:** מערכת טוקנים אמיתית, msgreact/הסרת קווי-הפרדה עשויים בקפידה, טיפוגרפיה ברוח Apple 5/5.

### 8. צפיפות מובייל (4.5/5)
**MEDIUM:** בלוק Guides ב-`de/page.tsx:642` נשאר `grid-cols-2` (טור ~110px + מילים גרמניות ארוכות) — en תוקן ל-`grid-cols-1 sm:grid-cols-2`. **LOW:** אותו בלוק ב-`ja/page.tsx:658`. שאר המובייל בשל מאוד (טפסים, Nav, Footer, hero mobile-first).

### 9. זרימת מובייל (4.0/5)
**HIGH:** file-remove 30px בטפסי tfn/abn/super. **MEDIUM:** מתג שפה 32px (`LanguageSwitcher.tsx:114`); קישורי הצהרה 12px צפופים (`tax-form:770`); קרוסלת ביקורות ללא עצירת-מגע. **LOW:** קישורי תפריט ~40px; תוויות רדיו Yes/No באנגלית קשיחה ב-de/ja; body-lock ללא cleanup. **חזק:** type/inputMode/autoComplete מצוינים, מניעת zoom, disabled+progress "3/12" בשליחה.

### 10. קופי (4.6/5)
בסיס בוגר מאוד, אפס דארק-פאטרנס (אנטי-מניפולטיבי אקטיבית). **MEDIUM:** subhead myGov ב-EN כבד ("whether…whether…whether", `page.tsx:379`). **LOW:** subhead בחירה ב-DE ארוך (`de/page.tsx:488`). 4 אזורי ספק סומנו ולא נגעו בהם. ניסוח ה-credential **נפסל — קו אדום.**

## המלצות שנפסלו (הפרת קו אדום)
**0 המלצות נכללו שמפרות קו אדום.** שני הסוכנים שנגעו קרוב דחו מיוזמתם: סוכן ה-SEO סימן את ייחוס חותמת ה-TPB לבדיקה משפטית וכתב במפורש "איני מציע ניסוח חלופי"; סוכן הקופי סימן את ניסוח ה-credential כ"נפסל — קו אדום" ולא הציע שינוי. הבקרה עבדה בפועל.

## תוכנית פעולה מאוחדת (ממוינת: אש-בבית + מאמץ נמוך + חוצה-תחומים ראשון)

| # | ממצא | תחום(ים) | חומרה | סבירות×השפעה | ודאות | מאמץ | קובץ |
|---|---|---|---|---|---|---|---|
| 1 | 2 אינדקסים (created_at, state_changed_at) | perf | HIGH | גבוה×בינוני | גבוהה | S | migrations |
| 2 | pg_trgm GIN לחיפוש (או prefix טלפוני) | perf | HIGH | גבוה×בינוני | גבוהה | S | store-supabase.ts:302 |
| 3 | file-remove 30→44px בטפסי tfn/abn/super | flow | HIGH | גבוה×בינוני | גבוהה | S | tfn/abn/super FormClient |
| 4 | הוי ירוק לצבע קריא-ורך (`--done` ~3:1) | design | HIGH | גבוה×נמוך | גבוהה | S | will-scoped.css:218 |
| 5 | ניקוי דיאלוג ארכוב בלתי-נגיש | dead-code | — | — | גבוהה | S | DashboardClient.tsx |
| 6 | Guides grid-cols-1 sm:grid-cols-2 ב-de/ja | density | MEDIUM | בינוני×בינוני | בינונית | S | de/page.tsx:642, ja:658 |
| 7 | 429 backoff + requeue מ-WhatsApp | resilience | MEDIUM | בינוני×בינוני | גבוהה | M | channel.ts:148 |
| 8 | `listTasks` ב-/state → status=OPEN + limit | perf | MEDIUM | בינוני×נמוך | גבוהה | S | store-supabase.ts:689 |
| 9 | 6 ספירות → COUNT יחיד GROUP BY | perf | MEDIUM | בינוני×נמוך | גבוהה | M | state/route.ts:22 |
| 10 | מחיקת 3 exports מתים + ~130 CSS מת | dead-code | — | — | גבוהה | S | ראה חלק 3 |
| 11 | ייחוס חותמת TPB | seo | HIGH | **דורש אימות משפטי** | — | — | Footer.tsx:189 |
| 12 | `<main>` מקונן → div/article | seo | MEDIUM | נמוך×נמוך | גבוהה | M | ראה חלק 6 |
| 13 | keyset pagination ל-listChatPage | perf | MEDIUM | בינוני×נמוך | גבוהה | M | store-supabase.ts:283 |
| 14 | uptime monitor על heartbeat ה-tick | resilience | — | נמוך×גבוה | גבוהה | S | (תשתית חיצונית) |

ממצא #11 מסומן **דורש אימות משפטי** ולא מוצג כעובדה סגורה. ממצאי ארכיטקטורה (i18n, actions, data-layer) הם L-effort אסטרטגיים — לא quick-wins, אבל הם החוב שמאט פיתוח עתידי.
