# r19 Conversion: turning tax return, super and problem guide readers into WhatsApp chats

Scope: WHT (en, de, ja, fr, it, es) and SVT (en, zh, vi). Code read: /home/claude/v68/base20 (read only).
Tracking is untouched by every proposal here: the GA4 `topic` value stays exactly what it is today; only the
prefilled message text and the visible copy change. Nothing here adds a price, a refund promise or a "we lodge".

## 1. Findings

### 1.1 Where the WhatsApp CTAs sit (fact, code)
WHT guide pages (EN `src/app/(site)/blog/[slug]/page.tsx`, other languages `src/components/blog/LocaleGuidePage.tsx`):
three CTAs, all keyed on the guide's CATEGORY only, never on the guide itself.
- Inline CTA: `InlineGuideCta` in `src/app/(site)/blog/[slug]/GuideArticle.tsx` (copy `INLINE_CTA_COPY`, l.115-282),
  inserted before the 4th H2, only when the guide has 4+ H2s. One per guide by design (comment l.95-107).
- Closing CTA: `GuideCta` in `src/components/ui/GuideCta.tsx` (eyebrow, heading, body, button, "under" line), placed
  after the related-guides section, i.e. very late on the page.
- Mobile sticky bar: `src/components/ui/MobileCta.tsx`, sub line "Signed off by a registered tax agent · reply in ~1 hour"
  (all six languages). Desktop has no sticky: the desktop reader only sees inline + closing CTA.
- Prefill: `waUrl({ topic: guideWaTopic(category), lang, detail: guide.title })` (`src/lib/wa.ts`,
  `src/components/ui/guide-wa-topic.ts`). TFN and Work Rights route to the tax-return prefill.

What a problem-guide reader actually sends today (fact, built from `src/lib/wa.ts` l.36-49 + `detail`):
- /blog/how-long-does-tax-refund-take-australia: "Hi, I would like to ask about my Australian tax return. (How long does
  a tax refund take in Australia in 2026?)"
- /blog/dasp-rejected-what-to-do: "Hi, I would like to ask about claiming my superannuation back. (DASP claim rejected?
  5 common reasons and how to fix them)"
Inference: the pasted title in brackets reads like a form, says nothing about the reader's actual problem, and the
first human (or Will) reply has to ask what happened. A prefill that names the problem shortens that by one round trip.

WHT money pages: EN /tax-return already uses problem-specific prefills via `detail` (l.486 "missed the deadline or
earlier years", l.560 "not sure whether to lodge it myself"), English only. DE/JA/FR/IT/ES tax return pages use only
the generic `WA_TR` for every button, including JA's "未提出の年度を相談する" button (`src/app/(ja)/ja/tax-return/page.tsx`
l.426), whose label is about past years but whose message is generic.

SVT (`src/components/svt/GuidePage.tsx` l.113-117, `src/lib/svt/i18n.ts` l.64-66, 111-113, 159-161):
- Guide end CTA prefill is the same on EVERY page: "Hi Student Visa Tax, I read your page "{topic}" and have a question
  about my tax return." On /superannuation and the 15 Super long articles a DASP reader therefore sends a message
  about a tax return (fact). Sticky bar and header always send "I would like help with my tax return".
- No sign-off or supervision line next to the guide CTA; the supervision line (`UI.trust.supervision`) and "A registered
  tax agent will never ask for your myGov login details" appear only in `TrustStrip` on the home page (fact, grep).

### 1.2 Trust signals already present (fact)
- Sign-off and supervision wording: on every WHT money page in all six languages (e.g. EN /tax-return l.132, 286, 597;
  JA l.449 incl. "ATOとのやり取りは当社が直接行います"), in MobileCta SUB, NOT in GuideCta or InlineGuideCta.
