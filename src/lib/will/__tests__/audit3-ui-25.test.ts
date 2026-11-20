// Jo, 20 Nov: signing in is /login, which opens Atlas; /crm is the CRM only.
// Pins audit3 unverified[25] on the new pages: a valid session never sees the
// password form, and /crm never shows it either.

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  redirect: jest.fn((to: string) => {
    throw new Error('NEXT_REDIRECT ' + to)
  }),
}))

jest.mock('@/lib/crm-store', () => ({
  validateSession: jest.fn(),
}))

jest.mock('@/app/(site)/(admin)/crm/ClientOnly', () => ({ __esModule: true, default: function CrmDashboard() { return null } }))
jest.mock('@/app/(site)/(admin)/crm/LoginClient', () => ({ __esModule: true, default: function CrmLogin() { return null } }))

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { validateSession } from '@/lib/crm-store'
import CrmPage from '@/app/(site)/(admin)/crm/page'
import LoginPage from '@/app/(site)/(admin)/login/page'

const mockCookies = cookies as unknown as jest.Mock
const mockValidateSession = validateSession as unknown as jest.Mock
const mockRedirect = redirect as unknown as jest.Mock

function withToken(value: string | undefined) {
  mockCookies.mockResolvedValue({
    get: (name: string) => (name === 'crm_session' && value !== undefined ? { value } : undefined),
  })
}

beforeEach(() => { jest.clearAllMocks() })

describe('/login', () => {
  it('shows the login form when there is no session', async () => {
    withToken(undefined)
    mockValidateSession.mockReturnValue(false)
    const result = (await LoginPage()) as { type: { name: string } }
    expect(mockRedirect).not.toHaveBeenCalled()
    expect(result.type.name).toBe('CrmLogin')
  })
  it('shows the login form when the session is invalid or expired', async () => {
    withToken('stale-token')
    mockValidateSession.mockReturnValue(false)
    const result = (await LoginPage()) as { type: { name: string } }
    expect(mockValidateSession).toHaveBeenCalledWith('stale-token')
    expect(result.type.name).toBe('CrmLogin')
  })
  it('a valid session goes straight to Atlas, never the password form', async () => {
    withToken('valid-token')
    mockValidateSession.mockReturnValue(true)
    await expect(LoginPage()).rejects.toThrow('NEXT_REDIRECT /atlas')
    expect(mockRedirect).toHaveBeenCalledWith('/atlas')
  })
})

describe('/crm', () => {
  it('signed in, it is the CRM dashboard', async () => {
    withToken('valid-token')
    mockValidateSession.mockReturnValue(true)
    const result = (await CrmPage()) as { type: { name: string } }
    expect(mockRedirect).not.toHaveBeenCalled()
    expect(result.type.name).toBe('CrmDashboard')
  })
  it('signed out, it sends you to /login', async () => {
    withToken(undefined)
    mockValidateSession.mockReturnValue(false)
    await expect(CrmPage()).rejects.toThrow('NEXT_REDIRECT /login')
  })
})
