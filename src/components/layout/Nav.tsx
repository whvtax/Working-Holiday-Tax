'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { waUrl } from '@/lib/wa'
import { trackWhatsApp } from '@/lib/analytics'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { GoogleReviewsBadge } from '@/components/ui/GoogleReviewsBadge'
import { AGENT_TPB } from '@/lib/constants'
import { LogoMark } from '@/components/wht/LogoMark'
import styles from './Nav.module.css'

const Logo = ({ locale }: { locale: 'en' | 'de' | 'ja' | 'fr' | 'it' | 'es' }) => {
  const href = locale === 'de' ? '/de' : locale === 'ja' ? '/ja' : locale === 'fr' ? '/fr' : locale === 'it' ? '/it' : locale === 'es' ? '/es' : '/'
  const aria = locale === 'es'
    ? 'Working Holiday Tax - Inicio'
    : locale === 'it'
    ? 'Working Holiday Tax - Home'
    : locale === 'fr'
    ? 'Working Holiday Tax - Accueil'
    : locale === 'de'
    ? 'Working Holiday Tax - Startseite'
    : locale === 'ja'
    ? 'Working Holiday Tax - ホーム'
    : 'Working Holiday Tax - Home'
  return (
  <Link href={href} className={styles.brand} aria-label={aria}>
    <LogoMark size={36} />
    <span>Working Holiday Tax</span>
  </Link>
  )
}

// Services that go under the dropdown (5 service pages)
const SERVICES_LINKS = [
  { label: 'TFN Application',    href: '/tfn',            desc: 'Get your Tax File Number' },
  { label: 'ABN Registration',   href: '/abn',            desc: 'Register as a contractor' },
  { label: 'Tax Return',         href: '/tax-return',     desc: 'Lodge your annual return' },
  { label: 'Super Withdrawal',   href: '/superannuation', desc: 'Claim DASP after leaving' },
  { label: 'Medicare',           href: '/medicare',       desc: 'Levy exemption and access' },
] as const

// Expenses by occupation (5 profession pages, under the Expenses dropdown)
const EXPENSES_LINKS = [
  { label: 'All Expenses',       href: '/expenses',                   desc: 'Full deductions guide' },
  { label: 'Delivery Drivers',   href: '/expenses/delivery-drivers',  desc: 'Uber Eats, DoorDash & more' },
  { label: 'Hospitality',        href: '/expenses/hospitality',       desc: 'Bars, cafes & restaurants' },
  { label: 'Farm Work',          href: '/expenses/farm-work',         desc: 'Fruit picking & farm jobs' },
  { label: 'Construction',       href: '/expenses/construction',      desc: 'Tools, PPE & White Card' },
  { label: 'Labouring',          href: '/expenses/labouring',         desc: 'Warehouse & labour hire' },
  { label: 'Cleaners',           href: '/expenses/cleaners',          desc: 'ABN, GST & multi-site travel' },
  { label: 'FIFO',               href: '/expenses/fifo',              desc: 'Zone offset & roster travel' },
] as const

