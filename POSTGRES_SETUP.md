# הגדרת Vercel Postgres — 5 דקות

## שלב 1 — צור Database ב-Vercel

1. נכנס ל-[vercel.com](https://vercel.com) → הפרויקט שלך
2. לחץ על **Storage** (בתפריט העליון)
3. לחץ **Create Database** → בחר **Postgres**
4. שם: `whvtax-db` → לחץ **Create**
5. בחר **Connect to Project** ובחר את הפרויקט שלך

זהו! Vercel מוסיף את כל משתני ה-`POSTGRES_*` אוטומטית.

## שלב 2 — Redeploy

עלה את ה-ZIP החדש → Vercel יבנה ויפעיל.

בטעינה הראשונה המערכת תיצור את הטבלה אוטומטית.

## מה השתנה

- לקוחות נשמרים לצמיתות — לא נמחקים בעדכונים
- כל הנתונים מאובטחים ב-Postgres
- ביצועים טובים יותר

## חינמי?

כן — Vercel Postgres מגיע עם 256MB חינם, מספיק לאלפי לקוחות.
