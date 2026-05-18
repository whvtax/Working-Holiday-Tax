import { NextRequest, NextResponse } from 'next/server'
import { createTask, findExistingClient } from '@/lib/db'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'
import { sanitiseField, sanitiseShort } from '@/lib/sanitise'
import crypto from 'crypto'

/**
 * Contact form submission endpoint.
 * Lightweight - just captures name, email, optional WhatsApp, service interest, and message.
 * No file uploads. Creates a generic task that the CRM can pick up.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (await isRateLimited(ip, 'contact-form')) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }

    const formData = await req.formData()
    const fullName = sanitiseShort(formData.get('fullName'))
    const email = sanitiseShort(formData.get('email'))
    const whatsapp = sanitiseShort(formData.get('whatsapp'))
    const service = sanitiseShort(formData.get('service'))
    const message = sanitiseField(formData.get('message'))

    // Basic validation
    if (!fullName || !email || !message) {
      return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 })
    }

    const existing = await findExistingClient(email, whatsapp)
    const isReturning = !!existing
    const clientId = existing?.id ?? `CLT-${crypto.randomUUID()}`

    // Map service interest to taskType (default to tax-return for general inquiries)
    const serviceToTaskType: Record<string, 'tfn' | 'abn' | 'tax-return' | 'super'> = {
      'tfn': 'tfn',
      'abn': 'abn',
      'tax-return': 'tax-return',
      'super': 'super',
      'medicare': 'tax-return',
      'general': 'tax-return',
    }
    const taskType = serviceToTaskType[service] ?? 'tax-return'

    await createTask({
      clientId,
      clientName: fullName,
      taskType,
      whatsapp,
      email,
      country: '',
      dob: '',
      taxYear: '',
      submittedAt: new Date().toISOString(),
      address: '',
      tfn: '',
      bankDetails: '',
      primaryJob: '',
      marital: '',
      taxStatus: 'Working Holiday Maker',
      howHeard: 'Contact form',
      auPhone: '',
      notes: [
        '📩 Contact form submission',
        isReturning ? '🔄 Returning client' : '',
        service ? `Service interest: ${service}` : '',
        `Message: ${message}`,
      ].filter(Boolean).join(' | '),
      fileUrls: [],
      reviewStatus: 'pending',
      reviewerNote: '',
      reviewedAt: '',
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact-form] FAILED:', err)
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
  }
}
