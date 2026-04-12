/**
 * Seed demo data into Vercel Postgres
 * Run once via: GET /api/crm/seed (protected)
 */

import { sql } from '@vercel/postgres'

export async function seedDemoData() {
  // ── 3 active tasks ──────────────────────────────────────────────────────
  const tasks = [
    {
      id: 'TASK-DEMO-1',
      clientId: 'CLT-DEMO-1',
      clientName: 'Sophie Lambert',
      whatsapp: '+33612345678',
      email: 'demo-sophie@example.com',
      country: 'France',
      dob: '1998-04-12',
      taxYear: '2023-24',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      address: '42 Bondi Rd, Sydney NSW 2026',
      tfn: 'DEMO-TFN-001',
      bankDetails: 'DEMO-BANK-001',
      primaryJob: 'Barista – The Grounds of Alexandria',
      marital: 'Single',
      taxStatus: 'Working Holiday Maker',
      howHeard: 'Instagram',
      auPhone: '+61412345678',
      notes: 'Has two employers this year — needs group certs from both.',
    },
    {
      id: 'TASK-DEMO-2',
      clientId: 'CLT-DEMO-2',
      clientName: 'Marco Bianchi',
      whatsapp: '+39333987654',
      email: 'demo-marco@example.com',
      country: 'Italy',
      dob: '1996-09-22',
      taxYear: '2022-23',
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      address: '7 Collins St, Melbourne VIC 3000',
      tfn: 'DEMO-TFN-002',
      bankDetails: 'DEMO-BANK-002',
      primaryJob: 'Farm Worker – Mildura QLD',
      marital: 'Single',
      taxStatus: 'Working Holiday Maker',
      howHeard: 'Friend referral',
      auPhone: '+61498765432',
      notes: '',
    },
    {
      id: 'TASK-DEMO-3',
      clientId: 'CLT-DEMO-3',
      clientName: 'Lena Müller',
      whatsapp: '+49160112233',
      email: 'demo-lena@example.com',
      country: 'Germany',
      dob: '2000-01-30',
      taxYear: '2024-25',
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      address: '15 Queen St, Brisbane QLD 4000',
      tfn: 'DEMO-TFN-003',
      bankDetails: 'DEMO-BANK-003',
      primaryJob: 'Waitress – Noosa Waterfront Restaurant',
      marital: 'Single',
      taxStatus: 'Working Holiday Maker',
      howHeard: 'TikTok',
      auPhone: '+61467112233',
      notes: 'Urgent — leaving Australia next week.',
    },
  ]

  for (const t of tasks) {
    await sql`
      INSERT INTO crm_tasks
        (id,client_id,client_name,whatsapp,email,country,dob,tax_year,submitted_at,
         done,address,tfn,bank_details,primary_job,marital,tax_status,how_heard,au_phone,notes)
      VALUES
        (${t.id},${t.clientId},${t.clientName},${t.whatsapp},${t.email},
         ${t.country},${t.dob},${t.taxYear},${t.submittedAt},
         false,${t.address},${t.tfn},${t.bankDetails},${t.primaryJob},
         ${t.marital},${t.taxStatus},${t.howHeard},${t.auPhone},${t.notes})
      ON CONFLICT (id) DO NOTHING
    `
  }

  // ── 2 archived clients with tax return history ──────────────────────────
  const clients = [
    {
      id: 'CLT-DEMO-4',
      fullName: 'Jonas Dupont',
      dob: '1997-06-15',
      whatsapp: '+32477123456',
      email: 'demo-jonas@example.com',
      country: 'Belgium',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      taxReturns: JSON.stringify([
        { year: '2022-23', refundAmount: 3120, completedAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString() },
        { year: '2023-24', refundAmount: 2840, completedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
      ]),
    },
    {
      id: 'CLT-DEMO-5',
      fullName: 'Anna Kowalski',
      dob: '1999-03-08',
      whatsapp: '+48601234567',
      email: 'demo-anna@example.com',
      country: 'Poland',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      taxReturns: JSON.stringify([
        { year: '2021-22', refundAmount: 1850, completedAt: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString() },
        { year: '2022-23', refundAmount: 2200, completedAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString() },
        { year: '2023-24', refundAmount: 2950, completedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() },
      ]),
    },
  ]

  for (const c of clients) {
    await sql`
      INSERT INTO crm_clients (id, full_name, dob, whatsapp, email, country, tax_returns, created_at)
      VALUES (${c.id}, ${c.fullName}, ${c.dob}, ${c.whatsapp}, ${c.email}, ${c.country}, ${c.taxReturns}, ${c.createdAt})
      ON CONFLICT (id) DO NOTHING
    `
  }

  return { tasks: tasks.length, clients: clients.length }
}
