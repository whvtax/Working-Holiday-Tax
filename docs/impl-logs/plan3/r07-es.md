# r07 es: Spanish WHT, tax return and super (24 Nov 2026)

Scope: /es/tax-return, /es/devolucion-impuestos-australia, /es/superannuation, Spanish guides (144, chunks 01 to 19).
Code read: /home/claude/v68/base20 (read only). Nothing edited.

## 1. Findings

F1 (fact, GSC 3 months to 21 Nov, S/gsc24/wht/Pages.csv). 54 /es URLs have impressions. Money pages are weak:
/es/superannuation 74 impr, 0 clicks, pos 6.07; /es/tax-return 14 impr, pos 29; /es/devolucion-impuestos-australia has
NO row at all (also absent in the older exports, see S/analysis/a08 line 35). Top ES rows are work topics (minimum wage
258 impr, RSA 75). Tax-back guide 45 impr, pos 6. ES went live 3 Nov (src/lib/blog-dates.ts line 143), so this is about
three weeks of data.

F2 (fact, Countries.csv). Spain 601 impr / 3 clicks, Argentina 274 / 2, Chile 194 / 3, Mexico 191, Peru 148, Colombia
130, Uruguay 22. (Inference) Many of these are Spanish speakers in or back from Australia; the money is with Spain,
Argentina, Chile, Uruguay (462 holders), the audience the flagship comment already names.

F3 (fact, SERPs checked 24 Nov via WebSearch).
- "devolución impuestos Australia working holiday": yomeanimo.com (two pages, a paid service), ato.gov.au WHM pages,
  holafly blog. No workingholidaytax.com.au result.
- "recuperar superannuation Australia DASP" and "cómo recuperar el super de Australia desde Argentina": ATO Spanish DASP
  page (https://www.ato.gov.au/other-languages/spanish/departing-australia-superannuation-payment-dasp-for-temporary-residents-spanish,
  updated 17 Jun 2026), ATO English DASP pages, yomeanimo.com/como-solicitar-la-superannuation, a community.ato.gov.au
  thread, fund pages (AustralianSuper, Rest, QSuper), pvtistes (French).
