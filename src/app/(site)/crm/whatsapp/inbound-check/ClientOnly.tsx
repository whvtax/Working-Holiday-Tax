'use client'

// Next 16: `ssr: false` is only allowed in Client Components, so this shim
// owns the client-only dynamic import and the server page keeps the session
// gate. Behaviour is identical to the old server-side dynamic(ssr:false).
import dynamic from 'next/dynamic'

const Inner = dynamic(() => import('./InboundCheckClient'), {
  ssr: false,
})

export default function ClientOnly() {
  return <Inner />
}
