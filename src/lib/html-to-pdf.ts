/**
 * Turns the CRM's existing form HTML into a downloadable PDF, in the browser.
 *
 * Deliberately *not* a hand-drawn PDF layout: the document must look exactly
 * like the HTML export it replaces - same fonts, same green boxes, same
 * rounded corners, same emoji - so the only safe approach is to render that
 * very HTML and capture it. html2canvas rasterises the real DOM, so whatever
 * the CSS does, the PDF shows.
 *
 * Everything happens client-side. These documents carry a TFN, a residential
 * address and links to passport photos, so nothing is sent to a server.
 */

/** A4 in the units jsPDF is initialised with (mm). */
const A4_W_MM = 210
const A4_H_MM = 297

/** Width the document is rendered at, matching the HTML's own layout box
 *  (max-width 520px + 28px padding each side). */
const RENDER_W = 576

export type HtmlPdfOptions = {
  /** Full HTML document string, as built by the CRM's export. */
  html: string
  /** Download filename, including the .pdf extension. */
  filename: string
}

/**
 * Pulls the <body> markup and any <style> blocks out of a full HTML document
 * string, so they can be mounted into the current page for rendering.
 */
function splitDocument(html: string): { body: string; css: string } {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  // The export embeds an auto-print script; it must not run here.
  doc.querySelectorAll('script').forEach(el => el.remove())
  const css = Array.from(doc.querySelectorAll('style')).map(el => el.textContent || '').join('\n')
  return { body: doc.body.innerHTML, css }
}

export async function downloadHtmlAsPdf({ html, filename }: HtmlPdfOptions): Promise<void> {
  // Imported here rather than at module scope: both libraries are browser-only
  // and sizeable, so they load on first use instead of with the dashboard.
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  const { body, css } = splitDocument(html)

  // Mount off-screen at the document's natural width. Not display:none and not
  // visibility:hidden - html2canvas needs a laid-out, painted element.
  const host = document.createElement('div')
  host.setAttribute('aria-hidden', 'true')
  host.style.cssText = [
    'position:fixed',
    'left:-20000px',
    'top:0',
    `width:${RENDER_W}px`,
    'background:#ffffff',
    'z-index:-1',
    'pointer-events:none',
  ].join(';')

  // The export's CSS targets `body`; rescope it to this container so it styles
  // the clone without leaking into the dashboard around it.
  const style = document.createElement('style')
  style.textContent = css.replace(/(^|[^-\w])body\s*\{/g, '$1.whv-pdf-host{')
  host.className = 'whv-pdf-host'
  host.appendChild(style)

  const content = document.createElement('div')
  content.innerHTML = body
  host.appendChild(content)
  document.body.appendChild(host)

  try {
    // Give fonts and images a moment to settle before capture.
    try { await (document as Document & { fonts?: FontFaceSet }).fonts?.ready } catch {}
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))

    const canvas = await html2canvas(host, {
      scale: 2,                 // retina-sharp text
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
      windowWidth: RENDER_W,
    })

    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })

    // The capture spans the full A4 width, so one page's worth of the canvas is
    // however many canvas pixels map to 297mm at that scale.
    const pageHeightPx = Math.floor((A4_H_MM * canvas.width) / A4_W_MM)
    const totalPages = Math.max(1, Math.ceil(canvas.height / pageHeightPx))

    // Slice the tall canvas into page-sized chunks. Slicing (rather than
    // re-drawing the whole image at an offset) keeps each page's JPEG small.
    const slice = document.createElement('canvas')
    const ctx = slice.getContext('2d')
    if (!ctx) throw new Error('Canvas 2D context unavailable')

    for (let i = 0; i < totalPages; i++) {
      const sy = i * pageHeightPx
      const sh = Math.min(pageHeightPx, canvas.height - sy)
      slice.width = canvas.width
      slice.height = sh
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, slice.width, slice.height)
      ctx.drawImage(canvas, 0, sy, canvas.width, sh, 0, 0, canvas.width, sh)

      // Preserve aspect ratio: a short final page must not be stretched.
      const imgWmm = A4_W_MM
      const imgHmm = (sh / canvas.width) * A4_W_MM

      if (i > 0) pdf.addPage()
      pdf.addImage(
        slice.toDataURL('image/jpeg', 0.92),
        'JPEG',
        0, 0,
        imgWmm,
        Math.min(imgHmm, A4_H_MM),
        undefined,
        'FAST',
      )
    }

    pdf.save(filename)
  } finally {
    document.body.removeChild(host)
  }
}