- "No myGov" claim: already on the money pages in every WHT language (EN hero "No payslips, no myGov account";
  DE title "Steuererklärung Australien ohne myGov"; JA hero "myGovのアカウントも…必要ありません"; FR "pas de compte
  myGov"; IT "Senza payslip e senza myGov" + FAQ "Mi serve un account myGov? No."; ES hero "sin myGov y sin payslips").
  SVT says only "You do not need to ... share your myGov login" (services-en.ts l.128).
- Google rating: `GoogleRating` pill in the hero of every WHT tax return page and `GoogleReviewsServer` lower down; NOT on
  any /superannuation page and NOT on guides (grep of importers). SVT: `googleRating: null` (no reviews yet), so SVT
  must show no score.
- Guarantee: tax return pages and EN /superannuation l.534 (TFN income returns only). It is about the tax return fee,
  so it does not belong in super-guide CTAs.

### 1.3 Will already reacts to "myGov" (fact)
`src/lib/will/instant-choice.ts` l.31: `MYGOV_TROUBLE_RE` matches `my\s?gov`, "locked out", "login", "digital id",
マイガブ, ログイン, "anmeld". When it matches, Will puts the approved reassurance ("No need to worry about myGov: you don't
have to link anything or log in yourself. We handle everything directly with the ATO...") in front of the price message,
in en/de/ja/fr/it/es/zh/vi (l.33-46). Inference: a prefill that contains the literal word "myGov" gets the right
answer automatically. So every myGov prefill below keeps "myGov" in Latin letters, in every language.
Amendment readers: `ALREADY_LODGED_RE` sends "already lodged" chats to Will instead of the instant price, which is
the right path for the 'amend' prefill.

### 1.4 Traffic on the pages this concerns (fact, S/gsc24/wht/Pages.csv, 3 months)
/superannuation 41 clicks / 9,457 impr (pos 16.7); /blog/how-long-does-tax-refund-take-australia 4 / 2,756;
/ja/superannuation 66 / 2,303; /blog/how-long-does-dasp-take 24 / 1,905; /blog/dasp-rejected-what-to-do 26 / 963
(CTR 2.7%); /ja/blog/how-long-does-tax-refund-take-australia 37 / 1,317; /ja/blog/amending-tax-return-australia
36 / 379 (CTR 9.5%); /blog/late-tax-return-penalty-working-holiday 6 / 672; /ja/blog/super-employer-not-paying-what-to-do
19 / 218. SVT: /blog/dasp-documents-and-timing 0 / 279; /superannuation 0 / 212; /zh/blog/how-long-does-a-tax-refund-take
1 / 83. Inference: the problem guides (refund wait, DASP rejected, amend, late, unpaid super) already carry more clicks
than the money pages in several languages; they are where the prefill matters most. We have no GA4 conversion data in
the scratchpad, so the effect must be measured with the existing whatsapp_click event (position + topic), not assumed.

### 1.5 Official facts behind "you don't need myGov" (fact)
- myTax needs myGov: "You will need a myGov account with an active link to the ATO to access our online services."
  https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-online-with-mytax
- The agent route is a separate lodgment method: "Use a registered tax agent to prepare and lodge your tax return, they
  are the only people that can charge a fee." https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return
- When you cannot sign in, the ATO points to myID (Strong) recovery or a new myGov account:
  https://ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account
- DASP online application: access uses personal details and a shared secret question; the help page does not mention
  myGov (inference: myGov is not needed for DASP; do NOT state this as fact in copy until a page says it outright).
  https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system

### 1.6 Rule issues found in existing CTA copy (fact; check with Jo)
- Super closing CTA, all languages: EN "We find all of them under your TFN and lodge it once" (`GuideCta.tsx` l.59);
  FR "déposons la demande", IT "presentiamo la richiesta", ES "presentamos la solicitud", JA "一度で申請します".
  Super inline CTA: EN "lodged the claim once" (`GuideArticle.tsx` l.140), DE "den Antrag einmal richtig stellen",
  JA "一度で申請", FR "déposions la demande", IT "presentiamo la richiesta", ES "presentemos el reclamo".
  It is a DASP claim, not a tax return, and EN /superannuation l.352 already offers to "handle steps 2 to 6" (which
  include submitting), so this may be acceptable to Jo; but the rule says never say or imply that we lodge. Neutral
  wording is in P2-B.
- TFN inline CTA, all languages: "over-withheld tax comes back when the return is lodged" (EN l.124) is close to a
  refund promise; FR guide bodies already say "peut vous être remboursé, selon votre année". Wording in P3-B.
- MobileCta SUB on Super guides says "Signed off by a registered tax agent", which describes a tax return, not a DASP.

## 2. Proposals

### P1-A. Problem prefills: one slug map, three CTAs, both brands (highest value)
Files: `src/lib/wa.ts`, `src/components/ui/guide-wa-topic.ts`, `src/components/ui/GuideCta.tsx`,
`src/app/(site)/blog/[slug]/GuideArticle.tsx` (InlineGuideCta), `src/app/(site)/blog/[slug]/page.tsx` and
`src/components/blog/LocaleGuidePage.tsx` (MobileCta line), test `src/lib/__tests__/whatsapp-click-23nov.test.ts` l.132
(its regex pins the MobileCta call and must be updated).

Mechanism (text only, GA4 unchanged):
- wa.ts: `export type WaProblem = 'mygov' | 'mygov-super' | 'past-years' | 'from-overseas' | 'refund-wait' | 'amend' |
  'no-tfn' | 'dasp-rejected' | 'lost-super' | 'unpaid-super'`; `WaOptions.problem?: WaProblem`. In `waUrl`, when
  `problem` has a phrase for the language, that phrase replaces `PHRASES[lang][topic]` and `detail`/`tier` are not
  appended. `topic` is not touched, so `trackWhatsApp({ topic })` reports the same value as today.
- guide-wa-topic.ts: `GUIDE_WA_PROBLEM: Record<string, WaProblem>` keyed by slug (WHT slugs are identical in all six
  languages, verified), plus `guideWaProblem(slug)`. Every guide CTA passes `problem: guideWaProblem(guide.slug)`.
- Slug map (existing guides; all exist in en, de, ja, fr, it, es):
  how-to-lodge-tax-return-from-overseas: from-overseas | late-tax-return-penalty-working-holiday: past-years |
  amending-tax-return-australia: amend | how-long-does-tax-refund-take-australia: refund-wait |
  tax-return-without-tfn-australia: no-tfn | dasp-rejected-what-to-do: dasp-rejected |
  how-to-find-lost-superannuation and what-happens-to-unclaimed-super: lost-super |
  super-employer-not-paying-what-to-do: unpaid-super.
  New myGov problem guides from Plan 3 (whatever slugs the content reports settle on): tax return side -> mygov; DASP
  side -> mygov-super. One line per new slug. Do not map how-to-lodge-tax-return-working-holiday to mygov: most of its
  readers still have access.

Prefill text (customer's voice; EN keeps the existing no-contraction style except the myGov line, which follows Jo's
wording; FR/IT apostrophes as ’ and FR "?" with   in code, like the existing file; ES avoids usted/vosotros
by not addressing the reader at all, like the existing ES phrases):

| key | EN |
|---|---|
| mygov | Hi, I can't access myGov. Can you help with my tax return? |
| mygov-super | Hi, I can't access myGov. Can you help me claim my super back? |
| past-years | Hi, I have not lodged my Australian tax return for one or more past years. Can you help? |
| from-overseas | Hi, I have already left Australia and still need to do my Australian tax return. Can you help? |
| refund-wait | Hi, I have a question about when my Australian tax refund will arrive. |
| amend | Hi, my tax return has already been lodged and I think something in it is wrong. Can you check it? |
| no-tfn | Hi, I worked without a TFN for part of the year and have a question about my tax return. |
| dasp-rejected | Hi, my DASP claim was rejected and I would like to ask what to do next. |
| lost-super | Hi, I am not sure where all my super is and I would like to claim it back. |
| unpaid-super | Hi, I think an employer did not pay my super and I would like to ask before I claim it back. |

DE (du to the reader, "ihr" to us, like the existing DE phrases):
- mygov: Hallo, ich komme nicht mehr in mein myGov. Könnt ihr mir trotzdem bei meiner Steuererklärung helfen?
- mygov-super: Hallo, ich komme nicht mehr in mein myGov. Könnt ihr mir trotzdem helfen, meine Super zurückzubekommen?
- past-years: Hallo, ich habe für ein oder mehrere frühere Jahre noch keine Steuererklärung gemacht. Könnt ihr helfen?
- from-overseas: Hallo, ich bin schon aus Australien abgereist und muss noch meine Steuererklärung machen. Könnt ihr helfen?
- refund-wait: Hallo, ich habe eine Frage dazu, wann meine Steuerrückerstattung kommt.
- amend: Hallo, meine Steuererklärung ist schon eingereicht, aber ich glaube, da stimmt etwas nicht. Könnt ihr sie prüfen?
- no-tfn: Hallo, ich habe eine Zeit lang ohne TFN gearbeitet und habe eine Frage zu meiner Steuererklärung.
- dasp-rejected: Hallo, mein DASP-Antrag wurde abgelehnt. Was kann ich jetzt tun?
- lost-super: Hallo, ich weiß nicht genau, wo meine ganze Super liegt, und möchte sie zurückbekommen.
- unpaid-super: Hallo, ich glaube, ein Arbeitgeber hat meine Super nicht eingezahlt. Ich würde gern fragen, bevor ich sie zurückfordere.

JA (です・ます; "myGov" in Latin letters so Will's regex matches; no 税理士):
- mygov: こんにちは。myGovにログインできません。タックスリターンについて相談できますか？
- mygov-super: こんにちは。myGovにログインできません。スーパーアニュエーションの請求について相談できますか？
- past-years: こんにちは。過去の年度のタックスリターンをまだ提出していません。相談できますか？
- from-overseas: こんにちは。すでにオーストラリアを出国しましたが、タックスリターンがまだです。相談できますか？
- refund-wait: こんにちは。タックスリターンの還付金がいつ届くかについて質問があります。
- amend: こんにちは。提出済みのタックスリターンに間違いがあるかもしれません。確認をお願いできますか？
- no-tfn: こんにちは。TFNがない期間に働いていました。タックスリターンについて相談したいです。
- dasp-rejected: こんにちは。DASPの申請が却下されました。次にどうすればいいか相談したいです。
- lost-super: こんにちは。自分のスーパーがどこにあるか分かりません。請求について相談したいです。
- unpaid-super: こんにちは。雇用主がスーパーを払っていなかったかもしれません。請求する前に相談したいです。

FR (the customer writes "je", vouvoie us):
- mygov: Bonjour, je n'arrive plus à accéder à myGov. Pouvez-vous m'aider pour ma déclaration d'impôts australienne ?
- mygov-super: Bonjour, je n'arrive plus à accéder à myGov. Pouvez-vous m'aider à récupérer ma superannuation ?
- past-years: Bonjour, je n'ai pas déposé ma déclaration australienne pour une ou plusieurs années passées. Pouvez-vous m'aider ?
- from-overseas: Bonjour, j'ai déjà quitté l'Australie et je dois encore faire ma déclaration d'impôts australienne. Pouvez-vous m'aider ?
- refund-wait: Bonjour, j'ai une question sur le délai de mon remboursement d'impôts australien.
- amend: Bonjour, ma déclaration a déjà été déposée et je pense qu'elle contient une erreur. Pouvez-vous la vérifier ?
- no-tfn: Bonjour, j'ai travaillé une partie de l'année sans TFN et j'ai une question sur ma déclaration.
- dasp-rejected: Bonjour, ma demande de DASP a été refusée. Que puis-je faire maintenant ?
- lost-super: Bonjour, je ne sais pas où se trouve toute ma superannuation et j'aimerais la récupérer.
- unpaid-super: Bonjour, je pense qu'un employeur n'a pas versé ma superannuation. J'aimerais poser la question avant de la réclamer.

IT (the customer uses "voi", like the existing IT phrases):
- mygov: Ciao, non riesco più ad accedere a myGov. Potete aiutarmi lo stesso con la mia dichiarazione dei redditi australiana?
- mygov-super: Ciao, non riesco più ad accedere a myGov. Potete aiutarmi lo stesso a riavere la mia superannuation?
- past-years: Ciao, non ho presentato la dichiarazione dei redditi australiana per uno o più anni passati. Potete aiutarmi?
- from-overseas: Ciao, ho già lasciato l'Australia e devo ancora fare la dichiarazione dei redditi australiana. Potete aiutarmi?
- refund-wait: Ciao, ho una domanda sui tempi del mio rimborso fiscale australiano.
- amend: Ciao, la mia dichiarazione è già stata presentata ma credo che ci sia un errore. Potete controllarla?
- no-tfn: Ciao, ho lavorato per un periodo senza TFN e ho una domanda sulla mia dichiarazione dei redditi.
- dasp-rejected: Ciao, la mia richiesta DASP è stata respinta. Cosa posso fare adesso?
- lost-super: Ciao, non so dove sia finita tutta la mia superannuation e vorrei riaverla.
- unpaid-super: Ciao, credo che un datore di lavoro non mi abbia versato la super. Vorrei chiedervi prima di richiederla.

ES (neutral, tuteo where needed, no usted/vosotros):
- mygov: Hola, no puedo entrar a myGov y necesito ayuda con mi declaración de impuestos en Australia.
- mygov-super: Hola, no puedo entrar a myGov y necesito ayuda para recuperar mi superannuation.
- past-years: Hola, no presenté mi declaración de impuestos en Australia de uno o más años anteriores y necesito ayuda.
- from-overseas: Hola, ya me fui de Australia y todavía tengo que hacer mi declaración de impuestos australiana.
- refund-wait: Hola, tengo una consulta sobre cuándo llega mi devolución de impuestos en Australia.
- amend: Hola, mi declaración ya se presentó y creo que tiene un error. Me gustaría que alguien la revise.
- no-tfn: Hola, trabajé un tiempo sin TFN y tengo una consulta sobre mi declaración de impuestos.
- dasp-rejected: Hola, me rechazaron la solicitud de DASP y quiero saber qué puedo hacer ahora.
- lost-super: Hola, no sé dónde está toda mi superannuation y quiero recuperarla.
- unpaid-super: Hola, creo que un empleador no me pagó la super y quiero consultarlo antes de reclamarla.

Also use the same keys on the WHT money pages: EN /tax-return l.486 `detail: 'missed the deadline or earlier years'`
-> `problem: 'past-years'`; JA /ja/tax-return l.426 and the past-years buttons on de/fr/it/es tax return and flagship
pages (find with grep for their past-years section) -> `problem: 'past-years'`. Keep EN l.560 ("not sure whether to
lodge it myself") as is.

### P1-B. A myGov closing CTA for the new myGov problem guides (6 languages)
File: `src/components/ui/GuideCta.tsx`: add a `PROBLEM_COPY: Record<WaLang, Partial<Record<WaProblem, Copy>>>`, used
when `guideWaProblem(slug)` is 'mygov' (fall back to the category copy otherwise). The inline CTA can reuse `body` +
`cta`. Facts: myGov only needed for myTax (ATO myTax page above); agent route (ATO how-to-lodge page above); approved
sign-off and "We deal with the ATO directly" wording; "never ask for your myGov password" is an existing site claim
(EN /tax-return, IT FAQ, FR/ES/JA trust blocks).

EN: eyebrow "Stuck at the sign in" | heading "You don't need myGov to have us do your return." | body "We deal with the
ATO directly, so a lost Australian number, a locked account or a myID that will not verify is not a reason to leave the
year unlodged. Your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO." |
cta "Message us on WhatsApp" | under "Replies in about an hour. We never ask for your myGov password."

DE: "Hängst beim Login fest?" | "Für uns brauchst du kein myGov." | "Wir regeln das direkt mit dem ATO. Eine alte
australische Nummer, ein gesperrtes Konto oder eine myID, die nicht durchgeht, sind kein Grund, das Jahr offen zu
lassen. Deine Erklärung wird von einem registrierten Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht
wird." | "Schreib uns auf WhatsApp" | "Antwort in etwa einer Stunde. Wir fragen nie nach deinem myGov-Passwort."

JA: "ログインできないとき" | "myGovがなくてもご依頼いただけます。" | "ATOとのやり取りは当社が直接行います。オーストラリアの電話
番号が使えない、アカウントがロックされた、myIDの本人確認が通らない、といった理由で申告をあきらめる必要はありません。ATOに
提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。" | "WhatsAppで相談する" |
"約1時間で返信します。myGovのパスワードをお聞きすることはありません。"

FR: "Bloqué à la connexion ?" | "Pas besoin de myGov pour passer par nous." | "Nous traitons directement avec l'ATO.
Un ancien numéro australien, un compte bloqué ou une myID qui ne se valide pas ne sont pas une raison de laisser l'année
sans déclaration. Votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès
de l'ATO." | "Écrivez-nous sur WhatsApp" | "Réponse en environ une heure. Nous ne vous demandons jamais votre mot de passe myGov."

IT: "Bloccato al login?" | "Con noi myGov non ti serve." | "Trattiamo direttamente con l'ATO. Un vecchio numero
australiano, un account bloccato o una myID che non si verifica non sono un motivo per lasciare l'anno senza
dichiarazione. Ogni tax return viene rivista e approvata da un agente fiscale registrato prima di essere presentata
all'ATO." | "Scrivici su WhatsApp" | "Risposta in circa un'ora. Non ti chiediamo mai la password di myGov."

ES: "¿Atascado al iniciar sesión?" | "Con nosotros no necesitas myGov." | "Tratamos directamente con la ATO. Un número
australiano que ya no tienes, una cuenta bloqueada o una myID que no se verifica no son motivo para dejar el año sin
declarar. Revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO." | "Escríbenos por
WhatsApp" | "Respuesta en aproximadamente una hora. Nunca te pedimos tu contraseña de myGov."

No mygov-super closing copy yet: the DASP-without-myGov point rests on an inference (1.5). Super myGov guides get the
mygov-super prefill and the normal Super copy until an ATO page states it outright.

### P1-C. SVT: super readers send a super message; myGov and past-year readers name their problem
Files: `src/lib/svt/i18n.ts` (UiStrings type l.41-45 and the three locale blocks), `src/components/svt/GuidePage.tsx`
l.116. Rule: if `place?.topic === 'Super'` or the slug is `superannuation` or contains `super`/`dasp`, use
`whatsappAboutSuper`; else if the slug is in a small SVT map, use `whatsappProblem[key]`; else today's `whatsappAbout`.
`svtWhatsappUrl` already adds nothing when "Student Visa Tax" is present. Tracking (`data-wa-pos`) unchanged.
- whatsappAboutSuper: en 'Hi Student Visa Tax, I read your page "{topic}" and have a question about claiming my super.'
  | zh '你好 Student Visa Tax，我看了你们关于“{topic}”的页面，想咨询一下领取养老金（DASP）的事。' | vi 'Chào Student Visa
  Tax, mình vừa đọc trang “{topic}” và muốn hỏi về việc rút tiền super (DASP) ạ.'
- whatsappProblem.mygov: en "Hi Student Visa Tax, I can't access myGov. Can you help with my tax return?" | zh '你好
  Student Visa Tax，我登录不了 myGov，可以帮我报税吗？' | vi 'Chào Student Visa Tax, mình không đăng nhập được myGov.
  Bên bạn giúp mình khai thuế được không ạ?'
- whatsappProblem.past-years (slugs past-years, late-lodgment, late-tax-return-penalty-dollars-students): en 'Hi Student
  Visa Tax, I have not lodged my tax return for one or more past years. Can you help?' | zh '你好 Student Visa Tax，我有
  一年或几年的报税还没有提交，可以帮我吗？' | vi 'Chào Student Visa Tax, mình còn một hoặc vài năm chưa khai thuế. Bên bạn
  giúp mình được không ạ?'
- whatsappProblem.from-overseas (slugs leaving-australia, lodge-from-overseas, tax-after-leaving-australia-international-students):
  en 'Hi Student Visa Tax, I have left Australia and still need to do my tax return.' | zh '你好 Student Visa Tax，我已经
  离开澳洲了，但还需要报税。' | vi 'Chào Student Visa Tax, mình đã rời Úc nhưng vẫn cần khai thuế ạ.'
- New SVT myGov guides from Plan 3 -> mygov. Check Mia's (SVT) chat handling before shipping: MYGOV_REASSURANCE has zh/vi
  lines but verify SVT chats use the same path (`src/lib/will/svt-enquiry.ts`).

### P2-A. Trust line next to the closing button on every guide (desktop sees none today)
File: `src/components/ui/GuideCta.tsx`, the `under` field. Only approved wording, existing translations.
- Tax Return, TFN, ABN, Medicare & Other (all route to the return): EN "Replies in about an hour. Reviewed and signed off
  by a registered tax agent before it is lodged with the ATO." | DE "Antwort in etwa einer Stunde. Deine Erklärung wird
  von einem registrierten Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird." | JA "約1時間で返信します。
  ATOに提出される前に、オーストラリアの登録タックスエージェントが確認し、承認します。" | FR "Réponse en environ une heure.
  Votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO." | IT
  "Risposta in circa un'ora. Ogni tax return viene rivista e approvata da un agente fiscale registrato prima di essere
  presentata all'ATO." | ES "Respuesta en aproximadamente una hora. Revisado y aprobado por un agente fiscal registrado
  antes de presentarse ante la ATO."
- Super: EN "Replies in about an hour. Working Holiday Tax operates under the supervision of a registered tax agent." |
  DE "Antwort in etwa einer Stunde. Working Holiday Tax ist unter der Aufsicht eines registrierten australischen Tax
  Agent tätig." | JA "約1時間で返信します。Working Holiday Taxは、オーストラリアの登録タックスエージェントの監督のもとで
  運営しています。" | FR "Réponse en environ une heure. Working Holiday Tax opère sous la supervision d'un agent fiscal
  enregistré." | IT "Risposta in circa un'ora. Working Holiday Tax opera sotto la supervisione di un agente fiscale
  registrato." | ES "Respuesta en aproximadamente una hora. Working Holiday Tax opera bajo la supervisión de un agente
  fiscal registrado."
- Work Rights keeps its current "No obligation" line. Same pattern for MobileCta: pass `variant` or a Super SUB with the
  supervision wording, so Super guides stop saying "Signed off" (1.6).
- SVT GuidePage CTA (l.113-117): add one line under the button: en "Reviewed and signed off by a registered tax agent
  before it is lodged with the ATO." | zh "在提交给 ATO 之前，由注册税务代理人审核并签字确认。" | vi "Được một đại lý thuế
  đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO." On SVT super pages use `UI.trust.supervision` without {agent} or
  a shortened approved form ("Operates under the supervision of a registered tax agent.").

### P2-B. Neutral wording for the Super CTAs that imply we lodge (only if Jo agrees, see 1.6)
GuideCta Super body, last sentence: EN "We find every fund under your TFN and check the paperwork with you before
anything is sent." | JA "TFNからすべてのファンドを探し、申請書類を一緒に確認します。" | FR "Nous retrouvons toutes vos
caisses grâce à votre TFN et vérifions le dossier avec vous avant tout envoi." | IT "Troviamo tutti i fondi con il tuo
TFN e controlliamo la richiesta con te prima dell'invio." | ES "Encontramos todas con tu TFN y revisamos la solicitud
contigo antes de enviarla." (DE "Wir finden alle über deine TFN." has no lodging claim; keep.)
Inline Super body: EN "If you would rather we found every fund sitting under your TFN and checked the claim with you,
send us your details." | DE "Wenn wir alle Fonds unter deiner TFN finden und den Antrag mit dir durchgehen sollen, schick
uns deine Daten." | JA "TFNからすべてのファンドを探して、申請内容を一緒に確認してほしい場合は、詳細を送ってください。" |
FR "Si vous préférez que nous retrouvions toutes les caisses rattachées à votre TFN et que nous vérifiions la demande
avec vous, envoyez-nous vos informations." | IT "Se vuoi che troviamo tutti i fondi collegati al tuo TFN e controlliamo
la richiesta insieme a te, mandaci i tuoi dati." | ES "Si prefieres que encontremos todos los fondos ligados a tu TFN y
revisemos el reclamo contigo, envíanos tus datos."

### P2-C. Button labels that match the problem (closing + inline CTA)
Only where the generic label fights the page. EN past-years reuses the existing money-page label; JA past-years reuses
the existing JA money-page label.
- past-years: EN "Ask which of your years are still open" | DE "Frag, welche Jahre noch offen sind" | JA "未提出の年度を
  相談する" | FR "Demander quelles années sont encore ouvertes" | IT "Chiedi quali anni sono ancora aperti" | ES
  "Pregunta qué años siguen abiertos"
- from-overseas: EN "Message us from overseas" | DE "Schreib uns aus dem Ausland" | JA "海外からWhatsAppで相談する" | FR
  "Nous écrire depuis l'étranger" | IT "Scrivici dall'estero" | ES "Escríbenos desde el extranjero"
- dasp-rejected: EN "Ask about your rejected claim" | DE "Frag zu deinem abgelehnten Antrag" | JA "却下された申請について
  相談する" | FR "Poser une question sur ma demande refusée" | IT "Chiedi della tua richiesta respinta" | ES "Consulta
  sobre tu solicitud rechazada"
- mygov: the P1-B copy.

### P2-D. Real Google rating where super and guide readers decide
Files: every `superannuation/page.tsx` (en, de, ja, fr, it, es): `<GoogleRating variant="pill" lang=".." />` under the
hero WhatsApp button, as on the tax return pages. GuideCta: the same pill under the "under" line (it renders nothing
when the feed is down, so it never shows an invented score). SVT: nothing until `googleRating` is set by hand.

### P3-A. One quiet myGov line in the tax return heroes
Files: the six WHT tax return pages / flagships. Under the existing hero note, a text link with the mygov prefill:
EN "Can't get into myGov? Message us anyway." | DE "Kommst du nicht in myGov? Schreib uns trotzdem." | JA "myGovに
ログインできなくても、WhatsAppでご相談ください。" | FR "Plus d'accès à myGov ? Écrivez-nous quand même." | IT "Non
riesci a entrare in myGov? Scrivici lo stesso." | ES "¿No puedes entrar a myGov? Escríbenos igual." Same `topic`,
`position` unchanged ('inline'). Titles and H1 untouched.

### P3-B. TFN inline CTA, softer refund wording
EN l.124 "Nothing is lost permanently, because over-withheld tax comes back when the return is lodged." ->
"Over-withheld tax is settled when the return is lodged, and can come back to you depending on your year." Mirror in
DE/JA/FR/IT/ES (FR body text already has "peut vous être remboursé, selon votre année" to copy from).

## 3. What NOT to do
- Do not create new GA4 `topic` values or touch `trackWhatsApp`/`trackGuideCta`/consent: the problem key changes text
  only. Do not rename existing WaTopic values (comment in wa.ts: they end up in GA4).
- Do not add a second in-body CTA or put a CTA under the Quick answer / first paragraph after an H2: that paragraph is
  what Google and AI answers lift (GuideArticle comment l.95-107), and the 12 frozen AI-cited openings may not change.
- Do not write "we lodge", "we apply for your DASP", "we fix your myGov", "we recover your myGov", or give myGov/myID
  how-to steps in CTAs (Will's policy forbids myGov how-tos; the ATO is the source for recovery steps). Never 税理士
  for us in JA, never 会计/税务师 in ZH, never kế toán in VI.
- Do not say "you don't need myGov to claim your super" until an ATO page states it outright (1.5 is an inference).
- No price in any new string (SVT ctaPrice already exists; leave it, do not copy it to new places). The WHT guarantee
  stays on tax return pages only, never in super CTAs.
- Do not drop the guide title from prefills that have no problem key: it is how the team knows which page started the chat.
- Do not show an SVT rating or stars while `googleRating` is null.
- Do not mention Student Visa Tax on WHT or Working Holiday Tax on SVT (the SVT prefills keep "Student Visa Tax", that is
  correct for SVT only).
- Update `src/lib/__tests__/whatsapp-click-23nov.test.ts` l.132 together with the MobileCta change, or it fails; run the
  6-language compliance test after adding the strings, and dash-grep the new strings (none above contain en/em dashes).
