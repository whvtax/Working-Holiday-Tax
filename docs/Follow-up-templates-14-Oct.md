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
