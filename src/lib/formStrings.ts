/**
 * Form i18n dictionary
 * Shared between all four forms (tfn, abn, tax, super)
 * Default language: English (forms collect data in English for CRM)
 * Users can switch to German for instructions/labels - but values entered must be English.
 */
export type FormLang = 'en' | 'de'

export const formStrings = {
  // ─ Top banner ─
  langToggle: {
    en: 'Deutsch',
    de: 'English',
  },
  // The MUST-FILL-IN-ENGLISH notice
  englishOnlyNotice: {
    en: 'Please fill out the form in English only.',
    de: 'Bitte fülle alle Felder auf Englisch aus. Die deutsche Übersetzung ist nur zur Hilfe.',
  },
  englishOnlyShort: {
    en: 'English only',
    de: 'Nur Englisch',
  },

  // ─ Section titles ─
  sectionPersonal:     { en: 'Personal details',          de: 'Persönliche Daten' },
  sectionDocuments:    { en: 'Documents',                 de: 'Dokumente' },
  sectionDeclaration:  { en: 'Declaration',               de: 'Erklärung' },
  sectionWork:         { en: 'Work details',              de: 'Arbeitsdaten' },
  sectionTax:          { en: 'Tax details',               de: 'Steuerdaten' },
  sectionBusiness:     { en: 'Business details',          de: 'Geschäftsdaten' },
  sectionBank:         { en: 'Bank details',              de: 'Bankverbindung' },
  sectionSuper:        { en: 'Super fund details',        de: 'Super-Fonds-Daten' },
  sectionEmployers:    { en: 'Employers',                 de: 'Arbeitgeber' },

  // ─ Field labels - shared ─
  firstName:           { en: 'First name (including middle name)', de: 'Vorname (inkl. Zweitname)' },
  lastName:            { en: 'Last name',                          de: 'Nachname' },
  country:             { en: 'Country of passport',                de: 'Land des Reisepasses' },
  passport:            { en: 'Passport number',                    de: 'Reisepass-Nummer' },
  email:               { en: 'Email address',                      de: 'E-Mail-Adresse' },
  dob:                 { en: 'Date of birth',                      de: 'Geburtsdatum' },
  whatsapp:            { en: 'WhatsApp Number',                    de: 'WhatsApp-Nummer' },
  auPhone:             { en: 'Australian phone number',            de: 'Australische Telefonnummer' },
  gender:              { en: 'Gender as shown in passport',        de: 'Geschlecht laut Reisepass' },
  marital:             { en: 'Marital status',                     de: 'Familienstand' },
  address:             { en: 'Full Australian address (street, suburb, state, postcode)', de: 'Vollständige australische Adresse (Straße, Vorort, Bundesstaat, Postleitzahl)' },
  howHeard:            { en: 'How did you hear about us?',         de: 'Wie hast du von uns erfahren?' },
  selfieWithPassport:  { en: 'Selfie with passport',               de: 'Selfie mit Reisepass' },
  uploadSelfie:        { en: 'Upload selfie with passport',        de: 'Selfie mit Reisepass hochladen' },
  passportPhoto:       { en: 'Passport photo page',                de: 'Reisepass-Fotoseite' },
  visaGrant:           { en: 'Visa grant letter',                  de: 'Visa Grant Letter' },
  tfn:                 { en: 'Tax File Number (TFN)',              de: 'Tax File Number (TFN)' },

  // ─ Buttons & generic ─
  submit:              { en: 'Submit application →',               de: 'Antrag abschicken →' },
  submitTFN:           { en: 'Submit TFN Application →',           de: 'TFN-Antrag abschicken →' },
  submitABN:           { en: 'Submit ABN Application →',           de: 'ABN-Antrag abschicken →' },
  submitTax:           { en: 'Submit Tax Return →',                de: 'Steuererklärung abschicken →' },
  submitSuper:         { en: 'Submit Super Claim →',               de: 'Super-Antrag abschicken →' },
  submitting:          { en: 'Submitting…',                        de: 'Wird abgeschickt…' },

  // ─ Radio options ─
  female:              { en: 'Female',                              de: 'Female' },
  male:                { en: 'Male',                                de: 'Male' },
  single:              { en: 'Single',                              de: 'Single' },
  married:             { en: 'Married',                             de: 'Married' },
  yes:                 { en: 'Yes',                                 de: 'Yes' },
  no:                  { en: 'No',                                  de: 'No' },

  // ─ Validation ─
  required:            { en: 'Required',                            de: 'Pflichtfeld' },
  mustConfirmDecl:     { en: 'You must confirm this declaration to proceed', de: 'Du musst diese Erklärung bestätigen, um fortzufahren' },
  mustAcceptTerms:     { en: 'You must accept the terms',           de: 'Du musst die Bedingungen akzeptieren' },
  fixBeforeSubmit:     { en: 'Please fix the following before submitting:', de: 'Bitte korrigiere Folgendes, bevor du absendest:' },
  fieldIsRequired:     { en: 'is required',                         de: 'ist ein Pflichtfeld' },

  // ─ File upload helper ─
  tapToChoose:         { en: 'Tap to choose a file',                de: 'Tippe zum Auswählen einer Datei' },

  // ─ Declarations (shown to user, but submitted in English for CRM) ─
  declTFN: {
    en: 'I confirm that I am currently in Australia on my first visit, have never changed my name or gender, do not own any assets in Australia, and have not been issued a TFN.',
    de: 'Ich bestätige, dass ich aktuell zum ersten Mal in Australien bin, meinen Namen oder mein Geschlecht nie geändert habe, kein Vermögen in Australien besitze und noch keine TFN bekommen habe.',
  },
  declConfirm:         { en: 'I confirm this declaration',          de: 'Ich bestätige diese Erklärung' },
  acceptTerms:         { en: 'I have read and accept the',          de: 'Ich habe Folgendes gelesen und akzeptiere die' },
  clientAgreement:     { en: 'Client Agreement',                    de: 'Mandantenvereinbarung' },
  and:                 { en: '&',                                   de: 'und die' },
  privacyPolicy:       { en: 'Privacy Policy',                      de: 'Datenschutzerklärung' },

  // ─ Submission errors ─
  tooMany:             { en: 'Too many submissions. Please wait 15 minutes and try again.', de: 'Zu viele Anfragen. Bitte warte 15 Minuten und versuche es nochmal.' },
  fileErrorPrefix:     { en: 'File error: ',                        de: 'Datei-Fehler: ' },
  fileErrorGeneric:    { en: 'Please upload a valid image or PDF under 10MB.', de: 'Bitte lade ein gültiges Bild oder PDF unter 10 MB hoch.' },
  generic:             { en: 'Something went wrong. Please try again.', de: 'Etwas ist schiefgelaufen. Bitte versuche es nochmal.' },

  // ─ Success screen ─
  thankYou:            { en: 'Thank you',                            de: 'Vielen Dank' },
  successBody:         { en: "We've received your details and will be in touch shortly.", de: 'Wir haben deine Daten erhalten und melden uns kurzfristig bei dir.' },
  msgWhatsApp:         { en: 'Message us on WhatsApp',              de: 'Schreib uns auf WhatsApp' },
  followUs:            { en: "Tax, Super & Workers' rights",        de: 'Steuern, Super & Arbeitsrechte' },
  followSub:           { en: 'Learn one thing every day 🙋',         de: 'Jeden Tag eine Sache lernen 🙋' },
  followGuides:        { en: 'Free guides below ⬇️',                de: 'Kostenlose Anleitungen unten ⬇️' },
  secureNote:          { en: 'Your information is kept secure and private.', de: 'Deine Daten werden sicher und vertraulich behandelt.' },

  // ─ Form titles ─
  titleTFN:            { en: 'TFN Application',                     de: 'TFN-Antrag' },
  titleABN:            { en: 'ABN Registration',                    de: 'ABN-Registrierung' },
  titleTax:            { en: 'Tax Return Application',              de: 'Steuererklärung-Antrag' },
  titleSuper:          { en: 'Super Claim (DASP)',                  de: 'Super-Auszahlung (DASP)' },

  // ─ Tax form specific ─
  tfnRequired:         { en: 'Tax File Number (TFN)',               de: 'Tax File Number (TFN)' },
  visa417:             { en: '417 Working Holiday',                 de: '417 Working Holiday' },
  visa462:             { en: '462 Work and Holiday',                de: '462 Work and Holiday' },
  visa500:             { en: '500 Student',                         de: '500 Studentenvisum' },
  visaOther:           { en: 'Other',                               de: 'Andere' },
  visaType:            { en: 'Visa type',                           de: 'Visumstyp' },
  arrivalDate:         { en: 'Arrival date in Australia',           de: 'Ankunftsdatum in Australien' },
  departureDate:       { en: 'Departure date (or planned)',         de: 'Abreisedatum (oder geplant)' },
  bankBSB:             { en: 'BSB',                                 de: 'BSB' },
  bankAccount:         { en: 'Bank account number',                 de: 'Bank-Kontonummer' },
  bankName:            { en: 'Bank name',                           de: 'Name der Bank' },
  paymentSummary:      { en: 'Payment summary / income statement',  de: 'Payment Summary / Income Statement' },
  employerName:        { en: 'Employer name',                       de: 'Name des Arbeitgebers' },
  employerABN:         { en: 'Employer ABN',                        de: 'Arbeitgeber-ABN' },
  startDate:           { en: 'Start date',                          de: 'Startdatum' },
  endDate:             { en: 'End date',                            de: 'Enddatum' },
  grossIncome:         { en: 'Gross income (AUD)',                  de: 'Bruttoeinkommen (AUD)' },
  taxWithheld:         { en: 'Tax withheld (AUD)',                  de: 'Einbehaltene Steuer (AUD)' },
  addEmployer:         { en: '+ Add another employer',              de: '+ Weiteren Arbeitgeber hinzufügen' },
  removeEmployer:      { en: 'Remove',                              de: 'Entfernen' },

  // ─ Super form specific ─
  superFundName:       { en: 'Super fund name',                     de: 'Name des Super-Fonds' },
  superMemberNumber:   { en: 'Super member number',                 de: 'Super-Mitgliedsnummer' },
  superStartDate:      { en: 'Super fund start date',               de: 'Eröffnungsdatum des Super-Fonds' },
  hasLeftAustralia:    { en: 'Have you left Australia?',            de: 'Hast du Australien verlassen?' },
  visaStatus:          { en: 'Current visa status',                 de: 'Aktueller Visum-Status' },
  visaExpired:         { en: 'Expired or cancelled',                de: 'Abgelaufen oder gekündigt' },
  visaActive:          { en: 'Still active',                        de: 'Noch aktiv' },

  // ─ ABN form specific ─
  businessName:        { en: 'Business name (if any)',              de: 'Geschäftsname (falls vorhanden)' },
  businessActivity:    { en: 'Main business activity',              de: 'Hauptgeschäftstätigkeit' },
  businessAddress:     { en: 'Business address',                    de: 'Geschäftsadresse' },
  businessStartDate:   { en: 'Business start date',                 de: 'Geschäftsbeginn' },
  expectedIncome:      { en: 'Expected annual income (AUD)',        de: 'Erwartetes Jahreseinkommen (AUD)' },
  workType:            { en: 'Type of work',                        de: 'Art der Arbeit' },

  // ─ Placeholders (kept English since user enters English data) ─
  // These remain identical - just listed here for clarity
} as const

export type FormStringKey = keyof typeof formStrings
export const t = (key: FormStringKey, lang: FormLang): string => formStrings[key][lang]
