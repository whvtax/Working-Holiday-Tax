import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'

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
  "guaranteeHeading": "Fällt die Rückerstattung kleiner aus als unser Honorar, geht die Differenz an dich zurück.",
  "guaranteeBody": "Eine Saison aus kurzen Farmjobs, mehreren Contractors und einer Erklärung entwirren wir jede Woche, für Leute auf 417 und 462 und sonst niemanden. Von einem registrierten Steuerberater geprüft und freigegeben, bevor beim ATO eingereicht wird.",
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
    "h2": "Was können Fruit Picker und Farmarbeiter absetzen?",
    "paras": [
      "Absetzbar sind Sonnenschutz für Arbeit im Freien, Schutzhandschuhe und Schutzschuhe, selbst gekaufte Pflückausrüstung und die Fahrt zwischen zwei Farmen oder Blöcken am selben Arbeitstag. Für alles gilt: du hast selbst bezahlt, nichts erstattet bekommen und kannst es belegen.",
      "Farmarbeit verdient sich diese Abzüge durch das, was die Arbeit körperlich ist. Sonnencreme ist für fast jeden in Australien privat. Bei dir ist sie absetzbar, weil dich der Job Tag für Tag stundenlang in die direkte Sonne stellt, und das ATO sieht darin eine arbeitsbedingte Belastung und keine Lifestyle-Entscheidung."
    ]
  },
  {
    "kind": "items",
    "h2": "Die Abzüge, die zu dieser Arbeit gehören",
    "intro": "An jedem hängt eine Bedingung. Die Bedingung ist keine Deko, sie ist das, was den Abzug bei einer Rückfrage überstehen lässt.",
    "items": [
      {
        "t": "Sonnenschutz: Sonnencreme, Hut mit breiter Krempe, Sonnenbrille",
        "d": "Absetzbar, wenn dich die Arbeit der Sonne aussetzt, also beim Pflücken, Schneiden, Ausdünnen und beim Packen in einer offenen Halle. Die Belastung im Freien macht den Abzug. Sonnencreme für ein Wochenende am Strand gehört nicht dazu, und du setzt nur den Anteil ab, den du für die Arbeit verbraucht hast."
      },
      {
        "t": "Schutzhandschuhe, Gummistiefel und Sicherheitsschuhe",
        "d": "Pflückhandschuhe, Regenstiefel, Stahlkappen für die Halle. Sie zählen, weil sie dich vor einer konkreten Gefahr der Arbeit schützen: Dornen, Harz, Chemikalien, Schlamm, herunterfallende Kisten, unebener Boden. Normale Schuhe, die einfach nur robust sind, zählen nicht."
      },
      {
        "t": "Selbst gekaufte Pflückausrüstung",
        "d": "Gartenschere, Schnippschere, Pflücktasche oder Eimergeschirr, Stirnlampe für den frühen Start, Knieschoner. Jeder Gegenstand bis 300 Dollar wird im Kaufjahr voll abgesetzt. Darüber setzt du ihn ebenfalls ab, nur verteilt über die Nutzungsdauer."
      },
      {
        "t": "Fahrten zwischen Farmen oder Blöcken am selben Tag",
        "d": "Der Wechsel von einem Grundstück, Block oder Schuppen zum nächsten, nachdem dein Arbeitstag begonnen hat, ist absetzbare Fahrt, weil Farmarbeit oft keinen festen Arbeitsplatz hat. Berechnet wird sie mit der Kilometerpauschale oder einem Fahrtenbuch. Die erste Fahrt des Tages, von deiner Unterkunft zur ersten Farm, gehört nicht dazu."
      },
      {
        "t": "Schutzkleidung mit echter Funktion",
        "d": "Regenkleidung für Arbeit bei Nässe, chemikalienbeständige Overalls beim Spritzen, eine Staubmaske in der Packhalle. Der Test ist, ob das Teil dich vor etwas schützt, das die Arbeit dir antut. Ein Flanellhemd, das warm hält, besteht ihn nicht."
      },
      {
        "t": "Der Arbeitsanteil deines Handys",
        "d": "Klein, aber real, wenn du dein eigenes Handy für den Job nutzt, etwa um Schichtzeiten vom Contractor zu bekommen oder gepflückte Bins in einer App zu erfassen. Du setzt den arbeitsbezogenen Prozentsatz auf einer nachvollziehbaren Grundlage ab, nicht die ganze Rechnung."
      }
    ]
  },
  {
    "kind": "answer",
    "h2": "Was musst du aus einer Saison aufheben?",
    "paras": [
      "Nichts ist absetzbar, solange nicht drei Dinge stimmen: das Geld war deins, niemand hat es dir zurückgegeben, und es diente dazu, das Einkommen zu verdienen, das in der Erklärung steht. In einer Saison sind das der Roadhouse-Beleg für die Sonnencreme, der Kassenzettel für Handschuhe und Schere und eine Notiz zu Daten und Kilometern, wann immer ein Contractor dich zwischen Blöcken bewegt hat.",
      "Ein Beleg, eine Rechnung oder ein Kontoauszug mit Betrag, Datum, Anbieter und Gegenstand zählt, und ein Handyfoto reicht. Fünf Jahre aufheben. Liegen deine Abzüge im ganzen Jahr bei 300 Dollar oder weniger, brauchst du keinen schriftlichen Nachweis, musst aber zeigen können, wie du auf die Zahl kommst. Nicht dieselben 300 Dollar, die entscheiden, ob ein einzelner Gegenstand sofort oder über die Nutzungsdauer abgeschrieben wird."
    ]
  },
  {
    "kind": "traps",
    "h2": "Was machen Farmarbeiter falsch?",
    "intro": "Zuerst die Abzüge, die Saisonarbeiter jedes Jahr ansetzen und nicht belegen können. Dann das Geld, das liegen bleibt, weil es niemand erwähnt hat.",
    "wrong": [
      {
        "t": "Normale Kleidung, die der Job zerstört",
        "d": "Jeans, T-Shirts, Flanellhemd, Pulli für den Start um fünf. Es fühlt sich unfair an, weil die Arbeit sie ruiniert und du sie sonst nicht gekauft hättest. Das ATO prüft den Gegenstand, nicht die Absicht, und Alltagskleidung bleibt privat, egal wie schnell die Fruchtflecken sie erledigen."
      },
      {
        "t": "Hostelmiete und Kaution im Working Hostel",
        "d": "Wo du in der Saison geschlafen hast, ist eine Lebenshaltungskost, keine Arbeitskost, auch wenn das Hostel die einzige Unterkunft im Umkreis von fünfzig Kilometern war und die Farm sie organisiert hat. Irgendwo zu wohnen ist keine Kost des Einkommenserwerbs."
      },
      {
        "t": "Essen und Trinken tagsüber",
        "d": "Mittagessen auf der Farm ist dasselbe wie Mittagessen woanders. Mahlzeiten werden nur in dem engen Fall absetzbar, dass dein Arbeitgeber eine Reise verlangt, bei der du über Nacht von zu Hause weg bist, und die Erntesaison erfüllt das normalerweise nicht."
      },
      {
        "t": "Die Fahrt vom Hostel zur Farm",
        "d": "Das ist der Arbeitsweg, und er bleibt es, ob du fünfzig Kilometer Schotterpiste fährst oder zu Fuß gehst. Absetzbar ist nur die Bewegung zwischen Einsatzorten, nachdem der Tag begonnen hat."
      },
      {
        "t": "Die Anreise in die Region",
        "d": "Der Flug oder die Fahrt nach Bundaberg, Mildura oder Tully, um dort Arbeit zu suchen, bringt dich erst dorthin, wo der Job ist. Das ist nicht dasselbe wie Kosten des Verdienens."
      }
    ],
    "missed": [
      {
        "t": "Sonnencreme, Hut und Sonnenbrille",
        "d": "Der am häufigsten übersehene Abzug in der Farmarbeit und der, auf den der Anspruch am klarsten ist. Kaum jemand hebt den Beleg für eine 19-Dollar-Flasche Sonnencreme von der Tankstelle auf, und über eine Saison ist das keine kleine Summe."
      },
      {
        "t": "Jedes Paar Handschuhe einzeln",
        "d": "Pflückhandschuhe sind Verbrauchsmaterial. Sechs Paar in einer Saison sind sechs absetzbare Käufe, nicht einer, und jeder wird einzeln an der 300-Dollar-Grenze gemessen."
      },
      {
        "t": "Fahrten zwischen Blöcken am selben Tag",
        "d": "Auf größeren Betrieben und bei Contractors, die eine Crew herumschicken, sehr üblich, und fast nie abgesetzt, weil es sich nicht wie eine Fahrt anfühlt. Notiere Datum und Kilometer laufend, dann ist es ein glatter Abzug."
      },
      {
        "t": "Ein Farmjob über drei Wochen, den niemand mehr auf dem Schirm hatte",
        "d": "Der teuerste Fehler dieser Seite ist gar kein Abzug. Ein kurzer Einsatz, hastig ausgezahlt, manchmal über einen Contractor, fehlt schnell in der Steuererklärung, und fehlendes Einkommen ist schlimmer als ein vergessener Abzug."
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
      "Ob deine Fahrten als wechselnde Einsatzorte statt als Arbeitsweg gelten, ist eine Tatsachenfrage, und es geht um echtes Geld. Wer von einem Contractor ohne feste Basis zwischen drei Betrieben geschickt wird, steht anders da als jemand, der elf Wochen zur selben Plantage gefahren ist. Wie oft der Ort wechselte, ob der Job das Reisen verlangte und ob es überhaupt einen festen Arbeitsplatz gab, entscheidet die Frage.",
      "Der steuerliche Wohnsitz ist größer. Er ist eine Beurteilung, keine Formel, das ATO sieht ihn in beide Richtungen falsch angesetzt, und der Fall Addy vor dem High Court zeigt, wie viel daran hängen kann. Er ist mehr wert als jeder Beleg auf dieser Seite, und wir legen uns erst fest, nachdem wir dein Jahr durchgegangen sind.",
      "Farmarbeit zahlt außerdem auf ein weiteres Visum ein, und dieser Teil ist Einwanderungsrecht, kein Steuerrecht. Welche Branchen, Postleitzahlen und Zeiträume zählen, legt das Department of Home Affairs fest, und die Regeln haben sich mehr als einmal geändert. Prüf die aktuellen offiziellen Angaben oder frag einen registrierten Migration Agent, bevor du dich darauf verlässt, dass ein Job zählt. So oder so muss das Einkommen korrekt gemeldet werden."
    ]
  }
]

