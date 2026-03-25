import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { parseSession, validateSessionAsync } from '@/lib/crm-store'
import { createClient } from 'redis'
import ClientPageClient from './ClientPageClient'

export default async function ClientPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const token = cookieStore.get('crm_session')?.value
  const parsed = parseSession(token)
  if (!parsed) redirect('/crm')

  // Full async revocation check — mirrors requireAuth() used in API routes
  let redis
  try {
    redis = createClient({ url: process.env.REDIS_URL })
    await redis.connect()
    const valid = await validateSessionAsync(token, redis as import('redis').RedisClientType)
    if (!valid) redirect('/crm')
  } catch {
    // Redis unavailable — fail closed
    redirect('/crm')
  } finally {
    try { if (redis) await (redis as import('redis').RedisClientType).disconnect() } catch {}
  }

  return <ClientPageClient id={params.id} />
}
