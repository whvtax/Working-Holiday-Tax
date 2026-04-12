# חיבור Vercel Postgres — 5 דקות

## למה זה חשוב
כרגע הדאטא נשמרת בזיכרון של השרת.
כשאתה מעלה גרסה חדשה → הזיכרון מתאפס → כל הלקוחות נמחקים.

Vercel Postgres = database בענן, **לא נמחק לעולם** גם אחרי 100 עדכונים.

---

## שלב 1 — צור Database

1. היכנס ל־ https://vercel.com → הפרויקט שלך
2. לחץ על **Storage** בתפריט העליון
3. לחץ **Create Database** → בחר **Neon Serverless Postgres**
4. שם: `whvtax-db` → Region: **Sydney (ap-southeast-2)** → **Create**
5. לחץ **Connect to Project** → בחר את הפרויקט → **Connect**

✅ Vercel מוסיף את כל משתני ה-POSTGRES_* אוטומטית ל-Production + Preview

---

## שלב 2 — Redeploy

העלה את ה-ZIP לVercel כרגיל.
בטעינה הראשונה המערכת יוצרת את הטבלאות אוטומטית.

---

## שלב 3 — בדיקה

היכנס ל-CRM → אם רואה לקוחות demo זה עובד.
עכשיו כל שינוי שתעשה נשמר לצמיתות.

---

## מה קורה עכשיו

| פעולה | לפני Postgres | אחרי Postgres |
|-------|--------------|--------------|
| Upload גרסה חדשה | ❌ כל הנתונים נמחקים | ✅ הכל נשמר |
| Server restart | ❌ נתונים אובדים | ✅ הכל נשמר |
| לקוח חדש | ❌ נשמר רק עד ה-restart | ✅ נשמר לצמיתות |

---

## חינמי?

כן — Neon Postgres חינמי עד:
- 0.5 GB storage
- 190 compute hours/month

מספיק לאלפי לקוחות.
