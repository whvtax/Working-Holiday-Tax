import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { AGENT_NAME, AGENT_ABN, AGENT_TPB } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Mandantenvereinbarung | Working Holiday Tax',
  description: 'Mandantenvereinbarung von Working Holiday Tax - Vertragsbedingungen für unsere Steuerdienstleistungen.',
  alternates: {
    canonical: '/de/client-agreement',
    languages: {
      'en-AU': '/client-agreement',
      'de': '/de/client-agreement',
      'ja': '/ja/client-agreement',
      'x-default': '/client-agreement',
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
    title: '1. Definitionen',
    body: 'Im Sinne dieser Vereinbarung gilt:',
    items: [
      '„Mandant" bezeichnet die natürliche Person, die den Service nutzt und diese Vereinbarung abschließt.',
      '„Anbieter" bezeichnet Working Holiday Tax, das unter der Aufsicht eines registrierten Steueragenten wie oben angegeben tätig ist.',
      '„Service" bezeichnet die vom Anbieter erbrachten steuerbezogenen Dienstleistungen, einschließlich Vorbereitung und Einreichung der Steuererklärung sowie zugehörige Unterstützung bei australischen Steuerangelegenheiten.',
      '„Steuererklärung" bezeichnet die im Namen des Mandanten vorbereitete und beim Australian Taxation Office (ATO) eingereichte australische Einkommensteuererklärung.',
      '„Rückzahlung" bezeichnet jede vom ATO ausgestellte und auf das vom Mandanten angegebene Konto überwiesene Erstattung, Zahlung oder Gutschrift.',
    ],
  },
  {
    title: '2. Annahme der Bedingungen',
    body: 'Mit dem Zugriff auf oder der Nutzung unseres Service bestätigst du, dass du diese Bedingungen gelesen und verstanden hast und an sie gebunden bist. Diese Bedingungen stellen die vollständige Vereinbarung zwischen dir und dem Anbieter dar und ersetzen frühere Kommunikationen oder Zusicherungen. Durch die Nutzung unseres Service beauftragst du den Anbieter als deinen bevollmächtigten Vertreter, deine Steuererklärung in deinem Namen beim Australian Taxation Office (ATO) vorzubereiten und einzureichen.',
  },
  {
    title: '3. Art des Service',
    body: 'Unser Service umfasst die Vorbereitung und Einreichung von Steuererklärungen auf Basis der von dir bereitgestellten Informationen. Alle endgültigen Steuerbescheide, Rückzahlungen oder Entscheidungen werden ausschließlich vom ATO getroffen. Wir garantieren nicht:',
    items: [
      'Einen bestimmten Steuerrückzahlungsbetrag.',
      'Ein bestimmtes Steuerergebnis.',
      'Eine bestimmte Bearbeitungszeit.',
    ],
  },
  {
    title: '4. Verantwortung des Mandanten',
    body: 'Du bist verantwortlich dafür, dass alle von dir bereitgestellten Informationen genau, vollständig und aktuell sind. Insbesondere stimmst du zu, dass:',
    items: [
      'Du wahrheitsgemäße und korrekte Informationen bereitgestellt hast.',
      'Du uns über Änderungen informierst.',
      'Du für die Überprüfung deiner Bankverbindung und persönlichen Daten verantwortlich bist.',
    ],
  },
  {
    title: '5. Geistiges Eigentum',
    body: 'Alle über den Service bereitgestellten Materialien, einschließlich Dokumente, Inhalte und Branding, sind durch australische Gesetze zum Schutz des geistigen Eigentums geschützt. Du darfst Materialien ohne vorherige schriftliche Zustimmung nicht kopieren, reproduzieren, verbreiten oder für kommerzielle Zwecke nutzen. Mandanten erhalten ein begrenztes, nicht übertragbares Recht zur Nutzung der Dokumente ausschließlich für persönliche Steuerzwecke.',
  },
  {
    title: '6. Gebühren und Kosten',
    items: [
      'Standard-Servicegebühren für die Steuererklärung beginnen ab AUD 200 $ + GST, abhängig von der Komplexität.',
      'Zusätzliche Gebühren werden vor Abschluss der Arbeit kommuniziert.',
      'Alle Gebühren sind nach Arbeitsbeginn nicht erstattungsfähig.',
    ],
  },
  {
    title: '7. Zahlungsbedingungen',
    body: 'Die Zahlung ist bei Einreichung deiner Steuererklärung fällig. Die Zahlung beeinflusst oder garantiert weder deine Rückzahlung noch das ATO-Ergebnis.',
  },
  {
    title: '8. Haftungsbeschränkung',
    body: 'Soweit gesetzlich zulässig, ist der Anbieter nicht verantwortlich für:',
    items: [
      'Entscheidungen, Verzögerungen, Prüfungen oder Bescheide des ATO.',
      'Finanzielle Verluste, Strafen oder Ergebnisse, die aus ATO-Maßnahmen resultieren.',
      'Probleme, die durch unrichtige, unvollständige oder irreführende Informationen des Mandanten entstehen.',
    ],
  },
  {
    title: '9. Freistellung',
    body: 'Du stimmst zu, den Anbieter, einschließlich seiner Direktoren, Mitarbeiter, Auftragnehmer und verbundenen Unternehmen, von allen Ansprüchen, Verlusten oder Aufwendungen freizustellen und schadlos zu halten, die entstehen aus oder im Zusammenhang mit:',
    items: [
      'Unrichtigen, unvollständigen oder irreführenden Informationen, die du bereitgestellt hast.',
      'Deiner Nichterfüllung deiner Steuerpflichten.',
      'ATO-Bescheiden, Prüfungen, Überprüfungen oder Durchsetzungsmaßnahmen.',
    ],
  },
  {
    title: '10. Datenschutz-Compliance',
    body: 'Du ermächtigst uns, relevante personenbezogene Daten zu erheben, zu nutzen und zu teilen, soweit dies zur Erbringung des Service erforderlich ist, einschließlich mit dem ATO, dem Tax Practitioners Board (TPB) und anderen Behörden, soweit gesetzlich erforderlich. Deine Daten werden nur verwendet für:',
    items: [
      'Steuervorbereitung, Einreichung und Compliance.',
      'Damit verbundene administrative Zwecke.',
    ],
  },
  {
    title: '11. Gewährleistungsausschluss',
    body: 'Die Nutzung des Service erfolgt auf eigenes Risiko. Der Anbieter garantiert weder eine Steuerrückzahlung noch ein bestimmtes finanzielles Ergebnis. Unsere Verantwortung beschränkt sich auf die Vorbereitung und Einreichung deiner Steuererklärung auf Basis der von dir bereitgestellten Informationen. Der Anbieter kann jederzeit ohne Vorankündigung Teile des Service aussetzen, ändern oder einstellen.',
  },
  {
    title: '12. Datenschutz',
    body: 'Personenbezogene Daten werden gemäß den geltenden australischen Datenschutzgesetzen und unserer Datenschutzerklärung erhoben, verwendet und gespeichert. Wir verwenden deine Daten ausschließlich zum Zweck der Service-Erbringung, einschließlich Steuervorbereitung, Einreichung und damit verbundener Compliance-Pflichten. Vollständige Details findest du in unserer Datenschutzerklärung.',
  },
  {
    title: '13. Einreichungsvollmacht',
    body: 'Durch Bereitstellung einer unterzeichneten oder bestätigten Steuererklärung (digital oder manuell) ermächtigst du den Anbieter, deine Steuererklärung im Namen beim Australian Taxation Office (ATO) einzureichen. Nach Erhalt der Vollmacht ist keine weitere Bestätigung erforderlich.',
  },
  {
    title: '14. Bindende Kommunikation',
    body: 'Alle Kommunikationen via E-Mail, WhatsApp, SMS oder anderen digitalen Plattformen gelten als gültig, bindend und gleichwertig mit schriftlicher Kommunikation. Der Anbieter kann angemessene Maßnahmen zur Identitätsprüfung treffen, um Betrug oder Missbrauch des Service zu verhindern.',
  },
  {
    title: '15. Kündigung',
    body: 'Beide Parteien können diese Vereinbarung jederzeit kündigen. Der Anbieter kann den Service sofort aussetzen oder beenden, wenn:',
    items: [
      'Ein Verstoß gegen diese Bedingungen vorliegt.',
      'Betrügerisches, irreführendes oder rechtswidriges Verhalten vermutet wird.',
      'Eine Fortsetzung des Service rechtliche oder Compliance-Risiken schaffen würde.',
    ],
  },
  {
    title: '16. Einsatz von Subunternehmern',
    body: 'Der Anbieter kann qualifizierte Subunternehmer oder Drittanbieter, auch außerhalb Australiens, zur Unterstützung bei der Service-Erbringung einsetzen. Der Anbieter bleibt vollständig verantwortlich für die Service-Erbringung gemäß dieser Vereinbarung.',
  },
  {
    title: '17. Erklärung',
    body: 'Durch die Nutzung des Service bestätigst du, dass:',
    items: [
      'Alle bereitgestellten Informationen wahrheitsgemäß, vollständig und korrekt sind.',
      'Du den Anbieter ermächtigst, in deinem Namen für Zwecke der Steuereinreichung zu handeln.',
      'Du verstehst, dass falsche oder irreführende Informationen zu Strafen, Beendigung des Service oder rechtlichen Konsequenzen führen können.',
      'Du allen Bedingungen dieser Vereinbarung zustimmst.',
    ],
  },
  {
    title: '18. Richtigkeit der Informationen und gesetzliche Erklärung',
    body: 'Du erklärst, dass alle dem Anbieter bereitgestellten Informationen - einschließlich persönlicher Daten, Einkommen, Beschäftigungsinformationen, Bankverbindung, Reisepassdaten und Tax File Number (TFN) - wahrheitsgemäß, vollständig und korrekt sind. Du erkennst an, dass:',
    items: [
      'Die Bereitstellung falscher oder irreführender Informationen an den Anbieter oder das ATO eine Straftat nach australischem Recht darstellen kann, einschließlich des Taxation Administration Act 1953 (Cth), und zu Strafen, strafrechtlicher Verfolgung oder Rückzahlungspflichten führen kann.',
      'Du den Anbieter umgehend über Änderungen oder Korrekturen der bereitgestellten Informationen informierst.',
      'Der Anbieter nicht haftet für Ergebnisse oder Verluste, die aus unrichtigen oder unvollständigen vom Mandanten bereitgestellten Informationen entstehen.',
    ],
  },
  {
    title: '19. Anwendbares Recht',
    body: 'Diese Vereinbarung unterliegt den Gesetzen von Victoria, Australien. Sollte eine Bestimmung ungültig oder undurchsetzbar sein, bleiben die übrigen Bestimmungen in voller Kraft. Streitigkeiten werden zunächst durch Verhandlungen in gutem Glauben oder Mediation beigelegt, bevor rechtliche Schritte eingeleitet werden.',
  },
  {
    title: '20. Vertraulichkeit',
    body: 'Alle Mandanteninformationen werden vertraulich behandelt und nur offengelegt, wenn:',
    items: [
      'Gesetzlich erforderlich.',
      'Von Aufsichtsbehörden (einschließlich ATO oder TPB) gefordert.',
      'Zur Service-Erbringung notwendig.',
    ],
  },
  {
    title: '21. Dienstleister-Informationen',
    body: `Alle über workingholidaytax.com.au bereitgestellten Dienstleistungen werden von Working Holiday Tax erbracht, das unter der Aufsicht eines registrierten Steueragenten tätig ist: ${AGENT_NAME}, ABN: ${AGENT_ABN}, Tax Agent Number: ${AGENT_TPB}.`,
  },
]

