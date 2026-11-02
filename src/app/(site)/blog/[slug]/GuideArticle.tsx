'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import MobileTOC from './MobileTOC'
import ReadingProgress from './ReadingProgress'
import { trackEvent } from './../analytics'
import { waUrl, type WaTopic } from '@/lib/wa'
import { trackGuideCta, trackWhatsApp } from '@/lib/analytics'
import { blog } from '@/components/wht/BlogBlocks'

interface Guide {
  slug: string
  title: string
  description: string
  body: string
  date: string
  readTime: number
  category: string
}

type Locale = 'en' | 'de' | 'ja' | 'fr' | 'it' | 'es'

// Localized UI strings for the article component
const ARTICLE_UI = {
  en: {
    quickAnswerLabel: 'Quick answer',
    onThisPage: 'On this page',
    shareThisArticle: 'Share this article:',
    shareCopy: 'Copy link',
    shareCopied: '✓ Copied!',
    shareWhatsApp: 'Share on WhatsApp',
    backToBlog: 'Back to Blog',
    tocAriaLabel: 'Table of contents',
  },
  de: {
    quickAnswerLabel: 'Schnelle Antwort',
    onThisPage: 'Inhaltsverzeichnis',
    shareThisArticle: 'Diesen Artikel teilen:',
    shareCopy: 'Link kopieren',
    shareCopied: '✓ Kopiert!',
    shareWhatsApp: 'Per WhatsApp teilen',
    backToBlog: 'Zurück zum Blog',
    tocAriaLabel: 'Inhaltsverzeichnis',
  },
  ja: {
    quickAnswerLabel: '結論',
    onThisPage: '目次',
    shareThisArticle: 'この記事をシェア：',
    shareCopy: 'リンクをコピー',
    shareCopied: '✓ コピーしました！',
    shareWhatsApp: 'WhatsAppでシェア',
    backToBlog: 'ブログ一覧へ戻る',
    tocAriaLabel: '目次',
  },
  fr: {
    quickAnswerLabel: 'Réponse rapide',
    onThisPage: 'Sommaire',
    shareThisArticle: 'Partager cet article :',
    shareCopy: 'Copier le lien',
    shareCopied: '✓ Copié !',
    shareWhatsApp: 'Partager sur WhatsApp',
    backToBlog: 'Retour au blog',
    tocAriaLabel: 'Sommaire',
  },
  it: {
    quickAnswerLabel: 'Risposta rapida',
    onThisPage: 'Indice',
    shareThisArticle: 'Condividi questo articolo:',
    shareCopy: 'Copia il link',
    shareCopied: '✓ Copiato!',
    shareWhatsApp: 'Condividi su WhatsApp',
    backToBlog: 'Torna al blog',
    tocAriaLabel: 'Indice',
  },
  es: {
    quickAnswerLabel: 'Respuesta rápida',
    onThisPage: 'Contenido',
    shareThisArticle: 'Compartir este artículo:',
    shareCopy: 'Copiar enlace',
    shareCopied: '✓ ¡Copiado!',
    shareWhatsApp: 'Compartir por WhatsApp',
    backToBlog: 'Volver al blog',
    tocAriaLabel: 'Contenido',
  },
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/* ── The one in body CTA ──────────────────────────────────────────────────
   A reader who is already convinced should not have to reach the end of a
   2,000 word guide to act. So there is exactly one offer inside the body,
   placed at the close of the third section, and none anywhere else.

   One, not two. More than one and the article stops reading like a guide and
   starts reading like a funnel, which costs the trust the guide just earned,
   and that trust is the only reason the guide converts at all.

   It sits at the END of the third section rather than directly under the
   third H2 on purpose: the paragraph immediately after a question heading is
   what search and AI engines lift as the answer to that question, and it must
   not be an advert.                                                        */

const INLINE_CTA_TOPIC: Record<string, WaTopic> = {
  // See GuideCta: TFN and Work Rights readers are routed to the tax-return chat.
  'TFN': 'tax-return',
  'ABN': 'abn',
  'Tax Return': 'tax-return',
  'Super': 'super',
  'Medicare & Other': 'medicare',
  'Work Rights': 'tax-return',
}

interface InlineCopy { body: string; cta: string }

const INLINE_CTA_COPY: Record<Locale, Record<string, InlineCopy>> = {
  en: {
    'TFN': {
      // Conversion (Oct 2026): the TFN cluster takes ~54k impressions a quarter and
      // its reader is usually mid-problem, often already withheld at 45%. The copy
      // names that moment and reuses the site's own line on over-withheld tax.
      // No amount, no promise.
      body: 'Taxed at 45% before your TFN reached payroll? Nothing is lost permanently, because over-withheld tax comes back when the return is lodged. Tell us where you worked and we will tell you where your year stands.',
      cta: 'Check my year on WhatsApp',
    },
    'ABN': {
      body: 'If you invoiced under an ABN as well as working on a TFN, that split is what decides your return. Send us what you did and we will work out where you stand.',
      cta: 'Ask us on WhatsApp',
    },
    'Tax Return': {
      body: 'If you would rather not work this out on your own, tell us about the year you had and we will tell you what it means for your return.',
      cta: 'Message us on WhatsApp',
    },
    'Super': {
      body: 'If you would rather we found every fund sitting under your TFN and lodged the claim once, send us your details.',
      cta: 'Ask about your super',
    },
    'Medicare & Other': {
      body: 'Not sure whether the exemption applies to you? Tell us which passport you hold and whether you ever enrolled, and we will check it.',
      cta: 'Ask us on WhatsApp',
    },
    'Work Rights': {
      body: 'If any of this touched your pay or your hours, it usually shows up in your tax return as well. We are on WhatsApp if you want to ask.',
      cta: 'Ask us a question',
    },
  },
  de: {
    'TFN': {
      body: 'Mit 45 % besteuert, bevor deine TFN bei der Lohnabrechnung war? Dauerhaft verloren ist nichts, denn zu viel einbehaltene Steuer kommt mit der Erklärung zurück. Sag uns, wo du gearbeitet hast, und wir sagen dir, wie dein Jahr aussieht.',
      cta: 'Mein Jahr auf WhatsApp prüfen',
    },
    'ABN': {
      body: 'Wenn du neben der TFN auch über eine ABN abgerechnet hast, entscheidet genau diese Aufteilung über deine Steuererklärung. Schick uns, was du gemacht hast.',
      cta: 'Frag uns auf WhatsApp',
    },
    'Tax Return': {
      body: 'Wenn du das nicht selbst durchrechnen willst: Erzähl uns von deinem Jahr und wir sagen dir, was es für deine Steuererklärung bedeutet.',
      cta: 'Schreib uns auf WhatsApp',
    },
    'Super': {
      body: 'Wenn wir alle Fonds unter deiner TFN finden und den Antrag einmal richtig stellen sollen, schick uns deine Daten.',
      cta: 'Frag zu deiner Super',
    },
    'Medicare & Other': {
      body: 'Nicht sicher, ob die Befreiung für dich gilt? Sag uns, welchen Pass du hast und ob du jemals angemeldet warst, und wir prüfen es.',
      cta: 'Frag uns auf WhatsApp',
    },
    'Work Rights': {
      body: 'Wenn davon etwas deinen Lohn oder deine Stunden betrifft, taucht es meistens auch in deiner Steuererklärung auf. Wir sind auf WhatsApp.',
      cta: 'Stell uns eine Frage',
    },
  },
  ja: {
    'TFN': {
      body: 'TFNが雇用主に届く前に45%で源泉徴収されていませんか？取られすぎた税金は申告すれば戻ってくるので、失われたわけではありません。どこで働いたかを教えてください。あなたの1年がどうなっているかお伝えします。',
      cta: 'WhatsAppで自分の1年を確認する',
    },
    'ABN': {
      body: 'TFNでの就労に加えてABNでも請求していた場合、その切り分けが申告内容を左右します。何をしたか送ってください。',
      cta: 'WhatsAppで相談する',
    },
    'Tax Return': {
      body: '自分で計算したくない場合は、あなたの1年の内容を送ってください。申告にとって何を意味するかお伝えします。',
      cta: 'WhatsAppで相談する',
    },
    'Super': {
      body: 'TFNからすべてのファンドを探して一度で申請してほしい場合は、詳細を送ってください。',
      cta: 'スーパーについて相談する',
    },
    'Medicare & Other': {
      body: '免除の対象かどうか分からない場合は、お持ちのパスポートと、メディケアに登録したことがあるかを教えてください。こちらで確認します。',
      cta: 'WhatsAppで相談する',
    },
    'Work Rights': {
      body: '給与や労働時間に関わることは、たいていタックスリターンにも表れます。質問があればWhatsAppでどうぞ。',
      cta: '質問する',
    },
  },
  fr: {
    'TFN': {
      body: "Imposé à 45\xa0% avant que votre TFN arrive à la paie\xa0? Rien n'est perdu définitivement\xa0: l'impôt retenu en trop revient lors du dépôt de la tax return. Dites-nous où vous avez travaillé et nous vous dirons où en est votre année.",
      cta: 'Voir ma situation sur WhatsApp',
    },
    'ABN': {
      body: "Si vous avez aussi facturé sous un ABN en plus de travailler avec un TFN, c'est cette répartition qui décide de votre tax return. Envoyez-nous ce que vous avez fait et nous verrons où vous en êtes.",
      cta: 'Nous écrire sur WhatsApp',
    },
    'Tax Return': {
      body: "Si vous préférez ne pas faire le calcul seul, parlez-nous de l'année que vous avez eue et nous vous dirons ce que cela change pour votre tax return.",
      cta: 'Nous écrire sur WhatsApp',
    },
    'Super': {
      body: 'Si vous préférez que nous retrouvions toutes les caisses rattachées à votre TFN et que nous déposions la demande une seule fois, envoyez-nous vos informations.',
      cta: 'Poser une question sur ma super',
    },
    'Medicare & Other': {
      body: "Pas sûr que l'exemption vous concerne\xa0? Dites-nous quel passeport vous avez et si vous vous êtes déjà inscrit, et nous vérifierons.",
      cta: 'Nous écrire sur WhatsApp',
    },
    'Work Rights': {
      body: 'Si un point de ce guide touche votre paie ou vos heures, il se retrouve souvent dans votre tax return aussi. Nous sommes sur WhatsApp si vous voulez poser une question.',
      cta: 'Poser une question',
    },
  },
  it: {
    'TFN': {
      body: "Tassato al 45% prima che il tuo TFN arrivasse all'ufficio paghe? Non si perde niente in modo definitivo, perché le imposte trattenute in eccesso tornano con la tax return. Dicci dove hai lavorato e ti diciamo a che punto è il tuo anno.",
      cta: 'Controlla il mio anno su WhatsApp',
    },
    'ABN': {
      body: 'Se oltre a lavorare con il TFN hai fatturato anche con un ABN, è proprio questa divisione a decidere la tua tax return. Mandaci quello che hai fatto e capiamo a che punto sei.',
      cta: 'Scrivici su WhatsApp',
    },
    'Tax Return': {
      body: "Se non vuoi fare i conti per conto tuo, raccontaci l'anno che hai avuto e ti diciamo cosa significa per la tua tax return.",
      cta: 'Scrivici su WhatsApp',
    },
    'Super': {
      body: 'Se vuoi che troviamo tutti i fondi collegati al tuo TFN e presentiamo la richiesta una volta sola, mandaci i tuoi dati.',
      cta: 'Chiedi della tua super',
    },
    'Medicare & Other': {
      body: "Non sai se l'esenzione vale per te? Dicci che passaporto hai e se hai mai fatto l'iscrizione a Medicare, e controlliamo.",
      cta: 'Scrivici su WhatsApp',
    },
    'Work Rights': {
      body: 'Se qualcosa di questa guida ha toccato la tua paga o le tue ore, di solito compare anche nella tax return. Siamo su WhatsApp se vuoi chiedere.',
      cta: 'Facci una domanda',
    },
  },
  es: {
    'TFN': {
      body: '¿Te retuvieron el 45\xa0% antes de que tu TFN llegara al payroll? No se pierde nada de forma definitiva, porque el impuesto retenido de más vuelve cuando presentas la tax return. Cuéntanos dónde trabajaste y te diremos cómo va tu año.',
      cta: 'Revisar mi año por WhatsApp',
    },
    'ABN': {
      body: 'Si además de trabajar con TFN facturaste con un ABN, esa división es lo que decide tu tax return. Cuéntanos qué hiciste y vemos cómo estás.',
      cta: 'Escríbenos por WhatsApp',
    },
    'Tax Return': {
      body: 'Si prefieres no hacer las cuentas por tu cuenta, cuéntanos cómo fue tu año y te diremos qué significa para tu tax return.',
      cta: 'Escríbenos por WhatsApp',
    },
    'Super': {
      body: 'Si prefieres que encontremos todos los fondos ligados a tu TFN y presentemos el reclamo una sola vez, envíanos tus datos.',
      cta: 'Consulta sobre tu super',
    },
    'Medicare & Other': {
      body: '¿No sabes si la exención aplica en tu caso? Dinos qué pasaporte tienes y si alguna vez te inscribiste, y lo revisamos.',
      cta: 'Escríbenos por WhatsApp',
    },
    'Work Rights': {
      body: 'Si algo de esta guía afectó tu pago o tus horas, normalmente también aparece en tu tax return. Estamos en WhatsApp si quieres preguntar.',
      cta: 'Haznos una pregunta',
    },
  },
}

function InlineGuideCta({ guide, locale }: { guide: Guide; locale: Locale }) {
  const copy =
    INLINE_CTA_COPY[locale]?.[guide.category] ??
    INLINE_CTA_COPY[locale]?.['Tax Return'] ??
    INLINE_CTA_COPY.en['Tax Return']
  const topic = INLINE_CTA_TOPIC[guide.category] ?? 'guide'
  const href = waUrl({ topic, lang: locale, detail: guide.title })

  const onTap = () => {
    try { navigator.vibrate?.(10) } catch { /* unsupported, which is fine */ }
    trackGuideCta({ slug: guide.slug, category: guide.category, lang: locale, position: 'guide-inline' })
    trackWhatsApp({ position: 'guide-inline', topic, lang: locale })
  }

  return (
    <aside className={blog.inlineCta}>
      <p>{copy.body}</p>
      {/* Layout only. Colour, size and underline come from .guide-inline-cta a
          in the stylesheet; this just gives the link a 44px tap target. */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onTap}
        style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px' }}
      >
        {copy.cta} →
      </a>
    </aside>
  )
}

/**
 * Shortens the first paragraph of the article for the Quick Answer block.
 * Aims for 2-3 sentences or ~280 chars to keep it scannable and Featured-Snippet-friendly.
 */
function shortenQuickAnswer(text: string): string {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (cleaned.length <= 280) return cleaned

  // Try to cut at the end of a sentence
  const sentences = cleaned.match(/[^.!?]+[.!?]+/g) || [cleaned]
  let result = ''
  for (const s of sentences) {
    if ((result + s).length > 280) break
    result += s
  }
  return result.trim() || cleaned.slice(0, 277).trim() + '…'
}

function parseBody(body: string, locale: Locale = 'en', inlineCta?: React.ReactNode) {
  const lines = body.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0
  let i = 0
  let isFirstParagraph = true
  const ui = ARTICLE_UI[locale]

  // The in body CTA goes in at the close of the third section, which is the
  // moment the fourth H2 arrives. Guides with fewer than four H2s never reach
  // that point and correctly get no in body CTA at all: on a short guide the
  // end of guide block is already within reach.
  const totalH2 = lines.filter(l => l.trim().startsWith('## ')).length
  const ctaBeforeH2 = inlineCta && totalH2 >= 4 ? 4 : 0
  let h2Seen = 0

  const renderInline = (raw: string) => {
    return raw
      .replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:600;color:#0B5240;">$1</strong>')
      // A real underline, not a 1px #DCE0DE bottom border at 1.18:1 against
      // white. The border did not read as a link at all, which is the only
      // thing an inline link has to do.
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_: string, text: string, href: string) =>
        `<a href="${href}" style="color:#0B5240;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;font-weight:600;padding:2px 0;">${text}</a>`
      )
  }

  while (i < lines.length) {
    const line = lines[i].trim()

    if (line.startsWith('## ')) {
      const text = line.replace('## ', '')
      const id = slugify(text)
      h2Seen++
      if (ctaBeforeH2 && h2Seen === ctaBeforeH2) {
        elements.push(<div key={key++}>{inlineCta}</div>)
      }
      elements.push(
        <h2
          key={key++}
          id={id}
          className={blog.h2}
        >
          {text}
        </h2>
      )
      i++
      isFirstParagraph = false
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={key++}
          className={blog.h3}
        >
          {line.replace('### ', '')}
        </h3>
      )
      i++
    } else if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().substring(2))
        i++
      }
      elements.push(
        <ul
          key={key++}
          className={blog.list}
        >
          {items.map((item, idx) => (
            <li
              key={idx}
              dangerouslySetInnerHTML={{ __html: renderInline(item) }}
            />
          ))}
        </ul>
      )
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''))
        i++
      }
      elements.push(
        <ol
          key={key++}
          className={blog.list}
        >
          {items.map((item, idx) => (
            <li
              key={idx}
              dangerouslySetInnerHTML={{ __html: renderInline(item) }}
            />
          ))}
        </ol>
      )
    } else if (line.length > 0) {
      if (isFirstParagraph) {
        // Quick Answer block - shortened to 2-3 sentences for AI snippets and quick scanning.
        const quickAnswerText = shortenQuickAnswer(line)
        elements.push(
          <div key={key++} className={blog.quick}>
            <p className={blog.quickLabel}>{ui.quickAnswerLabel}</p>
            <p
              className="quick-answer"
              dangerouslySetInnerHTML={{ __html: renderInline(quickAnswerText) }}
            />
          </div>
        )
        isFirstParagraph = false
      } else {
        elements.push(
          <p
            key={key++}
            className={blog.p}
            dangerouslySetInnerHTML={{ __html: renderInline(line) }}
          />
        )
      }
      i++
    } else {
      i++
    }
  }
  return elements
}

