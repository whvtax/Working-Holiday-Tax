/** @jest-environment jsdom */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import MiaActions from '../MiaActions'

describe('Mia intake form link (17 Nov)', () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: jest.fn().mockResolvedValue(undefined) } })
  })
  afterEach(() => { jest.restoreAllMocks() })

  it('asks the API for a link and shows it', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      json: async () => ({ ok: true, url: 'https://studentvisatax.com.au/jhd7hp9xd?k=abc' }),
    })
    global.fetch = fetchMock as unknown as typeof fetch
    render(<MiaActions customerId="cust-1" />)
    fireEvent.click(screen.getByRole('button', { name: 'Get intake form link' }))
    await waitFor(() => expect(screen.getByDisplayValue(/jhd7hp9xd\?k=abc/)).toBeInTheDocument())
    expect(fetchMock).toHaveBeenCalledWith('/api/mia/form-link', expect.objectContaining({ method: 'POST' }))
  })

  it('shows the error when the API refuses', async () => {
    global.fetch = jest.fn().mockResolvedValue({ json: async () => ({ ok: false, error: 'not_found' }) }) as unknown as typeof fetch
    render(<MiaActions customerId="cust-x" />)
    fireEvent.click(screen.getByRole('button', { name: 'Get intake form link' }))
    await waitFor(() => expect(screen.getByText('Error: not_found')).toBeInTheDocument())
  })
})
