import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

export const metadata: Metadata = {
  "title": "Gastronomie: Schuhe, Kochjacke, Wäsche",
  "description": "RSA-Verlängerung, rutschfeste Schuhe, Kochjacke und Uniformwäsche. Dazu, warum das schwarze Outfit keine Uniform ist und was Trinkgeld bedeutet.",
  "keywords": [
    "Gastronomie Steuerabzüge Australien",
    "Kellner absetzen Australien",
    "Barkeeper Steuer Australien",
    "Koch Steuerabzüge Australien",
    "RSA Zertifikat absetzbar",
    "Arbeitsschuhe absetzen ATO",
    "Trinkgeld steuerpflichtig Australien",
    "Working Holiday Gastronomie Steuer"
  ],
  "alternates": {
    "canonical": "/de/expenses/hospitality",
    "languages": {
      "en-AU": "/expenses/hospitality",
      "de": "/de/expenses/hospitality",
      "ja": "/ja/expenses/hospitality",
      "x-default": "/expenses/hospitality"
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
    "url": `${SITE_URL}/de/expenses/hospitality`,
    "siteName": "Working Holiday Tax",
    "title": "Gastronomie in Australien: was du absetzen kannst",
    "description": "Rutschfeste Schuhe und Kochjacke sind absetzbar. Das schwarze Outfit, auf dem dein Betrieb besteht, nicht."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Gastronomie in Australien: was du absetzen kannst",
    "description": "Rutschfeste Schuhe und Kochjacke sind absetzbar. Das schwarze Outfit, auf dem dein Betrieb besteht, nicht."
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

const WA = waUrl({ topic: 'expenses', lang: "de", detail: "Gastronomie, Bar und Küche" })

const UI = {
  "ctaLabel": "Schreib uns auf WhatsApp",
  "ctaSub": "Antwort in etwa einer Stunde.",
  "guaranteeHeading": "Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also für unseren Service nie drauf.",
  "guaranteeBody": "Vier Betriebe, vier Income Statements und Super in vier Fonds ist hier das übliche Gastro-Jahr, und jeder Kunde ist auf einem 417 oder 462. Von einem registrierten Steueragenten geprüft und freigegeben, bevor es beim ATO eingereicht wird.",
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
    "name": "Gastronomie",
    "item": "/de/expenses/hospitality"
  }
]

const HERO = {
  "kicker": "Bars, Cafes, Restaurants und Küchen",
  "h1lead": "Deine rutschfesten Schuhe sind absetzbar.",
  "h1accent": "Das schwarze Outfit nicht.",
  "lede": "Die Liste ist kurz, deshalb liegt das Geld einer Gastro-Erklärung meistens auf der Einkommensseite: mehrere Betriebe, mehrere Einbehaltssätze, Super in mehreren Fonds."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Was können Bar-, Cafe- und Küchenkräfte absetzen?",
    "paras": [
      "Absetzbar sind rutschfeste Schutzschuhe, berufsspezifische Kleidung wie Kochjacke und Karohose, das Waschen einer Pflichtuniform mit Arbeitgeberlogo, die Verlängerung eines RSA- oder Food-Safety-Supervisor-Zertifikats und selbst gekauftes Küchenwerkzeug. Alles andere im Schrank ist normale Kleidung.",
      "Die Gastronomie gibt dir sehr wenig, das nur zu diesem Job gehört. Du bist drinnen, dein Arbeitgeber stellt die Ausrüstung, und die Kleidung, die ein Betrieb verlangt, könnte meist jeder überall tragen."
    ]
  },
  {
    "kind": "items",
    "h2": "Die Abzüge, die zu dieser Arbeit gehören",
    "intro": "Bei Kleidung kommt zu den allgemeinen Tests ein zusätzlicher dazu, und dort entsteht fast jeder Streit in der Gastronomie.",
    "items": [
      {
        "t": "Rutschfeste, geschlossene Schutzschuhe",
        "d": "Absetzbar, wenn du sie brauchst: nasser Boden hinter der Bar, Spritzer an der Kaffeemaschine, heiße Teller quer durch den Pass. Sie gelten als Schutzschuhe und nicht als normale Schuhe, weil sie eine konkrete Sicherheitsaufgabe erfüllen, welche Farbe sie auch haben."
      },
      {
        "t": "Kochjacke und karierte Kochhose",
        "d": "Berufsspezifische Kleidung, also Kleidung, die dich als Angehörigen eines bestimmten Berufs erkennbar macht und überall sonst absurd aussähe. Das ist eine eigene anerkannte Kategorie, getrennt von der Uniform mit Logo, und genau deshalb bekommt ein Koch einen Kleidungsabzug und ein Kellner meistens nicht."
      },
      {
        "t": "Waschen einer Pflichtuniform mit Logo",
        "d": "Verlangt dein Arbeitgeber eine Uniform mit Logo oder wirklich unverwechselbarem Design, ist das Waschen absetzbar: 1 Dollar pro Waschgang, wenn nur Arbeitskleidung drin ist, oder 50 Cent, wenn du sie mit allem anderen wäschst. Über 150 Dollar Wäschekosten im Jahr brauchst du ein einfaches Tagebuch statt einer Schätzung."
      },
      {
        "t": "Verlängerung von RSA oder Food Safety Supervisor",
        "d": "Die Verlängerung eines Zertifikats, das du schon hast, ist absetzbar, das erste nicht. Das gilt für RSA und Food Safety Supervisor gleichermaßen."
      },
      {
        "t": "Selbst gekaufte Messer und Küchenwerkzeuge",
        "d": "Messerrolle, eigene Kochmesser, Thermometer, Mandoline. Jeder Gegenstand bis 300 Dollar wird im Kaufjahr voll abgesetzt. Ein gemeinsam gekauftes Set ab 300 Dollar gilt als ein Gegenstand und wird über die Nutzungsdauer verteilt, auch wenn jedes einzelne Teil darunter gelegen hätte."
      },
      {
        "t": "Schürzen, Handschuhe und Schutzausrüstung",
        "d": "Hitzebeständige Handschuhe, schnittfeste Handschuhe, Schutzschürze. Absetzbar, wenn sie dich vor einer Gefahr des Jobs schützen und dein Arbeitgeber sie weder gestellt noch erstattet hat."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was muss hinter einem Abzug in der Gastronomie stehen?",
    "paras": [
      "Dieselben drei Tests wie überall: das Geld war deins, niemand hat es dir erstattet, und es diente dazu, das Einkommen zu verdienen, das du angibst. Im Betrieb heißt das der Beleg für die Schuhe und die Messerrolle, die schriftliche Uniformregel und ein Wäschetagebuch, sobald sich die Waschgänge summieren.",
      "Jeder Nachweis mit Betrag, Datum, Anbieter und Gegenstand tut es, und er muss fünf Jahre überstehen. Ein Jahr mit Abzügen von zusammen 300 Dollar oder weniger braucht gar keinen schriftlichen Nachweis. Das sind nicht die 300 Dollar, die entscheiden, ob ein Messerset sofort oder über die Nutzungsdauer abgeschrieben wird."
    ]
  },
  {
    "kind": "traps",
    "h2": "Was macht Gastro-Personal falsch?",
    "intro": "Die Kleidungsregel erwischt alle, weil sie sich unfair anfühlt. Die übersehenen Abzüge sind leiser und drehen sich meist um die Bezahlung statt um Ausgaben.",
    "wrong": [
      {
        "t": "Das komplett schwarze Outfit, das der Betrieb verlangt",
        "d": "Schlichte schwarze Hose, schlichtes schwarzes Hemd, schlichte schwarze Schuhe ohne Logo. Das ATO schaut auf den Gegenstand, und Alltagskleidung, die jeder überall tragen könnte, ist privat, was der Dresscode auch sagt."
      },
      {
        "t": "Deine erste RSA",
        "d": "Das Zertifikat, das du vor dem Job bezahlt hast, hat dich einstellbar gemacht, und das ist eine private Kost. Sobald du arbeitest, ist die Verlängerung absetzbar."
      },
      {
        "t": "Friseur, Pflege und Make-up für den Standard im Service",
        "d": "Körperpflege bleibt privat, auch wenn ein Betrieb dafür schriftliche Vorgaben hat."
      },
      {
        "t": "Das Essen in der Schicht oder das Feierabendbier",
        "d": "Personalessen und Getränke danach sind privat, ob du bezahlt hast, Rabatt bekommen hast oder es geschenkt bekommen hast."
      },
      {
        "t": "Bar-Trinkgeld, das nicht in der Erklärung steht",
        "d": "Das läuft in die andere Richtung. Trinkgeld, das dir direkt in die Hand gegeben wird, ist steuerpflichtiges Einkommen, auch wenn es niemand erfasst. Gepooltes Trinkgeld und Servicezuschläge über die Lohnabrechnung stehen schon im Income Statement, aber Bargeld musst du selbst angeben."
      }
    ],
    "missed": [
      {
        "t": "Uniformwäsche, das ganze Jahr",
        "d": "Ein paar Dollar pro Woche, die fast niemand ansetzt, weil ein gewaschenes Hemd nicht nach Steuersache klingt. Das ATO veröffentlicht den Satz, da muss nichts geschätzt werden."
      },
      {
        "t": "Die rutschfesten Schuhe, weil \"Kleidung geht ja nicht\"",
        "d": "Leute lesen völlig richtig, dass Gastro-Kleidung nicht absetzbar ist, und übertragen das dann falsch auf Schutzschuhe. Schutzschuhe sind eine eigene Kategorie und absetzbar."
      },
      {
        "t": "Ein zweiter oder dritter Arbeitgeber mit falschem Einbehalt",
        "d": "Hat ein Betrieb deine Tax File Number Declaration nie bekommen oder ist er nicht als Arbeitgeber von Working Holiday Makern registriert, behält er weit mehr als 15 Prozent ein. Nichts davon ist verloren, aber es kommt nur mit einer Erklärung zurück, die alle Arbeitgeber zusammenführt."
      },
      {
        "t": "Superannuation in drei verschiedenen Fonds",
        "d": "Jeder Betrieb zahlt ab dem ersten Dollar 12 Prozent Super zusätzlich zum Lohn, ohne monatliche Mindestgrenze. Bei vier Casual-Jobs endest du mit vier Konten, jedes mit eigenen Gebühren, und die meisten finden nur eines davon wieder."
      },
      {
        "t": "Ein Betrieb, der dir die Uniform unrechtmäßig vom Lohn abgezogen hat",
        "d": "Kein Abzug. Lohnabzüge für Uniformen, Wäsche, Bruch oder Kassendifferenzen sind nach dem Fair Work Act fast immer rechtswidrig, und das ist Geld zurück, keine Steuersache."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was muss beurteilt statt nachgeschlagen werden?",
    "paras": [
      "Zuerst die Kleidungsfrage. Ob ein Teil eine Pflichtuniform ist, hängt daran, wie unverwechselbar es ist und ob der Arbeitgeber es verlangt. Ob Schuhe Schutzschuhe sind, hängt an der Gefahr in deinem Betrieb. Eine schriftliche Uniformregel und ein Foto klären das meistens.",
      "Auf der Einnahmenseite zahlt sich ein fachlicher Blick aus. Working Holiday Maker bekommen keinen Steuerfreibetrag, ein Betrieb, der so einbehält, als hättest du einen, behält also zu wenig ein und hinterlässt eine Nachzahlung. Das kippt, wenn die Addy-Entscheidung für dich gilt, was bei britischen, deutschen und japanischen Pässen möglich ist, sofern du steuerlich in Australien ansässig warst. Das hängt von deinen eigenen Umständen ab und muss ordentlich geprüft werden."
    ]
  }
]

const FAQS = [
  {
    "question": "Kann ich meine schwarzen Arbeitsschuhe und die Hose absetzen?",
    "answer": "Schlichte schwarze Kleidung ohne Logo ist nicht absetzbar, auch wenn der Dresscode des Betriebs sie vorschreibt, weil das ATO sie als gewöhnliche Kleidung und nicht als Uniform behandelt.\n\nRutschfeste geschlossene Schuhe sind etwas anderes: Wenn du sie für einen nassen Boden hinter der Bar oder einen vollen Küchenpass brauchst, gelten sie als Schutzschuhe und sind unabhängig von der Farbe absetzbar."
  },
  {
    "question": "Kann ich mein RSA-Zertifikat absetzen?",
    "answer": "Die Verlängerung ja, das erste Zertifikat nein. Sobald du in einer Rolle arbeitest, die eine RSA verlangt, ist ihre Verlängerung eine Kost der Arbeit. Das erste Zertifikat hat dich erst für die Stelle qualifiziert, und das behandelt das ATO als privat.\n\nFür den Food Safety Supervisor gilt dieselbe Grenze."
  },
  {
    "question": "Ist mein Trinkgeld steuerpflichtig?",
    "answer": "Ja, alles davon. Trinkgeld und Servicezuschläge, die über die Lohnabrechnung ausgezahlt werden, auch aus einem Pool oder Tronc, sind Teil deines Lohns, schon versteuert und schon im Income Statement.\n\nBargeld, das dir direkt gegeben wird, ist genauso steuerpflichtig, wird aber von niemandem erfasst. Führ eine laufende Notiz und gib die Summe an."
  },
  {
    "question": "Ich arbeite in drei Betrieben. Ändert das etwas an meiner Steuer?",
    "answer": "Jeder Betrieb ist ein eigener Arbeitgeber mit eigener Tax File Number Declaration, eigenem Einbehalt und eigenem Income Statement, und jeder davon gehört in dieselbe Erklärung.\n\nWorking Holiday Maker bekommen von keinem Arbeitgeber einen Steuerfreibetrag, ein Betrieb, der so einbehält, als hättest du einen, hinterlässt also eine Nachzahlung."
  },
  {
    "question": "Bekomme ich Superannuation in einem Casual-Job?",
    "answer": "Ja. Dein Arbeitgeber zahlt für Casual-Arbeit ab dem ersten Dollar 12 Prozent Super zusätzlich zum Lohn, ohne monatliche Mindestverdienstgrenze.\n\nJeder Betrieb zahlt unabhängig, bei mehreren Jobs verteilt sich das also meist auf mehrere Fonds, die du vor der Abreise aufspüren solltest."
  }
]

const GUIDES = [
  {
    "href": "/de/blog/hospitality-award-working-holiday-makers",
    "label": "Der Hospitality Award und was dir zusteht",
    "desc": "Casual Loading, Zuschläge und wo Betriebe es falsch machen."
  },
  {
    "href": "/de/blog/uniform-laundry-deductions-illegal-australia",
    "label": "Uniform- und Wäschekosten vom Lohn abgezogen",
    "desc": "Wann ein Lohnabzug rechtswidrig ist und wie du das Geld zurückholst."
  },
  {
    "href": "/de/blog/tax-deductions-working-holiday-makers",
    "label": "Absetzbare Kosten für Working Holiday Maker: die vollständige Liste",
    "desc": "Alle Kategorien, und was das ATO ablehnt."
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
        path: '/de/expenses/hospitality',
        articleHeadline: "Gastronomie in Australien: was du absetzen kannst",
        articleDescription: "Rutschfeste Schuhe und Kochjacke sind absetzbar. Das schwarze Outfit, auf dem dein Betrieb besteht, nicht.",
        inLanguage: "de-DE",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
