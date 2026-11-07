# IT: early-tax-return-leaving-australia

- Guide added natively (tu) at the end of src/app/(it)/it/blog/chunks/18.ts: same H2s, answer-first opening, lists, links and ATO facts as EN (15 June agent cut-off, paper form, no pre-fill, payslips quote, 50 business days, HELP/AASL/VET, 15% to $45,000, 45% no TFN, DASP 65%). Agent wording: "rivista e approvata da un tax agent registrato"; no "we lodge", no refund promise, no em/en dashes (checked: 0).
- Slug appended to the `it` array in src/lib/locale-guide-slugs.ts (one line).
- Contextual links: 07.ts tax-obligations-after-leaving-australia ("tax return anticipata prima di lasciare l'Australia"; also removed the old claim that early lodging "anticipa il rimborso di mesi", which contradicts the ATO 50 business days); 04.ts australian-financial-year-dates ("quando ha senso presentare prima di partire").
- Verify: tsc --noEmit OK; jest compliance + new-locales-sitemap + all blog/chunk tests: 7 suites, 196 tests passed.