- myGov problem queries in Spanish ("myGov código SMS no llega número australiano extranjero", "no puedo entrar a myGov
  desde el extranjero tax return Australia", "myGov cuenta bloqueada", "tax return Australia desde España sin myGov"):
  ONLY English official pages (my.gov.au help, ato.gov.au), community.ato.gov.au threads (10+ in one SERP), pvtistes
  (French), odintax, wise.com, ozbargain. Not one Spanish-language page answers the problem.
  (Inference) This is the weakest competition we have seen in any language: a Spanish answer page has no Spanish rival,
  and Google already shows forum threads (the same pattern as our TFN wins, positions 5 to 7).

F4 (fact, code). ES guides are keyed by the ENGLISH slug and inherit slug, category and date from the EN guide
(src/lib/locale-blog.ts lines 85 to 104: `hasGuide` needs the slug in enGuides). A new ES guide therefore 404s unless an
EN guide with the same slug exists in src/app/(site)/blog/data.ts. EN and ES have the same 144 guides today; none is about
myGov (no slug contains mygov, sms or myid). Body links: `/tax-return` and `/blog/<slug>` are rewritten to /es/...,
an explicit `/es/devolucion-impuestos-australia` link is left as is (localizeBodyLinks).

F5 (fact, code). What ES already says about myGov:
- Home: comparison row "Necesitas una cuenta y un número de teléfono activo / No necesitas nada. Nosotros tratamos con
  la ATO" (src/app/(es)/es/page.tsx line 132), and "No tendrás que entrar a myGov" (line 272).
- Flagship: hero "sin myGov y sin payslips" (line 397), DIY section "¿Puedo hacerlo yo en myGov?" (line 577), FAQ on
  myGov password (line 281), abroad section recommends myID (line 555).
- /es/tax-return: meta description "Sin payslips ni myGov" (frozen), FAQ 225 "No hay que crear ninguna cuenta del
  gobierno", no H2 about myGov problems.
- /es/superannuation: "La solicitud del DASP no necesita myGov" (line 373); no FAQ says it.
- Guides: how-to-lodge-tax-return-from-overseas (chunk 03 line 425 onward) has one paragraph on a dead Australian SIM;
  tfn-security-protect-from-fraud (chunk 12) mentions it once. No guide explains SMS, lockout, linking or myID.
(Inference) The promise "sin myGov" is on the pages, but nothing captures the searches of the person who is stuck.

F6 (facts for the new content, all official; used verbatim in the texts below):
- SMS codes overseas need the Australian number registered in myGov, with international roaming on, on a network the
  provider supports. If you cannot use the old number, sign in with Digital ID or create a new myGov account; the
  helpdesk can release your old email address. Changing the number needs access to the current number.
  https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-a-code-sent-by-sms
- Before travelling, check your sign-in; SMS and Code Generator users must make sure they can get codes overseas.
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/accessing-mygov-while-overseas
- Code Generator app is no longer available in app stores; travellers from 28 Feb 2027 should set up another option.
  https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-the-mygov-code-generator-app
- Authenticator: you must already be signed in to add it.
  https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-an-authenticator
- Locked account: "Unlock your account now" needs your security code, secret answer and a new password; otherwise
  create a new account and relink your services.
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help
- myGov helpdesk from overseas: +61 1300 169 468, option 1; Mon to Fri 7 am to 10 pm, Sat and Sun 10 am to 5 pm,
  Australian local time. https://my.gov.au/en/about/help/contact
- ATO: recover with myID only at Strong strength; else create a new account and relink to the ATO; Standard myID
  recommended if Strong is not possible.
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account
- ATO linking: sign in with myID, passkey, authenticator or SMS to an Australian mobile; overseas or without an
  Australian mobile use myID, passkey or authenticator; identity questions come from ATO records (bank account, super
  account, notice of assessment, PAYG payment summary, travel document, TFN application receipt, ATO refund amount,
  recent payslip...); skipping all questions counts as a failed attempt.
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato/information-you-need-to-link-mygov-to-the-ato
- myID: Standard = any 2 documents (a visa checked with your foreign passport counts as one; others: Australian
  drivers licence, Medicare card, ImmiCard...); Strong needs an Australian passport plus face check.
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/increase-your-online-security-with-myid/strengthen-your-sign-in-with-myid
- Lodging from outside Australia: update myGov sign-in for overseas (ATO recommends myID), or lodge with a registered
  tax agent; Australian bank account needed for a refund.
  https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia
- DASP: three ways (DASP online application system, free; paper NAT 7204 to the fund or NAT 74880 for ATO-held super;
  an authorised registered tax agent or other person with written authority). myGov is not one of them. 65 % WHM rate;
  generally paid within 28 days of a complete application.
  https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp
- DASP online system: enter details exactly as in your passport; you create a "shared secret"; the system does not show
  status; wrong visa data: do not submit, email DASPmail@ato.gov.au; from overseas call +61 2 6216 1111, 8 am to 5 pm
  Mon to Fri AET, ask for 13 10 20.
  https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system
Not verified, left out: whether myGov accepts foreign mobile numbers for SMS (no official page says so; my.gov.au only
describes an Australian number with roaming), how passkeys are set up, any time limit on unlocking.

## 2. Proposals

Dependency for every new guide (F4): the EN guide with the same slug must be added to src/app/(site)/blog/data.ts in the
same release (category, date). Coordinate with the EN report owner; if EN does not ship the slug, the ES guide is a 404.
Slugs below were checked against the 144 EN slugs: no collision.
Approved ES phrases used (existing in code): "Revisado y aprobado por un agente fiscal registrado antes de presentarse
ante la ATO" and "Nosotros tratamos con la ATO" (home line 132), extended to "tratamos directamente con la ATO".

Standard closing CTA for all new guides (put as the last section of the body):
> ## ¿Prefieres no pelearte con myGov?
> No necesitas myGov para tu tax return con nosotros: tratamos directamente con la ATO. Te enviamos el tax return
> terminado, lo lees y lo firmas, y es revisado y aprobado por un agente fiscal registrado antes de presentarse ante
> la ATO. [Escríbenos por WhatsApp desde la página del tax return](/tax-return) y cuéntanos qué te bloquea.

### P1-A. New guide: SMS code not arriving (highest value; zero Spanish competition, F3)
File: new entry in a new src/app/(es)/es/blog/chunks/20.ts (import in blog/data.ts mergeChunks list). EN twin slug needed.
- slug: `mygov-sms-code-not-received-overseas` (category Tax Return)
- title (57): `No me llega el código SMS de myGov: qué hacer desde fuera`
- description (153): `¿Volviste a tu país y myGov sigue mandando el código a tu número australiano? Qué dice myGov, cómo recuperar el acceso y cómo hacer el tax return sin él.`
- body:

Si myGov te pide un código SMS y ya no tienes tu número australiano, el código no te va a llegar: myGov solo lo envía al
número australiano registrado en tu cuenta, y desde el extranjero ese número tiene que tener el roaming activado. Si ya
no tienes esa SIM, puedes entrar con una identidad digital (Digital ID) o crear una cuenta nueva de myGov. Y si lo que
quieres es tu devolución, para hacer el tax return con nosotros no necesitas myGov.

## ¿Por qué no me llega el código SMS de myGov?
Porque va a tu número australiano. Según la ayuda de myGov sobre los [códigos por SMS](https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-a-code-sent-by-sms) (en inglés), para recibirlos fuera de Australia tu número australiano registrado tiene que tener el roaming internacional activado y tu teléfono tiene que conectarse a una red que tu compañía admita. Una SIM prepaga que caducó al irte no recibe nada.

Antes de cambiar nada, myGov sugiere revisar lo básico en su [ayuda para iniciar sesión](https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help) (en inglés): que tengas señal, que el modo avión esté apagado, que el teléfono tenga espacio y que el mensaje no esté en la carpeta de bloqueados o spam.

## ¿Puedo cambiar el número por uno de mi país?
No desde fuera de la cuenta. Para cambiar el número que recibe los códigos tienes que entrar primero, y para entrar necesitas el número actual. Ese es el círculo en el que queda la mayoría de quienes vuelven a España, Argentina o Chile. myGov no indica en su ayuda que acepte un número extranjero para los códigos.

## ¿Qué opciones da myGov si ya no tengo el número?
Dos, según la página de [códigos por SMS](https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-a-code-sent-by-sms) (en inglés):
- Entrar con Digital ID, como myID, si ya la tenías configurada.
- Crear una cuenta nueva de myGov y volver a vincular la ATO. Si quieres usar el mismo correo, el helpdesk de myGov puede liberarlo.

El helpdesk de myGov atiende desde el extranjero en el +61 1300 169 468, opción 1, de lunes a viernes de 7 a 22 h y sábados y domingos de 10 a 17 h, hora de Australia ([contacto de myGov](https://my.gov.au/en/about/help/contact), en inglés).

## ¿Sirve myID si tengo pasaporte español o argentino?
Para recuperar una cuenta, la ATO pide myID con nivel Strong ([cuando no puedes entrar a myGov](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account), en inglés), y el nivel Strong exige un pasaporte australiano. Con un pasaporte extranjero myID verifica tu visa, que cuenta como un documento, y para el nivel Standard necesitas un segundo documento de la lista, como una licencia de conducir australiana ([niveles de myID](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/increase-your-online-security-with-myid/strengthen-your-sign-in-with-myid), en inglés). Lo explicamos en [myID con pasaporte extranjero](/blog/myid-foreign-passport-working-holiday).

## ¿Y si creo una cuenta nueva?
Tendrás que volver a vincular la ATO, y eso pide responder preguntas sobre datos que la ATO ya tiene de ti, como tu cuenta bancaria, tu fondo de super, un notice of assessment o un payslip reciente. Desde fuera, la ATO recomienda entrar con myID, una passkey o un authenticator en lugar de SMS ([crear una cuenta y vincular la ATO](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato), en inglés). Si se traba ahí, mira [qué hacer si no puedes vincular la ATO](/blog/cant-link-ato-to-mygov).

## ¿Necesito myGov para recibir mi devolución?
No. myGov es una de las vías para presentar. La ATO indica que también puedes presentar con un agente fiscal registrado ([presentar desde fuera de Australia](https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia), en inglés). Lo que sí necesitas es una cuenta bancaria australiana para cobrar la devolución. Para la super tampoco hace falta: el [DASP se pide sin myGov](/blog/claim-super-without-mygov).

## ¿Cómo evitar que te pase antes de irte?
Si todavía estás en Australia: entra a myGov, añade un authenticator (solo se puede añadir con la sesión iniciada, según [myGov](https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-an-authenticator), en inglés) y deja anotado tu TFN. La app myGov Code Generator ya no se puede descargar, y myGov pide a quien viaje desde el 28 de febrero de 2027 configurar otra opción antes de salir ([Code Generator](https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-the-mygov-code-generator-app), en inglés). Más en [impuestos al salir de Australia](/blog/tax-obligations-after-leaving-australia).

[CTA estándar]

Internal links in: from how-to-lodge-tax-return-from-overseas (chunk 03, after the "SIM australiana muerta" paragraph,
line ~427): "Si es tu caso, mira [qué hacer si no te llega el código SMS de myGov](/blog/mygov-sms-code-not-received-overseas)."
Also from tfn-security-protect-from-fraud (chunk 12 line with "una SIM australiana muerta") and from the flagship abroad
section (P1-D).

### P1-B. New guide: no access to myGov, umbrella problem page
- slug: `no-mygov-access-tax-return` (category Tax Return)
- title (50): `Sin acceso a myGov: cómo hacer igual tu tax return`
- description (155): `Cuenta bloqueada, número australiano perdido o la ATO sin vincular: lo que dice myGov para cada caso y cómo presentar tu tax return de 462 o 417 sin myGov.`
- body:

Si no puedes entrar a myGov, todavía puedes hacer tu tax return: la ATO acepta la declaración presentada por un agente
fiscal registrado, sin que tú entres a myGov. Recuperar la cuenta depende de por qué te bloquea, y abajo está lo que dice
myGov para cada caso. Para tu devolución solo hace falta una cuenta bancaria australiana.

## ¿Por qué no puedo entrar a myGov?
Casi siempre por una de cuatro razones: el código SMS va a un número australiano que ya no tienes, la cuenta se bloqueó por demasiados intentos, la ATO no está vinculada o la vinculación pide una identidad que no puedes verificar desde fuera. Cada una tiene su salida.

## ¿Qué hago si mi cuenta de myGov está bloqueada?
myGov bloquea la cuenta cuando se ingresan mal los datos demasiadas veces. Para desbloquearla eliges "Unlock your account now" y necesitas tu código de seguridad, la respuesta a tu pregunta secreta y una contraseña nueva. Si no tienes eso, hay que crear una cuenta nueva y volver a vincular tus servicios ([ayuda para iniciar sesión](https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help), en inglés).

## ¿Y si el código SMS va a mi número australiano viejo?
Es el caso más común después de volver a casa, y tiene su propia guía: [no me llega el código SMS de myGov](/blog/mygov-sms-code-not-received-overseas).

## ¿Puedo recuperar la cuenta con myID?
Solo con myID de nivel Strong, según la ATO ([cuando no puedes entrar a myGov](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account), en inglés). Strong exige un pasaporte australiano, así que con pasaporte español, argentino, chileno o uruguayo normalmente queda la cuenta nueva. Detalles en [myID con pasaporte extranjero](/blog/myid-foreign-passport-working-holiday).

## ¿A quién llamo desde el extranjero?
Por la cuenta, al helpdesk de myGov: +61 1300 169 468, opción 1 ([contacto de myGov](https://my.gov.au/en/about/help/contact), en inglés). Por tus impuestos, a la ATO: +61 2 6216 1111, de 8 a 17 h de lunes a viernes, hora del este de Australia ([ayuda del DASP en línea de la ATO](https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system), en inglés).

## ¿Puedo presentar el tax return sin myGov?
Sí. La ATO menciona dos vías para quien está fuera: myTax con el acceso de myGov preparado para el extranjero, o un agente fiscal registrado, que además puede tener un plazo más largo con su programa de presentaciones ([presentar desde fuera de Australia](https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia), en inglés). Un agente nunca necesita tu contraseña de myGov. Si tienes años sin presentar, mira [años anteriores](/blog/past-years-tax-returns-working-holiday).

## ¿Y mi super?
Tampoco depende de myGov: el DASP se pide en el sistema en línea de la ATO con los datos de tu pasaporte. Ver [recuperar la super sin myGov](/blog/claim-super-without-mygov) y la página de [superannuation](/superannuation).

[CTA estándar]

### P1-C. New guide: claim super without myGov
- slug: `claim-super-without-mygov` (category Super)
- title (52): `Recuperar tu super sin myGov: el DASP no lo necesita`
- description (155): `El DASP se pide en el sistema en línea de la ATO con tu pasaporte, sin myGov. Qué datos te piden, qué hacer si la visa figura activa y cómo seguir el pago.`
- body:

Para recuperar tu superannuation no necesitas myGov. El DASP se pide en el sistema en línea de la ATO, gratis, con tus
datos personales y los de tu pasaporte, o con un formulario en papel. Puedes enviarlo cuando ya saliste de Australia y tu
visa terminó, y con una visa 462 o 417 se retiene el 65 % del componente gravable.

## ¿Cómo se pide el DASP sin myGov?
La ATO da tres vías: el sistema en línea del DASP, el formulario en papel (NAT 7204 para la super que está en un fondo, NAT 74880 para la que ya tiene la ATO) o autorizar por escrito a un agente fiscal registrado u otra persona ([DASP, ATO](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp), en inglés). myGov no es una de ellas: solo sirve para ver tus fondos.

## ¿Qué datos me pide el sistema en línea?
Tus datos tal como figuran en tu pasaporte, y una "shared secret", una pregunta y respuesta que eliges tú. Para volver a entrar a la solicitud tienes que escribir exactamente los mismos datos: TFN, nombre, pasaporte y fecha de nacimiento ([ayuda del sistema en línea](https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system), en inglés).

## ¿Y si no sé en qué fondos tengo super?
Sin myGov, la guía para [encontrar tu super perdida](/blog/how-to-find-lost-superannuation) explica por dónde buscar. Si sabes el fondo pero el sistema no lo encuentra, puedes añadir la solicitud con el ABN del fondo.

## ¿Qué hago si el sistema dice que mi visa sigue activa?
No envíes la solicitud en línea. La ATO pide escribir a DASPmail@ato.gov.au si crees que la información de tu visa está mal ([ayuda del sistema en línea](https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system), en inglés). Las causas típicas de rechazo están en [DASP rechazado](/blog/dasp-rejected-what-to-do).

## ¿Cómo sé si ya me pagaron?
El sistema en línea no muestra el estado. El plazo de servicio es de 28 días desde la solicitud completa; para la super que está en un fondo, pregunta al fondo, y para la que tiene la ATO, llama desde fuera al +61 2 6216 1111 y pide el 13 10 20 (misma fuente). Más en [cuánto tarda el DASP](/blog/how-long-does-dasp-take).

## ¿La super y la devolución de impuestos son lo mismo?
No: son dos trámites. La devolución sale de tu tax return y solo se paga en una cuenta australiana. Ver la [guía de la devolución de impuestos](/es/devolucion-impuestos-australia).

Closing (super variant, approved wording): "Si prefieres que lo revisemos contigo, [escríbenos por WhatsApp desde la
página de superannuation](/superannuation). Y si además tienes un tax return pendiente, no necesitas myGov: tratamos
directamente con la ATO, y es revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO."
Do not write "presentamos tu DASP" (see section 3).

### P1-D. Existing money pages: catch the stuck visitor (no title/description/H1 change)
1. /es/tax-return (src/app/(es)/es/tax-return/page.tsx): add one FAQ after line 255 (FAQ list feeds FAQPage JSON-LD):
   q: `No puedo entrar a myGov y no me llega el código SMS. ¿Puedo hacer el tax return igual?`
   a: `Sí. No necesitas myGov: nosotros tratamos directamente con la ATO y nadie te va a pedir tu contraseña. myGov solo envía los códigos SMS a tu número australiano, así que al volver a tu país es normal quedarte fuera. Tu tax return es revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO, y la devolución se paga en una cuenta bancaria australiana.`
   Plus a text link under the FAQ section: "Si quieres recuperar la cuenta igual: [sin acceso a myGov](guideHref('no-mygov-access-tax-return'))".
   Sources: my.gov.au SMS page; ATO lodge from outside Australia (F6).
2. Flagship (devolucion-impuestos-australia/page.tsx), abroad section after line 556: one sentence + 2 links:
   `Si ya no recibes los códigos SMS de myGov o tu cuenta está bloqueada, mira qué hacer en estas guías: <no me llega el código SMS> y <sin acceso a myGov>.` (guideHref/guideText pattern, already imported).
3. /es/superannuation: add FAQ after line 183:
   q: `¿Necesito myGov para recuperar mi super?`
   a: `No. El DASP se pide en el sistema en línea de la ATO con los datos de tu pasaporte, o con un formulario en papel, y ninguna de las dos vías pasa por myGov. myGov sirve para ver tus fondos si todavía puedes entrar. Si perdiste el acceso porque los códigos llegan a tu número australiano viejo, el reclamo de la super no cambia.`
   Source: ATO DASP page (F6). Add `claim-super-without-mygov` to the guides list (line ~306) once live.

### P2-A. New guide: cannot link the ATO to myGov
- slug: `cant-link-ato-to-mygov` (category Tax Return)
- title (43): `No puedo vincular la ATO a myGov: qué hacer`
- description (155): `La ATO te hace preguntas sobre datos que ya tiene de ti. Cuáles son, qué opción de acceso usar desde fuera de Australia y qué hacer si no puedes responder.`
- opening: `Para vincular la ATO a myGov tienes que responder preguntas sobre datos que la ATO ya tiene de ti, como tu cuenta bancaria, tu fondo de super o un payslip reciente. No hace falta responderlas todas, pero saltarlas todas cuenta como un intento fallido. Si no lo logras, no necesitas la vinculación para tu tax return con nosotros.`
- H2s: ¿Qué preguntas hace la ATO? (list from F6 "information you need" URL); ¿Qué opción de acceso uso desde
  fuera? (myID, passkey o authenticator, not SMS; ATO create-account URL); ¿Qué pasa si no puedo responder? ("If you're
  unable to confirm your identity online, we'll guide you on what to do next": say "la ATO te indica el siguiente paso",
  same URL); ¿Dónde encuentro esos datos desde mi país? (income statement / payslip, link /blog/what-is-income-statement,
  /blog/how-to-read-australian-payslip); ¿Lo necesito para mi devolución? (agent route, ATO lodge-outside URL). Links:
  /tax-return, /blog/no-mygov-access-tax-return, /blog/how-to-lodge-tax-return-from-overseas. CTA estándar.

### P2-B. New guide: myID with a foreign passport
- slug: `myid-foreign-passport-working-holiday` (category Tax Return)
- title (53): `myID con pasaporte extranjero: qué nivel puedes tener`
- description (153): `Con pasaporte español o latinoamericano, myID verifica tu visa como un documento. Qué segundo documento te sirve, por qué no llegas a Strong y qué hacer.`
- opening: `Con un pasaporte que no es australiano, myID puede verificar tu visa como uno de los dos documentos que pide el nivel Standard, y el segundo tiene que salir de la lista, por ejemplo una licencia de conducir australiana. El nivel Strong exige un pasaporte australiano, así que no está a tu alcance. Eso importa porque la ATO solo deja recuperar una cuenta de myGov con myID Strong.`
- H2s: ¿Qué documentos acepta myID para el nivel Standard?; ¿Por qué no puedo llegar a Strong?; ¿Para qué me alcanza
  el nivel Standard? (ATO recommends Standard myID to sign in after creating a new account: ATO "when you can't sign in"
  URL); ¿Y si no tengo ningún documento australiano? (then myID Standard is not possible: inference, phrase as "la lista
  de la ATO no incluye documentos de tu país" and point to the agent route). Sources: ATO myID strength page, ATO
  can't-sign-in page. Links: /blog/no-mygov-access-tax-return, /blog/mygov-sms-code-not-received-overseas, /tax-return.
  Note: myid.gov.au help pages did not render for verification; keep facts to the ATO page only.

### P2-C. Contextual links from existing ES guides (add only, below openings; none of these openings is frozen)
- chunk 03 how-to-lodge-tax-return-from-overseas, after line 427 paragraph: link to P1-A.
- chunk 19 past-years-tax-returns-working-holiday, section "¿Puedes presentar años anteriores desde el extranjero?":
  "Si el problema es entrar a myGov, mira [sin acceso a myGov](/blog/no-mygov-access-tax-return)."
- chunk 18 early-tax-return-leaving-australia and the tax-obligations-after-leaving-australia guide (69 impr, pos 15.6,
  F1): one checklist line "Configura un authenticator en myGov antes de irte, porque los códigos SMS solo llegan a tu
  número australiano" with the my.gov.au authenticator URL, plus link to P1-A.
- chunk 05/11 super guides (how-to-find-lost-superannuation, dasp-documents-required): link to P1-C.
- tax-back-australia-working-holiday (FROZEN opening, 45 impr, pos 6): add only at the end of the 5-step list
  "¿No puedes entrar a myGov? No lo necesitas: [sin acceso a myGov](/blog/no-mygov-access-tax-return)."

### P3-A. Spanish vocabulary of the ATO itself
The ATO's Spanish DASP page calls super "pensión" / "fondo de pensión" and DASP "Pago de pensión al salir de Australia"
(ATO Spanish URL in F3). Add once, in body text of /es/superannuation "Cómo reclamar" section (not H1, not title):
`La ATO, en su página en español, lo llama "pago de pensión al salir de Australia".` with that URL. (Inference) helps
"recuperar pensión Australia" and "fondo de pensión Australia" phrasing used in Spain.

### P3-B. Measurement for December
Track per URL weekly: /es/devolucion-impuestos-australia (expected first impressions; if still none on 7 Dec, request
indexing in GSC, see a08), /es/tax-return position, and the five new slugs. Spanish myGov queries will show as
long-tail rows; record "mygov" queries per country (Spain, Argentina, Chile).

## 3. What NOT to do
- Do not ship any ES guide without its EN twin slug in src/app/(site)/blog/data.ts (F4: otherwise 404 and the internal
  links fall back to /blog/<slug> in English, which also 404s).
- Do not change titles, descriptions or H1s of /es/tax-return, the flagship or /es/superannuation before the 7 Dec
  measurement; P1-D adds FAQ items and links only.
- Do not create a separate "/es/sin-mygov" landing page: it would compete with /es/tax-return and the flagship (two ES
  pages already target "tax return" / "devolución de impuestos"; F1 shows neither ranks yet). The problem guides are the
  intent pages; the money pages stay the conversion pages.
- Do not merge P1-A into P1-B: the SMS query is distinct and the most searched problem; P1-B links to it instead of
  repeating it. Do not repeat the overseas-lodging content of how-to-lodge-tax-return-from-overseas; link to it.
- Never claim a foreign number works for myGov SMS, never give steps for passkeys, never promise the ATO will unlock or
  relink (none verified). Never say "presentamos tu tax return" or "somos agentes"; use the approved sign-off sentence.
- Super: SVT-style consolidation is not our claim here either; do not write "presentamos tu DASP". Note for the lead:
  the guide aside blurb in src/app/(es)/es/blog/[slug]/page.tsx line 107 says "presentamos el reclamo una sola vez";
  check with Jo whether WHT acts as the claimant's representative for DASP (ATO allows a registered tax agent or another
  person with written authority). If not, change to "te guiamos en el reclamo".
- No refund amounts, no prices, no em/en dashes, tuteo only (no vos, no vosotros), "Australia" not "Oz".
- Do not link to community.ato.gov.au threads, yomeanimo or pvtistes; cite only my.gov.au and ato.gov.au.
