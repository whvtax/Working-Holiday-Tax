/**
 * Form i18n dictionary
 * Shared between all four forms (tfn, abn, tax, super)
 * Default language: English (forms collect data in English for CRM)
 * Users can switch to German or Japanese for instructions/labels - but values entered must be English.
 */
export type FormLang = 'en' | 'de' | 'ja'

export const formStrings = {
  // ─ Top banner ─
  langToggle: {
    en: 'Deutsch',
    de: 'English',
    ja: 'English',
  },
  // The MUST-FILL-IN-ENGLISH notice
  englishOnlyNotice: {
    en: 'Choose your language to see instructions but please type your answers in English.',
    de: 'Wähle deine Sprache, um die Anleitung zu sehen, aber bitte gib deine Antworten auf Englisch ein.',
    ja: '説明を表示する言語を選択できますが、回答は英語でご入力ください。',
  },
  englishOnlyShort: {
    en: 'English only',
    de: 'Nur Englisch',
    ja: '英語のみ',
  },

  // ─ Section titles ─
  sectionPersonal:     { en: 'Personal details',          de: 'Persönliche Daten',          ja: '個人情報' },
  sectionDocuments:    { en: 'Documents',                 de: 'Dokumente',                  ja: '書類' },
  sectionDeclaration:  { en: 'Declaration',               de: 'Erklärung',                  ja: '宣言' },
  sectionWork:         { en: 'Work details',              de: 'Arbeitsdaten',               ja: '就労情報' },
  sectionTax:          { en: 'Tax details',               de: 'Steuerdaten',                ja: '税務情報' },
  sectionBusiness:     { en: 'Business details',          de: 'Geschäftsdaten',             ja: '事業情報' },
  sectionBank:         { en: 'Bank details',              de: 'Bankverbindung',             ja: '銀行情報' },
  bankDetailsHint: {
    en: 'To have your tax refund paid directly into your bank account.',
    de: 'Damit deine Steuerrückerstattung direkt auf dein Bankkonto ausgezahlt werden kann.',
    ja: '税還付金を銀行口座に直接受け取るために。',
  },
  sectionSuper:        { en: 'Super fund details',        de: 'Superfondsdaten',            ja: 'スーパーファンド情報' },
  sectionEmployers:    { en: 'Employers',                 de: 'Arbeitgeber',                ja: '雇用主情報' },

  // ─ Field labels - shared ─
  firstName:           { en: 'First name (including middle names)', de: 'Vorname (inkl. Zweitnamen)', ja: '名（ミドルネーム含む）' },
  givenNames:          { en: 'Given name (s)',                      de: 'Vorname(n)',                ja: '名' },
  lastName:            { en: 'Last name',                          de: 'Nachname',                  ja: '姓' },
  country:             { en: 'Country of passport',                de: 'Land des Reisepasses',      ja: 'パスポート発行国' },
  passport:            { en: 'Passport number',                    de: 'Reisepassnummer',           ja: 'パスポート番号' },
  email:               { en: 'Email address',                      de: 'E-Mail-Adresse',             ja: 'メールアドレス' },
  dob:                 { en: 'Date of birth',                      de: 'Geburtsdatum',              ja: '生年月日' },
  // A native date input renders EMPTY when it has no value — no placeholder is
  // possible on `type="date"`, and on iOS it shows a blank box, which reads as a
  // broken field next to every other input that has an example in it. This hint
  // supplies the example instead. Day-first, because that is how Australia and
  // every country these customers come from writes a date.
  dobHint:             { en: 'For example: 20/10/2000',            de: 'Zum Beispiel: 20.10.2000',  ja: '例：2000/10/20' },
  whatsapp:            { en: 'WhatsApp number',                    de: 'WhatsApp-Nummer',           ja: 'WhatsApp番号' },
  auPhone:             { en: 'Australian phone number',            de: 'Australische Telefonnummer', ja: 'オーストラリアの電話番号' },
  gender:              { en: 'Gender as shown in passport',        de: 'Geschlecht laut Reisepass', ja: 'パスポートに記載の性別' },
  marital:             { en: 'Marital status',                     de: 'Familienstand',             ja: '配偶者の有無' },
  address:             { en: 'Full Australian address (street, suburb, state, postcode)', de: 'Vollständige australische Adresse (Straße, Vorort, Bundesstaat, Postleitzahl)', ja: 'オーストラリアの完全な住所（番地、サバーブ、州、郵便番号）' },
  addressShort:        { en: 'Australian address', de: 'Australische Adresse', ja: 'オーストラリアの住所' },
  howHeard:            { en: 'How did you hear about us?',         de: 'Wie hast du von uns erfahren?', ja: '当社をどこで知りましたか？' },
  selfieWithPassport:  { en: 'Selfie holding your passport',        de: 'Selfie mit deinem Reisepass in der Hand', ja: 'パスポートを持った自撮り写真' },
  uploadSelfie:        { en: 'Upload selfie holding your passport', de: 'Selfie mit Reisepass in der Hand hochladen', ja: 'パスポートを持った自撮り写真をアップロード' },
  passportPhoto:       { en: 'Passport photo page',                de: 'Reisepassfotoseite',        ja: 'パスポートの顔写真ページ' },
  visaGrant:           { en: 'Visa grant letter',                  de: 'Visa Grant Letter',         ja: 'ビザ承認レター（Visa Grant Letter）' },
  tfn:                 { en: 'Tax File Number (TFN)',              de: 'Tax File Number (TFN)',     ja: 'タックスファイルナンバー（TFN）' },

  // ─ Buttons & generic ─
  submit:              { en: 'Submit application →',               de: 'Antrag abschicken →',       ja: '申請を送信 →' },
  submitTFN:           { en: 'Submit TFN Application →',           de: 'TFN-Antrag abschicken →',   ja: 'TFN申請を送信 →' },
  submitABN:           { en: 'Submit ABN Application →',           de: 'ABN-Antrag abschicken →',   ja: 'ABN申請を送信 →' },
  submitTax:           { en: 'Submit Tax Return →',                de: 'Steuererklärung abschicken →', ja: 'タックスリターンを送信 →' },
  submitSuper:         { en: 'Submit Super Claim →',               de: 'Superantrag abschicken →',  ja: 'スーパー申請を送信 →' },
  submitting:          { en: 'Submitting…',                        de: 'Wird abgeschickt…',         ja: '送信中…' },
  // Last step of the tax form: the declaration + submit happen on the tax-residency page.
  checkResidency:      { en: 'Continue to tax residency →',  de: 'Weiter zur Steuerresidenz →', ja: '税務上の居住区分へ進む →' },
  checkResidencyNote:  {
    en: 'Last step: tax residency, then you can submit.',
    de: 'Letzter Schritt: Wir erklären dir die Steuerresidenz, dann kannst du absenden.',
    ja: '最後のステップ：税務上の居住区分についてご説明し、その後送信いただけます。',
  },
  continueButton:      { en: 'Continue →',                         de: 'Weiter →',                  ja: '次へ →' },
  timeEstimate:        { en: '⏱ Takes about 1 minute',             de: '⏱ Dauert etwa 1 Minute',     ja: '⏱ 約1分で完了' },
  backButton:          { en: '← Back',                             de: '← Zurück',                   ja: '← 戻る' },
  registeredAgentNo:   { en: 'Registered Tax Agent',              de: 'Registrierter Steueragent',  ja: '登録税理士' },
  registeredTaxAgent:  { en: 'Working holiday specialists',        de: 'Working-Holiday-Spezialisten', ja: 'ワーホリ専門チーム' },
  secureForm:          { en: 'Secure Form',                         de: 'Sicheres Formular',           ja: '安全なフォーム' },
  fullyOnline:         { en: '100% Online',                         de: '100% Online',                 ja: '完全オンライン' },

  // ─ Radio options ─
  female:              { en: 'Female',                              de: 'Female',                   ja: 'Female' },
  male:                { en: 'Male',                                de: 'Male',                     ja: 'Male' },
  single:              { en: 'Single',                              de: 'Single',                   ja: 'Single' },
  married:             { en: 'Married',                             de: 'Married',                  ja: 'Married' },
  yes:                 { en: 'Yes',                                 de: 'Yes',                      ja: 'Yes' },
  no:                  { en: 'No',                                  de: 'No',                       ja: 'No' },

  // ─ Validation ─
  required:            { en: 'Required',                            de: 'Pflichtfeld',              ja: '必須' },
  invalidEmail:        { en: 'Please enter a valid email address',  de: 'Bitte gib eine gültige E-Mail-Adresse ein', ja: '有効なメールアドレスをご入力ください' },
  invalidTfn:          { en: 'A TFN is 8 or 9 digits',              de: 'Eine TFN hat 8 oder 9 Ziffern', ja: 'TFNは8桁または9桁の数字です' },
  invalidDob:          { en: 'Please check the date of birth',      de: 'Bitte überprüfe das Geburtsdatum', ja: '生年月日をご確認ください' },
  mustConfirmDecl:     { en: 'You must confirm this declaration to proceed', de: 'Du musst diese Erklärung bestätigen, um fortzufahren', ja: '続行するにはこの宣言の確認が必要です' },
  mustAcceptTerms:     { en: 'You must accept the terms',           de: 'Du musst die Bedingungen akzeptieren', ja: '規約への同意が必要です' },
  fixBeforeSubmit:     { en: 'Please fix the following before submitting:', de: 'Bitte korrigiere Folgendes, bevor du absendest:', ja: '送信前に以下を修正してください：' },
  fieldIsRequired:     { en: 'is required',                         de: 'ist ein Pflichtfeld',      ja: 'は必須項目です' },

  // ─ File upload helper ─
  tapToChoose:         { en: 'Tap to choose a file',                de: 'Tippe zum Auswählen einer Datei', ja: 'タップしてファイルを選択' },

  // ─ Declarations ─
  declTFN: {
    en: 'I confirm that I am currently in Australia on my first visit, have never changed my name or gender, do not own any assets in Australia, and have not been issued a TFN.',
    de: 'Ich bestätige, dass ich aktuell zum ersten Mal in Australien bin, meinen Namen oder mein Geschlecht nie geändert habe, kein Vermögen in Australien besitze und noch keine TFN bekommen habe.',
    ja: '現在オーストラリアに初めて滞在しており、氏名や性別の変更歴がなく、オーストラリアに資産を所有しておらず、TFNが発行されたことがないことを確認します。',
  },
  declConfirm:         { en: 'I confirm this declaration',          de: 'Ich bestätige diese Erklärung', ja: 'この宣言を確認します' },
  acceptTerms:         { en: 'I have read and accept the',          de: 'Ich habe Folgendes gelesen und akzeptiere die', ja: '以下を読み、同意します：' },
  clientAgreement:     { en: 'Client Agreement',                    de: 'Mandantenvereinbarung',     ja: 'クライアント規約' },
  and:                 { en: '&',                                   de: 'und die',                  ja: 'および' },
  privacyPolicy:       { en: 'Privacy Policy',                      de: 'Datenschutzerklärung',     ja: 'プライバシーポリシー' },

  // ─ Submission errors ─
  tooMany:             { en: 'Too many submissions. Please wait 15 minutes and try again.', de: 'Zu viele Anfragen. Bitte warte 15 Minuten und versuche es nochmal.', ja: '送信回数が多すぎます。15分後にもう一度お試しください。' },
  fileErrorPrefix:     { en: 'File error: ',                        de: 'Dateifehler: ',            ja: 'ファイルエラー：' },
  fileErrorGeneric:    { en: 'Please upload a valid image or PDF under 10MB.', de: 'Bitte lade ein gültiges Bild oder PDF unter 10 MB hoch.', ja: '10MB以下の画像またはPDFファイルをアップロードしてください。' },
  fileTooLarge:        { en: 'This file is too large to upload. Please use a file under 4 MB - for a PDF, try compressing it or photographing the document instead.', de: 'Diese Datei ist zu groß. Bitte verwende eine Datei unter 4 MB - komprimiere ein PDF oder fotografiere das Dokument stattdessen.', ja: 'このファイルは大きすぎます。4MB未満のファイルをご利用ください。PDFは圧縮するか、書類を写真で撮影してください。' },
  generic:             { en: 'Something went wrong. Please try again.', de: 'Etwas ist schiefgelaufen. Bitte versuche es nochmal.', ja: 'エラーが発生しました。もう一度お試しください。' },

  // ─ Success screen ─
  thankYou:            { en: 'Thank you',                            de: 'Vielen Dank',              ja: 'ありがとうございます' },
  successBody:         { en: "We've received your details and will be in touch shortly.", de: 'Wir haben deine Daten erhalten und melden uns kurzfristig bei dir.', ja: '情報を受領しました。担当者より速やかにご連絡いたします。' },
  msgWhatsApp:         { en: 'Message us on WhatsApp',              de: 'Schreib uns auf WhatsApp', ja: 'WhatsAppでメッセージを送る' },
  followUs:            { en: "Tax, Super & Workers' rights",        de: 'Steuern, Super & Arbeitsrechte', ja: '税金・スーパー・労働者の権利' },
  followSub:           { en: 'Learn one thing every day 🙋',         de: 'Jeden Tag eine Sache lernen 🙋', ja: '毎日ひとつ学びましょう 🙋' },
  followGuides:        { en: 'Free guides below ⬇️',                de: 'Kostenlose Anleitungen unten ⬇️', ja: '無料ガイドはこちら ⬇️' },
  secureNote:          { en: 'Your information is kept secure and private.', de: 'Deine Daten werden sicher und vertraulich behandelt.', ja: 'お客様の情報は安全かつ機密に管理されます。' },

  // ─ Expenses WhatsApp block (tax form) ─
  emailInvoicesTitle:  { en: 'Send us any receipts or invoices for your work expenses on WhatsApp.', de: 'Schicke uns Belege oder Rechnungen für deine Arbeitsausgaben per WhatsApp.', ja: '業務経費の領収書や請求書をWhatsAppでお送りください。' },

  // ─ Form titles ─
  titleTFN:            { en: 'TFN Application',                     de: 'TFN-Antrag',               ja: 'TFN申請' },
  titleABN:            { en: 'ABN Registration',                    de: 'ABN-Registrierung',        ja: 'ABN登録' },
  titleTax:            {
    en: 'Tell us a bit about yourself',
    de: 'Erzähl uns ein bisschen über dich',
    ja: '簡単な自己紹介をお願いします',
  },
  titleTaxSub:         {
    en: 'so we can get started',
    de: 'damit wir loslegen können',
    ja: '手続きを始めましょう',
  },
  titleTaxStep2:       { en: 'Almost done!',                         de: 'Fast geschafft!',          ja: 'あと少しです！' },
  titleSuper:          { en: 'Super Claim (DASP)',                  de: 'Superauszahlung (DASP)',   ja: 'スーパー受取（DASP）' },

  // ─ Tax form specific ─
  tfnRequired:         { en: 'Tax File Number (TFN)',               de: 'Tax File Number (TFN)',    ja: 'タックスファイルナンバー（TFN）' },
  visa417:             { en: '417 Working Holiday',                 de: '417 Working Holiday',      ja: '417 ワーキングホリデー' },
  visa462:             { en: '462 Work and Holiday',                de: '462 Work and Holiday',     ja: '462 ワーク・アンド・ホリデー' },
  visa500:             { en: '500 Student',                         de: '500 Studentenvisum',       ja: '500 学生ビザ' },
  visaOther:           { en: 'Other',                               de: 'Andere',                   ja: 'その他' },
  visaType:            { en: 'Visa type',                           de: 'Visumstyp',                ja: 'ビザの種類' },
  arrivalDate:         { en: 'Arrival date in Australia',           de: 'Ankunftsdatum in Australien', ja: 'オーストラリア到着日' },
  departureDate:       { en: 'Departure date (or planned)',         de: 'Abreisedatum (oder geplant)', ja: '出国日（予定でも可）' },
  bankBSB:             { en: 'BSB',                                 de: 'BSB',                      ja: 'BSB' },
  bankAccount:         { en: 'Bank account number',                 de: 'Bankkontonummer',          ja: '銀行口座番号' },
  bankName:            { en: 'Bank name',                           de: 'Name der Bank',            ja: '銀行名' },
  paymentSummary:      { en: 'Payment summary / income statement',  de: 'Payment Summary / Income Statement', ja: 'Payment Summary / Income Statement（給与明細書）' },
  employerName:        { en: 'Employer name',                       de: 'Name des Arbeitgebers',    ja: '雇用主名' },
  employerABN:         { en: 'Employer ABN',                        de: 'Arbeitgeber-ABN',          ja: '雇用主のABN' },
  startDate:           { en: 'Start date',                          de: 'Startdatum',               ja: '開始日' },
  endDate:             { en: 'End date',                            de: 'Enddatum',                 ja: '終了日' },
  grossIncome:         { en: 'Gross income (AUD)',                  de: 'Bruttoeinkommen (AUD)',    ja: '総収入（AUD）' },
  taxWithheld:         { en: 'Tax withheld (AUD)',                  de: 'Einbehaltene Steuer (AUD)', ja: '源泉徴収税額（AUD）' },
  addEmployer:         { en: '+ Add another employer',              de: '+ Weiteren Arbeitgeber hinzufügen', ja: '+ 雇用主を追加' },
  removeEmployer:      { en: 'Remove',                              de: 'Entfernen',                ja: '削除' },

  // ─ Super form specific ─
  superFundName:       { en: 'Super fund name',                     de: 'Name des Superfonds',      ja: 'スーパーファンド名' },
  superMemberNumber:   { en: 'Super member number',                 de: 'Supermitgliedsnummer',     ja: 'スーパーメンバー番号' },
  superStartDate:      { en: 'Super fund start date',               de: 'Eröffnungsdatum des Superfonds', ja: 'スーパーファンド開始日' },
  hasLeftAustralia:    { en: 'Have you left Australia?',            de: 'Hast du Australien verlassen?', ja: 'オーストラリアを既に出国しましたか？' },
  visaStatus:          { en: 'Current visa status',                 de: 'Aktueller Visumsstatus',   ja: '現在のビザステータス' },
  visaExpired:         { en: 'Expired or cancelled',                de: 'Abgelaufen oder gekündigt', ja: '失効または取消済' },
  visaActive:          { en: 'Still active',                        de: 'Noch aktiv',               ja: '有効' },

  // ─ ABN form specific ─
  businessName:        { en: 'Business name (if any)',              de: 'Geschäftsname (falls vorhanden)', ja: '事業名（ある場合）' },
  businessActivity:    { en: 'Main business activity',              de: 'Hauptgeschäftstätigkeit',  ja: '主な事業内容' },
  businessAddress:     { en: 'Business address',                    de: 'Geschäftsadresse',         ja: '事業所住所' },
  businessStartDate:   { en: 'Business start date',                 de: 'Geschäftsbeginn',          ja: '事業開始日' },
  expectedIncome:      { en: 'Expected annual income (AUD)',        de: 'Erwartetes Jahreseinkommen (AUD)', ja: '予想年間収入（AUD）' },
  workType:            { en: 'Type of work',                        de: 'Art der Arbeit',           ja: '業務形態' },

  // ─ Additional shared field labels (Phase 4 expansion) ─
  passportCountryWithVisa: {
    en: 'Country that issued the passport (with visa attached)',
    de: 'Land, das den Reisepass ausgestellt hat (mit Visum)',
    ja: 'パスポート発行国（ビザ添付）',
  },
  homeAddress: {
    en: 'Full home country address',
    de: 'Vollständige Adresse in deinem Heimatland',
    ja: '本国の完全な住所',
  },
  bankHolderFull: {
    en: 'Account holder full name',
    de: 'Vollständiger Name des Kontoinhabers',
    ja: '口座名義人の氏名',
  },
  contactDetails: {
    en: 'Contact details',
    de: 'Kontaktdaten',
    ja: '連絡先情報',
  },
  taxAndSuperDetails: {
    en: 'Tax & super fund details',
    de: 'Steuer- und Super-Fonds-Daten',
    ja: '税金とスーパーファンド情報',
  },
  australianTaxResident: {
    en: 'Australian resident for tax purposes',
    de: 'Australischer Steuerresident',
    ja: 'オーストラリアの税法上の居住者',
  },
  homeCountryAddress: {
    en: 'Home Country Address',
    de: 'Adresse im Heimatland',
    ja: '本国の住所',
  },
  phoneNumber: {
    en: 'Phone Number',
    de: 'Telefonnummer',
    ja: '電話番号',
  },
  emailAddress: {
    en: 'Email Address',
    de: 'E-Mail-Adresse',
    ja: 'メールアドレス',
  },
  australianAddress: {
    en: 'Australian Address',
    de: 'Australische Adresse',
    ja: 'オーストラリアの住所',
  },
  dateOfBirth: {
    en: 'Date of Birth',
    de: 'Geburtsdatum',
    ja: '生年月日',
  },
  passportNumber: {
    en: 'Passport Number',
    de: 'Reisepassnummer',
    ja: 'パスポート番号',
  },
  passportCountryShort: {
    en: 'Passport Country',
    de: 'Reisepass-Land',
    ja: 'パスポート発行国',
  },
  firstNameShort: {
    en: 'First Name',
    de: 'Vorname',
    ja: '名',
  },
  lastNameShort: {
    en: 'Last Name',
    de: 'Nachname',
    ja: '姓',
  },
  superFundNameShort: {
    en: 'Super Fund Name',
    de: 'Name des Superfonds',
    ja: 'スーパーファンド名',
  },
  memberNumberShort: {
    en: 'Member Number',
    de: 'Mitgliedsnummer',
    ja: 'メンバー番号',
  },
  accountOpeningDate: {
    en: 'Account Opening Date',
    de: 'Kontoeröffnungsdatum',
    ja: '口座開設日',
  },
  bankNameShort: {
    en: 'Bank Name',
    de: 'Name der Bank',
    ja: '銀行名',
  },
  accountHolderName: {
    en: 'Account Holder Name',
    de: 'Name des Kontoinhabers',
    ja: '口座名義人の氏名',
  },
  accountNumberShort: {
    en: 'Account Number',
    de: 'Kontonummer',
    ja: '口座番号',
  },
  selfieShort: {
    en: 'Selfie with Passport',
    de: 'Selfie mit Reisepass',
    ja: 'パスポートと一緒の自撮り写真',
  },


  // ─ Tax form Phase 4 additions ─
  personalInfo: {
    en: 'Personal information',
    de: 'Persönliche Daten',
    ja: '個人情報',
  },
  homeCountry: {
    en: 'Home country',
    de: 'Heimatland',
    ja: '出身国',
  },
  taxInfo: {
    en: 'Tax information',
    de: 'Steuerdaten',
    ja: '税務情報',
  },
  primaryJob: {
    en: 'Main job in the past year',
    de: 'Hauptjob im letzten Jahr',
    ja: '過去1年間の主な仕事',
  },
  hasMedicare: {
    en: 'Do you have access to Medicare in Australia?',
    de: 'Hast du Zugang zu Medicare in Australien?',
    ja: 'オーストラリアでメディケア（Medicare）を利用できますか？',
  },
  bankStatements: {
    en: 'Bank statement',
    de: 'Bankauszug',
    ja: '銀行明細書',
  },
  uploadBankStatement: {
    en: 'Upload bank statement',
    de: 'Bankauszug hochladen',
    ja: '銀行明細書をアップロード',
  },
  bankStatementHint: {
    en: 'Upload an Australian bank statement showing your name, BSB and account number to ensure your refund goes to the correct account.',
    de: 'Lade einen australischen Kontoauszug hoch, auf dem dein Name, deine BSB und deine Kontonummer zu sehen sind, damit deine Rückerstattung auf das richtige Konto geht.',
    ja: '氏名・BSB・口座番号が記載されたオーストラリアの銀行明細書をアップロードしてください。還付金が正しい口座に振り込まれるようにするためです。',
  },
  selfieHint: {
    en: 'This verifies your identity. Your photo is kept private and secure, and deleted immediately after verification.',
    de: 'Damit wird deine Identität überprüft. Dein Foto wird vertraulich und sicher behandelt und sofort nach der Überprüfung gelöscht.',
    ja: '本人確認のために使用されます。写真は厳重に保護・安全に管理され、確認完了後すぐに削除されます。',
  },
  hasExpenses: {
    en: 'Did you have any work-related expenses?',
    de: 'Hattest du arbeitsbezogene Ausgaben?',
    ja: '業務関連の経費はありましたか？',
  },
  workingHolidayMakerTax: {
    en: 'Working holiday maker for tax purposes',
    de: 'Working Holiday Maker für die Steuer',
    ja: '税法上のワーキングホリデーメーカー',
  },
  // ABN declaration
  declABN: {
    en: 'I declare that I do not own any assets in Australia and have never been issued an ABN. I intend to establish a business as a sole trader, where I will be the sole owner, with operations based in Australia.',
    de: 'Ich erkläre, dass ich kein Vermögen in Australien besitze und noch nie eine ABN bekommen habe. Ich beabsichtige, ein Geschäft als Einzelunternehmer (Sole Trader) zu führen, bei dem ich alleiniger Inhaber bin, mit Sitz in Australien.',
    ja: 'オーストラリアに資産を所有しておらず、ABNが発行されたことがないことを宣言します。オーストラリアに拠点を置く個人事業主（Sole Trader）として事業を運営する意向です。',
  },
  // Tax form income disclosure declaration

} as const

export type FormStringKey = keyof typeof formStrings
export const t = (key: FormStringKey, lang: FormLang): string => formStrings[key][lang]