export default function GermanClientAgreementPage() {
  return (
    <>
      <PageHeader
        kicker="Rechtliches"
        title="Mandantenvereinbarung"
        titleEm=""
        sub="Zuletzt aktualisiert: Mai 2026. Durch die Nutzung unserer Dienstleistungen stimmst du diesen Bedingungen zu."
        breadcrumbs={[{ label: 'Startseite', href: '/de' }, { label: 'Mandantenvereinbarung' }]}
      />

      <section className="pt-0 pb-10 lg:pb-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl">

            <div className="rounded-xl px-5 py-4 mb-10" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
              <p className="text-[13px] font-light text-body leading-[1.75]">
                Working Holiday Tax ist unter der Aufsicht eines registrierten Steueragenten tätig:{' '}
                <strong className="font-semibold text-ink">{AGENT_NAME} (ABN: {AGENT_ABN}), Tax Agent Number {AGENT_TPB}</strong>.
              </p>
            </div>

            <p className="text-[13px] font-light text-body leading-[1.75] mb-10">
              Diese Vereinbarung wird zwischen dir (dem &ldquo;Mandanten&rdquo;) und Working Holiday Tax (dem &ldquo;Anbieter&rdquo;) geschlossen und regelt deine Nutzung unserer australischen Steuerdienstleistungen, einschließlich Vorbereitung und Einreichung der Steuererklärung sowie zugehörige Unterstützung.
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
