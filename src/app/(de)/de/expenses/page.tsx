import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/(site)/HomeWa'
import { waUrl } from '@/lib/wa'

export const metadata: Metadata = {
  "title": "Steuerabzüge nach Job in Australien",
  "description": "Was absetzbar ist, hängt davon ab, was du gearbeitet hast. Listen für Farmarbeit, Gastronomie, Bau, Lieferdienste, Reinigung, Zeitarbeit und FIFO.",
  "keywords": [
    "Backpacker Steuerabzüge Australien",
    "Working Holiday steuerlich absetzen",
    "was können Backpacker absetzen",
    "ATO Abzüge Working Holiday Maker",
    "arbeitsbezogene Kosten Australien",
    "Kilometerpauschale Australien",
    "417 Visum Steuerabzüge",
    "462 Visum Steuerabzüge"
  ],
  "alternates": {
    "canonical": "/de/expenses",
    "languages": {
      "en-AU": "/expenses",
      "de": "/de/expenses",
      "ja": "/ja/expenses",
      "x-default": "/expenses"
    }
  },
  "openGraph": {
    "images": [
      {
        "url": `${SITE_URL}/og-image.png`,
        "width": 1200,
        "height": 630,
        "alt": "Working Holiday Tax"
      }
    ],
    "type": "website",
    "locale": "de_DE",
    "url": `${SITE_URL}/de/expenses`,
    "siteName": "Working Holiday Tax",
    "title": "Steuerlich absetzbar in Australien: nach Job sortiert",
    "description": "Ein Fruit Picker und ein Lieferfahrer setzen nicht dasselbe ab. Such deinen Job und sieh, was wirklich gilt."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Steuerlich absetzbar in Australien: nach Job sortiert",
    "description": "Ein Fruit Picker und ein Lieferfahrer setzen nicht dasselbe ab. Such deinen Job und sieh, was wirklich gilt."
  },
  "robots": {
    "index": true,
    "follow": true,
    "googleBot": {
      "index": true,
      "follow": true,
      "max-snippet": -1,
      "max-image-preview": "large"
    }
  }
}

const WA = waUrl({ topic: 'expenses', lang: "de", detail: "Absetzbare Kosten in meinem Job" })

const UI = {
  "ctaLabel": "Schreib uns auf WhatsApp",
  "ctaSub": "Antwort in etwa einer Stunde.",
  "guaranteeHeading": "Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also nie drauf.",
  "guaranteeBody": "Working-Holiday-Steuer ist das Einzige, was wir machen. Deine Steuererklärung wird vor der Einreichung beim ATO von einem registrierten Steuerberater geprüft und freigegeben.",
  "faqHeading": "Fragen, die uns dazu gestellt werden",
  "guidesHeading": "Danach lesenswert",
  "otherJobs": "Anderer Job? Hier sind alle Berufe.",
  "servicesLabel": "Weiter auf der Website",
  "wrongLabel": "Abgesetzt, obwohl es nicht ging",
  "missedLabel": "Nicht abgesetzt, obwohl es gegangen wäre",
  "disclaimer": "Das sind allgemeine Informationen, keine persönliche Steuerberatung. Was du absetzen kannst, hängt von deinen Arbeitgebern, deinen Belegen und davon ab, wie du tatsächlich gearbeitet hast. Wenn du bei uns einreichst, gehen wir deine Situation Punkt für Punkt durch.",
  "hubHref": "/de/expenses"
}

const CRUMBS = [
  {
    "name": "Startseite",
    "item": "/de"
  },
  {
    "name": "Abzüge",
    "item": "/de/expenses"
  }
]

const HERO = {
  "kicker": "Working-Holiday-Visa 417 und 462",
  "h1lead": "Abzüge sind keine Einheitsliste.",
  "h1accent": "Es ist deine Liste.",
  "lede": "Sieben Berufe, jeder mit eigener Liste, eigenen Nachweisen und eigenen Posten, die abgelehnt werden."
}

/**
 * Der Einwand, mit dem jeder Lead ankommt, hier konkret zu den Abzügen.
 *
 * Die Startseite beantwortet ihn allgemein. Hier muss jede Zeile vom leeren Feld
 * handeln: Es nimmt jede Zahl, es schlägt nichts vor, und es weiß nicht, in
 * welchem Job du gearbeitet hast. Keine Zeile behauptet, myGov sei schlecht. Es
 * erfasst einen Abzug. Welche Abzüge dir zustanden, entscheidet es nicht.
 */
