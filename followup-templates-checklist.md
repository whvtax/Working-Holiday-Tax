# Follow-up תבניות — הוספת גרמנית/יפנית לתבניות הקיימות

**חשוב, שונה מהצ'קליסט הקודם:** אלה **לא** תבניות עם שם נפרד לכל שפה. זה **שם תבנית אחד** שכבר קיים (וככל הנראה מאושר רק באנגלית) — פשוט פותחים את התבנית הקיימת ולוחצים **"Add language"** / **Edit template**, ומוסיפים גרסת German ו-Japanese תחת **אותו שם**.

Category: **Marketing** (כפי שראינו ב-`fu_sig_3d`). משתנה אחד בכל התבניות: **{{1}}** = השם הפרטי של הלקוח.

---

## Pre-payment (ליד שעדיין לא שילם)

### fu_pre_24h
```
en: Hi {{1}}, just checking in about your tax return. Any questions? Otherwise, just say the word and we'll get started.

de: Hi {{1}}, ich wollte kurz nach deiner Steuererklärung fragen. Hast du noch Fragen? Ansonsten sag einfach Bescheid und wir legen los.

ja: {{1}}さん、確定申告の件で少し確認したく連絡しました。ご質問はありますか？特になければ、ひと言いただければすぐに始めます。
```

### fu_pre_3d
```
en: Hi {{1}}, most people doing it alone miss things they could have claimed. That's exactly what our team helps you with.

Want me to get you started?

de: Hi {{1}}, die meisten, die es allein machen, übersehen Dinge, die sie hätten geltend machen können. Genau dabei hilft dir unser Team.

Soll ich dich starten lassen?

ja: {{1}}さん、自分だけで手続きをすると、本来請求できるはずのものを見落としてしまうことがよくあります。まさにそこを私たちのチームがサポートします。

こちらで手続きを始めましょうか？
```

### fu_pre_7d
```
en: Hi {{1}}, last message from me 😊 If you want your tax looked at later, just text me any time.

de: Hi {{1}}, das ist meine letzte Nachricht 😊 Wenn du deine Steuer später prüfen lassen möchtest, schreib mir einfach jederzeit.

ja: {{1}}さん、こちらからのご連絡はこれで最後にしますね 😊 後でも確定申告を見てほしくなったら、いつでもメッセージしてください。
```

---

## Form (שילם, מחכים לשאלון)

### fu_form_6h
```
en: Hi {{1}}, we haven't got your form yet. It's quick to fill in and we can start as soon as it's in.

de: Hi {{1}}, wir haben dein Formular noch nicht erhalten. Es ist schnell ausgefüllt, und wir können starten, sobald es da ist.

ja: {{1}}さん、まだフォームが届いていません。記入は簡単で、届き次第すぐに始められます。
```

### fu_form_3d
```
en: Hi {{1}}, your review is waiting on your form. If anything in it is holding you up, tell me what and I'll sort it 😊

de: Hi {{1}}, deine Prüfung wartet noch auf dein Formular. Wenn dich etwas daran aufhält, sag mir Bescheid und ich kümmere mich darum 😊

ja: {{1}}さん、審査はフォームの到着待ちです。何か引っかかっている点があれば教えてください、対応します 😊
```

### fu_form_7d
```
en: Hi {{1}}, I haven't heard back, so I'll leave it here for now. Whenever you send your form, just text me and we'll pick it straight back up.

de: Hi {{1}}, ich habe nichts mehr von dir gehört, deshalb lasse ich es erstmal dabei. Sobald du dein Formular schickst, schreib mir einfach und wir machen direkt weiter.

ja: {{1}}さん、その後ご連絡がないため、ひとまずここまでにしますね。フォームを送っていただければ、いつでもメッセージください、すぐに再開します。
```

---

## Signature (מחכים לחתימה)

### fu_sig_24h
```
en: Hi {{1}}, we just need your signature and we're good to lodge. Let me know if the email didn't reach you

de: Hi {{1}}, wir brauchen nur noch deine Unterschrift, dann können wir einreichen. Sag mir Bescheid, falls die E-Mail nicht angekommen ist

ja: {{1}}さん、あとは署名だけいただければ提出できます。メールが届いていない場合はお知らせください
```

### fu_sig_3d
```
en: Hi {{1}}, once you sign, we lodge it with the ATO. If anything in it looks off, tell me and I'll check it.

de: Hi {{1}}, sobald du unterschrieben hast, reichen wir es beim ATO ein. Falls dir etwas darin komisch vorkommt, sag mir Bescheid und ich prüfe es.

ja: {{1}}さん、署名いただき次第、ATOに提出します。内容に気になる点があれば教えてください、確認します。
```

### fu_sig_7d
```
en: Hi {{1}}, your return is finished and ready to go, it just needs your signature.

Nothing gets lodged until it's signed, so send it through whenever you're ready.

de: Hi {{1}}, deine Steuererklärung ist fertig und einreichbereit, es fehlt nur noch deine Unterschrift.

Es wird erst eingereicht, wenn sie unterschrieben ist, also schick sie, sobald du bereit bist.

ja: {{1}}さん、確定申告書は完成していて、あとは署名だけです。

署名がないと提出されませんので、準備ができたタイミングで送ってください。
```

---

## איך להוסיף (לכל אחת מ-9)

1. ב-WhatsApp Manager → Message Templates, חפשו את שם התבנית (למשל `fu_pre_24h`).
2. פתחו אותה ולחצו **Edit** (או "Add language" אם קיימת אפשרות כזו ישירות).
3. הוסיפו שפה חדשה: **German** — הדביקו את הטקסט הגרמני, ודאו ש-{{1}} מסומן כמשתנה (Add variable).
4. שלחו לאישור (Submit for review).
5. חזרו על שלב 3-4 עבור **Japanese**.
6. חזרו על כל זה לכל 9 השמות.