const FAQS = [
  {
    "question": "Kann ich Sonnencreme und einen Hut absetzen?",
    "answer": "Ja, wenn dich die Arbeit in die Sonne stellt, und Farmarbeit tut das normalerweise. Das ATO akzeptiert Sonnenschutz als Arbeitskost für Menschen, die im Freien arbeiten, weil die Belastung aus dem Job kommt und nicht aus deinen eigenen Entscheidungen. Belege aufheben, nur den beruflichen Anteil ansetzen und sagen können, worin die Arbeit bestand."
  },
  {
    "question": "Ich war auf drei Farmen. Sind das drei Steuererklärungen?",
    "answer": "Nein. Eine Erklärung deckt das ganze Steuerjahr vom 1. Juli bis 30. Juni ab, egal wie viele Farmen, Contractors oder Zeitarbeitsfirmen dich bezahlt haben. Jeder Arbeitgeber meldet Lohn und einbehaltene Steuer getrennt an das ATO, und alles landet in derselben Erklärung. Das Risiko einer Saison mit kurzen Jobs ist ein vergessener Arbeitgeber, und das prüft man besser vor der Abgabe."
  },
  {
    "question": "Ändert Bezahlung pro Bin etwas an meiner Steuer?",
    "answer": "Nein. Akkordlohn ist Lohn, ob pro Bin, pro Eimer, pro Tray oder pro Kilo abgerechnet wird. Dein Arbeitgeber meldet die Summe und behält Steuer ein wie bei einem Stundenlohn, und sie geht in dein Einkommen ein wie jede andere Bezahlung. Was Akkordarbeit ändert, ist die Aufzeichnung, weil stark schwankende Bezahlung sich später schwerer mit dem Income Statement abgleichen lässt."
  },
  {
    "question": "Kann ich das Benzin für die tägliche Fahrt zur Farm absetzen?",
    "answer": "Nein. Die erste Fahrt des Tages, von deiner Unterkunft zur ersten Farm, ist der normale Arbeitsweg und nicht absetzbar, egal wie weit er ist. Absetzbar sind Fahrten zwischen Farmen, Blöcken oder Hallen, nachdem dein Arbeitstag begonnen hat, berechnet mit der Kilometerpauschale oder einem Fahrtenbuch."
  },
  {
    "question": "Was, wenn die Farm mir nie Payslips gegeben hat?",
    "answer": "Meistens kein Problem. Die meisten Arbeitgeber melden deine Bezahlung über Single Touch Payroll an das ATO, also erscheint sie als Income Statement, auch wenn du nie einen Payslip bekommen hast. Trotzdem hilft eine eigene Notiz, welche Farm, welche Daten und ungefähr welcher Betrag, gerade bei einer Saison mit mehreren kurzen Jobs, damit du die offiziellen Zahlen gegenprüfen kannst."
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
  headline: "Farmarbeit und Fruit Picking: was du absetzen kannst",
  description: "Sonnencreme ist absetzbar. Deine Jeans und die Hostelmiete nie. Was Farmarbeit wirklich absetzt.",
  url: `${SITE_URL}/de/expenses/farm-work`,
  inLanguage: "de-DE",
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/de/expenses/farm-work#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/de/expenses/farm-work`,
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
