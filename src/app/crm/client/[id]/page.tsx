import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import crypto from 'crypto'
import ClientPageClient from './ClientPageClient'

function validateToken(token: string | undefined): boolean {
  if (!token) return false
  try {
    const dot     = token.lastIndexOf('.')
    if (dot < 0) return false
    const payload  = token.slice(0, dot)
    const sig      = token.slice(dot + 1)
    const secret   = process.env.JWT_SECRET ?? ''
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url')
    if (sig.length !== expected.length) return false
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return Date.now() < exp
  } catch { return false }
}

export default async function ClientPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const token = cookieStore.get('crm_session')?.value
  if (!validateToken(token)) {
    redirect('/crm')
  }
  return <ClientPageClient id={params.id} />
}
