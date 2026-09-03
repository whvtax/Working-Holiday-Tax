import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

export const metadata: Metadata = {
  "title": "Bauarbeiter: Werkzeug, Schutzkleidung",
  "description": "Werkzeug unter und über 300 Dollar, Schutzkleidung, White-Card-Verlängerung, Sonnenschutz und der enge Fall, in dem der Ute zählt.",
  "keywords": [
    "Bauarbeiter Steuerabzüge Australien",
    "Handwerker absetzen Australien",
    "White Card absetzbar",
    "Werkzeug absetzen ATO",
    "Schutzausrüstung absetzen Bau",
    "Backpacker Bau Steuererklärung",
    "417 Visum Bau Steuerabzüge",
    "Ute Fahrtenbuch Australien"
  ],
  "alternates": {
    "canonical": "/de/expenses/construction",
    "languages": {
      "en-AU": "/expenses/construction",
      "de": "/de/expenses/construction",
      "ja": "/ja/expenses/construction",
      "x-default": "/expenses/construction"
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
    "url": `${SITE_URL}/de/expenses/construction`,
    "siteName": "Working Holiday Tax",
    "title": "Bau in Australien: Werkzeug, Schutzausrüstung, Ute",
    "description": "Werkzeug, Schutzausrüstung und die White-Card-Verlängerung sind absetzbar. Die erste White Card und die kaputte Jeans nicht."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Bau in Australien: Werkzeug, Schutzausrüstung, Ute",
    "description": "Werkzeug, Schutzausrüstung und die White-Card-Verlängerung sind absetzbar. Die erste White Card und die kaputte Jeans nicht."
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

const WA = waUrl({ topic: 'expenses', lang: "de", detail: "Bau und Baustelle" })

const UI = {
  "ctaLabel": "Schreib uns auf WhatsApp",
  "ctaSub": "Antwort in etwa einer Stunde.",
  "guaranteeHeading": "Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz. Musst du stattdessen Steuern nachzahlen, deckt die Gebühr unsere Prüfung ab und wird nicht erstattet.",
  "guaranteeBody": "Baustellenerklärungen, Ticketverlängerungen und der Streit um den Ute sind hier Wochengeschäft, und jeder Kunde ist auf einem 417 oder 462. Von einem registrierten Steueragenten geprüft und freigegeben, bevor es beim ATO eingereicht wird.",
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
    "name": "Bau",
    "item": "/de/expenses/construction"
  }
]

const HERO = {
  "kicker": "Baustellen, Hilfsarbeit und Handwerk",
  "h1lead": "Dein Werkzeug ist absetzbar.",
  "h1accent": "Deine erste White Card nicht.",
  "lede": "Der Bau hat die längste Abzugsliste aller Backpacker-Jobs. Der Ute steht meistens nicht darauf."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Was können Bauarbeiter absetzen?",
    "paras": [
      "Absetzbar sind selbst gekauftes Werkzeug und Ausrüstung, Schutzkleidung und Schutzausrüstung, Sonnenschutz für Arbeit im Freien, die Verlängerung einer White Card oder eines Tickets, das du bereits hast, der arbeitsbezogene Anteil deines Handyvertrags und Weiterbildung, die zu dem Gewerk gehört, in dem du bereits arbeitest. Alles, was der Arbeitgeber gestellt oder erstattet hat, fällt raus.",
      "Die Liste ist lang, weil der Job konkrete Kosten erzeugt. Stahlkappen schützen dich vor einem fallenden Stein, der Helm vor etwas von oben, Sonnencreme vor sechs Stunden auf einer unbeschatteten Platte. Diese Verbindung sucht der Abzugstest."
    ]
  },
  {
    "kind": "items",
    "h2": "Die Abzüge, die zu dieser Arbeit gehören",
    "intro": "Die Grenzen unten betreffen den Zeitpunkt, nicht den Anspruch. Über 300 Dollar verschwindet kein Abzug, er verteilt sich.",
    "items": [
      {
        "t": "Werkzeug und Ausrüstung unter 300 Dollar pro Stück",
        "d": "Bohrmaschine, Winkelschleifer, Nagler, Wasserwaage, Werkzeuggürtel, ein Satz Stechbeitel. Jeder Gegenstand bis 300 Dollar wird im Kaufjahr voll abgezogen. Geprüft wird pro Stück, also baut ein Jahr kleiner Käufe einen erheblichen Abzug aus Belegen auf, die die meisten an der Kasse wegwerfen."
      },
      {
        "t": "Werkzeug und Ausrüstung ab 300 Dollar",
        "d": "Weiterhin absetzbar, über die Nutzungsdauer verteilt. Ein Betonmischer oder eine ordentliche Kappsäge gehört hierher. Die Falle ist, mehrere Werkzeuge zusammen als Set ab 300 Dollar zu kaufen, denn dann gilt das Set als ein Gegenstand, auch wenn jedes Teil einzeln darunter gelegen hätte."
      },
      {
        "t": "Schutzausrüstung und Schutzkleidung",
        "d": "Warnschutzhemden und -westen, Sicherheitsschuhe mit Stahlkappe, Schutzbrille, Helm, Gehörschutz, Arbeitshandschuhe, Staubmaske. Das ATO fragt nicht, ob etwas auf der Baustelle nützlich ist, sondern ob es dich vor einer konkreten Verletzungsgefahr schützt."
      },
      {
        "t": "Sonnenschutz für Arbeit im Freien",
        "d": "Sonnencreme, Hut mit breiter Krempe und Sonnenbrille sind absetzbar, wenn die Arbeit draußen stattfindet. Auf einer Sommerplatte ist das eine echte, wiederkehrende Ausgabe, für die kaum jemand einen Beleg aufhebt."
      },
      {
        "t": "Verlängerung von White Card oder Ticket",
        "d": "Die Verlängerung einer Karte oder eines Tickets, das du schon hast, während du bereits auf der Baustelle bist, ist absetzbar. Deine allererste White Card nicht, weil dich diese Kosten überhaupt erst für Bauarbeit qualifiziert haben. Dasselbe gilt für ein erstes Stapler- oder Hubarbeitsbühnenticket."
      },
      {
        "t": "Arbeitsanteil an Handy und Internet",
        "d": "Wenn du mit deinem eigenen Handy den Vorarbeiter anrufst, Pläne prüfst oder Schichtnachrichten bekommst, ist der arbeitsbezogene Prozentsatz absetzbar. Die ganze Rechnung bei einem Handy, auf dem auch dein Leben stattfindet, hält nicht stand."
      },
      {
        "t": "Weiterbildung im Gewerk, in dem du schon arbeitest",
        "d": "Ein Kurs, der eine Fähigkeit oder ein Ticket verbessert, das du jetzt nutzt, ist absetzbar. Ein Kurs, der dich in einen anderen Beruf bringen soll, ist es nicht, auch wenn er mit Bau zu tun hat, weil er eine neue Qualifikation aufbaut statt die zu erhalten, die heute dein Einkommen verdient."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was muss hinter einem Werkzeugabzug stehen?",
    "paras": [
      "Jeder Abzug muss drei Tests bestehen. Du hast selbst bezahlt, dir wurde nichts erstattet, und es diente dazu, das Einkommen zu verdienen, das du angibst. Auf der Baustelle heißt das: der Beleg für die Bohrmaschine, die Stiefel und die Ticketverlängerung.",
      "Der Nachweis kann ein Beleg, eine Rechnung, ein Kontoauszug oder ein Handyfoto sein, mit Betrag, Datum, Anbieter und Gegenstand, fünf Jahre aufbewahrt. Liegen alle Abzüge des Jahres bei 300 Dollar oder weniger, brauchst du gar keinen schriftlichen Nachweis. Das ist nicht die 300-Dollar-Grenze, die entscheidet, ob eine Säge sofort oder über die Nutzungsdauer abgeschrieben wird."
    ]
  },
  {
    "kind": "numbered",
    "h2": "Wann zählt die Fahrt zur Baustelle?",
    "intro": "Von zu Hause zu einem festen Arbeitsplatz ist privat, und eine Baustelle ist ein Arbeitsplatz. Es gibt eine enge Ausnahme für sperriges Werkzeug, und alle drei Punkte müssen gleichzeitig zutreffen.",
    "steps": [
      "Das Werkzeug ist für die Arbeit an diesem Tag zwingend nötig.",
      "Es ist wirklich sperrig, das heißt Größe oder Gewicht sind der eigentliche Grund für das Fahrzeug, nicht bloße Bequemlichkeit.",
      "Es gibt auf der Baustelle keinen sicheren Ort dafür, es muss also mit nach Hause."
    ],
    "note": "Gibt es auf der Baustelle einen abschließbaren Container, Schuppen oder Käfig, oder passt dein Werkzeug in eine normale Tasche, bleibt die Fahrt ein normaler Arbeitsweg. Und falls du die Ausnahme erfüllst: Utes und Kastenwagen mit einer Nutzlast ab einer Tonne dürfen die Kilometerpauschale gar nicht nutzen, also bleibt für die meisten nur das Fahrtenbuch."
  },
  {
    "kind": "traps",
    "h2": "Was machen Bauarbeiter falsch?",
    "intro": "Die zu Unrecht angesetzten Posten drehen sich meist um Kleidung und den Ute. Die übersehenen sind Belege, die niemand aufgehoben hat, für Dinge, die klar absetzbar waren.",
    "wrong": [
      {
        "t": "Normale Kleidung, die die Baustelle zerlegt",
        "d": "Jeans, T-Shirt, Flanellhemd, Hoodie. Normaler Verschleiß an Alltagskleidung ist eine private Ausgabe. Das Teil muss dich schützen, nicht bloß den Tag überstehen."
      },
      {
        "t": "Deine erste White Card",
        "d": "Die Karte, die du bezahlt hast, bevor dich jemand einstellen wollte, sind die Kosten dafür, für den Beruf überhaupt in Frage zu kommen, und die behandelt das ATO wie den ersten Führerschein. Die Verlängerung, während du arbeitest, ist absetzbar."
      },
      {
        "t": "Den Ute pauschal",
        "d": "Einen Ute zu besitzen und damit zur Baustelle zu fahren ist kein Abzug. Alle drei Bedingungen für sperriges Werkzeug müssen erfüllt sein, und auf den meisten Baustellen sind sie es nicht, weil es dort abschließbaren Stauraum gibt."
      },
      {
        "t": "Werkzeug, das der Arbeitgeber gestellt oder bezahlt hat",
        "d": "Kam es vom Lkw, aus dem Baucontainer, oder wurde es dir erstattet, sind dir keine Kosten geblieben."
      },
      {
        "t": "Ein Kurs für ein anderes Gewerk",
        "d": "Eine Ausbildung, die dich in einen neuen Beruf bringen würde, ist nicht absetzbar, so eindeutig sie auch mit Bau zu tun hat."
      }
    ],
    "missed": [
      {
        "t": "Kleines Werkzeug, Stück für Stück",
        "d": "Viele meinen, es gäbe eine Schwelle, ab der sich Werkzeug lohnt. Gibt es nicht. Zwölf Käufe zu 40 Dollar sind 480 Dollar Abzug, und jeder wird einzeln an der 300-Dollar-Grenze gemessen."
      },
      {
        "t": "Alles über 300 Dollar, komplett gestrichen",
        "d": "Erstaunlich viele hören \"über 300\" und schließen daraus, dass das Werkzeug gar nicht absetzbar ist. Es ist absetzbar, über die Nutzungsdauer. Es wegzulassen kostet den ganzen Abzug statt nur einen Teil zu verschieben."
      },
      {
        "t": "Sonnencreme und Hut auf einer Außenbaustelle",
        "d": "Für Arbeit im Freien anerkannt und von Bauleuten fast nie angesetzt, weil Sonnenschutz für sie nach Farmarbeit klingt. Eine unbeschattete Platte im Februar ist dieselbe Belastung."
      },
      {
        "t": "Waschen von Warnschutz- und Schutzkleidung",
        "d": "Das Waschen absetzbarer Schutzkleidung ist selbst absetzbar, zum ATO-Satz von 1 Dollar pro reinem Arbeitswaschgang oder 50 Cent gemischt. Ab 150 Dollar im Jahr führst du ein einfaches Tagebuch."
      },
      {
        "t": "Selbst bezahlte Ticketverlängerungen",
        "d": "Eine White Card, ein Staplerschein oder eine Hubarbeitsbühnen-Verlängerung ist bis Juli schnell vergessen, gerade wenn sie samstagmorgens bar bezahlt wurde."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Welche Teile hängen an deinen eigenen Fakten?",
    "paras": [
      "Zuerst die Ausnahme für sperriges Werkzeug. Was du transportierst, was die Baustelle an Stauraum bietet und ob das Werkzeug an diesem Tag nötig war, gibt den Ausschlag. Zwei Helfer derselben Crew können unterschiedlich dastehen.",
      "Der steuerliche Wohnsitz ist mehr wert als alles Werkzeug auf der Liste. Britische, deutsche und japanische Passinhaber, die steuerlich in Australien ansässig waren, können nach der Addy-Entscheidung den vollen Steuerfreibetrag tragen. Das hängt von deinen eigenen Umständen ab und muss ordentlich geprüft werden."
    ]
  }
]

const FAQS = [
  {
    "question": "Kann ich meine erste White Card absetzen?",
    "answer": "Nein. Das ATO behandelt die erste White Card wie den ersten Führerschein, als Kosten dafür, für die Arbeit überhaupt in Frage zu kommen, und nicht als Kosten der Arbeit.\n\nSobald du auf der Baustelle arbeitest und die Karte zum Weiterarbeiten verlängert werden muss, ist die Verlängerung absetzbar. Dasselbe gilt für ein erstes Staplerticket oder eine Fahrerlaubnis für schwere Fahrzeuge."
  },
  {
    "question": "Welches Werkzeug kann ich als Bauarbeiter absetzen?",
    "answer": "Jedes Werkzeug und jede Ausrüstung, die du selbst für die Baustelle gekauft hast, sofern dein Arbeitgeber sie weder gestellt noch erstattet hat.\n\nGegenstände bis 300 Dollar pro Stück werden im Kaufjahr voll abgesetzt. Ab 300 Dollar setzt du sie ebenfalls ab, aber über die Nutzungsdauer verteilt. Kaufst du mehrere Werkzeuge zusammen als Set ab 300 Dollar, gilt das ganze Set als ein Gegenstand."
  },
  {
    "question": "Kann ich meinen Ute für die Fahrt zur Baustelle absetzen?",
    "answer": "Nur in einem engen Fall. Die Fahrt von zu Hause zu einem festen Arbeitsplatz ist privat, und daran ändert sich nichts, weil der Arbeitsplatz eine Baustelle ist.\n\nDie Fahrt wird nur absetzbar, wenn das Werkzeug an diesem Tag nötig, wirklich sperrig und auf der Baustelle nicht sicher zu lagern ist. Da die meisten Utes und Kastenwagen eine Tonne oder mehr tragen, ist die Kilometerpauschale für sie ausgeschlossen und nur das Fahrtenbuch bleibt."
  },
  {
    "question": "Sind Stahlkappen und Warnschutzkleidung absetzbar?",
    "answer": "Ja. Schutzartikel wie Sicherheitsschuhe mit Stahlkappe, Warnschutzhemden und -westen, Schutzbrillen, Helme, Gehörschutz und Arbeitshandschuhe sind absetzbar, weil sie dich vor einer konkreten Verletzungsgefahr schützen, und genau das prüft das ATO.\n\nSonnenschutz für Außenarbeit gilt auf derselben Grundlage, und das Waschen der Schutzkleidung ebenfalls."
  },
  {
    "question": "Meine Klamotten gehen auf der Baustelle kaputt. Warum kann ich sie nicht absetzen?",
    "answer": "Weil das ATO den Gegenstand prüft und nicht, was mit ihm passiert ist. Jeans, T-Shirt oder Flanellhemd sind Alltagskleidung, und normaler Verschleiß daran ist privat, so schnell die Arbeit sie auch ruiniert.\n\nAbsetzbar wird ein Teil erst mit einer echten Schutzfunktion, wie die Schutzausrüstung oben, oder als vorgeschriebene Uniform mit Logo."
  }
]

const GUIDES = [
  {
    "href": "/de/blog/white-card-australia-working-holiday",
    "label": "Die White Card und was sie dich kostet",
    "desc": "Wie du sie bekommst und warum die erste kein Abzug ist."
  },
  {
    "href": "/de/blog/tools-equipment-under-300-instant-deduction-whv",
    "label": "Die 300-Dollar-Sofortabschreibung für Werkzeug und Ausrüstung",
    "desc": "Warum jedes Teil einzeln geprüft wird und was ein Set daran ändert."
  },
  {
    "href": "/de/blog/construction-laborer-working-holiday-australia",
    "label": "Bauhelfer mit Working-Holiday-Visum",
    "desc": "Was die Arbeit zahlt und was eine Baustelle von dir erwartet."
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
        path: '/de/expenses/construction',
        articleHeadline: "Bau in Australien: Werkzeug, Schutzausrüstung, Ute",
        articleDescription: "Werkzeug, Schutzausrüstung und die White-Card-Verlängerung sind absetzbar. Die erste White Card und die kaputte Jeans nicht.",
        inLanguage: "de-DE",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
