# build2-L: /leaving-australia hub in 6 languages (24 Nov 2026)

## Files (all owned by L)
- NEW src/app/(site)/leaving-australia/LeavingAustraliaPage.tsx: shared layout + JSON-LD (WebPage with speakable, FAQPage
  matching the visible accordion, BreadcrumbList), helpers leavingLanguages() (en-AU, de, ja, fr/it/es via
  newLocaleLanguages, x-default), makeGuides() (links a guide in the page language only if it exists there; lists drop
  missing ones), StepList, StepTable, LinkList, SRC (ATO source URLs).
- NEW src/app/(site)/leaving-australia/page.tsx (EN), src/app/(de)/de/leaving-australia/page.tsx,
  src/app/(ja)/ja/leaving-australia/page.tsx, src/app/(fr)/fr/leaving-australia/page.tsx,
  src/app/(it)/it/leaving-australia/page.tsx, src/app/(es)/es/leaving-australia/page.tsx.
  Each: absolute title (EN 56, DE 54, JA 32 chars, FR 57, IT 59, ES 60), description (EN 151, DE 154, JA 125, FR 157,
  IT 152, ES 159), self canonical (absolute), same hreflang map, OG/Twitter, robots index.
  Structure: answer-first lead (sentence 1 = the answer) / before you fly (6 numbered steps: keep AU account, payslips
  + job list, update ATO address (we do it for clients, Jo decision), early return option, start DASP + certify if
  $5,000+, myGov overseas sign-in) / after you leave (return after 30 June, DASP once visa ceased + Payday Super check,
  ATO-held super after 6 months) / order table (8 rows) / myGov not needed + list of myGov problem guides live in that
  language / amber "with us" block with approved wording / 9 FAQs / guide list / forest CTA / MobileCta.
  WhatsApp: waUrl topic 'tax-return' with a short detail ("I am leaving Australia" etc.); button texts are the existing
  per-language ones (Message us on WhatsApp / Schreib uns auf WhatsApp / WhatsAppで相談する / Écrivez-nous sur WhatsApp /
  Scrivici su WhatsApp / Escríbenos por WhatsApp) and reply-time lines copied from the /superannuation pages.
  Money links: EN /tax-return + /superannuation; DE/JA /xx/tax-return + /xx/superannuation; FR/IT/ES link the flagship
  (/fr/tax-return-australie-pvt, /it/dichiarazione-redditi-australia, /es/devolucion-impuestos-australia) per r17 F4/P1-2,
  plus /xx/superannuation.
  Approved wording used (existing translations grepped in repo): "You do not need myGov for us to help", "We deal with
  the ATO directly" (DE "Wir regeln das direkt mit dem ATO", JA "ATOとのやり取りは当社が直接行います", FR "Nous traitons
  directement avec l’ATO", IT "Ce la vediamo direttamente noi con l’ATO", ES "Nos entendemos directamente con la ATO"),
  "Reviewed and signed off by a registered tax agent before it is lodged with the ATO" and the supervision sentence in
  each language. Super CTA: "we find every fund linked to your TFN and check the claim with you" (no lodge/submit).
  No prices, no guarantee, no refund amounts, no SVT mention, no 税理士/Steuerberater for us, no dashes.
- EDIT src/lib/locale-pages.ts: new SHARED_HUB_PAGES = ['/leaving-australia']; LOCALE_PAGES fr/it/es = the 17 static
  pages + SHARED_HUB_PAGES (FR_PAGES/IT_PAGES/ES_PAGES stay 17, so the existing test holds). Effect: hasLocalePage and
  newLocaleLanguages know the page, so hreflang, language switcher and mobile banner pick it up.
- EDIT src/app/sitemap.ts: route '/leaving-australia' (0.85, translated) so EN/DE/JA entries are generated; FR/IT/ES come
  from LOCALE_PAGES; hubAlternates() adds alternates.languages (same map as the pages) to all six hub entries only.

## Facts (r16 ids; all VERIFIED there, URLs in r16)
Early lodgment paper only, 50 business days, leaving permanently with no income but interest/dividends/royalties (H6);
lodge from 1 July, due 31 Oct self-lodged (H1); most online returns 10 business days (H4); refunds only to an Australian
account (I1/I5); closed account: RBA returns up to 10 days, re-issue by cheque, some cheques held up to 90 days (I2/I3);
who must lodge: both conditions + deductions (C1/C2); DASP eligibility visa ceased, left, no other visa (E2); start before
leaving, submit after (E4); $5,000 certified copies (E6); 28 days (E8); fund may pay by IMT, ATO-held only AU account
or cheque (E9, r20 F5); 65% (E1); 6 months to ATO (F1); claim any time (F3); Payday Super 7 business days, some
exceptions (G2, r14 V11); SMS needs AU number, ATO recommends myID/passkey/authenticator overseas (J1/J2); DASP online
needs no myGov, TFN optional (E10 and existing /superannuation text); isolated late lodgment generally no penalty (K1).
Not used: "about 14 business days", 15 June cut-off, "following May", Code Generator, overseas refund.

## Verify
- npx tsc --noEmit -p . : clean.
- jest new-locales-sitemap, brand-isolation-round2, brand-separation-26oct, whatsapp-click-23nov, locale-blog: 312 pass.
- Full jest: 8 failed suites = the known Will + form-start-lang set; 514 pass.
- Dash grep (U+2013, U+2014, U+2015) on all changed files: none.
- Note for others: nav/footer and money pages do not link /leaving-australia yet (owned by other agents).
  llms.txt / sitemap-llms.xml in public/ were not touched (not owned).
