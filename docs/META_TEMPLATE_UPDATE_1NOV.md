# WhatsApp templates to update in Meta (Jo, 1 Nov)

The estimate and invoice message now ends with one more paragraph, on its own line after a blank line (55 times in October the
team had to type "please don't pay the invoice, you already paid"). The English wording is
final (Jo, 1 Nov); German and Japanese are translations of it. In Meta, enter each " / " as a
line break; the last paragraph is separated from the one above by a blank line. The code text inside the
24 hour window already has it. For customers OUTSIDE the 24 hour window the message goes out
as a Meta template, so each template below must be edited in WhatsApp Manager and approved
with the exact body shown. Variables stay the same ({{1}} = amount, {{2}} = invoice link).
Until a template is approved, outside-window customers still get the old text.

| Template | Body |
|---|---|
| `estimate_invoice` | Your estimated tax refund is {{1}}. / Here is your invoice: / {{2}} / I'll send it for final review and then for your signature. / Please don't pay the invoice, as you've already paid by bank transfer |
| `estimate_invoice_de` | Deine geschätzte Steuerrückerstattung beträgt {{1}}. / Hier ist deine Rechnung: / {{2}} / Ich schicke sie zur finalen Prüfung und dann zur Unterschrift. / Bitte zahle die Rechnung nicht, da du bereits per Banküberweisung bezahlt hast |
| `estimate_invoice_ja` | あなたの推定還付金額は{{1}}です。 / こちらが請求書です: / {{2}} / 最終確認後、署名のためにお送りします。 / すでに銀行振込でお支払い済みのため、請求書のお支払いは不要です |
| `estimate_payable` | Your return is ready. The estimated amount payable to the ATO is {{1}}. / Here is your invoice: / {{2}} / I'll send it for final review and then for your signature. The team will walk you through the ATO payment once it's lodged. / Please don't pay the invoice, as you've already paid by bank transfer |
| `estimate_payable_de` | Deine Steuererklärung ist fertig. Der geschätzte an das ATO zu zahlende Betrag ist {{1}}. / Hier ist deine Rechnung: / {{2}} / Ich schicke sie zur finalen Prüfung und dann zur Unterschrift. Das Team erklärt dir die Zahlung an das ATO, sobald sie eingereicht ist. / Bitte zahle die Rechnung nicht, da du bereits per Banküberweisung bezahlt hast |
| `estimate_payable_ja` | 確定申告書の準備ができました。ATOへの推定納付額は{{1}}です。 / こちらが請求書です: / {{2}} / 最終確認後、署名のためにお送りします。提出後、ATOへの納付方法はチームがご案内します。 / すでに銀行振込でお支払い済みのため、請求書のお支払いは不要です |

## Sales follow-up: new wording for ONE template, fu_price_sent (Jo, 1 Nov; approved in Meta, now in code)

Only `fu_price_sent` changes, in three languages. `fu_pre_7d` and every other follow-up stay as they are.

Why: in 30 days 105 customers got a price and went quiet. After 24 hours the follow-up must be a fixed
template with only the name filled in, so the new wording simply invites a question.

| Template | Body |
|---|---|
| `fu_price_sent` (existing, English) | Hi {{1}}, did the transfer go through on your end? / If you have any question, just ask me here 😊 |
| `fu_price_sent_de` (new) | Hi {{1}}, hat die Überweisung bei dir geklappt? / Falls du eine Frage hast, schreib mir einfach hier 😊 |
| `fu_price_sent_ja` (new, Jo's wording) | こんにちは、{{1}}さん。お振込はお済みでしょうか？ / ご不明な点があれば、こちらにいつでもご連絡ください😊 |

" / " is a line break. The English template is edited in place; the German and Japanese ones are new
template names, so after approval Claude adds the language variants to the code (src/lib/will/approved-messages.ts
and the scheduler's template choice). A template sent with a body that differs from the approved one is rejected,
so the code is changed only after approval.