function getHeadings(body: string) {
  return body.trim().split('\n')
    .filter(l => l.trim().startsWith('## '))
    .map(l => {
      const text = l.trim().replace('## ', '')
      return { text, id: slugify(text) }
    })
}

function calcReadTime(body: string) {
  // Japanese has no spaces between words, so a whitespace word count turned
  // every Japanese guide into a "1 minute read". CJK text is timed by
  // characters instead (about 500 a minute); everything else stays at 200
  // words a minute.
  const cjk = (body.match(/[\u3040-\u30ff\u3400-\u9fff\uff66-\uff9f]/g) || []).length
  if (cjk > 200) return Math.max(1, Math.round(cjk / 500))
  const words = body.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export default function GuideArticle({ guide, locale = 'en' }: { guide: Guide; locale?: Locale }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const [activeHeading, setActiveHeading] = useState<string>('')
  const articleRef = useRef<HTMLDivElement>(null)
  const headings = getHeadings(guide.body)
  const readTime = calcReadTime(guide.body)
  const ui = ARTICLE_UI[locale]

  // Page view tracking - fires once per article load
  useEffect(() => {
    trackEvent('blog_article_open', {
      article_slug: guide.slug,
      article_title: guide.title,
      category: guide.category,
      read_time: guide.readTime,
    })
  }, [guide.slug, guide.title, guide.category, guide.readTime])

  useEffect(() => {
    let rafId = 0
    let pending = false
    // Cache heading elements once instead of looking them up on every scroll tick.
    // For long articles with many H2s this avoids dozens of getElementById calls per frame.
    const headingEls = headings
      .map(h => ({ id: h.id, el: document.getElementById(h.id) }))
      .filter((h): h is { id: string; el: HTMLElement } => h.el !== null)

    const compute = () => {
      const el = articleRef.current
      if (!el) { pending = false; return }
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      setScrollProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0)

      // Track active heading for TOC highlighting
      const markerY = 120
      let current = ''
      for (const h of headingEls) {
        if (h.el.getBoundingClientRect().top <= markerY) {
          current = h.id
        } else {
          break
        }
      }
      setActiveHeading(current)
      pending = false
    }
    const onScroll = () => {
      if (pending) return
      pending = true
      rafId = requestAnimationFrame(compute)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    compute()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [headings])

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    trackEvent('blog_share', { article_slug: guide.slug, method: 'copy_link' })
  }

  const handleWhatsAppShare = () => {
    trackEvent('blog_share', { article_slug: guide.slug, method: 'whatsapp' })
  }

  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(guide.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`

  const showToc = headings.length >= 3

  return (
    <>
      {/* Progress bar.
          It used to sit at z-index 50, the same layer as the nav, which put it
          on top of the sticky breadcrumb bar and painted out the breadcrumbs'
          first three pixels. It now sits below the nav and above the
          breadcrumbs, and the breadcrumbs start at 71px so the two no longer
          share the same three pixels at all. The fill is forest rather than
          amber: amber on #DCE0DE measures 1.87:1 and is effectively invisible. */}
      <div aria-hidden="true" style={{
        position: 'fixed', top: '68px', left: 0, right: 0, height: '3px',
        background: '#DCE0DE', zIndex: 45,
      }}>
        <div style={{
          height: '100%', background: '#0B5240',
          width: `${scrollProgress}%`,
          transition: 'width 0.1s linear',
        }} />
      </div>

      {/* Reading progress badge (floating bottom-left) */}
      <ReadingProgress readTime={readTime} locale={locale} />

      {/* Mobile TOC drawer (only renders FAB on mobile/tablet) */}
      <MobileTOC headings={headings} activeHeading={activeHeading} locale={locale} />

      <div ref={articleRef} className={`${blog.layout} ${showToc ? blog.withToc : ''}`}>

        {/* Main article column. The measure is capped (700px, about 70
            characters at 17px) so the line never runs past what the eye can
            track, and the share row and back link line up with the text. */}
        <div className={blog.column}>

          {/* overflow-wrap catches the long unbroken strings that turn up in
              tax writing, ABNs, reference numbers and the occasional URL,
              which would otherwise push the column sideways on a 360px
              screen. */}
          <div className={`guide-body ${blog.body}`}>
            {parseBody(guide.body, locale, <InlineGuideCta guide={guide} locale={locale} />)}
          </div>

          {/* Share */}
          <div className={blog.shareRow}>
            <span>{ui.shareThisArticle}</span>
            <button type="button" onClick={handleCopy} className={blog.shareBtn}>
              {copied ? ui.shareCopied : ui.shareCopy}
            </button>
            <a
              href={waShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppShare}
              className={blog.shareBtn}
            >
              {ui.shareWhatsApp}
            </a>
          </div>

          {/* Back */}
          <div>
            <Link
              href={locale === 'en' ? '/blog' : `/${locale}/blog`}
              className={blog.back}
            >
              <span aria-hidden="true">←</span> {ui.backToBlog}
            </Link>
          </div>
        </div>

        {/* Desktop TOC sidebar */}
        {showToc && (
          <aside className={blog.toc} aria-label={ui.tocAriaLabel}>
            <p className={blog.tocLabel}>{ui.onThisPage}</p>
            <nav>
              <ul className={blog.tocList}>
                {headings.map(h => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className={`${blog.tocLink} ${activeHeading === h.id ? blog.tocActive : ''}`}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </>
  )
}
