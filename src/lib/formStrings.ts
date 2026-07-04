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
    en: 'Please fill out the form in English only.',
    de: 'Bitte fülle alle Felder auf Englisch aus. Die deutsche Übersetzung ist nur zur Hilfe.',
    ja: 'すべての項目を英語でご記入ください。日本語の表示は補助のみです。',
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
  sectionSuper:        { en: 'Super fund details',        de: 'Superfondsdaten',            ja: 'スーパーファンド情報' },
  sectionEmployers:    { en: 'Employers',                 de: 'Arbeitgeber',                ja: '雇用主情報' },

  // ─ Field labels - shared ─
  firstName:           { en: 'First name (including middle name)', de: 'Vorname (inkl. Zweitname)', ja: '名（ミドルネーム含む）' },
  lastName:            { en: 'Last name',                          de: 'Nachname',                  ja: '姓' },
  country:             { en: 'Country of passport',                de: 'Land des Reisepasses',      ja: 'パスポート発行国' },
  passport:            { en: 'Passport number',                    de: 'Reisepassnummer',           ja: 'パスポート番号' },
  email:               { en: 'Email address',                      de: 'E-Mail-Adresse',             ja: 'メールアドレス' },
  dob:                 { en: 'Date of birth',                      de: 'Geburtsdatum',              ja: '生年月日' },
  whatsapp:            { en: 'WhatsApp Number',                    de: 'WhatsApp-Nummer',           ja: 'WhatsApp番号' },
  auPhone:             { en: 'Australian phone number',            de: 'Australische Telefonnummer', ja: 'オーストラリアの電話番号' },
  gender:              { en: 'Gender as shown in passport',        de: 'Geschlecht laut Reisepass', ja: 'パスポートに記載の性別' },
  marital:             { en: 'Marital status',                     de: 'Familienstand',             ja: '配偶者の有無' },
  address:             { en: 'Full Australian address (street, suburb, state, postcode)', de: 'Vollständige australische Adresse (Straße, Vorort, Bundesstaat, Postleitzahl)', ja: 'オーストラリアの完全な住所（番地、サバーブ、州、郵便番号）' },
  howHeard:            { en: 'How did you hear about us?',         de: 'Wie hast du von uns erfahren?', ja: '当社をどこで知りましたか？' },
  selfieWithPassport:  { en: 'Selfie with passport',               de: 'Selfie mit Reisepass',      ja: 'パスポートと一緒の自撮り写真' },
  uploadSelfie:        { en: 'Upload selfie with passport',        de: 'Selfie mit Reisepass hochladen', ja: 'パスポートと一緒の自撮り写真をアップロード' },
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

  // ─ Radio options ─
  female:              { en: 'Female',                              de: 'Female',                   ja: 'Female' },
  male:                { en: 'Male',                                de: 'Male',                     ja: 'Male' },
  single:              { en: 'Single',                              de: 'Single',                   ja: 'Single' },
  married:             { en: 'Married',                             de: 'Married',                  ja: 'Married' },
  yes:                 { en: 'Yes',                                 de: 'Yes',                      ja: 'Yes' },
  no:                  { en: 'No',                                  de: 'No',                       ja: 'No' },

  // ─ Validation ─
  required:            { en: 'Required',                            de: 'Pflichtfeld',              ja: '必須' },
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

  // ─ Expenses email block (tax form) ─
  emailInvoicesTitle:  { en: 'Please email your invoices / receipts', de: 'Bitte sende deine Rechnungen / Belege per E-Mail', ja: '請求書・領収書をメールでお送りください' },
  emailInvoicesTo:     { en: 'Send all your invoices and receipts to:', de: 'Sende alle Rechnungen und Belege an:', ja: 'すべての請求書・領収書を次の宛先へ送付してください：' },
  emailSubjectName:    { en: 'Use your full name as the email subject.', de: 'Verwende deinen vollständigen Namen als E-Mail-Betreff.', ja: 'メールの件名にはフルネームをご記入ください。' },
  emailSendAnytime:    { en: 'You can send this before or after submitting the form.', de: 'Du kannst dies vor oder nach dem Absenden des Formulars schicken.', ja: 'このメールはフォーム送信の前後どちらでも送信できます。' },

  // ─ Form titles ─
  titleTFN:            { en: 'TFN Application',                     de: 'TFN-Antrag',               ja: 'TFN申請' },
  titleABN:            { en: 'ABN Registration',                    de: 'ABN-Registrierung',        ja: 'ABN登録' },
  titleTax:            { en: 'Tax Return Application',              de: 'Steuererklärungsantrag',   ja: 'タックスリターン申請' },
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
    en: 'Home Country',
    de: 'Heimatland',
    ja: '出身国',
  },
  taxInfo: {
    en: 'Tax information',
    de: 'Steuerdaten',
    ja: '税務情報',
  },
  primaryJob: {
    en: 'Primary job in the past year',
    de: 'Hauptjob im letzten Jahr',
    ja: '過去1年間の主な仕事',
  },
  hasAbn: {
    en: 'Do you have an ABN?',
    de: 'Hast du eine ABN?',
    ja: 'ABNをお持ちですか？',
  },
  abnNumber: {
    en: 'ABN number',
    de: 'ABN-Nummer',
    ja: 'ABN番号',
  },
  abnIncome: {
    en: 'Total annual income under ABN (AUD)',
    de: 'Jahres-Gesamteinkommen unter ABN (AUD)',
    ja: 'ABNでの年間総収入（AUD）',
  },
  abnWork: {
    en: 'What work did you do under your ABN?',
    de: 'Welche Arbeit hast du unter ABN gemacht?',
    ja: 'ABNでどのような仕事をしましたか？',
  },
  bankStatements: {
    en: 'Bank statements',
    de: 'Bankauszüge',
    ja: '銀行明細書',
  },
  uploadBankStatement: {
    en: 'Upload bank statement',
    de: 'Bankauszug hochladen',
    ja: '銀行明細書をアップロード',
  },
  bankStatementHint: {
    en: 'Just the first page is enough. The ATO needs it to verify the refund will be paid into your account.',
    de: 'Nur die erste Seite ist ausreichend. Das ATO benötigt sie, um zu bestätigen, dass die Rückerstattung auf dein Konto ausgezahlt wird.',
    ja: '最初の1ページで十分です。ATO（豪州税務局）が還付金の振込先口座を確認するために必要です。',
  },
  hasExpenses: {
    en: 'Do you have work-related or ABN expenses?',
    de: 'Hast du arbeitsbezogene oder ABN-Ausgaben?',
    ja: '業務関連またはABN関連の経費はありますか？',
  },
  taxYear: {
    en: 'Tax year',
    de: 'Steuerjahr',
    ja: '税務年度',
  },
  taxYearSelect: {
    en: 'Please select the tax year(s) you want to file',
    de: 'Wähle das/die Steuerjahr(e), für die du einreichst',
    ja: '申告する税務年度を選択してください',
  },
  yearCurrent: {
    en: ' (current)',
    de: ' (aktuell)',
    ja: '（現在）',
  },
  taxYearsSelected: {
    en: 'tax years selected',
    de: 'Steuerjahre ausgewählt',
    ja: '税務年度を選択済み',
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
  declTaxIncome: {
    en: 'I declare under my full legal responsibility that all income earned in Australia and abroad during the relevant tax year has been truthfully and completely disclosed. I understand that any false, misleading, or incomplete declaration may constitute a tax offence under Australian law, and that Working Holiday Tax bears no liability for inaccuracies arising from information provided by me.',
    de: 'Ich erkläre unter meiner vollen rechtlichen Verantwortung, dass alle Einkommen, die im betreffenden Steuerjahr in Australien und im Ausland erzielt wurden, wahrheitsgemäß und vollständig offengelegt sind. Ich verstehe, dass jede falsche, irreführende oder unvollständige Erklärung eine Steuerstraftat nach australischem Recht darstellen kann und dass Working Holiday Tax keine Haftung für Ungenauigkeiten in den von mir bereitgestellten Informationen übernimmt.',
    ja: '私は法的責任を持って、当該税務年度中にオーストラリアおよび海外で得たすべての所得を、真実かつ完全に開示することを宣言します。虚偽、誤解を招く、または不完全な申告はオーストラリア法上の税務犯罪となる可能性があること、およびWorking Holiday Taxは私が提供した情報の不正確さについて責任を負わないことを理解しています。',
  },

} as const

export type FormStringKey = keyof typeof formStrings
export const t = (key: FormStringKey, lang: FormLang): string => formStrings[key][lang]