const MYGOV_UI = {
  "kicker": "Selbst machen",
  "h2lead": "myGov hat ein Feld für Abzüge",
  "h2accent": "und keine Ahnung, was dein Job da hineinschreibt.",
  "lede": "Was in dieses Feld gehört und welcher Nachweis hinter jedem Posten steht, wird geklärt, bevor irgendetwas getippt wird.",
  "colLeft": "Auf myGov",
  "colRight": "Mit uns",
  "close": "Du wirst dich nie bei myGov einloggen, keinen Ausweis verknüpfen und nicht herausfinden müssen, welches Formular welches ist. Wir regeln das direkt mit dem ATO."
}

const MYGOV = [
  {
    "mygov": "Das Feld für Abzüge ist leer und bleibt leer. Nichts schlägt vor, was dein Job absetzen darf.",
    "us": "Wir starten bei der Arbeit, die du wirklich gemacht hast, und gehen die Liste dazu durch."
  },
  {
    "mygov": "Es nimmt jede Zahl an, auch eine, die du im Zweifel nicht belegen könntest.",
    "us": "Wir sagen dir, wofür du eine Quittung brauchst, wo ein Kontoauszug reicht und was einer Prüfung nicht standhält."
  },
  {
    "mygov": "Nirgends steht, dass ein Fruit Picker, ein Barista und ein Bauhelfer nicht dasselbe absetzen.",
    "us": "Sieben Arbeitsbereiche, jeder mit eigener Liste und eigener Nachweisregel."
  },
  {
    "mygov": "Miete, Essen und der Weg zur Arbeit sehen absetzbar aus und sind es nicht.",
    "us": "Wir behalten die Abzüge, die halten, damit später nichts rückabgewickelt werden muss."
  }
]

