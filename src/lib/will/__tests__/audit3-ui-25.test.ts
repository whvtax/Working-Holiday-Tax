// Pins the fix for audit3 unverified[25]: the /crm entry page must not force
// a visitor with a valid session back through password + OTP. It now checks
// the crm_session cookie the same way dashboard/page.tsx and
// whatsapp/page.tsx already do, and redirects straight to the dashboard when
// the session is valid — leaving the login form untouched otherwise.

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  redirect: jest.fn(() => {
    throw new Error('NEXT_REDIRECT')
  }),
}))

jest.mock('@/lib/crm-store', () => ({
  validateSession: jest.fn(),
}))

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import CrmLoginPage from '@/app/(site)/crm/page'

const mockCookies = cookies as unknown as jest.Mock
const mockValidateSession = validateSession as unknown as jest.Mock
const mockRedirect = redirect as unknown as jest.Mock

function withToken(value: string | undefined) {
  mockCookies.mockResolvedValue({
    get: (name: string) => (name === 'crm_session' && value !== undefined ? { value } : undefined),
  })
}

describe('CrmLoginPage session check (audit3 unverified[25])', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirects to the dashboard when an existing session is valid, without rendering the login form', async () => {
    withToken('valid-token')
    mockValidateSession.mockReturnValue(true)

    await expect(CrmLoginPage()).rejects.toThrow('NEXT_REDIRECT')

    expect(mockValidateSession).toHaveBeenCalledWith('valid-token')
    expect(mockRedirect).toHaveBeenCalledWith('/crm/dashboard')
  })

  it('renders the login form when there is no session cookie', async () => {
    withToken(undefined)
    mockValidateSession.mockReturnValue(false)

    const result = await CrmLoginPage()

    expect(mockRedirect).not.toHaveBeenCalled()
    expect(result).toBeTruthy()
  })

  it('renders the login form when the session cookie is present but invalid or expired', async () => {
    withToken('stale-token')
    mockValidateSession.mockReturnValue(false)

    const result = await CrmLoginPage()

    expect(mockValidateSession).toHaveBeenCalledWith('stale-token')
    expect(mockRedirect).not.toHaveBeenCalled()
    expect(result).toBeTruthy()
  })
})
