import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

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
  "guaranteeHeading": "Wir beginnen mit einem Tax Assessment, das deine gesamte Situation prüft und dir dein voraussichtliches Steuerergebnis zeigt, damit du genau weißt, wo du stehst, bevor du entscheidest, ob du abgeben möchtest.",
  "guaranteeBody": "Working-Holiday-Steuer ist das Einzige, was wir machen. Deine Steuererklärung wird vor der Einreichung beim ATO von einem registrierten Steueragenten geprüft und freigegeben.",
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

/* The hub renders through the same shared template as the seven job pages,
   plus the myGov comparison block, minus the "other jobs" link (this IS the
   page that link points at). */
export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'de',
        path: '/de/expenses',
        articleHeadline: "Steuerlich absetzbar in Australien: nach Job sortiert",
        articleDescription: "Ein Fruit Picker und ein Lieferfahrer setzen nicht dasselbe ab. Such deinen Job und sieh, was wirklich gilt.",
        inLanguage: "de-DE",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
        mygov: { ui: MYGOV_UI, rows: MYGOV },
        hubLink: false,
      }}
    />
  )
}
