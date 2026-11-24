import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Mark } from '@/components/wht/Type'
import { blocks } from '@/components/wht/Blocks'
import { WaButton } from '@/components/wht/WaButton'
import { dePostTranslations } from '@/app/(de)/de/blog/data'
import {
  LeavingAustraliaPage, LinkList, SRC, StepList, StepTable, leavingLanguages, makeGuides,
} from '@/app/(site)/leaving-australia/LeavingAustraliaPage'

/*
 * DE-Hub: Australien verlassen (Plan 3, Runde 2, 24. Nov 2026). Gleiche Fakten wie
 * /leaving-australia (r16, r13, r14, r20), du-Form, Ratgeber nur verlinkt, wenn es
 * sie auf Deutsch gibt.
 */

const WA = waUrl({ topic: 'tax-return', lang: 'de', detail: 'ich verlasse Australien' })
const G = makeGuides('/de', s => !!dePostTranslations[s]?.body, ' (auf Englisch)')

export const metadata: Metadata = {
  title: { absolute: 'Australien verlassen: Steuererklärung und Super (2026)' },
  description:
    'Du verlässt Australien nach Work and Travel? Was vor dem Abflug zu tun ist und was danach: Steuererklärung, Super (DASP), Konto und myGov, der Reihe nach.',
  keywords: [
    'Australien verlassen Steuererklärung',
    'Ausreise Australien Checkliste Work and Travel',
    'Steuererklärung nach Ausreise Australien',
    'Super nach Ausreise beantragen',
    'DASP nach Ausreise',
    'australisches Konto kündigen Ausreise',
    'Steuererklärung vor Abreise Australien',
    'Work and Travel Australien Rückkehr Steuer',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/leaving-australia`,
    languages: leavingLanguages(),
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/leaving-australia`,
    siteName: 'Working Holiday Tax',
    title: 'Australien verlassen: Steuererklärung und Super in der richtigen Reihenfolge',
    description: 'Was vor dem Abflug zu tun ist, was danach noch offen ist und in welcher Reihenfolge.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'Australien verlassen: Steuer und Super',
    description: 'Vor dem Abflug, nach der Ausreise und was warten kann.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const src = (href: string, text: string) => (
  <a href={href} target="_blank" rel="noopener" className={blocks.textLink}>{text}</a>
)

const faqs = [
  {
    question: 'Kann ich die Steuererklärung schon vor der Abreise machen?',
    answer:
      'Nur in einem Fall. Verlässt du Australien endgültig und hast danach keine australischen Einkünfte außer Zinsen, Dividenden oder Lizenzgebühren mehr, nimmt das ATO die Erklärung schon vor dem Ende des Steuerjahres am 30. Juni an. Reichst du selbst ein, geht das nur auf dem Papierformular, und laut ATO dauert die Bearbeitung dann 50 Arbeitstage.\n\nAlle anderen reichen ab dem 1. Juli ein, von wo auch immer. Durch das Warten geht nichts verloren.',
  },
  {
    question: 'Kann ich die Steuererklärung nach der Ausreise noch machen?',
    answer:
      'Ja. Eine Erklärung umfasst den 1. Juli bis 30. Juni und kann ab dem 1. Juli aus jedem Land eingereicht werden. Reichst du selbst ein, ist sie bis zum 31. Oktober fällig, und laut ATO werden die meisten Online-Erklärungen innerhalb von 10 Arbeitstagen bearbeitet. Eine Erstattung geht auf ein australisches Konto.',
  },
  {
    question: 'Soll ich mein australisches Konto vor der Abreise kündigen?',
    answer:
      'Nein, erst wenn Erstattung und Super angekommen sind. Das ATO zahlt Steuererstattungen nur auf ein australisches Konto, und Super, die beim ATO liegt, nur auf ein australisches Konto auf deinen Namen oder per Scheck.\n\nIst das Konto schon zu, geht die Zahlung über die Reserve Bank ans ATO zurück, was bis zu 10 Tage dauern kann. Mit neuen australischen Kontodaten zahlt das ATO erneut, ohne sie stellt es einen Scheck aus. Manche Scheck-Erstattungen hält das ATO bis zu 90 Tage zurück, während es nach Kontodaten fragt.',
  },
  {
    question: 'Wann kann ich nach der Ausreise meine Super beantragen?',
    answer:
      'Sobald drei Dinge gleichzeitig zutreffen: Dein Visum ist abgelaufen oder aufgehoben, du hast Australien verlassen, und du hast kein anderes gültiges australisches Visum. Den Online-Antrag des ATO kannst du vor dem Abflug anlegen, abschicken aber erst danach. Laut ATO wird die DASP in der Regel innerhalb von 28 Tagen nach Eingang des vollständigen Antrags gezahlt.',
  },
  {
    question: 'Was passiert mit meiner Super, wenn ich sie nicht beantrage?',
    answer:
      'Sie geht nicht verloren. Bist du seit mindestens 6 Monaten weg und ist dein Visum beendet, überweist dein Fonds das Guthaben ans ATO. Dort kannst du es jederzeit als DASP beantragen, aber das ATO zahlt es nur auf ein australisches Konto auf deinen Namen oder per Scheck, nicht ins Ausland.',
  },
  {
    question: 'Brauche ich nach der Ausreise noch myGov?',
    answer:
      'Für uns nicht. Wir regeln das direkt mit dem ATO, du brauchst also kein myGov, damit wir deine Steuererklärung vorbereiten. Der DASP-Online-Antrag des ATO läuft auch ohne myGov-Anmeldung. myGov brauchst du nur, wenn du selbst über myTax einreichen willst, und die SMS-Codes gehen nur an eine australische Handynummer.',
  },
  {
    question: 'Ist der Super-Antrag dasselbe wie die Steuererstattung?',
    answer:
      'Nein, das sind zwei getrennte Zahlungen. Die Steuererstattung ist zu viel einbehaltene Lohnsteuer und kommt vom ATO, nachdem du eine Erklärung eingereicht hast. Die DASP ist die Super, die deine Arbeitgeber zusätzlich zum Lohn eingezahlt haben, und sie kommt von jedem Fonds, sobald dein Visum beendet ist. Viele haben beides offen.',
  },
  {
    question: 'Kann die Steuererstattung auf ein Konto in Deutschland gehen?',
    answer:
      'Nein. Das ATO zahlt Steuererstattungen nur auf ein australisches Konto. Bei der Super ist es anders: Ein Fonds kann eine DASP per Auslandsüberweisung zahlen, wenn er das anbietet. Super, die schon beim ATO liegt, geht aber nur auf ein australisches Konto oder per Scheck.',
  },
  {
    question: 'Ich bin vor Jahren ohne Erklärung abgereist. Ist es zu spät?',
    answer:
      'Nein. Eine verspätete Erklärung lässt sich weiter einreichen, und Super, die liegen geblieben ist, kannst du beim ATO beantragen. Das ATO kann für verspätete Erklärungen eine Strafe verhängen, sagt aber, dass es das bei einzelnen Verspätungen in der Regel nicht tut.',
  },
]

const MYGOV_GUIDES = G.list([
  { slug: 'mygov-problems-tax-return-super', label: 'Kein Zugriff auf myGov: was für Steuer und Super hilft' },
  { slug: 'mygov-sms-code-not-received-overseas', label: 'Kein myGov-SMS-Code im Ausland' },
  { slug: 'mygov-account-locked-out', label: 'myGov-Konto gesperrt' },
  { slug: 'cant-link-ato-to-mygov', label: 'Das ATO lässt sich nicht mit myGov verknüpfen' },
  { slug: 'myid-foreign-passport-working-holiday', label: 'myID mit ausländischem Pass' },
  { slug: 'tax-return-without-mygov', label: 'Steuererklärung ohne myGov' },
  { slug: 'claim-super-without-mygov', label: 'Super ohne myGov beantragen' },
])

const GUIDES = G.list([
  { slug: 'tax-obligations-after-leaving-australia', label: 'Was nach der Abreise noch offen ist' },
  { slug: 'early-tax-return-leaving-australia', label: 'Steuererklärung vor der Abreise' },
  { slug: 'how-to-lodge-tax-return-from-overseas', label: 'Steuererklärung aus dem Ausland einreichen' },
  { slug: 'how-to-update-address-with-ato', label: 'Adresse beim ATO ändern' },
  { slug: 'tax-refund-closed-australian-bank-account', label: 'Erstattung bei gekündigtem australischem Konto' },
  { slug: 'tax-and-super-timeline-working-holiday', label: 'Alle Daten für Steuer und Super 2026/27' },
  { slug: 'how-long-does-dasp-take', label: 'Wie lange ein DASP-Antrag dauert' },
  { slug: 'dasp-online-application-problems', label: 'Wenn der DASP-Online-Antrag nicht klappt' },
  { slug: 'what-happens-to-unclaimed-super', label: 'Super nie beantragt: wo das Geld landet' },
  { slug: 'claim-super-if-coming-back-to-australia', label: 'Super zurückholen, wenn du wiederkommen willst' },
])

export default function LeavingAustraliaDePage() {
  return (
    <LeavingAustraliaPage
      lang="de"
      inLanguage="de-DE"
      path="/de/leaving-australia"
      homeHref="/de"
      crumb={{ home: 'Startseite', current: 'Australien verlassen', label: 'Brotkrumen' }}
      wa={WA}
      name="Australien verlassen: Steuererklärung und Super in der richtigen Reihenfolge"
      hero={{
        eyebrow: <>Ausreise &middot; Steuererklärung &middot; Super</>,
        title: <>Australien verlassen: <Mark>Steuererklärung und Super</Mark> in der richtigen Reihenfolge</>,
        lead: <>Vor dem Abflug lässt du dein australisches Konto offen, änderst deine Adresse beim ATO und legst den Super-Antrag an. Nach der Ausreise reichst du die Steuererklärung ein, sobald das Steuerjahr am 30. Juni zu Ende ist, und schickst den Super-Antrag (DASP) ab, sobald dein Visum beendet ist. Mit uns brauchst du für beides kein myGov, und wenn du schon weg bist, ist nichts verloren.</>,
        sub: <>Steuererklärung und Super sind zwei getrennte Anträge mit eigenem Zeitplan. Die Steuererstattung kommt vom ATO und geht nur auf ein australisches Konto. Die Super kommt von jedem Fonds, in der Regel innerhalb von 28 Tagen nach einem vollständigen Antrag, und ein Fonds mit Auslandsüberweisung kann sie dir direkt nach Hause zahlen.</>,
        cta: 'Frag uns vor dem Abflug',
        hint: 'Zur Reihenfolge',
        hintHref: '#order',
        note: 'Antwort in etwa einer Stunde.',
      }}
      sections={[
        {
          id: 'before-you-fly',
          title: 'Was solltest du vor der Abreise erledigen?',
          tone: 'pale',
          body: (
            <>
              <p className={blocks.text}>Sechs Dinge, die meisten in wenigen Minuten, und alle sind in Australien leichter als von zu Hause aus.</p>
              <StepList items={[
                {
                  title: 'Lass dein australisches Konto offen.',
                  body: <>Das ATO zahlt Steuererstattungen nur auf ein australisches Konto, und Super, die beim ATO liegt, nur auf ein australisches Konto auf deinen Namen oder per Scheck. Kündige es erst, wenn alles angekommen ist. Schon gekündigt? {G.link('tax-refund-closed-australian-bank-account', 'Erstattung bei gekündigtem Konto')}.</>,
                },
                {
                  title: 'Heb die letzten Lohnzettel auf und notier deine Jobs.',
                  body: <>Jeder Arbeitgeber, der dich über die Lohnabrechnung bezahlt hat, meldet dein Einkommen ans ATO, verlorene Payslips sind also kein Drama. Eine Liste, wo du wann gearbeitet hast, zeigt aber sofort, ob ein Job fehlt, und mit ihr findet man jeden Superfonds.</>,
                },
                {
                  title: 'Ändere deine Adresse beim ATO.',
                  body: <>Briefe, auch dein Notice of Assessment und ein möglicher Scheck, gehen an die Adresse, die das ATO gespeichert hat. So geht&apos;s: {G.link('how-to-update-address-with-ato', 'Adresse beim ATO ändern')}. Wenn wir deine Erklärung vorbereiten, ändern wir die Adresse beim ATO für dich.</>,
                },
                {
                  title: 'Prüf, ob eine vorzeitige Erklärung für dich infrage kommt.',
                  body: <>Vor dem 30. Juni nimmt das ATO eine Erklärung nur an, wenn du endgültig ausreist und danach keine australischen Einkünfte außer Zinsen, Dividenden oder Lizenzgebühren mehr hast. Selbst eingereicht geht das nur auf Papier, und laut ATO dauert die Bearbeitung 50 Arbeitstage. Alle anderen reichen ab dem 1. Juli ein. Mehr unter {G.link('early-tax-return-leaving-australia', 'Steuererklärung vor der Abreise')}.</>,
                },
                {
                  title: 'Leg den Super-Antrag an.',
                  body: <>Den DASP-Online-Antrag des ATO kannst du vor dem Abflug anlegen und speichern und abschicken, sobald du weg bist und dein Visum beendet ist. Liegen bei einem Fonds 5.000 $ oder mehr, kann er beglaubigte Kopien deiner Ausweisdokumente verlangen, und die bekommst du hier leichter als aus dem Ausland.</>,
                },
                {
                  title: 'Kläre die Anmeldung aus dem Ausland, wenn du myGov selbst nutzen willst.',
                  body: <>myGov schickt SMS-Codes nur an eine australische Handynummer. Bist du im Ausland oder ohne australische Nummer, empfiehlt das ATO stattdessen myID, einen Passkey oder eine Authenticator-App. Für uns brauchst du nichts davon.</>,
                },
              ]} />
              <p className={blocks.small}>
                Quellen: ATO, {src(SRC.earlyLodge, 'Erklärung vor der Ausreise')}, {src(SRC.fromOverseas, 'Erklärung aus dem Ausland')}, {src(SRC.dasp, 'DASP')} und {src(SRC.mygov, 'myGov-Konto anlegen und mit dem ATO verknüpfen')}, Stand November 2026.
              </p>
            </>
          ),
        },
        {
          id: 'after-you-leave',
          title: 'Was ist nach der Ausreise noch offen?',
          body: (
            <>
              <p className={blocks.text}>Drei Dinge: die Steuererklärung für das Jahr, in dem du ausgereist bist, deine Super und, nach sechs Monaten, jede Super, die du noch nicht beantragt hast. Alles geht von zu Hause aus.</p>
              <h3 className={blocks.cardTitle}>Die Steuererklärung, nach dem 30. Juni</h3>
              <p className={blocks.text}>
                Das australische Steuerjahr endet am 30. Juni. Ab dem 1. Juli kannst du aus jedem Land einreichen, und wenn du es selbst machst, ist die Erklärung bis zum 31. Oktober fällig. Laut ATO werden die meisten Online-Erklärungen innerhalb von 10 Arbeitstagen bearbeitet, und eine Erstattung geht auf dein australisches Konto. Einreichen musst du, wenn du andere Einkünfte als Lohn als Working Holiday Maker hattest, dein zu versteuerndes Einkommen 45.001 $ oder mehr betrug oder du Abzüge geltend machen willst. Wie es aus dem Ausland läuft:{' '}
                <Link href="/de/tax-return" className={blocks.textLink}>So läuft die Steuererklärung</Link> und {G.link('how-to-lodge-tax-return-from-overseas', 'Erklärung aus dem Ausland einreichen')}.
              </p>
              <h3 className={blocks.cardTitle}>Deine Super (DASP), sobald das Visum beendet ist</h3>
              <p className={blocks.text}>
                Beantragen kannst du, sobald dein Visum abgelaufen oder aufgehoben ist, du Australien verlassen hast und kein anderes gültiges australisches Visum hast. Jeder Fonds ist ein eigener Antrag, in der Regel innerhalb von 28 Tagen nach einem vollständigen Antrag ausgezahlt, und für Working Holiday Maker werden 65 % des steuerpflichtigen Anteils einbehalten. Für Lohn ab dem 1. Juli 2026 muss dein Arbeitgeber den letzten Beitrag innerhalb von 7 Arbeitstagen nach dem Zahltag an deinen Fonds bringen, mit einigen Ausnahmen. Prüf also, ob er angekommen ist, bevor du abschickst. Schritt für Schritt:{' '}
                <Link href="/de/superannuation" className={blocks.textLink}>Superannuation aus Australien zurückholen</Link>. Wenn der Antrag hängt: {G.link('dasp-online-application-problems', 'wenn der DASP-Online-Antrag nicht klappt')}.
              </p>
              <h3 className={blocks.cardTitle}>Super beim ATO, nach 6 Monaten</h3>
              <p className={blocks.text}>
                Hast du nicht beantragt und bist seit mindestens 6 Monaten weg, mit beendetem Visum, überweist dein Fonds das Guthaben ans ATO. Du kannst es jederzeit weiter als DASP beantragen, aber das ATO zahlt es nur auf ein australisches Konto auf deinen Namen oder per Scheck. Mehr unter {G.link('what-happens-to-unclaimed-super', 'Super nie beantragt')}.
              </p>
              <p className={blocks.small}>
                Quellen: ATO, {src(SRC.progress, 'Bearbeitungsstand der Erklärung')}, {src(SRC.dasp, 'DASP')}, {src(SRC.atoHeld, 'Super beim ATO')} und {src(SRC.paydaySuper, 'Payday Super')}, Stand November 2026.
              </p>
            </>
          ),
        },
        {
          id: 'order',
          title: 'In welcher Reihenfolge?',
          tone: 'pale',
          body: (
            <>
              <p className={blocks.text}>Zuerst die Super, weil du sie vor dem Abflug anlegen kannst, dann die Steuererklärung, wenn das Jahr vorbei ist, und das Konto ganz zum Schluss.</p>
              <StepTable
                head={['Wann', 'Was zu tun ist']}
                rows={[
                  { when: 'Vor der letzten Schicht', what: 'Alle Jobs notieren und die letzten Lohnzettel aufheben.' },
                  { when: 'Vor dem Abflug', what: 'Adresse beim ATO ändern, australisches Konto offen lassen, DASP-Antrag anlegen und speichern, beglaubigte Kopien besorgen, wenn ein Fonds 5.000 $ oder mehr hält.' },
                  { when: 'Bis 7 Arbeitstage nach dem letzten Zahltag', what: 'Der letzte Super-Beitrag sollte beim Fonds sein (Payday Super, Lohn ab 1. Juli 2026, mit Ausnahmen).' },
                  { when: 'Nach der Ausreise, Visum beendet', what: 'Den DASP-Antrag abschicken. Jeder Fonds zahlt seinen Teil getrennt aus. In der Regel innerhalb von 28 Tagen nach einem vollständigen Antrag gezahlt.' },
                  { when: 'Ab dem 1. Juli', what: 'Die Steuererklärung für das Jahr der Ausreise einreichen. Fällig am 31. Oktober, wenn du selbst einreichst.' },
                  { when: 'Nach dem Einreichen online', what: 'Laut ATO werden die meisten Online-Erklärungen innerhalb von 10 Arbeitstagen bearbeitet. Eine Erstattung geht auf dein australisches Konto.' },
                  { when: 'Ab 6 Monaten nach der Ausreise, Visum beendet', what: 'Nicht beantragte Super geht ans ATO. Weiter beantragbar, Zahlung nur auf ein australisches Konto oder per Scheck.' },
                  { when: 'Wenn alles angekommen ist', what: 'Das australische Konto kündigen.' },
                ]}
                caption={<>Endgültig vor dem 30. Juni weg und keine australischen Einkünfte mehr? Dann geht die Erklärung auch vorzeitig auf Papier (50 Arbeitstage laut ATO). Alle Daten des Jahres: {G.link('tax-and-super-timeline-working-holiday', 'Steuer und Super 2026/27')}.</>}
              />
            </>
          ),
        },
        {
          id: 'no-mygov',
          title: 'Brauchst du nach der Ausreise myGov?',
          body: (
            <>
              <p className={blocks.text}>
                Nein. Für die Erklärung mit uns brauchst du kein myGov-Konto. Wir regeln das direkt mit dem ATO. Auch der DASP-Online-Antrag des ATO läuft ohne myGov-Anmeldung: Er fragt nach deinen persönlichen Daten, deinem Pass und einer E-Mail-Adresse, die TFN ist freiwillig.
              </p>
              <p className={blocks.text}>
                myGov zählt nur, wenn du selbst über myTax einreichen willst, und die meisten Probleme fangen beim SMS-Code an, der nur an eine australische Nummer geht. Bist du schon ausgesperrt, hilft dir der passende Ratgeber:
              </p>
              <LinkList items={MYGOV_GUIDES} />
            </>
          ),
        },
        {
          id: 'with-us',
          title: 'So helfen wir dir',
          tone: 'amber',
          body: (
            <>
              <p className={blocks.text}>
                Schreib uns, wo du gearbeitet hast und wann du ausreist. Wir bereiten deine{' '}
                <Link href="/de/tax-return" className={blocks.textLink}>Steuererklärung</Link> vor, sobald das Jahr vorbei ist, ändern deine Adresse beim ATO, und bei deiner{' '}
                <Link href="/de/superannuation" className={blocks.textLink}>Super</Link> finden wir jeden Fonds, der mit deiner TFN verknüpft ist, und gehen den Antrag mit dir durch.
              </p>
              <p className={blocks.text}>
                Du brauchst kein myGov. Wir regeln das direkt mit dem ATO. Jede Steuererklärung wird von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird, und Working Holiday Tax ist unter der Aufsicht eines registrierten australischen Tax Agent tätig.
              </p>
              <div className={blocks.stack}>
                <WaButton href={WA} position="section" topic="tax-return" lang="de" size="md">Schreib uns auf WhatsApp</WaButton>
                <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Antwort in etwa einer Stunde.</p>
              </div>
            </>
          ),
        },
      ]}
      faqTitle="Fragen vor und nach der Ausreise"
      faqs={faqs}
      guidesTitle="Ein Schritt im Detail"
      guides={GUIDES}
      cta={{
        title: 'Frag uns vor dem Abflug',
        text: 'Schreib uns, wo du gearbeitet hast und wann du fliegst. Wir sagen dir, was jetzt erledigt sein sollte und was warten kann, bis du zu Hause bist.',
        button: 'Schreib uns auf WhatsApp',
        note: 'Antwort in etwa einer Stunde.',
      }}
    />
  )
}
