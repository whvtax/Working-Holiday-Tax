# Translate log FR: early-tax-return-leaving-australia

- New native FR guide added to src/app/(fr)/fr/blog/chunks/07.ts, right after tax-obligations-after-leaving-australia (title "Départ avant le 30 juin : déposer sa tax return en avance"). Same 11 H2 questions, answer-first lead, lists and links as EN (tax-residency, /tax-return, how-to-lodge-tax-return-from-overseas, how-to-cancel-your-abn, tax-obligations-after-leaving-australia, /superannuation, final /fr/tax-return-australie-pvt). NBSP typography via guides4fr/frlib.py. ATO payslip quote kept in English with French gloss.
- Facts kept: permanent departure + no further AU income except interest/dividends/royalties; HELP/AASL/VSL excluded; paper form, not myTax; agent e-lodgement up to 15 June (or Friday before); 50 business days; pre-fill generally unavailable; DASP only after leaving + visa ended; 65% final; 15% to $45,000, 45% before TFN. Tax agent lodging stated as general fact; business only "vérifiée et validée par un agent fiscal enregistré".
- Contextual links: 07 tax-obligations-after-leaving-australia (end of "Peut-on déposer avant le 30 juin...") and 04 australian-financial-year-dates (end of "Et si vous quittez l'Australie avant le 30 juin ?"), different anchors.
- src/lib/locale-guide-slugs.ts: one line appended to the fr array only.
- Script/backups: plan/round4/tr-fr/ (entry.txt, apply.py, 07.ts.bak, 04.ts.bak).
- Verify: tsc --noEmit clean; jest compliance-6-languages + new-locales-sitemap + blog tests: 7 suites, 196/196 pass; no en/em dashes.
