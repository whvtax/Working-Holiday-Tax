import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

export const metadata: Metadata = {
  "title": "FIFO: Schutzausrüstung und Zone Offset",
  "description": "Schutzausrüstung, Werkzeug, Ticketverlängerungen, Medicals und der Arbeitsanteil am Handy. Dazu, warum der Zone Tax Offset bei FIFO fast nie gilt.",
  "keywords": [
    "FIFO Steuerabzüge Australien",
    "Fly in Fly out Steuer Australien",
    "Zone Tax Offset FIFO",
    "FIFO Camp Unterkunft Steuer",
    "High Risk Work Licence absetzbar",
    "FIFO Schutzausrüstung absetzen",
    "Backpacker FIFO Job Steuer",
    "Minenjob Steuerabzüge Australien"
  ],
  "alternates": {
    "canonical": "/de/expenses/fifo",
    "languages": {
      "en-AU": "/expenses/fifo",
      "de": "/de/expenses/fifo",
      "ja": "/ja/expenses/fifo",
      "x-default": "/expenses/fifo"
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
    "url": `${SITE_URL}/de/expenses/fifo`,
    "siteName": "Working Holiday Tax",
    "title": "FIFO Australien: Schutzausrüstung, Tickets, Zone Offset",
    "description": "Camp-Essen und die Fahrt zum Flughafen sind nicht absetzbar. Der Zone Tax Offset ist vermutlich auch nicht deiner."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "FIFO Australien: Schutzausrüstung, Tickets, Zone Offset",
    "description": "Camp-Essen und die Fahrt zum Flughafen sind nicht absetzbar. Der Zone Tax Offset ist vermutlich auch nicht deiner."
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

const WA = waUrl({ topic: 'expenses', lang: "de", detail: "FIFO und Camp-Arbeit" })

const UI = {
  "ctaLabel": "Schreib uns auf WhatsApp",
  "ctaSub": "Antwort in etwa einer Stunde.",
  "guaranteeHeading": "Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also für unseren Service nie drauf.",
  "guaranteeBody": "417 und 462 sind die einzigen Visa, für die wir Steuerarbeit annehmen, deshalb werden Zone Offset, Wohnsitzfrage und die Super in drei Fonds zusammen angesehen. Von einem registrierten Steueragenten geprüft und freigegeben, bevor es beim ATO eingereicht wird.",
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
    "name": "FIFO",
    "item": "/de/expenses/fifo"
  }
]

const HERO = {
  "kicker": "Roster, Camps und abgelegene Standorte",
  "h1lead": "Der Zone Tax Offset ist vermutlich nicht deiner.",
  "h1accent": "Das hier schon.",
  "lede": "Zimmer im Camp, Kantine und Flug sind Kosten der Firma, nicht deine. Dir bleiben Schutzausrüstung, Ticketverlängerungen, Medicals und das Handy."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Was können FIFO-Beschäftigte absetzen?",
    "paras": [
      "Absetzbar sind selbst gekaufte Schutzausrüstung und das Waschen davon, Werkzeug und Geräte, die Verlängerung eines Tickets oder einer Lizenz, die du bereits hast, vom Arbeitgeber verlangte Medicals sowie Drogen- und Alkoholtests, die du selbst bezahlt hast, der arbeitsbezogene Anteil an Handy und Internet und Weiterbildung, die zu deiner jetzigen Arbeit gehört.",
      "Nicht auf dieser Liste steht alles, was FIFO teuer wirken lässt. Dein Zimmer im Camp und dein Essen in der Mess werden von der Firma gebucht und bezahlt, und der Flug zum Standort meistens auch. Ein Abzug gibt nur Geld zurück, das aus deiner Tasche geflossen ist."
    ]
  },
  {
    "kind": "items",
    "h2": "Die Abzüge, die zu dieser Arbeit gehören",
    "intro": "An allem hier hängt dieselbe Bedingung: du hast bezahlt, und es kam nicht aus dem Lager der Firma.",
    "items": [
      {
        "t": "Selbst gekaufte Schutzausrüstung und deren Wäsche",
        "d": "Overalls, Sicherheitsschuhe mit Stahlkappe, Handschuhe, Schutzbrille, Gehörschutz, Masken. Absetzbar, weil sie dich vor einer konkreten Gefahr auf dem Standort schützen. Das Waschen absetzbarer Schutzkleidung geht zum ATO-Satz: 1 Dollar pro reinem Arbeitswaschgang oder 50 Cent gemischt."
      },
      {
        "t": "Werkzeug und Geräte",
        "d": "Alles, was du für die Arbeit gekauft hast und nicht aus dem Lager bekommen hast. Jeder Gegenstand bis 300 Dollar wird im Kaufjahr voll abgesetzt, darüber verteilt über die Nutzungsdauer. Ein zusammen gekauftes Werkzeugset ab 300 Dollar gilt als ein Gegenstand."
      },
      {
        "t": "Verlängerung von Tickets und Lizenzen",
        "d": "High Risk Work Licence, Working-at-Heights-Ticket, Staplerschein. Verlängerungen sind absetzbar, sobald du bereits in der Rolle arbeitest. Das erste nicht, auf derselben Grundlage wie die erste White Card."
      },
      {
        "t": "Vom Arbeitgeber verlangte Medicals und Tests",
        "d": "Viele Standorte verlangen ein Medical und Drogen- und Alkoholtests. Verlangt dein Arbeitgeber das für eine Rolle, die du bereits hast, und hast du selbst bezahlt, sind die Kosten absetzbar."
      },
      {
        "t": "Arbeitsanteil an Handy und Internet",
        "d": "Roster prüfen, Stundenzettel einreichen, verpflichtende Online-Einweisungen und Auffrischungen erledigen. Setze den arbeitsbezogenen Prozentsatz auf fairer Grundlage an, nicht die ganze Rechnung."
      },
      {
        "t": "Weiterbildung zu deiner jetzigen Arbeit",
        "d": "Ein kurzer Kurs oder eine Einheit, die eine aktuelle Fähigkeit oder ein Ticket erhält, ist absetzbar, ebenso Reise und Unterkunft, wenn dein Arbeitgeber die Teilnahme außerhalb deiner Basis verlangt. Ein erstes Einstiegszertifikat, um für eine Rolle überhaupt in Frage zu kommen, ist es nicht."
      }
    ]
  },
  {
    "kind": "note",
    "label": "Der größte FIFO-Irrtum",
    "title": "In einer Zone zu arbeiten ist nicht dasselbe wie dort zu wohnen.",
    "body": "Seit einer Gesetzesänderung 2015 hängt der Zone Tax Offset davon ab, wo dein normaler Wohnsitz ist, und nicht davon, wohin dich der Roster bringt. Dein normaler Wohnsitz muss selbst mehr als 183 Tage im Einkommensjahr in einer ausgewiesenen abgelegenen Zone liegen.\n\nIn eine Zone einzufliegen, während du zwischen den Swings in Perth, Brisbane oder Darwin wohnst, erfüllt diesen Test nicht. Das Camp ist nicht dein normaler Wohnsitz, weil es vorübergehend und an den Roster gebunden ist.\n\nFür die meisten Working Holiday Maker im FIFO-Roster gilt der Offset nicht."
  },
  {
    "kind": "answer",
    "h2": "Was muss hinter einem FIFO-Abzug stehen?",
    "paras": [
      "Ein Abzug übersteht drei Fragen. Hast du bezahlt? Hat dir jemand das Geld zurückgegeben? Diente es dazu, das Einkommen zu verdienen, das du angibst? Auf dem Roster heißt das der Beleg für die Stiefel, die das Lager nicht ausgegeben hat, die Rechnung für das Medical und die Rechnung hinter deinem Handyanteil.",
      "Nachweis heißt Betrag, Datum, Anbieter und Gegenstand, auf einem Beleg, einer Rechnung, einem Kontoauszug oder einem Foto an der Kasse, und er muss fünf Jahre halten. Bei 300 Dollar Abzügen oder weniger im Jahr ist kein schriftlicher Nachweis nötig. Das sind nicht die 300 Dollar, die entscheiden, ob ein Werkzeug sofort oder über die Nutzungsdauer abgeschrieben wird."
    ]
  },
  {
    "kind": "traps",
    "h2": "Was machen FIFO-Beschäftigte falsch?",
    "intro": "Nirgends sonst auf dieser Website kursieren so viele selbstbewusst wiederholte Falschinformationen.",
    "wrong": [
      {
        "t": "Der Zone Tax Offset",
        "d": "Das mit Abstand am häufigsten angesetzte, worauf FIFO-Beschäftigte keinen Anspruch haben. Es kommt darauf an, wo du normal wohnst, nicht wohin du fliegst, und das Camp zählt nicht."
      },
      {
        "t": "Camp-Unterkunft und Verpflegung",
        "d": "Dein Arbeitgeber bucht und bezahlt Zimmer und Mess, und an wirklich abgelegenen Standorten ist das für ihn meist ein steuerbefreiter Sachbezug statt Einkommen für dich. So oder so hast du nie bezahlt."
      },
      {
        "t": "Die Fahrt zum Flughafen vor dem Swing",
        "d": "Das ist der normale Arbeitsweg, so früh der Flug und so weit der Flughafen auch ist. Die enge Ausnahme für sperriges Werkzeug gibt es, greift aber selten bei Camp-Service-Rollen, wo es entweder nichts Sperriges gibt oder einen sicheren Platz dafür."
      },
      {
        "t": "Der Umzug nach Perth oder Brisbane für die Arbeit",
        "d": "Flüge, Fracht und vorübergehende Unterkunft für einen Umzug, um FIFO-Arbeit aufzunehmen, sind private Umzugskosten. Sich in die Lage zu bringen, Einkommen zu verdienen, ist nicht dasselbe wie es zu verdienen."
      },
      {
        "t": "Eine erste High Risk Work Licence",
        "d": "Das Ticket, das du bezahlt hast, um eingestellt werden zu können, ist eine private Kost. Die Verlängerung, während du damit bereits arbeitest, ist absetzbar."
      }
    ],
    "missed": [
      {
        "t": "Selbst gekaufte Schutzausrüstung und deren Wäsche",
        "d": "Viele kaufen eigene Schuhe oder Handschuhe, statt auf das Lager zu warten, und setzen danach weder die Ausrüstung noch das Waschen zum veröffentlichten Satz ab."
      },
      {
        "t": "Selbst bezahlte Medicals und Drogen- und Alkoholtests",
        "d": "Absetzbar, wenn der Arbeitgeber sie für eine Rolle verlangt, die du bereits hast, und fast nie angesetzt, weil es sich nach Hürde statt nach Ausgabe anfühlt."
      },
      {
        "t": "Arbeitsanteil an Handy und Internet im Swing",
        "d": "Roster, Stundenzettel und Pflichteinweisungen laufen alle über ein privates Gerät."
      },
      {
        "t": "Ticketverlängerungen über ein langes Roster-Jahr",
        "d": "Eine Verlängerung der High Risk Work Licence oder des Working-at-Heights-Tickets zwischen zwei Swings gerät bis zum Jahresende leicht aus dem Blick."
      },
      {
        "t": "Superannuation, die in mehreren Fonds zurückbleibt",
        "d": "FIFO zahlt gut, also ist der Super-Betrag größer als in den meisten Backpacker-Jobs. Er bleibt liegen, wenn du gehst, und muss als Departing Australia Superannuation Payment beantragt werden, sobald dein Visum abgelaufen ist."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was bleibt auf einer FIFO-Akte offen?",
    "paras": [
      "Der Zone Tax Offset ist meistens falsch, nicht unmöglich. Lag deine Basis während der Working Holiday in einer ausgewiesenen Zone, etwa eine Wohnung in einem abgelegenen Ort statt in einer Großstadt, ist die Frage offen.",
      "Die Ausnahme für sperriges Werkzeug zählt eher für Handwerker, die mit eigenem Werkzeugsatz einfliegen, als für Camp-Service-Rollen. Entschieden wird sie davon, was du transportiert hast und was der Standort an Lagerung bot.",
      "Der steuerliche Wohnsitz ist bei FIFO die größte Frage, weil die Beträge größer sind. Britische, deutsche und japanische Passinhaber, die steuerlich in Australien ansässig waren, können nach der Addy-Entscheidung den vollen Steuerfreibetrag tragen. Das hängt von deinen eigenen Umständen ab und muss ordentlich geprüft werden."
    ]
  }
]

const FAQS = [
  {
    "question": "Bekommen FIFO-Beschäftigte den Zone Tax Offset?",
    "answer": "Meistens nicht, und das ist der größte Irrtum bei FIFO-Steuern. Seit einer Gesetzesänderung 2015 hängt der Anspruch davon ab, dass dein normaler Wohnsitz mehr als 183 Tage im Jahr in einer ausgewiesenen abgelegenen Zone liegt, und nicht davon, wo du körperlich arbeitest.\n\nIn eine Zone einzufliegen, während du zwischen den Swings in einer Großstadt wohnst, erfüllt diesen Test nicht, und das Camp ist nicht dein normaler Wohnsitz."
  },
  {
    "question": "Kann ich Camp-Unterkunft oder Verpflegung absetzen?",
    "answer": "Nein. Zimmer und Essen am Standort organisiert und bezahlt dein Arbeitgeber, und an wirklich abgelegenen Standorten gilt das für ihn meist als steuerbefreiter Sachbezug.\n\nWeil du nie selbst für Zimmer oder Essen bezahlt hast, gibt es keine Ausgabe von dir abzusetzen."
  },
  {
    "question": "Kann ich die Fahrt zum Flughafen vor dem Swing absetzen?",
    "answer": "In fast allen Fällen nein. Die Fahrt von zu Hause zum Flughafen ist normaler privater Arbeitsweg, egal wie früh der Flug ist.\n\nEs gibt eine enge Ausnahme für wirklich sperriges und notwendiges Werkzeug ohne sicheren Lagerplatz am Standort, aber die greift bei Camp-Service-Rollen selten."
  },
  {
    "question": "Kann ich meine High Risk Work Licence absetzen?",
    "answer": "Du kannst die Verlängerung einer Lizenz absetzen, die du bereits hast. Den ersten Erwerb nicht, weil diese Kosten dich erst für die Rolle qualifiziert haben.\n\nEs ist dieselbe Unterscheidung zwischen erstem Erwerb und Verlängerung, die das ATO bei der White Card anwendet."
  },
  {
    "question": "Was kann ich im Roster für Handy und Internet absetzen?",
    "answer": "Den arbeitsbezogenen Anteil. Wenn du dein eigenes Handy oder Internet für den Job nutzt, um den Roster zu prüfen, Stundenzettel einzureichen oder verpflichtende Online-Einweisungen zu machen, ist dieser Anteil der Rechnung absetzbar.\n\nDu brauchst eine faire Schätzung des Prozentsatzes, denn die volle Rechnung eines Geräts, das du auch sonst nutzt, hält nicht stand."
  }
]

const GUIDES = [
  {
    "href": "/de/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "Die 300-Dollar-Sofortabschreibung für Werkzeug und Ausrüstung",
    "desc": "Warum jedes Teil einzeln geprüft wird und was ein Set daran ändert."
  },
  {
    "href": "/de/blog/1000-dollar-instant-deduction-rule-2026",
    "label": "Die 1.000-Dollar-Pauschale ab 1. Juli 2026",
    "desc": "Pauschale ohne Belege oder tatsächliche Kosten. Du bekommst nur eins von beidem."
  },
  {
    "href": "/de/superannuation",
    "label": "Superannuation zurückholen, wenn du Australien verlässt",
    "desc": "Wie DASP funktioniert und was davon einbehalten wird."
  }
]

const SERVICES = [
  {
    "href": "/de/tax-return",
    "label": "Steuererklärung"
  },
  {
    "href": "/de/superannuation",
    "label": "Superannuation"
  },
  {
    "href": "/de/blog/tax-residency-working-holiday-makers",
    "label": "Steuerlicher Wohnsitz"
  }
]

/* Everything below the content is shared: the schema builders, the tokens and
   every section renderer live in JobExpensesPage, once, for all 21 job pages. */
export default function Page() {
  return (
    <JobExpensesPage
      content={{
        lang: 'de',
        path: '/de/expenses/fifo',
        articleHeadline: "FIFO Australien: Schutzausrüstung, Tickets, Zone Offset",
        articleDescription: "Camp-Essen und die Fahrt zum Flughafen sind nicht absetzbar. Der Zone Tax Offset ist vermutlich auch nicht deiner.",
        inLanguage: "de-DE",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
