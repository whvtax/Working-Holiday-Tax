import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

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
  "guaranteeHeading": "Rückerstattung kleiner als unser Honorar? Dann erstatten wir die Differenz, du zahlst nie drauf.",
  "guaranteeBody": "Baustellenerklärungen, Ticketverlängerungen und der Streit um den Ute sind hier Wochengeschäft, und jeder Kunde ist auf einem 417 oder 462. Von unserem Team vorbereitet, dann von einem registrierten Steuerberater geprüft und freigegeben, bevor etwas beim ATO ankommt.",
  "faqHeading": "Fragen, die uns dazu gestellt werden",
  "guidesHeading": "Danach lesenswert",
  "otherJobs": "Anderer Job? Hier sind alle Berufe.",
  "servicesLabel": "Weiter auf der Website",
  "wrongLabel": "Abgesetzt, obwohl es nicht ging",
  "missedLabel": "Nicht abgesetzt, obwohl es gegangen wäre",
  "disclaimer": "Das sind allgemeine Informationen, keine persönliche Steuerberatung. Was du absetzen kannst, hängt von deinen Arbeitgebern, deinen Belegen und davon ab, wie du tatsächlich gearbeitet hast. Wenn du bei uns einreichst, gehen wir deine Situation Punkt für Punkt durch, damit du alles absetzt, was dir zusteht, und nichts, was dir nicht zusteht.",
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
  "lede": "Der Bau hat die längste Abzugsliste aller Backpacker-Jobs. Der Ute ist der eine Posten darauf, der meistens nicht dir gehört."
}

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
    "h2": "Was können Bauarbeiter absetzen?",
    "paras": [
      "Absetzbar sind selbst gekauftes Werkzeug und Ausrüstung, Schutzkleidung und Schutzausrüstung, Sonnenschutz für Arbeit im Freien, die Verlängerung einer White Card oder eines Tickets, das du bereits hast, der arbeitsbezogene Anteil deines Handyvertrags und Weiterbildung, die zu dem Gewerk gehört, in dem du bereits arbeitest. Alles, was der Arbeitgeber gestellt oder erstattet hat, fällt raus.",
      "Die Liste ist lang, weil der Job konkrete Kosten erzeugt. Stahlkappen schützen dich vor einem fallenden Stein, der Helm vor etwas von oben, Sonnencreme vor sechs Stunden auf einer unbeschatteten Platte. Genau diese Verbindung sucht der Abzugstest, und deshalb bringt Baustellenarbeit meist die höchste Abzugssumme aller Berufe auf dieser Website."
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
        "d": "Weiterhin absetzbar, nur über die Nutzungsdauer verteilt statt auf einmal. Ein Betonmischer oder eine ordentliche Kappsäge gehört hierher. Die Falle ist, mehrere Werkzeuge zusammen als Set ab 300 Dollar zu kaufen, denn dann gilt das Set als ein Gegenstand, auch wenn jedes Teil einzeln darunter gelegen hätte."
      },
      {
        "t": "Schutzausrüstung und Schutzkleidung",
        "d": "Warnschutzhemden und -westen, Sicherheitsschuhe mit Stahlkappe, Schutzbrille, Helm, Gehörschutz, Arbeitshandschuhe, Staubmaske. Das ATO fragt nicht, ob etwas auf der Baustelle nützlich ist, sondern ob es eine Eigenschaft hat, die dich vor einer konkreten Verletzungsgefahr schützt."
      },
      {
        "t": "Sonnenschutz für Arbeit im Freien",
        "d": "Sonnencreme, Hut mit breiter Krempe und Sonnenbrille sind absetzbar, wenn die Arbeit draußen stattfindet, auf derselben Grundlage wie bei jedem anderen Außenberuf. Auf einer Sommerplatte ist das eine echte, wiederkehrende Ausgabe, für die kaum jemand einen Beleg aufhebt."
      },
      {
        "t": "Verlängerung von White Card oder Ticket",
        "d": "Die Verlängerung einer Karte oder eines Tickets, das du schon hast, während du bereits auf der Baustelle bist, ist absetzbar. Deine allererste White Card nicht, weil dich diese Kosten überhaupt erst für Bauarbeit qualifiziert haben. Dasselbe gilt für ein erstes Stapler- oder Hubarbeitsbühnenticket."
      },
      {
        "t": "Arbeitsanteil an Handy und Internet",
        "d": "Wenn du mit deinem eigenen Handy den Vorarbeiter anrufst, Pläne prüfst oder Schichtnachrichten bekommst, ist der arbeitsbezogene Prozentsatz absetzbar. Halte eine nachvollziehbare, ehrliche Grundlage für den Prozentsatz fest. Die ganze Rechnung bei einem Handy, auf dem auch dein Leben stattfindet, hält nicht stand."
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
      "Jeder Abzug muss drei Tests bestehen. Du hast selbst bezahlt, dir wurde nichts erstattet, und es diente dazu, das Einkommen zu verdienen, das du angibst. Auf der Baustelle heißt das: der Beleg für die Bohrmaschine, die Stiefel und die Ticketverlängerung, aufgehoben statt im Handschuhfach vergessen.",
      "Der Nachweis kann ein Beleg, eine Rechnung oder ein Kontoauszug sein, solange Betrag, Datum, Anbieter und Gegenstand daraus hervorgehen. Ein Handyfoto reicht. Heb ihn fünf Jahre auf. Liegen alle Abzüge des Jahres bei 300 Dollar oder weniger, brauchst du gar keinen schriftlichen Nachweis, musst die Summe aber erklären können. Verwechsle das nicht mit den 300 Dollar, die entscheiden, ob eine Säge sofort oder über die Nutzungsdauer abgeschrieben wird."
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
    "intro": "Die zu Unrecht angesetzten Posten drehen sich meist um Kleidung und den Ute. Die übersehenen um Belege, die niemand aufgehoben hat, für Dinge, die klar absetzbar waren.",
    "wrong": [
      {
        "t": "Normale Kleidung, die die Baustelle zerlegt",
        "d": "Jeans, T-Shirt, Flanellhemd, Hoodie. Die Arbeit zerstört sie und sie wurde für die Arbeit gekauft, und beides zählt nicht. Normaler Verschleiß an Alltagskleidung ist eine private Ausgabe. Das Teil muss dich schützen, vor Schnitten, Sonne, Lärm, Staub oder Aufprall, nicht bloß den Tag überstehen."
      },
      {
        "t": "Deine erste White Card",
        "d": "Die Karte, die du bezahlt hast, bevor dich jemand einstellen wollte, ist die Kost, für den Beruf überhaupt in Frage zu kommen, und das behandelt das ATO wie den ersten Führerschein. Die Verlängerung, während du arbeitest, ist etwas anderes und absetzbar."
      },
      {
        "t": "Den Ute pauschal",
        "d": "Einen Ute zu besitzen und damit zur Baustelle zu fahren ist kein Abzug. Alle drei Bedingungen für sperriges Werkzeug müssen erfüllt sein, und auf den meisten Baustellen sind sie es nicht, weil es dort abschließbaren Stauraum gibt. Das ist der am häufigsten überzogene Abzug im Gewerk."
      },
      {
        "t": "Werkzeug, das der Arbeitgeber gestellt oder bezahlt hat",
        "d": "Kam es vom Lkw, aus dem Baucontainer, oder wurde es dir erstattet, sind dir keine Kosten geblieben. Wer ein Werkzeug benutzt, ist nicht automatisch wer es bezahlt hat."
      },
      {
        "t": "Ein Kurs für ein anderes Gewerk",
        "d": "Eine Ausbildung, die dich in einen neuen Beruf bringen würde, ist nicht absetzbar, so eindeutig sie auch mit Bau zu tun hat, weil sie eine neue Erwerbsfähigkeit aufbaut statt die bestehende zu erhalten."
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
      "Zuerst die Ausnahme für sperriges Werkzeug. Was du transportierst, was die Baustelle an Stauraum bietet und ob das Werkzeug an diesem Tag nötig war, gibt den Ausschlag. Zwei Helfer derselben Crew können unterschiedlich dastehen, und dieser Abzug wird angeschaut.",
      "Ein Kurs funktioniert genauso. Ob er die Fähigkeiten erhält, für die du heute bezahlt wirst, oder auf einen neuen Beruf hinarbeitet, entscheidet deine jetzige Rolle und nicht der Kursprospekt.",
      "Der steuerliche Wohnsitz ist mehr wert als alles Werkzeug auf der Liste. Britische, deutsche und japanische Passinhaber, die steuerlich in Australien ansässig waren, können nach der Addy-Entscheidung den vollen Steuerfreibetrag tragen. Baustellenarbeit bedeutet oft einen längeren Aufenthalt an einer festen Adresse, und genau dort wird die Frage relevant."
    ]
  }
]

