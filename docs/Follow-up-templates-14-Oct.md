# Will follow-up templates (approved 14 Oct 2026)

How to use this file: every template below has ONE name in WhatsApp Manager, with
English, German and Japanese as languages under that same name.
To change a wording: WhatsApp Manager → Message templates → search the name →
Edit (English) or Add language (German / Japanese) → paste → Submit.
Variable {{1}} is always the customer's first name. Sample value for Meta: `Sarah`.
Japanese never starts with a variable, so it opens with こんにちは.

The same English text lives in the code (`src/lib/will/approved-messages.ts`) and in
the CRM Library under the same key. After a deploy, press **Sync library from file**.

---

## A. Before payment (category: Marketing)

### 1. `fu_pre_24h` · 24 hours after the last message
Goes to: a lead who has not chosen a track yet.

| Language | Text |
|---|---|
| English | `Hi {{1}}, are you still in Australia or have you already left? 😊` |
| German | `Hi {{1}}, bist du noch in Australien oder schon abgereist? 😊` |
| Japanese | `こんにちは、{{1}}さん。まだオーストラリアにいますか？それとももう帰国されましたか？😊` |

Will's reply: "already left" → "No problem at all, we can do everything from here, wherever you are 😊" + next step. "Still here" → carries on and offers to start.

### 2. `fu_pre_3d` · 3 days
| Language | Text |
|---|---|
| English | `Hi {{1}}, have you given up on your tax refund this year?` |
| German | `Hi {{1}}, hast du deine Steuerrückerstattung für dieses Jahr schon aufgegeben?` |
| Japanese | `こんにちは、{{1}}さん。今年の税金の還付はもうあきらめてしまいましたか？` |

Will's reply: "No / not yet" → "Great, let's get it sorted then 😊" + next step. "Yes / done" → "No worries at all, all the best with it 😊".

### 3. `fu_pre_7d` · 7 days (last)
| Language | Text |
|---|---|
| English | `Hi {{1}}, should I close your file for now?` |
| German | `Hi {{1}}, soll ich deine Akte erst mal schließen?` |
| Japanese | `こんにちは、{{1}}さん。いったんファイルを閉じてもよろしいですか？` |

Will's reply: "No / wait" → "Great, let's get it sorted then 😊" + next step. "Yes" → "No problem at all, all the best 😊" and the card moves to Not Interested.

### 4. `fu_price_sent` · replaces 24h + 3d for a lead who already has the bank details
| Language | Text |
|---|---|
| English | `Hi {{1}}, did the transfer go through on your end?` |
| German | `Hi {{1}}, ist die Überweisung bei dir durchgegangen?` |
| Japanese | `こんにちは、{{1}}さん。お振込みは完了しましたか？` |

Will's reply: "Yes" → "Great! Could you send me a screenshot of it so I can match it up? 😊" (the word "yes" alone never marks them Paid). "Not yet" → "No worries, whenever it's done just send me a screenshot 😊".

---

## B. Paid, form not filled in (category: Utility)

### 5. `fu_form_6h` · 6 hours
| Language | Text |
|---|---|
| English | `Hi {{1}}, did you get a chance to look at the form yet?` |
| German | `Hi {{1}}, hattest du schon Gelegenheit, dir das Formular anzusehen?` |
| Japanese | `こんにちは、{{1}}さん。フォームはもうご覧いただけましたか？` |

### 6. `fu_form_3d` · 3 days
| Language | Text |
|---|---|
| English | `Hi {{1}}, is anything in the form holding you up?` |
| German | `Hi {{1}}, hält dich irgendetwas im Formular auf?` |
| Japanese | `こんにちは、{{1}}さん。フォームで何かお困りのことはありますか？` |

### 7. `fu_form_7d` · 7 days (last)
| Language | Text |
|---|---|
| English | `Hi {{1}}, when do you think you'll have a moment for the form? I'll check back with you then 😊` |
| German | `Hi {{1}}, wann meinst du, hast du kurz Zeit für das Formular? Dann melde ich mich wieder bei dir 😊` |
| Japanese | `こんにちは、{{1}}さん。フォームのご記入はいつ頃できそうですか？その頃にまたご連絡しますね😊` |

When the customer names a day, the system checks back on that day with `fu_form_6h`.

---

## C. Waiting for the signature (category: Utility). Never "refund": these also go to customers who owe tax.

### 8. `fu_sig_24h` · 24 hours after the "ready for signature" message
| Language | Text |
|---|---|
| English | `Hi {{1}}, did the email with your tax return reach you okay?` |
| German | `Hi {{1}}, ist die E-Mail mit deiner Steuererklärung gut bei dir angekommen?` |
| Japanese | `こんにちは、{{1}}さん。確定申告書のメールは届いていますか？` |

### 9. `fu_sig_3d` · 3 days
| Language | Text |
|---|---|
| English | `Hi {{1}}, is there anything in your return you'd like me to explain before you sign?` |
| German | `Hi {{1}}, gibt es etwas in deiner Steuererklärung, das ich dir vor dem Unterschreiben erklären soll?` |
| Japanese | `こんにちは、{{1}}さん。ご署名の前に、申告書の内容で説明が必要なところはありますか？` |

### 10. `fu_sig_7d` · 7 days (last)
| Language | Text |
|---|---|
| English | `Hi {{1}}, your return is ready and waiting. When do you think you'll have a moment to sign it? I'll check back with you then 😊` |
| German | `Hi {{1}}, deine Steuererklärung ist fertig und wartet auf dich. Wann meinst du, hast du kurz Zeit, sie zu unterschreiben? Dann melde ich mich wieder bei dir 😊` |
| Japanese | `こんにちは、{{1}}さん。申告書の準備ができています。ご署名はいつ頃できそうですか？その頃にまたご連絡しますね😊` |

