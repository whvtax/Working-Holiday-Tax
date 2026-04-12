# WHV Tax CRM — הוראות התקנה והפעלה

## מה נבנה

מערכת CRM מאובטחת לניהול לקוחות החזר מס עם:

- **כניסה דו-שלבית (2FA)** — סיסמה + קוד OTP במייל (דרך Resend)
- **נעילה אחרי 3 ניסיונות** + התראת אבטחה במייל
- **דשבורד לקוחות** — כרטיסיות ממתינים / טופל
- **סינון לפי שנות מס** — 2019-20 עד 2024-25
- **תיקיית לקוח** — כל הפרטים בטבלה, ניתן לעריכה
- **מחיקת פרטים רגישים** — שומרת שם/DOB/WhatsApp בלבד
- **✅ סמן כטופל** — מסיר מרשימת הממתינים

---

## התקנה

```bash
cd WHVTAX_WITH_CRM
npm install
cp .env.example .env.local
# מלא את הערכים ב-.env.local
npm run dev
```

---

## משתני סביבה (`.env.local`)

```env
# מפתח Resend לשליחת מיילים
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# מייל המנהל — לכאן ישלחו קודי OTP והתראות אבטחה
CRM_ADMIN_EMAIL=your@email.com

# ה-hash של הסיסמה — צור עם:
# node -e "const c=require('crypto'); console.log(c.pbkdf2Sync('הסיסמה_שלך','whvtax-salt-2024',100000,64,'sha512').toString('hex'))"
CRM_PASSWORD_HASH=

# Salt לhashing (שנה בproduction!)
PASSWORD_SALT=whvtax-salt-2024
```

> **סיסמת ברירת מחדל לפיתוח:** `WHVAdmin2024!`  
> **שנה אותה לפני העלאה לproduction!**

---

## נתיבי ה-CRM

| נתיב | תיאור |
|------|--------|
| `/crm` | דף כניסה — סיסמה + OTP |
| `/crm/dashboard` | לוח בקרה — רשימת לקוחות |
| `/crm/client/[id]` | תיקיית לקוח — פרטים מלאים |

---

## API Routes

| Method | Path | תיאור |
|--------|------|--------|
| POST | `/api/crm/login` | בדיקת סיסמה + שליחת OTP |
| POST | `/api/crm/verify-otp` | אימות קוד OTP + יצירת session |
| POST | `/api/crm/logout` | מחיקת session |
| GET | `/api/crm/session` | בדיקת תקפות session |
| GET | `/api/crm/clients` | רשימת כל הלקוחות |
| POST | `/api/crm/clients` | הוספת לקוח חדש |
| GET | `/api/crm/clients/[id]` | פרטי לקוח בודד |
| PATCH | `/api/crm/clients/[id]` | עדכון / סמן טופל / מחק פרטים |

---

## אבטחה

- **PBKDF2** (100,000 iterations) לhashing סיסמה
- **Timing-safe comparison** למניעת timing attacks
- **HttpOnly cookies** לsession — לא נגישות ל-JavaScript
- **OTP תוקף 10 דקות** — single-use
- **נעילה 30 דקות** אחרי 3 ניסיונות כושלים
- **Session TTL: 8 שעות**
- **Nav/Footer מוסתרים** בנתיבי `/crm/*`

---

## Upgrade לproduction

הstore הנוכחי הוא **in-memory** — הנתונים נאבדים בכל restart.

**לproduction — החלף ב:**
- **Vercel Postgres** / **Supabase** / **PlanetScale**
- **Vercel Blob** לאחסון קבצים
- **bcrypt** במקום PBKDF2 (npm install bcryptjs)

