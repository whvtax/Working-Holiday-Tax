import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Working Holiday Tax',
  description: 'Datenschutzerklärung von Working Holiday Tax – wie wir deine personenbezogenen Daten erheben, verwenden und schützen.',
  alternates: {
    canonical: '/de/privacy',
    languages: {
      'en-AU': '/privacy',
      'de': '/de/privacy',
      'ja': '/ja/privacy',
      'x-default': '/privacy',
    },
  },
}

type Section = {
  title: string
  body?: string
  items?: string[]
}

const sections: Section[] = [
  {
    title: '1. Einleitung',
    body: 'Diese Datenschutzerklärung erläutert, wie Working Holiday Tax („wir", „uns", „unser") deine personenbezogenen Daten in Übereinstimmung mit dem Privacy Act 1988 (Cth), den Australian Privacy Principles (APPs) und dem Notifiable Data Breaches (NDB)-Schema erhebt, verwendet, offenlegt und schützt. Wir erfüllen außerdem unsere Pflichten unter Aufsicht eines registrierten Steueragenten gegenüber dem ATO und dem Tax Practitioners Board (TPB), einschließlich strenger Vertraulichkeitsanforderungen. Durch die Nutzung unserer Website oder die Inanspruchnahme unserer Dienstleistungen stimmst du der Erhebung und Verwendung deiner Daten gemäß dieser Datenschutzerklärung zu.',
  },
  {
    title: '2. Allgemeiner Informationshinweis',
    body: 'Die auf unserer Website bereitgestellten Informationen dienen ausschließlich allgemeinen Informationszwecken und stellen keine persönliche Steuerberatung dar. Für Beratung zu deinen individuellen Umständen solltest du eine registrierte Steueragentur oder eine qualifizierte Fachperson konsultieren.',
  },
  {
    title: '3. Daten, die wir erheben',
    body: 'Wir erheben personenbezogene Daten, die zur Erbringung unserer Dienstleistungen erforderlich sind, einschließlich:',
    items: [
      'Vollständiger Name und Kontaktdaten (E-Mail, Telefon, Adresse).',
      'Tax File Number (TFN) und ATO-Korrespondenz.',
      'Einkommens-, Beschäftigungs- und Finanzdaten.',
      'Ausweisdokumente (z. B. Reisepass oder Führerschein).',
      'Bankverbindung (erforderlich für Rückzahlungen).',
      'Über Formulare, E-Mail, Telefon oder Website-Interaktionen bereitgestellte Informationen.',
      'Nicht identifizierbare Daten wie IP-Adresse, Browsertyp und besuchte Seiten.',
    ],
  },
  {
    title: '4. Wie wir deine Daten verwenden',
    body: 'Wir verwenden deine personenbezogenen Daten, um:',
    items: [
      'Steuererklärungen vorzubereiten und beim Australian Taxation Office (ATO) einzureichen.',
      'Die Identität zu prüfen und TPB- sowie gesetzlichen Pflichten nachzukommen.',
      'Steuerbezogene Dienstleistungen und Support bereitzustellen.',
      'Mit dir über deine Steuerangelegenheiten zu kommunizieren.',
      'Unsere Dienstleistungen und das Kundenerlebnis zu verbessern.',
      'Servicebezogene Updates zu senden (du kannst Marketingkommunikation jederzeit abbestellen).',
    ],
  },
  {
    title: '5. Datensicherheit',
    body: 'Wir treffen angemessene Maßnahmen, um deine personenbezogenen Daten vor Missbrauch, Verlust oder unbefugtem Zugriff zu schützen. Dazu gehören:',
    items: [
      'Verschlüsselte Website-Verbindungen (SSL).',
      'Sichere Speichersysteme mit eingeschränktem Zugang.',
      'Zugriffskontrollen, beschränkt auf autorisiertes Personal.',
      'Vertraulichkeitspflichten für alle Mitarbeiter und Auftragnehmer.',
    ],
  },
  {
    title: '6. Cookies und Website-Tracking',
    body: 'Wir verwenden Cookies und Analysetools (einschließlich Google Analytics), um die Website-Nutzung zu verstehen, das Nutzererlebnis zu verbessern und Leistung sowie Traffic zu überwachen. Du kannst Cookies über die Einstellungen deines Browsers deaktivieren. Durch die weitere Nutzung unserer Website stimmst du der Verwendung von Cookies gemäß dieser Richtlinie zu.',
  },
  {
    title: '7. Weitergabe an Dritte',
    body: 'Wir verkaufen oder handeln deine personenbezogenen Daten nicht. Wir geben begrenzte Informationen weiter an:',
    items: [
      'Vertrauenswürdige Dienstleister, die bei Betrieb oder Kommunikation unterstützen.',
      'Aufsichtsbehörden wie das ATO oder TPB, sofern gesetzlich erforderlich.',
    ],
  },
  {
    title: '8. Datenspeicherung',
    body: 'Wir bewahren personenbezogene und steuerbezogene Daten gemäß den australischen Steuer- und Aufsichtsanforderungen mindestens 5 bis 7 Jahre auf. Nach diesem Zeitraum werden Daten sicher vernichtet oder anonymisiert, sofern sie nicht für laufende rechtliche, Compliance- oder Dienstleistungspflichten benötigt werden.',
  },
  {
    title: '9. Deine Rechte',
    body: 'Du hast das Recht:',
    items: [
      'Auf personenbezogene Daten zuzugreifen, die wir über dich gespeichert haben.',
      'Die Berichtigung unrichtiger Daten zu verlangen.',
      'Die Löschung von Daten zu verlangen, vorbehaltlich gesetzlicher Pflichten.',
      'Jederzeit Marketingkommunikation abzubestellen.',
    ],
  },
  {
    title: '10. Beschwerden und Streitbeilegung',
    body: 'Wenn du Bedenken hast, wie deine personenbezogenen Daten verarbeitet werden, kannst du uns schriftlich kontaktieren. Wir antworten innerhalb von 30 Tagen. Bist du mit unserer Antwort nicht zufrieden, kannst du eine Beschwerde beim Office of the Australian Information Commissioner (OAIC) einreichen: www.oaic.gov.au.',
  },
  {
    title: '11. Kontakt',
    body: 'Bei Fragen zu dieser Datenschutzerklärung oder zur Verarbeitung deiner Daten kannst du uns kontaktieren:',
    items: [
      'Telefon: 0424 513 998',
      `E-Mail: ${EMAIL}`,
    ],
  },
]

