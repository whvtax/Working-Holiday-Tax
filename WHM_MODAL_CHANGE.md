# WHM tax-status modal: block removed (31 July 2026)

## Before
Selecting "Working Holiday Maker" tax status HARD BLOCKED the submission. The client saw
the modal, pressed Close, and returned to a filled form that never sent. The lead was lost.

## After
The modal is now a one-time confirmation, not a wall:
- Primary (green) button: "No, let me check Residency" — unchanged behaviour, saves a
  snapshot of the form and opens the tax-residency explainer.
- Secondary button: "I'm sure I'm a WHM for tax purposes" — sets a confirmation flag,
  closes the modal and submits the form immediately.
- Once confirmed, a repeat submit goes straight through without showing the modal again.

Copy change (all three languages), per client wording:
"...you aren't eligible for a tax refund this year **unless you have work-related expenses
you'd like to claim.**"
Everything else in the modal (icon, title, first paragraph, residency link, "Thank you!")
is unchanged.

## Files touched
- src/app/tax-form/FormClient.tsx only
  - added `whmConfirmedRef` and `formRef`
  - hard block became `if (taxStatus === 'whm' && !whmConfirmedRef.current)`
  - modal footer: single Close button replaced with the two buttons above
  - `ref={formRef}` attached to the form element

## Verified
tsc --noEmit clean · eslint clean · esbuild compile clean
