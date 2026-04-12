// This route is no longer used.
// Invoices are now uploaded via /api/tax-form/invoice-upload instead.
export async function GET() {
  return new Response('Not used', { status: 404 })
}
export async function POST() {
  return new Response('Not used', { status: 404 })
}
