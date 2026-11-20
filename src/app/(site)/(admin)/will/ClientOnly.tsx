'use client'

// Next 16: `ssr: false` is only allowed in Client Components, so this shim
// owns the client-only dynamic import and the server page keeps the session
// gate. Behaviour is identical to the old server-side dynamic(ssr:false).
import dynamic from 'next/dynamic'

const Inner = dynamic(() => import('@/components/will/Dashboard'), {
  ssr: false,
  loading: () => (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',color:'#7a8a82',fontFamily:'system-ui,sans-serif',fontSize:14}}>
      Loading…
    </div>
  ),
})

// Jo, 20 Nov: the same screen serves Will, Mia and Control.
export default function ClientOnly({ scope = 'wht' }: { scope?: 'wht' | 'svt' | 'control' }) {
  return <Inner scope={scope} />
}
