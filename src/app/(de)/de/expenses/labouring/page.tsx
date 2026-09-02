import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

export const metadata: Metadata = {
  "title": "Zeitarbeit und Lager: was du absetzt",
  "description": "Schutzausrüstung je Einsatzort, Ticketverlängerungen, Werkzeug und Fahrten zwischen zwei Einsatzorten am selben Tag.",
  "keywords": [
    "Zeitarbeit Steuerabzüge Australien",
    "Lagerjob Steuer Australien",
    "Labour Hire Steuer Working Holiday",
    "Hilfsarbeiter Steuerabzüge Australien",
    "Fahrten zwischen Einsatzorten absetzen",
    "Staplerschein absetzbar Australien",
    "Backpacker Lagerarbeit Steuer",
    "mehrere Arbeitgeber Steuererklärung Australien"
  ],
  "alternates": {
    "canonical": "/de/expenses/labouring",
    "languages": {
      "en-AU": "/expenses/labouring",
      "de": "/de/expenses/labouring",
      "ja": "/ja/expenses/labouring",
      "x-default": "/expenses/labouring"
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
    "url": `${SITE_URL}/de/expenses/labouring`,
    "siteName": "Working Holiday Tax",
    "title": "Zeitarbeit und Lager in Australien: was absetzbar ist",
    "description": "Zwei Agenturen sind zwei Income Statements. Zwei Einsatzorte an einem Tag sind ein Abzug, den fast niemand macht."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Zeitarbeit und Lager in Australien: was absetzbar ist",
    "description": "Zwei Agenturen sind zwei Income Statements. Zwei Einsatzorte an einem Tag sind ein Abzug, den fast niemand macht."
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

const WA = waUrl({ topic: 'expenses', lang: "de", detail: "Zeitarbeit und Lagerarbeit" })

const UI = {
  "ctaLabel": "Schreib uns auf WhatsApp",
  "ctaSub": "Antwort in etwa einer Stunde.",
  "guaranteeHeading": "Wir beginnen mit einem Tax Assessment, das deine gesamte Situation prüft und dir dein voraussichtliches Steuerergebnis zeigt, damit du genau weißt, wo du stehst, bevor du entscheidest, ob du abgeben möchtest.",
  "guaranteeBody": "Vier Agenturen und eine vergessene Einzelschicht in eine Erklärung zu ziehen ist hier normale Arbeit, und jeder Kunde ist auf einem 417 oder 462. Von einem registrierten Steueragenten geprüft und freigegeben, bevor es beim ATO eingereicht wird.",
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
    "name": "Zeitarbeit",
    "item": "/de/expenses/labouring"
  }
]

const HERO = {
  "kicker": "Lager, Umzüge, Garten und Events",
  "h1lead": "Zwei Agenturen sind zwei Income Statements.",
  "h1accent": "Zwei Einsatzorte sind ein Abzug.",
  "lede": "Eine vergessene Agentur kostet mehr als jeder fehlende Beleg, und eine Erklärung muss jede einzelne tragen."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Was können Hilfskräfte über eine Agentur absetzen?",
    "paras": [
      "Absetzbar sind Schutzausrüstung, die der Einsatzort verlangt, die Verlängerung eines Tickets, das du bereits hast, selbst gekauftes Werkzeug, die Fahrt zwischen zwei Einsatzorten am selben Tag und der arbeitsbezogene Anteil deines Handys. Was absetzbar ist, folgt der Arbeit, die du an diesem Tag wirklich gemacht hast, nicht der Jobbezeichnung im Agenturvertrag.",
      "Eine Woche im Kühllager, eine Woche in einer Gartenkolonne und ein Wochenende beim Event-Abbau erzeugen drei verschiedene Kostenbilder."
    ]
  },
  {
    "kind": "items",
    "h2": "Die Abzüge, die zu dieser Arbeit gehören",
    "intro": "Alles hier folgt dem Einsatzort. Frag, was der Einsatzort verlangt hat, nicht wie die Agentur dich genannt hat.",
    "items": [
      {
        "t": "Fahrten zwischen zwei Einsatzorten am selben Tag",
        "d": "Vormittags ein Lager, nachmittags ein anderer Ort ist Fahrt zwischen Arbeitsplätzen und absetzbar. Die erste Fahrt von zu Hause bleibt der Arbeitsweg."
      },
      {
        "t": "Schutzausrüstung, die der Einsatzort verlangt hat",
        "d": "Sicherheitsschuhe mit Stahlkappe, Handschuhe, Warnkleidung, Schutzbrille, Gehörschutz, schnittfeste Ärmel. Absetzbar, wenn das Teil dich vor einer erkennbaren Gefahr in diesem konkreten Job schützt und du es selbst bezahlt hast."
      },
      {
        "t": "Verlängerung von Stapler-, Hubarbeitsbühnen- oder anderen Tickets",
        "d": "Die Verlängerung eines Tickets, das du hast und für die Arbeit nutzt, ist absetzbar, das erste nicht. Das gilt für Stapler, Hubarbeitsbühne und White Card gleichermaßen."
      },
      {
        "t": "Selbst gekauftes Werkzeug",
        "d": "Alles, was du gekauft und nicht erstattet bekommen hast, ist absetzbar: bis 300 Dollar voll im Kaufjahr, darüber verteilt über die Nutzungsdauer."
      },
      {
        "t": "Schutzkleidung für Kälte und Wetter",
        "d": "Eine Kühlhausjacke für Arbeit im Kühl- oder Tiefkühllager, Regenkleidung für Gartenarbeit draußen. Das ist Schutzkleidung und keine Alltagskleidung, weil es dich vor einer Bedingung schützt, in die die Arbeit dich bringt."
      },
      {
        "t": "Arbeitsanteil deines Handys",
        "d": "Agenturen laufen über Nachrichten: Schichtangebote um sechs Uhr morgens, Adressen, Stundenzettel. Der arbeitsbezogene Prozentsatz deines Vertrags ist ein echter Abzug, wenn du dafür dein eigenes Handy nutzt."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was musst du über alle Einsätze hinweg aufheben?",
    "paras": [
      "Ein Abzug, drei Tests: du hast bezahlt, dir hat es niemand erstattet, und es diente dazu, das Einkommen zu verdienen, das du angibst. Über mehrere Einsätze heißt das Belege für selbst gekaufte Stiefel und Handschuhe, für die Ticketverlängerung und eine Notiz zu Daten, Orten und Entfernungen hinter den Fahrten.",
      "Der Nachweis kann ein Beleg, eine Rechnung, ein Kontoauszug oder ein Handyfoto sein, mit Betrag, Datum, Anbieter und Gegenstand, fünf Jahre aufbewahrt. Abzüge von zusammen 300 Dollar oder weniger im Jahr brauchen keinen schriftlichen Nachweis. Das sind nicht die 300 Dollar, die entscheiden, ob ein Ausrüstungsteil sofort oder über die Nutzungsdauer abgeschrieben wird."
    ]
  },
  {
    "kind": "traps",
    "h2": "Was machen Zeitarbeitskräfte falsch?",
    "intro": "Die falschen Abzüge sind meist Kleidung und Arbeitsweg. Die übersehenen drehen sich fast alle um die Zahl der Arbeitgeber, und genau da verliert Zeitarbeit still Geld.",
    "wrong": [
      {
        "t": "Arbeitshose und Boots ohne Schutzfunktion",
        "d": "Schlichte Arbeitshose, T-Shirt, gewöhnliche Boots. Alltagskleidung bleibt privat, so schwer die Arbeit auch ist und so schnell sie verschleißt."
      },
      {
        "t": "Der Weg zu einem festen Einsatzort",
        "d": "Wenn eine Agentur dich zwei Monate lang in dasselbe Lager schickt, ist die Fahrt dorthin normaler Arbeitsweg. Absetzbar wird sie durch den Wechsel zwischen Arbeitsplätzen, nicht dadurch, dass eine Agentur dich geschickt hat."
      },
      {
        "t": "Ausrüstung, die die Agentur ausgegeben hat",
        "d": "Die meisten Agenturen stellen Warnkleidung und manchmal Schuhe. Wurde es dir ausgegeben oder erstattet, sind keine Kosten übrig."
      },
      {
        "t": "Das erste Ticket als Arbeitskost",
        "d": "Der Staplerschein, den du bezahlt hast, damit dich eine Agentur vorschlägt, ist eine Qualifikationskost, keine Arbeitskost. Verlängerungen im laufenden Einsatz sind absetzbar."
      },
      {
        "t": "Anzunehmen, die Agentur habe deine Steuer erledigt",
        "d": "Eine Agentur behält Steuer ein und meldet deinen Lohn. Sie gibt keine Erklärung für dich ab, setzt keine Kosten für dich an und prüft nicht, ob die anderen beiden Agenturen deine Daten richtig erfasst haben."
      }
    ],
    "missed": [
      {
        "t": "Ein Income Statement einer vergessenen Agentur",
        "d": "Drei Wochen bei einer Agentur im März, eine Schicht in einem anderen Bundesstaat im Juni, und die Erklärung geht ohne sie raus. Schlimmer als ein vergessener Abzug, weil es später eine Korrektur bedeutet."
      },
      {
        "t": "Fahrten zwischen zwei Einsatzorten an einem Tag",
        "d": "Bei Agenturen, die eine Crew verschieben, sehr üblich, und fast nie abgesetzt, weil die Bewegung von jemand anderem entschieden wurde. Absetzbar ist sie trotzdem."
      },
      {
        "t": "Selbst gekaufte Boots und Handschuhe zwischen zwei Einsätzen",
        "d": "Ausrüstung, die du für den nächsten Job gekauft hast, wird in Eile bezahlt und nie belegt. Jeder Gegenstand unter 300 Dollar ist ein voller Abzug im Kaufjahr."
      },
      {
        "t": "Eine bar bezahlte Ticketverlängerung",
        "d": "Verlängerungen für Stapler oder Hubarbeitsbühne sind günstig genug, um sie bis Juli zu vergessen, und absetzbar, sobald du mit dem Ticket bereits arbeitest."
      },
      {
        "t": "Wochen mit falschem Einbehalt",
        "d": "Eine neue Agentur, die deine Tax File Number Declaration noch nicht verarbeitet hat oder nicht als Arbeitgeber von Working Holiday Makern registriert ist, behält deutlich mehr als 15 Prozent ein. Das kommt nur mit der Erklärung zurück, die alle Agenturen zusammenführt."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Welche Teile hängen daran, wie dein Jahr lief?",
    "paras": [
      "Wie wechselnd die Arbeit war, entscheidet, wie viel deiner Fahrten absetzbar ist, und das ist eine Tatsachenfrage, keine Regel. Wie oft der Ort wechselte, ob es eine Basis gab, zu der du immer zurückkehrtest, und ob die Agentur die Bewegung verlangt hat, fließt alles ein. Zwei Leute derselben Agentur können sehr unterschiedliche Fahrtabzüge haben.",
      "Jede Agentur ist ein eigener Arbeitgeber, mit eigener Tax File Number Declaration, eigenem Einbehaltsverhältnis und eigenem Income Statement. Working Holiday Maker bekommen von keiner davon einen Steuerfreibetrag, das Risiko ist also ein falsch angewandter Satz oder ein Arbeitgeber, der in der Erklärung fehlt.",
      "Darunter liegt der steuerliche Wohnsitz. Britische, deutsche und japanische Passinhaber, die steuerlich in Australien ansässig waren, können nach der Addy-Entscheidung den vollen Steuerfreibetrag tragen, mehr wert als alle Abzüge auf dieser Seite. Das hängt von deinen eigenen Umständen ab und muss ordentlich geprüft werden."
    ]
  }
]

const FAQS = [
  {
    "question": "Ich bin bei drei Agenturen registriert. Ändert das meine Steuer?",
    "answer": "Jede Agentur ist rechtlich ein eigener Arbeitgeber, mit eigener Tax File Number Declaration, eigenem Einbehalt und eigenem Income Statement am Jahresende. Alles kommt in eine Erklärung.\n\nDein Lohn wird zum Working-Holiday-Maker-Satz besteuert statt gegen einen Steuerfreibetrag, das eigentliche Risiko bei mehreren Agenturen ist also, dass eine davon fehlt."
  },
  {
    "question": "Kann ich Fahrten zwischen verschiedenen Einsatzorten absetzen?",
    "answer": "Meistens ja. Fahrten zwischen zwei getrennten Arbeitsorten, etwa vormittags ein Lager und nachmittags ein anderer Ort, sind absetzbar, anders als dein Weg von zu Hause zu einem festen Arbeitsplatz.\n\nWie viel davon zählt, hängt davon ab, wie wechselnd das Muster ist, also notiere Daten, Orte und Entfernungen."
  },
  {
    "question": "Was ist steuerlich der Unterschied zwischen Zeitarbeit und Bau?",
    "answer": "Die Tests sind identisch, die Posten nicht. Baustellenarbeit verlangt meist eine White Card und typische Baustellen-Schutzausrüstung. Allgemeine Zeitarbeit deckt Lager, Umzüge, Garten, Produktionslinien und Events ab, wo die Ausrüstung dem Einsatzort folgt und eine White Card oft nicht gebraucht wird.\n\nWenn deine Einsätze auf Baustellen sind, geht die Bau-Seite tiefer."
  },
  {
    "question": "Kann ich einen Staplerschein absetzen?",
    "answer": "Die Verlängerung ja, den ersten Erwerb nein. Nutzt du den Schein bereits im Einsatz, ist seine Verlängerung eine Kost der Arbeit. Der erste Schein hat dich erst vermittelbar gemacht, und das behandelt das ATO als privat.\n\nFür Hubarbeitsbühne, White Card und Führerschein gilt dieselbe Grenze."
  },
  {
    "question": "Ich hatte nur ein paar Schichten. Lohnt sich das überhaupt?",
    "answer": "Meistens ja, sofern du die Sachen selbst bezahlt und nichts erstattet bekommen hast. Auch wenige Schichten bringen Boots, Handschuhe, eine Ticketverlängerung oder Fahrten zwischen Einsatzorten mit sich, und jeder Dollar Abzug senkt das Einkommen, auf das die Steuer berechnet wird.\n\nDer Test ändert sich mit der Zahl der Schichten nicht."
  }
]

const GUIDES = [
  {
    "href": "/de/blog/labour-hire-agencies-working-holiday-australia",
    "label": "Zeitarbeitsfirmen in Australien",
    "desc": "Wer eigentlich dein Arbeitgeber ist, wenn dich eine Agentur vermittelt."
  },
  {
    "href": "/de/blog/white-card-australia-working-holiday",
    "label": "Die White Card und was sie dich kostet",
    "desc": "Wie du sie bekommst und warum die erste kein Abzug ist."
  },
  {
    "href": "/de/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "Die 300-Dollar-Sofortabschreibung für Werkzeug und Ausrüstung",
    "desc": "Warum jedes Teil einzeln geprüft wird und was ein Set daran ändert."
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
    "href": "/de/superannuation",
    "label": "Superannuation"
  }
]

/* Everything below the content is shared: the schema builders, the tokens and
   every section renderer live in JobExpensesPage, once, for all 21 job pages. */
export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'de',
        path: '/de/expenses/labouring',
        articleHeadline: "Zeitarbeit und Lager in Australien: was absetzbar ist",
        articleDescription: "Zwei Agenturen sind zwei Income Statements. Zwei Einsatzorte an einem Tag sind ein Abzug, den fast niemand macht.",
        inLanguage: "de-DE",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
