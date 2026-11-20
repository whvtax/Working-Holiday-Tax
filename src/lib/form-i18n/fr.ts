// French (tu).
// written by an agent, not checked by a native speaker (18 Nov 2026)
// Reviewed against the English source on 18 Nov 2026 (see docs/engineering/form-i18n-review/fr.md).
// \u00A0 is a non-breaking space: French puts a space before ? ! : and inside « », and it must not wrap.
import type { LocaleBlock } from './index'

export const fr: LocaleBlock = {
  // Header and steps
  langPicker: 'Langue',
  englishOnlyNotice: 'Choisis ta langue pour lire les instructions, mais écris tes réponses en anglais, s’il te plaît.',
  titleTax: 'Parle-nous un peu de toi',
  titleTaxSub: 'pour qu’on puisse démarrer',
  titleTaxStep2: 'C’est presque fini\u00A0!',
  timeEstimate: '⏱ Ça prend environ 1 minute',
  registeredAgentNo: 'Sous la supervision d’un registered tax agent, n°',

  // Step 1
  whatsapp: 'Le numéro WhatsApp avec lequel tu nous as écrit',
  waHint: 'Utilise le même numéro que celui avec lequel tu nous écris, pour qu’on puisse relier ton formulaire à notre conversation.',
  phWaNumber: '+33 6 XX XX XX XX',
  auPhone: 'Numéro de téléphone australien',
  givenNames: 'Prénom(s)',
  phGiven: 'Exactement comme sur ton passeport',
  lastName: 'Nom de famille',
  phLast: 'Comme sur ton passeport',
  dob: 'Date de naissance',
  tfn: 'Tax File Number (TFN)',
  email: 'Adresse e-mail',
  phEmail: 'ton@email.fr',
  addressShort: 'Adresse en Australie',
  phAddress: 'ex.\u00A0: 12 Smith Street, Bondi NSW 2026',
  primaryJob: 'Job principal de l’année écoulée',
  phJob: 'ex.\u00A0: Farm worker, Barista (en anglais)',
  continueButton: 'Continuer →',

  // Step 2
  hasMedicare: 'As-tu accès à Medicare en Australie\u00A0?',
  yes: 'Oui',
  no: 'Non',
  marital: 'Situation familiale',
  single: 'Célibataire',
  married: 'Marié(e)',
  expensesQuestion: 'As-tu des {link}dépenses liées à ton travail{/link}\u00A0?',
  hasOtherIncome: 'As-tu d’autres revenus\u00A0?',
  otherIncomeWhat: 'Quels revenus\u00A0?',
  otherIncomePh: 'ex.\u00A0: revenus de l’étranger, intérêts, actions, loyers',
  invoicesLabel: 'Reçus ou factures',
  invoicesHint: 'Tu peux ajouter jusqu’à 10 factures gratuitement.',
  uploadInvoices: 'Ajouter des reçus',
  invoicesRequired: 'Ajoute au moins un reçu ou une facture, ou réponds Non à la question ci-dessus.',
  homeCountry: 'Pays d’origine',
  phCountry: 'ex.\u00A0: France',
  howHeard: 'Comment nous as-tu connus\u00A0?',
  phHowHeard: 'ex.\u00A0: Instagram, TikTok, un ami...',
  bankStatements: 'Relevé bancaire',
  bankStatementHint: 'Ajoute un relevé de ton compte bancaire australien (PDF) où l’on voit ton nom, ton BSB et ton numéro de compte. Comme ça, s’il y a un remboursement, il arrive sur le bon compte.',
  uploadBankStatement: 'Ajouter le relevé bancaire',
  selfieWithPassport: 'Selfie avec ton passeport en main',
  selfieHint: 'Ça sert à vérifier ton identité. Ta photo reste privée et sécurisée, et elle est supprimée dès que la vérification est faite.',
  uploadSelfie: 'Ajouter le selfie avec passeport',
  tapToChoose: 'Appuie pour choisir un fichier',
  tapToAddFiles: 'Appuie pour ajouter des fichiers ({n} max.)',
  addMoreFiles: 'En ajouter d’autres ({n}/{max})',
  filePreviewAlt: 'aperçu',
  sectionDeclaration: 'Déclaration',
  declaration: 'J’ai lu et j’accepte le {ca}Client Agreement (contrat client){/ca} et la {pp}Privacy Policy (politique de confidentialité){/pp}.',
  mustAgree: 'Tu dois accepter pour pouvoir envoyer',
  checkResidency: 'Continuer\u00A0: résidence fiscale →',
  checkResidencyNote: 'Dernière étape\u00A0: la résidence fiscale, puis tu pourras envoyer.',

  // Validation
  required: 'Obligatoire',
  fieldIsRequired: '(obligatoire)',
  fixBeforeSubmit: 'Avant d’envoyer, corrige ceci\u00A0:',
  invalidEmail: 'Saisis une adresse e-mail valide',
  invalidTfn: 'Un TFN compte 8 ou 9 chiffres',
  invalidDob: 'Vérifie la date de naissance',
  invalidAuPhone: 'Saisis ton numéro de portable australien, ex.\u00A0: 0412 345 678',
  invalidPhone: 'Saisis un numéro valide avec l’indicatif du pays, ex.\u00A0: +33 6 12 34 56 78',

  // Sending and errors
  submitTax: 'Envoyer ma déclaration →',
  submitting: 'Envoi en cours…',
  tooMany: 'Trop d’envois. Attends 15 minutes, puis réessaie.',
  checkFields: 'Vérifie ces informations, puis réessaie\u00A0: ',
  somethingWrong: 'Un problème est survenu. Réessaie ou contacte-nous directement.',
  refPrefix: 'référence ',
  fileErrorPrefix: 'Erreur de fichier\u00A0: ',
  fileErrorGeneric: 'Ajoute une image ou un PDF valide de moins de 4 Mo.',
  fileTooLarge: 'Ce fichier est trop lourd. Utilise un fichier de moins de 4 Mo. Pour un PDF, compresse-le ou prends plutôt le document en photo.',
  uploadFailedRequired: 'Les fichiers obligatoires n’ont pas pu être envoyés. Vérifie que ce sont des images ou des PDF de moins de 4 Mo, puis réessaie.',
  uploadFailedFile: 'Échec de l’envoi de «\u00A0{name}\u00A0»\u00A0: {reason}',
  unknownError: 'Erreur inconnue',

  // Link already used
  linkUsedTitle: 'Ce formulaire a déjà été envoyé',
  linkUsedBody: 'Merci, on a bien tes informations. Si tu dois modifier quelque chose, écris-nous sur WhatsApp et on s’en occupe.',

  // Thank-you screen
  thankYou: 'Merci',
  successNextLead: 'On a bien reçu tes informations. Voici la suite\u00A0:',
  stepReceived: 'Informations reçues',
  stepWhatsApp: 'On t’écrit sur WhatsApp',
  stepRefund: 'Ta déclaration est vérifiée puis déposée auprès de l’ATO',
  etaLabel: 'On t’écrit en général sous 24 heures',
  msgWhatsApp: 'Écris-nous sur WhatsApp',
  waPrefill: 'Bonjour ! Je viens d’envoyer mon formulaire 😊',
}
