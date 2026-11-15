# 016 Ask Atlas: a read-only question box over the CRM data

Status: proposed for Jo's review (15 Nov 2026). Built behind the CRM login; nothing is shipped.

## Why

The search bar on the Atlas page should answer questions in plain language, using only the company's own data. Jo asks it, Atlas answers, and it does not use outside knowledge.

## Decisions

1. Read-only. The question box reads data and answers. It cannot change a customer, send a message, create a task or touch a payment.
2. Answers come only from the data the server passes in this request. The system prompt says so and says to answer "I don't have that in the data" when the answer is not there. No web search, no guessing.
3. Data passed to the model in v1 is the same 24-hour morning report that the Atlas page already shows: counts, and the names, waiting times and last-message previews of customers who are waiting or stuck. No TFNs, passports, bank details, addresses or uploaded documents are passed.
4. The model call goes through the existing `anthropicMessages` transport, with the existing model setting (`CLAUDE_MODEL`, default `claude-sonnet-4-5`), and is recorded in the existing AI usage log under the feature `atlas`.
5. The endpoint `/api/atlas/ask` requires a valid CRM session, uses the same cross-site guard as the other CRM API routes, and checks the question (text, 1 to 500 characters) on the server.
6. Customer names and message previews do reach the model provider. Will already sends customer messages to the same provider (decision 004), so this is the same kind of flow, but it is a new purpose and Jo must approve it.
7. Sources not yet connected (bank, ATO dates, Mia, Instagram, TikTok) are not in the data. The answer says so, instead of guessing.

## Alternatives considered

- Give the model tools that search every customer and task. Rejected for v1: it widens what leaves the database and needs its own review. It can be added in a later decision.
- Keep a plain search box. Rejected: Jo asked for questions in plain language.

## Consequences

- Answers are only as current as the morning report (last 24 hours). The page says so under the answer.
- Not tested against live data in this environment: no credentials here.
