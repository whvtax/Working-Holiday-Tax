/**
 * German blog data
 *
 * Contains German translations for:
 *   - UI strings (search, pagination, "Read more", etc.)
 *   - Category metadata (titles, descriptions, intros, FAQs)
 *   - Per-post translations (title, description, optionally body)
 *
 * Posts without German body translations fall back to English with a notice.
 */
import type { Category, CategoryMeta, Guide } from '@/app/blog/data'
import { categoryMeta as enCategoryMeta, guides as enGuides } from '@/app/blog/data'

// ─── UI STRINGS ────────────────────────────────────────────────────────────
export const blogUI = {
  // Hero
  breadcrumbHome:      'Startseite',
  breadcrumbBlog:      'Blog',
  blogLabel:           'Blog',
  h1Line1:             'Alles, was du wissen musst',
  h1Line2:             'über Steuern in Australien',
  description:         'Praktische Artikel zu TFN, Steuererklärung, Super und ABN - geschrieben für Working Holiday Maker, einfach erklärt.',

  // Stats
  statsArticles:       'Artikel',
  statsCategories:     'Kategorien',
  statsCountries:      'Länder',
  statsBackpackers:    'Backpackern geholfen',

  // Search & filters
  searchPlaceholder:   'Artikel durchsuchen...',
  clearSearch:         'Suche löschen',
  allArticles:         'Alle Artikel',
  noResults:           'Keine Artikel gefunden für',
  showingResults:      'Es werden',
  resultsMatching:     'Artikel angezeigt, die mit',
  matching:            'übereinstimmen',
  tryDifferent:        'Versuch einen anderen Suchbegriff oder durchsuche alle Artikel.',
  noArticlesCategory:  'In dieser Kategorie gibt es noch keine Artikel.',

  // Article card
  minRead:             'Min. Lesezeit',
  readMore:            'Mehr lesen',

  // Pagination
  showing:             'Zeige',
  of:                  'von',
  article:             'Artikel',
  articles:            'Artikeln',

  // Article page
  backToBlog:          '← Zurück zum Blog',
  publishedOn:         'Veröffentlicht am',
  updatedOn:           'Aktualisiert am',
  inThisArticle:       'In diesem Artikel',
  shareArticle:        'Artikel teilen',
  relatedArticles:     'Verwandte Artikel',
  needHelp:            'Brauchst du Hilfe?',
  needHelpBody:        'Unser Team von registrierten Steueragenten hilft Working Holiday Makern bei TFN, Steuererklärung, Super und ABN.',
  contactCTA:          'Kontaktiere uns →',

  // Translation notice (when post body is still English)
  englishOnlyNotice:   'Dieser Artikel ist noch nicht auf Deutsch verfügbar. Im Folgenden findest du die englische Version. Bei Fragen schreib uns gerne auf Deutsch.',
} as const

// ─── CATEGORY METADATA TRANSLATIONS ────────────────────────────────────────
type DeCategoryMeta = {
  category: Category
  slug: string
  title: string
  description: string
  intro: string
  faq: Array<{ question: string; answer: string }>
  relatedServicePath: string
  relatedServiceLabel: string
}

export const deCategoryMeta: DeCategoryMeta[] = [
  // TFN
  {
    category: 'TFN',
    slug: 'tfn',
    title: 'TFN-Blog-Artikel für Working Holiday Maker in Australien',
    description: 'Alles, was du als Working Holiday Maker über die Tax File Number (TFN) wissen musst. Wie du sie beantragst, Bearbeitungszeiten und was du tun kannst, wenn etwas schiefläuft.',
    intro: 'Eine Tax File Number (TFN) ist die 9-stellige Identifikationsnummer, die das ATO (australisches Finanzamt) jeder Person ausstellt, die in Australien Einkommen hat. Als Working Holiday Maker brauchst du eine TFN, bevor du anfängst zu arbeiten - sonst muss dein Arbeitgeber 45 % Steuern einbehalten statt der 15 % Working Holiday-Rate. Diese Artikel decken alles ab, von deiner ersten TFN-Beantragung bis hin zu Verzögerungen, verlorenen Nummern und Rückkehr mit Zweitvisum.',
    faq: [
      { question: 'Brauchen Working Holiday Maker eine TFN in Australien?', answer: 'Ja. Jeder Working Holiday Maker, der in Australien Einkommen hat, braucht eine Tax File Number. Ohne eine bei deinem Arbeitgeber registrierte TFN muss er gesetzlich 45 % Steuern einbehalten - statt der 15 % Working Holiday Maker-Rate.' },
      { question: 'Wie lange dauert es, eine TFN zu bekommen?', answer: 'Das ATO (australisches Finanzamt) bearbeitet TFN-Anträge innerhalb von 28 Tagen. Deine TFN wird per Brief an deine australische Postadresse geschickt. Viele Antragsteller bekommen sie innerhalb von zwei Wochen.' },
      { question: 'Ist der TFN-Antrag kostenlos?', answer: 'Ja. Die Beantragung einer TFN ist kostenlos. Es gibt keine Behördengebühr. Der Online-Antrag dauert etwa 10 Minuten.' },
      { question: 'Kann man in Australien ohne TFN anfangen zu arbeiten?', answer: 'Ja, du kannst ohne TFN anfangen zu arbeiten, aber dein Arbeitgeber muss 45 % Steuern einbehalten, bis du eine TFN bereitstellst. Die zu viel gezahlte Steuer kannst du dir mit deiner Steuererklärung zurückholen.' },
    ],
    relatedServicePath: '/de/tfn',
    relatedServiceLabel: 'Deine TFN beantragen',
  },
  // ABN
  {
    category: 'ABN',
    slug: 'abn',
    title: 'ABN-Blog-Artikel für Working Holiday Maker in Australien',
    description: 'Alles, was du als Backpacker über die Australian Business Number (ABN) wissen musst. Wann du eine brauchst, wie du dich registrierst und was das für deine Steuer bedeutet.',
    intro: 'Eine Australian Business Number (ABN) ist eine 11-stellige Identifikationsnummer, die du brauchst, wenn du in Australien als Selbstständiger (Sole Trader) oder unabhängiger Contractor arbeitest. Du brauchst eine ABN, wenn ein Unternehmen dich bezahlt, indem du ihm Rechnungen stellst, statt dass du auf der Gehaltsabrechnung stehst. Diese Artikel decken Registrierung, wann eine ABN die richtige Wahl ist und wie das Arbeiten unter einer ABN deine Steuer, Super und Ansprüche beeinflusst.',
    faq: [
      { question: 'Brauchen Working Holiday Maker eine ABN in Australien?', answer: 'Du brauchst eine ABN, wenn du als unabhängiger Contractor oder Selbstständiger arbeitest, das heißt: wenn du Rechnungen für deine Arbeit stellst, statt auf einer Gehaltsabrechnung zu stehen. Die meisten Working Holiday Maker in normalen Anstellungen brauchen keine ABN.' },
      { question: 'Wie viel kostet eine ABN?', answer: 'Die Registrierung einer ABN über das Australian Business Register ist kostenlos. Jeder Service, der dir Geld für die Registrierung selbst berechnet, verlangt Geld für einen kostenlosen Behördenprozess.' },
      { question: 'Was ist der Unterschied zwischen TFN und ABN?', answer: 'Deine TFN identifiziert dich gegenüber dem ATO als Einzelperson für Steuerzwecke. Eine ABN identifiziert dich, wenn du als Unternehmen oder Selbstständiger tätig bist. Eine TFN brauchst du immer; eine ABN nur, wenn du selbstständig arbeitest.' },
      { question: 'Bekomme ich Super, wenn ich unter einer ABN arbeite?', answer: 'In der Regel nicht. Wenn du als Contractor (mit ABN) arbeitest, zahlst du selbst deine Super-Beiträge ein. Wenn du als Angestellter (mit TFN) eingestellt bist, zahlt dein Arbeitgeber 12 % deines Lohns als Super ein.' },
    ],
    relatedServicePath: '/de/abn',
    relatedServiceLabel: 'Deine ABN beantragen',
  },
  // Tax Return
  {
    category: 'Tax Return',
    slug: 'tax-return',
    title: 'Steuererklärung-Blog-Artikel für Working Holiday Maker',
    description: 'Alles über die Steuererklärung in Australien: wann sie fällig ist, wie du absetzbare Kosten geltend machst und wie du deine Rückzahlung maximierst.',
    intro: 'Die Steuererklärung in Australien (Tax Return) ist die jährliche Abrechnung zwischen dir und dem ATO. Du gibst an, wie viel du verdient hast, machst absetzbare Kosten geltend und gleichst das mit der schon einbehaltenen Steuer ab. Die meisten Working Holiday Maker bekommen Tausende Dollar zurück, weil zu viel Steuer einbehalten wurde. Diese Artikel decken Termine, Absetzungen, häufige Fehler und wie du deine maximale Rückzahlung bekommst.',
    faq: [
      { question: 'Wann muss ich meine Steuererklärung in Australien machen?', answer: 'Das australische Steuerjahr läuft vom 1. Juli bis 30. Juni. Du hast bis zum 31. Oktober Zeit, um deine Steuererklärung einzureichen - wenn du sie selbst machst. Mit einem registrierten Steueragenten hast du bis Mai des Folgejahres Zeit.' },
      { question: 'Was kann ich als Working Holiday Maker absetzen?', answer: 'Du kannst arbeitsbezogene Kosten absetzen: Arbeitskleidung (z.B. Schutzkleidung, Uniformen), Werkzeuge und Ausrüstung, Lizenzen wie RSA oder White Card, Wäsche von Arbeitskleidung, Fahrten zwischen Arbeitsorten (nicht der tägliche Arbeitsweg) und Spenden an registrierte Wohltätigkeitsorganisationen.' },
      { question: 'Wie hoch ist die durchschnittliche Steuerrückzahlung für WHM?', answer: 'Working Holiday Maker bekommen im Schnitt zwischen 2.000 und 3.500 AUD zurück, je nach Einkommen, Visum-Status und absetzbaren Kosten. Die meisten haben im Laufe des Jahres zu viel Steuer gezahlt.' },
      { question: 'Kann ich meine Steuererklärung machen, nachdem ich Australien verlassen habe?', answer: 'Ja. Du kannst die Steuererklärung von überall auf der Welt einreichen, auch nach deiner Abreise aus Australien. Die Rückzahlung kann auf ein australisches oder ein ausländisches Konto überwiesen werden.' },
    ],
    relatedServicePath: '/de/tax-return',
    relatedServiceLabel: 'Deine Steuererklärung machen',
  },
  // Super
  {
    category: 'Super',
    slug: 'super',
    title: 'Super-Blog-Artikel für Working Holiday Maker',
    description: 'Alles über Superannuation (Super): wie es funktioniert, wann du es zurückbekommst und wie du den DASP-Antrag stellst, wenn du Australien verlässt.',
    intro: 'Superannuation (Super) ist das australische Rentensystem. Per Gesetz zahlt dein Arbeitgeber 12 % deines Lohns zusätzlich zu deinem Gehalt in einen Super-Fonds ein. Als Working Holiday Maker kannst du dieses Geld zurückbekommen, wenn du Australien verlässt - über den DASP-Prozess (Departing Australia Superannuation Payment). Für die meisten Backpacker sind das zwischen 2.000 und 5.000 AUD. Diese Artikel erklären, wie Super funktioniert, wie du es findest und wie du es richtig zurückholst.',
    faq: [
      { question: 'Wie viel Super zahlt mein Arbeitgeber für mich ein?', answer: 'In Australien zahlt dein Arbeitgeber 12 % deines Bruttolohns als Super ein, zusätzlich zu deinem Gehalt. Wenn du also 1.000 AUD pro Woche verdienst, gehen weitere 120 AUD in deinen Super-Fonds.' },
      { question: 'Kann ich meine Super zurückbekommen, wenn ich Australien verlasse?', answer: 'Ja. Als Working Holiday Maker kannst du eine Departing Australia Superannuation Payment (DASP) beantragen, sobald du Australien verlassen hast und dein Visum abgelaufen oder gekündigt ist. Die Auszahlung wird mit 65 % besteuert, aber die restlichen 35 % sind echtes Geld für dich.' },
      { question: 'Wie lange dauert die DASP-Auszahlung?', answer: 'Nach Einreichung des DASP-Antrags dauert die Auszahlung normalerweise 2-4 Wochen. Das Geld kommt direkt auf dein Bankkonto (australisch oder ausländisch).' },
      { question: 'Was, wenn ich mehrere Super-Konten habe?', answer: 'Wenn du für mehrere Arbeitgeber gearbeitet hast, hast du wahrscheinlich mehrere Super-Konten. Du kannst alle zusammen finden lassen und einen einzigen DASP-Antrag stellen, der alle Konten abdeckt.' },
    ],
    relatedServicePath: '/de/superannuation',
    relatedServiceLabel: 'Deine Super beantragen',
  },
  // Work Rights
  {
    category: 'Work Rights',
    slug: 'work-rights',
    title: 'Arbeitsrechte-Blog-Artikel für Working Holiday Maker',
    description: 'Deine Rechte als Arbeitnehmer in Australien: Mindestlohn, Pausen, Überstunden, Job-Kündigung und was tun, wenn dein Arbeitgeber dich abzockt.',
    intro: 'Als Working Holiday Maker hast du in Australien dieselben Arbeitsrechte wie ein australischer Arbeitnehmer. Du hast Anspruch auf Mindestlohn, Pausen, Überstundenvergütung und Schutz vor unfairem Verhalten. Leider werden Backpacker oft ausgenutzt - vor allem auf Farmen und in der Gastronomie. Diese Artikel erklären deine Rechte, was du tun kannst, wenn etwas schiefläuft, und wie du dich vor Betrug schützt.',
    faq: [
      { question: 'Wie viel ist der Mindestlohn in Australien?', answer: 'Der nationale Mindestlohn in Australien liegt bei 24,10 AUD pro Stunde brutto (Stand 1. Juli 2024). Für Casual-Arbeit gibt es einen Aufschlag von 25 %. Bestimmte Branchen (z.B. Gastronomie, Landwirtschaft) haben eigene Awards mit höheren Sätzen.' },
      { question: 'Was ist Casual Loading und wie viel ist das?', answer: 'Casual Loading ist ein Aufschlag von 25 % auf den Stundenlohn für Casual-Arbeiter. Das gleicht aus, dass Casuals keinen bezahlten Urlaub und keinen Krankheitslohn bekommen. Wenn dein Arbeitgeber dir keinen Casual Loading zahlt, hat er möglicherweise gegen das Gesetz verstoßen.' },
      { question: 'Habe ich Anspruch auf Pausen während der Arbeit?', answer: 'Ja. Bei einer Schicht von 4-5 Stunden hast du Anspruch auf eine 10-minütige unbezahlte Pause. Bei 5-7 Stunden: 1 Pause von 30 Minuten unbezahlt. Bei mehr als 9 Stunden: zusätzliche Pausen. Genauere Regeln stehen in deinem Award.' },
      { question: 'Was kann ich tun, wenn mein Arbeitgeber mich nicht bezahlt?', answer: 'Dokumentiere alles (Arbeitsstunden, Lohnabrechnungen, Mitteilungen). Sprich deinen Arbeitgeber zuerst an. Wenn das nicht funktioniert, melde es bei der Fair Work Ombudsman - das ist die kostenlose Bundesbehörde für Arbeitnehmerrechte. Du kannst auch unsicher bei einem Steueragenten Rat einholen.' },
    ],
    relatedServicePath: '/de/contact',
    relatedServiceLabel: 'Bei Arbeitsrechtsfragen kontaktieren',
  },
  // Medicare & Other
  {
    category: 'Medicare & Other',
    slug: 'medicare',
    title: 'Medicare-Blog-Artikel und andere Steuerthemen',
    description: 'Medicare, Medicare Levy-Befreiung, Steuerresidenz, Doppelbesteuerung und andere Themen für Working Holiday Maker in Australien.',
    intro: 'Medicare ist das öffentliche Gesundheitssystem in Australien. Es wird teilweise durch die 2 %-Medicare Levy finanziert, die automatisch von deinem zu versteuernden Einkommen abgezogen wird. Die meisten Working Holiday Maker haben keinen Anspruch auf Medicare und sollten daher eine Befreiung beantragen. Diese Artikel decken Medicare-Berechtigung, die Levy-Befreiung, Sozialversicherungsabkommen (RHCA) und andere wichtige Steuerthemen ab.',
    faq: [
      { question: 'Habe ich als deutscher Working Holiday Maker Anspruch auf Medicare?', answer: 'Nein. Deutschland hat KEIN Sozialversicherungsabkommen (RHCA) mit Australien. Das heißt: Als deutscher Working Holiday Maker hast du keinen Anspruch auf Medicare. Stattdessen solltest du eine Medicare Levy-Befreiung bei deiner Steuererklärung beantragen.' },
      { question: 'Was ist die Medicare Levy-Befreiung?', answer: 'Wenn du keinen Anspruch auf Medicare hast - was auf die meisten Working Holiday Visum-Inhaber zutrifft - kannst du bei deiner Steuererklärung eine Medicare Levy-Befreiung beantragen. Das spart dir die 2 %-Levy auf dein Einkommen, was Hunderte bis Tausende Dollar betragen kann.' },
      { question: 'Welche Länder haben ein Sozialversicherungsabkommen (RHCA) mit Australien?', answer: 'Aktuell haben Großbritannien, Neuseeland, Irland, Schweden, Niederlande, Finnland, Belgien, Italien, Malta, Norwegen und Slowenien ein RHCA mit Australien. Deutschland NICHT.' },
      { question: 'Brauche ich eine private Krankenversicherung in Australien?', answer: 'Eine private Krankenversicherung ist nicht zwingend nötig, aber sehr empfehlenswert für Working Holiday Maker ohne Medicare-Anspruch. Sie deckt medizinische Kosten ab, die du sonst selbst zahlen müsstest. Das ist getrennt von der Medicare Levy.' },
    ],
    relatedServicePath: '/de/medicare',
    relatedServiceLabel: 'Medicare-Status prüfen',
  },
]

// ─── PER-POST TRANSLATIONS ─────────────────────────────────────────────────
/**
 * Map from English slug → German translation (partial).
 * When `body` is missing, the English body is shown with a notice.
 *
 * Format:
 *   'english-slug': {
 *     title: 'German title',
 *     description: 'German description',
 *     body: '...full German Markdown body...',  // optional
 *   }
 */
export const dePostTranslations: Record<string, { title: string; description: string; body?: string }> = {
  // ─── TFN (10 posts translated) ─────────────────────────────────────────────

  'what-is-a-tfn': {
    title: 'Was ist eine TFN und warum brauchst du eine in Australien?',
    description: 'Eine Tax File Number ist das Erste, was du brauchst, wenn du in Australien anfängst zu arbeiten. Ohne eine muss dein Arbeitgeber fast die Hälfte deines Lohns einbehalten.',
    body: `
Eine Tax File Number (TFN) ist eine eindeutige 9-stellige Nummer, die das ATO (australisches Finanzamt) jeder Person ausstellt, die in Australien Einkommen hat. Du brauchst sie, weil ohne TFN dein Arbeitgeber gesetzlich verpflichtet ist, 45 % Steuern einzubehalten - statt der 15 % Working Holiday Maker-Rate. Die TFN ist permanent, kostenlos und bleibt ein Leben lang gültig.

Jeder Arbeitnehmer in Australien braucht eine TFN, egal ob du Staatsbürger, ständig Wohnhafter oder Backpacker mit Working Holiday Visum bist. Das ATO nutzt sie, um dein Einkommen, deine Steuerzahlungen und mögliche Rückzahlungen zu verfolgen.

## Warum ist eine TFN ab dem ersten Tag wichtig?

Die TFN bestimmt, wie viel Steuer dein Arbeitgeber von deinem Lohn einbehält. Als Working Holiday Maker mit hinterlegter TFN gilt für deinen Lohn ein Satz von 15 %. Ohne TFN muss dein Arbeitgeber 45 % einbehalten - der höchste Grenzsteuersatz.

Der Unterschied summiert sich schnell:

- Wochenlohn von 1.000 $: jede Woche 320 $ zusätzlich einbehalten ohne TFN
- Wochenlohn von 1.500 $: jede Woche 480 $ zusätzlich einbehalten ohne TFN
- Über drei Monate Vollzeitarbeit sind das Tausende von Dollar, die beim ATO liegen statt auf deinem Konto

Das zu viel Gezahlte kannst du dir bei der Steuererklärung zurückholen, aber bis dahin hast du keinen Zugriff auf das Geld.

## Wofür nutzt das ATO deine TFN?

Das ATO nutzt deine TFN als Verbindung zwischen dir und jedem Teil deines finanziellen Lebens in Australien. Sie ist nötig, um:

- Deine [jährliche Steuererklärung](/de/tax-return) am Ende des Steuerjahres einzureichen
- Auf dein [Super-Konto](/de/superannuation) zuzugreifen und es zu beantragen, wenn du Australien verlässt
- Bestimmte australische Bankkonten zum korrekten (nicht-einbehaltenen) Satz zu eröffnen
- Steuerrückzahlungen zu bekommen, die dir zustehen

Jede andere steuerliche Verpflichtung - Steuererklärung, Super-Antrag oder ABN-Registrierung - ist mit deiner TFN verknüpft.

## Wer kann in Australien eine TFN beantragen?

Jeder Visum-Inhaber mit Arbeitserlaubnis in Australien kann eine TFN beantragen. Das umfasst:

- Working Holiday Visum Subclass 417
- Work and Holiday Visum Subclass 462
- Studentenvisa mit Arbeitsrecht
- Die meisten temporären Fachkräftevisa

Der Antrag ist kostenlos, dauert etwa 10 Minuten und wird innerhalb von 28 Tagen bearbeitet. Unser Team kümmert sich um den kompletten Antrag für dich, sodass du dich nicht mit dem Papierkram herumärgern musst.

## Wie gibst du deinem Arbeitgeber deine TFN?

Sobald du deine TFN erhalten hast, fülle für jeden Arbeitgeber, bei dem du arbeitest, ein Tax File Number Declaration-Formular aus. Dieses Formular teilt deinem Arbeitgeber mit, welchen Steuersatz er auf deinen Lohn anwenden soll - und ist das offizielle Dokument, das den korrekten 15 %-Satz auslöst.

Reiche das Formular zügig ein. Bis dein Arbeitgeber es hat, muss er den höchsten Satz einbehalten, egal welches Visum du hast. Das gilt für jeden Arbeitgeber, auch für Casual- und Kurzzeitjobs.

## Was passiert, wenn du schon ohne TFN angefangen hast zu arbeiten?

Beantrage deine TFN so schnell wie möglich und sag deinem Arbeitgeber, dass dein Antrag läuft. Zeig ihm die Bestätigungs-E-Mail vom ATO, falls du sie hast. Sobald deine TFN bei ihm registriert ist, gilt der korrekte Steuersatz für alle künftigen Zahlungen.

Steuer, die du zu viel gezahlt hast, bevor deine TFN hinterlegt war, kannst du dir mit deiner [Steuererklärung](/de/tax-return) am Ende des Steuerjahres zurückholen. Das Geld geht nicht dauerhaft verloren, solange du die Steuererklärung fristgerecht einreichst.

[Kontaktiere unser Team](/de/contact), um deine TFN über unseren registrierten Steueragenten-Service zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 `,
  },

  'how-to-apply-for-a-tfn': {
    title: 'Wie du als Working Holiday Maker eine TFN beantragst',
    description: 'Eine TFN in Australien zu beantragen ist einfach und kostenlos. Hier ist genau, wie du es als Working Holiday Visum-Inhaber machst.',
    body: `
Um als Working Holiday Maker eine Tax File Number (TFN) zu beantragen, reichst du einen Online-Antrag direkt beim ATO (australisches Finanzamt) ein. Der Antrag ist kostenlos, dauert etwa 10 Minuten und deine TFN kommt innerhalb von 28 Tagen per Post. Du kannst den Antrag stellen, sobald dein Working Holiday Visum genehmigt wurde - sogar bevor du in Australien ankommst - solange du eine gültige australische Postadresse hast.

## Wer bearbeitet deinen TFN-Antrag?

TFN-Anträge für ausländische Reisepass-Inhaber werden vom ATO (australisches Finanzamt) bearbeitet. Nach der Genehmigung wird deine TFN innerhalb von 28 Tagen per Post zu dir geschickt - oft auch schneller in ruhigeren Bearbeitungszeiten.

## Was du brauchst, bevor du den Antrag stellst

Für den TFN-Antrag brauchst du:

- Deinen Reisepass (Nummer, Geburtsdatum und Visa-Details)
- Eine gültige australische Wohnadresse, an die das ATO deinen TFN-Brief schicken kann
- Eine gültige E-Mail-Adresse für Antragsbestätigungen

Wenn du noch keine feste Unterkunft hast, geht auch eine Hostel-Adresse - solange du sicher bist, dass du noch dort bist, wenn der Brief ankommt. Du bekommst zwei E-Mails vom ATO: eine bestätigt den Eingang des Antrags, die andere informiert dich, wenn der Antrag bearbeitet wurde.

## Wie der TFN-Antragsprozess Schritt für Schritt abläuft

Sobald du deinen Antrag eingereicht hast, schickt dir das ATO eine Referenznummer per E-Mail als Bestätigung, dass der Antrag läuft. Hebe diese Referenznummer auf - sie ist der einfachste Weg, nachzufassen, falls etwas schiefläuft.

Deine TFN selbst kommt innerhalb von 28 Tagen als Brief an deine australische Adresse. Bewahre diesen Brief sicher auf. Das ATO kann dir später bei einer vergessenen TFN helfen, aber es ist viel einfacher, das Original griffbereit zu haben.

## Kannst du anfangen zu arbeiten, bevor deine TFN da ist?

Ja. Du kannst anfangen zu arbeiten, bevor deine TFN ankommt, aber informiere deinen Arbeitgeber, dass dein Antrag läuft, und zeige ihm die ATO-Bestätigungs-E-Mail, wenn du sie hast. Technisch sind Arbeitgeber verpflichtet, 45 % Steuern einzubehalten, bis sie deine TFN hinterlegt haben, aber manche akzeptieren die Bestätigungs-E-Mail und wenden einen niedrigeren Satz an.

Die zu viel einbehaltene Steuer während der Wartezeit kannst du dir mit deiner [Steuererklärung](/de/tax-return) am Ende des Steuerjahres zurückholen.

## Was tun, sobald deine TFN ankommt

Wenn dein TFN-Brief ankommt:

1. Fülle für jeden Arbeitgeber, bei dem du arbeitest, ein Tax File Number Declaration-Formular aus
2. Gib das Formular zügig an deinen Arbeitgeber zurück
3. Bestätige auf deinem nächsten Lohnzettel, dass der korrekte 15 %-Satz für Working Holiday Maker angewendet wird

Jeder Arbeitgeber braucht sein eigenes Tax File Number Declaration-Formular. Wenn du deine TFN einem Arbeitgeber gibst, wird sie nicht automatisch mit anderen geteilt.

[Kontaktiere unser Team](/de/contact), um deine TFN über unseren registrierten Steueragenten-Service zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 `,
  },

  'how-long-does-it-take-to-get-a-tfn': {
    title: 'Wie lange dauert es, eine TFN in Australien zu bekommen?',
    description: 'Das ATO bearbeitet TFN-Anträge meistens innerhalb von 28 Tagen. Hier ist, was du in jedem Schritt erwarten kannst.',
    body: `
Ein TFN-Antrag in Australien wird vom ATO (australisches Finanzamt) innerhalb von 28 Tagen bearbeitet. In der Praxis bekommen viele Antragsteller ihre Tax File Number schon innerhalb von zwei Wochen, der genaue Zeitpunkt hängt aber von der aktuellen Auslastung des ATO ab. Deine TFN kommt als Brief an deine australische Adresse. Es gibt keine Zustellung per E-Mail oder SMS.

## Wie wird deine TFN zugestellt?

Deine TFN kommt als physischer Brief an die australische Adresse, die du im Antrag angegeben hast. Der Brief enthält deine 9-stellige TFN und grundlegende Informationen zur Nutzung.

Wichtige Punkte zur Zustellung:

- Die TFN wird nie per E-Mail oder SMS verschickt, nur per Post
- Sie wird an die australische Adresse auf deinem Antrag geschickt
- Wenn du umziehst, bevor der Brief ankommt, könnte er an die alte Adresse zugestellt werden
- Das ATO kann die TFN erneut verschicken, wenn der Brief verloren geht, aber nur nach Identitätsprüfung

Wenn du zwischen Hostels wechselst, nutze die Adresse von einem Ort, an dem du mindestens vier Wochen bleibst, damit der Brief Zeit zum Ankommen hat.

## Was kannst du machen, während du auf deine TFN wartest?

Du musst nicht auf deine TFN warten, bevor du anfängst zu arbeiten. Du kannst sofort beginnen und deinem Arbeitgeber sagen, dass dein Antrag läuft.

Solange dein Arbeitgeber deine TFN nicht hat, ist die Standardregel, dass er 45 % Steuern einbehalten muss. Manche Arbeitgeber akzeptieren die ATO-Bestätigungs-E-Mail als Beleg, dass der Antrag läuft, und wenden einen niedrigeren Satz an - das ist aber ihre Entscheidung.

Die zu viel einbehaltene Steuer während der Wartezeit kannst du dir mit deiner [Steuererklärung](/de/tax-return) am Ende des australischen Steuerjahres zurückholen.

## Was, wenn 28 Tage vergangen sind und deine TFN nicht angekommen ist?

Wenn mehr als 28 Tage vergangen sind und dein TFN-Brief nicht angekommen ist, mach diese Schritte:

1. Prüfe nochmal, ob die angegebene Adresse korrekt war (Tippfehler in Postleitzahl, Vorort oder Straßennummer sind die häufigste Ursache für Verzögerungen)
2. Bestätige das Datum, an dem das ATO deinen Antrag bestätigt hat (die 28 Tage zählen ab da, nicht ab dem Tag, an dem du auf "Absenden" geklickt hast)
3. [Kontaktiere unser Team](/de/contact) telefonisch mit deiner Referenznummer aus der Bestätigungs-E-Mail

In den meisten Fällen werden Verzögerungen durch falsche Adressdaten oder verlorene Briefe verursacht. Das ATO kann bestätigen, ob deine TFN ausgestellt wurde, und sie bei Bedarf nochmal verschicken.

## Was tun, sobald deine TFN ankommt

Sobald du deine TFN hast, gib sie sofort deinem Arbeitgeber zusammen mit einem ausgefüllten Tax File Number Declaration-Formular. Das ist das Dokument, das den korrekten 15 %-Steuersatz für Working Holiday Maker auf deinen Lohn auslöst.

Deine TFN brauchst du außerdem, um deine [Steuererklärung](/de/tax-return) einzureichen und auf dein [Super-Konto](/de/superannuation) zuzugreifen, wenn du Australien verlässt.
 `,
  },

  'can-you-start-work-without-a-tfn': {
    title: 'Kannst du in Australien anfangen zu arbeiten ohne TFN?',
    description: 'Ja, aber dein Arbeitgeber muss 45 % Steuern einbehalten, bis du deine TFN bereitstellst. Hier ist, was du dabei wissen musst.',
    body: `
Ja, du kannst legal in Australien anfangen zu arbeiten ohne TFN. Es gibt kein Gesetz, das dich daran hindert, eingestellt zu werden, bevor deine Tax File Number ausgestellt wurde. Allerdings ist dein Arbeitgeber gesetzlich verpflichtet, 45 % Steuern (den höchsten Grenzsteuersatz) einzubehalten, bis du sowohl deine TFN als auch ein ausgefülltes Tax File Number Declaration-Formular bereitstellst.

## Was passiert mit deiner Steuer ohne TFN?

Ohne hinterlegte TFN muss dein Arbeitgeber Steuern zum höchsten Grenzsteuersatz von 45 % einbehalten. Das ist nicht optional. Es ist eine gesetzliche Pflicht, die der Arbeitgeber befolgen muss, um beim ATO konform zu bleiben.

Der 45 %-Satz gilt ab deiner allerersten Schicht und bleibt bestehen, bis du deine TFN bereitstellst. Für einen Working Holiday Maker, der sonst 15 % Steuern zahlen würde, bedeutet das, dass zusätzliche 30 Cent von jedem verdienten Dollar während der Wartezeit einbehalten werden.

## Bekommst du die zu viel gezahlte Steuer zurück?

Ja. Die zu viel einbehaltene Steuer aus der Zeit, bevor deine TFN registriert war, kannst du mit deiner [Steuererklärung](/de/tax-return) am Ende des australischen Steuerjahres zurückholen. Das ATO gleicht ab, was du tatsächlich geschuldet hast, mit dem, was einbehalten wurde, und erstattet die Differenz auf dein australisches Bankkonto.

Der Haken ist das Timing. Du verlierst das Geld nicht dauerhaft, aber du verlierst monatelang den Zugriff darauf - bis zur Steuerzeit. Für Backpacker mit knappem Budget ist diese Verzögerung eine echte Unannehmlichkeit.

## Was ist der praktische Rat?

Um die Zeit der höheren Einbehaltung zu minimieren:

- Beantrage deine TFN so früh wie möglich, idealerweise vor deinem ersten Arbeitstag
- Wenn du schon ohne angefangen hast, beantrage sofort und sag deinem Arbeitgeber, dass der Antrag läuft
- Zeige deinem Arbeitgeber die ATO-Bestätigungs-E-Mail als Beleg
- Gib deinem Arbeitgeber deine TFN und ein Tax File Number Declaration-Formular in dem Moment, in dem deine TFN ankommt

Die Bearbeitung dauert typischerweise bis zu 28 Tage - je früher du beantragst, desto weniger Zeit verlierst du die extra 30 %.

## Was ist mit Schwarzarbeit?

Wenn du bar bezahlt wirst, wird die TFN-Frage anders behandelt, weil keine formelle Lohnabrechnung existiert. Mehr dazu, wie das funktioniert und die Steuerimplikationen, findest du in unserem Artikel zu [Schwarzarbeit in Australien](/de/blog/can-your-employer-pay-you-cash-in-hand).

[Kontaktiere unser Team](/de/contact), um deine TFN über unseren registrierten Steueragenten-Service zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 `,
  },

  'what-happens-without-your-tfn': {
    title: 'Was passiert, wenn dein Arbeitgeber deine TFN nicht hat?',
    description: 'Ohne deine TFN muss dein Arbeitgeber zum höchsten Steuersatz von 45 % einbehalten - statt 15 %. Hier ist, wie du das so schnell wie möglich behebst.',
    body: `
Wenn dein Arbeitgeber deine Tax File Number nicht hinterlegt hat, muss er nach australischem Steuerrecht 45 % Steuern einbehalten. Das ist der höchste Grenzsteuersatz und gilt ab deiner ersten Schicht, bis du deine TFN zusammen mit einem ausgefüllten Tax File Number Declaration-Formular bereitstellst. Dein Arbeitgeber hat keinen Ermessensspielraum. Die Pflicht kommt vom ATO.

## Wie beeinflusst das deinen Nettolohn?

Der Standard-Steuersatz für Working Holiday Maker ist 15 %. Wenn dein Arbeitgeber stattdessen 45 % einbehält, kommt die Differenz kurzfristig direkt aus deiner Tasche.

Beispiel-Auswirkung bei verschiedenen Wochenlöhnen:

- Wochenlohn von 1.000 $: jede Woche 320 $ zusätzlich einbehalten
- Wochenlohn von 1.500 $: jede Woche 480 $ zusätzlich einbehalten
- Wochenlohn von 2.000 $: jede Woche 640 $ zusätzlich einbehalten

Über ein paar Wochen wird diese Lücke beträchtlich. Du verlierst das Geld nicht dauerhaft, aber du siehst es erst wieder, wenn du deine [Steuererklärung](/de/tax-return) einreichst und das ATO die zu viel gezahlte Steuer erstattet.

## Was solltest du jetzt sofort tun?

Die Lösung ist einfach und zeitkritisch:

1. Beantrage deine TFN, falls noch nicht geschehen
2. Sobald du sie bekommst, fülle ein Tax File Number Declaration-Formular aus
3. Gib das Formular sofort deinem Arbeitgeber
4. Der korrekte 15 %-Satz gilt dann für alle zukünftigen Zahlungen

Wenn dein Antrag noch läuft, zeig deinem Arbeitgeber die ATO-Bestätigungs-E-Mail. Manche Arbeitgeber passen den Einbehaltungssatz an, sobald sie sehen, dass der Antrag läuft - obwohl sie gesetzlich dazu nicht verpflichtet sind.

## Bekommst du die zu viel gezahlte Steuer zurück?

Ja. Die zu viel einbehaltene Steuer aus der Zeit, bevor deine TFN hinterlegt war, wird gegen deine Steuerschuld gutgeschrieben, wenn du deine [jährliche Steuererklärung](/de/tax-return) einreichst. Das ATO berechnet die Differenz zwischen dem, was du tatsächlich schuldetest, und dem, was einbehalten wurde, und erstattet den Betrag auf dein australisches Bankkonto.

Die Frist ist der 31. Oktober nach Ende jedes Steuerjahres (1. Juli bis 30. Juni). Wenn du über einen registrierten Steueragenten einreichst, kann die Frist verlängert werden.

## Deine TFN mehreren Arbeitgebern geben

Wenn du während deiner Zeit in Australien für mehr als einen Arbeitgeber arbeitest, braucht jeder deine TFN separat. Wenn du sie einem Arbeitgeber gibst, wird sie nicht automatisch mit anderen geteilt. Reiche ein Tax File Number Declaration-Formular bei jedem Arbeitgeber ein, für den du arbeitest - auch für Casual- und Kurzzeit-Rollen.

[Kontaktiere unser Team](/de/contact), um deine TFN über unseren registrierten Steueragenten-Service zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 `,
  },

  'tfn-vs-abn-difference': {
    title: 'TFN vs. ABN - was ist der Unterschied und welche brauchst du?',
    description: 'TFN und ABN sind zwei verschiedene Nummern für unterschiedliche Steuersituationen. Hier ist, wann du welche brauchst.',
    body: `
Eine Tax File Number (TFN) ist deine persönliche Steueridentifikationsnummer, die du nutzt, wenn du angestellt bist und Lohn verdienst. Eine Australian Business Number (ABN) ist eine Geschäftsidentifikationsnummer, die du nutzt, wenn du als Sole Trader oder unabhängiger Contractor tätig bist und Kunden Rechnungen stellst. Die meisten Working Holiday Maker in normaler Anstellung brauchen nur eine TFN. Eine ABN brauchst du nur, wenn du dein eigenes Geschäft führst oder als unabhängiger Contractor arbeitest. Viele Backpacker haben am Ende beide.

## Wofür wird eine TFN genutzt?

Eine TFN ist deine persönliche Steueridentifikationsnummer. Jeder, der in Australien Einkommen hat, braucht eine - egal ob angestellt oder selbstständig. Das ATO nutzt deine TFN, um dein Einkommen mit dir zu verknüpfen und den korrekten Steuersatz zu bestimmen.

Du brauchst eine TFN, wenn:

- Du als Angestellter auf einer Gehaltsliste arbeitest
- Dein Arbeitgeber PAYG-Steuer von deinem Lohn einbehält
- Dein Arbeitgeber Super-Beiträge für dich zahlt
- Du am Ende des Steuerjahres eine Steuererklärung einreichst

Das deckt die große Mehrheit der Working Holiday Maker in Gastronomie, Einzelhandel, Farmarbeit als Angestellter, Lagern und ähnlichen Rollen ab.

## Wofür wird eine ABN genutzt?

Eine ABN ist eine 11-stellige Nummer für Unternehmen und Sole Trader. Sie wird genutzt, wenn du als unabhängiger Contractor statt als Angestellter arbeitest.

Du brauchst eine [ABN](/de/abn), wenn:

- Du Kunden Rechnungen für deine Dienstleistungen stellst
- Du deine eigenen Arbeitszeiten und -methoden festlegst
- Du eigene Ausrüstung und Werkzeuge nutzt
- Du das finanzielle Risiko für die Arbeit trägst
- Du verantwortlich bist, deine eigene Steuer und Super zurückzulegen

ABNs sind üblich bei Working Holiday Makern in Gig-Economy-Jobs, Freelance-Arbeit, bestimmten Akkordlohn-Farmarbeitsverträgen und jeder Arbeit, bei der das Unternehmen verlangt, dass du Rechnungen stellst, statt dich auf die Gehaltsliste zu setzen.

## Kannst du gleichzeitig eine TFN und eine ABN haben?

Ja. Viele Working Holiday Maker haben beide gleichzeitig. Deine TFN brauchst du immer, weil sie deine persönliche Steueridentifikationsnummer ist. Deine ABN nutzt du nur, wenn du Rechnungen für Contractor-Arbeit stellst. Die beiden Nummern erfüllen unterschiedliche Zwecke, und beide zu haben ist normal, wenn deine Situation sowohl Anstellung als auch Contracting umfasst.

## Wie findest du heraus, welche für dich gilt?

Die Schlüsselfrage ist, ob das Unternehmen, das dich bezahlt, dich als Angestellten oder als Contractor behandelt:

- **Angestellter**: Du stehst auf der Gehaltsliste, PAYG-Steuer wird einbehalten, Super wird zusätzlich zu deinem Lohn gezahlt, und sie geben vor, wie du arbeitest. Du brauchst eine TFN.
- **Contractor**: Du stellst Rechnungen, du legst deine eigene Steuer und Super zurück, und du bestimmst, wie die Arbeit gemacht wird. Du brauchst eine [ABN](/de/abn).

Wenn du unsicher bist, welche Situation auf dich zutrifft, geht unser Artikel zu [dem Unterschied zwischen Angestellten und Contractors in Australien](/de/blog/employee-vs-contractor-australia) detaillierter auf die rechtlichen Tests ein.

[Kontaktiere unser Team](/de/contact), um deine TFN über unseren registrierten Steueragenten-Service zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 `,
  },

  'apply-for-tfn-before-arriving': {
    title: 'Kannst du eine TFN beantragen, bevor du in Australien ankommst?',
    description: 'Ja - du kannst eine TFN aus dem Ausland beantragen, sobald dein Working Holiday Visum genehmigt ist. Hier ist, wie es geht.',
    body: `
Ja, du kannst eine australische Tax File Number (TFN) beantragen, bevor du in Australien ankommst, solange dein Working Holiday Visum schon genehmigt wurde. Das ATO erlaubt ausländischen Reisepass-Inhabern, einen TFN-Antrag online aus dem Ausland einzureichen - vorausgesetzt, sie haben eine gültige australische Postadresse, an die der TFN-Brief geschickt werden kann. Früh zu beantragen bedeutet, dass deine TFN ungefähr zur selben Zeit ankommen kann wie du - so vermeidest du die Zeit mit 45 % Steuereinbehaltung, die gilt, bevor deine TFN bei deinem Arbeitgeber registriert ist.

## Warum lohnt es sich, eine TFN früh zu beantragen?

Deine TFN vor der Ankunft zu beantragen bedeutet, dass sie bearbeitet werden kann, während du noch reist oder deinen Trip vorbereitest. Wenn du deinen ersten Job anfängst, wartet deine TFN eventuell schon - dein Arbeitgeber kann ab Tag eins den korrekten 15 %-Working Holiday Maker-Steuersatz anwenden.

Die Vorteile in Zahlen:

- Antrag dauert online etwa 10 Minuten
- Bearbeitungszeit bis zu 28 Tage
- Beantrage einen Monat vor der Ankunft, dann ist deine TFN eventuell da, wenn du landest
- Vermeidet Wochen mit 45 %-Einbehaltung, die sonst nur zur Steuerzeit zurückgeholt werden

## Was brauchst du, um aus dem Ausland zu beantragen?

Um eine australische TFN von außerhalb Australiens zu beantragen, brauchst du:

- Ein gültiges australisches Working Holiday Visum, das schon genehmigt wurde (nicht nur beantragt)
- Deine Reisepass-Nummer, Visa-Details und Geburtsdatum
- Eine gültige australische Postadresse, an die das ATO deinen TFN-Brief schicken kann
- Eine gültige E-Mail-Adresse für Antragsbestätigungen

Die Adress-Anforderung ist die Hauptkomplikation. Das ATO schickt deine TFN als physischen Brief an eine australische Adresse. Wenn du Unterkunft für deine ersten Wochen in Australien gebucht hast, kannst du diese Adresse nutzen. Eine Hostel-Adresse funktioniert, wenn du dort zuverlässig Post empfangen kannst.

Wenn du noch keine bestätigte australische Adresse hast, kann es einfacher sein zu warten, bis du angekommen bist und einen Platz zum Übernachten hast, bevor du beantragst.

## Was, wenn dein Visum sich ändert oder gekündigt wird?

Falls sich deine Visa-Situation zwischen TFN-Antrag und Ankunft in Australien ändert, [kontaktiere unser Team](/de/contact), um deine Daten zu aktualisieren. Deine TFN selbst ist permanent und läuft nicht ab, auch wenn dein Visum abläuft. Die beim ATO hinterlegten Daten sollten aber deinen aktuellen Visa-Status widerspiegeln.

## Was tun, nachdem du in Australien ankommst

Sobald du in Australien bist und mit der Arbeit angefangen hast:

1. Gib deine TFN jedem Arbeitgeber, für den du arbeitest
2. Fülle für jeden Arbeitgeber ein Tax File Number Declaration-Formular aus
3. Bestätige, dass auf deinem nächsten Lohnzettel der korrekte 15 %-Satz erscheint

Deine TFN brauchst du außerdem, um deine [Steuererklärung](/de/tax-return) am Ende des Steuerjahres einzureichen und auf deine [Super](/de/superannuation) zuzugreifen, wenn du Australien verlässt.
 `,
  },

  'tfn-application-delayed': {
    title: 'Was tun, wenn dein TFN-Antrag sich verzögert',
    description: 'Wenn deine TFN länger als 28 Tage braucht, gibt es konkrete Schritte, die du unternehmen kannst. Hier ist die Anleitung.',
    body: `
Wenn deine TFN nach 28 Tagen nicht angekommen ist, sind die häufigsten Ursachen ein Adressfehler im Antrag oder ein verlorener Brief in der Post. Bevor du das ATO kontaktierst, prüfe die Adresse, die du eingereicht hast, bestätige, dass die 28 Tage tatsächlich vergangen sind (gezählt ab dem Tag, an dem das ATO deinen Antrag erhalten hat, nicht ab dem Tag, an dem du auf "Absenden" geklickt hast), und schau nach dem Brief an älteren Adressen, falls du umgezogen bist.

## Was solltest du zuerst prüfen?

Adressprobleme sind die häufigste Ursache für verzögerte TFN-Zustellung. Fang dort an:

- Hol die Bestätigungs-E-Mail raus, die du beim Antrag bekommen hast
- Vergleich die Adresse damit, wo du gerade bist
- Prüf auf Tippfehler in Straßenname, Postleitzahl, Vorort oder Einheitennummer
- Wenn du seit dem Antrag umgezogen bist, frag jemanden an deiner vorherigen Adresse, ob der Brief dort angekommen ist

Ein einzelner Zeichenfehler (z.B. eine falsche Postleitzahl) reicht, um den Brief in die falsche Gegend zu schicken oder ihn dem ATO als unzustellbar zurückzusenden.

## Sind 28 Tage tatsächlich vergangen?

Die 28-Tage-Bearbeitungszeit beginnt mit dem Datum, an dem das ATO deinen Antrag erhalten hat - nicht mit dem Datum, an dem du ihn eingereicht hast. Online-Anträge werden meistens am selben Tag erhalten, aber es lohnt sich, das in deiner Bestätigungs-E-Mail zu prüfen, bevor du annimmst, dass es ein Problem gibt.

Wenn du vor weniger als 28 Tagen beantragt hast, ist der Antrag noch im normalen Bearbeitungsfenster.

## Wie du eine verzögerte TFN nachfasst

Wenn 28 Tage vergangen sind, deine Adresse korrekt war und kein Brief angekommen ist:

1. [Kontaktiere unser Team](/de/contact) - wir fassen direkt beim ATO für dich nach
2. Halte deine Antrags-Referenznummer bereit (aus der Bestätigungs-E-Mail)
3. Wir verifizieren deine Identität und treiben den Antrag bis zur Lösung
4. Falls deine TFN schon ausgestellt wurde, aber der Brief verloren ging, arrangieren wir die sichere Neuversendung

Selbst beim ATO nachzufassen bedeutet lange Telefonwartezeiten und einen Identitätsprüfungsprozess, der australienspezifische Dokumente erfordert. Unser Team kümmert sich direkt darum und löst Verzögerungen oft innerhalb weniger Werktage.

## Kannst du während der Verzögerung weiterarbeiten?

Ja. Während du wartest, kannst du weiterarbeiten. Sag deinem Arbeitgeber, dass deine TFN unterwegs ist, und zeig ihm die ATO-Bestätigungs-E-Mail. Sobald deine TFN geklärt ist, gib sie deinem Arbeitgeber sofort mit einem ausgefüllten Tax File Number Declaration-Formular. Die zu viel gezahlte Steuer aus der Wartezeit kannst du mit deiner [Steuererklärung](/de/tax-return) zurückholen.
 `,
  },

  'do-you-need-new-tfn-second-visa': {
    title: 'Brauchst du eine neue TFN, wenn du mit einem zweiten Working Holiday Visum zurückkommst?',
    description: 'Nein. Deine TFN ist ein Leben lang gültig. Hier ist, was du wissen musst, wenn du mit einem zweiten Visum zurückkommst.',
    body: `
Nein, du brauchst keine neue Tax File Number, wenn du mit einem zweiten Working Holiday Visum nach Australien zurückkommst. Deine TFN ist permanent. Sie läuft nicht ab, wenn dein Visum abläuft, und sie ändert sich nicht, wenn dein Visum sich ändert. Dieselbe 9-stellige TFN, die du beim ersten Mal bekommen hast, ist die, die du bei jedem weiteren Besuch in Australien nutzt.

## Wo findest du deine TFN, wenn du sie dir nicht merken kannst?

Die TFN, die du bei deinem ersten Besuch bekommen hast, ist an mehreren Stellen aufgezeichnet:

- Der originale Brief, den das ATO dir nach Genehmigung des Antrags geschickt hat
- Lohnzettel oder Income Statements von deinem ersten australischen Arbeitgeber
- Group Certificates oder PAYG Summaries aus früheren Jahren
- Frühere australische [Steuererklärungen](/de/tax-return), die du eingereicht hast
- Korrespondenz vom ATO

Wenn keine dieser Optionen funktioniert, [kontaktiere unser Team](/de/contact) telefonisch und bitte um deine TFN. Du musst deine Identität mit deinen Reisepass-Daten und anderen persönlichen Informationen verifizieren.

## Was musst du tun, wenn du wieder anfängst zu arbeiten?

Auch wenn deine TFN dieselbe ist, braucht jeder neue Arbeitgeber seine eigene Kopie:

- Gib deine TFN jedem neuen Arbeitgeber
- Fülle ein frisches Tax File Number Declaration-Formular für jeden Arbeitgeber aus
- Ein vorheriger Arbeitgeber, der deine TFN hält, überträgt sie nicht automatisch zum nächsten

Jeder Arbeitgeber braucht sein eigenes Declaration-Formular hinterlegt, um den korrekten 15 %-Working Holiday Maker-Steuersatz auf deinen Lohn anzuwenden.

## Was ist mit deiner Super aus deinem ersten Besuch?

Wenn du während deines ersten Besuchs Super-Beiträge hattest und sie über den Departing Australia Superannuation Payment (DASP)-Prozess abgehoben hast, wurde dieses Konto praktisch geschlossen. Neue Super-Beiträge aus deinem zweiten Besuch gehen in einen neuen Fonds.

Wenn du deine Super aus deinem ersten Besuch nicht abgehoben hast, liegen die Beträge eventuell noch im ursprünglichen Fonds oder beim ATO als nicht beantragte Beträge. Siehe unseren Artikel zu [verlorene oder nicht beantragte Super finden](/de/blog/how-to-find-lost-superannuation) für die Suche.

## Wie funktionieren Steuererklärungen bei deinem Rückkehrbesuch?

Deine Steuerpflichten bei deinem zweiten Besuch funktionieren genau gleich wie beim ersten:

- Das Steuerjahr läuft vom 1. Juli bis 30. Juni
- Du musst eine [Steuererklärung](/de/tax-return) für jedes Jahr einreichen, in dem du in Australien Einkommen hattest
- Der 15 %-Working Holiday Maker-Satz gilt für deine Einkünfte, vorausgesetzt deine Arbeitgeber haben deine TFN hinterlegt
- Die Standardfrist ist der 31. Oktober, oder später, wenn du einen registrierten Steueragenten nutzt
 `,
  },

  'how-to-find-lost-tfn': {
    title: 'Wie du deine TFN findest, wenn du sie verloren oder vergessen hast',
    description: 'Du hast deine TFN verloren? Keine Sorge - es gibt mehrere einfache Wege, sie wiederzufinden. Hier sind sie.',
    body: `
Um eine verlorene Tax File Number zu finden, fang mit Dokumenten an, die du eventuell schon hast (der originale ATO-Brief, Lohnzettel, Payment Summaries oder frühere Steuererklärungen). Deine TFN ist permanent und ändert sich nicht - die Nummer, die du ursprünglich bekommen hast, ist immer noch dieselbe. Wenn du sie nicht in deinen Unterlagen findest, kann unser Team sie für dich als registrierter Steueragent abrufen.

## Wie du deine TFN zu Hause findest

Fang mit Dokumenten an, die du schon hast:

- Der originale TFN-Brief, den das ATO dir nach Genehmigung deines Antrags geschickt hat
- Lohnzettel, Payment Summaries oder Income Statements von einem australischen Arbeitgeber
- Frühere [Steuererklärung](/de/tax-return)-Dokumente (deine TFN steht auf jeder Steuererklärung)
- Briefe oder Mitteilungen vom ATO

Wenn du E-Mails gespeichert, Dokumente gescannt oder Papierkram von früherer Arbeit in Australien aufgehoben hast, ist deine TFN fast sicher in einem dieser Unterlagen.

## Wie du eine verlorene TFN wiederherstellst

Wenn du deine TFN in keinen deiner Unterlagen findest, [kontaktiere unser Team](/de/contact). Wir sind registrierte Steueragenten und können deine TFN für dich über unsere direkten Kanäle mit dem ATO abrufen.

Um uns zu helfen, halte bitte bereit:

- Deinen vollständigen rechtlichen Namen (wie im Reisepass)
- Dein Geburtsdatum
- Deine Reisepass-Nummer (und den Reisepass, den du beim ursprünglichen Antrag hattest, falls anders)
- Deine Wohnadressen-Historie in Australien
- Andere persönliche Identifikationsdetails

Eine TFN als Privatperson wiederherzustellen bedeutet lange ATO-Telefonwartezeiten und einen Identitätsprüfungsprozess, der oft australienspezifische Dokumente erfordert, auf die die meisten Backpacker aus dem Ausland keinen Zugriff mehr haben. Über einen registrierten Steueragenten zu gehen ist schneller und zuverlässiger.

## Wie du deine TFN in Zukunft sicher aufbewahrst

Sobald du deine TFN zurück hast, bewahre sie sicher auf, damit das nicht nochmal passiert:

- Speichere sie in einem Passwort-Manager
- Speichere eine gescannte Kopie in verschlüsseltem Cloud-Speicher
- Speichere sie in einer gesperrten Notizen-App auf deinem Handy
- Bewahre eine Papier-Kopie an einem sicheren Ort getrennt von deinem Reisepass auf

Vermeide es, deine TFN dir selbst im Klartext zu mailen oder sie in ungesicherten Dokumenten zu speichern. Deine TFN ist eine sensible persönliche Identifikation, und sie zu schützen ist wichtig - auch nach deiner Abreise aus Australien.
 `,
  },

  // ─── ABN (2 first posts get title/description translation) ────────────────
  'what-is-an-abn': {
    title: 'Was ist eine ABN und brauchst du eine mit Working Holiday Visum?',
    description: 'Eine Australian Business Number ist nur nötig, wenn du als Contractor oder Selbstständiger arbeitest. Hier ist, was du wissen musst.',
    body: `
Eine Australian Business Number (ABN) ist eine 11-stellige Identifikationsnummer für Unternehmen und Sole Trader, die in Australien tätig sind. Als Working Holiday Maker brauchst du eine ABN, wenn du als unabhängiger Contractor arbeitest (du stellst dem Unternehmen Rechnungen für deine Dienstleistungen) statt als Angestellter (auf einer Gehaltsliste). Die meisten Working Holiday Maker in normaler Anstellung brauchen keine ABN. Die ABN-Registrierung ist kostenlos, dauert online etwa 15 Minuten, und die meisten Anträge werden sofort bearbeitet.

## Was ist der Unterschied zwischen Angestelltem und Contractor?

Die Notwendigkeit einer ABN hängt davon ab, ob du Angestellter oder Contractor bist:

- **Angestellter**: Das Unternehmen zahlt dir einen regelmäßigen Lohn, behält PAYG-Steuer von deinem Lohn ein und zahlt Super zusätzlich zu deinem Lohn. Du brauchst eine [TFN](/de/tfn), keine ABN.
- **Contractor**: Das Unternehmen verlangt, dass du Rechnungen stellst, behält keine Steuer ein und zahlt keine Super für dich. Du brauchst eine ABN.

Die Bezeichnung, die dein Arbeitgeber verwendet, spiegelt nicht zwangsläufig die rechtliche Realität wider. Die Substanz der Vereinbarung (wie du bezahlt wirst, wer deine Stunden kontrolliert, wer die Ausrüstung stellt) bestimmt, ob du rechtlich Angestellter oder Contractor bist.

## Warum sind ABNs unter Working Holiday Makern üblich?

Mehrere Arten von Arbeit, die Backpacker häufig machen, sind als Contracting-Vereinbarungen statt als Anstellung strukturiert:

- Akkordlohn-Obstpflücken und Erntearbeit über Personalvermittler
- Gig-Economy-Arbeit über Plattformen wie Uber Eats, DoorDash und Hireup
- Freelance-Kreativ-, Technik- oder Handwerksarbeit
- Manche Gastronomie- und Reinigungs-Rollen, bei denen der Arbeiter unter Vertrag statt angestellt ist
- Reiseleiter-Arbeit, Fotografie, Content Creation

In jedem Fall zahlt das Unternehmen dich gegen eine Rechnung statt eines Lohnzettels, und eine ABN ist erforderlich.

## Was passiert, wenn du ohne ABN arbeitest, obwohl du eine brauchst?

Wenn du einem Unternehmen eine Rechnung ohne gültige ABN stellst, ist das Unternehmen gesetzlich verpflichtet, 47 % von deiner Zahlung einzubehalten, bevor es dir den Rest schickt. Das ist ähnlich zu dem, was einem WHM-Angestellten ohne TFN passiert (45 % werden einbehalten). Der einbehaltene Betrag kann mit deiner [Steuererklärung](/de/tax-return) zurückgeholt werden, aber du siehst ihn erst dann.

## Wie bekommst du eine ABN?

Der einfachste Weg, eine ABN zu bekommen, ist die [Registrierung über unseren Service](/de/abn). Wir kümmern uns um den gesamten Prozess für dich:

1. Schick uns deine Daten (wir sagen dir genau, was wir brauchen)
2. Unser Team bereitet die Registrierung vor und reicht sie für dich ein
3. Die meisten ABNs werden innerhalb von 24 Stunden genehmigt
4. Du bekommst deine ABN per E-Mail, einsatzbereit

Eine ABN zu registrieren bedeutet, deine Geschäftstätigkeit in einer Sprache zu beschreiben, die das Australian Business Register akzeptiert, die richtige Struktur zu wählen und Identitätsprüfung zu handhaben. Wenn dabei etwas schiefläuft, kann dein Antrag in eine manuelle Prüfungs-Warteschlange kommen, die Wochen dauert. Wir machen jede Woche Dutzende Registrierungen und wissen genau, wie man sie beim ersten Mal durchbekommt.

## Was sind deine Steuerpflichten unter einer ABN?

Als Working Holiday Maker mit einer ABN bist du zuständig für:

- Deine eigene Einkommensteuer auf deine ABN-Einkünfte (es wird nichts einbehalten)
- GST-Registrierung, wenn dein Umsatz 75.000 $ pro Jahr übersteigt
- Du bekommst eventuell keine Super-Beiträge von deinen Kunden (du kannst deine eigene zahlen, wenn du willst)

Der Standard-Steuersatz von 15 % für Working Holiday Maker auf die ersten 45.000 $ Einkommen gilt auch für dein ABN-Einkommen, aber du musst es selbst veranlagen und zur Steuerzeit zahlen, statt es vorab einbehalten zu bekommen.

[Kontaktiere unser Team](/de/contact) für Hilfe bei der ABN-Registrierung, GST- und BAS-Verwaltung oder beim Sortieren deiner Steuerposition am Jahresende.
 `,
  },

  'how-to-register-for-an-abn': {
    title: 'Wie du als Backpacker eine ABN in Australien registrierst',
    description: 'Die ABN-Registrierung ist kostenlos und dauert wenige Minuten. Hier ist die komplette Anleitung für Working Holiday Maker.',
    body: `
Um als Working Holiday Maker eine Australian Business Number (ABN) zu registrieren, [registriere über unseren Service](/de/abn) und wir kümmern uns um den gesamten Prozess für dich. Unser Team bereitet den Antrag vor und reicht ihn für dich ein, und die meisten ABNs werden innerhalb von 24 Stunden genehmigt. Du bekommst deine ABN per E-Mail, einsatzbereit. Du brauchst eine [Tax File Number (TFN)](/de/tfn), bevor wir deine ABN registrieren können.

## Was brauchst du, bevor wir deine ABN registrieren?

Um eine ABN für dich zu registrieren, brauchen wir:

- Deine Tax File Number (wir können [deine TFN](/de/tfn) zuerst registrieren, falls du keine hast)
- Deinen vollständigen rechtlichen Namen, wie auf deinem Reisepass
- Deine Kontaktdaten, einschließlich einer australischen Telefonnummer und E-Mail
- Eine australische Adresse
- Eine Beschreibung der Arbeit, die du machen wirst (zum Beispiel "Obstpflücken", "Rideshare-Fahren", "Freelance Grafikdesign")
- Das Datum, an dem du die Arbeit angefangen hast oder anfangen wirst

Wenn du noch keine TFN hast, registrieren wir beide zusammen, damit du nicht zwischen den Schritten wartest.

## Wie funktioniert der ABN-Registrierungsprozess?

Der Prozess über unseren Service ist einfach:

1. [Kontaktiere uns](/de/abn) und schick uns deine Daten
2. Wir bereiten die Registrierung mit der korrekten Geschäftstätigkeitsbeschreibung und Struktur vor
3. Wir reichen den Antrag für dich ein
4. Die meisten Anträge werden innerhalb von 24 Stunden genehmigt
5. Du bekommst deine ABN per E-Mail, bereit zum Angeben auf Rechnungen

Die Selbstregistrierung einer ABN bedeutet, deine Geschäftstätigkeit in einer Sprache zu beschreiben, die das Australian Business Register akzeptiert. Das falsch zu machen ist einer der häufigsten Gründe, warum Anträge in eine manuelle Prüfungs-Warteschlange kommen, die Wochen dauern kann. Wir machen jede Woche Dutzende Registrierungen und wissen genau, wie man sie beim ersten Mal durchbekommt.

## Wie nutzt du deine ABN korrekt auf Rechnungen?

Sobald du deine ABN hast, gib sie auf jeder Rechnung an, die du ausstellst. Eine Rechnung ohne gültige ABN erlaubt dem zahlenden Unternehmen, legal 47 % der Zahlung einzubehalten.

Jede Rechnung, die du verschickst, sollte enthalten:

- Deinen Namen (und Geschäftsnamen, falls du unter einem firmierst)
- Deine ABN
- Das Ausstellungsdatum
- Eine Beschreibung der erbrachten Dienstleistungen
- Den zu zahlenden Betrag
- Deine Kontaktdaten

Bewahre Aufzeichnungen über jede ausgestellte Rechnung und jede unter deiner ABN erhaltene Zahlung auf. Wir geben alles in deiner [Steuererklärung](/de/tax-return) am Ende des Steuerjahres an.

## Wann und wie du deine ABN kündigst

Wenn du deine Geschäftstätigkeit in Australien beendest, solltest du deine ABN kündigen. Wir kümmern uns um die Kündigung als Teil der Abwicklung deiner australischen Steuerposition vor deiner Abreise. Siehe unseren Artikel zu [Kündigung deiner ABN beim Verlassen Australiens](/de/blog/how-to-cancel-your-abn) für die Überlegungen vor deiner Abreise.

[Kontaktiere unser Team](/de/contact) für Hilfe bei der ABN-Registrierung, GST- und BAS-Verwaltung oder beim Sortieren deiner Steuerposition am Jahresende.
 `,
  },

  // ─── Tax Return - Strategic posts (full body translations) ────────────────
  'backpacker-tax-rate-australia': {
    title: 'Was ist der Backpacker-Steuersatz in Australien und wie funktioniert er?',
    description: 'Working Holiday Maker zahlen einen festen Steuersatz von 15 % auf ihr australisches Einkommen. Hier ist, wie das genau funktioniert und was es für deinen Nettolohn bedeutet.',
    body: `
Der Backpacker-Steuersatz in Australien beträgt pauschal 15 % auf die ersten 45.000 $ Einkommen pro Steuerjahr. Dieser Satz gilt für alle Working Holiday Maker mit einem Working Holiday Visum (Subclass 417) oder Work and Holiday Visum (Subclass 462). Er wird manchmal "Working Holiday Maker-Steuersatz" genannt und ersetzt die normalen Resident-Steuersätze, die sonst gelten würden. Du musst deine [TFN](/de/tfn) bei jedem Arbeitgeber registrieren, um den 15 %-Satz zu bekommen - sonst wird standardmäßig mit 45 % einbehalten.

## Wie funktioniert der 15 %-Satz in der Praxis?

Der 15 %-Satz ist ein Pauschalsatz. Jeder Dollar der ersten 45.000 $, die du verdienst, wird mit demselben Satz besteuert:

- Wochenlohn von 1.000 $ → 150 $ einbehalten → 850 $ auf deinem Konto
- Wochenlohn von 1.500 $ → 225 $ einbehalten → 1.275 $ auf deinem Konto
- Wochenlohn von 2.000 $ → 300 $ einbehalten → 1.700 $ auf deinem Konto

Du bekommst nicht den Freibetrag, den australische Residenten bekommen. Australische Residenten zahlen keine Steuern auf die ersten 18.200 $, aber Working Holiday Maker zahlen 15 % vom allerersten Dollar.

## Was passiert, wenn du mehr als 45.000 $ verdienst?

Einkommen über 45.000 $ wird mit höheren Sätzen besteuert:

- 45.001 bis 135.000 $: 30 %
- 135.001 bis 190.000 $: 37 %
- Über 190.000 $: 45 %

Nur sehr wenige Working Holiday Maker erreichen diese Einkommensgrenzen während eines einzigen Aufenthalts, aber es ist gut zu wissen, falls du einen längeren Aufenthalt mit gut bezahlter Arbeit im Bergbau, Bauwesen oder Facharbeiterbereich planst.

## Wie qualifizierst du dich für den 15 %-Satz?

Damit der 15 %-Satz auf deinen Lohn angewendet wird, musst du:

1. Eine [TFN](/de/tfn) bei deinem Arbeitgeber registriert haben
2. Ein Tax File Number Declaration-Formular ausfüllen, in dem du angibst, dass du Working Holiday Maker bist
3. Bei einem Arbeitgeber arbeiten, der beim ATO als Working Holiday Maker-Arbeitgeber registriert ist

Registrierte Arbeitgeber sind verpflichtet, den korrekten Satz anzuwenden. Wenn dein Arbeitgeber nicht registriert ist, wird standardmäßig mit 30 % einbehalten - sogar wenn du deine TFN hinterlegt hast. Wenn du dir nicht sicher bist, ob dein Arbeitgeber registriert ist, [kontaktiere unser Team](/de/contact) und wir prüfen das für dich.

## Was kann durch deine Steuererklärung zurückkommen?

Ein normaler Working Holiday Maker mit dem korrekten 15 %-Satz bekommt meistens keine große Rückzahlung, weil das ganze Jahr über der richtige Betrag einbehalten wurde. Rückzahlungen kommen typischerweise aus:

- Arbeiten ohne TFN für einen Teil des Jahres (45 % statt 15 % einbehalten)
- Zeiträume, in denen der falsche Satz angewendet wurde (z.B. 30 % bei nicht registriertem Arbeitgeber)
- Absetzbare Kosten für arbeitsbezogene Ausgaben, Werkzeuge, Uniformen und Fahrten
- Fehler im Tax File Number Declaration-Formular (z.B. fälschlich Freibetrag angekreuzt)

Die meisten Working Holiday Maker, die wir betreuen, bekommen eine Rückzahlung zwischen 1.000 und 3.000 $, wenn wir ihre [Steuererklärung](/de/tax-return) richtig einreichen. Der genaue Betrag hängt komplett von den Umständen des Jahres ab.
 `,
  },

  // ─── Super - Strategic posts ──────────────────────────────────────────────
  'how-to-apply-for-super-back': {
    title: 'Wie du deine Super zurückbekommst, nachdem du Australien verlassen hast',
    description: 'Schritt-für-Schritt-Anleitung zum DASP-Antrag, vom Finden deiner Super-Fonds bis zur Auszahlung auf deinem Konto.',
    body: `
Um deine Super zurückzubekommen, nachdem du Australien verlassen hast, arbeitest du mit unserem Team zusammen, das den kompletten Departing Australia Superannuation Payment (DASP)-Prozess von Anfang bis Ende übernimmt. Wir finden alle deine Super-Konten, bereiten die Anträge vor und reichen sie für dich ein und arrangieren die Auszahlung auf dein gewünschtes Bankkonto irgendwo auf der Welt. Die DASP-Quellensteuer für Working Holiday Maker beträgt 65 % der steuerpflichtigen Komponente, aber nach Steuern ist der Nettobetrag immer noch beträchtlich.

## Schritt 1: Finde alle deine Super-Konten

Der erste Schritt ist, jedes Super-Konto zu identifizieren, in das deine Beiträge eingezahlt wurden. Die meisten Working Holiday Maker haben ihre Super auf mehrere Fonds verteilt, weil jeder Arbeitgeber einen anderen Standard-Fonds verwendet haben könnte.

Wir finden deine Super-Konten, indem wir:

- Die Fonds prüfen, die du Arbeitgebern angegeben hast
- TFN-verknüpfte Konten im ATO-System abgleichen
- Beträge identifizieren, die als nicht beantragte Super ans ATO überwiesen wurden

Sobald wir ein komplettes Bild haben, kannst du entweder jeden Fonds separat per DASP beantragen oder sie zuerst in einem einzigen Fonds zusammenführen. Die Zusammenführung vereinfacht den Prozess (ein Antrag statt vieler), dauert aber im Vorfeld ein paar Wochen länger.

## Schritt 2: Sammle deine Unterlagen

Um deinen DASP-Antrag vorzubereiten, brauchen wir:

- Deine Tax File Number (TFN)
- Reisepass-Details (der Reisepass, den du hattest, als du in Australien gearbeitet hast)
- Visum-Genehmigungs- und Ablaufdaten
- Super-Fonds-Name und Mitgliedsnummer für jeden Fonds
- Bankverbindung (australisch oder ausländisch, deine Wahl)

Das Bankkonto muss **nicht** australisch sein. Internationale Überweisungen sind Standard für DASP-Auszahlungen, und wir können in die meisten Länder auszahlen.

## Schritt 3: Wir reichen den DASP-Antrag ein

Sobald wir deine Daten haben, kümmern wir uns um die Einreichung:

- Separate Anträge für jeden Fonds (falls du mehrere hast)
- Identitäts- und Visa-Verifizierung über unser Steueragenten-Portal
- Den gesamten Schriftverkehr mit dem Fonds und dem ATO übernehmen wir
- Du bekommst eine Referenznummer zur Verfolgung

Du musst dich nicht mit ATO-Online-Diensten herumschlagen oder die Super-Fonds selbst kontaktieren.

## Schritt 4: Erhalte deine Auszahlung

Nach der Einreichung:

- Der Fonds verifiziert deine Daten (meistens innerhalb von 28 Tagen)
- 65 % DASP-Quellensteuer wird von der steuerpflichtigen Komponente abgezogen
- Der Nettobetrag wird auf dein gewünschtes Bankkonto überwiesen
- Wir benachrichtigen dich, wenn die Auszahlung freigegeben ist

Internationale Überweisungen können je nach Zielland und Bank ein paar Werktage länger dauern.

## Was, wenn deine Super nicht auffindbar ist?

Manchmal ist Super "verloren" - sie kann unter einem alten Namen oder einer alten Adresse stehen, oder sie wurde ans ATO als nicht beantragte Super überwiesen.

Wir können:

- Die ATO-Online-Dienste nach übertragenen, nicht beantragten Super-Beträgen durchsuchen
- Arbeitgeber identifizieren, die möglicherweise keine Super gezahlt haben, und die ausstehenden Beträge einfordern

Siehe unseren Artikel zum [Finden verlorener Super](/de/blog/how-to-find-lost-superannuation) für mehr Details. Wir machen diese Suche als Teil jedes DASP-Antrags, damit keine Super zurückbleibt.

[Kontaktiere unser Team](/de/contact), um deinen DASP-Antrag zu bearbeiten, jeden Super-Fonds mit deinen Beiträgen zu finden und deine Auszahlung im Ausland zu erhalten.
 `,
  },

  // ─── Medicare - Critical for Germans (no RHCA) ─────────────────────────────
  'what-is-medicare-working-holiday-makers': {
    title: 'Was ist Medicare und sind Working Holiday Maker abgedeckt?',
    description: 'Medicare ist Australiens öffentliches Krankenversicherungssystem. Die meisten Working Holiday Maker sind nicht abgedeckt, aber es gibt Ausnahmen.',
    body: `
Medicare ist Australiens universelles öffentliches Krankenversicherungssystem, das Staatsbürgern und ständigen Einwohnern kostenlose oder vergünstigte medizinische Versorgung bietet. Working Holiday Maker (Subclass 417 und 462) sind in der Regel **nicht** für Medicare berechtigt - es sei denn, ihr Heimatland hat ein Sozialversicherungsabkommen (RHCA) mit Australien. **Wichtig: Deutschland hat KEIN RHCA mit Australien.** Ohne Medicare-Abdeckung zahlst du die vollen Kosten für Arztbesuche und Behandlungen. Du hast aber Anspruch auf eine Medicare Levy-Befreiung bei deiner Steuererklärung, was dir 2 % deines zu versteuernden Einkommens spart. Unser Team beantragt diese Befreiung beim Einreichen deiner Steuererklärung.

## Sind Working Holiday Maker durch Medicare abgedeckt?

In der Regel nicht:

- Inhaber eines Working Holiday Visums 417 und 462 sind nicht für Medicare berechtigt
- Die Ausnahme sind Bürger von Ländern mit einem Sozialversicherungsabkommen (RHCA)
- Ohne Abdeckung wirst du als Privatpatient behandelt
- Du zahlst die vollen Kosten für Hausarztbesuche, Facharzttermine, Rezepte und Krankenhausbehandlung

Die 11 Länder mit einem RHCA für Working Holiday Maker findest du in unserem Artikel zu [Ländern mit Medicare-Abkommen mit Australien](/de/blog/countries-with-medicare-agreement-australia). **Deutschland ist nicht dabei.**

## Was kostet dich fehlende Medicare-Abdeckung in der Praxis?

Gesundheitskosten ohne Medicare:

- Hausarztbesuch: 80 bis 120 $ pro Besuch
- Facharzttermin: 200 bis 500+ $ pro Besuch
- Rezepte: voller Verkaufspreis (oft 20 bis 80+ $)
- Notaufnahme: kostenlos in öffentlichen Krankenhäusern (aber Nachbehandlung kann kostenpflichtig sein)
- Aufnahme in öffentliches Krankenhaus: variabel, kann teuer sein
- Krankenwagen: oft Hunderte Dollar (hängt vom Bundesstaat ab)

Bei diesen Kosten ist eine umfassende Reise- und Krankenversicherung unerlässlich. Die meisten Working Holiday Visum-Anträge verlangen eine Krankenversicherung als Visumsbedingung.

## Was ist die Medicare Levy-Befreiung?

Die Medicare Levy ist eine 2 %-Steuer auf das zu versteuernde Einkommen australischer Residenten zur Finanzierung von Medicare. Working Holiday Maker, die nicht für Medicare berechtigt sind, können eine Befreiung beantragen:

- Du sparst 2 % deines zu versteuernden Einkommens
- Bei 30.000 $ Einkommen ist die Befreiung 600 $ wert
- Muss korrekt in deiner [Steuererklärung](/de/tax-return) beantragt werden
- Nicht automatisch, muss beim Einreichen aktiv angewendet werden

Unser Team beantragt diese Befreiung automatisch, wenn wir deine Steuererklärung vorbereiten. Wenn du schon eine Steuererklärung ohne Befreiung eingereicht hast, können wir sie ändern und die gezahlte Levy zurückholen.

## Wie kommst du als Working Holiday Maker an Gesundheitsversorgung?

Optionen für Gesundheitsabdeckung:

- **Private Reise-/Krankenversicherung**: meistens die beste Option für Working Holiday Maker; Pflicht für Visa-Bedingungen
- **Öffentliche Notaufnahme**: kostenlos für lebensbedrohliche Notfälle, aber Nachbehandlung kostet
- **Hausarzt-/Facharzttermine ohne Versicherung**: volle Kosten zahlen

Unser Team kann die Medicare Levy-Befreiung beantragen, egal ob du eine private Versicherung abgeschlossen hast oder nicht. Die Befreiung basiert auf deiner Medicare-Berechtigung, nicht darauf, ob du privat versichert bist.

Mehr zu RHCA-Ländern und deren Abdeckung in unserem Artikel zu [Medicare-Abkommen mit Australien](/de/blog/countries-with-medicare-agreement-australia).

[Kontaktiere unser Team](/de/contact) für Hilfe bei allen Fragen zu Steuern, Super oder Arbeitsrecht während deiner Zeit in Australien.
 `,
  },

  'medicare-levy-working-holiday-makers': {
    title: 'Was ist die Medicare Levy und zahlen Working Holiday Maker sie?',
    description: 'Die Medicare Levy ist eine 2 %-Steuer, die Australiens Gesundheitssystem finanziert. Die meisten Working Holiday Maker sind befreit. Hier ist, wie du die Befreiung beantragst.',
    body: `
Die Medicare Levy ist eine 2 %-Steuer auf das zu versteuernde Einkommen australischer Residenten zur Finanzierung des Medicare-Systems. Die meisten Working Holiday Maker sind nicht für Medicare berechtigt und haben daher Anspruch auf eine vollständige Befreiung von der Medicare Levy in ihrer Steuererklärung. Die Befreiung ist nicht automatisch und muss bei der Einreichung korrekt angewendet werden. Unser Team beantragt die Medicare Levy-Befreiung automatisch, wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten - das spart dir 2 % deines zu versteuernden Einkommens.

## Was ist die Medicare Levy?

Die Medicare Levy ist eine 2 %-Steuer auf das zu versteuernde Einkommen:

- Wird auf das zu versteuernde Einkommen australischer Residenten angewendet
- Wird zusammen mit der Einkommensteuer eingezogen
- Erscheint als separate Zeile auf deinem Steuerbescheid
- Hilft, das Medicare-Gesundheitssystem zu finanzieren

Für australische Residenten ist die Levy automatisch. Für Working Holiday Maker hängt es davon ab, ob du für Medicare berechtigt bist.

## Zahlen Working Holiday Maker die Medicare Levy?

Die meisten Working Holiday Maker sind befreit:

- Wenn du nicht für Medicare berechtigt bist, kannst du eine **vollständige Befreiung** beantragen (keine Levy gezahlt)
- Wenn du teilweise berechtigt bist (RHCA-Anmeldung für einen Teil des Jahres), kannst du eine **teilweise Befreiung** beantragen
- Wenn du voll berechtigt bist (selten bei Working Holiday Makern), zahlst du die volle 2 %

Die meisten Working Holiday Maker fallen in die erste Kategorie und zahlen gar keine Medicare Levy. **Deutsche Working Holiday Maker fallen immer in diese Kategorie**, weil Deutschland kein RHCA mit Australien hat.

## Wie viel spart dir die Befreiung?

Die 2 %-Befreiung ist bei typischen Working Holiday Maker-Einkommen bedeutsam:

- Jahresverdienst 15.000 $ → 300 $ gespart
- Jahresverdienst 25.000 $ → 500 $ gespart
- Jahresverdienst 35.000 $ → 700 $ gespart
- Jahresverdienst 45.000 $ → 900 $ gespart

Das ist Geld, das in deine Rückzahlung fließt statt in die Staatskasse. Wenn du eine frühere Steuererklärung ohne Befreiung eingereicht hast, kann unser Team sie ändern und die gezahlte Levy zurückholen.

## Wie wird die Medicare Levy-Befreiung beantragt?

Die Befreiung erfordert:

1. Ein Medicare Levy-Befreiungszertifikat (in den meisten Fällen)
2. Korrektes Ausfüllen des Medicare Levy-Abschnitts deiner Steuererklärung
3. Nachweise für deine fehlende Medicare-Berechtigung (Reisepass, Visum)

Unser Team kümmert sich um all das, wenn wir deine Steuererklärung vorbereiten. Wir besorgen das Medicare Levy-Befreiungszertifikat für dich, wo nötig.

## Was, wenn dein Land ein RHCA mit Australien hat?

Die Situation ist nuancierter für Bürger der 11 RHCA-Länder (Großbritannien, Irland, Neuseeland, Schweden, Niederlande, Finnland, Norwegen, Belgien, Slowenien, Malta, Italien):

- Wenn du dich bei Medicare angemeldet hast, zahlst du die Levy (du bist abgedeckt)
- Wenn du dich nicht angemeldet hast, kannst du trotzdem Befreiung beantragen
- Wenn du dich für einen Teil des Jahres angemeldet hast, kannst du teilweise Befreiung bekommen
- Die Regeln hängen von deiner spezifischen Situation ab

**Hinweis für Deutsche:** Da Deutschland nicht in der RHCA-Liste ist, hast du automatisch Anspruch auf die volle Befreiung.

## Was, wenn du schon eingereicht hast ohne die Befreiung zu beantragen?

Wenn du eine frühere Steuererklärung eingereicht und die Medicare Levy gezahlt hast, obwohl du befreit sein solltest:

1. Der Betrag kann normalerweise durch eine Änderung zurückgeholt werden
2. Änderungen können typischerweise bis zu zwei Jahre nach der ursprünglichen Einreichung gemacht werden
3. Unser Team kümmert sich um Änderungen für Working Holiday Maker

[Schick uns deine früheren Steuererklärungen](/de/contact) und wir prüfen, ob dir eine Rückzahlung der gezahlten Medicare Levy zusteht.
 `,
  },

  // ─── Work Rights - Minimum wage ────────────────────────────────────────────
  'minimum-wage-australia-2025-26': {
    title: 'Wie hoch ist der Mindestlohn in Australien für 2025-26?',
    description: 'Australien hat einen der höchsten Mindestlöhne der Welt. Hier ist der aktuelle Satz und was das für Working Holiday Maker bedeutet.',
    body: `
Der nationale Mindestlohn in Australien beträgt ab 1. Juli 2025 24,95 $ pro Stunde für festangestellte Arbeitnehmer und 31,19 $ pro Stunde für Casual-Arbeitnehmer (das umfasst den 25 %-Casual Loading). Das gilt für alle Arbeitnehmer, auch für Working Holiday Maker. Allerdings sind die meisten Branchen von modernen Awards oder Tarifverträgen abgedeckt, die höhere Mindestsätze als den nationalen Mindestlohn festlegen - der tatsächliche Satz für deine Stelle ist also meistens höher als 24,95 $.

## Wie wird der australische Mindestlohn festgelegt?

Die Fair Work Commission überprüft den nationalen Mindestlohn jährlich:

- Die Überprüfung findet Mitte des Jahres statt (Juni/Juli)
- Jede Erhöhung tritt ab der ersten vollen Lohnperiode am oder nach dem 1. Juli in Kraft
- Der Satz wird als Stundenlohn bekanntgegeben
- Der 25 %-Casual Loading kommt zusätzlich für Casual-Arbeitnehmer dazu

Der Mindestlohn wird jährlich überprüft, um mit den Lebenshaltungskosten und wirtschaftlichen Bedingungen Schritt zu halten.

## Wie hoch ist der Mindestlohn nach Anstellungsart?

Für das Steuerjahr 2025-26:

- Festangestellte Vollzeit und Teilzeit: 24,95 $ pro Stunde
- Casual-Arbeitnehmer: 31,19 $ pro Stunde (25 %-Loading inklusive)
- Wochenmindestlohn (38 Stunden): 948,10 $ brutto
- Jahresmindestlohn (Vollzeit): 49.300 $

Wenn du weniger als diese Sätze verdienst, wirst du unterbezahlt.

## Warum bekommen die meisten Arbeitnehmer einen höheren Satz als das Minimum?

Die meisten Jobs in Australien sind von einem modernen Award oder Tarifvertrag abgedeckt, der branchenspezifische Mindestsätze festlegt, die höher sind als der nationale Mindestlohn:

- **Hospitality Industry (General) Award**: deckt Cafés, Restaurants, Hotels ab
- **General Retail Industry Award**: deckt Geschäfte und Einzelhandel ab
- **Horticulture Award**: deckt Obstpflücken, Ernten, landwirtschaftliche Arbeit ab
- **Building and Construction General On-site Award**: deckt Bau ab
- **Cleaning Services Award**: deckt Reinigungskräfte ab
- **Aged Care Award**: deckt Pflegekräfte ab

Jeder Award hat mehrere Einstufungsstufen mit unterschiedlichen Sätzen basierend auf Erfahrung und Verantwortung. Frage deinen Arbeitgeber, welcher Award für deine Rolle gilt und in welche Einstufung du eingeordnet wurdest.

## Was ist mit Penalty Rates (Zuschlägen)?

In vielen Branchen wird Arbeit außerhalb der regulären Stunden mit Penalty Rates vergütet:

- Samstagssätze (oft 125-150 % vom Grundlohn)
- Sonntagssätze (oft 150-200 % vom Grundlohn)
- Feiertagssätze (oft 225-250 % vom Grundlohn)
- Überstundensätze nach einer bestimmten Stundenzahl

Siehe unseren Artikel zu [Penalty Rates in Australien](/de/blog/penalty-rates-australia) für die komplette Aufschlüsselung.

## Was solltest du tun, wenn du unter dem Mindestlohn bezahlt wirst?

Wenn du unterbezahlt wirst:

1. Identifiziere, welcher Award für deine Rolle gilt (frage deinen Arbeitgeber oder schau in deinen Vertrag)
2. Finde den korrekten Satz für deine Einstufung und dein Arbeitsmuster
3. Vergleiche mit deinen Lohnzetteln
4. Berechne die Unterbezahlung über den Zeitraum, in dem sie aufgetreten ist
5. [Kontaktiere unser Team](/de/contact) und wir helfen dir, das Problem anzusprechen und das, was dir zusteht, zurückzubekommen

Working Holiday Maker haben dieselben Rechte wie jeder andere Arbeitnehmer in Australien. Es gibt keine visum-basierte Hürde, um unterbezahlte Löhne zurückzubekommen.
 `,
  },

  // ─── Tax Return - More strategic posts ─────────────────────────────────────
  'how-does-australian-tax-year-work': {
    title: 'Wie funktioniert das australische Steuerjahr für Working Holiday Maker?',
    description: 'Das australische Finanzjahr läuft vom 1. Juli bis 30. Juni. Hier ist, was das für deine Steuererklärung bedeutet und wann du sie einreichen musst.',
    body: `
Das australische Finanzjahr läuft vom 1. Juli bis 30. Juni, nicht nach dem Kalenderjahr. Als Working Holiday Maker musst du für jedes Finanzjahr, in dem du in Australien Einkommen hattest, eine Steuererklärung einreichen. Die Einreichungsfrist ist der 31. Oktober nach Ende des Finanzjahres. Wenn du über einen registrierten Steueragenten wie unser Team einreichst, wird die Frist automatisch verlängert.

## Was bedeutet das Finanzjahr für dich?

Das gesamte Einkommen zwischen dem 1. Juli und 30. Juni wird als ein Finanzjahr abgerechnet:

- In Oktober 2024 nach Australien gekommen und bis April 2025 gearbeitet? Dein gesamtes Einkommen fällt in das Finanzjahr 2024-25 (1. Juli 2024 bis 30. Juni 2025).
- Im März 2024 angefangen zu arbeiten? Dein Einkommen von März bis Juni 2024 fällt in das Finanzjahr 2023-24. Einkommen ab Juli 2024 fällt ins nächste Jahr.

Am Jahresende berechnet das [ATO (australisches Finanzamt)](https://www.workingholidaytax.com.au/de/tax-return) deine tatsächliche Steuerschuld und vergleicht sie mit dem, was dein Arbeitgeber einbehalten hat:

- Mehr einbehalten als geschuldet = Rückzahlung auf dein Konto
- Weniger einbehalten als geschuldet = du zahlst die Differenz

## Wann ist die Frist für die Steuererklärung?

Die Standardfrist ist der 31. Oktober nach Ende des Finanzjahres:

- Finanzjahr 2024-25 (endet 30. Juni 2025) → Frist 31. Oktober 2025
- Finanzjahr 2025-26 (endet 30. Juni 2026) → Frist 31. Oktober 2026

Wenn wir deine Steuererklärung als dein registrierter Steueragent einreichen, qualifizierst du dich für eine verlängerte Frist - oft bis Mai des Folgejahres. Das gibt dir Luft, falls du Oktober verpasst hast oder deine Unterlagen noch nicht komplett sind.

## Was, wenn du Australien vor dem 30. Juni verlassen hast?

Du kannst auch nach deiner Abreise aus Australien eine Steuererklärung einreichen. Der Prozess funktioniert genau gleich:

- Die Steuererklärung kann elektronisch von überall auf der Welt eingereicht werden
- Unser Team kümmert sich um den gesamten Prozess aus der Ferne für dich
- Die Rückzahlung wird auf dein australisches Bankkonto überwiesen
- Halte dein australisches Bankkonto offen, bis die Rückzahlung gutgeschrieben ist

## Was brauchst du, um deine Steuererklärung einzureichen?

Um deine Steuererklärung einzureichen, braucht unser Team:

- Deine Tax File Number (TFN)
- Einkommensdaten von jedem Arbeitgeber, bei dem du gearbeitet hast
- Bankverbindung für die Rückzahlung (australisches Bankkonto)
- Alle arbeitsbezogenen Kosten, die du als absetzbar geltend machen möchtest
- Deine Reisepass-Daten zur Identifikation

Wir können auf deine Income Statements direkt über unser Steueragenten-Portal zugreifen, sodass du keine Lohnzettel von jedem Arbeitgeber selbst sammeln musst. Siehe unseren Artikel zur [Einreichung einer Steuererklärung aus dem Ausland](/de/blog/how-to-lodge-tax-return-from-overseas) für mehr Details, was wir brauchen.

[Kontaktiere unser Team](/de/contact), um deine australische Steuererklärung über unseren registrierten Steueragenten-Service einzureichen und sicherzustellen, dass jede Rückzahlung, die dir zusteht, beantragt wird.
 `,
  },

  'tax-deductions-working-holiday-makers': {
    title: 'Welche Steuerabzüge können Working Holiday Maker in Australien geltend machen?',
    description: 'Working Holiday Maker können arbeitsbezogene Absetzungen genau wie jeder andere Arbeitnehmer machen. Hier ist, was qualifiziert und was nicht.',
    body: `
Working Holiday Maker in Australien können arbeitsbezogene Steuerabzüge in ihrer Steuererklärung geltend machen, genau wie australische Residenten. Häufige Absetzungen sind Uniformen und Schutzkleidung, Werkzeuge und Ausrüstung, Fahrten zwischen Arbeitsorten, arbeitsbezogene Handy-Nutzung und Gebühren für registrierte Steueragenten. Um eine Absetzung zu beantragen, muss die Ausgabe direkt mit der Erzielung deines Einkommens zusammenhängen, und du musst einen Nachweis haben (Beleg, Kontoauszug oder Tagebuchnotiz). Unser Team identifiziert berechtigte Absetzungen, wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten.

## Welche arbeitsbezogene Kleidung kannst du absetzen?

Spezielle Arbeitskleidung ist absetzbar:

- Uniformen mit Logo oder spezifischem Design, die vom Arbeitgeber vorgeschrieben sind
- Schutzkleidung (Stahlkappen-Stiefel, Hi-Vis-Westen, Sonnencreme für Outdoor-Arbeit)
- Sicherheitsausrüstung (Handschuhe, Helme, Schutzbrillen)
- Reinigungskosten für die obigen Gegenstände

Was **nicht** absetzbar ist:

- Generische Kleidung, auch wenn du sie nur zur Arbeit trägst (schwarze Hosen, weiße Hemden für die Gastronomie)
- Konventionelle Geschäftskleidung
- Schlichte Kleidung, die zufällig als Uniform vorgeschrieben ist

## Welche Werkzeuge und Ausrüstung kannst du absetzen?

Werkzeuge, die du für deine Arbeit kaufst, sind absetzbar:

- Messerrollen, Kochuniformen und Küchenwerkzeuge für die Gastronomie
- Arbeitsstiefel und Sicherheitsausrüstung für Bau- oder Farmarbeit
- Werkzeuge für Handwerker (Mechaniker, Bauarbeiter, Elektriker)
- Kamera- und Beleuchtungsausrüstung für Content Creator oder Fotografen

Gegenstände unter 300 $ pro Stück können im Kaufjahr komplett abgesetzt werden. Größere Anschaffungen müssen über die Zeit abgeschrieben werden. Wir finden die optimale Behandlung, wenn wir deine Steuererklärung vorbereiten.

## Welche Reisekosten kannst du absetzen?

Reiseregeln für Backpacker:

- **Absetzbar**: Fahrten zwischen verschiedenen Arbeitsorten am selben Tag
- **Absetzbar**: Fahrten zu Arbeitsmeetings oder Schulungen weg von deinem regulären Arbeitsplatz
- **Nicht absetzbar**: Fahrten zwischen Zuhause und deinem regulären Arbeitsplatz (das ist Privatfahrt)

Wenn du schwere oder sperrige Ausrüstung zur Arbeit transportierst, die nicht am Arbeitsplatz gelassen werden kann, kann es Ausnahmen geben. [Schick uns die Details](/de/contact) und wir prüfen das.

## Kannst du Handy und Internet absetzen?

Du kannst den arbeitsbezogenen Anteil absetzen für:

- Handyrechnungen
- Hausinternet
- Geräte, die du für die Arbeit nutzt (Laptops, Tablets)

Du musst den arbeitsbezogenen Prozentsatz basierend auf deiner tatsächlichen Nutzung berechnen. Führe ein vier-Wochen-Tagebuch von Arbeits- vs. Privatnutzung als Beleg. Wir helfen dir, einen angemessenen Prozentsatz zu berechnen, wenn wir deine Steuererklärung vorbereiten.

## Häufige Absetzungen für Working Holiday Maker

Die am häufigsten geltend gemachten Absetzungen für Backpacker:

- Sonnenschutz (Sonnencreme, Sonnenbrille, Sonnenhut) für Outdoor-Arbeiter
- Arbeitsstiefel und Hi-Vis-Ausrüstung für Farm- und Bauarbeit
- Messerrollen und Kochuniformen für Küchenarbeit
- Handy-Nutzung für Kontakt zu Arbeitgebern und Schichtpläne
- Steueragenten-Gebühren (ja, unsere Gebühr für deine Steuererklärung ist selbst absetzbar)
- Home-Office-Ausgaben für Remote-Contractor-Arbeit
- Selbststudium-Ausgaben zur Verbesserung von Fähigkeiten, die direkt mit deinem aktuellen Job zusammenhängen

Auf der Liste der **nicht** absetzbaren Posten:

- Tägliche Fahrten zwischen Zuhause und der Arbeit
- Generische Kleidung
- Ausgaben für Visa-Beschaffung oder visumbezogene Reisen
- Persönliche Mahlzeiten und Unterhaltung

## Welche Belege musst du aufbewahren?

Für jede Absetzung brauchst du einen Beleg:

- Eine Quittung mit Datum, Lieferant, Artikel und Betrag
- Ein Bank- oder Kreditkartenauszug, der die Transaktion zeigt
- Eine Tagebuchnotiz (akzeptabel für kleine oder regelmäßige Ausgaben)

Ohne Belege kann die Absetzung nicht geltend gemacht werden, selbst wenn die Ausgabe wirklich arbeitsbezogen war. Fotografiere Quittungen am Tag des Erhalts mit deinem Handy und schick sie dir selbst per E-Mail oder speichere sie in der Cloud.
 `,
  },

  // ─── Super - More posts ────────────────────────────────────────────────────
  'what-is-superannuation': {
    title: 'Was ist Superannuation und sind Working Holiday Maker dafür berechtigt?',
    description: 'Superannuation ist Australiens verpflichtendes Rentensparsystem. Working Holiday Maker sind berechtigt und können es zurückbekommen, wenn sie das Land verlassen.',
    body: `
Superannuation (Super) ist Australiens verpflichtendes Rentensparsystem. Australische Arbeitgeber müssen 12 % deiner regulären Arbeitseinkünfte in einen Super-Fonds einzahlen, zusätzlich zu deinem Lohn. Working Holiday Maker haben Anspruch auf Super-Beiträge genau wie australische Arbeitnehmer und können das angesparte Guthaben zurückbekommen, wenn sie Australien permanent verlassen - über den Departing Australia Superannuation Payment (DASP)-Prozess. Unser Team kümmert sich um DASP-Anträge für Working Holiday Maker von überall auf der Welt.

## Wie viel Super zahlt dein Arbeitgeber ein?

Der aktuelle Satz ab 2026 beträgt 12 % deiner regulären Arbeitseinkünfte:

- Der Satz war 11,5 % vom 1. Juli 2024 bis 30. Juni 2025
- Der Satz stieg ab 1. Juli 2025 auf 12 % und bleibt bei 12 %
- Super wird **zusätzlich zu** deinem Lohn gezahlt, nicht davon abgezogen
- Beispiel: Du verdienst 1.000 $ in einer Woche → Arbeitgeber zahlt zusätzlich 120 $ in deinen Super-Fonds

Wenn auf deinem Lohnzettel Super von deinem Bruttolohn abgezogen wird, ist das falsch. Super ist immer eine zusätzliche Kostenposition für den Arbeitgeber.

## Auf welchen Super-Fonds gehen deine Beiträge?

Wenn du einen neuen Job anfängst, fragt dich dein Arbeitgeber, welchen Fonds er verwenden soll:

- Wenn du einen Fonds angibst, gehen die Beiträge dorthin
- Wenn du keinen angibst, verwendet dein Arbeitgeber die "Stapled Fund"-Regel (der Fonds, der mit deiner TFN aus früherer australischer Arbeit verknüpft ist)
- Wenn du keinen Stapled Fund hast (dein erster australischer Job), nutzt der Arbeitgeber seinen Standard-Fonds

Für Working Holiday Maker spielt der spezifische Fonds weniger Rolle als für ständige Einwohner, weil du das Guthaben sowieso bei Abreise abhebst. Was zählt: dass du das Konto bei Auszahlung finden und darauf zugreifen kannst. Unser Team kann Konten über mehrere Fonds für dich finden.

## Sind alle Working Holiday Maker für Super berechtigt?

Ja, in fast allen Anstellungsfällen:

- Arbeitgeber müssen Super für jeden Arbeitnehmer zahlen, der Lohn verdient (die 450 $/Monat-Schwelle wurde 2022 abgeschafft)
- Super gilt ab dem ersten verdienten Dollar
- Sowohl Working Holiday Visum-Inhaber (Subclass 417) als auch Work and Holiday Visum-Inhaber (Subclass 462) sind berechtigt
- Arbeiten als Contractor unter einer [ABN](/de/abn) erzeugt in der Regel keine Super-Beiträge, mit einigen Ausnahmen

Wenn du dir nicht sicher bist, ob Super für dich gezahlt wird, [schick uns deine Daten](/de/contact) und wir prüfen das.

## Wie bekommst du deine Super zurück, wenn du Australien verlässt?

Der Prozess heißt Departing Australia Superannuation Payment (DASP). Die Schritte:

1. Dein Visum muss abgelaufen oder gekündigt sein
2. Du musst Australien permanent verlassen haben
3. DASP beantragen über unseren Service, den wir für dich einreichen
4. Der Fonds (oder das ATO, falls das Guthaben übertragen wurde) zahlt das Guthaben aus

Wichtig: DASP-Auszahlungen werden mit 65 % der steuerpflichtigen Komponente besteuert - für Working Holiday Maker. Das ist höher als die 35 %, die vor 2017 galten. Trotz der Steuer lohnt es sich immer noch, die Super zu beantragen, weil die Alternative ist, sie für immer zurückzulassen.

Siehe unseren detaillierten Artikel zu [wie der DASP-Prozess funktioniert](/de/blog/what-is-dasp-super-withdrawal) für eine Schritt-für-Schritt-Erklärung.
 `,
  },

  // ─── Title/description-only translations (body falls back to English with notice) ─

  // Tax Return
  'how-to-lodge-tax-return-working-holiday': {
    title: 'Wie du als Working Holiday Maker eine Steuererklärung in Australien einreichst',
    description: 'Eine australische Steuererklärung einzureichen ist einfacher, als es klingt. Hier ist eine Schritt-für-Schritt-Anleitung des gesamten Prozesses.',
    body: `
Um als Working Holiday Maker eine Steuererklärung in Australien einzureichen, ist die einfachste Option, einen registrierten Steueragenten wie unser Team zu nutzen. Wir sammeln deine Daten, greifen direkt über unser Steueragenten-Portal auf deine Income Statements zu, bereiten deine Steuererklärung vor und reichen sie für dich beim ATO ein. Der Prozess funktioniert gleich, egal ob du noch in Australien bist oder schon abgereist. Mit einem registrierten Agenten bekommst du eine verlängerte Einreichungsfrist über den Standard-31. Oktober hinaus.

## Was brauchst du, um eine Steuererklärung einzureichen?

Um deine Steuererklärung über unseren Service einzureichen, brauchen wir:

- Deine Tax File Number (TFN)
- Identifikation (Reisepass-Daten)
- Details zu einem australischen Bankkonto für eine eventuelle Rückzahlung
- Alle arbeitsbezogenen Kosten, die du als absetzbar geltend machen möchtest
- Details zu eventuellem ABN- oder Contractor-Einkommen (falls relevant)

Wir können auf deine Income Statements direkt aus dem ATO-System zugreifen, sodass du keine Lohnzettel oder PAYG-Summaries von jedem Arbeitgeber selbst sammeln musst.

## Wie funktioniert der Einreichungsprozess?

Wenn du über unseren Service einreichst:

1. Du schickst uns deine Daten und Belege für absetzbare Kosten
2. Wir holen deine Income Statements aus dem ATO-System
3. Wir bereiten die Steuererklärung vor und prüfen sie auf Genauigkeit
4. Wir bestätigen den erwarteten Rückzahlungsbetrag mit dir, bevor wir einreichen
5. Wir reichen die Steuererklärung beim ATO für dich ein
6. Das ATO bearbeitet die Steuererklärung innerhalb von zwei Wochen und überweist die Rückzahlung auf dein Bankkonto

Du siehst und genehmigst die Zahlen, bevor wir einreichen - keine Überraschungen.

## Was passiert nach der Einreichung?

Nach der Einreichung:

- Das ATO bearbeitet die Steuererklärung (meistens innerhalb von zwei Wochen)
- Sie vergleichen, was einbehalten wurde, mit dem, was du tatsächlich schuldetest
- Rückzahlung auf dein angegebenes australisches Bankkonto
- Oder, falls du Geld schuldest, bekommst du eine Mitteilung mit Zahlungsfrist

Wir überwachen den Einreichungsstatus und sagen dir Bescheid, wenn die Rückzahlung ausgestellt wurde.

## Was, wenn du für mehrere Arbeitgeber gearbeitet hast?

Wenn du im Laufe des Jahres für mehr als einen Arbeitgeber gearbeitet hast, muss das Einkommen jedes Arbeitgebers in deiner Steuererklärung erfasst sein. Wenn wir über unser Steueragenten-Portal einreichen:

- Wir sehen jeden Arbeitgeber, der im Steuerjahr Einkommen für dich gemeldet hat
- Wir gleichen mit allen Lohnzetteln ab, die du uns gibst
- Wir markieren Arbeitgeber, die ihre Meldung noch nicht abgeschlossen haben
- Wir warten, bis alles abgeschlossen ist, bevor wir einreichen, um keine spätere Änderung machen zu müssen

Selbst einreichen kann dazu führen, dass du einen Arbeitgeber vergisst - was Probleme verursacht, wenn das ATO es bemerkt und deine Steuererklärung nachträglich anpasst. Über unseren Service umgehst du dieses Risiko komplett.

Für Steuererklärungen mit mehreren Arbeitgebern oder für Working Holiday Maker mit sowohl TFN- als auch [ABN](/de/abn)-Einkommen ist die Abstimmungsarbeit genauso wichtig wie die Einreichung selbst. [Kontaktiere unser Team](/de/contact), damit jeder Dollar korrekt erfasst wird.
 `,
  },

  'what-is-payg-payment-summary': {
    title: 'Was ist ein PAYG Payment Summary und wie nutzt du es?',
    description: 'Ein PAYG Payment Summary zeigt dein Gesamteinkommen und die einbehaltene Steuer für das Jahr. Hier ist, was es ist und wie du darauf zugreifst.',
    body: `
Ein PAYG Payment Summary - heute Income Statement genannt - ist die offizielle Aufzeichnung, die dein Gesamtgehalt und die gesamte vom Arbeitgeber einbehaltene Steuer in einem Steuerjahr zeigt. Es ist das Dokument, das zum Einreichen deiner [Steuererklärung](/de/tax-return) genutzt wird. Arbeitgeber melden Löhne und Einbehaltsbeträge automatisch über ihre Lohnbuchhaltungssoftware an das ATO, sodass das Income Statement digital erstellt wird, statt dir als Papierdokument ausgehändigt zu werden. Als dein registrierter Steueragent kann unser Team direkt über das ATO-System auf deine Income Statements zugreifen.

## Wie funktionieren Income Statements heute?

Das alte System der Papier-PAYG Payment Summaries wurde durch Single Touch Payroll (STP) ersetzt. Unter STP:

- Arbeitgeber melden Löhne und Einbehaltungen mit jeder Lohnauszahlung direkt an das ATO
- Die Daten werden am Jahresende in deinem Income Statement zusammengeführt
- Das Statement wird vom Arbeitgeber zwischen 14. Juli und 31. Juli abgeschlossen
- Sobald es abgeschlossen ist, kann deine Steuererklärung mit diesen Daten eingereicht werden

## Wie greifst du auf dein Income Statement zu?

Über unseren Service greifen wir direkt auf dein Income Statement zu. Du musst es nicht von deinem Arbeitgeber sammeln oder dich selbst in ATO-Systeme einloggen.

Was wir in deinen Aufzeichnungen sehen:

- Gesamtbruttolohn von jedem Arbeitgeber
- Gesamte einbehaltene Steuer von jedem Arbeitgeber
- Jeder Arbeitgeber separat aufgelistet, falls du für mehrere gearbeitet hast
- Der Abschlussstatus (in Bearbeitung oder abgeschlossen)

Das ist einer der Hauptvorteile beim Einreichen über einen registrierten Steueragenten. Wir sehen alles, was das ATO sieht, und wir warten, bis alle Arbeitgeber-Meldungen abgeschlossen sind, bevor wir deine Steuererklärung einreichen.

## Was, wenn ein Arbeitgeber seine Meldung nicht abgeschlossen hat?

Wenn ein Steuerjahr beendet ist und das Income Statement eines Arbeitgebers nach dem 31. Juli noch als "in Bearbeitung" angezeigt wird, hat er seine Lohnmeldung nicht abgeschlossen. Wir können:

- Den Arbeitgeber für dich kontaktieren und ihn bitten, abzuschließen
- Mit einer Schätzung einreichen, wenn der Arbeitgeber nicht reagiert (und später ändern, falls nötig)
- Dir helfen, das Problem beim ATO anzusprechen, falls der Arbeitgeber sich weigert zu melden

[Kontaktiere uns](/de/contact), wenn du Hilfe brauchst, einem Arbeitgeber hinterherzulaufen, der seine Meldung nicht abgeschlossen hat.

## Wie wird dein Income Statement zum Einreichen genutzt?

Wenn wir deine Steuererklärung vorbereiten:

- Wir holen deine Income Statements aus dem ATO-System
- Wir gleichen die Zahlen mit allen Lohnzetteln ab, die du uns gibst
- Wir identifizieren Diskrepanzen (fehlende Löhne, falsche Einbehaltung, fehlende Arbeitgeber)
- Wir markieren und lösen Probleme, bevor wir einreichen

Ohne diese Abstimmung einzureichen ist riskant. Die Income Statements sind meistens korrekt, aber nicht immer - und jeder Fehler wird zu einem Problem, das du im Nachhinein mit dem ATO klären musst.
 `,
  },

  'do-you-need-to-lodge-tax-return-short-stay': {
    title: 'Musst du eine Steuererklärung einreichen, wenn du nur kurz in Australien gearbeitet hast?',
    description: 'Auch wenn du nur ein paar Wochen gearbeitet hast, musst du eventuell eine Steuererklärung einreichen. Hier ist, wie du das herausfindest.',
    body: `
Ja, du musst fast sicher eine Steuererklärung in Australien einreichen, auch wenn du nur ein paar Wochen gearbeitet hast. Die Einreichungspflicht hängt nicht davon ab, wie lange du geblieben bist. Sie hängt davon ab, ob du während des australischen Steuerjahres Einkommen hattest. Zwei Wochen zu arbeiten erzeugt dieselbe Einreichungspflicht wie zwei Jahre. Einreichen lohnt sich auch oft finanziell, weil die meisten Working Holiday Maker eine Rückzahlung bekommen.

## Was ist die allgemeine Regel?

Wenn du in einem Steuerjahr (1. Juli bis 30. Juni) in Australien irgendeinen Lohn verdient hast, musst du für dieses Jahr eine Steuererklärung einreichen. Das gilt für:

- Zwei-Wochen-Casual-Rollen
- Einzelne Saisonjobs
- Kurze Contractor-Arbeit unter einer [ABN](/de/abn)
- Schwarzarbeit, die eigentlich über PAYG gemeldet werden sollte

Das ATO nutzt deine Steuererklärung, um deine tatsächliche Steuerschuld zu berechnen und sie mit dem abzugleichen, was von deinen Löhnen einbehalten wurde.

## Wann musst du eventuell nicht einreichen?

Es gibt begrenzte Umstände, in denen Einreichen nicht erforderlich ist:

- Du hast in dem Steuerjahr nichts in Australien verdient
- Dein einziges australisches Einkommen war Investmenteinkommen (Zinsen oder Dividenden) unter einer kleinen Schwelle, mit korrekt angewendeter Quellensteuer

Für Working Holiday Maker, die in irgendeiner Lohn-zahlenden Rolle gearbeitet haben, gilt die Einreichungspflicht fast immer. Wenn du unsicher bist, ob deine Situation eine Einreichung erfordert, [schick uns eine Nachricht](/de/contact) mit den Details und wir prüfen das.

## Warum sich Einreichen meistens lohnt, auch wenn du nur kurz gearbeitet hast

Auch wenn nicht streng erforderlich, führt das Einreichen oft zu einer Rückzahlung. Die häufigsten Gründe, warum Kurzzeit-Arbeiter eine Rückzahlung bekommen:

- Ohne hinterlegte TFN für einen Teil der Zeit gearbeitet (mit 45 % statt 15 % einbehalten)
- Arbeitgeber hat zum Foreign Resident-Satz (30 %) einbehalten statt zum Working Holiday Maker-Satz
- Zeiträume, in denen der falsche Satz angewendet wurde wegen falscher Einstellung des Tax File Number Declaration-Formulars
- Berechtigte Absetzungen für arbeitsbezogene Kleidung, Werkzeuge oder Fahrten

Nicht einzureichen bedeutet, jede Rückzahlung beim ATO zu lassen. Die Beträge sind oft mehrere Hundert bis mehrere Tausend Dollar - auch bei kurzen Aufenthalten.

## Wie du nach einem kurzen Aufenthalt oder aus dem Ausland einreichst

Auch wenn du Australien schon verlassen hast, ist Einreichen über unseren Service einfach:

1. [Schick uns deine Daten](/de/contact) (TFN, Reisepass, Beschäftigungsdaten)
2. Wir holen deine Income Statements aus dem ATO-System
3. Wir bereiten die Steuererklärung remote vor und reichen sie ein
4. Die Rückzahlung wird auf dein australisches Bankkonto überwiesen

Du musst nicht nach Australien zurückkommen. Halte dein australisches Bankkonto offen, bis die Rückzahlung gutgeschrieben ist.

Die Standardfrist ist der 31. Oktober nach Ende des Steuerjahres, aber wenn du über unser Team als deinen registrierten Steueragenten einreichst, qualifizierst du dich für die verlängerte Agenten-Frist.
 `,
  },

  'how-to-lodge-tax-return-from-overseas': {
    title: 'Wie du eine australische Steuererklärung aus dem Ausland einreichst, nachdem du abgereist bist',
    description: 'Australien zu verlassen heißt nicht, dass du die Steuererklärung überspringen kannst. Hier ist, wie du sie von überall auf der Welt einreichst.',
    body: `
Um eine australische Steuererklärung nach deiner Abreise aus dem Ausland einzureichen, arbeite mit einem registrierten Steueragenten, der die Steuererklärung remote für dich vorbereiten und einreichen kann. Der gesamte Prozess wird elektronisch erledigt, und deine Rückzahlung wird auf dein australisches Bankkonto überwiesen. Unser Team kümmert sich jede Woche um Steuererklärungen von Working Holiday Makern aus aller Welt. Du musst nicht nach Australien zurück, und die Einreichungsfrist wird verlängert, wenn du über einen registrierten Steueragenten gehst.

## Wie reichst du aus dem Ausland über unseren Service ein?

Der Prozess ist vollständig remote:

1. [Schick uns deine Daten](/de/contact): TFN, Reisepass, Beschäftigungsdaten, Bankkonto
2. Wir holen deine Income Statements aus dem ATO-System
3. Wir bereiten deine Steuererklärung vor und bestätigen die erwartete Rückzahlung mit dir
4. Wir reichen sie beim ATO für dich ein
5. Die Rückzahlung wird auf dein australisches Bankkonto überwiesen, meistens innerhalb von zwei Wochen

Du musst dich nicht selbst mit ATO-Online-Systemen herumschlagen. Du musst nicht nach Australien zurückkommen.

## Was brauchst du, um aus dem Ausland einzureichen?

Um über unseren Service einzureichen, brauchen wir:

- Deine Tax File Number (TFN)
- Identifikation (Reisepass-Daten)
- Details zu einem australischen Bankkonto für die Rückzahlung
- Belege für absetzbare Kosten (wir arbeiten mit dir, was berechtigt ist)
- Details zu eventuellem ABN- oder Contractor-Einkommen

Falls du dein australisches Bankkonto schon geschlossen hast, [kontaktiere unser Team](/de/contact) und wir besprechen alternative Möglichkeiten für den Empfang der Rückzahlung.

## Was ist die Frist für die Einreichung aus dem Ausland?

Die Standardfrist ist der 31. Oktober nach Ende des Steuerjahres:

- Steuerjahr 2024-25 → Standardfrist 31. Oktober 2025
- Über unseren Service als dein registrierter Steueragent → Frist oft bis Mai des Folgejahres verlängert

Das heißt: Wenn du die Oktober-Frist verpasst hast, gibt dir das Einreichen über uns immer noch Zeit, ohne Strafgebühren einzureichen.

## Was passiert mit deiner Rückzahlung, wenn du aus dem Ausland einreichst?

Wenn im Laufe des Jahres zu viel Steuer gezahlt wurde, erstattet das ATO die Differenz:

- Wird auf dein australisches Bankkonto überwiesen
- Kommt meistens innerhalb von zwei Wochen nach Einreichung an
- Manchmal schneller (ein paar Werktage)
- Die Zahlung ist in australischen Dollar

Halte dein australisches Bankkonto offen, bis die Rückzahlung gutgeschrieben ist. Wenn du es schon geschlossen hast, finden wir mit dir alternative Lösungen, wenn wir mit der Steuererklärung anfangen.

## Was, wenn du Geld schuldest statt eine Rückzahlung zu bekommen?

In seltenen Fällen, wenn im Laufe des Jahres zu wenig einbehalten wurde (zum Beispiel mit ABN-Einkommen oder wenn der Freibetrag fälschlich beansprucht wurde), schuldest du eventuell Geld, statt eine Rückzahlung zu bekommen. Wenn das passiert:

- Das ATO stellt eine Mitteilung mit Zahlungsfrist aus
- Wir können einen Zahlungsplan einrichten, falls nötig
- Der Betrag muss bezahlt werden, bevor deine Steuerpflichten als gelöst gelten

Die meisten Working Holiday Maker bekommen eine Rückzahlung. Geld zu schulden ist die Ausnahme, nicht die Regel.
 `,
  },

  'what-is-a-tax-agent': {
    title: 'Was ist ein Steueragent und warum sollten Working Holiday Maker einen nutzen?',
    description: 'Ein registrierter Steueragent bereitet Steuererklärungen vor und reicht sie für dich ein. Hier ist, was sie machen und warum es sinnvoll ist.',
    body: `
Ein registrierter Steueragent ist ein Steuerprofi, der vom Tax Practitioners Board ermächtigt ist, Steuererklärungen im Namen von Mandanten vorzubereiten und einzureichen. In Australien muss jeder, der gegen Bezahlung Steuerdienstleistungen anbietet, beim TPB registriert sein. Working Holiday Maker profitieren aus drei Hauptgründen von einem registrierten Steueragenten: Zugang zu verlängerten Einreichungsfristen, vollständige Bearbeitung der Kommunikation mit dem ATO und Identifizierung von Absetzungen, die Selbsteinreicher oft übersehen.

## Was macht ein registrierter Steueragent eigentlich?

Ein registrierter Steueragent kümmert sich um deine Steuererklärung von Anfang bis Ende:

- Prüft dein Einkommen und deine persönlichen Umstände
- Greift direkt aus dem ATO-System auf deine Income Statements zu
- Identifiziert alle Absetzungen und Steuervergünstigungen, auf die du Anspruch hast
- Bereitet die Steuererklärung vor und prüft sie auf Genauigkeit
- Reicht die Steuererklärung beim ATO für dich ein
- Verwaltet die gesamte Kommunikation mit dem ATO nach der Einreichung
- Bearbeitet jede Prüfung, Anpassung oder Anfrage, die auftritt

Wenn das ATO deine Steuererklärung in Frage stellt oder eine Prüfung durchführt, verwaltet dein Agent diesen Prozess. Du musst nicht direkt mit dem ATO zu tun haben.

## Warum profitieren Working Holiday Maker von einem Steueragenten?

Es gibt mehrere Gründe:

- **Mehrere Arbeitgeber**: Wenn du im Laufe des Jahres für mehrere Arbeitgeber gearbeitet hast, ist das Fehlerrisiko beim Selbsteinreichen hoch. Ein Agent sammelt alle Einkünfte und gleicht ab.
- **Einreichung aus dem Ausland**: Einreichen aus dem Ausland ist ohne lokale Infrastruktur (australische Telefonnummern, Adressen, Bankwesen) schwieriger. Ein Agent erledigt alles remote.
- **Verpasste Absetzungen**: Working Holiday Maker verpassen oft Absetzungen, auf die sie Anspruch haben (Arbeitsstiefel, Uniformen, Sonnenschutz, Handy-Nutzung, Steueragenten-Gebühren selbst). Ein Agent identifiziert sie.
- **Verlängerte Frist**: Wenn du über einen registrierten Agenten einreichst, qualifizierst du dich für eine verlängerte Frist über den Standard-31. Oktober hinaus - oft bis Mai des Folgejahres.
- **Keine ATO-Verwaltung**: Du musst dich nie selbst im ATO-Online-Portal zurechtfinden.

## Wie verifizierst du, dass ein Steueragent seriös ist?

Verifiziere immer, dass der Agent aktuell registriert ist:

- [Prüfe, dass jeder, der dich berät, ein registrierter Steueragent ist](/de/contact)
- Bestätige, dass die Registrierung des Agenten aktiv und nicht suspendiert ist
- Verifiziere, dass die Registrierung Steueragenten-Dienstleistungen abdeckt (nicht nur BAS-Dienstleistungen)
- Frag im Voraus nach der TPB-Registrierungsnummer des Agenten

Beauftrage niemals jemanden, der behauptet, ein Steueragent zu sein, aber keine TPB-Registrierungsnummer angeben kann. Das TPB-Register ist die einzige verbindliche Quelle.

## Wie wird unser Service beaufsichtigt?

Wir arbeiten unter der Aufsicht eines registrierten Steueragenten. Unsere Registrierungsdetails sind im TPB-Register aufgeführt und auf Anfrage verfügbar. Wenn wir deine Steuererklärung einreichen, geschieht das über die TPB-Nummer des beaufsichtigenden Steueragenten - das heißt, du bekommst alle Schutz- und Vorteilsmöglichkeiten der Zusammenarbeit mit einem registrierten Agenten.

[Kontaktiere](/de/contact) unser Team und wir teilen dir unsere Registrierungsdetails mit und erklären, wie unser Prozess funktioniert.
 `,
  },

  'how-does-payg-withholding-work': {
    title: 'Wie funktioniert PAYG-Einbehaltung in Australien?',
    description: 'PAYG-Einbehaltung ist, wie dein Arbeitgeber Steuer von deinem Lohn einbehält, bevor er dich bezahlt. Hier ist, wie das System funktioniert.',
    body: `
PAYG (Pay As You Go)-Einbehaltung ist das System, das australische Arbeitgeber nutzen, um Einkommensteuer von deinem Lohn abzuziehen, bevor sie dich bezahlen. Der einbehaltene Betrag wird direkt ans ATO als Vorauszahlung auf deine jährliche Steuerschuld gezahlt. Für Working Holiday Maker mit hinterlegter [TFN](/de/tfn) beträgt der korrekte PAYG-Einbehaltungssatz 15 % auf die ersten 45.000 $ Einkommen. Ohne TFN springt der Satz auf 45 %.

## Wie funktioniert PAYG für Working Holiday Maker?

Der PAYG-Prozess für einen Working Holiday Maker:

1. Du gibst deine [TFN](/de/tfn) an und füllst ein Tax File Number Declaration-Formular aus
2. Du erklärst auf dem Formular deinen Visa-Status als Working Holiday Maker
3. Dein Arbeitgeber wendet den 15 %-Satz auf deinen Bruttolohn an
4. Der einbehaltene Betrag wird vom Arbeitgeber ans ATO gezahlt
5. Am Jahresende gleicht deine Steuererklärung das einbehaltene Gesamt mit deiner tatsächlichen Steuerschuld ab

Wenn du deine TFN nicht angibst, muss dein Arbeitgeber 45 % einbehalten. Das zu viel Einbehaltene holst du mit deiner [Steuererklärung](/de/tax-return) zurück - aber das Geld liegt bis dahin beim ATO.

## Was erscheint auf deinem Lohnzettel?

Jeder australische Lohnzettel sollte zeigen:

- **Bruttolohn**: Gesamteinkommen vor Abzügen
- **Tax withheld**: als PAYG abgezogener Betrag (sollte 15 % vom Brutto für Working Holiday Maker sein)
- **Super**: 12 %-Super-Beitrag, den dein Arbeitgeber zahlt (nicht von deinem Lohn abgezogen)
- **Nettolohn**: Betrag, der auf deinem Bankkonto landet

Wenn du siehst, dass 45 % einbehalten werden, obwohl du deine TFN angegeben hast, sprich es sofort mit deinem Arbeitgeber an. Wenn er es nicht beheben kann, [schick uns deinen Lohnzettel](/de/contact) und wir finden die korrekte Behandlung.

## Wie verbindet PAYG sich mit deiner Steuererklärung?

Am Jahresende schließt dein Arbeitgeber seine Lohnmeldung ab:

- Gesamtlöhne, die dir im Jahr gezahlt wurden, werden ans ATO gemeldet
- Gesamte einbehaltene PAYG-Steuer wird ans ATO gemeldet
- Beide Zahlen erscheinen in deinem Income Statement
- Wir nutzen diese Zahlen, wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten

Das ATO vergleicht dann:

- Was du tatsächlich schuldetest (berechnet aus deinem Gesamteinkommen und Visa-Status)
- Was über PAYG während des Jahres einbehalten wurde

Wenn zu viel einbehalten wurde, bekommst du eine Rückzahlung. Wenn zu wenig einbehalten wurde, schuldest du die Differenz.

## Häufige PAYG-Probleme für Working Holiday Maker

Die häufigsten Probleme, die wir sehen:

- 45 %-Einbehaltung, weil die TFN beim Arbeitsbeginn nicht hinterlegt war
- 30 %-Einbehaltung, weil der Arbeitgeber nicht beim ATO als Arbeitgeber von Working Holiday Makern registriert war
- Freibetrag fälschlich auf dem Tax File Number Declaration-Formular beansprucht
- Gar keine PAYG-Einbehaltung bei Schwarzarbeit
- Gemischtes PAYG- und ABN-Einkommen, kompliziert durch falsche Einstellung

Wenn dein Lohnzettel falsch aussieht oder du einen Fehler vermutest, [kontaktiere unser Team](/de/contact). Wir finden heraus, was hätte einbehalten werden sollen, und holen jeden zu viel gezahlten Betrag über deine Steuererklärung zurück.
 `,
  },

  'australian-financial-year-dates': {
    title: 'Was ist das australische Finanzjahr und wann beginnt und endet es?',
    description: 'Australien nutzt ein Finanzjahr, das vom 1. Juli bis 30. Juni läuft, nicht das Kalenderjahr. Hier ist, was das für dich bedeutet.',
    body: `
Das australische Finanzjahr läuft vom 1. Juli bis 30. Juni des folgenden Kalenderjahres. Das ist anders als das Kalenderjahr und anders als das Steuerjahr, das in vielen anderen Ländern genutzt wird. Das aktuelle Finanzjahr ist (Stand Mitte 2026) 2025-26 (1. Juli 2025 bis 30. Juni 2026). Diese Daten zu kennen ist für Working Holiday Maker wichtig, weil das gesamte in einem Finanzjahr verdiente Einkommen zusammen auf einer Steuererklärung eingereicht werden muss.

## Wie werden australische Finanzjahre benannt?

Australische Finanzjahre erstrecken sich über zwei Kalenderjahre, also werden sie unter Verwendung beider benannt:

- **Finanzjahr 2024-25**: 1. Juli 2024 bis 30. Juni 2025
- **Finanzjahr 2025-26**: 1. Juli 2025 bis 30. Juni 2026
- **Finanzjahr 2026-27**: 1. Juli 2026 bis 30. Juni 2027

Wenn jemand "das aktuelle Steuerjahr" oder "dieses Finanzjahr" meint, ist das gerade laufende Jahr gemeint.

## Warum sind diese Daten für Working Holiday Maker wichtig?

Die Daten bestimmen, unter welche Steuererklärung dein Einkommen fällt:

- November 2024 angekommen, bis Mai 2025 gearbeitet: alles Einkommen fällt ins Finanzjahr 2024-25. Reiche nach dem 30. Juni 2025 ein.
- Mai 2024 angekommen, August 2024 abgereist: Einkommen erstreckt sich über zwei Finanzjahre. Du musst separate Steuererklärungen für 2023-24 (Mai-Juni 2024-Einkommen) und 2024-25 (Juli-August 2024-Einkommen) einreichen.
- Juli 2025 angekommen, bis Juni 2026 gearbeitet: alles Einkommen fällt ins Finanzjahr 2025-26. Reiche nach dem 30. Juni 2026 ein.

Wenn dein Aufenthalt den 30. Juni überschreitet, musst du zwei Steuererklärungen einreichen - eine für jedes Finanzjahr. Unser Team kümmert sich häufig darum.

## Welche Schlüsseldaten solltest du dir merken?

- **30. Juni**: Finanzjahr endet
- **1. Juli**: neues Finanzjahr beginnt, Einreichungsfenster für die Steuererklärung öffnet
- **14. Juli**: Arbeitgeber fangen an, Income Statements abzuschließen
- **31. Juli**: die meisten Income Statements sollten bis zu diesem Datum abgeschlossen sein
- **31. Oktober**: Standardfrist zum Einreichen deiner Steuererklärung
- **Verlängert (etwa Mai des Folgejahres)**: Frist, wenn du über einen registrierten Steueragenten wie unser Team einreichst

Die Einreichung öffnet am 1. Juli, aber es lohnt sich meistens, bis Ende Juli oder Anfang August zu warten, damit das Income Statement deines Arbeitgebers abgeschlossen ist. Wir überwachen das für dich, wenn du über unseren Service einreichst.

## Was ist mit Super und vierteljährlichen Fristen?

Superannuation-Beiträge werden vierteljährlich gezahlt:

- Q1 (Jul-Sep): fällig bis 28. Oktober
- Q2 (Okt-Dez): fällig bis 28. Januar
- Q3 (Jan-Mär): fällig bis 28. April
- Q4 (Apr-Jun): fällig bis 28. Juli

Diese Daten sind wichtig, wenn du prüfst, ob dein Arbeitgeber deine [Super](/de/superannuation) korrekt gezahlt hat, bevor du Australien verlässt.

[Kontaktiere unser Team](/de/contact), um deine australische Steuererklärung über unseren registrierten Steueragenten-Service einzureichen und sicherzustellen, dass jede Rückzahlung, die dir zusteht, beantragt wird.
 `,
  },

  'cash-in-hand-tax-return': {
    title: 'Kannst du eine Steuererklärung machen, wenn du in Australien schwarz gearbeitet hast?',
    description: 'Schwarzarbeit befreit dich nicht von deinen Steuerpflichten. Hier ist, was du angeben musst und wie du damit umgehst.',
    body: `
Ja, du musst eine Steuererklärung einreichen, wenn du in Australien schwarz gearbeitet hast. Bare Zahlungen sind genauso steuerpflichtiges Einkommen wie Lohn, der per Banküberweisung gezahlt wurde. Der einzige Unterschied ist, dass zum Zeitpunkt der Zahlung keine PAYG-Steuer einbehalten wurde - du bist also dafür verantwortlich, das Einkommen anzugeben und die fällige Steuer am Ende des Steuerjahres zu zahlen. Bar-Einkommen nicht anzugeben ist Steuerhinterziehung. Unser Team kümmert sich regelmäßig um Steuererklärungen, die Schwarzarbeit beinhalten.

## Was bedeutet Schwarzarbeit für deine Steuer?

Wenn du in bar bezahlt wirst:

- Keine PAYG-Steuer wird zum Zahlungszeitpunkt einbehalten
- Es existiert keine Aufzeichnung im ATO-Lohnmeldesystem
- Du bekommst den vollen Betrag, aber die Steuerschuld liegt bei dir
- Du gibst das Einkommen selbst in deiner Steuererklärung am Jahresende an

Das heißt, du schuldest eventuell Steuer zum 15 %-Working Holiday Maker-Satz auf die bar verdienten Beträge - zahlbar bei der Einreichung statt über PAYG.

## Welche Unterlagen solltest du aufbewahren?

Ohne PAYG-Aufzeichnungen ist deine eigene Dokumentation entscheidend:

- Daten, an denen du gearbeitet hast (jede Schicht notieren)
- Gearbeitete Stunden pro Schicht
- Vereinbarter Lohnsatz
- Erhaltener Betrag pro Zahlung
- Name und Kontaktdaten der Person oder des Unternehmens, die/das dich bezahlt hat
- Textnachrichten, E-Mails oder Schichtplan-Benachrichtigungen, die die Arbeit bestätigen

Fotografiere oder scanne diese Unterlagen und speichere sie sicher. Das ATO kann sie bis zu fünf Jahre später anfordern.

## Was ist mit Super bei Schwarzarbeit?

Wenn du Angestellter warst (kein Contractor unter einer [ABN](/de/abn)), ist dein Arbeitgeber gesetzlich verpflichtet, 12 % Superannuation zusätzlich zu deinem Lohn zu zahlen - auch wenn du bar bezahlt wirst. Viele bar zahlende Arbeitgeber tun das nicht. Das ist ein schwerer Verstoß gegen australisches Arbeitsrecht.

Wenn dir unbezahlte Super zusteht:

- Bewahre alle Unterlagen über deine Stunden und Löhne auf
- [Kontaktiere unser Team](/de/contact) und wir können helfen, das Problem anzugehen
- Wir bearbeiten den Erstattungsprozess regelmäßig für unsere Mandanten

Der erstattete Betrag kann beträchtlich sein, wenn du mehrere Wochen oder Monate gearbeitet hast.

## Was, wenn du keinen Lohnzettel bekommen hast?

Ohne Lohnzettel zu arbeiten ist bei Barvereinbarungen leider üblich. So gehst du damit um:

- Nutze deine eigenen Aufzeichnungen als Grundlage für die Einkommensangabe
- Sei ehrlich und konsistent (schätze, wo exakte Zahlen nicht verfügbar sind)
- Bewahre Belege für die Arbeit auf (Bankauszüge, die zeigen, wann du Bargeld eingezahlt hast, Textnachrichten, Fotos am Arbeitsplatz)

Eine ehrliche Steuererklärung mit leicht ungenauen Zahlen ist viel besser, als überhaupt nicht einzureichen. Dem ATO geht es viel mehr um vorsätzliche Nicht-Angabe als um kleine Schätzfehler in gutem Glauben.

## Was macht unser Service mit Schwarzarbeit-Einkommen?

Wenn du über uns einreichst:

- Wir geben das Bar-Einkommen zum korrekten 15 %-Working Holiday Maker-Satz an
- Wir berechnen genau, wie viel du schuldest (wenn überhaupt)
- Wir beantragen alle arbeitsbezogenen Absetzungen, um die Steuerrechnung zu reduzieren
- Wir können auch helfen, unbezahlte Super zurückzubekommen, falls du Angestellter warst

[Schick uns deine Daten](/de/contact) und wir finden den besten Weg, mit deiner Steuererklärung umzugehen - auch wenn deine Unterlagen unvollständig sind.
 `,
  },

  'tax-residency-working-holiday-makers': {
    title: 'Sind Working Holiday Maker Steuerresidenten Australiens?',
    description: 'Dein Steuerresidenten-Status beeinflusst, welche Steuersätze für dich gelten. Die meisten Working Holiday Maker sind keine Steuerresidenten.',
    body: `
Nein, Working Holiday Maker (Subclass 417- und 462-Visum-Inhaber) sind nach den Standard-Regeln keine australischen Steuerresidenten. Seit 2017 wird allerdings das gesamte Einkommen von Working Holiday Makern nach einem spezifischen Rahmen besteuert: ein pauschaler Satz von 15 % auf die ersten 45.000 $, unabhängig davon, ob du technisch Resident oder Non-Resident bist. Der Freibetrag gilt für Working Holiday Maker in keinem Fall. Die Residenz-Frage ist für Working Holiday-Löhne weniger wichtig als für andere Visa-Arten, kann aber Absetzungen und die Behandlung von Investmenteinkommen beeinflussen.

## Was ist der Working Holiday Maker-Steuerrahmen?

Seit 2017 werden Working Holiday Visum-Inhaber nach einem separaten Rahmen besteuert:

- Alles Lohneinkommen pauschal mit 15 % bis 45.000 $ pro Jahr besteuert
- 30 % auf Einkünfte zwischen 45.001 und 135.000 $
- 37 % auf Einkünfte zwischen 135.001 und 190.000 $
- 45 % auf Einkünfte über 190.000 $

Das gilt unabhängig davon, ob du nach den allgemeinen Regeln technisch Steuerresident oder Non-Resident bist. Der 15 %-Satz ist durch Working Holiday Maker-Gesetzgebung festgelegt und funktioniert unabhängig von der Residenz.

## Warum ist Residenz in manchen Situationen trotzdem wichtig?

Auch wenn der Pauschalsatz auf Löhne gilt, kann dein Residenz-Status weiterhin beeinflussen:

- **Absetzungen**: manche Absetzungen sind nur Residenten zugänglich
- **Investmenteinkommen**: Behandlung von Kapitalgewinnen und Investmenteinkommen variiert
- **Auslandseinkommen**: ob du Einkommen, das außerhalb Australiens verdient wurde, angeben musst
- **Medicare Levy**: an Medicare-Berechtigung gekoppelt, die an Residenz gekoppelt ist

Für die meisten Working Holiday Maker, die nur australisches Lohneinkommen und keine bedeutenden Investments haben, hat Residenz minimale praktische Auswirkung. Für komplexere Situationen (lange Aufenthalte, bedeutende Verbindungen zu Australien, ausländisches Investmenteinkommen) ist es wichtiger.

## Warum gilt der Freibetrag nicht?

Unabhängig von der Residenz-Klassifizierung:

- Working Holiday Maker können den 18.200 $-Freibetrag nicht beanspruchen
- Der 15 %-Satz gilt ab dem allerersten Dollar
- Das ist durch Working Holiday Maker-Gesetzgebung festgelegt
- "Nein" zum Freibetrag auf deinem Tax File Number Declaration-Formular auszuwählen ist für Working Holiday Maker immer korrekt

Wenn du den Freibetrag fälschlich beansprucht hast, droht dir eventuell eine Steuerschuld am Jahresende, weil zu wenig Steuer einbehalten wurde. Siehe unseren Artikel zu [Freibetrag für Working Holiday Maker](/de/blog/tax-free-threshold-working-holiday-visa).

## Was solltest du zur Steuerzeit auswählen?

Wenn wir deine [Steuererklärung](/de/tax-return) einreichen:

- Residenz-Auswahl: **Working Holiday Maker** (nicht Resident, nicht Foreign Resident)
- Das löst den 15 %-Satz aus
- Aktiviert die Medicare Levy-Befreiung
- Wendet die korrekten Absetzungsregeln an

Selbsteinreicher wählen manchmal versehentlich "Foreign Resident" oder "Resident", was zu falschem Satz führt. Wir kümmern uns darum korrekt, wenn wir deine Steuererklärung vorbereiten.

## Was, wenn deine Umstände komplexer sind?

Spezifische Beratung ist sinnvoll, wenn eines der folgenden zutrifft:

- Du warst über 12 Monate ununterbrochen in Australien
- Du hast bedeutende Verbindungen (langfristiger Mietvertrag, australischer Partner, Geschäftsinteressen)
- Du hast ausländisches Investmenteinkommen
- Du hast residenzbezogene Fragen zur Steuer in deinem Heimatland

[Kontaktiere unser Team](/de/contact) und wir arbeiten deine spezifische Situation durch. Die meisten Working Holiday Maker brauchen diese Detailanalyse nicht, aber für komplexe Fälle ist es wichtig, es richtig zu machen.
 `,
  },

  'what-is-a-tax-refund-australia': {
    title: 'Was ist eine Steuerrückzahlung und woher weißt du, ob dir eine in Australien zusteht?',
    description: 'Eine Steuerrückzahlung ist Geld, das das ATO zurückzahlt, wenn du im Laufe des Jahres mehr Steuern gezahlt hast, als du musstest. Die meisten Working Holiday Maker bekommen eine.',
    body: `
Eine Steuerrückzahlung ist Geld, das die Australian Taxation Office (ATO) dir zurückzahlt, wenn die im Laufe des Jahres von deinem Lohn einbehaltene Steuer höher war als deine tatsächliche Steuerschuld. Die meisten Working Holiday Maker bekommen eine Rückzahlung, weil ihr Arbeitgeber mehr Steuer als nötig einbehalten hat (oft während Zeiten ohne TFN oder weil sie nur einen Teil des Steuerjahres gearbeitet haben). Die Rückzahlung wird meistens innerhalb von zwei Wochen nach Einreichung auf dein australisches Bankkonto überwiesen. Unser Team berechnet deine erwartete Rückzahlung vor der Einreichung, damit du weißt, was zu erwarten ist.

## Warum bekommen die meisten Working Holiday Maker eine Rückzahlung?

Mehrere Faktoren führen typischerweise zu einer Rückzahlung:

- Du hast nur einen Teil des Steuerjahres gearbeitet (die Einbehaltung deines Arbeitgebers basiert auf einer Ganzjahresschätzung)
- Zeiten ohne hinterlegte TFN (45 % statt 15 % einbehalten)
- Zeiten mit nicht registriertem Arbeitgeber (30 % statt 15 % einbehalten)
- Berechtigte Absetzungen, die dein steuerpflichtiges Einkommen reduzieren
- Medicare Levy-Befreiung (spart 2 % des steuerpflichtigen Einkommens)

Je länger du in einem Jahr gearbeitet hast und je mehr Einbehaltungsprobleme es gab, desto größer die typische Rückzahlung.

## Wie weißt du, ob dir eine Rückzahlung zusteht?

Der einzige Weg, es genau zu wissen, ist eine Steuererklärung vorzubereiten:

- Wir holen deine Income Statements aus dem ATO-System
- Berechnen deine tatsächliche Steuerschuld zum 15 %-Satz
- Vergleichen mit dem, was einbehalten wurde
- Fügen berechtigte Absetzungen und die Medicare Levy-Befreiung hinzu
- Bestätigen den Rückzahlungsbetrag vor der Einreichung

Als grobe Schätzung: die meisten Working Holiday Maker, für die wir einreichen, bekommen zwischen 1.000 und 3.000 $ zurück. Manche bekommen mehr, je nach Aufenthaltsdauer, Zeiten höherer Einbehaltung und berechtigten Absetzungen.

## Wann zahlt das ATO deine Rückzahlung aus?

Der Zeitplan:

- Elektronisch einreichen (machen wir immer)
- ATO bearbeitet in den meisten Fällen innerhalb von zwei Wochen
- Manchmal schneller (ein paar Werktage)
- Rückzahlung direkt auf dein angegebenes australisches Bankkonto

Rückzahlungen in der Hauptsaison (August/September) können ein paar Tage länger dauern. Wir überwachen den Einreichungsstatus und sagen dir Bescheid, wenn die Rückzahlung freigegeben wurde.

## Kannst du eine Rückzahlung bekommen, nachdem du Australien verlassen hast?

Ja. Einreichen aus dem Ausland funktioniert über unseren Service genau gleich:

- Wir bereiten die Steuererklärung remote vor und reichen sie ein
- Die Rückzahlung wird auf dein australisches Bankkonto überwiesen
- Halte dieses Konto offen, bis die Rückzahlung gutgeschrieben ist

Wenn dein australisches Bankkonto schon geschlossen ist, [kontaktiere unser Team](/de/contact) und wir besprechen alternative Möglichkeiten.

## Wie kannst du deine Rückzahlung maximieren?

Um die größte legitime Rückzahlung zu bekommen:

- Reiche über unser Team ein, um alle berechtigten Absetzungen zu erfassen
- Beantrage die Medicare Levy-Befreiung (falls nicht Medicare-berechtigt)
- Verfolge das ganze Jahr über arbeitsbezogene Ausgaben
- Bewahre Belege für Uniformen, Werkzeuge, arbeitsbezogene Fahrten auf
- Speichere Unterlagen über nicht erstattete Arbeitsausgaben

Wir identifizieren Absetzungen, die du beim Selbsteinreichen vielleicht übersiehst. Das Ergebnis ist meistens eine bedeutend größere Rückzahlung.
 `,
  },

  'how-long-does-tax-refund-take-australia': {
    title: 'Wie lange dauert eine Steuerrückzahlung in Australien?',
    description: 'Die meisten Steuerrückzahlungen in Australien werden innerhalb von zwei Wochen nach Einreichung bearbeitet. Hier ist, was den Zeitplan beeinflusst.',
    body: `
Die meisten australischen Steuerrückzahlungen werden innerhalb von zwei Wochen nach Einreichung bearbeitet und ausgezahlt, wenn die Steuererklärung elektronisch eingereicht wird. Über unseren Service als deinen registrierten Steueragenten reichen wir elektronisch ein, sodass Rückzahlungen typischerweise innerhalb von 7-14 Werktagen ankommen. Rückzahlungen in der Hauptsaison (August-September) dauern eventuell ein paar Tage länger. Wenn deine Rückzahlung länger dauert als erwartet, fasst unser Team direkt beim ATO nach.

## Was ist der typische Rückzahlungszeitplan?

Wenn wir deine Steuererklärung einreichen:

- Tag 0: Steuererklärung elektronisch eingereicht
- Tag 1-3: ATO erhält sie und beginnt mit der Bearbeitung
- Tag 7-14: Die meisten Rückzahlungen werden auf dein Bankkonto freigegeben
- Tag 14-21: Langsamere Steuererklärungen (Hauptsaison oder komplexe Fälle) freigegeben

In ruhigeren Zeiten (Oktober-Juni) kommen Rückzahlungen oft innerhalb von ein paar Werktagen an. In Hauptzeiten (Juli-September) sind die Bearbeitungszeiten etwas länger, weil das ATO die größte Menge an Steuererklärungen bearbeitet.

## Was beeinflusst, wie schnell du deine Rückzahlung bekommst?

Die Hauptfaktoren:

- **Einreichungsmethode**: elektronisch über einen Steueragenten ist am schnellsten (Papier-Steuererklärungen dauern 8+ Wochen)
- **Zeitpunkt im Jahr**: Anfang Juli oder nach Mitte September einreichen ist die schnellste Bearbeitung
- **Income Statement-Abschluss**: vor abgeschlossenen Arbeitgeber-Meldungen einzureichen verlangsamt die Bearbeitung
- **Identitätsprüfung**: Erstmalige Einreicher haben eventuell zusätzliche Prüfungen
- **Diskrepanzen**: wenn deine Steuererklärung nicht mit ATO-Aufzeichnungen übereinstimmt, kommt eine manuelle Prüfung hinzu
- **Bankverbindung**: falsche BSB-/Kontonummern verursachen erhebliche Verzögerungen

Wir warten immer, bis Arbeitgeber-Meldungen steuerbereit sind (nach dem 14. Juli), und prüfen die Bankverbindung doppelt vor der Einreichung, um diese Verzögerungen zu vermeiden.

## Wie prüfst du deinen Rückzahlungsstatus?

Wenn du über uns einreichst:

- Wir überwachen den ATO-Bearbeitungsstatus
- Wir benachrichtigen dich, wenn die Steuererklärung abgeschlossen ist
- Wir bestätigen, wenn die Rückzahlung freigegeben wird
- Wir fassen beim ATO nach, falls sich etwas verzögert

Du musst nicht selbst das ATO-Portal prüfen. Wir halten dich im Prozess auf dem Laufenden.

## Was, wenn deine Rückzahlung länger dauert als erwartet?

Wenn 28 Tage ohne Zahlung vergangen sind, kontaktiere unser Team:

- Wir prüfen den Status direkt über unser Steueragenten-Portal
- Wir identifizieren, wo die Steuererklärung feststeckt
- Wir lösen jedes Problem mit dem ATO für dich
- Wir bestätigen, wann die Zahlung freigegeben wird

Häufige Gründe für Verzögerungen, die wir lösen können:

- Bankverbindungen, die aktualisiert werden müssen
- Identitätsprüfungs-Anfragen
- Diskrepanzen, die geklärt werden müssen
- Manuelle Prüfung größerer Rückzahlungen

[Kontaktiere uns](/de/contact), wenn deine Rückzahlung sich verzögert, und wir untersuchen das.

## Was ist mit Rückzahlungen nach dem Verlassen Australiens?

Wenn du Australien verlassen und aus dem Ausland eingereicht hast:

- Die Rückzahlung wird auf dein angegebenes australisches Bankkonto überwiesen
- Derselbe Zeitplan gilt (die meisten innerhalb von 2 Wochen)
- Wenn dein australisches Konto jetzt geschlossen ist, können wir alternative Zahlung arrangieren

Halte dein australisches Bankkonto mindestens 4-6 Wochen nach der Einreichung offen, um sicherzustellen, dass die Rückzahlung gutgeschrieben wird, bevor du es schließt.
 `,
  },

  'transferring-money-overseas-australia-tax': {
    title: 'Zahlst du Steuern, wenn du Geld aus Australien überweist?',
    description: 'Du schickst deine Ersparnisse nach Hause, bevor du Australien verlässt? Hier ist, was Working Holiday Maker über internationale Überweisungen wissen müssen.',
    body: `
Nein, Geld aus Australien zu überweisen erzeugt an sich keine Steuerpflicht. Die Übertragung von Mitteln von deinem australischen Bankkonto auf ein Konto in deinem Heimatland ist eine Geldbewegung, kein Einkommen. Das ATO besteuert dich nicht dafür, Geld zu bewegen. Was steuerlich zählt, ist das Einkommen, das du in Australien verdient hast - und das ist im Jahr des Erhalts steuerpflichtig, unabhängig davon, wo du es letztendlich ausgibst. Erledige deine Steuerangelegenheiten und die Super-Auszahlung, bevor du alles nach Hause überweist und dein australisches Konto schließt.

## Ist eine Überweisung ins Ausland steuerpflichtig?

Nein. Die Überweisung selbst ist kein steuerlicher Vorgang:

- Australische Dollar in dein Heimatland schicken = kein Einkommen
- AUD in deine Heimatwährung umwandeln = kein Einkommen
- Ersparnisse überweisen = kein Einkommen
- Das ATO besteuert keine Geldbewegung

Was das ATO besteuert, ist das **Einkommen, das du verdient hast** in Australien. Dieses Einkommen ist steuerpflichtig, wenn du es bekommst, nicht wenn du es überweist.

## Was interessiert das ATO tatsächlich?

Das australische Steuersystem interessiert sich für:

- Deinen in Australien verdienten Lohn (mit 15 % für Working Holiday Maker besteuert)
- Eventuelles Contractor-Einkommen unter einer [ABN](/de/abn)
- Investmenteinkommen aus australischen Vermögenswerten
- Trinkgelder und anderes Anstellungseinkommen
- Schwarzarbeit (ja, trotzdem steuerpflichtig)

Wenn wir deine [Steuererklärung](/de/tax-return) einreichen, geben wir dein Einkommen an und berechnen die fällige Steuer gegen das, was einbehalten wurde. Das Ergebnis ist entweder eine Rückzahlung oder eine Steuerrechnung. Sobald das geklärt ist, ist es deine Sache, was du mit dem Nettobetrag machst (in Australien ausgeben, nach Hause überweisen, auf deinem Konto halten).

## Musst du große internationale Überweisungen melden?

Es gelten zwei separate Regeln:

**Für Bargeld über 10.000 $ AUD:**
- Muss am Flughafen bei der Australian Border Force angemeldet werden
- Anti-Geldwäsche-Anforderung, keine Steueranforderung
- Keine Steuerpflicht durch die Anmeldung ausgelöst

**Für elektronische Überweisungen:**
- Banken melden große internationale Überweisungen (typischerweise über 10.000 $) automatisch an AUSTRAC
- Du musst nichts tun
- Kein steuerlicher Vorgang

Keines davon erzeugt neue Steuer. Es sind Meldepflichten für Finanzaufsicht.

## Was ist mit Einkommensteuer, die in Australien schon gezahlt wurde?

Wenn dein Arbeitgeber im Laufe des Jahres PAYG-Steuer einbehalten hat, wurde diese Steuer schon ans ATO gezahlt:

- Deine Bruttolöhne wurden mit 15 % besteuert (vorausgesetzt TFN hinterlegt, korrekte Einstellung)
- Der Nettobetrag ging auf dein Bankkonto
- Dieser Nettobetrag ist das, was du nach Hause überweist
- Keine zweite Schicht australischer Steuer gilt

Wenn im Laufe des Jahres zu viel Steuer einbehalten wurde (üblich für Working Holiday Maker), holst du den Überschuss mit deiner [Steuererklärung](/de/tax-return) zurück. Die Rückzahlung wird auf dein australisches Bankkonto überwiesen und kann dann nach Hause überwiesen werden.

## Schuldest du Steuern in deinem Heimatland?

Das hängt von den Steuergesetzen deines Heimatlandes ab:

- Viele Länder haben Doppelbesteuerungsabkommen mit Australien
- Diese lassen dich normalerweise gezahlte australische Steuer gegen eine eventuelle Heimatlandschuld verrechnen
- In Australien verdientes Einkommen ist typischerweise in deinem Heimatland zu melden
- Die spezifische Behandlung variiert nach Land

Ein Steuerberater in deinem Heimatland ist der richtige Ansprechpartner für Heimatlandpflichten. Viele Heimatländer behandeln australische Working Holiday-Einkünfte anders als reguläres Auslandseinkommen.

## Was ist die richtige Reihenfolge vor dem Verlassen Australiens?

Die zu befolgende Reihenfolge:

1. Reiche deine australische [Steuererklärung](/de/tax-return) ein (unser Team kümmert sich darum)
2. Beantrage deine [Super-Auszahlung](/de/blog/what-is-dasp-super-withdrawal) über DASP
3. Kündige eine eventuelle [ABN](/de/abn), die du registriert hast
4. Warte, bis deine Steuerrückzahlung und Super-Zahlung auf deinem australischen Konto ankommen
5. Überweise alles nach Hause
6. Schließe dein australisches Bankkonto

Diese Schritte zu überspringen oder umzuordnen verursacht Komplikationen. Das Bankkonto zu früh zu schließen ist der häufigste Fehler - deine Steuerrückzahlung und Super-Zahlung haben dann nirgendwo hin.

## Was ist mit Geld, das du nach Australien gebracht hast?

Geld, das du bei deiner Ankunft mitgebracht hast, ist nicht steuerpflichtig:

- Vorhandene Ersparnisse aus deinem Heimatland gehören dir
- Sie einzuführen ist kein Einkommen
- Manche davon wieder rauszuüberweisen ist kein steuerlicher Vorgang

Was steuerpflichtig ist, ist alles, was du während deines Aufenthalts in Australien verdient hast. Die Unterscheidung ist zwischen dem, was du hier verdient hast (steuerpflichtig), und dem, was du mitgebracht oder als Ersparnisse hältst (nicht steuerpflichtig).

[Kontaktiere unser Team](/de/contact), um deine australische Steuererklärung über unseren registrierten Steueragenten-Service einzureichen und sicherzustellen, dass jede Rückzahlung, die dir zusteht, beantragt wird.
 `,
  },

  'low-income-tax-offset-working-holiday': {
    title: 'Was ist der Low Income Tax Offset und können Working Holiday Maker ihn beantragen?',
    description: 'Der Low Income Tax Offset kann deine Steuer um bis zu 700 $ pro Jahr reduzieren. Hier ist, wer qualifiziert, wie es berechnet wird und wie du es beantragst.',
    body: `
Der Low Income Tax Offset (LITO) ist eine Steuerermäßigung für Einzelpersonen mit zu versteuerndem Einkommen unter festgelegten Schwellen. Das Maximum beträgt 700 $ für zu versteuerndes Einkommen bis 37.500 $, und reduziert sich schrittweise für Einkommen zwischen 37.500 $ und 66.667 $. Ob Working Holiday Maker LITO beantragen können, hängt von spezifischem Einkommen und Umständen ab. Unser Team prüft jeden anwendbaren Offset, wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten - berechtigter LITO wird also automatisch angewendet.

## Was ist der Low Income Tax Offset?

LITO ist eine im australischen Steuerrecht verankerte Steuerermäßigung:

- Reduziert die in einer Steuererklärung zahlbare Steuer (nicht dein zu versteuerndes Einkommen)
- Maximaler Vorteil: 700 $ pro Jahr
- Maximum gilt für zu versteuerndes Einkommen bis 37.500 $
- Reduziert sich schrittweise für Einkommen von 37.501 $ bis 66.667 $
- Läuft bei 66.667 $ und darüber komplett aus
- Nicht erstattungsfähig (reduziert Steuer auf null, keine weitere Erstattung)

Der Offset wird auf normalen Resident-Steuererklärungen automatisch angewendet. Für Working Holiday Maker ist die Situation nuancierter.

## Wie viel LITO ist bei verschiedenen Einkommensniveaus verfügbar?

Für das Steuerjahr 2025-26:

- Einkommen bis 37.500 $: voller 700 $-Offset
- Einkommen 37.501 - 45.000 $: schrittweise reduzierend
- Einkommen 45.001 - 66.667 $: weitere Reduzierung
- Einkommen über 66.667 $: kein LITO

Die genaue Berechnung der Reduzierung beinhaltet komplexe Schwellen. Wenn wir deine Steuererklärung vorbereiten, wenden wir den korrekten Betrag basierend auf deiner spezifischen Situation an.

## Können Working Holiday Maker LITO beantragen?

Die Situation hängt ab von:

- Deinem spezifischen Einkommensniveau
- Deinem Residenzstatus für das Steuerjahr
- Wie die Working Holiday Maker-Regeln mit dem Offset interagieren
- Ob du Nicht-WHM-Einkommen hattest

Das ist einer der komplexeren Aspekte der Working Holiday Maker-Steuer. Manche Working Holiday Maker können teilweise LITO beantragen, manche nicht. Die Regeln haben sich mehrfach geändert und entwickeln sich weiter.

Wenn wir deine Steuererklärung vorbereiten, prüfen wir die LITO-Berechtigung basierend auf deinen spezifischen Umständen und wenden alles an, worauf du Anspruch hast. Einreichen ohne Steueragenten führt oft dazu, dass berechtigte Offsets übersehen werden.

## Was ist der Unterschied zwischen einem Offset und einer Absetzung?

Diese Unterscheidung ist wichtig und wird oft verwechselt:

**Absetzung**: reduziert dein zu versteuerndes Einkommen
- 30.000 $ verdienen, 1.000 $ Absetzung beantragen → besteuert, als hättest du 29.000 $ verdient
- Reduziert Steuer um deinen Grenzsteuersatz × Absetzung (z.B. 150 $ bei 15 % gespart)

**Offset**: reduziert die geschuldete Steuer
- 4.500 $ Steuer geschuldet, 700 $ Offset → zahle 3.800 $
- Reduziert Steuer Dollar für Dollar (die vollen 700 $)

Offsets sind generell wertvoller als Absetzungen desselben Dollar-Betrags. Ein 700 $-LITO reduziert deine Steuer um 700 $, während eine 700 $-Absetzung nur 105 $ spart (zum 15 %-Satz).

## Kann LITO mit anderen Offsets kombiniert werden?

Ja. Mehrere Offsets können auf eine Steuererklärung angewendet werden:

- LITO: basierend auf Gesamteinkommen
- [Small Business Tax Offset](/de/blog/small-business-tax-offset-working-holiday-abn): für ABN-Einkommen
- Medicare Levy-Befreiung: für Nicht-Medicare-berechtigte Arbeiter

Jeder wird separat berechnet und angewendet, um die zahlbare Gesamtsteuer zu reduzieren. Wir wenden jeden relevanten Offset beim Vorbereiten deiner Steuererklärung an.

## Was passiert, wenn LITO deine Steuer unter null reduzieren würde?

LITO ist nicht erstattungsfähig:

- Wenn deine geschuldete Steuer 500 $ und LITO 700 $ ist, wird deine Steuer 0 $
- Die verbleibenden 200 $ LITO werden NICHT an dich erstattet
- Deine Gesamt-Rückzahlung kommt aus der PAYG-Steuer, die während des Jahres einbehalten wurde

Die Rückzahlung, die du bekommst, wird berechnet als: gesamte einbehaltene Steuer minus deine endgültige Steuerschuld (nach Offsets). LITO kann helfen, die endgültige Schuld zu reduzieren und so deine Rückzahlung zu erhöhen.

## Wie wenden wir LITO an, wenn wir deine Steuererklärung einreichen?

Unser Prozess:

1. Wir berechnen dein zu versteuerndes Gesamteinkommen (Lohn + ABN-Einkommen + andere)
2. Wir prüfen deine LITO-Berechtigung nach aktuellen Regeln
3. Wir berechnen den anwendbaren LITO-Betrag
4. Wir wenden ihn neben anderen berechtigten Offsets an
5. Wir zeigen dir die Auswirkung auf deine Rückzahlung vor der Einreichung

[Kontaktiere unser Team](/de/contact), wenn du wissen willst, ob du vor der Einreichung für LITO qualifizierst. Wir machen diese Berechnung jede Woche für Working Holiday Maker.
 `,
  },

  // Super
  'how-much-super-should-employer-pay': {
    title: 'Wie viel Super sollte dein Arbeitgeber für dich einzahlen?',
    description: 'Australische Arbeitgeber müssen 12 % deiner Bruttoeinkünfte als Super einzahlen. Hier ist, wie du prüfst, ob du den korrekten Betrag bekommst.',
    body: `
Dein Arbeitgeber sollte ab 2026 12 % deiner regulären Arbeitseinkünfte (Ordinary Time Earnings) in deinen Super-Fonds einzahlen. Der Satz stieg am 1. Juli 2025 von 11,5 % auf 12 % und ist bei 12 % geblieben. Super wird zusätzlich zu deinem Lohn gezahlt, nicht davon abgezogen. Der einfachste Weg, zu prüfen, ob deine Super korrekt gezahlt wird, ist, dein Super-Fonds-Konto direkt zu prüfen. Wenn Beiträge fehlen oder falsch sind, kann unser Team helfen, unbezahlte Super für dich zurückzuholen.

## Was zählt als Ordinary Time Earnings?

Ordinary Time Earnings (OTE) bilden die Basis für Super-Beiträge:

- Regulärer Lohn für reguläre Arbeitsstunden
- Manche Zulagen (je nach Art)
- Provisionen, Boni und Loadings (in den meisten Fällen)
- Urlaubsgeld (in den meisten Fällen)

**Nicht** in OTE enthalten:

- Überstundenzahlungen
- Erstattungen von Ausgaben
- Echte Abfindungszahlungen

Für die meisten Working Holiday Maker, die Standard-Schichten arbeiten, gilt die 12 % auf den Kern dessen, was du in jeder Lohnperiode verdienst.

## Wie kannst du prüfen, ob deine Super gezahlt wird?

Es gibt zwei zuverlässige Wege:

1. **Prüfe deinen Super-Fonds direkt**: Logge dich in dein Fonds-Konto online ein und schau dir die Beitragshistorie an. Jeder Arbeitgeber-Beitrag sollte mit Datum und Betrag erscheinen.
2. **Gleiche mit deinem Lohnzettel ab**: dein Lohnzettel zeigt den Super-Beitrag als Posten. Vergleiche ihn mit dem, was in deinem Fonds angekommen ist.

Super wird von den meisten Arbeitgebern vierteljährlich gezahlt, nicht wöchentlich mit deinem Lohn. Die Fristen:

- Q1 (Jul-Sep) → bis 28. Oktober gezahlt
- Q2 (Okt-Dez) → bis 28. Januar gezahlt
- Q3 (Jan-Mär) → bis 28. April gezahlt
- Q4 (Apr-Jun) → bis 28. Juli gezahlt

Ein Beitrag für Juli erscheint also eventuell erst Ende Oktober in deinem Fonds.

Wenn du nicht weißt, welcher Fonds deine Super hält, [kontaktiere unser Team](/de/contact). Wir finden Konten über mehrere Fonds und können bestätigen, was für dich gezahlt wurde.

## Was, wenn dein Arbeitgeber Super nicht korrekt zahlt?

Wenn Beiträge fehlen, zu spät kommen oder unter dem erforderlichen Satz liegen, muss das Problem vor deiner Abreise aus Australien geklärt werden:

- Erst, [prüfe die Beiträge in deinem Fonds](#wie-kannst-du-prüfen-ob-deine-super-gezahlt-wird)
- Vergleiche mit der Super-Zeile auf deinen Lohnzetteln
- Sprich mit deinem Arbeitgeber, falls es eine klare Diskrepanz gibt (es kann ein Verwaltungsfehler sein)
- Bei ungeklärten Fällen kann unser Team die unbezahlte Super über den Superannuation Guarantee Charge (SGC)-Prozess verfolgen

Die SGC ist ein formaler Erstattungsmechanismus. Wir haben Working Holiday Makern geholfen, auf diese Weise Tausende Dollar an unbezahlter Super zurückzubekommen. [Schick uns deine Daten](/de/contact) mit deinen Lohnzetteln und Super-Statements und wir prüfen es.

## Welche Unterlagen solltest du aufbewahren?

Um einen Super-Rückforderungsanspruch zu unterstützen:

- Alle Lohnzettel, die Super-Posten zeigen
- Die Beitragsaufzeichnungen deines Super-Fonds
- Beschäftigungsdaten und Wochenstunden
- Lohnsätze und Bruttoverdienste
- Arbeitgebername und ABN

Je vollständiger die Unterlagen, desto einfacher der Erstattungsprozess.
 `,
  },

  'what-is-dasp-super-withdrawal': {
    title: 'Was ist DASP und wie funktioniert der Super-Auszahlungsprozess?',
    description: 'DASP steht für Departing Australia Superannuation Payment. Das ist der offizielle Prozess, um deine Super zurückzubekommen, nachdem du Australien verlassen hast.',
    body: `
DASP (Departing Australia Superannuation Payment) ist der offizielle Prozess, den Working Holiday Maker und andere temporäre Visa-Inhaber nutzen, um ihre angesparte australische Super nach dem Verlassen des Landes abzuheben. Um zu beantragen, muss dein Visum abgelaufen oder gekündigt sein, und du musst außerhalb Australiens sein. Der DASP-Quellensteuersatz für Working Holiday Maker beträgt 65 % der steuerpflichtigen Komponente. Unser Team kümmert sich um DASP-Anträge von Anfang bis Ende - vom Finden deiner Super-Konten bis zum Erhalt der Zahlung.

## Wer kann DASP beantragen?

Um für DASP berechtigt zu sein, musst du:

- Ein temporäres australisches Visum gehalten haben (Working Holiday Visa Subclass 417 und 462 sind berechtigt)
- Australien permanent verlassen haben (oder zumindest ohne unmittelbaren Plan, mit demselben Visum zurückzukehren)
- Dein Visum nach der Abreise abgelaufen oder gekündigt haben
- Super in einem australischen Super-Fonds haben oder beim ATO

Du kannst generell nicht beantragen, solange du noch in Australien mit gültigem Working Holiday Visum bist. Der Antrag muss gestellt werden, nachdem du abgereist bist und dein Visum geendet hat.

## Wie beantragst du DASP?

Unser Team kümmert sich um den gesamten DASP-Antrag für dich:

1. [Schick uns deine Daten](/de/superannuation): TFN, Reisepass, Visa-Daten, Beschäftigungshistorie
2. Wir finden alle deine Super-Konten (über mehrere Fonds hinweg, falls nötig)
3. Wir bereiten den DASP-Antrag vor und reichen ihn für dich ein
4. Der Super-Fonds verifiziert deine Daten und gibt die Zahlung frei
5. Die Mittel werden auf dein angegebenes Bankkonto überwiesen (überall auf der Welt)

Falls deine Super in mehreren Fonds war, reichen wir separate DASP-Anträge für jeden ein. Alternativ können wir deine Super vor dem Antrag in einem Fonds zusammenführen, um den Prozess zu vereinfachen.

## Wie lange dauert die Bearbeitung von DASP?

Die meisten DASP-Anträge werden innerhalb von 28 Tagen bearbeitet:

- Manche Anträge gehen schneller durch, manchmal innerhalb von zwei Wochen
- Komplexe Fälle (mehrere Fonds, Identitätsprüfungsprobleme) können länger dauern
- Der Fonds verifiziert deine Daten, das ATO bestätigt deinen Visa-Status, dann wird die Zahlung freigegeben

Wenn 28 Tage ohne Zahlung vergehen, fasst unser Team den Antrag direkt nach. Du musst nicht selbst beim Fonds oder ATO nachfassen.

## Wie viel bekommst du aus DASP?

Deine DASP-Auszahlung hängt ab von:

- Den Gesamtbeiträgen deiner Arbeitgeber (12 % deiner Einkünfte während deines Aufenthalts)
- Den Anlagerenditen, die der Fonds auf diese Beiträge erwirtschaftet hat
- Der 65 %-DASP-Quellensteuer für Working Holiday Maker (auf die steuerpflichtige Komponente)

Der 65 %-Steuersatz ist hoch, aber die Alternative ist, die Super für immer zurückzulassen. Der Nettobetrag, auch nach Steuern, ist meistens immer noch eine bedeutende Summe (oft mehrere Tausend Dollar, je nachdem, wie lange du gearbeitet hast).

Siehe unseren Artikel zu [welche Steuer von deiner DASP abgezogen wird](/de/blog/tax-on-super-withdrawal-backpacker) für eine detaillierte Aufschlüsselung der Steuerberechnung.

[Kontaktiere unser Team](/de/contact), um deinen DASP-Antrag zu bearbeiten, jeden Super-Fonds mit deinen Beiträgen zu finden und deine Auszahlung im Ausland zu erhalten.
 `,
  },

  'how-long-does-dasp-take': {
    title: 'Wie lange dauert die Bearbeitung eines DASP-Antrags?',
    description: 'Die meisten DASP-Anträge werden innerhalb von 28 Tagen bearbeitet. Hier ist, was du in jedem Schritt erwarten kannst und wie du den Status verfolgst.',
    body: `
Ein DASP (Departing Australia Superannuation Payment)-Antrag wird normalerweise innerhalb von 28 Tagen nach Einreichung bearbeitet. In vielen Fällen geht der Prozess schneller, besonders wenn deine Daten klar sind und der Super-Fonds alle Informationen hat, um deine Identität und Mitgliedschaft zu verifizieren. Unser Team überwacht jeden DASP-Antrag, den wir einreichen, und fasst Verzögerungen direkt beim Fonds nach.

## Was passiert, nachdem du einen DASP-Antrag eingereicht hast?

Der Prozess nach der Einreichung:

1. Das ATO verifiziert deine Visa- und Aufenthaltsinformationen
2. Der Antrag wird an deinen Super-Fonds weitergeleitet
3. Der Fonds verifiziert deine Mitgliedschaftsdaten und Identität
4. Der Fonds berechnet den auszahlbaren Betrag und zieht die 65 %-DASP-Steuer ab
5. Die Nettozahlung wird auf dein angegebenes Bankkonto freigegeben

Jede Phase dauert meistens ein paar Werktage. Die Gesamtdauer hängt davon ab, wie schnell der Fonds seine Seite bearbeitet.

## Was kann DASP-Verzögerungen verursachen?

Die häufigsten Verzögerungsursachen:

- **Namensabweichung**: der Name auf deinem Antrag stimmt nicht genau mit dem überein, den dein Super-Fonds gespeichert hat
- **Geburtsdatum-Abweichung**: ein Tippfehler oder Format-Unterschied
- **Adress-Diskrepanzen**: Adressen unterschiedlich über Systeme hinweg gespeichert
- **Antrag vor Visa-Ablauf**: DASP-Anträge mit noch gültigem Working Holiday Visum werden meistens abgelehnt
- **Mehrere Mitgliedsnummern in einem Fonds**: selten, passiert aber bei sehr großen Fonds

Wenn du über unseren Service einreichst, gleichen wir jedes Detail mit den Fonds-Daten vor der Einreichung ab - so vermeidest du die meisten dieser Probleme von Anfang an.

## Was, wenn 28 Tage ohne Zahlung vergehen?

Wenn dein DASP-Antrag länger dauert als erwartet:

- Unser Team prüft den Status direkt beim Fonds und beim ATO
- Wir identifizieren, in welcher Phase der Antrag feststeckt
- Wir fassen für dich nach und lösen Verifizierungsprobleme
- Du musst nicht selbst den Fonds oder das ATO kontaktieren

[Kontaktiere uns](/de/contact) jederzeit, wenn du ein Status-Update zu deinem Antrag möchtest.

## Was, wenn du für mehrere Fonds beantragt hast?

Wenn du Super in mehreren Fonds hattest und wir separate DASP-Anträge für jeden eingereicht haben:

- Jeder Antrag hat seinen eigenen unabhängigen Zeitplan
- Ein Fonds zahlt eventuell schneller aus als ein anderer
- Wir verfolgen die Referenznummer jedes Antrags für dich
- Wir benachrichtigen dich, sobald jede Zahlung freigegeben wird

Die Gesamtzeit von der ersten Einreichung bis zur letzten Zahlung beträgt meistens vier bis sechs Wochen, gelegentlich länger, wenn ein Fonds langsam beim Verifizieren ist.

## Was ist mit internationalen Zahlungsverzögerungen?

Nachdem der Fonds die Zahlung freigegeben hat, kann der internationale Transfer je nach Land und Bank zusätzliche Zeit brauchen:

- Australische Bankkonten: Zahlung erscheint meistens innerhalb von 1-2 Werktagen
- Große ausländische Banken (UK, US, EU): 2-5 Werktage
- Kleinere oder Regionalbanken: bis zu 10 Werktage

Die Währungsumrechnung des Kontos kann ebenfalls die Dauer beeinflussen. Wenn du die Mittel in einer bestimmten Währung erhalten möchtest, sag uns Bescheid, wenn wir den Antrag einrichten.
 `,
  },

  // Medicare
  'countries-with-medicare-agreement-australia': {
    title: 'Welche Länder haben ein Medicare-Abkommen mit Australien?',
    description: '11 Länder haben ein Sozialversicherungsabkommen (RHCA) mit Australien. Hier ist die komplette Liste und was die Abkommen abdecken. Deutschland ist nicht dabei.',
    body: `
Australien hat Sozialversicherungsabkommen (Reciprocal Health Care Agreements, RHCAs) mit 11 Ländern: Großbritannien, Republik Irland, Neuseeland, Schweden, Niederlande, Finnland, Norwegen, Belgien, Slowenien, Malta und Italien. Bürger dieser Länder mit gültigem Working Holiday Visum haben eventuell Anspruch auf begrenzte Medicare-Leistungen während ihres Aufenthalts. **Deutschland ist NICHT auf der Liste.** Bürger aller anderen Länder - auch Deutsche - sind nicht für Medicare berechtigt und müssen sich auf eine private Krankenversicherung verlassen.

## Welche Länder haben ein RHCA mit Australien?

Die 11 Länder mit einem Sozialversicherungsabkommen:

- Großbritannien
- Republik Irland
- Neuseeland
- Schweden
- Niederlande
- Finnland
- Norwegen
- Belgien
- Slowenien
- Malta
- Italien

Wenn dein Land nicht auf dieser Liste steht (zum Beispiel Deutschland, Frankreich, Spanien, Kanada, USA, Japan, Südkorea, Taiwan, Hongkong), bist du nicht für Medicare unter einem RHCA berechtigt.

## Was decken die RHCA-Abkommen ab?

Die Abdeckung unter einem RHCA ist begrenzt:

- Medizinisch notwendige Behandlung (Zustände, die während deines Aufenthalts auftreten und nicht bis zur Rückkehr warten können)
- Hausarztbesuche zum Medicare-bezuschussten Satz
- Manche öffentliche Krankenhausbehandlungen
- Manche verschreibungspflichtigen Medikamente zum PBS-bezuschussten Satz

Was **nicht** abgedeckt ist:

- Vorerkrankungen in den meisten Fällen
- Zahnbehandlungen
- Optometrie und Brillen
- Die meisten Facharztbesuche
- Private Krankenhausbehandlungen
- Krankenwagen-Dienste in den meisten Bundesstaaten
- Kosmetische oder Wahleingriffe

Die spezifischen Ansprüche variieren zwischen den Abkommen. Sogar mit RHCA ist eine umfassende private Krankenversicherung meistens eine gute Idee.

## Wie meldest du dich bei Medicare unter einem RHCA an?

Wenn dein Land ein RHCA mit Australien hat, erfolgt die Anmeldung persönlich in einem Services Australia-Büro (früher als Centrelink/Medicare-Büro bekannt). Du brauchst:

- Deinen Reisepass
- Dein Working Holiday Visum (elektronische Bestätigung oder Grant Letter)
- Nachweis der Staatsbürgerschaft im RHCA-Land (falls nicht identisch mit deinem Reisepass-Land)

Du bekommst eine Medicare-Karte, mit der du Zugang zu den abgedeckten Leistungen hast. Die Karte ist für die Dauer deines berechtigenden Visums gültig.

## Was bedeutet ein RHCA für die Medicare Levy?

Wenn du bei Medicare unter einem RHCA angemeldet bist, wird die Medicare Levy-Behandlung komplexer:

- Du hast eventuell keinen Anspruch auf die volle 2 %-Befreiung
- Eine teilweise Befreiung kann gelten, abhängig vom Anmeldestatus und der Zeit in Australien
- Die Regeln sind nuanciert und hängen von deinen spezifischen Umständen ab

Wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten, finden wir die korrekte Medicare Levy-Position für deine spezifische Situation. Manche RHCA-Angemeldeten bekommen volle Befreiung, manche teilweise, manche gar keine. Die richtige Antwort hängt von Faktoren wie den Daten deiner Medicare-Anmeldung und den Abkommensbedingungen ab.

**Für Deutsche ist die Antwort einfach:** Da Deutschland kein RHCA hat, hast du automatisch Anspruch auf die volle Medicare Levy-Befreiung.

[Kontaktiere unser Team](/de/contact) vor dem Einreichen, falls du unsicher über deinen Medicare Levy-Anspruch bist.
 `,
  },

  'tax-file-number-declaration-form': {
    title: 'Was ist ein Tax File Number Declaration-Formular und wie füllst du es aus?',
    description: 'Das TFN Declaration-Formular ist eines der wichtigsten Dokumente, die du in Australien ausfüllst. Hier ist, was die einzelnen Abschnitte bedeuten.',
  },

  'what-does-tax-withheld-mean-payslip': {
    title: 'Was bedeutet "tax withheld" auf deinem Lohnzettel in Australien?',
    description: '"Tax withheld" zeigt, wie viel Steuer dein Arbeitgeber von deinem Lohn einbehalten hat. Hier ist, wie du den Betrag verstehst und prüfst, ob er korrekt ist.',
  },

  // Work Rights
  'how-many-hours-can-you-work-on-whv': {
    title: 'Wie viele Stunden pro Woche darfst du mit einem Working Holiday Visum arbeiten?',
    description: 'Es gibt keine wöchentliche Stundenbegrenzung für Working Holiday Visa, aber es gibt eine 6-Monats-Begrenzung pro Arbeitgeber. Hier sind die aktuellen Regeln.',
    body: `
Es gibt keine Begrenzung, wie viele Stunden pro Woche ein Working Holiday Visum-Inhaber in Australien arbeiten darf. Du kannst Vollzeit, Teilzeit oder Casual arbeiten. Allerdings begrenzt Visa-Bedingung 8547 dich auf maximal 6 Monate bei einem einzigen Arbeitgeber - außer du arbeitest in einem ausgenommenen Sektor (Landwirtschaft, Pflanzen-/Tierzucht, Tourismus/Gastronomie, Gesundheit, Alten-/Behindertenpflege, Kinderbetreuung, Nahrungsmittelverarbeitung oder Katastrophenhilfe überall in Australien, oder in einigen nördlichen Regionen für andere Branchen). Außerhalb dieser Ausnahmen musst du nach 6 Monaten den Arbeitgeber wechseln oder eine schriftliche Erlaubnis vom Department of Home Affairs anfordern.

## Wie viele Stunden darfst du jede Woche arbeiten?

Unter den Visa-Regeln gibt es kein wöchentliches Maximum:

- Vollzeitarbeit (typischerweise 38 Stunden pro Woche) ist erlaubt
- Überstunden sind erlaubt
- Mehrere Jobs sind erlaubt
- Keine wöchentliche Stundenbegrenzung vom Department of Home Affairs

Die einzigen praktischen Grenzen kommen aus:

- Fair Work-Regeln zu Ruhepausen und angemessenen Zusatzstunden
- Deinem Award oder Tarifvertrag (der reguläre Stunden begrenzen kann)
- Deiner eigenen körperlichen und geistigen Belastbarkeit

## Was ist die 6-Monats-Arbeitgeber-Begrenzung (Bedingung 8547)?

Visa-Bedingung 8547 gilt für alle Working Holiday Visum-Inhaber:

- Du kannst für maximal **6 Monate** beim selben Arbeitgeber arbeiten
- Die 6 Monate werden in **Kalendermonaten** ab deinem Startdatum gezählt (nicht nach gearbeiteten Stunden)
- Die Bedingung ist verpflichtend, außer eine Ausnahme gilt
- Die Bedingung wird zurückgesetzt, wenn ein neues Working Holiday Visum gewährt wird

Ein Verstoß gegen Bedingung 8547 kann zur Visa-Kündigung führen. Die Bedingung ist seit vielen Jahren Teil der Working Holiday Visum-Bedingungen.

## Welche Sektoren sind von der 6-Monats-Begrenzung ausgenommen?

Du kannst ohne Erlaubnis länger als 6 Monate beim selben Arbeitgeber arbeiten, wenn die Arbeit in folgenden Bereichen ist:

- **Pflanzen- und Tierzucht** (Landwirtschaft, Gartenbau)
- **Fischen und Perlenzucht**
- **Baumzucht und -fällung**
- **Bergbau**
- **Bauwesen**
- **Tourismus und Gastronomie** (an jedem Ort)
- **Gesundheit, Altenpflege und Behindertenpflege**
- **Kinderbetreuung**
- **Nahrungsmittelverarbeitung**
- **Katastrophenhilfe**
- **Verschiedene Standorte desselben Arbeitgebers** (kein einzelner Standort über 6 Monate)

Diese Ausnahmen decken die meisten Branchen ab, in denen Working Holiday Maker üblicherweise arbeiten.

## Wie arbeitest du länger als 6 Monate in einem nicht ausgenommenen Sektor?

Wenn deine Rolle nicht unter eine Ausnahme fällt, kannst du eine schriftliche Erlaubnis vom Department of Home Affairs anfordern:

1. Reiche eine schriftliche Anfrage vor Ablauf der 6 Monate ein
2. Lege betriebliche Notwendigkeit oder andere zwingende Gründe dar
3. Arbeite weiter, während die Anfrage geprüft wird
4. Erhalte eine schriftliche Entscheidung

Die Erlaubnis wird nach Ermessen des Departments gewährt und ist nicht garantiert.

## Welche anderen Visa-Anforderungen gelten?

Du musst weiterhin andere Visa-Bedingungen erfüllen:

- Gültiges Working Holiday Visum halten (Subclass 417 oder 462)
- Dein Hauptzweck in Australien muss weiterhin Urlaub sein (Arbeit ist sekundär)
- Alle Steuerpflichten gelten (gib deine [TFN](/de/tfn), reiche deine [Steuererklärung](/de/tax-return) ein)
- Super-Ansprüche gelten weiterhin für alle bezahlte Arbeit

## Wie passt die 88-Tage-Regel hinein?

Die 88-Tage-Anforderung für spezifische Arbeit für ein zweites Working Holiday Visum ist separat von Bedingung 8547:

- 88 Tage spezifische Arbeit in einer regionalen Gegend während deines ersten Visums
- Spezifische Arbeit umfasst Landwirtschaft, Fischerei, Bergbau, Bauwesen in berechtigten Gebieten, Tourismus/Gastronomie in entlegenen Gebieten und Katastrophenhilfe
- Hier geht es um die Visa-Berechtigung für eine Verlängerung, nicht um die Arbeitgeber-Dauer
- Viele Branchen mit spezifischer Arbeit sind auch von der 6-Monats-Regel ausgenommen

Für ein drittes Working Holiday Visum ist die Anforderung 6 Monate (179 Tage) spezifische Arbeit während des zweiten Visums.

## Was bedeutet das für die Super?

Dein Super-Anspruch basiert auf deinem Einkommen, nicht auf Stunden:

- Verdiene jeden Lohn → Super muss zu 12 % zusätzlich gezahlt werden
- Die vorherige 450 $/Monat-Schwelle wurde 2022 abgeschafft
- Mehr Stunden bedeutet meistens mehr Einkommen, was mehr Super bedeutet
- Siehe [wie viel Super dein Arbeitgeber zahlen sollte](/de/blog/how-much-super-should-employer-pay) für die Berechnung

Wenn du viele Stunden arbeitest und unsicher bist, ob deine Super korrekt gezahlt wird, [schick uns deine Lohnzettel](/de/contact) und wir prüfen es.
 `,
  },

  'penalty-rates-australia': {
    title: 'Was sind Penalty Rates und hast du in Australien Anspruch darauf?',
    description: 'Penalty Rates sind Zuschläge für Arbeit am Wochenende, an Feiertagen oder bei Überstunden. Hier ist, wann du Anspruch hast und wie viel sie betragen.',
  },

  'can-your-employer-pay-you-cash-in-hand': {
    title: 'Darf dein Arbeitgeber dich in Australien schwarz bezahlen?',
    description: 'Schwarzarbeit ist nicht illegal an sich, aber sie ist problematisch. Hier ist, was du wissen musst, wenn du in bar bezahlt wirst.',
  },

  'fair-work-act-working-holiday-makers': {
    title: 'Was ist der Fair Work Act und wie schützt er Working Holiday Maker?',
    description: 'Der Fair Work Act ist das wichtigste Arbeitsgesetz in Australien. Hier sind deine Rechte als Working Holiday Maker.',
  },

  // ─── More TFN posts ────────────────────────────────────────────────────────
  'how-to-update-address-with-ato': {
    title: 'Wie du deine Adresse beim ATO in Australien aktualisierst',
    description: 'Du ziehst um? Aktualisiere deine Adresse beim ATO, damit du keine wichtigen Briefe verpasst. Hier ist, wie es geht.',
    body: `
Wenn du in Australien an eine neue Adresse umziehst, aktualisiere sie so schnell wie möglich beim ATO (australisches Finanzamt). Das ATO schickt deinen TFN-Brief und andere wichtige Post an die hinterlegte Adresse. Über unseren Service aktualisieren wir deine Adresse beim ATO für dich - so verpasst du keine kritischen Briefe oder Rückzahlungsbenachrichtigungen. Wenn du noch auf deinen TFN-Brief wartest und umgezogen bist, ist eine schnelle Aktualisierung der Adresse der Unterschied zwischen dem Erhalt deiner TFN innerhalb von 28 Tagen und viel längerem Warten.

## Warum ist es wichtig, die Adresse aktuell zu halten?

Das ATO nutzt die hinterlegte Adresse für:

- Den ersten TFN-Brief
- Steuerbescheide und Mitteilungen
- Kommunikation über Rückzahlungen oder Steuerschulden
- DASP-bezogene Post
- Bestätigungen der Identitätsprüfung

Wenn du davon etwas verpasst, kann das deine Steuersachen verzögern oder später Komplikationen verursachen. Working Holiday Maker, die viel umziehen, sind besonders gefährdet.

## Wie aktualisierst du deine Adresse beim ATO?

Der einfachste Weg ist über unseren Service:

1. [Kontaktiere unser Team](/de/contact)
2. Gib uns deine neue Adresse
3. Wir aktualisieren sie als dein registrierter Steueragent für dich beim ATO
4. Die Bestätigung kommt zurück zu uns

Du musst dich nicht in ATO-Online-Dienste einloggen oder in der Warteschleife hängen. Wir kümmern uns darum als Teil der Verwaltung deiner Steuerposition.

## Welche Adresse solltest du nutzen, wenn du oft umziehst?

Für Working Holiday Maker, die zwischen Hostels oder Arbeitsplätzen pendeln:

- Nutze eine stabile Adresse, an der du zuverlässig Post bekommst
- Die feste Adresse eines Freundes ist ideal, wenn verfügbar
- Ein Langzeit-Hostel funktioniert, wenn die Postweiterleitung zuverlässig ist
- Eine Postanschrift (PO Box) ist auch okay

Vermeide die Adresse eines temporären Hostels, das du innerhalb weniger Wochen wieder verlässt. Postweiterleitung zwischen australischen Hostels funktioniert selten gut.

## Beeinflusst deine Adresse deine Steuererklärung?

Indirekt. Die Steuererklärung selbst wird elektronisch eingereicht, und die Rückzahlung geht auf dein Bankkonto. Aber:

- ATO-Mitteilungen zu deiner Steuererklärung gehen an deine hinterlegte Adresse
- Identitätsprüfungs-Briefe gehen an deine Adresse
- Anpassungs- oder Prüfungs-Briefe gehen an deine Adresse

Eine aktuelle Adresse stellt sicher, dass jede Kommunikation dich zeitnah erreicht.

## Was, wenn du Australien schon verlassen hast?

Wenn du Australien verlassen hast:

- Wir können deine Adresse auf deine Auslandsadresse aktualisieren
- So erreicht dich auch Post nach der Abreise
- Nützlich für Rückzahlungs-Nachfragen, Super-Auszüge und Prüfungs-Briefe

[Schick uns deine Auslandsadresse](/de/contact) und wir aktualisieren sie beim ATO und bei eventuellen Super-Fonds. Das ist Teil unseres Standard-Abreisepakets für Working Holiday Maker, die Australien verlassen.
 `,
  },

  'tfn-reference-number-before-tfn-arrives': {
    title: 'Was ist eine TFN-Referenznummer und kannst du arbeiten, bevor deine TFN ankommt?',
    description: 'Während du auf deine TFN wartest, bekommst du eine Referenznummer. Hier ist, was sie ist und wie du sie nutzt.',
    body: `
Die TFN-Referenznummer ist eine temporäre Kennung, die das ATO (australisches Finanzamt) in dem Moment ausstellt, in dem du deinen TFN-Antrag online einreichst. Sie ist nicht deine eigentliche TFN, beweist aber, dass dein Antrag läuft, und ermöglicht deinem Arbeitgeber, deine Bezahlung beim korrekten 15 %-Satz einzurichten, während du auf die echte TFN wartest. Als Working Holiday Maker kannst du legal mit nur der Referenznummer arbeiten anfangen - vorausgesetzt, du gibst sie deinem Arbeitgeber am ersten Tag.

## Was ist die TFN-Referenznummer?

Die Referenznummer ist eine temporäre Kennung, die du in dem Moment bekommst, in dem du den TFN-Antrag abschließt:

- Erscheint auf dem Bestätigungsbildschirm am Ende des Antrags
- Wird an die im Antrag angegebene E-Mail-Adresse geschickt
- Sieht aus wie ein Standard-Referenzcode (separat von deiner eigentlichen 9-stelligen TFN)
- Dient als Beweis, dass dein Antrag läuft

Stell sie dir wie eine Quittung vor, die deinem Arbeitgeber zeigt, dass du alles richtig gemacht hast und auf die ATO-Bearbeitung wartest.

## Kannst du legal nur mit der Referenznummer arbeiten anfangen?

Ja. Als Working Holiday Maker kannst du anfangen zu arbeiten, bevor deine TFN ankommt - solange du deinem Arbeitgeber die Referenznummer gibst und dann deine eigentliche TFN nachreichst, sobald sie ausgestellt ist.

Was dein Arbeitgeber mit der Referenznummer machen sollte:

- Die Referenznummer in seinem Lohnsystem eintragen
- Den 15 %-Working Holiday Maker-Steuersatz ab Tag eins anwenden
- Deinen Datensatz aktualisieren, sobald deine echte TFN ankommt

Wenn du anfängst zu arbeiten, ohne TFN oder Referenznummer anzugeben, ist dein Arbeitgeber gesetzlich verpflichtet, Steuer zum höchsten Satz von 45 % einzubehalten, bis eine TFN hinterlegt ist. Die Referenznummer verhindert das.

## Wie lange dauert es, bis deine eigentliche TFN ankommt?

Das ATO bearbeitet TFN-Anträge typischerweise innerhalb von 28 Tagen. In der Praxis bekommen viele Working Holiday Maker ihre TFN schneller - manchmal innerhalb von zwei Wochen. Wichtige Punkte:

- Die TFN wird per Post an die australische Adresse aus deinem Antrag geschickt
- Nutze eine Adresse, an der du lang genug bleibst, um den Brief zu empfangen
- Unser Team kann nachfassen, wenn 28 Tage ohne Zustellung vergehen

Wenn du über unseren Service beantragt hast, haben wir die Referenznummer gespeichert und können den Antrag direkt beim ATO für dich verfolgen.

## Was tun, sobald deine TFN ankommt

Sobald deine TFN ankommt:

1. Gib sie sofort deinem Arbeitgeber
2. Er aktualisiert dein Tax File Number Declaration-Formular mit der korrekten Nummer
3. Ab da sind deine Datensätze mit deiner eigentlichen TFN verknüpft statt mit der temporären Referenz

Wenn du seit dem Antrag umgezogen bist oder deine Post an eine alte Adresse gegangen ist, [kontaktiere unser Team](/de/contact) und wir arrangieren die sichere Neuversendung deiner TFN.

## Bewahre deine Referenznummer sicher auf

Lösch nicht die Bestätigungs-E-Mail von deinem TFN-Antrag:

- Die Referenznummer wird eventuell bei Verzögerungen gebraucht
- Nützlich, wenn du schnell mehrere Jobs anfängst
- Erforderlich, wenn du beim Antrag nachfassen musst

Sobald deine TFN ausgestellt ist, wird die Referenznummer irrelevant. Aber in den Wochen davor ist sie wirklich nützlich, um sicherzustellen, dass deine Bezahlung ab deiner ersten Schicht zum korrekten 15 %-Satz läuft.
 `,
  },

  'tax-free-threshold-working-holiday-visa': {
    title: 'Können Working Holiday Maker den Freibetrag in Australien beantragen?',
    description: 'Australische Steuerresidenten bekommen einen Freibetrag von 18.200 $. Hier ist, ob das auch für Working Holiday Maker gilt.',
    body: `
Nein, Working Holiday Maker können den Freibetrag in Australien nicht beanspruchen. Der Freibetrag (Tax-Free Threshold) ist eine 18.200 $-Vergünstigung, die nur australischen Steuerresidenten zur Verfügung steht. Ihn als Working Holiday Visum-Inhaber zu beanspruchen führt dazu, dass dein Arbeitgeber weniger Steuer einbehält, als du tatsächlich schuldest - was am Jahresende zu einer Steuerschuld statt einer Rückzahlung führt. Die korrekte Einstellung auf deinem Tax File Number Declaration-Formular ist: Working Holiday Maker für die Residenz und "Nein" zur Freibetrag-Frage.

## Was ist der Freibetrag?

Der Freibetrag ist eine Regelung für australische Steuerresidenten, die ermöglicht, dass die ersten 18.200 $ Einkommen pro Steuerjahr steuerfrei bleiben. Er existiert, weil Australien ein progressives Steuersystem nutzt, und Residenten mit niedrigem Einkommen bekommen diese Vergünstigung zur Reduzierung ihrer Gesamtsteuerlast.

Es ist ein echter Vorteil, aber er ist nur für australische Residenten gedacht, nicht für temporäre Visa-Inhaber.

## Warum Working Holiday Maker ihn nicht beanspruchen können

Working Holiday Maker werden nach einer separaten, spezifischen Steuersatz-Struktur besteuert:

- Ein pauschaler 15 %-Satz auf die ersten 45.000 $ Einkommen
- Dieser Satz existiert genau deshalb, weil du nicht im selben Sinne Steuerresident bist wie ein ständiger Einwohner oder Staatsbürger
- Der Freibetrag ist Teil des Resident-Steuersatzsystems, das anders funktioniert

Wenn du den Freibetrag als Working Holiday Maker beanspruchst, behält dein Arbeitgeber weniger Steuer ein, als du tatsächlich schuldest. Auf den ersten Blick sieht das nach mehr Geld in der Tasche jede Woche aus - aber es erzeugt eine Lücke zwischen dem, was einbehalten wurde, und dem, was das ATO erwartet, dass du gezahlt hast. Diese Lücke wird zur Steuerschuld, wenn du deine [Steuererklärung](/de/tax-return) einreichst.

## Wie sieht der Fehler in der Praxis aus?

Stell dir vor, du verdienst 1.000 $ pro Woche:

- Mit dem korrekten 15 %-Satz: 150 $ einbehalten, 850 $ auf deinem Konto
- Mit fälschlich beanspruchtem Freibetrag: deutlich weniger einbehalten (manchmal nichts bei niedrigeren Einkommen)

Am Jahresende berechnet das ATO, was du tatsächlich schuldetest, basierend auf deinem Gesamteinkommen und Visa-Status. Wenn weniger als nötig einbehalten wurde, schuldest du die Differenz. Was eine Rückzahlung sein sollte, wird zu einer Rechnung.

## Wie du es behebst, falls du den Freibetrag schon beansprucht hast

Wenn du schon ein Tax File Number Declaration-Formular eingereicht hast, in dem du den Freibetrag beanspruchst:

1. Reiche ein neues TFN Declaration-Formular bei deinem Arbeitgeber ein
2. Wähle "Working Holiday Maker" für die Residenz
3. Wähle "Nein" für die Freibetrag-Frage
4. Dein Arbeitgeber aktualisiert deine Lohnabrechnung ab dann

Die zum falschen Satz einbehaltene Steuer wird abgeglichen, wenn du deine [Steuererklärung](/de/tax-return) am Ende des Steuerjahres einreichst. Je früher du das Formular korrigierst, desto kleiner ist die nötige Anpassung am Jahresende.

Wenn du nicht sicher bist, wie dein Tax File Number Declaration-Formular ausgefüllt wurde, oder uns deinen Einbehaltungssatz prüfen lassen möchtest, [kontaktiere unser Team](/de/contact) und wir prüfen deine Lohnzettel.

## Das Fazit

Beanspruche den Freibetrag nicht mit einem Working Holiday Visum. Es ist kein Vorteil, der dir zusteht, und die Beanspruchung erzeugt eine Steuerschuld statt Geld zu sparen. Die korrekte Einstellung ist einfach:

- Residenz: Working Holiday Maker
- Tax-free threshold: Nein

Jeder Lohnzettel zeigt dann den korrekten 15 %-Satz, und am Jahresende gibt es keine böse Überraschung.
 `,
  },

  'tfn-application-rejected': {
    title: 'Was tun, wenn dein TFN-Antrag in Australien abgelehnt wird',
    description: 'TFN-Anträge können aus mehreren Gründen abgelehnt werden. Hier ist, was zu tun ist und wie du das Problem behebst.',
    body: `
Ein TFN-Antrag (Tax File Number) kann abgelehnt werden, wenn die Daten im Antrag nicht mit den Aufzeichnungen des Department of Home Affairs übereinstimmen oder wenn die Identitätsprüfung fehlschlägt. Die häufigsten Ursachen sind eine Reisepass-Nummer, die nicht zur Visa-verknüpften passt, ein falsches Geburtsdatum oder ein Name, der anders geschrieben ist als im Reisepass. Bis eine gültige TFN ausgestellt wird, muss dein Arbeitgeber Steuer zu 45 % einbehalten statt zum 15 %-Working Holiday Maker-Satz.

Eine Ablehnung ist nicht das Ende des Prozesses. Der Antrag kann neu eingereicht werden, sobald das Problem identifiziert ist, und jede zwischenzeitlich zu viel gezahlte Steuer holst du dir mit deiner [Steuererklärung](/de/tax-return) am Ende des Steuerjahres zurück.

## Warum werden TFN-Anträge abgelehnt?

Das ATO lehnt Anträge ab, wenn die Identitätsdaten nicht mit einem gültigen Visa-Datensatz abgeglichen werden können. Die häufigsten Gründe:

- Reisepass-Nummer im Antrag stimmt nicht mit der überein, die für die Visa-Bewilligung genutzt wurde
- Geburtsdatum stimmt nicht mit Home Affairs-Aufzeichnungen überein
- Name anders geschrieben als im Reisepass (zweite Vornamen, Bindestriche, Sonderzeichen)
- Visum wurde noch nicht durch Einreise nach Australien aktiviert
- Eine frühere TFN existiert von einem früheren Visum, und das System markiert ein Duplikat

Das ATO erklärt nicht immer, welches Feld die Ablehnung verursacht hat - das macht die Lösung im Alleingang schwierig.

## Was passiert mit deiner Steuer, während du wartest?

Jede Woche ohne gültige TFN behält dein Arbeitgeber Steuer zu 45 % statt 15 % ein. Bei einem Wochenlohn von 1.000 $ sind das zusätzliche 300 $ zurückgehalten. Das Geld ist nicht verloren, aber es liegt beim ATO, bis deine Steuererklärung eingereicht wird - manchmal ein Jahr später oder mehr.

Je schneller ein abgelehnter Antrag gelöst wird, desto weniger von deinem Lohn wird durch Übereinbehaltung blockiert.

## Wie kümmert sich unser Team um einen abgelehnten TFN-Antrag?

Wenn ein von uns eingereichter TFN-Antrag abgelehnt wird:

- Wir kontaktieren das ATO direkt, um genau das Feld zu identifizieren, das die Ablehnung verursacht hat
- Wir gleichen die Daten gegen deinen Reisepass und deine Visa-Bewilligung ab
- Wir korrigieren den Antrag und reichen ihn über unseren Steueragenten-Kanal neu ein
- Wir verfolgen den neuen Antrag bis zur Ausstellung und bestätigen die TFN mit dir

Steueragenten haben direkte ATO-Kanäle, die der Öffentlichkeit nicht zur Verfügung stehen - das heißt, Ablehnungen werden in Tagen statt der Wochen gelöst, die es über allgemeine Auskunfts-Kanäle braucht.

## Wie schützt du deine TFN, sobald sie ausgestellt ist?

Sobald deine TFN ausgestellt ist, behandle sie wie eine Bankkontonummer. Teile deine TFN oder Reisepass-Daten nie mit jemandem, der kein registrierter Steueragent ist. Leute, die sich als Buchhalter oder "Steuerhelfer" auf Social Media und Backpacker-Foren ausgeben, stehlen regelmäßig TFNs und reichen betrügerische Steuererklärungen im Namen anderer Personen ein - die Rückzahlung geht dann auf ihr eigenes Bankkonto.

Ein registrierter Steueragent hat eine TAN (Tax Agent Number), die im Tax Practitioners Board-Register aufgeführt ist. Wenn du die Nummer nicht verifizieren kannst, gib keine Daten heraus. [Kontaktiere unser Team](/de/contact), um über einen registrierten Agenten einzureichen und deine Identität geschützt zu halten.
 `,
  },

  'tfn-identity-documents-required': {
    title: 'Welche Ausweisdokumente brauchst du, um eine TFN in Australien zu beantragen?',
    description: 'Für den TFN-Antrag brauchst du bestimmte Identitätsnachweise. Hier ist die komplette Liste für Working Holiday Maker.',
    body: `
Ein TFN-Antrag (Tax File Number) für einen Working Holiday Maker erfordert einen gültigen Reisepass, die Visa-Bewilligungsmitteilung für ein Subclass 417- oder 462-Visum und eine australische Wohnadresse, an die der TFN-Brief zugestellt werden kann. Der Antrag verlangt außerdem deinen vollständigen rechtlichen Namen genau wie er im Reisepass steht, dein Geburtsdatum und dein Land der Staatsbürgerschaft.

Fehlende oder nicht übereinstimmende Dokumente sind die Hauptursache für TFN-Ablehnungen - und ein abgelehnter Antrag bedeutet Wochen mit 45 % statt 15 % Steuereinbehaltung.

## Welche Dokumente sind erforderlich?

Für einen Working Holiday Maker-TFN-Antrag braucht das ATO:

- Gültigen Reisepass (denselben, mit dem du auf deinem aktuellen Visum nach Australien eingereist bist)
- Visa-Bewilligungsmitteilung oder Visa-Etikett, das Subclass 417 oder 462 bestätigt
- Australische Wohnadresse (der TFN-Brief wird hierhin geschickt)
- Datum der Ankunft in Australien auf dem aktuellen Visum
- Land der Staatsbürgerschaft und Geburtsland

Der Antrag braucht außerdem eine E-Mail-Adresse und eine australische oder internationale Telefonnummer zur Kontaktaufnahme.

## Was zählt als gültige australische Adresse?

Die australische Adresse kann jede sein, an der zuverlässig Post empfangen werden kann. Dazu gehören:

- Eine Mietwohnung oder WG
- Ein Hostel oder Kurzzeit-Unterkunft (mit Erlaubnis, Post zu empfangen)
- Die Adresse eines Freundes oder Verwandten
- Eine Arbeitsplatz-Adresse (mit Erlaubnis des Arbeitgebers)

Der TFN-Brief wird per Post geschickt und kann nicht einfach umgeleitet werden, sobald er ausgestellt ist. Wenn du umziehst, bevor der Brief ankommt, [kann unser Team die Adresse beim ATO aktualisieren](/de/blog/how-to-update-address-with-ato).

## Was, wenn dein Name im Reisepass Sonderzeichen enthält?

Namen mit Bindestrichen, Sonderzeichen, Apostrophen oder mehreren zweiten Vornamen verursachen mehr Ablehnungen als jedes andere Identitätsproblem. Der TFN-Antrag muss zeichenweise mit dem Namen auf der Visa-Bewilligung übereinstimmen. Wenn dein Reisepass "François Müller" sagt und der Antrag als "Francois Muller" eingereicht wird, kann das ATO ihn als Diskrepanz ablehnen.

Wenn wir einen TFN-Antrag über unseren Service einreichen, gleichen wir deinen Namen vor der Einreichung mit deiner Visa-Bewilligung und deinem Reisepass ab, um die Diskrepanz zu verhindern.

## Warum unseren Service nutzen statt selbst zu beantragen?

Das öffentliche TFN-Antragsformular warnt dich vor der Einreichung nicht vor Diskrepanzen. Ein falsches Zeichen, eine veraltete Reisepass-Nummer oder ein falsches Ankunftsdatum wird erst Wochen später erkannt, wenn das ATO den Antrag ablehnt. Unser Team verifiziert jedes Detail gegen deinen Reisepass und deine Visa-Bewilligung vor der Einreichung, und wir reichen über einen Steueragenten-Kanal ein, der Anträge schneller bearbeitet als der öffentliche Weg.

## Was ist mit TFN-Sicherheit?

Teile niemals Kopien deines Reisepasses, deiner Visa-Bewilligung oder deiner TFN mit jemandem, der kein registrierter Steueragent ist. Betrüger geben sich regelmäßig als "Buchhalter" oder "Steuerhelfer" in Backpacker-Foren, Social Media und Messaging-Apps aus, um Identitätsdokumente zu sammeln. Sobald sie deine TFN und Reisepass-Daten haben, können sie eine betrügerische Steuererklärung in deinem Namen einreichen und die Rückzahlung auf ihr eigenes Konto umleiten. Ein registrierter Steueragent ist im Tax Practitioners Board-Register mit einer TAN-Nummer aufgeführt. Wenn du die Nummer nicht verifizieren kannst, gib deine Dokumente nicht heraus. [Beantrage deine TFN](/de/tfn-form) über unseren registrierten Agenten-Service, um deine Identität geschützt zu halten.

[Kontaktiere unser Team](/de/contact), um deine TFN über unseren registrierten Steueragenten-Service zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 `,
  },

  'tfn-security-protect-from-fraud': {
    title: 'Wie du deine TFN in Australien vor Betrug und Identitätsdiebstahl schützt',
    description: 'Deine TFN ist eine sensible Information. Hier ist, wie du sie schützt und was du tun musst, wenn sie missbraucht wurde.',
    body: `
Eine Tax File Number (TFN) ist eine permanente, lebenslange Kennung, die vom ATO (australisches Finanzamt) ausgestellt wird. Jeder, der deine TFN zusammen mit grundlegenden Identitätsdaten hat, kann eine Steuererklärung in deinem Namen einreichen, deine Rückzahlung auf sein eigenes Bankkonto umleiten und betrügerische ABN-Registrierungen mit deiner Identität anlegen. Working Holiday Maker sind ein häufiges Ziel, weil sie mit australischen Systemen nicht vertraut sind und oft Dokumente mit Fremden teilen, die sie in Hostels, auf Social Media oder Backpacker-Foren treffen.

Behandle deine TFN mit derselben Sorgfalt wie eine Bankkontonummer. Sobald sie kompromittiert ist, kann der Schaden Jahre brauchen, bis er behoben ist.

## Wer darf legitim nach deiner TFN fragen?

Das ATO veröffentlicht eine strikte Liste, wer nach deiner TFN fragen darf. Die Liste ist kurz:

- Dein Arbeitgeber (nachdem du angefangen hast zu arbeiten, auf einem Tax File Number Declaration-Formular)
- Deine Bank oder Finanzinstitut (um den korrekten Steuersatz auf Zinsen anzuwenden)
- Dein Super-Fonds (zur Verwaltung deiner Altersvorsorge)
- Dein registrierter Steueragent (für deine Steuererklärung oder ATO-Angelegenheiten)
- Centrelink oder Behörden, die Zahlungen verwalten, auf die du Anspruch hast

Sonst hat niemand ein gesetzliches Recht, nach deiner TFN zu fragen. Nicht ein Vermieter, nicht ein Freund, nicht eine Personalvermittlung - und schon gar nicht jemand in einer Facebook-Gruppe, der anbietet, "bei deiner Steuer zu helfen".

## Wie TFN-Betrug tatsächlich funktioniert

Der häufigste Betrug, der Working Holiday Maker trifft, folgt demselben Muster. Ein Betrüger postet in einer Backpacker-Facebook-Gruppe, WhatsApp-Community oder am schwarzen Brett im Hostel und bietet an, "deine Steuererklärung einzureichen" oder "deine Super zu beantragen" gegen eine kleine Gebühr. Er fragt nach:

- Ein Foto von deinem Reisepass
- Ein Foto von deiner Visa-Bewilligung
- Deine TFN
- Dein Geburtsdatum und deine australische Adresse
- Manchmal deine Bankverbindung

Mit diesen Daten reicht der Betrüger eine Steuererklärung in deinem Namen über das ATO-Portal ein, gibt sein eigenes Bankkonto als Rückzahlungsziel an und verschwindet mit dem Geld. Wenn die legitime Steuererklärung später eingereicht wird, markiert das ATO sie als Duplikat - und die echte Rückzahlung verzögert sich um Monate, während der Betrug untersucht wird.

## Warnsignale eines TFN-Betrugs

Wenn die Person, die anbietet, deine Steuer zu machen, dir keine TAN (Tax Agent Number) im Tax Practitioners Board-Register zeigen kann, ist sie kein registrierter Steueragent. Weitere Warnsignale:

- Verlangt Zahlung in bar, Kryptowährung oder Geschenkkarten
- Arbeitet nur über Messaging-Apps ohne Geschäftsadresse
- Verspricht ungewöhnlich hohe Rückzahlungen, ohne deine tatsächliche Situation zu prüfen
- Fragt nach Konto-Passwörtern oder verlangt, dass du deinen Bildschirm teilst
- Druck zu "schnellem Handeln" oder "vor der Frist"

Legitime Steueragenten haben ein registriertes Geschäft, eine TAN-Nummer, eine Berufshaftpflichtversicherung und brauchen nie deine Konto-Passwörter, um eine Steuererklärung für dich einzureichen.

## Was tun, wenn deine TFN kompromittiert wurde

Wenn du vermutest, dass deine TFN an die falsche Person geteilt wurde oder deine Daten gestohlen wurden, kontaktiere das ATO sofort über die offizielle Identitätsdiebstahl-Hotline und melde es. Das ATO kann einen Sicherheitsmarker auf deinem Konto anbringen, der zusätzliche Verifizierung verlangt, bevor eine Steuererklärung bearbeitet wird. [Kontaktiere unser Team](/de/contact) und wir helfen dir, den Vorfall zu melden, dein Konto zu sichern und zu prüfen, ob betrügerische Steuererklärungen oder ABN-Registrierungen in deinem Namen eingereicht wurden.

## Wie halten wir deine TFN sicher?

Wenn du über unseren Service einreichst, werden deine TFN und Identitätsdokumente über einen registrierten Steueragenten-Kanal abgewickelt, der durch Berufshaftpflichtversicherung gedeckt und an den Verhaltenskodex des Tax Practitioners Board gebunden ist. Wir arbeiten nie über anonyme Messaging-Apps, und unsere TAN-Nummer ist öffentlich im Tax Practitioners Board-Register prüfbar.
 `,
  },

  'who-can-ask-for-your-tfn': {
    title: 'Wer darf in Australien deine TFN verlangen (und wer nicht)?',
    description: 'Nicht jeder hat das Recht, deine TFN zu sehen. Hier ist eine Liste der legitimen Anfragen und Warnsignale für Betrug.',
    body: `
Eine Tax File Number (TFN) ist eine permanente Kennung, die vom ATO (australisches Finanzamt) ausgestellt wird. Unter australischem Datenschutzrecht hat nur eine begrenzte Liste von Organisationen das gesetzliche Recht, nach deiner TFN zu fragen. Jeder außerhalb dieser Liste, der danach fragt, sollte abgelehnt werden, und jeder Druck, sie über Social Media, Messaging-Apps oder persönlich zu teilen, sollte als Betrugsrisiko behandelt werden.

Genau zu wissen, wer fragen darf und was damit gemacht werden darf, ist die einfachste Verteidigung gegen TFN-bezogenen Identitätsdiebstahl.

## Wer darf gesetzlich nach deiner TFN fragen?

Die Privacy (Tax File Number) Rule beschränkt die TFN-Erhebung auf eine definierte Liste:

- Dein Arbeitgeber, sobald du angefangen hast zu arbeiten, auf einem Tax File Number Declaration-Formular
- Banken und Finanzinstitute, um den korrekten Steuersatz auf Zinsen anzuwenden
- Super-Fonds, um dein Rentenkonto zu verwalten und zu identifizieren
- Registrierte Steueragenten, um Steuererklärungen einzureichen und ATO-Korrespondenz für dich zu verwalten
- Centrelink und Services Australia, falls du eine Behördenzahlung beanspruchst
- Das ATO selbst

Jede dieser Organisationen muss erklären, warum sie die TFN braucht, sie sicher speichern und nur für den genannten steuerbezogenen Zweck nutzen.

## Wer darf nicht nach deiner TFN fragen?

Die Liste der Leute, die kein Recht auf deine TFN haben, ist viel länger. Dazu gehören:

- Vermieter oder Immobilienmakler (sogar für Mietanträge)
- Telefon- oder Internetanbieter
- Versicherungen (außer für bestimmte steuerbezogene Produkte)
- Freunde, Hostelpersonal oder andere Backpacker
- Personalvermittlungen (der Arbeitgeber erhebt sie nach der Einstellung, nicht die Agentur)
- Jeder, der Steuerhilfe anbietet, aber keine registrierte Steueragenten-Nummer (TAN) zeigen kann

Wenn eine TFN-Anfrage nicht von der Liste oben kommt, darfst du ablehnen. Eine Ablehnung ist keine Straftat und kann nicht als Grund genutzt werden, dir eine Leistung zu verweigern.

## Wann darf ein Arbeitgeber nach deiner TFN fragen?

Ein Arbeitgeber darf nach deiner TFN erst fragen, nachdem du den Job angenommen hast und dein Onboarding-Papierkram ausfüllst. Die Anfrage kommt über ein Tax File Number Declaration-Formular - ein Standard-ATO-Dokument. Der Arbeitgeber nutzt die TFN, um den korrekten Working Holiday Maker-Steuersatz von 15 % anzuwenden und dein Einkommen ans ATO zu melden. Er darf deine TFN nicht mit anderen Arbeitgebern, Personalvermittlungen oder Dritten teilen.

Wenn du noch nicht offiziell eingestellt bist und der Arbeitgeber oder Recruiter schon nach deiner TFN fragt, ist das ein Warnsignal. Siehe unseren Artikel zu [dem Tax File Number Declaration-Formular](/de/blog/tax-file-number-declaration-form) für Details, wie das Formular aussieht und wann du es ausfüllen sollst.

## Welche Warnsignale deuten fast immer auf Betrug hin?

Der häufigste TFN-Betrug gegen Working Holiday Maker kommt durch Nachrichten wie diese:

- "Schick mir deine TFN und deinen Reisepass, ich reiche deine Steuererklärung für dich ein"
- "Schick mir deine TFN, ich prüfe, wie viel Super du hast"
- "Ich arbeite für einen Buchhalter, schick mir ein Foto deines Visums und deiner TFN"
- "Ich kann dir eine größere Rückzahlung holen, wenn du mir deine TFN schickst"

Keine dieser Anfragen ist legitim. Registrierte Steueragenten arbeiten nicht über anonyme Facebook-Konten oder WhatsApp-Nummern, brauchen deine Konto-Passwörter nicht und versprechen nie aufgeblähte Rückzahlungen, bevor sie dein tatsächliches Einkommen prüfen.

## Wie verifizierst du einen Steueragenten, bevor du deine TFN teilst?

Jeder registrierte Steueragent in Australien hat eine Tax Agent Number (TAN), die im öffentlichen Tax Practitioners Board-Register aufgeführt ist. Bevor du deine TFN mit jemandem teilst, der Steuerdienste anbietet, verifiziere, dass seine TAN-Nummer aktuell ist. Wenn er dir keine TAN geben kann oder die Nummer nicht zum Geschäft passt, teile keine Dokumente.

[Unser Service](/de/tax-return) wird von einem registrierten Steueragenten erbracht. Unsere TAN-Nummer ist öffentlich verifizierbar, und deine TFN wird über einen sicheren Steueragenten-Kanal behandelt statt über E-Mail oder Messaging-Apps.

[Kontaktiere unser Team](/de/contact), um deine TFN über unseren registrierten Steueragenten-Service zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 `,
  },

  'tfn-australian-address-no-fixed-address': {
    title: 'Wie du eine TFN ohne feste australische Adresse beantragst',
    description: 'Du hast noch keine feste Adresse? Es gibt Wege, trotzdem eine TFN zu bekommen. Hier sind sie.',
    body: `
Ein TFN-Antrag (Tax File Number) braucht eine australische Adresse, an die der TFN-Brief zugestellt werden kann - aber das muss keine langfristige Mietwohnung sein. Ein Hostel, die Wohnung eines Freundes, ein Arbeitsplatz oder sogar ein Backpacker-Postlagerservice kann genutzt werden, solange in den vier Wochen nach dem Antrag zuverlässig Post empfangen werden kann. Viele Working Holiday Maker ziehen in den ersten Monaten in Australien häufig um, und ohne feste Adresse zu beantragen ist häufiger, als die ATO-Website suggeriert.

Das größere Risiko ist die Wahl einer Adresse, an der Post verloren geht. Ein verlorener TFN-Brief verzögert deinen korrekten Steuersatz und den Beginn jeder [Steuerrückzahlung](/de/blog/what-is-a-tax-refund-australia), die dir zusteht.

## Was akzeptiert das ATO als Adresse?

Der TFN-Antrag verlangt eine australische Wohn- oder Postanschrift. Das ATO akzeptiert:

- Eine Mietwohnung, WG oder Untervermietung
- Ein Hostel oder Backpacker-Unterkunft
- Die Wohnung eines Freundes oder Verwandten
- Eine Arbeitsplatz-Adresse (mit Erlaubnis des Arbeitgebers)
- Ein Postlagerservice oder PO Box (von Langzeitreisenden genutzt)

Das ATO prüft nicht, ob du wirklich an der Adresse wohnst. Was zählt: dass der TFN-Brief, der per Australia Post geschickt wird, abgeholt und nicht an den Absender zurückgeschickt wird.

## Warum eine Hostel-Adresse riskant sein kann

Hostels sind eine häufige Wahl für erste TFN-Anträge, aber sie kommen mit zwei Risiken. Erstens: Große Hostels verwalten Hunderte von Postsendungen, und Briefe gehen verloren, werden zurückgeschickt oder weggeworfen. Zweitens: Wenn du auscheckst, bevor der Brief ankommt, leiten Hostels selten weiter.

Wenn eine Hostel-Adresse die einzige Option ist, frag schriftlich an der Rezeption, ob sie Post für dich halten, und prüf täglich, sobald zwei Wochen nach dem Antrag vergangen sind. Die ATO-Standardbearbeitungszeit ist 28 Tage, aber der Brief kommt meistens innerhalb von 10 bis 14 Tagen.

## Was, wenn du umziehst, bevor der Brief ankommt?

Vor Ankunft des TFN-Briefes umzuziehen ist einer der häufigsten Gründe, warum Working Holiday Maker ihre TFN nie bekommen. Sobald der Brief an die alte Adresse geschickt wurde, schickt das ATO ihn nicht automatisch erneut.

Wenn du umgezogen bist, kann unser Team deine Adresse beim ATO aktualisieren und die Neuversendung oder anderweitige Bestätigung der TFN arrangieren. Siehe unseren Artikel zu [Adressaktualisierung beim ATO](/de/blog/how-to-update-address-with-ato) für mehr Details.

## Wie beantragst du ohne feste Adresse über unseren Service?

Wenn wir einen TFN-Antrag über unseren Service einreichen, können wir eine verifizierte Adresse nutzen, die für die Dauer des Antrags Post sicher hält. Sobald die TFN ausgestellt ist, bestätigen wir sie direkt mit dir über unser System - so bekommst du deine TFN auch dann, wenn du in der Zwischenzeit die Unterkunft gewechselt hast. Das beseitigt den häufigsten Fehlerpunkt bei TFN-Anträgen für Reisende, die noch eine langfristigere Unterkunft suchen.

## Wie hältst du deine TFN sicher, sobald sie ankommt?

Ein TFN-Brief ist ein hochwertiges Dokument. Sobald er ankommt, lass ihn nicht in einer geteilten Unterkunft herumliegen, fotografiere ihn nicht für Social Media und teile ihn mit niemandem außer deinem Arbeitgeber, deiner Bank, deinem Super-Fonds oder einem registrierten Steueragenten. Siehe unseren Artikel zu [Schutz deiner TFN vor Betrug](/de/blog/tfn-security-protect-from-fraud) für die komplette Liste, wer nach deiner TFN fragen darf und wer nicht. [Kontaktiere unser Team](/de/contact), um deine TFN über einen registrierten Steueragenten-Kanal zu beantragen.
 `,
  },

  // ─── More ABN posts ────────────────────────────────────────────────────────
  'farm-work-and-abns': {
    title: 'Farmarbeit und ABNs - was du wissen musst, bevor du anfängst',
    description: 'Manche Farmer wollen, dass du eine ABN nutzt. Hier ist, warum das oft problematisch ist und wie du deine Rechte schützt.',
    body: `
Für Farmarbeit in Australien brauchst du meistens eine Australian Business Number (ABN), wenn du über einen Personalvermittler arbeitest oder im Akkordlohn als Contractor bezahlt wirst. Eine ABN brauchst du nicht, wenn die Farm dich direkt als Angestellten beschäftigt. Kläre die Vereinbarung immer ab, bevor du anfängst zu arbeiten - denn die Antwort entscheidet, welche Steuer-, Super- und sonstigen Ansprüche für dich gelten.

## Warum ist Farmarbeit oft mit einer ABN verbunden?

Viele australische Farmen stellen Pflücker, Packer und Erntehelfer nicht direkt ein. Stattdessen nutzen sie Personalvermittler, die Arbeiter als Contractor zur Verfügung stellen. In dieser Konstellation:

- Der Personalvermittler verlangt, dass du für deine Stunden oder gepflückten Mengen Rechnungen stellst
- Keine Steuer wird von deiner Zahlung einbehalten
- Keine Superannuation wird zusätzlich zu deinem Lohn gezahlt
- Du brauchst eine [ABN](/de/abn), um korrekt Rechnungen zu stellen

Wenn die Farm dich direkt einstellt, bist du Angestellter und deine [TFN](/de/tfn) reicht aus.

Frag die Farm oder den Personalvermittler direkt, wie die Vereinbarung strukturiert ist, bevor du deine erste Schicht antrittst. Die Antwort bestimmt alles Weitere.

## Wie funktioniert Akkordlohn?

Akkordlohn ist üblich beim Obstpflücken, wo du bezahlt wirst:

- Pro gefüllten Behälter
- Pro geerntetem Kilogramm
- Pro gepflückter oder gepackter Einheit

Akkordlohn-Vereinbarungen sind oft als Contracting strukturiert - in diesem Fall brauchst du eine ABN. Aber nicht jeder Akkordlohn ist Contracting. Manche Farmen führen Akkordlohn als Anstellung - du wirst pro Stück bezahlt, stehst aber trotzdem auf der Gehaltsliste, und die Farm kümmert sich um Steuer und Super. Geh nicht davon aus, dass Akkordlohn automatisch Contractor bedeutet. Frag die Farm.

## Worauf solltest du bei Farmarbeit achten?

Sei vorsichtig, wenn eines der folgenden Dinge passiert:

- Die Farm oder der Personalvermittler ist unklar, ob du Angestellter oder Contractor bist
- Du wirst gedrängt, schnell eine ABN zu besorgen, ohne dass es erklärt wird
- Du wirst als Contractor bezeichnet, aber die Arbeit sieht identisch aus zu der von Angestellten, die Super und Urlaub bekommen
- Deine Stunden werden vorgegeben, deine Werkzeuge werden gestellt, und du arbeitest ausschließlich für diesen Betrieb

Das sind Anzeichen für Scheinselbstständigkeit (Sham Contracting), wo ein Unternehmen einen Angestellten falsch als Contractor einstuft, um Arbeitgeber-Pflichten zu umgehen. Sham Contracting ist nach australischem Recht illegal. [Kontaktiere unser Team](/de/contact), wenn du den Verdacht hast, dass dir das passiert.

## Steuerpflichten, wenn du eine ABN für Farmarbeit hast

Wenn du unter einer ABN arbeitest, kümmerst du dich selbst um deine Steuer:

- Keine Steuer wird automatisch von deinen Zahlungen einbehalten
- Du musst genug zurücklegen, um deine Steuerschuld am Jahresende zu decken
- Alle ABN-Einkünfte müssen in deiner [Steuererklärung](/de/tax-return) angegeben werden
- Du bekommst eventuell keine Super-Beiträge vom Personalvermittler
- Der 15 %-Working Holiday Maker-Satz auf die ersten 45.000 $ gilt trotzdem

Bewahre Aufzeichnungen über jede erhaltene Zahlung und jede ausgestellte Rechnung auf. Gute Aufzeichnungen machen die Steuerzeit viel einfacher.
 `,
  },

  'employee-vs-contractor-australia': {
    title: 'Was ist der Unterschied zwischen Angestelltem und Contractor in Australien?',
    description: 'Die Unterscheidung ist wichtig für Steuer, Super und Rechte. Hier sind die Hauptunterschiede für Working Holiday Maker.',
    body: `
Der Unterschied zwischen Angestelltem und Contractor in Australien hängt von der Substanz der Arbeitsvereinbarung ab, nicht vom Etikett. Ein Angestellter arbeitet unter Anweisung eines Arbeitgebers, der Steuer abzieht, Super zahlt und Urlaub gewährt. Ein Contractor führt sein eigenes Geschäft, stellt Kunden Rechnungen, legt seine eigene Steuer zurück und hat in der Regel keinen Anspruch auf Super von Kunden. Die Einstufung beeinflusst deine Steuer, deine Super, deine Arbeitsrechte und ob du eine ABN brauchst.

## Was sind die wichtigsten Unterschiede zwischen Angestelltem und Contractor?

Die praktischen Hauptunterschiede:

- **Angestellter**: Lohn pro Stunde oder Tag, Steuer vom Arbeitgeber abgezogen, Super zusätzlich vom Arbeitgeber gezahlt, Anspruch auf Urlaub, nutzt eine [TFN](/de/tfn), arbeitet auf Anweisung
- **Contractor**: Bezahlt per Rechnung für Aufgabe oder Projekt, keine Steuer abgezogen, keine Super von Kunden (meistens), kein Urlaub, braucht eine [ABN](/de/abn), arbeitet selbstständig

Die Bezeichnung, die dein Arbeitgeber verwendet ("Contractor", "Subbie", "Selbstständig"), bestimmt deinen Status nicht. Was zählt ist, wie die Arbeit tatsächlich abläuft.

## Wie erkennst du, was du bist?

Das ATO und der Fair Work Ombudsman betrachten mehrere Faktoren, nicht einen einzelnen Test:

Indikatoren für Anstellung:

- Stunden- oder Tageslohn
- Du musst die Arbeit persönlich erledigen
- Du arbeitest über einen längeren Zeitraum ausschließlich für ein Unternehmen
- Das Unternehmen stellt deine Werkzeuge, Ausrüstung und deinen Arbeitsplatz
- Das Unternehmen gibt vor, wann, wo und wie du arbeitest
- Du bekommst regelmäßig Lohn (wöchentlich oder zweiwöchentlich)

Indikatoren für Contracting:

- Bezahlung pro Aufgabe, Projekt oder Stück
- Du darfst die Arbeit weitergeben oder delegieren
- Du stellst deine eigene Ausrüstung
- Du darfst gleichzeitig für mehrere Kunden arbeiten
- Du legst deine eigenen Stunden und Methoden fest
- Du stellst Rechnungen für erledigte Arbeit

Kein einzelner Faktor ist entscheidend. Es kommt auf das Gesamtbild an.

## Warum ist das für Working Holiday Maker wichtig?

Die Einstufung beeinflusst:

- **Steuer**: Bei Angestellten wird Steuer einbehalten; Contractors müssen ihre selbst zurücklegen
- **Super**: Angestellte bekommen 12 % Super zusätzlich zum Lohn; Contractors meistens nicht
- **Urlaub**: Angestellte sammeln bezahlten Jahresurlaub und Krankenstand an; Contractors nicht
- **Arbeitsschutz**: Angestellte sind durch Fair Work geschützt; Contractors haben weniger Schutz
- **Einkommen in Gefahr**: Contractors ohne gültige [ABN](/de/abn) bekommen 47 % von Rechnungen einbehalten

Wenn du als Contractor behandelt wirst, obwohl die Vereinbarung wie eine Anstellung aussieht, umgeht das Unternehmen eventuell seine Pflicht, dir Super und Urlaubsansprüche zu zahlen. Das nennt sich Scheinselbstständigkeit (Sham Contracting) und ist illegal. [Kontaktiere unser Team](/de/contact) und wir helfen dir, das über die richtigen Kanäle zu klären.

## Kannst du gleichzeitig Angestellter und Contractor sein?

Ja. Viele Working Holiday Maker sind in einem Job Angestellter und woanders Contractor. Du nutzt deine [TFN](/de/tfn) für Anstellungseinkommen und deine [ABN](/de/abn) für Contracting-Einkommen, und du gibst beide auf derselben [Steuererklärung](/de/tax-return) am Ende des Steuerjahres an.
 `,
  },

  'can-you-have-tfn-and-abn': {
    title: 'Kannst du gleichzeitig eine TFN und eine ABN haben?',
    description: 'Ja, das ist üblich. Hier ist, wie es funktioniert und was du beim Steuerthema beachten musst.',
    body: `
Ja, du kannst eine Tax File Number (TFN) und eine Australian Business Number (ABN) gleichzeitig haben - viele Working Holiday Maker tun das. Tatsächlich brauchst du eine TFN, bevor du eine ABN beantragen kannst. Die TFN ist deine persönliche Steuernummer für Anstellungen, die ABN ist deine Geschäftsnummer für Contractor- oder Sole Trader-Arbeit. Beide zu haben ist normal, wenn du beide Arten von Arbeit machst.

## Wie funktionieren TFN und ABN zusammen?

Die beiden Nummern erfüllen unterschiedliche Zwecke und werden in unterschiedlichen Situationen genutzt:

- Deine **TFN** ist für: Anstellungseinkommen, Steuererklärungen, Zugriff auf deine Super, Eröffnung bestimmter Bankkonten
- Deine **ABN** ist für: Rechnungen an Kunden für Contracting-Arbeit, Sole Trader-Geschäftseinkommen, Geschäftsausgaben absetzen

Du nutzt sie parallel. Dein Arbeitgeber nutzt deine TFN, um PAYG-Steuer von deinem Lohn abzuziehen. Deine Kunden nutzen deine ABN auf den Rechnungen, die du ausstellst.

Beide Einkommensströme werden in derselben [Steuererklärung](/de/tax-return) am Ende des Steuerjahres angegeben.

## Ein häufiges Szenario für Working Holiday Maker

Viele Working Holiday Maker haben am Ende beide. Ein typisches Beispiel:

- Du arbeitest Teilzeit in einem Café als Angestellter, mit deiner TFN, über die Gehaltsliste bezahlt
- Nebenbei machst du Freelance-Fotografie, Grafikdesign oder Saison-Farmarbeit als Contractor, mit Rechnungen unter deiner ABN
- Zur Steuerzeit werden beide Einkommen auf derselben Steuererklärung angegeben

Das ist absolut normal und legal. Die meisten Backpacker, die parallel zu regulärer Anstellung Contractor-Arbeit machen, sind in dieser Situation.

## Häufiger Fehler: ABN nutzen, wo die TFN hingehört

Ein häufiger Fehler ist, einem Arbeitgeber eine ABN anzugeben, der dich eigentlich als Angestellten behandeln sollte. Das verursacht Probleme, weil:

- Der Arbeitgeber dich ohne Steuerabzug bezahlt
- Keine Super für dich gezahlt wird
- Du keine Urlaubsansprüche bekommst
- Du am Jahresende eine größere Steuerrechnung hast als erwartet

Nutze deine ABN nur, wenn die Arbeit wirklich Contracting ist (siehe unseren Artikel zu [Angestellter vs. Contractor](/de/blog/employee-vs-contractor-australia) für den Unterschied). Ansonsten solltest du deine TFN und ein Tax File Number Declaration-Formular angeben.

## Welche Steuerpflichten hast du, wenn du beide hast?

Beide Nummern zu haben bedeutet, beide Einkommensströme zu verfolgen:

- Dein Arbeitgeber meldet dein Anstellungseinkommen über die Gehaltsliste ans ATO
- Du bist dafür verantwortlich, alles Einkommen unter deiner ABN zu verfolgen und anzugeben
- Alle Einkünfte aus beiden Quellen müssen in deiner [Steuererklärung](/de/tax-return) enthalten sein
- Der 15 %-Working Holiday Maker-Satz gilt für die kombinierten Einkünfte bis 45.000 $

Führe das ganze Jahr über klare Aufzeichnungen über beide. Hebe deine Lohnzettel auf, kopiere jede Rechnung, die du verschickst, und notiere jede Zahlung, die du bekommst. Steuerzeit ist viel einfacher, wenn die Aufzeichnungen vollständig sind.

[Kontaktiere unser Team](/de/contact) für Hilfe bei der ABN-Registrierung, GST- und BAS-Verwaltung oder beim Sortieren deiner Steuerposition am Jahresende.
 `,
  },

  'how-to-cancel-your-abn': {
    title: 'Wie du deine ABN kündigst, wenn du Australien verlässt',
    description: 'Wenn du Australien permanent verlässt, solltest du deine ABN kündigen. Hier ist die Anleitung.',
    body: `
Du solltest deine Australian Business Number (ABN) kündigen, wenn du Australien verlässt und kein Geschäft oder Contracting mehr betreibst. Unser Team kümmert sich um die Kündigung im Rahmen der Abwicklung deiner australischen Steuerposition vor deiner Abreise - du musst dich also nicht selbst mit dem Papierkram herumschlagen. Eine Kündigung hält deine Geschäftsunterlagen sauber und vermeidet spätere Verwaltungsprobleme.

## Wie kündigst du deine ABN?

Der einfachste Weg ist, uns das im Rahmen deines Abreise-Steuerpakets übernehmen zu lassen:

1. [Kontaktiere uns](/de/contact), bevor du Australien verlässt
2. Wir bestätigen, dass alles, was an deine ABN gebunden ist, abgeschlossen ist (Steuererklärungen eingereicht, Rechnungen ausgestellt, Zahlungen eingegangen)
3. Wir reichen die Kündigung für dich ein
4. Die ABN wird zum von dir angegebenen Datum gekündigt

Wir bündeln die ABN-Kündigung mit deiner finalen Steuererklärung und einem eventuellen Super-Antrag, sodass alles in einem Rutsch erledigt ist, bevor du abreist.

## Warum solltest du deine ABN kündigen?

Eine ABN aktiv zu lassen, wenn du sie nicht mehr nutzt, ist kein großes rechtliches Risiko, verursacht aber Probleme:

- Korrespondenz könnte an deine alte australische Adresse geschickt werden, nachdem du abgereist bist
- Du könntest wichtige Mitteilungen über Meldepflichten verpassen
- Wenn du später nach Australien zurückkehrst, musst du eventuell die ABN reaktivieren oder eine neue beantragen
- Eine offene ABN kann Ziel von Identitätsbetrug werden, wenn deine Daten bekannt werden

Eine saubere Kündigung beim Abreisen hält dein Verwaltungsleben einfach.

## Was musst du vor der ABN-Kündigung erledigen?

Vor der Kündigung musst du sicherstellen, dass alles, was an deine ABN gebunden ist, abgeschlossen ist:

- [Steuererklärung](/de/tax-return) für jedes Jahr einreichen, in dem du ABN-Einkommen hattest
- Alle ausstehenden Rechnungen an Kunden ausstellen
- Alle ausstehenden Zahlungen einsammeln
- Alle erforderlichen BAS-Statements einreichen, falls du für GST registriert warst
- Eventuelle finale Steuerschuld begleichen

Wenn das Steuerjahr noch nicht beendet ist, wenn du abreist, können wir deine Steuererklärung nach dem 1. Juli von überall auf der Welt einreichen. Wir helfen Working Holiday Makern regelmäßig damit.

## Vergiss nicht, deine Super zu beantragen

Wenn Super-Beiträge im Zusammenhang mit Anstellungsarbeit gezahlt wurden (getrennt von deinem ABN-Contracting), beantrage sie über den Departing Australia Superannuation Payment (DASP)-Prozess zurück. Siehe unseren Artikel zu [Super beantragen, wenn du Australien verlässt](/de/superannuation) für die Schritte.

ABN-Contracting-Arbeit erzeugt typischerweise keine Super-Beiträge, aber parallele Anstellungsarbeit oft schon.
 `,
  },

  'gst-and-abn-for-working-holiday-makers': {
    title: 'GST und ABN - müssen sich Working Holiday Maker für GST registrieren?',
    description: 'Du musst dich für GST registrieren, wenn deine ABN-Einkünfte 75.000 $ überschreiten. Hier ist, was das bedeutet.',
    body: `
Die meisten Working Holiday Maker mit einer ABN müssen sich nicht für GST registrieren. Die Registrierungsschwelle für die Goods and Services Tax (GST) liegt bei 75.000 $ Jahresumsatz aus Geschäftstätigkeiten, und die große Mehrheit der Backpacker verdient während eines einzelnen Aufenthalts weit darunter. Die Ausnahme sind Rideshare- und Essenslieferung-Fahrer - die müssen sich unabhängig vom Einkommen registrieren. Wenn dein ABN-Umsatz unter 75.000 $ bleibt und du nicht im Rideshare oder Lieferdienst bist, kannst du GST komplett ignorieren.

## Was ist die GST-Registrierungsschwelle?

Die GST-Registrierungsschwelle basiert auf dem Jahresumsatz deiner Geschäftstätigkeit, nicht auf deinem Gesamteinkommen. Die wichtigsten Zahlen:

- Unter 75.000 $ ABN-Umsatz pro Jahr: GST-Registrierung ist für die meisten Tätigkeiten **nicht erforderlich**
- 75.000 $ oder mehr pro Jahr: GST-Registrierung ist **verpflichtend** innerhalb von 21 Tagen nach Überschreiten der Schwelle
- Freiwillige Registrierung ist unter der Schwelle möglich, lohnt sich aber selten für Working Holiday Maker

Umsatz bedeutet Bruttoeinkommen aus deinem Geschäft, vor Ausgaben. Anstellungseinkommen (über deine TFN gezahlt) zählt nicht zur Schwelle.

## Was passiert, wenn du nicht für GST registriert bist?

Wenn dein ABN-Umsatz unter 75.000 $ bleibt und du nicht im Rideshare oder Lieferdienst bist:

- Du berechnest keine GST auf deinen Rechnungen
- Du musst keine BAS (Business Activity Statements) beim ATO einreichen
- Deine einzige Steuerpflicht unter der ABN ist, dein Einkommen in deiner [jährlichen Steuererklärung](/de/tax-return) anzugeben und Einkommensteuer auf den Nettoertrag zu zahlen
- Du musst dich nicht um vierteljährliche GST-Meldungen kümmern

Das ist die normale Situation für fast alle Working Holiday Maker mit einer ABN.

## Wann gilt GST-Registrierung für dich?

GST-Registrierung ist erforderlich, wenn:

- Dein Geschäftsumsatz in einem 12-Monats-Zeitraum 75.000 $ erreicht oder überschreitet
- Du für Rideshare-Plattformen (Uber, DiDi, Ola) fährst, unabhängig vom Einkommen
- Du für Essenslieferung-Plattformen (Uber Eats, DoorDash, Menulog) fährst, unabhängig vom Einkommen
- Du Taxi-Dienste anbietest

Wenn du im Rideshare oder Lieferdienst bist, registriere dich ab Tag eins für GST - auch wenn du nur ein paar Fahrten machst. Die Plattformen erinnern Fahrer typischerweise daran, aber die Pflicht liegt bei dir.

## Was, wenn du dich für GST registrieren musst?

Wenn GST für dich gilt:

- Schlage 10 % auf deine Rechnungen und ziehe sie von Kunden ein
- Reiche eine BAS vierteljährlich ein (oder monatlich bei höherem Umsatz)
- Überweise die eingezogene GST ans ATO
- Du kannst GST, die du auf Geschäftsausgaben gezahlt hast, zurückholen

Ein registrierter Steueragent kann die BAS-Einreichung übernehmen und das vereinfachen.

## Was ist die Hauptsteuerpflicht für die meisten Contractors?

Für die meisten Working Holiday Maker mit einer [ABN](/de/abn) ist GST kein Thema. Deine echten Pflichten sind einfacher:

- Halte das ganze Jahr über Aufzeichnungen über alle Einkünfte
- Lege genug zurück, um die Einkommensteuer zu decken (etwa 15-20 % des Nettoertrags ist ein sicherer Startpunkt)
- Gib alles in deiner [Steuererklärung](/de/tax-return) am Ende des Steuerjahres an

[Kontaktiere unser Team](/de/contact) für Hilfe bei der ABN-Registrierung, GST- und BAS-Verwaltung oder beim Sortieren deiner Steuerposition am Jahresende.
 `,
  },

  'sole-trader-vs-company-australia-working-holiday': {
    title: 'Sole Trader vs. Company in Australien: was ist der Unterschied für Working Holiday Maker?',
    description: 'Die meisten Backpacker arbeiten als Sole Trader, aber eine Company ist eine Option. Hier sind die Unterschiede.',
    body: `
Für Working Holiday Maker fällt die Wahl zwischen Sole Trader und Company fast immer auf Sole Trader. Ein Sole Trader ist eine Einzelperson, die unter ihrem eigenen Namen (mit einer ABN) tätig ist - das Geschäftseinkommen fließt direkt in ihre persönliche Steuererklärung. Eine Company ist eine separate juristische Person mit ihrer eigenen ABN, Steuerpflichten und erheblichem Verwaltungsaufwand. Working Holiday Maker mit typischen Einkommen (5.000 $ bis 50.000 $ unter einer ABN) profitieren nicht von einer Company-Struktur. Unser Team registriert ABNs für Working Holiday Maker standardmäßig als Sole Trader.

## Was ist ein Sole Trader?

Ein Sole Trader ist eine Einzelperson, die ein Geschäft unter ihrem eigenen Namen betreibt:

- Keine rechtliche Trennung zwischen dir und dem Geschäft
- Geschäftseinkommen ist dein persönliches Einkommen
- Am Jahresende in deiner individuellen [Steuererklärung](/de/tax-return) gemeldet
- Du haftest persönlich für Geschäftsschulden
- Einfach zu registrieren und zu betreiben

Working Holiday Maker, die eine ABN für Subcontracting-Arbeit registrieren, sind Sole Trader. Du gibst deine ABN auf Rechnungen an, der Kunde zahlt dich direkt, und das Einkommen erscheint auf deiner persönlichen Steuererklärung.

## Was ist eine Company?

Eine Company (Pty Ltd) ist eine separate juristische Person:

- Hat ihre eigene ABN
- Hat ihre eigenen Steuerpflichten
- Zahlt Körperschaftssteuer zu einem festen Satz (25 % für kleine Unternehmen)
- Eigentümer erhalten Gehalt oder Dividenden, auf die sie persönliche Steuer zahlen
- Beschränkte Haftung schützt persönliches Vermögen

Companies erfordern:

- Registrierung bei ASIC (Australian Securities and Investments Commission)
- Laufende jährliche ASIC-Gebühren
- Separate Geschäftskonten
- Komplexere Steuererklärungen
- Meistens einen dedizierten Buchhalter
- Direktorenverantwortung und Berichtspflichten

Der Verwaltungsaufwand ist erheblich.

## Warum sind fast alle Working Holiday Maker Sole Trader?

Für den Umfang der Arbeit, die die meisten Working Holiday Maker machen, ist Sole Trader die richtige Struktur:

- Du verdienst Einkommen für Dienstleistungen, die du persönlich erbringst
- Keine Angestellten oder komplexen Geschäftsabläufe
- Einkommen typischerweise unter 50.000 $ pro Jahr
- Kein Bedarf an Vermögensschutz über Standardversicherungen hinaus
- Kein Steuervorteil aus einer Company-Struktur bei diesem Einkommensniveau

Eine Company macht Sinn, wenn:

- Mehrere Eigentümer das Geschäft teilen
- Persönliche Haftung ein großes Anliegen ist (manche spezialisierte Handwerke)
- Das Einkommen hoch genug ist, dass Steuerersparnisse die laufenden Kosten überwiegen (typischerweise 200.000 $+)
- Das Geschäft Angestellte oder erhebliches Vermögen hat

Nichts davon trifft typischerweise auf Working Holiday Maker zu.

## Wie unterscheiden sich die Steuersätze?

Für einen Working Holiday Maker:

- **Sole Trader**: 15 % auf die ersten 45.000 $ Geschäftseinkommen (Working Holiday Maker-Satz)
- **Company**: 25 % auf alles Geschäftseinkommen (fester Körperschaftssteuersatz)

Bei Working Holiday Maker-Einkommen ist der Sole-Trader-Satz deutlich niedriger. Der 15 %-Satz gilt bis 45.000 $, dann 30 % auf 45.000-135.000 $.

Für einen Working Holiday Maker, der 30.000 $ unter einer ABN verdient:

- Als Sole Trader: 4.500 $ Steuer (15 %)
- Als Company: 7.500 $ Steuer (25 %)

Plus hätte die Company laufende ASIC-Gebühren (~300 $/Jahr) und Buchhaltungskosten. Sole Trader ist klar besser.

## Was ist mit persönlicher Haftung?

Als Sole Trader ist dein persönliches Vermögen gefährdet, wenn das Geschäft Schulden macht oder Schaden verursacht:

- Für typische Working Holiday Maker-Arbeit (Reinigung, Gastronomie, einfache Handwerke) ist das ein minimales Risiko
- Versicherungen können die meisten Haftungsrisiken zu niedrigen Kosten abdecken
- Das Risiko ist meistens geringer als die Kosten der Company-Verwaltung

Für Working Holiday Maker mit riskanter spezialisierter Arbeit (Elektrik, Klempnerei mit Lizenzpflicht) bietet eine Company eventuell etwas Schutz. Aber diese spezialisierten Handwerke erfordern meistens Qualifikationen, die die meisten Working Holiday Maker nicht haben.

## Wie registrierst du dich als Sole Trader?

Der Prozess ist einfach:

1. [Kontaktiere unser Team](/de/abn)
2. Schick uns deine Daten
3. Wir registrieren deine ABN als Sole Trader (meistens innerhalb von 24 Stunden)
4. Du fängst an, unter deiner ABN Rechnungen zu stellen

Keine ASIC-Registrierung ist für Sole Trader nötig. Die ABN ist alles, was du zum Arbeiten brauchst.

## Was ist mit Partnerschaft oder Trust?

Andere Geschäftsstrukturen existieren, sind aber selten relevant für Working Holiday Maker:

- **Partnership**: zwei oder mehr Sole Trader teilen sich Geschäftseinkommen; komplexe Steuerbehandlung
- **Trust**: eine Struktur, die Vermögen/Einkommen im Auftrag von Begünstigten hält; hauptsächlich für Vermögensschutz
- **Company**: wie oben beschrieben

Für Working Holiday Maker ist Sole Trader die einfache, richtige Antwort in fast allen Fällen. Wenn deine Situation ungewöhnlich ist (erhebliches Kapital, mehrere Geschäftspartner), [kontaktiere unser Team](/de/abn) und wir besprechen Optionen.

[Kontaktiere unser Team](/de/contact) für Hilfe bei der ABN-Registrierung, GST- und BAS-Verwaltung oder beim Sortieren deiner Steuerposition am Jahresende.
 `,
  },

  'abn-invoicing-requirements-australia': {
    title: 'Wie du eine korrekte Tax Invoice mit einer ABN in Australien ausstellst',
    description: 'Tax Invoices müssen bestimmte Informationen enthalten, um gesetzlich gültig zu sein. Hier ist die komplette Anleitung.',
    body: `
Eine Tax Invoice, die unter einer Australian Business Number (ABN) ausgestellt wird, muss den Namen des Anbieters, die ABN, das Datum, eine Beschreibung der Waren oder Dienstleistungen und den Gesamtbetrag enthalten. Wenn die Rechnung mehr als 75 $ beträgt und der Anbieter für GST registriert ist, sind zusätzliche GST-Angaben erforderlich. Wenn ein Working Holiday Maker Dienstleistungen erbringt, ohne eine gültige ABN anzugeben, ist der Kunde gesetzlich verpflichtet, 47 % der Zahlung nach der No-ABN-Withholding-Regel einzubehalten.

Die Rechnung korrekt zu machen ist keine Formalität. Eine Rechnung mit fehlenden oder falschen Angaben kann vom Kunden abgelehnt werden, die Zahlung um Wochen verzögern oder eine ATO-Compliance-Prüfung auslösen.

## Was jede ABN-Rechnung enthalten muss

Für Rechnungen unter 75 $ (exklusive GST) sind die Mindestangaben:

- Der Name des Verkäufers (dein vollständiger rechtlicher Name, derselbe wie bei der ABN-Registrierung)
- Die ABN des Verkäufers
- Das Ausstellungsdatum
- Eine Beschreibung der Waren oder Dienstleistungen
- Der Gesamtbetrag

Für Rechnungen ab 75 $ (exklusive GST) gilt: wenn du nicht für GST registriert bist, gelten dieselben Angaben. Wenn du für GST registriert bist, muss die Rechnung zusätzlich enthalten:

- Die Worte "Tax Invoice" klar sichtbar
- Den GST-Betrag (oder eine Aussage, dass die Summe GST enthält)
- Den Namen oder die ABN des Käufers, wenn die Rechnung 1.000 $ oder mehr beträgt

Die meisten Working Holiday Maker mit einer ABN sind nicht für GST registriert, weil sie weit unter der 75.000 $-Umsatzschwelle verdienen. Siehe unseren Artikel zu [GST und ABN für Working Holiday Maker](/de/blog/gst-and-abn-for-working-holiday-makers) zu, wann GST-Registrierung erforderlich wird.

## Was passiert, wenn deine Rechnung keine ABN zeigt?

Unter der No-ABN-Withholding-Regel ist ein Unternehmen, das für Waren oder Dienstleistungen von jemandem zahlt, der keine ABN angibt, gesetzlich verpflichtet, 47 % der Zahlung einzubehalten und ans ATO abzuführen. Das gilt auch dann, wenn du eine gültige ABN hast, sie aber einfach auf der Rechnung vergessen hast.

Die 47 % einbehaltene Steuer kann mit deiner [Steuererklärung](/de/tax-return) am Ende des Steuerjahres zurückgeholt werden, aber bis dahin liegen sie beim ATO. Bei einer 2.000 $-Rechnung sind das 940 $, auf die du bis zur Bearbeitung der Steuererklärung keinen Zugriff hast.

## Welche Rechnungsfehler verzögern die Zahlung am häufigsten?

Auch mit allen erforderlichen Feldern lehnen Kunden Rechnungen regelmäßig ab wegen:

- Der Name auf der Rechnung stimmt nicht mit dem Namen überein, der bei der ABN registriert ist
- Tippfehler in der ABN (eine falsche Ziffer macht die ABN beim Lookup ungültig)
- Keine Rechnungsnummer bei laufender Arbeit (Kunden brauchen eine eindeutige Referenz für jede Rechnung)
- Datum im falschen Format (australische Daten sind TT/MM/JJJJ, nicht MM/TT/JJJJ)
- Fehlende Bankverbindung - der Kunde kann nicht zahlen

Die ABN auf jeder Rechnung kann der Kunde über das öffentliche ABN-Lookup-Tool verifizieren. Wenn Name und ABN nicht übereinstimmen, wird die Rechnung abgelehnt.

## Wie kümmert sich unser Service um ABN-Rechnungsstellung für Working Holiday Maker?

Wenn du eine ABN über unseren Service registrierst, richten wir deine ABN-Registrierung so ein, dass der Name, die Adresse und die Geschäftstätigkeit auf deinen Rechnungen dem offiziellen ATO-Datensatz entsprechen. Wir geben dir auch Empfehlungen zum korrekten Rechnungsformat für deine Arbeitsart - ob das Farm-Contracting, Gastronomie, Rideshare, Lieferung, Handwerk oder andere Contractor-Arbeit ist.

Zur Steuerzeit gleichen wir jede Rechnung, die du im Jahr ausgestellt hast, mit dem von deinen Kunden ans ATO gemeldeten Einkommen ab - so stellen wir sicher, dass kein Einkommen übersehen wird und keine zu hohe Einbehaltung passiert ist. Siehe unseren Artikel zu [wie du eine ABN registrierst](/de/blog/how-to-register-for-an-abn), wie du anfangen kannst, oder [kontaktiere unser Team](/de/contact) für direkte Hilfe.
 `,
  },

  // ─── More Tax Return posts ─────────────────────────────────────────────────
  'amending-tax-return-australia': {
    title: 'Kannst du eine Steuererklärung nach Einreichung in Australien ändern?',
    description: 'Du hast einen Fehler in deiner Steuererklärung gefunden? Hier ist, wie du sie änderst, wie lange du Zeit hast und was passiert.',
    body: `
Ja, du kannst eine Steuererklärung nach Einreichung in Australien ändern. Häufige Gründe für eine Änderung: eine Absetzung, die du vergessen hast, eine falsch eingegebene Einkommenszahl oder ein übersehener Offset. Die allgemeine Frist für Änderungen beträgt **zwei Jahre ab dem Datum der ursprünglichen Steuerbewertung**. Unser Team kümmert sich um Änderungen für Working Holiday Maker, auch aus dem Ausland. Proaktiv zu handeln, um Fehler zu beheben, ist viel besser, als zu warten, bis das ATO das Problem entdeckt.

## Kannst du eine eingereichte Steuererklärung ändern?

Ja. Australisches Steuerrecht erlaubt dir, eine Änderung zu beantragen, nachdem eine Steuererklärung bewertet wurde:

- Fehler korrigieren
- Fehlendes Einkommen hinzufügen
- Vergessene Absetzungen beantragen
- Übersehene Offsets anwenden (LITO, Small Business, Medicare Levy-Befreiung)
- Falsch eingegebene Zahlen aktualisieren

Der Änderungsprozess ist formal und muss schriftlich eingereicht werden (kann nicht telefonisch erledigt werden).

## Wie lange hast du Zeit zum Ändern?

Die Standard-Fristen:

- **Einzelpersonen und kleine Unternehmen**: 2 Jahre ab dem Datum der ursprünglichen Bewertung
- **Andere Steuerzahler**: 4 Jahre
- **Betrugs- oder Hinterziehungsfälle**: keine Frist (ATO kann jederzeit ändern)

Für Working Holiday Maker bedeutet das 2-Jahres-Fenster, dass du bis zwei Jahre nach Einreichung Zeit hast, Korrekturen vorzunehmen. Danach erfordern Änderungen einen besonderen Antrag und sind schwerer zu genehmigen.

## Wie reichst du eine Änderung ein?

Der Prozess über unser Team:

1. [Kontaktiere uns](/de/contact) mit dem identifizierten Problem
2. Schick uns die originale Steuererklärung und die nötige Korrektur
3. Wir bereiten die Änderung mit Belegen vor
4. Wir reichen die Änderung für dich ein
5. Das ATO bearbeitet (meistens ein paar Wochen bis zu ein paar Monate)
6. Eine eventuelle zusätzliche Rückzahlung wird auf dein angegebenes Konto überwiesen

Wenn du ursprünglich über unser Team eingereicht hast, haben wir deine Unterlagen und die Änderung ist einfach. Wenn du woanders eingereicht hast, können wir die Änderung trotzdem übernehmen, brauchen aber eine Kopie deiner ursprünglichen Steuererklärung.

## Was passiert mit deiner Rückzahlung während einer Änderung?

Das Ergebnis hängt davon ab, ob die Änderung die Rückzahlung erhöht oder verringert:

**Wenn die Änderung deine Rückzahlung erhöht:**
- Der zusätzliche Betrag wird auf dein Bankkonto überwiesen
- Bearbeitung dauert ein paar Wochen bis zu ein paar Monate
- Du bekommst die ursprüngliche Rückzahlung plus den zusätzlichen Betrag

**Wenn die Änderung deine Rückzahlung verringert:**
- Das ATO stellt eine überarbeitete Bewertung aus
- Du musst die Differenz zurückzahlen
- Meistens innerhalb von 21 Tagen nach der überarbeiteten Bewertung fällig
- Wir können einen Zahlungsplan arrangieren, falls nötig

## Kann das ATO deine Steuererklärung ändern?

Ja. Das ATO kann auch Änderungen initiieren:

- Frist: 2 Jahre für Standardfälle
- Keine Frist bei Betrug oder Hinterziehung
- Benachrichtigt dich über die Änderung per Bewertungsbescheid

Wenn das ATO deine Steuererklärung ändert und du nicht einverstanden bist, kannst du einen Einspruch über das formelle Berufungsverfahren einlegen. Siehe unseren Artikel zu [Einspruch gegen ATO-Entscheidungen](/de/blog/appealing-ato-decision-australia).

## Was, wenn du Australien schon verlassen hast?

Änderungen können von überall auf der Welt eingereicht werden:

- Unser Team verwaltet den Prozess remote
- Dein australisches Bankkonto bekommt eine eventuelle zusätzliche Rückzahlung
- Die 2-Jahres-Frist gilt unabhängig davon, wo du bist

Wenn du dein australisches Bankkonto geschlossen hast, [schick uns deine ausländischen Kontodaten](/de/contact) und wir arrangieren eine alternative Zahlung.

## Häufige Änderungen, die wir für Working Holiday Maker einreichen

Häufig korrigierte Posten:

- Medicare Levy-Befreiung nicht beantragt
- Übersehene arbeitsbezogene Absetzungen (Uniformen, Werkzeuge, Schulungen)
- ABN-Einkommen falsch gemeldet oder vergessen
- Falsche Tax-Withheld-Zahlen (Arbeitgeber-Meldungsfehler)
- Auslandseinkommen, das hätte ausgeschlossen werden sollen
- Falscher Residenzstatus angewendet

Die meisten Änderungen führen zu einer größeren Rückzahlung. Selbsteinreicher übersehen berechtigte Absetzungen und Offsets, die wir routinemäßig erfassen. Wenn du selbst eingereicht hast und eine zweite Meinung willst, [schick uns deine vorherige Steuererklärung](/de/contact) und wir prüfen sie kostenlos.
 `,
  },

  'ato-payment-plan-tax-debt-australia': {
    title: 'Was tun, wenn du deine Steuerschuld in Australien nicht zahlen kannst',
    description: 'Wenn du eine Steuerschuld hast, die du nicht in einer Summe zahlen kannst, kannst du einen Zahlungsplan mit dem ATO vereinbaren.',
    body: `
Wenn du deine australische Steuerrechnung nicht in voller Höhe bis zum Fälligkeitsdatum zahlen kannst, kannst du einen Zahlungsplan mit dem ATO vereinbaren, um in Raten über die Zeit zu zahlen. Zinsen fallen an (zum General Interest Charge-Satz, aktuell etwa 11 %), aber das ist viel besser, als die Schuld zu ignorieren - was zu höheren Strafen und Inkassomaßnahmen führt. Unser Team hilft Working Holiday Makern, ATO-Zahlungspläne zu vereinbaren, auch nach dem Verlassen Australiens. Steuerschulden verschwinden nicht, wenn du das Land verlässt.

## Was ist eine ATO-Zahlungsvereinbarung?

Eine Zahlungsvereinbarung ist ein formelles Abkommen, eine Steuerschuld in Raten statt als einmalige Pauschalsumme zu zahlen:

- Du nennst wöchentliche oder zweiwöchentliche Beträge, die du dir leisten kannst
- Die Gesamtschuld muss normalerweise innerhalb von 2 Jahren beglichen sein
- Zinsen fallen auf den ausstehenden Saldo an
- Die Vereinbarung schützt dich vor aktiven Inkassomaßnahmen

Das ATO akzeptiert in der Regel Zahlungspläne, wenn:

- Die Schuld in vernünftiger Höhe ist
- Du echte Unfähigkeit, in voller Höhe zu zahlen, nachweist
- Du eine stabile Einkommensquelle hast
- Du nicht vorher Vereinbarungen verletzt hast

## Wann ist deine Steuer fällig?

Steuerschulden haben spezifische Fälligkeitstermine:

- **Steuer aus deiner Steuererklärung (über einen Steueragenten eingereicht)**: meistens 21. November
- **Selbst eingereicht**: bis zum Datum auf deinem Bewertungsbescheid
- **Vierteljährliche BAS-Pflichten**: bis zu den vierteljährlichen Fälligkeitsterminen
- **Strafgebühr für verspätete Einreichung beginnt**: 28 Tage nach dem Einreichungsfälligkeitsdatum

Nach dem Fälligkeitsdatum beginnt der General Interest Charge täglich auf unbezahlte Beträge zu wachsen.

## Wie richtest du eine Zahlungsvereinbarung ein?

Über unser Team:

1. [Kontaktiere uns](/de/contact) mit Details zu deiner Steuerschuld
2. Wir bewerten den Betrag und deine Zahlungsfähigkeit
3. Wir verhandeln den Zahlungsplan mit dem ATO für dich
4. Wir bestätigen den Plan mit dir
5. Die Vereinbarung wird eingerichtet und deine Zahlungen beginnen

Über unseren Service strukturieren wir die Vereinbarung passend zu deiner spezifischen Situation:

- Wöchentliche oder zweiwöchentliche Raten
- Lastschrift von deinem Bankkonto
- Vernünftige Gesamtdauer (meistens 12-24 Monate)

Wir verhandeln typischerweise bessere Konditionen als Selbsteinreicher, weil wir verstehen, was das ATO akzeptiert.

## Was, wenn du Australien mit einer offenen Schuld verlässt?

Steuerschulden verschwinden **nicht**, wenn du gehst:

- Das ATO kann Schulden international eintreiben
- Erhebliche offene Beträge können zukünftige australische Visa-Anträge beeinflussen
- Das ATO kann gegen jedes australische Vermögen vorgehen, das du hältst
- Bankkonten und Investments bleiben für das ATO zugänglich

Wenn du planst, mit einer Schuld abzureisen:

- Richte den Zahlungsplan vor der Abreise ein (viel einfacher als aus dem Ausland)
- Nutze Lastschrift von deinem australischen Bankkonto
- Halte dieses Konto offen, bis die Schuld beglichen ist
- Lass unser Team die Kommunikation nach deiner Abreise verwalten

## Welche Strafen gelten, wenn du eine Steuerschuld ignorierst?

Das ATO hat mehrere Strafen für Nichtzahlung:

- **General Interest Charge (GIC)**: aktuell etwa 11 % pro Jahr, täglich verzinst
- **Failure-to-Lodge-Strafe**: 313 $ pro 28 Tage verspätet, bis zu maximal 1.565 $
- **Tax Debt Disclosure**: große Schulden können an Auskunfteien gemeldet werden
- **Direktoren-Strafbescheide** (für Steuerschulden von Unternehmen)
- **Pfändungsbescheide**: ATO kann deinen Arbeitgeber anweisen, Steuer von deinem Lohn abzuziehen

Diese Strafen können manchmal reduziert oder erlassen werden, wenn du früh handelst und echte Härte nachweist. Nichts zu tun macht die Situation immer schlimmer.

## Was ist das Wichtigste?

Früh handeln. Das ATO ist flexibler, wenn du proaktiv auf sie zugehst, als wenn sie dir hinterherjagen müssen. Konkret:

1. Ignoriere keine ATO-Rechnung
2. [Kontaktiere unser Team](/de/contact) vor dem Fälligkeitsdatum, falls du nicht zahlen kannst
3. Wir können einen Zahlungsplan verhandeln
4. Wir können in manchen Fällen Strafnachlass beantragen
5. Wir können das Inkasso aufschieben lassen, falls ein Einspruch anhängig ist

Das schlechteste Ergebnis ist Schweigen gefolgt von Inkassomaßnahmen. Das beste Ergebnis ist ein strukturierter Plan, der zu deinem Budget passt.

## Können wir Strafnachlass beantragen?

Ja, in bestimmten Umständen:

- Erstmalige Fehler
- Echtes Missverständnis der Pflichten
- Schwere Krankheit oder andere außergewöhnliche Umstände
- Wesentliche Einhaltung folgender Pflichten

Wir beantragen Strafnachlass, wenn berechtigt. Auch wenn nicht alle Strafen entfernt werden, ist teilweiser Nachlass oft erreichbar.

[Kontaktiere unser Team](/de/contact), sobald du von einer Steuerschuld erfährst. Je früher wir handeln, desto besser das Ergebnis.
 `,
  },

  'tax-return-without-tfn-australia': {
    title: 'Kannst du in Australien eine Steuererklärung machen, wenn du ohne TFN gearbeitet hast?',
    description: 'Ja - und wenn du ohne TFN gearbeitet hast, hast du wahrscheinlich Anspruch auf eine große Rückzahlung. Hier ist die Anleitung.',
    body: `
Ein Working Holiday Maker, der in Australien ohne Tax File Number (TFN) gearbeitet hat, kann trotzdem eine Steuererklärung einreichen und die zu viel einbehaltene Steuer zurückholen. Ohne hinterlegte TFN sind Arbeitgeber gesetzlich verpflichtet, Steuer zum höchsten Grenzsteuersatz von 45 % einzubehalten statt zum 15 %-Working Holiday Maker-Satz. Die Differenz ist erstattbar, aber die [Steuererklärung](/de/tax-return) kann nicht eingereicht werden, ohne vorher eine TFN zu bekommen.

Je länger du den TFN-Antrag verzögerst, desto komplexer wird die Steuererklärung - weil Arbeitgeber dein Einkommen eventuell nicht mehr melden oder falsche Daten hinterlegt haben.

## Wie viel Extra-Steuer wird ohne TFN einbehalten?

Der Unterschied zwischen dem No-TFN-Satz und dem Working Holiday Maker-Satz ist erheblich:

- Mit TFN: 15 % einbehalten auf die ersten 45.000 $ Working Holiday-Einkommen
- Ohne TFN: 45 % einbehalten auf jeden Dollar ab der ersten Woche

Bei einem Wochenlohn von 1.000 $ sind das 300 $ Extra-Einbehalt jede Woche. Über einen dreimonatigen Vollzeit-Arbeitszeitraum sind das über 3.500 $ einbehalten, die du mit hinterlegter TFN nie gezahlt hättest. Diese Überzahlung ist mit einer Steuererklärung voll zurückzuholen.

## Was du tun musst, bevor du einreichen kannst

Eine Steuererklärung kann nicht ohne TFN eingereicht werden. Der erste Schritt ist also [TFN beantragen](/de/tfn-form), falls du noch keine hast. Sobald die TFN ausgestellt ist, kann die Steuererklärung für jedes Jahr eingereicht werden, in dem du Einkommen hattest - auch für vergangene Steuerjahre, wenn du damals nicht eingereicht hast.

Wenn du Australien schon verlassen hast, kannst du trotzdem eine TFN beantragen und eine Steuererklärung aus dem Ausland einreichen. Siehe unseren Artikel zu [wie du eine Steuererklärung aus dem Ausland einreichst](/de/blog/how-to-lodge-tax-return-from-overseas) für mehr Details.

## Welche Unterlagen brauchst du?

Um eine Steuererklärung über Arbeit ohne TFN einzureichen, braucht unser Team:

- Deine TFN (sobald ausgestellt)
- Deine Reisepass- und Visa-Daten für den Arbeitszeitraum
- Details zu jedem Arbeitgeber, für den du gearbeitet hast, einschließlich Firmenname und ABN falls bekannt
- Alle Lohnzettel, die du behalten hast, die die einbehaltene Steuer zeigen
- Ein australisches Bankkonto für die Rückzahlung

Auch wenn du keine Lohnzettel hast, hat das ATO Aufzeichnungen über Einkommen, das Arbeitgeber unter dem Single Touch Payroll-System gemeldet haben. Über unser Steueragenten-Portal können wir auf die ATO-Aufzeichnungen jedes Arbeitgebers zugreifen, der Einkommen für dich im Steuerjahr gemeldet hat - einschließlich Bruttolohn und einbehaltener Steuer.

## Was, wenn ein Arbeitgeber dein Einkommen nicht gemeldet hat?

Manche Arbeitgeber, besonders in Schwarzarbeit-Branchen, melden Einkommen nicht ans ATO. Wenn du bar ohne TFN bezahlt wurdest, erscheint das Einkommen eventuell nicht in der ATO-Aufzeichnung. In diesem Fall ist die Steuererklärung komplexer, und die Strategie hängt davon ab, ob der Arbeitgeber hätte melden sollen und ob du eigene Belege hast. Siehe unseren Artikel zu [Schwarzarbeit-Steuererklärungen](/de/blog/cash-in-hand-tax-return) für die detaillierten Regeln.

## Wie kümmert sich unser Service um eine Steuererklärung nach Arbeit ohne TFN?

Wenn du über unseren Service einreichst, nachdem du ohne TFN gearbeitet hast, kümmert sich unser Team um:

- Beantragung deiner TFN, falls du noch keine hast, über unseren [TFN-Antragsservice](/de/tfn-form)
- Zugriff auf die ATO-Einkommensaufzeichnung, sobald deine TFN aktiv ist, um jeden Arbeitgeber zu identifizieren, der Einkommen für dich gemeldet hat
- Abgleich des gemeldeten Einkommens mit allen Lohnzetteln, die du uns gibst, damit nichts übersehen wird
- Einreichung der Steuererklärung mit Anspruch auf die Differenz zwischen 45 %-No-TFN-Satz und 15 %-Working Holiday Maker-Satz

Die Rückzahlung für ein Jahr ohne TFN gearbeitet ist oft mehrere Tausend Dollar höher als eine Standard-Steuererklärung wegen der Übereinbehaltung. [Kontaktiere unser Team](/de/contact), um deine Steuererklärung einzureichen und die zu viel gezahlte Steuer zurückzuholen.

## Was ist mit Identitätsschutz?

Falls du ohne TFN gearbeitet hast, weil du unsicher warst, wie das System funktioniert: Lass dich nicht in Versuchung führen, deine Daten mit Fremden online zu teilen, die Steuerhilfe anbieten. Backpacker-Facebook-Gruppen, WhatsApp-Communities und Messaging-Apps sind voller Betrüger, die Working Holiday Maker ins Visier nehmen, die sich überfordert fühlen. Teile deine TFN, deinen Reisepass oder deine Visa-Bewilligung niemals mit jemandem, der kein registrierter Steueragent ist. Ein registrierter Agent ist im Tax Practitioners Board-Register mit einer verifizierbaren TAN-Nummer aufgeführt. Wenn er dir keine TAN zeigen kann, gib keine Dokumente heraus.
 `,
  },

  'multiple-jobs-tax-return-working-holiday': {
    title: 'Wie du eine Steuererklärung einreichst, wenn du in Australien mehrere Jobs hattest',
    description: 'Mehrere Arbeitgeber bedeuten, dass mehrere Income Statements abgeglichen werden müssen. Hier ist, wie es funktioniert.',
    body: `
Ein Working Holiday Maker, der während eines Steuerjahres mehrere Jobs hatte, muss das Einkommen jedes Arbeitgebers auf einer einzigen Steuererklärung angeben. Jeder Arbeitgeber meldet deinen Lohn und die einbehaltene Steuer separat ans ATO unter dem Single Touch Payroll-System, und die [Steuererklärung](/de/tax-return) muss mit dem kombinierten Total übereinstimmen. Einen Arbeitgeber zu übersehen - auch einen, bei dem du nur eine Woche warst - erzeugt eine Diskrepanz, die das ATO erkennt und nach Einreichung korrigiert, was oft eine Folge-Bewertung auslöst.

Mehrere Jobs machen eine Steuererklärung komplexer, aber sie schaffen auch mehr Chancen auf Rückzahlungen, weil die Working Holiday Maker-Steuerklassen über das kombinierte Einkommen angewendet werden.

## Wie weiß das ATO über jeden Arbeitgeber Bescheid?

Seit Single Touch Payroll in Australien universal wurde, ist jeder Arbeitgeber verpflichtet, deinen Lohn, die einbehaltene Steuer und die Super direkt ans ATO mit jeder Lohnauszahlung zu melden. Am Ende des Steuerjahres hat das ATO eine vollständige Aufzeichnung über:

- Jedes Unternehmen, das dir Lohn gezahlt hat, und die Beschäftigungsdaten
- Gesamten Bruttolohn von jedem Arbeitgeber
- Gesamte einbehaltene Steuer von jedem Arbeitgeber
- Super-Beiträge, die an jeden Fonds gemeldet wurden

Wenn wir über unser Steueragenten-Portal einreichen, sehen wir diese kombinierte Aufzeichnung vor der Erstellung deiner Steuererklärung. Das heißt, wir identifizieren Arbeitgeber, die du eventuell vergessen hast (eine Wochen-Probearbeit in einer Küche, eine Casual-Schicht bei einem Musikfestival, ein Job über eine Zeitarbeitsfirma) und nehmen sie in die Steuererklärung auf.

## Warum verursacht ein übersehener Arbeitgeber Probleme?

Wenn du eine Steuererklärung einreichst, die nur einen Teil deiner Arbeitgeber enthält, vergleicht das ATO deine Steuererklärung mit seiner Single Touch Payroll-Aufzeichnung und identifiziert die Lücke. Die Steuererklärung wird typischerweise mit der niedrigeren gemeldeten Zahl zuerst bearbeitet, die Rückzahlung wird gezahlt, und Wochen oder Monate später stellt das ATO eine angepasste Bewertung aus, die das fehlende Einkommen hinzufügt. Das führt oft zu:

- Einer Steuerschuld zurückzuzahlen, manchmal aus einer Rückzahlung, die du schon ausgegeben hast
- Zinsen auf die Schuld
- Einer General Interest Charge, die täglich zinst
- Möglichen Strafen, wenn die Auslassung erheblich war

Es ist viel einfacher, beim ersten Mal korrekt einzureichen, als später mit einer angepassten Bewertung umzugehen.

## Der Steuerklassen-Effekt bei mehreren Arbeitgebern

Wenn du mehrere Arbeitgeber hast, behält jeder Steuer ein basierend auf dem Einkommen, das er dir zahlt, nicht auf deinem Gesamteinkommen über alle Jobs. Das heißt, die Freibeträge und Klassensätze können mehrmals während des Jahres angewendet werden - wodurch du am Jahresende unter-einbehalten bist. Working Holiday Maker haben keinen Freibetrag, aber der Klasseneffekt gilt trotzdem: bei 45.000 $ kombiniertem Einkommen springt der Satz von 15 % auf 30 %, und einzelne Arbeitgeber behalten eventuell nicht genug ein, um den höheren Satz auf kombinierte Einkünfte zu decken.

Das Gegenteil kann auch wahr sein: Working Holiday Maker ohne hinterlegte TFN bei einem Arbeitgeber wurden mit 45 % einbehalten, was eine große Rückzahlung erzeugt, sobald das kombinierte Einkommen gegen die korrekte Klassenstruktur bewertet wird.

## Welche Unterlagen sind nützlich, wenn du mehrere Arbeitgeber hattest?

Wenn du über unseren Service einreichst, musst du keine Lohnzettel von jedem Arbeitgeber sammeln. Wir greifen direkt auf die ATO-Aufzeichnung zu, um zu sehen, was jeder Arbeitgeber gemeldet hat. Die Unterlagen, die trotzdem nützlich sind:

- Alle Lohnzettel oder Endabrechnungen, die du behalten hast (hilfreich als Querverweis)
- Details über Barzahlungen, die nicht über Single Touch Payroll gemeldet wurden
- Aufzeichnungen über arbeitsbezogene Ausgaben bei jedem Job
- Fahrten zwischen Arbeitsorten (in manchen Fällen absetzbar)

## Wie kümmert sich unser Service um Steuererklärungen mit mehreren Arbeitgebern?

Für Working Holiday Maker mit mehreren Jobs in einem Steuerjahr:

- Wir greifen über unser Steueragenten-Portal auf die vollständige ATO-Einkommensaufzeichnung zu
- Wir identifizieren jeden Arbeitgeber, der Einkommen gemeldet hat, einschließlich derer, die der Arbeiter eventuell vergessen hat
- Wir gleichen die ATO-Aufzeichnung mit allen Lohnzetteln und Endabrechnungen ab, die uns gegeben wurden
- Wir warten, bis alle Arbeitgeber-Meldungen abgeschlossen sind (manche Arbeitgeber schließen spät ab, was Anpassungen auslösen kann, wenn die Steuererklärung zu früh eingereicht wird)
- Wir wenden die korrekten Working Holiday Maker-Sätze über das kombinierte Einkommen an
- Wir identifizieren alle arbeitsbezogenen Absetzungen über alle Jobs hinweg

[Kontaktiere unser Team](/de/contact), um eine Steuererklärung einzureichen, die jeden Arbeitgeber beim ersten Mal sauber erfasst - und spätere angepasste Bewertungen vermeidet.
 `,
  },

  'late-tax-return-penalty-working-holiday': {
    title: 'Was ist die Strafe für eine verspätete Steuererklärung als Working Holiday Maker?',
    description: 'Verspätete Steuererklärungen können Strafgebühren auslösen. Hier ist, wie viel und was du tun kannst.',
    body: `
Das ATO erhebt eine Failure to Lodge (FTL)-Strafe von einer Penalty Unit für jeden 28-Tage-Zeitraum, dass eine [Steuererklärung](/de/tax-return) überfällig ist - bis zu maximal fünf Penalty Units. Ab dem Steuerjahr 2025-26 beträgt eine Penalty Unit 222 $, was die maximale FTL-Strafe auf 1.110 $ bringt. Die Strafe gilt unabhängig davon, ob du Steuer schuldest: Ein Working Holiday Maker, dem eigentlich eine Rückzahlung zusteht, kann trotzdem eine Failure to Lodge-Strafe für verspätete Einreichung bekommen.

Die Strafe ist selten die größten Kosten einer verspäteten Steuererklärung. Für Working Holiday Maker ist das größere Problem meistens eine verzögerte Rückzahlung und die Folgewirkungen auf DASP, zweite Visa-Anträge und ATO-Compliance-Flags.

## Wann ist eine Steuererklärung fällig?

Für Working Holiday Maker, die ihre eigene Steuererklärung einreichen, ist die Frist der 31. Oktober nach Ende des Steuerjahres (das vom 1. Juli bis 30. Juni läuft). Eine Steuererklärung für das Steuerjahr 2024-25 ist also bis zum 31. Oktober 2025 fällig.

Working Holiday Maker, die über einen registrierten Steueragenten einreichen, haben eine spätere Frist. Steueragenten können für ihre Mandanten bis spät in den Mai des Folgejahres einreichen - vorausgesetzt, der Mandant war vor der Standard-31.-Oktober-Frist beim Agenten registriert.

Diese Verlängerung ist einer der praktischen Vorteile beim Einreichen über einen Steueragenten - besonders für Working Holiday Maker, die noch in Australien sind oder erst kürzlich abgereist sind.

## Wie wird die Strafe berechnet?

Die Failure to Lodge-Strafe steigt alle 28 Tage, dass die Steuererklärung überfällig ist:

- 1 bis 28 Tage verspätet: 1 Penalty Unit = 222 $
- 29 bis 56 Tage verspätet: 2 Penalty Units = 444 $
- 57 bis 84 Tage verspätet: 3 Penalty Units = 666 $
- 85 bis 112 Tage verspätet: 4 Penalty Units = 888 $
- 113 Tage oder mehr verspätet: 5 Penalty Units = 1.110 $ (Maximum)

Die maximale Strafe ist bei 1.110 $ gedeckelt, egal wie spät die Steuererklärung ist.

## Was, wenn dir eine Rückzahlung zusteht?

Ein Working Holiday Maker, dem eine Rückzahlung zusteht, kann trotzdem eine Failure to Lodge-Strafe für verspätete Einreichung bekommen. Die ATO-Position ist, dass die Einreichungspflicht unabhängig davon ist, ob Steuer geschuldet wird. In der Praxis wendet das ATO die Strafe oft nicht für verspätete Rückzahlungs-Steuererklärungen von Working Holiday Makern an, aber es hat das gesetzliche Recht dazu - und die Strafe wurde in Fällen angewendet, in denen das ATO die Verspätung als absichtlich ansieht oder ein Muster verspäteter Einreichungen über mehrere Jahre besteht.

## Was, wenn dir nichts zusteht oder du eine kleine Summe schuldest?

Die Failure to Lodge-Strafe ist dieselbe, egal ob du Steuer schuldest. Ein Working Holiday Maker mit einem Null-Steuerausgang (keine Rückzahlung, keine Schuld) kann trotzdem mit der vollen 1.110 $-Maximalstrafe für eine Steuererklärung getroffen werden, die mehr als 112 Tage überfällig ist.

## Wann werden Zinsen zusätzlich erhoben?

Wenn die verspätete Steuererklärung zu einer Steuerschuld führt, erhebt das ATO außerdem die **General Interest Charge** auf den unbezahlten Betrag ab dem ursprünglichen Fälligkeitsdatum. Der General Interest Charge-Satz zinst täglich und liegt derzeit deutlich über dem Leitzins. Eine kleine Steuerschuld, die mehrere Jahre unbezahlt bleibt, kann erheblich wachsen.

Die General Interest Charge gilt nicht, wenn die Steuererklärung zu einer Rückzahlung oder einem Nullergebnis führt.

## Kann die Strafe erlassen werden?

Das ATO hat Ermessen, die Failure to Lodge-Strafe in manchen Umständen zu erlassen (annullieren oder reduzieren):

- Echte Krankheit oder Krankenhausaufenthalt des Steuerpflichtigen zum Zeitpunkt der Frist
- Familientrauerfall
- Naturkatastrophe oder anderes Ereignis außerhalb der Kontrolle des Steuerpflichtigen
- ATO-System- oder Bearbeitungsprobleme, die die Einreichung verhindert haben
- Erstmalige verspätete Einreichung mit ansonsten sauberer Compliance-Historie

Ein Erlass muss spezifisch beantragt und durch Belege gestützt werden. Die Erlass-Rate für Working Holiday Maker ist generell höher, wenn der Antrag über einen registrierten Steueragenten gestellt wird, statt direkt vom Steuerpflichtigen.

## Was ist mit Steuererklärungen aus Jahren, in denen du Australien schon verlassen hast?

Working Holiday Maker, die Australien ohne Einreichung ihrer letzten Steuererklärung verlassen haben, haften weiterhin für Failure to Lodge-Strafen für Steuererklärungen, die hätten eingereicht werden sollen. Das ATO verfolgt nicht immer aktiv Working Holiday Maker im Ausland für kleine Strafbeträge, aber die Schuld liegt in der ATO-Aufzeichnung und kann:

- Mit zukünftigen Rückzahlungen verrechnet werden (einschließlich der DASP-Zahlung des Working Holiday Makers in manchen Fällen)
- Einen zukünftigen australischen Visa-Antrag blockieren
- An internationale Inkassobüros überwiesen werden, wenn der Betrag groß genug ist

Verspätete Steuererklärungen aus dem Ausland einzureichen ist generell immer noch besser als gar nicht einzureichen.

## Wie wirkt sich das auf zweite und dritte Visa-Anträge aus?

Anträge für ein zweites und drittes Working Holiday Visum können durch ein ungelöstes ATO-Compliance-Problem beeinflusst werden. Wenn du ausstehende Failure to Lodge-Strafen, nicht eingereichte Steuererklärungen oder unbezahlte Steuerschulden hast, kann das Department of Home Affairs den Antrag für zusätzliche Prüfung markieren. Die ATO-Position vor dem Antrag für das nächste Visum zu klären, vermeidet dieses Risiko.

## Wie kümmert sich unser Service um verspätete Steuererklärungen?

Für Working Holiday Maker mit überfälligen Steuererklärungen:

- Wir reichen jede überfällige Steuererklärung über unser Steueragenten-Portal ein
- Wir beantragen Erlass jeder Failure to Lodge-Strafe, wo es Gründe gibt
- Wir gleichen die ATO-Aufzeichnung über mehrere Jahre ab, damit kein Einkommen übersehen wurde
- Wir koordinieren das [DASP](/de/blog/what-is-dasp-super-withdrawal)-Timing, wo relevant
- Wir verfolgen jede aus früheren Jahren geschuldete Rückzahlung (Rückzahlungsansprüche bleiben bis zu vier Jahre einklagbar)

Eine verspätete Steuererklärung ist selten irreparabel. [Kontaktiere unser Team](/de/contact), um deine Einreichungen auf den aktuellen Stand zu bringen und jede ausstehende Strafposition zu lösen.
 `,
  },

  'tools-equipment-under-300-instant-deduction-whv': {
    title: 'Sofortabschreibung für Werkzeuge und Ausrüstung unter 300 $ als Working Holiday Maker',
    description: 'Werkzeuge unter 300 $ können vollständig im Kaufjahr abgesetzt werden. Hier ist, wie es funktioniert.',
  },

  // ─── More Super posts ──────────────────────────────────────────────────────
  'tax-on-super-withdrawal-backpacker': {
    title: 'Welche Steuer wird abgezogen, wenn du deine Super als Backpacker auszahlst?',
    description: 'DASP-Auszahlungen werden mit 65 % besteuert. Hier ist, wie das berechnet wird und was nach Steuern übrig bleibt.',
  },

  'what-happens-to-unclaimed-super': {
    title: 'Was passiert mit deiner Super, wenn du sie nie beantragst?',
    description: 'Nicht beantragte Super wird nach 6 Monaten ans ATO übertragen. Hier ist, wie du sie immer noch zurückbekommen kannst.',
  },

  'can-you-withdraw-super-in-australia': {
    title: 'Kannst du deine Super zurückziehen, während du noch in Australien bist?',
    description: 'Generell nein - DASP gilt nur, wenn du Australien verlassen hast. Hier sind die seltenen Ausnahmen.',
  },

  'how-to-find-lost-superannuation': {
    title: 'Wie du verlorene oder nicht beantragte Super in Australien findest',
    description: 'Hast du Super von einem alten Job vergessen? Hier ist, wie du sie findest und beantragst.',
  },

  'how-to-choose-super-fund': {
    title: 'Was ist ein Super-Fonds und wie wählst du einen?',
    description: 'Wenn du in Australien anfängst zu arbeiten, kannst du deinen Super-Fonds wählen. Hier ist, worauf du achten solltest.',
  },

  'super-for-casual-and-part-time-workers': {
    title: 'Haben Casual- und Teilzeit-Arbeiter in Australien Anspruch auf Super?',
    description: 'Ja - alle Arbeitnehmer haben Anspruch auf Super, unabhängig von der Arbeitsart. Hier sind die Details.',
  },

  'how-to-check-super-balance-working-holiday': {
    title: 'Wie du dein Super-Guthaben als Working Holiday Maker prüfst',
    description: 'Du kannst dein Super-Guthaben online prüfen. Hier sind die einfachsten Wege.',
  },

  'dasp-documents-required': {
    title: 'Welche Dokumente brauchst du für einen DASP Super-Auszahlungsantrag?',
    description: 'Für DASP brauchst du Reisepass, TFN, Visa-Daten und Super-Fonds-Infos. Hier ist die komplette Liste.',
  },

  // ─── More Medicare & Other posts ───────────────────────────────────────────
  'what-is-an-income-statement': {
    title: 'Was ist ein Income Statement in Australien und wie greifst du auf deines zu?',
    description: 'Ein Income Statement ersetzt das alte PAYG Payment Summary. Hier ist, was es ist und wie du darauf zugreifst.',
  },

  'what-is-the-ato': {
    title: 'Was ist das ATO und was macht es?',
    description: 'Die Australian Taxation Office (ATO) ist Australiens Finanzamt. Hier ist, was es macht und wann du Kontakt haben wirst.',
  },

  'gross-pay-vs-net-pay-australia': {
    title: 'Was ist der Unterschied zwischen Brutto- und Nettolohn in Australien?',
    description: 'Brutto ist das, was du verdienst; Netto ist das, was nach Steuer auf dein Konto kommt. Hier ist die Berechnung.',
  },

  'tax-obligations-after-leaving-australia': {
    title: 'Was passiert mit deinen australischen Steuerpflichten, nachdem du das Land verlassen hast?',
    description: 'Australien zu verlassen heißt nicht, dass deine Steuerpflichten enden. Hier ist, was du noch erledigen musst.',
  },

  'opening-bank-account-australia-working-holiday': {
    title: 'Wie du als Working Holiday Maker ein Bankkonto in Australien eröffnest',
    description: 'Ein australisches Bankkonto ist essentiell für deinen Working Holiday. Hier sind die Banken und Schritte.',
  },

  'german-european-health-insurance-australia-working-holiday': {
    title: 'Krankenversicherung für deutsche Working Holiday Maker in Australien: welche Deckung brauchst du?',
    description: 'Da Deutschland kein RHCA mit Australien hat, brauchst du eine private Krankenversicherung. Hier sind die Optionen.',
    body: `
Deutschland hat kein Sozialversicherungsabkommen (RHCA) mit Australien. Deutsche Working Holiday Maker sind daher nicht für [Medicare](/de/medicare) berechtigt und können sich nicht auf das australische öffentliche Gesundheitssystem für kostenlose oder vergünstigte Behandlung verlassen. Jede medizinische Behandlung in Australien muss durch eine private Krankenversicherung, Reiseversicherung oder aus eigener Tasche bezahlt werden. Das ist einer der bedeutendsten praktischen Unterschiede zwischen einer Reise nach Australien als deutscher Bürger und einer Reise als britischer oder irischer Bürger.

Ohne richtige Versicherung kann ein einzelner Krankenhausaufenthalt in Australien Zehntausende Euro kosten. Deutsche Reisende unterschätzen die Lücke regelmäßig, weil ihre Erfahrung mit der gesetzlichen Krankenversicherung in Deutschland sie nicht auf ein Land vorbereitet, in dem Behandlung im Voraus bezahlt werden muss.

## Welche Länder haben RHCAs mit Australien?

Australien hat Sozialversicherungsabkommen mit einer begrenzten Liste von Ländern. Die aktuelle Liste:

- Großbritannien
- Irland
- Neuseeland
- Schweden
- Niederlande
- Finnland
- Norwegen
- Belgien
- Slowenien
- Malta
- Italien

**Deutschland ist nicht auf der Liste.** Auch Frankreich, Spanien, Österreich, die Schweiz, die USA, Kanada oder Japan sind nicht dabei. Siehe unseren Artikel zu [welche Länder ein Medicare-Abkommen mit Australien haben](/de/blog/countries-with-medicare-agreement-australia) für alle Details.

## Was bedeutet das in der Praxis?

Ohne RHCA-Abdeckung wird ein deutscher Working Holiday Maker, der medizinische Behandlung in Australien braucht, als Privatpatient behandelt. Die Kosten umfassen:

- **Hausarztbesuch**: typischerweise 80 bis 120 $ für eine Standard-Konsultation
- **Facharztbesuch**: 200 bis 400 $
- **Notaufnahme-Besuch**: 400 bis 800 $ für einen nicht stationären Besuch
- **Krankenhausaufenthalt**: 1.500 bis 5.000 $ pro Tag in einem öffentlichen Krankenhaus als Privatpatient
- **Operationen**: 10.000 bis 100.000+ $ je nach Eingriff
- **Krankenwagen**: 400 bis 1.500 $ pro Fahrt (auch nicht von Medicare abgedeckt für irgendjemanden)
- **Verschreibungspflichtige Medikamente**: voller Preis (keine PBS-Bezuschussung)

Behandlung wird bei echten Notfällen unabhängig von der Zahlungsfähigkeit geleistet, aber die Rechnungen folgen danach. Australische Krankenhäuser verfolgen routinemäßig Auslandspatienten für unbezahlte Rechnungen durch internationale Inkassobüros.

## Welche Versicherung ist für das Working Holiday Visum erforderlich?

Das deutsche Working Holiday Visum für Australien (Subclass 462 für Deutsche unter dem Work and Holiday Programme) erfordert eine angemessene Krankenversicherung für die Dauer des Aufenthalts als Bewilligungsbedingung. Das Department of Home Affairs gibt kein bestimmtes Versicherungsprodukt vor, aber die Abdeckung muss:

- Für die volle Visumsdauer gültig sein
- Mindestens grundlegende medizinische Behandlung in Australien abdecken
- Eine Rückführung bei Bedarf abdecken

In der Praxis erfüllen die meisten deutschen Working Holiday Maker diese Anforderung durch eine der folgenden Optionen:

- Eine umfassende Reiseversicherung für die volle Visumsdauer
- Australian Overseas Visitors Health Cover (OVHC), gekauft bei einer australischen privaten Krankenkasse
- Eine Kombination aus beidem

Die australische OVHC-Option ist weitgehend gleichwertig zu Medicare und wird monatsweise oder für die volle Visumsdauer gekauft.

## Reiseversicherung vs. Overseas Visitors Health Cover

Die beiden Optionen haben unterschiedliche Stärken:

**Reiseversicherung**:
- Deckt eine breitere Palette von Risiken ab (Stornierungen, Gepäckverlust, Diebstahl)
- Beinhaltet Rückführung
- Hat meist höhere Selbstbehalte
- Schließt oft Vorerkrankungen aus
- Begrenzte Laufzeit (meistens maximal 12 Monate)

**OVHC**:
- Speziell auf Australien zugeschnitten
- Funktioniert ähnlich wie Medicare bei australischen Anbietern
- Längere Laufzeiten möglich (für volle Visumsdauer)
- Deckt Vorerkrankungen nach Wartezeit ab
- Deckt nicht Nicht-Medizinisches ab (kein Gepäck, keine Stornierungen)

Viele deutsche Working Holiday Maker entscheiden sich für eine Reiseversicherung von zu Hause aus für die ersten paar Monate und schließen dann eine OVHC ab, sobald sie sich in Australien etabliert haben - besonders wenn sie länger als ein Jahr bleiben.

## Bekannte deutsche Anbieter mit Australien-Abdeckung

Mehrere deutsche Anbieter spezialisieren sich auf Langzeit-Auslandsabdeckung für Backpacker:

- **HanseMerkur**: bietet Reiseversicherung speziell für Work & Travel
- **Care Concept**: deckt bis zu 5 Jahre Auslandsaufenthalt
- **DR-WALTER**: spezialisiert auf Auslandskrankenversicherung
- **STA Travel/Statravel-Versicherung**: für junge Reisende konzipiert

Vergleiche immer die spezifischen Abdeckungsdetails - Höchstbeträge, Selbstbehalte, Ausschlüsse für Vorerkrankungen und Rückführungsabdeckung. Was günstig aussieht, ist nicht immer ausreichend.

## Australische OVHC-Anbieter

Wenn du in Australien private Krankenversicherung abschließen willst, sind die Hauptanbieter:

- **Bupa Australia**
- **Medibank**
- **NIB**
- **HCF**
- **Allianz Care Australia**

Die meisten erlauben dir, online vor deiner Ankunft beizutreten oder die Abdeckung anzupassen, sobald du im Land bist.

## Was deckt eine gute Police ab?

Eine angemessene Police für einen deutschen Working Holiday Maker sollte mindestens umfassen:

- Hausarzt- und Facharztbesuche (Erstattung des Anbieters)
- Notfall-Krankenhausaufenthalte (öffentlich und privat)
- Verschreibungspflichtige Medikamente
- Diagnostische Bildgebung und Pathologie
- Krankenwagen-Dienste
- Repatriierung im Falle einer schweren Krankheit oder Verletzung
- Zahnbehandlung im Notfall (manche Policen)
- Aktivitäten und Sport, falls du Abenteueraktivitäten planst (manche schließen das aus)

Lies das Kleingedruckte sorgfältig. Manche günstigen Policen schließen üblicherweise auftretende Probleme wie Magen-Darm-Erkrankungen oder Tropenkrankheiten aus.

## Was passiert bei einem medizinischen Notfall ohne Versicherung?

Wenn du dich ohne Versicherung in einem medizinischen Notfall befindest:

1. Du wirst trotzdem behandelt - keine Behandlung wird wegen Zahlungsfähigkeit zurückgehalten
2. Du bekommst eine Rechnung, oft direkt vor Entlassung
3. Krankenhäuser verfolgen unbezahlte Rechnungen aggressiv international
4. Du kannst in einem Plan zahlen, aber das kann teuer sein

Siehe unseren Artikel zu [Notfallbehandlung ohne Medicare](/de/blog/emergency-medical-care-working-holiday-no-medicare) für die spezifischen Schritte.

## Wie wirkt sich das auf deine Steuern aus?

Deine Versicherung beeinflusst direkt:

- Ob die [Medicare Levy-Befreiung](/de/blog/medicare-levy-working-holiday-makers) für deine Steuererklärung gilt (meistens ja für Deutsche)
- Ob private Krankenversicherungsprämien mit dem Steuersystem interagieren
- Deine Gesamtsteuerposition in Australien

Wenn du deine [Steuererklärung](/de/tax-return) über unseren Service einreichst, berücksichtigen wir deinen Medicare-Status korrekt, sodass die Levy ausgeschlossen wird, wenn du nicht berechtigt bist. [Kontaktiere unser Team](/de/contact), wenn du unsicher bist, wie Medicare und die Levy deine deutsche Steuerposition beeinflussen.
 `,
  },

  // ─── More Work Rights posts ────────────────────────────────────────────────
  'employer-not-paying-correctly': {
    title: 'Was tun, wenn dein Arbeitgeber dich in Australien nicht korrekt bezahlt',
    description: 'Wenn du unterbezahlt wirst oder dein Lohn nicht ankommt, gibt es klare Schritte, die du unternehmen kannst.',
  },

  'leave-entitlements-working-holiday-visa': {
    title: 'Hast du als Working Holiday Visum-Inhaber Anspruch auf Urlaub und Krankenstand?',
    description: 'Das hängt von deiner Anstellungsart ab. Hier sind die Regeln für Working Holiday Maker.',
  },

  'can-you-work-for-multiple-employers': {
    title: 'Kannst du in Australien für mehrere Arbeitgeber gleichzeitig arbeiten?',
    description: 'Ja, das ist üblich für Working Holiday Maker. Hier ist, was du beim Steuerthema beachten musst.',
  },

  'full-time-part-time-casual-australia': {
    title: 'Was ist der Unterschied zwischen Vollzeit, Teilzeit und Casual-Arbeit in Australien?',
    description: 'Die Anstellungsart bestimmt deinen Lohn, Urlaubsanspruch und mehr. Hier sind die Unterschiede.',
  },

  'white-card-australia-working-holiday': {
    title: 'Was ist ein White Card und brauchst du eines mit Working Holiday Visum?',
    description: 'Ein White Card ist Pflicht für Bauarbeit in Australien. Hier ist, wie du es bekommst.',
  },

  'rsa-certificate-australia-working-holiday': {
    title: 'Was ist ein RSA-Zertifikat und brauchst du eines, um in der Gastronomie in Australien zu arbeiten?',
    description: 'Ein RSA ist Pflicht für jeden, der Alkohol in Australien serviert. Hier ist, wie du es bekommst.',
  },

  'wwcc-working-with-children-check-australia': {
    title: 'Was ist ein Working With Children Check und brauchst du einen mit Working Holiday Visum?',
    description: 'Ein WWCC ist Pflicht für Arbeit mit Kindern in Australien. Hier sind die Details.',
  },

  // ─── More Work Rights ─────────────────────────────────────────────────────
  'what-is-a-tax-invoice': {
    title: 'Was ist eine Tax Invoice und wann musst du eine ausstellen?',
    description: 'Wenn du als Contractor mit ABN arbeitest, musst du Tax Invoices ausstellen, um bezahlt zu werden. Hier ist, was eine Tax Invoice enthält.',
  },

  'do-working-holiday-makers-pay-tax-on-tips': {
    title: 'Müssen Working Holiday Maker in Australien Steuer auf Trinkgeld zahlen?',
    description: 'Ja, Trinkgeld, das du im Rahmen deiner Arbeit in Australien bekommst, ist steuerpflichtiges Einkommen. Hier ist, wie es behandelt wird.',
  },

  'employer-asking-you-to-work-more-than-visa-allows': {
    title: 'Was tun, wenn dein Arbeitgeber dich mehr arbeiten lässt, als dein Visum erlaubt',
    description: 'Mehr zu arbeiten als dein Visum erlaubt, kann dein Visum gefährden. Hier ist, was die Regeln sagen und was du tun kannst.',
  },

  'farm-work-rights-working-holiday-australia': {
    title: 'Deine Arbeitsrechte bei Farmarbeit in Australien mit Working Holiday Visum',
    description: 'Farmarbeit ist einer der häufigsten Jobs für Working Holiday Maker. Hier sind deine gesetzlichen Rechte.',
  },

  'what-is-superannuation-guarantee-charge': {
    title: 'Was ist die Superannuation Guarantee Charge und was bedeutet sie für dich?',
    description: 'Wenn dein Arbeitgeber deine Super nicht korrekt zahlt, kann das ATO ihn mit der Superannuation Guarantee Charge belasten.',
  },

  'public-holidays-australia-working-holiday': {
    title: 'Gesetzliche Feiertage in Australien: was Working Holiday Maker wissen müssen',
    description: 'Feiertage in Australien kommen mit höheren Lohnsätzen und unterschiedlichen Regeln je nach Anstellungsart. Hier ist alles.',
  },

  'casual-shift-cancellation-rules-australia': {
    title: 'Darf dein Arbeitgeber deine Casual-Schicht in Australien absagen?',
    description: 'Als Casual-Arbeiter in Australien können deine Schichten abgesagt werden, aber dein Arbeitgeber muss bestimmte Regeln befolgen.',
  },

  'six-month-employer-rule-working-holiday-visa': {
    title: 'Die 6-Monats-Regel: wie lange darfst du für denselben Arbeitgeber mit Working Holiday Visum arbeiten?',
    description: 'Working Holiday Visum-Inhaber sind auf sechs Monate beim selben Arbeitgeber begrenzt. Hier ist, was die Regel bedeutet.',
  },

  'trs-tourist-refund-scheme-australia': {
    title: 'Das Tourist Refund Scheme: wie du GST auf Käufe vor der Abreise aus Australien zurückbekommst',
    description: 'Wenn du Waren für 300 $ oder mehr in Australien gekauft hast, kannst du eventuell 10 % GST zurückbekommen, bevor du nach Hause fliegst.',
  },

  'vehicle-logbook-abn-working-holiday': {
    title: 'Fahrzeugkosten und Logbücher für Working Holiday Maker mit ABN',
    description: 'Wenn du ein Auto für Arbeit unter deiner ABN nutzt, kannst du eventuell Fahrzeugkosten absetzen. Hier ist, wie es funktioniert.',
    body: `
Wenn du unter einer ABN arbeitest und ein Fahrzeug für das Geschäft nutzt, kannst du Fahrzeugkosten als Steuerabzug geltend machen. Es gibt zwei Methoden: Cents-pro-Kilometer (88 Cent/km, bis zu 5.000 km/Jahr, kein Logbuch nötig) und die Logbuch-Methode (tatsächliche Kosten basierend auf dem geschäftlichen Nutzungsanteil absetzen). Fahrten von deiner Unterkunft zu einer Arbeitsstelle oder zwischen Jobstandorten zählen als Geschäftsreisen. Fahrten von zu Hause zu deinem regulären Arbeitsplatz zählen nicht. Unser Team wählt die Methode, die dir den größten legitimen Abzug bringt.

## Kannst du Fahrzeugkosten mit einer ABN absetzen?

Ja, wenn das Fahrzeug für echte Geschäftszwecke genutzt wird:

**Absetzbare Geschäftsfahrten:**

- Fahrten zwischen mehreren Jobstandorten am selben Tag
- Fahrten zum Kauf von Ausrüstung oder Material für dein Geschäft
- Fahrt von deiner Unterkunft zu einer temporären Arbeitsstelle (wechselnde Orte)
- Fahrten für Geschäftsmeetings oder Kundenbesuche
- Fahrten zu Schulungen, die direkt mit deinem Geschäft zu tun haben

**Nicht absetzbar (Privatfahrten):**

- Tägliche Pendelfahrten von zu Hause zu einem festen regulären Arbeitsplatz
- Privatfahrten
- Fahrten zu nicht-geschäftlichen Zwecken
- Die "erste und letzte" Fahrt des Tages von/zu deiner Hauptarbeitsbasis

Der Schlüssel: Geschäftsfahrten brauchen einen echten geschäftlichen Zweck. Privatfahrten nicht, auch wenn sie nach der Arbeit stattfinden.

## Wie funktioniert die Cents-pro-Kilometer-Methode?

Die einfachste Methode für die meisten Working Holiday Maker:

- Fester Satz von **88 Cent pro Kilometer** (aktueller ATO-Satz)
- Bis zu **5.000 km pro Jahr** absetzbar
- Maximaler Abzug: 4.400 $ pro Jahr (5.000 km × 88 Cent)
- **Kein detailliertes Logbuch erforderlich**

Um diese Methode zu nutzen, halte eine einfache Aufzeichnung deiner Geschäftsfahrten:

- Datum jeder Fahrt
- Geschätzte Entfernung
- Zweck (z.B. "Fahrt zum Kundenstandort für Installation")

Das ist die einfachste Methode und funktioniert für die meisten Working Holiday Maker mit ABN, die gelegentlich fahren.

## Wie funktioniert die Logbuch-Methode?

Die Logbuch-Methode bringt einen größeren Abzug, wenn du viel geschäftlich fährst:

1. Führe ein Logbuch über einen **durchgehenden 12-Wochen-Zeitraum**
2. Trage jede Fahrt (geschäftlich und privat) in den 12 Wochen ein
3. Berechne den **geschäftlichen Nutzungsanteil**
4. Wende diesen Prozentsatz auf die Gesamt-Fahrzeugkosten für das Jahr an

Für jede Fahrt im Logbuch notiere:

- Datum
- Anfangs- und Endstand des Kilometerzählers
- Gesamtkilometer
- Zielort
- Zweck der Fahrt

Nach 12 Wochen kennst du deinen geschäftlichen Nutzungsanteil. Dieser Prozentsatz gilt für **alle Fahrzeugkosten** im Jahr:

- Kraftstoff
- Versicherung
- Anmeldung
- Wartung und Service
- Reparaturen
- Abschreibung

Beispiel: 60 % geschäftliche Nutzung × 8.000 $ Gesamt-Fahrzeugkosten = 4.800 $ absetzbar.

Das Logbuch ist **5 Jahre** gültig (oder bis sich dein Nutzungsmuster wesentlich ändert).

## Welche Methode solltest du nutzen?

Es hängt von deiner Situation ab:

- Du fährst weniger als 5.000 km/Jahr geschäftlich → Cents pro Kilometer
- Du fährst viel geschäftlich und besitzt das Fahrzeug → Logbuch-Methode
- Gemischte private/geschäftliche Nutzung → Logbuch-Methode bringt oft einen größeren Abzug
- Du least oder finanzierst das Fahrzeug → Logbuch-Methode erfasst mehr Kosten

Wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten, berechnen wir beide Methoden und wenden die an, die den größeren legitimen Abzug bringt.

## Welche Belege musst du aufbewahren?

Für beide Methoden:

- Belege für alle Fahrzeugkosten (Kraftstoff, Versicherung, Service, Anmeldung)
- Logbuch oder Fahrtenbuch (je nach Methode)
- Kilometerstände am Anfang und Ende des Steuerjahres
- Kaufbeleg des Fahrzeugs (falls im Jahr gekauft)

Bewahre die Belege **5 Jahre** ab dem Datum der Steuererklärung auf, in der die Ausgaben geltend gemacht wurden.

## Eine praktische Anmerkung für Working Holiday Maker

Viele Backpacker kaufen ein Auto, um in Australien zu reisen und zu arbeiten. Wenn du eine ABN hast und das Auto geschäftlich nutzt:

- Fahrten zu ABN-Arbeitsstellen sind absetzbare Geschäftsfahrten
- Privatfahrten (Sightseeing, Roadtrips) sind nicht absetzbar
- Gemischte Nutzung erfordert die Logbuch-Methode für genaue Absetzung

Der Sydney-zu-Cairns-Roadtrip ist privat. Die Fahrt von deinem Hostel zu einer Farm für ABN-Arbeit ist geschäftlich. Halte sie in deinen Aufzeichnungen getrennt.

[Kontaktiere unser Team](/de/contact) vor dem Einreichen, wenn du Hilfe willst, welche Methode deinen Abzug maximiert. Wir machen das jede Woche für ABN-Inhaber.
 `,
  },

  'small-business-tax-offset-working-holiday-abn': {
    title: 'Was ist der Small Business Tax Offset und können Working Holiday Maker ihn beantragen?',
    description: 'Wenn du Einkommen unter einer ABN als Sole Trader hast, hast du eventuell Anspruch auf den Small Business Tax Offset.',
    body: `
Der Small Business Tax Offset ist eine Steuervergünstigung für Sole Trader und Partnerschaften, die die Steuer auf dein Geschäftseinkommen um bis zu 1.000 $ pro Jahr reduzieren kann. Wenn du in Australien Einkommen unter einer ABN hattest, hast du eventuell Anspruch auf diesen Offset. Der aktuelle Satz beträgt 16 % Rabatt auf die auf Geschäftseinkommen zahlbare Steuer (gedeckelt bei 1.000 $). Der Offset ist nicht erstattungsfähig - er kann deine Steuer auf null reduzieren, aber von sich aus keine Rückzahlung erzeugen. Unser Team wendet alle berechtigten Offsets an, wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten.

## Was ist der Small Business Tax Offset?

Der Small Business Tax Offset (auch Unincorporated Small Business Tax Discount genannt) ist eine Vergünstigung für Sole Trader und Partner kleiner Unternehmen:

- Reduziert die auf Geschäftseinkommen zahlbare Einkommensteuer
- Aktueller Satz: 16 % der auf Geschäftseinkommen zahlbaren Steuer
- Maximale Vergünstigung: 1.000 $ pro Steuerjahr
- Gilt für ABN-Sole-Trader- und Partnerschaftseinkommen
- Nicht erstattungsfähig (kann Steuer auf null reduzieren, kein weiterer Nutzen)

Er existiert, um kleinen Geschäftsinhabern Steuererleichterung zu bieten, die keinen Zugang zu den niedrigeren Körperschaftssteuersätzen haben, die eingetragenen Unternehmen zur Verfügung stehen.

## Wer kann den Small Business Tax Offset beantragen?

Um qualifiziert zu sein, musst du:

- Ein **individueller** Steuerzahler sein (Sole Trader oder Partner in einer Partnerschaft)
- Einen **aggregierten Jahresumsatz unter 5 Millionen $** haben (fast kein Working Holiday Maker erreicht das)
- **Geschäftseinkommen** unter einer ABN verdient haben
- Kein Unternehmen oder Trust sein

Für Working Holiday Maker, die unter einer ABN tätig sind, ist die Umsatzanforderung praktisch nie ein Problem. Der Offset gilt, wenn du überhaupt ABN-Einkommen hattest.

## Wie viel ist der Offset in der Praxis wert?

Beispiele für Working Holiday Maker:

- 5.000 $ ABN-Einkommen → Small Business Offset etwa 120 $ (16 % von 15 % Steuer auf 5.000 $)
- 15.000 $ ABN-Einkommen → Small Business Offset etwa 360 $
- 30.000 $ ABN-Einkommen → Small Business Offset etwa 720 $
- Höheres ABN-Einkommen → gedeckelt bei 1.000 $

Der Offset reduziert die auf den **Geschäftseinkommens-Anteil** deiner Steuererklärung geschuldete Steuer, nicht dein Lohneinkommen.

## Kann der Offset mit anderen Offsets kombiniert werden?

Ja. Mehrere Offsets können auf dieselbe Steuererklärung angewendet werden:

- **Small Business Tax Offset**: reduziert Steuer auf Geschäftseinkommen (max. 1.000 $)
- **Low Income Tax Offset**: reduziert Steuer basierend auf Gesamteinkommen (siehe [Low Income Tax Offset-Artikel](/de/blog/low-income-tax-offset-working-holiday))
- **Medicare Levy-Befreiung**: entfernt die 2 %-Levy (die meisten Working Holiday Maker berechtigt)

Jeder wird separat berechnet und auf deine endgültige Steuerposition angewendet. Unser Team identifiziert und wendet jeden berechtigten Offset beim Vorbereiten deiner Steuererklärung an.

## Was, wenn du sowohl ABN- als auch TFN-Einkommen hattest?

Üblich bei Working Holiday Makern (Anstellungsarbeit parallel zu Contracting):

- Dein Lohneinkommen (TFN) wird zum 15 %-Working Holiday Maker-Satz besteuert
- Dein Geschäftseinkommen (ABN) wird auch zum 15 %-Satz besteuert
- Beide werden auf einer einzigen Steuererklärung gemeldet
- Der Small Business Offset gilt nur für die ABN-Einkommenssteuer
- Andere Offsets und Absetzungen gelten für beides

Diese Wechselwirkung macht eine professionelle Einreichung wertvoll. Wir haben Steuererklärungen für viele Working Holiday Maker mit gemischtem Einkommen eingereicht und wissen, wie man das Ergebnis maximiert.

## Wie beantragst du den Small Business Tax Offset?

Der Offset wird nicht automatisch angewendet - er muss berechnet und bei der Einreichung beantragt werden:

- Das ATO wendet ihn nicht automatisch für dich an
- Selbsteinreicher übersehen ihn oft
- Unser Team berechnet und wendet ihn für jeden berechtigten ABN-Inhaber an
- [Kontaktiere uns](/de/abn), wenn du ABN-Einkommen hattest und sicherstellen willst, dass du ihn beantragst

Wenn du schon eine Steuererklärung ohne den Offset eingereicht hast, können wir die Steuererklärung ändern, um ihn rückwirkend zu beantragen (typischerweise bis zu zwei Jahre nach der ursprünglichen Einreichung).

[Kontaktiere unser Team](/de/contact) für Hilfe bei der ABN-Registrierung, GST- und BAS-Verwaltung oder beim Sortieren deiner Steuerposition am Jahresende.
 `,
  },

  'profit-loss-vs-personal-services-income-australia': {
    title: 'Was ist der Unterschied zwischen einem Profit-and-Loss-Business und Personal Services Income in Australien?',
    description: 'Das ATO unterscheidet zwischen Personal Services Income und echtem Business-Einkommen. Hier sind die Auswirkungen.',
    body: `
Das ATO unterscheidet zwischen zwei Arten von Geschäftseinkommen unter einer ABN: Personal Services Income (PSI) und echtem Profit-and-Loss-Geschäftseinkommen. Der Unterschied ist wichtig, weil PSI-Regeln bestimmte Absetzungen einschränken, die sonst für Unternehmen verfügbar wären. Für Working Holiday Maker ist fast alles ABN-Einkommen PSI - weil du für deine persönlichen Fähigkeiten und Arbeit bezahlt wirst. Das ist kein Problem - die normalen arbeitsbezogenen Absetzungen gelten weiterhin. Unser Team identifiziert, welche Regeln gelten, wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten.

## Was ist Personal Services Income (PSI)?

PSI ist Einkommen, das hauptsächlich aus deinen eigenen persönlichen Fähigkeiten, Mühen oder deiner Expertise stammt:

- Handwerker, die für ihre Arbeitsleistung bezahlt werden
- Freelancer, die für ihre Arbeit bezahlt werden
- Reinigungskräfte, die für ihre Reinigungsdienste bezahlt werden
- Obstpflücker, die für ihre Pflückleistung bezahlt werden
- Berater, die für ihre Beratung bezahlt werden
- Jeder, dessen Einkommen aus "dir" persönlich kommt, statt aus Waren oder Vermögen

Für einen Tischler, der unter einer ABN für eine Baufirma arbeitet: die Zahlung ist für die Stunden und Fähigkeiten des Tischlers. Das ist PSI.

## Was ist ein Profit-and-Loss-Business?

Ein Profit-and-Loss-Business erzielt Einkommen durch:

- Produktion von Waren (Fertigung, Backen, Handwerk)
- Nutzung von Geschäftsvermögen (Mieteinnahmen, Geräte-Leasing)
- Beschäftigung anderer, die die Arbeit machen
- Verkauf von Produkten von Lieferanten

Das Einkommen ist nicht primär an die persönliche Mühe des Eigentümers gebunden. Eine Bäckerei, die Brot verkauft, ein Personalvermittler, der Pflücker beschäftigt, oder ein Mietshausgeschäft fallen alle in diese Kategorie.

## Warum ist die PSI-Unterscheidung wichtig?

Die PSI-Regeln schränken bestimmte Absetzungen ein:

**Verfügbar bei PSI:**
- Werkzeuge und Ausrüstung, die du persönlich nutzt
- Arbeitsbezogene Kleidung und Uniformen
- Fahrten zwischen Arbeitsstellen
- Fahrzeugkosten für echte Geschäftsfahrten
- Selbststudium direkt verbunden mit deiner Arbeit
- Handy und Internet (Arbeitsanteil)

**NICHT verfügbar bei PSI (oder eingeschränkt):**
- Gehälter an Angehörige (z.B. Partner oder Familienmitglieder)
- Miete für Räumlichkeiten, falls nicht strikt für die Arbeit erforderlich
- Manche Super-Beiträge für Angehörige
- Bestimmte Home-Office-Kosten

Die Regeln existieren, um zu verhindern, dass Einzelpersonen Steuern reduzieren, indem sie persönliche Anstellung als "Geschäft" mit umfangreichen Absetzungen strukturieren.

## Wie wird PSI identifiziert?

Das ATO nutzt die **80 %-Regel**: wenn mehr als 80 % deines Einkommens von einem Kunden kommen, ist dein Einkommen wahrscheinlich PSI. Andere Tests gelten ebenfalls:

- **Results-Test**: wirst du für ein bestimmtes Ergebnis bezahlt, statt für gearbeitete Stunden?
- **Unrelated-Clients-Test**: hast du mehrere unabhängige Kunden?
- **Employment-Test**: beschäftigst du andere, die bei der Arbeit helfen?
- **Business-Premises-Test**: arbeitest du aus dedizierten Geschäftsräumen?

Die meisten Working Holiday Maker scheitern an all diesen Tests, weil die Arbeit einfache Lohnarbeit für einen oder wenige Kunden ist.

## Wie gilt PSI für Working Holiday Maker?

Für die meisten Working Holiday Maker unter einer ABN ist das Einkommen PSI:

- Farmarbeit zum Akkordlohn: PSI
- Gastronomie-Contracting: PSI
- Handwerksarbeit für einen Hauptkunden: PSI
- Reinigungs-Subverträge: PSI
- Freelance-Dienste für gelegentliche Kunden: PSI

Das ist normal und kein Problem. Die normalen arbeitsbezogenen Absetzungen (Werkzeuge, Uniformen, Fahrzeugnutzung, Schulungen) gelten weiterhin. Nur einige der ausgefalleneren Geschäftsabsetzungen sind nicht verfügbar - was kein Problem ist, weil Working Holiday Maker solche Ausgaben sowieso selten haben.

## Wie geht unser Team mit PSI um?

Wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten:

- Wir prüfen anhand der ATO-Tests, ob dein ABN-Einkommen PSI ist
- Wir wenden die korrekten Regeln auf deine Absetzungen an
- Wir maximieren alle berechtigten arbeitsbezogenen Absetzungen
- Wir stellen Einhaltung der PSI-Anforderungen sicher

Hilfreich ist, deine Arbeit genau zu beschreiben:

- Wer deine Hauptkunden waren
- Wie du bezahlt wurdest (Stundenlohn, Akkordlohn, pro Projekt)
- Welche Ausrüstung du gestellt hast
- Ob du jemanden beschäftigt hast

[Schick uns diese Details](/de/contact), wenn wir mit deiner Steuererklärung anfangen, und wir finden die korrekte Behandlung heraus.
 `,
  },

  'appealing-ato-decision-australia': {
    title: 'Kannst du eine ATO-Entscheidung in Australien anfechten?',
    description: 'Wenn du mit einer ATO-Bewertung oder Entscheidung nicht einverstanden bist, hast du das Recht, sie anzufechten. Hier ist der Prozess.',
  },

  'piece-rates-farm-work-working-holiday': {
    title: 'Akkordlohn bei Farmarbeit: wie Working Holiday Maker für Erntearbeit bezahlt werden',
    description: 'Akkordlohn ist üblich beim Obstpflücken und bei der Erntearbeit in Australien. Hier ist, wie es funktioniert und was die Mindestlohnregeln sind.',
  },

  'labour-hire-agencies-working-holiday-australia': {
    title: 'Personalvermittler in Australien: was Working Holiday Maker wissen müssen',
    description: 'Personalvermittler sind ein beliebter Weg, schnell Arbeit in Australien zu finden. Hier ist, wie sie funktionieren und was deine Rechte sind.',
  },

  'how-to-read-a-payslip-australia-working-holiday': {
    title: 'Wie du als Working Holiday Maker einen Lohnzettel in Australien liest',
    description: 'Dein Lohnzettel enthält alles, was du wissen musst, um zu prüfen, ob du korrekt bezahlt wirst. Hier ist, was jeder Abschnitt bedeutet.',
  },

  'wage-theft-working-holiday-australia': {
    title: 'Lohnraub in Australien: was Working Holiday Maker tun können, wenn sie unterbezahlt werden',
    description: 'Lohnraub ist leider üblich in Branchen, die bei Backpackern beliebt sind. Hier ist, wie du ihn erkennst und deine Optionen.',
  },

  'backpacker-tax-history-australia': {
    title: 'Die Backpacker-Steuer in Australien: was sie ist und wie sie sich verändert hat',
    description: 'Die Backpacker-Steuer ist eine der meistdebattierten Steuerpolitiken in Australien. Hier ist die Geschichte und der aktuelle Satz.',
  },

  'abn-deductions-business-expenses': {
    title: 'Welche Geschäftsausgaben kannst du mit einer ABN als Working Holiday Maker absetzen?',
    description: 'Working Holiday Maker, die Einkommen unter einer ABN haben, können arbeitsbezogene Geschäftsausgaben absetzen, um ihr zu versteuerndes Einkommen zu reduzieren.',
    body: `
Ein Working Holiday Maker, der Einkommen unter einer Australian Business Number (ABN) verdient, kann legitime Geschäftsausgaben vom zu versteuernden Einkommen absetzen und damit die Steuer am Ende des Steuerjahres reduzieren. Absetzbar sind Werkzeuge, Ausrüstung, Fahrzeug-Betriebskosten für arbeitsbedingte Fahrten, geschäftliche Handynutzung, Schutzkleidung und bestimmte Lizenzen oder Schulungen, die direkt mit der Arbeit zusammenhängen.

Die Regeln für ABN-Absetzungen sind anders als die für PAYG-Angestellte, und die geforderten Belege sind strenger. Ohne ordentliche Dokumentation kann das ATO die Absetzung bei einer Prüfung ablehnen.

## Was kann ein Working Holiday Maker mit ABN absetzen?

Die allgemeine Regel: Eine Ausgabe ist absetzbar, wenn sie direkt mit der Erzielung deines ABN-Einkommens zusammenhängt und du einen Beleg hast. Häufige Kategorien:

- **Werkzeuge und Ausrüstung**: Gegenstände, die für die Arbeit nötig sind - eine Kettensäge für Baumarbeit, ein Staubsauger für Reinigungs-Contracting oder eine Liefertasche für Kurierarbeit
- **Schutzkleidung und Sicherheitsausrüstung**: Hi-Vis-Westen, Stahlkappen-Stiefel, Handschuhe, Helme
- **Fahrzeug-Betriebskosten**: Sprit, Anmeldung, Versicherung und Wartung für Kilometer, die speziell für die Arbeit gefahren wurden (Privatfahrten sind nicht absetzbar)
- **Handy und Internet**: der arbeitsbezogene Prozentsatz deiner Nutzung
- **Lizenzen und Zertifikate**: White Card, RSA und andere Branchenscheine, die direkt für deine Arbeit benötigt werden
- **Bankgebühren und Händlerabgaben**: Kartenzahlungsgebühren auf einem Geschäftskonto
- **Professionelle Dienstleistungen**: Gebühren von registrierten Steueragenten und Buchhaltung

Gegenstände, die sowohl für Arbeit als auch privat genutzt werden, kannst du nur zum arbeitsbezogenen Prozentsatz absetzen. Ein Handy, das zu 60 % geschäftlich genutzt wird, ist zu 60 % der Rechnung absetzbar.

## Welche Belege verlangt das ATO?

Für jede beanspruchte Ausgabe verlangt das ATO einen Nachweis über die Kosten und einen Nachweis, dass sie für die Arbeit war. Das Minimum ist eine Quittung oder Tax Invoice, die Lieferant, Datum, Betrag und eine Beschreibung des Artikels zeigt. Für Ausgaben, die anteilig abgesetzt werden (Handy, Fahrzeug, Internet), brauchst du außerdem einen Nachweis des arbeitsbezogenen Prozentsatzes - belegt durch ein Logbuch oder einen repräsentativen Nutzungszeitraum.

Ohne Belege kann die Absetzung nicht beansprucht werden, auch wenn die Ausgabe tatsächlich angefallen ist.

## Was kann nicht abgesetzt werden?

Manche Ausgaben sehen absetzbar aus, sind es aber nicht. Die häufigsten Fehler:

- Fahrten von zu Hause zum regulären Arbeitsplatz (das ist privat, nicht geschäftlich)
- Kleidung, die weder speziell schützend noch eine gekennzeichnete Uniform ist
- Essen und Trinken während des Arbeitstages (für ABN-Inhaber genauso wenig absetzbar wie für Angestellte)
- Unterkunft an deinem Hauptwohnsitz, auch wenn du von zu Hause arbeitest
- Kosten, die vor der ABN-Registrierung angefallen sind

Siehe unseren Artikel zu [Fahrzeugkosten und Logbüchern](/de/blog/vehicle-logbook-abn-working-holiday) für die detaillierten Regeln zu Autokosten.

## Warum unterabsetzen Working Holiday Maker so oft?

Die zwei Hauptgründe, warum Working Holiday Maker Absetzungen liegen lassen:

- Keine Quittungen aufbewahrt, weil sie nicht wussten, dass die Sachen absetzbar sind
- Nicht verstanden, welche Kosten unter ABN-Regeln gelten gegenüber PAYG-Regeln

Ein Working Holiday Maker, der zum Beispiel Farmarbeit als Contractor mit eigener Ausrüstung macht, hat oft Tausende Dollar an legitimen Absetzungen in verblassten Quittungen unten im Rucksack. Ohne geordnete Belege gehen diese Absetzungen zur Steuerzeit verloren.

## Wie kümmert sich unser Service um ABN-Absetzungen?

Wenn wir am Ende des Steuerjahres deine [Steuererklärung](/de/tax-return) einreichen, prüft unser Team dein ABN-Einkommen gegen deine Tätigkeitsart und identifiziert jede Absetzungskategorie, auf die du Anspruch hast. Wir helfen dir, die Belege für jede Beanspruchung zusammenzustellen, wenden die korrekte Aufteilung für gemischt genutzte Gegenstände an und stellen sicher, dass die Absetzung bei einer ATO-Prüfung haltbar ist.

Für Working Holiday Maker mit ABN-Einkommen ist der Unterschied zwischen einer ungeprüften und einer ordentlich vorbereiteten Steuererklärung oft mehrere Tausend Dollar Steuer. [Kontaktiere unser Team](/de/contact) vor Ende des Steuerjahres, damit deine Belege in Ordnung sind.
 `,
  },

  'uber-doordash-rideshare-abn-working-holiday': {
    title: 'Arbeit für Uber, DoorDash oder Rideshare mit Working Holiday Visum: ABN- und Steuerregeln',
    description: 'Rideshare und Essenslieferung werden in Australien als Contracting behandelt. Du brauchst eine ABN, und keine Steuer wird einbehalten.',
    body: `
Arbeiten für Uber, DoorDash oder eine andere Rideshare- oder Essensliefer-Plattform in Australien wird als unabhängiges Contracting eingestuft, nicht als Anstellung. Das heißt: Ein Working Holiday Maker, der für diese Plattformen fährt oder liefert, muss eine Australian Business Number (ABN) registrieren, ist für seine eigenen Steuerpflichten verantwortlich und bekommt keine Steuer von der Plattform einbehalten. Für Rideshare ist GST-Registrierung ab dem ersten verdienten Dollar Pflicht - unabhängig vom Gesamtumsatz.

Das ist einer der häufigsten Bereiche, in denen Working Holiday Maker mit dem ATO Ärger bekommen, weil die Regeln nicht das sind, was die meisten erwarten.

## Warum gelten Rideshare und Lieferdienste als Contracting?

Uber, DoorDash, Menulog und ähnliche Plattformen klassifizieren ihre Fahrer und Lieferanten als unabhängige Contractor, nicht als Angestellte. Die Plattform zahlt dich für erledigte Aufträge, behält aber keine Steuer ein, zahlt keine [Super](/de/superannuation) und übernimmt keine Verantwortung für deine Arbeitsbedingungen. Das heißt:

- Du brauchst eine [ABN](/de/abn), bevor du für die Plattform arbeiten kannst
- Du bist verantwortlich, Geld für die Steuer zurückzulegen
- Du kannst arbeitsbezogene Absetzungen machen wie Fahrzeugkosten, Handynutzung und Ausrüstung
- Du bekommst am Jahresende kein PAYG Payment Summary (stattdessen einen Jahresauszug von der Plattform)

Siehe unseren Artikel zu [dem Unterschied zwischen Angestelltem und Contractor](/de/blog/employee-vs-contractor-australia) für mehr dazu, wie die Klassifizierung funktioniert.

## Was ist die GST-Regel, die die meisten Rideshare-Fahrer überrascht?

Für gewöhnliche ABN-Arbeit ist die GST-Registrierung erst Pflicht, wenn dein Umsatz im Steuerjahr 75.000 $ überschreitet. Für Rideshare-Fahren (Uber, Ola, Didi und ähnliche Personenbeförderungs-Dienste) ist die Regel anders: GST-Registrierung ist ab dem ersten Dollar Einkommen Pflicht, egal wie wenig du verdienst.

Essenslieferung (Uber Eats, DoorDash, Menulog) wird unter der Standard-75.000 $-GST-Schwelle behandelt, nicht unter der Rideshare-Regel. Die Unterscheidung ist wichtig, weil sie ändert, was du dem ATO schuldest und welche Belege du brauchst.

Wenn du für GST registriert bist und vergisst, deine Business Activity Statements einzureichen, kann das ATO Strafen rückwirkend anwenden und den GST-Anteil jeder Fahrt verlangen, die du je gemacht hast. Für einen Vollzeit-Fahrer über sechs Monate kann das eine Schuld von mehreren Tausend Dollar werden.

## Welche Absetzungen können Rideshare- und Lieferarbeiter beanspruchen?

Einkommen, das über eine Rideshare- oder Lieferplattform verdient wird, wird durch legitime Geschäftsausgaben reduziert:

- Fahrzeug-Betriebskosten (Sprit, Wartung, Anmeldung, Versicherung, Abschreibung)
- Fahrzeug-Finanzierungszinsen bei Krediten
- Handy und Daten für die Arbeits-App
- Mautgebühren und Parkkosten während der Arbeit
- Reinigung des Fahrzeugs
- Lieferausrüstung (Tasche, Helm, Fahrradwartung für Kuriere)
- Provisionen und Servicegebühren der Plattform

Fahrzeugkosten kannst du entweder pro Kilometer absetzen oder durch Tracking der tatsächlichen Kosten mit einem Logbuch. Die Logbuch-Methode bringt für Fahrer mit vielen Stunden meistens eine größere Absetzung. Siehe unseren Artikel zu [Fahrzeugkosten und Logbüchern](/de/blog/vehicle-logbook-abn-working-holiday) für die Details.

## Welches Einkommen sieht das ATO automatisch?

Rideshare- und Lieferplattformen melden deine jährlichen Einkünfte direkt an das ATO unter dem Sharing Economy Reporting Regime. Das ATO weiß also schon, wie viel du über Uber, DoorDash oder ähnliche verdient hast, bevor du deine [Steuererklärung](/de/tax-return) einreichst. Zu versuchen, Einkommen von diesen Plattformen zu untererfassen, ist einer der einfachsten Wege, eine ATO-Prüfung auszulösen, weil die Plattform-Daten automatisch mit deiner Steuererklärung abgeglichen werden.

## Wie kümmert sich unser Service um Rideshare- und Lieferdienst-Einkommen?

Wenn du über unseren Service einreichst, kümmert sich unser Team um das komplette Bild für Rideshare- und Lieferarbeit:

- ABN-Registrierung mit den korrekten Geschäftstätigkeitscodes
- GST-Registrierung, wenn du Rideshare fährst (oder wenn dein Liefereinkommen sich der 75.000 $-Schwelle nähert)
- Vierteljährliche BAS-Einreichungen, wenn du GST-registriert bist
- Steuererklärung am Jahresende, die Plattform-Auszüge mit der ATO-Aufzeichnung abgleicht
- Fahrzeug- und Ausrüstungs-Absetzungen berechnet und belegt für eine eventuelle Prüfung

Die Strafen für falsche Rideshare-Steuer sind erheblich, und die Regeln ändern sich regelmäßig. [Kontaktiere unser Team](/de/contact), bevor du für eine Plattform anfängst zu arbeiten, damit die Registrierungen und Belege von Tag eins an stimmen.
 `,
  },

  'second-third-year-visa-tax-implications': {
    title: 'Steuerliche Auswirkungen eines zweiten oder dritten Working Holiday Visums in Australien',
    description: 'Mit einem zweiten oder dritten Working Holiday Visum nach Australien zurückzukommen ändert nichts am Steuersatz, kann aber andere Dinge ändern.',
  },

  'dasp-tax-rate-65-percent-explained': {
    title: 'Warum wird DASP mit 65 % für Working Holiday Maker besteuert?',
    description: 'Die Departing Australia Superannuation Payment wird mit 65 % für Working Holiday Maker besteuert - viel höher als für andere Visa-Inhaber.',
  },

  'super-multiple-funds-consolidation': {
    title: 'Was tun, wenn du als Working Holiday Maker Super in mehreren Fonds hast',
    description: 'Working Holiday Maker landen oft mit Super in drei oder vier verschiedenen Fonds. Hier ist, wie du sie zusammenführst.',
  },

  'dasp-rejected-what-to-do': {
    title: 'Was tun, wenn dein DASP Super-Auszahlungsantrag abgelehnt wird',
    description: 'DASP-Anträge werden abgelehnt wegen Visa-Status-Diskrepanzen, Identitätsproblemen oder fehlenden Abreisedaten.',
  },

  'super-employer-not-paying-what-to-do': {
    title: 'Was tun, wenn dein Arbeitgeber deine Super in Australien nicht gezahlt hat',
    description: 'Arbeitgeber sind gesetzlich verpflichtet, Super zu 12 % deines Lohns zu zahlen. Hier ist, was zu tun ist, wenn sie das nicht tun.',
  },

  'super-stapling-rule-australia': {
    title: 'Was ist Super Stapling und wie beeinflusst es Working Holiday Maker in Australien?',
    description: 'Super Stapling verbindet deine Super mit einem einzelnen Fonds, der dir zwischen Arbeitgebern folgt.',
  },

  'workplace-injury-working-holiday-rights': {
    title: 'Welche Rechte hast du, wenn du bei der Arbeit mit Working Holiday Visum verletzt wirst?',
    description: 'Working Holiday Maker, die bei der Arbeit verletzt werden, sind in jedem australischen Bundesstaat durch die Workers Compensation abgedeckt.',
  },

  'unfair-dismissal-working-holiday-australia': {
    title: 'Können Working Holiday Maker eine Unfair-Dismissal-Klage in Australien einreichen?',
    description: 'Working Holiday Maker können Unfair-Dismissal-Klagen über die Fair Work Commission einreichen, aber die Berechtigung hängt von der Anstellungsdauer ab.',
  },

  'bullying-harassment-workplace-working-holiday': {
    title: 'Welche Optionen hast du, wenn du am Arbeitsplatz mit Working Holiday Visum gemobbt oder belästigt wirst?',
    description: 'Mobbing und sexuelle Belästigung am Arbeitsplatz sind in Australien illegal und durch Bundes- und Landesgesetze geschützt.',
  },

  'unpaid-trial-shifts-australia-legal': {
    title: 'Sind unbezahlte Probe-Schichten in Australien für Working Holiday Maker legal?',
    description: 'Unbezahlte Probe-Schichten sind in Australien meistens illegal. Hier sind deine Rechte.',
  },

  'uniform-laundry-deductions-illegal-australia': {
    title: 'Sind Uniform- und Wäsche-Abzüge vom Lohn in Australien legal?',
    description: 'Arbeitgeber in Australien dürfen nur in eng definierten gesetzlichen Fällen Geld vom Lohn abziehen.',
  },

  'uk-medicare-reciprocal-agreement-australia': {
    title: 'Was deckt das UK-Australien Medicare-Sozialversicherungsabkommen für britische Working Holiday Maker ab?',
    description: 'Britische Bürger mit Working Holiday Visum sind durch das Sozialversicherungsabkommen zwischen UK und Australien abgedeckt. Deutschland hat KEIN solches Abkommen.',
  },

  'private-health-insurance-working-holiday-australia': {
    title: 'Brauchen Working Holiday Maker eine private Krankenversicherung in Australien?',
    description: 'Eine private Krankenversicherung ist Visumsbedingung für viele Working Holiday Visa und praktisch notwendig für Reisende aus Ländern ohne RHCA (wie Deutschland).',
  },

  'emergency-medical-care-working-holiday-no-medicare': {
    title: 'Was tun in einem medizinischen Notfall ohne Medicare-Abdeckung in Australien',
    description: 'Working Holiday Maker ohne Medicare können trotzdem Notfallbehandlung in Australien bekommen, aber die Kosten zahlt der Patient selbst.',
  },

  'travel-insurance-vs-health-insurance-working-holiday': {
    title: 'Reiseversicherung vs. private Krankenversicherung für Working Holiday Maker: was ist der Unterschied?',
    description: 'Reiseversicherung und australische private Krankenversicherung decken unterschiedliche Dinge ab. Hier sind die Details.',
  },

  'hospitality-award-working-holiday-makers': {
    title: 'Was ist der Hospitality Award und wie gilt er für Working Holiday Maker?',
    description: 'Der Hospitality Award (MA000009) ist der moderne Award, der Mindestlöhne, Penalty Rates und Bedingungen für die meisten Gastronomie-Jobs festlegt.',
  },

  'horticulture-award-working-holiday-makers': {
    title: 'Was ist der Horticulture Award und wie gilt er für Farmarbeit mit Working Holiday Visum?',
    description: 'Der Horticulture Award (MA000028) legt die Mindestlöhne und Bedingungen für Farmarbeit in Australien fest.',
  },

  'restaurant-industry-award-working-holiday': {
    title: 'Was ist der Restaurant Industry Award und wie gilt er für Working Holiday Maker?',
    description: 'Der Restaurant Industry Award (MA000119) deckt eigenständige Restaurants, Cafés und ähnliche Lokale ab.',
  },

  'award-classifications-working-holiday-australia': {
    title: 'Wie du herausfindest, welcher Modern Award für deinen Job in Australien gilt',
    description: 'Die meisten Working Holiday Maker sind durch einen Modern Award abgedeckt, der ihren Mindestlohn und ihre Bedingungen festlegt.',
  },

  'understating-income-ato-penalty-working-holiday': {
    title: 'Welche ATO-Strafen gibt es, wenn du dein Einkommen in der Working Holiday-Steuererklärung untererfasst?',
    description: 'Wenn das ATO feststellt, dass du Einkommen untererfasst hast, liegen die Verwaltungsstrafen zwischen 25 % und 75 % der vermiedenen Steuer.',
  },

  '1000-dollar-instant-deduction-rule-2026': {
    title: 'Die neue 1.000-Dollar-Sofortabschreibungsregel ab 1. Juli 2026 für Working Holiday Maker',
    description: 'Ab 1. Juli 2026 können Working Holiday Maker eine Sofortabschreibung von 1.000 $ für arbeitsbezogene Ausgaben ohne Belege geltend machen.',
  },

  'bicycle-motorcycle-vehicle-deductions-working-holiday': {
    title: 'Absetzungen für Fahrräder, Motorräder und andere Fahrzeuge für Working Holiday Maker',
    description: 'Fahrzeugabsetzungen sind nicht auf Autos beschränkt. Hier ist, was du für andere Fahrzeuge absetzen kannst.',
  },

  'dasp-vs-leaving-super-in-australia-pros-cons': {
    title: 'Solltest du DASP beantragen oder deine Super in Australien lassen?',
    description: 'Working Holiday Maker, die Australien verlassen, müssen entscheiden: DASP mit 65 % Steuer beantragen oder Super im Fonds belassen?',
  },

  'fruit-picking-jobs-working-holiday-australia': {
    title: 'Obstpflücker-Jobs in Australien: was du mit einem Working Holiday Visum erwarten kannst',
    description: 'Obstpflücken ist der häufigste Weg zu den 88 Tagen Regional-Arbeit für ein zweites Working Holiday Visum.',
  },

  'farm-hand-jobs-working-holiday-australia': {
    title: 'Farmhelfer-Jobs in Australien: Lohn, Bedingungen und Berechtigung für das zweite Visum',
    description: 'Farmhelfer-Arbeit umfasst eine breite Palette landwirtschaftlicher Rollen jenseits des Obstpflückens - Viehpflege, Pflanzen, Zäunen.',
  },

  'bartender-jobs-working-holiday-australia': {
    title: 'Bartender-Jobs in Australien mit Working Holiday Visum: RSA, Lohn und Trinkgeld',
    description: 'Bartending ist eine der zugänglichsten Gastronomie-Rollen für Working Holiday Maker.',
  },

  'barista-coffee-shop-working-holiday-australia': {
    title: 'Barista-Jobs in Australien mit Working Holiday Visum: Lohn, Training und Bedingungen',
    description: 'Die australische Kaffeekultur sorgt für hohe Nachfrage nach erfahrenen Baristas.',
  },

  'waiter-waitress-working-holiday-australia': {
    title: 'Kellner-Jobs in Australien mit Working Holiday Visum',
    description: 'Restaurant- und Café-Service ist eine der häufigsten Rollen für Working Holiday Maker.',
  },

  'kitchen-hand-working-holiday-australia': {
    title: 'Kitchen Hand-Jobs in Australien mit Working Holiday Visum',
    description: 'Kitchen-Hand-Arbeit ist einer der zugänglichsten Einstiegspunkte zur australischen Gastronomie - keine formellen Qualifikationen nötig.',
  },

  'construction-laborer-working-holiday-australia': {
    title: 'Bauarbeiter-Jobs in Australien mit Working Holiday Visum: White Card und Lohn',
    description: 'Bauarbeit ist eine der bestbezahlten Einstiegs-Rollen für Working Holiday Maker in Australien.',
  },

  'uber-eats-delivery-rider-working-holiday-australia': {
    title: 'Uber Eats und Lieferdienst-Jobs in Australien mit Working Holiday Visum',
    description: 'Essenslieferung mit Fahrrad, E-Bike oder Scooter wird in Australien als Contracting behandelt.',
  },

  'uber-driver-working-holiday-australia': {
    title: 'Uber-Fahrer und Rideshare-Jobs in Australien mit Working Holiday Visum: ABN, GST und BAS',
    description: 'Rideshare-Fahren in Australien erfordert eine ABN, GST-Registrierung ab dem ersten Dollar und vierteljährliche Business Activity Statements.',
  },

  'ski-resort-jobs-working-holiday-australia': {
    title: 'Ski-Resort-Jobs in Australien mit Working Holiday Visum',
    description: 'Ski-Resort-Arbeit in Australien läuft von Juni bis September in Resorts in Victoria und NSW.',
  },

  'supermarket-work-coles-woolworths-working-holiday': {
    title: 'Supermarkt-Jobs bei Coles, Woolworths und ALDI mit Working Holiday Visum',
    description: 'Australiens große Supermarktketten stellen Working Holiday Maker an Kassen, Regalauffüllung, Feinkost und Nachtschichten ein.',
  },

  'station-hand-cattle-station-working-holiday-australia': {
    title: 'Station-Hand und Cattle-Station-Jobs im Outback Australiens mit Working Holiday Visum',
    description: 'Cattle Stations und entlegene Outback-Anwesen stellen Working Holiday Maker für Viehzucht, Mustering, Zäunen und allgemeine Stationsarbeit ein.',
  },

  'super-rate-12-percent-2025-2026-increase': {
    title: 'Superannuation-Satz auf 12 % ab 1. Juli 2025 erhöht: was es für Working Holiday Maker bedeutet',
    description: 'Ab 1. Juli 2025 stieg die Superannuation Guarantee von 11,5 % auf 12 %. Hier sind die Auswirkungen für dich.',
  },

  'bringing-money-into-australia-10000-reporting-threshold': {
    title: 'Geld nach Australien bringen: die 10.000-Dollar-Meldegrenze und was Working Holiday Maker wissen müssen',
    description: 'Reisende können beliebig viel Bargeld nach Australien bringen oder überweisen, aber Bewegungen ab 10.000 $ müssen gemeldet werden.',
  },

  'ato-tax-debt-failure-to-pay-penalty-australia': {
    title: 'ATO-Strafen für unbezahlte Steuerschulden: General Interest Charge und Failure to Pay',
    description: 'Wenn du eine Steuerschuld beim ATO hast und nicht rechtzeitig zahlst, fällt die General Interest Charge täglich an und die Failure to Pay-Strafe wird fällig.',
  },
}

// ─── HELPERS ───────────────────────────────────────────────────────────────
export function getGermanGuide(slug: string): { guide: Guide; isTranslated: boolean } | undefined {
  const enGuide = enGuides.find(g => g.slug === slug)
  if (!enGuide) return undefined

  const translation = dePostTranslations[slug]
  if (translation) {
    return {
      guide: {
        ...enGuide,
        title: translation.title,
        description: translation.description,
        body: translation.body ?? enGuide.body,
      },
      isTranslated: !!translation.body,
    }
  }

  return { guide: enGuide, isTranslated: false }
}

export function getGermanGuides(): Guide[] {
  // Return all guides with German title/description if available, else English
  return enGuides.map(g => {
    const t = dePostTranslations[g.slug]
    if (t) return { ...g, title: t.title, description: t.description, body: t.body ?? g.body }
    return g
  })
}

export function getGermanCategoryMeta(slug: string): DeCategoryMeta | undefined {
  return deCategoryMeta.find(c => c.slug === slug)
}

// Re-export English helpers we still need
export { enCategoryMeta, enGuides }
export type { Category, CategoryMeta, Guide }
