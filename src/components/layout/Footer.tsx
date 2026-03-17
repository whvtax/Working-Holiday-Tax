import Link from 'next/link'
import { WA_URL, EMAIL, PHONE_DISPLAY, AGENT_NAME, AGENT_ABN, AGENT_TPB } from '@/lib/constants'

const cols = [
  { title: 'Services', links: [{ l:'TFN Application',href:'/tfn'},{l:'Tax Return',href:'/tax-return'},{l:'Superannuation',href:'/superannuation'},{l:'ABN Registration',href:'/abn'},{l:'Medicare',href:'/medicare'}] },
  { title: 'Tools',    links: [{ l:'Tax Calculator',href:'/calculator'},{l:'Tax Rates Guide',href:'/tax-return#rates'},{l:'Deductions Guide',href:'/tax-return#deductions'},{l:'Residency Guide',href:'/tax-return#residency'},{l:'Super Guide',href:'/superannuation#guide'}] },
  { title: 'Legal',    links: [{ l:'Client Agreement',href:'/client-agreement'},{l:'Privacy Policy',href:'/privacy'},{l:'Contact Us',href:'/contact'}] },
]

export function Footer() {
  return (
    <footer className="bg-ink pt-[72px] pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-[52px] md:gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-[18px]">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <rect x="2" y="2" width="16" height="16" rx="4" stroke="#2FA880" strokeWidth="1.5"/>
                <rect x="12" y="12" width="16" height="16" rx="4" fill="#16775C"/>
                <line x1="2" y1="2" x2="12" y2="12" stroke="#E9A020" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="2" cy="2" r="2" fill="#E9A020"/>
              </svg>
              <span className="font-serif text-[15px] font-bold text-white">Working Holiday Tax</span>
            </div>
            <p className="text-[13px] font-light text-white/32 leading-[1.75] max-w-[240px] mb-6">
              Australian tax specialists for Working Holiday Visa holders. TFN to super — all online.
            </p>
            <div className="space-y-2.5">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[13px] text-white/38 transition-colors hover:text-forest-300">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6" stroke="rgba(255,255,255,.22)" strokeWidth=".8"/></svg>{PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-[13px] text-white/38 transition-colors hover:text-forest-300">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x=".5" y="2" width="12" height="9" rx="1.5" stroke="rgba(255,255,255,.22)" strokeWidth=".8"/></svg>{EMAIL}
              </a>
            </div>
          </div>
          {/* Columns */}
          {cols.map(col => (
            <div key={col.title}>
              <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-white/22 mb-5">{col.title}</p>
              {col.links.map(lk => (
                <Link key={lk.href} href={lk.href} className="block text-[13px] text-white/38 mb-3 transition-colors hover:text-white/78">{lk.l}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.055] mt-14 pt-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-2.5">
          <p className="text-[12px] text-white/18">© {new Date().getFullYear()} Working Holiday Tax. All rights reserved.</p>
          <span className="inline-flex items-center gap-2 text-[11px] text-white/20">
            <span className="w-[5px] h-[5px] rounded-full bg-forest-400" />
            Supervised by {AGENT_NAME} · ABN {AGENT_ABN} · TPB #{AGENT_TPB}
          </span>
        </div>
      </div>
    </footer>
  )
}