When the customer names a day, the system checks back on that day with `fu_sig_24h`.

---

## D. Other templates changed in this chat (create or edit in Meta)

### `estimate_payable` · Utility · {{1}} = amount (`$2,160.71`), {{2}} = invoice link
```
Your return is ready. The estimated amount payable to the ATO is {{1}}.

Here is your invoice:
{{2}}

I'll send it for final review and then for your signature. The team will walk you through the ATO payment once it's lodged.
```

### `lodged_payable` · Utility · no variables (no myGov, Jo 12 Oct)
| Language | Text |
|---|---|
| English | `Your tax return has been lodged successfully! ✅` + new line + `We'll message you again in about two weeks and walk you through how to pay. Nothing to do until then 😊` |
| German | `Deine Steuererklärung wurde erfolgreich eingereicht! ✅` + new line + `Wir melden uns in etwa zwei Wochen wieder bei dir und erklären dir, wie du bezahlst. Bis dahin musst du nichts tun 😊` |
| Japanese | `あなたの確定申告書の提出が完了しました！✅` + new line + `約2週間後にこちらから改めてご連絡し、お支払い方法をご案内します。それまでは何もしていただく必要はありません😊` |

### `review_ask_en` · must exist with exactly this name (the System card showed it missing)

### Library only (no Meta template needed, they answer within 24h)
- `price_tfn_foreign` ($330), `price_tfn_abn_foreign` ($495), `prices_foreign`: foreign income, no guarantee.
- Thank-you reply: `You're very welcome! 😊` (then `Anytime! 😊` if the first was already sent), from the code.

---

## E. Residency double-check (added 16 Oct, wording changed 25 Oct)

### `residency_check` · Utility · {{1}} = first name, sample `Sarah`
Goes to: a customer from the UK, Germany or Japan who ticked "Working Holiday Maker" for tax, 10 minutes after the form (waits for a quiet chat).
25 Oct: edit the template in WhatsApp Manager to the wording below (all three languages) and resubmit; until Meta approves it, the old approved wording is what customers receive.

**English**
```
Hi {{1}},

I went through your details and saw you marked yourself as a Working Holiday Maker for tax purposes.

Before we start on your tax return, could you please double-check this page on who counts as an Australian tax resident?

https://workingholidaytax.com.au/y8vwp4bf7

Is your answer still correct?
```

**German**
```
Hi {{1}},

ich habe deine Angaben durchgesehen und gesehen, dass du dich steuerlich als Working Holiday Maker eingetragen hast.

Bevor wir mit deiner Steuererklärung anfangen, schau bitte noch einmal auf diese Seite, wer in Australien als steuerlich ansässig gilt:

https://workingholidaytax.com.au/de/y8vwp4bf7

Ist deine Angabe noch richtig?
```

**Japanese**
```
こんにちは、{{1}}さん。

ご入力内容を確認したところ、税務上ワーキングホリデーメーカーを選択されていました。

申告書の作成を始める前に、オーストラリアの税務居住者に該当する条件について、こちらのページをもう一度ご確認いただけますか？

https://workingholidaytax.com.au/ja/y8vwp4bf7

ご回答は正しいままでよろしいですか？
```

## F. Customer who owes tax: separate template NAME per language (added 16 Oct)

| Name | Language | Variables | Text |
|---|---|---|---|
| `estimate_payable` | English | {{1}} amount `$2,160.71`, {{2}} link | Your return is ready. The estimated amount payable to the ATO is {{1}}. / Here is your invoice: / {{2}} / I'll send it for final review and then for your signature. The team will walk you through the ATO payment once it's lodged. |
| `estimate_payable_de` | German | same | Deine Steuererklärung ist fertig. Der geschätzte an das ATO zu zahlende Betrag ist {{1}}. / Hier ist deine Rechnung: / {{2}} / Ich schicke sie zur finalen Prüfung und dann zur Unterschrift. Das Team erklärt dir die Zahlung an das ATO, sobald sie eingereicht ist. |
| `estimate_payable_ja` | Japanese | same | 確定申告書の準備ができました。ATOへの推定納付額は{{1}}です。 / こちらが請求書です: / {{2}} / 最終確認後、署名のためにお送りします。提出後、ATOへの納付方法はチームがご案内します。 |
| `lodged_payable` | English | none | Your tax return has been lodged successfully! ✅ / We'll message you again in about two weeks and walk you through how to pay. Nothing to do until then 😊 |
| `lodged_payable_de` | German | none | Deine Steuererklärung wurde erfolgreich eingereicht! ✅ / Wir melden uns in etwa zwei Wochen wieder bei dir und erklären dir, wie du bezahlst. Bis dahin musst du nichts tun 😊 |
| `lodged_payable_ja` | Japanese | none | あなたの確定申告書の提出が完了しました！✅ / 約2週間後にこちらから改めてご連絡し、お支払い方法をご案内します。それまでは何もしていただく必要はありません😊 |

( / = new line)

## G. Two weeks after Mark Lodged for a customer who owes tax (added 16 Oct)
No template. An URGENT task opens for the team: "ATO PAYMENT INSTRUCTIONS DUE", with a ready opening line to fill in the amount, due date and how to pay from the Notice of Assessment.
