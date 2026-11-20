import fs from 'fs'
import path from 'path'

// Pins the fix for audit3 unverified[23]: "CRM edits and refund amounts are
// silently lost when the session has expired". DashboardClient.tsx used to
// fire mutating fetch() calls without inspecting the response, so an expired
// session (401) or a server error (500) left the UI showing a note/task/client
// as saved when it was not. This is a source-shape test (the file is a React
// client component, not unit-testable in isolation) that pins:
//  1. a crmFetch() wrapper exists and redirects to /crm on 401 and throws on
//     any non-ok response, and
//  2. every listed mutating call site goes through it instead of a bare
//     unchecked fetch().
describe('audit3 unverified[23]: DashboardClient mutating fetches are checked', () => {
  const file = fs.readFileSync(
    path.join(__dirname, '../../../app/(site)/crm/dashboard/DashboardClient.tsx'),
    'utf8'
  )

  it('defines a crmFetch wrapper that redirects on 401 and throws on non-ok', () => {
    expect(file).toMatch(/async function crmFetch\(/)
    const wrapper = file.slice(file.indexOf('async function crmFetch('))
    const body = wrapper.slice(0, wrapper.indexOf('\n}') + 2)
    expect(body).toMatch(/status === 401/)
    expect(body).toMatch(/window\.location\.replace\('\/crm'\)/)
    expect(body).toMatch(/throw new Error/)
    expect(body).toMatch(/!res\.ok/)
  })

  const mutators = [
    'toggleInProgress',
    'saveReviewerNote',
    'transferToClients',
    'deleteTaskPermanently',
    'saveTaskNotes',
    'deleteTask',
    'saveClientNotes',
    'deleteClient',
  ]

  it.each(mutators)('%s routes its writes through crmFetch, not a bare fetch', (name) => {
    const start = file.indexOf(`async function ${name}(`)
    expect(start).toBeGreaterThan(-1)
    // Slice to the next top-level "  async function " (2-space indented) to
    // isolate this function's body from its neighbours.
    const rest = file.slice(start + 1)
    const nextFnRelative = rest.search(/\n  async function /)
    const body = nextFnRelative === -1 ? rest : rest.slice(0, nextFnRelative)
    expect(body).toMatch(/crmFetch\(/)
    // No bare `await fetch(` writes left in this function (reads via loadTasks
    // etc. that go through their own checked helpers are fine).
    expect(body).not.toMatch(/[^m]await fetch\(/)
  })

  it('deleteTask stops and does not delete the task if a refund write fails', () => {
    const start = file.indexOf('async function deleteTask(')
    const rest = file.slice(start)
    const nextFnRelative = rest.search(/\n  async function /)
    const body = nextFnRelative === -1 ? rest : rest.slice(0, nextFnRelative)
    // The delete call and both tax-returns POSTs are inside one try block,
    // followed by a catch that returns before the task is removed from state.
    const tryIdx = body.indexOf('try {')
    const catchIdx = body.indexOf('} catch')
    expect(tryIdx).toBeGreaterThan(-1)
    expect(catchIdx).toBeGreaterThan(tryIdx)
    const tryBlock = body.slice(tryIdx, catchIdx)
    expect(tryBlock).toMatch(/tax-returns/)
    expect(tryBlock).toMatch(/action:'delete'/)
    const catchBlock = body.slice(catchIdx, body.indexOf('setActiveTask(null); setTaskView'))
    expect(catchBlock).toMatch(/return/)
  })
})