// Top-level links (Services and Expenses are dropdowns, others are direct)
const TOP_LINKS = [
  { label: 'Calculator', href: '/calculator' },
  { label: 'Blog',       href: '/blog' },
  { label: 'Contact',    href: '/contact' },
] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [expensesOpen, setExpensesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const expensesDropdownRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  // Detect locale from URL
  const isGerman = pathname === '/de' || pathname?.startsWith('/de/')
  const isJapanese = pathname === '/ja' || pathname?.startsWith('/ja/')
  const isFrench = pathname === '/fr' || pathname?.startsWith('/fr/')
  const isItalian = pathname === '/it' || pathname?.startsWith('/it/')
  const isSpanish = pathname === '/es' || pathname?.startsWith('/es/')
  const locale: 'en' | 'de' | 'ja' | 'fr' | 'it' | 'es' = isSpanish ? 'es' : isItalian ? 'it' : isFrench ? 'fr' : isJapanese ? 'ja' : isGerman ? 'de' : 'en'
  // Every WhatsApp link on the site carries context now, so the chat does
  // not open on an anonymous "hi" that costs two messages to unpick.
  const waHref = waUrl({ topic: 'general', lang: locale })

  // Localized link sets
  const servicesLinks =
    locale === 'es'
      ? [
          { label: 'Número TFN',               href: '/es/tfn',            desc: 'Obtén tu Tax File Number' },
          { label: 'Registro de ABN',          href: '/es/abn',            desc: 'Trabaja por cuenta propia' },
          { label: 'Declaración de impuestos', href: '/es/tax-return',     desc: 'Presenta tu declaración anual' },
          { label: 'Retiro de la super',       href: '/es/superannuation', desc: 'Recupera el DASP después de irte' },
          { label: 'Medicare',                 href: '/es/medicare',       desc: 'Exención del Medicare levy' },
        ]
      : locale === 'it'
      ? [
          { label: 'Richiesta del TFN',              href: '/it/tfn',            desc: 'Ottieni il tuo Tax File Number' },
          { label: 'Registrazione ABN',         href: '/it/abn',            desc: 'Lavora come autonomo' },
          { label: 'Dichiarazione dei redditi', href: '/it/tax-return',     desc: 'Presenta la dichiarazione annuale' },
          { label: 'Rimborso della super',      href: '/it/superannuation', desc: 'Richiedi il DASP dopo la partenza' },
          { label: 'Medicare',                  href: '/it/medicare',       desc: 'Esenzione dalla Medicare levy' },
        ]
      :     locale === 'fr'
      ? [
          { label: 'Demande de TFN',        href: '/fr/tfn',            desc: 'Obtenez votre Tax File Number' },
          { label: 'Inscription à l’ABN',   href: '/fr/abn',            desc: 'Travaillez en indépendant' },
          { label: 'Tax return',            href: '/fr/tax-return',     desc: 'Déposez votre déclaration annuelle' },
          { label: 'Récupérer sa super',    href: '/fr/superannuation', desc: 'Récupérez votre DASP après votre départ' },
          { label: 'Medicare',              href: '/fr/medicare',       desc: 'Exemption de la Medicare levy' },
        ]
      : locale === 'de'
      ? [
          { label: 'Steuernummer (TFN)',     href: '/de/tfn',            desc: 'Deine TFN beantragen' },
          { label: 'ABN-Registrierung',      href: '/de/abn',            desc: 'Als Selbstständiger arbeiten' },
          { label: 'Steuererklärung',        href: '/de/tax-return',     desc: 'Jahressteuererklärung einreichen' },
          { label: 'Super-Auszahlung (DASP)', href: '/de/superannuation', desc: 'Super nach der Abreise beantragen' },
          { label: 'Medicare',               href: '/de/medicare',       desc: 'Medicare-Levy-Befreiung' },
        ]
      : locale === 'ja'
      ? [
          { label: 'TFN申請',         href: '/ja/tfn',            desc: 'タックスファイルナンバーを取得' },
          { label: 'ABN登録',         href: '/ja/abn',            desc: '個人事業主として働く' },
          { label: 'タックスリターン', href: '/ja/tax-return',     desc: '年次タックスリターンを提出' },
          { label: 'スーパー受取',     href: '/ja/superannuation', desc: '帰国時のDASP申請' },
          { label: 'メディケア',       href: '/ja/medicare',       desc: 'メディケア税免除' },
        ]
      : SERVICES_LINKS

  const expensesLinks =
    locale === 'es'
      ? [
          { label: 'Todos los gastos',   href: '/es/expenses',                   desc: 'La guía completa de deducciones' },
          { label: 'Repartos',           href: '/es/expenses/delivery-drivers',  desc: 'Uber Eats, DoorDash y más' },
          { label: 'Bares y restaurantes', href: '/es/expenses/hospitality',       desc: 'Bares, cafés y restaurantes' },
          { label: 'Trabajo agrícola',   href: '/es/expenses/farm-work',         desc: 'Cosecha de fruta y trabajo en granjas' },
          { label: 'Construcción',       href: '/es/expenses/construction',      desc: 'Herramientas, equipo de protección y White Card' },
          { label: 'Trabajo de peón',  href: '/es/expenses/labouring',         desc: 'Almacenes y agencias de empleo temporal' },
          { label: 'Limpieza',           href: '/es/expenses/cleaners',          desc: 'ABN, GST y traslados entre sitios' },
          { label: 'FIFO',               href: '/es/expenses/fifo',              desc: 'Zone offset y viajes por turnos' },
        ]
      : locale === 'it'
      ? [
          { label: 'Tutte le spese',     href: '/it/expenses',                   desc: 'La guida completa alle deduzioni' },
          { label: 'Consegne',           href: '/it/expenses/delivery-drivers',  desc: 'Uber Eats, DoorDash e altri' },
          { label: 'Ristorazione',       href: '/it/expenses/hospitality',       desc: 'Bar, caffè e ristoranti' },
          { label: 'Lavoro in fattoria', href: '/it/expenses/farm-work',         desc: 'Raccolta della frutta e lavori agricoli' },
          { label: 'Edilizia',           href: '/it/expenses/construction',      desc: 'Attrezzi, DPI e White Card' },
          { label: 'Manovalanza',        href: '/it/expenses/labouring',         desc: 'Magazzini e agenzie interinali' },
          { label: 'Pulizie',            href: '/it/expenses/cleaners',          desc: 'ABN, GST e spostamenti tra più sedi' },
          { label: 'FIFO',               href: '/it/expenses/fifo',              desc: 'Zone offset e trasferte' },
        ]
      :     locale === 'fr'
      ? [
          { label: 'Tous les frais',     href: '/fr/expenses',                   desc: 'Le guide complet des déductions' },
          { label: 'Livraison',          href: '/fr/expenses/delivery-drivers',  desc: 'Uber Eats, DoorDash et autres' },
          { label: 'Restauration',       href: '/fr/expenses/hospitality',       desc: 'Bars, cafés et restaurants' },
          { label: 'Travail agricole',   href: '/fr/expenses/farm-work',         desc: 'Cueillette et travail à la ferme' },
          { label: 'Bâtiment',           href: '/fr/expenses/construction',      desc: 'Outils, EPI et White Card' },
          { label: 'Manutention',        href: '/fr/expenses/labouring',         desc: 'Entrepôts et agences d’intérim' },
          { label: 'Nettoyage',          href: '/fr/expenses/cleaners',          desc: 'ABN, GST et trajets entre sites' },
          { label: 'FIFO',               href: '/fr/expenses/fifo',              desc: 'Zone offset et déplacements en rotation' },
        ]
      : locale === 'de'
      ? [
          { label: 'Alle Ausgaben',        href: '/de/expenses',                   desc: 'Vollständiger Abzugs-Guide' },
          { label: 'Essenslieferung',      href: '/de/expenses/delivery-drivers',  desc: 'Uber Eats, DoorDash & mehr' },
          { label: 'Gastronomie',          href: '/de/expenses/hospitality',       desc: 'Bars, Cafés & Restaurants' },
          { label: 'Farmarbeit',           href: '/de/expenses/farm-work',         desc: 'Obsternte & Farmjobs' },
          { label: 'Bauarbeit',            href: '/de/expenses/construction',      desc: 'Werkzeug, PSA & White Card' },
          { label: 'Hilfsarbeiten',        href: '/de/expenses/labouring',         desc: 'Lager & Zeitarbeit' },
          { label: 'Reinigungskräfte',     href: '/de/expenses/cleaners',          desc: 'ABN, GST & Fahrten zwischen Jobs' },
          { label: 'FIFO',                 href: '/de/expenses/fifo',              desc: 'Zone-Offset & Reisekosten' },
        ]
      : locale === 'ja'
      ? [
          { label: 'すべての経費',       href: '/ja/expenses',                   desc: '控除ガイド全体' },
          { label: 'デリバリー',         href: '/ja/expenses/delivery-drivers',  desc: 'Uber Eats・DoorDashなど' },
          { label: 'ホスピタリティ',     href: '/ja/expenses/hospitality',       desc: 'バー・カフェ・レストラン' },
          { label: 'ファームワーク',     href: '/ja/expenses/farm-work',         desc: '果物の収穫・農場の仕事' },
          { label: '建設業',             href: '/ja/expenses/construction',      desc: '工具・保護具・ホワイトカード' },
          { label: '軽作業',             href: '/ja/expenses/labouring',         desc: '倉庫・人材派遣' },
          { label: '清掃業',             href: '/ja/expenses/cleaners',          desc: 'ABN・GST・現場間の移動' },
          { label: 'FIFO',               href: '/ja/expenses/fifo',              desc: 'ゾーンオフセット・交通費' },
        ]
      : EXPENSES_LINKS

  const topLinks =
    locale === 'es'
      ? [
          { label: 'Calculadora', href: '/es/calculator' },
          { label: 'Blog',        href: '/es/blog' },
          { label: 'Contacto',    href: '/es/contact' },
        ]
      : locale === 'it'
      ? [
          { label: 'Calcolatore', href: '/it/calculator' },
          { label: 'Blog',        href: '/it/blog' },
          { label: 'Contatti',    href: '/it/contact' },
        ]
      :     locale === 'fr'
      ? [
          { label: 'Calculateur', href: '/fr/calculator' },
          { label: 'Blog',       href: '/fr/blog' },
          { label: 'Contact',    href: '/fr/contact' },
        ]
      : locale === 'de'
      ? [
          { label: 'Rechner',  href: '/de/calculator' },
          { label: 'Blog',     href: '/de/blog' },
          { label: 'Kontakt',  href: '/de/contact' },
        ]
      : locale === 'ja'
      ? [
          { label: '計算ツール',       href: '/ja/calculator' },
          { label: 'ブログ',           href: '/ja/blog' },
          { label: 'お問い合わせ',    href: '/ja/contact' },
        ]
      : TOP_LINKS

  const servicesLabel =
    locale === 'es' ? 'Servicios' :
    locale === 'it' ? 'Servizi' :
    locale === 'fr' ? 'Services' :
    locale === 'de' ? 'Leistungen' :
    locale === 'ja' ? 'サービス' :
    'Services'
  const expensesLabel =
    locale === 'es' ? 'Gastos deducibles' :
    locale === 'it' ? 'Spese deducibili' :
    locale === 'fr' ? 'Frais déductibles' :
    locale === 'de' ? 'Ausgaben' :
    locale === 'ja' ? '経費' :
    'Expenses'
  const ctaLabel =
    locale === 'es' ? 'Empezar mi declaración' :
    locale === 'it' ? 'Inizia la tua dichiarazione' :
    locale === 'fr' ? 'Démarrer ma déclaration' :
    locale === 'de' ? 'Steuererklärung starten' :
    locale === 'ja' ? 'タックスリターンを依頼する' :
    'Start your tax return'

  // Sticky background after scroll
  useEffect(() => {
    let rafId = 0
    const fn = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 12))
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => { window.removeEventListener('scroll', fn); cancelAnimationFrame(rafId) }
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!servicesOpen) return
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [servicesOpen])

  // Close expenses dropdown when clicking outside
  useEffect(() => {
    if (!expensesOpen) return
    const onClick = (e: MouseEvent) => {
      if (expensesDropdownRef.current && !expensesDropdownRef.current.contains(e.target as Node)) {
        setExpensesOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [expensesOpen])

  // Close dropdown on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // The drawer goes inert when it closes; if focus was inside it, hand
        // focus back to the burger so keyboard users keep their place.
        if (drawerRef.current?.contains(document.activeElement)) burgerRef.current?.focus()
        setServicesOpen(false)
        setExpensesOpen(false)
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setOpen(false)
  const isServicePage = servicesLinks.some(s => pathname === s.href)
  const isExpensePage = expensesLinks.some(e => pathname === e.href)

  const chevron = (isOpen: boolean) => (
    <svg className={styles.chev} width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} aria-hidden="true">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const dropdown = (
    ref: React.RefObject<HTMLDivElement | null>,
    label: string,
    links: ReadonlyArray<{ label: string; href: string; desc: string }>,
    isOpen: boolean,
    setIsOpen: (v: boolean) => void,
    isActivePage: boolean,
  ) => (
    <div ref={ref} className={styles.drop}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className={`${styles.dropBtn} ${isActivePage ? styles.active : ''}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        {chevron(isOpen)}
      </button>
      {isOpen && (
        <div onMouseLeave={() => setIsOpen(false)} className={styles.panel}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setIsOpen(false)}
              className={`${styles.item} ${pathname === l.href ? styles.itemActive : ''}`}
            >
              <div className={styles.itemLabel}>{l.label}</div>
              <div className={styles.itemDesc}>{l.desc}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* White bar on every page and language (shared layout system, ADR 012):
          brand left, text links and the two dropdowns, language selector and
          the forest pill on the right. The scrolled state only adds a shadow. */}
      <nav className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.bar}>
          <Logo locale={locale} />

          <div className={styles.desktop}>
            {dropdown(dropdownRef, servicesLabel, servicesLinks, servicesOpen, setServicesOpen, isServicePage)}
            {dropdown(expensesDropdownRef, expensesLabel, expensesLinks, expensesOpen, setExpensesOpen, isExpensePage)}
            {topLinks.map(l => {
              const active = pathname === l.href || (l.href.endsWith('/blog') && pathname?.startsWith(l.href))
              return (
                <Link key={l.href} href={l.href} className={`${styles.link} ${active ? styles.active : ''}`}>
                  {l.label}
                </Link>
              )
            })}
          </div>

          <div className={styles.right}>
            <LanguageSwitcher variant="desktop" />
            <a
              href={waHref}
              onClick={() => trackWhatsApp({ position: 'nav', lang: locale })}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              {ctaLabel}
            </a>
          </div>

          <div className={styles.mobileTools}>
            <LanguageSwitcher variant="desktop" />
            <button type="button" ref={burgerRef} onClick={() => setOpen(!open)}
              aria-label={
                open
                  ? (locale === 'es' ? 'Cerrar el menú' : locale === 'it' ? 'Chiudi il menu' : locale === 'fr' ? 'Fermer le menu' : locale === 'de' ? 'Menü schließen' : locale === 'ja' ? 'メニューを閉じる' : 'Close menu')
                  : (locale === 'es' ? 'Abrir el menú' : locale === 'it' ? 'Apri il menu' : locale === 'fr' ? 'Ouvrir le menu' : locale === 'de' ? 'Menü öffnen' : locale === 'ja' ? 'メニューを開く' : 'Open menu')
              }
              aria-expanded={open}
              className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}>
              <span />
              <span />
              <span className={open ? '' : styles.short} />
            </button>
          </div>
        </div>
      </nav>

      {/* Phone menu. When closed it is off screen, `inert` (no focus, no
          announcement, no prefetch of hidden links) and aria-hidden. Groups are
          native collapsible blocks, so every link stays in the HTML. The
          Google badge and the registered agent seal sit above the WhatsApp
          button, which is pinned at the bottom. */}
      <div
        ref={drawerRef}
        {...(open ? {} : { inert: '' as unknown as boolean })}
        aria-hidden={!open}
        className={`${styles.drawer} ${open ? '' : styles.drawerClosed}`}
      >
        <div className={styles.scroll}>
          <details className={styles.group}>
            <summary>{servicesLabel}</summary>
            <ul>{servicesLinks.map(l => <li key={l.href}><Link href={l.href} onClick={close}>{l.label}</Link></li>)}</ul>
          </details>
          <details className={styles.group}>
            <summary>{expensesLabel}</summary>
            <ul>{expensesLinks.map(l => <li key={l.href}><Link href={l.href} onClick={close}>{l.label}</Link></li>)}</ul>
          </details>
          <ul className={styles.list}>
            {topLinks.map(l => <li key={l.href}><Link href={l.href} onClick={close}>{l.label}</Link></li>)}
          </ul>
        </div>
        <div className={styles.panelCta}>
          {/* Trust marks: the Google rating and the registered tax agent seal,
              the same pair as the header of the tax refund form. */}
          <div className={styles.trust}>
            <GoogleReviewsBadge lang={locale} />
            <img
              src="/assets/tpb-registered.png"
              alt={`${locale === 'es' ? 'Bajo la supervisión de un agente fiscal registrado, n.º' : locale === 'it' ? 'Sotto la supervisione di un agente fiscale registrato, n.' : locale === 'fr' ? 'Sous la supervision d’un agent fiscal enregistré, n°' : locale === 'de' ? 'Unter der Aufsicht eines registrierten Tax Agent, Nr.' : locale === 'ja' ? '監督するタックスエージェントの登録番号' : 'Supervising registered tax agent no.'} ${AGENT_TPB}`}
              width={509}
              height={319}
              loading="lazy"
              decoding="async"
            />
          </div>
          <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => { trackWhatsApp({ position: 'nav', lang: locale }); close() }} className={styles.panelWa}>
            {ctaLabel} →
          </a>
        </div>
      </div>
    </>
  )
}
