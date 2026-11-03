/**
 * The Report-Only CSP candidate is opt-in and must never be enforcing.
 */
const { buildReportOnlyCsp, reportOnlyHeaders, safeReportUri, HEADER_NAME } = require('../../../config/csp-report-only')

describe('CSP Report-Only candidate', () => {
  it('uses the Report-Only header name, never the enforcing one', () => {
    expect(HEADER_NAME).toBe('Content-Security-Policy-Report-Only')
  })

  it('emits nothing unless CSP_REPORT_ONLY=true', () => {
    expect(reportOnlyHeaders('wht', {})).toEqual([])
    expect(reportOnlyHeaders('wht', { CSP_REPORT_ONLY: '1' })).toEqual([])
    expect(reportOnlyHeaders('wht', { CSP_REPORT_ONLY: 'true' })).toHaveLength(1)
  })

  it('production policies never contain unsafe-eval, wildcards on script-src, or http:', () => {
    for (const brand of ['wht', 'svt']) {
      const csp = buildReportOnlyCsp(brand)
      const script = csp.split('; ').find((d: string) => d.startsWith('script-src'))!
      expect(csp).not.toContain('unsafe-eval')
      expect(script).not.toMatch(/\*|http:|data:/)
      expect(csp).toContain("object-src 'none'")
      expect(csp).toContain("frame-ancestors 'none'")
      expect(csp).toContain("base-uri 'self'")
      expect(csp).not.toContain('upgrade-insecure-requests')
    }
  })

  it('keeps brand separation: the SVT candidate names no WHT origin and no frames', () => {
    const svt = buildReportOnlyCsp('svt')
    expect(svt).toContain("frame-src 'none'")
    expect(svt).not.toMatch(/youtube|facebook|workingholidaytax|lh3\.googleusercontent/)
  })

  it('does not allow the origins the code does not use (facebook, resend, supabase, google fonts)', () => {
    const wht = buildReportOnlyCsp('wht')
    expect(wht).not.toMatch(/facebook|resend|supabase|fonts\.g/)
    expect(wht).toContain('https://www.googletagmanager.com')
    expect(wht).toContain('https://www.youtube.com')
  })

  it('only accepts a same-site path or an https URL as the report receiver', () => {
    expect(safeReportUri('/api/csp-report')).toBe('/api/csp-report')
    expect(safeReportUri('https://example.report-uri.com/r/d/csp/reportOnly')).toBe('https://example.report-uri.com/r/d/csp/reportOnly')
    for (const bad of ['//evil.example', 'http://x.example', 'javascript:x', "/x; script-src *", '/x y', '', undefined, 'https://x.example/a,b'])
      expect(safeReportUri(bad as any)).toBeNull()
    expect(buildReportOnlyCsp('wht', { reportUri: "/x; script-src *" })).not.toContain('report-uri')
  })

  it('next.config.js leaves the enforced headers untouched and adds the candidate only when enabled', async () => {
    const load = async (env: Record<string, string | undefined>) => {
      const saved = { ...process.env }
      Object.assign(process.env, env)
      for (const k of Object.keys(env)) if (env[k] === undefined) delete process.env[k]
      jest.resetModules()
      try { return await require('../../../next.config.js').headers() } finally {
        for (const k of Object.keys(process.env)) if (!(k in saved)) delete process.env[k]
        Object.assign(process.env, saved)
      }
    }
    const off = await load({ CSP_REPORT_ONLY: undefined })
    const on = await load({ CSP_REPORT_ONLY: 'true' })
    const keys = (h: any[]) => h.flatMap((r) => r.headers.map((x: any) => x.key))
    expect(keys(off)).not.toContain('Content-Security-Policy-Report-Only')
    expect(keys(on)).toContain('Content-Security-Policy-Report-Only')
    // enforced CSP rules are identical either way
    const enforced = (h: any[]) => JSON.stringify(h.map((r) => ({ ...r, headers: r.headers.filter((x: any) => x.key !== 'Content-Security-Policy-Report-Only') })).filter((r) => r.headers.length))
    expect(enforced(on)).toBe(enforced(off))
    // never applied to /crm
    const crm = on.filter((r: any) => r.headers.some((x: any) => x.key === 'Content-Security-Policy-Report-Only'))
    expect(crm.every((r: any) => r.source.includes('(?!crm') || r.has)).toBe(true)
  })
})
