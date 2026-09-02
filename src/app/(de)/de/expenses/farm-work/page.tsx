import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { JobExpensesPage, type Section } from '@/components/expenses/JobExpensesPage'

export const metadata: Metadata = {
  "title": "Farmarbeit: Sonnenschutz und Fahrten",
  "description": "Sonnenschutz, Pflückausrüstung, Schutzschuhe und Fahrten zwischen Blöcken. Dazu die Abzüge, die abgelehnt werden, und die, an die niemand denkt.",
  "keywords": [
    "Farmarbeit Steuerabzüge Australien",
    "Fruit Picking Steuererklärung",
    "Backpacker Farmarbeit Steuer",
    "Sonnenschutz absetzbar ATO",
    "Fahrten zwischen Farmen absetzen",
    "Akkordlohn Steuer Australien",
    "417 zweites Visum Farmarbeit",
    "Saisonarbeit Abzüge Australien"
  ],
  "alternates": {
    "canonical": "/de/expenses/farm-work",
    "languages": {
      "en-AU": "/expenses/farm-work",
      "de": "/de/expenses/farm-work",
      "ja": "/ja/expenses/farm-work",
      "x-default": "/expenses/farm-work"
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
    "url": `${SITE_URL}/de/expenses/farm-work`,
    "siteName": "Working Holiday Tax",
    "title": "Farmarbeit und Fruit Picking: was du absetzen kannst",
    "description": "Sonnencreme ist absetzbar. Deine Jeans und die Hostelmiete nie. Was Farmarbeit wirklich absetzt."
  },
  "twitter": {
    "images": [
      `${SITE_URL}/og-image.png`
    ],
    "card": "summary_large_image",
    "title": "Farmarbeit und Fruit Picking: was du absetzen kannst",
    "description": "Sonnencreme ist absetzbar. Deine Jeans und die Hostelmiete nie. Was Farmarbeit wirklich absetzt."
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

const WA = waUrl({ topic: 'expenses', lang: "de", detail: "Farmarbeit und Fruit Picking" })

const UI = {
  "ctaLabel": "Schreib uns auf WhatsApp",
  "ctaSub": "Antwort in etwa einer Stunde.",
  "guaranteeHeading": "Wir beginnen mit einem Tax Assessment, das deine gesamte Situation prüft und dir dein voraussichtliches Steuerergebnis zeigt, damit du genau weißt, wo du stehst, bevor du entscheidest, ob du abgeben möchtest.",
  "guaranteeBody": "Eine Saison aus kurzen Farmjobs, mehreren Contractors und einer Erklärung entwirren wir jede Woche, für Leute auf 417 und 462 und sonst niemanden. Von einem registrierten Steueragenten geprüft und freigegeben, bevor es beim ATO eingereicht wird.",
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
    "name": "Farmarbeit",
    "item": "/de/expenses/farm-work"
  }
]

const HERO = {
  "kicker": "Farmen, Plantagen und Packhallen",
  "h1lead": "Sonnencreme ist ein Abzug.",
  "h1accent": "Deine Jeans war es nie.",
  "lede": "Die Abzugsliste fürs Pflücken, Schneiden und Packen umfasst etwa sechs Posten. Wichtiger ist, jeden kurzen Job der Saison in dieselbe Erklärung zu bekommen."
}

const SECTIONS: Section[] = [
  {
    "kind": "answer",
    "h2": "Was können Fruit Picker und Farmarbeiter absetzen?",
    "paras": [
      "Absetzbar sind Sonnenschutz für Arbeit im Freien, Schutzhandschuhe und Schutzschuhe, selbst gekaufte Pflückausrüstung und die Fahrt zwischen zwei Farmen oder Blöcken am selben Arbeitstag. Für alles gilt: du hast selbst bezahlt, nichts erstattet bekommen und kannst es belegen.",
      "Sonnencreme ist für fast jeden in Australien privat. Bei dir ist sie absetzbar, weil dich der Job stundenlang in die direkte Sonne stellt, und das ATO sieht darin eine arbeitsbedingte Belastung."
    ]
  },
  {
    "kind": "items",
    "h2": "Die Abzüge, die zu dieser Arbeit gehören",
    "intro": "An jedem hängt eine Bedingung, und die Bedingung ist das, was den Abzug überstehen lässt.",
    "items": [
      {
        "t": "Sonnenschutz: Sonnencreme, Hut mit breiter Krempe, Sonnenbrille",
        "d": "Absetzbar, wenn dich die Arbeit der Sonne aussetzt, also beim Pflücken, Schneiden, Ausdünnen und beim Packen in einer offenen Halle. Du setzt nur den Anteil ab, den du für die Arbeit verbraucht hast."
      },
      {
        "t": "Schutzhandschuhe, Gummistiefel und Sicherheitsschuhe",
        "d": "Pflückhandschuhe, Regenstiefel, Stahlkappen für die Halle. Sie zählen, weil sie dich vor einer konkreten Gefahr der Arbeit schützen: Dornen, Harz, Chemikalien, herunterfallende Kisten. Normale robuste Schuhe zählen nicht."
      },
      {
        "t": "Selbst gekaufte Pflückausrüstung",
        "d": "Gartenschere, Schnippschere, Pflücktasche oder Eimergeschirr, Stirnlampe für den frühen Start, Knieschoner. Jeder Gegenstand bis 300 Dollar wird im Kaufjahr voll abgesetzt. Darüber setzt du ihn ebenfalls ab, nur verteilt über die Nutzungsdauer."
      },
      {
        "t": "Fahrten zwischen Farmen oder Blöcken am selben Tag",
        "d": "Der Wechsel von einem Grundstück, Block oder Schuppen zum nächsten, nachdem dein Arbeitstag begonnen hat, ist absetzbare Fahrt. Berechnet wird sie mit der Kilometerpauschale oder einem Fahrtenbuch. Die erste Fahrt des Tages gehört nicht dazu."
      },
      {
        "t": "Schutzkleidung mit echter Funktion",
        "d": "Regenkleidung für Arbeit bei Nässe, chemikalienbeständige Overalls beim Spritzen, eine Staubmaske in der Packhalle. Der Test ist, ob das Teil dich vor etwas schützt, das die Arbeit dir antut. Ein Flanellhemd, das warm hält, nicht."
      },
      {
        "t": "Der Arbeitsanteil deines Handys",
        "d": "Klein, aber real, wenn du dein eigenes Handy für den Job nutzt, etwa um Schichtzeiten vom Contractor zu bekommen. Du setzt den arbeitsbezogenen Prozentsatz auf einer nachvollziehbaren Grundlage ab, nicht die ganze Rechnung."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was musst du aus einer Saison aufheben?",
    "paras": [
      "Nichts ist absetzbar, solange nicht drei Dinge stimmen: das Geld war deins, niemand hat es dir zurückgegeben, und es diente dazu, das Einkommen zu verdienen, das in der Erklärung steht. In einer Saison sind das der Roadhouse-Beleg für die Sonnencreme, der Kassenzettel für Handschuhe und Schere und eine Notiz zu Daten und Kilometern, wann immer ein Contractor dich zwischen Blöcken bewegt hat.",
      "Ein Beleg, eine Rechnung, ein Kontoauszug oder ein Handyfoto mit Betrag, Datum, Anbieter und Gegenstand zählt jeweils, und alles davon muss fünf Jahre halten. Liegen deine Abzüge im ganzen Jahr bei 300 Dollar oder weniger, brauchst du keinen schriftlichen Nachweis. Das sind nicht dieselben 300 Dollar, die entscheiden, ob ein einzelner Gegenstand sofort oder über die Nutzungsdauer abgeschrieben wird."
    ]
  },
  {
    "kind": "traps",
    "h2": "Was machen Farmarbeiter falsch?",
    "intro": "Zuerst die Abzüge, die Saisonarbeiter jedes Jahr ansetzen und nicht belegen können. Dann das Geld, das liegen bleibt, weil es niemand erwähnt hat.",
    "wrong": [
      {
        "t": "Normale Kleidung, die der Job zerstört",
        "d": "Jeans, T-Shirts, Flanellhemd, Pulli für den Start um fünf. Das ATO prüft den Gegenstand, nicht die Absicht, und Alltagskleidung bleibt privat, egal wie schnell die Fruchtflecken sie erledigen."
      },
      {
        "t": "Hostelmiete und Kaution im Working Hostel",
        "d": "Wo du in der Saison geschlafen hast, ist eine Lebenshaltungskost, keine Arbeitskost, auch wenn das Hostel die einzige Unterkunft weit und breit war und die Farm sie organisiert hat."
      },
      {
        "t": "Essen und Trinken tagsüber",
        "d": "Mittagessen auf der Farm ist dasselbe wie Mittagessen woanders. Mahlzeiten werden nur absetzbar, wenn dein Arbeitgeber eine Reise verlangt, bei der du über Nacht von zu Hause weg bist, und die Erntesaison erfüllt das normalerweise nicht."
      },
      {
        "t": "Die Fahrt vom Hostel zur Farm",
        "d": "Das ist der Arbeitsweg, und er bleibt es, ob du fünfzig Kilometer Schotterpiste fährst oder zu Fuß gehst. Absetzbar ist nur die Bewegung zwischen Einsatzorten, nachdem der Tag begonnen hat."
      },
      {
        "t": "Die Anreise in die Region",
        "d": "Der Flug oder die Fahrt nach Bundaberg, Mildura oder Tully, um dort Arbeit zu suchen, bringt dich erst dorthin, wo der Job ist, und ist keine Kost des Verdienens."
      }
    ],
    "missed": [
      {
        "t": "Sonnencreme, Hut und Sonnenbrille",
        "d": "Der am häufigsten übersehene Abzug in der Farmarbeit. Kaum jemand hebt den Beleg für eine 19-Dollar-Flasche Sonnencreme von der Tankstelle auf, und über eine Saison ist das keine kleine Summe."
      },
      {
        "t": "Jedes Paar Handschuhe einzeln",
        "d": "Pflückhandschuhe sind Verbrauchsmaterial. Sechs Paar in einer Saison sind sechs absetzbare Käufe, nicht einer, und jeder wird einzeln an der 300-Dollar-Grenze gemessen."
      },
      {
        "t": "Fahrten zwischen Blöcken am selben Tag",
        "d": "Auf größeren Betrieben und bei Contractors, die eine Crew herumschicken, sehr üblich, und fast nie abgesetzt, weil es sich nicht wie eine Fahrt anfühlt. Notiere Datum und Kilometer laufend."
      },
      {
        "t": "Ein Farmjob über drei Wochen, den niemand mehr auf dem Schirm hatte",
        "d": "Ein kurzer Einsatz, hastig über einen Contractor ausgezahlt, fehlt schnell in der Erklärung, und fehlendes Einkommen ist schlimmer als ein vergessener Abzug."
      },
      {
        "t": "Einbehalt über 15 Prozent bei einem nicht registrierten Arbeitgeber",
        "d": "Ein beim ATO als Arbeitgeber von Working Holiday Makern registrierter Betrieb behält ab dem ersten Dollar 15 Prozent ein. Ein nicht registrierter muss zum Satz für ausländische Steuerpflichtige einbehalten, der über 30 Prozent beginnt. Die Differenz kommt mit der Steuererklärung zurück, und nur dann."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was hängt daran, wie deine Saison aufgebaut war?",
    "paras": [
      "Ob deine Fahrten als wechselnde Einsatzorte statt als Arbeitsweg gelten, ist eine Tatsachenfrage. Wer von einem Contractor ohne feste Basis zwischen drei Betrieben geschickt wird, steht anders da als jemand, der elf Wochen zur selben Plantage gefahren ist. Wie oft der Ort wechselte, ob der Job das Reisen verlangte und ob es einen festen Arbeitsplatz gab, entscheidet das.",
      "Der steuerliche Wohnsitz ist größer. Er ist eine Beurteilung, keine Formel, und der Fall Addy vor dem High Court zeigt, wie viel daran hängen kann. Wir legen uns erst fest, nachdem wir dein Jahr durchgegangen sind.",
      "Farmarbeit zahlt außerdem auf ein weiteres Visum ein, und dieser Teil ist Einwanderungsrecht, kein Steuerrecht. Welche Branchen, Postleitzahlen und Zeiträume zählen, legt das Department of Home Affairs fest, und die Regeln haben sich mehr als einmal geändert. Prüf die aktuellen offiziellen Angaben oder frag einen registrierten Migration Agent, bevor du dich darauf verlässt, dass ein Job zählt."
    ]
  }
]

const FAQS = [
  {
    "question": "Kann ich Sonnencreme und einen Hut absetzen?",
    "answer": "Ja, wenn dich die Arbeit in die Sonne stellt, und Farmarbeit tut das normalerweise. Das ATO akzeptiert Sonnenschutz als Arbeitskost für Menschen, die im Freien arbeiten, weil die Belastung aus dem Job kommt.\n\nBelege aufheben und nur den beruflichen Anteil ansetzen."
  },
  {
    "question": "Ich war auf drei Farmen. Sind das drei Steuererklärungen?",
    "answer": "Nein. Eine Erklärung deckt das ganze Steuerjahr vom 1. Juli bis 30. Juni ab, egal wie viele Farmen, Contractors oder Zeitarbeitsfirmen dich bezahlt haben. Jeder Arbeitgeber meldet Lohn und einbehaltene Steuer getrennt an das ATO, und alles landet in derselben Erklärung.\n\nDas Risiko einer Saison mit kurzen Jobs ist ein vergessener Arbeitgeber."
  },
  {
    "question": "Ändert Bezahlung pro Bin etwas an meiner Steuer?",
    "answer": "Nein. Akkordlohn ist Lohn, ob pro Bin, pro Eimer, pro Tray oder pro Kilo abgerechnet wird. Dein Arbeitgeber meldet die Summe und behält Steuer ein wie bei einem Stundenlohn.\n\nWas Akkordarbeit ändert, ist die Aufzeichnung, weil stark schwankende Bezahlung sich später schwerer mit dem Income Statement abgleichen lässt."
  },
  {
    "question": "Kann ich das Benzin für die tägliche Fahrt zur Farm absetzen?",
    "answer": "Nein. Die erste Fahrt des Tages, von deiner Unterkunft zur ersten Farm, ist der normale Arbeitsweg und nicht absetzbar, egal wie weit er ist.\n\nAbsetzbar sind Fahrten zwischen Farmen, Blöcken oder Hallen, nachdem dein Arbeitstag begonnen hat, berechnet mit der Kilometerpauschale oder einem Fahrtenbuch."
  },
  {
    "question": "Was, wenn die Farm mir nie Payslips gegeben hat?",
    "answer": "Meistens kein Problem. Die meisten Arbeitgeber melden deine Bezahlung über Single Touch Payroll an das ATO, also erscheint sie als Income Statement, auch wenn du nie einen Payslip bekommen hast.\n\nTrotzdem hilft eine eigene Notiz, welche Farm, welche Daten und ungefähr welcher Betrag."
  }
]

const GUIDES = [
  {
    "href": "/de/blog/piece-rates-farm-work-working-holiday",
    "label": "Akkordlohn in der Landwirtschaft und der Mindestlohn darunter",
    "desc": "Wie Bezahlung pro Bin funktioniert und was trotzdem herauskommen muss."
  },
  {
    "href": "/de/blog/fruit-picking-jobs-working-holiday-australia",
    "label": "Fruit Picking in Australien",
    "desc": "Regionen, Saisons und was du vor der Zusage prüfen solltest."
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
        path: '/de/expenses/farm-work',
        articleHeadline: "Farmarbeit und Fruit Picking: was du absetzen kannst",
        articleDescription: "Sonnencreme ist absetzbar. Deine Jeans und die Hostelmiete nie. Was Farmarbeit wirklich absetzt.",
        inLanguage: "de-DE",
        WA, UI, crumbs: CRUMBS, hero: HERO, sections: SECTIONS, faqs: FAQS, guides: GUIDES, services: SERVICES,
      }}
    />
  )
}
