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
      '„Prüfung" bezeichnet die vom Anbieter durchgeführte Beurteilung des Einkommens, des Ansässigkeitsstatus und der Ansprüche des Mandanten, um die dem Mandanten zur Verfügung stehenden Abzüge, Freibeträge und Befreiungen zu ermitteln. Die Prüfung ist Teil der einheitlichen Beauftragung nach Klausel 3 und wird nicht gesondert berechnet.',
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
    body: 'Unser Service ist eine einheitliche Beauftragung. Wir prüfen deine Situation, einschließlich deines steuerlichen Ansässigkeitsstatus, einer dir zustehenden Befreiung von der Medicare Levy und der Abzüge, die für die von dir tatsächlich geleistete Arbeit gelten, und bereiten anschließend deine Steuererklärung auf Basis der von dir bereitgestellten Informationen vor und reichen sie ein. Die anfallende Gebühr wird dir offengelegt und von dir akzeptiert, bevor die Beauftragung beginnt, und ist im Voraus zahlbar. Alle endgültigen Steuerbescheide, Rückzahlungen oder Entscheidungen werden ausschließlich vom ATO getroffen. Wir garantieren nicht:',
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
    body: 'Unser Service hat eine einzige Gebühr, die von der Art deiner Einkünfte abhängt. Die anfallende Gebühr wird dir offengelegt und von dir akzeptiert, bevor die Arbeit beginnt, und ist im Voraus zahlbar.',
    items: [
      'Steuererklärung, nur TFN-Einkünfte (AUD 220 $, inkl. GST): die vollständige Beauftragung, die die Prüfung deiner Situation sowie die Vorbereitung und Einreichung deiner Steuererklärung umfasst.',
      'Steuererklärung, TFN- und ABN-Einkünfte (AUD 385 $, inkl. GST): wie oben, wenn du zusätzlich Einkünfte unter einer Australian Business Number erhalten hast, was die Abstimmung deiner Betriebseinnahmen und Betriebsausgaben und die Berücksichtigung deiner GST-Position erfordert.',
      'Garantie bei zu geringer Rückzahlung: fällt die Rückzahlung, die du erhältst, geringer aus als die von dir gezahlte Gebühr, erstatten wir dir die Differenz, sodass du für unseren Service nie draufzahlst. Steht dir überhaupt keine Rückzahlung zu, wird die Gebühr vollständig erstattet.',
      'Die Gebühr wird für die erbrachte fachliche Arbeit berechnet. Sie ist ein fester Betrag und wird nie als Prozentsatz deiner Rückzahlung berechnet.',
      'Steuererklärung vorbereitet und zur Freigabe bereitgestellt: haben wir deine Steuererklärung fertiggestellt und dir zur Prüfung, Freigabe oder Unterschrift bereitgestellt, ist die Gebühr in voller Höhe fällig, unabhängig davon, ob du uns anschließend zur Einreichung ermächtigst. Zu diesem Zeitpunkt ist die Arbeit erbracht und übergeben; offen ist nur noch die Einreichung als administrativer Schritt. Dies gilt nicht, wenn du zurücktrittst, weil wir den Service nicht mit der gebotenen Sorgfalt und Fachkunde erbracht oder die Verbrauchergarantien nach dem Australian Consumer Law nicht erfüllt haben.',
      'Arbeiten außerhalb des Umfangs einer üblichen Einkommensteuererklärung (zum Beispiel Erklärungen für Vorjahre, zusätzliche Geschäftsanlagen oder Korrekturen bereits eingereichter Erklärungen) werden vor Arbeitsbeginn separat angeboten und schriftlich vereinbart.',
      'Nichts in dieser Klausel beschränkt, schließt aus oder ändert Rechte oder Ansprüche, die dir nach dem Australian Consumer Law zustehen.',
    ],
  },
  {
    title: '7. Zahlungsbedingungen',
    body: 'Die Gebühr ist im Voraus zahlbar. Sobald die Zahlung eingegangen ist, senden wir dir den vollständigen Fragebogen und beginnen mit der Arbeit. Die Zahlung beeinflusst oder garantiert weder deine Rückzahlung noch das ATO-Ergebnis und unterliegt der Garantie bei zu geringer Rückzahlung nach Klausel 6.',
  },
  {
    title: '8. Haftungsbeschränkung',
    body: 'Bestimmte Garantien nach dem Australian Consumer Law können nicht ausgeschlossen, eingeschränkt oder geändert werden; diese Vereinbarung versucht dies auch nicht. Vorbehaltlich dieser Garantien und soweit gesetzlich zulässig ist der Anbieter nicht verantwortlich für:',
    items: [
      'Entscheidungen, Verzögerungen, Prüfungen oder Bescheide des ATO.',
      'Finanzielle Verluste, Strafen oder Ergebnisse, die aus ATO-Maßnahmen resultieren.',
      'Probleme, die durch unrichtige, unvollständige oder irreführende Informationen des Mandanten entstehen.',
      'Soweit der Anbieter haftet und die Verbrauchergarantien dies zulassen, ist die Haftung nach Wahl des Anbieters auf die erneute Erbringung des Service oder auf die Erstattung der gezahlten Gebühren beschränkt.',
    ],
  },
  {
    title: '9. Freistellung',
    body: 'Du stimmst zu, den Anbieter, einschließlich seiner Direktoren, Mitarbeiter und Auftragnehmer, von angemessenen Ansprüchen, Verlusten und Aufwendungen freizustellen, soweit diese verursacht wurden durch:',
    items: [
      'Unrichtige, unvollständige oder irreführende Informationen, die du bereitgestellt hast.',
      'Deine Nichterfüllung deiner Steuerpflichten.',
      'Diese Freistellung gilt nicht, soweit ein Anspruch, Verlust oder Aufwand durch eigene Fahrlässigkeit des Anbieters, einen Verstoß gegen diese Vereinbarung oder einen Gesetzesverstoß verursacht oder mitverursacht wurde.',
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
    body: 'Der Anbieter erbringt den Service mit der gebotenen Sorgfalt und Fachkunde, wie es das Australian Consumer Law verlangt. Der Anbieter garantiert jedoch weder eine Steuerrückzahlung, deren Höhe noch ein bestimmtes finanzielles Ergebnis, da diese ausschließlich vom ATO bestimmt werden. Unsere Verantwortung beschränkt sich auf die Vorbereitung und Einreichung deiner Steuererklärung auf Basis der von dir bereitgestellten Informationen. Der Anbieter kann Teile des Service aussetzen, ändern oder einstellen; betrifft dies eine bereits bezahlte Leistung, wird dir die entsprechende Gebühr erstattet.',
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
    body: 'Beide Parteien können diese Vereinbarung jederzeit kündigen. Die Kündigung berührt keine Gebühr, die nach Klausel 6 für vor der Kündigung erbrachte Arbeit bereits fällig geworden ist. Der Anbieter kann den Service sofort aussetzen oder beenden, wenn:',
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
  {
    title: '22. Rückzahlungen, ATO-Schulden und Verrechnung',
    body: 'Deine Rückzahlung wird vom ATO geleistet, nicht vom Anbieter. Bitte beachte:',
    items: [
      'Das ATO kann deine Rückzahlung kürzen oder einbehalten, um bestehende Schulden zu verrechnen - etwa Steuerschulden, HELP-Studienschulden, Unterhaltsverpflichtungen oder Schulden bei einer anderen Behörde.',
      'Eine solche Verrechnung ändert nichts an der nach Klausel 6 fälligen Gebühr und löst die Garantie bei zu geringer Rückzahlung nicht aus, da der verrechnete Betrag auf eine von dir geschuldete Verbindlichkeit angerechnet und nicht verloren wurde. Die Gebühr wird für die erbrachte fachliche Arbeit berechnet und nicht für die Höhe der letztlich erhaltenen Rückzahlung.',
      'Die Rückzahlung geht direkt auf das von dir angegebene Bankkonto. Der Anbieter erhält, verwahrt oder verrechnet keine Gebühren aus deiner Rückzahlung.',
      'Du bist für die Richtigkeit der angegebenen Bankdaten verantwortlich. Der Anbieter haftet nicht für eine Rückzahlung auf ein falsches Konto, wenn die Daten von dir stammen.',
      'Bei einem ausländischen Konto richten sich Zahlungsdauer und Bankgebühren nach dem ATO und den beteiligten Banken.',
    ],
  },
  {
    title: '23. Stornierung und Widerruf',
    body: 'Du kannst diese Vereinbarung jederzeit schriftlich kündigen. Die Folgen sind:',
    items: [
      'Bevor wir mit der Arbeit an deiner Steuererklärung beginnen, wird dir die Gebühr vollständig erstattet.',
      'Sobald wir mit der Arbeit begonnen haben, richtet sich die Zahlungspflicht nach Klausel 6.',
      'Handelt es sich um einen unaufgefordert zustande gekommenen Verbrauchervertrag im Sinne des Australian Consumer Law (etwa wenn wir dich zuerst kontaktiert haben), steht dir eine gesetzliche Widerrufsfrist von 10 Werktagen zu. In dieser Zeit erbringen wir keine kostenpflichtigen Leistungen und nehmen keine Zahlung an, sofern du uns nicht ausdrücklich darum bittest und das Gesetz dies erlaubt.',
      'Nichts in dieser Klausel beschränkt deine gesetzlichen Ansprüche, wenn der Service nicht mit der gebotenen Sorgfalt und Fachkunde erbracht wurde.',
    ],
  },
  {
    title: '24. Beschwerden',
    body: 'Wenn du mit einem Teil des Service nicht zufrieden bist, möchten wir davon erfahren und gemeinsam eine Lösung finden:',
    items: [
      'Melde dich zuerst bei uns über die Kontaktdaten auf unserer Kontaktseite. Wir bestätigen deine Beschwerde und antworten in der Regel innerhalb von 14 Tagen.',
      'Nichts in dieser Vereinbarung hindert dich daran, eine Beschwerde bei einer Aufsichtsbehörde einzureichen.',
    ],
  },
  {
    title: '25. Unterlagen und Dokumente',
    body: 'Der Anbieter bewahrt Mandantenunterlagen für die nach australischem Steuerrecht und TPB-Vorgaben erforderlichen Zeiträume auf, in der Regel mindestens fünf Jahre. Du kannst jederzeit und kostenlos eine Kopie der von dir bereitgestellten Unterlagen sowie der für dich erstellten Steuererklärung anfordern.',
  },
  {
    title: '26. Änderungen dieser Vereinbarung',
    body: 'Der Anbieter kann diese Bedingungen von Zeit zu Zeit aktualisieren. Für eine Beauftragung gilt die Fassung, die zum Zeitpunkt der Beauftragung in Kraft war. Wesentliche Änderungen werden auf dieser Seite mit aktualisiertem Datum veröffentlicht; bereits laufende Beauftragungen werden nach den ursprünglich geltenden Bedingungen fortgeführt.',
  },
]

export default function GermanClientAgreementPage() {
  return (
    <>
      <PageHeader
        kicker="Rechtliches"
        title="Mandantenvereinbarung"
        titleEm=""
        sub="Zuletzt aktualisiert: August 2026. Durch die Nutzung unserer Dienstleistungen stimmst du diesen Bedingungen zu."
        breadcrumbs={[{ label: 'Startseite', href: '/de' }, { label: 'Mandantenvereinbarung' }]}
      />

      <section className="pt-0 pb-10 lg:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl">

            <div className="rounded-xl px-5 py-4 mb-8" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
              <p className="text-[13px] font-light text-body leading-[1.75]">
                Working Holiday Tax ist unter der Aufsicht eines registrierten Steueragenten tätig:{' '}
                <strong className="font-semibold text-ink">{AGENT_NAME} (ABN: {AGENT_ABN}), Tax Agent Number {AGENT_TPB}</strong>.
              </p>
            </div>

            <p className="text-[13px] font-light text-body leading-[1.75] mb-8">
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
