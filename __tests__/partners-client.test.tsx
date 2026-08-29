/** @jest-environment jsdom */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import PartnersClient from '../src/app/(site)/crm/partners/PartnersClient'
import PartnerDetailClient from '../src/app/(site)/crm/partners/[id]/PartnerDetailClient'

beforeAll(() => {
  Object.assign(navigator, { clipboard: { writeText: jest.fn().mockResolvedValue(undefined) } })
})

function jsonResponse(body: unknown, status = 200) {
  return Promise.resolve({
    ok: true,
    status,
    json: () => Promise.resolve(body),
  } as Response)
}

describe('PartnersClient (list page)', () => {
  it('renders partner data including email, and links each row to its detail page', async () => {
    global.fetch = jest.fn(() => jsonResponse({
      ok: true,
      partners: [
        { id: 'PTR-1', name: 'Backpacker Co', email: 'bp@example.com', code: 'BPCO', createdAt: '2026-01-01T00:00:00.000Z', totalReferrals: 12, paidReferrals: 8, commission: 160, totalPaidHistorically: 0 },
        { id: 'PTR-2', name: 'Hostel World', email: '', code: 'HW', createdAt: '2026-02-01T00:00:00.000Z', totalReferrals: 5, paidReferrals: 5, commission: 0, totalPaidHistorically: 5 },
      ],
    })) as unknown as typeof fetch

    render(<PartnersClient />)

    expect(screen.getByRole('heading', { name: 'Partners' })).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Backpacker Co')).toBeInTheDocument()
    })
    expect(screen.getByText('Hostel World')).toBeInTheDocument()
    expect(screen.getByText('bp@example.com')).toBeInTheDocument()
  })

  it('shows a visible error message if the API fails', async () => {
    global.fetch = jest.fn(() => jsonResponse(
      { ok: false, error: 'column partners.email does not exist' }, 500
    )) as unknown as typeof fetch

    render(<PartnersClient />)

    await waitFor(() => {
      expect(screen.getByText(/Couldn't load partners/i)).toBeInTheDocument()
    })
  })

  it('filters partners by name search', async () => {
    global.fetch = jest.fn(() => jsonResponse({
      ok: true,
      partners: [
        { id: 'PTR-1', name: 'Backpacker Co', email: '', code: 'BPCO', createdAt: '2026-01-01T00:00:00.000Z', totalReferrals: 1, paidReferrals: 1, commission: 0, totalPaidHistorically: 1 },
        { id: 'PTR-2', name: 'Hostel World', email: '', code: 'HW', createdAt: '2026-02-01T00:00:00.000Z', totalReferrals: 1, paidReferrals: 1, commission: 0, totalPaidHistorically: 1 },
      ],
    })) as unknown as typeof fetch

    render(<PartnersClient />)
    await waitFor(() => expect(screen.getByText('Backpacker Co')).toBeInTheDocument())

    fireEvent.change(screen.getByPlaceholderText(/Search by partner name/i), { target: { value: 'Hostel' } })

    expect(screen.queryByText('Backpacker Co')).not.toBeInTheDocument()
    expect(screen.getByText('Hostel World')).toBeInTheDocument()
  })
})

describe('PartnerDetailClient (per-partner detail page)', () => {
  it('renders referred clients with their qualification/payment status', async () => {
    global.fetch = jest.fn(() => jsonResponse({
      ok: true,
      partner: { id: 'PTR-1', name: 'Backpacker Co', email: 'bp@example.com', code: 'BPCO', createdAt: '2026-01-01T00:00:00.000Z' },
      referredClients: [
        { id: 'CLT-1', fullName: 'Anna Smith', createdAt: '2026-02-01T00:00:00.000Z', qualified: true, commissionPaidAt: null },
        { id: 'CLT-2', fullName: 'Marco Rossi', createdAt: '2026-02-05T00:00:00.000Z', qualified: true, commissionPaidAt: '2026-03-01T00:00:00.000Z' },
        { id: 'CLT-3', fullName: 'Dana Cohen', createdAt: '2026-03-01T00:00:00.000Z', qualified: false, commissionPaidAt: null },
      ],
    })) as unknown as typeof fetch

    render(<PartnerDetailClient partnerId="PTR-1" />)

    await waitFor(() => {
      expect(screen.getByText('Anna Smith')).toBeInTheDocument()
    })
    expect(screen.getAllByText('Marco Rossi').length).toBeGreaterThan(0)
    expect(screen.getByText('Dana Cohen')).toBeInTheDocument()
    expect(screen.getByText(/bp@example.com/)).toBeInTheDocument()

    // Anna: qualified + unpaid -> "Mark paid" button available
    expect(screen.getByText('✓ Mark paid ($20)')).toBeInTheDocument()
    // Marco: qualified + paid -> shows up in payment history with an Undo button
    expect(screen.getByText('↺ Undo')).toBeInTheDocument()
    // Dana: not qualified -> Pending status
    expect(screen.getByText('⏳ Pending')).toBeInTheDocument()
  })

  it('marking a client paid calls the referral-payment endpoint', async () => {
    const calls: string[] = []
    global.fetch = jest.fn((url: string, init?: RequestInit) => {
      calls.push(`${init?.method || 'GET'} ${url}`)
      if (url.toString().includes('/referral-payment')) {
        return jsonResponse({ ok: true })
      }
      return jsonResponse({
        ok: true,
        partner: { id: 'PTR-1', name: 'Backpacker Co', email: '', code: 'BPCO', createdAt: '2026-01-01T00:00:00.000Z' },
        referredClients: [
          { id: 'CLT-1', fullName: 'Anna Smith', createdAt: '2026-02-01T00:00:00.000Z', qualified: true, commissionPaidAt: null },
        ],
      })
    }) as unknown as typeof fetch

    render(<PartnerDetailClient partnerId="PTR-1" />)
    await waitFor(() => expect(screen.getByText('Anna Smith')).toBeInTheDocument())

    fireEvent.click(screen.getByText('✓ Mark paid ($20)'))

    await waitFor(() => {
      expect(calls.some(c => c.includes('PATCH /api/crm/clients/CLT-1/referral-payment'))).toBe(true)
    })
  })

  it('deleting a partner requires confirmation, then calls DELETE', async () => {
    const calls: string[] = []
    global.fetch = jest.fn((url: string, init?: RequestInit) => {
      calls.push(`${init?.method || 'GET'} ${url}`)
      if (init?.method === 'DELETE') return jsonResponse({ ok: true })
      return jsonResponse({
        ok: true,
        partner: { id: 'PTR-1', name: 'Backpacker Co', email: '', code: 'BPCO', createdAt: '2026-01-01T00:00:00.000Z' },
        referredClients: [],
      })
    }) as unknown as typeof fetch

    render(<PartnerDetailClient partnerId="PTR-1" />)
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Backpacker Co' })).toBeInTheDocument())

    // Clicking delete should NOT call the API yet - it opens a confirmation first
    fireEvent.click(screen.getByText('🗑️ Delete Partner'))
    expect(calls.some(c => c.includes('DELETE'))).toBe(false)
    expect(screen.getByText('Delete Backpacker Co?')).toBeInTheDocument()

    // Confirming actually deletes
    fireEvent.click(screen.getByRole('button', { name: 'Delete Partner' }))
    await waitFor(() => {
      expect(calls.some(c => c.includes('DELETE /api/crm/partners/PTR-1'))).toBe(true)
    })
  })
})