type Section =
  | { kind: 'answer'; h2: string; paras: string[] }
  | { kind: 'items'; h2: string; intro: string; items: { t: string; d: string }[] }
  | { kind: 'traps'; h2: string; intro: string; wrong: { t: string; d: string }[]; missed: { t: string; d: string }[] }
  | { kind: 'numbered'; h2: string; intro: string; steps: string[]; note?: string }
  | { kind: 'tables'; h2: string; intro: string; tables: { label: string; rows: string[][] }[]; note?: string }
  | { kind: 'occupations'; h2: string; intro: string; jobs: { href: string; title: string; line: string }[] }
  | { kind: 'note'; label: string; title: string; body: string }

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Was können Working Holiday Maker in Australien steuerlich absetzen?",
    "paras": [
      "Du kannst absetzen, was du ausgegeben hast, um das Einkommen zu verdienen, das du angibst, solange du selbst bezahlt und nichts erstattet bekommen hast. Am 417- oder 462-Visum liegt es nicht.",
      "Was die Liste verändert, ist der Job. Sonnenschutz ist absetzbar, wenn du in einer offenen Plantage pflückst, und nicht, wenn du hinter der Bar stehst."
    ]
  },
  {
    "kind": "occupations",
    "h2": "Welchen Job hast du tatsächlich gemacht?",
    "intro": "Sieben Seiten, jede dazu, was dieser Beruf absetzt und was er fälschlich absetzt.",
    "jobs": [
      {
        "href": "/de/expenses/farm-work",
        "title": "Farmarbeit und Fruit Picking",
        "line": "Sonnenschutz, Pflückausrüstung und Fahrten zwischen Blöcken am selben Tag."
      },
      {
        "href": "/de/expenses/hospitality",
        "title": "Gastronomie und Küche",
        "line": "RSA-Verlängerung, rutschfeste Schuhe, Kochjacke, und warum das schwarze Outfit keine Uniform ist."
      },
      {
        "href": "/de/expenses/construction",
        "title": "Bau",
        "line": "Die 300-Dollar-Regel für Werkzeug, Schutzausrüstung, und die White Card, die erst beim zweiten Mal zählt."
      },
      {
        "href": "/de/expenses/delivery-drivers",
        "title": "Lieferdienste",
        "line": "Auto- und Fahrradkosten, Arbeitsanteil am Handy, und die GST-Regel, die sich mit Fahrgästen ändert."
      },
      {
        "href": "/de/expenses/cleaners",
        "title": "Reinigung",
        "line": "Ausrüstung und Mittel, Wäschepauschale, und die Fahrt zwischen den Häusern."
      },
      {
        "href": "/de/expenses/labouring",
        "title": "Zeitarbeit und Lager",
        "line": "Mehrere Agenturen, mehrere Income Statements, Fahrten zwischen zwei Einsatzorten an einem Tag."
      },
      {
        "href": "/de/expenses/fifo",
        "title": "FIFO und Camp",
        "line": "Verlängerte Tickets, Schutzausrüstung, und der Zone Tax Offset, den fast niemand im Roster bekommt."
      }
    ]
  },
  {
    "kind": "numbered",
    "h2": "Was muss stimmen, damit überhaupt etwas absetzbar ist?",
    "intro": "Drei Tests, die für jeden Abzug auf dieser Website gelten. Fällt ein Abzug durch einen davon, ist er komplett weg, egal wie arbeitsbezogen er sich anfühlt.",
    "steps": [
      "Du hast das Geld selbst ausgegeben, und dein Arbeitgeber oder Kunde hat es dir nicht erstattet.",
      "Die Ausgabe ist beim Verdienen deines Einkommens entstanden, nicht dabei, dich erst in die Lage zu bringen, es zu verdienen, und sie ist nicht privat.",
      "Du hast einen Nachweis, aus dem hervorgeht, was du wann bei wem für wie viel gekauft hast."
    ],
    "note": "Der zweite Test richtet den Schaden an. Deshalb ist deine erste White Card nicht absetzbar und die Verlängerung schon."
  },
  {
    "kind": "answer",
    "h2": "Was musst du belegen können?",
    "paras": [
      "Ein Beleg, eine Rechnung oder ein Kontoauszug mit Betrag, Datum, Anbieter und der Angabe, worum es ging. Ein Foto auf dem Handy zählt, und du musst es fünf Jahre lang vorlegen können.",
      "Wenn deine gesamten arbeitsbezogenen Abzüge im Jahr bei 300 Dollar oder weniger liegen, brauchst du dafür keine schriftlichen Nachweise. Das ist etwas anderes als die 300-Dollar-Regel für einzelne Anschaffungen, bei der es darum geht, wie ein einzelner Gegenstand abgeschrieben wird."
    ]
  },
  {
    "kind": "note",
    "label": "Neu ab 1. Juli 2026",
    "title": "Pauschal 1.000 Dollar oder deine echten Kosten. Nicht beides.",
    "body": "Ab dem 1. Juli 2026 kannst du pauschal 1.000 Dollar an arbeitsbezogenen Kosten ganz ohne Belege absetzen, oder deine tatsächlichen Kosten mit vollständigen Nachweisen. Es gilt für das ganze Jahr entweder das eine oder das andere. Liegen deine echten Kosten bei 1.400 Dollar und du nimmst die Pauschale, verschenkst du 400 Dollar.\n\nDie Wahl gilt erstmals für die Steuererklärung 2026-27, die ab Juli 2027 eingereicht wird. Für die Erklärung 2025-26, die gerade eingereicht wird, gelten noch die alten Regeln."
  },
  {
    "kind": "tables",
    "h2": "Wie werden Autokosten berechnet?",
    "intro": "Zwei Methoden, und pro Auto und Jahr nur eine davon. In beiden Fällen zählen nur arbeitsbezogene Fahrten, nie dein normaler Arbeitsweg von zu Hause zu einem festen Arbeitsplatz.",
    "tables": [
      {
        "label": "Kilometerpauschale",
        "rows": [
          [
            "Satz 2024-25 und 2025-26",
            "88 Cent pro km"
          ],
          [
            "Satz ab 2026-27",
            "91 Cent pro km"
          ],
          [
            "Maximum",
            "5.000 km pro Auto und Jahr"
          ],
          [
            "Belege",
            "Nicht nötig, aber du musst zeigen, wie du auf die Kilometer kommst"
          ]
        ]
      },
      {
        "label": "Fahrtenbuch",
        "rows": [
          [
            "So funktioniert es",
            "Du setzt den arbeitsbezogenen Prozentsatz aller echten Betriebskosten ab"
          ],
          [
            "Zeitraum",
            "12 zusammenhängende Wochen, fünf Jahre gültig"
          ],
          [
            "Maximum",
            "Keine Grenze. Es folgt deinem tatsächlichen Arbeitsanteil"
          ],
          [
            "Belege",
            "Für jede einzelne Ausgabe erforderlich"
          ]
        ]
      }
    ],
    "note": "Ab etwa 5.000 Arbeitskilometern im Jahr bringt das Fahrtenbuch normalerweise den größeren Abzug, weil es Benzin, Versicherung, Zulassung, Wartung, Abschreibung und die Zinsen eines Autokredits erfasst."
  },
  {
    "kind": "traps",
    "h2": "Was machen Backpacker in jedem Job falsch?",
    "intro": "Die erste Liste macht aus einer Rückerstattung eine korrigierte Veranlagung. Die zweite, das Geld, das niemand anfordert, ist häufiger und teurer.",
    "wrong": [
      {
        "t": "Normale Kleidung, die ein Dresscode vorschreibt",
        "d": "Schwarze Hose, schlichtes Polo, gewöhnliche Boots, Jeans. Alltagskleidung wird keine Uniform, weil ein Chef darauf besteht."
      },
      {
        "t": "Die erste Lizenz, das erste Ticket, das erste Zertifikat",
        "d": "Erste White Card, erste RSA, erstes Staplerticket. Diese Kosten haben dich erst für den Job qualifiziert, was etwas anderes ist als Kosten der Arbeit selbst. Verlängerungen sind absetzbar, sobald du arbeitest."
      },
      {
        "t": "Der Weg von zu Hause zur Arbeit",
        "d": "Der normale Arbeitsweg ist privat, egal wie weit und wie früh. Die Fahrt zwischen zwei Arbeitsplätzen am selben Tag ist meistens absetzbar."
      },
      {
        "t": "Alles, was dir erstattet wurde",
        "d": "Wenn ein Arbeitgeber, eine Agentur oder eine Plattform dir das Geld zurückgegeben oder den Gegenstand gestellt hat, sind dir keine Kosten geblieben, die du absetzen könntest."
      },
      {
        "t": "Bußgelder",
        "d": "Park- und Geschwindigkeitsstrafen sind nie absetzbar, egal was du gerade gemacht hast."
      }
    ],
    "missed": [
      {
        "t": "Jeder Gegenstand unter 300 Dollar, komplett im Kaufjahr",
        "d": "Boots, Handschuhe, Hut, Messerrolle, Stirnlampe, Handyhalter. Jeder Gegenstand wird einzeln geprüft, also summiert sich ein Jahr kleiner Käufe. Die meisten werfen die Belege weg."
      },
      {
        "t": "Gegenstände über 300 Dollar, die trotzdem absetzbar sind",
        "d": "Über 300 Dollar verschwindet der Abzug nicht, nur der Zeitpunkt ändert sich. Die Kosten werden über die Nutzungsdauer verteilt. Viele hören \"über 300\" und hören auf."
      },
      {
        "t": "Das Waschen von Pflicht- oder Schutzkleidung",
        "d": "Das ATO erlaubt 1 Dollar pro Waschgang, wenn nur Arbeitskleidung drin ist, oder 50 Cent pro Waschgang, wenn du sie mit allem anderen wäschst. Ab 150 Dollar Wäschekosten im Jahr brauchst du ein einfaches Tagebuch statt einer Schätzung."
      },
      {
        "t": "Fahrten zwischen zwei Jobs am selben Tag",
        "d": "Zwei Farmen, zwei Häuser, zwei Lager, zwei Betriebe. Diese Strecke ist Arbeitsfahrt, kein Arbeitsweg, und bei Arbeit an mehreren Orten oft der größte einzelne Abzug der Steuererklärung."
      },
      {
        "t": "Wochen mit 45 Prozent Einbehalt, bevor die TFN da war",
        "d": "Kein Abzug, aber dasselbe Geld. Wenn ein Arbeitgeber zum Höchstsatz einbehalten hat, während deine Tax File Number Declaration noch in der Schublade lag, kommt das mit der Steuererklärung zurück. Von allein passiert das nicht."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Wo hängt es von deiner eigenen Situation ab?",
    "paras": [
      "Ob deine Fahrten als wechselnde Einsatzorte gelten statt als Arbeitsweg, hängt davon ab, wie deine Woche aufgebaut war: wie oft der Einsatzort wechselte, ob es eine feste Basis gab und ob dein Arbeitgeber die Bewegung verlangt hat.",
      "Dein steuerlicher Wohnsitz ist die zweite Frage, und sie ist mehr wert als alle Abzüge auf dieser Seite zusammen. Es ist eine Beurteilung, dieselbe Frage, über die der High Court im Fall Addy entschieden hat. Wir legen uns erst fest, nachdem wir dein Jahr durchgegangen sind."
    ]
  }
]

const FAQS = [
  {
    "question": "Kann ich die Abzüge einfach selbst machen?",
    "answer": "Kannst du, und das Einreichen ist der einfache Teil. Das Feld für Abzüge bleibt leer und nimmt jede Zahl an.\n\nWelche Kosten aus deiner Arbeit entstanden sind und was hinter jedem Posten steht, ist eine Beurteilung zu deinem Jahr, kein Feld zum Ausfüllen."
  },
  {
    "question": "Haben Working Holiday Maker weniger Abzüge als Australier?",
    "answer": "Nein. Die Abzugsregeln sind für Inhaber eines 417- oder 462-Visums dieselben wie für alle anderen, die in Australien Einkommen verdienen.\n\nDer Unterschied liegt bei den Einnahmen, nicht bei den Ausgaben: Einkommen von Working Holiday Makern wird bis 45.000 Dollar mit 15 Prozent besteuert, statt dass ein Steuerfreibetrag gilt, sofern dein steuerlicher Wohnsitz daran nichts ändert."
  },
  {
    "question": "Ich hatte vier verschiedene Jobs in einem Jahr. Sind das vier Listen?",
    "answer": "Du gibst eine Steuererklärung für das Steuerjahr ab, und darin steckt jeder Abzug aus jedem Job. Wichtig ist nur, dass jede Ausgabe zu Arbeit gehört, die du damals tatsächlich gemacht hast.\n\nBoots für einen Lagerjob im September und Sonnencreme für einen Farmjob im Januar gehören in dieselbe Erklärung, und dass die Arbeitgeber unterschiedlich waren, ändert daran nichts."
  },
  {
    "question": "Was ist, wenn ich die Belege verloren habe?",
    "answer": "Ein Kontoauszug mit Betrag, Datum und Anbieter wird meistens akzeptiert, wenn der Beleg weg ist.\n\nBleiben deine arbeitsbezogenen Abzüge im ganzen Jahr bei höchstens 300 Dollar, brauchst du den Beleg ohnehin nicht, nur eine Erklärung, wie die Summe zustande kommt. Was nicht geht: eine Zahl erfinden und hoffen."
  },
  {
    "question": "Kann ich Miete, Essen oder Reisen in Australien absetzen?",
    "answer": "Nein. Unterkunft, Lebensmittel und die Kosten, dich fortzubewegen, sind private Lebenshaltungskosten, und daran ändert sich nichts, wenn du extra für einen Job in eine ländliche Region gezogen bist.\n\nDie enge Ausnahme sind vom Arbeitgeber verlangte Reisen, bei denen du über Nacht von zu Hause weg bist. Dafür gelten andere Regeln und andere Nachweise."
  },
  {
    "question": "Lohnt sich das überhaupt, wenn ich nur ein paar Monate gearbeitet habe?",
    "answer": "Meistens ja. Auch ein kurzer Aufenthalt verursacht echte Kosten, und jeder Dollar Abzug senkt das Einkommen, auf das die Steuer berechnet wird.\n\nBei einem kurzen Jahr steckt der größere Betrag aber oft gar nicht in den Abzügen, sondern in den Wochen mit 45 Prozent Einbehalt, bevor deine Tax File Number beim Arbeitgeber war, und in der Frage, ob dein steuerlicher Wohnsitz richtig angegeben wurde."
  }
]

const GUIDES = [
  {
    "href": "/de/blog/tax-deductions-working-holiday-makers",
    "label": "Absetzbare Kosten für Working Holiday Maker: die vollständige Liste",
    "desc": "Alle Kategorien, und was das ATO ablehnt."
  },
  {
    "href": "/de/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "Die 300-Dollar-Sofortabschreibung für Werkzeug und Ausrüstung",
    "desc": "Warum jedes Teil einzeln geprüft wird und was ein Set daran ändert."
  },
  {
    "href": "/de/blog/1000-dollar-instant-deduction-rule-2026",
    "label": "Die 1.000-Dollar-Pauschale ab 1. Juli 2026",
    "desc": "Pauschale ohne Belege oder tatsächliche Kosten. Du bekommst nur eins von beidem."
  }
]

const SERVICES = [
  {
    "href": "/de/tax-return",
    "label": "Steuererklärung"
  },
  {
    "href": "/de/tfn",
    "label": "TFN"
  },
  {
    "href": "/de/blog/tax-residency-working-holiday-makers",
    "label": "Steuerlicher Wohnsitz"
  }
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: CRUMBS.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: b.name,
    item: `${SITE_URL}${b.item === '/' ? '' : b.item}`,
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "Steuerlich absetzbar in Australien: nach Job sortiert",
  description: "Ein Fruit Picker und ein Lieferfahrer setzen nicht dasselbe ab. Such deinen Job und sieh, was wirklich gilt.",
  url: `${SITE_URL}/de/expenses`,
  inLanguage: "de-DE",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/de/expenses#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/de/expenses`,
}

/* Tokens kept local so this page does not depend on shared CSS being finished. */
const INK = '#080F0D'
const BODY = '#2A3C34'
const MUTED = '#4C6459'
const FOREST = '#0B5240'
const HAIR = '#E2EFE9'
const SUNKEN = '#F5F9F7'
const WARN = '#B54708'

const wrap: React.CSSProperties = { maxWidth: '720px', margin: '0 auto', padding: '0 20px' }
const h2s: React.CSSProperties = {
  fontFamily: 'var(--font-serif), Georgia, serif',
  fontSize: 'clamp(23px, 5.6vw, 30px)',
  lineHeight: 1.22,
  letterSpacing: '-0.02em',
  fontWeight: 700,
  color: INK,
  margin: '0 0 16px',
}
const h3s: React.CSSProperties = {
  fontSize: '16px',
  lineHeight: 1.35,
  fontWeight: 700,
  color: INK,
  margin: '0 0 6px',
}
const ps: React.CSSProperties = { fontSize: '15px', lineHeight: 1.62, color: BODY, margin: '0 0 14px' }
const secLight: React.CSSProperties = { background: '#fff', padding: '34px 0' }
const secSunk: React.CSSProperties = { background: SUNKEN, padding: '34px 0' }
const kickerS: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: FOREST,
  margin: '0 0 10px',
}

