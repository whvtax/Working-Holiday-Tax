# Working Holiday Tax

Premium Next.js website for workingholidaytax.com.au  
**Next.js 14 · TypeScript · Tailwind CSS · App Router**

---

## Deploy to Vercel via GitHub

1. Push this repo to GitHub (public or private)
2. Go to https://vercel.com/new → Import Git Repository
3. Select this repo — Vercel auto-detects Next.js, no settings needed
4. Click **Deploy** — live in ~60 seconds

Every `git push` to `main` auto-deploys.

---

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build check
```

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              Root layout (fonts, nav, footer)
│   ├── globals.css             Tailwind + custom CSS
│   ├── page.tsx                Homepage
│   ├── tfn/                    TFN Application page
│   ├── tax-return/             Tax Return (rates, deductions, residency)
│   ├── superannuation/         Super claim guide + FAQs
│   ├── abn/                    ABN Registration
│   ├── calculator/             Interactive tax calculator (client component)
│   ├── medicare/               Medicare eligibility guide
│   ├── contact/                Contact + FAQs
│   ├── client-agreement/       Terms of service
│   └── privacy/                Privacy policy
├── components/
│   ├── layout/   Nav · Footer · StickyBar
│   └── ui/       Cursor · RevealObserver · Accordion · CtaBand · PageHeader
└── lib/
    └── constants.ts   WA number, email, nav links, agent details
```

---

## Customise

| What | Where |
|---|---|
| WhatsApp number | `src/lib/constants.ts` → `WA_NUMBER` |
| Email address | `src/lib/constants.ts` → `EMAIL` |
| Brand colours | `tailwind.config.ts` → `theme.extend.colors` |
| Tax rates | `src/app/tax-return/page.tsx` + `src/app/calculator/CalculatorClient.tsx` |
| Service fee | `src/app/client-agreement/page.tsx` → Section 2 |
| Agent details | `src/lib/constants.ts` → `AGENT_*` |

---

## Agent details

Supervised by The Accounting Academy Pty Ltd  
ABN 26 669 927 959 · Tax Agent Number 26233096
