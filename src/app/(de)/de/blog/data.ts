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
import type { Category, CategoryMeta, Guide } from '@/app/(site)/blog/data'
import { categoryMeta as enCategoryMeta, guides as enGuides } from '@/app/(site)/blog/data'

// ─── UI STRINGS ────────────────────────────────────────────────────────────
export const blogUI = {
  // Hero
  breadcrumbHome:      'Startseite',
  breadcrumbBlog:      'Blog',
  blogLabel:           'Blog',
  h1Line1:             'Steuern zurück aus Australien:',
  h1Line2:             'TFN, Tax Return, Super und ABN',
  description:         'Steuererstattung holen, Superannuation auszahlen lassen, TFN und ABN einrichten: praktische Guides für Work and Travel in Australien, einfach erklärt.',

  // Stats
  statsArticles:       'Artikel',
  statsCategories:     'Kategorien',

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
  needHelpBody:        'Unser Team ist ausschließlich auf Working Holiday Maker spezialisiert und hilft bei TFN, Steuererklärung, Super und ABN.',
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
    title: 'TFN-Guides: beantragen, warten, nutzen',
    description: 'Alles über die Tax File Number (TFN): wie du sie beantragst, wie lange das dauert und was du tust, wenn etwas schiefläuft.',
    intro: 'Eine Tax File Number (TFN) ist die 9-stellige Identifikationsnummer, die das ATO (australisches Finanzamt) jeder Person ausstellt, die in Australien Einkommen hat. Als Working Holiday Maker brauchst du eine TFN, bevor du anfängst zu arbeiten. Sonst muss dein Arbeitgeber 45 % Steuern einbehalten statt der 15 %, die für Working Holiday Maker gelten. Diese Artikel decken alles ab, von deiner ersten TFN-Beantragung bis hin zu Verzögerungen, verlorenen Nummern und Rückkehr mit Zweitvisum.',
    faq: [
      { question: 'Brauchen Working Holiday Maker eine TFN in Australien?', answer: 'Ja. Jeder Working Holiday Maker, der in Australien Einkommen hat, braucht eine Tax File Number. Ohne eine bei deinem Arbeitgeber registrierte TFN muss er gesetzlich 45 % Steuern einbehalten statt der 15 %, die für Working Holiday Maker gelten.' },
      { question: 'Wie lange dauert es, eine TFN zu bekommen?', answer: 'Das ATO (australisches Finanzamt) bearbeitet TFN-Anträge innerhalb von 28 Tagen. Deine TFN wird per Brief an deine australische Postadresse geschickt. Viele Antragsteller bekommen sie innerhalb von zwei Wochen.' },
      { question: 'Ist der TFN-Antrag kostenlos?', answer: 'Ja. Für eine TFN fällt keine Behördengebühr an. Geld kostet die Lücke drumherum: Jede Lohnzahlung, bevor dein Arbeitgeber die Nummer hat, wird mit 45 % statt 15 % einbehalten, und das kommt nur über die Steuererklärung zurück.' },
      { question: 'Kann man in Australien ohne TFN anfangen zu arbeiten?', answer: 'Ja, du kannst ohne TFN anfangen zu arbeiten, aber dein Arbeitgeber muss 45 % Steuern einbehalten, bis du eine TFN bereitstellst. Die zu viel gezahlte Steuer kannst du dir mit deiner Steuererklärung zurückholen.' },
    ],
    relatedServicePath: '/de/tfn',
    relatedServiceLabel: 'Deine TFN beantragen',
  },
  // ABN
  {
    category: 'ABN',
    slug: 'abn',
    title: 'ABN-Guides: registrieren, Steuer, Rechte',
    description: 'Alles über die Australian Business Number (ABN): wann du eine brauchst, wie du dich registrierst und was das für deine Steuer bedeutet.',
    intro: 'Eine Australian Business Number (ABN) ist eine 11-stellige Identifikationsnummer, die du brauchst, wenn du in Australien als Selbstständiger (Sole Trader) oder unabhängiger Contractor arbeitest. Du brauchst eine ABN, wenn ein Unternehmen dich bezahlt, indem du ihm Rechnungen stellst, statt dass du auf der Gehaltsliste stehst. Diese Artikel decken Registrierung, wann eine ABN die richtige Wahl ist und wie das Arbeiten unter einer ABN deine Steuer, Super und Ansprüche beeinflusst.',
    faq: [
      { question: 'Brauchen Working Holiday Maker eine ABN in Australien?', answer: 'Du brauchst eine ABN, wenn du als unabhängiger Contractor oder Selbstständiger arbeitest, das heißt: wenn du Rechnungen für deine Arbeit stellst, statt auf einer Gehaltsliste zu stehen. Die meisten Working Holiday Maker in normalen Anstellungen brauchen keine ABN.' },
      { question: 'Wie viel kostet eine ABN?', answer: 'Für die Registrierung einer ABN fällt keine Behördengebühr an. Teuer wird eine ABN auf der Steuerseite: Von einer Rechnung wird nichts einbehalten, die ganze Steuerlast liegt also bis zur Erklärung bei dir, und eine ABN für eine Tätigkeit, in der du eigentlich angestellt warst, kostet dich zusätzlich Super und Award-Ansprüche.' },
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
    title: 'Steuererklärung Australien: alle Guides',
    description: 'Alles über die Steuererklärung in Australien: wann sie fällig ist, wie du absetzbare Kosten geltend machst und wie du deine Rückzahlung maximierst.',
    intro: 'Die Steuererklärung in Australien (Tax Return) ist die jährliche Abrechnung zwischen dir und dem ATO. Du gibst an, wie viel du verdient hast, machst absetzbare Kosten geltend und gleichst das mit der schon einbehaltenen Steuer ab. Die meisten Working Holiday Maker bekommen etwas zurück, weil mehr Steuer einbehalten wurde als geschuldet war. Diese Artikel decken Termine, Abzüge, häufige Fehler und wie du deine maximale Rückzahlung bekommst.',
    faq: [
      { question: 'Wann muss ich meine Steuererklärung in Australien machen?', answer: 'Das australische Steuerjahr läuft vom 1. Juli bis 30. Juni. Du hast bis zum 31. Oktober Zeit, um deine Steuererklärung einzureichen, wenn du sie selbst machst. Mit einem Steuerberater hast du bis Mai des Folgejahres Zeit.' },
      { question: 'Was kann ich als Working Holiday Maker absetzen?', answer: 'Du kannst arbeitsbezogene Kosten absetzen: Arbeitskleidung (z. B. Schutzkleidung, Uniformen), Werkzeuge und Ausrüstung, Lizenzen wie RSA oder White Card, Wäsche von Arbeitskleidung, Fahrten zwischen Arbeitsorten (nicht der tägliche Arbeitsweg) und Spenden an registrierte Wohltätigkeitsorganisationen.' },
      { question: 'Wie hoch ist die durchschnittliche Steuerrückerstattung für WHM?', answer: 'Es gibt keinen Durchschnittswert, der dir weiterhilft. Eine Erstattung ist die Lücke zwischen dem, was einbehalten wurde, und dem, was du tatsächlich geschuldet hast. Wie groß sie ist, entscheiden dein Einbehalt, dein steuerlicher Wohnsitz, dein Medicare-Anspruch und die Kosten, die du belegen kannst.' },
      { question: 'Kann ich meine Steuererklärung machen, nachdem ich Australien verlassen habe?', answer: 'Ja. Du kannst die Steuererklärung von überall auf der Welt einreichen, auch nach deiner Abreise aus Australien. Die Steuerrückerstattung wird auf dein australisches Bankkonto überwiesen.' },
    ],
    relatedServicePath: '/de/tax-return',
    relatedServiceLabel: 'Deine Steuererklärung machen',
  },
  // Super
  {
    category: 'Super',
    slug: 'super',
    title: 'Super und DASP: alle Guides zur Auszahlung',
    description: 'Alles über Superannuation (Super): wie es funktioniert, wann du es zurückbekommst und wie du den DASP-Antrag stellst, wenn du Australien verlässt.',
    intro: 'Superannuation (Super) ist das australische Rentensystem. Per Gesetz zahlt dein Arbeitgeber 12 % deines Lohns zusätzlich zu deinem Gehalt in einen Superfonds ein. Als Working Holiday Maker kannst du dieses Geld zurückbekommen, wenn du Australien verlässt, und zwar über den DASP-Prozess (Departing Australia Superannuation Payment). Für die meisten Backpacker sind das zwischen 2.000 und 5.000 $. Diese Artikel erklären, wie Super funktioniert, wie du es findest und wie du es richtig zurückholst.',
    faq: [
      { question: 'Wie viel Super zahlt mein Arbeitgeber für mich ein?', answer: 'In Australien zahlt dein Arbeitgeber 12 % deines Bruttolohns als Super ein, zusätzlich zu deinem Gehalt. Wenn du also 1.000 $ pro Woche verdienst, gehen weitere 120 $ in deinen Superfonds.' },
      { question: 'Kann ich meine Super zurückbekommen, wenn ich Australien verlasse?', answer: 'Ja. Als Working Holiday Maker kannst du eine Departing Australia Superannuation Payment (DASP) beantragen, sobald du Australien verlassen hast und dein Visum abgelaufen oder gekündigt ist. Die steuerpflichtige Komponente wird mit 65 % besteuert, den Rest bekommst du ausgezahlt.' },
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
    title: 'Arbeitsrechte: Lohn, Pausen, Kündigung',
    description: 'Deine Rechte als Arbeitnehmer in Australien: Mindestlohn, Pausen, Überstunden, Jobkündigung und was tun, wenn dein Arbeitgeber dich abzockt.',
    intro: 'Als Working Holiday Maker hast du in Australien dieselben Arbeitsrechte wie ein australischer Arbeitnehmer. Du hast Anspruch auf Mindestlohn, Pausen, Überstundenvergütung und Schutz vor unfairem Verhalten. Leider werden Backpacker oft ausgenutzt, vor allem auf Farmen und in der Gastronomie. Diese Artikel erklären deine Rechte, was du tun kannst, wenn etwas schiefläuft, und wie du dich vor Betrug schützt.',
    faq: [
      { question: 'Wie viel ist der Mindestlohn in Australien?', answer: 'Der nationale Mindestlohn in Australien liegt bei 26,44 $ pro Stunde brutto (Stand 1. Juli 2026). Für Casual-Arbeit gibt es einen Aufschlag von 25 %. Bestimmte Branchen (z. B. Gastronomie, Landwirtschaft) haben eigene Awards mit höheren Sätzen.' },
      { question: 'Was ist Casual Loading und wie viel ist das?', answer: 'Casual Loading ist ein Aufschlag von 25 % auf den Stundenlohn von Casual-Kräften. Das gleicht aus, dass Casuals keinen bezahlten Urlaub und keinen Krankheitslohn bekommen. Wenn dein Arbeitgeber dir keinen Casual Loading zahlt, hat er möglicherweise gegen das Gesetz verstoßen.' },
      { question: 'Habe ich Anspruch auf Pausen während der Arbeit?', answer: 'Ja. Bei einer Schicht von 4-5 Stunden hast du Anspruch auf eine 10-minütige unbezahlte Pause. Bei 5-7 Stunden: 1 Pause von 30 Minuten unbezahlt. Bei mehr als 9 Stunden: zusätzliche Pausen. Genauere Regeln stehen in deinem Award.' },
      { question: 'Was kann ich tun, wenn mein Arbeitgeber mich nicht bezahlt?', answer: 'Dokumentiere alles (Arbeitsstunden, Payslips, Mitteilungen). Sprich deinen Arbeitgeber zuerst an. Wenn das nicht funktioniert, melde es beim Fair Work Ombudsman. Das ist die kostenlose Bundesbehörde für Arbeitnehmerrechte. Wenn du unsicher bist, kannst du dir auch bei einem Steuerberater Rat holen.' },
    ],
    relatedServicePath: '/de/contact',
    relatedServiceLabel: 'Bei Arbeitsrechtsfragen kontaktieren',
  },
  // Medicare & Other
  {
    category: 'Medicare & Other',
    slug: 'medicare',
    title: 'Medicare, Levy-Befreiung und Wohnsitz',
    description: 'Medicare, Medicare-Levy-Befreiung, steuerlicher Wohnsitz, Doppelbesteuerung und andere Themen für Working Holiday Maker in Australien.',
    intro: 'Medicare ist das öffentliche Gesundheitssystem in Australien. Es wird teilweise durch die 2 %-Medicare Levy finanziert, die automatisch von deinem zu versteuernden Einkommen abgezogen wird. Die meisten Working Holiday Maker haben keinen Anspruch auf Medicare und sollten daher eine Befreiung beantragen. Diese Artikel decken Medicareberechtigung, die Levy-Befreiung, Sozialversicherungsabkommen (RHCA) und andere wichtige Steuerthemen ab.',
    faq: [
      { question: 'Habe ich als deutscher Working Holiday Maker Anspruch auf Medicare?', answer: 'Nein. Deutschland hat KEIN Sozialversicherungsabkommen (RHCA) mit Australien. Das heißt: Als deutscher Working Holiday Maker hast du keinen Anspruch auf Medicare. Stattdessen solltest du eine Medicare-Levy-Befreiung bei deiner Steuererklärung beantragen.' },
      { question: 'Was ist die Medicare-Levy-Befreiung?', answer: 'Wenn du keinen Anspruch auf Medicare hast, was auf die meisten Working Holiday Visuminhaber zutrifft, kannst du bei deiner Steuererklärung eine Medicare-Levy-Befreiung beantragen. Das spart dir die 2 %-Levy auf dein Einkommen, was Hunderte bis Tausende Dollar betragen kann.' },
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
    title: 'Selbst machen oder Steuerberater?',
    description: 'Die eigene Erklärung einzureichen ist kostenlos. Was ein Working-Holiday-Jahr schwer richtig zu erwischen macht, die fünf Stellen, an denen Erstattungen verloren gehen, und was eine Prüfung umfasst.',
    body: `
Deine australische Steuererklärung selbst einzureichen kostet nichts, und das sagen wir offen. Die Frage ist nicht, ob du ein Formular ausfüllen kannst, sondern ob in deinem Jahr eines der fünf Dinge steckt, die Working Holiday Maker still Geld kosten. Keines davon ist im Formular selbst zu erkennen.

## Was macht ein Working-Holiday-Jahr schwer richtig zu erwischen?

Die kostenlosen Abgabewege sind für australische Residenten gebaut. Wohnsitzstatus, das Feld für Working-Holiday-Maker-Einkommen und der Medicare-Abschnitt setzen einen Steuerpflichtigen voraus, der seinen Status bereits kennt, und genau dort raten Backpacker am ehesten. Der steuerliche Wohnsitz hängt an den persönlichen Umständen und muss ordentlich geprüft statt angenommen werden.

Eine falsche Antwort scheitert nicht. Sie erzeugt eine Erklärung, die sauber durchgeht und trotzdem falsch ist, und die Korrektur kommt Monate später als geänderter Bescheid.

## Wo geht das Geld tatsächlich verloren?

An fünf konkreten Stellen, und keine davon meldet sich. Eine Erklärung trägt jede davon leer oder falsch beantwortet mit, und der Verlust wird erst sichtbar, wenn jemand danach sucht.

- **Die Medicare-Levy-Befreiung, übersprungen.** Sie braucht ein Medicare Entitlement Statement, das Wochen vorher bei Services Australia bestellt wird, und lässt sich am Tag der Abgabe nicht nachholen. Sie auszulassen kostet 2 % des zu versteuernden Einkommens, rund 500 $ bei 25.000 $.
- **Wohnsitz falsch beantwortet.** Der häufigste Backpacker-Fehler und der, der am ehesten später einen geänderten Bescheid erzeugt.
- **Abzüge nie geltend gemacht.** RSA- und White-Card-Kurse, Sonnenschutz für Arbeit im Freien, Werkzeug, das Waschen vorgeschriebener Uniformen und die Steuerberatergebühr des Vorjahres.
- **Ein Arbeitgeber, der beim Abgleich fehlt.** Der Überabzug bei einem im September verlassenen Job fällt leicht unter den Tisch, und dort sitzt meist die größte Einzelsumme.
- **ABN-Einkommen falsch behandelt.** Liefern oder Farm-Contracting bringt Geschäftsposten, mögliche GST-Fragen und eine andere Abzugsgrundlage. Diese Seite behandeln unsere [ABN-Guides](/de/blog/category/abn).

## Gibt es Jahre, in denen es nichts zu finden gibt?

Ja. Ein Jahr mit einem Arbeitgeber, beim ATO als Working-Holiday-Maker-Arbeitgeber registriert, der TFN ab der ersten Schicht hinterlegt, durchgehend 15 % Einbehalt, ohne ABN-Einkommen und ohne Abreise, landet beim Abgleich meist nahe null.

Nur sehen die wenigsten Working-Holiday-Jahre so aus. Ein Arbeitgeberwechsel, eine Farmsaison, eine Lücke bevor die TFN kam oder ein Rückflug im März verschieben die Zahl, nicht den Papierkram.

## Wann ändert ein Steuerberater das Ergebnis?

Wenn irgendein Teil des Jahres unregelmäßig war. Eine Phase bei 45 %, bevor deine TFN kam, mehr als zwei Arbeitgeber, Farmarbeit oder ein nicht registrierter Arbeitgeber, eine Medicare-Levy-Befreiung, ABN-Einkommen neben Löhnen, eine Abreise mitten im Jahr: Bei jedem geht die richtige Behandlung aus dem Formular nicht hervor.

Dazu ein struktureller Unterschied. Ein registrierter Steuerberater sieht jeden Arbeitgeber, der Einkommen unter deiner TFN gemeldet hat, nicht nur die, an die du dich erinnerst. Er trägt zudem berufliche Pflichten und verlängerte Abgabefristen über den 31. Oktober hinaus, und die Gebühr ist in der Erklärung des Folgejahres absetzbar.

## Was steckt in einer Prüfung des Jahres?

Das Jahr zu rekonstruieren statt es abzutippen: jeder Arbeitgeber, der Einkommen unter deiner TFN gemeldet hat, die Zeiträume zu jedem Einbehaltssatz, der Wohnsitz als geprüfte statt angenommene Frage, die Medicare-Position und die Abzüge zu der Arbeit, die du tatsächlich gemacht hast. Wo neben Löhnen ABN-Einkommen lief oder eine bar bezahlte Saison aus lückenhaften Unterlagen zu rekonstruieren ist, steckt der Großteil der Arbeit.

Eines ist in jedem Fall zu vermeiden, egal wer die Arbeit macht: eine Preisgestaltung als Prozentsatz der Erstattung. Sie zahlt dem Ersteller mehr, wenn die Zahl steigt, und das ist kein Anreiz, den du auf der anderen Seite des Tisches haben willst. Ein vor Beginn der Arbeit vereinbarter [Festpreis](/de/tax-return) hat dieses Problem nicht.

## Lässt sie sich auch nach der Abreise aus Australien einreichen?

Ja. Die Abgabe aus der Ferne ist Routine, einschließlich des Abrufs von Income Statements, die du nie eingesammelt hast, und der Bearbeitung des [Superantrags](/de/superannuation) neben der Erklärung.

Die Hürden aus dem Ausland sind Identität und Zugang, nicht die Steuer. Ein australischer Identitätsnachweis ist leichter zu erbringen, solange du noch hier bist, und ein australisches Bankkonto muss lange genug offen bleiben, um die Erstattung zu empfangen. Beides ist im letzten Monat in Australien schnell erledigt und von der anderen Seite der Welt zäh. Wie groß die Sache bei dir ist, zeigt dir vorab der [Erstattungsrechner](/de/calculator).
`,
  },
  'working-holiday-visa-tax-guide-417-462': {
    title: 'Steuern mit 417/462-Visum: Sätze und Regeln',
    description: 'Der komplette Steuerguide für Working Holiday Maker: 15 % auf die ersten 45.000 Dollar, was darüber gilt, Medicare-Levy-Befreiung, Super und Erstattungen.',
    body: `
Working Holiday Maker mit 417- oder 462-Visum zahlen 2026-27 pauschal 15 % auf die ersten 45.000 $, die sie in Australien verdienen, ohne Steuerfreibetrag. Darüber gelten die normalen Sätze. Die 15 % erreichen dich nur, wenn dein Arbeitgeber registriert ist, und alles über dem korrekten Satz kommt über deine [Steuererklärung](/de/tax-return) zurück.

## Was sind die Working-Holiday-Maker-Sätze?

Fünfzehn Prozent vom ersten Dollar bis 45.000 $, darüber steigt die Skala im Gleichklang mit den Foreign-Resident-Stufen. Fast jeder bleibt in einem Steuerjahr in der ersten Stufe, 15 % entscheidet also über das Jahr.

Der fehlende Steuerfreibetrag trennt das von der gewöhnlichen australischen Besteuerung. Australier zahlen auf ihre ersten 18.200 $ nichts, ein Working Holiday Maker darauf 15 %, ein Unterschied von 2.730 $.

- Erste 45.000 $: 15 %
- 45.001 bis 135.000 $: 30 %
- 135.001 bis 190.000 $: 37 %
- Über 190.000 $: 45 %

## Kann ein Working Holiday Maker den Freibetrag je bekommen?

Ja, aber selten, und es hängt nicht am Visum. Der Weg führt über den steuerlichen Wohnsitz, der an deinen persönlichen Umständen hängt und ordentlich geprüft werden muss. Dazu kommt eine zweite Bedingung, die von Fall zu Fall verschieden ausgeht.

Verlass dich auf keine Hostelweisheit: Die Frage ist in beide Richtungen leicht falsch zu beantworten, und beide Fehler kosten Geld. Warum sie so schwer zu greifen ist, steht in unserem Guide zum [steuerlichen Wohnsitz für Working Holiday Maker](/de/blog/tax-residency-working-holiday-makers). Ob sie sich in deinem Jahr stellt, klären wir, nachdem wir es durchgegangen sind.

## Warum zählt die Registrierung deines Arbeitgebers?

Weil sie entscheidet, welchen Satz er anwenden darf. Ein Betrieb muss sich beim ATO als Arbeitgeber von Working Holiday Makern registrieren, bevor er 15 % einbehalten darf. Wer das nicht getan hat, wendet Foreign-Resident-Sätze an, derzeit 30 % auf die betreffende Stufe.

Von außen erkennst du das nicht, und am häufigsten nicht registriert sind Farmen und kleine regionale Gastronomiebetriebe, also genau dort, wo viele Backpacker arbeiten. Verloren geht nichts: Der Überschuss wird bei Abgabe der Erklärung erstattet. Aber die Differenz zwischen 30 % und 15 % über eine Erntesaison ist meist der größte Einzelposten der Jahreserstattung, und sie zu finden verlangt, jeden Arbeitgeber getrennt anzusehen statt die Gesamtsumme.

## Was ändert deine TFN?

Den Satz, sofort und vollständig. Ohne eine über eine Tax File Number Declaration erfasste Tax File Number behält ein Arbeitgeber 45 % ein, unabhängig von seinem Registrierungsstatus, also 30 Cent pro Dollar mehr, als du zahlen solltest.

Für den Antrag auf eine [TFN](/de/tfn) musst du in Australien sein, die Nummer ist kostenlos, und die Obergrenze des ATO für die Ausstellung liegt bei 28 Tagen. Geld kostet nicht der Antrag, sondern das Declaration-Formular: Jeder Arbeitgeber braucht ein eigenes. Der häufigste stille Verlust ist ein Job korrekt bei 15 %, während ein zweiter monatelang bei 45 % läuft, weil niemand ein zweites Formular ausgefüllt hat.

## Was ist die Medicare-Levy-Befreiung wert?

Zwei Prozent des zu versteuernden Einkommens, also rund 500 $ bei 25.000 $ Verdienst, und die meisten Berechtigten beantragen sie nie. Die Medicare Levy von 2 % kommt zur Einkommensteuer hinzu und wird Personen mit Anspruch auf Medicare berechnet, nicht Residenten als solchen.

Ob du sie loswirst, hängt an deinem Pass, oft anders herum als erwartet. Britische und irische Staatsangehörige haben nach den Gesundheitsabkommen in der Regel Anspruch auf Medicare, die Levy gilt also. Deutsche und japanische Staatsangehörige haben in der Regel keinen Anspruch, für sie steht die Befreiung offen.

Automatisch ist sie in keinem Fall. Die Befreiung braucht ein Medicare Entitlement Statement von Services Australia, dessen Beschaffung Wochen dauert, und dieser Vorlauf ist der ganze Grund, warum sie unbeansprucht bleibt. Die Details stehen in unserem [Guide zur Medicare-Levy-Befreiung](/de/blog/medicare-levy-working-holiday-makers).

## Was passiert mit deiner Superannuation?

Dein Arbeitgeber zahlt 12 % deines gewöhnlichen Verdienstes zusätzlich zum Lohn in einen Superfonds, und daran kommst du in Australien nicht heran. Sie ist kein Teil deiner Steuererstattung.

Sobald du ausgereist bist und dein Visum beendet ist, wird sie als Departing Australia Superannuation Payment beantragt, mit 65 % auf die steuerpflichtige Komponente besteuert, und die Freigabe dauert typischerweise rund 28 Tage. Wie viel wartet, hängt am Verdienst und daran, auf wie viele Fonds es sich verteilt hat, denn jeder Arbeitgeber, der dich keinen Fonds hat benennen lassen, hat ein weiteres Konto eröffnet. Den Antrag behandelt unser [Super-Service](/de/superannuation).

## Zählt es, welche Subclass du hältst?

Steuerlich nicht. Die 417 und die 462 werden identisch behandelt: derselbe Satz von 15 %, dieselben 65 % DASP-Einbehalt, dieselbe Medicare-Position, dieselben Abgabetermine. Wer etwas anderes sagt, liegt falsch.

Wo sich die Subclasses unterscheiden, ist die Visumsmechanik. Die 417 deckt unter anderem Großbritannien, Irland, weite Teile Europas, Japan, Korea und Taiwan ab und verlängert sich über specified work in regionalen Gebieten. Die 462 deckt die USA, China, Israel und weite Teile Lateinamerikas ab, trägt Bildungsanforderungen und Länderkontingente und hat eigene Regeln zu specified work, einschließlich Optionen in Nordaustralien.

Das wirkt auf die Steuer zurück. Eine Verlängerung zu verfolgen schiebt Menschen in regionale Postleitzahlen und zu landwirtschaftlichen Arbeitgebern, und genau dort ballen sich [Einbehalt durch nicht registrierte Arbeitgeber](/de/blog/backpacker-tax-rate-australia) und [ABN-Konstruktionen auf Farmen](/de/blog/farm-work-and-abns).

## Welche Termine zählen?

Das Steuerjahr läuft vom 1. Juli bis 30. Juni. Erklärungen gehen ab Juli, sobald die Arbeitgeber ihre Meldungen abgeschlossen haben, und die Selbstabgabe ist bis zum 31. Oktober fällig. Die Abgabe über einen registrierten Steuerberater verlängert das bis in den Mai des Folgejahres, sofern du vor Oktober bei ihm gemeldet warst.

Ein Termin ist anders, wenn du endgültig abreist. Wer Australien mitten im Steuerjahr dauerhaft verlässt, kann für dieses Jahr eine vorgezogene Erklärung einreichen statt bis Juli zu warten, was die Erstattung um Monate vorzieht. Das lohnt zu wissen, bevor du den Flug buchst, denn es ist leichter zu organisieren, solange dein australisches Bankkonto noch offen ist. Unser [Rechner](/de/calculator) liefert eine grobe Zahl, wenn du deine Payslip-Summen zur Hand hast.
`,
  },
  'average-tax-refund-working-holiday': {
    title: 'Wie hoch fällt deine Steuererstattung aus?',
    description: 'Erstattungen reichen von ein paar hundert bis mehreren tausend Dollar, je nach Abzug, Einkommen und Werbungskosten. Konkrete Beispiele für 417/462.',
    body: `
Es gibt keinen Durchschnittswert, der dir weiterhilft. Eine Erstattung ist keine Prämie fürs Backpacken, sondern die Lücke zwischen dem Einbehalt deiner Arbeitgeber und dem, was du tatsächlich geschuldet hast: 15 % auf die ersten 45.000 $. War der Einbehalt das ganze Jahr korrekt, ist diese Lücke nahe null.

## Was entscheidet tatsächlich über die Höhe deiner Erstattung?

Drei Zahlen, und zwei davon hast du längst: dein Gesamteinkommen im Steuerjahr vom 1. Juli bis 30. Juni, die einbehaltene Steuer über alle Arbeitgeber, und die Befreiungen und Werbungskosten, die deine Schuld senken. Die Erstattung ist die zweite Zahl minus der Steuer auf die erste, korrigiert um die dritte.

Deshalb sind zitierte Durchschnittswerte für Working Holiday Maker wertlos. Bei einem australischen Residenten enthält die Einbehaltsskala den Freibetrag von 18.200 $ bereits, seine Abrechnung landet also nahe null. Bei einem Working Holiday Maker läuft der Einbehalt pauschal bei 15 %, und Fehler laufen nur in eine Richtung: zu viel. Die Erstattung ist der aufgelaufene Fehler.

## Welche Situationen erzeugen eine große Erstattung?

Fast nie geschickte Werbungskosten. Große Erstattungen entstehen, wenn ein Teil des Jahres falsch einbehalten wurde: Wochen oder Monate, in denen jemand 45 % oder einen Foreign-Resident-Satz statt 15 % genommen hat.

Vier Konstellationen machen den Großteil davon aus, und jede ist eine Tatsache über dein eigenes Jahr und keine allgemeine Regel.

- **Wochen, bevor deine TFN beim Arbeitgeber ankam.** Bis das [Declaration-Formular](/de/blog/tax-file-number-declaration-form) ausgefüllt ist, gilt ein Einbehalt von 45 % statt 15 %, ein Unterschied von 30 Cent auf jeden Dollar in dieser Zeit.
- **Ein Arbeitgeber, der beim ATO nicht als Working-Holiday-Maker-Arbeitgeber registriert ist.** Er muss zu Foreign-Resident-Sätzen einbehalten statt zu 15 %. Das ist nicht dein Fehler und in voller Höhe erstattungsfähig.
- **Eine Abreise mitten im Steuerjahr.** Der Einbehalt unterstellt, dass das Einkommen weiterläuft, eine Abreise im Januar hinterlässt also meist mehr Einbehalt, als je geschuldet war.
- **Eine nie beantragte Medicare-Levy-Befreiung.** Sie ist 2 % des zu versteuernden Einkommens wert für jeden ohne Medicare-Anspruch, und sie braucht ein Medicare Entitlement Statement von Services Australia statt eines Häkchens.

## Welche Situationen erzeugen eine kleine?

Ein Arbeitgeber, korrekt registriert, deine TFN ab Woche eins hinterlegt, ein volles Jahr gearbeitet. Dann liegen die genommenen 15 % nahe an den geschuldeten 15 %, und die Erstattung besteht aus der Medicare-Levy-Befreiung und den belegbaren Werbungskosten.

Das ist ein normales Ergebnis und kein Hinweis auf einen Fehler. Es bedeutet, dass das eigentliche Geld deines Jahres in der [Superannuation](/de/superannuation) liegt und nicht in der Steuer, denn Super läuft mit 12 % auf, unabhängig vom Einbehalt.

## Wie kommst du an deine eigene Zahl?

Addiere Einkommen und einbehaltene Steuer über jeden Job und vergleiche den Gesamteinbehalt mit 15 % des Gesamteinkommens bis 45.000 $. Alles darüber ist der Ausgangspunkt deiner Erstattung, bevor Medicare-Levy-Befreiung und Werbungskosten angerechnet werden. Unser [Steuerrechner](/de/calculator) macht dieselbe Rechnung, wenn du die Payslips vor dir liegen hast.

Die Schwierigkeit sind fehlende Informationen, nicht schwierige Rechnungen. Income Statements liegen in den Systemen des ATO und nicht beim Arbeitgeber. Ein Job, den du im Streit verlassen hast, oder eine geschlossene Leiharbeitsfirma rückt dieses Einkommen also nicht außer Reichweite, die Zahlen müssen nur erst beschafft werden.

## Bekommt bei der Abreise wirklich jeder Geld zurück?

Nein, und das ist der hartnäckigste Mythos im Hostel. Erstattet wird der Betrag, der über deine korrekte Schuld hinaus einbehalten wurde, nicht die Steuer selbst. Wer das ganze Jahr zutreffend besteuert wurde, hat wenig bis nichts zurückzuholen.

Bei der Abreise fällig wird die Super, ein völlig eigenes System. Ein [DASP-Antrag](/de/superannuation) zahlt das Guthaben abzüglich 65 % Einbehalt auf den steuerpflichtigen Anteil aus, ganz gleich wie deine Einkommensteuer ausgegangen ist. Zwei Leute mit identischer Erstattung von null können sehr unterschiedliche Superguthaben haben.
`,
  },
  'tax-back-australia-working-holiday': {
    title: 'Steuern zurück aus Australien: So geht es',
    description: 'Zu viel einbehaltene Steuer kommt über die Steuererklärung zurück. Was erstattet wird, wovon die Höhe abhängt und wie das auch aus Deutschland läuft.',
    body: `
Tax back ist der Betrag, den dein Arbeitgeber über deine tatsächliche Schuld hinaus einbehalten hat. Zurück holst du ihn über eine [Steuererklärung](/de/tax-return) nach dem 30. Juni, oder früher, wenn du Australien endgültig verlässt. Deine korrekte Schuld sind 15 % auf die ersten 45.000 $. Alles darüber kommt zurück.

## Warum gibt es überhaupt etwas zurückzuholen?

Weil der Einbehalt eine Schätzung ist, die Lohnzahlung für Lohnzahlung angewendet wird, während deine tatsächliche Schuld einmal am Jahresende auf das Gesamtbild berechnet wird. Beide stimmen nur überein, wenn nichts Ungewöhnliches passiert ist, und bei Working Holiday Makern ist meistens etwas Ungewöhnliches passiert.

Die Lücke läuft dabei nur in eine Richtung. Bei einem australischen Residenten wird gegen eine Skala einbehalten, die auf ein Ergebnis nahe null zielt. Bei einem Working Holiday Maker ist der Einbehalt pauschal, und jeder Fehler darin, eine fehlende TFN, ein nicht registrierter Arbeitgeber, eine frühe Abreise, bedeutet, dass zu viel genommen wurde und nicht zu wenig. Das ist der strukturelle Grund für Backpacker-Erstattungen.

## Welche Teile deines Jahres erzeugen die Erstattung?

Fünf konkrete Dinge, jedes eine Tatsache über deine Umstände und kein allgemeiner Anspruch. Welche zutreffen, sagt grob, was zu erwarten ist.

- **Eine Phase mit 45 %.** Alle Wochen, bevor deine TFN beim Arbeitgeber ankam, wurden mit 45 % statt 15 % einbehalten, und die gesamte Differenz kommt zurück.
- **Ein Arbeitgeber, der nicht als Working-Holiday-Maker-Arbeitgeber registriert ist.** Er muss zu Foreign-Resident-Sätzen einbehalten, und dieser Überschuss ist in voller Höhe erstattungsfähig. Häufig auf Farmen und in kleinen Betrieben.
- **Die Medicare-Levy-Befreiung.** Die meisten 417- und 462-Inhaber haben keinen Medicare-Anspruch und können die 2-%-Abgabe entfernen lassen, aber das braucht ein Medicare Entitlement Statement von Services Australia und kein Häkchen.
- **Berufsbezogene Werbungskosten.** Werkzeug, vorgeschriebene Uniformen und deren Wäsche, Sonnenschutz bei Arbeit im Freien, RSA- und White-Card-Kurse und Fahrten zwischen zwei Arbeitsstätten am selben Tag.
- **Eine Abreise mitten im Jahr.** Der Einbehalt unterstellt, dass das Einkommen weiterläuft, eine Abreise im Januar hinterlässt also in der Regel mehr Einbehalt, als je fällig war.

## Wie viel solltest du erwarten?

Niemand kann dir das sagen, bevor er gesehen hat, was einbehalten wurde, und wer ohne diese Zahlen einen Betrag nennt, rät auf deine Kosten. Die Rechnung selbst ist nicht schwer, sobald die Zahlen existieren: gesamte einbehaltene Steuer, minus 15 % des Einkommens bis 45.000 $, plus Levy-Befreiung und Werbungskosten.

Die Höhe deiner Erstattung hängt davon ab, wie falsch dein Einbehalt war, und nicht davon, wie viel du verdient hast. Wer 40.000 $ mit ganzjährig korrektem Einbehalt verdient hat, hat weniger zurückzuholen als jemand mit 20.000 $ und sechs Wochen bei 45 %. Unser [Steuerrechner](/de/calculator) macht dieselbe Rechnung mit den Summen von den Payslips.

## Wann und wie reichst du ein?

Das australische Steuerjahr läuft vom 1. Juli bis 30. Juni, die Selbstabgabe ist bis zum 31. Oktober fällig, und über einen registrierten Steuerberater verlängert sich das bis in den Mai des Folgejahres. Der praktische Startpunkt ist Mitte Juli und nicht der 1. Juli, weil Income Statements erst final sind, wenn die Arbeitgeber ihre Meldungen abgeschlossen haben.

Die eigene Erklärung einzureichen ist kostenlos. Nicht geklärt sind damit die zwei Punkte, die die Zahl am stärksten bewegen: der steuerliche Wohnsitz, der an deinen persönlichen Umständen hängt und ordentlich geprüft werden muss, und die Medicare-Levy-Befreiung, die ein Wochen vorher bestelltes Medicare Entitlement Statement braucht und kein Häkchen. Eine Steuerberatergebühr ist in der Erklärung des Folgejahres absetzbar. Aus Deutschland sind die Hürden die Identitätsprüfung und ein noch offenes australisches Bankkonto. Erstattungen werden meist etwa 14 Werktage nach der Einreichung ausgezahlt, in der Spitze von Juli bis September länger.

## Kannst du auch für Jahre einreichen, die längst vorbei sind?

Ja. Für die verspätete Abgabe einer Erklärung gibt es keine Ausschlussfrist, und nicht abgeholte Erstattungen aus früheren Working-Holiday-Jahren werden regelmäßig zurückgeholt, auch von Leuten, die Australien vor Jahren verlassen haben.

Zwei Dinge solltest du wissen. Eine verspätete Erklärung kann eine Failure-to-Lodge-Strafe auslösen, selbst wenn dir eine Erstattung zusteht, und das ATO wendet sie selektiv an, am ehesten bei einem Muster aus mehreren nicht eingereichten Jahren. Und die Income Statements bleiben in den ATO-Systemen, fehlende Unterlagen sind also nicht die Hürde, als die sie sich anfühlen. Wo die Grenze verläuft, steht in unserem Guide zu [verspäteter Abgabe und den Strafregeln](/de/blog/late-tax-return-penalty-working-holiday).

## Was ist mit deiner Superannuation?

Sie ist ein eigener Antrag und oft der größere. Deine Arbeitgeber haben das Jahr über 12 % deiner regulären Bezüge in einen Superfonds eingezahlt, und nichts davon ist Teil deiner Steuererstattung oder wird von ihr berührt.

Der [Departing Australia Superannuation Payment](/de/superannuation) wird verfügbar, sobald du ausgereist bist und dein Visum abgelaufen ist, und er zahlt das Guthaben abzüglich 65 % Einbehalt auf den steuerpflichtigen Anteil aus. Zwei Leute mit identischer Steuererstattung können dort sehr unterschiedliche Beträge liegen haben. Es ist das Geld, das am häufigsten komplett zurückgelassen wird.
`,
  },
  // ─── TFN (10 posts translated) ─────────────────────────────────────────────

  'what-is-a-tfn': {
    title: 'Was ist eine TFN und wozu brauchst du sie?',
    description: 'Eine Tax File Number ist das Erste, was du zum Arbeiten in Australien brauchst. Ohne TFN behält dein Arbeitgeber fast die Hälfte deines Lohns ein.',
    body: `
Eine Tax File Number ist eine neunstellige Kennung, die das ATO jedem ausstellt, der in Australien Einkommen erzielt. Sie ist kostenlos und dauerhaft, und sie erlaubt deinem Arbeitgeber, zum Working-Holiday-Maker-Satz von 15 % einzubehalten statt zu den 45 %, die ohne sie gelten. Alles Weitere hängt daran.

## Warum zählt eine einzige Nummer so viel?

Weil vier verschiedene Systeme sie als Faden zu dir nutzen. Das ATO für deine Steuer und deine Erstattung. Die Lohnbuchhaltung deines Arbeitgebers für deinen Einbehaltssatz. Dein Superfonds, um dir Beiträge zuzuordnen. Deine Bank, um Quellensteuer auf Zinsen zu vermeiden.

Ein TFN-Problem zeigt sich deshalb als falscher Prozentsatz auf einem Payslip, als Superkonto, das niemand dir zuordnen kann, oder als Erstattung, die nicht bearbeitet werden kann. Die Ursache ist jedes Mal dieselbe.

## Was kostet es, keine hinterlegt zu haben?

Dreißig Cent von jedem Dollar. Mit erfasster TFN wird der Lohn eines Working Holiday Makers mit 15 % einbehalten. Ohne sie muss der Arbeitgeber 45 % einbehalten, und er hat dabei keinen Spielraum.

- 1.000 $ pro Woche: 150 $ bei 15 %, 450 $ bei 45 %, ein Unterschied von 300 $
- 1.500 $ pro Woche: 225 $ gegen 675 $, ein Unterschied von 450 $
- 2.000 $ pro Woche: 300 $ gegen 900 $, ein Unterschied von 600 $

Dauerhaft verloren ist nichts, denn zu viel einbehaltene Steuer kommt mit der Erklärung zurück. Verloren ist der Zugriff auf das Geld in den Monaten dazwischen.

## Wer bekommt eine, und wie schwer ist das?

Jeder mit Arbeitsrecht in Australien: die Working-Holiday-Visa 417 und 462, Studentenvisa mit Arbeitsrecht und die meisten temporären Fachkräftevisa. Der Antrag ist kostenlos und setzt voraus, dass du in Australien bist.

Er ist leicht, und du solltest niemanden dafür bezahlen. Schwerer wird das Declaration-Formular, das dir dein Arbeitgeber an Tag eins hinlegt: Das Wohnsitzfeld darauf ist dieselbe Frage, die am Jahresende über deine Erstattung entscheidet, und sie wird am häufigsten falsch beantwortet.

## Warum zählt das Declaration-Formular mehr als die Nummer?

Weil das Formular deinen Satz setzt. Einem Manager die TFN mündlich zu nennen oder ihm ein Foto des Briefs zu zeigen ändert an der Lohnbuchhaltung nichts. Die Tax File Number Declaration hält zweierlei fest: deine Nummer und deinen Status als Working Holiday Maker.

Jeder Arbeitgeber braucht eine eigene. Deine TFN einer Packhalle bei Shepparton zu geben bringt einer Bar in Melbourne nichts. Der häufigste stille Verlust in einem Backpacker-Jahr ist ein Job korrekt bei 15 % und ein zweiter, der monatelang bei 45 % läuft, weil niemand ein zweites Formular ausgefüllt hat.

## Wie lange dauert es, und was, wenn du schon arbeitest?

Bis zu 28 Tage ist die Obergrenze des ATO, etwa zwei Wochen sind typisch, und sie kommt als Brief an eine australische Adresse. Du kannst anfangen zu arbeiten, bevor sie da ist.

Ab deinem ersten Tag hast du 28 Tage, um sie nachzureichen. Ist auf der Erklärung vermerkt, dass der Antrag läuft, gilt in diesem Fenster der Working-Holiday-Maker-Satz. Ohne diesen Vermerk beginnen die 45 % sofort. Was vor Ankunft der Nummer zu viel einbehalten wurde, kommt zur Steuerzeit zurück und nicht über die Lohnabrechnung.

## Wie vorsichtig musst du damit sein?

Vorsichtig. Eine TFN samt Passscan ist ein brauchbarer Identitätsbaukasten, und Working Holiday Maker werden gezielt anvisiert: neu, unsicher darüber, was normal ist, und über Hostel-Pinnwände und soziale Medien erreichbar.

Die Liste derer, die fragen dürfen, ist kurz: ein Arbeitgeber nach der Einstellung, deine Bank, dein Superfonds, ein registrierter Steuerberater, der für dich handelt, Services Australia und das ATO. Vermieter, Hostels, Recruiter vor der Einstellung und irgendwer in einem Gruppenchat stehen nicht darauf, und abzulehnen kostet dich nichts. Die [vollständige Liste und die Betrugsmuster](/de/blog/who-can-ask-for-your-tfn) lohnen eine einmalige Lektüre.

## Was macht die TFN bei dir teuer?

Eine TFN zu bekommen ist für alle dieselbe kurze Aufgabe. Unterschiedlich ist, ob du schon eine hast und ob der Papierkram drumherum korrekt erledigt wurde. Genau das kostet Geld.

- Ob du je zuvor in Australien gearbeitet hast, denn die Nummer ist dauerhaft und ein neuer Antrag erzeugt einen Doppeldatensatz, der alles verzögert.
- Ob die Postanschrift in deinem Antrag in einem Monat noch Post hält, was die Hauptursache für Verzögerungen ist.
- Wie viele Arbeitgeber du hast, denn jeder braucht ein eigenes Declaration-Formular.
- Ob die Fragen zu Wohnsitz und Freibetrag auf diesem Formular richtig beantwortet wurden, was den Unterschied zwischen Erstattung und Schuld ausmacht.
- Ob dein Superfonds deine TFN hat, denn ein Fonds ohne sie besteuert Beiträge höher und tut sich später schwer, das Konto dir zuzuordnen.

Die Nummer ist das, was deine [Steuererklärung als Working Holiday Maker](/de/tax-return) und jeden [Superantrag nach der Abreise](/de/superannuation) erst möglich macht, und du kannst deine [Steuererstattung schätzen](/de/calculator), zu jedem Zeitpunkt im Jahr.
`,
  },

  'how-to-apply-for-a-tfn': {
    title: 'TFN beantragen: was dabei schiefgeht',
    description: 'Eine Tax File Number kostet nichts. Woran ein Antrag hängt, warum Adresse und Passdaten über das Timing entscheiden, das 28-Tage-Fenster und der Satz von 45 %.',
    body: `
Eine Tax File Number kostet nichts und kommt normalerweise innerhalb von 28 Tagen nach dem Antrag per Post. Beantragt werden kann sie, sobald das Visum erteilt ist, sofern es eine australische Postadresse für den Brief gibt. Geld kostet dich das, was in den Wochen davor passiert.

## Woran hängt der Antrag?

Drei Dinge, und alle drei müssen zusammenpassen: der Reisepass exakt so, wie er gedruckt ist, samt Schreibweise und Geburtsdatum, eine australische Adresse für den Brief und eine E-Mail-Adresse, die in einem Monat noch funktioniert.

Es werden keine Dokumente hochgeladen. Das ATO gleicht den Pass elektronisch mit den Einwanderungsdaten ab, weshalb eine Abweichung zwischen Eingabe und Pass die häufigste Ursache für einen gescheiterten Antrag ist. Was die Prüfung abgleicht, steht in unserem Guide zu den [Ausweisdokumenten für die TFN](/de/blog/tfn-identity-documents-required).

## Welche Adresse solltest du angeben?

Die, an der du in einem Monat noch bist, nicht die, an der du heute bist. Die TFN kommt als physischer Brief, und ein zurückgesandter Brief startet den Vorgang neu statt nachgesendet zu werden. Die Adresse ist damit der größte Einzelfaktor für die Dauer.

Eine Hostel-Adresse geht, wenn du sicher bist, dass du bleibst; ein Hostel, das du in zehn Tagen verlässt, nicht. Die Adresse von Freunden oder eine längerfristige WG ist besser. Eine Adresse, die nicht mehr deine ist, ist der häufigste Grund, warum aus 28 Tagen zwei Monate werden.

## Kannst du anfangen zu arbeiten, bevor sie ankommt?

Ja, und hier entscheidet sich das Geld. Dein Arbeitgeber muss 45 % statt 15 % einbehalten, solange keine TFN hinterlegt ist, aber ein Tax File Number Declaration, das einen laufenden Antrag festhält, hält dich für ein Fenster von 28 Tagen auf dem Working-Holiday-Satz.

Entscheidend ist nicht der Antrag, sondern dass der Arbeitgeber am ersten Tag vom laufenden Antrag weiß und das Declaration es festhält. Ohne das beginnen die 45 % sofort. Der Unterschied bei einer 1.000-$-Woche sind 300 $, jede Woche, bis es korrigiert ist.

Alles zu viel Einbehaltene kommt mit der Erklärung zurück, dauerhaft verloren geht nichts. Verloren geht die Verfügbarkeit über das Geld in den Monaten dazwischen, und das zählt, wenn Miete wöchentlich fällig wird.

## Was passiert, sobald sie da ist?

Jeder Arbeitgeber braucht sein eigenes Tax File Number Declaration. Eine TFN, die du einem Arbeitgeber gegeben hast, wird nicht an einen anderen weitergereicht, und jede Lohnbuchhaltung braucht dieses Declaration, bevor sie den richtigen Satz anwenden kann.

Auf dem nächsten Payslip zeigt sich, ob das gegriffen hat. Auf dem Declaration steht außerdem die Wohnsitzfrage, dieselbe Frage, die später über deine Erstattung entscheidet, und das Feld, das Working Holiday Maker am häufigsten falsch ausfüllen. Was jedes Kästchen fragt, steht in unserem Guide zum [Tax File Number Declaration](/de/blog/tax-file-number-declaration-form).

## Ist die Nummer selbst kostenlos?

Ja, und das gehört klar gesagt, weil oft das Gegenteil suggeriert wird. Die Nummer wird vom ATO ohne Gebühr ausgestellt, und dasselbe sagen wir auf unserer [TFN-Seite](/de/tfn).

Gewonnen und verloren wird das Geld auf beiden Seiten davon: das Declaration-Formular und das 28-Tage-Fenster auf dem Hinweg, die Erklärung, die zu viel einbehaltene Steuer zurückholt, auf dem Rückweg. Die Nummer zu bekommen entscheidet nicht über deine Lage.

## Was, wenn sie nicht ankommt?

Die Referenznummer aus der Bestätigungsmail trägt jede Nachfrage und gehört aufgehoben. Vergehen 28 Tage ohne Post, liegt die Ursache fast immer an der Adresse und nicht an der Prüfung, und die zweithäufigste ist ein Name oder Geburtsdatum, das nicht zum Pass passte.

Ein abgelehnter Antrag ist etwas anderes als ein verzögerter und hat andere Ursachen. Die stehen in unserem Guide zum [abgelehnten TFN-Antrag](/de/blog/tfn-application-rejected).

## Wovon hängt ab, ob das Warten teuer wird?

Der Antrag ist für alle gleich, die Kosten einer Verzögerung nicht. Das entscheidet sich an Punkten, die alle in deiner ersten Woche festgelegt werden.

- Ob du schon gearbeitet hast, bevor du beantragt hast, denn die 45-%-Phase läuft ab der ersten Lohnzahlung und nicht ab dem Antrag.
- Ob du dem Arbeitgeber gesagt hast, dass der Antrag läuft, und ob es auf dem Declaration festgehalten wurde.
- Ob die Postadresse noch deine sein wird, wenn der Brief ankommt.
- Ob deine Passdaten exakt so eingetragen wurden, wie sie gedruckt sind.
- Ob der Arbeitgeber beim ATO als Working-Holiday-Maker-Arbeitgeber registriert ist, denn ein nicht registrierter behält auch nach Ankunft der TFN zu Foreign-Resident-Sätzen ein.
- Wie viele Arbeitgeber du annimmst, denn jeder braucht sein eigenes Declaration.

Alles, was während der Wartezeit zu viel einbehalten wurde, holst du über die [Working-Holiday-Steuererklärung](/de/tax-return) zurück, und du kannst jederzeit im Jahr deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  'how-long-does-it-take-to-get-a-tfn': {
    title: 'Wie lange dauert die TFN? 10 bis 28 Tage',
    description: 'Das ATO stellt die meisten TFNs innerhalb von 28 Tagen aus, oft schon nach 2 Wochen. So läuft die Zustellung und so arbeitest du in der Wartezeit.',
    body: `
Die meisten TFNs kommen nach etwa zwei Wochen. Die Obergrenze des ATO liegt bei 28 Tagen, und die Nummer kommt als Brief an eine australische Adresse, nie per E-Mail und nie per SMS. Das Warten selbst ist selten das Problem. Ob es dich Geld kostet, entscheidet sich daran, ob der Brief deine erste Lohnabrechnung schlägt.

## Warum ist die 28-Tage-Zahl wichtiger als die zwei Wochen?

Es laufen zwei verschiedene 28-Tage-Uhren gleichzeitig, und sie werden ständig verwechselt. Die erste ist die Bearbeitungsobergrenze des ATO für die Ausstellung deiner Tax File Number. Die zweite ist das Fenster ab deinem ersten Arbeitstag, um deinem Arbeitgeber die TFN zu geben, bevor er statt der 15 % für Working Holiday Maker 45 % einbehalten muss. Sie starten an verschiedenen Tagen, und die zweite kostet Geld.

Landest du im Oktober in Cairns, nimmst in der ersten Woche einen Bar-Job an und beantragst in derselben Woche deine TFN, laufen beide Uhren parallel und eine 45-%-Abrechnung siehst du kaum. Reist du erst drei Wochen die Küste hoch und fängst dann sofort an zu arbeiten, ist die Beschäftigungsuhr weit voraus, und in dieser Lücke geht das Geld verloren.

## Was entscheidet tatsächlich, wie lange deine TFN braucht?

Zwei Angaben in deinem eigenen Antrag erklären fast jede Verzögerung über 28 Tage hinaus: die angegebene Postanschrift und ob Pass- und Visumsdaten zu dem passen, was das Department of Home Affairs gespeichert hat.

**Deine Postanschrift.** Deine TFN ist ein Brief. Ein Hostel, das du in zehn Tagen verlässt, eine WG mit acht Namen am Kasten, eine falsche Ziffer in der Postleitzahl: Alles endet mit einem Rückläufer beim ATO und einer Wartezeit, die von vorn beginnt. Bei Anträgen, denen wir hinterhertelefonieren, ist ein Adressproblem mit weitem Abstand die häufigste Ursache.

**Ob deine Daten zu den Einwanderungsdaten passen.** Eine Passnummer mit Zahlendreher, ein Name, der auf der Visumserteilung anders steht als im Pass, oder eine frühere TFN auf einem älteren Visum führen zur manuellen Prüfung. Die ist keine Ablehnung, kostet aber Wochen und löst sich nicht von selbst auf.

**Wo du wohnst.** Zustellung in ländlichen und abgelegenen Regionen dauert länger. Eine Station-Adresse außerhalb von Katherine ist postalisch etwas anderes als eine Wohnung im Zentrum von Melbourne, und die 28 Tage des ATO enthalten den Laufweg von Australia Post kaum.

## Kostet die Wartezeit dich Geld?

Nur dann, wenn sie sich mit bezahlter Arbeit überschneidet und du deinem Arbeitgeber nicht gesagt hast, dass der Antrag läuft. Steht auf der Tax File Number Declaration, dass du eine TFN beantragt hast, behält dein Arbeitgeber während des 28-Tage-Fensters zum Working-Holiday-Maker-Satz ein statt zu 45 %. Sagst du nichts, beginnen die 45 % mit der ersten Abrechnung.

Dauerhaft verloren geht nichts. Zu viel einbehaltene Steuer wird bei der Abgabe deiner Steuererklärung gutgeschrieben, weil die Steuerschuld auf dein Jahreseinkommen berechnet wird und nicht auf den wöchentlichen Abzug. Du verlierst die Verfügbarkeit über das Geld in den Monaten dazwischen, und wer die Hostelmiete aus jeder Abrechnung zahlt, spürt genau das.

## Kannst du arbeiten, bevor deine TFN ankommt?

Ja, und die meisten tun es. Kein Gesetz verbietet eine Anstellung vor Ausstellung der Tax File Number, und kein Arbeitgeber darf dich allein deswegen ablehnen. Über die Lücke trägt dich die Tax File Number Declaration mit dem Vermerk über den laufenden Antrag und die Bestätigungsmail des ATO, falls der Arbeitgeber danach fragt.

## Kannst du das Ganze beschleunigen?

Nein. Es gibt keine kostenpflichtige Überholspur, keine Priorisierung und keinen Online-Statustracker für einen TFN-Antrag. Wer anbietet, deine TFN gegen Gebühr zu beschleunigen, verkauft etwas, das das ATO nicht anbietet.

Kürzer wird es dadurch, dass die beiden Verzögerungsursachen ausgeräumt sind, und beide sind vor dem Antrag entschieden: eine Postanschrift, die dich in einem Monat noch erreicht, und Passdaten, die exakt zum Dokument passen.

## Was tun, wenn 28 Tage vorbei sind und nichts angekommen ist?

Ab Tag 28 ist der Antrag kein Wartespiel mehr, sondern ein Telefonat. Das ATO ist innerhalb der australischen Geschäftszeiten unter 13 28 61 erreichbar, aus dem Ausland unter +61 2 6216 1111, und du brauchst die Referenznummer aus deiner Bestätigungsmail sowie deinen Pass.

Stell keinen zweiten Antrag. Ein Doppelantrag macht aus drei Wochen Verzögerung zwei Monate, weil der widersprüchliche Datensatz erst manuell aufgelöst werden muss. Klär den ursprünglichen Antrag.

## Was kostet dich die Wartezeit wirklich?

Die Wartezeit ist für fast alle gleich. Was sie kostet, ist es nicht, und das sind die Fakten über dein eigenes Jahr, die darüber entscheiden.

- Ob du während der Wartezeit überhaupt arbeitest. Wer bei Ankunft beantragt und erst sechs Wochen später anfängt, hat nichts zu verlieren.
- Ob dein Arbeitgeber den laufenden Antrag auf deinem Declaration-Formular vermerkt hat.
- Ob dein Arbeitgeber beim ATO als Working-Holiday-Maker-Arbeitgeber registriert ist. Ein nicht registrierter behält auch nach Ankunft deiner TFN zu Foreign-Resident-Sätzen ein, was ein zusätzlicher Überabzug ist, der ebenfalls über die Steuererklärung zurückkommt.
- Ob deine Adresse einen Monat lang Post hält. Saisonarbeit bewegt dich, und Erntestädte am schnellsten.
- Ob du auf einem früheren australischen Visum schon einmal eine TFN hattest. Sie gilt lebenslang, und ein neuer Antrag erzeugt genau das Doppelproblem von oben.

Wenn du bereits eine Phase mit 45 % gearbeitet hast, liegt dieses Geld beim ATO und wartet darauf, über deine [Steuererklärung für Working Holiday Maker](/de/tax-return) zurückgeholt zu werden. Du kannst deine [Steuererstattung schätzen](/de/calculator), bevor du irgendetwas einreichst.
`,
  },

  'can-you-start-work-without-a-tfn': {
    title: 'Arbeiten ohne TFN? Die 28-Tage-Regel gilt',
    description: 'Du kannst in Australien anfangen zu arbeiten, bevor deine TFN da ist. Du hast 28 Tage Zeit, sonst werden 45 % Steuer einbehalten.',
    body: `
Ja. Nichts hindert dich daran, zu arbeiten, bevor deine Tax File Number ankommt, und kein Arbeitgeber darf sie vor der Einstellung verlangen. Du hast ab deinem ersten Tag 28 Tage Zeit, sie nachzureichen. Vermerke auf dem Declaration-Formular, dass du beantragt hast, dann gilt in diesem Fenster der Working-Holiday-Maker-Satz.

## Was besagt die 28-Tage-Regel genau?

Die 28 Tage laufen ab dem Tag, an dem du bei diesem Arbeitgeber anfängst, nicht ab dem Tag deines TFN-Antrags und nicht ab deiner Ankunft in Australien. Liegt dem Arbeitgeber eine Tax File Number Declaration mit dem Vermerk über den laufenden Antrag vor, behält er in diesen 28 Tagen zum normalen Working-Holiday-Maker-Satz von 15 % ein. Verstreichen die 28 Tage ohne TFN, sind es ab dann 45 % auf jede Lohnzahlung.

Die Uhr läuft pro Arbeitgeber. Fängst du im März in einem Café in Perth an und im Mai in einer Packhalle bei Shepparton, startet bei jedem eine eigene 28-Tage-Frist und jeder braucht ein eigenes Formular.

## Was bewirkt das Declaration-Formular tatsächlich?

Die Tax File Number Declaration legt deinen Einbehaltungssatz fest. Dort erklärst du, dass du Working Holiday Maker bist, und gibst entweder eine TFN an oder vermerkst, dass du eine beantragt hast. Die Lohnbuchhaltung liest dieses Formular und wendet den Satz entsprechend an.

Ein Foto des TFN-Briefs oder die mündlich genannte Nummer ändert deshalb nichts an deinem Lohn. Der Satz folgt dem Formular. Ebenso wichtig ist das Wohnsitzkästchen: Dieselbe Frage entscheidet am Jahresende über deine Erstattung, und sie wird häufiger falsch angekreuzt als jedes andere Feld.

## Gelten die 45 % auf alles, wenn du das Fenster verpasst?

Nein. Verstreichen die 28 Tage, gilt der höhere Satz für jede folgende Lohnzahlung in voller Höhe. Rückwirkend auf bereits erhaltene Zahlungen wird er nicht angewendet, und kein Arbeitgeber holt sich Geld aus vergangenen Löhnen zurück.

Reichst du die TFN nach, gilt ab der nächsten Abrechnung wieder der korrekte Satz. Der zu viel einbehaltene Anteil aus der Lücke wird nicht in der Lohnbuchhaltung repariert, sondern kommt über das ATO zurück, wenn deine Steuererklärung eingereicht ist.

## Was sagst du deinem Arbeitgeber am ersten Tag?

Sag, dass dein TFN-Antrag läuft, biete die Bestätigungsmail des ATO als Beleg an und bitte darum, die Tax File Number Declaration mit dem Vermerk über den laufenden Antrag auszufüllen. Mehr ist das Gespräch nicht.

Große Gastronomiegruppen und die Personaldienstleister, die Erntearbeit vermitteln, machen das standardmäßig richtig. Die Lücken sehen wir bei kleinen unabhängigen Betrieben und Einzelfarmen, wo die Lohnabrechnung nebenbei erledigt wird und ein falscher Satz erst auffällt, wenn im Juni jemand einen Payslip liest.

## Brauchst du die TFN in der Wartezeit noch für etwas anderes?

Ein australisches Bankkonto kannst du ohne TFN eröffnen, und Lohn kann darauf gehen. Offen bleiben sollte dagegen nicht dein Superfonds. Ein Fonds ohne deine TFN besteuert Beiträge höher, kann manche gar nicht annehmen und macht das Konto später schwerer auffindbar, wenn du es auszahlen willst.

Superannuation wird ohnehin ab dem ersten Dollar auf deinen Lohn gezahlt, mit 12 %, und als Working Holiday Maker kannst du deine [Superannuation nach der Abreise auszahlen lassen](/de/superannuation). Ein Konto, das der Fonds dir nicht zuordnen kann, ist der häufigste Grund, warum Super in Australien liegen bleibt.

## Wie teuer wird dein 28-Tage-Fenster?

Die 28-Tage-Regel ist für alle gleich. Was das Fenster dich kostet, hängt an fünf Fakten zu deinem Startdatum und deinen Arbeitgebern.

- Ob du vor oder nach Arbeitsbeginn beantragt hast. Wer zuerst beantragt, sieht fast nie eine 45-%-Abrechnung.
- Ob die Erklärung den laufenden Antrag vermerkt hat. Ohne diesen Vermerk starten die 45 % sofort statt nach 28 Tagen.
- Ob die Adresse auf deinem Antrag einen Monat lang Post hält. Saisonarbeit bewegt Leute, und ein Rückläufer verlängert die Wartezeit über die 28 Tage hinaus.
- Ob dein Arbeitgeber beim ATO als Working-Holiday-Maker-Arbeitgeber registriert ist. Wenn nicht, behält er auch mit vorliegender TFN zu Foreign-Resident-Sätzen ein, was ein zusätzlicher Überabzug ist, den du ebenfalls zurückbekommst.
- Wie viele Arbeitgeber du im Jahr hattest. Jeder ist ein eigenes Formular und eine eigene Uhr.

Jede Phase mit mehr als 15 % Einbehalt ist Geld, das du über deine [Steuererklärung als Working Holiday Maker](/de/tax-return) zurückholst, und du kannst deine [Steuererstattung schätzen](/de/calculator), bevor du irgendetwas entscheidest.
`,
  },

  'what-happens-without-your-tfn': {
    title: '45 % statt 15 %: was ohne TFN passiert',
    description: 'Ohne TFN muss dein Arbeitgeber 45 % statt 15 % einbehalten. Wie du das schnell korrigierst und dir jeden Dollar zurückholst.',
    body: `
Dreißig Cent von jedem Dollar, solange es dauert. Mit hinterlegter TFN behält dein Arbeitgeber 15 % ein, ohne muss er 45 % einbehalten. Bei 1.000 $ pro Woche gehen so 300 $ ans ATO statt auf dein Konto, und bei einem Job für 25 $ die Stunde sind es rund 7,50 $ pro Stunde.

## Warum nimmt dein Arbeitgeber 45 % und nicht 15 %?

Dein Arbeitgeber hat hier keinen Ermessensspielraum, und es ist kein Urteil über dich. Das australische Steuerrecht verlangt von einem Arbeitgeber ohne die Tax File Number eines Angestellten den Einbehalt zum höchsten Grenzsteuersatz von 45 %. Wer sich darüber hinwegsetzt, haftet selbst gegenüber dem ATO, nicht du. Den Working-Holiday-Maker-Satz von 15 % schaltet ein Dokument frei, nicht ein Visum.

Dieses Dokument ist die Tax File Number Declaration. Das Visum vorzuzeigen oder ein Foto des TFN-Briefs zu schicken, reicht nicht. Bis die Erklärung in der Lohnbuchhaltung liegt, wendet das Lohnsystem den Satz an, den es gesetzlich anwenden muss.

## Was kostet dich der Einbehalt von 45 % konkret?

Der Abstand beträgt 30 Prozentpunkte. Unten die Wochenunterschiede bei Löhnen, die für Vollzeit-Saison- und Gastronomiearbeit realistisch sind.

- 800 $ pro Woche: 120 $ Einbehalt bei 15 % gegen 360 $ bei 45 %, ein Unterschied von 240 $
- 1.000 $ pro Woche: 150 $ gegen 450 $, ein Unterschied von 300 $
- 1.500 $ pro Woche: 225 $ gegen 675 $, ein Unterschied von 450 $
- 2.000 $ pro Woche: 300 $ gegen 900 $, ein Unterschied von 600 $

Ein Monat Vollzeit-Farmarbeit in der Saison um Bundaberg oder Mildura zu diesen Sätzen ergibt locker einen vierstelligen Überabzug.

## Bekommst du das Geld zurück?

Ja, vollständig. Zu viel einbehaltene Steuer ist keine Strafe, sondern eine Vorauszahlung auf eine Schuld, die du nicht in dieser Höhe hast.

Bei der Abgabe deiner Steuererklärung ermittelt das ATO, was du über das ganze Steuerjahr geschuldet hast, und erstattet die Differenz auf ein australisches Bankkonto. Für die meisten Working Holiday Maker, die Monate zum falschen Satz gearbeitet haben, ist diese Erstattung die größte Einzelzahlung ihres Australienjahres.

Was du verlierst, ist der Zugriff auf das Geld in der Zwischenzeit. Wer die Hostelmiete Woche für Woche aus jeder Abrechnung zahlt, für den sind mehrere Monate ohne 300 $ pro Woche ein echtes Problem, auch wenn die Bilanz am Ende stimmt. Das ist der reale Preis.

## Wie stoppst du es?

Gib deinem Arbeitgeber eine ausgefüllte Tax File Number Declaration mit deiner TFN. Ab der nächsten Abrechnung gilt der korrekte Satz. Frühere Abrechnungen berechnet dein Arbeitgeber nicht mit 15 % neu, und er muss es auch nicht: Den früheren Überabzug korrigiert das ATO zur Steuerzeit.

Wenn dein Antrag noch läuft, vermerke das auf der Erklärung. Ein Arbeitgeber, dem dieser Vermerk vorliegt, wendet im 28-Tage-Fenster den Working-Holiday-Maker-Satz an statt 45 %, was meist bedeutet, dass du nie eine hoch besteuerte Abrechnung siehst.

## Was entscheidet, wie lange du bei 45 % bleibst?

Vier Dinge, und keines davon ist ein langsames ATO. Deshalb fällt die Dauer der 45-%-Phase zwischen Leuten, die am selben Tag beantragt haben, so unterschiedlich aus.

**Ob du deinem Arbeitgeber gesagt hast, dass der Antrag läuft.** Die Erklärung hält es fest, und dieser Vermerk trägt den Working-Holiday-Satz durch das 28-Tage-Fenster.

**Ob die Postanschrift auf deinem Antrag stimmte.** Deine TFN kommt als Brief. Eine falsche Adresse ist die häufigste Ursache für Verzögerungen über 28 Tage hinaus, und jede weitere Woche ist eine weitere Woche bei 45 %.

**Ob dein Arbeitgeber beim ATO als Working-Holiday-Maker-Arbeitgeber registriert ist.** Ein nicht registrierter Arbeitgeber muss zu Foreign-Resident-Sätzen einbehalten, auch wenn deine TFN vorliegt. Das ist eine andere Regel und ein zusätzlicher Überabzug, nicht dein Fehler, und auch er kommt zur Steuerzeit zurück. Rechne den Prozentsatz auf dem Payslip nach, statt anzunehmen, die TFN habe alles gelöst.

**Wie viele Arbeitgeber du hattest.** Jeder Arbeitgeber braucht eine eigene Erklärung. Die TFN der Packhalle zu geben, gibt sie nicht dem Pub, und ein häufiges Muster ist ein Job korrekt bei 15 % und ein zweiter, der zwei Monate lang still bei 45 % läuft.

## Gilt das auch für Arbeit auf die Hand?

Barzahlung liegt außerhalb dieser Regel, weil dort meist gar keine Lohnbuchhaltung einen Satz anwendet, und das ist ein größeres Problem. Löhne in bar sind nur legal, wenn trotzdem Steuer einbehalten und Super gezahlt wird. Passiert beides nicht, gibt es keinen Einbehalt zurückzuholen und kein Income Statement, aus dem sich eine Erklärung erstellen ließe.

War ein Teil deines Jahres bar bezahlt, gehört dieses Einkommen trotzdem in deine Erklärung. Die Zahlungsweise ändert, welche Nachweise nötig sind, nicht ob es erklärt wird. Was das praktisch heißt, steht in [Arbeit auf die Hand in Australien](/de/blog/can-your-employer-pay-you-cash-in-hand).

## Kannst du das Geld vor Jahresende zurückholen?

In der Regel wartest du das Ende des Steuerjahres am 30. Juni ab. Die Ausnahme ist die endgültige Ausreise: Wer abreist und in diesem Jahr kein australisches Einkommen mehr erzielt, kann eine vorzeitige Steuererklärung schon vor dem 30. Juni einreichen.

Ob das der richtige Schritt ist, hängt von deinem Wohnsitz für das Jahr ab, davon, ob gleichzeitig Super zu beantragen ist, und davon, ob noch ein Arbeitgeber ein abschließendes Income Statement ausstellen muss. Du kannst vorher deine [Steuererstattung schätzen](/de/calculator), und eine Phase mit 45 % ist genau die Situation, in der Schätzung und Endbetrag am weitesten auseinanderliegen.
`,
  },

  'tfn-vs-abn-difference': {
    title: 'TFN oder ABN: welche brauchst du wirklich?',
    description: 'Die TFN brauchst du als Angestellter, die ABN nur, wenn du auf Rechnung arbeitest. Die meisten Working Holiday Maker brauchen ausschließlich eine TFN.',
    body: `
Eine TFN ist deine persönliche Steuernummer, genutzt wenn ein Arbeitgeber dir Lohn zahlt und Steuer für dich einbehält. Eine ABN weist dich als Unternehmen aus, genutzt wenn du für deine Arbeit Rechnungen stellst und überhaupt nichts einbehalten wird. Die meisten Working Holiday Maker brauchen nur eine TFN. Viele brauchen am Ende beide.

## Wofür ist eine TFN da?

Eine TFN ist deine dauerhafte Identität beim ATO, und jeder mit Einkommen in Australien braucht eine, ob angestellt oder selbstständig. Sie verbindet Lohn, Einbehalt, [Superannuation](/de/superannuation) und Erstattung mit derselben Person, läuft nie ab und ändert sich nie.

Du brauchst eine TFN für alles, was über eine Gehaltsliste läuft: Lohn, PAYG-Einbehalt zum Working-Holiday-Maker-Satz, Superbeiträge des Arbeitgebers und die Abgabe einer Erklärung am Jahresende. Das deckt den größten Teil von Gastronomie, Einzelhandel, Lagerarbeit und angestellter Farmarbeit ab.

## Wofür ist eine ABN da?

Eine ABN ist eine elfstellige Unternehmenskennung für die Tätigkeit als Sole Trader. Sie erlaubt dir, einem Kunden eine Rechnung zu stellen, und bringt die gesamte Steuerverantwortung mit sich, die sonst dein Arbeitgeber trägt.

- Du stellst Rechnungen für die Arbeit, statt über die Lohnbuchhaltung bezahlt zu werden
- Es wird nichts einbehalten, die Steuer wird also erst bei der Veranlagung fällig
- Es wird keine Arbeitgeber-Superannuation für dich gezahlt
- Du trägst das unternehmerische Risiko und stellst in der Regel deine eigene Ausrüstung

Üblich ist das in Gig-Arbeit, Lieferdiensten, manchen Akkordlohn-Erntevereinbarungen und in jedem Job, in dem der Betrieb eine Rechnung statt einer Anmeldung verlangt. Wann das legitim ist, steht in unserem Guide dazu, [was eine ABN ist](/de/blog/what-is-an-abn).

## Kannst du beide gleichzeitig haben?

Ja, und sehr viele Working Holiday Maker tun das. Die TFN ist immer erforderlich, und die ABN steht daneben für den Contracting-Anteil deines Einkommens. Beides zu halten erzeugt keinen Konflikt.

Es erzeugt eine einzige Erklärung mit zwei Einkommensarten. Lohn kommt mit bereits einbehaltener Steuer, ABN-Einkommen ohne, und der Einbehalt auf der Lohnseite fängt deshalb oft die Schuld auf der ABN-Seite auf. Wie das zusammenwirkt, steht in unseren [ABN-Guides](/de/blog/category/abn).

## Wie erkennst du, welche für deinen Job gilt?

Der Test ist Kontrolle, nicht der Wortlaut der Stellenanzeige. Entscheidet der Betrieb, wann du anfängst, wie die Arbeit gemacht wird und welche Ausrüstung du benutzt, ist das Anstellung und braucht eine TFN. Entscheidest du das, stellst für ein Ergebnis Rechnung und trägst das Risiko, eigene Fehler auf eigene Kosten zu beheben, ist das Contracting und braucht eine ABN.

- **Angestellter**: auf der Gehaltsliste, Steuer einbehalten, Super obendrauf, der Betrieb steuert die Arbeit
- **Contractor**: Rechnungen gestellt, Bruttozahlungen, eigene Steuer und Super, du steuerst die Arbeit

Eine Anzeige, die eine ABN für beaufsichtigte Schichtarbeit zu festen Zeiten verlangt, beschreibt Anstellung. Das ist Sham Contracting, und unser Guide zum [Status Angestellter gegen Contractor](/de/blog/employee-vs-contractor-australia) erklärt den Test und was er dich kostet.

## Was kostet dich die falsche Nummer tatsächlich?

Auf einer ABN zu sein, obwohl du Angestellter sein solltest, kostet dich die 12 % Super, den Award-Mindestsatz, Zuschläge und jeden Unfallversicherungsschutz, und verlagert die gesamte Steuerrechnung ans Jahresende auf dich. Das ist die teuerste Fehleinstufung für einen Backpacker.

Der umgekehrte Fehler ist billiger, aber nicht kostenlos. Ohne hinterlegte TFN zu arbeiten bedeutet 45 % Einbehalt statt 15 %, was mit der Erklärung zurückkommt, aber erst nach Monaten ohne das Geld, und keine ABN auf einer Rechnung bedeutet 47 % Einbehalt durch den Zahler.

## Was entscheidet, welche du dieses Jahr brauchst?

Drei Tatsachen über die Arbeit selbst, und keine davon ist, was der Arbeitgeber bevorzugt. Wer kontrolliert, wie die Arbeit gemacht wird. Wer die Ausrüstung stellt und das Risiko trägt. Und ob du für Stunden oder für ein Ergebnis bezahlt wirst.

Die meisten Working-Holiday-Jahre enthalten eine Mischung: Eine Barschicht in Melbourne und eine Lieferrunde im selben Monat sind unterschiedliche Vereinbarungen. Nicht in Ordnung ist es, wenn eine Farm oder eine Agentur für dich entscheidet, dass Schichtarbeit Contracting sei. Das prüft man besser vor der ersten Lohnzahlung, denn die Super lässt sich nachträglich am schwersten zurückholen.
`,
  },

  'apply-for-tfn-before-arriving': {
    title: 'TFN vor der Ankunft beantragen? Die Regeln',
    description: 'Für die TFN musst du in Australien sein, aber du kannst alles vorbereiten und am ersten Tag beantragen. Die komplette Checkliste.',
    body: `
Nein. Der Online-TFN-Antrag des ATO für Inhaber ausländischer Pässe setzt voraus, dass du in Australien bist, ein Working Holiday Maker kann ihn also nicht von zu Hause aus stellen. Vorbereiten lässt sich trotzdem alles, damit der Antrag an Tag eins rausgeht, und das entscheidet meist darüber, ob du eine 45-%-Abrechnung siehst.

## Warum muss der Antrag bis zur Ankunft warten?

Der Antrag setzt voraus, dass deine Einreise gegen dein Visum erfasst ist, und braucht zusätzlich eine australische Postanschrift, an die die Nummer geschickt wird. Beides macht ihn zu einer Aufgabe für nach der Ankunft.

Ein monatelang vorher erteiltes Visum ändert daran nichts. Der Antrag hängt nicht an der Erteilung, sondern daran, dass du hier bist.

## Macht es wirklich einen Unterschied, an Tag eins zu beantragen?

Ja. Ab deinem ersten Arbeitstag hast du 28 Tage, um einem Arbeitgeber die TFN zu geben, bevor er statt der 15 % für Working Holiday Maker 45 % einbehalten muss. Das ATO braucht bis zu 28 Tage für die Ausstellung. Beide Uhren sind fast gleich lang, die einzige echte Variable ist die Zeit zwischen Landung und Antrag.

Antrag an Tag eins und Arbeitsbeginn in Woche zwei: Der Brief kommt mit hoher Wahrscheinlichkeit innerhalb des Beschäftigungsfensters an. Erst einen Monat die Küste hoch und dann Arbeitsbeginn am Tag nach dem Antrag: Das ist eine Lücke, die 30 Cent pro Dollar kostet, bis sie sich schließt.

## Was sollte vor dem Abflug bereitliegen?

Alles außer dem Absenden selbst. Der Antrag ist kostenlos, und das Formular ist nicht der schwierige Teil.

- Deine Passdaten als Foto der Identitätsseite statt aus dem Gedächtnis. Aus dem Gedächtnis eingetragene Daten schicken Anträge in die manuelle Prüfung.
- Deine Visa Grant Notice, auch offline abrufbar.
- Eine Entscheidung über deine australische Postanschrift, die einzige Sache, über die du vor der Landung wirklich nachdenken solltest.
- Eine E-Mail-Adresse, die du tatsächlich abrufst: Die Bestätigung trägt die Referenznummer für den Fall, dass etwas schiefgeht.

## Welche Adresse solltest du angeben?

Eine, die in vier Wochen noch deine Post hält, nicht die, wo du in der ersten Nacht schläfst. Diese Entscheidung verursacht mehr Verzögerungen als alles andere zusammen, weil deine TFN nur als Brief kommt.

Ein Hostel geht, wenn es ein Postsystem hat und du für ein paar Wochen eingebucht bist. Ein Hostel, das du am Freitag verlässt, geht nicht. Freunde oder Verwandte mit einer festen Adresse in Australien sind meist die bessere Antwort, selbst wenn du nie dort hinfährst.

## Ändert sich deine TFN, wenn dein Visum sich ändert?

Nein. Eine Tax File Number wird einmal ausgestellt und lebenslang behalten. Sie läuft nicht mit dem Visum ab, ändert sich nicht mit einem zweiten Working-Holiday-Visum und muss auch nicht erneuert werden, wenn du Jahre später auf einem ganz anderen Visum zurückkommst.

Aktuell bleiben muss die Adresse, die das ATO dazu gespeichert hat, denn dorthin geht die Korrespondenz und jede Erstattung auf Papier. Wer schon einmal mit einem Studenten- oder Working-Holiday-Visum in Australien war, hat vermutlich bereits eine TFN, und es geht um Wiederbeschaffung statt Neuantrag.

## Worauf kommt es bei deiner Ankunft an?

Der Antrag wird für alle aus Australien heraus gestellt. Die Variable ist, was die Lücke zwischen Landung und Antrag kostet. Fünf Fakten über deine eigene Ankunft entscheiden, ob diese Lücke zählt.

- Ob du schon einmal mit irgendeinem Visum mit Arbeitsrecht in Australien warst. Dann hast du bereits eine TFN, und ein neuer Antrag erzeugt einen Doppeldatensatz, der alles verzögert.
- Wie schnell du arbeiten willst. Wer im Juni mit einem festen Job in eine Skisaison in Thredbo startet, hat eine deutlich engere Marge als jemand, der erst reist.
- Ob du eine stabile australische Adresse hast oder jemanden im Land, der eine für dich sein kann.
- Ob dein erster Arbeitgeber beim ATO als Working-Holiday-Maker-Arbeitgeber registriert ist, denn ein nicht registrierter behält auch mit vorliegender TFN zu Foreign-Resident-Sätzen ein.
- Ob deine Adresse den Brief tatsächlich erreicht, denn ein Rückläufer setzt die Wartezeit zurück und schiebt dich über die 28 Tage.

Sobald du arbeitest, kommt die Steuer, die vor Hinterlegung der Nummer einbehalten wurde, über deine [Steuererklärung als Working Holiday Maker](/de/tax-return) zurück, und du kannst deine [Steuererstattung schätzen](/de/calculator), zu jedem Zeitpunkt im Jahr.
`,
  },

  'tfn-application-delayed': {
    title: 'TFN nach 28 Tagen nicht da? Drei Schritte',
    description: 'Meist liegt es an einer falschen Adresse oder einer Prüfung. Die 3 Schritte, die fast jede Verzögerung lösen, und wie du solange korrekt arbeitest.',
    body: `
Wenn deine TFN nach 28 Tagen nicht angekommen ist, liegt es fast immer an einer Adresse, die der Brief nicht erreicht hat, an Daten, die nicht zu den Einwanderungsunterlagen passen, oder an einem Doppelantrag. Die 28 Tage des ATO laufen ab Eingang des Antrags, also prüfe das zuerst. Viele Verzögerungen sind gar keine.

## Sind die 28 Tage wirklich vorbei?

Das Bearbeitungsfenster beginnt an dem Tag, an dem das ATO deinen Antrag erhalten hat, nicht bei deiner Ankunft in Australien. Online-Anträge gehen normalerweise am selben Tag ein, die Bestätigungsmail klärt die Frage also.

Sind es weniger als 28 Tage, liegt der Antrag im normalen Fenster und es gibt nichts zu eskalieren. Postzustellung in ländlichen und abgelegenen Regionen dauert wirklich länger als in der Stadt, eine Station-Adresse in den Kimberleys ist etwas anderes als eine Adresse im Zentrum von Sydney.

## Warum ist die Adresse das Erste, was du prüfen solltest?

Deine TFN ist ein physischer Brief und sonst nichts. Es gibt keine Zustellung per E-Mail oder SMS und keine Onlinekopie, eine Adresse, die der Brief nicht erreicht, ist also ein Totalausfall und keine Unannehmlichkeit. Das ist die mit Abstand häufigste Ursache für eine TFN, die nie auftaucht.

Die Fehler sind banal. Eine vertauschte Ziffer in der Postleitzahl. Ein Hostelfach, das niemand leert. Eine Adresse, die du in deiner ersten Woche angegeben und in deiner dritten verlassen hast. Wer seit dem Antrag umgezogen ist, fragt am besten zuerst an der alten Adresse nach, denn oft liegt der Brief genau dort.

## Was bringt einen Antrag sonst noch in die Prüfung?

Die zweite Ursache ist eine Abweichung zwischen deinem Antrag und den Daten, die das Department of Home Affairs führt. Eine Passnummer mit einem Zahlendreher, ein Name, der auf der Visumserteilung in anderer Reihenfolge steht als im Pass, oder ein zweiter Vorname, der einmal genannt und einmal weggelassen wurde, reichen jeweils aus, um die automatische Bearbeitung zu stoppen.

Die dritte ist eine frühere TFN. Eine Tax File Number wird einmal ausgestellt und lebenslang behalten. Wer auf einem früheren Studenten- oder Working-Holiday-Visum eine hatte, hat bereits eine Nummer, und ein neuer Antrag steht im Konflikt dazu. Wer schon einmal mit einem Visum mit Arbeitsrecht in Australien war, sollte davon ausgehen, dass die Aufgabe Wiederbeschaffung heißt und nicht Antrag.

## Warum solltest du nicht einfach ein zweites Mal beantragen?

Weil es der zuverlässigste Weg ist, aus drei Wochen Verzögerung zwei Monate zu machen. Ein Doppelantrag erzeugt einen widersprüchlichen Datensatz, der manuell aufgelöst werden muss, und die manuelle Auflösung ist langsamer als die Warteschlange, in der du ohnehin schon standest.

Das ist der häufigste Fehler und völlig verständlich: Es kommt nichts an, das Formular ist kostenlos, ein neuer Antrag fühlt sich nach Handeln an. Er macht es zuverlässig schlimmer. Klär stattdessen den ursprünglichen Antrag.

## Wie bringst du einen festhängenden Antrag in Bewegung?

Ab Tag 28 ist es kein Wartespiel mehr. Das ATO ist während der australischen Geschäftszeiten unter 13 28 61 erreichbar, aus dem Ausland unter +61 2 6216 1111, und die Identitätsprüfung stützt sich auf deinen Pass und die Referenznummer aus der Bestätigungsmail.

Zu klären ist zweierlei: ob die TFN ausgestellt wurde und an welche Adresse. Wurde sie ausgestellt und der Brief ist verloren gegangen, wird die hinterlegte Adresse korrigiert und der Brief neu verschickt. Wurde sie nie ausgestellt, erfährst du, was sie aufhält. Ein Steuerberater kann das für dich übernehmen, was vor allem die Warteschleife und die Identitätsprüfung erspart, die auf Dokumente ausgelegt ist, die ein Backpacker drei Wochen nach der Landung oft nicht hat.

## Kannst du weiterarbeiten, solange es ungeklärt ist?

Ja, und das solltest du auch. Die Verzögerung berührt dein Recht zu arbeiten nicht, und sie muss auch deinen Steuersatz nicht berühren. Dein Arbeitgeber hält dich im 28-Tage-Beschäftigungsfenster beim Working-Holiday-Maker-Satz von 15 %, wenn die Tax File Number Declaration den laufenden Antrag vermerkt, und die Bestätigungsmail ist dein Beleg dafür.

Läuft dein eigenes 28-Tage-Fenster ab, während der ATO-Antrag noch offen ist, sag das der Lohnbuchhaltung offen. Manche Arbeitgeber halten den Satz auf Basis der ATO-Korrespondenz. Andere wenden 45 % an, weil die Regel das sagt, und der Überschuss kommt dann über deine [Steuererklärung als Working Holiday Maker](/de/tax-return) zurück.

## Wo hakt es bei deinem Antrag?

Eine Verzögerung über 28 Tage hinaus hat fast immer eine konkrete Ursache und liegt selten an einer Warteschlange. Diese Fakten über deinen eigenen Antrag entscheiden, ob die Lösung ein Anruf ist oder Abwarten.

- Ob du schon einmal eine australische TFN hattest, auf irgendeinem Visum. Dann ist das eine Wiederbeschaffung, kein Antrag, und der neue Antrag ist genau das, was blockiert.
- Ob die angegebene Adresse deine Post noch hält. Ernte- und Gastroarbeit bewegt Menschen schneller, als die Post Briefe bewegt.
- Ob deine Passdaten im Antrag exakt zur Visumserteilung passen, samt Namensreihenfolge und zweiten Vornamen.
- Ob ein zweiter Antrag existiert. Wenn ja, ist das sehr wahrscheinlich das ganze Problem.
- Ob du während der Verzögerung arbeitest und ob die Erklärung den Antrag vermerkt. Daran entscheidet sich, ob die Verzögerung dich überhaupt etwas kostet.

Wenn bereits eine Reihe von Abrechnungen mit 45 % gelaufen ist, ist nichts davon verloren, und wie das Jahr nach der Abrechnung dasteht, rechnet dir der [Erstattungsrechner](/de/calculator) grob aus.
`,
  },

  'do-you-need-new-tfn-second-visa': {
    title: 'Zweites Visum: brauchst du eine neue TFN?',
    description: 'Die TFN gilt lebenslang, beim zweiten oder dritten Visum brauchst du also keinen neuen Antrag. Was du stattdessen beim ATO aktualisieren solltest.',
    body: `
Nein. Eine Tax File Number wird einmal ausgestellt und lebenslang behalten. Sie läuft nicht mit dem Visum ab, ändert sich nicht bei einem zweiten oder dritten Working-Holiday-Visum und muss nach Jahren Abwesenheit nicht reaktiviert werden. Es gelten dieselben neun Ziffern. Aufmerksamkeit braucht das, was das ATO dazu gespeichert hat.

## Warum überlebt die TFN das Visum?

Weil sie dich identifiziert, nicht dein Visum. Die Nummer hängt beim ATO an einer Person, und jeder Arbeitgeber, jeder Superfonds, jede Bank und jede Steuererklärung, die du je in Australien hattest, ist darüber verknüpft. Eine zweite Nummer würde diese Historie zerreißen.

Ein zweiter Antrag ist deshalb schädlich, nicht bloß überflüssig. Er erzeugt einen Doppeldatensatz, der manuell aufgelöst werden muss, und macht aus einer Fünfminutensuche ein Sechswochenproblem.

## Wo findest du eine TFN, die du verlegt hast?

Sie steht auf mehr Dokumenten, als man denkt, und sie zu finden ist meist schneller als jeder Vorgang mit dem ATO. Fang mit allem an, was aus deinem ersten Aufenthalt übrig ist.

- Der Originalbrief, den das ATO bei der Ausstellung geschickt hat
- Jeder Payslip und jedes Income Statement eines australischen Arbeitgebers
- Jede australische Steuererklärung, die du eingereicht hast
- Korrespondenz deines Superfonds, die sie trägt, wenn du sie angegeben hast
- Jede frühere ATO-Korrespondenz überhaupt

Wenn nichts davon überlebt hat, lässt sie sich über einen Steuerberater oder beim ATO unter 13 28 61 wiederfinden. Was du nicht tun darfst, ist erneut zu beantragen.

## Was muss bei der Rückkehr tatsächlich aktualisiert werden?

Drei Datensätze, keiner davon die TFN selbst. Vor der ersten Abrechnung richtig gestellt, machen sie das zweite Jahr ereignislos.

**Deine Adresse.** Das ATO hat weiterhin, was du beim ersten Aufenthalt angegeben hast, für die meisten ein längst verlassenes Hostel. Alles Verschickte folgt dieser Adresse, bis sie geändert wird.

**Dein Bankkonto.** Eine Erstattung auf ein geschlossenes australisches Konto verschwindet nicht, sie prallt zurück und liegt als Guthaben, bis jemand dem ATO sagt, wohin damit. Zurückkehrende Backpacker haben häufig Geld liegen aus einem ersten Jahr, für das sie nie eingereicht haben.

**Ein Declaration-Formular für jeden neuen Arbeitgeber.** Dass deine TFN dauerhaft ist, heißt nicht, dass sie zwischen Arbeitgebern wandert. Jeder neue Arbeitgeber braucht eine eigene Tax File Number Declaration, mit den Working-Holiday-Fragen für das Visum, auf dem du jetzt bist.

## Was ist mit der Super aus deinem ersten Aufenthalt?

Hier bleibt viel Geld liegen. Hast du bei der Abreise eine Departing Australia Superannuation Payment beantragt, ist dieses Konto geschlossen und dein zweiter Aufenthalt sammelt in ein neues, wahrscheinlich bei einem anderen Fonds.

Hast du sie nicht beantragt, gehört sie weiterhin dir. Sie liegt noch beim ursprünglichen Fonds oder wurde als unclaimed ans ATO übertragen. So oder so hängt sie an derselben TFN, die du gleich wieder benutzt. Reist du am Ende dieses Visums wieder ab, lassen sich beide Aufenthalte zusammen erledigen, wenn du deine [Superannuation nach der Abreise auszahlen lässt](/de/superannuation).

## Funktionieren die Steuerregeln beim zweiten Mal gleich?

Im Wesentlichen ja. Das Steuerjahr läuft vom 1. Juli bis 30. Juni, für jedes Jahr mit australischem Einkommen ist eine Erklärung fällig, die Standardfrist ist der 31. Oktober, und der Working-Holiday-Maker-Satz von 15 % gilt bis 45.000 $, sofern deine Arbeitgeber deine TFN haben und als Working-Holiday-Maker-Arbeitgeber registriert sind.

Anders ist, dass du jetzt eine Historie hast. Ein Vorjahr, für das du nie eingereicht hast, ist weiterhin offen, und es enthält meist eine Erstattung statt einer Schuld, weil bei den meisten Backpackern im ersten Jahr zu viel einbehalten wurde.

## Welche Datensätze hängen noch an deiner Nummer?

Die TFN ändert sich nie, die Arbeit bei einem zweiten Aufenthalt betrifft also die Datensätze, die daran hängen. Was zu prüfen lohnt, hängt davon ab, wie dein erster Aufenthalt endete.

- Ob du für deinen ersten Aufenthalt eingereicht hast. Ein nicht eingereichtes Jahr ist stillstehendes Geld, kein Problem, das vergeht.
- Ob die Super aus dem ersten Aufenthalt beansprucht wurde, beim Fonds blieb oder als unclaimed ans ATO ging.
- Ob das Bankkonto, auf das deine letzte Erstattung zielte, noch existiert.
- Ob dein altes Onlinekonto beim ATO noch erreichbar ist, denn eine verlorene E-Mail oder Telefonnummer macht die Wiederherstellung zu einer eigenen Aufgabe.
- Ob deine beiden Aufenthalte im selben Steuerjahr liegen oder in verschiedenen, was ändert, wie das Einkommen den Jahren zugeordnet wird.

Eine [Steuererklärung als Working Holiday Maker](/de/tax-return) für ein früheres Jahr ist Routine und kein Sonderfall. Deine [Steuererstattung schätzen](/de/calculator) kannst du für jedes der beiden Jahre.
`,
  },

  'how-to-find-lost-tfn': {
    title: 'TFN verloren? So findest du sie wieder',
    description: 'Eine TFN ist dauerhaft, eine verlorene ist also eine Wiederbeschaffung und kein neuer Antrag. Sie steht längst auf Payslips, Fondsauszügen und alten Bescheiden.',
    body: `
Deine TFN ist nicht weg. Sie ist dauerhaft, sie wurde einmal ausgestellt, und sie steht mit ziemlicher Sicherheit schon auf etwas, das du noch hast: einem Payslip, einem Superfonds-Auszug, einem Steuerbescheid oder dem ursprünglichen ATO-Brief. Ein zweiter Antrag ersetzt sie nicht, er steht im Konflikt zu ihr.

## Wo steht sie schon geschrieben?

Vier Orte decken fast jeden ab, und alle vier zu durchsuchen dauert kürzer als jedes Telefonat mit Identitätsprüfung. Deine TFN wurde öfter notiert, als du dich erinnerst, meist von einem Arbeitgeber oder einem Superfonds.

- Payslips und Income Statements australischer Arbeitgeber, von denen viele sie ausweisen
- Auszüge und Willkommensschreiben von Superfonds, wenn du dem Fonds die Nummer gegeben hast
- Jede australische Steuererklärung, die du eingereicht hast, und der Bescheid danach
- Der Originalbrief, den das ATO bei der Ausstellung geschickt hat

Der schnellste Schritt ist, die eigenen E-Mails nach der Phrase tax file number zu durchsuchen. Die meisten finden sie in wenigen Minuten, in einer Onboarding-Mail eines Arbeitgebers oder in ungeöffneter Fondspost.

## Warum darfst du nicht einfach neu beantragen?

Weil eine Tax File Number einmal pro Person und lebenslang ausgestellt wird. Ein zweiter Antrag erzeugt einen widersprüchlichen Datensatz, der manuell aufgelöst werden muss, und macht aus einer Wiederbeschaffung eine Verzögerung von Wochen.

Das ist das häufigste selbstverschuldete Problem unter zurückkehrenden Backpackern, und es ist verständlich. Die alte Nummer fehlt, das Formular ist kostenlos, ein neuer Antrag fühlt sich nach Fortschritt an. Es ist die eine Handlung, die es zuverlässig schlimmer macht.

## Was, wenn du wirklich nichts hast?

Dann ist es eine Wiederbeschaffung über das ATO, erreichbar unter 13 28 61 innerhalb der australischen Geschäftszeiten oder unter +61 2 6216 1111 aus dem Ausland, oder über einen Steuerberater, der für dich handelt. So oder so ist der Vorgang eine Identitätsprüfung und kein neuer Antrag.

Sie läuft über deinen vollständigen Namen exakt wie im Pass, dein Geburtsdatum, deine Passnummer, den beim ersten Antrag genutzten Pass und deine australische Adresshistorie. Der erneuerte Pass erwischt Leute häufig: Der Datensatz wurde gegen das alte Dokument angelegt, und beide können nötig sein.

Aus dem Ausland ist das schwerer, weil die Identitätsprüfungen um Dokumente und Telefonnummern herum gebaut sind, die jemand, der vor zwei Jahren abgereist ist, häufig nicht mehr hat.

## Wo tut das am meisten weh?

In einem von zwei Momenten. Beim Start in einen neuen Job, wo ihr Fehlen 45 % Einbehalt bedeutet, bis sie vorliegt. Oder beim Superantrag nach der Abreise, wo der Fonds kein Geld an jemanden freigeben kann, den er nicht identifizieren kann.

Der Superfall ist der teurere, weil er sich mit allem anderen stapelt, was nach der Ausreise schiefgeht: geänderte Adresse, geschlossenes Bankkonto, ein Fonds, der das Guthaben bereits als unclaimed gemeldet hat. Wer plant, seine [Superannuation nach der Abreise auszahlen zu lassen](/de/superannuation), sollte die TFN vor dem Flug finden.

## Wie verlierst du sie nicht noch einmal?

Speichere sie an einem Ort, der ein gestohlenes Handy und eine verlorene Brieftasche übersteht, meist ein Passwortmanager oder eine verschlüsselte Notiz und kein Foto in der Kamerarolle. Eine Papierkopie ist in Ordnung, solange sie getrennt vom Pass liegt, denn die Kombination aus beidem ist das, was Identitätsbetrug braucht.

Zu vermeiden ist, sie sich unverschlüsselt zu mailen oder in einer ungesperrten Notiz-App liegen zu lassen. Eine TFN allein kann kein Konto leeren, aber mit einem Passscan daneben reicht sie, um eines zu eröffnen.

## Wird das eine Suche oder ein Telefonat?

Eine TFN zu finden ist meist eine Suche von fünf Minuten und gelegentlich ein Telefonat. Was dich erwartet, hängt an deiner Geschichte in Australien.

- Ob du je zuvor in Australien gearbeitet hast, denn das bestimmt, ob überhaupt schon eine Nummer existiert.
- Ob du seither deinen Pass erneuert hast, was ändert, was zur Identitätsprüfung nötig ist.
- Ob du in Australien oder im Ausland bist, was die Identitätsprüfung leichter oder schwerer macht.
- Ob Super bei einem Fonds liegt, denn das macht die Suche üblicherweise dringend.
- Ob es Vorjahre gibt, die du nie eingereicht hast, denn sie brauchen dieselbe Nummer und sind meist wartende Erstattungen.

Sobald du sie zurück hast, lässt sich jedes offene Jahr weiterhin als [Steuererklärung für Working Holiday Maker](/de/tax-return) einreichen, und du kannst deine [Steuererstattung schätzen](/de/calculator), für jedes gearbeitete Jahr.
`,
  },

  // ─── ABN (2 first posts get title/description translation) ────────────────
  'what-is-an-abn': {
    title: 'Was ist eine ABN und brauchst du eine?',
    description: 'Eine ABN brauchst du nur, wenn du auf Rechnung arbeitest, also als Contractor oder Selbstständiger. In normaler Anstellung reicht deine TFN völlig aus.',
    body: `
Eine ABN ist eine elfstellige Kennung für Leute, die für ihre Arbeit Rechnungen stellen statt Lohn zu beziehen. Die meisten Working Holiday Maker auf einer Gehaltsliste brauchen keine. Du brauchst sie, wenn ein Betrieb dich gegen Rechnung bezahlt, und ob das wirklich deine Lage ist, entscheidet sich daran, wie die Arbeit läuft.

## Was entscheidet tatsächlich, ob du eine brauchst?

Der Inhalt der Vereinbarung, nicht das Etikett darauf. Ein Angestellter bekommt Lohn, sein Arbeitgeber behält PAYG-Steuer ein, und Superannuation wird obendrauf gezahlt. Ein Contractor stellt Rechnung für ein Ergebnis, hat keinen Einbehalt, trägt seine eigene Versicherung und stellt in der Regel seine eigene Ausrüstung.

Die Unterscheidung ist ein rechtlicher Test und keine Wahl der Beteiligten. Sagt ein Betrieb dir, du sollst eine ABN besorgen, macht aber deinen Dienstplan, beaufsichtigt deine Arbeit, stellt die Werkzeuge und bezahlt dich nach Stunden, ist die Vereinbarung sehr wahrscheinlich Anstellung, egal was auf dem Papier steht. Entschieden wird das über den [Test Angestellter gegen Contractor](/de/blog/employee-vs-contractor-australia).

## Warum haben so viele Backpacker am Ende eine?

Weil mehrere der Jobs, die Working Holiday Makern am ehesten offenstehen, wirklich als Contracting aufgebaut sind. Liefer- und Rideshare-Plattformen binden Fahrer als Contractor ein, Akkordlohn-Erntearbeit läuft häufig über Leiharbeitsverträge, und freiberufliche Handwerks-, Foto- und Content-Arbeit ist ihrer Natur nach Contracting.

Der zweite Grund ist weniger ehrlich. Manche Arbeitgeber drängen eine ABN in ganz gewöhnliche Anstellung hinein, weil sie damit ihre Pflicht zu Superannuation, Unfallversicherung und Award-Sätzen loswerden. Die Ersparnis ist ihre, die Kosten sind deine, und es ist der häufigste Weg, auf dem ein Working Holiday Maker unbemerkt Geld verliert.

## Was passiert, wenn du ohne eine Rechnung stellst?

Der Betrieb ist verpflichtet, 47 % der Zahlung einzubehalten, bevor sie dich erreicht. Das ist die No-ABN-Withholding-Regel, und sie existiert, um das Rechnungstellen ohne Registrierung sinnlos zu machen, nicht um dich zu bestrafen.

Du bekommst es zurück. Der einbehaltene Betrag wird dir bei der Abgabe gutgeschrieben wie zu viel einbehaltene PAYG-Steuer, dauerhaft verloren geht also nichts. Verloren geht der Zugriff auf fast die Hälfte dieser Zahlung, bis die Erklärung bearbeitet ist, und für jemanden mit wöchentlicher Miete tut genau das weh.

## Was ändert sich an deiner Steuer, sobald du eine hast?

Für dich wird nichts mehr einbehalten. Beim Lohn nimmt dein Arbeitgeber die Steuer heraus, bevor du das Geld siehst. Beim ABN-Einkommen landet die volle Rechnungssumme auf deinem Konto, und die Steuer ist trotzdem geschuldet, veranlagt am Jahresende bei der Abgabe.

Der Working-Holiday-Maker-Satz von 15 % auf die ersten 45.000 $ gilt für ABN-Einkommen genauso wie für Lohn; die Höhe ist nicht die Überraschung, der Zeitpunkt ist es. Wer 20.000 $ über eine ABN verdient und nichts zurückgelegt hat, hat bei der Abgabe eine echte Rechnung statt einer Erstattung.

## Was kannst du gegen ABN-Einkommen absetzen, was gegen Lohn nicht ginge?

Echte Betriebsausgaben, und das ist der Ausgleich für die übernommenen Pflichten. Sprit und laufende Fahrzeugkosten, sofern ein Fahrtenbuch sie stützt, anteilig beruflich genutztes Telefon und Datenvolumen, Ausrüstung, Versicherung, Plattformprovisionen und Bankgebühren senken alle das Einkommen, auf das die Steuer berechnet wird.

Genau daran scheitern ABN-Erklärungen am häufigsten, weil die Nachweisregeln strenger sind als die meisten annehmen. Ein Fahrtenbuch ist keine Quittung, die Aufteilung zwischen privat und beruflich muss verteidigungsfähig sein, und eine Autokostenposition ohne Aufzeichnungen ist der am häufigsten gestrichene Posten dieser Kategorie.

## Wann kommt GST ins Spiel?

Sobald dein Umsatz 75.000 $ im Jahr erreicht, ist die Registrierung Pflicht, und darunter ist sie für die meisten Tätigkeiten freiwillig. Es gibt eine Ausnahme, die Backpacker ständig erwischt: Rideshare-Fahren erfordert eine GST-Registrierung ab dem ersten Dollar, ganz ohne Schwelle.

Folgenlos ist die Registrierung nicht. Sie bringt eine meist quartalsweise Pflicht zum Business Activity Statement mit sich, und die läuft weiter, bis du sie beendest. Sich ohne Not zu registrieren handelt dir Papierkram ein, den du noch schuldest, nachdem du das Land längst verlassen hast.

## Lohnt sich eine ABN in deinem Jahr?

Ob du überhaupt eine ABN brauchst, ist meist klar, sobald du dir die Vereinbarung statt des Angebots ansiehst. Was sie dich kostet und was sie wert ist, hängt an Tatsachen, die für dein Jahr spezifisch sind.

- Ob die Arbeit echtes Contracting oder falsch eingestufte Anstellung ist, denn davon hängen Super und Award-Sätze ab.
- Ob du im selben Jahr ABN-Einkommen und Lohn hast, denn beides fließt in eine Veranlagung und der Lohneinbehalt deckt oft die ABN-Steuer.
- Ob die Plattform unabhängig vom Umsatz eine GST-Registrierung verlangt.
- Wie viel du unterwegs zurückgelegt hast, denn für dich wurde nichts einbehalten.
- Ob deine Werbungskosten so belegt sind, wie das ATO es verlangt.
- Ob du die ABN vor der Abreise beendet hast, denn eine offene Registrierung behält ihre Pflichten.

Hast du beide Einkommensarten in einem Jahr, wird die Gesamtlage in der [Working-Holiday-Steuererklärung](/de/tax-return) ermittelt, und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du grob weißt, worauf jede Seite hinausläuft.
`,
  },

  'how-to-register-for-an-abn': {
    title: 'ABN registrieren, und wann besser nicht',
    description: 'Die Registrierung selbst ist kostenlos. Wer zu einer ABN berechtigt ist, warum Sham Contracting das eigentliche Risiko ist, die GST-Grenze von 75.000 $, die 47-%-Einbehaltsregel und wann du sie beendest.',
    body: `
Die Registrierung beim Australian Business Register kostet keine Behördengebühr, und die meisten Anträge liefern die Nummer schnell. Ob deiner das tut, entscheidet die Berechtigungsfrage: Eine ABN geht nur an jemanden, der wirklich ein Unternehmen betreibt, und nicht an jeden, dem man gesagt hat, er solle sich eine besorgen. Die [ABN-Registrierung](/de/abn) übernehmen wir als Teil davon, diese Antwort richtig zu bekommen.

## Wer ist überhaupt zu einer ABN berechtigt?

Wer in Australien ein Unternehmen betreibt, also eine geschäftliche Tätigkeit auf eigene Rechnung ausübt statt unter fremder Weisung zu arbeiten. Ein Lieferfahrer, der seine Zeiten selbst wählt, ein freiberuflicher Designer mit mehreren Kunden und ein Erntekontraktor, der einer Leiharbeitsfirma Rechnung stellt, erfüllen das. Ein Angestellter nicht, ganz gleich was der Arbeitgeber lieber hätte.

Diese Frage entscheidet alles Weitere am Antrag und wird am häufigsten ohne Nachdenken beantwortet. Sagt ein Betrieb dir, du sollst vor deiner ersten Schicht eine ABN besorgen, für einen Job mit Dienstplan, Aufsicht und gestellter Ausrüstung, dann betreibst du kein Unternehmen und die Vereinbarung ist eher Sham Contracting als Contracting. Sich trotzdem zu registrieren macht sie nicht rechtmäßig und hebt deine [Super- und Award-Ansprüche](/de/blog/employee-vs-contractor-australia) nicht auf.

## Woran hängt ein Antrag?

Zuerst an einer [Tax File Number](/de/tfn). Ein ABN-Antrag, der keiner TFN zugeordnet ist, landet deutlich häufiger in der manuellen Prüfung, und dort sitzen die Verzögerungen.

Der Rest hängt an Identitätsangaben, die exakt zum Pass passen, und an einer Beschreibung der Tätigkeit, die das Register auch einordnen kann. Hängengebliebene Anträge scheitern fast immer an einem dieser beiden Punkte und nicht an der Arbeit selbst.

## Wo kommt GST ins Spiel?

Bei 75.000 $ Umsatz, der Grenze, ab der eine [GST](/de/blog/gst-and-abn-for-working-holiday-makers)-Registrierung zwingend wird. Fast kein Working Holiday Maker erreicht sie, und darunter zu bleiben hält GST und die quartalsweisen Business Activity Statements komplett aus deinem Leben.

Eine versehentlich übernommene GST-Registrierung ist nicht harmlos. Sie erzeugt eine Meldepflicht, die jedes Quartal weiterläuft, ob es Einkommen zu melden gibt oder nicht, und sie muss ausdrücklich beendet werden.

## Was ändert die ABN, sobald du sie hast?

Sie ändert vollständig, wer für deine Steuer zuständig ist. Von einer Rechnung wird nichts einbehalten, die ganze Schuld liegt also bei dir, bis die [Steuererklärung](/de/tax-return) eingereicht ist, zum Working-Holiday-Maker-Satz von 15 % auf die ersten 45.000 $ des kombinierten Einkommens. Dagegen sind echte Betriebsausgaben absetzbar, der Ausgleich dafür, dass du das Risiko trägst.

Sie ändert auch, was deine Rechnungen tragen müssen. Ein Zahler, der eine Rechnung ohne gültige ABN erhält, muss 47 % der Zahlung einbehalten, und das ist eine Regel über die fehlende Nummer und nicht über dich. Der Überschuss kommt zur Steuerzeit zurück, und die korrekt angegebene Nummer vermeidet die ganze Lage.

- Deinen Namen und jeden Geschäftsnamen, unter dem du auftrittst
- Deine ABN, vollständig angegeben
- Das Ausstellungsdatum und eine Beschreibung der erbrachten Arbeit
- Den zu zahlenden Betrag und deine Kontaktdaten

## Wann solltest du sie beenden?

Wenn die Tätigkeit endet, bei den meisten Working Holiday Makern also mit der letzten Rechnung und nicht am Tag der Ausreise. Eine nach deiner Abreise aktiv gebliebene ABN führt dich weiter als Unternehmen im Register, und eine daran hängende GST-Registrierung erzeugt weiter Pflichten zum Business Activity Statement, ob Einkommen existiert oder nicht.

Zu früh zu beenden macht Probleme, wenn noch eine letzte Rechnung offen ist, und zu spät zu beenden ist unordentlich, aber nicht teuer. Was vorher geregelt sein muss, steht in unserem Guide zum [Beenden einer ABN vor der Abreise aus Australien](/de/blog/how-to-cancel-your-abn).
`,
  },

  // ─── Tax Return - Strategic posts (full body translations) ────────────────
  'backpacker-tax-rate-australia': {
    title: 'Backpackersteuer 2025-26: 15 % und danach',
    description: 'Auf die ersten 45.000 Dollar zahlst du pauschal 15 %, darüber gelten die regulären Stufensätze. Ohne TFN behält dein Arbeitgeber stattdessen 45 % ein.',
    body: `
Der Working-Holiday-Maker-Satz beträgt pauschal 15 % auf die ersten 45.000 $ Einkommen pro Steuerjahr, für Visa der Subclass 417 und 462 gleichermaßen. Er ersetzt die Residentenstufen: kein Steuerfreibetrag, keine steuerfreie Stufe am unteren Ende. Dass er auch angewendet wird, hängt an zwei Dingen, nicht an einem.

## Was muss stimmen, damit 15 % tatsächlich angewendet werden?

Drei Bedingungen, und die meisten kennen nur die erste. Deine TFN muss beim Arbeitgeber liegen, die Tax File Number Declaration muss dich als Working Holiday Maker ausweisen, und der Arbeitgeber muss beim ATO als Arbeitgeber von Working Holiday Makern registriert sein.

Fehlt die TFN, sind es 45 % Einbehalt. Ist der Arbeitgeber nicht registriert, sind es 30 % auch bei korrekter TFN und Erklärung, denn er muss dann Foreign-Resident-Sätze anwenden. Diese dritte Bedingung ist für dich unsichtbar und die häufigste Ursache für einen Payslip, der grundlos falsch aussieht.

## Wie sieht der Satz in der Praxis aus?

Die Rechnung ist jede Woche gleich, ohne Stufe und ohne Abschmelzen über die ersten 45.000 $. Jeder Payslip lässt sich in einer Division prüfen: einbehaltene Steuer geteilt durch Brutto sollte nahe 0,15 liegen.

- 1.000 $ pro Woche: 150 $ einbehalten, 850 $ für dich
- 1.500 $ pro Woche: 225 $ einbehalten, 1.275 $ für dich
- 2.000 $ pro Woche: 300 $ einbehalten, 1.700 $ für dich

Über 45.000 $ steigt der Satz: 30 % von 45.001 bis 135.000 $, 37 % bis 190.000 $ und 45 % darüber. Sehr wenige erreichen das in einem Jahr; Bergbau, Spezialhandwerk und lange Phasen gut bezahlter Bauarbeit kommen gelegentlich dorthin.

## Wie steht er im Vergleich zu Residenten- und Foreign-Resident-Sätzen?

Er liegt zwischen beiden. Ein australischer Steuerresident zahlt auf die ersten 18.200 $ nichts und danach steigende Sätze. Ein gewöhnlicher Foreign Resident zahlt 30 % ab dem ersten Dollar, ein Working Holiday Maker 15 %.

Bei typischen Backpacker-Einkommen steht ein Working Holiday Maker damit besser da als ein Foreign Resident und schlechter als ein Resident. In seltenen Konstellationen wird er am Ende anders veranlagt, und dann ändert sich die Rechnung für das ganze Jahr. Ob dein Jahr dazugehört, hängt an deinen eigenen Umständen, lässt sich nicht am Visum ablesen und gehört ordentlich geprüft. Warum, steht in der [Wohnsitzprüfung für Working Holiday Maker](/de/blog/tax-residency-working-holiday-makers).

## Warum bekommen Leute mit korrekten 15 % trotzdem Erstattungen?

Weil ein ganzes Jahr korrekt einbehaltene 15 % hier die Ausnahme sind. Das typische Jahr enthält mindestens eine Phase, in der etwas anderes galt, und daraus kommt die Erstattung.

- Wochen, bevor die TFN beim Arbeitgeber ankam, einbehalten mit 45 % statt 15 %
- Arbeit für einen Arbeitgeber, der nicht als Working-Holiday-Maker-Arbeitgeber registriert war, einbehalten mit 30 %
- Eine Erklärung, die als Foreign Resident statt als Working Holiday Maker ausgefüllt wurde
- Abzüge für berufsbezogene Ausgaben, die erst beim Bescheid greifen
- Die Medicare Levy von 2 %, die nur wegfällt, wenn die Befreiung beantragt wird

Ein Jahr mit 37.000 $ Verdienst, davon drei Wochen bei einem neuen Arbeitgeber vor Erfassung der TFN: Bei 15 % sind 5.550 $ geschuldet. Wurden 4.000 $ davon mit 45 % statt 15 % einbehalten, sind 1.200 $ zu viel genommen worden. Genau das holt die Erklärung zurück, bevor überhaupt ein Abzug betrachtet wird.

## Was stimmt an der Backpacker-Steuer nicht?

Vier Behauptungen kursieren dauerhaft in Hostels und Backpacker-Gruppen, und jede kostet jedes Jahr jemanden Geld.

- Dass Backpacker gar keine Steuern zahlen. Die 15 % gelten ab dem ersten Dollar, ohne Freibetrag.
- Dass es bei korrektem Einbehalt nichts zu holen gibt. Abzüge, die Medicare-Levy-Befreiung und jede falsch eingebehaltene Phase bleiben.
- Dass der Satz je Bundesstaat variiert. Tut er nicht. Es ist ein Bundessatz, auch wenn Lohnfehler bei kleineren regionalen Arbeitgebern häufiger sind.
- Dass die Abreise die Sache beendet. Eine Erklärung kann aus dem Ausland eingereicht und die Erstattung auf ein australisches Konto gezahlt werden.

## Kommt die Medicare Levy auf die 15 % obendrauf?

Im Regelfall nicht, aber nur, wenn die Befreiung beantragt wird. Die Levy von 2 % gilt für Personen mit Anspruch auf Medicare; die meisten Working Holiday Maker haben keinen. Automatisch entfällt sie trotzdem nicht.

Die Befreiung wird in der Erklärung beantragt und mit einem Medicare Entitlement Statement von Services Australia belegt, dessen Ausstellung üblicherweise Wochen dauert. Der Anspruch folgt dem Pass: mit britischem Pass besteht in der Regel Anspruch und damit die Pflicht zu zahlen, mit deutschem oder japanischem in der Regel nicht.

## Was passiert, wenn dein Aufenthalt zwei Steuerjahre überspannt?

Du bekommst zwei Bescheide statt einem, jeder berechnet, als wäre er ein ganzes Jahr. Zwölf Monate stetige Arbeit ergeben so zwei Teiljahres-Erklärungen, und Teiljahres-Einkommen wird systematisch zu hoch einbehalten.

Der Grund ist mechanisch. Die Lohnbuchhaltung behält von jeder Abrechnung so ein, als liefe dieser Verdienst das ganze Jahr weiter. Wer acht Monate gearbeitet und 30.000 $ verdient hat, wurde im Startjahr auf eine viel größere Jahressumme hin behandelt. Die Korrektur erfolgt beim Bescheid, zu deinen Gunsten, in beiden Jahren.

## Wird ABN-Einkommen zum selben Satz besteuert?

Ja. Unter einer ABN in Rechnung gestelltes Einkommen wird mit denselben 15 % auf die ersten 45.000 $ veranlagt, aber unterwegs wurde nichts einbehalten. Die Steuer kommt als Zahlbetrag statt als etwas bereits Erledigtes.

Bei Löhnen und ABN-Einkommen im selben Jahr saugt die vom Lohn einbehaltene PAYG-Steuer meist die Steuer auf die ABN-Seite auf. Wer nur ABN-Einkommen hatte und nichts zurückgelegt hat, bekommt eine Rechnung statt der erwarteten Erstattung.

## Diese Punkte bewegen deine Zahl, nicht der Satz.

Der Satz steht im Gesetz. Was du gezahlt hast und was zurückkommt, entscheiden Fakten aus deinem eigenen Jahr, und jeder davon steht bereits auf deinen Payslips.

- Ob jeder Arbeitgeber deine TFN ab der ersten Abrechnung hatte und wie lange eine Lücke lief.
- Ob jeder Arbeitgeber beim ATO als Working-Holiday-Maker-Arbeitgeber registriert war.
- Wie die Felder zu Wohnsitz und Working Holiday Maker ausgefüllt wurden.
- Welchen Pass du hältst, denn daran hängt die Medicare-Frage.
- Ob du zusätzlich ABN-Einkommen ohne jeden Einbehalt hattest.
- Ob es ein Teiljahr war, denn Teiljahres-Einbehalt schießt routinemäßig über das Ziel hinaus.

Alles davon wird in der [Steuererklärung als Working Holiday Maker](/de/tax-return) abgeglichen. Deine [Steuererstattung schätzen](/de/calculator) kannst du, sobald du weißt, was jeder Arbeitgeber tatsächlich einbehalten hat.
`,
  },

  // ─── Super - Strategic posts ──────────────────────────────────────────────

  // ─── Medicare - Critical for Germans (no RHCA) ─────────────────────────────
  'what-is-medicare-working-holiday-makers': {
    title: 'Medicare mit 417/462: bist du versichert?',
    description: 'Die meisten 417/462-Inhaber sind nicht über Medicare versichert, außer ihr Land hat ein Abkommen. Wer abgedeckt ist und was Notfälle kosten.',
    body: `
Meistens nicht. [Medicare](/de/medicare) deckt australische Staatsbürger und ständige Einwohner ab, und ein 417- oder 462-Visum macht dich zu keinem von beidem. Die Ausnahme ist dein Pass: Elf Länder haben ein Gesundheitsabkommen mit Australien, ihre Staatsangehörigen bekommen begrenzten Schutz. Alle anderen zahlen privat.

## Was entscheidet, ob du abgedeckt bist?

Eine einzige Tatsache, und es ist dein Pass, nicht dein Visum. Australien unterhält Reciprocal Health Care Agreements mit Großbritannien, Irland, Neuseeland, Schweden, den Niederlanden, Finnland, Norwegen, Belgien, Slowenien, Malta und Italien. Ihre Staatsangehörigen können sich für begrenzte Medicare-Leistungen registrieren, solange das Visum gültig ist.

Ist dein Pass deutsch, französisch, japanisch, koreanisch, kanadisch, amerikanisch oder irgendein anderer, gibt es kein Abkommen und kein Medicare. Deutschland steht nicht auf der Liste, und für deutsche Backpacker ist das die entscheidende Auskunft. Die [vollständige Länderliste](/de/blog/countries-with-medicare-agreement-australia) lohnt einen Blick, denn es wird regelmäßig in beide Richtungen falsch geraten.

## Was bringt dir ein Abkommen tatsächlich?

Weniger, als das Wort Medicare vermuten lässt. Der reziproke Schutz gilt für medizinisch notwendige Behandlung, die nicht bis zur Heimreise warten kann: ein bezuschusster Hausarztbesuch, Behandlung im öffentlichen Krankenhaus als Kassenpatient und Rezepte zum subventionierten Satz.

Nicht abgedeckt ist der Krankenwagen, der in den meisten Bundesstaaten getrennt abgerechnet wird und für eine einzige Fahrt in die Hunderte geht. Ebenfalls nicht abgedeckt sind Zahnbehandlung, Optiker, Physiotherapie, Wahleingriffe, Privatkliniken und meist Vorerkrankungen. Deshalb tragen auch britische und irische Backpacker mit formalem Schutz üblicherweise eine Versicherung, und deshalb ist die Krankenwagenlücke die häufigste teure Überraschung.

## Was kostet es dich, wenn du nicht abgedeckt bist?

Du wirst als Privatpatient behandelt und zahlst den ausgewiesenen Preis. Ein Hausarztbesuch liegt üblicherweise bei 80 bis 120 $. Ein Facharzttermin beginnt bei etwa 200 $. Rezepte kosten den vollen Verkaufspreis statt des subventionierten. Notaufnahmen öffentlicher Krankenhäuser behandeln dich, aber Nachbehandlung und jede Aufnahme sind kostenpflichtig.

Eine Krankenversicherung ist Bedingung für das 462-Visum und wird beim 417 dringend erwartet, und das ist der Grund. Ein gebrochenes Handgelenk nach einem Sturz in einer Packhalle ist mit Versicherung eine beherrschbare Ausgabe und ohne eine ernste.

## Wie wirkt sich das auf deine Steuer aus?

Direkt, und hier wird aus Risiko Geld. Die Medicare Levy beträgt 2 % des zu versteuernden Einkommens und wird Personen berechnet, die Anspruch auf Medicare haben. Wenn du keinen Anspruch hast, sollte die Levy für dich nicht gelten, und bei 25.000 $ Verdienst sind das rund 500 $.

Für deutsche Staatsangehörige heißt das: Kein Abkommen, kein Anspruch, und die Befreiung greift in aller Regel. Automatisch ist sie nicht. Sie muss in der Steuererklärung beantragt werden, und dafür brauchst du ein Medicare Entitlement Statement von Services Australia, für jedes Steuerjahr einzeln, mit üblicherweise bis zu sechs Wochen Ausstellungsdauer. Diese sechs Wochen sind das Problem: Die meisten erfahren im Oktober davon, wenn die Erklärung längst fällig ist.

## Ändert eine private Versicherung etwas an der Befreiung?

Nein, und das führt in beide Richtungen in die Irre. Die Befreiung hängt am Anspruch auf Medicare, nicht daran, ob du etwas anderes gekauft hast. Eine private Versicherung schafft keine Befreiung und nimmt keine weg.

Die Kehrseite ist schmerzhafter. Ein britischer oder irischer Reisender, der sich nie registriert und Medicare nie genutzt hat, hat in der Regel trotzdem Anspruch, und geprüft wird der Anspruch. Die Levy gilt.

## Wo verschiebt dein Pass das Ergebnis?

Abdeckung und Levy-Befreiung entscheiden sich an derselben Tatsache, deinem Pass, und bewegen sich in entgegengesetzte Richtungen. Diese Umstände verändern eine der beiden Hälften.

- Dein Pass, denn das ist die ganze Frage. Elf Länder drin, alle anderen draußen.
- Ob du dich mitten im Jahr registriert hast, was zu einer anteiligen Befreiung für die nicht abgedeckten Tage führt statt zu alles oder nichts.
- Ob du das Medicare Entitlement Statement rechtzeitig bestellt hast. Sechs Wochen Vorlauf stehen zwischen den meisten Leuten und rund 500 $.
- Ob du zwei Staatsangehörigkeiten hast. Das Abkommen folgt dem Pass, mit dem du hier bist, und ein zweiter Pass kann die Antwort komplett ändern.
- Ob du ein Jahr bereits ohne die Befreiung eingereicht hast, denn die Levy lässt sich meist über eine Berichtigung zurückholen, in der Regel binnen zwei Jahren nach der ursprünglichen Abgabe.

Die Befreiung wird als Teil deiner [Steuererklärung als Working Holiday Maker](/de/tax-return) beantragt, und was sie bei deinem Einkommen ausmacht, siehst du im [Erstattungsrechner](/de/calculator), einmal mit und einmal ohne.
`,
  },

  'medicare-levy-working-holiday-makers': {
    title: 'Medicare-Levy-Befreiung: 2 % zurückholen',
    description: 'Die meisten Working Holiday Maker können sich die 2 % Medicare-Abgabe befreien lassen, rund 500 $ bei 25.000 $ Einkommen.',
    body: `
Meistens nicht. Die Medicare Levy von 2 % wird Personen berechnet, die Anspruch auf Medicare haben, und die meisten Inhaber eines 417- oder 462-Visums haben keinen, die Levy sollte also nicht greifen. Bei 25.000 $ Verdienst sind das rund 500 $. Sie wird weder automatisch berechnet noch automatisch entfernt, und genau dort geht das Geld verloren.

## Was entscheidet, ob du die Befreiung bekommst?

Dein Pass, und ein Stück Papier, von dem die meisten Backpacker nie erfahren. Der Test ist der Anspruch auf Medicare, und der entsteht aus einem Pass eines der elf Länder mit Reciprocal Health Care Agreement: Großbritannien, Irland, Neuseeland, Italien, Malta, Niederlande, Belgien, Finnland, Norwegen, Schweden und Slowenien.

Deutschland, Japan, Frankreich, Korea, Taiwan, Kanada, die USA und alle anderen stehen nicht auf dieser Liste; ihre Staatsangehörigen sind in der Regel aus dem Schneider und die Befreiung greift üblicherweise. Für deutsche Leser ist die Levy damit meist Geld, das nicht hätte berechnet werden dürfen.

## Was ist das Stück Papier?

Ein Medicare Entitlement Statement von Services Australia. Es weist nach, dass du für einen bestimmten Zeitraum keinen Anspruch auf Medicare hattest, und mit ihm wird die Befreiung in der Steuererklärung beantragt. Für jedes Steuerjahr ist ein eigenes Statement nötig.

Die Ausstellung dauert üblicherweise bis zu sechs Wochen, und dieser Vorlauf ist das ganze praktische Problem. Die meisten erfahren im Oktober davon, wenn die Erklärung längst fällig ist, und geben rund 500 $ still auf, statt einen sechswöchigen Prozess zu starten. Es im Juli zu bestellen ist die eine Änderung, die den Unterschied macht.

## Wie viel ist sie tatsächlich wert?

Zwei Prozent des zu versteuernden Einkommens, sie skaliert also mit dem Verdienst. Bei Working-Holiday-Einkommen lohnt die Größenordnung den Papierkram.

- 15.000 $ verdient: rund 300 $
- 25.000 $ verdient: rund 500 $
- 35.000 $ verdient: rund 700 $
- 45.000 $ verdient: rund 900 $

Dieses Geld kommt über die Erstattung zurück, nicht über den Payslip: Die Levy wird am Jahresende veranlagt, nicht Abrechnung für Abrechnung einbehalten.

## Was gilt, wenn du aus einem Abkommensland kommst?

Dann läuft die Antwort meist umgekehrt. Wer einen Pass aus einem der elf Abkommensländer hält, hat in der Regel Anspruch auf Medicare, ganz gleich, ob er sich je registriert oder es je genutzt hat. Der Test ist der Anspruch, nicht die Nutzung.

Für die meisten britischen und irischen Reisenden ist die Befreiung damit vom Tisch, und die Levy gilt als Teil des Bescheids. Teilfälle gibt es weiterhin: Wer den Anspruch erst mitten im Jahr erworben hat oder dessen Umstände sich geändert haben, kann für die Tage ohne Anspruch befreit sein, und dafür müssen die Daten stimmen.

## Was, wenn du bereits ohne die Befreiung eingereicht hast?

Sie lässt sich meist über eine Berichtigung der Erklärung zurückholen. Das allgemeine Berichtigungsfenster beträgt zwei Jahre ab dem Datum des ursprünglichen Bescheids, ein Backpacker im ersten Jahr liegt also sehr oft noch darin.

Das lohnt für alle, die ihre erste australische Erklärung selbst eingereicht haben, denn die Levy-Befreiung ist neben dem Wohnsitz einer der beiden Punkte, die dort am häufigsten fehlen. Jedes Jahr gehört getrennt geprüft: Ein zweijähriger Aufenthalt sind zwei Erklärungen, zwei Statements und zwei mögliche Berichtigungen.

## Steht dir die Befreiung überhaupt zu?

Die Befreiung ist bei 25.000 $ rund 500 $ wert. Ob du sie beanspruchen kannst, hängt an Fakten, die du schon kennst.

- Dein Pass, der über den Anspruch und damit über die ganze Frage entscheidet.
- Ob du dich mitten im Jahr bei Medicare registriert hast, was eine anteilige Befreiung für die nicht abgedeckten Tage ergibt.
- Ob das Medicare Entitlement Statement rechtzeitig bestellt wurde. Die sechs Wochen Vorlauf sind der Grund, warum das aufgegeben wird.
- Ob du zwei Staatsangehörigkeiten hast, denn das Abkommen folgt dem Pass und nicht dem Visum.
- Über wie viele Steuerjahre dein Aufenthalt läuft. Jedes Jahr braucht ein eigenes Statement und einen eigenen Antrag.
- Ob ein Vorjahr ohne sie eingereicht wurde, was sich meist binnen zwei Jahren berichtigen lässt.

Die Befreiung wird als Teil deiner [Steuererklärung als Working Holiday Maker](/de/tax-return) beantragt. Was die 2 % bei deinem Einkommen ausmachen, rechnet dir der [Erstattungsrechner](/de/calculator) aus.
`,
  },

  // ─── Work Rights - Minimum wage ────────────────────────────────────────────
  'minimum-wage-australia-2026-27': {
    title: 'Mindestlohn Australien: 26,44 $ pro Stunde',
    description: 'Der nationale Mindestlohn stieg am 1. Juli 2026 um 6 % auf 26,44 $ pro Stunde (1.004,90 $/Woche). Casual-Sätze mit 25 % Zuschlag und deine Rechte.',
    body: `
Der nationale Mindestlohn ab 1. Juli 2026 beträgt 26,44 $ pro Stunde, für Casuals mit dem 25-%-Loading 33,05 $, festgesetzt von der Fair Work Commission. Er gilt für Working Holiday Maker in vollem Umfang. Die meisten Jobs sind von einem Award abgedeckt, der mehr zahlt, diese Zahl ist also eine Untergrenze und kein Satz.

## Warum ist der nationale Mindestlohn meist die falsche Vergleichszahl?

Weil er nur dort gilt, wo kein Award und kein Tarifvertrag den Job abdeckt, und in Backpacker-Branchen tut das fast immer einer. Gastronomie, Einzelhandel, Landwirtschaft, Bau, Reinigung und Pflege haben moderne Awards mit eigenen Mindestsätzen, und die liegen über dem nationalen Minimum, bevor ein Zuschlag dazukommt.

Genau 26,44 $ in einem Café zu bekommen ist kein Beleg für Regelkonformität, eher ein Hinweis auf Unterbezahlung: Der Hospitality Industry (General) Award setzt eigene Sätze nach Einstufung, und die sind nicht die nationale Untergrenze.

## Wie wird die Zahl festgelegt, und wann ändert sie sich?

Die Fair Work Commission überprüft sie einmal jährlich und verkündet das Ergebnis zur Jahresmitte, wirksam ab der ersten vollen Lohnperiode am oder nach dem 1. Juli. Nationaler Mindestlohn und Award-Mindestsätze werden getrennt angepasst und steigen nicht zwingend um denselben Prozentsatz.

Das zählt für ein bereits abgelaufenes Jahr. Payslips aus einem früheren Steuerjahr werden an den Sätzen jenes Jahres gemessen, nicht an den heutigen. Wer rückwirkend eine Unterbezahlung prüft, muss zuerst festhalten, um welches Jahr es geht.

## Was kauft dir das Casual Loading eigentlich?

Es bringt dir 25 % zusätzlich auf den Grundsatz, im Tausch gegen keinen bezahlten Jahresurlaub, keine bezahlte Krankheit und keine Kündigungsfrist. Es ist kein Bonus und liegt nicht im Ermessen des Betriebs. Eine Casual-Kraft, die den Grundsatz der Festangestellten ohne Loading bekommt, wird unterbezahlt.

Das ist der häufigste Einzelfehler bei Backpacker-Löhnen und steht in einer einzigen Zeile auf dem Payslip. Casual-Sätze beginnen 2026-27 beim nationalen Minimum bei 33,05 $ pro Stunde und liegen unter den meisten Awards noch höher.

## Woher kommen die Sätze, die dir tatsächlich zustehen?

Aus deinem Award und deiner Einstufung darin, und beides muss benannt sein, bevor irgendeine Zahl etwas bedeutet. Jeder Award hat Einstufungsstufen nach Erfahrung und Verantwortung, und zwei Leute in derselben Küche können rechtmäßig auf unterschiedlichen Sätzen sein.

- Hospitality Industry (General) Award, für Cafés, Restaurants, Pubs und Hotels
- General Retail Industry Award, für Läden und Einzelhandel
- Horticulture Award, für Obsternte, Erntearbeit und Landwirtschaft
- Building and Construction General On-site Award, für den Bau
- Cleaning Services Award, für gewerbliche Reinigung

Frag, welcher Award dich abdeckt und auf welcher Stufe du eingeordnet bist. Ein Arbeitgeber, der das nicht beantworten kann, wendet meist keinen an, und das ist ein nützlicherer Befund als jeder Stundenvergleich.

## Was gilt für Wochenenden, Nächte und Feiertage?

In den meisten award-gedeckten Tätigkeiten lösen Stunden außerhalb der regulären Zeiten Penalty Rates aus, bei einer Casual-Kraft zusätzlich zum Loading. Samstags-, Sonntags-, Feiertags- und Spätsätze unterscheiden sich je nach Award, und in Gastronomie und Einzelhandel stammt ein großer Teil des Backpacker-Verdienstes genau daher.

Eine Casual-Kraft in der Gastronomie kann sonntags rechtmäßig nahe am Doppelten des nationalen Schlagzeilenminimums liegen. Wie sich die Zuschläge kombinieren, steht in unserem Guide zu [Penalty Rates in Australien](/de/blog/penalty-rates-australia).

## Was solltest du tun, wenn die Zahlen nicht aufgehen?

Ermittle den korrekten Satz, bevor du etwas ansprichst, denn eine Forderung auf Basis des nationalen Minimums setzt zu niedrig an, wenn ein Award gilt. Award bestimmen, Einstufung finden, Loading und Zuschläge anwenden, Woche für Woche gegen die Payslips halten.

Sichere die Belege laufend, statt sie später zu rekonstruieren. Dienstpläne, Payslips und jede schriftliche Bestätigung deiner Einstufung machen aus einer Meinungsverschiedenheit eine Forderung, und ungelöste Beschwerden bearbeitet der Fair Work Ombudsman. Working Holiday Maker haben dieselben Ansprüche wie alle anderen am Arbeitsplatz, und der Visastatus ist keine Hürde.

## Welcher Satz gilt wirklich für deinen Job?

Die nationale Zahl steht fest, was dir zusteht nicht. Diese Punkte entscheiden sie, und das nationale Minimum ist selten der Satz, der auf dich zutrifft.

- Welcher Award deinen Arbeitgeber abdeckt, denn der setzt den Grundsatz und nicht das nationale Minimum.
- Auf welcher Einstufungsstufe du eingeordnet wurdest, was sich zwischen zwei Leuten mit ähnlicher Arbeit unterscheiden kann.
- Ob du Casual oder festangestellt bist, denn davon hängt das 25-%-Loading ab.
- Welche Stunden du gearbeitet hast, denn Wochenend-, Abend- und Feiertagszuschläge übersteigen oft den Grundlohn.
- Ob ein Tarifvertrag gilt, der Sätze über dem Award festlegen kann.
- Ob du auf einer ABN beschäftigt bist, denn dann gilt nichts davon für dich, und genau das ist meist das eigentliche Problem.

Wie der Satz auch ausfällt, die von diesen Löhnen einbehaltene Steuer wird am Ende des Steuerjahres abgerechnet, und du kannst aus deinen Jahreszahlen deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  // ─── Tax Return - More strategic posts ─────────────────────────────────────
  'how-does-australian-tax-year-work': {
    title: 'Das australische Steuerjahr einfach erklärt',
    description: 'Das Steuerjahr läuft vom 1. Juli bis 30. Juni. Ab dem 1. Juli kannst du einreichen, die Frist ist der 31. Oktober, mit Steuerberater deutlich später.',
    body: `
Das australische Steuerjahr läuft vom 1. Juli bis 30. Juni, nicht von Januar bis Dezember. Du reichst für jedes Jahr eine Erklärung ein, in dem du australisches Einkommen hattest, und die Frist für die Selbstabgabe ist der 31. Oktober. Eine Erklärung über einen registrierten Steuerberater bekommt in der Regel länger. In welches Jahr eine Zahlung fällt, entscheidet das Zahlungsdatum.

## Warum ist die Grenze zwischen Juli und Juni für Backpacker so wichtig?

Weil ein zwölfmonatiges Working Holiday fast nie in ein Steuerjahr passt, und die Teilung ist meist Geld wert. Ankunft im September, Arbeit bis August darauf: zwei Teiljahre statt eines vollen.

Jedes Jahr wird für sich veranlagt. Der Einbehalt wird berechnet, als liefe der Verdienst das ganze Jahr weiter; ein Teiljahr wird deshalb sehr oft zu hoch einbehalten. Das zeigt sich als Erstattung am Ende beider Jahre statt nur einmal.

## In welches Jahr fällt eine bestimmte Zahlung?

In das Jahr der Zahlung, nicht in das der Arbeit. Eine Schicht Ende Juni, ausgezahlt Anfang Juli, fällt ins neue Steuerjahr, und eine Schlusszahlung nach dem 30. Juni gehört in die Erklärung des Folgejahres, auch wenn der Job vorher endete.

- Im Oktober 2025 angekommen und bis April 2026 gearbeitet: alles fällt in das Jahr 2025-26, das am 30. Juni 2026 endete.
- Im März 2026 mit der Arbeit begonnen und über den Juli hinaus weitergemacht: März bis Juni 2026 liegt in 2025-26, ab Juli in 2026-27.

Maßgeblich ist deshalb dein Income Statement und nicht deine Erinnerung: Es wird aus dem zusammengestellt, was der Arbeitgeber dem ATO nach Zahlungsdatum gemeldet hat.

## Was passiert am Jahresende tatsächlich?

Das ATO vergleicht die auf das Gesamteinkommen geschuldete Steuer mit dem, was deine Arbeitgeber von jeder Abrechnung einbehalten haben. Wurde mehr einbehalten als geschuldet, wird die Differenz erstattet; wurde weniger einbehalten, ist sie zu zahlen.

Für die meisten Working Holiday Maker fällt die Bilanz aus strukturellen Gründen auf die Erstattungsseite: Wochen vor Ankunft der TFN beim Arbeitgeber wurden mit 45 % statt 15 % einbehalten, Teiljahres-Einkommen wird konstruktionsbedingt zu hoch einbehalten, und Abzüge sowie die Medicare-Levy-Befreiung greifen erst beim Bescheid.

## Wann ist die Frist, und was verschiebt sie?

Der 31. Oktober nach Ende des Steuerjahres, für alle, die selbst einreichen. Das Jahr 2025-26 endete am 30. Juni 2026, die Frist ist also der 31. Oktober 2026, und für 2026-27 läuft sie bis zum 31. Oktober 2027.

Erklärungen über einen registrierten Steuerberater fallen in der Regel unter einen späteren Termin, häufig weit ins Folgejahr hinein. Das zählt, wenn deine Unterlagen unvollständig sind oder der Oktober vorbei ist: Eine verpasste Oktoberfrist ist nicht das Ende der Sache, und Strafen sind nicht automatisch.

## Was gilt, wenn du Australien vor Jahresende verlassen hast?

Du kannst trotzdem einreichen, unter Umständen sogar vorzeitig. Eine Erklärung lässt sich von überall vorbereiten und einreichen, und die Erstattung wird auf ein australisches Bankkonto gezahlt. Halte dieses Konto offen, bis das Geld da ist, statt es am Flughafen zu schließen.

Das Konto zu schließen ist das häufigste selbstverschuldete Problem abgereister Backpacker: Eine Erstattung, die nicht gezahlt werden kann, bleibt beim ATO liegen, bis vom Ausland aus eine Alternative organisiert ist. Was sich nach der Abreise ändert, steht in unserem Guide zur [Steuererklärung aus dem Ausland](/de/blog/how-to-lodge-tax-return-from-overseas).

## Was entscheidet, ob du überhaupt einreichen musst?

In fast allen Fällen, ob von deinem Lohn Steuer einbehalten wurde. Hat irgendein Arbeitgeber etwas einbehalten, zeigt erst die Erklärung, ob es zu viel war, und für Working Holiday Maker mit australischem Einkommen ist sie praktisch immer nötig.

Ohne Erklärungspflicht bleiben enge Konstellationen, im Wesentlichen ohne Einkommen und ohne Einbehalt. Häufiger ist der andere Fall: Ein Jahr, in dem du verdient und nie eingereicht hast, verschwindet nicht. Es bleibt einreichbar, und Erstattungen aus Vorjahren sind häufig noch zu holen.

## Schuldest du eine Erklärung oder zwei?

Die Termine stehen fest, was sie für dein Geld bedeuten nicht. Die meisten Working Holiday Maker haben zwei Erklärungen statt einer, und diese Fakten entscheiden, was jede davon wert ist.

- Auf welcher Seite des 30. Juni deine erste und deine letzte Zahlung lagen, was die Zahl deiner Erklärungen setzt.
- Ob eines der Jahre ein Teiljahr war, denn Teiljahres-Einbehalt schießt über das Ziel hinaus.
- Ob es eine Phase gab, bevor deine TFN beim Arbeitgeber ankam, einbehalten mit 45 % statt 15 %.
- Ob du selbst einreichst oder über einen registrierten Steuerberater, was die Frist ändert.
- Ob ein australisches Bankkonto noch offen ist.
- Ob ein früheres Jahr nie eingereicht wurde, was meist noch zu holen ist.

Beide Jahre werden in der [Steuererklärung als Working Holiday Maker](/de/tax-return) ermittelt, und du kannst deine [Steuererstattung schätzen](/de/calculator), für jedes Jahr getrennt.
`,
  },

  'tax-deductions-working-holiday-makers': {
    title: 'Was kannst du als Backpacker absetzen?',
    description: 'Alles, was Backpacker absetzen können: Kurse, Ausrüstung, Arbeitskleidung, Fahrten zwischen Jobs, Steuerberatergebühren. Und was das ATO ablehnt.',
    body: `
Working Holiday Maker machen berufsbezogene Abzüge zu denselben Bedingungen geltend wie alle anderen in Australien. Uniformen und Schutzkleidung, Werkzeug, Fahrten zwischen Arbeitsorten, der berufliche Anteil einer Handyrechnung und Steuerberatergebühren sind alle absetzbar. Über jeden Einzelnen entscheidet, ob die Ausgabe dein Einkommen erwirtschaftet hat und ob du einen Beleg hast.

## Was macht eine Ausgabe überhaupt absetzbar?

Eine Ausgabe ist absetzbar, wenn du sie selbst getragen hast, sie unmittelbar mit der Erzielung deines Einkommens zusammenhängt und dir niemand die Kosten erstattet hat. Diese drei Bedingungen erledigen fast jeden Fall, und die dritte wird am häufigsten vergessen. Wenn die Farm dir die Handschuhe gegeben hat, sind die Handschuhe nicht dein Abzug.

Die vierte Bedingung ist der Nachweis. Ohne Quittung, Kontozeile oder Tagebuchnotiz ist eine echte Ausgabe trotzdem nicht absetzbar, das belegbare Jahr ist also meist kleiner als das ausgegebene.

## Welche Arbeitskleidung kannst du absetzen?

Kleidung ist absetzbar, wenn sie Schutzkleidung ist, vorgeschrieben und unverwechselbar, oder eine echte Uniform. Gewöhnliche Kleidung, die du zufällig zur Arbeit trägst, ist es nicht. Hier machen Working Holiday Maker am häufigsten etwas Unzulässiges geltend, weil Kleiderordnungen in der Gastronomie sich vorgeschrieben anfühlen, ohne es rechtlich zu sein.

Absetzbar:

- Uniformen mit Logo oder unverwechselbarem Design des Arbeitgebers
- Schutzkleidung wie Stahlkappenschuhe, Warnkleidung und Sonnenschutz für Arbeit im Freien
- Sicherheitsausrüstung einschließlich Handschuhen, Helmen und Schutzbrillen
- Waschen und Reinigen der genannten Stücke

Nicht absetzbar:

- Schlichte schwarze Hosen und weiße Hemden für die Gastronomie, auch wenn der Betrieb darauf besteht
- Konventionelle Bürokleidung
- Alles, was du auch außerhalb der Schicht tragen würdest

## Welches Werkzeug und welche Ausrüstung kannst du absetzen?

Werkzeug, das du selbst für die Arbeit kaufst, ist absetzbar, und die Größe der Anschaffung entscheidet, ob sofort oder über mehrere Jahre. Messerrollen, Kochjacken, Arbeitsschuhe, Handwerkzeug und Contracting-Ausrüstung qualifizieren, wo der Arbeitgeber sie nicht gestellt hat.

Gegenstände bis 300 $ pro Stück werden im Kaufjahr voll geltend gemacht. Größere Anschaffungen werden über ihre Nutzungsdauer abgeschrieben, und ab dem 1. Juli 2026 steigt die Grenze für den Sofortabzug bei geeigneten Gegenständen auf 1.000 $, was unser Guide zur [1.000-$-Sofortabschreibung](/de/blog/1000-dollar-instant-deduction-rule-2026) behandelt.

## Welche Fahrten kannst du absetzen, und welche sind privat?

Fahrten zwischen zwei verschiedenen Arbeitsorten am selben Tag sind absetzbar. Fahrten zwischen Zuhause und deinem regulären Arbeitsplatz sind privat, wie weit sie auch sind und wie früh die Schicht auch beginnt.

- Absetzbar: von der Café-Frühschicht zum Catering-Job am Nachmittag zu fahren
- Absetzbar: Fahrt zu einer Schulung oder einem Arbeitstermin abseits deines üblichen Orts
- Nicht absetzbar: der tägliche Weg vom Hostel zur immer gleichen Packhalle

Eine enge Ausnahme gilt für sperrige Ausrüstung, die am Arbeitsplatz nicht sicher verwahrt werden kann. Sie wird weit häufiger geltend gemacht, als sie zutrifft.

## Wie viel von deiner Handyrechnung zählt?

Der berufliche Anteil von Handy, Internet und Geräten ist absetzbar, der Prozentsatz muss aber begründet sein und nicht gewählt. Er braucht eine repräsentative Aufzeichnung beruflicher und privater Nutzung über das Jahr, keine Zahl, die ungefähr passend wirkt.

Für Backpacker, deren Handy für Dienstpläne, Schichttausch und Vermittlungskontakt läuft, ist ein moderater Prozentsatz leicht zu stützen. Ein hoher Prozentsatz auf einem Handy, das zugleich die einzige Verbindung nach Hause ist, lädt Fragen ein.

## Was machen Working Holiday Maker am häufigsten geltend?

Das Muster folgt über die von uns vorbereiteten Erklärungen hinweg der Arbeit, nicht dem Visum. Fast jeder hat einen belegbaren Handy-Prozentsatz, und die Steuerberatergebühr selbst ist im Folgejahr absetzbar.

- Sonnencreme, Sonnenbrille und Sonnenhut für Arbeit im Freien
- Arbeitsschuhe und Warnkleidung für Farm- und Bauarbeit
- Messerrollen und Kochkleidung für Küchenarbeit
- Der berufliche Anteil eines Handytarifs
- Steuerberatergebühren
- Weiterbildung, die unmittelbar mit der Arbeit zusammenhängt, die du bereits machst

## Was ist unter keinen Umständen absetzbar?

Manche Kosten fühlen sich beruflich an und sind es nicht, und sie machen den größten Teil abgelehnter Ansätze aus. Visakosten sind das klarste Beispiel: Das Visum lässt dich ins Land, es erwirtschaftet nicht dein Einkommen, also sind weder Antragsgebühr noch Flug absetzbar.

- Visagebühren und die Anreise nach Australien
- Mahlzeiten, außer du warst beruflich über Nacht auswärts
- Alles, was dein Arbeitgeber erstattet hat
- Der Weg von zu Hause zur Arbeit
- Alltagskleidung

## Was entscheidet über die Höhe deiner Abzüge?

Drei Dinge, und nur eines ist, was du ausgegeben hast. Erstens deine Tätigkeit: dieselben 400 $ für Schuhe und Handschuhe sind für einen Bauhelfer normal und für eine Empfangskraft ungewöhnlich. Zweitens, was du belegen kannst. Drittens, ob die Ausgabe deine war oder die des Arbeitgebers.

Eine begrenzte Erleichterung erlaubt insgesamt bis zu 300 $ berufsbezogene Ausgaben ohne Belege, und sie wird weithin als geschenkte 300 $ missverstanden. Ist sie nicht. Du musst das Geld trotzdem ausgegeben haben und erklären können, wie du auf die Zahl kommst, und sobald dein Gesamtansatz 300 $ überschreitet, fällt die Erleichterung für den ganzen Ansatz weg, nicht nur für den Überschuss.

## Wo hört das auf, eine Liste zu sein, und wird zur Beurteilung?

Sobald dieselbe Ausgabe an zwei Stellen sitzen könnte, und dort wird der meiste Wert gewonnen oder verloren. Ein Fahrzeug für zwei Jobs, ein Laptop für Contracting und für Flugbuchungen, ein Handy mit Liefer-App und Gruppenchat: Jedes davon ist ein Prozentsatz und kein Ja oder Nein, und der Prozentsatz ist eine Beurteilung deines Jahres, die kein Artikel für dich treffen kann.

Die zweite Beurteilung ist die Zuordnung zu den Arbeitgebern. Ein Jahr mit vier Arbeitgebern, einer davon unter einer ABN, erzeugt Abzüge für verschiedene Teile der Erklärung, und sie falsch zu setzen ist der häufigste Grund für eine spätere Berichtigung. Diese Analyse gehört zur Vorbereitung deiner [Steuererklärung](/de/tax-return), neben den Posten zu Wohnsitz und Medicare, die meist mehr Geld bewegen als die Abzüge. Das Ergebnis kannst du vorab in der [Steuererstattungsschätzung](/de/calculator) durchrechnen.
`,
  },

  // ─── Super - More posts ────────────────────────────────────────────────────

  // ─── Title/description-only translations (body falls back to English with notice) ─

  // Tax Return
  'how-to-lodge-tax-return-working-holiday': {
    title: 'Steuererklärung Australien: so gehst du vor',
    description: 'Du brauchst TFN, Income Statements aller Arbeitgeber und eine Bankverbindung. Eingereicht wird ab dem 1. Juli, auch wenn du längst wieder zu Hause bist.',
    body: `
Eine australische [Steuererklärung](/de/tax-return) deckt das Jahr bis zum 30. Juni ab und ist bei Selbstabgabe bis zum 31. Oktober fällig. Du kannst sie von überall auf der Welt einreichen. Wie unkompliziert das wird, entscheidet sich daran, ob jeder Arbeitgeber seine Meldung abgeschlossen hat und ob du dich noch ausweisen kannst.

## Wann kannst du tatsächlich einreichen?

Nicht am 1. Juli. Arbeitgeber haben bis Mitte Juli Zeit, ihre Lohnmeldungen abzuschließen, und bis dahin trägt dein Income Statement den Vermerk, dass es noch nicht abgabefertig ist: Die Zahlen darin können sich noch ändern.

Vorher einzureichen ist der häufigste selbstverschuldete Fehler der Saison. Die Erklärung geht gegen unvollständige Daten hinein, der Arbeitgeber schließt eine Woche später mit einer anderen Summe ab, und der Bescheid muss geändert werden, was länger dauert als Warten. Die Ausnahme ist eine vorgezogene Erklärung, weil du Australien mitten im Jahr endgültig verlässt, ein anderes Verfahren mit eigenen Regeln.

## Was brauchst du tatsächlich?

Weniger als die meisten annehmen, denn die Einkommensseite kommt vom ATO. Income Statements werden von den Arbeitgebern direkt gemeldet, Payslips sind also eine Gegenprobe und keine Voraussetzung, und ein Job ohne jede Unterlage steckt trotzdem im System.

Liefern musst du alles, was das ATO nicht ohnehin hat.

- Deine TFN und Ausweisdokumente
- Ein australisches Bankkonto für die Erstattung, der Posten, den die Leute zuerst verlieren
- Aufzeichnungen zu allen Werbungskosten, die du geltend machen willst
- Ein Medicare Entitlement Statement, wenn du die Levy-Befreiung beantragst, Wochen vorher bei Services Australia bestellt
- Angaben zu ABN- oder Contractor-Einkommen, das nicht vorausgefüllt wird

## Was entscheidet, ob du aus dem Ausland einreichen kannst?

Der Zugang, nicht die Berechtigung. Keine Regel verhindert eine Abgabe nach deiner Ausreise, und das von der Küche deiner Eltern in Hamburg aus zu erledigen ist gewöhnlich. Die Hürden sind die Identitätsprüfung und das Ziel der Erstattung.

Ein Behördenkonto aus dem Ausland einzurichten oder wiederzuerlangen ist deutlich schwerer, weil die Prüfwege auf australische Dokumente und eine australische Mobilnummer gebaut sind. Ein geschlossenes Bankkonto ist die zweite Hürde: Die Erstattung muss irgendwo landen, und ein Konto aus der Ferne wieder zu eröffnen dauert. Beides ist in deinem letzten Monat in Australien billig vorzubereiten und danach teuer zu reparieren. Die Abgabe über einen registrierten Steuerberater nimmt dir die Kontohälfte des Problems nicht ab, die Identitätshälfte schon.

## Was passiert nach der Einreichung?

Das ATO vergleicht, was über das Jahr einbehalten wurde, mit dem, was du geschuldet hast, und stellt einen Bescheid aus. Erstattungen werden meist etwa 14 Werktage nach der Einreichung ausgezahlt, in der Spitze von Juli bis September länger.

Zwei Dinge verlängern das. Eine Erklärung, die nicht zu den vorausgefüllten Daten passt, geht in eine manuelle Prüfung, weder Betriebsprüfung noch Problem, aber Zeit. Und eine Erklärung mit einem Bankkonto, auf das das ATO nicht auszahlen kann, bleibt stehen: Eine falsche BSB ist eine viel größere Verzögerung als eine komplizierte Werbungskostenposition.

## Was ändert sich, wenn du mehrere Arbeitgeber hattest?

Die Abstimmung wird zur eigentlichen Arbeit. Jeder Arbeitgeber, der Einkommen unter deiner TFN gemeldet hat, muss auftauchen, und das Risiko ist nicht, dass du zu viel erklärst, sondern dass du einen vergisst und das ATO deinen Bescheid nachträglich anpasst.

Dort liegt außerdem meist das Geld. Der Überabzug konzentriert sich auf einen Arbeitgeber statt sich zu verteilen: Der Job, der sechs Wochen bei 45 % lief, oder die Leiharbeitsfirma, die nie registriert war, entscheidet über die Höhe der Erstattung. Herauszufinden, welcher Arbeitgeber deutlich über 15 % lag, ist etwas anderes als das bloße Addieren der Summen.

## Was, wenn du zusätzlich ABN-Einkommen hattest?

Dann hast du zwei Einkommensarten in einer Erklärung, und nur bei einer wurde unterwegs Steuer abgezogen. Lohn kommt mit bereits einbehaltener PAYG-Steuer und vorausgefüllt an, [ABN](/de/abn)-Einkommen kommt ohne Einbehalt und ohne Vorausfüllung und muss aus deinen eigenen Aufzeichnungen erklärt werden.

Diese Kombination führt am ehesten zu einer Nachzahlung, weil der Einbehalt auf der Lohnseite berechnet wurde, ohne von der Contracting-Seite zu wissen. Ob am Ende eine Erstattung oder eine Rechnung steht, hängt vom Verhältnis der beiden ab und davon, welche Werbungskosten die ABN-Arbeit trägt, und das rechnet man besser vor dem Juni durch als es im Oktober zu entdecken.
`,
  },

  'what-is-payg-payment-summary': {
    title: 'PAYG Summary lesen: Einkommen und Abzug',
    description: 'Das PAYG Payment Summary heißt heute Income Statement und liegt in den ATO-Systemen statt beim Arbeitgeber. Warum die Finalisierung entscheidet, wann eingereicht wird.',
    body: `
Das PAYG Payment Summary gibt es als Papierdokument nicht mehr. Ersetzt wurde es durch das Income Statement, das für jeden Arbeitgeber den Gesamtlohn und die gesamte einbehaltene Steuer eines Steuerjahres ausweist. Es liegt in den Systemen des ATO und nicht bei deinem Arbeitgeber, und daraus wird eine Steuererklärung gebaut.

## Was ist der Unterschied zwischen PAYG-Einbehalt und Payment Summary?

Der laufende Vorgang und seine Jahresabrechnung, und beide Begriffe werden verwirrend vermischt. PAYG-Einbehalt ist das System: Dein Arbeitgeber nimmt von jeder Abrechnung Steuer heraus und schickt sie in deinem Namen ans ATO, jeden Lohnzyklus, das ganze Jahr.

Das Income Statement, früher PAYG Payment Summary und davor Group Certificate, ist die Jahressumme davon. Ein Arbeitgeber, ein Steuerjahr, ein Statement mit Bruttolohn und gesamter einbehaltener Steuer. Die Namen sind historisch, und Australier sagen aus Gewohnheit weiterhin Group Certificate.

## Wo liegt ein Income Statement tatsächlich?

In den Systemen des ATO, befüllt direkt von der Lohnsoftware deines Arbeitgebers über Single Touch Payroll. Dein Arbeitgeber händigt dir nichts aus, an deiner letzten Schicht ist nichts abzuholen, und es gibt keine Papierversion zu verlieren.

Für Backpacker ist das eine echte Verbesserung: Der Datensatz überlebt, wenn du das Land verlässt, den Kontakt zu einem Arbeitgeber verlierst oder nie ein Onlinekonto eingerichtet hast. Ein Steuerberater kann jedes Income Statement über alle Arbeitgeber direkt abrufen, der Standardweg für alle, die nach der Rückkehr aus Deutschland, Großbritannien oder Japan einreichen, und dabei taucht regelmäßig ein vergessener Arbeitgeber auf.

## Warum entscheidet das Abschlussdatum, wann du einreichen kannst?

Weil ein Income Statement erst nutzbar ist, wenn der Arbeitgeber es als finalisiert markiert; bis dahin ist es ausdrücklich als nicht tax ready gekennzeichnet. Arbeitgeber schließen im Normalfall zwischen dem 14. und dem 31. Juli ab.

Vor dem Abschluss einzureichen ist das häufigste selbstverschuldete Problem im Juli. Die Erklärung geht mit unvollständigen Zahlen raus, der Arbeitgeber schließt danach mit anderen ab, und aus einer Abgabe wird eine Abgabe plus eine Berichtigung. Bis Ende Juli oder Anfang August zu warten vermeidet das, und Erster zu sein bringt keinen Vorteil.

## Was, wenn ein Arbeitgeber nie abgeschlossen hat?

Es kommt vor, und es häuft sich dort, wo man es erwartet: Einzelbetriebe, kleine Farmen und Packhallen mit einer Saison Casual-Löhnen, und Lokale, in denen eine Person die Bücher nebenbei führt. Steht ein Income Statement nach dem 31. Juli noch auf in Bearbeitung, hat der Arbeitgeber seine Pflicht nicht erfüllt.

Deine Pflicht verschwindet dadurch nicht. Das Einkommen ist weiterhin erklärungspflichtig, und der Weg führt über die Rekonstruktion aus deinen eigenen Belegen: Payslips, Kontoeingänge mit den Löhnen und Dienstpläne. Das ist das stärkste Argument dafür, Payslips bei Eingang zu sammeln, denn eine Erntesaison allein aus Kontoauszügen zu rekonstruieren ist möglich, aber unerfreulich.

## Was solltest du vor der Abgabe prüfen?

Ob jeder Arbeitgeber, für den du gearbeitet hast, auf der Liste steht, und ob die Zahlen zu dem passen, was du bekommen hast. Die Daten des ATO sind üblicherweise korrekt, aber nicht immer, und eine Abweichung ist vor der Abgabe deutlich billiger zu klären als danach.

Gezielt suchen lohnt sich nach zwei Fehlern: einem fehlenden Arbeitgeber, also dem Abschlussproblem von oben, und einem Einbehaltssatz, der nicht zu deiner Erwartung passt. Ein Arbeitgeber bei 45 %, weil deine TFN ihn nie erreicht hat, oder bei Foreign-Resident-Sätzen, weil er nicht als Working-Holiday-Maker-Arbeitgeber registriert ist, zeigt sich als Prozentsatz, der nicht 15 % ist. Beides bedeutet eine größere Erstattung, konzentriert bei diesem einen Arbeitgeber.

## Wann kannst du gefahrlos einreichen?

Ein Income Statement wird für dich erzeugt und nicht von dir; unterschiedlich ist, ob es vollständig und ob es abgeschlossen ist. Diese Fakten entscheiden, wann du sicher einreichen kannst.

- Wie viele Arbeitgeber du hattest, denn jeder schließt getrennt ab und ein später Arbeitgeber hält die ganze Erklärung auf.
- Ob überhaupt einer abgeschlossen hat, denn sonst musst du rekonstruieren.
- Ob du Payslips aufgehoben hast, denn nur damit lässt sich eine Abweichung klären.
- Ob du Australien schon verlassen hast, was das Nachfassen beim Arbeitgeber erschwert und die ATO-Daten zur praktischen Quelle macht.
- Ob ein Teil des Einkommens bar oder unter einer ABN lief, denn beides erscheint in keinem Income Statement und ist trotzdem erklärungspflichtig.

Die Income Statements aller Arbeitgeber werden in einer [Steuererklärung als Working Holiday Maker](/de/tax-return) abgeglichen, und du kannst deine [Steuererstattung schätzen](/de/calculator) aus deinen eigenen Brutto- und Einbehaltssummen, noch bevor sie abgeschlossen sind.
`,
  },

  'do-you-need-to-lodge-tax-return-short-stay': {
    title: 'Kurzer Aufenthalt: Steuererklärung nötig?',
    description: 'Auch nach wenigen Wochen Arbeit musst du in der Regel einreichen. Gerade dann wurde oft zu viel einbehalten.',
    body: `
Ja, mit ziemlicher Sicherheit. Die Pflicht zur Abgabe folgt dem Einkommen, nicht der Aufenthaltsdauer: Zwei Wochen Lohn erzeugen dieselbe Pflicht wie zwei Jahre. Bei kurzen Aufenthalten ist der Anteil der Erstattung zugleich am höchsten, weil der Einbehalt ein volles Jahr unterstellt hat, das nie stattfand.

## Was löst die Abgabepflicht aus?

Dass du in einem Steuerjahr vom 1. Juli bis 30. Juni in Australien Lohn verdient hast. Weder Dauer noch Visum noch Höhe ändern daran etwas, und dem ATO liegt die Meldung deines Arbeitgebers über das, was dir gezahlt wurde, bereits vor.

- Eine Casual-Stelle über zwei Wochen
- Eine einzelne Erntesaison
- Kurzes Contracting unter einer [ABN](/de/abn)
- Bar bezahlte Arbeit, die hätte gemeldet werden müssen

Bar bezahlte Arbeit fällt nicht heraus. Das Einkommen ist steuerpflichtig, ob es gemeldet wurde oder nicht, und wie man eine Phase ohne Payslips rekonstruiert, steht in unserem Guide zur [Steuererklärung mit Bareinkommen](/de/blog/cash-in-hand-tax-return).

## Wann musst du wirklich einmal nicht einreichen?

Die Ausnahmen sind eng. Ohne australisches Einkommen im Jahr gibt es nichts einzureichen. War dein einziges Einkommen ein kleiner Betrag Bankzinsen mit korrekt angewendeter Quellensteuer, kann statt einer Erklärung eine Non-Lodgement-Advice die richtige Antwort sein.

Das ist ungefähr die ganze Liste. Wer in irgendeinem Zeitraum in einer lohnzahlenden Rolle gearbeitet hat, ist verpflichtet. Eine Non-Lodgement-Advice ist eine förmliche Erklärung gegenüber dem ATO und keine Entscheidung, die du privat dadurch triffst, dass du nichts tust.

## Warum liegen bei kurzen Aufenthalten die Erstattungen?

Weil der Einbehalt so gerechnet wird, als wiederholte sich jede Lohnperiode das ganze Jahr. Drei Monate Arbeit werden besteuert, als wären es zwölf, gemessen an einer Schuld, die nie entstanden ist.

Deshalb bringen gerade die kürzesten Einsätze oft den höchsten Anteil an Steuer zurück. Acht Wochen Ernte, Woche für Woche zu Working-Holiday-Maker-Sätzen besteuert, lassen üblicherweise den Großteil der einbehaltenen Steuer erstattungsfähig.

## Was hebt eine Kurzaufenthalts-Erstattung sonst noch?

Drei Posten, und die ersten beiden beantragt von selbst niemand. Eine Phase, bevor deine TFN beim Arbeitgeber ankam, mit 45 % statt 15 % einbehalten, sind 30 Cent auf jeden Dollar, die auf ihre Rückholung warten. Ein Arbeitgeber, der beim ATO nicht als Working-Holiday-Maker-Arbeitgeber registriert ist, behält zu Foreign-Resident-Sätzen ein, ein eigener zusätzlicher Überabzug.

Der dritte ist die Medicare-Lage. Die 2-%-Abgabe trifft Leute mit Medicare-Anspruch, wer aufgrund seines Passes keinen Anspruch hat, sollte sie also nicht zahlen, und die Rückholung braucht ein Medicare Entitlement Statement von Services Australia. Das sind rund 500 $ bei 25.000 $ Verdienst, und wer dafür infrage kommt, steht in unserem Guide zur [Medicare-Abgabe](/de/blog/medicare-levy-working-holiday-makers).

## Kannst du einreichen, nachdem du zu Hause bist?

Ja, und die meisten Kurzaufenthalts-Erklärungen entstehen genau so. Income Statements kommen aus den ATO-Systemen, nicht von deinen früheren Arbeitgebern, was zählt, wenn der Arbeitgeber eine Packhalle war, die du im März verlassen hast.

Die Standardfrist ist der 31. Oktober nach Jahresende, und über einen registrierten Steuerberater eingereichte Erklärungen tragen in der Regel eine verlängerte Frist bis in den Mai des Folgejahres. Die Erstattung geht auf ein australisches Bankkonto, die praktische Beschränkung ist also das offene Konto.

## Solltest du früher einreichen, wenn du mitten im Jahr abreist?

Möglicherweise. Wer Australien mitten in einem Steuerjahr endgültig verlässt, kann eine vorgezogene Erklärung für das Teiljahr abgeben statt bis zum folgenden Juli zu warten, und holt die Erstattung um Monate nach vorn.

Automatisch besser ist das nicht. Eine vorgezogene Erklärung entsteht, bevor die Arbeitgebermeldungen abgeschlossen sind, die Zahlen stammen also aus deinen eigenen Payslips, und sie muss geändert werden, wenn du zurückkommst und im selben Jahr noch einmal arbeitest. Sie passt zu einem sauberen Abgang mit vollständigen Unterlagen und schlecht zu einem ungewissen.

## Was entscheidet, ob es sich lohnt?

Ob überhaupt etwas einbehalten wurde und wie das Jahr geschnitten war. Ein kurzer Aufenthalt mit Einbehalt zu irgendeinem Satz bringt fast immer etwas zurück, und einer mit durchgehend 45 % Einbehalt fast immer viel.

Die Jahre, die ungenutzt bleiben, sind die, die Leute sich selbst ausreden: drei Wochen Promotionarbeit, ein Monat Packen, eine einzelne Saison. Genau das sind die Jahre mit dem höchsten Anteil an Überabzug. Wenn du in Australien gearbeitet und nie eingereicht hast, ist die [Steuererklärung](/de/tax-return) für dieses Jahr weiterhin offen, und wo eine Erstattung statt einer Schuld anstand, fällt in der Regel keine Strafe an. Wo Strafen greifen, erklärt unser Guide zu [verspäteten Erklärungen](/de/blog/late-tax-return-penalty-working-holiday).
`,
  },

  'how-to-lodge-tax-return-from-overseas': {
    title: 'Steuererklärung aus Deutschland einreichen',
    description: 'Die Abgabe aus dem Ausland ist Standard. Die Income Statements werden abgerufen, die Erstattung geht auf ein australisches oder ausländisches Konto.',
    body: `
Du musst nicht in Australien sein, um einzureichen. Eine australische Erklärung lässt sich von überall abgeben, für jedes Jahr, in dem du australisches Einkommen hattest, auch für längst zurückliegende. Die Erstattung geht auf ein australisches Bankkonto, und deshalb ist das Schließen dieses Kontos auf dem Weg zum Flughafen der vermeidbare Fehler.

## Was wird nach der Abreise tatsächlich schwerer?

Der Zugang, nicht die Erklärung. Die steuerliche Lage ist identisch, ob du in Brisbane oder in Berlin sitzt. Was sich ändert: Jeder Prüfschritt unterstellt eine australische Telefonnummer, eine australische Adresse und ein australisches Ausweisdokument in Reichweite.

Daran scheitert die Abgabe aus dem Ausland. Ein Behördenkonto an einer toten australischen SIM empfängt seine Codes nicht, ein ATO-Brief geht an ein Hostel, das nichts nachsendet, und eine Hotline ist eine Stunde Warteschleife um 3 Uhr nachts deiner Zeit. Nichts davon ist ein Steuerproblem, und alles davon verhindert, dass Erklärungen eingereicht werden.

## Was brauchst du tatsächlich?

Weniger als die meisten annehmen, denn die Einkommensaufzeichnung existiert bereits in den ATO-Systemen. Arbeitgeber melden Löhne und Einbehalt über Single Touch Payroll, ein Schuhkarton verlorener Payslips ist also selten die Hürde.

- Deine TFN, die dauerhaft ist und mit deiner Ausreise nicht verfällt
- Passdaten für die Identitätsprüfung
- Ein noch offenes australisches Bankkonto für die Erstattung
- Angaben zu ABN- oder Contractor-Einkommen, hinter dem keine Meldung steht
- Belege für alle Werbungskosten, die du geltend machen willst

Unersetzlich auf dieser Liste ist allein das Bankkonto. Eine Erstattung, die das ATO nicht auszahlen kann, bleibt veranlagt, aber unzugestellt liegen, bis aus dem Ausland eine Alternative organisiert ist, und das ist langsamer und mehr Papierkram, als das Konto noch ein paar Monate offen zu lassen.

## Wann ist die Frist, und verschiebt sie sich?

Der 31. Oktober nach Ende des Steuerjahres gilt für die Selbstabgabe. Eine über einen registrierten Steuerberater eingereichte Erklärung fällt in der Regel unter einen begünstigten Termin weit im Folgejahr, eine verpasste Oktoberfrist ist also nicht das Problem, als das sie aussieht.

Es gibt auch den umgekehrten Fall. Wer mitten in einem Steuerjahr ausgereist ist und nicht zurückkommt, kann manchmal schon vor dem 30. Juni eine vorgezogene Erklärung für das Teiljahr abgeben und die Erstattung nach vorn holen.

## Wie lange dauert die Erstattung?

Im unkomplizierten Fall etwa 14 Werktage ab Einreichung, ausgezahlt in australischen Dollar auf ein australisches Konto. Es kann schneller gehen und deutlich länger dauern, wenn das ATO eine manuelle Prüfung anwendet.

Bei Auslandsadressen kommt es häufiger zu solchen Prüfungen, besonders bei einer ersten Erklärung oder einer erst kürzlich ausgegebenen TFN. Das ist eine Verzögerung und keine Ablehnung, und was sie verkürzt, sind konsistente Identitätsangaben über Pass, Visum und TFN-Datensatz hinweg.

## Was ist mit Jahren, die du nie eingereicht hast?

Sie sind weiterhin einreichbar, und bei ausgereisten Working Holiday Makern liegen dort oft die größten Beträge. Ein nicht eingereichtes Jahr verfällt nicht, und mehrere Jahre lassen sich in einem Durchgang erledigen.

Das zählt am meisten für alle, die ein erstes Jahr gearbeitet haben, nach Hause geflogen sind und sich nie darum gekümmert haben. Solche Jahre enthalten meist eine 45-%-Phase, bevor die TFN ankam, und eine nie beantragte Medicare-Levy-Befreiung.

## Was, wenn du am Ende schuldest statt zu bekommen?

Das kommt vor. ABN-Einkommen ohne Einbehalt, ein Declaration-Formular mit zu Unrecht beanspruchtem Freibetrag und ein Jahr überwiegend bar bezahlter Arbeit sind die drei Situationen, die aus einer Erklärung einen Zahlbetrag machen.

Ist das das Ergebnis, stellt das ATO einen Bescheid mit Fälligkeitsdatum aus, und ein Zahlungsplan lässt sich vereinbaren. Es verschwindet nicht dadurch, dass du das Land verlassen hast, und eine offene Steuerschuld nimmt man ungern in einen künftigen australischen Visumsantrag mit. Wie das läuft, steht in unserem Guide zu [ATO-Zahlungsplänen](/de/blog/ato-payment-plan-tax-debt-australia).

## Hast du vor dem Abflug alles geklärt?

Die Abgabe aus dem Ausland ist Routine. Wie glatt sie läuft, hängt fast vollständig davon ab, was du zurückgelassen hast. Die folgenden Punkte sind vor dem Abflug deutlich leichter zu regeln.

- Ob ein australisches Bankkonto noch offen ist, um die Erstattung zu empfangen.
- Ob das ATO eine aktuelle Adresse von dir hat und nicht ein Hostel, das du vor zwei Jahren verlassen hast.
- Ob deine Identitätsangaben über Pass, Visum und TFN-Datensatz hinweg konsistent sind.
- Wie viele Steuerjahre nicht eingereicht sind, denn die lassen sich meist zusammen erledigen.
- Ob eines dieser Jahre ABN-Einkommen enthielt, was aus einer Erstattung eine mögliche Schuld macht.
- Ob die Super ebenfalls noch dort liegt, denn erst die Ausreise macht einen DASP-Antrag möglich.

Jedes Jahr wird in der [Working-Holiday-Steuererklärung](/de/tax-return) einzeln ermittelt, und du kannst für jedes davon vorab deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  'what-is-a-tax-agent': {
    title: 'Was macht ein registrierter Steuerberater?',
    description: 'Ein registrierter Steuerberater steht im öffentlichen TPB-Register, darf für dich einreichen und hat längere Fristen. So prüfst du den Eintrag.',
    body: `
Ein Steuerberater ist nach australischem Recht registriert, um Erklärungen für andere zu erstellen und einzureichen. Wer für Steuerarbeit Geld nimmt, muss diese Registrierung halten. Für einen Working Holiday Maker sind die praktischen Unterschiede eine spätere Abgabefrist, kein direkter Umgang mit dem ATO und jemand, der weiß, was ein 417- oder 462-Jahr wirklich enthält.

## Was macht ein Steuerberater, was du nicht selbst kannst?

Drei Dinge, und nur eines ist die Abgabe selbst. Ein Steuerberater ruft deine Einkommensaufzeichnung direkt aus den ATO-Systemen ab, statt sich auf deine Erinnerung zu verlassen, wendet die Fristverlängerung eines Abgabeprogramms der Steuerberater an und steht zwischen dir und dem ATO, falls danach etwas hinterfragt wird.

Auf Absenden zu drücken war nie der schwere Teil. Schwer ist die Entscheidung, was vor dem Absenden hineingehört: welcher Wohnsitz für dein Jahr zutrifft, ob die Medicare-Levy-Befreiung bei deinem Pass verfügbar ist, und welche Ausgaben die Nachweisregeln erfüllen, statt sich nur beruflich anzufühlen.

## Wer erstellt deine Erklärung, und wer gibt sie frei?

Zwei verschiedene Stellen, und das mit Absicht. Deine Erklärung wird von unserem Team erstellt, das ausschließlich an 417- und 462-Steuerfragen arbeitet und dieselben Situationen täglich sieht. Danach wird sie vor der Einreichung beim ATO von einem registrierten Steueragenten geprüft und freigegeben.

Diese Trennung gibt dir Fachwissen und berufliche Verantwortlichkeit zugleich, und sie ist überprüfbar: Die Registrierung des Steueragenten steht im öffentlichen Register der Steuerpraktiker.

## Wie prüfst du, ob jemand mit Steuerhilfe seriös ist?

Indem du seine Registrierung im öffentlichen staatlichen Register der Steuerpraktiker findest. Das ist die einzige verbindliche Quelle und dauert unter einer Minute. Das Register zeigt, ob eine Registrierung aktuell ist, ob sie Auflagen unterliegt und ob sie Steuerberatungsleistungen abdeckt und nicht nur BAS-Dienstleistungen.

Ein zweiter Test fängt fast alles Übrige. Ein seriöser Steuerberater braucht nie dein Behördenkonto-Passwort, weil er deine Daten über seinen eigenen Beraterkanal erreicht. Wer danach fragt, arbeitet nicht als Steuerberater, wie er sich auch nennt.

Working Holiday Maker werden dafür gezielt angesprochen, in Facebook-Gruppen und Messenger-Communities, weil sie nicht wissen, wie normal aussieht. Schick niemals TFN, Pass oder Visumsbescheid an jemanden, der keine Registrierungsnummer nennen kann.

## Was ändert sich tatsächlich, sobald ein Steuerberater beauftragt ist?

Du wechselst in sein Abgabeprogramm, das eine begünstigte Frist weit hinter dem 31. Oktober der Selbstabgabe trägt. Die Kommunikation mit dem ATO läuft über den Steuerberater, einschließlich jeder Rückfrage, Anpassung oder Prüfung nach der Einreichung.

Am deutlichsten zeigt sich der Unterschied bei der Beschaffung. Income Statements eines Arbeitgebers, dessen Namen du vergessen hast, eine nie erhaltene TFN, ein nicht eingereichtes Jahr von vorletztem Sommer und ein DASP-Antrag liegen alle in Systemen, die aus einem Beraterkanal leichter zu erreichen sind als aus einer Hotline-Warteschleife in einer anderen Zeitzone.

## Welche Jahre sind nahe an einer Formalität?

Die einfachen, und die gibt es fairerweise. Ein Arbeitgeber das ganze Jahr, eine TFN ab der ersten Woche hinterlegt, durchgehend korrekte 15 % einbehalten, kein ABN-Einkommen, keine belegenswerten Werbungskosten und ein Pass, an dem keine Medicare-Frage hängt. Da gibt es für niemanden viel zu finden.

Die Jahre, in denen es keine Formalität mehr ist, sind die für dieses Publikum üblichen: mehrere Arbeitgeber, eine Lücke, bevor die TFN ankam, eine Phase auf einer ABN, ein Wohnsitz, der nicht ordentlich geprüft wurde, ein Pass, der die Medicare-Antwort ändert, oder ein Jahr, für das du das Land bereits verlassen hast. Wo genau Geld verloren geht, steht in unserem Vergleich [Selbstabgabe gegen Steuerberater](/de/blog/diy-tax-return-vs-tax-agent-working-holiday).

## Ist die Steuerberatergebühr absetzbar?

Ja, in der Erklärung des Folgejahres. Gebühren für die Verwaltung deiner Steuerangelegenheiten sind in dem Jahr absetzbar, in dem sie gezahlt werden. Eine im Oktober für das abgelaufene Jahr gezahlte Gebühr wird also in der Erklärung für das Zahlungsjahr geltend gemacht.

Für einen Working Holiday Maker, dessen Aufenthalt zwei Steuerjahre umspannt, senkt die Gebühr des ersten Jahres in der Regel das zu versteuernde Einkommen des zweiten. Wer auf dem Weg hinaus eine letzte Erklärung einreicht, hat kein Folgejahr, in dem er sie geltend machen könnte.

## Für welche Jahre lohnt sich ein Steuerberater?

Das ist keine allgemeine Frage, sondern eine über dein bestimmtes Jahr. Je mehr der folgenden Punkte passen, desto weiter entfernt sich die Erklärung von einer Formalität.

- Wie viele Arbeitgeber du hattest, denn Einkommen eines vergessenen ist die häufigste Auslassung in einer selbst eingereichten Erklärung.
- Ob es eine Phase gab, bevor deine TFN beim Arbeitgeber ankam, mit 45 % statt 15 % einbehalten.
- Welchen Pass du hältst, denn davon hängt ab, ob die Befreiung von der 2-%-Medicare-Abgabe überhaupt verfügbar ist.
- Ob dein steuerlicher Wohnsitz ordentlich geprüft wurde, denn er hängt an deinen persönlichen Umständen und nicht an einer einzelnen Tatsache.
- Ob du ABN-Einkommen neben Lohn hast, was sowohl die Berechnung als auch den Papierkram ändert.
- Ob du Australien bereits verlassen hast, was fast jeden Beschaffungsschritt allein schwerer macht.

Das ganze Jahr wird in der [Working-Holiday-Steuererklärung](/de/tax-return) ermittelt, und eine grobe Hausnummer liefert dir vorab der [Erstattungsrechner](/de/calculator).
`,
  },

  'how-does-payg-withholding-work': {
    title: 'PAYG: wie der Steuerabzug vom Lohn läuft',
    description: 'Dein Arbeitgeber behält die Steuer bei jeder Abrechnung ein und führt sie ans ATO ab. Am Jahresende wird abgeglichen, und zu viel Gezahltes kommt zurück.',
    body: `
PAYG-Einbehaltung heißt, dass dein Arbeitgeber bei jeder Lohnzahlung Steuer herausnimmt und sie auf deine Rechnung an das ATO abführt. Für einen Working Holiday Maker mit hinterlegter [TFN](/de/tfn) sollten das 15 % sein. Ob sie es sind, entscheiden zwei Dinge: dein Declaration-Formular und ob dein Arbeitgeber registriert ist.

## Wovon hängt der Einbehaltungssatz ab?

Zuerst vom Declaration-Formular. Die Lohnbuchhaltung wendet den Satz an, der sich aus den Angaben im Tax File Number Declaration ergibt. Einer Führungskraft deine Nummer mündlich zu nennen oder ein Foto des Briefs zu zeigen ändert nichts, solange das Formular nicht ausgefüllt ist. Bis dahin verlangt das Gesetz 45 %.

Der zweite Punkt ist weniger bekannt: die Registrierung des Arbeitgebers selbst. Ein Betrieb muss sich beim ATO als Arbeitgeber von Working Holiday Makern registrieren, bevor er den 15-%-Satz anwenden darf. Ein nicht registrierter behält zu Foreign-Resident-Sätzen ein, derzeit 30 % in der maßgeblichen Stufe, egal wie perfekt deine Unterlagen sind.

- TFN Declaration ausgefüllt, Arbeitgeber registriert: 15 %
- TFN bei diesem Arbeitgeber noch nicht hinterlegt: 45 %
- Arbeitgeber nicht als WHM-Arbeitgeber registriert: Foreign-Resident-Sätze, derzeit 30 %
- Freibetrag versehentlich angekreuzt: zu wenig einbehalten und später eine Rechnung

## Wie liest du den Satz von deinem eigenen Payslip ab?

Teile die einbehaltene Steuer durch den Bruttolohn derselben Periode. Das ist die ganze Prüfung, und sie ist der einzige verlässliche Weg, einen falschen Satz zu bemerken, bevor sich Monate davon angesammelt haben.

Ein Payslip sollte Bruttolohn, einbehaltene Steuer, Super und Nettolohn als getrennte Zeilen zeigen. Die 12 % Super zahlt der Arbeitgeber zusätzlich zu deinem Lohn und nicht davon abgezogen, sie sollte den Nettobetrag also nie mindern. Ein Payslip, auf dem Super aus deinem Lohn zu kommen scheint, gehört hinterfragt. Ergibt die Rechnung 45 %, obwohl dein Declaration-Formular vor Wochen eingegangen ist, ist das ein Lohnbuchhaltungsproblem für sofort und kein Steuerproblem für den Oktober.

## Ist zu viel einbehaltene Steuer verloren?

Nein. Jeder einbehaltene Dollar ist eine Vorauszahlung, die auf deine tatsächliche Schuld angerechnet wird, wurden also 45 % genommen und 15 % geschuldet, kommt die Differenz mit der [Steuererklärung](/de/tax-return) zurück. Es verschwindet nichts.

Verloren ist die Verfügbarkeit über das Geld in der Zwischenzeit. Dreißig Cent auf jeden Dollar, die von Februar bis August beim ATO liegen, sind der Unterschied zwischen einer Fahrt die Küste hoch und keiner Fahrt. Deshalb korrigiert man einen falschen Satz jetzt, statt auf eine größere Erstattung später zu setzen.

## Was passiert am Jahresende mit den Zahlen?

Dein Arbeitgeber schließt seine Lohnmeldung nach dem 30. Juni ab, und die Jahressummen an Lohn und einbehaltener Steuer werden unter deiner TFN an das ATO gemeldet. Aus diesen Zahlen wird dein Income Statement, und darauf baut eine Erklärung auf und nicht auf deinen Payslips.

Einkommen liegt also in ATO-Systemen, auch wenn deine eigenen Aufzeichnungen es nicht tun. Ein abrupt verlassener Job, ein inzwischen geschlossener Betrieb oder ein nie erhaltener Payslip entfernt dieses Einkommen nicht aus deiner Erklärung und rückt es auch nicht außer Reichweite. Die Summe muss nur beschafft und nicht erinnert werden.

## Welchen PAYG-Problemen lohnt es nachzugehen?

Denen, die den Satz über einen längeren Zeitraum verändert haben, und nicht einem einzelnen merkwürdigen Payslip. Ein Monat bei 45 %, bevor ein Declaration-Formular verarbeitet war, eine ganze Erntesaison bei einer nicht registrierten Leiharbeitsfirma oder ein Zweitjob, der das ganze Jahr auf dem falschen Satz lief, sind jeweils echtes Geld wert und werden alle über die Erklärung zurückgeholt.

Zwei weitere laufen in die andere Richtung. Den Freibetrag als Working Holiday Maker auf einem Declaration-Formular zu beanspruchen heißt zu wenig Einbehalt und erzeugt eine Rechnung statt einer Erstattung. Bar bezahlte Arbeit hat gar keinen Einbehalt, die Steuer darauf wird also in voller Höhe zum Jahresende fällig. Beides lässt sich vorher leichter einplanen als im Oktober entdecken. Jede Lohnperiode zu prüfen, [was die Zeile mit der einbehaltenen Steuer auf deinem Payslip bedeutet](/de/blog/what-does-tax-withheld-mean-payslip), verhindert, dass eines davon monatelang läuft.
`,
  },

  'australian-financial-year-dates': {
    title: 'Steuerjahr Australien: 1. Juli bis 30. Juni',
    description: 'Das australische Steuerjahr läuft vom 1. Juli bis 30. Juni. Die wichtigsten Termine für Working Holiday Maker: Abgabe ab 1. Juli, Frist 31. Oktober.',
    body: `
1. Juli bis 30. Juni. Das australische Steuerjahr ist nicht das Kalenderjahr. Ein Working Holiday, das über den 30. Juni läuft, erzeugt zwei getrennte Steuererklärungen statt einer. Das laufende Jahr 2026-27 geht vom 1. Juli 2026 bis 30. Juni 2027.

## Warum zählt der Stichtag hier mehr als zu Hause?

Weil Working Holidays sich selten daran halten. Ein Jahr von November bis September darauf liegt über zwei Steuerjahren. Jedes ist ein eigener Bescheid mit eigenem Einkommen, eigenem Einbehalt und eigenem Ergebnis.

Teiljahres-Einkommen ist der größte einzelne Grund für unerwartet hohe Erstattungen: Der Einbehalt wird so berechnet, als liefe dein Lohn das ganze Jahr weiter. Sechs Monate Vollzeitarbeit, veranlagt als sechs Monate und nicht als volles Jahr, machen einen großen Teil der typischen Erstattung aus.

## In welches Steuerjahr fällt deine Arbeit?

In das, in dem das Geld verdient wurde. Maßgeblich ist das Zahlungsdatum, nicht der Arbeitstag. Drei Muster decken die meisten Fälle ab.

- Im November angekommen, bis Mai gearbeitet: alles in einem Steuerjahr, Abgabe nach dem 30. Juni.
- Im Mai angekommen, im August darauf abgereist: zwei Steuerjahre, zwei Erklärungen, eine für Mai und Juni, eine für Juli und August.
- Im Juli angekommen, bis Juni darauf gearbeitet: genau ein Steuerjahr.

Hast du in einem vergangenen Steuerjahr gearbeitet und nie eingereicht, bleibt dieses Jahr offen; die Erstattung verfällt nicht mit der Zeit. Nicht eingereichte Vorjahre sind bei Zweitvisum-Inhabern häufig und bedeuten meist Geld für dich, nicht gegen dich.

## Wann kannst du einreichen, und wann solltest du?

Die Abgabe öffnet am 1. Juli, und am 1. Juli einzureichen ist meistens ein Fehler. Arbeitgeber schließen die Income Statements über die erste Julihälfte ab. Eine Erklärung vor dem Abschluss kann einen Arbeitgeber komplett auslassen und erzwingt danach eine Berichtigung.

Ende Juli oder Anfang August ist das praktische Fenster. Die Standardfrist für die Selbstabgabe ist der 31. Oktober; die Abgabe über einen Steuerberater verlängert sie. Das zählt, wenn du noch hinter einem Arbeitgeber her bist, der nicht abgeschlossen hat.

## Was gilt, wenn du vor dem 30. Juni Australien verlässt?

Dann kannst du unter Umständen eine vorgezogene Erklärung einreichen, statt bis zur Heimkehr zu warten. Wenn du endgültig abreist und in diesem Jahr kein weiteres australisches Einkommen erzielst, kann die Erklärung vor Jahresende eingereicht werden.

Ob das der richtige Schritt ist, hängt an drei Punkten: ob jeder Arbeitgeber ein abschließendes Income Statement ausgestellt hat, ob gleichzeitig Superannuation zu beantragen ist und wie dein Wohnsitz für das Jahr beurteilt wird. Abreise im April mit drei Arbeitgebern, von denen einer nicht abgeschlossen hat, erzeugt bei früher Abgabe später eine Berichtigung.

## Welche anderen Termine laufen auf demselben Kalender?

Zwei weitere Terminsätze zählen für abreisende Working Holiday Maker, und beide liegen außerhalb der Steuererklärung. Der eine entscheidet, ob deine letzten Superbeiträge schon existieren, der andere, wann du sie beantragen kannst.

Superannuation wird vierteljährlich gezahlt, fällig am 28. Oktober, 28. Januar, 28. April und 28. Juli. Reist du im Mai ab, sind die Beiträge deines letzten Quartals bis Ende Juli nicht gezahlt, ein häufiger Grund für einen zu niedrigen Superantrag.

Dein Visa-Enddatum startet eine eigene Uhr: Es steuert, ab wann du deine [Superannuation nach der Abreise auszahlen lassen](/de/superannuation) kannst. Ein Fonds, der den Kontakt zu dir verliert, überträgt das Guthaben irgendwann als unclaimed super ans ATO.

## Wo liegen deine Ankunft und deine Abreise?

Die Termine sind für alle gleich; wie viele Erklärungen du schuldest und wann du sie einreichen kannst, ist es nicht. Darüber entscheiden diese Fakten über deine eigene Ankunft und Abreise.

- Ob dein Aufenthalt den 30. Juni überschreitet, denn dann sind es zwei Erklärungen.
- Ob du vor dem 30. Juni abreist, was die vorgezogene Abgabe eröffnet.
- Ob jeder Arbeitgeber dein Income Statement abgeschlossen hat.
- Ob du nicht eingereichte Vorjahre aus einem früheren Visum hast.
- Ob dein letztes Superquartal schon gezahlt wurde, ein Juli-Ereignis auch bei Abreise im April.

Das Jahr, für das du einreichst, entscheidet über die Sätze und Grenzen deiner [Steuererklärung als Working Holiday Maker](/de/tax-return). Du kannst deine [Steuererstattung schätzen](/de/calculator), für jedes gearbeitete Jahr getrennt.
`,
  },

  'cash-in-hand-tax-return': {
    title: 'Schwarz gearbeitet: was musst du angeben?',
    description: 'Bar bezahltes Einkommen ist steuerpflichtig und gehört in die Erklärung. Ohne Payslips rekonstruierst du es über Kontoauszüge und eigene Aufzeichnungen.',
    body: `
Ja. Barlohn ist steuerpflichtiges Einkommen, genau wie Lohn, der aufs Bankkonto geht. Unterwegs wurde nur nichts einbehalten: Die Steuer wird bei der Abgabe geregelt statt Zahlung für Zahlung, und das Einkommen kommt aus deinen eigenen Aufzeichnungen statt aus einer Arbeitgebermeldung.

## Was ändert sich, wenn du bar bezahlt wirst?

Nur die Mechanik, nicht die Pflicht. Keine PAYG-Steuer zum Zeitpunkt der Zahlung, kein Single-Touch-Payroll-Eintrag, voller Betrag für dich. Die Steuerschuld wandert von der Lohnbuchhaltung deines Arbeitgebers zu dir und wird fällig, wenn das Jahr veranlagt wird.

Der 15-%-Satz gilt auf Bareinkommen genauso wie auf Lohn, kommt aber als Zahlbetrag an statt als etwas bereits Erledigtes. Wer ausschließlich bar gearbeitet und nichts zurückgelegt hat, steht deshalb vor einer Rechnung statt vor einer Erstattung.

## Darf dein Arbeitgeber dich überhaupt bar bezahlen?

Ja. Lohn in bar auszuzahlen ist legal. Nicht legal ist es, keine Steuer einzubehalten, den Lohn nicht zu melden, keine Superannuation zu zahlen oder keinen Payslip auszustellen.

Eine Barvereinbarung ist für sich genommen kein Beweis für irgendetwas. Ein sauber geführter Barjob kommt mit Payslip, einbehaltener PAYG-Steuer, gezahlter Super und Meldung an das ATO. Fehlt das alles, fehlen die Pflichten des Arbeitgebers, und er trägt dafür das Risiko.

## Welche Aufzeichnungen machen eine ehrliche Erklärung möglich?

Deine eigenen laufenden Notizen, denn sonst existiert nichts. Gearbeitete Tage, Stunden pro Schicht, der vereinbarte Satz, der jeweils erhaltene Betrag und wer dich bezahlt hat sind die gesamte Beweisgrundlage. Laufend festgehalten überzeugen sie weit mehr als ein Jahr später rekonstruiert.

- Kontoeingänge, auch teilweise eingezahltes Bargeld, die ein Muster belegen
- Textnachrichten oder App-Benachrichtigungen zu Schichten und Lohn
- Dienstpläne, Fotos am Arbeitsplatz, Namen von Leuten, mit denen du gearbeitet hast
- Firmenname und ABN dessen, der dich bezahlt hat

Bewahre das an einem Ort auf, der einen Handyverlust überlebt. Das ATO kann noch mehrere Jahre nach der Abgabe zu einer Erklärung nachfragen, und bis dahin ist ein WhatsApp-Verlauf aus einem Hostel in Cairns meistens weg.

## Was, wenn die Zahlen nicht exakt sind?

Erkläre eine ehrliche, bestmögliche Schätzung und bleib konsistent darin, wie du zu ihr gekommen bist. Bareinkommen wird als Lohn ohne Income Statement erklärt; Selbstabgabe und Abgabe über einen Steuerberater unterstützen das beide.

Entscheidend ist der Unterschied zwischen gutgläubiger Schätzung und vorsätzlicher Auslassung. Eine ungenaue, aber ehrliche Zahl mit einer Methode, die du erklären kannst, ist etwas ganz anderes als weggelassenes Einkommen: Das Problem entsteht durch die Auslassung, nicht durch die Ungenauigkeit. Zu niedrig erklärtes Einkommen hat eigene Folgen, behandelt in unserem Guide zu [zu niedrig erklärtem Einkommen und ATO-Strafen](/de/blog/understating-income-ato-penalty-working-holiday).

## Was ist mit der Superannuation auf Bararbeit?

Warst du Angestellter und nicht Contractor, waren 12 % Superannuation auf deine regulären Bezüge geschuldet, ob du bar oder per Überweisung bezahlt wurdest. Barzahlung hebt die Pflicht nicht auf, und hier verschwindet bei einem Barjob praktisch das meiste Geld.

Sie zurückzuholen hängt an denselben Aufzeichnungen wie die Einkommenserklärung. Wie das Verfahren um den Superannuation Guarantee Charge funktioniert, steht in unserem Guide zu [nicht gezahlter Super und was du dagegen tust](/de/blog/super-employer-not-paying-what-to-do).

## Bringt dich das Erklären in Schwierigkeiten?

Das Erklären ist gerade das, was dich schützt. Eine ehrliche Erklärung ist eine saubere Akte, und das Versäumnis des Arbeitgebers, einzubehalten, zu melden und Super zu zahlen, liegt auf seiner Seite der Bilanz, nicht auf deiner.

Das Risiko liegt umgekehrt. Ein nicht eingereichtes Jahr oder ein eingereichtes Jahr mit ausgelassenem Einkommen wird später schwierig, besonders für jeden, der noch ein australisches Visum beantragen will. Den Arbeitgeber beim Fair Work Ombudsman zu melden ist eine getrennte Entscheidung; was sie bedeutet, steht in unserem Guide zu [Lohnraub in Australien](/de/blog/wage-theft-working-holiday-australia).

## Endet dein Jahr mit Erstattung oder Rechnung?

Ob Bareinkommen erklärt werden muss, steht nicht zur Debatte. Was es dich kostet und ob das Jahr in einer Erstattung oder einer Rechnung endet, hängt am Rest des Bildes.

- Ob du im selben Jahr auch reguläre Anstellung hattest, denn deren Einbehalt deckt oft die Steuer auf das Bargeld.
- Ob du Angestellter warst oder unter einer ABN beschäftigt, denn davon hängen Super und Award-Ansprüche ab.
- Wie viel von dem Bargeld du belegen kannst, denn das macht die Zahl verteidigungsfähig.
- Ob der Arbeitgeber überhaupt etwas gemeldet hat.
- Ob gegen die Arbeit Werbungskosten verfügbar sind, die den veranlagten Betrag senken.
- Ob 12 % Super gezahlt wurden, meist die größere Summe und getrennt zurückholbar.

Zusammengerechnet wird das alles in der [Working-Holiday-Steuererklärung](/de/tax-return). Ob am Ende eine Erstattung oder eine Rechnung steht, sagt dir vorher schon der [Erstattungsrechner](/de/calculator).
`,
  },

  'tax-residency-working-holiday-makers': {
    title: 'Steuerlicher Wohnsitz: was zählt wirklich',
    description: 'Der steuerliche Wohnsitz kann die Sätze für dein ganzes Jahr ändern. Warum die Frage schwerer ist, als sie aussieht, und wer sie am Ende beurteilt.',
    body: `
Der steuerliche Wohnsitz ist die eine Frage, die die Sätze für dein gesamtes australisches Jahr ändern kann. Für die meisten Working Holiday Maker bleibt es bei den Working-Holiday-Maker-Sätzen, 15 % auf die ersten 45.000 $. Für eine Minderheit geht das Jahr anders aus, und der Unterschied kann mehrere tausend Dollar betragen. Welche Seite auf dich zutrifft, steht weder im Visum noch auf einem Payslip.

## Was sind die Working-Holiday-Maker-Sätze?

Sie gelten für Lohneinkommen auf einem 417- oder 462-Visum: 15 % auf die ersten 45.000 $, 30 % von 45.001 bis 135.000 $, 37 % von 135.001 bis 190.000 $ und 45 % darüber. Gesetzt wurden sie mit dem Working-Holiday-Maker-Reformpaket 2017, und für die meisten Jahre sind sie das letzte Wort.

Für ein kleines Feld von Fällen sind sie es nicht, und dort entscheidet der Wohnsitz. Er ändert außerdem Dinge abseits des Satzes: welche Abzüge offenstehen, wie Anlageeinkommen behandelt wird und ob Auslandseinkommen überhaupt in die Erklärung gehört.

## Warum lässt sich der Wohnsitz nicht nachschlagen?

Weil er keine Checkbox ist, sondern eine Beurteilung, über die sich sogar Gerichte gestritten haben. Der bekannteste Fall, Addy v Commissioner of Taxation, lief über Jahre und ging über die Instanzen nicht durchgehend in eine Richtung, bis der High Court ihn 2021 entschied. Wenn Richter sich bei denselben Fakten uneins sein können, klärt ein Nachmittag mit Google die Frage nicht.

Die Beurteilung hängt an Details, an die die meisten nie denken, und sie ist in beide Richtungen leicht falsch zu beantworten. Ein Ja, das ein Nein hätte sein müssen, erzeugt eine Schuld. Ein Nein, das ein Ja hätte sein müssen, lässt Geld beim ATO liegen. Beides fällt oft erst Jahre später auf, wenn ein Bescheid geändert wird.

## Welche Mythen halten sich am hartnäckigsten?

Zwei vor allem, und beide klingen vernünftig. Der erste: Das Visum entscheidet es. Tut es nicht, zwei Leute mit demselben Visum können verschieden veranlagt werden. Der zweite: Irgendeine einfache Faustregel entscheidet es. Auch darauf ist kein Verlass. Es ist eine Beurteilung deiner Umstände als Ganzes, und die muss ordentlich geprüft und nicht über eine Abkürzung ausgerechnet werden.

Beide Mythen überleben, weil sie einfach sind. Die tatsächliche Beurteilung ist es nicht, und genau deshalb ist der Wohnsitz der am häufigsten falsch beantwortete Punkt einer selbst eingereichten Erklärung.

## Können zwei gleiche Jahre verschieden ausgehen?

Ja, und das glaubt kaum jemand, bis er es sieht. Zwei Reisende mit nahezu identischen Jahren, ähnlichem Einkommen und ähnlichen Stationen können auf entgegengesetzten Seiten der Wohnsitzfrage landen, weil die Beurteilung am Gesamtbild hängt und nicht an einzelnen Eckdaten. Was bei dem einen den Ausschlag gibt, kann bei der anderen fehlen, ohne dass es von außen auffällt.

Deshalb ist jede Pauschalaussage über Backpacker und Wohnsitz mit Vorsicht zu lesen, auch die gut gemeinte aus dem Hostel-Gruppenchat. Sie beschreibt das Jahr einer anderen Person.

## Wie wird die Frage bei uns beantwortet?

Wir legen uns erst fest, nachdem wir dein Jahr durchgegangen sind. Die Beurteilung geschieht bei der Erstellung deiner [Steuererklärung](/de/tax-return), am ganzen Jahr statt an einer einzelnen Angabe, und wir nehmen die Position ein, die sich gegenüber dem ATO vertreten lässt. Jede Erklärung wird vor der Einreichung von einem registrierten Steueragenten geprüft und freigegeben.

Bis dahin rechnet der [Erstattungsrechner](/de/calculator) mit den gewöhnlichen Working-Holiday-Sätzen als Ausgangswert, und für eine erste Zahl ist das der richtige Ansatz. Auf der Withholding Declaration während des Jahres ist die vorsichtige Antwort fast immer die richtige, denn die Wohnsitzfrage wird beim Bescheid geklärt und nicht in der Lohnbuchhaltung.
`,
  },

  'what-is-a-tax-refund-australia': {
    title: 'Steuererstattung: wann steht sie dir zu?',
    description: 'Eine Steuerrückerstattung ist Geld, das das ATO zurückzahlt, wenn übers Jahr zu viel einbehalten wurde. Die meisten Backpacker bekommen etwas zurück.',
    body: `
Eine Steuererstattung ist die Differenz zwischen dem, was deine Arbeitgeber einbehalten haben, und dem, was du für das Jahr tatsächlich geschuldet hast. Den meisten Working Holiday Makern steht etwas zu, weil der Einbehalt Woche für Woche gegen Annahmen über ein volles Jahr gesetzt wird, zu denen ein Backpacker-Jahr selten passt.

## Warum wird bei einem Working-Holiday-Jahr so oft zu viel einbehalten?

Der Einbehalt ist eine laufende Schätzung und keine Berechnung. Die Lohnbuchhaltung zieht jede Woche so ab, als wiederhole sich diese Woche zwölf Monate lang. Ein Jahr, das spät beginnt, früh endet oder seine Form ändert, ergibt also eine Summe, die nicht zur echten Schuld passt, und ein Working-Holiday-Jahr tut alle drei Dinge.

- Ankunft oder Abreise mitten im Steuerjahr, das vom 1. Juli bis 30. Juni läuft
- Wochen, die gearbeitet wurden, bevor die TFN beim Arbeitgeber ankam, einbehalten mit 45 % statt 15 %
- Ein Arbeitgeber, der beim ATO nicht als Working-Holiday-Maker-Arbeitgeber registriert ist und zu Foreign-Resident-Sätzen einbehält
- Abzüge, die das zu versteuernde Einkommen senken und im laufenden Jahr nie berücksichtigt wurden
- Eine Medicare Levy von 2 %, berechnet an jemanden ohne Anspruch auf Medicare

## Woher weißt du, ob dir etwas zusteht?

Nicht, bevor das Jahr rekonstruiert ist, und keine Faustregel ersetzt das. Die Berechnung vergleicht die Steuer auf dein tatsächliches Einkommen mit dem, was über alle Arbeitgeber hinweg bereits einbehalten wurde, und ergänzt die Posten, die der Einbehalt nie sieht.

Es gibt keine durchschnittliche Erstattung, und wer eine nennt, beschreibt das Jahr einer anderen Person. Zwei Backpacker mit identischen Löhnen können tausende Dollar auseinanderliegen, allein wegen Wohnsitz, Medicare-Anspruch und einer 45-%-Phase, und keines davon steht auf den Payslips.

## Was entscheidet über die Höhe deiner Erstattung?

Fünf Fakten über dein eigenes Jahr entscheiden fast alles, und vier davon kennst du, ohne irgendwo nachzusehen. Der fünfte, dein Wohnsitz, muss ermittelt statt erinnert werden.

- **Ob es eine Phase ohne hinterlegte TFN gab.** Jede Woche mit 45 % statt 15 % sind 30 Cent pro Dollar, die beim ATO liegen und auf einen Antrag warten.
- **Ob jeder Arbeitgeber als Working-Holiday-Maker-Arbeitgeber registriert war.** Ein nicht registrierter behält zu Foreign-Resident-Sätzen ein, und der Überschuss ist zurückzuholen.
- **Wann du angekommen bist und wann du gegangen bist.** Ein Teiljahr ist die verlässlichste Quelle von Überabzug.
- **Deine Medicare-Position.** Der Anspruch auf Medicare lässt die Levy von 2 % greifen, ein Pass aus einem Land ohne Abkommen heißt also meist, dass sie gar nicht hätte berechnet werden dürfen.
- **Was du an Abzügen belegen kannst.** Sicherheitsschuhe, Werkzeug, Sonnenschutz, der berufliche Anteil eines Handys und die Steuerberatergebühr des Vorjahres.

## Wo hört es auf, Rechnen zu sein?

Beim Wohnsitz. Dort werden die größten Unterschiede entschieden und dort hilft kein Rechner. Der steuerliche Wohnsitz ist eine Beurteilung des ganzen Jahres und keine Angabe, die man abliest, und in seltenen Fällen ändert er die Sätze für alles Verdiente.

Deshalb liegen selbst eingereichte Erklärungen hier am häufigsten daneben, in beide Richtungen. Warum das so ist, steht in unserem Guide zum [steuerlichen Wohnsitz auf dem Working-Holiday-Visum](/de/blog/tax-residency-working-holiday-makers), und festgelegt wird die Position erst, nachdem dein ganzes Jahr durchgegangen wurde.

## Wann kommt die Erstattung an?

Erstattungen auf elektronisch eingereichte Erklärungen werden in der Regel 7 bis 14 Werktage nach der Abgabe auf ein benanntes australisches Bankkonto gezahlt. In der Spitze von Juli bis September dauert es ein paar Tage länger, und erheblich länger, wenn die Erklärung vor Abschluss der Income Statements eingereicht wurde.

Das Konto verdient Planung. Die Erstattung geht auf ein australisches Konto und sonst nirgendwohin, wer das Land verlässt, braucht es also noch mindestens vier bis sechs Wochen nach der Abgabe. Was eine Erstattung aufhält, steht in unserem Guide zu [wie lange eine Erstattung dauert](/de/blog/how-long-does-tax-refund-take-australia).

## Kannst du auch nach der Heimkehr noch beantragen?

Ja, und überraschend viele tun es nie. Eine Erklärung lässt sich aus dem Ausland für das Jahr der Abreise einreichen, und frühere Jahre lassen sich nachholen. In einem anderen Land zu sein schließt die Akte nicht.

Unbeansprucht bleiben fast immer die kurzen Jahre, in denen jemand drei Monate gearbeitet, den Betrag für zu klein gehalten hat und abgereist ist. Genau die haben den höchsten Anteil an Überabzug, denn ein Dreimonatsjahr, das wie ein Zwölfmonatsjahr besteuert wird, ist konstruktionsbedingt überbesteuert.

## Was ändert das Ergebnis wirklich?

Zwei Dinge, und keines davon ist Mühe. Erstens, ob jeder Arbeitgeber des Jahres erfasst ist, denn ein vergessener Job ist die häufigste Ursache einer späteren ATO-Berichtigung und ein häufiger Grund für eine zu niedrig ausgewiesene Erstattung. Zweitens, ob die Posten beantragt wurden, die der Einbehalt nicht sehen kann: Medicare-Position, Wohnsitz und Abzüge.

Das ist die ehrliche Antwort darauf, wie man eine Erstattung maximiert: nicht aggressive Ansätze, sondern ein vollständiges Bild eines Jahres über mehrere Arbeitgeber, mehrere Bundesstaaten und oft zwei Steuerjahre. Die Zahlen durch den [Rechner](/de/calculator) zu schicken gibt dir einen Anhaltspunkt, festgelegt wird es in der sauber vorbereiteten [Steuererklärung](/de/tax-return).
`,
  },

  'how-long-does-tax-refund-take-australia': {
    title: 'Wie lange dauert die Steuererstattung?',
    description: 'Elektronisch eingereichte Steuererklärungen bearbeitet das ATO meist in unter 14 Tagen. Was eine Rückerstattung verzögert und wie du sie verfolgst.',
    body: `
Die meisten australischen Steuererstattungen werden 7 bis 14 Werktage nach der elektronischen Abgabe ausgezahlt. In der Spitze von Juli bis September dauert es länger, weil das ATO dann den Großteil der Jahreserklärungen bearbeitet. Eine Abgabe auf Papier liegt in einer ganz anderen Größenordnung, bei acht Wochen oder mehr.

## Wie sieht ein normaler Erstattungsverlauf aus?

Eine saubere elektronisch eingereichte Erklärung ist meist binnen zwei Wochen durch. Das ATO beginnt binnen weniger Tage mit der Bearbeitung, die meisten Erstattungen werden zwischen Tag 7 und Tag 14 freigegeben, die langsameren zwischen Tag 14 und Tag 21.

Außerhalb der Spitze, von Oktober bis Juni, geht es oft schneller. Von Juli bis September braucht dieselbe Erklärung ein paar Tage länger, weil dann das halbe Land einreicht.

## Was entscheidet tatsächlich über dein Tempo?

Sechs Dinge verschieben ein Erstattungsdatum, und nur zwei lassen sich nach der Abgabe noch beeinflussen. Das größte ist, ob abgegeben wurde, bevor die Income Statements der Arbeitgeber abgeschlossen waren: Eine Erklärung auf unbestätigten Daten landet in einer Warteschlange statt im System.

- **Abgabeweg.** Elektronisch wird in Tagen gemessen, Papier in Monaten.
- **Status des Income Statements.** Arbeitgeber schließen ihre Meldung nach Jahresende ab, und vorher einzureichen lädt zu einer Abweichung ein.
- **Erstmalige Abgabe.** Eine anfängliche Identitätsprüfung kostet einmal Zeit und danach nie wieder.
- **Datenabweichungen.** Eine Zahl, die dem widerspricht, was das ATO bereits hat, schiebt die Erklärung in die manuelle Prüfung.
- **Bankdaten.** Eine falsche BSB oder Kontonummer ist der teuerste kleine Fehler überhaupt, weil die Zahlung zurückprallt und neu ausgestellt werden muss.
- **Jahreszeit.** Juli bis September ist für alle langsamer.

## Warum verursacht ein falsches Bankkonto so viel Ärger?

Eine Erstattung geht auf ein benanntes australisches Bankkonto und sonst nirgendwohin, und internationale Überweisungen macht das ATO nur ungern. Ist das Konto geschlossen oder sind die Ziffern falsch, prallt die Zahlung zurück und liegt als Guthaben auf deinem ATO-Konto.

Das ist die häufigste Ursache hinter der Frage, wo die Erstattung geblieben ist. Meist ist sie nirgendwo hin: ausgestellt, abgelehnt und wartend. Wer Australien verlässt, hält das australische Konto nach der Abgabe noch vier bis sechs Wochen offen.

## Was heißt es, wenn eine Erklärung under review steht?

Under review heißt, dass ein Mensch die Erklärung ansieht statt ein System, und das ist Routine. Die üblichen Auslöser: eine Antwort zum Wohnsitz, die nicht zum Rest der Erklärung passt, Einkommen, das das ATO sieht und die Erklärung nicht enthält, oder kurz vor der Abgabe geänderte Bankdaten.

Größere Erstattungen im Verhältnis zum gemeldeten Einkommen werden etwas häufiger ausgewählt, als Integritätsprüfung und nicht als Vorwurf. Das kostet Zeit, ändert das Ergebnis aber selten, wenn die Erklärung richtig war.

## Warum ist deine Erstattung nach zwei Wochen noch nicht da?

Zwei Wochen sind ein typischer Verlauf und keine Zusage. Die große Mehrheit der Erklärungen, die darüber hinausgehen, hängt an einem von drei Dingen: einem Income Statement, das bei der Abgabe nicht final war, einer Abweichung bei den Bankdaten oder einer Warteschlange zur manuellen Prüfung. Jedes klärt sich normalerweise in ein bis zwei weiteren Wochen.

Ab Tag 28 hält etwas Konkretes die Erklärung auf. Über den Kanal eines registrierten Steuerberaters ist der Bearbeitungsstatus direkt einsehbar, sodass sich feststellen lässt, wo es hängt, und die Klärung mit dem ATO lässt sich übernehmen.

## Ändert die Abreise aus Australien das Timing?

Aus dem Ausland einzureichen bremst die Erklärung selbst nicht. Es gelten dieselben 7 bis 14 Werktage, und Erklärungen für frühere Jahre lassen sich auch nach der Heimkehr einreichen. Anders ist nur das Ziel: Die Erstattung geht weiterhin auf ein australisches Konto.

Das ist die praktische Einschränkung bei der Abreiseplanung, zusammen mit unserem Guide zu [Steuern nach dem Verlassen Australiens](/de/blog/tax-obligations-after-leaving-australia). Erstattung und DASP-Superzahlung kommen beide erst nach der Abreise an, das Konto muss den Flug also überleben.

## Was entscheidet, ob deine Erstattung schnell oder langsam ist?

Vier Fakten über dein eigenes Jahr, alle vier vor der Abgabe festgelegt. Ob jeder Arbeitgeber sein Income Statement abgeschlossen hat, was in der Regel ab Mitte Juli der Fall ist. Ob die Erklärung zu dem passt, was das ATO bereits hat. Ob die Kontodaten aktuell sind. Und ob die Erklärung eine Position enthält, die zum genaueren Hinsehen einlädt, meist der Wohnsitz, ein großer Abzug oder eine Medicare-Levy-Befreiung.

Keines davon ist ein Grund, Anfang Juli zu hetzen. Eine Erklärung, die in der ersten Juliwoche gegen unfinalisierte Daten eingereicht wird, ist nicht schneller, sie ist als Erste in der Prüfschlange. Die [Steuererklärung](/de/tax-return), die schnell ankommt, ist die, die beim Absenden vollständig war. Wie hoch sie ausfallen dürfte, kannst du vorher in der [Steuererstattungsschätzung](/de/calculator) durchrechnen.
`,
  },

  'transferring-money-overseas-australia-tax': {
    title: 'Geld nach Hause überweisen: Steuer fällig?',
    description: 'Auf die Überweisung eigener Ersparnisse fällt keine Steuer an. Ab 10.000 Dollar meldet die Bank die Bewegung, das ist eine Meldung und keine Abgabe.',
    body: `
Nein. Eigenes Geld aus Australien herauszubewegen ist kein steuerlicher Vorgang. Löhne werden besteuert, wenn du sie verdienst, nicht wenn du sie ausgibst oder überweist, ein bereits versteuertes Guthaben kann das Land also frei verlassen. Überweisungen ab 10.000 $ werden an AUSTRAC gemeldet, und das ist Aufsicht, nicht Besteuerung.

## Warum wird eine Überweisung nicht besteuert?

Steuer hängt an Einkommen, und eine Überweisung ist kein Einkommen. Dollar auf ein Konto in deinem Namen zu Hause zu schicken, Währung zu tauschen oder mitgebrachte Ersparnisse zu bewegen, sind Bewegungen von Geld, das das Steuersystem bereits durchlaufen hat oder nie darin war.

Was das ATO besteuert, ist das, was du hier verdient hast: Löhne zu den Working-Holiday-Maker-Sätzen, Contracting-Einkommen unter einer [ABN](/de/abn), Trinkgeld, Zinsen auf einem australischen Konto und Barzahlungen, die steuerpflichtig sind, ob sie auf einem Payslip standen oder nicht. Sobald die [Steuererklärung](/de/tax-return) das geklärt hat, ist es deine Sache, was mit dem Rest passiert.

## Was wird tatsächlich gemeldet, wenn du Geld nach Hause schickst?

Es gibt zwei getrennte Meldepflichten, und keine erzeugt eine Steuerschuld. Banken und Transferdienste melden internationale Überweisungen an AUSTRAC, in der Regel ab 10.000 $, automatisch und ohne dein Zutun. Bargeld ab 10.000 $, das die Grenze überquert, muss bei der Australian Border Force angemeldet werden.

Beides sind Maßnahmen gegen Geldwäsche. Sichtbarkeit ist keine Besteuerung, und ehrliches Lohngeld reist problemlos. Straftat ist es, eine Überweisung absichtlich in kleinere Beträge zu stückeln, um unter der Meldeschwelle zu bleiben. Das heißt Structuring und wird ernster genommen als die Überweisung je gewesen wäre.

## Wirst du zu Hause noch einmal besteuert?

Das hängt an den Regeln deines eigenen Landes und nicht an Australiens. Die meisten Herkunftsländer haben ein Doppelbesteuerungsabkommen mit Australien, das in der Regel erlaubt, bereits gezahlte australische Steuer auf eine Schuld im Heimatland auf dasselbe Einkommen anzurechnen.

Die Behandlung schwankt stärker, als die meisten erwarten. Manche Länder behandeln ein Jahr australischer Working-Holiday-Einkünfte als gewöhnliches Auslandseinkommen und wollen es erklärt haben, andere lassen es weitgehend außer Betracht. Für diese Hälfte ist eine Steuerberatung in deinem eigenen Land die richtige Adresse.

## In welcher Reihenfolge solltest du vor dem Rückflug vorgehen?

Die Reihenfolge zählt mehr als die steuerliche Behandlung, denn zwei Zahlungen kommen erst nach deiner Abreise an. Steuererstattung und DASP-Superzahlung gehen Wochen oder Monate nach der Abgabe auf ein benanntes Konto, das also noch existieren muss, wenn sie landen.

1. Die australische [Steuererklärung](/de/tax-return) für dein letztes Jahr einreichen
2. Die [Superannuation](/de/superannuation) über DASP beantragen
3. Eine registrierte ABN abmelden
4. Warten, bis Erstattung und Superzahlung angekommen sind
5. Das Guthaben nach Hause überweisen
6. Das australische Konto zuletzt schließen

Das Bankkonto zu früh zu schließen ist der häufigste und teuerste Fehler, den wir bei abreisenden Kunden sehen. Das Geld ist nicht verloren, aber es zurückzuholen heißt, Zahlungsdaten beim ATO oder einem Superfonds aus dem Ausland neu zu hinterlegen, und das macht aus zwei Wochen Wartezeit mehrere Monate.

## Was entscheidet, wie viel am anderen Ende ankommt?

Nicht die Steuer, sondern Wechselkurs und Gebührenstruktur, und beide werden oft so dargestellt, dass das schlechtere Angebot günstiger aussieht. Eine Bank, die eine niedrige Pauschalgebühr nennt, baut häufig eine breitere Marge in den Kurs selbst ein, bei einer vierstelligen Summe ist die genannte Gebühr also die kleinere Hälfte dessen, was du zahlst.

Vergleiche über den Betrag, der auf deinem Konto zu Hause ankommt, nicht über die Gebühr. Das ist die einzige Zahl, die etwas bedeutet.

## Ändert Geld etwas, das du nach Australien mitgebracht hast?

Nein. Ersparnisse, mit denen du angekommen bist, gehören dir, sie einzuführen war kein Einkommen, und sie wieder auszuführen ist ebenfalls kein steuerlicher Vorgang. Das australische System schaut immer nur auf das, was du hier verdient hast.

Praktisch wird das, wenn du eine größere Summe eingeführt hast und sie zurückschicken willst. Die Überweisung wird an den üblichen Schwellen gemeldet und es gibt nichts zu rechtfertigen, aber den ursprünglichen Kontoauszug aufzuheben kostet zwei Minuten.

## Was bindet dich noch an Australien, wenn das Geld weg ist?

Deine Mittel nach Hause zu bewegen klärt gegenüber dem ATO gar nichts. Die Pflicht, für dein letztes australisches Steuerjahr einzureichen, besteht unabhängig davon, wo das Geld liegt, und sie läuft bis zum 31. Oktober nach Jahresende, ob du noch im Land bist oder nicht. Was nach der Abreise offen bleibt, steht in unserem Guide zu [Steuern nach dem Verlassen Australiens](/de/blog/tax-obligations-after-leaving-australia).

Ein Jahr, das mitten drin endet, im Dezember oder Februar, ist ein Jahr, in dem gegenüber dem tatsächlich verdienten Einkommen zu viel einbehalten wurde, und diese Überzahlung kommt nur zurück, wenn jemand sie beansprucht. Du kannst sie vorab im [Rechner](/de/calculator) abschätzen.
`,
  },

  'low-income-tax-offset-working-holiday': {
    title: 'Low Income Tax Offset: gilt er für dich?',
    description: 'Der Low Income Tax Offset senkt die Steuer bei niedrigem Einkommen um bis zu 700 $. Wer Anspruch hat, wie er berechnet wird und was für dich gilt.',
    body: `
Der Low Income Tax Offset ist bis zu 700 $ wert und steht australischen Steuerresidenten zu. Auf Einkommen, das zu Working-Holiday-Maker-Sätzen besteuert wird, gibt es ihn nicht. Ob überhaupt etwas davon bei dir ankommt, hängt vollständig an deinem Wohnsitz für das Jahr, und der ist eine Frage der Tatsachen und nicht des Visums.

## Was ist ein Offset, und warum ist er mehr wert als ein Abzug?

Ein Offset senkt die Steuer, die du schuldest. Ein Abzug senkt das Einkommen, auf das die Steuer berechnet wird. Derselbe Dollarbetrag führt damit zu sehr unterschiedlichen Ergebnissen.

- Ein Abzug von 700 $ gegen Einkommen, das mit 15 % besteuert wird, spart dir 105 $
- Ein Offset von 700 $ senkt deine Steuerrechnung um die vollen 700 $

LITO ist bis zu 700 $ wert bei einem zu versteuernden Einkommen bis 37.500 $, läuft zwischen 37.500 $ und 66.667 $ schrittweise aus und verschwindet darüber ganz. Er ist außerdem nicht erstattungsfähig, kann die Steuer also auf null senken, wird aber von sich aus nie zu einer Auszahlung.

## Warum können die meisten Working Holiday Maker ihn nicht beantragen?

Weil LITO eine Vergünstigung für Residenten ist und Working-Holiday-Maker-Einkommen nach einem eigenen Schema besteuert wird. Wer ab dem ersten Dollar mit 15 % besteuert wird, wird auf dieses Einkommen nicht als Resident besteuert, und der Offset hängt sich daran nicht an.

Für die meisten, die das hier lesen, ist LITO nicht verfügbar, und keine Sorgfalt bei der Abgabe ändert daran etwas.

## Wann wird er verfügbar?

Wenn du für das Jahr australischer Steuerresident bist, und das ist tatsächlich eine Minderheit der Working Holiday Maker. Der Wohnsitz ist ein echter Befund und keine Formalie: Er lässt sich nicht am Visum ablesen, hängt an deinen persönlichen Umständen und muss ordentlich geprüft werden.

Was ein festgestellter Wohnsitz wert ist, fällt von Person zu Person verschieden aus. Für manche Residenten ist das wertvollere Ergebnis nicht LITO, sondern eine insgesamt günstigere Veranlagung des Jahres, für andere sind es die bis zu 700 $. Aus einer Tabelle lässt sich das nicht ablesen. Warum die Frage schwerer ist, als sie aussieht, steht in unserem Guide zum [steuerlichen Wohnsitz](/de/blog/tax-residency-working-holiday-makers).

## Was kannst du stattdessen geltend machen?

Die Entlastung, die Working Holiday Maker tatsächlich erreicht, kommt über Befreiungen und Werbungskosten, nicht über das Offset-System für Residenten. Zusammengenommen sind diese Posten deutlich mehr wert, als LITO es gewesen wäre.

- Die [Medicare-Levy-Befreiung](/de/blog/medicare-levy-working-holiday-makers), rund 500 $ wert bei 25.000 $ Verdienst für jemanden ohne Medicare-Anspruch
- Der [Small Business Income Tax Offset](/de/blog/small-business-tax-offset-working-holiday-abn) auf ABN-Sole-Trader-Einkommen, bis zu 1.000 $ wert
- Die Rückholung jeder Phase, die mit 45 % einbehalten wurde, bevor deine TFN beim Arbeitgeber ankam
- Berufsbezogene Werbungskosten, die auf einer Working-Holiday-Erklärung anteilig mehr wert sind als auf einer Residenten-Erklärung

LITO hinterherzujagen ist für die meisten verlorene Mühe. Dieselbe Aufmerksamkeit zahlt sich bei der Medicare-Lage und einer vollständigen Werbungskostenliste aus.

## Was passiert, wenn ein Offset deine Steuer übersteigt?

Es wird nichts ausgezahlt. LITO ist nicht erstattungsfähig: Liegt deine Schuld bei 500 $ und der Offset bei 700 $, wird die Steuer null und die verbleibenden 200 $ verfallen.

Deshalb werden Offsets und Erstattungen ständig verwechselt. Deine Erstattung kommt aus der Steuer, die im Laufe des Jahres von deinem Lohn einbehalten wurde, und nicht aus dem Offset. Der Offset senkt die Endschuld, und eine kleinere Endschuld lässt mehr von der einbehaltenen Steuer zurückkommen.

## Können mehrere Offsets auf dieselbe Erklärung wirken?

Ja, getrennt berechnet und dann gegen die gesamte zahlbare Steuer angewendet. Ein Jahr mit Lohn und ABN-Einkommen kann den Small Business Offset auf den Geschäftsanteil tragen, während die Medicare-Lage getrennt behandelt wird.

Bei dieser Kombination wird eine Erklärung zur Rechnung statt zum Formular, besonders wenn sich der Wohnsitz mitten im Jahr geändert hat. Bei einem Teiljahresresidenten liegt ein Teil des Jahres unter dem einen Regelwerk und ein Teil unter dem anderen, und die Offsets folgen den Zeiträumen.

## Was entscheidet deine Position?

Dein Wohnsitz für das Jahr, und der ist keine Tatsache, die du einfach nennen kannst, sondern eine Beurteilung. Sie hängt an Umständen, an die die meisten nie denken, und kann bei fast gleichen Jahren verschieden ausgehen.

Das ist kein Kästchen, das man beim ersten Lesen zuversichtlich ankreuzt. Der Wohnsitz ist der Posten, der auf einer selbst eingereichten Erklärung am häufigsten falsch beantwortet wird, und er bewegt mehr Geld als sämtliche Offsets in diesem Guide zusammen. Wir legen uns erst fest, nachdem wir dein Jahr durchgegangen sind, bei der Vorbereitung der [Steuererklärung](/de/tax-return).
`,
  },

  // Super
  'how-much-super-should-employer-pay': {
    title: 'Wie viel Super zahlt dein Arbeitgeber ein?',
    description: 'Dein Arbeitgeber zahlt 12 % deines gewöhnlichen Verdienstes zusätzlich in einen Superfonds, mindestens quartalsweise. Woran du siehst, ob der Betrag angekommen ist, und was gilt, wenn nicht.',
    body: `
Zwölf Prozent deiner regulären Arbeitseinkünfte, mindestens quartalsweise in einen Superfonds gezahlt, zusätzlich zu deinem Lohn und nicht daraus abgezogen. So ist der Satz seit dem 1. Juli 2025, und es ist die letzte gesetzlich vorgesehene Stufe. Bei 8.000 $ Verdienst im Quartal sollten 960 $ erscheinen.

## Was zählt als Ordinary Time Earnings?

Ordinary Time Earnings sind eine engere Bemessungsgrundlage als der Bruttolohn, und in dieser Differenz sitzt die leise Unterzahlung. Erfasst sind dein regulärer Lohn für reguläre Stunden, die meisten Zulagen, Provisionen, Boni, Loadings und in den meisten Fällen das Urlaubsgeld.

Nicht erfasst sind Überstundenzahlungen, erstattete Auslagen und echte Abfindungen. In Standardschichten spielt die Unterscheidung selten eine Rolle, weil fast alles Verdiente Ordinary Time Earnings sind. Sie zählt in Gastronomie und auf Farmen, wo Zuschläge, Loadings und Überstunden auf einem Payslip ineinanderlaufen und das Lohnsystem Super allein auf die Basisstunden rechnet.

## Wann sollte das Geld tatsächlich auftauchen?

Quartalsweise, und das ist die Tatsache, die den meisten Fehlalarm auslöst. Arbeitgeber müssen bis zum 28. Oktober, 28. Januar, 28. April und 28. Juli für das jeweils vorangegangene Quartal zahlen, Arbeit aus dem Juli erscheint in deinem Fonds also möglicherweise erst Ende Oktober.

Für Abreisende hat das eine teure Folge. Fliegst du im Mai nach Hause, sind die Beiträge deines letzten Quartals erst am 28. Juli fällig, und ein im Juni gestellter Superantrag enthält sie nicht. Das ist einer der häufigsten Gründe, warum eine Auszahlung bei der Abreise zu niedrig ausfällt.

## Wie prüfst du, ob gezahlt wurde?

Du vergleichst zwei Aufzeichnungen. Dein Payslip sollte die für die Periode aufgelaufene Super als eigene Zeile zeigen, und das Konto deines Fonds sollte den ankommenden Beitrag zeigen. Teilst du die Superzahl durch deine Ordinary Time Earnings der Periode, sollte 0,12 herauskommen.

Kommt 0,115 oder 0,11 heraus, wendet der Arbeitgeber einen überholten Satz an. Das ist eine echte und rückholbare Unterzahlung, kein Rundungsproblem. Die Satzhistorie zählt, wenn deine Arbeit über die Änderungen reicht: 11 % in 2023-24, 11,5 % in 2024-25 und 12 % ab 2025-26, und jeder Satz gilt für den Zeitraum, in dem die Bezüge aufgelaufen sind.

## In welchen Fonds ging deine Super, und warum zählt das?

Wegen der Stapling-Regel von November 2021 höchstwahrscheinlich in den Standardfonds deines ersten australischen Arbeitgebers. Nach Stapling muss ein neuer Arbeitgeber prüfen, ob du bereits einen Fonds hast, und in diesen einzahlen, statt dich in seinen eigenen zu stecken.

Für einen Australier, der als Teenager zu arbeiten begann, funktioniert das wie beabsichtigt. Für einen Working Holiday Maker nur halb.

- Bei der Ankunft hast du keinen australischen Fonds, der Standardfonds deines ersten Arbeitgebers wird also eher zufällig als gewählt zu deinem Fonds.
- Backpacker wechseln schnell die Arbeitgeber, und der Stapling-Eintrag aktualisiert sich nicht immer rechtzeitig, Arbeitgeber zwei und drei stecken dich also womöglich in ihre eigenen Fonds.
- Kleine Guthaben, die als unclaimed an das ATO übertragen werden, reißen die Kette ganz ab.

Ein typischer Working Holiday Maker landet also bei zwei oder drei Konten, jedes mit eigener Verwaltungsgebühr und oft eigener Versicherungsprämie gegen ein Guthaben von wenigen tausend Dollar. Dagegen hilft, bei jedem Job denselben Fonds auf dem Standardwahlformular zu nennen, statt das Feld leer zu lassen. Bereits getrennte Guthaben werden nicht rückwirkend zusammengeführt, und die [Zusammenlegung von Super über mehrere Fonds](/de/blog/super-multiple-funds-consolidation) ist eine eigene Aufgabe vor der Abreise.

## Was, wenn die Super ganz fehlt?

Fang schriftlich bei der Lohnbuchhaltung an, denn ein echter Verwaltungsfehler ist häufiger als vorsätzliche Nichtzahlung und in einer Woche behoben. Nenne die Lohnperioden, die Ordinary Time Earnings und die Fondsdaten und frage, was wann überwiesen wurde.

Löst sich das nicht, ist nicht gezahlte Super über das Verfahren zum Superannuation Guarantee Charge rückholbar, ein förmlicher Vollstreckungsmechanismus und keine Beschwerde, auch lange nach Ende der Arbeit und nach deiner Ausreise. Es braucht Belege: Payslips mit der Superzeile, Fondsauszüge über das Angekommene, Beschäftigungsdaten und Stunden, Lohnsätze und Bruttoverdienste sowie Name und ABN des Arbeitgebers. Siehe [was tun, wenn ein Arbeitgeber keine Super zahlt](/de/blog/super-employer-not-paying-what-to-do).

Bar bezahlte Arbeit ist die Stelle, an der das am häufigsten scheitert, weil es keine Payslip-Spur und oft überhaupt keinen Fonds gibt. Die Pflicht ist dieselbe, unabhängig davon, wie der Lohn gezahlt wurde.

## Liegt es an der Bemessungsgrundlage oder am Zeitpunkt?

Zwölf Prozent sind der Satz für alle, eine Unterzahlung liegt also meist an der Bemessungsgrundlage oder am Zeitpunkt, nicht am Prozentsatz. Diese Tatsachen entscheiden deinen Fall.

- Ob deine Bezüge Überstunden enthalten, die außerhalb der Ordinary Time Earnings liegen und zu Recht keine Super auslösen.
- Welches Quartal du prüfst, denn Beiträge sind bis zu vier Monate nach der Arbeit fällig.
- Wann du abreist, denn das letzte Quartal ist an deinem Abreisetag meist noch nicht gezahlt.
- Wie viele Arbeitgeber du hattest, denn so viele Fonds und so viele getrennte Ansprüche hast du wahrscheinlich.
- Ob dich ein Arbeitgeber bar ohne Payslip bezahlt hat, denn dort existiert Super am häufigsten schlicht nicht.
- In welches Steuerjahr die Arbeit fällt, denn der Satz stieg über 11 %, 11,5 % und 12 %.

Alles Eingezahlte ist abrufbar, wenn du nach der Ausreise deine [Superannuation auszahlen lässt](/de/superannuation), wobei bei Working-Holiday-Maker-Guthaben vor der Auszahlung 65 % einbehalten werden.
`,
  },

  'how-long-does-dasp-take': {
    title: 'Wie lange dauert deine DASP-Auszahlung?',
    description: 'Vollständige DASP-Anträge werden meist innerhalb von 28 Tagen ausgezahlt. Was Verzögerungen verursacht und wie du sie vermeidest.',
    body: `
Etwa 28 Tage bei einem vollständigen Antrag. Das ist die realistische Erwartung, sobald der Fonds alles hat, was er braucht, und die internationale Überweisung kommt oben drauf. Anträge, die länger laufen, haben fast immer eine konkrete, benennbare Ursache und kein Warteschlangenproblem.

## Was muss passieren, bevor das Geld sich bewegt?

Drei Stellen prüfen drei verschiedene Dinge, und der Antrag wartet auf die langsamste. Das ATO bestätigt, dass dein Visum beendet ist und du ausgereist bist. Dein Fonds bestätigt, dass die antragstellende Person die ist, der das Konto gehört. Dann berechnet der Fonds die Zahlung, wendet die 65 % Quellensteuer für Super von Working Holiday Makern an und gibt den Nettobetrag frei.

Die 28 Tage sind die Seite des Fonds, und dort sitzt fast die gesamte Verzögerung. Die Daten des ATO klären sich meist in Tagen statt Wochen. Langsam ist der Identitätsabgleich, aus nachvollziehbarem Grund: Superfonds geben Geld dauerhaft ins Ausland frei, an jemanden, den sie nicht sehen können.

## Was lässt einen DASP tatsächlich länger dauern?

Jeder verlängerte Antrag fällt in eine kleine Zahl von Kategorien, und keine heißt, dass der Fonds viel zu tun hat. Jede hat eine andere Ursache und Lösung, die Zuordnung ist also der größte Teil der Arbeit.

**Dein Visum oder deine Ausreise ist noch nicht erfasst.** Wer wenige Tage nach Ende des Visums oder wenige Tage nach dem Abflug einreicht, trifft auf einen noch nicht aktualisierten Datensatz des Department of Home Affairs. Ausreisedaten werden typischerweise binnen 7 bis 14 Tagen nach dem Abflug erfasst. Beschleunigen lässt sich das nicht.

**Dein Name stimmt nicht überein.** Der mit Abstand häufigste Fall, und fast nie dein Fehler. Arbeitgeber richten Superkonten ein, indem sie einen Namen im Tempo vom Pass abtippen, und ein fehlender zweiter Vorname, vertauschte Vor- und Nachnamen oder ein verlorener Umlaut reichen, um den Abgleich zu stoppen.

**Dein Geburtsdatum wurde falsch erfasst**, vom selben Arbeitgeber, in derselben Eile.

**Du hast bei einem Fonds beantragt, der nichts hält.** Working Holiday Maker mit vier Arbeitgebern haben regelmäßig Super in Fonds, von denen sie nie gehört haben, und ein Antrag beim erinnerten Fonds bringt nichts.

**Deine beglaubigten Dokumente wurden nicht akzeptiert.** Fonds unterscheiden sich darin, wer als zugelassener Beglaubiger gilt, und eine Beglaubigung, die nach der Abreise in Deutschland eingeholt wurde, scheitert hier am häufigsten.

## Ändern mehrere Superfonds das Timing?

Ja, und dafür lohnt sich Planung. Jeder Fonds ist ein eigener Antrag mit eigenem Zeitverlauf, und sie werden unterschiedlich schnell fertig. Wer in einem Jahr vier Arbeitgeber hatte, hat üblicherweise drei oder vier Konten, und die praktische Antwort lautet vier bis sechs Wochen von der ersten Einreichung bis zur letzten Zahlung.

Super, der bereits als unclaimed ans ATO übertragen wurde, folgt einem anderen und meist schnelleren Weg, weil der Prüfschritt beim Fonds entfällt. Das betrifft Konten, zu denen der Fonds den Kontakt verloren hat, häufig bei allen, die vor mehr als sechs Monaten ohne Adressänderung abgereist sind.

## Wie lange braucht das Geld nach der Freigabe?

Freigabe und Ankunft sind zwei verschiedene Daten. Ein australisches Bankkonto sieht das Geld meist binnen ein bis zwei Werktagen. Eine große Bank in Deutschland, Großbritannien oder Japan braucht üblicherweise zwei bis fünf Werktage nach der Freigabe. Kleinere Institute und Regionalbanken können bis zu zehn brauchen.

Die Währungsumrechnung ist ein eigener Schritt und eine Entscheidung vor der Antragstellung, denn die Empfängerdaten sind Teil des Antrags.

## Warum dauert dein Antrag länger als 28 Tage?

28 Tage sind die Erwartung für einen vollständigen Antrag. Die meisten, die länger laufen, sind unvollständig, ohne dass der Antragsteller es wusste.

- Ob dein Visum tatsächlich beendet und deine Ausreise erfasst ist. Zu früh einzureichen ist die häufigste selbstverschuldete Verzögerung.
- Ob dein Name in den Fondsdaten exakt zum Pass passt, samt zweiten Vornamen und Umlauten.
- Wie viele Arbeitgeber du hattest, was zugleich sagt, wie viele Fonds du vermutlich hast.
- Ob ein Teil deines Supers bereits als unclaimed ans ATO übertragen wurde, was den Weg ändert und meist verkürzt.
- Auf welche Bank und in welcher Währung ausgezahlt wird.
- Ob auch deine Steuererklärung für das letzte Jahr noch offen ist, denn beides wird am besten zusammen erledigt.

Die vollständige Berechtigung und die Quellensteuer stehen dort, wo du deine [Superannuation nach der Abreise auszahlen lässt](/de/superannuation), und eine [Steuererklärung](/de/tax-return) für das letzte Jahr ist ein eigener Anspruch auf eigenes Geld. Du kannst deine [Steuererstattung schätzen](/de/calculator), bevor du beides einreichst.
`,
  },

  // Medicare
  'countries-with-medicare-agreement-australia': {
    title: 'Welche Länder haben ein Medicareabkommen?',
    description: '11 Länder haben ein Sozialversicherungsabkommen (RHCA) mit Australien, Deutschland nicht. Welche Dokumente du brauchst.',
    body: `
Elf. Australien hat Reciprocal Health Care Agreements mit Großbritannien, der Republik Irland, Neuseeland, Schweden, den Niederlanden, Finnland, Norwegen, Belgien, Slowenien, Malta und Italien. Staatsangehörige dieser Länder mit gültigem Working-Holiday-Visum haben Zugang zu begrenzten [Medicare](/de/medicare)-Leistungen. Staatsangehörige aller anderen Länder nicht.

## Welche Länder stehen auf der Liste, und welche nicht?

Die elf Abkommensländer sind Großbritannien, die Republik Irland, Neuseeland, Schweden, die Niederlande, Finnland, Norwegen, Belgien, Slowenien, Malta und Italien. Das ist die vollständige Liste, und sie folgt keiner regionalen Logik.

Nicht auf der Liste, aber häufig dafür gehalten: Deutschland, Frankreich, Spanien, Kanada, die USA, Japan, Südkorea, Taiwan und Hongkong. Deutschland und Japan zählen praktisch am meisten, weil ihre großen Working-Holiday-Gruppen oft eine europäische oder allgemeine Gegenseitigkeit unterstellen, die es nicht gibt.

## Was deckt der Schutz tatsächlich ab?

Medizinisch notwendige Behandlung als öffentlicher Patient, also ein Zustand, der während deines Aufenthalts auftritt und nicht bis zur Heimreise warten kann. Das bringt dir einen Hausarztbesuch zum bezuschussten Satz, Behandlung im öffentlichen Krankenhaus als Kassenpatient und Rezepte zum bezuschussten Satz unter dem Pharmaceutical Benefits Scheme.

Es ist ein Sicherheitsnetz und keine Krankenversicherung. Die Ausschlüsse überraschen.

- Krankentransport, in den meisten Bundesstaaten getrennt abgerechnet und für eine einzige Fahrt im dreistelligen Bereich
- Zahnbehandlung jeder Art
- Optiker, Brillen und Physiotherapie
- Die meisten Facharzttermine
- Behandlung in Privatkliniken
- Wahl- und Schönheitseingriffe
- Vorerkrankungen, in den meisten Fällen

Die Krankenwagenlücke überrascht britische und irische Reisende am meisten, weil es sie zu Hause nicht gibt. Eine einzige Fahrt nach einem Sturz auf einer Farm bei Bundaberg ist eine Rechnung, Abkommen hin oder her.

## Wie meldest du dich an?

Persönlich in einem Service Centre von Services Australia, mit Pass, dem Nachweis deiner Visumserteilung und einem Nachweis der Staatsangehörigkeit des Abkommenslandes, falls der Pass das nicht zeigt. Du bekommst eine Medicare-Karte, gültig für den berechtigenden Zeitraum deines Visums.

Die Anmeldung lohnt sich, wenn du berechtigt bist: Die Karte macht einen Bulk-Billing-Hausarzt am Tresen kostenlos statt zu einem Termin für hundert Dollar. Eine Versicherung ersetzt sie nicht.

## Was macht ein Abkommen mit deiner Steuer?

Die Medicare Levy von 2 % gilt für Personen mit Anspruch auf Medicare, und den Anspruch schafft ein Abkommen. Ein Abkommenspass nimmt dir also in der Regel die Möglichkeit, die Levy-Befreiung zu beantragen, ganz gleich, ob du dich je registriert oder je einen Arzt gesehen hast.

Für deutsche und japanische Reisende ohne Abkommen ist die [Levy-Befreiung](/de/blog/medicare-levy-working-holiday-makers) üblicherweise verfügbar und bei 25.000 $ Verdienst rund 500 $ wert. Für britische und irische Reisende gilt die Levy meist schlicht. Gleiches Einkommen, gleiches Visum, anderer Pass, anderer Bescheid.

## Mehr als nur dein Pass entscheidet hier.

Die Elferliste steht fest, aber was sie für dich bedeutet, hängt an mehr als am Pass in deiner Tasche.

- Dein Pass, der der gesamte Test für den Gesundheitsschutz ist und der größte Teil des Tests für die Levy.
- Doppelte Staatsangehörigkeit, die die Antwort kippen kann und die du ansprechen solltest, statt anzunehmen, der Visumspass entscheide.
- Ob und wann du dich angemeldet hast. Eine Anmeldung mitten im Jahr kann eine anteilige Levy-Befreiung für die Tage davor ergeben.
- In welchem Bundesstaat du bist, denn Krankentransport ist Ländersache und überall die größte Lücke im reziproken Schutz.
- Ob du eine Vorerkrankung hast, die auch für die elf in der Regel außerhalb des Abkommens liegt. Für Deutsche gilt ohnehin: Eine [eigene Krankenversicherung](/de/blog/german-european-health-insurance-australia-working-holiday) ist Pflicht, und die Levy-Befreiung ist der eine Vorteil der Nichtabdeckung.

Die Levy-Position wird mit deiner [Steuererklärung als Working Holiday Maker](/de/tax-return) festgelegt, und was die 2 % in beide Richtungen bedeuten, zeigt dir der [Erstattungsrechner](/de/calculator).
`,
  },

  'tax-file-number-declaration-form': {
    title: 'TFN Declaration: so füllst du sie korrekt',
    description: 'Mit diesem Formular meldest du deinem Arbeitgeber deine TFN. Als Working Holiday Maker kreuzt du den Freibetrag nicht an, sonst entsteht eine Steuerschuld.',
    body: `
Das Tax File Number Declaration ist das Formular, das du einem neuen Arbeitgeber gibst, damit er zum richtigen Satz einbehalten kann. Drei Antworten darauf setzen deine Steuer: ob du steuerlich australischer Resident bist, ob du Working Holiday Maker bist und ob du den Freibetrag beanspruchst. Alles Übrige darauf ist Identifikation.

## Warum entscheidet dieses Formular mehr als die TFN selbst?

Weil die Lohnbuchhaltung des Arbeitgebers das Formular liest und nicht deine Absichten. Ohne hinterlegtes Declaration gilt standardmäßig ein Einbehalt von 45 %, bei einer 1.000-$-Woche also 300 $ statt 150 $. Die korrekte Working-Holiday-Maker-Behandlung sind 15 % auf die ersten 45.000 $, und nur das Formular löst sie aus.

Das Geld wird also beim Declaration entschieden, nicht beim TFN-Antrag. Die Nummer selbst ist kostenlos. Das Formular ändert deinen Payslip, und es wird dir an deinem ersten Tag in die Hand gedrückt, meist genau dann, wenn du am wenigsten darüber nachdenken kannst.

## Was bewirken die drei Antworten?

Jede verschiebt den Satz an eine andere Stelle, und zwei der drei falschen Kombinationen erzeugen eine Schuld statt einer Verzögerung.

- Working Holiday Maker, mit Ja beantwortet, erzeugt den 15-%-Satz. Das ist die Antwort für einen Inhaber eines 417- oder 462-Visums.
- Foreign Resident, stattdessen gewählt, erzeugt 30 % Einbehalt ab dem ersten Dollar. Ein Überabzug, bei der Veranlagung rückholbar.
- Australian Resident mit beanspruchtem Freibetrag erzeugt über das Jahr zu wenig Einbehalt, und die Differenz wird bei der Veranlagung zum Zahlbetrag.

Die letzte ist der teure Fehler, weil sie sich in jeder Lohnzahlung wie mehr Geld anfühlt und Monate später als Rechnung ankommt. Warum der Freibetrag nicht neben Working-Holiday-Maker-Sätzen steht, erklärt unser Guide zum [Freibetrag und dem Working-Holiday-Visum](/de/blog/tax-free-threshold-working-holiday-visa).

## Was, wenn deine TFN noch nicht da ist?

Du kannst das Declaration trotzdem ausfüllen, und darum geht es beim 28-Tage-Fenster. Ein festgehaltener laufender Antrag samt Referenznummer hält dich durch dieses Fenster auf dem Working-Holiday-Satz, statt am ersten Tag bei 45 % zu beginnen.

Sagst du nichts, gilt der höhere Satz sofort, und jede Woche bei 45 % ist Lohn, der beim ATO liegt, bis die Erklärung eingereicht ist. Was du dem Arbeitgeber in der Zwischenzeit gibst, steht in unserem Guide zum [Arbeiten, bevor die TFN ankommt](/de/blog/tfn-reference-number-before-tfn-arrives).

## Deckt ein Formular jeden Job ab?

Nein. Jeder Arbeitgeber braucht sein eigenes Declaration, auch kurze Casual-Rollen und ein zweiwöchiger Erntejob. Eine TFN, die einer Lohnbuchhaltung gegeben wurde, wird nicht weitergereicht, und ein früherer Arbeitgeber, der dein Formular hält, nützt dem neuen nichts.

Das ist der mechanische Grund, warum Jahre mit mehreren Arbeitgebern so oft schiefgehen. Vier Jobs bedeuten vier Declarations, und das nie ausgefüllte ist meist genau das, das mit 45 % einbehält, und zugleich das, dessen Einkommen bei der Abgabe vergessen wird.

## Was fragt die Wohnsitzfrage auf dem Formular eigentlich?

Dieselbe Frage, die später über deine Erstattung entscheidet, gestellt zum denkbar schlechtesten Zeitpunkt. Der steuerliche Wohnsitz ist nicht der aufenthaltsrechtliche. Er hängt an deinen persönlichen Umständen, muss ordentlich geprüft werden und ist selten so eindeutig, wie das Formular es aussehen lässt.

Für die meisten Working Holiday Maker ist die Working-Holiday-Maker-Antwort die richtige und das Wohnsitzfeld unkompliziert. Bei einem längeren Aufenthalt ist die Frage in beide Richtungen leicht falsch zu beantworten. Warum sie so schwer zu greifen ist, steht in unserem Guide zum [steuerlichen Wohnsitz für Working Holiday Maker](/de/blog/tax-residency-working-holiday-makers).

## Was, wenn es falsch ausgefüllt wurde?

Reiche beim Arbeitgeber ein korrigiertes Declaration ein. Die Lohnbuchhaltung aktualisiert ab diesem Zeitpunkt und nicht rückwirkend, die Korrektur repariert also künftige Zahlungen, und die frühere Differenz wird über die Erklärung geregelt.

Wo zu viel einbehalten wurde, kommt das als Teil der Erstattung zurück. Wo zu wenig einbehalten wurde, weil der Freibetrag beansprucht wurde, ist die Differenz zahlbar, und das im Juli statt im Oktober zu erfahren gibt Zeit, es einzuplanen. Prüfe nach jeder Korrektur den nächsten Payslip.

## Was hast du beim Unterschreiben festgelegt?

Das Formular ist kurz. Was es dich kostet, hängt an deinen Umständen in dem Moment, in dem du es unterschrieben hast.

- Ob das Working-Holiday-Maker-Kästchen gesetzt war, denn das ist das eine Feld, das den 15-%-Satz erzeugt.
- Ob der Freibetrag beansprucht wurde, denn das ist der Fehler, der eine Schuld statt einer Erstattung aufbaut.
- Ob deine TFN angekommen war und ob ein laufender Antrag mit Referenznummer festgehalten wurde.
- Wie vielen Arbeitgebern du ein Declaration gegeben hast, denn jedes zählt für sich.
- Ob der Arbeitgeber beim ATO als Working-Holiday-Maker-Arbeitgeber registriert ist, denn ein nicht registrierter behält unabhängig von deinem Formular zu Foreign-Resident-Sätzen ein.
- Ob dein Wohnsitz wirklich so einfach ist, wie das Formular unterstellt.

Jeder Überabzug wird in der [Working-Holiday-Steuererklärung](/de/tax-return) abgerechnet, und was ein falsch ausgefülltes Formular gekostet hat, macht der [Erstattungsrechner](/de/calculator) sichtbar.
`,
  },

  'what-does-tax-withheld-mean-payslip': {
    title: 'Tax Withheld auf dem Payslip: stimmen 15 %?',
    description: 'Auf den ersten 45.000 $ sollten 15 % einbehalten werden. So liest du deinen Payslip, erkennst zu hohe Abzüge und holst dir die Steuern zurück.',
    body: `
Tax withheld ist die Einkommensteuer, die dein Arbeitgeber aus deinem Bruttolohn ans ATO abführt, bevor der Rest auf dein Konto geht. Auf einem Working-Holiday-Visum sollten das rund 15 % des Bruttoverdienstes bis 45.000 $ sein. Teile die einbehaltene Steuer durch den Bruttolohn, und es sollte ungefähr 0,15 herauskommen.

## Welche drei Zahlen stehen auf einem Payslip, und wie hängen sie zusammen?

Jeder regelkonforme australische Payslip zeigt gross pay, tax withheld und net pay: Die erste minus die zweite ergibt die dritte. Gross ist, was du verdient hast, tax withheld ist, was dein Arbeitgeber in deinem Namen ans ATO weitergeleitet hat, und net ist, was auf dem Konto landet.

Tax withheld ist eine Vorauszahlung und keine endgültige Rechnung: eine Schätzung Abrechnung für Abrechnung gegen eine Schuld, die nur einmal berechnet wird, am Ende des Steuerjahres über dein gesamtes Einkommen. Ein zu hoher Einbehalt erzeugt eine Erstattung, ein zu niedriger eine Rechnung.

## Wie prüfst du, ob der Satz stimmt?

Teile auf einem beliebigen Payslip die einbehaltene Steuer durch den Bruttolohn. Ein Working Holiday Maker mit korrekt ausgefüllter Tax File Number Declaration und registriertem Arbeitgeber landet nahe bei 0,15.

- 600 $ brutto pro Woche: etwa 90 $ Einbehalt
- 900 $ brutto pro Woche: etwa 135 $ Einbehalt
- 1.200 $ brutto pro Woche: etwa 180 $ Einbehalt
- 2.000 $ brutto pro Woche: etwa 300 $ Einbehalt

Mach es auf mehr als einem Payslip und für jeden Arbeitgeber getrennt. Das häufigste Muster ist nicht ein durchgehend falscher Payslip, sondern ein Arbeitgeber korrekt und ein zweiter monatelang still im Falschen.

## Was bedeutet welcher falsche Prozentsatz?

Der Prozentsatz sagt dir, welche Regel schiefgelaufen ist, und jede hat eine andere Ursache und Lösung.

**Rund 45 %.** Deine Tax File Number Declaration ist nicht in der Lohnbuchhaltung angekommen, oder das 28-Tage-Fenster ist ohne deine TFN abgelaufen. Der teuerste und häufigste Fall. Er löst sich ab der nächsten Abrechnung, sobald die Erklärung vorliegt.

**Rund 30 % oder etwas darüber.** Dein Arbeitgeber ist beim ATO nicht als Arbeitgeber von Working Holiday Makern registriert und wendet Foreign-Resident-Sätze an statt der Working-Holiday-Maker-Tabelle. Nicht dein Fehler, und auf deinem Formular gibt es nichts zu reparieren. Der Überschuss kommt zur Steuerzeit zurück.

**Spürbar unter 15 % oder auf normalen Löhnen fast nichts.** Auf deiner Erklärung wurde der Freibetrag beansprucht. Das ist der einzige Fall hier, der eine Schuld erzeugt statt einer Erstattung, weil das ganze Jahr zu wenig einbehalten wurde und die Differenz mit dem Bescheid fällig wird.

**Gar nichts, und auch keine Superzeile.** Du wirst außerhalb der Lohnbuchhaltung bezahlt, egal wie es genannt wurde. Es gibt keinen Einbehalt zurückzuholen und kein Income Statement, aus dem sich einreichen ließe, und das Einkommen ist trotzdem erklärungspflichtig.

## Wo landet das Geld, nachdem es einbehalten wurde?

Dein Arbeitgeber hält es kurz, führt es nach seinem eigenen Meldezyklus ans ATO ab und schließt die Summen am Ende des Steuerjahres als dein Income Statement ab. Daraus wird deine Steuererklärung gebaut, nicht aus deinen Payslips.

Schließt ein Arbeitgeber nie ab oder mit Zahlen, die nicht zu dem passen, was du bekommen hast, sind deine Payslips der einzige Beleg für die Differenz. Das ist das ganze Argument dafür, sie aufzubewahren.

## Warum Payslips aufbewahren, wenn das ATO die Daten schon hat?

Weil das ATO hat, was der Arbeitgeber gemeldet hat, und das ist nicht immer, was du bekommen hast. Payslips klären eine Abweichung und sind der einzige Nachweis, der Super getrennt von der Steuer ausweist, also die Zeile, die am ehesten ganz fehlt.

Lohnfehler bei Backpacker-Löhnen sind nicht selten und meist nicht böswillig. Sie häufen sich bei kleinen Einzelbetrieben, bei Farmen und Packhallen mit Zettelwirtschaft und in Lokalen, wo eine Person die Lohnabrechnung nebenbei macht. Die Payslips in einem Ordner zu sammeln kostet nichts und klärt die Frage später.

## Warum steht auf deinem Payslip ein anderer Satz?

Der Richtwert von 15 % gilt für jeden Working Holiday Maker. Ein Payslip, der anders liest, sagt etwas Konkretes über dein Setup, und diese Situationen zeigen nicht alle in dieselbe Richtung.

- Wie viele Arbeitgeber du hattest. Jeder ist eine eigene Erklärung, ein eigener Satz und ein eigenes Income Statement, und der Überabzug konzentriert sich meist bei einem davon.
- Ob ein Arbeitgeber nicht als Working-Holiday-Maker-Arbeitgeber registriert war, was einen Foreign-Resident-Einbehalt erzeugt, den du selbst nicht beheben kannst.
- Ob der Freibetrag angekreuzt wurde. Das ist der Zweig, der eine Rechnung statt einer Erstattung erzeugt.
- Ob ein Teil deines Einkommens ABN-Arbeit war, wo nichts einbehalten wird und die Steuer vollständig beim Bescheid abgerechnet wird.
- Ob eine Phase lief, bevor deine TFN vorlag, was einen Block Abrechnungen auf 45 % setzt und deine Erstattung dort konzentriert.

Alles, was über deine tatsächliche Schuld hinaus einbehalten wurde, kommt über deine [Steuererklärung als Working Holiday Maker](/de/tax-return) zurück, und du kannst deine [Steuererstattung schätzen](/de/calculator) auf Basis deiner bisherigen Jahreszahlen.
`,
  },

  // Work Rights
  'how-many-hours-can-you-work-on-whv': {
    title: 'WHV: wie viele Stunden darfst du arbeiten?',
    description: 'Keine wöchentliche Stundenbegrenzung für Working Holiday Visa, aber maximal 6 Monate pro Arbeitgeber. Aktuelle Regeln für Subclass 417 und 462.',
    body: `
Auf einem 417- oder 462-Visum gibt es keine wöchentliche Stundengrenze. Du kannst Vollzeit arbeiten, Überstunden machen und mehrere Jobs gleichzeitig haben. Die Beschränkung, die es wirklich gibt, ist Visumsbedingung 8547: sechs Monate bei einem Arbeitgeber, sofern keine Ausnahme greift, und die Ausnahmen decken das meiste ab, was Backpacker tun.

## Warum glauben so viele, es gebe eine Stundengrenze?

Weil Studentenvisa eine haben und beides verwechselt wird. Ein Studentenvisum trägt während der Studienzeiten eine Obergrenze für Arbeitsstunden pro vierzehn Tage. Ein Working-Holiday-Visum trägt nichts Vergleichbares, und das Department of Home Affairs setzt kein Wochenmaximum.

Praktisch begrenzen dich dein Award und dein Körper. Awards setzen maximale reguläre Stunden und vorgeschriebene Pausen, und Stunden darüber lösen Überstunden- oder Zuschlagssätze aus, ein Recht und keine Beschränkung.

## Was besagt Bedingung 8547?

Sie begrenzt dich auf sechs Monate Arbeit bei einem Arbeitgeber, gezählt in Kalendermonaten ab deinem Startdatum, nicht nach gearbeiteten Stunden. Sie gilt für jeden Inhaber eines Working-Holiday-Visums, ist verpflichtend und setzt sich zurück, wenn ein neues Working-Holiday-Visum erteilt wird.

Ein Verstoß ist eine Visums- und keine Steuerangelegenheit, und die Folge kann die Aufhebung sein. Damit lohnt hier Sorgfalt, vor allem für alle, die im zweiten Monat einen guten Job gefunden haben und einfach geblieben sind.

## Welche Arbeit ist von der Sechsmonatsgrenze ausgenommen?

Eine lange Liste, die das meiste abdeckt, was Working Holiday Maker tatsächlich machen. Du kannst ohne Erlaubnis über sechs Monate hinaus beim selben Arbeitgeber bleiben, wenn die Arbeit in einen dieser Sektoren fällt.

- Pflanzen- und Tierzucht, also Land- und Gartenbau
- Fischerei und Perlenfischerei
- Baumzucht und Holzeinschlag
- Bergbau
- Bauwesen
- Tourismus und Gastronomie, an jedem Ort
- Gesundheit, Altenpflege und Behindertenpflege
- Kinderbetreuung
- Lebensmittelverarbeitung
- Wiederaufbau nach Naturkatastrophen

Verschiedene Standorte desselben Arbeitgebers zählen ebenfalls getrennt, solange kein einzelner Standort sechs Monate überschreitet. Eine Gastronomiegruppe, die dich von einem Lokal in Melbourne zu einem in Byron Bay versetzt, ist etwas anderes, als ein Jahr in derselben Küche zu bleiben.

## Was gilt, wenn deine Arbeit nicht ausgenommen ist?

Du kannst das Department of Home Affairs schriftlich um Erlaubnis zur Fortsetzung bitten, vor Ablauf der sechs Monate und nicht danach. Die Erlaubnis liegt im Ermessen und ist nicht garantiert, nichts, worauf man einen Job plant.

Die praktische Alternative ist meist einfacher: den Arbeitgeber wechseln. Für die meisten Working Holiday Maker ist die Sechsmonatsregel nicht die bindende Beschränkung ihres Jahres, sondern ein Grund weiterzuziehen, den sie ohnehin gehabt hätten.

## Wie passt die 88-Tage-Regel dazu?

Gar nicht. Bedingung 8547 betrifft, wie lange du bei einem Arbeitgeber bleiben darfst. Die Anforderung an specified work betrifft die Qualifikation für ein zweites Visum und verlangt 88 Tage specified work in einem berechtigten Gebiet während deines ersten Visums. Ein drittes Visum verlangt sechs Monate specified work während des zweiten.

Viele Branchen mit specified work sind zugleich von der Sechsmonatsregel ausgenommen, weshalb eine Saison im Riverland oder um Bundaberg über sechs Monate laufen kann und trotzdem zählt. Es sind getrennte Regeln, die sich zufällig überschneiden.

## Was machen lange Arbeitszeiten mit deiner Steuer?

Sie schieben dich die Working-Holiday-Maker-Skala hinauf. Der Satz beträgt 15 % bis 45.000 $ und 30 % auf den Teil darüber. Zwei Jobs gleichzeitig erreichen diesen Punkt schneller als erwartet, weil keine der beiden Lohnbuchhaltungen von der anderen weiß.

Das ist der Mechanismus hinter der häufigsten Jahresend-Überraschung: Jeder Arbeitgeber behält auf Basis seiner eigenen Zahlen korrekt ein, und das kombinierte Einkommen überschreitet eine Grenze, die keiner von beiden sehen kann. Superannuation folgt dem Verdienst und nicht den Stunden, mit 12 % zusätzlich zum Lohn und seit 2022 ohne monatliche Mindestverdienstgrenze.

## Bindet dich die Sechsmonatsregel?

Eine Stundengrenze gibt es für niemanden. Unterschiedlich ist, ob die Sechsmonatsregel dich bindet und was dein kombiniertes Einkommen mit deinem Satz macht.

- Ob deine Branche auf der Ausnahmeliste steht, was entscheidet, ob sechs Monate eine Grenze oder eine Formalie sind.
- Ob derselbe Arbeitgeber dich zwischen Standorten versetzt hat, was getrennt behandelt wird.
- Ob du 88 Tage specified work verfolgst, eine andere Regel mit anderem Zweck.
- Wie viele Arbeitgeber du gleichzeitig hast, denn das kombinierte Einkommen überschreitet die 45.000 $.
- Ob alle deine TFN haben, denn ein Zweitjob bei 45 % ist häufig und bleibt unsichtbar, bis du nachrechnest.
- Ob ein Teil der Arbeit unter einer ABN läuft, wo nichts einbehalten wird und die Steuer beim Bescheid landet.

Mehrere Arbeitgeber werden alle in einer [Steuererklärung als Working Holiday Maker](/de/tax-return) abgeglichen, und du kannst deine [Steuererstattung schätzen](/de/calculator) über dein kombiniertes Einkommen statt Job für Job.
`,
  },

  'penalty-rates-australia': {
    title: 'Penalty Rates: wann stehen sie dir zu?',
    description: 'Penalty Rates sind Zuschläge für Wochenende, Feiertage sowie Abend- und Nachtschichten. Wie hoch sie sind, legt der Modern Award deiner Branche fest.',
    body: `
Penalty Rates sind die höheren Sätze für Stunden außerhalb der regulären Zeit: Wochenenden, Feiertage, Abende und frühe Starts. Sie kommen aus dem Award, der deinen Job abdeckt, nicht aus dem Wohlwollen deines Arbeitgebers. Samstage laufen üblicherweise bei etwa 125 bis 150 % des Normalsatzes, Sonntage bei 150 bis 175 % und Feiertage bei 225 bis 250 %.

## Woher kommen deine Penalty Rates tatsächlich?

Aus dem modernen Award oder dem Tarifvertrag deiner Branche, und das ist ein Rechtsinstrument und keine Betriebsvereinbarung nach Gutdünken. Die Fair Work Commission setzt und überprüft sie, und ein Arbeitgeber kann sie nicht per Absprache, per Vertrag oder über eine Pauschalsatzregelung unterschreiten.

Die erste Frage ist deshalb nicht, was dein Chef sonntags zahlt, sondern welcher Award dieses Lokal abdeckt und auf welcher Einstufung du stehst. Diese zwei Antworten erzeugen jede Zahl, die danach kommt.

## Wie sehen Penalty Rates in der Gastronomie aus?

Der Hospitality Industry (General) Award deckt Cafés, Restaurants, Pubs und Hotels ab und trifft die meisten Working Holiday Maker. Die Sätze steigen über die Woche zu deutlichen Vielfachen am Wochenende, und Casuals bekommen das 25-%-Loading zusätzlich und nicht anstelle davon.

- Wochentagsabend nach 19 Uhr: etwa 110 bis 115 % des Normalsatzes
- Samstag: etwa 125 %
- Sonntag: etwa 175 %
- Feiertag: etwa 225 %

Die genauen Zahlen hängen von Einstufungsstufe und Schichtmuster ab, maßgeblich ist der Award selbst. Eine Casual-Kraft hat sonntags einen deutlich anderen Stundensatz als dienstags, und das ist der größte Hebel, den ein Backpacker auf seinen eigenen Verdienst hat.

## Und im Einzelhandel?

Der General Retail Industry Award folgt derselben Struktur mit niedrigerem Sonntagszuschlag. Samstage laufen bei etwa 125 %, Sonntage bei etwa 150 % und Feiertage bei etwa 225 %, wobei Spätzuschläge an die Ladenschlusszeit gekoppelt sind und nicht an eine feste Uhrzeit.

Im Einzelhandel weichen Tarifverträge außerdem stärker ab als in der Gastronomie, besonders in den großen Supermarktketten, wo der Vertrag und nicht der Award den Satz setzt. Bei einer landesweiten Kette lohnt die Frage, welcher Vertrag gilt, denn er weicht von den obigen Award-Zahlen in beide Richtungen ab.

## Wie kombinieren sich Zuschläge und Casual Loading?

Sie stapeln sich. Das 25-%-Casual-Loading gilt auf den Normalsatz, und der Zuschlag kommt zusätzlich, eine Casual-Wochenendschicht liegt also spürbar über dem geladenen Wochentagssatz und über dem Wochenendsatz für Festangestellte.

Hier kostet eine Pauschalsatzregelung am meisten, und zwar unbemerkt. Wer über alle Wochentage hinweg eine Zahl zahlt, zahlt an Samstagen und Sonntagen unter Award, auch wenn sie gegenüber dem Wochentagssatz großzügig aussieht. Eine flache Stundenzahl auf einem Payslip, der einen Sonntag abdeckte, ist das klarste Zeichen für Unterbezahlung.

## Wie prüfst du, ob deine stimmen?

Lies den Payslip, nicht die Endsumme. Ein regelkonformer Payslip trennt die Stunden nach Satz: reguläre zu einer Zahl, Samstagsstunden zu einer anderen, Sonntags- und Feiertagsstunden zu ihren eigenen, mit ausgewiesenem Loading.

Erscheint jede Stunde einer Woche mit Sonntag zu einem Satz, wurde der Zuschlag nicht gezahlt. Das ist eine Dokumentationsfrage und kein juristisches Argument, und sie klärt sich, indem man für eine Handvoll Wochen den Dienstplan gegen den Payslip hält.

## Was, wenn die Zuschläge nicht gezahlt wurden?

Ermittle die korrekte Zahl vorher, denn eine Forderung auf Basis des nationalen Minimums setzt zu niedrig an, wenn ein Award gilt. Bestimme Award, Einstufung, Loading und den Zuschlag für jede Schicht und summiere die Differenz über den ganzen Zeitraum statt für eine Woche.

Sprich es zuerst schriftlich beim Arbeitgeber an, denn oft sind es Konfigurationsfehler in der Lohnabrechnung und keine vorsätzliche Unterbezahlung. Löst sich das nicht, bearbeitet der Fair Work Ombudsman den Fall kostenlos, und Working Holiday Maker haben dieselbe Stellung wie alle anderen.

## Was sagt dein Dienstplan dazu?

Die Multiplikatoren stehen in Regelwerken. Was dir zustand, beantwortet nur dein eigener Dienstplan. Jeder Punkt unten verändert das Vielfache auf deine Stunden, und mehrere gelten gleichzeitig.

- Welcher Award oder Tarifvertrag das Lokal abdeckt, denn besonders der Sonntagssatz unterscheidet sich.
- Deine Einstufungsstufe darin, die die Basis für jedes Vielfache ändert.
- Ob du Casual bist, denn das 25-%-Loading gilt zusätzlich zum Zuschlag und nicht anstelle davon.
- Welche konkreten Stunden du gearbeitet hast, denn Abend-, Wochenend- und Feiertagszuschläge sind alle getrennt.
- Ob der Payslip die Stunden nach Satz trennt oder eine einzige Pauschalzahl zeigt.
- Ob du auf einer ABN beschäftigt bist, denn dann deckt dich kein Award.

Zuschlagseinkommen wird wie der Rest deines Lohns zum Working-Holiday-Satz besteuert, und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du weißt, worauf das Jahr hinauslief.
`,
  },

  'can-your-employer-pay-you-cash-in-hand': {
    title: 'Darf dein Arbeitgeber dich bar bezahlen?',
    description: 'Barzahlung ist erlaubt, solange Payslips, Steuerabzug und Super stimmen. Fehlen sie, verlierst du Super, Nachweise und deinen Erstattungsanspruch.',
    body: `
Löhne in bar zu zahlen ist in Australien legal. Kein Gesetz verlangt eine Überweisung. Nicht legal ist das, was üblicherweise mitreist: keine einbehaltene Steuer, keine gezahlte Superannuation und kein ausgestellter Payslip. Die Zahlungsweise ändert nichts an den Pflichten des Arbeitgebers, und jedes dieser Versäumnisse kostet dich und nicht ihn.

## Wie sieht eine rechtmäßige Barvereinbarung aus?

Genau wie jeder andere Job, nur ist das Geld physisch. Dein Arbeitgeber behält weiterhin PAYG-Steuer ein, mit hinterlegter TFN 15 % und ohne 45 %, zahlt 12 % Superannuation zusätzlich zum Lohn, stellt für jede Lohnperiode einen Payslip aus, erfüllt Mindestlohn und den zuständigen Award und zahlt Zuschläge für Wochenenden, Feiertage und späte Nächte.

Passiert all das und dir werden am Freitag Scheine in die Hand gedrückt, ist nichts falsch. Selten, aber es gibt es, vor allem in kleinen Familienbetrieben ohne elektronische Zahlungen.

## Was kostet dich die unrechtmäßige Variante tatsächlich?

Vier Dinge, und jedes ist dein Verlust und nicht der des Arbeitgebers. Drei davon sind unsichtbar, bis du sie brauchst, meist Monate später.

**Deine Superannuation.** Zwölf Prozent deines Lohns, weg. Über eine Saison von sechs Monaten auf ordentlichem Gastronomielohn ist das ein vierstelliger Betrag, den du bei der Abreise beanspruchen könntest.

**Deine Absicherung bei Arbeitsunfällen.** Wer ohne Meldung auf einer Baustelle oder in einer Küche verunglückt, steht sehr schlecht da, und in Küchen und auf Farmen passieren Verletzungen tatsächlich.

**Dein Nachweis für ein zweites Visum.** Specified work wird mit Payslips und Zahlungsnachweisen belegt. Achtundachtzig Tage Farmarbeit in bar ohne Papierspur sind achtundachtzig Tage, die du womöglich nicht belegen kannst.

**Deine Erstattung.** Kein Einbehalt bedeutet keinen Überabzug, und aus dem Überabzug kommen die meisten Backpacker-Erstattungen.

Der Arbeitgeber spart bei allen vieren. Du trägst alle vier.

## Musst du es trotzdem erklären?

Ja. Alles in Australien erzielte Einkommen ist steuerpflichtig, unabhängig von der Zahlungsweise, und Barlöhne gehören in deine Erklärung wie jeder andere Lohn.

Es gibt kein Income Statement, die Zahlen müssen also aus deinen eigenen Unterlagen rekonstruiert werden: Kontoeingänge, wenn du das Bargeld eingezahlt hast, ein Schichtkalender, Dienstpläne, Nachrichten zur Arbeitsvereinbarung und alles, was den vereinbarten Satz zeigt. Wie die Rekonstruktion zusammengesetzt wird, steht in [Bareinkommen in der Steuererklärung angeben](/de/blog/cash-in-hand-tax-return).

Das ATO erkennt nicht erklärtes Einkommen über Bankdaten, Branchenvergleiche und Meldungen Dritter, und die Strafen für Hinterziehung sind ernst. Rekonstruierte Zahlen ehrlich zu erklären ist die deutlich bessere Position, und häufig ist es ohnehin eine Erstattungsposition.

## Welche Warnzeichen gibt es, bevor du den Job annimmst?

Die Zeichen tauchen früh auf, meist im ersten Gespräch. Ein Arbeitgeber, der es ordentlich machen will, fragt nach deiner TFN und gibt dir ein Declaration-Formular. Wer beides nicht tut, hat dir bereits gesagt, was zu erwarten ist.

- Bargeld wird als einzige Option dargestellt, eine Überweisung gibt es nicht
- Du wirst gebeten, die Vereinbarung nicht zu erwähnen
- Payslips werden nicht ausgestellt und auf Nachfrage als unnötig behandelt
- Der Satz liegt unter dem Award, was in Gastronomie und Gartenbau sehr oft der Fall ist
- Niemand fragt nach deiner TFN oder gibt dir ein Declaration-Formular
- Super wird überhaupt nicht erwähnt

Die letzten beiden sind die klarsten Hinweise. Ein Arbeitgeber, der nie nach deiner TFN gefragt hat, ist einer, der dich nie melden wollte.

## Welche Aufzeichnungen schützen dich?

Deine eigenen, denn es wird keine anderen geben. Das nützliche Minimum: Datum und Stunden jeder Schicht, der vereinbarte Satz, der erhaltene Betrag, Firmenname und Adresse des Arbeitgebers sowie alle Nachrichten oder Dienstpläne zur Arbeit.

Fotos von dir am Arbeitsplatz helfen mehr, als man denkt, denn bei einer Unterbezahlungs- oder Superforderung wird zuerst bestritten, ob du dort überhaupt gearbeitet hast. Unbezahlter Super lässt sich Jahre später über das Verfahren zur Superannuation Guarantee Charge verfolgen, und der Anspruch steht und fällt mit diesem Nachweis.

## Woran erkennst du eine rechtmäßige Barzahlung?

Bargeld selbst ist neutral. Ob du ein Problem hast, entscheidet, was daneben getan und nicht getan wurde.

- Ob tatsächlich Steuer einbehalten und Super gezahlt wurde, was der Unterschied zwischen rechtmäßig und unrechtmäßig ist.
- Ob du irgendeine Aufzeichnung der Schichten hast, denn nur damit werden die Erklärung und jeder Anspruch möglich.
- Ob du die Arbeit als Nachweis für ein zweites Visum brauchst, was den Einsatz deutlich erhöht.
- Ob die Bararbeit im selben Jahr neben Lohnarbeit lief, was die häufigste Form und die am leichtesten zu rekonstruierende ist.
- Ob du dabei verletzt wurdest, was ein eigenes und dringenderes Problem ist.
- Wie lange es her ist, denn unbezahlter Super lässt sich noch lange danach verfolgen.

Bareinkommen wird zusammen mit allem anderen in deiner [Steuererklärung als Working Holiday Maker](/de/tax-return) erklärt, und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du die rekonstruierten Zahlen zu deinem Lohneinkommen addiert hast.
`,
  },

  'fair-work-act-working-holiday-makers': {
    title: 'Fair Work Act: diese Rechte hast du auch',
    description: 'Der Fair Work Act gilt für dich genauso wie für australische Beschäftigte. Er sichert Mindestlohn, Pausen, Zuschläge und Schutz vor unfairer Kündigung.',
    body: `
Der Fair Work Act 2009 gilt für Working Holiday Maker genauso wie für australische Staatsbürger. Dein Visum ändert nichts an Mindestsätzen, Zuschlägen, Kündigungsfristen oder dem Schutz vor unfairer Kündigung. Unterschiedlich ist nur der Award, der den Job abdeckt, und wie lange du darin warst.

## Was garantiert der Act tatsächlich?

Eine Untergrenze an Mindestansprüchen, die National Employment Standards. Sie gelten für jeden Angestellten unabhängig vom Visastatus und können vertraglich nicht abbedungen werden. Sie umfassen maximale Wochenstunden von 38 plus angemessene Zusatzstunden, Jahresurlaub und bezahlte Freistellung aus persönlichen Gründen für Festangestellte, Feiertage, Kündigungsfristen, Abfindung für qualifizierte Angestellte, Eltern- und Gemeinschaftsdiensturlaub und die Pflicht, jedem neuen Angestellten ein Fair Work Information Statement auszuhändigen.

Daneben steht die Lohnuntergrenze: mindestens der nationale Mindestlohn oder der höhere Award-Satz, wo ein Award den Job abdeckt, und in Backpacker-Branchen ist das fast immer der Fall.

## Welche davon zählen auf einer Working Holiday?

Nur einige, weil die meisten Working-Holiday-Jobs casual und kurz sind.

- Der korrekte Satz für deinen Award und deine Einstufung, wo fast das gesamte Geld liegt
- Penalty Rates für Abende, Wochenenden und Feiertage, denn das sind die Schichten, die Backpacker arbeiten
- Das 25-%-Casual-Loading, das auf jedem Payslip sichtbar sein sollte
- Kündigungsfrist oder Zahlung an ihrer Stelle, wenn eine feste Anstellung endet
- Schutz davor, zu unangemessenen Zusatzstunden verpflichtet zu werden
- Superannuation in Höhe von 12 % der Ordinary Time Earnings, zusätzlich zum Lohn gezahlt

Jahresurlaub läuft selten nennenswert auf, weil er eine längere feste Stelle braucht. Lohn- und Bedingungsschutz gelten dagegen ab der ersten Schicht, und ab dem 1. Juli 2026 liegt das nationale Minimum bei 26,44 $ pro Stunde oder 33,05 $ casual.

## Was macht der Fair Work Ombudsman eigentlich?

Er setzt den Act durch, kostenlos. Er untersucht Beschwerden, vermittelt, geht rechtlich gegen Arbeitgeber vor, die gegen den Act verstoßen, veröffentlicht übersetztes Material für Wanderarbeiter und führt gezielte Kampagnen in Branchen mit schlechter Einhaltungsbilanz, wiederholt Landwirtschaft und Gastronomie.

Er ist kein Gericht und wird nicht in jeder Beschwerde tätig, aber der richtige erste Kanal bei Unterbezahlung. Eine mit Dienstplänen, Payslips und Nachrichten belegte Beschwerde wird als Tatsachenfrage behandelt, nicht als juristisches Argument. Deshalb zählt die Dokumentation mehr als Rechtskenntnis.

## Bringt eine Beschwerde dein Visum in Gefahr?

Nein, und dieser Glaube ist der einzige Grund, warum die meiste Unterbezahlung von Working Holiday Makern ungemeldet bleibt. Förmliche Schutzregeln existieren gerade dafür.

Inhaber temporärer Visa haben eigene Regelungen, die ihnen erlauben, in Australien zu bleiben, um eine arbeitsrechtliche Beschwerde zu verfolgen, und der Visastatus ist kein rechtmäßiger Grund für Vergeltung. Praktisch wirksam sind: Aufzeichnungen führen, Themen schriftlich ansprechen und die kostenlosen Fair-Work-Kanäle nutzen, statt eine informelle Barabfindung anzunehmen.

## Wo schützt dich der Act nicht?

Dort, wo du kein Angestellter bist. Ein unter einer ABN beschäftigter Contractor fällt fast vollständig heraus: kein Award, kein Mindestsatz, keine Zuschläge, kein Casual Loading, keine Kündigungsfrist, keine Superannuation und kein Schutz vor unfairer Kündigung.

Deshalb läuft so viel Ausbeutung von Backpackern über ABNs. Das Etikett entscheidet aber nicht. Hat die Vereinbarung den Gehalt einer Anstellung, also Aufsicht, Dienstplan, Stundenlohn und Ausrüstung des Arbeitgebers, dann ist es Anstellung, was auch immer auf dem Papier steht, und die Ansprüche folgen. Wie das entschieden wird, steht in unserem Guide zum [Test Angestellter gegen Contractor](/de/blog/employee-vs-contractor-australia).

## Was lohnt es aufzuheben, solange du arbeitest?

Dienstpläne, Payslips und jede schriftliche Kommunikation über Stunden oder Lohn, gespeichert an einem Ort, der einen Handyverlust überlebt. Dienstplan-Apps überschreiben statt zu archivieren, und ein Screenshot aus der betreffenden Woche ist mehr wert als eine Erinnerung zwölf Monate später.

Die meisten Unterbezahlungsfälle sind keine Streitigkeiten über das Recht, sondern darüber, was tatsächlich passiert ist. Wer die Aufzeichnungen hat, setzt sich in der Regel durch.

## Wie viel vom Act erreicht dich?

Der Act deckt dich so oder so. Was er dir wert ist, hängt davon ab, wie der Job aufgebaut war.

- Ob du Angestellter oder unter einer ABN beschäftigt bist, denn davon hängt ab, ob überhaupt etwas davon gilt.
- Welcher Award den Arbeitgeber abdeckt und auf welcher Einstufung du stehst, denn das setzt den Satz.
- Ob du casual oder festangestellt bist, denn davon hängen Loading, Urlaub und Kündigungsfrist ab.
- Wie lange du in der Rolle warst, denn Kündigungsfrist und Abfindung skalieren mit der Dienstzeit.
- Welche Stunden du gearbeitet hast, denn bei den Zuschlägen konzentriert sich der Unterschied.
- Ob du Dienstpläne und Payslips aufgehoben hast, denn davon hängt ab, wie unkompliziert eine Forderung wird.

Was von diesen Löhnen einbehalten wurde, wird am Ende des Steuerjahres abgerechnet, und du kannst aus deinen Jahreszahlen deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  // ─── More TFN posts ────────────────────────────────────────────────────────
  'how-to-update-address-with-ato': {
    title: 'ATO-Adresse ändern: drei Wege, fünf Minuten',
    description: 'Drei Wege, deine Adresse beim ATO zu aktualisieren, bevor TFN-Brief, Steuererstattung oder Super-Post verloren gehen.',
    body: `
Deine Adresse lässt sich beim ATO online über dessen eigene Dienste ändern, telefonisch unter 13 28 61 oder durch einen Steuerberater, der für dich handelt. Alle drei Wege wirken zügig auf deinem Datensatz. Entscheidend ist, es zu tun, bevor das Nächste verschickt wird, denn Post, die schon unterwegs ist, folgt der alten Adresse.

## Warum führt das ATO überhaupt eine Adresse, wenn Erstattungen aufs Konto gehen?

Weil mehreres, das darüber entscheidet, ob du dein Geld bekommst, per Post läuft. Dein TFN-Brief wird verschickt und ausschließlich verschickt, Korrespondenz zur Identitätsprüfung ebenso. Steuerbescheide, Berichtigungsschreiben und jede Nachfrage gehen an die hinterlegte Adresse, und ein Brief, den du nie siehst, gilt trotzdem als zugegangen.

Die Erstattung selbst wird nahezu immer elektronisch auf ein australisches Bankkonto gezahlt, eine veraltete Adresse stoppt das Geld also meist nicht. Sie stoppt alles, was vor dem Geld passieren muss.

## Was geht konkret schief, wenn die Adresse alt ist?

Der teuerste Ausfall ist der TFN-Brief: Ein Rückläufer startet eine Wartezeit von 28 Tagen neu, während du möglicherweise mit 45 % statt 15 % arbeitest. Hier kostet eine veraltete Adresse einen wöchentlichen Dollarbetrag.

Der zweite ist die Superannuation. Fonds und ATO führen jeweils eine eigene Adresse, und ein Fonds, der dich nicht erreicht, meldet das Konto irgendwann als unclaimed und überträgt es ans ATO. Das Geld bleibt deins und beanspruchbar, ist aber einen Schritt weiter weg, genau wenn du das Land verlässt.

Der dritte ist der leise. Ein ATO-Schreiben mit einer Frage zu deiner Steuererklärung, unbeantwortet, weil es an ein Hostel in Byron ging, das du im März verlassen hast, wird zu einem Bescheid, der ohne dein Zutun ergeht.

## Welche Adresse solltest du angeben, wenn du alle paar Wochen umziehst?

Eine, die in vier Wochen noch deine Post hält, und das ist selten die, in der du heute Nacht schläfst. Ernte und Gastronomie bewegen Menschen schneller, als die Post Briefe bewegt.

- Die feste australische Adresse von Freunden oder Verwandten ist die beste Antwort, selbst wenn du nie dort hinfährst.
- Ein Langzeithostel funktioniert, wenn es Post für abgereiste Gäste wirklich aufbewahrt, was viele nicht tun.
- Ein Postfach wird akzeptiert und ist die verlässlichste Option für alle, die eine Saison lang zwischen Farmen unterwegs sind.
- Ein Hostel, das du am Freitag verlässt, ist die schlechteste Antwort, und die, die die meisten angeben.

Das ATO führt Postanschrift und Wohnanschrift getrennt. Nutzt du eine Adresse nur zur Postannahme, trag sie als Postanschrift ein und lass die Wohnanschrift dort, wo du lebst, denn der TFN-Brief folgt der Postanschrift.

## Zählt deine Adresse noch, wenn du Australien verlassen hast?

Ja. Eine Auslandsadresse kann und sollte beim ATO hinterlegt werden. Die Korrespondenz nach der Abreise ist die, die du dir nicht leisten kannst zu verpassen: alles zu einer Erstattung in Prüfung, alles zu einer Departing Australia Superannuation Payment, jede Aufforderung zur Identitätsbestätigung.

Deine Bankdaten zählen genauso. Eine Erstattung auf ein australisches Konto, das du auf dem Weg zum Flughafen geschlossen hast, prallt zurück und liegt als Guthaben auf deinem ATO-Konto, bis jemand dem ATO sagt, wohin damit.

## Wie eilig ist es bei dir?

Die Aufgabe ist für alle dieselbe, die Dringlichkeit nicht.

- Ob du noch auf einen TFN-Brief wartest. Wenn ja, ist es dringend und der einzige Punkt hier mit einem Wochenpreis.
- Ob du Superannuation bei einem Fonds mit alter Adresse hast. Unerreichbare Konten landen als unclaimed super beim ATO.
- Ob du kurz vor der Abreise stehst. Adresse und Bankverbindung müssen vor dem Flug stimmen, nicht danach.
- Ob du mehrere Superfonds von mehreren Arbeitgebern hast. Jeder Fonds führt seine eigene Adresse, und eine Änderung beim ATO ändert dort nichts.
- Ob dein altes Onlinekonto beim ATO noch erreichbar ist. Ist die hinterlegte E-Mail oder Telefonnummer weg, ist die Wiederherstellung eine eigene Aufgabe, leichter vor dem Moment, in dem du sie brauchst.

Wenn du mit Super in Australien abreist, ist die Adresse eines der Details, die darüber entscheiden, wie reibungslos du deine [Superannuation nach der Abreise auszahlen lässt](/de/superannuation), und du kannst deine [Steuererstattung schätzen](/de/calculator), bevor du irgendetwas einreichst.
`,
  },

  'tfn-reference-number-before-tfn-arrives': {
    title: 'TFN-Referenznummer: reicht sie zum Job?',
    description: 'Während du auf deine TFN wartest, bekommst du eine Referenznummer vom ATO. Was sie kann, wie du sie nutzt und was dein Arbeitgeber wissen muss.',
    body: `
Die Referenznummer kommt in dem Moment, in dem du deinen TFN-Antrag abschickst, und sie ist der Beleg dafür, dass der Antrag läuft. Dieser Beleg ist das, was dich im 28-Tage-Fenster auf dem Working-Holiday-Maker-Satz von 15 % hält statt bei 45 %. Sie ist nicht deine TFN und kann auch nicht als eine verwendet werden.

## Was ist die Referenznummer und woher kommt sie?

Sie erscheint auf dem Bestätigungsbildschirm am Ende des Onlineantrags und geht an die angegebene E-Mail-Adresse. Sie ist eine Vorgangsnummer für den Antrag, keine Kennung für dich, und sie sieht der neunstelligen TFN überhaupt nicht ähnlich.

Sie ist eine Quittung: Sie belegt, dass der Antrag existiert, lässt das ATO ihn sofort finden und ist das, worauf ein Arbeitgeber zeigen kann, wenn gefragt wird, warum eine neue Kraft noch keine TFN hinterlegt hat.

## Was bringt sie für deinen Lohn?

Sie stützt die Antwort, die du auf der Tax File Number Declaration gibst. Dieses Formular hat ein Feld dafür, dass du eine TFN beantragt, aber noch nicht erhalten hast, und ein Arbeitgeber mit diesem Vermerk wendet im 28-Tage-Fenster den Working-Holiday-Maker-Satz an statt des No-TFN-Satzes von 45 %.

Den Satz ändert die Erklärung, nicht die Referenznummer. Sie ist der Beleg, dass die Erklärung ehrlich ist, und eine Lohnbuchhaltung, die noch nie eine gesehen hat, will sie üblicherweise sehen.

## Was kann sie nicht?

Drei Dinge, jedes ein regelmäßiger Fehler, weil die Referenznummer offiziell genug aussieht, um für die echte Nummer gehalten zu werden.

Sie gehört in kein TFN-Feld auf irgendeinem Formular. Eine Referenznummer, die in einem Lohnsystem als TFN eingetragen wird, erzeugt eine Abweichung, die später entwirrt werden muss.

Sie kann nicht zum Einreichen einer Steuererklärung verwendet werden. Das kann nur die echte Nummer.

Sie kann einem Superfonds nicht anstelle einer TFN gegeben werden. Ein Fonds ohne deine TFN besteuert Beiträge höher und ordnet dir das Konto später schwer zu, einer der Hauptgründe, warum Backpacker-Super verloren geht.

## Wie lange bis zur echten Nummer?

Bis zu 28 Tage ist die vom ATO genannte Obergrenze, etwa zwei Wochen sind typisch. Sie kommt nur als Brief an die australische Adresse aus deinem Antrag, über die es sich vorher ordentlich nachzudenken lohnt.

Die Referenznummer hört an dem Tag auf zu zählen, an dem der Brief ankommt. Bis dahin heb die Bestätigungsmail auf, denn genau die brauchst du, wenn die 28 Tage vergehen und nichts gekommen ist.

## Was tust du, wenn die TFN ankommt?

Gib sie jedem Arbeitgeber mit einer aktualisierten Erklärung, nicht nur dem aktuellen. Jeder Arbeitgeber führt seinen eigenen Datensatz und seine eigene Erklärung, die Packhalle, die deine TFN kennt, bringt dem Pub also nichts.

Ab dann gilt der korrekte Satz für die Zukunft. Alles, was vor Hinterlegung der Nummer über 15 % einbehalten wurde, korrigiert die Lohnbuchhaltung nicht, es kommt über deine Erklärung zurück.

## Zählt die Referenznummer in deiner Lage?

Ob sie überhaupt zählt, hängt davon ab, was du während der Wartezeit tust. Das sind die Fakten, die es entscheiden.

- Ob du während der Wartezeit überhaupt arbeitest. Wenn nicht, kostet nichts davon etwas.
- Ob die Erklärung den laufenden Antrag vermerkt, denn genau das stützt die Referenznummer.
- Ob dein Arbeitgeber sie akzeptiert. Größere Gastronomiegruppen und Personaldienstleister machen das routinemäßig, kleine Einzelbetriebe wenden manchmal trotzdem 45 % an, was ihr Recht ist und zurückzuholen bleibt.
- Ob die Adresse im Antrag in einem Monat noch deine Post hält, denn daran entscheidet sich, ob 28 Tage reichen.
- Ob du schon einmal eine australische TFN hattest, denn dann gibt es keinen Antrag zu referenzieren und die Aufgabe heißt, die alte Nummer wiederzufinden.

Alles, was über den korrekten Satz hinaus einbehalten wurde, kommt über deine [Steuererklärung als Working Holiday Maker](/de/tax-return) zurück, und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du weißt, wie lange die Lücke lief.
`,
  },

  'tax-free-threshold-working-holiday-visa': {
    title: 'Freibetrag 18.200 $: gilt er für dich?',
    description: 'Working Holiday Maker zahlen ab dem ersten Dollar 15 %. Wer im TFN-Formular den Freibetrag ankreuzt, baut Steuerschulden auf. Und die eine Ausnahme.',
    body: `
Working Holiday Maker bekommen den Freibetrag von 18.200 $ nicht, außer in einer seltenen Ausnahme, die an zwei Bedingungen zugleich hängt und nur eine Minderheit erreicht.

Für fast alle lautet die Antwort auf der Withholding Declaration deshalb Nein. Ein Ja erzeugt Schulden statt einer Ersparnis.

## Was ist der Freibetrag, und für wen ist er gedacht?

Der Freibetrag ist eine Vergünstigung für australische Steuerresidenten, mit der die ersten 18.200 $ Einkommen eines Steuerjahres steuerfrei zufließen. Es gibt ihn, weil Australiens Residentensätze progressiv sind und Residenten mit niedrigem Einkommen entlastet werden. Working Holiday Maker werden nach einer anderen Tabelle besteuert: 15 % ab dem ersten Dollar bis 45.000 $, ohne Nullsatzstufe. Deshalb passen Freibetrag und Working-Holiday-Sätze nicht zusammen, und deshalb fragt das Formular danach.

## Warum verursacht ein Kreuz dort ein Problem, statt Geld zu sparen?

Weil ein Kreuz dort ändert, was dein Arbeitgeber einbehält, und nicht, was du am Ende schuldest. Die Steuerschuld eines Working Holiday Makers wird nach den Working-Holiday-Sätzen berechnet, ganz gleich, was auf dem Formular steht. Ein niedrigerer Einbehalt verschiebt die Rechnung nur nach hinten.

Ein Ja sagt der Lohnbuchhaltung, sie soll die Residentenskala mit der Nullsatzstufe anwenden. Es kommt spürbar weniger Steuer aus jeder Abrechnung heraus und dein Wochennetto steigt.

An deiner tatsächlichen Steuerschuld ändert das nichts. Sie wird am Jahresende nach den Working-Holiday-Maker-Sätzen berechnet, und die Differenz zum Einbehaltenen ist mit dem Bescheid fällig. Was eine Erstattung hätte sein sollen, wird zur Rechnung, und ihre Höhe folgt der Dauer des Fehlers.

Bei 1.000 $ pro Woche liegt der korrekte Einbehalt bei etwa 150 $. Mit fälschlich beanspruchtem Freibetrag kann er deutlich niedriger sein oder, bei geringeren Wochenlöhnen, ganz ausfallen. Ein halbes Jahr davon ergibt eine Schuld im hohen dreistelligen Bereich, ein volles Jahr kann über tausend Dollar hinausgehen.

## Wie lautet die Ausnahme genau?

Zwei Bedingungen müssen zusammen erfüllt sein, und beide sind anspruchsvoll. Die erste ist der steuerliche Wohnsitz: Du musst für das Jahr australischer Steuerresident sein, und das ist eine Beurteilung, die in beide Richtungen leicht falsch ausfällt. Die zweite Bedingung fällt von Person zu Person verschieden aus und lässt sich nicht am Visum ablesen.

Der Hintergrund ist ein Urteil des High Court, Addy v Commissioner of Taxation [2021] HCA 34, ein Fall, über den die Gerichte jahrelang gestritten haben. Wenn selbst Richter sich uneins waren, ist das kein Anspruch, den man sich im Hostel selbst zuspricht. Warum die Frage so schwer zu greifen ist, steht in der [Wohnsitzprüfung für Working Holiday Maker](/de/blog/tax-residency-working-holiday-makers). Die endgültige Position wird erst bei der Erstellung der Steuererklärung bezogen, nachdem dein ganzes Jahr durchgegangen wurde, und jede Erklärung wird vor der Einreichung von einem registrierten Steueragenten geprüft und freigegeben.

So oder so wird die Frage beim Bescheid geklärt, nicht in der Lohnbuchhaltung. Auch wer am Ende qualifizieren könnte, sollte während des Jahres Nein ankreuzen.

## Wie reparierst du es, wenn das Kästchen schon angekreuzt ist?

Gib deinem Arbeitgeber eine neue Withholding Declaration mit der korrigierten Antwort, dann wendet die Lohnbuchhaltung ab der nächsten Abrechnung den richtigen Satz an. Rückwirkend korrigiert sie nicht: je früher entdeckt, desto kleiner die Nachzahlung.

Dann plane die Lücke ein. Der zu wenig einbehaltene Betrag verschwindet nicht und wird nicht erlassen, sondern bei der Abgabe abgerechnet. Seine ungefähre Größe vor dem Oktober zu kennen ist der Unterschied zwischen einer beherrschbaren Anpassung und einem Schock. Bei mehreren Arbeitgebern prüfe jeden einzelnen. Dieser Fehler wird meist einmal gemacht, auf dem ersten Formular am ersten Tag in Australien, und danach brav auf jedes weitere übertragen.

## Wie erkennst du es am Payslip?

Teile die einbehaltene Steuer durch den Bruttolohn. Ein Working Holiday Maker mit korrektem Satz landet nahe bei 0,15. Deutlich darunter deutet bei normalen Löhnen auf einen beanspruchten Freibetrag hin, den einzigen häufigen Fehler, der zu wenig statt zu viel Einbehalt erzeugt.

Die anderen Richtungen bedeuten etwas anderes. Rund 45 % heißt, deine TFN liegt nicht vor. Rund 30 % heißt, dein Arbeitgeber ist nicht als Working-Holiday-Maker-Arbeitgeber registriert. Beides führt zu Erstattungen. Nur der Freibetrag führt zu einer Schuld.

## Fällst du unter die enge Ausnahme?

Für fast alle lautet die Antwort auf dem Formular Nein, und die Ausnahme ist eng genug, dass sie während des Jahres nichts daran ändern sollte.

- Ob dein Jahr die Wohnsitzhälfte überhaupt tragen kann, was die schwierigere der beiden ist und sich nicht zuverlässig selbst beurteilen lässt.
- Ob die zweite Bedingung in deinem Fall erfüllt ist, was geprüft gehört statt geraten.
- Wie viele Arbeitgeber eine Erklärung mit der falschen Antwort bekommen haben.
- Wie lange der falsche Satz lief, bevor er auffiel, denn daran hängt die ganze Größe des Problems.
- Ob du zusätzlich ABN-Einkommen hast, das unversteuert zufließt und dieselbe Lücke vergrößert.

Endgültig festgelegt wird die Position mit deiner [Steuererklärung als Working Holiday Maker](/de/tax-return), und ob dein Jahr auf eine Erstattung oder auf eine Rechnung hinausläuft, schätzt der [Erstattungsrechner](/de/calculator) ab.
`,
  },

  'tfn-application-rejected': {
    title: 'TFN-Antrag abgelehnt? Das sind die Gründe',
    description: 'Abgelehnt wird meist wegen Namensschreibweise, Visastatus oder unvollständigen Angaben. Du kannst korrigiert erneut beantragen.',
    body: `
Fast immer, weil die Identitätsangaben nicht zu den Aufzeichnungen von Home Affairs passten. Die üblichen Ursachen sind eine Reisepassnummer, die von der Visumserteilung abweicht, ein nicht passendes Geburtsdatum, ein anders als im Pass geschriebener Name oder eine TFN, die aus einem früheren Visum bereits existiert. Keine davon ist fatal.

## Was wird eigentlich geprüft?

Ein elektronischer Abgleich mit Einwanderungsdaten, kein Mensch, der deine Dokumente liest. Es wird nichts hochgeladen: Der Antrag gelingt oder scheitert daran, ob die getippten Felder exakt zu dem passen, was die Behörden bereits haben.

Das erklärt das Fehlermuster. Weggelassene zweite Vornamen, verschwundene Bindestriche und Umlaute, ein transliterierter Name, so eingetragen wie man ihn spricht statt wie der Pass ihn druckt, ein nach der Visumserteilung erneuerter Pass. Für das System ist jedes davon eine Abweichung.

## Welche vier Ursachen prüfst du zuerst?

Die meisten Ablehnungen lösen sich in eine von vier auf, und welche du hast, entscheidet den Weg zurück. Blind neu zu beantragen erzeugt bei zwei der vier dieselbe Ablehnung ein zweites Mal.

- Ein Tippfehler in Passnummer, Name oder Geburtsdatum. Korrigieren und mit den Angaben exakt wie gedruckt neu beantragen.
- Ein Antrag vor der Erfassung deiner Einreise. Hast du innerhalb von Stunden nach der Landung beantragt, existierte der Einreisedatensatz womöglich noch nicht, und ein paar Tage warten ist die Lösung.
- Ein Visum, das noch nicht durch Einreise nach Australien aktiviert wurde, was ein Zeitproblem ist und kein Datenproblem.
- Eine TFN, die aus einem früheren Visum bereits existiert. Das ist eine Wiederbeschaffung, und eine zweite Nummer zu erzeugen wäre das falsche Ergebnis.

Der letzte Punkt zählt am meisten für Rückkehrer. Eine TFN ist dauerhaft und lebenslang, der richtige Schritt ist also, [die bestehende Nummer wiederzufinden](/de/blog/how-to-find-lost-tfn), statt eine Doppelspur mit eigenen Verzögerungen zu erzeugen.

## Was kostet es dich, solange es ungelöst ist?

Dreißig Cent auf jeden Dollar, so lange es dauert. Ohne hinterlegte gültige TFN behält dein Arbeitgeber 45 % statt 15 % ein, und das sind bei einer 1.000-$-Woche 300 $ pro Woche, die zurückgehalten statt ausgezahlt werden.

Das Geld ist nicht verloren. Es wird bei der Abgabe angerechnet, der Preis ist also der Zeitpunkt und nicht der Betrag. Für jemanden mit wöchentlicher Miete ist genau das der Grund, eine Ablehnung schnell zu lösen.

## Wirkt sich die Ablehnung auch auf das Declaration beim Arbeitgeber aus?

Ja, und das übersehen die meisten. Das Tax File Number Declaration hält einen laufenden Antrag fest und hält dich durch ein Fenster von 28 Tagen auf dem Working-Holiday-Satz. Eine Ablehnung startet diese Uhr neu, und ist das Fenster verstrichen, muss der Arbeitgeber 45 % einbehalten, egal was du ihm gesagt hast.

Sag dem Arbeitgeber also, dass der Antrag abgelehnt wurde und neu eingereicht wird, und aktualisiere das Declaration, sobald die Nummer da ist. Was die Lohnbuchhaltung braucht, steht in unserem Guide zum [Tax File Number Declaration](/de/blog/tax-file-number-declaration-form).

## Ist ein Anruf besser als ein weiterer Onlineversuch?

Bei manchen Ursachen ja. Ein schlichter Tippfehler ist am schnellsten durch einen sauberen neuen Antrag behoben. Eine Namensabweichung, ein Ehename, eine Transliteration oder ein vermuteter Doppeleintrag wird besser im Gespräch mit dem ATO geklärt, weil ein Sachbearbeiter Datensätze zusammenführen kann, die eine automatische Prüfung nicht zusammenbringt.

Halte die Referenznummer aus der ursprünglichen Bestätigungsmail bereit. Jeder Weg läuft damit schneller, und sie wird regelmäßig gelöscht.

## Was solltest du tun, sobald die Nummer endlich kommt?

Gib sie jedem Arbeitgeber einzeln auf einem frischen Declaration und prüfe dann den nächsten Payslip, statt anzunehmen, dass die Lohnbuchhaltung nachgezogen hat. Behandle die Nummer von da an wie eine Bankkontonummer.

Working Holiday Maker werden gezielt für TFN-Diebstahl ins Visier genommen: Eine gestohlene TFN erlaubt eine betrügerische Erklärung mit umgeleiteter Erstattung, und das Opfer merkt es oft erst, wenn die eigene Erklärung als Duplikat abgelehnt wird. Wer Steuerhilfe anbietet und keine Registrierung im öffentlichen staatlichen Register der Steuerpraktiker vorweisen kann, sollte deine Dokumente nicht bekommen.

## Welche Angabe hat die Ablehnung ausgelöst?

Eine Ablehnung ist ein Datenproblem, und welche Daten sie ausgelöst haben, entscheidet Lösung und Dauer: ob du neu beantragst, wartest oder eine bestehende Nummer wiederbeschaffst.

- Ob die Abweichung in der Passnummer, im Namen oder im Geburtsdatum liegt.
- Ob dein Pass nach der Visumserteilung erneuert wurde, was eine nicht mehr passende Nummer erzeugt.
- Wie schnell nach der Ankunft du beantragt hast, denn der Einreisedatensatz muss zuerst existieren.
- Ob du schon einmal eine TFN hattest, denn dann ist Wiederbeschaffung und nicht Neuantrag der richtige Weg.
- Ob das 28-Tage-Fenster des Declarations beim Arbeitgeber bereits abgelaufen ist.
- Wie viele Wochen mit 45 % Einbehalt bis zur Lösung auflaufen, denn daraus besteht die spätere Erstattung.

Alles, was während der Verzögerung zu viel einbehalten wurde, kommt über die [Working-Holiday-Steuererklärung](/de/tax-return) zurück, und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du weißt, wie lange die Phase lief.
`,
  },

  'tfn-identity-documents-required': {
    title: 'TFN-Antrag: welche Dokumente du brauchst',
    description: 'Für den TFN-Antrag in Australien brauchst du Reisepass, Visadetails und eine Postadresse. Vollständige Dokumentenliste für Working Holiday Maker.',
    body: `
Für die meisten Working Holiday Maker ist der Pass, der das Visum trägt, die gesamte Dokumentenanforderung. Es wird nichts hochgeladen. Der Antrag prüft deinen Pass elektronisch gegen Einwanderungsdaten, entscheidend ist also nicht, welche Dokumente du besitzt, sondern ob das, was du tippst, zu dem passt, was die Behörden bereits haben.

## Was fragt der Antrag tatsächlich ab?

Er fragt Identitätsangaben ab und keine Nachweise: deinen vollständigen rechtlichen Namen exakt wie im Pass gedruckt, Geburtsdatum, Staatsangehörigkeit und Geburtsland, den Pass, der dein aktuelles 417- oder 462-Visum trägt, dein Ankunftsdatum auf diesem Visum, eine australische Wohnadresse und Kontaktdaten.

Kein Sachbearbeiter liest deine Visumserteilung. Es gibt einen automatischen Abgleich, der gelingt oder nicht, weshalb ein für dich belangloses Detail den Antrag komplett stoppen kann.

## Welchen Pass, wenn du mehrere hast?

Den, mit dem du nach Australien eingereist bist und gegen den das Visum erteilt wurde. Doppelstaatler beantragen regelmäßig mit ihrem gefühlten Hauptpass und werden gegen nichts abgeglichen, weil der Einreisedatensatz am anderen Dokument hängt.

Dieselbe Falle erwischt jeden, der seinen Pass nach der Visumserteilung erneuert hat. Das neue Heft hat eine neue Nummer, der Visumsdatensatz trägt weiterhin die alte, und der Abgleich scheitert an einem Dokument, das du in der Hand hältst.

## Welche Adresse solltest du angeben?

Eine, an der dich Post in einem Monat erreicht, denn die TFN kommt als physischer Brief, und ein zurückgesandter Brief startet die Wartezeit neu. Eine Mietwohnung oder WG, Freunde oder Verwandte, ein Hostel mit Erlaubnis zum Postempfang oder eine Arbeitsstätte mit Zustimmung des Arbeitgebers funktionieren alle.

Ein Hostel, das du in zehn Tagen verlässt, funktioniert nicht, und das ist die häufigste selbstverschuldete Verzögerung. Ziehst du vor Ankunft des Briefes um, lässt sich die Adresse beim ATO ändern, wie in unserem Guide zur [Adressänderung beim ATO](/de/blog/how-to-update-address-with-ato) beschrieben.

## Was passiert mit Namen, die nicht einfach sind?

Sie sind die häufigste Ablehnungsursache, und der Grund ist mechanisch und nicht diskriminierend. Bindestriche, Apostrophe, Umlaute und Akzente, mehrere zweite Vornamen, transliterierte Namen und Ehenamen erzeugen Unterschiede zwischen der gedruckten Schreibweise, der bei der Visumserteilung erfassten und der, die ein Mensch tippt.

Für deutsche Pässe ist das ein Dauerthema: Müller, Mueller und Muller müssen konsistent sein. Auch einen zweiten Vornamen wegzulassen, der auf der Visumserteilung steht, ist eine Abweichung. Gib es Zeichen für Zeichen so ein, wie es gedruckt ist, und widersteh dem Drang, es aufzuräumen.

## Wann verlangt das ATO mehr?

Wenn der automatische Abgleich scheitert. Dann verschiebt sich das Gespräch zu Dokumenten, und je nach Ursache kann das ATO beglaubigte Kopien oder eine persönliche Identitätsprüfung in einem Service Centre verlangen.

Dieser Weg ist langsam, besonders aus dem Ausland, und deshalb lohnt es sich, früh im Aufenthalt zu beantragen. Eine Namenskomplikation, die in Australien ein Telefonat ist, wird nach deiner Abreise zu internationalem Schriftverkehr.

## Was kostet eine Verzögerung tatsächlich?

Dreißig Cent auf jeden Dollar, den du in der Zwischenzeit verdienst. Ohne hinterlegte TFN behält der Arbeitgeber 45 % statt 15 % ein, das sind bei einer 1.000-$-Woche 300 $ zurückgehalten statt ausgezahlt, und es läuft weiter, bis die Nummer erfasst ist.

Das 28-Tage-Fenster des Declarations ist die Abmilderung. Auf dem Tax File Number Declaration festhalten zu lassen, dass der Antrag läuft, hält dich durch dieses Fenster auf dem Working-Holiday-Satz. Zu viel Einbehaltenes wird bei der Veranlagung zurückgeholt, der Preis ist also der Zeitpunkt und nicht der Betrag.

## Was solltest du mit der Nummer tun, sobald sie da ist?

Gib sie jedem Arbeitgeber einzeln und schütze sie dann. Working Holiday Maker werden gezielt für TFN-Diebstahl ins Visier genommen: Eine gestohlene TFN erlaubt eine betrügerische Erklärung mit anderswohin geschickter Erstattung, und das Opfer merkt es meist erst, wenn die eigene Erklärung als Duplikat abgelehnt wird.

Schick niemals TFN, Pass oder Visumserteilung an jemanden ohne aktuelle Registrierung im öffentlichen staatlichen Register der Steuerpraktiker. Leute, die sich in Backpacker-Gruppen als Buchhalter ausgeben, sind ein wiederkehrendes Problem, und eine überprüfbare Registrierungsnummer ist der ganze Test.

## Woran scheitern Anträge beim ersten Versuch?

Die Dokumente sind für alle gleich. Ob es beim ersten Mal durchgeht, hängt an Details, die für dich spezifisch sind. Jeder folgende Punkt ist ein häufiger und vermeidbarer Fehlschlag.

- Ob der Pass, mit dem du beantragst, der ist, gegen den das Visum erteilt wurde.
- Ob dieser Pass seit der Visumserteilung erneuert wurde.
- Ob dein Name Zeichen oder zweite Vornamen enthält, die an irgendeiner Stelle anders erfasst wurden.
- Ob deine Einreise erfasst ist, was sie womöglich nicht ist, wenn du innerhalb von Stunden nach der Landung beantragst.
- Ob die Postadresse in einem Monat noch deine sein wird.
- Ob du schon einmal eine TFN hattest, denn dann ist Wiederbeschaffung und nicht ein Neuantrag richtig.

Alles, was während der Wartezeit zu viel einbehalten wurde, kommt über die [Working-Holiday-Steuererklärung](/de/tax-return) zurück, und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du weißt, wie lange die Phase lief.
`,
  },

  'tfn-security-protect-from-fraud': {
    title: 'TFN schützen: Betrug und Missbrauch stoppen',
    description: 'Deine TFN gehört nur ans ATO, an Arbeitgeber, Bank und Superfonds. Bei Verdacht auf Missbrauch meldest du das dem ATO.',
    body: `
Fünf Stellen dürfen nach deiner TFN fragen: dein Arbeitgeber, sobald du angefangen hast, deine Bank, dein Superfonds, dein Steuerberater und Behörden, die Zahlungen verwalten, auf die du Anspruch hast. Sonst hat niemand ein Recht darauf. Wer außerhalb dieser Liste danach fragt, irrt sich entweder oder versucht Betrug.

## Warum lohnt sich der Diebstahl einer TFN?

Weil sie dauerhaft ist und Geld in deinem Namen freischaltet. Wer deine TFN samt Identitätsdaten hat, kann als du eine Erklärung einreichen und die Erstattung umlenken, an deine Superannuation zu kommen versuchen oder ABN-Registrierungen auf dich anlegen.

Rückgängig ist der Schaden langsam, weil die Nummer sich nicht wie eine Karte sperren lässt: Sie ist eine lebenslange Kennung. Eine betrügerische Erklärung fällt meist erst Monate später auf, wenn deine echte als Duplikat abgelehnt wird und die Erstattung während der Untersuchung eingefroren ist.

## Warum werden Working Holiday Maker gezielt angesprochen?

Weil sie neu im System sind, nicht wissen, wie normal aussieht, und sich in Umgebungen bewegen, die auf informellem Vertrauen beruhen. In Hostels, Backpacker-Facebook-Gruppen, WhatsApp-Communities und an schwarzen Brettern sucht man ohne Erfahrung mit australischer Steuer Hilfe, und wer sie anbietet, ist nicht geprüft.

Das Muster ist immer dasselbe. Ein Angebot, deine Erklärung einzureichen oder deine [Super](/de/superannuation) zu beantragen, gegen eine kleine Gebühr, eine Bitte um ein Foto von Pass und Visumserteilung, deine TFN, Geburtsdatum und Adresse, manchmal Bankdaten. Danach wird die Erklärung eingereicht, die Erstattung woanders hingelenkt und das Konto verschwindet.

## Was sind die Warnsignale?

Das erste klärt die meisten Fälle allein: keine überprüfbare Registrierung im öffentlichen staatlichen Register der Steuerpraktiker. Sie ist öffentlich und in unter einer Minute prüfbar; wer dir keine Nummer nennen will, hat die Frage bereits beantwortet.

- Zahlung verlangt in bar, Kryptowährung oder Geschenkkarten
- Keine Geschäftsadresse, Betrieb ausschließlich über eine Messenger-App
- Eine große Erstattung versprochen, bevor irgendjemand deine Umstände angesehen hat
- Eine Bitte um deine Kontopasswörter oder darum, deinen Bildschirm zu teilen
- Druck, sofort zu handeln, meist unter Berufung auf eine Frist

Die Passwortfrage verdient Nachdruck. Ein registrierter Steuerberater erreicht deine Daten über seinen eigenen Beraterkanal und braucht nie deine Zugangsdaten zum Behördenkonto. Wer danach fragt, arbeitet nicht als Steuerberater, wie er sich auch nennt.

## Wie ist das Leck üblicherweise entstanden?

Selten durch etwas Ausgeklügeltes. Die wiederkehrenden Ursachen sind Onboarding-Formulare aus Job-Betrügereien, die vollständige Ausweisdokumente verlangen, bevor Arbeit existiert, abfotografierte oder auf gemeinsam genutzten Hostelrechnern liegengelassene Dokumente und TFNs, die per WhatsApp an jemanden gingen, der als Lohnbuchhaltung beschrieben war.

Der rote Faden ist eine Anfrage, die verwaltungstechnisch normal wirkt und ankommt, wenn dir jeder Vergleichsmaßstab fehlt. Die Liste der fünf zu kennen schützt deshalb mehr als jede Menge Vorsicht, weil sie aus einer Ermessensfrage eine Faktenprüfung macht.

## Was tust du, wenn es schon passiert ist?

Handle an dem Tag, an dem du es vermutest, statt auf Beweise zu warten. Ruf die ATO-Hotline für Identitätsfragen an und sag, dass deine TFN kompromittiert ist. Dort lässt sich ein Vermerk auf deinem Datensatz setzen, der zusätzliche Prüfungen verlangt, bevor etwas in deinem Namen bearbeitet wird, und unter Umständen wird eine neue Nummer ausgegeben.

Sichere danach alles, was daran hängt. Ändere deine Zugangsdaten zum Behördenkonto und aktiviere die stärkste verfügbare Anmeldung, informiere deinen Superfonds, weil Guthaben ein eigenes Ziel sind, und prüfe, ob für das laufende Jahr schon eine Erklärung in deinem Namen eingereicht wurde. Der Vermerk kostet nichts und schützt jahrelang.

## Was, wenn schon eine betrügerische Erklärung eingereicht wurde?

Die echte Erklärung wird trotzdem eingereicht und die Erstattung bleibt deine, wandert aber auf einen langsameren Weg, während das Duplikat untersucht wird. Das ist eine Verzögerung von Monaten und kein Verlust, und geklärt wird es meist über das ATO und nicht über die Polizei.

Melde es, hebe jede Korrespondenz auf und rechne bei allem Folgenden mit zusätzlicher Identitätsprüfung. Außerhalb Australiens zu sein erschwert das Verfahren deutlich, ein Argument dafür, vor der Abreise zu prüfen statt danach.

## Wie gefährdet bist du gerade?

Die Schutzregeln sind für alle gleich. Deine Gefährdung ist es nicht. Diese Punkte lohnt es jetzt zu prüfen und nicht erst, wenn etwas passiert ist, denn die Bereinigung aus dem Ausland ist erheblich langsamer.

- Ob du je Ausweisdokumente an jemanden geschickt hast, den du nicht überprüfen konntest.
- Ob dein Behördenkonto an einer noch funktionierenden Telefonnummer hängt, denn eine tote australische SIM sperrt dich aus deinem eigenen Datensatz aus.
- Ob die Kontaktdaten beim Superfonds aktuell sind.
- Ob du Australien bereits verlassen hast, was die Bereinigung verlangsamt.
- Ob in diesem Jahr eine Erklärung in deinem Namen eingereicht wurde, die nicht von dir stammt.
- Ob auf deine Daten eine ABN registriert ist, die du nicht registriert hast.

Erklärungen im Rahmen der [Working-Holiday-Steuererklärung](/de/tax-return) laufen über einen überprüfbaren beruflichen Kanal und nicht über ein anonymes Konto, und du kannst deine [Steuererstattung schätzen](/de/calculator), bevor du überhaupt mit jemandem sprichst.
`,
  },

  'who-can-ask-for-your-tfn': {
    title: 'Wer darf deine TFN verlangen und wer nicht?',
    description: 'Fragen dürfen das ATO, Arbeitgeber, Bank und Superfonds. Vermieter, Hostels und Jobvermittler nicht, und genau dort beginnen die Betrugsfälle.',
    body: `
Sechs Gruppen dürfen rechtmäßig nach deiner Tax File Number fragen: dein Arbeitgeber nach der Einstellung, das ATO, dein Superfonds, deine Bank, ein registrierter Steuerberater, der für dich handelt, und Services Australia, wenn du eine Leistung beantragst. Alle anderen dürfen fragen, du darfst ablehnen, und die Ablehnung darf dir rechtlich nicht schaden.

## Warum ist die Liste so kurz?

Weil eine TFN plus ein Pass ein brauchbarer Identitätsbaukasten ist, und das australische Datenschutzrecht behandelt sie entsprechend. Erheben darf nur, wer einen echten steuerlichen Grund hat, sie zu halten, und muss erklären wozu, sie sicher speichern und nur dafür nutzen.

Die kurze Liste ist der Schutz: Du musst nie beurteilen, ob eine Anfrage angemessen ist. Steht die fragende Stelle nicht darauf, lautet die Antwort nein, und eine Begründung ist nicht nötig.

## Wann darf dein Arbeitgeber fragen?

Nachdem du eingestellt wurdest, nicht davor. Die rechtmäßige Anfrage kommt beim Onboarding als Tax File Number Declaration, einem Standardformular des ATO. Der Arbeitgeber braucht die Nummer, um den Working-Holiday-Maker-Satz von 15 % anzuwenden und dein Einkommen zu melden.

Eine Anfrage, bevor du eine Stelle angenommen hast, ist das Warnsignal und der häufigste Weg, auf dem Backpacker hereinfallen. Eine Personalvermittlung braucht deine TFN nicht, um dich vorzuschlagen, und ein Job, den es noch nicht gibt, kann keine Lohnunterlagen haben.

## Wer hat keinen Anspruch darauf?

Jeder, dessen Grund nichts mit Steuern zu tun hat. Die Anfragen, die Working Holiday Maker tatsächlich bekommen, kommen aus einem vorhersehbaren Kreis.

- Vermieter und Immobilienmakler, auch auf Mietanträgen
- Hostels, aus welchem Grund auch immer
- Anbieter von Telefon, Internet und Versorgungsleistungen
- Personalvermittlungen, bevor du eingestellt bist
- Andere Reisende, Freunde oder irgendjemand in einem Gruppenchat
- Jeder, der Steuerhilfe anbietet und keine aktuelle Registrierung vorzeigen kann

Diesen Anfragen zu widersprechen ist keine Straftat und darf rechtlich nicht dazu genutzt werden, dir eine Wohnung, eine Leistung oder einen Job zu verweigern.

## Wie sehen die Betrugsmaschen tatsächlich aus?

Sie sind nicht raffiniert und müssen es nicht sein: Sie zielen auf Menschen in ihren ersten Wochen in einem fremden Land, die noch nicht wissen, wie normal aussieht. Die wiederkehrenden Formen lohnt es auf den ersten Blick zu erkennen.

**Der Fake-Job.** Ein Angebot, das ungefragt kommt, vor jedem Gespräch nach TFN und Passfoto fragt und nie zu echter Arbeit führt. Das Ergebnis ist ein Identitätsbaukasten, kein Job.

**Der Erstattungsagent aus den sozialen Medien.** Ein Konto, das anbietet, deine Erklärung einzureichen, nach deiner TFN und deinem Behördenlogin fragt und häufig einen Betrag verspricht, bevor irgendjemand dein Einkommen gesehen hat. Die Erklärungen werden auf Konten eingereicht, die das Opfer nicht kontrolliert.

**Das Lohnformular am Hostel-Brett.** Ein Papierformular, das TFNs für Cash-Jobs sammelt, die nie stattfinden, ausgelegt dort, wo hundert Leute es ausfüllen.

Das Erkennungszeichen ist immer dasselbe: eine konkrete Erstattungssumme, versprochen bevor jemand deine Income Statements gesehen hat. Diese Zahl kann niemand vorher kennen.

## Wie prüfst du jemanden, bevor du etwas herausgibst?

Jeder Steuerberater, der in Australien tätig ist, steht im öffentlichen staatlichen Register der Steuerpraktiker, und es ist durchsuchbar. Die Prüfung dauert eine Minute, und eine seriöse Kanzlei erwartet, dass du sie machst.

Zwei Dinge wird ein Steuerberater mit Registrierung nie brauchen: dein Passwort für dein Behördenkonto und dein Bankinglogin. Der Zugriff auf deine ATO-Daten läuft über einen professionellen Kanal und nicht darüber, sich als du einzuloggen. Jede Aufforderung zu diesen Zugangsdaten ist Betrug, egal wie das Gespräch bis dahin lief. Steuererklärungen, die hier für dich vorbereitet werden, werden vor der Einreichung von einem registrierten Steueragenten geprüft und freigegeben, und diese Registrierung ist im selben öffentlichen Register nachprüfbar.

## Was, wenn du sie schon an die Falschen gegeben hast?

Automatisch passiert nichts Katastrophales, und eine TFN allein leert kein Bankkonto. Das Risiko ist eine betrügerische Steuererklärung in deinem Namen oder ein auf deine Identität eröffnetes Konto, und beides ist erkennbar.

Das ATO kann nach einer Identitätskompromittierung einen Vermerk auf deinem Datensatz setzen, und das ist besser als abzuwarten. Ruf dort unter 13 28 61 an und sag klar, was an wen herausgegeben wurde. Ein herausgegebenes Behördenlogin änderst du zuerst.

## Ist diese eine Anfrage legitim?

Die Liste derer, die rechtmäßig fragen dürfen, ist fest. Ob eine konkrete Anfrage legitim ist, hängt am Zusammenhang, und das sind die Umstände, die es in der Praxis entscheiden.

- Ob du den Job schon angenommen hast. Das ist der gesamte Test für eine Arbeitgeberanfrage.
- Ob die fragende Person registriert ist, was sich in einer Minute im öffentlichen Register prüfen lässt.
- Ob jemand neben deiner TFN auch deine Behördenzugangsdaten hat, was eine deutlich schlechtere Lage ist als die TFN allein.
- Ob du eine Leistung von Services Australia beantragst, der eine Behördenkontext außerhalb des ATO, in dem die Anfrage legitim ist.
- Ob du sie einem Superfonds gegeben hast. Das ist kein Risiko, sondern nötig, denn ein Fonds ohne deine TFN besteuert Beiträge höher und tut sich schwer, das Konto dir zuzuordnen, wenn du deine [Superannuation nach der Abreise auszahlen lässt](/de/superannuation). Was am Ende zurückkommt, kannst du vorab in der [Steuererstattungsschätzung](/de/calculator) durchrechnen.
`,
  },

  'tfn-australian-address-no-fixed-address': {
    title: 'TFN ohne feste Adresse: so geht der Antrag',
    description: 'Hostel, Camper oder Farm? Du kannst trotzdem eine TFN beantragen. Welche Adressen das ATO akzeptiert, ganz ohne Mietvertrag.',
    body: `
Ein TFN-Antrag braucht eine australische Adresse, weil die TFN als Brief kommt. Einen Mietvertrag braucht er nicht. Ein Hostel, die Wohnung von Freunden, ein Arbeitsplatz oder ein Postlagerdienst funktionieren alle, solange die Post rund vier Wochen nach dem Antrag zuverlässig abgeholt wird.

## Was akzeptiert das ATO als Adresse?

Das ATO fragt nach einer australischen Wohn- oder Postanschrift und prüft nicht, ob du dort wohnst. Gebraucht wird ein Ort, an dem ein Brief abgeholt und nicht an den Absender zurückgeschickt wird.

- Eine Mietwohnung, WG oder Untermiete
- Ein Hostel oder eine Backpacker-Unterkunft
- Die Wohnung von Freunden oder Verwandten
- Eine Arbeitsplatzadresse mit Zustimmung des Arbeitgebers
- Ein Postlagerdienst mit Straßenadresse

Das Antragsformular kommt mit einer Straßenadresse leichter zurecht als mit einem Postfach, und das lohnt das Wissen, bevor du für eines bezahlst.

## Warum ist eine Hosteladresse die riskante Option?

Ein Hostel ist die häufigste Wahl und der häufigste Ausfall. Große Hostels bearbeiten hunderte Postsendungen pro Woche, Briefe gehen verloren oder zurück, und fast keines leitet Post an einen ausgecheckten Gast weiter.

Ist ein Hostel die einzige realistische Option, frag an der Rezeption, ob Post nach Gastnamen aufbewahrt wird, und sieh ab Tag zehn nach. Die Obergrenze des ATO liegt bei 28 Tagen, der Brief kommt aber meist innerhalb von zwei Wochen.

## Was passiert, wenn du umziehst, bevor der Brief ankommt?

Vor Ankunft des Briefes umzuziehen ist der größte einzelne Grund dafür, dass ein Working Holiday Maker seine TFN nie bekommt. Ist der Brief an die alte Adresse gegangen, schickt das ATO nicht automatisch einen neuen, und ein Rückläufer löst von selbst keinen Neuversand aus.

Die Nummer selbst ist nicht verloren, denn eine TFN wird einmal und dauerhaft ausgestellt. Gescheitert ist die Zustellung. Sie zurückzuholen heißt, die Adresse im ATO-Datensatz zu korrigieren und die Nummer bestätigen zu lassen. Ein zweiter Antrag erzeugt einen Doppeldatensatz, dessen Entwirrung länger dauert als das ursprüngliche Problem. Die Korrektur beschreibt unser Guide zur [Adressänderung beim ATO](/de/blog/how-to-update-address-with-ato).

## Welche Adresse solltest du tatsächlich nehmen?

Sortiere die Optionen danach, ob ein Mensch den Brief bemerken wird. Die etablierte Wohnung von Freunden oder Verwandten ist die beste Antwort, weil echte Haushalte ihre Post öffnen. Danach ein Arbeitsplatz mit Zustimmung des Arbeitgebers, was Farmen routinemäßig für Saisonkräfte machen.

- Die etablierte Wohnung von Freunden oder Verwandten
- Eine Arbeitsplatzadresse mit Zustimmung des Arbeitgebers
- Ein Hostel, in dem du vier Wochen oder länger gebucht hast und das Post nach Namen aufbewahrt
- Ein Postweiterleitungsdienst mit Straßenadresse

Was Zustellungen scheitern lässt, ist vorhersehbar: auszuchecken, bevor der Brief ankommt, Hostels, die unabgeholte Post wöchentlich entsorgen, und eine falsche Wohnungsnummer auf dem Formular.

## Kostet dich die Verzögerung tatsächlich etwas?

Nicht direkt. Der TFN-Antrag ist kostenlos, die Nummer ist dauerhaft, und zu viel einbehaltene Steuer kommt über die Erklärung zurück. Ein später Brief kostet dich am Ende kein Geld.

Er kostet Liquidität in den Monaten dazwischen, und das hängt nicht am Brief. Ab deinem ersten Arbeitstag hast du 28 Tage, um deinem Arbeitgeber eine TFN zu geben, bevor er statt 15 % 45 % einbehalten muss, und das Declaration-Formular hält den laufenden Antrag fest. Über deinen Lohn entscheidet also, ob du es dem Arbeitgeber gesagt hast. Was du in der Zwischenzeit nutzen kannst, steht in unserem Guide zur [TFN-Referenznummer](/de/blog/tfn-reference-number-before-tfn-arrives).

## Was entscheidet, ob dein Antrag glattgeht?

Drei Fakten, und alle drei hast du am Tag des Antrags in der Hand. Ob die Adresse in vier Wochen noch deine Post annimmt. Ob die Angaben im Antrag exakt zu deinem Pass passen, denn eine Abweichung zu den Einwanderungsdaten ist der übliche Grund für eine direkte Ablehnung. Und ob dein Arbeitgeber weiß, dass der Antrag läuft, denn das schützt deinen Einbehaltssatz.

Sobald die Nummer da ist, behandle den Brief als hochwertiges Dokument. Wer sie verlangen darf und wer nicht, steht in unserem Guide zum [Schutz deiner TFN](/de/blog/tfn-security-protect-from-fraud). Und was am Jahresende aus einer 45-%-Phase zurückkommt, kannst du in der [Steuererstattungsschätzung](/de/calculator) durchrechnen.
`,
  },

  // ─── More ABN posts ────────────────────────────────────────────────────────
  'farm-work-and-abns': {
    title: 'Farmarbeit mit ABN: warum das riskant ist',
    description: 'Auf einer Farm bist du fast immer Angestellter, nicht Contractor. Eine ABN kostet dich dann Super, Mindestlohn und den automatischen Steuerabzug.',
    body: `
Eine ABN brauchst du für Farmarbeit nur, wenn die Farm oder die Leiharbeitsfirma dich als Contractor bindet. Setzen sie dich auf die Gehaltsliste, reicht deine [TFN](/de/tfn) und eine ABN wäre sinnlos. Frag vor der ersten Schicht, was gilt, denn die Antwort setzt deine Steuer, deine Super und deine Ansprüche.

## Warum hängt an Farmarbeit so oft eine ABN?

Weil die meisten großen Farmen Pflücker und Packer nicht direkt einstellen. Sie beauftragen eine Leiharbeitsfirma, und ein Teil dieser Firmen lässt Arbeitskräfte Rechnungen stellen, statt sie anzumelden. Das verschiebt Steuer, Super und das Risiko der Unfallversicherung auf dich.

Die Vereinbarung ist legal, wenn sie echt ist. Sie hört auf es zu sein, wenn die Arbeit jedes Merkmal einer Anstellung hat, im Gartenbau üblich: feste Startzeiten im Dienstplan, ein Vorarbeiter, der die Reihe vorgibt, Kisten und Transport der Farm, keine Möglichkeit, diese Woche für jemand anderen zu arbeiten. Eine ABN besorgen zu sollen ist für sich kein Warnzeichen. Sie für einen Job zu besorgen, der exakt wie Anstellung läuft, ist eines.

- Contractor über Leiharbeit: du stellst Rechnungen, es wird nichts einbehalten, es wird keine Super gezahlt, eine [ABN](/de/abn) ist erforderlich
- Direkte Anstellung bei der Farm: Gehaltsliste, 15 % einbehalten, 12 % Super, Award-Sätze gelten, keine ABN nötig

## Was entscheidet, ob Akkordlohn dich zum Contractor macht?

Der Akkordlohn selbst entscheidet gar nichts. Er ist eine Art, Bezahlung zu berechnen, und es gibt ihn in Anstellung wie in Contracting: pro Kiste oder Kilogramm bezahlt zu werden sagt sehr wenig über deinen rechtlichen Status.

Unter dem Horticulture Award haben Akkordarbeiter, die Angestellte sind, Anspruch auf eine garantierte Untergrenze für die gearbeiteten Stunden. Ein schlechter Tag mit schlechtem Obst muss trotzdem auf den Award-Satz aufgefüllt werden. Ein Contractor im Akkord hat keine solche Untergrenze und verdient, was die Kisten hergeben. Das ist meist die größte Einzelsumme, die bei einem Erntejob auf dem Spiel steht.

- Angestellter im Akkord: Award-Untergrenze gilt, Super gezahlt, Payslips ausgestellt
- Contractor im Akkord: keine Untergrenze, keine Super, Rechnungen statt Payslips
- Dasselbe Obst, dieselbe Kiste, dieselbe Halle: der Papierkram ist der einzige Unterschied

## Wann solltest du bei einer ABN-Vereinbarung misstrauisch werden?

Wenn alle Merkmale einer Anstellung vorliegen und der Papierkram etwas anderes behauptet. Vorgegebene Stunden, gestellte Ausrüstung, Arbeit für diesen Betrieb und keinen anderen, ein Kollege mit identischer Arbeit auf der Gehaltsliste mit Super: Dann trägt das Etikett mehr, als die Tatsachen hergeben.

Das ist Sham Contracting und nach dem Fair Work Act verboten. Praktisch heißt das: fehlende 12 % Super, fehlende Award-Untergrenze und fehlender Unfallversicherungsschutz liegen bei dir, bis jemand es angreift. Der Fair Work Ombudsman nimmt diese Beschwerden kostenlos entgegen, und ein 417- oder 462-Visum schwächt deine Stellung nicht.

- Unklarheit darüber, ob du angestellt oder beauftragt bist
- Druck, schnell eine ABN zu registrieren, bevor irgendetwas erklärt wurde
- Identische Arbeit wie Kollegen auf der Gehaltsliste, die Super und Urlaub bekommen
- Deine Stunden, Werkzeuge und dein Einsatzort werden alle vom Betrieb gesteuert

## Welche Steuerpflichten hast du bei ABN-Farmeinkommen?

Es wird nichts einbehalten, die gesamte Steuerrechnung kommt also am Ende des Steuerjahres auf einmal. Der Working-Holiday-Maker-Satz von 15 % auf die ersten 45.000 $ gilt für dein Gesamteinkommen aus ABN und Lohn zusammen; eine Erntesaison im Contracting bleibt für die meisten innerhalb dieser Stufe.

Was sich ändert, ist, wer das Geld in der Zwischenzeit hält. Auf der Gehaltsliste hat das ATO deine 15 % bereits, auf einer ABN hast du sie, und im Oktober müssen sie noch da sein. Von jeder eingehenden Zahlung einen festen Anteil zurückzulegen ist die einzige Methode, die zuverlässig funktioniert. Echte Betriebsausgaben senken die Zahl, der eine Vorteil der ABN-Seite.

- Alles ABN-Einkommen wird auf derselben [Steuererklärung](/de/tax-return) erklärt wie ein etwaiger Lohn
- Es wird keine PAYG-Steuer einbehalten, es ist also nichts gegen die Rechnung vorausgezahlt
- Leiharbeitskunden zahlen auf Contractor-Rechnungen in der Regel keine Super
- Eine Rechnung ohne gültige ABN bekommt vom Zahler 47 % einbehalten

## Zählt ABN-Farmarbeit für das zweite Visumsjahr?

Sie kann zählen, denn Specified Work ist darüber definiert, was die Arbeit ist und wo sie stattfindet, nicht darüber, wie du bezahlt wurdest. Echtes Ernte- oder Landwirtschafts-Contracting in einer berechtigten Postleitzahl zählt zu denselben Bedingungen wie Arbeit auf der Gehaltsliste in derselben Halle.

Was sich ändert, ist die Nachweislast, und zwar zu deinen Ungunsten. Arbeit auf der Gehaltsliste erzeugt automatisch Payslips, die Daten, Stunden und Orte verbinden. ABN-Arbeit erzeugt nur, was du selbst aufhebst: Rechnungen, Bankbelege und Arbeitgeberbestätigungen, die dich an den richtigen Tagen in der richtigen Postleitzahl verorten. Wird eine Scheinkonstruktion später aufgedröselt, ruhen Visumsnachweis und Lohnforderung auf denselben Tatsachen. Bindet dich eine Farm nur über eine ABN, stelle ordentliche Rechnungen, lass jede Zahlung aufs Konto laufen statt bar zu nehmen, und führe ein datiertes Arbeitsprotokoll mit Orten.
`,
  },

  'employee-vs-contractor-australia': {
    title: 'Angestellter oder Contractor: was gilt?',
    description: 'Angestellte bekommen Mindestlohn, Super und Steuerabzug, Contractor keines davon. Entscheidend ist die tatsächliche Arbeitsweise, nicht dein Vertragstitel.',
    body: `
Ob du in Australien Angestellter oder Contractor bist, entscheidet sich daran, wie die Arbeit tatsächlich läuft, und nicht am Wort auf deiner Rechnung. Angestellten wird Steuer einbehalten, sie bekommen 12 % Super und sammeln Urlaub an. Contractor stellen Rechnungen, legen ihre eigene Steuer zurück und bekommen nichts davon. Contractor genannt zu werden macht dich nicht dazu.

## Was entscheidet tatsächlich, ob du Angestellter oder Contractor bist?

Der tatsächliche Gehalt der Vereinbarung entscheidet es. ATO und Fair Work Ombudsman wiegen dieselben Faktoren, statt einen sauberen Einzeltest anzuwenden. Kontrolle ist der schwerste davon: Wenn der Betrieb entscheidet, wann du anfängst, wohin du gehst und wie der Job gemacht wird, weist das stark auf Anstellung hin, egal was dein Papierkram sagt.

Sechs Faktoren tragen das meiste Gewicht, und du weißt sie alle über deinen eigenen Job längst.

- Kontrolle: von ihnen eingeplant oder von dir terminiert
- Werkzeug: ihr Ute, ihre Ausrüstung, ihre Software, oder deine
- Delegation: könntest du rechtmäßig eine Vertretung schicken
- Risiko: kann ein Auftrag dich Geld kosten oder nur einbringen
- Ausschließlichkeit: ein Betrieb das ganze Jahr oder mehrere Kunden
- Integration: ihre Uniform und ihr Namensschild oder deine eigene Rechnung

Kein einzelner Faktor entscheidet. In der Praxis heißt vier oder mehr in Richtung Betrieb Angestellter, was auch immer die [ABN](/de/abn) auf der Rechnung sagt.

## Wie erkennst du, auf welche Seite dein eigener Job fällt?

Sieh dir zuerst die Zahlungsweise an, denn sie trennt die beiden schneller als alles andere. Ein Angestellter bekommt einen Satz für Zeit, hat PAYG-Steuer abgezogen, bevor das Geld ankommt, und sieht [Super](/de/superannuation) auf dem Payslip. Ein Contractor wird gegen Rechnung für ein vereinbartes Arbeitsergebnis bezahlt, bekommt den Bruttobetrag und ist danach für die Steuer zuständig.

Sieh dir dann an, was passiert, wenn du krank bist oder die Arbeit ausgeht. Angestellte sammeln bezahlten Urlaub an oder bekommen als Casuals ein Loading an dessen Stelle, und sie sind über die Unfallversicherung gedeckt. Contractor tragen beide Risiken selbst, und das ist der Tausch für einen höheren Stundensatz.

- Stunden- oder Tageslohn, Steuer bereits herausgenommen: Angestellter
- Pro Kiste, pro Auftrag oder pro Rechnung bezahlt, nichts einbehalten: meist Contractor
- Gesagt bekommen, wann man erscheint und was man trägt: Anzeichen für Anstellung
- Frei, Arbeit anzunehmen oder abzulehnen und in derselben Woche woanders zu arbeiten: Anzeichen für Contracting

## Was ändert die Einstufung in Geld?

Sie ändert vier Dinge auf einmal, und drei davon sind über ein Working-Holiday-Jahr echtes Geld wert. Ein Contractor bekommt nichts davon und muss seine eigene Steuerrechnung aus dem finanzieren, was auf dem Konto landet.

- Super: 12 % der Ordinary Time Earnings für Angestellte, für Contractor in der Regel nichts
- Urlaub: angesammelt oder geladen für Angestellte, keiner für Contractor
- Satzuntergrenze: Award-Minima gelten nur für Angestellte
- Verletzung: Unfallversicherung für Angestellte, eigene Versicherung für Contractor

Das vierte ist der Einbehalt. Ein Angestellter auf einer [TFN](/de/tfn) mit ausgefülltem Declaration wird als Working Holiday Maker mit 15 % einbehalten. Ein Contractor, der ohne gültige ABN Rechnung stellt, bekommt vom Zahler 47 % einbehalten. Das ist eine Regel über die fehlende Nummer, nicht über die Person, und der Überschuss kommt mit der Erklärung zurück.

## Was ist Sham Contracting, und woran erkennst du es?

Sham Contracting ist ein Betrieb, der ein Anstellungsverhältnis als Contracting verkleidet, um keine Super, keinen Urlaub und keine Award-Sätze zahlen zu müssen. Es ist nach dem Fair Work Act illegal, und das verräterische Zeichen: Dein Tag sieht identisch aus wie der eines Kollegen auf der Gehaltsliste, aber dir wurde vor der ersten Schicht gesagt, du sollst eine ABN besorgen.

Das häufigste Muster bei Backpacker-Jobs ist eine Leiharbeitskonstruktion: eingeplant, beaufsichtigt, komplett ausgestattet, nach Stunden bezahlt und trotzdem zur Rechnungsstellung angehalten. Das ist kein Contracting, das das Recht kennt, und dass du etwas unterschrieben hast, ändert die Bewertung nicht.

Zwei Verzweigungen entscheiden, was das für dich wert ist. Warst du in Wahrheit Angestellter, lassen sich nicht gezahlte Super und die Lücke zwischen deiner Bezahlung und dem Award-Satz beide zurückholen, und der Fair Work Ombudsman bearbeitet die Beschwerde kostenlos. War die Vereinbarung echtes Contracting, gilt nichts davon, und das Geld kommt stattdessen über Werbungskosten gegen dein ABN-Einkommen zurück. Der Visastatus schwächt keine der beiden Forderungen.

## Kannst du gleichzeitig Angestellter und Contractor sein?

Ja, und viele Working Holiday Maker sind es. Anstellung in einem Café auf einer [TFN](/de/tfn) und Lieferarbeit auf einer [ABN](/de/abn) ist eine gewöhnliche Kombination, und jeder Strang behält seine eigenen Regeln: 15 % einbehalten auf den Lohn, nichts einbehalten auf die Rechnungen, Super nur auf den Lohn.

Beide Stränge landen am Ende des Steuerjahres auf einer [Steuererklärung](/de/tax-return). Der bereits von deinem Lohn genommene Einbehalt wird auf die Gesamtrechnung angerechnet, und bei viel ABN-Einkommen und wenig Lohn kann aus einer Erstattung ein Zahlbetrag werden. Das lohnt sich vor dem Juni zu prüfen statt nach dem Oktober.
`,
  },

  'can-you-have-tfn-and-abn': {
    title: 'TFN und ABN gleichzeitig? So läuft das',
    description: 'Working Holiday Maker können TFN und ABN parallel nutzen. Wann welche Nummer gilt, wie sich die Steuer unterscheidet und welche Fallen es gibt.',
    body: `
Ja. Ein Working Holiday Maker kann eine Tax File Number und eine Australian Business Number gleichzeitig halten, und die TFN brauchst du zuerst, weil sie für die Registrierung einer [ABN](/de/abn) vorausgesetzt wird. Die TFN deckt Anstellungseinkommen ab, die ABN Contracting-Einkommen. Beides wird in derselben Steuererklärung angegeben.

## Was macht jede der beiden Nummern tatsächlich?

Sie sind nicht austauschbar. Die TFN ist deine Identität gegenüber dem ATO als Person: Sie steht hinter deiner Anstellung, deiner Steuererklärung, deinem Superkonto und deinen Bankzinsen. Die ABN ist deine Identität als Betrieb: Sie steht auf Rechnungen, die du ausstellst, und sagt einem Zahler, dass er eine Leistung kauft und nicht jemanden anstellt.

Der praktische Unterschied zählt mehr als alles andere hier. Anstellungseinkommen kommt bereits versteuert an, weil dein Arbeitgeber einbehält. ABN-Einkommen kommt vollständig an, ohne dass etwas abgezogen wurde, und die Steuer darauf wird einmal abgerechnet, beim Bescheid.

## Ist es normal, auf einem Working-Holiday-Visum beides zu haben?

Vollkommen. Ein typisches Jahr: zehn Monate Gastronomie oder Farmarbeit über die Lohnabrechnung unter einer TFN, daneben Lieferfahrten, ein Marktstand, etwas Fotografie oder ein paar Wochen beauftragte Arbeit unter einer ABN.

Ein Sommer in Cairns im Service, ein Uber-Eats- oder DoorDash-Konto, das am Wochenende läuft, und eine Weinlese im Barossa als Contractor sind drei Einkommensformen in einem Steuerjahr, und alle drei gehören in eine Erklärung.

## Was ist die Falle, die im Oktober zuschlägt?

Vom ABN-Einkommen wird während des Jahres nichts einbehalten, das Geld fühlt sich beim Zufließen also vollständig wie deins an, und der Bescheid kommt danach. Die Working-Holiday-Maker-Sätze gelten über dein kombiniertes Einkommen, ABN-Einnahmen stapeln sich also auf deine Löhne, statt isoliert besteuert zu werden.

Dagegen hilft, rund 15 bis 20 Cent von jedem ABN-Dollar beiseitezulegen, sobald er kommt. Probleme haben fast immer die, die drei gute Monate hatten und den Bruttobetrag für Einkommen hielten.

## Wann solltest du keine ABN verwenden?

Wenn die Arbeit eine Anstellung ist. Über eine ABN für etwas bezahlt zu werden, das in Wahrheit ein Job ist, streicht drei Dinge auf einmal: Es wird keine Steuer einbehalten, keine Superannuation für dich gezahlt, und es entstehen keine Urlaubsansprüche.

Achte auf das Muster: derselbe Job, dieselben Stunden, derselbe Vorgesetzte und derselbe Dienstplan, aber Umstellung von der Lohnabrechnung auf Rechnungsstellung. Das ist Scheinselbstständigkeit, sie ist rechtswidrig, und sie passiert, weil sie für den Betrieb billiger ist. Sieht der Job wie eine Anstellung aus, ist er rechtlich eine Anstellung, egal was auf dem Papier steht, und die [Unterscheidung zwischen Angestelltem und Contractor](/de/blog/employee-vs-contractor-australia) entscheidet sich daran, wie die Arbeit tatsächlich abläuft.

## Wofür bist du verantwortlich, wofür ein Angestellter nicht?

Für deine eigenen Aufzeichnungen. Dein Arbeitgeber meldet deinen Lohn über die Lohnabrechnung automatisch ans ATO, Anstellungseinkommen taucht in deiner Erklärung also auf, ob du es nachhältst oder nicht. ABN-Einkommen tut das nicht, und du bist der Einzige, der weiß, was hereingekommen ist.

Also eine Kopie jeder ausgestellten Rechnung und jeder erhaltenen Zahlung aufbewahren, dazu die Belege für alles, was du dagegen geltend machst. Und die GST-Grenze im Blick behalten: Die Registrierung wird verpflichtend, sobald dein Geschäftsumsatz in einem Jahr 75.000 $ erreicht, und beim Rideshare-Fahren ab dem ersten Dollar.

## Was macht die ABN-Hälfte mit deinem Bescheid?

Beide Nummern zu halten ist unkompliziert. Was die ABN-Hälfte deines Einkommens mit deinem Bescheid macht, entscheiden diese Fakten:

- Ob deine ABN-Arbeit wirklich Contracting ist oder eine Anstellung mit anderem Hut. Das verändert deine Super, deinen Urlaub und wer die Steuer trägt.
- Ob der größte Teil deines ABN-Einkommens von einem einzigen Zahler kommt. Wo 80 % oder mehr aus einer Quelle stammen, können die Regeln zu Personal Services Income einschränken, was du dagegen absetzen darfst.
- Ob du die GST-Grenze überschritten hast oder Rideshare fährst, wo GST ab der ersten Fahrt gilt.
- Ob du während des Jahres Geld zurückgelegt hast. Das ist der Unterschied zwischen einem Bescheid im Oktober als Routine und als Schock.
- Ob es eine Phase auf Lohn gab, bevor deine TFN vorlag, die einen Teil des Jahres auf 45 % setzt und in die Gegenrichtung zieht.

Beide Einkommensströme werden in derselben [Steuererklärung als Working Holiday Maker](/de/tax-return) abgerechnet, und vorab kannst du deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  'how-to-cancel-your-abn': {
    title: 'ABN kündigen, bevor du zurückfliegst',
    description: 'Eine nach dem Rückflug offen gelassene ABN erzeugt weiter Abgabeerwartungen des ATO. Wann die Kündigung wirken sollte, was vorher zu klären ist und was trotzdem noch eingereicht werden muss.',
    body: `
Eine ABN sollte beendet werden, wenn du aufhörst, auf Rechnung zu arbeiten, und nicht, wenn es dir zufällig einfällt. Eine Gebühr fällt dafür nicht an, und die Beendigung wirkt zu dem Datum, das du angibst, und nicht zu dem, an dem sie eingereicht wird. Eine offen gelassene ABN erzeugt Abgabeerwartungen, die du noch aus einem anderen Land beantworten wirst.

## Warum zählt eine offene ABN, nachdem du weg bist?

Weil die ABN eine Registrierung mit laufenden Pflichten ist und keine verdiente Urkunde. Solange sie aktiv ist, kann das ATO Activity Statements und Erklärungen erwarten, und bei GST-Registrierung ein BAS, ob du Rechnungen gestellt hast oder nicht.

Korrespondenz läuft weiter an die hinterlegte australische Adresse, bei den meisten Backpackern ein Hostel oder eine WG, die sie Monate zuvor verlassen haben. Nichts wird nachgesendet, Mitteilungen bleiben unbeantwortet, und du erfährst davon erst, wenn etwas eskaliert ist. Eine offene Registrierung mit unbetreuter Adresse ist zudem ein leichtes Ziel für Identitätsbetrug.

## Was muss vor der Beendigung abgeschlossen sein?

Alles, was über die ABN läuft, denn die Beendigung schließt die Registrierung und nicht die daran hängenden Pflichten. Nach der Beendigung wird spätes Rechnungstellen umständlich, die Reihenfolge zählt also.

- Jede offene Rechnung ausstellen, solange die ABN noch aktiv ist
- Ausstehende Zahlungen eintreiben, denn aus dem Ausland ist das schwerer
- Fällige BAS einreichen, falls du für GST registriert warst, und diese Registrierung getrennt beenden
- Das bis zum Beendigungsdatum verdiente ABN-Einkommen festhalten, denn es gehört weiterhin in deine Erklärung
- Die Aufzeichnungen für die Werbungskosten aufbewahren, die du gegen dieses Einkommen geltend machen willst

Die GST-Registrierung wird vergessen. Die ABN zu beenden beendet nicht in jedem Fall automatisch eine GST-Registrierung, und eine lebende GST-Registrierung erzeugt eigene Quartalspflichten.

## Hebt die Beendigung deine Abgabepflicht auf?

Nein. Die Beendigung beendet die Registrierung für die Zukunft. Bereits darunter verdientes Einkommen bleibt steuerpflichtig, und die Erklärung für dieses Jahr muss weiterhin eingereicht werden.

Ist das Steuerjahr bei deiner Abreise noch nicht zu Ende, wird die Erklärung nach dem 1. Juli von überall aus eingereicht. Was dafür nötig ist, steht in unserem Guide zur [Abgabe aus dem Ausland](/de/blog/how-to-lodge-tax-return-from-overseas), vor allem ein offenes australisches Bankkonto.

## Welches Datum solltest du wählen?

Das Datum, an dem du die Tätigkeit tatsächlich beendet hast, und nicht das heutige. Wer zuletzt im März Rechnung gestellt hat und im Juni an die Beendigung denkt, beendet zum März.

Das Datum definiert den Zeitraum, in dem das ATO dich als Unternehmer ansieht. Eine zu spät datierte Beendigung suggeriert Monate an Tätigkeit ohne Einkommen und ohne Meldung, und dieses Muster erzeugt Rückfragen.

## Solltest du sie offen halten für den Fall der Rückkehr?

Fast nie. Die Nummer bleibt dauerhaft mit dir verbunden und lässt sich reaktivieren, wenn du zurückkommst und wieder contractest. Sie aktiv zu lassen bringt nichts.

Es kostet fortlaufende Abgabeerwartungen für Jahre, in denen du gar nicht im Land warst. Die Reaktivierung ist dagegen ein kurzer Vorgang.

## Gibt es sonst noch etwas auf dem Weg hinaus zu schließen?

Die Superannuation, wobei sie umgekehrt funktioniert. ABN-Contracting erzeugt in der Regel keine Super, weil Contractor die Garantie nicht bezahlt bekommen, aber die meisten Working Holiday Maker hatten daneben Anstellung, und die hat sie erzeugt.

Super kann erst beantragt werden, wenn dein Visum abgelaufen ist und du Australien verlassen hast. Ein DASP-Antrag wird typischerweise innerhalb von etwa 28 Tagen genehmigt, und der steuerpflichtige Anteil wird bei Working Holiday Makern mit 65 % besteuert. Unser [Superannuation-Guide](/de/superannuation) behandelt das Timing, das sich nach dem Antrag nicht mehr ändern lässt.

## Was muss vor dem Beendigungsdatum erledigt sein?

Die Beendigung ist einfach. Was drumherum passieren muss, hängt davon ab, wie die ABN genutzt wurde. Diese Punkte gehören vor das Beendigungsdatum und nicht danach.

- Ob du für GST registriert warst, denn das ist eine eigene Registrierung mit eigenem letzten BAS.
- Ob noch Rechnungen offen sind, denn das Eintreiben nach der Beendigung ist schwerer.
- Zu welchem Datum die Tätigkeit wirklich endete, denn das ist das zu verwendende Datum.
- Ob das Steuerjahr abgeschlossen ist, denn davon hängt ab, wann die letzte Erklärung eingereicht werden kann.
- Ob du auch Anstellungseinkommen hattest, denn dort sitzen Super und Einbehalt.
- Ob du vorhast, nach Australien zurückzukehren, was selten ein Grund ist, sie offen zu lassen.

Das letzte ABN-Einkommen wird in der [Working-Holiday-Steuererklärung](/de/tax-return) neben etwaigem Lohn erklärt, und wie dieses Jahr ausgeht, kannst du vorher im [Erstattungsrechner](/de/calculator) durchspielen.
`,
  },

  'gst-and-abn-for-working-holiday-makers': {
    title: 'GST und ABN: ab wann musst du dich melden?',
    description: 'Erst ab 75.000 Dollar Umsatz musst du dich für GST registrieren. Beim Rideshare-Fahren gilt die Registrierungspflicht dagegen ab dem ersten Dollar.',
    body: `
Die meisten Working Holiday Maker mit einer [ABN](/de/abn) haben mit GST nie zu tun. Die Registrierung ist Pflicht, sobald der Umsatz in einem Zwölfmonatszeitraum 75.000 $ erreicht, und fast niemand auf einem 417- oder 462-Visum kommt in die Nähe. Die eine Gruppe, die ab dem ersten Dollar registrieren muss, sind Fahrer, die Passagiere gegen Entgelt befördern.

## Was misst die 75.000-$-Schwelle eigentlich?

Den Bruttoumsatz aus deiner Geschäftstätigkeit über jeden rollierenden Zwölfmonatszeitraum, vor Abzug jeder Ausgabe. Nicht den Gewinn, und keinen Lohn, den du auf einer [TFN](/de/tfn) verdienst: Ein Jahr Cafearbeit plus etwas freiberufliches Einkommen liegt weit von der Schwelle entfernt, auch wenn die Gesamtsumme groß aussieht.

Der Test blickt vorwärts wie rückwärts. Du musst dich innerhalb von 21 Tagen nach dem Monat registrieren, in dem dein Umsatz 75.000 $ erreicht, oder ab dem Punkt, an dem du das vernünftigerweise erwartest. Diese Erwartung entsteht bei Working Holiday Makern fast nie, weil das Visum selbst begrenzt, wie lange die Tätigkeit laufen kann.

- Unter 75.000 $ ABN-Umsatz: die Registrierung ist für die meisten Tätigkeiten freiwillig
- 75.000 $ oder mehr: die Registrierung ist innerhalb von 21 Tagen Pflicht
- Anstellungseinkommen über die Gehaltsliste zählt nie zur Schwelle
- Umsatz ist brutto, Sprit, Werkzeug und Plattformgebühren senken ihn also nicht

## Wer muss sich unabhängig vom Einkommen registrieren?

Wer Taxifahrten oder Ride Sourcing anbietet, also zahlende Passagiere befördert. Fährst du für Uber, DiDi, Ola oder ein Taxiunternehmen, gilt die Schwelle für dich nicht: GST-Registrierung ab der ersten Fahrt, selbst wenn es nur eine Handvoll bleibt.

Essenslieferung ist die Unterscheidung, die falsch verstanden wird, und die Plattformen erklären sie selten. Essen für Uber Eats, DoorDash oder Menulog auszuliefern ist keine Personenbeförderung, es gilt also die gewöhnliche 75.000-$-Schwelle, und die meisten Lieferfahrer müssen sich nie registrieren. Wer beides macht, wird über die Passagierseite erfasst und muss sich für alles registrieren.

- Passagiere gegen Fahrpreis: GST ab dem ersten Dollar, keine Schwelle
- Nur Essens- und Paketlieferung: es gilt die gewöhnliche 75.000-$-Schwelle
- Beides unter derselben ABN: Registrierung erforderlich, für alles

## Was passiert, wenn du nicht registriert bist?

Nichts. Du stellst Rechnungen ohne GST aus, du reichst keine Business Activity Statements ein, und deine einzige Pflicht unter der ABN ist, das Einkommen in deiner [Steuererklärung](/de/tax-return) zu erklären und Einkommensteuer auf den Nettobetrag zum Working-Holiday-Maker-Satz von 15 % auf die ersten 45.000 $ zu zahlen.

Das ist die gewöhnliche Lage für die große Mehrheit der Backpacker mit einer ABN: Unterhalb der Schwelle nicht registriert zu bleiben ist regelkonform und kein Trick. Häufiger als eine verspätete Registrierung ist der umgekehrte Fehler.

## Wozu verpflichtet dich eine Registrierung tatsächlich?

Dazu, 10 % auf das aufzuschlagen, was du berechnest, es zu halten und es dem ATO nach einem Zeitplan zu übergeben. Die 10 % sind zu keinem Zeitpunkt dein Geld, weshalb es so schmerzhaft rückgängig zu machen ist, wenn sie ausgegeben wurden, und für die meisten werden sie quartalsweise auf einem Business Activity Statement gemeldet.

Sie erlaubt dir dafür, die GST auf echte Betriebsausgaben zurückzuholen. Bei Kosten aus Sprit und einem Handytarif rechtfertigen die Gutschriften vier BAS-Abgaben im Jahr und die Buchführung dahinter selten.

- Auf Rechnungen 10 % berechnen und getrennt von deinem eigenen Geld halten
- Quartalsweise ein BAS einreichen, bei höherem Umsatz monatlich
- Gutschriften für GST auf echte Betriebsausgaben geltend machen
- Die Registrierung beenden, wenn die Tätigkeit endet, und offene BAS einreichen

## Was ist der häufigste GST-Fehler von Backpackern?

Sich zu registrieren, obwohl es nicht nötig war. Das GST-Häkchen im ABN-Antrag wird gesetzt, weil es professioneller wirkt oder weil es jemand auf einer Baustelle geraten hat, und die folgende Pflicht ist echt: BAS-Abgaben beginnen sofort und werden weiter fällig, ob Einkommen kommt oder nicht.

Die Reparatur ist nicht kompliziert, sobald es erkannt ist. Die Registrierung lässt sich zum Ende der Tätigkeit beenden oder ab ihrem Beginn, wo sie nie hätte bestehen dürfen, und offene Statements werden als Nullmeldung eingereicht, wo das zutrifft. Wie viel Arbeit das macht, entscheidet, wie lange es unbemerkt lief: Jedes vergangene Quartal ist eine eigene Abgabe, die trotzdem abgerechnet werden muss.
`,
  },

  'sole-trader-vs-company-australia-working-holiday': {
    title: 'Sole Trader oder Company: was passt zu dir?',
    description: 'Fast alle Backpacker arbeiten als Sole Trader, also mit einer ABN und ohne eigene Gesellschaft. Eine Company lohnt sich in einer Working Holiday selten.',
    body: `
Sole Trader, fast immer. Ein Sole Trader bist du selbst, tätig unter einer ABN, wobei das Geschäftseinkommen auf deine persönliche Erklärung zu Working-Holiday-Maker-Sätzen fließt. Eine Company ist eine eigene juristische Person mit eigener Steuer von 25 %, eigenen Meldungen und eigenen Kosten. Auf Backpacker-Einkommensniveau verliert die Company in jeder Hinsicht.

## Was ist der tatsächliche Unterschied?

Die rechtliche Trennung. Ein Sole Trader ist vom Geschäft nicht getrennt: Das Einkommen geht auf deine individuelle Erklärung, und du haftest persönlich für das, was das Geschäft schuldet. Die Registrierung ist die ABN und sonst nichts.

Eine Company hat ihre eigene ABN, ihre eigenen Steuerpflichten und eine beschränkte Haftung, die persönliches Vermögen schützt. Sie verlangt außerdem eine Registrierung bei ASIC, jährliche Review-Gebühren, getrennte Geschäftskonten, eine eigene Körperschaftsteuererklärung, eine Director Identification Number und laufende Direktorenpflichten. Dieser Aufwand besteht, ob die Company Umsatz macht oder nicht.

## Wie vergleichen sich die Steuersätze wirklich?

Schlecht für die Company. Ein Sole Trader, der Working Holiday Maker ist, zahlt 15 % auf die ersten 45.000 $ Geschäftseinkommen und 30 % darüber. Eine Company zahlt pauschal 25 % ab dem ersten Dollar.

Bei 30.000 $ ABN-Einkommen sind das als Sole Trader 4.500 $ Steuer und als Company 7.500 $, noch vor allen laufenden Kosten. Danach muss das Geld als Gehalt oder Dividende aus der Company heraus und wird in deinen Händen erneut besteuert. In dieser Größenordnung gewinnt die Company nie.

## Was würde eine Company tatsächlich kosten?

Genug, um den Vergleich einseitig zu machen. Die ASIC-Registrierung liegt in der Größenordnung von 600 $, die jährliche Review-Gebühr einige hundert Dollar mehr, eine Körperschaftsteuererklärung muss getrennt von deiner persönlichen erstellt werden, und zu den Direktorenpflichten gehört eine Identitätsprüfung.

Das stehende Problem ist der Abgang. Ein visumsbefristeter Direktor, der Australien mit einer schlafenden Company verlässt, hat weiterhin ASIC-Pflichten, die in seiner Abwesenheit auflaufen. Ein Sole Trader schließt das Ganze durch das [Beenden der ABN](/de/blog/how-to-cancel-your-abn), kostenlos und in Minuten.

## Wann würde eine Company wirklich Sinn ergeben?

In Situationen, die Working-Holiday-Arbeit nie beschreibt: mehrere Eigentümer, haftungsintensives Contracting, bei dem eine Versicherung nicht reicht, oder ein Einkommen hoch genug, dass die Vorteile die laufenden Kosten übersteigen. Diese Schwelle liegt weit über dem, was ein 417- oder 462-Jahr hergibt.

Lizenzierte Spezialgewerke wie Elektrik und Sanitär sind der nächstliegende reale Fall, und die verlangen Qualifikationen, die die meisten nicht haben. Lieferfahren, Farm-Contracting, Reinigung und freiberufliche Arbeit kommen dem nicht nahe.

## Was, wenn eine Plattform oder ein Auftraggeber darauf besteht?

Behandle sie als etwas zu Untersuchendes, nicht als Anweisung. Manche Auftraggeber arbeiten legitim nur mit eingetragenen Contractors, meist aus Versicherungsgründen auf großen Baustellen.

Andernorts schiebt die Forderung Pflichten von dem weg, der sie tragen sollte. Will jemand dich für beaufsichtigte Stundenarbeit in eine Company drängen, kommt zuerst die Einstufungsfrage, und wie die entschieden wird, steht in unserem Guide zum [Test Angestellter gegen Contractor](/de/blog/employee-vs-contractor-australia).

## Was ist mit persönlicher Haftung als Sole Trader?

Sie ist real, aber meist gering, und günstiger zu versichern als zu umstrukturieren. Bei Reinigung, Gastronomie, Lieferdiensten und einfachen Gewerken ist das Risiko begrenzt, und eine Betriebshaftpflicht deckt das meiste zu überschaubaren Kosten.

Vergleiche die Versicherungsprämie mit den Gesamtkosten für Gründung und Unterhalt einer Company über ein bis zwei Jahre. Für fast jeden Working Holiday Maker gewinnt die Prämie deutlich.

## Sind Partnership oder Trust je relevant?

Selten, aus denselben Gründen. Eine Partnership sind zwei oder mehr Personen, die Geschäftseinkommen teilen, mit eigener Erklärung und eigenen Fragen dazu, wer wofür haftet. Ein Trust hält Einkommen oder Vermögen für Begünstigte, vor allem für Vermögensschutz und Verteilungsflexibilität.

Beide fügen einer Situation Verwaltung hinzu, die nicht die Größe hat, um sie zu rechtfertigen. Betreiben zwei Backpacker wirklich gemeinsam etwas, ist das eine Beratungsfrage und kein Regelfall.

## Ändert die Struktur, was du absetzen kannst?

Kaum, und das nimmt das letzte Argument fürs Eintragen weg. Ein Sole Trader setzt dieselben echten Betriebsausgaben ab wie eine Company: Werkzeug, Fahrzeugkosten über Fahrtenbuch oder Kilometersatz, den beruflichen Anteil von Telefon und Internet, Versicherungen, Lizenzen und Gebühren für die Verwaltung deiner Steuerangelegenheiten.

Was die Company hinzufügt, sind keine Abzüge, sondern Verwaltung, und die wird selbst zum Kostenpunkt. Was in beiden Fällen absetzbar ist, steht in unserem Guide zu [ABN-Werbungskosten](/de/blog/abn-deductions-business-expenses).

## Verschiebt einer dieser Punkte die Standardantwort?

Die Standardantwort ist klar, und die Tatsachen, die sie verschieben würden, sind konkret und selten. Beschreibt keiner der folgenden Punkte deine Lage, ist Sole Trader die Antwort.

- Wie viel du unter der ABN zu verdienen erwartest, denn der Working-Holiday-Maker-Satz schlägt die Körperschaftsteuer über die gesamte realistische Spanne.
- Ob sonst jemand die Arbeit mitbesitzt.
- Ob die Arbeit eine Haftung trägt, die eine Versicherung nicht vernünftig abdecken kann.
- Ob ein Auftraggeber die Eintragung wirklich verlangt, und warum.
- Wie lange du in Australien sein wirst, denn Company-Pflichten laufen nach deiner Abreise weiter.
- Ob die Vereinbarung überhaupt Contracting ist, die erste Frage und nicht die letzte.

Wie die Struktur auch aussieht, das Einkommen wird in der [Working-Holiday-Steuererklärung](/de/tax-return) abgerechnet, und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du weißt, worauf das Jahr hinauslief.
`,
  },

  'abn-invoicing-requirements-australia': {
    title: 'Tax Invoice mit ABN: alle Pflichtangaben',
    description: 'Tax Invoices müssen ABN, GST-Status, Datum und weitere Pflichtangaben enthalten, um gültig zu sein. Die komplette Checkliste, Punkt für Punkt.',
    body: `
Eine Tax Invoice unter einer [ABN](/de/abn) muss deinen Namen, deine ABN, das Datum, eine Beschreibung der Arbeit und den Gesamtbetrag ausweisen. GST-Zeilen gehören nur darauf, wenn du für GST registriert bist. Lässt du die ABN weg, muss der Zahler 47 % der Zahlung einbehalten.

## Was muss auf jeder ABN-Rechnung stehen?

Fünf Angaben sind auf jeder Rechnung Pflicht, unabhängig vom Betrag. Der Name muss der bei der ABN registrierte rechtliche Name sein, kein selbst erfundener Handelsname.

- Dein Name, exakt wie zur ABN registriert
- Deine ABN
- Das Ausstellungsdatum
- Eine Beschreibung der Waren oder Leistungen
- Der zu zahlende Gesamtbetrag

Sobald die Rechnung 75 $ ohne GST erreicht und du für GST registriert bist, kommt mehr dazu: die klar sichtbaren Worte Tax Invoice, der GST-Betrag oder ein Hinweis, dass die Summe GST enthält, und ab 1.000 $ der Name oder die ABN des Käufers.

## Musst du GST überhaupt ausweisen?

Nur wenn du registriert bist, und die meisten Working Holiday Maker sind es nicht. Pflicht wird die GST-Registrierung, sobald der Umsatz in einem Steuerjahr 75.000 $ übersteigt. ABN-Einkommen von Backpackern liegt meist deutlich darunter.

GST auszuweisen, ohne registriert zu sein, berechnet eine Steuer, die du nicht abführen kannst, und verschafft dem Zahler eine Gutschrift, die ihm nicht zusteht. Personen-Rideshare ist die Ausnahme von der Schwelle und verlangt Registrierung ab dem ersten Dollar, siehe unseren Guide zu [GST und ABN](/de/blog/gst-and-abn-for-working-holiday-makers).

## Was passiert, wenn du die ABN weglässt?

Die No-ABN-Einbehaltsregel verlangt von einem Unternehmen, das für Waren oder Leistungen ohne angegebene ABN zahlt, 47 % der Zahlung einzubehalten und ans ATO abzuführen. Sie gilt auch, wenn deine ABN gültig ist und nur auf der Rechnung fehlt.

Das Geld ist nicht verloren. Es wird gegen deine Steuerschuld angerechnet, der Überschuss kommt mit der eingereichten [Steuererklärung](/de/tax-return) zurück. Es kostet Zugriff: Bei einer Rechnung über 2.000 $ liegen 940 $ monatelang beim ATO.

## Warum werden Rechnungen abgelehnt?

Ablehnungen liegen selten an Steuerregeln, meist an kleinen Abweichungen, die ein automatisiertes System stoppen. Zahler prüfen eine ABN über das öffentliche ABN-Lookup: Passt der Name dort nicht zum Namen auf der Rechnung, läuft sie nicht weiter.

- Ein Handelsname auf der Rechnung, während die ABN auf deinen persönlichen Namen registriert ist
- Eine falsche Ziffer in der ABN, die das Lookup scheitern lässt
- Keine Rechnungsnummer, wo der Zahler eine eindeutige Referenz braucht
- Ein Datum in amerikanischer Schreibweise statt als TT/MM/JJJJ
- Keine Bankverbindung, sodass ein zahlungswilliger Kunde nicht zahlen kann

## Was sorgt tatsächlich dafür, dass du bezahlt wirst?

Korrekte Pflichtfelder sorgen dafür, dass eine Rechnung angenommen wird. Bezahlt wird sie durch Gewohnheiten. Die stärkste ist, am Tag der Fertigstellung zu stellen: Eine Rechnung, die drei Wochen später von jemandem kommt, der die Region längst verlassen hat, wird am leichtesten ignoriert.

- Am Tag der Fertigstellung Rechnung stellen
- Zahlungsziel nennen: sieben Tage sind für Arbeitsleistung normal, Schweigen lädt zu dreißig ein
- Bestellnummer oder den Namen des Vorarbeiters angeben, wo die Baustelle damit arbeitet
- Am ersten überfälligen Tag schriftlich nachfassen, mit angehängter Rechnung
- Vor einem großen Auftrag ein ABN-Lookup auf einen unbekannten Zahler laufen lassen, das abgemeldete Firmen zeigt

## Was entscheidet, ob die Rechnung oder die Konstruktion das eigentliche Problem ist?

Die Rechnung ist eine Formularfrage. Ob du überhaupt Rechnungen stellen solltest, ist die größere. Wenn der Betrieb deine Stunden festlegt, die Arbeit beaufsichtigt und die Ausrüstung stellt, ist das eine Anstellung, und eine Rechnung ändert daran nichts.

Für beaufsichtigte Schichtarbeit Rechnungen stellen zu sollen, ist Scheinselbstständigkeit. Sie kostet dich die 12 % [Superannuation](/de/superannuation), den Award-Satz, die Zuschläge und den Unfallversicherungsschutz. Den entscheidenden Test beschreibt unser Guide zu [Angestellter gegen Contractor](/de/blog/employee-vs-contractor-australia), und er lohnt sich vor der ersten Rechnung.

## Was solltest du tun, bevor du Australien verlässt?

Zwei Dinge, und keines davon ist die Rechnungsstellung. Unbezahlte Rechnungen bleiben rechtlich einforderbar, nachdem du weg bist, sind aus einem anderen Land in Backpacker-Größenordnung aber kaum einzutreiben. Kurze Zahlungsziele und schnelles Nachfassen, solange du hier bist, sind das einzige System, das funktioniert.

Das zweite ist die ABN selbst, die abgemeldet gehört, wenn das Contracting endet. Eine offen gelassene ABN erzeugt jahrelang ATO-Korrespondenz und Abgabeerwartungen, auch lange nach der Heimkehr. Was zuerst geschlossen gehört, steht in unserem Guide zum [Abmelden einer ABN](/de/blog/how-to-cancel-your-abn). Was für das Jahr insgesamt herauskommt, zeigt der [Rechner](/de/calculator).
`,
  },

  // ─── More Tax Return posts ─────────────────────────────────────────────────
  'amending-tax-return-australia': {
    title: 'Steuererklärung ändern: Fristen und Ablauf',
    description: 'Eine eingereichte Erklärung lässt sich innerhalb von zwei Jahren nach dem Bescheid ändern, zu deinen Gunsten wie zu deinen Ungunsten. Für das ATO läuft dieselbe Zweijahresuhr.',
    body: `
Eine australische Steuererklärung kann nach dem Bescheid berichtigt werden, in der Regel binnen zwei Jahren ab dem Datum des Steuerbescheids. Berichtigungen laufen in beide Richtungen: vergessene Abzüge und ausgelassenes Einkommen. Für das ATO gilt dieselbe Zweijahresuhr.

## Wofür ist eine Berichtigung da?

Eine Berichtigung korrigiert eine Erklärung, die mit etwas Falschem oder Fehlendem eingereicht wurde. Sie ist kein Streit, sondern kostenlose Routine. Bei Working Holiday Makern erzeugen die meisten Berichtigungen eine größere Erstattung.

- Ein Abzug, der nie geltend gemacht wurde
- Einkommen eines Arbeitgebers, das ausgelassen wurde
- Ein Offset oder eine Befreiung, die übersehen wurde
- Falsch eingetragene Zahlen
- Eine Medicare-Position, die vor Eintreffen des Papiers festgelegt wurde

Die letzte ist der häufigste einzelne Grund für eine Berichtigung bei Working Holiday Makern. Ein Medicare Entitlement Statement von Services Australia braucht üblicherweise Wochen, und eine in der Zwischenzeit eingereichte Erklärung ging ohne es raus.

## Wie lange hast du Zeit?

Zwei Jahre ab dem Datum des ursprünglichen Steuerbescheids, für Einzelpersonen und kleine Unternehmen. Vier Jahre gelten für manche anderen Steuerpflichtigen, und bei Betrug oder Hinterziehung gibt es überhaupt keine Grenze.

Die Uhr läuft ab dem Bescheid, nicht ab dem Ende des Steuerjahres. Eine im September 2026 veranlagte Erklärung kann also bis September 2028 berichtigt werden.

## Was ist der Unterschied zwischen Berichtigung und Einspruch?

Sie zu verwechseln verbrennt eine Frist. Eine Berichtigung repariert etwas, das in der eingereichten Erklärung falsch war. Ein Einspruch greift eine Entscheidung des ATO an.

- Du hast die Medicare-Befreiung vergessen: berichtigen
- Du bist mit der Beurteilung deines Wohnsitzes durch das ATO nicht einverstanden: Einspruch
- Das ATO hat geschrieben und Änderungen vorgeschlagen: mit Unterlagen antworten statt vorsorglich zu berichtigen

Den zweiten Weg mit eigenen Fristen und eigener Struktur behandelt unser Guide zum [Einspruch gegen eine ATO-Entscheidung](/de/blog/appealing-ato-decision-australia).

## Was passiert mit deinem Geld?

Erhöht die Berichtigung die Erstattung, wird der Zusatzbetrag auf dein benanntes Konto gezahlt, in der Regel binnen einiger Wochen bis weniger Monate. Verringert sie die Erstattung, erlässt das ATO einen geänderten Bescheid und die Differenz wird fällig, üblicherweise binnen 21 Tagen.

Eine Berichtigung, die vergessenes Einkommen nachträgt, erzeugt eine Schuld und ist trotzdem das Richtige. Die Alternative ist, dass das ATO es über Datenabgleich findet und auf denselben Betrag Zinsen und eine Strafe legt.

## Zieht eine Berichtigung Aufmerksamkeit auf dich?

Nein. Berichtigungen sind ein gewöhnlicher Teil des Systems, und eine echte, belegte Korrektur ist kein Alarmsignal. Eine freiwillig offengelegte Unrichtigkeit wird günstiger behandelt als dieselbe, die das ATO findet.

Aufmerksamkeit erzeugt ein Muster großer, unbelegter Ansätze. Eine einzelne Berichtigung für eine Medicare-Befreiung oder ein vergessenes Paar Arbeitsschuhe ist unsichtbar.

## Kannst du nach der Abreise aus Australien berichtigen?

Ja. Das Verfahren verlangt nicht, dass du im Land bist, und das Zweijahresfenster gilt überall. Eine zusätzliche Erstattung geht auf ein australisches Konto.

Das Konto ist der praktische Engpass, nicht die Berichtigung. Ist es geschlossen, kostet die Organisation eines anderen Zahlwegs Zeit. Halte es also am Leben, bis das Jahr wirklich abgeschlossen ist, nicht nur bis zum Abflug.

## Was entscheidet, ob eine Berichtigung sich lohnt?

Zwei Dinge: die Größe der Korrektur und ob sie belegbar ist. Ein Abzug von 40 $ ohne Quittung ist die Zeit nicht wert. Ein nachgetragenes Medicare Entitlement Statement in einem Jahr, in dem die Levy von 2 % berechnet wurde, ist bei 25.000 $ Verdienst rund 500 $ wert und kostet denselben Aufwand.

Das Muster in den berichtigten Erklärungen ist gleichbleibend. Medicare-Befreiungen, die nicht beantragt wurden, weil das Statement zu spät kam. Abzüge, die übersehen wurden, weil die Quittungen auf einem anderen Handy lagen. ABN-Einkommen an der falschen Stelle gemeldet. Eine Phase bei 45 %, bevor die TFN da war. Fast alle gehen nach oben und stammen aus Erklärungen, die schnell statt vollständig eingereicht wurden. Wenn du eine [Steuererklärung](/de/tax-return) selbst eingereicht hast und sie Wohnsitz, Medicare und jeden Arbeitgeber nicht behandelt hat, lohnt ein zweiter Blick, solange die zwei Jahre offen sind. Was dabei herauskommen könnte, zeigt der [Rechner](/de/calculator).
`,
  },

  'ato-payment-plan-tax-debt-australia': {
    title: 'Steuerschuld beim ATO: Zahlplan vereinbaren',
    description: 'Das ATO vereinbart Ratenzahlungen, auch wenn du längst abgereist bist. Zinsen laufen weiter, deshalb ist eine frühe Vereinbarung günstiger als Abwarten.',
    body: `
Ja. Wenn du eine ATO-Rechnung nicht bis zum Fälligkeitsdatum zahlen kannst, lässt ein Zahlungsplan dich sie in Raten abtragen. Zinsen laufen über den General Interest Charge weiter, ein Plan kostet also mehr als sofort zu zahlen und deutlich weniger als Schweigen. Steuerschulden verfallen nicht, wenn du Australien verlässt.

## Warum schuldet ein Working Holiday Maker überhaupt etwas?

Weil hinter irgendetwas im Jahr kein Einbehalt stand. Die Kandidaten sind wenige: ABN- oder Contractor-Einkommen, bei dem die volle Rechnungssumme dich erreichte, ein Declaration mit zu Unrecht beanspruchtem Freibetrag, und ein Jahr bar bezahlter Arbeit ohne jeden Einbehalt.

Keiner davon ist ein Fehler, den man im Moment bemerkt. Alle drei fühlen sich jede Woche wie etwas mehr Geld an und kommen Monate später als eine einzige Zahl an.

## Was ist eine Zahlungsvereinbarung, und wann stimmt das ATO zu?

Sie ist eine förmliche Vereinbarung, in Raten statt als Einmalbetrag zu zahlen, meist wöchentlich oder zweiwöchentlich per Lastschrift, typischerweise mit Tilgung innerhalb von zwei Jahren. Solange sie besteht und eingehalten wird, schützt sie dich vor aktiven Inkassomaßnahmen.

Das ATO stimmt in der Regel zu, wenn der Betrag verhältnismäßig ist, du eine echte Unfähigkeit zur vollständigen Zahlung zeigen kannst, hinter den Raten eine Einkommensquelle steht und du keine frühere Vereinbarung gebrochen hast. Es ist deutlich entgegenkommender gegenüber jemandem, der vor dem Fälligkeitsdatum auf es zugeht, als gegenüber jemandem, dem es hinterherlaufen musste.

## Was kostet es, länger zu brauchen?

Es kostet den General Interest Charge, der täglich auf den offenen Saldo aufgezinst wird und deutlich über dem Leitzins liegt. Er läuft ab dem ursprünglichen Fälligkeitsdatum, nicht ab dem Start des Plans, die Uhr tickt also meist schon eine Weile.

Für verspätete Abgabe gibt es eine eigene Strafe, getrennt von der verspäteten Zahlung. Die Failure-to-Lodge-Strafe wird mit einer Straf-Einheit für jeweils 28 Tage Verspätung berechnet, derzeit 330 $, gedeckelt bei fünf Einheiten oder 1.650 $. Sie hängt am Nichteinreichen: pünktlich einreichen und spät zahlen ist eine spürbar günstigere Position. Wann sie angewendet wird, steht in unserem Guide zu [Strafen bei verspäteter Abgabe](/de/blog/late-tax-return-penalty-working-holiday).

## Was passiert, wenn du einfach abreist?

Die Schuld bleibt und wächst weiter. Der General Interest Charge läuft weiter auf, der Saldo wird automatisch gegen jede künftige australische Erstattung verrechnet, einschließlich der letzten Erklärung, die die meisten Backpacker nach der Ausreise einreichen, und er bleibt in deinem ATO-Datensatz.

Dieser Datensatz wirkt am längsten. Eine offene Steuerschuld will man nicht bei einem künftigen australischen Visumsantrag auftauchen sehen. Kleine Salden werden gelegentlich abgeschrieben, aber das ist eine Entscheidung des ATO und nichts, worauf man planen sollte.

## Was solltest du vor dem Abflug tun?

Richte die Vereinbarung ein, solange dein australisches Bankwesen noch funktioniert. Eine Lastschrift von einem offenen australischen Konto ist der Mechanismus, der aus dem Ausland weiterläuft, und dieses Konto zu schließen macht aus einem funktionierenden Plan einen unbezahlbaren.

Prüfe den Saldo, bevor du gehst, statt anzunehmen, dass da nichts ist. Härtefall- und Erlassanträge lassen sich per Korrespondenz aus einem anderen Land führen, aber den Plan überhaupt einzurichten ist von Australien aus weit einfacher.

## Können Strafen je reduziert werden?

Manchmal, und es lohnt sich zu fragen. Ein Erlass wird geprüft bei erstmaligen Fehlern, echtem Missverständnis einer Pflicht, schwerer Krankheit oder anderen außergewöhnlichen Umständen und dort, wo du dich seither ordentlich verhalten hast.

Der Erlass ist eine Ermessensentscheidung, nicht automatisch, und ein Teilerlass ist häufiger als ein voller. Verzögerung hilft nie: Das Argument eines echten Missverständnisses schwächt sich mit jedem unbearbeiteten Monat ab.

## Was, wenn du den Betrag für falsch hältst?

Bestreite ihn, statt ihn zu zahlen, aber tu beides möglichst parallel. Ein Bescheid, den du für unrichtig hältst, lässt sich ändern, in der Regel innerhalb von zwei Jahren nach Ergehen des ursprünglichen Bescheids, und gegen eine Entscheidung lässt sich förmlich Einspruch einlegen.

Die Falle: Keiner der beiden Schritte hält den General Interest Charge an. Die Zinsen laufen auf den bestrittenen Betrag weiter, während der Einspruch geprüft wird, bei großen Summen lohnt es sich also meist, einen Plan zu vereinbaren und gleichzeitig zu bestreiten. Welcher Weg zu welcher Art Fehler passt, steht in unserem Guide zur [Berichtigung einer Steuererklärung](/de/blog/amending-tax-return-australia).

## Wird das kurz oder wird es ein Zweijahresplan?

Ob ein Plan verfügbar ist und was er kostet, hängt an deiner konkreten Lage. Eine Schuld derselben Höhe kann eine kurze Unannehmlichkeit oder eine Zweijahresvereinbarung sein.

- Was die Schuld erzeugt hat, denn ABN-Einkommen, ein zu Unrecht beanspruchter Freibetrag und nicht eingereichte Jahre führen zu unterschiedlichen Lösungen.
- Ob die Erklärung eingereicht ist, denn die Failure-to-Lodge-Strafe ist von der Schuld selbst getrennt.
- Wie groß der Saldo im Verhältnis zu dem ist, was du zahlen kannst, denn davon hängt ab, ob das ATO den Zeitplan akzeptiert.
- Ob ein australisches Bankkonto offen bleibt, um die Lastschrift zu bedienen.
- Ob du noch in Australien bist, was das Einrichten des Plans erheblich erleichtert.
- Ob aus einem anderen Jahr eine Erstattung ansteht, denn sie wird automatisch gegen die Schuld verrechnet.
- Ob es Gründe für einen Erlass gibt, die man besser früh als spät vorbringt.

Eine Schuld beginnt meist mit einer Erklärung, die nicht mit dem vollen Bild erstellt wurde, und die [Working-Holiday-Steuererklärung](/de/tax-return) ist der Ort, an dem die Lage geradegerückt wird. Für die übrigen Jahre zeigt dir der [Erstattungsrechner](/de/calculator), ob eine Verrechnung auf dich zukommt.
`,
  },

  'tax-return-without-tfn-australia': {
    title: 'Ohne TFN gearbeitet: so kommt Steuer zurück',
    description: 'Ja, und wenn du ohne TFN gearbeitet hast, hast du wahrscheinlich Anspruch auf eine große Rückzahlung. So funktioniert es, Schritt für Schritt.',
    body: `
Du kannst, und diese Erklärung ist meist die wertvollste deines Aufenthalts. Ohne hinterlegte TFN musste dein Arbeitgeber 45 % statt 15 % einbehalten, und die Differenz kommt über die Erklärung zurück. Vor der Abgabe brauchst du eine TFN, und die lässt sich auch nach der Abreise noch beantragen.

## Was kostet dich eine Phase ohne TFN tatsächlich?

Dreißig Cent von jedem verdienten Dollar, solange sie dauerte. Mit erfasster TFN gilt der Working-Holiday-Satz von 15 % auf die ersten 45.000 $. Ohne sie werden ab dem ersten Dollar 45 % einbehalten, und bei 1.000 $ pro Woche sind das 300 $ pro Woche, die zurückgehalten statt ausgezahlt werden.

Verloren ist nichts davon. Zu viel einbehaltene Steuer wird bei der Abgabe gutgeschrieben, das Geld ist aufgeschoben und nicht verfallen. In der Zwischenzeit kostet es Liquidität, und das ist der Teil, der wehtut. Deshalb ist die Erklärung für ein Jahr ohne TFN meist die größte Erstattung, die ein Working Holiday Maker sieht.

## Warum kannst du ohne TFN nicht einreichen?

Weil die TFN die Kennung ist, die das gemeldete Einkommen mit dir verbindet. Löhne und Einbehalt liegen beim ATO unter der Meldung des Arbeitgebers, aber ohne TFN, an die sich das anhängen lässt, gibt es keinen Bescheid zu erstellen.

Deshalb geben Leute das Geld auf: Sie nehmen an, die Steuer sei im System verschwunden, weil sie nie eine Nummer hatten. Ist sie nicht. Sie wartet unter der Meldung des Arbeitgebers auf die Zuordnung, und der TFN-Antrag ordnet zu. Er ist kostenlos und kann mit Identitätsprüfung auch aus dem Ausland gestellt werden.

## Was passiert mit den Unterlagen, wenn du nichts aufgehoben hast?

Das meiste existiert bereits in den ATO-Systemen und nicht in deiner Schublade. Arbeitgeber melden Löhne und Einbehalt über Single Touch Payroll, und aus dieser Meldung wird die Erklärung gebaut. Ein Schuhkarton verlorener Payslips ist ein viel kleineres Problem, als es sich anfühlt.

Ein echtes Problem wird es, wo ein Arbeitgeber nie gemeldet hat, was in bar zahlenden Branchen vorkommt. Dann muss das Einkommen rekonstruiert werden, und unser Guide zu [Steuererklärungen bei Barzahlung](/de/blog/cash-in-hand-tax-return) beschreibt, welche Belege zählen.

## Was gilt, wenn das Jahr schon vorbei ist?

Ein vergangenes Steuerjahr bleibt einreichbar. Es gibt keinen Punkt, ab dem ein nicht eingereichtes Jahr allein durch Zeitablauf uneinbringlich wird, und Working Holiday Maker reichen routinemäßig für ein Jahr ein, in dem sie das Land verlassen haben.

Mit der Zeit ändern sich zwei Dinge. Arbeitgeberdaten sind schwerer nachzuverfolgen, wo die Meldung lückenhaft war, und die Identitätsprüfung wird aus dem Ausland langsamer. Keines schließt die Tür, und die Erstattung schrumpft nicht durchs Warten.

## Was ändert sich an der Erklärung, wenn du schon abgereist bist?

Die Mechanik ist dieselbe, die Reibung eine andere. Eine Erklärung lässt sich von überall vorbereiten und einreichen, aber die Erstattung geht auf ein australisches Bankkonto. Zum Hindernis wird ein auf dem Weg zum Flughafen geschlossenes Konto, nicht die Steuer.

Eine erste Erklärung mit frisch ausgestellter TFN und Auslandsadresse löst beim ATO am ehesten eine manuelle Identitätsprüfung aus. Das ist eine Verzögerung und keine Ablehnung, und vollständige, stimmige Unterlagen verkürzen sie.

## Was liegt in einem Jahr ohne TFN sonst noch herum?

Mehr als die Einbehaltsdifferenz, denn die Jahre, in denen ohne TFN gearbeitet wurde, sind auch die Jahre, in denen sonst nichts eingerichtet war. Superannuation ist der häufige Fall: Beiträge, die ohne angehängte TFN gezahlt wurden, liegen oft unzugeordnet in einem Fonds oder beim ATO, und sie gehören weiterhin dir.

Die Medicare-Levy-Befreiung ist der zweite. Wer einen deutschen oder japanischen Pass hält, hat in der Regel keinen Medicare-Anspruch, die Levy von 2 % sollte also nicht gelten, sie wird aber nur auf Antrag entfernt. Keines von beiden steht auf einem Payslip, und deshalb fällt keines auf.

## Wie groß ist dein Überabzug?

Den Überabzug zurückzuholen ist der einfache Teil. Wie groß er ist und wie schnell du ihn siehst, hängt an deinen eigenen Fakten.

- Wie viele Wochen liefen, bevor deine TFN beim Arbeitgeber ankam, was die Größe des Überabzugs setzt.
- Ob der Arbeitgeber dein Einkommen über Single Touch Payroll gemeldet hat, was entscheidet, wie viel rekonstruiert werden muss.
- Ob der Arbeitgeber beim ATO als Working-Holiday-Maker-Arbeitgeber registriert war, denn ein nicht registrierter behält auch mit vorliegender TFN zu Foreign-Resident-Sätzen ein.
- Ob ein australisches Bankkonto noch offen ist, um die Erstattung zu empfangen.
- Ob Super an einen Fonds gezahlt wurde, der ihn dir nicht zuordnen konnte.
- Ob mehr als ein Steuerjahr betroffen ist, denn jedes ist eine eigene Erklärung mit einer eigenen Erstattung.

Der Abgleich erfolgt als Teil der [Steuererklärung als Working Holiday Maker](/de/tax-return), und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du ungefähr weißt, was einbehalten wurde.

## Wem solltest du deine Unterlagen tatsächlich geben?

Wer ohne TFN gearbeitet hat, ist das häufigste Ziel, weil er ohnehin unsicher ist, wie das System funktioniert. Backpacker-Facebook-Gruppen und Messenger-Communities liefern stetig Leute, die anbieten, deine Steuer zu regeln.

Schick TFN, Pass oder Visumserteilung nie an jemanden, der dir keine Eintragung im öffentlichen staatlichen Register der Steuerpraktiker zeigen kann. Eine überprüfbare Registrierungsnummer ist der ganze Test, und wer sie nicht liefern will, hat dir gesagt, was du wissen musst.
`,
  },

  'multiple-jobs-tax-return-working-holiday': {
    title: 'Mehrere Arbeitgeber in einer Erklärung',
    description: 'Alle Income Statements kommen in eine einzige Erklärung. Genau hier zeigt sich der Überabzug bei Jobs, die du früh im Jahr wieder verlassen hast.',
    body: `
Jeder Job eines Steuerjahres gehört auf eine [Steuererklärung](/de/tax-return), auch die eine Woche in einer Küche, zu der du nie zurückgegangen bist. Jeder Arbeitgeber meldet getrennt an das ATO, die Erklärung muss sich also gegen die Gesamtsumme abstimmen lassen. Deine Erstattung liegt bei dem Arbeitgeber, der den falschen Satz hatte.

## Woher weiß das ATO schon, wo du gearbeitet hast?

Über Single Touch Payroll, das jeden australischen Arbeitgeber verpflichtet, Lohn, einbehaltene Steuer und [Super](/de/superannuation) bei jedem Lohnlauf zu melden statt einmal im Jahr. Wenn du zur Abgabe kommst, hat das ATO die vollständige Liste.

Das hat zwei Folgen. Einen Arbeitgeber zu vergessen hält kein Einkommen aus der Erklärung heraus, es erzeugt nur eine Erklärung, die nicht zum Datensatz passt. Und ein Job ohne Payslips ist kein verlorenes Einkommen, weil die Meldung vom Arbeitgeber kam: Eine Festivalschicht vor sechs Monaten über eine Zeitarbeitsfirma steht dort drin, ob du dich an den Namen erinnerst oder nicht.

## Was geht schief, wenn ein Arbeitgeber fehlt?

Die Erklärung wird meist zu der von dir gemeldeten Zahl bearbeitet, die Erstattung wird ausgezahlt, und die Korrektur kommt danach. Das ATO vergleicht mit seinem eigenen Datensatz, sieht die Lücke und stellt Wochen oder Monate später einen geänderten Bescheid aus, der das fehlende Einkommen hinzufügt.

Bis dahin ist die Erstattung in der Regel ausgegeben, was aus einer Verwaltungskorrektur ein echtes Problem macht. Der geänderte Bescheid erzeugt eine Schuld, der General Interest Charge läuft darauf ab dem ursprünglichen Fälligkeitsdatum, und eine erhebliche Auslassung kann obendrauf eine Strafe auslösen. Einmal gegen den vollständigen Datensatz einzureichen vermeidet all das.

## Wo konzentriert sich die Erstattung tatsächlich?

Fast immer bei einem Arbeitgeber, nicht gleichmäßig über alle verteilt. Die nützliche Übung ist nicht, die Summen zu addieren, sondern sie zu vergleichen: Teile für jeden Arbeitgeber getrennt die einbehaltene Steuer durch den Bruttolohn und sieh, welcher deutlich über 15 % liegt.

Zwei Muster erzeugen das. Ein Arbeitgeber, der beim ATO nicht als Working-Holiday-Maker-Arbeitgeber registriert ist, muss zu Foreign-Resident-Sätzen einbehalten statt zu 15 %, auf Farmen und in kleinen regionalen Betrieben üblich, und der Überschuss ist in voller Höhe rückholbar. Und ein erster Job mit spät angekommener TFN zeigt Wochen bei 45 %, ein Unterschied von 30 Cent auf jeden Dollar in dieser Zeit. Zu erkennen, welcher Arbeitgeber es war, sagt dir, wohin das Geld deines Jahres gegangen ist.

- Ein Arbeitgeber deutlich über 15 %: ein nicht registrierter Arbeitgeber oder eine späte TFN, und eine erhebliche Erstattung
- Alle Arbeitgeber bei 15 %: die Erstattung kommt stattdessen aus der Medicare-Levy-Befreiung und den Werbungskosten
- Kombiniertes Einkommen über 45.000 $: der Satz steigt auf 30 % und der Einbehalt war womöglich zu niedrig

## Können mehrere Jobs dazu führen, dass du Geld schuldest?

Ja, und das erwischt Leute, die annehmen, mehr Jobs bedeuteten eine größere Erstattung. Jeder Arbeitgeber behält gegen das Einkommen ein, das er dir zahlt, ohne von den anderen zu wissen: Der Einbehalt wird berechnet, als wäre jeder Job dein einziger.

Working Holiday Maker haben keinen Freibetrag, die übliche australische Variante entsteht also nicht, der Stufeneffekt aber schon. Kombiniertes Einkommen über 45.000 $ rutscht in die 30-%-Stufe, während jeder einzelne Arbeitgeber weiter mit 15 % einbehält, und die Differenz erscheint am Jahresende als Zahlbetrag. Drei parallele Casual-Jobs durch einen vollen Sommer erzeugen das am häufigsten.

## Was lohnt es aufzuheben, wenn du mehrere Jobs hast?

Alles, was nicht ohnehin im ATO-Datensatz steht, eine kürzere Liste als erwartet. Die Einkommensseite kommt über Single Touch Payroll; Payslips sind eine Gegenprobe und belegen vor allem, was hätte gemeldet werden müssen, wenn ein Arbeitgeber nie abgeschlossen hat.

- Payslips oder Endabrechnungen als Gegenprobe zu den ATO-Zahlen
- Angaben zu Barzahlungen, die nie über die Lohnbuchhaltung gemeldet wurden und trotzdem [erklärt werden müssen](/de/blog/cash-in-hand-tax-return)
- Berufsbezogene Ausgaben, jeweils dem Job zugeordnet, zu dem sie gehören
- Fahrten zwischen zwei Arbeitsstätten am selben Tag, die absetzbar sein können, während Fahrten von zu Hause es nicht sind

## Wann kann eine Erklärung mit mehreren Arbeitgebern eingereicht werden?

Sobald jeder Arbeitgeber abgeschlossen hat, und nicht davor. Income Statements gelten als nicht abgabefertig, bis der Arbeitgeber seine Jahresmeldung abschließt, und ein einziger spät abschließender Arbeitgeber genügt, um die ganze Erklärung verfrüht zu machen.

Genau hier werden Jahre mit mehreren Arbeitgebern unnötig geändert. Anfang Juli gegen drei abgeschlossene Arbeitgeber und einen unfertigen einzureichen heißt, dass der vierte danach ankommt und der Bescheid sich ändert. Auf alle zu warten kostet zwei Wochen, danach zu ändern erheblich mehr, und es ist die vermeidbarste Berichtigung im ganzen System.
`,
  },

  'late-tax-return-penalty-working-holiday': {
    title: 'Steuererklärung zu spät: welche Strafe?',
    description: 'Verspätete Steuererklärungen lösen Failure-to-Lodge-Strafen aus, die bis zu 1.650 $ erreichen können. Aktuelle Strafhöhen und wie du sie noch vermeidest.',
    body: `
Die Failure-to-Lodge-Strafe beträgt eine Straf-Einheit für jeweils 28 Tage, die eine [Steuererklärung](/de/tax-return) überfällig ist, gedeckelt bei fünf. Bei 330 $ je Einheit liegt das Maximum bei 1.650 $. Sie kann auch dann greifen, wenn das ATO dir Geld schuldet. Ob du sie zahlst, entscheidet deine Compliance-Historie.

## Wann ist die Erklärung tatsächlich fällig?

Fällig ist sie am 31. Oktober nach Ende des Steuerjahres, wenn du selbst einreichst, eine Erklärung für 2024-25 also bis zum 31. Oktober 2025. Das Steuerjahr läuft vom 1. Juli bis 30. Juni, und die Frist verschiebt sich nicht dadurch, dass du das Land verlassen hast.

Die Abgabe über einen registrierten Steuerberater verschiebt das Datum erheblich. Steuerberater arbeiten nach einem begünstigten Abgabeprogramm, das bis in den Mai des Folgejahres läuft, und die Verlängerung gilt, sofern du vor der regulären Oktoberfrist auf der Mandantenliste standest. Diese letzte Bedingung wird übersehen: Eine Anmeldung im Februar verlängert keine Frist rückwirkend, die im Oktober abgelaufen ist.

## Wie baut sich die Strafe auf?

In Schritten von 28 Tagen und nicht täglich: Zwischen zwei Tagen Verspätung und zwanzig liegt gar nichts. Jeder vollendete Zeitraum von 28 Tagen fügt eine weitere Straf-Einheit hinzu, bis zur Deckelung bei fünf, also etwas mehr als vier Monate.

- 1 bis 28 Tage verspätet: 1 Einheit, 330 $
- 29 bis 56 Tage: 2 Einheiten, 660 $
- 57 bis 84 Tage: 3 Einheiten, 990 $
- 85 bis 112 Tage: 4 Einheiten, 1.320 $
- 113 Tage oder mehr: 5 Einheiten, 1.650 $, das Maximum

## Gilt die Strafe auch, wenn dir eine Erstattung zusteht?

Rechtlich ja, praktisch oft nicht. Nach der Position des ATO ist die Abgabepflicht davon getrennt, ob Steuer zu zahlen ist: Eine spät eingereichte Erstattungserklärung ist trotzdem eine verspätete Erklärung.

Angewendet wird sie selektiv, und entscheidend ist das Muster, nicht das einzelne Jahr. Eine erste verspätete Erklärung von jemandem ohne weitere Historie wird sehr anders behandelt als ein drittes Jahr in Folge ohne Abgabe. Bei vorsätzlicher Nichtabgabe oder mehreren auf einmal entdeckten nicht eingereichten Jahren greift die Strafe auch bei Erstattungserklärungen ernsthaft.

## Wann kommen zusätzlich Zinsen dazu?

Nur, wenn die verspätete Erklärung eine Schuld erzeugt. Der General Interest Charge läuft auf unbezahlte Steuer ab dem ursprünglichen Fälligkeitsdatum, zinst täglich auf und liegt deutlich über dem Leitzins, eine kleine Schuld, die ein paar Jahre liegen bleibt, wächst also zu einer erheblich größeren.

Bei einer Erstattung oder einem Nullergebnis gibt es keine Zinsen, weil nichts Offenes da ist, worauf sie berechnet werden könnten. Deshalb ist eine verspätete Erstattungserklärung ein viel kleineres Problem als eine verspätete Erklärung mit einem ABN-Jahr dahinter. Finde heraus, welche der beiden du hast, bevor du entscheidest, wie dringend das ist.

## Kann die Strafe aufgehoben werden?

Sie kann erlassen werden, also reduziert oder gestrichen, und das ATO übt dieses Ermessen bei einem echten Grund ziemlich häufig aus. Anerkannt sind Krankheit oder Krankenhausaufenthalt rund um die Frist, ein Trauerfall, eine Naturkatastrophe und ein ATO-Systemausfall, der die Abgabe verhindert hat.

Automatisch ist der Erlass nicht; er muss mit etwas Stützendem beantragt werden. Am häufigsten gewährt wird er bei einem erstmaligen Versäumnis mit ansonsten sauberer Historie, ein weiteres Argument dafür, ein verspätetes Jahr jetzt zu erledigen statt drei auflaufen zu lassen.

## Was passiert, wenn du Australien bereits verlassen hast?

Die Pflicht folgt dir, und die Schuld auch. Eine nicht eingereichte Erklärung bleibt unbefristet im ATO-Datensatz, und der hat Folgen, die zu ungelegenen Zeitpunkten auftauchen, auch wenn das ATO kleinen Strafbeträgen über Grenzen hinweg nicht mit viel Energie nachgeht.

Drei davon lohnt es zu kennen. Ein offener ATO-Betrag kann gegen eine spätere Erstattung verrechnet werden, unter Umständen auch gegen eine [DASP-Zahlung](/de/superannuation). Eine ungelöste Compliance-Lage kann einen Antrag auf ein zweites oder drittes Jahr bei Home Affairs genauer prüfen lassen. Und eine nie beantragte Erstattung liegt weiterhin dort, mit Abstand der häufigere Fall. Spät einzureichen ist fast immer besser als nicht einzureichen: Die Strafe ist gedeckelt, die Erstattung nicht.

## Was, wenn mehrere Jahre nicht eingereicht sind?

Dann greifen die Jahre ineinander, und nicht zu deinen Gunsten. Die Failure-to-Lodge-Strafe wird je Erklärung bemessen und nicht über die Gesamtlage: Drei überfällige Jahre können je eigene fünf Einheiten tragen, und das Muster bewegt das ATO von selektiver zu regelmäßiger Anwendung.

Auch die Reihenfolge zählt. Das älteste zuerst einzureichen setzt für jedes folgende Jahr eine Ausgangslage, und eine Erstattung aus einem Jahr kann gegen eine Schuld aus einem anderen verrechnet werden. Das Nettoergebnis mehrerer zusammen eingereichter Jahre sieht deshalb oft ganz anders aus als bei einem einzelnen. Erstattungen aus früheren Jahren sind weiterhin auszahlbar, und nicht abgeholte aus einer Working Holiday vor zwei oder drei Jahren werden regelmäßig zurückgeholt.

## Was ist der Unterschied zwischen verspäteter Abgabe und Berichtigung?

Zwei verschiedene Verfahren mit zwei verschiedenen Fristen, ständig verwechselt. Verspätet einzureichen heißt, dass die Erklärung nie eingereicht wurde, und dafür gibt es keine Ausschlussfrist: Eine Erklärung für 2022-23 kann heute noch abgegeben werden.

Eine Berichtigung heißt, dass eine Erklärung eingereicht wurde und etwas darin falsch war. Für Privatpersonen beträgt das übliche Berichtigungsfenster zwei Jahre ab Ergehen des Bescheids, danach ist die Position in der Regel fest. Deshalb kann eine schnell aber schlampig eingereichte Erklärung schlechter enden als eine spät aber richtig eingereichte: Die späte lässt sich noch richtig machen, die falsche irgendwann nicht mehr.
`,
  },

  'tools-equipment-under-300-instant-deduction-whv': {
    title: 'Werkzeug unter 300 $: sofort voll absetzen',
    description: 'Arbeitswerkzeuge unter 300 $ kannst du als Working Holiday Maker komplett im Kaufjahr absetzen. Was qualifiziert, wie du Belege aufbewahrst und Beispiele.',
    body: `
Jeder einzelne Arbeitsgegenstand, der 300 $ oder weniger kostet, ist im Kaufjahr voll absetzbar statt über Jahre abzuschreiben. Schuhe, Messer, Gartenscheren, Helme, Warnhemden, Werkzeuggürtel und Handwerkzeug qualifizieren alle. Ab dem 1. Juli 2026 gilt zusätzlich eine breitere Sofortabschreibung bis 1.000 $.

## Was sind die drei Bedingungen?

Alle drei müssen zusammen erfüllt sein, und Ansätze scheitern an der zweiten und dritten. Die meisten prüfen den Preis und hören dort auf, und deshalb erwischt die Set-Regel so viele sonst echte Abzüge.

Der Gegenstand muss für sich 300 $ oder weniger kosten, nicht 300 $ über alles Gekaufte zusammen. Er muss überwiegend zur Erzielung steuerpflichtigen Einkommens genutzt werden. Und er darf nicht Teil eines Sets sein, das zusammen mehr als 300 $ kostet.

Sechs Küchenmesser zusammen für 450 $ gekauft sind ein Set, und kein einzelnes Messer darin gilt als Gegenstand unter 300 $, das Ganze wird also abgeschrieben. Derselbe Koch, der im Oktober ein Messer für 80 $, im Januar eines für 90 $ und im März eines für 100 $ kauft, hat drei getrennte, sofort absetzbare Gegenstände, weil es echte Einzelkäufe waren.

## Was qualifiziert in der Arbeit, die Backpacker machen?

Fast alles, was du kaufen musstest, um den Job zu machen, und die Liste ist deutlich länger, als die meisten geltend machen. Die Branche zählt: Was das ATO auf einer Farm-Erklärung erwartet, ist etwas anderes als auf einer für Bau oder Gastronomie.

- Farm und Gartenbau: Pflückeimer, Gartenscheren, Astscheren, Handschuhe, Arbeitsschuhe, Warnhemden, breitkrempige Hüte und Sonnenschutz
- Bau: Stahlkappenschuhe, Helme, Werkzeuggürtel, Handwerkzeug, Maßbänder, Handschuhe
- Gastronomie: Küchenmesser, Kochkleidung, rutschfeste Schuhe, Schürzen
- Lieferung und Rideshare: Liefertaschen, Handyhalter, Dashcams, Fahrradzubehör
- Reinigung: Schutzhandschuhe, Ausrüstung und Verbrauchsmaterial

Sonnenschutz ist für Arbeit im Freien wirklich absetzbar, und fast niemand macht ihn geltend. Eine Pflücksaison im Riverland bedeutet echte Ausgaben für Hüte, Sonnencreme und langärmelige Schutzkleidung, und draußen ist genau der Kontext, in dem das ATO es anerkennt.

## Was heißt überwiegend beruflich?

Dass die Hauptnutzung die Arbeit ist. Sonst beschränkt sich der Ansatz auf den beruflichen Anteil. Die einfachen Fälle sind Gegenstände, die anders zu nutzen absurd wäre: Warnkleidung, Helm, Kochkleidung, Stahlkappen. Die sind voll absetzbar.

Bei gemischter Nutzung kommt Beurteilung ins Spiel. Schuhe, die du auch privat trägst, ein Rucksack, der Pflückausrüstung trägt und mit auf Reisen geht, ein Handyhalter für Rideshare und private Navigation. Jedes ist zum beruflichen Prozentsatz absetzbar, und dieser Prozentsatz braucht eine Grundlage, die du erklären könntest.

## Welche Nachweise brauchst du wirklich?

Eine Quittung mit Preis, Datum, Lieferant und Beschreibung des Gekauften, dazu eine Grundlage für die berufliche Nutzung, wenn sie nicht offensichtlich 100 % ist. Fotos von Quittungen werden akzeptiert, und digitale Aufzeichnungen sind so gut wie Papier.

Ohne Nachweis ist der Abzug nicht geltend zu machen, wie echt er auch war, und hier verlieren Saisonkräfte am meisten. Käufe auf Farm und Baustelle laufen häufig bar in einem ländlichen Landhandel, an Tagen, an denen Papierkram das Letzte ist, woran man denkt. Ein Kontoauszug, ein Foto des Gegenstands im Einsatz oder eine schriftliche Bestätigung des Lieferanten stützen einen Ansatz, sind aber schwächer als eine Quittung und werden häufiger bestritten.

Was funktioniert: die Quittung an der Kasse fotografieren und sich selbst mailen. Das dauert zehn Sekunden und übersteht eine Waschmaschine, was ein Papierbeleg in der Arbeitshose nicht tut.

## Was gilt, wenn ein Gegenstand mehr als 300 $ gekostet hat?

Es geht nichts verloren, es wird nur über die Zeit geltend gemacht. Gegenstände über der Grenze werden über ihre Nutzungsdauer abgeschrieben, bei Handwerkzeug und kleinen Maschinen meist über drei bis fünf Jahre. Eine Kettensäge für 400 $ läuft also über mehrere Jahre.

Das greift mit der neuen Regel ab dem 1. Juli 2026 ineinander, die die Grenze für den Sofortabzug auf 1.000 $ hebt und die Rechnung für jeden ändert, der ein ordentliches Elektrowerkzeug oder ein E-Bike kauft. Wie beides zusammenwirkt, steht in der [1.000-$-Sofortabschreibung](/de/blog/1000-dollar-instant-deduction-rule-2026).

## Deine eigenen Käufe entscheiden über den Abzug.

Die 300-$-Regel klingt einfach und scheitert an Details statt am Prinzip. Diese Fakten zu deinen eigenen Käufen entscheiden, ob eine echte Ausgabe auch geltend zu machen ist.

- Ob Gegenstände als Set oder wirklich einzeln gekauft wurden, denn das trennt Sofortabzug von Abschreibung.
- Ob du Quittungen aufbewahrt hast, was entscheidet, ob eine ehrliche Ausgabe auch eine absetzbare ist.
- Ob der Gegenstand nur beruflich genutzt wird oder auch privat, und ob du die Aufteilung begründen kannst.
- In welches Steuerjahr der Kauf fällt, denn die Grenze hat sich zum 1. Juli 2026 geändert.
- Ob du Angestellter bist oder auf einer ABN, was ändert, wo die Ausgabe geltend gemacht wird und was daneben noch geht.
- In welcher Branche du gearbeitet hast, denn Farm, Baustelle und Küche haben je eigene Gegenstände, die das ATO erwartet.

Abzüge werden über deine [Steuererklärung als Working Holiday Maker](/de/tax-return) geltend gemacht, und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du die Arbeitsausgaben des Jahres zusammengerechnet hast.
`,
  },

  // ─── More Super posts ──────────────────────────────────────────────────────
  'tax-on-super-withdrawal-backpacker': {
    title: 'Super nach 65 % DASP-Steuer: was bleibt?',
    description: 'Aus 10.000 $ Super-Guthaben werden nach der 65-%-DASP-Steuer rund 3.500 $. Rechenbeispiele nach Guthaben und Arbeitsjahr.',
    body: `
Ein Departing Australia Superannuation Payment an einen Inhaber eines 417- oder 462-Visums wird mit 65 % der steuerpflichtigen Komponente besteuert, einbehalten bevor das Geld dich erreicht. Der Satz steht gesetzlich fest. Zu entscheiden ist, wann du beantragst und ob du vorher jeden Fonds gefunden hast.

## Worauf werden die 65 % genau angewendet?

Angewendet werden sie auf die steuerpflichtige Komponente des Guthabens, und die ist bei einem Working Holiday Maker faktisch das Ganze. Super teilt sich in eine steuerpflichtige Komponente aus Arbeitgeberbeiträgen und den Erträgen darauf und eine steuerfreie Komponente aus persönlichen Beiträgen, die du aus bereits versteuertem Geld geleistet hast.

Fast kein Backpacker hat eine steuerfreie Komponente, weil kaum jemand freiwillige Beiträge leistet. Wo eine existiert, wird sie ohne Einbehalt ausgezahlt, praktisch wird also das gesamte Guthaben mit 65 % besteuert, und der Nettobetrag sind 35 % dessen, was der Fonds hält. Bei einem Guthaben von 10.000 $ ist das eine Auszahlung von etwa 3.500 $.

## Warum ist der Satz für Working Holiday Maker höher?

Weil er 2017 gezielt für diese Visumsklasse angehoben wurde. Der DASP-Satz für temporäre Residenten allgemein lag bei 35 %, und ab dem 1. Januar 2017 wurde ein eigener Satz von 65 % für Inhaber der Subclasses 417 und 462 eingeführt, im selben Paket, das den Einkommensteuersatz von 15 % auf Working-Holiday-Maker-Löhne festlegte.

Die genannte Begründung war, dass der Lohnsatz von 15 % gegenüber dem eines Foreign Resident begünstigt ist und der höhere Supersatz das ausgleicht. Praktisch zählt, dass der Satz am Visum hängt und nicht an der Person: Er hängt davon ab, welches Visum du hattest, als die Beiträge geleistet wurden.

- Subclass 417 und 462: 65 % auf die steuerpflichtige Komponente
- Andere temporäre Visa, etwa ein Studentenvisum: in der Regel 35 %
- Eine gemischte Visumshistorie: der Fonds bewertet die Komponenten getrennt

## Lassen sich die 65 % reduzieren oder zurückholen?

Nein. Es ist ein endgültiger Einbehalt und keine Vorauszahlung, er erscheint also nicht auf deiner australischen [Steuererklärung](/de/tax-return) und es gibt nichts, wogegen er verrechnet werden könnte. Steuerabkommen reichen ebenfalls nicht daran, und kein Wohnsitz ändert ihn.

Drei Dinge werden mit einer Reduzierung verwechselt. Wurde ein Teil deiner Super unter einem anderen temporären Visum verdient, kann dieser Teil mit 35 % bewertet werden, was der Fonds aus deiner Visumshistorie ermittelt und nicht aus einem Antrag von dir. Der DASP zählt nicht zu deinem australischen zu versteuernden Einkommen, er wird hier also nicht doppelt besteuert. Und ob dein Heimatland die Zahlung besteuert, richtet sich nach dortigem Recht, viele behandeln sie als ausländische Alterseinkünfte.

## Lohnt sich ein kleines Guthaben überhaupt?

Ja, denn die Alternative ist, das Geld nicht zu behalten. Sechs Monate nach Ablauf des Visums wird zurückgelassene Super als unclaimed super an das ATO übertragen, wo sie keine Erträge mehr erzielt und keine Fondsgebühren mehr zahlt, aber auch nicht mehr dort liegt, wo du über sie stolperst.

Der DASP zahlt 35 % dessen aus, was der Fonds hält: Ein Guthaben von 1.500 $ bringt etwa 525 $, eines von 4.000 $ etwa 1.400 $. Das ist Geld, das ein Arbeitgeber zusätzlich zu deinem Lohn gezahlt hat, und es kommt nicht von allein nach Hause.

## Wann solltest du den Antrag tatsächlich stellen?

Nachdem dein Visum abgelaufen oder aufgehoben ist und nachdem du Australien verlassen hast, und beides sind Zulässigkeitsvoraussetzungen und keine Vorlieben. Die Genehmigung dauert nach Einreichung typischerweise etwa 28 Tage, danach folgt die Zahlung.

Die Zeitfrage, die wirklich zählt, ist das letzte Quartal. Super wird quartalsweise gezahlt, hörst du also im Mai auf zu arbeiten und fliegst im Juni, ist der Beitrag deines Arbeitgebers für April bis Juni erst am 28. Juli fällig. Vor diesem Datum zu beantragen heißt, gegen ein Guthaben zu beantragen, in das dein Arbeitgeber noch nicht fertig eingezahlt hat, und der Rest muss dann getrennt hinterhergejagt werden. Dagegen steht, dass jeder Monat im Fonds ein weiterer Monat Verwaltungsgebühren auf Geld ist, das du nicht mehr aufstockst. Die richtige Antwort hängt davon ab, wie viel das ausstehende Quartal im Verhältnis zu den Gebühren wert ist.
`,
  },

  'what-happens-to-unclaimed-super': {
    title: 'Super nie beantragt: wo landet das Geld?',
    description: 'Nach sechs Monaten geht nicht beantragte Super ans ATO über. Verloren ist sie damit nicht: Du kannst den DASP-Antrag auch Jahre später noch stellen.',
    body: `
Nichts Schlimmes. Nach einer Phase der Inaktivität überweist ein Fonds dein Guthaben an das ATO, wo es unter deiner TFN als unclaimed super liegt. Es gehört weiterhin dir, es ist weiterhin über den Departing Australia Superannuation Payment beantragbar, und es gibt keine Frist, nach der das endet.

## Was löst die Übertragung aus?

Meist der verlorene Kontakt. Ein Fonds muss übertragen, wenn er dich nicht erreichen kann, wenn Post zurückkommt und Mitteilungen unbeantwortet bleiben, wenn das Konto eine Zeit lang inaktiv war oder wenn ein DASP-Antrag nicht ausgezahlt werden konnte.

Die übliche Abfolge ist banal. Der Fonds hat eine Hosteladresse, Kontoauszüge kommen zurück, die Beiträge enden mit dem Job, und das Guthaben wandert. Verloren ist nichts, aber das Geld liegt jetzt dort, wo du nicht nachsehen würdest.

## Kannst du es noch beantragen, nachdem es übertragen wurde?

Ja, über denselben DASP-Mechanismus, nur geht der Antrag an das ATO statt an einen Fonds. Unterlagen, Voraussetzungen und der Einbehalt von 65 % auf die steuerpflichtige Komponente bleiben gleich.

Oft ist es sogar einfacher, weil die Prüfschleife über den Fonds entfällt. Eine zeitliche Grenze gibt es nicht: Guthaben aus Visa, die vor vielen Jahren endeten, werden erfolgreich beantragt.

## Wie findest du heraus, ob deine übertragen wurde?

Indem du anhand deiner TFN suchst, denn das erfasst Fonds und beim ATO gehaltene Guthaben in einem Schritt. Niemand informiert dich über eine Übertragung, und der Fonds, an den du dich erinnerst, hält womöglich nichts mehr.

Bist du länger als sechs Monate außerhalb Australiens, geh davon aus, dass ein Teil deiner Super übertragen wurde, und suche, statt an den alten Fonds zu schreiben. Was die Suche braucht, steht in unserem Guide zum [Auffinden verlorener Superannuation](/de/blog/how-to-find-lost-superannuation).

## Wächst es, während das ATO es hält?

Kaum. Das ATO wendet eine Zinsanpassung an, die mit der Inflation Schritt halten soll und spürbar unter der Rendite eines angelegten Guthabens im Fonds liegt.

Dafür wird es nicht aufgezehrt. Ein kleines Guthaben im Fonds trägt Verwaltungsgebühren und oft Versicherungsprämien, und ein paar hundert Dollar können über einige Jahre vollständig aufgebraucht werden. Beim ATO gehaltenes Geld ist gebührenfrei, für ein kleines Guthaben ist die Übertragung also nicht das schlechtere Ergebnis.

## Warum es beantragen statt liegen lassen?

Weil es dort nichts tut und die Hürden für einen Antrag nur wachsen. Die Identitätsprüfung wird schwerer, je länger du außer Landes bist, Kontaktdaten veralten, und eine abgelaufene australische SIM empfängt keine Prüfcodes mehr.

Die Zahl, mit der Leute ringen, ist der Einbehalt von 65 %. Danach bekommst du 35 % des Guthabens. Ein schlechter Satz, aber der einzige verfügbare, und die Alternative ist, den ganzen Betrag zurückzulassen. Nach mehreren Monaten mit 12 % Super auf den Lohn sind 35 % weiterhin eine echte Summe.

## Was, wenn ein Teil nie dir zugeordnet wurde?

Ein anderes und häufigeres Problem als die Übertragung. Beiträge, die geleistet wurden, bevor deine TFN beim Fonds ankam, lassen sich oft keiner Person zuordnen und liegen unzugeordnet.

Solche Beträge tauchen in einer TFN-Suche nicht auf, deshalb zählt die Arbeitgeberliste. Zeigen deine Payslips Super für einen Job, den weder ein Fonds noch ein ATO-Guthaben abbildet, wurde das Geld entweder nie gezahlt oder nie zugeordnet, und beides wird unterschiedlich gelöst. Den ersten Fall behandelt unser Guide zu [einem Arbeitgeber, der keine Super zahlt](/de/blog/super-employer-not-paying-what-to-do).

## Auf wie viele Töpfe verteilt sich dein Geld?

Ob deine Super bei einem Fonds oder beim ATO liegt, ändert nicht, was du bekommst. Diese Punkte entscheiden, wie viele Guthaben es gibt und wie unkompliziert der Antrag wird.

- Wie viele Arbeitgeber du hattest, denn jeder kann ein eigenes Konto eröffnet haben.
- Wie lange dein Weggang her ist, denn davon hängt ab, wie viel wahrscheinlich übertragen wurde.
- Ob deine TFN jeden Fonds erreicht hat, denn davon hängt ab, ob Beiträge überhaupt zugeordnet wurden.
- Ob dein Visum abgelaufen und du ausgereist bist, denn erst das macht den Antrag möglich.
- Ob deine Identitätsangaben noch konsistent und deine Kontaktdaten erreichbar sind.
- Ob ein Arbeitgeber schlicht nie gezahlt hat, denn das ist eine Rückholung und keine Suche.

Super und eine nicht eingereichte Erklärung stehen meist zusammen offen, und das Jahr wird in der [Working-Holiday-Steuererklärung](/de/tax-return) abgerechnet.
`,
  },

  'how-to-find-lost-superannuation': {
    title: 'Verlorene Super finden: so geht die Suche',
    description: 'Verlorene Superannuation vor der Abreise finden, über jeden Fonds, der an deiner TFN hängt. Mehrere Konten, nicht beanspruchte Super und der DASP-Antrag.',
    body: `
Verlorene Super findest du über eine Suche anhand deiner TFN. Sie fördert jeden Fonds mit Beiträgen unter deinem Namen zutage und alles, was bereits als unclaimed an das ATO gegangen ist. Die meisten Working Holiday Maker haben mehr Konten, als sie denken, und die Suche vor der Abreise ist weit einfacher als danach.

## Warum landet ein Backpacker bei mehreren Konten?

Weil jeder Arbeitgeber, der nicht gefragt hat, welchen Fonds du willst, dir einen eröffnet hat. Drei Jobs mit drei Standardfonds sind drei Konten, jedes mit ein paar hundert Dollar und jedes mit Gebühren dagegen.

Danach veralten die Kontaktdaten. Auszüge gehen an eine WG, die du im März verlassen hast, der Fonds verliert den Kontakt, und nach einer Phase der Inaktivität geht das Guthaben als unclaimed super an das ATO. Es gehört dir weiterhin, liegt nur nicht mehr dort, wo du nachsehen würdest.

## Was geht wirklich verloren, im Unterschied zu bloß vergessen?

Zwei verschiedene Dinge, und der Unterschied ändert, wie sie zurückgeholt werden. Geld in einem vergessenen Fonds ist über eine TFN-Suche sofort auffindbar. Geld, das dir nie zugeordnet wurde, ist schwerer.

Der zweite Fall ist typisch hier. Beiträge von vor der Ankunft deiner TFN beim Fonds lassen sich oft keiner Person zuordnen und liegen beim ATO, ohne dass dein Name sicher darauf steht. Das ist der häufigste Grund, warum die Super eines abreisenden Backpackers kleiner ist, als seine Payslips es nahelegen. Halte die Payslips gegen den Fonds, statt Übereinstimmung anzunehmen.

## Welche Angaben machen die Suche vollständig?

Deine TFN erledigt den größten Teil, deine eigene Beschäftigungshistorie schließt die Lücke. Die Suche findet Konten, die mit deiner TFN verknüpft sind; Beiträge, die nie damit verknüpft wurden, findet sie nicht.

- Jeden australischen Arbeitgeber, für den du gearbeitet hast, mit Firmennamen
- Ungefähre Anfangs- und Enddaten für jeden
- Jeden Fondsnamen, an den du dich erinnerst oder von dem du Post bekommen hast
- Jede aufgehobene Korrespondenz eines Fonds
- Payslips mit Superbeträgen, die belegen, was hätte gezahlt werden müssen

Die Arbeitgeberliste zählt am meisten. Liefert die Suche drei Konten und du erinnerst dich an fünf Jobs, sitzt in den zwei fehlenden nicht gezahlte oder nicht zugeordnete Super.

## Solltest du vor dem Antrag konsolidieren?

Das hängt davon ab, wie viele Konten es gibt und was sie halten. Zusammenführen bedeutet einen Departing Australia Superannuation Payment, ein Prüfverfahren und eine Zahlung statt mehrerer.

Dagegen steht: Konsolidierung braucht Zeit, und jeder Fonds hat sein eigenes Verfahren. Bei zwei unkomplizierten Konten ist getrennt zu beantragen oft schneller. Auf den Betrag wirkt sich keiner der Wege aus. Was das Verfahren umfasst, steht in unserem Guide zur [Zusammenlegung mehrerer Superfonds](/de/blog/super-multiple-funds-consolidation).

## Warum kostet Warten dich etwas?

Nicht über eine Frist, sondern über Reibung. Beim ATO gehaltene Guthaben erzielen gegenüber einem aktiven Fonds eine niedrige Rendite, kleine Konten werden von Gebühren aufgezehrt, und die Identitätsprüfung wird schwerer, je länger du außer Landes bist und je stärker deine Kontaktdaten veralten.

Dazu kommt: Eine an eine australische SIM gebundene Nummer empfängt keine Prüfcodes mehr, sobald die SIM abläuft. Die Suche noch in Australien und mit funktionierenden Kontaktdaten zu machen umgeht die größte einzelne Hürde beim Zurückholen von Super aus dem Ausland.

## Was passiert, wenn du alles gefunden hast?

Es bleibt im Fonds, bis dein Visum abgelaufen und du ausgereist bist, denn erst das macht einen DASP-Antrag möglich. Die steuerpflichtige Komponente wird bei Working Holiday Makern mit 65 % besteuert, und Anträge werden üblicherweise innerhalb von etwa 28 Tagen genehmigt.

Fünfundsechzig Prozent ist hoch, aber die Alternative ist kein niedrigerer Satz, sondern das Guthaben ganz zurückzulassen. Genau das passiert jedes Jahr mit erheblichen Beträgen an Working-Holiday-Super. Den Antrag selbst behandelt unser [Superannuation-Guide](/de/superannuation).

## Wie viele Konten hast du hinterlassen?

Wie viel dort draußen liegt und wie leicht du es bekommst, hängt daran, wie die Arbeitsjahre liefen. Diese Tatsachen entscheiden, wie viele Konten existieren und wie viel davon an deinem Namen hängt.

- Wie viele Arbeitgeber du hattest, denn jeder kann ein eigenes Konto eröffnet haben.
- Ob du bei jedem Job einen Fonds genannt hast oder in einen Standardfonds gesetzt wurdest.
- Ob deine TFN jeden Fonds erreicht hat, denn davon hängt die Zuordnung der Beiträge ab.
- Ob ein Guthaben bereits als unclaimed an das ATO übertragen wurde.
- Ob deine Kontaktdaten bei jedem Fonds aktuell sind.
- Ob ein Arbeitgeber schlicht nicht gezahlt hat, denn das ist eine Rückholung und keine Suche.

Nicht gezahlte Super und eine nicht eingereichte Erklärung finden sich meist zusammen, und das Jahr wird in der [Working-Holiday-Steuererklärung](/de/tax-return) abgerechnet.
`,
  },

  'how-to-choose-super-fund': {
    title: 'Superfonds wählen: worauf du achten musst',
    description: 'Wählst du keinen Fonds, landest du im Standardfonds des Arbeitgebers. Achte auf Gebühren, Versicherungsanteile und wie zügig der Fonds DASP auszahlt.',
    body: `
Für einen Working Holiday Maker ist der beste Fonds der, der einen DASP-Antrag schnell auszahlt und ein kleines Guthaben in der Zwischenzeit nicht aufzehrt. Du holst den ganzen Betrag heraus, wenn du abreist, also zählen Gebühren, voreingestellte Versicherungen und die Identitätsprüfung. Langfristige Anlageperformance zählt nicht.

## Warum sind die üblichen Kriterien die falschen?

Australier wählen einen Fonds für einen Horizont von vierzig Jahren, auf dem ein Bruchteil eines Prozentpunkts an Rendite sich zu sehr viel Geld aufzinst. Du wählst für achtzehn Monate, nach denen das gesamte Guthaben über den Departing Australia Superannuation Payment das Land verlässt.

Über diesen Horizont zählt die Anlageperformance kaum. Zwei andere Dinge schon: was der Fonds berechnet, solange das Geld dort liegt, und wie kompetent er einen Antrag von jemandem bearbeitet, der nicht mehr in Australien ist.

## Was ist Superannuation, kurz gefasst?

Super ist Geld, das dein Arbeitgeber in einen Fonds auf deinen Namen einzahlt, mit 12 % zusätzlich zu deinem Lohn und nicht daraus. Dein Bruttolohn ist derselbe, ob sie gezahlt wird oder nicht. Für einen Working Holiday Maker ist sie ein erzwungenes Sparkonto, das du bei der Abreise aufschließt.

- Die Beiträge sind die Pflicht des Arbeitgebers, zusätzlich zu deinem Lohn
- Der Fonds hält und investiert das Guthaben
- Das gesamte Guthaben ist über [DASP](/de/superannuation) beantragbar, sobald dein Visum abgelaufen und du ausgereist bist
- Beim DASP werden bei Working-Holiday-Maker-Beiträgen 65 % einbehalten

Diese 65 % sind die wichtigste Zahl hier. Ein Guthaben von 10.000 $ zahlt etwa 3.500 $ aus. An diesem Satz ändert die Fondswahl nichts.

## Welche Gebühren zählen über achtzehn Monate wirklich?

Feste Verwaltungsgebühren in Dollar tun einem kleinen Guthaben weh, prozentuale nicht. Ein paar Dollar pro Woche unabhängig vom Guthaben sind bei 3.000 $ ein spürbarer Anteil und bei 300.000 $ eine Nebensache, genau umgekehrt zu dem, wofür die Werbung des Fonds gemacht ist.

Das größere und vermeidbarere Leck ist die voreingestellte Versicherung. Viele Fonds hängen automatisch Lebens- und Berufsunfähigkeitsschutz an und ziehen die Prämien vom Guthaben ab, Geld für Schutz, der nie in Anspruch genommen wird. Über das Mitgliederportal des Fonds lässt sich das meist in Minuten abschalten.

## Welche Fonds wickeln DASP gut ab?

Die großen Industry- und die großen Retail-Fonds bearbeiten Abreiseanträge routiniert und haben Systeme für die Identitätsprüfung aus dem Ausland. Kleine Standardfonds von Arbeitgebern sind die Stelle, an der Anträge stecken bleiben, denn ein Antrag eines früheren Mitglieds in Berlin mit abgelaufenem Visum ist dort eine Ausnahme und kein Verfahren.

Das ist eine praktische Unterscheidung, keine Rangliste. Der DASP-Antrag verlangt eine Visumsprüfung über Home Affairs und Ausweisdokumente, die aus dem Ausland bewertet werden, und die Genehmigung dauert nach vollständigen Unterlagen üblicherweise etwa 28 Tage.

## Was passiert, wenn du nie einen Fonds nennst?

Zwei Mechanismen greifen nacheinander. Dein Arbeitgeber prüft zuerst auf einen Stapled Fund, also einen bereits mit deiner TFN verknüpften Fonds aus früherer Arbeit, und zahlt dort ein, wenn es einen gibt. Gibt es keinen, gehen die Beiträge in den Standardfonds des Arbeitgebers.

Das funktioniert, und deshalb endet niemand ohne Super. Über ein Jahr mit vier Arbeitgebern erzeugt es Zersplitterung: mehrere Konten, mehrere Gebührensätze, mehrere DASP-Anträge. Ob man sie zusammenführt oder jeden getrennt beantragt, behandelt unser Guide zur [Zusammenlegung mehrerer Fonds](/de/blog/super-multiple-funds-consolidation).

## Was ist Payday Super, und ändert es etwas?

Ab dem 1. Juli 2026 müssen Arbeitgeber Super zeitgleich mit dem Lohn zahlen, in der Regel innerhalb von sieben Werktagen nach jedem Zahltag, statt quartalsweise. Für jeden mit kurzem Aufenthalt hat diese Compliance-Änderung einen echten Vorteil.

Bei quartalsweiser Zahlung war ein fehlender Beitrag bis zu drei Monate unsichtbar, und bis dahin hattest du den Job oft verlassen. Pro Lohnlauf gezahlt, zeigt sich eine Lücke innerhalb von zwei Wochen, während du noch da bist. Was zu tun ist, wenn eine auftaucht, steht in unserem Guide zu [nicht gezahlter Super](/de/blog/super-employer-not-paying-what-to-do).

## Was solltest du bei deinem ersten Job tun?

Nenne auf dem Super-Wahlformular einen Fonds und gib danach jedem Arbeitgeber dieselben Daten. Diese eine Gewohnheit verhindert das gesamte Problem, das dieser Guide beschreibt.

- Beim ersten Job einen bekannten Fonds nennen
- Auf jedem späteren Super-Nominierungsformular dieselben Fondsdaten angeben
- Die voreingestellte Versicherung im ersten Monat über die App des Fonds abschalten
- Die Mitgliedsnummer irgendwo aufbewahren, wo du sie in einem Jahr noch hast

Die Mitgliedsnummer ist der Teil, den die Leute verlieren. Ein Fonds lässt sich über deine TFN aufspüren, aber ein Antrag aus dem Ausland läuft deutlich schneller, wenn du das Konto nennen kannst, und ein Foto des Begrüßungsschreibens kostet nichts.

## Was entscheidet dein Ergebnis hier?

Vier Entscheidungen, alle in der ersten Woche deines ersten Jobs getroffen und danach nie wieder angefasst. Ob du einen Fonds genannt und dieselben Daten jedem weiteren Arbeitgeber gegeben hast. Ob du die voreingestellte Versicherung abgeschaltet hast. Ob der Fonds feste oder prozentuale Verwaltungsgebühren berechnet. Und ob der Fonds Anträge aus dem Ausland als Routine bearbeitet.

Das falsch zu machen ist nicht dramatisch, nur leise: drei kleine Guthaben in drei Fonds, jedes mit Prämien für Schutz, den niemand wollte, jedes mit eigenem Antrag, und eines davon ganz vergessen. Unser Guide zum [Auffinden verlorener Super](/de/blog/how-to-find-lost-superannuation) existiert, weil das der übliche Ausgang ist und nicht der seltene.
`,
  },

  'super-for-casual-and-part-time-workers': {
    title: 'Super für Casual und Teilzeit: 12 % gelten',
    description: 'Alle Arbeitnehmer in Australien haben Anspruch auf Super, egal ob Casual, Teilzeit oder Vollzeit. Aktuelle Sätze, Grenzen und was dich erwartet.',
    body: `
Ja. Superannuation ist auf alle Ordinary Time Earnings ab dem ersten Dollar geschuldet, für Casual-, Teilzeit- und Vollzeitangestellte gleichermaßen. Der Satz beträgt 12 %, vom Arbeitgeber zusätzlich zu deinem Lohn gezahlt und nicht daraus. Casual zu sein, befristet zu sein und auf einem Working-Holiday-Visum zu sein ändert daran nichts.

## Warum denken viele, es gäbe eine Untergrenze, bevor Super beginnt?

Weil es bis zum 1. Juli 2022 eine gab. Ein Arbeitgeber schuldete nichts für einen Monat, in dem du bei ihm unter 450 $ verdient hast, und Casual-Backpacker mit über mehrere Lokale verstreuten Schichten verloren dadurch rechtmäßig echtes Geld.

Sie ist weg. Seitdem löst jeder Dollar an Ordinary Time Earnings die Garantie aus: zwei Schichten in einem Pub, eine Woche Erntearbeit, eine einzelne Probezeit in einem Café erzeugen alle eine Superpflicht. Die einzige verbleibende Ausnahme sind Arbeitskräfte unter 18, die weiterhin mehr als 30 Stunden in einer Woche arbeiten müssen, bevor die Garantie greift.

## Ändert der Casual-Status etwas?

Nein. Das 25-%-Casual-Loading und die 12-%-Supergarantie sind getrennte Dinge, die beide gelten, und ein Arbeitgeber kann das Loading nicht so behandeln, als decke es die Super ab. Eine Schicht pro Woche erzeugt Super auf den Verdienst dieser Schicht, fünf Schichten auf alle.

Die Verwirrung kommt daher, dass das Loading als Ausgleich für bezahlten Urlaub und Kündigungsfrist beschrieben wird. Super steht nicht auf dieser Liste und wird Casuals zu denselben Bedingungen gezahlt wie allen anderen.

## Worauf wird Super eigentlich berechnet?

Auf die Ordinary Time Earnings, und das ist nicht dasselbe wie alles auf deinem Payslip. Erfasst sind deine regulären Stunden einschließlich Casual Loading, in der Regel auch Zuschläge und Zulagen, die an reguläre Stunden gebunden sind. Ausgenommen sind zu Überstundensätzen bezahlte Überstunden.

Für Wochenendarbeit lohnt hier eine Payslip-Prüfung. Sind die Sonntagszuschlagsstunden einer Casual-Kraft reguläre Dienstplanstunden, baut die Super auf dem geladenen Betrag auf und nicht auf einem gedachten Grundsatz. Wer sie auf den Grundsatz rechnet, zahlt zu niedrig.

## Wie erkennst du, ob sie tatsächlich gezahlt wird?

Indem du den Fonds prüfst und nicht den Payslip. Eine Payslip-Zeile mit Super sagt, was der Arbeitgeber zu zahlen beabsichtigt, und nicht, dass sie ankam.

Super muss nur quartalsweise gezahlt werden, bis zum 28. Oktober, 28. Januar, 28. April und 28. Juli, ein Abstand von einigen Wochen zwischen Payslip und Geldeingang ist also normal. Ein Abstand, der die Quartalsfrist überlebt, ist es nicht. Die Beitragshistorie des Fonds über ein volles Quartal gegen die Payslips zu halten klärt es.

## Was passiert damit, wenn du gehst?

Sie bleibt deine und ist als Departing Australia Superannuation Payment beantragbar, sobald dein Visum abgelaufen und du ausgereist bist. Die steuerpflichtige Komponente wird bei Working Holiday Makern mit 65 % besteuert. Das ist hoch, aber die Alternative ist, nichts davon zu bekommen.

Kleine Guthaben aus kurzen Casual-Einsätzen lohnen sich trotzdem, und mehrere Guthaben lassen sich gemeinsam bearbeiten. Anträge werden üblicherweise innerhalb von etwa 28 Tagen genehmigt. Den Antrag und sein Timing behandelt unser [Superannuation-Guide](/de/superannuation).

## Was ist das besondere Risiko bei Casual-Arbeit für viele Arbeitgeber?

Verlorene Konten. Eine Casual-Kraft, die keinen Fonds genannt hat, bekam bei jedem Arbeitgeber einen zugewiesen, und nach vier Jobs sind das möglicherweise vier Konten, die jeweils still Gebühren gegen ein kleines Guthaben berechnen.

Schlimmer noch: Beiträge vor dem Eingang deiner TFN beim Fonds lassen sich oft nicht dir zuordnen und landen beim ATO statt bei einem Fonds. Dieses Geld ist rückholbar, aber unsichtbar, und der häufigste Grund, warum die Super eines abreisenden Backpackers kleiner ist, als die Payslips sagen. Wie sie aufgespürt wird, steht in unserem Guide zum [Auffinden verlorener Superannuation](/de/blog/how-to-find-lost-superannuation).

## Ist alles angekommen, was geschuldet war?

Der Anspruch auf Super ist nicht die Variable. Was am Ende ankommt, schon. Jede dieser Tatsachen ändert, wie viel geschuldet war oder wie viel davon in einem Fonds mit deinem Namen ankam.

- Ob du vor oder nach dem 1. Juli 2022 gearbeitet hast, denn Lücken in einkommensschwachen Monaten waren davor rechtmäßig.
- Ob du Angestellter oder unter einer ABN beschäftigt warst, denn ein Contractor bekommt in der Regel gar keine Super.
- Ob Super auf die Ordinary Time Earnings inklusive Loading und Zuschlägen berechnet wurde oder auf einen nackten Grundsatz.
- Wie viele Arbeitgeber du hattest, denn jeder kann ein eigenes Konto eröffnet haben.
- Ob deine TFN jeden Fonds erreicht hat, denn davon hängt ab, ob Beiträge dir zugeordnet oder an das ATO geschickt wurden.
- Ob dein Visum abgelaufen und du ausgereist bist, denn erst das macht das Guthaben beantragbar.

Nicht gezahlte Super und eine nicht eingereichte Erklärung finden sich meist zusammen, und das Jahr wird in der [Working-Holiday-Steuererklärung](/de/tax-return) abgerechnet.
`,
  },

  'how-to-check-super-balance-working-holiday': {
    title: 'Superguthaben prüfen: wo es wirklich liegt',
    description: 'Deine Super liegt bei einem Fonds und nicht beim Arbeitgeber. Beiträge werden quartalsweise gezahlt, ein Guthaben kann also Monate nach der Arbeit noch leer aussehen.',
    body: `
Dein Superguthaben liegt bei dem Fonds, in den dein Arbeitgeber eingezahlt hat, und du erreichst es mit der Mitgliedsnummer, die dieser Fonds dir geschickt hat. Ob das Guthaben, das du siehst, das ganze Guthaben ist, entscheidet die Zahl deiner Jobs, denn jeder Arbeitgeber hat ein weiteres Konto eröffnet.

## Warum muss das Guthaben überhaupt geprüft werden?

Weil Super das einzige Geld ist, das du in Australien verdienst und das nie auf deinem Bankkonto erscheint. Es geht zusätzlich zum Lohn direkt in einen Fonds, quartalsweise statt pro Lohnlauf, dein Kontostand würde dir also nie sagen, dass es zu wenig ist.

Deshalb bleibt nicht gezahlte [Super](/de/superannuation) so lange unbemerkt. Ein Arbeitgeber, der Lohn zu niedrig zahlt, fliegt binnen zwei Wochen auf, weil der Eingang sichtbar falsch ist. Ein Arbeitgeber, der nie Super zahlt, kommt durch eine ganze Saison, und die Entdeckung fällt meist auf die Abreise, wenn sie am schwersten zu verfolgen ist.

## Wann sollten Beiträge tatsächlich auftauchen?

Nach der Quartalsfrist und nicht nach jedem Zahltag. Arbeitgeber müssen Super quartalsweise zahlen, ein Abstand von bis zu drei Monaten zwischen Arbeit und Geldeingang im Fonds ist also normal und der häufigste Grund, warum Leute Super für fehlend halten, obwohl sie es nicht ist.

Die vier Fristen sind der 28. Oktober für das Quartal Juli bis September, der 28. Januar für Oktober bis Dezember, der 28. April für Januar bis März und der 28. Juli für April bis Juni. Das Geld landet meist ein paar Tage um diese Termine herum im Fonds. Ein Quartal, das ein bis zwei Wochen nach seiner Frist noch leer ist, ist eine echte Lücke, dann lohnt der Vergleich von Payslip-Zeile und Fondsauszug.

## Was, wenn du nicht weißt, in welchem Fonds du bist?

Du hast fast sicher einen, und der Name steht an drei Stellen. Dein Payslip trägt Fondsname und oft Mitgliedsnummer, der schnellste Weg. In deinem Postfach liegt eine Begrüßungsmail des Fonds, womöglich unter einem Namen, den du nicht als Superfonds erkannt hast. Und das ATO führt eine Aufzeichnung jedes Fonds, der je einen Beitrag unter deiner TFN erhalten hat.

Die letzte zählt bei mehreren Jobs, denn nur sie zeigt vergessene Konten. Die meisten Working Holiday Maker landen in den großen Branchenfonds für Gastronomie, Einzelhandel und Bau, und ein Jahr mit Jobwechseln erzeugt drei oder vier getrennte Konten ohne eine einzige bewusste Entscheidung.

- Fondsname und Mitgliedsnummer, auf jedem Payslip gedruckt
- Die Begrüßungsmail, die bei Kontoeröffnung geschickt wurde
- ATO-Aufzeichnungen, die jeden Fonds mit Geld unter deiner TFN auflisten
- Alte Super, die als unclaimed money an das ATO gewandert ist und weiterhin dir gehört

## Warum kosten dich mehrere Konten Geld?

Weil jedes eigene Verwaltungsgebühren und oft eigene Versicherungsprämien berechnet, abgezogen von einem Guthaben, das zwischen den Jobs nicht wächst. Vier kleine Konten, die ein halbes Jahr stillstehen, verlieren insgesamt mehr an Gebühren als ein Konto mit demselben Geld, und bei Backpacker-Größenordnungen ist der Anteil erheblich.

Ob Zusammenführen der richtige Schritt ist, hängt an deinem Zeitplan. Bleibst du und arbeitest weiter, beendet das [Zusammenlegen der Konten](/de/blog/super-multiple-funds-consolidation) die doppelten Gebühren. Reist du in Wochen ab, werden ohnehin alle Konten über DASP beantragt, und vorher zu konsolidieren kann den Antrag eher verzögern als helfen. Immer falsch ist, ein vergessenes Konto liegen zu lassen, denn so wird Super als unclaimed money an das ATO übertragen und still zurückgelassen.

## Was sollte vor einem DASP-Antrag bestätigt sein?

Dass jedes Konto gefunden wurde und dass das letzte Quartal tatsächlich gezahlt ist. Ein Antrag auf einen Departing Australia Superannuation Payment schließt das Konto, gegen das er gestellt wird, jeder danach eintreffende Beitrag muss also getrennt hinterhergejagt werden, und das letzte Arbeitsquartal steht bei einer Abreise am ehesten noch offen.

Entscheidend ist der Zeitpunkt. Hörst du im Mai auf zu arbeiten und fliegst im Juni nach Hause, ist der Beitrag für April bis Juni erst am 28. Juli fällig, sofort zu beantragen heißt also, vor der Zahlungspflicht deines Arbeitgebers zu beantragen. Bis nach der Frist zu warten sammelt meist mehr ein, abzuwägen gegen den [Einbehalt von 65 %](/de/blog/tax-on-super-withdrawal-backpacker), der ohnehin auf die Zahlung angewendet wird, und gegen die rund 28 Tage, die eine DASP-Genehmigung nach Einreichung dauert.
`,
  },

  'dasp-documents-required': {
    title: 'DASP-Antrag: welche Dokumente du brauchst',
    description: 'Identität, Nachweis über das beendete Visum und Nachweis der Ausreise, für jeden Fonds getrennt. An beglaubigten Kopien bleiben die meisten Anträge aus dem Ausland hängen.',
    body: `
Drei Dinge, und zwar für jeden Fonds getrennt: Identitätsnachweis, Nachweis, dass dein Visum abgelaufen oder aufgehoben ist, und Nachweis, dass du Australien verlassen hast. Fehlende Unterlagen sind der Hauptgrund, warum aus einem Einmonatsantrag ein Sechsmonatsantrag wird, und an beglaubigten Kopien bleiben Anträge aus dem Ausland hängen.

## Bist du überhaupt schon antragsberechtigt?

Drei Bedingungen müssen zugleich erfüllt sein, und vorher einzureichen ist der häufigste vergeudete Antrag. Du hast Super angesammelt, während du auf einem temporären Visum gearbeitet hast, wozu 417 und 462 zählen. Du hast Australien verlassen. Dein Visum ist abgelaufen oder aufgehoben.

Solange das Visum aktiv ist, geht kein Antrag, auch nicht aus deinem Heimatland. Kommst du auf einem anderen temporären Visum zurück, kannst du trotzdem beantragen: Entscheidend ist, dass das Visum, unter dem die Super angesammelt wurde, geendet hat, und nicht, dass du nie zurückkehrst.

## Welche Ausweisdokumente will ein Fonds?

Den Pass, der auf deinem Working-Holiday-Visum genutzt wurde, und wenn du seither erneuert hast, beide Pässe, damit die Identitätskette sichtbar ist. Fonds verlangen häufig beglaubigte Kopien statt Fotos, besonders oberhalb von Guthabenschwellen um 5.000 $.

Beglaubigt heißt, dass eine autorisierte Person das Original gesehen und die Kopie bestätigt hat. Wer dafür zählt, unterscheidet sich je nach Fonds: ein australischer Notar oder Justice of the Peace, ein australisches Konsulat im Ausland oder eine örtlich anerkannte Entsprechung. Daran bleibt ein Antrag aus dem Ausland am häufigsten hängen, denn ob ein Notar in Hamburg auf der Liste eines Fonds steht, erfährst du nach dem Einreichen und nicht davor. Manche Fonds akzeptieren stattdessen eine digitale Identitätsprüfung.

Der praktische Ausweg ist zeitlich. Die Passkopie noch in Australien beglaubigen zu lassen dauert Minuten, kostet praktisch nichts und löscht die schlimmste Verzögerung der DASP-Kette, bevor sie entsteht.

## Was belegt, dass dein Visum geendet hat?

Nachweise des Department of Home Affairs, in einer von drei Formen. Ein Visa Grant Notice mit bereits verstrichenem Ablaufdatum. Ein Cancellation Notice, wenn das Visum vorzeitig aufgehoben wurde. Oder ein VEVO-Auszug, der den Status als abgelaufen zeigt, und das ist der häufigste, weil er den Live-Status zeigt.

Ein VEVO-Auszug muss erzeugt werden, nachdem das Visum tatsächlich geendet hat. Einer, der eine Woche zu früh gezogen wurde, zeigt ein aktives Visum und beweist das Gegenteil von dem, was du brauchst.

## Was belegt, dass du ausgereist bist?

Die von Home Affairs geführte Bewegungsaufzeichnung, die jede Ein- und Ausreise protokolliert. Fonds akzeptieren häufig auch eine Bordkarte der Abreise zusammen mit einem Ausreisestempel im Pass oder einen Einreisestempel in ein anderes Land nach dem Visumsablauf.

Entscheidend ist das Verhältnis der Daten. Die Ausreise muss nach dem Ende des Visums liegen. Ein Trip nach Bali in deinem neunten Monat ist für diese Zwecke keine Ausreise.

## Was macht einen Antrag schwierig?

Nicht die Steuer. Der Einbehalt von 65 % auf eine Working-Holiday-DASP ist immer derselbe. Die Schwierigkeit liegt im Papierkram und hängt an drei Dingen.

**Wie viele Fonds dein Geld halten.** Jeder ist ein eigener Antrag mit eigenen Dokumentenstandards, und jeder muss zuerst gefunden werden. Wer sich an einen Fonds erinnert und drei Arbeitgeber hatte, beantragt meist bei einem und lässt zwei liegen.

**Wo du bist, wenn du beantragst.** Die Beglaubigungsanforderungen setzt der Fonds und beurteilt sie nach dem Land der Beglaubigung, und einem stumm gewordenen Fonds ist aus einer anderen Zeitzone schwerer nachzugehen.

**Wie lange dein Weggang her ist.** Etwa sechs Monate nach Ende deines Visums und deiner Ausreise müssen Fonds nicht beantragte Guthaben an das ATO übertragen. Verloren ist das Geld nicht, aber es ist umgezogen und muss erst gefunden werden.

Genau diese Teile deckt unser [Superannuation-Service](/de/superannuation) ab: jeden Fonds zu finden statt nur den, an den du dich erinnerst, die fondsspezifischen Dokumentenstandards zu erfüllen, die Beglaubigung zu organisieren, stumm gewordenen Fonds nachzugehen und den Antrag neben der [Working-Holiday-Steuererklärung](/de/tax-return) deines letzten Jahres laufen zu lassen.

## Was geht am häufigsten schief?

Immer dieselbe kurze Liste. Passdaten, die nicht zu dem passen, was der Fonds hält, weil ein Arbeitgeber deinen Namen bei der Kontoeröffnung in Eile getippt hat. Ein falsch eingegebenes Visumsablaufdatum. Ein Abreisedatum vor dem Visumsablauf. Eine Beglaubigung, die der Fonds nicht akzeptiert. Und ein Antrag an einen Fonds, der gar kein Guthaben hält.

Der letzte ist der häufigste von allen. Wer drei Arbeitgeber hatte, hat meist drei Fonds, und jeder muss einzeln identifiziert und beantragt werden. Wie die zentrale Aufzeichnung funktioniert, steht unter [verlorene Superannuation finden](/de/blog/how-to-find-lost-superannuation).

## Wie schwer wird dein Papierkram?

Jeder Fonds will dieselben drei Dinge. Wie schwer sie zu beschaffen sind, hängt davon ab, wo du bist und wie lange dein Weggang her ist.

- Wie lange dein Weggang her ist, denn davon hängt ab, ob dein Geld noch bei Fonds oder schon beim ATO liegt.
- Ob du deinen Pass seit deiner Arbeit in Australien erneuert hast.
- Wie hoch das Guthaben jedes Fonds ist, denn Beglaubigungsanforderungen verschärfen sich üblicherweise oberhalb von rund 5.000 $.
- Wo du Dokumente beglaubigen lässt, denn die Akzeptanz unterscheidet sich nach Land und nach Fonds.
- Wie viele Arbeitgeber du hattest, denn so viele getrennte Anträge werden daraus.
- Ob auch die Erklärung deines letzten Jahres offen ist, denn das ist getrenntes Geld und in der Regel günstiger besteuert.

Berechtigungsregeln, Einbehalt und Timing stehen dort, wo du deine [Superannuation nach der Ausreise aus Australien beantragst](/de/superannuation).
`,
  },

  // ─── More Medicare & Other posts ───────────────────────────────────────────
  'what-is-an-income-statement': {
    title: 'Income Statement: finden und richtig lesen',
    description: 'Das Income Statement ersetzt das alte PAYG Payment Summary und zeigt dein Jahreseinkommen plus einbehaltene Steuer. So greifst du als WHM darauf zu.',
    body: `
Ein Income Statement ist die digitale Aufzeichnung dessen, was ein Arbeitgeber dir in einem Steuerjahr gezahlt und was er einbehalten hat. Es hat unter Single Touch Payroll die alte PAYG Payment Summary auf Papier ersetzt. Dein Arbeitgeber meldet es über die Lohnbuchhaltung, und es ist erst final, wenn es als abgabefertig markiert ist.

## Woher kommt ein Income Statement?

Aus der Lohnsoftware deines Arbeitgebers, nicht aus einem Formular, das am Jahresende jemand ausfüllt. Unter Single Touch Payroll meldet jeder Lohnlauf deinen Bruttolohn, die einbehaltene Steuer und deine Superannuation laufend an das ATO, und das Income Statement ist die aufgelaufene Summe dieser Meldungen.

Folge: Die Aufzeichnung gehört den Systemen des ATO, nicht deinem früheren Arbeitgeber. Eine Farm in Mildura, die auf keine E-Mail mehr antwortet, hat deinen Lohn längst gemeldet, und die Zahlen lassen sich ohne sie abrufen.

## Wann wird es nutzbar?

Das Jahr endet am 30. Juni, Arbeitgeber beginnen ab etwa dem 14. Juli abzuschließen, und die meisten sind bis zum 31. Juli fertig. Bis dahin zeigt das Statement Jahreszahlen, die noch nicht als vollständig erklärt sind, danach wechselt der Status auf abgabefertig.

Gegen ein noch nicht abgabefertiges Statement einzureichen führt zuverlässig zu einem falschen Bescheid und einer späteren Berichtigung, denn die Zahlen können sich noch ändern. Zu warten, bis jeder Arbeitgeber abgeschlossen hat, ist mehr wert, als in der ersten Juliwoche einzureichen.

## Welche drei Zahlen musst du prüfen?

Gross payments, tax withheld und die daneben ausgewiesene Super. Diese drei sagen dir, ob dein Jahr so besteuert wurde, wie es hätte sein sollen.

- **Gross payments.** Vergleiche mit deiner eigenen laufenden Summe aus den Payslips. Eine Lücke heißt entweder eine fehlende Lohnperiode oder eine Unterbezahlung.
- **Tax withheld.** Teile durch das Brutto. Rund 15 % ist für einen Working Holiday Maker bei einem registrierten Arbeitgeber richtig. Deutlich mehr heißt eine Phase ohne hinterlegte TFN oder ein Arbeitgeber, der sich nie registriert hat.
- **Super.** Beiträge laufen quartalsweise, eine im Juli dünn aussehende Zahl ist also möglicherweise schlicht noch nicht gezahlt.

## Was, wenn ein Arbeitgeber fehlt?

Ein fehlender Arbeitgeber ist der häufigste Mangel, mit drei Ursachen und drei Antworten. Er hat noch nicht abgeschlossen, dann löst Warten es. Er hat dich unter falschem Namen oder Geburtsdatum gemeldet, dann existiert die Aufzeichnung, hängt aber nicht an dir. Oder er hat den Lohn nie gemeldet, der Barzahlungsfall.

So oder so ist das verdiente Einkommen steuerpflichtig und gehört in die Erklärung, ob ein Statement dafür existiert oder nicht. Wie man eine Phase ohne gemeldete Aufzeichnung rekonstruiert, steht in unserem Guide zur [Steuererklärung mit Bareinkommen](/de/blog/cash-in-hand-tax-return).

## Was, wenn die Zahlen falsch sind?

Fehler im Statement korrigiert der Arbeitgeber, nicht du, indem du die Erklärung an deine Payslips anpasst. Übliche Fehler sind eine Bruttosumme, die sich nicht abstimmen lässt, eine Einbehaltungszahl, die den falschen Wohnsitzstatus abbildet, und doppelte Lohnperioden nach einem Wechsel des Lohnsystems.

Wo ein Arbeitgeber reagiert, erfolgt eine Korrektur meist innerhalb von ein bis zwei Lohnzyklen. Sonst kann die Erklärung auf einer sauber gestützten Schätzung eingereicht und später geändert werden, dafür gibt es ein Zweijahresfenster. Was nicht funktioniert, ist still eine Zahl zu verwenden, die das ATO nicht hält, denn diese Abweichung schickt eine Erklärung in die manuelle Prüfung.

## Was entscheidet, wie vollständig deine Erklärung ist?

Ob jeder Arbeitgeber des Jahres erfasst wurde, und nichts anderes kommt dem nahe. Ein Working-Holiday-Jahr umfasst häufig drei, vier oder fünf Arbeitgeber über zwei Bundesstaaten und oft zwei Steuerjahre, und der vergessene ist fast immer der kurze: drei Wochen Packen im Februar, zwei Wochen Promotionarbeit, eine Agenturschicht.

Einen davon auszulassen ist der häufigste Fehler bei der Selbstabgabe, und er schneidet in beide Richtungen. Ein vergessener Arbeitgeber mit hohem Einbehalt ist eine Erstattung, die du nie beantragt hast. Einer mit nicht erklärtem Einkommen ist später eine Berichtigung und eine Zinsbelastung. Bei der Vorbereitung einer [Steuererklärung](/de/tax-return) wird die vollständige Liste zuerst aus den ATO-Systemen gezogen, weil das Gedächtnis über ein Jahr in Bewegung unzuverlässig ist.

## Was solltest du selbst aufheben?

Payslips, Bankauszüge mit den eingehenden Löhnen und alles Schriftliche über deinen Lohnsatz. Das Income Statement sagt dir, was gemeldet wurde. Deine eigenen Aufzeichnungen sagen dir, ob das Gemeldete das ist, was dir tatsächlich zustand.

Diese Unterscheidung zählt am meisten in Farmarbeit und Gastronomie, wo die gemeldete Zahl als Aufzeichnung einer Unterbezahlung zutreffend sein kann. Die Erklärung entsteht auf den gemeldeten Zahlen, aber die Lücke lohnt es zu kennen, denn sie über Fair Work zurückzuholen ist ein getrenntes und kostenloses Verfahren.
`,
  },

  'what-is-the-ato': {
    title: 'Was ist das ATO und wann brauchst du es?',
    description: 'Das ATO ist Australiens Finanzamt. Es vergibt die TFN, prüft deine Erklärung, zahlt Erstattungen aus und wickelt den DASP-Antrag für deine Super mit ab.',
    body: `
Das Australian Taxation Office ist die Bundesbehörde, die das australische Steuersystem betreibt. Für Working Holiday Maker tut es vier Dinge: Es stellt deine TFN aus, es empfängt, was Arbeitgeber und Superfonds über dich melden, es bearbeitet deine Steuererklärung und zahlt die Erstattung, und es gibt Super nach deiner Abreise frei.

## Was macht das ATO, das dich tatsächlich betrifft?

Alles läuft über deine Tax File Number, deshalb zählt sie weit über den ersten Monat hinaus. Das ATO stellt sie aus und verknüpft darüber jede Lohnmeldung, jeden Superbeitrag, jede Bankzinszahlung und jede eingereichte Erklärung mit dir.

Sein weiterer Auftrag umfasst Einkommensteuer, GST, das Unternehmensregister und die Superannuation Guarantee. Fast nichts davon berührt Backpacker direkt. Die vier Berührungspunkte oben sind für die meisten das Ganze.

## Woher weiß das ATO, was du verdient hast?

Automatisch, bevor du irgendetwas sagst. Arbeitgeber melden Löhne und einbehaltene Steuer mit jeder Abrechnung über Single Touch Payroll, Superfonds melden für dich geleistete Beiträge, Banken melden Zinsen auf australischen Konten, und Aktienregister melden Dividenden.

Deshalb lässt sich eine Erklärung aus einem anderen Land ohne einen einzigen Payslip einreichen. Und deshalb ist ein Arbeitgeber, der nie abgeschlossen hat, ein echtes Problem: Das Einkommen existiert, der Datensatz des ATO zeigt es nicht. Deine Payslips schließen diese Lücke.

## Wann würde das ATO dich kontaktieren?

Die meisten Working Holiday Maker hören nie direkt von ihm. Die Gründe für Kontakt sind eng: Es braucht mehr Informationen zur Bearbeitung einer Erklärung, seine Zahlen passen nicht zu den erklärten, Steuer ist offen, eine Identitätsprüfung hält eine Erstattung auf, oder, selten, eine Prüfung wurde eröffnet.

Legitimer Kontakt kommt per Post an die hinterlegte Adresse oder über einen Steuerberater. Deshalb zählt eine veraltete Adresse mehr, als es scheint: Ein Brief, den du nie gesehen hast, gilt trotzdem als zugegangen.

## Wie unterscheidest du echten Kontakt von Betrug?

Daran, was verlangt wird und wie dringend. Das ATO ruft nicht an und fordert sofortige Zahlung, nimmt keine Zahlung in Geschenkkarten oder Kryptowährung, droht nicht mit Verhaftung oder Abschiebung und bittet dich nicht, in der Leitung zu bleiben, während du in ein Geschäft gehst.

Working Holiday Maker werden gezielt ausgesucht: neu im Land, unsicher, was normal ist, und für sie ist die Drohung mit einem Visumsproblem glaubwürdig. Die richtige Reaktion ist aufzulegen und unabhängig zu prüfen. Dadurch geht nie etwas Echtes verloren.

## Welche Rolle spielt das ATO dabei, deine Super zurückzubekommen?

Meist die des Torwächters, nicht die des Zahlers. Wird eine Departing Australia Superannuation Payment beantragt, prüft das ATO, dass dein Visum beendet ist und du ausgereist bist, dann geht der Antrag an deinen Superfonds, der die 65 % einbehält und das Guthaben freigibt.

Die Ausnahme ist Super, den das ATO bereits hält. Wo ein Fonds den Kontakt verloren hat, wird das Guthaben als unclaimed super ans ATO übertragen, und dann zahlt das ATO direkt. Wer Australien vor mehr als sechs Monaten ohne Adressaktualisierung verlassen hat, ist womöglich betroffen. Beide Wege stehen dort, wo du deine [Superannuation nach der Abreise auszahlen lässt](/de/superannuation).

## Wie sauber sind deine Daten beim ATO?

Die meisten haben mit dem ATO vier Routinekontakte und sonst nichts. Ob die glattgehen, entscheidet der Zustand seiner Daten über dich.

- Ob Adresse und Bankdaten beim ATO aktuell sind, was entscheidet, ob dich überhaupt etwas erreicht.
- Ob jeder Arbeitgeber seine Meldung abgeschlossen hat, was über die Vollständigkeit deines Jahresbildes entscheidet.
- Ob du noch Zugriff auf ein eingerichtetes Onlinekonto hast, was erst im Ausland zum Problem wird.
- Ob deine Super bei Fonds liegt oder bereits als unclaimed ans ATO übertragen wurde.
- Ob es Vorjahre gibt, die nie eingereicht wurden, denn die Daten des ATO zeigen sie weiterhin.

Deine jährliche Abrechnung mit dem ATO ist deine [Steuererklärung als Working Holiday Maker](/de/tax-return), und du kannst deine [Steuererstattung schätzen](/de/calculator), bevor du irgendetwas einreichst.
`,
  },

  'gross-pay-vs-net-pay-australia': {
    title: 'Brutto und Netto: was bleibt vom Lohn?',
    description: 'Brutto ist dein Stundenlohn mal Stunden, Netto ist das, was nach Steuer und Super auf deinem Konto landet. Mit Beispielrechnung für Working Holiday Maker.',
    body: `
Der Bruttolohn ist das, was du vor Steuern verdient hast. Der Nettolohn ist das, was auf deinem Bankkonto ankommt. Auf einem Working-Holiday-Visum mit hinterlegter TFN liegen rund 15 % des Brutto dazwischen. Superannuation gehört nicht in diese Lücke: Sie wird zusätzlich zu deinem Lohn in einen Fonds gezahlt, nicht davon abgezogen.

## Was bedeuten die Zahlen auf deinem Payslip?

Ein australischer Payslip trennt vier Größen, und zwei davon zu verwechseln ist der Weg, auf dem Leute sich für unterbezahlt halten, obwohl sie es nicht sind. Der Bruttolohn ist Stunden mal Satz, plus Zuschläge, Loading und Zulagen. Tax withheld ist das, was dein Arbeitgeber in deinem Namen ans ATO schickt, der Nettolohn ist brutto minus diesen Einbehalt.

- **Gross pay**: Gesamtverdienst, bevor irgendetwas herausgenommen wird
- **Tax withheld**: PAYG, in deinem Namen ans ATO abgeführt
- **Net pay**: brutto minus einbehaltene Steuer, der überwiesene Betrag
- **Super**: eine eigene Zeile, vom Arbeitgeber in deinen Fonds gezahlt

Bei 1.000 $ Bruttolohn bei einem registrierten Working-Holiday-Maker-Arbeitgeber werden 150 $ mit 15 % einbehalten, 850 $ landen auf deinem Konto, und 120 $ Super mit 12 % gehen an deinen Fonds. Der Super taucht in den 850 $ nie auf und soll es auch nicht.

## Warum ist Superannuation kein Abzug?

Superannuation ist ein Kostenpunkt des Arbeitgebers obendrauf, kein Stück deines Lohns. Sie wird mit 12 % auf deinen gewöhnlichen Bruttoverdienst berechnet und in einen Fonds auf deinen Namen gezahlt, und dein Bruttolohn ist derselbe, ob der Arbeitgeber daran denkt oder nicht. Das ist die häufigste Fehldeutung eines australischen Payslips bei Neuankömmlingen.

Zeigt ein Payslip, dass Super vom Brutto abgezogen wird, um zu einem niedrigeren Brutto zu kommen, ist das keine Darstellungsmarotte. Es bedeutet einen Lohnfehler oder einen Arbeitgeber, der einen Lohn behandelt, als enthielte er die Super bereits, und das ändert, was dir zusteht. Was dagegen zu tun ist, steht in unserem Guide zu [nicht gezahlter Super](/de/blog/super-employer-not-paying-what-to-do).

## Welche Zahl nutzt deine Steuererklärung?

Deine Steuererklärung und dein Income Statement nutzen den Bruttolohn, nie den Netto. Das ATO berechnet deine Schuld auf den Bruttoverdienst des Jahres und rechnet die bereits einbehaltene Steuer an, und die Differenz ist deine Erstattung oder deine Rechnung. Der Nettolohn kommt nirgends vor.

Das erwischt Leute, die ihr Jahr in der Banking-App verfolgt haben. Der Betrag auf deinem Konto ist rund 85 % der Zahl, die das ATO verwendet, das Jahr sieht von der Bankseite also immer kleiner aus.

## Was entscheidet, wie viel vom Brutto du tatsächlich behältst?

Drei Fakten über dein Jahr, und keiner davon ist fest. Dein Einbehaltssatz ist der größte: 15 % mit hinterlegter TFN bei einem registrierten Working-Holiday-Maker-Arbeitgeber, 45 % ohne, und Foreign-Resident-Sätze, wenn der Arbeitgeber sich nie als WHM-Arbeitgeber registriert hat. Jeder erzeugt bei gleichem Brutto eine sehr unterschiedliche Nettozahl.

- **Ob deine TFN ab Tag eins vorlag.** Wochen bei 45 %, bevor das Declaration-Formular verarbeitet war, zeigen sich als deutlich dünnerer Nettolohn, und der Überschuss kommt zur Steuerzeit zurück, nicht in der Lohnabrechnung.
- **Ob der Arbeitgeber beim ATO zur Beschäftigung von Working Holiday Makern registriert ist.** Ein nicht registrierter behält zu Foreign-Resident-Sätzen ein, die ab dem ersten Dollar über 15 % liegen.
- **Ob Zuschläge, Loading und Zulagen überhaupt gezahlt wurden.** Ein Casual-Satz, der das Loading von 25 % still weglässt, senkt den Bruttolohn, bevor der Einbehalt ins Spiel kommt, und dieser Verlust kommt nicht als Erstattung zurück.

## Wie prüfst du, ob die Bruttozahl stimmt?

Den Bruttolohn nachzurechnen dauert etwa fünf Minuten und lohnt sich einmal pro Arbeitgeber, früh, solange du dich an die Schichten erinnerst.

1. Reguläre Stunden mal Stundensatz
2. Plus Zuschläge für Wochenend-, Abend- und Feiertagsschichten
3. Plus Zulagen wie Uniform, Werkzeug oder Fahrt
4. Plus Überstunden zum korrekten Satz
5. Die Summe mit der Bruttozeile auf dem Payslip vergleichen

Wo die Zahlen nicht zusammenpassen, liegt die Ursache meist in einer Einstufung, die im Award eine Stufe zu niedrig ist, und nicht in absichtlichem Diebstahl. Das lohnt sich schriftlich bei der Lohnbuchhaltung anzusprechen, denn es ist auch die Variante, die Arbeitgeber schnell korrigieren.

## Wo hört das auf, eine Payslip-Frage zu sein?

Dort, wo die Lücke zwischen brutto und netto von deiner Steuerposition kommt und nicht von der Rechnung. Ein Überabzug bei 45 %, ein nicht registrierter Arbeitgeber, eine Medicare Levy, die jemandem ohne Anspruch berechnet wird, und eine falsch beantwortete Wohnsitzfrage schrumpfen den Nettolohn während des Jahres und werden alle über die Erklärung zurückgeholt, oder eben nicht.

Das kann der Payslip dir nicht sagen. Er zeigt den genommenen Betrag, nicht ob er genommen werden durfte. Herauszufinden, was davon auf dein Jahr zutraf, ist der Zweck einer [Steuererklärung](/de/tax-return), und der Grund, warum zwei Backpacker mit identischem Bruttolohn tausende Dollar auseinanderliegen können. Du kannst deine [Steuererstattung schätzen](/de/calculator), bevor du einreichst.
`,
  },

  'tax-obligations-after-leaving-australia': {
    title: 'Nach der Abreise: was noch zu erledigen ist',
    description: 'Australien zu verlassen heißt nicht, dass deine Steuerpflichten enden. Steuererklärung, DASP und ABN-Kündigung laufen weiter, auch aus Deutschland.',
    body: `
Australien zu verlassen schließt deine Steuerakte nicht. Hattest du in einem australischen Steuerjahr Einkommen, musst du für dieses Jahr weiterhin einreichen, und du kannst es von überall tun. Dein Superantrag, eine etwaige ABN-Beendigung und deine letzte Erklärung überleben den Rückflug alle.

## Was steht nach deinem Weggang noch offen?

Vier Dinge, und sie sind voneinander unabhängig: Eines zu erledigen räumt die anderen nicht ab. Die letzte Erklärung muss eingereicht, die [Superannuation](/de/superannuation) beantragt, eine etwaige [ABN](/de/abn) beendet werden, und das ATO braucht Kontaktdaten, die dich noch erreichen.

- Eine Erklärung für jedes australische Steuerjahr einreichen, in dem du Einkommen hattest
- Deine Super über den Departing Australia Superannuation Payment beantragen
- Jede ABN beenden, die du als Sole Trader registriert hast
- Eine E-Mail-Adresse und ein Bankkonto behalten, die noch funktionieren

Das ATO hat deine Einkommensaufzeichnungen von jedem Arbeitgeber, egal wo du bist. Ein nicht eingereichtes Jahr bleibt also nicht unbemerkt, es steht offen.

## Wie funktioniert die Abgabe aus dem Ausland wirklich?

Es ist dieselbe Erklärung, gleich erstellt, von einer anderen Postleitzahl aus. Income Statements werden aus den ATO-Systemen abgerufen und nicht bei deinen früheren Arbeitgebern, denn einer Packhalle in Queensland von Berlin aus Papiere hinterherzujagen ist kein realistischer Plan.

Die Standardfrist ist der 31. Oktober nach Ende des Steuerjahres. Über einen registrierten Steuerberater eingereichte Erklärungen tragen in der Regel eine verlängerte Frist bis in den Mai des Folgejahres. Die Mechanik behandelt unser Guide zur [Abgabe aus dem Ausland](/de/blog/how-to-lodge-tax-return-from-overseas).

## Wann kannst du deine Super beantragen?

Der DASP-Antrag öffnet sich, sobald beides erfüllt ist: Dein Visum ist außer Kraft getreten, und du hast Australien verlassen. Wer ausreist, während das Visum noch läuft, muss warten, bis es abläuft oder aufgehoben wird.

Die Zahlung wird bei Working-Holiday-Maker-Beiträgen mit 65 % einbehalten, ein Guthaben von 10.000 $ zahlt also etwa 3.500 $ aus. Die Genehmigung dauert nach vollständigem Antrag üblicherweise etwa 28 Tage, und der Nettobetrag kann je nach Fonds auf ein australisches oder ein ausländisches Konto gehen. Verfahren und Unterlagen behandelt unser [Superannuation-Guide](/de/superannuation).

## Was passiert, wenn du die Super einfach liegen lässt?

Hat ein Fonds sechs Monate nach deiner Ausreise und dem Ablauf deines Visums nichts von dir gehört, überträgt er das Guthaben als unclaimed super an das ATO. Das Geld bleibt deines, aber der Antrag wird zu einem ATO-Antrag statt zu einem Fondsantrag, mit anderem Papierkram.

Geld kostet vor allem, mehrere Fonds zu haben und nur bei dem zu beantragen, an den man sich erinnert. Vier Arbeitgeber über ein Jahr bedeuten sehr oft mehr als einen Fonds, und jeder hält ein eigenes Guthaben, das einen eigenen Antrag braucht. Wie man sie aufspürt, steht in unserem Guide zum [Auffinden verlorener Super](/de/blog/how-to-find-lost-superannuation).

## Kannst du vor dem 30. Juni einreichen, wenn du endgültig gehst?

Ja, und es ist die Möglichkeit, die fast niemand kennt. Wer Australien mitten in einem Steuerjahr endgültig verlässt, kann für dieses Teiljahr eine vorgezogene Erklärung einreichen, statt bis Juli zu warten, und holt die Erstattung damit um Monate nach vorn.

Automatisch die bessere Wahl ist es nicht. Eine vorgezogene Erklärung wird erstellt, bevor die Arbeitgebermeldungen abgeschlossen sind, die Zahlen müssen also aus Payslips aufgebaut statt abgerufen werden, und kommst du im selben Jahr zurück, muss die Erklärung geändert werden. Sie passt zu einem sauberen Abgang mit vollständigen Unterlagen, nicht zu einem unsicheren.

## Was entscheidet, ob das einfach oder unordentlich wird?

Drei Tatsachen darüber, wie du gegangen bist. Ob dein australisches Bankkonto noch offen ist, denn Erstattung und DASP-Zahlung gehen beide auf ein Konto und eines aus dem Ausland wieder zu eröffnen ist wirklich schwer. Ob du jeden Arbeitgeber des Jahres kennst, denn ein vergessener Job ist die übliche Ursache einer Berichtigung Monate später. Und ob das Visum abgelaufen ist, denn das schaltet den Superantrag frei.

Das Konto richtet den echten Schaden an. Alles in der Woche vor dem Abflug zu schließen macht aus einer unkomplizierten Erstattung eine monatelange Übung darin, Zahlungsdaten von einem anderen Kontinent aus neu einzurichten. Halte es drei bis vier Monate nach der Abreise offen, bis Erstattung und Super angekommen sind.

## Macht es etwas, wenn du schlicht nicht einreichst?

Später mehr als jetzt. Ein nicht eingereichtes Jahr bleibt unbefristet in der Akte, und wo eine Erstattung geschuldet war, bleibt sie schlicht unbezahlt. Das ist das häufigste und leiseste Ergebnis.

Wo Steuer geschuldet statt erstattet wurde, laufen Zinsen auf. Die Schuld folgt der Steuerakte und nicht der Person, und sie taucht auf, wenn es einen Anlass gibt hinzusehen, einschließlich eines künftigen australischen Visumsantrags. Wo die Strafen tatsächlich greifen, und das ist selten dort, wo Leute es fürchten, behandelt unser Guide zu [verspäteten Erklärungen und Strafen](/de/blog/late-tax-return-penalty-working-holiday).
`,
  },

  'opening-bank-account-australia-working-holiday': {
    title: 'Australisches Bankkonto eröffnen: Ablauf',
    description: 'Konto online vor oder nach der Ankunft eröffnen, in den ersten 6 Wochen reicht der Reisepass. Die bekanntesten Banken und die TFN-Frage beim Eröffnen.',
    body: `
Du brauchst ein australisches Bankkonto für deinen Lohn und später für Steuererstattung und Superzahlung. Alle vier großen Banken eröffnen Konten für Working Holiday Maker auf den Pass, und die meisten lassen dich vor der Ankunft online beantragen. Die wichtige Entscheidung ist nicht welche Bank, sondern wann du das Konto schließt.

## Welche Bank solltest du wählen?

Für den Alltag liegt zwischen Commonwealth Bank, Westpac, ANZ und NAB sehr wenig. Alle vier bieten Girokonten mit niedrigen Gebühren, Apps, Debitkarten und breite Automatennetze und eröffnen routiniert Konten für Ankommende auf einem Working-Holiday-Visum.

Das eine Kriterium, das wirklich variiert, ist die Abdeckung entlang deiner Route. Filialen und Automaten in den Regionalstädten, in die du willst, sind mehr wert als eine minimal bessere Gebührenstruktur, denn gebührenfreier Automatenzugang in Mildura ist nicht selbstverständlich.

## Was brauchst du zur Eröffnung?

Weniger, als die meisten denken, und deshalb ist das eine der leichteren Aufgaben der ersten Woche.

- Ein gültiger Pass
- Eine australische Wohnadresse, auch ein Hostel
- Eine australische Telefonnummer
- In manchen Fällen ein zweites Ausweisdokument
- Deine TFN, die nützlich, aber nicht erforderlich ist

Die meisten Banken lassen dich den Antrag online beginnen, bevor du fliegst, mit Identitätsprüfung in einer Filiale in den ersten Tagen nach der Ankunft. Die Onlinehälfte vorab zu erledigen ist die zwanzig Minuten wert, denn der Filialbesuch ist dann kurz.

## Musst du ihnen deine TFN geben?

Nein, und du kannst ein Konto ohne sie eröffnen und führen. Die Folge beschränkt sich auf Zinsen: Ohne erfasste TFN muss die Bank Steuer auf Zinserträge zum Spitzensatz einbehalten.

Auf einem Alltagskonto, das Cent erwirtschaftet, ist das belanglos. Trag die TFN nach, wenn der Brief ankommt, und lass ihr Fehlen die Kontoeröffnung nicht verzögern: BSB und Kontonummer brauchst du vor deiner ersten Schicht dringender als eine korrekte Zinsbehandlung.

## Was kosten die Gebühren tatsächlich?

Die meisten großen Banken berechnen eine Monatsgebühr von rund 5 $, die meist erlassen wird, wenn monatlich ein Mindestbetrag eingeht, üblicherweise etwa 2.000 $. Wer regelmäßig arbeitet, erreicht das leicht, und die Gebühr beißt nur in einem Monat, in dem du gereist statt gearbeitet bist.

Mehrere Banken führen außerdem gebührenfreie Konten für Neuankömmlinge und Studierende, die die Schwelle ganz umgehen. Danach direkt zu fragen lohnt sich, denn sie werden am Schalter nicht immer von selbst angeboten.

## Solltest du stattdessen einen Transferdienst nutzen?

Ein Transferdienst ist eine Ergänzung, kein Ersatz. Solche Dienste liefern bei einer vierstelligen Überweisung nach Hause in der Regel einen besseren Wechselkurs als eine Bank, aber sie geben dir nicht, was die Lohnbuchhaltung eines australischen Arbeitgebers braucht, und dorthin zahlt das ATO auch keine Erstattung.

Das brauchbare Setup ist beides: ein australisches Bankkonto für Lohn, Steuererstattung und Super, und ein Transferdienst, um das Geld zu gegebener Zeit nach Hause zu bringen. Die steuerliche Lage dazu, nämlich dass es keine gibt, behandelt unser Guide zu [Geld aus Australien überweisen](/de/blog/transferring-money-overseas-australia-tax).

## Wann solltest du das Konto schließen?

Nicht beim Abflug. Das ist die folgenreichste Bankentscheidung eines Working Holiday, und fast alle treffen sie nebenbei in der letzten Woche.

Sowohl deine Steuererstattung als auch deine DASP-Superzahlung kommen Wochen oder Monate nach der Abreise an, und beide gehen auf ein australisches Konto.

- Die [Steuererklärung](/de/tax-return) einreichen und [DASP](/de/superannuation) beantragen, vor oder kurz nach der Abreise
- Das Konto drei bis vier Monate nach der Abreise offen halten
- Das Guthaben nach Hause überweisen, sobald beide Zahlungen durch sind
- Das Konto zuletzt schließen

Die Folgen der umgekehrten Reihenfolge sehen wir regelmäßig. Das Geld ist nicht verloren, aber Zahlungsdaten beim ATO und einem Superfonds aus einem anderen Land neu zu hinterlegen macht aus zwei Wochen Wartezeit mehrere Monate, und manche geben schlicht auf.

## Wie vermeidest du die Betrugsmaschen, die auf Neuankömmlinge zielen?

Geh davon aus, dass jede Nachricht, die dich auffordert, einen Link anzuklicken und Bankdaten einzugeben, Betrug ist, denn das ist sie. Das ATO fordert dich nicht per SMS oder E-Mail-Link zur Aktualisierung von Bankdaten auf, verlangt keine Zahlung in Geschenkkarten oder Kryptowährung und droht nicht mit Verhaftung oder Visumsentzug.

Working Holiday Maker werden gezielt anvisiert, weil Neuankömmlinge nicht wissen, wie normaler ATO-Kontakt aussieht, und weil eine Drohung rund ums Visum bei ihnen härter landet. Im Zweifel unabhängig prüfen, statt auf die Nachricht einzugehen. Wer tatsächlich nach deinen Daten fragen darf, steht in unserem Guide zum [Schutz deiner TFN](/de/blog/tfn-security-protect-from-fraud).
`,
  },

  'german-european-health-insurance-australia-working-holiday': {
    title: 'Krankenversicherung für deutsche Backpacker',
    description: 'Deutschland hat kein Medicare-Abkommen mit Australien. Ohne eigene Versicherung zahlst du Notfälle selbst. Optionen, Kosten und die Levy-Befreiung.',
    body: `
Nein. Deutschland hat kein Reciprocal Health Care Agreement mit Australien, deutsche Working Holiday Maker haben also keinen Anspruch auf [Medicare](/de/medicare) und zahlen Behandlungen privat. Zur Steuerzeit hat das eine zweite Folge: Kein Anspruch eröffnet die Befreiung von der Medicare Levy von 2 %.

## Welche Länder haben ein Abkommen, und welche nicht?

Australien hat Reciprocal Health Care Agreements mit elf Ländern, und die Liste ist die ganze Antwort. Es gibt keine Teilabdeckung, keine EU-weite Regelung und keine Gegenseitigkeit über ein Drittland.

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

Deutschland steht nicht darauf, ebenso wenig Frankreich, Spanien, Österreich, die Schweiz, die USA, Kanada und Japan. Identisch sind die Abkommen nicht, und was jedes abdeckt, steht in unserem Guide zu [Ländern mit Medicare-Abkommen](/de/blog/countries-with-medicare-agreement-australia).

## Was heißt das in einer Arztpraxis?

Du bist Privatpatient und zahlst den vollen Preis, ohne Medicare-Erstattung und ohne PBS-Zuschuss auf Rezepte. Ein Hausarztbesuch liegt üblicherweise bei 80 bis 120 $, ein Facharzttermin beginnt bei rund 200 $. In echten Notfällen wird unabhängig von der Zahlungsfähigkeit behandelt, und die Rechnung folgt danach.

Die gesetzliche Krankenversicherung bereitet auf ein Land, in dem am Tresen gezahlt wird, nicht vor. Der Krankenwagen ist die schärfste Variante: in den meisten Bundesstaaten für niemanden von Medicare abgedeckt, ein einzelner Einsatz also eine direkte Ausgabe im dreistelligen Bereich.

## Folgt dir dein deutscher Versicherungsschutz?

Nein. Die gesetzliche Krankenversicherung deckt EU-Länder und eine kleine Zahl von Abkommensstaaten ab, und Australien gehört nicht dazu. Die EHIC endet am Gate.

Manche privaten deutschen Policen enthalten Auslandsreiseschutz, typischerweise gedeckelt bei etwa sechs Wochen pro Reise, was ein Working-Holiday-Visum nicht abdeckt. Üblich ist, den deutschen Schutz während der Abwesenheit über eine Anwartschaftsversicherung oder eine ähnliche Regelung zu verwalten und für Australien getrennt abzuschließen. Das ist eine persönliche Finanzfrage und keine Steuerfrage, vor der Abreise aber deutlich leichter zu klären als danach.

## Welchen Schutz verlangt das Visum?

Das Visum verlangt als Erteilungsvoraussetzung einen ausreichenden Krankenversicherungsschutz für die Dauer des Aufenthalts, ohne ein Produkt vorzuschreiben. Er muss für die gesamte Visumsdauer gültig sein, medizinische Behandlung in Australien abdecken und den Rücktransport einschließen.

In der Praxis geschieht das mit einer umfassenden Reiseversicherung, mit einem australischen Overseas Visitors Health Cover von einer privaten Krankenkasse oder mit beidem. Die Reiseversicherung deckt eine breitere Risikopalette einschließlich Stornierung und Rücktransport, ist aber meist auf zwölf Monate begrenzt. OVHC ist für medizinische Versorgung in Australien gebaut, lässt sich vor Ort unbegrenzt verlängern und deckt keine nichtmedizinischen Reiserisiken. Welche Lücke welches Produkt schließt, steht in unserem Guide zu [Reiseversicherung gegen OVHC](/de/blog/travel-insurance-vs-health-insurance-working-holiday).

Eine Klausel entscheidet mehr als der Preis: körperliche Arbeit. Viele Auslandskrankenpolicen für Work and Travel schließen Farm-, Bau- und Küchenarbeit aus oder verlangen einen Zuschlag, und das sind genau die Jobs, die du machen wirst. Prüfe vor Abschluss drei Punkte: welche Arbeiten eingeschlossen sind, ob sich die Laufzeit aus dem Ausland verlängern lässt und ob Rücktransport enthalten ist.

## Wie ändert das deine Steuerposition?

Die Medicare Levy von 2 % wird Personen mit Anspruch auf Medicare berechnet. Deutsche Staatsangehörige haben ohne Abkommen in der Regel keinen Anspruch, die Levy sollte also nicht gelten. Die Befreiung ist bei 25.000 $ Verdienst rund 500 $ wert, und fast niemand beansprucht sie.

Automatisch ist sie nicht, und das ATO wendet sie nicht von sich aus an. Sie wird in der Erklärung beantragt und braucht ein Medicare Entitlement Statement von Services Australia, eines je beanspruchtem Steuerjahr. Services Australia braucht dafür üblicherweise Wochen, und deshalb bekommen die meisten es nie: Sie erfahren im Oktober davon, wenn die Erklärung schon fällig ist. Den Ablauf beschreibt unser Guide zur [Medicare Levy](/de/blog/medicare-levy-working-holiday-makers).

Britische Backpacker haben über das Abkommen Anspruch und zahlen die Levy in der Regel, ob sie je einen Arzt gesehen haben oder nicht. Deutsche haben in der Regel keinen Anspruch und können die Befreiung beantragen, sofern das Papier vorliegt.

## Wie hoch ist das finanzielle Risiko ohne Schutz wirklich?

Nicht der Hausarztbesuch, sondern die stationäre Aufnahme. Für eine schwere Verletzung mit Operation und Krankenhausaufenthalt existiert die Visumsbedingung, und ein Rettungsflug aus einer abgelegenen Region oder ein medizinischer Rücktransport nach Deutschland stehen an deren oberem Ende.

Für ein Working Holiday zählt das mehr als für eine zweiwöchige Reise. Farmarbeit, Bau und Stationsarbeit tragen ein echtes körperliches Risiko und bringen dich hunderte Kilometer vom nächsten großen Krankenhaus weg. Was eine unversicherte Vorstellung tatsächlich kostet, beschreibt unser Guide zu [Notfallbehandlung ohne Medicare](/de/blog/emergency-medical-care-working-holiday-no-medicare).

## Wann solltest du das Medicare Entitlement Statement beantragen?

Früh. Das Statement kommt von Services Australia, wird je Steuerjahr ausgestellt und dauert üblicherweise Wochen statt Tage. Es muss also lange vor der Erklärung angestoßen werden.

In den ersten Monaten beantragt, liegt das Dokument lange vor Fälligkeit der Erklärung vor. Im Oktober beantragt, wenn die meisten zum ersten Mal davon hören, heißt es entweder ohne die Befreiung einzureichen oder zu warten. Die Variante, in der Leute mehrere hundert Dollar aufgeben, ist mit Abstand das häufigste Ergebnis dieses Timings.

## Was entscheidet deine Position?

Drei Fakten. Deine Staatsangehörigkeit, die die Anspruchsfrage und damit die Levy klärt. Ob du das Medicare Entitlement Statement besorgt hast, denn davon hängt ab, ob die Befreiung tatsächlich beantragt wird und nicht nur verfügbar ist. Und ob dein Versicherungsschutz zu deiner Arbeit passt, denn eine Police für einen Backpacker, der Sehenswürdigkeiten anschaut, ist nicht dieselbe wie eine, die nach einem Sturz auf einer Baustelle zahlt.

Das Statement verdient frühe Handlung. Ein Antrag in den ersten Monaten kostet nichts und nimmt es vom kritischen Pfad. Ein Antrag im Oktober bedeutet, ohne es einzureichen und danach zu berichtigen, wie unser Guide zum [Berichtigen einer Steuererklärung](/de/blog/amending-tax-return-australia) beschreibt. Das funktioniert, ist aber die langsamere Fassung eines Ergebnisses, das beim ersten Mal möglich gewesen wäre. Die Medicare-Position wird geklärt, bevor eine [Steuererklärung](/de/tax-return) eingereicht wird, denn sie ist eine der wenigen Positionen, die fest mehrere hundert Dollar wert ist. Du kannst deine [Steuererstattung schätzen](/de/calculator), mit und ohne sie.
`,
  },

  // ─── More Work Rights posts ────────────────────────────────────────────────
  'employer-not-paying-correctly': {
    title: 'Arbeitgeber zahlt zu wenig? Deine Optionen',
    description: 'Unterbezahlung, fehlender Lohn oder fehlende Super? Du hast klare Rechte. So gehst du Schritt für Schritt vor, von Fair Work bis zur ATO-Meldung.',
    body: `
Ermittle zuerst die korrekte Zahl, sprich sie dann schriftlich an und eskaliere zum Fair Work Ombudsman, wenn sie nicht behoben wird. Die meisten Rückholungen erledigen sich in den ersten beiden Schritten. Unterbezahlungsansprüche laufen sechs Jahre, die Abreise aus Australien verwirkt das Geld also nicht, und ein Verfahren läuft auch aus Deutschland.

## Wie stellst du fest, was dir hätte gezahlt werden müssen?

Indem du das Regelwerk findest, das den Job abdeckt, statt mit dem nationalen Mindestlohn zu vergleichen. Wer diesen Schritt überspringt, setzt die Lücke zu niedrig an, und das ist für einen Arbeitgeber leicht abzutun.

Bestimme den modernen Award oder Tarifvertrag, der den Arbeitgeber abdeckt. Finde die Einstufung, der deine tatsächlichen Aufgaben entsprechen. Wende das 25-%-Casual-Loading an, falls du casual bist, dann den Zuschlag für Tag und Uhrzeit jeder Schicht, dann jede Zulage des Awards. Vergleiche diese Summe Woche für Woche mit den Payslips statt insgesamt.

Was jede Zeile zeigen sollte, steht in unserem Guide zum [Lesen eines australischen Payslips](/de/blog/how-to-read-a-payslip-australia-working-holiday). Ein Payslip mit einheitlichem Satz über eine Woche mit einem Sonntag darin zeigt bereits, dass die Zuschläge fehlen.

## Ist es meistens Absicht?

Oft nicht, und diese Annahme bringt schneller mehr Geld zurück. Die Lohnabrechnung kleiner Betriebe wird häufig einmal von jemandem eingerichtet, der kein Lohnspezialist ist, und nie wieder angefasst, wenn die Award-Sätze am 1. Juli steigen.

Die Reaktion auf die gezeigten Zahlen unterscheidet die Fälle. Wer korrigiert und nachzahlt, hatte ein Konfigurationsproblem. Wer feindselig wird, deine Einstufung bestreitet oder andeutet, dein Visum mache das kompliziert, sagt dir, dass jetzt dokumentiert und nicht mehr verhandelt wird.

## Wie solltest du es ansprechen?

Schriftlich, einmal, sachlich. Halte die Daten fest, die gearbeiteten Stunden, was gezahlt wurde, was hätte gezahlt werden müssen und die Award-Klausel oder den Satz, auf den du dich stützt. Kurz und frei von Vorwürfen.

Die schriftliche Form gibt einem wohlmeinenden Arbeitgeber etwas, womit die Lohnbuchhaltung arbeiten kann, und wird zum Beweismittel, wenn die Sache weitergeht. Ein Gespräch am Ende einer Schicht ist beides nicht.

## Wie sieht die Eskalation tatsächlich aus?

Vier Stufen, und die meisten Fälle enden auf der zweiten. Die Zahl gegen den Award prüfen. Schriftlich nachfragen. Scheitert das, nimmt der Fair Work Ombudsman anonyme Hinweise und vollständige Beschwerden entgegen, ist kostenlos, kann einen Arbeitgeber zur Vorlage von Unterlagen zwingen und Löhne eintreiben. Für eindeutige Beträge gibt es zusätzlich einen Small-Claims-Weg bei Gericht, der Lohnforderungen ohne Anwälte behandelt.

Der Weg über den Ombudsman ist eine Tatsachenermittlung und kein juristisches Argument. Er kann Nachzahlung anordnen, schriftliche Verpflichtungen verlangen und schwere Fälle verfolgen.

## Welche Aufzeichnungen entscheiden?

Alles, was belegt, was du tatsächlich gearbeitet hast, denn das ist fast immer der strittige Punkt und nicht das Recht. Payslips, Dienstpläne, der Vertrag oder das Angebotsschreiben, Nachrichten über Schichten und Lohn, ein Tagebuch der gearbeiteten Stunden und Bankauszüge.

Mach Screenshots von Dienstplänen, sobald sie veröffentlicht werden, denn Dienstplan-Apps überschreiben statt zu archivieren, und du brauchst den Plan von vor vier Monaten. Wo nie Payslips ausgestellt wurden, werden deine eigenen in gutem Glauben geführten Aufzeichnungen akzeptiert, und das Fehlen der Payslips schwächt die Position des Arbeitgebers zusätzlich.

## Bringt eine Meldung dein Visum in Gefahr?

Nein, und dieser Glaube ist der größte einzelne Grund, warum Unterbezahlung von Working Holiday Makern nicht zurückgeholt wird. Für Inhaber temporärer Visa gibt es förmliche Schutzregeln, gerade weil Schweigen das Ergebnis ist, das das System vermeiden will.

Es bestehen Regelungen, die Inhabern temporärer Visa erlauben, für eine arbeitsrechtliche Beschwerde in Australien zu bleiben, der Visastatus ist kein rechtmäßiger Grund für Vergeltung, und der Fair Work Ombudsman unterhält eigene Schutzvorkehrungen für Wanderarbeiter. Es schützen dich Dokumentation und die kostenlosen offiziellen Kanäle statt einer informellen Barabfindung, die alles Weitere abschneidet.

## Was macht zurückgeholtes Geld mit deiner Steuer?

Nachgezahlter Lohn ist in dem Jahr steuerpflichtig, in dem du ihn erhältst, nicht in dem, in dem du ihn verdient hast, und er wird über die Lohnbuchhaltung mit Einbehalt gemeldet wie jeder andere Lohn. Superannuation in Höhe von 12 % ist auf die korrigierte Zahl ebenfalls geschuldet und häufig der größere der beiden Beträge.

Hinter einer Unterbezahlungsforderung steht damit meist eine Superforderung, und beide verfolgt man besser zusammen als nacheinander. Wie diese Seite funktioniert, steht in unserem Guide zu [nicht gezahlter Super](/de/blog/super-employer-not-paying-what-to-do).

## Was macht aus deiner Beschwerde eine Forderung?

Ob dir etwas zusteht und wie leicht es zurückzuholen ist, hängt an den Einzelheiten des Jobs. Sie vorher durchzugehen macht aus einer Beschwerde eine Forderung.

- Welcher Award oder Tarifvertrag den Arbeitgeber abdeckt, denn der setzt jede Zahl.
- Welcher Einstufung deine Aufgaben tatsächlich entsprechen, und nicht deine Jobbezeichnung.
- Ob du casual bist, denn davon hängt das 25-%-Loading ab.
- Welche Stunden du gearbeitet hast, denn bei Wochenend-, Abend- und Feiertagszuschlägen sitzen die meisten Lücken.
- Ob überhaupt Payslips ausgestellt wurden, denn wo nicht, verschiebt sich die Beweislage zu deinen Gunsten.
- Ob du unter einer ABN beschäftigt bist, denn dann gilt kein Award und die Einstufung selbst ist die Forderung.
- Wie lange es her ist, denn Unterbezahlungsansprüche laufen sechs Jahre.

Zurückgeholter Lohn wird in dem Jahr besteuert, in dem er zufließt, und du kannst aus dem tatsächlich Gezahlten deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  'leave-entitlements-working-holiday-visa': {
    title: 'Urlaub und Krankheitstage: was steht dir zu?',
    description: 'Urlaub, bezahlte Krankheitstage und Public Holidays hängen von deiner Anstellungsart ab. Vollzeit, Teilzeit oder Casual: was dir jeweils zusteht.',
    body: `
Casuals bekommen weder bezahlte Krankheitstage noch bezahlten Jahresurlaub. Sie bekommen stattdessen ein Loading von 25 % auf den Stundensatz, und das ist der Tausch. Festangestellte in Voll- und Teilzeit sammeln vier Wochen Jahresurlaub und zehn Tage bezahlte Freistellung aus persönlichen Gründen im Jahr an. Welcher Kategorie du tatsächlich angehörst, entscheidet alles Weitere.

## Was sammeln Festangestellte an?

Nach den National Employment Standards sammeln Vollzeitangestellte vier Wochen bezahlten Jahresurlaub und zehn Tage bezahlten Persönlichkeits- und Pflegeurlaub pro Jahr an, Teilzeitkräfte anteilig dasselbe. Trauerurlaub sind zwei Tage pro Anlass, und Feiertage werden zum Grundsatz bezahlt, wenn du nicht arbeitest, und zu Zuschlagssätzen, wenn du arbeitest.

Angesammelter, nicht genommener Jahresurlaub wird in der letzten Lohnzahlung ausgezahlt. Working Holiday Maker lassen das am häufigsten liegen, weil sie den letzten Payslip nicht gegen das Angesammelte prüfen.

## Was bekommen Casuals stattdessen?

Das 25-%-Loading auf den Award-Satz für jede gearbeitete Stunde, im Tausch gegen keinen bezahlten Urlaub und keine Kündigungsfrist. Ab dem 1. Juli 2026 liegt das Casual-Minimum bei 33,05 $ pro Stunde, also dem nationalen Minimum von 26,44 $ mit angewendetem Loading, und die meisten Awards liegen darüber.

Sich als Casual krank zu melden bedeutet eine unbezahlte Schicht; im Hintergrund baut sich nichts auf. Der Ausgleich wurde bereits Stunde für Stunde gezahlt, und deshalb ist ein Casual-Payslip mit dem nackten Grundsatz ohne Loading eine Unterbezahlung.

## Wie erkennst du, was du tatsächlich bist?

An der Art, wie die Arbeit läuft, nicht am Wort im Vertrag. Eine wirklich casuale Vereinbarung hat keine garantierten Stunden und einen variierenden Dienstplan, und beide Seiten können ablehnen. Ein festes Wochenmuster derselben Schichten über Monate, mit beidseitiger Erwartung der Fortsetzung, sieht nach Teilzeitanstellung aus, was auch immer auf dem Papier steht.

Die Unterscheidung ist in beide Richtungen Geld wert. Wer als Casual bezeichnet wird, aber ein festes dauerhaftes Muster arbeitet, hat womöglich Anspruch auf angesammelten Urlaub. Wer als Festangestellter bezeichnet wird, aber den geladenen Casual-Satz bekommt, ist ein anderes Problem. Wie die Kategorien geprüft werden, steht in unserem Guide zu [Vollzeit, Teilzeit und Casual](/de/blog/full-time-part-time-casual-australia).

## Was passiert mit dem Urlaub, wenn du kündigst?

Nicht genutzter Jahresurlaub wird in voller Höhe zu deinem Normalsatz ausgezahlt, zuzüglich jedes Leave Loadings, das der Award vorsieht. Persönlichkeits- und Krankheitsurlaub wird nicht ausgezahlt, und ebenso wenig etwas, das eine Casual-Kraft angesammelt zu haben glaubt.

Für einen Working Holiday Maker nach einem halben Jahr in fester Stelle kann diese Auszahlung spürbar sein, und sie ist eine der häufigeren Unterbezahlungen beim Ausstieg, weil niemand nachprüft. Lies den letzten Payslip Zeile für Zeile gegen dein Anfangsdatum, statt der Endsumme zu vertrauen.

## Wie wird eine Urlaubsauszahlung besteuert?

Als gewöhnliches Einkommen in dem Jahr, in dem sie zufließt, zum Working-Holiday-Maker-Satz. Eine Einmalzahlung in einer letzten Lohnabrechnung kann stark einbehalten aussehen, weil Lohnsysteme manchmal einen Satz anwenden, der so gerechnet ist, als wiederhole sich diese Lohnperiode das ganze Jahr.

Dieser Überabzug ist vorübergehend und kommt bei der Veranlagung zurück, ein guter Grund, das australische Bankkonto nicht zu schließen, wenn der Job endet. Was sonst in dieser letzten Abrechnung landet, behandelt unser Guide zu [Steuerpflichten nach der Ausreise aus Australien](/de/blog/tax-obligations-after-leaving-australia).

## Gilt Long Service Leave je?

Auf einer Working Holiday fast nie. Er verlangt je nach Bundesstaat in der Regel sieben bis zehn Jahre bei einem Arbeitgeber, weit jenseits dessen, was ein 417- oder 462-Visum zulässt.

Er ist nur einen Satz wert, weil eine kleine Zahl von Leuten auf anderen Visa zurückkehrt und beim selben Arbeitgeber bleibt; dann kann frühere durchgehende Dienstzeit zählen. Trifft das zu, wird der Anspruch bei der Abreise ausgezahlt und als Einkommen besteuert.

## Sammelst du überhaupt etwas an?

Deine Ansprüche entscheiden sich an deiner Anstellungskategorie und an deinem Award, beides Tatsachen, die du heute prüfen kannst.

- Ob du wirklich casual bist oder unter einem Casual-Etikett ein dauerhaftes Muster arbeitest.
- Ob das 25-%-Loading tatsächlich auf deinem Payslip erscheint, das Erste zu prüfen.
- Welcher Award dich abdeckt, denn Leave Loading und Feiertagsbehandlung unterscheiden sich je Award.
- Wie lange du bei einem einzelnen Arbeitgeber warst, denn davon hängt ab, ob nennenswerter Jahresurlaub anfiel.
- Ob angesammelter Urlaub in deiner letzten Abrechnung ausgezahlt wurde, und zum richtigen Satz.
- Ob du unter einer ABN beschäftigt bist, denn dann existiert keiner dieser Ansprüche.

Urlaubsauszahlungen werden mit dem Rest deines Lohns besteuert, und du kannst aus deinen Jahreszahlen deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  'can-you-work-for-multiple-employers': {
    title: 'Mehrere Arbeitgeber gleichzeitig: geht das?',
    description: 'Viele Working Holiday Maker arbeiten parallel für mehrere Arbeitgeber. Was du dabei bei TFN, Steuersatz und Steuererklärung beachten musst.',
    body: `
Ja. Es gibt keine Grenze dafür, wie viele Jobs ein Inhaber eines 417- oder 462-Visums gleichzeitig haben darf. Die Sechsmonatsgrenze gilt pro Arbeitgeber, nicht insgesamt. Für dein Geld zählt, dass jeder Arbeitgeber eine Tax File Number Declaration hat, denn ohne sie muss er 45 % einbehalten.

## Was braucht jeder neue Arbeitgeber von dir?

Jeder Arbeitgeber braucht eine eigene Tax File Number Declaration, die Nummer allein reicht nicht. Einem Manager die TFN mündlich zu nennen ändert an der Lohnbuchhaltung nichts. Das Formular tut es.

- Deine TFN, dieselbe Nummer für jeden Job
- Eine ausgefüllte Tax File Number Declaration für diesen Arbeitgeber
- Working Holiday Maker als Status ausgewählt
- Nein bei der Frage zum Steuerfreibetrag

Das ist der stille Verlust in einem Mehrarbeitgeber-Jahr: ein Job korrekt bei 15 % und ein zweiter, der monatelang bei 45 % läuft, weil niemand ein zweites Formular ausgefüllt hat. Der Überschuss kommt zur Steuerzeit zurück, aber erst nach Monaten ohne ihn.

## Wie verhält sich die Sechsmonatsregel zu mehreren Jobs?

Die Sechsmonatsbeschränkung auf 417- und 462-Visa gilt für jeden Arbeitgeber getrennt, drei parallele Jobs sind also drei getrennte Sechsmonatsuhren. Zwei Jahre bei einem Arbeitgeber würden dagegen verstoßen, zwei Jahre über vier Arbeitgeber nicht.

Mehrere Branchen und Regionen erlauben zudem längere Zeit bei demselben Arbeitgeber. Wo die Grenze bindet und wo nicht, steht in unserem Guide zur [Sechsmonatsregel pro Arbeitgeber](/de/blog/six-month-employer-rule-working-holiday-visa).

## Was passiert steuerlich bei mehreren Jobs?

Weil der Working-Holiday-Maker-Satz bis 45.000 $ pauschal 15 % beträgt, erzeugen mehrere Jobs nicht die Stufenprobleme eines australischen Residents. Jeder registrierte Arbeitgeber behält 15 % ein, alles fließt in eine Erklärung, und die Summe wird zum selben Satz besteuert wie bei einem einzigen Arbeitgeber.

Die Komplikation läuft in die andere Richtung. Mehrere Arbeitgeber machen es wahrscheinlicher, dass einer falsch eingerichtet ist, und ein einzelner Job mit 45 % oder Foreign-Resident-Sätzen überbesteuert dich still die ganze Saison, während die anderen in Ordnung aussehen.

## Was ist die Einbehaltsfalle in einem Mehrjob-Jahr?

Nicht zu wenig Einbehalt, sondern ein überbesteuerter Job, den du nie bemerkt hast. Zwei Arbeitgeber, die beide 15 % einbehalten, ergeben ein sauberes Ergebnis. Ein Arbeitgeber ohne dein Declaration-Formular oder ohne Registrierung beim ATO als Working-Holiday-Maker-Arbeitgeber erzeugt einen Satz, zu dem du nicht besteuert werden dürftest.

Beides ist über die Erklärung zurückzuholen, und beides bleibt unsichtbar, solange niemand den Einbehaltsprozentsatz über die Arbeitgeber hinweg vergleicht. Einbehaltene Steuer geteilt durch brutto, einmal pro Job, ist die nützlichste Prüfung bei mehreren Jobs.

## Was passiert mit der Super bei mehreren Arbeitgebern?

Jeder Arbeitgeber schuldet unabhängig 12 % zusätzlich zu deinem Lohn, und jeder zahlt sie in den Fonds, den du benennst oder der dir zugeordnet ist. Vier Jobs in einem Jahr bedeuten oft mehr als einen Fonds, und dort zersplittert die Super still.

Das zählt bei der Abreise, nicht während des Jahres. Jeder Fonds hält ein eigenes Guthaben und braucht einen eigenen DASP-Antrag, wer sich an einen Fonds erinnert und zwei vergisst, lässt also dauerhaft Geld in Australien. Wie du sie vor dem Flug findest, steht in unserem Guide zu [verlorenem Super](/de/blog/how-to-find-lost-superannuation).

## Was solltest du nachhalten?

Eine Zeile pro Job, unterwegs notiert, ist mehr wert als ein Schuhkarton Payslips, der im Nachhinein zusammengesucht wird.

- Payslips von jedem Arbeitgeber
- Start- und Enddatum bei jedem
- Der von jedem genutzte Superfonds
- Der Einbehaltsprozentsatz, den jeder angewendet hat

Der Grund ist Erinnerung, nicht Papierkram. Ein Jahr mit fünf Arbeitgebern in drei Bundesstaaten verschwimmt, und der vergessene Job ist fast immer ein kurzer, der am ehesten zum falschen Satz einbehalten wurde.

## Wo hört das auf, unkompliziert zu sein?

An dem Punkt, an dem einer der Jobs gar keine Anstellung ist. Ein Working-Holiday-Jahr, das Löhne mit ABN-Contracting mischt, erzeugt eine Erklärung mit zwei Einkommensarten, zu denselben Sätzen besteuert, aber mit ganz unterschiedlichem Einbehalt, und die Lohnseite saugt die Schuld der ABN-Seite oft auf.

Die andere Komplikation ist ein Job über den 30. Juni hinweg. Löhne werden in dem Jahr besteuert, in dem sie gezahlt wurden, nicht in dem, in dem sie verdient wurden, ein Job von Mai bis August teilt sich also über zwei Erklärungen, und der Einbehalt verteilt sich nicht gleichmäßig. Beides gehört bei der Vorbereitung der [Steuererklärung](/de/tax-return) angesprochen, und deine [Steuererstattung schätzen](/de/calculator) kannst du, sobald die Zahlen aller Arbeitgeber beisammen sind.
`,
  },

  'full-time-part-time-casual-australia': {
    title: 'Vollzeit, Teilzeit, Casual: der Unterschied',
    description: 'Vollzeit, Teilzeit, Casual: die Anstellungsart bestimmt Lohn, Urlaubsanspruch und Casual Loading. Alle Unterschiede für Working Holiday Maker erklärt.',
    body: `
Casual-Arbeit zahlt ein Loading von 25 % auf den Grundsatz und sammelt keinen bezahlten Urlaub an. Vollzeit und Teilzeit zahlen den Grundsatz und sammeln stattdessen Jahresurlaub und bezahlte Krankheitstage an. Alle drei werden identisch zu den Working-Holiday-Maker-Sätzen besteuert, die Wahl geht also um Lohnform und Sicherheit, nicht um Steuern.

## Was bedeutet Vollzeitanstellung in Australien?

Vollzeit bedeutet ein regelmäßiges Muster regulärer Stunden, typischerweise 38 pro Woche, mit garantiertem Dienstplan und dem vollen Anspruchspaket der National Employment Standards. Ein Casual Loading gibt es nicht, weil der Urlaub der Ausgleich ist.

- Vier Wochen bezahlter Jahresurlaub pro Jahr
- Zehn Tage bezahlter Personal- und Pflegeurlaub pro Jahr
- Ein garantierter Dienstplan statt angebotener Schichten
- Kündigungsfrist und Kündigungsschutz nach der Wartezeit

Wenige Working Holiday Maker haben Vollzeitstellen, vor allem weil die Sechsmonatsgrenze pro Arbeitgeber schlecht zu einer unbefristeten Stelle passt, und nicht weil Arbeitgeber sich weigern.

## Was bedeutet Teilzeitanstellung?

Teilzeit ist dieselbe Konstruktion wie Vollzeit auf weniger Stunden, mit vereinbartem Plan und allen Ansprüchen anteilig. Sie ist die am wenigsten verstandene der drei und auf einem Working-Holiday-Visum oft das beste verfügbare Angebot.

Der Grund ist Planbarkeit plus Ansammlung. Wer in Teilzeit 25 Stunden pro Woche arbeitet, sammelt auf diese Stunden Jahresurlaub an, und nicht genommener Urlaub wird zum Ende des Jobs ausgezahlt. Für einen ruhigen Halbjahresblock in einer Stadt kann diese Auszahlung mehr wert sein als das Casual Loading.

## Was bedeutet Casual-Anstellung?

Casual bedeutet keine garantierten Stunden und keine Urlaubsansammlung, ausgeglichen durch ein Loading von 25 % auf den Grundstundenlohn. Es ist mit weitem Abstand die häufigste Form für Working Holiday Maker, besonders in Gastronomie, Einzelhandel und Erntearbeit.

- Kein Jahresurlaub und keine bezahlten Krankheitstage
- 25 % Loading auf den Grundsatz
- Schichten werden angeboten statt eingeplant und dürfen abgelehnt werden
- Weniger Sicherheit, mehr Flexibilität

Das nationale Casual-Minimum liegt ab dem 1. Juli 2026 bei 33,05 $ pro Stunde, also dem nationalen Mindestlohn von 26,44 $ plus Loading. Liegt dein Casual-Satz auf oder nahe dem Grundsatz, fehlt das Loading, und das ist eine Unterbezahlung und keine Verhandlungssache.

## Wie erkennst du, was du tatsächlich bist?

Der Vertrag sollte es sagen, aber wo beides auseinandergeht, entscheidet die Realität der Arbeit. Ein fester Wochenplan mit denselben Schichten ist das Muster einer Teilzeitanstellung, egal wie das Papier es nennt, und als Casual einen unveränderten Dienstplan zu arbeiten ist eine erkennbare Fehleinstufung.

- Eine ausdrückliche Einstufung im Einstellungsschreiben
- Ein fester Wochenplan deutet auf Teilzeit
- Von Woche zu Woche wechselnde Schichten deuten auf Casual
- Ein Loading von 25 % im Satz deutet auf Casual

Nach sechs Monaten regelmäßigen Musters können Ansprüche auf Casual Conversion entstehen, der Weg, eine lang laufende Fehleinstufung ohne Streit zu korrigieren. Welchen Schutz Casuals bei abgesagten Schichten haben, steht in unserem Guide zu [Regeln bei Schichtabsagen](/de/blog/casual-shift-cancellation-rules-australia).

## Ändert die Einstufung deine Steuer?

Nein. Alle drei werden zu den Working-Holiday-Maker-Sätzen besteuert, mit 15 % auf die ersten 45.000 $, und das Casual Loading von 25 % ist normaler steuerpflichtiger Lohn. Superannuation mit 12 % ist bei allen dreien ab dem ersten Dollar fällig.

Anders ist die Form deines Einkommens über das Jahr, mit indirektem Steuereffekt. Wer als Casual sehr ungleiche Wochen hat, wird in den vollen Wochen zu hoch einbehalten, weil jede Abrechnung so besteuert wird, als wäre sie typisch. Die Korrektur kommt über die [Steuererklärung](/de/tax-return) zurück und nicht über den Lohn.

## Was solltest du tatsächlich wählen?

Casual passt zu den meisten Working-Holiday-Jahren: das Loading plus die Freiheit, ohne Kündigungsfrist weiterzuziehen. Wer alle paar Monate weiterzieht, hätte angesammelten Urlaub kaum genutzt, und die 25 % sind Geld jetzt.

Teilzeit gewinnt in einem konkreten Fall: ein ruhiger Block von fünf oder sechs Monaten in einer Stadt mit planbarem Dienstplan. Dort wird der angesammelte Jahresurlaub am Ende ausgezahlt, die Krankentage sind echt, und der Dienstplan ermöglicht einen Mietvertrag statt einer neuen Hostelbuchung.

## Wo ändert das wirklich dein Geld?

Drei Verzweigungen, und keine dreht sich um das Etikett. Ob das Loading von 25 % tatsächlich in deinem Casual-Satz steckt, denn ein Pauschalsatz, der angeblich alles abdeckt, deckt meist nichts ab. Ob deine Einstufung im zuständigen Award zur Arbeit passt, denn ein Level-1-Satz für Level-2-Aufgaben kostet mehr als die Casual-Frage. Und ob angesammelter Urlaub beim Ende einer Teilzeitstelle ausgezahlt wurde.

Der letzte Punkt verdient eine gezielte Prüfung. Eine Schlussabrechnung sollte den Rest des nicht genommenen Jahresurlaubs enthalten, und diese Position fehlt am häufigsten, wenn jemand kündigt und eine Woche später den Bundesstaat verlässt. Was am Jahresende zurückkommt, zeigt die [Steuererstattungsschätzung](/de/calculator).
`,
  },

  'white-card-australia-working-holiday': {
    title: 'White Card: Kurs, Kosten und Gültigkeit',
    description: 'Ohne White Card kein Bauarbeits-Job. Was der Kurs kostet, wie lange er dauert, Online-Optionen je Bundesstaat, und wie du ihn von der Steuer absetzt.',
    body: `
Ohne White Card darfst du auf keiner australischen Baustelle legal arbeiten. Die Karte, offiziell General Construction Induction Card, wird von einer Registered Training Organisation nach einem Kurs von wenigen Stunden ausgestellt, kostet rund 100 $ und läuft nicht ab. Jeder Bundesstaat erkennt die Karten aller anderen an.

## Was ist die White Card, und was belegt sie tatsächlich?

Sie belegt, dass du die allgemeine Bau-Einweisung absolviert hast, die Einheit CPCWHS1001, mit Baustellengefahren, Notfallabläufen sowie deinen Rechten und Pflichten als Arbeitnehmer. Ein Sicherheitsnachweis und nichts weiter: Sie qualifiziert dich für kein Handwerk und macht dich nicht beschäftigungsfähig.

Es ist eine gesetzliche Pflicht nach dem australischen Arbeitsschutzrecht, ein Bauleiter kann dich also nicht wegen Erfahrung durchwinken. Kein seriöser Bauunternehmer lässt dich ohne Karte durchs Tor, und wer es doch tut, sagt dir etwas über die Baustelle.

## Wer braucht eine, und wer nicht?

Jeder, der Bauarbeit verrichtet: Hilfsarbeiter, Zimmerleute, Gerüstbauer, Maler, Landschaftsgärtner auf Baustellen, Handwerkshelfer und alle, die regelmäßig beruflich auf einer Baustelle sind. Enthält eine Stellenbeschreibung eine Baustelle, enthält sie auch eine Karte.

Für Gastronomie, Farmarbeit, Einzelhandel, Reinigung oder Büroarbeit brauchst du keine. Bietet dir jemand ein paar Wochen Bauhilfe an, was in Perth, Darwin und an der Küste Queenslands sehr häufig passiert, brauchst du die Karte vor der ersten Schicht und nicht danach.

## Was passiert im Kurs, und geht er online?

Der Kurs dauert wenige Stunden am Stück und endet mit einer Prüfung. Die meisten Bundesstaaten akzeptieren akkreditierte Online-Formate mit überwachter Webcam-Prüfung, und so machen es die meisten Backpacker. Die Karte folgt binnen weniger Tage.

Queensland ist die Ausnahme, die du prüfen solltest, denn dort war man historisch strenger bei den zugelassenen Vermittlungsformaten, und Western Australia hat eigene Regelungen gefahren. Willst du in den Westen, kläre die Anerkennung vorher mit dem Arbeitgeber oder der Schulungsstelle, statt anzunehmen, dass eine Karte aus Sydney in Karratha durchgeht.

## Läuft die Karte ab?

Nein, in den meisten Bundesstaaten wird sie lebenslang ausgestellt und braucht keine Erneuerung. Nach einer langen Pause außerhalb der Branche kann ein Arbeitgeber oder eine Landesbehörde eine Auffrischung verlangen, aber die Karte selbst trägt kein Ablaufdatum.

Fotografiere sie an dem Tag, an dem sie ankommt. Sie zu verlieren ist normal, ein Ersatz aus einem anderen Bundesstaat lästig, und ein Foto auf dem Handy bringt dich auf die meisten Baustellen, während der Ersatz läuft.

## Kannst du die Kosten von der Steuer absetzen?

Dein erstes White Card ist grundsätzlich nicht absetzbar, weil es die Kosten dafür sind, für die Arbeit überhaupt infrage zu kommen, und nicht Kosten der Arbeit selbst. Das ATO behandelt es wie einen ersten Führerschein.

Eine Erneuerung oder ein Ersatz, den du beschaffst, während du bereits am Bau arbeitest, ist als arbeitsbezogene Ausgabe absetzbar. Dieselbe Logik von erster Ausstellung gegen spätere gilt für einen Staplerschein, eine Schwerfahrzeug-Berechtigung und die meisten anderen Tickets.

Heb die Quittung trotzdem auf. Die Sicherheitsschuhe, der Helm, der Werkzeuggürtel und das Handwerkszeug, das du gleichzeitig gekauft hast, sind in der Regel absetzbar, und das meiste davon fällt unter die [Sofortabschreibung für Anschaffungen unter 300 $](/de/blog/tools-equipment-under-300-instant-deduction-whv).

## Gilt deine Karte auch im nächsten Staat?

Die Kartenpflicht ist überall gleich. Die Variablen sind, wo du den Kurs gemacht hast, wo du arbeiten willst und ob die Kosten absetzbar sind.

- Ob es deine erste Karte ist oder eine weitere, denn daran hängt die gesamte Abzugsfrage.
- In welchem Bundesstaat du den Kurs gemacht hast und in welchem du arbeiten willst, denn die Formate unterscheiden sich, auch wenn die Anerkennung national ist.
- Ob du als Angestellter oder unter einer ABN beschäftigt bist, denn das ändert, wie und wo die zugehörigen Ausgaben geltend gemacht werden.
- Ob die Bauarbeit dein Haupteinkommen ist oder ein paar Wochen zwischen anderen Jobs, denn das beeinflusst den beruflichen Nutzungsanteil der Ausrüstung.
- Ob du gleichzeitig Schuhe, Schutzausrüstung und Werkzeug gekauft hast, denn das ist meist der größere Abzug.

Ausgaben für Baustellenarbeit machst du über deine [Steuererklärung als Working Holiday Maker](/de/tax-return) geltend, und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du ungefähr weißt, was du für Ausrüstung ausgegeben hast.
`,
  },

  'rsa-certificate-australia-working-holiday': {
    title: 'RSA-Zertifikat: brauchst du eines für Bars?',
    description: 'Ohne RSA bekommst du keinen Job, bei dem Alkohol ausgeschenkt wird. Der Kurs läuft online oder vor Ort, gilt je nach Bundesstaat und ist absetzbar.',
    body: `
Ein RSA ist gesetzlich erforderlich, bevor du in Australien irgendwo Alkohol servieren darfst. Der Kurs dauert drei bis fünf Stunden, kostet rund 90 $ und lässt sich meist online machen. Er wird auf Ebene der Bundesstaaten ausgestellt, ein Zertifikat aus einem Bundesstaat funktioniert im nächsten also nicht immer, und die Gebühr ist absetzbar.

## Was deckt der RSA-Kurs tatsächlich ab?

Die rechtlichen Pflichten, die auf der Person liegen, die den Drink einschenkt, und nicht nur auf dem Lizenzinhaber.

- Anzeichen von Trunkenheit erkennen
- Service rechtmäßig und ohne Eskalation verweigern
- Die rechtlichen Pflichten von Personal und Betrieb
- Alkoholbezogenen Schaden verhindern
- Die Liquor-Licensing-Regeln des Bundesstaats

Ohne eines darfst du in einem lizenzierten Betrieb rechtlich keinen Drink servieren, und die Strafen treffen dich und den Betrieb, weshalb dich kein seriöser Arbeitgeber vor Vorliegen des Zertifikats einplant.

## Wer braucht wirklich eines?

Jeder, dessen Rolle Alkohol serviert, verkauft oder ausgibt, und das ist eine breitere Gruppe als Barpersonal: Service in einem lizenzierten Restaurant, Arbeit im Spirituosenladen, Eventarbeit und Cellar-Door-Arbeit auf einem Weingut.

Back-of-House-Rollen wie Küchenarbeit und Reinigung brauchen rechtlich keines, viele Gastronomiebetriebe verlangen es trotzdem, weil es dich überall im Betrieb einsetzbar macht. Für einen Backpacker auf Jobsuche ist das meist das eigentliche Argument, es früh zu machen.

## Funktioniert dein Zertifikat in jedem Bundesstaat?

Nein, und dieses Detail kostet Leute Geld. RSA wird auf Ebene der Bundesstaaten ausgestellt und reguliert: Ein Zertifikat aus Victoria erlaubt dir in Sydney nicht automatisch einzuschenken, und gegenseitige Anerkennung gibt es nur zwischen manchen Bundesstaaten.

New South Wales, Victoria und Queensland verlangen jeweils einen eigenen, landesrechtlich zugelassenen Kurs und eine eigene Kompetenzkarte. South Australia, Western Australia, Tasmania, das Northern Territory und das ACT akzeptieren national akkreditierte Einheiten mit Anerkennung zwischen den meisten von ihnen. Führt deine Route von Melbourne nach Sydney, plane einen zweiten Kurs ein.

## Wie lange gilt es?

Je nach Bundesstaat. In drei Bundesstaaten läuft das Zertifikat gar nicht ab, in den übrigen drei bis fünf Jahre.

- New South Wales: fünf Jahre
- Victoria, Queensland, Tasmania, ACT und Northern Territory: drei Jahre
- Western Australia und South Australia: kein Ablauf

Die Erneuerung ist in der Regel ein kurzer Auffrischer und nicht der volle Kurs. Für die meisten Working Holiday Maker überlebt das Zertifikat das Visum, es ist also eine einmalige Entscheidung und keine wiederkehrende Ausgabe.

## Kannst du die Kosten zurückholen?

Ja, sofern der Kurs mit Arbeit zusammenhängt, die du in der Gastronomie bereits machst oder gerade aufnimmst. Die Gebühr ist eine berufsbezogene Fortbildungsausgabe und gehört mit aufbewahrter Quittung neben den Rest deiner Werbungskosten in deine [Steuererklärung](/de/tax-return).

Die Feinheit liegt im Zeitpunkt. Ein Kurs für den Einstieg in eine Tätigkeit, die du noch nicht ausübst, ist schwerer zu begründen als einer während der Ausübung: Das RSA nach dem ersten Gastrojob ist sauberer als davor. Den allgemeinen Test behandelt unser Guide zu [Werbungskosten für Working Holiday Maker](/de/blog/tax-deductions-working-holiday-makers).

## Solltest du selbst dafür zahlen?

Frag, bevor du es tust. Eine nennenswerte Zahl von Betrieben übernimmt die Kurskosten bei der Einstellung, besonders größere Pub-Gruppen und Hotelketten. Zwei Tage vor einem Vorstellungsgespräch bei einem Betrieb zu zahlen, der gezahlt hätte, ist ein kleiner und vermeidbarer Verlust.

Zahlt der Arbeitgeber, ist es nicht deine Werbungskostenposition, weil du die Kosten nicht getragen hast; zahlst du und wirst später erstattet, ebenfalls nicht. Absetzbar ist nur, was du tatsächlich getragen hast, und dieser Grundsatz erwischt bei RSA- und White-Card-Gebühren mehr Leute als sonst irgendwo.

## Was entscheidet, wie das für dich ausgeht?

Drei Tatsachen über deine Pläne, die du alle kennst, bevor du einen Kurs buchst. In welchem Bundesstaat du zuerst arbeiten wirst, denn das entscheidet Lehrplan und Karte. Ob du zwischen den Oststaaten wechselst, denn das entscheidet, ob du ein zweites brauchst. Und ob du bereits ein Gastro-Jobangebot hast, denn das entscheidet sowohl wer zahlt als auch ob der Abzug möglich ist.

Die praktische Routine ist unglamourös und sie funktioniert: die Karte des Bundesstaats machen, in dem du bist, das PDF auf dem Handy behalten, weil Betriebe am ersten Tag danach fragen, und die Quittung für die Erklärung aufheben.
`,
  },

  'wwcc-working-with-children-check-australia': {
    title: 'WWCC: Pflicht bei der Arbeit mit Kindern?',
    description: 'Ein WWCC ist Pflicht für Arbeit mit Kindern: Au-pair, Camp-Counselor, Sportlehrer. Antrag, Kosten und Gültigkeit für Working Holiday Maker erklärt.',
    body: `
Ein Working With Children Check ist eine vom Bundesstaat ausgestellte Hintergrundüberprüfung, die du vor jeder Arbeit mit Kindern in Australien brauchst. Für bezahlte Arbeit kostet sie rund 80 $, für Freiwillige ist sie meist kostenlos, und die Bearbeitung dauert einige Wochen. Welcher Bundesstaat, entscheidet über Karte, Kosten und Übertragbarkeit.

## Was prüft ein Working With Children Check tatsächlich?

Eine Risikobewertung der Landesbehörde, keinen einfachen Strafregisterauszug. Geprüft werden Vorstrafen, Feststellungen zu unangemessenem Verhalten gegenüber Kindern und weitere Aufzeichnungen des Bundesstaats, um in kindbezogener Arbeit unhinnehmbare Risiken zu erkennen.

Die Prüfung ist fortlaufend und keine Momentaufnahme: Dein Register wird weiter beobachtet, und eine Karte kann widerrufen werden, wenn neue Informationen auftauchen. Ein allgemeines polizeiliches Führungszeugnis aus der Heimat ersetzt sie deshalb nicht, obwohl viele Backpacker eines mitbringen.

## Welche Jobs brauchen eine, und welche fragen nur danach?

Jede bezahlte oder ehrenamtliche Rolle mit regelmäßigem Kontakt zu Kindern verlangt sie gesetzlich, und das ist eine größere Gruppe als Kinderbetreuung. Lehrassistenzen, Nachhilfe, Musikunterricht, Sporttraining, Camp-Betreuung, Personal in Jugendprogrammen, Nachmittagsbetreuung, Kindermädchen und Au-pairs fallen alle darunter.

Au-pair-Arbeit überrascht die meisten: im Privathaushalt statt in einer Einrichtung, und die Pflicht greift in den meisten Bundesstaaten trotzdem. Das zählt, weil Au-pair-Arrangements oft informell und kurzfristig zustande kommen.

Manche Arbeitgeber fragen auch dort danach, wo das Gesetz sie nicht streng verlangt, meist wegen einer pauschalen Regelung des Veranstaltungsorts oder Schulgeländes. Eine Karte macht dich für mehr Rollen einplanbar, und für Feriencamp- oder Gastronomiearbeit in den Schulferien ist das oft der eigentliche Grund, sie zu holen.

## Gilt deine Karte auch in einem anderen Bundesstaat?

Nein, und dieses Detail kostet Geld. Jeder Bundesstaat hat eigene Karte, eigene Gebühr und eigene Gültigkeitsdauer, nicht automatisch übertragbar. New South Wales stellt über das Office of the Children's Guardian aus, Victoria betreibt seinen eigenen Working with Children Check, und Queensland nutzt das Blue-Card-System.

Ein Sommercamp in New South Wales und danach eine Schwimmschule in Victoria heißt zwei Anträge, zwei Gebühren und zwei Wartezeiten. Steht deine Route fest, beantrage im Bundesstaat des ersten Jobs und plane eine zweite Karte ein, statt auf eine Anerkennung zu setzen.

## Wie lange dauert es, und darfst du während der Bearbeitung arbeiten?

Ein paar Wochen, und der Engpass ist meist die Identitätsprüfung und nicht die Bewertung. Die meisten Bundesstaaten verlangen persönliches Erscheinen mit Originaldokumenten, häufig in einer Australia-Post-Filiale, und die Uhr läuft erst danach richtig los.

Ob du während der Bearbeitung arbeiten darfst, hängt vom Bundesstaat ab. Manche erlauben beaufsichtigte Arbeit ab Einreichung und Belegnummer, andere verbieten jede kindbezogene Arbeit, bis die Karte da ist. Frag die konkrete Landesbehörde und nicht den Arbeitgeber: Arbeitgeber liegen hier in beide Richtungen falsch, und die Sanktion trifft den Betrieb genauso wie dich.

## Wie lange gilt die Karte?

Drei bis fünf Jahre in den meisten Bundesstaaten, sie überdauert ein Working Holiday von maximal zwei Jahren also fast immer. New South Wales und Victoria stellen beide für fünf Jahre aus, Queenslands Blue Card und mehrere andere Systeme laufen kürzer.

Eine einmalige Entscheidung also, keine wiederkehrende Ausgabe. Die Frage ist nicht die Verlängerung, sondern ob du auf derselben Reise die Karte eines zweiten Bundesstaats brauchen wirst.

## Können Working Holiday Maker eine bekommen?

Ja. Ein 417- oder 462-Visum ist kein Hindernis, und es gibt kein Erfordernis von Staatsbürgerschaft oder Daueraufenthalt. Der Antrag braucht eine australische Wohnadresse für die Korrespondenz, Identitätsdokumente, die untereinander übereinstimmen, und in den meisten Bundesstaaten einen persönlichen Prüftermin.

Die Adresse verdient einen Gedanken. Ein Hostel, das du in zehn Tagen verlässt, ist eine schlechte Wahl für eine zugeschickte Karte, und eine zurückgelaufene Karte ist die häufigste selbstverschuldete Verzögerung bei diesen Anträgen.

## Ist die Gebühr absetzbar?

Verlangt die Arbeit, die du bereits ausübst, die Prüfung, ist die Gebühr eine berufsbezogene Ausgabe und gehört mit aufbewahrter Quittung in deine Steuererklärung. Auf Verdacht besorgt, bevor du überhaupt kindbezogene Arbeit hattest, ist sie schwerer zu begründen, weil der Test auf den Zusammenhang mit tatsächlich erzieltem Einkommen schaut.

Dasselbe Prinzip fällt Leuten bei White Cards und RSA-Zertifikaten auf die Füße. Hat der Arbeitgeber gezahlt oder dir die Kosten erstattet, ist es nicht dein Abzug, weil du die Kosten nicht getragen hast.

## Welches Landesrecht bindet dich?

Die Prüfung selbst ist unkompliziert. Unkompliziert ist nicht, welches Landesrecht dich bindet und ob du vor Ankunft der Karte anfangen darfst, und das hängt an Fakten über deine eigene Planung.

- In welchem Bundesstaat dein erster kindbezogener Job liegt, denn das entscheidet über System, Gebühr und Gültigkeit.
- Ob deine Route eine Grenze kreuzt, denn ein zweiter Bundesstaat heißt ein zweiter Antrag.
- Ob die Rolle bezahlt oder ehrenamtlich ist, denn Freiwilligenkategorien sind üblicherweise kostenlos.
- Ob dieser Bundesstaat beaufsichtigte Arbeit während der Bearbeitung erlaubt, denn daran hängt dein Starttermin.
- Ob du eine stabile Postanschrift angegeben hast, denn eine zurückgelaufene Karte startet die Wartezeit neu.
- Ob du oder der Arbeitgeber gezahlt hat, denn daran hängt, ob die Gebühr in deiner [Steuererklärung als Working Holiday Maker](/de/tax-return) absetzbar ist. Du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du weißt, was du selbst getragen hast.
`,
  },

  // ─── More Work Rights ─────────────────────────────────────────────────────
  'what-is-a-tax-invoice': {
    title: 'Tax Invoice: wann musst du eine ausstellen?',
    description: 'Mit ABN stellst du Tax Invoices, statt Payslips zu bekommen. Pflicht sind ABN, Datum, Beschreibung, Betrag und der GST-Ausweis, falls registriert.',
    body: `
Eine Tax Invoice ist das Dokument, das du einem Unternehmen ausstellst, um für Contracting-Arbeit bezahlt zu werden. Sie muss deinen Namen, deine ABN, das Datum, eine Beschreibung der Arbeit und den Betrag tragen. Die ABN ist der Teil, an dem Geld hängt: ohne sie muss das Unternehmen 47 % einbehalten, bevor es dich bezahlt.

## Wann musst du eine ausstellen?

Wenn der Verkauf 82,50 $ oder mehr einschließlich GST beträgt und immer dann, wenn der Käufer eine verlangt. Praktisch verlangen die meisten Geschäftskunden ohnehin eine, bevor ihr Buchhaltungssystem eine Zahlung freigibt, die Schwelle ist also selten maßgeblich.

Stell trotzdem eine für kleinere Aufträge aus. Sie hält fest, was vereinbart und was geliefert wurde, klärt Zahlungsstreitigkeiten ohne Diskussion und ist die Aufzeichnung, aus der am Jahresende deine Erklärung gebaut wird. Sie ist der einzige Beleg dafür, dass die Arbeit zu den Bedingungen stattfand, an die du dich erinnerst.

## Was muss draufstehen?

Sechs Dinge, wenn du nicht für GST registriert bist, und das sind die meisten Working Holiday Maker in Liefer-, Farm- oder Freelance-Arbeit. Fehlt eines, kann eine Buchhaltung die Zahlung zurückhalten, bis die Rechnung korrigiert ist.

- Deinen Namen und deinen Geschäftsnamen, falls du unter einem auftrittst
- Deine ABN
- Das Datum der Rechnung
- Eine Beschreibung der erbrachten Leistungen oder Waren
- Den zu zahlenden Gesamtbetrag
- Deine Kontaktdaten

Bist du nicht für GST registriert, setz keine GST-Zeile darauf und überschreib sie nicht mit Tax Invoice. Als Nichtregistrierter 10 % GST aufzuschlagen ist unzulässig, und Buchhaltungsabteilungen bemerken es sofort. Bist du registriert, muss der GST-Betrag getrennt ausgewiesen werden und das Dokument trägt zu Recht die Überschrift Tax Invoice.

## Warum zählt die ABN darauf so viel?

Wegen der No-ABN-Withholding-Regel. Trägt eine Rechnung keine gültige ABN, behält das zahlende Unternehmen 47 % ein und führt sie ans ATO ab, und dir bleibt der Rest.

Es kommt bei der Veranlagung zurück, dauerhaft verloren geht also nichts, aber es ist dein Geld, das monatelang anderswo liegt. Die ABN auf jeder Rechnung anzugeben ist die gesamte Pflicht dazu.

## Wie solltest du die Aufzeichnungen führen?

Fortlaufend und an einem Ort, der einen Handyverlust überlebt. Rechnungen der Reihe nach nummerieren, jede als PDF speichern und eine einfache Liste mit Datum, Kunde, Betrag und Zahlungsstatus führen.

Heb sie fünf Jahre auf, denn so lange kann das ATO zu einer Erklärung nachfragen. Fehlen sie, muss Contractor-Einkommen aus Kontoeingängen rekonstruiert werden, was ungenauer und schwerer zu verteidigen ist.

## Heißt Rechnungstellen, dass du keine Superannuation bekommst?

In der Regel ja, und das ist der Tausch und kein Versehen. Ein Angestellter bekommt 12 % Superannuation zusätzlich zum Lohn, ein Contractor bekommt, was die Rechnung sagt.

Eine Ausnahme zählt. Wo der Gehalt der Vereinbarung Anstellung ist, also Aufsicht, Dienstplan, Stundenlohn und Arbeit für einen Kunden mit dessen Ausrüstung, ist die Einstufung falsch, egal wer eine Rechnung ausgestellt hat, und Superannuation und Award-Sätze sind geschuldet. Das ist Sham Contracting, und wie es entschieden wird, steht in unserem Guide zum [Test Angestellter gegen Contractor](/de/blog/employee-vs-contractor-australia).

## Was ändert Rechnungstellen zur Steuerzeit?

Alles am Zeitpunkt. Von keiner deiner Rechnungen wurde etwas einbehalten, die Steuer darauf ist also in einem Betrag bei der Veranlagung geschuldet, statt Lohn für Lohn aufgesogen zu werden.

Der Working-Holiday-Maker-Satz von 15 % auf die ersten 45.000 $ gilt für Rechnungseinkommen wie für Lohn, der Satz ist also nicht die Überraschung. Wer über das Jahr 20.000 $ in Rechnung gestellt und nichts zurückgelegt hat, hat eine echte Rechnung. Wer daneben gewöhnliche Anstellung hatte, stellt meist fest, dass der Einbehalt aus diesem Lohn sie deckt.

## Wie ist deine Arbeit tatsächlich aufgebaut?

Rechnungstellen ist mechanisch. Was es für dich bedeutet, hängt am Aufbau der Arbeit. Die Punkte unten entscheiden, ob das Jahr mit einer Erstattung oder einer Rechnung endet, und keiner ist an den Rechnungen selbst zu sehen.

- Ob du eine gültige ABN hast, denn ohne werden von jeder Zahlung 47 % einbehalten.
- Ob du für GST registriert bist, was das Dokument ändert und eine Quartalspflicht hinzufügt.
- Ob die Vereinbarung echtes Contracting oder falsch eingestufte Anstellung ist.
- Ob du Kopien aufgehoben hast, denn die Erklärung wird aus deinen Aufzeichnungen gebaut und nicht aus einer fremden Meldung.
- Ob du im selben Jahr auch Lohn hattest, dessen Einbehalt die Steuer auf das Rechnungseinkommen oft auffängt.
- Wie viel du unterwegs zurückgelegt hast, da für dich nichts herausgenommen wurde.

Abgerechnet wird das Ganze in der [Working-Holiday-Steuererklärung](/de/tax-return), und der [Erstattungsrechner](/de/calculator) sagt dir vorab, ob unter dem Strich eine Erstattung oder ein Zahlbetrag steht.
`,
  },

  'do-working-holiday-makers-pay-tax-on-tips': {
    title: 'Trinkgeld in Australien: steuerpflichtig?',
    description: 'Trinkgeld ist steuerpflichtiges Einkommen, egal ob bar oder über die Karte. Läuft es über den Arbeitgeber, taucht es direkt im Income Statement auf.',
    body: `
Ja. Trinkgeld ist in Australien steuerpflichtiges Einkommen, in welcher Form es auch ankommt, und wird neben deinem Lohn zum Working-Holiday-Maker-Satz von 15 % auf die ersten 45.000 $ besteuert. Unterschiedlich ist nur, wer das Geld meldet, und das hängt davon ab, wie das Trinkgeld zu dir kam.

## Welches Trinkgeld wird bereits für dich gemeldet?

Alles, was über die Kasse des Lokals läuft, erreicht das ATO ohne dein Zutun. Kartentrinkgeld, auf die Rechnung gesetzte Servicezuschläge und über ein Tronc-System verteiltes Sammeltrinkgeld laufen über die Lohnbuchhaltung, PAYG wird also sofort einbehalten und die Beträge erscheinen mit deinem Lohn in deinem Income Statement am Jahresende.

Die Meldung ist damit erledigt und die Steuer auf diesen Teil bezahlt. Lohnend ist nur die Prüfung, ob Trinkgeld auf dem Payslip als eigene Zeile erscheint oder im Bruttolohn aufgeht: Ein Lokal, das sagt, es verteile Trinkgeld, und auf keinem Payslip etwas zeigt, ist eine Frage wert.

## Welches Trinkgeld musst du selbst erklären?

Bargeld, das dir direkt in die Hand gedrückt wird. Niemand erfasst es, es wird keine PAYG-Steuer einbehalten, und es erscheint nicht in deinem Income Statement. Die Pflicht zur Erklärung liegt am Jahresende bei dir und nur bei dir.

Wie sehr das zählt, entscheidet die Größenordnung. Ein ruhiges Vorstadtcafé erzeugt fast kein Bartrinkgeld. Eine volle Innenstadtbar an Freitag- und Samstagabenden erzeugt über eine Saison eine spürbare Summe, und dort wird der Unterschied zwischen Erklären und Nichterklären zu echtem Geld in der [Steuererklärung](/de/tax-return).

- Bartrinkgeld von Gästen: deine Verantwortung, keine Steuer im Moment einbehalten
- Am Schichtende bar aufgeteiltes Trinkgeld: dieselbe Behandlung, weiterhin zu erklären
- Karten- und Tronc-Trinkgeld: über die Lohnbuchhaltung gemeldet, nichts weiter zu tun

## Welche Aufzeichnungen brauchst du wirklich?

Eine laufende Summe genügt. Das ATO erwartet kein Protokoll jedes einzelnen Trinkgelds. Eine Wochenzahl mit Datum und Lokal, dauerhaft notiert, erfüllt die Aufzeichnungspflicht und dauert Sekunden.

Die Alternative ist, im Oktober über eine Saison zu raten, die im März endete. Wer gar nichts erklärt, ist fast nie absichtlich unehrlich; er hat keine Ahnung, wie hoch die Zahl war, und die sicher wirkende Antwort wird null. Eine Notiz auf dem Handy beseitigt das.

## Was passiert, wenn du Bartrinkgeld nicht erklärst?

Das Risiko ist kein Prüfungsschreiben in der Woche nach der Abgabe. Die Gastronomie ist eine datenabgeglichene Branche, und nicht erklärtes Einkommen taucht später über Meldungen auf Lokalebene und über Einzahlungsmuster auf.

Dann fällt die Steuer an, die hätte gezahlt werden müssen, plus eine Fehlbetragsstrafe und Zinsen für das betreffende Jahr. Dagegen steht, dass die Steuer auf eine erklärte Trinkgeldsaison mit 15 % kleiner ist, als die meisten vor dem Nachrechnen annehmen. Für jeden mit Plänen für ein zweites oder drittes Jahr kommt hinzu: Eine ungelöste ATO-Position ist ein loses Ende, das du in jeden künftigen Kontakt mit australischen Behördensystemen mitnimmst.

## Wird auf Trinkgeld Super gezahlt?

Manchmal, und es hängt an derselben Unterscheidung wie die steuerliche Meldung. Über die Lohnbuchhaltung verteiltes Trinkgeld kann Teil der Ordinary Time Earnings sein, dann sind 12 % [Super](/de/superannuation) darauf fällig wie auf jeden anderen Bestandteil deiner Bezahlung. Bargeld, das ein Gast dir gibt, zahlt der Arbeitgeber nicht, daran hängt also keine Superpflicht.

Wo es in einem bestimmten Job landet, hängt vom Award ab und davon, wie das Lokal die Zahlungen eingeordnet hat, und das lässt sich einem Payslip nicht sicher entnehmen. Die nützliche Prüfung ist, ob deine Superbeiträge zu deinen Gesamtbezügen einschließlich Tronc-Verteilungen passen. Eine Lücke dort ist dasselbe Gespräch wie jeder andere Fall von [nicht gezahlter Super](/de/blog/super-employer-not-paying-what-to-do).
`,
  },

  'employer-asking-you-to-work-more-than-visa-allows': {
    title: 'Mehr arbeiten, als dein Visum erlaubt?',
    description: 'Mehr als sechs Monate beim selben Arbeitgeber kann dein Visum gefährden. Die Verantwortung liegt bei dir, nicht beim Arbeitgeber, der darum bittet.',
    body: `
Bedingung 8547 begrenzt dich auf sechs Monate bei einem Arbeitgeber auf einem Working-Holiday-Visum, aber eine lange Liste von Branchen ist ausgenommen. Ob dein Chef dich rechtmäßig über sechs Monate hinaus behalten kann, hängt an der Art der Arbeit und nicht daran, wie sehr er es will. Die meisten, die fragen, sind bereits ausgenommen.

## Was schränkt Bedingung 8547 tatsächlich ein?

Die Anstellung bei einem einzelnen Arbeitgeber über sechs Monate hinaus, gezählt in Kalendermonaten ab deinem Startdatum und nicht in Stunden oder Schichten. Ob Vollzeit, Teilzeit oder Casual ändert nichts: zwei Tage pro Woche über acht Monate sind genauso ein Verstoß wie fünf.

Beschränkt ist eine Beziehung, nicht deine Gesamtarbeit. Du kannst über das Visum hinweg für beliebig viele Arbeitgeber arbeiten, und die sechs Monate setzen sich nur mit der Erteilung eines neuen Working-Holiday-Visums zurück, nicht zum Jahreswechsel und zu keinem anderen Zeitpunkt. Die getrennte Fair-Work-Regel, dass Vollzeitangestellte nicht regelmäßig über 38 Wochenstunden plus angemessene Zusatzstunden arbeiten sollten, betrifft deine Wochenstunden, nicht deine Monate.

## Welche Arbeit ist von der Grenze ausgenommen?

Eine breite Liste, die das meiste abdeckt, was Working Holiday Maker tatsächlich tun. Fällt deine Arbeit darunter, gilt die Ausnahme automatisch und es gibt nichts zu beantragen.

- Pflanzen- und Tierzucht, was Landwirtschaft und Gartenbau abdeckt
- Fischerei und Perlenfischerei
- Baumzucht und Baumfällung
- Bergbau
- Bauwesen
- Tourismus und Gastronomie
- Gesundheit, Altenpflege und Behindertenpflege
- Kinderbetreuung
- Lebensmittelverarbeitung
- Wiederaufbau nach Naturkatastrophen
- Verschiedene Standorte desselben Arbeitgebers, wo kein einzelner Standort sechs Monate überschreitet

Home Affairs setzt die Liste und hat sie mehr als einmal angepasst. Prüfe die aktuelle Fassung gegen deren veröffentlichte Bedingungen, statt dich auf das zu verlassen, was dir vor zwei Jahren jemand im Hostel erzählt hat.

## Was, wenn deine Arbeit nicht ausgenommen ist?

Dann hast du drei Optionen, und nur eine davon ist bequem. Zur Sechsmonatsmarke den Arbeitgeber wechseln, die sauberste und die, die von niemandem etwas verlangt. Home Affairs schriftlich um Erlaubnis zur Fortsetzung bitten, was vor Ablauf der sechs Monate geschehen muss und im Ermessen der Behörde liegt, nicht als Anspruch. Oder zu einem wirklich anderen Arbeitgeber wechseln.

Die Erlaubnis wirkt nicht rückwirkend. Du musst an der Sechsmonatsmarke aufhören und warten, statt in der Annahme weiterzumachen, dass die Zustimmung kommt. Über die Grenze hinaus ohne Ausnahme oder Genehmigung zu arbeiten ist der Verstoß, was der Papierkram später auch sagt.

## Was sind die Folgen, wenn es schiefgeht?

Die Visumsaufhebung ist das formale Risiko, und es ist real, auch wenn es bei einem unbeabsichtigten Überschreiten nicht der übliche Ausgang ist. Die häufigere Folge ist leiser und langlebiger: Ein Verstoß liegt in deiner Einwanderungsakte und wird gewogen, wenn du irgendetwas anderes Australisches beantragst, einschließlich eines Visums für ein zweites oder drittes Jahr.

Auch der Arbeitgeber steht im Risiko. Ein Betrieb, der eine nicht ausgenommene Arbeitskraft über sechs Monate hinaus behält, hat eigene zivilrechtliche Strafen zu erwarten. Wer dich zum Weitermachen drängt, bittet dich also um ein Risiko, das er selbst mitträgt, und das darf man laut aussprechen.

## Kann ein Arbeitgeber dich dazu zwingen?

Nein, und der Druck kommt meist als Gefallen verkleidet. Visumsbedingungen sind gesetzliche Grenzen und nicht Verhandlungssache mit der Person, die dich bezahlt. Kein Arbeitgeber hat die Befugnis, eine davon aufzuheben, oder die Stellung, zu versprechen, dass sie keine Rolle spielt.

Zwei Dinge schützen dich, wenn es unangenehm wird. Sich zu weigern, gegen eine Visumsbedingung zu verstoßen, ist kein Fehlverhalten, und eine nachteilige Reaktion darauf ist genau das, wofür eine General-Protections-Beschwerde existiert. Und ein Arbeitgeber, der andeutet, er könne dein Visum beeinflussen, irrt sich: Über Visumsangelegenheiten entscheidet allein Home Affairs, und in gutem Glauben erhobene arbeitsrechtliche Beschwerden lösen keine Visumsprüfung aus. Hol dir die Aufforderung möglichst schriftlich, denn eine Textnachricht ist ein Beleg, ein Gespräch im Lager nicht.

## Wie verlängerst du deinen Aufenthalt rechtmäßig?

Über ein weiteres Visum und nicht über einen längeren Job. Ein Visum für das zweite Jahr verlangt 88 Tage Specified Work in einer ausgewiesenen regionalen Gegend während deines ersten Jahres, ein drittes verlangt sechs Monate Specified Work während des zweiten.

Diese Arbeit muss der Definition entsprechen und in der richtigen Postleitzahl liegen. Das ist ein von der Sechsmonatsgrenze getrennter Test: Deine Beziehung zu einem Arbeitgeber zu verlängern verlängert deinen Aufenthalt um keinen Tag, und 88 Tage auf einer Farm befreien dich in einem späteren nicht ausgenommenen Job nicht von Bedingung 8547. Zwei verschiedene Regeln, beide gleichzeitig gültig.

## Ändert irgendetwas davon deine Steuer?

Nein. Ein volles Jahr unter einer Ausnahme bei einem Arbeitgeber zu bleiben erzeugt genau dieselbe Steuerlage wie drei Jobs von je vier Monaten: 15 % auf die ersten 45.000 $, 12 % [Super](/de/superannuation) zusätzlich zum Lohn, und alles zusammen auf einer [Steuererklärung](/de/tax-return).

Ein langer Job ist eher das einfachere Steuerjahr: ein Arbeitgeber abzustimmen statt mehrerer, ein Declaration-Formular statt dreier. Geld kostet die umgekehrte Lage, in der mehrere kurze Jobs mehrere Gelegenheiten bieten, dass unbemerkt der falsche Einbehaltungssatz angewendet wird.
`,
  },

  'farm-work-rights-working-holiday-australia': {
    title: 'Farmarbeit: deine Rechte auf Lohn und Pause',
    description: 'Farmarbeit ist einer der häufigsten WHV-Jobs. Mindestlohn, Pausen, Unterkunft und Super: deine vollen gesetzlichen Rechte unter dem Horticulture Award.',
    body: `
Farmarbeit trägt dieselben Schutzrechte wie jeder andere australische Job: Award-Sätze, sichere Bedingungen, Payslips und 12 % Superannuation zusätzlich zum Lohn. Das meiste davon liegt unter dem Horticulture Award. Farmspezifisch ist, wie Akkordlohn auf das Stundenminimum trifft und wie viel deines Visums an Papieren hängt, die die Farm womöglich nicht führt.

## Welche Schutzrechte gelten?

Alle. Der Fair Work Act deckt Farmarbeiter auf Working-Holiday-Visa genauso ab wie australische Arbeitskräfte: Mindestlohn, den maßgeblichen Award, sichere Arbeitsbedingungen, Payslips innerhalb eines Tages nach dem Zahltag, Superannuation und Schutz vor unrechtmäßiger Kündigung oder Vergeltung.

Der Visastatus mindert nichts davon. Der gegenteilige Glaube macht diese Branche zu der mit der längsten Geschichte von Unterbezahlung. Der Fair Work Ombudsman hat deshalb wiederholt Kampagnen im Gartenbau geführt.

## Was setzt der Horticulture Award?

Er setzt Mindeststundensätze nach Einstufung, Regeln für Akkordlohnvereinbarungen und Zuschläge für Überstunden, Wochenenden und Feiertage. Dazu kommt die Aufstockungspflicht, die Akkordlohn überhaupt erst rechtmäßig macht.

Der Award gilt für Obsternte, Gemüseernte, Packen sowie Reben- und Baumarbeit. Weidewirtschaft wie Viehhaltung und Ackerbau im großen Stil liegt unter einem anderen Award. Die Einstufungen im Detail behandelt unser Guide zum [Horticulture Award](/de/blog/horticulture-award-working-holiday-makers).

## Wie greifen Akkordlohn und Stundenminimum ineinander?

Akkordlohn ist rechtmäßig und verdrängt die Stundenuntergrenze nicht. Wer pro Kiste oder Kilogramm bezahlt wird, muss für jede gearbeitete Stunde mindestens das anwendbare Casual-Minimum verdienen, und wo die Akkordeinkünfte darunter bleiben, muss der Arbeitgeber aufstocken.

Die Aufstockung ist eine Pflicht, kein Entgegenkommen, und die am häufigsten ignorierte Bestimmung in der Farmarbeit. Ab dem 1. Juli 2026 liegt das Casual-Minimum bei 33,05 $ pro Stunde, also dem nationalen Minimum von 26,44 $ plus dem 25-%-Loading, und die Einstufungen im Gartenbau setzen darauf auf.

Den praktischen Test wendet fast niemand an: Teile den Tagesverdienst durch die tatsächlich gearbeiteten Stunden, einschließlich Warten auf Kisten und Wechseln zwischen Reihen. Liegt das Ergebnis unter dem Casual-Minimum, war eine Aufstockung geschuldet. Wie die Vereinbarungen geschrieben sein sollen, steht in unserem Guide zu [Akkordlohn in der Farmarbeit](/de/blog/piece-rates-farm-work-working-holiday).

## Darf die Farm für Unterkunft und Transport abziehen?

Nur in Grenzen und nur mit deiner vorherigen schriftlichen Zustimmung. Abzüge müssen tatsächliche Kosten abbilden, angemessen sein und dürfen deine Bezahlung nie unter das Minimum drücken.

Abzüge, die eine dieser Bedingungen verfehlen, sind unzulässig, und überhöhte Preise für Hostelbetten und Buszubringer sind ein wiederkehrendes Muster. Heb die schriftliche Vereinbarung und die Payslips auf, die zeigen, was genommen wurde: Ein Abzug ohne Vereinbarung dahinter ist rückholbar.

## Was ist mit der Superannuation?

Einem Angestellten auf einer Farm sind 12 % Superannuation auf die Ordinary Time Earnings geschuldet, quartalsweise in einen Fonds gezahlt, ganz gleich wie wenige Stunden gearbeitet wurden. Akkordeinkünfte sind Lohn, die Garantie gilt also auch für sie.

Farmarbeitgeber überspringen sie häufiger als jede andere Branche. Sie ist über das Verfahren zum Superannuation Guarantee Charge rückholbar und als Departing Australia Superannuation Payment beantragbar, sobald dein Visum abgelaufen und du ausgereist bist. Warst du unter einer ABN beschäftigt, gilt nichts davon: Behandelt wird das in unserem Guide zu [Farmarbeit und ABNs](/de/blog/farm-work-and-abns).

## Welche Belege solltest du ab Tag eins aufbauen?

Alles, was belegt, wo du gearbeitet hast, wann und für wen. Dieselbe Akte, die einen Antrag auf ein zweites Jahr trägt, holt unterbezahlten Lohn zurück, und Farmen sind beim Papierkram häufig schlecht.

- Jeden Payslip, das primäre Beweismittel, nach dem die Einwanderungsbehörde sucht
- Beschäftigungsdaten schriftlich bestätigt, und sei es eine Textnachricht über dein Startdatum
- Den rechtlichen Namen der Farm, ihre ABN und ihre Adresse
- Belege, dass der Standort in einer berechtigten Postleitzahl liegt
- Dein eigenes Tagesprotokoll über gearbeitete Stunden und Tätigkeiten
- Die schriftliche Akkordlohnvereinbarung, falls du auf einer bist

Wer Visumsantrag und Lohnforderung verliert, ist fast immer der, der nur eine Erinnerung an die Saison hat.

## Gefährdet eine Beschwerde dein Visum oder deine 88 Tage?

Nein. Schutzregeln existieren gerade für Inhaber temporärer Visa, die arbeitsrechtliche Beschwerden verfolgen, samt Regelungen, die dir erlauben, dafür in Australien zu bleiben. Der Visastatus ist kein rechtmäßiger Grund für Vergeltung.

Die gearbeiteten Tage bleiben die gearbeiteten Tage. Einen Antrag für ein zweites Jahr gefährdet keine Beschwerde, sondern fehlende Belege.

## Lief deine Saison so, wie sie sollte?

Deine Ansprüche stehen im Award fest. Was dir tatsächlich zusteht, hängt davon ab, wie die Saison lief, und es sind zugleich die Tatsachen, für die ein Antrag auf ein zweites Jahr Belege verlangt.

- Ob du Angestellter oder unter einer ABN beschäftigt bist, denn davon hängt ab, ob überhaupt etwas davon gilt.
- Welcher Award den Betrieb abdeckt, denn Gartenbau und Weidewirtschaft unterscheiden sich.
- Ob du auf Akkordlohn bist und ob die Stundenaufstockung je berechnet wurde.
- Ob Abzüge für Unterkunft oder Transport schriftlich vereinbart und im Rahmen waren.
- Ob Payslips ausgestellt wurden, denn davon hängen Lohnforderungen und Visumsnachweise ab.
- Ob überhaupt 12 % Superannuation gezahlt wurden.
- Ob Postleitzahl und Arbeitsart auf die 88 Tage anrechenbar sind.

Was auf jeder Farm einbehalten wurde, wird am Ende des Steuerjahres abgerechnet, und du kannst aus deinen Jahreszahlen deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  'what-is-superannuation-guarantee-charge': {
    title: 'Superannuation Guarantee Charge erklärt',
    description: 'Zahlt dein Arbeitgeber die Super nicht oder zu spät, erhebt das ATO die Superannuation Guarantee Charge. Deine Meldung stößt dieses Verfahren an.',
    body: `
Der Superannuation Guarantee Charge ist das, was ein Arbeitgeber dem ATO schuldet, wenn er deine [Super](/de/superannuation) zu spät, zu wenig oder gar nicht zahlt. Er ist bewusst teurer als pünktliche Zahlung, und er ist für den Arbeitgeber nicht steuerlich abzugsfähig. Für dich ist er der Mechanismus, der das Geld zurückholt.

## Was löst die Abgabe aus?

Das Verpassen einer Quartalsfrist, um welche Spanne auch immer. Super ist viermal im Jahr fällig, und ein Arbeitgeber, der einen Tag zu spät zahlt, haftet technisch für die Abgabe auf das ganze Quartal und nicht nur auf die Verzögerung.

Die vier Termine stehen fest und sagen dir, ob eine Lücke in deinem Fonds ein Problem ist oder schlicht früh. Beiträge für Juli bis September sind bis zum 28. Oktober fällig, Oktober bis Dezember bis zum 28. Januar, Januar bis März bis zum 28. April und April bis Juni bis zum 28. Juli. Ein Quartal, das eine Woche nach der Frist leer ist, ist eine echte Lücke. Vor der Frist sagt ein leeres Quartal dagegen überhaupt nichts aus.

- Gar nichts zahlen
- Weniger als 12 % der Ordinary Time Earnings zahlen
- Nach der Quartalsfrist zahlen
- Unter Umständen in einen Fonds zahlen, den du nicht genannt hast

## Warum ist die Abgabe für einen Arbeitgeber schlimmer als einfach zu zahlen?

Weil sie so gebaut ist. Die Abgabe besteht aus dem Fehlbetrag selbst, plus einer nominellen Zinskomponente von 10 % pro Jahr ab Quartalsbeginn, plus einem Verwaltungsanteil je Angestelltem und je betroffenem Quartal, und nichts davon ist gegen die eigene Steuer des Arbeitgebers absetzbar.

Der letzte Punkt gibt der Regel ihre Zähne. Ein gewöhnlicher Superbeitrag senkt das zu versteuernde Einkommen eines Arbeitgebers, die Abgabe nicht. Ein Betrieb, der Super überspringt und erwischt wird, zahlt also real mehr als einer, der pünktlich gezahlt hat, zusätzlich zu den Zinsen. Das ist einer der wenigen Durchsetzungsmechanismen im australischen Arbeitsrecht, der für den Betrieb wirklich schmerzhaft ist.

## Wo landet das Geld?

Bei dir, über deinen Fonds. Das ATO treibt die Abgabe beim Arbeitgeber ein, und der Fehlbetrag und die Zinsen werden in deinen genannten Superfonds geleitet oder vom ATO gehalten, wo keine aktuellen Fondsdaten existieren, was bei bereits abgereisten Backpackern häufig ist.

Auch die Zinsen gehören dir. Die Regel soll deine Lage so wiederherstellen, als hätte der Arbeitgeber korrekt und pünktlich gezahlt, die entgangenen Erträge werden also ersetzt und nicht vom ATO behalten. Liegt das Geld beim ATO statt bei einem Fonds, zählt es weiterhin für deinen [DASP-Antrag](/de/superannuation).

## Woran erkennst du, dass dein Arbeitgeber im Rückstand ist?

Indem du zwei Dinge vergleichst, die du bereits hast. Deine Payslips nennen für jede Lohnperiode eine Superzahl, dein Fondsauszug nennt, was tatsächlich ankam und wann. Zeigt die Payslip-Zeile das ganze Quartal über Super und der Fonds nach Ablauf der Frist nichts, wurde das Geld aufgebaut, aber nicht gezahlt.

Zwei Verzweigungen ändern, worauf du blickst. Ein Payslip ganz ohne Superzeile bedeutet meist, dass der Arbeitgeber dich als Contractor behandelt, dann lautet die Frage, ob die [Einstufung stimmt](/de/blog/employee-vs-contractor-australia). Und ein Fondskonto, in das du nie eingeloggt warst, erhält womöglich Zahlungen, die du nie gesehen hast.

## Was passiert, sobald nicht gezahlte Super gemeldet ist?

Dann startet ein festgelegtes Verfahren, und es läuft über Daten und nicht über deine Überzeugungskraft. Das ATO hat die über Single Touch Payroll gemeldeten Löhne und die von Fonds gemeldeten Beiträge. Den Vergleich, der einen Fehlbetrag beweist, kann es selbst anstellen, sobald deine Meldung ihm sagt, wo es hinsehen soll.

Was es nicht tut, ist dich auf dem Laufenden zu halten. Gegen den Arbeitgeber ergehen Bescheide, zur Eintreibung nutzt das ATO Befugnisse, die du nicht hast, und der eingetriebene Betrag erreicht deinen Fonds samt Zinsen. Der Zeitrahmen läuft in Monaten und nicht in Wochen, und die Meldung überlebt deine Ausreise, was zählt, weil die meisten Backpacker eine Lücke erst auf dem Weg hinaus entdecken.

- Payslips für den Zeitraum, mit der Superzeile
- Fondsauszüge über das Angekommene und dessen Zeitpunkt
- Beschäftigungsdaten, Stunden und Lohnsätze
- Rechtlicher Name und ABN des Arbeitgebers, die auf dem Payslip stehen
`,
  },

  'public-holidays-australia-working-holiday': {
    title: 'Feiertage in Australien: Lohn und Regeln',
    description: 'An Feiertagen gelten Zuschläge nach deinem Award, und welche Tage frei sind, unterscheidet sich je Bundesstaat. Was für Casual, Teilzeit und Vollzeit gilt.',
    body: `
Auf Feiertage entfallen die höchsten Zuschläge im australischen Arbeitsrecht, üblicherweise 225 bis 250 % des Normalsatzes. Working Holiday Maker haben darauf Anspruch zu denselben Bedingungen wie alle anderen. Welche Feiertage für dich gelten, hängt vom Bundesstaat ab, in dem du arbeitest, und was du bekommst, hängt vom Award ab, der den Job abdeckt.

## Welche Feiertage gelten überall?

Sieben landesweit, der Rest je Bundesstaat. Die nationalen sind Neujahr am 1. Januar, Australia Day am 26. Januar, Karfreitag und Ostermontag zu jährlich wechselnden Daten, Anzac Day am 25. April, Weihnachten am 25. Dezember und Boxing Day am 26. Dezember.

Der King's Birthday ist dem Namen nach national, dem Datum nach nicht. Die meisten Bundesstaaten begehen ihn am zweiten Montag im Juni, Queensland und Western Australia zu anderen Zeiten, und das zählt, wenn du in diesem Zeitraum zwischen Bundesstaaten wechselst.

## Was fügt jeder Bundesstaat hinzu?

Genug, dass ein Backpacker, der in einem Jahr über drei Bundesstaaten arbeitet, Feiertagen begegnet, von denen er nie gehört hat. Jeder davon zahlt Zuschläge, wenn du ihn arbeitest.

- Victoria: Melbourne Cup Day am ersten Dienstag im November und der Freitag vor dem AFL Grand Final
- New South Wales: der August Bank Holiday, der für Banken und nicht allgemein gilt
- Queensland: die Royal Queensland Show, begangen im Raum Brisbane
- South Australia: Adelaide Cup Day und Proclamation Day
- Western Australia: WA Day am ersten Montag im Juni
- Tasmania: Royal Hobart Show Day und Eight Hours Day

Auch der Labour Day fällt in verschiedenen Bundesstaaten auf verschiedene Daten. Prüfe den Kalender für den Ort, an dem du tatsächlich arbeitest, und nicht für den, an dem du letzten Monat warst.

## Was bekommst du dafür, an einem zu arbeiten?

In den meisten Awards zwischen 225 und 250 % des Normalsatzes, für jede an diesem Tag gearbeitete Stunde und nicht erst über einer Schwelle. Bei Casuals greifen Loading und Feiertagszuschlag nach dem Award ineinander und addieren sich nicht einfach.

Bei einem Normalsatz von 25 $ sind 225 % gleich 56,25 $ pro Stunde und 250 % gleich 62,50 $. Über eine volle Schicht ist das der größte Unterschied, den eine Casual-Kraft über ihren Dienstplan erzeugen kann, und die Schichten, die Einheimische meiden, sind der verlässlichste Weg, einen Monat anzuheben.

## Was, wenn du den Feiertag nicht arbeitest?

Fällt ein Feiertag bei Voll- oder Teilzeit auf einen Tag, an dem du normalerweise arbeiten würdest, wird er zum Grundsatz als freier Tag bezahlt. Ein Zuschlag greift ohne Arbeit nicht, aber unbezahlt ist der Tag nicht.

Casuals bekommen für einen nicht gearbeiteten Feiertag nichts. Das ist beabsichtigt und Teil dessen, was das 25-%-Loading ausgleicht. Eine Casual-Kraft, die den Tag arbeitet, sollte auf dem Payslip einen klar höheren Satz sehen.

## Kann dein Arbeitgeber dich dazu verpflichten?

Ein Arbeitgeber kann darum bitten, und du kannst ablehnen, wenn die Bitte unangemessen ist. Das berücksichtigt die Art des Betriebs, den Vorlauf, deine persönlichen Umstände und ob die Rolle üblicherweise Feiertagsarbeit umfasst.

Eine Ablehnung einer unangemessenen Bitte ist kein rechtmäßiger Kündigungsgrund. Eine Casual-Kraft, die eine Feiertagsschicht ablehnt, erzeugt selten ein Problem. Eine festangestellte Kraft in der Gastronomie, die den ersten Weihnachtstag ablehnt, hat ein schwereres Argument, weil Feiertagsbetrieb der Branche wesenseigen ist.

## Kommen Überstunden obendrauf?

In der Regel nicht. Der Feiertagssatz liegt an der Spitze der Zuschlagsstruktur und absorbiert Überstunden meist, eine lange Schicht an einem Feiertag wird also durchgehend zum Feiertagssatz bezahlt.

Manche Awards handhaben das anders und sehen ab einer bestimmten Stundenzahl eine zusätzliche Behandlung vor. Die Award-Klausel wirklich zu lesen lohnt hier, denn die Beträge an einem Zweieinhalbfach-Tag sind nicht unerheblich.

## Was sollte der Payslip zeigen?

Die Feiertagsstunden zu ihrem eigenen Satz, getrennt und nicht als Pauschalzahl in der Wochensumme. Diese Trennung macht den Zuschlag überprüfbar, und ihr Fehlen ist das klarste Zeichen, dass er nicht gezahlt wurde.

Auch verlegte Tage zählen. Fällt ein Feiertag auf ein Wochenende und wird am folgenden Montag begangen, hängt der Zuschlag am verlegten Tag. Passen die Zahlen nicht zum Dienstplan, hilft unser Guide zu [einem Arbeitgeber, der nicht korrekt zahlt](/de/blog/employer-not-paying-correctly).

## Welche Feiertage zählen bei deinem Job?

Welche Feiertage du bekommst und was sie zahlen, entscheidet sich an Dingen, die für deinen Job spezifisch sind, und nicht an einer nationalen Regel. Die Punkte unten entscheiden, welche Tage einen Zuschlag zahlen und ob du ihn tatsächlich bekommen hast.

- In welchem Bundesstaat du arbeitest, denn mehr als die Hälfte des Kalenders ist bundesstaatsspezifisch.
- Welcher Award oder Tarifvertrag das Lokal abdeckt, denn 225 % und 250 % sind beide üblich.
- Ob du casual oder festangestellt bist, denn davon hängen der nicht gearbeitete Tag und das Loading ab.
- Ob der Tag von einem Wochenende verlegt wurde, denn der Zuschlag folgt dem begangenen Tag.
- Ob der Payslip die Feiertagsstunden zu ihrem eigenen Satz trennt oder eine Pauschalzahl zeigt.
- Ob du unter einer ABN beschäftigt bist, denn dann gilt kein Award und nichts davon steht dir zu.

Feiertagsverdienst wird wie der Rest deines Lohns zum Working-Holiday-Satz besteuert, und du kannst aus deinen Jahreszahlen deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  'casual-shift-cancellation-rules-australia': {
    title: 'Casual-Schicht abgesagt: bekommst du Geld?',
    description: 'Arbeitgeber dürfen Casual-Schichten absagen, aber Fair-Work-Regeln sichern dir oft eine Mindestbezahlung. Fristen, Ansprüche und was du jetzt tun kannst.',
    body: `
Oft ja. Dein Arbeitgeber darf eine Casual-Schicht absagen, aber die meisten Awards verlangen, dass ein Casual, der wie eingeplant erscheint oder früh nach Hause geschickt wird, trotzdem einen Mindesteinsatz von 2 bis 3 Stunden bezahlt bekommt. Welcher Award deinen Job abdeckt, entscheidet die Zahl.

## Was ist ein Mindesteinsatz, und warum gibt es ihn?

Ein Mindesteinsatz ist die kürzeste Zeitspanne, für die ein Casual bezahlt werden muss, sobald er für eine Schicht eingeteilt wurde. Das Erscheinen kostet dich Anreise, Tagesplanung und abgesagte andere Arbeit. Die Awards bewerten das mit ein paar Stunden statt mit null.

Die Zahl setzt der Award, der deine Branche abdeckt, nicht dein Arbeitgeber und nicht dein Vertrag. Es ist die nützlichste einzelne Zahl über den eigenen Job, und fast niemand kennt sie.

- Hospitality Industry (General) Award: 2 Stunden
- General Retail Industry Award: 3 Stunden für die meisten Casuals
- Cleaning Services Award: 3 Stunden
- Horticulture Award: 2 Stunden

Wenn du zu einer eingeplanten Achtstundenschicht in einem Restaurant an der Gold Coast erscheinst und an der Tür hörst, es sei ruhig, hat der Arbeitgeber keine acht Stunden Lohn gespart. Er hat sechs gespart.

## Gilt die Regel auch, wenn die Schicht abgesagt wird, bevor du losfährst?

Eine Absage vor Beginn der Schicht fällt in den meisten Awards nicht unter die Mindesteinsatzklausel, weil der Einsatz nie begonnen hat.

Greifen können dann die Roster- und Rosteränderungsklauseln deines Awards. Mehrere Awards verlangen eine Vorankündigung bei Dienstplanänderungen oder eine Rücksprache bei regelmäßigen Änderungen, und ein Muster von Absagen per SMS am Vorabend kann dagegen verstoßen, auch wenn ein Einzelfall es nicht täte. Enterprise Agreements gehen manchmal über den Award hinaus und lohnen das Nachlesen.

## Was gilt, wenn du mitten in der Schicht nach Hause geschickt wirst?

Dasselbe Minimum gilt ab dem Beginn des Einsatzes. Setzt dein Award drei Stunden an und du wirst nach einer Stunde heimgeschickt, stehen dir in der Regel die drei Stunden zu, und der Grund spielt meistens keine Rolle. Schwaches Geschäft, eine unerwartete Schließung oder ein Manager, der zu viele Leute eingeplant hat, sind das unternehmerische Risiko des Arbeitgebers, nicht deins.

Der Klassiker in der Gastronomie ist, nach dem Mittagsansturm heimgeschickt zu werden, obwohl die Schicht bis zum Schließen eingeplant war. Genau dafür ist die Klausel geschrieben.

## Bekommen Casuals Krankengeld, wenn sie nicht arbeiten können?

Nein. Casual-Angestellte sammeln weder bezahlte Krankheitstage noch bezahlten Jahresurlaub an, und eine Schicht, die du nicht arbeiten kannst, wird nicht bezahlt. Das ist der Tauschhandel hinter dem Casual Loading von 25 % auf deinen Stundenlohn.

Das Loading ist keine freiwillige Großzügigkeit. Weist dein Payslip als Casual den reinen Award-Grundsatz ohne Loading aus, ist das eine Unterbezahlung, und sie kommt häufiger vor als das Problem mit abgesagten Schichten.

## Muss dein Arbeitgeber dir überhaupt Schichten geben?

Nein. Casual-Anstellung kennt keine garantierten Stunden, und ein Dienstplan, der von vier Schichten pro Woche auf eine schrumpft, ist für sich genommen kein Verstoß. Die Flexibilität läuft in beide Richtungen: Du darfst Schichten ebenfalls ablehnen, und eine Ablehnung ist kein rechtmäßiger Grund für Vergeltung.

Regelmäßig beschäftigte Casuals haben unter Umständen einen Weg in eine Festanstellung, aber das setzt eine längere Beschäftigung voraus, als ein Working-Holiday-Visum zulässt.

## Was solltest du aufbewahren, wenn du glaubst, dass dir Geld zusteht?

Belege für den Dienstplan und für die Absage, zusammen sind sie der ganze Fall. Mach einen Screenshot vom Dienstplan, sobald er veröffentlicht ist, weil Roster-Apps überschreiben statt archivieren, und heb die SMS oder App-Benachrichtigung mit der Absage auf.

Dann vergleiche mit deinem Payslip. Die meisten Unterbezahlungsfälle dieser Art streiten nicht über das Recht, sondern darüber, was passiert ist, und ein Screenshot klärt das. Der Fair Work Ombudsman bearbeitet ungelöste Beschwerden, und ein Muster unbezahlter Absagen gehört zu den am einfachsten zu belegenden Sachverhalten.

## Der Zeitpunkt der Absage entscheidet deinen Anspruch.

Den Mindesteinsatz setzt dein Award, und ob er greift, hängt am Zeitpunkt der Absage.

- Welcher Award deinen Job abdeckt, denn er setzt Mindesteinsatz und Rosterregeln.
- Ob ein Enterprise Agreement gilt, das großzügiger sein kann als der Award.
- Ob die Schicht vor Beginn abgesagt wurde oder früh endete, denn daran hängt die Mindesteinsatzklausel.
- Ob du tatsächlich Casual bist oder über eine ABN beschäftigt wurdest, denn ein Contractor hat keinen Award, keinen Mindesteinsatz und kein Loading.
- Ob das Casual Loading von 25 % wirklich auf deinem Payslip steht, was du vor allem anderen prüfen solltest.

Ob unterbezahlt oder nicht: Alles, was von diesen Löhnen einbehalten wurde, wird am Ende des Steuerjahres abgerechnet, und du kannst deine [Steuererstattung schätzen](/de/calculator) auf Basis deiner bisherigen Jahreszahlen.
`,
  },

  'six-month-employer-rule-working-holiday-visa': {
    title: '6-Monats-Regel beim Arbeitgeber: Ausnahmen',
    description: 'Working Holiday Maker dürfen normalerweise nur 6 Monate beim selben Arbeitgeber arbeiten. Die Ausnahmen nach Branche und Region.',
    body: `
Visumsbedingung 8547 begrenzt Inhaber eines 417- oder 462-Visums auf sechs Kalendermonate beim selben Arbeitgeber. Gemessen wird Kalenderzeit, nicht Arbeitsstunden. Eine lange Liste von Branchen ist ausgenommen, und diese Ausnahmen decken die meiste Arbeit ab, die Backpacker tatsächlich machen.

## Was genau begrenzt die Regel?

Sechs Kalendermonate bei einem Arbeitgeber, gezählt ab deinem Startdatum, unabhängig von den geleisteten Stunden. Zwei Tage pro Woche über sechs Monate verbrauchen dasselbe Kontingent wie Vollzeit über sechs Monate.

- Gemessen in Kalendermonaten, nicht in Tagen oder gearbeiteten Stunden
- Gilt pro Arbeitgeber, nicht für deine Gesamtzeit in Australien
- Ein Verstoß kann zur Aufhebung des Visums führen
- Die Uhr setzt sich nur zurück, wenn ein neues Working-Holiday-Visum erteilt wird

Die Bedingung hält das Visum beim Reisen statt bei der Anstellung, und die Ausnahmen sind um Branchen mit echtem saisonalem Arbeitskräftemangel gezogen.

## Wer zählt als derselbe Arbeitgeber?

Arbeitgeber ist die juristische Einheit hinter der ABN, nicht das Gebäude, in dem du arbeitest. Diese Unterscheidung klärt mehrere Situationen, die sonst uneindeutig wirken.

- Dasselbe Unternehmen in verschiedenen Filialen ist in der Regel derselbe Arbeitgeber
- Verbundene Betriebe, die unter verschiedenen ABNs auftreten, sind verschiedene Arbeitgeber
- Franchisebetriebe mit verschiedenen Eigentümern sind verschiedene Arbeitgeber
- Bei Labour Hire gilt der Einsatzbetrieb, in dem du tatsächlich arbeitest, als Arbeitgeber
- Für Contractor ist jeder Endkunde ein eigener Arbeitgeber

Die ABN auf deinem Payslip zeigt verlässlich, bei welcher Einheit du beschäftigt bist. Zwei Lokale mit demselben Namen und verschiedenen ABNs sind zwei Arbeitgeber.

## Welche Arbeit ist ausgenommen?

Das Department of Home Affairs nimmt eine lange Liste von Sektoren aus, die zusammen die deutliche Mehrheit der Working-Holiday-Beschäftigung abdecken. Steht deine Arbeit darauf, kannst du über sechs Monate hinaus beim selben Arbeitgeber bleiben, ohne zu fragen.

- Pflanzen- und Tierzucht, einschließlich Land- und Gartenbau
- Fischerei und Perlenfischerei
- Baumzucht und Holzeinschlag
- Bergbau
- Bauwesen
- Tourismus und Gastronomie, überall in Australien
- Gesundheit, Altenpflege und Behindertenpflege
- Kinderbetreuung
- Lebensmittelverarbeitung
- Wiederaufbau nach Naturkatastrophen
- Verschiedene Standorte desselben Arbeitgebers, wo kein einzelner Standort sechs Monate überschreitet

Dass Tourismus und Gastronomie landesweit ausgenommen sind, nimmt der größten Einzelgruppe der Working-Holiday-Beschäftigten die Sorge vollständig.

## Was gilt, wenn deine Arbeit nicht ausgenommen ist?

Dann muss vor Ablauf der sechs Monate schriftlich beim Department of Home Affairs um Erlaubnis gebeten werden, nicht danach. Während über den Antrag entschieden wird, darfst du weiterarbeiten, und du musst aufhören, wenn er abgelehnt wird.

Die Genehmigung liegt im Ermessen, und die Gründe, die durchgehen, sind praktisch: ein bereits gestellter neuer Visumsantrag, der Vollzeitarbeit erlauben würde, ein Prioritätssektor mit Unterstützung des Arbeitgebers oder ein echter betrieblicher Grund. Den Antrag bis Woche 25 liegen zu lassen geht am häufigsten schief.

## Wie verhält sich das zu den 88 Tagen?

Es sind getrennte Regeln, die sich zufällig überschneiden. Die 88 Tage specified work für ein Zweitjahresvisum sind eine Anforderung an Art und Ort der Arbeit. Bedingung 8547 ist eine Zeitgrenze bei einem Arbeitgeber.

In der Praxis sind die meisten Branchen für specified work zugleich von der Sechsmonatsregel ausgenommen, alle 88 Tage auf einer einzigen Farm sind also üblicherweise unproblematisch. Für ein drittes Visum steigt die Anforderung auf sechs Monate specified work während des zweiten Visumsjahres, weshalb die Ausnahmen dort mehr zählen als beim ersten.

## Was kostet ein Verstoß tatsächlich?

Später mehr als sofort. Das unmittelbare Risiko ist die Aufhebung des Visums, real, aber nicht der übliche Ausgang. Der dauerhafte Preis ist der Eintrag: Ein Verstoß steht gegen dich, wenn ein künftiges australisches Visum geprüft wird, auch ein zweites Working-Holiday-Visum oder Jahre später ein Fachkräftevisum.

Auf der Arbeitgeberseite besteht eine eigene Haftung. Das erklärt, warum manche Betriebe dich auch dann nicht über sechs Monate behalten, wenn eine Ausnahme gilt: Sie steuern ihre eigene Compliance.

## Wie zählst du die sechs Monate richtig?

Ab deinem ersten Arbeitstag bei diesem Arbeitgeber, kalendarisch vorwärts, unabhängig von Pausen dazwischen. Zwei Monate arbeiten, sechs Wochen die Küste hochfahren und dann zurückkommen setzt die Uhr nicht zurück, sie läuft weiter.

Notiere das Startdatum, sobald du anfängst, zusammen mit der ABN vom Payslip. Diese beiden Angaben beantworten die Frage später in Sekunden, während die Rekonstruktion aus der Erinnerung die Ungenauigkeit erzeugt, die daraus ein Visumsproblem macht.

## Was entscheidet, ob das für dich überhaupt ein Thema ist?

Drei Fakten, und alle drei kannst du heute Nachmittag klären. In welcher Branche die Arbeit liegt, denn die Ausnahmen sind breit. Welche juristische Einheit dich beschäftigt, was als ABN auf dem Payslip steht. Und wann du tatsächlich angefangen hast, denn die Uhr läuft kalendarisch und Leute verschätzen sich hier um Wochen.

Wo keine Ausnahme greift, ist die einfachste Antwort meist ein Arbeitgeberwechsel statt eines Erlaubnisantrags, und die steuerlichen Folgen sind gering. Es gilt durchgehend derselbe Satz von 15 %, die [Superannuation](/de/superannuation) läuft mit 12 % weiter, und alle Löhne fließen am Jahresende in eine einzige [Steuererklärung](/de/tax-return). Steuerung verdient nur die Super: Jeder neue Arbeitgeber bedeutet eine neue Fondsangabe, und allen dieselben Fondsdaten zu geben verhindert, dass ein Jahr vier Konten und vier Anträge produziert. Du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du weißt, wie viele Arbeitgeber im Jahr zusammenkommen.

`,
  },

  'trs-tourist-refund-scheme-australia': {
    title: 'TRS: 10 % GST am Flughafen zurückholen',
    description: 'Ab 300 $ bei einem Händler innerhalb von 60 Tagen vor Abflug gibt es die GST zurück. So funktioniert das Tourist Refund Scheme Schritt für Schritt.',
    body: `
Das Tourist Refund Scheme erstattet die 10 % GST auf Waren, die du in Australien kaufst und mit ausführst. Die Rechnung muss 300 $ oder mehr von einem einzigen Geschäft betragen, innerhalb von 60 Tagen vor Abflug datiert sein, und du musst die Waren am Flughafen dabeihaben. Ein Laptop für 1.000 $ bringt rund 91 $ zurück.

## Wofür ist das Tourist Refund Scheme eigentlich da?

GST ist eine Steuer auf Verbrauch in Australien, Waren, die mit dir das Land verlassen, sollten sie also nie tragen. Das Tourist Refund Scheme gibt sie zurück, betrieben von der Australian Border Force an internationalen Flughäfen und einigen Seehäfen. Erstattet werden 10 % GST und 14,5 % Wine Equalisation Tax auf Wein.

Es steht jedem abreisenden Reisenden offen, auch Working Holiday Makern. Das Visum ändert nichts an der Berechtigung, und die Nutzung wirkt sich nicht auf deine Steuererklärung oder deinen [Super](/de/superannuation)-Antrag aus.

## Welche Käufe qualifizieren tatsächlich?

Ein Kauf qualifiziert, wenn er alle fünf Bedingungen erfüllt, und eine verfehlte macht den Antrag hinfällig. Die meisten scheitern an der Ein-Geschäft-Regel: Die 300 $ müssen von einer ABN kommen, nicht aus 300 $ Ausgaben quer durch ein Einkaufszentrum.

- Waren von einem einzigen Geschäft unter einer einzigen ABN
- Ein Rechnungsbetrag von insgesamt 300 $ oder mehr, inklusive GST
- Gekauft innerhalb von 60 Tagen vor deinem Abreisedatum
- Die Waren dabei und zur Prüfung verfügbar
- Physische Waren, keine Dienstleistungen

Elektronik, Kameras, Handys, Laptops, Uhren, Schmuck, Gepäck, Kleidung und Sportartikel qualifizieren. Dienstleistungen nicht, Unterkunft, Touren und Massagen fallen also raus, ebenso Tabak, GST-freie Artikel, alles bereits Verbrauchte und alles, was du nach Hause geschickt hast.

## Was musst du zum Schalter mitbringen?

Vier Dinge: deinen Pass, deine Bordkarte, die Original-Tax-Invoices und die Waren selbst. Fehlt eines, endet der Antrag, und die Rechnungen bleiben am häufigsten im Hostel liegen.

Die Rechnung muss Name und ABN des Verkäufers zeigen, die gezahlte GST oder einen Gesamtbetrag inklusive GST, eine Beschreibung der Ware und das Kaufdatum. Über 1.000 $ muss dein vollständiger Name darauf stehen, vom Händler beim Kauf eingetragen und nicht nachträglich.

## Wie läuft der Antrag am Flughafen?

Du checkst normal ein, behältst die Waren im Handgepäck und gehst nach der Sicherheitskontrolle zum TRS-Schalter im internationalen Terminal. Das Personal prüft Pass, Bordkarte und Rechnungen, sieht sich die Waren an und bearbeitet die Erstattung auf das genannte Zahlungsmittel.

Plane echte Zeit ein. In den Abflugspitzen sind die Schlangen lang und die Schalter schließen deutlich vor deinem Gate: 90 Minuten vor dem Flug statt der üblichen 60 trennen eine Erstattung von einer Anekdote. Die MyTRS-App erfasst die Angaben vorab, was die Zeit am Schalter verkürzt, die Prüfung aber nicht ersetzt.

## Wie und wann wird das Geld gezahlt?

Auf eine Kreditkarte, ein australisches oder ausländisches Bankkonto oder per Scheck, du wählst am Schalter. Kreditkarte ist das Üblichste und Schnellste und landet meist innerhalb von etwa fünf Werktagen.

Wer sein australisches Bankkonto vor dem Flug schließt, gibt besser eine Karte an, denn eine Erstattung an ein geschlossenes Konto hat keinen Landeplatz.

## Lohnt sich der Aufwand bei einem Backpacker-Budget?

Bei einem einzelnen großen Kauf ja, bei einem verstreuten Jahr kleiner Ausgaben nicht. Die 10 % kommen auf den Preis inklusive GST zurück, 1.000 $ Elektronik bringen also rund 91 $ und 3.000 $ rund 273 $, gegen etwa eine halbe Stunde Anstehen.

- Ein Laptop für 1.000 $ bringt rund 91 $
- Eine Kamera für 2.000 $ bringt rund 182 $
- Eine Uhr für 500 $ bringt rund 45 $

Einen ohnehin geplanten Laptop oder eine Kamera gezielt in den letzten zwei Wochen zu kaufen, damit die Rechnung in die 60 Tage fällt, ist legitim und sehr verbreitet.

## Wo steht das TRS im Rest deiner Abreise?

Das TRS ist der eine Teil der Abreise, der sich nicht nachholen lässt. Sobald du durch das Gate bist, ist der Anspruch dauerhaft weg. Deine [Steuererklärung](/de/tax-return) und dein DASP-Superantrag gehen dagegen noch Monate später vom Küchentisch zu Hause aus raus.

Die Erstattung am Flughafen ist zehn bis niedrige hunderte Dollar wert. Steuererklärung und Superantrag sind meist deutlich mehr wert, und sie überleben den Flug. Du kannst deine [Steuererstattung schätzen](/de/calculator), bevor du abreist.

## Was gilt, wenn du die Ware wieder nach Australien mitbringst?

Dann ist sie eine Einfuhr wie jede andere, und die zollfreien Grenzen gelten. Wer eine über das TRS erstattete Kamera auf einem späteren Visum wieder einführt, muss sie bei der Einreise deklarieren, wenn ihr Wert über der Freigrenze liegt, und die GST kann erneut anfallen.

Für die meisten, die endgültig abreisen, ist das kein Thema. Für alle, die ein zweites Jahr planen, schon, und das bedenkt man besser vor dem Kauf als am Schalter bei der Rückkehr.

## Was entscheidet, ob dein Antrag durchgeht?

Vier Tatsachen darüber, wie du eingekauft hast, und alle vier stehen lange vor dem Flughafen fest. Ob die 300 $ bei einem Geschäft zusammenkamen, denn mehrere Belege desselben Händlers addieren sich und zehn Läden à 30 $ nicht. Ob das Kaufdatum innerhalb von 60 Tagen vor dem Abflug liegt, rückwärts vom Flug gezählt. Ob du die Originalrechnung noch hast. Und ob die Waren körperlich bei dir sind statt im Frachtraum, nach Hause geschickt oder schon abgenutzt.

Sperrige Artikel sind der echte Grenzfall. Ein Surfbrett passt nicht in die Kabine, die Prüfung muss also vor dem Check-in mit der Airline und dem TRS-Schalter abgestimmt werden, und das ist ein Gespräch für Tage vorher, nicht für den Morgen des Abflugs.

`,
  },

  'vehicle-logbook-abn-working-holiday': {
    title: 'Fahrzeugkosten mit ABN: Fahrtenbuch und Abzug',
    description: 'Nutzt du ein Fahrzeug für Arbeit unter deiner ABN, sind die Kosten anteilig absetzbar. Der Anteil wird über ein Fahrtenbuch über zwölf Wochen nachgewiesen.',
    body: `
Zwei Methoden, und wie weit du beruflich fährst, entscheidet, welche zu dir passt. Die Cent-pro-Kilometer-Methode bringt 91 Cent je Kilometer für bis zu 5.000 Kilometer im Jahr, ohne Fahrtenbuch und gedeckelt bei 4.550 $. Die Fahrtenbuchmethode hat keine Deckelung, verlangt aber zwölf durchgehende Wochen Aufzeichnungen, und sie scheitert am häufigsten daran, dass die fehlen.

## Was zählt als geschäftliche Fahrt?

Eine Fahrt mit echtem geschäftlichem Zweck, und das ist enger, als die meisten annehmen. Geschäftlich sind Fahrten zwischen Einsatzorten am selben Tag, zum Kauf von Ausrüstung oder Material, zu einem Kunden, zu Schulungen mit direktem Bezug zur Arbeit und von deiner Unterkunft zu einer temporären Einsatzstelle, deren Ort wechselt.

Keine geschäftliche Fahrt ist der tägliche Weg von zu Hause zu einer regulären Arbeitsstätte, wie früh und wie weit auch immer. Private Fahrten ebenso wenig, und die erste und letzte Fahrt des Tages zu und von deiner Hauptarbeitsstätte ist in der Regel privat.

Für einen Backpacker mit Auto trennt sich das sauber. Die Fahrt vom Hostel zu einer Farm für ABN-Arbeit ist geschäftlich. Der Roadtrip von Sydney nach Cairns ist es nicht.

## Wie funktioniert die Cent-pro-Kilometer-Methode?

Du machst für jeden geschäftlichen Kilometer einen festen Satz geltend, ohne Belege für laufende Kosten. Der Satz beträgt 91 Cent, die Grenze liegt bei 5.000 geschäftlichen Kilometern im Jahr, der maximale Abzug damit bei 4.550 $.

Du brauchst trotzdem eine vernünftige Grundlage für die Kilometer: eine einfache Aufzeichnung mit Datum, Strecke und Zweck je Fahrt. Kilometerstände oder ein förmliches Fahrtenbuch sind nicht erforderlich, was sie zur praktischen Wahl bei gelegentlichem Fahren macht.

## Wie funktioniert die Fahrtenbuchmethode?

Du ermittelst über zwölf durchgehende Wochen einen geschäftlichen Nutzungsanteil und wendest diesen Prozentsatz auf jede Fahrzeugausgabe des ganzen Jahres an. In diesen zwölf Wochen erfasst du jede Fahrt, geschäftlich wie privat, mit Datum, Anfangs- und Endkilometerstand und Zweck.

Der Prozentsatz gilt danach für Sprit, Versicherung, Anmeldung, Wartung, Reparaturen und Abschreibung. Sechzig Prozent geschäftliche Nutzung gegen 8.000 $ Gesamtfahrzeugkosten sind ein Abzug von 4.800 $. Es gibt keine Deckelung, ein Fahrer mit hohen laufenden Kosten überschreitet das Cent-pro-Kilometer-Maximum also deutlich.

Das Fahrtenbuch bleibt fünf Jahre gültig oder bis sich dein Nutzungsmuster wesentlich ändert. Zwölf Wochen Papierkram decken damit den Rest des Visums ab, ein Argument dafür, es früh zu machen statt im Juni festzustellen, dass man es hätte tun sollen.

## Wo liegt der Wendepunkt?

Bei rund 5.000 geschäftlichen Kilometern, die Vollzeit-Rideshare- und Lieferfahrer binnen Monaten überschreiten. Darunter ist Cent pro Kilometer meist einfacher und vergleichbar, darüber ist die Fahrtenbuchmethode deutlich mehr wert.

Ein finanziertes oder geleastes Fahrzeug schiebt die Rechnung weiter Richtung Fahrtenbuch, denn Zinsen und Abschreibung werden von der Prozentmethode erfasst und sind in einem Kilometersatz gar nicht abgebildet.

## Welche Aufzeichnungen braucht jede Methode?

Mehr, als die meisten führen, und deshalb sind Fahrzeugpositionen der am häufigsten gestrichene Posten dieser Kategorie. Heb Belege für jede Fahrzeugausgabe auf, das Fahrtenbuch oder die Fahrtaufzeichnungen deiner Methode, die Kilometerstände zu Beginn und Ende des Steuerjahres und die Kaufrechnung, falls du das Auto im Jahr gekauft hast.

Bewahre alles fünf Jahre ab dem Datum der Erklärung auf, in der die Ausgaben geltend gemacht werden. Eine Position, die angefallen ist, sich aber nicht belegen lässt, ist praktisch keine Werbungskostenposition.

## Überträgt sich die Methode auf ein anderes Auto?

Der geschäftliche Nutzungsanteil hängt daran, wie du ein Fahrzeug nutzt, nicht an einem bestimmten Auto: Er überträgt sich in der Regel bei einem Fahrzeugwechsel, solange das Nutzungsmuster gleich bleibt. Die Ausgaben selbst gehören zu dem Auto, das du gefahren hast.

Das zählt für Backpacker mehr als für die meisten, weil es üblich ist, mitten im Aufenthalt ein Auto zu verkaufen und ein anderes zu kaufen. Zwölf Wochen Aufzeichnungen aus einem ersten Auto müssen in einem zweiten, gleich genutzten, nicht von vorn erhoben werden.

## Welche Methode passt zu deinem Fahren?

Beide Methoden stehen jedem ABN-Inhaber offen. Welche mehr wert ist und ob sie eine Prüfung übersteht, hängt an deinem eigenen Fahren.

- Wie viele geschäftliche Kilometer du im Jahr fährst, denn bei 5.000 greift die Deckelung.
- Ob du zwölf durchgehende Wochen Fahrtenbuch geführt hast, denn das schaltet die ungedeckelte Methode frei.
- Wie hoch deine laufenden Gesamtkosten sind, denn der Fahrtenbuchprozentsatz gilt für alle.
- Ob das Fahrzeug finanziert oder geleast ist, was Zinsen und Abschreibung hinzufügt.
- Wie klar geschäftliche und private Fahrten in den Aufzeichnungen getrennt sind.
- Ob die gezählten Fahrten wirklich geschäftlich sind und nicht Arbeitswege.

Die Methode mit dem größeren rechtmäßigen Abzug wird bei der Vorbereitung der [Working-Holiday-Steuererklärung](/de/tax-return) gewählt, und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du grob weißt, worauf ABN-Einkommen und Kosten hinauslaufen.
`,
  },

  'small-business-tax-offset-working-holiday-abn': {
    title: 'Small Business Tax Offset mit ABN nutzen',
    description: 'Mit ABN-Einkommen als Sole Trader hast du eventuell Anspruch auf bis zu 1.000 $ durch den Small Business Tax Offset. Die Bedingungen im Detail.',
    body: `
Er senkt die auf ABN-Einkommen zahlbare Steuer um 16 % dieser Steuer, gedeckelt bei 1.000 $ im Jahr. Sole Trader kommen infrage, Kapitalgesellschaften und Trusts nicht. Er ist nicht erstattungsfähig, kann die Steuer also auf null senken, aber von sich aus keine Erstattung erzeugen, und er wird nicht automatisch angewendet. Er muss beantragt werden.

## Worauf wird die Ermäßigung eigentlich gewährt?

Auf die Steuer, die auf dein Geschäftseinkommen entfällt, nicht auf das Einkommen selbst und nicht auf deine ganze Veranlagung. Diese Unterscheidung erklärt, warum die Zahl am Ende so klein ausfällt.

Drei Schritte: das Netto-Kleinunternehmenseinkommen, also ABN-Einnahmen abzüglich ABN-Werbungskosten. Dann die Steuer, die innerhalb deiner Veranlagung darauf entfällt. Darauf 16 %, gedeckelt bei 1.000 $. Aus 12.000 $ Liefereinkommen abzüglich 2.500 $ Werbungskosten bleiben also 9.500 $ netto, die Steuer darauf zu Working-Holiday-Maker-Sätzen sind 1.425 $, und der Offset bringt 228 $ zurück.

## Wer kommt infrage?

Privatpersonen mit Geschäftseinkommen unter einer ABN, als Sole Trader oder als Partner in einer Partnership, mit einem aggregierten Jahresumsatz unter 5 Millionen $. Der Umsatztest ist bei einem Working Holiday Maker nie das Problem, praktisch qualifiziert ABN-Einkommen zu haben.

Kapitalgesellschaften und Trusts sind ausgeschlossen: Der Offset gibt nicht eingetragenen Unternehmen etwas anstelle des niedrigeren Körperschaftsteuersatzes. Daher auch der Name Unincorporated Small Business Tax Discount.

## Was ist er bei typischen Backpacker-Einkommen wert?

Bescheiden und trotzdem mitzunehmen. Er skaliert mit der Steuer auf den Geschäftsanteil: je mehr deines Jahres über die ABN lief, desto größer, bis zur Deckelung.

- 5.000 $ Netto-ABN-Einkommen: ein Offset in der Größenordnung von 120 $
- 15.000 $: rund 360 $
- 30.000 $: rund 720 $
- Darüber: gedeckelt bei 1.000 $

Werbungskosten senken neben der Steuer auch den Offset, denn ein kleineres Netto-Geschäftseinkommen trägt weniger Steuer. Das ist kein Grund, weniger geltend zu machen: Ein Dollar Werbungskosten spart mehr als die 16 %, die der Offset darauf zurückgibt.

## Lässt er sich mit anderen Offsets kombinieren?

Ja, und bei einem Working Holiday Maker mit gemischtem Einkommen ist er das meistens. Jeder Offset wird getrennt berechnet und auf die Endposition angewendet.

- Der Small Business Tax Offset, auf die dem Geschäftseinkommen zuzurechnende Steuer, gedeckelt bei 1.000 $
- Der Low Income Tax Offset, der gilt, wo du als Resident veranlagt wirst, bis zu 700 $ wert
- Die Medicare-Levy-Befreiung, die die 2-%-Abgabe entfernt, wo du keinen Medicare-Anspruch hast

Ihr Zusammenspiel macht Jahre mit gemischtem Einkommen kompliziert: Der Wohnsitz entscheidet, ob der Low Income Tax Offset überhaupt verfügbar ist, der Pass entscheidet die Medicare-Frage. Diese Seite behandelt unser Guide zum [Low Income Tax Offset](/de/blog/low-income-tax-offset-working-holiday).

## Was passiert, wenn du Lohn und ABN-Einkommen hattest?

Beide werden zu Working-Holiday-Maker-Sätzen besteuert, beide gehen auf eine Erklärung, und nur auf den ABN-Anteil gibt es diesen Offset. Werbungskosten und andere Offsets wirken über die ganze Veranlagung.

Diese Kombination ist häufig und läuft öfter zu deinen Gunsten, als Leute erwarten: Die vom Lohn einbehaltene PAYG-Steuer deckt häufig die Steuer auf das unbesteuerte ABN-Einkommen. Der Offset senkt die verbleibende Geschäftssteuer, was aus einem kleinen Zahlbetrag ein Nichts machen kann.

## Was hebt ihn auf?

Einkommen, das nicht wirklich Geschäftseinkommen ist. Wird eine Vereinbarung als Anstellung statt als Contracting neu eingestuft, hört das Einkommen auf, Kleinunternehmenseinkommen zu sein, und der Offset geht mit ihm, zusammen mit den dagegen geltend gemachten Werbungskosten.

Sham Contracting, bei dem eine Arbeitskraft für einen in Wahrheit beaufsichtigten Stundenjob auf eine ABN gesetzt wird, ist in Gastronomie und Farmarbeit verbreitet. Die Neueinstufung bringt Award-Sätze, Superannuation und Unfallversicherung zurück und nimmt den Offset weg. Wie die Linie gezogen wird, steht in unserem Guide zum [Test Angestellter gegen Contractor](/de/blog/employee-vs-contractor-australia).

## Was, wenn du bereits ohne ihn eingereicht hast?

Er lässt sich meist über eine Berichtigung beantragen, und das übliche Fenster beträgt zwei Jahre ab Ergehen des ursprünglichen Bescheids. Wer im vergangenen Oktober eingereicht hat, ist sehr oft noch darin.

Selbst eingereichte Erklärungen übersehen ihn regelmäßig, weil nichts danach fragt und das ATO ihn nicht für dich anwendet. Jedes Jahr mit ABN-Einkommen lohnt eine Prüfung.

## Was ist der Offset in deinem Jahr wert?

Satz und Deckelung stehen fest. Was der Offset für dich wert ist, entscheidet der Zuschnitt deines Jahres. Diese Tatsachen bestimmen die Höhe und ob er überhaupt bestehen bleibt.

- Wie viel deines Einkommens über die ABN lief statt über Lohn.
- Worauf deine Werbungskosten hinausliefen, denn der Offset wirkt auf die Steuer des Netto-Geschäftseinkommens.
- Ob du auch Lohn hattest, dessen Einbehalt die Geschäftssteuer oft aufsaugt, bevor der Offset greift.
- Ob das Contracting echt war, denn eine Neueinstufung nimmt ihn weg.
- Ob du als Resident veranlagt wirst, denn davon hängt ab, ob der Low Income Tax Offset danebensteht.
- Ob ein Vorjahr ohne ihn eingereicht wurde, was sich meist innerhalb von zwei Jahren ändern lässt.

Jeder berechtigte Offset wird bei der Vorbereitung der [Working-Holiday-Steuererklärung](/de/tax-return) angewendet, und wie die beiden Einkommensarten zusammenwirken, spielst du am schnellsten im [Erstattungsrechner](/de/calculator) durch.
`,
  },

  'profit-loss-vs-personal-services-income-australia': {
    title: 'Personal Services Income oder Business?',
    description: 'Verdienst du dein Geld vor allem mit eigener Arbeitskraft, gelten die PSI-Regeln und die Abzüge sind begrenzt. Ein Business wird anders behandelt.',
    body: `
Fast alles [ABN](/de/abn)-Einkommen von Working Holiday Makern ist Personal Services Income, weil du für deine eigene Arbeitsleistung bezahlt wirst und nicht für Waren, Vermögen oder die Arbeit anderer. PSI ist keine Strafe und kein Problem. Es schränkt eine kleine Gruppe von Abzügen ein, die Backpacker ohnehin selten haben.

## Was gilt als Personal Services Income?

Einkommen, das überwiegend aus deinen eigenen Fähigkeiten und deiner Mühe stammt und nicht aus dem Verkauf von etwas. Kauft der Zahler in Wahrheit deine Stunden, ist das PSI, egal was auf der Rechnung steht. Das deckt das meiste ab, was ein Working Holiday Maker unter einer ABN tut.

- Handwerker, die für ihre Arbeitsleistung bezahlt werden
- Reinigungskräfte, die für ihre Reinigung bezahlt werden
- Obstpflücker, die nach Kiste oder nach Stunde bezahlt werden
- Freelancer und Berater, die für ihre eigene Arbeit bezahlt werden
- Lieferfahrer, die pro Zustellung bezahlt werden

Ein Tischler, der einer Baufirma Rechnungen stellt, wird für seine Stunden und sein Können bezahlt: PSI. Ebenso ein Pflücker mit eigenen Handschuhen und eigener Schere, der einem Personaldienstleister Rechnungen stellt.

## Was würde dein ABN-Einkommen stattdessen zu Geschäftseinkommen machen?

Geschäftseinkommen kommt aus etwas anderem als deiner persönlichen Mühe: Waren, die du herstellst, Vermögen, das du besitzt, oder Leuten, die du beschäftigst. Der Test ist, ob das Geld auch käme, wenn du persönlich nicht da wärst. Für fast jeden Backpacker auf einer ABN lautet die Antwort nein.

- Waren herstellen und verkaufen, etwa eine Bäckerei
- Einkommen aus Betriebsvermögen, etwa Geräteverleih
- Andere beschäftigen, die die von dir vereinbarte Arbeit erledigen
- Produkte von Lieferanten weiterverkaufen

## Wie funktioniert die 80-Prozent-Regel genau?

Der erste Test des ATO: Kommen mehr als 80 % deines Personal Services Income eines Jahres von einem Kunden und dessen verbundenen Unternehmen, kannst du dich nicht aus den PSI-Regeln herausbewerten. Unter 80 % können dich drei weitere Tests herausbringen, und du musst nur einen bestehen.

- **Results Test**: Du wirst für ein bestimmtes Ergebnis bezahlt, stellst dein eigenes Werkzeug und haftest dafür, Mängel auf eigene Kosten zu beheben
- **Unrelated Clients Test**: Du hast zwei oder mehr voneinander unabhängige Kunden, gewonnen über öffentliche Werbung oder ein vergleichbares Angebot
- **Employment Test**: Du bezahlst jemand anderen dafür, mindestens 20 % der Hauptarbeit zu machen
- **Business Premises Test**: Du arbeitest aus Räumen, die räumlich von deinem Zuhause und von deinem Kunden getrennt sind

In der Praxis scheitern die meisten Working Holiday Maker an allen vier. Eine Farm, ein Personaldienstleister oder eine Plattform liefert fast das gesamte Einkommen, das Werkzeug gehört dem Kunden, und getrennte Räume gibt es nicht. Das Ergebnis ist normal.

## Welche Abzüge schränkt PSI tatsächlich ein?

PSI schränkt Abzüge ein, die nur innerhalb einer echten Betriebsstruktur Sinn ergeben, und lässt die gewöhnlichen berufsbezogenen Abzüge intakt. Weg ist die Möglichkeit, Einkommen oder Kosten auf andere Personen zu verschieben.

Weiterhin absetzbar unter PSI:

- Werkzeug und Ausrüstung, die du persönlich nutzt
- Schutzkleidung und Uniformen
- Fahrten zwischen Arbeitsorten am selben Tag
- Fahrzeugkosten für echte Geschäftsfahrten
- Der berufliche Anteil von Handy und Internet
- Weiterbildung, die unmittelbar mit der Arbeit zusammenhängt, die du bereits machst

Eingeschränkt oder nicht verfügbar unter PSI:

- Löhne oder [Superannuation](/de/superannuation) an Partner oder Familienmitglieder für Unterstützungsarbeit
- Miete für Räume, die die Arbeit nicht wirklich erfordert
- Die meisten Kosten für ein häusliches Arbeitszimmer

## Ändert PSI, was ein Fahrer oder Pflücker absetzen kann?

Fast nichts. Das Rad, die Schuhe, der Anteil am Handytarif und die Kilometer zwischen Einsatzorten bleiben absetzbar, und dort liegt das Geld. Die eingeschränkten Abzüge hat diese Gruppe von vornherein nicht.

Wir sehen die Sorge weit häufiger als die Folge. Jemand liest, dass sein Einkommen PSI ist, nimmt an, dass Abzüge gestrichen werden, und macht dann zu viel geltend oder gar nichts. Beides kostet Geld.

## Wann ändert die Einordnung dein Ergebnis wirklich?

Wenn die ABN-Arbeit ein echter zweiter Betrieb ist und keine verkleideten Löhne. Wenn du andere Backpacker als Subunternehmer beschäftigt, Rechnungen mit einem Partner geteilt oder zwei wirklich unabhängige Kundenstämme geführt hast, können die Tests ein anderes Ergebnis liefern und der Abzugsrahmen wird breiter.

Sie zählt auch, wenn die ABN von Anfang an unpassend war. Wo die Konstruktion wie eine Anstellung aussieht, mit festen Stunden, Aufsicht und dem Werkzeug des Kunden, ist das Thema nicht PSI, sondern Scheinselbstständigkeit, und das ändert, wer deine Super und deine Mindestsätze schuldet. Diesen Test beschreibt unser Guide zu [Angestellter gegen Contractor](/de/blog/employee-vs-contractor-australia).

## Was entscheidet es in deinem Fall?

Vier Fakten über dein Jahr, die du bereits kennst: wie viele Kunden dich bezahlt haben, ob einer davon mehr als 80 % des ABN-Einkommens ausmachte, ob du das Werkzeug gestellt und das Risiko getragen hast, eigene Fehler zu beheben, und ob jemand für dich gearbeitet hat. Zusammen entscheiden sie, welche Tests du bestehen kannst.

PSI, Scheinselbstständigkeit und gewöhnliches Contracting sehen auf einem Kontoauszug identisch aus und erzeugen unterschiedliche Erklärungen. Bei einer [Steuererklärung](/de/tax-return) mit ABN-Einkommen zeigt die genaue Beschreibung der Arbeit, wer dich bezahlt hat, wie du bezahlt wurdest und wessen Ausrüstung du genutzt hast, welches Regelwerk gilt. Was am Ende herauskommt, kannst du vorab im [Rechner](/de/calculator) abschätzen.
`,
  },

  'appealing-ato-decision-australia': {
    title: 'ATO-Bescheid anfechten: so läuft es ab',
    description: 'Gegen einen Bescheid kannst du innerhalb der Frist Einspruch einlegen. Zuerst prüft das ATO selbst, danach steht der Weg zum AAT und zum Gericht offen.',
    body: `
Du kannst gegen eine ATO-Entscheidung Einspruch einlegen, und die Einreichung kostet nichts. Bei einem gewöhnlichen Einkommensteuerbescheid für Privatpersonen beträgt das Fenster in der Regel zwei Jahre ab dem Datum auf dem Bescheid, bei den meisten anderen Entscheidungen 60 Tage. Working Holiday Maker haben dieselben Rechte wie alle anderen.

## Wann ist ein Einspruch das richtige Mittel?

Ein Einspruch greift eine ATO-Position an, die du rechtlich oder tatsächlich für falsch hältst. Einen eigenen Fehler korrigiert dagegen eine Berichtigung. Wer beides verwechselt, verbraucht die Frist im falschen Verfahren.

- Ein Bescheid mit einer Steuerschuld, die du für unrichtig hältst
- Eine gestrichene Werbungskostenposition, die du für berechtigt hältst
- Eine Strafe, die deiner Ansicht nach nicht hätte greifen dürfen
- Ein Wohnsitzstatus, der gegen dich festgestellt wurde
- Einkommenszahlen im Bescheid, die nicht zu deinen Aufzeichnungen passen
- Eine Erstattung, die ohne Begründung gekürzt oder abgelehnt wurde

Am häufigsten sind bei Working Holiday Makern die Behandlung des Wohnsitzes und Bescheide vor spät eingetroffenen Befreiungsunterlagen, etwa einem Medicare Entitlement Statement nach der Abgabe. Dokumentiert sind beide regelmäßig erfolgreich.

## Welche Frist gilt tatsächlich für dich?

Die Frist hängt von der Art der Entscheidung ab. Bei einem Einkommensteuerbescheid für Privatpersonen beträgt sie in der Regel zwei Jahre ab dem Datum des Bescheids.

Bei den meisten anderen Entscheidungen, darunter viele Straf- und Private-Ruling-Entscheidungen, sind es 60 Tage. Ist das Fenster bereits geschlossen, lässt sich ein verspäteter Einspruch mit schriftlicher Begründung für die Verzögerung dennoch einreichen, im Ermessen des ATO.

## Was macht einen Einspruch erfolgreich?

Struktur, nicht Eloquenz. Der Prüfer muss vier Dinge in etwa einer Minute finden. Ein Einspruch, der sie in Erzählung vergräbt, kommt mit einer Rückfrage zurück und verliert Monate.

1. Welche Entscheidung angegriffen wird, mit Kennzeichnung und Datum des Bescheids
2. Welche konkreten Punkte bestritten werden, präzise benannt und nicht als allgemeiner Widerspruch
3. Was die korrekte Behandlung ist und welche Regel sie stützt
4. Die Belege, beigefügt und nicht beschrieben

Wer den ganzen Bescheid bestreitet, bekommt eine Zurückweisung. Wer die Feststellung zum Wohnsitz oder eine namentlich genannte Werbungskostenposition bestreitet, bekommt eine Entscheidung.

## Was kostet das?

Die Einreichung kostet nichts. Es gibt keine ATO-Gebühr für einen Einspruch, und das Verfahren ist ohne Vertretung nutzbar. Kosten entstehen nur, wenn du jemanden mit der Erstellung beauftragst oder die Sache zum Administrative Appeals Tribunal eskaliert, das eine eigene Gebühr hat.

Wo der strittige Betrag ein paar hundert Dollar ist, ist ein kostenloser Einspruch die Einreichung wert, ein Tribunalantrag in der Regel nicht.

## Was passiert, während der Streit läuft?

Die Zinsen laufen über den General Interest Charge auf jeden strittigen Betrag weiter, und das ATO kann Eintreibungsmaßnahmen fortsetzen, solange es einer Aussetzung nicht zustimmt. Deshalb sollte ein Einspruch nicht drei Monate liegen bleiben.

Hat der Einspruch Erfolg, können Zinsen und Strafen auf den strittigen Teil erlassen werden. Scheitert er, bleibt der ursprüngliche Betrag geschuldet, zuzüglich der aufgelaufenen Zinsen. Eine Aussetzung der Eintreibung kann während der Prüfung beantragt werden und wird meist gewährt, wo der Einspruch ernsthaft ist.

## Was, wenn der Einspruch abgelehnt wird?

Das ATO gibt in der Regel innerhalb von etwa 60 Werktagen eines von drei Ergebnissen aus: vollständig stattgegeben, teilweise stattgegeben oder abgelehnt. Nach einer Ablehnung folgt die unabhängige Überprüfung durch das Administrative Appeals Tribunal und darüber hinaus der Federal Court.

Für Working Holiday Maker ist das Tribunal die realistische Obergrenze. Verfahren am Federal Court kosten mehr, als ein individueller Erstattungsstreit wert ist, und die meisten berechtigten Backpacker-Streitigkeiten enden Monate früher mit einem korrigierten Bescheid.

## Geht das auch nach der Ausreise aus Australien?

Ja. Nichts am Einspruchsverfahren verlangt, dass du im Land bist. Dokumente und Korrespondenz laufen aus der Ferne, so wie bei Leuten, die im November nach Hause geflogen sind und den Bescheid im Februar bekommen haben.

Die Komplikation ist, dass die Korrespondenz dich erreicht. Ein ATO-Brief an eine Hosteladresse, die du vor acht Monaten verlassen hast, macht aus einem Zweijahresfenster still eine Diskussion darüber, warum du spät geantwortet hast.

## Was entscheidet, ob du überhaupt Einspruch einlegen solltest?

Zwei Dinge. Erstens, ob das ATO falsch liegt. Manchmal tut es das nicht, und dann ist es besser, den Bescheid anzunehmen, statt drei Monate mit seiner Bestätigung zu verbringen. Die Begründung im Bescheid zu lesen, bevor man auf die Zahl reagiert, lohnt sich.

Zweitens, woher der Fehler kam. Die meisten Streitigkeiten lassen sich darauf zurückführen, wie die ursprüngliche [Steuererklärung](/de/tax-return) erstellt wurde: ein gedankenlos beantworteter Punkt zum Wohnsitz, eine standardmäßig eingenommene Medicare-Position, eine Werbungskostenposition ohne Nachweise. Ein Einspruch ist der teure Weg, eine Entscheidung zu reparieren, die bei der Abgabe in zehn Sekunden getroffen wurde.
`,
  },

  'piece-rates-farm-work-working-holiday': {
    title: 'Akkordlohn beim Pflücken: die Mindestregeln',
    description: 'Beim Akkordlohn zählt die Pflückmenge statt der Stunde. Der Horticulture Award sichert dir trotzdem einen garantierten Mindeststundenlohn zu.',
    body: `
Akkordlohn zahlt dich pro Kiste, Kilogramm oder Tray statt pro Stunde, und er ist unter dem Horticulture Award rechtmäßig. Rechtmäßig macht ihn die Untergrenze darunter: Ein Akkordarbeiter, der Angestellter ist, muss trotzdem den Mindeststundensatz seiner Einstufung bekommen. Schlechte Wochen werden aufgestockt.

## Wie funktioniert ein Akkordlohn?

Du wirst für Leistung statt für Zeit bezahlt, das Geld folgt also dem, was du pflückst, wiegst oder packst. Pro Kilogramm Erdbeeren, pro Kiste Äpfel, pro Tray Heidelbeeren, pro gejäteter Reihe, pro verpacktem Artikel.

Das System belohnt Tempo, erfahrene Pflücker fahren damit oft gut. Eine erste Woche ist eine andere Sache: Technik braucht Zeit, und wer an unbekanntem Obst lernt, pflückt einen Bruchteil dessen, was eine wiederkehrende Kraft schafft. Für diese Lücke existiert die garantierte Untergrenze.

## Was ist die garantierte Untergrenze?

Sie ist der Mindeststundensatz deiner Einstufung nach dem Award, angewendet auf die Stunden, die du in der Lohnperiode tatsächlich gearbeitet hast. Liegen deine Akkordeinkünfte geteilt durch deine Stunden darunter, muss der Arbeitgeber die Differenz aufstocken. Das liegt nicht im Ermessen und eine Farm kann es nicht wegvereinbaren.

Ab dem 1. Juli 2026 liegt das Casual-Minimum über alle Arbeit hinweg bei 33,05 $ pro Stunde, also dem nationalen Mindestlohn von 26,44 $ plus dem 25-%-Casual-Loading, und die Award-Einstufungssätze liegen darüber. Die Untergrenze wird je Lohnperiode und nicht je Tag berechnet, ein schneller Freitag kann also einen langsamen Dienstag derselben Periode ausgleichen, aber die Periode als Ganzes muss die Linie erreichen.

## Wie funktioniert die Aufstockungsrechnung?

Akkordeinkünfte der Periode geteilt durch die gearbeiteten Stunden. Liegt das Ergebnis unter dem anwendbaren Stundenminimum, ist der Fehlbetrag die Differenz zwischen dem, was die Stunden hätten zahlen müssen, und dem, was die Stücke gezahlt haben.

Bei 33,05 $ pro Stunde ist die Rechnung geradlinig. Zwanzig Stunden zu diesem Satz sind 661,00 $. Haben diese zwanzig Stunden 400 $ an Akkordeinkünften erzeugt, lag der effektive Satz bei 20,00 $ pro Stunde und der Arbeitgeber schuldet für diese Periode eine Aufstockung von 261,00 $. Ein Arbeitgeber, der nur die 400 $ zahlt, verstößt gegen den Fair Work Act, was auch immer vorher mündlich vereinbart wurde.

## Was ist an einer mündlichen Akkordvereinbarung falsch?

Sie ist nicht wirksam. Akkordlohnvereinbarungen unter dem Horticulture Award müssen schriftlich sein, ein quer über den Hallenboden gerufener Satz von vier Dollar pro Tray scheitert also schon beim Zustandekommen.

Eine schriftliche Vereinbarung hält den Satz fest, verhindert, dass er mitten in der Saison nach unten wandert, und macht eine spätere Forderung unkompliziert. Wo keine existiert, gilt standardmäßig der gewöhnliche Stundensatz, und der ist meist besser als das mündlich Gesagte.

## Auf welche Praktiken solltest du achten?

Auf die, die deine erfasste Leistung oder deine erfassten Stunden senken, ohne die Arbeit zu senken. Jede ist im Gartenbau häufig genug, um gezielt geprüft und nicht angenommen zu werden.

- Unterzählung, bei der die erfasste Stückzahl oder das Gewicht unter dem liegt, was du tatsächlich gepflückt hast
- Unbezahlte Sortier-, Pack- oder Rüstzeit, die Arbeitszeit ist und in die Stunden der Rechnung zählt
- Abzüge für Unterkunft, Transport oder Mahlzeiten, die den effektiven Satz unter das Minimum drücken
- Gar keine Aufstockung, der häufigste einzelne Verstoß in der Akkordarbeit
- So dünn zugeteilte Reihen oder Blöcke, dass das Ziel unerreichbar ist, was die Untergrenze nicht aufhebt

## Wie prüfst du deine eigene Woche?

Führe ein Tagesprotokoll, denn die Garantie schützt nur Pflücker, die zeigen können, was passiert ist. Erfasse Anfangs- und Endzeiten, Pausen und die gepflückten Einheiten oder ausgegebenen Zählbelege, und fotografiere alles, was die Farm aufschreibt, bevor es in einer Schublade verschwindet.

Einkünfte geteilt durch Stunden ergibt deinen effektiven Satz, der Vergleich mit dem Stundenminimum deiner Einstufung den Fehlbetrag. Dauerhaft Ergebnisse unter der Untergrenze heißen eines von zwei Dingen: Der Satz pro Einheit war zu niedrig angesetzt, um rechtmäßig zu sein, oder die Bedingungen machten das Ziel unmöglich. So oder so beginnt das Gespräch mit deinem Protokoll, und das Rückholverfahren des Fair Work Ombudsman läuft auf genau diesen Belegen. Wie es von dort weitergeht, behandelt unser Guide zu [Lohnraub und Rückholung](/de/blog/wage-theft-working-holiday-australia).

## Wie wird Akkordeinkommen besteuert?

Genau wie jedes andere Anstellungseinkommen. PAYG wird mit hinterlegter TFN zu 15 % einbehalten, 12 % [Super](/de/superannuation) werden zusätzlich zum Bruttoverdienst gezahlt, und der gesamte Betrag erscheint in deinem Income Statement und auf deiner [Steuererklärung](/de/tax-return).

Entscheidend ist, ob du überhaupt Angestellter bist. Akkordarbeit über eine [ABN](/de/abn) hat keinen Einbehalt, bringt keine Super und trägt keine garantierte Untergrenze, und genau deshalb bevorzugen manche Betreiber sie. Ob diese Einstufung echt ist, hängt davon ab, wie die Arbeit läuft, nicht davon, was auf dem Papier steht, und den Test setzt unser Guide zu [Farmarbeit und ABNs](/de/blog/farm-work-and-abns) auseinander.
`,
  },

  'labour-hire-agencies-working-holiday-australia': {
    title: 'Personalvermittler: Rechte und Fallstricke',
    description: 'Bei einem Personalvermittler ist die Agentur dein Arbeitgeber und schuldet dir Lohn und Super. In mehreren Bundesstaaten braucht sie dafür eine Lizenz.',
    body: `
Wenn du über eine Labour-Hire-Agentur arbeitest, ist die Agentur dein Arbeitgeber und die Farm oder die Baustelle nur der Ort, an den du gehst. Diese eine Tatsache entscheidet, wer dir Lohn, Super und Ansprüche schuldet. Sie ist zugleich der Grund, warum genau diese Ansprüche in der Agenturarbeit am häufigsten verschwinden.

## Wer ist rechtlich dein Arbeitgeber?

Die Agentur, in jeder Hinsicht, die zählt. Sie bezahlt dich, behält deine Steuer ein, schuldet deine [Super](/de/superannuation), stellt deine Payslips aus und trägt die Pflichten aus dem Award. Der Einsatzbetrieb sagt dir, was du tun sollst, und schuldet dir nichts davon.

Diese Trennung ist der Grund, warum Agenturkonstruktionen häufiger schiefgehen als direkte Anstellung. Fehlt Lohn, verweist der Einsatzbetrieb auf die Agentur und die Agentur auf den Betrieb, der die Stunden festlegt, und ohne schriftliche Bedingungen ist niemand erkennbar verantwortlich. Schriftlich festzuhalten, wer dein Arbeitgeber ist, bevor du anfängst, beseitigt das meiste davon.

## Was bringt dir Agenturarbeit?

Vor allem Tempo. Agenturen vermitteln in Tagen statt in Wochen, decken mehrere Branchen ab und verlangen weit weniger als ein direkter Einstellungsprozess, und das zählt, wenn du diese Woche Arbeit brauchst statt nächsten Monat.

Sie erledigen außerdem die Lohnmechanik über mehrere Einsätze hinweg: Drei Einsatzorte in einem Monat erzeugen einen Arbeitgeber, ein TFN Declaration und einen Superfonds statt jeweils dreier. Für jemanden, der sich durch Australien bewegt, vereinfacht das das Jahr, und es ist der Grund, warum so viele Backpacker sie trotz der folgenden Risiken nutzen.

## Wo geht Agenturarbeit schief?

Vor allem bei den Abzügen. Für Unterkunft und Transport zu berechnen ist rechtmäßig, wo es schriftlich vereinbart und angemessen ist, und wird zu Lohnraub, sobald die Abzüge deinen effektiven Satz unter das Minimum drücken. Gebündelte Pakete, bei denen wöchentlich ein Betrag für Zimmer und Busplatz genommen wird, ohne Aufschlüsselung, sind die Stelle, an der sich Ausbeutung konzentriert.

Die übrigen Versäumnisse sind erkennbar, sobald man weiß, wonach man sucht: auf eine ABN als Contractor gesetzt zu werden, obwohl die Arbeit klar Anstellung ist, nie angewendete Zuschläge für Wochenendschichten, gar nicht ausgestellte Payslips und bis zum Abschluss eines Einsatzes einbehaltener Lohn, was nie rechtmäßig ist. Sagt dir eine Agentur, für Labour Hire gälten andere Regeln, ist das unwahr: Der Fair Work Act gilt in vollem Umfang.

## Was steht dir tatsächlich zu?

Genau das, was du bei direkter Arbeit für den Einsatzbetrieb bekämst, ohne Abschlag für die Konstruktion: der Award-Satz für die Einstufung am Einsatzort, Zuschläge für Wochenenden, Feiertage und Überstunden und Payslips innerhalb eines Werktags nach jeder Zahlung.

- Der Award-Satz für die Arbeit, wobei die Casual-Untergrenze ab 1. Juli 2026 bei 33,05 $ pro Stunde liegt
- 12 % Super in deinen genannten Fonds
- Payslips mit Aufschlüsselung von Stunden, Satz, Steuer und Abzügen
- Schriftliche Bedingungen, bevor du einen Einsatz beginnst
- Ein sicherer Arbeitsplatz, was ebenso die Pflicht des Einsatzbetriebs wie der Agentur ist

## Ist die Agentur lizenziert?

Das lohnt sich zu prüfen, bevor du unterschreibst, denn mehrere Bundesstaaten verlangen es. Victoria, Queensland, South Australia und das Australian Capital Territory betreiben verpflichtende Labour-Hire-Lizenzsysteme mit öffentlichen Registern, und ohne Lizenz dort zu operieren ist eine Straftat.

Eine Lizenz ist keine Garantie für gutes Verhalten, aber ihr Fehlen in einem Bundesstaat, der sie verlangt, sagt schnell sehr viel. Zusammen mit den Grundlagen, ob sie in einen bekannten Superfonds zahlen, ob Bedingungen schriftlich kommen, ob Payslips aufgeschlüsselt sind, ob die Zahlung jeden Zyklus am selben Tag ankommt, trennt das an einem Nachmittag die seriösen Anbieter vom Rest.

## Was solltest du vor der Unterschrift fragen?

Fünf Fragen, und die Antworten sollten schriftlich kommen. Eine Agentur, die sie nicht beantworten kann oder will, sagt dir damit mehr als jede Antwort.

- Seid ihr lizenziert, und in welchem Bundesstaat
- Wer zahlt meine Super, und in welchen Fonds
- Welcher Award und welche Einstufung decken die Arbeit am Einsatzort
- Werden Payslips nach Einsatzort und Schicht aufgeschlüsselt
- Welche Abzüge werden genommen, und zu welchem Satz

Bei den Abzügen lohnt es sich nachzuhaken. Transport- und Wohnpakete sind die Stelle, an der das Geld verschwindet, und ein Betrag pro Woche statt pro Posten ist die Form, die Unterbezahlung schwer sichtbar macht.

## Was, wenn du dich unterbezahlt glaubst?

Ermittle zuerst deinen effektiven Satz, denn darauf läuft jede Forderung hinaus. Summiere alles, was dir über eine Lohnperiode gezahlt wurde, einschließlich Aufstockungen, teile es durch die tatsächlich gearbeiteten Stunden einschließlich unbezahlter Wartezeit, und vergleiche mit dem Award-Satz.

Bleibt es darunter, richtet sich die Forderung gegen die Agentur, nicht gegen den Einsatzbetrieb. Der Fair Work Ombudsman bearbeitet Unterbezahlungsbeschwerden kostenlos, nicht gezahlte Super geht stattdessen an das ATO, und ein 417- oder 462-Visum schwächt keines von beiden. Welche Belege eine Forderung tragen, behandelt unser Guide zu [Lohnraub und Rückholung](/de/blog/wage-theft-working-holiday-australia).
`,
  },

  'how-to-read-a-payslip-australia-working-holiday': {
    title: 'Payslips lesen: stimmt deine Abrechnung?',
    description: 'Auf dem Payslip stehen Stunden, Satz, Brutto, einbehaltene Steuer und Super. Stimmt der Steuerabzug nicht mit 15 %, fehlt meist deine TFN im System.',
    body: `
Ein australischer Payslip muss innerhalb eines Werktags nach der Zahlung ausgestellt werden und muss Bruttolohn, einbehaltene Steuer, Super und Nettolohn zeigen. Für einen Working Holiday Maker mit hinterlegter TFN sollte die Steuer 15 % vom Brutto sein und die Super 12 % obendrauf. Zwei Divisionen sagen es dir.

## Warum ist der Payslip das entscheidende Dokument?

Weil er der einzige Ort ist, an dem Stunden, Satz, Steuer und Super gemeinsam auftauchen, und der Beleg, falls sich eines davon als falsch herausstellt. Dein Kontoauszug zeigt eine Zahl und nicht, wie sie zustande kam.

Er ist außerdem die Aufzeichnung, die zuerst verschwindet. Payslips über eine Dienstplan-App oder eine Arbeits-E-Mail sind weg, sobald deine Anstellung endet, oft bevor du daran gedacht hast, sie zu brauchen, und ein Jahr Bezahlung ohne sie zu rekonstruieren ist weit schwerer, als jeden beim Eintreffen zu sichern. Sie dir selbst zu mailen sind dreißig Sekunden alle zwei Wochen.

## Wie sollte der Bruttolohn aussehen?

Stunden mal Satz, plus Zuschläge für Wochenend-, Abend-, Überstunden- oder Feiertagsarbeit, plus jede Zulage, die der Award an den Job hängt. Prüfe diese Zeile zuerst, denn jede andere Zahl wird daraus berechnet, und eine falsche Stundenzahl macht alles darunter falsch.

Prüfe gegen deine eigene Aufzeichnung der Stunden, nicht gegen den Dienstplan, denn beide weichen oft ab. Zeit für den Aufbau vor einer Schicht oder das Aufräumen danach ist Arbeitszeit, und dort verschwinden Stunden still. Eine Woche mit einem Sonntag sollte deutlich anders aussehen als eine ohne, und wird jede Stunde einer Woche mit Wochenendarbeit gleich bezahlt, wird der Award nicht angewendet.

## Wie prüfst du die Steuerzeile?

Teile die einbehaltene Steuer durch den Bruttolohn. Für einen Working Holiday Maker mit verarbeitetem Tax File Number Declaration und registriertem Arbeitgeber sollte die Antwort nahe an 15 % liegen.

Alles deutlich darüber hat eine bestimmte Ursache, und sie werden unterschiedlich behoben.

- Rund 45 %: Deine TFN ist bei diesem Arbeitgeber noch nicht erfasst, meist weil das Declaration-Formular nicht verarbeitet wurde
- Rund 30 %: Der Arbeitgeber ist beim ATO nicht als Working-Holiday-Maker-Arbeitgeber registriert
- Deutlich unter 15 %: Der Freibetrag wurde womöglich versehentlich auf dem Declaration beansprucht, was später eine Rechnung statt einer Erstattung erzeugt

Nichts vom Überabzug ist verloren, er wird bei der [Steuererklärung](/de/tax-return) gutgeschrieben, aber das Geld liegt bis dahin beim ATO. Deshalb lohnt es, einen falschen Satz in der ersten Woche anzusprechen und nicht am Jahresende.

## Wie prüfst du die Superzeile?

Teile die Superzahl durch den Bruttolohn und erwarte 12 %, den Satz seit dem 1. Juli 2025. Super zahlt der Arbeitgeber zusätzlich zu deinem Lohn, sie sollte deinen Nettolohn also nie mindern, und ein Payslip, auf dem Super aus deinem Verdienst zu kommen scheint, gehört hinterfragt.

Wichtig ist die Unterscheidung zwischen aufgelaufen und gezahlt. Eine Superzahl auf einem Payslip hält fest, was der Arbeitgeber für diese Periode schuldet, nicht was deinen Fonds erreicht hat, und dazwischen liegen bis zu drei Monate, weil Super quartalsweise gezahlt wird. Ob das Geld ankam, sagt dir nur der Fonds selbst. Was zu tun ist, wenn nicht, behandelt unser Guide zu [nicht gezahlter Super](/de/blog/super-employer-not-paying-what-to-do).

## Was sagt dir der Nettolohn?

Ob die Rechnung aufgeht. Der Nettolohn ist Bruttolohn minus einbehaltener Steuer und etwaiger rechtmäßiger Abzüge, und er sollte auf den Cent mit dem Eingang auf deinem Konto übereinstimmen. Super taucht in dieser Rechnung nicht auf.

Jeder Abzug, für Unterkunft, Ausrüstung oder anderes, muss auf dem Payslip ausgewiesen, vorher vereinbart und rechtmäßig sein. Eine unerklärte Lücke zwischen Brutto minus Steuer und dem Eingegangenen ist das klarste Zeichen für einen unzulässigen Abzug.

## Wozu sind die Year-to-Date-Zahlen da?

Sie verfolgen deine Lage, ohne bis Juli zu warten. Die meisten Payslips tragen kumulierte Jahreszahlen für Bruttolohn, einbehaltene Steuer und oft Super, laufend ab dem 1. Juli, und zeigen die Form deines Jahres, solange noch Zeit ist, sie zu korrigieren.

Sie sind außerdem eine Gegenprobe zum Income Statement, das dein Arbeitgeber beim ATO einreicht. Stimmen das Jahresbrutto auf deinem letzten Payslip und die Zahl im Income Statement nicht überein, ist eines von beiden falsch, und nur der Payslip sagt dir welches.

## Was, wenn dein Arbeitgeber gar keine Payslips ausstellt?

Das ist für sich ein Verstoß, und selten der einzige. Australische Arbeitgeber müssen innerhalb eines Werktags nach Zahlung des Lohns einen Payslip ausstellen, elektronisch oder auf Papier, ob der Angestellte danach fragt oder nicht.

Kein Payslip heißt keine Aufzeichnung von Stunden, Satz, Steuer oder Super, und genau dorthin will ein Arbeitgeber, der diesen Pflichten ausweicht. Führe ab diesem Punkt deine eigene datierte Aufzeichnung der gearbeiteten Stunden, sichere jeden Kontoeingang und behandle das Fehlen als Warnzeichen. Wie es weitergeht, behandelt unser Guide zu [einem Arbeitgeber, der nicht korrekt zahlt](/de/blog/employer-not-paying-correctly).
`,
  },

  'wage-theft-working-holiday-australia': {
    title: 'Lohnraub in Australien: was du tun kannst',
    description: 'Unterbezahlung, unbezahlte Überstunden und fehlende Super sind Lohnraub. Belege sammeln, den Arbeitgeber anschreiben und Fair Work einschalten hilft.',
    body: `
Unter deinem gesetzlichen Anspruch bezahlt zu werden ist rückholbar, und eine Meldung ist durch eigene Schutzregeln gedeckt. Die Untergrenze ab dem 1. Juli 2026 liegt bei 26,44 $ pro Stunde oder 33,05 $ für Casuals mit Loading, und die meisten Awards liegen darüber. Ob du eine Forderung hast, ist Rechnen und kein Gefühl.

## Was zählt als Unterbezahlung?

Alles, was dich unter den Satz bringt, den der Award oder das nationale Minimum für die tatsächlich gearbeiteten Stunden setzt. Das ist breiter als ein niedriger Stundensatz, und mehrere der häufigsten Formen sehen im Moment nach etwas anderem aus.

- Unter dem Minimum bezahlt, das ab 1. Juli 2026 bei 26,44 $ pro Stunde und 33,05 $ für Casuals liegt
- Wochenend-, Abend-, Überstunden- oder Feiertagsstunden zum Grundsatz bezahlt, ohne angewendeten Zuschlag
- 12 % [Super](/de/superannuation), die deinen Fonds nie erreichen
- Abzüge für Unterkunft oder Transport, die deinen effektiven Satz unter das Minimum drücken
- Unbezahlte Probeschichten, die weit über eine kurze Demonstration von Fähigkeiten hinauslaufen
- Auf eine ABN gesetzt zu werden, um Super und Award-Sätze zu vermeiden, obwohl die Arbeit Anstellung ist
- Lohn, der bis zum Abschluss eines Einsatzes einbehalten wird, was nicht rechtmäßig ist
- Bargeld ohne Payslip und ohne Super

Ein Teil davon ist vorsätzlich und ein Teil echte Unfähigkeit in der Lohnbuchhaltung. Die Unterscheidung zählt dafür, wie das Gespräch läuft, und nicht dafür, was dir zusteht.

## Wie prüfst du deine eigene Bezahlung?

Teile das, was dir gezahlt wurde, durch die tatsächlich gearbeiteten Stunden, einschließlich unbezahlter Zeit vor und nach Schichten. Liegt das Ergebnis als Casual unter 33,05 $, bist du an der nationalen Untergrenze unterbezahlt, und ist dein Job von einem Award gedeckt, liegt die tatsächliche Untergrenze meist höher.

Prüfe danach das Muster statt der Summe. Wochenend- und Feiertagsstunden sollten ein Vielfaches des Normalsatzes zahlen; ein Payslip, auf dem jede Stunde einer Woche mit einem Sonntag gleich bezahlt wird, zeigt etwas Falsches, selbst wenn der Durchschnitt vertretbar aussieht. Die Multiplikatoren nach Tag und Award setzt unser Guide zu [Penalty Rates](/de/blog/penalty-rates-australia) auseinander, und der Guide zu den [Award-Einstufungen](/de/blog/award-classifications-working-holiday-australia) zeigt, wie du den richtigen Satz für die Arbeit findest, die du tatsächlich machst.

## Was solltest du dagegen tun?

Sprich es zuerst schriftlich an, denn die meisten Forderungen, die irgendwohin führen, beginnen mit einer Papierspur. Eine kurze Nachricht mit den Stunden, dem gezahlten Satz und dem Satz, den du für anwendbar hältst, gibt einem irrenden Arbeitgeber einen Weg, es zu reparieren, und einem vorsätzlichen etwas zu beantworten.

Scheitert das, bearbeitet der Fair Work Ombudsman Unterbezahlungsbeschwerden kostenlos, und ein 417- oder 462-Visum schwächt die Forderung nicht. Super geht woanders hin: Nicht gezahlte Super holt das ATO über den [Superannuation Guarantee Charge](/de/blog/what-is-superannuation-guarantee-charge) zurück und nicht Fair Work, ein Job mit beiden Problemen erzeugt also zwei getrennte Forderungen. Angestellt zu bleiben, während du es ansprichst, macht den Fall stärker, wo das sicher ist, weil das Schichtmuster weiter Belege aufbaut.

## Beeinträchtigt eine Meldung dein Visum?

Einen Arbeitgeber wegen Unterbezahlung zu melden bringt dein Working-Holiday-Visum nicht in Gefahr. Diese Angst hält unterbezahlte Backpacker still und stützt sich auf nichts im australischen Recht.

Die Schutzregeln sind bewusst gesetzt. In gutem Glauben erhobene arbeitsrechtliche Beschwerden lösen keine Visumsprüfung aus, ein Arbeitgeber hat keine Macht über deinen Visastatus, was er auch andeutet, und die Workplace-Justice-Visumsregelungen existieren gerade dafür, dass Inhaber temporärer Visa Ausbeutungsfälle verfolgen können, ohne dass ihre aufenthaltsrechtliche Lage gegen sie verwendet wird. Wer davon profitiert, dass du das Gegenteil glaubst, sind die Arbeitgeber, die es tun.

## Welche Aufzeichnungen tragen eine Forderung?

Alles, was Stunden an Geld bindet, aufbewahrt an einem Ort, den der Arbeitgeber dir nicht nehmen kann. Die Stärke einer Forderung ist fast vollständig eine Funktion der Belege, und die sammelt man am leichtesten, solange du noch da bist.

- Jeden Payslip, als Datei gesichert und nicht in einer Arbeits-App gelassen
- Den veröffentlichten Dienstplan und deine eigene Notiz der tatsächlich gearbeiteten Stunden
- Jeden Vertrag oder jedes Angebotsschreiben, wie informell auch immer
- Textnachrichten und E-Mails über Lohn, Schichten und Abzüge
- Fondsauszüge über das, was wann ankam
- Kontoauszüge über das, was tatsächlich eingegangen ist

Eine tägliche Notiz von Anfangs- und Endzeit dauert Sekunden und entscheidet am häufigsten einen Streit, denn ohne sie steht dein Wort gegen ein Lohnsystem. Sichere alles, sobald du es bekommst, und nicht erst am Ende.

## Kannst du nach der Abreise noch zurückholen?

Ja. Unterbezahlungsforderungen über den Fair Work Ombudsman und Meldungen nicht gezahlter Super an das ATO überleben beide deine Ausreise, und keine verlangt, dass du im Land bist.

Schwerer werden Belege und Erreichbarkeit. Dienstpläne und Payslips in einem System ohne deinen Zugang sind von einem anderen Kontinent aus schwer zu beschaffen, und ein geschlossenes australisches Bankkonto verkompliziert die Auszahlung. Beides ist in deinen letzten zwei Wochen hier billig zu regeln und danach teuer zu reparieren. Die Verjährung für Unterbezahlungsansprüche beträgt sechs Jahre, die Forderung läuft also auch aus Deutschland weiter.
`,
  },

  'backpacker-tax-history-australia': {
    title: 'Die Backpackersteuer: Geschichte und Stand',
    description: 'Seit 2017 gilt der Satz von 15 % ab dem ersten Dollar. Ein Urteil des High Court hat später für manche Fälle Ausnahmen eröffnet.',
    body: `
Die Backpackersteuer ist der pauschale Satz auf Einkommen aus den Subclasses 417 und 462: 15 % auf die ersten 45.000 $, ohne Freibetrag. So ist der Satz seit dem 1. Januar 2017. Was einzelne Fälle bis heute anders ausgehen lässt, ist das Urteil des High Court von 2021, und ob es dich betrifft, ist eine Einzelfallfrage.

## Wie hoch ist der Satz heute?

Er beträgt fünfzehn Prozent ab dem ersten Dollar bis 45.000 $ und darüber die Foreign-Resident-Skala. Beide Visumsklassen werden identisch behandelt, und fast jeder Working Holiday Maker verdient innerhalb der ersten Stufe.

Das Fehlen eines Freibetrags trennt dies von gewöhnlicher australischer Besteuerung. Ein Resident zahlt auf die ersten 18.200 $ nichts, ein Working Holiday Maker zahlt darauf 15 %. Dieser Unterschied ist rund 2.730 $ im Jahr wert, und deshalb ist das Urteil weiter unten nicht akademisch.

- 15 % auf Einkommen bis 45.000 $
- 30 % von 45.001 $ bis 135.000 $
- 37 % von 135.001 $ bis 190.000 $
- 45 % über 190.000 $

## Wie war die Lage vor 2017?

Vor 2017 entschied der Wohnsitz alles. Ein Working Holiday Maker, der als australischer Steuerresident veranlagt wurde, zahlte gewöhnliche Residentensätze mit dem Freibetrag von 18.200 $, als Nichtresident 32,5 % ab dem ersten Dollar. Zwei Leute mit identischer Arbeit konnten also sehr unterschiedliche Rechnungen bekommen, und die Grenze war schon damals eine Beurteilung und keine klare Linie.

Viele Backpacker wurden damals als Residenten veranlagt, und die Regierung betrachtete die niedrigen Steuerrechnungen als unbeabsichtigtes Ergebnis und nicht als Politik. Diese Sicht erzeugte den Vorschlag von 2016.

## Wie kam der Satz von 2017 zustande?

Als Kompromiss nach einem Streit. Der ursprüngliche Vorschlag der Regierung von 2016 war, alles Working-Holiday-Maker-Einkommen ab dem ersten Dollar mit 32,5 % zu besteuern, indem jeder Backpacker als Nichtresident behandelt wird. Die Reaktion aus Landwirtschaft und Tourismus kam sofort, denn besonders die Erntearbeit hängt an Leuten, für die dieser Satz die Rechnung des Kommens verändert hätte.

Die Einigung war der 15-%-Satz ab dem 1. Januar 2017. Dasselbe Paket hob den Satz für den Departing Australia Superannuation Payment bei Working Holiday Makern von 35 % auf 65 % an und beließ 35 % für andere temporäre Visainhaber wie Studenten. Das Zugeständnis beim Lohn wurde also auf der [Super](/de/blog/tax-on-super-withdrawal-backpacker)-Seite bezahlt, und das ist bis heute so.

## Was hat der High Court in Addy entschieden?

Dass der 15-%-Satz nicht in jedem Fall das letzte Wort ist. In Addy v Commissioner of Taxation [2021] HCA 34 ging es um eine Working Holiday Makerin, die als australische Steuerresidentin veranlagt worden war, und der High Court gab ihr am Ende recht. Die Folge für dich: Seitdem können einzelne Fälle anders ausgehen, als die Satztabelle vermuten lässt, und zwar für das ganze Jahr.

Der Fall lief über Jahre und nicht durchgehend in eine Richtung: Die Steuerpflichtige obsiegte 2019 in erster Instanz, verlor vor dem Full Federal Court und gewann 2021 vor dem High Court. Die Gesetzgebung wurde danach nicht geändert, die Lage wird also Fall für Fall angewendet statt über eine Änderung des Satzes.

## Wem hilft Addy tatsächlich?

Einer Minderheit, und wer dazugehört, lässt sich nicht an einer Liste ablesen. Die erste Hürde ist der steuerliche Wohnsitz, und die meisten Working Holiday Maker nehmen sie nicht. Der Wohnsitz ist eine Beurteilung der eigenen Umstände, die bei fast identischen Jahren verschieden ausgehen kann. Dazu kommt eine zweite Bedingung, die von Person zu Person verschieden ausfällt.

Wer von dem Fall liest und eine Erstattung erwartet, überspringt meist genau diese Prüfung. Ob dein Jahr trägt, ist eine Beurteilung deiner eigenen Umstände und nichts, was die Satztabelle oder ein Forum beantworten kann.

## Was ändert das alles an deiner Erklärung?

Für die meisten nichts. Für sie gilt der 15-%-Satz, und die Erstattung kommt aus dem Überabzug und der Medicare-Levy-Befreiung, nicht aus Addy.

Wo es etwas ändert, ändert es viel, und zwar für das ganze Jahr. Deshalb gehört die Frage geprüft, bevor eine [Steuererklärung](/de/tax-return) abgegeben wird, denn später zu ändern ist schwerer, als es einmal richtig zu machen. Ob dein Fall trägt, entscheidet sich an der [Wohnsitzprüfung](/de/blog/tax-residency-working-holiday-makers), und wir legen uns dort erst fest, nachdem wir dein Jahr durchgegangen sind. Alte Bescheide lassen sich innerhalb der normalen Berichtigungsfrist noch korrigieren.
`,
  },

  'abn-deductions-business-expenses': {
    title: 'Welche Geschäftsausgaben du mit ABN absetzt',
    description: 'Mit Einkommen unter einer ABN kannst du Geschäftsausgaben absetzen und dein zu versteuerndes Einkommen senken. Was zählt und was nicht.',
    body: `
Ein ABN-Inhaber zieht echte Betriebsausgaben vom Einkommen ab, bevor die Steuer berechnet wird. Das gleicht aus, dass unterwegs nichts einbehalten wurde. Werkzeug, Schutzausrüstung, laufende Fahrzeugkosten, der Arbeitsanteil von Telefon und Internet, Lizenzen und Steuerberatergebühren zählen dazu. Die Nachweisregeln sind strenger als bei Angestellten, und dort scheitern Ansprüche.

## Was ist der tatsächliche Test für eine Werbungskostenposition?

Die Ausgabe muss zur Erzielung deines ABN-Einkommens angefallen sein, und du musst das zeigen können. Am zweiten Teil scheitern die meisten Positionen, nicht am ersten.

Das ATO streicht Ausgaben nicht, weil sie unvernünftig wirken, sondern weil die Aufzeichnung der Kosten fehlt, der Arbeitszusammenhang nicht belegt ist oder die Aufteilung zwischen beruflicher und privater Nutzung keine verteidigungsfähige Grundlage hat. Eine Ausgabe, die sich nicht belegen lässt, ist keine Werbungskostenposition.

## Was kann ein Working Holiday Maker mit ABN geltend machen?

Welche Kategorien zählen, hängt von der Art des Contractings ab. Ein Lieferfahrer und ein Farm-Contractor mit eigener Ausrüstung haben auf dieser Liste außer dem Telefon fast nichts gemeinsam.

- Werkzeug und Ausrüstung, die die Arbeit verlangt, etwa eine Kettensäge für Baumarbeit
- Schutzkleidung und Sicherheitsausrüstung: Warnwesten, Stahlkappenstiefel, Handschuhe, Helme
- Laufende Fahrzeugkosten für Arbeitsfahrten, also Sprit, Anmeldung, Versicherung und Wartung, anteilig auf die Arbeitskilometer
- Der berufliche Anteil von Handy- und Internetkosten
- Lizenzen und Karten, die die Arbeit verlangt, etwa White Card oder RSA
- Bank- und Händlergebühren auf einem Geschäftskonto, einschließlich Plattformprovisionen
- Gebühren für die Verwaltung deiner Steuerangelegenheiten

Alles, was beruflich und privat genutzt wird, ist nur zum beruflichen Anteil absetzbar. Ein zu 60 % beruflich genutztes Telefon ist zu 60 % absetzbar, und die 60 % müssen belegbar sein.

## Welche Aufzeichnungen verlangt das ATO tatsächlich?

Für jede Position eine Quittung oder Tax Invoice mit Lieferant, Datum, Betrag und dem gekauften Gegenstand. Anteilige Positionen brauchen zusätzlich eine Grundlage für den Prozentsatz: bei Fahrzeugen ein Fahrtenbuch, bei Telefon und Internet einen repräsentativen Nutzungszeitraum.

Zwei Schwellen ändern, was nötig ist. Ein Gegenstand von 300 $ oder weniger ist im Kaufjahr voll absetzbar statt abzuschreiben. Ab dem 1. Juli 2026 gibt es einen pauschalen berufsbezogenen Abzug von 1.000 $ ohne Belege, der bei leichterem Contracting mehr bringen kann als Posten für Posten. Wann sich welcher Weg lohnt, behandelt unser Guide zum [1.000-$-Sofortabzug](/de/blog/1000-dollar-instant-deduction-rule-2026).

## Was lässt sich nicht absetzen, so sehr es sich auch danach anfühlt?

Mehrere Dinge sehen absetzbar aus und sind es nicht. Zusammen machen sie den Großteil der gestrichenen Positionen dieser Kategorie aus. Jedes ist eine private Ausgabe, die rund um die Arbeit anfällt, und keine Ausgabe für die Arbeit.

- Fahrten zwischen zu Hause und einer regulären Arbeitsstätte, wie früh der Start auch ist
- Kleidung, die gewöhnlich ist statt schützend oder eine gekennzeichnete Uniform
- Essen und Trinken während des Arbeitstages, für Contractor genauso privat wie für Angestellte
- Unterkunft an deinem eigenen Standort, auch wenn du von dort arbeitest
- Kosten, die vor der ABN-Registrierung und vor Beginn der Tätigkeit angefallen sind

An den Fahrzeugregeln hängt das meiste Geld. Was ein Fahrtenbuch enthalten muss, behandelt unser Guide zu [Fahrtenbüchern auf einer ABN](/de/blog/vehicle-logbook-abn-working-holiday).

## Warum zählen Werbungskosten auf einer ABN mehr als beim Lohn?

Weil nichts einbehalten wurde. Beim Lohn hat der Arbeitgeber die Steuer bereits herausgenommen, eine Position erhöht also eine Erstattung. Beim ABN-Einkommen hat dich die volle Rechnungssumme erreicht und die Steuer ist weiterhin geschuldet, eine Position senkt also einen Zahlbetrag.

Das ändert den Einsatz, nicht die Rechnung. Wer Lohn bezieht und Positionen übersieht, bekommt eine kleinere Erstattung. Ein Contractor bekommt eine größere Rechnung, und wenn im Jahr nichts zurückgelegt wurde, steht kein Geld dahinter.

## Warum werden so viele Positionen nie geltend gemacht?

Weil die Aufzeichnungen nie geführt wurden, nicht weil die Ausgaben nicht angefallen sind. Wer Farm-Contracting mit eigener Ausrüstung oder Lieferarbeit mit eigenem Fahrzeug macht, hat laufend echte absetzbare Kosten und hebt fast keinen Beleg auf.

Dazu kommt eine Wissenslücke zwischen den beiden Regelwerken. Wer vor der ABN als Angestellter gearbeitet hat, überträgt die Angestelltenregeln, die an manchen Stellen enger und an anderen weiter sind. Besonders Fahrzeug und Ausrüstung werden nicht gleich behandelt.

## Welche Positionen halten bei dir stand?

Welche Positionen verfügbar sind und ob sie standhalten, hängt davon ab, wie die Arbeit aufgebaut war und was du aufgehoben hast:

- Welche Art Contracting es war: die Kategorien unterscheiden sich stark zwischen Lieferarbeit, Farmarbeit und Gewerken.
- Ob du Belege laufend aufgehoben hast, denn das macht eine Position verteidigungsfähig.
- Ob für eine Fahrzeugposition ein Fahrtenbuch existiert, denn das ist der am häufigsten gestrichene Posten.
- Ob einzelne Gegenstände mehr oder weniger als 300 $ gekostet haben, denn davon hängt ab, ob du sofort abziehst oder abschreibst.
- Ob die Pauschale von 1.000 $ ab dem 1. Juli 2026 übersteigt, was du einzeln belegen könntest.
- Ob du im selben Jahr Lohn hattest, denn dessen Einbehalt saugt die ABN-Steuer oft auf.
- Ob du für GST registriert warst, denn das ändert, ob Beträge inklusive oder exklusive GST geltend gemacht werden.

Die Gesamtlage wird in der [Working-Holiday-Steuererklärung](/de/tax-return) ermittelt, und vorab kannst du deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  'uber-doordash-rideshare-abn-working-holiday': {
    title: 'Uber und DoorDash: ABN, Steuer und Abzüge',
    description: 'Rideshare und Essenslieferung werden in Australien als Contracting behandelt. Du brauchst eine ABN, und keine Steuer wird einbehalten.',
    body: `
Plattformarbeit ist Contracting und keine Anstellung. Du brauchst eine ABN, von dem was die Plattform zahlt wird nichts einbehalten, und es wird keine Superannuation darauf gezahlt. Die Regel, die Leute erwischt, ist GST: Rideshare verlangt die Registrierung ab dem ersten Dollar ohne Schwelle, Essenslieferung folgt der gewöhnlichen Schwelle von 75.000 $.

## Warum gilt Plattformarbeit als Contracting?

Weil die Plattform dich für erledigte Aufträge bezahlt und deine Stunden nicht so steuert, wie ein Arbeitgeber es tut. Uber, DoorDash, Menulog und die übrigen binden Fahrer als unabhängige Contractor ein, eine echte Einstufung und nicht die verkleidete Anstellung, die man in Cafés und auf Farmen sieht.

Daraus folgt der Rest. Du brauchst eine ABN, bevor du aufgenommen wirst, du legst deine eigene Steuer zurück, du bekommst einen Jahresauszug der Plattform statt eines Income Statements, und du kannst die Kosten der Arbeit absetzen. Keine Superannuation, kein Award-Satz und keine Unfallversicherung sind die andere Hälfte des Tauschs.

## Was ist die GST-Regel, die fast alle erwischt?

Gewöhnliche ABN-Arbeit verlangt eine GST-Registrierung erst, wenn der Umsatz in einem Steuerjahr 75.000 $ überschreitet. Rideshare folgt dieser Regel nicht. Personenbeförderungsdienste wie Uber, Ola und Didi verlangen die GST-Registrierung ab der ersten Fahrt, ganz gleich wie wenig du verdienst.

Essenslieferung ist etwas anderes. Uber Eats, DoorDash und Menulog liegen unter der Standardschwelle von 75.000 $, ein Fahrer mit reiner Lieferarbeit hat also meist keine GST-Pflicht. Die Unterscheidung folgt der Arbeit und nicht der App: Kommen Personenfahrten zu einer Lieferwoche dazu, ist die Registrierungspflicht für Rideshare ausgelöst.

Die Registrierung bringt eine Pflicht zum Business Activity Statement mit sich, meist quartalsweise, und bleibt bestehen, bis du sie beendest. Wer sich registriert und die Statements dann ignoriert, kann rückwirkend für den GST-Anteil jeder gefahrenen Fahrt haften, nach Monaten Vollzeitfahrens ein erheblicher Betrag.

## Was kannst du gegen Plattformeinkommen absetzen?

Absetzbar ist alles, was wirklich für die Arbeit angefallen ist, und beim Fahren ist das eine lange Liste, weil das Fahrzeug das Geschäft ist. Ohne Belege bleibt davon nichts übrig.

- Sprit, Wartung, Anmeldung, Versicherung und Abschreibung, anteilig auf die Arbeitskilometer
- Zinsen auf einen Fahrzeugkredit, zur selben Aufteilung
- Handy und Datenvolumen für die App
- Maut und Parkgebühren während der Arbeit
- Fahrzeugreinigung
- Lieferausrüstung: Tasche, Helm, Fahrradwartung und Reparaturen bei Kurieren
- Plattformprovisionen und Servicegebühren, die echte Kosten der Einkommenserzielung sind

Fahrzeugkosten lassen sich auf Cent-pro-Kilometer-Basis geltend machen oder über tatsächliche Kosten, gestützt auf ein Fahrtenbuch. Die Fahrtenbuchmethode bringt bei ernsthaften Fahrstunden meist mehr und scheitert zugleich am häufigsten an fehlenden Aufzeichnungen. Was ein Fahrtenbuch enthalten muss, setzt unser Guide zu [Fahrtenbüchern](/de/blog/vehicle-logbook-abn-working-holiday) auseinander.

## Weiß das ATO schon, was du verdient hast?

Ja. Plattformen melden die Jahreseinnahmen unter dem Sharing Economy Reporting Regime direkt an das ATO, die Einkommenszahl existiert also in den ATO-Systemen, bevor du irgendetwas einreichst.

Das macht das Untererfassen von Plattformeinkommen zur wirkungslosesten Auslassung. Und es macht Multi-Apping einfacher, als es aussieht: Jede Plattform meldet getrennt, und eine Erklärung mit drei Plattformen wird gegen drei Meldungen abgeglichen.

## Wie funktioniert Multi-Apping steuerlich?

Als ein Geschäft und nicht als drei. Uber Eats, DoorDash und Menulog gleichzeitig zu fahren ist gängige Praxis und ein einziges Sole-Trader-Unternehmen: eine ABN, Einkommen über die Plattformen summiert, Ausgaben zusammengefasst, ein Satz Geschäftsposten in der Erklärung.

Ausgaben brauchen keine Zuordnung zwischen Apps, weil Rad oder Auto dem Unternehmen dienen. Eine Tabelle mit Datum, Plattform, Bruttoeinnahmen und Kilometern trägt den Rest und ist der Unterschied zwischen einer unkomplizierten Erklärung und einer Rekonstruktion aus Kontoauszügen ein Jahr später.

## Warum geht das bei Working Holiday Makern so oft schief?

Weil nichts einbehalten wird und dich nichts erinnert. Wer im Jahr 25.000 $ über Lieferarbeit verdient, hat zu keinem Zeitpunkt Steuer abgeführt bekommen, und der Working-Holiday-Satz von 15 % darauf ist trotzdem geschuldet, zahlbar in einem Betrag bei der Abgabe.

Wer im selben Jahr auch gewöhnlichen Lohn hatte, steht meist besser da, weil die davon einbehaltene PAYG-Steuer die Steuer auf das Plattformeinkommen häufig auffängt. Wer nur Plattformarbeit gemacht und nichts zurückgelegt hat, ist derjenige, der eine Rechnung bekommt.

## Wie setzt sich dein Plattformjahr zusammen?

Plattformarbeit ist unkompliziert, sobald die Registrierungen stimmen. Was du schuldest und was du zurückbekommst, hängt davon ab, wie sich das Jahr tatsächlich zusammensetzte.

- Ob du Passagiere gefahren oder Essen geliefert hast, denn das entscheidet die GST-Frage vollständig.
- Ob du auch Lohn hattest, denn dessen Einbehalt deckt oft die Plattformsteuer.
- Ob ein Fahrtenbuch existiert, denn davon hängt ab, wie viel der Fahrzeugkosten geltend zu machen ist.
- Wie viel du unterwegs zurückgelegt hast, da nichts einbehalten wurde.
- Ob du für GST registriert warst und die dazugehörigen Activity Statements eingereicht hast.
- Ob ABN und eine etwaige GST-Registrierung beendet wurden, als du aufgehört hast.

Die Gesamtlage wird in der [Working-Holiday-Steuererklärung](/de/tax-return) ermittelt, und ob dein Jahr eine Erstattung oder einen Zahlbetrag hergibt, siehst du grob im [Erstattungsrechner](/de/calculator).
`,
  },

  'second-third-year-visa-tax-implications': {
    title: 'Zweites oder drittes Visum: Steuerfolgen',
    description: 'Am Steuersatz ändert ein zweites oder drittes Visum nichts. Deine TFN bleibt bestehen, aber Super, Wohnsitzfrage und DASP-Zeitpunkt verschieben sich.',
    body: `
Der Satz ändert sich nicht. Ein Zweit- oder Drittjahresvisum 417 oder 462 wird weiterhin zu Working-Holiday-Maker-Sätzen besteuert, 15 % auf die ersten 45.000 $. Ändern kann sich deine Wohnsitzlage, denn je länger ein Aufenthalt wird, desto weniger selbstverständlich ist die Antwort vom Vorjahr, und dort bewegt sich das Geld.

## Warum bleibt der Satz gleich, wenn sich alles andere geändert hat?

Weil der Working-Holiday-Maker-Satz an der Visa-Subclass hängt und nicht an der Dauer. Ein drittes Jahr auf einem 417 wird identisch besteuert wie die erste Woche des ersten, und über 45.000 $ bis 135.000 $ gelten in jedem Visumsjahr 30 %. Die volle Struktur steht in unserem Guide zum [Backpacker-Steuersatz](/de/blog/backpacker-tax-rate-australia).

Diesen Teil haben die meisten richtig. Falsch liegen sie bei der Annahme, der Rest der Erklärung sei eine Kopie des Vorjahres.

## Wo verschiebt sich der Wohnsitz wirklich?

Der steuerliche Wohnsitz ist keine Visumsfrage. Er hängt an deinen persönlichen Umständen und muss ordentlich geprüft werden, und ein zweites oder drittes Jahr ist selten eine Kopie des ersten. Was letztes Jahr eine schnelle Antwort war, ist dieses Jahr womöglich keine mehr.

Eine Kleinigkeit ist sie nicht. Seit dem Urteil des High Court in Addy v Commissioner of Taxation kann die Wohnsitzlage in einzelnen Fällen ändern, nach welchen Sätzen ein ganzes Jahr veranlagt wird: Zwei Backpacker mit fast identischen Jahren können verschieden veranlagt werden.

Automatisch ist nichts davon, und keine einzelne Tatsache entscheidet es. Warum die Frage so schwer zu greifen ist, steht in unserem Guide zum [steuerlichen Wohnsitz für Working Holiday Maker](/de/blog/tax-residency-working-holiday-makers).

## Brauchst du eine neue TFN?

Nein. Eine TFN wird einmal ausgestellt und ist dauerhaft; sie folgt dir über Visa, Jahre und eine Abreise und Rückkehr hinweg. Ein neuer Antrag erzeugt einen Doppeldatensatz statt einer zweiten Nummer, und Doppel verursachen genau die Identitätsabweichung, die Erstattungen verzögert.

Findest du die alte nicht, ist die Wiederbeschaffung der richtige Vorgang und nicht ein Neuantrag. Das behandelt unser Guide zu [ob du auf einem zweiten Visum eine neue TFN brauchst](/de/blog/do-you-need-new-tfn-second-visa).

## Was passiert mit der Super über Visumsjahre hinweg?

Er bleibt, wo er ist, und das Timing des DASP-Antrags wird zur Entscheidung. Super kann erst beansprucht werden, wenn dein Visum beendet ist und du ausgereist bist: Ein liegen gelassenes Erstjahresguthaben sammelt sich neben den Beiträgen des zweiten Jahres und wird am Ende zusammen beansprucht.

Eine Variante ist unumkehrbar. Hast du nach dem ersten Visum DASP beantragt und bist auf einem zweiten zurückgekommen, ist dieses Geld mit 65 % Einbehalt weg und die Beiträge starten neu. Rückgängig machen kann das niemand, und für jemanden, der zurückkommen wollte, ist es die teuerste vermeidbare Entscheidung hier.

Mehrere Visumsjahre bedeuten außerdem meist mehrere Fonds, weil jeder neue Arbeitgeber dich in seinen eigenen setzt, wenn du keinen benennst. Die Zusammenlegung behandelt unser Guide zu [Super in mehreren Fonds](/de/blog/super-multiple-funds-consolidation).

## Was machen die 88 und 179 Tage mit deinen Steuerunterlagen?

Sie sind Einwanderungsanforderungen und keine steuerlichen, erzeugen aber Steuerunterlagen, und mit denen wird dein nächster Visumsantrag belegt. Achtundachtzig Tage specified work in einer regionalen Gegend qualifizieren für ein Zweitjahresvisum, weitere 179 Tage während des zweiten Jahres für ein drittes.

Der Papierkram hat damit einen doppelten Zweck. Jeder regionale Arbeitgeber braucht deine TFN, meldet dein Einkommen über Single Touch Payroll ans ATO und stellt Payslips aus, die als Nachweis der gearbeiteten Tage dienen. Regionale Arbeitgeber sind zugleich am ehesten nicht als Working-Holiday-Maker-Arbeitgeber registriert oder beschäftigen über ABNs, und dort konzentrieren sich die Einbehaltsfehler.

## Was schleppt ein Mehrjahres-Backpacker am Ende mit?

Mehr Erklärungen, als er erwartet. Weil das Steuerjahr vom 1. Juli bis 30. Juni läuft, erzeugt ein Aufenthalt über zwei oder drei Jahre meist drei oder vier getrennte Erklärungen statt einer pro Visum, jede mit eigenem Einkommen, eigener Wohnsitzfrage und eigener Erstattung.

Wer mit sauberer Akte abreist, kassiert die letzte Erstattung und den DASP ohne viel Reibung. Wer ein nicht eingereichtes Jahr von vorletztem Sommer, vier Superkonten und eine ATO-Adresse mitschleppt, die ein Hostel in Cairns ist, verbringt Monate damit von der anderen Seite der Welt.

## Hat sich dein Lebensmuster verändert?

Der Satz steht über Visumsjahre hinweg fest. Fast alles andere an einer Erklärung für das zweite oder dritte Jahr entscheiden Fakten, die nur dich betreffen.

- Ob die Wohnsitzfrage in deinem Jahr noch so einfach ist wie im ersten.
- Ob sich daraus für die Veranlagung etwas ergibt, was von Fall zu Fall verschieden ausgeht und geprüft gehört.
- Ob ein früheres Steuerjahr nicht eingereicht blieb, was weiterhin zu holen ist.
- Ob du zwischen Visa DASP beantragt hast, was sich nicht umkehren lässt.
- Wie viele Superfonds inzwischen Beiträge auf deinen Namen halten.
- Ob eine Phase auf einer ABN lief, denn dieses Einkommen wird ohne Einbehalt veranlagt.
- Ob das ATO eine aktuelle Adresse und ein offenes australisches Bankkonto für dich hat.

Jedes Jahr wird in der [Steuererklärung als Working Holiday Maker](/de/tax-return) getrennt ermittelt, und du kannst deine [Steuererstattung schätzen](/de/calculator), für jedes davon.
`,
  },

  'dasp-tax-rate-65-percent-explained': {
    title: 'DASP-Steuer: warum die 65 % fällig werden',
    description: 'Für Working Holiday Maker wird der steuerpflichtige Teil des DASP mit 65 % besteuert. Aus 10.000 Dollar Guthaben bleiben so rund 3.500 Dollar übrig.',
    body: `
Fünfundsechzig Prozent, auf die steuerpflichtige Komponente. Ein Guthaben von 10.000 $ zahlt rund 3.500 $ aus. Der Satz wurde 2017 durch Bundesgesetz eigens für Super festgelegt, der während eines 417- oder 462-Visums eingezahlt wurde, und er lässt sich nicht senken, gegenrechnen oder umgehen. Andere temporäre Visuminhaber zahlen 35 %.

## Worauf gelten die 65 % tatsächlich?

Auf die steuerpflichtige Komponente des Guthabens, und die ist bei einem Working Holiday Maker im Kern alles. Dein Konto besteht aus Arbeitgeberbeiträgen nach der [Superannuation Guarantee](/de/blog/what-is-superannuation-guarantee-charge), derzeit 12 % deines Lohns, plus den Anlageerträgen daraus. Beides ist steuerpflichtige Komponente.

Eine nicht steuerpflichtige Komponente stammt aus persönlichen Nachsteuerbeiträgen, die fast kein Working Holiday Maker leistet. Gehört deins zu den seltenen Konten mit einer, wird dieser Teil von den 65 % nicht getroffen. Alles andere schon.

## Warum ist der Satz so viel höher als bei anderen Visa?

Ein bewusster Tausch im Working-Holiday-Maker-Reformpaket von 2017. Dieses Gesetz setzte den Einkommensteuersatz auf 15 % ab dem ersten Dollar, unter den sonst geltenden Foreign-Resident-Sätzen, und hob gleichzeitig den DASP-Satz von 35 % auf 65 % für Super aus diesen Visa.

Der Satz ändert sich nicht mit Aufenthaltsdauer, Guthabenhöhe, Fonds oder Verdienst. Der Fonds wendet ihn bei der Auszahlung an, bevor das Geld freigegeben wird, es kommt also nichts an, das du danach noch zurücklegen müsstest.

## Wie sieht das bei echten Guthaben aus?

Super läuft mit 12 % deines Lohns auf, das Guthaben folgt also dem Verdienst. Die Zahlen unten unterstellen, dass das ganze Konto steuerpflichtige Komponente ist, was bei einem Working Holiday Maker fast immer zutrifft.

- 20.000 $ Lohn: rund 2.400 $ Super, rund 840 $ nach dem Einbehalt
- 40.000 $ Lohn: rund 4.800 $ Super, rund 1.680 $ danach
- 60.000 $ Lohn: rund 7.200 $ Super, rund 2.520 $ danach
- Ein Guthaben von 10.000 $: rund 3.500 $ danach

Fondsgebühren und Anlagerenditen verschieben diese Zahlen in beide Richtungen etwas. Ein Jahr Gastronomie in Sydney plus eine Erntesaison im Riverland ist eine typische Zweikonten-Variante der mittleren Zeile.

## Lohnt sich der Antrag bei diesem Satz überhaupt?

Ja. Die Alternative heißt nicht, das Geld zu behalten, sondern den Zugriff darauf zu verlieren. Nicht beanspruchte Konten werden irgendwann als lost gemeldet und ans ATO übertragen, wo das Guthaben ohne Anlageerträge liegt und weiterhin denselben 65 % unterliegt.

Die Wahl ist also nicht 65 % jetzt gegen 0 % später. Sie lautet 35 % deines Guthabens auf deinem Konto gegen ein Guthaben, das du Jahre danach aus einem anderen Land mit einem womöglich erneuerten Pass zurückholen musst. Die meisten, die nie beantragen, haben sich nicht dagegen entschieden. Sie sind einfach gegangen.

## Kann irgendjemand es zu einem niedrigeren Satz herausholen?

Nein. Der Satz steht im Gesetz, er wird vom Fonds bei der Freigabe angewendet, und er ist identisch, wer auch immer den Antrag stellt. Es gibt keinen Abzug, keinen Offset, keine Gestaltung und keinen Beraterkanal, der daran etwas ändert.

Angebote in sozialen Medien und Messenger-Apps, einen Superantrag zu einem besseren Satz abzuwickeln, sind entweder ein Missverständnis des Gesetzes oder schlicht Betrug. Eingesammelt werden ein Pass, eine TFN und genug Identität, um Konten zu eröffnen. Ein Antrag bündelt Pass, TFN und Bankdaten an einer Stelle, und genau das macht ihn zu einem attraktiven Ziel. Die [Betrugsmuster rund um die TFN](/de/blog/tfn-security-protect-from-fraud) lohnen die Lektüre, bevor du irgendjemandem etwas schickst.

## Wann solltest du den Antrag stellen?

Sobald Visum beendet und Ausreise erfasst sind, und nicht später. Der Satz ändert sich durch Warten nicht, aber alles andere wird schwerer: Der Fonds führt eine Adresse, die veraltet, ein Bankkonto, das geschlossen wird, und einen Pass, der irgendwann erneuert wird und dann nicht mehr zum Datensatz passt.

Praktisch heißt das: in den ersten Monaten nach der Abreise, solange alle Angaben noch die sind, die der Fonds gespeichert hat. Wer drei Jahre wartet, beantragt dasselbe Geld zum selben Satz, aber gegen einen Datensatz, der nicht mehr zu ihm passt.

## Wie viel deines Guthabens trifft der Satz?

Der Satz von 65 % steht im Gesetz und nichts ändert ihn. Unterschiedlich ist, wie viel von deinem Guthaben er erreicht und wie viel davon das Warten übersteht.

- Ob ein Teil des Guthabens nicht steuerpflichtige Komponente ist, was selten vorkommt und das Einzige ist, was die 65 % nicht erreichen.
- Ob ein Teil deiner Beiträge auf einem anderen Visum eingezahlt wurde. Super aus einem Studenten- oder Fachkräftevisum wird mit 35 % besteuert und nicht mit 65 %, und eine gemischte Historie wird entsprechend beurteilt. Bei konsolidierten Konten lohnt vor dem Antrag eine Aufschlüsselung vom Fonds.
- Wie viele Fonds du hast, denn Gebühren nagen die ganze Zeit an jedem kleinen Guthaben einzeln.
- Ob deine Super bereits als unclaimed ans ATO übertragen wurde, was den Weg ändert, aber nicht den Satz.
- Ob dir außerdem eine Steuererstattung für dein letztes Jahr zusteht, was getrenntes Geld ist, getrennt besteuert wird und häufig größer ausfällt.

Berechtigung, Timing und Unterlagen stehen dort, wo du deine [Superannuation nach der Abreise auszahlen lässt](/de/superannuation), und du kannst deine [Steuererstattung schätzen](/de/calculator), für die Einkommensseite getrennt.

`,
  },

  'super-multiple-funds-consolidation': {
    title: 'Super in mehreren Fonds: zusammenführen',
    description: 'Mehrere Fonds bedeuten mehrere DASP-Anträge, oder vorher eine Zusammenführung. Was schneller ist, was sich an Gebühren ändert und was mit der Versicherung passiert.',
    body: `
Vier Arbeitgeber bedeuten meist vier [Super](/de/superannuation)-Konten, weil jeder dich in seinen eigenen Fonds setzt, sofern du nichts anderes sagst. Ob du sie zusammenführen oder jedes einzeln beantragen solltest, hängt an einer Sache: wie lange du noch bleibst. Die Zusammenführung lohnt sich, solange du in Australien bist, und wird umständlich, sobald du weg bist.

## Warum landet eine Person bei vier Superkonten?

Weil die Standardwahl beim Arbeitgeber liegt und fast niemand am ersten Tag selbst wählt. Wer keinen Fonds nennt, wird in den Fonds gesetzt, den dieser Betrieb nutzt, der nächste Arbeitgeber macht dasselbe mit einem anderen, und die Konten häufen sich ohne eine einzige Entscheidung an.

Super Stapling, 2021 eingeführt, sollte genau das lösen, indem es dich an deinen ersten Fonds bindet und dir zwischen Jobs folgt. Für Working Holiday Maker funktioniert es schlechter als für Australier: Die Stapling-Abfrage findet bei einem gerade Angekommenen oft nichts, und bis ein Eintrag existiert, hat der erste Arbeitgeber bereits in einen anderen Standardfonds gezahlt.

## Was kostet es tatsächlich, mehrere Konten zu halten?

Mehr, als die Guthaben rechtfertigen, und der Schaden ist anteilig und nicht absolut. Jeder Fonds berechnet seine eigene feste Verwaltungsgebühr, ganz gleich wie wenig auf dem Konto liegt, und mehrere ziehen zusätzlich automatisch Prämien für eine voreingestellte Versicherung ab. Vier kleine Guthaben zahlen vier Sätze derselben Gebühren.

Bei einem großen Guthaben sind diese Gebühren unerheblich, bei ein paar tausend Dollar auf vier Konten nicht. Am meisten wehtut das Konto aus einem Dreiwochenjob im ersten Monat, das danach ein Jahr unberührt liegt und still eine Versicherung bezahlt, die du nie in Anspruch nehmen wirst.

- Eine feste Verwaltungsgebühr je Fonds, unabhängig vom Guthaben
- Eine prozentuale Gebühr auf das Guthaben selbst
- Prämien für die voreingestellte Versicherung, abgezogen sofern nicht gekündigt
- Keine ausgleichenden Beiträge mehr, sobald du für diesen Arbeitgeber aufhörst

## Wann ist Zusammenführen der richtige Schritt?

Wenn du noch in Australien bist und noch arbeitest. Einen Fonds wählen, dessen Daten jedem aktuellen und künftigen Arbeitgeber auf einem Standard-Choice-Formular geben und die anderen Guthaben hineinrollen beendet die doppelten Gebühren und die doppelten Versicherungen und lässt ein Konto übrig, um das du dich bei der Abreise kümmerst.

Reist du in Wochen ab, ist es meist der falsche Schritt. Ein Rollover braucht Zeit, und ein DASP-Antrag gegen ein Konto, während eine Übertragung läuft, ist der klassische Weg, ein Fragment in einem Fonds zurückzulassen, den du für geschlossen hieltest. Dann ist es auf dem Papier langsamer und praktisch schneller, jeden Fonds einzeln zu beantragen. Bleibst du und willst aktiv wählen, setzt unser Guide zur [Wahl eines Superfonds](/de/blog/how-to-choose-super-fund) auseinander, was für einen Working Holiday Maker zählt und nicht für eine Karriere.

## Kannst du nach der Ausreise aus Australien noch zusammenführen?

Technisch ja, praktisch selten. Die meisten Fonds prüfen Rollovers über Identitätsverfahren, die auf australische Zugangsdaten und eine australische Mobilnummer gebaut sind, und beides verliert ein abreisender Backpacker meist zuerst.

Der realistische Weg aus dem Ausland ist ein eigener [DASP-Antrag](/de/superannuation) bei jedem Fonds. Das ist mehr Papierkram und erzeugt mehrere Zahlungen statt einer, aber jeder Antrag ist unabhängig und keiner hängt davon ab, dass ein Rollover zuerst durchläuft. Eine australische Telefonnummer noch ein paar Monate nach der Abreise am Leben zu halten hält dir die anderen Optionen offen.

## Was, wenn du nicht weißt, wie viele Konten du hast?

Geh davon aus, dass es mehr sind, als du erinnerst. Die ATO-Aufzeichnung ist die einzige vollständige Liste, und jeder Fonds, der je einen Beitrag unter deiner TFN erhalten hat, taucht dort auf, einschließlich Konten aus kurzen Jobs, an die du nie wieder gedacht hast.

Guthaben, die lange genug unbeantragt bleiben, werden als unclaimed super an das ATO übertragen, was kein Verlust ist, aber ändert, wo du suchen musst. Was diese Übertragung bedeutet und wie das Geld von dort zurückgeholt wird, behandelt unser Guide zum [Auffinden verlorener Superannuation](/de/blog/how-to-find-lost-superannuation).

## Wem solltest du deine Daten nicht geben?

Niemandem, der von sich aus auf dich zukommt und anbietet, deine Super zu finden oder zusammenzuführen. Das ist eine etablierte Masche, die genau auf dieses Publikum zielt, und sie funktioniert, weil das Angebot wie ein Gefallen klingt: Sie brauchen deine TFN, einen Passscan und oft dein Fonds-Login, und diese drei Dinge reichen, um ein Guthaben auf ein Konto zu verschieben, das sie kontrollieren.

Wer in Australien für Steuer- oder Superdienstleistungen Geld nimmt, muss im öffentlichen staatlichen Register der Steuerpraktiker stehen, und jemanden nachzuschlagen dauert eine Minute. Kein rechtmäßiges Verfahren verlangt jemals das Passwort zu einem Superfonds, und danach gefragt zu werden beendet das Gespräch.
`,
  },

  'dasp-rejected-what-to-do': {
    title: 'DASP abgelehnt? Die Gründe und die Lösung',
    description: 'Ein abgelehnter DASP-Antrag ist kein verlorenes Geld. Fast immer steckt ein noch nicht aktualisierter Visumsdatensatz, eine Namensabweichung oder ein Fonds ohne dein Guthaben dahinter.',
    body: `
Ein abgelehnter DASP ist kein verlorenes Geld. Das Guthaben bleibt im Fonds und der Antrag kann erneut gestellt werden, sobald die Ursache behoben ist. Fünf Dinge erklären fast jede Ablehnung, und vier davon sind Verwaltung statt Substanz.

## Was sind die fünf Gründe?

Eine Ablehnungsmitteilung ist meist unhilfreich vage, lässt sich aber in der Regel ohne Rückfrage entschlüsseln. Vier der fünf Gründe sind Verwaltung statt Substanz: Das Geld steht nicht infrage, nur der Papierkram.

**Dein Visum ist noch nicht als beendet erfasst.** Ein Antrag wenige Tage nach Ablauf oder Stornierung läuft gegen einen Datensatz des Department of Home Affairs, der das Visum noch als aktiv führt. Die häufigste Ablehnung und rein ein Zeitproblem.

**Deine Ausreise ist noch nicht erfasst.** Der Bewegungsdatensatz folgt Fluggesellschaftsdaten und aktualisiert sich typischerweise binnen 7 bis 14 Tagen nach dem Abflug. Aus der Abflughalle heraus zu beantragen funktioniert nicht.

**Deine Identität passt nicht zum Datensatz des Fonds.** Dein Pass sagt das eine, und das Superkonto, das ein Arbeitgeber in Eile eingerichtet hat, sagt etwas leicht anderes. Umlaute und zweite Vornamen sind hier die deutschen Klassiker.

**Der Fonds hält gar nichts von deinem Geld.** Du hast bei dem Fonds beantragt, an den du dich erinnerst, statt bei dem, an den deine Beiträge gingen.

**Deine beglaubigten Dokumente wurden nicht akzeptiert.** Der von dir genutzte Beglaubiger ist keiner, den dieser Fonds anerkennt, und das ist aus dem Ausland ein deutlich größeres Problem.

## Wie erkennst du, welchen du hast?

Die Mitteilung sagt oft nur, dass abgelehnt wurde. Die Diagnose kommt aus vier Datensätzen: deinem Visastatus, deinem Bewegungsdatensatz, der Liste der tatsächlich mit deiner TFN verknüpften Fonds und den Identitätsanforderungen des Fonds.

Diese Fondsliste wird am meisten unterschätzt. Wer in einem Jahr vier Arbeitgeber hatte, hat üblicherweise drei oder vier Superkonten, mehrere bei Fonds, von denen er nie gehört hat, weil der Arbeitgeber sie gewählt hat.

## Was tust du bei einem Datensatz, der noch nicht aktualisiert ist?

Warten und neu einreichen, etwas anderes gibt es nicht. Visumsende wird am Tag nach Ablauf erfasst. Bewegungsdaten aktualisieren sich typischerweise binnen vierzehn Tagen nach Ausreise. Ein Antrag gegen einen Datensatz, der noch nicht nachgezogen hat, scheitert erneut.

Sind seit der Ausreise mehr als 30 Tage vergangen und der Bewegungsdatensatz zeigt sie noch nicht, ist das kein Zeitproblem mehr und muss direkt mit Home Affairs geklärt werden. Es kommt vor, meist bei Codeshare-Flügen oder Umbuchungen.

## Was tust du bei einer Namensabweichung?

Der Datensatz des Fonds muss korrigiert werden, bevor der Antrag durchgeht, und korrigieren muss ihn der Fonds. Dein Fehler ist es nicht: Arbeitgeber tippen den Namen im Tempo ab, und weggelassene zweite Vornamen, vertauschte Vor- und Nachnamen sowie gestrichene Umlaute sind Routine.

Zwei Varianten. Hast du deinen Pass seit der Arbeit in Australien erneuert, werden meist beide Dokumente gebraucht, weil das Konto gegen die alte Nummer eröffnet wurde. Warst du zweimal in Australien, kannst du bei demselben Fonds zwei Mitgliedsnummern haben.

## Was tust du, wenn der Fonds nichts hält?

Finde den Fonds, der etwas hält. Jeder Fonds, der je einen mit deiner TFN verknüpften Beitrag erhalten hat, ist zentral erfasst. Das Geld ist nicht verschwunden, und die Frage nach dem Fonds ist eine Abfrage und keine Suche. Wie die Datensätze funktionieren, steht in [verlorene Superannuation finden](/de/blog/how-to-find-lost-superannuation).

Liegt deine Ausreise mehr als sechs Monate zurück, kann der Fonds den Kontakt verloren und das Guthaben bereits als unclaimed super ans ATO übertragen haben. Das ist ein anderer Antragsweg, in der Regel schneller, weil die Prüfstufe beim Fonds entfällt.

## Was solltest du vor dem zweiten Antrag bereitlegen?

Dieselben Unterlagen wie beim ersten, diesmal gegen die Daten des Fonds geprüft statt gegen deine Erinnerung: der Pass in der Schreibweise, in der das Konto angelegt wurde, die Mitgliedsnummer von einem alten Payslip oder Fondsschreiben, der Nachweis über Visumsende und Ausreise, und die Beglaubigungsform, die dieser Fonds akzeptiert.

Hast du einen Pass erneuert, leg beide bereit. Warst du zweimal in Australien, frag den Fonds, ob zwei Mitgliedsnummern auf deinen Namen existieren: Ein Antrag gegen die falsche scheitert genauso wie einer gegen den falschen Fonds.

## Welche der fünf Ursachen trifft dich?

Welche der fünf Ursachen bei dir vorliegt, entscheidet, ob das eine Woche Warten ist oder eine Korrektur, die beim Fonds beantragt werden muss.

- Wie lange dein Visum beendet ist und wie lange du tatsächlich weg bist. Beides muss erfasst sein, bevor irgendetwas gelingen kann.
- Ob du deinen Pass seit der Arbeit in Australien erneuert hast.
- Wie viele Arbeitgeber du hattest, was zugleich sagt, wie viele Fonds du wahrscheinlich hast und wie viele getrennte Anträge das sind.
- Ob du aus dem Ausland beantragst, was die Beglaubigung zum bindenden Engpass macht statt zur Nebensache.
- Ob das Guthaben bereits ans ATO gewandert ist, was den Weg vollständig ändert.
- Ob deine Steuererklärung für das letzte Jahr noch offen ist, was getrenntes Geld auf einem getrennten Zeitplan ist.

Erst diagnostizieren, dann beheben, dann neu einreichen. Ein blinder Zweitantrag mit denselben Daten erzeugt dieselbe Ablehnung. Berechtigung und Unterlagen stehen dort, wo du deine [Superannuation nach der Abreise auszahlen lässt](/de/superannuation), und wenn auch eine Erklärung für das letzte Jahr offen ist, kannst du deine [Steuererstattung schätzen](/de/calculator).

`,
  },

  'super-employer-not-paying-what-to-do': {
    title: 'Arbeitgeber zahlt keine Super? Was tun',
    description: 'Super muss mindestens vierteljährlich mit 12 % eingezahlt werden. Was gilt, wenn sie fehlt, wie die Meldung beim ATO läuft und welche Fristen realistisch sind.',
    body: `
Nicht gezahlte [Super](/de/superannuation) ist rückholbar, und zurück holt sie das ATO und nicht du. Arbeitgeber müssen mindestens quartalsweise 12 % der Ordinary Time Earnings in deinen Fonds zahlen, und ein verpasstes Quartal erzeugt eine Schuld, die das ATO mit Befugnissen verfolgen kann, die kein einzelner Arbeitnehmer hat. Die Frage ist, ob du es findest, bevor du gehst.

## Wie erkennst du, ob Super tatsächlich gezahlt wurde?

Indem du auf den Fonds siehst und nicht auf den Payslip. Eine Superzeile auf dem Payslip heißt, dass der Betrag gegen deine Bezahlung aufgelaufen ist, nicht dass etwas überwiesen wurde, und diese Lücke ist die häufigste Form nicht gezahlter Super in Australien.

Der einzige Beleg für die Zahlung ist der Fondsauszug oder die Beitragsaufzeichnung des ATO. Ist ein Quartal abgeschlossen, seine Frist eine oder zwei Wochen verstrichen und der Fonds zeigt für diesen Zeitraum weiterhin nichts, ist die Super nicht gezahlt und nicht bloß verspätet. Davor ist ein leeres Quartal normal, denn Super läuft quartalsweise und nicht mit jeder Lohnzahlung.

## Wozu ist der Arbeitgeber tatsächlich verpflichtet?

Nach dem Superannuation Guarantee (Administration) Act zu 12 % deiner Ordinary Time Earnings bis zu vier festen Terminen im Jahr in deinen genannten Fonds, für jeden Angestellten einschließlich Casuals. Es gibt keine Verdienstschwelle, unter der das aufhört zu gelten, und ein 417- oder 462-Visum ändert an der Pflicht nichts.

Eine verpasste Frist erzeugt nicht schlicht eine verspätete Zahlung, sondern eine Haftung für den [Superannuation Guarantee Charge](/de/blog/what-is-superannuation-guarantee-charge): Fehlbetrag plus Zinsen plus Verwaltungsanteil, gegen die Steuer des Arbeitgebers nicht absetzbar. Genau das macht es lohnenswert, ihn zu melden statt ihn hinzunehmen.

- 1. Juli bis 30. September, fällig bis 28. Oktober
- 1. Oktober bis 31. Dezember, fällig bis 28. Januar
- 1. Januar bis 31. März, fällig bis 28. April
- 1. April bis 30. Juni, fällig bis 28. Juli

## Was entscheidet, wie du sie zurückbekommst?

Ob der Arbeitgeber noch tätig ist und ob das Versäumnis vorsätzlich wirkt. Ein kleiner Betrieb, der ein Quartal aus Unordnung verpasst hat, repariert es oft nach einer schriftlichen Anfrage, und das ist mit Abstand der schnellste Weg.

Bleibt die Anfrage unbeantwortet, ist der Weg über das ATO der mit Zähnen. Es hält bereits beide Hälften des Vergleichs: die Löhne, die dein Arbeitgeber über Single Touch Payroll gemeldet hat, und die Beiträge, die dein Fonds als erhalten gemeldet hat. Kommen weitere Verstöße dazu wie unterbezahlter Lohn oder fehlende Payslips, bearbeitet der Fair Work Ombudsman diese Seite, und die beiden Forderungen können nebeneinander laufen.

## Was, wenn der Arbeitgeber geschlossen hat?

Die Forderung überlebt, und das überrascht viele. Geht ein Betrieb in Liquidation, wird das ATO für die Superabgabe zu seinem Gläubiger, und Beiträge lassen sich über dieses Verfahren zurückholen, statt mit der Firma abgeschrieben zu werden.

Was sich ändert, ist der Zeitrahmen: Monate statt Wochen, manchmal deutlich länger. Die Fair Entitlements Guarantee, das bundesweite Sicherheitsnetz für manche unbezahlten Löhne und Ansprüche beim Zusammenbruch eines Arbeitgebers, deckt Superannuation nicht ab. Diese Lücke ist ein Grund, nicht gezahlte Super anzusprechen, solange der Arbeitgeber noch tätig ist.

## Warum zählt das mehr, wenn du abreist?

Weil der DASP nur auszahlt, was tatsächlich im Fonds liegt. Super, die der Arbeitgeber nie überwiesen hat, liegt nicht im Fonds, ist also nicht in der Zahlung, und das Geld folgt dir nicht automatisch nach Hause.

Daraus entsteht eine echte Terminentscheidung. Den [DASP-Antrag](/de/superannuation) zu verschieben, bis das ATO die Beiträge zurückgeholt hat, bringt alles in eine Zahlung, kann aber langes Warten aus dem Ausland bedeuten. Jetzt für das zu beantragen, was im Fonds liegt, bringt dieses Geld in Bewegung, bedeutet aber eine zweite Zahlung später und mehr Verwaltung. Was besser ist, hängt an der Größe der Lücke und daran, wie lange du ein australisches Bankkonto offen halten kannst.

## Wie vermeidest du die Masche, die darauf zielt?

Indem du gegenüber jedem skeptisch bist, der dich wegen Super kontaktiert, statt umgekehrt. Nicht gezahlte und verlorene Super sind beide bekannte Köder: Das Angebot, ihr nachzugehen, sammelt TFN, Passscan und Fonds-Zugangsdaten ein, und das reicht, um ein Guthaben woanders hinzurollen.

Die Prüfung ist einfach und lohnt sich jedes Mal. Wer in Australien bezahlte Steuerdienstleistungen erbringt, muss im öffentlichen staatlichen Register der Steuerpraktiker stehen, und ein seriöser Anbieter hat nichts dagegen, nachgeschlagen zu werden, bevor du etwas verschickst. Kein rechtmäßiges Verfahren verlangt jemals, dass du ein Passwort für einen Superfonds herausgibst.
`,
  },

  'workplace-injury-working-holiday-rights': {
    title: 'Arbeitsunfall im Job: welche Rechte du hast',
    description: 'Auch mit Working Holiday Visum deckt dich die Workers Compensation deines Bundesstaates. Melde den Unfall sofort und lass ihn ärztlich festhalten.',
    body: `
Ja. Ein Working Holiday Maker, der während bezahlter Arbeit verletzt wird, kann über das System seines Bundesstaats oder Territoriums Workers Compensation beantragen. Sie deckt medizinische Behandlung, Rehabilitation und einen Anteil des entgangenen Lohns. Der Anspruch hängt nicht von deinem Visum ab, nicht davon wie lange du im Job bist, und nicht davon ob der Arbeitgeber die Versicherung tatsächlich hat.

## Was deckt das System tatsächlich ab?

Jede Verletzung oder Krankheit, die aus bezahlter Anstellung oder in deren Verlauf entsteht. Das ist breiter, als die meisten annehmen, und umfasst mehreres, das nicht nach einem Unfall aussieht.

- Akute Verletzungen wie Schnitte, Brüche, Verstauchungen und Verbrennungen
- Belastungsschäden durch wiederholte Arbeitsvorgänge
- Psychische Erkrankungen, die durch Arbeit verursacht oder verschlimmert wurden
- Krankheiten, die wegen der Arbeit erworben wurden, einschließlich Hauterkrankungen durch Chemikalienkontakt
- Verletzungen auf arbeitsbezogenen Fahrten und in manchen Bundesstaaten auf dem Weg zur und von der Arbeit

Es ist ein System ohne Verschuldensfrage, und das wird am häufigsten übersehen. Die Verletzung muss niemandes Schuld sein und nicht die des Arbeitgebers. Ist sie wegen der Arbeit passiert, steht der Anspruch.

## Worauf laufen die Leistungen hinaus?

Auf direkt bezahlte medizinische Behandlung der Verletzung und wöchentliche Zahlungen, solange du nicht arbeiten kannst. Dazu Fahrten zu und von Terminen, Unterstützung bei der Rückkehr an den Arbeitsplatz und eine Einmalzahlung, wo die Verletzung eine dauerhafte Beeinträchtigung hinterlässt.

Wöchentliche Zahlungen liegen typischerweise bei 80 % bis 95 % deines normalen Wochenlohns, in manchen Bundesstaaten mit der Zeit sinkend, und laufen weiter, solange die Verletzung deine Arbeitsfähigkeit beeinträchtigt, vorbehaltlich der Höchstdauern des Bundesstaats. Das System ist bundesstaatlich: Die Details unterscheiden sich zwischen New South Wales, Victoria, Queensland und den übrigen, und maßgeblich ist der Bundesstaat, in dem du arbeitest, nicht der Sitz des Arbeitgebers.

## Wie greift das damit ineinander, dass du kein Medicare hast?

Für die Verletzung selbst ersetzt es die Frage vollständig. Workers Compensation ist der primäre Kostenträger für die Behandlung einer Arbeitsverletzung, und dir sollte dafür nichts in Rechnung gestellt werden. Für die Mehrheit ohne Medicare-Anspruch zählt das enorm.

Ein gebrochenes Handgelenk nach einem Sturz bei der Arbeit ist auch ohne Medicare-Anspruch und ohne laufende Reiseversicherung gedeckt. Wo die Anspruchsfrage tatsächlich sitzt, behandelt unser Guide zu [Medicare für Working Holiday Maker](/de/blog/what-is-medicare-working-holiday-makers).

## Was muss passieren, damit ein Anspruch läuft?

Vier Dinge, in dieser Reihenfolge, und die ersten beiden zögern Leute hinaus. Melde die Verletzung dem Arbeitgeber, sobald sie passiert, möglichst schriftlich. Geh zu einem Arzt und hol dir ein Workers-Compensation-Attest, ein spezielles Attest und keine gewöhnliche Krankschreibung.

Der Anspruch wird danach beim Versicherer des Arbeitgebers eingereicht, und der Arbeitgeber muss ihn innerhalb einer kurzen gesetzlichen Frist weiterleiten, üblicherweise fünf Werktage. Für jeden weiteren Zeitraum ohne Arbeitsfähigkeit braucht es Folgeatteste. Ein Arbeitgeber darf die Einreichung nicht rechtmäßig verweigern; die Verweigerung ist selbst ein Verstoß und bei der Aufsichtsbehörde des Bundesstaats meldbar.

## Was, wenn du deswegen bedroht wirst?

Die Drohungen sind nicht echt, und sie kommen häufig genug vor, um benannt zu werden. Working Holiday Maker berichten, ihnen sei gesagt worden, ein Anspruch bringe ihnen die Kündigung, die Abschiebung oder die Aufhebung des Visums ein.

Eine Kündigung wegen eines Workers-Compensation-Anspruchs ist in jedem Bundesstaat unzulässig. Eine Visumsaufhebung wird durch einen solchen Anspruch nicht ausgelöst. Und ein Arbeitgeber hat keinerlei Macht über deinen Visastatus, was er auch andeutet. Wirst du unter Druck gesetzt, stehen die Aufsichtsbehörde des Bundesstaats und der Fair Work Ombudsman zur Verfügung.

## Was, wenn du unter einer ABN gearbeitet hast?

Dann ist die Deckung nicht automatisch. Ein echter Contractor ist in der Regel nicht von der Workers-Compensation-Versicherung des Auftraggebers gedeckt und soll sich selbst versichern.

Sehr viele Leute auf ABNs in Gastronomie und Farmarbeit sind aber falsch eingestufte Angestellte, und eine Neueinstufung stellt die Deckung zusammen mit Award-Sätzen und Superannuation wieder her. Anzeichen sind feste Stunden, Aufsicht, vom Arbeitgeber gestellte Ausrüstung und ein einziger Auftraggeber. Wie das entschieden wird, setzt unser Guide zum [Test Angestellter gegen Contractor](/de/blog/employee-vs-contractor-australia) auseinander; kläre es, bevor du annimmst, es gebe keinen Anspruch.

## Was macht eine Verletzung mit deinem Steuerjahr?

Sie senkt meist dein Einkommen, was die Rechnung bei der Veranlagung zu deinen Gunsten verändert. Ein Jahr mit mehreren unbezahlten oder teilbezahlten Wochen ist ein Jahr, in dem der auf Vollzeitlohn berechnete Einbehalt zu hoch war, und das zeigt sich als größere Erstattung.

Die Entschädigungszahlungen werden je nach Art unterschiedlich behandelt: wöchentlicher Lohnersatz in der Regel steuerpflichtig, Einmalzahlungen für dauerhafte Beeinträchtigung in der Regel nicht. Diese Einordnung richtig zu treffen zählt, und hier verkompliziert eine Verletzung die Erklärung wirklich, statt sie zu vereinfachen.

## Wie lange läuft die Zahlung bei dir?

Der Anspruch ist nicht die Variable. Was du bekommst und wie unkompliziert es wird, hängt an den Tatsachen, und diese Punkte entscheiden, was zahlbar ist, wie lange, und wie die Zahlungen steuerlich behandelt werden.

- In welchem Bundesstaat du gearbeitet hast, denn jeder hat eigene Sätze und Grenzen.
- Ob du Angestellter oder unter einer ABN beschäftigt warst und ob diese Einstufung korrekt war.
- Ob die Verletzung zügig und schriftlich gemeldet wurde.
- Ob du ein Workers-Compensation-Attest statt eines gewöhnlichen erhalten hast.
- Wie lange du nicht arbeiten konntest, denn davon hängen die wöchentlichen Zahlungen und ihre Absenkungen ab.
- Ob die Zahlungen Lohnersatz oder Einmalzahlungen für Beeinträchtigung waren, steuerlich unterschiedlich behandelt.

Ein durch Verletzung unterbrochenes Jahr wird in der [Working-Holiday-Steuererklärung](/de/tax-return) abgerechnet, und du kannst aus dem tatsächlich Verdienten deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  'unfair-dismissal-working-holiday-australia': {
    title: 'Unfair Dismissal: kannst du dagegen klagen?',
    description: 'Working Holiday Maker können Unfair-Dismissal-Klagen über die Fair Work Commission einreichen, aber die Berechtigung hängt von der Anstellungsdauer ab.',
    body: `
Ein Unfair-Dismissal-Antrag geht innerhalb von 21 Tagen nach Wirksamwerden der Kündigung an die Fair Work Commission, und diese Frist ist nahezu absolut. Der Visastatus spielt für die Berechtigung keine Rolle. Ob du überhaupt beantragen kannst, entscheiden deine Dienstzeit und die Zahl der Beschäftigten des Betriebs.

## Wer ist tatsächlich antragsberechtigt?

Wer die Mindestbeschäftigungszeit erfüllt hat: sechs Monate bei einem Betrieb mit 15 oder mehr Angestellten, zwölf Monate bei einem kleinen Betrieb mit weniger als 15. Diese Schwelle schließt einen großen Teil der Working Holiday Maker aus, bevor die Kündigung selbst geprüft wird.

Casual-Angestellte sind nicht ausgeschlossen. Eine Casual-Kraft, die auf regelmäßiger und systematischer Basis beschäftigt war und vernünftigerweise mit fortgesetzter Arbeit rechnen konnte, kann beantragen. Der Test sieht auf das tatsächliche Schichtmuster und nicht auf das Wort casual im Vertrag. Wer acht Monate lang vier Abende pro Woche eingeplant war, steht deutlich besser da, als der Papierkram nahelegt.

- 15 oder mehr Angestellte: sechs Monate Mindestdienstzeit
- Weniger als 15 Angestellte: zwölf Monate Mindestdienstzeit
- Casual mit regelmäßigem, systematischem Muster: zählt für die Zeit mit
- Der Verdienst muss unter der High-Income-Schwelle liegen, was auf fast jeden Working Holiday Maker zutrifft

## Was macht eine Kündigung unfair?

Wenn sie hart, ungerecht oder unangemessen war, und das erfasst den Grund wie das Verfahren. Ein gültiger Grund, schlecht gehandhabt, kann trotzdem unfair sein: Wegen etwas gekündigt zu werden, das du getan hast, ist nicht automatisch fair, wenn man es dir nie gesagt und dir nie Gelegenheit zur Stellungnahme gegeben hat.

Die Muster wiederholen sich. Kündigung wegen Leistungsproblemen, die nie angesprochen wurden. Kündigung kurz nach einer Sicherheitsbeschwerde oder einem Workers-Compensation-Anspruch. Eine Redundanz, die sich als Ersetzung herausstellt. Und bei kleinen Betrieben eine Kündigung, die dem Small Business Fair Dismissal Code nicht folgt, der ein kürzeres, aber echtes Verfahren vorschreibt.

## Was, wenn du weniger als sechs Monate dort warst?

Dann kannst du keinen gewöhnlichen Unfair-Dismissal-Antrag stellen, aber der Alternativweg ist oft der stärkere. Ein General-Protections-Antrag erfasst die Kündigung aus einem verbotenen Grund, und dafür gilt überhaupt keine Mindestbeschäftigungszeit.

Verbotene Gründe sind breiter, als die meisten erwarten: die Ausübung eines Arbeitsrechts, eine Beschwerde oder Nachfrage zu deiner Anstellung, vorübergehende Abwesenheit durch Krankheit oder Verletzung oder ein geschütztes Merkmal wie Herkunft, Geschlecht, Alter oder Schwangerschaft. In der Woche gekündigt zu werden, nachdem du gefragt hast, warum deine Super nicht gezahlt wurde, ist ein General-Protections-Fall und kein Unfair-Dismissal-Fall. Das Antidiskriminierungsrecht bietet einen parallelen Weg, ebenfalls ohne Dienstzeitvoraussetzung.

## Wie hart ist die 21-Tage-Frist?

Hart. Ein Antrag muss die Fair Work Commission innerhalb von 21 Kalendertagen nach Wirksamwerden der Kündigung erreichen, nicht Werktagen, und Verlängerungen gibt es nur unter wirklich außergewöhnlichen Umständen. Die Frist nicht gekannt zu haben ist nicht außergewöhnlich.

Für einen Working Holiday Maker ist das ein besonderes Problem, denn eine Kündigung passiert oft in den letzten Wochen des Aufenthalts, wenn der Flug schon gebucht ist. Der Antrag lässt sich nach Einreichung aus dem Ausland weiterverfolgen, muss aber rechtzeitig raus. Priorität ist also, vor dem Abflug einzureichen und nicht vorher etwas zu klären. General-Protections-Anträge mit Kündigung laufen auf dieselbe 21-Tage-Grenze.

## Was kannst du tatsächlich bekommen?

In den meisten Fällen eine Entschädigung, gedeckelt bei 26 Wochenlöhnen und bei der Hälfte der High-Income-Schwelle. Die Wiedereinstellung ist im Gesetz das primäre Rechtsmittel, aber selten das, was ein Working Holiday Maker will, und nahe dem Ende eines Visums selten praktikabel.

Die meisten Sachen einigen sich in der Schlichtung statt in einer Anhörung, einer von der Commission geführten Telefonkonferenz recht früh im Verfahren. Das ändert, welche Vorbereitung nützlich ist: eine klare Darstellung des Geschehens, Daten und etwaige Dokumente sind hier wertvoller als juristische Argumentation.

## Was steht dir unabhängig vom Antrag zu?

Alles, was bis zu deinem letzten Tag aufgelaufen war, unabhängig davon, ob die Kündigung fair war. Es ist auch der Teil, der am häufigsten liegen bleibt, weil sich alle auf die Kündigung konzentrieren und das Geld vergessen.

- Aller Lohn für gearbeitete Stunden bis zum letzten Tag
- Angesammelter Jahresurlaub, bei Festangestellten
- Zahlung an Stelle der Kündigungsfrist, wo eine Frist erforderlich war und nicht gewährt wurde
- Jede [nicht gezahlte Super](/de/blog/super-employer-not-paying-what-to-do), die über das ATO und nicht über Fair Work verfolgt wird

Diese Ansprüche sind rückholbar, ob du einen Kündigungsanspruch hast oder nicht und ob du noch im Land bist oder nicht. Wie die Lohnseite verfolgt wird, behandelt unser Guide zu [einem Arbeitgeber, der nicht korrekt zahlt](/de/blog/employer-not-paying-correctly).
`,
  },

  'bullying-harassment-workplace-working-holiday': {
    title: 'Mobbing am Arbeitsplatz: deine Optionen',
    description: 'Mobbing und sexuelle Belästigung sind in Australien verboten, unabhängig vom Visum. Du kannst dich an die Fair Work Commission wenden.',
    body: `
Mobbing, Diskriminierung und sexuelle Belästigung am Arbeitsplatz sind in Australien rechtswidrig, und ein Working Holiday Maker hat dieselben Schutzrechte wie eine australische Arbeitskraft. Visastatus, Dienstzeit und Branche ändern daran nichts. Deine Optionen ändern sich aber je nachdem, um welches der drei es geht, denn sie laufen über verschiedene Verfahren.

## Was zählt tatsächlich als Mobbing?

Als Mobbing zählt wiederholtes unangemessenes Verhalten gegenüber einer Arbeitskraft, das ein Risiko für Gesundheit und Sicherheit schafft. Nach dem Fair Work Act müssen alle drei Teile vorliegen. Ein einzelner Vorfall ist nach dieser Definition kein Mobbing, kann aber Belästigung, Übergriff oder Diskriminierung sein.

Unangemessen heißt Verhalten, das eine vernünftige Person als schikanierend, erniedrigend, bedrohlich oder einschüchternd sähe. Das erfasst Anschreien und verbale Beschimpfung, Erniedrigung vor Kollegen oder Gästen, gezielte Isolation, ungerechtfertigte Kritik, auf Scheitern angelegte Arbeitslast und über dich verbreitete Gerüchte. Nicht erfasst ist angemessen ausgeführtes Managementhandeln: echtes Leistungsfeedback, Änderungen an deinen Aufgaben und rechtmäßige Anweisungen sind kein Mobbing, auch wenn sie unwillkommen sind. An dieser Unterscheidung entscheiden sich die meisten Beschwerden.

## Wie wird sexuelle Belästigung anders behandelt?

Sie muss nicht wiederholt sein. Sexuelle Belästigung ist jedes unerwünschte Verhalten sexueller Natur, bei dem eine vernünftige Person damit rechnen würde, dass es dich beleidigt, erniedrigt oder einschüchtert, und ein Vorfall genügt für eine Beschwerde.

Es gibt außerdem keine Mindestdienstzeit. Wer in seiner zweiten Woche belästigt wird, hat dieselbe Stellung wie jemand im zweiten Jahr. Das erfasste Verhalten ist breit: unerwünschte Berührung, sexuelle Kommentare und Witze, gesendete oder gezeigte Bilder, wiederholte unerwünschte Verabredungsanfragen, Bemerkungen über deinen Körper und Verfolgen oder Stalking. Bei Übergriff oder Stalking ist es zugleich eine Strafsache, und eine Anzeige bei der Polizei läuft neben der arbeitsrechtlichen Beschwerde, nicht an ihrer Stelle.

## Was lässt sich tatsächlich dagegen tun?

Vier Wege, und sie führen zu unterschiedlichen Ergebnissen. Welcher richtig ist, hängt davon ab, ob das Verhalten andauert, ob du gekündigt wurdest und wie lange du noch im Land bist.

- **Eine Anti-Mobbing-Anordnung** der Fair Work Commission, die laufendes Verhalten stoppen soll, nicht vergangenes entschädigen. Sie setzt voraus, dass du dort noch beschäftigt bist.
- **Ein General-Protections-Antrag**, wenn du wegen einer Beschwerde gekündigt oder schlecht behandelt wurdest. Es gilt keine Mindestdienstzeit.
- **Eine Diskriminierungsbeschwerde** nach Bundes- oder Landesrecht, die zu Entschädigung und Änderungsanordnungen führen kann.
- **Ein Anspruch wegen sexueller Belästigung** nach dem Sex Discrimination Act, ebenfalls ohne Mindestdienstzeit.

Entscheidend ist die Zeit. Anti-Mobbing-Anordnungen helfen nur, solange du noch dort bist, den Job zu verlassen schließt diese Tür also und öffnet die anderen. Nahe am Ende deines Visums lohnt es sich, die Zeitfrage vor dem Abflug zu klären.

## Kann ein Arbeitgeber dein Visum bedrohen?

Nein. Diese Drohung hält Working Holiday Maker mehr als jede andere still. Ein Arbeitgeber hat keine Macht über dein Visum: darüber entscheidet das Department of Home Affairs, eine arbeitsrechtliche Beschwerde löst keine Visumsprüfung aus, und eine zu erheben ist nach dem Fair Work Act selbst geschütztes Verhalten.

Vergeltung für eine Beschwerde ist ein eigener Verstoß mit eigenen Rechtsmitteln, ein Arbeitgeber, der dir droht, stärkt deine Position also meist. Passiert es, sichere die Belege. Textnachrichten und E-Mails sind am nützlichsten, weil sie datiert und eindeutig sind.

## Was solltest du aufschreiben, und wann?

Alles, sofort, in der Form, die sich am leichtesten aufbewahren lässt. Daten, Uhrzeiten, was gesagt oder getan wurde, wo es passierte und wer sonst da war. Eine am selben Abend gemachte Notiz wiegt weit mehr als eine Rekonstruktion drei Monate später, und sie entscheidet am häufigsten, ob eine Beschwerde irgendwohin führt.

Zwei praktische Punkte. Bewahre die Aufzeichnung außerhalb der Systeme des Arbeitgebers auf, denn der Zugang zu Arbeits-E-Mail oder Dienstplan-App verschwindet, sobald du gehst. Und sei vorsichtig mit Aufnahmen: Das Recht, ein Gespräch ohne Zustimmung aufzuzeichnen, unterscheidet sich zwischen den Bundesstaaten, eine in Queensland zulässige Aufnahme ist in Victoria womöglich nicht zulässig. Schriftliche Notizen tragen dieses Risiko nicht.

## Kommt schlechte Behandlung meist mit anderen Verstößen?

Häufig. Ein Arbeitsplatz, der ein Regelwerk bricht, bricht oft auch andere, und die, die dich Geld kosten, sind leiser als die, die dich unglücklich machen.

Prüfe drei Dinge: ob du für die tatsächlich gearbeiteten Stunden den Award-Satz bekommen hast, ob 12 % [Super](/de/superannuation) für jedes abgeschlossene Quartal deinen Fonds erreicht haben und ob Payslips ausgestellt wurden. Das sind getrennte Forderungen mit getrennten Verfahren, und sie überleben es, dass du den Job verlässt. Wie jede verfolgt wird, behandeln unsere Guides zu [einem Arbeitgeber, der nicht korrekt zahlt](/de/blog/employer-not-paying-correctly) und zu [nicht gezahlter Super](/de/blog/super-employer-not-paying-what-to-do).
`,
  },

  'unpaid-trial-shifts-australia-legal': {
    title: 'Unbezahlte Probeschicht: ist das legal?',
    description: 'Unbezahlte Probeschichten sind in Australien meistens illegal. Wann sie erlaubt sind, wann nicht, und wie du deinen Lohn einforderst.',
    body: `
Meistens nein. Nach dem Fair Work Act muss jeder, der produktive Arbeit leistet, von der ein Betrieb profitiert, mindestens den Award- oder Mindestsatz bekommen, wie die Schicht auch genannt wird. Eine echte unbezahlte Probe ist eine kurze beaufsichtigte Demonstration einer Fähigkeit. Eine Schicht, in der du Gäste bedient hast, ist Arbeit und schuldet Lohn.

## Was trennt eine rechtmäßige Probe von einer unbezahlten Schicht?

Vier Dinge, und sie müssen zusammen vorliegen und nicht einzeln. Eine rechtmäßige Probe ist kurz, meist unter einer Stunde. Sie ist unmittelbar beaufsichtigt. Sie existiert, um eine Fähigkeit zu prüfen, die sich im Gespräch nicht prüfen lässt. Und sie erzeugt nichts, was der Betrieb verkauft.

Dreißig Minuten Messerarbeit unter dem Auge eines Kochs oder ein kurzes Rollenspiel einer Gästeinteraktion: Das kann rechtmäßig sein. Ein voller Tag Pflücken auf einer Farm oder ein Abend hinter der Bar mit echten Gästen: Das ist Arbeit, und meist entscheidet schon die Dauer.

Die Formulierung des Arbeitgebers ist nicht der Test. Komm Samstag rein und wir schauen, wie es läuft, beschreibt eine unbezahlte Schicht, wie immer sie genannt wird.

## Warum sind Working Holiday Maker das übliche Ziel?

Weil die Konstruktion darauf beruht, dass die Arbeitskraft die Regel nicht kennt und nicht lange genug bleibt, um ihr nachzugehen. Gastronomie und Einzelhandel sind die Konzentrationspunkte, und es wird als Branchennorm dargestellt statt als Bitte, meist gegenüber jemandem, der neu im Land ist und den Job will.

Der Fair Work Ombudsman hat klargestellt, dass unbezahlte Proben jenseits einer kurzen Fähigkeitsdemonstration rechtswidrig sind, und ist deswegen gegen Arbeitgeber in Gastronomie, Einzelhandel und Farmarbeit vorgegangen. Folgen sind die Nachzahlung von allem Geschuldeten und getrennte Strafen je Verstoß.

## Was ist eine unbezahlte Probe tatsächlich wert?

Mehr, als die Leute annehmen, denn eine Probeschicht liegt meist auf einem vollen Tag, und volle Tage tragen Zuschläge. Die Rechnung beginnt beim Award-Satz für die Einstufung und nicht beim nationalen Minimum, dann kommt das 25-%-Casual-Loading dazu und danach jeder Wochenend-, Abend- oder Feiertagszuschlag.

Ein ganzer Samstag in einem Gastronomiebetrieb ergibt sauber gerechnet eine spürbare Summe und keinen Symbolbetrag, und das vor jedem Feiertagsmultiplikator. Wie sich die Zuschläge kombinieren, setzt unser Guide zu [Penalty Rates in Australien](/de/blog/penalty-rates-australia) auseinander. Als Bezugspunkt liegt das nationale Minimum ab dem 1. Juli 2026 bei 26,44 $ pro Stunde oder 33,05 $ casual, und die meisten Awards liegen darüber.

## Spielt es eine Rolle, ob du den Job bekommen hast?

Nein. Die Pflicht hängt an der geleisteten Arbeit und nicht am Ergebnis des Auswahlverfahrens. Wer eine volle Probeschicht gemacht hat und nie zurückgerufen wurde, hat genau denselben Anspruch wie jemand, der eingestellt wurde.

Der Fair Work Ombudsman hat für Arbeitskräfte genau in dieser Lage Löhne zurückgeholt. Nicht eingestellt zu werden ist oft der Grund, warum Leute die Forderung fallen lassen, und ein Teil davon, warum die Praxis fortbesteht.

## Was musst du aufgehoben haben?

Belege, dass du da warst und wie lange, denn gestritten wird nicht über die Rechtslage, sondern darüber, was tatsächlich passiert ist. Eine Nachricht, die die Probe vereinbart, plus eine danach genügt meist.

Textnachrichten, Dienstpläne, die Stellenanzeige, der Name der aufsichtführenden Person, Daten und Stunden. Richte die Forderung mit Stunden und Betrag schriftlich an den Arbeitgeber, bevor du eskalierst: Ein Teil löst sich in diesem Schritt, und die schriftliche Forderung wird sonst zum Beleg.

## Was passiert steuerlich, wenn du später ausgezahlt wirst?

Eine Nachzahlung ist Einkommen in dem Jahr, in dem sie zufließt, und nicht in dem der Schicht, und sie gehört wie jeder andere Lohn mit Einbehalt über die Lohnbuchhaltung ans ATO gemeldet. Auch Super gehört darauf, denn es sind Ordinary Time Earnings.

Für jemanden, der im selben Zeitraum eine Erklärung einreicht, zählt das: Eine Zahlung, die ohne hinterlegtes Tax File Number Declaration ankommt, kann mit 45 % statt 15 % einbehalten werden. Das Fenster dafür behandelt unser Guide zum [Tax File Number Declaration](/de/blog/tax-file-number-declaration-form).

## Wie hoch ist dein Anspruch?

Die Regel ist nicht mehrdeutig. Es variieren die Höhe deines Anspruchs und wie unkompliziert die Rückholung wird.

- Wie lange die Probe lief, denn die Dauer ist die klarste Linie zwischen Prüfung und Arbeit.
- Ob du etwas erzeugt hast, das der Betrieb verkauft hat, denn das macht es zu produktiver Arbeit.
- Welcher Award das Lokal abdeckt und auf welcher Einstufung du gestanden hättest, denn das setzt den Satz.
- Auf welchen Tag und welche Uhrzeit die Schicht fiel, denn Zuschläge und Casual Loading verdoppeln die Zahl oft.
- Ob du schriftliche Belege der Vereinbarung hast, was einen bestrittenen Anspruch meist entscheidet.
- Ob andere Arbeitskräfte dasselbe durchlaufen haben, denn ein Muster stärkt eine Fair-Work-Beschwerde erheblich.

Zurückgeholter Lohn ist steuerpflichtiges Einkommen in dem Jahr, in dem er zufließt, und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du weißt, was tatsächlich gezahlt wurde.
`,
  },

  'uniform-laundry-deductions-illegal-australia': {
    title: 'Abzüge für Uniform und Wäsche: erlaubt?',
    description: 'Arbeitgeber dürfen nur in eng definierten Fällen Geld vom Lohn abziehen. Uniform-, Wäsche- und Trainingsabzüge sind oft illegal. So wehrst du dich.',
    body: `
Ein Arbeitgeber darf nur dann von deinem Lohn abziehen, wenn du es schriftlich autorisiert hast und der Abzug überwiegend zu deinem Vorteil ist, oder wenn das Gesetz es verlangt. Uniformkosten, Wäschegebühren, Bruchware, Kassenfehlbeträge und Rückzahlungsklauseln für Schulungen bestehen diesen Test nicht. Eine Vertragsklausel, die sie erlaubt, macht sie nicht rechtmäßig.

## Welche Abzüge sind tatsächlich zulässig?

Die zulässigen Kategorien sind kurz und abgeschlossen. Alles außerhalb davon, ohne deine ausdrückliche schriftliche Zustimmung genommen, ist unzulässig.

- PAYG-Steuer, die das Gesetz verlangt
- Gehaltsumwandlung in [Superannuation](/de/superannuation), wo du sie ausdrücklich vereinbart hast
- Gerichtsbeschlüsse wie Unterhalt oder eine Pfändung
- Gewerkschaftsbeiträge, wo du beigetreten bist
- Zahlungen, um die du den Arbeitgeber schriftlich in deinem Namen gebeten hast

Das ist die Liste. Sie ist bewusst kurz, denn Lohn ist im australischen Recht anders geschützt als anderes Geld.

## Was ist der Test, der es entscheidet?

Zwei Bedingungen zusammen, und die zweite erledigt fast jeden Abzug, dem ein Backpacker begegnet. Der Abzug muss von dir schriftlich autorisiert sein, mit Betrag und Zweck, und er muss überwiegend zu deinem Vorteil sein.

Eine Wäschegebühr nützt dem Arbeitgeber, der saubere Uniformen in kontrolliertem Zustand bekommt. Ein Abzug für Kassenfehlbeträge verschiebt ein Geschäftsrisiko auf die Belegschaft. Keiner besteht den Vorteilstest, eine schriftliche Zustimmung rettet sie also nicht. Bestehen tun ihn eine Gehaltsumwandlung oder eine Fitnessmitgliedschaft, die du gewählt hast.

## Welche Belastungen sind die üblichen unzulässigen?

Das Muster ist über Gastronomie, Einzelhandel und Farmarbeit hinweg gleich und zielt auf Leute, von denen man annimmt, dass sie sich nicht beschweren.

- Dir eine Uniform zu berechnen, die der Job verlangt
- Eine wöchentliche oder schichtweise Wäschegebühr
- Bruchware, für Gläser, Teller oder Geräte
- Kassenfehlbeträge, oft über die gesamte Schichtbelegschaft abgezogen
- Gäste, die ohne zu zahlen gehen
- Ausbildungsgebühren oder eine Anleihe für die Einarbeitungszeit
- An dich verliehene Ausrüstung
- Einbehaltener Schlusslohn, weil du keine Kündigungsfrist eingehalten hast

Der letzte Punkt gehört getrennt benannt. Nicht gezahlter Lohn ist keine Strafe, die ein Arbeitgeber für kurzfristiges Gehen verhängen darf, und es ist die Variante, die am häufigsten gegen abreisende Backpacker eingesetzt wird.

## Was ist mit einer rückzahlbaren Uniformkaution?

Eine Kaution ist trotzdem ein Abzug vom Lohn und muss beide Tests bestehen. Sie als rückzahlbar auszugestalten ändert das nicht, und die meisten Uniformkautionsmodelle bestehen den Vorteilstest auch dokumentiert nicht.

Wo die Vereinbarung im Übrigen zulässig ist, muss die Kaution bei Rückgabe der Uniform vollständig erstattet werden. Genau dort fallen diese Modelle auseinander: Das Geld wird für Abnutzung, Reinigung oder ein fehlendes Teil einbehalten, und die Arbeitskraft hat den Bundesstaat längst verlassen.

## Wie holst du das Geld zurück?

Das Rückholverfahren ist kostenlos, braucht keinen Anwalt und funktioniert. Es beginnt mit Rechnen statt mit Argumentieren, damit die Forderung auf einen konkreten Betrag lautet und nicht auf eine Beschwerde.

1. Berechne die Gesamtsumme der Abzüge über alle Lohnperioden
2. Fordere die Rückzahlung schriftlich, mit beigefügter Aufschlüsselung
3. Reiche eine Beschwerde beim Fair Work Ombudsman ein, wenn der Arbeitgeber sich weigert
4. Lege Payslips und Bankbelege als Nachweis vor

Der Fair Work Ombudsman kann den Lohn direkt zurückholen und Strafen gegen den Arbeitgeber verfolgen, und dein Visastatus ist für deinen Anspruch unerheblich. Im Land ist das erheblich einfacher als von zu Hause aus. Rückwirkend sind bis zu sechs Jahre möglich.

## Warum reicht das bis in deine Steuererklärung?

Weil ein unzulässiger Abzug mehr verzerrt als die Lohntüte. Wird er vor der Meldung genommen statt danach, ist die an das ATO gesendete Bruttozahl zu niedrig, die 12 % Super werden auf die zu niedrige Zahl gerechnet, und der DASP fällt später kleiner aus.

Deshalb ist eine wöchentliche Wäschegebühr mehr Aufmerksamkeit wert, als sie aussieht. Bei der Erstellung einer [Steuererklärung](/de/tax-return) wird das an das ATO Gemeldete gegen die Payslips gehalten, und dort wird ein durchgängiges Muster zu niedriger Meldung sichtbar.

## Was, wenn der Arbeitgeber es nie Abzug genannt hat?

Manche Konstruktionen vermeiden das Wort und erzeugen dasselbe Ergebnis. Die Uniform selbst bei einem benannten Lieferanten kaufen oder einen Dritten für die Reinigung bezahlen zu sollen verschiebt die Kosten vom Payslip, ohne zu ändern, wer sie trägt.

Sie sind schwerer anzugreifen, weil nichts vom Lohn abgezogen wurde, und genau dort kann stattdessen eine Werbungskostenposition entstehen. Eine vorgeschriebene Uniform mit Logo oder unverwechselbarem Design, die du selbst bezahlt hast, ist absetzbar, samt der Kosten für ihre Wäsche. Eine kleinere Rückholung als die Lohnforderung, aber eine echte. Was sonst absetzbar ist, steht in unserem Guide zu [Werbungskosten für Working Holiday Maker](/de/blog/tax-deductions-working-holiday-makers).

## Was entscheidet, ob du es zurückholen kannst?

Drei Tatsachen, und die erste ist der Beleg. Ob du Payslips oder Bankbelege für den Zeitraum hast, denn ein nie dokumentierter Abzug ist schwerer zu beweisen. Ob der Abzug vom Brutto oder vom Netto genommen wurde, was ändert, ob auch Super und Steuer betroffen sind. Und ob der Arbeitgeber noch tätig ist.

Die Lohnrückholung läuft über Fair Work, die Steuer- und Superseite daneben. Beides lohnt sich zusammen zu machen, denn den Lohn zu korrigieren, ohne die Super zu korrigieren, lässt den größeren der beiden Verluste bestehen.
`,
  },

  'uk-medicare-reciprocal-agreement-australia': {
    title: 'UK-Medicareabkommen: was genau es abdeckt',
    description: 'Britische Staatsbürger sind durch das Abkommen zwischen UK und Australien abgedeckt. Deutschland hat kein solches Abkommen mit Australien.',
    body: `
Britische Working Holiday Maker haben über das Reciprocal Health Care Agreement zwischen Großbritannien und Australien Anspruch auf Medicare. Er deckt medizinisch notwendige Behandlung und bedeutet zugleich, dass die 2-%-Medicare-Abgabe in der Regel gilt, denn sie folgt dem Anspruch und nicht der Nutzung.

## Was deckt das Abkommen tatsächlich?

Medizinisch notwendige Behandlung, also Versorgung, von der ein Arzt meint, dass sie nicht warten kann, bis du nach Großbritannien zurückkehrst. Ein engerer Maßstab als NHS-Deckung, und der Punkt, den britische Reisende am häufigsten falsch lesen.

- Notfallbehandlung im Krankenhaus als öffentlicher Patient
- Hausarztbesuche zum Medicare-Erstattungssatz, kostenlos in einer Bulk-Billing-Praxis und mit einer Lücke bei anderen
- Bezuschusste Medikamente über das Pharmaceutical Benefits Scheme
- Ambulante Krankenhausbehandlung
- Schwangerschaftsversorgung, wo die Schwangerschaft vor der Anreise nicht bekannt war

Der Erstattungssatz ist nicht dasselbe wie das Honorar. Sehr viele australische Hausärzte rechnen nicht bulk-billed ab, der Besuch kostet dich dann die Differenz zwischen dem Honorar des Arztes und dem Medicare-Erstattungssatz.

## Was ist nicht abgedeckt?

Die Ausschlüsse sind erheblich und decken das meiste ab, was ein Backpacker tatsächlich braucht. Der Krankenwagen ist der teure Posten: In den meisten Bundesstaaten finanziert Medicare ihn für niemanden.

- Krankenwagen in den meisten Bundesstaaten
- Zahnbehandlung, über begrenzte öffentliche Zahnpflege in manchen Fällen hinaus
- Augenoptik, Brillen und Kontaktlinsen
- Physiotherapie und andere Therapien außerhalb einer stationären Aufnahme
- Wahleingriffe oder alles, was vor deiner Reise gebucht war
- Behandlung im Privatkrankenhaus oder als Privatpatient im öffentlichen Krankenhaus
- Behandlung außerhalb Australiens, einschließlich eines Abstechers nach Bali oder Neuseeland
- Rückführung nach Großbritannien

## Wie ändert das deine Medicare-Levy-Lage?

Hier liegt das Geld, und hier läuft die Intuition rückwärts. Die 2-%-Medicare-Abgabe wird Leuten mit Anspruch auf Medicare berechnet, die Befreiung existiert für Leute ohne. Weil das Abkommen britischen Staatsangehörigen diesen Anspruch gibt, ist die Befreiung in der Regel nicht verfügbar und die Abgabe fällt an.

Es zählt der Anspruch und nicht, ob du dich je angemeldet oder die Karte je benutzt hast. Ein britischer Backpacker, der nie in der Nähe einer Praxis war, ist trotzdem anspruchsberechtigt, und die Abgabe fällt trotzdem an. Deutsche und japanische Staatsangehörige stehen umgekehrt da: kein Abkommen, in der Regel kein Anspruch, und deshalb die Befreiung, sofern die Unterlagen vorliegen. Das Verfahren setzt unser Guide zur [Medicare-Abgabe für Working Holiday Maker](/de/blog/medicare-levy-working-holiday-makers) auseinander.

## Wie meldest du dich an?

Persönlich in einem Büro von Services Australia, mit britischem Pass, Visumserteilung, einer britischen und einer australischen Adresse. Kostenlos, meist am selben Tag abgeschlossen, und die Karte kommt innerhalb weniger Wochen an die australische Adresse.

Mach es in den ersten Wochen und nicht erst, wenn etwas passiert ist. Bis die Karte kommt, lässt sich der Anmeldeeintrag in Krankenhäusern und Bulk-Billing-Praxen nutzen. Ein nicht angemeldeter Patient wird abgerechnet und muss die Erstattung selbst betreiben, aus einem Krankenhausbett heraus eine deutlich schlechtere Lage.

## Brauchst du trotzdem zusätzlich eine Versicherung?

Ja, wegen der Lücken und nicht der Deckung. Krankenwagen, Zahn, Optik, Physiotherapie und Rückführung liegen alle außerhalb des Abkommens, und die Rückführung bei einer schweren Verletzung reicht in den fünfstelligen Bereich.

Eine günstige Krankenwagendeckung des Bundesstaats erledigt die wahrscheinlichste große Rechnung und ist damit einer der sinnvollsten Abschlüsse für einen britischen Backpacker. Welches Produkt welche Lücke füllt, behandelt unser Guide zu [Reiseversicherung gegen OVHC](/de/blog/travel-insurance-vs-health-insurance-working-holiday), und die beiden sind nicht austauschbar.

## Was kostet dich ein Hausarztbesuch tatsächlich?

In einer Bulk-Billing-Praxis nichts, denn der Arzt akzeptiert den Medicare-Erstattungssatz als volle Bezahlung. Sonst zahlst du das Honorar und Medicare erstattet den Satz, es bleibt also eine Lücke.

Bulk Billing ist weit weniger flächendeckend, als britische Besucher erwarten, und in Innenstädten und manchen Regionalorten seltener als in den Außenbezirken. Bei der Terminvereinbarung danach zu fragen ist normal. Rezepte werden zu Preisen des Pharmaceutical Benefits Scheme berechnet, also genauso wie bei einem australischen Residenten.

## Wo lässt dich das Abkommen im Krankenhaus stehen?

In der Notaufnahme eines öffentlichen Krankenhauses wirst du als öffentlicher Patient behandelt, und genau das soll das Abkommen erzeugen. Die Aufnahme ist kostenfrei, und die Behandlungsentscheidungen sind klinisch und nicht finanziell.

Was das Abkommen nicht tut, ist dir eine Wahl zu geben. Du kannst dich nicht für den Status als Privatpatient entscheiden, deinen Chirurgen nicht wählen und bist im Privatkrankenhaus nicht gedeckt. Alles Elektive wartet in der Regel, bis du zu Hause bist, und genau das bedeutet medizinisch notwendig hier.

## Was entscheidet deine Lage in einem bestimmten Jahr?

Drei Tatsachen, und die ersten beiden legt dein Pass fest. Ob dein Land überhaupt ein Abkommen hat, was für Großbritannien der Fall ist. Ob du damit anspruchsberechtigt für Medicare bist, was aus dem Abkommen folgt und nicht aus der Anmeldung. Und ob sich mitten im Jahr etwas geändert hat, denn ein Teiljahr der Anspruchsberechtigung erzeugt eine anteilige Levy-Lage, und die Daten müssen stimmen.

Die Teiljahresfälle lohnt es zu markieren. Wer im März angekommen ist, ist ab der Ankunft anspruchsberechtigt und davor nicht, wer im November abgereist ist, nur für diesen Teil des Jahres. Diese Daten auf einer [Steuererklärung](/de/tax-return) richtig zu treffen ist echtes Geld wert, und eine schnell erstellte Erklärung rundet sie gern auf die falsche ganze Zahl.
`,
  },

  'private-health-insurance-working-holiday-australia': {
    title: 'Krankenversicherung: Pflicht mit 417/462?',
    description: 'Eine private Krankenversicherung ist Visumsbedingung für viele Working Holiday Visa und praktisch notwendig für alle ohne RHCA, also auch für Deutsche.',
    body: `
Ob du auf einem Working-Holiday-Visum eine private Krankenversicherung brauchst, entscheiden zwei Dinge: deine Visa-Subclass und dein Pass. Viele der bilateralen Vereinbarungen hinter der Subclass 462 verlangen einen ausreichenden Krankenversicherungsschutz für den gesamten Aufenthalt. Mit einem Pass außerhalb der australischen Gesundheitsabkommen bleibt dir nur die Versicherung.

## Ist eine Krankenversicherung Visumsbedingung?

Das hängt an der Subclass. Das Working Holiday Visum der Subclass 417 macht Versicherung für die meisten Nationalitäten in der Regel nicht zur strikten Bedingung, obwohl Home Affairs sie empfiehlt. Viele der länderweisen Vereinbarungen hinter dem Work and Holiday Visum der Subclass 462 verlangen ausreichenden Krankenversicherungsschutz für die Dauer des Aufenthalts, und die genaue Formulierung hängt vom Abkommen ab, unter dem du eingereist bist.

Am Flughafen prüft es niemand, weshalb weithin angenommen wird, die Anforderung gebe es nicht. Geprüft wird sie an den Stellen, die am meisten zählen: wenn ein weiteres Visum beurteilt wird und wenn ein Krankenhaus fragt, wer zahlt.

## Ändert dein Pass, was du brauchst?

Mehr als das Visum. Australien hat mit elf Ländern ein Reciprocal Health Care Agreement, und Staatsangehörige eines davon können sich für [Medicare](/de/medicare) registrieren und das öffentliche System für medizinisch notwendige Behandlung nutzen, solange sie hier sind.

Die elf sind Großbritannien, Irland, Neuseeland, Italien, Malta, die Niederlande, Belgien, Finnland, Norwegen, Schweden und Slowenien. Mit einem dieser Pässe ist private Deckung eine Aufstockung über einem öffentlichen System, zu dem du bereits Zugang hast. Mit einem deutschen, japanischen, französischen, spanischen, amerikanischen oder kanadischen Pass liegt kein öffentliches System darunter und die private Deckung ist dein gesamter Schutz. Das ändert, wie viel Deckung du brauchst und wie genau du die Ausschlüsse liest.

- Abkommenspass: Medicare-Anmeldung möglich, private Deckung füllt die Lücken
- Pass ohne Abkommen: private Deckung ist die einzige Deckung und muss umfassend sein
- In beiden Fällen bezahlt keine australische Regelung den Rückflug nach Hause

## Was ist der Unterschied zwischen Reiseversicherung und OVHC?

Sie sind für verschiedene Risiken gebaut, und viele kaufen eine davon im Glauben, sie erledige beides. Reiseversicherung ist ein Reiseprodukt: Notfallbehandlung, Krankentransport, Rücktransport nach Hause, Stornierung, Diebstahl und Gepäck, meist für zwölf bis achtzehn Monate mit Verlängerungsoption verkauft.

Overseas Visitors Health Cover ist australische private Krankenversicherung für Besucher und verhält sich wie eine inländische Police: Krankenhausbehandlung öffentlich und privat, Hausarzt- und Facharzttermine, Medikamente und optionale Zusatzbausteine wie Zahn, Optik und Physiotherapie. Sie verlängert sich unbegrenzt, solange du im Land bist, passt also zu jedem, der ein zweites Jahr anhängt, und deckt Reiserisiken und Rückflug in der Regel nicht.

- Reiseversicherung: breit, zeitlich begrenzt, stark beim Rücktransport, gedeckelt beim Medizinischen
- OVHC: nur medizinisch, verlängerbar, näher an einem Ersatz für Medicare
- Viele Working Holiday Maker halten am Ende bewusst beides

## Was im Kleingedruckten erwischt die Leute tatsächlich?

Arbeitsausschlüsse, mehr als alles andere. Viele Reisepolicen schließen körperliche Arbeit aus oder begrenzen sie, und Farmarbeit, Bau und alles mit Maschinen sind die üblichen Kategorien: Die Police, die sich in Berlin ausreichend anfühlte, tut bei einem Erntejob in Mildura nichts. Lies diese Klausel vor der ersten Farmschicht.

Die anderen vier zum Prüfen sind Selbstbeteiligung, Wartezeiten, psychische Gesundheit und Abenteueraktivitäten wie Tauchen, Fallschirmspringen und Bungee, die häufig als Zusatzbaustein verkauft statt eingeschlossen werden.

- Ausschlüsse für körperliche Arbeit und Landwirtschaft
- Selbstbeteiligung je Schadensfall
- Zwölf Monate Wartezeit auf Vorerkrankungen
- Grenzen bei psychischer Gesundheit, oft der strengste Teil einer Police
- Schwangerschaft und Mutterschaft, meist vollständig ausgeschlossen

## Ist der Krankenwagen enthalten?

Nicht automatisch, und es ist die häufigste Lücke. Medicare deckt den Krankentransport in den meisten Teilen Australiens nicht, er wird also unabhängig von Nationalität und Medicare-Anmeldung als eigene Leistung berechnet.

Wo du bist, wenn es passiert, ändert die Antwort. Queensland und Tasmanien betreiben Landesprogramme, die den Krankentransport für Einwohner kostenlos oder günstig stellen, während andere Bundesstaaten ihn als private Kosten behandeln. Die meisten OVHC und Reisepolicen enthalten eine Krankentransportdeckung, aber das Niveau schwankt genug, dass es sich lohnt, es zu bestätigen.

## Ändert irgendetwas davon deine Steuer?

Nur in eine Richtung. Private Deckung senkt deine australische Steuer nicht, denn die Rückvergütung für private Krankenversicherung steht Medicare-berechtigten australischen Residenten zu und erstreckt sich nicht auf OVHC von Working Holiday Makern.

Was deine [Steuererklärung](/de/tax-return) sehr wohl beeinflusst, ist der Medicare-Anspruch selbst. Die Medicare Levy von 2 % wird Personen mit Anspruch auf Medicare berechnet, wer also einen Pass ohne Abkommen hält, kann üblicherweise die [Medicare-Levy-Befreiung](/de/blog/medicare-levy-working-holiday-makers) beantragen, mit britischem oder irischem Pass in der Regel nicht. Die Befreiung ist nicht automatisch und braucht ein Medicare Entitlement Statement von Services Australia, dessen Beschaffung Wochen dauert. Was sie bei deinem Einkommen wert ist, kannst du im [Rechner](/de/calculator) durchspielen.

## Wann solltest du die Deckung abschließen?

Vor dem Abflug für den Anfang, und noch einmal überprüfen, sobald der erste Job feststeht. Der Grund ist die Arbeitsklausel: Eine Police für eine Rundreise passt selten zu einem Job auf einer Baustelle oder in einer Packhalle, und der Wechsel ist nach einem Unfall nicht mehr möglich.

Die zweite Prüfung lohnt beim Wechsel des Bundesstaats, weil die Krankentransportregelung Ländersache ist, und bei einer Visumsverlängerung, weil viele Reisepolicen bei zwölf oder achtzehn Monaten enden und nicht aus dem Ausland verlängert werden können.

## Was ändert sich, wenn du auf ein zweites Visum wechselst?

Die Deckung folgt dem Visum nicht automatisch. Eine Police, die für die Dauer des ersten Visums gekauft wurde, endet mit ihrer eigenen Laufzeit, nicht mit dem Visum, und eine Lücke zwischen zwei Visa ist genau der Zeitraum, in dem viele ohne Schutz dastehen, ohne es zu merken.

Für die Steuerseite ändert ein zweites Visum nichts: Ohne Abkommen bleibt der Medicare-Anspruch aus, und die Befreiung wird für jedes Steuerjahr getrennt beantragt, mit einem eigenen Medicare Entitlement Statement je Jahr.
`,
  },

  'emergency-medical-care-working-holiday-no-medicare': {
    title: 'Notfall ohne Medicare: was kostet dich das?',
    description: 'Working Holiday Maker ohne Medicare können trotzdem Notfallbehandlung in Australien bekommen, aber die Kosten zahlt der Patient selbst.',
    body: `
Ein australisches öffentliches Krankenhaus behandelt dich im Notfall, ob du [Medicare](/de/medicare), eine Versicherung oder Geld hast oder nicht. Danach rechnet es dich als Privatpatient ab. Ob diese Rechnung überlebbar ist, entscheiden dein Pass und deine Versicherung, und beides steht fest, lange bevor der Krankenwagen gerufen wird.

## Welche Nummer rufst du im Notfall?

Bei allem wirklich Dringenden Triple Zero, also 000. Das ist das australische Äquivalent zu 112 in Deutschland, funktioniert von jedem Handy mit oder ohne Guthaben, und die Leitstelle fragt, ob du Polizei, Feuerwehr oder Krankenwagen brauchst.

Besorgniserregend, aber nicht lebensbedrohlich: healthdirect unter 1800 022 222 gibt rund um die Uhr kostenlose Beratung von examinierten Pflegekräften und sagt dir, welche Versorgungsstufe du tatsächlich brauchst. Für einen Arzt außerhalb der Sprechzeiten kommt in den meisten Metropolregionen der National Home Doctor Service unter 13 SICK, gewählt als 137 425, zu deiner Unterkunft. Beide Nummern gehören ins Handy, bevor man sie braucht.

## Ändert dein Pass, was eine Notfallbehandlung kostet?

Erheblich. Australien hat mit elf Ländern ein Reciprocal Health Care Agreement. Staatsangehörige dieser Länder sind während des Aufenthalts in Australien in der Regel für medizinisch notwendige Behandlung anspruchsberechtigt, einschließlich Notfallversorgung im öffentlichen Krankenhaus und bezuschusster Medikamente.

Die Liste umfasst Großbritannien, Irland, Neuseeland, Italien, Malta, die Niederlande, Belgien, Finnland, Norwegen, Schweden und Slowenien. Ein britischer Backpacker kommt also mit einem Zugang zum öffentlichen System an, den ein deutscher, japanischer, französischer oder kanadischer nicht hat. Derselbe Anspruch lässt zur Steuerzeit die [Medicare-Levy-Befreiung](/de/blog/medicare-levy-working-holiday-makers) entfallen: Wessen Staatsangehörige im Krankenhaus gedeckt sind, zahlt die 2-%-Abgabe auf der [Steuererklärung](/de/tax-return).

- RHCA-Pass: Notfallbehandlung im öffentlichen Krankenhaus und bezuschusste Medikamente, Abgabe in der Regel zu zahlen
- Nicht-RHCA-Pass, wie der deutsche: Abrechnung als Privatpatient, Abgabe in der Regel mit einem Medicare Entitlement Statement befreit
- Keiner der beiden Wege deckt die Rückführung nach Hause, das ist ausschließlich Versicherungsgebiet

## Was deckt eine Versicherung tatsächlich?

Das hängt davon ab, welches der beiden Produkte du gekauft hast; austauschbar sind sie nicht. Overseas Visitors Health Cover ist australische private Krankenversicherung für Besucher, gebaut um Krankenhausbehandlung: Vorstellung in der Notaufnahme, Aufnahme als Privatpatient, Operationen, stationäre Medikamente und die meiste Bildgebung und Labordiagnostik.

Reiseversicherung ist um die Reise herum gebaut und nicht um das Krankenhaus. Sie deckt typischerweise Notfallbehandlung, Krankenwagen und Rückführung und meist auch Stornierung und Gepäckverlust, aber die medizinische Deckung ist oft gedeckelt und schließt häufig Vorerkrankungen und alles Alkoholbezogene aus. Zwei Lücken erwischen Working Holiday Maker: die Krankenwagendeckung, die je Bundesstaat und Police variiert, und psychische Gesundheit, in sehr vielen Policen begrenzt oder ausgeschlossen.

- Krankenwagen: in den meisten Bundesstaaten getrennt berechnet und nicht immer enthalten
- Rückführung: meist Reiseversicherung, Medicare und RHCA nie
- Zahn: unter fast allem nur begrenzt
- Arbeiten mit Versicherung: manche Reisepolicen schließen körperliche Arbeit ganz aus, was vor einem Farmjob zu lesen lohnt

## Was passiert, wenn du die Rechnung nicht zahlen kannst?

Die Behandlung findet trotzdem statt; australische Krankenhäuser knüpfen Notfallversorgung nicht an Zahlung. Die Abrechnung wird danach geregelt, und ein öffentliches Krankenhaus verhandelt in der Regel einen Zahlungsplan, manchmal über einen langen Zeitraum, statt sofort eine Einmalzahlung zu verlangen.

Vergessen wird sie nicht. Krankenhäuser verfolgen offene Rechnungen auch über internationale Inkassobüros, nachdem du nach Hause geflogen bist; das Land zu verlassen ist keine Lösung. Die Kosten, mit denen niemand plant, sind eine Rettung aus der Luft aus einer entlegenen Gegend und ein medizinisch begleiteter Rückflug. Für Inhaber eines Nicht-RHCA-Passes ist eine Versicherung deshalb eher unverzichtbar als optional.

## Solltest du in ein öffentliches oder ein privates Krankenhaus?

Bei einem ernsten Notfall in das öffentliche, und meist entscheidet ohnehin der Krankenwagen. Öffentliche Notaufnahmen sind für Medicare-berechtigte Patienten kostenlos, RHCA-Staatsangehörige eingeschlossen; wirst du als Privatpatient abgerechnet, sind die Sätze immer noch niedriger als im privaten Äquivalent.

Private Notaufnahmen berechnen ab der ersten Minute, unabhängig davon, wer du bist. Der Tausch ist Wartezeit gegen Kosten: vernünftig bei einem gebrochenen Finger, schlecht bei allem, wofür ein großes Krankenhaus dahinterstehen muss.

## Was solltest du danach aufheben?

Alles auf Papier. Der Entlassungsbericht, die Medikamentenliste, die Bildgebungsergebnisse und jede Rechnung sind das, was ein Versicherer zur Prüfung eines Anspruchs braucht, und sie sind Monate später aus einem längst verlassenen Krankenhaus schwer zu rekonstruieren.

Die Folgen reichen über die Krankenakte hinaus. Eine längere Zeit ohne Arbeitsfähigkeit verändert dein Jahreseinkommen, meist zu einer größeren Erstattung, und sie kann deine [Super](/de/superannuation)-Lage und dein DASP-Timing verändern, wenn du Australien früher als geplant verlässt. Schiebt sich die Genesung über den Visumsablauf hinaus, trägt man das Home Affairs früh statt spät vor, weil Warten dich hier wirklich Optionen kostet.
`,
  },

  'travel-insurance-vs-health-insurance-working-holiday': {
    title: 'Reiseversicherung oder Krankenversicherung?',
    description: 'Die Reiseversicherung deckt Reiserisiken und Notfälle, eine australische Krankenversicherung die laufende Behandlung. Was du ohne Medicare brauchst.',
    body: `
Sie decken unterschiedliche Dinge, und die meisten Working Holiday Maker wollen beides. Reiseversicherung deckt Notfälle, Rückführung, Stornierung und Diebstahl. Overseas Visitors Health Cover ist ein australisches Gesundheitsprodukt für Behandlung innerhalb Australiens. Die wichtigste Lücke liegt dazwischen, und sie heißt Arbeit.

## Was deckt Reiseversicherung tatsächlich?

Die Risiken des Reisens, mit medizinischer Notfallbehandlung daran. Eine umfassende Police deckt Notfallbehandlung im Krankenhaus und beim Arzt in Australien, Rückführung nach Hause bei schwerer Krankheit oder Verletzung, Reisestornierung und -unterbrechung, verlorenes oder gestohlenes Gepäck, private Haftpflicht und Notfallevakuierung aus entlegenen Gegenden.

Die Deckungszeiträume sind meist auf zwölf bis achtzehn Monate begrenzt, mit Verlängerungsoptionen. Im Detail sitzen die Ausschlüsse: Vorerkrankungen häufig, Hochrisikoaktivitäten oft, arbeitsbedingte Verletzungen sehr häufig.

## Was deckt OVHC?

Behandlung in Australien, aufgebaut wie Medicare-Deckung, aber bei einer privaten Kasse gekauft. Eine typische Police deckt Aufnahme in öffentlichen und privaten Krankenhäusern, Vorstellungen in der Notaufnahme, Hausarztkonsultationen meist mit einer Lücke, Facharztkonsultationen, bezuschusste Arzneimittel, Bildgebung und Labordiagnostik, mit optionalen Extras für Zahn, Optik und Physiotherapie.

Sie ist unbegrenzt verlängerbar, solange du in Australien bist, und trägt damit einen langen Aufenthalt. Was sie nicht tut, ist alles außerhalb australischer Behandlung: keine Rückführung, keine Stornierung, kein Gepäck und nichts auf einem Abstecher nach Bali.

## Warum ergeben meistens beide Sinn?

Weil jede genau das falsche Produkt für das ist, was die andere abdeckt. Ein zwölfmonatiges Working-Holiday-Jahr erzeugt verlässlich beide Arten von Ereignis.

- Ein Notfall in Sydney: beide reagieren, und OVHC wickelt meist schneller mit kleineren Lücken ab
- Rückführung nach Deutschland nach schwerer Verletzung: nur Reiseversicherung
- Ein gestohlener Laptop im Hostel: nur Reiseversicherung
- Ein gewöhnlicher Hausarztbesuch wegen einer Atemwegsinfektion: OVHC, oder Reiseversicherung mit einer Selbstbeteiligung, die die Rechnung oft übersteigt
- Ein verlorener Reisepass in Cairns: nur Reiseversicherung
- Ein Trip nach Bali mitten im Jahr: nur Reiseversicherung

## Was ist die Lücke bei arbeitsbedingten Verletzungen?

Das größte und am wenigsten verstandene Problem in diesem Bereich. Reiseversicherungen sind für Touristen geschrieben und nicht für Leute, die Lohn verdienen, und sehr viele Policen schließen Verletzungen bei der Arbeit aus.

Ein Sturz auf einer Farm, eine Verbrennung in einer Küche oder ein Schnitt auf einer Baustelle kann von der Reisepolice abgelehnt werden. Gedeckt wird das von der Workers Compensation über deinen Arbeitgeber, die in jedem Bundesstaat verpflichtend ist und dich unabhängig von Visastatus und Dienstzeit deckt. OVHC fängt die Behandlung auf, die die Workers Compensation nicht deckt.

Bei der Arbeit gedeckt bist du also fast nie über die Reisepolice. Wie der Workers-Compensation-Anspruch läuft, setzt unser Guide zu [Rechten bei Arbeitsverletzungen](/de/blog/workplace-injury-working-holiday-rights) auseinander, und den lohnt es zu lesen, bevor du ihn brauchst.

## Wo passt Medicare hinein?

Nur für Leute mit Anspruch, und der folgt dem Pass. Staatsangehörige der elf Reciprocal-Health-Care-Agreement-Länder, darunter Großbritannien und Irland, sind in der Regel anspruchsberechtigt und können sich anmelden.

Alle anderen, einschließlich Inhabern deutscher und japanischer Pässe, sind in der Regel nicht anspruchsberechtigt, und für sie ist die Versicherung außerhalb der Workers Compensation das gesamte Sicherheitsnetz. Dieselbe Anspruchsfrage entscheidet auch die 2-%-Medicare-Abgabe auf deiner Erklärung, und zwar in die andere Richtung: Anspruchsberechtigt zu sein macht die Abgabe zahlbar, und nicht anspruchsberechtigt zu sein macht die Befreiung verfügbar. Diese Seite behandelt unser Guide zur [Medicare-Abgabe](/de/blog/medicare-levy-working-holiday-makers).

## Was solltest du in einer Police tatsächlich prüfen?

Die Ausschlüsse, nicht die beworbene Deckung. Die beworbene Deckung ist über die Produkte hinweg weitgehend ähnlich, die Ausschlüsse sind es nicht.

- Die Selbstbeteiligung und ob sie die Kosten der Ereignisse übersteigt, die du wahrscheinlich hast
- Wartezeiten für Vorerkrankungen, Schwangerschaft und psychische Gesundheit
- Ob arbeitsbedingte Verletzung ausgeschlossen ist, und mit welchem Wortlaut
- Aktivitätsausschlüsse, besonders Farmarbeit, Arbeit mit Tieren und Abenteuersport
- Der geografische Geltungsbereich, denn manche Policen decken nur Australien
- Grenzen der Rückführung und ob sie für die Entfernung nach Hause realistisch sind
- Der Antragsprozess und wie lange die Zahlung tatsächlich dauert

## Wirkt sich irgendetwas davon auf deine Steuer aus?

Sehr wenig. Prämien sind gegen Working-Holiday-Einkommen nicht absetzbar, und Auszahlungen sind in der Regel nicht steuerpflichtig.

Der Medicare Levy Surcharge gilt für Working Holiday Maker meist nicht, weil er dem Wohnsitz folgt, und die Private-Health-Rückerstattung gilt für OVHC in dieser Gruppe nicht. Deine Erklärung betrifft die 2-%-Medicare-Abgabe selbst und ob eine Befreiung beantragt wird, und das hängt am Anspruch und nicht am Versicherungskauf.

## Wann solltest du welche kaufen?

Die Reiseversicherung vor dem Abflug, denn eine Stornodeckung wirkt nur, wenn sie existierte, bevor der Grund zum Stornieren entstand. OVHC lässt sich nach der Ankunft abschließen, wenn du weißt, wie lange du bleibst, wobei Wartezeiten für früher sprechen.

Üblich ist eine Zwölfmonats-Reisepolice, zu Hause gekauft, und danach OVHC, sobald klar wird, dass der Aufenthalt kein Urlaub ist, sondern ein Jahr Arbeiten und Leben.

## Welche Lücken zählen für dich?

Die Produkte sind für alle gleich. Welche Lücken zählen, entscheiden dein Pass und dein Jahr, und den Arbeitsausschluss entdecken die meisten zu spät.

- Welchen Pass du hältst, denn das entscheidet den Medicare-Anspruch und damit die Grundlage.
- Ob du arbeiten wirst, denn dort greift der Ausschluss der Reiseversicherung.
- Welche Art Arbeit, denn Ausschlüsse für Farm- und Abenteueraktivitäten sind üblich.
- Wie lange du bleibst, denn Reisepolicen sind bei zwölf bis achtzehn Monaten gedeckelt und OVHC nicht.
- Ob du während des Visums Australien verlässt, wohin dir OVHC nicht folgt.
- Ob du eine Vorerkrankung hast, denn das ist der Ausschluss, der praktisch am ehesten zählt.

Dein Versicherungsstatus ändert die Steuer nicht, dein Medicare-Anspruch schon, und der wird in der [Working-Holiday-Steuererklärung](/de/tax-return) geklärt. Was die 2 % an deinem Einkommen ausmachen, rechnet der [Erstattungsrechner](/de/calculator) durch.
`,
  },

  'hospitality-award-working-holiday-makers': {
    title: 'Hospitality Award: Lohn, Zuschläge, Rechte',
    description: 'Der Hospitality Award (MA000009) ist der moderne Award, der Mindestlöhne, Penalty Rates und Bedingungen für die meisten Gastronomiejobs festlegt.',
    body: `
Der Hospitality Industry (General) Award, MA000009, setzt Mindestsätze, Einstufungen, Zuschläge und Zulagen für Hotels, Pubs, Hostels, Nachtclubs, Veranstaltungszentren und die daran angeschlossenen Betriebe. Er gilt für Working Holiday Maker wie für alle anderen. Ob er deinen Job abdeckt, hängt an der Art des Betriebs und nicht daran, was du dort tust.

## Welche Betriebe deckt er tatsächlich ab?

Beherbergungs- und lizenzierte Betriebe und die Gastronomie darin: Hotels, Motels, Serviced Apartments und Resorts, Caravan Parks und Hostels, Veranstaltungs- und Kongresszentren, Nachtclubs, die meisten Casinos und Leiharbeitsfirmen, die Personal in eines davon vermitteln.

Falsch verstanden wird, was er nicht abdeckt. Ein eigenständiges Restaurant oder Café fällt unter den Restaurant Industry Award, ein Fast-Food-Betrieb unter den Fast Food Industry Award. Ein Kellner im Hotelrestaurant und einer im Restaurant nebenan stehen bei gleicher Arbeit unter verschiedenen Awards, mit verschiedenen Sätzen und Sonntagszuschlägen. Die andere Seite dieser Linie setzt unser Guide zum [Restaurant Industry Award](/de/blog/restaurant-industry-award-working-holiday) auseinander.

## Auf welcher Einstufung stehst du tatsächlich?

Auf einer von sechs Stufen, und die Stufe folgt deinen Aufgaben, nicht deiner Jobbezeichnung. Introductory Level: die erste Zeit in der Branche ohne Vorerfahrung. Level 1: Küchenhilfen, Zimmerpersonal, Portiers, Glaseinsammler und Food-and-Beverage-Attendants ohne Verantwortung. Level 2: Barpersonal mit RSA, Cook Grade 1 und Kellner mit Verantwortung. Level 3: Cook Grade 2, Head Waiter für einen Bereich und Sicherheitspersonal.

Das Introductory Level ist zeitlich begrenzt. Nach einer festgelegten Anfangszeit muss der Arbeitgeber dich auf Level 1 heben, sofern kein echter Grund für weitere Einarbeitung besteht. Einen Backpacker sechs Monate darauf zu lassen ist eine der häufigeren stillen Unterbezahlungen der Branche.

## Wie bauen sich die Sätze auf?

In Schichten, und der Pauschalsatz vieler Betriebe ersetzt sie alle durch eine Zahl, die fast immer niedriger liegt. Basis ist der Einstufungssatz, jeweils zum 1. Juli in der Annual Wage Review überprüft. Eine Casual-Kraft addiert das 25-%-Loading, danach kommt der Zuschlag für Tag und Uhrzeit, danach jede Zulage.

- Samstag: typischerweise ein Aufschlag von 25 % auf die Basis, neben dem Casual Loading
- Sonntag: typischerweise 50 %, neben dem Casual Loading
- Feiertage: typischerweise 125 %, neben dem Casual Loading
- Abendarbeit von 19 Uhr bis Mitternacht: ein zusätzlicher Aufschlag, der je Stufe variiert
- Mitternacht bis 7 Uhr: ein höherer Nachtaufschlag

Die genauen Prozentsätze und Startzeiten stehen in der aktuellen Fassung des Awards und unterscheiden sich je Einstufung. Ein pauschaler Stundensatz, der angeblich alles abdeckt, ist das klarste Zeichen dafür, dass die Schichten nicht angewendet wurden.

## Welche Zulagen werden häufig übersehen?

Mehrere, und häufiger als Zuschläge, weil niemand sie erwartet. Der Award sieht vor: eine Essenszulage bei Überstunden ohne Pause, eine Zulage für geteilte Dienste, wo eine Schicht durch eine unbezahlte Phase unterbrochen wird, eine Uniformzulage, wo der Arbeitgeber eine verlangt und nicht stellt, eine Wäschezulage für vorgeschriebene Uniformen, eine Erste-Hilfe-Zulage für die benannte Person und Reisezulagen unter manchen kurzfristigen Umständen.

Für Backpacker zählt vor allem die Zulage für geteilte Dienste: In der Hotelgastronomie sind geteilte Dienste Standard, und die Zulage erscheint fast nie auf dem Payslip.

## Warum wird dieser Award so oft verletzt?

Weil er zu den komplexesten modernen Awards Australiens gehört und auf eine ständig wechselnde Belegschaft angewendet wird. Das erzeugt echte Lohnbuchhaltungsfehler ebenso wie vorsätzliche Unterbezahlung, und von der Seite der Arbeitskraft sehen beide gleich aus.

Der Fair Work Ombudsman hat deshalb wiederholt Kampagnen zur Einhaltung in der Gastronomie geführt. Sprich es zuerst beim Arbeitgeber an: Ein Teil davon sind Konfigurationsfehler, die nach der Identifikation korrigiert werden.

## Was macht Unterbezahlung mit deiner Steuer und deiner Super?

Sie setzt beide zu niedrig an. Sind die Löhne, die du hättest bekommen sollen, höher als die an das ATO gemeldeten, ist das Einkommen auf deiner Erklärung zu niedrig und die auf diese Löhne gerechneten 12 % Superannuation mit ihm.

Unterbezahlten Lohn zurückzuholen erhöht deshalb drei Dinge auf einmal: das steuerpflichtige Einkommen im Jahr der Nachzahlung, die vom Arbeitgeber geschuldete Super und das DASP-Guthaben, das du bei der Abreise beantragst. Der Lohn selbst läuft über Fair Work und nicht über das Steuersystem; die Superhälfte behandelt unser Guide zu [nicht gezahlter Super](/de/blog/super-employer-not-paying-what-to-do).

## Was ändert deinen Stundensatz nach oben?

Der Award ist ein öffentliches Dokument. Was er dir zugesteht, entscheiden Tatsachen über deinen konkreten Job, und mehrere davon ändern die Zahl erheblich.

- Ob der Betrieb ein Beherbergungs- oder lizenzierter Betrieb ist, also ob dieser Award gilt.
- Welcher Einstufung deine Aufgaben entsprechen und ob du zu lange auf Introductory Level gelassen wurdest.
- Ob du casual bist, was das 25-%-Loading auf jeden Zuschlag bringt.
- Welche Stunden du gearbeitet hast, denn Abend-, Wochenend- und Feiertagszuschläge stapeln sich.
- Ob ein Tarifvertrag gilt, in größeren Hotelgruppen üblich, der den Award verdrängt.
- Ob Zulagen wie die für geteilte Dienste und die Uniformzulage gezahlt wurden.
- Ob du unter einer ABN beschäftigt bist, denn dann deckt dich kein Award.

Was in jedem Betrieb einbehalten wurde, wird am Ende des Steuerjahres abgerechnet, und du kannst aus deinen Jahreszahlen deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  'horticulture-award-working-holiday-makers': {
    title: 'Horticulture Award: Löhne für Farmarbeit',
    description: 'Der Horticulture Award (MA000028) legt Mindestlöhne, Pausen und Bedingungen für Farmarbeit fest. Die Sätze für 2025-26 und deine Rechte.',
    body: `
Der Horticulture Award MA000028 setzt die gesetzliche Mindestbezahlung für Pflücken, Packen und allgemeine Farmarbeit in Australien. Sein zentraler Schutz ist ein Mindeststundensatz, der auch gilt, wenn du pro Kiste oder pro Eimer bezahlt wirst, plus 25 % Casual Loading auf den Grundsatz.

## Welche Arbeit deckt der Award tatsächlich ab?

Der Award deckt Gartenbau ab: Anbau, Ernte und Verpackung der Kulturen sowie die dazugehörige allgemeine Farmarbeit. Werden deine 88 Tage auf einer Obst- oder Gemüsefarm verdient, regelt fast sicher dieser Award deine Bezahlung.

- Obst- und Gemüseernte und -pflücken
- Beschneiden, Pflanzen, Jäten, Reben- und Baumarbeit
- Verpacken in Hallen auf der Farm
- Pilzanbau und -ernte
- Blumenanbau und -schnitt

Nicht abgedeckt sind großflächiger Ackerbau wie Weizen und Gerste, Viehwirtschaft auf Rinder- und Schafstationen und Aquakultur. Die liegen unter dem Pastoral Award und anderen mit anderen Sätzen, den richtigen Award zu bestimmen ist also der erste Schritt.

## Was ist die Mindeststundensatz-Garantie?

Für einen Working Holiday Maker die wertvollste Zeile im Award: Wie auch immer du bezahlt wirst, dein Verdienst für die gearbeitete Zeit muss mindestens den Mindeststundensatz deiner Einstufung erreichen. Ein Akkordsatz ist eine Berechnungsmethode, kein Weg um die Untergrenze herum.

Wo ein Tag Pflücken weniger einbringt als das Stundenminimum für die gearbeiteten Stunden, muss der Arbeitgeber die Differenz aufstocken. Farmen, die diese Aufstockung nicht zahlen, sind das häufigste Unterbezahlungsmuster im australischen Gartenbau, und der Fair Work Ombudsman hat dagegen wiederholt landesweite Kampagnen geführt. Wie der Schutz funktionieren soll, setzt unser Guide zu [Akkordlohn auf Farmen](/de/blog/piece-rates-farm-work-working-holiday) auseinander.

## Auf welcher Einstufung stehst du tatsächlich?

Die Einstufung entscheidet die Arbeit, die du tust, nicht die Stufe auf deinem Payslip, und dort versteckt sich meist eine stille Unterbezahlung. Der Award läuft von Level 1 bis Level 5, und die meisten Working Holiday Maker sitzen auf Level 1 oder Level 2.

- **Level 1**: neue Angestellte in den ersten drei Monaten ohne Farmerfahrung
- **Level 2**: Arbeitskräfte nach drei Monaten oder mit Vorerfahrung
- **Level 3**: qualifizierte Arbeit, die Spezialwissen verlangt
- **Level 4**: Traktorfahrer, Chemikalienanwender, Leiter kleiner Teams
- **Level 5**: Leading Hands und qualifizierte Vorarbeiter

Über drei Monate hinaus auf Level 1 zu bleiben, obwohl der Award dich auf Level 2 hebt, ist eine häufige und rückholbare Unterbezahlung. Sie fällt nie auf, wenn niemand das Startdatum gegen den Satz hält.

## Welche Zuschläge und Loadings gelten?

Der Gartenbau hat engere Zuschläge als die Gastronomie, aber nicht keine, und diese Annahme macht Pauschalsätze so leicht verkäuflich.

- Casual Loading von 25 % auf den Grundstundensatz
- Überstunden über 38 Stunden pro Woche oder 304 Stunden über einen Achtwochenzyklus
- Ein höherer Satz an Feiertagen
- Wochenendzuschlag in manchen Einstufungen

Dazu kommen Zulagen, die auf Farm-Payslips regelmäßig fehlen: Fahrten zwischen Standorten während eines Arbeitstages, eine Werkzeugzulage, wo du eigenes Werkzeug stellst, Arbeit bei Schlechtwetter und Arbeit im Kühllager. Jede wird zusätzlich zum Grundsatz gezahlt.

## Wie hängt Award-Bezahlung mit deinen 88 Tagen zusammen?

Die Visumsseite und die Lohnseite hängen über denselben Papierkram zusammen. Specified Work zählt für ein Visum im zweiten Jahr nach Tagen, nicht nach Stunden, und Home Affairs stützt sich auf die Aufzeichnung darüber, dass du ordentlich angestellt und gemeldet warst.

Wo die Arbeit nach Award bezahlt und über Single Touch Payroll an das ATO gemeldet wurde, setzt sich der Visumsnachweis aus Payslips und Income Statements von selbst zusammen. Wo bar bezahlt wurde, wird der Nachweis beim Antrag auf das zweite Visum zum echten Problem. Das ist der praktische Grund, Barvereinbarungen auf einer Farm abzulehnen, und er kommt vor dem steuerlichen.

## Was kostet Unterbezahlung über den Lohn hinaus?

Ein unterbezahlter Lohn ist kein einzelner Verlust, sondern drei. Der Lohn selbst ist zu niedrig, die 12 % [Superannuation](/de/superannuation) werden auf die zu niedrige Zahl gerechnet, und die DASP-Zahlung, die du später beantragst, fällt dadurch kleiner aus.

Das preisen Farmarbeiter selten ein. Den Lohn über den Fair Work Ombudsman zurückzuholen ist kostenlos, aber Super und späterer DASP korrigieren sich nur, wenn der zugrundeliegende Lohn korrigiert wird. Die Rückholseite behandelt unser Guide zu [nicht gezahlter Super](/de/blog/super-employer-not-paying-what-to-do).

## Was solltest du in deiner ersten Woche auf einer Farm prüfen?

In der ersten Woche ist ein Problem billig zu beheben und leicht liegen zu lassen. Frag, welcher Award für die Kultur gilt, auf welche Einstufung du gesetzt wurdest, ob der Satz das Casual Loading enthält und ob nach Stunden oder nach Akkord gezahlt wird.

Eine Akkordvereinbarung schriftlich zu bekommen ist das Nützlichste, denn die Mindestgarantie funktioniert nur dort, wo eine dokumentierte Vereinbarung existiert, gegen die gemessen werden kann. Die eigenen Kisten und Stunden für die ersten Tage mitzuschreiben verwandelt ein vages Gefühl in eine Zahl, die du dem Betrieb vorlegen kannst.

## Was entscheidet, ob dein Farmjahr korrekt bezahlt wurde?

Vier Dinge, die du selbst prüfen kannst, und eines, das du wahrscheinlich nicht kannst. Ob der richtige Award für die Kultur gilt, ob deine Einstufung zu deinem tatsächlichen Startdatum und deiner Erfahrung passt, ob das Casual Loading im Satz steckt und ob die Akkordaufstockung an den langsamen Tagen je gezahlt wurde.

Das Schwerere ist der Abgleich zwischen dem an das ATO Gemeldeten und dem, was hätte gezahlt werden müssen, denn beides liegt an verschiedenen Orten und weder Farm noch Leiharbeitsfirma bietet den Vergleich an. Dieser Abgleich gehört zur Vorbereitung der [Steuererklärung](/de/tax-return) eines Farmarbeiters, und in der Farmarbeit klaffen die Lücken zwischen gezahltem und geschuldetem Lohn am weitesten.
`,
  },

  'restaurant-industry-award-working-holiday': {
    title: 'Restaurant Industry Award: Löhne und Rechte',
    description: 'Der Restaurant Industry Award (MA000119) deckt Restaurants, Cafés und Bars ab. Mindestlöhne, Penalty Rates und Casual Loading, erklärt.',
    body: `
Der Restaurant Industry Award, MA000119, setzt Mindestsätze, Einstufungen und Zuschläge für eigenständige Restaurants, Cafés und ähnliche Gastronomiebetriebe. Er ist nicht dasselbe Regelwerk wie der Hospitality Award, und der Unterschied zeigt sich am deutlichsten am Sonntag. Welcher für dich gilt, entscheidet der Betrieb und nicht die Tätigkeit darin.

## Was deckt dieser Award ab, und was nicht?

Gastronomiebetriebe, die für sich stehen: eigenständige Restaurants ohne Anbindung an ein Hotel, Cafés, Coffee Shops und Brunch-Lokale, Teestuben, Cateringbetriebe sowie Empfangs- und Veranstaltungszentren ohne Anbindung an eine Unterkunft. Take-away-Betriebe fallen unter bestimmten Umständen darunter.

Nicht abgedeckt sind Restaurants in Hotels, die unter den [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers) fallen, Fast-Food-Betriebe mit eigenem Award und jeder Arbeitsplatz unter einem Enterprise Agreement, das den Award verdrängt. Wie sich das Regelwerk sonst bestimmen lässt, steht in unserem Guide zu [Award-Einstufungen](/de/blog/award-classifications-working-holiday-australia).

## Welche Einstufung gilt für dich?

Eine von sechs Stufen, und die Stufe folgt den Aufgaben, nicht den Titeln. Introductory: die erste Zeit ohne einschlägige Erfahrung. Level 1: Eindecken, Abräumen, Gläsereinsammeln. Level 2: Getränkeausschank, Bestellannahme, Speisenservice und einfache Kochtätigkeit. Level 3: Aufsicht über einen kleinen Bereich oder Cook Grade 1. Die Level 4 bis 6 laufen über Cook Grade 2, Chef de Partie, Küchenchef und Restaurantleitung.

Die meisten Working Holiday Maker im Service liegen bei Level 1 oder 2, erfahrene Baristas bei Level 2 oder 3. Aufgaben wandern schneller nach oben als Einstufungen, und so wird dieser Award still unteranwendet: Wer Bestellungen aufnimmt und Getränke ausschenkt, ist keine Level-1-Kraft, egal wie der Dienstplan das nennt.

## Wie bauen sich Sätze und Zuschläge auf?

Vom Grundsatz der Einstufung aus, jeweils zum 1. Juli überprüft, mit dem Casual Loading von 25 % für Casuals und darauf dem Zuschlag für Tag und Uhrzeit.

- Montag bis Freitag zwischen 19 Uhr und Mitternacht: ein moderater Abendzuschlag
- Samstag: für Casuals typischerweise 50 % Zuschlag, der in manchen Einstufungen das Casual Loading enthält
- Sonntag: für Casuals typischerweise 75 %
- Feiertage: für Casuals typischerweise 150 %
- Mitternacht bis 7 Uhr: ein höherer Nachtzuschlag

Die genauen Zahlen und Uhrzeitgrenzen stehen in der aktuellen Fassung des Awards. Restaurantzuschläge sind nicht identisch mit Hotelzuschlägen: Wer den falschen Award anwendet, begeht keinen Formfehler, sondern zahlt den falschen Sonntagssatz.

## Welche Zulagen enthält er?

Mehr, als die meisten geltend machen. Eine Essenszulage bei Überstunden ohne Pause, eine Kleidungs- oder Uniformzulage, wenn der Arbeitgeber eine Uniform verlangt und nicht stellt, eine Wäschezulage für das Waschen einer verlangten Uniform, eine Erste-Hilfe-Zulage für die benannte Person und eine Werkzeugzulage, wenn du eigene Ausrüstung wie Messer stellen musst.

Die Werkzeugzulage zählt besonders in Küchen: Köchinnen und Köche bringen häufig eigene Messer mit und können dafür einen Ausgleich beanspruchen, statt sie nur zur Steuerzeit abzusetzen.

## Was passiert, wenn der falsche Award angewendet wurde?

Du wurdest gegen die falsche Satztabelle bezahlt, und die Differenz sammelt sich jede Woche neu. Es ist eines der gleichmäßigsten Unterbezahlungsmuster der Gastronomie, teils absichtlich, teils weil die Lohnabrechnung in kleinen Betrieben einmal eingerichtet und nie wieder angefasst wird.

Den richtigen Award zu bestimmen ist deshalb der erste Schritt. Deinen Payslip gegen Hospitality-Sätze zu vergleichen, während der Restaurant Award gilt, liefert in beide Richtungen die falsche Antwort und schwächt den Anspruch.

## Was macht das mit Steuer und Super?

Unterbezahlte Löhne untertreiben alles, was danach kommt. Das ans ATO gemeldete Einkommen ist niedriger, als es sein sollte, und die 12 % Superannuation auf diese Löhne sind es mit.

Später zurückgeholte Löhne sind in dem Jahr steuerpflichtig, in dem du sie erhältst, nicht in dem, in dem du sie verdient hast, und der auf die korrigierte Zahl geschuldete Super ist getrennt zu holen. Diese Seite behandelt unser Guide zu [nicht gezahlter Super](/de/blog/super-employer-not-paying-what-to-do), die Löhne selbst laufen über den Fair Work Ombudsman.

## Wie findest du heraus, welcher Award gilt?

Frag den Arbeitgeber, welchen Award er anwendet, und prüf die Antwort gegen die Art des Betriebs. Er muss sie kennen, weil er danach abrechnet, und die Frage schriftlich zu stellen erzeugt den Beleg, falls die Antwort falsch war.

Bleibt sie aus oder wirkt unsicher, entscheidet der Betriebstyp. Steht das Lokal für sich, gilt in der Regel der Restaurant Industry Award; gehört es zu einem Hotel, Pub oder einer Unterkunft, der Hospitality Award. Die Fair-Work-Sätze zu deiner Einstufung sind öffentlich abrufbar, und ein Abgleich mit dem Payslip dauert wenige Minuten.

## Was solltest du sammeln, solange du dort arbeitest?

Dienstpläne, Payslips und die Einstufung auf dem Payslip, jeweils in dem Moment, in dem sie entstehen. Ein Lohnanspruch wird aus dem Vergleich zwischen gearbeiteten und bezahlten Stunden gebaut, und beide Hälften verschwinden schnell: Roster-Apps überschreiben, und Payslips liegen in einem E-Mail-Konto, das du nach der Abreise selten öffnest.

Am wichtigsten sind die Wochen mit Sonntagen und Feiertagen, denn dort trennt sich ein korrekt angewendeter Award am deutlichsten von einem falschen.

## Woraus baust du einen Lohnanspruch?

Der Award ist öffentlich und die Sätze sind veröffentlicht. Was dir zustand, hängt an Fakten über den Betrieb und deinen Dienstplan, und der erste Punkt entscheidet alle übrigen.

- Ob der Betrieb für sich steht oder in einem Hotel sitzt, was den Award entscheidet.
- Welcher Einstufung deine tatsächlichen Aufgaben entsprechen, nicht dein Titel.
- Ob du über den Punkt hinaus auf Introductory gehalten wurdest, an dem es noch gilt.
- Ob du Casual bist, was auf jeden Zuschlag zusätzlich das Loading bringt.
- Welche Stunden du gearbeitet hast, denn Samstags-, Sonntags-, Abend- und Feiertagszuschläge weichen vom Hospitality Award ab.
- Ob Zulagen für Uniform, Wäsche und eigenes Werkzeug gezahlt wurden.
- Ob statt des Awards ein Enterprise Agreement gilt.

Alles, was über die Betriebe hinweg einbehalten wurde, wird am Ende des Steuerjahres abgerechnet, und du kannst deine [Steuererstattung schätzen](/de/calculator) auf Basis deiner bisherigen Jahreszahlen.

`,
  },

  'award-classifications-working-holiday-australia': {
    title: 'Welcher Modern Award gilt für deinen Job?',
    description: 'Fast jeder Job fällt unter einen Modern Award, der deinen Mindestlohn bestimmt. Über den Award-Finder von Fair Work findest du Award und Einstufung.',
    body: `
Den Award entscheidet die Branche deines Arbeitgebers, die Einstufung entscheiden die Aufgaben, die du tatsächlich ausführst. Jobbezeichnungen entscheiden nichts. Es gibt über 120 Modern Awards, und fast jeder Working-Holiday-Job fällt unter einen, der das Minimum setzt, ganz gleich was ein Vertrag sagt.

## Wie wird ein Award bestimmt?

Über seine Abdeckungsklausel, die festlegt, für welche Betriebe er gilt. Jeder Modern Award hat einen Namen, einen Referenzcode wie MA000009 für Hospitality oder MA000028 für Horticulture, eine Abdeckungsklausel und eine Einstufungsstruktur.

Der Fair Work Ombudsman pflegt die öffentliche Liste und die aktuellen Sätze, kostenlos und maßgeblich. Fast jeder Streit über Bezahlung stellt sich als Streit darüber heraus, welches Dokument gilt.

## Was ist der Dreischritttest?

Branche, dann Rolle, dann Stufe, in dieser Reihenfolge. Direkt zur Stufe zu springen erzeugt selbstsichere falsche Antworten, denn zwei Leute auf derselben Stufe zweier verschiedener Awards sind auf völlig unterschiedlichem Geld.

Erstens die Branche des Arbeitgebers: Ein Hotel ist Beherbergung und Gastronomie, ein eigenständiges Café Restaurantbranche, eine Obstfarm Gartenbau. Zweitens der Hauptzweck deiner Arbeit: Zwei Leute im selben Gebäude können unter verschiedenen Awards stehen, etwa eine Hotelrezeptionistin und eine Verwaltungskraft in der Zentrale desselben Unternehmens. Drittens die Einstufung, die zu deinen tatsächlichen Aufgaben passt.

Ein Working Holiday Maker mit drei Jobs in einem Jahr fällt häufig unter drei verschiedene Awards, jeder mit eigenen Sätzen und eigener Zuschlagsstruktur.

## Welche Awards decken die meiste Working-Holiday-Arbeit ab?

Eine kurze Liste macht die überwiegende Mehrheit der 417- und 462-Anstellungen aus. Der Code daneben ist das, wonach du suchst, um die aktuellen Sätze zu finden.

- [Hospitality Industry (General) Award, MA000009](/de/blog/hospitality-award-working-holiday-makers): Hotels, Motels, Hostels, Hotelbars, Veranstaltungszentren, Caravan Parks
- [Restaurant Industry Award, MA000119](/de/blog/restaurant-industry-award-working-holiday): eigenständige Restaurants, Cafés, Brunch-Lokale
- Fast Food Industry Award, MA000003: Fast-Food-Ketten, Take-Away-Lokale, Food Courts
- [Horticulture Award, MA000028](/de/blog/horticulture-award-working-holiday-makers): Obsternte, Gemüseernte, Verpackung, Reben- und Baumarbeit
- General Retail Industry Award, MA000004: Läden, Supermärkte, Kaufhäuser
- Pastoral Award, MA000035: Viehwirtschaft, großflächiger Ackerbau, Schur
- Cleaning Services Award, MA000022: Vertragsreinigung und Hotelreinigung über Leiharbeit
- Building and Construction General On-site Award, MA000020: Bauhilfsarbeit und Handwerksassistenz

## Was, wenn dein Arbeitgeber sagt, es gelte kein Award?

Das ist fast immer falsch. Ein Award gilt standardmäßig, und es gibt nur drei echte Ausnahmen: ein von der Fair Work Commission genehmigter Tarifvertrag, der den Award verdrängt, eine Senior-Management-Rolle über der höchsten Einstufung des Awards oder eine echte selbstständige Contracting-Vereinbarung unter einer ABN.

Bei der dritten sitzen die meisten echten Streitigkeiten. Wie die Linie gezogen wird, setzt unser Guide zum [Test Angestellter gegen Contractor](/de/blog/employee-vs-contractor-australia) auseinander. Eine ABN in die Hand gedrückt zu bekommen stellt dich für sich noch nicht außerhalb des Awards.

## Wie wird deine Einstufung entschieden?

Über Qualifikationsniveau, Verantwortung, ob du jemanden beaufsichtigst und in manchen Awards über Branchenerfahrung. Die Einstufung folgt den Aufgaben, nicht den Titeln.

Wer Supervisor genannt wird und dieselben Aufgaben wie ein Level-2-Angestellter ausführt, ist Level 2. Häufiger ist der umgekehrte Fall: Wer regelmäßig einen Bereich führt, Speisen vorbereitet oder Neue einarbeitet, ist der Einstiegseinstufung entwachsen, und der Arbeitgeber muss die passende Stufe zahlen.

Die meisten Awards tragen außerdem ein Introductory Level für die erste Zeit in der Branche, nach der du hochgestuft werden musst, sofern kein echter Grund für weitere Einarbeitung besteht. Einen Backpacker ein ganzes Visum lang auf Introductory-Sätzen zu halten ist meist ein Verstoß und weit verbreitet.

## Was ändert ein Tarifvertrag?

Er ersetzt für diesen Arbeitsplatz den Award und muss jeden Angestellten insgesamt besser stellen, als der Award es täte. Die Fair Work Commission prüft das bei der Genehmigung, und eine Vereinbarung, die Arbeitskräfte schlechter stellt, ist nicht durchsetzbar.

In der Praxis übernehmen Vereinbarungen meist die Struktur des Awards und legen etwas dazu: höhere Grundbezahlung, zusätzlichen Urlaub oder verbesserte Zuschläge. Sie sind in den großen Supermarkt- und Hotelgruppen üblich, ein Payslip aus einer solchen Kette gegen die Sätze des Retail Awards zu halten kann also in beide Richtungen irreführen.

## Was macht die Einstufung mit deiner Steuer und deiner Super?

Sie setzt die Löhne, die du hättest bekommen sollen, und alles andere folgt aus dieser Zahl. Eine zu niedrige Einstufung setzt das an das ATO gemeldete Einkommen zu niedrig an und damit auch die darauf gerechneten 12 % Superannuation.

Die Differenz zurückzuholen holt also zwei Beträge statt einem und erhöht das spätere DASP-Guthaben. Zurückgeholter Lohn ist in dem Jahr steuerpflichtig, in dem er zufließt, und nicht in dem, in dem er verdient wurde.

## Award und Stufe: was gilt bei dir?

Award und Stufe entscheiden beide Tatsachen, die du heute feststellen kannst. Keine davon braucht Rechtsberatung, und sie falsch zu treffen lässt eine Unterbezahlungsforderung zusammenbrechen, bevor sie beginnt.

- In welcher Branche der Arbeitgeber tatsächlich tätig ist, denn das entscheidet den Award.
- Was deine Aufgaben wirklich sind, im Gegensatz zur Jobbezeichnung.
- Ob ein Tarifvertrag gilt, der den Award verdrängt.
- Wie lange du in der Branche bist, denn davon hängt ab, ob Introductory-Sätze noch gelten.
- Ob du casual bist, was jedem Satz das 25-%-Loading hinzufügt.
- Ob du unter einer ABN beschäftigt bist, denn dann deckt dich kein Award, und das ist als Erstes zu klären.

Was in jedem Job einbehalten wurde, wird am Ende des Steuerjahres abgerechnet, und du kannst aus deinen Jahreszahlen deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  'understating-income-ato-penalty-working-holiday': {
    title: 'Einkommen zu niedrig angegeben: ATO-Strafen',
    description: 'Wenn das ATO feststellt, dass du Einkommen untererfasst hast, liegen die Verwaltungsstrafen zwischen 25 % und 75 % der vermiedenen Steuer.',
    body: `
Wenn eine [Steuererklärung](/de/tax-return) Einkommen zu niedrig erklärt oder Werbungskosten zu hoch ansetzt, beträgt die Strafe einen Prozentsatz des Steuerfehlbetrags: 25 %, 50 % oder 75 %, je nachdem wie das ATO die Ursache liest. Zinsen laufen ab dem ursprünglichen Fälligkeitsdatum obendrauf. Welche der drei Stufen gilt, entscheidet der Vorsatz, und das ist der einzige Teil davon, den du steuerst.

## Wie viel weiß das ATO bereits?

Fast alles, bevor du einreichst. Single Touch Payroll gibt ihm einen direkten Datenstrom jeder Lohnzahlung, der einbehaltenen Steuer und der an jeden Fonds gemeldeten [Super](/de/superannuation)-Beiträge. Die Lohnseite deiner Erklärung wird gegen eine Aufzeichnung geprüft und nicht auf Treu und Glauben genommen.

Die ABN-Seite ist ebenfalls erfasst, und weniger offensichtlich. Gig-Plattformen wie Uber, DoorDash, Airtasker und Menulog melden unter dem Sharing Economy Reporting Regime, was sie dir gezahlt haben. Betriebe in Bau, Reinigung, Kurierdiensten, Straßengüterverkehr, IT und Sicherheit melden Zahlungen an Contractor unter dem Taxable Payments Reporting. Banken melden Zinsen, Aktien- und Kryptoplattformen melden Veräußerungen. Ausgelassenes Einkommen ist damit nicht versteckt, es passt nur nicht, und die Abweichung wird automatisch gefunden.

## Was entscheidet, welche Strafstufe gilt?

Die Sicht des ATO darauf, warum die Erklärung falsch war. Die drei Stufen trennen sich über die innere Haltung und nicht über den Betrag: Mangel an angemessener Sorgfalt zieht 25 % des Fehlbetrags nach sich, Leichtfertigkeit 50 % und vorsätzliche Missachtung 75 %.

Bei Working Holiday Makern landen die meisten Fälle in der ersten Stufe, weil die übliche Ursache ein vergessener Arbeitgeber oder eine ohne Aufzeichnungen geltend gemachte Position ist. Das ist zugleich die Stufe, in der ein Erlass am häufigsten gewährt wird.

- Mangel an angemessener Sorgfalt: 25 %, der gewöhnliche Backpacker-Fall
- Leichtfertigkeit: 50 %, wo ein erhebliches Risiko, falsch zu liegen, offensichtlich war
- Vorsätzliche Missachtung: 75 %, ausgelassenes Einkommen oder erfundene Positionen

## Was kostet ein Fehlbetrag tatsächlich?

Mehr als die Steuer, und der Multiplikator ist vorhersehbar. Ein Fehlbetrag von 2.000 $ in der 25-%-Stufe fügt eine Strafe von 500 $ hinzu, ergibt also 2.500 $ vor Zinsen. Dieselben 2.000 $ in der 75-%-Stufe fügen 1.500 $ hinzu, ergibt also 3.500 $.

Der General Interest Charge läuft danach auf die unbezahlte Steuer ab dem ursprünglichen Fälligkeitsdatum, zinst täglich auf und liegt deutlich über dem Leitzins. Abweichungen aus dem Datenabgleich tauchen üblicherweise ein bis zwei Jahre nach der Abgabe auf, die Zinsen sind also meist ein spürbarer Anteil der Endsumme.

## Was löst tatsächlich eine Prüfung aus?

Eine Abweichung zwischen zwei Aufzeichnungen, die übereinstimmen sollten. Die meisten Prüfungen von Working-Holiday-Maker-Erklärungen beginnen automatisch, binnen Wochen nach der Abgabe, und starten mit einem Brief, der um Informationen bittet.

- Erklärtes Einkommen niedriger als die Single-Touch-Payroll-Aufzeichnung
- Von Uber, DoorDash oder Airtasker gemeldetes Plattformeinkommen, das in der Erklärung fehlt
- Ein Arbeitgeber in der ATO-Aufzeichnung, der in der Erklärung gar nicht auftaucht
- Eine Werbungskostenposition weit außerhalb der Spanne für diese Tätigkeit und dieses Einkommensniveau
- Eine Erklärung, die vor dem Abschluss der Arbeitgebermeldungen eingereicht wurde, sodass sich die Zahlen danach bewegt haben

## Was, wenn du Australien bereits verlassen hast?

Die Schuld bleibt, und die Möglichkeit, sie einzutreiben, ebenfalls. Ein offener ATO-Betrag verfällt nicht dadurch, dass du nach Hause geflogen bist, und der General Interest Charge läuft weiter darauf.

Drei Folgen, und die erste erwischt die Leute. Künftige Erstattungen können gegen die Schuld einbehalten werden, unter Umständen auch eine [DASP-Zahlung](/de/superannuation), auf die du gezählt hast. Größere Beträge können zur internationalen Eintreibung übergeben werden. Und eine ungelöste Lage liegt in deinem Datensatz, wo Home Affairs sie sieht, wenn du ein weiteres australisches Visum beantragst.

## Was hält eine Erklärung verteidigungsfähig?

Zuerst Vollständigkeit, dann Nachweisbarkeit. Jeder Arbeitgeber für jeden Job, wie kurz auch immer, plus alles ABN- und Plattformeinkommen, beseitigt die häufigste Ursache eines Fehlbetrags, bevor überhaupt Werbungskosten beurteilt werden.

Die zweite Hälfte ist, nur das geltend zu machen, was du stützen kannst. Eine Position mit einer Aufzeichnung dahinter übersteht eine Prüfung, dieselbe ohne wird zu einem Fehlbetrag mit Strafe. Eine größere Erstattung, die sich zwei Jahre später mit Strafe und aufgezinsten Zinsen auflöst, ist weniger wert als eine kleinere, die hält.

Deshalb ist jeder zu meiden, der im Tausch gegen TFN und Pass eine aufgeblähte Erstattung verspricht. Das Modell funktioniert, indem Unwahres geltend gemacht wird, und die Strafe wird gegen dich festgesetzt und nicht gegen ihn. Wer deine Daten verlangen darf, steht in unserem Guide zum [Schutz deiner TFN](/de/blog/tfn-security-protect-from-fraud).

## Ist es billiger, es vor dem ATO zu korrigieren?

Erheblich, und der Unterschied ist im Strafsystem angelegt. Eine freiwillige Offenlegung vor Beginn einer Prüfung zieht eine deutliche Minderung der Fehlbetragsstrafe nach sich, eine danach eine geringere. Derselbe Fehler kostet unterschiedlich viel, je nachdem wer ihn zuerst gefunden hat.

Eine entdeckte Auslassung ist damit keine Katastrophe. Ein vergessener Arbeitgeber, Plattformeinkommen, von dessen Meldung du nichts wusstest, oder eine Position, die du doch nicht belegen kannst, sind alle über eine [Berichtigung der Erklärung](/de/blog/amending-tax-return-australia) reparierbar, und das vor einem Brief zu tun hält die Kosten nahe an der Steuer selbst.

## Wie lange darf das ATO hinsehen?

Zwei Jahre bei den meisten Privatpersonen, laufend ab dem Datum des Bescheids, danach ist die Veranlagung in der Regel in beide Richtungen endgültig. Es ist dasselbe Fenster, in dem du eine Erklärung zu deinen Gunsten ändern kannst.

Die Ausnahme macht vorsätzliche Auslassung zu einer anderen Risikokategorie. Wo Betrug oder Steuerhinterziehung vorliegt, gibt es keine Frist, und das ATO kann ein Jahr unbefristet wieder aufmachen. Eine unordentliche Erklärung wird nach zwei Jahren sicher, eine wissentlich falsche nie.
`,
  },

  '1000-dollar-instant-deduction-rule-2026': {
    title: 'Neuer 1.000-$-Sofortabzug ab 1. Juli 2026',
    description: 'Ab 1. Juli 2026 können Working Holiday Maker eine Sofortabschreibung von 1.000 $ für arbeitsbezogene Ausgaben ohne Belege geltend machen. Wer profitiert, und wann die tatsächlichen Kosten mehr wert sind.',
    body: `
Ab dem 1. Juli 2026 kannst du pauschal 1.000 $ für berufsbezogene Ausgaben ohne Belege geltend machen oder deine tatsächlichen Kosten mit vollständigen Aufzeichnungen. Du wählst für das Jahr eines von beidem, nicht beides. Was besser ist, hängt davon ab, was dein Job dich hat kaufen lassen.

## Was ersetzen die pauschalen 1.000 $?

Sie ersetzen die Nachweispflicht, nicht die Werbungskostenposition selbst. Du schreibst 1.000 $ in die Zeile für berufsbezogene Ausgaben, ohne Belege, Fahrtenbücher oder Aufzeichnungen dahinter. Das beseitigt den häufigsten Grund, warum Working Holiday Maker gar nichts geltend machen.

Sie decken dasselbe Gebiet ab wie die Nachweisregeln, also die gewöhnlichen Arbeitsausgaben eines Backpacker-Jahres: Schutzkleidung und ihre Wäsche, Werkzeug und kleine Ausrüstung, der Arbeitsanteil eines Handytarifs, berufsbezogene Fahrzeugnutzung, Lizenzen und Registrierungen, Weiterbildung mit Bezug zu deinem bestehenden Job. Nicht erfasst ist alles außerhalb der Kategorie berufsbezogen, etwa Spenden oder Anlagekosten. Die behalten ihre eigenen Regeln und werden weiterhin getrennt geltend gemacht.

## Wann sind die pauschalen 1.000 $ die bessere Wahl?

Wenn deine echten Arbeitsausgaben im Jahr unter 1.000 $ lagen, die gewöhnliche Lage in Gastronomie, Einzelhandel und Cafearbeit. Wer als einzige echte Kosten ein paar schwarze Hemden, Wäsche und einen Anteil seines Handytarifs hatte, macht rechtmäßig mehr geltend, als er ausgegeben hat.

Sie ist auch dann die bessere Wahl, wenn die Ausgaben echt waren, die Aufzeichnungen aber nicht. Beim Hostelwechsel verlorene Quittungen, Dutzende kleiner Käufe ohne Papiere: Das wird irrelevant, sobald der Pauschalbetrag übersteigt, was du hättest beweisen können.

## Wann sind die tatsächlichen Kosten besser?

Wenn der Job Ausrüstung verlangt hat. Ein Bauhelfer mit Stiefeln, Helm, Warnkleidung und Handwerkzeug aus einer Saison oder ein Rideshare-Fahrer, der ein Auto für die Arbeit betreibt, überschreitet 1.000 $ normalerweise allein beim Fahrzeug. Belege verschaffen ihm den vollen Betrag statt eines gedeckelten.

Die Fahrzeugnutzung entscheidet das am häufigsten. Mit 91 Cent pro Kilometer nach der Cent-pro-Kilometer-Methode überschreitet ein Fahrer mit ein paar tausend Arbeitskilometern die 1.000 $ deutlich, bevor irgendetwas anderes gezählt wird. Diese Position braucht die Aufzeichnungen dazu.

- Werkzeug und Ausrüstung über gelegentliche Käufe hinaus
- Selbst gekaufte statt gestellte Schutzausrüstung
- Berufsbezogene Fahrzeugkilometer zu je 91 Cent
- Ein Handy- und Datentarif, der wesentlich beruflich genutzt wird

## Kannst du den Pauschalbetrag nehmen und etwas dazulegen?

Nein. Es ist die eine oder die andere Methode für die gesamte Kategorie berufsbezogener Ausgaben im Jahr. Pauschale plus einen belegten Werkzeugkauf obendrauf geht nicht.

Die Wahl muss deshalb nach dem Rechnen getroffen werden, nicht davor. Ausgaben von 1.200 $, unter dem Pauschalbetrag geltend gemacht, verschenken 200 $. Dieselben 1.200 $ mit Belegen werden voll geltend gemacht. Liegen die Methoden nah beieinander, ist der Pauschalbetrag meist trotzdem besser, sobald der Aufwand fürs Sammeln gegen die Differenz gewogen wird.

## Für welches Steuerjahr gilt sie?

Für das Jahr 2026-27, das vom 1. Juli 2026 bis 30. Juni 2027 läuft und ab Juli 2027 eingereicht wird. Sie wirkt nicht rückwirkend. Für eine Erklärung 2025-26 oder früher tut sie nichts, und diese folgen weiterhin den bestehenden Nachweisregeln, einschließlich der [300-$-Schwelle für Werkzeug und Ausrüstung](/de/blog/tools-equipment-under-300-instant-deduction-whv).

Für einen Working Holiday Maker entscheidet der Zuschnitt deines Jahres. Wer Anfang 2026 angekommen ist, hat Einkommen über zwei Steuerjahre unter zwei Regelwerken, und dieselbe Ausgabe kann je nach Seite des 30. Juni 2026 unterschiedlich behandelt werden. Das lohnt es zu wissen, bevor du Quittungen wegwirfst.

## Was ist die Position für dich tatsächlich wert?

Weniger als die Schlagzeile, denn eine Werbungskostenposition senkt das zu versteuernde Einkommen, nicht die Steuer. Zum Working-Holiday-Maker-Satz von 15 % senkt eine Position von 1.000 $ die zahlbare Steuer um 150 $. Das ist die Zahl für die Entscheidung, ob sich die Belegarbeit lohnt.

Über 45.000 $ steigt der Satz auf 30 % und dieselbe Position ist 300 $ wert, aber sehr wenige Working Holiday Maker erreichen diese Stufe in einem Jahr. Die Regel ist visastatusneutral und gilt für 417- wie 462-Inhaber und australische Residenten gleich. An der [Steuererklärung](/de/tax-return) ändert sich nichts außer der Wahl der Methode.

## Was braucht auch unter dem Pauschalbetrag noch Aufzeichnungen?

Alles außerhalb der berufsbezogenen Ausgaben, denn nur dort ersetzt der Pauschalbetrag den Nachweis. Spenden, die Kosten für die Verwaltung deiner Steuerangelegenheiten einschließlich der Steuerberatergebühr des Vorjahres und Prämien für Einkommensschutz stehen in eigenen Posten der Erklärung und behalten ihre eigenen Aufzeichnungsregeln.

Dasselbe gilt auf der Einkommensseite. Bareinkommen, ABN-Einnahmen und Plattformzahlungen müssen weiterhin erfasst und erklärt werden. Der Pauschalbetrag vereinfacht eine Zeile der Erklärung, nicht die Erklärung als Ganzes.

## Ändert das, was du im Laufe des Jahres aufheben solltest?

Nicht sofort. Du kannst nicht wissen, ob die pauschalen 1.000 $ oder die tatsächliche Summe besser sind, bevor das Jahr vorbei ist. Quittungen im Oktober wegzuwerfen, weil du den Pauschalbetrag nehmen willst, verbaut die Wahl, bevor du sie treffen kannst.

Die Gewohnheit, die nichts kostet, ist Quittungen bei ihrem Anfall zu fotografieren und im Juli zu entscheiden. Für ein Gastronomie- oder Einzelhandelsjahr gewinnt der Pauschalbetrag fast sicher und die Fotos waren unnötig. Für ein Bau- oder Fahrjahr wird die Summe sehr wahrscheinlich über 1.000 $ liegen, und die Fotos sind der Unterschied zwischen der echten Zahl und der gedeckelten.
`,
  },

  'bicycle-motorcycle-vehicle-deductions-working-holiday': {
    title: 'Fahrrad, Roller oder Van: Kosten absetzen',
    description: 'Auch Fahrräder, Motorräder, Roller und Vans lassen sich als Fahrzeugkosten absetzen. Was absetzbar ist und wie du es dokumentierst.',
    body: `
Mehr, als die meisten Fahrer denken. Ein Fahrrad, E-Bike, Scooter oder Motorrad, mit dem du Einkommen erzielst, ist ein Arbeitsmittel, und Anschaffung, Reparaturen und Betriebskosten sind zum beruflichen Nutzungsanteil absetzbar. Für Autos gibt es zwei vereinfachte Methoden. Alles andere läuft über tatsächliche Kosten.

## Was entscheidet, ob du ein Fahrzeug überhaupt absetzen kannst?

Ob das Fahrzeug dir Einkommen erwirtschaftet und ob du Angestellter bist oder unter einer ABN arbeitest. Das entscheidet alles Weitere auf dieser Seite.

Ein Lieferfahrer mit ABN, der für Uber Eats, DoorDash oder Menulog fährt, nutzt das Rad zur Einkommenserzielung, und das Rad ist ein Betriebsmittel. Ein Angestellter, der zu einem festen Arbeitsplatz fährt, pendelt, und Pendeln ist Privatfahrt und nicht absetzbar. Auf diese Unterscheidung schaut ein Prüfer zuerst.

## Was kann ein Lieferfahrer tatsächlich absetzen?

Das Fahrzeug selbst und was sein Betrieb kostet, jeweils zum beruflichen Nutzungsanteil. Das Wirtschaftsgut wird je nach Anschaffungspreis sofort oder über die Nutzungsdauer geltend gemacht, die Betriebskosten dann, wenn sie anfallen.

- Das Fahrrad, E-Bike oder der Scooter selbst. Unter 300 $ ist es sofort in voller Höhe absetzbar, und ab dem 1. Juli 2026 gilt eine Sofortabschreibungsgrenze von 1.000 $. Darüber wird über die Nutzungsdauer abgeschrieben, typischerweise drei bis fünf Jahre.
- Reparaturen und Verschleißteile: Schläuche, Reifen, Ketten, Bremsbeläge, Inspektionen.
- Ausrüstung: Helm, Lichter, Schloss, Satteltaschen, Liefertasche, Handyhalter.
- Strom zum Laden eines E-Bike-Akkus, auf Basis einer nachvollziehbaren Schätzung des beruflichen Anteils.
- Versicherung, die speziell das Fahrzeug abdeckt.

Ein Rad, das zu 80 % für Lieferungen und zu 20 % privat genutzt wird, ergibt über alles einen Anspruch von 80 %. Dieser Prozentsatz braucht eine Grundlage. Ein paar Wochen repräsentativer Aufzeichnungen reichen normalerweise.

## Was ist bei Autos anders?

Autos sind die einzige Fahrzeugklasse mit vereinfachten Methoden, und es gibt zwei. Ein Auto ist hier ein Fahrzeug für weniger als neun Personen und unter einer Tonne.

**Cent pro Kilometer** zahlt einen Pauschalsatz je beruflichem Kilometer, derzeit 91 Cent, gedeckelt bei 5.000 Kilometern pro Auto und Jahr. Statt jedes einzelnen Belegs braucht es nur eine nachvollziehbare Grundlage für die Schätzung.

**Die Fahrtenbuchmethode** ermittelt aus zwölf zusammenhängenden Wochen einen beruflichen Anteil und wendet ihn auf deine tatsächlichen Jahreskosten an: Treibstoff, Inspektionen, Zulassung, Versicherung und Abschreibung. Das Fahrtenbuch bleibt fünf Jahre gültig.

Wer ernsthaft fährt, vor allem Rideshare-Fahrer, kommt mit dem Fahrtenbuch fast immer auf den größeren Abzug, denn 5.000 Kilometer sind eine niedrige Decke. Dafür müssen die zwölf Wochen tatsächlich geführt worden sein.

## Was gilt für Motorräder und schwere Utes?

Beides ist hier kein Auto, bekommt also weder Cent pro Kilometer noch das Fahrtenbuch, sondern läuft über tatsächliche Kosten, aufgeteilt nach beruflicher Nutzung: Treibstoff, Zulassung und CTP, Versicherung, Wartung, Reifen, Maut und Parken sowie Schutzkleidung, die für die Arbeit nötig ist.

Damit sind die Belege der Engpass. Jede geltend gemachte Position braucht einen Nachweis. Wer in Perth oder Darwin einen Ute ohne Belege fährt, hat einen echten Abzug und keine Möglichkeit, ihn zu belegen.

## Was wird am häufigsten übersehen?

Die kleinen wiederkehrenden Kosten. Maut auf Arbeitsfahrten, die sich in Sydney, Melbourne und Brisbane über ein Jahr zu einer ernsthaften Summe addiert. Parken während der Arbeit. Fahrzeugreinigung bei Rideshare-Fahrern. Strom fürs E-Bike. Schutzkleidung.

Am häufigsten übersehen wird die Abschreibung des Fahrrads, weil Fahrer annehmen, das ATO interessiere sich nicht für ein Rad. Ein E-Bike für 1.800 $, überwiegend für Lieferungen genutzt, ist einer der größeren Abzüge, die ein Fahrer je haben wird.

## Wie belegst du den beruflichen Nutzungsanteil?

Mit einem repräsentativen Zeitraum statt mit einer Zahl aus dem Bauch. Ein paar Wochen mit Datum, Zweck und ungefährer Strecke tragen normalerweise einen Prozentsatz für das ganze Jahr, solange der Zeitraum typisch war. Eine Erntewoche als Grundlage für ein Jahr mit drei Monaten Farmarbeit ist es nicht.

Zwei Details entscheiden, ob der Nachweis hält. Er muss zeigen, warum die Fahrt beruflich war, und aus der Zeit der Fahrten stammen. Im September für den vergangenen März ein Fahrtenbuch zu schreiben ist eine Rekonstruktion und wird als solche behandelt.

## Was passiert mit dem Fahrzeug, wenn du Australien verlässt?

Verkaufst du ein abgeschriebenes Rad oder einen Scooter, hat der Verkauf steuerliche Folgen. Der bereits geltend gemachte Anteil wird gegen den Verkaufserlös gegengerechnet, und ein Verkauf über dem Restbuchwert kann einen kleinen steuerpflichtigen Betrag erzeugen.

Bei Backpacker-Fahrzeugen ist der Betrag klein, aber der Verkauf gehört in das Steuerjahr, in dem er passiert, sonst braucht es später eine Berichtigung. Wer das Rad verschenkt oder zurücklässt, hat nichts zu melden und behält den Abzug.

## Was gilt für ein Fahrzeug, das dir nicht gehört?

Ein geliehenes oder gemietetes Fahrzeug verschiebt die Frage von der Abschreibung auf die tatsächlich getragenen Kosten. Zahlst du für die Nutzung, etwa Mietgebühren oder einen Anteil am Treibstoff, sind diese Zahlungen zum beruflichen Anteil absetzbar. Fährst du kostenlos, entsteht kein Abzug.

Gehört das Fahrzeug dir gemeinsam mit einer anderen Person, steht dir der Abzug für deinen Anteil an den gezahlten Kosten zu. Entscheidend ist nicht, wer im Fahrzeugschein steht, sondern wer die Rechnungen bezahlt hat. Deshalb lohnt es sich, Treibstoff und Wartung von einem eigenen Konto zu zahlen.

## Welche Belege verlangt welche Methode?

Jede Methode hat ihre eigene Beweislast. Die falsche Kombination aus Methode und vorhandenen Unterlagen ist der häufigste Grund, warum ein echter Abzug nicht hält, und sie entsteht Monate vor der Steuererklärung.

- Cent pro Kilometer: eine nachvollziehbare Schätzung der beruflichen Kilometer für das Jahr, gestützt auf einen repräsentativen Zeitraum, gedeckelt bei 5.000 Kilometern pro Auto und Jahr
- Fahrtenbuchmethode: zwölf zusammenhängende Wochen Aufzeichnung, alle Belege für Treibstoff, Inspektionen, Zulassung und Versicherung des Jahres sowie die Abschreibungsdaten
- Tatsächliche Kosten bei Rädern, Motorrädern und schweren Fahrzeugen: ein Beleg für jede geltend gemachte Position und eine nachvollziehbare Grundlage für den beruflichen Anteil

Die Fahrtenbuchmethode ist die einzige, die sich nachträglich nicht herstellen lässt. Wer im Juni feststellt, dass er sie gebraucht hätte, ist für dieses Jahr auf Cent pro Kilometer beschränkt.

## Status und Fahrzeugklasse: wo stehst du?

Fahrzeugabzüge hängen an deinem Beschäftigungsstatus und deiner Fahrzeugklasse, nicht an der Höhe deiner Ausgaben.

- Ob du Angestellter bist oder auf einer ABN. Pendeln ist für Angestellte privat, und das ist die größte einzelne Verzweigung.
- Welche Fahrzeugklasse es ist, denn nur Autos bekommen die vereinfachten Methoden.
- Ob ein Zwölf-Wochen-Fahrtenbuch existiert, denn es lässt sich nicht rückwirkend anlegen.
- Welcher Anteil der Nutzung wirklich beruflich ist und ob du für diese Zahl eine belegbare Grundlage hast.
- Ob die Anschaffungskosten unter oder über der Sofortabschreibungsgrenze des jeweiligen Jahres liegen.
- Ob der größte Teil deines ABN-Einkommens von einem Zahler kommt, denn die Regeln zu Personal Services Income können einschränken, was dagegen absetzbar ist.

Fahrzeugansprüche werden über deine [Steuererklärung als Working Holiday Maker](/de/tax-return) geltend gemacht, und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du eine grobe Zahl für die Jahreskosten hast.

`,
  },

  'dasp-vs-leaving-super-in-australia-pros-cons': {
    title: 'DASP beantragen oder Super liegen lassen?',
    description: 'Bleibt die Super im Fonds, zehren Gebühren daran, und besteuert wird sie später trotzdem mit 65 %. Für die meisten lohnt der DASP-Antrag.',
    body: `
Für die meisten Working Holiday Maker, die endgültig abreisen, ist Beantragen die bessere Antwort: Die Quellensteuer von 65 % gilt, wann immer du beantragst, Warten senkt die Steuer also nicht. Warten setzt das Guthaben nur den Gebühren aus. Die eine echte Ausnahme ist die Daueraufenthaltsgenehmigung.

## Wie sieht der Vergleich tatsächlich aus?

Nimm 5.000 $, die am Tag deines Heimflugs in einem australischen Fonds liegen. Sie jetzt zu beantragen ergibt rund 1.750 $ auf ein Auslandskonto, typischerweise binnen 28 Tagen bei vollständigem Antrag: Die steuerpflichtige Komponente wird mit 65 % einbehalten, und das ist bei einem Working Holiday Maker im Kern das ganze Guthaben.

Es liegen zu lassen bewahrt keine 5.000 $. Das Konto gewinnt oder verliert weiter, was die Anlage tut, zahlt weiter Gebühren und bleibt aus dem Ausland unzugänglich, solange du nicht beantragst, und dann gelten dieselben 65 %. Die Steuer folgt dem Geld, nicht dem Zeitpunkt.

## Was passiert mit Super, den du zurücklässt?

Er schrumpft, meist schneller als erwartet, weil drei getrennte Kosten gegen das Guthaben laufen und keine Beiträge dafür. Bei einem kleinen Guthaben können diese Kosten das Konto in wenigen Jahren aufzehren.

- Verwaltungsgebühren, üblicherweise 50 bis 130 $ pro Jahr unabhängig vom Guthaben
- Versicherungsprämien, automatisch abgezogen, sofern nicht gekündigt, üblicherweise 300 bis 800 $ pro Jahr
- Vermögensbasierte Gebühren von rund 0,5 % bis 1,5 % des Guthabens pro Jahr

Bei einem typischen Working-Holiday-Guthaben von 2.000 bis 10.000 $ überholt diese Gebührenlast meist jede realistische Anlagerendite. Die Versicherung ist der Killer: 500 $ pro Jahr für einen Todesfall- und Invaliditätsschutz in einem Land, das du verlassen hast, sind ein Zehntel des Guthabens für eine Police, aus der nie etwas beansprucht wird.

Irgendwann meldet der Fonds das Guthaben als unclaimed und überträgt es ans ATO, wo weiterhin dieselben 65 % gelten.

## Wann ist Liegenlassen wirklich richtig?

Wenn du eine Daueraufenthaltsgenehmigung verfolgst, und eigentlich nur dann. Wirst du australischer Permanent Resident, wird aus dem Guthaben gewöhnliche Superannuation mit gewöhnlicher und weit besserer Besteuerung. Darauf zu warten lohnt sich, wenn der Weg glaubwürdig ist.

Alles andere zerfällt bei genauem Hinsehen. Eine Rückkehr binnen zwei oder drei Jahren auf einem anderen temporären Visum ist kein Grund zu warten, denn neue Arbeit baut neuen Super und das alte Guthaben zahlt derweil nur Gebühren. Ein großes Guthaben ist ein schwächerer Grund, als es aussieht, denn die 65 % gelten auch für die größere Zahl.

## Wann ist Beantragen eindeutig richtig?

Wenn du abreist und nicht auf einem dauerhaften Weg zurückkommst, und das trifft auf die meisten zu. Am stärksten ist der Fall, wenn das Guthaben klein genug ist, dass Gebühren es aufzehren, wenn du das Geld jetzt brauchen kannst und wenn du deine australische Finanzposition schließen willst, solange Bankdaten, Adresse und Pass aktuell sind.

Der letzte Punkt verdient mehr Gewicht. Die Leute, die nie beantragen, haben sich fast nie dagegen entschieden. Sie wollten es später erledigen, wechselten dann Adresse, Bank und Pass und waren für einen Superfonds nicht mehr auffindbar. Im dritten Jahr ist der Antrag deutlich schwerer als im ersten Monat.

## Ist die Entscheidung umkehrbar?

Nein. Einmal beantragt, ist das Geld draußen und kann nicht zurückgelegt werden, und ein späteres australisches Visum beginnt ein frisches Konto. Das ist der ehrliche Nachteil des Beantragens, und deshalb zählt der Fall der Daueraufenthaltsgenehmigung.

In die andere Richtung gibt es keine Frist. Ein Antrag lässt sich aus dem Ausland zu jedem Zeitpunkt stellen, sobald dein Visum beendet ist und du ausgereist bist, notfalls Jahre später, zum selben Satz.

## Ändert ein zweites Visum etwas?

Nicht so, wie erhofft. Der Satz von 65 % hängt an Super, der während einer Working-Holiday-Visumsphase angesammelt wurde, auch wenn spätere Beiträge unter einem anderen temporären Visum fließen. Auf einem Studenten- oder Fachkräftevisum zurückzukommen wäscht das frühere Guthaben nicht in einen niedrigeren Satz.

Den Satz bestimmt das Visum, auf dem die Beiträge geleistet wurden, nicht das Visum, das du beim Antrag hältst.

## Was solltest du vor der Entscheidung prüfen?

Drei Dinge. Erstens, welche Fonds Beiträge auf deinen Namen halten, denn vier Arbeitgeber bedeuten häufig drei oder vier Konten, und ein Guthaben, von dem du nichts weißt, fällt aus der Rechnung. Zweitens, ob auf jedem Konto eine Versicherung läuft, der Posten, der ein kleines Guthaben am schnellsten auffrisst. Drittens, ob Adresse und Bankverbindung, die der Fonds führt, noch zu dir passen.

Wer sich fürs Warten entscheidet, sollte mindestens die nicht gebrauchten Versicherungen kündigen und die Konten zusammenlegen, bevor er fliegt. Das ist der Unterschied zwischen einem Guthaben, das langsam wächst, und einem, das leise verschwindet.

## Was passiert, wenn du dich gar nicht entscheidest?

Dann entscheidet der Fonds für dich, in Stufen. Zuerst laufen Gebühren und Prämien weiter, während keine Beiträge mehr kommen. Dann verliert der Fonds den Kontakt, weil Post an eine Adresse geht, die du längst verlassen hast. Schließlich wird das Guthaben als unclaimed gemeldet und ans ATO übertragen, wo es keine Gebühren mehr zahlt, aber auch nichts mehr erwirtschaftet.

Das ist das häufigste Ergebnis, und es ist keine Entscheidung, sondern das Ausbleiben einer. Das Geld bleibt beanspruchbar, aber jeder Schritt macht den Antrag schwerer, weil sich Pass, Adresse und Bankverbindung ändern.

## Was macht das ATO mit übertragenem Guthaben?

Es hält es unbefristet. Fondsgebühren und Versicherungsprämien fallen dort nicht mehr an, das Guthaben hört also auf zu schrumpfen. Verzinst wird es ungefähr auf Inflationsniveau: nominal leicht wachsend, real ungefähr stehend.

Anlageerträge gibt es dort nicht, und die 65 % gelten weiterhin, wann immer du es beanspruchst. Für ein kleines Guthaben ist der Weg über das ATO also besser als ein Fonds, der es mit Gebühren aufzehrt, und schlechter als der Antrag, der es dir jetzt auszahlt.

## Was solltest du tun, wenn du dich für den Antrag entscheidest?

Die Reihenfolge zählt, weil zwei Punkte sich nicht nachholen lassen. Ein Antrag setzt voraus, dass Visumsende und Ausreise erfasst sind und dass Name und Geburtsdatum in den Daten jedes Fonds zu deinem Pass passen. Stimmt eines davon nicht, hängt der Antrag.

Die Bankverbindung ist die Entscheidung, die am häufigsten falsch getroffen wird. Ein australisches Konto zahlt schneller aus, muss aber offen bleiben, bis das Geld da ist. Ein Auslandskonto dauert ein paar Tage länger und ist die richtige Wahl, wenn du das australische ohnehin schließen willst. Beides zugleich geht nicht, denn die Empfängerdaten sind Teil des Antrags und lassen sich danach nur mit einem neuen Antrag ändern.

## Wie lange bleibt dein Guthaben noch liegen?

Die Steuer ist gleich, wann immer du beantragst, die Entscheidung dreht sich also um Gebühren, Zeit und deine eigenen Pläne. Diese Fakten bewegen die Antwort:

- Ob eine Daueraufenthaltsgenehmigung eine reale Aussicht ist. Das ist der einzige starke Fall fürs Warten.
- Ob weiterhin Versicherungsprämien vom Konto abgezogen werden, der schnellste Weg, auf dem ein Guthaben verschwindet.
- Wie viele Fonds Beiträge für dich halten, denn Gebühren fallen pro Konto an und mehrere kleine Guthaben sind der schlechteste Fall.
- Ob das Guthaben bereits ans ATO übertragen wurde, was das Gebührenbluten stoppt, aber auch die Renditen.
- Ob Bankkonto, Adresse und Pass noch die sind, die der Fonds gespeichert hat.
- Ob deine Steuererklärung für das letzte Jahr ebenfalls offen ist, was getrenntes Geld ist und meist die bessere Nachricht.

Berechtigung, Unterlagen und Timing stehen dort, wo du deine [Superannuation nach der Abreise auszahlen lässt](/de/superannuation), und die Erklärung für das letzte Jahr ist ein eigener Anspruch, den du gesondert [schätzen](/de/calculator) kannst.

`,
  },

  'fruit-picking-jobs-working-holiday-australia': {
    title: 'Obstpflücken: Lohn, 88 Tage und Fallen',
    description: 'Obstpflücken ist der häufigste Weg zu den 88 Tagen Regionalarbeit für ein zweites Visum. Wo finden, was verdienen und wie du dich vor Wage Theft schützt.',
    body: `
Obstpflücken wird entweder nach Stunde oder nach Kiste bezahlt, und in beiden Fällen garantiert der [Horticulture Award](/de/blog/horticulture-award-working-holiday-makers) eine stündliche Mindestuntergrenze. Tage zählen für die 88 nach Kalendertagen und nicht nach Stunden. Was über dein Jahr entscheidet, ist die Farm und nicht das Obst.

## Was zahlt Pflücken tatsächlich?

In zwei Formen, und bei der zweiten entstehen die Auseinandersetzungen. Ein Stundensatz muss auf oder über dem Award-Minimum deiner Einstufung liegen, bei Casuals mit 25 % Loading obendrauf. Ein Akkordsatz zahlt pro Kiste, Eimer, Tray oder Kilogramm.

Seit der Award-Änderung von 2022 muss eine Akkordvereinbarung so gesetzt sein, dass ein durchschnittlich kompetenter Pflücker mindestens das Casual-Stundenminimum erreicht. Farmen, die ein paar Dollar pro Eimer bewerben und damit einen Bruchteil des Minimums zahlen, verhandeln nicht hart, sie handeln rechtswidrig. Wie die Garantie funktionieren soll, behandelt unser Guide zu [Akkordlohn](/de/blog/piece-rates-farm-work-working-holiday).

## Wo und wann gibt es die Arbeit?

Der Erntekalender wandert im Lauf des Jahres über den Kontinent, ihm zu folgen ist also ein gangbarer Weg zu den 88 Tagen. Verschiedenes Obst reift in verschiedenen Regionen in vorhersehbarer Abfolge.

- Mangos: Northern Territory und Nordqueensland, September bis Januar
- Bananen: Queensland ganzjährig, Höhepunkt Dezember bis Mai
- Erdbeeren: Queensland April bis Oktober, Victoria und Tasmanien im Sommer
- Äpfel: Tasmanien, Victoria, NSW und WA, Februar bis Mai
- Zitrusfrüchte: Riverina, Sunraysia und South Australia, Mai bis Oktober
- Steinobst: Victoria, NSW und South Australia, November bis März
- Weintrauben: South Australia, Victoria und NSW, Januar bis April

Regionen werden voll. Zu Beginn der Zitrussaison in Mildura anzukommen ist etwas anderes als sechs Wochen später, und die Farmen mit den schlechtesten Zahlungspraktiken stellen spät noch ein.

## Was macht einen Tag für die 88 zählbar?

Vier Bedingungen zusammen. Die Arbeit muss in einer ausgewiesenen regionalen Postleitzahl liegen, in einer berechtigten Branche, bezahlt statt ehrenamtlich sein und gut genug dokumentiert, um beweisbar zu sein.

Tage zählen als gearbeitete Kalendertage und nicht nach Stunden, ein kurzer Tag zählt also wie ein langer, sofern es ein echter bezahlter Arbeitstag war. An der Dokumentation scheitern die Anträge: Home Affairs stützt sich auf Payslips, Arbeitgeberschreiben und an das ATO gemeldetes Einkommen, und Bararbeit erzeugt nichts davon.

Deshalb lehnt man Bargeld auf einer Farm ab, noch vor dem steuerlichen Grund: Acht nicht gemeldete Wochen sind acht Wochen an Tagen, die du nicht beweisen kannst.

## Bist du Angestellter oder Contractor?

Die meisten Obstpflücker sollten Angestellte sein, mit einbehaltener Steuer, gezahlten 12 % [Superannuation](/de/superannuation) und geltendem Award. Manche Farmen setzen Pflücker stattdessen auf eine ABN. Das entfernt die Superpflicht, die Angestelltenform der Mindestgarantie und meist den Unfallversicherungsschutz und verschiebt die Steuerrechnung auf dich.

Die Einstufung entscheiden die Tatsachen der Arbeit. Bestimmt die Farm, wann du anfängst, wo und wie du pflückst, stellt die Ausrüstung und kannst du niemanden an deiner Stelle schicken, bist du Angestellter, was auch immer der Vertrag sagt. Den Test setzt unser Guide zum [Status Angestellter gegen Contractor](/de/blog/employee-vs-contractor-australia) auseinander.

## Was solltest du aufheben, und warum?

Farmunterlagen dienen zwei Herren, dem ATO und Home Affairs, und dieselben Dokumente befriedigen beide. Sie laufend zu führen ist einfacher, als sie im Oktober aus einem Hostel in Cairns zu rekonstruieren.

- Jeden Payslip von jeder Farm und jeder Leiharbeitsfirma
- Kontoauszüge, die den Eingang der Löhne zeigen
- Ein einfaches Tagebuch: Datum, Farm, Stunden
- Fotos von dir am Arbeitsort
- Belege für Stiefel, Handschuhe und Sonnenschutz

Das Tagebuch wird übersprungen und später gebraucht. Eine Saison über vier Farmen mit zwei Leiharbeitsfirmen verschwimmt binnen Monaten, und beurteilt wird die Tageszahl.

## Was kann ein Pflücker zur Steuerzeit geltend machen?

Die Positionen sind einzeln klein und summieren sich über eine Saison. Alle folgen derselben Regel: Du hast es gekauft, es hat dein Einkommen erzeugt, niemand hat es dir erstattet, und du hast den Beleg.

- Sonnenschutz, einschließlich Hüten, Sonnencreme und langärmligen Shirts
- Arbeitsstiefel und Schutzschuhe
- Handschuhe
- Eigene Pflückausrüstung, wo du sie gestellt hast
- Ein Anteil der Fahrzeugkosten für Fahrten zwischen Farmen während eines Arbeitstages
- Der Arbeitsanteil der Handykosten

Vom Lohn abgezogene Unterkunft ist eine andere und oft strittige Frage. Kosten für Unterkunft auf der Farm können zulässig sein, aber nur in Grenzen und nur bei ordentlicher Vereinbarung, und überhöhte Unterkunftskosten sind eines der bekannten Unterbezahlungsmuster.

## Was unterscheidet eine gute Farm von einer schlechten?

Der Fair Work Ombudsman hat wiederholt landesweite Kampagnen im Gartenbau geführt und findet immer dieselben Verhaltensweisen. Sie treten gebündelt auf und sind früh erkennbar.

- Akkordsätze unter der Mindestgarantie, ohne Aufstockung an langsamen Tagen
- Überhöhte Unterkunftskosten, vom Lohn abgezogen
- Lohn, der bis zum Abschluss der 88 Tage einbehalten und dann in der Zählung bestritten wird
- Keine ausgestellten Payslips
- Nur ein Teil der Löhne an das ATO gemeldet
- ABN-Einstufung, um Super und Unfallversicherung zu vermeiden

Eines davon ist eine Warnung. Drei davon sind eine Farm, die man verlässt, und früh zu gehen ist fast immer billiger als zu bleiben und zu streiten.

## Wie ändern Leiharbeitsvereinbarungen die Lage?

Eine Leiharbeitsfirma stellt dich an und setzt dich auf einer Farm ein. Dein Arbeitgeber ist damit die Agentur, auch wenn der Betrieb deinen Tag steuert. Die Agentur schuldet den Award-Satz, die Payslips und die 12 % Super und erscheint auf deinem Income Statement.

Das zählt, wenn etwas schiefgeht, denn die Farm zeigt auf die Agentur und die Agentur auf die Farm. In mehreren Bundesstaaten gibt es Lizenzsysteme für Leiharbeit, und die Frage nach der Lizenz beantwortet ein seriöser Anbieter sofort.

## Was entscheidet, wie deine Saison ausgeht?

Drei Tatsachen, und keine davon ist, wie schnell du pflückst: ob nach Stunde oder nach Akkord bezahlt wird und, bei Akkord, ob die Vereinbarung schriftlich ist, ob du angestellt oder auf einer ABN bist, und ob die Tage gemeldet werden.

Die eigenen Kilos und Stunden der ersten Woche mitzuschreiben verwandelt ein vages Gefühl der Unterbezahlung in eine Zahl. Liegt der effektive Stundensatz unter dem Casual-Minimum, schuldet die Farm die Differenz, und die Rückholung über den Fair Work Ombudsman ist kostenlos. Die Steuerseite läuft getrennt: Lohn, Super und die [Steuererklärung](/de/tax-return) folgen dem, was gemeldet wurde. Beides klärt sich leichter, bevor du die Region verlässt.
`,
  },

  'farm-hand-jobs-working-holiday-australia': {
    title: 'Farmhelferjobs: Lohn und zweites Visum',
    description: 'Farmarbeit reicht von Viehpflege über Pflanzen bis Zäunen und zählt meist für die 88 Tage. Was du verdienst und worauf du beim Vertrag achtest.',
    body: `
Farm Hand ist der Sammelbegriff für landwirtschaftliche Arbeit, die kein Obstpflücken ist: Vieh, Zäune, Maschinen, Ackerbau und Instandhaltung des Anwesens. Das meiste davon zählt für die 88 Tage für ein Visum im zweiten Jahr. Welcher Award dich abdeckt und damit was dir zusteht, hängt an der Hauptaktivität der Farm und nicht an deiner Jobbezeichnung.

## Was umfasst die Arbeit tatsächlich?

Was das Anwesen braucht, weshalb die Rolle in Anzeigen so vage beschrieben wird. Viehpflege, Mustern, Entwurmen und Kalben auf einer Station; Pflanzen, Jäten und Ernten von Feldfrüchten; Zäune, Wassertröge und allgemeine Instandhaltung; Traktor- und Maschinenarbeit; Unterstützung im Schurschuppen; Heu- und Milcharbeit.

Die Art des Anwesens verändert den Job mehr als der Titel. Eine Cattle Station im Northern Territory, eine Weizenfarm in Western Australia und eine Milchfarm in Victoria suchen alle Farm Hands und meinen etwas anderes. Frag vor der Zusage nach den täglichen Aufgaben und den Stunden.

## Welcher Award deckt dich ab?

Der zur Hauptaktivität des Betriebs, nicht der zur Aufgabe eines einzelnen Tages. Ein Mischbetrieb mit Vieh und Feldfrüchten liegt unter der dominanten Aktivität, und die bestimmt Einstufung, Satz und Zuschlagsansprüche.

- Pastoral Award MA000035: Vieh, großflächiger Ackerbau wie Weizen, Gerste und Hafer, Schur
- [Horticulture Award MA000028](/de/blog/horticulture-award-working-holiday-makers): Obst, Gemüse, Reben und Baumkulturen
- Dairy Award MA000026: Milchwirtschaft

Die Einstufung innerhalb des Awards setzt deinen Satz, und die Stufen steigen mit der Verantwortung. Wer Maschinen bedient und Vieh unbeaufsichtigt handhabt, steht nicht auf der Einstiegseinstufung; so bezahlt zu werden ist nach dem Akkordproblem die häufigste Unterbezahlung in der Farmarbeit. Wie du die richtige Stufe findest, behandelt unser Guide zu [Award-Einstufungen](/de/blog/award-classifications-working-holiday-australia).

## Was solltest du bekommen?

Mindestens die nationale Untergrenze, praktisch mehr, denn die Award-Sätze für Farmeinstufungen liegen darüber. Ab dem 1. Juli 2026 liegt das Casual-Minimum über alle Arbeit hinweg bei 33,05 $ pro Stunde, also 26,44 $ nationaler Mindestlohn plus 25 % Casual-Loading. Neu gesetzt werden die Sätze jeden 1. Juli in der Annual Wage Review der Fair Work Commission.

Zwei Dinge bewegen die Zahl von dort: deine Einstufungsstufe, die mit Qualifikation und Verantwortung steigt, und Zuschläge für Wochenend-, Feiertags- und Überstundenarbeit, die auf Farmen genauso gelten. Der Fair Work Pay Calculator liefert die aktuelle Zahl für jeden Award und jede Einstufung und ist verlässlicher als das, was eine Farm erzählt.

## Zählt Farm-Hand-Arbeit für die 88 Tage?

Das meiste davon zählt, sofern vier Bedingungen zugleich erfüllt sind. Die Arbeit muss in einer ausgewiesenen regionalen Postleitzahl liegen, in die Kategorien der Specified Work fallen, wozu Pflanzen- und Tierzucht gehören, bezahlt sein und so dokumentiert, dass sie dich an Daten und Ort bindet.

An dem, was nicht zählt, bleiben Leute hängen. Büroarbeit für einen Agrarbetrieb, Verkauf von Farmprodukten am Hoftor oder auf einem Markt und die meisten Rollen ohne körperliche landwirtschaftliche Tätigkeit fallen aus der Definition, auch wenn der Arbeitgeber unverkennbar eine Farm ist. Payslips entscheiden jeden Streit darüber, weshalb sich Beweisprobleme auf abgelegene Arbeit mit informellen Zahlungsvereinbarungen konzentrieren. Welche Belege standhalten, behandelt unser Guide zu [Rechten bei Farmarbeit](/de/blog/farm-work-rights-working-holiday-australia).

## Was solltest du bei einer Live-in-Vereinbarung prüfen?

Die Nettozahl, bevor du zusagst. Unterkunft und Verpflegung werden auf Stationen und abgelegenen Farmen häufig ins Paket gepackt, und Abzüge dafür sind nur zulässig, wenn sie schriftlich vereinbart, angemessen und auf dem Payslip ausgewiesen sind.

Rechne Lohn abzüglich der genannten Abzüge, geteilt durch die Stunden, die du wirklich arbeiten wirst, einschließlich früher Starts, und vergleiche mit Stadtarbeit abzüglich Hostelkosten. Der Unterschied liegt meist in den Stunden und nicht im Satz. Warnzeichen sind undokumentierte Abzüge nach Gutdünken der Farm: Ein Abzug, auf den man auf einem Payslip nicht zeigen kann, kann wachsen.

## Bist du dort draußen bei einer Verletzung gedeckt?

Ja, als Angestellter, und die Abgelegenheit ändert am Anspruch nichts. Jeder Bundesstaat und jedes Territorium betreibt ein verpflichtendes Workers-Compensation-System mit medizinischer Behandlung, wöchentlichen Zahlungen bei Arbeitsunfähigkeit und Einmalzahlungen bei dauerhafter Beeinträchtigung, und es gilt ab der ersten Schicht unabhängig vom Visum.

Eine Ausnahme zählt auf Farmen. Bist du als Contractor auf einer [ABN](/de/blog/farm-work-and-abns) beschäftigt, gilt der automatische Unfallversicherungsschutz in der Regel nicht, und Stunden vom nächsten Krankenhaus entfernt ist das erheblich. Ob die Einstufung korrekt ist, hängt daran, wie die Arbeit läuft, und nicht am Papier; den Test setzt unser Guide zu [Angestellter gegen Contractor](/de/blog/employee-vs-contractor-australia) auseinander. Was im Ernstfall zu tun ist, behandelt unser Guide zu [Rechten bei Arbeitsverletzungen](/de/blog/workplace-injury-working-holiday-rights).

## Was können Farm Hands zur Steuerzeit geltend machen?

Die Ausrüstung, die der Job dich hat kaufen lassen, auf einer Farm eine längere Liste als in den meisten Rollen. Schutz- und wasserdichte Stiefel, Arbeitskleidung einschließlich Warnkleidung, Sonnenschutz, Handschuhe, kleine Handwerkzeuge und Messer, die du gestellt hast, ein Arbeitsanteil deines Telefons und Fahrzeugkosten für Fahrten zwischen getrennten Arbeitsorten.

Ob du einzeln aufführst, hängt vom Jahr und von der Summe ab. Ab 2026-27 steht die [Pauschale von 1.000 $ ohne Belege](/de/blog/1000-dollar-instant-deduction-rule-2026) als Alternative zur Verfügung, und für viele Farm Hands landet die echte Summe nah genug an 1.000 $, dass die Pauschale die sinnvolle Wahl ist. Was in beiden Fällen zählt, behandelt unser Guide zu [Werbungskosten für Working Holiday Maker](/de/blog/tax-deductions-working-holiday-makers).
`,
  },

  'bartender-jobs-working-holiday-australia': {
    title: 'Bartenderjobs: RSA, Lohn und Trinkgeld',
    description: 'Bartending ist eine der zugänglichsten Hospitality-Rollen für Working Holiday Maker. RSA-Pflicht, Lohnsätze, Trinkgeld-Regelung und Casual Loading erklärt.',
    body: `
Bartending zahlt besser als die meiste Einstiegsgastronomie, weil die Schichten dort liegen, wo die Zuschläge sind. Ein RSA-Zertifikat ist Voraussetzung, bevor du irgendwo in Australien Alkohol ausschenkst. Dein Satz kommt aus dem Hospitality Award, wenn die Bar in einem Hotel liegt, oder aus dem Restaurant Industry Award, wenn sie in einem eigenständigen Restaurant liegt.

## Warum ändert die Art des Lokals deinen Lohn?

Weil die beiden Awards verschiedene Sätze und verschiedene Wochenendzuschläge haben. Eine Bar in einem Hotel, Pub oder Club fällt unter den [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers), eine Bar in einem eigenständigen Restaurant unter den [Restaurant Industry Award](/de/blog/restaurant-industry-award-working-holiday).

Gleicher Job, gleiche Drinks, anderer Sonntagssatz. Den Award zu bestimmen ist deshalb der erste Schritt jeder Payslip-Prüfung und die häufigste Ursache, wenn die Zahlen des Arbeitgebers und deine auseinandergehen.

## Auf welcher Einstufung solltest du sein?

Auf Level 2, sobald du ein RSA hast und Alkohol ausschenkst. Der Hospitality Award stuft einen Bar Attendant mit RSA als Food and Beverage Attendant Grade 2 ein; Level 1 deckt Gläser- und Tischeabräumen und Auffüllen ohne Serviceverantwortung ab.

Arbeitgeber lassen Leute häufig auf Level 1, nachdem sie mit dem Ausschank begonnen haben: ein Einstufungsverstoß und rückholbar. Die Einstufung folgt den tatsächlichen Aufgaben, nicht dem Titel und nicht dem Umstand, dass du als Glassie angefangen hast.

## Woher kommt das Geld tatsächlich?

Aus den Zuschlägen, nicht aus dem Grundsatz. Bars konzentrieren ihre Stunden dort, wo Zuschläge gelten: abends, freitags, samstags, sonntags und an Feiertagen. Ein Casual bekommt auf jeden davon zusätzlich das Loading von 25 %.

Ein Casual mit Donnerstag- bis Sonntagnächten ist die meiste Woche auf Zuschlagssätzen; dieselbe Grundeinstufung zahlt hinter einer Bar spürbar mehr als im Wochentagscafé. Ab dem 1. Juli 2026 liegt der Casual-Boden über alle Arbeit hinweg bei 33,05 $ pro Stunde, Award-Sätze mit Abend- und Wochenendzuschlägen deutlich darüber.

## Wie funktioniert das RSA, und wer zahlt es?

Es ist Voraussetzung vor dem Ausschank, dauert wenige Stunden und ist meist online verfügbar. Ausgestellt wird es auf Landesebene: Ein Zertifikat aus Victoria erlaubt dir nicht automatisch, in Sydney auszuschenken. Welche Bundesstaaten welche anerkennen, steht in unserem Guide zum [RSA-Zertifikat](/de/blog/rsa-certificate-australia-working-holiday).

Frag, bevor du bezahlst. Viele Lokale übernehmen die Kosten bei der Einstellung. Hat der Arbeitgeber gezahlt oder erstattet, ist es nicht dein Abzug; hast du selbst gezahlt, für Arbeit, die du machst, ist die Gebühr absetzbar.

## Was passiert mit Trinkgeld?

Trinkgeld ist in Australien weit weniger verbreitet als in den USA, weil die Grundlöhne höher und nicht auf Trinkgeld gebaut sind. Es ist eine freiwillige Zusatzzahlung und kein Teil deines gesetzlichen Lohns.

Steuerpflichtiges Einkommen ist es trotzdem, ob bar behalten oder vom Lokal gepoolt und verteilt, und es gehört erklärt. Zur Award-Einhaltung zählt es nicht: Ein Arbeitgeber darf Trinkgeld nicht nutzen, um eine Lücke zum geschuldeten Satz aufzufüllen. Wie es gemeldet wird, steht in unserem Guide zu [Steuer auf Trinkgeld](/de/blog/do-working-holiday-makers-pay-tax-on-tips).

## Was geht in Bars am häufigsten schief?

Immer dieselben Muster, jedes rückholbar, sobald es erkannt und belegt ist, und alle sichtbar, wenn Payslips und Dienstplan nebeneinander liegen.

- Ein pauschaler Stundenlohn, der angeblich alles abdeckt, ohne Zuschläge
- Erfahrene Barkeeper, die nach Übernahme von Serviceaufgaben auf Level 1 bleiben
- Feiertagszuschlag, der schlicht nicht gezahlt wird
- Barzahlung ohne Payslips und ohne Superannuation
- Belastungen für Uniform, Bruch oder Kassenmanko, die in der Regel unzulässig sind
- Unbezahlte Vorbereitung vor der Schicht und unbezahlte Reinigung nach dem Schließen

Schließen ist nicht das Ende der Schicht. Ein Dienstplan, der bis zum Schließen statt bis zum tatsächlichen Ende geschrieben ist, unterbezahlt jede Nacht um denselben Betrag. Die Belastungen behandelt unser Guide zu [unzulässigen Uniform- und Wäscheabzügen](/de/blog/uniform-laundry-deductions-illegal-australia).

## Was kann ein Barkeeper zur Steuerzeit absetzen?

Überschaubare Beträge. Die selbst getragene und nicht erstattete RSA-Kursgebühr, rutschfeste Schuhe, wo das Lokal sie verlangt, eigene Barausrüstung in den seltenen Fällen, in denen du sie stellst, der berufliche Anteil der Handykosten und Fahrzeugkosten, wo Schichten an Orten ohne Verkehrsanbindung liegen.

Ab dem 1. Juli 2026 steht ein pauschaler berufsbezogener Abzug von 1.000 $ ohne Belege, bei den meisten Barkräften mehr als sich Posten für Posten belegen ließe. Die Details stehen in unserem Guide zur [1.000-$-Regel](/de/blog/1000-dollar-instant-deduction-rule-2026).

## Kannst du ohne Barerfahrung anfangen?

Ja, und die meisten Working Holiday Maker tun es. Gut besuchte Lokale beschäftigen Glassies und Barbacks: Gläser einsammeln, Kühlschränke auffüllen, Fässer wechseln, die Bar während des Service frei halten. Diese Rollen brauchen keine Erfahrung und kein RSA, solange du nicht ausschenkst.

Der Aufstieg passiert in einem unterbesetzten Lokal oft in Wochen statt Monaten. Auslöser ist ein RSA, das vor der Gelegenheit schon da ist: Ein Manager, der eine Freitagnacht füllen muss, gibt die Schicht dem, der bereits ausschenken darf.

## Warum verdient der Kollege mehr als du?

Die Rolle ist überall dieselbe, der Verdienst hängt am Lokal und am Dienstplan. Zwei Barkeeper mit demselben nominalen Satz können über einen Monat mehrere hundert Dollar auseinanderliegen, wegen dieser Punkte.

- Ob die Bar in einem Hotel oder in einem eigenständigen Restaurant sitzt, was den Award entscheidet.
- Ob du ein RSA hast und ausschenkst, was dich auf Level 2 bringen sollte.
- Ob du Casual bist, was auf jeden Zuschlag zusätzlich das Loading von 25 % bringt.
- Welche Nächte du arbeitest, denn Abend-, Wochenend- und Feiertagszuschläge tragen den Verdienst.
- Ob ein Enterprise Agreement gilt, was in großen Pub-Gruppen häufig ist.
- Ob Vorbereitungs- und Reinigungszeit eingeplant und bezahlt ist.
- Ob eine Belastung für Bruch, Kassenmanko oder Uniform von deinem Lohn abgezogen wurde.

Der Einbehalt über alle Lokale hinweg wird am Ende des Steuerjahres abgerechnet. Du kannst deine [Steuererstattung schätzen](/de/calculator) und sie über deine [Steuererklärung](/de/tax-return) holen.
`,
  },

  'barista-coffee-shop-working-holiday-australia': {
    title: 'Baristajobs: Lohn, Training und Chancen',
    description: 'Die australische Kaffeekultur sorgt für hohe Nachfrage nach Baristas. Lohnsätze, Cafés in Melbourne und Sydney, und was du dort verdienst.',
    body: `
Barista-Arbeit fällt in einem eigenständigen Café unter den [Restaurant Industry Award](/de/blog/restaurant-industry-award-working-holiday) und in einem Hotelcafé unter den [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers). Was du tatsächlich bekommst, entscheiden deine Einstufung und die Wochenendzuschläge, nicht deine Latte Art.

## Was umfasst die Arbeit im Alltag?

Die Rolle ist die Maschine, die Milch und der Tresen. Australische Cafés fahren Espressoservice mit hohem Durchsatz, Tempo und Gleichmäßigkeit zählen also mehr als die Bandbreite der Getränke. Die meisten Rollen umfassen auch Speisenservice und Reinigung.

- Bedienung von Espressomaschinen und Mühlen
- Milch nach Vorgabe aufschäumen
- Zubereitung der Standard-Getränkepalette
- Bestellungen aufnehmen und Zahlungen abwickeln
- In vielen Cafés einfache Speisen zubereiten
- Ausrüstung reinigen und Vorräte auffüllen

Erfahrene Baristas schulen Personal, führen eine Schicht und bestellen Bohnen. Dort steigt die Einstufung, und dort sollte die Bezahlung mitziehen.

## Auf welcher Einstufung bist du, und passt sie zur Arbeit?

Die Einstufung ergibt sich aus den Aufgaben, nicht aus dem Jobtitel auf dem Dienstplan. Unter dem Restaurant Industry Award sitzt ein neuer Barista ohne Erfahrung bei Food and Beverage Attendant Grade 1, ein erfahrener Barista mit voller Getränkepalette und Bestellannahme bei Grade 2, ein leitender Barista mit Bereichsverantwortung höher.

Auf Grade 1 gehalten zu werden, während man Grade-2-Arbeit macht, ist die häufigste Unterbezahlung in australischen Cafés. Wer nach drei Monaten die Maschine unbeaufsichtigt durch einen Samstagsansturm fährt, ist kein Azubi, egal was der Payslip sagt. Wie die richtige Stufe erkannt wird, steht in unserem Guide zu [Award-Einstufungen](/de/blog/award-classifications-working-holiday-australia).

## Was zahlt die Arbeit tatsächlich?

Der Lohn ist der Grundsatz deiner Einstufung, plus 25 % wenn du Casual bist, plus Zuschläge für Wochenenden und Feiertage. Unter dem Restaurant Industry Award sind die Wochenendzuschläge erheblich: typischerweise 50 % am Samstag, 75 % am Sonntag und 150 % an einem Feiertag.

Cafés sind Samstag-Sonntag-Geschäfte, diese Struktur entscheidet also den größten Teil des Einkommens. Ein Pauschalsatz, der an einem Dienstag großzügig klingt, ist über einen wochenendlastigen Dienstplan meist ein deutlicher Verlust.

## Sind unbezahlte Probeschichten legal?

Eine kurze unbezahlte Demonstration von Fähigkeiten, gemessen in Minuten statt in Stunden, kann rechtmäßig sein. Eine volle Schicht produktiver Arbeit ist es nicht und muss zu Award-Sätzen bezahlt werden, unabhängig davon, ob du danach eingestellt wurdest.

Cafés sind hier der auffälligste Bereich in Australien. Solche Löhne lassen sich über den Fair Work Ombudsman kostenlos zurückfordern, auch wenn du den Job nicht bekommen hast. Wo die Grenze verläuft, steht in unserem Guide zu [unbezahlten Probeschichten](/de/blog/unpaid-trial-shifts-australia-legal).

## Brauchst du ein Zertifikat, um eingestellt zu werden?

In der Regel nein. Die meisten australischen Cafés verlangen keine formale Barista-Qualifikation und stellen nach nachgewiesenen Maschinenstunden ein. Ein Food-Safety-Zertifikat verlangen manche Arbeitgeber, und ein RSA ist nötig, wenn das Café abends Alkohol ausschenkt.

Barista-Erfahrung aus einem anderen Land zählt hier gut. Ein Zertifikat ohne Volumen dahinter zählt nicht, denn getestet wird im Gespräch, ob du um acht Uhr morgens eine Schlange halten kannst.

## Auf welche Unterbezahlungsmuster solltest du achten?

Der Fair Work Ombudsman hat in australischen Cafés wiederholt dieselben Praktiken gefunden. Sie treten gebündelt auf: ein Betrieb mit einem davon hat meist mehrere.

- Ein Pauschalsatz, der angeblich alles abdeckt, ohne Wochenend- und Feiertagszuschläge
- Unbezahlte Probeschichten über einen ganzen Tag
- Unbefristete Level-1-Einstufung trotz voller Aufgaben
- Personalkaffee, Essen oder Uniform in Rechnung stellen, was in der Regel unzulässig ist
- Barzahlung ohne Payslips und ohne [Superannuation](/de/superannuation)
- Unbezahlte Vorbereitungszeit vor der Öffnung

Der letzte Punkt ist besonders normalisiert. Wenn du um sechs Uhr vor Ort sein sollst, um für die Öffnung um sieben vorzubereiten, ist diese Stunde Arbeit und wird bezahlt.

## Was kann ein Barista zur Steuerzeit absetzen?

Die Abzüge für Baristas sind überschaubar, aber real. Sie folgen demselben Test wie überall: Du hast selbst gezahlt, es hat dein Einkommen erwirtschaftet, niemand hat es erstattet, und du hast den Beleg aufbewahrt.

- Rutschfeste Arbeitsschuhe
- Eine Schürze, die der Arbeitgeber nicht gestellt hat
- Selbst gezahlte Barista- oder Food-Safety-Kursgebühren
- Der berufliche Anteil eines Handys, das für die Schichtkommunikation genutzt wird

Gewöhnliche schwarze Kleidung ist nicht absetzbar, auch wenn das Café sie vorschreibt. Wo diese Grenze verläuft, steht in unserem Guide zu [Steuerabzügen](/de/blog/tax-deductions-working-holiday-makers).

## Wo wird Cafearbeit am besten bezahlt?

Melbourne und Sydney haben die tiefsten Specialty-Coffee-Märkte und den stärksten Wettbewerb um gute Maschinenleute, was den Aufschlag über dem Award-Boden anhebt. Regionale Touristenorte zahlen auf dem Papier weniger und in der Praxis oft mehr, weil der Dienstplan voller ist und die Wochenendzuschläge auf mehr Stunden fallen.

Der sinnvolle Vergleich ist die Wochensumme, nicht der Stundensatz. Fünfundzwanzig Stunden in einem gut laufenden Melbourner Café zu einem starken Satz und vierzig Stunden in Byron Bay zum Award ergeben sehr unterschiedliche Wochen, und die zweite füllt die Sechsmonatsmarke bei einem Arbeitgeber schneller auf.

## Was entscheidet, ob ein Cafejob sich lohnt?

Drei Dinge, und der im Gespräch genannte Stundensatz ist das unzuverlässigste davon. Ob die Einstufung zu den Aufgaben passt, was den Grundsatz entscheidet. Ob Wochenend- und Feiertagszuschläge angewendet werden, was den größten Teil des Einkommens ausmacht. Und ob der Betrieb Super zahlt und Payslips ausstellt: ein Café, das bar zahlt, streicht auch die 12 % Super, die du später als DASP beanspruchen würdest.

Der stille Weg in besser bezahlte Cafearbeit: im Service eines gut besuchten Betriebs anfangen, in ruhigen Stunden Maschinenzeit nehmen und binnen weniger Monate auf eine Barista-Einstufung wechseln. Vergessen wird dabei die Prüfung, ob die Einstufung auf dem Payslip mitgezogen ist. Von allein tut sie es selten. Was am Jahresende zurückkommt, kannst du in der [Steuererstattungsschätzung](/de/calculator) durchrechnen und über deine [Steuererklärung](/de/tax-return) holen.
`,
  },

  'waiter-waitress-working-holiday-australia': {
    title: 'Kellnerjobs: Lohn, Zuschläge und Rechte',
    description: 'Service in Restaurant und Café ist einer der häufigsten Jobs für Backpacker. Mindestlohn, Casual Loading, Penalty Rates und worauf du achtest.',
    body: `
Im Service in Australien zu arbeiten zahlt einen echten Lohn statt eines trinkgeldgestützten, weil der Grundsatz von einem Award gesetzt wird. Welcher Award, hängt am Betrieb: der [Restaurant Industry Award](/de/blog/restaurant-industry-award-working-holiday) für Restaurants, der [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers) für Hotels. Bei deiner Einstufung wird das Geld gewonnen.

## Was umfasst die Arbeit?

Gäste begrüßen und platzieren, Bestellungen aufnehmen, Speisen und Getränke tragen, Tische abräumen und neu eindecken, Zahlungen abwickeln sowie den Gastraum reinigen und auffüllen. In einem kleinen Betrieb dehnt sich das still auf Barista-Arbeit, Barservice und einfache Speisenzubereitung aus.

Diese Ausdehnung ist kein Detail. Die Award-Einstufung bestimmt sich nach der Bandbreite der Aufgaben, die du tatsächlich erledigst. Wer nebenbei Bier zapft und die Kaffeemaschine bedient, macht höher eingestufte Arbeit als jemand, der nur Teller trägt, egal wie der Dienstplan die Schicht nennt.

## Auf welcher Einstufung solltest du sein?

Auf der, die zu deinen Aufgaben passt, und vier betreffen die meisten Working Holiday Maker. Introductory gilt für die ersten drei Monate ohne Branchenerfahrung. Grade 1 deckt Eindecken, Abräumen, Gläsereinsammeln und einfachen Service ab, Grade 2 Bestellannahme, Getränkeausschank mit RSA und vollen Tischservice, Grade 3 die Aufsicht über einen Bereich.

Zwei Regeln machen das endlich. Nach drei Monaten auf Introductory rückst du automatisch auf Grade 1, sofern es keinen echten Ausbildungsgrund fürs Bleiben gibt. Und wer dieselbe Arbeit macht wie Grade-2-Kräfte, sollte nach Grade 2 bezahlt werden, egal wie lange er dabei ist. Erfahrene Servicekräfte auf der untersten Stufe zu halten ist eine der häufigsten Unterbezahlungen in der australischen Gastronomie, unsichtbar, solange man nicht weiß, dass es die Stufen gibt.

## Was entscheidet, was tatsächlich bei dir ankommt?

Welche Tage du arbeitest, mehr als welcher Betrieb. Grundsätze steigen mit der Einstufung, Casual-Anstellung bringt ein Loading von 25 % anstelle von Urlaub, und darauf gelten Zuschläge als Vielfache des normalen Satzes für Samstage, Sonntage, Feiertage und in manchen Einstufungen für Abende ab einer bestimmten Uhrzeit.

Ein Dienstplan mit Freitag- und Samstagabend ist also deutlich mehr wert als dieselbe Stundenzahl mittags unter der Woche. Und ein Payslip, der über eine Woche mit einem Sonntag hinweg denselben Stundenwert zeigt, zeigt in einer Zeile einen Verstoß. Die Faktoren nach Tag und Award stehen in unserem Guide zu [Penalty Rates](/de/blog/penalty-rates-australia).

## Was gilt für Split Shifts und kurze Schichten?

Für beides gibt es Regeln, von denen die meisten Beschäftigten nie hören. Eine Split Shift, Mittagsservice, vier Stunden Pause, Abendservice, löst in den meisten Gastronomie-Awards eine Zulage aus, gerade weil der Tag zerrissen ist.

Der Mindesteinsatz ist die zweite. Für jeden Einsatz gibt es eine Mindestdauer, für die du bezahlt werden musst, nach neunzig Minuten heimgeschickt zu werden bedeutet also nicht neunzig Minuten Lohn. Für eine Zweistundenschicht gerufen zu werden umgeht das ebenfalls nicht. Diese Klauseln machen einen unsteten Dienstplan überlebbar und gehören zu den am häufigsten ignorierten.

## Wie wird Trinkgeld behandelt?

Als steuerpflichtiges Einkommen, in welcher Form es auch kommt, und es senkt nicht, was der Arbeitgeber dir schuldet. Trinkgeld ist in Australien freiwillig und bescheiden, es ergänzt den Lohn, statt ihn zu ersetzen.

Entscheidend ist der Weg. Kartentrinkgeld und Servicezuschläge laufen über die Lohnabrechnung des Betriebs, es wird also Steuer einbehalten und sie erscheinen automatisch im Income Statement. Bargeld, das dir direkt in die Hand gegeben wird, meldet niemand, es in deiner [Steuererklärung](/de/tax-return) anzugeben ist also deine Sache, und eine wöchentliche Notiz reicht als Beleg. Beides behandelt unser Guide zu [Steuer auf Trinkgeld](/de/blog/do-working-holiday-makers-pay-tax-on-tips).

## Welche Unterbezahlungen kommen am häufigsten vor?

Der Fair Work Ombudsman findet im Restaurantservice seit Jahren dasselbe Muster. Jeder Punkt ist getrennt zurückzuholen und jeder für sich leicht zu übersehen.

- Ein pauschaler Stundensatz über alle Tage, ganz ohne Zuschläge
- Beschäftigte, die über drei Monate hinaus auf Introductory gehalten werden
- Erfahrene Servicekräfte, die auf Grade 1 eingestuft sind
- Feiertagszuschlag verweigert oder still weggelassen
- Vorbereitung vor der Schicht und Aufräumen danach nicht bezahlt
- Belastungen für Uniform, Wäsche oder Bruch, die in der Regel unzulässig sind
- Barzahlung ohne Payslips und ohne [Super](/de/superannuation)
- Unbezahlte Probeschichten über einen ganzen Abend

Die Wochenprüfung, die die meisten davon fängt, dauert zwei Minuten: gearbeitete Schichten, zu den korrekten Zuschlagssätzen, plus Zulagen, gegen den Payslip gehalten. Die Uniform- und Bruchseite behandelt unser Guide zu [unzulässigen Abzügen](/de/blog/uniform-laundry-deductions-illegal-australia).

## Ändert Alkoholausschank deine Position?

Ja, gleich zweifach. Du brauchst ein RSA-Zertifikat, bevor du Alkohol ausschenken darfst, einen kurzen Kurs, den du in der Regel selbst zahlst und der als berufsbezogene Ausgabe absetzbar ist.

Er wirkt auch auf deine Einstufung. Getränke auszuschenken ist unter dem Restaurant Industry Award Grade-2-Arbeit, eine Servicekraft mit RSA, die die Bar übernimmt, sollte also nach Grade 2 bezahlt werden, auch wenn der Dienstplan die Schicht als Service beschreibt. Das ist eines der klarsten Einstufungsargumente, denn das RSA belegt die Fähigkeit, um die die Stufe gebaut ist. Wie du eines bekommst, steht in unserem Guide zu [RSA-Zertifikaten](/de/blog/rsa-certificate-australia-working-holiday), und was am Jahresende zusammenkommt, kannst du in der [Steuererstattungsschätzung](/de/calculator) durchrechnen.
`,
  },

  'kitchen-hand-working-holiday-australia': {
    title: 'Kitchen-Hand-Jobs: Einstieg ohne Ausbildung',
    description: 'Kitchen-Hand-Jobs brauchen keine Qualifikation und sind oft der schnellste Einstieg. Bezahlt wird nach dem Hospitality Award, meist casual mit Zuschlag.',
    body: `
Kitchen-Hand-Arbeit ist der zugänglichste Weg in die australische Gastronomie, sie braucht keine Qualifikation und ist in fast jedem Lokal verfügbar. Die Bezahlung setzt je nach Betrieb der Restaurant Industry Award oder der Hospitality Award, in beiden auf der niedrigsten Einstufung. Zuschläge gelten trotzdem, und dort liegt das eigentliche Geld.

## Was umfasst der Job tatsächlich?

Unterstützung im Back of House während des Service, praktisch Abwaschen plus alles, was die Küche braucht: die Industriespülmaschine bedienen, einfache Vorbereitung wie Schälen, Schneiden und Portionieren, Lieferungen annehmen, den Kühlraum auffüllen, Flächen und Böden reinigen und die Köche durch den Rush tragen.

Es ist körperlich, heiß und unerbittlich, und dort fangen die meisten Working Holiday Maker an, weil es die eine Gastronomierolle ist, die vorher nichts verlangt. Sie führt im selben Lokal binnen weniger Monate verlässlich woanders hin.

## Welcher Award deckt dich ab, und auf welcher Stufe?

Der Award, der das Lokal abdeckt. Restaurants liegen in der Regel unter dem Restaurant Industry Award, Pubs, Hotels und Clubs unter dem Hospitality Industry (General) Award, und die Einstufungsstrukturen unterscheiden sich.

- Introductory Level, für die erste Zeit ohne Branchenerfahrung
- Kitchen Attendant Grade 1, für Abwasch, Reinigung und einfache Vorbereitung
- Kitchen Attendant Grade 2, für verantwortlichere Vorbereitung und die Arbeit an einer Station mit den Köchen

Die Einstufung folgt den Aufgaben, nicht den Jobbezeichnungen. Wenn du regelmäßig Speisen vorbereitest oder einen Bereich führst, ist Grade 1 nicht mehr die korrekte Einstufung, und der Unterschied wird für jede gearbeitete Stunde bezahlt.

## Was zahlt es, sobald die Zuschläge dabei sind?

Die Basis ist die niedrigste im Award, der tatsächliche Verdienst nicht, denn Kitchen Hands arbeiten genau die Stunden, die Zuschläge tragen. Abende, Samstage, Sonntage und Feiertage sind die Schichten, die Küchen besetzt brauchen, und jede trägt ihr eigenes Loading zusätzlich zum 25-%-Casual-Loading.

Ab dem 1. Juli 2026 liegt die Casual-Untergrenze bei 33,05 $ pro Stunde, also dem nationalen Minimum von 26,44 $ plus Loading, und die Award-Sätze liegen darüber. Eine Casual-Kraft mit Freitag- und Samstagabend-Dinner verdient spürbar mehr pro Stunde, als der Basissatz nahelegt, und eine Feiertagsschicht mit bis zum Zweieinhalbfachen ist die bestbezahlte Arbeit, die ganz ohne Qualifikation offensteht.

## Warum wird diese Rolle so oft unterbezahlt?

Weil die Schichtgrenzen unscharf sind und die Arbeitskräfte meist neu im Land. Der Fair Work Ombudsman hat die Gastronomie wiederholt als Risikobereich für Unterbezahlung benannt, und die Muster in Küchen sind konstant.

- Ein pauschaler Stundensatz, der angeblich alles abdeckt, ohne angewendete Zuschläge
- Der Feiertagszuschlag wird schlicht nicht gezahlt
- Barzahlung ohne Payslip und ohne Superannuation
- Unbezahlte Rüstzeit vor dem Dienstplanbeginn
- Unbezahltes Aufräumen nach dem Service, das in einer Küche eine Stunde nach dem Feierabend des Front of House dauern kann
- Als genommen erfasste Pausen, die durchgearbeitet wurden
- Erfahrene Kitchen Hands, die unbefristet auf der Einstiegseinstufung gelassen werden

Die Aufräumzeit ist die für diesen Job spezifische. Kitchen Hands hören zuletzt auf, und ein Arbeitgeber, der bis Serviceende statt bis zum echten Ende einplant, unterbezahlt jede Schicht um denselben Betrag.

## Was gilt für Sicherheit und Verletzungen?

Küchen tragen überdurchschnittliche Verletzungsraten, und jede während bezahlter Arbeit erlittene Verletzung ist unabhängig vom Visastatus von der Workers Compensation gedeckt. Schnitte, Verbrennungen, Ausrutschen auf nassen Böden, Rückenbelastung durch Lagerware und Belastungsschäden durch langes Spülen sind die üblichen.

Ein Arbeitgeber darf dich nicht rechtmäßig unter Druck setzen, keinen Anspruch zu stellen, und ein Working-Holiday-Visum berührt den Anspruch nicht. Wie ein Anspruch läuft, setzt unser Guide zu [Rechten bei Arbeitsverletzungen](/de/blog/workplace-injury-working-holiday-rights) auseinander.

## Was kann ein Kitchen Hand zur Steuerzeit geltend machen?

Weniger als ein Handwerker und mehr als nichts. Rutschfeste Arbeitsschuhe, eine Schürze oder Arbeitskleidung, wo sie ausdrücklich verlangt und nicht gestellt wird, das Schleifen von Messern, wenn du eigene stellst, und der berufliche Anteil der Handykosten für Schichtkommunikation.

Ab dem 1. Juli 2026 gibt es außerdem einen pauschalen berufsbezogenen Abzug von 1.000 $ ohne Belege, der bei den meisten Kitchen Hands über dem liegt, was sie einzeln belegen könnten. Wann der Pauschalbetrag das Einzelaufführen schlägt, erklärt unser Guide zur [1.000-$-Sofortabzug](/de/blog/1000-dollar-instant-deduction-rule-2026).

## Wie kommst du vom Kitchen Hand weiter?

Indem du Aufgaben übernimmst und dann darauf bestehst, dass die Einstufung ihnen folgt. Der übliche Weg läuft vom Kitchen Hand zum Kitchen Attendant Grade 2 mit echter Vorbereitungsverantwortung, dann zum Cook Grade 1, sobald du eine Station führst, und Front-of-House-Rollen öffnen sich mit einem RSA.

Die Methode ist unglamourös: Notiere über zwei Wochen, was du tatsächlich tust, halte es gegen die Einstufungsbeschreibungen des Awards und bitte die Lohnbuchhaltung schriftlich um eine Neueinstufung. Jeder Schritt ist ein anderer Satz für jede gearbeitete Stunde, und er passiert nicht von selbst.

## Was unterscheidet dein Lokal vom nächsten?

Die Rolle ist überall dieselbe. Was du dafür bekommst, entscheiden Tatsachen über dein Lokal und deinen Dienstplan.

- Welcher Award das Lokal abdeckt, denn für Restaurants und Pubs gelten verschiedene Regelwerke.
- Welcher Einstufung deine tatsächlichen Aufgaben entsprechen, statt dem Titel im Dienstplan.
- Ob du casual bist, was das 25-%-Loading auf jeden Zuschlag obendrauf bringt.
- Welche Stunden du arbeitest, denn bei Abenden, Wochenenden und Feiertagen liegt der Großteil des Verdiensts.
- Ob die Aufräumzeit nach dem Service eingeplant und bezahlt wird.
- Ob ein Tarifvertrag gilt, was in größeren Hotelgruppen üblich ist.

Wie der Satz auch ausfällt, der Einbehalt über jedes Lokal wird am Ende des Steuerjahres abgerechnet, und du kannst aus deinen Jahreszahlen deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  'construction-laborer-working-holiday-australia': {
    title: 'Bauarbeit: White Card, Lohn und Sicherheit',
    description: 'Bauarbeit gehört zu den bestbezahlten Einstiegsjobs. Ohne White Card geht nichts auf der Baustelle. Stundensätze und Casual Loading.',
    body: `
Bauhilfsarbeit zahlt besser als fast alles andere, was einem Working Holiday Maker ohne Gewerk offensteht, und eine White Card ist Pflicht, bevor du eine Baustelle betrittst. Deinen Satz setzt der Building and Construction General On-site Award (MA000020). Was deine Bezahlung tatsächlich entscheidet, ist deine Einstufung darin, plus Zulagen, die die meisten Backpacker nie sehen.

## Was ist die Arbeit?

Allgemeine Baustellenarbeit: Materialien tragen und bewegen, Betonieren, Baustellenreinigung, Abbruch, Gerüstmontage, Unterstützung bei Erdarbeiten und Handwerksassistenz neben Zimmerleuten, Klempnern und Elektrikern. Sie ist körperlich, draußen und im Takt dessen, der die Baustelle führt.

Sie zahlt gut aus demselben Grund, aus dem sie das Sicherheitsregime drumherum braucht. Der Bau trägt höhere Verletzungsraten als fast jede andere Branche, in die Working Holiday Maker einsteigen. Deshalb sind Einweisung und Schutzausrüstung verpflichtend, und deshalb zählt die Unfallversicherung hier mehr als in einem Café.

## Warum brauchst du zuerst eine White Card?

Weil es für dich und für den Arbeitgeber unzulässig ist, ohne eine auf einer Baustelle zu sein. Sie wird nach Abschluss des General Construction Induction Course ausgestellt, der als voller Tag in Präsenz oder als Online-Äquivalent läuft, und sie ist in jedem Bundesstaat und Territorium anerkannt.

Zwei Details lohnen sich. Die Karte läuft nicht ab, verfällt aber, wenn du zwei Jahre keine Bauarbeit machst. Und die Kursgebühr setzt die Ausbildungsorganisation, nicht der Staat, sie unterscheidet sich also nach Bundesstaat und Anbieter, ein Vergleich lohnt sich. Die Gebühr ist als berufsbezogene Ausgabe absetzbar. Die Details je Bundesstaat behandelt unser Guide zu den [White-Card-Anforderungen](/de/blog/white-card-australia-working-holiday).

## Was entscheidet deinen Stundensatz?

Deine Einstufungsstufe unter dem Award, und das ist die Zahl, die dir niemand nennt. Der Award setzt Sätze nach Construction-Worker-Stufe, steigend mit Fähigkeiten und Verantwortung der Rolle. Auf CW1 bezahlt zu werden, während man CW3-Arbeit macht, ist eine häufige und vollkommen unsichtbare Unterbezahlung.

Danach kommen die Loadings obendrauf. Casual-Beschäftigung trägt ein Loading anstelle von Urlaub, auf Samstags-, Sonntags- und Feiertagsarbeit kommen Zuschläge, und Überstunden werden zu einem Vielfachen des Normalsatzes gezahlt. Eine Woche mit einem Samstag darin sollte auf einem Payslip spürbar anders aussehen als eine ohne, sonst ist das die erste Frage. Wie du die Stufe findest, die zu deinen tatsächlichen Aufgaben passt, behandelt unser Guide zu [Award-Einstufungen](/de/blog/award-classifications-working-holiday-australia).

## Welche Zulagen bleiben unbezahlt?

Die Branchenzulage mehr als jede andere. Sie wird jedem Bauarbeiter unter dem Award gezahlt, nicht einer Auswahl, es gibt also keinen Qualifikationstest. Ihr Fehlen auf einem Payslip ist das verlässlichste Zeichen dafür, dass der Award nicht ordentlich angewendet wird.

Mehrere weitere hängen an bestimmten Umständen, jede ist eine Tatsache über deine eigene Woche und kein allgemeiner Satz.

- Werkzeugzulage, wo du eigenes Werkzeug stellst
- Standortzulage, auf manchen Großprojekten
- Höhenzulage, für Arbeit über bestimmten Höhen
- Schlechtwetterzulage, wo bei starkem Regen weitergearbeitet wird
- Erste-Hilfe-Zulage, für die benannte Person
- Reisezulage, wo die Baustelle weit vom Depot entfernt ist

## Was passiert, wenn man dich auf eine ABN setzt?

Alles, was dich schützt, hört auf zu gelten. Leiharbeit auf Baustellen ist üblich und ein Teil davon ist echtes Contracting, aber ein Hilfsarbeiter mit festen Stunden, gestelltem Werkzeug, einem Vorarbeiter, der die Arbeit steuert, und ohne andere Kunden ist Angestellter, was auch immer die Rechnung sagt.

Die Kosten einer Fehleinstufung sind konkret: keine 12 % [Super](/de/superannuation), kein Unfallversicherungsschutz bei einer Verletzung, kein Casual Loading, keine Zuschläge und keine Award-Zulagen. Auf einer Baustelle zählt die Unfallversicherungshälfte am meisten. Den Test setzt unser Guide zu [Angestellter gegen Contractor](/de/blog/employee-vs-contractor-australia) auseinander, und wer dich rechtlich beschäftigt, wenn eine Agentur beteiligt ist, behandelt unser Guide zu [Leiharbeit](/de/blog/labour-hire-agencies-working-holiday-australia).

## Was passiert, wenn du auf der Baustelle verletzt wirst?

Die Workers Compensation deckt dich ab der ersten Schicht, ohne Mindestdienstzeit und ohne Bedeutung deines Visums. Sie deckt medizinische Behandlung, wöchentliche Zahlungen bei Arbeitsunfähigkeit und Einmalzahlungen bei dauerhafter Beeinträchtigung.

Die zwei Dinge, die schiefgehen, betreffen beide die ersten 48 Stunden. Eine Verletzung, die dem Arbeitgeber nicht sofort gemeldet wurde, ist später viel schwerer nachzuweisen, und eine Behandlung, bei der du nicht erwähnst, dass es bei der Arbeit passierte, startet eine Krankenakte, die nicht zum Anspruch passt. Ein Arbeitgeber, der von einem Anspruch abrät, handelt rechtswidrig, und der Visastatus spielt im Verfahren keine Rolle. Den Rahmen behandelt unser Guide zu [Rechten bei Arbeitsverletzungen](/de/blog/workplace-injury-working-holiday-rights).

## Was kannst du zur Steuerzeit geltend machen?

Mehr als in den meisten Working-Holiday-Maker-Rollen, denn der Bau zwingt dich zu Käufen. Stahlkappenstiefel, Warnkleidung, ein Helm und Handschuhe, wo du sie stellst, Sonnenschutz für Außenarbeit, Handwerkzeug und die White-Card-Kursgebühr sind alle berufsbezogene Ausgaben.

Ob du sie einzeln aufführst, hängt vom Steuerjahr ab. Ab 2026-27 kannst du die [Pauschale von 1.000 $ ohne Belege](/de/blog/1000-dollar-instant-deduction-rule-2026) nehmen oder den tatsächlichen Betrag belegen. Der Bau ist eine der wenigen Backpacker-Tätigkeiten, in denen die echte Summe 1.000 $ übersteigen kann, dann lohnt es sich, ab Tag eins Belege zu sammeln. Fahrten zwischen zwei Baustellen an einem Tag sind absetzbar, der Weg von zu Hause zur ersten Baustelle nicht.
`,
  },

  'uber-eats-delivery-rider-working-holiday-australia': {
    title: 'Uber Eats liefern: ABN, Verdienst, Steuer',
    description: 'Essenslieferung mit Fahrrad, E-Bike oder Scooter gilt als Contracting, du brauchst also eine ABN. Verdienst, Steuer und Abzüge im Überblick.',
    body: `
Essenslieferung ist Contracting und keine Anstellung. Du brauchst eine [ABN](/de/abn), von deinen Auszahlungen wird nichts einbehalten, und die Steuer kommt als eine einzige Rechnung mit dem Bescheid. GST gilt bei Lieferarbeit erst ab 75.000 $ Umsatz, anders als beim Personen-Rideshare, wo sie ab dem ersten Dollar gilt.

## Warum gilt Lieferarbeit als Contracting und nicht als Job?

Die Plattform kauft eine erledigte Lieferung und nicht deine Zeit, sie bezahlt dich also als Betrieb. Diese eine Einordnung entscheidet alles Weitere: kein PAYG-Einbehalt, keine Arbeitgeber-Superannuation, kein Award-Satz, standardmäßig keine Unfallversicherung des Arbeitgebers, und eine ABN, bevor du bezahlt werden kannst.

Ohne ABN im Konto behält der Zahler nach der No-ABN-Einbehaltsregel 47 % ein, ein höherer Satz als die 45 % für Löhne ohne TFN. Wann die Einordnung legitim ist und wann sie nur eine Anstellung vermeidet, steht in unserem Guide zu [Was ist eine ABN](/de/blog/what-is-an-abn).

## Wie wird Lieferungseinkommen tatsächlich besteuert?

Zu den [Working-Holiday-Maker-Sätzen](/de/blog/backpacker-tax-rate-australia), mit 15 % auf die ersten 45.000 $ und 30 % von dort bis 135.000 $, genau wie Löhne. Der Unterschied liegt im Zeitpunkt: Weil unterwegs nichts einbehalten wird, wird der ganze Betrag fällig, wenn die [Steuererklärung](/de/tax-return) veranlagt wird.

Das ist der Teil, der Fahrer erwischt. Löhne kommen bereits versteuert an, das Geld auf dem Konto gehört dir. Plattformauszahlungen kommen unversteuert an: Ein Teil davon gehört dem ATO und wurde nur noch nicht eingesammelt.

## Wann gilt GST für dich?

Erst, wenn dein Umsatz daraus in einem Steuerjahr 75.000 $ übersteigt, und das erreichen sehr wenige Working-Holiday-Fahrer. Personen-Rideshare ist die Ausnahme im australischen GST-Recht: Wer Fahrgäste fährt, muss sich ab dem ersten Dollar registrieren, unabhängig vom Umsatz.

Die Falle ist, beides zu machen. Fährst du neben dem Essen auch Fahrgäste, zieht die Rideshare-Regel dein gesamtes Gig-Einkommen ins GST-System. Ein paar Fahrten mit Fahrgästen ändern also die Behandlung eines ganzen Jahres Lieferarbeit. Wo diese Grenze verläuft, steht in unserem Guide zu [Uber fahren auf dem WHV](/de/blog/uber-driver-working-holiday-australia).

## Was kann ein Lieferfahrer absetzen?

Erst bei den Abzügen wird Lieferarbeit lohnend, denn die Bruttozahl auf einer Plattformabrechnung hat wenig damit zu tun, worauf du besteuert wirst. Fahrzeug, Ausrüstung und Handy sind ganz oder teilweise absetzbar, Servicegebühren der Plattform vollständig.

- **Fahrrad oder E-Bike**: Abschreibung über die Nutzungsdauer, Reparaturen, Reifen, Ketten, Bremsbeläge und Strom beim E-Bike
- **Motorrad oder Scooter**: Treibstoff, Zulassung, Versicherung, Wartung und Abschreibung, jeweils zum beruflichen Anteil
- **Auto**: Cent pro Kilometer bis 5.000 km, derzeit 91 Cent, oder die Fahrtenbuchmethode, die unser Guide zum [Zwölf-Wochen-Fahrtenbuch](/de/blog/vehicle-logbook-abn-working-holiday) erklärt
- **Ausrüstung**: Liefertasche, Helm, Lichter, Schloss, Satteltaschen, Handyhalter
- **Handy**: der berufliche Anteil des Tarifs und der Gerätekosten
- **Servicegebühren** der Plattform, die Uber, DoorDash oder Menulog einbehalten

Die Einkommensseite steht fest: Die Plattformen melden deine Einnahmen unter dem Sharing Economy Reporting Regime ans ATO, und die Daten werden gegen deine Abgabe abgeglichen. Die Abzugsseite ist der einzige Teil, in dem etwas entschieden wird.

## Welche Aufzeichnungen machen den Unterschied?

Die, die aus einem plausiblen Prozentsatz einen belegbaren machen. Die Jahresabrechnungen der Plattformen belegen das Einkommen, Kilometerprotokoll und Belege alles, was du davon abziehst.

- Die Jahresabrechnung jeder Plattform, für die du gefahren bist
- Kontoauszüge, die die Auszahlungen zeigen
- Belege für Rad, Ausrüstung und Handy
- Ein Fahrtenbuch oder ein repräsentativer Zeitraum für die berufliche Nutzung von allem, was du auch privat nutzt
- Die für Lieferarbeit gefahrenen Gesamtkilometer

Am schlechtesten fahren nicht die, die zu viel geltend gemacht haben, sondern die, die nichts aufbewahrt, zur Sicherheit den vorsichtigen Wert genommen und Steuer auf Einkommen gezahlt haben, das sie nie wirklich hatten.

## Bist du abgesichert, wenn du dich verletzt?

Fahrer mit einer ABN sind Contractor, die gesetzliche Unfallversicherung greift also nicht automatisch. Der Schutz hängt davon ab, was die Plattform bietet und was du selbst gekauft hast, und ist bei gleichem Unfall in der Regel enger als bei einem Angestellten.

Manche Plattformen führen ein Unfallversicherungsprodukt, das während einer aktiven Lieferung greift. Private Unfallversicherung und die Versicherung des Fahrrads sind getrennte Anschaffungen. Wo die Grenze verläuft, steht in unserem Guide zu [Rechten bei Arbeitsunfällen](/de/blog/workplace-injury-working-holiday-rights).

## Worin unterscheiden sich die Plattformen steuerlich?

Sie zahlen unterschiedlich und melden identisch. Uber Eats, DoorDash und Menulog melden ihre Jahreseinnahmen alle ans ATO. Unterschiedlich sind Gebührenstruktur und Darstellung: Manche zeigen Bruttoeinnahmen vor der Servicegebühr, manche netto. Drei Jahresabrechnungen zusammenzuzählen, ohne die Basis zu prüfen, verzeichnet ein Jahr also um einen spürbaren Betrag.

Wer für mehrere Plattformen gleichzeitig fährt, braucht deshalb eine Gewohnheit: die Jahresabrechnung jeder Plattform getrennt aufbewahren, statt von Kontoeingängen auszugehen. Eingänge verrechnen Gebühren, Korrekturen und Boni so, dass sich das nachträglich nicht mehr auseinanderziehen lässt, und das ATO hat die Bruttozahlen.

## Was entscheidet, ob dein Jahr gut oder schlecht endet?

Vier Dinge, und keines davon ist, wie viele Stunden du gefahren bist. Ob du unterwegs Geld zurückgelegt hast, denn die Rechnung kommt am Stück. Ob du daneben Lohneinkommen mit einbehaltener Steuer hattest, denn dieser Einbehalt kann die ABN-Schuld ganz oder teilweise aufsaugen. Ob du zu irgendeinem Zeitpunkt Fahrgäste gefahren bist, was deine GST-Position ändert. Und ob du die Belege hast, die die Abzüge tragen.

15 bis 25 % jeder Zahlung auf ein getrenntes Konto zu legen trennt ein sauber schließendes Jahr von einem, das mit einer Schuld endet, die du aus einem anderen Land abzutragen versuchst. Du kannst deine [Steuerposition schätzen](/de/calculator), bevor die Erklärung rausgeht, und unser Guide zu [ATO-Ratenplänen](/de/blog/ato-payment-plan-tax-debt-australia) beschreibt, was gilt, wenn du schon dort bist.
`,
  },

  'uber-driver-working-holiday-australia': {
    title: 'Uber fahren: ABN, GST und BAS im Überblick',
    description: 'Rideshare-Fahren in Australien erfordert eine ABN, GST-Registrierung ab dem ersten Dollar und vierteljährliche Business Activity Statements.',
    body: `
Rideshare trägt die strengsten Steuerregeln aller Gig-Arbeit in Australien. Du brauchst eine ABN, musst dich ab der ersten Fahrt für GST registrieren, unabhängig vom Umsatz, und quartalsweise Business Activity Statements einreichen. Diese Regel ab dem ersten Dollar trennt Rideshare von Essenslieferung und erzeugt unerwartete Schulden.

## Warum hat Rideshare eine eigene GST-Regel?

Weil Personenbeförderung für GST-Zwecke wie Taxiverkehr behandelt wird und Taxiverkehr keine Registrierungsschwelle hat. Gewöhnliche ABN-Arbeit verlangt eine GST-Registrierung erst über 75.000 $ Jahresumsatz. Rideshare verlangt sie ab der ersten Fahrt, ob du 500 $ oder 50.000 $ verdienst.

Sie gilt für Uber, Ola, Didi und jede Plattform, die Passagiere gegen Entgelt befördert, nicht für Uber Eats, andere Essenslieferung oder Paket- und Logistikarbeit, die der Standardschwelle folgen. Diese Seite behandelt unser Guide zum [Lieferfahren](/de/blog/uber-eats-delivery-rider-working-holiday-australia).

Multi-Apper erwischt es so: Sobald du Passagiere fährst, liegt die Pflicht über deiner gesamten Tätigkeit, nicht über einer App.

## Was verlangt die GST-Registrierung tatsächlich von dir?

Ein Elftel jedes Fahrpreises gehört dem ATO, und quartalsweise wird ein Business Activity Statement eingereicht, um es abzuführen. Du machst außerdem GST-Gutschriften auf Betriebsausgaben geltend.

Du schlägst keine GST auf einen Preis auf: Die Plattform setzt den Fahrpreis und meldet brutto. Deine Pflicht ist, den GST-Anteil abzuführen und Gutschriften auf Sprit, Wartung, Teile und Fahrzeugfinanzierung geltend zu machen. Bei einem aktiven Fahrer landet die Nettobelastung typischerweise bei 5 % bis 8 % der Fahrteinnahmen statt beim vollen Elftel.

Es zu ignorieren erzeugt die Schuld, mit der Leute ankommen. Wer sechs Monate ohne Statement fährt, haftet rückwirkend für jede Fahrt.

## Wann sind die Statements fällig?

Quartalsweise nach einem festen Kalender. Juli bis September ist am 28. Oktober fällig, Oktober bis Dezember am 28. Februar, Januar bis März am 28. April und April bis Juni am 28. Juli.

Die Abgabe über einen Steuerberater verlängert diese Termine typischerweise. Eines zu verpassen löst Failure-to-Lodge-Strafen auf derselben Grundlage aus wie eine verspätete Erklärung, berechnet je 28 Tage Verspätung. Wie die berechnet werden, behandelt unser Guide zu [Strafen bei verspäteter Abgabe](/de/blog/late-tax-return-penalty-working-holiday).

## Was brauchst du, bevor du überhaupt fahren kannst?

Zwei Dinge über die ABN hinaus: ein regelkonformes Fahrzeug und eine Fahrerberechtigung des Bundesstaats. Die Fahrzeuganforderungen setzt die Plattform: in der Regel eine viertürige Limousine, ein Schrägheck, ein SUV oder Kombi unter einer Höchstaltersgrenze, in gutem Zustand, aktuell angemeldet, verkehrssicher und vollkaskoversichert, mit einer Inspektion durch die Plattform.

Die Berechtigung ist Sache des Bundesstaats und getrennt von deinem gewöhnlichen Führerschein. New South Wales verlangt eine Passenger Transport Authorisation, Victoria eine Commercial Passenger Vehicle Accreditation, Queensland eine Driver Authorisation, South Australia eine General Passenger Transport Accreditation, Western Australia eine PTD-Autorisierung und das ACT eine Public Vehicle Licence. Jede umfasst in der Regel eine Polizeiprüfung, eine medizinische Beurteilung und eine Gebühr, und die Gebühr ist absetzbar.

Ohne passendes Auto nutzen manche ein Rideshare-Mietmodell; die Mietkosten sind ebenso absetzbar.

## Was kannst du absetzen?

Mehr als in fast jeder anderen Backpacker-Arbeit, denn das Fahrzeug ist das Geschäft. Die Grenze ist nicht die Liste, sondern was du belegen und beruflich aufteilen kannst.

- Sprit, Wartung, Reparaturen, Reifen und Öl
- Zinsen auf die Fahrzeugfinanzierung, zum beruflichen Anteil
- Anmeldung, Haftpflicht und Vollkasko, zum beruflichen Anteil
- Abschreibung oder die Mietkosten, wenn das Auto geleast ist
- Maut und Parkgebühren während der Fahrten
- Handy und Datenvolumen plus Gerät, zum beruflichen Prozentsatz
- Handyhalterung, Dashcam und Zubehör im Auto
- Fahrzeugreinigung
- Von der App genommene Plattform-Servicegebühren
- Gebühren für Fahrerberechtigung und ärztliche Prüfung

Fahrzeugkosten laufen über die Cent-pro-Kilometer-Methode, gedeckelt bei 5.000 Kilometern im Jahr, oder über die Fahrtenbuchmethode, ungedeckelt, aber mit zwölf durchgehenden Wochen Aufzeichnungen. Vollzeitfahrer überschreiten die Deckelung binnen Monaten, das Fahrtenbuch ist also fast immer mehr wert. Was es enthalten muss, behandelt unser Guide zu [Fahrtenbüchern](/de/blog/vehicle-logbook-abn-working-holiday).

## Weiß das ATO schon, was du verdient hast?

Ja. Plattformen melden Fahrereinnahmen unter dem Sharing Economy Reporting Regime direkt, die Bruttozahl liegt also in den ATO-Systemen, bevor du etwas einreichst, und wird gegen deine Erklärung abgeglichen.

Was du brauchst, ist deshalb kein Einkommensnachweis, sondern ein Ausgabennachweis, und der existiert nur in dem, was du aufgehoben hast.

## Wie viel solltest du unterwegs zurücklegen?

Genug für zwei getrennte Pflichten. Der GST-Anteil deiner Fahrpreise gehört dem ATO und wird quartalsweise abgeführt. Die Einkommensteuer auf deinen Gewinn ist ein zweiter Betrag, veranlagt am Jahresende.

Für dich wird nichts von beidem einbehalten. Wer die ganze Einzahlung der Plattform als Verdienst behandelt, hat beides ausgegeben und merkt es beim ersten Business Activity Statement. Wöchentlich auf ein Konto zurückzulegen, das du nicht anfasst, ist der einzige verlässliche Mechanismus.

## Was muss passieren, wenn du aufhörst zu fahren?

Zwei Abschlüsse, und die Leute machen meist keinen davon. Die GST-Registrierung muss beendet und das letzte Business Activity Statement eingereicht werden, danach die ABN selbst, datiert auf den Zeitpunkt, an dem du tatsächlich aufgehört hast.

Eine offene GST-Registrierung erzeugt weiter Quartalspflichten, auch für jemanden, der das Land verlassen hat, und sammelt Failure-to-Lodge-Strafen an. Was vor dem Beendigungsdatum abgeschlossen sein sollte, setzt unser Guide zum [Beenden einer ABN](/de/blog/how-to-cancel-your-abn) auseinander.

## Wie hast du dein Jahr gefahren?

Die Registrierungsregeln sind nicht optional, aber was das Jahr dich kostet, hängt davon ab, wie du es gefahren hast. Die ersten beiden Punkte erzeugen Schulden statt Erstattungen.

- Ob du überhaupt Passagiere befördert hast, was GST ab der ersten Fahrt auslöst.
- Ob du dich für GST registriert und die Quartalsmeldungen eingereicht hast oder eine rückwirkende Haftung angesammelt hast.
- Ob ein Zwölfwochen-Fahrtenbuch existiert, was entscheidet, wie viel vom Auto absetzbar ist.
- Ob das Fahrzeug gekauft, finanziert oder gemietet ist, was ändert, was in den Topf kommt.
- Ob du auch Lohn hattest, dessen Einbehalt oft die Steuer auf das Fahreinkommen auffängt.
- Wie viel du unterwegs zurückgelegt hast, da von keiner Fahrt etwas einbehalten wurde.
- Ob ABN und GST-Registrierung beendet wurden, als du aufgehört hast.

Die gesamte Lage wird in der [Working-Holiday-Steuererklärung](/de/tax-return) ermittelt, und du kannst deine [Steuererstattung schätzen](/de/calculator), sobald du weißt, was das Fahren tatsächlich eingebracht hat.
`,
  },

  'ski-resort-jobs-working-holiday-australia': {
    title: 'Ski-Resort-Jobs: Saison, Lohn und Rollen',
    description: 'Ski-Resort-Arbeit läuft von Juni bis September in Victoria und NSW. Was du verdienst, welche Rollen offen sind und wie du dich bewirbst.',
    body: `
Australiens Skisaison läuft von Juni bis September, über Thredbo, Perisher und Charlotte Pass in New South Wales und Hotham, Falls Creek und Buller in Victoria. Eingestellt wird in einer einzigen Herbstwelle, Monate vor dem Schnee. Zwei Dinge entscheiden, ob eine Saison sich lohnt: welcher Award deine Rolle abdeckt und was die Personalunterkunft dich kostet.

## Für welche Rollen stellen Resorts ein?

Für mehr als die naheliegenden, mit deutlichen Unterschieden in der Bezahlung. Liftbetrieb, Ski- und Snowboardunterricht, Skipatrouille, Gastronomie in Bars und Restaurants, Housekeeping und Rezeption in Unterkünften, Einzelhandel in Verleih- und Bekleidungsgeschäften, Schneeerzeugung und Pistenpräparierung in Nachtschichten sowie Ticketing und Buchungen.

Qualifikationen vorher verlangen nur zwei. Unterricht braucht eine Zertifizierung der Australian Professional Snowsport Instructors oder ein anerkanntes internationales Äquivalent, Patrouille braucht medizinische und Schneequalifikationen. Alles andere wird vor Ort angelernt, weshalb Liftbetrieb und Gastronomie die meisten Working Holiday Maker aufnehmen.

## Wann musst du dich bewerben?

Im März und April, für eine Saison, die im Juni beginnt. Australische Resorts rekrutieren in einer einzigen Herbstwelle, und die meisten Stellen sind lange vor dem ersten Schnee besetzt; eine Bewerbung im Mai konkurriert um das, was übrig ist.

Die Personalunterkunft wird mit den frühen Zusagen vergeben, und darum zählt das Timing. Wohnraum auf oder nahe dem Berg ist knapp, und eine Zusage ohne ihn macht aus einer profitablen Saison schnell eine teure. Chancen heben ein RSA bereits in der Tasche für Gastronomierollen, jede vorherige Schneeerfahrung für den Liftbetrieb und echte Flexibilität bei der Abteilung.

## Welcher Award deckt dich ab?

Der, der zur Arbeit passt, und nicht der zum Berg. Dasselbe Resort beschäftigt Leute nach drei oder vier verschiedenen Regelwerken gleichzeitig.

- Gastronomierollen: der [Hospitality Award](/de/blog/hospitality-award-working-holiday-makers), mit Abend-, Wochenend- und Feiertagszuschlägen
- Einzelhandel in Verleih- und Bekleidungsgeschäften: der General Retail Industry Award
- Liftbetrieb: üblicherweise der Amusement, Events and Recreation Award oder ein Tarifvertrag des Resorts
- Unterricht: Regelungen speziell des Resorts oder der Skischule
- Schneeerzeugung und Pistenpräparierung: Nacht- und Schichtzuschläge gelten

Wochenenden sind die Spitzenzeit des Resorts, Casual-Personal arbeitet also üblicherweise Freitag bis Sonntag, und genau dann sind die Zuschläge am höchsten. Ein aufs Wochenende gelegter Dienstplan ist spürbar mehr wert als dieselben Stunden unter der Woche.

## Was solltest du bei der Personalunterkunft prüfen?

Den Abzug, schriftlich, bevor du zusagst. Die Wohnregelungen der Resorts unterscheiden sich: Unterkunft kostenlos oder stark subventioniert als Teil des Pakets, eine wöchentliche Miete, die vom Lohn genommen wird, oder gar nichts, sodass du auf einem Berg selbst suchst, auf dem es fast nichts gibt.

Wo Miete vom Lohn abgezogen wird, muss es ein zulässiger Abzug sein, also schriftlich vereinbart, angemessen und auf dem Payslip ausgewiesen. Rechne die Nettozahl aus, bevor du dich bindest: Lohn abzüglich Unterkunftskosten, geteilt durch die Stunden, für die du wirklich eingeplant wirst, verglichen mit einem Job in der Stadt. Den Test behandelt unser Guide dazu, [welche Lohnabzüge zulässig sind](/de/blog/uniform-laundry-deductions-illegal-australia).

## Zählt Skiarbeit für das Visum im zweiten Jahr?

In der Regel nicht, und hier sind die Leute am häufigsten falsch informiert. Tourismus- und Gastronomiearbeit zählt nur in Nordaustralien oder in ausgewiesenen Remote- und Very-Remote-Gebieten als Specified Work, und die alpinen Resorts in New South Wales und Victoria liegen nicht in diesen Zonen.

Eine Saison Bier zapfen in Thredbo bringt deine 88 Tage also wahrscheinlich nicht voran, wie regional sich die Postleitzahl dort oben auch anfühlt. Manche Bau- und Instandhaltungsarbeit an einem Resort kann aus eigenem Recht in eine berechtigte Kategorie fallen, eine enge Ausnahme und keine allgemeine. Postleitzahlenlisten und berechtigte Kategorien setzt Home Affairs und ändert sie: Prüfe deine konkrete Rolle und deinen Standort gegen die aktuellen Listen, bevor du dich für ein zweites Jahr auf eine Skisaison verlässt.

## Bist du gedeckt, wenn du dich auf dem Berg verletzt?

Ja, als Angestellter, und Schneearbeit ist genau die Umgebung, in der das zählt. Die Workers Compensation deckt medizinische Behandlung, wöchentliche Zahlungen bei Arbeitsunfähigkeit und Einmalzahlungen bei dauerhafter Beeinträchtigung, ab der ersten Schicht und ohne Bedeutung deines Visums.

Die auftretenden Verletzungen sind nicht nur die dramatischen: Stürze bei Unterricht oder Patrouille, Ausrutschen in Resortgebäuden, Hebeverletzungen in Verleihshops beim ganztägigen Anpassen von Ausrüstung und kältebedingte Schäden in Nachtschichten bei der Schneeerzeugung. Melde alles zu dem Zeitpunkt, an dem es passiert, und nicht am Saisonende, denn eine nicht sofort erfasste Verletzung ist später weit schwerer nachzuweisen. Den Rahmen behandelt unser Guide zu [Rechten bei Arbeitsverletzungen](/de/blog/workplace-injury-working-holiday-rights).

## Was kannst du zur Steuerzeit geltend machen?

Mehr als in den meisten Saisonrollen, wenn du unterrichtest, und sehr wenig, wenn nicht. Sonnenschutz zählt in der Höhe mehr, als die meisten erwarten, dazu rutschfeste Schuhe für Innenrollen, selbst gekaufte Uniformteile, ein Arbeitsanteil deines Telefons und Fahrten zwischen getrennten Standorten am Berg während eines Arbeitstages.

Instruktoren sind die ernstzunehmende Ausnahme. Kursgebühren für die Lehrqualifikation, Brillen für die Rolle und die eigenen Ski oder das eigene Board, soweit im Unterricht genutzt, sind absetzbar, mit Aufteilung für die private Nutzung. Ausrüstung, die zu 60 % für Unterricht und zu 40 % für eigene Abfahrten genutzt wird, ist zu 60 % absetzbar, und die Aufteilung muss ehrlich und festgehalten und nicht angenommen sein. Eine konzentrierte Drei- oder Viermonatssaison liegt außerdem oft im selben Steuerjahr neben anderem Einkommen, und das gehört geklärt, bevor die [Steuererklärung](/de/tax-return) erstellt wird.
`,
  },

  'supermarket-work-coles-woolworths-working-holiday': {
    title: 'Supermarktjobs: Coles, Woolworths, ALDI',
    description: 'Coles, Woolworths und ALDI stellen ganzjährig für Kasse, Regal, Feinkost und Nachtschicht ein. Feste Stunden, Award-Lohn und Zuschläge am Abend.',
    body: `
Supermarktarbeit fällt unter den General Retail Industry Award (MA000004), aber bei den großen Ketten gilt meist stattdessen ein Tarifvertrag. Welches der beiden Regelwerke für dich gilt, entscheidet deinen Satz, deine Zuschläge und woran ein fehlendes Loading gemessen wird. Deine Einstufungsstufe darin entscheidet den Rest, und sie folgt deinen Aufgaben und nicht deiner Jobbezeichnung.

## Für welche Rollen stellen die Supermärkte ein?

Für eine breitere Palette als die Kasse, und die Schichten zahlen unterschiedlich: Kasse und Kundenservice, Regalauffüllung während der Öffnungszeiten, nächtliche Auffüllung, die Frischabteilungen mit Feinkost, Bäckerei, Fleisch und Fisch, Spirituosen wo ein RSA verlangt wird, das Kommissionieren von Onlinebestellungen, Warenannahme und Rampenarbeit, Einkaufswageneinsammeln und Reinigung im Markt.

Die Ketten stellen in fast allen davon laufend und in jeder Stadt ein, weshalb Supermarktarbeit die fast immer verfügbare Rückfalloption ist. Besonders Kommissionieren und Einkaufswageneinsammeln wechselt ständig, und Verfügbarkeit an Abenden und Wochenenden lässt eine Bewerbung überhaupt anschauen.

## Was entscheidet deinen Lohnsatz?

Zwei Dinge nacheinander. Erstens, ob der Markt vom General Retail Industry Award oder von einem Tarifvertrag gedeckt ist, denn die großen Ketten arbeiten unter Vereinbarungen, die den Award ersetzen, während kleinere Betreiber den Award direkter anwenden. Zweitens deine Einstufungsstufe darin.

Bei der Einstufung verlieren Working Holiday Maker still Geld. Level 1 deckt Standardaufgaben ab, Level 2 breitere Verantwortung, Level 3 delegierte Befugnis und das Einarbeiten anderer, und die Stufe folgt dem, was du tatsächlich tust, nicht der Dauer. Wer Neue einarbeitet und eine Abteilung führt und dabei auf Level 1 steht, wird unterbezahlt, und auf einem Payslip ist das unsichtbar, wenn man die Stufen nicht kennt. Den Test setzt unser Guide zu [Award-Einstufungen](/de/blog/award-classifications-working-holiday-australia) auseinander.

## Was ändert ein Tarifvertrag?

Er ersetzt den Award für die erfassten Arbeitskräfte vollständig und kann die Zuschlagsstruktur umbauen statt bloß die Basis anzuheben. Vereinbarungen setzen die Grundsätze in der Regel über den Award und passen die Loadings an, mal nach oben und mal nach unten, dazu andere Regeln für Pausen und Überstunden.

Der Schutz ist der Better Off Overall Test: Jeder Angestellte muss unter der Vereinbarung insgesamt besser stehen als unter dem Award. Die Fair Work Commission wendet ihn bei der Genehmigung an, weshalb eine Vereinbarung mit niedrigerem Sonntagszuschlag rechtmäßig sein kann, wenn der Grundsatz das ausgleicht. Für dich heißt das: Ein Vergleich deines Payslips mit dem General Retail Award beweist nichts. Die Vereinbarung ist das zu prüfende Dokument, und sie ist auf der Website der Fair Work Commission veröffentlicht.

## Warum zahlen Nachtschichten so viel besser?

Weil sich die Loadings stapeln. Nächtliche Auffüllung, typischerweise von etwa 22 Uhr bis 6 Uhr, bringt Schichtzuschläge deutlich über den Tagessätzen und in manchen Vereinbarungen zusätzlich eine Tageszulage.

Der andere Vorteil ist die Form der Arbeit. Nachtschichten laufen als voller Block statt in den geteilten Mustern der Gastronomie: Acht bezahlte Stunden sind acht Stunden und nicht eine Mittagsschicht, eine Lücke von vier Stunden und eine Abendschicht. Für einen Backpacker, der schnell Geld ansammeln will, ist höherer Satz plus ununterbrochene Stunden meist mehr wert als ein Tagesdienstplan.

## Was geht selbst bei den großen Ketten schief?

Weniger als in der Gastronomie, aber nicht nichts. Die Lohnabrechnung bei den Großen funktioniert in der Regel: Super kommt an, Payslips sind aufgeschlüsselt, Dienstpläne erscheinen im Voraus. Die Probleme liegen in der Einstufung und an den Rändern der Zuschlagsstruktur.

- Feiertagszuschlag übersehen, wo der Feiertag auf einen regulären Dienstplantag fiel
- Einstufung auf Level 1 belassen, obwohl die Aufgaben längst gewachsen sind
- Rüstzeit vor der Schicht oder Zeit danach nicht bezahlt
- Nachtzuschlag nicht auf eine Schicht angewendet, die die Auslösezeit überschritten hat
- Bundesstaatsspezifische Feiertage nicht anerkannt bei jemandem, der den Bundesstaat gewechselt hat

Die meisten werden über den Lohnprozess des Arbeitgebers behoben, sobald sie mit dem Payslip in der Hand angesprochen werden. Fair Work ist der Weg, wenn das scheitert.

## Bist du gedeckt, wenn du dich verletzt?

Ja, ab der ersten Schicht, ohne Mindestdienstzeit und unabhängig vom Visum. Verletzungen im Einzelhandel sind weniger dramatisch als im Bau und nicht weniger real: Rückenverletzungen beim Heben von Ware, Ausrutschen auf nassen Böden, Schnitte in Feinkost und Bäckerei und Belastungsschäden vom Scannen.

Entscheidend ist die sofortige Meldung. Eine am Tag des Geschehens im Unfallbuch des Marktes erfasste Verletzung stützt einen Anspruch; dieselbe Verletzung drei Wochen später ist viel schwerer mit der Arbeit zu verbinden. Den Rahmen behandelt unser Guide zu [Rechten bei Arbeitsverletzungen](/de/blog/workplace-injury-working-holiday-rights).

## Was können Supermarktarbeiter geltend machen?

Nicht viel. Supermarktarbeit stellt das meiste, was du brauchst; die echten Positionen sind rutschfeste Schuhe, verlangte und nicht gestellte Kleidung, die Wäsche einer gestellten Uniform, wo der Arbeitgeber sie nicht wäscht, eine selbst gezahlte RSA-Gebühr für die Spirituosenabteilung und ein Arbeitsanteil der Handykosten für die Schichtkoordination.

Personalrabatte sind in keiner Richtung ein Steuerthema. Sie sind eine geringfügige Leistung und kein steuerpflichtiges Einkommen, sie sind nicht als ersparte Kosten absetzbar, und sie zählen nicht zur Award-Einhaltung: Eine Rabattkarte ersetzt nicht den korrekten Stundensatz. Was tatsächlich zählt, behandelt unser Guide zu [Werbungskosten für Working Holiday Maker](/de/blog/tax-deductions-working-holiday-makers).
`,
  },

  'station-hand-cattle-station-working-holiday-australia': {
    title: 'Station-Hand-Jobs im Outback: Lohn, Alltag',
    description: 'Cattle Stations im Outback stellen für Mustering, Zäunen und Viehpflege ein. Unterkunft und Verpflegung sind meist inklusive, die Arbeitstage sind lang.',
    body: `
Stationsarbeit fällt unter den Pastoral Award MA000035, zählt für die 88 Tage Specified Work für ein Visum im zweiten Jahr und kommt fast immer mit Unterkunft und Verpflegung im Paket. Die Bezahlung sieht gegen Stadtarbeit niedrig aus, bis man das Paket einrechnet, und im Paket sitzt der größte Teil der Verwirrung.

## Was umfasst die Arbeit tatsächlich?

Vieh und Infrastruktur, in dem Verhältnis, das die Saison verlangt. Mustern zu Pferd, auf dem Motorrad oder im Buggy, Rinderhandling in den Yards einschließlich Sortieren, Entwurmen, Branding und Impfen, Kalben und Neugeborenenpflege, Zäune, Bohrloch- und Wassertrogwartung, Maschinen- und Traktorarbeit und allgemeine Instandhaltung.

Größere Stationen tragen außerdem eine Camp-Cook-Rolle und seltener die Stationsverwaltung. Was du tust, hängt an Art des Anwesens, Region und Saison: Eine Cattle Station und eine Schafstation sind verschiedene Betriebe.

## Wo liegen die Stationen, und wann stellen sie ein?

Die vier Hauptregionen laufen jeweils auf ihrem eigenen Kalender: das Northern Territory mit Barkly Tableland, Victoria River District und Top End, Western Australia mit Kimberley, Pilbara, mittlerem Westen und südlichem Wheatbelt, Queensland mit Channel Country, Nordwesten und Gulf Country, South Australia mit fernem Norden und Eyre-Halbinsel.

Der Norden läuft auf Regen- und Trockenzeiten statt auf Sommer und Winter, und gemustert wird in der Trockenzeit. Der Süden läuft auf heiße Sommer und kühlere Winter, und das bestimmt, wann Arbeit verfügbar ist.

## Was setzt der Pastoral Award?

Er setzt Mindeststundensätze nach Einstufung. Farm and Livestock Hand Level 1 erfasst neue Kräfte bei einfachen Aufgaben unter Aufsicht, Level 2 erfahrene Kräfte mit etwas Eigenständigkeit und Level 3 qualifizierte Kräfte, die Maschinen bedienen oder kleine Teams führen, mit höheren Stufen bis zu Leading Hands und Head Stockmen. Für Schur, Schuppenarbeit und großflächigen Ackerbau existieren eigene Einstufungen.

Der Award-Satz ist eine Untergrenze, kein üblicher Satz. Ab dem 1. Juli 2026 liegt das Casual-Minimum bei 33,05 $ pro Stunde, also dem nationalen Minimum von 26,44 $ plus dem 25-%-Loading, und die Einstufungen im Pastoralbereich laufen darüber, sobald Erfahrung anerkannt wird. Viele Stationen arbeiten unter Tarifverträgen, die dich insgesamt besser stellen müssen als der Award.

## Wie funktioniert die All-Found-Vereinbarung?

Die Station stellt ein Zimmer in der Personalunterkunft oder im Homestead, Mahlzeiten aus der Stationsküche oder Rationen für abgelegene Camps, und zahlt einen Barsatz für alles andere. Diese All-Found-Vereinbarung ist im ländlichen Australien Standard.

Werden Unterkunft und Mahlzeiten vom Lohn abgezogen, muss der Abzug zulässig und innerhalb der Award-Grenzen sein. Werden sie wirklich gestellt, greifen bei echt abgelegenen Anwesen häufig Fringe-Benefits-Vergünstigungen für Remote Areas, was das Paket steuerlich effizienter machen kann, als die Barzahl vermuten lässt. Living-away-from-home-Zulagen gelten in manchen Einstufungen.

## Zählt es für das Visum im zweiten Jahr?

Ja, sofern vier Bedingungen erfüllt sind: eine ausgewiesene regionale Postleitzahl, was auf die meisten Stationen zutrifft; eine Kategorie der Specified Work, und Tierzucht einschließlich Vieh zählt; bezahlte Arbeit; und Dokumentation mit Payslips und an das ATO gemeldetem Einkommen.

An der Dokumentation scheitern Anträge für das zweite Jahr, nicht an der Arbeit. Eine Station, die teilweise bar zahlt, oder ein Arbeitgeber ohne Payslips lässt dich mit den gearbeiteten Tagen und ohne Beleg zurück, und der Einwanderungsantrag braucht den Beleg.

## Was passiert, wenn du dort draußen verletzt wirst?

Die Workers Compensation deckt jeden Angestellten auf einer Station unabhängig von Abgelegenheit und Dienstzeit, einschließlich Evakuierungskosten, was zählt, wenn das nächste Krankenhaus einen Flug entfernt ist. Sie zahlt medizinische Behandlung, wöchentliche Zahlungen bei Arbeitsunfähigkeit und Einmalzahlungen bei dauerhafter Beeinträchtigung.

Stationsarbeit trägt höhere Verletzungsraten als die meisten Branchen: Verletzungen im Umgang mit Tieren durch Tritte, Quetschungen und Stürze, Fahrzeug- und Maschinenvorfälle auf rauem Gelände, Hitzeerkrankungen, Schlangenbegegnungen und die Isolation, die jedes davon verschlimmert. Der Royal Flying Doctor Service ist manchmal der einzige Zugang zur Versorgung. Wie ein Anspruch läuft, behandelt unser Guide zu [Rechten bei Arbeitsverletzungen](/de/blog/workplace-injury-working-holiday-rights).

## Was kann ein Station Hand zur Steuerzeit geltend machen?

Mehr als in den meisten Working-Holiday-Rollen, denn Station Hands stellen echte Ausrüstung: Arbeits- und Reitstiefel, einen Schutzhut, langärmlige Arbeitskleidung und Sonnenschutz, Handschuhe, persönliches Werkzeug wie ein Messer oder Zaunwerkzeug und Sattel und Zaumzeug, wo du eigenes stellst.

Der Test ist, ob der Gegenstand überwiegend beruflich genutzt wird, geradlinig bei einer Zaunzange und weniger bei einem Hut, den du auch an freien Tagen trägst. Ab dem 1. Juli 2026 gibt es außerdem den pauschalen berufsbezogenen Abzug von 1.000 $ ohne Belege, für viele Station Hands einfacher als das Einzelaufführen.

## Was solltest du vor der Zusage klären?

Die Bedingungen, schriftlich, denn vier Stunden von der nächsten Stadt entfernt neu zu verhandeln ist keine Option. Bestätige Einstufung und Stundensatz, ob Unterkunft und Mahlzeiten gestellt oder abgezogen werden, wie hoch der Abzug ist, die erwarteten Stunden und Tage und wie und wann du bezahlt wirst.

Frag ausdrücklich nach Payslips und Superannuation. Beides sind gesetzliche Anforderungen, keine Gefälligkeiten, und ein Anwesen, das dabei zögert, hat dir etwas Nützliches gesagt. Bestätige außerdem, dass die Postleitzahl für Specified Work qualifiziert, wenn das zweite Jahr Teil deines Grundes ist.

## Wie wirkt sich die Isolation darauf aus, korrekt bezahlt zu werden?

Sie macht die Überprüfung schwerer, nicht die Regeln anders. Der Handyempfang ist lückenhaft, Bankgeschäfte laufen unregelmäßig, und einen Payslip gegen eine Award-Klausel zu halten ist schwer, wenn das Internet eine Stunde am Tag funktioniert.

Das ist das Argument dafür, jeden Payslip beim Eintreffen zu fotografieren und ab der ersten Woche ein Tagesprotokoll der Stunden zu führen. Vier Monate einer Mustersaison nachträglich zu rekonstruieren ist nahezu unmöglich, und deshalb laufen Lohnstreitigkeiten auf Stationen so oft auf Erinnerung gegen Erinnerung hinaus.

## Was steht in der Vereinbarung des Anwesens?

Der Award ist überall derselbe. Was du bekommst und was es wert ist, entscheidet die Vereinbarung auf dem konkreten Anwesen.

- Welcher Einstufung deine Aufgaben entsprechen, denn Level 1 und Level 3 sind spürbar verschiedene Sätze.
- Ob statt des Awards ein Tarifvertrag gilt.
- Ob Unterkunft und Mahlzeiten gestellt oder abgezogen werden und ob ein Abzug innerhalb der Award-Grenzen liegt.
- Ob das Anwesen abgelegen genug ist, dass die Fringe-Benefits-Vergünstigungen greifen.
- Ob Postleitzahl und Arbeitsart für die 88 Tage qualifizieren und ob es dokumentiert ist.
- Ob überhaupt Payslips ausgestellt wurden, was sowohl den Visumsnachweis als auch jede Lohnforderung entscheidet.
- Ob auf den Baranteil 12 % Superannuation gezahlt wurden.

Das Jahr wird in der [Working-Holiday-Steuererklärung](/de/tax-return) abgerechnet, und du kannst aus dem tatsächlich Einbehaltenen deine [Steuererstattung schätzen](/de/calculator).
`,
  },

  'bringing-money-into-australia-10000-reporting-threshold': {
    title: 'Bargeld einführen: Meldegrenze 10.000 $',
    description: 'Du darfst beliebig viel Geld nach Australien bringen. Ab 10.000 Dollar in bar musst du es beim Zoll melden, eine Steuer fällt dabei aber nicht an.',
    body: `
Es gibt keine Grenze dafür, wie viel Geld du nach Australien bringen kannst, und es wird beim Hereinbringen nicht besteuert. Bargeld ab 10.000 $ muss an der Grenze deklariert werden, elektronische Überweisungen in dieser Höhe meldet die Bank automatisch. Die Meldung ist Überwachung, keine Besteuerung.

## Worum geht es bei der 10.000-$-Regel eigentlich?

Um eine Geldwäscheregel, verwaltet von AUSTRAC, Australiens Finanzaufklärungsstelle. Sie verfolgt Bargeldströme und zieht keine Steuern ein. Jede Bewegung von 10.000 $ oder mehr in Scheinen und Münzen, oder dem Fremdwährungsäquivalent, nach Australien hinein oder heraus muss gemeldet werden.

Die Schwelle erfasst Bargeld am Körper, im Gepäck, in der Post oder per Kurier und gilt für jeden, der die Grenze überquert. Gemeldet wird auf einem Cross-Border Movement Report am Flughafen oder online.

Bei elektronischen Überweisungen löst dieselbe Schwelle eine automatische Meldung durch die Bank oder den Transferdienst aus. Du selbst reichst nichts ein, der Anbieter erledigt es.

## Erzeugt eine Deklaration eine Steuerrechnung?

Nein. AUSTRAC und das ATO sind getrennte Behörden mit verschiedenen Aufgaben; eine Meldung an die eine wird der anderen nicht zur Veranlagung übergeben. 25.000 $ Ersparnisse aus Deutschland für den Start einer Working Holiday werden an der Grenze gemeldet und nirgends besteuert.

Die Ersparnisse wurden vor deiner Ankunft verdient und sind kein Einkommen aus australischer Quelle. Australische Steuer hängt an dem, was du hier verdienst. Denselben Grundsatz in der anderen Richtung behandelt unser Guide zum [Überweisen von Geld aus Australien](/de/blog/transferring-money-overseas-australia-tax).

## Was, wenn du unter 10.000 $ bleibst?

Dann wird keine Meldung gemacht, solange es schlicht der Betrag ist, den du bewegst. Die Schwelle gilt pro Bewegung und nicht pro Jahr: eine Überweisung von 9.000 $ ist ungemeldet, eine von 11.000 $ gemeldet.

Einen größeren Betrag absichtlich zu stückeln, um unter der Schwelle zu bleiben, ist etwas völlig anderes. Es heißt Structuring, ist nach den Geldwäschegesetzen eine Straftat und wiegt erheblich schwerer als die Meldung, die du vermeiden wolltest. Die Meldung selbst kostet dich nichts.

## Was ist mit den Bankzinsen?

Hier hängt ein australisches Bankkonto wirklich mit deiner Steuererklärung zusammen. Australische Banken melden gezahlte Zinsen an das ATO, und die Zinsen sind erklärungspflichtig, wie klein sie auch sind.

Ohne hinterlegte TFN muss die Bank auf Zinsen zum Höchstsatz einbehalten, und das ist bei der Abgabe rückholbar. Auf einem Girokonto mit ein paar Dollar Zinsen ist das ein Rundungsposten, aber der Grund, warum Banken immer wieder nach der Nummer fragen.

## Welche Aufzeichnungen lohnen sich?

So viele, dass sie beantworten, woher das Geld kam. Das ist eine niedrige Hürde, und ein Kontoauszug der Heimatbank nimmt sie.

- Ein Auszug deiner Bank zu Hause, der die Ersparnisse vor der Überweisung zeigt
- Die AUSTRAC-Deklarationsquittung, falls du an der Grenze Bargeld deklariert hast
- Unterlagen zu einem Geschenk, einem Fahrzeugverkauf oder einem Anlagenverkauf, der die Reise finanziert hat

Das ATO hat Datenabgleichszugriff auf AUSTRAC-Meldungen und auf australische Bankunterlagen; eine Abweichung zwischen sichtbaren Mitteln und erklärtem Einkommen kann eine Frage auslösen. Schwierig wird es nur bei Geld, das tatsächlich nicht gemeldetes australisches Einkommen ist, meist nie erklärte Bararbeit.

## Wie solltest du das Geld tatsächlich mitbringen?

Über einen regulierten Kanal, und das zählt mehr für die Sicherheit als für die Steuer. Eine Banküberweisung oder ein lizenzierter Transferdienst hinterlässt eine Spur, kommt sicher an und gibt in der Regel einen besseren Wechselkurs, als Scheine mitzunehmen und hier zu tauschen. Währung ab 10.000 $ muss trotzdem an der Grenze deklariert werden, wie du sie auch mitbringst.

## Wo sitzt das eigentliche Risiko?

Nicht bei der Meldung und nicht bei der Steuer, sondern bei den Maschen, die auf Neuankömmlinge zielen. Die kosten einen Backpacker weit eher Geld als jede AUSTRAC-Schwelle.

Die Muster wiederholen sich: jemand fragt nach Bankdaten und TFN, um dir Geld zu schicken; ein ungewöhnlich guter Wechselkurs, wenn du zuerst Bargeld schickst; ein Jobangebot mit Vorabzahlung; Romance Scams, die in Überweisungen auf ausländische Konten enden. Regulierte Anbieter und lizenzierte Wechselstuben machen das alles überflüssig. Wer berechtigt ist, nach deinen Daten zu fragen, steht in unserem Guide zum [Schutz deiner TFN](/de/blog/tfn-security-protect-from-fraud).

## Was zählt als physische Währung?

Scheine und Münzen in jeder Währung, zum Zeitpunkt der Bewegung in australische Dollar umgerechnet. Die Kategorie ist enger, als die Leute annehmen, und schließt das meiste aus, was ein Reisender bei sich trägt.

- Scheine und Münzen in jeder Währung, auch in deiner Heimatwährung
- Bargeld im Gepäck, in der Post oder per Kurier

Inhaberpapiere wie Reiseschecks und Zahlungsanweisungen fallen unter eine eigene Meldungsregel, die greift, wenn du danach gefragt wirst, statt automatisch. Eine mit 30.000 $ geladene Debitkarte ist keine physische Währung und wird an der Grenze nicht gemeldet, auch wenn die Bank die Überweisung gemeldet hat, die sie gefüllt hat.

## Was passiert, wenn du nicht deklarierst?

Nicht deklarierte Währung über der Schwelle kann an der Grenze beschlagnahmt werden, sofort und nicht als später festgesetztes Bußgeld. Sie zurückzubekommen heißt, die Herkunft in einem Verfahren zu erklären, das erheblich anspruchsvoller ist als die Deklaration es gewesen wäre.

Die Deklaration selbst erzeugt keine Steuerpflicht, im Regelfall keine Nachfrage und keinen Eintrag, der dir schadet.

Dasselbe gilt auf dem Rückweg. Wer aufgelaufenen Lohn, eine Erstattung und eine Superzahlung bar nach Hause trägt, liegt manchmal über der Schwelle, ohne darüber nachgedacht zu haben; die Deklaration bei der Ausreise funktioniert genauso wie die bei der Einreise.

## Was entscheidet, ob irgendetwas davon deine Steuererklärung berührt?

Eine Tatsache: ob das Geld Ersparnis oder Einkommen ist. Hereingebrachte Ersparnisse, Geschenke von Familie und Erlöse aus dem Verkauf von etwas zu Hause liegen außerhalb des australischen Steuersystems und bleiben dort, wie sie auch ankommen. In Australien verdientes Geld liegt darin, ob es als Banküberweisung, als Bargeld oder als Umschlag von einer Farm ankam.

Diese Unterscheidung ist die gesamte Analyse. Schwierig wird nur ein Jahr, das beides mischt, besonders nie gemeldete Bararbeit neben erklärtem Lohn, und das klärt man besser sauber bei der Vorbereitung der [Steuererklärung](/de/tax-return), statt es als offene Frage zu lassen.
`,
  },

  'ato-tax-debt-failure-to-pay-penalty-australia': {
    title: 'ATO-Steuerschuld: Zinsen und Strafzuschlag',
    description: 'Zahlst du eine Steuerschuld beim ATO nicht rechtzeitig, läuft die General Interest Charge täglich weiter und die Failure-to-Pay-Strafe kommt dazu.',
    body: `
Eine unbezahlte ATO-Schuld wächst über den General Interest Charge, der ab dem ursprünglichen Fälligkeitsdatum täglich aufgezinst wird. Eine getrennte Failure-to-Pay-Strafe kann für jeweils 28 Tage greifen, die die Schuld offen steht. Australien zu verlassen stoppt keines von beidem, und die Schuld kann aus deiner Superzahlung genommen werden.

## Woher kommen Steuerschulden bei Working Holiday Makern?

Fast nie vom Lohn. Lohn kommt mit bereits einbehaltener Steuer an, ein reines Lohnjahr erzeugt also sehr selten eine Schuld. Schulden kommen aus Einkommen, das unversteuert ankam.

- ABN- oder Contracting-Einkommen ohne Einbehalt im Jahr
- Ein unbezahltes Business Activity Statement bei einem GST-registrierten Rideshare-Fahrer
- Ein geänderter Bescheid, der die Steuer nach der ursprünglichen Erklärung erhöht hat
- Ein Strafbescheid für verspätete Abgabe oder zu niedrig erklärtes Einkommen

Die häufigste Variante ist ein Liefer- oder Rideshare-Jahr, in dem jede Auszahlung als verfügbares Geld behandelt wurde. Warum dieses Einkommen laufend einen Anteil zurückgelegt braucht, behandelt unser Guide zum [Uber-Fahren auf einer Working Holiday](/de/blog/uber-driver-working-holiday-australia).

## Was ist der General Interest Charge?

Der General Interest Charge sind täglich aufgezinste Zinsen auf eine unbezahlte Steuerschuld, quartalsweise deutlich über dem Leitzins festgesetzt, in 2025-26 bei rund 11 % pro Jahr. Er läuft ab dem ursprünglichen Fälligkeitsdatum bis zur Tilgung der Schuld und pausiert für nichts.

Eine Schuld von 1.000 $, ein Jahr liegen gelassen, sammelt rund 115 $ an. Dieselbe Schuld über drei Jahre sammelt rund 370 $ an, und sie läuft weiter, während du in einem anderen Land lebst.

## Was ist die Failure-to-Pay-Strafe?

Eine von den Zinsen getrennte Belastung: eine Straf-Einheit von 330 $ für jeweils 28 Tage offener Schuld, gedeckelt bei fünf Einheiten. Anders als die Zinsen wird sie im Ermessen des ATO angewendet und nicht automatisch.

Das Muster ist recht vorhersehbar: erhebliche Schulden, wiederholte Nichtzahlung und vor allem Schweigen. Wer sich mit dem ATO über eine Schuld auseinandergesetzt hat, steht anders da als jemand, der drei Bescheide ignoriert hat, und daran hängt das Ermessen.

## Wie unterscheidet sich das von der Strafe für verspätete Abgabe?

Es sind unabhängige Systeme, die beide auf dasselbe Jahr wirken können. Failure to Lodge wird berechnet, wenn die Erklärung selbst zu spät ist, mit 330 $ je 28 Tage bis zu fünf Einheiten. Failure to Pay plus Zinsen wird berechnet, wenn das Geld nicht bis zum Fälligkeitsdatum gezahlt wird.

Spät einzureichen und spät zu zahlen zieht beides nach sich, und die Gesamtsumme kann die ursprünglich geschuldete Steuer übersteigen. Wo Abgabestrafen tatsächlich greifen, erklärt unser Guide zu [Strafen bei verspäteten Erklärungen](/de/blog/late-tax-return-penalty-working-holiday).

## Wann ist die Schuld tatsächlich fällig?

Wer über einen registrierten Steuerberater einreicht, zahlt in der Regel 21 Tage nach Ergehen des Bescheids. Bei Selbsteinreichern ist der Termin typischerweise der 21. November nach Ende des Steuerjahres. BAS-Schulden sind fällig, wenn das BAS fällig ist, für die meisten 28 Tage nach Quartalsende.

Das 21-Tage-Fenster erwischt Leute, die im April eine Erstattung erwarten und eine Rechnung bekommen. Von einem anderen Land aus ist das wenig Zeit, um Geld aufzutreiben, also lohnt es, die Lage vor der Abgabe zu kennen und nicht danach.

## Was passiert, wenn du Australien mit Schulden verlässt?

Die Schuld reist nicht mit deinem Pass, aber sie verschwindet auch nicht. Die Zinsen laufen täglich weiter, die Schuld kann gegen jede künftige australische Erstattung verrechnet werden, und sie liegt in deinem Datensatz, wenn ein künftiges australisches Visum geprüft wird.

Am meisten wehtut die Verrechnung gegen deine Super. Das ATO kann eine offene Steuerschuld gegen eine DASP-Zahlung setzen, und weil der DASP bereits mit 65 % einbehalten wird, bleibt weit weniger übrig, als das Bruttoguthaben vermuten lässt. Ein Superguthaben von 4.000 $ zahlt nach DASP-Einbehalt etwa 1.400 $ aus, und eine Schuld von 2.000 $ zehrt das vollständig auf und lässt 600 $ offen. Die Schuld vor dem Antrag zu klären ist meist die bessere Reihenfolge.

## Können Zinsen oder Strafe erlassen werden?

Ja, unter bestimmten Umständen. Das ATO hat Ermessen, sowohl die Zinsen als auch die Failure-to-Pay-Strafe zu reduzieren oder zu streichen, wo Gründe vorliegen.

- Echte finanzielle Härte, die die Zahlung verhindert hat
- Ein Verwaltungsfehler des ATO, der die Schuld verursacht oder mitverursacht hat
- Umstände außerhalb deiner Kontrolle wie schwere Krankheit oder eine Naturkatastrophe
- Ein erstmaliger Zahlungsausfall bei ansonsten sauberer Historie

Ein Erlassantrag muss ausdrücklich gestellt und mit Belegen gestützt werden. Eine allgemeine Beschwerde über die Höhe ist kein Antrag.

## Wie findest du heraus, was du tatsächlich schuldest?

Die Schuld auf einem Bescheid ist eine Momentaufnahme und keine laufende Summe, denn die Zinsen laufen ab dem ursprünglichen Fälligkeitsdatum täglich. Eine Zahl in einem Brief von vor vier Monaten ist bereits falsch.

Eine aktuelle Lage setzt außerdem voraus, dass jede Erklärung und jedes Statement eingereicht ist. Steht ein BAS-Quartal oder ein früheres Jahr offen, ist die Schuld in der Akte unvollständig und manchmal zu hoch, denn ein nicht eingereichtes Jahr, das eine Erstattung erzeugt hätte, liegt unbeantragt und kann nichts verrechnen.

## Was ändert ein Zahlungsplan tatsächlich?

Ein Zahlungsplan stoppt Inkassomaßnahmen und wandelt die Schuld in Raten um, die du bedienen kannst. Er stoppt die Zinsen nicht, die auf dem sinkenden Saldo weiterlaufen, ein Plan ist also eine Liquiditätsvereinbarung und kein Nachlass.

Kurze Pläne unter zwölf Monaten sind in der Regel auf Antrag verfügbar. Längere verlangen mehr Unterlagen, und daneben existieren getrennte Härtefallregelungen. Entscheidend ist der Zeitpunkt: Ein vor dem Fälligkeitsdatum beantragter Plan ist gewöhnliche Verwaltung, derselbe Antrag nach achtzehn Monaten Schweigen eine Verhandlung aus deutlich schwächerer Position.

## In welcher Reihenfolge solltest du das angehen?

Zuerst alles einreichen, dann die echte Zahl ermitteln, dann sie regeln. Umgekehrt zahlen Leute Zinsen auf einen falschen Bescheid oder tilgen eine Schuld, während ein nicht eingereichtes Jahr, das sie gedeckt hätte, unbeantragt liegt. Steht auch ein Superantrag an, wird die Schuld besser vorher geregelt, und die Reihenfolge zu klären gehört zur Vorbereitung der [Steuererklärung](/de/tax-return).

## Was entscheidet, wie schlimm das wird?

Nicht die Größe der ursprünglichen Schuld, sondern zwei andere Dinge: wie früh du dich meldest, und ob jede offene Erklärung und jedes Statement tatsächlich eingereicht wurde. Zum ersten erklärt unser Guide zu [ATO-Zahlungsplänen](/de/blog/ato-payment-plan-tax-debt-australia), wie diese Pläne funktionieren. Das zweite ist erledigt, indem die [Steuererklärung](/de/tax-return) und ein etwaiges BAS vor dem Flug vollständig gemacht werden statt danach.
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