const FAQS = [
  {
    "question": "Kann ich meine erste White Card absetzen?",
    "answer": "Nein. Das ATO behandelt die erste White Card wie den ersten Führerschein, als Kosten dafür, für die Arbeit überhaupt in Frage zu kommen, und nicht als Kosten der Arbeit. Sobald du auf der Baustelle arbeitest und die Karte zum Weiterarbeiten verlängert werden muss, ist die Verlängerung absetzbar. Dasselbe gilt für ein erstes Staplerticket oder eine Fahrerlaubnis für schwere Fahrzeuge."
  },
  {
    "question": "Welches Werkzeug kann ich als Bauarbeiter absetzen?",
    "answer": "Jedes Werkzeug und jede Ausrüstung, die du selbst für die Baustelle gekauft hast, sofern dein Arbeitgeber sie weder gestellt noch erstattet hat. Gegenstände bis 300 Dollar pro Stück werden im Kaufjahr voll abgesetzt. Ab 300 Dollar setzt du sie ebenfalls ab, aber über die Nutzungsdauer verteilt. Kaufst du mehrere Werkzeuge zusammen als Set ab 300 Dollar, gilt das ganze Set als ein Gegenstand."
  },
  {
    "question": "Kann ich meinen Ute für die Fahrt zur Baustelle absetzen?",
    "answer": "Nur in einem engen Fall. Die Fahrt von zu Hause zu einem festen Arbeitsplatz ist privat, und daran ändert sich nichts, weil der Arbeitsplatz eine Baustelle ist. Die Fahrt wird nur absetzbar, wenn das Werkzeug an diesem Tag nötig, wirklich sperrig und auf der Baustelle nicht sicher zu lagern ist. Da die meisten Utes und Kastenwagen eine Tonne oder mehr tragen, ist die Kilometerpauschale für sie ausgeschlossen und nur das Fahrtenbuch bleibt."
  },
  {
    "question": "Sind Stahlkappen und Warnschutzkleidung absetzbar?",
    "answer": "Ja. Schutzartikel wie Sicherheitsschuhe mit Stahlkappe, Warnschutzhemden und -westen, Schutzbrillen, Helme, Gehörschutz und Arbeitshandschuhe sind absetzbar, weil sie dich vor einer konkreten Verletzungsgefahr auf der Baustelle schützen, und genau das prüft das ATO. Sonnenschutz für Außenarbeit gilt auf derselben Grundlage, und das Waschen der Schutzkleidung ebenfalls."
  },
  {
    "question": "Meine Klamotten gehen auf der Baustelle kaputt. Warum kann ich sie nicht absetzen?",
    "answer": "Weil das ATO den Gegenstand prüft und nicht, was mit ihm passiert ist. Jeans, T-Shirt oder Flanellhemd sind Alltagskleidung, die jeder überall tragen könnte, und normaler Verschleiß daran ist privat, so schnell die Arbeit sie auch ruiniert. Absetzbar wird ein Teil erst mit einer echten Schutzfunktion, wie die Schutzausrüstung oben, oder als vorgeschriebene Uniform mit Logo."
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
  headline: "Bau in Australien: Werkzeug, Schutzausrüstung, Ute",
  description: "Werkzeug, Schutzausrüstung und die White-Card-Verlängerung sind absetzbar. Die erste White Card und die kaputte Jeans nicht.",
  url: `${SITE_URL}/de/expenses/construction`,
  inLanguage: "de-DE",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/de/expenses/construction#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/de/expenses/construction`,
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
  margin: '0 0 14px',
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
                  <p style={{ ...ps, margin: 0 }}>{s.body}</p>
                </div>
              )}
            </div>
          </section>
        ))}

        {/* GUARANTEE + CTA */}
        <section style={{ background: '#0B5240', padding: '38px 0' }}>
          <div style={wrap}>
            <h2 style={{ ...h2s, color: '#fff', marginBottom: '12px' }}>{UI.guaranteeHeading}</h2>
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
                <p style={{ ...ps, margin: 0 }}>{f.answer}</p>
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
            <p style={{ ...ps, marginTop: '18px', marginBottom: 0 }}>
              <Link href={UI.hubHref} style={{ color: FOREST, textDecoration: 'underline' }}>{UI.otherJobs}</Link>
            </p>
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
