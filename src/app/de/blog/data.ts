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
  h1Line1:             'Steuern zurück aus Australien:',
  h1Line2:             'TFN, Tax Return, Super und ABN',
  description:         'Steuererstattung holen, Superannuation auszahlen lassen, TFN und ABN einrichten - praktische Guides für Work and Travel in Australien, einfach erklärt.',

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
  showingResults:      '',
  resultsMatching:     'Artikel für',
  matching:            'für',
  tryDifferent:        'Versuch einen anderen Suchbegriff oder durchsuche alle Artikel.',
  noArticlesCategory:  'In dieser Kategorie gibt es noch keine Artikel.',

  // Article card
  minRead:             'Min. Lesezeit',
  readMore:            'Mehr lesen',

  // Pagination
  showing:             'Zeige',
  of:                  'von',
  article:             'Artikel',
  articles:            'Artikel',

  // Article page
  backToBlog:          '← Zurück zum Blog',
  publishedOn:         'Veröffentlicht am',
  updatedOn:           'Aktualisiert am',
  inThisArticle:       'In diesem Artikel',
  shareArticle:        'Artikel teilen',
  relatedArticles:     'Verwandte Artikel',
  needHelp:            'Brauchst du Hilfe?',
  needHelpBody:        'Unser Team arbeitet unter Aufsicht eines registrierten Steueragenten und hilft Working Holiday Makern bei TFN, Steuererklärung, Super und ABN.',
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
    title: 'TFN-Blogartikel für Working Holiday Maker in Australien',
    description: 'Alles, was du als Working Holiday Maker über die Tax File Number (TFN) wissen musst. Wie du sie beantragst, Bearbeitungszeiten und was du tun kannst, wenn etwas schiefläuft.',
    intro: 'Eine Tax File Number (TFN) ist die 9-stellige Identifikationsnummer, die das ATO (australisches Finanzamt) jeder Person ausstellt, die in Australien Einkommen hat. Als Working Holiday Maker brauchst du eine TFN, bevor du anfängst zu arbeiten - sonst muss dein Arbeitgeber 45 % Steuern einbehalten statt der 15 %, die für Working Holiday Maker gelten. Diese Artikel decken alles ab, von deiner ersten TFN-Beantragung bis hin zu Verzögerungen, verlorenen Nummern und Rückkehr mit Zweitvisum.',
    faq: [
      { question: 'Brauchen Working Holiday Maker eine TFN in Australien?', answer: 'Ja. Jeder Working Holiday Maker, der in Australien Einkommen hat, braucht eine Tax File Number. Ohne eine bei deinem Arbeitgeber registrierte TFN muss er gesetzlich 45 % Steuern einbehalten - statt der 15 %, die für Working Holiday Maker gelten.' },
      { question: 'Wie lange dauert es, eine TFN zu bekommen?', answer: 'Das ATO (australisches Finanzamt) bearbeitet TFN-Anträge innerhalb von 28 Tagen. Deine TFN wird per Brief an deine australische Postadresse geschickt. Viele Antragsteller bekommen sie innerhalb von zwei Wochen.' },
      { question: 'Ist der TFN-Antrag kostenlos?', answer: 'Ja. Die Beantragung einer TFN ist kostenlos. Es gibt keine Behördengebühr. Der Onlineantrag dauert etwa 10 Minuten.' },
      { question: 'Kann man in Australien ohne TFN anfangen zu arbeiten?', answer: 'Ja, du kannst ohne TFN anfangen zu arbeiten, aber dein Arbeitgeber muss 45 % Steuern einbehalten, bis du eine TFN bereitstellst. Die zu viel gezahlte Steuer kannst du dir mit deiner Steuererklärung zurückholen.' },
    ],
    relatedServicePath: '/de/tfn',
    relatedServiceLabel: 'Deine TFN beantragen',
  },
  // ABN
  {
    category: 'ABN',
    slug: 'abn',
    title: 'ABN-Blogartikel für Working Holiday Maker in Australien',
    description: 'Alles, was du als Backpacker über die Australian Business Number (ABN) wissen musst. Wann du eine brauchst, wie du dich registrierst und was das für deine Steuer bedeutet.',
    intro: 'Eine Australian Business Number (ABN) ist eine 11-stellige Identifikationsnummer, die du brauchst, wenn du in Australien als Selbstständiger (Sole Trader) oder unabhängiger Contractor arbeitest. Du brauchst eine ABN, wenn ein Unternehmen dich bezahlt, indem du ihm Rechnungen stellst, statt dass du auf der Gehaltsabrechnung stehst. Diese Artikel decken Registrierung, wann eine ABN die richtige Wahl ist und wie das Arbeiten unter einer ABN deine Steuer, Super und Ansprüche beeinflusst.',
    faq: [
      { question: 'Brauchen Working Holiday Maker eine ABN in Australien?', answer: 'Du brauchst eine ABN, wenn du als unabhängiger Contractor oder Selbstständiger arbeitest, das heißt: wenn du Rechnungen für deine Arbeit stellst, statt auf einer Gehaltsabrechnung zu stehen. Die meisten Working Holiday Maker in normalen Anstellungen brauchen keine ABN.' },
      { question: 'Wie viel kostet eine ABN?', answer: 'Die Registrierung einer ABN über das Australian Business Register ist kostenlos. Jeder Service, der dir Geld für die Registrierung selbst berechnet, verlangt Geld für einen kostenlosen Behördenprozess.' },
      { question: 'Was ist der Unterschied zwischen TFN und ABN?', answer: 'Deine TFN identifiziert dich gegenüber dem ATO als Einzelperson für Steuerzwecke. Eine ABN identifiziert dich, wenn du als Unternehmen oder Selbstständiger tätig bist. Eine TFN brauchst du immer; eine ABN nur, wenn du selbstständig arbeitest.' },
      { question: 'Bekomme ich Super, wenn ich unter einer ABN arbeite?', answer: 'In der Regel nicht. Wenn du als Contractor (mit ABN) arbeitest, zahlst du selbst deine Superbeiträge ein. Wenn du als Angestellter (mit TFN) eingestellt bist, zahlt dein Arbeitgeber 12 % deines Lohns als Super ein.' },
    ],
    relatedServicePath: '/de/abn',
    relatedServiceLabel: 'Deine ABN beantragen',
  },
  // Tax Return
  {
    category: 'Tax Return',
    slug: 'tax-return',
    title: 'Blogartikel zur Steuererklärung für Working Holiday Maker',
    description: 'Alles über die Steuererklärung in Australien: wann sie fällig ist, wie du absetzbare Kosten geltend machst und wie du deine Rückzahlung maximierst.',
    intro: 'Die Steuererklärung in Australien (Tax Return) ist die jährliche Abrechnung zwischen dir und dem ATO. Du gibst an, wie viel du verdient hast, machst absetzbare Kosten geltend und gleichst das mit der schon einbehaltenen Steuer ab. Die meisten Working Holiday Maker bekommen Tausende Dollar zurück, weil zu viel Steuer einbehalten wurde. Diese Artikel decken Termine, Absetzungen, häufige Fehler und wie du deine maximale Rückzahlung bekommst.',
    faq: [
      { question: 'Wann muss ich meine Steuererklärung in Australien machen?', answer: 'Das australische Steuerjahr läuft vom 1. Juli bis 30. Juni. Du hast bis zum 31. Oktober Zeit, um deine Steuererklärung einzureichen - wenn du sie selbst machst. Mit einem registrierten Steueragenten hast du bis Mai des Folgejahres Zeit.' },
      { question: 'Was kann ich als Working Holiday Maker absetzen?', answer: 'Du kannst arbeitsbezogene Kosten absetzen: Arbeitskleidung (z.B. Schutzkleidung, Uniformen), Werkzeuge und Ausrüstung, Lizenzen wie RSA oder White Card, Wäsche von Arbeitskleidung, Fahrten zwischen Arbeitsorten (nicht der tägliche Arbeitsweg) und Spenden an registrierte Wohltätigkeitsorganisationen.' },
      { question: 'Wie hoch ist die durchschnittliche Steuerrückerstattung für WHM?', answer: 'Working Holiday Maker bekommen im Schnitt zwischen 2.000 und 3.500 AUD zurück, je nach Einkommen, Visumsstatus und absetzbaren Kosten. Die meisten haben im Laufe des Jahres zu viel Steuer gezahlt.' },
      { question: 'Kann ich meine Steuererklärung machen, nachdem ich Australien verlassen habe?', answer: 'Ja. Du kannst die Steuererklärung von überall auf der Welt einreichen, auch nach deiner Abreise aus Australien. Die Steuerrückerstattung wird auf dein australisches Bankkonto überwiesen.' },
    ],
    relatedServicePath: '/de/tax-return',
    relatedServiceLabel: 'Deine Steuererklärung machen',
  },
  // Super
  {
    category: 'Super',
    slug: 'super',
    title: 'Blogartikel zu Super für Working Holiday Maker',
    description: 'Alles über Superannuation (Super): wie es funktioniert, wann du es zurückbekommst und wie du den DASP-Antrag stellst, wenn du Australien verlässt.',
    intro: 'Superannuation (Super) ist das australische Rentensystem. Per Gesetz zahlt dein Arbeitgeber 12 % deines Lohns zusätzlich zu deinem Gehalt in einen Superfonds ein. Als Working Holiday Maker kannst du dieses Geld zurückbekommen, wenn du Australien verlässt - über den DASP-Prozess (Departing Australia Superannuation Payment). Für die meisten Backpacker sind das zwischen 2.000 und 5.000 AUD. Diese Artikel erklären, wie Super funktioniert, wie du es findest und wie du es richtig zurückholst.',
    faq: [
      { question: 'Wie viel Super zahlt mein Arbeitgeber für mich ein?', answer: 'In Australien zahlt dein Arbeitgeber 12 % deines Bruttolohns als Super ein, zusätzlich zu deinem Gehalt. Wenn du also 1.000 AUD pro Woche verdienst, gehen weitere 120 AUD in deinen Superfonds.' },
      { question: 'Kann ich meine Super zurückbekommen, wenn ich Australien verlasse?', answer: 'Ja. Als Working Holiday Maker kannst du eine Departing Australia Superannuation Payment (DASP) beantragen, sobald du Australien verlassen hast und dein Visum abgelaufen oder gekündigt ist. Die steuerpflichtige Komponente wird mit 65 % besteuert - den Rest bekommst du ausgezahlt.' },
      { question: 'Wie lange dauert die DASP-Auszahlung?', answer: 'Nach Einreichung des DASP-Antrags dauert die Auszahlung normalerweise 2-4 Wochen. Das Geld kommt direkt auf dein Bankkonto (australisch oder ausländisch).' },
      { question: 'Was, wenn ich mehrere Superkonten habe?', answer: 'Wenn du für mehrere Arbeitgeber gearbeitet hast, hast du wahrscheinlich mehrere Superkonten. Du kannst alle zusammen finden lassen und einen einzigen DASP-Antrag stellen, der alle Konten abdeckt.' },
    ],
    relatedServicePath: '/de/superannuation',
    relatedServiceLabel: 'Deine Super beantragen',
  },
  // Work Rights
  {
    category: 'Work Rights',
    slug: 'work-rights',
    title: 'Blogartikel zu Arbeitsrechten für Working Holiday Maker',
    description: 'Deine Rechte als Arbeitnehmer in Australien: Mindestlohn, Pausen, Überstunden, Jobkündigung und was tun, wenn dein Arbeitgeber dich abzockt.',
    intro: 'Als Working Holiday Maker hast du in Australien dieselben Arbeitsrechte wie ein australischer Arbeitnehmer. Du hast Anspruch auf Mindestlohn, Pausen, Überstundenvergütung und Schutz vor unfairem Verhalten. Leider werden Backpacker oft ausgenutzt - vor allem auf Farmen und in der Gastronomie. Diese Artikel erklären deine Rechte, was du tun kannst, wenn etwas schiefläuft, und wie du dich vor Betrug schützt.',
    faq: [
      { question: 'Wie viel ist der Mindestlohn in Australien?', answer: 'Der nationale Mindestlohn in Australien liegt bei 26,44 AUD pro Stunde brutto (Stand 1. Juli 2026). Für Casualarbeit gibt es einen Aufschlag von 25 %. Bestimmte Branchen (z.B. Gastronomie, Landwirtschaft) haben eigene Awards mit höheren Sätzen.' },
      { question: 'Was ist Casual Loading und wie viel ist das?', answer: 'Casual Loading ist ein Aufschlag von 25 % auf den Stundenlohn für Casualarbeiter. Das gleicht aus, dass Casuals keinen bezahlten Urlaub und keinen Krankheitslohn bekommen. Wenn dein Arbeitgeber dir keinen Casual Loading zahlt, hat er möglicherweise gegen das Gesetz verstoßen.' },
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
    title: 'Blogartikel zu Medicare und anderen Steuerthemen',
    description: 'Medicare, Medicare-Levy-Befreiung, Steuerresidenz, Doppelbesteuerung und andere Themen für Working Holiday Maker in Australien.',
    intro: 'Medicare ist das öffentliche Gesundheitssystem in Australien. Es wird teilweise durch die 2 %-Medicare Levy finanziert, die automatisch von deinem zu versteuernden Einkommen abgezogen wird. Die meisten Working Holiday Maker haben keinen Anspruch auf Medicare und sollten daher eine Befreiung beantragen. Diese Artikel decken Medicareberechtigung, die Levy-Befreiung, Sozialversicherungsabkommen (RHCA) und andere wichtige Steuerthemen ab.',
    faq: [
      { question: 'Habe ich als deutscher Working Holiday Maker Anspruch auf Medicare?', answer: 'Nein. Deutschland hat KEIN Sozialversicherungsabkommen (RHCA) mit Australien. Das heißt: Als deutscher Working Holiday Maker hast du keinen Anspruch auf Medicare. Stattdessen solltest du eine Medicare-Levy-Befreiung bei deiner Steuererklärung beantragen.' },
      { question: 'Was ist die Medicare-Levy-Befreiung?', answer: 'Wenn du keinen Anspruch auf Medicare hast - was auf die meisten Working Holiday Visuminhaber zutrifft - kannst du bei deiner Steuererklärung eine Medicare-Levy-Befreiung beantragen. Das spart dir die 2 %-Levy auf dein Einkommen, was Hunderte bis Tausende Dollar betragen kann.' },
      { question: 'Welche Länder haben ein Sozialversicherungsabkommen (RHCA) mit Australien?', answer: 'Aktuell haben Großbritannien, Neuseeland, Irland, Schweden, Niederlande, Finnland, Belgien, Italien, Malta, Norwegen und Slowenien ein RHCA mit Australien. Deutschland NICHT.' },
      { question: 'Brauche ich eine private Krankenversicherung in Australien?', answer: 'Eine private Krankenversicherung ist nicht zwingend nötig, aber sehr empfehlenswert für Working Holiday Maker ohne Medicareanspruch. Sie deckt medizinische Kosten ab, die du sonst selbst zahlen müsstest. Das ist getrennt von der Medicare Levy.' },
    ],
    relatedServicePath: '/de/medicare',
    relatedServiceLabel: 'Medicarestatus prüfen',
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
  'diy-tax-return-vs-tax-agent-working-holiday': {
    title: 'Selbst machen oder Tax Agent? Der ehrliche Vergleich',
    description: 'Die Abgabe über myTax ist kostenlos; ein registrierter Agent kostet, findet aber Residency, Befreiungen und Abzüge, die Backpacker übersehen. Wann sich was lohnt.',
    body: `
Du kannst deine australische Steuererklärung kostenlos selbst über myTax einreichen oder einen registrierten Tax Agent beauftragen. Für Working Holiday Maker mit einem Arbeitgeber, korrekten 15 % das ganze Jahr und ohne Werbungskosten funktioniert die Selbstabgabe gut. Ein Agent verdient seine Gebühr, wenn Mehrfach-Arbeitgeber, 45-%-Phasen, die Medicare-Levy-Befreiung, eine ABN oder die Abgabe aus Deutschland im Spiel sind.

## Was Selbstabgabe über myTax bedeutet

myTax ist das kostenlose Online-Tool des ATO, erreichbar über ein mit dem ATO verknüpftes myGov-Konto. Deine Income Statements füllen sich ab Mitte Juli automatisch vor. Bei einer einfachen Erklärung dauert das Formular unter einer Stunde. Der Haken für Backpacker: myTax ist für Residents gebaut - die Residency-Fragen, das WHM-Einkommensfeld und der Medicare-Abschnitt sind genau die Stellen, an denen die meisten raten.

## Wo Backpacker bei der Selbstabgabe Geld verlieren

- **Medicare-Levy-Befreiung übersprungen** - sie erfordert ein Wochen vorher bestelltes Medicare Entitlement Statement von Services Australia. Auslassen kostet 2 % des zu versteuernden Einkommens, rund 500 Dollar bei 25.000 Dollar
- **Residency falsch beantwortet** - der häufigste Backpacker-Fehler und Auslöser fehlerhafter Bescheide
- **Werbungskosten nicht geltend gemacht** - RSA- und White-Card-Kurse, Sonnenschutz für Außenarbeit, Werkzeug, Waschen von Pflichtuniformen, Agentengebühr des Vorjahres
- **Mehrere Arbeitgeber nicht abgeglichen** - der Überabzug bei einem im September verlassenen Job fällt ohne Prüfung aller Income Statements niemandem auf
- **ABN-Einkommen falsch behandelt** - Liefern oder Farm-Contracting mit ABN bedeutet Geschäftsposten, mögliche GST-Fragen und andere Abzüge. Siehe unsere [ABN-Guides](/de/blog/category/abn)

## Was ein Agent anders macht

Ein registrierter Tax Agent (jeder Agent ist im TPB-Register prüfbar) darf für Steuerberatung und Abgabe Geld nehmen, trägt berufliche Pflichten und bekommt verlängerte Abgabefristen. Speziell für Working Holiday Maker klärt ein guter Agent deine Residency-Position, besorgt das Medicare Entitlement Statement, prüft den Abzug über alle Arbeitgeber, macht zulässige Werbungskosten geltend und reicht korrekt ein - auch wenn du längst wieder in Deutschland bist. Die Gebühr ist im Folgejahr absetzbar.

## Die ehrliche Entscheidungshilfe

**Selbst machen ist sinnvoll, wenn:** ein registrierter Arbeitgeber das ganze Jahr, TFN ab Tag eins, keine ABN, du nächstes Jahr in Australien bleibst und dir die myTax-Fragen klar sind.

**Ein Agent ist sinnvoll, wenn:** irgendeine Phase mit 45 % Abzug, mehr als zwei Arbeitgeber, Farm- oder Arbeit bei nicht registrierten Betrieben, Medicare-Levy-Befreiung, ABN-Einkommen, Abreise vor oder während der Steuersaison, oder eine Erstattung, bei der ein Fehler wehtut.

## Häufige Fragen

### Was kostet ein Tax Agent für eine Working-Holiday-Erklärung?

Das variiert je nach Anbieter und Komplexität. Unsere Gebühren stehen transparent auf der [Service-Seite](/de/tax-return) - ohne Prozent-vom-Erstattungsbetrag-Modell, vor dem du dich hüten solltest.

### Ist myTax wirklich kostenlos?

Ja, vollständig. Wenn deine Erklärung einfach ist und du die Fragen richtig beantwortest, ist die Selbstabgabe eine legitime Wahl - dieser Guide existiert, damit du sie ehrlich treffen kannst.

### Kann ein Agent nach meiner Abreise für mich einreichen?

Ja - die Abgabe aus dem Ausland ist Standard, inklusive Abruf deiner Income Statements und gleichzeitiger Organisation deines [Super-Antrags](/de/superannuation).

[Melde dich bei uns](/de/contact), wenn du eine schnelle Einschätzung willst, ob dein Fall ein DIY-Fall ist - wir sagen es dir ehrlich, in beide Richtungen.
`,
  },
  'working-holiday-visa-tax-guide-417-462': {
    title: 'Steuern mit 417/462-Visum: Sätze, Erstattung, Regeln (2026)',
    description: 'Der komplette Steuerguide für Working Holiday Maker: 15 % auf die ersten 45.000 Dollar, was darüber gilt, Medicare-Levy-Befreiung, Super und Erstattungen.',
    body: `
Working Holiday Maker mit 417- oder 462-Visum zahlen 2025-26 pauschal 15 % Steuer auf die ersten 45.000 Dollar, die sie in Australien verdienen - ohne Steuerfreibetrag. Darüber greifen die normalen Sätze. Damit 15 % automatisch gelten, muss dein Arbeitgeber registriert sein; andernfalls gelten höhere Foreign-Resident-Sätze, und der Überschuss kommt über die Steuererklärung zurück.

## Die WHM-Steuersätze 2025-26

- **Erste 45.000 Dollar: 15 %**
- 45.001 bis 135.000 Dollar: 30 %
- 135.001 bis 190.000 Dollar: 37 %
- Über 190.000 Dollar: 45 %

Zwei Dinge überraschen deutsche Backpacker regelmäßig. Erstens: Es gibt keinen Steuerfreibetrag - Australier zahlen auf ihre ersten 18.200 Dollar nichts, Working Holiday Maker ab dem ersten Dollar 15 %. Zweitens: Die 15 % gelten nur automatisch, wenn dein Arbeitgeber beim ATO als Working-Holiday-Arbeitgeber registriert ist.

## Registrierte vs. nicht registrierte Arbeitgeber

Registrierte Arbeitgeber behalten ab dem ersten Dollar 15 % ein. Nicht registrierte müssen zu Foreign-Resident-Sätzen ab über 30 % einbehalten. Vorher erkennen lässt sich das selten - Farmen und kleine Gastro sind die üblichen Verdächtigen. Die gute Nachricht: Der Überabzug ist nicht verloren, sondern kommt mit deiner [Steuererklärung](/de/tax-return) zurück.

## Alles hängt an deiner TFN

Ohne TFN in der Lohnbuchhaltung muss dein Arbeitgeber 45 % einbehalten, egal ob registriert oder nicht. Beantrage deine [TFN](/de/tfn) sofort nach der Ankunft (der Antrag geht nur aus Australien heraus), gib sie jedem Arbeitgeber über die Tax File Number Declaration, und ab der nächsten Abrechnung gilt der korrekte Satz.

## Die Medicare-Levy-Befreiung, die viele übersehen

Australier zahlen zusätzlich 2 % Medicare-Abgabe. Die meisten 417/462-Inhaber - Deutschland hat kein Abkommen mit Australien - haben keinen Medicare-Anspruch und können sich vollständig befreien lassen. Bei 25.000 Dollar Einkommen sind das rund 500 Dollar, beantragt über ein Medicare Entitlement Statement und geltend gemacht in der Steuererklärung. Details im [Guide zur Medicare-Levy-Befreiung](/de/blog/medicare-levy-working-holiday-makers).

## Superannuation: die anderen 12 %

Zusätzlich zum Lohn muss jeder Arbeitgeber 12 % deines regulären Verdienstes in einen Super-Fonds zahlen. In Australien kommst du nicht heran, aber nach Abreise und Visa-Ende holst du es als DASP (65 % Steuer). Ein Jahr Vollzeit hinterlässt typischerweise mehrere tausend Dollar - siehe [die beste Methode, sie zu holen](/de/blog/best-way-to-claim-super-leaving-australia).

## Residency: die Frage, die deine Erklärung entscheidet

Die meisten Working Holiday Maker sind steuerlich nicht ansässig, die WHM-Sätze gelten aber ohnehin. Die Residency-Fragen in myTax bringen jedes Jahr tausende Backpacker ins Straucheln - falsche Antworten sind der häufigste Grund für fehlerhafte Bescheide und spätere ATO-Korrekturen. Wenn deine Situation nicht dem Lehrbuch entspricht (langer Aufenthalt, ein Ort, Studium), hol dir vor der Abgabe Rat.

## Die wichtigsten Termine

- **1. Juli bis 30. Juni**: das australische Steuerjahr
- **Ab 1. Juli**: Abgabe möglich
- **31. Oktober**: Frist für die Selbstabgabe (mit Agent länger)
- **Endgültige Abreise mitten im Jahr?** Dann geht die vorgezogene Erklärung sofort

## Häufige Fragen

### Bekommen Working Holiday Maker den Steuerfreibetrag?

Nein. Die 18.200 Dollar gelten nicht für WHM-Einkommen - die Steuer startet bei 15 % ab dem ersten Dollar.

### Welcher Satz gilt im zweiten Jahr auf dem 417-Visum?

Dieselben WHM-Sätze. Auch deine TFN bleibt dieselbe - siehe [was beim zweiten Visum zu aktualisieren ist](/de/blog/do-you-need-new-tfn-second-visa).

### Bekomme ich bei der Abreise alle Steuern zurück?

In der Regel nicht - 15 % auf Einkommen bis 45.000 Dollar sind die korrekte Endsteuer. Zurück holst du Überabzüge, die Medicare-Levy-Befreiung, Werbungskosten und deine Super über DASP.

Nutze unseren [Rechner](/de/calculator) für eine schnelle Schätzung oder [melde dich bei uns](/de/contact) - registrierte Tax Agents, die ausschließlich mit Working Holiday Makern arbeiten.
`,
  },
  'best-way-to-claim-super-leaving-australia': {
    title: 'DIY, Agent oder ATO-Verwahrung: 3 Wege, deine Super nach der Abreise zu holen',
    description: 'Sobald du DASP-berechtigt bist, gibt es drei echte Wege zu deiner Super - mit unterschiedlichen Kosten, Tempo und Aufwand. Welcher zu deiner Situation passt.',
    body: `
Sobald du Australien verlassen hast und dein Working-Holiday-Visum abgelaufen ist, gibt es nicht nur einen Weg, deine Superannuation als Departing Australia Superannuation Payment (DASP) zurückzuholen - sondern drei, die zu unterschiedlichen Situationen passen. Die 65 % Steuer auf Working-Holiday-Super fällt bei allen drei Wegen gleichermaßen an, ein Guthaben von 10.000 Dollar bringt also so oder so rund 3.500 Dollar. Was sich unterscheidet, sind Kosten, Tempo und wie viel Papierkram bei dir hängen bleibt.

## Zuerst: bist du berechtigt?

DASP geht nur, wenn alles Folgende zutrifft:

- Du hast Super auf einem temporären Visum angesammelt (417 und 462 zählen)
- Du hast Australien verlassen
- Dein Visum ist abgelaufen oder wurde storniert

Solange dein Visum aktiv ist, geht der Antrag nicht - auch nicht aus Deutschland. Planst du eine Rückkehr auf einem anderen temporären Visum, kannst du trotzdem beanspruchen: Entscheidend ist, dass das Visum, unter dem die Super entstand, beendet ist.

## Die drei Wege

### Weg 1: selbst über das DASP-Portal

Kostenlos. Funktioniert gut bei einem einzigen Fonds, vollständigen Ausweisdokumenten und einem Fonds, der keine beglaubigten Kopien verlangt. Fordert der Fonds zusätzliche Identitätsprüfungen, wird es aus dem Ausland deutlich mühsamer.

### Weg 2: über einen Agenten

Kostet eine Gebühr, übernimmt aber genau die Teile, die in der Praxis schiefgehen: alle Fonds finden (viele Backpacker haben zwei oder drei, ohne es zu wissen), fondsspezifische Dokumentenanforderungen, beglaubigte Kopien, Nachfassen bei stummen Fonds, und die Kombination mit deiner [letzten Steuererklärung](/de/tax-return). Besonders sinnvoll bei mehreren Fonds oder wenn du schon abgereist bist.

### Weg 3: ATO-verwahrte Super

Wer nicht innerhalb von rund 6 Monaten nach der Abreise beansprucht, dessen Guthaben wandert als Unclaimed Super zum ATO. Verloren ist nichts - der Antrag geht dann an das ATO statt an den Fonds - aber die Fondsversicherung endet und das Verfahren unterscheidet sich. Wenn du vor Jahren abgereist bist, liegt dein Geld sehr wahrscheinlich dort.

## Was du brauchst

Bei allen drei Wegen brauchst du dieselben Basics: Passdaten und Visumsinformationen, deine TFN, Fondsname und Mitgliedsnummer für jeden Fonds, und ein Bankkonto für die Auszahlung. Die genaue Checkliste je Fonds findest du in [unserer vollständigen DASP-Dokumentencheckliste](/de/blog/dasp-documents-required). Weißt du nicht, in welchen Fonds dein Arbeitgeber eingezahlt hat? Wir können [verlorene Super finden](/de/blog/how-to-find-lost-superannuation) - über alle Fonds und ATO-verwahrten Beträge hinweg.

## Wie viel du tatsächlich bekommst

Egal für welchen Weg du dich entscheidest, die Besteuerung ist identisch: 65 % werden einbehalten, es kommen also rund 35 Cent pro Dollar bei dir an. Was sich zwischen den drei Wegen unterscheidet, ist Tempo und Aufwand - nicht der Steuersatz. Die genaue Aufschlüsselung nach Guthabenhöhe steht in [warum DASP mit 65 % besteuert wird](/de/blog/dasp-tax-rate-65-percent-explained), realistische Zeitrahmen in [wie lange DASP dauert](/de/blog/how-long-does-dasp-take).

## Dein Timing rund um die 6-Monats-Frist

Die entscheidende Frist: rund 6 Monate nachdem dein Visum endet und du ausreist, müssen Fonds nicht beanspruchte Guthaben an das ATO übertragen. Beanspruchst du vorher, hast du es mit deinem Fonds zu tun - App-Zugang, bekannte Mitgliedsnummer, vertrauter Ablauf, aber auch die Papierkram-Standards des Fonds (beglaubigte Kopien, Identitätsprüfung aus dem Ausland). Beanspruchst du danach, hast du es mit dem ATO zu tun - oft weniger Papierkram-Reibung, keine Fondsgebühren, die das Guthaben schmälern, während du gezögert hast, aber du musst erst herausfinden, wohin das Geld gewandert ist. Kein Timing lässt dich dauerhaft Geld verlieren; die Gebührenerosion vor der Übertragung ist die einzige echte Kosten des Wartens. Am besten bleibt, alles [vor dem Abflug](/de/blog/how-to-apply-for-super-back) vorzubereiten, damit der Antrag in der Woche rausgeht, in der die Berechtigung beginnt.

## Häufige Fragen

### Lohnt sich der Antrag bei 65 % Steuer?

Ja. Die Alternative ist, 100 % liegen zu lassen. Ein Jahr Vollzeitarbeit summiert sich bei 12 % Beitrag schnell - aus 8.000 Dollar Guthaben werden immer noch etwa 2.800 Dollar für dich.

### Welcher der drei Wege ist tatsächlich am schnellsten?

In der Praxis meist der Weg über einen Agenten - nicht weil das ATO Agentenanträge schneller bearbeitet, sondern weil Agenten genau die Fehler abfangen (falsche Mitgliedsnummer, fehlende beglaubigte Kopie, ein nicht erkanntes Passformat), die DIY-Anträge im Hin und Her mit dem Fonds ausbremsen. Ein sauberer DIY-Antrag mit einem einzigen Fonds kann genauso schnell sein; der DIY-Weg wird erst langsam, sobald mehrere Fonds oder lückenhafte Unterlagen im Spiel sind.

### Was passiert, wenn ich nie beanspruche?

Das Geld geht als Unclaimed Money an das ATO und liegt dort unbefristet - das vollständige Bild steht in [was mit nicht beanspruchter Super passiert](/de/blog/what-happens-to-unclaimed-super). Du kannst es Jahre später holen, verdienst in der Zwischenzeit aber keine Fondserträge.

[Melde dich vor dem Abflug](/de/contact) - zehn Minuten Vorbereitung sparen dir Wochen Dokumentenjagd aus Deutschland, egal für welchen Weg du dich am Ende entscheidest.
`,
  },
  'average-tax-refund-working-holiday': {
    title: 'Wie hoch ist die Steuererstattung im Working Holiday? Rechenbeispiele',
    description: 'Erstattungen reichen von ein paar hundert bis mehreren tausend Dollar - je nach Abzug, Einkommen und Werbungskosten. Konkrete Beispiele für 417/462.',
    body: `
Die durchschnittliche australische Steuererstattung wird oft mit rund 2.600 Dollar angegeben. Für Working Holiday Maker lautet die ehrliche Antwort aber: Es kommt darauf an, wie viel einbehalten wurde im Vergleich zu den 15 %, die du auf Einkommen bis 45.000 Dollar tatsächlich schuldest. Wer Phasen mit 45 % Abzug hatte oder bei einem nicht registrierten Arbeitgeber gearbeitet hat, sieht regelmäßig vierstellige Erstattungen.

## Drei Zahlen entscheiden über deine Erstattung

Die Erstattung ist kein Bonus, sondern die Differenz zwischen dem, was einbehalten wurde, und dem, was du gesetzlich schuldest. Entscheidend sind:

1. Das **Gesamteinkommen** im Steuerjahr (1. Juli bis 30. Juni)
2. Die **gesamte einbehaltene Steuer** über alle Arbeitgeber - hier versteckt sich der Überabzug
3. **Befreiungen und Werbungskosten** - vor allem die Medicare-Levy-Befreiung und berufsbezogene Ausgaben

## Rechenbeispiele

Mit den WHM-Sätzen 2025-26 (15 % auf die ersten 45.000 Dollar):

### Beispiel 1: das ganze Jahr korrekt besteuert

30.000 Dollar verdient, alle Arbeitgeber registriert, 15 % einbehalten (4.500 Dollar). Geschuldete Steuer: 4.500 Dollar. Erstattung vor Befreiungen: null. Mit Medicare-Levy-Befreiung und 300 Dollar Werbungskosten ergibt sich typischerweise eine Erstattung im niedrigen dreistelligen Bereich.

### Beispiel 2: sechs Wochen ohne TFN im System

Ebenfalls 30.000 Dollar, aber die ersten 4.000 Dollar wurden mit 45 % statt 15 % belastet, weil die TFN spät kam. Zusätzlicher Abzug: rund 1.200 Dollar - vollständig erstattet, zusätzlich zu allen Befreiungen.

### Beispiel 3: Farmarbeit bei einem nicht registrierten Arbeitgeber

18.000 Dollar verdient, davon 10.000 Dollar bei einem Betrieb ohne WHM-Registrierung mit über 30 % Abzug. Die Differenz zu 15 % auf diesen Teil - grob 1.500 Dollar oder mehr - kommt zur Steuerzeit zurück.

### Beispiel 4: Abreise im Januar

22.000 Dollar in einem halben Jahr, dann endgültige Abreise. Der Abzug unterstellte ein volles Jahreseinkommen, weshalb eine vorgezogene Erklärung oft eine deutlich größere Erstattung plus Medicare-Levy-Befreiung freisetzt.

## So findest du deine echte Zahl

Vergiss Durchschnittswerte - deine Payslips erzählen die Wahrheit. Addiere Einkommen und einbehaltene Steuer aus jedem Job und gib sie in unseren [Steuerrechner](/de/calculator) ein. Payslips verloren oder bar gearbeitet? Ein registrierter Agent ruft deine offiziellen Income Statements direkt beim ATO ab.

## Häufige Fragen

### Stimmen die 2.600 Dollar Durchschnitt?

Das ist ein breit beworbener Branchendurchschnitt über alle Visumsarten, keine Working-Holiday-Zahl. Deine Erstattung hängt allein von deinem Abzug ab.

### Bekomme ich bei der Abreise alle Steuern zurück?

Nein, das ist ein Mythos. Zurück kommt nur, was über deine korrekte 15-%-Schuld hinaus einbehalten wurde, plus Befreiungen und Werbungskosten. Vollständig zurückholen kannst du deine [Superannuation](/de/superannuation), abzüglich DASP-Steuer.

### Was bringt Backpackern am meisten?

Die Medicare-Levy-Befreiung (2 % des zu versteuernden Einkommens für die meisten 417/462-Inhaber) und die Korrektur von Phasen mit 45 % Abzug.

[Melde dich bei uns](/de/contact) - wir prüfen den Abzug über alle Arbeitgeber, bevor du einreichst.
`,
  },
  'tax-back-australia-working-holiday': {
    title: 'Steuern zurück aus Australien: Der Working-Holiday-Guide (2026)',
    description: 'So holst du dir nach Work and Travel deine Steuern aus Australien zurück: was erstattet wird, wie hoch die Rückzahlung ausfällt, Fristen - auch nach der Rückkehr.',
    body: `
Die meisten Working Holiday Maker bekommen nach dem Steuerjahr Geld aus Australien zurück. Die Rückerstattung reicht von ein paar hundert bis zu mehreren tausend Dollar - je nachdem, wie viel Steuer einbehalten wurde, wie hoch dein Einkommen war und welche Befreiungen du geltend machst. Beantragt wird sie über die Steuererklärung (Tax Return) bei der ATO ab dem 1. Juli - oder früher, wenn du Australien endgültig verlässt.

## Warum Backpacker Steuern zurückbekommen

Bei jeder Lohnzahlung wird Steuer nach einer Schätzung einbehalten. Was du wirklich schuldest, steht erst mit der Steuererklärung fest. Bei Working Holiday Makern klafft dazwischen oft eine große Lücke:

- **45 % statt 15 % einbehalten** - hatte dein Arbeitgeber deine TFN nicht vorliegen, musste er 45 % abziehen. Die Differenz bekommst du komplett zurück.
- **Falscher Steuersatz** - nicht als Working-Holiday-Arbeitgeber registrierte Betriebe (häufig Farmen) ziehen über 30 % ab statt 15 %.
- **Medicare-Levy-Befreiung** - die meisten 417/462-Inhaber haben keinen Medicare-Anspruch und können sich die 2 %-Abgabe befreien lassen: ca. 500 $ bei 25.000 $ Einkommen.
- **Absetzbare Ausgaben** - Arbeitskleidung, Sonnenschutz bei Outdoor-Jobs, Kurse wie RSA oder White Card, Fahrten zwischen Einsatzorten.
- **Abreise mitten im Steuerjahr** - wer nur einen Teil des Jahres gearbeitet hat, hat fast immer zu viel Steuer einbehalten bekommen.

## Wie viel bekommst du zurück?

Eine pauschale Zahl gibt es nicht - wer dir eine Erstattung verspricht, ohne deine Lohnabrechnungen zu kennen, rät. Als Orientierung: Lief alles korrekt mit 15 %, bleibt die Rückzahlung überschaubar (Levy-Befreiung plus Ausgaben). Gab es Phasen mit 45 %-Abzug oder einen unregistrierten Arbeitgeber, geht es schnell in die Tausende. Rechne dein Szenario in zwei Minuten mit unserem [Steuerrechner](/de/calculator) durch.

## Wann und wie du den Antrag stellst

Das australische Steuerjahr läuft vom 1. Juli bis 30. Juni. Ab dem 1. Juli kannst du einreichen, Frist für die Selbstabgabe ist der 31. Oktober - über einen registrierten Tax Agent deutlich länger. Drei Wege:

1. **myTax über myGov** - kostenlos, aber die Fragen zu Residency und Working-Holiday-Einkommen führen bei vielen Backpackern zu Fehlern
2. **Registrierter Tax Agent** - übernimmt Residency-Einstufung, Medicare-Levy-Papierkram und Ausgaben; die Gebühr ist im Folgejahr absetzbar
3. **Aus Deutschland nach der Rückkehr** - die Erklärung geht auch aus dem Ausland, inklusive Vorjahre

Unser Team ist auf [Working-Holiday-Steuererklärungen](/de/tax-return) spezialisiert und prüft jeden der oben genannten Erstattungspunkte standardmäßig.

## Vergiss deine Superannuation nicht

Die Steuererstattung ist nur die Hälfte des Geldes. Deine Arbeitgeber haben zusätzlich 12 % deines Lohns in einen Rentenfonds (Super) eingezahlt. Nach der Abreise und dem Ablauf deines Visums kannst du das Guthaben als DASP auszahlen lassen. Alles dazu in unserem [Super-Service](/de/superannuation).

## Häufige Fragen

### Wie lange dauert die Steuererstattung aus Australien?

Elektronisch eingereichte Erklärungen bearbeitet die ATO meist innerhalb von 2 Wochen, maximal etwa 30 Tage.

### Kann ich die Steuern auch nach der Rückkehr nach Deutschland beantragen?

Ja - auch für zurückliegende Jahre. Deine Einkommensnachweise ruft der Tax Agent direkt bei der ATO ab, verlorene Payslips sind kein Problem.

### Bekomme ich als Backpacker alle Steuern zurück?

Nein, das ist ein Mythos. Die 15 % auf Einkommen bis 45.000 $ sind grundsätzlich korrekt. Zurück gibt es alles, was darüber hinaus einbehalten wurde - plus Befreiungen, Ausgaben und deine Superannuation.

[Melde dich bei unserem Team](/de/contact) für einen unverbindlichen Check, was dir zusteht - als registrierte Tax Agents machen wir das täglich für Working Holiday Maker.
`,
  },
  // ─── TFN (10 posts translated) ─────────────────────────────────────────────

  'what-is-a-tfn': {
    title: 'Was ist eine TFN und warum brauchst du eine in Australien?',
    description: 'Eine Tax File Number ist das Erste, was du brauchst, wenn du in Australien arbeiten willst. Ohne TFN behält dein Arbeitgeber fast die Hälfte deines Lohns ein.',
    body: `
Eine Tax File Number (TFN) ist eine eindeutige neunstellige Nummer, die das ATO (australisches Finanzamt) jeder Person ausstellt, die in Australien Einkommen hat. Du brauchst sie, weil ohne TFN dein Arbeitgeber gesetzlich verpflichtet ist, 45 % Steuern einzubehalten - statt der 15 %, die für Working Holiday Maker gelten. Die TFN ist permanent, kostenlos und bleibt ein Leben lang gültig.

Jeder Arbeitnehmer in Australien braucht eine TFN, egal ob du Staatsbürger, Daueraufenthaltsberechtigter oder Backpacker mit Working-Holiday-Visum bist. Das ATO nutzt sie, um dein Einkommen, deine Steuerzahlungen und mögliche Rückzahlungen nachzuverfolgen.

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
- Auf dein [Superkonto](/de/superannuation) zuzugreifen und es zu beantragen, wenn du Australien verlässt
- Bestimmte australische Bankkonten zum korrekten (nicht-einbehaltenen) Satz zu eröffnen
- Steuerrückerstattungen zu bekommen, die dir zustehen

Jede andere steuerliche Verpflichtung - Steuererklärung, Superantrag oder ABN-Registrierung - ist mit deiner TFN verknüpft.

## Wer kann in Australien eine TFN beantragen?

Jeder Visuminhaber mit Arbeitserlaubnis in Australien kann eine TFN beantragen. Das umfasst:

- Working Holiday Visum Subclass 417
- Work and Holiday Visum Subclass 462
- Studentenvisa mit Arbeitserlaubnis
- Die meisten temporären Fachkräftevisa

Der Antrag ist kostenlos, dauert etwa 10 Minuten und wird innerhalb von 28 Tagen bearbeitet. Unser Team kümmert sich um den vollständigen Antrag für dich, sodass du dich nicht mit dem Papierkram herumärgern musst.

## Wie gibst du deinem Arbeitgeber deine TFN?

Sobald du deine TFN erhalten hast, fülle für jeden Arbeitgeber, bei dem du arbeitest, ein TFN Declaration-Formular aus. Dieses Formular teilt deinem Arbeitgeber mit, welchen Steuersatz er auf deinen Lohn anwenden soll - und ist das offizielle Dokument, das den korrekten 15 %-Satz auslöst.

Reiche das Formular zügig ein. Bis dein Arbeitgeber es hat, muss er den höchsten Satz einbehalten, egal welches Visum du hast. Das gilt für jeden Arbeitgeber, auch für Casual- und Kurzzeitjobs.

## Was passiert, wenn du schon ohne TFN angefangen hast zu arbeiten?

Beantrage deine TFN so schnell wie möglich und sag deinem Arbeitgeber, dass dein Antrag läuft. Zeig ihm die Bestätigungs-E-Mail vom ATO, falls du sie hast. Sobald deine TFN bei ihm registriert ist, gilt der korrekte Steuersatz für alle künftigen Zahlungen.

Steuer, die du zu viel gezahlt hast, bevor deine TFN hinterlegt war, kannst du dir mit deiner [Steuererklärung](/de/tax-return) am Ende des Steuerjahres zurückholen. Das Geld geht nicht dauerhaft verloren, solange du die Steuererklärung fristgerecht einreichst.

[Kontaktiere unser Team](/de/contact), um deine TFN unter Aufsicht eines registrierten Steueragenten zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 
## Eine Nummer, vier Systeme

Deine TFN verbindet dich mit der ATO (Steuern und Erstattungen), der Lohnbuchhaltung deines Arbeitgebers (Abzugssatz), deinem Super-Fonds (Beitragszuordnung) und weiteren Regierungssystemen. Genau diese Reichweite ist der Grund für die Geheimhaltung: TFN plus Passdaten ergibt ein brauchbares Identitätsdiebstahl-Set. Herausgeben nur an: den Arbeitgeber nach Jobzusage (über das offizielle Deklarationsformular), deinen Super-Fonds, deine Bank und die ATO oder deinen registrierten Steueragenten - [die vollständige Liste ist kurz](/de/blog/who-can-ask-for-your-tfn). Nicht an Vermieter, nicht an Recruiter vor der Einstellung, nicht an irgendwen über WhatsApp.
`,
  },

  'how-to-apply-for-a-tfn': {
    title: 'Wie du als Working Holiday Maker eine TFN beantragst',
    description: 'Eine TFN in Australien zu beantragen ist einfach und kostenlos. So machst du es als Working Holiday Visuminhaber - Schritt für Schritt.',
    body: `
Um als Working Holiday Maker eine Tax File Number (TFN) zu beantragen, reichst du einen Onlineantrag direkt beim ATO (australisches Finanzamt) ein. Der Antrag ist kostenlos, dauert etwa 10 Minuten und deine TFN kommt innerhalb von 28 Tagen per Post. Du kannst den Antrag stellen, sobald dein Working Holiday Visum genehmigt wurde - sogar bevor du in Australien ankommst - solange du eine gültige australische Postadresse hast.

## Wer bearbeitet deinen TFN-Antrag?

TFN-Anträge für ausländische Reisepassinhaber werden vom ATO (australisches Finanzamt) bearbeitet. Nach der Genehmigung wird deine TFN innerhalb von 28 Tagen per Post zu dir geschickt - oft auch schneller in ruhigeren Bearbeitungszeiten.

## Was du brauchst, bevor du den Antrag stellst

Für den TFN-Antrag brauchst du:

- Deinen Reisepass (Nummer, Geburtsdatum und Visadetails)
- Eine gültige australische Wohnadresse, an die das ATO deinen TFN-Brief schicken kann
- Eine gültige E-Mail-Adresse für Antragsbestätigungen

Wenn du noch keine feste Unterkunft hast, geht auch eine Hostel-Adresse - solange du sicher bist, dass du noch dort bist, wenn der Brief ankommt. Du bekommst zwei E-Mails vom ATO: eine bestätigt den Eingang des Antrags, die andere informiert dich, wenn der Antrag bearbeitet wurde.

## Wie der TFN-Antragsprozess Schritt für Schritt abläuft

Sobald du deinen Antrag eingereicht hast, schickt dir das ATO eine Referenznummer per E-Mail als Bestätigung, dass der Antrag läuft. Bewahre diese Referenznummer auf - sie ist der einfachste Weg, nachzufragen, falls etwas schiefläuft.

Deine TFN selbst kommt innerhalb von 28 Tagen als Brief an deine australische Adresse. Bewahre diesen Brief sicher auf. Das ATO kann dir später bei einer vergessenen TFN helfen, aber es ist viel einfacher, das Original griffbereit zu haben.

## Kannst du anfangen zu arbeiten, bevor deine TFN da ist?

Ja. Du kannst anfangen zu arbeiten, bevor deine TFN ankommt, aber informiere deinen Arbeitgeber, dass dein Antrag läuft, und zeige ihm die ATO-Bestätigungs-E-Mail, wenn du sie hast. Technisch sind Arbeitgeber verpflichtet, 45 % Steuern einzubehalten, bis sie deine TFN hinterlegt haben, manche akzeptieren jedoch die Bestätigungs-E-Mail und wenden einen niedrigeren Satz an.

Die zu viel einbehaltene Steuer während der Wartezeit kannst du dir mit deiner [Steuererklärung](/de/tax-return) am Ende des Steuerjahres zurückholen.

## Was tun, sobald deine TFN ankommt

Wenn dein TFN-Brief ankommt:

1. Fülle für jeden Arbeitgeber, bei dem du arbeitest, ein TFN Declaration-Formular aus
2. Gib das Formular zügig an deinen Arbeitgeber zurück
3. Bestätige auf deinem nächsten Lohnzettel, dass der korrekte 15 %-Satz für Working Holiday Maker angewendet wird

Jeder Arbeitgeber braucht sein eigenes TFN Declaration-Formular. Wenn du deine TFN einem Arbeitgeber gibst, wird sie nicht automatisch mit anderen geteilt.

[Kontaktiere unser Team](/de/contact), um deine TFN unter Aufsicht eines registrierten Steueragenten zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 `,
  },

  'how-long-does-it-take-to-get-a-tfn': {
    title: 'Wie lange dauert die TFN? Meist 10-28 Tage (2026)',
    description: 'Die ATO stellt die meisten TFNs innerhalb von 28 Tagen aus - oft schon nach 2 Wochen. So läuft die Zustellung und so arbeitest du in der Wartezeit.',
    body: `
Ein TFN-Antrag in Australien wird vom ATO (australisches Finanzamt) innerhalb von 28 Tagen bearbeitet. In der Praxis bekommen viele Antragsteller ihre Tax File Number schon innerhalb von zwei Wochen, der genaue Zeitpunkt hängt aber von der aktuellen Auslastung des ATO ab. Deine TFN kommt als Brief an deine australische Adresse. Es gibt keine Zustellung per E-Mail oder SMS.

## Wie wird deine TFN zugestellt?

Deine TFN kommt als physischer Brief an die australische Adresse, die du im Antrag angegeben hast. Der Brief enthält deine 9-stellige TFN und grundlegende Informationen zur Nutzung.

Wichtige Punkte zur Zustellung:

- Die TFN wird nie per E-Mail oder SMS verschickt, nur per Post
- Sie wird an die australische Adresse auf deinem Antrag geschickt
- Wenn du umziehst, bevor der Brief ankommt, wird er möglicherweise an die alte Adresse zugestellt
- Das ATO kann die TFN bei Verlust des Briefs erneut verschicken, aber nur nach einer Identitätsprüfung

Wenn du zwischen Hostels wechselst, nutze die Adresse von einem Ort, an dem du mindestens vier Wochen bleibst, damit der Brief Zeit zum Eintreffen hat.

## Was kannst du machen, während du auf deine TFN wartest?

Du musst nicht auf deine TFN warten, bevor du anfängst zu arbeiten. Du kannst sofort beginnen und deinem Arbeitgeber sagen, dass dein Antrag läuft.

Solange dein Arbeitgeber deine TFN nicht hat, ist die Standardregel, dass er 45 % Steuern einbehalten muss. Manche Arbeitgeber akzeptieren die ATO-Bestätigungs-E-Mail als Beleg, dass der Antrag läuft, und wenden einen niedrigeren Satz an - das ist aber ihre Entscheidung.

Die zu viel einbehaltene Steuer während der Wartezeit kannst du dir mit deiner [Steuererklärung](/de/tax-return) am Ende des australischen Steuerjahres zurückholen.

## Was, wenn 28 Tage vergangen sind und deine TFN nicht angekommen ist?

Wenn mehr als 28 Tage vergangen sind und dein TFN-Brief noch nicht angekommen ist, gehe folgende Schritte durch:

1. Prüfe nochmal, ob die angegebene Adresse korrekt war (Tippfehler in der Postleitzahl, im Vorort oder in der Hausnummer sind die häufigste Verzögerungsursache)
2. Bestätige das Datum, an dem das ATO deinen Antrag bestätigt hat (die 28 Tage zählen ab diesem Datum, nicht ab dem Tag, an dem du auf "Absenden" geklickt hast)
3. [Kontaktiere unser Team](/de/contact) telefonisch mit deiner Referenznummer aus der Bestätigungs-E-Mail

In den meisten Fällen werden Verzögerungen durch falsche Adressdaten oder verlorene Briefe verursacht. Das ATO kann bestätigen, ob deine TFN ausgestellt wurde, und sie bei Bedarf nochmal verschicken.

## Was tun, sobald deine TFN ankommt

Sobald du deine TFN hast, gib sie sofort deinem Arbeitgeber zusammen mit einem ausgefüllten TFN Declaration-Formular. Das ist das Dokument, das den korrekten 15 %-Steuersatz für Working Holiday Maker auf deinen Lohn auslöst.

Deine TFN brauchst du außerdem, um deine [Steuererklärung](/de/tax-return) einzureichen und auf dein [Superkonto](/de/superannuation) zuzugreifen, wenn du Australien verlässt.
 
## TFN-Zeitplan Woche für Woche: was 2026 normal ist

- **Tag 0**: Online-Antrag gestellt (nur in Australien möglich); Bestätigungsmail mit Referenznummer kommt in Minuten
- **Woche 1-2**: die meisten Anträge werden bearbeitet; der Brief geht in den Versand
- **Woche 2-3**: typisches Ankunftsfenster für Stadtadressen; ländlich und remote dauert länger
- **Tag 28**: die offizielle ATO-Obergrenze - danach mit Referenznummer die 13 28 61 anrufen

Zwei Praxishinweise: Die 28 Tage zählen ab ATO-Bestätigung, nicht ab Klick auf Absenden - und die Zustelltage von Australia Post liegen außerhalb der ATO-Kontrolle; ein Hostel-Postraum addiert weitere.
`,
  },

  'can-you-start-work-without-a-tfn': {
    title: 'Ohne TFN arbeiten? Ja - so funktioniert die 28-Tage-Regel',
    description: 'Du kannst in Australien anfangen zu arbeiten, bevor deine TFN da ist. Du hast 28 Tage Zeit - sonst werden 45 % Steuer einbehalten.',
    body: `
Ja, du kannst legal in Australien anfangen zu arbeiten ohne TFN. Es gibt kein Gesetz, das dich daran hindert, eingestellt zu werden, bevor deine Tax File Number ausgestellt wurde. Allerdings ist dein Arbeitgeber gesetzlich verpflichtet, 45 % Steuern (den höchsten Grenzsteuersatz) einzubehalten, bis du sowohl deine TFN als auch ein ausgefülltes TFN Declaration-Formular bereitstellst.

## Was passiert mit deiner Steuer ohne TFN?

Ohne hinterlegte TFN muss dein Arbeitgeber Steuern zum höchsten Grenzsteuersatz von 45 % einbehalten. Das ist nicht optional. Es ist eine gesetzliche Pflicht, die der Arbeitgeber befolgen muss, um beim ATO konform zu bleiben.

Der 45 %-Satz gilt ab deiner allerersten Schicht und bleibt bestehen, bis du deine TFN bereitstellst. Für einen Working Holiday Maker, der sonst 15 % Steuern zahlen würde, bedeutet das, dass zusätzliche 30 Cent von jedem verdienten Dollar während der Wartezeit einbehalten werden.

## Bekommst du die zu viel gezahlte Steuer zurück?

Ja. Die zu viel einbehaltene Steuer aus der Zeit, bevor deine TFN registriert war, kannst du mit deiner [Steuererklärung](/de/tax-return) am Ende des australischen Steuerjahres zurückholen. Das ATO gleicht ab, was du tatsächlich geschuldet hast, mit dem, was einbehalten wurde, und erstattet die Differenz auf dein australisches Bankkonto.

Der Haken ist das Timing. Du verlierst das Geld nicht dauerhaft, aber du hast monatelang keinen Zugriff darauf - bis zur Steuerzeit. Für Backpacker mit knappem Budget ist diese Verzögerung eine echte Unannehmlichkeit.

## Was ist der praktische Rat?

Um die Zeit der höheren Einbehaltung zu minimieren:

- Beantrage deine TFN so früh wie möglich, idealerweise vor deinem ersten Arbeitstag
- Wenn du schon ohne angefangen hast, beantrage sofort und sag deinem Arbeitgeber, dass der Antrag läuft
- Zeige deinem Arbeitgeber die ATO-Bestätigungs-E-Mail als Beleg
- Gib deinem Arbeitgeber deine TFN und ein TFN Declaration-Formular in dem Moment, in dem deine TFN ankommt

Die Bearbeitung dauert typischerweise bis zu 28 Tage - je früher du beantragst, desto kürzer die Zeit, in der die zusätzlichen 30 % einbehalten werden.

## Was ist mit Schwarzarbeit?

Wenn du bar bezahlt wirst, wird die TFN-Frage anders behandelt, weil keine formelle Lohnabrechnung existiert. Mehr dazu, wie das funktioniert und die steuerlichen Auswirkungen findest du in unserem Artikel zu [Schwarzarbeit in Australien](/de/blog/can-your-employer-pay-you-cash-in-hand).

[Kontaktiere unser Team](/de/contact), um deine TFN unter Aufsicht eines registrierten Steueragenten zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 
## Was du deinem Arbeitgeber am ersten Tag sagst

Wörtlich verwendbar: "Meine TFN ist beantragt - hier ist die ATO-Bestätigung." Danach: innerhalb von 28 Tagen ab Arbeitsbeginn die Tax File Number Declaration mit der Nummer nachreichen. Auf der Erklärung vor Ankunft der TFN vermerkt der Arbeitgeber, dass der Antrag läuft - genau das hält dich im Wartefenster auf dem Working-Holiday-Satz statt bei 45 %.

## Trifft die 45 % den ganzen Lohn?

Verstreichen die 28 Tage ohne TFN, gilt der No-TFN-Satz für jede folgende Lohnzahlung komplett - nicht rückwirkend auf frühere. TFN nachgereicht, und ab dem nächsten Lauf gilt wieder der korrekte Satz; das Zuviel kommt über die Steuererklärung zurück, nicht über die Lohnabrechnung.
`,
  },

  'what-happens-without-your-tfn': {
    title: '45 % Steuer statt 15 %? Ohne TFN passiert genau das',
    description: 'Ohne TFN muss dein Arbeitgeber 45 % statt 15 % einbehalten. Wie du das schnell korrigierst und dir jeden Dollar zurückholst.',
    body: `
Wenn dein Arbeitgeber deine Tax File Number nicht hinterlegt hat, muss er nach australischem Steuerrecht 45 % Steuern einbehalten. Das ist der höchste Grenzsteuersatz und gilt ab deiner ersten Schicht, bis du deine TFN zusammen mit einem ausgefüllten TFN Declaration-Formular bereitstellst. Dein Arbeitgeber hat keinen Ermessensspielraum. Die Pflicht kommt vom ATO.

## Wie beeinflusst das deinen Nettolohn?

Der Standardsteuersatz für Working Holiday Maker ist 15 %. Wenn dein Arbeitgeber stattdessen 45 % einbehält, kommt die Differenz kurzfristig direkt aus deiner Tasche.

Beispielauswirkung bei verschiedenen Wochenlöhnen:

- Wochenlohn von 1.000 $: jede Woche 320 $ zusätzlich einbehalten
- Wochenlohn von 1.500 $: jede Woche 480 $ zusätzlich einbehalten
- Wochenlohn von 2.000 $: jede Woche 640 $ zusätzlich einbehalten

Über ein paar Wochen wird diese Lücke beträchtlich. Du verlierst das Geld nicht dauerhaft, aber du siehst es erst wieder, wenn du deine [Steuererklärung](/de/tax-return) einreichst und das ATO die zu viel gezahlte Steuer erstattet.

## Was solltest du jetzt sofort tun?

Die Lösung ist einfach und zeitkritisch:

1. Beantrage deine TFN, falls noch nicht geschehen
2. Sobald du sie bekommst, fülle ein TFN Declaration-Formular aus
3. Gib das Formular sofort deinem Arbeitgeber
4. Der korrekte 15 %-Satz gilt dann für alle zukünftigen Zahlungen

Wenn dein Antrag noch läuft, zeige deinem Arbeitgeber die Bestätigungs-E-Mail des ATO. Manche Arbeitgeber passen den Einbehaltungssatz an, sobald sie sehen, dass der Antrag läuft - obwohl sie dazu gesetzlich nicht verpflichtet sind.

## Bekommst du die zu viel gezahlte Steuer zurück?

Ja. Die zu viel einbehaltene Steuer aus der Zeit, bevor deine TFN hinterlegt war, wird gegen deine Steuerschuld gutgeschrieben, wenn du deine [jährliche Steuererklärung](/de/tax-return) einreichst. Das ATO berechnet die Differenz zwischen dem, was du tatsächlich schuldetest, und dem, was einbehalten wurde, und erstattet den Betrag auf dein australisches Bankkonto.

Die Frist ist der 31. Oktober nach Ende jedes Steuerjahres (1. Juli bis 30. Juni). Wenn du über einen registrierten Steueragenten einreichst, kann die Frist verlängert werden.

## Deine TFN mehreren Arbeitgebern geben

Wenn du während deiner Zeit in Australien für mehr als einen Arbeitgeber arbeitest, braucht jeder deine TFN separat. Wenn du sie einem Arbeitgeber gibst, wird sie nicht automatisch mit anderen geteilt. Reiche ein TFN Declaration-Formular bei jedem Arbeitgeber ein, für den du arbeitest - auch für Casual- und Kurzzeitrollen.

[Kontaktiere unser Team](/de/contact), um deine TFN unter Aufsicht eines registrierten Steueragenten zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 
## Was 45 % Abzug pro Lohnzahlung kosten, in Dollar

Beim Working-Holiday-Satz verlierst du 15 Cent pro Dollar; ohne TFN im System sind es 45. Konkret:

- 800 $ Wochenlohn: 120 $ Abzug bei 15 % vs. 360 $ bei 45 % - **240 $ Unterschied pro Woche**
- 1.200 $ Wochenlohn: 180 $ vs. 540 $ - **360 $ Unterschied pro Woche**
- Ein Monat bei 45 % auf typischem Backpacker-Lohn: **rund 1.000-1.400 $ zu viel einbehalten**

Verloren ist nichts davon - es kommt mit der Steuererstattung zurück. Aber es ist Geld, das Monate früher in deiner Tasche hätte sein können. Die TFN-Erklärung heute zu korrigieren ist pro Stunde mehr wert als der Job selbst.
`,
  },

  'tfn-vs-abn-difference': {
    title: 'TFN vs. ABN - was ist der Unterschied und welche brauchst du?',
    description: 'TFN und ABN sind zwei verschiedene Nummern für unterschiedliche Steuersituationen. Hier erfährst du, wann du welche brauchst.',
    body: `
Eine Tax File Number (TFN) ist deine persönliche Steueridentifikationsnummer, die du nutzt, wenn du angestellt bist und Lohn verdienst. Eine Australian Business Number (ABN) ist eine Geschäftsidentifikationsnummer, die du nutzt, wenn du als Sole Trader oder unabhängiger Contractor tätig bist und Kunden Rechnungen stellst. Die meisten Working Holiday Maker in normaler Anstellung brauchen nur eine TFN. Eine ABN brauchst du nur, wenn du dein eigenes Geschäft führst oder als unabhängiger Contractor arbeitest. Viele Backpacker haben am Ende beide.

## Wofür wird eine TFN genutzt?

Eine TFN ist deine persönliche Steueridentifikationsnummer. Jeder, der in Australien Einkommen hat, braucht eine - egal ob angestellt oder selbstständig. Das ATO nutzt deine TFN, um dein Einkommen mit dir zu verknüpfen und den korrekten Steuersatz zu bestimmen.

Du brauchst eine TFN, wenn:

- Du als Angestellter auf einer Gehaltsliste arbeitest
- Dein Arbeitgeber PAYG-Steuer von deinem Lohn einbehält
- Dein Arbeitgeber Superbeiträge für dich zahlt
- Du am Ende des Steuerjahres eine Steuererklärung einreichst

Das deckt die große Mehrheit der Working Holiday Maker in Gastronomie, Einzelhandel, Farmarbeit als Angestellter, Lagern und ähnlichen Rollen ab.

## Wofür wird eine ABN genutzt?

Eine ABN ist eine 11-stellige Nummer für Unternehmen und Sole Trader. Sie wird genutzt, wenn du als unabhängiger Contractor statt als Angestellter arbeitest.

Du brauchst eine [ABN](/de/abn), wenn:

- Du Kunden Rechnungen für deine Dienstleistungen stellst
- Du deine eigenen Arbeitszeiten und -methoden festlegst
- Du eigene Ausrüstung und Werkzeuge nutzt
- Du das finanzielle Risiko für die Arbeit trägst
- Du dafür verantwortlich bist, deine eigene Steuer und [Super](/de/superannuation) zurückzulegen

ABNs sind üblich bei Working Holiday Makern in Gig-Economy-Jobs, Freelancearbeit, bestimmten Akkordlohn-Farmarbeitsverträgen und jeder Arbeit, bei der das Unternehmen verlangt, dass du Rechnungen stellst, statt dich auf die Gehaltsliste zu setzen.

## Kannst du gleichzeitig eine TFN und eine ABN haben?

Ja. Viele Working Holiday Maker haben beide gleichzeitig. Deine TFN brauchst du immer, weil sie deine persönliche Steueridentifikationsnummer ist. Deine ABN nutzt du nur, wenn du Rechnungen für Contractor-Arbeit stellst. Die beiden Nummern erfüllen unterschiedliche Zwecke, und beide zu haben ist normal, wenn deine Situation sowohl Anstellung als auch Contracting umfasst.

## Wie findest du heraus, welche für dich gilt?

Die Schlüsselfrage ist, ob das Unternehmen, das dich bezahlt, dich als Angestellten oder als Contractor behandelt:

- **Angestellter**: Du stehst auf der Gehaltsliste, PAYG-Steuer wird einbehalten, Super wird zusätzlich zu deinem Lohn gezahlt, und sie geben vor, wie du arbeitest. Du brauchst eine TFN.
- **Contractor**: Du stellst Rechnungen, du legst deine eigene Steuer und Super zurück, und du bestimmst, wie die Arbeit gemacht wird. Du brauchst eine [ABN](/de/abn).

Wenn du unsicher bist, welche Situation auf dich zutrifft, geht unser Artikel zu [dem Unterschied zwischen Angestellten und Contractors in Australien](/de/blog/employee-vs-contractor-australia) detaillierter auf die rechtlichen Tests ein.

[Kontaktiere unser Team](/de/contact), um deine TFN unter Aufsicht eines registrierten Steueragenten zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 `,
  },

  'apply-for-tfn-before-arriving': {
    title: 'TFN schon vor der Ankunft beantragen? Die Regeln 2026',
    description: 'Für die TFN musst du in Australien sein - aber du kannst alles vorbereiten und am ersten Tag beantragen. Die komplette Checkliste.',
    body: `
Ja, du kannst eine australische Tax File Number (TFN) beantragen, bevor du in Australien ankommst, solange dein Working Holiday Visum schon genehmigt wurde. Das ATO erlaubt ausländischen Reisepassinhabern, einen TFN-Antrag online aus dem Ausland einzureichen - vorausgesetzt, sie haben eine gültige australische Postadresse, an die der TFN-Brief geschickt werden kann. Früh zu beantragen bedeutet, dass deine TFN ungefähr zur selben Zeit ankommen kann wie du - so vermeidest du den Zeitraum, in dem 45 % Steuern einbehalten werden, die gilt, bevor deine TFN bei deinem Arbeitgeber registriert ist.

## Warum lohnt es sich, eine TFN früh zu beantragen?

Deine TFN vor der Ankunft zu beantragen bedeutet, dass sie bearbeitet werden kann, während du noch reist oder deinen Trip vorbereitest. Wenn du deinen ersten Job anfängst, wartet deine TFN eventuell schon - dein Arbeitgeber kann ab Tag eins den korrekten 15 %-Working-Holiday-Maker-Steuersatz anwenden.

Die Vorteile in Zahlen:

- Antrag dauert online etwa 10 Minuten
- Bearbeitungszeit bis zu 28 Tage
- Beantrage einen Monat vor der Ankunft, dann ist deine TFN eventuell da, wenn du landest
- Vermeidet Wochen mit 45 %-Einbehaltung, die sonst nur zur Steuerzeit zurückgeholt werden

## Was brauchst du, um aus dem Ausland zu beantragen?

Um eine australische TFN von außerhalb Australiens zu beantragen, brauchst du:

- Ein gültiges australisches Working Holiday Visum, das schon genehmigt wurde (nicht nur beantragt)
- Deine Reisepassnummer, Visadetails und Geburtsdatum
- Eine gültige australische Postadresse, an die das ATO deinen TFN-Brief schicken kann
- Eine gültige E-Mail-Adresse für Antragsbestätigungen

Die Adressanforderung ist die Hauptkomplikation. Das ATO schickt deine TFN als physischen Brief an eine australische Adresse. Wenn du Unterkunft für deine ersten Wochen in Australien gebucht hast, kannst du diese Adresse nutzen. Eine Hosteladresse funktioniert, wenn du dort zuverlässig Post empfangen kannst.

Wenn du noch keine bestätigte australische Adresse hast, kann es einfacher sein zu warten, bis du angekommen bist und einen Platz zum Übernachten hast, bevor du beantragst.

## Was, wenn dein Visum sich ändert oder gekündigt wird?

Falls sich deine Visasituation zwischen TFN-Antrag und Ankunft in Australien ändert, [kontaktiere unser Team](/de/contact), um deine Daten zu aktualisieren. Deine TFN selbst ist permanent und läuft nicht ab, auch wenn dein Visum abläuft. Die beim ATO hinterlegten Daten sollten aber deinen aktuellen Visastatus widerspiegeln.

## Was tun, nachdem du in Australien ankommst

Sobald du in Australien bist und mit der Arbeit angefangen hast:

1. Gib deine TFN jedem Arbeitgeber, für den du arbeitest
2. Fülle für jeden Arbeitgeber ein TFN Declaration-Formular aus
3. Bestätige, dass auf deinem nächsten Lohnzettel der korrekte 15 %-Satz erscheint

Deine TFN brauchst du außerdem, um deine [Steuererklärung](/de/tax-return) am Ende des Steuerjahres einzureichen und auf deine [Super](/de/superannuation) zuzugreifen, wenn du Australien verlässt.
 
## Die Tag-eins-Checkliste: Antrag in der ersten Stunde

Vor der Einreise geht nichts - aber alles lässt sich so vorbereiten, dass der Antrag nach der Landung fünf Minuten dauert:

- Passdaten gespeichert und lesbar (Foto der ID-Seite)
- Australische Adresse festgelegt - 4+ Wochen stabil, Post wird angenommen
- Australische Handynummer, falls vorhanden (hilft, ist aber nicht Pflicht)
- Visa Grant Notice als PDF griffbereit

Abschicken geht auch im Flughafen-WLAN - berechtigt bist du ab dem Moment der Einreise mit deinem Visum. Die 28 TFN-Tage und dein 28-Tage-Arbeitsfenster laufen dann parallel - weshalb die Schnellsten praktisch nie einen 45-%-Payslip sehen.
`,
  },

  'tfn-application-delayed': {
    title: 'TFN nach 28 Tagen nicht da? Diese 3 Schritte helfen (2026)',
    description: 'Meist liegt es an einer falschen Adresse oder einer ATO-Prüfung. Die 3 Schritte, die fast jede Verzögerung lösen - und wie du währenddessen korrekt arbeitest.',
    body: `
Wenn deine TFN nach 28 Tagen nicht angekommen ist, sind die häufigsten Ursachen ein Adressfehler im Antrag oder ein verlorener Brief in der Post. Bevor du das ATO kontaktierst, prüfe die Adresse, die du eingereicht hast, bestätige, dass die 28 Tage tatsächlich vergangen sind (gezählt ab dem Tag, an dem das ATO deinen Antrag erhalten hat, nicht ab dem Tag, an dem du auf "Absenden" geklickt hast), und schau nach dem Brief an älteren Adressen, falls du umgezogen bist.

## Was solltest du zuerst prüfen?

Adressprobleme sind die häufigste Ursache für verzögerte TFN-Zustellungen. Fang dort an:

- Hol die Bestätigungs-E-Mail raus, die du beim Antrag bekommen hast
- Vergleiche die Adresse mit deinem aktuellen Aufenthaltsort
- Prüfe auf Tippfehler in Straßenname, Postleitzahl, Vorort oder Wohnungsnummer
- Wenn du seit dem Antrag umgezogen bist, frage jemanden an deiner vorherigen Adresse, ob der Brief dort angekommen ist

Ein einzelner Zeichenfehler (z.B. eine falsche Postleitzahl) reicht, um den Brief in die falsche Gegend zu schicken oder ihn dem ATO als unzustellbar zurückzusenden.

## Sind 28 Tage tatsächlich vergangen?

Die 28-Tage-Bearbeitungszeit beginnt mit dem Datum, an dem das ATO deinen Antrag erhalten hat - nicht mit dem Datum, an dem du ihn eingereicht hast. Online-Anträge gehen meistens am selben Tag ein, aber es lohnt sich, das in deiner Bestätigungs-E-Mail zu prüfen, bevor du annimmst, dass es ein Problem gibt.

Wenn du vor weniger als 28 Tagen beantragt hast, ist der Antrag noch im normalen Bearbeitungsfenster.

## Wie du eine verzögerte TFN nachfasst

Wenn 28 Tage vergangen sind, deine Adresse korrekt war und kein Brief angekommen ist:

1. [Kontaktiere unser Team](/de/contact) - wir fassen direkt beim ATO für dich nach
2. Halte deine Antragsreferenznummer bereit (aus der Bestätigungs-E-Mail)
3. Wir verifizieren deine Identität und treiben den Antrag bis zur Lösung
4. Falls deine TFN schon ausgestellt wurde, aber der Brief verloren ging, arrangieren wir die sichere Neuversendung

Selbst beim ATO nachzufassen bedeutet lange Wartezeiten am Telefon und einen Identitätsprüfungsprozess, der australienspezifische Dokumente erfordert. Unser Team kümmert sich direkt darum und löst Verzögerungen oft innerhalb weniger Werktage.

## Kannst du während der Verzögerung weiterarbeiten?

Ja. Während du wartest, kannst du weiterarbeiten. Sag deinem Arbeitgeber, dass deine TFN unterwegs ist, und zeig ihm die ATO-Bestätigungs-E-Mail. Sobald deine TFN geklärt ist, gib sie deinem Arbeitgeber sofort mit einem ausgefüllten TFN Declaration-Formular. Die zu viel gezahlte Steuer aus der Wartezeit kannst du mit deiner [Steuererklärung](/de/tax-return) zurückholen.
 
## Woche für Woche: wann du handeln solltest

- **Unter 2 Wochen**: normal - nichts tun
- **Woche 3-4**: für ländliche Adressen noch normal; kläre die Postsituation im Hostel oder der WG
- **Ab Tag 28**: ATO anrufen unter 13 28 61 (aus dem Ausland +61 2 6216 1111), Referenznummer bereit - fragen, ob die TFN ausgestellt wurde und wohin
- **Ausgestellt, aber nie angekommen**: Adresse im System prüfen, korrigieren, Neuversand anfordern - und fragen, ob die Nummer nach Identitätsprüfung direkt bestätigt werden kann

Läuft parallel dein eigenes 28-Tage-Arbeitsfenster ab, sag dem Arbeitgeber, dass der Antrag in ATO-Prüfung ist - die Bestätigungsmail ist dein Beleg.
`,
  },

  'do-you-need-new-tfn-second-visa': {
    title: 'Zweites WHV? Deine TFN bleibt - das musst du aktualisieren',
    description: 'Die TFN gilt lebenslang - kein neuer Antrag beim zweiten oder dritten Working-Holiday-Visum nötig. Was du stattdessen bei der ATO aktualisieren solltest.',
    body: `
Nein, du brauchst keine neue Tax File Number, wenn du mit einem zweiten Working Holiday Visum nach Australien zurückkommst. Deine TFN ist permanent. Sie läuft nicht ab, wenn dein Visum abläuft, und sie ändert sich nicht, wenn dein Visum sich ändert. Dieselbe 9-stellige TFN, die du beim ersten Mal bekommen hast, ist die, die du bei jedem weiteren Besuch in Australien nutzt.

## Wo findest du deine TFN, wenn du sie dir nicht merken kannst?

Die TFN, die du bei deinem ersten Besuch bekommen hast, ist an mehreren Stellen aufgezeichnet:

- Der originale Brief, den das ATO dir nach Genehmigung des Antrags geschickt hat
- Lohnzettel oder Income Statements von deinem ersten australischen Arbeitgeber
- Group Certificates oder PAYG Summaries aus früheren Jahren
- Frühere australische [Steuererklärungen](/de/tax-return), die du eingereicht hast
- Korrespondenz vom ATO

Wenn keine dieser Optionen funktioniert, [kontaktiere unser Team](/de/contact) telefonisch und bitte um deine TFN. Du musst deine Identität mit deinen Reisepassdaten und anderen persönlichen Informationen verifizieren.

## Was musst du tun, wenn du wieder anfängst zu arbeiten?

Auch wenn deine TFN dieselbe ist, braucht jeder neue Arbeitgeber seine eigene Kopie:

- Gib deine TFN jedem neuen Arbeitgeber
- Fülle ein frisches TFN Declaration-Formular für jeden Arbeitgeber aus
- Ein vorheriger Arbeitgeber, der deine TFN hat, gibt sie nicht automatisch an den nächsten weiter

Jeder Arbeitgeber braucht ein eigenes hinterlegtes Declaration-Formular, um den korrekten 15 %-Working-Holiday-Maker-Steuersatz auf deinen Lohn anzuwenden.

## Was ist mit deiner Super aus deinem ersten Besuch?

Wenn du während deines ersten Besuchs Superbeiträge hattest und sie über den Departing Australia [Superannuation](/de/superannuation) Payment (DASP)-Prozess abgehoben hast, wurde dieses Konto praktisch geschlossen. Neue Superbeiträge aus deinem zweiten Besuch gehen in einen neuen Fonds.

Wenn du deine Super aus deinem ersten Besuch nicht abgehoben hast, liegen die Beträge eventuell noch im ursprünglichen Fonds oder beim ATO als nicht beantragte Beträge. Siehe unseren Artikel zu [verlorene oder nicht beantragte Super finden](/de/blog/how-to-find-lost-superannuation) für die Suche.

## Wie funktionieren Steuererklärungen bei deinem Rückkehrbesuch?

Deine Steuerpflichten bei deinem zweiten Besuch funktionieren genau gleich wie beim ersten:

- Das Steuerjahr läuft vom 1. Juli bis 30. Juni
- Du musst eine [Steuererklärung](/de/tax-return) für jedes Jahr einreichen, in dem du in Australien Einkommen hattest
- Der 15 %-Working-Holiday-Maker-Satz gilt für deine Einkünfte, vorausgesetzt deine Arbeitgeber haben deine TFN hinterlegt
- Die Standardfrist ist der 31. Oktober, oder später, wenn du einen registrierten Steueragenten nutzt
 `,
  },

  'how-to-find-lost-tfn': {
    title: 'Wie du deine TFN findest, wenn du sie verloren oder vergessen hast',
    description: 'Du hast deine TFN verloren? Keine Sorge - es gibt mehrere einfache Wege, sie wiederzufinden. Im Folgenden findest du sie.',
    body: `
Um eine verlorene Tax File Number zu finden, fang mit Dokumenten an, die du eventuell schon hast (der originale ATO-Brief, Lohnzettel, Payment Summaries oder frühere Steuererklärungen). Deine TFN ist permanent und ändert sich nicht - die Nummer, die du ursprünglich bekommen hast, ist immer noch dieselbe. Wenn du sie nicht in deinen Unterlagen findest, kann unser Team sie unter Aufsicht eines registrierten Steueragenten für dich abrufen.

## Wie du deine TFN zu Hause findest

Fang mit Dokumenten an, die du schon hast:

- Der originale TFN-Brief, den das ATO dir nach Genehmigung deines Antrags geschickt hat
- Lohnzettel, Payment Summaries oder Income Statements von einem australischen Arbeitgeber
- Frühere [Steuererklärung](/de/tax-return)-Dokumente (deine TFN steht auf jeder Steuererklärung)
- Briefe oder Mitteilungen vom ATO

Wenn du E-Mails gespeichert, Dokumente gescannt oder Papierkram von früherer Arbeit in Australien aufgehoben hast, ist deine TFN fast sicher in einem dieser Unterlagen.

## Wie du eine verlorene TFN wiederherstellst

Wenn du deine TFN in keinen deiner Unterlagen findest, [kontaktiere unser Team](/de/contact). Wir arbeiten unter Aufsicht eines registrierten Steueragenten und können deine TFN für dich über unsere direkten Kanäle mit dem ATO abrufen.

Um uns zu helfen, halte bitte folgende Informationen bereit:

- Deinen vollständigen rechtlichen Namen (wie im Reisepass)
- Dein Geburtsdatum
- Deine Reisepassnummer (und den Reisepass, den du beim ursprünglichen Antrag hattest, falls anders)
- Deine Wohnadress-Historie in Australien
- Andere persönliche Identifikationsdetails

Eine TFN als Privatperson wiederherzustellen bedeutet lange Wartezeiten am ATO-Telefon und einen Identitätsprüfungsprozess, der oft australienspezifische Dokumente erfordert, auf die die meisten Backpacker aus dem Ausland keinen Zugriff mehr haben. Über einen registrierten Steueragenten zu gehen ist schneller und zuverlässiger.

## Wie du deine TFN in Zukunft sicher aufbewahrst

Sobald du deine TFN zurück hast, bewahre sie sicher auf, damit das nicht nochmal passiert:

- Speichere sie in einem Passwortmanager
- Speichere eine gescannte Kopie in verschlüsseltem Cloud-Speicher
- Speichere sie in einer gesperrten Notizen-App auf deinem Handy
- Bewahre eine Papierkopie an einem sicheren Ort getrennt von deinem Reisepass auf

Vermeide es, deine TFN dir selbst unverschlüsselt zu mailen oder sie in ungesicherten Dokumenten zu speichern. Deine TFN ist eine sensible persönliche Identifikation, und sie zu schützen ist wichtig - auch nach deiner Abreise aus Australien.
 
## Wo deine TFN längst notiert ist

Bevor du irgendwo anrufst: Prüfe Dokumente, die du wahrscheinlich schon hast - Payslips (viele zeigen sie), den Notice of Assessment einer früheren Steuererklärung, Super-Fonds-Post und Willkommensschreiben, den originalen ATO-Brief oder fotografierte Arbeitsunterlagen. Die meisten "verlorenen" TFNs findet eine E-Mail-Suche nach "tax file number" in fünf Minuten.
`,
  },

  // ─── ABN (2 first posts get title/description translation) ────────────────
  'what-is-an-abn': {
    title: 'Was ist eine ABN und brauchst du eine mit Working Holiday Visum?',
    description: 'Eine Australian Business Number ist nur nötig, wenn du als Contractor oder Selbstständiger arbeitest. Hier erfährst du, was du wissen musst.',
    body: `
Eine Australian Business Number (ABN) ist eine 11-stellige Identifikationsnummer für Unternehmen und Sole Trader, die in Australien tätig sind. Als Working Holiday Maker brauchst du eine ABN, wenn du als unabhängiger Contractor arbeitest (du stellst dem Unternehmen Rechnungen für deine Dienstleistungen) statt als Angestellter (auf einer Gehaltsliste). Die meisten Working Holiday Maker in normaler Anstellung brauchen keine ABN. Die ABN-Registrierung ist kostenlos, dauert online etwa 15 Minuten, und die meisten Anträge werden sofort bearbeitet.

## Was ist der Unterschied zwischen Angestelltem und Contractor?

Die Notwendigkeit einer ABN hängt davon ab, ob du Angestellter oder Contractor bist:

- **Angestellter**: Das Unternehmen zahlt dir einen regelmäßigen Lohn, behält PAYG-Steuer von deinem Lohn ein und zahlt [Super](/de/superannuation) zusätzlich zu deinem Lohn. Du brauchst eine [TFN](/de/tfn), keine ABN.
- **Contractor**: Das Unternehmen verlangt, dass du Rechnungen stellst, behält keine Steuer ein und zahlt keine Super für dich. Du brauchst eine ABN.

Die Bezeichnung, die dein Arbeitgeber verwendet, spiegelt nicht zwangsläufig die rechtliche Realität wider. Der tatsächliche Inhalt der Vereinbarung (wie du bezahlt wirst, wer deine Arbeitszeiten kontrolliert, wer die Ausrüstung stellt) bestimmt, ob du rechtlich Angestellter oder Contractor bist.

## Warum sind ABNs unter Working Holiday Makern üblich?

Mehrere Arten von Arbeit, die Backpacker häufig machen, sind als Contracting-Vereinbarungen statt als Anstellung strukturiert:

- Akkordlohn-Obstpflücken und Erntearbeit über Personalvermittler
- Gig-Economy-Arbeit über Plattformen wie Uber Eats, DoorDash und Hireup
- Freelance-Kreativ-, Technik- oder Handwerksarbeit
- Manche Gastronomie- und Reinigungsrollen, bei denen der Arbeiter unter Vertrag statt angestellt ist
- Reiseleiterarbeit, Fotografie, Content Creation

In jedem Fall zahlt das Unternehmen dich gegen eine Rechnung statt eines Lohnzettels, und eine ABN ist erforderlich.

## Was passiert, wenn du ohne ABN arbeitest, obwohl du eine brauchst?

Wenn du einem Unternehmen eine Rechnung ohne gültige ABN stellst, ist das Unternehmen gesetzlich verpflichtet, 47 % von deiner Zahlung einzubehalten, bevor es dir den Rest schickt. Das ist ähnlich zu dem, was einem WHM-Angestellten ohne TFN passiert (45 % werden einbehalten). Der einbehaltene Betrag kann mit deiner [Steuererklärung](/de/tax-return) zurückgeholt werden, aber du siehst ihn erst dann.

## Wie bekommst du eine ABN?

Der einfachste Weg, eine ABN zu bekommen, ist die [Registrierung über unseren Service](/de/abn). Wir kümmern uns um den gesamten Prozess für dich:

1. Schick uns deine Daten (wir sagen dir genau, was wir brauchen)
2. Unser Team bereitet die Registrierung vor und reicht sie für dich ein
3. Die meisten ABNs werden innerhalb von 24 Stunden genehmigt
4. Du bekommst deine ABN per E-Mail, einsatzbereit

Eine ABN zu registrieren bedeutet, deine Geschäftstätigkeit in einer Sprache zu beschreiben, die das Australian Business Register akzeptiert, die richtige Struktur zu wählen und Identitätsprüfung zu handhaben. Wenn dabei etwas schiefläuft, kann dein Antrag in eine manuelle Prüfungswarteschlange kommen, die Wochen dauert. Wir machen jede Woche Dutzende Registrierungen und wissen genau, wie man sie beim ersten Mal durchbekommt.

## Was sind deine Steuerpflichten unter einer ABN?

Als Working Holiday Maker mit einer ABN bist du zuständig für:

- Deine eigene Einkommensteuer auf deine ABN-Einkünfte (es wird nichts einbehalten)
- GST-Registrierung, wenn dein Umsatz 75.000 $ pro Jahr übersteigt
- Du bekommst eventuell keine Superbeiträge von deinen Kunden (du kannst deine eigene zahlen, wenn du willst)

Der Standardsteuersatz von 15 % für Working Holiday Maker auf die ersten 45.000 $ Einkommen gilt auch für dein ABN-Einkommen, aber du musst es selbst veranlagen und zur Steuerzeit zahlen, statt es vorab einbehalten zu bekommen.

[Kontaktiere unser Team](/de/contact) für Hilfe bei der ABN-Registrierung, GST- und BAS-Verwaltung oder beim Sortieren deiner Steuerposition am Jahresende.
 `,
  },

  'how-to-register-for-an-abn': {
    title: 'Wie du als Backpacker eine ABN in Australien registrierst',
    description: 'Die ABN-Registrierung beim ABR ist kostenlos und dauert nur 10-15 Minuten. Komplette Schritt-für-Schritt-Anleitung für Working Holiday Maker.',
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

Bei einer Selbstregistrierung musst du deine Geschäftstätigkeit in einer Sprache beschreiben, die das Australian Business Register akzeptiert. Das falsch zu machen ist einer der häufigsten Gründe, warum Anträge in eine manuelle Prüfungs-Warteschlange kommen, die Wochen dauern kann. Wir machen jede Woche Dutzende Registrierungen und wissen genau, wie diese beim ersten Mal durchgehen.

## Wie nutzt du deine ABN korrekt auf Rechnungen?

Sobald du deine ABN hast, gib sie auf jeder Rechnung an, die du ausstellst. Eine Rechnung ohne gültige ABN berechtigt das zahlende Unternehmen, legal 47 % der Zahlung einzubehalten.

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
    title: 'Backpacker-Steuersatz Australien 2025-26: Erklärung für 417 & 462 Visum',
    description: 'Der aktuelle Backpacker-Steuersatz in Australien für Working Holiday Maker auf 417 und 462 Visum: 15 % auf die ersten 45.000 $, danach reguläre Stufensätze. Auswirkung auf Nettolohn und Steuerrückerstattung.',
    body: `
Der Backpackersteuersatz in Australien beträgt pauschal 15 % auf die ersten 45.000 $ Einkommen pro Steuerjahr. Dieser Satz gilt für alle Working Holiday Maker mit einem Working Holiday Visum (Subclass 417) oder Work and Holiday Visum (Subclass 462). Er wird manchmal "Working-Holiday-Maker-Steuersatz" genannt und ersetzt die normalen Steuersätze für Residenten, die sonst gelten würden. Du musst deine [TFN](/de/tfn) bei jedem Arbeitgeber registrieren, um den 15 %-Satz zu bekommen - sonst wird standardmäßig mit 45 % einbehalten.

## Wie funktioniert der 15 %-Satz in der Praxis?

Der 15 %-Satz ist ein Pauschalsatz. Jeder Dollar der ersten 45.000 $, die du verdienst, wird mit demselben Satz besteuert:

- Wochenlohn von 1.000 $ → 150 $ einbehalten → 850 $ auf deinem Konto
- Wochenlohn von 1.500 $ → 225 $ einbehalten → 1.275 $ auf deinem Konto
- Wochenlohn von 2.000 $ → 300 $ einbehalten → 1.700 $ auf deinem Konto

Du erhältst nicht den Freibetrag, den australische Residenten erhalten. Australische Residenten zahlen keine Steuern auf die ersten 18.200 $, aber Working Holiday Maker zahlen 15 % vom allerersten Dollar.

## Was passiert, wenn du mehr als 45.000 $ verdienst?

Einkommen über 45.000 $ wird mit höheren Sätzen besteuert:

- 45.001 bis 135.000 $: 30 %
- 135.001 bis 190.000 $: 37 %
- Über 190.000 $: 45 %

Nur sehr wenige Working Holiday Maker erreichen diese Einkommensgrenzen während eines einzigen Aufenthalts, aber es ist gut zu wissen, falls du einen längeren Aufenthalt mit gut bezahlter Arbeit im Bergbau, Bauwesen oder Facharbeiterbereich planst.

## Wie qualifizierst du dich für den 15 %-Satz?

Damit der 15 %-Satz auf deinen Lohn angewendet wird, musst du:

1. Eine [TFN](/de/tfn) bei deinem Arbeitgeber registriert haben
2. Ein TFN Declaration-Formular ausfüllen, in dem du angibst, dass du Working Holiday Maker bist
3. Bei einem Arbeitgeber arbeiten, der beim ATO als Working-Holiday-Maker-Arbeitgeber registriert ist

Registrierte Arbeitgeber sind verpflichtet, den korrekten Satz anzuwenden. Wenn dein Arbeitgeber nicht registriert ist, wird standardmäßig mit 30 % einbehalten - auch wenn du deine TFN hinterlegt hast. Wenn du dir nicht sicher bist, ob dein Arbeitgeber registriert ist, [kontaktiere unser Team](/de/contact) und wir prüfen das für dich.

## Was kann durch deine Steuererklärung zurückkommen?

Ein normaler Working Holiday Maker mit dem korrekten 15 %-Satz bekommt meistens keine große Rückzahlung, weil das ganze Jahr über der richtige Betrag einbehalten wurde. Rückzahlungen entstehen typischerweise durch:

- Arbeiten ohne TFN für einen Teil des Jahres (45 % statt 15 % einbehalten)
- Zeiträume, in denen der falsche Satz angewendet wurde (z.B. 30 % bei nicht registriertem Arbeitgeber)
- Abzugsfähige arbeitsbezogene Ausgaben für Werkzeuge, Uniformen und Fahrten
- Fehler im TFN Declaration-Formular (z.B. fälschlicherweise den Freibetrag angekreuzt)

Die meisten Working Holiday Maker, die wir betreuen, bekommen eine Rückzahlung zwischen 1.000 und 3.000 $, wenn wir ihre [Steuererklärung](/de/tax-return) richtig einreichen. Der genaue Betrag hängt vollständig von den Umständen des Jahres ab.
 
## Registrierte vs. unregistrierte Arbeitgeber: der 15-%-Schalter

Der 15-%-Satz gilt automatisch nur, wenn dein Arbeitgeber bei der ATO als Working-Holiday-Arbeitgeber registriert ist. Unregistrierte Betriebe - typisch: Farmen und kleine Gastro - müssen zu Foreign-Resident-Sätzen ab über 30 % einbehalten. Vorher erkennen kannst du das selten; auf dem Payslip aber sofort: Teile die einbehaltene Steuer durch den Bruttolohn. Deutlich über 15 %? Das Geld ist nicht weg - die Differenz kommt mit der [Steuererklärung](/de/tax-return) zurück und ist einer der häufigsten Gründe für vierstellige Backpacker-Erstattungen.
`,
  },

  // ─── Super - Strategic posts ──────────────────────────────────────────────
  'how-to-apply-for-super-back': {
    title: 'Super nach der Abreise zurückholen: Der DASP-Guide (2026)',
    description: 'DASP Schritt für Schritt: alle Super-Konten finden, Unterlagen, Antrag und Auszahlung ins Ausland - vollständige Anträge werden meist in 28 Tagen gezahlt.',
    body: `
Um deine [Super](/de/superannuation) zurückzubekommen, nachdem du Australien verlassen hast, arbeitest du mit unserem Team zusammen, das den kompletten Departing Australia Superannuation Payment (DASP)-Prozess von Anfang bis Ende übernimmt. Wir finden alle deine Superkonten, bereiten die Anträge vor und reichen sie für dich ein und arrangieren die Auszahlung auf dein gewünschtes Bankkonto irgendwo auf der Welt. Die DASP-Quellensteuer für Working Holiday Maker beträgt 65 % der steuerpflichtigen Komponente, aber nach Steuern ist der Nettobetrag immer noch beträchtlich.

## Schritt 1: Finde alle deine Superkonten

Der erste Schritt ist, jedes Superkonto zu identifizieren, in das deine Beiträge eingezahlt wurden. Die meisten Working Holiday Maker haben ihre Super auf mehrere Fonds verteilt, weil jeder Arbeitgeber einen anderen Standardfonds verwendet haben könnte.

Wir finden deine Superkonten, indem wir:

- Die Fonds prüfen, die du Arbeitgebern angegeben hast
- TFN-verknüpfte Konten im ATO-System abgleichen
- Beträge identifizieren, die als nicht beantragte Super ans ATO überwiesen wurden

Sobald wir ein komplettes Bild haben, kannst du entweder jeden Fonds separat per DASP beantragen oder sie zuerst in einem einzigen Fonds zusammenführen. Die Zusammenführung vereinfacht den Prozess (ein Antrag statt mehrerer), dauert aber im Vorfeld ein paar Wochen länger.

## Schritt 2: Sammle deine Unterlagen

Um deinen DASP-Antrag vorzubereiten, brauchen wir:

- Deine Tax File Number (TFN)
- Reisepassdetails (der Reisepass, den du hattest, als du in Australien gearbeitet hast)
- Daten der Visumserteilung und des Visumsablaufs
- Superfondsname und Mitgliedsnummer für jeden Fonds
- Bankverbindung (australisch oder ausländisch, deine Wahl)

Das Bankkonto muss **nicht** australisch sein. Internationale Überweisungen sind Standard für DASP-Auszahlungen, und wir können in die meisten Länder auszahlen.

## Schritt 3: Wir reichen den DASP-Antrag ein

Sobald wir deine Daten haben, kümmern wir uns um die Einreichung:

- Separate Anträge für jeden Fonds (falls du mehrere hast)
- Identitäts- und Visaverifizierung über unser Steueragentenportal
- Den gesamten Schriftverkehr mit dem Fonds und dem ATO übernehmen wir
- Du bekommst eine Referenznummer zur Verfolgung

Du musst dich nicht mit ATO-Onlinediensten auseinandersetzen oder die Superfonds selbst kontaktieren.

## Schritt 4: Erhalte deine Auszahlung

Nach der Einreichung:

- Der Fonds verifiziert deine Daten (meistens innerhalb von 28 Tagen)
- 65 % DASP-Quellensteuer wird von der steuerpflichtigen Komponente abgezogen
- Der Nettobetrag wird auf dein gewünschtes Bankkonto überwiesen
- Wir benachrichtigen dich, sobald die Auszahlung freigegeben ist

Internationale Überweisungen können je nach Zielland und Bank ein paar Werktage länger dauern.

## Was, wenn deine Super nicht auffindbar ist?

Manchmal ist Super "verloren" - sie kann unter einem alten Namen oder einer alten Adresse stehen, oder sie wurde ans ATO als nicht beantragte Super überwiesen.

Wir können:

- Die ATO-Onlinedienste nach übertragenen, nicht beantragten Superbeträgen durchsuchen
- Arbeitgeber identifizieren, die möglicherweise keine Super gezahlt haben, und die ausstehenden Beträge einfordern

Siehe unseren Artikel zum [Finden verlorener Super](/de/blog/how-to-find-lost-superannuation) für mehr Details. Wir machen diese Suche als Teil jedes DASP-Antrags, damit keine Super zurückbleibt.

[Kontaktiere unser Team](/de/contact), um deinen DASP-Antrag zu bearbeiten, jeden Superfonds mit deinen Beiträgen zu finden und deine Auszahlung im Ausland zu erhalten.
 
## Timing rund um den 6-Monats-Transfer

Die Uhr, die zählt: Rund 6 Monate nach Visa-Ende und Abreise müssen Fonds nicht beanspruchte Guthaben an die ATO übertragen. Vor dem Transfer läuft dein Antrag über den Fonds - App-Zugang, bekannte Mitgliedsnummer, aber auch Fonds-Papierkram: beglaubigte Kopien und Identitätsprüfung aus Deutschland heraus sind die üblichen Bremsen. Nach dem Transfer ist die ATO zuständig - oft weniger Reibung, keine Fondsgebühren, die das Guthaben währenddessen anknabbern, aber du musst erst herausfinden, wo das Geld gelandet ist. Verlieren kannst du bei keinem Timing dauerhaft; die Gebührenerosion vor dem Transfer ist der einzige echte Preis des Wartens. Optimal bleibt: [alles vor dem Abflug vorbereiten](/de/superannuation), damit der Antrag in der Woche der Berechtigung rausgeht - inklusive der Passkopie, die du in Australien für ein paar Dollar beglaubigen lässt statt später beim Konsulat.
`,
  },

  // ─── Medicare - Critical for Germans (no RHCA) ─────────────────────────────
  'what-is-medicare-working-holiday-makers': {
    title: 'Medicare mit Working-Holiday-Visum: Bist du versichert?',
    description: 'Die meisten 417/462-Inhaber sind nicht über Medicare versichert - außer ihr Land hat ein Abkommen. Wer abgedeckt ist und was Notfälle kosten.',
    body: `
Medicare ist Australiens universelles öffentliches Krankenversicherungssystem, das Staatsbürgern und ständigen Einwohnern kostenlose oder vergünstigte medizinische Versorgung bietet. Working Holiday Maker (Subclass 417 und 462) sind in der Regel **nicht** für Medicare berechtigt - es sei denn, ihr Heimatland hat ein Sozialversicherungsabkommen (RHCA) mit Australien. **Wichtig: Deutschland hat KEIN RHCA mit Australien.** Ohne Medicare-Abdeckung zahlst du die vollen Kosten für Arztbesuche und Behandlungen. Du hast aber Anspruch auf eine Medicare-Levy-Befreiung bei deiner Steuererklärung, was dir 2 % deines zu versteuernden Einkommens spart. Unser Team beantragt diese Befreiung beim Einreichen deiner Steuererklärung.

## Sind Working Holiday Maker durch Medicare abgedeckt?

In der Regel nicht:

- Inhaber eines Working Holiday Visums 417 und 462 sind nicht für Medicare berechtigt
- Die Ausnahme sind Bürger von Ländern mit einem Sozialversicherungsabkommen (RHCA)
- Ohne Abdeckung wirst du als Privatpatient behandelt
- Du zahlst die vollen Kosten für Hausarztbesuche, Facharzttermine, Rezepte und Krankenhausbehandlungen

Die 11 Länder mit einem RHCA für Working Holiday Maker findest du in unserem Artikel zu [Ländern mit Medicare-Abkommen mit Australien](/de/blog/countries-with-medicare-agreement-australia). **Deutschland ist nicht dabei.**

## Was kostet dich fehlende Medicare-Abdeckung in der Praxis?

Gesundheitskosten ohne Medicare:

- Hausarztbesuch: 80 bis 120 $ pro Besuch
- Facharzttermin: 200 bis 500+ $ pro Besuch
- Rezepte: voller Verkaufspreis (oft 20 bis 80+ $)
- Notaufnahme: kostenlos in öffentlichen Krankenhäusern (eine Nachbehandlung kann jedoch kostenpflichtig sein)
- Aufnahme in ein öffentliches Krankenhaus: variabel, kann teuer sein
- Krankenwagen: oft Hunderte Dollar (hängt vom Bundesstaat ab)

Bei diesen Kosten ist eine umfassende Reise- und Krankenversicherung unerlässlich. Die meisten Anträge für ein Working Holiday Visum verlangen eine Krankenversicherung als Visumsbedingung.

## Was ist die Medicare-Levy-Befreiung?

Die Medicare Levy ist eine 2 %-Steuer auf das zu versteuernde Einkommen australischer Residenten zur Finanzierung von Medicare. Working Holiday Maker, die nicht für Medicare berechtigt sind, können eine Befreiung beantragen:

- Du sparst 2 % deines zu versteuernden Einkommens
- Bei 30.000 $ Einkommen ist die Befreiung 600 $ wert
- Muss korrekt in deiner [Steuererklärung](/de/tax-return) beantragt werden
- Nicht automatisch, muss beim Einreichen aktiv angewendet werden

Unser Team beantragt diese Befreiung automatisch, wenn wir deine Steuererklärung vorbereiten. Wenn du schon eine Steuererklärung ohne Befreiung eingereicht hast, können wir sie ändern und die gezahlte Levy zurückholen.

## Wie kommst du als Working Holiday Maker an Gesundheitsversorgung?

Optionen für Gesundheitsabdeckung:

- **Private Reise-/Krankenversicherung**: meistens die beste Option für Working Holiday Maker; Pflicht für Visabedingungen
- **Öffentliche Notaufnahme**: kostenlos für lebensbedrohliche Notfälle, aber Nachbehandlung kostet
- **Hausarzt-/Facharzttermine ohne Versicherung**: volle Kosten zahlen

Unser Team kann die Medicare-Levy-Befreiung beantragen, egal ob du eine private Versicherung abgeschlossen hast oder nicht. Die Befreiung basiert auf deiner Medicareberechtigung, nicht darauf, ob du privat versichert bist.

Mehr zu RHCA-Ländern und deren Abdeckung in unserem Artikel zu [Medicare-Abkommen mit Australien](/de/blog/countries-with-medicare-agreement-australia).

[Kontaktiere unser Team](/de/contact) für Hilfe bei allen Fragen zu Steuern, [Super](/de/superannuation) oder Arbeitsrecht während deiner Zeit in Australien.
 `,
  },

  'medicare-levy-working-holiday-makers': {
    title: 'Medicare-Levy-Befreiung: 2 % Steuern sparen (417/462)',
    description: 'Die meisten Working Holiday Maker können sich die 2 % Medicare-Abgabe befreien lassen - ca. 500 $ bei 25.000 $ Einkommen. So beantragst du die Befreiung.',
    body: `
Die Medicare Levy ist eine 2 %-Steuer auf das zu versteuernde Einkommen australischer Residenten zur Finanzierung des Medicare-Systems. Die meisten Working Holiday Maker sind nicht für Medicare berechtigt und haben daher Anspruch auf eine vollständige Befreiung von der Medicare Levy in ihrer Steuererklärung. Die Befreiung ist nicht automatisch und muss bei der Einreichung korrekt angewendet werden. Unser Team beantragt die Medicare-Levy-Befreiung automatisch, wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten - das spart dir 2 % deines zu versteuernden Einkommens.

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

Die 2 %-Befreiung ist bei typischen Working-Holiday-Maker-Einkommen bedeutsam:

- Jahresverdienst 15.000 $ → 300 $ gespart
- Jahresverdienst 25.000 $ → 500 $ gespart
- Jahresverdienst 35.000 $ → 700 $ gespart
- Jahresverdienst 45.000 $ → 900 $ gespart

Das ist Geld, das in deine Rückzahlung fließt statt in die Staatskasse. Wenn du eine frühere Steuererklärung ohne Befreiung eingereicht hast, kann unser Team sie ändern und die gezahlte Levy zurückholen.

## Wie wird die Medicare-Levy-Befreiung beantragt?

Die Befreiung erfordert:

1. Ein Medicare-Levy-Befreiungszertifikat (in den meisten Fällen)
2. Korrektes Ausfüllen des Medicare-Levy-Abschnitts deiner Steuererklärung
3. Nachweise für deine fehlende Medicare-Berechtigung (Reisepass, Visum)

Unser Team kümmert sich um all das, wenn wir deine Steuererklärung vorbereiten. Wir besorgen das Medicare-Levy-Befreiungszertifikat für dich, wo nötig.

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
  'minimum-wage-australia-2026-27': {
    title: 'Mindestlohn Australien: 26,44 $/Std. ab 1. Juli 2026 (Casual 33,05 $)',
    description: 'Der nationale Mindestlohn stieg am 1. Juli 2026 um 6 % auf 26,44 $ pro Stunde (1.004,90 $/Woche). Casual-Sätze mit 25 % Zuschlag und deine Rechte.',
    body: `
Der nationale Mindestlohn in Australien beträgt ab 1. Juli 2026 26,44 $ pro Stunde für festangestellte Arbeitnehmer und 33,05 $ pro Stunde für Casual-Arbeitnehmer (das umfasst den 25 %-Casual Loading). Das gilt für alle Arbeitnehmer, auch für Working Holiday Maker. Allerdings sind die meisten Branchen von modernen Awards oder Tarifverträgen abgedeckt, die höhere Mindestsätze als den nationalen Mindestlohn festlegen - der tatsächliche Satz für deine Stelle ist also meistens höher als 26,44 $.

## Wie wird der australische Mindestlohn festgelegt?

Die Fair Work Commission überprüft den nationalen Mindestlohn jährlich:

- Die Überprüfung findet Mitte des Jahres statt (Juni/Juli)
- Jede Erhöhung tritt ab der ersten vollen Lohnperiode am oder nach dem 1. Juli in Kraft
- Der Satz wird als Stundenlohn bekanntgegeben
- Der 25 %-Casual Loading kommt zusätzlich für Casual-Arbeitnehmer dazu

Der Mindestlohn wird jährlich überprüft, um mit den Lebenshaltungskosten und wirtschaftlichen Bedingungen Schritt zu halten.

## Wie hoch ist der Mindestlohn nach Anstellungsart?

Für das Steuerjahr 2026-27:

- Festangestellte Vollzeit und Teilzeit: 26,44 $ pro Stunde
- Casual-Arbeitnehmer: 33,05 $ pro Stunde (25 %-Loading inklusive)
- Wochenmindestlohn (38 Stunden): 1.004,90 $ brutto
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

Jeder Award hat mehrere Einstufungsstufen mit unterschiedlichen Sätzen basierend auf Erfahrung und Verantwortung. Frage deinen Arbeitgeber, welcher Award für deine Tätigkeit gilt und in welche Einstufung du eingeordnet wurdest.

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
 
## Dein Award zahlt fast sicher mehr

Der nationale Mindestlohn ist die Untergrenze für award-freie Arbeit - aber Gastro, Einzelhandel, Landwirtschaft und Bau laufen alle über Award-Sätze darüber, vor den Zuschlägen. Eine Casual-Kraft in der Gastro kann sonntags legal fast das Doppelte des Schlagzeilen-Minimums verdienen. Der Selbstcheck: [Award und Level identifizieren](/de/blog/award-classifications-working-holiday-australia), den Casual-Satz nachschlagen, mit dem Payslip vergleichen. Wer in einer Award-Branche den "nationalen Mindestlohn" bekommt, wird meistens unterbezahlt.
`,
  },

  // ─── Tax Return - More strategic posts ─────────────────────────────────────
  'how-does-australian-tax-year-work': {
    title: 'Wie funktioniert das australische Steuerjahr für Working Holiday Maker?',
    description: 'Das australische Finanzjahr läuft vom 1. Juli bis 30. Juni. Hier erfährst du, was das für deine Steuererklärung bedeutet und wann du sie einreichen musst.',
    body: `
Das australische Finanzjahr läuft vom 1. Juli bis 30. Juni, nicht nach dem Kalenderjahr. Als Working Holiday Maker musst du für jedes Finanzjahr, in dem du in Australien Einkommen hattest, eine Steuererklärung einreichen. Die Einreichungsfrist ist der 31. Oktober nach Ende des Finanzjahres. Wenn du über einen registrierten Steueragenten wie unser Team einreichst, wird die Frist automatisch verlängert.

## Was bedeutet das Finanzjahr für dich?

Das gesamte Einkommen zwischen dem 1. Juli und 30. Juni wird einem Finanzjahr zugeordnet:

- Im Oktober 2024 nach Australien gekommen und bis April 2025 gearbeitet? Dein gesamtes Einkommen fällt in das Finanzjahr 2024-25 (1. Juli 2024 bis 30. Juni 2025).
- Im März 2024 angefangen zu arbeiten? Dein Einkommen von März bis Juni 2024 fällt in das Finanzjahr 2023-24. Einkommen ab Juli 2024 fällt ins nächste Jahr.

Am Jahresende berechnet das [ATO (australisches Finanzamt)](https://www.workingholidaytax.com.au/de/tax-return) deine tatsächliche Steuerschuld und vergleicht sie mit dem, was dein Arbeitgeber einbehalten hat:

- Mehr einbehalten als geschuldet = Rückzahlung auf dein Konto
- Weniger einbehalten als geschuldet = du zahlst die Differenz

## Wann ist die Frist für die Steuererklärung?

Die Standardfrist ist der 31. Oktober nach Ende des Finanzjahres:

- Finanzjahr 2024-25 (endet 30. Juni 2025) → Frist 31. Oktober 2025
- Finanzjahr 2025-26 (endet 30. Juni 2026) → Frist 31. Oktober 2026

Wenn wir deine Steuererklärung unter Aufsicht eines registrierten Steueragenten einreichen, qualifizierst du dich für eine verlängerte Frist - oft bis Mai des Folgejahres. Das verschafft dir mehr Zeit, falls du den Oktober-Termin verpasst hast oder deine Unterlagen noch nicht komplett sind.

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
- Deine Reisepassdaten zur Identifikation

Wir können auf deine Income Statements direkt über unser Steueragenten-Portal zugreifen, sodass du nicht selbst Lohnzettel von jedem Arbeitgeber zusammensuchen musst. Siehe unseren Artikel zur [Einreichung einer Steuererklärung aus dem Ausland](/de/blog/how-to-lodge-tax-return-from-overseas) für mehr Details, was wir brauchen.

[Kontaktiere unser Team](/de/contact), um deine australische Steuererklärung unter Aufsicht eines registrierten Steueragenten einzureichen und sicherzustellen, dass jede Rückzahlung, die dir zusteht, beantragt wird.
 
## Juli bis Juni: warum die ungewöhnlichen Daten für dich arbeiten

Die Jahresgrenze mitten im Kalenderjahr bedeutet: Ein typisches 12-Monats-Working-Holiday erstreckt sich über zwei Steuerjahre - und diese Aufteilung ist still profitabel. Jedes Jahr wird separat veranlagt: Arbeit von September bis Juni, dann Juli bis März - beide Erklärungen decken Teiljahre ab, in denen der Steuerabzug fast immer überschießt. Zwei Erklärungen, zwei Erstattungschancen. Drei Termine in den Kalender: 1. Juli (Jahr eins einreichen), 31. Oktober (Frist für Selbstabgabe), und deine Abreise (bei endgültigem Abschied vor dem 30. Juni gibt es die vorgezogene Steuererklärung).
`,
  },

  'tax-deductions-working-holiday-makers': {
    title: 'Absetzbare Ausgaben für Working Holiday Maker: Die Liste 2026',
    description: 'Alles, was Backpacker absetzen können - Kurse, Ausrüstung, Arbeitskleidung, Fahrten zwischen Jobs, Agent-Gebühren - und was die ATO ablehnt.',
    body: `
Working Holiday Maker in Australien können arbeitsbezogene Steuerabzüge in ihrer Steuererklärung geltend machen, genau wie australische Residenten. Häufige Absetzungen sind Uniformen und Schutzkleidung, Werkzeuge und Ausrüstung, Fahrten zwischen Arbeitsorten, arbeitsbezogene Handynutzung und Gebühren für registrierte Steueragenten. Um eine Absetzung zu beantragen, muss die Ausgabe direkt mit der Erzielung deines Einkommens zusammenhängen, und du musst einen Nachweis haben (Beleg, Kontoauszug oder Tagebuchnotiz). Unser Team identifiziert berechtigte Absetzungen, wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten.

## Welche arbeitsbezogene Kleidung kannst du absetzen?

Spezielle Arbeitskleidung ist absetzbar:

- Uniformen mit Logo oder spezifischem Design, die vom Arbeitgeber vorgeschrieben sind
- Schutzkleidung (Stahlkappenstiefel, Warnwesten, Sonnencreme für Outdoor-Arbeit)
- Sicherheitsausrüstung (Handschuhe, Helme, Schutzbrillen)
- Reinigungskosten für die obigen Gegenstände

Was **nicht** absetzbar ist:

- Allgemeine Kleidung, auch wenn du sie nur zur Arbeit trägst (schwarze Hosen, weiße Hemden für die Gastronomie)
- Konventionelle Geschäftskleidung
- Einfache Kleidung, die zufällig als Uniform vorgeschrieben ist

## Welche Werkzeuge und Ausrüstung kannst du absetzen?

Werkzeuge, die du für deine Arbeit kaufst, sind absetzbar:

- Messersets, Kochuniformen und Küchenwerkzeuge für die Gastronomie
- Arbeitsstiefel und Sicherheitsausrüstung für Bau- oder Farmarbeit
- Werkzeuge für Handwerker (Mechaniker, Bauarbeiter, Elektriker)
- Kamera- und Beleuchtungsausrüstung für Content-Creator oder Fotografen

Gegenstände unter 300 $ pro Stück können im Kaufjahr komplett abgesetzt werden. Größere Anschaffungen müssen über mehrere Jahre abgeschrieben werden. Wir finden die optimale Behandlung, wenn wir deine Steuererklärung vorbereiten.

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

Du musst den arbeitsbezogenen Prozentsatz basierend auf deiner tatsächlichen Nutzung berechnen. Führe ein vier-Wochentagebuch von Arbeits- vs. Privatnutzung als Beleg. Wir helfen dir, einen angemessenen Prozentsatz zu berechnen, wenn wir deine Steuererklärung vorbereiten.

## Häufige Absetzungen für Working Holiday Maker

Die am häufigsten geltend gemachten Absetzungen für Backpacker:

- Sonnenschutz (Sonnencreme, Sonnenbrille, Sonnenhut) für Outdoorarbeiter
- Arbeitsstiefel und Hi-Vis-Ausrüstung für Farm- und Bauarbeit
- Messersets und Kochuniformen für Küchenarbeit
- Handynutzung für Kontakt zu Arbeitgebern und Schichtpläne
- Steueragentengebühren (ja, unsere Gebühr für deine Steuererklärung ist selbst absetzbar)
- Home-Office-Ausgaben für Remotecontractorarbeit
- Selbststudiumausgaben zur Verbesserung von Fähigkeiten, die direkt mit deinem aktuellen Job zusammenhängen

Auf der Liste der **nicht** absetzbaren Posten:

- Tägliche Fahrten zwischen Zuhause und der Arbeit
- Allgemeine Kleidung
- Ausgaben für Visabeschaffung oder visumbezogene Reisen
- Persönliche Mahlzeiten und Unterhaltung

## Was du nicht absetzen kannst

- Persönliche Ausgaben, die nicht mit dem Erzielen von Einkommen zusammenhängen
- Mahlzeiten (außer wenn du für die Arbeit über Nacht von zu Hause weg reist)
- Vom Arbeitgeber erstattete Kosten
- Fahrten zwischen Zuhause und deinem regulären Arbeitsplatz
- Allgemeine Kleidung
- Ausgaben für dein Visum oder visumbezogene Reisen

## Welche Belege musst du aufbewahren?

Für jede Absetzung brauchst du einen Beleg:

- Eine Quittung mit Datum, Lieferant, Artikel und Betrag
- Ein Bank- oder Kreditkartenauszug, der die Transaktion zeigt
- Eine Tagebuchnotiz (akzeptabel für kleine oder regelmäßige Ausgaben)

Ohne Belege kann die Absetzung nicht geltend gemacht werden, selbst wenn die Ausgabe wirklich arbeitsbezogen war. Fotografiere Quittungen am Tag des Erhalts mit deinem Handy und schick sie dir selbst per E-Mail oder speichere sie in der Cloud.
 
## Die Belege-Routine, die Deutsche sowieso schon können

Die ATO-Anforderungen sind entspannter als deutsche Steuer-Gewohnheiten: Belege als Handyfotos genügen, ein Ordner in der Cloud reicht, und unter 300 $ Gesamtsumme an Arbeitsausgaben geht es sogar ganz ohne Belege (die Ausgaben müssen trotzdem real sein). Die Systematik für ein Backpacker-Jahr: ein Album "Steuer" im Handy, jeder Arbeitskauf sofort fotografiert (Boots, Sonnencreme fürs Feld, RSA-Kurs, Werkzeug), Arbeitsanteil notiert, wo privat mitgenutzt wird. Bei der Erklärung sortiert sich alles in Minuten. Was Deutsche regelmäßig überrascht: Auch die Gebühr des Steueragenten vom Vorjahr ist absetzbar - und Fahrten zwischen zwei Jobs am selben Tag zählen, der Weg von zuhause zum ersten Job nicht.
`,
  },

  // ─── Super - More posts ────────────────────────────────────────────────────
  'what-is-superannuation': {
    title: 'Superannuation erklärt: Die 12 %, die dein Chef zahlen muss',
    description: 'Jeder Arbeitgeber muss zusätzlich zum Lohn 12 % in deine Super einzahlen. Wie das im Working Holiday funktioniert - und wie du das Geld bei der Abreise zurückholst.',
    body: `
[Superannuation](/de/superannuation) (Super) ist Australiens verpflichtendes Rentensparsystem. Australische Arbeitgeber müssen 12 % deiner regulären Arbeitseinkünfte in einen Superfonds einzahlen, zusätzlich zu deinem Lohn. Working Holiday Maker haben Anspruch auf Superbeiträge genau wie australische Arbeitnehmer und können das angesparte Guthaben zurückbekommen, wenn sie Australien dauerhaft verlassen - über den Departing Australia Superannuation Payment (DASP)-Prozess. Unser Team kümmert sich um DASP-Anträge für Working Holiday Maker von überall auf der Welt.

## Wie viel Super zahlt dein Arbeitgeber ein?

Der aktuelle Satz ab 2026 beträgt 12 % deiner regulären Arbeitseinkünfte:

- Der Satz war 11,5 % vom 1. Juli 2024 bis 30. Juni 2025
- Der Satz stieg ab 1. Juli 2025 auf 12 % und bleibt bei 12 %
- Super wird **zusätzlich zu** deinem Lohn gezahlt, nicht davon abgezogen
- Beispiel: Du verdienst 1.000 $ in einer Woche → Arbeitgeber zahlt zusätzlich 120 $ in deinen Superfonds

Wenn auf deinem Lohnzettel Super von deinem Bruttolohn abgezogen wird, ist das falsch. Super stellt immer eine zusätzliche Kostenposition für den Arbeitgeber dar.

## Auf welchen Superfonds gehen deine Beiträge?

Wenn du einen neuen Job anfängst, fragt dich dein Arbeitgeber, welchen Fonds er verwenden soll:

- Wenn du einen Fonds angibst, gehen die Beiträge dorthin
- Wenn du keinen angibst, verwendet dein Arbeitgeber die "Stapled Fund"-Regel (der Fonds, der mit deiner TFN aus früherer australischer Arbeit verknüpft ist)
- Wenn du keinen Stapled Fund hast (dein erster australischer Job), nutzt der Arbeitgeber seinen Standardfonds

Für Working Holiday Maker spielt der spezifische Fonds weniger Rolle als für ständige Einwohner, weil du das Guthaben ohnehin bei der Abreise abhebst. Was zählt: dass du das Konto bei der Auszahlung finden und darauf zugreifen kannst. Unser Team kann Konten bei mehreren Fonds für dich finden.

## Sind alle Working Holiday Maker für Super berechtigt?

Ja, in fast allen Anstellungsfällen:

- Arbeitgeber müssen Super für jeden Arbeitnehmer zahlen, der Lohn verdient (die monatliche 450-$-Schwelle wurde 2022 abgeschafft)
- Super gilt ab dem ersten verdienten Dollar
- Sowohl Working Holiday Visuminhaber (Subclass 417) als auch Work and Holiday Visuminhaber (Subclass 462) sind berechtigt
- Arbeit als Contractor unter einer [ABN](/de/abn) erzeugt in der Regel keine Superbeiträge, mit einigen Ausnahmen

Wenn du dir nicht sicher bist, ob Super für dich gezahlt wird, [schick uns deine Daten](/de/contact) und wir prüfen das.

## Wie bekommst du deine Super zurück, wenn du Australien verlässt?

Der Prozess heißt Departing Australia Superannuation Payment (DASP). Die Schritte:

1. Dein Visum muss abgelaufen oder gekündigt sein
2. Du musst Australien dauerhaft verlassen haben
3. DASP beantragen über unseren Service, den wir für dich einreichen
4. Der Fonds (oder das ATO, falls das Guthaben übertragen wurde) zahlt das Guthaben aus

Wichtig: DASP-Auszahlungen werden mit 65 % der steuerpflichtigen Komponente besteuert - für Working Holiday Maker. Das ist höher als die 35 %, die vor 2017 galten. Trotz der Steuer lohnt es sich immer noch, die Super zu beantragen, weil die Alternative ist, sie für immer zurückzulassen.

Siehe unseren detaillierten Artikel zu [wie der DASP-Prozess funktioniert](/de/blog/what-is-dasp-super-withdrawal) für eine Schritt-für-Schritt-Erklärung.
 
## Super für Backpacker: von der ersten Schicht bis zur Auszahlung

Der Ablauf: Dein Arbeitgeber zahlt 12 % deines regulären Lohns vierteljährlich in einen Fonds (deinen, wenn du einen genannt hast, sonst seinen Default) - das Geld wird investiert und ist während deines Working-Holiday-Visums komplett gesperrt - du verlässt Australien, das Visum endet, und DASP schaltet das Guthaben frei, mit 65 % WHM-Steuer. Drei Handgriffe schützen unterwegs die Endsumme: Nenne jedem Arbeitgeber denselben Fonds (verhindert Zersplitterung), kündige in der ersten Woche die Default-Versicherungen im Fonds (Beiträge für Schutz, den du nie nutzt), und [prüfe die Beiträge vierteljährlich](/de/blog/how-much-super-should-employer-pay) - nicht gezahlte Super ist eines der häufigsten Lohnprobleme für Backpacker, und die ATO setzt sie durch, wenn du sie meldest.
`,
  },

  // ─── Title/description-only translations (body falls back to English with notice) ─

  // Tax Return
  'how-to-lodge-tax-return-working-holiday': {
    title: 'Working Holiday Steuererklärung in Australien einreichen: Schritt-für-Schritt-Anleitung',
    description: 'Schritt-für-Schritt-Anleitung zur Working Holiday Steuererklärung in Australien. Was du brauchst, wann du einreichst und wie es unter Aufsicht eines registrierten Steueragenten für 417 und 462 Visuminhaber erledigt wird - auch aus Deutschland.',
    body: `
Um als Working Holiday Maker eine Steuererklärung in Australien einzureichen, ist die einfachste Option, mit unserem Team unter Aufsicht eines registrierten Steueragenten zu arbeiten. Wir sammeln deine Daten, greifen direkt über unser Steueragentenportal auf deine Income Statements zu, bereiten deine Steuererklärung vor und reichen sie für dich beim ATO ein. Der Prozess funktioniert gleich, egal ob du noch in Australien bist oder schon abgereist. Mit einem registrierten Agenten erhältst du eine verlängerte Einreichungsfrist über den Standard-31. Oktober hinaus.

## Was brauchst du, um eine Steuererklärung einzureichen?

Um deine Steuererklärung über unseren Service einzureichen, brauchen wir:

- Deine Tax File Number (TFN)
- Identifikation (Reisepassdaten)
- Details zu einem australischen Bankkonto für eine eventuelle Rückzahlung
- Alle arbeitsbezogenen Kosten, die du als absetzbar geltend machen möchtest
- Details zu eventuellem ABN- oder Contractoreinkommen (falls relevant)

Wir können auf deine Income Statements direkt aus dem ATO-System zugreifen, sodass du nicht selbst Lohnzettel oder PAYG-Summaries von jedem Arbeitgeber zusammensuchen musst.

## Wie funktioniert der Einreichungsprozess?

Wenn du über unseren Service einreichst:

1. Du schickst uns deine Daten und Belege für absetzbare Kosten
2. Wir holen deine Income Statements aus dem ATO-System
3. Wir bereiten die Steuererklärung vor und prüfen sie auf Genauigkeit
4. Wir bestätigen den erwarteten Rückzahlungsbetrag mit dir, bevor wir einreichen
5. Wir reichen die Steuererklärung beim ATO für dich ein
6. Das ATO bearbeitet die Steuererklärung innerhalb von zwei Wochen und überweist die Rückzahlung auf dein Bankkonto

Du siehst und genehmigst die Zahlen, bevor wir einreichen - es gibt keine Überraschungen.

## Was passiert nach der Einreichung?

Nach der Einreichung:

- Das ATO bearbeitet die Steuererklärung (meistens innerhalb von zwei Wochen)
- Sie vergleichen, was einbehalten wurde, mit dem, was du tatsächlich schuldetest
- Rückzahlung auf dein angegebenes australisches Bankkonto
- Oder, falls du Geld schuldest, bekommst du eine Mitteilung mit Zahlungsfrist

Wir überwachen den Einreichungsstatus und informieren dich, sobald die Rückzahlung ausgestellt wurde.

## Was, wenn du für mehrere Arbeitgeber gearbeitet hast?

Wenn du im Laufe des Jahres für mehr als einen Arbeitgeber gearbeitet hast, muss das Einkommen jedes Arbeitgebers in deiner Steuererklärung erfasst sein. Wenn wir über unser Steueragentenportal einreichen:

- Wir sehen jeden Arbeitgeber, der im Steuerjahr Einkommen für dich gemeldet hat
- Wir gleichen mit allen Lohnzetteln ab, die du uns gibst
- Wir markieren Arbeitgeber, die ihre Meldung noch nicht abgeschlossen haben
- Wir warten, bis alles abgeschlossen ist, bevor wir einreichen, um keine spätere Änderung machen zu müssen

Selbst einreichen kann dazu führen, dass du einen Arbeitgeber vergisst - was Probleme verursacht, wenn das ATO es bemerkt und deine Steuererklärung nachträglich anpasst. Über unseren Service umgehst du dieses Risiko komplett.

Für Steuererklärungen mit mehreren Arbeitgebern oder für Working Holiday Maker mit sowohl TFN- als auch [ABN](/de/abn)-Einkommen ist die Abstimmungsarbeit genauso wichtig wie die Einreichung selbst. [Kontaktiere unser Team](/de/contact), damit jeder Dollar korrekt erfasst wird.
 
## Vor dem Start: der 10-Minuten-Dokumenten-Sweep

Zusammensuchen: jeden Arbeitgebernamen (Income Statements laden automatisch - du prüfst auf Lücken), Bankdaten für die Erstattung, Belege für Abzüge, das Medicare Entitlement Statement für die Befreiung (Wochen vorher bestellen), und den Vorjahresbescheid, falls vorhanden. Die wertvollste Gewohnheit vor der Abgabe: die vorausgefüllte Einkommensliste der ATO gegen dein eigenes Job-Gedächtnis abgleichen - ein fehlender Arbeitgeber bedeutet einen falschen Bescheid und später eine Korrektur. Über einen Agenten? Derselbe Sweep dauert Minuten, und [verlorene Unterlagen holt der Agent](/de/tax-return) direkt aus den ATO-Systemen.
`,
  },

  'what-is-payg-payment-summary': {
    title: 'PAYG Payment Summary verstehen: Anleitung für Working Holiday Maker',
    description: 'Ein PAYG Payment Summary (jetzt Income Statement) zeigt dein Gesamteinkommen und die einbehaltene Steuer für das australische Steuerjahr. Wie du es findest, was die Abschnitte bedeuten und wie es in der Working Holiday Steuererklärung genutzt wird.',
    body: `
Ein PAYG Payment Summary - heute Income Statement genannt - ist die offizielle Aufzeichnung, die dein Gesamtgehalt und die gesamte vom Arbeitgeber einbehaltene Steuer in einem Steuerjahr zeigt. Es ist das Dokument, das zum Einreichen deiner [Steuererklärung](/de/tax-return) genutzt wird. Arbeitgeber melden Löhne und Einbehaltsbeträge automatisch über ihre Lohnbuchhaltungs-Software an das ATO, sodass das Income Statement digital erstellt wird, statt dir als Papierdokument ausgehändigt zu werden. Unter Aufsicht eines registrierten Steueragenten kann unser Team direkt über das ATO-System auf deine Income Statements zugreifen.

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

Das ist einer der Hauptvorteile beim Einreichen über einen registrierten Steueragenten. Wir sehen alles, was das ATO sieht, und warten, bis alle Arbeitgebermeldungen abgeschlossen sind, bevor wir deine Steuererklärung einreichen.

## Was, wenn ein Arbeitgeber seine Meldung nicht abgeschlossen hat?

Wenn ein Steuerjahr beendet ist und das Income Statement eines Arbeitgebers nach dem 31. Juli noch als "in Bearbeitung" angezeigt wird, hat er seine Lohnmeldung nicht abgeschlossen. Wir können:

- Den Arbeitgeber für dich kontaktieren und ihn bitten, die Meldung abzuschließen
- Mit einer Schätzung einreichen, falls der Arbeitgeber nicht reagiert (und später korrigieren, falls nötig)
- Dir helfen, das Problem beim ATO anzusprechen, falls der Arbeitgeber die Meldung verweigert

[Kontaktiere uns](/de/contact), wenn du Hilfe brauchst, einem Arbeitgeber hinterherzulaufen, der seine Meldung nicht abgeschlossen hat.

## Wie wird dein Income Statement zum Einreichen genutzt?

Wenn wir deine Steuererklärung vorbereiten:

- Wir holen deine Income Statements aus dem ATO-System
- Wir gleichen die Zahlen mit allen Lohnzetteln ab, die du uns gibst
- Wir identifizieren Diskrepanzen (fehlende Löhne, falsche Einbehaltung, fehlende Arbeitgeber)
- Wir markieren und lösen Probleme, bevor wir einreichen

Ohne diese Abstimmung einzureichen ist riskant. Die Income Statements sind meistens korrekt, aber nicht immer - und jeder Fehler wird zu einem Problem, das du im Nachhinein mit dem ATO klären musst.
 
## Kein myGov? Dein Agent zieht es direkt aus den ATO-Systemen

Income Statements liegen bei der ATO, nicht beim Arbeitgeber. Nie myGov eingerichtet oder den Zugang nach der Rückkehr nach Deutschland verloren? Ein registrierter Steueragent ruft jedes Income Statement über alle Arbeitgeber direkt ab - ganz ohne Payslips. Das ist der Standardweg für Backpacker, die aus dem Ausland einreichen, und er findet auch die Arbeitgeber, die du vergessen hast.

## Arbeitgeber hat dein Einkommen nie gemeldet?

Kleine Betriebe versäumen manchmal die Finalisierung im Single Touch Payroll. Fehlt ein Job in deiner Liste: Payslips oder Kontoeingänge als Nachweis sammeln und mit rekonstruierten Zahlen einreichen. Die korrekte Meldung ist Pflicht des Arbeitgebers - die Deklaration des Einkommens bleibt deine.
`,
  },

  'do-you-need-to-lodge-tax-return-short-stay': {
    title: 'Working Holiday Steuererklärung nach kurzem Aufenthalt in Australien nötig?',
    description: 'Nur ein paar Wochen oder Monate auf Working Holiday Visum in Australien gearbeitet? Finde heraus, ob du eine Steuererklärung einreichen musst und wie du überzahlte Steuern zurückholen kannst.',
    body: `
Ja, du musst fast sicher eine Steuererklärung in Australien einreichen, auch wenn du nur ein paar Wochen gearbeitet hast. Die Einreichungspflicht hängt nicht davon ab, wie lange du geblieben bist. Sie hängt davon ab, ob du während des australischen Steuerjahres Einkommen hattest. Zwei Wochen zu arbeiten erzeugt dieselbe Einreichungspflicht wie zwei Jahre. Einreichen lohnt sich auch oft finanziell, weil die meisten Working Holiday Maker eine Rückzahlung bekommen.

## Was ist die allgemeine Regel?

Wenn du in einem Steuerjahr (1. Juli bis 30. Juni) in Australien irgendeinen Lohn verdient hast, musst du für dieses Jahr eine Steuererklärung einreichen. Das gilt für:

- Casual-Rollen über zwei Wochen
- Einzelne Saisonjobs
- Kurze Contractor-Arbeit unter einer [ABN](/de/abn)
- Schwarzarbeit, die eigentlich über PAYG gemeldet werden sollte

Das ATO nutzt deine Steuererklärung, um deine tatsächliche Steuerschuld zu berechnen und sie mit dem abzugleichen, was von deinen Löhnen einbehalten wurde.

## Wann musst du eventuell nicht einreichen?

Es gibt begrenzte Umstände, in denen Einreichen nicht erforderlich ist:

- Du hast in dem Steuerjahr nichts in Australien verdient
- Dein einziges australisches Einkommen war Anlageeinkommen (Zinsen oder Dividenden) unter einer kleinen Schwelle, mit korrekt angewendeter Quellensteuer

Für Working Holiday Maker, die in irgendeiner Lohn-zahlenden Rolle gearbeitet haben, gilt die Einreichungspflicht fast immer. Wenn du unsicher bist, ob deine Situation eine Einreichung erfordert, [schick uns eine Nachricht](/de/contact) mit den Details und wir prüfen das.

## Warum sich Einreichen meistens lohnt, auch wenn du nur kurz gearbeitet hast

Auch wenn nicht streng erforderlich, führt das Einreichen oft zu einer Rückzahlung. Die häufigsten Gründe, warum Kurzzeitarbeiter eine Rückzahlung bekommen:

- Ohne hinterlegte TFN für einen Teil der Zeit gearbeitet (mit 45 % statt 15 % einbehalten)
- Arbeitgeber hat zum Foreign-Resident-Satz (30 %) einbehalten statt zum Working-Holiday-Maker-Satz
- Zeiträume, in denen der falsche Satz angewendet wurde wegen falscher Einstellung des TFN Declaration-Formulars
- Berechtigte Absetzungen für arbeitsbezogene Kleidung, Werkzeuge oder Fahrten

Nicht einzureichen bedeutet, jede Rückzahlung beim ATO liegen zu lassen. Die Beträge sind oft mehrere Hundert bis mehrere Tausend Dollar - auch bei kurzen Aufenthalten.

## Wie du nach einem kurzen Aufenthalt oder aus dem Ausland einreichst

Auch wenn du Australien schon verlassen hast, ist Einreichen über unseren Service einfach:

1. [Schick uns deine Daten](/de/contact) (TFN, Reisepass, Beschäftigungsdaten)
2. Wir holen deine Income Statements aus dem ATO-System
3. Wir bereiten die Steuererklärung remote vor und reichen sie ein
4. Die Rückzahlung wird auf dein australisches Bankkonto überwiesen

Du musst nicht nach Australien zurückkommen. Halte dein australisches Bankkonto offen, bis die Rückzahlung gutgeschrieben ist.

Die Standardfrist ist der 31. Oktober nach Ende des Steuerjahres, aber wenn du über unser Team unter Aufsicht eines registrierten Steueragenten einreichst, qualifizierst du dich für die verlängerte Agentenfrist.
 `,
  },

  'how-to-lodge-tax-return-from-overseas': {
    title: 'Australische Steuererklärung aus dem Ausland einreichen (Deutschland, UK, Japan)',
    description: 'Australien verlassen und Working Holiday Steuererklärung einreichen? Komplette Anleitung für 417 und 462 Visuminhaber - aus Deutschland, Österreich, der Schweiz oder anderswo. Online mit registriertem Steueragenten.',
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
- Identifikation (Reisepassdaten)
- Details zu einem australischen Bankkonto für die Rückzahlung
- Belege für absetzbare Kosten (wir besprechen mit dir, was berechtigt ist)
- Details zu eventuellem ABN- oder Contractoreinkommen

Falls du dein australisches Bankkonto bereits geschlossen hast, [kontaktiere unser Team](/de/contact) und besprechen wir alternative Möglichkeiten für den Empfang der Rückzahlung.

## Was ist die Frist für die Einreichung aus dem Ausland?

Die Standardfrist ist der 31. Oktober nach Ende des Steuerjahres:

- Steuerjahr 2024-25 → Standardfrist 31. Oktober 2025
- Über unseren Service unter Aufsicht eines registrierten Steueragenten → Frist oft bis Mai des Folgejahres verlängert

Das bedeutet: Wenn du die Oktoberfrist verpasst hast, gibt dir das Einreichen über uns weiterhin Zeit, einzureichen ohne Strafgebühren.

## Was passiert mit deiner Rückzahlung, wenn du aus dem Ausland einreichst?

Wenn im Laufe des Jahres zu viel Steuer gezahlt wurde, erstattet das ATO die Differenz:

- Wird auf dein australisches Bankkonto überwiesen
- Kommt meistens innerhalb von zwei Wochen nach Einreichung an
- Manchmal schneller (ein paar Werktage)
- Die Zahlung ist in australischen Dollar

Halte dein australisches Bankkonto offen, bis die Rückzahlung gutgeschrieben ist. Wenn du es bereits geschlossen hast, finden wir gemeinsam mit dir alternative Lösungen, wenn wir mit der Steuererklärung anfangen.

## Was, wenn du Geld schuldest statt eine Rückzahlung zu bekommen?

In seltenen Fällen, wenn im Laufe des Jahres zu wenig einbehalten wurde (zum Beispiel mit ABN-Einkommen oder wenn der Freibetrag fälschlich beansprucht wurde), schuldest du eventuell Geld, statt eine Rückzahlung zu bekommen. Wenn das passiert:

- Das ATO stellt eine Mitteilung mit Zahlungsfrist aus
- Wir können einen Zahlungsplan einrichten, falls nötig
- Der Betrag muss bezahlt werden, bevor deine Steuerpflichten als gelöst gelten

Die meisten Working Holiday Maker bekommen eine Rückzahlung. Geld zu schulden ist die Ausnahme, nicht die Regel.
 `,
  },

  'what-is-a-tax-agent': {
    title: 'Registrierte Steueragenten für Working Holiday Maker in Australien: Anleitung',
    description: 'Ein registrierter Steueragent ist vom Tax Practitioners Board (TPB) lizenziert, Steuererklärungen für dich vorzubereiten und einzureichen. Warum Working Holiday Maker auf 417 und 462 Visum Steueragenten nutzen, was sie machen und was sie kosten.',
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

- **Mehrere Arbeitgeber**: Wenn du im Laufe des Jahres für mehrere Arbeitgeber gearbeitet hast, ist das Fehlerrisiko beim Selbsteinreichen hoch. Ein Agent sammelt alle Einkünfte und gleicht sie ab.
- **Einreichung aus dem Ausland**: Einreichen aus dem Ausland ist ohne lokale Infrastruktur (australische Telefonnummern, Adressen, Bankzugang) schwieriger. Ein Agent erledigt alles aus der Ferne.
- **Verpasste Absetzungen**: Working Holiday Maker verpassen oft Absetzungen, auf die sie Anspruch haben (Arbeitsstiefel, Uniformen, Sonnenschutz, Handynutzung, Steueragentengebühren selbst). Ein Agent identifiziert sie.
- **Verlängerte Frist**: Wenn du über einen registrierten Agenten einreichst, qualifizierst du dich für eine verlängerten Frist über den Standard-31. Oktober hinaus - oft bis Mai des Folgejahres.
- **Keine ATO-Verwaltung**: Du musst dich nie selbst im ATO-Online-Portal zurechtfinden.

## Wie verifizierst du, dass ein Steueragent seriös ist?

Verifiziere immer, dass der Agent aktuell registriert ist:

- [Prüfe, dass jeder, der dich berät, ein registrierter Steueragent ist](/de/contact)
- Bestätige, dass die Registrierung des Agenten aktiv und nicht suspendiert ist
- Verifiziere, dass die Registrierung Steueragentendienstleistungen abdeckt (nicht nur BAS-Dienstleistungen)
- Frag im Voraus nach der TPB-Registrierungsnummer des Agenten

Beauftrage niemals jemanden, der behauptet, ein Steueragent zu sein, aber keine TPB-Registrierungsnummer angeben kann. Das TPB-Register ist die einzige verbindliche Quelle.

## Wie wird unser Service beaufsichtigt?

Wir arbeiten unter der Aufsicht eines registrierten Steueragenten. Unsere Registrierungsdetails sind im TPB-Register aufgeführt und auf Anfrage verfügbar. Wenn wir deine Steuererklärung einreichen, geschieht das über die TPB-Nummer des beaufsichtigenden Steueragenten - das heißt, du bekommst alle Schutz- und Vorteilsmöglichkeiten der Zusammenarbeit mit einem registrierten Agenten.

[Kontaktiere](/de/contact) unser Team und wir teilen dir unsere Registrierungsdetails mit und erklären, wie unser Prozess funktioniert.
 `,
  },

  'how-does-payg-withholding-work': {
    title: 'Wie funktioniert PAYG-Einbehaltung in Australien?',
    description: 'PAYG-Einbehaltung ist, wie dein Arbeitgeber Steuer von deinem Lohn einbehält, bevor er dich bezahlt. Hier erfährst du, wie das System funktioniert.',
    body: `
PAYG (Pay As You Go)-Einbehaltung ist das System, das australische Arbeitgeber nutzen, um Einkommensteuer von deinem Lohn abzuziehen, bevor sie dich bezahlen. Der einbehaltene Betrag wird direkt ans ATO als Vorauszahlung auf deine jährliche Steuerschuld gezahlt. Für Working Holiday Maker mit hinterlegter [TFN](/de/tfn) beträgt der korrekte PAYG-Einbehaltungssatz 15 % auf die ersten 45.000 $ Einkommen. Ohne TFN springt der Satz auf 45 %.

## Wie funktioniert PAYG für Working Holiday Maker?

Der PAYG-Prozess für einen Working Holiday Maker:

1. Du gibst deine [TFN](/de/tfn) an und füllst ein TFN Declaration-Formular aus
2. Du erklärst auf dem Formular deinen Visastatus als Working Holiday Maker
3. Dein Arbeitgeber wendet den 15 %-Satz auf deinen Bruttolohn an
4. Der einbehaltene Betrag wird vom Arbeitgeber ans ATO gezahlt
5. Am Jahresende gleicht deine Steuererklärung den insgesamt einbehaltenen Betrag mit deiner tatsächlichen Steuerschuld ab

Wenn du deine TFN nicht angibst, muss dein Arbeitgeber 45 % einbehalten. Das zu viel Einbehaltene holst du dir mit deiner [Steuererklärung](/de/tax-return) zurück - aber das Geld liegt bis dahin beim ATO.

## Was erscheint auf deinem Lohnzettel?

Jeder australische Lohnzettel sollte zeigen:

- **Bruttolohn**: Gesamteinkommen vor Abzügen
- **Tax withheld**: als PAYG abgezogener Betrag (sollte 15 % vom Brutto für Working Holiday Maker sein)
- **[Super](/de/superannuation)**: 12 %-Superbeitrag, den dein Arbeitgeber zahlt (nicht von deinem Lohn abgezogen)
- **Nettolohn**: Betrag, der auf deinem Bankkonto landet

Wenn du feststellst, dass 45 % einbehalten werden, obwohl du deine TFN angegeben hast, sprich es sofort mit deinem Arbeitgeber an. Wenn er das Problem nicht beheben kann, [schick uns deinen Lohnzettel](/de/contact) und wir finden die korrekte Behandlung.

## Wie verbindet PAYG sich mit deiner Steuererklärung?

Am Jahresende schließt dein Arbeitgeber seine Lohnmeldung ab:

- Gesamtlöhne, die dir im Jahr gezahlt wurden, werden ans ATO gemeldet
- Gesamte einbehaltene PAYG-Steuer wird ans ATO gemeldet
- Beide Zahlen erscheinen in deinem Income Statement
- Wir nutzen diese Zahlen, wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten

Das ATO vergleicht dann:

- Was du tatsächlich schuldetest (berechnet aus deinem Gesamteinkommen und Visastatus)
- Was über PAYG während des Jahres einbehalten wurde

Wenn zu viel einbehalten wurde, bekommst du eine Rückzahlung. Wenn zu wenig einbehalten wurde, schuldest du die Differenz.

## Häufige PAYG-Probleme für Working Holiday Maker

Die häufigsten Probleme, die wir sehen:

- 45 %-Einbehaltung, weil die TFN bei Arbeitsbeginn noch nicht hinterlegt war
- 30 %-Einbehaltung, weil der Arbeitgeber beim ATO nicht als Arbeitgeber für Working Holiday Maker registriert war
- Freibetrag fälschlich auf dem TFN Declaration-Formular beansprucht
- Keine PAYG-Einbehaltung bei Schwarzarbeit
- Gemischtes PAYG- und ABN-Einkommen, das durch falsche Einstellungen kompliziert wird

Wenn dein Lohnzettel falsch aussieht oder du einen Fehler vermutest, [kontaktiere unser Team](/de/contact). Wir finden heraus, was hätte einbehalten werden sollen, und holen jeden zu viel gezahlten Betrag über deine Steuererklärung zurück.
 
## Ein Dollar auf dem Weg von der Schicht zur Erstattung

Du verdienst am Dienstag einen Dollar. Zahltag: 15 Cent gehen einbehalten über deine TFN an die ATO, 85 Cent aufs Konto, 12 Cent Super fließen separat in deinen Fonds. Übers Jahr sammeln sich diese 15-Cent-Stücke unter deinem Namen. Zur Steuerzeit wird die echte Schuld berechnet - und jeder darüber einbehaltene Cent kommt als Erstattung zurück. Mehr ist PAYG nicht: Vorauszahlung auf Rechnung, jährlich abgerechnet. Genau deshalb lohnt der [Blick auf den Abzugssatz jedes Payslips](/de/blog/what-does-tax-withheld-mean-payslip) - Fehler verzinsen sich wöchentlich, bis jemand hinschaut.
`,
  },

  'australian-financial-year-dates': {
    title: 'Australisches Steuerjahr: 1. Juli bis 30. Juni (2026-27)',
    description: 'Das australische Steuerjahr läuft vom 1. Juli bis 30. Juni. Die wichtigsten Termine für Working Holiday Maker - Abgabe ab 1. Juli, Frist 31. Oktober.',
    body: `
Das australische Finanzjahr läuft vom 1. Juli bis 30. Juni des folgenden Kalenderjahres. Das ist anders als das Kalenderjahr und anders als das Steuerjahr, das in vielen anderen Ländern genutzt wird. Das aktuelle Finanzjahr ist (Stand Mitte 2026) 2025-26 (1. Juli 2025 bis 30. Juni 2026). Diese Daten zu kennen ist für Working Holiday Maker wichtig, weil das gesamte in einem Finanzjahr verdiente Einkommen zusammen auf einer Steuererklärung eingereicht werden muss.

## Wie werden australische Finanzjahre benannt?

Australische Finanzjahre erstrecken sich über zwei Kalenderjahre und werden daher mit beiden Jahreszahlen bezeichnet:

- **Finanzjahr 2024-25**: 1. Juli 2024 bis 30. Juni 2025
- **Finanzjahr 2025-26**: 1. Juli 2025 bis 30. Juni 2026
- **Finanzjahr 2026-27**: 1. Juli 2026 bis 30. Juni 2027

Wenn vom "aktuellen Steuerjahr" oder "diesem Finanzjahr" die Rede ist, ist das gerade laufende Finanzjahr gemeint.

## Warum sind diese Daten für Working Holiday Maker wichtig?

Die Daten bestimmen, in welche Steuererklärung dein Einkommen fällt:

- November 2024 angekommen, bis Mai 2025 gearbeitet: alles Einkommen fällt ins Finanzjahr 2024-25. Reiche nach dem 30. Juni 2025 ein.
- Mai 2024 angekommen, August 2024 abgereist: Einkommen erstreckt sich über zwei Finanzjahre. Du musst separate Steuererklärungen für 2023-24 (Mai-Juni 2024-Einkommen) und 2024-25 (Juli-August 2024-Einkommen) einreichen.
- Juli 2025 angekommen, bis Juni 2026 gearbeitet: alles Einkommen fällt ins Finanzjahr 2025-26. Reiche nach dem 30. Juni 2026 ein.

Wenn dein Aufenthalt über den 30. Juni hinausgeht, musst du zwei Steuererklärungen einreichen - eine für jedes Finanzjahr. Damit ist unser Team regelmäßig vertraut.

## Welche Schlüsseldaten solltest du dir merken?

- **30. Juni**: Finanzjahr endet
- **1. Juli**: neues Finanzjahr beginnt, Einreichungsfenster für die Steuererklärung öffnet
- **14. Juli**: Arbeitgeber beginnen mit dem Abschluss der Income Statements
- **31. Juli**: die meisten Income Statements sollten bis zu diesem Datum abgeschlossen sein
- **31. Oktober**: Standardfrist zum Einreichen deiner Steuererklärung
- **Verlängerte Frist (etwa Mai des Folgejahres)**: gilt, wenn du über einen registrierten Steueragenten wie unser Team einreichst

Die Einreichung öffnet am 1. Juli, aber es lohnt sich meistens, bis Ende Juli oder Anfang August zu warten, damit das Income Statement deines Arbeitgebers abgeschlossen ist. Wir überwachen das für dich, wenn du über unseren Service einreichst.

## Was ist mit Super und vierteljährlichen Fristen?

Superannuation-Beiträge werden vierteljährlich gezahlt:

- Q1 (Jul-Sep): fällig bis 28. Oktober
- Q2 (Okt-Dez): fällig bis 28. Januar
- Q3 (Jan-Mär): fällig bis 28. April
- Q4 (Apr-Jun): fällig bis 28. Juli

Diese Daten sind wichtig, wenn du prüfst, ob dein Arbeitgeber deine [Super](/de/superannuation) korrekt gezahlt hat, bevor du Australien verlässt.

[Kontaktiere unser Team](/de/contact), um deine australische Steuererklärung unter Aufsicht eines registrierten Steueragenten einzureichen und sicherzustellen, dass jede Rückzahlung, die dir zusteht, beantragt wird.
 
## Die Termine, die dich bei Verpassen echtes Geld kosten

- **1. Juli**: Abgabe öffnet; Income Statements werden bis Mitte Juli "tax ready" - Abgabe in der ersten Woche riskiert Lücken im Pre-Fill
- **31. Oktober**: Frist der Selbstabgabe; ohne Agent drohen danach Verspätungsstrafen
- **Endgültige Abreise vor dem 30. Juni**: Du darfst sofort die vorgezogene Erklärung einreichen - die Option, von der kaum ein Backpacker weiß
- **Dein Visa-Enddatum**: startet die DASP-Berechtigung und den 6-Monats-Timer bis zum Super-Transfer an die ATO

## Mitten im Jahr angekommen oder abgereist? Deine Erstattungsmathematik ändert sich

Ein Teiljahr Arbeit heißt fast immer: Der Abzug hat ein volles Jahreseinkommen unterstellt. Diese Lücke ist der Grund, warum Mid-Year-Ankömmlinge und -Abreisende größere Erstattungen sehen als Ganzjahres-Arbeiter beim selben Lohn - und warum die vorgezogene Erklärung bei der Abreise bares Geld wert ist.
`,
  },

  'cash-in-hand-tax-return': {
    title: 'Kannst du eine Steuererklärung machen, wenn du in Australien schwarz gearbeitet hast?',
    description: 'Schwarzarbeit befreit dich nicht von deinen Steuerpflichten. Hier erfährst du, was du angeben musst und wie du damit umgehst.',
    body: `
Ja, du musst eine Steuererklärung einreichen, wenn du in Australien schwarz gearbeitet hast. Barzahlungen sind genauso steuerpflichtig wie Lohn, der per Banküberweisung gezahlt wurde. Der einzige Unterschied ist, dass zum Zeitpunkt der Zahlung keine PAYG-Steuer einbehalten wurde - du bist also dafür verantwortlich, das Einkommen anzugeben und die fällige Steuer am Ende des Steuerjahres zu zahlen. Bareinkommen nicht anzugeben ist Steuerhinterziehung. Unser Team kümmert sich regelmäßig um Steuererklärungen, die Schwarzarbeit beinhalten.

## Was bedeutet Schwarzarbeit für deine Steuer?

Wenn du in bar bezahlt wirst:

- Keine PAYG-Steuer wird zum Zahlungszeitpunkt einbehalten
- Es existiert keine Aufzeichnung im Lohnmeldesystem des ATO
- Du bekommst den vollen Betrag, aber die Steuerschuld liegt bei dir
- Du gibst das Einkommen selbst in deiner Steuererklärung am Jahresende an

Das heißt, du schuldest eventuell Steuer zum 15 %-Working-Holiday-Maker-Satz auf die bar verdienten Beträge - zahlbar bei der Einreichung statt über PAYG.

## Welche Unterlagen solltest du aufbewahren?

Ohne PAYG-Aufzeichnungen ist deine eigene Dokumentation entscheidend:

- Daten, an denen du gearbeitet hast (jede Schicht notieren)
- Gearbeitete Stunden pro Schicht
- Vereinbarter Lohnsatz
- Erhaltener Betrag pro Zahlung
- Name und Kontaktdaten der Person oder des Unternehmens, die/das dich bezahlt hat
- Textnachrichten, E-Mails oder Benachrichtigungen zum Schichtplan, die die Arbeit bestätigen

Fotografiere oder scanne diese Unterlagen und speichere sie sicher. Das ATO kann sie bis zu fünf Jahre später anfordern.

## Was ist mit Super bei Schwarzarbeit?

Wenn du Angestellter warst (kein Contractor unter einer [ABN](/de/abn)), ist dein Arbeitgeber gesetzlich verpflichtet, 12 % [Superannuation](/de/superannuation) zusätzlich zu deinem Lohn zu zahlen - auch wenn du bar bezahlt wirst. Viele bar zahlende Arbeitgeber tun das nicht. Das ist ein schwerer Verstoß gegen australisches Arbeitsrecht.

Wenn dir unbezahlte Super zusteht:

- Bewahre alle Unterlagen über deine Stunden und Löhne auf
- [Kontaktiere unser Team](/de/contact) und wir können helfen, das Problem anzugehen
- Wir bearbeiten den Erstattungsprozess regelmäßig für unsere Mandanten

Der erstattete Betrag kann beträchtlich sein, wenn du mehrere Wochen oder Monate gearbeitet hast.

## Was, wenn du keinen Lohnzettel bekommen hast?

Ohne Lohnzettel zu arbeiten ist bei Barvereinbarungen leider üblich. So gehst du damit um:

- Nutze deine eigenen Aufzeichnungen als Grundlage für die Einkommensangabe
- Sei ehrlich und konsistent (schätze dort, wo exakte Zahlen nicht verfügbar sind)
- Bewahre Belege für die Arbeit auf (Bankauszüge, die zeigen, wann du Bargeld eingezahlt hast, Textnachrichten, Fotos am Arbeitsplatz)

Eine ehrliche Steuererklärung mit leicht ungenauen Zahlen ist viel besser, als überhaupt nicht einzureichen. Dem ATO geht es viel mehr um vorsätzliche Nichtangabe als um kleine, gutgläubige Schätzfehler.

## Wie geht unser Service mit Einkommen aus Schwarzarbeit um?

Wenn du über uns einreichst:

- Wir geben das Bareinkommen zum korrekten 15 %-Working-Holiday-Maker-Satz an
- Wir berechnen genau, wie viel du schuldest (wenn überhaupt)
- Wir beantragen alle arbeitsbezogenen Abzüge, um die Steuerlast zu reduzieren
- Wir können auch helfen, unbezahlte Super zurückzuholen, falls du Angestellter warst

[Schick uns deine Daten](/de/contact) und wir finden den besten Weg, mit deiner Steuererklärung umzugehen - auch wenn deine Unterlagen unvollständig sind.
 
## Einkommen rekonstruieren, das die ATO akzeptiert

Keine Payslips heißt nicht keine Erklärung. Die Zahlen baust du neu auf aus: Kontoeingängen (auch teilweise Einzahlungsmuster helfen), einem Kalender mit Daten, Stunden und Sätzen, Nachrichten mit dem Arbeitgeber über Schichten und Lohn, und Namen von Kollegen für den Eskalationsfall. Deklariert wird als Lohn ohne Income Statement - myTax und Agenten unterstützen beides. Zwei Dinge passieren danach: Deine Erklärung ist ehrlich (schützt deine Visa-Akte), und die fehlenden Abzüge und Super des Arbeitgebers werden sein Problem, nicht deins - auf Wunsch [meldbar beim Fair Work Ombudsman](/de/blog/wage-theft-working-holiday-australia).
`,
  },

  'tax-residency-working-holiday-makers': {
    title: 'Sind Working Holiday Maker Steuerresidenten Australiens?',
    description: 'Dein Steuerresidentenstatus beeinflusst, welche Steuersätze für dich gelten. Die meisten Working Holiday Maker sind keine Steuerresidenten.',
    body: `
Nein, Working Holiday Maker (Subclass 417- und 462-Visuminhaber) sind nach den Standardregeln keine australischen Steuerresidenten. Seit 2017 wird allerdings das gesamte Einkommen von Working Holiday Makern nach einem spezifischen Rahmen besteuert: ein pauschaler Satz von 15 % auf die ersten 45.000 $, unabhängig davon, ob du technisch Resident oder Non-Resident bist. Der Freibetrag gilt für Working Holiday Maker in keinem Fall. Die Residenzfrage ist für Working-Holiday-Löhne weniger wichtig als für andere Visaarten, kann aber Absetzungen und die Behandlung von Anlageeinkommen beeinflussen.

## Was ist der Working-Holiday-Maker-Steuerrahmen?

Seit 2017 werden Working Holiday Visuminhaber nach einem separaten Rahmen besteuert:

- Alles Lohneinkommen pauschal mit 15 % bis 45.000 $ pro Jahr besteuert
- 30 % auf Einkünfte zwischen 45.001 und 135.000 $
- 37 % auf Einkünfte zwischen 135.001 und 190.000 $
- 45 % auf Einkünfte über 190.000 $

Das gilt unabhängig davon, ob du nach den allgemeinen Regeln technisch Steuerresident oder Non-Resident bist. Der 15 %-Satz ist durch Working-Holiday-Maker-Gesetzgebung festgelegt und funktioniert unabhängig von der Residenz.

## Warum ist Residenz in manchen Situationen trotzdem wichtig?

Auch wenn der Pauschalsatz auf Löhne gilt, kann dein Residenzstatus weiterhin beeinflussen:

- **Absetzungen**: manche Absetzungen sind nur Residenten zugänglich
- **Anlageeinkommen**: Behandlung von Kapitalgewinnen und Anlageeinkommen variiert
- **Auslandseinkommen**: ob du Einkommen, das außerhalb Australiens verdient wurde, angeben musst
- **Medicare Levy**: an Medicare-Berechtigung gekoppelt, die an Residenz gekoppelt ist

Für die meisten Working Holiday Maker, die nur australisches Lohneinkommen und keine bedeutenden Investments haben, hat Residenz minimale praktische Auswirkung. Für komplexere Situationen (lange Aufenthalte, bedeutende Verbindungen zu Australien, ausländisches Anlageeinkommen) ist es wichtiger.

## Warum gilt der Freibetrag nicht?

Unabhängig von der Residenzklassifizierung:

- Working Holiday Maker können den 18.200 $-Freibetrag nicht beanspruchen
- Der 15 %-Satz gilt ab dem allerersten Dollar
- Das ist durch Working-Holiday-Maker-Gesetzgebung festgelegt
- "Nein" zum Freibetrag auf deinem TFN Declaration-Formular auszuwählen ist für Working Holiday Maker immer korrekt

Wenn du den Freibetrag fälschlich beansprucht hast, droht dir eventuell eine Steuerschuld am Jahresende, weil zu wenig Steuer einbehalten wurde. Siehe unseren Artikel zu [Freibetrag für Working Holiday Maker](/de/blog/tax-free-threshold-working-holiday-visa).

## Was solltest du zur Steuerzeit auswählen?

Wenn wir deine [Steuererklärung](/de/tax-return) einreichen:

- Residenzauswahl: **Working Holiday Maker** (nicht Resident, nicht Foreign Resident)
- Das löst den 15 %-Satz aus
- Aktiviert die Medicare-Levy-Befreiung
- Wendet die korrekten Absetzungsregeln an

Selbsteinreicher wählen manchmal versehentlich "Foreign Resident" oder "Resident", was zu falschem Satz führt. Wir kümmern uns darum korrekt, wenn wir deine Steuererklärung vorbereiten.

## Was, wenn deine Umstände komplexer sind?

Spezifische Beratung ist sinnvoll, wenn eines der folgenden zutrifft:

- Du warst über 12 Monate ununterbrochen in Australien
- Du hast bedeutende Verbindungen (langfristiger Mietvertrag, australischer Partner, Geschäftsinteressen)
- Du hast ausländisches Anlageeinkommen
- Du hast residenzbezogene Fragen zur Steuer in deinem Heimatland

[Kontaktiere unser Team](/de/contact) und wir arbeiten deine spezifische Situation durch. Die meisten Working Holiday Maker brauchen diese Detailanalyse nicht, aber für komplexe Fälle ist es wichtig, es richtig zu machen.
 `,
  },

  'what-is-a-tax-refund-australia': {
    title: 'Was ist eine Steuerrückerstattung und woher weißt du, ob dir eine in Australien zusteht?',
    description: 'Eine Steuerrückerstattung ist Geld, das das ATO zurückerstattet, wenn du übers Jahr zu viel gezahlt hast. Die meisten Working Holiday Maker bekommen eine zurück.',
    body: `
Eine Steuerrückerstattung ist Geld, das die Australian Taxation Office (ATO) dir zurückzahlt, wenn die im Laufe des Jahres von deinem Lohn einbehaltene Steuer höher war als deine tatsächliche Steuerschuld. Die meisten Working Holiday Maker bekommen eine Rückzahlung, weil ihr Arbeitgeber mehr Steuer als nötig einbehalten hat (oft während Zeiten ohne TFN oder weil sie nur einen Teil des Steuerjahres gearbeitet haben). Die Rückzahlung wird meistens innerhalb von zwei Wochen nach Einreichung auf dein australisches Bankkonto überwiesen. Unser Team berechnet deine erwartete Rückzahlung vor der Einreichung, damit du weißt, was zu erwarten ist.

## Warum bekommen die meisten Working Holiday Maker eine Rückzahlung?

Mehrere Faktoren führen typischerweise zu einer Rückzahlung:

- Du hast nur einen Teil des Steuerjahres gearbeitet (die Einbehaltung deines Arbeitgebers basiert auf einer Ganzjahresschätzung)
- Zeiten ohne hinterlegte TFN (45 % statt 15 % einbehalten)
- Zeiten mit nicht registriertem Arbeitgeber (30 % statt 15 % einbehalten)
- Berechtigte Absetzungen, die dein steuerpflichtiges Einkommen reduzieren
- Medicare-Levy-Befreiung (spart 2 % des steuerpflichtigen Einkommens)

Je länger du in einem Jahr gearbeitet hast und je mehr Einbehaltungsprobleme es gab, desto größer die typische Rückzahlung.

## Wie weißt du, ob dir eine Rückzahlung zusteht?

Der einzige Weg, es genau zu wissen, ist eine Steuererklärung vorzubereiten:

- Wir holen deine Income Statements aus dem ATO-System
- Berechnen deine tatsächliche Steuerschuld zum 15 %-Satz
- Vergleichen mit dem, was einbehalten wurde
- Fügen berechtigte Abzüge und die Medicare-Levy-Befreiung hinzu
- Bestätigen den Rückzahlungsbetrag vor der Einreichung

Als grobe Schätzung: die meisten Working Holiday Maker, für die wir einreichen, erhalten zwischen 1.000 und 3.000 $ zurück. Manche bekommen mehr, je nach Aufenthaltsdauer, Zeiten höherer Einbehaltung und berechtigten Absetzungen.

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
- Beantrage die Medicare-Levy-Befreiung (falls nicht Medicare-berechtigt)
- Verfolge das ganze Jahr über arbeitsbezogene Ausgaben
- Bewahre Belege für Uniformen, Werkzeuge, arbeitsbezogene Fahrten auf
- Speichere Unterlagen über nicht erstattete Arbeitsausgaben

Wir identifizieren Absetzungen, die du beim Selbsteinreichen vielleicht übersiehst. Das Ergebnis ist meistens eine bedeutend größere Rückzahlung.
 
## Die fünf Zeichen, dass dir Geld zusteht

1. Irgendeine Phase ohne TFN in der Lohnbuchhaltung (45 % statt 15 % einbehalten)
2. Eine Farm oder ein Kleinbetrieb ohne WHM-Registrierung (30 %+ einbehalten)
3. Ankunft oder Abreise mitten im Steuerjahr
4. Medicare-Levy-Befreiung nie beantragt (2 % des Einkommens für Deutsche und die meisten Nationalitäten)
5. Ungeltend gemachte Ausgaben: Kurse, Ausrüstung, Sonnenschutz, Agentengebühren

Drei oder mehr Treffer? Deine Erstattung liegt wahrscheinlich im vierstelligen Bereich. Rechne dein Szenario im [Rechner](/de/calculator) durch oder [lass uns deine Berechtigung prüfen](/de/contact).
`,
  },

  'how-long-does-tax-refund-take-australia': {
    title: 'Steuererstattung Australien: Meist in 2 Wochen ausgezahlt',
    description: 'Elektronisch eingereichte Steuererklärungen bearbeitet die ATO meist in unter 14 Tagen, maximal ca. 30. Was Erstattungen verzögert und wie du deine verfolgst.',
    body: `
Die meisten australischen Steuerrückerstattungen werden innerhalb von zwei Wochen nach Einreichung bearbeitet und ausgezahlt, wenn die Steuererklärung elektronisch eingereicht wird. Über unseren Service unter Aufsicht eines registrierten Steueragenten reichen wir elektronisch ein, sodass Rückzahlungen typischerweise innerhalb von 7-14 Werktagen ankommen. Rückzahlungen in der Hauptsaison (August-September) dauern eventuell ein paar Tage länger. Wenn deine Rückzahlung länger dauert als erwartet, fasst unser Team direkt beim ATO nach.

## Was ist der typische Rückzahlungszeitplan?

Wenn wir deine Steuererklärung einreichen:

- Tag 0: Steuererklärung elektronisch eingereicht
- Tag 1-3: ATO erhält sie und beginnt mit der Bearbeitung
- Tag 7-14: Die meisten Rückzahlungen werden auf dein Bankkonto freigegeben
- Tag 14-21: Langsamere Steuererklärungen (Hauptsaison oder komplexe Fälle) freigegeben

In ruhigeren Zeiten (Oktober-Juni) kommen Rückzahlungen oft innerhalb von ein paar Werktagen an. In Hauptzeiten (Juli-September) sind die Bearbeitungszeiten etwas länger, weil das ATO die größte Menge an Steuererklärungen bearbeitet.

## Was beeinflusst, wie schnell du deine Rückzahlung bekommst?

Die Hauptfaktoren:

- **Einreichungsmethode**: elektronisch über einen Steueragenten ist am schnellsten (Papiersteuererklärungen dauern 8+ Wochen)
- **Zeitpunkt im Jahr**: Anfang Juli oder nach Mitte September einreichen ist die schnellste Bearbeitung
- **Abschluss des Income Statements**: das Einreichen vor abgeschlossenen Arbeitgebermeldungen verlangsamt die Bearbeitung
- **Identitätsprüfung**: Erstmalige Einreicher müssen eventuell zusätzliche Prüfungen durchlaufen
- **Diskrepanzen**: wenn deine Steuererklärung nicht mit ATO-Aufzeichnungen übereinstimmt, kommt eine manuelle Prüfung hinzu
- **Bankverbindung**: falsche BSB-/Kontonummern verursachen erhebliche Verzögerungen

Wir warten stets, bis die Arbeitgebermeldungen steuerbereit sind (nach dem 14. Juli), und prüfen die Bankverbindung doppelt vor der Einreichung, um diese Verzögerungen zu vermeiden.

## Wie prüfst du deinen Rückzahlungsstatus?

Wenn du über uns einreichst:

- Wir überwachen den ATO-Bearbeitungsstatus
- Wir benachrichtigen dich, wenn die Steuererklärung abgeschlossen ist
- Wir bestätigen, wenn die Rückzahlung freigegeben wird
- Wir fassen beim ATO nach, falls sich etwas verzögert

Du musst nicht selbst das ATO-Portal prüfen. Wir halten dich während des gesamten Prozesses auf dem Laufenden.

## Was, wenn deine Rückzahlung länger dauert als erwartet?

Wenn 28 Tage ohne Zahlung vergangen sind, kontaktiere unser Team:

- Wir prüfen den Status direkt über unser Steueragentenportal
- Wir identifizieren, wo die Steuererklärung feststeckt
- Wir lösen jedes Problem mit dem ATO für dich
- Wir bestätigen, wann die Zahlung freigegeben wird

Häufige Gründe für Verzögerungen, die wir lösen können:

- Bankverbindungen, die aktualisiert werden müssen
- Identitätsprüfungsanfragen
- Diskrepanzen, die geklärt werden müssen
- Manuelle Prüfung größerer Rückzahlungen

[Kontaktiere uns](/de/contact), wenn deine Rückzahlung sich verzögert, und wir untersuchen das.

## Was ist mit Rückzahlungen nach dem Verlassen Australiens?

Wenn du Australien verlassen und aus dem Ausland eingereicht hast:

- Die Rückzahlung wird auf dein angegebenes australisches Bankkonto überwiesen
- Derselbe Zeitplan gilt (die meisten innerhalb von 2 Wochen)
- Wenn dein australisches Konto jetzt geschlossen ist, können wir alternative Zahlung arrangieren

Halte dein australisches Bankkonto mindestens 4-6 Wochen nach der Einreichung offen, um sicherzustellen, dass die Rückzahlung gutgeschrieben wird, bevor du es schließt.
 
## Verfolge deine Erstattung in Echtzeit

In myGov: ATO, Manage tax returns - die Status laufen In progress, Processing, Issued. "Under review" heißt manuelle Prüfung: meist ausgelöst durch Residency-Antworten, fehlende Einkommen oder geänderte Bankdaten. Erstattungen fließen nur auf Bankkonten (australische bevorzugt; internationale Überweisungen kann die ATO schlecht) - ein geschlossenes Konto ist Ursache Nummer eins für "wo bleibt mein Geld": Die Zahlung springt zurück und liegt als ATO-Guthaben, bis du neue Kontodaten lieferst.
`,
  },

  'transferring-money-overseas-australia-tax': {
    title: 'Zahlst du Steuern, wenn du Geld aus Australien überweist?',
    description: 'Du schickst deine Ersparnisse nach Hause, bevor du Australien verlässt? Hier erfährst du, was Working Holiday Maker über internationale Überweisungen wissen müssen.',
    body: `
Nein, Geld aus Australien zu überweisen erzeugt an sich keine Steuerpflicht. Die Übertragung von Mitteln von deinem australischen Bankkonto auf ein Konto in deinem Heimatland ist eine Geldbewegung, kein Einkommen. Das ATO besteuert dich nicht dafür, Geld zu bewegen. Was steuerlich zählt, ist das Einkommen, das du in Australien verdient hast - und das ist im Jahr des Erhalts steuerpflichtig, unabhängig davon, wo du es letztendlich ausgibst. Erledige deine Steuerangelegenheiten und die Superauszahlung, bevor du alles nach Hause überweist und dein australisches Konto schließt.

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
- Eventuelles Contractoreinkommen unter einer [ABN](/de/abn)
- Investmenteinkommen aus australischen Vermögenswerten
- Trinkgelder und anderes Anstellungseinkommen
- Schwarzarbeit (ja, weiterhin steuerpflichtig)

Wenn wir deine [Steuererklärung](/de/tax-return) einreichen, geben wir dein Einkommen an und berechnen die fällige Steuer gegen das, was einbehalten wurde. Das Ergebnis ist entweder eine Rückzahlung oder eine Steuerrechnung. Sobald das geklärt ist, liegt es bei dir, was du mit dem Nettobetrag machst (in Australien ausgeben, nach Hause überweisen, auf deinem Konto halten).

## Musst du große internationale Überweisungen melden?

Es gelten zwei separate Regeln:

**Für Bargeld über 10.000 $ AUD:**
- Muss am Flughafen bei der Australian Border Force angemeldet werden
- Anforderung zur Geldwäschebekämpfung, keine Steueranforderung
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

Ein Steuerberater in deinem Heimatland ist der richtige Ansprechpartner für Heimatlandpflichten. Viele Heimatländer behandeln australische Working-Holiday-Einkünfte anders als reguläres Auslandseinkommen.

## Was ist die richtige Reihenfolge vor dem Verlassen Australiens?

Die zu befolgende Reihenfolge:

1. Reiche deine australische [Steuererklärung](/de/tax-return) ein (unser Team kümmert sich darum)
2. Beantrage deine [Superauszahlung](/de/blog/what-is-dasp-super-withdrawal) über DASP
3. Kündige eine eventuelle [ABN](/de/abn), die du registriert hast
4. Warte, bis deine Steuerrückerstattung und Superzahlung auf deinem australischen Konto ankommen
5. Überweise alles nach Hause
6. Schließe dein australisches Bankkonto

Diese Schritte zu überspringen oder umzuordnen verursacht Komplikationen. Das Bankkonto zu früh zu schließen ist der häufigste Fehler - deine Steuerrückerstattung und Superzahlung haben dann nirgendwo hin.

## Was ist mit Geld, das du nach Australien gebracht hast?

Geld, das du bei deiner Ankunft mitgebracht hast, ist nicht steuerpflichtig:

- Vorhandene Ersparnisse aus deinem Heimatland gehören dir
- Sie einzuführen ist kein Einkommen
- Manche davon wieder rauszuüberweisen ist kein steuerlicher Vorgang

Was steuerpflichtig ist, ist alles, was du während deines Aufenthalts in Australien verdient hast. Die Unterscheidung ist zwischen dem, was du hier verdient hast (steuerpflichtig), und dem, was du mitgebracht oder als Ersparnisse hältst (nicht steuerpflichtig).

[Kontaktiere unser Team](/de/contact), um deine australische Steuererklärung unter Aufsicht eines registrierten Steueragenten einzureichen und sicherzustellen, dass jede Rückzahlung, die dir zusteht, beantragt wird.
 
## Das Überweisungs-Playbook vor dem Rückflug

Die Reihenfolge zählt mehr als die Steuer (dein versteuerter Lohn transferiert steuerfrei): Erstens, das australische Konto OFFEN lassen - Steuererstattung und DASP landen dort Monate nach der Abreise, und eine Neueröffnung aus Deutschland ist mühsam. Zweitens, Transferwege am echten Kurs vergleichen: Banken werben mit niedrigen Gebühren und verstecken die Marge im Wechselkurs; Transferdienste liefern bei vierstelligen Summen meist spürbar mehr Euro. Drittens, AUSTRAC-Sichtbarkeit einplanen: Transfers werden gemeldet (ab 10.000 $ routinemäßig - und Stückelung zur Vermeidung ist selbst strafbar). Sichtbarkeit ist keine Besteuerung; ehrliches Lohngeld reist frei. Und die [finale Steuererklärung](/de/blog/tax-obligations-after-leaving-australia) existiert unabhängig davon, wo das Geld inzwischen liegt.
`,
  },

  'low-income-tax-offset-working-holiday': {
    title: 'Was ist der Low Income Tax Offset und können Working Holiday Maker ihn beantragen?',
    description: 'Der Low Income Tax Offset kann deine Steuer um bis zu 700 $ pro Jahr reduzieren. Hier erfährst du, wer qualifiziert, wie es berechnet wird und wie du es beantragst.',
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

Der Offset wird auf normalen Steuererklärungen für Residenten automatisch angewendet. Für Working Holiday Maker ist die Situation nuancierter.

## Wie viel LITO ist bei verschiedenen Einkommensniveaus verfügbar?

Für das Steuerjahr 2025-26:

- Einkommen bis 37.500 $: voller Offset von 700 $
- Einkommen 37.501 - 45.000 $: mit schrittweiser Reduzierung
- Einkommen 45.001 - 66.667 $: weitere Reduzierung
- Einkommen über 66.667 $: kein LITO

Die genaue Berechnung der Reduzierung beinhaltet komplexe Schwellen. Wenn wir deine Steuererklärung vorbereiten, wenden wir den korrekten Betrag basierend auf deiner spezifischen Situation an.

## Können Working Holiday Maker LITO beantragen?

Die Situation hängt ab von:

- Deinem spezifischen Einkommensniveau
- Deinem Residenzstatus für das Steuerjahr
- Wie die Working-Holiday-Maker-Regeln mit dem Offset interagieren
- Ob du Nicht-WHM-Einkommen hattest

Das ist einer der komplexeren Aspekte der Working-Holiday-Maker-Steuer. Manche Working Holiday Maker können einen teilweisen LITO beantragen, manche nicht. Die Regeln haben sich mehrfach geändert und entwickeln sich weiter.

Wenn wir deine Steuererklärung vorbereiten, prüfen wir die LITO-Berechtigung basierend auf deinen spezifischen Umständen und wenden alles an, worauf du Anspruch hast. Wenn man ohne Steueragenten einreicht, werden berechtigte Offsets oft übersehen.

## Was ist der Unterschied zwischen einem Offset und einer Absetzung?

Diese Unterscheidung ist wichtig und wird oft verwechselt:

**Absetzung**: reduziert dein zu versteuerndes Einkommen
- 30.000 $ verdienen, 1.000 $ Absetzung beantragen → besteuert, als hättest du 29.000 $ verdient
- Reduziert Steuer um deinen Grenzsteuersatz × Absetzung (z.B. 150 $ bei 15 % gespart)

**Offset**: reduziert die geschuldete Steuer
- 4.500 $ Steuer geschuldet, 700 $ Offset → zahle 3.800 $
- Reduziert Steuer Dollar für Dollar (die vollen 700 $)

Offsets sind generell wertvoller als Absetzungen desselben Dollarbetrags. Ein 700 $-LITO reduziert deine Steuer um 700 $, während eine 700 $-Absetzung nur 105 $ spart (zum 15 %-Satz).

## Kann LITO mit anderen Offsets kombiniert werden?

Ja. Mehrere Offsets können auf eine Steuererklärung angewendet werden:

- LITO: basierend auf Gesamteinkommen
- [Small Business Tax Offset](/de/blog/small-business-tax-offset-working-holiday-abn): für ABN-Einkommen
- Medicare-Levy-Befreiung: für Nichtmedicare-berechtigte Arbeiter

Jeder wird separat berechnet und angewendet, um die zahlbare Gesamtsteuer zu reduzieren. Wir wenden jeden relevanten Offset beim Vorbereiten deiner Steuererklärung an.

## Was passiert, wenn LITO deine Steuer unter null reduzieren würde?

LITO ist nicht erstattungsfähig:

- Wenn deine geschuldete Steuer 500 $ und LITO 700 $ ist, wird deine Steuer 0 $
- Die verbleibenden 200 $ LITO werden NICHT an dich erstattet
- Deine Gesamtrückzahlung kommt aus der PAYG-Steuer, die während des Jahres einbehalten wurde

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
    description: 'Australische Arbeitgeber müssen 12 % deiner Bruttoeinkünfte als Super einzahlen. Hier erfährst du, wie du prüfst, ob du den korrekten Betrag bekommst.',
    body: `
Dein Arbeitgeber sollte ab 2026 12 % deiner regulären Arbeitseinkünfte (Ordinary Time Earnings) in deinen Superfonds einzahlen. Der Satz stieg am 1. Juli 2025 von 11,5 % auf 12 % und ist bei 12 % geblieben. [Super](/de/superannuation) wird zusätzlich zu deinem Lohn gezahlt, nicht davon abgezogen. Der einfachste Weg, zu prüfen, ob deine Super korrekt gezahlt wird, ist, dein Superfondskonto direkt zu prüfen. Wenn Beiträge fehlen oder falsch sind, kann unser Team helfen, unbezahlte Super für dich zurückzuholen.

## Was zählt als Ordinary Time Earnings?

Ordinary Time Earnings (OTE) bilden die Basis für Superbeiträge:

- Regulärer Lohn für reguläre Arbeitsstunden
- Manche Zulagen (je nach Art)
- Provisionen, Boni und Loadings (in den meisten Fällen)
- Urlaubsgeld (in den meisten Fällen)

**Nicht** in OTE enthalten:

- Überstundenzahlungen
- Erstattungen von Ausgaben
- Echte Abfindungszahlungen

Für die meisten Working Holiday Maker, die Standardschichten arbeiten, gilt die 12 % auf den Kern dessen, was du in jeder Lohnperiode verdienst.

## Wie kannst du prüfen, ob deine Super gezahlt wird?

Es gibt zwei zuverlässige Wege:

1. **Prüfe deinen Superfonds direkt**: Logge dich in dein Fondskonto online ein und schau dir die Beitragshistorie an. Jeder Arbeitgeberbeitrag sollte mit Datum und Betrag erscheinen.
2. **Gleiche mit deinem Lohnzettel ab**: dein Lohnzettel zeigt den Superbeitrag als Posten. Vergleiche ihn mit dem, was in deinem Fonds angekommen ist.

Super wird von den meisten Arbeitgebern vierteljährlich gezahlt, nicht wöchentlich mit deinem Lohn. Die Fristen:

- Q1 (Jul-Sep) → bis 28. Oktober gezahlt
- Q2 (Okt-Dez) → bis 28. Januar gezahlt
- Q3 (Jan-Mär) → bis 28. April gezahlt
- Q4 (Apr-Jun) → bis 28. Juli gezahlt

Ein Beitrag für Juli erscheint also möglicherweise erst Ende Oktober in deinem Fonds.

Wenn du nicht weißt, welcher Fonds deine Super verwaltet, [kontaktiere unser Team](/de/contact). Wir finden Konten in mehreren Fonds und können bestätigen, was für dich gezahlt wurde.

## Was, wenn dein Arbeitgeber Super nicht korrekt zahlt?

Wenn Beiträge fehlen, zu spät kommen oder unter dem erforderlichen Satz liegen, muss das Problem vor deiner Abreise aus Australien geklärt werden:

- Prüfe zunächst [die Beiträge in deinem Fonds](#wie-kannst-du-prüfen-ob-deine-super-gezahlt-wird)
- Vergleiche mit der Superzeile auf deinen Lohnzetteln
- Sprich mit deinem Arbeitgeber, falls eine klare Diskrepanz vorliegt (es kann sich um einen Verwaltungsfehler handeln)
- Bei ungeklärten Fällen kann unser Team die unbezahlte Super über den Superannuation Guarantee Charge (SGC)-Prozess verfolgen

Die SGC ist ein formaler Erstattungsmechanismus. Wir haben Working Holiday Makern geholfen, auf diesem Weg Tausende Dollar an unbezahlter Super zurückzubekommen. [Schick uns deine Daten](/de/contact) mit deinen Lohnzetteln und Superstatements und wir prüfen es.

## Welche Unterlagen solltest du aufbewahren?

Um einen Superrückforderungsanspruch zu unterstützen:

- Alle Lohnzettel, die Superposten zeigen
- Die Beitragsaufzeichnungen deines Superfonds
- Beschäftigungsdaten und Wochenstunden
- Lohnsätze und Bruttoverdienste
- Arbeitgebername und ABN

Je vollständiger die Unterlagen, desto einfacher der Erstattungsprozess.
 
## Das 90-Sekunden-Super-Audit

Öffne die Fonds-App und prüfe gegen diese Regel: 12 % des regulären Lohns, mindestens quartalsweise (28 Tage nach Quartalsende - also 28. Oktober, 28. Januar, 28. April, 28. Juli). 8.000 $ im Quartal verdient? 960 $ müssen bis zur Frist erscheinen. Übliche Lücken: Super nur auf Basisstunden statt inklusive pflichtiger Zuschläge, Beiträge monatelang "pending", oder gar nichts vom bargeldlastigen Arbeitgeber. Fehlt Geld: erst schriftlich an die Lohnbuchhaltung - dann die [Meldung unbezahlter Super an die ATO](/de/blog/super-employer-not-paying-what-to-do), die echte Vollstreckung auslöst.
`,
  },

  'what-is-dasp-super-withdrawal': {
    title: 'DASP: So holst du deine Super nach der Abreise zurück',
    description: 'Mit dem Departing Australia Superannuation Payment holst du dein Super-Guthaben nach Visa-Ende zurück. Voraussetzungen, 65 % Steuer, Dauer und Antrag.',
    body: `
DASP (Departing Australia Superannuation Payment) ist der offizielle Prozess, den Working Holiday Maker und andere temporäre Visuminhaber nutzen, um ihre angesparte australische Super nach dem Verlassen des Landes abzuheben. Um zu beantragen, muss dein Visum abgelaufen oder gekündigt sein, und du musst außerhalb Australiens sein. Der DASP-Quellensteuersatz für Working Holiday Maker beträgt 65 % der steuerpflichtigen Komponente. Unser Team kümmert sich um DASP-Anträge von Anfang bis Ende - vom Finden deiner Superkonten bis zum Erhalt der Zahlung.

## Wer kann DASP beantragen?

Um für DASP berechtigt zu sein, musst du:

- Ein temporäres australisches Visum gehalten haben (Working Holiday Visa Subclass 417 und 462 sind berechtigt)
- Australien dauerhaft verlassen haben (oder zumindest ohne unmittelbare Pläne, mit demselben Visum zurückzukehren)
- Dein Visum nach der Abreise abgelaufen oder gekündigt haben
- Super in einem australischen Superfonds haben oder beim ATO

Du kannst generell nicht beantragen, solange du noch in Australien mit gültigem Working Holiday Visum bist. Der Antrag muss gestellt werden, nachdem du abgereist bist und dein Visum geendet hat.

## Wie beantragst du DASP?

Unser Team kümmert sich um den gesamten DASP-Antrag für dich:

1. [Schick uns deine Daten](/de/superannuation): TFN, Reisepass, Visadaten, Beschäftigungs-Historie
2. Wir finden alle deine Superkonten (über mehrere Fonds hinweg, falls nötig)
3. Wir bereiten den DASP-Antrag vor und reichen ihn für dich ein
4. Der Superfonds verifiziert deine Daten und gibt die Zahlung frei
5. Die Mittel werden auf dein angegebenes Bankkonto überwiesen (weltweit)

Falls deine Super in mehreren Fonds war, reichen wir separate DASP-Anträge für jeden ein. Alternativ können wir deine Super vor dem Antrag in einem Fonds zusammenführen, um den Prozess zu vereinfachen.

## Wie lange dauert die Bearbeitung von DASP?

Die meisten DASP-Anträge werden innerhalb von 28 Tagen bearbeitet:

- Manche Anträge gehen schneller durch, manchmal innerhalb von zwei Wochen
- Komplexe Fälle (mehrere Fonds, Identitätsprüfungsprobleme) können länger dauern
- Der Fonds verifiziert deine Daten, das ATO bestätigt deinen Visastatus, dann wird die Zahlung freigegeben

Wenn 28 Tage ohne Zahlung vergehen, fragt unser Team beim Antrag direkt nach. Du musst nicht selbst beim Fonds oder beim ATO nachfragen.

## Wie viel bekommst du aus DASP?

Deine DASP-Auszahlung hängt ab von:

- Den Gesamtbeiträgen deiner Arbeitgeber (12 % deiner Einkünfte während deines Aufenthalts)
- Den Anlagerenditen, die der Fonds auf diese Beiträge erwirtschaftet hat
- Der 65 %-DASP-Quellensteuer für Working Holiday Maker (auf die steuerpflichtige Komponente)

Der 65 %-Steuersatz ist hoch, aber die Alternative ist, die Super für immer zurückzulassen. Der Nettobetrag, auch nach Steuern, ist meistens immer noch eine bedeutende Summe (oft mehrere Tausend Dollar, je nachdem, wie lange du gearbeitet hast).

Siehe unseren Artikel zu [welche Steuer von deiner DASP abgezogen wird](/de/blog/tax-on-super-withdrawal-backpacker) für eine detaillierte Aufschlüsselung der Steuerberechnung.

[Kontaktiere unser Team](/de/contact), um deinen DASP-Antrag zu bearbeiten, jeden Superfonds mit deinen Beiträgen zu finden und deine Auszahlung im Ausland zu erhalten.
 
## DASP-Berechtigung: die Drei-Bedingungen-Checkliste

Am Antragstag muss alles drei gleichzeitig gelten: Super wurde auf einem berechtigten temporären Visum verdient (417 und 462 zählen), du hast Australien verlassen, und das Visum ist abgelaufen oder storniert. Die üblichen Blocker deutscher Antragsteller: ein formal noch aktives Visum (Stornierung lässt sich aus Deutschland beantragen und schaltet die Berechtigung frei), ein Bridging-Visum, das den Status still am Leben hält, oder die Rückkehr auf einem neuen Visum vor dem Antrag. Nichts davon ist endgültig - es ändert nur die Reihenfolge. Der Antrag läuft über das DASP-Portal der ATO oder einen Agenten, erfasst alle genannten Fonds plus ATO-verwahrte Beträge und zahlt nach der [65-%-Steuer](/de/blog/dasp-tax-rate-65-percent-explained) rund 35 Cent pro Dollar aus.
`,
  },

  'how-long-does-dasp-take': {
    title: 'Wie lange dauert DASP? Meist 28 Tage bis zur Auszahlung',
    description: 'Vollständige DASP-Anträge werden meist innerhalb von 28 Tagen ausgezahlt. Was Verzögerungen verursacht und wie du sie vermeidest.',
    body: `
Ein DASP (Departing Australia [Superannuation](/de/superannuation) Payment)-Antrag wird normalerweise innerhalb von 28 Tagen nach Einreichung bearbeitet. In vielen Fällen geht der Prozess schneller, besonders wenn deine Daten klar sind und der Superfonds alle Informationen hat, um deine Identität und Mitgliedschaft zu verifizieren. Unser Team überwacht jeden DASP-Antrag, den wir einreichen, und fragt bei Verzögerungen direkt beim Fonds nach.

## Was passiert, nachdem du einen DASP-Antrag eingereicht hast?

Der Prozess nach der Einreichung:

1. Das ATO verifiziert deine Visa- und Aufenthaltsinformationen
2. Der Antrag wird an deinen Superfonds weitergeleitet
3. Der Fonds verifiziert deine Mitgliedschaftsdaten und Identität
4. Der Fonds berechnet den auszahlbaren Betrag und zieht die 65 %-DASP-Steuer ab
5. Die Nettozahlung wird auf dein angegebenes Bankkonto freigegeben

Jede Phase dauert meistens ein paar Werktage. Die Gesamtdauer hängt davon ab, wie schnell der Fonds seine Seite bearbeitet.

## Was kann DASP-Verzögerungen verursachen?

Die häufigsten Verzögerungsursachen:

- **Namensabweichung**: der Name auf deinem Antrag stimmt nicht genau mit dem überein, den dein Superfonds gespeichert hat
- **Geburtsdatumabweichung**: ein Tippfehler oder Formatunterschied
- **Adressdiskrepanzen**: Adressen unterschiedlich über Systeme hinweg gespeichert
- **Antrag vor Visumsablauf**: DASP-Anträge mit noch gültigem Working Holiday Visum werden meistens abgelehnt
- **Mehrere Mitgliedsnummern in einem Fonds**: selten, kommt aber bei sehr großen Fonds vor

Wenn du über unseren Service einreichst, gleichen wir jedes Detail mit den Fondsdaten vor der Einreichung ab - so vermeidest du die meisten dieser Probleme von Anfang an.

## Was, wenn 28 Tage ohne Zahlung vergehen?

Wenn dein DASP-Antrag länger dauert als erwartet:

- Unser Team prüft den Status direkt beim Fonds und beim ATO
- Wir identifizieren, in welcher Phase der Antrag feststeckt
- Wir fragen für dich nach und lösen Verifizierungsprobleme
- Du musst nicht selbst den Fonds oder das ATO kontaktieren

[Kontaktiere uns](/de/contact) jederzeit, wenn du ein Statusupdate zu deinem Antrag möchtest.

## Was, wenn du für mehrere Fonds beantragt hast?

Wenn du Super in mehreren Fonds hattest und wir separate DASP-Anträge für jeden eingereicht haben:

- Jeder Antrag hat seinen eigenen unabhängigen Zeitplan
- Ein Fonds zahlt eventuell schneller aus als ein anderer
- Wir verfolgen die Referenznummer jedes Antrags für dich
- Wir benachrichtigen dich, sobald jede Zahlung freigegeben wird

Die Gesamtzeit von der ersten Einreichung bis zur letzten Zahlung beträgt meistens vier bis sechs Wochen, gelegentlich länger, wenn ein Fonds bei der Verifizierung langsam ist.

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
    title: 'Welche Länder haben ein Medicareabkommen mit Australien?',
    description: '11 Länder haben ein Sozialversicherungsabkommen (RHCA) mit Australien. Folgende Dokumente sind nötig und was die Abkommen abdecken. Deutschland ist nicht dabei.',
    body: `
Australien hat Sozialversicherungsabkommen (Reciprocal Health Care Agreements, RHCAs) mit 11 Ländern: Großbritannien, Republik Irland, Neuseeland, Schweden, Niederlande, Finnland, Norwegen, Belgien, Slowenien, Malta und Italien. Bürger dieser Länder mit gültigem Working Holiday Visum haben eventuell Anspruch auf begrenzte Medicare-Leistungen während ihres Aufenthalts. **Deutschland ist NICHT auf der Liste.** Bürger aller anderen Länder - auch Deutsche - sind nicht für Medicare berechtigt und sind auf eine private Krankenversicherung angewiesen.

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
- Hausarztbesuche zum von Medicare bezuschussten Satz
- Manche öffentliche Krankenhausbehandlungen
- Manche verschreibungspflichtige Medikamente zum PBS-bezuschussten Satz

Was **nicht** abgedeckt ist:

- Vorerkrankungen in den meisten Fällen
- Zahnbehandlungen
- Optometrie und Brillen
- Die meisten Facharztbesuche
- Private Krankenhausbehandlungen
- Krankenwagendienste in den meisten Bundesstaaten
- Kosmetische oder Wahleingriffe

Die spezifischen Ansprüche variieren zwischen den Abkommen. Sogar mit RHCA ist eine umfassende private Krankenversicherung meistens eine gute Idee.

## Wie meldest du dich bei Medicare unter einem RHCA an?

Wenn dein Land ein RHCA mit Australien hat, erfolgt die Anmeldung persönlich in einem Services-Australia-Büro (früher als Centrelink/Medicare-Büro bekannt). Du brauchst:

- Deinen Reisepass
- Dein Working Holiday Visum (elektronische Bestätigung oder Grant Letter)
- Nachweis der Staatsbürgerschaft im RHCA-Land (falls nicht identisch mit deinem Reisepassland)

Du bekommst eine Medicare-Karte, mit der du Zugang zu den abgedeckten Leistungen hast. Die Karte ist für die Dauer deines berechtigenden Visums gültig.

## Was bedeutet ein RHCA für die Medicare Levy?

Wenn du bei Medicare unter einem RHCA angemeldet bist, wird die Medicare-Levy-Behandlung komplexer:

- Du hast eventuell keinen Anspruch auf die volle 2 %-Befreiung
- Es kann eine teilweise Befreiung gelten, abhängig vom Anmeldestatus und der Zeit in Australien
- Die Regeln sind nuanciert und hängen von deinen spezifischen Umständen ab

Wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten, finden wir die korrekte Medicare-Levy-Position für deine spezifische Situation. Manche bei einem RHCA Angemeldete erhalten die volle Befreiung, manche eine teilweise, manche gar keine. Die richtige Antwort hängt von Faktoren wie den Daten deiner Medicare-Anmeldung und den Abkommensbedingungen ab.

**Für Deutsche ist die Antwort einfach:** Da Deutschland kein RHCA hat, hast du automatisch Anspruch auf die volle Medicare-Levy-Befreiung.

[Kontaktiere unser Team](/de/contact) vor dem Einreichen, falls du unsicher über deinen Medicare-Levy-Anspruch bist.
 
## Was RHCA-Deckung enthält (und was nicht) - und wo Deutschland steht

Zur Einordnung für deutsche Leser: Deutschland steht NICHT auf der Abkommensliste - die folgenden Leistungen gelten für Briten, Iren, Italiener und die anderen Abkommensländer, nicht für dich. RHCA-Deckung heißt medizinisch notwendige Behandlung als öffentlicher Patient: Hausarzt mit Medicare-Rabatt, öffentliche Notaufnahme, subventionierte PBS-Rezepte. Nicht enthalten: Krankenwagen (mehrere hundert Dollar pro Einsatz), Zahnarzt, Physio, alles Elektive. Für Deutsche bedeutet das: [eigene Versicherung ist Pflicht](/de/blog/german-european-health-insurance-australia-working-holiday), dafür winkt die [Levy-Befreiung](/de/blog/medicare-levy-working-holiday-makers) bei der Steuer - der eine Vorteil der Nicht-Abdeckung.
`,
  },

  'tax-file-number-declaration-form': {
    title: 'Was ist ein TFN Declaration-Formular und wie füllst du es aus?',
    description: 'Das TFN-Declaration-Formular ist eines der wichtigsten Dokumente, die du in Australien ausfüllst. Hier erfährst du, was die einzelnen Abschnitte bedeuten.',
    body: `
Ein TFN Declaration-Formular ist das Formular, das du ausfüllst und deinem Arbeitgeber gibst, wenn du in Australien einen neuen Job anfängst. Es sagt deinem Arbeitgeber deine TFN, deinen Steuerresidenzstatus und ob du einen Studienkredit hast. Der Arbeitgeber nutzt diese Informationen, um deinen Steuersatz zu bestimmen. Für Working Holiday Maker sind die kritischen Antworten: wähle "Working Holiday Maker" für die Residenz und "Nein" für den Freibetrag. Das Formular richtig auszufüllen stellt sicher, dass der korrekte 15 %-Satz ab deinem ersten Lohnzettel angewendet wird.

## Warum ist das TFN Declaration-Formular wichtig?

Ohne dieses Formular kann dein Arbeitgeber nicht den korrekten Steuersatz anwenden:

- Standardeinbehaltung ohne das Formular: 45 % (der höchste Satz)
- Korrekte Einbehaltung für Working Holiday Maker: 15 %
- Der Unterschied beträgt 320 $ pro Woche bei 1.000 $ Einkommen
- Das zu viel Gezahlte holst du erst zur Steuerzeit zurück - Monate später

Das Formular zügig einzureichen, wenn du anfängst zu arbeiten, ist eines der wichtigsten Dinge, die du tun kannst, damit deine Bezahlung von Tag eins an korrekt ist.

## Wie sollten Working Holiday Maker das Formular ausfüllen?

Die kritischen Abschnitte für Working Holiday Maker:

- **Vollständiger Name, Geburtsdatum, Adresse**: persönliche Daten (nutze deine australische Adresse)
- **TFN**: deine 9-stellige Tax File Number eintragen
- **Residency**: **Working Holiday Maker** wählen (nicht Australian Resident, nicht Foreign Resident)
- **Tax-free threshold**: **No** wählen (der Freibetrag ist für Residenten, nicht für Working Holiday Maker)
- **HELP/VSL debt**: meistens **No** für Working Holiday Maker (außer du hast einen australischen Studienkredit)
- **Andere Fragen**: ehrlich nach deinen Umständen ausfüllen

Die Working-Holiday-Maker-Auswahl löst den 15 %-Satz aus. "Foreign Resident" versehentlich zu wählen führt dazu, dass 30 % angewendet werden. "Australian Resident" und "Ja" zum Freibetrag zu wählen führt zum falschen Satz plus einer zukünftigen Steuerschuld.

## Wo erhältst du das Formular?

Das Formular wird von deinem Arbeitgeber gestellt:

- Dein Arbeitgeber sollte dir eine Kopie aushändigen, wenn du anfängst
- Manche Arbeitgeber stellen es digital über ihr Onboarding-System bereit
- Manche verwenden eine gedruckte Papierversion

Sobald du es ausgefüllt hast, gibst du es deinem Arbeitgeber zurück (nicht ans ATO). Er bewahrt es auf und nutzt es, um deine Lohnabrechnung einzurichten.

## Was, wenn du deine TFN noch nicht hast?

Du kannst trotzdem anfangen zu arbeiten ohne deine TFN, aber die temporäre Einrichtung muss angepasst werden:

1. Beantrage deine [TFN](/de/tfn) sofort, falls noch nicht geschehen
2. Zeig deinem Arbeitgeber die TFN-Antragsreferenznummer
3. Fülle das TFN Declaration-Formular mit der Referenznummer aus
4. Aktualisiere das Formular mit deiner tatsächlichen TFN, sobald sie ankommt (innerhalb von 28 Tagen)

Bis deine TFN hinterlegt ist, kann der 45 %-Satz gelten. Siehe unseren Artikel zu [TFN-Referenznummern](/de/blog/tfn-reference-number-before-tfn-arrives) für was in der Zwischenzeit zu tun ist.

## Was ist mit einem neuen Job?

Jeder neue Arbeitgeber braucht sein eigenes TFN Declaration-Formular:

- Deine TFN überträgt sich nicht automatisch zwischen Arbeitgebern
- Ein vorheriger Arbeitgeber, der dein Formular hält, deckt den neuen nicht ab
- Fülle für jeden Job ein neues Formular aus, einschließlich Casualrollen

Wenn du schon in einem neuen Job angefangen hast und das Formular falsch ausgefüllt wurde, reich ein korrigiertes Formular bei deinem Arbeitgeber ein. Er aktualisiert die Lohnabrechnung ab dann, und die zu viel gezahlte Steuer wird über deine [Steuererklärung](/de/tax-return) zurückgeholt.

## Was, wenn du vermutest, dass dein Formular falsch ausgefüllt wurde?

Wenn dein Lohnzettel Einbehaltung mit 45 %, 30 % oder einem anderen Satz als 15 % zeigt, wurde das Formular eventuell falsch ausgefüllt:

1. Vergleich deine Kopie des Formulars mit den korrekten Antworten oben
2. Reich ein korrigiertes Formular bei deinem Arbeitgeber ein
3. [Kontaktiere unser Team](/de/contact), um deine Einbehaltung zu prüfen und zu viel gezahlte Beträge über deine Steuererklärung zurückzuholen
 
## Die drei Fragen, die deinen Steuersatz setzen

Alles andere auf der Erklärung ist Identifikation; diese drei setzen das Geld: **"Are you an Australian resident for tax purposes?"** - die meisten Backpacker antworten No ([Residency erklärt](/de/blog/tax-residency-working-holiday-makers)). **"Are you a working holiday maker?"** - Yes, das ist der Schalter für die 15 %. **"Do you want to claim the tax-free threshold?"** - die Falle: WHM-Sätze kennen keinen Freibetrag, und [die falsche Antwort baut eine Steuerschuld](/de/blog/tax-free-threshold-working-holiday-visa). Diese drei korrekt, und der Abzug stimmt ab dem ersten Payslip.
`,
  },

  'what-does-tax-withheld-mean-payslip': {
    title: 'Tax Withheld auf dem Payslip: Werden korrekt 15 % abgezogen?',
    description: 'Auf den ersten 45.000 $ sollten 15 % einbehalten werden. So liest du deinen Payslip, erkennst zu hohe Abzüge und holst dir die Steuern zurück.',
    body: `
"Tax withheld" auf deinem Lohnzettel ist die Einkommensteuer, die dein Arbeitgeber von deinem Bruttolohn abzieht, bevor er dir den Nettobetrag zahlt. Es ist die PAYG-Einbehaltung, die im Auftrag des ATO gesammelt wird. Für Working Holiday Maker ist der korrekte Einbehaltungssatz 15 % deines Bruttoeinkommens bis 45.000 $. Du kannst es prüfen, indem du die einbehaltene Steuer durch den Bruttolohn teilst - das Ergebnis sollte ungefähr 0,15 sein. Wenn es 30 % oder 45 % zeigt, wurde dein TFN Declaration-Formular falsch ausgefüllt.

## Was ist "tax withheld" auf deinem Lohnzettel?

Jeder australische Lohnzettel sollte drei Schlüsselwerte zeigen:

- **Gross pay** (Bruttolohn): Gesamteinkommen vor Abzügen
- **Tax withheld** (einbehaltene Steuer): als PAYG-Einbehaltungssteuer abgezogener Betrag
- **Net pay** (Nettolohn): was tatsächlich auf dein Bankkonto geht

Die einbehaltene Steuer ist der Betrag, den dein Arbeitgeber im Auftrag des ATO als Vorauszahlung auf deine jährliche Steuerschuld zahlt. Sie wird abgeglichen, wenn du deine jährliche Steuererklärung einreichst.

## Wie kannst du prüfen, ob die einbehaltene Steuer korrekt ist?

Für Working Holiday Maker mit deiner [TFN](/de/tfn) hinterlegt und korrekt ausgefülltem Formular:

- Teile die einbehaltene Steuer durch den Bruttolohn
- Das Ergebnis sollte ungefähr 0,15 (15 %) sein

Beispiele:

- Bruttolohn 1.000 $ → einbehaltene Steuer sollte etwa 150 $ sein
- Bruttolohn 1.500 $ → einbehaltene Steuer sollte etwa 225 $ sein
- Bruttolohn 2.000 $ → einbehaltene Steuer sollte etwa 300 $ sein

Wenn das Ergebnis deutlich anders ist als 15 %, stimmt etwas nicht.

## Was kann falsche Einbehaltung verursachen?

Häufige Gründe für falschen Satz:

- **45 % einbehalten**: TFN Declaration-Formular noch nicht erhalten oder bearbeitet
- **30 % einbehalten**: Arbeitgeber nicht als Arbeitgeber von Working Holiday Makern registriert (nutzt den Standard-Foreign-Resident-Satz)
- **19 % oder weniger**: Freibetrag fälschlich beansprucht (das verursacht eine Steuerschuld am Jahresende)
- **Keine Steuer einbehalten**: Schwarzarbeit oder PAYG-Einrichtung wurde komplett übergangen

Wenn dein Lohnzettel den falschen Satz zeigt, [kontaktiere unser Team](/de/contact). Wir finden heraus, was hätte einbehalten werden sollen, und holen jeden überhöhten Satz über deine [Steuererklärung](/de/tax-return) zurück.

## Was passiert mit der einbehaltenen Steuer?

Die einbehaltenen Beträge fließen ans ATO:

- Dein Arbeitgeber sammelt einbehaltene Steuer aus jedem Lohn
- Er überweist sie periodisch ans ATO (meistens vierteljährlich)
- Am Jahresende schließt er die Summe ab, gemeldet als dein Income Statement
- Deine Steuererklärung gleicht die gesamte einbehaltene Steuer gegen deine tatsächliche Schuld ab
- Die Differenz wird erstattet oder geschuldet

## Warum du deine Lohnzettel aufbewahren solltest

Speichere jeden Lohnzettel im Laufe des Jahres:

- Erlaubt dir, dein Income Statement zur Steuerzeit zu verifizieren
- Löst Diskrepanzen zwischen dem, was gezahlt wurde, und dem, was das ATO hat
- Dokumentiert Superposten separat von der Steuer
- Stützt jeden Unterzahlungs- oder Steueranspruch
- Nützlich, falls die Aufzeichnungen deines Arbeitgebers unvollständig sind, wenn wir deine Steuererklärung vorbereiten

Die meisten modernen Lohnsysteme schicken Lohnzettel automatisch per E-Mail. Richte einen E-Mailordner ein, um sie organisiert zu halten.
 `,
  },

  // Work Rights
  'how-many-hours-can-you-work-on-whv': {
    title: 'Wie viele Stunden pro Woche darfst du mit einem Working Holiday Visum arbeiten?',
    description: 'Keine wöchentliche Stundenbegrenzung für Working Holiday Visa - aber maximal 6 Monate pro Arbeitgeber. Aktuelle Regeln für Subclass 417 und 462.',
    body: `
Es gibt keine Begrenzung, wie viele Stunden pro Woche ein Working Holiday Visuminhaber in Australien arbeiten darf. Du kannst Vollzeit, Teilzeit oder Casual arbeiten. Allerdings begrenzt Visabedingung 8547 dich auf maximal 6 Monate bei einem einzigen Arbeitgeber - außer du arbeitest in einem ausgenommenen Sektor (Landwirtschaft, Pflanzen-/Tierzucht, Tourismus/Gastronomie, Gesundheit, Alten-/Behindertenpflege, Kinderbetreuung, Nahrungsmittelverarbeitung oder Katastrophenhilfe überall in Australien, oder in einigen nördlichen Regionen für andere Branchen). Außerhalb dieser Ausnahmen musst du nach 6 Monaten den Arbeitgeber wechseln oder eine schriftliche Erlaubnis vom Department of Home Affairs anfordern.

## Wie viele Stunden darfst du jede Woche arbeiten?

Unter den Visaregeln gibt es kein wöchentliches Maximum:

- Vollzeitarbeit (typischerweise 38 Stunden pro Woche) ist erlaubt
- Überstunden sind erlaubt
- Mehrere Jobs sind erlaubt
- Keine wöchentliche Stundenbegrenzung vom Department of Home Affairs

Die einzigen praktischen Grenzen kommen aus:

- Fair-Work-Regeln zu Ruhepausen und angemessenen Zusatzstunden
- Deinem Award oder Tarifvertrag (der reguläre Stunden begrenzen kann)
- Deiner eigenen körperlichen und geistigen Belastbarkeit

## Was ist die 6-Monats-Arbeitgeberbegrenzung (Bedingung 8547)?

Die Visumsbedingung 8547 gilt für alle Working Holiday Visuminhaber:

- Du kannst für maximal **6 Monate** beim selben Arbeitgeber arbeiten
- Die 6 Monate werden in **Kalendermonaten** ab deinem Startdatum gezählt (nicht nach gearbeiteten Stunden)
- Die Bedingung ist verpflichtend, außer eine Ausnahme gilt
- Die Bedingung wird zurückgesetzt, wenn ein neues Working Holiday Visum gewährt wird

Ein Verstoß gegen Bedingung 8547 kann zur Visumskündigung führen. Die Bedingung ist seit vielen Jahren Teil der Bedingungen des Working Holiday Visums.

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

Wenn deine Tätigkeit nicht unter eine Ausnahme fällt, kannst du eine schriftliche Erlaubnis vom Department of Home Affairs anfordern:

1. Reiche eine schriftliche Anfrage vor Ablauf der 6 Monate ein
2. Lege betriebliche Notwendigkeit oder andere zwingende Gründe dar
3. Arbeite weiter, während die Anfrage geprüft wird
4. Erhalte eine schriftliche Entscheidung

Die Erlaubnis wird nach Ermessen des Departments gewährt und ist nicht garantiert.

## Welche anderen Visaanforderungen gelten?

Du musst weiterhin andere Visabedingungen erfüllen:

- Gültiges Working Holiday Visum halten (Subclass 417 oder 462)
- Dein Hauptzweck in Australien muss weiterhin Urlaub sein (Arbeit ist sekundär)
- Alle Steuerpflichten gelten (gib deine [TFN](/de/tfn), reiche deine [Steuererklärung](/de/tax-return) ein)
- Superansprüche gelten weiterhin für alle bezahlte Arbeit

## Wie passt die 88-Tageregel hinein?

Die 88-Tageanforderung für spezifische Arbeit für ein zweites Working Holiday Visum ist separat von Bedingung 8547:

- 88 Tage spezifische Arbeit in einer regionalen Gegend während deines ersten Visums
- Spezifische Arbeit umfasst Landwirtschaft, Fischerei, Bergbau, Bauwesen in berechtigten Gebieten, Tourismus/Gastronomie in entlegenen Gebieten und Katastrophenhilfe
- Hier geht es um die Visaberechtigung für eine Verlängerung, nicht um die Arbeitgeberdauer
- Viele Branchen mit spezifischer Arbeit sind auch von der 6-Monatsregel ausgenommen

Für ein drittes Working Holiday Visum ist die Anforderung 6 Monate (179 Tage) spezifische Arbeit während des zweiten Visums.

## Was bedeutet das für die Super?

Dein Superanspruch basiert auf deinem Einkommen, nicht auf Stunden:

- Verdiene jeden Lohn → [Super](/de/superannuation) muss zu 12 % zusätzlich gezahlt werden
- Die vorherige 450 $/Monatschwelle wurde 2022 abgeschafft
- Mehr Stunden bedeutet meistens mehr Einkommen, was mehr Super bedeutet
- Siehe [wie viel Super dein Arbeitgeber zahlen sollte](/de/blog/how-much-super-should-employer-pay) für die Berechnung

Wenn du viele Stunden arbeitest und unsicher bist, ob deine Super korrekt gezahlt wird, [schick uns deine Lohnzettel](/de/contact) und wir prüfen es.
 `,
  },

  'penalty-rates-australia': {
    title: 'Was sind Penalty Rates und hast du in Australien Anspruch darauf?',
    description: 'Penalty Rates sind Zuschläge für Arbeit am Wochenende, an Feiertagen oder bei Überstunden. Hier erfährst du, wann du Anspruch hast und wie viel sie betragen.',
    body: `
Penalty Rates sind höhere Lohnsätze, die gelten, wenn Arbeitnehmer außerhalb der regulären Arbeitszeiten arbeiten - einschließlich Wochenenden, Feiertagen, Abenden und frühen Morgenstunden. Sie sind durch moderne Awards und Tarifverträge festgelegt und gelten für die meisten Arbeitnehmer in Australien, einschließlich Working Holiday Maker. Übliche Sätze: Samstag etwa 125-150 %, Sonntag etwa 175 %, Feiertage etwa 225-250 % deines normalen Satzes. Der genaue Satz hängt vom Award ab, der für deine Rolle gilt.

## Warum gibt es Penalty Rates?

Penalty Rates entschädigen Arbeitnehmer für die Unbequemlichkeit und sozialen Kosten der Arbeit zu weniger wünschenswerten Zeiten:

- Lang etablierter Bestandteil australischen Arbeitsrechts
- Durchgesetzt von der Fair Work Commission
- Festgelegt in modernen Awards für jede Branche
- Können nicht unter dem Award-Minimum gezahlt werden (kein Verzicht möglich)

Das Prinzip: an einem Samstagabend oder am Weihnachtstag zu arbeiten ist mehr wert als an einem Dienstagnachmittag.

## Was sind übliche Penalty Rates in der Gastronomie?

Der Hospitality Industry (General) Award deckt Cafés, Restaurants, Hotels und Pubs ab. Typische Sätze für Vollzeit- und Teilzeitangestellte:

- Wochentag nach 19 Uhr: 110-115 % des normalen Satzes
- Samstag: 125 % des normalen Satzes
- Sonntag: 175 % des normalen Satzes
- Feiertag: 225 % des normalen Satzes
- Nachtarbeit (spezifische Definitionen gelten): höhere Sätze

Casual-Angestellte erhalten zusätzlich das 25 %-Casual-Loading zusätzlich zu diesen Sätzen. Die genauen Zahlen hängen von der Einstufung und dem Schichtmuster ab.

## Was sind übliche Penalty Rates im Einzelhandel?

Der General Retail Industry Award deckt die meisten Einzelhandelsrollen ab:

- Samstag: 125 % des normalen Satzes
- Sonntag: 150 % des normalen Satzes
- Feiertag: 225 % des normalen Satzes
- Späte Abende: Zuschlag hängt von den Geschäftsschlusszeiten ab

## Wie findest du heraus, welche Penalty Rates für dich gelten?

Die Penalty Rates hängen ab von:

1. Welcher Award oder Tarifvertrag deine Rolle abdeckt (frag deinen Arbeitgeber oder schau in deinen Vertrag)
2. Deiner Einstufung in diesem Award
3. Ob du Casual, Teilzeit oder Vollzeit bist
4. Dem spezifischen Tag, der Uhrzeit und der Schichtdauer

Wenn du dir bei einem dieser Punkte unsicher bist, [kontaktiere unser Team](/de/contact). Wir berechnen den korrekten Satz für deine Schichten und prüfen deine Lohnzettel gegen das, was gezahlt werden sollte.

## Was tun, wenn du keine Penalty Rates erhältst?

Wenn du an Wochenenden oder Feiertagen ohne Penalty Rates gearbeitet hast, wurdest du unterbezahlt:

1. Identifiziere den korrekten Satz für die Schicht (wir helfen bei der Berechnung)
2. Berechne die Unterbezahlung über alle betroffenen Schichten
3. Sprich das Thema zuerst mit deinem Arbeitgeber an (es kann ein Lohnabrechnungsfehler sein)
4. Bei ungeklärten Fällen [kontaktiere unser Team](/de/contact) und wir helfen, die unbezahlten Beträge zurückzuholen

Dieselben Schutzmaßnahmen gelten für Working Holiday Maker wie für australische Arbeitnehmer. Es gibt keine visumsbasierte Hürde, Penalty Rates einzufordern, die dir zustehen.

Zusätzliches Einkommen durch Penalty Rates unterliegt weiterhin dem 15 %-Working-Holiday-Maker-Satz und muss in deiner [Steuererklärung](/de/tax-return) angegeben werden.
 
## So sieht eine echte Gastro-Woche mit Zuschlägen aus

Casual in der Gastro, Basis-Casual-Satz laut Award rund 33 $/Stunde: Samstage laufen um die 1,5x (49 $), Sonntage bis 1,75-2x (58-66 $), Feiertage bis 2,5x (82 $) - die exakten Multiplikatoren hängen an Award und Einstufung. Ein Backpacker, der gezielt Wochenend- und Feiertagsschichten nimmt, schlägt einen Wochentags-Vollzeitler deutlich. Der Check: Der Payslip muss den zuschlagsbelegten Satz pro Schichttyp zeigen, nicht einen Einheitssatz über alle Tage - flache 33 $ am Sonntag sind Unterbezahlung in Sichtweite.
`,
  },

  'can-your-employer-pay-you-cash-in-hand': {
    title: 'Darf dein Arbeitgeber dich in Australien schwarz bezahlen?',
    description: 'Schwarzarbeit ist nicht illegal an sich, aber sie ist problematisch. Hier erfährst du, was du wissen musst, wenn du in bar bezahlt wirst.',
    body: `
Ja, ein Arbeitgeber darf dich in Australien legal in bar bezahlen. Es gibt kein Gesetz, das verlangt, dass Löhne per Banküberweisung gezahlt werden. Allerdings ändert die Zahlungsmethode nichts an den Pflichten des Arbeitgebers: Er muss weiterhin die korrekte PAYG-Steuer einbehalten, 12 % Super zusätzlich zu deinem Lohn zahlen, dir Lohnzettel ausstellen und Mindestlohn und Award-Bedingungen erfüllen. Barzahlung ist legal; Unterbezahlung, fehlende Super oder fehlende Lohnzettel sind es nicht. Unser Team hilft, unbezahlte Super zurückzuholen und Steuerprobleme für Working Holiday Maker zu lösen, die in bar bezahlt wurden.

## Welche Arbeitgeberpflichten gelten weiterhin bei Barzahlung?

Auch wenn er in bar zahlt, muss dein Arbeitgeber:

- Die korrekte PAYG-Steuer einbehalten (15 % für Working Holiday Maker mit TFN, 45 % ohne)
- 12 % [Super](/de/superannuation) zusätzlich zu deinem Lohn zahlen
- Dir für jede Lohnperiode einen Lohnzettel ausstellen
- Mindestlohn und Award-Bedingungen erfüllen
- Penalty Rates für Wochenend-, Feiertags- und Nachtarbeit zahlen
- Die National Employment Standards einhalten

Viele In bar zahlende Arbeitgeber erfüllen diese Pflichten nicht. Barzahlung an sich ist legal, kommt aber oft im Paket mit anderen Verstößen.

## Was sind deine Steuerpflichten bei Barzahlung?

Alles Bareinkommen ist in Australien steuerpflichtig. Du musst:

- Alle Barlöhne in deiner [Steuererklärung](/de/tax-return) am Ende des Steuerjahres angeben
- Steuer zum 15 %-Working-Holiday-Maker-Satz zahlen (oder 45 %, falls keine TFN hinterlegt war)
- Eigene Aufzeichnungen über Arbeitstage, Stunden, Sätze und erhaltene Beträge führen

Das ATO hat mehrere Möglichkeiten, nicht angegebenes Einkommen zu identifizieren (Bankeinzahlungen, Drittberichte, Prüfungen). Die Strafen für Steuerhinterziehung sind hart. Der richtige Ansatz ist, Aufzeichnungen zu führen und ehrlich anzugeben. Siehe unseren Artikel zu [Steuererklärungen bei Schwarzarbeit](/de/blog/cash-in-hand-tax-return) für Details.

## Was ist mit fehlender Super bei Bararbeit?

Wenn du in bar bezahlt wirst und keine Super bekommst:

- Es fehlen dir 12 % deines Lohns an Beiträgen, auf die du gesetzlichen Anspruch hast
- Das ist unter australischem Recht illegal (die Pflicht gilt unabhängig von der Zahlungsmethode)
- Unser Team kann helfen, unbezahlte Super über den Superannuation Guarantee Charge (SGC)-Prozess zurückzuholen

Viele In bar zahlende Arbeitgeber überspringen Super, weil keine Lohnzettelspur existiert. Wir haben Working Holiday Makern geholfen, Tausende an unbezahlter Super zurückzuholen - sogar Jahre nach der Arbeit. [Schick uns deine Daten](/de/contact), falls du fehlende Super vermutest.

## Was sind Warnsignale einer nicht-konformen Barvereinbarung?

Sei vorsichtig, wenn dein Arbeitgeber:

- Auf Bargeld besteht ohne Banküberweisungsoption
- Dich bittet, die Vereinbarung niemandem zu erwähnen
- Sich weigert, dir Lohnzettel auszustellen
- Unter dem Mindestlohn oder Award-Satz zahlt
- Superbeiträge überspringt
- Dich bittet zu arbeiten, ohne dass deine TFN erfasst wird

Das sind Anzeichen, dass der Arbeitgeber außerhalb des Gesetzes arbeitet - was dich Risiken bei Unterbezahlung, fehlender Super und Steuerproblemen aussetzt.

## Welche Belege solltest du aufbewahren?

Wenn du in bar bezahlt wirst, sind deine eigenen Aufzeichnungen dein einziger Schutz:

- Datum und Stunden jeder Schicht
- Vereinbarter Stundenlohn
- Erhaltener Betrag pro Lohnperiode
- Name, Adresse und Geschäftsname des Arbeitgebers
- Alle Nachrichten oder Schichtpläne zur Arbeit
- Fotos von dir am Arbeitsplatz (helfen zu belegen, dass du dort gearbeitet hast)

Bewahre diese Aufzeichnungen sicher auf. Sie unterstützen sowohl deine Steuererklärung als auch jede zukünftige Klage wegen Unterbezahlung oder fehlender Super.
 
## Der Test: Barlohn vs. Schwarzarbeit

Legale Barzahlung kommt mit Payslip, Steuerabzug und Super-Beiträgen - das Geld ist nur physisch. Illegales Cash-in-Hand hat nichts davon, und die Kosten stapeln sich leise: keine Super (12 % weg), keine Workers Comp bei Verletzung, keine Payslips als Nachweis fürs zweite Visajahr, kein Einkommensnachweis für die Erstattung, die dir wahrscheinlich zusteht. Der Arbeitgeber spart; jeder dieser Verluste ist deiner. Schon so bezahlt worden? Deklariere das Einkommen trotzdem - [so geht es](/de/blog/cash-in-hand-tax-return).
`,
  },

  'fair-work-act-working-holiday-makers': {
    title: 'Was ist der Fair Work Act und wie schützt er Working Holiday Maker?',
    description: 'Der Fair Work Act ist das wichtigste Arbeitsgesetz in Australien. Im Folgenden findest du deine Rechte als Working Holiday Maker.',
    body: `
Der Fair Work Act 2009 ist Australiens wichtigstes Arbeitsgesetz. Er gilt für Working Holiday Maker genauso wie für australische Staatsbürger. Der Act etabliert die National Employment Standards (NES), die 11 Mindestansprüche garantieren - einschließlich Mindestlohn, bezahlten Feiertagen, Jahresurlaub und Schutz vor unfairer Kündigung. Working Holiday Maker haben vollen Schutz unter dem Act, unabhängig vom Visastatus. Unser Team kann dir helfen, deine Rechte zu verstehen und Probleme mit deinem Arbeitgeber anzugehen.

## Was garantiert der Fair Work Act?

Der Act etabliert die National Employment Standards (NES), 11 Mindestansprüche, die für alle Angestellten unabhängig vom Visastatus gelten:

1. Maximale wöchentliche Arbeitsstunden (38 Stunden plus angemessene Zusatzstunden)
2. Recht, flexible Arbeitsvereinbarungen zu beantragen
3. Elternzeitregelungen
4. Jahresurlaub (4 Wochen pro Jahr für festangestellte Arbeitnehmer, Casual Loading anstelle dessen für Casuals)
5. Persönlicher/Pflegeurlaub (10 Tage pro Jahr für festangestellte Arbeitnehmer)
6. Gemeinschaftsdiensturlaub (Geschworenendienst, Rettungsdienstfreiwillige)
7. Langdiensturlaub (Long Service Leave)
8. Feiertage (bezahlt für festangestellte Arbeitnehmer, Penalty Rates bei Arbeit)
9. Kündigungsfrist
10. Abfindungszahlung (für qualifizierte Angestellte)
11. Fair Work Information Statement (muss von Arbeitgebern bereitgestellt werden)

Plus das Recht, mindestens den nationalen Mindestlohn oder den geltenden Award-Satz zu erhalten.

## Wie gelten die NES für Working Holiday Maker in der Praxis?

Für Backpacker sind die relevantesten Ansprüche:

- **Mindestlohn**: 26,44 $/Stunde für festangestellte Arbeitnehmer, 33,05 $/Stunde für Casuals (ab 1. Juli 2026)
- **Feiertage**: Penalty Rates von etwa 225 % beim Arbeiten, oder bezahlter Grundsatz beim Nichtarbeiten (nur festangestellt)
- **Kündigungsfrist**: ordnungsgemäße Frist oder Zahlung statt Frist beim Ende der Anstellung
- **Maximale wöchentliche Stunden**: Schutz davor, zu unangemessenen Zusatzstunden gezwungen zu werden
- **Award-Sätze**: Die meisten Arbeiter sind durch einen Award abgedeckt mit Sätzen höher als das Minimum

Working Holiday Maker sammeln generell nicht genug Dienstzeit, um sich für Jahresurlaubsansprüche zu qualifizieren (du bräuchtest 12 Monate in einem Job), aber die Lohn- und Bedingungsschutzmaßnahmen gelten alle ab Tag eins.

## Was ist der Fair Work Ombudsman?

Der Fair Work Ombudsman (FWO) ist die Regierungsbehörde, die für die Durchsetzung des Fair Work Act verantwortlich ist. Der FWO:

- Untersucht Beschwerden von Arbeitnehmern
- Vermittelt bei Streitigkeiten zwischen Angestellten und Arbeitgebern
- Klagt gegen Arbeitgeber, die gegen den Act verstoßen
- Stellt übersetzte Materialien für Wanderarbeiter bereit
- Hat Kampagnen gegen Branchen mit häufiger Nichteinhaltung geführt

Wenn du glaubst, dass deine Rechte unter dem Fair Work Act verletzt werden, [kontaktiere unser Team](/de/contact). Wir helfen Working Holiday Makern zu identifizieren, was ihnen zusteht, und das Thema über die richtigen Kanäle anzusprechen.

## Beeinflusst eine Meldung eines Arbeitgebers dein Visum?

Nein. Die australische Regierung hat spezifische Schutzmaßnahmen für temporäre Visuminhaber, die Arbeitsplatzverletzungen melden:

- Die Workplace-Justice-Visa-Regelung erlaubt temporären Visainhabern, in Australien zu bleiben, um eine Arbeitsplatzbeschwerde zu verfolgen
- Dein Visastatus kann bei berechtigten Bedenken nicht gegen dich verwendet werden
- Der FWO hat explizite Schutzmaßnahmen für migrante Arbeiter
- Unterbezahlung oder unsichere Bedingungen zu melden ist dein Recht, nicht ein Risiko

Das heißt, du kannst Arbeitsplatzprobleme angehen, ohne Visafolgen zu fürchten. Wir helfen Working Holiday Makern regelmäßig, Beschwerden zu erheben, und haben viele erfolgreiche Ergebnisse gesehen.
 `,
  },

  // ─── More TFN posts ────────────────────────────────────────────────────────
  'how-to-update-address-with-ato': {
    title: 'ATO-Adresse in 5 Minuten ändern (Anleitung 2026)',
    description: 'Drei Wege, deine Adresse bei der ATO zu aktualisieren - bevor TFN-Brief, Steuererstattung oder Super-Post verloren gehen.',
    body: `
Wenn du in Australien an eine neue Adresse umziehst, aktualisiere sie so schnell wie möglich beim ATO (australisches Finanzamt). Das ATO schickt deinen TFN-Brief und andere wichtige Post an die hinterlegte Adresse. Über unseren Service aktualisieren wir deine Adresse beim ATO für dich - so verpasst du keine kritischen Briefe oder Rückzahlungsbenachrichtigungen. Wenn du noch auf deinen TFN-Brief wartest und umgezogen bist, ist eine schnelle Aktualisierung der Adresse der Unterschied zwischen dem Erhalt deiner TFN innerhalb von 28 Tagen und viel längerem Warten.

## Warum ist es wichtig, die Adresse aktuell zu halten?

Das ATO nutzt die hinterlegte Adresse für:

- Den ersten TFN-Brief
- Steuerbescheide und Mitteilungen
- Kommunikation über Rückzahlungen oder Steuerschulden
- DASP-bezogene Post
- Bestätigungen der Identitätsprüfung

Wenn du davon etwas verpasst, kann das deine Steuerangelegenheiten verzögern oder später Komplikationen verursachen. Working Holiday Maker, die viel umziehen, sind besonders gefährdet.

## Wie aktualisierst du deine Adresse beim ATO?

Der einfachste Weg ist über unseren Service:

1. [Kontaktiere unser Team](/de/contact)
2. Gib uns deine neue Adresse
3. Wir aktualisieren sie unter Aufsicht eines registrierten Steueragenten für dich beim ATO
4. Die Bestätigung kommt zurück zu uns

Du musst dich nicht in ATO-Onlinedienste einloggen oder in der Warteschleife hängen. Wir kümmern uns darum als Teil der Verwaltung deiner Steuerposition.

## Welche Adresse solltest du nutzen, wenn du oft umziehst?

Für Working Holiday Maker, die zwischen Hostels oder Arbeitsplätzen pendeln:

- Nutze eine stabile Adresse, an der du zuverlässig Post bekommst
- Die feste Adresse eines Freundes ist ideal, wenn verfügbar
- Ein Langzeithostel funktioniert, wenn die Postweiterleitung zuverlässig ist
- Eine Postfach-Adresse (PO Box) ist auch okay

Vermeide die Adresse eines vorübergehenden Hostels, das du innerhalb weniger Wochen wieder verlassen wirst. Eine Postweiterleitung zwischen australischen Hostels funktioniert selten zuverlässig.

## Beeinflusst deine Adresse deine Steuererklärung?

Indirekt. Die Steuererklärung selbst wird elektronisch eingereicht, und die Rückzahlung geht auf dein Bankkonto. Aber:

- ATO-Mitteilungen zu deiner Steuererklärung gehen an deine hinterlegte Adresse
- Identitätsprüfungsbriefe gehen an deine Adresse
- Anpassungs- oder Prüfungsbriefe gehen an deine Adresse

Eine aktuelle Adresse stellt sicher, dass jede Kommunikation dich zeitnah erreicht.

## Was, wenn du Australien schon verlassen hast?

Wenn du Australien verlassen hast:

- Wir können deine Adresse auf deine Auslandsadresse aktualisieren
- So erreicht dich auch nach der Abreise wichtige Post
- Nützlich für Rückzahlungsnachfragen, [Super](/de/superannuation)-Auszüge und Prüfungsbriefe

[Schick uns deine Auslandsadresse](/de/contact) und wir aktualisieren sie beim ATO und bei eventuellen Superfonds. Das ist Teil unseres Standardabreisepakets für Working Holiday Maker, die Australien verlassen.
 
## Die drei Wege nach Tempo sortiert

1. **myGov (2 Minuten)**: ATO-Dienst, Personal details, Adresse ändern - sofort im System
2. **Über deinen Steueragenten (gleicher Tag)**: wird bei jedem Auftrag miterledigt; besonders nützlich nach der Rückkehr, wenn myGov klemmt
3. **Telefon 13 28 61 (10-30 Minuten Warteschleife)**: funktioniert, verlangt aber jedes Mal volle Identitätsprüfung

Nutzt du ein Hostel mit Postannahme, pflege Wohn- und Postadresse getrennt - die ATO führt beide unabhängig, und der TFN-Brief folgt der Postadresse.
`,
  },

  'tfn-reference-number-before-tfn-arrives': {
    title: 'Was ist eine TFN-Referenznummer und kannst du arbeiten, bevor deine TFN ankommt?',
    description: 'Während du auf deine TFN wartest, bekommst du eine Referenznummer vom ATO. Was sie kann, wie du sie nutzt und was dein Arbeitgeber wissen muss.',
    body: `
Die TFN-Referenznummer ist eine temporäre Kennung, die das ATO (australisches Finanzamt) in dem Moment ausstellt, in dem du deinen TFN-Antrag online einreichst. Sie ist nicht deine eigentliche TFN, beweist aber, dass dein Antrag läuft, und ermöglicht deinem Arbeitgeber, deine Bezahlung beim korrekten 15 %-Satz einzurichten, während du auf die echte TFN wartest. Als Working Holiday Maker kannst du legal mit nur der Referenznummer arbeiten anfangen - vorausgesetzt, du gibst sie deinem Arbeitgeber am ersten Tag.

## Was ist die TFN-Referenznummer?

Die Referenznummer ist eine temporäre Kennung, die du in dem Moment bekommst, in dem du den TFN-Antrag abschließt:

- Erscheint auf dem Bestätigungsbildschirm am Ende des Antrags
- Wird an die im Antrag angegebene E-Mail-Adresse geschickt
- Sieht aus wie ein Standard-Referenzcode (separat von deiner eigentlichen 9-stelligen TFN)
- Dient als Beweis, dass dein Antrag läuft

Stell dir die Nummer wie eine Quittung vor, die deinem Arbeitgeber zeigt, dass du alles richtig gemacht hast und auf die ATO-Bearbeitung wartest.

## Kannst du legal nur mit der Referenznummer arbeiten anfangen?

Ja. Als Working Holiday Maker kannst du anfangen zu arbeiten, bevor deine TFN ankommt - solange du deinem Arbeitgeber die Referenznummer gibst und dann deine eigentliche TFN nachreichst, sobald sie ausgestellt ist.

Was dein Arbeitgeber mit der Referenznummer machen sollte:

- Die Referenznummer in seinem Lohn-System eintragen
- Den 15 %-Working-Holiday-Maker-Steuersatz ab Tag eins anwenden
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
2. Er aktualisiert dein TFN Declaration-Formular mit der korrekten Nummer
3. Ab da sind deine Datensätze mit deiner eigentlichen TFN verknüpft statt mit der temporären Referenz

Wenn du seit dem Antrag umgezogen bist oder deine Post an eine alte Adresse gegangen ist, [kontaktiere unser Team](/de/contact) und wir arrangieren die sichere Neuversendung deiner TFN.

## Bewahre deine Referenznummer sicher auf

Lösch nicht die Bestätigungs-E-Mail von deinem TFN-Antrag:

- Die Referenznummer wird eventuell bei Verzögerungen gebraucht
- Nützlich, wenn du schnell mehrere Jobs anfängst
- Erforderlich, wenn du beim Antrag nachfassen musst

Sobald deine TFN ausgestellt ist, wird die Referenznummer irrelevant. Doch in den Wochen davor ist sie wirklich nützlich, um sicherzustellen, dass deine Bezahlung ab deiner ersten Schicht zum korrekten 15 %-Satz läuft.
 `,
  },

  'tax-free-threshold-working-holiday-visa': {
    title: 'Kein Steuerfreibetrag im WHV: Die 18.200-Dollar-Falle',
    description: 'Working Holiday Maker zahlen ab dem ersten Dollar 15 % - wer im TFN-Formular versehentlich den Freibetrag ankreuzt, baut Steuerschulden auf. So geht es richtig.',
    body: `
Nein, Working Holiday Maker können den Freibetrag in Australien nicht beanspruchen. Der Freibetrag (Tax-Free-Threshold) ist eine 18.200 $-Vergünstigung, die nur australischen Steuerresidenten zur Verfügung steht. Ihn als Working Holiday Visuminhaber zu beanspruchen führt dazu, dass dein Arbeitgeber weniger Steuer einbehält, als du tatsächlich schuldest - was am Jahresende zu einer Steuerschuld statt einer Rückzahlung führt. Die korrekte Einstellung auf deinem TFN Declaration-Formular ist: Working Holiday Maker für die Residenz und "Nein" zur Freibetragsfrage.

## Was ist der Freibetrag?

Der Freibetrag ist eine Regelung für australische Steuerresidenten, die ermöglicht, dass die ersten 18.200 $ Einkommen pro Steuerjahr steuerfrei bleiben. Er existiert, weil Australien ein progressives Steuersystem nutzt, und Residenten mit niedrigem Einkommen bekommen diese Vergünstigung zur Reduzierung ihrer Gesamtsteuerlast.

Es ist ein echter Vorteil, aber er ist nur für australische Residenten gedacht, nicht für temporäre Visuminhaber.

## Warum Working Holiday Maker ihn nicht beanspruchen können

Working Holiday Maker werden nach einer separaten, spezifischen Steuersatzstruktur besteuert:

- Ein pauschaler 15 %-Satz auf die ersten 45.000 $ Einkommen
- Dieser Satz existiert genau deshalb, weil du nicht im selben Sinne Steuerresident bist wie ein ständiger Einwohner oder Staatsbürger
- Der Freibetrag ist Teil des Steuersatzsystems für Residenten, das anders funktioniert

Wenn du den Freibetrag als Working Holiday Maker beanspruchst, behält dein Arbeitgeber weniger Steuer ein, als du tatsächlich schuldest. Auf den ersten Blick sieht das nach mehr Geld in der Tasche jede Woche aus - aber es erzeugt eine Lücke zwischen dem, was einbehalten wurde, und dem, was das ATO erwartet, dass du gezahlt hast. Diese Lücke wird zur Steuerschuld, wenn du deine [Steuererklärung](/de/tax-return) einreichst.

## Wie sieht der Fehler in der Praxis aus?

Stell dir vor, du verdienst 1.000 $ pro Woche:

- Mit dem korrekten 15 %-Satz: 150 $ einbehalten, 850 $ auf deinem Konto
- Mit fälschlich beanspruchtem Freibetrag: deutlich weniger einbehalten (manchmal nichts bei niedrigeren Einkommen)

Am Jahresende berechnet das ATO, was du tatsächlich schuldetest, basierend auf deinem Gesamteinkommen und Visastatus. Wenn weniger als nötig einbehalten wurde, schuldest du die Differenz. Was eine Rückzahlung sein sollte, wird zu einer Rechnung.

## Wie du es behebst, falls du den Freibetrag bereits beansprucht hast

Wenn du schon ein TFN Declaration-Formular eingereicht hast, in dem du den Freibetrag beanspruchst:

1. Reiche ein neues TFN-Declaration-Formular bei deinem Arbeitgeber ein
2. Wähle "Working Holiday Maker" für die Residenz
3. Wähle "Nein" für die Freibetragsfrage
4. Dein Arbeitgeber aktualisiert deine Lohnabrechnung ab dann

Die zum falschen Satz einbehaltene Steuer wird abgeglichen, wenn du deine [Steuererklärung](/de/tax-return) am Ende des Steuerjahres einreichst. Je früher du das Formular korrigierst, desto kleiner ist die nötige Anpassung am Jahresende.

Wenn du nicht sicher bist, wie dein TFN Declaration-Formular ausgefüllt wurde, oder uns deinen Einbehaltungssatz prüfen lassen möchtest, [kontaktiere unser Team](/de/contact) und wir prüfen deine Lohnzettel.

## Das Fazit

Beanspruche den Freibetrag nicht mit einem Working Holiday Visum. Es ist kein Vorteil, der dir zusteht, und die Beanspruchung erzeugt eine Steuerschuld statt Geld zu sparen. Die korrekte Einstellung ist einfach:

- Residenz: Working Holiday Maker
- Tax-free threshold: Nein

Jeder Lohnzettel zeigt dann den korrekten 15 %-Satz, und am Jahresende gibt es keine böse Überraschung.
 
## Schon das falsche Kästchen angekreuzt? Repariere es vor der Steuererklärung

Hast du auf deiner TFN-Erklärung den Steuerfreibetrag beansprucht, behält dein Arbeitgeber zu wenig Steuer ein - und die Differenz landet als Steuerschuld in deinem Bescheid. Die Lösung: Gib deinem Arbeitgeber jetzt eine neue Withholding Declaration mit der korrigierten Antwort und plane den Nachzahlungsbetrag ein. Früh entdeckt sind es ein paar hundert Dollar; nach einem vollen Jahr kann es über tausend werden. Das Formular fragt nach dem Freibetrag, weil Residents ihn bekommen - Working Holiday Maker mit WHM-Sätzen nicht.
`,
  },

  'tfn-application-rejected': {
    title: 'Was tun, wenn dein TFN-Antrag in Australien abgelehnt wird',
    description: 'TFN-Anträge können aus mehreren Gründen abgelehnt werden. Hier erfährst du, was zu tun ist und wie du das Problem behebst.',
    body: `
Ein TFN-Antrag (Tax File Number) kann abgelehnt werden, wenn die Daten im Antrag nicht mit den Aufzeichnungen des Department of Home Affairs übereinstimmen oder wenn die Identitätsprüfung fehlschlägt. Die häufigsten Ursachen sind eine Reisepassnummer, die nicht zur mit dem Visum verknüpften passt, ein falsches Geburtsdatum oder ein Name, der anders geschrieben ist als im Reisepass. Bis eine gültige TFN ausgestellt wird, muss dein Arbeitgeber Steuer zu 45 % einbehalten statt zum 15 %-Working-Holiday-Maker-Satz.

Eine Ablehnung ist nicht das Ende des Prozesses. Der Antrag kann neu eingereicht werden, sobald das Problem identifiziert ist, und jede zwischenzeitlich zu viel gezahlte Steuer holst du dir mit deiner [Steuererklärung](/de/tax-return) am Ende des Steuerjahres zurück.

## Warum werden TFN-Anträge abgelehnt?

Das ATO lehnt Anträge ab, wenn die Identitätsdaten nicht mit einem gültigen Visadatensatz abgeglichen werden können. Die häufigsten Gründe:

- Reisepassnummer im Antrag stimmt nicht mit der überein, die für die Visabewilligung genutzt wurde
- Geburtsdatum stimmt nicht mit Aufzeichnungen des Home Affairs überein
- Name anders geschrieben als im Reisepass (zweite Vornamen, Bindestriche, Sonderzeichen)
- Visum wurde noch nicht durch Einreise nach Australien aktiviert
- Eine frühere TFN existiert von einem früheren Visum, und das System markiert ein Duplikat

Das ATO erklärt nicht immer, welches Feld die Ablehnung verursacht hat - das macht die Lösung im Alleingang schwierig.

## Was passiert mit deiner Steuer, während du wartest?

Jede Woche ohne gültige TFN behält dein Arbeitgeber Steuer zu 45 % statt 15 % ein. Bei einem Wochenlohn von 1.000 $ sind das zusätzliche 300 $ zurückgehalten. Das Geld ist nicht verloren, aber es liegt beim ATO, bis deine Steuererklärung eingereicht wird - manchmal ein Jahr später oder mehr.

Je schneller ein abgelehnter Antrag gelöst wird, desto weniger von deinem Lohn wird durch Überzahlung blockiert.

## Wie kümmert sich unser Team um einen abgelehnten TFN-Antrag?

Wenn ein von uns eingereichter TFN-Antrag abgelehnt wird:

- Wir kontaktieren das ATO direkt, um genau das Feld zu identifizieren, das zur Ablehnung geführt hat
- Wir gleichen die Daten gegen deinen Reisepass und deine Visabewilligung ab
- Wir korrigieren den Antrag und reichen ihn über unseren Steueragentenkanal neu ein
- Wir verfolgen den neuen Antrag bis zur Ausstellung und bestätigen die TFN mit dir

Steueragenten haben direkte ATO-Kanäle, die der Öffentlichkeit nicht zur Verfügung stehen - das heißt, Ablehnungen werden in Tagen statt der Wochen gelöst, die es über allgemeine Auskunftskanäle braucht.

## Wie schützt du deine TFN, sobald sie ausgestellt ist?

Sobald deine TFN ausgestellt ist, behandle sie wie eine Bankkontonummer. Teile deine TFN oder Reisepassdaten nie mit jemandem, der kein registrierter Steueragent ist. Leute, die sich als Buchhalter oder "Steuerhelfer" auf Social Media und Backpackerforen ausgeben, stehlen regelmäßig TFNs und reichen betrügerische Steuererklärungen im Namen anderer Personen ein - die Rückzahlung geht dann auf ihr eigenes Bankkonto.

Ein registrierter Steueragent hat eine TAN (Tax Agent Number), die im Tax-Practitioners-Board-Register aufgeführt ist. Wenn du die Nummer nicht verifizieren kannst, gib keine Daten heraus. [Kontaktiere unser Team](/de/contact), um über einen registrierten Agenten einzureichen und deine Identität geschützt zu halten.
 `,
  },

  'tfn-identity-documents-required': {
    title: 'Welche Ausweisdokumente brauchst du, um eine TFN in Australien zu beantragen?',
    description: 'Für den TFN-Antrag in Australien brauchst du Reisepass, Visadetails und eine Postadresse. Vollständige Dokumentenliste für Working Holiday Maker.',
    body: `
Ein TFN-Antrag (Tax File Number) für einen Working Holiday Maker erfordert einen gültigen Reisepass, die Visabewilligungsmitteilung für ein Subclass 417- oder 462-Visum und eine australische Wohnadresse, an die der TFN-Brief zugestellt werden kann. Der Antrag verlangt außerdem deinen vollständigen rechtlichen Namen genau wie er im Reisepass steht, dein Geburtsdatum und dein Land der Staatsbürgerschaft.

Fehlende oder nicht übereinstimmende Dokumente sind die Hauptursache für TFN-Ablehnungen - und ein abgelehnter Antrag bedeutet Wochen mit 45 % statt 15 % Steuereinbehaltung.

## Welche Dokumente sind erforderlich?

Für einen TFN-Antrag eines Working Holiday Maker braucht das ATO:

- Gültigen Reisepass (denselben, mit dem du auf deinem aktuellen Visum nach Australien eingereist bist)
- Visabewilligungsmitteilung oder Visaetikett, das Subclass 417 oder 462 bestätigt
- Australische Wohnadresse (der TFN-Brief wird hierhin geschickt)
- Datum der Ankunft in Australien auf dem aktuellen Visum
- Land der Staatsbürgerschaft und Geburtsland

Der Antrag braucht außerdem eine E-Mail-Adresse und eine australische oder internationale Telefonnummer zur Kontaktaufnahme.

## Was zählt als gültige australische Adresse?

Die australische Adresse kann jede sein, an der zuverlässig Post empfangen werden kann. Dazu gehören:

- Eine Mietwohnung oder WG
- Ein Hostel oder Kurzzeit-Unterkunft (mit Erlaubnis, Post zu empfangen)
- Die Adresse eines Freundes oder Verwandten
- Eine Arbeitsplatzadresse (mit Erlaubnis des Arbeitgebers)

Der TFN-Brief wird per Post geschickt und kann nicht einfach umgeleitet werden, sobald er ausgestellt ist. Wenn du umziehst, bevor der Brief ankommt, [kann unser Team die Adresse beim ATO aktualisieren](/de/blog/how-to-update-address-with-ato).

## Was, wenn dein Name im Reisepass Sonderzeichen enthält?

Namen mit Bindestrichen, Sonderzeichen, Apostrophen oder mehreren zweiten Vornamen verursachen mehr Ablehnungen als jedes andere Identitätsproblem. Der TFN-Antrag muss zeichengenau mit dem Namen auf der Visumserteilung übereinstimmen. Wenn dein Reisepass "François Müller" sagt und der Antrag als "Francois Muller" eingereicht wird, kann das ATO ihn als Diskrepanz ablehnen.

Wenn wir einen TFN-Antrag über unseren Service einreichen, gleichen wir deinen Namen vor der Einreichung mit deiner Visabewilligung und deinem Reisepass ab, um die Diskrepanz zu verhindern.

## Warum unseren Service nutzen statt selbst zu beantragen?

Das öffentliche TFN-Antragsformular warnt dich vor der Einreichung nicht vor Diskrepanzen. Ein falsches Zeichen, eine veraltete Reisepassnummer oder ein falsches Ankunftsdatum wird erst Wochen später erkannt, wenn das ATO den Antrag ablehnt. Unser Team verifiziert jedes Detail gegen deinen Reisepass und deine Visabewilligung vor der Einreichung, und wir reichen über einen Steueragentenkanal ein, der Anträge schneller bearbeitet als der öffentliche Weg.

## Was ist mit TFN-Sicherheit?

Teile niemals Kopien deines Reisepasses, deiner Visabewilligung oder deiner TFN mit jemandem, der kein registrierter Steueragent ist. Betrüger geben sich regelmäßig als "Buchhalter" oder "Steuerhelfer" in Backpackerforen, Social Media und Messaging-Apps aus, um Identitätsdokumente zu sammeln. Sobald sie deine TFN und Reisepassdaten haben, können sie eine betrügerische Steuererklärung in deinem Namen einreichen und die Rückzahlung auf ihr eigenes Konto umleiten. Ein registrierter Steueragent ist im Tax-Practitioners-Board-Register mit einer TAN-Nummer aufgeführt. Wenn du die Nummer nicht verifizieren kannst, gib deine Dokumente nicht heraus. [Beantrage deine TFN](/de/tfn-form) unter Aufsicht eines registrierten Steueragenten, um deine Identität geschützt zu halten.

[Kontaktiere unser Team](/de/contact), um deine TFN unter Aufsicht eines registrierten Steueragenten zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 
## Warum "nur der Pass" manchmal nicht reicht

Der Online-WHM-Antrag prüft deinen Pass elektronisch gegen die Einreisedaten - saubere Treffer brauchen nichts weiter. Dokumentenanforderungen beginnen, wenn der Abgleich scheitert: Namen, die zwischen Pass und Visum abweichen (weggefallene Zweitnamen, Umlaut-Transliterationen - ein deutsches Dauerthema: Müller/Mueller/Muller müssen konsistent sein), ein nach Visumserteilung erneuerter Pass, oder Doppelstaatler, die mit einem anderen Dokument eingereist sind als beantragt. Dann verlangt die ATO ggf. beglaubigte Kopien oder persönliche Verifizierung bei Services Australia. Prävention schlägt Heilung: Beantrage mit exakt dem Pass, der das Visum trägt, Zeichen für Zeichen wie gedruckt.
`,
  },

  'tfn-security-protect-from-fraud': {
    title: 'Wie du deine TFN in Australien vor Betrug und Identitätsdiebstahl schützt',
    description: 'Deine TFN ist eine sensible Information. Hier erfährst du, wie du sie schützt und was du tun musst, wenn sie missbraucht wurde.',
    body: `
Eine Tax File Number (TFN) ist eine permanente, lebenslange Kennung, die vom ATO (australisches Finanzamt) ausgestellt wird. Jeder, der deine TFN zusammen mit grundlegenden Identitätsdaten hat, kann eine Steuererklärung in deinem Namen einreichen, deine Rückzahlung auf sein eigenes Bankkonto umleiten und betrügerische ABN-Registrierungen mit deiner Identität anlegen. Working Holiday Maker sind ein häufiges Ziel, weil sie mit australischen Systemen nicht vertraut sind und oft Dokumente mit Fremden teilen, die sie in Hostels, auf Social Media oder Backpacker-Foren treffen.

Behandle deine TFN mit derselben Sorgfalt wie eine Bankkontonummer. Sobald sie kompromittiert ist, kann der Schaden Jahre brauchen, bis er behoben ist.

## Wer darf legitim nach deiner TFN fragen?

Das ATO veröffentlicht eine strikte Liste, wer nach deiner TFN fragen darf. Die Liste ist kurz:

- Dein Arbeitgeber (nachdem du angefangen hast zu arbeiten, auf einem TFN Declaration-Formular)
- Deine Bank oder Finanzinstitut (um den korrekten Steuersatz auf Zinsen anzuwenden)
- Dein Superfonds (zur Verwaltung deiner Altersvorsorge)
- Dein registrierter Steueragent (für deine Steuererklärung oder ATO-Angelegenheiten)
- Centrelink oder Behörden, die Zahlungen verwalten, auf die du Anspruch hast

Sonst hat niemand ein gesetzliches Recht, nach deiner TFN zu fragen. Nicht ein Vermieter, nicht ein Freund, nicht eine Personalvermittlung - und schon gar nicht jemand in einer Facebook-Gruppe, der anbietet, "bei deiner Steuer zu helfen".

## Wie TFN-Betrug tatsächlich funktioniert

Der häufigste Betrug, der Working Holiday Maker trifft, folgt demselben Muster. Ein Betrüger postet in einer Backpacker-Facebook-Gruppe, WhatsApp-Community oder am schwarzen Brett im Hostel und bietet an, "deine Steuererklärung einzureichen" oder "deine [Super](/de/superannuation) zu beantragen" gegen eine kleine Gebühr. Er fragt nach:

- Ein Foto deines Reisepasses
- Ein Foto deiner Visumserteilung
- Deine TFN
- Dein Geburtsdatum und deine australische Adresse
- Manchmal deine Bankverbindung

Mit diesen Daten reicht der Betrüger eine Steuererklärung in deinem Namen über das ATO-Portal ein, gibt sein eigenes Bankkonto als Rückzahlungsziel an und verschwindet mit dem Geld. Wenn die legitime Steuererklärung später eingereicht wird, markiert das ATO sie als Duplikat - und die echte Rückzahlung verzögert sich um Monate, während der Betrug untersucht wird.

## Warnsignale eines TFN-Betrugs

Wenn die Person, die anbietet, deine Steuer zu machen, dir keine TAN (Tax Agent Number) im Tax-Practitioners-Board-Register zeigen kann, ist sie kein registrierter Steueragent. Weitere Warnsignale:

- Verlangt Zahlung in bar, Kryptowährung oder Geschenkkarten
- Arbeitet nur über Messaging-Apps ohne Geschäftsadresse
- Verspricht ungewöhnlich hohe Rückzahlungen, ohne deine tatsächliche Situation zu prüfen
- Fragt nach Kontopasswörtern oder verlangt, dass du deinen Bildschirm teilst
- Druck zu "schnellem Handeln" oder "vor der Frist"

Legitime Steueragenten haben ein registriertes Geschäft, eine TAN-Nummer, eine Berufshaftpflichtversicherung und brauchen nie deine Kontopasswörter, um eine Steuererklärung für dich einzureichen.

## Was tun, wenn deine TFN kompromittiert wurde

Wenn du vermutest, dass deine TFN an die falsche Person geteilt wurde oder deine Daten gestohlen wurden, kontaktiere das ATO sofort über die offizielle Identitätsdiebstahlhotline und melde es. Das ATO kann einen Sicherheitsmarker auf deinem Konto anbringen, der zusätzliche Verifizierung verlangt, bevor eine Steuererklärung bearbeitet wird. [Kontaktiere unser Team](/de/contact) und wir helfen dir, den Vorfall zu melden, dein Konto zu sichern und zu prüfen, ob betrügerische Steuererklärungen oder ABN-Registrierungen in deinem Namen eingereicht wurden.

## Wie halten wir deine TFN sicher?

Wenn du über unseren Service einreichst, werden deine TFN und Identitätsdokumente über einen registrierten Steueragentenkanal abgewickelt, der durch Berufshaftpflichtversicherung gedeckt und an den Verhaltenskodex des Tax Practitioners Board gebunden ist. Wir arbeiten nie über anonyme Messaging-Apps, und unsere TAN-Nummer ist öffentlich im Tax-Practitioners-Board-Register prüfbar.
 `,
  },

  'who-can-ask-for-your-tfn': {
    title: 'Wer darf in Australien deine TFN verlangen (und wer nicht)?',
    description: 'Nicht jeder hat das Recht, deine TFN zu sehen. Folgende Liste hilft dir weiter der legitimen Anfragen und Warnsignale für Betrug.',
    body: `
Eine Tax File Number (TFN) ist eine permanente Kennung, die vom ATO (australisches Finanzamt) ausgestellt wird. Unter australischem Datenschutzrecht hat nur eine begrenzte Liste von Organisationen das gesetzliche Recht, nach deiner TFN zu fragen. Jeder außerhalb dieser Liste, der danach fragt, sollte abgelehnt werden, und jeder Druck, sie über Social Media, Messaging-Apps oder persönlich zu teilen, sollte als Betrugsrisiko behandelt werden.

Genau zu wissen, wer fragen darf und was damit gemacht werden darf, ist die einfachste Verteidigung gegen TFN-bezogenen Identitätsdiebstahl.

## Wer darf gesetzlich nach deiner TFN fragen?

Die Privacy (Tax File Number) Rule beschränkt die TFN-Erhebung auf eine definierte Liste:

- Dein Arbeitgeber, sobald du angefangen hast zu arbeiten, auf einem TFN Declaration-Formular
- Banken und Finanzinstitute, um den korrekten Steuersatz auf Zinsen anzuwenden
- Superfonds, um dein Rentenkonto zu verwalten und zu identifizieren
- Registrierte Steueragenten, um Steuererklärungen einzureichen und ATO-Korrespondenz für dich zu verwalten
- Centrelink und Services Australia, falls du eine Behördenzahlung beanspruchst
- Das ATO selbst

Jede dieser Organisationen muss erklären, warum sie die TFN braucht, sie sicher speichern und nur für den genannten steuerbezogenen Zweck nutzen.

## Wer darf nicht nach deiner TFN fragen?

Die Liste der Leute, die kein Recht auf deine TFN haben, ist viel länger. Dazu gehören:

- Vermieter oder Immobilienmakler (auch für Mietanträge)
- Telefon- oder Internetanbieter
- Versicherungen (außer für bestimmte steuerbezogene Produkte)
- Freunde, Hostelpersonal oder andere Backpacker
- Personalvermittlungen (der Arbeitgeber erhebt sie nach der Einstellung, nicht die Agentur)
- Jeder, der Steuerhilfe anbietet, aber keine registrierte Steueragentennummer (TAN) zeigen kann

Wenn eine TFN-Anfrage nicht von der Liste oben kommt, darfst du ablehnen. Eine Ablehnung ist keine Straftat und kann nicht als Grund genutzt werden, dir eine Leistung zu verweigern.

## Wann darf ein Arbeitgeber nach deiner TFN fragen?

Ein Arbeitgeber darf nach deiner TFN erst fragen, nachdem du den Job angenommen hast und dein Onboarding-Papierkram ausfüllst. Die Anfrage kommt über ein TFN Declaration-Formular - ein Standard-ATO-Dokument. Der Arbeitgeber nutzt die TFN, um den korrekten Working-Holiday-Maker-Steuersatz von 15 % anzuwenden und dein Einkommen ans ATO zu melden. Er darf deine TFN nicht mit anderen Arbeitgebern, Personalvermittlungen oder Dritten teilen.

Wenn du noch nicht offiziell eingestellt bist und der Arbeitgeber oder Recruiter schon nach deiner TFN fragt, ist das ein Warnsignal. Siehe unseren Artikel zu [dem TFN Declaration-Formular](/de/blog/tax-file-number-declaration-form) für Details, wie das Formular aussieht und wann du es ausfüllen sollst.

## Welche Warnsignale deuten fast immer auf Betrug hin?

Der häufigste TFN-Betrug gegen Working Holiday Maker kommt durch Nachrichten wie diese:

- "Schick mir deine TFN und deinen Reisepass, ich reiche deine Steuererklärung für dich ein"
- "Schick mir deine TFN, ich prüfe, wie viel [Super](/de/superannuation) du hast"
- "Ich arbeite für einen Buchhalter, schick mir ein Foto deines Visums und deiner TFN"
- "Ich kann dir eine größere Rückzahlung holen, wenn du mir deine TFN schickst"

Keine dieser Anfragen ist legitim. Registrierte Steueragenten arbeiten nicht über anonyme Facebookkonten oder WhatsApp-Nummern, brauchen deine Kontopasswörter nicht und versprechen nie aufgeblähte Rückzahlungen, bevor sie dein tatsächliches Einkommen prüfen.

## Wie verifizierst du einen Steueragenten, bevor du deine TFN teilst?

Jeder registrierte Steueragent in Australien hat eine Tax Agent Number (TAN), die im öffentlichen Tax-Practitioners-Board-Register aufgeführt ist. Bevor du deine TFN mit jemandem teilst, der Steuerdienste anbietet, verifiziere, dass seine TAN-Nummer aktuell ist. Wenn er dir keine TAN geben kann oder die Nummer nicht zum Geschäft passt, teile keine Dokumente.

[Unser Service](/de/tax-return) wird unter Aufsicht eines registrierten Steueragenten erbracht. Unsere TAN-Nummer ist öffentlich verifizierbar, und deine TFN wird über einen sicheren Steueragentenkanal behandelt statt über E-Mail oder Messaging-Apps.

[Kontaktiere unser Team](/de/contact), um deine TFN unter Aufsicht eines registrierten Steueragenten zu beantragen oder Probleme mit einem bestehenden Antrag zu beheben.
 
## Die Betrugsmuster, die gerade auf Backpacker zielen

- **Fake-Jobangebote**, die TFN und Passfoto vor jedem Gespräch verlangen - Identitätsdiebstahl-Kits
- **"Steuererstattungs-Agenten" in sozialen Medien**, die TFN plus myGov-Login wollen - sie reichen betrügerische Erklärungen auf eigene Konten ein
- **"Payroll-Formulare" am Hostel-Brett**, die TFNs für Cash-Jobs sammeln, die nie stattfinden

Die Regel: Deine TFN geht an einen Arbeitgeber nach Jobzusage (über das offizielle Formular), an deinen Super-Fonds, deine Bank und die ATO oder deinen registrierten Agenten. An niemanden sonst - keine Vermieter, keine Recruiter vor der Einstellung, niemanden über WhatsApp. Kompromittiert? Die ATO-Identitätsschutz-Hotline anrufen und den Schutzvermerk setzen lassen.
`,
  },

  'tfn-australian-address-no-fixed-address': {
    title: 'Wie du eine TFN ohne feste australische Adresse beantragst',
    description: 'Hostel, Camper oder Farm? Du kannst trotzdem eine TFN beantragen. Welche Adressen das ATO akzeptiert und wie Working Holiday Maker das richtig machen.',
    body: `
Ein TFN-Antrag (Tax File Number) braucht eine australische Adresse, an die der TFN-Brief zugestellt werden kann - aber das muss keine langfristige Mietwohnung sein. Ein Hostel, die Wohnung eines Freundes, ein Arbeitsplatz oder sogar ein Backpacker-Postlager-Service kann genutzt werden, solange in den vier Wochen nach dem Antrag zuverlässig Post empfangen werden kann. Viele Working Holiday Maker ziehen in den ersten Monaten in Australien häufig um, und ohne feste Adresse zu beantragen ist häufiger, als die ATO-Website suggeriert.

Das größere Risiko ist die Wahl einer Adresse, an der Post verloren geht. Ein verlorener TFN-Brief verzögert deinen korrekten Steuersatz und den Beginn jeder [Steuerrückerstattung](/de/blog/what-is-a-tax-refund-australia), die dir zusteht.

## Was akzeptiert das ATO als Adresse?

Der TFN-Antrag verlangt eine australische Wohn- oder Postanschrift. Das ATO akzeptiert:

- Eine Mietwohnung, WG oder Untervermietung
- Ein Hostel oder Backpacker-Unterkunft
- Die Wohnung eines Freundes oder Verwandten
- Eine Arbeitsplatzadresse (mit Erlaubnis des Arbeitgebers)
- Ein Postlager-Service oder PO Box (von Langzeitreisenden genutzt)

Das ATO prüft nicht, ob du wirklich an der Adresse wohnst. Was zählt: dass der TFN-Brief, der per Australia Post geschickt wird, abgeholt und nicht an den Absender zurückgeschickt wird.

## Warum eine Hosteladresse riskant sein kann

Hostels sind eine häufige Wahl für erste TFN-Anträge, aber sie kommen mit zwei Risiken. Erstens: Große Hostels verwalten Hunderte von Postsendungen, und Briefe gehen verloren, werden zurückgeschickt oder weggeworfen. Zweitens: Wenn du auscheckst, bevor der Brief ankommt, leiten Hostels selten weiter.

Wenn eine Hosteladresse die einzige Option ist, frag schriftlich an der Rezeption, ob sie Post für dich halten, und prüf täglich, sobald zwei Wochen nach dem Antrag vergangen sind. Die ATO-Standardbearbeitungszeit ist 28 Tage, aber der Brief kommt meistens innerhalb von 10 bis 14 Tagen.

## Was, wenn du umziehst, bevor der Brief ankommt?

Vor Ankunft des TFN-Briefes umzuziehen ist einer der häufigsten Gründe, warum Working Holiday Maker ihre TFN nie bekommen. Sobald der Brief an die alte Adresse geschickt wurde, schickt das ATO ihn nicht automatisch erneut.

Wenn du umgezogen bist, kann unser Team deine Adresse beim ATO aktualisieren und die Neuversendung oder anderweitige Bestätigung der TFN arrangieren. Siehe unseren Artikel zu [Adressaktualisierung beim ATO](/de/blog/how-to-update-address-with-ato) für mehr Details.

## Wie beantragst du ohne feste Adresse über unseren Service?

Wenn wir einen TFN-Antrag über unseren Service einreichen, können wir eine verifizierte Adresse nutzen, die für die Dauer des Antrags Post sicher hält. Sobald die TFN ausgestellt ist, bestätigen wir sie direkt mit dir über unser System - so bekommst du deine TFN auch dann, wenn du in der Zwischenzeit die Unterkunft gewechselt hast. Das beseitigt den häufigsten Fehlerpunkt bei TFN-Anträgen für Reisende, die noch eine langfristigere Unterkunft suchen.

## Wie hältst du deine TFN sicher, sobald sie ankommt?

Ein TFN-Brief ist ein hochwertiges Dokument. Sobald er ankommt, lass ihn nicht in einer geteilten Unterkunft herumliegen, fotografiere ihn nicht für Social Media und teile ihn mit niemandem außer deinem Arbeitgeber, deiner Bank, deinem Superfonds oder einem registrierten Steueragenten. Siehe unseren Artikel zu [Schutz deiner TFN vor Betrug](/de/blog/tfn-security-protect-from-fraud) für die komplette Liste, wer nach deiner TFN fragen darf und wer nicht. [Kontaktiere unser Team](/de/contact), um deine TFN über einen registrierten Steueragentenkanal zu beantragen.
 
## Die Adress-Hierarchie für dauerhaft Mobile

Nach Zuverlässigkeit für den TFN-Brief geordnet: die etablierte Wohnung von Freunden oder Verwandten (am besten - echte Menschen bemerken Post), ein Hostel mit 4+ Wochen Buchung UND bestätigter namentlicher Postannahme, eine Arbeitsplatzadresse mit Segen des Arbeitgebers (Farmen machen das routinemäßig für Saisonkräfte), und zuletzt ein Mail-Forwarding-Dienst mit Straßenadresse. Was Zustellungen scheitern lässt: Auschecken bevor der Brief ankommt (er wird nicht nachgesendet - er geht zurück), Hostels, die unabgeholte Post wöchentlich entsorgen, und Tippfehler in Apartmentnummern. Und was auch immer du wählst: Die ATO-Adresse ist [in Minuten änderbar](/de/blog/how-to-update-address-with-ato) - aktualisiere am Tag der Planänderung.
`,
  },

  // ─── More ABN posts ────────────────────────────────────────────────────────
  'farm-work-and-abns': {
    title: 'Farmarbeit und ABNs - was du wissen musst, bevor du anfängst',
    description: 'Manche Farmer wollen, dass du eine ABN nutzt. Hier erfährst du, warum das oft problematisch ist und wie du deine Rechte schützt.',
    body: `
Für Farmarbeit in Australien brauchst du meistens eine Australian Business Number (ABN), wenn du über einen Personalvermittler arbeitest oder im Akkordlohn als Contractor bezahlt wirst. Eine ABN brauchst du nicht, wenn die Farm dich direkt als Angestellten beschäftigt. Kläre die Vereinbarung immer ab, bevor du anfängst zu arbeiten - denn die Antwort entscheidet, welche Steuer-, [Super](/de/superannuation)- und sonstigen Ansprüche für dich gelten.

## Warum ist Farmarbeit oft mit einer ABN verbunden?

Viele australische Farmen stellen Pflücker, Packer und Erntehelfer nicht direkt ein. Stattdessen nutzen sie Personalvermittler, die Arbeiter als Contractor zur Verfügung stellen. In dieser Konstellation:

- Der Personalvermittler verlangt, dass du für deine Stunden oder gepflückten Mengen Rechnungen stellst
- Keine Steuer wird von deiner Zahlung einbehalten
- Keine Superannuation wird zusätzlich zu deinem Lohn gezahlt
- Du brauchst eine [ABN](/de/abn), um korrekt Rechnungen zu stellen

Wenn die Farm dich direkt einstellt, bist du Angestellter und deine [TFN](/de/tfn) reicht aus.

Frag die Farm oder den Personalvermittler direkt, wie die Vereinbarung strukturiert ist, bevor du deine erste Schicht antrittst. Die Antwort bestimmt alles Weitere.

## Wie funktioniert Akkordlohn?

Akkordlohn ist beim Obstpflücken üblich, wo du bezahlt wirst:

- Pro gefüllten Behälter
- Pro geerntetem Kilogramm
- Pro gepflückter oder gepackter Einheit

Akkordlohnvereinbarungen sind häufig als Contracting strukturiert - in diesem Fall brauchst du eine ABN. Doch nicht jeder Akkordlohn ist Contracting. Manche Farmen führen Akkordlohn als Anstellungsverhältnis - du wirst pro Stück bezahlt, stehst aber trotzdem auf der Lohnabrechnung, und die Farm kümmert sich um Steuer und Super. Gehe nicht davon aus, dass Akkordlohn automatisch Contractor bedeutet. Frag die Farm.

## Worauf solltest du bei Farmarbeit achten?

Sei vorsichtig, wenn eines der folgenden Dinge passiert:

- Die Farm oder der Personalvermittler ist unklar, ob du Angestellter oder Contractor bist
- Du wirst gedrängt, schnell eine ABN zu besorgen, ohne dass dir dies erklärt wird
- Du wirst als Contractor bezeichnet, aber die Arbeit sieht identisch aus zu der von Angestellten, die Super und Urlaub bekommen
- Deine Arbeitszeiten werden vorgegeben, deine Werkzeuge werden gestellt, und du arbeitest ausschließlich für diesen Betrieb

Das sind Anzeichen für Scheinselbstständigkeit (Sham Contracting), wo ein Unternehmen einen Angestellten falsch als Contractor einstuft, um Arbeitgeberpflichten zu umgehen. Sham Contracting ist nach australischem Recht illegal. [Kontaktiere unser Team](/de/contact), wenn du den Verdacht hast, dass dir das passiert.

## Steuerpflichten, wenn du eine ABN für Farmarbeit hast

Wenn du unter einer ABN arbeitest, kümmerst du dich selbst um deine Steuer:

- Keine Steuer wird automatisch von deinen Zahlungen einbehalten
- Du musst genug zurücklegen, um deine Steuerschuld am Jahresende zu decken
- Alle ABN-Einkünfte müssen in deiner [Steuererklärung](/de/tax-return) angegeben werden
- Du bekommst eventuell keine Superbeiträge vom Personalvermittler
- Der 15 %-Working-Holiday-Maker-Satz auf die ersten 45.000 $ gilt trotzdem

Bewahre Aufzeichnungen über jede erhaltene Zahlung und jede ausgestellte Rechnung auf. Gute Aufzeichnungen machen die Steuerzeit deutlich einfacher.
 `,
  },

  'employee-vs-contractor-australia': {
    title: 'Was ist der Unterschied zwischen Angestelltem und Contractor in Australien?',
    description: 'Die Unterscheidung ist wichtig für Steuer, Super und Rechte. Im Folgenden findest du die Hauptunterschiede für Working Holiday Maker.',
    body: `
Der Unterschied zwischen Angestelltem und Contractor in Australien hängt von der Substanz der Arbeitsvereinbarung ab, nicht vom Etikett. Ein Angestellter arbeitet unter Anweisung eines Arbeitgebers, der Steuer abzieht, [Super](/de/superannuation) zahlt und Urlaub gewährt. Ein Contractor führt sein eigenes Geschäft, stellt Kunden Rechnungen, legt seine eigene Steuer zurück und hat in der Regel keinen Anspruch auf Super von Kunden. Die Einstufung beeinflusst deine Steuer, deine Super, deine Arbeitsrechte und ob du eine ABN brauchst.

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
- Das Unternehmen bestimmt, wann, wo und wie du arbeitest
- Du bekommst regelmäßig Lohn (wöchentlich oder zweiwöchentlich)

Indikatoren für Contracting:

- Bezahlung pro Aufgabe, Projekt oder Stück
- Du darfst die Arbeit weitergeben oder delegieren
- Du stellst deine eigene Ausrüstung
- Du darfst gleichzeitig für mehrere Kunden arbeiten
- Du legst deine eigenen Arbeitszeiten und -methoden fest
- Du stellst Rechnungen für erledigte Arbeit

Kein einzelner Faktor ist entscheidend. Es kommt auf das Gesamtbild an.

## Warum ist das für Working Holiday Maker wichtig?

Die Einstufung beeinflusst:

- **Steuer**: Bei Angestellten wird Steuer einbehalten; Contractors müssen ihre selbst zurücklegen
- **Super**: Angestellte bekommen 12 % Super zusätzlich zum Lohn; Contractors meistens nicht
- **Urlaub**: Angestellte sammeln bezahlten Jahresurlaub und Krankenstand an; Contractors nicht
- **Arbeitsschutz**: Angestellte sind durch Fair Work geschützt; Contractors haben weniger Schutz
- **Einkommen in Gefahr**: Contractors ohne gültige [ABN](/de/abn) bekommen 47 % von Rechnungen einbehalten

Wenn du als Contractor behandelt wirst, obwohl die Vereinbarung einer Anstellung gleicht, umgeht das Unternehmen möglicherweise seine Pflicht, dir Super und Urlaubsansprüche zu zahlen. Das nennt sich Scheinselbstständigkeit (Sham Contracting) und ist illegal. [Kontaktiere unser Team](/de/contact) und wir helfen dir, das über die richtigen Kanäle zu klären.

## Kannst du gleichzeitig Angestellter und Contractor sein?

Ja. Viele Working Holiday Maker sind in einem Job Angestellter und woanders Contractor. Du nutzt deine [TFN](/de/tfn) für Anstellungseinkommen und deine [ABN](/de/abn) für Contracting-Einkommen, und du gibst beide auf derselben [Steuererklärung](/de/tax-return) am Ende des Steuerjahres an.
 
## Der Sechs-Faktoren-Test auf deinen eigenen Job angewandt

Kontrolle (wer bestimmt, wie gearbeitet wird?), Zeiten (Dienstplan von ihnen oder Wahl von dir?), Werkzeug (ihres oder deins?), Risiko (kannst du an einem Auftrag Geld verlieren?), Delegation (könntest du jemanden schicken?), Integration (trittst du als Teil ihres Betriebs auf?). Vier oder mehr Richtung "Betrieb" heißt Angestellter - egal welche ABN auf den Rechnungen steht. Die Folgen sind konkret: Angestellte bekommen Award-Minimum, Super und Workers Comp; falsch etikettierte "Contractor" bekommen nichts davon, bis sie sich wehren. Der FWO behandelt Sham-Contracting-Beschwerden kostenlos, und der Visastatus schwächt nichts.
`,
  },

  'can-you-have-tfn-and-abn': {
    title: 'TFN und ABN gleichzeitig? Ja - so funktioniert es (2026)',
    description: 'Working Holiday Maker können TFN und ABN parallel nutzen. Wann welche Nummer gilt, wie sich die Steuer unterscheidet und welche Fallen es gibt.',
    body: `
Ja, du kannst eine Tax File Number (TFN) und eine Australian Business Number (ABN) gleichzeitig haben - viele Working Holiday Maker tun das. Tatsächlich brauchst du eine TFN, bevor du eine ABN beantragen kannst. Die TFN ist deine persönliche Steuernummer für Anstellungen, die ABN ist deine Geschäftsnummer für Contractor- oder Sole-Trader-Arbeit. Beide zu haben ist normal, wenn du beide Arten von Arbeit machst.

## Wie funktionieren TFN und ABN zusammen?

Die beiden Nummern erfüllen unterschiedliche Zwecke und werden in unterschiedlichen Situationen genutzt:

- Deine **TFN** ist für: Anstellungseinkommen, Steuererklärungen, Zugriff auf deine [Super](/de/superannuation), Eröffnung bestimmter Bankkonten
- Deine **ABN** ist für: Rechnungen an Kunden für Contracting-Arbeit, Geschäftseinkommen als Sole Trader, Geschäftsausgaben absetzen

Du nutzt sie parallel. Dein Arbeitgeber nutzt deine TFN, um PAYG-Steuer von deinem Lohn abzuziehen. Deine Kunden nutzen deine ABN auf den Rechnungen, die du ausstellst.

Beide Einkommensströme werden in derselben [Steuererklärung](/de/tax-return) am Ende des Steuerjahres angegeben.

## Ein häufiges Szenario für Working Holiday Maker

Viele Working Holiday Maker haben am Ende beide. Ein typisches Beispiel:

- Du arbeitest Teilzeit in einem Café als Angestellter, mit deiner TFN über die reguläre Lohnabrechnung bezahlt
- Nebenbei machst du Freelancefotografie, Grafikdesign oder saisonale Farmarbeit als Contractor, mit Rechnungen unter deiner ABN
- Zur Steuerzeit werden beide Einkommen auf derselben Steuererklärung angegeben

Das ist absolut normal und legal. Die meisten Backpacker, die parallel zu regulärer Anstellung Contractor-Arbeit machen, sind in dieser Situation.

## Häufiger Fehler: ABN nutzen, wo die TFN hingehört

Ein häufiger Fehler besteht darin, einem Arbeitgeber eine ABN anzugeben, obwohl er dich eigentlich als Angestellten behandeln sollte. Das verursacht Probleme, weil:

- Der Arbeitgeber zahlt dich ohne Steuerabzug aus
- Es wird keine Super für dich gezahlt
- Du erhältst keine Urlaubsansprüche
- Du hast am Jahresende eine größere Steuerschuld als erwartet

Nutze deine ABN nur, wenn die Arbeit wirklich Contracting ist (siehe unseren Artikel zu [Angestellter vs. Contractor](/de/blog/employee-vs-contractor-australia) für den Unterschied). Ansonsten solltest du deine TFN und ein TFN Declaration-Formular angeben.

## Welche Steuerpflichten hast du, wenn du beide hast?

Beide Nummern zu haben bedeutet, beide Einkommensströme zu verfolgen:

- Dein Arbeitgeber meldet dein Anstellungseinkommen über die Lohnabrechnung ans ATO
- Du bist dafür verantwortlich, alles Einkommen unter deiner ABN zu verfolgen und anzugeben
- Alle Einkünfte aus beiden Quellen müssen in deiner [Steuererklärung](/de/tax-return) enthalten sein
- Der 15 %-Working-Holiday-Maker-Satz gilt für die kombinierten Einkünfte bis 45.000 $

Führe das ganze Jahr über klare Aufzeichnungen über beide. Hebe deine Lohnzettel auf, kopiere jede Rechnung, die du verschickst, und notiere jede Zahlung, die du bekommst. Zur Steuerzeit ist alles viel einfacher, wenn die Aufzeichnungen vollständig sind.

[Kontaktiere unser Team](/de/contact) für Hilfe bei der ABN-Registrierung, GST- und BAS-Verwaltung oder bei der Klärung deiner Steuerposition am Jahresende.
 `,
  },

  'how-to-cancel-your-abn': {
    title: 'Wie du deine ABN kündigst, wenn du Australien verlässt',
    description: 'Wenn du Australien permanent verlässt, solltest du deine ABN kündigen, um spätere Steuerprobleme zu vermeiden. Vollständige Anleitung in drei Schritten.',
    body: `
Du solltest deine Australian Business Number (ABN) kündigen, wenn du Australien verlässt und kein Geschäft oder Contracting mehr betreibst. Unser Team kümmert sich um die Kündigung im Rahmen der Abwicklung deiner australischen Steuerposition vor deiner Abreise - du musst dich also nicht selbst mit dem Papierkram herumschlagen. Eine Kündigung hält deine Geschäftsunterlagen sauber und vermeidet spätere Verwaltungsprobleme.

## Wie kündigst du deine ABN?

Der einfachste Weg ist, uns das im Rahmen deines Abreise-Steuerpakets übernehmen zu lassen:

1. [Kontaktiere uns](/de/contact), bevor du Australien verlässt
2. Wir bestätigen, dass alles, was an deine ABN gebunden ist, abgeschlossen ist (Steuererklärungen eingereicht, Rechnungen ausgestellt, Zahlungen eingegangen)
3. Wir reichen die Kündigung für dich ein
4. Die ABN wird zum von dir angegebenen Datum gekündigt

Wir bündeln die ABN-Kündigung mit deiner finalen Steuererklärung und einem eventuellen Superantrag, sodass alles in einem Zug erledigt ist, bevor du abreist.

## Warum solltest du deine ABN kündigen?

Eine ABN aktiv zu lassen, wenn du sie nicht mehr nutzt, ist kein großes rechtliches Risiko, verursacht aber Probleme:

- Korrespondenz wird möglicherweise an deine alte australische Adresse geschickt, nachdem du abgereist bist
- Du könntest wichtige Mitteilungen über Meldepflichten übersehen
- Wenn du später nach Australien zurückkehrst, musst du eventuell die ABN reaktivieren oder eine neue beantragen
- Eine offene ABN kann zum Ziel von Identitätsbetrug werden, wenn deine Daten bekannt werden

Eine saubere Kündigung bei der Abreise vereinfacht deinen Verwaltungsaufwand.

## Was musst du vor der ABN-Kündigung erledigen?

Vor der Kündigung musst du sicherstellen, dass alles, was an deine ABN gebunden ist, abgeschlossen ist:

- [Steuererklärung](/de/tax-return) für jedes Jahr einreichen, in dem du ABN-Einkommen hattest
- Alle ausstehenden Rechnungen an Kunden ausstellen
- Alle ausstehenden Zahlungen einsammeln
- Alle erforderlichen BAS-Statements einreichen, falls du für GST registriert warst
- Eventuelle finale Steuerschuld begleichen

Wenn das Steuerjahr noch nicht beendet ist, wenn du abreist, können wir deine Steuererklärung nach dem 1. Juli von überall auf der Welt einreichen. Wir helfen Working Holiday Makern regelmäßig damit.

## Vergiss nicht, deine Super zu beantragen

Wenn Superbeiträge im Zusammenhang mit Anstellungsarbeit gezahlt wurden (getrennt von deinem ABN-Contracting), beantrage sie über den Departing Australia Superannuation Payment (DASP)-Prozess zurück. Siehe unseren Artikel zu [Super beantragen, wenn du Australien verlässt](/de/superannuation) für die Schritte.

ABN-Contracting-Arbeit erzeugt typischerweise keine Superbeiträge, aber parallele Anstellungsarbeit oft schon.
 `,
  },

  'gst-and-abn-for-working-holiday-makers': {
    title: 'GST und ABN - müssen sich Working Holiday Maker für GST registrieren?',
    description: 'Du musst dich für GST registrieren, wenn deine ABN-Einkünfte 75.000 $ überschreiten. Hier erfährst du, was das bedeutet.',
    body: `
Die meisten Working Holiday Maker mit einer ABN müssen sich nicht für GST registrieren. Die Registrierungsschwelle für die Goods and Services Tax (GST) liegt bei 75.000 $ Jahresumsatz aus Geschäftstätigkeiten, und die große Mehrheit der Backpacker verdient während eines einzelnen Aufenthalts weit darunter. Die Ausnahme sind Rideshare- und Essenslieferung-Fahrer - die müssen sich unabhängig vom Einkommen registrieren. Wenn dein ABN-Umsatz unter 75.000 $ bleibt und du nicht im Rideshare oder Lieferdienst bist, kannst du GST komplett ignorieren.

## Was ist die GST-Registrierungsschwelle?

Die GST-Registrierungsschwelle basiert auf dem Jahresumsatz deiner Geschäftstätigkeit, nicht auf deinem Gesamteinkommen. Die wichtigsten Zahlen:

- Unter 75.000 $ ABN-Umsatz pro Jahr: GST-Registrierung ist für die meisten Tätigkeiten **nicht erforderlich**
- 75.000 $ oder mehr pro Jahr: GST-Registrierung ist **verpflichtend** innerhalb von 21 Tagen nach Überschreiten der Schwelle
- Freiwillige Registrierung ist unter der Schwelle möglich, lohnt sich aber selten für Working Holiday Maker

Umsatz bedeutet das Bruttoeinkommen aus deinem Geschäft, vor Ausgaben. Anstellungseinkommen (über deine TFN gezahlt) wird nicht zur Schwelle gezählt.

## Was passiert, wenn du nicht für GST registriert bist?

Wenn dein ABN-Umsatz unter 75.000 $ bleibt und du nicht im Rideshare oder Lieferdienst bist:

- Du berechnest keine GST auf deinen Rechnungen
- Du musst keine BAS (Business Activity Statements) beim ATO einreichen
- Deine einzige Steuerpflicht unter der ABN ist, dein Einkommen in deiner [jährlichen Steuererklärung](/de/tax-return) anzugeben und Einkommensteuer auf den Nettoertrag zu zahlen
- Du musst dich nicht um vierteljährliche GST-Meldungen kümmern

Das ist die normale Situation für fast alle Working Holiday Maker mit einer ABN.

## Wann gilt GST-Registrierung für dich?

GST-Registrierung ist erforderlich, wenn:

- Dein Geschäftsumsatz in einem 12-Monatszeitraum 75.000 $ erreicht oder überschreitet
- Du für Rideshare-Plattformen (Uber, DiDi, Ola) fährst, unabhängig vom Einkommen
- Du für Essenslieferung-Plattformen (Uber Eats, DoorDash, Menulog) fährst, unabhängig vom Einkommen
- Du Taxidienste anbietest

Wenn du im Rideshare oder Lieferdienst tätig bist, registriere dich ab dem ersten Tag für GST - auch wenn du nur ein paar Fahrten machst. Die Plattformen erinnern Fahrer in der Regel daran, die Pflicht liegt jedoch bei dir.

## Was, wenn du dich für GST registrieren musst?

Wenn GST für dich gilt:

- Schlage 10 % auf deine Rechnungen auf und ziehe diese von Kunden ein
- Reiche eine BAS vierteljährlich ein (oder monatlich bei höherem Umsatz)
- Überweise die eingezogene GST ans ATO
- Du kannst GST, die du auf Geschäftsausgaben gezahlt hast, zurückholen

Wir können die BAS-Einreichung unter Aufsicht eines registrierten Steueragenten übernehmen und das vereinfachen.

## Was ist die wichtigste Steuerpflicht für die meisten Contractors?

Für die meisten Working Holiday Maker mit einer [ABN](/de/abn) ist GST kein Thema. Deine echten Pflichten sind einfacher:

- Halte das ganze Jahr über Aufzeichnungen über alle Einkünfte
- Lege genug zurück, um die Einkommensteuer zu decken (etwa 15-20 % des Nettoertrags ist ein sicherer Startpunkt)
- Gib alles in deiner [Steuererklärung](/de/tax-return) am Ende des Steuerjahres an

[Kontaktiere unser Team](/de/contact) für Hilfe bei der ABN-Registrierung, GST- und BAS-Verwaltung oder beim Sortieren deiner Steuerposition am Jahresende.
 
## Die 75.000-$-Frage, beantwortet für echte Backpacker-Fälle

- **Nur Essenslieferung**: keine GST-Registrierung bis 75.000 $ Umsatz - erreicht praktisch kein Backpacker
- **Rideshare mit Passagieren (Uber, DiDi)**: GST ab dem ersten Dollar, per Gesetz - Registrierung, 10 % auf Fahrten, vierteljährliche BAS
- **Farm-Contracting / Freelance**: unter 75.000 $ ist die Registrierung freiwillig - und meist unklug, weil sie BAS-Pflichten ohne Nutzen bringt
- **Versehentlich registriert?** GST-Registrierung aufheben, offene BAS als Null einreichen, wo zutreffend

Registriert heißt: 10 % auf Rechnungen aufschlagen und abführen - Geld, das du für die ATO hältst, nie deins. Der häufigste Backpacker-GST-Fehler: sich registrieren, "um professionell zu wirken", und die folgenden BAS-Pflichten ignorieren.
`,
  },

  'sole-trader-vs-company-australia-working-holiday': {
    title: 'Sole Trader vs. Company in Australien: was ist der Unterschied für Working Holiday Maker?',
    description: 'Die meisten Backpacker arbeiten als Sole Trader, aber eine Company ist eine Option. Im Folgenden findest du die Unterschiede.',
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
- Die Eigentümer erhalten Gehalt oder Dividenden, auf die sie persönlich Steuer zahlen
- Die beschränkte Haftung schützt das persönliche Vermögen

Companies erfordern:

- Registrierung bei ASIC (Australian Securities and Investments Commission)
- Laufende jährliche ASIC-Gebühren
- Separate Geschäftskonten
- Komplexere Steuererklärungen
- Meistens einen dedizierten Buchhalter
- Direktoren-Verantwortung und Berichtspflichten

Der Verwaltungsaufwand ist erheblich.

## Warum sind fast alle Working Holiday Maker Sole Trader?

Für den Umfang der Arbeit, die die meisten Working Holiday Maker machen, ist Sole Trader die richtige Struktur:

- Du verdienst Einkommen für Dienstleistungen, die du persönlich erbringst
- Keine Angestellten oder komplexen Geschäftsabläufe
- Einkommen typischerweise unter 50.000 $ pro Jahr
- Kein Bedarf an Vermögensschutz über Standardversicherungen hinaus
- Kein Steuervorteil aus einer Company-Struktur bei diesem Einkommensniveau

Eine Company macht Sinn, wenn:

- Mehrere Eigentümer das Geschäft gemeinsam betreiben
- Persönliche Haftung ein großes Anliegen ist (manche spezialisierte Handwerke)
- Das Einkommen hoch genug ist, dass Steuerersparnisse die laufenden Kosten überwiegen (typischerweise 200.000 $+)
- Das Geschäft Angestellte oder erhebliches Vermögen hat

Nichts davon trifft typischerweise auf Working Holiday Maker zu.

## Wie unterscheiden sich die Steuersätze?

Für einen Working Holiday Maker:

- **Sole Trader**: 15 % auf die ersten 45.000 $ Geschäftseinkommen (Working-Holiday-Maker-Satz)
- **Company**: 25 % auf alles Geschäftseinkommen (fester Körperschaftssteuersatz)

Bei Working Holiday Makereinkommen ist der Sole-Trader-Satz deutlich niedriger. Der 15 %-Satz gilt bis 45.000 $, dann 30 % auf 45.000-135.000 $.

Für einen Working Holiday Maker, der 30.000 $ unter einer ABN verdient:

- Als Sole Trader: 4.500 $ Steuer (15 %)
- Als Company: 7.500 $ Steuer (25 %)

Plus hätte die Company laufende ASIC-Gebühren (~300 $/Jahr) und Buchhaltungskosten. Sole Trader ist klar besser.

## Was ist mit persönlicher Haftung?

Als Sole Trader ist dein persönliches Vermögen gefährdet, wenn das Geschäft Schulden macht oder Schaden verursacht:

- Für typische Working Holiday Makerarbeit (Reinigung, Gastronomie, einfache Handwerke) ist das ein minimales Risiko
- Versicherungen können die meisten Haftungsrisiken zu niedrigen Kosten abdecken
- Das Risiko ist meistens geringer als die Kosten der Companyverwaltung

Für Working Holiday Maker mit riskanter spezialisierter Arbeit (Elektrik, Klempnerei mit Lizenzpflicht) bietet eine Company eventuell etwas Schutz. Doch diese spezialisierten Handwerke erfordern meistens Qualifikationen, die die meisten Working Holiday Maker nicht haben.

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
    description: 'Tax Invoices müssen ABN, GST-Status, Datum und weitere Pflichtangaben enthalten, um gesetzlich gültig zu sein. Komplette Checkliste für Working Holiday Maker.',
    body: `
Eine Tax Invoice, die mit einer Australian Business Number (ABN) ausgestellt wird, muss den Namen des Anbieters, die ABN, das Datum, eine Beschreibung der Waren oder Dienstleistungen und den Gesamtbetrag enthalten. Wenn die Rechnung mehr als 75 $ beträgt und der Anbieter für GST registriert ist, sind zusätzliche GST-Angaben erforderlich. Wenn ein Working Holiday Maker Dienstleistungen erbringt, ohne eine gültige ABN anzugeben, ist der Kunde gesetzlich verpflichtet, 47 % der Zahlung nach der Einbehaltungsregel bei fehlender ABN einzubehalten.

Die Rechnung korrekt auszustellen ist keine Formalität. Eine Rechnung mit fehlenden oder falschen Angaben kann vom Kunden abgelehnt werden, die Zahlung um Wochen verzögern oder eine ATO-Compliance-Prüfung auslösen.

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

Die meisten Working Holiday Maker mit einer ABN sind nicht für GST registriert, weil sie weit unter der Umsatzschwelle von 75.000 $ verdienen. Siehe unseren Artikel [GST und ABN für Working Holiday Maker](/de/blog/gst-and-abn-for-working-holiday-makers) dazu, wann eine GST-Registrierung erforderlich wird.

## Was passiert, wenn deine Rechnung keine ABN zeigt?

Nach der Einbehaltungsregel bei fehlender ABN ist ein Unternehmen, das für Waren oder Dienstleistungen von jemandem zahlt, der keine ABN angibt, gesetzlich verpflichtet, 47 % der Zahlung einzubehalten und ans ATO abzuführen. Das gilt auch dann, wenn du eine gültige ABN hast, sie aber einfach auf der Rechnung vergessen hast.

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

Wenn du eine ABN über unseren Service registrierst, richten wir deine ABN-Registrierung so ein, dass der Name, die Adresse und die Geschäftstätigkeit auf deinen Rechnungen mit dem offiziellen ATO-Datensatz übereinstimmen. Wir geben dir auch Empfehlungen zum korrekten Rechnungsformat für deine Arbeitsart - ob das Farm-Contracting, Gastronomie, Rideshare, Lieferung, Handwerk oder andere Contractor-Arbeit ist.

Zur Steuerzeit gleichen wir jede Rechnung, die du im Jahr ausgestellt hast, mit dem von deinen Kunden ans ATO gemeldeten Einkommen ab - so stellen wir sicher, dass kein Einkommen übersehen wird und keine zu hohe Einbehaltung erfolgt ist. Siehe unseren Artikel zu [wie du eine ABN registrierst](/de/blog/how-to-register-for-an-abn), wie du anfangen kannst, oder [kontaktiere unser Team](/de/contact) für direkte Hilfe.
 
## Pünktlich bezahlt werden: die Gewohnheiten, die funktionieren

Korrekte Pflichtfelder bringen die Rechnung durch die Buchhaltung; Gewohnheiten bringen das Geld aufs Konto. Rechnung am Tag der Fertigstellung senden - alternde Forderungen abgereister Backpacker sind die am leichtesten ignorierten Schulden Australiens. Zahlungsziel explizit nennen (7 Tage ist für Arbeitsleistung normal; Schweigen lädt zu 30+ ein). Bestellnummern oder den Namen des Vorarbeiters referenzieren, wo Baustellen damit arbeiten. Am ersten überfälligen Tag schriftlich und freundlich nachfassen, Rechnung angehängt. Und vor großen Jobs für unbekannte Auftraggeber: Der ABN-Lookup des Zahlers dauert Sekunden und entlarvt abgemeldete Firmen, bevor sie dir Geld schulden.
`,
  },

  // ─── More Tax Return posts ─────────────────────────────────────────────────
  'amending-tax-return-australia': {
    title: 'Australische Steuererklärung nach Einreichung ändern (Working Holiday Anleitung)',
    description: 'Working Holiday Steuererklärung eingereicht und Fehler bemerkt? Du kannst eine Steuererklärung beim ATO innerhalb bestimmter Fristen ändern. So geht es, wie lange es dauert und wie es deine Rückerstattung beeinflusst.',
    body: `
Ja, du kannst eine Steuererklärung nach Einreichung in Australien ändern. Häufige Gründe für eine Änderung: eine Absetzung, die du vergessen hast, eine falsch eingegebene Einkommenszahl oder ein übersehener Offset. Die allgemeine Frist für Änderungen beträgt **zwei Jahre ab dem Datum des ursprünglichen Steuerbescheids**. Unser Team kümmert sich um Änderungen für Working Holiday Maker, auch aus dem Ausland. Proaktiv zu handeln, um Fehler zu beheben, ist viel besser, als zu warten, bis das ATO das Problem entdeckt.

## Kannst du eine eingereichte Steuererklärung ändern?

Ja. Australisches Steuerrecht erlaubt dir, eine Änderung zu beantragen, nachdem ein Steuerbescheid erlassen wurde:

- Fehler korrigieren
- Fehlendes Einkommen hinzufügen
- Vergessene Absetzungen beantragen
- Übersehene Offsets anwenden (LITO, Small Business, Medicare-Levy-Befreiung)
- Falsch eingegebene Zahlen aktualisieren

Der Änderungsprozess ist formal und muss schriftlich eingereicht werden (kann nicht telefonisch erledigt werden).

## Wie lange hast du Zeit zum Ändern?

Die Standardfristen:

- **Einzelpersonen und kleine Unternehmen**: 2 Jahre ab dem Datum des ursprünglichen Steuerbescheids
- **Andere Steuerzahler**: 4 Jahre
- **Betrugs- oder Hinterziehungsfälle**: keine Frist (ATO kann jederzeit ändern)

Für Working Holiday Maker bedeutet das 2-Jahres-Fenster, dass du bis zwei Jahre nach Einreichung Zeit hast, Korrekturen vorzunehmen. Danach erfordern Änderungen einen besonderen Antrag und sind schwerer zu genehmigen.

## Wie reichst du eine Änderung ein?

Der Prozess über unser Team:

1. [Kontaktiere uns](/de/contact) mit dem identifizierten Problem
2. Schick uns die ursprüngliche Steuererklärung und die nötige Korrektur
3. Wir bereiten die Änderung mit Belegen vor
4. Wir reichen die Änderung für dich ein
5. Das ATO bearbeitet die Änderung (meistens innerhalb von einigen Wochen bis Monaten)
6. Eine eventuelle zusätzliche Rückzahlung wird auf das von dir angegebene Konto überwiesen

Wenn du ursprünglich über unser Team eingereicht hast, haben wir deine Unterlagen und die Änderung ist einfach. Wenn du woanders eingereicht hast, können wir die Änderung trotzdem übernehmen, brauchen aber eine Kopie deiner ursprünglichen Steuererklärung.

## Was passiert mit deiner Rückzahlung während einer Änderung?

Das Ergebnis hängt davon ab, ob die Änderung die Rückzahlung erhöht oder verringert:

**Wenn die Änderung deine Rückzahlung erhöht:**
- Der zusätzliche Betrag wird auf dein Bankkonto überwiesen
- Die Bearbeitung dauert einige Wochen bis Monate
- Du bekommst die ursprüngliche Rückzahlung plus den zusätzlichen Betrag

**Wenn die Änderung deine Rückzahlung verringert:**
- Das ATO stellt einen überarbeiteten Steuerbescheid aus
- Du musst die Differenz zurückzahlen
- Meistens innerhalb von 21 Tagen nach dem überarbeiteten Steuerbescheid fällig
- Wir können einen Zahlungsplan arrangieren, falls nötig

## Kann das ATO deine Steuererklärung ändern?

Ja. Das ATO kann auch Änderungen initiieren:

- Frist: 2 Jahre für Standardfälle
- Keine Frist bei Betrug oder Hinterziehung
- Sie benachrichtigen dich über die Änderung per Steuerbescheid

Wenn das ATO deine Steuererklärung ändert und du nicht einverstanden bist, kannst du einen Einspruch über das formelle Berufungsverfahren einlegen. Siehe unseren Artikel zu [Einspruch gegen ATO-Entscheidungen](/de/blog/appealing-ato-decision-australia).

## Was, wenn du Australien schon verlassen hast?

Änderungen können von überall auf der Welt eingereicht werden:

- Unser Team verwaltet den Prozess remote
- Eine eventuelle zusätzliche Rückzahlung geht auf dein australisches Bankkonto
- Die Zwei-Jahres-Frist gilt unabhängig davon, wo du bist

Wenn du dein australisches Bankkonto geschlossen hast, [schick uns deine ausländischen Kontodaten](/de/contact) und wir arrangieren eine alternative Zahlung.

## Häufige Änderungen, die wir für Working Holiday Maker einreichen

Häufig korrigierte Posten:

- Medicare-Levy-Befreiung nicht beantragt
- Übersehene arbeitsbezogene Absetzungen (Uniformen, Werkzeuge, Schulungen)
- ABN-Einkommen falsch gemeldet oder vergessen
- Falsche Beträge der einbehaltenen Steuer (Meldefehler des Arbeitgebers)
- Auslandseinkommen, das hätte ausgeschlossen werden sollen
- Falscher Residenzstatus angewendet

Die meisten Änderungen führen zu einer größeren Rückzahlung. Wer selbst einreicht, übersieht oft berechtigte Abzüge und Offsets, die wir routinemäßig erfassen. Wenn du selbst eingereicht hast und eine zweite Meinung willst, [schick uns deine vorherige Steuererklärung](/de/contact) und wir prüfen sie kostenlos.
 `,
  },

  'ato-payment-plan-tax-debt-australia': {
    title: 'Was tun, wenn du deine Steuerschuld in Australien nicht zahlen kannst',
    description: 'Wenn du eine Steuerschuld hast, die du nicht in einer Summe zahlen kannst, kannst du einen Zahlungsplan mit dem ATO vereinbaren.',
    body: `
Wenn du deine australische Steuerrechnung nicht in voller Höhe bis zum Fälligkeitsdatum zahlen kannst, kannst du einen Zahlungsplan mit dem ATO vereinbaren, um in Raten über die Zeit zu zahlen. Zinsen fallen an (zum General-Interest-Charge-Satz, aktuell etwa 11 %), aber das ist viel besser, als die Schuld zu ignorieren - was zu höheren Strafen und Inkassomaßnahmen führt. Unser Team hilft Working Holiday Makern, ATO-Zahlungspläne zu vereinbaren, auch nach dem Verlassen Australiens. Steuerschulden verschwinden nicht, wenn du das Land verlässt.

## Was ist eine ATO-Zahlungsvereinbarung?

Eine Zahlungsvereinbarung ist ein formelles Abkommen, eine Steuerschuld in Raten statt als einmalige Pauschalsumme zu zahlen:

- Du gibst wöchentliche oder zweiwöchentliche Beträge an, die du dir leisten kannst
- Die Gesamtschuld muss normalerweise innerhalb von 2 Jahren beglichen sein
- Zinsen fallen auf den ausstehenden Saldo an
- Die Vereinbarung schützt dich vor aktiven Inkassomaßnahmen

Das ATO akzeptiert in der Regel Zahlungspläne, wenn:

- Die Schuld in vernünftiger Höhe ist
- Du nachweist, dass du wirklich nicht in voller Höhe zahlen kannst
- Du eine stabile Einkommensquelle hast
- Du keine vorherigen Vereinbarungen verletzt hast

## Wann ist deine Steuer fällig?

Steuerschulden haben spezifische Fälligkeitstermine:

- **Steuer aus deiner Steuererklärung (über einen Steueragenten eingereicht)**: meistens 21. November
- **Selbst eingereicht**: bis zum Datum auf deinem Steuerbescheid
- **Vierteljährliche BAS-Pflichten**: bis zu den vierteljährlichen Fälligkeitsterminen
- **Strafgebühr für verspätete Einreichung beginnt**: 28 Tage nach Ablauf der Einreichungsfrist

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
- Angemessene Gesamtdauer (meistens 12-24 Monate)

Wir verhandeln in der Regel bessere Konditionen als wenn du selbst einreichst, weil wir verstehen, was das ATO akzeptiert.

## Was, wenn du Australien mit einer offenen Schuld verlässt?

Steuerschulden verschwinden **nicht**, wenn du gehst:

- Das ATO kann Schulden international eintreiben
- Erhebliche offene Beträge können zukünftige australische Visaanträge beeinflussen
- Das ATO kann auf jedes australische Vermögen zugreifen, das du besitzt
- Bankkonten und Investments bleiben für das ATO zugänglich

Wenn du planst, mit einer Schuld abzureisen:

- Richte den Zahlungsplan vor der Abreise ein (viel einfacher als aus dem Ausland)
- Nutze Lastschrift von deinem australischen Bankkonto
- Halte dieses Konto offen, bis die Schuld beglichen ist
- Lass unser Team die Kommunikation nach deiner Abreise übernehmen

## Welche Strafen gelten, wenn du eine Steuerschuld ignorierst?

Das ATO hat mehrere Strafen für Nichtzahlung:

- **General Interest Charge (GIC)**: aktuell etwa 11 % pro Jahr, täglich verzinst
- **Failure-to-Lodge-Strafe**: 330 $ pro 28 Tage verspätet, bis zu maximal 1.650 $
- **Tax Debt Disclosure**: große Schulden können an Wirtschaftsauskunfteien gemeldet werden
- **Director Penalty Notices** (Strafbescheide für Direktoren bei Steuerschulden von Unternehmen)
- **Pfändungsbescheide**: ATO kann deinen Arbeitgeber anweisen, Steuer von deinem Lohn abzuziehen

Diese Strafen können manchmal reduziert oder erlassen werden, wenn du früh handelst und echte Härte nachweist. Nichts zu tun macht die Situation immer schlimmer.

## Was ist das Wichtigste?

Früh handeln. Das ATO ist flexibler, wenn du proaktiv auf sie zugehst, als wenn das ATO dir hinterherlaufen muss. Konkret:

1. Ignoriere keine ATO-Rechnung
2. [Kontaktiere unser Team](/de/contact) vor dem Fälligkeitsdatum, falls du nicht zahlen kannst
3. Wir können einen Zahlungsplan verhandeln
4. Wir können in manchen Fällen Strafnachlass beantragen
5. Wir können die Eintreibung aussetzen lassen, falls ein Einspruch anhängig ist

Das schlechteste Ergebnis ist Schweigen gefolgt von Inkassomaßnahmen. Das beste Ergebnis ist ein strukturierter Plan, der zu deinem Budget passt.

## Können wir Strafnachlass beantragen?

Ja, in bestimmten Umständen:

- Erstmalige Fehler
- Echtes Missverständnis der Pflichten
- Schwere Krankheit oder andere außergewöhnliche Umstände
- Im Wesentlichen wurden die Pflichten eingehalten

Wir beantragen Strafnachlass, wenn berechtigt. Auch wenn nicht alle Strafen entfernt werden, ist teilweiser Nachlass oft erreichbar.

[Kontaktiere unser Team](/de/contact), sobald du von einer Steuerschuld erfährst. Je früher wir handeln, desto besser das Ergebnis.
 `,
  },

  'tax-return-without-tfn-australia': {
    title: 'Kannst du in Australien eine Steuererklärung machen, wenn du ohne TFN gearbeitet hast?',
    description: 'Ja - und wenn du ohne TFN gearbeitet hast, hast du wahrscheinlich Anspruch auf eine große Rückzahlung. So funktioniert es, Schritt für Schritt.',
    body: `
Ein Working Holiday Maker, der in Australien ohne Tax File Number (TFN) gearbeitet hat, kann trotzdem eine Steuererklärung einreichen und die zu viel einbehaltene Steuer zurückholen. Ohne hinterlegte TFN sind Arbeitgeber gesetzlich verpflichtet, Steuer zum höchsten Grenzsteuersatz von 45 % einzubehalten statt zum 15 %-Working-Holiday-Maker-Satz. Die Differenz ist erstattbar, aber die [Steuererklärung](/de/tax-return) kann nicht eingereicht werden, ohne vorher eine TFN zu bekommen.

Je länger du den TFN-Antrag verzögerst, desto komplexer wird die Steuererklärung - weil Arbeitgeber dein Einkommen eventuell nicht mehr melden oder falsche Daten hinterlegt haben.

## Wie viel Extrasteuer wird ohne TFN einbehalten?

Der Unterschied zwischen dem No-TFN-Satz und dem Working-Holiday-Maker-Satz ist erheblich:

- Mit TFN: 15 % einbehalten auf die ersten 45.000 $ Working-Holiday-Einkommen
- Ohne TFN: 45 % einbehalten auf jeden Dollar ab der ersten Woche

Bei einem Wochenlohn von 1.000 $ sind das 300 $ zusätzlicher Einbehalt jede Woche. Über einen dreimonatigen Vollzeitarbeitszeitraum sind das über 3.500 $ einbehalten, die du mit hinterlegter TFN nie gezahlt hättest. Diese Überzahlung lässt sich mit einer Steuererklärung vollständig zurückholen.

## Was du tun musst, bevor du einreichen kannst

Eine Steuererklärung kann nicht ohne TFN eingereicht werden. Der erste Schritt ist also [TFN beantragen](/de/tfn-form), falls du noch keine hast. Sobald die TFN ausgestellt ist, kann die Steuererklärung für jedes Jahr eingereicht werden, in dem du Einkommen hattest - auch für vergangene Steuerjahre, wenn du damals nicht eingereicht hast.

Wenn du Australien schon verlassen hast, kannst du trotzdem eine TFN beantragen und eine Steuererklärung aus dem Ausland einreichen. Siehe unseren Artikel zu [wie du eine Steuererklärung aus dem Ausland einreichst](/de/blog/how-to-lodge-tax-return-from-overseas) für mehr Details.

## Welche Unterlagen brauchst du?

Um eine Steuererklärung über Arbeit ohne TFN einzureichen, braucht unser Team:

- Deine TFN (sobald ausgestellt)
- Deine Reisepass- und Visadaten für den Arbeitszeitraum
- Details zu jedem Arbeitgeber, für den du gearbeitet hast, einschließlich Firmenname und ABN falls bekannt
- Alle Lohnzettel, die du behalten hast, die die einbehaltene Steuer zeigen
- Ein australisches Bankkonto für die Rückzahlung

Auch wenn du keine Lohnzettel hast, hat das ATO Aufzeichnungen über Einkommen, das Arbeitgeber unter dem Single-Touch-Payroll-System gemeldet haben. Über unser Steueragentenportal können wir auf die ATO-Aufzeichnungen jedes Arbeitgebers zugreifen, der Einkommen für dich im Steuerjahr gemeldet hat - einschließlich Bruttolohn und einbehaltener Steuer.

## Was, wenn ein Arbeitgeber dein Einkommen nicht gemeldet hat?

Manche Arbeitgeber, besonders in Schwarzarbeitbranchen, melden Einkommen nicht ans ATO. Wenn du bar ohne TFN bezahlt wurdest, erscheint das Einkommen eventuell nicht in der ATO-Aufzeichnung. In diesem Fall ist die Steuererklärung komplexer, und die Strategie hängt davon ab, ob der Arbeitgeber hätte melden sollen und ob du eigene Belege hast. Siehe unseren Artikel zu [Schwarzarbeitsteuererklärungen](/de/blog/cash-in-hand-tax-return) für die detaillierten Regeln.

## Wie kümmert sich unser Service um eine Steuererklärung nach Arbeit ohne TFN?

Wenn du über unseren Service einreichst, nachdem du ohne TFN gearbeitet hast, kümmert sich unser Team um:

- Beantragung deiner TFN, falls du noch keine hast, über unseren [TFN-Antragsservice](/de/tfn-form)
- Zugriff auf die ATO-Einkommensaufzeichnung, sobald deine TFN aktiv ist, um jeden Arbeitgeber zu identifizieren, der Einkommen für dich gemeldet hat
- Abgleich des gemeldeten Einkommens mit allen Lohnzetteln, die du uns gibst, damit nichts übersehen wird
- Einreichung der Steuererklärung mit Anspruch auf die Differenz zwischen 45 %-No-TFN-Satz und 15 %-Working-Holiday-Maker-Satz

Die Rückzahlung für ein Jahr ohne TFN gearbeitet ist oft mehrere Tausend Dollar höher als eine Standardsteuererklärung wegen der Übereinbehaltung. [Kontaktiere unser Team](/de/contact), um deine Steuererklärung einzureichen und die zu viel gezahlte Steuer zurückzuholen.

## Was ist mit Identitätsschutz?

Falls du ohne TFN gearbeitet hast, weil du unsicher warst, wie das System funktioniert: Lass dich nicht in Versuchung führen, deine Daten mit Fremden online zu teilen, die Steuerhilfe anbieten. Backpacker-Facebook-Gruppen, WhatsApp-Communities und Messaging-Apps sind voller Betrüger, die Working Holiday Maker ins Visier nehmen, die sich überfordert fühlen. Teile deine TFN, deinen Reisepass oder deine Visabewilligung niemals mit jemandem, der kein registrierter Steueragent ist. Ein registrierter Agent ist im Tax-Practitioners-Board-Register mit einer verifizierbaren TAN-Nummer aufgeführt. Wenn er dir keine TAN zeigen kann, gib keine Dokumente heraus.
 
## Das No-TFN-Jahr, in vier Schritten repariert

1. **Jetzt die TFN holen** - auch nach der Rückkehr nach Deutschland läuft der Antrag mit Identitätsprüfung; ohne Nummer keine Erklärung
2. **Einkommen rekonstruieren** - vorhandene Payslips, Kontoeingänge, Arbeitgeberdaten; die 45 %, die No-TFN-Arbeit erlitten hat, sind auf Arbeitgeberseite dokumentiert, auch wenn deine Unterlagen dünn sind
3. **Erklärung einreichen** - die Differenz zwischen 45 % und korrekten 15 % macht dieses Jahr zum profitabelsten Papierkram deines Aufenthalts
4. **Identitätsreibung einplanen** - Erstantrag plus neue TFN plus Ausland löst öfter manuelle Prüfung aus; vollständige Unterlagen und der Verifizierungskanal eines Agenten verkürzen sie

Der Mythos zum Entsorgen: "Ohne TFN ist die Steuer weg." Der Abzug liegt unter der Arbeitgebermeldung bei der ATO und wartet darauf, gegen deine neue Nummer beansprucht zu werden.
`,
  },

  'multiple-jobs-tax-return-working-holiday': {
    title: 'Working Holiday Steuererklärung mit mehreren Arbeitgebern in Australien einreichen',
    description: 'Working Holiday Maker auf 417 und 462 Visum arbeiten oft für mehrere Arbeitgeber in einem Steuerjahr - besonders in Gastronomie, Farmarbeit und Saisonjobs. So kombinierst du alles korrekt in einer Steuererklärung.',
    body: `
Ein Working Holiday Maker, der während eines Steuerjahres mehrere Jobs hatte, muss das Einkommen jedes Arbeitgebers auf einer einzigen Steuererklärung angeben. Jeder Arbeitgeber meldet deinen Lohn und die einbehaltene Steuer separat ans ATO unter dem Single-Touch-Payroll-System, und die [Steuererklärung](/de/tax-return) muss mit dem kombinierten Total übereinstimmen. Einen Arbeitgeber zu übersehen - auch einen, bei dem du nur eine Woche gearbeitet hast - erzeugt eine Diskrepanz, die das ATO erkennt und nach Einreichung korrigiert, was oft eine Folgeveranlagung auslöst.

Mehrere Jobs machen eine Steuererklärung komplexer, aber sie schaffen auch mehr Chancen auf Rückzahlungen, weil die Working-Holiday-Maker-Steuerklassen über das kombinierte Einkommen angewendet werden.

## Wie weiß das ATO über jeden Arbeitgeber Bescheid?

Seit Single Touch Payroll in Australien universal wurde, ist jeder Arbeitgeber verpflichtet, deinen Lohn, die einbehaltene Steuer und die [Super](/de/superannuation) direkt ans ATO mit jeder Lohnauszahlung zu melden. Am Ende des Steuerjahres hat das ATO eine vollständige Aufzeichnung über:

- Jedes Unternehmen, das dir Lohn gezahlt hat, und die Beschäftigungsdaten
- Gesamten Bruttolohn von jedem Arbeitgeber
- Gesamte einbehaltene Steuer von jedem Arbeitgeber
- Superbeiträge, die an jeden Fonds gemeldet wurden

Wenn wir über unser Steueragentenportal einreichen, sehen wir diese kombinierte Aufzeichnung vor der Erstellung deiner Steuererklärung. Das heißt, wir identifizieren Arbeitgeber, die du eventuell vergessen hast (eine Probearbeit von einer Woche in einer Küche, eine Casual-Schicht bei einem Musikfestival, ein Job über eine Zeitarbeitsfirma) und nehmen sie in die Steuererklärung auf.

## Warum verursacht ein übersehener Arbeitgeber Probleme?

Wenn du eine Steuererklärung einreichst, die nur einen Teil deiner Arbeitgeber enthält, vergleicht das ATO deine Steuererklärung mit seiner Single-Touch-Payroll-Aufzeichnung und identifiziert die Lücke. Die Steuererklärung wird typischerweise mit der niedrigeren gemeldeten Zahl zuerst bearbeitet, die Rückzahlung wird gezahlt, und Wochen oder Monate später stellt das ATO einen angepassten Steuerbescheid aus, die das fehlende Einkommen hinzufügt. Das führt oft zu:

- Einer zurückzuzahlenden Steuerschuld, manchmal aus einer Rückzahlung, die du bereits ausgegeben hast
- Zinsen auf die Schuld
- Einer General Interest Charge, die täglich anfällt
- Möglichen Strafen, wenn die Auslassung erheblich war

Es ist viel einfacher, beim ersten Mal korrekt einzureichen, als später mit einem angepassten Steuerbescheid umzugehen.

## Der Steuerklasseneffekt bei mehreren Arbeitgebern

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

- Wir greifen über unser Steueragentenportal auf die vollständige ATO-Einkommensaufzeichnung zu
- Wir identifizieren jeden Arbeitgeber, der Einkommen gemeldet hat, einschließlich derer, die der Arbeiter eventuell vergessen hat
- Wir gleichen die ATO-Aufzeichnung mit allen Lohnzetteln und Endabrechnungen ab, die uns gegeben wurden
- Wir warten, bis alle Arbeitgebermeldungen abgeschlossen sind (manche Arbeitgeber schließen spät ab, was Anpassungen auslösen kann, wenn die Steuererklärung zu früh eingereicht wird)
- Wir wenden die korrekten Working Holiday Makersätze über das kombinierte Einkommen an
- Wir identifizieren alle arbeitsbezogenen Absetzungen über alle Jobs hinweg

[Kontaktiere unser Team](/de/contact), um eine Steuererklärung einzureichen, die jeden Arbeitgeber beim ersten Mal sauber erfasst - und spätere angepasste Steuerbescheide vermeidet.
 
## Der Abgleich-Walkthrough für ein Drei-Jobs-Jahr

Im Juli listet dein myGov (oder das Agentenportal) ein Income Statement pro Arbeitgeber. Der Ablauf: Liste gegen dein Jahresgedächtnis prüfen (das Cafe in Sydney, die Farm in Bundaberg, die Bar in Melbourne - alle drei da?), jedes auf "Tax ready" prüfen, dann pro Arbeitgeber die Abzugsquote rechnen: Steuer geteilt durch Brutto. Jeder Arbeitgeber deutlich über 15 % ist deine Erstattung an einem Ort konzentriert - typisch die Farm (unregistriert, 30 %+) oder der erste Job (TFN kam spät, 45-%-Wochen). Ein fehlender Arbeitgeber heißt: STP-Finalisierung versäumt (nachhaken oder mit Payslips einreichen) oder schwarz gearbeitet - [trotzdem deklarieren](/de/blog/cash-in-hand-tax-return). Eine Erklärung, alles Einkommen, die WHM-Sätze auf die Summe.
`,
  },

  'late-tax-return-penalty-working-holiday': {
    title: 'Was ist die Strafe für eine verspätete Steuererklärung als Working Holiday Maker?',
    description: 'Verspätete Steuererklärungen lösen Failure-to-Lodge-Strafen aus, die bis zu 1.650 $ erreichen können. Aktuelle Strafhöhen und wie du sie noch vermeidest.',
    body: `
Das ATO erhebt eine Failure-to-Lodge (FTL)-Strafe von einer Penalty Unit für jeden 28-Tagezeitraum, dass eine [Steuererklärung](/de/tax-return) überfällig ist - bis zu maximal fünf Penalty Units. Ab dem Steuerjahr 2025-26 beträgt eine Penalty Unit 330 $, was die maximale FTL-Strafe auf 1.650 $ bringt. Die Strafe gilt unabhängig davon, ob du Steuer schuldest: Ein Working Holiday Maker, dem eigentlich eine Rückzahlung zusteht, kann trotzdem eine Failure-to-Lodge-Strafe für verspätete Einreichung bekommen.

Die Strafe ist selten die größten Kosten einer verspäteten Steuererklärung. Für Working Holiday Maker ist das größere Problem meistens eine verzögerte Rückzahlung und die Folgewirkungen auf DASP, zweite Visaanträge und ATO-Compliance-Markierungen.

## Wann ist eine Steuererklärung fällig?

Für Working Holiday Maker, die ihre eigene Steuererklärung einreichen, ist die Frist der 31. Oktober nach Ende des Steuerjahres (das vom 1. Juli bis 30. Juni läuft). Eine Steuererklärung für das Steuerjahr 2024-25 ist also bis zum 31. Oktober 2025 fällig.

Working Holiday Maker, die über einen registrierten Steueragenten einreichen, haben eine spätere Frist. Steueragenten können für ihre Mandanten bis spät in den Mai des Folgejahres einreichen - vorausgesetzt, der Mandant war vor der Standard-31.-Oktoberfrist beim Agenten registriert.

Diese Verlängerung ist einer der praktischen Vorteile beim Einreichen über einen Steueragenten - besonders für Working Holiday Maker, die noch in Australien sind oder erst kürzlich abgereist sind.

## Wie wird die Strafe berechnet?

Die Failure-to-Lodge-Strafe steigt alle 28 Tage, dass die Steuererklärung überfällig ist:

- 1 bis 28 Tage verspätet: 1 Penalty Unit = 330 $
- 29 bis 56 Tage verspätet: 2 Penalty Units = 444 $
- 57 bis 84 Tage verspätet: 3 Penalty Units = 666 $
- 85 bis 112 Tage verspätet: 4 Penalty Units = 888 $
- 113 Tage oder mehr verspätet: 5 Penalty Units = 1.650 $ (Maximum)

Die maximale Strafe ist bei 1.650 $ gedeckelt, egal wie spät die Steuererklärung ist.

## Was, wenn dir eine Rückzahlung zusteht?

Ein Working Holiday Maker, dem eine Rückzahlung zusteht, kann trotzdem eine Failure-to-Lodge-Strafe für verspätete Einreichung bekommen. Die ATO-Position ist, dass die Einreichungspflicht unabhängig davon ist, ob Steuer geschuldet wird. In der Praxis wendet das ATO die Strafe oft nicht für verspätete Rückzahlungssteuererklärungen von Working Holiday Makern an, aber es hat das gesetzliche Recht dazu - und die Strafe wurde in Fällen angewendet, in denen das ATO die Verspätung als absichtlich ansieht oder ein Muster verspäteter Einreichungen über mehrere Jahre besteht.

## Was, wenn dir nichts zusteht oder du eine kleine Summe schuldest?

Die Failure-to-Lodge-Strafe ist dieselbe, egal ob du Steuer schuldest. Ein Working Holiday Maker mit einem Nullsteuerausgang (keine Rückzahlung, keine Schuld) kann trotzdem mit der vollen 1.650 $-Maximalstrafe für eine Steuererklärung getroffen werden, die mehr als 112 Tage überfällig ist.

## Wann werden Zinsen zusätzlich erhoben?

Wenn die verspätete Steuererklärung zu einer Steuerschuld führt, erhebt das ATO außerdem die **General Interest Charge** auf den unbezahlten Betrag ab dem ursprünglichen Fälligkeitsdatum. Der General-Interest-Charge-Satz zinst täglich und liegt derzeit deutlich über dem Leitzins. Eine kleine Steuerschuld, die mehrere Jahre unbezahlt bleibt, kann erheblich wachsen.

Die General Interest Charge gilt nicht, wenn die Steuererklärung zu einer Rückzahlung oder einem Nullergebnis führt.

## Kann die Strafe erlassen werden?

Das ATO hat Ermessen, die Failure-to-Lodge-Strafe in manchen Umständen zu erlassen (annullieren oder reduzieren):

- Echte Krankheit oder Krankenhausaufenthalt des Steuerpflichtigen zum Zeitpunkt der Frist
- Familientrauerfall
- Naturkatastrophe oder anderes Ereignis außerhalb der Kontrolle des Steuerpflichtigen
- ATO-System- oder Bearbeitungsprobleme, die die Einreichung verhindert haben
- Erstmalige verspätete Einreichung mit ansonsten sauberer Compliance-Historie

Ein Erlass muss spezifisch beantragt und durch Belege gestützt werden. Die Erlassrate für Working Holiday Maker ist generell höher, wenn der Antrag über einen registrierten Steueragenten gestellt wird, statt direkt vom Steuerpflichtigen.

## Was ist mit Steuererklärungen aus Jahren, in denen du Australien schon verlassen hast?

Working Holiday Maker, die Australien ohne Einreichung ihrer letzten Steuererklärung verlassen haben, haften weiterhin für Failure-to-Lodge-Strafen für Steuererklärungen, die hätten eingereicht werden sollen. Das ATO verfolgt nicht immer aktiv Working Holiday Maker im Ausland für kleine Strafbeträge, aber die Schuld liegt in der ATO-Aufzeichnung und kann:

- Mit zukünftigen Rückzahlungen verrechnet werden (einschließlich der DASP-Zahlung des Working Holiday Makers in manchen Fällen)
- Einen zukünftigen australischen Visaantrag blockieren
- An internationale Inkassobüros überwiesen werden, wenn der Betrag groß genug ist

Verspätete Steuererklärungen aus dem Ausland einzureichen ist generell immer noch besser als gar nicht einzureichen.

## Wie wirkt sich das auf zweite und dritte Visaanträge aus?

Anträge für ein zweites und drittes Working Holiday Visum können durch ein ungelöstes ATO-Complianceproblem beeinflusst werden. Wenn du ausstehende Failure-to-Lodge-Strafen, nicht eingereichte Steuererklärungen oder unbezahlte Steuerschulden hast, kann das Department of Home Affairs den Antrag für zusätzliche Prüfung markieren. Die ATO-Position vor dem Antrag für das nächste Visum zu klären, vermeidet dieses Risiko.

## Wie kümmert sich unser Service um verspätete Steuererklärungen?

Für Working Holiday Maker mit überfälligen Steuererklärungen:

- Wir reichen jede überfällige Steuererklärung über unser Steueragentenportal ein
- Wir beantragen Erlass jeder Failure-to-Lodge-Strafe, wo es Gründe gibt
- Wir gleichen die ATO-Aufzeichnung über mehrere Jahre ab, damit kein Einkommen übersehen wurde
- Wir koordinieren das [DASP](/de/blog/what-is-dasp-super-withdrawal)-Timing, wo relevant
- Wir verfolgen jede aus früheren Jahren geschuldete Rückzahlung (Rückzahlungsansprüche bleiben bis zu vier Jahre einklagbar)

Eine verspätete Steuererklärung ist selten irreparabel. [Kontaktiere unser Team](/de/contact), um deine Einreichungen auf den aktuellen Stand zu bringen und jede ausstehende Strafposition zu lösen.
 
## Verspätet dran? Strafen treffen selten, wenn dir Geld zusteht

Failure-to-lodge-Strafen starten bei 330 $ je angefangene 28 Tage - werden aber selten verhängt, wenn eine Erstattung fällig ist; die ATO straft primär Schuldner, nicht Gläubiger. Die Praxis für Nachzügler: alte Jahre lassen sich gebündelt nachreichen (Agenten holen die Income Statements), Erstattungen aus mehreren Jahren fließen zusammen, und ein Remissionsantrag räumt verhängte Strafen oft ab, wenn die Verspätung erklärbar ist (Ausreise, kein myGov-Zugang). Der Fehler ist das Aufschieben aus Angst - fast jeder deutsche Nachzügler, den wir sehen, bekommt am Ende Geld heraus statt Strafe.
`,
  },

  'tools-equipment-under-300-instant-deduction-whv': {
    title: 'Sofortabschreibung für Werkzeuge und Ausrüstung unter 300 $ als Working Holiday Maker',
    description: 'Arbeitswerkzeuge unter 300 $ kannst du als Working Holiday Maker komplett im Kaufjahr absetzen. Was qualifiziert, wie du Belege aufbewahrst und Beispiele.',
    body: `
Das ATO erlaubt eine sofortige Absetzung für einzelne Werkzeuge, Ausrüstung und Vermögensgegenstände, die 300 $ oder weniger kosten und genutzt werden, um Einkommen aus Anstellung zu erzielen. Die Absetzung wird im Steuerjahr des Kaufs in voller Höhe vorgenommen, statt über mehrere Jahre abgeschrieben zu werden. Für Working Holiday Maker deckt diese Regel eine breite Palette arbeitsbezogener Gegenstände ab: Messer für Küchenarbeit, Pflückausrüstung für Farmarbeit, Werkzeuge für Bauarbeit, Arbeitsstiefel, Warnwesten, Ausrüstungstaschen und viele andere Gegenstände.

Die 300 $-Regel ist eine der am häufigsten übersehenen Absetzungen in [Steuererklärungen](/de/tax-return) von Working Holiday Makern - teils weil Arbeiter nicht wissen, dass die Gegenstände qualifizieren, und teils weil sie die Quittungen nicht aufbewahrt haben.

## Was sagt die 300 $-Regel tatsächlich?

Die Regel gilt für Vermögensgegenstände, die für Zwecke zur Einkommenserzielung genutzt werden. Spezifisch:

- Der Vermögensgegenstand muss 300 $ oder weniger kosten (jeder einzeln, nicht insgesamt)
- Der Vermögensgegenstand muss überwiegend zur Erzielung von steuerpflichtigem Einkommen genutzt werden
- Der Vermögensgegenstand darf nicht Teil eines Sets von Vermögensgegenständen sein, die zusammen mehr als 300 $ kosten

Wenn alle drei erfüllt sind, kann die volle Kostensumme des Vermögensgegenstands im Kaufjahr abgesetzt werden.

## Welche Arten von Gegenständen qualifizieren?

Häufige Gegenstände, die für Working Holiday Maker qualifizieren:

- **Gastronomie**: Küchenmesser, Koch-Weißjacken, rutschfeste Arbeitsschuhe, Schürzen
- **Farmarbeit**: Pflück-Eimer, Gartenscheren, Astscheren, Gartenhandschuhe, Arbeitsstiefel, Warnhemden, Sonnenhüte
- **Bauwesen**: Stahlkappenstiefel, Schutzhelme, Werkzeuggürtel, Handwerkzeuge (Hämmer, Bohrer unter 300 $), Maßbänder, Arbeitshandschuhe
- **Reinigung**: Staubsaugerbeutel, Reinigungsausrüstung, Schutzhandschuhe
- **Rideshare und Lieferung**: Liefertaschen, Handyhalter, Dashcams, Fahrradzubehör
- **Büroarbeit**: Schreibwaren, Computerzubehör unter 300 $

Fast jeder arbeitsbezogene Gegenstand unter 300 $, den du während des Steuerjahres gekauft hast und genutzt hast, um deinen Job zu machen, kann beansprucht werden.

## Was zählt als "überwiegend für die Arbeit"?

Wenn ein Gegenstand sowohl für die Arbeit als auch für private Zwecke genutzt wird, ist die Absetzung auf den arbeitsbezogenen Prozentsatz begrenzt. Zum Beispiel:

- Ein Paar Stahlkappenstiefel nur für die Arbeit verwendet: 100 % absetzbar
- Ein Paar Arbeitsstiefel auch privat getragen: nur der arbeitsbezogene Prozentsatz absetzbar
- Ein Rucksack zum Tragen von Farmpflückausrüstung: absetzbar wenn überwiegend für diesen Zweck
- Ein Handyhalter für Ridesharefahren: absetzbar wenn überwiegend für diesen Zweck genutzt

Für Gegenstände, die ausschließlich für die Arbeit genutzt werden und unpraktisch anders zu nutzen wären (Hi-Vis, Schutzhelme, Koch-Weißjacken), sind 100 % unkompliziert.

## Was ist mit Sets von Vermögensgegenständen?

Die 300 $-Regel gilt nicht, wenn der Vermögensgegenstand Teil eines Sets ist, das zusammen mehr als 300 $ kostete:

- Wenn ein Koch ein Set von sechs Küchenmessern für 450 $ in einem Kauf kauft, muss das Set über seine effektive Lebensdauer abgeschrieben werden
- Wenn derselbe Koch ein Messer für 80 $ kauft, dann ein anderes für 90 $, dann noch eines für 100 $, wird jedes separat behandelt und jedes ist unter der 300 $-Regel voll absetzbar

## Welche Aufzeichnungen brauchst du?

Für jede Absetzung verlangt das ATO Belege über:

- Die Kosten (eine Quittung oder Tax Invoice)
- Das Kaufdatum
- Den Lieferanten
- Eine Beschreibung des Gegenstands
- Belege der Arbeitsnutzung

Ohne Aufzeichnungen kann die Absetzung nicht beansprucht werden. Das ATO akzeptiert Fotos von Quittungen, die auf einem Handy oder in Cloudspeicher aufbewahrt werden.

## Was ist mit Gegenständen, die mehr als 300 $ kosten?

Gegenstände, die mehr als 300 $ kosten, sind nicht als Absetzungen verloren, aber sie müssen über ihre effektive Lebensdauer abgeschrieben werden. Eine 400 $-Kettensäge kann über 3-5 Jahre abgesetzt werden statt sofort.

Es gibt auch eine neue **1.000 $-Sofortabsetzungsregel**, die ab 1. Juli 2026 gilt. Siehe unseren Artikel zur [1.000 $-Sofortabsetzungsregel](/de/blog/1000-dollar-instant-deduction-rule-2026) für die Details.

## Was ist, wenn du Gegenstände bar gekauft hast, ohne Belege aufzubewahren?

Falls du einen Beleg verloren hast oder nie einen hattest, kann das ATO manchmal alternative Belege akzeptieren:

- Ein Bank- oder Kreditkartenauszug, der den Kauf zeigt
- Ein Foto des Gegenstands noch in Nutzung
- Eine schriftliche Bestätigung vom Lieferanten, die den Kauf bestätigt

Die Stärke alternativer Belege variiert. Die am besten verteidigbare Absetzung ist eine, die durch einen tatsächlichen Beleg gestützt wird.

## Wie interagiert das mit den breiteren Absetzungsregeln?

Die 300 $-Regel gilt für Werkzeuge und Ausrüstung. Working Holiday Maker können auch beanspruchen:

- **Schutzkleidung und Schutzfußwerk** unter separaten Regeln
- **Fahrzeugausgaben** (siehe unseren Artikel zu [Fahrzeugausgaben und Logbüchern](/de/blog/vehicle-logbook-abn-working-holiday))
- **Handy- und Internetnutzung** für Arbeit, auf prozentualer Basis
- **Weiterbildung**, falls direkt mit deiner aktuellen Arbeit verbunden
- **Gewerkschaftsbeiträge, Registrierungen und Lizenzen**, die mit deiner Arbeit verbunden sind

Siehe unseren Artikel zu [Steuerabsetzungen für Working Holiday Maker](/de/blog/tax-deductions-working-holiday-makers) für das breitere Rahmenwerk.

## Wie behandelt unser Service Werkzeugabsetzungen?

Wenn wir eine [Steuererklärung](/de/tax-return) über unseren Service einreichen, prüfen wir jeden arbeitsbezogenen Kauf, identifizieren Gegenstände, die unter der 300 $-Regel qualifizieren, und wenden die korrekte Absetzung an (volle sofortige Absetzung oder Abschreibung). Working Holiday Maker in handwerks-intensiven und Farmarbeiten haben oft mehrere Tausend Dollar an legitimen Werkzeugabsetzungen in Quittungen sitzen, die nie in die Steuererklärung kommen. [Kontaktiere unser Team](/de/contact) vor Ende des Steuerjahres, damit deine Aufzeichnungen vorliegen.
 `,
  },

  // ─── More Super posts ──────────────────────────────────────────────────────
  'tax-on-super-withdrawal-backpacker': {
    title: 'Wie viel Super bekommst du raus? Rechenbeispiele nach 65 % Steuer',
    description: 'Aus 10.000 $ Super-Guthaben werden nach der 65-%-DASP-Steuer rund 3.500 $. Rechenbeispiele nach Guthaben und Arbeitsjahr - und wie du Gebühren vermeidest.',
    body: `
Die Steuer auf eine DASP-Superauszahlung für Working Holiday Maker beträgt 65 % der steuerpflichtigen Komponente. Dieser Satz gilt speziell für Inhaber von Working Holiday Visa (Subclass 417 und 462) und ist höher als der Satz, der für andere temporäre Visuminhaber gilt. Die Steuer wird vom Superfonds oder ATO einbehalten, bevor die Zahlung an dich geht - du bekommst also den Nettobetrag. Trotz des hohen Satzes lohnt es sich immer noch, deine Super zu beantragen, weil die Alternative ist, das gesamte Guthaben zurückzulassen.

## Was ist die steuerpflichtige Komponente deiner Super?

Superzahlungen bestehen aus zwei Komponenten:

- **Steuerpflichtige Komponente**: enthält Arbeitgeberbeiträge und Erträge auf diese Beiträge
- **Steuerfreie Komponente**: enthält persönliche Nachsteuerbeiträge (bei Working Holiday Makern selten)

Für Working Holiday Maker ist der Großteil des Superguthabens die steuerpflichtige Komponente, weil die gesamte Super vom Arbeitgeber bezahlt wird. Die steuerfreie Komponente wird, falls vorhanden, ohne Einbehaltung ausgezahlt.

## Was bedeutet der 65 %-Satz in der Praxis?

Die 65 % gelten auf die steuerpflichtige Komponente vor der Zahlung:

- Superguthaben 2.000 $ (alles steuerpflichtig): du bekommst 700 $ nach Steuern
- Superguthaben 5.000 $ (alles steuerpflichtig): du bekommst 1.750 $ nach Steuern
- Superguthaben 10.000 $ (alles steuerpflichtig): du bekommst 3.500 $ nach Steuern

Die Einbehaltung ist erheblich, aber die verbleibenden 35 % sind immer noch Geld, das dein Arbeitgeber zusätzlich zu deinem Lohn gezahlt hat. Ohne Beantragung erhältst du nichts.

## Warum ist der Satz für Working Holiday Maker höher?

Der 65 %-DASP-Satz wurde im Januar 2017 als Teil der breiteren "Backpackersteuer"-Reformen eingeführt:

- Vor 2017: 35 % DASP-Satz
- Ab 1. Januar 2017: 65 % für Working Holiday Visuminhaber (Subclass 417 und 462)
- Andere temporäre Visuminhaber: zahlen weiterhin 35 %

Die Begründung der Regierung war, dass der bestehende 15 %-Working-Holiday-Maker-Einkommensteuersatz schon vergünstigt ist - ein höherer Satz auf die Superauszahlung gleicht die gesamte Steuerbehandlung aus.

## Gibt es einen Weg, die DASP-Steuer zu reduzieren?

Für Working Holiday Maker ist der 65 %-Satz festgelegt:

- Er wird vom Fonds oder ATO vor der Zahlung angewendet
- Es gibt keinen allgemeinen Mechanismus, ihn über eine Steuererklärung zurückzuholen
- Steuerabkommen-Befreiungen gelten nicht für DASP

Der praktische Schritt ist sicherzustellen, dass keine Super zurückbleibt. Auch bei 65 % ist die Beantragung eines kleinen Guthabens besser, als es liegen zu lassen. [Kontaktiere unser Team](/de/superannuation) und wir identifizieren alle Fonds, die Super für dich halten - so erfasst der DASP-Antrag jeden Dollar.

[Kontaktiere unser Team](/de/contact), um deinen DASP-Antrag zu bearbeiten, jeden Superfonds mit deinen Beiträgen zu finden und deine Auszahlung im Ausland zu erhalten.
 `,
  },

  'what-happens-to-unclaimed-super': {
    title: 'Was passiert mit deiner Super, wenn du sie nie beantragst?',
    description: 'Nicht beantragte Super wird nach 6 Monaten ans ATO übertragen. Hier erfährst du, wie du sie immer noch zurückbekommen kannst.',
    body: `
Nicht beantragte Super verschwindet nicht. Nach einer Phase der Inaktivität überweist der Superfonds das Guthaben ans ATO, wo es gegen deine Tax File Number als nicht beantragtes Geld gehalten wird. Du kannst es immer noch über den Standard-DASP-Prozess (Departing Australia Superannuation Payment) beantragen - auch nachdem es übertragen wurde. Die 65 %-DASP-Quellensteuer gilt weiterhin. Unser Team kümmert sich um Anträge sowohl für Super bei Fonds als auch beim ATO.

## Wann wird Super "nicht beantragt"?

Ein Superfonds ist verpflichtet, dein Guthaben ans ATO zu überweisen, wenn:

- Der Fonds dich nicht kontaktieren kann (Post zurückgeschickt, keine Antwort auf Mitteilungen)
- Du Australien dauerhaft verlassen hast und nicht innerhalb einer definierten Zeit beantragt hast
- Dein Konto mehrere Jahre lang inaktiv war
- Ein DASP-Antrag versucht wurde, aber nicht ausgezahlt werden konnte

Sobald übertragen, liegt das Guthaben beim ATO als nicht beantragte Super gegen deine TFN. Es verschwindet nicht.

## Kannst du es trotzdem beantragen, nachdem es ans ATO übertragen wurde?

Ja. Der DASP-Prozess gilt weiterhin:

- Du beantragst über denselben DASP-Mechanismus
- Die 65 %-Quellensteuer für Working Holiday Maker gilt weiterhin
- Die Zahlung kommt vom ATO statt vom Fonds
- Der Prozess und Zeitplan sind ähnlich wie bei direkter Beantragung vom Fonds

Egal ob deine Super in einem Fonds oder beim ATO sitzt - unser Team kümmert sich um beide als Teil eines einzigen DASP-Antrags.

## Wie findest du heraus, ob deine Super ans ATO übertragen wurde?

Wenn wir einen DASP-Antrag einreichen, machen wir automatisch:

- Suche bei Fonds anhand deiner TFN
- Prüfung der ATO-Aufzeichnungen auf nicht beantragtes Superguthaben
- Identifizierung jedes Kontos, das mit deiner TFN verknüpft ist
- Einreichung von Anträgen gegen alle Guthaben, damit nichts unberücksichtigt bleibt

Du musst das nicht selbst untersuchen. [Schick uns deine Daten](/de/superannuation) und wir machen die vollständige Suche.

## Verdient deine Super Zinsen, während sie beim ATO liegt?

Das ATO zahlt auf nicht beantragtes Superguthaben einen kleinen Zinsbetrag, der grob mit der Inflation Schritt halten soll. Allerdings:

- Die Anlagerenditen sind minimal im Vergleich zu dem, was ein Fonds erwirtschaftet hätte
- Je länger deine Super beim ATO sitzt, desto mehr Wachstumschance verpasst du
- Das ist ein praktischer Grund, eher früher als später zu beantragen

## Das Fazit für Working Holiday Maker

Beantrag deine Super. Es ist dein Geld, das zusätzlich zu deinem Lohn als Teil deiner Anstellung in Australien gezahlt wurde. Auch nach der 65 %-DASP-Steuer bekommst du 35 % des Guthabens. Für jemanden, der sechs Monate gearbeitet hat, können das mehrere Tausend Dollar sein. Die meisten Working Holiday Maker, denen wir helfen, holen einen Betrag zurück, der den Antragsprozess deutlich wert ist.

[Kontaktiere unser Team](/de/contact), um deinen DASP-Antrag zu bearbeiten, jeden Superfonds mit deinen Beiträgen zu finden und deine Auszahlung im Ausland zu erhalten.
 
## ATO-verwahrte Super beanspruchen, Schritt für Schritt

Vor mehr als 6 Monaten abgereist? Dein Guthaben wurde wahrscheinlich als Unclaimed Super an die ATO übertragen. Die Suche ist simpel: Ein registrierter Agent (oder myGov, falls der Zugang überlebt hat) prüft ATO-verwahrte Guthaben gegen deine TFN in Minuten. Der Antrag selbst ist ein DASP-Antrag an die ATO statt an den Fonds - gleiche 65 % WHM-Steuer, gleiche Unterlagen, oft schneller, weil die Fonds-Identitätsschleife entfällt. Es gibt keine Frist: Backpacker von 2015 beanspruchen heute erfolgreich. Das Geld liegt gebührenfrei - anders als im Fonds, wo Versicherungsprämien und Verwaltungsgebühren es die ganze Zeit angeknabbert hätten.
`,
  },

  'can-you-withdraw-super-in-australia': {
    title: 'Kannst du deine Super zurückziehen, während du noch in Australien bist?',
    description: 'Im Normalfall nein - DASP kannst du erst beantragen, nachdem du Australien verlassen hast. Welche seltenen Ausnahmen es gibt und wann sie für WHM gelten.',
    body: `
Nein, du kannst deine Super nicht abheben, während du noch in Australien auf einem gültigen Working Holiday Visum bist. Der Departing Australia Superannuation Payment (DASP)-Prozess ist speziell für Leute gemacht, die Australien dauerhaft verlassen haben und deren Visum abgelaufen oder gekündigt ist. Du musst zuerst abreisen, dann von außerhalb Australiens beantragen. Unser Team kümmert sich um DASP-Anträge remote, damit du aus deinem Heimatland beantragen kannst.

## Warum kannst du nicht früher auf deine Super zugreifen?

Die australische Super ist als langfristiges Altersvorsorgesystem konzipiert:

- Die Regeln zum vorzeitigen Zugang sind strikt und gelten für alle Arbeiter
- Es gibt kein generelles Recht, früher auf Super zuzugreifen, weil du bald Australien verlässt
- Der DASP-Prozess ist der einzige legale Mechanismus für temporäre Visuminhaber, abzuheben

Die Regeln existieren, um die Integrität des Supersystems zu wahren. Sie gelten gleichermaßen für Staatsbürger, Residenten und temporäre Visuminhaber.

## Was sind die Bedingungen für DASP-Berechtigung?

Um für DASP berechtigt zu sein, musst du alle folgenden erfüllen:

- Ein temporäres australisches Visum gehalten haben (Working Holiday Visa 417 und 462 sind berechtigt)
- Australien dauerhaft verlassen haben
- Dein Visum muss nach der Abreise abgelaufen oder gekündigt sein
- Du musst von außerhalb Australiens beantragen

Ein DASP-Antrag, der eingereicht wird, während du noch in Australien auf einem gültigen Working Holiday Visum bist, wird abgelehnt.

## Was solltest du tun, wenn du bald Australien verlässt?

Bereite dich vor, beantrage dann nach der Abreise:

1. Sammle deine Superfondsdaten (Fondsname, Mitgliedsnummer, Kontonummer), bevor du abreist
2. Bestätige deine Bankkontodaten für den Empfang der Zahlung
3. Aktualisiere deine Kontaktdaten bei jedem Fonds (E-Mail-Adresse, die du weiterhin nutzt)
4. Nach Abreise und Visaablauf, [kontaktiere unser Team](/de/superannuation), um den DASP einzureichen

Wir kümmern uns um alles, sobald du Australien verlassen hast und dein Visum abgelaufen ist.

## Was ist mit finanzieller Notlage?

Es gibt Härtefall- und Notlageregelungen im australischen Superrecht, aber sie:

- Haben sehr enge Berechtigungskriterien
- Sind fast nie für Working Holiday Visuminhaber unter normalen Umständen verfügbar verfügbar
- Erfordern Belege echter Notlage unter strikten Definitionen

Working Holiday Maker sollten mit dem DASP-Prozess planen, statt vorzeitigen Zugang zu erwarten.

## Wann kannst du tatsächlich DASP beantragen?

Das DASP-Fenster öffnet, sobald beide Bedingungen erfüllt sind:

- Du hast Australien dauerhaft verlassen
- Dein Working Holiday Visum ist abgelaufen oder gekündigt

Für Working Holiday Visa heißt das typischerweise:

- Nach dem Visaablaufdatum (ein Jahr nach Bewilligung, plus eventuelle Visaverlängerungen)
- Nach Visakündigung (falls du es bei der Abreise vorzeitig kündigst)

Siehe unseren detaillierten Artikel zu [wie du DASP beantragst](/de/blog/how-to-apply-for-super-back) für alles, was du nach Verlassen Australiens tun musst.

[Kontaktiere unser Team](/de/contact), um deinen DASP-Antrag zu bearbeiten, jeden Superfonds mit deinen Beiträgen zu finden und deine Auszahlung im Ausland zu erhalten.
 
## Die "Early-Release"-Angebote sind Betrug - das Erkennungszeichen

Wer anbietet, deine Super während des Australien-Aufenthalts zu "entsperren", betreibt ein illegales Frührelease-Schema: gefälschte Härtefall- oder Ausreiseanträge, 20-40 % Provision, und Steuer plus Strafen bleiben bei dir hängen, wenn die ATO zurückdreht. Die legalen Frühzugänge (schwere Härte, Compassionate Release, terminale Krankheit) sind eng, dokumentiert und laufen direkt über die Fonds - ohne Mittelsmänner. Für Working Holiday Maker bleibt der echte Weg der unspektakuläre: ausreisen, Visum enden lassen, [DASP beantragen](/de/blog/what-is-dasp-super-withdrawal), sauber die rund 35 Cent pro Dollar erhalten.
`,
  },

  'how-to-find-lost-superannuation': {
    title: 'Wie du verlorene oder nicht beantragte Super in Australien findest',
    description: 'Vergessene Super von einem alten Job? Über myGov und das ATO-Superregister findest du jeden Cent. So holst du dir verlorene Beiträge zurück.',
    body: `
Um verlorene oder nicht beantragte Super in Australien zu finden, arbeite mit unserem Team. Unter Aufsicht eines registrierten Steueragenten können wir über alle großen Superfonds und ATO-Aufzeichnungen mit deiner Tax File Number suchen, um jedes Konto zu identifizieren, das deine Super hält. Working Holiday Maker sammeln oft Super über mehrere Fonds an, ohne es zu wissen - und jedes Konto vor dem DASP-Antrag aufzuspüren, stellt sicher, dass kein Geld zurückbleibt.

## Warum geht Super verloren oder verteilt sich auf mehrere Konten?

Die meisten Working Holiday Maker landen mit Super in mehr als einem Fonds:

- Jeder Arbeitgeber hat eventuell einen anderen Standardfonds verwendet, wenn du keinen genannt hast
- Wechsel zwischen Jobs ohne Wahl eines einzelnen Fonds schafft jedes Mal neue Konten
- Adresswechsel führen dazu, dass Fonds den Kontakt verlieren und Konten inaktiv werden
- Inaktive Konten werden irgendwann ans ATO als nicht beantragte Super überwiesen

Für Working Holiday Maker, die oft umziehen, ist das ein echtes Risiko. Es vor der Abreise aus Australien zu erkennen, ist viel einfacher, als es aus dem Ausland zurückzuholen.

## Wie spüren wir all deine Superkonten auf?

Unser Team kann mit deiner TFN eine umfassende Suche machen:

- Suche über große australische Superfonds
- Prüfung der ATO-Aufzeichnungen auf nicht beantragtes Superguthaben
- Identifizierung jedes Kontos, das mit deiner TFN verknüpft ist
- Abgleich mit den Arbeitgebern, für die du gearbeitet hast

Du bekommst ein komplettes Bild jedes Superdollars, der in deinem Namen gehalten wird - egal in welchem Fonds er liegt oder ob er ans ATO übertragen wurde. [Kontaktiere uns](/de/superannuation) und wir machen die Suche für dich.

## Was ist mit der Zusammenführung mehrerer Konten?

Wenn du Super über mehrere Fonds verteilt hast, vereinfacht die Zusammenführung in ein einzelnes Konto vor deinem DASP-Antrag den Prozess:

- Ein DASP-Antrag statt mehrerer
- Eine Zahlung statt mehrerer
- Ein Verifizierungsprozess statt vieler
- Weniger Verwaltungsaufwand

Wir können die Zusammenführung vor Einreichung des DASP-Antrags verwalten - oder separate Anträge für jeden Fonds einreichen, falls das schneller ist. Beide Ansätze funktionieren. Wir wählen den richtigen Ansatz basierend auf deinen spezifischen Konten.

## Warum solltest du das Beantragen nicht verzögern?

Beim ATO gehaltene Super erwirtschaftet minimale Renditen:

- Das Anlagewachstum verlorener Super ist deutlich niedriger als bei aktiven Fondsrenditen
- Je länger du wartest, desto weniger wächst das Guthaben
- ATO-Aufzeichnungen älterer Konten lassen sich nach mehreren Jahren schwerer zurückholen
- Die Identitätsprüfung wird schwieriger, je länger du weg bist

Wenn du planst, Australien bald zu verlassen, oder schon abgereist bist, [kontaktiere unser Team](/de/superannuation). Wir stellen sicher, dass jeder Dollar deiner Super identifiziert und in deinen DASP-Antrag aufgenommen wird.

## Welche Unterlagen helfen uns, deine Super zu finden?

Je mehr wir über deine Beschäftigungshistorie wissen, desto vollständiger die Suche. Nützliche Informationen:

- Alle australischen Arbeitgeber, für die du gearbeitet hast (Firmennamen)
- Ungefähre Beschäftigungsdaten für jeden Job
- Alle Superfondsnamen, die du dir merkst
- Alle Superfondsbriefe oder E-Mails, die du bekommen hast
- Deine TFN (die wir nutzen, um Aufzeichnungen abzufragen)

Wenn du nicht alles hast, ist das okay. Wir können die meisten Konten allein mit deiner TFN und deinen Reisepassdaten finden.

[Kontaktiere unser Team](/de/contact), um deinen DASP-Antrag zu bearbeiten, jeden Superfonds mit deinen Beiträgen zu finden und deine Auszahlung im Ausland zu erhalten.
 
## Warum Backpacker Fonds verlieren (und die 3-Minuten-Rettung)

Jeder Arbeitgeber, der nie nach deiner Fondswahl gefragt hat, hat ein Default-Konto auf deinen Namen eröffnet - drei Jobs können drei Fonds bedeuten, die alle ihre Post an das Hostel schicken, das du im März verlassen hast. Die Rettung: Eine TFN-Suche fördert jedes Konto zutage (Agent oder myGov), inklusive bereits zur ATO verschobener Guthaben. Danach: vor dem DASP in einen Fonds konsolidieren oder jeden separat beanspruchen. Mach die Suche möglichst vor der Abreise - solange myGov funktioniert und deine Nummer noch SMS-Codes empfängt.
`,
  },

  'how-to-choose-super-fund': {
    title: 'Was ist ein Superfonds und wie wählst du einen?',
    description: 'Wenn du in Australien anfängst zu arbeiten, kannst du deinen Superfonds wählen. Im Folgenden erfährst du, worauf du achten solltest.',
    body: `
Für Working Holiday Maker ist die Wahl des Superfonds weniger wichtig als für einen australischen Residenten, der Altersvorsorge aufbaut. Du wirst deine Super über den DASP-Prozess zurückbekommen, wenn du Australien verlässt - die Prioritäten sind also Einfachheit und Zugänglichkeit, nicht langfristige Anlagerendite. Der einfachste Ansatz: nenne einen Fonds bei deinem ersten Job und bleib bei ihm für jede weitere Stelle. Unser Team kann helfen, deine Super-Einstellung zu wählen und zu verwalten, damit der eventuelle DASP-Antrag einfach wird.

## Was ist ein Superfonds?

Ein Superfonds ist ein Anlagevehikel, das deine Altersvorsorge in Australien hält. Wichtige Fakten:

- Dein Arbeitgeber zahlt 12 % deines Lohns in den Fonds ein (zusätzlich zu deinem Lohn, nicht abgezogen)
- Der Fonds investiert diese Beiträge für dich
- Das Guthaben wächst über Zeit durch Beiträge und Anlagerenditen
- Für Working Holiday Maker wird das Guthaben über [DASP](/de/blog/what-is-dasp-super-withdrawal) zurückgefordert, wenn du abreist

Australien hat Hunderte verschiedener Superfonds. Als Working Holiday Maker musst du sie nicht im Detail recherchieren.

## Wie sollten Working Holiday Maker einen Fonds wählen?

Drei praktische Überlegungen sind wichtig:

- **Online-Zugang**: ein klares Mitgliederportal, wo du dein Guthaben prüfen kannst
- **Reputation bei der DASP-Bearbeitung**: manche Fonds bearbeiten DASP-Anträge schneller als andere
- **Einfache Identitätsprüfung**: Fonds, die internationale Identitätsprüfung gut handhaben

Große Industriefonds und große Retail-Fonds erfüllen meistens alle drei Kriterien. Für Working Holiday Maker ist es richtig, einen bekannten Fonds zu wählen und ihn konsequent zu nutzen.

## Was passiert, wenn du keinen Fonds nennst?

Wenn du beim Jobantritt keinen Fonds nennst:

1. Dein Arbeitgeber prüft auf einen "Stapled Fund" (jeder Fonds, der mit deiner TFN aus früherer Arbeit verknüpft ist)
2. Wenn du einen Stapled Fund hast, gehen Beiträge dorthin
3. Wenn nicht, nutzt der Arbeitgeber seinen Standardfonds

Das ist in der Praxis okay, kann aber zu Super in mehreren Fonds führen, wenn du für mehrere Arbeitgeber arbeitest. Je mehr Fonds, desto mehr DASP-Anträge brauchst du später (oder desto mehr Konsolidierungsarbeit, um sie zu kombinieren).

## Was ist der einfachste Ansatz für Working Holiday Maker?

Die sauberste Einstellung:

1. Beim ersten Job nenne einen Fonds (jeder große Fonds funktioniert)
2. Bei jedem weiteren Job gib dieselben Fondsdaten auf deinem Super-Nominierungsformular an
3. Alle Beiträge landen an einem Ort
4. Wenn du Australien verlässt, beansprucht ein DASP-Antrag alles

Wenn du bereits Super in mehreren Fonds angesammelt hast, können wir helfen, sie zu konsolidieren oder separate DASP-Anträge zu verwalten. [Kontaktiere unser Team](/de/superannuation) und wir finden den besten Weg für deine spezifische Situation.

[Kontaktiere unser Team](/de/contact), um deinen DASP-Antrag zu bearbeiten, jeden Superfonds mit deinen Beiträgen zu finden und deine Auszahlung im Ausland zu erhalten.
 
## Die Backpacker-Fonds-Checkliste (fünf Minuten, tausende Dollar)

- **Gebühren zuerst**: Renditeunterschiede sind bei einem Jahr fast egal - aber fixe Wochengebühren fressen kleine Guthaben auf; prozentuale Low-Fee-Fonds bevorzugen
- **Default-Versicherung kündigen**: Lebens- und BU-Prämien leeren ein Backpacker-Konto für Schutz, den du nie beanspruchst; in der App abwählen
- **DASP-Erfahrung**: große Industry-Fonds wickeln Abreisen routiniert ab; obskure Default-Fonds sind der Ort, wo Anträge stecken bleiben
- **Immer ein Fonds**: jedem Arbeitgeber dieselben Daten geben - [Konsolidierung vor dem DASP](/de/blog/super-multiple-funds-consolidation) ist vermeidbarer Aufwand

Wer nichts tut, bekommt den Arbeitgeber-Default plus Stapling - funktioniert, ist aber meist der teuerste Weg.
`,
  },

  'super-for-casual-and-part-time-workers': {
    title: 'Haben Casual- und Teilzeitarbeiter in Australien Anspruch auf Super?',
    description: 'Ja - alle Arbeitnehmer in Australien haben Anspruch auf Super, egal ob Casual, Teilzeit oder Vollzeit. Aktuelle Sätze, Grenzen und was du als WHM erwarten kannst.',
    body: `
Ja, Casual- und Teilzeitarbeiter in Australien haben Anspruch auf Superbeiträge von ihrem Arbeitgeber. Die 450 $-Monatseinkommensschwelle wurde im Juli 2022 abgeschafft - also muss jetzt [Super](/de/superannuation) auf alle Löhne ab dem allerersten Dollar gezahlt werden. Das gilt für Working Holiday Maker genauso wie für australische Arbeiter. Der aktuelle Supersatz ist 12 % deiner Ordinary Time Earnings (ab 1. Juli 2025), zusätzlich zu deinem Lohn gezahlt.

## Was ist die aktuelle Einkommensschwelle für Super?

Es gibt keine monatliche Einkommensschwelle mehr:

- Vor Juli 2022: Super nur zahlbar, wenn du 450+ $ in einem Kalendermonat verdient hast
- Ab Juli 2022: Super auf alle Löhne zahlbar, ab dem ersten Dollar
- Gilt für alle Angestellten ab 18 Jahren
- Gilt für Unter-18-Jährige, die mehr als 30 Stunden pro Woche arbeiten

Diese Änderung kam besonders Working Holiday Makern zugute, die oft unregelmäßige Stunden arbeiten und in ruhigen Wochen vielleicht keine 450 $ erreicht hätten.

## Gilt das für Casualarbeiter?

Ja, Casual-Arbeiter erhalten Super genau wie feste Angestellte:

- Eine Schicht pro Woche → Super auf diese Einkünfte gezahlt
- Fünf Schichten pro Woche → Super auf diese Einkünfte gezahlt
- Variable Stunden Woche zu Woche → Super auf was auch immer du verdient hast

Als Casual angestellt zu sein, befreit deinen Arbeitgeber nicht von der Super-Pflicht. Der Stundensatz, den du bekommst (mit 25 % Casual Loading), ist separat von der Super-Verpflichtung.

## Was ist mit Teilzeitarbeitern?

Dieselben Regeln gelten:

- 20 Stunden pro Woche arbeiten: 12 % Super auf deinen Lohn gezahlt
- 30 Stunden pro Woche arbeiten: 12 % Super auf deinen Lohn gezahlt
- Mix aus regulären Stunden und Überstunden: 12 % auf den regulären Anteil

Der Super-Prozentsatz ist derselbe, egal ob du Teilzeit, Vollzeit oder Casual bist. Nur der absolute Dollarbetrag unterscheidet sich (weil deine Löhne sich unterscheiden).

## Wie kannst du prüfen, ob dein Arbeitgeber Super zahlt?

Mehrere Wege:

- Prüfe deinen Lohnzettel (Super sollte als Posten erscheinen, getrennt vom Lohn)
- Logge dich in deinen Superfonds ein und schau die Beitragshistorie an
- Verfolge die Beiträge anhand der vierteljährlichen Zahlungsfristen (28. Oktober, 28. Januar, 28. April, 28. Juli)

Wenn Beiträge fehlen oder unter 12 % deines Lohns liegen, [kontaktiere unser Team](/de/contact). Wir können ermitteln und die Rückforderung über den Superannuation Guarantee Charge (SGC)-Prozess verfolgen.

## Kannst du deine Super beim Verlassen Australiens zurückbekommen?

Ja. Über den Departing Australia Superannuation Payment (DASP)-Prozess:

- Verfügbar, nachdem dein Visum abläuft und du Australien verlassen hast
- Wir kümmern uns um den Antrag für dich
- 65 % Quellensteuer gilt auf die steuerpflichtige Komponente
- Nettobetrag wird auf dein angegebenes Bankkonto gezahlt

Auch kleine Superguthaben aus kurzen Casualarbeitsphasen sind es wert, beansprucht zu werden. Wir bündeln Guthaben aus mehreren Fonds in einem DASP-Paket. Siehe unseren Artikel zu [wie du DASP beantragst](/de/blog/how-to-apply-for-super-back).

## Welche Unterlagen helfen, deine Super zu verfolgen?

Bewahre auf:

- Jeden Lohnzettel mit dem Superposten
- Vierteljährliche Superfondsauszüge
- Notizen zu deinen Start- und Enddaten bei jedem Arbeitgeber
- Arbeitgeber-ABNs (für eventuelle Rückforderungsansprüche)

Wenn wir deine Super verwalten und deinen DASP-Antrag einreichen, machen vollständige Unterlagen den Prozess schneller und genauer.
 
## Die abgeschaffte 450-$-Regel: Geld, das ältere Backpacker noch übersehen

Bis 1. Juli 2022 schuldeten Arbeitgeber keine Super für Monate unter 450 $ bei ihnen - Casual-Backpacker mit verstreuten Schichten verloren dadurch legal echtes Geld. Die Schwelle ist weg: Seitdem sammelt jeder Dollar regulären Lohns die Garantie, egal wie klein der Monat. Zwei Konsequenzen: Wer jetzt arbeitet - selbst eine einzelne Probewoche erzeugt Super-Pflicht; prüfen, dass sie ankommt. Wer auch vor 2022 in Australien war - alte Lücken in schwachen Monaten können rechtmäßig sein (damals legal), Lücken nach Mitte 2022 sind [rückholbare Unterbezahlung](/de/blog/super-employer-not-paying-what-to-do). Ausnahme bleiben unter 18-Jährige - dort braucht es weiter 30+ Wochenstunden.
`,
  },

  'how-to-check-super-balance-working-holiday': {
    title: 'Wie du dein Superguthaben als Working Holiday Maker prüfst',
    description: 'Super-Guthaben prüfen mit myGov, ATO-Online-Services oder direkt beim Fonds. So findest du heraus, wie viel dir Arbeitgeber wirklich eingezahlt haben.',
    body: `
Um dein Superguthaben als Working Holiday Maker zu prüfen, logge dich im Online-Mitgliederportal deines Superfonds mit deiner Mitgliedsnummer und deinem Passwort ein. Dein Fonds schickt dir diese Daten, wenn dein Konto eröffnet wird. Super wird vierteljährlich von Arbeitgebern gezahlt, sodass Beiträge innerhalb weniger Tage nach den Quartalsfristen (28. Januar, 28. April, 28. Juli, 28. Oktober) in deinem Fonds erscheinen. Wenn du Super über mehrere Fonds hast oder deine Kontodaten nicht findest, kann unser Team jedes mit deiner TFN verbundene Konto finden.

## Warum ist es wichtig, dein Superguthaben zu prüfen?

Super sammelt sich in einem separaten Konto an, das nicht auf deinen Kontoauszügen erscheint:

- Es wird vom Arbeitgeber zusätzlich zu deinem Lohn gezahlt
- Es geht direkt in deinen Superfonds
- Leicht zu vergessen oder zu verlieren
- Kritisch zu wissen, bevor du Australien verlässt

Wenn du nicht prüfst, übersiehst du möglicherweise:

- Fehlende oder unterbezahlte Beiträge
- Mehrere Konten über verschiedene Fonds
- Erhebliche Gesamtguthaben, die du vor der Abreise abheben kannst

Die meisten Working Holiday Maker, denen wir helfen, haben mehr Super angesammelt, als ihnen bewusst war - oft mehrere Tausend Dollar aus einem Jahr Arbeit.

## Wie wird Super von Arbeitgebern gezahlt?

Australische Arbeitgeber zahlen Super nach einem Quartalsplan:

- **Q1 (Juli-September)**: fällig bis 28. Oktober
- **Q2 (Oktober-Dezember)**: fällig bis 28. Januar
- **Q3 (Januar-März)**: fällig bis 28. April
- **Q4 (April-Juni)**: fällig bis 28. Juli

Beiträge erscheinen innerhalb weniger Tage nach diesen Daten in deinem Fonds. Wenn ein Quartal vergangen ist und nichts angekommen ist, zahlt dein Arbeitgeber möglicherweise nicht, was er schuldet.

## Wie greifst du auf dein Superfondskonto zu?

Als du mit der Arbeit angefangen hast, hat dein Arbeitgeber nach deinen Superfondsdaten gefragt:

- Wenn du einen Fonds genannt hast, sind Beiträge dorthin gegangen
- Wenn nicht, wurde ein Konto beim Standardfonds des Arbeitgebers eröffnet

Dein Fonds schickt Mitgliederdaten, wenn dein Konto eröffnet wird:

- Mitgliedsnummer
- Passwort oder Anmeldedaten
- Willkommensdokumente mit Kontoinformationen
- Meistens per E-Mail; manchmal per Post

Wenn du diese Daten nicht findest:

- Suche in deiner E-Mail nach dem Namen des Fonds (HostPlus, REST, AustralianSuper, etc.)
- Prüfe deinen Lohnzettel auf den Fondsnamen und die Nummer
- [Kontaktiere unser Team](/de/contact) und wir finden das Konto

## Wie prüfst du dein Guthaben online?

Sobald du deine Anmeldung hast:

1. Gehe auf die Website deines Superfonds
2. Logge dich mit deiner Mitgliedsnummer ein
3. Schaue dir dein aktuelles Guthaben an
4. Prüfe die Beitragshistorie (jeder Arbeitgeberbeitrag sollte aufgelistet sein)
5. Prüfe die Daten, an denen Beiträge erschienen sind

Du kannst genau sehen, was jeder Arbeitgeber gezahlt hat und wann. Das ist kritisch zur Identifizierung fehlender oder unterbezahlter Beiträge.

## Was, wenn du nicht weißt, in welchem Fonds du bist?

Häufig bei Working Holiday Makern, die Jobs gewechselt haben:

- Mehrere Arbeitgeber haben eventuell verschiedene Standardfonds eröffnet
- Alte Super wurde eventuell ans ATO als nicht beantragtes Geld überwiesen
- Du hast eventuell Super, von der du nichts weißt

Unser Team kann jedes Superkonto finden, das mit deiner TFN verbunden ist:

- Suche über alle großen australischen Superfonds
- Prüfung der ATO-Aufzeichnungen auf nicht beantragte Super
- Identifizierung jedes Guthabens, das du über DASP beantragen kannst

[Schick uns deine Daten](/de/superannuation) und wir machen eine umfassende Suche. Das ist Teil unseres Standard-DASP-Service.

## Wie prüfst du auf unbezahlte Super?

Wenn Beiträge aus deinem Fonds fehlen:

1. Prüfe den Quartalsplan (oben), um zu bestätigen, dass das Timing stimmt
2. Vergleiche mit dem Superposten auf deinen Lohnzetteln
3. Sprich das Problem zuerst mit deinem Arbeitgeber an
4. Bei ungelöst, [kontaktiere unser Team](/de/contact)

Unser Team kann unbezahlte Super über den Superannuation Guarantee Charge (SGC)-Prozess verfolgen. Wir haben für Working Holiday Maker erhebliche unbezahlte Super zurückgeholt - besonders in der Gastronomie und Landwirtschaft.

## Was solltest du vor dem DASP-Antrag prüfen?

Vor Einreichung deiner [DASP-Superauszahlung](/de/blog/what-is-dasp-super-withdrawal):

- Bestätige, dass alle erwarteten Beiträge erschienen sind
- Stelle sicher, dass das letzte Quartal gezahlt wurde (falls du nach Quartalsende abgereist bist)
- Finde Konten, von denen du nichts mehr weißt
- Hole vor DASP-Antrag unbezahlte Super zurück

Wir machen diese Prüfung als Teil jedes DASP-Antrags, den wir einreichen. Sie stellt sicher, dass kein Geld zurückbleibt.

## Welche Unterlagen helfen uns, deine Super zu prüfen?

Um jedes Konto zu finden:

- Deine TFN
- Liste aller australischen Arbeitgeber, für die du gearbeitet hast
- Ungefähre Beschäftigungsdaten
- Alle Superfondsbriefe oder E-Mails, an die du dich erinnerst
- Lohnzettel, die Superposten zeigen

Auch mit Teilinformationen können wir meistens jedes Konto über die mit deiner TFN verknüpften ATO-Aufzeichnungen finden.
 
## Kontostand in 2 Minuten prüfen (myGov oder Fonds-App)

Drei Wege: (1) die Fonds-App (am schnellsten - Guthaben, Eingänge, Versicherungsprämien sichtbar), (2) myGov mit ATO-Link (alle Fonds plus ATO-verwahrte Beträge, TFN-basiert), (3) Agentenabfrage (für Rückkehrer und myGov-Ausgesperrte). Worauf schauen: Kommen die Arbeitgeberbeiträge quartalsfristgerecht? Nagt eine [Default-Versicherung](/de/blog/how-to-choose-super-fund) am Guthaben? Existiert ein Fonds, von dem du nichts wusstest? Diese 2 Minuten einmal vor der Abreise machen die [DASP-Unterlagen](/de/blog/how-to-apply-for-super-back) dramatisch einfacher.
`,
  },

  'dasp-documents-required': {
    title: 'Welche Dokumente brauchst du für einen DASP Superauszahlungsantrag?',
    description: 'Für den DASP-Antrag brauchst du Reisepass, TFN, Visumdetails und Super-Fondsinfos. Komplette Dokumentenliste, die wir für Working Holiday Maker zusammenstellen.',
    body: `
Ein Antrag für die Departing Australia [Superannuation](/de/superannuation) Payment (DASP) erfordert Identitätsnachweis, Nachweis, dass dein Working Holiday Visum abgelaufen oder gekündigt wurde, und Nachweis, dass du Australien verlassen hast. Die spezifischen Dokumente sind dein Reisepass, deine Visabewilligungs- oder Kündigungsmitteilung und deine Abreiseaufzeichnung vom Department of Home Affairs. Ohne alle drei wird der Superfonds deine Super nicht freigeben.

Der DASP-Prozess ist einer der dokumentenintensivsten Anträge, mit denen ein Working Holiday Maker konfrontiert wird, und fehlende oder falsche Papiere sind die häufigste Ursache für Verzögerungen, die einen einmonatigen Antrag auf sechs Monate verlängern.

## Die drei Kernanforderungen

Um eine DASP freizugeben, muss der Superfonds bestätigen:

1. **Identität**: eine beglaubigte Kopie deines Reisepasses (derselbe, der auf dem Visum genutzt wurde)
2. **Visastatus**: offizielle Bestätigung vom Department of Home Affairs, dass dein Visum abgelaufen, gekündigt oder anderweitig beendet ist
3. **Abreise**: offizielle Bestätigung, dass du Australien verlassen hast

Jeder Fonds hat leicht unterschiedliche Anforderungen, wie diese dokumentiert werden, und manche Fonds haben zusätzliche Anforderungen wie Adressnachweis im Ausland oder eine Steuererklärung. Der Prozess muss für jeden Superfonds, in dem du Beiträge hast, separat wiederholt werden.

## Reisepass- und Identitätsanforderungen

Der Reisepass, der auf deinem Working Holiday Visum genutzt wurde, muss derjenige sein, den du für den DASP-Antrag angibst. Wenn du deinen Reisepass seit der Ankunft in Australien erneuert hast, müssen beide Reisepässe vorgelegt werden, um die Identitätskette zu zeigen. Beglaubigte Kopien sind in der Regel erforderlich, mit Beglaubigung durch einen australischen Notar, einen JP oder einen designierten Beamten in deinem Heimatland.

Manche Fonds akzeptieren digitale Identitätsprüfung über Dienste wie ZipID oder die eigenen Verifizierungstools des ATO - das vermeidet Papierbeglaubigung. Wir veranlassen, wo möglich, eine digitale Verifizierung, um den Antrag zu beschleunigen.

## Visaablauf- oder Kündigungsbestätigung

Der Fonds braucht Belege vom Home Affairs, dass dein Visum geendet hat. Es gibt drei häufige Formen von Belegen:

- Visabewilligungsmitteilung mit dem Ablaufdatum (falls das Visum schon abgelaufen ist)
- Kündigungsmitteilung, falls das Visum vor Ablauf gekündigt wurde
- VEVO-Auszug (Visa Entitlement Verification Online), der den aktuellen Visastatus als abgelaufen zeigt

VEVO-Auszüge sind am häufigsten, weil sie den aktuellen Live-Status zeigen, aber sie müssen generiert werden, nachdem das Visum tatsächlich abgelaufen ist.

## Abreiseaufzeichnung

Das Department of Home Affairs hält eine Bewegungsaufzeichnung über jede Ein- und Ausreise nach/aus Australien. Der DASP-Antrag braucht Belege, dass du Australien zum letzten Mal auf deinem aktuellen Visum verlassen hast. Fonds akzeptieren typischerweise:

- Eine Bewegungsaufzeichnung von Home Affairs
- Eine Kopie deiner Abreise-Bordkarte plus Ausreisestempel im Reisepass
- Einen Einreisestempel in ein anderes Land, der nach deinem australischen Visaablauf datiert ist

Die Abreise muss nach dem Visaablauf sein. Eine Abreise vor Ablauf (also "Fly-out und Rückkehr") löst keine DASP-Berechtigung aus.

## Was am häufigsten schiefläuft

Die häufigsten DASP-Ablehnungen, die wir sehen:

- Reisepassdaten im Antrag stimmen nicht mit dem Superfondsdatensatz überein
- Visaablaufdatum falsch eingegeben
- Abreisedatum vor dem Visaablaufdatum
- Identitätsbeglaubigung vom Fonds nicht akzeptiert
- Antrag bei einem Fonds eingereicht, wo der Arbeiter kein Guthaben hat (Arbeitgeberbeiträge wurden in einen anderen Fonds gezahlt)

Der letzte Punkt ist besonders häufig: Arbeitgeber wählen den Superfonds aus, und ein Arbeiter mit drei Arbeitgebern kann Super in drei verschiedenen Fonds haben. Jeder muss aufgespürt und separat beantragt werden. Siehe unseren Artikel zu [verlorene Super finden](/de/blog/how-to-find-lost-superannuation) für unsere Spurensuche.

## Wie kümmert sich unser Service um die DASP-Dokumentation?

Wenn wir einen DASP über unseren Service verwalten:

- Wir identifizieren jeden Superfonds, der während deiner Zeit in Australien Beiträge bekommen hat
- Wir sammeln und verifizieren die Identitätsdokumente, die jeder Fonds verlangt
- Wir holen VEVO-Aufzeichnungen und Bewegungsaufzeichnungen für dich
- Wir reichen den Antrag direkt bei jedem Fonds über das ATO-DASP-System ein
- Wir fragen bei Fonds nach, die nicht im Standardzeitrahmen bearbeiten
- Wir koordinieren die Weiterleitung der Zahlung auf dein Auslandsbankkonto

Der gesamte Prozess wird von Anfang bis Ende abgewickelt, sodass du nicht jeden Fonds einzeln verfolgen musst. [Kontaktiere unser Team](/de/contact), bevor du Australien verlässt - oder sobald du abgereist bist - um deinen DASP-Antrag zu starten.
 
## Beglaubigte Kopien: die Anforderung, die Anträge aus Deutschland ausbremst

Fonds verlangen oberhalb bestimmter Guthaben (häufig 5.000 $) beglaubigte Passkopien - "beglaubigt" heißt: eine autorisierte Person (Notar, australisches Konsulat, vom Fonds akzeptierte lokale Stellen) hat das Original gesehen und gestempelt. Aus einer deutschen Kleinstadt ist das der eine Schritt, der Wochen kostet. Die Auswege nach Wirksamkeit: die Passkopie noch in Australien beglaubigen lassen (Apotheker, Polizist oder JP erledigen es in Minuten, quasi kostenlos), vor jedem Behördengang die akzeptierte Beglaubigerliste des konkreten Fonds prüfen, und wo der Fonds Agent-Verifizierung akzeptiert, [über einen Agenten beanspruchen](/de/blog/how-to-apply-for-super-back), dessen Identitätsprüfung ersetzt. Eine Besorgung vor dem Abflug löscht die schlimmste Verzögerung der ganzen DASP-Kette.
`,
  },

  // ─── More Medicare & Other posts ───────────────────────────────────────────
  'what-is-an-income-statement': {
    title: 'Was ist ein Income Statement in Australien und wie greifst du auf deines zu?',
    description: 'Das Income Statement ersetzt das alte PAYG Payment Summary und zeigt dein Jahreseinkommen plus einbehaltene Steuer. So greifst du als WHM darauf zu.',
    body: `
Ein Income Statement ist die digitale Aufzeichnung, die das Gesamtgehalt zeigt, das dir ein Arbeitgeber gezahlt hat, und die gesamte einbehaltene Steuer für das Steuerjahr. Es hat das alte Papier-PAYG Payment Summary unter Single Touch Payroll (STP) ersetzt. Dein Arbeitgeber meldet die Daten direkt ans ATO über sein Lohn-System, und Income Statements werden zwischen 14. Juli und 31. Juli jedes Jahr abgeschlossen. Unser Team greift direkt über unser Steueragentenportal auf deine Income Statements zu, wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten.

## Wie greifst du auf dein Income Statement zu?

Über unseren Service greifen wir direkt auf deine Income Statements zu. Du musst nicht durch ATO-Onlinedienste navigieren oder deinen Arbeitgebern hinterherlaufen.

Wenn wir deine Steuererklärung einreichen, sehen wir:

- Jeden Arbeitgeber, der im Steuerjahr Einkommen für dich gemeldet hat
- Gesamtbruttolohn von jedem Arbeitgeber
- Gesamte einbehaltene Steuer von jedem Arbeitgeber
- Abschlussstatus (in Bearbeitung oder abgeschlossen)
- Gezahlte Superbeiträge

Das ist einer der Hauptvorteile der Zusammenarbeit mit einem registrierten Steueragenten.

## Wann werden Income Statements verfügbar?

Der Jahreszyklus:

- 30. Juni: Steuerjahr endet
- 1. Juli: Einreichungsfenster öffnet
- 14. Juli: Arbeitgeber beginnen, Income Statements abzuschließen
- 31. Juli: die meisten Arbeitgeber sollten abgeschlossen haben
- Als "Tax Ready" markiert, sobald abgeschlossen

Wenn dein Income Statement nach dem 31. Juli immer noch "Year-to-date" oder "In Progress" zeigt, hat der Arbeitgeber noch nicht abgeschlossen. Wir überwachen das und reichen ein, sobald alle Meldungen tax-ready sind.

## Was, wenn es einen Fehler im Income Statement gibt?

Fehler passieren. Häufige Probleme:

- Gesamtlohn stimmt nicht mit deinen Lohnzetteln überein
- Einbehaltene Steuer ist falsch
- Fehlender Arbeitgeber (hast dort gearbeitet, aber keine Aufzeichnung existiert)
- Falscher Residenzstatus angewendet (30 % statt 15 %)

Wenn wir eine Diskrepanz finden, kontaktieren wir den Arbeitgeber für dich, um die Meldung zu korrigieren. Falls der Arbeitgeber nicht reagiert, können wir mit einer Schätzung einreichen und später korrigieren - oder das Problem über formelle Kanäle eskalieren.

## Was, wenn du für mehrere Arbeitgeber gearbeitet hast?

Alle Arbeitgeber erscheinen separat im Income Statements-Abschnitt:

- Jeder Arbeitgeber hat seine eigene Zeile in den Daten
- Gesamtbrutto und Gesamteinbehaltung werden für jeden gezeigt
- Wir holen alle, wenn wir deine Steuererklärung vorbereiten
- Die kombinierten Summen erscheinen in deiner [Steuererklärung](/de/tax-return)

Einzureichen, ohne jeden Arbeitgeber zu prüfen, ist einer der häufigsten Selbsteinreichungsfehler. Wir gleichen immer das volle Bild ab, bevor wir einreichen.

## Welche Unterlagen solltest du aufbewahren?

Auch wenn Income Statements digital sind, bewahre deine eigenen Kopien auf:

- Alle erhaltenen Lohnzettel im Laufe des Jahres
- Jahresübersichten von deinen Arbeitgebern
- Bankauszüge, die Gehaltseinzahlungen zeigen
- Korrespondenz zu Lohnsätzen oder Anpassungen

Diese helfen uns, das Income Statement gegen das abzugleichen, was tatsächlich gezahlt wurde, und Diskrepanzen vor der Einreichung zu lösen.

[Kontaktiere unser Team](/de/contact) für Hilfe bei Steuer-, [Super](/de/superannuation)- oder Arbeitsplatzfragen während deiner Zeit in Australien.
 
## Die drei Zahlen, die zählen

Statement öffnen und prüfen: **Gross payments** (deckt sich das mit deiner eigenen Jahressumme?), **Tax withheld** (durch Brutto teilen - nahe 15 % ist für WHM-Sätze korrekt), und **Reportable super**, wo ausgewiesen. Vor der Abgabe muss das Statement **"Tax ready"** zeigen - gegen ein nicht finalisiertes Statement einzureichen ist der klassische Weg zum falschen Bescheid. Mehrere Arbeitgeber heißt mehrere Statements; jedes einzelne gehört in dieselbe Erklärung.
`,
  },

  'what-is-the-ato': {
    title: 'Was ist das ATO und was macht es?',
    description: 'Die Australian Taxation Office (ATO) ist Australiens Finanzamt. Hier erfährst du, was es macht und wann du Kontakt haben wirst.',
    body: `
Das Australian Taxation Office (ATO) ist die Bundesbehörde, die für die Verwaltung des australischen Steuersystems zuständig ist. Für Working Holiday Maker ist das ATO die Stelle, die deine TFN ausstellt, Lohn- und Supermeldungen von deinen Arbeitgebern empfängt, deine Steuererklärung bearbeitet und den DASP-Superauszahlungsprozess verwaltet. Die meisten Working Holiday Maker müssen nie direkt mit dem ATO zu tun haben. Unser Team kümmert sich um die gesamte ATO-Kommunikation für dich, auch aus dem Ausland.

## Was macht das ATO?

Das ATO ist verantwortlich für:

- Einkommensteuer, GST und andere Bundessteuern einzuziehen
- Tax File Numbers (TFNs) auszustellen
- Australian Business Numbers (ABNs) über das Australian Business Register auszustellen
- Lohn- und PAYG-Einbehaltungsmeldungen von Arbeitgebern zu empfangen
- Steuererklärungen zu bearbeiten
- Die Superannuation Guarantee im Auftrag von Arbeitern zu verwalten
- Steuer-Compliance und -Rückforderung zu untersuchen
- Das DASP-System (Departing Australia Superannuation Payment) zu betreiben

Für Working Holiday Maker sind die relevantesten ATO-Funktionen die TFN-Ausstellung, die Steuererklärungsbearbeitung und die DASP-Superauszahlung.

## Wie bekommt das ATO Informationen über dich?

Das ATO bekommt Daten über dich automatisch:

- Deine Arbeitgeber melden deine Löhne und PAYG-Steuer über ihre Lohnsoftware (Single Touch Payroll)
- Dein Superfonds meldet Beiträge, die für dich gemacht wurden
- Banken melden Zinsen, die auf australischen Konten gezahlt wurden
- Aktien-Register melden gezahlte Dividenden

Wenn wir deine [Steuererklärung](/de/tax-return) einreichen, gleichen wir die Daten ab, die das ATO schon hat, mit dem, was deine Unterlagen zeigen. Das ATO hat meistens korrekte Informationen, aber Diskrepanzen kommen vor und müssen vor der Einreichung geklärt werden.

## Wann kann das ATO dich kontaktieren?

Die meisten Working Holiday Maker haben nie direkten ATO-Kontakt. Das ATO kann sich melden, wenn:

- Zusätzliche Informationen zur Bearbeitung deiner Steuererklärung gebraucht werden
- Eine Diskrepanz zwischen dem, was du gemeldet hast, und den Arbeitgebermeldungen identifiziert wird
- Du Steuer schuldest, die nicht gezahlt wurde
- Eine Prüfung oder Audit eingeleitet wird (selten bei Working Holiday Makern)
- Eine Rückzahlung wegen einer Identitätsprüfung verzögert ist

Alle legitimen ATO-Kommunikationen gehen entweder über deinen registrierten Steueragenten oder per Post an deine registrierte Adresse. **Das ATO wird nie anrufen und sofortige Zahlung verlangen, Zahlung in Geschenkkarten fordern oder mit Verhaftung drohen**. Diese Anrufe sind Betrug, und sie zielen speziell auf Working Holiday Maker. Leg auf und [kontaktiere unser Team](/de/contact), wenn du einen bekommst.

## Wie kümmert sich unser Team um ATO-Kommunikation?

Wenn du mit uns arbeitest:

- Alle ATO-Kommunikation kommt zuerst zu uns
- Wir übersetzen alle Probleme in einfache Sprache
- Wir antworten für dich
- Wir kümmern uns um Streitigkeiten, Änderungen und Nachfassen
- Du musst nicht beim ATO anrufen, dich in ATO-Onlinedienste einloggen oder Papierkram bearbeiten

Das funktioniert auch nach deiner Abreise aus Australien. Wir haben Working Holiday Makern geholfen, ATO-Angelegenheiten von jedem Kontinent zu lösen.

## Was ist die Rolle des ATO bei DASP-Superauszahlungen?

Wenn du deine Super über DASP beantragst:

- Wir reichen den Antrag über unser Steueragentenportal ein
- Das ATO verifiziert deinen Visastatus
- Der Antrag wird an deinen Superfonds weitergeleitet
- Der Fonds (oder das ATO, falls das Guthaben übertragen wurde) gibt die Zahlung frei

Wenn deine Super vom ATO als nicht beantragte Super gehalten wurde, zahlt das ATO dich direkt. So oder so verwaltet unser Team den Prozess von Anfang bis Ende, damit du jeden Dollar erhältst, ohne selbst mit dem ATO umzugehen. [Kontaktiere uns](/de/superannuation), um deinen DASP-Antrag zu starten.
 `,
  },

  'gross-pay-vs-net-pay-australia': {
    title: 'Was ist der Unterschied zwischen Brutto- und Nettolohn in Australien?',
    description: 'Brutto ist dein Stundenlohn mal Stunden - Netto ist das, was nach Steuer und Super auf deinem Konto landet. Mit Beispielrechnung für Working Holiday Maker.',
    body: `
Der Bruttolohn ist der Gesamtbetrag, den du vor Abzügen verdienst. Der Nettolohn ist das, was tatsächlich auf deinem Bankkonto ankommt, nachdem Abzüge gemacht wurden. Für Working Holiday Maker ist der Hauptabzug die PAYG-Steuereinbehaltung mit 15 % des Bruttolohns (mit hinterlegter TFN). [Super](/de/superannuation) ist kein Abzug - sie wird von deinem Arbeitgeber zusätzlich zu deinem Bruttolohn gezahlt, nicht von deinem Lohn. Steuererklärungen und Income Statements beziehen sich immer auf den Bruttolohn, nicht auf den Nettolohn.

## Wie erscheinen Brutto- und Nettolohn auf deinem Lohnzettel?

Ein australischer Standardlohnzettel zeigt:

- **Gross pay**: Gesamteinkommen (Stunden × Satz + Zulagen + Penalty Rates + Überstunden)
- **Tax withheld**: PAYG vom Bruttolohn abgezogen
- **Net pay**: Bruttolohn minus einbehaltene Steuer = was du bekommst
- **Super**: separat angezeigt (vom Arbeitgeber zusätzlich gezahlt, nicht von deinem Lohn abgezogen)

Beispiel für einen Working Holiday Maker:

- Bruttolohn: 1.000 $
- Einbehaltene Steuer mit 15 %: 150 $
- Nettolohn: 850 $
- Super (12 % zusätzlich): 120 $ an deinen Fonds gezahlt

## Warum ist Super kein Abzug vom Bruttolohn?

Das ist ein häufiger Verwirrungspunkt. Super ist:

- Von deinem Arbeitgeber **zusätzlich zu** deinem Lohn gezahlt
- Eine zusätzliche Kostenposition für den Arbeitgeber, kein Abzug von deinem Lohn
- Als separater Posten auf deinem Lohnzettel ausgewiesen
- Berechnet als 12 % deines Bruttolohns (ab 1. Juli 2025)

Wenn du 1.000 $ Bruttolohn verdienst, bekommst du 850 $ auf deinem Bankkonto UND 120 $ gehen in deinen Superfonds. Dein Bruttolohn ändert sich wegen Super nicht.

Wenn dein Lohnzettel ausweist, dass Super vom Bruttolohn abgezogen wird, ist das falsch. Sprich es sofort mit deinem Arbeitgeber an, und [kontaktiere unser Team](/de/contact), wenn nicht gelöst.

## Warum ist der Bruttolohn für die Steuer wichtig?

Steuererklärungen und Income Statements nutzen immer den Bruttolohn:

- Wenn wir dein Einkommen für das Jahr angeben, nutzen wir die Bruttozahl
- Das ATO nutzt den Bruttolohn, um deine Steuerschuld zu berechnen
- Einbehaltene Steuer wird separat angezeigt
- Nettolohn ist für Steuerzwecke irrelevant

Wenn du also dein Income Statement am Jahresende bekommst, ist die gezeigte Zahl dein Gesamtbruttolohn, nicht das, was auf deinem Bankkonto gelandet ist.

## Wie kannst du deine Bruttolohnberechnung prüfen?

Um deinen Lohnzettel zu verifizieren:

1. Multipliziere deine regulären Stunden mit deinem Stundensatz
2. Addiere Penalty Rates für Wochenend-, Feiertag- oder Abendschichten
3. Addiere Zulagen (Uniform, Werkzeug, Fahrt)
4. Addiere Überstunden zum korrekten Satz
5. Vergleich mit der Bruttozahl auf deinem Lohnzettel

Wenn die Zahlen nicht übereinstimmen, sprich es mit deinem Arbeitgeber an. Die Diskrepanz kann auf einen Lohnabrechnungsfehler oder eine Unterbezahlung zurückzuführen sein. [Kontaktiere unser Team](/de/contact), falls du Hilfe brauchst, den korrekten Satz zu berechnen.
 
## Die Rechnung an einem echten Backpacker-Payslip

Brutto 1.000 $ die Woche beim registrierten WHM-Arbeitgeber: 150 $ Steuerabzug (15 %), 850 $ netto aufs Konto - plus 120 $ Super (12 %), die nie im Netto auftauchen, separat in deinen Fonds fließen und trotzdem dein Geld sind. Landet spürbar weniger als 85 % vom Brutto auf deinem Konto, stimmt etwas nicht: falscher Satz, TFN fehlt im System, oder Abzüge, die [womöglich nicht rechtmäßig sind](/de/blog/uniform-laundry-deductions-illegal-australia).
`,
  },

  'tax-obligations-after-leaving-australia': {
    title: 'Was passiert mit deinen australischen Steuerpflichten, nachdem du das Land verlassen hast?',
    description: 'Australien zu verlassen heißt nicht, dass deine Steuerpflichten enden. Steuererklärung, DASP, ABN-Kündigung - was Working Holiday Maker noch erledigen müssen.',
    body: `
Australien zu verlassen beendet deine australischen Steuerpflichten nicht. Wenn du in einem australischen Steuerjahr Einkommen hattest, musst du für dieses Jahr eine Steuererklärung einreichen. Du musst außerdem deine [Super](/de/superannuation) über DASP beantragen, jede [ABN](/de/abn), die du registriert hast, kündigen und deine Kontaktdaten aktualisieren. Das alles kann aus dem Ausland über unseren Service gemacht werden. Wir helfen Working Holiday Makern, ihre australischen Steuerpflichten von überall auf der Welt abzuwickeln.

## Was musst du nach dem Verlassen Australiens noch tun?

Nach der Abreise bleiben vier Hauptpflichten:

1. **Steuererklärung einreichen** für jedes Jahr mit Einkommen
2. **Super beantragen** über den DASP-Prozess
3. **ABN kündigen**, falls du eine registriert hast
4. **Kontaktdaten aktualisieren**, damit dich Post erreicht

Unser Team kümmert sich um alle vier zusammen als Teil eines "Abreise-Steuerpakets" für Working Holiday Maker.

## Wie reichst du deine Steuererklärung aus dem Ausland ein?

Über unseren Service läuft der Prozess vollständig remote ab:

- Schick uns deine Daten (TFN, Reisepass, Beschäftigungsdaten)
- Wir holen deine Income Statements aus dem ATO-System
- Wir bereiten die Steuererklärung vor und reichen sie für dich ein
- Die Rückzahlung geht auf dein australisches Bankkonto

Die Standardfrist ist der 31. Oktober nach dem Steuerjahr. Über unseren Service unter Aufsicht eines registrierten Steueragenten wird die Frist typischerweise auf Mai des Folgejahres verlängert.

Wenn du eine Pflicht zur Einreichung hast und nicht einreichst, kann das zu Strafen führen. Das ATO hat deine Einkommensdaten von deinen Arbeitgebern und erwartet eine Steuererklärung. Siehe unseren Artikel zu [Steuererklärung aus dem Ausland einreichen](/de/blog/how-to-lodge-tax-return-from-overseas).

## Wie beantragst du deine Super?

Wenn Superbeiträge für dich gemacht wurden, kannst du sie über den Departing Australia Superannuation Payment (DASP)-Prozess beantragen:

- Verfügbar, sobald dein Visum abgelaufen ist und du Australien verlassen hast
- Wir reichen den Antrag für dich ein
- 65 % Quellensteuer gilt auf die steuerpflichtige Komponente
- Nettobetrag geht auf dein angegebenes Bankkonto (australisch oder ausländisch)

Siehe unseren detaillierten Artikel zu [wie du DASP beantragst](/de/blog/how-to-apply-for-super-back) für den vollen Prozess.

## Wie kündigst du deine ABN?

Wenn du eine [ABN](/de/abn) registriert hast:

- Wir kündigen sie als Teil der Abwicklung deiner australischen Steuerposition
- Die Kündigung tritt ab einem bestimmten Datum in Kraft
- Hält deine Geschäftsunterlagen ordentlich
- Verhindert Verwaltungsprobleme, falls du jemals nach Australien zurückkehrst

Siehe unseren Artikel zu [ABN kündigen](/de/blog/how-to-cancel-your-abn) für was vor der Kündigung abzuwickeln ist.

## Welche Kontaktdaten solltest du aktualisieren?

Damit Post dich erreicht:

- Halte deine E-Mail-Adresse aktuell (und von überall zugänglich)
- Aktualisiere deine hinterlegte Adresse (überleg eine Auslandsadresse)
- Informiere deinen Superfonds über deine neuen Kontaktdaten
- Stelle sicher, dass dein Bankkonto noch zugänglich ist

Wenn du mit unserem Team arbeitest, verwalten wir all das. Wir werden dein Kontaktpunkt zum ATO und den Superfonds, sodass du nicht mehrere Behörden verfolgen musst. [Kontaktiere uns](/de/contact), um den Prozess zu starten.

## Wie lange solltest du dein australisches Bankkonto offen halten?

Halte dein australisches Bankkonto offen, bis:

- Jede Steuerrückerstattung bezahlt wurde
- Jede Superauszahlung empfangen wurde (oder Auslandszahlung arrangiert wurde)
- Alle Endabwicklungen bearbeitet wurden

Die meisten Working Holiday Maker können ihr australisches Konto innerhalb von 3-4 Monaten nach Abreise schließen - aber erst, nachdem alle Zahlungen durch sind. Wir sagen dir Bescheid, wann es sicher ist zu schließen.
 
## Deine Abreise-Steuersequenz

1. **Vor dem Abflug**: jeden Arbeitgeber notieren, myGov-Zugang am Leben halten, Bankkonto offen lassen
2. **Option vorgezogene Erklärung**: Wer vor dem 30. Juni endgültig geht, darf sofort einreichen - ohne auf Juli zu warten
3. **Ab 1. Juli**: die finale Erklärung aus Deutschland einreichen; Agenten holen Income Statements ohne Payslips
4. **Visum abgelaufen + ausgereist**: das DASP-Fenster für deine Super öffnet sich - [der Antragsguide](/de/blog/best-way-to-claim-super-leaving-australia)
5. **6 Monate draußen**: nicht beanspruchte Super wandert zur ATO - weiter beanspruchbar, anderes Verfahren

Die finale Erklärung zu überspringen lässt sie nicht verschwinden; die ATO-Akte bleibt offen, und jeder künftige Australien-Visumsantrag trifft auf deine Steuerhistorie.
`,
  },

  'opening-bank-account-australia-working-holiday': {
    title: 'Australisches Bankkonto eröffnen: In Woche 1 erledigen (2026)',
    description: 'Konto online vor oder nach der Ankunft eröffnen - in den ersten 6 Wochen reicht der Reisepass. Die bekanntesten Banken und die TFN-Frage beim Eröffnen.',
    body: `
Ein australisches Bankkonto zu eröffnen ist eines der ersten Dinge, die du nach der Ankunft in Australien machen solltest. Du brauchst es, um deinen Lohn, deine Superbeiträge und Steuerrückerstattungen vom ATO zu bekommen. Die großen Banken (Commonwealth Bank, Westpac, ANZ, NAB) bieten alle Konten, die für Working Holiday Maker geeignet sind. Du kannst typischerweise online vor der Ankunft vorab beantragen und die Identitätsprüfung in den ersten Tagen persönlich abschließen. Halte das Konto offen, bis deine Steuerrückerstattung und Superauszahlung eingegangen sind - meistens 3-4 Monate nach Abreise.

## Welche Bank solltest du wählen?

Die vier großen australischen Banken funktionieren alle für Working Holiday Maker:

- **Commonwealth Bank (CBA)**: größtes Filial- und Geldautomaten-Netzwerk
- **Westpac**: zweitgrößte, gut für internationale Studenten
- **ANZ**: etablierte Expat-Services
- **NAB**: ähnliche Funktionen wie die anderen

Alle vier bieten:

- Gebührenfreie oder günstige Girokonten für Backpacker
- Online-Banking und Apps
- Weit verbreitete Geldautomaten-Netzwerke
- Visa- oder Mastercard-Debitkarten
- Einfache Einrichtung für Arbeitgeberüberweisungen

Es gibt keinen großen Unterschied zwischen ihnen für den Alltag. Wähle diejenige, deren Filiale in der Nähe deines Ankunftsorts oder deiner Unterkunft liegt.

## Welche Dokumente brauchst du?

Um ein Bankkonto zu eröffnen, brauchst du typischerweise:

- Deinen Reisepass (muss gültig sein)
- Eine australische Wohnadresse (Hostel oder vorübergehende Adresse ist meist akzeptabel)
- Eine australische Telefonnummer (australische SIM-Karte hilfreich)
- Identitätsnachweis (Reisepass plus eine weitere ID)
- Deine TFN (hilfreich, aber bei Eröffnung nicht erforderlich)

Bei den meisten großen Banken kannst du den Antrag online vor der Ankunft in Australien starten. Dein Konto wird teilweise eingerichtet und ist bereit zu aktivieren, wenn du landest. Du musst eine Filiale besuchen, um die Identitätsprüfung persönlich abzuschließen.

## Gibt es monatliche Gebühren?

Die meisten großen australischen Banken erheben eine Monatsgebühr von etwa 5 $:

- Oft erlassen, wenn du jeden Monat einen Mindestbetrag einzahlst (meistens 2.000 $)
- Die meisten Working Holiday Maker mit regulärem Lohn erreichen diese Schwelle leicht
- Viele Banken bieten gebührenfreie Konten speziell für Neuankömmlinge oder Studenten

Wenn du unsicher bist, ob dein Konto die Einzahlungsschwelle erreicht, frag die Bank nach gebührenfreien Optionen.

## Was ist mit internationalen Überweisungsdiensten?

Manche Working Holiday Maker nutzen Dienste wie Wise (früher TransferWise) für internationale Überweisungen:

- Bessere Wechselkurse als Banken für Auslandsüberweisungen
- Nützlich, um australische Dollar in deine Heimatwährung umzurechnen
- Ersetzt NICHT die Notwendigkeit eines australischen Bankkontos
- Du brauchst weiterhin ein normales australisches Konto für Lohn, Steuerrückerstattungen und [Super](/de/superannuation)

Nutz beides: eine australische Bank für Lohn und australische Behördenzahlungen und einen Überweisungsdienst, um Geld nach Hause zu schicken.

## Wann solltest du dein australisches Bankkonto schließen?

**Schließ es nicht zu früh.** Du brauchst ein aktives australisches Bankkonto, um zu bekommen:

- Deine Steuerrückerstattung vom ATO (2-6 Wochen nach Einreichung)
- Deine Superauszahlung über DASP (kann 4+ Wochen dauern)
- Letzte Lohnzahlungen von deinem Arbeitgeber
- Unbezahlte Super, die über SGC zurückgeholt wurde

Sowohl deine [Steuerrückerstattung](/de/tax-return) als auch [DASP-Superauszahlung](/de/blog/what-is-dasp-super-withdrawal) können Wochen oder Monate nach Verlassen Australiens dauern. Verfrühter Schließung verursacht ernsthafte Komplikationen.

Der richtige Ansatz:

1. Reiche deine Steuererklärung ein und beantrage DASP, bevor du Australien verlässt
2. Halte dein Bankkonto 3-4 Monate nach Abreise offen
3. Sobald alle Zahlungen durch sind, überweis das Guthaben nach Hause
4. Schließ das Konto

Wenn du dein Konto zu früh geschlossen hast, [kontaktiere unser Team](/de/contact) und wir arrangieren alternative Zahlung für ausstehende Rückzahlungen oder Super.

## Eine Anmerkung zu Bankbetrug und Fraud

Das ATO und unser Team werden nie:

- Dich bitten, deine Bankdaten über einen Text- oder E-Maillink zu aktualisieren
- Sofortige Zahlung in Geschenkkarten oder Krypto verlangen
- Mit Verhaftung oder Visakündigung drohen
- Dich unangekündigt anrufen und nach persönlichen Informationen fragen

Jede Kommunikation, die dich auffordert, auf einen Link zu klicken und Bankdaten einzugeben, ist Betrug. Wenn du eine verdächtige Nachricht bekommst, die behauptet, vom ATO oder einem Steueragenten zu sein, lass dich nicht darauf ein. [Kontaktiere unser Team](/de/contact), wenn du unsicher bist, ob etwas legitim ist.
 
## Die TFN-Frage bei der Kontoeröffnung

Banken fragen nach deiner TFN, aber du kannst legal ohne sie eröffnen - der Haken betrifft nur Zinsen: ohne TFN behält die Bank Steuer auf Zinserträge zum Spitzensatz ein. Bei einem Alltagskonto mit Centbeträgen ist das egal; trag die TFN nach, sobald sie da ist. Wichtiger am ersten Tag: eine Bank mit gebührenfreiem Konto und dichtem ATM-Netz entlang deiner Route, die App vor der ersten Schicht einrichten (die Lohnabteilung braucht BSB + Kontonummer), und das Konto bei der Abreise OFFEN lassen - Steuererstattung und DASP landen dort am schnellsten.
`,
  },

  'german-european-health-insurance-australia-working-holiday': {
    title: 'Krankenversicherung für deutsche Backpacker in Australien (2026)',
    description: 'Deutschland hat kein Medicare-Abkommen mit Australien - ohne eigene Versicherung zahlst du Notfälle selbst. Optionen, Kosten und die Levy-Befreiung.',
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

- **Hausarztbesuch**: typischerweise 80 bis 120 $ für eine Standardkonsultation
- **Facharztbesuch**: 200 bis 400 $
- **Notaufnahmebesuch**: 400 bis 800 $ für einen nicht stationären Besuch
- **Krankenhausaufenthalt**: 1.500 bis 5.000 $ pro Tag in einem öffentlichen Krankenhaus als Privatpatient
- **Operationen**: 10.000 bis 100.000+ $ je nach Eingriff
- **Krankenwagen**: 400 bis 1.500 $ pro Fahrt (auch nicht von Medicare abgedeckt für irgendjemanden)
- **Verschreibungspflichtige Medikamente**: voller Preis (keine PBS-Bezuschussung)

Bei echten Notfällen wird die Behandlung unabhängig von der Zahlungsfähigkeit geleistet, aber die Rechnungen folgen danach. Australische Krankenhäuser verfolgen routinemäßig Auslandspatienten bei unbezahlten Rechnungen über internationale Inkassobüros.

## Welche Versicherung ist für das Working Holiday Visum erforderlich?

Das deutsche Working Holiday Visum für Australien (Subclass 462 für Deutsche unter dem Work and Holiday Programme) erfordert eine angemessene Krankenversicherung für die Dauer des Aufenthalts als Voraussetzung für die Bewilligung. Das Department of Home Affairs gibt kein bestimmtes Versicherungsprodukt vor, aber die Abdeckung muss:

- Für die gesamte Visumsdauer gültig sein
- Mindestens die grundlegende medizinische Versorgung in Australien abdecken
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
- Deckt nicht Nichtmedizinisches ab (kein Gepäck, keine Stornierungen)

Viele deutsche Working Holiday Maker entscheiden sich für eine Reiseversicherung von zu Hause aus für die ersten paar Monate und schließen dann eine OVHC ab, sobald sie sich in Australien etabliert haben - besonders wenn sie länger als ein Jahr bleiben.

## Bekannte deutsche Anbieter mit Australienabdeckung

Mehrere deutsche Anbieter spezialisieren sich auf Langzeitauslandsabdeckung für Backpacker:

- **HanseMerkur**: bietet Reiseversicherung speziell für Work & Travel
- **Care Concept**: deckt bis zu 5 Jahre Auslandsaufenthalt
- **DR-WALTER**: spezialisiert auf Auslandskrankenversicherung
- **STA Travel/Statravelversicherung**: für junge Reisende konzipiert

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
- Notfallkrankenhausaufenthalte (öffentlich und privat)
- Verschreibungspflichtige Medikamente
- Diagnostische Bildgebung und Pathologie
- Krankenwagendienste
- Repatriierung im Falle einer schweren Krankheit oder Verletzung
- Zahnbehandlung im Notfall (manche Policen)
- Aktivitäten und Sport, falls du Abenteueraktivitäten planst (manche schließen das aus)

Lies das Kleingedruckte sorgfältig. Manche günstigen Policen schließen üblicherweise auftretende Probleme wie Magendarmerkrankungen oder Tropenkrankheiten aus.

## Was passiert bei einem medizinischen Notfall ohne Versicherung?

Wenn du dich ohne Versicherung in einem medizinischen Notfall befindest:

1. Du wirst trotzdem behandelt - keine Behandlung wird wegen Zahlungsfähigkeit zurückgehalten
2. Du bekommst eine Rechnung, oft direkt vor Entlassung
3. Krankenhäuser verfolgen unbezahlte Rechnungen aggressiv international
4. Du kannst in einem Plan zahlen, aber das kann teuer sein

Siehe unseren Artikel zu [Notfallbehandlung ohne Medicare](/de/blog/emergency-medical-care-working-holiday-no-medicare) für die spezifischen Schritte.

## Wie wirkt sich das auf deine Steuern aus?

Deine Versicherung beeinflusst direkt:

- Ob die [Medicare-Levy-Befreiung](/de/blog/medicare-levy-working-holiday-makers) für deine Steuererklärung gilt (meistens ja für Deutsche). Die 2 % Medicare Levy gilt für australische Residenten, die für Medicare berechtigt sind - deutsche Working Holiday Maker sind das normalerweise nicht.
- Ob private Krankenversicherungsprämien mit dem Steuersystem interagieren
- Deine Gesamtsteuerposition in Australien

Wenn du deine [Steuererklärung](/de/tax-return) über unseren Service einreichst, berücksichtigen wir deinen Medicarestatus korrekt, sodass die Levy ausgeschlossen wird, wenn du nicht berechtigt bist. [Kontaktiere unser Team](/de/contact), wenn du unsicher bist, wie Medicare und die Levy deine deutsche Steuerposition beeinflussen.
 
## Die deutsche Versicherungslücke, konkret durchgerechnet

Deutschland hat kein Abkommen mit Australien - GKV und EHIC enden am Gate, und private Auslandskrankenversicherungen fürs Work and Travel unterscheiden sich massiv in einem Punkt: Arbeitsunfälle. Viele Incoming-Tarife schließen körperliche Arbeit (Farm, Bau, Küche) aus oder verlangen Zuschläge - genau die Jobs, die du machen wirst. Prüfe vor Abschluss drei Klauseln: Arbeiten inklusive (welche Art?), Laufzeit verlängerbar aus dem Ausland, und Rücktransport. Die australische Alternative OVHC deckt lokal und arbeitskompatibel, kostet aber laufend mehr. Steuerlich bleibt die gute Nachricht: Als Deutscher ohne Medicare-Anspruch steht dir die [Medicare-Levy-Befreiung](/de/blog/medicare-levy-working-holiday-makers) zu - rund 500 $ auf 25.000 $ Einkommen, jedes Jahr.
`,
  },

  // ─── More Work Rights posts ────────────────────────────────────────────────
  'employer-not-paying-correctly': {
    title: 'Was tun, wenn dein Arbeitgeber dich in Australien nicht korrekt bezahlt',
    description: 'Unterbezahlung, fehlender Lohn oder fehlende Super? Du hast klare Rechte. So gehst du Schritt für Schritt vor, von Fair Work bis zur ATO-Meldung.',
    body: `
Wenn dein Arbeitgeber dich in Australien nicht korrekt bezahlt, hast du klare Rechte und Optionen, das zurückzuholen, was dir zusteht. Unterbezahlung ist leider üblich, besonders in Gastronomie-, Landwirtschafts- und Reinigungsbranchen, die viele Working Holiday Maker beschäftigen. Der effektivste Ansatz: zuerst den korrekten Satz identifizieren, die Unterbezahlung mit Belegen berechnen, mit dem Arbeitgeber ansprechen und bei ungeklärten Fällen über formale Kanäle eskalieren. Unser Team hilft Working Holiday Makern jede Woche, unterbezahlte Löhne zu identifizieren und zurückzuholen.

## Wie prüfst du, was du bekommen solltest?

Bevor du eine Beschwerde äußerst, finde heraus, was du eigentlich verdienen müsstest:

1. Identifiziere den modernen Award oder Tarifvertrag, der deine Rolle abdeckt
2. Finde den Satz für deine spezifische Einstufung und dein Arbeitsmuster
3. Füge geltende Penalty Rates hinzu (Wochenenden, Feiertage, Abende)
4. Füge Casual Loading (25 %) hinzu, falls du Casual-Angestellter bist
5. Vergleiche mit dem, was deine Lohnzettel zeigen

Wenn du nicht weißt, welcher Award dich abdeckt, oder wie der korrekte Satz zu berechnen ist, [kontaktiere unser Team](/de/contact). Wir machen diese Berechnung regelmäßig für Working Holiday Maker.

## Wie sprichst du Unterbezahlung mit deinem Arbeitgeber an?

In vielen Fällen ist Unterbezahlung ein Fehler statt absichtlich. Fange damit an, es direkt anzusprechen:

- Gehe ruhig mit deinen Aufzeichnungen auf deinen Arbeitgeber oder Vorgesetzten zu
- Weise auf die spezifische Diskrepanz hin (Datum, Stunden, was gezahlt vs. was hätte gezahlt werden sollen)
- Verweise auf den relevanten Award und Satz
- Halte das Gespräch sachlich

Viele Arbeitgeber korrigieren einen echten Fehler, sobald er aufgezeigt wird. Wenn sie sich weigern oder feindselig reagieren, ist das ein Signal, dass die Unterbezahlung absichtlich sein könnte, und du solltest eskalieren.

## Was, wenn dein Arbeitgeber sich weigert, es zu beheben?

Wenn intern nichts hilft:

1. [Kontaktiere unser Team](/de/contact) und wir bewerten die Situation
2. Wir helfen dir, die Aufzeichnungen und Berechnungen für eine formale Beschwerde zu organisieren
3. Wir leiten dich zum richtigen Meldekanal (Fair-Work-Ombudsman-Untersuchung, Small Claims usw.)
4. Wir begleiten dich durch den Rückforderungsprozess

Der Fair Work Ombudsman hat weitreichende Befugnisse, einschließlich Nachzahlung anzuordnen, schriftliche Verpflichtungen von Arbeitgebern zu verlangen und ernste Fälle zu verfolgen. Unsere Rolle ist, dir zu helfen, vor der Einreichung einen starken Anspruch aufzubauen.

## Welche Aufzeichnungen brauchst du?

Je stärker deine Aufzeichnungen, desto einfacher die Rückforderung:

- Jeden Lohnzettel, den du bekommen hast
- Deinen Schichtplan oder Schichtaufzeichnungen
- Arbeitsvertrag oder Angebotsschreiben
- Alle Kommunikation mit deinem Arbeitgeber über die Bezahlung (Textnachrichten, E-Mails)
- Ein Tagebuch der tatsächlich gearbeiteten Stunden (auch grobe Notizen helfen)
- Kontoauszüge, die zeigen, was eingezahlt wurde

Wenn du keine Lohnzettel hast, schreib so genau wie möglich auf, was du dir merkst. Der Fair Work Ombudsman akzeptiert Aufzeichnungen, die in gutem Glauben geführt wurden, wenn der Arbeitgeber keine Lohnzettel ausgestellt hat.

## Ist dein Visum gefährdet, wenn du deinen Arbeitgeber meldest?

Nein. Es gibt spezifische Schutzmaßnahmen für temporäre Visuminhaber:

- Die Workplace-Justice-Visa-Regelung erlaubt dir, in Australien zu bleiben, um eine Beschwerde zu verfolgen
- Dein Visastatus kann nicht gegen dich verwendet werden für eine berechtigte Beschwerde
- Der Fair Work Ombudsman hat explizite Schutzmaßnahmen für migrante Arbeiter
- Arbeitsplatzverletzungen zu melden beeinflusst keine zukünftigen Visaanträge

Wir haben Working Holiday Makern geholfen, Beschwerden ohne Visafolgen zu erheben. Die Schutzmaßnahmen existieren speziell, weil das Melden im öffentlichen Interesse liegt.
 
## Die Eskalationsleiter, die Geld zurückbringt

1. **Zahl prüfen**: Award, Einstufung, Casual-Zuschlag - bestätige, dass die Lücke real ist ([Payslip-Guide](/de/blog/how-to-read-a-payslip-australia-working-holiday))
2. **Schriftlich nachfragen**: eine höfliche E-Mail mit Daten, Stunden, erwartet vs. gezahlt - viele "Fehler" lösen sich hier
3. **FWO einschalten**: kostenlos; erzwingt Unterlagen und treibt Löhne ein
4. **Small Claims**: für eindeutige Beträge der schnelle Gerichtsweg ohne Anwälte

Die Fristen sind großzügig (sechs Jahre für Unterbezahlungsansprüche) - die Abreise aus Australien verwirkt nichts, und Verfahren laufen auch aus Deutschland.
`,
  },

  'leave-entitlements-working-holiday-visa': {
    title: 'Hast du als Working Holiday Visuminhaber Anspruch auf Urlaub und Krankenstand?',
    description: 'Anspruch auf Urlaub, Krankenstand und Public Holidays hängt von deiner Anstellungsart ab. Vollzeit, Teilzeit oder Casual - was Working Holiday Maker bekommen.',
    body: `
Working Holiday Maker in Australien haben unter den gleichen Regeln Anspruch auf Urlaub wie australische Arbeitnehmer - aber die Ansprüche hängen davon ab, ob du als Vollzeit, Teilzeit oder Casual angestellt bist. Vollzeit- und Teilzeitangestellte sammeln 4 Wochen Jahresurlaub und 10 Tage Persönlicher/Pflegeurlaub pro Jahr an. Casualangestellte bekommen keinen bezahlten Urlaub, aber einen 25 %-Casual Loading zusätzlich zu ihrem Stundenlohn als Ausgleich. Die meisten Working Holiday Maker in Casualrollen sammeln keine bedeutenden Urlaubsansprüche an, weil sie tendenziell oft die Jobs wechseln.

## Was bekommen Vollzeit- und Teilzeitangestellte?

Festangestellte Arbeitnehmer (Vollzeit und Teilzeit) sammeln bezahlten Urlaub unter den National Employment Standards (NES) an:

- **Jahresurlaub**: 4 Wochen pro Jahr Vollzeitdienst (anteilig für Teilzeit)
- **Persönlicher/Pflegeurlaub**: 10 Tage pro Jahr Vollzeitdienst
- **Trauerurlaub**: 2 Tage pro Anlass
- **Long Service Leave**: erfordert typischerweise 7-10 Jahre Dienst (für die meisten Working Holiday Maker nicht relevant)
- **Feiertagsbezahlung**: bezahlt zum Grundsatz, falls du nicht arbeitest, Penalty Rate, falls du arbeitest

Wenn du einen Job verlässt, bevor du deinen angesammelten Jahresurlaub genommen hast, hast du Anspruch darauf, ihn in deiner letzten Lohnzahlung ausbezahlt zu bekommen.

## Was ist mit Casualangestellten?

Casual-Arbeiter sammeln keinen bezahlten Urlaub an. Stattdessen bekommen sie:

- **25 %-Casual Loading** zusätzlich zum geltenden Award-Stundenlohn
- Dieses Loading gleicht das Fehlen von bezahltem Urlaub aus
- Der Casual-Mindestlohn ist 33,05 $/Stunde ab 1. Juli 2026 (nationales Minimum + 25 %)
- Die meisten Working Holiday Maker in Gastronomie, Einzelhandel und Farmarbeit sind Casual

Wenn du dich als Casual krank meldest, wirst du für diese Schicht nicht bezahlt. Der Ausgleich ist der höhere Stundenlohn.

## Wie findest du heraus, in welcher Kategorie du bist?

Prüfe deinen Anstellungsvertrag oder das Angebotsschreiben:

- Es sollte ausdrücklich Vollzeit, Teilzeit oder Casual angeben
- Wenn du einen festen Wochenplan und konsistente Schichten hast, könntest du Teilzeit sein (auch wenn der Vertrag "Casual" sagt)
- Wenn deine Schichten von Woche zu Woche variieren ohne garantiertes Minimum, bist du wahrscheinlich tatsächlich Casual

Die Einstufung ist wichtig, weil:

- Casuals haben keinen Anspruch auf bezahlten Urlaub (bekommen aber das Loading)
- Festangestellte erhalten kein Loading (bekommen aber bezahlten Urlaub)
- Falsche Einstufung kann bedeuten, dass du unterbezahlt bist

Wenn deine Einstufung auf dem Papier falsch aussieht, [kontaktiere unser Team](/de/contact) und wir helfen dir herauszufinden, ob dir zusätzlicher Lohn zusteht.

## Wie wird Urlaub besteuert?

Jahresurlaub, wenn er genommen oder ausgezahlt wird, wird genauso besteuert wie normaler Lohn:

- Der 15 %-Working-Holiday-Maker-Satz gilt
- Urlaubsauszahlungen am Ende der Anstellung sind in deinem letzten Lohnzettel enthalten
- Alle Urlaubszahlungen müssen in deiner [Steuererklärung](/de/tax-return) für das Erhaltsjahr angegeben werden

Wenn du eine Urlaubsauszahlung bekommst, erwarte, dass sie im Income Statement erscheint, das wir bei der Vorbereitung deiner Steuererklärung abrufen.

## Was ist mit Long Service Leave?

Long Service Leave (LSL)-Ansprüche erfordern typischerweise 7-10 Jahre bei einem einzelnen Arbeitgeber und sind für Working Holiday Maker sehr selten. Die meisten Backpacker sammeln kein LSL an. Falls du es doch tust, wird der Anspruch bei Abreise ausgezahlt und als steuerpflichtiges Einkommen behandelt.
 
## Die Endabrechnung beim Kündigen: Casual vs. Part-time

Casual-Job verlassen: Die letzte Zahlung sind nur gearbeitete Stunden plus Loading - nichts sammelt sich an, nichts wird ausgezahlt. Part-time oder Full-time verlassen: Nicht genommener Jahresurlaub wird voll zum Normalsatz ausgezahlt (plus Leave Loading, wo der Award ihn vorsieht) - Krankheitstage verfallen. Der Unterschied zählt bei der Kündigung: Ein Part-timer nach sechs Monaten kann eine Woche-plus angesammelten Urlaub im Wert von Hunderten Dollar halten. Die letzte Abrechnung Zeile für Zeile prüfen - nicht ausgezahlter Urlaub ist eine der häufigsten Exit-Unterbezahlungen.
`,
  },

  'can-you-work-for-multiple-employers': {
    title: 'Kannst du in Australien für mehrere Arbeitgeber gleichzeitig arbeiten?',
    description: 'Ja - viele Working Holiday Maker arbeiten parallel für mehrere Arbeitgeber. Was du beim TFN, Steuersatz und der Steuererklärung beachten musst, im Überblick.',
    body: `
Ja, Working Holiday Visuminhaber in Australien können für mehrere Arbeitgeber gleichzeitig arbeiten. Es gibt keine Visabeschränkung der Anzahl an Jobs, die du haben darfst. Jeder neue Arbeitgeber braucht deine [TFN](/de/tfn) und ein TFN Declaration-Formular, sonst muss er Steuer zu 45 % einbehalten. Der 15 %-Working-Holiday-Maker-Steuersatz gilt auf dein kombiniertes Einkommen bis 45.000 $ pro Steuerjahr. Alle Arbeitgeber müssen 12 % [Super](/de/superannuation) zusätzlich zu deinem Lohn zahlen, oft in verschiedene Superfonds.

## Was brauchst du für jeden Arbeitgeber?

Bei jedem Arbeitgeber musst du angeben:

- Deine TFN (dieselbe Nummer für alle Jobs)
- Ein ausgefülltes TFN Declaration-Formular
- Wahl von Working Holiday Maker als Residenzstatus
- Wahl von "Nein" für die Freibetragsfrage

Deine TFN einem Arbeitgeber zu geben deckt nicht automatisch die anderen ab. Bis jeder Arbeitgeber ein Declarationformular hinterlegt hat, muss er Steuer zu 45 % von seinem Anteil deines Lohns einbehalten.

## Welche steuerlichen Auswirkungen haben mehrere Jobs?

Mehrere Jobs zu haben erzeugt einige spezifische Überlegungen:

- Jeder Arbeitgeber behält 15 % von seinem Anteil deines Lohns ein (korrekt für Working Holiday Maker)
- Deine Gesamteinkünfte über alle Jobs werden mit 15 % bis 45.000 $ besteuert
- Über 45.000 $ greifen die höheren Steuerklassen
- Das kombinierte Einkommen wird in deiner jährlichen [Steuererklärung](/de/tax-return) berechnet

Weil der Working-Holiday-Maker-Satz flache 15 % beträgt, verursachen mehrere Jobs nicht dieselben steuerlichen Komplikationen wie für einen australischen Residenten (dessen progressive Steuerklassen sensibel für das Gesamteinkommen sind).

## Was ist mit Super von mehreren Arbeitgebern?

Jeder Arbeitgeber ist unabhängig verpflichtet, Super zu zahlen:

- 12 % deiner Einkünfte bei jedem Arbeitgeber (ab 1. Juli 2025)
- In einen Superfonds gezahlt (oft derselbe, wenn du ihn nominierst, sonst verschiedene Fonds)
- Alle Beiträge müssen innerhalb der Quartalsfristen in deinen Superkonten erscheinen

Mehrere Jobs zu haben bedeutet, dass Super eventuell in mehreren Fonds landet. Bevor du Australien verlässt, konsolidiert unser Team diese oder reicht separate DASP-Anträge für jeden Fonds ein. Siehe unseren Artikel zu [verlorene Super finden](/de/blog/how-to-find-lost-superannuation) für mehr.

## Welche Aufzeichnungen solltest du über mehrere Jobs führen?

Bei mehreren Jobs:

- Bewahre Lohnzettel von jedem Arbeitgeber auf
- Notiere Start- und Enddaten bei jedem
- Speichere Kopien der TFN Declaration-Formulare
- Speichere alle Superauszüge
- Verfolge die Superfondsdaten für jeden Arbeitgeber

Wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten, holen wir Income Statements von jedem Arbeitgeber über unser Steueragentenportal. Deine Aufzeichnungen helfen uns beim Abgleich und beim Erkennen von Fehlern.

## Gibt es praktische Grenzen für mehrere Jobs?

Während es keine gesetzliche Grenze gibt, gehören zu praktischen Überlegungen:

- Deine physische und mentale Kapazität, viele Schichten zu arbeiten
- Terminkonflikte zwischen Arbeitgebern
- Die Regelung zu "angemessenen zusätzlichen Stunden" im Fair Work Act
- Ob der primäre Visazweck (Urlaub) weiterhin erfüllt ist

Für Steuer- und Superzwecke sind mehrere Jobs völlig in Ordnung. Viele Working Holiday Maker arbeiten zwei oder drei Casual-Jobs in der Gastronomie neben einer Wochenendrolle oder Saisonarbeit.

[Kontaktiere unser Team](/de/contact), wenn du Lohn-, Super- oder Arbeitsplatzprobleme hast - wir kümmern uns um die Steuer- und Superseite und koordinieren bei Bedarf mit Fair Work.
 
## Die Zwei-Jobs-Steuerfalle (und warum sie für dich arbeitet)

Anders als Residents mit ihrem Freibetrag-Jonglieren haben Working Holiday Maker ein einfacheres Bild: Jeder registrierte Arbeitgeber behält 15 % ab dem ersten Dollar ein - zwei Jobs führen also selten zu Nachzahlungen. Die Falle läuft andersherum: Ist ein Arbeitgeber unregistriert (30 %+) oder fehlt deine TFN in seiner Lohnbuchhaltung (45 %), überbesteuert dieser Job dich still die ganze Saison. Zur Steuerzeit fließen alle Income Statements in eine Erklärung, der korrekte Satz gilt über das Gesamteinkommen, und das Zuviel des überbesteuerten Jobs kommt zurück. Führe eine Einzeiler-Liste pro Job: Arbeitgeber, Zeitraum, ungefährer Abzug.
`,
  },

  'full-time-part-time-casual-australia': {
    title: 'Was ist der Unterschied zwischen Vollzeit, Teilzeit und Casualarbeit in Australien?',
    description: 'Vollzeit, Teilzeit, Casual - die Anstellungsart bestimmt Lohn, Urlaubsanspruch und Casual Loading. Alle Unterschiede für Working Holiday Maker erklärt.',
    body: `
In Australien werden Angestellte als Vollzeit, Teilzeit oder Casual eingestuft. Jede Einstufung hat unterschiedliche Ansprüche: Vollzeit- und Teilzeitangestellte sammeln bezahlten Urlaub an (Jahresurlaub, Krankenurlaub) und bekommen einen Grundstundenlohn. Casualangestellte bekommen ein 25 %-Loading zusätzlich zum Grundsatz als Ausgleich für keinen bezahlten Urlaub. Der 15 %-Working-Holiday-Maker-Steuersatz gilt für alle drei Einstufungen. Die Einstufung ist wichtig, weil sie deinen Wochenlohn, deine Jobsicherheit und deine Urlaubsansprüche beeinflusst.

## Was ist Vollzeitanstellung?

Vollzeitangestellte:

- Arbeiten ein regelmäßiges Muster, typischerweise 38 Stunden pro Woche
- Haben einen garantierten Zeitplan
- Bekommen das volle Paket an Urlaubsansprüchen unter den National Employment Standards
- Bekommen 4 Wochen Jahresurlaub pro Jahr
- Bekommen 10 Tage Persönlicher/Pflegeurlaub pro Jahr
- Bekommen den Grundstundenlohn (kein Casual Loading)
- Haben die größte Jobsicherheit

Nur wenige Working Holiday Maker sind in Vollzeitanstellung, da das Visum für kürzere Arbeitszeiträume und Reisen konzipiert ist.

## Was ist Teilzeitanstellung?

Teilzeitangestellte:

- Arbeiten weniger als 38 Stunden pro Woche
- Haben einen regelmäßigen, vereinbarten Zeitplan
- Bekommen dieselben Ansprüche wie Vollzeitangestellte auf anteiliger Basis
- Sammeln Jahresurlaub und Krankenurlaub zum anteiligen Satz an
- Bekommen den Grundstundenlohn (kein Casual Loading)
- Haben Planungssicherheit von Woche zu Woche

Teilzeitarbeit ist für Working Holiday Maker üblicher als Vollzeit, aber immer noch weniger üblich als Casual.

## Was ist Casual-Anstellung?

Casualangestellte:

- Arbeiten nach Bedarf ohne garantierten Zeitplan
- Bekommen **keinen Jahresurlaub** oder Ansammlung von Krankheitsurlaub
- Bekommen ein **25 %-Casual Loading** zusätzlich zum Grundstundenlohn
- Können typischerweise Schichten annehmen oder ablehnen (bei angemessener Frist)
- Bekommen möglicherweise nicht jede Woche Schichten angeboten
- Haben weniger Jobsicherheit aber mehr Flexibilität

Casual ist die häufigste Anstellungsform für Working Holiday Maker - besonders in Gastronomie, Einzelhandel und Erntearbeit. Stelle sicher, dass das 25 %-Loading in deinem Satz enthalten ist. Das Casualminimum ab 1. Juli 2026 ist 33,05 $/Stunde (nationales Minimum + 25 %).

## Wie findest du heraus, welche du bist?

Prüfe deinen Anstellungsvertrag oder das Angebotsschreiben:

- Es sollte ausdrücklich Vollzeit, Teilzeit oder Casual angeben
- Ein fester Wochenplan deutet auf Teilzeit hin (nicht Casual)
- "Permanent" bedeutet meistens Vollzeit oder Teilzeit, nicht Casual
- Variable Schichten von Woche zu Woche bedeuten typischerweise Casual
- Ein 25 %-Loading auf deinem Stundenlohn ist ein Casual-Indikator

Wenn deine Einstufung falsch aussieht, [kontaktiere unser Team](/de/contact). Wir helfen Working Holiday Makern, eine Fehleinstufung zu erkennen und unterbezahlte Beträge zurückzuholen.

## Wie wirkt sich jede Einstufung auf deine Steuer aus?

Der 15 %-Working-Holiday-Maker-Steuersatz gilt für alle drei:

- Vollzeitlöhne: 15 % einbehalten
- Teilzeitlöhne: 15 % einbehalten
- Casuallöhne (einschließlich Loading): 15 % einbehalten

Alles Einkommen, unabhängig von der Einstufung, muss in deiner [Steuererklärung](/de/tax-return) angegeben werden. Unser Team kümmert sich um Steuererklärungen, die jede Kombination dieser Anordnungen abdecken.
 
## Was sollte ein Backpacker tatsächlich wählen?

Casual gewinnt für die meisten Working Holiday Maker: Der 25-%-Zuschlag passt zu kurzen Einsätzen, die Flexibilität zu Reiseplänen - der Preis sind fehlender bezahlter Urlaub und absagbare Schichten (mit [Mindestzahlungs-Schutz](/de/blog/casual-shift-cancellation-rules-australia)). Part-time passt zum sesshaften 6-Monats-Block in einer Stadt: planbarer Dienstplan, Urlaubsanspruch, der beim Kündigen ausgezahlt wird. Im Blick behalten: Nach 6 Monaten regelmäßiger Muster kann ein Anspruch auf Casual Conversion entstehen - und Urlaubszuschlag, Kündigungsfristen und Kündigungsschutz unterscheiden sich je nach Typ.
`,
  },

  'white-card-australia-working-holiday': {
    title: 'White Card in Australien: Kosten, Kurs und Regeln (2026)',
    description: 'Ohne White Card kein Bauarbeits-Job. Was der Kurs kostet, wie lange er dauert, Online-Optionen je Bundesstaat - und wie du ihn von der Steuer absetzt.',
    body: `
Ein White Card (offiziell Construction-Induction-Trainings-Karte) ist Pflicht für jeden, der auf einer Baustelle in Australien arbeitet. Es beweist, dass du das Arbeitssicherheitstraining absolviert hast - eine gesetzliche Pflicht, nicht optional. Der Kurs dauert 4-8 Stunden, kostet etwa 100 $, und die Karte ist in den meisten Teilen Australiens lebenslang gültig. Kein seriöser Bauarbeitgeber lässt dich ohne anfangen.

## Was ist ein White Card?

Das White Card ist eine national anerkannte Sicherheitsqualifikation:

- Bestätigt den Abschluss des Construction-Induction-Trainings
- Deckt Baustellengefahren, Notfallprozeduren, Arbeitnehmerrechte ab
- Pflicht nach australischem Arbeitssicherheitsrecht
- Ausgestellt von Registered Training Organisations (RTOs)
- Lebenslang gültig in den meisten Fällen (kein Ablauf)

Die Karte qualifiziert dich nicht, ein bestimmtes Handwerk auszuüben. Es ist rein eine Sicherheitsqualifikation, die jeder auf einer Baustelle braucht.

## Wer braucht ein White Card?

Jeder, der Bauarbeit in Australien macht:

- Hilfsarbeiter, Zimmerleute, Klempner, Elektriker
- Landschaftsgärtner, Gerüstbauer, Maler
- Handwerkshelfer und Auszubildende
- Jeder, der regelmäßig Baustellen für die Arbeit besucht

Wenn du Obst pflückst, in der Gastronomie oder im Büro arbeitest, brauchst du keines. Doch sobald jemand dir Bauarbeit anbietet, auch kurzfristige Casual-Arbeit, brauchst du ein White Card vor deiner ersten Schicht.

## Wie bekommst du ein White Card?

Der Prozess:

1. Finde eine Registered Training Organisation (RTO), die den Kurs anbietet
2. Mach das Training (persönlich oder online, abhängig vom Bundesstaat)
3. Besteh die Prüfung
4. Erhalte deine Karte innerhalb weniger Tage

Typische Details:

- Dauer: 4 bis 8 Stunden
- Kosten: etwa 100 $ (variiert je Anbieter)
- Format: online oder im Klassenzimmer
- Ausgestellt durch: national akkreditierte RTOs

Die Kosten sind ein [legitimer arbeitsbezogener Steuerabzug](/de/blog/tax-deductions-working-holiday-makers), wenn korrekt in deiner [Steuererklärung](/de/tax-return) beansprucht.

## Ist das White Card in allen Bundesstaaten gültig?

Generell ja:

- National anerkannt in den meisten Teilen Australiens
- Eine in Queensland ausgestellte Karte ist in NSW, Victoria, SA, Tasmania, Northern Territory, ACT gültig
- Western Australia hat in der Vergangenheit ein separates System betrieben - bestätige die Anerkennung, falls du dorthin gehst

Wenn du planst, in WA zu arbeiten, prüf mit deinem Arbeitgeber oder Schulungsanbieter, ob deine bestehende Karte anerkannt wird oder ob du eine WA-spezifische Qualifikation brauchst.

## Wie lange dauert das White Card?

Das White Card läuft nicht ab:

- Für das Leben ausgestellt, sobald du das Training über eine RTO absolvierst
- Keine Erneuerung in den meisten Bundesstaaten nötig
- Trag die Karte zu jedem Baujob

Bewahre ein Foto der Karte auf deinem Handy auf, falls du die physische verlierst.

## Kannst du die Kosten als Steuerabsetzung beanspruchen?

Das hängt davon ab, ob es dein erstes White Card oder eine Erneuerung ist:

- Dein allererstes White Card ist grundsätzlich **nicht** absetzbar. Das ATO behandelt es wie einen ersten Führerschein: Kosten, um eine Qualifikation zu erwerben, die du erst brauchst, um für Bauarbeit überhaupt infrage zu kommen, sind eine private Ausgabe, keine arbeitsbezogene.
- Die Erneuerung eines White Cards, das du bereits besitzt, während du schon auf der Baustelle arbeitest, **ist** als arbeitsbezogene Ausgabe absetzbar.
- Die gleiche Logik (erste Ausstellung vs. Erneuerung) gilt auch für einen ersten Staplerschein oder eine Schwerfahrzeug-Berechtigung.

Bewahre trotzdem jede Quittung auf und nimm absetzbare Erneuerungen mit Belegen in deine [Steuererklärung](/de/tax-return) auf.

Unser Team prüft, welche deiner arbeitsbezogenen Zertifikate absetzbar sind, wenn wir deine Steuererklärung vorbereiten.

[Kontaktiere unser Team](/de/contact), wenn du Lohn-, [Super](/de/superannuation)- oder Arbeitsplatzprobleme hast - wir kümmern uns um die Steuer- und Superseite und koordinieren wo nötig mit Fair Work.
 
## Kurs, Kosten und wo online akzeptiert wird

Die allgemeine Einweisung (CPCWHS1001) dauert wenige Stunden. NSW, VIC und die meisten Bundesstaaten akzeptieren akkreditierte Online-Kurse mit Webcam-Prüfung; QLD verlangt Präsenz- oder Zoom-verifizierte Formate - prüfe die aktuellen Regeln des Bundesstaats, bevor du bezahlst. Die Kosten liegen typischerweise unter hundert Dollar, die Karte läuft nie ab (nach langen Pausen außerhalb der Branche kann eine Auffrischung verlangt werden), und jeder Bundesstaat erkennt die Karten aller anderen an. Eine Erneuerung ist eine absetzbare berufsbezogene Weiterbildungsausgabe, sobald du bereits am Bau arbeitest - dein allererstes Card nicht, aus demselben Grund wie ein erster Führerschein.
`,
  },

  'rsa-certificate-australia-working-holiday': {
    title: 'Was ist ein RSA-Zertifikat und brauchst du eines, um in der Gastronomie in Australien zu arbeiten?',
    description: 'RSA (Responsible Service of Alcohol) ist Pflicht für Bar-, Restaurant- und Hospitality-Jobs. Online-Kurs ab 35 $, in welchen Staaten gültig - alle Details.',
    body: `
Ein Responsible Service of Alcohol (RSA)-Zertifikat ist gesetzlich erforderlich, um Alkohol in jeder lizenzierten Einrichtung in Australien zu servieren, verkaufen oder anbieten. Gastronomie ist eine der beliebtesten Branchen für Working Holiday Maker, und die meisten Gastronomierollen in Pubs, Bars, Restaurants und Liquor Shops verlangen ein RSA, bevor du anfangen kannst. Der Kurs dauert typischerweise 3-5 Stunden, kostet etwa 90 $ und kann online gemacht werden. Die Kurskosten sind als arbeitsbezogene Ausgaben steuerlich absetzbar.

## Was ist das RSA?

Das RSA ist ein kurzer Zertifizierungskurs, der abdeckt:

- Erkennen von Anzeichen von Trunkenheit
- Wie man Service legal und sicher verweigert
- Rechtliche Pflichten von Personal und Betreibern
- Verhinderung alkoholbezogener Schäden
- Liquor-Licensing-Regeln

Ohne RSA darfst du in keiner lizenzierten Einrichtung legal einen Drink servieren. Ohne RSA zu arbeiten riskiert rechtliche Strafen sowohl für dich als auch die Einrichtung.

## Wer braucht ein RSA?

Jeder Working Holiday Maker, der in einer Rolle arbeitet, die mit Alkohol zu tun hat:

- Barpersonal in Pubs, Hotels, Clubs
- Servicepersonal in lizenzierten Restaurants
- Liquor-Shop- und Spirituosenladen-Angestellte
- Event-Personal, das Alkohol serviert
- Nachtclub-Arbeiter
- Cellar-Door-Personal in Weingütern

Wenn deine Rolle keinen Alkoholservice beinhaltet (z. B. Küchenarbeit, Reinigung, Back-of-House), brauchst du eventuell keines - aber die meisten Gastronomiearbeitgeber verlangen es trotzdem als Grundvoraussetzung.

## Wie bekommst du ein RSA?

Der Kurs wird von Registered Training Organisations (RTOs) angeboten:

1. Finde eine RTO, die RSA-Training in deinem Bundesstaat anbietet
2. Wähle Online- oder Klassenraumformat
3. Mach den Kurs (typischerweise 3-5 Stunden)
4. Besteh die Prüfung
5. Erhalte dein RSA-Zertifikat

Typische Kosten sind etwa 90 $, variieren aber je nach Bundesstaat und Anbieter. Manche Arbeitgeber übernehmen die Kosten, wenn sie dich einstellen - also frag, bevor du selbst zahlst.

## Ist das RSA in jedem Bundesstaat gültig?

Nein, RSA-Zertifikate sind bundesstaats-spezifisch:

- Auf Bundesstaatsebene ausgestellt (NSW, Victoria, Queensland, etc.)
- Nicht automatisch zwischen Bundesstaaten übertragbar
- Ein Victoria-RSA könnte in Queensland nicht gültig sein
- Manche Bundesstaaten haben gegenseitige Anerkennungsabkommen, andere nicht

Wenn du planst, in Gastronomie über mehrere Bundesstaaten zu arbeiten, musst du den Kurs eventuell in jedem Bundesstaat erneut machen. Prüf mit deinem Schulungsanbieter, bevor du für einen bundesstaatsübergreifenden Kurs zahlst.

## Wie lange dauert ein RSA?

Die Gültigkeit variiert je Bundesstaat:

- **New South Wales**: 5 Jahre
- **Victoria**: 3 Jahre
- **Queensland**: 3 Jahre
- **Western Australia**: kein Ablauf
- **South Australia**: kein Ablauf
- **Tasmania**: 3 Jahre
- **ACT**: 3 Jahre
- **Northern Territory**: 3 Jahre

Erneuerung ist meistens ein kurzer Auffrischungskurs statt des vollen Originalkurses.

## Kannst du die Kosten als Steuerabsetzung beanspruchen?

Ja. Wenn du den RSA-Kurs für Gastronomieanstellung absolviert hast:

- Die Kursgebühr ist eine [arbeitsbezogene Absetzung](/de/blog/tax-deductions-working-holiday-makers)
- Nimm die Kosten in deine [Steuererklärung](/de/tax-return) auf
- Bewahre deine Quittung auf

Wenn wir deine Steuererklärung vorbereiten, nehmen wir Schulungszertifikate unter deinen Absetzungen auf. Die meisten Working Holiday Maker haben mindestens ein oder zwei relevante Kurse, die absetzbar sind.

[Kontaktiere unser Team](/de/contact), wenn du Lohn-, [Super](/de/superannuation)- oder Arbeitsplatzprobleme hast - wir kümmern uns um die Steuer- und Superseite und koordinieren wo nötig mit Fair Work.
 `,
  },

  'wwcc-working-with-children-check-australia': {
    title: 'Was ist ein Working With Children Check und brauchst du einen mit Working Holiday Visum?',
    description: 'Ein WWCC ist Pflicht für Arbeit mit Kindern - Au-pair, Camp-Counselor, Sportlehrer. Antrag, Kosten und Gültigkeit für Working Holiday Maker erklärt.',
    body: `
Ein Working With Children Check (WWCC) ist eine Hintergrundüberprüfung, die für jeden erforderlich ist, der in Australien mit Kindern arbeitet. Wenn du planst, in Kinderbetreuung, Bildung, Nachhilfe, Sportcoaching, Jugendprogrammen oder als Au-pair zu arbeiten, brauchst du vor Beginn einen WWCC. Die Prüfung wird auf Bundesstaatsebene verwaltet, kostet etwa 80 $ (kostenlos für Freiwillige), und die Bearbeitung dauert ein paar Wochen. Starte den Antrag so früh wie möglich, um Verzögerungen vor deinem ersten Tag zu vermeiden.

## Was ist ein Working With Children Check?

Ein WWCC ist eine Risikobewertung der jeweiligen Bundesstaatsregierung:

- Untersucht die Strafregister-Historie
- Prüft Feststellungen unangemessenen Verhaltens gegenüber Kindern
- Prüft andere relevante Aufzeichnungen
- Identifiziert Personen, die ein unakzeptables Risiko für Kinder darstellen

Anders als eine einmalige Polizeiüberprüfung ist ein WWCC laufend. Behörden beobachten dein Register weiter, nachdem die Prüfung ausgestellt wurde, und können einen WWCC widerrufen, falls neue Informationen auftauchen.

## Wer braucht einen WWCC?

Jeder in einer bezahlten oder Freiwilligenrolle mit regelmäßigem Kontakt zu Kindern:

- Kinderbetreuer
- Lehrer und Lehrerassistenten
- Nachhilfelehrer und Musiklehrer
- Sporttrainer und Instruktoren
- Camp-Mitarbeiter und Betreuer
- Jugendprogramm-Personal
- Au-pairs und Kindermädchen
- Mitarbeiter in der Nachschulbetreuung

Als Working Holiday Maker, der eine dieser Rollen annimmt, brauchst du einen WWCC. Die meisten Arbeitgeber lassen dich ohne nicht anfangen.

## Wie beantragst du einen WWCC?

Der Antragsprozess variiert je Bundesstaat, aber generell:

1. Beantrage online bei der jeweiligen Bundesstaatsbehörde
2. Zahl die Antragsgebühr (typischerweise etwa 80 $ für bezahlte Arbeiter, kostenlos für Freiwillige)
3. Geh zu einem Identitätsprüfungs-Termin (oft bei Australia Post)
4. Liefere Identitätsnachweisdokumente
5. Warte auf die Bearbeitung (meistens ein paar Wochen)

Der genaue Prozess und die Gebühren variieren je Bundesstaat:

- New South Wales: WWCC ausgestellt vom Office of the Children's Guardian
- Victoria: Working with Children Check Victoria
- Queensland: Blue-Card-System
- Andere Bundesstaaten haben ihre eigenen Äquivalente

Plane voraus. Beantrage die Karte 4 bis 6 Wochen, bevor du anfangen willst zu arbeiten, um Zeit für die Bearbeitung zu haben.

## Ist der WWCC bundesstaatsübergreifend gültig?

Nein, WWCCs sind bundesstaats-spezifisch:

- Jeder Bundesstaat stellt seine eigene Version aus
- Nicht automatisch zwischen Bundesstaaten übertragbar
- Umzug von NSW nach Victoria → neue Prüfung beantragen
- Bestätige immer mit deinem Arbeitgeber und der Behörde des neuen Bundesstaats

Wenn du planst, mit Kindern über mehrere Bundesstaaten zu arbeiten, kalkuliere die zusätzlichen Anträge und Gebühren in deine Planung ein.

## Wie lange dauert ein WWCC?

Die Gültigkeit variiert je Bundesstaat:

- Typischerweise 3 bis 5 Jahre
- Manche Bundesstaaten stellen Prüfungen für die vollen 5 Jahre aus
- Erneuerung vor Ablauf erforderlich, um Kinderarbeit fortzusetzen

## Sind Working Holiday Maker berechtigt?

Ja. Working Holiday Visuminhaber (Subclass 417 und 462) können einen WWCC beantragen:

- Die Prüfung erfordert Identitätsprüfung
- Eine australische Adresse ist typischerweise nötig
- Ein gültiges Working Holiday Visum qualifiziert dich für kinderbezogene Arbeit
- Starte den Prozess früh, um Verzögerungen zu vermeiden

Wenn du Hilfe brauchst zu verstehen, was für deine spezifische Situation nötig ist, [kontaktiere unser Team](/de/contact). Wir helfen Working Holiday Makern, die Dokumentationsanforderungen vor ihrem ersten Arbeitstag zu navigieren.
 
## Bundesstaaten im Überblick für mobile Backpacker

Jeder Bundesstaat führt sein eigenes System mit eigener Karte, Kosten und Gültigkeit - NSW (5 Jahre), VIC (5 Jahre, für Freiwillige kostenlos), QLD Blue Card, WA, SA, TAS und NT unterscheiden sich alle, und keine Karte gilt über die Grenze hinweg. Sommercamp in NSW und danach Schwimmschule in VIC heißt: zwei Anträge. Die Kosten reichen von kostenlos (Freiwilligen-Kategorien) bis über hundert Dollar, die Bearbeitung dauert Tage bis Wochen - und ob du "während der Bearbeitung" schon arbeiten darfst, ist je nach Staat erlaubt oder verboten. Au-pair-Arbeit löst die Pflicht in den meisten Staaten aus, obwohl sie im Privathaushalt stattfindet. Die Gebühr ist [absetzbar](/de/blog/tax-deductions-working-holiday-makers), sobald die Arbeit sie erfordert.
`,
  },

  // ─── More Work Rights ─────────────────────────────────────────────────────
  'what-is-a-tax-invoice': {
    title: 'Was ist eine Tax Invoice und wann musst du eine ausstellen?',
    description: 'Wenn du als Contractor mit ABN arbeitest, musst du Tax Invoices ausstellen, um bezahlt zu werden. Hier erfährst du, was eine Tax Invoice enthält.',
    body: `
Eine Tax Invoice ist ein Dokument, das ein Lieferant einem Käufer ausstellt, um Zahlung für Waren oder Dienstleistungen anzufordern. Als Working Holiday Maker mit einer [ABN](/de/abn), die als Contractor arbeitet, musst du Tax Invoices an die Unternehmen ausstellen, die dich bezahlen. Eine gültige Tax Invoice muss enthalten: deinen Namen (oder Geschäftsnamen), deine ABN, das Datum, eine Beschreibung der Dienstleistungen und den Gesamtbetrag. Rechnungen ohne ABN auszustellen erlaubt dem Unternehmen, 47 % der Zahlung legal einzubehalten.

## Wann ist eine Tax Invoice erforderlich?

Du musst eine Tax Invoice ausstellen, wenn:

- Der Verkauf 82,50 $ oder mehr wert ist (einschließlich GST)
- Der Käufer eine anfordert
- Die meisten Geschäftskunden verlangen eine Rechnung, um die Zahlung über ihr Buchhaltungssystem zu verarbeiten

Auch wenn nicht streng erforderlich, ist das Ausstellen von Rechnungen gute Praxis:

- Schafft eine klare Aufzeichnung dessen, was vereinbart wurde
- Dokumentiert, was geliefert wurde und wann
- Unterstützt deine Steuererklärung zum Jahresende
- Löst Zahlungsstreitigkeiten schneller

## Was muss eine gültige Tax Invoice enthalten?

Für Working Holiday Maker unter der 75.000 $-GST-Schwelle muss eine gültige Rechnung zeigen:

- Deinen Namen (und Geschäftsnamen, falls du unter einem firmierst)
- Deine ABN
- Das Datum der Rechnung
- Eine Beschreibung der erbrachten Dienstleistungen oder Waren
- Den zahlbaren Gesamtbetrag
- Einen Vermerk, dass GST nicht gilt (oder dass der Gesamtbetrag GST-frei ist)
- Deine Kontaktdaten

Wenn du für GST registriert bist (selten bei Working Holiday Makern), gelten zusätzliche Anforderungen, einschließlich der separaten Anzeige des GST-Betrags.

## Warum ist die Angabe deiner ABN wichtig?

Die "No-ABN-Einbehaltungsregel" gilt, falls du ohne gültige ABN Rechnungen ausstellst:

- Das Unternehmen muss 47 % der Zahlung einbehalten
- Du bekommst nur 53 % im Voraus
- Der einbehaltene Betrag kann in deiner Steuererklärung zurückgeholt werden, aber du wartest bis zum Jahresende

Gib deine ABN auf jeder Rechnung an. Falls du noch keine hast, [registriere über unseren Service](/de/abn), bevor du anfängst, Rechnungen zu stellen. Unsere ABN-Anträge werden typischerweise innerhalb von 24 Stunden genehmigt.

## Wie solltest du Rechnungsaufzeichnungen führen?

Bewahre eine Kopie jeder Rechnung auf, die du ausstellst:

- Eine einfache Tabelle, die jede Rechnung auflistet (Datum, Kunde, Betrag, Zahlungsstatus)
- PDF-Kopien jeder Rechnung in Cloudspeicher
- Kontoauszüge, die jede erhaltene Zahlung zeigen

Wenn wir deine [Steuererklärung](/de/tax-return) einreichen, nutzen wir diese Aufzeichnungen, um dein Contractoreinkommen genau zu berechnen. Ohne sie müssen wir schätzen, was weniger genau und schwerer zu verteidigen ist, falls das ATO die Erklärung anfragt.

## Was ist mit Rechnungen und Super?

ABN-Contractor-Arbeit erzeugt typischerweise keine Superbeiträge vom Kunden. Das ist einer der Trade-offs des Contractings:

- Angestellte: Kunde zahlt 12 % [Super](/de/superannuation) zusätzlich zum Lohn
- Contractor: Kunde zahlt nur, was die Rechnung sagt

Wenn du angestelltenähnliche Arbeit machst, aber als Contractor in Rechnung stellst, könntest du Opfer von Sham Contracting sein und Anspruch auf Super haben. Siehe unseren Artikel zu [Angestellter vs. Contractor](/de/blog/employee-vs-contractor-australia) für den Unterschied.

[Kontaktiere unser Team](/de/contact), wenn du Lohn-, Super- oder Arbeitsplatzprobleme hast - wir kümmern uns um die Steuer- und Superseite und koordinieren wo nötig mit Fair Work.
 `,
  },

  'do-working-holiday-makers-pay-tax-on-tips': {
    title: 'Müssen Working Holiday Maker in Australien Steuer auf Trinkgeld zahlen?',
    description: 'Ja, Trinkgeld, das du im Rahmen deiner Arbeit in Australien bekommst, ist steuerpflichtiges Einkommen. Hier erfährst du, wie es behandelt wird.',
    body: `
Ja, Trinkgeld, das in Australien bekommen wird, ist für Working Holiday Maker steuerpflichtiges Einkommen. Das gilt, egal ob das Trinkgeld bar direkt vom Kunden gezahlt wird, über ein vom Arbeitgeber verwaltetes Tronc-System verteilt wird oder auf die Rechnung aufgeschlagen und über deinen Lohnzettel ausgezahlt wird. Trinkgeld muss in deiner [Steuererklärung](/de/tax-return) zum 15 %-Working-Holiday-Maker-Satz angegeben werden. Wenn Trinkgeld über die Lohnabrechnung deines Arbeitgebers gezahlt wird, ist es meistens schon in deinem Income Statement enthalten. Bargeldtrinkgeld, das direkt gezahlt wird, musst du selbst verfolgen und angeben.

## Wie wird Trinkgeld steuerlich behandelt?

Das ATO behandelt alles Trinkgeld als steuerpflichtiges Einkommen:

- Unterliegt der Einkommensteuer zu deinem geltenden Satz
- Für Working Holiday Maker: 15 % auf die ersten 45.000 $ Gesamteinkommen
- Trinkgeld in jeder Form zählt (bar, Karte, Troncverteilung)
- Die Quelle (Kunde, Arbeitgeber, Dritter) ändert die Steuerbehandlung nicht

Trinkgeld nicht anzugeben ist Steuerhinterziehung - auch wenn die Beträge klein sind oder die Vereinbarung informell wirkt.

## Was, wenn dein Arbeitgeber Trinkgeld über die Lohnabrechnung verwaltet?

Wenn Trinkgeld von deinem Arbeitgeber verteilt wird (ein "Tronc"-System):

- Es ist meistens in deinem Bruttolohn auf deinem Lohnzettel enthalten
- Der Arbeitgeber behält gleichzeitig PAYG-Steuer ein
- Es erscheint automatisch in deinem jährlichen Income Statement
- Keine separate Maßnahme ist nötig, wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten

Prüfe deine Lohnzettel, um zu sehen, ob Trinkgeld als separater Posten gezeigt oder in deinen Bruttolohn aufgenommen wird. Wenn du unsicher bist, [schick uns deine Lohnzettel](/de/contact) und wir klären die Behandlung.

## Was, wenn du Bargeldtrinkgeld direkt bekommst?

Bargeldtrinkgeld, das direkt von Kunden gezahlt und nicht über die Lohnabrechnung läuft, ist trotzdem steuerpflichtig:

- Der volle Betrag muss angegeben werden
- Keine Steuer wird zum Zahlungszeitpunkt einbehalten (du schuldest sie am Jahresende)
- Du bist verantwortlich, Aufzeichnungen über erhaltenes Bargeldtrinkgeld zu führen

Viele Working Holiday Maker in der Gastronomie vergessen, Bargeldtrinkgeld anzugeben. Das ATO nutzt Branchen-Benchmarks und Analysen von Bankeinzahlungen, um wahrscheinlich nicht angegebenes Trinkgeldeinkommen aufzuspüren. Trinkgeld ehrlich anzugeben ist der richtige Ansatz - und beim 15 %-Working-Holiday-Maker-Satz ist die geschuldete Steuer überschaubar.

## Wie solltest du Bargeldtrinkgeld verfolgen?

Führe einfache Aufzeichnungen im Laufe des Jahres:

- Ein Notizbuch oder eine Handy-App mit täglichen Tagessummen des Bargeldtrinkgelds
- Datum, Schicht und erhaltener Betrag
- Notizen für ungewöhnliche Situationen (geteiltes Trinkgeld, Gruppentrinkgeld)

Du musst nicht jedes einzelne Trinkgeld einzeln erfassen. Eine tägliche oder wöchentliche Summe reicht aus. Wenn wir deine Steuererklärung vorbereiten, nutzen wir dieses Total zusammen mit deinem Lohneinkommen.

## Was ist mit Super auf Trinkgeld?

Die Superbehandlung von Trinkgeld hängt davon ab, wie es gezahlt wird:

- Trinkgeld über die Lohnabrechnung deines Arbeitgebers: kann in die Ordinary Time Earnings für die Superberechnung eingehen
- Bargeldtrinkgeld direkt von Kunden: generell nicht super-pflichtig

Die Details hängen von deinem Award ab und wie der Arbeitgeber das Trinkgeld klassifiziert. Wenn du vermutest, dass dein Trinkgeld Superbeiträge hätte generieren sollen, die nicht gezahlt wurden, [kontaktiere unser Team](/de/contact) und wir prüfen es.
 
## Wie Trinkgeld wirklich fließt (und wo die ATO hinschaut)

Kartentrinkgeld und Servicezuschläge laufen übers Lokal: durch die Lohnbuchhaltung, auf den Payslip, vorab gemeldet im Income Statement - mehr als kontrollieren musst du nicht. Bargeld-Trinkgeld läuft über niemanden: Es gehört als sonstiges Einkommen in die Erklärung, auf Basis deiner Ehrlichkeit und Notizen. Ein Wochenzettel (Datum, Lokal, ungefährer Betrag) genügt den Aufzeichnungspflichten. Der Versuchung, Bargeld zu verschweigen, stehen zwei Realitäten gegenüber: Die Gastro ist Dauergast in Data-Matching und Prüfungen, und deine eigenen Einzahlungen erzählen im Zweifel die Geschichte. Bei 15 % WHM-Satz kostet eine Saison ehrlicher Trinkgelder weniger als gedacht - und die Akte bleibt sauber für künftige Visa.
`,
  },

  'employer-asking-you-to-work-more-than-visa-allows': {
    title: 'Was tun, wenn dein Arbeitgeber dich mehr arbeiten lässt, als dein Visum erlaubt',
    description: 'Mehr zu arbeiten als dein Visum erlaubt, kann dein Visum gefährden. Hier erfährst du, was die Regeln sagen und was du tun kannst.',
    body: `
Working Holiday Visa kommen mit spezifischen Bedingungen, die begrenzen, wie lange du für denselben Arbeitgeber arbeiten kannst (Visumsbedingung 8547, die 6-Monatsgrenze) und verlangen, dass dein primärer Zweck in Australien ein Urlaub bleibt. Verstöße gegen diese Bedingungen können zur Visumsaufhebung führen. Wenn ein Arbeitgeber dich zu Vereinbarungen drängt, die deine Visumsbedingungen verletzen, hast du das Recht abzulehnen. Unser Team hilft Working Holiday Makern, ihre Visa-Arbeitsgrenzen zu verstehen und Situationen zu navigieren, in denen Arbeitgeber sie länger behalten wollen.

## Welche Arbeitsregeln gelten aktuell auf einem Working Holiday Visum?

Drei Hauptregeln zur Arbeit unter dem Visum gelten:

- **Bedingung 8547**: maximal 6 Monate beim selben Arbeitgeber (außer ausgenommen)
- **Primärer Zweck**: das Visum ist für einen Urlaub, mit Arbeit als sekundär
- **Gültiges Visum**: du musst ein aktuelles 417- oder 462-Visum halten, um zu arbeiten
- **Alle Fair-Work-Schutzmaßnahmen** gelten unabhängig vom Visastatus

Der Fair Work Act bestimmt, dass Vollzeitangestellte nicht regelmäßig mehr als 38 Stunden pro Woche plus angemessene zusätzliche Stunden arbeiten sollten.

## Wie funktioniert die 6-Monats-Arbeitgebergrenze?

Visumsbedingung 8547 begrenzt die Anstellung bei einem einzigen Arbeitgeber:

- Maximal 6 Monate beim selben Arbeitgeber
- Gezählt in **Kalendermonaten** ab deinem Startdatum (nicht nach Stunden)
- Gilt unabhängig von Vollzeit-, Teilzeit- oder Casualstatus
- Verstoß kann zur Visumsaufhebung führen
- Die 6 Monate setzen sich nur mit einer neuen Working Holiday Visa-Erteilung zurück

Die Bedingung gilt für alle Working Holiday Visuminhaber, aber viele Sektoren sind ausgenommen.

## Welche Sektoren erlauben dir, ohne Erlaubnis über 6 Monate hinaus zu arbeiten?

Du kannst ohne Erlaubnis über 6 Monate hinaus beim selben Arbeitgeber arbeiten, wenn die Arbeit ist in:

- Pflanzen- und Tierzucht (Landwirtschaft, Gartenbau)
- Fischerei und Perlenfischerei
- Baumzucht und -fällung
- Bergbau
- Bauwesen
- Tourismus und Gastronomie (überall in Australien)
- Gesundheit, Altenpflege und Behindertenpflege
- Kinderbetreuung
- Lebensmittelverarbeitung
- Wiederaufbau nach Naturkatastrophen
- Verschiedene Standorte desselben Arbeitgebers (wo kein einzelner Standort 6 Monate überschreitet)

Wenn deine Arbeit in diese Kategorien fällt, bist du automatisch ausgenommen und musst keine Erlaubnis beantragen.

## Was, wenn dein Sektor NICHT ausgenommen ist?

Wenn deine Tätigkeit nicht unter eine Ausnahme fällt, hast du drei Optionen:

1. **Arbeitgeber nach 6 Monaten wechseln**: sauberster Ansatz
2. **Schriftliche Erlaubnis vom Department of Home Affairs anfragen**, bevor die 6 Monate enden
3. **In eine andere Position bei einem anderen Arbeitgeber wechseln**

Eine Erlaubnisanfrage wird nach Ermessen des Departments gewährt und ist nicht garantiert.

## Was, wenn dein Arbeitgeber dich länger behalten will?

Wenn dein Arbeitgeber will, dass du über 6 Monate hinaus weiterarbeitest:

- Prüf, ob die Arbeit in einem ausgenommenen Sektor ist (meistens ist sie es)
- Falls ausgenommen, keine Aktion nötig, du kannst weitermachen
- Falls nicht ausgenommen, kann der Arbeitgeber eine Erlaubnisanfrage unterstützen
- Bis die Erlaubnis gewährt ist, musst du bei der 6-Monats-Marke aufhören zu arbeiten
- Wer ohne Erlaubnis weiterarbeitet, riskiert sein Visum

[Kontaktiere unser Team](/de/contact), wenn du unsicher bist, ob deine Arbeit für eine Ausnahme qualifiziert.

## Was solltest du tun, wenn du unter Druck stehst, außerhalb deines Visums zu arbeiten?

Du hast das Recht, Arbeit abzulehnen, die dein Visum verletzt:

- Die Visumsbedingungen sind gesetzliche Grenzen, nicht verhandelbar
- Arbeitgeber können dich nicht zwingen, über das hinaus zu arbeiten, was dein Visum erlaubt
- Dokumentiere jeden Druck oder Anfragen schriftlich
- [Kontaktiere unser Team](/de/contact) für Beratung, falls du unter Druck gerätst

Es ist illegal für Arbeitgeber, Visainhaber auszubeuten. Der Fair Work Act schützt alle Arbeitnehmer in Australien, unabhängig vom Visastatus. Probleme zu melden beeinflusst dein Visum nicht wegen spezifischer Arbeitnehmerschutzmaßnahmen.

## Was sind die Konsequenzen eines Verstoßes gegen Bedingung 8547?

Über 6 Monate ohne Erlaubnis oder Ausnahme zu arbeiten:

- Risiko der Visumsaufhebung
- Ablehnung zukünftiger australischer Visaanträge
- Der Arbeitgeber kann auch zivilrechtliche Strafen erhalten
- Compliance wird durch Department of Home Affairsprüfungen überwacht

Auch unbeabsichtigte Verstöße können zukünftige Visaergebnisse beeinflussen.

## Wie kannst du deinen Aufenthalt legitim verlängern?

Optionen für legitime Verlängerungen:

- **Zweitjahresvisum**: absolviere 88 Tage spezifizierte Arbeit in einer regionalen Gegend
- **Drittjahresvisum**: absolviere 6 Monate spezifizierte Arbeit in einer regionalen Gegend während deines zweiten Visums
- **Andere Visaklasse**: erkunde Skilled- oder Arbeitgeber-gesponserte Visa

Diese sind getrennt von "Erlaubnis zur Arbeit über 6 Monate hinaus" - sie verlängern deinen Aufenthalt, nicht deine Arbeitgeberbeziehung.

## Was ist mit deiner Steuerposition bei einem Arbeitgeber?

Für denselben Arbeitgeber zu arbeiten (unter Ausnahme oder mit Erlaubnis):

- Derselbe 15 %-Working-Holiday-Maker-Satz gilt durchweg
- [Super](/de/superannuation) läuft weiter (12 % zusätzlich zum Lohn)
- Alle Löhne kombinieren sich in deiner jährlichen [Steuererklärung](/de/tax-return)
- Keine Steuerstrafe für das Bleiben bei einem Arbeitgeber

Unser Team kümmert sich um Steuererklärungen für Working Holiday Maker in allen Anstellungskonfigurationen.
 
## Die richtige Antwort auf "passt schon, merkt keiner"

Das Risiko der Weiterarbeit über die 6-Monats-Grenze trägt dein Visum, nicht der Laden. Bevor du dich drängen lässt, drei Optionen: (1) prüfen, ob eine [offizielle Ausnahme](/de/blog/six-month-employer-rule-working-holiday-visa) greift (Branche, Region, andere Niederlassung), (2) beim Innenministerium die Verlängerung beantragen (wird durchaus bewilligt), (3) ablehnen und weiterziehen - nach sechs Monaten ist der elegante Abgang mit Referenz ohnehin der Standardzug. Schriftlich sichern: Die fordernden Nachrichten des Arbeitgebers aufheben - falls es je Visa-Fragen gibt, ist der Beleg des Drucks dein Schutzmaterial.
`,
  },

  'farm-work-rights-working-holiday-australia': {
    title: 'Deine Arbeitsrechte bei Farmarbeit in Australien mit Working Holiday Visum',
    description: 'Farmarbeit ist einer der häufigsten WHV-Jobs. Mindestlohn, Pausen, Unterkunft und Super - deine vollen gesetzlichen Rechte unter dem Horticulture Award.',
    body: `
Working Holiday Maker, die Farmarbeit in Australien machen, haben Anspruch auf dieselben Arbeitsplatzschutzmaßnahmen wie australische Arbeitnehmer. Dazu gehören Mindestlohn (oder höher unter dem Horticulture Award), sichere Arbeitsbedingungen, korrekte Lohnzettel und [Super](/de/superannuation) zu 12 % zusätzlich zum Lohn. Farmarbeit hat eine Geschichte von Lohndiebstahl und Ausbeutung, daher ist es wesentlich, deine Rechte zu kennen, bevor du anfängst. Unser Team hilft Working Holiday Makern in Farmarbeit, ihre Lohnsätze zu prüfen und unbezahlte Löhne oder Super zurückzuholen.

## Welche Schutzmaßnahmen gelten für Farmarbeit?

Alle Arbeitnehmer in Australien sind durch den Fair Work Act gedeckt, einschließlich:

- Mindestlohnschutzmaßnahmen
- Der relevante Branchen-Award (meistens der Horticulture Award für Farmarbeit)
- Sichere Arbeitsbedingungen
- Workers Compensation bei Arbeitsverletzungen
- Schutz vor Ausbeutung unabhängig vom Visastatus
- Recht auf korrekte Lohnzettel

Dein Visastatus reduziert diese Schutzmaßnahmen nicht.

## Was ist der Horticulture Award?

Die meiste Farmarbeit wird vom Horticulture Award abgedeckt, der Mindestsätze festlegt:

- Stündliche Mindestsätze (über dem nationalen Minimum in manchen Einstufungen)
- Piece-Rate-Richtlinien (bezahlt pro Bin, pro Kilogramm, pro Einheit)
- Erforderliche Top-up-Regeln: Piece-Rate-Arbeiter müssen mindestens das stündliche Minimum verdienen
- Penalty Rates für Überstunden, Wochenend- und Feiertagsarbeit

Dein Arbeitgeber muss den höheren Betrag zahlen zwischen dem Piece Rate und dem stündlichen Minimum für jede gearbeitete Stunde.

## Wie interagieren Piece Rates und Mindestlohn?

Viele Farmen zahlen nach Piece Rate (pro Bin, pro Kilogramm), was unter dem Horticulture Award legal ist. Allerdings:

- Dein Stundenverdienst muss mindestens dem Casual-Mindeststundenlohn entsprechen
- Für 2026-27 ist das Casual-Minimum etwa 33,05 $/Stunde einschließlich Casual Loading
- Wenn Piece-Rate-Einkünfte für eine Stunde darunter fallen, muss der Arbeitgeber deinen Lohn aufstocken
- Die Aufstockung ist eine gesetzliche Anforderung, nicht optional

Wenn du vermutest, dass deine Piece-Rate-Einkünfte konsistent unter dem stündlichen Minimum liegen, [kontaktiere unser Team](/de/contact). Wir helfen Working Holiday Makern, geschuldete Aufstockungsbeträge zurückzuholen.

## Was ist mit Abzügen vom Lohn?

Manche Farmen ziehen Kosten für Unterkunft, Transport oder Mahlzeiten ab. Das ist nur legal, wenn:

- Du im Voraus schriftlich zugestimmt hast
- Die Beträge angemessen sind und die tatsächlichen Kosten widerspiegeln
- Abzüge deinen Lohn nie unter den Mindestlohn bringen

Abzüge, die diese Bedingungen verletzen, sind illegal. Wir sehen das regelmäßig in Farmarbeit und haben zu viel berechnete Beträge zurückgeholt. [Schick uns deine Aufzeichnungen](/de/contact), wenn du denkst, dass du zu viel berechnet wurdest.

## Was solltest du tun, wenn du Unterbezahlung vermutest?

Schritte, falls du falsch bezahlt wirst:

1. Führe detaillierte Aufzeichnungen (Stunden, Daten, Piece Counts, erhaltener Lohn)
2. Vergleiche gegen die Horticulture Award-Sätze
3. Sprich das Thema bei deinem Arbeitgeber mit ruhigen, sachlichen Belegen an
4. Wenn ungeklärt, [kontaktiere unser Team](/de/contact) zur Eskalation

Meldungen können erstattet werden, ohne dein Visum zu beeinflussen. Die Workplace Justice Visaregelung schützt temporäre Visainhaber, die Beschwerden verfolgen.

## Was ist mit Super bei Farmarbeit?

Wenn du Angestellter (nicht Contractor) auf einer Farm bist:

- Der Arbeitgeber muss 12 % Super zusätzlich zu deinem Lohn zahlen
- Gilt für alle Angestellten unabhängig von Stunden
- Super wird vierteljährlich in deinen nominierten Fonds gezahlt
- Kann über DASP beim Verlassen Australiens zurückgeholt werden

Viele Farmarbeitgeber überspringen Super für Working Holiday Maker. Unser Team kann unbezahlte Super über den formalen Superannuation Guarantee Chargeprozess zurückholen. Siehe unseren Artikel zu [Farmarbeit und ABNs](/de/blog/farm-work-and-abns), falls du unsicher bist, ob du Angestellter oder Contractor bist.
 `,
  },

  'what-is-superannuation-guarantee-charge': {
    title: 'Was ist die Superannuation Guarantee Charge und was bedeutet sie für dich?',
    description: 'Wenn dein Arbeitgeber deine Super nicht korrekt zahlt, kann das ATO ihn mit der Superannuation Guarantee Charge belasten.',
    body: `
Die [Superannuation](/de/superannuation) Guarantee Charge (SGC) ist eine Strafe, die das ATO auf Arbeitgeber anwendet, die Super ihrer Angestellten nicht korrekt oder rechtzeitig zahlen. Wenn dein Arbeitgeber Superzahlungen verpasst hat, kann unser Team helfen, sie über den SGC-Prozess zurückzuholen. Die Strafe enthält den unbezahlten Superbetrag, 10 % Zinsen pro Jahr und eine Verwaltungsgebühr - alles wird vom Arbeitgeber zahlbar. Das macht es teuer für Arbeitgeber, Super zu überspringen, was genau der Sinn der Regel ist.

## Was löst die SGC aus?

Die SGC gilt, wenn ein Arbeitgeber:

- Die geforderte Super nicht zahlt (12 % der Ordinary Time Earnings ab Juli 2025)
- Super zu spät zahlt (nach der Quartalsfrist)
- Weniger als den geforderten Betrag zahlt
- In den falschen Fonds zahlt (in manchen Fällen)

Die vierteljährlichen Superfristen sind:

- Q1 (Juli-September): fällig bis 28. Oktober
- Q2 (Oktober-Dezember): fällig bis 28. Januar
- Q3 (Januar-März): fällig bis 28. April
- Q4 (April-Juni): fällig bis 28. Juli

Wenn ein Arbeitgeber eine davon verpasst, haftet er für die SGC.

## Was enthält die SGC?

Die SGC ist für Arbeitgeber teurer als pünktlich Super zu zahlen. Sie enthält:

- Den ursprünglichen unbezahlten Superbetrag (den "Shortfall")
- Eine Zinskomponente von 10 % pro Jahr auf den Shortfall
- Eine Verwaltungsgebühr pro Angestelltem pro Quartal

Anders als reguläre Superbeiträge ist die SGC für den Arbeitgeber **nicht steuerlich abzugsfähig**. Das macht eine vorsätzliche Nichtzahlung zu einem teuren Fehler.

## Was passiert mit deiner Super, wenn die SGC angewendet wird?

Der Rückforderungsprozess schützt dich:

1. Das ATO sammelt den SGC-Betrag vom Arbeitgeber
2. Der Superanteil wird in deinen genannten Fonds gezahlt (oder beim ATO gehalten, falls keine Fondsdaten existieren)
3. Der Zinsanteil wird ebenfalls über deine Super an dich gezahlt
4. Deine Superposition wird wiederhergestellt, als ob der Arbeitgeber pünktlich gezahlt hätte

Das heißt, deine Super ist letztlich auch dann geschützt, wenn der Arbeitgeber anfangs nicht gezahlt hat. Der Haken: Der SGC-Prozess kann Monate oder Jahre dauern - je früher du unbezahlte Super geltend machst, desto besser.

## Wie weißt du, ob dein Arbeitgeber mit Super im Rückstand ist?

Prüfe dein Superfondsguthaben regelmäßig:

- Logge dich in deinen Superfonds ein und prüfe die Beitragshistorie
- Gleiche mit deinen Lohnzetteln ab (der Superposten)
- Schau nach jedem Quartal ohne Beitrag, das einen haben sollte
- Vergleich was gezahlt wurde mit dem, was dein Lohnzettel sagt

[Kontaktiere unser Team](/de/contact) und wir können diese Prüfung für dich über alle Fonds machen, die mit deiner TFN verknüpft sind.

## Wie hilft unser Team, unbezahlte Super zurückzuholen?

Unser SGC-Rückforderungsprozess:

1. Wir sammeln Belege unbezahlter Super (Lohnzettel, Superstatements, Beschäftigungsdaten)
2. Wir berechnen den Shortfall und den Zinsbetrag
3. Wir reichen die Rückforderungsanfrage beim ATO ein
4. Wir fassen mit ATO und Arbeitgeber durch den Prozess nach
5. Der SGC-Betrag fließt zurück in deinen Superfonds oder direkt an dich

Wir haben Working Holiday Makern geholfen, Tausende an unbezahlter Super über den SGC-Prozess zurückzuholen. Das funktioniert auch nach Verlassen Australiens. [Schick uns deine Daten](/de/contact), wenn du unbezahlte Super vermutest.

## Welche Unterlagen unterstützen einen SGC-Anspruch?

Je stärker deine Unterlagen, desto schneller die Rückforderung:

- Alle Lohnzettel mit Superposten (oder mit nicht gezahlter Super)
- Beschäftigungsdaten und Wochenstunden
- Lohnsätze und Bruttoverdienste
- Arbeitgebername, ABN und Geschäftsadresse
- Jede Kommunikation mit dem Arbeitgeber über Super

Wenn du nicht all das hast, arbeiten wir mit dem, was du hast. Auch teilweise Unterlagen können einen erfolgreichen Anspruch unterstützen.
 `,
  },

  'public-holidays-australia-working-holiday': {
    title: 'Gesetzliche Feiertage in Australien: was Working Holiday Maker wissen müssen',
    description: 'Feiertage in Australien kommen mit höheren Lohnsätzen und unterschiedlichen Regeln je nach Anstellungsart. Im Folgenden alles im Überblick.',
    body: `
Gesetzliche Feiertage in Australien ziehen höhere Lohnsätze für Arbeitnehmer an - typischerweise 225-250 % deines normalen Satzes (zweieinhalbfacher Lohn). Working Holiday Maker haben Anspruch auf dieselben Feiertags-Penalty-Rates wie australische Arbeitnehmer. Es gibt nationale Feiertage, die im ganzen Land beobachtet werden (Neujahr, Australia Day, ANZAC Day, Weihnachten usw.), und zusätzliche bundesstaats-spezifische Feiertage. Wenn dein Lohnzettel den höheren Satz für Feiertagsarbeit nicht zeigt, kann unser Team helfen, das zurückzuholen, was dir geschuldet wird.

## Was sind die nationalen Feiertage in Australien?

Feiertage, die im ganzen Land beobachtet werden:

- **1. Januar**: Neujahrstag
- **26. Januar**: Australia Day
- **Karfreitag und Ostermontag**: Daten variieren jedes Jahr
- **25. April**: ANZAC Day
- **25. Dezember**: Weihnachten
- **26. Dezember**: Boxing Day

Der King's Birthday ist auch ein nationaler Feiertag, wird aber zu verschiedenen Daten je Bundesstaat begangen. In den meisten Bundesstaaten fällt er auf den zweiten Montag im Juni, aber Queensland und Western Australia beobachten ihn anders.

## Welche bundesstaats-spezifischen Feiertage gibt es?

Jeder Bundesstaat und jedes Territorium fügt seine eigenen Feiertage hinzu:

- **Victoria**: Melbourne Cup Day (erster Dienstag im November), AFL Grand Final Friday
- **NSW**: Bank Holiday (erster Montag im August, nur Banken)
- **Queensland**: Royal Queensland Show (die Ekka, nur Brisbane)
- **South Australia**: Adelaide Cup Day, Proclamation Day
- **Western Australia**: WA Day (erster Montag im Juni)
- **Tasmania**: Royal Hobart Show Day, Eight Hours Day

Der Labour Day fällt in verschiedenen Bundesstaaten auf verschiedene Daten. Als Working Holiday Maker, der zwischen Bundesstaaten wechselt, prüf den lokalen Feiertagskalender, wo immer du gerade bist.

## Welcher Lohnsatz gilt an Feiertagen?

Feiertags-Penalty-Rates gehören zu den höchsten in der australischen Beschäftigung:

- **Standard-Feiertagssatz**: 225 % deines normalen Satzes (zweieinhalbfacher Lohn abzüglich eines Viertels)
- **Bei manchen Awards**: 250 % (zweieinhalbfacher Lohn)
- **Casualangestellte**: das 25 %-Casual Loading ist schon in deinem Basissatz, sodass die Feiertagssatzberechnung leicht abweichen kann

Beispiele für einen Working Holiday Maker mit 25 $/Stunde normalem Satz:

- 225 %-Feiertagssatz: 56,25 $/Stunde
- 250 %-Feiertagssatz: 62,50 $/Stunde

Diese Sätze gelten für **alle am Feiertag gearbeiteten Stunden**, einschließlich Stunden, die normalerweise reguläre Schichten wären.

## Darf dein Arbeitgeber verlangen, dass du an einem Feiertag arbeitest?

Unter dem Fair Work Act:

- Arbeitgeber können Angestellte **bitten**, einen Feiertag zu arbeiten
- Angestellte haben das Recht abzulehnen, wenn die Bitte unangemessen ist
- Eine Ablehnung kann nicht als Kündigungsgrund verwendet werden
- Angemessene Bitten berücksichtigen Geschäftsbedarf, Mitarbeiterumstände und gegebene Frist

Für Casualarbeiter kannst du typischerweise eine Feiertagsschicht ohne Konsequenz ablehnen. Für festangestellte Arbeitnehmer kann eine Ablehnung je nach Angemessenheit der Bitte Implikationen haben.

## Was, wenn du an einem Feiertag nicht arbeitest?

Für festangestellte Arbeitnehmer (Vollzeit und Teilzeit):

- Wenn ein Feiertag auf einen Tag fällt, an dem du normalerweise arbeitest, bekommst du deinen normalen Lohn für diesen freien Tag
- Das wird zum Basissatz gezahlt (keine Penalty)
- Dieser Anspruch gilt nicht für Casualangestellte

Für Casualangestellte:

- Du wirst nicht für Feiertage bezahlt, an denen du nicht arbeitest
- Das 25 %-Casual Loading soll das Fehlen bezahlter Feiertage ausgleichen

## Gibt es Überstunden zusätzlich zu Feiertagssätzen?

Generell nicht. Der Feiertagssatz ist schon auf maximalem Penaltyniveau:

- Der Feiertagssatz gilt für alle gearbeiteten Stunden
- Kein zusätzlicher Überstundenaufschlag oben drauf
- Manche spezifische Awards können Nuancen haben; der Feiertagssatz absorbiert meistens die Überstunden

## Was solltest du nach einem Feiertag auf deinem Lohnzettel prüfen?

Nach einer Woche mit einem Feiertag:

- Bestätige, dass der Feiertagssatz separat von regulären Stunden gezeigt wird
- Prüf, ob der Satz der Award-Penalty entspricht (meistens 225-250 %)
- Verifiziere, dass die Gesamtstunden am Feiertag korrekt gezählt sind
- Vergleiche mit deinem Schichtplan

Wenn dein Lohn den korrekten Feiertagssatz nicht widerspiegelt, [kontaktiere unser Team](/de/contact). Wir helfen Working Holiday Makern, Penalty Rateunterbezahlungen über die richtigen Kanäle zurückzuholen.
 
## Die Feiertagskalender-Strategie für Casuals

Feiertage teilen sich nach Bundesstaat - nationale (Neujahr, Australia Day, Karfreitag, Ostermontag, Anzac Day, Weihnachten, Boxing Day) plus staatsspezifische (Melbourne Cup in VIC, diverse Show Days) - und jeder gearbeitete zahlt Casuals Zuschläge, unter Gastro- und Retail-Awards üblich 225-250 %. Die Strategie: Wer die Schichten nimmt, die Locals meiden (Weihnachten, Ostern), sammelt Zweieinhalbfach-Tage, die den Monat spürbar heben. Der Check: Der Payslip muss für genau diese Stunden den Feiertagssatz zeigen - Flatrate am Feiertag ist [Unterbezahlung, noch in derselben Woche ansprechen](/de/blog/employer-not-paying-correctly).
`,
  },

  'casual-shift-cancellation-rules-australia': {
    title: 'Casual-Schicht abgesagt? Deine Rechte und Bezahlung (2026)',
    description: 'Arbeitgeber dürfen Casual-Schichten absagen - aber Fair-Work-Regeln sichern dir oft eine Mindestbezahlung. Fristen, Ansprüche und was du jetzt tun kannst.',
    body: `
Ja, dein Arbeitgeber darf eine Casualschicht in Australien absagen, aber es gibt Regeln. Wenn eine Schicht mit weniger als 24 Stunden Vorankündigung abgesagt wird und du schon Vorbereitungen getroffen hast, zu erscheinen, verlangen die meisten Awards, dass der Arbeitgeber dir trotzdem ein "Mindesteinsatz" von 2-3 Stunden zahlt. Die genaue Regel hängt vom Award ab, der deine Branche abdeckt. Unser Team hilft Working Holiday Makern zu prüfen, ob sie für abgesagte Schichten unterbezahlt wurden und das zurückzuholen, was ihnen geschuldet wird.

## Darf dein Arbeitgeber eine Casualschicht absagen?

Ja, aber nicht ohne Konsequenzen:

- Arbeitgeber dürfen Schichten aus geschäftlichen Gründen absagen
- Angemessene Frist sollte gegeben werden
- Kurzfristige Absagen können Mindestzahlungspflichten auslösen
- Die genauen Regeln hängen von deinem Award ab

Du hast kein garantiertes Recht auf jede Schicht im Plan. Casual-Anstellung ist von Natur aus flexibel, mit Schichten, die von Woche zu Woche variieren.

## Was ist die Mindesteinsatzzahlung?

Die meisten modernen Awards enthalten eine Mindesteinsatzperiode für Casual-Angestellte:

- **Hospitality Industry (General) Award**: 2 Stunden Minimum
- **General Retail Industry Award**: 3 Stunden Minimum
- **Cleaning Services Award**: 3 Stunden Minimum
- **Horticulture Award**: variiert je Einstufung

Das heißt, wenn deine Schicht mit sehr kurzer Frist abgesagt wird (oder du zur Arbeit kommst und sofort heimgeschickt wirst), hast du generell Anspruch auf Bezahlung für mindestens die Mindesteinsatzstunden.

Das genaue Minimum variiert je Branche. [Kontaktiere unser Team](/de/contact), um die Regel für deinen spezifischen Award zu prüfen.

## Was, wenn du früh nach Hause geschickt wirst?

Wenn du zur Arbeit ankommst und nach Hause geschickt wirst, bevor du deine Schicht abgeschlossen hast:

- Dieselben Mindesteinsatzregeln gelten
- Außer du hast schon das Minimum gearbeitet (2-3 Stunden), muss der Arbeitgeber bis dahin zahlen
- Das gilt auch, wenn das Geschäft langsam ist oder der Arbeitsplatz unerwartet geschlossen ist

Zum Beispiel: bei einer 6-Stundenschicht, die nach 1 Stunde abgesagt wird, würdest du immer noch für das volle Mindesteinsatz bezahlt (typischerweise 2-3 Stunden je Award).

## Haben Casuals Anspruch auf Krankengeld?

Nein. Casual-Angestellte bekommen keinen bezahlten Krankenurlaub:

- Du wirst nicht für Schichten bezahlt, an denen du wegen Krankheit nicht teilnehmen kannst
- Das 25 %-Casual Loading soll das Fehlen bezahlten Urlaubs ausgleichen
- Festangestellte sammeln Krankheitsurlaubsansprüche an; Casuals erhalten stattdessen einen höheren Stundenlohn

Das ist ein grundlegender Kompromiss der Casual-Anstellung.

## Gibt es eine Mindestanzahl an Schichten pro Woche?

Nein. Casualanstellung garantiert keine Anzahl an Schichten:

- Dein Arbeitgeber ist nicht verpflichtet, dich für eine Mindestanzahl an Stunden einzuplanen
- Schichten hängen vom Geschäftsbedarf ab
- Wenn die Schichten ausbleiben, gibt es generell keine rechtliche Abhilfe

Manche langfristigen Casuals können nach einer definierten Periode auf eine Umwandlung in eine Festanstellung bestehen, aber das ist für Working Holiday Maker mit kürzeren Aufenthalten ungewöhnlich.

## Was solltest du tun, wenn deine Schichten ungerecht abgesagt werden?

Wenn du keine Mindesteinsatzzahlungen bekommst:

1. Führe Aufzeichnungen über deinen Schichtplan, ursprüngliche Schichtzeiten und Absage-Mitteilungen
2. Notiere die Zeit zwischen Absagemitteilung und der geplanten Schicht
3. Vergleiche, was du bezahlt bekommen hast, mit dem Mindesteinsatz unter deinem Award
4. Sprich es zunächst mit deinem Arbeitgeber an
5. Wenn ungeklärt, [kontaktiere unser Team](/de/contact)

Unser Team hilft Working Holiday Makern zu berechnen, was geschuldet wurde, und die unbezahlten Mindesteinsatzbeträge zurückzuholen.

## Welche Aufzeichnungen unterstützen einen Anspruch?

Um einen Anspruch auf unbezahltes Mindesteinsatz zu unterstützen:

- Dein Schichtplan, der die abgesagten Schichten zeigt
- Textnachrichten, E-Mails oder App-Benachrichtigungen über Absagen
- Die Zeit und das Datum jeder Absagemitteilung
- Lohnzettel, die zeigen, was gezahlt wurde
- Der Award und die Einstufung, die deine Rolle abdecken

Je vollständiger die Aufzeichnungen, desto einfacher die Rückforderung.
 `,
  },

  'six-month-employer-rule-working-holiday-visa': {
    title: 'Die 6-Monats-Regel beim 417/462-Visum (Update 2026)',
    description: 'Working Holiday Maker dürfen normalerweise nur 6 Monate beim selben Arbeitgeber arbeiten - mit wichtigen Ausnahmen nach Branche und Region. So funktioniert es.',
    body: `
Die 6-Monats-Arbeitgeberregel (Visumsbedingung 8547) begrenzt Working Holiday Visuminhaber (Subclass 417 und 462) auf maximal 6 Kalendermonate Arbeit beim selben Arbeitgeber. Die Regel ist verpflichtend und bleibt 2026 in Kraft. Allerdings sind viele Sektoren von dieser Grenze ausgenommen, einschließlich Landwirtschaft, Tourismus/Gastronomie, Bauwesen, Bergbau, Altenpflege, Kinderbetreuung und Wiederaufbau nach Naturkatastrophen. Außerhalb dieser Ausnahmen musst du nach 6 Monaten den Arbeitgeber wechseln oder schriftliche Erlaubnis vom Department of Home Affairs anfragen. Unser Team hilft Working Holiday Makern zu verstehen, ob ihre Arbeit für eine Ausnahme qualifiziert.

## Was ist die 6-Monats-Arbeitgeberregel?

Visumsbedingung 8547 gilt für alle Working Holiday Maker (Subclass 417 und 462):

- Maximal **6 Monate** Arbeit beim selben Arbeitgeber
- Gezählt in **Kalendermonaten** ab deinem Startdatum
- Basiert auf Kalenderzeit, nicht auf Stunden oder gearbeiteten Tagen
- Ein Verstoß kann zur Visumsaufhebung führen
- Die 6 Monate setzen sich nur zurück, wenn ein neues Working Holiday Visum gewährt wird

Die Bedingung existiert, um das Working Holiday Visum auf Reisen und kulturellen Austausch zu fokussieren statt auf langfristige Anstellung.

## Was zählt als derselbe Arbeitgeber?

Die 6-Monats-Grenze gilt für die juristische Geschäftseinheit (ABN), nicht nur den physischen Arbeitsplatz:

- **Dasselbe Unternehmen, verschiedene Filialen**: zählt meistens als derselbe Arbeitgeber
- **Dasselbe Unternehmen, verschiedene ABNs**: verschiedene Arbeitgeber
- **Franchises mit verschiedenen Eigentümern**: typischerweise verschiedene Arbeitgeber
- **Labour-Hire-Vereinbarungen**: der Endnutzer (wo du tatsächlich arbeitest) ist der Arbeitgeber
- **Selbstständig/Contractor**: jeder Endkunde wird als separater Arbeitgeber behandelt

Für Contractor: wenn du Dienstleistungen für einen einzelnen Endkunden erbringst, ist dieser Kunde für die 6-Monats-Regel dein Arbeitgeber. Mit mehreren Kunden zu arbeiten lässt dich die 6 Monate überschreiten, ohne gegen die Regel zu verstoßen.

## Welche Arbeit ist von der 6-Monats-Regel ausgenommen?

Das Department of Home Affairs hat mehrere Ausnahmen genehmigt. Du kannst ohne Erlaubnis über 6 Monate hinaus arbeiten, wenn deine Arbeit ist in:

- **Pflanzen- und Tierzucht** (Landwirtschaft, Gartenbau)
- **Fischerei und Perlenfischerei**
- **Baumzucht und -fällung**
- **Bergbau**
- **Bauwesen**
- **Tourismus und Gastronomie** (überall in Australien)
- **Gesundheit, Altenpflege und Behindertenpflege**
- **Kinderbetreuung**
- **Lebensmittelverarbeitung**
- **Wiederaufbau nach Naturkatastrophen**
- **Verschiedene Standorte desselben Arbeitgebers** (wo kein Standort 6 Monate überschreitet)

Diese Ausnahmen decken die Mehrheit der Jobs ab, die Working Holiday Maker typischerweise annehmen - für die meisten Backpacker ist die 6-Monats-Regel also kein praktisches Problem.

## Wie arbeitest du über 6 Monate hinaus in einem nicht-ausgenommenen Sektor?

Wenn deine Rolle nicht unter eine Ausnahme fällt, musst du:

1. **Eine schriftliche Erlaubnisanfrage einreichen**, bevor die 6 Monate enden
2. **Operative Notwendigkeit** oder andere zwingende Umstände demonstrieren
3. **Auf eine schriftliche Entscheidung warten** (du kannst weiterarbeiten, während die Anfrage anhängig ist)
4. **Aufhören zu arbeiten**, falls die Anfrage abgelehnt wird

Das Department hat Ermessen, die Erlaubnis zu genehmigen oder abzulehnen. Übliche Gründe für Genehmigung:

- Du hast ein neues Visum beantragt, das Vollzeitarbeit erlaubt
- Kritischer oder Prioritätssektor mit Arbeitgeberunterstützung
- Zwingende operative Gründe

## Was passiert, wenn du Bedingung 8547 verletzt?

Das Department überwacht aktiv Compliance. Ein Verstoß kann führen zu:

- Visumsaufhebung
- Ablehnung zukünftiger australischer Visaanträge
- Zivilrechtliche Strafen für den Arbeitgeber
- Complianceprobleme für sowohl Arbeitnehmer als auch Arbeitgeber

Auch unbeabsichtigte Verstöße können zukünftige Visaergebnisse beeinflussen. Die Regel wird strikt durchgesetzt.

## Was ist mit der 88-Tage-spezifizierten-Arbeitanforderung?

Die 88-Tageregel für ein Zweitjahresvisum ist **getrennt** von Bedingung 8547:

- 88 Tage spezifizierte Arbeit in einer regionalen Gegend ist für ein Zweitjahresvisum nötig
- Die Arbeit muss in genehmigten Branchen und regionalen Postleitzahlen sein
- Die meisten spezifizierten Arbeitsbranchen sind auch von der 6-Monats-Regel ausgenommen
- Du kannst alle 88 Tage in vielen Fällen bei einem Arbeitgeber absolvieren

Für ein drittes Working Holiday Visum beträgt die Anforderung 6 Monate (179 Tage) spezifizierte Arbeit während deines zweiten Visums.

## Was bedeutet das für Steuer und Super?

Unter der 6-Monats-Regel (oder einer Ausnahme) zu arbeiten:

- Derselbe 15 %-Working-Holiday-Maker-Satz gilt durchweg
- [Super](/de/superannuation) läuft weiter (12 % zusätzlich zum Lohn)
- Alle Löhne kombinieren sich in deiner jährlichen [Steuererklärung](/de/tax-return)
- Super von jedem Arbeitgeber akkumuliert in seinem nominierten Fonds

Für Superakkumulation hilft es, länger für einen Arbeitgeber zu arbeiten (wo erlaubt), weil es Beiträge in weniger Fonds konsolidiert. Siehe unseren Artikel zu [verlorene Super finden](/de/blog/how-to-find-lost-superannuation).

## Welche praktischen Schritte solltest du unternehmen?

Um konform zu bleiben:

- Führe Aufzeichnungen über deine Start- und Enddaten bei jedem Arbeitgeber
- Prüf, ob deine Arbeit in einen ausgenommenen Sektor fällt
- Falls nicht ausgenommen, plane, vor der 6-Monatsmarke den Arbeitgeber zu wechseln
- Oder reiche eine Erlaubnisanfrage ein, bevor die 6 Monate enden
- Behalte die Arbeitgeber-ABN auf deinen Lohnzetteln, um die juristische Einheit zu verifizieren

Wenn du unsicher bist, ob deine Arbeit für eine Ausnahme qualifiziert, [kontaktiere unser Team](/de/contact) und wir prüfen die Details deiner Situation.
 
## Die Ausnahmen, die kaum jemand kennt

Die 6-Monats-Grenze pro Arbeitgeber hat offizielle Ausnahmen: Arbeit in verschiedenen Niederlassungen desselben Arbeitgebers, bestimmte Branchen (Landwirtschaft, Pflege, Tourismus und Gastgewerbe in Nordaustralien) und von Innenministerium bewilligte Verlängerungsanträge. Wichtig ist die Beweislage: Der Verstoß trifft dein Visum, nicht den Betrieb - bevor du auf Zuruf "einfach weiterarbeitest", hole die Ausnahme schriftlich ein oder stelle den Antrag. Und parallel gilt die Steuerseite unverändert: gleiche Sätze, gleiche TFN, nur die [Arbeitgeber-Registrierung](/de/blog/backpacker-tax-rate-australia) kann zwischen Job eins und zwei wechseln.
`,
  },

  'trs-tourist-refund-scheme-australia': {
    title: 'TRS: 10 % GST am Flughafen zurückholen (Regeln 2026)',
    description: 'Ab 300 $ bei einem Händler innerhalb von 60 Tagen vor Abflug gibt es die GST zurück. So funktioniert das Tourist Refund Scheme Schritt für Schritt.',
    body: `
Das Tourist Refund Scheme (TRS) erlaubt es dir, die 10 % Goods and Services Tax (GST) auf in Australien gekaufte Waren zurückzuholen, bevor du nach Hause fliegst. Voraussetzungen: Die Rechnung muss 300 $ oder mehr von einem einzelnen Geschäft (eine einzige ABN) betragen, innerhalb von 60 Tagen vor Abreise gekauft sein, und du musst die Waren bei dir tragen. Anträge werden am Flughafen vor der Passkontrolle gestellt. Bei einem Laptop für 1.000 $ erhältst du etwa 91 $ GST zurück. Für Working Holiday Maker, die Australien verlassen, lohnt sich das TRS bei größeren Käufen.

## Was ist das Tourist Refund Scheme?

Das TRS ist ein Regierungsprogramm, das abreisenden Reisenden erlaubt, die auf australische Waren gezahlte GST zurückzuholen, die sie mit nach Hause nehmen:

- Wird von der Australian Border Force betrieben
- Verfügbar an internationalen Flughäfen und einigen Seehäfen
- Erstattet 10 % GST (und 14,5 % Wine Equalisation Tax auf Wein)
- Verfügbar für alle Reisenden, einschließlich Working Holiday Maker

Das Programm existiert, weil GST in Australien als Verbrauchssteuer gedacht ist. Wenn du Waren aus dem Land nimmst, sollte die Steuer nicht gelten.

## Wer kann TRS beantragen?

Jeder Reisende, der Australien verlässt, einschließlich:

- Working Holiday Visuminhaber
- Touristen
- Australische Residenten, die ins Ausland reisen (in manchen Fällen)
- Internationale Studenten, die nach Hause zurückkehren

Die Hauptanforderung: du verlässt Australien und nimmst die Waren mit.

## Welche Käufe qualifizieren sich für TRS?

Um berechtigt zu sein, müssen deine Käufe all diese Bedingungen erfüllen:

- Waren gekauft von **einem einzelnen Geschäft unter einer einzigen ABN**
- Gesamt-Rechnungsbetrag von **300 $ oder mehr** (einschließlich GST)
- Gekauft **innerhalb von 60 Tagen** vor deiner Abreise
- Waren sind **verfügbar zur Prüfung** am Flughafen
- Waren sind **physisch** (keine Dienstleistungen, Hotels oder Unterkünfte)

Die meisten physischen Waren qualifizieren sich:

- Elektronik, Kameras, Handys, Laptops
- Uhren, Schmuck, Gepäck
- Kleidung, Schuhe, Accessoires
- Sportartikel, Surfbretter

Was NICHT qualifiziert:

- Dienstleistungen (Massagen, Unterkunft, Touren)
- Schon genutzte Verbrauchsgüter (Lebensmittel, geöffnete Getränke, benutzte Toilettenartikel)
- Tabakprodukte
- GST-freie Artikel (manche Lebensmittel, medizinische Artikel)
- Waren, die du schon per Post oder Versand nach Hause geschickt hast

## Welche Dokumente brauchst du für den Antrag?

Bring zum Antrag mit:

- Deinen **Reisepass**
- Deinen **Boarding Pass oder Flugschein**, der die Abreise zeigt
- Original-**Tax Invoices** für jeden Kauf
- Die **Waren selbst**

Die Tax Invoice muss zeigen:

- Name und ABN des Verkäufers
- Den gezahlten GST-Betrag (oder den Gesamtbetrag einschließlich GST)
- Eine Beschreibung der Waren
- Das Kaufdatum

Bei Rechnungen über 1.000 $ muss dein vollständiger Name auf der Rechnung stehen. Bitte den Händler beim Kauf, deinen Namen auf große Rechnungen zu setzen.

## Wie machst du einen TRS-Antrag?

Der Prozess am Flughafen:

1. Komm mit extra Zeit am Flughafen an (rechne mindestens 60 Minuten für TRS ein)
2. Checke wie üblich für deinen Flug ein
3. Nimm dein Handgepäck mit den Waren, die du beantragen willst, mit
4. Finde die TRS-Anlage (meistens im internationalen Terminal nach der Sicherheitskontrolle)
5. Zeig deinen Reisepass, Boarding Pass und Tax Invoices vor
6. Zeig deine Waren zur Inspektion
7. Erhalte deine Rückerstattung

Die Bearbeitung dauert typischerweise 15-30 Minuten, je nach Wartezeit. Die MyTRS-App erlaubt Voranmeldung, um die Sachen am Flughafen zu beschleunigen.

## Wie wird die Rückerstattung gezahlt?

Du kannst wählen, wie du deine TRS-Rückerstattung erhältst:

- Kreditkartenerstattung (am beliebtesten, erscheint meistens innerhalb von 5 Werktagen)
- Direktüberweisung auf ein australisches oder internationales Bankkonto
- Scheck (am langsamsten)

Australische Kreditkarten sind typischerweise am schnellsten. Wenn du dein australisches Bankkonto geschlossen hast, wähle die Kreditkartenoption.

## Lohnt sich die TRS-Rückerstattung den Aufwand?

Bei größeren Käufen, ja:

- Laptop für 1.000 $ → ~91 $ GST-Rückerstattung
- Kamera für 2.000 $ → ~182 $ GST-Rückerstattung
- Uhr für 500 $ → ~45 $ GST-Rückerstattung
- 3.000 $ in Elektronik → ~273 $ GST-Rückerstattung

Wenn du während deiner Zeit in Australien viel ausgegeben hast, kann die Gesamtsumme auf mehrere Hundert Dollar steigen. Die 15-30 Minuten am Flughafen sind dieser Rendite wert.

## Welche Belege solltest du aufbewahren?

Während deines Aufenthalts in Australien:

- Speichere jede Tax Invoice von größeren Käufen
- Fotografiere Quittungen sofort (Papier kann verblassen)
- Gruppiere Rechnungen nach Händler (mehrere Käufe vom selben Geschäft können kombiniert werden, um 300 $ zu erreichen)
- Halte Rechnungen bei Abreise im Handgepäck zugänglich

Käufe unter der 300 $-Schwelle zu kombinieren hilft. Zwei 200 $-Artikel vom selben Apple Store zu kaufen qualifiziert sich (kombinierte 400 $-Rechnung, wenn zusammen abgerechnet). Dieselben Käufe von verschiedenen Händlern kombinieren sich nicht.

Der TRS-Prozess selbst wird am Flughafen vor deinem Abflug gemacht, aber das Timing ist wichtig: Sobald du Australien verlassen hast, kannst du keinen TRS-Antrag rückwirkend stellen. Wenn du auch deine letzte [Steuererklärung](/de/tax-return) einreichen oder deine [Super](/de/superannuation) vor Abreise beantragen musst, [kontaktiere unser Team](/de/contact), damit das gesamte Abreisebild koordiniert ist.
 
## Die TRS-Fallen speziell für Backpacker

- Die 300 $ müssen bei **einem Händler** (einer ABN) zusammenkommen - mehrere Belege desselben Geschäfts addieren sich; zehn Läden à 30 $ nicht
- Die Waren müssen **ausgeführt und vorzeigbar** sein - Boots anziehen, Laptop ins Handgepäck; Sperriges braucht Abstimmung mit Airline und TRS-Schalter
- **60 Tage** zählen rückwärts vom Abflug - die Kamera von vor vier Monaten qualifiziert nicht
- **Vor den Security-Zeiten** claimen: Am TRS-Schalter solltest du 90 Minuten früher stehen; verpasst ist verloren
- Gezielt in den letzten zwei Wochen Technik zu kaufen (Laptop, Kamera, Handy), um die 10 % zurückzuholen, ist legitim und üblich
`,
  },

  'vehicle-logbook-abn-working-holiday': {
    title: 'Fahrzeugkosten und Logbücher für Working Holiday Maker mit ABN',
    description: 'Wenn du ein Auto für Arbeit unter deiner ABN nutzt, kannst du eventuell Fahrzeugkosten absetzen. Hier erfährst du, wie es funktioniert.',
    body: `
Wenn du unter einer ABN arbeitest und ein Fahrzeug für das Geschäft nutzt, kannst du Fahrzeugkosten als Steuerabzug geltend machen. Es gibt zwei Methoden: Cent pro Kilometer (91 Cent/km, bis zu 5.000 km/Jahr, kein Logbuch nötig) und die Logbuch-Methode (tatsächliche Kosten basierend auf dem geschäftlichen Nutzungsanteil absetzen). Fahrten von deiner Unterkunft zu einer Arbeitsstelle oder zwischen Jobstandorten zählen als Geschäftsreisen. Fahrten von zu Hause zu deinem regulären Arbeitsplatz zählen nicht. Unser Team wählt die Methode, die dir den größten legitimen Abzug bringt.

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
- Die "erste und letzte" Fahrt des Tages von/zu deiner Hauptarbeitsstätte

Der Schlüssel: Geschäftsfahrten brauchen einen echten geschäftlichen Zweck. Privatfahrten nicht, auch wenn sie nach der Arbeit stattfinden.

## Wie funktioniert die Cent-pro-Kilometer-Methode?

Die einfachste Methode für die meisten Working Holiday Maker:

- Fester Satz von **91 Cent pro Kilometer** (aktueller ATO-Satz)
- Bis zu **5.000 km pro Jahr** absetzbar
- Maximaler Abzug: 4.550 $ pro Jahr (5.000 km × 91 Cent)
- **Kein detailliertes Logbuch erforderlich**

Um diese Methode zu nutzen, halte eine einfache Aufzeichnung deiner Geschäftsfahrten:

- Datum jeder Fahrt
- Geschätzte Entfernung
- Zweck (z.B. "Fahrt zum Kundenstandort für Installation")

Das ist die einfachste Methode und funktioniert für die meisten Working Holiday Maker mit ABN, die gelegentlich fahren.

## Wie funktioniert die Logbuch-Methode?

Die Logbuch-Methode bringt einen größeren Abzug, wenn du viel geschäftlich fährst:

1. Führe ein Logbuch über einen **durchgehenden 12-Wochenzeitraum**
2. Trage jede Fahrt (geschäftlich und privat) in den 12 Wochen ein
3. Berechne den **geschäftlichen Nutzungsanteil**
4. Wende diesen Prozentsatz auf die Gesamtfahrzeugkosten für das Jahr an

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

Beispiel: 60 % geschäftliche Nutzung × 8.000 $ Gesamtfahrzeugkosten = 4.800 $ absetzbar.

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

Der Sydney-zu-Cairnsroadtrip ist privat. Die Fahrt von deinem Hostel zu einer Farm für ABN-Arbeit ist geschäftlich. Halte sie in deinen Aufzeichnungen getrennt.

[Kontaktiere unser Team](/de/contact) vor dem Einreichen, wenn du Hilfe willst, welche Methode deinen Abzug maximiert. Wir machen das jede Woche für ABN-Inhaber.
 `,
  },

  'small-business-tax-offset-working-holiday-abn': {
    title: 'Was ist der Small Business Tax Offset und können Working Holiday Maker ihn beantragen?',
    description: 'Mit ABN-Einkommen als Sole Trader hast du eventuell Anspruch auf bis zu 1.000 $ Steuererleichterung durch den Small Business Tax Offset. Bedingungen erklärt.',
    body: `
Der Small Business Tax Offset ist eine Steuervergünstigung für Sole Trader und Partnerschaften, die die Steuer auf dein Geschäftseinkommen um bis zu 1.000 $ pro Jahr reduzieren kann. Wenn du in Australien Einkommen unter einer ABN hattest, hast du eventuell Anspruch auf diesen Offset. Der aktuelle Satz beträgt 16 % Rabatt auf die auf Geschäftseinkommen zahlbare Steuer (gedeckelt bei 1.000 $). Der Offset ist nicht erstattungsfähig - er kann deine Steuer auf null reduzieren, aber von sich aus keine Rückzahlung erzeugen. Unser Team wendet alle berechtigten Offsets an, wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten.

## Was ist der Small Business Tax Offset?

Der Small Business Tax Offset (auch Unincorporated Small Business Tax Discount genannt) ist eine Vergünstigung für Sole Trader und Partner in kleinen Unternehmen:

- Reduziert die auf Geschäftseinkommen zahlbare Einkommensteuer
- Aktueller Satz: 16 % der auf Geschäftseinkommen zahlbaren Steuer
- Maximale Vergünstigung: 1.000 $ pro Steuerjahr
- Gilt für ABN-Sole-Trader- und Partnerschaftseinkommen
- Nicht erstattungsfähig (kann Steuer auf null reduzieren, kein weiterer Nutzen)

Er existiert, um kleinen Geschäftsinhabern Steuererleichterung zu bieten, die keinen Zugang zu den niedrigeren Körperschaftssteuersätzen haben, die eingetragenen Unternehmen zur Verfügung stehen.

## Wer kann den Small Business Tax Offset beantragen?

Um qualifiziert zu sein, musst du:

- Ein **individueller** Steuerzahler sein (Sole Trader oder Partner in einer Partnerschaft)
- Einen **Jahresumsatz unter 5 Millionen $** haben (fast kein Working Holiday Maker erreicht das)
- **Geschäftseinkommen** unter einer ABN verdient haben
- Keine Kapitalgesellschaft oder Trust sein

Für Working Holiday Maker, die unter einer ABN tätig sind, ist die Umsatzanforderung praktisch nie ein Problem. Der Offset gilt, wenn du überhaupt ABN-Einkommen hattest.

## Wie viel ist der Offset in der Praxis wert?

Beispiele für Working Holiday Maker:

- 5.000 $ ABN-Einkommen → Small Business Offset etwa 120 $ (16 % von 15 % Steuer auf 5.000 $)
- 15.000 $ ABN-Einkommen → Small Business Offset etwa 360 $
- 30.000 $ ABN-Einkommen → Small Business Offset etwa 720 $
- Höheres ABN-Einkommen → Deckelung bei 1.000 $

Der Offset reduziert die auf den **Geschäftseinkommens-Anteil** deiner Steuererklärung geschuldete Steuer, nicht dein Lohneinkommen.

## Kann der Offset mit anderen Offsets kombiniert werden?

Ja. Mehrere Offsets können auf dieselbe Steuererklärung angewendet werden:

- **Small Business Tax Offset**: reduziert Steuer auf Geschäftseinkommen (max. 1.000 $)
- **Low Income Tax Offset**: reduziert Steuer basierend auf Gesamteinkommen (siehe [Artikel zum Low Income Tax Offset](/de/blog/low-income-tax-offset-working-holiday))
- **Medicare-Levy-Befreiung**: entfernt die 2 %-Levy (die meisten Working Holiday Maker berechtigt)

Jeder wird separat berechnet und auf deine endgültige Steuerposition angewendet. Unser Team identifiziert und wendet jeden berechtigten Offset beim Vorbereiten deiner Steuererklärung an.

## Was, wenn du sowohl ABN- als auch TFN-Einkommen hattest?

Üblich bei Working Holiday Makern (Anstellungsarbeit parallel zu Contracting):

- Dein Lohneinkommen (TFN) wird zum 15 %-Working-Holiday-Maker-Satz besteuert
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
    description: 'Das ATO unterscheidet zwischen Personal Services Income und echtem Businesseinkommen. Im Folgenden findest du die Auswirkungen.',
    body: `
Das ATO unterscheidet zwischen zwei Arten von Geschäftseinkommen unter einer ABN: Personal Services Income (PSI) und echtem Profit-and-Loss-Geschäftseinkommen. Der Unterschied ist wichtig, weil PSI-Regeln bestimmte Absetzungen einschränken, die sonst für Unternehmen verfügbar wären. Für Working Holiday Maker ist fast alles ABN-Einkommen PSI - weil du für deine persönlichen Fähigkeiten und Arbeit bezahlt wirst. Das ist kein Problem - die normalen arbeitsbezogenen Absetzungen gelten weiterhin. Unser Team identifiziert, welche Regeln gelten, wenn wir deine [Steuererklärung](/de/tax-return) vorbereiten.

## Was ist Personal Services Income (PSI)?

PSI ist Einkommen, das hauptsächlich aus deinen eigenen persönlichen Fähigkeiten, deiner Arbeitsleistung oder deiner Expertise stammt:

- Handwerker, die für ihre Arbeitsleistung bezahlt werden
- Freelancer, die für ihre Arbeit bezahlt werden
- Reinigungskräfte, die für ihre Reinigungsdienste bezahlt werden
- Obstpflücker, die für ihre Pflückleistung bezahlt werden
- Berater, die für ihre Beratung bezahlt werden
- Jeder, dessen Einkommen aus der eigenen Person kommt statt aus Waren oder Vermögen

Für einen Tischler, der unter einer ABN für eine Baufirma arbeitet: die Bezahlung erfolgt für die Stunden und Fähigkeiten des Tischlers. Das ist PSI.

## Was ist ein Profit-and-Loss-Business?

Ein Profit-and-Loss-Business erzielt Einkommen durch:

- Produktion von Waren (Fertigung, Backen, Handwerk)
- Nutzung von Geschäftsvermögen (Mieteinnahmen, Geräteleasing)
- Beschäftigung anderer, die die Arbeit machen
- Verkauf von Produkten von Lieferanten

Das Einkommen ist nicht primär an die persönliche Mühe des Eigentümers gebunden. Eine Bäckerei, die Brot verkauft, ein Personalvermittler, der Pflücker beschäftigt, oder ein Mietshaus-Geschäft fallen alle in diese Kategorie.

## Warum ist die PSI-Unterscheidung wichtig?

Die PSI-Regeln schränken bestimmte Absetzungen ein:

**Verfügbar bei PSI:**
- Werkzeuge und Ausrüstung, die du persönlich nutzt
- Arbeitsbezogene Kleidung und Uniformen
- Fahrten zwischen Arbeitsstellen
- Fahrzeugkosten für echte Geschäftsfahrten
- Weiterbildung mit direktem Bezug zu deiner Arbeit
- Handy und Internet (Arbeitsanteil)

**NICHT verfügbar bei PSI (oder eingeschränkt):**
- Gehälter an Angehörige (z.B. Partner oder Familienmitglieder)
- Miete für Räumlichkeiten, falls nicht strikt für die Arbeit erforderlich
- Manche Superbeiträge für Angehörige
- Bestimmte Home-Office-Kosten

Die Regeln existieren, um zu verhindern, dass Einzelpersonen Steuern reduzieren, indem sie eine persönliche Anstellung als "Geschäft" mit umfangreichen Abzügen zu strukturieren.

## Wie wird PSI identifiziert?

Das ATO nutzt die **80-%-Regel**: wenn mehr als 80 % deines Einkommens von einem Kunden kommen, ist dein Einkommen wahrscheinlich PSI. Andere Tests gelten ebenfalls:

- **Resultstest**: wirst du für ein bestimmtes Ergebnis bezahlt, statt für gearbeitete Stunden?
- **Unrelatedclientstest**: hast du mehrere unabhängige Kunden?
- **Employmenttest**: beschäftigst du andere, die bei der Arbeit helfen?
- **Businesspremisestest**: arbeitest du aus dedizierten Geschäftsräumen?

Die meisten Working Holiday Maker scheitern an all diesen Tests, weil die Arbeit einfache Lohnarbeit für einen oder wenige Kunden ist.

## Wie gilt PSI für Working Holiday Maker?

Für die meisten Working Holiday Maker unter einer ABN ist das Einkommen PSI:

- Farmarbeit zum Akkordlohn: PSI
- Gastronomiecontracting: PSI
- Handwerksarbeit für einen Hauptkunden: PSI
- Reinigungssubverträge: PSI
- Freelancedienste für gelegentliche Kunden: PSI

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
    description: 'Wenn du mit einem ATO-Steuerbescheid oder einer Entscheidung nicht einverstanden bist, hast du das Recht, sie anzufechten. Im Folgenden erklären wir den Prozess.',
    body: `
Ja, du kannst eine ATO-Entscheidung in Australien anfechten. Wenn du eine Steuerbescheid oder Entscheidung erhältst, mit der du nicht einverstanden bist, lässt dich der formale Einspruchsprozess sie anfechten. Du musst einen schriftlichen Einspruch innerhalb von 60 Tagen nach dem Steuerbescheid einreichen (Verlängerungen sind möglich, aber schwerer). Working Holiday Maker haben dieselben Einspruchsrechte wie australische Steuerzahler. Unser Team kümmert sich um ATO-Einsprüche für Working Holiday Maker, einschließlich aus dem Ausland nach Abreise.

## Wann würdest du eine ATO-Entscheidung anfechten?

Häufige Gründe für einen Einspruch:

- Steuerbescheid zeigt geschuldete Steuer, die du für falsch hältst
- Eine legitime Absetzung wurde abgelehnt
- Eine Strafe wurde unfair angewendet
- Dein Residenzstatus wurde falsch klassifiziert
- Einkommensbeträge im Steuerbescheid stimmen nicht mit deinen Aufzeichnungen überein
- Rückerstattung wurde unerwartet reduziert oder abgelehnt

Einsprüche sind nicht für einfache Fehler, die du gemacht hast (die brauchen eine Änderung, keinen Einspruch). Einsprüche sind für Situationen, in denen du mit einer ATO-Position zum Gesetz oder zu den Fakten nicht einverstanden bist.

## Was ist der formale Einspruchsprozess?

Der erste Schritt in jedem Einspruch ist ein formaler Einspruch:

1. Schriftliche Einreichung, die die angefochtene Entscheidung identifiziert
2. Fakten und Argumente, die deine Position unterstützen
3. Belege beigefügt
4. Muss innerhalb von **60 Tagen** nach dem ursprünglichen Steuerbescheid eingereicht werden

Das ATO prüft und gibt eine formale Antwort:

- **Vollständig zulassen**: deine Position akzeptiert
- **Teilweise zulassen**: teilweise Zustimmung
- **Ablehnen**: vollständig abgelehnt

Die Bearbeitung dauert typischerweise bis zu 60 Werktage.

## Was passiert, wenn dein Einspruch nicht erfolgreich ist?

Falls das ATO deinen Einspruch ablehnt, gehören zu den Eskalationsoptionen:

- **Administrative Appeals Tribunal (AAT)**: unabhängiges Prüfungsgremium
- **Federal Court**: für Angelegenheiten von erheblicher rechtlicher Komplexität
- **Inspector-General of Taxation**: für verfahrensrechtliche Beschwerden

Für die meisten Working Holiday Maker ist die AAT-Überprüfung der praktische nächste Schritt. Verfahren am Federal Court verursachen erhebliche Kosten und sind selten lohnenswert für individuelle Angelegenheiten.

## Laufen Zinsen und Strafen während eines Streits weiter?

Ja. Während der Einspruch entschieden wird:

- Der General Interest Charge (GIC) läuft auf den umstrittenen Beträgen weiter
- Strafen können weiterlaufen
- Das ATO kann Eintreibungsmaßnahmen fortsetzen, außer sie werden ausgesetzt

Wenn dein Einspruch erfolgreich ist, können der GIC und die Strafen auf dem umstrittenen Teil erlassen werden. Wenn er scheitert, schuldest du den ursprünglichen Betrag plus akkumulierte Zinsen.

Wir können während des Einspruchs eine Aussetzung der Eintreibung beantragen.

## Wie kümmern wir uns um ATO-Einsprüche für Working Holiday Maker?

Unser Prozess:

1. Prüfung der ATO-Entscheidung und Bewertung der rechtlichen Grundlage für den Einspruch
2. Sammeln von Belegen
3. Entwurf und Einreichung des formalen Einspruchs innerhalb des 60-Tage-Fensters
4. Kommunikation mit dem ATO während der Überprüfung
5. Wir nehmen das Ergebnis entgegen und beraten dich über die nächsten Schritte
6. Bei Bedarf Eskalation an das AAT

Das funktioniert aus dem Ausland. Wir haben Einsprüche für Working Holiday Maker von jedem Kontinent verwaltet.

## Was solltest du tun, wenn du ATO-Korrespondenz erhältst?

Ignoriere sie nicht:

- Lies das Dokument sorgfältig
- Notiere das Datum des Steuerbescheids
- Berechne, wann das 60-Tage-Fenster schließt
- [Kontaktiere unser Team](/de/contact) sofort, falls du nicht einverstanden bist
- Schick uns eine Kopie des Dokuments

Das 60-Tage-Fenster ist strikt. Es zu verpassen macht Einsprüche viel schwerer.

Wenn du unsicher bist, ob das ATO recht hat, schick uns die Korrespondenz, bevor du entscheidest. Manchmal hat das ATO recht und der beste Weg ist, die Entscheidung zu akzeptieren. Wir helfen dir, das richtig zu bewerten.
 
## Der Einspruchsbrief, der funktioniert

Objections gewinnen durch Struktur, nicht Eloquenz - der ATO-Prüfer braucht vier Dinge in sechzig Sekunden auffindbar: welcher Bescheid (Nummer und Datum), welche konkreten Punkte du bestreitest (nicht "alles", sondern "die Residency-Einstufung" oder "gestrichener Abzug bei Item D5"), was die korrekte Behandlung ist samt der stützenden Regel, und die Belege im Anhang (Payslips, Statements, das nach Abgabe eingetroffene Medicare Entitlement Statement). Frist wahren (zwei Jahre bei den meisten Bescheiden), online oder über den Agenten. Kosten: null. Häufigste deutsche Backpacker-Objections: Residency-Behandlung und Bescheide vor spät eingetroffenen Befreiungsnachweisen - beide regelmäßig erfolgreich, wenn dokumentiert.
`,
  },

  'piece-rates-farm-work-working-holiday': {
    title: 'Akkordlohn bei Farmarbeit: wie Working Holiday Maker für Erntearbeit bezahlt werden',
    description: 'Akkordlohn ist üblich beim Obstpflücken und bei der Erntearbeit in Australien. Hier erfährst du, wie es funktioniert und was die Mindestlohnregeln sind.',
    body: `
Akkordlohn (Piece Rates) ist ein Bezahlungssystem, das in der australischen Farmarbeit üblich ist - du wirst pro geernteter Einheit bezahlt (pro Kilogramm, pro Bin, pro Tray) statt pro Stunde. Akkordlohn ist unter dem Horticulture Award legal, aber das australische Recht verlangt, dass der resultierende Stundenlohn mindestens dem Casual-Mindestlohn entspricht (33,05 $/Stunde ab 1. Juli 2026). Wenn dein Akkordlohn-Einkommen für eine Stunde darunter fällt, muss dein Arbeitgeber deinen Lohn auf das Minimum aufstocken. Viele Working Holiday Maker in Farmarbeit sind unterbezahlt, weil Arbeitgeber die Top-up-Regel nicht anwenden. Unser Team kann deine Aufzeichnungen prüfen und das zurückholen, was dir geschuldet wird.

## Was ist ein Akkordlohn?

Ein Akkordlohn bezahlt dich pro Einheit Arbeit, nicht pro Stunde:

- Pro Kilogramm gepflückter Erdbeeren
- Pro Bin gefüllter Äpfel
- Pro Tray geernteter Heidelbeeren
- Pro Reihe gejäteter Pflanzen
- Pro verpacktem Artikel

Akkordlohn ist darauf ausgelegt, Produktivität zu belohnen. Erfahrene Pflücker können deutlich mehr als den Stundenlohn verdienen. Neue Pflücker, die die Technik lernen, verdienen anfangs oft weniger.

## Gibt es eine Mindestlohngarantie bei Akkordlohn?

**Ja**. Das ist die kritischste Regel zu verstehen:

- Akkordlohn-Arbeiter müssen mindestens den Casual-Mindeststundenlohn verdienen
- Für 2026-27 ist dieses Minimum 33,05 $/Stunde (nationales Minimum + 25 % Casual Loading)
- Das Minimum wird pro Lohnperiode berechnet
- Wenn dein effektiver Stundenlohn unter 33,05 $ fällt, muss der Arbeitgeber aufstocken

Diese Regel gilt für alle Akkordlohn-Arbeit in Australien. Sie ist nicht optional.

## Wie funktioniert die Top-up-Berechnung?

Am Ende jeder Lohnperiode:

1. Gesamteinkünfte aus Akkordlohn berechnet
2. Gesamtstunden gearbeitet berechnet
3. Einkünfte geteilt durch Stunden = effektiver Stundenlohn
4. Falls unter 33,05 $/Stunde, muss der Arbeitgeber aufstocken

Beispiel: 400 $ Akkordlohn über 20 Stunden = 20 $/Stunde effektiv. Unter Minimum. Der Arbeitgeber muss um 261 $ aufstocken (33,05 $ × 20 = 661 $ - 400 $), um das gesetzliche Minimum zu erreichen.

Wenn dein Arbeitgeber diese Aufstockung nicht anwendet, verstößt er gegen den Fair Work Act.

## Welche Praktiken solltest du beobachten?

Häufige Probleme in Farmarbeit:

- **Unter-Zählung**: dein Pflückergebnis niedriger wiegen oder zählen als tatsächlich erbracht
- **Unbezahlte Sortierzeit**: dich neben dem Pflücken sortieren oder verpacken lassen ohne dafür zu bezahlen
- **Übermäßige Abzüge**: Berechnung für Unterkunft, Transport oder Mahlzeiten bringt den Lohn unter das Minimum
- **Keine Aufstockung angewendet**: nur den Akkordlohn zahlen ohne die Stundenlohn-Minimumprüfung
- **Druck, sich nicht zu beschweren**: Arbeiter davon abhalten, Bedenken zu äußern

Führe Aufzeichnungen über:

- Gearbeitete Stunden (Start, Ende, Pausen)
- Gepflückte Stücke oder Zählbelege
- Aufgezeichnete Gewichte oder Volumen
- Genommene Abzüge

## Was solltest du tun, wenn du Unterbezahlung vermutest?

Um unbezahlte Löhne zurückzuholen:

1. Berechne deine Einkünfte pro Lohnperiode geteilt durch gearbeitete Stunden
2. Vergleich gegen 33,05 $/Stunde (Casualminimum für 2026-27)
3. Identifiziere den Fehlbetrag
4. Sprich das Thema mit deinem Arbeitgeber mit Belegen an
5. Wenn ungeklärt, [kontaktiere unser Team](/de/contact)

Unser Team hilft Working Holiday Makern, unbezahlte Farmlöhne über die richtigen Kanäle zurückzuholen. Wir haben viele Fälle gesehen, in denen die Top-up-Regel ignoriert wurde und erhebliche Beträge zurückgeholt wurden.

## Was ist mit Steuer und Super auf Akkordlohn-Einkommen?

Akkordlohn-Einkommen wird wie jedes andere Anstellungseinkommen behandelt:

- PAYG-Steuer einbehalten zu 15 % (mit hinterlegter TFN)
- [Super](/de/superannuation) zu 12 % zusätzlich zum Bruttoeinkommen
- In deinem jährlichen Income Statement gemeldet
- In deine [Steuererklärung](/de/tax-return) aufgenommen

Wenn du als Angestellter (nicht unter einer [ABN](/de/abn)) arbeitest, sollte all das auf deinen Lohnzetteln erscheinen. Wenn etwas fehlt oder falsch ist, [schick uns deine Lohnzettel](/de/contact) und wir prüfen.
 `,
  },

  'labour-hire-agencies-working-holiday-australia': {
    title: 'Personalvermittler in Australien: was Working Holiday Maker wissen müssen',
    description: 'Personalvermittler sind ein beliebter Weg, schnell Arbeit in Australien zu finden. Hier erfährst du, wie sie funktionieren und was deine Rechte sind.',
    body: `
Personalvermittler (Labour-Hire-Agenturen) sind Unternehmen, die Arbeitnehmer rekrutieren und sie gegen eine Gebühr bei Kundenunternehmen einsetzen. Für Working Holiday Maker bieten sie schnellen Zugang zu Casualarbeit in Landwirtschaft, Gastronomie, Lager, Bauwesen und Produktion. Wenn du dich bei einer Agentur registrierst, wirst du Angestellter der Agentur (nicht des Unternehmens, für das du arbeitest). Seriöse Agenturen kümmern sich korrekt um deine Steuer und [Super](/de/superannuation); weniger seriöse können unterbezahlen oder übermäßige Abzüge anwenden. Unser Team kann deine Lohnzettel von jeder Agentur prüfen, um sicherzustellen, dass Steuer und Super korrekt gezahlt werden.

## Wie funktioniert Labour Hire?

Wenn du dich bei einer Personalvermittler-Agentur registrierst:

- Du wirst Angestellter **der Agentur**, nicht des Kundenunternehmens
- Die Agentur stellt Arbeiter gegen eine Gebühr an Kundenunternehmen
- Du arbeitest am Standort des Kunden, wirst aber von der Agentur bezahlt
- Die Agentur verwaltet deine Steuer, Super und Lohnabrechnung

Das heißt, dein Lohnzettel kommt von der Agentur, nicht vom Unternehmen, wo du tatsächlich arbeitest. Die Agentur ist dein gesetzlicher Arbeitgeber für alle arbeitsrechtlichen Zwecke.

## Was sind die Vorteile?

Für Working Holiday Maker sind die Hauptvorteile:

- **Schnelligkeit**: Agenturen platzieren Arbeiter oft innerhalb von Tagen nach der Registrierung
- **Vielfalt**: mehrere Kunden über verschiedene Branchen
- **Papierkram erledigt**: Steuer und Super von der Agentur verwaltet
- **Nützlich für Reisende**: einfach zwischen Standorten zu wechseln
- **Niedrigere Einstiegshürde**: weniger Interviewprozess als direkte Einstellung

Wenn du dringend Arbeit brauchst oder gerade in einer neuen Gegend angekommen bist, kann eine Agentur dich schnell zur Arbeit bringen.

## Was sind die Risiken von Labour Hire?

Die Qualität variiert erheblich zwischen Agenturen:

- **Seriöse Agenturen**: zahlen korrekt, halten Arbeitsrecht ein, behandeln Arbeiter fair
- **Weniger seriöse Agenturen**: unterbezahlen, klassifizieren falsch, wenden übermäßige Abzüge an

Häufige Probleme mit minderwertigen Agenturen:

- Berechnung von Unterkunft und Transport zu Sätzen, die den effektiven Lohn unter das Minimum drücken (illegal)
- Falschklassifizierung von Angestellten als Contractor, um Super und Ansprüche zu umgehen
- Versäumnis, die korrekten Penalty Rates zu zahlen
- Es werden keine Lohnzettel ausgestellt
- Löhne werden bis zum "Abschluss" eines Einsatzes zurückgehalten

Vor der Registrierung prüfe, ob die Agentur lizenziert ist. Mehrere australische Bundesstaaten (Victoria, Queensland, South Australia, ACT) verlangen, dass Personalvermittler eine Lizenz haben. Ohne eine solche Lizenz zu operieren ist in diesen Bundesstaaten illegal.

## Was sind deine Rechte als Labour-Hire-Arbeiter?

Dieselben Rechte gelten, egal ob du direkt für ein Unternehmen oder über eine Agentur arbeitest:

- Casualmindestsatz für deine Branche (33,05 $/Stunde für 2026-27)
- Lohnzettel innerhalb von 24 Stunden nach jeder Bezahlung
- Super zu 12 % des Bruttoeinkommens (ab 1. Juli 2025)
- Sichere Arbeitsumgebung
- Penalty Rates für Wochenend-, Feiertags- und Überstundenarbeit
- Klare schriftliche Bedingungen vor Beginn

Wenn eine Agentur dir sagt, dass "andere Regeln gelten", weil sie ein Personalvermittler ist, ist das falsch. Das standardmäßige australische Arbeitsrecht gilt vollständig.

## Wie funktionieren Steuer und Super über eine Agentur?

Als Angestellter der Agentur:

- Liefere deine TFN und fülle ein TFN Declaration-Formular aus (wähle Working Holiday Maker)
- Die Agentur behält 15 % PAYG-Steuer ein
- Die Agentur zahlt 12 % Super in deinen nominierten Fonds
- Dein Einkommen erscheint unter dem Namen der Agentur in deinen ATO-Aufzeichnungen

Prüf deine Lohnzettel, um zu bestätigen:

- Einbehaltene Steuer ist ungefähr 15 %
- Superposition zeigt 12 % vom Brutto
- Stunden und Satz stimmen mit dem überein, was du gearbeitet hast
- Deine TFN ist hinterlegt

Wenn etwas falsch aussieht, [schick uns deine Lohnzettel](/de/contact) und wir prüfen die Behandlung.

## Was, wenn du Unterbezahlung vermutest?

Wenn du vermutest, dass die Agentur dich unterbezahlt:

1. Bewahre alle Lohnzettel und Vereinbarungsdokumente auf
2. Notiere deine Stunden, Sätze und genommene Abzüge
3. Berechne deinen effektiven Stundenlohn (Gesamteinkünfte ÷ Gesamtstunden)
4. Vergleich gegen das Minimum für deine Branche
5. [Kontaktiere unser Team](/de/contact) für Hilfe, das zurückzuholen, was dir geschuldet wird

Unser Team hat Working Holiday Makern geholfen, unbezahlte Löhne und Super aus Agenturvereinbarungen zurückzuholen. Dieselben Schutzmaßnahmen gelten wie bei direkter Anstellung, und die Agentur kann deinen Visastatus nicht gegen dich verwenden, um eine Beschwerde zu erheben.

## Wie erkennst du eine seriöse Agentur?

Anzeichen einer seriösen Agentur:

- Lizenziert im relevanten Bundesstaat
- Zahlt in einen bekannten Superfonds
- Liefert klare, schriftliche Bedingungen vor Einsatz
- Stellt professionelle Lohnzettel mit allen erforderlichen Informationen aus
- Hat eine lange Erfolgsbilanz (such nach Onlinebewertungen)
- Zahlt konsequent pünktlich

Wenn eine Agentur ausweichend zu Grunddaten ist, ist das ein Warnsignal.
 
## Die Agentur-Checkliste, bevor du unterschreibst

Fünf Fragen trennen seriöse Agenturen von Lohndiebstahl-Kanälen: Ist die Agentur lizenziert? (VIC, QLD und SA führen verpflichtende Labour-Hire-Register - online prüfbar.) Wer zahlt Super, in welchen Fonds? Welcher Award und welche Einstufung deckt die Arbeit beim Einsatzbetrieb? Sind Payslips je Einsatzort und Schicht aufgeschlüsselt? Welche Abzüge gibt es? - Transport- und Wohn-"Pakete" sind der Ort, wo Agentur-Ausbeutung sich konzentriert. Die Rechtsstruktur zählt: Die Agentur ist dein Arbeitgeber und schuldet jede Leistung, während Farm oder Baustelle nur die Arbeit anweisen. Eine Agentur, die diese fünf nicht schriftlich beantwortet, ist selbst die rote Flagge.
`,
  },

  'how-to-read-a-payslip-australia-working-holiday': {
    title: 'Wie du als Working Holiday Maker einen Lohnzettel in Australien liest',
    description: 'Dein Lohnzettel enthält alles, was du wissen musst, um zu prüfen, ob du korrekt bezahlt wirst. Hier erfährst du, was jeder Abschnitt bedeutet.',
    body: `
Jeder australische Lohnzettel sollte zeigen: Bruttolohn, einbehaltene Steuer (15 % für Working Holiday Maker mit hinterlegter TFN), Superbeitrag (12 % zusätzlich zum Brutto ab 1. Juli 2025) und Nettolohn (was auf deiner Bank landet). Australische Arbeitgeber sind gesetzlich verpflichtet, einen Lohnzettel innerhalb von 24 Stunden nach Zahlung deines Lohns auszustellen. Zu wissen, wie du einen Lohnzettel liest, bedeutet, dass du Fehler früh erkennen kannst. Bewahre jeden Lohnzettel auf, falls du sie für deine Steuererklärung oder deinen Superantrag brauchst. Unser Team kann deine Lohnzettel prüfen, wenn etwas falsch aussieht.

## Warum sind Lohnzettel wichtig für Working Holiday Maker?

Working Holiday Maker haben spezifische Steuer- und Superregeln:

- 15 %-Steuersatz (anders als Residenten)
- [Super](/de/superannuation) zu 12 % (dasselbe wie Residenten ab 1. Juli 2025)
- Working-Holiday-Maker-Bezeichnung in deiner Steuererklärung
- Medicare-Levy-Befreiung bei Beanspruchung

Dein Lohnzettel ist der Beleg dafür, dass dein Arbeitgeber diese Regeln korrekt anwendet. Wenn er das nicht tut, gehören zu den Konsequenzen unterbezahlte Super, falsche Steuereinbehaltung und Komplikationen bei der Steuererklärung.

**Bewahre jeden Lohnzettel auf.** Maile sie an dich selbst oder speichere sie in der Cloud. Du brauchst sie für:

- Deine jährliche [Steuererklärung](/de/tax-return)
- Deinen DASP-Superauszahlungsantrag
- Die Rückforderung unbezahlter Super
- Die Lösung von Streitigkeiten mit Arbeitgebern

## Was zeigt der Bruttolohn?

Der Bruttolohn ist dein Gesamteinkommen vor allen Abzügen:

- Gearbeitete Stunden × Stundenlohn
- Plus Penalty Rates (Wochenende, Feiertage, Überstunden)
- Plus Zulagen (Uniform, Werkzeug, Reise)
- Plus eventuelle Boni oder Provisionen

Beispiel: 38 Stunden × 30 $/Stunde = 1.140 $ Bruttolohn

Prüfe diese Zahl zuerst. Wenn Stunden oder Satz falsch sind, wird alles andere auch falsch sein.

## Was zeigt der PAYG-Steuereinbehalt?

PAYG = Pay As You Go. Die Steuer, die dein Arbeitgeber einbehält und ans ATO sendet:

- Für Working Holiday Maker mit hinterlegter TFN: 15 % vom Bruttolohn
- Sollte ungefähr 15 % deines Bruttobetrags sein
- Höher (30 % oder 45 %) → Formular wurde falsch ausgefüllt

Häufige Gründe für falschen Einbehalt:

- TFN Declaration-Formular noch nicht bearbeitet (45 %)
- Arbeitgeber nicht als Working-Holiday-Maker-Arbeitgeber registriert (30 %)
- Falscher Residenzstatus auf dem Formular gewählt
- Freibetrag fälschlich beansprucht (zu wenig einbehalten → zukünftige Steuerschuld)

Wenn dein Satz falsch aussieht, [kontaktiere unser Team](/de/contact) und wir prüfen.

## Was zeigt die Super?

Super sollte als separate Position auf deinem Lohnzettel erscheinen:

- **12 % des Bruttoeinkommens** (ab 1. Juli 2025)
- **Zusätzlich** zu deinem Lohn gezahlt, nicht abgezogen
- In deinen nominierten Superfonds gezahlt
- Reduziert nicht deinen Nettolohn

Wenn keine Super erscheint oder der Betrag unter 12 % ist, sprich es bei deinem Arbeitgeber an. Häufige Probleme:

- Überhaupt keine Super (illegal für alle Angestellten)
- Berechnet unter 12 % (Arbeitgeber nutzt alten Satz)
- Vierteljährlich statt monatlich gezahlt (legal, bedeutet aber, dass sie 3 Monate später in deinem Fonds erscheint)
- Falscher Fonds nominiert (Super geht irgendwohin, wo du nicht darauf zugreifen kannst)

## Was zeigt der Nettolohn?

Nettolohn = Bruttolohn − einbehaltene Steuer:

- Das ist, was auf deinem Bankkonto ankommt
- Super reduziert den Nettolohn NICHT (sie wird separat gezahlt)
- Sollte mit dem übereinstimmen, was eingezahlt wurde

Beispiel: 1.140 $ Brutto − 171 $ Steuer (15 %) = 969 $ Nettolohn

## Was ist mit Year to Date (YTD)-Zahlen?

Die meisten Lohnzettel enthalten kumulative YTD-Zahlen:

- YTD Bruttolohn (Gesamteinkommen dieses Steuerjahr)
- YTD einbehaltene Steuer
- YTD Super (falls gezeigt)

Nützlich für:

- Verfolgung deines Jahreseinkommens
- Schätzung deines Steuererklärungsergebnisses
- Prüfung gegen dein abschließendes Income Statement

## Was solltest du in jedem Lohnzyklus prüfen?

Eine schnelle Lohnzettelcheckliste:

- ✓ Gearbeitete Stunden stimmen mit dem überein, was du tatsächlich gearbeitet hast
- ✓ Stundenlohn stimmt mit dem vereinbarten überein
- ✓ Bruttolohn = Stunden × Satz (plus eventuelle Extras)
- ✓ Einbehaltene Steuer ist ungefähr 15 %
- ✓ Super erscheint zu 12 % des Brutto
- ✓ Dein Name korrekt geschrieben
- ✓ Deine TFN erscheint auf dem Lohnzettel
- ✓ Nettolohn stimmt mit dem eingezahlten überein

Wenn etwas falsch aussieht, geh es sofort an statt bis zur Steuerzeit zu warten. Fehler vermehren sich mit der Zeit und werden später schwieriger zu beheben.

## Was, wenn du keine Lohnzettel bekommst?

Das australische Recht verlangt, dass Lohnzettel innerhalb von 24 Stunden nach jeder Bezahlung ausgestellt werden:

- Kein Lohnzettel = dein Arbeitgeber verstößt gegen das Gesetz
- Andere Ansprüche könnten auch in Gefahr sein
- Führe eigene Aufzeichnungen als Belege
- [Kontaktiere unser Team](/de/contact) für Hilfe

Das ist eines der stärksten Anzeichen eines unzuverlässigen Arbeitgebers. Nimm die Aufzeichnungen, die du hast, und hol dir Rat zu nächsten Schritten.
 
## Die 30-Sekunden-Wochenroutine am Payslip

Gesetzliches Minimum auf jedem Payslip: Arbeitgebername und ABN, Zahlungszeitraum, Brutto, Steuer, Netto, Stundensatz und Sätze, Super-Beitrag. Die Routine: (1) Stundensatz gegen Award, (2) Stunden gegen Realität, (3) Steuer geteilt durch Brutto ≈ 15 %?, (4) Super-Zeile mit 12 %?, (5) mysteriöse Abzüge? Diese fünf Punkte plus Screenshot, jede Woche - ein Problem in der Woche seines Entstehens ist eine E-Mail; nach sechs Monaten ist es ein [Rückholverfahren](/de/blog/employer-not-paying-correctly).
`,
  },

  'wage-theft-working-holiday-australia': {
    title: 'Lohnraub in Australien: was Working Holiday Maker tun können, wenn sie unterbezahlt werden',
    description: 'Lohnraub ist leider üblich in Branchen, die bei Backpackern beliebt sind. Hier erfährst du, wie du ihn erkennst und deine Optionen.',
    body: `
Lohnraub (weniger bezahlt zu werden, als dir gesetzlich zusteht) ist leider üblich in Branchen, die bei Working Holiday Makern beliebt sind: Gastronomie, Landwirtschaft, Reinigung, Einzelhandel. Häufige Formen sind Unterbezahlung des Mindestlohns, fehlende Penalty Rates, unbezahlte [Super](/de/superannuation), übermäßige Abzüge und unbezahlte Probeschichten. Die Lösung: gute Aufzeichnungen führen, das Thema mit deinem Arbeitgeber ansprechen und bei ungeklärten Fällen über formale Kanäle eskalieren. Unser Team hilft Working Holiday Makern jede Woche, unbezahlte Löhne und Super zurückzuholen. Dein Visum ist geschützt, wenn du legitime Arbeitsplatzbeschwerden erhebst.

## Was zählt als Lohnraub?

Lohnraub umfasst viele spezifische Praktiken:

- **Unter Mindestlohn**: weniger bezahlt als der Casual-Mindestsatz (33,05 $/Stunde für 2026-27)
- **Fehlende Penalty Rates**: Wochenend-, Feiertags- oder Überstundenarbeit zum Grundsatz bezahlt
- **Unbezahlte Super**: 12 % Super nicht gezahlt (oder zu niedrigerem Satz)
- **Übermäßige Abzüge**: Unterkunfts-/Transportgebühren, die den effektiven Lohn unter das Minimum bringen
- **Unbezahlte Probeschichten**: über die gesetzlich erlaubte unbezahlte Zeit hinaus kostenlos arbeiten als "Probe"
- **Falschklassifizierung**: dich als Contractor (unter ABN) behandeln, um Super und Ansprüche zu vermeiden
- **Einbehaltene Löhne**: Lohn nicht ausgezahlt zum "Abschluss" eines Einsatzes
- **Schwarzarbeit**: Barzahlungen ohne Lohnzettel und ohne Super

Manche Arbeitgeber tun das vorsätzlich, andere aus Versehen. Das Ergebnis für dich ist dasselbe: du bekommst nicht, was dir gesetzlich zusteht.

## Wie erkennst du Lohnraub?

Die einfachsten Prüfungen:

1. **Teile deinen Lohn durch deine Stunden**: falls unter dem Casual-Mindestsatz, bist du unterbezahlt
2. **Prüfe deinen Superfonds**: falls keine Beiträge nach einem Quartal Arbeit erscheinen, wird keine Super gezahlt
3. **Prüfe die Penalty Rates**: Wochenend- und Feiertagsstunden sollten 1,25-fach bis 2,25-fach zahlen
4. **Vergleiche die Abzüge**: Unterkunft sollte angemessen sein und schriftlich offengelegt

Für die meisten Working Holiday Maker in Standardrollen:

- 2026-27 Casual-Minimum: 33,05 $/Stunde
- Sonntagspenalty-Satz (Gastronomie): etwa 54 $/Stunde
- Feiertagssatz: etwa 70 $/Stunde
- Super: 12 % des Bruttolohns zusätzlich

Wenn deine Zahlen erheblich unter diesen liegen, untersuche weiter.

## Welche praktischen Schritte kannst du unternehmen?

Wenn du Lohnraub vermutest:

1. **Dokumentiere alles**: Lohnzettel, Schichtpläne, Kommunikation mit Arbeitgeber
2. **Berechne den Fehlbetrag**: vergleich, was gezahlt wurde, mit dem, was geschuldet wurde
3. **Sprich es zuerst mit deinem Arbeitgeber an**: ruhig, mit Belegen
4. **Falls ungeklärt, eskaliere**: über formale Kanäle
5. **Bleib bei der Arbeit** (falls sicher): fortgesetzte Anstellung macht Ansprüche stärker
6. **[Kontaktiere unser Team](/de/contact)** für Hilfe beim Aufbau des Anspruchs

Unterbezahlung kann manchmal gelöst werden, indem Arbeitgeber echte Fehler korrigieren. Wo sie nicht intern gelöst werden kann, existieren formale Beschwerdekanäle.

## Was ist mit unbezahlter Super speziell?

Unbezahlte Super ist eine spezifische Kategorie, die wir häufig behandeln:

- 12 % sollten innerhalb eines Quartals nach Verdienst in deinem Fonds erscheinen
- Quartalsfristen: 28. Oktober, 28. Januar, 28. April, 28. Juli
- Wenn Beiträge nie erscheinen, verstößt dein Arbeitgeber
- Rückforderung über den Superannuation Guarantee Charge (SGC)-Prozess

Wir haben Working Holiday Makern geholfen, Tausende an unbezahlter Super zurückzuholen. Das SGC-System schützt Arbeiter auch dann, wenn Arbeitgeber nicht zahlen. Siehe unseren Artikel zu [der Superannuation Guarantee Charge](/de/blog/what-is-superannuation-guarantee-charge) für mehr.

## Beeinflusst es dein Visum?

**Nein.** Einen Arbeitgeber für Unterbezahlung zu melden, beeinflusst dein Working Holiday Visum nicht:

- Die Workplace Justice Visaregelung schützt temporäre Visainhaber
- Dein Visastatus kann nicht für legitime Beschwerden gegen dich verwendet werden
- Der Immigrationsstatus ist geschützt, wenn Arbeitsplatzbedenken in gutem Glauben erhoben werden
- Melden beeinflusst keine zukünftigen Visaanträge

Die australische Regierung hat diese Schutzmaßnahmen speziell geschaffen, um unterbezahlte Arbeiter zu ermutigen, sich zu melden. Viele Working Holiday Maker haben Beschwerden ohne Visafolgen erhoben.

## Welche Aufzeichnungen solltest du führen?

Die Stärke eines Lohnraubanspruchs hängt von Aufzeichnungen ab:

- **Jeder erhaltene Lohnzettel** (digitale Kopien speichern)
- **Dein Schichtplan**, der geplante Stunden zeigt
- **Dein eigenes Tagebuch** tatsächlich gearbeiteter Stunden
- **Jeder Anstellungsvertrag oder Angebotsschreiben**
- **Kommunikation** über Bezahlung oder Schichtplan (Texte, E-Mails)
- **Superfondsauszüge**, die zeigen, was beigetragen wurde
- **Kontoauszüge**, die zeigen, was eingezahlt wurde

Je vollständiger die Aufzeichnungen, desto einfacher die Rückforderung. Ohne Aufzeichnungen wird der Streit zu deinem Wort gegen das des Arbeitgebers. Fotografier oder scanne alles, wenn du es erhältst.

## Wie hilft unser Team?

Unser Prozess für Lohnraubfälle:

1. Wir prüfen deine Aufzeichnungen und berechnen den Fehlbetrag
2. Wir identifizieren den richtigen Kanal zur Rückforderung (Fair Work, ATO für Super, Small Claims)
3. Wir helfen, die formale Beschwerde vorzubereiten
4. Wir überwachen den Prozess und fassen nach
5. Wir stellen sicher, dass eventuelle Steuerimplikationen zurückgeholter Beträge korrekt behandelt werden

Wenn du Bedenken zu Unterbezahlung hast, [kontaktiere uns](/de/contact). Auch wenn du Australien schon verlassen hast, ist Rückforderung immer noch möglich.
 
## Lohndiebstahl ist jetzt eine Straftat: so holst du das Geld zurück

Vorsätzliche Unterbezahlung ist in Australien inzwischen strafbar. Die Praxis der Rückholung: alles dokumentieren (Payslips, Roster-Screenshots, Schicht-Nachrichten), schriftlich beim Arbeitgeber einfordern, bei Nichtlösung zum Fair Work Ombudsman - kostenlos, auch anonyme Tipps möglich, mit Befugnis, Unterlagen zu erzwingen und Löhne einzutreiben. Die wichtige Beruhigung: Dein Visastatus schwächt den Anspruch nicht - die Behörden geben Beschwerdeführer bei ausbeutungsbezogenen Verstößen nicht an die Einwanderung weiter; schweigende Ausgebeutete sind genau das Ergebnis, das das System verhindern will. Verjährung: sechs Jahre - auch aus Deutschland läuft die Forderung weiter.
`,
  },

  'backpacker-tax-history-australia': {
    title: 'Die Backpackersteuer in Australien: was sie ist und wie sie sich verändert hat',
    description: 'Die Backpackersteuer ist eine der meistdebattierten Steuerpolitiken in Australien. Im Folgenden die Geschichte und der aktuelle Satz.',
    body: `
Die "Backpackersteuer" ist der inoffizielle Name für das Steuerregime, das auf Working Holiday Visuminhaber (Subclass 417 und 462) angewendet wird. Aktuell zahlen Working Holiday Maker pauschale 15 % auf die ersten 45.000 $ Einkommen, das in jedem Steuerjahr verdient wird. Der Satz wurde 2017 nach erheblicher Kontroverse und einer großen rechtlichen Anfechtung durch das Vereinigte Königreich 2019 eingeführt. Unser Team kümmert sich um Steuererklärungen für Working Holiday Maker und wendet den korrekten Satz basierend auf deinen spezifischen Umständen an.

## Was ist der aktuelle Backpackersteuersatz?

Für Working Holiday Visuminhaber (Subclass 417 und 462):

- **15 % auf die ersten 45.000 $** Einkommen
- **30 % auf Einkommen von 45.001 $ bis 135.000 $**
- **37 % auf Einkommen von 135.001 $ bis 190.000 $**
- **45 % auf Einkommen über 190.000 $**

In der Praxis verdient die überwiegende Mehrheit der Working Holiday Maker unter 45.000 $ in einem einzelnen Steuerjahr - der 15 %-Satz ist also derjenige, der für die meisten gilt.

Es gibt keinen Freibetrag für Working Holiday Maker. Der 15 %-Satz gilt ab dem allerersten verdienten Dollar.

## Wie war die Situation vor 2017?

Vor dem 1. Januar 2017 hing die Steuerbehandlung von Working Holiday Makern von der Residenz ab:

- **Steuerresident**: standardmäßige progressive Sätze (18.200 $ steuerfrei, dann 19 %, 32,5 % etc.)
- **Nichtresident**: 32,5 % ab dem ersten Dollar Einkommen

Viele Working Holiday Maker qualifizierten sich unter den Standardregeln als Steuerresidenten (verlängerte Aufenthalte, etablierte Residenzmuster), was bedeutete, dass sie wenig Steuer auf niedrigeren Einkommen zahlten. Die Regierung sah dies als unbeabsichtigte Folge und schlug eine Reform vor.

## Wie kam es zu den Änderungen 2017?

2016 schlug die Regierung eine pauschale 32,5 %-Steuer auf alles Working-Holiday-Maker-Einkommen ab dem ersten Dollar vor, die alle Backpacker als Nichtresidenten unabhängig von ihren tatsächlichen Umständen behandelt.

Der Vorschlag löste massive Gegenreaktionen in der Branche aus:

- Der Landwirtschaftssektor ist stark auf Working-Holiday-Arbeit angewiesen während der Ernte
- Landwirtschaftsgruppen warnten vor verheerenden Auswirkungen auf regionale Wirtschaften
- Die Tourismusbranche war besorgt, Backpacker abzuschrecken
- Die Zahl der Working Holiday Maker war bereits rückläufig

Nach umfangreichem Lobbying einigte sich die Regierung auf einen pauschalen 15 %-Satz mit Wirkung zum 1. Januar 2017. Der Kompromiss enthielt auch:

- 65 % DASP-Quellensteuer auf [Super](/de/superannuation) für Working Holiday Maker (erhöht von 35 %)
- Der niedrigere 35 %-DASP-Satz blieb für Studentenvisuminhaber
- Spezifische Bestimmungen, um Working-Holiday-Maker-Einkommen separat von Residenzregeln zu behandeln

## Was war die UK-Rechtsanfechtung 2019?

2019 stand die Backpackersteuer vor einer bedeutenden rechtlichen Anfechtung:

- UK-Bürger auf Working Holiday Visa argumentierten, der Satz sei diskriminierend
- Das Argument: einen höheren Satz auf britische Bürger als auf vergleichbare australische Residenten anzuwenden, verletze das Steuerabkommen zwischen UK und Australien
- Der Full Federal Court of Australia entschied zugunsten der UK-Kläger

Das war eine wichtige Entscheidung, weil:

- Sie stellte fest, dass die Nichtdiskriminierungsklauseln in Steuerabkommen auch für Working Holiday Maker gelten
- Sie warf Fragen zu anderen Vertragsländern auf (Deutschland, Schweden etc.)
- Sie zwang die australische Regierung, das steuerliche Regelwerk zu überarbeiten

Die australische Regierung änderte die Gesetzgebung anschließend, um auf das Urteil des Gerichts zu reagieren, und das aktuelle Regelwerk wurde mit spezifischen Bestimmungen erlassen, die die Vertragsverpflichtungen erfüllen.

## Welcher Satz gilt heute?

Der aktuelle 15 %-Satz gilt in den meisten Fällen für Working Holiday Maker unabhängig von der Passnationalität. Für bestimmte Vertragsländer gelten spezifische Nuancen, aber der Satz ist generell konsistent:

- 15 % gilt ab dem ersten Dollar Working-Holiday-Maker-Einkommen
- Kein Freibetrag
- Höhere Sätze gelten über 45.000 $ in Übereinstimmung mit der Steuerskala für Nichtresidenten
- Sowohl Subclass 417 als auch 462 Visa werden gleich behandelt

## Was bedeutet das für deine Steuererklärung?

Am Jahresende, wenn die PAYG-Einbehaltung deines Arbeitgebers zu 15 % gegen deine tatsächlich geschuldete Steuer abgeglichen wird:

- Die meisten Working Holiday Maker erhalten eine kleine Rückerstattung (Absetzungen und Offsets reduzieren die endgültige Haftung)
- Manche erhalten eine größere Rückerstattung (Perioden ohne TFN, falscher Satz angewendet etc.)
- Wenige schulden zusätzliche Steuer (hauptsächlich, falls der Freibetrag fälschlich beansprucht wurde)

Die durchschnittliche Steuerrückerstattung für Working Holiday Maker, für die wir einreichen, liegt zwischen 1.000 $ und 3.000 $. Der genaue Betrag hängt von Einkommen, Absetzungen und individuellen Umständen ab.

## Was ist mit Superauszahlungssteuer?

Die Änderungen von 2017 wirkten sich auch auf die Superauszahlung aus:

- DASP-Satz für Working Holiday Maker erhöht auf **65 %** der steuerpflichtigen Komponente
- Das wurde auch nach der UK-Rechtsanfechtung beibehalten
- Die meisten Working Holiday Maker, denen wir helfen, halten DASP immer noch für lohnenswert, weil der Nettobetrag erheblich ist

Siehe unseren Artikel zu [Steuer auf Superauszahlung](/de/blog/tax-on-super-withdrawal-backpacker) für mehr.

## Wie hilft unser Team mit der Backpackersteuer?

Wenn du über unseren Service einreichst:

- Wir wenden den 15 %-Satz korrekt auf dein Einkommen an
- Wir identifizieren alle berechtigten Absetzungen und Offsets
- Wir beanspruchen die Medicare-Levy-Befreiung, falls anwendbar
- Wir kümmern uns um Komplikationen aus Perioden mit falsch angewendetem Satz

[Kontaktiere unser Team](/de/contact), um deine Steuererklärung korrekt unter dem aktuellen Backpackersteuerregime einzureichen.
 
## Was das Addy-Urteil für Deutsche bedeutet

Das Addy-Urteil von 2021 betrifft Deutschland direkt: Deutschland gehört zu den relevanten Abkommensländern. Die Bedingungen der Entlastung waren allerdings eng - Staatsangehörigkeit eines Abkommenslandes UND australische Steuerresidenz nach den normalen Tests. Das Hostel-Hopping-Leben scheitert am Resides-Test, weshalb die meisten leer ausgingen. In Frage kommt, wer damals sesshaft in einer Stadt mit stabilem Lebensmittelpunkt war - dann kann sich der Blick auf alte Bescheide lohnen, zusammen mit der [Residency-Prüfung](/de/blog/tax-residency-working-holiday-makers). Heute gilt unverändert: 15 % WHM-Satz als Standard.
`,
  },

  'abn-deductions-business-expenses': {
    title: 'Welche Geschäftsausgaben kannst du mit einer ABN als Working Holiday Maker absetzen?',
    description: 'Working Holiday Maker, die Einkommen unter einer ABN haben, können arbeitsbezogene Geschäftsausgaben absetzen, um ihr zu versteuerndes Einkommen zu reduzieren.',
    body: `
Ein Working Holiday Maker, der Einkommen unter einer Australian Business Number (ABN) verdient, kann legitime Geschäftsausgaben vom zu versteuernden Einkommen absetzen und damit die Steuer am Ende des Steuerjahres reduzieren. Absetzbar sind Werkzeuge, Ausrüstung, Fahrzeugbetriebskosten für arbeitsbedingte Fahrten, geschäftliche Handynutzung, Schutzkleidung und bestimmte Lizenzen oder Schulungen, die direkt mit der Arbeit zusammenhängen.

Die Regeln für ABN-Absetzungen sind anders als die für PAYG-Angestellte, und die geforderten Belege sind strenger. Ohne ordentliche Dokumentation kann das ATO die Absetzung bei einer Prüfung ablehnen.

## Was kann ein Working Holiday Maker mit ABN absetzen?

Die allgemeine Regel: Eine Ausgabe ist absetzbar, wenn sie direkt mit der Erzielung deines ABN-Einkommens zusammenhängt und du einen Beleg hast. Häufige Kategorien:

- **Werkzeuge und Ausrüstung**: Gegenstände, die für die Arbeit nötig sind - eine Kettensäge für Baumarbeit, ein Staubsauger für Reinigungsarbeiten als Contractor oder eine Liefertasche für Kurierarbeit
- **Schutzkleidung und Sicherheitsausrüstung**: Warnwesten, Stahlkappenstiefel, Handschuhe, Helme
- **Fahrzeugbetriebskosten**: Sprit, Anmeldung, Versicherung und Wartung für Kilometer, die speziell für die Arbeit gefahren wurden (Privatfahrten sind nicht absetzbar)
- **Handy und Internet**: der arbeitsbezogene Prozentsatz deiner Nutzung
- **Lizenzen und Zertifikate**: White Card, RSA und andere Branchenzertifikate, die direkt für deine Arbeit benötigt werden
- **Bankgebühren und Händlergebühren**: Kartenzahlungsgebühren auf einem Geschäftskonto
- **Professionelle Dienstleistungen**: Gebühren von registrierten Steueragenten und Buchhaltung

Gegenstände, die sowohl für Arbeit als auch privat genutzt werden, kannst du nur zum arbeitsbezogenen Prozentsatz absetzen. Ein Handy, das zu 60 % geschäftlich genutzt wird, ist zu 60 % der Rechnung absetzbar.

## Welche Belege verlangt das ATO?

Für jede beanspruchte Ausgabe verlangt das ATO einen Nachweis über die Kosten und einen Nachweis, dass sie beruflich nötig war. Das Minimum ist eine Quittung oder Tax Invoice, die Lieferant, Datum, Betrag und eine Beschreibung des Artikels zeigt. Für Ausgaben, die anteilig abgesetzt werden (Handy, Fahrzeug, Internet), brauchst du außerdem einen Nachweis des arbeitsbezogenen Prozentsatzes - belegt durch ein Logbuch oder einen repräsentativen Nutzungszeitraum.

Ohne Belege kann die Absetzung nicht beansprucht werden, auch wenn die Ausgabe tatsächlich angefallen ist.

## Was kann nicht abgesetzt werden?

Manche Ausgaben sehen absetzbar aus, sind es aber nicht. Die häufigsten Fehler:

- Fahrten von zu Hause zum regulären Arbeitsplatz (das ist privat, nicht geschäftlich)
- Kleidung, die weder speziell schützend noch eine gekennzeichnete Uniform ist
- Essen und Trinken während des Arbeitstages (für ABN-Inhaber genauso wenig absetzbar wie für Angestellte)
- Unterkunft an deinem Hauptwohnsitz, auch wenn du von zu Hause arbeitest
- Kosten, die vor der ABN-Registrierung angefallen sind

Siehe unseren Artikel zu [Fahrzeugkosten und Logbüchern](/de/blog/vehicle-logbook-abn-working-holiday) für die detaillierten Regeln zu Autokosten.

## Warum machen Working Holiday Maker Abzüge oft nicht voll geltend?

Die zwei Hauptgründe, warum Working Holiday Maker Absetzungen liegen lassen:

- Sie haben keine Quittungen aufbewahrt, weil sie nicht wussten, dass die Sachen absetzbar sind
- Sie haben nicht verstanden, welche Kosten unter ABN-Regeln gelten - im Gegensatz zu PAYG-Regeln

Ein Working Holiday Maker, der zum Beispiel Farmarbeit als Contractor mit eigener Ausrüstung macht, hat oft Tausende Dollar an legitimen Absetzungen in verblassten Quittungen ganz unten im Rucksack. Ohne geordnete Belege gehen diese Absetzungen zur Steuerzeit verloren.

## Wie kümmert sich unser Service um ABN-Absetzungen?

Wenn wir am Ende des Steuerjahres deine [Steuererklärung](/de/tax-return) einreichen, prüft unser Team dein ABN-Einkommen im Zusammenhang mit deiner Tätigkeit und identifiziert jede Absetzungskategorie, auf die du Anspruch hast. Wir helfen dir, die Belege für jeden einzelnen Abzug zusammenzustellen, wenden die korrekte Aufteilung für gemischt genutzte Gegenstände an und stellen sicher, dass die Absetzung bei einer ATO-Prüfung haltbar ist.

Für Working Holiday Maker mit ABN-Einkommen ist der Unterschied zwischen einer ungeprüften und einer ordentlich vorbereiteten Steuererklärung oft mehrere Tausend Dollar Steuer. [Kontaktiere unser Team](/de/contact) vor Ende des Steuerjahres, damit deine Belege in Ordnung sind.
 
## Die Abzugslandkarte nach Backpacker-Gig

- **Lieferfahren**: Fahrzeugkosten im Arbeitsanteil, Handyvertrag anteilig, Thermotasche, Helm und Schutzausrüstung, Plattformgebühren
- **Farm-Contracting**: Werkzeug, Handschuhe, Sonnenschutz, Arbeitsstiefel, Fahrten zwischen Einsatzorten (nicht von zuhause zum ersten)
- **Reinigung/Handwerk**: Material, Geräte unter der Sofortabschreibungsgrenze, Logo-Arbeitskleidung, Lizenz- und Kartenkosten
- **Alle ABN-Arbeit**: Steuerberatung und Agentengebühren, Kontogebühren, Internet im Arbeitsanteil

Zwei Regeln machen die Liste sicher: Die Ausgabe muss direkt mit dem ABN-Einkommen zusammenhängen (Beleg plus ein Satz warum), und privat mitgenutzte Dinge zählen nur anteilig - ein halb beruflich genutztes Handy setzt die Hälfte ab. Belegfotos beim Kauf schlagen jede Rekonstruktion im Juli.
`,
  },

  'uber-doordash-rideshare-abn-working-holiday': {
    title: 'Arbeit für Uber, DoorDash oder Rideshare mit Working Holiday Visum: ABN- und Steuerregeln',
    description: 'Rideshare und Essenslieferung werden in Australien als Contracting behandelt. Du brauchst eine ABN, und keine Steuer wird einbehalten.',
    body: `
Arbeiten für Uber, DoorDash oder eine andere Rideshare- oder Essenslieferplattform in Australien wird als unabhängiges Contracting eingestuft, nicht als Anstellung. Das heißt: Ein Working Holiday Maker, der für diese Plattformen fährt oder liefert, muss eine Australian Business Number (ABN) registrieren, ist für seine eigenen Steuerpflichten verantwortlich und bekommt keine Steuer von der Plattform einbehalten. Für Rideshare ist GST-Registrierung ab dem ersten verdienten Dollar Pflicht - unabhängig vom Gesamtumsatz.

Das ist einer der häufigsten Bereiche, in denen Working Holiday Maker mit dem ATO Ärger bekommen, weil die Regeln nicht das sind, was die meisten erwarten.

## Warum gelten Rideshare und Lieferdienste als Contracting?

Uber, DoorDash, Menulog und ähnliche Plattformen klassifizieren ihre Fahrer und Lieferanten als unabhängige Contractor, nicht als Angestellte. Die Plattform zahlt dich für erledigte Aufträge, behält aber keine Steuer ein, zahlt keine [Super](/de/superannuation) und übernimmt keine Verantwortung für deine Arbeitsbedingungen. Das heißt:

- Du brauchst eine [ABN](/de/abn), bevor du für die Plattform arbeiten kannst
- Du bist verantwortlich, Geld für die Steuer zurückzulegen
- Du kannst arbeitsbezogene Abzüge geltend machen wie Fahrzeugkosten, Handynutzung und Ausrüstung
- Du bekommst am Jahresende keine PAYG Payment Summary (stattdessen einen Jahresauszug von der Plattform)

Siehe unseren Artikel zu [dem Unterschied zwischen Angestelltem und Contractor](/de/blog/employee-vs-contractor-australia) für mehr dazu, wie die Klassifizierung funktioniert.

## Was ist die GST-Regel, die die meisten Ridesharefahrer überrascht?

Für gewöhnliche ABN-Arbeit ist die GST-Registrierung erst Pflicht, wenn dein Umsatz im Steuerjahr 75.000 $ überschreitet. Für Rideshare-Fahren (Uber, Ola, Didi und ähnliche Personenbeförderungsdienste) ist die Regel anders: GST-Registrierung ist ab dem ersten Dollar Einkommen Pflicht, egal wie wenig du verdienst.

Essenslieferung (Uber Eats, DoorDash, Menulog) wird unter der Standard-GST-Schwelle von 75.000 $ behandelt, nicht unter der Rideshare-Regel. Die Unterscheidung ist wichtig, weil sie ändert, was du dem ATO schuldest und welche Belege du brauchst.

Wenn du für GST registriert bist und vergisst, deine Business Activity Statements einzureichen, kann das ATO Strafen rückwirkend anwenden und den GST-Anteil jeder Fahrt verlangen, die du je gemacht hast. Für einen Vollzeitfahrer über sechs Monate kann das eine Schuld von mehreren Tausend Dollar werden.

## Welche Absetzungen können Rideshare- und Lieferarbeiter beanspruchen?

Einkommen, das über eine Rideshare- oder Lieferplattform verdient wird, wird durch legitime Geschäftsausgaben reduziert:

- Fahrzeugbetriebskosten (Sprit, Wartung, Anmeldung, Versicherung, Abschreibung)
- Fahrzeugfinanzierungszinsen bei Krediten
- Handy und Daten für die Arbeitsapp
- Mautgebühren und Parkkosten während der Arbeit
- Reinigung des Fahrzeugs
- Lieferausrüstung (Tasche, Helm, Fahrradwartung für Kuriere)
- Provisionen und Servicegebühren der Plattform

Fahrzeugkosten kannst du entweder pro Kilometer absetzen oder durch Tracking der tatsächlichen Kosten mit einem Logbuch. Die Logbuchmethode bringt für Fahrer mit vielen Stunden meistens eine größere Absetzung. Siehe unseren Artikel zu [Fahrzeugkosten und Logbüchern](/de/blog/vehicle-logbook-abn-working-holiday) für die Details.

## Welches Einkommen sieht das ATO automatisch?

Rideshare- und Lieferplattformen melden deine jährlichen Einkünfte direkt an das ATO unter dem Sharing Economy Reporting Regime. Das ATO weiß also schon, wie viel du über Uber, DoorDash oder ähnliche verdient hast, bevor du deine [Steuererklärung](/de/tax-return) einreichst. Zu versuchen, Einkommen von diesen Plattformen zu untererfassen, ist einer der einfachsten Wege, eine ATO-Prüfung auszulösen, weil die Plattformdaten automatisch mit deiner Steuererklärung abgeglichen werden.

## Wie kümmert sich unser Service um Rideshare- und Lieferdiensteinkommen?

Wenn du über unseren Service einreichst, kümmert sich unser Team um das komplette Bild für Rideshare- und Lieferarbeit:

- ABN-Registrierung mit den korrekten Geschäftstätigkeitscodes
- GST-Registrierung, wenn du Rideshare fährst (oder wenn dein Liefereinkommen sich der 75.000 $-Schwelle nähert)
- Vierteljährliche BAS-Einreichungen, wenn du GST-registriert bist
- Steuererklärung am Jahresende, die Plattformauszüge mit der ATO-Aufzeichnung abgleicht
- Fahrzeug- und Ausrüstungsabsetzungen berechnet und belegt für eine eventuelle Prüfung

Die Strafen für falsche Ridesharesteuer sind erheblich, und die Regeln ändern sich regelmäßig. [Kontaktiere unser Team](/de/contact), bevor du für eine Plattform anfängst zu arbeiten, damit die Registrierungen und Belege von Tag eins an stimmen.
 `,
  },

  'second-third-year-visa-tax-implications': {
    title: 'Steuerliche Auswirkungen eines zweiten oder dritten Working Holiday Visums in Australien',
    description: 'Mit einem zweiten oder dritten Working Holiday Visum nach Australien zurückzukommen ändert nichts am Steuersatz, kann aber andere Dinge ändern.',
    body: `
Ein Working Holiday Maker auf einem Zweit- oder Drittjahresvisum wird zu denselben Working-Holiday-Maker-Sätzen besteuert wie auf dem Erstjahresvisum: 15 % auf die ersten 45.000 $ Einkommen. Das Visumsjahr ändert den Satz nicht. Was sich ändern kann, ist dein [Steuerresidenz](/de/blog/tax-residency-working-holiday-makers)-Status, falls deine Umstände während der längeren Zeit in Australien sich verschoben haben, und es gibt praktische Unterschiede bei der [Super](/de/superannuation)-, TFN- und [ABN](/de/abn)-Behandlung, die Working Holiday Maker überraschen können.

Der größte Fehler bei Steuererklärungen für das zweite und dritte Visumsjahr ist anzunehmen, dass die Steuersituation genau dieselbe ist wie im ersten Jahr. In mehreren spezifischen Bereichen ist sie es nicht.

## Warum gilt der 15 %-Satz weiterhin in jedem Visumsjahr?

Der Working-Holiday-Maker-Steuersatz von 15 % auf die ersten 45.000 $ (und 30 % darüber, bis 135.000 $) gilt, egal ob du auf einem Erst-, Zweit- oder Drittjahressubclass 417- oder 462-Visum bist. Der Satz ist an die Visasubclass gebunden, nicht daran, wie lange du im Land bist. Nach Australien zurückzukehren für ein zweites oder drittes Jahr bewegt dich nicht auf Steuersätze für Residenten, außer deine gesamten Residenzumstände bestehen die ATO-Steuerresidenz-Tests.

Siehe unseren Artikel zu [dem Backpackersteuersatz](/de/blog/backpacker-tax-rate-australia) für die volle Klassenstruktur.

## Wann sich die Steuerresidenz in einem zweiten oder dritten Jahr ändern kann

Steuerresidenz für ATO-Zwecke ist nicht dasselbe wie Immigrationsresidenz. Ein Working Holiday Maker, der ununterbrochen über einen längeren Zeitraum in Australien war, ein stabiles Zuhause eingerichtet hat, denselben Job lange behalten hat und laufende Bindungen zu Australien aufgebaut hat, kann die Residenz-Tests auch auf einem Working Holiday Visum bestehen. Wenn sich der Residenzstatus ändert, ändern sich die Steuerklassen, der Freibetrag von 18.200 $ kann gelten, und Rückzahlungen können erheblich größer sein.

Die Residenz-Tests sind komplex und fallspezifisch. Sie berücksichtigen, wo du lebst, wo du arbeitest, welche Vermögenswerte du hast, familiäre Bindungen und Absichten. Siehe unseren Artikel zu [Steuerresidenz für Working Holiday Maker](/de/blog/tax-residency-working-holiday-makers) für die detaillierten Kriterien. Unser Team prüft die Residenz in jeder Steuererklärung, wo der Working Holiday Maker lang genug in Australien war, dass die Frage realistisch aufkommt.

## Brauchst du eine neue TFN für ein zweites oder drittes Jahresvisum?

Nein. Deine TFN ist permanent und lebenslang, und dieselbe TFN gilt in jedem Visumsjahr. Siehe unseren Artikel zu [ob du eine neue TFN auf einem zweiten Visum brauchst](/de/blog/do-you-need-new-tfn-second-visa) für die volle Details.

## Was ist mit ABN und Super über Visumsjahre hinweg?

Sowohl ABN als auch Super tragen sich über Visumsjahre hinweg:

- Deine ABN bleibt aktiv, außer du kündigst sie. Wenn du eine ABN während des Erstjahresvisums genutzt hast, kann sie in das Zweitjahresvisum übergehen, aber die Geschäftstätigkeitscodes und registrierten Daten sollten überprüft werden, falls deine Arbeitsart sich geändert hat.
- Deine Superbeiträge vom Erstjahresvisum bleiben im Fonds. Sie können entweder gelassen werden, bis du Australien endgültig verlässt (wo dann ein [DASP](/de/blog/what-is-dasp-super-withdrawal) eingereicht wird), oder, falls du schon abgereist und auf einem neuen Visum zurückgekehrt bist, ändert sich das DASP-Timing.

Wenn du nach deinem ersten Visum DASP gemacht hast und dann auf einem Zweitjahresvisum zurückgekehrt bist, kannst du das DASP nicht rückwirkend rückgängig machen. Die abgehobene Super ist weg, und neue Superbeiträge starten frisch auf dem zweiten Visum.

## Was ist mit den 88-Tage- und 179-Tagearbeitsanforderungen?

Um sich für ein Zweitjahres-Working Holiday Visum zu qualifizieren, musst du 88 Tage spezifizierte Arbeit in einer regionalen Gegend während deines ersten Visums abgeschlossen haben. Für ein Drittjahresvisum sind zusätzliche 179 Tage während des zweiten Visums erforderlich. Das sind Immigrationsanforderungen, nicht Steueranforderungen, aber sie erzeugen Steueraufzeichnungen, weil:

- Jeder Arbeitgeber muss deine TFN hinterlegt haben
- Die Arbeit wird ans ATO unter Single Touch Payroll gemeldet
- Deine Lohnzettel dienen als Belege der gearbeiteten Tage für Immigrationszwecke

Saubere Aufzeichnungen über jeden regionalen Arbeitgeber zu führen ist wesentlich nicht nur für Steuer, sondern auch für den nächsten Visumsantrag.

## Wie behandelt unser Service Steuererklärungen für das zweite und dritte Visumsjahr?

Für Working Holiday Maker auf einem Zweit- oder Drittjahresvisum:

- Wir prüfen die Steuerresidenz gegen die volle Zeitspanne in Australien
- Wir gleichen Einkommen über die kombinierten Visumsjahre ab, falls du in der Mitte eines Steuerjahres übergegangen bist
- Wir verwalten das [DASP](/de/blog/what-is-dasp-super-withdrawal)-Timing über Visaübergänge
- Wir überprüfen ABN-Registrierungen und Geschäftstätigkeitscodes auf fortgesetzte Genauigkeit
- Wir identifizieren alle Absetzungen, die spezifisch für regionale Arbeit sind, einschließlich Reise und Unterkunft in manchen Fällen

Eine Zweit- oder Drittjahresvisasteuererklärung ist selten nur eine Kopie der Erstjahressteuererklärung. [Kontaktiere unser Team](/de/contact) für eine Steuererklärung, die das volle Bild widerspiegelt.
 
## Die Checkliste des Mehrjahres-Backpackers

Jedes Visajahr stapelt Papierkram aus dem letzten: eine Steuererklärung pro gearbeitetem Steuerjahr (oft zwei pro Visajahr, wegen der Juli-Grenze), Super in womöglich mehreren Fonds, und Residency-Antworten, die sich real verschieben können - wer im dritten Jahr sesshaft in einer Stadt bei einem Arbeitgeber lebt, ähnelt einem Resident, was Bescheide ändert. Vor jedem neuen Visum: alte Erklärungen eingereicht? Fonds konsolidiert? Adresse bei der ATO aktuell? Wer Jahr drei mit sauberer Akte verlässt, kassiert DASP und finale Erstattung in Wochen; wer drei Jahre lose Enden mitschleppt, entwirrt Monate.
`,
  },

  'dasp-tax-rate-65-percent-explained': {
    title: 'Warum wird DASP mit 65 % für Working Holiday Maker besteuert?',
    description: 'Die Departing Australia Superannuation Payment wird mit 65 % für Working Holiday Maker besteuert - viel höher als für andere Visainhaber.',
    body: `
Die Departing Australia [Superannuation](/de/superannuation) Payment (DASP) für einen Working Holiday Maker wird mit 65 % auf die steuerpflichtige Komponente des Superguthabens besteuert. Dieser Satz wurde 2017 durch Bundesgesetz speziell für Superbeiträge festgelegt, die gemacht wurden, während eine Person auf einem Subclass 417- oder 462-Working Holiday Visum war. Für alle anderen temporären Visainhaber beträgt der DASP-Steuersatz 35 %. Der höhere Satz ist der einzige größte Grund, warum die Netto-DASP, die ein Working Holiday Maker bekommt, viel kleiner ist als das Bruttoguthaben auf seinem Superkonto.

Der Satz kann nicht reduziert, vermieden oder erstattet werden. Er wird zum Zeitpunkt der Auszahlung angewendet, und der Nettobetrag wird an den Arbeiter gezahlt.

## Worauf gelten die 65 %?

Die 65 % gelten auf die **steuerpflichtige Komponente** des Superguthabens. Fast alle Superbeiträge für einen Working Holiday Maker fallen in die steuerpflichtige Komponente, weil sie:

- Arbeitgeberbeiträge unter dem [Superannuation Guarantee](/de/blog/what-is-superannuation-guarantee-charge) sind (derzeit 12 % des Lohns)
- Anlageerträge auf diese Beiträge

Ein kleiner Teil mancher Konten kann nicht-steuerpflichtig sein (zum Beispiel persönliche Nachsteuerbeiträge, die bei Working Holiday Makern selten sind). Die nicht-steuerpflichtige Komponente unterliegt nicht dem 65 %-Satz.

## Woher kommt der 65 %-Satz?

Vor 2017 wurden Working Holiday Maker bei der DASP zum gleichen Satz wie andere temporäre Visuminhaber besteuert. Das 2017 eingeführte Working Holiday Maker Reform Package änderte sowohl den Einkommensteuersatz (auf 15 % ab dem ersten Dollar) als auch den DASP-Satz (auf 65 %). Die Begründung der Regierung war, den niedrigeren Einkommensteuersatz gegen eine höhere Steuer auf Geld auszubalancieren, das aus dem australischen Supersystem genommen wird.

Der 65 %-Satz gilt unabhängig davon, wie lange der Arbeiter in Australien war, wie viel Super angesammelt wurde oder zu welchem Fonds die Beiträge gingen.

## Wie viel Super hat ein typischer Working Holiday Maker?

Der Superbeitrag hängt von Lohn und Arbeitszeit ab. Als grobe Richtlinie bei der aktuellen 12 %-Superannuation-Guarantee-Rate:

- 20.000 $ Lohn erzeugen etwa 2.400 $ Superbeiträge
- 40.000 $ Lohn erzeugen etwa 4.800 $ Superbeiträge
- 60.000 $ Lohn erzeugen etwa 7.200 $ Superbeiträge

Nach der 65 %-DASP-Steuer ist der Nettobetrag:

- 2.400 $ brutto → ungefähr 840 $ netto
- 4.800 $ brutto → ungefähr 1.680 $ netto
- 7.200 $ brutto → ungefähr 2.520 $ netto

Die genauen Zahlen hängen von Fondsgebühren und Anlagerenditen während der Zeit, in der das Geld gehalten wurde.

## Warum DASP auch bei 65 % beantragen?

Auch beim 65 %-Satz lohnt sich die DASP-Beantragung fast immer - denn die Alternative wäre, das Geld zurückzulassen. Superkonten, die nie beantragt werden, werden irgendwann ans ATO als nicht beantragtes Geld überwiesen. Auch wenn das ATO diese Guthaben unbegrenzt hält, wachsen sie nicht durch Anlagerenditen und unterliegen derselben DASP-Steuer, wenn sie später beantragt werden. Die 35 %, die du jetzt erhältst, sind besser als nichts.

Working Holiday Maker, die ihre Super nie beantragen, machen der australischen Regierung praktisch ein Geschenk. Siehe unseren Artikel zu [was mit nicht beantragter Super passiert](/de/blog/what-happens-to-unclaimed-super) für was mit Guthaben passiert, die nie abgehoben werden.

## Kannst du die 65 % irgendwie reduzieren?

Der 65 %-Satz ist durch Bundesgesetz festgelegt und kann nicht durch Absetzungen, Offsets oder Steuerplanung reduziert werden. Der einzige Weg, einen niedrigeren effektiven Satz zu bekommen, ist, wenn dein Konto eine nicht-steuerpflichtige Komponente hat - was bei Working Holiday Makern ungewöhnlich ist. Es gibt keine legitime Strategie, die den Satz reduziert.

Jeder, der behauptet, er könne "deine Super zu einem niedrigeren Steuersatz herausholen", versteht entweder das Gesetz nicht oder betreibt Betrug. Sei besonders vorsichtig bei Angeboten in sozialen Medien oder Messaging-Apps, "deine DASP mit Rabatt zu bearbeiten". Es gelten die gleichen Regeln, unabhängig davon, wer den Antrag einreicht: Die 65 % werden auf Fondsebene einbehalten, bevor die Zahlung freigegeben wird. Deine Superdaten mit jemandem zu teilen, der kein registrierter Steueragent ist, setzt dich der ernsten Gefahr von Identitätsdiebstahl aus. Siehe unseren Artikel zu [Schutz deiner TFN vor Betrug](/de/blog/tfn-security-protect-from-fraud) für die Warnsignale.

## Wie kümmert sich unser Service um DASP?

Wenn du DASP über unseren Service einreichst, gehen wir folgendermaßen vor:

- Wir identifizieren jeden Superfonds, der Beiträge bekommen hat
- Wir berechnen die erwartete Nettozahlung nach der 65 %-Steuer, damit du weißt, was zu erwarten ist
- Wir reichen jeden Antrag direkt beim Fonds über das offizielle ATO-DASP-System ein
- Wir verfolgen Zahlungen und fragen bei Fonds nach, die langsam bearbeiten
- Wir leiten die Zahlung an dein angegebenes Auslandsbankkonto

Die 65 %-Steuer ist unvermeidbar, aber der Rest des Prozesses kann schnell und sauber gemacht werden. [Kontaktiere unser Team](/de/contact), um deinen DASP-Antrag zu starten.
 
## Der Sonderfall gemischter Visa-Historien

Warst du vor oder nach dem Working Holiday auf einem anderen temporären Visum in Australien - Studentenvisum, 482, Graduate Visa - lohnt genaues Hinsehen: Die 65 % gelten für Super, das unter einem WHM-Visum verdient wurde; für Guthaben aus anderen Visa-Phasen gilt der 35-%-Satz. Die Fonds ermitteln die Aufteilung aus deiner Visa-Historie, aber nicht immer korrekt - besonders bei konsolidierten Konten, wo WHM- und Nicht-WHM-Beiträge vermischt wurden. Bei größeren Guthaben aus gemischten Jahren: Aufschlüsselung vom Fonds anfordern, bevor der Antrag rausgeht. Die Differenz zwischen 65 % und 35 % auf ein Studienjahr Vollzeit-Super ist real Geld.
`,
  },

  'super-multiple-funds-consolidation': {
    title: 'Was tun, wenn du als Working Holiday Maker Super in mehreren Fonds hast',
    description: 'Working Holiday Maker landen oft mit Super in drei oder vier verschiedenen Fonds. Hier erfährst du, wie du sie zusammenführst.',
    body: `
Ein Working Holiday Maker, der in Australien mehrere Arbeitgeber hatte, landet typischerweise mit [Super](/de/superannuation) in mehreren Fonds, weil jeder Arbeitgeber seinen eigenen Standardfonds nennt. Ohne aktive Zusammenführung kann ein Arbeiter mit vier Arbeitgebern mit vier separaten Superkonten enden - jedes belastet monatliche Gebühren und jedes erfordert einen separaten DASP-Antrag beim Verlassen des Landes. Die Gebühren allein können Hunderte Dollar aus einem Guthaben über ein einzelnes Jahr abziehen.

Super in einem einzelnen Fonds zu konsolidieren, während du noch in Australien bist, vereinfacht den DASP-Prozess und stoppt die Gebühren, die das Guthaben aufzehren.

## Warum passiert Super in mehreren Fonds so oft?

Das australische Superrecht gibt Arbeitgebern das Recht, einen Standard-Superfonds für neue Angestellte zu nennen, die nicht aktiv ihren eigenen wählen. Die meisten Working Holiday Maker in ihrem ersten Job verstehen nicht die Wahl, die ihnen angeboten wird, und akzeptieren den Standard. Der nächste Arbeitgeber bietet einen anderen Standard. Das Ergebnis:

- Arbeitgeber 1: Super geht zu Fonds A
- Arbeitgeber 2: Super geht zu Fonds B
- Arbeitgeber 3: Super geht zu Fonds C
- Arbeitgeber 4: Super geht zu Fonds D

Die [Super Stapling](/de/blog/super-stapling-rule-australia)-Regel, eingeführt 2021, sollte diese Fragmentierung reduzieren, indem sie deine Super an einen einzelnen "gehefteten" Fonds bindet - sie funktioniert aber nicht sauber für Working Holiday Maker, weil das Stapling-System den Arbeiter oft erst lange nachdem der erste Beitrag bereits an einen anderen Standardfonds gegangen ist erkennt.

## Was kostet es, Super in mehreren Fonds zu halten?

Jeder Superfonds erhebt:

- Eine Verwaltungsgebühr, typischerweise 50 bis 130 $ pro Jahr unabhängig vom Guthaben
- Eine guthabenabhängige Gebühr, typischerweise 0,5 % bis 1,5 % des Guthabens pro Jahr
- Versicherungsprämien, die automatisch abgezogen werden, sofern sie nicht gekündigt werden

Für einen Working Holiday Maker mit 1.500 $ in jedem von vier Fonds kann die jährliche Gesamtgebührenlast 400 bis 600 $ betragen - ein erheblicher Prozentsatz kleiner Guthaben. Versicherungsprämien allein können kleine Guthaben innerhalb weniger Jahre aufzehren, wenn sie nicht gekündigt werden.

## Zusammenführung in einen einzelnen Fonds

Der empfohlene Ansatz: wähle einen Superfonds und weise alle Arbeitgeber an, mit einem Standard-Choice-Formular in diesen Fonds einzuzahlen. Dann können die Guthaben aus deinen anderen Fonds in den gewählten Fonds übertragen werden (Rollover). Das:

- Reduziert die Gesamtgebühren auf eine einzelne Verwaltungsgebühr
- Kombiniert alle Guthaben, sodass Anlagerenditen auf dem vollen Betrag wachsen
- Vereinfacht DASP am Ende deiner Zeit in Australien (ein Antrag statt vier)
- Kündigt doppelte Versicherungspolicen

Siehe unseren Artikel zu [wie du einen Superfonds wählst](/de/blog/how-to-choose-super-fund) für die Kriterien, die für Working Holiday Maker wichtig sind.

## Kannst du nach Verlassen Australiens konsolidieren?

Super nach Abreise zu konsolidieren ist viel schwerer als in Australien. Die meisten Fonds verlangen Onlineverifikation über in Australien ausgestellte Anmeldedaten und eine australische Telefonnummer, um einen Rollover zu autorisieren. Wenn du schon weg bist, ist die praktische Option meistens, einen separaten [DASP-Antrag](/de/blog/what-is-dasp-super-withdrawal) bei jedem Fonds einzureichen, statt zuerst zu konsolidieren.

## Super zurückverfolgen, von der du nichts mehr weißt

Working Holiday Maker wissen oft nicht, in welchen Fonds sie Super haben - besonders nach vielen Casualjobs. Das ATO hält ein Register jedes Superkontos, das mit einer TFN verknüpft ist, und unser Team kann dieses Register durchsuchen, um jeden Fonds zu identifizieren, der deine Beiträge hält. Siehe unseren Artikel zu [verlorene Super finden](/de/blog/how-to-find-lost-superannuation) für die Details.

## Wie kümmert sich unser Service um Super in mehreren Fonds?

Wenn du DASP über unseren Service einreichst:

- Wir durchsuchen das ATO-Superregister mit deiner TFN, um jeden Fonds zu identifizieren, der Beiträge hält
- Wir bestätigen das Guthaben und die Kontodaten mit jedem Fonds
- Wir reichen separaten DASP für jeden Fonds über das offizielle ATO-System ein
- Wir verfolgen Zahlungen von jedem Fonds und fassen nach, wo Fonds langsam sind
- Wir leiten alle Zahlungen an dein angegebenes Bankkonto

Wenn du noch in Australien bist, können wir auch die Konsolidierung koordinieren, bevor DASP relevant wird - was bei kleinen Guthaben oft das bessere Ergebnis ist. [Kontaktiere unser Team](/de/contact), um den Prozess zu starten.

## Was ist mit Warnungen zur Superkonsolidierung?

Betrüger zielen regelmäßig auf Working Holiday Maker mit Angeboten, "deine Super zu konsolidieren" oder "deine verlorene Super zu finden". Sobald sie deine TFN und Reisepassdaten haben, können sie deine Super aus deinem echten Konto auf eines übertragen, das sie kontrollieren. Teile niemals deine TFN oder Reisepassdaten mit jemandem, der kein registrierter Steueragent ist. Ein registrierter Agent hat eine TAN-Nummer im Tax-Practitioners-Board-Register. Wenn er seine TAN nicht zeigen kann, gib deine Dokumente nicht heraus.
 
## Konsolidieren oder einzeln beanspruchen: die Vor-DASP-Entscheidung

Mehrere Fonds heißt mehrere DASP-Anträge - oder erst eine Konsolidierung in einen. Die Abwägung: Konsolidieren macht ein Unterlagen-Set und vereinfacht alles Spätere, kostet aber Wochen vorab, und die Versicherungen der Quellfonds enden (für Backpacker meist ein Vorteil). Einzelanträge starten sofort, bedienen aber jede Fonds-Dokumentenliste separat. Bei zwei Guthaben in soliden Großfonds sind Einzelanträge oft schnell genug; ab drei Fonds oder mit schlafenden Alt-Konten gewinnt am Ende meist die Konsolidierung. Der erste Schritt ist immer derselbe: [per TFN-Suche alle Fonds aufdecken](/de/blog/how-to-find-lost-superannuation).
`,
  },

  'dasp-rejected-what-to-do': {
    title: 'Was tun, wenn dein DASP Superauszahlungsantrag abgelehnt wird',
    description: 'DASP-Antrag abgelehnt? Häufigste Gründe: Visumstatus, Identitätsprobleme, fehlende Abreisedaten. So behebst du die Probleme und reichst erfolgreich neu ein.',
    body: `
Ein Departing Australia [Superannuation](/de/superannuation) Payment (DASP)-Antrag kann vom Superfonds oder vom ATO aus mehreren Gründen abgelehnt werden: der Visastatus zeigt sich noch nicht als abgelaufen oder gekündigt, die Abreiseaufzeichnung wurde noch nicht vom Department of Home Affairs registriert, die Identitätsdokumente stimmen nicht mit den Fondsaufzeichnungen überein, oder der Antrag wurde bei einem Fonds eingereicht, der keine deiner Beiträge hält. Jeder dieser Punkte hat einen spezifischen Lösungsweg, und die Lösung ist über einen Steueragenten-Kanal viel schneller als über den öffentlichen Antragsweg.

Eine abgelehnte DASP-Zahlung ist nicht verloren. Das Geld bleibt im Superfonds und der Antrag kann erneut eingereicht werden, sobald das zugrundeliegende Problem gelöst ist.

## Die häufigsten Ablehnungsgründe

DASP-Anträge scheitern aus vorhersehbaren Gründen. Von häufigster zu seltenster:

1. **Der Visastatus erscheint im System noch nicht als abgelaufen**. Wenn du DASP innerhalb weniger Tage nach Visaablauf einreichst, hat sich die Aufzeichnung beim Department of Home Affairs eventuell noch nicht aktualisiert. Der Fonds oder das ATO sieht das Visum als noch aktiv und lehnt den Antrag ab.
2. **Keine Abreiseaufzeichnung erfasst**. Die Bewegungsaufzeichnung des Home Affairs zeigt deine Abreise noch nicht, oft weil die Daten der Fluggesellschaft noch nicht bearbeitet wurden.
3. **Identitätsdiskrepanz**. Deine Reisepassdaten im Antrag stimmen nicht mit dem Datensatz des Superfonds überein. Das passiert oft, wenn Arbeitgeber beim Einrichten deines Superkontos deinen Namen falsch geschrieben haben.
4. **Kein Guthaben im Fonds**. Der Fonds, bei dem der Antrag eingereicht wurde, hält keine deiner Beiträge. Dein Geld ist in einem anderen Fonds.
5. **Beglaubigungsproblem mit Identitätsdokumenten**. Der Fonds akzeptiert die von dir verwendete Form der Beglaubigung nicht (zum Beispiel ein nicht zugelassener Beglaubiger in deinem Heimatland).
6. **Antragsformular unvollständig**. Fehlende Unterschriften, fehlende Bankverbindung des Empfängerkontos oder fehlende Steuererklärung.

## Wie identifizierst du, welches Problem du hast?

Superfonds und das ATO erklären eine Ablehnung nicht immer klar. Die Mitteilung besagt eventuell nur, dass der Antrag abgelehnt oder zurückgegeben. Zu identifizieren, welcher Grund von oben gilt, erfordert:

- Prüfung deiner VEVO-Aufzeichnung (Department of Home Affairs) auf aktuellen Visastatus
- Prüfung deiner Bewegungsaufzeichnung (Home Affairs) auf das Abreisedatum
- Prüfung des ATO-Superregisters, welche Fonds tatsächlich deine Beiträge halten
- Prüfung der spezifischen Identitätsanforderungen des Fonds

Über unseren Steueragenten-Kanal können wir diese Aufzeichnungen direkt abrufen und das Problem identifizieren, meistens innerhalb eines Tages.

## Was tun, wenn die Visa- oder Abreiseaufzeichnung noch nicht erscheint

Wenn die Ablehnung daran liegt, dass der Visaablauf oder die Abreise noch nicht von Home Affairs registriert wurden, muss der Antrag einfach erneut eingereicht werden, sobald die Aufzeichnung sich aktualisiert. Bewegungsaufzeichnungen aktualisieren sich in der Regel innerhalb von 7 bis 14 Tagen nach Abreise. Visaablaufaufzeichnungen aktualisieren sich am Tag nach Ablauf. Dafür gibt es keine andere Lösung als Warten und erneutes Einreichen.

Wenn die Aufzeichnung sich nach 30 Tagen immer noch nicht aktualisiert hat, kann unser Team direkt das Home Affairs kontaktieren, um die Aktualisierung zu bestätigen und zu beschleunigen.

## Was tun, wenn der Fonds kein Guthaben hält

Wenn ein Fonds deinen Antrag ablehnt, weil kein Guthaben existiert, sind deine Beiträge in einen anderen Fonds gegangen. Viele Working Holiday Maker wissen nicht, welche Fonds ihre Super halten - besonders wenn sie mehrere Arbeitgeber hatten. Das ATO-Superregister listet jeden mit deiner TFN verknüpften Fonds, und wir können es für dich durchsuchen. Siehe unseren Artikel zu [verlorene Super finden](/de/blog/how-to-find-lost-superannuation) für mehr Details.

Sobald der korrekte Fonds identifiziert ist, wird ein neuer Antrag bei diesem Fonds eingereicht.

## Was tun, wenn die Identitätsprüfung gescheitert ist

Wenn die Ablehnung mit der Identität zusammenhängt, hängt die Lösung davon ab, was gescheitert ist:

- **Namensdiskrepanz**: Der Superfonds muss den Namen am Konto aktualisieren, bevor der Antrag erneut eingereicht werden kann
- **Reisepassdiskrepanz**: Wenn du deinen Reisepass erneuert hast, müssen sowohl alter als auch neuer Reisepass vorgelegt werden
- **Beglaubigung nicht akzeptiert**: Beglaubige die Dokumente erneut über einen akzeptierten Beglaubiger (australischer Notar, JP oder bestellter Amtsträger)

Fonds variieren in dem, was sie akzeptieren - besonders für Working Holiday Maker, die aus dem Ausland beantragen. Unser Team kümmert sich um die Beglaubigungsprozess als Teil des Antrags.

## Wie kümmert sich unser Service um DASP-Ablehnungen?

Wenn ein von uns eingereichter DASP-Antrag abgelehnt wird, gehen wir folgendermaßen vor:

- Wir identifizieren den spezifischen Ablehnungsgrund vom Fonds oder ATO
- Wir holen die zugrundeliegenden Aufzeichnungen (VEVO, Bewegungsaufzeichnung, Superregister) ein, um die Ursache zu bestätigen
- Wir beheben das zugrundeliegende Problem (Warten auf Aufzeichnungsaktualisierungen, Korrektur der Identitätsdaten oder Verschiebung des Antrags zum korrekten Fonds)
- Wir reichen den Antrag erneut über das offizielle ATO-DASP-System ein
- Wir verfolgen den neuen Antrag bis zur Zahlung

Für Working Holiday Maker, die Australien schon verlassen haben, ist es extrem schwer, eine Ablehnung aus dem Ausland ohne Hilfe zu lösen - weil die zuständigen Behörden alle zu australischen Geschäftszeiten arbeiten und australische Telefonnummern für die Verifizierung verlangen. [Kontaktiere unser Team](/de/contact), wenn dein DASP abgelehnt wurde oder länger als zwei Monate ohne Erklärung dauert.
 
## Diagnose vor Neuantrag: die fünf Ablehnungsgründe

Identitäts-Mismatch (Name im Pass vs. Fonds-Konto - Umlaute und Zweitnamen sind deutsche Klassiker), noch aktives Visum (Stornierung beantragen, dann neu einreichen), falsche Mitgliedsdaten (Member Number vom alten Payslip prüfen), fehlende beglaubigte Unterlagen (Liste des Fonds exakt abarbeiten), oder das Guthaben ist längst bei der ATO (dann läuft der Antrag [dort](/de/blog/what-happens-to-unclaimed-super), nicht beim Fonds). Erst diagnostizieren, dann gezielt beheben, dann neu einreichen - der blinde Zweitantrag mit denselben Daten produziert dieselbe Ablehnung. Bei zwei gescheiterten Runden übernimmt sinnvollerweise ein Agent die Fund-Kommunikation; die dritte Ablehnung kostet mehr Zeit als seine Gebühr.
`,
  },

  'super-employer-not-paying-what-to-do': {
    title: 'Was tun, wenn dein Arbeitgeber deine Super in Australien nicht gezahlt hat',
    description: 'Arbeitgeber sind gesetzlich verpflichtet, Super zu 12 % deines Lohns zu zahlen. Hier erfährst du, was zu tun ist, wenn sie das nicht tun.',
    body: `
Australische Arbeitgeber sind gesetzlich verpflichtet, [Super](/de/superannuation) in deinen genannten Superfonds zur aktuellen Superannuation-Guarantee-Rate von 12 % deines Bruttolohns einzuzahlen. Die Beiträge müssen mindestens alle drei Monate gezahlt werden. Wenn ein Arbeitgeber nicht zahlt, kann der Arbeiter den unbezahlten Betrag über das ATO unter dem Superannuation-Guarantee-Charge-Regime zurückholen - oder über Fair-Work-Klagen für verwandte Lohnverstöße. Unbezahlte Super ist einer der häufigsten Arbeitgeberverstöße in Australien, besonders in Gastronomie, Farmarbeit und Bauwesen.

Für Working Holiday Maker ist jeder Dollar unbezahlter Super ein verlorener Dollar aus der DASP-Zahlung beim Verlassen Australiens. Sie vor der Abreise zurückzuholen, ist viel einfacher, als sie aus dem Ausland zu verfolgen.

## Wie weißt du, ob Super gezahlt wurde?

Jeder Arbeitgeber muss Super an deinen genannten Fonds mindestens alle drei Monate zahlen, und die Zahlung muss erscheinen auf:

- Deinem Superfondskontoauszug
- Der ATO-Superbeitrags-Aufzeichnung (sichtbar über Steueragenten-Zugriff)
- Deinen Lohnzetteln, die die für jede Lohnperiode angesammelte Super zeigen müssen

Das häufigste Unterzahlungsmuster: Der Lohnzettel zeigt Super-Ansammlung, aber der Arbeitgeber überweist das Geld nie tatsächlich an den Fonds. Die Ansammlung auf dem Lohnzettel entspricht nicht dem tatsächlich eingegangenen Geld. Der einzige Beweis der Zahlung ist der Fondskontoauszug oder die ATO-Aufzeichnung.

Wenn drei Monate seit Ende eines Quartals vergangen sind und keine Beiträge in deinem Fonds für dieses Quartal erschienen sind, ist die Super unbezahlt.

## Was sagt das Gesetz über unbezahlte Super?

Der Superannuation Guarantee (Administration) Act verlangt von jedem Arbeitgeber, 12 % der Ordinary Time Earnings in Super für jeden Angestellten, einschließlich Casual-Arbeiter, bis zur Quartalsfrist zu zahlen. Die Fristen:

- 1. Juli bis 30. September → bezahlt bis 28. Oktober
- 1. Oktober bis 31. Dezember → bezahlt bis 28. Januar
- 1. Januar bis 31. März → bezahlt bis 28. April
- 1. April bis 30. Juni → bezahlt bis 28. Juli

Wenn der Arbeitgeber eine Frist verpasst, schuldet er nicht nur den Beitrag, sondern eine Superannuation Guarantee Charge - die Zinsen und eine Verwaltungsgebühr enthält. Das ATO kann den Arbeitgeber für den vollen Betrag verfolgen und ihn auf dein Superkonto für dich zahlen. Siehe unseren Artikel zur [Superannuation Guarantee Charge](/de/blog/what-is-superannuation-guarantee-charge) für die Details.

## Wie holst du unbezahlte Super zurück?

Der Rückforderungsprozess hat drei Phasen:

1. **Direkte Anfrage an den Arbeitgeber**. Manche Arbeitgeber haben tatsächlich eine Zahlung verpasst und beheben es, sobald sie gefragt werden. Mach die Anfrage schriftlich (E-Mail ist am besten) und verweise auf die spezifischen Quartale, die unbezahlt sind.
2. **Reiche eine unbezahlte Superanfrage beim ATO ein**. Wenn der Arbeitgeber nach einer schriftlichen Anfrage nicht zahlt, kann das ATO ermitteln und die Beiträge über den Superannuation Guarantee Chargeprozess zurückholen.
3. **Fair-Work-Beschwerde für verwandte Lohnverstöße**. Unbezahlte Super wird oft von anderen Lohnverstößen begleitet (Unterbezahlung, fehlende Lohnzettel, keine Aufzeichnungen). Eine Fair-Work-Beschwerde kann das breitere Muster angehen.

Der ATO-Rückforderungsprozess ist am effektivsten für Super speziell, weil das ATO Prüfungs- und Durchsetzungsbefugnisse hat, die ein einzelner Arbeiter nicht hat. Die Ermittlung kann mehrere Monate dauern, aber sobald das ATO den Arbeitgeber bewertet, werden die Beiträge in dein Superkonto mit Zinsen gezahlt.

## Was, wenn der Arbeitgeber nicht mehr existiert?

Wenn der Arbeitgeber liquidiert wurde oder einfach geschlossen hat, bevor er Super gezahlt hat, ist die Rückforderung trotzdem über den Superannuation Guarantee Chargeprozess möglich. Das ATO wird Gläubiger des gescheiterten Geschäfts und kann Beiträge über die Liquidation zurückholen. In manchen Fällen deckt die Fair Entitlements Guarantee, ein bundesweites Sicherheitsnetz, unbezahlte Löhne ab - sie deckt aber nicht Super.

Für Working Holiday Maker kann das eine Verzögerung von sechs bis zwölf Monaten zwischen Abreise aus Australien und Erhalt der unbezahlten Super bedeuten - aber das Geld ist in den meisten Fällen rückforderbar.

## Warum ist das für DASP noch wichtiger?

Wenn du DASP einreichst, wird nur die Super ausgezahlt, die tatsächlich in deinem Fonds ist. Super, die der Arbeitgeber nicht gezahlt hat, ist nicht in deinem Fonds und damit nicht Teil der DASP-Zahlung. Wenn du Australien mit noch geschuldeter unbezahlter Super verlässt, musst du wählen zwischen:

- DASP verzögern, bis das ATO die Beiträge zurückgeholt hat
- DASP jetzt für das einreichen, was im Fonds ist, und den Rest separat verfolgen

Unbezahlte Super vor deiner Abreise aus Australien zu lösen vermeidet diesen geteilten Prozess.

## Wie kümmert sich unser Service um unbezahlte Super?

Wenn du DASP über unseren Service einreichst:

- Wir gleichen die Beiträge, die hätten gezahlt werden sollen (basierend auf den unter Single Touch Payroll an das ATO gemeldeten Löhnen), mit dem ab, was tatsächlich in deinen Superfonds ist
- Wir identifizieren Lücken, wo Löhne gemeldet, aber Super nicht gezahlt wurde
- Wir reichen unbezahlte Superanfragen beim ATO für dich ein für jedes Quartal, wo Beiträge fehlen
- Wir koordinieren das DASP-Timing, damit der maximal mögliche Betrag in deiner Endzahlung enthalten ist
- Wir verfolgen unbezahlte Super über das ATO auch nach deiner Abreise aus Australien

Unbezahlte Super ist für den Arbeiter oft unsichtbar, bis DASP eingereicht wird und die Zahlen nicht stimmen. [Kontaktiere unser Team](/de/contact), um zu prüfen, ob deine Superbeiträge dem entsprechen, was deine Arbeitgeber gesetzlich zahlen mussten.

## Was ist mit Warnungen zu Superanträgen?

Sei vorsichtig bei jedem außerhalb eines registrierten Steueragenten, der anbietet, "deine unbezahlte Super zu verfolgen" gegen eine Gebühr. Betrüger zielen regelmäßig auf Working Holiday Maker mit Angeboten, Super zu untersuchen, Identitätsdokumente zu sammeln und dann entweder zu verschwinden oder die Dokumente für Identitätsbetrug zu nutzen. Teile niemals deine TFN oder Superfondspasswörter mit jemandem, der kein registrierter Steueragent ist. Ein registrierter Agent hat eine TAN-Nummer im Tax-Practitioners-Board-Register.
 `,
  },

  'super-stapling-rule-australia': {
    title: 'Was ist Super Stapling und wie beeinflusst es Working Holiday Maker in Australien?',
    description: 'Super Stapling verbindet deine Super mit einem festen Fonds, der dir zwischen Arbeitgebern folgt. Was das für Working Holiday Maker bedeutet und wie du wechselst.',
    body: `
Super Stapling ist eine australische Regel, die im November 2021 eingeführt wurde und die [Super](/de/superannuation) jedes Arbeitnehmers an einen einzigen "gehefteten" Fonds bindet. Wenn du einen neuen Job anfängst, ist der Arbeitgeber verpflichtet, beim ATO nach deinem gehefteten Fonds zu suchen und Beiträge dorthin zu zahlen - statt automatisch auf den eigenen Standardfonds zurückzugreifen. Die Regel wurde entworfen, um zu verhindern, dass Arbeitnehmer beim Jobwechsel mit mehreren kleinen Superkonten enden.

Für Working Holiday Maker reduziert Super Stapling die Zersplitterung, beseitigt sie aber nicht. Die meisten Working Holiday Maker haben in ihrem ersten australischen Job noch keinen gehefteten Fonds - der Standard des ersten Arbeitgebers gilt also, und die Stapling-Kette beginnt von dort.

## Wie funktioniert Stapling?

Wenn du einen neuen Job anfängst, bittet dich der Arbeitgeber, einen Superfonds über ein Standard-Choice-Formular zu nominieren. Wenn du keinen Fonds nominierst, muss der Arbeitgeber:

1. Die ATO-Datenbank nach deinem bestehenden "gehefteten" Fonds prüfen
2. Falls ein gehefteter Fonds existiert, wird Super in diesen Fonds gezahlt
3. Falls keiner existiert, wird Super an den Standardfonds des Arbeitgebers gezahlt

Der geheftete Fonds ist normalerweise der Fonds mit deinem letzten aktiven Superguthaben. Einmal festgelegt, folgt er dir bei einem Arbeitgeberwechsel, bis du aktiv einen anderen Fonds wählst.

## Warum Stapling für Working Holiday Maker nicht sauber funktioniert

Für australische Arbeiter, die als Teenager ins System gekommen sind, funktioniert Stapling wie geplant: ihr erstes Superkonto wird geheftet, und jeder weitere Job zahlt in diesen Fonds. Für Working Holiday Maker reduzieren mehrere praktische Probleme die Wirksamkeit:

- **Keine vorherige Super bei der Ankunft**. Ein Working Holiday Maker, der in Australien ankommt, hat kein australisches Superkonto - der Standardfonds des ersten Arbeitgebers gilt also.
- **Mehrere Standardfonds in schneller Folge**. Working Holiday Maker wechseln in den ersten Monaten oft schnell Arbeitgeber, und das Stapling-System aktualisiert nicht schnell genug. Der zweite und dritte Arbeitgeber können auf ihre eigenen Fonds zurückgreifen, bevor der erste Beitrag als gehefteter Fonds registriert wurde.
- **Gekündigte Konten**. Kleine Guthaben werden manchmal als nicht beantragte Beträge an das ATO überwiesen - was die Stapling-Kette unterbricht.

Das Ergebnis: Working Holiday Maker enden trotz Stapling oft mit Super in zwei oder drei Fonds.

## Wie nutzt du Stapling zu deinem Vorteil?

Der beste praktische Ansatz für einen Working Holiday Maker:

1. Wähle aktiv vom ersten Job an einen Superfonds über das Standard-Choice-Formular
2. Nominiere bei jedem weiteren Job denselben Fonds, wieder über das Standard-Choice-Formular
3. Bewahre die Fondsdaten auf, damit du sie jedem neuen Arbeitgeber geben kannst

Siehe unseren Artikel zu [wie du einen Superfonds wählst](/de/blog/how-to-choose-super-fund) für die Kriterien, die wichtig sind - besonders Versicherungsoptionen und niedrige Gebühren für kleine Guthaben.

## Was, wenn deine Super schon auf mehrere Fonds verteilt ist?

Wenn du schon Super in mehreren Fonds angesammelt hast, vereint Stapling sie nicht rückwirkend. Die bestehenden Guthaben bleiben, wo sie sind, außer du machst aktiv einen Rollover. Siehe unseren Artikel zu [Super in mehreren Fonds konsolidieren](/de/blog/super-multiple-funds-consolidation) für die Zusammenführung vor DASP.

## Stapling und DASP

Beim DASP-Antrag muss jeder Fonds, der Beiträge hält, separat beantragt werden. Stapling reduziert die Anzahl der Fonds für Working Holiday Maker, die nach Ende 2021 ankamen und früh einen einzelnen Fonds wählten - beseitigt aber nicht die Notwendigkeit, jeden potenziellen Fonds zu prüfen. Das ATO-Superregister listet jedes Konto, das mit deiner TFN verknüpft ist, und unser Team durchsucht es vor dem DASP-Antrag, damit kein Fonds übersehen wird. Siehe unseren Artikel zu [DASP-Dokumenten](/de/blog/dasp-documents-required) für den vollen DASP-Prozess.

## Wie kümmert sich unser Service um Super Stapling?

Wenn du eine TFN über uns registrierst oder eine Steuererklärung einreichst, die Superbeiträge enthält:

- Wir identifizieren deinen aktuellen gehefteten Fonds über die ATO-Aufzeichnung
- Wir bestätigen, ob neue Arbeitgeberbeiträge an den richtigen Ort gehen
- Wir suchen nach allen Fonds, die mit deiner TFN verknüpft sind, damit keine Beiträge verloren gehen
- Wir reichen DASP separat für jeden Fonds mit Guthaben ein

Für Working Holiday Maker, die für die volle Visumsperiode und ein mögliches zweites Jahr in Australien bleiben wollen, spart das frühe Richtigmachen des Stapling mit der Zeit deutliche Gebühren. [Kontaktiere unser Team](/de/contact), um dein Supersetup zu prüfen.
 
## Stapling für dich arbeiten lassen statt gegen dich

Stapling hat die Ära "neuer Default-Fonds pro Arbeitgeber" beendet - dein erster australischer Fonds folgt dir, solange du nichts tust. Für Backpacker heißt das: Gestapelt ist der Default deines ERSTEN Arbeitgebers (den niemand optimiert hat), jeder spätere zahlt automatisch dorthin, und ein einziger Fonds zur DASP-Zeit schlägt [drei zu konsolidierende](/de/blog/super-multiple-funds-consolidation). Die Optimierung: in den ersten Wochen prüfen, wohin du gestapelt bist, Gebühren gegen einen günstigen Fonds vergleichen, einmal wechseln, wenn es sich lohnt - danach erledigt Stapling die Verwaltung für den Rest deines Aufenthalts. Der Fehlermodus: aus Verwirrung bei jedem Job einen anderen Fonds ins Formular schreiben und das Guthaben doch zersplittern.
`,
  },

  'workplace-injury-working-holiday-rights': {
    title: 'Welche Rechte hast du, wenn du bei der Arbeit mit Working Holiday Visum verletzt wirst?',
    description: 'Working Holiday Maker, die bei der Arbeit verletzt werden, sind in jedem australischen Bundesstaat durch die Workers Compensation abgedeckt.',
    body: `
Ein Working Holiday Maker, der während bezahlter Arbeit in Australien verletzt wird, hat Anspruch darauf, einen Workers-Compensation-Anspruch über die jeweilige Bundesstaats- oder Territoriumregelung zu erheben. Workers Compensation deckt medizinische Behandlung, Rehabilitation und einen Prozentsatz des verlorenen Lohns ab, während du nicht arbeiten kannst. Das Recht auf Anspruch hängt nicht vom Visastatus, der Dauer der Anstellung oder davon ab, ob der Arbeitgeber eine Versicherung hat. Jeder australische Bundesstaat und jedes Territorium verlangt von Arbeitgebern, Workers-Compensation-Versicherung für jeden Arbeiter zu haben, einschließlich Casual-Angestellter und Working Holiday Maker.

Eine Arbeitsverletzung auf einem Working Holiday Visum ist eine der am seltensten geltend gemachten Ansprüche, oft weil verletzte Arbeiter annehmen, dass ihr Visum oder ihre kurze Anstellungshistorie sie disqualifiziert. Das tut sie nicht.

## Welche Verletzungen sind abgedeckt?

Workers Compensation deckt jede Verletzung oder Krankheit ab, die aus bezahlter Anstellung entsteht oder im Verlauf davon. Das umfasst:

- Akute Verletzungen (Schnitte, Brüche, Verstauchungen, Verbrennungen) aus Arbeitsunfällen
- Belastungsverletzungen durch Wiederholungen aus laufenden Arbeitsaktivitäten
- Psychische Gesundheitszustände, die durch Arbeit verursacht oder verschlimmert wurden
- Krankheiten, die wegen Arbeit erworben wurden (zum Beispiel Hauterkrankungen durch Chemikalienexposition)
- Verletzungen während arbeitsbezogener Reisen, in manchen Fällen einschließlich der Wege zur und von der Arbeit

Die Verletzung muss nicht die Schuld des Arbeitgebers sein. Workers Compensation ist eine No-Fault-Regelung: wenn die Verletzung wegen der Arbeit passierte, ist der Anspruch gültig, auch wenn niemand fahrlässig gehandelt hat.

## Was deckt Workers Compensation ab?

Die genauen Leistungen variieren je Bundesstaat, decken aber generell ab:

- **Medizinische Behandlung**: Arztbesuche, Krankenhauspflege, Physiotherapie, Verschreibungen und laufende Rehabilitation
- **Wöchentliche Lohnzahlungen**: typischerweise 80 % bis 95 % deines normalen Wochenlohns für die Periode, in der du nicht arbeiten kannst (der Prozentsatz sinkt in manchen Bundesstaaten mit der Zeit)
- **Einmalzahlung für dauerhafte Beeinträchtigung**: falls die Verletzung zu dauerhafter Beeinträchtigung führt
- **Reisekosten**: zu und von medizinischen Terminen
- **Rückkehr-zur-Arbeitunterstützung**: Rehabilitation, Umschulung und modifizierte Aufgaben

Die Abdeckung läuft so lange, wie die Verletzung deine Fähigkeit zu arbeiten beeinflusst, vorbehaltlich der bundesstaats-spezifischen Höchstperioden.

## Was ist mit Medicare und privater Krankenversicherung?

Workers Compensation zahlt verletzungsbezogene medizinische Kosten direkt, separat von [Medicare](/de/medicare). Das ist wichtig für Working Holiday Maker, weil die meisten unter Sozialversicherungsabkommen nicht für Medicare berechtigt sind (oder nur partielle Abdeckung haben). Siehe unseren Artikel zu [Medicareabdeckung für Working Holiday Maker](/de/blog/what-is-medicare-working-holiday-makers) für die Details.

Für eine Verletzung, die bei der Arbeit passiert, ist Workers Compensation der primäre Zahler, und der Arbeiter sollte nicht für die Behandlung dieser Verletzung abgerechnet werden.

## Wie machst du einen Workers-Compensation-Anspruch?

Der Prozess variiert je Bundesstaat, verlangt aber generell:

1. **Melde die Verletzung sofort beim Arbeitgeber**, schriftlich wenn möglich
2. **Geh zu einem Arzt und hol dir ein Workers Compensationkrankheitszertifikat**
3. **Reich einen Anspruch beim Workers Compensationversicherer des Arbeitgebers ein**, den der Arbeitgeber verpflichtet ist, innerhalb eines kurzen Zeitrahmens (meistens 5 Werktagen) an den Versicherer weiterzuleiten
4. **Liefer laufende medizinische Zertifikate**, falls du weiter nicht arbeiten kannst

Der Arbeitgeber kann rechtlich nicht ablehnen, einen Anspruch einzureichen, und der Versicherer muss innerhalb gesetzlicher Zeitrahmen antworten. Wenn der Arbeitgeber sich weigert einzureichen oder dich unter Druck setzt nicht zu beanspruchen, ist das selbst ein ernster Verstoß und kann beim Bundesstaatsregulierer und bei Fair Work für den weiteren Anstellungsverstoß gemeldet werden.

## Was, wenn der Arbeitgeber dich wegen eines Anspruchs bedroht?

Manche Working Holiday Maker berichten, mit Kündigung, Abschiebung oder Visumsaufhebung bedroht zu werden, falls sie einen Workers-Compensation-Anspruch erheben. Keine dieser Drohungen ist legitim:

- Kündigung wegen eines Workers-Compensation-Anspruchs ist in jedem Bundesstaat ungesetzlich
- Visumsaufhebung wird nicht durch einen Workers-Compensation-Anspruch ausgelöst
- Ein Arbeitgeber hat keine Macht über deinen Visastatus, unabhängig davon, was er sagt

Wenn du unter Druck stehst nicht zu beanspruchen, können Fair Work und der Bundesstaatsworkers Compensationregulierer eingreifen. Die Schutzmaßnahmen sind stärker, als die meisten Working Holiday Maker realisieren.

## Was, wenn du als Contractor mit einer ABN arbeitest?

Workers Compensation für Contractor ist komplizierter. Contractor, die unter einer ABN arbeiten, sind nicht automatisch durch die Workers-Compensation-Versicherung des Arbeitgebers abgedeckt. Manche Arbeiter werden als Contractor klassifiziert, wenn sie rechtlich Angestellte sein sollten, und ihre Reklassifizierung kann die Workers Compensationabdeckung wiederherstellen. Siehe unseren Artikel zu [dem Unterschied zwischen Angestellten und Contractor](/de/blog/employee-vs-contractor-australia) für die Regeln.

Wenn die Arbeit die Eigenschaften einer Anstellung hat (feste Stunden, vom Arbeitgeber gestellte Ausrüstung, beaufsichtigte Arbeit, einzelner Kunde), kann die Klassifizierung falsch sein, und ein Workers-Compensation-Anspruch ist immer noch möglich.

## Wie unterstützt unser Service verletzte Arbeiter?

Während unser Team kein Workers Compensationspezialist ist, sind die Steuer- und Lohnkonsequenzen einer Arbeitsverletzung innerhalb unseres Services. Für Working Holiday Maker mit einer Arbeitsverletzung kümmert sich unser Team:

- Prüft Lohnaufzeichnungen, um Unterbezahlungen oder unbezahlte [Super](/de/superannuation) zu identifizieren, die oft Verletzungsfälle begleiten
- Reicht deine [Steuererklärung](/de/tax-return) zum niedrigeren Einkommen aus der Verletzungsperiode ein (führt oft zu größerer Rückerstattung)
- Koordiniert mit Workers Compensationversicherern, falls Einkommen aus Anspruchszahlungen korrekt gemeldet werden muss
- Verweist auf spezialisierte Workers Compensationanwälte, wo die Verletzung erheblich ist

Eine Arbeitsverletzung beeinflusst selten nur einen Teil deiner Finanzen. [Kontaktiere unser Team](/de/contact), falls du bei der Arbeit verletzt wurdest und das größere Bild verstehen musst.
 
## Die ersten 48 Stunden nach dem Arbeitsunfall

(1) Erstversorgung und Arzt - Behandlung zuerst, Kosten später (Workers Comp deckt sie). (2) Dem Arbeitgeber melden - mündlich UND schriftlich (Mail oder Nachricht) mit Zeit, Ort, Hergang. (3) Zeugennamen sichern. (4) Claim bei der Workers-Comp-Stelle des Bundesstaats (jeder Staat hat sein Schema; Arbeitgeber müssen versichert sein). Working Holiday Maker sind voll erfasst: Behandlungskosten und Lohnersatz fließen unabhängig vom Visum. Sagt der Arbeitgeber "melde es nicht, ich zahle die Behandlung bar" - das ist selbst die rote Flagge: Ohne Meldung riskierst du bei Spätfolgen deinen ganzen Anspruch.
`,
  },

  'unfair-dismissal-working-holiday-australia': {
    title: 'Können Working Holiday Maker eine Unfair-Dismissal-Klage in Australien einreichen?',
    description: 'Working Holiday Maker können Unfair-Dismissal-Klagen über die Fair Work Commission einreichen, aber die Berechtigung hängt von der Anstellungsdauer ab.',
    body: `
Ein Working Holiday Maker, der von einem Job in Australien entlassen wird, kann einen Unfair-Dismissal-Anspruch über die Fair Work Commission erheben, sofern er die Mindestanstellungsperiode erfüllt und der Arbeitgeber groß genug ist, um unter die Unfair-Dismissal-Jurisdiktion zu fallen. Die Mindestanstellungsperiode ist 6 Monate für die meisten Arbeitgeber und 12 Monate für kleine Unternehmen (weniger als 15 Angestellte). Der Visastatus beeinflusst die Berechtigung nicht, aber Dienstzeit und Arbeitgebergröße schon.

Falls die Kündigung qualifiziert, kann die Fair Work Commission Wiedereinstellung, Entschädigung (bis zu 26 Wochen Lohn) oder beides anordnen. Ansprüche müssen innerhalb von 21 Tagen nach Kündigung eingereicht werden.

## Was zählt als Unfair Dismissal?

Unter dem Fair Work Act ist eine Kündigung unfair, wenn sie war:

- **Hart, ungerecht oder unangemessen**: der gegebene Grund war nicht gültig, oder der Prozess war nicht fair
- **Nicht konsistent mit dem Small Business Fair Dismissal Code** (für kleine Arbeitgeber)
- **Eine echte Redundanz, die nicht ordnungsgemäß abgewickelt wurde**

Häufige Muster von Unfair Dismissal sind:

- Kündigung ohne Warnung für Leistungsprobleme, die nie angesprochen wurden
- Kündigung nach dem Erheben von Sicherheitsbedenken oder Workers-Compensation-Ansprüchen
- Kündigung basierend auf Diskriminierung (Rasse, Geschlecht, Alter, Schwangerschaft)
- Versäumnis, einen ordentlichen Warn- und Verbesserungsprozess einzuhalten
- Kündigung als "Redundanz" getarnt, wenn die Rolle tatsächlich von jemand anderem besetzt wurde

## Wer ist berechtigt, einen Anspruch zu erheben?

Die Berechtigung verlangt drei Dinge:

1. **Mindestanstellungsperiode abgeschlossen**: 6 Monate für Unternehmen mit 15 oder mehr Angestellten, 12 Monate für kleine Unternehmen
2. **Einkommen unter der High-Income-Schwelle**: die meisten Working Holiday Maker sind weit darunter
3. **Durch einen Award, Tarifvertrag oder Verdienst unter der High-Income-Schwelle abgedeckt**: fast alle Working Holiday Maker sind abgedeckt

Casual-Angestellte können auch Unfair-Dismissal-Ansprüche erheben, falls sie auf einer regelmäßigen und systematischen Basis für die Mindestperiode angestellt waren. Der "regelmäßig und systematisch"-Test fokussiert auf das Schichtmuster, nicht die Casual-Klassifizierung auf dem Papier.

## Welche Schutzmaßnahmen gelten während der Mindestanstellungsperiode?

Working Holiday Maker, die vor Abschluss der Mindestanstellungsperiode entlassen wurden, können keinen Standardunfairdismissalanspruch erheben, aber andere Schutzmaßnahmen gelten weiterhin:

- **General Protectionsanspruch**: falls die Kündigung aus einem geschützten Grund war (Erheben eines Arbeitsrechts, Beschwerde, Diskriminierung), kann ein Anspruch unabhängig von der Dienstzeit erhoben werden
- **Anti-Diskriminierungsrecht**: bundesstaatliche und föderale Anti-Diskriminierungsgesetze decken Kündigungen basierend auf geschützten Eigenschaften ohne Mindestdienstperiode ab
- **Lohn- und Anspruchsklagen**: alle unbezahlten Löhne, Urlaub oder [Super](/de/superannuation), die zum Zeitpunkt der Kündigung geschuldet wurden, können separat über Fair Work oder das ATO zurückgeholt werden

Der General Protectionsweg ist oft effektiver für Working Holiday Maker, weil die Mindestanstellungsperiode nicht gilt.

## Was sind die Fristen?

Die wichtigste Frist ist die 21-Tageregel. Ein Unfair-Dismissal-Antrag muss bei der Fair Work Commission innerhalb von 21 Kalendertagen nach Inkrafttreten der Kündigung eingereicht werden. Die Commission kann Verlängerungen unter außergewöhnlichen Umständen gewähren, aber die Verlängerungen sind selten.

General Protectionsansprüche haben ähnliche Fristen und sollten auch schnell eingereicht werden.

Für einen Working Holiday Maker, der bald Australien verlässt, kann das 21-Tagefenster ein echtes Problem sein. Falls eine Kündigung in deinen letzten Wochen im Land passiert, ist es die praktische Priorität, Beratung zu bekommen und einen Anspruch einzureichen, bevor du fliegst.

## Was kannst du zurückholen?

Falls die Fair Work Commission befindet, dass die Kündigung unfair war, kann sie anordnen:

- Wiedereinstellung in den Job (selten von Working Holiday Makern nahe dem Ende ihres Visums gesucht)
- Entschädigung bis zu 26 Wochen Lohn (gedeckelt bei der Hälfte der High-Income-Schwelle)
- Eine Kombination aus beidem

Für die meisten Working Holiday Makerfälle ist das realistische Ergebnis Entschädigung, oft bei der Schlichtung beigelegt, bevor die Angelegenheit zu einer vollständigen Anhörung geht.

## Was ist mit der Lohn- und Anspruchsseite?

Ob die Kündigung unfair war oder nicht, hast du Anspruch auf:

- Alle bis zum Datum der Kündigung geschuldeten Löhne
- Eventueller angesammelter Jahresurlaub (für festangestellte Arbeitnehmer)
- Eventuell [unbezahlte Super](/de/blog/super-employer-not-paying-what-to-do)
- Zahlung statt Frist, falls der Vertrag eine Frist verlangte und keine gegeben wurde

Diese Ansprüche sind separat von einem Unfair-Dismissal-Anspruch und können über Fair Work oder, für Super, über das ATO verfolgt werden. Siehe unseren Artikel zu [was zu tun ist, falls dein Arbeitgeber dich nicht korrekt bezahlt](/de/blog/employer-not-paying-correctly) für die Lohnseite.

## Wie unterstützt unser Service entlassene Arbeiter?

Der Unfair-Dismissal-Prozess wird von der Fair Work Commission abgewickelt und am besten von spezialisierten Arbeitsanwälten für den Kündigungsanspruch selbst unterstützt. Unser Team kümmert sich um die Steuer- und Anspruchsseite, die parallel zu jeder Kündigung läuft:

- Berechnung unbezahlter Löhne, Urlaub und Super, die zum Datum der Kündigung geschuldet wurden
- Einreichung deiner [Steuererklärung](/de/tax-return) für das Jahr der Kündigung, die das reduzierte Einkommen erfasst
- Verfolgung unbezahlter Super über das ATO, falls Beiträge fehlen
- Koordinierung von DASP, falls du Australien nach der Kündigung verlässt

Wenn du entlassen wurdest und unsicher über das größere finanzielle Bild bist, [kontaktiere unser Team](/de/contact), bevor du Australien verlässt.
 
## Die 21-Tage-Regel: Bei Kündigungsschutz zählt nur die Frist

Der Unfair-Dismissal-Antrag geht binnen 21 Tagen nach der Kündigung an die Fair Work Commission - Verlängerungen sind die seltene Ausnahme. Auch Casuals können anspruchsberechtigt sein, wenn sie 6+ Monate in regelmäßigen Mustern gearbeitet haben. Breiter: General Protections (Kündigung aus verbotenen Gründen - Lohnbeschwerde eingereicht, Workers Comp beantragt) kennen keine Mindestbeschäftigungszeit. Gefeuert? Beweise sichern (Nachrichten, letzter Roster), binnen 21 Tagen handeln. Die Antragsgebühr ist klein, und die meisten Fälle enden in einer Konferenz mit Einigung - Wiedereinstellung oder Geld.
`,
  },

  'bullying-harassment-workplace-working-holiday': {
    title: 'Welche Optionen hast du, wenn du am Arbeitsplatz mit Working Holiday Visum gemobbt oder belästigt wirst?',
    description: 'Mobbing und sexuelle Belästigung am Arbeitsplatz sind in Australien illegal und durch Bundes- und Landesgesetze geschützt.',
    body: `
Mobbing, Diskriminierung und sexuelle Belästigung am Arbeitsplatz sind in Australien unter dem Fair Work Act und den bundes- und landesweiten Anti-Diskriminierungsgesetzen illegal. Working Holiday Maker haben dieselben rechtlichen Schutzmaßnahmen wie australische Arbeiter, ohne Ausnahmen basierend auf Visastatus, Dienstzeit oder Branche. Die Schutzmaßnahmen decken Verhalten von Arbeitgebern, Vorgesetzten, Kollegen und sogar in manchen Fällen Kunden ab.

Mobbing und Belästigung von Working Holiday Makern werden konsistent als häufiger berichtet in Farmarbeit, Gastronomie und isolierten Arbeitsumgebungen, oft weil Arbeiter das Gefühl haben, sie können sich nicht äußern, ohne ihren Job oder ihr Visum zu riskieren. Keines dieser Risiken ist legitim.

## Was zählt als Mobbing am Arbeitsplatz?

Unter dem Fair Work Act ist Mobbing am Arbeitsplatz definiert als wiederholtes unangemessenes Verhalten einer Person oder Gruppe gegenüber einem Arbeiter, das ein Risiko für Gesundheit und Sicherheit schafft. Das Verhalten muss sein:

- **Wiederholt**: ein einzelner Vorfall ist unter dieser Definition kein Mobbing (obwohl er Belästigung oder Übergriff sein kann)
- **Unangemessen**: Verhalten, das eine angemessene Person als viktimisierend, erniedrigend, bedrohlich oder einschüchternd betrachten würde
- **Ein Risiko für Gesundheit und Sicherheit**: das verursacht oder wahrscheinlich verursacht psychischen oder physischen Schaden

Beispiele umfassen:

- Verbale Beschimpfung oder aggressives Schreien
- Öffentliche Erniedrigung vor Kollegen oder Kunden
- Isolation oder Ausschluss von Teamaktivitäten
- Auferlegung unmöglicher Fristen oder unangemessener Arbeitslast
- Verbreitung von Gerüchten oder falschen Anschuldigungen
- Ungerechtfertigte Kritik oder Drohungen

Angemessene Managementmaßnahmen, die angemessen durchgeführt werden (echtes Leistungsfeedback, Zuweisung von Aufgaben, rechtmäßige Anweisungen), sind kein Mobbing, auch wenn der Arbeiter sie unangenehm findet.

## Was zählt als sexuelle Belästigung?

Sexuelle Belästigung ist jedes unerwünschte sexuelle Verhalten, das eine angemessene Person als beleidigend, erniedrigend oder einschüchternd betrachten würde. Es umfasst:

- Unerwünschtes Berühren oder körperlicher Kontakt
- Sexuelle Witze, Kommentare oder Andeutungen
- Zeigen oder Senden sexueller Bilder
- Wiederholte unerwünschte Anfragen für Verabredungen
- Kommentare über Aussehen oder Körper
- Stalking oder Verfolgen

Sexuelle Belästigung kann ein einzelner Vorfall sein. Die Voraussetzung der Wiederholung, die für Mobbing gilt, gilt nicht für sexuelle Belästigung.

## Welche Schutzmaßnahmen gelten für Working Holiday Maker?

Die Schutzmaßnahmen sind identisch mit denen für australische Arbeiter:

- **Anti-Mobbing-Anordnungen** über die Fair Work Commission, die das Verhalten stoppen und Arbeitsplatzänderungen verlangen können
- **General-Protections-Ansprüche**, falls du wegen Erhebung einer Beschwerde entlassen oder schlecht behandelt wirst
- **Anti-Diskriminierungs-Ansprüche** unter Bundes- oder Landesrecht, die zu Entschädigung und Änderungsanordnungen führen können
- **Sexuelle Belästigungsansprüche** unter dem Sex Discrimination Act, ohne Mindestdienstperiode

Der Visastatus ist in keinem dieser Prozesse ein relevanter Faktor. Ein Arbeitgeber kann sich nicht auf Visastatus, Sprachbarrieren oder eine kurzfristige Anstellung berufen, um seinen rechtlichen Pflichten zu entkommen.

## Was ist mit Drohungen der Visumsaufhebung?

Ein häufiges Muster, das von Working Holiday Makern berichtet wird, ist mit Visumsaufhebung bedroht zu werden, falls sie sich über Mobbing, Belästigung oder unsichere Arbeit beschweren. Diese Drohungen sind nicht legitim. Ein Arbeitgeber hat keine Macht über deinen Visastatus:

- Das Department of Home Affairs entscheidet Visaangelegenheiten, nicht Arbeitgeber
- Eine Beschwerde am Arbeitsplatz löst keine Visumsüberprüfung aus
- Eine Beschwerde am Arbeitsplatz zu erheben ist selbst ein geschütztes Verhalten unter dem Fair Work Act
- Vergeltungsmaßnahmen gegen dich wegen einer Beschwerde stellen einen zusätzlichen Verstoß mit eigenen Rechtsmitteln dar

Wenn du mit Visakonsequenzen bedroht wirst, dokumentiere die Drohungen (E-Mails, Textnachrichten, aufgezeichnete Gespräche, sofern in deinem Bundesstaat legal) und melde sie an Fair Work zusammen mit der zugrundeliegenden Beschwerde.

## Wie machst du eine Beschwerde?

Die praktischen Schritte sind:

1. **Dokumentier alles schriftlich**: Daten, Zeiten, Orte, was gesagt oder getan wurde und wer sonst anwesend war
2. **Melde es intern, falls es sicher ist**: viele Arbeitgeber haben Richtlinien, die aktiv werden sollten, wenn eine Beschwerde erhoben wird
3. **Kontaktiere Fair Work oder das relevante Anti-Diskriminierungs-Gremium**: auch nur für Informationen über deine Optionen
4. **Erwäge eine Anti-Mobbing-Anordnung, falls das Verhalten andauert**: die Fair Work Commission kann schnell handeln
5. **Hole dir professionelle Unterstützung**: Arbeitsanwälte und Gewerkschaftsvertreter handhaben diese Angelegenheiten regelmäßig und viele bieten kostenlose Erstberatungen

Falls das Verhalten physischen Übergriff, sexuellen Übergriff oder Stalking involviert, meld es auch der Polizei. Das sind kriminelle Angelegenheiten, separat vom Arbeitsrecht.

## Was ist mit der finanziellen Seite?

Mobbing und Belästigung treten oft zusammen mit anderen Arbeitgeberverstößen auf: Unterbezahlung, unbezahlte [Super](/de/superannuation), fehlende Lohnzettel, Verweigerung von Pausen. Ein Arbeitsplatz, an dem bestimmte Gesetze gebrochen werden, verletzt statistisch betrachtet mit höherer Wahrscheinlichkeit auch andere. Wenn du eine Beschwerde erhebst, prüfe auch:

- Ob du korrekt bezahlt wurdest (siehe unseren Artikel zu [Arbeitgeber nicht korrekt bezahlt](/de/blog/employer-not-paying-correctly))
- Ob deine Superbeiträge aktuell sind (siehe [unbezahlte Super](/de/blog/super-employer-not-paying-what-to-do))
- Ob deine Lohnzettel genau und vollständig sind
- Ob die richtige Steuer einbehalten wurde

## Wie unterstützt unser Service Arbeiter, die Misshandlung am Arbeitsplatz erfahren?

Unser Team konzentriert sich auf die finanziellen und steuerlichen Konsequenzen, die oft Mobbing- und Belästigungsfälle begleiten:

- Wir prüfen Lohnzettel und ATO-Aufzeichnungen auf Unterbezahlung oder unbezahlte Super
- Wir reichen [Steuererklärungen](/de/tax-return) ein und erfassen jeden Arbeitgeber, auch solche, die du unter schwierigen Umständen verlassen hast
- Wir verfolgen unbezahlte Super über den ATO-Prozess
- Wir koordinieren das DASP, falls du Australien verlässt

Für den Mobbing- oder Belästigungsanspruch selbst sind die Fair Work Commission, bundesstaatliche Anti-Diskriminierungs-Gremien und Arbeitsanwälte die geeigneten Kanäle. [Kontaktiere unser Team](/de/contact), falls du Hilfe bei der finanziellen Seite nach dem Verlassen eines Arbeitsplatzes brauchst.
 
## Die Option jenseits des Kündigens: es stoppen lassen, während du bleibst

Die Fair Work Commission führt "Stop-Bullying-Orders" - ein Verfahren, das Mobbing beenden lässt, während du weiterarbeitest. Erfasst: wiederholtes unangemessenes Verhalten (Anschreien, Isolieren, unmögliche Schichten, Nationalitäts-Sticheleien). Hilfreiche Beweise: datierte Notizen, Nachrichten-Screenshots, Zeugen. Parallelwege: FWO-Beratung (kostenlos), bei schwerem Harassment die SafeWork-Stelle des Staats. "Als Backpacker aushalten" ist der falsche Schluss - die Verfahren unterscheiden nicht nach Visum. Und fällt die Wahl doch aufs Gehen: [Endabrechnung](/de/blog/leave-entitlements-working-holiday-visa) und offene Beträge prüfen.
`,
  },

  'unpaid-trial-shifts-australia-legal': {
    title: 'Sind unbezahlte Probeschichten in Australien für Working Holiday Maker legal?',
    description: 'Unbezahlte Probeschichten sind in Australien meistens illegal. Wann sie erlaubt sind, wann nicht, und wie du als Working Holiday Maker deinen Lohn einforderst.',
    body: `
Unbezahlte Probeschichten sind in Australien in den meisten Umständen illegal. Unter dem Fair Work Act muss ein Arbeiter, der produktive Arbeit erbringt, die dem Unternehmen zugutekommt, mindestens den Mindestlohn oder den relevanten Award-Satz erhalten, unabhängig davon, wie der Arbeitgeber es nennt. Eine kurze, beaufsichtigte Demonstration von Fähigkeiten (typischerweise unter einer Stunde) kann als echte Probe akzeptabel sein, aber alles längere oder alles, was echten Kundenservice, Essenszubereitung oder andere produktive Aktivität involviert, muss bezahlt werden.

Working Holiday Maker sind das häufigste Ziel illegaler unbezahlter Probeschichten, besonders in Gastronomie und Einzelhandel. Die Probeschicht wird als Einstellungsanforderung positioniert, ist aber in der Praxis ein freier Arbeitstag für den Arbeitgeber.

## Wie sieht eine legale Probe tatsächlich aus?

Eine wirklich legale unbezahlte Probe ist:

- **Kurz**: meistens nicht mehr als 30 bis 60 Minuten
- **Beaufsichtigt**: eine tatsächliche Bewertung von Fähigkeiten, nicht unbeaufsichtigte Arbeit
- **Nicht produktiv**: die Probeaktivität produziert nicht direkt Arbeitsergebnis für zahlende Kunden
- **Notwendig, um die Fähigkeit zu bewerten**: der Arbeitgeber muss dich eine spezifische Fähigkeit ausführen sehen, die im Interview nicht bewertet werden kann

Beispiele, die legal sein können:

- Eine bestimmte Messertechnik unter Aufsicht eines Kochs für 30 Minuten demonstrieren
- Ein kurzes Rollenspiel einer Kundeninteraktion in einem Interview durchführen
- Einen 20-minütigen Tipptest für eine Verwaltungsrolle abschließen

Was nicht legal ist:

- Eine volle Schicht in einem geschäftigen Café Kaffees machen und servieren
- Ein achtstündiger Tag auf einer Farm Produkte pflücken
- Eine ganze Schicht an einer Bar mit dem Arbeiter, der tatsächlich Kunden bedient
- "Ein paar Stunden arbeiten, um zu sehen, ob du passt"

Wenn du echte produktive Arbeit leistest, musst du bezahlt werden.

## Was sagt der Fair Work Ombudsman?

Der Fair Work Ombudsman hat klare Richtlinien herausgegeben, dass unbezahlte Arbeitsproben länger als eine kurze Fähigkeitsdemonstration ungesetzlich sind. Der Ombudsman hat gegen zahlreiche Arbeitgeber in Gastronomie, Einzelhandel und Farmarbeit Maßnahmen ergriffen, weil sie unbezahlte Proben nutzen, um unbezahlte Arbeit zu extrahieren. Strafen für den Arbeitgeber können Nachzahlung aller geschuldeten Löhne plus Strafen von bis zu mehreren Tausend Dollar pro Verstoß umfassen.

## Wie viel solltest du für eine Probe bezahlt bekommen?

Falls eine Probeschicht ungesetzlich unbezahlt war, schuldet man dir Löhne zum relevanten Mindestsatz für die gearbeiteten Stunden. Für die meisten Working-Holiday-Maker-Jobs:

- Der Mindestlohn (derzeit 26,44 $ pro Stunde ab Juli 2026)
- Oder der höhere Award-Satz für die Branche (Gastronomie, Einzelhandel, Landwirtschaft haben alle eigene Awards)
- Plus Casual Loading (meistens 25 %), falls du Casualarbeiter warst
- Plus Penalty Rates, falls die Probe an einem Wochenende, Abend oder Feiertag war

Für eine volle achtstündige unbezahlte Probe an einem Samstag in der Gastronomie können die geschuldeten Löhne leicht über 250 $ sein, sobald Casual Loading und Penalty Rates angewendet werden. Siehe unseren Artikel zu [Penalty Rates](/de/blog/penalty-rates-australia) für die Details.

## Was, wenn du nach der Probe nicht eingestellt wurdest?

Die rechtliche Position ist dieselbe, ob du den Job angeboten bekommen hast oder nicht. Die Arbeit wurde erbracht; die Löhne werden geschuldet. Der Fair Work Ombudsman hat Löhne für viele Arbeiter zurückgeholt, die unbezahlte Proben absolviert haben und anschließend nicht eingestellt wurden, auf der Grundlage, dass die Probe selbst Arbeit darstellte, für die Zahlung fällig war.

## Wie holst du unbezahlte Probelöhne zurück?

Die Schritte sind:

1. **Bezahlung schriftlich anfragen**: E-Mail den Arbeitgeber mit dem Datum, den gearbeiteten Stunden und dem geschuldeten Betrag
2. **Berechne den korrekten Betrag**: mit Mindestlohn oder dem Award-Satz plus Aufschlägen
3. **Reich eine Beschwerde beim Fair Work Ombudsman ein**, falls der Arbeitgeber sich weigert
4. **Stell sicher, dass auch [Super](/de/superannuation) berücksichtigt wurde**: falls du bezahlt wurdest, hätte Super auch gezahlt werden müssen

Der Fair Work Ombudsman kann untersuchen, Compliancebescheide ausstellen und Strafen gegen den Arbeitgeber verfolgen. Der Prozess ist kostenlos.

## Wie erkennst du das Muster?

Arbeitgeber, die unbezahlte Proben nutzen, fahren oft ähnliche Muster über mehrere Arbeiter:

- "Komm Samstag für eine Probeschicht rein und wir lassen es dich wissen"
- "Arbeite einfach heute Abend und schau, ob du passt"
- "Das ist Standard in der Gastronomie, jeder macht eine Probe"
- "Wir zahlen keine Proben, aber du bekommst Trinkgelder"

Keine dieser Aussagen ändert die rechtliche Position. Wenn du produktive Arbeit machst, musst du bezahlt werden.

## Wie unterstützt unser Service die Rückforderung von Probeschichten?

Während Fair Work der primäre Kanal zur Rückforderung unbezahlter Probelöhne ist, verbinden sich die geschuldeten Löhne oft mit breiteren Problemen:

- Steuer hätte einbehalten und ein TFN Declaration-Formular ausgefüllt werden müssen (siehe unseren Artikel zum [TFN Declaration-Formular](/de/blog/tax-file-number-declaration-form))
- Super hätte auf die Löhne gezahlt werden müssen
- Die Arbeit hätte ans ATO unter Single Touch Payroll gemeldet werden müssen

Wenn du deine [Steuererklärung](/de/tax-return) über unseren Service einreichst, identifizieren wir Arbeit, die ans ATO hätte gemeldet werden müssen, aber nicht wurde, und damit verbundene Superlücken. [Kontaktiere unser Team](/de/contact), falls du unbezahlte Probeschichten absolviert hast und deine Optionen verstehen möchtest.
 
## Unbezahlte Trials sind nur als kurze Demo legal

Die Linie ist einfach: Eine kurze Fähigkeits-Demonstration (ein paar Kaffees ziehen, 15 Minuten Messertest) darf unbezahlt sein. Eine echte Arbeitsschicht - Gäste bedienen, im Rush spülen, kassieren - ist Arbeit und muss bezahlt werden. "Trial 2-3 Stunden, unbezahlt" ist der Gastro-Klassiker und fast immer rechtswidrig. Vorgehen: Datum, Dauer und Tätigkeiten notieren, erst höflich einfordern ("bitte um Bezahlung der Trial-Schicht"), bei Weigerung zum FWO. Auch wenige Stunden lohnen die Forderung - derselbe Laden macht es mit allen.
`,
  },

  'uniform-laundry-deductions-illegal-australia': {
    title: 'Sind Uniform- und Wäscheabzüge vom Lohn in Australien legal?',
    description: 'Arbeitgeber dürfen nur in eng definierten gesetzlichen Fällen Geld vom Lohn abziehen. Uniform-, Wäsche- und Trainingsabzüge sind oft illegal - so wehrst du dich.',
    body: `
Unter dem Fair Work Act kann ein Arbeitgeber Geld vom Lohn eines Angestellten nur in sehr eng definierten Umständen abziehen: der Abzug muss vom Angestellten schriftlich autorisiert sein, muss hauptsächlich zum Vorteil des Angestellten sein oder muss gesetzlich erforderlich sein (wie PAYG-Steuer). Abzüge für Uniformkäufe, Wäschegebühren, Brüche, Kundenflucht ohne Bezahlung, Kassenfehlbeträge oder "Schulungsgebühren" sind fast immer illegal, unabhängig davon, was der Anstellungsvertrag sagt.

Working Holiday Maker in Gastronomie, Einzelhandel und Farmarbeit werden routinemäßig diesen illegalen Abzügen unterworfen, oft weil Arbeitgeber wissen, dass die Arbeiter nicht zurückdrängen oder sie melden werden.

## Welche Abzüge sind tatsächlich legal?

Die legalen Abzüge, die ein Arbeitgeber von deinem Lohn nehmen kann, sind:

- **PAYG-Steuer**: gesetzlich erforderlich, berechnet nach deinem TFN-Status und Visum
- **[Super](/de/superannuation)-Gehaltsumwandlung**: nur falls du dich spezifisch dafür angemeldet hast
- **Gerichtsbeschlüsse**: Kindergeld, Pfändungsbeschlüsse
- **Gewerkschaftsbeiträge**: falls du dich spezifisch angemeldet hast
- **Vom Angestellten autorisierte Zahlungen**: Dinge, die du den Arbeitgeber gebeten hast, in deinem Namen zu zahlen, schriftlich, wie eine Fitnessstudiomitgliedschaft

Das sind die einzigen Kategorien. Alles andere ohne deine spezifische schriftliche Autorisierung vom Lohn einbehalten ist rechtswidrig.

## Was sind die häufigen illegalen Abzüge?

Die häufigsten illegalen Abzüge, die auf Working Holiday Maker abzielen, sind:

- **Uniformkauf**: der Arbeitgeber belastet dich für eine Uniform, die für den Job erforderlich ist (Rechtslage: die Kosten trägt der Arbeitgeber, nicht du)
- **Wäschegebühr**: ein wöchentlicher oder pro-Schichtabzug für "Reinigung" deiner Uniform
- **Brüche**: die Kosten kaputter Gläser, Teller oder anderer Gegenstände vom Lohn abgezogen
- **Kassenfehlbeträge**: Kassendiskrepanzen kollektiv vom Personal abgezogen
- **Kundenflucht ohne Bezahlung**: Abzüge, wenn Kunden gehen, ohne zu bezahlen
- **Schulungsgebühren**: ein Abzug oder eine "Anleihe" für Zeit, die für das Erlernen des Jobs aufgewendet wurde
- **Ausrüstung**: Abzüge für Werkzeuge, Messer oder andere Ausrüstung, die dem Arbeiter "geliehen" wurde
- **Frist nicht gegeben**: Abzüge unbezahlter Löhne, weil der Arbeiter keine zwei Wochen Frist gegeben hat

Auch wenn ein Vertrag oder Mitarbeiterhandbuch diese als Abzüge auflistet, überschreibt der Fair Work Act den Vertrag. Eine Klausel in einem Vertrag, die einen illegalen Abzug autorisiert, ist nicht durchsetzbar.

## Was ist der Test, ob ein Abzug legal ist?

Der Fair Work Act verlangt, dass ein Abzug:

1. **Vom Angestellten schriftlich autorisiert** ist, wobei die Autorisierung den Betrag und den Zweck spezifiziert, UND
2. **Hauptsächlich zum Vorteil des Angestellten** ist

Der zweite Test ist kritisch. Auch mit schriftlicher Autorisierung ist ein Abzug, der dem Arbeitgeber statt dem Angestellten zugutekommt, nicht rechtmäßig. Ein Wäscheabzug kommt dem Arbeitgeber zugute (saubere Uniformen in einem kontrollierten Zustand); er kommt dem Angestellten nicht zugute. Ein Kassenfehlbeträgeabzug kommt dem Arbeitgeber zugute; er kommt dem Angestellten nicht zugute.

Die einzigen Abzüge, die den Test "hauptsächlich zum Vorteil des Angestellten" bestehen, sind Dinge wie Gehaltsumwandlung in Super, eine Fitnessstudiomitgliedschaft, die der Angestellte gewählt hat, oder ein Sparplan, den der Angestellte einrichten wollte.

## Was ist mit Uniform-"Kautionen" oder "Anleihen"?

Manche Arbeitgeber berechnen eine Uniform-"Kaution" oder "Anleihe", die rückerstattbar ist, wenn die Uniform zurückgegeben wird. Das wird manchmal als Abzug vom ersten Lohnscheck strukturiert. Die rechtliche Position ist:

- Die Kaution ist immer noch ein Abzug vom Lohn
- Sie muss schriftlich autorisiert werden
- Sie muss den "Vorteils"-Test bestehen (was sie typischerweise nicht tut)
- Auch wenn anderweitig rechtmäßig, muss die Anleihe vollständig zurückgegeben werden, wenn die Uniform zurückgegeben wird

Die meisten Uniformkautionsschemata sind ungesetzlich, und die Löhne können zurückgeholt werden.

## Wie holst du illegale Abzüge zurück?

Der Prozess ist:

1. **Berechne den Gesamtbetrag, der abgezogen wurde** über alle Lohnperioden
2. **Beantrage Rückzahlung schriftlich** beim Arbeitgeber mit einer Aufschlüsselung der Abzüge
3. **Reich eine Beschwerde beim Fair Work Ombudsman ein**, falls der Arbeitgeber sich weigert
4. **Liefere Lohnzettel und Bankaufzeichnungen** als Belege

Der Fair Work Ombudsman kann die Löhne direkt zurückholen und Strafen gegen den Arbeitgeber verfolgen. Der Prozess ist kostenlos und der Arbeiter braucht keinen Anwalt.

## Warum das für die Steuer wichtig ist

Illegale Abzüge reduzieren die auf deinem Lohnzettel gemeldeten Bruttolöhne, was:

- Das ans ATO gemeldete Einkommen und die einbehaltene Steuer reduziert
- Die vom Arbeitgeber gezahlten Superbeiträge reduziert
- Eine Diskrepanz zwischen dem, was der Arbeitgeber bar gezahlt hat, und dem, was gemeldet wurde, schafft

Wenn du deine [Steuererklärung](/de/tax-return) über unseren Service einreichst, gleichen wir die ans ATO gemeldeten Löhne mit deinen Lohnzetteln ab, um Muster der Untermeldung zu identifizieren. Wo Abzüge illegal genommen wurden, wird die Rückforderung über Fair Work verfolgt, und die korrigierten Löhne fließen in die Steuerbescheid ein.

## Wie unterstützt unser Service Arbeiter mit illegalen Abzügen?

Wenn du über unser Team einreichst, machen wir:

- Prüfung der Lohnzettel auf Abzüge, die ungesetzlich erscheinen
- Berechnung der Löhne, die hätten gezahlt werden sollen, gegen das, was tatsächlich gezahlt wurde
- Identifikation von [unbezahlter Super](/de/blog/super-employer-not-paying-what-to-do), die mit unterbezahlten Löhnen verbunden ist
- Verweis von Fair-Work-Ansprüchen für die Lohnrückforderung (wir reichen Fair-Work-Ansprüche nicht direkt ein, aber wir koordinieren mit der Lohnrückforderung)
- Einreichung der [Steuererklärung](/de/tax-return) und DASP korrekt basierend auf den tatsächlich geschuldeten Löhnen

[Kontaktiere unser Team](/de/contact), falls du vermutest, dass dein Arbeitgeber Beträge von deinem Lohn abgezogen hat, die nicht hätten genommen werden sollen.
 
## Die engen Bedingungen für legale Lohnabzüge

Abzüge vom Lohn brauchen grundsätzlich zwei Dinge: deine schriftliche Zustimmung und einen überwiegenden Nutzen für dich. Uniformkosten, Reinigungspauschalen, Kassenfehlbeträge und Bruchware erfüllen das fast nie - auch ein unterschriebenes Formular heilt nichts, wenn der Nutzen beim Arbeitgeber liegt. Vorgehen: Abzugszeilen im Payslip prüfen, Grundlage schriftlich erfragen, ohne Rückzahlung zum FWO. Rückwirkend sind bis zu sechs Jahre drin. Die Pointe: Selbst gekaufte Arbeitskleidung und ihre Wäsche kannst du umgekehrt [als Werbungskosten absetzen](/de/blog/tax-deductions-working-holiday-makers) - abgezogen bekommen ist illegal, selbst zahlen und absetzen ist legal.
`,
  },

  'uk-medicare-reciprocal-agreement-australia': {
    title: 'Was deckt das UK-Australien Medicaresozialversicherungsabkommen für britische Working Holiday Maker ab?',
    description: 'Britische Bürger mit Working Holiday Visum sind durch das Sozialversicherungsabkommen zwischen UK und Australien abgedeckt. Deutschland hat KEIN solches Abkommen.',
    body: `
Britische Bürger mit Working Holiday Visum in Australien sind durch das Sozialversicherungsabkommen (RHCA) zwischen dem Vereinigten Königreich und Australien abgedeckt. Das Abkommen erlaubt britischen Besuchern, medizinisch notwendige Behandlung unter [Medicare](/de/medicare) zu erhalten - weitgehend gleichwertig zu dem, was ein australischer Resident in einem öffentlichen Krankenhaus bekommt. Die Abdeckung erstreckt sich nicht auf nicht-essentielle Pflege, Zahnbehandlung, Optometrie oder Behandlung, die warten kann, bis der Arbeiter ins UK zurückkehrt. Private Krankenversicherung wird trotzdem stark empfohlen, um die Lücken zu decken.

**Wichtige Anmerkung für Deutsche:** Deutschland hat KEIN RHCA mit Australien. Deutsche Working Holiday Maker bekommen also weder Medicareabdeckung noch die Vorteile, die in diesem Artikel beschrieben werden.

Das RHCA ist eines der nützlichsten Abkommen, die Working Holiday Makern zur Verfügung stehen - aber auch eines der am häufigsten missverstandenen. Britische Reisende nehmen regelmäßig an, dass es volle NHS-ähnliche Abdeckung bietet, was es nicht tut.

## Was ist unter dem RHCA abgedeckt?

Das Abkommen deckt "medizinisch notwendige Behandlung" ab, die nicht vernünftig warten kann, bis du ins UK zurückkehrst. In der Praxis bedeutet das:

- Notfallkrankenhausbehandlung (Aufnahme als öffentlicher Patient)
- Hausarztbesuche zum Bulkbilled Medicaresatz (obwohl viele Hausärzte in Australien nicht bulk-billen)
- Bezuschusste Medikamente unter dem Pharmaceutical Benefits Scheme (PBS)
- Ambulante Krankenhausbehandlung
- Schwangerschaftsversorgung, falls die Schwangerschaft vor der Ankunft nicht bekannt war

Der Standard ist "medizinisch notwendig" - also Behandlung, die ein Arzt als nötig ansieht, bevor du normalerweise nach Hause zurückkehren würdest.

## Was ist nicht abgedeckt?

Das RHCA schließt explizit aus:

- Behandlung, die vor der Reise nach Australien gebucht oder geplant wurde
- Wahleingriffe oder Behandlung, die warten kann, bis du nach Hause zurückkehrst
- Zahnbehandlung (außer begrenzte öffentliche Zahnpflege in manchen Fällen)
- Optometrie, Brillen oder Kontaktlinsen
- Physiotherapie, Chiropraktik oder andere Therapien, außer als Teil einer stationären Krankenhausversorgung
- Private Krankenhausbehandlung
- Krankenwagendienste in den meisten Bundesstaaten (Krankenwagen wird für niemanden von Medicare abgedeckt)
- Behandlung in einem Privatkrankenhaus oder als Privatpatient in einem öffentlichen Krankenhaus
- Kosmetische Eingriffe
- Behandlung außerhalb Australiens (zum Beispiel, wenn du nach Neuseeland oder Indonesien reist)

Die Ausschlüsse sind erheblich, und die meisten Dinge, die Working Holiday Maker tatsächlich brauchen (Zahn, Physio, Brillen, Krankenwagen), sind nicht abgedeckt.

## Wie meldest du dich bei Medicare unter dem RHCA an?

Britische Bürger melden sich bei Medicare in einem Services Australia (Medicare)-Büro persönlich an und legen vor:

- Einen gültigen UK-Reisepass
- Die Working Holiday Visabewilligungsmitteilung
- Eine UK-Wohnadresse (Nachweis nicht immer erforderlich)
- Eine australische Wohnadresse

Die Anmeldung ist kostenlos und meistens am selben Tag abgeschlossen. Eine Medicarekarte wird ausgestellt und an die australische Adresse innerhalb weniger Wochen geschickt. Bis die Karte ankommt, kann die Anmeldungsaufzeichnung in Krankenhäusern und bei Bulk-Billing-Hausärzten genutzt werden.

Die Anmeldung sollte in den ersten Wochen nach der Ankunft in Australien gemacht werden. Manche Krankenhäuser geben Notfallbehandlung auch ohne Medicarenummer und stellen dem Patienten eine Rechnung mit Option zur späteren Rückforderung - aber es ist viel reibungsloser, schon vor jeder Behandlung angemeldet zu sein.

## Wie interagiert das RHCA mit der Medicare Levy?

Die [Medicare Levy](/de/blog/medicare-levy-working-holiday-makers) ist eine 2 %-Steuer auf das zu versteuernde Einkommen australischer Residenten, die zur Finanzierung von Medicare genutzt wird. Working Holiday Maker sind keine australischen Steuerresidenten, also gilt die Medicare Levy generell nicht. Die Wechselwirkung der Levy hängt aber davon ab, wie deine Steuerresidenz bewertet wird. Für die meisten Working Holiday Maker wird keine Medicare Levy gezahlt, auch wenn Medicare genutzt wird.

## Warum du trotzdem private oder Reiseversicherung brauchst

Die Lücken im RHCA bedeuten, dass britische Working Holiday Maker trotzdem entweder Reiseversicherung oder australische private Krankenversicherung haben sollten - für:

- Krankenwagen (in den meisten Bundesstaaten nicht von Medicare abgedeckt; kann über 1.000 $ pro Fahrt kosten)
- Zahnnotfälle
- Optometrische Bedürfnisse
- Repatriierung nach Hause bei schwerer Krankheit oder Verletzung
- Verlust persönlicher Gegenstände, Reisestornierung und reisebezogene Risiken
- Wahleingriffe

Siehe unseren Artikel zu [Reiseversicherung vs. Krankenversicherung](/de/blog/travel-insurance-vs-health-insurance-working-holiday) für den Unterschied zwischen beiden und welche welche Lücke füllt.

## Was passiert, wenn du Behandlung brauchst, die das RHCA nicht abdeckt?

Wenn du Behandlung brauchst, die das RHCA nicht abdeckt, hast du drei Optionen:

1. **Aus eigener Tasche zahlen**, was für Krankenhausversorgung sehr teuer sein kann
2. **Über Reiseversicherung abrechnen**, wenn deine Police die Behandlung abdeckt
3. **Für die Behandlung ins UK zurückkehren**, falls sie warten kann

Repatriierung ins UK ist der Standardreiseversicherungsschutz für schwere Verletzungen oder Krankheiten, die laufende Pflege brauchen. Ohne Reiseversicherung können die Repatriierungskosten Zehntausende Dollar sein.

## Wie unterstützt unser Service britische Working Holiday Maker?

Der Medicare- und RHCA-Prozess wird von Services Australia bearbeitet, nicht direkt von unserem Team. Wo unser Service ansetzt, ist auf der Steuerseite - wo der Medicareanmeldestatus beeinflusst:

- Ob die [Medicare Levy](/de/blog/medicare-levy-working-holiday-makers) auf deine Steuererklärung gilt
- Wie der Medicare Levy Surcharge gilt (selten relevant für Working Holiday Maker)
- Wie private Krankenversicherungsprämien mit dem Steuersystem interagieren

Wenn du deine [Steuererklärung](/de/tax-return) über unseren Service einreichst, berücksichtigen wir deinen Medicarestatus korrekt, damit die Levy entweder angewendet oder ausgeschlossen wird, wie es sein soll. [Kontaktiere unser Team](/de/contact), wenn du unsicher bist, wie Medicare und die Levy deine Steuerposition beeinflussen.
 `,
  },

  'private-health-insurance-working-holiday-australia': {
    title: 'Brauchen Working Holiday Maker eine private Krankenversicherung in Australien?',
    description: 'Eine private Krankenversicherung ist Visumsbedingung für viele Working Holiday Visa und praktisch notwendig für Reisende aus Ländern ohne RHCA (wie Deutschland).',
    body: `
Eine private Krankenversicherung ist Visumsbedingung für viele Working Holiday Visa, die für Australien ausgestellt werden - besonders für das Subclass 462 Work and Holiday Visum. Die Abdeckung ist auch eine praktische Notwendigkeit für Working Holiday Maker aus Ländern ohne Sozialversicherungsabkommen (RHCA) mit Australien, einschließlich Deutschland, Frankreich, Spanien, USA, Kanada und Japan. Für Working Holiday Maker aus RHCA-Ländern (UK, Irland, Niederlande, Schweden und andere) ergänzt private Abdeckung [Medicare](/de/medicare), indem sie das bezahlt, was Medicare nicht abdeckt.

Die Kosten für private Abdeckung sind bescheiden im Vergleich zu den Kosten, ohne sie zu bleiben. Ein einzelner Notfallkrankenhausaufenthalt in Australien ohne Versicherung kann über 20.000 $ kosten.

## Ist private Krankenversicherung eine Visumsbedingung?

Die Visumsbedingungen variieren nach Subclass und Nationalität:

- **Subclass 417 (Working Holiday)**: Die meisten Nationalitäten brauchen keine Versicherung als strikte Visumsbedingung, sie wird aber dringend empfohlen
- **Subclass 462 (Work and Holiday)**: Die meisten Abkommen mit Australien unter dieser Subclass verlangen angemessene Krankenversicherung für die Dauer des Visums, die spezifische Anforderung variiert je Land

Das Department of Home Affairs prüft die Versicherung üblicherweise nicht bei Einreise, aber ein Verstoß gegen eine Visumsbedingung kann später aufkommen - und ohne Versicherung zu reisen ist riskant, unabhängig von der gesetzlichen Anforderung.

## Welche Arten von Versicherung gibt es?

Die zwei Hauptoptionen sind Reiseversicherung und Overseas Visitors Health Cover (OVHC).

**Reiseversicherung** wird bei einem Reiseversicherungsanbieter gekauft, meistens vor der Abreise von zu Hause oder kurz nach der Ankunft. Sie deckt:

- medizinische Notfallbehandlung in Australien
- Krankenhausaufnahme
- Rücktransport ins Heimatland
- Reisestornierung, Gepäckverlust, Diebstahl und andere reisebezogene Risiken
- private Haftpflicht in manchen Fällen

Die Abdeckungsperioden sind meistens auf 12 bis 18 Monate begrenzt, mit Verlängerungsoption.

**Overseas Visitors Health Cover (OVHC)** wird bei einer australischen privaten Krankenkasse gekauft und bietet Abdeckung ähnlich wie Medicare, plus optionale Extras. Sie deckt:

- Öffentliche und private Krankenhausbehandlung
- Hausarztbesuche
- Facharztkonsultationen
- Medikamente
- Optionale Extras: Zahnarzt, Optik, Physiotherapie, Chiropraktik

OVHC kann unbegrenzt verlängert werden, solange du in Australien bist, und ist die bessere Option für Working Holiday Maker, die länger als 12 Monate bleiben wollen und umfassende medizinische Abdeckung möchten.

Die meisten Working Holiday Maker profitieren davon, beides zu haben: Reiseversicherung für die breiteren Reiserisiken und OVHC für laufende medizinische Abdeckung.

## Wie unterscheidet sich die Abdeckung für RHCA-Länder?

Wenn du aus einem RHCA-Land kommst (UK, Irland, Schweden, Niederlande, Finnland, Norwegen, Belgien, Slowenien, Malta, Italien, Neuseeland), kannst du dich bei [Medicare](/de/medicare) anmelden und das australische öffentliche System für medizinisch notwendige Behandlung nutzen. Private Abdeckung ist daher eher eine Aufstockung als Primärversicherung.

Für RHCA-Bürger sind die Hauptlücken, die private Abdeckung füllt:

- Krankenwagen (nicht von Medicare gedeckt)
- Zahnbehandlung
- Sehhilfe
- Physiotherapie und andere Gesundheitsleistungen außerhalb der Krankenhausbehandlung
- Rückführung bei schwerer Krankheit oder Verletzung

Für Bürger aus Ländern ohne RHCA (Deutschland, Frankreich, Spanien, USA, Kanada, Japan und andere) ist private Abdeckung die einzige verfügbare Krankenversicherung und muss umfassend sein.

## Was kostet es?

OVHC-Kosten variieren je nach Fonds und Deckungsniveau:

- Grundlegende Krankenhausabdeckung für einen einzelnen Erwachsenen: 80 bis 150 $ pro Monat
- Umfassende Krankenhausabdeckung: 150 bis 250 $ pro Monat
- Krankenhaus plus Extras: 200 bis 350 $ pro Monat

Reiseversicherung für einen 12-monatigen Working Holiday kostet typischerweise 400 bis 1.200 $, abhängig von Deckungsumfang, Alter und enthaltenen Aktivitäten (manche Abenteueraktivitäten und Farmarbeit erfordern Zusatzabdeckung).

## Was ist mit Krankenwagenabdeckung?

Krankenwagenleistungen sind in den meisten australischen Bundesstaaten nicht von Medicare gedeckt. Eine einzelne Krankenwagenfahrt kann 400 bis 1.500 $ kosten. Sowohl OVHC als auch die meisten Reiseversicherungspolicen enthalten Krankenwagenabdeckung, aber das Niveau variiert. Vor der Inanspruchnahme prüfen.

In Queensland und Tasmanien werden Krankenwagenleistungen kostenlos oder zu niedrigen Kosten für Einwohner unter staatlichen Programmen erbracht. In anderen Bundesstaaten ist der Krankenwagen unabhängig von der Nationalität eine private Kostenposition.

## Beeinflusst die private Krankenversicherung deine Steuer?

Für die meisten Working Holiday Maker nicht. Die Medicare Levy Surcharge, die auf einkommensstarke australische Residenten ohne private Krankenhausabdeckung gilt, betrifft Working Holiday Maker nicht, weil sie typischerweise keine Steuerresidenten sind. Die 2 %-[Medicare Levy](/de/blog/medicare-levy-working-holiday-makers) wird auch generell nicht auf Working Holiday Maker angewendet.

Manche private Krankenversicherungsprämien sind durch eine Regierungsrückerstattung begünstigt, aber die Rückerstattung ist nur für Medicare-berechtigte australische Residenten verfügbar und gilt nicht für Working Holiday Maker-OVHC.

## Worauf achten bei einer Police

Bei der Wahl einer privaten Krankenabdeckung prüfe:

- **Selbstbeteiligung**: der Betrag, den du selbst zahlst, bevor die Versicherung greift
- **Wartezeiten**: Vorerkrankungen sind oft 12 Monate ausgeschlossen
- **Geografische Abdeckung**: manche Policen decken nur Australien, andere die Region
- **Schwangerschaft und Mutterschaft**: meistens ausgeschlossen oder mit langen Wartezeiten
- **Psychische Gesundheit**: Abdeckung variiert deutlich zwischen Policen
- **Abenteueraktivitäten**: Bungeejumping, Tauchen, Fallschirmspringen brauchen eventuell Zusatzabdeckung
- **Farmarbeit**: manche Policen schließen Landwirtschaftsarbeit aus oder begrenzen sie

## Wie unterstützt unser Service Working Holiday Maker?

Unser Team verkauft keine Krankenversicherung direkt, aber Krankenversicherungsstatus und Medicareberechtigung beeinflussen deine Steuerposition. Wenn du deine [Steuererklärung](/de/tax-return) über unseren Service einreichst, berücksichtigen wir:

- Ob die Medicare Levy gilt (meistens nicht für Working Holiday Maker)
- Ob die Medicare Levy Surcharge gilt (selten)
- Eventuelle private Krankenversicherungsrückerstattung (selten anwendbar für Working Holiday Maker)

Wenn du unsicher bist, wie dein Versicherungsstatus deine Steuer beeinflusst, [kontaktiere unser Team](/de/contact).
 
## OVHC vs. deutsche Reiseversicherung: die Entscheidungsmatrix

Für Deutsche (kein Medicare) laufen die Optionen auf drei Setups hinaus: nur deutsche Incoming-Versicherung (günstig, aber Arbeitsausschlüsse und Laufzeitgrenzen prüfen), nur australische OVHC (arbeitskompatibel, lokal abrechenbar, laufende Kosten), oder das übliche Kombi-Modell - Incoming für die ersten Monate, OVHC ab Jobbeginn. Die Zahlen, die die Entscheidung treiben: eine Nacht öffentliches Krankenhaus ohne Deckung kostet vierstellig, ein Krankenwagen mehrere hundert Dollar, und keine der beiden Welten deckt standardmäßig Zähne. Ambulanz-Cover gibt es in manchen Bundesstaaten für unter 50 $ im Jahr - der günstigste Baustein im ganzen System und der am häufigsten vergessene.
`,
  },

  'emergency-medical-care-working-holiday-no-medicare': {
    title: 'Was tun in einem medizinischen Notfall ohne Medicareabdeckung in Australien',
    description: 'Working Holiday Maker ohne Medicare können trotzdem Notfallbehandlung in Australien bekommen, aber die Kosten zahlt der Patient selbst.',
    body: `
Ein Working Holiday Maker, der nicht durch [Medicare](/de/medicare) oder ein Sozialversicherungsabkommen (RHCA) abgedeckt ist, kann trotzdem medizinische Notfallbehandlung in Australien bekommen. Öffentliche Krankenhäuser bieten Notfallversorgung unabhängig von Versicherung oder Zahlungsfähigkeit, aber der Patient wird danach als Privatpatient abgerechnet. Die Rechnungen können je nach Behandlung auf Tausende oder Zehntausende Dollar laufen. Für Working Holiday Maker aus Ländern ohne RHCA (Deutschland, Frankreich, Spanien, USA, Kanada, Japan) ist eine private Krankenversicherung oder umfassende Reiseversicherung der einzige realistische Weg, die Kosten zu bewältigen.

Das wichtigste praktische Wissen für jeden Working Holiday Maker: welche Nummer zu wählen, wohin zu gehen und was deine Versicherung abdeckt und was nicht - bevor ein Notfall passiert.

## Welche Nummer rufst du?

In jedem medizinischen Notfall in Australien ist die zu wählende Nummer **000** (Nullnullnull). Das ist das Äquivalent von 112 in Deutschland. Der 000-Dienst verbindet zu Polizei, Feuerwehr und Krankenwagen, und du gibst an, welchen Dienst du brauchst.

Für nicht lebensbedrohliche Situationen bietet die **healthdirect**-Hotline unter **1800 022 222** rund um die Uhr telefonische Beratung von ausgebildeten Krankenpflegern und kann dich zur richtigen Versorgungsstufe leiten.

Für einen Hausarzt nach den Öffnungszeiten schickt der **National Home Doctor Service** unter **13 SICK (137 425)** Ärzte zu deiner Unterkunft in den meisten Metropolregionen. Der Besuch wird für Medicare-berechtigte Patienten bulk-billed (kostenlos), und Privatpatienten zahlen etwa 100 bis 150 $.

## Was ist abgedeckt, wenn du eine Versicherung hast?

Die Abdeckung hängt von deiner Versicherungsart ab:

**OVHC (australische private Krankenversicherung für Besucher)** deckt typischerweise:

- Notaufnahmebesuche in öffentlichen und privaten Krankenhäusern
- Krankenhausaufnahme als Privatpatient
- Chirurgische Behandlung
- Stationäre Medikamente
- Krankenwagen (variiert je Police)
- Die meisten diagnostischen Bildgebungen und Laboruntersuchungen

**Reiseversicherung** deckt typischerweise:

- medizinische Notfall- und Krankenhausbehandlung
- Rücktransport bei Bedarf
- Krankenwagen
- Ambulante Behandlung in manchen Fällen
- Reisebezogene Kosten (Stornierung, Gepäckverlust)

**RHCA-Medicare-Abdeckung** (für britische, irische und andere RHCA-Bürger) deckt:

- Öffentliche Krankenhausnotfallbehandlung
- Bezuschusste Hausarztbesuche in Bulk-Billing-Kliniken
- Bezuschusste Medikamente über das PBS
- Siehe unseren Artikel zum [UK-Australien Medicare-Abkommen](/de/blog/uk-medicare-reciprocal-agreement-australia) für die Details

Was selten von einem dieser Punkte abgedeckt wird:

- Krankenwagen-Leistungen (variiert je Bundesstaat und Police)
- Rückführung nach Hause (Medicare/RHCA decken das nicht; Reiseversicherung meistens schon)
- Zahnnotfälle (begrenzte Abdeckung in den meisten Policen)
- Psychische Krisen (begrenzte Abdeckung und lange Wartezeiten in vielen Policen)

## Was kostet eine Notfallbehandlung ohne Versicherung?

Für einen Working Holiday Maker ohne RHCA, ohne OVHC oder Reiseversicherung sind typische Rechnungen:

- **Notaufnahmebesuch ohne Aufnahme**: 400 bis 800 $
- **Notaufnahmebesuch mit Übernachtung**: 1.500 bis 5.000 $
- **Mehrtägiger Krankenhausaufenthalt mit Operation**: 10.000 bis 50.000 $
- **Intensivstation**: 5.000 bis 10.000 $ pro Tag
- **Luftkrankenwagen aus einer entlegenen Gegend**: 20.000 bis 80.000 $
- **Internationale medizinische Rückführung per Flug**: 50.000 bis 150.000 $

Diese Kosten sind nicht theoretisch. Australische Krankenhäuser verfolgen ausländische Patienten routinemäßig für unbezahlte Rechnungen über internationale Inkassobüros.

## Was passiert, wenn du nicht zahlen kannst?

Krankenhäuser verweigern Notfallbehandlung nicht, weil der Patient nicht zahlen kann. Die Behandlung passiert, und die Abrechnung wird danach geregelt. Die Optionen für Patienten, die nicht zahlen können:

- **Verhandelte Zahlungspläne** mit dem Krankenhaus, manchmal über Jahre
- **Sozialprogramme** in manchen öffentlichen Krankenhäusern
- **Reiseversicherungsansprüche**, falls du Abdeckung hast
- **Botschaftshilfe** in extremen Fällen (manche Botschaften können in echten Notfällen Mittel vorstrecken, die aber zurückgezahlt werden müssen)

Ohne Versicherung zu sein ist keine tragfähige Strategie für einen Working Holiday Maker. Das Risiko katastrophaler Kosten ist real.

## Wohin gehen: öffentliches vs. privates Krankenhaus

Für einen Notfall ist die Wahl zwischen einer öffentlichen Krankenhausnotaufnahme und einer privaten Krankenhausnotaufnahme.

**Öffentliche Krankenhausnotaufnahmen** sind kostenlos für Medicare-berechtigte Patienten (australische Residenten und RHCA-Landbürger, die bei Medicare angemeldet sind). Working Holiday Maker ohne RHCA werden im öffentlichen Krankenhaus als Privatpatienten abgerechnet, aber die Sätze sind generell niedriger als in privaten Krankenhäusern.

**Private Krankenhausnotaufnahmen** berechnen ab der ersten Minute und sind durchweg teurer, aber Wartezeiten sind oft kürzer und die Einrichtungen meistens moderner.

Für die meisten Working Holiday Maker ist das öffentliche Krankenhaus die richtige Wahl für ernste Notfälle. Die Behandlungsqualität ist hoch, und die Kosten (auch als Privatpatient) sind besser zu bewältigen.

## Was tun nach einem Notfall

Wenn du in Australien Notfallbehandlung bekommen hast:

1. **Bewahre jedes Dokument auf**: Entlassungsbericht, Medikamentenliste, Untersuchungsergebnisse, Rechnungen
2. **Kontaktiere deine Versicherung sofort**, idealerweise noch im Krankenhaus
3. **Dokumentiere, was passiert ist** mit Daten, Uhrzeiten und behandelndem Personal
4. **Hol Quittungen für alles**, einschließlich Apothekenkäufen und Folgeterminen
5. **Reiche den Versicherungsanspruch zügig ein**, mit den unterstützenden Belegen
6. **Bewahre Kopien aller Korrespondenz** mit Krankenhäusern, Versicherungen und Botschaften auf

Wenn du wegen der Verletzung oder Krankheit längere Zeit nicht arbeiten kannst, beeinflusst das auch:

- Deinen Lohn und eventuell [unbezahlte Super](/de/blog/super-employer-not-paying-what-to-do)
- Deine [Steuererklärung](/de/tax-return) für das Steuerjahr (oft eine größere Rückzahlung wegen reduziertem Einkommen)
- Dein Visatiming, falls die Genesung über das Visaablaufdatum geht
- Deine DASP-Berechtigung, falls du früher als geplant abreisen musst

## Wie unterstützt unser Service Working Holiday Maker nach einem medizinischen Notfall?

Während unser Team die medizinische Versorgung oder Versicherungsansprüche nicht direkt bearbeitet, sind die finanziellen und steuerlichen Folgen eines medizinischen Ereignisses Teil unseres Services:

- Überprüfung von Lohn und [Super](/de/superannuation) für die Zeit vor und nach dem Ereignis
- Einreichung der [Steuererklärung](/de/tax-return) mit dem reduzierten Einkommen (oft mit größerer Rückzahlung)
- Koordinierung des DASP-Timings, falls du Australien früher als geplant verlassen musst
- Überprüfung von Versicherungsauszahlungen, die steuerliche Auswirkungen haben können

Ein medizinischer Notfall beeinflusst selten nur einen Teil deines Lebens. [Kontaktiere unser Team](/de/contact) für Hilfe mit der finanziellen Seite nach einem medizinischen Ereignis.
 `,
  },

  'travel-insurance-vs-health-insurance-working-holiday': {
    title: 'Reiseversicherung vs. private Krankenversicherung für Working Holiday Maker: was ist der Unterschied?',
    description: 'Reiseversicherung und australische private Krankenversicherung decken unterschiedliche Dinge ab. Im Folgenden findest du die Details.',
    body: `
Reiseversicherung und australische private Krankenversicherung (speziell Overseas Visitors Health Cover, oder OVHC) decken unterschiedliche Dinge ab. Reiseversicherung ist eine breite Police, die bei einem Reiseversicherungsanbieter gekauft wird und medizinische Notfälle plus reisebezogene Risiken wie Stornierung, Gepäckverlust und Rücktransport abdeckt. OVHC ist ein australisches Krankenversicherungsprodukt, das medizinische und Krankenhausbehandlung innerhalb Australiens abdeckt - ähnlich wie [Medicare](/de/medicare), aber für Nichtresidenten. Working Holiday Maker brauchen oft beides, besonders wenn sie aus einem Land ohne Sozialversicherungsabkommen mit Australien kommen.

Die Wahl zwischen Reiseversicherung und OVHC ist keine reine Entweder-oder-Entscheidung. Die richtige Antwort für die meisten Working Holiday Maker ist eine Kombination, die die Lücken in jedem füllt.

## Was deckt Reiseversicherung?

Eine umfassende Reiseversicherungspolice deckt typischerweise:

- **Medizinische Notfälle**: Krankenhausbehandlung, Operation, Arztbesuche in Australien
- **Rücktransport**: Rückflug bei schwerer Krankheit oder Verletzung
- **Reisestornierung**: Erstattung vorausbezahlter Reisekosten, falls du nicht reisen kannst
- **Verlorenes oder gestohlenes Gepäck**: Ersatz wesentlicher Gegenstände
- **Reiseunterbrechung**: Kosten, falls deine Reise durch Krankheit oder Notfall unterbrochen wird
- **private Haftpflicht**: falls du versehentlich jemanden verletzt oder Eigentum beschädigst
- **Notfall-Evakuierung**: aus entlegenen Gegenden, per Flugzeug bei Bedarf
- **Stornierung bezahlter Aktivitäten**: Touren, Unterkünfte, Transport

Abdeckungsperioden sind meistens auf 12 bis 18 Monate begrenzt, mit Verlängerungsoptionen für längere Aufenthalte. Viele Policen schließen außerdem aus oder begrenzen:

- Vorerkrankungen
- Aktivitäten mit hohem Risiko (manche Abenteuersportarten, Tauchen ab bestimmten Tiefen, Motorradfahren ohne Lizenz)
- Arbeitsbezogene Verletzungen (das ist eine kritische Lücke für Working Holiday Maker, siehe unten)

## Was deckt OVHC?

OVHC wird bei einer australischen privaten Krankenkasse gekauft und ist wie Medicare-Abdeckung strukturiert. Eine typische OVHC-Police umfasst:

- **Öffentliche und private Krankenhausaufnahme**
- **Notaufnahmebesuche**
- **Hausarztkonsultationen** (meistens mit einer kleinen Zuzahlungsgebühr)
- **Facharztkonsultationen**
- **Bezuschusste Arzneimittel**
- **Diagnostische Bildgebung und Laboruntersuchungen**
- **Optionale Extras**: Zahnarzt, Sehhilfe, Physiotherapie, Chiropraktik

OVHC ist unbegrenzt verlängerbar, solange du in Australien bist, und kann die primäre Abdeckung für laufende medizinische Bedürfnisse sein. Die Prämien werden monatlich oder jährlich gezahlt, und die Abdeckung beginnt an einem gewählten Datum.

OVHC deckt typischerweise nicht:

- Rücktransport nach Hause
- Reisen innerhalb Australiens oder in nahe Länder
- Reisestornierung
- Gepäckverlust oder Diebstahl persönlicher Gegenstände

## Warum brauchen Working Holiday Maker oft beides?

Der Grund, warum beide meistens passend sind: Jede deckt, was die andere nicht deckt:

- **Medizinischer Notfall in Sydney**: gedeckt von beiden OVHC und Reiseversicherung, aber OVHC ist typischerweise schneller einzulösen und hat niedrigere Lücken
- **Rücktransport nach Deutschland nach schwerer Verletzung**: gedeckt von Reiseversicherung, nicht von OVHC
- **Verlorener Reisepass in Cairns**: gedeckt von Reiseversicherung, nicht von OVHC
- **Diebstahl von Laptop und Handy**: gedeckt von Reiseversicherung, nicht von OVHC
- **Routinehausarztbesuch wegen Atemwegsinfektion**: gedeckt von OVHC, teilweise von Reiseversicherung mit hoher Selbstbeteiligung
- **Trip nach Neuseeland oder Bali während des Working Holiday**: gedeckt von Reiseversicherung, nicht von OVHC

Für einen Working Holiday Maker, der für volle 12 Monate bleibt und innerhalb Australiens reist, füllt beides zusammen fast alle realistischen Lücken.

## Die Arbeitsverletzungslücke

Die einzige größte Versicherungslücke, die die meisten Reiseversicherungspolicen für Working Holiday Maker haben, ist **Ausschluss arbeitsbezogener Verletzungen**. Die meisten Reiseversicherungspolicen sind für Touristen entworfen, nicht für Reisende, die Lohn verdienen. Wenn du dich beim Arbeiten auf einer Farm, in der Gastronomie, auf einer Baustelle oder in einer anderen bezahlten Rolle verletzt, kann die Reiseversicherungspolice den Anspruch ablehnen.

Arbeitsbezogene Verletzungen sind stattdessen gedeckt durch:

- **Workers Compensation** über deinen Arbeitgeber (siehe unseren Artikel zu [Arbeitsverletzungsrechten](/de/blog/workplace-injury-working-holiday-rights))
- **OVHC** für Behandlungskosten, die nicht von Workers Compensation gedeckt sind
- **Medicare** (für RHCA-Landbürger, die bei Medicare angemeldet sind)

Prüfe immer den Arbeitsausschluss in einer Reiseversicherungspolice, bevor du annimmst, dass du gedeckt bist.

## Kostenvergleich

Ungefähre jährliche Kosten für einen einzelnen Working Holiday Maker:

- **OVHC, nur Grundkrankenhaus**: 1.000 bis 1.800 $ pro Jahr
- **OVHC, Krankenhaus plus Extras**: 1.800 bis 4.000 $ pro Jahr
- **Umfassende Reiseversicherung, 12 Monate**: 400 bis 1.200 $ pro Jahr
- **Kombinierte OVHC und Reiseversicherung**: 1.500 bis 5.000 $ pro Jahr

Die kombinierten Kosten mögen hoch erscheinen, aber ein einzelner unversicherter Notfall kann mehr kosten als die lebenslange Abdeckung.

## Worauf achten in beiden Produkten

Bei der Wahl beider Versicherungsarten prüfe:

- **Selbstbeteiligung**: wie viel du selbst zahlst, bevor die Versicherung greift
- **Wartezeiten**: Vorerkrankungen, Schwangerschaft, psychische Gesundheit
- **Geografische Abdeckung**: nur Australien oder weitere Region
- **Aktivitätsausschlüsse**: Abenteuersport, Arbeit mit Tieren, Farmarbeit
- **Arbeitsbezogene Ausschlüsse**: kritisch für Working Holiday Maker
- **Rücktransportsabdeckung und -grenzen**
- **Psychische Gesundheitsabdeckung**
- **Zahn- und Sehhilfenabdeckung**
- **Antragsprozess**: wie schnell Ansprüche bearbeitet und gezahlt werden

## Wie wirkt sich Versicherung auf die Steuer aus?

Für die meisten Working Holiday Maker beeinflussen weder Reiseversicherung noch OVHC die Steuerposition:

- Prämien sind nicht gegen Working-Holiday-Einkommen absetzbar
- Anspruchsauszahlungen sind generell nicht steuerpflichtiges Einkommen
- Die Medicare Levy Surcharge gilt meistens nicht (Working Holiday Maker sind typischerweise keine australischen Steuerresidenten)
- Die Privatgesundheitsrückerstattung gilt nicht für OVHC für Working Holiday Maker

Wenn du deine [Steuererklärung](/de/tax-return) über unseren Service einreichst, berücksichtigen wir deinen Versicherungsstatus korrekt, sodass die Levy ausgeschlossen wird, wo sie ausgeschlossen sein sollte. [Kontaktiere unser Team](/de/contact), falls du unsicher bist, wie deine Versicherung deine Steuerposition beeinflusst.

## Wie unterstützt unser Service Working Holiday Maker?

Unser Team verkauft keine Versicherung, aber wir koordinieren mit den finanziellen und steuerlichen Folgen von Versicherung und medizinischen Ereignissen:

- Überprüfung, wie der Versicherungsstatus die [Medicare Levy](/de/blog/medicare-levy-working-holiday-makers) in deiner Steuererklärung beeinflusst
- Identifizierung von Steuerwechselwirkungen, falls du eine Versicherungsauszahlung bekommst
- Koordinierung des DASP- und Steuertimings, falls Krankheit oder Verletzung dein Abreisedatum beeinflusst

Die Versicherungseinrichtung eines Working Holiday Makers ist eine persönliche Entscheidung, aber die Steuerseite ist damit verbunden. [Kontaktiere unser Team](/de/contact) für Hilfe mit den Steuerwechselwirkungen.
 `,
  },

  'hospitality-award-working-holiday-makers': {
    title: 'Was ist der Hospitality Award und wie gilt er für Working Holiday Maker?',
    description: 'Der Hospitality Award (MA000009) ist der moderne Award, der Mindestlöhne, Penalty Rates und Bedingungen für die meisten Gastronomiejobs festlegt.',
    body: `
Der Hospitality Industry (General) Award 2020, bekannt als MA000009 oder der Hospitality Award, ist der moderne Award, der gesetzliche Mindestlohnsätze, Einstufungen, Penalty Rates, Zulagen und Bedingungen für die meisten Arbeiter in der australischen Gastronomiebranche festlegt. Der Award gilt für Working Holiday Maker zu denselben Bedingungen wie für australische Arbeiter. Wenn du in einem Hotel, Motel, Hostel, einer Bar, einem Nachtclub, einem Café, das an eine dieser Einrichtungen angeschlossen ist, einem Veranstaltungszentrum oder einem Caravan Park arbeitest, legt der Hospitality Award wahrscheinlich deine gesetzlichen Mindestansprüche fest.

Die meisten Working Holiday Maker in der Gastronomie werden relativ zu dem, was der Hospitality Award verlangt, unterbezahlt - oft um Hunderte Dollar pro Woche, sobald Penalty Rates und Casual Loadings korrekt angewendet werden.

## Was deckt der Hospitality Award ab?

Der Hospitality Award deckt Arbeitgeber und Angestellte ab, die arbeiten in:

- Hotels, Motels, Serviced Apartments, Resorts
- Caravan Parks und Hostels
- Veranstaltungszentren und Konferenzanlagen
- Restaurants und Bars, die Teil eines Hotels oder einer Unterkunft sind
- Nachtclubs
- Casinos (in den meisten Fällen)
- Personalvermittlungen, die Arbeiter in diesen Einrichtungen einsetzen

Der Award deckt **nicht** eigenständige Restaurants, Cafés oder Fast-Food-Lokale ab, die nicht Teil eines Hotels sind. Diese sind stattdessen vom [Restaurant Industry Award](/de/blog/restaurant-industry-award-working-holiday) oder dem Fast Food Industry Award abgedeckt.

## Welche Einstufungen gelten?

Der Hospitality Award hat sechs Hauptstufen, von Einsteiger-Level bis Level 6. Die meisten Working Holiday Maker fallen in:

- **Einsteiger-Level**: erste drei Monate in der Branche, keine vorherige Erfahrung
- **Level 1 (HIE Grade 1)**: Küchenhilfe, Zimmerbetreuer, Portier, Glaswäscher, Food and Beverage Attendant ohne Verantwortung
- **Level 2 (HIE Grade 2)**: Bar-Attendant mit RSA, Cook Grade 1, Kellner mit Verantwortung
- **Level 3 (HIE Grade 3)**: Cook Grade 2, Head Waiter für kleine Sektion, Sicherheitsbeamter

Jede Stufe hat einen Mindeststundenlohn. Nach drei Monaten auf Einsteiger-Level muss der Arbeitgeber dich automatisch auf Level 1 hochstufen, außer es gibt einen echten Grund für weitere Schulung.

## Was sind die Mindestlohnsätze?

Mindestlohnsätze ändern sich jeden 1. Juli mit der Annual Wage Review. Die Sätze gelten als Mindeststundenlohn für Vollzeit- und Teilzeitarbeiter. Casualarbeiter erhalten ein Casual Loading von 25 % zusätzlich zum Basissatz.

Für einen Working Holiday Maker in einer typischen Level-1-Rolle:

- Basisstundenlohn, der vom Hospitality Award festgelegt wird
- Casual Loading von 25 % zusätzlich
- Penalty Rates für Abende, Wochenenden und Feiertage
- Zulagen für Split-Schichten, nicht gewährte Essenspausen, unterbrochene Schichten und andere Umstände

Wenn du einen Pauschalsatz erhältst, der angeblich "alles abdeckt"t, wirst du fast sicher gegen den Award unterbezahlt.

## Welche Penalty Rates gelten?

Gastronomiearbeit ist eine der höchsten Penalty Ratebranchen in Australien. Casualangestellte unter dem Hospitality Award haben Anspruch auf Penalty Rates zusätzlich zum Casual Loading:

- **Samstag**: typischerweise 25 % Aufschlag auf den Basissatz (plus das 25 %-Casual Loading)
- **Sonntag**: typischerweise 50 % Aufschlag (plus das 25 %-Casual Loading)
- **Feiertage**: typischerweise 125 % Aufschlag (plus das 25 %-Casual Loading)
- **Abendarbeit** (19 Uhr bis Mitternacht): zusätzlicher Aufschlag je nach Stufe
- **Mitternacht bis 7 Uhr**: höherer Nachtaufschlag

Die genauen Prozentsätze und Startzeiten sind in der aktuellen Version des Awards festgelegt und variieren leicht für verschiedene Einstufungen. Siehe unseren Artikel zu [Penalty Rates in Australien](/de/blog/penalty-rates-australia) für das allgemeine Rahmenwerk.

## Welche Zulagen gelten unter dem Hospitality Award?

Der Award enthält spezifische Zulagen zusätzlich zum Stundenlohn:

- **Essenszulage**: bei Überstunden ohne Essenspause
- **Splitschichtzulage**: wo eine Schicht durch eine unbezahlte Periode unterbrochen wird
- **Kleidungs- oder Uniformzulage**: wo der Arbeitgeber eine Uniform verlangt, sie aber nicht bereitstellt
- **Wäschezulage**: für das Waschen vom Arbeitgeber verlangter Uniformen
- **Erste-Hilfe-Kastenzulage**: für designierte Erste-Hilfe-Kastenbeamte
- **Reisezulage**: in manchen Umständen für kurzfristige Schichtänderungen

Diese werden zusätzlich zum Basissatz gezahlt. Viele Working Holiday Maker in der Gastronomie werden nicht die Zulagen bezahlt, auf die sie Anspruch haben.

## Wie wirkt sich das auf deine Steuerposition aus?

Wenn du gegen den Hospitality Award unterbezahlt wurdest, sind die Löhne, die du hättest erhalten sollen, höher als das, was ans ATO gemeldet wurde. Die Rückforderung der Unterbezahlung erhöht:

- Das steuerpflichtige Einkommen auf deiner [Steuererklärung](/de/tax-return)
- Die [Superbeiträge](/de/superannuation), die der Arbeitgeber hätte zahlen sollen (12 % der korrigierten Löhne)
- Die eventuelle DASP, wenn du Australien verlässt

Wenn wir über unser Steueragentenportal einreichen, prüfen wir deine Lohnzettel gegen die Hospitality Award-Sätze für deine Einstufung und identifizieren Muster der Unterbezahlung. Die Verfolgung der Unterbezahlung wird über Fair Work abgewickelt; die Steuer- und Superkonsequenzen werden über unseren Service abgewickelt.

## Wie unterstützt unser Service Gastronomiearbeiter?

Für Working Holiday Maker in der Gastronomie macht unser Team:

- Querverweis von Lohnzetteln gegen die Hospitality Award-Einstufung und den Satz
- Identifikation unterbezahlter Löhne, fehlender Penalty Rates und fehlender Zulagen
- Abgleich der ATO-gemeldeten Einkünfte gegen das, was hätte gezahlt werden sollen
- Verfolgung [unbezahlter Super](/de/blog/super-employer-not-paying-what-to-do) auf die korrekten Löhne, nicht nur die gezahlten Löhne
- Einreichung der [Steuererklärung](/de/tax-return) mit den korrekten Einkommenszahlen

Der Hospitality Award ist einer der komplexesten modernen Awards in Australien und einer der am konsistentesten verletzten. [Kontaktiere unser Team](/de/contact), falls du in der Gastronomie arbeitest und sicherstellen möchtest, dass du das bezahlt bekommst, was der Award verlangt.
 
## Payslip gegen Award prüfen in drei Schritten

Schritt 1: dein Level identifizieren (Food & Beverage Attendant Level 1 usw. - deine echten Aufgaben entscheiden). Schritt 2: im Fair-Work-Pay-Guide den aktuellen Casual-Satz nachschlagen (Basis plus 25 % Loading steht fertig drin). Schritt 3: Stundensatz und Zuschläge je Schichttyp (Abend, Wochenende, Feiertag) mit dem Payslip abgleichen. Bei Abweichung schriftlich nachfragen - Gastro-Lohnprobleme lösen sich bei denen zuerst, die diese drei Schritte gemacht haben.
`,
  },

  'horticulture-award-working-holiday-makers': {
    title: 'Was ist der Horticulture Award und wie gilt er für Farmarbeit mit Working Holiday Visum?',
    description: 'Der Horticulture Award (MA000028) legt Mindestlöhne, Pausen und Bedingungen für Farmarbeit fest. Aktuelle Sätze 2025-26 und Rechte für Working Holiday Maker.',
    body: `
Der Horticulture Award 2020, bekannt als MA000028, ist der moderne Award, der gesetzliche Mindestlohnsätze, Einstufungen, Penalty Rates und Bedingungen für Farmarbeit in Australien festlegt. Der Award gilt für Working Holiday Maker, die die 88 Tage regionale Farmarbeit absolvieren, die für ein Zweitjahresvisum erforderlich sind, sowie für jeden, der bei Obst- und Gemüsepflücken, Verpackung, Beschneiden, Pflanzen oder allgemeiner Farmarbeit arbeitet. Der Award legt einen Mindeststundenlohn fest, der auch dann gilt, wenn der Arbeiter auf Akkordbasis bezahlt wird.

Farmarbeit ist eine der am meisten unterbezahlten Branchen in Australien. Der Fair Work Ombudsman hat mehrere nationale Kampagnen zu Unterbezahlung in der Horticulture geführt, mit konsistenten Befunden, dass die meisten Arbeiter unter dem Award-Minimum bezahlt werden.

## Was deckt der Horticulture Award ab?

Der Award deckt ab:

- Obstpflücken und -ernte
- Gemüsepflücken und -ernte
- Beschneiden, Pflanzen, Jäten und sonstige Arbeit an Reben und Bäumen
- Verpackung von Obst und Gemüse in Schuppen auf der Farm
- Allgemeine Farmarbeit, wo die Hauptaktivität Horticulture ist
- Pilzanbau und -ernte
- Blumenanbau und -schneiden

Der Award deckt nicht großflächiger Anbau (Weizen, Gerste), Viehzucht (Rind, Schaf) oder Aquakultur ab, die von separaten Awards abgedeckt werden.

## Was ist die Mindeststundenlohn-Garantie?

Der wichtigste Schutz im Horticulture Award für Working Holiday Maker ist die **Mindeststundenlohn-Garantie**. Auch wenn der Arbeiter auf Akkordbasis bezahlt wird (pro Bin, pro Eimer oder pro gepflücktes Tablett), muss der Arbeiter mindestens das Äquivalent des Mindeststundenlohns für die gearbeitete Zeit bezahlt werden.

Wenn deine Akkordeinkünfte für einen Tag weniger als der Mindeststundenlohn mal deine gearbeiteten Stunden ergeben, muss der Arbeitgeber die Differenz aufstocken. Viele Farmen zahlen diese Aufstockung nicht, was das häufigste Unterbezahlungsmuster in der Horticulture ist.

Siehe unseren Artikel zu [Akkordlohn in der Farmarbeit](/de/blog/piece-rates-farm-work-working-holiday) für die Details, wie dieser Schutz funktionieren soll.

## Welche Einstufungen gelten?

Der Horticulture Award hat fünf Hauptklassifizierungen:

- **Level 1**: neue Angestellte während ihrer ersten drei Monate, keine vorherige Farmerfahrung
- **Level 2**: Arbeiter, die drei Monate absolviert haben oder vorherige Erfahrung haben
- **Level 3**: qualifizierte Arbeiter, die Aufgaben ausführen, die spezialisiertes Wissen erfordern
- **Level 4**: Traktorfahrer, Chemikalienanwender und Leiter kleiner Teams
- **Level 5**: Leading Hands und qualifizierte Vorarbeiter

Die meisten Working Holiday Maker fallen in Level 1 oder Level 2. Die Einstufung hängt nicht davon ab, was der Arbeitgeber sagt; sie hängt von der tatsächlich erbrachten Arbeit ab.

## Welche Penalty Rates gelten?

Der Horticulture Award hat eingeschränktere Penalty Rates als der [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers), was die saisonale Natur der Arbeit widerspiegelt. Die wichtigsten Penaltyansprüche sind:

- **Casual Loading**: 25 % zusätzlich zum Basisstundenlohn
- **Feiertage**: ein höherer Satz gilt (oder der Tag frei ohne Lohnverlust für festangestellte Arbeitnehmer)
- **Überstunden**: über 38 Stunden pro Woche oder 304 Stunden pro 8-Wochenzyklus gelten Überstundensätze
- **Samstag und Sonntag**: in manchen Einstufungen gilt ein Wochenendaufschlag

Working Holiday Maker nehmen oft an, dass Farmarbeit überhaupt keine Penalty Rates hat, was sie dazu führt, Pauschalsätze zu akzeptieren, die gegen den Award verstoßen.

## Welche Zulagen gelten?

Der Award enthält Zulagen für:

- **Reise zwischen Arbeitsorten**: wenn nötig, sich während eines Arbeitstages zwischen Farmen zu bewegen
- **Werkzeugzulage**: wo der Arbeitgeber verlangt, dass der Arbeiter eigene Werkzeuge bereitstellt
- **Auswärtsunterbringungszulage**: in manchen Umständen
- **Schlechtwetterzulage**: wo die Arbeit bei starkem Regen fortgesetzt wird
- **Kühllagerzulage**: für Arbeit in gekühlten Bereichen

Diese werden zusätzlich zum Basissatz gezahlt. Sie werden routinemäßig in Farmlohnzetteln übersehen.

## Wie interagiert die 88-Tageregionalarbeitsanforderung?

Um sich für ein Zweitjahres-Working Holiday Visum zu qualifizieren, musst du 88 Tage "spezifizierter Arbeit" in einer regionalen Gegend absolvieren. Die meiste Farmarbeit zählt. Die wichtigsten Steuer- und Lohnregeln:

- Jeder Tag Farmarbeit zählt als ein "Tag", unabhängig davon, wie viele Stunden du gearbeitet hast
- Die Arbeit muss in Übereinstimmung mit dem Horticulture Award (oder einem anderen anwendbaren Award) bezahlt werden
- Freiwilligenarbeit zählt generell nicht für das zweite Visum (mit begrenzten Ausnahmen für Katastrophenhilfe)
- Die Arbeit muss ans ATO unter Single Touch Payroll gemeldet werden
- Deine Lohnzettel dienen als Einwanderungsbeleg

Falls du Farmarbeit gemacht hast, die unter dem Award bezahlt und ordentlich ans ATO gemeldet wurde, ist der Visabeleg automatisch. Falls die Arbeit Schwarzarbeit war oder nicht ordentlich gemeldet wurde, ist der Visabeleg viel schwieriger zu etablieren, und Home Affairs kann das zweite Visum ablehnen.

## Wie wirkt sich das auf deine Steuerposition aus?

Unterbezahlung gegen den Horticulture Award bedeutet:

- Ans ATO gemeldete Löhne sind niedriger als sie hätten sein sollen
- [Superbeiträge](/de/superannuation) werden auf die niedrigeren (falschen) Löhne berechnet
- Deine [DASP](/de/blog/what-is-dasp-super-withdrawal)-Zahlung ist kleiner als sie sein sollte

Wenn wir über unser Steueragentenportal einreichen, prüfen wir deine Lohnzettel gegen die Horticulture Award-Sätze und identifizieren Unterbezahlungen. Die Rückforderung der Unterbezahlung wird über Fair Work abgewickelt; die Steuer- und Superkonsequenzen werden über unseren Service abgewickelt.

## Wie unterstützt unser Service Farmarbeiter?

Für Working Holiday Maker in der Horticulture macht unser Team:

- Querverweis von Lohnzetteln gegen die Horticulture Award-Sätze für deine Einstufung
- Identifikation, ob Akkordeinkünfte die Mindeststundenlohn-Garantie erfüllten
- Abgleich der ATO-gemeldeten Einkünfte gegen das, was hätte gezahlt werden sollen
- Identifikation [unbezahlter Super](/de/blog/super-employer-not-paying-what-to-do) auf korrekt berechneten Löhnen
- Einreichung der [Steuererklärung](/de/tax-return) mit den korrekten Einkommenszahlen
- Identifikation aller arbeitsbezogenen Absetzungen, die spezifisch für Farmarbeit sind (Werkzeuge, Schutzausrüstung, Fahrzeugbetriebskosten für den Wechsel zwischen Farmen)

Farmarbeit ist, wo die größten Lücken zwischen gemeldeten und korrekten Löhnen typischerweise existieren. [Kontaktiere unser Team](/de/contact), bevor du Australien verlässt, um sicherzustellen, dass deine Farmeinkünfte korrekt verbucht wurden.
 
## Drei Checks vor jedem Akkord-Job

Nach der Reform des Horticulture Awards (MA000028) von 2022: (1) schriftliche Akkordvereinbarung ist Pflicht (mündlich ist unwirksam), (2) der Satz muss so gesetzt sein, dass ein durchschnittlich kompetenter Pflücker mindestens den Casual-Stundenlohn erreicht, (3) liegt dein effektiver Stundenlohn darunter, schuldet der Betrieb die Differenz. In der ersten Woche eigene Kilos und Stunden notieren und den Effektivlohn rechnen - [die Selbst-Auditanleitung](/de/blog/piece-rates-farm-work-working-holiday) zeigt wie.
`,
  },

  'restaurant-industry-award-working-holiday': {
    title: 'Was ist der Restaurant Industry Award und wie gilt er für Working Holiday Maker?',
    description: 'Der Restaurant Industry Award (MA000119) deckt Restaurants, Cafés und Bars ab. Mindestlöhne, Penalty Rates und Casual Loading für Working Holiday Maker erklärt.',
    body: `
Der Restaurant Industry Award 2020, bekannt als MA000119, ist der moderne Award, der Mindestlohnsätze, Einstufungen, Penalty Rates und Bedingungen für eigenständige Restaurants, Cafés und ähnliche Foodservice-Lokale in Australien festlegt. Der Award gilt für Working Holiday Maker, die als Kellner, Küchenhilfen, Baristas, Bartender, Vorgesetzte und Köche in Lokalen arbeiten, die nicht Teil eines Hotels oder einer Unterkunft sind. Die Lohnsätze und Penalty Rates unterscheiden sich vom [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers), und der Unterschied zählt am Ende der Woche.

Working Holiday Maker in Restaurants und Cafés werden oft gegen den falschen Award bezahlt oder gegen gar keinen Award. Den korrekten Award zu identifizieren ist der erste Schritt bei der Prüfung, ob du korrekt bezahlt wirst.

## Was deckt der Restaurant Industry Award ab?

Der Award deckt Arbeitgeber und Angestellte ab in:

- Eigenständigen Restaurants (nicht mit einem Hotel verbunden)
- Cafés, Coffee Shops und Brunch-Lokalen
- Teestuben
- Catering-Unternehmen
- Empfangszentren und Veranstaltungslokalen (nicht mit einem Hotel verbunden)
- Take-Away-Lebensmittel-Unternehmen (in manchen Fällen)

Der Award deckt **nicht** ab:

- Restaurants innerhalb von Hotels (gedeckt vom [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers))
- Fast-Food-Lokale (gedeckt vom Fast Food Industry Award)
- Mobile Lebensmittelwagen
- Arbeitsplätze, die von einem Tarifvertrag gedeckt sind, der den Award überschreibt

Wenn du unsicher bist, welcher Award gilt, siehe unseren Artikel zu [Award-Einstufungen](/de/blog/award-classifications-working-holiday-australia) für den detaillierten Test.

## Welche Einstufungen gelten?

Der Restaurant Industry Award hat sechs Hauptstufen:

- **Introductory**: erste drei Monate ohne relevante Erfahrung
- **Level 1 (Food and Beverage Attendant Grade 1)**: Tische decken, Tische abräumen, Gläser einsammeln
- **Level 2 (Food and Beverage Attendant Grade 2)**: Getränke ausschenken, Bestellungen aufnehmen, Essen servieren, einfache Kocharbeiten
- **Level 3 (Food and Beverage Supervisor / Cook Grade 1)**: Aufsicht kleiner Sektionen, einfache Kocharbeiten
- **Level 4 (Cook Grade 2)**: Kochen mit einer breiteren Palette von Techniken
- **Level 5 und 6**: Chef de Partie, Chefkoch, Restaurant Manager

Die meisten Working Holiday Maker in Front-of-House-Rollen fallen in Level 1 oder Level 2. Erfahrene Baristas werden typischerweise in Level 2 oder Level 3 eingestuft.

## Was sind die Mindestlohnsätze?

Die Lohnsätze sind im Award festgelegt und werden jeden 1. Juli aktualisiert. Die Struktur umfasst:

- Basisstundenlohn nach Einstufung
- Casual Loading von 25 % zusätzlich für Casualangestellte
- Penalty Rates für Wochenenden, Abende und Feiertage
- Zulagen für spezifische Arbeitsbedingungen

Ein Casual Level-2-Arbeiter erhält den Level-2-Basissatz plus das 25 %-Casual Loading als seinen Standardstundenlohn. Jede Arbeit außerhalb der regulären Stunden zieht zusätzliche Penalty Rates nach sich.

## Welche Penalty Rates gelten?

Die Restaurant Industry Award Penalty Rates für Casualangestellte umfassen:

- **Montag bis Freitag, 19 Uhr bis Mitternacht**: typischerweise ein kleiner Abendaufschlag
- **Samstag**: meistens 50 % Aufschlag (in manchen Einstufungen einschließlich des eingerollten 25 %-Casual Loadings)
- **Sonntag**: meistens 75 % Aufschlag
- **Feiertage**: meistens 150 % Aufschlag
- **Mitternacht bis 7 Uhr**: höherer Nachtaufschlag

Die genauen Prozentsätze und Startzeiten sind in der aktuellen Version des Awards festgelegt. Penalty Rates in Restaurants sind leicht anders als in Hotels, und der Unterschied kann auf einer Sonntags- oder Feiertagsschicht erheblich sein.

## Wie unterscheidet sich der Restaurant Industry Award vom Hospitality Award?

Die zwei Awards decken überlappende Arbeitsarten in verschiedenen Lokalsettings ab:

- Ein Kellner in einem Hotelrestaurant wird vom **Hospitality Award** abgedeckt
- Ein Kellner in einem eigenständigen Restaurant nebenan wird vom **Restaurant Industry Award** abgedeckt

Die Mindestlohnsätze, Penalty Rates, Einstufungsbeschreibungen und Zulagen unterscheiden sich zwischen den beiden Awards. Derselbe Job kann je nach Art des Lokals unterschiedlich bezahlt werden. Arbeitgeber wenden manchmal den falschen Award an, um Geld zu sparen, und der Unterschied addiert sich über ein Jahr Arbeit.

## Welche Zulagen gelten?

Der Award enthält Zulagen für:

- **Essenszulage**: bei Überstunden ohne Pause
- **Kleidungs- oder Uniformzulage**: falls der Arbeitgeber eine Uniform verlangt, sie aber nicht bereitstellt
- **Wäschezulage**: für das Waschen vom Arbeitgeber verlangter Uniformen
- **Erste-Hilfe-Kastenzulage**: für designierte Erste-Hilfe-Kastenbeamte
- **Werkzeuge und Ausrüstung**: falls du verpflichtet bist, eigene bereitzustellen (Messer zum Beispiel)

## Wie wirkt sich das auf deine Steuerposition aus?

Falls du gegen den falschen Award oder unter dem korrekten Award-Satz bezahlt wurdest, sind die Löhne, die du hättest erhalten sollen, höher als die ans ATO gemeldeten Löhne. Die Rückforderung der Unterbezahlung erhöht:

- Das steuerpflichtige Einkommen auf deiner [Steuererklärung](/de/tax-return)
- Die [Superbeiträge](/de/superannuation), die der Arbeitgeber hätte zahlen sollen
- Deine eventuelle DASP, wenn du Australien verlässt

Wenn wir über unser Steueragentenportal einreichen, prüfen wir deine Lohnzettel gegen die Restaurant Industry Award-Sätze für deine Einstufung.

## Wie unterstützt unser Service Restaurant- und Café-Arbeiter?

Für Working Holiday Maker in Restaurants und Cafés macht unser Team:

- Identifikation des korrekten Awards (Restaurant, Hospitality oder Fast Food)
- Querverweis von Lohnzetteln gegen die korrekte Award-Einstufung und den Satz
- Identifikation unterbezahlter Löhne, fehlender Penalty Rates und fehlender Zulagen
- Abgleich der ATO-gemeldeten Einkünfte gegen das, was hätte gezahlt werden sollen
- Verfolgung [unbezahlter Super](/de/blog/super-employer-not-paying-what-to-do) auf die korrekten Löhne
- Einreichung der [Steuererklärung](/de/tax-return) mit den korrekten Einkommenszahlen

Falsch angewandte Awards sind eines der konsistentesten Unterbezahlungsmuster in der Gastronomie. [Kontaktiere unser Team](/de/contact), um zu prüfen, ob du gegen den richtigen Award bezahlt wirst.
 
## Die Eigenheiten des Restaurant Awards

Cafes und Restaurants fallen oft unter MA000119, dessen Sätze und Klauseln sich vom Hospitality Award (MA000009) im Detail unterscheiden - welcher gilt, entscheidet der Betriebstyp, nicht deine Tätigkeit. Frag den Arbeitgeber, welcher Award gilt, und prüfe im Fair-Work-Pay-Guide. Typische Unterschiede zwischen beiden: Split-Shift-Zulagen, Mindesteinsatzzeiten und die Uhrzeitgrenzen der Nachtzuschläge.
`,
  },

  'award-classifications-working-holiday-australia': {
    title: 'Wie du herausfindest, welcher Modern Award für deinen Job in Australien gilt',
    description: 'Die meisten Working Holiday Maker sind durch einen Modern Award abgedeckt, der ihren Mindestlohn und ihre Bedingungen festlegt.',
    body: `
Ein Modern Award ist ein Rechtsdokument, das von der Fair Work Commission festgelegt wird und Mindestlohnsätze, Einstufungen, Penalty Rates, Zulagen und Bedingungen für eine Branche oder Beschäftigung in Australien etabliert. Fast jeder Working-Holiday-Maker-Job in Australien ist von einem Modern Award abgedeckt, und der Award legt die gesetzlichen Mindestansprüche fest, die unabhängig davon gelten, was der Anstellungsvertrag sagt. Den richtigen Award zu identifizieren ist der erste Schritt bei der Prüfung, ob du korrekt bezahlt wirst.

Es gibt über 120 Modern Awards, die verschiedene Branchen und Beschäftigungen abdecken. Welcher Award für deinen Job gilt, hängt von der Art des Unternehmens ab, für das du arbeitest, den Aufgaben, die du ausführst, und wo deine Arbeit innerhalb der Klassifizierungsstruktur des Awards passt.

## Wie werden Awards identifiziert?

Jeder Modern Award hat:

- Einen Namen (zum Beispiel "Hospitality Industry (General) Award 2020")
- Einen kurzen Referenzcode (MA000009 für Hospitality, MA000028 für Horticulture)
- Eine Abdeckungsklausel, die definiert, für wen der Award gilt
- Eine Klassifizierungsstruktur, die Lohnstufen innerhalb des Awards festlegt

Der Fair Work Ombudsman pflegt die öffentliche Liste der Awards und die Sätze, die unter jedem gelten.

## Der Drei-Schritte-Test zur Identifizierung deines Awards

Um herauszufinden, welcher Award gilt, arbeite drei Fragen durch:

1. **In welcher Branche ist mein Arbeitgeber tätig?** Ein Hotel ist in der Unterkunft/Gastronomiebranche. Ein eigenständiges Café ist in der Restaurantbranche. Eine Obstfarm ist in der Horticulture.
2. **Was ist der Hauptzweck meiner Arbeit?** Auch innerhalb derselben Branche können verschiedene Rollen unter verschiedene Awards fallen. Ein Rezeptionist in einem Hotel könnte vom Hospitality Award abgedeckt sein; ein Verwaltungsmitarbeiter in der zentralen Hotelverwaltung könnte vom Clerks Award abgedeckt sein.
3. **Welche Klassifizierung innerhalb des Awards entspricht meinen Aufgaben?** Jeder Award hat eine gestufte Klassifizierungsstruktur. Die richtige Klassifizierung hängt von der tatsächlich erbrachten Arbeit ab, nicht vom Jobtitel.

## Die häufigsten Awards für Working Holiday Maker

Die Awards, die für die meisten Working-Holiday-Maker-Jobs gelten, sind:

- **[Hospitality Industry (General) Award - MA000009](/de/blog/hospitality-award-working-holiday-makers)**: Hotels, Motels, Hostels, Bars in Hotels, Veranstaltungszentren, Caravan Parks
- **[Restaurant Industry Award - MA000119](/de/blog/restaurant-industry-award-working-holiday)**: eigenständige Restaurants, Cafés, Brunch-Lokale
- **Fast Food Industry Award - MA000003**: Fast-Food-Ketten, Take-Away-Lokale, Food Courts
- **[Horticulture Award - MA000028](/de/blog/horticulture-award-working-holiday-makers)**: Obstpflücken, Gemüseernte, Verpackung, Reben- und Baumarbeit
- **General Retail Industry Award - MA000004**: Einzelhandelsgeschäfte, Supermärkte, Kaufhäuser
- **Pastoral Award - MA000035**: Viehzucht, großflächiger Anbau, Schur
- **Cleaning Services Award - MA000022**: Vertragsreinigung, Hotelreinigung durch Personalvermittlung
- **Building and Construction General On-site Award - MA000020**: Bauhilfsarbeit, Handwerksassistenz
- **Aged Care Award - MA000018**: Hilfsarbeit in der stationären Altenpflege

Ein Working Holiday Maker, der drei verschiedene Jobs in einem Jahr macht, kann von drei verschiedenen Awards abgedeckt sein.

## Was, wenn mein Arbeitgeber sagt, dass kein Award gilt?

Das ist fast immer falsch. Grundsätzlich gilt ein Award, außer eine der folgenden Bedingungen trifft zu:

- Der Arbeitgeber ist von einem **Tarifvertrag** abgedeckt (eine arbeitsplatzspezifische Vereinbarung, die formal von der Fair Work Commission genehmigt wurde und den Award überschreibt)
- Du bist in einer **Senior-Management-Rolle** über der höchsten Klassifizierung im Award
- Du bist ein **unabhängiger Contractor** mit einem echten ABN-basierten Vertrag (siehe unseren Artikel zu [dem Unterschied zwischen Angestellten und Contractor](/de/blog/employee-vs-contractor-australia))

Falls keines davon zutrifft, gilt ein Award. Arbeitgeber, die darauf bestehen "wir folgen dem Award nicht", verstoßen fast immer gegen das Gesetz.

## Wie findest du deine Klassifizierung?

Jeder Award hat eine Klassifizierungsstruktur, die die Stufen innerhalb des Awards definiert. Die Klassifizierung hängt ab von:

- Dem für die Aufgaben erforderlichen Fähigkeitsniveau
- Dem Verantwortungsniveau
- Ob du andere beaufsichtigst
- Jahren der Erfahrung in der Branche (in manchen Awards)

Jobtitel bestimmen die Klassifizierung nicht. Ein Arbeiter, der "Manager" genannt wird, aber tatsächlich dieselben Aufgaben wie ein Level-2-Angestellter macht, wird auf Level 2 klassifiziert, nicht auf einer Managerstufe. Arbeitgeber können einen Jobtitel nicht nutzen, um dich in eine niedriger bezahlte Klassifizierung zu drücken, wenn deine tatsächliche Arbeit in eine höhere passt.

## Die Einsteiger-Level-Regel

Die meisten Awards haben ein Einsteiger-Level für Arbeiter in ihren ersten drei Monaten in der Branche. Nach drei Monaten musst du automatisch hochgestuft werden, außer es gibt einen echten Grund für weitere Schulung. Viele Working Holiday Maker werden während der gesamten Gültigkeitsdauer des Visums auf dem Einsteiger-Level gehalten, was in den meisten Fällen ein klarer Verstoß ist.

## Was ist mit dem Better Off Overall Test (BOOT)?

Falls dein Arbeitgeber einen Tarifvertrag hat, muss die Vereinbarung jeden Angestellten insgesamt besser stellen als unter dem relevanten Award. Wo ein Tarifvertrag gilt, übernimmt er meistens die Award-Struktur, fügt aber Extras hinzu wie höhere Grundbezahlung, zusätzlichen Urlaub oder verbesserte Penalty Rates. Ein Tarifvertrag, der Arbeiter schlechter stellt als der Award, ist nicht rechtlich durchsetzbar.

## Wie wirkt sich das auf deine Steuerposition aus?

Falls du falsch klassifiziert oder unter deiner korrekten Klassifizierung bezahlt wurdest, sind die Löhne, die du hättest erhalten sollen, höher als das, was ans ATO gemeldet wurde. Die Rückforderung der Unterbezahlung erhöht:

- Das steuerpflichtige Einkommen auf deiner [Steuererklärung](/de/tax-return)
- Die [Superbeiträge](/de/superannuation), die der Arbeitgeber hätte zahlen sollen
- Deine eventuelle DASP, wenn du Australien verlässt

## Wie unterstützt unser Service bei Award-Überprüfungen?

Für jeden Working Holiday Maker, der über unseren Service einreicht, führt unser Team folgendes durch:

- Identifikation des Modern Awards, der auf jeden Job gilt
- Abgleich der Lohnzettel mit der korrekten Award-Klassifizierung und dem Satz
- Identifikation unterbezahlter Löhne, fehlender Penalty Rates und fehlender Zulagen
- Abgleich der ATO-gemeldeten Einkünfte gegen das, was hätte gezahlt werden sollen
- Einreichung der [Steuererklärung](/de/tax-return) mit den korrekten Einkommenszahlen

Die Identifikation des Awards ist die Grundlage jedes Lohnrückforderungs-Prozesses. [Kontaktiere unser Team](/de/contact), falls du unsicher bist, welcher Award deine Arbeit abdeckt oder ob du korrekt bezahlt wurdest.
 
## Award und Level in fünf Minuten selbst bestimmen

So geht's: (1) das P.A.C.T.-Pay-Tool des Fair Work Ombudsman öffnen, (2) Branche und Tätigkeit wählen (Barista → Hospitality, Pflücken → Horticulture), (3) Level nach Erfahrung und Aufgaben wählen, (4) den angezeigten Casual-Satz mit deinem Payslip vergleichen. Fünf Minuten, Ergebnis als Screenshot sichern. "Alle kriegen hier diesen Lohn" ist keine Rechtsgrundlage - der Award-Satz ist eine.
`,
  },

  'understating-income-ato-penalty-working-holiday': {
    title: 'Welche ATO-Strafen gibt es, wenn du dein Einkommen in der Working-Holiday-Steuererklärung untererfasst?',
    description: 'Wenn das ATO feststellt, dass du Einkommen untererfasst hast, liegen die Verwaltungsstrafen zwischen 25 % und 75 % der vermiedenen Steuer.',
    body: `
Wenn das ATO feststellt, dass eine [Steuererklärung](/de/tax-return) Einkommen untererfasst oder Absetzungen überbeansprucht hat, gelten Verwaltungsstrafen auf den Steuerfehlbetrag. Der Strafrahmen beträgt 25 % bis 75 % des Fehlbetrags, abhängig vom Verschuldensgrad, mit einer zusätzlichen General Interest Charge, die täglich auf den unbezahlten Betrag akkumuliert. Working Holiday Maker sind ein Fokusbereich für ATO-Datenabgleich, weil ihre Anstellung kurzfristig ist, ihre Arbeitgeber oft in bargeld-intensiven Branchen sind und die Plattformen, durch die sie arbeiten (Uber, DoorDash, Airtasker), direkt ans ATO melden.

Die Kosten einer absichtlichen Untererfassung können leicht die ursprüngliche Steuerersparnis um ein Mehrfaches überschreiten.

## Woher weiß das ATO dein echtes Einkommen?

Seit Single Touch Payroll universal wurde, bekommt das ATO einen direkten Feed von:

- Jeder Lohnzahlung von jedem Arbeitgeber
- Einbehaltener Steuer aus jedem Lohnlauf
- Superbeiträge gezahlt (und nicht gezahlt) an jeden Fonds

Für ABN-basierte Arbeit bekommt das ATO auch:

- Zahlungen von Gig-Economy-Plattformen (Uber, DoorDash, Airtasker, Menulog) unter dem Sharing Economy Reporting Regime
- Zahlungen von Contractingkunden über 10.000 $ in vielen Branchen (steuerpflichtige Zahlungsberichterstattung)
- Bankkontozinsen von deiner australischen Bank
- Kapitalgewinnaufzeichnungen von Aktienplattformen und Kryptobörsen

Bis du deine Steuererklärung einreichst, weiß das ATO schon das meiste von dem, was du verdient hast. Zu versuchen, Einkommen wegzulassen, ist deshalb fast sofort für das ATO sichtbar.

## Was sind die Strafsätze?

Die Verwaltungsstrafe auf einen Steuerfehlbetrag wird als Prozentsatz der zusätzlichen Steuer festgelegt, die zahlbar gewesen wäre, wenn die Steuererklärung korrekt gewesen wäre:

- **Versäumnis angemessener Sorgfalt**: 25 % des Fehlbetrags
- **Leichtfertigkeit**: 50 % des Fehlbetrags
- **Absichtliche Missachtung**: 75 % des Fehlbetrags

Die Kategorie hängt davon ab, wie das ATO die Ursache des Fehlbetrags sieht:

- "Versäumnis angemessener Sorgfalt" ist die niedrigste Stufe, gilt wo ein sorgfältiger Steuerpflichtiger es richtig hingekriegt hätte (Arbeitgeber vergessen, Absetzungen ohne Aufzeichnungen beanspruchen)
- "Leichtfertigkeit" gilt, wo der Steuerpflichtige eine Entscheidung getroffen hat im Wissen, dass es ein erhebliches Risiko gab, falsch zu liegen
- "Absichtliche Missachtung" gilt, wo der Steuerpflichtige absichtlich Einkommen weggelassen oder Absetzungen erfunden hat

Für Working Holiday Maker ist die häufigste Strafe der 25 %-"Versäumnis angemessener Sorgfalt"-Satz, angewendet weil der Arbeiter vergessen hat oder keinen Zugriff auf vollständige Beschäftigungsaufzeichnungen hatte.

## Was ist die General Interest Charge?

Zusätzlich zur Verwaltungsstrafe erhebt das ATO die General Interest Charge (GIC) auf die unbezahlte Steuer ab dem ursprünglichen Fälligkeitsdatum, bis der korrigierte Betrag gezahlt ist. Der GIC-Satz wird vierteljährlich festgelegt und zinst täglich. Er liegt derzeit deutlich über dem Leitzins.

Ein Steuerfehlbetrag von 2.000 $, der zwei Jahre nach Einreichung der ursprünglichen Steuererklärung identifiziert wird, mit der 25 %-Strafe, führt zu:

- Ursprünglicher Fehlbetrag: 2.000 $
- Verwaltungsstrafe: 500 $ (25 % des Fehlbetrags)
- General Interest Charge für zwei Jahre: etwa 400 $ (täglich gezinst)
- Insgesamt zahlbar: etwa 2.900 $

Für absichtliche Auslassungen mit der 75 %-Strafe können die Gesamtkosten mehr als das Doppelte des ursprünglichen Fehlbetrags betragen.

## Was löst eine ATO-Überprüfung aus?

Das ATO nutzt Datenabgleich, um Diskrepanzen automatisch zu identifizieren. Die häufigsten Auslöser für Working Holiday Makerüberprüfungen sind:

- Gemeldetes Einkommen in der Steuererklärung ist niedriger als die Single-Touch-Payroll-Aufzeichnung
- Eine Plattform (Uber, DoorDash, Airtasker) hat Einkommen gemeldet, das nicht in der Steuererklärung war
- Eine beanspruchte Absetzung liegt weit außerhalb des Durchschnitts für Branche und Einkommensniveau
- Ein Arbeitgeber hat Einkommen gemeldet, das überhaupt nicht in der Steuererklärung erscheint
- Das Bankkonto, wo die Rückzahlung gezahlt wird, stimmt nicht mit den Aufzeichnungen des Steuerpflichtigen überein

Die meisten Diskrepanzen werden automatisch innerhalb von Wochen nach Einreichung markiert.

## Was passiert, wenn du nicht zahlen kannst?

Wenn du Australien verlassen hast und den korrigierten Betrag nicht sofort zahlen kannst, kann das ATO:

- Eine Sperre auf zukünftige Rückzahlungen setzen (einschließlich der DASP-Zahlung des nächsten Jahres, falls relevant)
- Die Schuld gegen jede [DASP-Zahlung](/de/blog/what-is-dasp-super-withdrawal) anwenden, die du machst
- Die Schuld an internationales Inkasso überweisen
- Einen Marker auf deiner Aufzeichnung platzieren, der zukünftige australische Visaanträge beeinflussen kann

ATO-Schulden verschwinden nicht, wenn du das Land verlässt. Die General Interest Charge läuft weiter auf dem unbezahlten Betrag.

## Wie vermeidest du eine Fehlbetragsstrafe?

Die zuverlässigen Wege, eine Fehlbetragsstrafe zu vermeiden:

- Schließe jeden Arbeitgeber für jeden im Steuerjahr gearbeiteten Job ein (egal wie kurz)
- Schließe alles ABN-Einkommen ein, einschließlich Gig-Economy-Plattformen
- Beanspruche nur Absetzungen, die direkt mit dem Erzielen von Einkommen verbunden sind, mit Aufzeichnungen zu jeder
- Reiche über einen registrierten Steueragenten ein, der direkten Zugriff auf die ATO-Einkommensaufzeichnung hat
- Warte, bis alle Arbeitgebersingle Touch Payrollberichte abgeschlossen sind, bevor du einreichst

## Wie behandelt unser Service ATO-Compliancerisiko?

Wenn du über unseren Service einreichst:

- Wir greifen über unser Steueragentenportal auf die volle ATO-Einkommensaufzeichnung zu, bevor wir die Steuererklärung vorbereiten
- Wir gleichen das gemeldete Einkommen jedes Arbeitgebers mit allen Lohnzetteln ab, die du lieferst
- Wir gleichen Gig-Economy-Plattformeinkommen mit dem Sharing Economyberichtsfeed ab
- Wir prüfen jede beanspruchte Absetzung gegen Branchennormen und Belegungsanforderungen
- Wir reichen erst ein, nachdem alle Berichte abgeschlossen sind, um die Notwendigkeit von Änderungen zu vermeiden

Die Verteidigbarkeit der Steuererklärung zählt genauso wie der Rückzahlungsbetrag. Eine größere Rückzahlung, die eine 25 %-Strafe und zwei Jahre Zinsen auslöst, ist weniger wert als eine kleinere Rückzahlung, die jeder Überprüfung standhält. [Kontaktiere unser Team](/de/contact), um eine Steuererklärung einzureichen, die dir das richtige Ergebnis ohne Compliancerisiko gibt.

## Eine Sicherheitsnotiz

Working Holiday Maker werden von Steuerbetrugsmaschen ins Visier genommen, die aufgeblähte Rückzahlungen versprechen im Austausch für das Teilen von TFN- und Reisepassdaten. Diese Maschen blähen typischerweise Absetzungen auf oder lassen Einkommen weg, um eine größere anfängliche Rückzahlung zu erzeugen, wobei der Betrüger einen Anteil nimmt. Wenn das ATO später die Diskrepanz identifiziert, bleibt der Arbeiter mit der Strafe und der General Interest Charge zurück, während der Betrüger verschwunden ist. Teile niemals deine TFN, Reisepass oder Logindaten mit jemandem, der kein registrierter Steueragent im Tax-Practitioners-Board-Register ist.
 
## Zu wenig deklariert: die Strafstufen und der Ausweg

Die ATO matcht jeden Arbeitgeber, jede Bank, jede Plattform - fehlende Einkommen fallen maschinell auf. Die Strafstufen richten sich nach Verschulden: Sorgfaltsmangel (25 % des Fehlbetrags), Leichtfertigkeit (50 %), Vorsatz (75 %) - plus Zinsen. Der Ausweg heißt Voluntary Disclosure: Wer sich selbst meldet, bevor die Prüfung beginnt, drückt die Strafe drastisch, oft Richtung null bei kleinen Beträgen. Praktisch für Backpacker: Der vergessene Zweitjob oder das Plattform-Einkommen ist über eine [Korrektur der Erklärung](/de/blog/amending-tax-return-australia) schnell geheilt - je früher, desto billiger.
`,
  },

  '1000-dollar-instant-deduction-rule-2026': {
    title: 'Die neue 1.000-$-Sofortabschreibungsregel ab 1. Juli 2026 für Working Holiday Maker',
    description: 'Ab 1. Juli 2026 können Working Holiday Maker eine Sofortabschreibung von 1.000 $ für arbeitsbezogene Ausgaben ohne Belege geltend machen.',
    body: `
Ab dem 1. Juli 2026 gilt eine neue 1.000 $-Sofortabschreibungsregel für alle australischen Steuerzahler, einschließlich Working Holiday Maker. Nach dieser Regel kann eine Person eine pauschale 1.000 $-Absetzung für arbeitsbezogene Ausgaben in ihrer [Steuererklärung](/de/tax-return) beanspruchen, ohne jede einzelne Ausgabe mit Belegen zu unterlegen. Die Regel gilt ab dem Steuerjahr 2026-27 und ersetzt mehrere bestehende vereinfachte Absetzungsmethoden. Sie gilt nicht rückwirkend für 2025-26 oder frühere Erklärungen.

Für Working Holiday Maker vereinfacht die Regel den Antragsprozess für routinemäßige Arbeitsausgaben, beseitigt aber nicht die Notwendigkeit, Aufzeichnungen für Ansprüche zu führen, die über 1.000 $ gehen.

## Wie funktioniert die Regel?

Ab dem 1. Juli 2026 kannst du beanspruchen:

- Eine pauschale 1.000 $-Absetzung für arbeitsbezogene Ausgaben ohne Belege, ODER
- Die tatsächlichen Kosten arbeitsbezogener Ausgaben mit vollen Belegen und Aufzeichnungen (keine Obergrenze, nur die tatsächlichen Kosten)

Du wählst, was ein besseres Ergebnis auf deiner Erklärung liefert. Falls deine echten Arbeitsausgaben weniger als 1.000 $ ausmachen, gibt dir die pauschale 1.000 $-Absetzung das bessere Ergebnis. Falls deine echten Arbeitsausgaben mehr als 1.000 $ ausmachen, beanspruchst du die tatsächlichen Kosten mit voller Substanziierung.

## Was deckt die 1.000 $ ab?

Die pauschalen 1.000 $ decken dieselben Kategorien arbeitsbezogener Ausgaben ab, die sonst unter den Substanziierungsregeln beansprucht würden:

- Werkzeuge und Ausrüstung unter 300 $ (siehe unseren Artikel zur [300 $-Sofortabschreibungsregel](/de/blog/tools-equipment-under-300-instant-deduction-whv))
- Schutzkleidung und Uniformen
- Wäsche von Uniformen
- Arbeitsbezogene Handy- und Internetnutzung
- Arbeitsbezogene Fahrzeugnutzung (unter der Cent-pro-Kilometer-Methode)
- Weiterbildung mit direktem Bezug zu deiner aktuellen Arbeit
- Gewerkschaftsbeiträge, Registrierungen und Lizenzen
- Andere arbeitsbezogene Ausgaben

Sie deckt keine nicht arbeitsbezogenen Abzüge ab wie Spenden, Anlageausgaben oder spezifische berufsbezogene Ansprüche, die eigene Regeln haben.

## Wann startet die Regel?

Die 1.000 $-Sofortabschreibung gilt ab dem 1. Juli 2026. Das bedeutet:

- Die 2025-26-Steuererklärung (Mitte 2026 eingereicht) nutzt die **alten Regeln** bei der für alle Ansprüche Belege erforderlich sind
- Die 2026-27-Steuererklärung (Mitte 2027 eingereicht) ist die **erste Erklärung**, für die die 1.000 $-Sofortabschreibungsregel gilt
- Erklärungen für frühere Jahre (2024-25 und früher) können die neue Regel nicht nutzen

Für Working Holiday Maker wird die Regel am relevantesten sein für diejenigen, die während des Steuerjahrs 2026-27 noch in Australien sind, oder diejenigen, die während 2026-27 in Australien gearbeitet haben und eine Erklärung aus dem Ausland danach einreichen.

## Wann ist die pauschale 1.000 $-Absetzung die bessere Option?

Die pauschale 1.000 $ ist die bessere Option, wenn:

- Deine tatsächlichen Arbeitsausgaben für das Jahr weniger als 1.000 $ ausmachen
- Du Belege für manche deiner Ausgaben verloren oder nicht aufbewahrt hast
- Deine Ausgaben über viele kleine Käufe verteilt sind, die schwer zu substanziieren sind
- Du eine einfachere Erklärung ohne den Aufwand, alle Belege zusammenzutragen möchtest

Für die meisten Working Holiday Maker in Routinerollen (Gastronomieservice, Einzelhandel, Café-Arbeit) wird die pauschale 1.000 $ wahrscheinlich entweder gleich oder größer als die tatsächlichen Ausgaben sein, sodass sie die natürliche Wahl wird.

## Wann sind tatsächliche Kosten die bessere Option?

Die tatsächliche Kostenmethode (mit vollen Belegen) ist besser, wenn:

- Deine arbeitsbezogenen Ausgaben wahrscheinlich 1.000 $ überschreiten
- Du in einer werkzeuglastigen Branche arbeitest (Bauwesen, Farmarbeit mit eigener Ausrüstung, Mechaniker)
- Du ein Fahrzeug umfangreich für die Arbeit nutzt und die Logbuchmethode bevorzugen würdest
- Du während des Jahres einen großen arbeitsbezogenen Kauf gemacht hast

Ein Bauarbeiter mit 2.500 $ an Arbeitsschuhen, Werkzeugen und Schutzausrüstung in einem Jahr würde die 2.500 $ mit voller Substanziierung beanspruchen, nicht die pauschale 1.000 $. Ein Ridesharefahrer mit 5.000 $ an Fahrzeug- und Handyausgaben würde dasselbe machen.

## Kannst du die beiden Methoden mischen?

Nein. Du nimmst entweder die pauschale 1.000 $ für das Jahr, oder du substanziierst jede arbeitsbezogene Ausgabe vollständig. Du kannst nicht die pauschale 1.000 $ plus zusätzliche substanziierte Ausgaben oben drauf nehmen.

Das ist die wichtigste Unterscheidung: die Regel ist "alles oder nichts" für die arbeitsbezogene Ausgabenkategorie. Falls du 1.200 $ an arbeitsbezogenen Ausgaben hast und die pauschale 1.000 $ nimmst, gibst du die zusätzlichen 200 $ auf. Falls du substanziierst, beanspruchst du die vollen 1.200 $.

## Was passiert mit den alten vereinfachten Methoden?

Die neue 1.000 $-Regel ersetzt mehrere bestehende vereinfachte Methoden, die enger im Umfang waren. Die Cent-pro-Kilometer-Methode für Fahrzeugabsetzungen und die Festsatzmethode für Homeoffice-Abzüge gelten weiter, aber sie werden in die pauschale 1.000 $ absorbiert, falls du diesen Weg wählst.

## Wie interagiert das mit den Substanziierungsregeln?

Die pauschale 1.000 $ entfernt die Substanziierungsanforderung für den Pauschalbetrag. Falls du die pauschale 1.000 $ beanspruchst, brauchst du keine Belege, Logbücher oder detaillierten Aufzeichnungen. Du gibst einfach 1.000 $ in der Zeile für arbeitsbezogene Ausgaben an.

Falls du tatsächliche Kosten beanspruchst, muss jede Absetzung weiterhin nach den bestehenden Regeln substanziiert werden:

- Belege für individuelle Ausgaben
- Logbuch für Fahrzeugnutzung über der Cent-pro-Kilometer-Schwelle
- Aufzeichnungen für die anteilige Handy- und Internetnutzung
- Belege für Weiterbildungsausgaben

## Wie beeinflusst die Regel speziell Working Holiday Maker?

Die 1.000 $-Regel ist neutral zum Visastatus. Sie gilt für Working Holiday Maker genauso, wie sie für australische Residenten gilt. Die pauschale 1.000 $ reduziert dein zu versteuerndes Einkommen, was beim 15 %-Working-Holiday-Maker-Satz einer Steuerersparnis von 150 $ entspricht. Für Arbeiter in der 30 %-Klasse (über 45.000 $) entspricht das einer Steuerersparnis von 300 $.

Für Working Holiday Maker, die unter 45.000 $ verdienen, bringt die pauschale 1.000 $ etwa 150 bis 200 $ an Rückerstattung.

## Wie kümmert sich unser Service um die neue Regel?

Für Erklärungen ab dem Steuerjahr 2026-27 erledigt unser Team folgendes:

- Wir prüfen deine Arbeitsausgaben, um zu bestimmen, ob die pauschale 1.000 $ oder tatsächliche Kosten ein besseres Ergebnis liefern
- Wir berechnen beide Optionen und wenden den größeren Abzug an
- Wo tatsächliche Kosten höher sind, belegen wir jeden Anspruch nach den ATO-Substanziierungsregeln
- Wir identifizieren alle Ausgaben, die nicht in die Kategorie arbeitsbezogen fallen und separat behandelt werden müssen

Für die meisten Working Holiday Maker in routinemäßigen Tätigkeiten ist die pauschale 1.000 $ die einfachere und gleichwertige (oder vorteilhaftere) Wahl. Bei Tätigkeiten im Handwerk, in der Farmarbeit oder mit hoher Fahrzeugnutzung bleibt der Abzug der tatsächlichen Kosten meist die größere Position. [Kontaktiere unser Team](/de/contact), um sicherzustellen, dass die richtige Methode auf deine Situation angewendet wird.
 
## Die neue 1.000-$-Regel, praktisch genutzt

Seit 1. Juli 2026 springt die Grenze des Sofortabzugs für Arbeitsgegenstände von 300 auf 1.000 $ - Laptops, Werkzeugsets und teurere Schutzausrüstung rutschen in den Ein-Schritt-Abzug. Backpacker-Beispiele: der E-Bike-Akku fürs Liefern, Werkzeug für den Bau, rutschfeste Schuhe plus Uniform fürs Cafe, der gebrauchte Laptop für Remote-Arbeit. Bedingungen wie immer: direkter Arbeitsbezug, selbst bezahlt, Beleg vorhanden. Käufe vor dem 30. Juni 2026 bleiben unter der alten 300-$-Regel - das Kaufdatum bestimmt die Regel.
`,
  },

  'bicycle-motorcycle-vehicle-deductions-working-holiday': {
    title: 'Absetzungen für Fahrräder, Motorräder und andere Fahrzeuge für Working Holiday Maker',
    description: 'Auch Fahrräder, Motorräder, Roller und Vans qualifizieren für Fahrzeugabsetzungen. Was du als Working Holiday Maker absetzen kannst und wie du es dokumentierst.',
    body: `
Die ATO-Regeln für die Abzüge bei Fahrzeugausgaben gelten für eine breitere Palette von Fahrzeugen, als den meisten Working Holiday Makern bewusst ist. Fahrräder, die für Essenslieferung genutzt werden, Motorräder, die für Rideshare oder berufliche Fahrten genutzt werden, und andere Fahrzeuge können alle zu legitimen Absetzungen führen, wo das Fahrzeug genutzt wird, um Einkommen zu erzielen. Die Methoden zur Berechnung der Absetzung unterscheiden sich zwischen Autos (mit zwei spezifischen Methoden) und anderen Fahrzeugen (mit breiteren Regeln zu den tatsächlichen Kosten), aber das zugrundeliegende Prinzip ist dasselbe: Kosten, die mit der Einkommenserzielung zusammenhängen, sind gegen dieses Einkommen absetzbar.

Working Holiday Maker in Lieferarbeit, Rideshare und Handwerken, die andere Fahrzeuge als Autos nutzen, übersehen routinemäßig Fahrzeugabzüge, weil sie annehmen, dass nur Autos qualifizieren. Das ist falsch - andere Fahrzeuge qualifizieren ebenfalls.

## Welche Fahrzeuge können zu Absetzungen führen?

Die Hauptkategorien sind:

- **Autos** (vom ATO als Motorfahrzeuge definiert, die für weniger als 9 Personen und weniger als 1 Tonne Ladung ausgelegt sind): zwei vereinfachte Methoden gelten (Cent-pro-Kilometer und Logbuch)
- **Motorräder** und Scooter: tatsächliche Kostenmethode gilt, mit anteiligem Anspruch für die berufliche Nutzung
- **Fahrräder** (einschließlich E-Bikes): Betriebskosten und Kapitalkosten können für Arbeitsnutzung beansprucht werden
- **Nutzfahrzeuge** über 1 Tonne Ladekapazität: tatsächliche Kostenmethode gilt
- **Lieferwagen und LKW**: tatsächliche Kostenmethode gilt

Die Absetzungsmethode hängt von der Fahrzeugklassifizierung ab.

## Fahrräder für Essenslieferung

Ein Fahrrad, das für Essenslieferung (Uber Eats, DoorDash, Menulog, Deliveroo) genutzt wird, ist ein Wirtschaftsgut zur Einkommenserzielung. Absetzbare Kosten umfassen:

- Die Kosten des Fahrrads, als Abschreibung über seine effektive Lebensdauer beansprucht (typischerweise 3 bis 5 Jahre)
- Reparaturen und Wartung (Reifen, Ketten, Bremsbeläge, Services)
- Radfahrausrüstung, die für die Arbeit genutzt wird (Helm, Lichter, Schloss, Satteltaschen)
- Versicherung, die speziell das Fahrrad abdeckt
- Anmeldung, falls anwendbar (selten für Fahrräder)
- Ein Anteil der Betriebskosten (Reinigungsmittel, Ersatzteile)

Für ein E-Bike gelten dieselben Kosten plus Strom zum Laden, der zu einer angemessenen Schätzung des arbeitsbezogenen Anteils beansprucht werden kann.

Falls das Fahrrad sowohl für Lieferarbeit als auch persönlichen Transport genutzt wird, ist die Absetzung auf den arbeitsbezogenen Prozentsatz begrenzt. Ein Fahrrad, das zu 80 % für Lieferung und zu 20 % für persönliches Pendeln genutzt wird, würde eine 80 %-Absetzung über alle oben genannten Kosten geben.

## Motorräder für Rideshare und Arbeitsreisen

Ein Motorrad, das für Rideshare (wo die Plattform es erlaubt) oder für Arbeitsreisen zwischen Jobstandorten genutzt wird, wird ähnlich wie ein Fahrrad behandelt:

- Kaufkosten als Abschreibung über die effektive Lebensdauer beansprucht
- Treibstoff und Öl
- Anmeldung und CTP-Versicherung (der berufliche Anteil)
- Vollkaskoversicherung (der berufliche Anteil)
- Wartung und Reparaturen
- Reifen
- Fahrausrüstung, die speziell für die Arbeit benötigt wird (Jacke, Handschuhe, Helm)
- Mautgebühren und Parken während der Arbeit

Die Absetzung wird auf tatsächliche Kostenbasis berechnet, mit Aufteilung für die berufliche Nutzung. Es gibt keine vereinfachte Cent-pro-Kilometer-Methode für Motorräder, wie sie für Autos existiert.

## Autos: die zwei vereinfachten Methoden

Für Autos (unter 1 Tonne Ladekapazität, weniger als 9 Passagiere) liefert das ATO zwei vereinfachte Methoden:

1. **Cent-pro-Kilometer-Methode**: ein Pauschalsatz pro arbeitsbezogenem Kilometer, bis zu 5.000 km pro Auto pro Jahr. Keine detaillierten Aufzeichnungen individueller Kosten erforderlich, aber eine vernünftige Basis für die Kilometerschätzung muss aufbewahrt werden (ein paar Wochen repräsentativer Aufzeichnungen sind meistens ausreichend).

2. **Logbuchmethode**: ein 12-wöchiges Logbuch erfasst den Arbeitsnutzungsprozentsatz. Dieser Prozentsatz wird dann auf tatsächliche Kosten (Treibstoff, Services, Anmeldung, Versicherung, Abschreibung) für das Jahr angewendet. Das Logbuch ist 5 Jahre lang gültig und muss danach erneuert werden.

Die Cent-pro-Kilometer-Methode ist einfacher, aber bei 5.000 km gedeckelt. Für Ridesharefahrer und Personen mit hoher Fahrzeugnutzung gibt die Logbuchmethode meistens eine größere Absetzung. Siehe unseren Artikel zu [Fahrzeugausgaben und Logbüchern](/de/blog/vehicle-logbook-abn-working-holiday) für den detaillierten Vergleich.

## Was ist mit Utes und Pritschenwagen?

Nutzfahrzeuge mit einer Ladekapazität von mehr als 1 Tonne (schwerere Arbeits-Utes) sind nicht als "Autos" für ATO-Zwecke klassifiziert. Sie werden nach den Regeln der tatsächlichen Kosten behandelt:

- Tatsächliche Treibstoffkosten
- Tatsächliche Wartung und Anmeldung
- Tatsächliche Versicherung
- Tatsächliche Abschreibung

Die Cent-pro-Kilometer-Methode gilt nicht für schwere Utes. Working Holiday Maker im Bauwesen, in der Farmarbeit oder in Handwerken, die einen schweren Ute nutzen, sollten tatsächliche Kosten verfolgen.

## Was ist mit Autos, die nicht deine sind?

Ein Auto, das von einem Freund geliehen oder gelegentlich für Arbeit gemietet wird, wird unter verschiedenen Regeln behandelt. Falls du für die Nutzung zahlst (Mietgebühren, Treibstoffbeiträge), können diese Zahlungen zum arbeitsbezogenen Prozentsatz beansprucht werden. Falls die Nutzung wirklich kostenlos ist, entsteht kein Abzug.

Für ein Auto, das du mit einem Partner oder Familienmitglied besitzt, ist die Absetzung auf deinen Anteil der tatsächlich gezahlten Kosten verfügbar.

## Welche Aufzeichnungen brauchst du?

Die Aufzeichnungen hängen von der Methode ab:

**Cent-pro-Kilometer-Methode**:
- Eine vernünftige Schätzung arbeitsbezogener Kilometer für das Jahr
- Einige unterstützende Belege für die Basis der Schätzung (ein paar Wochen repräsentativer Kilometer zum Beispiel)
- Maximal 5.000 km pro Auto pro Jahr

**Logbuchmethode (Autos)**:
- Ein 12-wöchiges Logbuch, das eine repräsentative Periode abdeckt
- Alle Belege für Treibstoff, Services, Anmeldung, Versicherung für das Jahr
- Aufzeichnungen der Abschreibung
- Der Arbeitsnutzungsprozentsatz angewendet auf gesamte tatsächliche Kosten

**Tatsächliche Kostenmethode (Motorräder, Fahrräder, schwere Fahrzeuge)**:
- Aufzeichnungen jeder beanspruchten Kosten (Belege oder Kontoauszüge)
- Eine nachvollziehbare Grundlage für den Arbeitsnutzungsprozentsatz (Tagebuch, Zeitplan der beruflichen Fahrten)
- Abschreibungsaufzeichnungen für das Fahrzeug

## Was sind die häufigen Absetzungen, die Working Holiday Maker übersehen?

Die am häufigsten übersehenen Fahrzeugabsetzungen sind:

- Abschreibung des Fahrrads bei Lieferradfahrern
- E-Bike-Batterie- und Ladekosten
- Motorrad-Fahrausrüstung, die für die Arbeit benötigt wird
- Mautgebühren während Arbeitsfahrten (die sich erheblich in Sydney, Melbourne, Brisbane summieren)
- Parkgebühren während Arbeitsaktivitäten
- Reinigungskosten für das Fahrzeug bei Ridesharefahrern

Jede davon ist eine legitime Absetzung mit den richtigen Aufzeichnungen.

## Wie passt das mit der 1.000 $-Sofortabschreibungsregel ab 2026-27?

Ab dem 1. Juli 2026 gilt die neue 1.000 $-Sofortabschreibungsregel. Falls deine gesamten arbeitsbezogenen Ausgaben (einschließlich Fahrzeugkosten) für das Jahr unter 1.000 $ sind, kann die pauschale 1.000 $ die bessere Option sein. Falls deine Fahrzeugausgaben allein 1.000 $ überschreiten, nutzt du weiterhin die belegten tatsächlichen Kosten oder die Logbuchmethode, um den vollen Betrag zu beanspruchen. Siehe unseren Artikel zur [1.000 $-Sofortabschreibungsregel](/de/blog/1000-dollar-instant-deduction-rule-2026) als Übersicht.

## Wie kümmert sich unser Service um Fahrzeugabsetzungen?

Wenn wir eine [Steuererklärung](/de/tax-return) über unseren Service einreichen, führt unser Team folgendes durch:

- Wir identifizieren jedes Fahrzeug, das während des Jahres zur Einkommenserzielung genutzt wurde
- Wir wenden die korrekte Methode (Cent-pro-Kilometer, Logbuch oder tatsächliche Kosten) für jedes Fahrzeug an
- Wir berechnen die Abschreibung auf Fahrrädern, Motorrädern und anderen Wirtschaftsgütern
- Wir belegen jeden Anspruch gemäß den ATO-Substanziierungsregeln
- Wir vergleichen das Ergebnis mit der pauschalen 1.000-$-Sofortabschreibung (ab 2026-27) und wenden die für dich bessere Methode an

Für Working Holiday Maker in Lieferung, Rideshare, Handwerken und jeder anderen fahrzeugintensiven Rolle ist die Fahrzeugabsetzung oft der größte einzelne Anspruch auf der Erklärung. [Kontaktiere unser Team](/de/contact), um sicherzustellen, dass alle legitimen Fahrzeugkosten erfasst werden.
 `,
  },

  'dasp-vs-leaving-super-in-australia-pros-cons': {
    title: 'Solltest du DASP beantragen oder deine Super in Australien lassen?',
    description: 'Working Holiday Maker, die Australien verlassen, müssen entscheiden: DASP mit 65 % Steuer beantragen oder Super im Fonds belassen?',
    body: `
Ein Working Holiday Maker, der Australien verlässt, kann entweder seine [Super](/de/superannuation) als Departing Australia Superannuation Payment (DASP) zum 65 %-Working-Holiday-Maker-Steuersatz beantragen - oder die Super im Fonds lassen und sie zu einem späteren Zeitpunkt beantragen. Die Wahl hat erhebliche finanzielle Folgen. Für die meisten Working Holiday Maker, die nicht planen, nach Australien zurückzukehren, ist DASP die bessere Option - aber der Vergleich hängt von Kontogebühren, erwarteten Anlagerenditen, dem Zeithorizont und der Chance einer zukünftigen Rückkehr nach Australien ab.

Diese Entscheidung gehört zu den finanziell folgenreichsten Wahlen, die ein Working Holiday Maker trifft - und der Standard für die meisten Arbeiter sollte sein, DASP zu beantragen, statt das Geld zurückzulassen.

## Was ist der grundlegende Vergleich?

Wenn du 5.000 $ Super in einem australischen Fonds hast, wenn du Australien verlässt:

**Option A: DASP jetzt beantragen**
- 65 % Steuer auf die steuerpflichtige Komponente
- Nettozahlung: etwa 1.750 $ (angenommen das gesamte Guthaben ist steuerpflichtige Komponente, was typisch ist)
- Zahlung landet innerhalb von 28 Tagen nach Antrag auf deinem Auslandskonto

**Option B: Super im Fonds lassen**
- Konto läuft weiter Anlagerenditen (positiv oder negativ)
- Konto wird mit laufenden Gebühren belastet (Verwaltung und Versicherungsprämien)
- Geld ist aus dem Ausland unzugänglich, außer DASP wird später beantragt
- Bei Nichtbeantragung überweist der Fonds das Guthaben irgendwann an das ATO als nicht beantragte Beträge
- Der 65 %-DASP-Steuersatz gilt weiterhin, wenn das Geld irgendwann abgehoben wird

Der 65 %-Steuersatz **folgt dir** - unabhängig davon, wann du beantragst. Warten reduziert die Steuer nicht. Siehe unseren Artikel zu [warum DASP mit 65 % besteuert wird](/de/blog/dasp-tax-rate-65-percent-explained) für die Details.

## Was passiert mit Super, die im Fonds bleibt?

Wenn du Australien verlässt, ohne DASP zu beantragen, verschwindet deine Super nicht, aber sie schrumpft. Die Kräfte gegen das Guthaben:

- **Verwaltungsgebühren**: typischerweise 50 bis 130 $ pro Jahr unabhängig vom Guthaben
- **Versicherungsprämien**: automatisch abgezogen, außer du kündigst die Abdeckung (oft 300 bis 800 $ pro Jahr)
- **Vermögensbasierte Gebühren**: 0,5 % bis 1,5 % des Guthabens pro Jahr
- **Keine neuen Beiträge**: das Guthaben wächst nicht aus Beiträgen, während du im Ausland bist

Bei einem kleinen Guthaben (unter 5.000 $) können die kombinierten Gebühren das Guthaben innerhalb weniger Jahre aufzehren - besonders wenn Versicherungsprämien weiter abgezogen werden.

Die Kräfte zugunsten des Guthabens:

- **Anlagerenditen**: wenn die Anlagen des Fonds gut laufen, wächst das Guthaben
- **Langer Zeithorizont**: über viele Jahre kann Zinseszins die Gebühren bei größeren Guthaben übertreffen

Für die meisten Working Holiday Makerguthaben (typischerweise 2.000 bis 10.000 $) übersteigt die Gebührenlast mittelfristig meistens die realistische Anlagerendite.

## Der ATO-Pfad für nicht beantragte Super

Wenn du die Super im Fonds lässt, ohne Beiträge oder Kontakt über eine definierte Zeit, überweist der Fonds das Guthaben ans ATO als "nicht beantragte Superbeträge". Das ATO hält das Guthaben unbegrenzt, aber:

- Keine Anlagerenditen, während es beim ATO gehalten wird
- Keine Gebühren abgezogen (das Guthaben verbleibt einfach)
- Zinsen zu einem Satz, der grob mit der Inflation übereinstimmt (niedrige einstellige Prozente)
- Weiterhin der 65 %-DASP-Steuer unterworfen, wenn schließlich beantragt

Geld beim ATO ist vor Gebühren sicherer als Geld beim Fonds, aber das Fehlen von Anlagerenditen führt dazu, dass der reale (inflationsbereinigte) Wert mit der Zeit sinkt.

Siehe unseren Artikel zu [was mit nicht beantragter Super passiert](/de/blog/what-happens-to-unclaimed-super) für die Details.

## Wann macht es Sinn, die Super zu lassen?

Der Fall für das Belassen der Super ist am stärksten, wenn:

- Du wahrscheinlich innerhalb weniger Jahre mit einem anderen Visum nach Australien zurückkehrst
- Das Guthaben groß genug ist, dass die Gebühren ein kleiner Prozentsatz sind
- Der Fonds konsistent gute Anlagerenditen hat
- Versicherungsprämien gekündigt wurden (damit das Guthaben nicht durch ungewollte Abdeckung erodiert)
- Du erwartest, dass der 65 %-DASP-Steuersatz unverändert bleibt (er ist durch Gesetz festgelegt und könnte sich in beide Richtungen ändern)

In der Praxis treffen sehr wenige dieser Bedingungen auf den typischen Working Holiday Maker zu.

## Wann macht es Sinn, DASP zu beantragen?

Der Fall für DASP ist am stärksten, wenn:

- Du nicht planst, in absehbarer Zeit nach Australien zurückzukehren
- Das Guthaben klein ist (unter 10.000 $), wo Gebühren es erodieren würden
- Du Gewissheit über das Ergebnis willst (kein Risiko von Gebühren- oder Regeländerungen)
- Du das Geld jetzt produktiv nutzen kannst (Schuldentilgung, Sparen, Investition in deinem Heimatland)
- Du deine australische Finanzposition sauber abschließen willst

Der 65 %-Steuersatz ist hoch, aber 35 % von etwas ist mehr als 100 % von nichts. Working Holiday Maker, die ihre Super nie beantragen, machen am Ende eine unbeabsichtigte Spende an die australische Regierung.

## Kannst du die Entscheidung später rückgängig machen?

Sobald du DASP beantragst, ist die Entscheidung für dieses Geld endgültig. Du kannst die Mittel nicht wieder auf ein Superkonto einzahlen, falls du später nach Australien zurückkehrst. Neue Superbeiträge auf einem zweiten Visum begründen ein neues Konto.

Wenn du die Super im Fonds lässt und später beantragen willst, kann unser Team DASP aus dem Ausland zu jedem Zeitpunkt nach Ablauf deines Visums einreichen. Der 65 %-Steuersatz gilt unabhängig vom Antragszeitpunkt.

## Was, wenn du auf einem neuen Visum nach Australien zurückkommst?

Ein Working Holiday Maker, der mit einem neuen Visum nach Australien zurückkehrt (Working Holiday Jahr 2, Studentenvisum, Skilled Visa, Partnervisum), kann:

- Das bestehende Superkonto weiter nutzen, wenn es noch aktiv ist
- Neue Arbeitgeberbeiträge auf dieses Konto bekommen
- DASP irgendwann beantragen, wenn er zum letzten Mal abreist

Kritisch: Der 65 %-WHM-DASP-Satz **folgt dem Arbeiter** bei jeder während einer WHV-Periode angesammelten Super, auch wenn spätere Beiträge unter einem anderen Visum gemacht wurden. Das ist eines der am häufigsten missverstandenen Merkmale von DASP und überrascht viele zurückkehrende Reisende.

## Was ist der praktische Entscheidungsrahmen?

Für die meisten Working Holiday Maker, die Australien ohne Rückkehrpläne verlassen:

1. Stelle sicher, dass alle Superbeiträge von allen Arbeitgebern in identifizierbaren Fonds liegen (siehe unseren Artikel zu [Super in mehreren Fonds](/de/blog/super-multiple-funds-consolidation))
2. Kündige unnötige Versicherungspolicen auf den Konten, um Gebührenerosion zu stoppen
3. Beantrage DASP innerhalb von 12 Monaten nach Abreise, während Bank- und Kontaktdaten noch aktuell sind
4. Lasse dir die Nettozahlung auf dein Auslandsbankkonto auszahlen

Für Working Holiday Maker, die innerhalb von 2 bis 3 Jahren zurückkehren wollen:

1. Konsolidiere Super in einem einzigen Fonds mit niedrigen Gebühren
2. Kündige unnötige Versicherungen
3. Halte Kontakt- und Bankdaten aktuell
4. Bewerte zum Zeitpunkt der nächsten Abreise erneut

## Wie kümmert sich unser Service um die DASP-Entscheidung?

Wenn du unser Team für DASP beauftragst, gehen wir folgendermaßen vor:

- Wir identifizieren jeden Superfonds mit deinen Beiträgen
- Wir berechnen das Bruttoguthaben und die erwartete Nettozahlung nach 65 %-Steuer
- Wir prüfen die Gebührenstruktur jedes Fonds und deren Auswirkung auf zurückgehaltene Guthaben
- Wir kündigen unnötige Versicherungen, um Gebührenerosion zu stoppen, falls du dich für ein Warten entscheidest
- Wir reichen den DASP-Antrag über das offizielle ATO-System ein, sobald du dich für die Beantragung entschieden hast
- Wir verfolgen die Zahlung auf dein Auslandsbankkonto

Die Entscheidung, DASP zu beantragen oder zu warten, liegt bei dir - aber das finanzielle Bild sollte klar sein, bevor du sie triffst. [Kontaktiere unser Team](/de/contact), um genau zu verstehen, wie deine Superposition aussieht und welches Ergebnis jede Option bringen würde.
 
## Die Entscheidung nach Szenario

- **Nie zurück, kleines Guthaben (unter 5.000 $)**: beanspruchen - Gebühren erodieren kleine Guthaben schnell, und 35 Cent pro Dollar schlagen das langsame Ausbluten Richtung null
- **Vielleicht zurück auf anderem temporären Visum**: trotzdem meist beanspruchen; neue Arbeit baut neue Super, und das alte Guthaben zahlt derweil nur Fondsgebühren
- **Permanent Residency im Blick**: der eine echte Fall fürs Liegenlassen - als Resident konvertiert das Guthaben zu normaler Super mit weit besserer Besteuerung
- **Vor Jahren abgereist und vergessen**: das Geld ist längst bei der ATO - [ATO-verwahrte Super beanspruchen](/de/blog/what-happens-to-unclaimed-super); dort haben keine Gebühren daran genagt
`,
  },

  'fruit-picking-jobs-working-holiday-australia': {
    title: 'Obstpflückerjobs in Australien: was du mit einem Working Holiday Visum erwarten kannst',
    description: 'Obstpflücken ist der häufigste Weg zu den 88 Tagen Regionalarbeit für ein zweites Visum. Wo finden, was verdienen und wie du dich vor Wage Theft schützt.',
    body: `
Obstpflücken ist die häufigste Form von Regionalarbeit, die von Working Holiday Makern in Australien erbracht wird, und der Standardweg zu den 88 Tagen spezifizierter Arbeit, die für ein Zweitjahresvisum benötigt werden. Pflücker ernten saisonales Obst (Mangos, Bananen, Zitrusfrüchte, Steinobst, Beeren, Äpfel, Trauben) über das regionale Australien, oft arbeitend für Personalvermittlungsunternehmen oder direkt für Farmen. Die Arbeit wird vom [Horticulture Award](/de/blog/horticulture-award-working-holiday-makers) abgedeckt, der Mindeststundenlohnsätze und Schutzmaßnahmen festlegt, die auch dann gelten, wenn der Arbeiter auf Akkordbasis bezahlt wird.

Obstpflücken ist auch einer der am meisten unterbezahlten Bereiche australischer Arbeit, mit dem Fair Work Ombudsman, der wiederholt systemische Unterbezahlung in nationalen Kampagnen identifiziert hat. Zu verstehen, was du bezahlt bekommen solltest, ist der erste Schritt, nicht einer der Unterbezahlten zu sein.

## Was zahlt Obstpflücken?

Bezahlung für Obstpflücken kommt in zwei Hauptformen:

- **Stundenlohn**: ein Stundenlohn zum oder über dem Horticulture Award-Minimum (etwa 25 $ bis 32 $ pro Stunde für Casual-Arbeiter abhängig vom Jahr und der Einstufung)
- **Akkordlohn**: bezahlt pro Bin, Eimer, Tablett oder Kilogramm gepflückt

Der wichtigste Schutz im Horticulture Award ist die **Mindeststundenlohn-Garantie**. Auch wo du auf Akkordlohnbasis bezahlt wirst, müssen deine Einkünfte für jeden gearbeiteten Tag mindestens dem Äquivalent des Mindeststundenlohns mal den gearbeiteten Stunden entsprechen. Falls Akkordlohn-Sätze nicht reichen, ist der Arbeitgeber gesetzlich verpflichtet, auf den Mindeststundenlohn aufzustocken.

In der Praxis gehört diese Aufstockung zu den am häufigsten verletzten Regeln in der australischen Landwirtschaft. Siehe unseren Artikel zu [Akkordlohn in der Farmarbeit](/de/blog/piece-rates-farm-work-working-holiday) für die Details, wie der Schutz funktionieren soll.

## Was sind die wichtigsten Ernteregionen und Saisons?

Verschiedene Früchte reifen zu verschiedenen Zeiten in verschiedenen Regionen:

- **Mangos**: Northern Territory, Nordqueensland (September bis Januar)
- **Bananen**: Queensland ganzjährig (Höhepunkt Dezember bis Mai)
- **Erdbeeren**: Queensland (April bis Oktober), Victoria, Tasmanien
- **Äpfel**: Tasmanien, Victoria, NSW, Western Australia (Februar bis Mai)
- **Zitrusfrüchte**: NSW (Riverina), Victoria (Sunraysia), South Australia (Mai bis Oktober)
- **Steinobst**: Victoria, NSW, South Australia (November bis März)
- **Weintrauben**: South Australia, Victoria, NSW (Januar bis April)
- **Avocados**: Queensland (März bis Oktober), Western Australia
- **Beeren**: Tasmanien, Victoria, Queensland (variiert je Beerentyp)

Der saisonale Kalender treibt einen ständigen Fluss von Pflückern zwischen Regionen. Der Ernte ganzjährig zu folgen ist möglich und der Weg, auf dem viele Working Holiday Maker ihre 88 Tage schnell absolvieren.

## Was ist für die 88 Tage erforderlich?

Um für ein Zweitjahresvisum zu zählen, muss die Arbeit sein:

- In einer designierten regionalen Postleitzahl erbracht
- Bezahlte Arbeit (die meiste Freiwilligenarbeit zählt nicht mehr, mit begrenzten Ausnahmen)
- In einer berechtigten Branche (Pflanzen- und Tierzucht, einschließlich Obstpflücken)
- Dokumentiert durch Lohnzettel, Arbeitgeberbriefe und ATO-Aufzeichnungen

Die 88 Tage werden nach Kalendertagen gearbeitet gezählt, nicht nach Stunden. Ein voller Tag oder ein Teiltag zählen jeweils als ein Tag, solange die Arbeit bezahlt war und der Tag ein normaler Arbeitstag war.

## Bist du Angestellter oder Contractor?

Das ist eine der folgenreichsten Fragen im Obstpflücken. Die meisten Obstpflücker sollten als Angestellte klassifiziert werden, mit TFN-Einbehaltung, Superbeiträgen und den Horticulture Award-Sätzen, die gelten. Manche Farmen klassifizieren Pflücker als Contractor mit einer ABN, was:

- Die Arbeitgeberpflicht zur Superzahlung entfernt
- Die Mindeststundenlohn-Garantie in der Form, in der sie auf Angestellte gilt, entfernt
- Die Steuerpflicht zum Pflücker verschiebt
- Workers Compensationabdeckung in vielen Fällen entfernt

Die Klassifizierung hängt von den Fakten der Arbeit ab, nicht von dem, was der Vertrag sagt. Falls die Farm kontrolliert, wann, wo und wie du arbeitest, die Werkzeuge und Ausrüstung liefert, und du keinen Ersatz schicken kannst, bist du höchstwahrscheinlich ein Angestellter, auch wenn der Papierkram Contractor sagt. Siehe unseren Artikel zu [Angestellter vs. Contractor](/de/blog/employee-vs-contractor-australia) für den Test.

## Welche Aufzeichnungen solltest du führen?

Für sowohl Steuer- als auch Einwanderungszwecke führe:

- Jeden Lohnzettel von jeder Farm oder Personalvermittlungsfirma
- Kontoauszüge, die zeigen, dass Löhne gezahlt wurden
- Ein einfaches Tagebuch von Tagen, die gearbeitet wurden (Datum, Farmname, Stunden)
- Fotos von dir am Arbeitsort (hilfreiche Belege für das Visum)
- Belege für eventuelle arbeitsbezogene Ausgaben (Stiefel, Handschuhe, Sonnenschutz, Werkzeuge)

Diese Aufzeichnungen unterstützen sowohl den 88-Tagevisaantrag als auch die [Steuererklärung](/de/tax-return) am Ende des Steuerjahres.

## Welche Absetzungen können Obstpflücker beanspruchen?

Working Holiday Maker im Obstpflücken können typischerweise beanspruchen:

- Sonnenschutz (Hüte, Sonnencreme, langärmlige Shirts)
- Arbeitsschuhe und Schutzfußwerk
- Handschuhe
- Pflückausrüstung, falls vom Arbeiter bereitgestellt (selten, aber möglich)
- Ein Anteil der Fahrzeugbetriebskosten, falls während eines Arbeitstages zwischen Farmen bewegt
- Handykosten für den arbeitsbezogenen Prozentsatz
- Unterkunftskosten in bestimmten "weg-von-zu-Hause"-Umständen

Siehe unseren Artikel zu [Steuerabsetzungen für Working Holiday Maker](/de/blog/tax-deductions-working-holiday-makers) für das Rahmenwerk.

## Was sind die Risiken unethischer Farmen und Personalvermittlungen?

Fair-Work-Untersuchungen haben wiederholt befunden, dass manche Farmen und Personalvermittlungsunternehmen in der australischen Landwirtschaft systematisch Working Holiday Maker unterbezahlen. Häufige Muster umfassen:

- Bezahlung unter der Mindeststundenlohn-Garantie auf Akkordlöhnen
- Berechnung hoher Gebühren für geteilte Unterkunft (was manchmal als Lohnabzug illegal ist)
- Einbehaltung von Löhnen anhängig auf den Abschluss der 88 Tage, dann Streiten um die Zählung
- Verweigerung, Lohnzettel bereitzustellen
- Meldung nur eines Teils der Löhne ans ATO
- Nutzung von ABN-Klassifizierungen, um [Super](/de/superannuation) und Workers Compensation zu vermeiden

Eine Farm oder Personalvermittlungsfirma mit einer Bilanz fairer Behandlung zu wählen zählt genauso wie der Lohnsatz auf Papier.

## Wie unterstützt unser Service Obstpflücker?

Für Working Holiday Maker, die Obstpflücken machen, macht unser Team:

- Prüfung der Lohnzettel gegen die Horticulture Award-Sätze und die Mindeststundenlohn-Garantie
- Identifikation von Lohnunterbezahlungen und fehlenden Superbeiträgen
- Querverweis der ans ATO gemeldeten Tage gegen deine Visabelege
- Verfolgung [unbezahlter Super](/de/blog/super-employer-not-paying-what-to-do), wo Beiträge fehlen
- Einreichung der [Steuererklärung](/de/tax-return), die jeden Arbeitgeber korrekt erfasst
- Koordinierung des DASP-Timings, falls du Australien nach Abschluss deiner Arbeit verlässt

Obstpflücken erzeugt mehr Lohn- und Superstreitigkeiten als fast jede andere Branche in Australien. [Kontaktiere unser Team](/de/contact), bevor du Australien verlässt, um sicherzustellen, dass deine Einkünfte korrekt verbucht wurden.
 
## Realitätscheck Pflücker-Lohn: Stundenlohn vs. Akkord

Seit der Award-Änderung 2022 müssen Akkordvereinbarungen garantieren, dass ein durchschnittlich kompetenter Pflücker mindestens den Casual-Stundenmindestlohn erreicht - die "8 $ pro Eimer, im Schnitt 40 $ am Tag"-Farmen sind schlicht rechtswidrig. Vor der Zusage: fragen, ob Stunden- oder Akkordlohn, Akkordvereinbarungen schriftlich geben lassen, und die erste Woche eigene Kilos und Stunden mitschreiben. Liegt dein effektiver Stundenlohn unter dem Award-Casual-Minimum, schuldet dir die Farm die Differenz - [die Rückholung über den FWO ist kostenlos](/de/blog/wage-theft-working-holiday-australia). Die Erntesaisons wandern etwa November bis April von Nord nach Süd; die 88-Tage-Rechnung geht nur auf, wenn die Lohnrechnung stimmt.
`,
  },

  'farm-hand-jobs-working-holiday-australia': {
    title: 'Farmhelferjobs in Australien: Lohn, Bedingungen und Berechtigung für das zweite Visum',
    description: 'Farmhelferarbeit umfasst eine breite Palette landwirtschaftlicher Rollen jenseits des Obstpflückens - Viehpflege, Pflanzen, Zäunen.',
    body: `
"Farm Hand" ist der allgemeine Begriff in Australien für Arbeiter, die eine breite Palette landwirtschaftlicher Aufgaben erbringen: Viehpflege, Pflanzen, Ernten von Pflanzen außer Obst, Zäunen, Maschinenbetrieb, allgemeine Instandhaltung des Geländes und Arbeit über die Farm. Die Arbeit wird sowohl auf Horticulturefarmen (abgedeckt vom [Horticulture Award](/de/blog/horticulture-award-working-holiday-makers)) als auch auf Pastoralfarmen (abgedeckt vom Pastoral Award) erbracht, mit verschiedenen Lohnsätzen und Bedingungen je nach Art der Arbeit.

Farm-Hand-Rollen sind einer der Hauptwege zu den 88 Tagen spezifizierter Arbeit, die für ein Zweitjahres-Working Holiday Visum nötig sind, aber die Regeln darum, was zu den 88 Tagen zählt, welcher Award gilt und welcher Lohn dir zusteht, sind anders als beim Obstpflücken.

## Was umfasst Farm-Hand-Arbeit?

Die typische Farm-Hand-Rolle kann umfassen:

- Viehpflege (füttern, drenchen (entwurmen), mustern, kalben)
- Pflanzen, Jäten und Ernten von Pflanzen (Pflanzen außer Obst)
- Zäunen, Torreparatur, Wassertrogwartung
- Traktor- und Maschinenbetrieb
- Allgemeine Anwesenwartung
- Tierhaltung
- Unterstützungsarbeit im Schurschuppen
- Heumachen und -lagerung
- Milcharbeit

Die genauen Aufgaben hängen von der Art der Farm ab: eine Cattle Station im Northern Territory, eine Weizenfarm in Western Australia, eine Milchfarm in Victoria und eine Schafstation in South Australia brauchen alle Farm Hands, aber die Arbeit sieht auf jeder anders aus.

## Welcher Award gilt?

Der Award hängt von der Hauptaktivität der Farm ab:

- **Pastoral Award (MA000035)**: Vieh, großflächiger Anbau (Weizen, Gerste, Hafer), Schur
- **[Horticulture Award (MA000028)](/de/blog/horticulture-award-working-holiday-makers)**: Obst, Gemüse, Reben, Baumpflanzen
- **Dairy Award (MA000026)**: Milchfarmen

Ein Arbeiter auf einer Mischfarm (Vieh und Pflanzen zum Beispiel) wird generell vom Award abgedeckt, der zur Hauptaktivität des Unternehmens passt. Siehe unseren Artikel zu [Award-Einstufungen](/de/blog/award-classifications-working-holiday-australia), wie der richtige identifiziert wird.

## Was zahlt Farm-Hand-Arbeit?

Der Lohn variiert je Award, Einstufung und Erfahrung:

- Casual-Sätze unter dem Pastoral Award sind etwa 26 $ bis 34 $ pro Stunde, je nach Einstufung und Jahr
- Casual-Sätze unter dem Horticulture Award sind etwa 25 $ bis 32 $ pro Stunde, je nach Einstufung und Jahr
- Festanstellungs- oder Live-in-Arrangements umfassen oft Unterkunft als Teil des Pakets (was steuerliche Auswirkungen haben kann)
- Überstunden-, Wochenend- und Feiertagssätze gelten

Lohnsätze ändern sich jeden 1. Juli mit der Annual Wage Review. Der Fair Work Pay Calculator liefert aktuelle Sätze für jeden Award.

## Zählt Farm-Hand-Arbeit zu den 88 Tagen?

Die meiste Farm-Hand-Arbeit zählt zu den 88 Tagen für ein Zweitjahres-Working Holiday Visum, vorausgesetzt:

- Die Arbeit wird in einer designierten regionalen Postleitzahl erbracht
- Die Arbeit fällt in die berechtigten "spezifizierte Arbeit"-Kategorien (Pflanzen- und Tierzucht, einschließlich Vieh und großflächiger Anbau)
- Die Arbeit ist bezahlt
- Die Arbeit ist mit Lohnzetteln dokumentiert und ans ATO gemeldet

Manche farmbezogenen Aktivitäten zählen **nicht**, einschließlich Büroarbeit für ein landwirtschaftliches Unternehmen, Einzelhandelsarbeit beim Verkauf von Farmprodukten und die meisten nicht-physischen Rollen.

## Was ist mit Live-in- und Unterkunftsarrangements?

Viele Farm-Hand-Rollen umfassen Unterkunft. Das ist üblich auf Cattle Stations, Schafstationen und abgelegenen Anwesen. Die steuerliche Auswirkungen umfassen:

- Der Wert bereitgestellter Unterkunft kann als Fringe Benefit betrachtet werden
- Manche Unterkunft wird "als Teil des Jobs" ohne Steuerfolge bereitgestellt
- Wo der Arbeiter Miete zahlt (vom Lohn abgezogen), muss der Abzug rechtmäßig und ordentlich dokumentiert sein
- Living-away-from-home-Zulagen können in manchen Umständen gelten

Die Regeln sind komplex und hängen vom spezifischen Arrangement ab. Unser Team prüft Unterkunftsarrangements als Teil der Vorbereitung von [Steuererklärungen](/de/tax-return) für Farm-Hand-Arbeiter.

## Was ist mit Workers Compensation auf abgelegenen Farmen?

Workers Compensation deckt Farm Hands genauso ab wie jeden Angestellten. Jeder Bundesstaat und jedes Territorium hat eine verpflichtende Workers Compensationregelung. Cattle Stations und abgelegene Anwesen haben überdurchschnittliche Verletzungsraten, und jede Verletzung während bezahlter Arbeit ist von der Regelung abgedeckt, unabhängig von der Entfernung zu Stadtzentren. Siehe unseren Artikel zu [Arbeitsverletzungsrechten](/de/blog/workplace-injury-working-holiday-rights) für das Rahmenwerk.

Falls du als Contractor mit einer ABN statt als Angestellter klassifiziert bist, ist die Workers Compensationabdeckung komplexer und gilt eventuell nicht automatisch. Die Klassifizierung hängt von den Fakten ab, nicht vom Vertrag. Siehe unseren Artikel zu [Angestellter vs. Contractor](/de/blog/employee-vs-contractor-australia).

## Welche Absetzungen können Farm Hands beanspruchen?

Working Holiday Maker in Farm-Hand-Rollen können typischerweise beanspruchen:

- Arbeitsstiefel und Schutzschuhe (Stahlkappen, wasserdicht)
- Arbeitskleidung (Hi-Vis, Schutzausrüstung, Sonnenschutz)
- Hut, Sonnenbrille, Sonnencreme
- Handschuhe
- Vom Arbeiter bereitgestellte Werkzeuge (kleine Handwerkzeuge, Messer)
- Ein Anteil der Fahrzeugbetriebskosten für Bewegung zwischen Arbeitsstandorten
- Handy für arbeitsbezogene Kommunikation

Siehe unseren Artikel zu [Steuerabsetzungen für Working Holiday Maker](/de/blog/tax-deductions-working-holiday-makers) für das Rahmenwerk, und die neue [1.000 $-Sofortabschreibungsregel ab 2026-27](/de/blog/1000-dollar-instant-deduction-rule-2026), wie diese gelten könnte.

## Wie unterstützt unser Service Farm Hands?

Für Working Holiday Maker in Farm-Hand-Rollen macht unser Team:

- Identifikation des korrekten Awards (Pastoral, Horticulture oder Dairy)
- Querverweis von Lohnzetteln gegen die korrekte Einstufung und den Satz
- Prüfung von Unterkunfts- und Live-in-Arrangements auf steuerliche Auswirkungen
- Identifikation [unbezahlter Super](/de/blog/super-employer-not-paying-what-to-do), wo Beiträge fehlen
- Einreichung der [Steuererklärung](/de/tax-return), die jeden Arbeitgeber korrekt erfasst
- Koordinierung der Dokumentation für Zweitjahresvisaanträge

[Kontaktiere unser Team](/de/contact), bevor du Australien verlässt, um sicherzustellen, dass deine Farm Handeinkünfte und Visadokumentation korrekt verarbeitet werden.
 
## Kost-und-Logis-Abzüge: die Outback-Lohnfalle

Farm-Jobs mit Unterkunft und Verpflegung müssen rechtmäßig abziehen: schriftlich vereinbart, zu angemessenen dokumentierten Sätzen - nicht "28 $ die Stunde, aber 300 $ pro Woche für den Donga behalten wir ein". Rechne vor der Zusage netto: Lohn minus genannte Abzüge, geteilt durch echte Wochenstunden. Vergleiche mit Stadtjob plus Hostel; remote gewinnt manchmal, manchmal scheint es nur so. Und hebe jeden Payslip auf - abgelegene Regionen sind der Ort, wo [88-Tage-Visa-Nachweise](/de/blog/farm-work-rights-working-holiday-australia) strittig werden, und Payslips sind der Beweis, der zählt.
`,
  },

  'bartender-jobs-working-holiday-australia': {
    title: 'Bartenderjobs in Australien mit Working Holiday Visum: RSA, Lohn und Trinkgeld',
    description: 'Bartending ist eine der zugänglichsten Hospitality-Rollen für Working Holiday Maker. RSA-Pflicht, Lohnsätze, Trinkgeld-Regelung und Casual Loading erklärt.',
    body: `
Bartending ist eine der beliebtesten Gastronomie-Rollen für Working Holiday Maker in Australien. Die Arbeit ist breit verfügbar in Städten, Regionalzentren und Touristenzielen, und sie zahlt typischerweise besser als Einstiegsküchen- oder Servicearbeit wegen der Penalty Rates, die auf Abend- und Wochenendschichten gelten. Ein Responsible Service of Alcohol (RSA)-Zertifikat ist erforderlich, bevor du Alkohol in Australien servieren kannst, und die Lohnsätze werden vom [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers) für Bars in Hotels oder vom [Restaurant Industry Award](/de/blog/restaurant-industry-award-working-holiday) für Bars in eigenständigen Restaurants festgelegt.

Bartender-Einkünfte variieren erheblich basierend darauf, ob Penalty Rates korrekt gezahlt werden und ob das Lokal Trinkgelder weitergibt. Beide Bereiche sind Quellen konsistenter Unterbezahlung.

## Was umfasst die Arbeit?

Bartender-Rollen umfassen typischerweise:

- Bier, Wein, Cocktails und Spirituosen servieren
- Kasse bedienen und Kartenzahlungen verarbeiten
- Drinks nach Standardrezepten zubereiten
- Bar, Gläser und Ausrüstung reinigen
- Bar aus Kühlräumen und Lagerräumen nachfüllen
- ID-Prüfung zur Altersverifizierung
- Betrunkenen Gästen den Service verweigern (eine gesetzliche Anforderung)

Die Rolle überschneidet sich mit "Food and Beverage Attendant"-Einstufungen in den relevanten Awards, und die Einstufungsstufe hängt davon ab, ob du eine RSA hast und ob du zusätzliche Verantwortungen übernimmst.

## Was ist ein RSA und wie bekommst du eines?

Ein Responsible Service of Alcohol (RSA)-Zertifikat ist eine gesetzliche Anforderung, um Alkohol in Australien zu servieren. Der Kurs deckt ab:

- Australische Alkoholgesetze und deine Verantwortlichkeiten als Servierer
- Erkennen betrunkener Gäste
- Service sicher und korrekt verweigern
- Altersverifizierung
- Schadensbegrenzung

Der Kurs wird von akkreditierten Anbietern durchgeführt und dauert 4 bis 6 Stunden online oder persönlich, und kostet typischerweise zwischen 25 $ und 80 $. Jeder Bundesstaat und jedes Territorium hat sein eigenes RSA, - NSW, Victoria, Queensland und andere Bundesstaaten stellen jeweils separate Zertifikate aus. Falls du in mehreren Bundesstaaten arbeitest, brauchst du eventuell separate RSAs für jeden. Manche Bundesstaaten akzeptieren RSAs aus anderen Bundesstaaten nach einem Auffrischungskurs; andere verlangen, dass du den Kurs neu absolvierst.

Siehe unseren Artikel zu [RSA-Zertifikatsanforderungen](/de/blog/rsa-certificate-australia-working-holiday) für die detaillierten Regeln der einzelnen Bundesstaaten.

## Was zahlt Bartending?

Der Lohn hängt vom Award, der Einstufung und dem Schichtzeiten ab:

- Casual-Basisstundenlohn für einen Level-2-Gastronomiearbeiter (Bar Attendant mit RSA): typischerweise 30 $ bis 35 $ pro Stunde
- Samstagaufschlag: typischerweise 25 % bis 50 % zusätzlich
- Sonntagaufschlag: typischerweise 50 % bis 75 % zusätzlich
- Feiertagsaufschlag: typischerweise 125 % bis 150 % zusätzlich
- Abendaufschlag (nach 19 Uhr): zusätzlicher Prozentsatz in vielen Awards
- Nachtaufschlag (Mitternacht bis 7 Uhr): höherer Satz

Ein Casual-Bartender, der eine Freitag- und Samstagabendschicht arbeitet, kann erheblich mehr pro Stunde verdienen als jemand, der nur tagsüber an Wochentagen arbeitet. Viele Working Holiday Maker wissen nicht, wie viel höher ihre Wochenendstunden bezahlt werden sollten.

## Solltest du Level 1 oder Level 2 sein?

Der [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers) klassifiziert einen Bar Attendant mit RSA typischerweise als Level 2 ("Food and Beverage Attendant Grade 2"). Ein Arbeiter ohne RSA, der nur Gläser trägt, Tische abräumt oder nachfüllt, kann Level 1 sein. Sobald du eine RSA hast und tatsächlich Alkohol servierst, sollte der Level-2-Satz gelten.

Arbeitgeber halten Arbeiter manchmal auf Level 1, auch nachdem sie angefangen haben, Alkohol zu servieren. Das ist ein Verstoß bei der Einstufung, und die Unterbezahlung kann zurückgeholt werden.

## Was ist mit Trinkgeld?

Trinkgeld in Australien ist viel weniger verbreitet als in Ländern wie den USA, weil die Basislöhne höher sind. Trinkgelder, die Kunden hinterlassen, sind nicht Teil des gesetzlichen Lohns; sie sind freiwillige Zusatzzahlungen. Die Rechtsregeln sind:

- Trinkgelder sind steuerpflichtiges Einkommen und müssen in deiner Steuererklärung angegeben werden
- Trinkgelder, die der Mitarbeiter direkt behält, sind ebenfalls steuerpflichtig
- Vom Arbeitgeber gepoolte und verteilte Trinkgelder sind steuerpflichtig
- Trinkgelder zählen nicht zur Einhaltung des Mindestlohns (der Arbeitgeber muss Award-Sätze unabhängig von Trinkgeldern zahlen)

Siehe unseren Artikel zu [Steuer auf Trinkgeld](/de/blog/do-working-holiday-makers-pay-tax-on-tips) für die Details.

## Was sind die häufigen Unterbezahlungsmuster im Bartending?

Der Fair Work Ombudsman hat konsistente Unterbezahlungsmuster in australischen Bars identifiziert:

- Zahlung eines pauschalen Stundenlohns, der angeblich "alles abdeckt", ohne Penalty Rates
- Erfahrene Bartender werden auf Level 1 eingestuft
- Verweigerung, den Feiertagsaufschlag zu zahlen
- Barzahlung ohne Lohnzettel und ohne [Super](/de/superannuation)
- Berechnung von Uniform, Bruchschäden oder Kassenmanko an den Mitarbeiter (in der Regel illegal - siehe [Uniform- und Wäscheabzüge](/de/blog/uniform-laundry-deductions-illegal-australia))
- Unbezahlte Setup- und Reinigungszeit (Arbeit außerhalb der eingeteilten Schicht)

Jedes davon ist rückforderbar, wenn identifiziert.

## Welche Absetzungen können Bartender beanspruchen?

Working Holiday Maker in Bartending-Rollen können typischerweise beanspruchen:

- RSA-Kursgebühren (wenn von dir bezahlt, nicht erstattet)
- Rutschfeste Schuhe, falls vom Lokal verlangt
- Bartending-Ausrüstung, falls vom Arbeiter bereitgestellt (selten)
- Ein Anteil der Fahrzeugbetriebskosten für Schichten an abgelegenen Standorten
- Handy für arbeitsbezogene Kommunikation

Die Beträge sind meistens bescheiden. Siehe unseren Artikel zu [Steuerabsetzungen für Working Holiday Maker](/de/blog/tax-deductions-working-holiday-makers) als Übersicht.

## Wie unterstützt unser Service Bartender?

Für Working Holiday Maker im Bartending führt unser Team folgendes durch:

- Wir identifizieren den korrekten Award (Hospitality oder Restaurant Industry)
- Wir gleichen die Lohnzettel mit der korrekten Einstufung und dem Satz ab
- Wir prüfen die Anwendung der Penalty Rates für Wochenend-, Abend- und Feiertagsschichten
- Wir identifizieren [unbezahlte Super](/de/blog/super-employer-not-paying-what-to-do) auf korrekt berechneten Löhnen
- Wir prüfen jegliches Trinkgeldeinkommen für steuerliche Zwecke
- Wir reichen die [Steuererklärung](/de/tax-return) ein und erfassen jedes Lokal, in dem du gearbeitet hast

Bartending bringt erhebliche Casual-Einkünfte, aber auch erhebliche Unterbezahlungen bei Penalty Rates. [Kontaktiere unser Team](/de/contact), um sicherzustellen, dass deine Arbeit hinter der Bar korrekt erfasst wurde.
 
## Die Zuschlags-Arithmetik, die Barkeeping lukrativ macht

Bars konzentrieren die Stunden genau dort, wo die Zuschläge wohnen: Nächte, Wochenenden, Feiertage. Ein Casual-Barkeeper mit Donnerstag-bis-Sonntag-Nächten verdient auf den meisten Schichten Zuschlagssätze - oft 20-40 % mehr pro Woche als der Wochentags-Cafejob bei gleicher Einstufung. Dazu: [State-RSA](/de/blog/rsa-certificate-australia-working-holiday) (absetzbar), das Lesen des Rosters gegen die Abend- und Wochenendklauseln des Awards lernen, und Kartentrinkgeld [ehrlich deklarieren](/de/blog/do-working-holiday-makers-pay-tax-on-tips). Glassies und Barbacks starten ohne Erfahrung und steigen in vollen Läden binnen Wochen auf.
`,
  },

  'barista-coffee-shop-working-holiday-australia': {
    title: 'Baristajobs in Australien mit Working Holiday Visum: Lohn, Training und Bedingungen',
    description: 'Die australische Kaffeekultur sorgt für hohe Nachfrage nach erfahrenen Baristas. Lohnsätze, Cafés in Melbourne und Sydney, und was Working Holiday Maker verdienen.',
    body: `
Australien hat eine der entwickeltsten Kaffeekulturen der Welt, und qualifizierte Baristas sind durchgängig gefragt in Cafés, Restaurants und Specialty-Coffee-Lokalen. Working Holiday Maker mit vorheriger Barista-Erfahrung finden oft schnell Arbeit, besonders in Melbourne, Sydney und Brisbane. Die Arbeit wird vom [Restaurant Industry Award](/de/blog/restaurant-industry-award-working-holiday) für eigenständige Cafés oder vom [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers) für hotelbasierte Cafés abgedeckt. Die Einstufungsstufe hängt von deiner Erfahrung und der Verantwortung der Rolle ab.

Lohnsätze und Bedingungen für Baristas sind unter den Awards gut definiert, aber viele Cafés zahlen unter der korrekten Stufe, besonders während Probezeiten und in den ersten paar Wochen der Anstellung.

## Was umfasst die Arbeit?

Barista-Rollen umfassen typischerweise:

- Bedienung von Espressomaschinen und Mühlen
- Zubereitung von Kaffeedrinks (Espresso, Latte, Cappuccino, Flat White)
- Milch passend zum Getränk aufschäumen
- Andere Getränke zubereiten (Tee, heiße Schokolade, Eisgetränke)
- Bestellungen aufnehmen und Zahlungen verarbeiten
- Einfache Lebensmittel in vielen Cafés zubereiten
- Reinigung der Ausrüstung und Pflege des Barbereichs
- Vorräte auffüllen

Erfahrene Baristas können auch anderes Personal schulen, Schichten verwalten, Kaffeebohnen bestellen und das Café in Latte-Art- oder Barista-Wettbewerben vertreten.

## Welche Einstufung gilt?

Unter dem [Restaurant Industry Award](/de/blog/restaurant-industry-award-working-holiday) passt ein Barista typischerweise in:

- **Level 1 (Food and Beverage Attendant Grade 1)**: Auszubildender oder neuer Barista ohne Erfahrung, einfache Drinks
- **Level 2 (Food and Beverage Attendant Grade 2)**: erfahrener Barista, volle Palette von Drinks, nimmt Bestellungen auf
- **Level 3**: Erfahrener Barista, beaufsichtigt kleinere Café-Bereiche, schult Personal

Die Einstufung hängt von den tatsächlichen Aufgaben ab, nicht vom Jobtitel. Eine Person mit drei Monaten Erfahrung, die eine volle Drinkpalette zubereitet, ist auf Level 2 - egal ob der Arbeitgeber sie "Juniorbarista" nennt. Siehe unseren Artikel zu [Award-Einstufungen](/de/blog/award-classifications-working-holiday-australia), wie die richtige Stufe identifiziert wird.

## Was zahlt Barista-Arbeit?

Der Lohn hängt vom Award, der Einstufung und dem Schichtzeiten ab:

- Casualstundenlohn für Level 2 in einem eigenständigen Café: typischerweise 30 $ bis 34 $ pro Stunde
- Samstagaufschlag: typischerweise 50 % unter dem Restaurant Industry Award (niedriger in manchen Einstufungen unter dem Hospitality Award)
- Sonntagaufschlag: typischerweise 75 % unter dem Restaurant Industry Award
- Feiertagsaufschlag: typischerweise 150 % unter dem Restaurant Industry Award
- Frühmorgenaufschläge können in manchen Einstufungen anfallen (abhängig von der Schichtstartzeit)

Café-Arbeit hat oft frühere Startzeiten als andere Gastronomie (5 Uhr bis 7 Uhr Öffnungsschichten sind üblich), was höhere Sätze in manchen Awards auslösen kann.

## Was ist mit unbezahlten Probeschichten?

Unbezahlte "Probeschichten" sind in australischen Cafés üblich und fast immer ungesetzlich. Eine kurze Fähigkeitsdemonstration (5 bis 30 Minuten) kann akzeptabel sein, aber eine volle Schicht produktiver Arbeit muss zu Award-Sätzen bezahlt werden. Siehe unseren Artikel zu [unbezahlten Probeschichten](/de/blog/unpaid-trial-shifts-australia-legal) für die Details.

Viele Working Holiday Maker absolvieren unbezahlte Probeschichten, werden nicht eingestellt und holen die geschuldeten Löhne nie zurück. Die Löhne sind über den Fair Work Ombudsman rückforderbar, unabhängig davon, ob du letztendlich eingestellt wurdest.

## Brauchen Baristas Zertifikate?

Die meisten Cafés verlangen keine formalen Zertifikate für Barista-Arbeit. Manche größere Ketten betreiben eigene Inhouse-Schulungen. Spezifische Zertifikate, die nützlich sein können, aber gesetzlich nicht erforderlich sind, umfassen:

- Ein Coffee-Skills-Zertifikat von einem anerkannten Anbieter
- Ein Food-Safety-Zertifikat (manchmal vom Arbeitgeber verlangt)
- Ein RSA-Zertifikat, falls das Café auch Alkohol serviert (manche Cafés tun das für Abendservice)

Working Holiday Maker mit vorheriger Barista-Erfahrung aus einem anderen Land finden oft, dass australische Cafés die Erfahrung schätzen und ohne lokale Zertifizierung einstellen.

## Was sind häufige Muster der Unterbezahlung in Cafés?

Der Fair Work Ombudsman hat konsistente Probleme in australischen Cafés identifiziert:

- Pauschalsätze, die angeblich alles abdecken, ohne Penalty Rates
- Unbezahlte Probeschichten voller Tage
- Klassifizierung auf Level 1 unbefristet trotz voller Aufgaben
- Berechnung von Personalkaffee, -Essen oder -Uniform an den Mitarbeiter (in der Regel illegal)
- Barzahlung ohne Lohnzettel und ohne [Super](/de/superannuation)
- Verweigerung, die Vorbereitungszeit vor der Öffnung zu bezahlen
- Verweigerung, den Feiertagsaufschlag zu zahlen

Cafés mit einem oder zwei dieser Muster haben meistens mehrere. Eine umfassendere Prüfung über unseren Service identifiziert oft mehrere Probleme über eine einzelne Anstellungsperiode.

## Welche Absetzungen können Baristas beanspruchen?

Working Holiday Maker in Barista-Rollen können typischerweise beanspruchen:

- Rutschfeste Arbeitsschuhe
- Barista-Schürze, falls nicht vom Arbeitgeber bereitgestellt
- Barista-Schulungsgebühren (falls von dir bezahlt)
- Von dir bereitgestellte Werkzeuge (selten für Baristas)
- Ein Anteil der Handykosten für die Schicht-Kommunikation
- Ein Anteil der Fahrzeugbetriebskosten für Frühmorgenschichten in abgelegenen Gegenden (begrenzt)

Siehe unseren Artikel zu [Steuerabsetzungen für Working Holiday Maker](/de/blog/tax-deductions-working-holiday-makers) als Übersicht.

## Wie unterstützt unser Service Baristas?

Für Working Holiday Maker in Barista-Rollen führt unser Team folgendes durch:

- Wir identifizieren den korrekten Award und die Einstufung
- Wir gleichen die Lohnzettel mit dem korrekten Satz für dein Erfahrungsniveau ab
- Wir prüfen die Penalty Rates für Frühmorgen-, Wochenend- und Feiertagsschichten
- Wir identifizieren [unbezahlte Super](/de/blog/super-employer-not-paying-what-to-do) auf korrekt berechneten Löhnen
- Wir prüfen jede unbezahlte Probeschicht im Hinblick auf eine Lohnrückforderung
- Wir reichen die [Steuererklärung](/de/tax-return) ein und erfassen jedes Café, in dem du gearbeitet hast

Barista-Arbeit in Australien erzeugt gute Casual-Einkünfte, wenn der Award korrekt angewendet wird. [Kontaktiere unser Team](/de/contact), um sicherzustellen, dass deine Tätigkeit im Café korrekt erfasst wurde.
 
## Eingestellt werden ohne australische Cafe-Erfahrung

Melbourner und Sydneyer Cafes wollen Maschinenstunden, keine Zertifikate - ein Eintages-Barista-Kurs hilft weniger als ein ehrliches "Ich kann eingießen, bin schnell und zuverlässig" plus Verfügbarkeit um 6 Uhr früh. Realistischer Einstieg: Kasse/Floor in einem vollen Cafe, Maschinenzeit in ruhigen Stunden, binnen Monaten zur Barista-Einstufung - und sicherstellen, dass die Payslip-Einstufung mit den Aufgaben mitzieht. Die Trial-Grenze beachten ([kurze Demo legal, Arbeitsschicht bezahlt](/de/blog/unpaid-trial-shifts-australia-legal)) und die Wochenendzuschläge - Cafes sind Samstag-Sonntag-Geschäfte, korrekte Wochenendsätze sind der Großteil deiner Marge.
`,
  },

  'waiter-waitress-working-holiday-australia': {
    title: 'Kellnerjobs in Australien mit Working Holiday Visum',
    description: 'Restaurant- und Café-Service ist eine der häufigsten Rollen für Working Holiday Maker. Mindestlohn, Casual Loading, Penalty Rates und worauf du achten solltest.',
    body: `
Kellner- und Kellnerinarbeit (manchmal Food-and-Beverage-Attendant-Arbeit genannt) ist eine der häufigsten Rollen für Working Holiday Maker in Australien. Die Arbeit ist breit verfügbar in Restaurants, Cafés, Hotels und Veranstaltungsorten, und sie erfordert typischerweise keine formellen Qualifikationen über eine RSA hinaus, falls Alkoholservice involviert ist. Die Lohnsätze werden vom [Restaurant Industry Award](/de/blog/restaurant-industry-award-working-holiday) für eigenständige Restaurants oder vom [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers) für Hotelrestaurants und Veranstaltungsorte festgelegt.

Das Bedienen von Tischen wird in Australien deutlich besser bezahlt als in vielen Ländern, weil der Basislohn höher ist und nicht auf Trinkgelder als Einkommensquelle angewiesen ist. Der Trade-off ist, dass die korrekte Anwendung der Award-Sätze mehr Aufmerksamkeit erfordert, als die meisten Arbeiter realisieren.

## Was umfasst die Arbeit?

Kellner-Rollen umfassen typischerweise:

- Gäste begrüßen und platzieren
- Essens- und Getränkebestellungen aufnehmen
- Essen und Getränke servieren
- Tische abräumen und zwischen Kunden neu eindecken
- Zahlungen verarbeiten und Bargeld handhaben
- Reinigung des Speisebereichs und Auffüllen
- Koordination mit Küchen- und Bar-Personal

In kleineren Lokalen kann die Kellnerrolle Barista-Aufgaben, Barservice und einfache Essenszubereitung umfassen. Die Einstufung hängt von der tatsächlichen Bandbreite der erbrachten Aufgaben ab.

## Welche Einstufung gilt?

Unter dem [Restaurant Industry Award](/de/blog/restaurant-industry-award-working-holiday):

- **Einsteiger-Level**: erste drei Monate ohne Branchenerfahrung
- **Level 1 (Food and Beverage Attendant Grade 1)**: Tische decken, Tische abräumen, Gläser einsammeln, einfacher Service
- **Level 2 (Food and Beverage Attendant Grade 2)**: Bestellungen aufnehmen, Drinks ausschenken (mit RSA), volle Serviceverantwortung
- **Level 3 (Food and Beverage Supervisor)**: Aufsicht kleiner Sektionen, Sektionsverantwortung übernehmen

Nach drei Monaten auf Einsteiger-Level musst du automatisch auf Level 1 hochgestuft werden, außer es gibt einen echten Grund für weitere Schulung. Falls du dieselbe Arbeit wie Level-2-Personal machst, solltest du auf Level 2 klassifiziert werden, egal wie lange du in der Rolle bist.

Siehe unseren Artikel zu [Award-Einstufungen](/de/blog/award-classifications-working-holiday-australia) für den detaillierten Test.

## Was zahlt Kellnerarbeit?

Der Lohn hängt von der Einstufung, dem Schichttiming und davon ab, ob du Casual oder festangestellt bist:

- Casualstundenlohn für Level 2 in einem eigenständigen Restaurant: typischerweise 30 $ bis 34 $ pro Stunde (Basis plus 25 % Casual Loading)
- Samstagaufschlag: typischerweise 50 % unter dem Restaurant Industry Award
- Sonntagaufschlag: typischerweise 75 % unter dem Restaurant Industry Award
- Feiertagsaufschlag: typischerweise 150 % unter dem Restaurant Industry Award
- Abendaufschlag nach 19 Uhr: gilt in manchen Einstufungen

Eine Freitag- und Samstagabenddinnerservice zu arbeiten kann das Wocheneinkommen substanziell erhöhen, falls die Penalty Rates korrekt gezahlt werden.

## Was ist mit Trinkgeld?

Trinkgeld in Australien ist freiwillig und weit weniger verbreitet als in vielen Ländern. Die Beträge sind bescheiden (10 % sind großzügig in den meisten Lokalen) und Trinkgelder:

- Sind steuerpflichtiges Einkommen und müssen in der [Steuererklärung](/de/tax-return) angegeben werden
- Reduzieren die Verpflichtung des Arbeitgebers, Award-Sätze zu zahlen, nicht
- Werden manchmal vom Arbeitgeber gepoolt und verteilt

Siehe unseren Artikel zu [Steuer auf Trinkgeld](/de/blog/do-working-holiday-makers-pay-tax-on-tips), wie Trinkgelder behandelt werden.

## Was sind die häufigen Unterbezahlungsmuster?

Der Fair Work Ombudsman hat konsistente Probleme im Restaurantservice identifiziert:

- Pauschalstundensätze ohne Penalty Rates
- Arbeiter über drei Monate hinaus auf Einsteiger-Level halten
- Erfahrene Kellner auf Level 1 klassifizieren
- Verweigerung, den Feiertagsaufschlag zu zahlen
- Unbezahlte Pre-Shift-Setup- und Post-Shift-Reinigungszeit
- Belastung für Uniformkäufe, Wäsche oder Brüche (generell illegal - siehe [Uniformabzüge](/de/blog/uniform-laundry-deductions-illegal-australia))
- Barzahlung ohne Lohnzettel und ohne [Super](/de/superannuation)
- Unbezahlte Probeschichten ganzer Abende

Jedes davon ist rückforderbar.

## Was, wenn du auch die Bar arbeitest?

Viele Kellner in kleineren Lokalen servieren auch Drinks an der Bar. Sobald du Alkohol servierst, brauchst du ein RSA-Zertifikat. Die Einstufung wechselt typischerweise auf Level 2 (oder bleibt auf Level 2, wenn du schon dort warst), sobald Alkoholservice Teil der Aufgaben ist. Siehe unseren Artikel zu [RSA-Zertifikaten](/de/blog/rsa-certificate-australia-working-holiday) für die Details.

Ein Kellner mit RSA, der auch die Bar abdeckt, sollte auf Level 2 bezahlt werden, auch wenn der Arbeitgeber ihn im Schichtplan als "Kellnerei" zugewiesen hat.

## Welche Absetzungen können Kellner beanspruchen?

Working Holiday Maker in Kellner-Rollen können typischerweise beanspruchen:

- Rutschfeste Arbeitsschuhe
- Schwarze Arbeitskleidung, falls speziell verlangt und nicht bereitgestellt
- RSA-Zertifikatsgebühren, falls du dafür bezahlt hast
- Ein Anteil der Handykosten für Schichtkommunikation
- Begrenzte Fahrzeugkosten in spezifischen Umständen

Die meisten Kellnerabsetzungen sind bescheiden. Siehe unseren Artikel zu [Steuerabsetzungen](/de/blog/tax-deductions-working-holiday-makers) für das Rahmenwerk.

## Wie unterstützt unser Service Kellner?

Für Working Holiday Maker in Kellner-Rollen macht unser Team:

- Identifikation des korrekten Awards (Restaurant Industry oder Hospitality)
- Querverweis von Lohnzetteln gegen die korrekte Einstufung und den Satz
- Prüfung der Penalty Rates für Wochenend-, Abend- und Feiertagsschichten
- Identifikation fehlender Pre-Shift- und Post-Shift-Zeit
- Identifikation [unbezahlter Super](/de/blog/super-employer-not-paying-what-to-do), wo Beiträge fehlen
- Prüfung jedes Trinkgeldeinkommens für die Steuererklärung
- Einreichung der [Steuererklärung](/de/tax-return), die jedes Lokal erfasst

Kellnerarbeit erzeugt erheblichen Penalty Ratewert bei korrekter Einstufung. [Kontaktiere unser Team](/de/contact), um sicherzustellen, dass deine Restaurantarbeit korrekt verarbeitet wurde.
 
## Split Shifts, Mindesteinsätze und das Gastro-Kleingedruckte

Restaurant-Roster produzieren die Unterbezahlungsmuster, auf die du achten musst: Split Shifts (Lunch + Dinner mit toter Lücke) lösen in den meisten Awards Zulagen aus; jeder Einsatz trägt eine Mindestzahlung; und "komm für zwei Stunden, ist ruhig" zahlt trotzdem den Mindesteinsatz. Kartentrinkgeld muss über die Lohnabrechnung bei dir ankommen (steuerpflichtig); Bargeld deklarierst du selbst. Der schnelle Wochencheck: gearbeitete Schichten x korrekte Zuschlagssätze + Zulagen, gegen den Payslip. Die Gastro hat Australiens höchste Lohnrückholquoten aus gutem Grund - wer prüft, kassiert.
`,
  },

  'kitchen-hand-working-holiday-australia': {
    title: 'Kitchen Handjobs in Australien mit Working Holiday Visum',
    description: 'Kitchenhandarbeit ist einer der zugänglichsten Einstiegspunkte zur australischen Gastronomie - keine formellen Qualifikationen nötig.',
    body: `
Kitchen-Hand-Arbeit ist einer der zugänglichsten Einstiegspunkte zur australischen Gastronomiebranche für Working Holiday Maker. Keine formellen Qualifikationen sind erforderlich, die Arbeit ist konsistent in Restaurants, Cafés, Hotels und Pubs verfügbar, und die Lohnsätze werden vom [Restaurant Industry Award](/de/blog/restaurant-industry-award-working-holiday) oder [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers) je nach Lokal festgelegt. Kitchen Hands arbeiten typischerweise neben Köchen im Back-of-House-Bereich von Lebensmittelservice-Lokalen und kümmern sich um Abwaschen, Essenszubereitungsunterstützung und allgemeine Küchenaufgaben.

Die Rolle ist die niedrigste Einstufung in den meisten Gastronomie-Awards, aber die Penalty Rates für Abend- und Wochenendarbeit gelten immer noch, und einen geschäftigen Freitagabend-Abwaschschicht zu arbeiten zahlt deutlich mehr pro Stunde als der reine Basissatz.

## Was umfasst die Arbeit?

Kitchen-Hand-Aufgaben umfassen typischerweise:

- Geschirr, Töpfe, Pfannen und Küchenausrüstung abwaschen
- Industriespülmaschinen bedienen
- Einfache Essenszubereitung (schälen, schneiden, portionieren)
- Lieferungen empfangen und den Kühlraum auffüllen
- Reinigung der Küchenoberflächen, Böden und Ausrüstung
- Küchenmüll entsorgen
- Auffüllen und Rotieren der Zutaten
- Unterstützung der Köche während des Service

Die Arbeit ist physisch, schnelllebig während des Service und beinhaltet oft lange Stunden auf den Füßen in einer heißen Umgebung. Es ist auch, wo die meisten Working Holiday Maker anfangen, wenn sie in Australien ankommen ohne vorherige Gastronomieerfahrung.

## Welche Einstufung gilt?

Unter dem [Restaurant Industry Award](/de/blog/restaurant-industry-award-working-holiday) sind Kitchen Hands meistens:

- **Einsteiger-Level**: erste drei Monate ohne Branchenerfahrung
- **Level 1 (Kitchen Attendant Grade 1)**: Abwaschen, einfache Reinigung, einfache Essenszubereitung
- **Level 2 (Kitchen Attendant Grade 2)**: verantwortlichere Essenszubereitung, Arbeit mit Köchen an spezifischen Stationen

Unter dem [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers) sind die Einstufungen ähnlich mit leicht unterschiedlichen Lohnstrukturen.

## Was zahlt Kitchen-Hand-Arbeit?

Lohnsätze für Casual-Kitchen-Hands:

- Casual-Stundenlohn für Level 1: typischerweise 28 $ bis 32 $ pro Stunde (Basis plus 25 % Casual Loading)
- Samstagaufschlag: 25 % bis 50 % zusätzlich je Award
- Sonntagaufschlag: 50 % bis 75 % zusätzlich
- Feiertagsaufschlag: 125 % bis 150 % zusätzlich
- Abendaufschläge können für Schichten gelten, die nach 19 Uhr beginnen

Ein Casual-Kitchen-Hand, der eine Freitag- und Samstagabend-Dinnerservice arbeitet, verdient deutlich mehr, als der Basissatz allein vermuten lässt.

## Warum Kitchen-Hand-Arbeit konsistent unterbezahlt ist

Kitchen-Hand-Arbeit hat eine der höchsten Unterbezahlungsraten in der australischen Gastronomie. Der Fair Work Ombudsman hat konsistente Probleme identifiziert:

- Pauschalstundensätze "um alles abzudecken" ohne Penalty Rates
- Verweigerung, den Feiertagsaufschlag zu zahlen
- Barzahlung ohne Lohnzettel und ohne [Super](/de/superannuation)
- Unbezahlte Pre-Shift-Setupzeit
- Unbezahlte Post-Shift-Reinigungszeit (Kitchen Hands bleiben oft spät, um den Abwasch zu beenden, während der Service endet)
- Belastung für Personalmahlzeiten (der Arbeitgeber, der Mahlzeiten bereitstellt, ist in Ordnung, aber dafür zu belasten schafft Probleme)
- Verweigerung, eingeplante Pausen genau zu zählen
- Falschklassifizierung erfahrener Kitchen Hands auf Level 1 unbefristet

Der Fair Work Ombudsman hat mehrere nationale Kampagnen zu Kitchen Handunterbezahlung durchgeführt, mit konsistenten Befunden, dass die meisten Arbeiter unter dem korrekten Award-Satz bezahlt werden.

## Arbeitsplatzsicherheit in Küchen

Küchenarbeit hat überdurchschnittliche Arbeitsplatzverletzungsraten:

- Schnitte von Messern und gebrochenem Geschirr
- Verbrennungen von Öfen, Fritteusen und heißen Oberflächen
- Ausrutschen auf nassen Böden
- Rückenverletzungen vom Heben schwerer Lagerbestände
- Repetitive Belastung vom verlängerten Abwaschen

Jede Verletzung während bezahlter Küchenarbeit wird von Workers Compensation abgedeckt. Siehe unseren Artikel zu [Arbeitsverletzungsrechten](/de/blog/workplace-injury-working-holiday-rights) für das Rahmenwerk. Der Arbeitgeber kann dich rechtlich nicht unter Druck setzen, nicht zu beanspruchen, und der Visastatus beeinflusst dein Recht auf Workers Compensation nicht.

## Welche Absetzungen können Kitchen Hands beanspruchen?

Working Holiday Maker in Kitchen Handrollen können typischerweise beanspruchen:

- Rutschfeste Arbeitsschuhe
- Arbeitskleidung oder Schürzen, falls speziell verlangt und nicht bereitgestellt
- Messerschärfen, falls du eigene Messer bereitstellst
- Ein Anteil der Handykosten für Schichtkommunikation

Absetzungen sind meistens bescheiden für Kitchen Hands im Vergleich zu anderen Rollen. Siehe unseren Artikel zu [Steuerabsetzungen](/de/blog/tax-deductions-working-holiday-makers) für das Rahmenwerk.

## Wie funktioniert Progression von Kitchen Hand zu anderen Rollen?

Viele Working Holiday Maker beginnen als Kitchen Hands und gehen weiter zu:

- Kitchen Attendant Grade 2 mit mehr Essenszubereitungsverantwortung
- Cook Grade 1, falls sie Kochaufgaben an einer Station übernehmen
- Front-of-Houserollen (Kellner, Bartender), sobald sie RSA-Training haben

Jeder Schritt nach oben ist eine Einstufungsänderung, die sich im Lohnsatz widerspiegeln sollte. Falls deine Aufgaben sich erweitert haben, aber der Lohn nicht, ist die Unterbezahlung über Fair Work rückforderbar.

## Wie unterstützt unser Service Kitchen Hands?

Für Working Holiday Maker in Kitchen Handrollen macht unser Team:

- Identifikation des korrekten Awards und der Einstufung
- Querverweis von Lohnzetteln gegen den korrekten Satz
- Prüfung der Penalty Rates für Abend-, Wochenend- und Feiertagsschichten
- Identifikation von Pre-Shift- und Post-Shift unbezahlter Zeit
- Identifikation [unbezahlter Super](/de/blog/super-employer-not-paying-what-to-do), wo Beiträge fehlen
- Prüfung der Einstufungsprogression, wenn Aufgaben sich erweitert haben
- Einreichung der [Steuererklärung](/de/tax-return), die jedes Lokal erfasst

Kitchen-Hand-Arbeit ist eine der am konsistentesten unterbezahlten Rollen in der australischen Gastronomie. [Kontaktiere unser Team](/de/contact), um sicherzustellen, dass deine Küchenarbeit korrekt verarbeitet wurde.
 
## Vom Kitchen Hand zum Cook: die Einstufungsleiter

Kitchen Hands starten in der Einstiegsklasse, aber die Aufgaben wandern schnell - und die Einstufung muss den Aufgaben folgen, nicht dem Jobtitel. Regelmäßig Essen vorbereiten, einfache Gerichte kochen, eine Station fahren? Das ist typischerweise ein höheres Level mit höherem Satz. Der Zug: zwei Wochen notieren, was du wirklich tust, gegen die Klassendefinitionen des Awards halten, schriftlich um Neueinstufung bitten. Küchen sind außerdem der Ort, wo unbezahlte "Trials" [am häufigsten die Grenze überschreiten](/de/blog/unpaid-trial-shifts-australia-legal) - ein Arbeits-Trial jenseits der kurzen Demo ist bezahlte Zeit.
`,
  },

  'construction-laborer-working-holiday-australia': {
    title: 'Bauarbeiterjobs in Australien mit Working Holiday Visum: White Card und Lohn',
    description: 'Bauarbeit zählt zu den bestbezahlten Einstiegsrollen für Working Holiday Maker. White-Card-Pflicht, Stundensätze, Casual Loading und Sicherheitsausrüstung im Überblick.',
    body: `
Bauarbeit ist eine der bestbezahlten Einstiegsrollen, die Working Holiday Makern in Australien verfügbar sind. Die Arbeit beinhaltet allgemeine Standortarbeit, Materialhandling, Abbruch, Baustellenreinigung und Unterstützung von Handwerkern auf Wohn- und Gewerbebaustandorten. Eine White Card (auch Construction Induction Card genannt) ist gesetzlich erforderlich, bevor du eine Baustelle in Australien betrittst. Die Lohnsätze werden vom Building and Construction General On-site Award (MA000020) festgelegt, mit Einstufungen und Zulagen, die die Gesamteinkünfte weit über den allgemeinen Mindestlohn bringen.

Bauarbeit hat auch eine der höchsten Verletzungsraten in Australien, was Workers Compensation und die Verwendung ordentlicher Sicherheitsausrüstung besonders wichtig macht.

## Was umfasst die Arbeit?

Zu den Aufgaben eines Bauarbeiters gehören typischerweise:

- Materialien um die Baustelle herum tragen
- Beton mischen und legen
- Baustellenreinigung und Müllentfernung
- Abbrucharbeit
- Handwerker unterstützen (Zimmerleute, Klempner, Elektriker)
- Gerüste aufstellen und abbauen
- Einfache Anlagen und Ausrüstung bedienen
- Unterstützung bei Erdarbeiten
- Allgemeine Handwerksassistenz

Die Arbeit ist physisch, wetter-exponiert und erfordert konsistente Aufmerksamkeit auf Sicherheit. Der Lohn spiegelt die Schwierigkeit und das Risiko der Arbeit wider.

## Was ist die Anforderung der White Card?

Eine White Card ist gesetzlich erforderlich für jede Person, die auf einer Baustelle in Australien arbeitet. Ohne eine kannst du rechtlich nicht auf der Baustelle sein, und der Arbeitgeber kann dich rechtlich nicht dort haben. Die Karte:

- Wird nach Absolvierung des General Construction Induction-Kurses ausgestellt
- Dauert 6 bis 8 Stunden online oder 1 Tag persönlich
- Kostet 50 $ bis 150 $ je nach Anbieter und Bundesstaat
- Ist in jedem australischen Bundesstaat und Territorium gültig, sobald sie ausgestellt ist
- Läuft nicht ab (aber verfällt, wenn du 2 Jahre lang keine Bauarbeit machst)

Siehe unseren Artikel zu [White-Card-Anforderungen](/de/blog/white-card-australia-working-holiday) für die Details der einzelnen Bundesstaaten.

Der Kurs deckt grundlegende Bausicherheit ab, das Identifizieren von Gefahren, das Verwenden persönlicher Schutzausrüstung (PSA) und deine rechtlichen Verpflichtungen als Arbeiter auf der Baustelle.

## Was zahlt Bauarbeit?

Lohnsätze unter dem Building and Construction Award sind deutlich höher als der allgemeine Mindestlohn:

- Casual-Stundenlohn für Construction Worker Level 1 (CW1): typischerweise 32 $ bis 36 $ pro Stunde
- Casual-Stundenlohn für Construction Worker Level 2 (CW2 - Grundfähigkeiten): typischerweise 33 $ bis 37 $ pro Stunde
- Casual-Stundenlohn für Construction Worker Level 3 (CW3 - mehr Erfahrung): typischerweise 34 $ bis 39 $ pro Stunde
- Samstagaufschlag: typischerweise 50 % zusätzlich
- Sonntagaufschlag: typischerweise 100 % zusätzlich
- Feiertagsaufschlag: typischerweise 150 % zusätzlich
- Überstunden: typischerweise 50 % bis 100 % Aufschlag
- Standortzulagen: Branchenzulage, Leading-Hand-Zulage, Höhenzulage, Asbestzulage

Die Standortzulagen werden zusätzlich zum Stundenlohn gezahlt und können das Wocheneinkommen substanziell erhöhen. Die Branchenzulage wird jedem Bauarbeiter als Ausgleich für Arbeitsbedingungen gezahlt und ist eine der am konsistentesten verpassten Zahlungen.

## Welche Zulagen gelten?

Der Building and Construction Award enthält eine lange Liste von Zulagen:

- **Branchenzulage**: an jeden Bauarbeiter gezahlt, derzeit etwa 35 $ bis 50 $ pro Woche
- **Werkzeugzulage**: wo der Arbeiter eigene Werkzeuge bereitstellt
- **Standortzulage**: in manchen großen Bauprojekten
- **Höhenzulage**: für Arbeit über bestimmten Höhen
- **Schlechtwetterzulage**: wo Arbeit bei starkem Regen weitergeht
- **Erste-Hilfe-Kastenzulage**: für designierte Verantwortliche für den Erste-Hilfe-Kasten
- **Reisezulage**: wo der Arbeitsstandort weit von zu Hause oder dem Depot ist

Working Holiday Maker bekommen oft nur den Basissatz ohne irgendwelche Zulagen, auch wenn die Zulagen unter dem Award verpflichtend sind.

## Was ist mit Workers Compensation und Bauverletzungen?

Bauwesen hat überdurchschnittliche Verletzungsraten in Australien. Workers Compensation deckt jeden bezahlten Bauarbeiter ab, einschließlich Working Holiday Maker, unabhängig von der Dienstzeit. Die Abdeckung umfasst:

- Medizinische Behandlungskosten
- Wöchentliche Lohnzahlungen, während du nicht arbeiten kannst
- Einmalzahlungen für dauerhafte Beeinträchtigung

Siehe unseren Artikel zu [Arbeitsverletzungsrechten](/de/blog/workplace-injury-working-holiday-rights) als Übersicht. Der Arbeitgeber kann dich rechtlich nicht unter Druck setzen, nicht zu beanspruchen, und der Visastatus ist kein relevanter Faktor.

## Angestellter vs. Contractor im Bauwesen

Manche Bauarbeit wird von Hilfsarbeitern unter ABNs als unabhängige Contractor statt als Angestellte erbracht. Das kann legitim sein (ein echter Contractor) oder unrechtmäßig (ein Angestellter, der als Contractor falschklassifiziert wird, um [Super](/de/superannuation) und Workers Comp zu vermeiden).

Falls die Arbeit die Eigenschaften einer Anstellung hat (feste Stunden, vom Arbeitgeber gestellte Werkzeuge, beaufsichtigte Arbeit, keine Möglichkeit zum Ersatz, keine anderen Kunden), ist die Klassifizierung höchstwahrscheinlich falsch. Siehe unseren Artikel zu [Angestellter vs. Contractor](/de/blog/employee-vs-contractor-australia) für den Test.

Für Working Holiday Maker sind die Kosten der Falschklassifizierung als Contractor erheblich:

- Keine Superbeiträge (12 % des Lohns verloren)
- Keine Workers-Compensation-Abdeckung für Verletzungen
- Keine bezahlten Feiertage
- Kein Casual Loading
- Keine Schutzmaßnahmen unter dem Building and Construction Award

Falls du eine ABN hast und auf Baustellen arbeitest, prüft unser Team, ob die Klassifizierung korrekt ist, als Teil der Vorbereitung deiner [Steuererklärung](/de/tax-return).

## Welche Absetzungen können Bauarbeiter beanspruchen?

Working Holiday Maker im Bau können typischerweise beanspruchen:

- Sicherheitsschuhe mit Stahlkappe
- Hi-Vis-Shirts und -Kleidung
- Schutzhelm (falls von dir bereitgestellt)
- Sonnenschutz (Sonnencreme, Sonnenbrille, Hüte für Außenarbeit)
- Werkzeuggürtel und Handwerkzeuge (unter 300 $ je für Sofortabschreibung - siehe unseren Artikel zur [300 $-Sofortabschreibung](/de/blog/tools-equipment-under-300-instant-deduction-whv))
- Größere Werkzeuge und Ausrüstung über Zeit abgeschrieben
- White-Card-Kursgebühr
- Ein Anteil der Fahrzeugbetriebskosten für Reise zu Baustellen (Pendeln ist generell nicht absetzbar, aber Reise zwischen Baustellen ist es)

Bauarbeit erzeugt typischerweise die größten arbeitsbezogenen Absetzungen aller Working-Holiday-Maker-Rollen.

## Wie unterstützt unser Service Bauarbeiter?

Für Working Holiday Maker im Bau führt unser Team folgendes durch:

- Wir identifizieren die korrekte Einstufung unter dem Building and Construction Award
- Wir gleichen die Lohnzettel mit dem korrekten Satz plus Zulagen ab
- Wir identifizieren fehlende Branchen- und andere Standortzulagen
- Wir prüfen jede ABN-Klassifizierung auf Rechtmäßigkeit
- Wir identifizieren [unbezahlte Super](/de/blog/super-employer-not-paying-what-to-do), wo Beiträge fehlen
- Wir erfassen jeden legitimen Abzug für Werkzeuge und Ausrüstung
- Wir reichen die [Steuererklärung](/de/tax-return) ein, die das vollständige Bild widerspiegelt

Bauarbeit bringt starke Einkünfte und hohe Abzugsmöglichkeiten. [Kontaktiere unser Team](/de/contact), um sicherzustellen, dass beide Seiten ordentlich erfasst sind.
 
## Baustellenlohn und die Abzugs-Goldgrube

Der Bau zahlt mit die besten Award-Sätze, die Backpackern offenstehen - und die Abzüge folgen: Stahlkappen, Hi-Vis, Helm und Handschuhe (alles absetzbar), Sonnenschutz für Außenarbeit, selbst gekaufte Werkzeuge (Sofortabzug unter der [1.000-$-Regel ab Juli 2026](/de/blog/1000-dollar-instant-deduction-rule-2026)) und die White-Card-Kursgebühr selbst. Zwei Baustellenrealitäten: Labour-Hire ist üblich - [wisse, wer dich rechtlich beschäftigt](/de/blog/labour-hire-agencies-working-holiday-australia) - und Verletzungen auf der Baustelle sind genau das, was [Workers Compensation abdeckt](/de/blog/workplace-injury-working-holiday-rights), Visum hin oder her. Belege ab Tag eins - eine Saison Ausrüstung summiert sich zu einer spürbaren Erstattungszeile.
`,
  },

  'uber-eats-delivery-rider-working-holiday-australia': {
    title: 'Uber Eats und Lieferdienstjobs in Australien mit Working Holiday Visum',
    description: 'Essenslieferung mit Fahrrad, E-Bike oder Scooter wird als Contracting behandelt - du brauchst eine ABN. Verdienst, Steuern und Absetzungen für Working Holiday Maker.',
    body: `
Essenslieferungarbeit für Uber Eats, DoorDash, Menulog und ähnliche Plattformen ist eine der flexibelsten Optionen, die Working Holiday Makern in Australien verfügbar sind. Die Arbeit wird auf einem Fahrrad, E-Bike, Motorrad, Scooter oder Auto erbracht, und die Plattform zahlt Einkünfte direkt auf das Bankkonto des Fahrers ein. Aus Steuersicht ist Essenslieferung als **unabhängiges Contracting** klassifiziert, was bedeutet, dass ein Working Holiday Maker, der für diese Plattformen liefert, eine [ABN](/de/abn) haben muss, für seine eigenen Steuerpflichten verantwortlich ist und keine Steuer automatisch einbehalten bekommt. Anders als Ridesharepassagiertransport erfordert Essenslieferung nur GST-Registrierung, wenn der Umsatz 75.000 $ pro Jahr überschreitet.

Die Kombination aus flexiblen Stunden und erheblichen Absetzungen (Fahrzeugkosten, Ausrüstung, Handy) macht Lieferarbeit finanziell attraktiver, als die Schlagzeilenstundenverdienste vermuten lassen - aber nur, wenn die Steuerseite von Anfang an korrekt eingerichtet ist.

## Was umfasst die Arbeit?

Essenslieferung beinhaltet typischerweise:

- Bestellungen über die Plattformapp empfangen
- Zum Restaurant reisen, um das Essen abzuholen
- Das Essen zum Kunden liefern
- Die Plattformapp für Bewertungen und Einkommenstracking bedienen
- Eigene Ausrüstung verwalten (Fahrzeug, Lieferungstasche, Handy)

Die meisten Fahrer arbeiten gleichzeitig für mehrere Plattformen, um die Anzahl verfügbarer Bestellungen zu maximieren - sie wechseln zwischen Uber Eats, DoorDash und Menulog während einer Schicht.

## ABN-Anforderung

Jeder Essenslieferungsfahrer braucht eine [ABN](/de/abn), bevor er sich bei der Plattform registrieren kann. Die ABN ist erforderlich, weil:

- Die Plattform dich als Contractor bezahlt, nicht als Angestellten
- Keine PAYG-Steuer von deinen Einkünften einbehalten wird
- Du für deine eigenen Steuerpflichten verantwortlich bist
- Die Plattform deine jährlichen Einkünfte ans ATO unter dem Sharing Economy Reporting Regime meldet

Ohne ABN kann die Plattform dich rechtlich nicht bezahlen, und du würdest 47 % Einbehalt unter der No-ABN-Einbehaltungsregel haben. Siehe unseren Artikel zu [Was ist eine ABN](/de/blog/what-is-an-abn) für das Rahmenwerk.

## GST: wann gilt es?

Für Essenslieferung (Uber Eats, DoorDash, Menulog) ist GST-Registrierung nur erforderlich, falls dein Umsatz aus Lieferarbeit 75.000 $ in einem Steuerjahr überschreitet. Die meisten Working Holiday Makerlieferungsfahrer verdienen weit unter dieser Schwelle und müssen sich nicht für GST registrieren. Das ist anders als beim Passagierrideshare (Uber, Ola, Didi), wo GST-Registrierung ab dem ersten Dollar verdient erforderlich ist, unabhängig vom Umsatz. Siehe unseren Artikel zu [Uberfahrerregeln](/de/blog/uber-driver-working-holiday-australia) für die Rideshareunterschiede.

Falls du sowohl Essenslieferung als auch Rideshare machst, gelten die GST-Regeln von Rideshare auf alles dein Gig-Economy-Einkommen ab dem ersten Dollar.

## Wie wird Lieferungseinkommen besteuert?

Lieferungseinkommen wird zu den [Working Holiday Makersteuersätzen](/de/blog/backpacker-tax-rate-australia) besteuert:

- 15 % auf die ersten 45.000 $
- 30 % von 45.000 $ bis 135.000 $
- Höhere Sätze über 135.000 $

Weil keine Steuer von Lieferungseinkünften einbehalten wird, schuldest du typischerweise Steuer am Ende des Steuerjahres, außer du hast ausgleichendes PAYG-Einkommen mit einbehaltener Steuer. 15 % bis 25 % jeder Lieferungszahlung auf ein separates Konto zur Seite zu legen ist ein praktischer Weg, um sicherzustellen, dass die Steuer gezahlt werden kann, wenn die [Steuererklärung](/de/tax-return) eingereicht wird.

## Welche Absetzungen können Lieferungsfahrer beanspruchen?

Lieferarbeit erzeugt erhebliche arbeitsbezogene Absetzungen:

- **Fahrrad**: Abschreibung über seine effektive Lebensdauer (3 bis 5 Jahre), Reparaturen, Wartung, Reifen, Ketten, Bremsbeläge
- **E-Bike**: wie oben, plus Strom zum Laden (geschätzt)
- **Motorrad oder Scooter**: Treibstoff, Anmeldung, Versicherung (Arbeitsanteil), Wartung, Abschreibung
- **Auto**: Cent-pro-Kilometer-Methode (bis 5.000 km) oder Logbuchmethode (siehe unseren Artikel zu [Fahrzeugausgaben](/de/blog/vehicle-logbook-abn-working-holiday))
- **Lieferungsausrüstung**: Tasche, Helm, Lichter, Schloss, Satteltaschen
- **Handy**: der arbeitsbezogene Prozentsatz der Rechnung plus der arbeitsbezogene Prozentsatz der Gerätekosten
- **Handyhalter, Dashcam**, andere Fahrzeugzubehörteile
- **Reinigungsmittel** für das Fahrzeug
- **Plattformservicegebühren**, die von Uber/DoorDash/Menulog genommen werden

Ein typischer Teilzeitlieferungsfahrer kann 3.000 $ bis 8.000 $ legitime Absetzungen pro Jahr haben. Ohne diese Absetzungen wird das zu versteuernde Einkommen substanziell überangegeben. Siehe unseren Artikel zu [ABN-Absetzungen](/de/blog/abn-deductions-business-expenses) für das Rahmenwerk, und unseren Artikel zu [Fahrrad- und Fahrzeugabsetzungen](/de/blog/bicycle-motorcycle-vehicle-deductions-working-holiday) für die fahrzeug-spezifischen Regeln.

## Welche Aufzeichnungen brauchst du?

Für jeden Lieferungsfahrer sind die wichtigen Aufzeichnungen:

- Die jährliche Erklärung von jeder Plattform, die deine Bruttoeinkünfte zeigt
- Kontoauszüge, die Plattformeinzahlungen zeigen
- Belege für jede arbeitsbezogene Ausgabe (Fahrrad, Ausrüstung, Handy, Fahrzeugkosten)
- Ein Logbuch oder eine repräsentative Periode für den Arbeitsnutzungsprozentsatz aller Gemeinschaftsnutzungsgegenstände
- Ein Tagebuch der für Lieferarbeit gefahrenen Gesamtkilometer

Die Plattform meldet deine jährlichen Einkünfte direkt ans ATO, daher ist die Untermeldung des Einkommens einer der einfachsten Wege, eine ATO-Überprüfung auszulösen. Die Einkommensseite ist fix; die Absetzungsseite ist, wo die Optimierung passiert.

## Workers Compensation: gibt es welche?

Lieferungsfahrer, die als Contractor mit einer ABN arbeiten, sind **nicht** automatisch durch Workers Compensation abgedeckt. Falls du während einer Lieferungsschicht verletzt wirst, ist die Abdeckung begrenzter, als sie für einen Angestellten wäre. Manche Plattformen bieten optionale Verletzungsversicherungsprodukte, und persönliche Unfallversicherung kann separat gekauft werden. Die Fahrradversicherungsseite ist eine separate Frage.

Siehe unseren Artikel zu [Arbeitsverletzungsrechten](/de/blog/workplace-injury-working-holiday-rights) für das Rahmenwerk. Der Unterschied zwischen Angestellten- und Contractorabdeckung ist einer der Trade-offs von Gig-Economy-Arbeit.

## Wie unterstützt unser Service Lieferungsfahrer?

Für Working Holiday Maker, die Essenslieferung machen, macht unser Team:

- Registrierung deiner ABN mit den korrekten Geschäftstätigkeitscodes
- Prüfung, ob GST-Registrierung erforderlich ist (selten ist sie es)
- Abgleich der Plattformerklärungen mit dem ATO Sharing Economydatenfeed
- Identifikation jeder legitimen arbeitsbezogenen Absetzung (Fahrzeug, Ausrüstung, Handy, Gebühren)
- Genaue Berechnung der geschuldeten Steuer am Ende des Jahres
- Einreichung der [Steuererklärung](/de/tax-return) mit dem vollen Absetzungsbild

Lieferarbeit ohne ordentliches Steuermanagement führt oft zu einer Überraschungssteuerrechnung am Ende des Jahres. [Kontaktiere unser Team](/de/contact), bevor du anfängst (oder so früh wie möglich, falls du schon angefangen hast), um die Steuerseite korrekt einzurichten.
 `,
  },

  'uber-driver-working-holiday-australia': {
    title: 'Uberfahrer und Ridesharejobs in Australien mit Working Holiday Visum: ABN, GST und BAS',
    description: 'Rideshare-Fahren in Australien erfordert eine ABN, GST-Registrierung ab dem ersten Dollar und vierteljährliche Business Activity Statements.',
    body: `
Fahren für Uber, Ola, Didi oder jede andere Rideshare-Passagierplattform in Australien wird als unabhängiges Contracting behandelt und unterliegt den striktesten Steuerregeln aller Gig-Economy-Arbeit. Ein Working Holiday Maker, der Rideshare fährt, muss eine [ABN](/de/abn) haben, muss sich für GST ab dem ersten Dollar Fahrteinkommen registrieren, unabhängig vom Gesamtumsatz, und muss vierteljährliche Business Activity Statements (BAS) einreichen, um GST ans ATO zu überweisen. Die GST-Regel für Rideshare ist anders als für Essenslieferung: Rideshare ist GST-pflichtig ab dem ersten Dollar; Essenslieferung ist es nicht.

Working Holiday Maker, die mit Rideshare anfangen, ohne die GST- und BAS-Anforderungen zu realisieren, bauen oft erhebliche GST-Schulden ans ATO über ihre ersten Fahrmonate auf. Eine korrekte Einrichtung von Anfang an vermeidet das.

## Was umfasst Rideshare-Fahren?

Rideshare-Fahren umfasst typischerweise:

- Einen Passagier von einem Abholort zu einem Ziel mit der Plattform-App fahren
- Fahrtanfragen über die App annehmen und ablehnen
- Eigenes Fahrzeug bedienen (Uber und Ola haben spezifische Fahrzeuganforderungen)
- Ein passagierfreundliches Fahrzeug pflegen (Sauberkeit, Zustand)
- Plattformpreise befolgen (von der Plattform festgelegt, nicht vom Fahrer)
- Eigene Steuerpflichten verwalten

## Was sind die Fahrzeuganforderungen?

Rideshare-Plattformen haben spezifische Anforderungen für das Fahrzeug, das du nutzt, was typischerweise umfasst:

- Eine viertürige Limousine, Schrägheck, SUV oder Kombi (meistens keine Nutzfahrzeuge)
- Eine maximale Altersgrenze (typischerweise unter 10 Jahren ab Herstellung)
- Passagierkomfortstandards
- Eine aktuelle Anmeldung und Roadworthy
- Vollkaskoversicherung (manche Plattformen verlangen ein Uber-spezifisches Versicherungsprodukt)
- Eine Plattform-Inspektion des Fahrzeugs

Working Holiday Maker ohne geeignetes Fahrzeug mieten manchmal eines über ein Rideshare-freundliches Vermietungs-Schema. Die Mietkosten sind eine Absetzung gegen das Einkommen.

## Was ist mit Bundesstaat-spezifischen Fahrerberechtigungen?

Die meisten australischen Bundesstaaten und Territorien verlangen, dass Ridesharefahrer eine separate Fahrerberechtigung zusätzlich zu ihrem normalen Führerschein erhalten:

- NSW: Passenger Transport Authorisation (PTA)
- Victoria: Commercial Passenger Vehicle (CPV)-Akkreditierung
- Queensland: Driver Authorisation
- South Australia: General Passenger Transport Accreditation
- Western Australia: PTD-Autorisierung
- ACT: Public Vehicle Licence

Der Prozess umfasst typischerweise eine Polizeiprüfung, medizinische Bewertung und eine kleine Gebühr. Working Holiday Maker können diese Autorisierungen beantragen, aber die Regeln sind bundesstaats-spezifisch und können sich ändern.

## Was ist die GST-Regel, die die meisten Ridesharefahrer trifft?

Für gewöhnliche ABN-Arbeit ist GST-Registrierung nur erforderlich, sobald der Umsatz 75.000 $ pro Jahr überschreitet. Für **Rideshare-Fahren speziell** ist GST-Registrierung ab dem ersten Dollar Fahrteinkommen erforderlich. Diese Regel deckt ab:

- Uberfahrten (Passagiertransport)
- Ola, Didi und andere Rideshare-Plattformen
- Jeden Passagiertransport für ein Entgelt

Die Regel gilt **nicht** für:

- Uber Eats und andere Essenslieferung (diese folgen der Standard-75.000 $-Schwelle - siehe unseren Artikel zu [Uber Eatslieferung](/de/blog/uber-eats-delivery-rider-working-holiday-australia))
- Logistik oder Paketlieferung (folgen auch der Standardschwelle)

Falls ein Fahrer sowohl Rideshare als auch Essenslieferung macht, gilt die Rideshare-GST-Regel auf alles Einkommen ab dem ersten Dollar.

## Was bedeutet GST-Registrierung in der Praxis?

Sobald für GST registriert, muss der Ridesharefahrer:

- GST (1/11 des Entgelts) zu jeder Fahrt hinzufügen
- Vierteljährlich ein Business Activity Statement (BAS) ans ATO einreichen
- Die gesammelte GST jedes Quartal ans ATO überweisen
- GST-Gutschriften auf Geschäftsausgaben (Treibstoff, Services, Teile, Fahrzeugfinanzierung) beanspruchen

In der Praxis für Rideshare ist die GST im vom Passagier gezahlten Entgelt eingebaut, sodass der Fahrer nicht "GST" zu einem zitierten Preis hinzufügt. Die Plattform meldet das Bruttoentgelt; der Fahrer ist verantwortlich, 1/11 ans ATO zu überweisen.

Die Nettokosten von GST nach Gutschriften sind typischerweise 5 % bis 8 % des Fahrteinkommens für einen aktiven Ridesharefahrer, weil das meiste der auf Fahrten gesammelten GST durch GST-Gutschriften auf Treibstoff- und Fahrzeugkosten ausgeglichen wird.

## Was ist mit den vierteljährlichen BAS-Fristen?

Business Activity Statements sind vierteljährlich fällig:

- Quartal 1 (Juli bis September): fällig 28. Oktober
- Quartal 2 (Oktober bis Dezember): fällig 28. Februar
- Quartal 3 (Januar bis März): fällig 28. April
- Quartal 4 (April bis Juni): fällig 28. Juli

Einreichung unter Aufsicht eines registrierten Steueragenten verlängert die Frist typischerweise um 4 Wochen. Eine BAS-Einreichung zu verpassen löst Failure-to-Lodge-Strafen ähnlich denen für späte Steuererklärungen aus. Siehe unseren Artikel zu [Späten Steuererklärungsstrafen](/de/blog/late-tax-return-penalty-working-holiday) für das Rahmenwerk.

## Welche Absetzungen können Ridesharefahrer beanspruchen?

Rideshare erzeugt erhebliche arbeitsbezogene Absetzungen:

- **Fahrzeugbetriebskosten**: Treibstoff, Öl, Services, Reparaturen, Reifen
- **Fahrzeugfinanzierungszinsen** (der arbeitsbezogene Anteil)
- **Anmeldung und CTP-Versicherung** (der arbeitsbezogene Anteil)
- **Vollkaskoversicherung** (der arbeitsbezogene Anteil)
- **Fahrzeugabschreibung** (oder Mietkosten, falls geleast)
- **Mautgebühren und Parken** während der Arbeit
- **Handy**: der arbeitsbezogene Prozentsatz der Rechnung plus Gerät
- **Handyhalter, Dashcam, Inautozubehör**
- **Reinigung des Fahrzeugs**
- **Plattformservicegebühren** von Uber/Ola/Didi genommen
- **Fahrerautorisierungsgebühren**

Die zwei Methoden für Fahrzeugabsetzungen sind Cent-pro-Kilometer (bei 5.000 km pro Auto pro Jahr gedeckelt) und Logbuch (keine Deckelung, erfordert ein 12-wöchiges Logbuch). Für Vollzeitridesharefahrer gibt die Logbuchmethode fast immer eine größere Absetzung. Siehe unseren Artikel zu [Fahrzeugausgaben und Logbüchern](/de/blog/vehicle-logbook-abn-working-holiday) für die Details.

Ein Vollzeitridesharefahrer kann 20.000 $ bis 40.000 $ legitime Fahrzeug- und Ausrüstungsabsetzungen pro Jahr haben. Ohne ordentliche Aufzeichnungen und die richtige Methode wird das auf dem Tisch gelassen.

## Wie unterstützt unser Service Ridesharefahrer?

Für Working Holiday Maker, die Rideshare fahren, macht unser Team:

- Registrierung deiner ABN mit den korrekten Ridesharegeschäftstätigkeitscodes
- Registrierung für GST von Anfang an
- Einreichung vierteljährlicher BAS über unser Steueragentenportal
- Abgleich der Plattformerklärungen mit dem ATO-Datenfeed
- Identifikation jeder legitimen arbeitsbezogenen Absetzung (Fahrzeug, Ausrüstung, Gebühren)
- Berechnung der Netto-GST-Haftung mit ordentlich erfassten Gutschriften
- Einreichung der [Steuererklärung](/de/tax-return) mit dem vollen Bild

Rideshare ist die steuerintensivste Gig-Economy-Arbeit für Working Holiday Maker, und der Unterschied zwischen ordentlicher Behandlung und Alleingang kann Tausende von Dollar an Strafen, verpassten Gutschriften und überbezahlter Steuer ausmachen. [Kontaktiere unser Team](/de/contact), bevor du anfängst zu fahren (oder so früh wie möglich, falls du schon angefangen hast), um die Struktur korrekt einzurichten.
 
## Der vierteljährliche BAS-Rhythmus, vor dem niemand warnt

Die GST-ab-Dollar-eins-Regel bringt vierteljährliche Business Activity Statements: Oktober, Januar, April, Juli - jeweils mit Fahrten, eingenommener GST und GST-Gutschriften auf Ausgaben (Sprit, Wartung, Handy, Plattformgebühren, alles im Geschäftsanteil). Verpasste BAS-Fristen kosten Strafen auch in schwachen Quartalen; Null-Quartale werden trotzdem eingereicht. Das tragfähige Setup: separates Konto, 25-30 % jeder Bruttofahrt beiseite (10 % GST plus Einkommensteuer-Rücklage), Fahrtenbuch ab der ersten Fahrt, und entweder 20 Minuten pro Quartal im ATO-Portal oder den ganzen Rhythmus [an einen Agenten geben](/de/tax-return).
`,
  },

  'ski-resort-jobs-working-holiday-australia': {
    title: 'Ski-Resort-Jobs in Australien mit Working Holiday Visum',
    description: 'Ski-Resort-Arbeit läuft von Juni bis September in Victoria und NSW. Was du verdienst, welche Rollen offen sind und wie du dich bewirbst, als Working Holiday Maker.',
    body: `
Australiens Skisaison läuft von Juni bis September, mit großen Resorts in Victoria (Mount Hotham, Falls Creek, Mount Buller) und New South Wales (Thredbo, Perisher, Charlotte Pass), die jeden Winter große saisonale Arbeitskräfte einstellen. Working Holiday Maker füllen viele dieser Rollen, einschließlich Liftbetrieb, Skischulunterstützung, Gastronomie, Einzelhandel, Unterkunft, Schneemachen und Pistenpräparierung. Die meisten Ski-Resort-Jobs umfassen Bergunterkunft als Teil des Pakets, was die praktische Seite des Lebens auf dem Berg vereinfacht, aber Komplexität auf der Steuerseite hinzufügt.

Die Einstellung in Ski-Resorts öffnet im März und April jedes Jahr, mit den meisten Positionen besetzt bis Juni. Working Holiday Maker, die planen, die Skisaison zu arbeiten, bewerben sich typischerweise weit im Voraus und müssen in Australien sein oder bis zum Saisonbeginn ankommen können.

## Welche Rollen sind verfügbar?

Große Ski-Resort-Arbeitgeber stellen ein in:

- **Liftbetrieb**: Be- und Entladen von Sesselliften, T-Bars und Gondeln; Wartemanagement
- **Ski- und Snowboardunterricht**: erfordert Zertifizierung (Qualifikationen der Australian Professional Snowsport Instructors oder internationale Äquivalente)
- **Skipatrouille**: erfordert medizinische und Ski/Boardqualifikationen
- **Gastronomie**: Bars, Restaurants, Cafés, Food Courts (abgedeckt vom [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers))
- **Unterkunft**: Housekeeping, Rezeption, Concierge in Resortlodges
- **Einzelhandel**: Verleihshops, Kleidungsgeschäfte, Ausrüstungsanpassung
- **Schneemachen**: Nachtschichten, die künstlichen Schnee produzieren
- **Pistenpräparierung**: Nachtschichten auf Snow Cats
- **Stundenadministration und Buchungen**: bürobasierte Unterstützungsrollen
- **Ticketing**: Resort-Eintritt und Ticketverkauf

Die Einstufung unter dem relevanten Award hängt von der Rolle ab, nicht von der Tatsache, dass das Resort in einem Skigebiet ist.

## Was zahlt Ski-Resort-Arbeit?

Der Lohn hängt von der Rolle und dem Award ab, der sie abdeckt:

- Liftbetrieb: typischerweise vom Amusement, Events and Recreation Award oder einem spezifischen Tarifvertrag abgedeckt
- Gastronomie: Hospitality Award gilt, mit Basisstundensätzen plus Penalty Rates für Abend-, Wochenend- und Feiertagsarbeit
- Skiunterricht: durch spezifische Vereinbarungen mit dem Resort oder Skischulbetreiber abgedeckt
- Schneemachen und Pistenpräparierung: Nachtaufschläge gelten typischerweise
- Einzelhandel: Retail Industry Award gilt

Casualsätze mit Penalty Rates können substanziell über der Schlagzeilenbasiszahl liegen, besonders für Abend- und Wochenendarbeit. Wochenenden in der Skisaison sind die Spitzenumsatzperioden, und Casualarbeiter arbeiten oft die meisten ihrer Stunden Freitag, Samstag und Sonntag.

## Was ist mit Unterkunftsarrangements?

Die meisten Ski-Resort-Jobs umfassen Berg- oder bergnahe Unterkunft als Teil des Pakets. Die Arrangements variieren:

- Manche Resorts stellen kostenlose oder subventionierte Unterkunft als Fringe Benefit bereit
- Andere berechnen eine wöchentliche Miete, die vom Lohn abgezogen wird
- Manche verlangen von Arbeitern, eigene Unterkunft zu finden, mit begrenzter Unterstützung

Die Steuerbehandlung hängt vom Arrangement ab:

- Wirklich kostenlose oder subventionierte Unterkunft als Teil des Jobs kann ein steuerfreier Fringe Benefit sein
- Unterkunft, die durch einen Lohnabzug bezahlt wird, muss ein rechtmäßiger Abzug sein (siehe unseren Artikel zu [Uniform- und Wäscheabzügen](/de/blog/uniform-laundry-deductions-illegal-australia) für den Test, was rechtmäßig ist)
- Unterkunft, die stark unter Marktwert subventioniert ist, kann Fringe Benefits Taximplikationen für den Arbeitgeber haben

Wenn du eine [Steuererklärung](/de/tax-return) über unseren Service einreichst, prüfen wir das Unterkunftsarrangement und stellen sicher, dass die Löhne und Abzüge die tatsächliche Position widerspiegeln.

## Wie passt spezifizierte Arbeit und das Zweitjahresvisum?

Ski-Resort-Arbeit kann zu den 88 Tagen spezifizierter Arbeit für ein Zweitjahres-Working Holiday Visum zählen, aber nur wenn sie in eine berechtigte Kategorie fällt und in einer designierten regionalen Postleitzahl ist. Die wichtigsten berechtigten Kategorien, unter die Ski-Resort-Arbeit fallen kann, sind:

- Tourismus und Gastronomie in einer designierten abgelegenen oder sehr abgelegenen Gegend
- Manche Wartungs- und Bauarbeiten
- Manche landwirtschaftsnahe Arbeit (weniger üblich in Skiresorts)

Die meisten Skiresortgebiete in Australien sind in designierten regionalen Postleitzahlen, aber nicht alle. Verifiziere die Postleitzahl und den Arbeitstyp, bevor du dich auf Skiarbeit verlässt, um dich für das Zweitjahresvisum zu qualifizieren.

## Was ist mit Workers Compensation im Schneesport?

Schneebezogene Arbeit hat überdurchschnittliche Verletzungsraten. Workers Compensation deckt jeden Angestellten ab, einschließlich Working Holiday Maker, für Verletzungen während bezahlter Arbeit. Die Abdeckung umfasst:

- Schneeverletzungen während Unterricht, Patrouille oder Präparierung
- Ausrutschen und Stürze in Resortgebäuden
- Hebeverletzungen vom Ausrüstungsverleih
- Kälte-bedingte Verletzungen

Siehe unseren Artikel zu [Arbeitsverletzungsrechten](/de/blog/workplace-injury-working-holiday-rights) für das Rahmenwerk.

## Welche Absetzungen können Ski-Resort-Arbeiter beanspruchen?

Working Holiday Maker in Skiresortrollen können typischerweise beanspruchen:

- Resortuniform, falls nicht bereitgestellt
- Rutschfeste Arbeitsschuhe
- Sonnenschutz (Höhenlagensonnenexposition ist erheblich)
- Schutzbrille oder Eyewear speziell für Instruktor- oder Außenrollen
- Ski- oder Snowboardausrüstung, falls direkt für Unterrichtsarbeit genutzt (mit Aufteilung für persönliche Nutzung)
- Kursgebühren für Ski/Snowboardinstruktorqualifikationen
- Ein Anteil der Handykosten für Arbeitskoordination
- Reise zwischen Bergstandorten während des Arbeitstages

Skiinstruktoren mit eigener Ausrüstung können substanzielle Absetzungen haben. Die Persönlichenutzungsaufteilung ist wichtig: Ausrüstung, die zu 60 % für Unterricht und zu 40 % für persönliches Skifahren genutzt wird, ist zu 60 % absetzbar.

## Wie unterstützt unser Service Ski-Resort-Arbeiter?

Für Working Holiday Maker in Skiresortrollen macht unser Team:

- Identifikation des korrekten Awards für jede spezifische Rolle
- Querverweis von Lohnzetteln gegen die korrekte Einstufung und den Satz
- Prüfung von Unterkunftsarrangements auf Steuerimplikationen
- Identifikation von Penalty Rateunterbezahlungen für Abend-, Wochenend- und Feiertagsschichten
- Prüfung jeder Zweitjahresvisumberechtigung basierend auf der Arbeit und dem Standort
- Identifikation legitimer Absetzungen für Instruktorausrüstung und Uniformen
- Einreichung der [Steuererklärung](/de/tax-return), die das volle Bild widerspiegelt

Skisaisons erzeugen konzentrierte Einkünfte über eine 3-bis-4-monatige Periode, was Arbeiter oft in höhere Steuerklassen drückt, falls auch Rest-des-Jahreseinkommen vorhanden ist. [Kontaktiere unser Team](/de/contact), um sicherzustellen, dass deine Skisaison ordentlich verarbeitet wurde.
 
## Bewerben für die Saison: das März-Mai-Fenster

Australische Resorts (Thredbo, Perisher, Falls Creek, Hotham, Buller) stellen für Juni-Oktober in einer Herbst-Rekrutierungswelle ein - Bewerbungen öffnen um den März, und die Staff-Housing-Plätze gehen mit den frühen Zusagen weg. Was die Chancen hebt: RSA in der Tasche für Gastro-Rollen, jede Schnee-Erfahrung für Lifte, Flexibilität über Rollen hinweg. Staff Housing ist die echte Verhandlung: vom Lohn abgezogen ([Regeln für rechtmäßige Abzüge](/de/blog/uniform-laundry-deductions-illegal-australia) prüfen), knapp, und der Unterschied zwischen profitabler und teurer Saison. Award-Zuschläge gelten an Wochenenden und Feiertagen - genau dann, wenn Resorts am vollsten sind: der Roster, den du willst.
`,
  },

  'supermarket-work-coles-woolworths-working-holiday': {
    title: 'Supermarktjobs bei Coles, Woolworths und ALDI mit Working Holiday Visum',
    description: 'Australiens große Supermarktketten stellen Working Holiday Maker an Kassen, Regalauffüllung, Feinkost und Nachtschichten ein.',
    body: `
Australiens große Supermarktketten (Coles, Woolworths, ALDI, IGA und Foodland) beschäftigen Zehntausende Casualarbeiter über ihre Filialnetzwerke. Working Holiday Maker füllen Kassen-, Kundenservice-, Auffüllungs-, Feinkost-, Bäckerei- und Nachtauffüllungsrollen in großer Anzahl. Die Arbeit wird vom General Retail Industry Award (MA000004) abgedeckt, der Mindeststundensätze, Penalty Rates für Wochenend- und Abendschichten und Bedingungen für Casual-Angestellte festlegt. Manche Supermarktketten haben Tarifverträge, die die Award-Sätze anpassen, aber die Vereinbarungen müssen jeden Arbeiter insgesamt besser stellen als der Award.

Supermarktarbeit ist einer der vorhersehbarsten und gut regulierten Einstiegsjobs in Australien, aber Einstufungsfehler und verpasste Penalty Rates passieren immer noch regelmäßig.

## Welche Rollen sind verfügbar?

Große Supermarktarbeitgeber stellen ein in:

- **Kassenoperatoren**: Artikel scannen, Zahlungen verarbeiten, Kundenservice
- **Kundenservice**: Rückgaben, Anfragen, Geschenkkarten, Layby
- **Lebensmittelauffüllung und -lagerung**: Regalauffüllung während Öffnungszeiten
- **Nachtauffüllung**: Regale auffüllen nach Filialschluss
- **Frischabteilungen**: Feinkost, Metzger, Bäckerei, Obst und Gemüse, Meeresfrüchte
- **Liquor (wo zutreffend)**: erfordert ein RSA-Zertifikat
- **Online-Bestellpicking**: Füllen von Online-Bestellungen für Click-and-Collect oder Home Delivery
- **Empfang und Lager**: Dockarbeit, Warenempfang
- **Einsammeln der Einkaufswagen**: auf dem Parkplatz
- **Reinigung**: In-Store-Reinigung während und nach dem Handel

Verschiedene Rollen haben verschiedene Einstufungsstufen unter dem General Retail Industry Award.

## Welche Einstufungen gelten?

Der General Retail Industry Award hat mehrere Stufen:

- **Level 1**: allgemeine Einzelhandelsangestellte mit Standardaufgaben
- **Level 2**: erfahrenere Angestellte mit breiteren Aufgaben
- **Level 3**: Angestellte mit delegierter Autorität, die andere schulen
- **Höhere Stufen**: Vorgesetzte und Manager

Die meisten Working Holiday Maker in Supermarktrollen sind Level 1 oder Level 2. Die Stufe hängt von den tatsächlichen Aufgaben ab, nicht vom Jobtitel.

## Was zahlt Supermarktarbeit?

Der Lohn hängt vom Award (oder Tarifvertrag), der Einstufung und dem Schichtzeiten ab:

- Casual-Stundenlohn für Level 1 unter dem General Retail Award: typischerweise 30 $ bis 33 $ pro Stunde (Basis plus 25 % Casual Loading)
- Samstagaufschlag: typischerweise 25 % zusätzlich
- Sonntagaufschlag: typischerweise 50 % zusätzlich
- Feiertagsaufschlag: typischerweise 125 % zusätzlich
- Abendaufschlag nach 18 Uhr Montag bis Freitag: kleiner Aufschlag
- Nachtaufschlag nach Mitternacht: höherer Satz

Coles und Woolworths haben beide Tarifverträge, die diese Sätze anpassen. Die Vereinbarungen liefern generell bessere Bezahlung als der Award. ALDI tendiert dazu, den Award direkter anzuwenden.

Einen Samstag, Sonntag und einen Wochentagabend zu arbeiten kann den Basisstundenlohn allein erheblich überschreiten.

## Der Tarifvertragsunterschied

Sowohl Coles als auch Woolworths operieren unter Tarifverträgen, die den General Retail Award überschreiben. Die Vereinbarungen typischerweise:

- Setzen Basissätze leicht über dem Award
- Passen die Penalty Ratestruktur an (manchmal höher, manchmal niedriger als der Award)
- Bieten manche zusätzliche Leistungen (Uniformen, Rabatte)
- Wenden andere Regeln für Pausen und Überstunden an

Die Vereinbarung muss den Better Off Overall Test (BOOT) bestehen, was bedeutet, dass jeder Arbeiter unter der Vereinbarung besser gestellt sein muss, als er es unter dem Award wäre. Falls die Vereinbarung Arbeiter schlechter stellt, kann sie nicht rechtlich durchgesetzt werden.

Für Working Holiday Maker ist der praktische Effekt, dass die tatsächliche Lohnstruktur bei Coles oder Woolworths vom Tarifvertrag bestimmt wird, nicht direkt vom General Retail Award. Die Vereinbarung ist öffentlich verfügbar über die Fair Work Commission.

## Wie funktionieren Nachtarbeit und Schichtaufschlag?

Viele Supermärkte fahren Nachtauffüllungsschichten (typischerweise 22 Uhr bis 6 Uhr). Nachtarbeit zieht an:

- Deutlich höhere Schichtaufschlagssätze
- Oft eine tägliche Zulage
- In manchen Vereinbarungen zusätzliche Ruhetagsansprüche

Nachtrollen sind bei Working Holiday Makern beliebt, weil die Bezahlung pro Stunde deutlich höher ist als Tageskassenarbeit, und die Schichten kontinuierlich statt in Splitmustern laufen.

## Workers Compensation

Supermarktarbeit hat typische Einzelhandelsverletzungsmuster: Rückenverletzungen vom Heben, Ausrutschen auf nassen Böden, Schnitte in Feinkost- oder Bäckereiarbeit, repetitive Belastung an Kassen. Workers Compensation deckt jeden Angestellten für Verletzungen während bezahlter Arbeit ab. Siehe unseren Artikel zu [Arbeitsverletzungsrechten](/de/blog/workplace-injury-working-holiday-rights) für das Rahmenwerk.

## Welche Absetzungen können Supermarktarbeiter beanspruchen?

Working Holiday Maker in Supermarktrollen können typischerweise beanspruchen:

- Rutschfeste Arbeitsschuhe
- Spezifische Arbeitskleidung, falls der Arbeitgeber Gegenstände verlangt, die nicht bereitgestellt werden
- Wäsche bereitgestellter Uniformen (wo der Arbeitgeber den Wäscheservice nicht bereitstellt)
- Ein Anteil der Handykosten für Schichtkoordination
- RSA-Zertifikatsgebühren, falls du in der Liquorsektion arbeitest
- Schulungskursgebühren, falls direkt mit der Rolle verbunden

Absetzungen sind meistens bescheiden für Supermarktarbeiter im Vergleich zu Handwerken oder Gastronomie. Siehe unseren Artikel zu [Steuerabsetzungen für Working Holiday Maker](/de/blog/tax-deductions-working-holiday-makers) für das Rahmenwerk.

## Was ist mit Personalrabatten und anderen Leistungen?

Personalrabatte in Supermärkten sind typischerweise:

- Nicht als steuerpflichtiges Einkommen klassifiziert (sie sind kleinere Leistungen)
- Nicht als "gespart" absetzbar
- Nicht Teil der Award-Compliance (Rabatte zählen nicht zum Mindestlohn)

Die Rabatte sind ein nicht-steuerpflichtiges Extra statt eines Steuerthemas.

## Was sind die häufigen Probleme bei großen Supermärkten?

Trotz der gut-definierten Vereinbarungen treten immer noch Probleme auf:

- Verpasste Penalty Rates an Feiertagen (wo der Feiertag auf einen regulären Arbeitstag fällt)
- Klassifizierung auf Level 1 unbefristet trotz erweiterter Aufgaben
- Unbezahlte Pre-Shift-Setupzeit
- Fehlende Nachtaufschläge auf Schichten, die die Auslösezeit überschritten haben
- Probleme mit Leave Loading für festangestelltes Personal, das von Casual übergeht

Die meisten davon sind über den HR-Prozess des Arbeitgebers oder, falls das scheitert, über Fair Work rückforderbar.

## Wie unterstützt unser Service Supermarktarbeiter?

Für Working Holiday Maker in Supermarktrollen macht unser Team:

- Identifikation, ob der Arbeitgeber unter dem Award oder einem Tarifvertrag ist
- Querverweis von Lohnzetteln gegen die anwendbare Vereinbarung und Einstufung
- Prüfung der Penalty Rates für Wochenend-, Abend-, Nacht- und Feiertagsschichten
- Identifikation [unbezahlter Super](/de/blog/super-employer-not-paying-what-to-do), wo Beiträge fehlen
- Einreichung der [Steuererklärung](/de/tax-return), die jeden Arbeitgeber erfasst

Supermarktarbeit ist gut bezahlt relativ zu vielen anderen Einstiegsoptionen, aber die Einstufung und Penalty Rates müssen trotzdem geprüft werden. [Kontaktiere unser Team](/de/contact), um sicherzustellen, dass deine Supermarktarbeit korrekt verarbeitet wurde.
 
## Warum Supermarktarbeit das Stabilitäts-Play für Backpacker ist

Die Großen fahren Enterprise Agreements auf oder über Award-Niveau, Lohnabrechnung, die einfach funktioniert (korrekte Super, echte Payslips, angewandte Zuschläge), und Roster Wochen im Voraus - das exakte Gegenteil des Gastro-Chaos. Night-Fill und Wochenendschichten tragen Zuschläge, die den Effektivsatz deutlich heben; Online-Order-Picking und Trolley-Runden stellen in jeder Stadt laufend ein. Bewirb dich über die Portale der Ketten mit breiten Verfügbarkeitsfenstern (Abende und Wochenenden gewinnen Interviews). Es schlägt selten eine gute Zuschlags-Woche an der Bar - aber es bezahlt dich auch nie falsch, und die Visa-Nachweis-Payslips kommen wie ein Uhrwerk.
`,
  },

  'station-hand-cattle-station-working-holiday-australia': {
    title: 'Stationhand und Cattlestationjobs im Outback Australiens mit Working Holiday Visum',
    description: 'Cattle Stations und entlegene Outback-Anwesen stellen Working Holiday Maker für Viehzucht, Mustering, Zäunen und allgemeine Stationsarbeit ein.',
    body: `
Cattle Stations und abgelegene Outback-Anwesen in Northern Territory, Western Australia, Queensland und South Australia stellen jedes Jahr Working Holiday Maker für Station-Hand-Arbeit ein. Die Rollen umfassen Viehmustering, Rinderhandling, Zäunen, Wassertrogwartung, Maschinenbetrieb, Bohrlocharbeit und allgemeine Instandhaltung des Anwesens über manche der abgelegensten Arbeitsplätze Australiens. Station-Hand-Arbeit wird vom Pastoral Award (MA000035) abgedeckt, zählt zu den 88 Tagen spezifizierter Arbeit für ein Zweitjahresvisum und umfasst fast immer Unterkunft und Mahlzeiten als Teil des Pakets.

Stationsarbeit ist eine der lohnendsten und anspruchsvollsten Erfahrungen, die auf einem Working Holiday Visum verfügbar sind. Die Isolation, das Wetter und die physischen Anforderungen sind erheblich; die praktischen Probleme um Steuer, [Super](/de/superannuation) und Lohn können auch erheblich sein wegen der Abgelegenheit und der Unterkunftsarrangements.

## Was umfasst Station-Hand-Arbeit?

Station-Hand-Aufgaben umfassen typischerweise:

- Viehmustering (zu Pferd, Motorrad, Helikopter-Unterstützung oder Buggy)
- Rinderhandling in Yards (Drafting, Drenchen, Branding, Impfen)
- Kalben und Neugeborenenpflege
- Zaunkonstruktion und -Reparatur
- Wartung von Bohrlöchern und Wasserinfrastruktur
- Traktor- und Maschinenbetrieb
- Instandhaltung des Anwesens (Schuppen, Yards, Fahrzeuge)
- Kochen für das Team in größeren Stationen (Camp-Cook-Rolle)
- Buchhaltung und Verwaltung der Station (weniger üblich für Working Holiday Maker)

Die spezifischen Aufgaben hängen vom Typ der Station ab: eine Cattle Station unterscheidet sich von einer Schafstation, und Betriebsabläufe variieren je nach Region und Größe.

## Wo sind die wichtigsten Stationgebiete?

Die wichtigsten Cattle-Station-Regionen sind:

- **Northern Territory**: Barkly Tableland, Victoria River District, Top End
- **Western Australia**: Kimberley, Pilbara, mittlerer Westen, südlicher Wheatbelt
- **Queensland**: Channel Country, Nordwestqueensland, Gulf Country
- **South Australia**: Ferner Norden, Eyrehalbinsel

Jede Region hat verschiedene Klimamuster (Regen- und Trockenzeiten im Norden; heiße Sommer und kühlere Winter im Süden), was das Timing der Arbeit beeinflusst.

## Welcher Award gilt?

Station-Hand-Arbeit wird vom Pastoral Award (MA000035) abgedeckt, der Mindeststundensätze, Einstufungen und Bedingungen festlegt. Die Einstufungen umfassen:

- **Farm and Livestock Hand Level 1**: neue Arbeiter, einfache Aufgaben unter Aufsicht
- **Farm and Livestock Hand Level 2**: erfahrene Arbeiter mit etwas Autonomie
- **Farm and Livestock Hand Level 3**: qualifizierte Arbeiter, Maschinenbetrieb, beaufsichtigte Teams
- **Höhere Stufen**: Leading Hands, Head Stockmen, Station Managers

Spezifische Einstufungen existieren auch für Schafarbeit (Scherer, Schuppenhelfer, Klasser), großflächiger Anbauoperatoren und andere spezialisierte Rollen.

## Was zahlt Stationsarbeit?

Lohnstrukturen auf Cattle Stations variieren weit:

- Stündliche Award-Sätze (typischerweise 26 $ bis 34 $ pro Stunde für Casualarbeiter je nach Einstufung)
- All-Found-Arrangements: ein Wochensatz, der Unterkunft und Mahlzeiten umfasst
- Tagessätze für spezifische Musters oder Kampagnen

Der Pastoral Award legt den Mindeststundenlohn als die rechtliche Untergrenze fest. Wo Unterkunft und Mahlzeiten bereitgestellt werden, kann der Wert von den Löhnen innerhalb strikter Grenzen, die im Award festgelegt sind, abgezogen werden. Viele Stationen operieren auf Tarifverträgen oder individuellen Arrangements, die die Struktur anpassen, aber immer noch den Better Off Overall Test gegen den Award bestehen müssen.

Manche Stationen bieten auch Boni für spezifische Ergebnisse (Rindergewichtszunahme, Kalbungsraten, Projektabschluss), die Teil des steuerpflichtigen Einkommens bilden.

## Was ist mit Unterkunft und dem "All-Found"-Arrangement?

Die meisten Station Handrollen umfassen Unterkunft und Mahlzeiten als Teil des Pakets. Das ist das "All-Found"-Arrangement, das im ländlichen Australien üblich ist. Die Struktur ist typischerweise:

- Die Station stellt ein Zimmer oder geteilte Quartiere im Homestead oder in der Personalunterkunft bereit
- Mahlzeiten werden in der Stationsküche bereitgestellt oder als Rationen für abgelegene Camps
- Ein Wochensatz wird in bar für persönliche Ausgaben gezahlt

Die Steuerbehandlung hängt vom genauen Arrangement ab:

- Der Wert von Unterkunft und Mahlzeiten kann als steuerfreier Fringe Benefit in vielen echten Remotestationfällen betrachtet werden
- Wo Unterkunft von Löhnen "abgezogen" wird, muss der Abzug rechtmäßig und innerhalb der Award-Grenzen sein
- Living-away-from-home-Zulagen können für manche Einstufungen gelten

Die Abgelegenheitsausnahmen für Fringe Benefits Tax gelten oft für Cattle Stations in wirklich abgelegenen Gegenden, was das Paket steuer-effizienter machen kann, als der Schlagzeilenbarlohn vermuten lässt.

## Wie funktioniert spezifizierte Arbeit und das Zweitjahresvisum?

Station-Hand-Arbeit zählt zu den 88 Tagen spezifizierter Arbeit für ein Zweitjahres-Working Holiday Visum, vorausgesetzt:

- Die Arbeit wird in einer designierten regionalen Postleitzahl erbracht (die meisten Cattle Stations sind es)
- Die Arbeit fällt in die berechtigten "spezifizierte Arbeit"-Kategorien (Tiercultivation, einschließlich Vieh)
- Die Arbeit ist bezahlt
- Die Arbeit ist mit Lohnzetteln dokumentiert und ans ATO gemeldet

Die meisten Stationgebiete sind in berechtigten Postleitzahlen, und die meiste Stationsarbeit passt in die berechtigten Kategorien. Das wichtigste praktische Problem ist sicherzustellen, dass die Arbeit ordentlich für den Einwanderungsantrag dokumentiert ist.

## Was ist mit Workers Compensation in abgelegenen Gegenden?

Workers Compensation deckt jeden Angestellten auf einer Cattle Station ab, unabhängig von Abgelegenheit oder Dienstzeit. Die Abdeckung umfasst:

- Medizinische Behandlungskosten (einschließlich Luftambulanzevakuierung aus abgelegenen Gegenden)
- Wöchentliche Lohnzahlungen, während du nicht arbeiten kannst
- Einmalzahlungen für dauerhafte Beeinträchtigung

Stationsarbeit hat höhere Verletzungsraten als die meisten Branchen wegen:

- Tierhandlingverletzungen (Tritte, Quetschen, Stürze vom Pferd)
- Fahrzeug- und Maschinenvorfälle auf rauem Gelände
- Hitze-bedingter Erkrankung in den Regen-/Trockenzeiten
- Schlangen- und anderen Tierbegegnungen
- Isolation, die Notfallreaktion kompliziert

Der Royal Flying Doctor Service und andere abgelegene medizinische Dienste sind manchmal der einzige Zugang zur Pflege, und Workers Compensation deckt die Kosten ab.

Siehe unseren Artikel zu [Arbeitsverletzungsrechten](/de/blog/workplace-injury-working-holiday-rights) für das Rahmenwerk.

## Welche Absetzungen können Station Hands beanspruchen?

Working Holiday Maker in Stationrollen können typischerweise beanspruchen:

- Arbeitsstiefel (Reitstiefel, Arbeitsstiefel für Yardarbeit)
- Hut (Akubra oder ähnlicher Schutzhut für Sonnenexposition)
- Arbeitskleidung (langärmlige Shirts, Reithosen, Sonnenschutz)
- Handschuhe
- Persönliche Werkzeuge (Messer, Leatherman, Zäunwerkzeuge, falls vom Arbeiter bereitgestellt)
- Sattel und Tack, falls vom Arbeiter für Vieharbeit bereitgestellt
- Handykosten für den arbeitsbezogenen Anteil

Station Hands mit eigener Ausrüstung (Sättel, Seile, Hunde in manchen Fällen) können erhebliche Absetzungen haben. Die Absetzbarkeit hängt davon ab, ob die Ausrüstung hauptsächlich für die Arbeit oder für persönliche Nutzung ist.

## Wie unterstützt unser Service Station Hands?

Für Working Holiday Maker in Station Handrollen macht unser Team:

- Identifikation der korrekten Einstufung unter dem Pastoral Award
- Prüfung von Unterkunfts- und Mahlzeitenarrangements auf Steuerimplikationen
- Querverweis von Lohnzetteln gegen den korrekten Satz
- Prüfung jeder Anpassung für abgelegene Gegend oder Fringe Benefits
- Identifikation [unbezahlter Super](/de/blog/super-employer-not-paying-what-to-do), wo Beiträge fehlen
- Erfassung legitimer arbeitsbezogener Absetzungen
- Koordinierung der Dokumentation für Zweitjahresvisaanträge
- Einreichung der [Steuererklärung](/de/tax-return), die das volle Bild erfasst

Stationsarbeit hat einzigartige Steuerkomplikationen wegen der Abgelegenheit, der Unterkunftsarrangements und der oft unstrukturierten Zahlungsmuster. [Kontaktiere unser Team](/de/contact), bevor du Australien verlässt, um sicherzustellen, dass deine Stationsarbeit korrekt verarbeitet wurde.
 
## Die Stations-Woche: was der Pastoral Award wirklich abdeckt

Stationsarbeit läuft unter dem Pastoral Award: Mindestsätze nach Einstufung, Kost-und-Logis-Abzüge gedeckelt auf dokumentierte angemessene Beträge. Die Remote-Checkliste vor der Zusage: schriftliche Bedingungen inklusive aller Abzüge, Klarheit über bezahlte Stunden (Muster-Starts im Morgengrauen zählen; "an den Yards helfen" nach dem Abendessen zählt), und Telefon/Internet, um [die ATO-Daten aktuell zu halten](/de/blog/how-to-update-address-with-ato) - Stationen sind der Ort, an dem TFN-Briefe und Super-Post verschwinden. Die Gegenseite ist real: monatelang minimale Ausgaben, Visa-Tage sammeln sich, und Fähigkeiten, die jede Saison neu einstellen.
`,
  },

  'super-rate-12-percent-2025-2026-increase': {
    title: 'Superannuationsatz auf 12 % ab 1. Juli 2025 erhöht: was es für Working Holiday Maker bedeutet',
    description: 'Ab 1. Juli 2025 stieg die Superannuation Guarantee von 11,5 % auf 12 %. Im Folgenden findest du die Auswirkungen für dich.',
    body: `
Ab 1. Juli 2025 stieg der [Superannuation](/de/superannuation) Guarantee (SG)-Satz, den australische Arbeitgeber in Arbeitnehmersuperfonds einzahlen müssen, von 11,5 % auf 12 % der Ordinary Time Earnings. Das ist der letzte Schritt einer geplanten Reihe von Erhöhungen, die 2014 begann und jetzt abgeschlossen ist: Der Satz bleibt ab 2025-26 bei 12 %. Für Working Holiday Maker bedeutet die Änderung etwas größere Superbeiträge auf jeden verdienten Dollar und eine entsprechend größere [DASP](/de/blog/what-is-dasp-super-withdrawal)-Zahlung bei Abreise aus Australien.

Die 0,5-Prozentpunkte-Erhöhung sieht klein aus, summiert sich aber über ein Working-Holiday-Jahr. Bei 40.000 $ Lohn beträgt der Unterschied zwischen 11,5 % und 12 % 200 $ zusätzliche Superbeiträge, die in die spätere DASP-Zahlung fließen.

## Was ist die Superannuation Guarantee?

Die Superannuation Guarantee ist der Mindestprozentsatz der Ordinary Time Earnings eines Angestellten, den ein australischer Arbeitgeber in einen Superfonds einzahlen muss. Der Satz ist durch Bundesgesetz festgelegt und gilt für fast jeden Angestellten - einschließlich Working Holiday Maker - unabhängig vom Visastatus, der Beschäftigungsdauer oder ob der Arbeiter Casual, Teilzeit oder Vollzeit ist. Siehe unseren Artikel zu [wie viel Super dein Arbeitgeber zahlen sollte](/de/blog/how-much-super-should-employer-pay) für das zugrundeliegende Grundprinzip.

## Die vollständige Historie der Satzerhöhungen

Der Superannuation-Guarantee-Satz ist über mehr als ein Jahrzehnt schrittweise gestiegen:

- 2013-14: 9,25 %
- 2014-15 bis 2020-21: 9,5 %
- 2021-22: 10 %
- 2022-23: 10,5 %
- 2023-24: 11 %
- 2024-25: 11,5 %
- **Ab 2025-26: 12 %** (Endsatz)

Der Satz bleibt jetzt bei 12 %. Es sind keine weiteren Erhöhungen geplant - ein Working Holiday Maker, der ab 1. Juli 2025 in Australien zu arbeiten beginnt, erhält also die vollen 12 % auf jede Lohnzahlung.

## Was bedeutet das in Dollar?

Der Unterschied von 0,5 Prozentpunkten summiert sich über die Verdienste eines Working Holiday Makers:

- **20.000 $ Lohn**: 11,5 % = 2.300 $ Super, 12 % = 2.400 $ Super → 100 $ mehr
- **40.000 $ Lohn**: 11,5 % = 4.600 $ Super, 12 % = 4.800 $ Super → 200 $ mehr
- **60.000 $ Lohn**: 11,5 % = 6.900 $ Super, 12 % = 7.200 $ Super → 300 $ mehr

Nach der 65 %-[DASP-Steuer für Working Holiday Maker](/de/blog/dasp-tax-rate-65-percent-explained) bekommt der Arbeiter 35 % der Brutto-Super. Die Nettowirkung auf die DASP-Zahlung ist also grob:

- 20.000 $ Lohn: 35 $ mehr auf der Tasche
- 40.000 $ Lohn: 70 $ mehr auf der Tasche
- 60.000 $ Lohn: 105 $ mehr auf der Tasche

Die DASP-Steuer von 65 % ist ein viel größerer Faktor als die Satzerhöhung, aber die Satzerhöhung trägt trotzdem zur späteren Zahlung bei.

## Wann gilt der neue Satz?

Der 12 %-Satz gilt auf Ordinary Time Earnings, die am oder nach dem 1. Juli 2025 gezahlt werden. Auslöser ist das Datum der Zahlung, nicht das Datum, an dem die Arbeit erbracht wurde. Das heißt:

- Im Juni 2025 erbrachte, aber im Juli 2025 gezahlte Arbeit: 12 % gilt
- Im Juli 2025 erbrachte, aber Anfang August 2025 gezahlte Arbeit: 12 % gilt
- Vierteljährliche Superzahlung für das April-Juni 2025-Quartal, gezahlt bis 28. Juli 2025: 11,5 % gilt (der Satz zum Zeitpunkt der Verdienste)

Arbeitgeber, die vierteljährliche Superzahlungen abwickeln, müssen den korrekten Satz auf jedes Quartal anwenden - was manchmal zu Unterzahlung führt, wenn Arbeitgeber auf den neuen Satz für alte Verdienste zurückgreifen.

## Wie prüfst du, ob dein Arbeitgeber 12 % zahlt?

Der Arbeitgeber muss die Superansammlung auf deinem Lohnzettel zeigen und den Beitrag mindestens vierteljährlich an deinen Fonds überweisen. Um zu prüfen, ob der Satz korrekt ist:

1. Schau auf deinem Lohnzettel auf den gezeigten Superbetrag
2. Teile diesen Betrag durch deine Ordinary Time Earnings für die Lohnperiode
3. Das Ergebnis sollte 12 % (0,12) für alle Einkünfte ab 1. Juli 2025 sein

Wenn das Ergebnis 11,5 % oder niedriger ist, nutzt der Arbeitgeber einen veralteten Satz. Manche Lohnsysteme haben sich langsam aktualisiert, und manche Arbeitgeber setzen Sätze manuell statt sich auf automatische Updates zu verlassen. Die Unterzahlung ist rückforderbar, und unser Team kümmert sich darum als Teil der Vorbereitung der [Steuererklärung](/de/tax-return) oder des DASP-Antrags.

## Was, wenn du über mehrere Satzperioden gearbeitet hast?

Ein Working Holiday Maker, der vor 1. Juli 2024 (bei 11 %) zu arbeiten anfing und bis 2025-26 (bei 12 %) weiterarbeitete, hat über die Reise Super zu drei verschiedenen Sätzen bekommen:

- Arbeit in 2023-24: 11 %
- Arbeit in 2024-25: 11,5 %
- Arbeit in 2025-26: 12 %

Jeder Satz gilt auf die Periode, in der die Löhne verdient wurden. Das Verfolgen des korrekten Satzes über Satzänderungen hinweg ist eines der technischen Probleme, um das sich unser Team beim Abstimmen der Superbeiträge während eines DASP-Antrags kümmert. Siehe unseren Artikel zu [unbezahlter Super und was zu tun ist](/de/blog/super-employer-not-paying-what-to-do).

## Ändert die Satzerhöhung sonst etwas?

Der 12 %-Satz ist die einzige Zahl, die sich geändert hat. Die anderen Teile des Supersystems sind gleich geblieben:

- Super muss weiterhin mindestens vierteljährlich gezahlt werden
- Super muss auf Ordinary Time Earnings gezahlt werden (nicht Überstunden, in den meisten Fällen)
- Der [DASP-Steuersatz von 65 %](/de/blog/dasp-tax-rate-65-percent-explained) für Working Holiday Maker bleibt unverändert
- Die Schwellenregeln für Beiträge (das alte 450 $-Monatsminimum wurde 2022 abgeschafft und bleibt abgeschafft)
- Die Wahl des Superfonds liegt weiterhin beim Angestellten über ein Standard Choiceformular
- [Super Stapling](/de/blog/super-stapling-rule-australia) gilt weiterhin für neue Arbeitsbeziehungen

## Was war mit der Schwellenänderung 2022?

Eine verwandte Änderung, die du kennen solltest: vor Juli 2022 mussten Arbeitgeber Super nur auf monatliche Löhne über 450 $ zahlen. Seit 1. Juli 2022 ist diese Schwelle abgeschafft, und Super ist auf jeden Dollar Ordinary Time Earnings fällig - egal wie klein. Das war eine erhebliche Änderung für Working Holiday Maker in Casualgastronomie, Einzelhandel und ähnlichen Rollen, in denen einzelne Lohnperioden oft unter 450 $ lagen. Jeder verdiente Dollar erzeugt jetzt Super zu 12 %.

## Wie kümmert sich unser Service um die Satzänderung?

Wenn du einen DASP- oder [Steuererklärung](/de/tax-return)-Antrag über unseren Service einreichst:

- Wir gleichen Superbeiträge über Satzwechselgrenzen ab (10,5 % zu 11 % zu 11,5 % zu 12 %)
- Wir identifizieren Muster von Untersatzzahlungen einzelner Arbeitgeber
- Wir verfolgen unbezahlte Super über den ATO Superannuation Guarantee Chargeprozess, wo Beiträge fehlen
- Wir berechnen die erwartete Brutto- und Netto-DASP-Zahlung basierend auf den korrekten Sätzen
- Wir reichen DASP-Anträge bei jedem Fonds mit Beiträgen ein

Der 12 %-Satz ist jetzt das endgültige Niveau der Superannuation Guarantee. Jeder Working Holiday Maker, der ab Juli 2025 in Australien arbeitet, sollte diesen Satz korrekt angewendet sehen. [Kontaktiere unser Team](/de/contact), damit deine Superbeiträge dem Satz entsprechen, der in jeder Lohnperiode deiner Zeit in Australien gegolten haben sollte.
 `,
  },

  'bringing-money-into-australia-10000-reporting-threshold': {
    title: 'Geld nach Australien bringen: die 10.000-Dollarmeldegrenze und was Working Holiday Maker wissen müssen',
    description: 'Reisende können beliebig viel Bargeld nach Australien bringen oder überweisen, aber Bewegungen ab 10.000 $ müssen gemeldet werden.',
    body: `
Ein Working Holiday Maker, der in Australien ankommt, kann jeden Betrag an Geld ins Land bringen, in bar oder per Banküberweisung. Es gibt keine gesetzliche Grenze für den Betrag, den du bringen kannst, und der Akt, Geld nach Australien zu bringen, löst von sich aus keine Steuer aus. Allerdings müssen Bewegungen physischer Währung von 10.000 A$ oder mehr (oder das Fremdwährungsäquivalent) bei der Einreise nach Australien an AUSTRAC, die australische Finanzaufklärungsstelle, gemeldet werden. Internationale elektronische Überweisungen von 10.000 A$ oder mehr werden automatisch von der Bank oder dem Geldtransferdienstleister gemeldet.

Die Meldepflicht existiert, um Finanzflüsse für Geldwäsche und Erträge aus Straftaten zu überwachen, nicht um legitime Ersparnisse zu besteuern. Working Holiday Maker sorgen sich regelmäßig, dass das Bringen ihrer Ersparnisse nach Australien eine Steuerrechnung erzeugt: das ist jedoch nicht der Fall, sofern die Mittel legitim verdiente Ersparnisse sind.

## Was ist die 10.000 $-Meldepflicht?

Die australischen Gesetze zur Geldwäschebekämpfung verlangen, dass jede Bewegung physischer Währung von 10.000 A$ oder mehr (oder das Äquivalent in einer anderen Währung) nach Australien hinein oder aus Australien heraus an AUSTRAC gemeldet wird. Der Bericht wird über den Cross-Border Movement Report eingereicht, der eingereicht werden kann:

- Am Flughafen bei Ankunft oder Abreise
- Online über AUSTRACs Meldesystem
- An der Grenze mit Formularen zur Bargelddeklaration, die von der Australian Border Force bereitgestellt werden

Die Schwelle gilt für **physische Währung** (Geldscheine und Münzen). Sie umfasst Bargeld, das in Person getragen wird, im Gepäck, in der Post oder durch einen Kurier gesendet. Die Regel ist nicht spezifisch für Working Holiday Maker; sie gilt für jede Person, die Australien betritt oder verlässt.

Für elektronische Überweisungen löst dieselbe Schwelle von 10.000 A$ eine automatische Meldung durch die Bank oder den Geldtransfer-Dienstleister an AUSTRAC aus. Du reichst nicht persönlich etwas ein; die Bank kümmert sich um die Meldung.

## Erzeugt die Meldung eine Steuerpflicht?

Nein. Die Meldung selbst erzeugt keine Steuerpflicht. Das Australian Taxation Office (ATO) und AUSTRAC sind separate Agenturen mit verschiedenen Rollen:

- **AUSTRAC** überwacht Finanzflüsse für Geldwäsche, Terrorismusfinanzierung und schweres organisiertes Verbrechen
- **Das ATO** verwaltet das Steuerrecht

25.000 $ legitimer Ersparnisse von Deutschland zu bringen, um eine Working Holiday zu starten, wird an AUSTRAC an der Grenze gemeldet, aber keine Steuer wird ausgelöst. Die Ersparnisse sind vorbestehend, wurden in deinem Heimatland verdient und (wo anwendbar) besteuert, und sind kein australisches Quelleinkommen.

Was ein Steuerproblem erzeugen kann, ist, wenn das Geld **Einkommen ist, das in Australien verdient, aber nicht deklariert wurde**, oder wenn es Teil eines Arrangements ist, das das ATO als Steuervermeidung betrachtet. Für gewöhnliche Ersparnisse von Working Holiday Makern gibt es kein Problem.

## Was ist mit Geld unter 10.000 $ bringen?

Falls du weniger als 10.000 A$ (oder Äquivalent) bringst, ist keine Meldung erforderlich. Die Schwelle ist pro Bewegung, nicht pro Jahr, also:

- 9.000 $ in bar bei Ankunft bringen: keine Meldung nötig
- Eine Auslandsüberweisung von 9.000 $ auf dein australisches Bankkonto erhalten: die Bank meldet nichts
- 11.000 $ in bar bringen: AUSTRAC-Bericht erforderlich
- Eine Auslandsüberweisung von 15.000 $ erhalten: die Bank meldet automatisch

Größere Beträge absichtlich zu splitten, um die Meldeschwelle zu vermeiden (genannt "Structuring"), ist selbst eine Straftat unter den Antigeldwäschegesetzen. 9.000 $ heute und 9.000 $ morgen zu senden mit der Absicht, den 10.000 $-Bericht zu vermeiden, ist eine strukturierte Transaktion und kann Strafen nach sich ziehen, die deutlich schwerwiegender sind als die ursprüngliche Meldepflicht. Die einfache Position ist: falls dein Transfer über 10.000 $ ist, lass die Bank ihn melden; der Bericht schadet dir nicht.

## Geld aus Australien senden

Dieselben Regeln gelten in die entgegengesetzte Richtung. Working Holiday Maker, die Australien verlassen und ihre Ersparnisse, [DASP](/de/blog/what-is-dasp-super-withdrawal)-Zahlung oder [Steuererstattung](/de/blog/what-is-a-tax-refund-australia) nach Hause überweisen, überweisen typischerweise Beträge über 10.000 A$ zum Ende ihres Aufenthalts. Die Bank meldet den ausgehenden Transfer automatisch. Deine Steuerpflicht auf den ausgehenden Transfer wird in unserem Artikel zu [Geld ins Ausland überweisen](/de/blog/transferring-money-overseas-australia-tax) behandelt.

## Bankkontenmeldung und das ATO

Separat von AUSTRAC melden australische Banken Zinseinkünfte ihrer Kunden direkt ans ATO. Das bedeutet:

- Falls du ein australisches Bankkonto mit deiner TFN eröffnest, meldet die Bank die Zinsen ans ATO
- Das ATO füllt deine [Steuererklärung](/de/tax-return) mit dem Betrag der Bankzinsen vor
- Die Zinsen müssen in der Erklärung deklariert werden, unabhängig vom Betrag

Falls du ein Bankkonto eröffnest, ohne deine TFN anzugeben, behält die Bank auf jegliche gezahlten Zinsen Steuer zum Höchstsatz ein, was zurückgeholt werden kann, wenn du die Erklärung einreichst.

## Praktische Anleitung für Working Holiday Maker

Für die meisten Working Holiday Maker ist der praktische Ansatz:

1. **Die Mittel legitim bringen** - Bargeld an der Grenze deklariert, falls über 10.000 A$, oder internationaler Transfer durch einen regulierten Anbieter (Bank, Wise, Revolut, OFX)
2. **Aufzeichnungen der Quelle behalten** - Kontoauszüge aus deinem Heimatland, die die Ersparnisse vor dem Transfer zeigen
3. **Einen regulierten Geldtransferservice nutzen** - Banküberweisung oder lizenzierter Remitter, nicht informelle Kanäle
4. **Schnell ein australisches Bankkonto eröffnen** - sodass das Geld empfangen und sicher gehalten werden kann
5. **Der Bank deine TFN geben** - sobald du sie hast, um die Einbehaltung zum Höchstsatz auf Zinsen zu vermeiden
6. **Die AUSTRAC-Deklarationsquittung aufbewahren** - falls du Bargeld an der Grenze deklariert hast

Die Aufzeichnungen zählen weniger für die eingehende Seite und mehr, falls das ATO jemals fragt, woher das Geld kam (selten für Working Holiday Maker, aber möglich).

## Wann das ATO über transferierte Mittel fragen könnte

Das ATO hat Zugriff für Datenabgleich auf AUSTRAC-Berichte und Bankunterlagen. Falls du mit erheblichen Mitteln ankamst und dann eine Steuererklärung hast, die nicht zum Lebensstil passt, könnte das ATO Fragen stellen. Die Standarderklärungen sind einfach:

- Die Mittel waren vorbestehende Ersparnisse vor Ankunft
- Die Mittel waren ein Geschenk von Familie
- Die Mittel waren Erlöse aus dem Verkauf eines Fahrzeugs, einer Immobilie oder Investitionen vor der Reise

Jede davon ist einfach mit Kontoauszügen aus dem Heimatland zu belegen. Das Problem entsteht nur, falls die Mittel tatsächlich nicht gemeldetes australisches Einkommen darstellen, was für Working Holiday Maker selten ist, aber passiert (Schwarzarbeit, die nie gemeldet wurde, zum Beispiel).

## Was ist mit Geldtransferbetrug?

Working Holiday Maker werden regelmäßig Ziel von Betrügereien beim Geldtransfer. Die häufigsten Muster:

- "Schick mir deine Bankdaten und TFN, damit ich dir Geld überweisen kann"
- "Ich gebe dir einen großartigen Wechselkurs, schick einfach zuerst das Bargeld"
- Romance Scams (Liebesbetrug), bei denen Geld auf ausländische Konten überwiesen wird
- Falsche Jobangebote, die Vorabzahlung erfordern

Für legitime internationale Transfers nutze regulierte Anbieter (Banken, Wise, Revolut, OFX). Zum Wechseln von Bargeld nutze lizenzierte Wechselstuben. Überweise niemals Geld aufgrund von Versprechen, die über Messaging-Apps von Personen gemacht werden, die du nicht persönlich getroffen hast.

## Wie unterstützt unser Service bei Fragen zu Geldtransfers?

Auch wenn unser Team kein Geldtransfer-Dienstleister ist, ist die Steuerseite internationaler Transfers innerhalb unseres Services. Wenn du über uns einreichst, führen wir folgendes durch:

- Wir berücksichtigen jegliches Einkommen aus ausländischen Quellen, das in der australischen [Steuererklärung](/de/tax-return) erscheinen muss
- Wir gleichen die von australischen Banken gemeldeten Zinsen mit deinem deklarierten Einkommen ab
- Wir koordinieren alle steuerlichen Überlegungen für Mittel, die Australien verlassen (siehe unseren Artikel zu [Geld ins Ausland überweisen](/de/blog/transferring-money-overseas-australia-tax))
- Wir identifizieren die korrekte steuerliche Behandlung steuerfreier Transfers (legitime Ersparnisse, Geschenke, Erbschaften)

Für die meisten Working Holiday Maker ist das Mitbringen von Ersparnissen unkompliziert und steuerneutral. [Kontaktiere unser Team](/de/contact), falls du spezifische Bedenken hast, wie ein Transfer mit deiner Steuerposition interagiert.
 
## Bargeld ab 10.000 $: deklarieren oder riskieren

AUD 10.000 oder mehr in bar (Fremdwährung äquivalent zählt) müssen bei der Einreise deklariert werden. Undeklariertes Bargeld kann beschlagnahmt werden, die Rückholung ist mühsam, und absichtliches Stückeln (Structuring - auf Mitreisende verteilen, um unter der Schwelle zu bleiben) ist selbst strafbar. Der deutsche Praxishinweis: Große Summen bar mitzubringen ist ohnehin unnötig - Überweisung oder Transferdienste sind meldefrei für dich (die Institute melden), sicherer und im Kurs meist besser. Die Deklaration selbst kostet nichts und hat keine Nachteile - wer bar reist, deklariert einfach.
`,
  },

  'ato-tax-debt-failure-to-pay-penalty-australia': {
    title: 'ATO-Strafen für unbezahlte Steuerschulden: General Interest Charge und Failure to Pay',
    description: 'Wenn du eine Steuerschuld beim ATO hast und nicht rechtzeitig zahlst, fällt die General Interest Charge täglich an und die Failure-to-Pay-Strafe wird fällig.',
    body: `
Das Australian Taxation Office (ATO) berechnet Zinsen und Strafen auf Steuerschulden, die nicht bis zum Fälligkeitsdatum gezahlt werden. Die General Interest Charge (GIC) wird täglich auf den unbezahlten Betrag verzinst zu einem Satz, der deutlich über dem Leitzins liegt. Separat kann eine Failure-to-Pay-Strafe von einer Penalty Unit (330 $ in 2025-26) für jede 28 Tage gelten, dass die Schuld unbezahlt bleibt, bis zu einem Maximum von fünf Einheiten (1.650 $ pro Jahr pro Schuld). Die Strafen sind unabhängig von den Failure-to-Lodge-Strafen, die für [späte Steuererklärungen](/de/blog/late-tax-return-penalty-working-holiday) gelten.

Für Working Holiday Maker entstehen Steuerschulden am häufigsten aus [ABN](/de/abn)-Einkommen mit nicht während des Jahres einbehaltener Steuer, aus geänderten Steuerbescheiden nach Einreichung einer Erklärung, oder aus BAS-Pflichten für [Ridesharefahrer](/de/blog/uber-driver-working-holiday-australia), die GST nicht überwiesen haben.

## Wann entsteht eine Steuerschuld?

Eine Steuerschuld ans ATO kann entstehen aus:

- Einer [Steuererklärung](/de/tax-return), die einen geschuldeten Saldo zeigt (statt einer Rückerstattung)
- einem geänderten Steuerbescheid, nachdem die ursprüngliche Erklärung eingereicht wurde, die die zahlbare Steuer erhöht
- Einem unbezahlten Business Activity Statement (BAS) für GST-registrierte ABN-Inhaber
- Einer unbezahlten Pay-as-you-go (PAYG)-Rate für ABN-Inhaber mit erheblichem Einkommen
- Einem Strafbescheid für späte Einreichung oder zu niedrig angegebenes Einkommen (siehe unseren Artikel zu [Strafen für zu niedrig angegebenes Einkommen](/de/blog/understating-income-ato-penalty-working-holiday))
- Einer gescheiterten Departing Australia [Superannuation](/de/superannuation) Payment (DASP), die zu zurückgeforderter Steuer führte

Die Schuld wird im Notice of Assessment (Steuerbescheid) angegeben, der vom ATO nach Verarbeitung der Erklärung oder Statement ausgestellt wird, mit einem Fälligkeitsdatum für die Zahlung.

## Was ist der General Interest Charge?

Der General Interest Charge (GIC) sind die täglich anfallenden Zinsen, die das ATO auf unbezahlte Steuer anwendet. Der Satz wird vierteljährlich festgelegt und ist deutlich höher als der Leitzins. Ab 2025-26 ist der GIC-Satz etwa 11 % pro Jahr, täglich verzinst.

Der GIC gilt ab dem ursprünglichen Fälligkeitsdatum der Schuld, bis die Schuld vollständig bezahlt ist. Auch eine kleine ursprüngliche Schuld wächst schnell:

- 1.000 $ Steuerschuld 1 Jahr unbezahlt: etwa 115 $ GIC hinzugefügt
- 1.000 $ Steuerschuld 3 Jahre unbezahlt: etwa 370 $ GIC hinzugefügt
- 3.000 $ Steuerschuld 2 Jahre unbezahlt: etwa 700 $ GIC hinzugefügt

Der GIC läuft weiter, unabhängig davon, wo du in der Welt bist. Australien zu verlassen pausiert ihn nicht.

## Was ist die Failure-to-Pay-Strafe?

Separat vom GIC kann das ATO eine Failure-to-Pay-Strafe anwenden. Die Strafe ist eine Penalty Unit (330 $ in 2025-26) für jede 28 Tage, die die Schuld unbezahlt bleibt, gedeckelt bei fünf Einheiten (1.650 $ pro Jahr pro Schuld).

Die Failure-to-Pay-Strafe wird weniger konsistent angewendet als der GIC. Das ATO kann sie anwenden, wo:

- Die Schuld erheblich ist
- Es ein Muster der Nichtzahlung gibt
- Der Steuerzahler sich nicht mit dem ATO über die Schuld engagiert hat
- Die Schuld das Ergebnis absichtlich zu niedriger Angabe ist (wofür auch höhere Strafen gelten können)

Für Working Holiday Maker ist der GIC die zuverlässigere Sorge. Die Failure-to-Pay-Strafe wird manchmal erlassen, falls das zugrundeliegende Problem gelöst wird.

## Wie unterscheidet sich das von der späten Einreichungsstrafe?

Die zwei Strafsysteme sind unabhängig:

- **Failure-to-Lodge (FTL)**: angewendet, wenn eine [Steuererklärung](/de/tax-return) spät eingereicht wird. 330 $ pro 28 Tage, max 1.650 $. Siehe unseren Artikel zu [späten Steuererklärungsstrafen](/de/blog/late-tax-return-penalty-working-holiday).
- **Failure-to-Pay (FTP) + GIC**: angewendet, wenn eine Steuerschuld nicht bis zum Fälligkeitsdatum gezahlt wird. 330 $ pro 28 Tage plus tägliche Zinsen zu etwa 11 % pro Jahr.

Ein Working Holiday Maker, der spät einreicht UND spät zahlt, kann mit beiden Strafsystemen auf derselben Schuld getroffen werden. Die Gesamtkosten können den ursprünglich geschuldeten Steuerbetrag erheblich überschreiten.

## Wann ist eine Steuerschuld fällig?

Für eine Person, die über einen registrierten Steueragenten einreicht, ist die Standardzahlungsfrist 21 Tage nach Ausstellung des Notice of Assessment (Steuerbescheids) (was meistens innerhalb weniger Wochen nach Einreichung ist). Für Selbsteinreicher ist die Zahlungsfrist typischerweise bis zum 21. November nach Ende des Steuerjahres.

Für BAS-Schulden ist die Zahlung am selben Datum fällig, an dem das BAS fällig ist, was 28 Tage nach Ende des Quartals für die meisten Einreicher ist.

## Was, wenn du den vollen Betrag nicht zahlen kannst?

Das ATO bietet Zahlungspläne für Steuerzahler an, die die volle Schuld nicht sofort zahlen können:

- Kurzfristige Pläne (unter 12 Monaten): generell auf Antrag verfügbar, mit dem GIC, der weiter akkumuliert
- Langfristige Pläne (über 12 Monate): erfordern mehr Dokumentation und können verlangen, dass Zinsen separat gezahlt werden
- Härtefallarrangements: für Steuerzahler in echter finanzieller Schwierigkeit

Sich frühzeitig mit dem ATO in Verbindung zu setzen führt in der Regel zu besseren Ergebnissen als die Schuld zu ignorieren und auf Inkassomaßnahmen zu warten.

Siehe unseren Artikel zu [Zahlungsplänen für Steuerschulden](/de/blog/ato-payment-plan-tax-debt-australia) für die Details.

## Was passiert, wenn du Australien mit einer unbezahlten Steuerschuld verlässt?

Ein Working Holiday Maker, der Australien mit einer unbezahlten Steuerschuld verlässt, haftet weiterhin für die Schuld. Das ATO kann:

- Weiter GIC täglich auf den unbezahlten Betrag berechnen
- Failure-to-Pay-Strafen für laufende Nichtzahlung anwenden
- Die Schuld gegen zukünftige australische Rückerstattungen oder DASP-Zahlungen verrechnen
- Die Schuld in manchen Fällen an internationale Inkassodienste übergeben
- Einen Eintrag in deiner Akte vornehmen, der zukünftige australische Visaanträge beeinflusst

Australien hat Steuerverträge mit vielen Ländern, die gegenseitige Eintreibung von Steuerschulden erlauben, obwohl die praktische Anwendung variiert. Die direkteste Konsequenz ist, dass jede nachfolgende Rückkehr nach Australien (auf einer Working-Holiday-Verlängerung, Studentenvisum oder Skilled-Visum) die ungelöste Schuld antrifft.

## Was ist mit einer DASP-Rückerstattung gegen die Schuld verrechnet?

Wenn du einen [DASP](/de/blog/what-is-dasp-super-withdrawal)-Antrag einreichst, hat das ATO das Recht, jede ausstehende Steuerschuld gegen die Superzahlung zu verrechnen. Das bedeutet:

- Ein Working Holiday Maker, der Australien mit einer 2.000 $ unbezahlten Steuerschuld und einer 4.000 $ Brutto-DASP-Berechtigung verlässt
- DASP-Steuer von 65 % gilt, reduziert das Brutto auf etwa 1.400 $ netto
- Die 1.400 $ netto werden dann gegen die 2.000 $ Schuld verrechnet
- Der Arbeiter erhält keine DASP-Zahlung, und eine Schuld von 600 $ verbleibt

Für Arbeiter mit erheblichen Steuerschulden kann das DASP effektiv durch die Schuldenverrechnung aufgezehrt werden. Die Schuld vor Abreise zu lösen gibt meistens ein besseres Ergebnis.

## Können der GIC oder die Failure-to-Pay-Strafe erlassen werden?

Das ATO hat Ermessen, den GIC und die Failure-to-Pay-Strafe in manchen Umständen zu erlassen (reduzieren oder annullieren):

- Echte Härte, die Zahlung verhinderte
- ATO-Verwaltungsfehler, der die Schuld verursachte oder dazu beitrug
- Umstände außerhalb der Kontrolle des Steuerzahlers (Krankheit, Naturkatastrophe, Familiennotfall)
- Erstmalige Nichtzahlung mit sonst sauberer Compliance-Historie

Erlassanfragen müssen spezifisch gestellt und durch Belege unterstützt werden. Die Erlassrate ist generell höher für über einen registrierten Steueragenten eingereichte Anfragen als für direkte Anfragen.

## Wie unterstützt unser Service Steuerschuldensituationen?

Für Working Holiday Maker mit Steuerschulden erledigt unser Team folgendes:

- Wir berechnen die exakte Schuldenposition einschließlich GIC und aufgelaufener Strafen
- Wir verhandeln Zahlungspläne mit dem ATO, wo der volle Betrag nicht sofort gezahlt werden kann
- Wir stellen Anträge auf Erlass von GIC und Failure-to-Pay-Strafen, wo Gründe vorliegen
- Wir koordinieren das DASP-Timing, um das Verrechnungsrisiko zu steuern
- Wir reichen jede ausstehende Erklärung oder BAS ein, um die vollständige Schuldenposition zu klären
- Wir lösen die Schuldenposition vor der Abreise, um Folgeeffekte auf zukünftige australische Visa zu vermeiden

Steuerschulden wachsen schnell unter dem GIC. Sie früh zu lösen ist deutlich billiger als zu warten. [Kontaktiere unser Team](/de/contact), falls du eine ausstehende ATO-Schuld hast oder besorgt bist, wie eine kommende Erklärung eine erzeugen könnte.
 `,
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
