// 24 Nov 2026 (plan 3, r07 / r11 / r12 / r13): five problem guides. Keyed by the English
// slug; each one renders only once its English twin exists in src/app/(site)/blog/data.ts.
// The Spanish set has no myGov hub guide, so tax-return-without-mygov acts as the parent
// of the two myGov access guides. Tuteo throughout.
export const chunk: Record<string, { title: string; description: string; body: string }> = {
  'mygov-sms-code-not-received-overseas': {
    title: 'No me llega el código SMS de myGov: qué hacer desde fuera',
    description: '¿Volviste a tu país y myGov sigue mandando el código a tu número australiano? Qué dice myGov, cómo recuperar el acceso y cómo hacer el tax return sin él.',
    body: `
Si myGov te pide un código SMS y ya no tienes tu número australiano, el código no te va a llegar: myGov lo envía solo al número registrado en tu cuenta, y desde fuera de Australia ese número tiene que tener el roaming internacional activado. Sin esa SIM puedes entrar con la app de myGov, una passkey o una identidad digital como myID, siempre que ya las tuvieras configuradas. Si no, myGov ofrece recuperar la cuenta con myID o crear una cuenta nueva, y para que te ayudemos con tu tax return no necesitas myGov.

## ¿Por qué no me llega el código SMS de myGov?

Porque va a un único número, el que está registrado en tu cuenta. Según la ayuda de myGov sobre los [códigos por SMS](https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-a-code-sent-by-sms) (en inglés), fuera de Australia tienes que usar ese mismo número australiano, con el roaming internacional activado y conectado a una red que tu compañía admita. Una SIM prepaga que caducó cuando te fuiste no recibe nada.

Antes de cambiar nada, myGov sugiere revisar lo básico: que tengas señal, que el modo avión esté apagado, que el teléfono tenga espacio libre y que el mensaje no haya caído en la carpeta de bloqueados o de spam.

## ¿Puedo cambiar el número por uno de mi país?

No desde fuera de la cuenta. El número se cambia dentro de myGov, y para entrar necesitas el código que va al número actual. Ese es el círculo en el que queda la mayoría de quienes vuelven a España, Argentina, Chile o Uruguay.

Para la ATO hay además una regla propia: el código por SMS solo sirve con un número de móvil australiano. Si estás en el extranjero o no tienes número australiano, la ATO recomienda entrar con myID, una passkey o un authenticator ([crear una cuenta de myGov y vincular la ATO](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato), en inglés).

## ¿Qué opciones tengo si ya no tengo el número?

Depende de lo que hayas configurado antes de irte. En este orden:

1. Si tienes la app de myGov, una passkey o una identidad digital como myID, entra con eso. myGov las ofrece como alternativa cuando el código no llega.
2. Si no tienes ninguna, puedes intentar recuperar la cuenta con una identidad digital, pero la ATO indica que para eso hace falta un myID de nivel Strong, con el mismo nombre, fecha de nacimiento y correo que tu cuenta de myGov ([cuando no puedes entrar a myGov](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account), en inglés).
3. Si tampoco es posible, la salida que da myGov es crear una cuenta nueva y volver a vincular tus servicios, incluida la ATO.

## ¿Sirve myID si tengo pasaporte español o argentino?

Para recuperar la cuenta, normalmente no. El nivel Strong de myID pide verificar tu foto con un documento australiano, como un pasaporte australiano, y un residente temporal que está fuera de Australia tampoco puede verificar su visa en myID ([verificar tu identidad en myID](https://www.myid.gov.au/verifying-your-id-in-myid), en inglés).

Por eso, con un pasaporte extranjero y ya de vuelta en tu país, lo realista suele ser la cuenta nueva.

## ¿Y si creo una cuenta nueva?

Tu correo queda ligado a la cuenta anterior. Si quieres usar el mismo, el helpdesk de myGov puede liberarlo: desde el extranjero se llama al +61 1300 169 468, opción 1, de lunes a viernes de 7 a 22 h y sábados y domingos de 10 a 17 h, hora de Australia ([contacto de myGov](https://my.gov.au/en/about/help/contact), en inglés).

Después hay que vincular otra vez la ATO, que te hace preguntas sobre datos que ya tiene de ti, como una cuenta bancaria, tu fondo de super, un notice of assessment o un payslip reciente. Si además la cuenta vieja quedó bloqueada por intentos fallidos, mira [qué hacer con una cuenta de myGov bloqueada](/blog/mygov-account-locked-out).

## ¿Necesito myGov para recibir mi devolución?

No. myGov es la vía para presentar tú mismo en línea, y la ATO acepta también la declaración hecha a través de un agente fiscal registrado o en papel. Lo que sí necesitas es una cuenta bancaria australiana para cobrar.

Cada vía, con lo que implica, está en [tax return sin myGov](/blog/tax-return-without-mygov).

## ¿Cómo evitar que te pase antes de irte?

Si todavía estás en Australia, entra a myGov y añade un authenticator mientras puedes: según myGov, solo se configura con la sesión iniciada. Sirven, por ejemplo, Google Authenticator, Apple Passwords o 1Password ([usar un authenticator](https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-an-authenticator), en inglés).

Anota también tu TFN y deja abierta tu cuenta bancaria australiana. El resto de la lista está en [impuestos al salir de Australia](/blog/tax-obligations-after-leaving-australia).

## ¿Prefieres no pelearte con myGov?

No necesitas myGov para que te ayudemos con tu tax return: nosotros tratamos con la ATO y nunca te pedimos tu contraseña. Te enviamos el tax return terminado, lo lees y lo firmas, y es revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO. [Escríbenos por WhatsApp desde la página del tax return](/tax-return) y cuéntanos dónde y más o menos cuándo trabajaste. Todo el proceso está en la guía de la [devolución de impuestos en Australia](/es/devolucion-impuestos-australia).
`,
  },
  'mygov-account-locked-out': {
    title: 'Cuenta de myGov bloqueada: desbloquearla o crear otra',
    description: '¿Tu cuenta de myGov se bloqueó o no recuerdas la contraseña? Los pasos oficiales para desbloquearla, cuándo conviene otra cuenta y qué pasa con tu tax return.',
    body: `
Una cuenta de myGov se bloquea cuando ingresas mal tus datos demasiadas veces. Para desbloquearla necesitas tu nombre de usuario, tu contraseña actual, un código de seguridad y la respuesta a tu pregunta secreta; mientras siga bloqueada, tampoco funcionan la identidad digital, las passkeys ni la app de myGov. Si no puedes completar esos pasos, myGov indica crear una cuenta nueva, y para tu tax return con nosotros no necesitas ninguna de las dos.

## ¿Cómo se desbloquea una cuenta de myGov?

Con estos pasos de la [ayuda para iniciar sesión de myGov](https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help) (en inglés):

1. En la pantalla de inicio de sesión, escribe tu nombre de usuario de myGov y tu contraseña actual.
2. Elige la opción para desbloquear la cuenta, "Unlock your account now".
3. Ingresa el código de seguridad y responde tu pregunta secreta.
4. Crea una contraseña nueva y confírmala.

Si tu cuenta usa códigos por SMS y ya no tienes el número australiano, el paso 3 se traba. Ese caso tiene su propia guía: [no me llega el código SMS de myGov](/blog/mygov-sms-code-not-received-overseas).

## ¿Olvidaste tu nombre de usuario o tu contraseña?

Para el usuario, elige "Forgot username" y escribe el correo registrado en tu cuenta: myGov te envía tu nombre de usuario, que tiene 2 letras y 6 números. Para la contraseña, elige "Forgot password", ingresa tus datos, elige cómo recibir el código, escríbelo y crea una contraseña nueva.

Las dos opciones dependen de que todavía recibas los correos o los códigos. Si no es así, sigue en la sección sobre la cuenta nueva.

## ¿Y si no recuerdas las preguntas secretas?

myGov ofrece entrar con una identidad digital, una passkey o la app de myGov. Para la ATO, además, las preguntas secretas no sirven: la ATO indica que no se pueden usar para sus servicios en línea y que, si son tu única forma de entrar, la ATO se desvincula de tu cuenta ([crear una cuenta y vincular la ATO](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato), en inglés).

Muchas cuentas creadas durante un primer año en Australia tienen solo preguntas secretas, y por eso fallan justo cuando quieres ver tu tax return.

## ¿Cuándo conviene crear una cuenta nueva?

Cuando la cuenta sigue bloqueada y no puedes completar los pasos. Es lo que indica myGov: crear una cuenta nueva y volver a vincular tus servicios. Recuperarla con una identidad digital solo funciona con un myID de nivel Strong, según la ATO ([cuando no puedes entrar a myGov](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account), en inglés), y con un pasaporte extranjero normalmente no llegas a ese nivel.

Para usar el mismo correo en la cuenta nueva, el helpdesk de myGov tiene que liberarlo: desde el extranjero, +61 1300 169 468, opción 1, de lunes a viernes de 7 a 22 h y sábados y domingos de 10 a 17 h, hora de Australia ([contacto de myGov](https://my.gov.au/en/about/help/contact), en inglés). Después vinculas otra vez la ATO respondiendo preguntas sobre datos que ya tiene de ti, como una cuenta bancaria, tu fondo de super o un payslip reciente.

## ¿Qué no debes hacer?

No le des tu contraseña ni tus códigos de myGov a nadie, aunque diga que te ayuda con tus impuestos. Nosotros nunca te pedimos tu contraseña.

Las demás señales de alerta están en [cómo proteger tu TFN del fraude](/blog/tfn-security-protect-from-fraud).

## ¿Puedo hacer el tax return mientras tanto?

Sí. myGov solo hace falta para presentarlo tú mismo en línea, y la ATO acepta otras vías que no pasan por tu cuenta.

Cuáles son y qué implica cada una está en [tax return sin myGov](/blog/tax-return-without-mygov).

## ¿Prefieres no pelearte con myGov?

No necesitas myGov para que te ayudemos con tu tax return: nosotros tratamos con la ATO y nunca te pedimos tu contraseña. Te enviamos el tax return terminado, lo lees y lo firmas, y es revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO. [Escríbenos por WhatsApp desde la página del tax return](/tax-return) y cuéntanos dónde y más o menos cuándo trabajaste. Todo el proceso está en la guía de la [devolución de impuestos en Australia](/es/devolucion-impuestos-australia).
`,
  },
  'tax-return-without-mygov': {
    title: 'Tax return sin myGov: las vías que siguen funcionando',
    description: '¿Sin acceso a myGov después de tu working holiday? La ATO acepta otras vías: un agente fiscal registrado o el papel por correo. Qué implica cada una.',
    body: `
Solo necesitas myGov para presentar tú mismo tu tax return en línea con myTax. La ATO acepta otras dos vías: presentarlo a través de un agente fiscal registrado o enviar una declaración en papel por correo, también desde fuera de Australia. El papel es mucho más lento: según la ATO, la mayoría de las declaraciones en línea se procesan en 10 días hábiles, y una en papel puede tardar hasta 90 días hábiles.

## ¿Por qué myGov es la vía habitual?

Porque myTax está dentro de los servicios en línea de la ATO, y a esos servicios se entra por myGov con la ATO vinculada. Si estás fuera de Australia, la ATO pide tener configurado un acceso que funcione en el extranjero y recomienda una identidad digital como myID ([presentar desde fuera de Australia](https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia), en inglés).

Cuando ese acceso falla después de volver a casa, casi siempre es por una de dos cosas: el código SMS va a un número australiano que ya no tienes, o la cuenta se bloqueó. Cada una tiene su guía: [no me llega el código SMS de myGov](/blog/mygov-sms-code-not-received-overseas) y [cuenta de myGov bloqueada](/blog/mygov-account-locked-out).

## ¿Qué vías tienes sin myGov?

La página de la ATO sobre [cómo presentar tu tax return](https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return) (en inglés) da tres formas de presentar, y dos no pasan por myGov:

- **myTax en línea.** Necesita myGov vinculado a la ATO. La mayoría de las declaraciones en línea se procesan en 10 días hábiles.
- **Un agente fiscal registrado.** Prepara y presenta la declaración por ti, y la ATO indica que los agentes registrados son los únicos que pueden cobrar por hacerlo. Tú no entras a myGov.
- **Una declaración en papel.** Se envía por correo, y la ATO indica que puede tardar hasta 90 días hábiles ([seguir el estado de tu declaración](https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/how-to-track-the-progress-of-your-tax-return), en inglés).

## ¿Cómo funciona la declaración en papel desde el extranjero?

Pides el paquete con el formulario por el servicio de publicaciones de la ATO, en línea o por teléfono, lo completas y lo mandas por correo. Desde fuera de Australia, con tu propio sobre, la dirección es GPO Box 9845, Sydney NSW 2001, Australia ([presentar en papel](https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-a-paper-tax-return), en inglés).

Necesitas las cifras de ingresos y de impuesto retenido de cada empleador, y el income statement donde están se consulta en los servicios en línea de la ATO. Cómo conseguirlas de un año que ya pasó está en [tax returns de años anteriores](/blog/past-years-tax-returns-working-holiday).

## ¿Cómo funciona la vía del agente fiscal registrado?

El agente trabaja con tu registro de la ATO por su propio canal, así que no tienes que entrar a myGov ni darle tu contraseña a nadie. Es la vía que la ATO menciona, junto a myTax, para quien presenta desde fuera de Australia.

En cualquier vía, la devolución solo se paga en una cuenta bancaria australiana. Si la tuya ya está cerrada, mira [qué pasa con la devolución si cerraste tu cuenta australiana](/blog/tax-refund-closed-australian-bank-account).

## ¿Conviene arreglar myGov en lugar de esto?

Si todavía estás en Australia y conservas tu número, muchas veces sí: añade ahora un authenticator o una passkey, con la sesión iniciada. Si ya volviste a tu país y la cuenta está bloqueada o ligada a una SIM que ya no existe, la recuperación pide un myID de nivel Strong o una cuenta nueva, según la ATO ([cuando no puedes entrar a myGov](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account), en inglés).

Con un pasaporte extranjero el nivel Strong normalmente no está a tu alcance, así que el camino suele ser la cuenta nueva y volver a vincular la ATO, o directamente otra vía.

## ¿Y si tengo años sin presentar?

Cada año es su propia declaración, y las vías son las mismas para los años anteriores. Un año que no presentaste no se cierra solo porque ya te fuiste.

Lo práctico de presentar desde tu país, de los datos de identidad a la cuenta bancaria, está en [cómo presentar la tax return desde el extranjero](/blog/how-to-lodge-tax-return-from-overseas).

## ¿Y mi super?

Tampoco depende de myGov. El DASP se pide en un sistema en línea de la ATO que no usa myGov.

Lo que te pide y cómo se sigue el pago está en [recuperar tu super sin myGov](/blog/claim-super-without-mygov).

## ¿Prefieres no pelearte con myGov?

No necesitas myGov para que te ayudemos con tu tax return: nosotros tratamos con la ATO y nunca te pedimos tu contraseña. Te enviamos el tax return terminado, lo lees y lo firmas, y es revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO. [Escríbenos por WhatsApp desde la página del tax return](/tax-return) y cuéntanos dónde y más o menos cuándo trabajaste. Todo el proceso está en la guía de la [devolución de impuestos en Australia](/es/devolucion-impuestos-australia).
`,
  },
  'claim-super-without-mygov': {
    title: 'Recuperar tu super sin myGov: el DASP no lo necesita',
    description: 'El DASP se pide en el sistema en línea de la ATO con tu pasaporte, sin myGov. Qué datos te piden, qué hacer si la visa figura activa y cómo seguir el pago.',
    body: `
Para recuperar tu superannuation no necesitas myGov. El Departing Australia Superannuation Payment (DASP) se pide en el sistema en línea de la ATO, que es gratis y te pide tus datos personales, tu pasaporte y los datos de tu fondo, o con un formulario en papel. Lo envías cuando ya saliste de Australia y tu visa terminó, y con una visa 462 o 417 se retiene el 65 % del componente gravable.

## ¿Cómo se pide el DASP sin myGov?

La ATO da tres vías en su página del [DASP](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp) (en inglés):

1. El sistema en línea del DASP, gratis.
2. El formulario en papel: NAT 7204 para la super que sigue en un fondo, que se envía al fondo, y NAT 74880 para la super que ya pasó a la ATO, que se envía a la ATO.
3. Autorizar por escrito a un agente fiscal registrado o a otra persona para que haga el reclamo por ti.

myGov no es una de ellas. En esa página, la ATO lo menciona solo como una forma de ver dónde está tu super.

## ¿Qué datos te pide el sistema en línea?

Tus datos personales tal como figuran en tu pasaporte, un correo electrónico, el país y el número del pasaporte y los datos de cada cuenta, incluido el ABN del fondo. El TFN es opcional: si lo das, el sistema busca tus cuentas por ti ([ayuda del sistema en línea del DASP](https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system), en inglés).

También eliges una "shared secret", una pregunta con su respuesta, para volver a entrar a una solicitud guardada. Puedes empezar la solicitud y guardarla antes de tu vuelo, y enviarla cuando ya te fuiste.

## ¿Y si no sé en qué fondos tengo super?

Empieza por tus payslips, que suelen indicar el fondo al que pagaba cada empleador. Si el sistema no muestra un fondo que sabes que tenías, puedes añadir una solicitud nueva con el ABN de ese fondo.

Cómo rastrear cada cuenta sin entrar a myGov está en [cómo encontrar tu super perdida](/blog/how-to-find-lost-superannuation).

## ¿Qué hago si el sistema dice que mi visa sigue activa?

No puedes enviar la solicitud mientras tengas una visa australiana activa, y la ATO sugiere revisar tu visa en VEVO. Si crees que la información de visa que muestra el sistema está mal, no envíes la solicitud en línea: escribe a DASPmail@ato.gov.au.

Las demás causas por las que se rechaza un reclamo están en [qué hacer si rechazan tu DASP](/blog/dasp-rejected-what-to-do).

## ¿Cómo sé si ya me pagaron?

El sistema en línea no muestra si el fondo ya procesó tu solicitud. Para la super que está en un fondo, pregúntale al fondo; para la que tiene la ATO, llama a la ATO. Desde el extranjero es el +61 2 6216 1111, de 8 a 17 h de lunes a viernes, hora del este de Australia, y pides que te transfieran al 13 10 20.

Según la ATO, el DASP en general se paga dentro de los 28 días desde que recibe la solicitud completa. Las etapas una por una están en [cuánto tarda el DASP](/blog/how-long-does-dasp-take).

## ¿Adónde puede ir el dinero?

La ATO da tres formas de pago:

- Una transferencia a una cuenta bancaria australiana, que en general es la vía más eficaz.
- Un cheque en dólares australianos.
- Una transferencia internacional, solo si reclamas a un fondo que la ofrece. No todos lo hacen, y puede haber comisiones y costos de cambio.

La super que ya pasó a la ATO solo se paga en una cuenta australiana a tu nombre o con cheque.

## ¿La super y la devolución de impuestos son lo mismo?

No, son dos trámites. La super la libera tu fondo; la devolución de impuestos sale de tu tax return y solo se paga en una cuenta australiana.

Si además tienes un tax return pendiente y no puedes entrar a myGov, las vías que acepta la ATO están en [tax return sin myGov](/blog/tax-return-without-mygov).

## ¿Prefieres que lo revisemos contigo?

Puedes hacerlo por tu cuenta, y es gratis. Lo que nos traspasarías es la búsqueda en todas las cuentas vinculadas a tu Tax File Number, incluida la super que tiene la ATO, las copias certificadas desde el extranjero, preparar una solicitud aparte para cada fondo y el seguimiento cuando uno deja de responder. Working Holiday Tax opera bajo la supervisión de un agente fiscal registrado. Y si además tienes un tax return pendiente, tampoco necesitas myGov: nosotros tratamos con la ATO, y es revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO. [Escríbenos por WhatsApp desde la página de superannuation](/superannuation) cuándo venció tu visa, cuándo saliste de Australia y en cuántos trabajos estuviste.
`,
  },
  'tax-refund-closed-australian-bank-account': {
    title: 'Devolución de impuestos y cuenta australiana cerrada',
    description: '¿Cerraste tu cuenta bancaria australiana antes de que llegara la devolución? La ATO solo paga en cuentas de Australia. Qué pasa con el dinero y cómo se arregla.',
    body: `
La ATO paga las devoluciones de impuestos solo en una cuenta bancaria australiana, nunca en una del extranjero. Si la cuenta que diste ya está cerrada, la devolución vuelve a la ATO y se emite otra vez cuando le das los datos de una cuenta australiana vigente; sin esos datos, la ATO la reemite con un cheque. El dinero no se pierde, pero queda esperando hasta que se arreglen los datos.

## ¿La ATO puede pagar la devolución en una cuenta de mi país?

No. La ATO dice que solo puede pagar devoluciones en una cuenta bancaria australiana ([actualizar tus datos bancarios](https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details), en inglés). Las instrucciones de myTax agregan que, sin datos bancarios, puede que no puedas presentar en línea con myTax ([datos de la institución financiera](https://www.ato.gov.au/individuals-and-families/your-tax-return/instructions-to-complete-your-tax-return/mytax-instructions/supporting-documents-for-my-tax/financial-institution-details), en inglés).

La super funciona distinto. El DASP de un fondo puede ir a una cuenta del extranjero si ese fondo ofrece transferencia internacional, pero la super que ya pasó a la ATO solo se paga en una cuenta australiana a tu nombre o con cheque.

## ¿Qué pasa si la devolución fue a una cuenta que cerraste?

Según la página de la ATO sobre [devoluciones que no llegaron](https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds) (en inglés), pasa esto:

1. El Reserve Bank of Australia devuelve el pago a la ATO, algo que puede tardar hasta 10 días.
2. Actualizas tus datos bancarios y la ATO vuelve a emitir la devolución a la cuenta nueva.
3. Si no das datos nuevos, la ATO la reemite con un cheque. Desde enero de 2025 retiene algunos cheques hasta 90 días mientras te pide datos bancarios.

Por eso una devolución que parece haber desaparecido casi siempre se emitió, volvió y está esperando.

## ¿Y si presento sin una cuenta australiana?

La ATO puede retener la devolución hasta 90 días desde que corresponde pagarla, y te contacta por carta, correo electrónico o un mensaje en myGov para pedirte una cuenta australiana válida. Si das esos datos con la declaración, esa retención no se aplica ([instrucciones de la declaración 2026](https://www.ato.gov.au/forms-and-instructions/individual-tax-return-2026-instructions/completing-the-individual-tax-return-2026/completing-individual-information-in-your-tax-return-2026), en inglés).

## ¿Y si fue a una cuenta equivocada?

Depende de quién sea la cuenta. Si no tiene nada que ver contigo, avisa a la ATO, que intentará recuperar el dinero; la ATO indica que eso puede tardar más de 28 días. Si es una cuenta que conoces, como otra cuenta tuya que sigue abierta o la de tu pareja, en general la ATO no puede recuperarlo, y queda como un asunto entre tú y el titular de esa cuenta.

## ¿Cómo le das a la ATO los datos nuevos?

En línea, por myGov: en la sección de la ATO, entra a My profile y luego a Financial institution details. La cuenta tiene que estar a tu nombre, sola o conjunta, con un BSB de 6 dígitos y un número de cuenta de hasta 9 dígitos. También puedes llamar a la ATO con tu TFN a mano: desde el extranjero, al +61 2 6216 1111, de 8 a 17 h de lunes a viernes, hora del este de Australia.

Si no puedes entrar a myGov porque el código va a tu número australiano viejo, mira [qué hacer si no te llega el código SMS de myGov](/blog/mygov-sms-code-not-received-overseas).

## ¿Conviene dejar abierta tu cuenta australiana al irte?

Sí, hasta que haya llegado todo lo que te corresponde. La devolución de un año en que trabajaste solo puede llegar a una cuenta en Australia, y el DASP es otro pago que también vas a querer seguir.

Cuánto tarda cada paso está en [cuánto tarda la devolución de impuestos en Australia](/blog/how-long-does-tax-refund-take-australia), y el resto de lo que queda pendiente al irte, en [impuestos al salir de Australia](/blog/tax-obligations-after-leaving-australia).

## ¿Prefieres que nos ocupemos?

No necesitas myGov para que te ayudemos con tu tax return: nosotros tratamos con la ATO, y es revisado y aprobado por un agente fiscal registrado antes de presentarse ante la ATO. Si tu cuenta australiana ya está cerrada, dínoslo en el primer mensaje, porque cambia el orden en que trabajamos. [Escríbenos por WhatsApp desde la página del tax return](/tax-return) con una idea de dónde y cuándo trabajaste. Todo el proceso está en la guía de la [devolución de impuestos en Australia](/es/devolucion-impuestos-australia).
`,
  },
}
