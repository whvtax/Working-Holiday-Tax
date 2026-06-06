/**
 * Seed demo data into Supabase
 * Run once via: GET /api/crm/seed (protected)
 */

import { getSupabase } from '@/lib/supabase'

export async function seedDemoData() {
  const sb = getSupabase()

  // ── 3 active tasks ──────────────────────────────────────────────────────
  const tasks = [
    {
      id: 'TASK-DEMO-1',
      client_id: 'CLT-DEMO-1',
      client_name: 'Sophie Lambert',
      task_type: 'tax-return',
      whatsapp: '+33612345678',
      email: 'demo-sophie@example.com',
      country: 'France',
      dob: '1998-04-12',
      tax_year: '2023-24',
      submitted_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      done: false,
      address: '42 Bondi Rd, Sydney NSW 2026',
      tfn: 'DEMO-TFN-001',
      bank_details: 'DEMO-BANK-001',
      primary_job: 'Barista - The Grounds of Alexandria',
      marital: 'Single',
      tax_status: 'Working Holiday Maker',
      how_heard: 'Instagram',
      au_phone: '+61412345678',
      notes: 'Has two employers this year - needs group certs from both.',
      file_urls: '[]',
      review_status: 'pending',
      reviewer_note: '',
      reviewed_at: '',
    },
    {
      id: 'TASK-DEMO-2',
      client_id: 'CLT-DEMO-2',
      client_name: 'Marco Bianchi',
      task_type: 'tax-return',
      whatsapp: '+39333987654',
      email: 'demo-marco@example.com',
      country: 'Italy',
      dob: '1996-09-22',
      tax_year: '2022-23',
      submitted_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      done: false,
      address: '7 Collins St, Melbourne VIC 3000',
      tfn: 'DEMO-TFN-002',
      bank_details: 'DEMO-BANK-002',
      primary_job: 'Farm Worker - Mildura QLD',
      marital: 'Single',
      tax_status: 'Working Holiday Maker',
      how_heard: 'Friend referral',
      au_phone: '+61498765432',
      notes: '',
      file_urls: '[]',
      review_status: 'pending',
      reviewer_note: '',
      reviewed_at: '',
    },
    {
      id: 'TASK-DEMO-3',
      client_id: 'CLT-DEMO-3',
      client_name: 'Lena Muller',
      task_type: 'tax-return',
      whatsapp: '+49160112233',
      email: 'demo-lena@example.com',
      country: 'Germany',
      dob: '2000-01-30',
      tax_year: '2024-25',
      submitted_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      done: false,
      address: '15 Queen St, Brisbane QLD 4000',
      tfn: 'DEMO-TFN-003',
      bank_details: 'DEMO-BANK-003',
      primary_job: 'Waitress - Noosa Waterfront Restaurant',
      marital: 'Single',
      tax_status: 'Working Holiday Maker',
      how_heard: 'TikTok',
      au_phone: '+61467112233',
      notes: 'Urgent - leaving Australia next week.',
      file_urls: '[]',
      review_status: 'pending',
      reviewer_note: '',
      reviewed_at: '',
    },
  ]

  // Upsert tasks (ignores conflicts)
  for (const t of tasks) {
    await sb.from('crm_tasks').upsert(t, { onConflict: 'id', ignoreDuplicates: true })
  }

  // ── 2 clients with tax return history ──────────────────────────
  const clients = [
    {
      id: 'CLT-DEMO-4',
      full_name: 'Jonas Dupont',
      dob: '1997-06-15',
      whatsapp: '+32477123456',
      email: 'demo-jonas@example.com',
      country: 'Belgium',
      how_heard: '',
      notes: '',
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      archived: false,
      tax_returns: JSON.stringify([
        { year: '2022-23', refundAmount: 3120, type: 'refund', completedAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString() },
        { year: '2023-24', refundAmount: 2840, type: 'refund', completedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
      ]),
      super_returns: '[]',
      tfn_service: '{"done":false,"completedAt":"","notes":""}',
      abn_service: '{"done":false,"completedAt":"","notes":""}',
      yearly_checkins: '{}',
    },
    {
      id: 'CLT-DEMO-5',
      full_name: 'Anna Kowalski',
      dob: '1999-03-08',
      whatsapp: '+48601234567',
      email: 'demo-anna@example.com',
      country: 'Poland',
      how_heard: '',
      notes: '',
      created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      archived: false,
      tax_returns: JSON.stringify([
        { year: '2021-22', refundAmount: 1850, type: 'refund', completedAt: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString() },
        { year: '2022-23', refundAmount: 2200, type: 'refund', completedAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString() },
        { year: '2023-24', refundAmount: 2950, type: 'refund', completedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() },
      ]),
      super_returns: '[]',
      tfn_service: '{"done":false,"completedAt":"","notes":""}',
      abn_service: '{"done":false,"completedAt":"","notes":""}',
      yearly_checkins: '{}',
    },
  ]

  for (const c of clients) {
    await sb.from('crm_clients').upsert(c, { onConflict: 'id', ignoreDuplicates: true })
  }

  return { tasks: tasks.length, clients: clients.length }
}
