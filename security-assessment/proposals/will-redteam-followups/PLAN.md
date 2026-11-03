# Will red team follow-ups (not applied, behaviour changes)

Source: security-assessment/round2/sec2-will-redteam.md. Nothing here is applied to the tree.

## P1. Media vision budget check fails open (W2-05)

Where: src/lib/will/service.ts:2201. `overBudget` starts `true` but the catch sets it to `false`, so if the counter read throws, the paid vision call (describeAttachment) goes ahead with no cap. The twin at :2490 (payment proof) is deliberately fail open with a written reason (a metering failure may cost money, never a customer's proof) and is left alone.
Change: set `overBudget = true` in the :2201 catch (fail closed). Effect: during a store outage attachments are still stored and shown to staff, but no vision description is produced and the note path raises a "cannot read this" task instead of a description.
Why not applied: it changes what a customer's photo triggers during an outage. Patch: fail-closed-vision-budget.patch. Test to add with it: mock `aiBudgetExhausted` to reject and assert `describeAttachment` is not called.

## P2. Global inbound limiter drops known customers when a flood fills it (W2-03 residual)

Where: src/app/api/will/webhook/route.ts:776-781. After the sequential fix, one number can no longer exhaust the global counter alone (40 per sender per window). A botnet of many numbers each sending up to 40 can still reach 400 per 15 minutes, after which real customers' messages are dropped and the claim is kept, so Meta will not redeliver.
Plan: when the global limit is hit, still store the inbound message (no engine, no model call) for any sender that already has a customer row, and raise one REVIEW task for the team, instead of dropping it. Unknown senders stay dropped. Needs a store method `hasCustomer(waId)` (index on wa_id exists) and a test with a mocked limiter.
Why not applied: changes what is persisted for strangers and customers under load, and needs a product decision on the task wording.

## P3. Cost ceiling counts decisions, not raw model calls (W2-06)

Where: src/lib/will/service.ts:1090 (budget check), src/lib/will/engine.ts:540, :725, :886, :1103, :1197 (up to five `decide` calls per turn: first attempt plus rewrites for length, guard, price, determination).
Impact: the daily cap of 3000 bounds turns, not calls. Worst case is about 5x the nominal call count, only reachable if the model keeps producing guard-blocked drafts. Bounded by the per-sender (40) and global (400) inbound limits in any case.
Plan: call `bumpCounter` with a second key (`ai_calls:<day>`) inside `decide()` wrapper and refuse the retry decides when it passes 2x the decision budget. Needs a small migration-free change (bumpCounter already generic). Not applied: it changes retry behaviour on long days.
