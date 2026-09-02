import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

export const metadata: Metadata = {
  "title": "Reinigungskraft: Fahrten, Ausrüstung",
  "description": "Ausrüstung, Schutzkleidung, Uniformwäsche zum ATO-Satz und die Fahrt zwischen zwei Jobs, die kaum jemand ansetzt. Dazu, was abgelehnt wird.",
  "keywords": [
    "Reinigungskraft Steuerabzüge Australien",
    "Putzhilfe Steuer Australien",
    "Reinigungsmittel absetzen ATO",
    "Fahrten zwischen Reinigungsjobs absetzen",
    "Uniformwäsche Pauschale ATO",
    "Working Holiday Reinigung Steuer",
    "Airtasker Reinigung Steuer Australien",
    "Büroreinigung Steuerabzüge"
  ],
  "alternates": {
    "canonical": "/de/expenses/cleaners",
    "languages": {
      "en-AU": "/expenses/cleaners",
      "de": "/de/expenses/cleaners",
      "ja": "/ja/expenses/cleaners",
      "x-default": "/expenses/cleaners"
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
    "url": `${SITE_URL}/de/expenses/cleaners`,
    "siteName": "Working Holiday Tax",
    "title": "Reinigung in Australien: Ausrüstung, Wäsche, Fahrten",
    "description": "Die Fahrt zwischen den Häusern ist meist der größte Abzug und der, den fast niemand macht."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Reinigung in Australien: Ausrüstung, Wäsche, Fahrten",
    "description": "Die Fahrt zwischen den Häusern ist meist der größte Abzug und der, den fast niemand macht."
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

const WA = waUrl({ topic: 'expenses', lang: "de", detail: "Reinigungsarbeit" })

const UI = {
  "ctaLabel": "Schreib uns auf WhatsApp",
  "ctaSub": "Antwort in etwa einer Stunde.",
  "guaranteeHeading": "Wir beginnen mit einem Tax Assessment, das deine gesamte Situation prüft und dir dein voraussichtliches Steuerergebnis zeigt, damit du genau weißt, wo du stehst, bevor du entscheidest, ob du abgeben möchtest.",
  "guaranteeBody": "Reinigungserklärungen landen hier jede Woche auf dem Tisch, und jede gehört jemandem mit 417- oder 462-Visum. Von einem registrierten Steueragenten geprüft und freigegeben, bevor es beim ATO eingereicht wird.",
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
  },
  {
    "name": "Reinigung",
    "item": "/de/expenses/cleaners"
  }
]

const HERO = {
  "kicker": "Häuser, Büros, Endreinigung und App-Jobs",
  "h1lead": "Die Fahrt zwischen den Häusern ist der Abzug.",
  "h1accent": "Fast niemand macht ihn.",
  "lede": "Mittel, Handschuhe und Uniformwäsche zum ATO-Satz stehen auch auf der Liste."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Was können Reinigungskräfte absetzen?",
    "paras": [
      "Absetzbar sind selbst gekaufte Ausrüstung und Reinigungsmittel, Schutzausrüstung wie Handschuhe, Schürze, Schutzbrille oder Sicherheitsschuhe, das Waschen einer Pflichtuniform oder von Schutzkleidung und die Fahrt von einem Reinigungsjob zum nächsten am selben Tag. Was Kunde oder Arbeitgeber stellt oder erstattet, fällt raus.",
      "Drei Häuser an einem Tag bedeuten zwei absetzbare Fahrten, und über ein Jahr ist das normalerweise die größte einzelne Zahl der Erklärung."
    ]
  },
  {
    "kind": "items",
    "h2": "Die Abzüge, die zu dieser Arbeit gehören",
    "intro": "Die meiste Reinigungsausrüstung liegt deutlich unter 300 Dollar, wird also im Kaufjahr voll abgesetzt statt langsam abgeschrieben.",
    "items": [
      {
        "t": "Fahrten zwischen Reinigungsjobs",
        "d": "Die Fahrt von einem Haus oder Büro zum nächsten, nachdem dein Tag begonnen hat, ist Fahrt zwischen Arbeitsplätzen und nicht der Arbeitsweg, also absetzbar. Berechnet wird sie mit der Kilometerpauschale oder einem Fahrtenbuch."
      },
      {
        "t": "Ausrüstung und Reinigungsmittel",
        "d": "Mopps, Eimer, Schaber, Tücher, Chemikalien und Verbrauchsmaterial, das du selbst kaufst. Jeder Gegenstand bis 300 Dollar wird im Kaufjahr voll abgesetzt. Ein zusammen gekauftes Starterset ab 300 Dollar gilt als ein Gegenstand und wird über die Nutzungsdauer verteilt, auch wenn jedes Teil einzeln darunter gelegen hätte."
      },
      {
        "t": "Größere Geräte ab 300 Dollar",
        "d": "Ein Industriestaubsauger, eine Einscheibenmaschine, ein Hochdruckreiniger. Weiterhin absetzbar, verteilt über die Nutzungsdauer statt auf einmal."
      },
      {
        "t": "Schutzausrüstung",
        "d": "Handschuhe, Schürze, Schutzbrille oder Gesichtsschutz bei starken Chemikalien und Staub, Stahlkappen für Baustellen- und Gewerbereinigung. Sie zählen, weil sie dich vor einer Gefahr des Jobs schützen."
      },
      {
        "t": "Waschen absetzbarer Arbeitskleidung",
        "d": "Das Waschen einer Pflichtuniform oder echter Schutzkleidung ist zum ATO-Satz absetzbar: 1 Dollar pro Waschgang, wenn nur Arbeitskleidung drin ist, oder 50 Cent, wenn du sie mit allem anderen wäschst. Über 150 Dollar im Jahr führst du ein einfaches Tagebuch statt zu schätzen."
      },
      {
        "t": "Arbeitsanteil deines Handys",
        "d": "Real für alle, die Buchungen annehmen, eine App nutzen oder mit Kunden über Zugang und Schlüssel schreiben. Setze den arbeitsbezogenen Prozentsatz auf nachvollziehbarer Grundlage an, nicht den ganzen Vertrag."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was muss eine Reinigungskraft aufheben?",
    "paras": [
      "Drei Tests hinter jedem Abzug: du hast bezahlt, dir hat es niemand erstattet, und die Ausgabe diente dazu, das Einkommen zu verdienen, das du angibst. Bei einer Reinigungskraft heißt das Belege für Mittel und Ausrüstung und eine Aufzeichnung der Daten, Adressen und Kilometer hinter den Fahrten.",
      "Ein Beleg, eine Rechnung, ein Kontoauszug oder ein Handyfoto mit Betrag, Datum, Anbieter und Gegenstand zählt jeweils, und alles davon muss fünf Jahre halten. Unter 300 Dollar Abzügen im ganzen Jahr brauchst du gar keinen schriftlichen Nachweis. Das ist nicht die 300-Dollar-Grenze, die entscheidet, wie ein einzelner Staubsauger abgeschrieben wird."
    ]
  },
  {
    "kind": "tables",
    "h2": "Wie werden Autokosten berechnet?",
    "intro": "Zwei Methoden, eine pro Auto und Jahr. Bei einer Reinigungskraft zählen nur die Strecken zwischen den Jobs, nie die Fahrt von zu Hause zum ersten Haus.",
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
    "note": "Drei oder vier Adressen am Tag knacken die 5.000 Kilometer schneller, als die meisten Reinigungskräfte erwarten, und darüber gewinnt normalerweise das Fahrtenbuch, weil es Benzin, Versicherung, Zulassung, Wartung, Abschreibung und die Zinsen eines Autokredits erfasst."
  },
  {
    "kind": "traps",
    "h2": "Was machen Reinigungskräfte falsch?",
    "intro": "Die falschen Abzüge drehen sich um Kleidung und die erste Fahrt des Tages. Die übersehenen sind fast alle Fahrten.",
    "wrong": [
      {
        "t": "Schlichte schwarze Hose und schlichtes Polo",
        "d": "Auch wenn Kunde oder Agentur auf einer Farbe besteht, bleibt Alltagskleidung privat. Sie wird nicht absetzbar, weil Bleiche sie ruiniert hat."
      },
      {
        "t": "Die erste und die letzte Fahrt des Tages",
        "d": "Von zu Hause zum ersten Job und vom letzten Job nach Hause ist der normale Arbeitsweg. Nur die Strecken dazwischen sind absetzbar, es sei denn, du erfüllst die Ausnahme für sperrige Ausrüstung."
      },
      {
        "t": "Mittel und Geräte, die der Kunde stellt",
        "d": "Wenn im Haus, das du reinigst, die Mittel unter der Spüle stehen oder die Firma die Ausrüstung ausgibt, sind dir keine Kosten geblieben. Dasselbe gilt für alles, was dir erstattet wurde."
      },
      {
        "t": "Eine ABN als Freibrief für alles",
        "d": "Eine ABN macht aus privaten Ausgaben keine Betriebsausgaben. Handy, Auto und Kleidung werden weiterhin aufgeteilt."
      },
      {
        "t": "Anzunehmen, Barzahlungen müsse man nicht angeben",
        "d": "Reinigungseinkommen ist Einkommen, ob es per Überweisung, App-Auszahlung oder im Umschlag kommt."
      }
    ],
    "missed": [
      {
        "t": "Die Fahrten zwischen den Jobs",
        "d": "Reinigungskräfte arbeiten an drei oder vier Adressen am Tag und setzen keine davon ab, weil es sich nicht nach Arbeitsfahrt anfühlt. Notiere Datum, Adressen und Kilometer laufend."
      },
      {
        "t": "Jede Flasche und jedes Tuch einzeln",
        "d": "Verbrauchsmaterial wird ständig gekauft und fast nie belegt. Ein laufendes Fotoalbum der Belege auf dem Handy reicht."
      },
      {
        "t": "Wäsche, zu einem veröffentlichten Satz",
        "d": "Das Waschen von Schutzkleidung und Pflichtuniform ist mit 1 Dollar oder 50 Cent pro Waschgang absetzbar, und fast niemand weiß, dass es diesen Satz gibt."
      },
      {
        "t": "Ausrüstung aus der Aufbauphase",
        "d": "Geräte und Mittel, die du ungefähr zu der Zeit gekauft hast, als du eine ABN registriert und nach Kunden gesucht hast, sind in der Regel absetzbar, auch wenn die erste Rechnung später kam. Eine große Lücke zwischen Kauf und erstem Job schwächt das, also heb die Daten auf."
      },
      {
        "t": "Wochen mit falschem Einbehalt bei einer Reinigungsfirma",
        "d": "Hat eine Firma deine Tax File Number Declaration nie erhalten oder ist sie nicht als Arbeitgeber von Working Holiday Makern registriert, sind weit mehr als 15 Prozent abgeflossen. Das kommt mit der Erklärung zurück und nicht vorher."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was ändert sich je nachdem, für wen du putzt?",
    "paras": [
      "Einzelunternehmer oder Angestellter ist die erste Weiche. Private Hausreinigungen, Endreinigungen und App-Jobs über etwas wie Airtasker sind ABN-Einkommen: du setzt den Preis, du stellst Rechnung, nichts wird einbehalten, es gibt keine Superannuation.",
      "Von einer Reinigungsfirma auf Objekte und Schichten eingeteilt zu werden ist Anstellung mit TFN, mit Einbehalt und Super obendrauf.",
      "Eine Firma, die deinen Dienstplan macht, deine Arbeit beaufsichtigt und die Mittel stellt und dann eine ABN von dir verlangt, kann ein Arbeitgeber im Kostüm der Selbstständigkeit sein.",
      "Für Einzelunternehmer wird die GST erst ab 75.000 Dollar Reinigungsumsatz im Jahr Pflicht, und dahin kommt Teilzeitreinigung selten.",
      "Unter allem liegt der steuerliche Wohnsitz, mehr wert als die ganze Abzugsliste: britische, deutsche und japanische Passinhaber, die steuerlich in Australien ansässig waren, können nach der Addy-Entscheidung den vollen Steuerfreibetrag tragen."
    ]
  }
]

const FAQS = [
  {
    "question": "Kann ich die Fahrt zwischen zwei Reinigungsjobs absetzen?",
    "answer": "Ja. Die Fahrt von einem Reinigungsjob zum nächsten am selben Tag ist eine Fahrt zwischen Arbeitsplätzen und kein Arbeitsweg, also absetzbar über die Kilometerpauschale oder ein Fahrtenbuch.\n\nNicht absetzbar sind die erste Fahrt von zu Hause zum ersten Job und die letzte nach Hause, es sei denn, du transportierst sperrige Ausrüstung, die an keinem der Orte sicher gelagert werden kann."
  },
  {
    "question": "Welche Ausrüstung und welche Mittel kann ich absetzen?",
    "answer": "Alles, was du selbst gekauft hast und nicht erstattet bekommen hast: Mopps, Eimer, Schaber, Tücher, Chemikalien und Verbrauchsmaterial.\n\nGegenstände bis 300 Dollar pro Stück werden im Kaufjahr voll abgesetzt. Größere Geräte wie ein Industriestaubsauger oder eine Einscheibenmaschine sind ebenfalls absetzbar, verteilt über die Nutzungsdauer."
  },
  {
    "question": "Kann ich Uniform und Waschen absetzen?",
    "answer": "Du kannst eine vorgeschriebene Uniform absetzen, die Arbeitgeber oder Kunde nicht stellt, und Schutzausrüstung mit echter Sicherheitsfunktion wie Handschuhe, Schürze, Schutzbrille oder Stahlkappen. Nicht absetzbar sind schlichte schwarze Hosen oder ein schlichtes Polo.\n\nDas Waschen absetzbarer Arbeitskleidung geht mit 1 Dollar pro reinem Arbeitswaschgang oder 50 Cent gemischt, mit einfachem Tagebuch ab 150 Dollar im Jahr."
  },
  {
    "question": "Muss ich mich als Reinigungskraft mit ABN für die GST registrieren?",
    "answer": "Erst wenn dein Umsatz aus der Reinigungsarbeit 75.000 Dollar im Jahr überschreitet. Das ist die allgemeine Grenze für Einzelunternehmer und keine Sonderregel für Reinigung, und die meisten, die in Teilzeit, privat oder über eine App putzen, kommen nicht in die Nähe. Darunter stellst du einfach Rechnungen ohne GST-Zeile."
  },
  {
    "question": "Bin ich Einzelunternehmer oder Angestellter?",
    "answer": "Es entscheidet, wer die Arbeit verteilt. Kunden, die du selbst gefunden hast, Endreinigungen und App-Buchungen laufen fast immer als Einzelunternehmer über eine ABN.\n\nTeilt dir eine Reinigungsfirma Objekte und Schichten zu, bist du fast immer angestellt.\n\nDer Vertrag entscheidet es nicht, die tatsächlichen Umstände entscheiden es, und wenn du beides gemacht hast, gehört beides in dieselbe Erklärung."
  }
]

const GUIDES = [
  {
    "href": "/de/blog/abn-deductions-business-expenses",
    "label": "Betriebsausgaben, wenn du mit ABN arbeitest",
    "desc": "Was ein Einzelunternehmer absetzen kann und wo die Grenze liegt."
  },
  {
    "href": "/de/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "Die 300-Dollar-Sofortabschreibung für Werkzeug und Ausrüstung",
    "desc": "Warum jedes Teil einzeln geprüft wird und was ein Set daran ändert."
  },
  {
    "href": "/de/blog/tax-deductions-working-holiday-makers",
    "label": "Absetzbare Kosten für Working Holiday Maker: die vollständige Liste",
    "desc": "Alle Kategorien, und was das ATO ablehnt."
  }
]

const SERVICES = [
  {
    "href": "/de/abn",
    "label": "ABN"
  },
  {
    "href": "/de/tfn",
    "label": "TFN"
  },
  {
    "href": "/de/tax-return",
    "label": "Steuererklärung"
  }
]

/* Everything below the content is shared: the schema builders, the tokens and
   every section renderer live in JobExpensesPage, once, for all 21 job pages. */
export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'de',
        path: '/de/expenses/cleaners',
        articleHeadline: "Reinigung in Australien: Ausrüstung, Wäsche, Fahrten",
        articleDescription: "Die Fahrt zwischen den Häusern ist meist der größte Abzug und der, den fast niemand macht.",
        inLanguage: "de-DE",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