export default function GermanPrivacyPage() {
  return (
    <>
      <PageHeader
        kicker="Rechtliches"
        title="Datenschutzerklärung"
        titleEm=""
        sub={<><span className="hidden lg:inline">Zuletzt aktualisiert: Mai 2026. Wir sind dem Schutz deiner Privatsphäre verpflichtet.</span><span className="lg:hidden">Zuletzt aktualisiert: Mai 2026.<br />Wir sind dem Schutz deiner Privatsphäre verpflichtet.</span></>}
        breadcrumbs={[{ label: 'Startseite', href: '/de' }, { label: 'Datenschutzerklärung' }]}
      />

      <section className="pt-0 pb-10 lg:pb-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl">

            <p className="text-[13px] font-light text-body leading-[1.75] mb-10">
              Wir sind dem Schutz deiner Privatsphäre verpflichtet und behandeln deine personenbezogenen Daten verantwortungsvoll.
            </p>

            {sections.map((s, i) => (
              <div key={i} className={`mb-8 reveal delay-${(i % 4) + 1}`}>
                <h2 className="font-serif text-[16px] font-bold text-ink mb-2">{s.title}</h2>
                {s.body && (
                  <p className="text-[13px] font-light text-body leading-[1.75] mb-2">{s.body}</p>
                )}
                {s.items && (
                  <ul className="mt-2 space-y-1.5">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="mt-[7px] flex-shrink-0 rounded-full" style={{ width: '5px', height: '5px', minWidth: '5px', background: '#0B5240' }} />
                        <span className="text-[13px] font-light text-body leading-[1.75]">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  )
}