function Cta({ position }: { position: 'hero' | 'inline' | 'section' }) {
  return (
    <div style={{ margin: '18px 0 0' }}>
      <WaLink
        href={WA}
        position={position}
        topic="expenses"
        lang={"de"}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '52px',
          padding: '0 28px',
          background: FOREST,
          color: '#fff',
          borderRadius: '999px',
          fontSize: '16px',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        {UI.ctaLabel}
      </WaLink>
      <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: MUTED, margin: '10px 0 0', textAlign: 'center' }}>
        {UI.ctaSub}
      </p>
    </div>
  )
}

function Bullets({ label, colour, items }: { label: string; colour: string; items: { t: string; d: string }[] }) {
  return (
    <div style={{ marginTop: '22px' }}>
      <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: colour, margin: '0 0 12px' }}>
        {label}
      </p>
      {items.map((it, i) => (
        <div key={i} style={{ borderTop: `1px solid ${HAIR}`, padding: '13px 0' }}>
          <p style={h3s}>{it.t}</p>
          <p style={{ ...ps, margin: 0 }}>{it.d}</p>
        </div>
      ))}
    </div>
  )
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main style={{ background: '#fff' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(160deg,#fff 0%,#F2FAF7 100%)', paddingTop: '68px' }}>
          <div style={{ ...wrap, paddingTop: '18px', paddingBottom: '34px' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '18px' }}>
              <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', listStyle: 'none', margin: 0, padding: 0, fontSize: '13px', color: MUTED }}>
                {CRUMBS.map((b, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {i > 0 && <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>}
                    {i === CRUMBS.length - 1 ? (
                      <span aria-current="page" style={{ color: FOREST, fontWeight: 500 }}>{b.name}</span>
                    ) : (
                      <Link href={b.item} style={{ color: MUTED, minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>{b.name}</Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <p style={kickerS}>{HERO.kicker}</p>
            <h1
              style={{
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(30px, 8.2vw, 46px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                fontWeight: 700,
                color: INK,
                margin: '0 0 14px',
              }}
            >
              {HERO.h1lead}{' '}
              <span style={{ color: FOREST, fontStyle: 'italic' }}>{HERO.h1accent}</span>
            </h1>
            <p className="hero-sub" style={{ fontSize: '16.5px', lineHeight: 1.6, color: BODY, margin: 0 }}>
              {HERO.lede}
            </p>
            <Cta position="hero" />
          </div>
        </section>

        {/* DER EINWAND, KONKRET ZU DEN ABZÜGEN */}
        <section style={secSunk}>
          <div style={wrap}>
            <p style={kickerS}>{MYGOV_UI.kicker}</p>
            <h2 style={h2s}>
              <span style={{ display: 'block', color: BODY, fontWeight: 400 }}>{MYGOV_UI.h2lead}</span>
              <span style={{ display: 'block' }}>{MYGOV_UI.h2accent}</span>
            </h2>
            <p style={{ ...ps, color: MUTED, marginBottom: '20px' }}>{MYGOV_UI.lede}</p>

            <div style={{ background: '#fff', border: '1px solid #CDE3DB', borderRadius: '14px', overflow: 'hidden' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : `1px solid ${HAIR}` }}>
                  <div style={{ padding: '13px 16px' }}>
                    {/* Beide Labels standen vorher auf allen acht Zellen. Auf dem
                        Handy stapeln sich die Zeilen, das waren also dieselben
                        zwei Wörter acht Mal untereinander. Sie stehen jetzt nur
                        in der ersten Zeile: auf dem Desktop Spaltenköpfe, auf dem
                        Handy die Legende. */}
                    {i === 0 && (
                      <p style={{ fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: MUTED, margin: '0 0 5px' }}>
                        {MYGOV_UI.colLeft}
                      </p>
                    )}
                    <p style={{ ...ps, margin: 0, overflowWrap: 'break-word', hyphens: 'auto' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l" style={{ padding: '13px 16px', background: '#F2FAF7', borderColor: HAIR }}>
                    {i === 0 && (
                      <p style={{ fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500, color: FOREST, margin: '0 0 5px' }}>
                        {MYGOV_UI.colRight}
                      </p>
                    )}
                    <p style={{ ...ps, margin: 0, color: INK, fontWeight: 500, overflowWrap: 'break-word', hyphens: 'auto' }}>{row.us}</p>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: 'var(--font-serif), Georgia, serif', fontSize: '18px', lineHeight: 1.45, fontWeight: 700, color: FOREST, margin: '22px 0 0' }}>
              {MYGOV_UI.close}
            </p>
          </div>
        </section>

        {/* BODY SECTIONS */}
        {SECTIONS.map((s, i) => (
          <section key={i} style={i % 2 === 0 ? secLight : secSunk}>
            <div style={wrap}>
              {s.kind === 'answer' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  {s.paras.map((p, j) => (
                    <p key={j} style={{ ...ps, margin: j === s.paras.length - 1 ? 0 : ps.margin }}>{p}</p>
                  ))}
                </>
              )}

              {s.kind === 'items' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  {s.items.map((it, j) => (
                    <div key={j} style={{ borderTop: `1px solid ${HAIR}`, padding: '15px 0' }}>
                      <p style={h3s}>{it.t}</p>
                      <p style={{ ...ps, margin: 0 }}>{it.d}</p>
                    </div>
                  ))}
                </>
              )}

              {s.kind === 'traps' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={{ ...ps, margin: 0 }}>{s.intro}</p>
                  <Bullets label={UI.wrongLabel} colour={WARN} items={s.wrong} />
                  <Bullets label={UI.missedLabel} colour={FOREST} items={s.missed} />
                </>
              )}

              {s.kind === 'numbered' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {s.steps.map((t, j) => (
                      <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '12px', padding: '14px 16px' }}>
                        <span aria-hidden="true" style={{ flex: '0 0 26px', width: '26px', height: '26px', borderRadius: '999px', background: FOREST, color: '#fff', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{j + 1}</span>
                        <span style={{ fontSize: '15px', lineHeight: 1.55, color: BODY }}>{t}</span>
                      </li>
                    ))}
                  </ol>
                  {s.note && <p style={{ ...ps, marginTop: '16px', marginBottom: 0 }}>{s.note}</p>}
                </>
              )}

              {s.kind === 'tables' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {s.tables.map((t, j) => (
                      <div key={j} style={{ background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '14px', overflow: 'hidden' }}>
                        <p style={{ fontSize: '15px', fontWeight: 700, color: FOREST, margin: 0, padding: '13px 16px', borderBottom: `1px solid ${HAIR}` }}>{t.label}</p>
                        <div style={{ overflowX: 'auto' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                              {t.rows.map((r, k) => (
                                <tr key={k} style={{ borderTop: k ? `1px solid ${HAIR}` : 'none' }}>
                                  <th scope="row" style={{ textAlign: 'left', fontSize: '13.5px', fontWeight: 600, color: INK, padding: '11px 16px', width: '46%' }}>{r[0]}</th>
                                  <td style={{ fontSize: '13.5px', color: BODY, padding: '11px 16px' }}>{r[1]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                  {s.note && <p style={{ ...ps, marginTop: '16px', marginBottom: 0 }}>{s.note}</p>}
                </>
              )}

              {s.kind === 'occupations' && (
                <>
                  <h2 style={h2s}>{s.h2}</h2>
                  <p style={ps}>{s.intro}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {s.jobs.map((jb, j) => (
                      <Link key={j} href={jb.href} style={{ display: 'block', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '12px', padding: '15px 16px', textDecoration: 'none', minHeight: '44px' }}>
                        <span style={{ display: 'block', fontSize: '16px', fontWeight: 700, color: FOREST, marginBottom: '4px' }}>{jb.title}</span>
                        <span style={{ display: 'block', fontSize: '15px', lineHeight: 1.5, color: BODY }}>{jb.line}</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {s.kind === 'note' && (
                <div style={{ background: '#FDF0D5', border: '1px solid #F9D88A', borderLeft: '4px solid #E9A020', borderRadius: '12px', padding: '18px 18px' }}>
                  <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: WARN, margin: '0 0 8px' }}>{s.label}</p>
                  <p style={{ ...h3s, marginBottom: '8px' }}>{s.title}</p>
                  {s.body.split('\n\n').map((para, j, arr) => (
                    <p key={j} style={{ ...ps, margin: j === arr.length - 1 ? 0 : ps.margin }}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* GUARANTEE + CTA */}
        <section style={{ background: '#0B5240', padding: '38px 0' }}>
          <div style={wrap}>
            <h2 style={{ ...h2s, color: '#fff', marginBottom: '16px' }}>{UI.guaranteeHeading}</h2>
            <p style={{ fontSize: '15px', lineHeight: 1.62, color: 'rgba(255,255,255,0.78)', margin: 0 }}>
              {UI.guaranteeBody}
            </p>
            <div style={{ marginTop: '18px' }}>
              <WaLink
                href={WA}
                position="section"
                topic="expenses"
                lang={"de"}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '52px',
                  padding: '0 28px',
                  background: '#E9A020',
                  color: '#1A2822',
                  borderRadius: '999px',
                  fontSize: '16px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {UI.ctaLabel}
              </WaLink>
              <p style={{ fontSize: '13.5px', lineHeight: 1.5, color: 'rgba(255,255,255,0.6)', margin: '10px 0 0', textAlign: 'center' }}>
                {UI.ctaSub}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={secLight}>
          <div style={wrap}>
            <h2 style={h2s}>{UI.faqHeading}</h2>
            {FAQS.map((f, i) => (
              <div key={i} style={{ borderTop: `1px solid ${HAIR}`, padding: '16px 0' }}>
                <h3 style={{ ...h3s, marginBottom: '8px' }}>{f.question}</h3>
                {/* Am Absatzumbruch geteilt, damit eine lange Antwort als zwei
                    kurze Absätze liest. faqSchema nutzt weiter den Rohtext. */}
                {f.answer.split('\n\n').map((para, j, arr) => (
                  <p key={j} style={{ ...ps, margin: j === arr.length - 1 ? 0 : ps.margin }}>{para}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* GUIDES */}
        <section style={secSunk}>
          <div style={wrap}>
            <h2 style={h2s}>{UI.guidesHeading}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {GUIDES.map((g, i) => (
                <Link key={i} href={g.href} style={{ display: 'block', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '12px', padding: '15px 16px', textDecoration: 'none', minHeight: '44px' }}>
                  <span style={{ display: 'block', fontSize: '15px', fontWeight: 700, color: FOREST, marginBottom: '3px' }}>{g.label}</span>
                  <span style={{ display: 'block', fontSize: '15px', lineHeight: 1.5, color: BODY }}>{g.desc}</span>
                </Link>
              ))}
            </div>

            <p style={{ ...kickerS, marginTop: '24px' }}>{UI.servicesLabel}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {SERVICES.map((s, i) => (
                <Link key={i} href={s.href} style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', padding: '0 16px', background: '#fff', border: `1px solid ${HAIR}`, borderRadius: '999px', fontSize: '15px', fontWeight: 600, color: FOREST, textDecoration: 'none' }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <section style={{ ...secLight, paddingBottom: '52px' }}>
          <div style={wrap}>
            <p style={{ fontSize: '13.5px', lineHeight: 1.62, color: MUTED, margin: 0 }}>{UI.disclaimer}</p>
          </div>
        </section>

      </main>

      <MobileCta href={WA} lang={"de"} topic="expenses" />
    </>
  )
}
