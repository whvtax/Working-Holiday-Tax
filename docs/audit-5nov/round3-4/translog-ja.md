# translog-ja

- Added `'early-tax-return-leaving-australia'` to jaPostTranslations in src/app/(ja)/ja/blog/data.ts (title, description, body; same shape as other JA entries; inserted before 'what-is-superannuation-guarantee-charge'). Native JA, same H2 questions/facts/links as EN; links use /ja/ paths.
- Agent wording: only the approved "当チームが作成する…提出前に登録タックスエージェントが確認し署名します"; 15 June e-lodgement stated as a fact about registered tax agents in general. No 税理士, no dashes, no refund promise.
- Contextual links added: tax-obligations-after-leaving-australia ("出国前の早期申告ガイド") and australian-financial-year-dates ("6月30日前に帰国する人のタックスリターン").
- Verify: tsc clean. Jest: compliance + blog tests pass; new-locales-sitemap fails only for IT and ES (slug present in their chunks but not yet in locale-guide-slugs.ts) which are other languages' files, not JA.
