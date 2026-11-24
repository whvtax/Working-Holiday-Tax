// 24 Nov 2026 (plan 3, round 2): Payday Super. Cada dato viene de una página oficial (ato.gov.au,
// fairwork.gov.au), releída el 24 de noviembre de 2026; fuentes y URL en S/plan3/build2-R5.md.
export const chunk: Record<string, { title: string; description: string; body: string }> = {
  'payday-super-working-holiday': {
    title: "Payday Super en tu working holiday: revisa tu super",
    description: "Desde el 1 de julio de 2026 la super debe llegar a tu fondo en 7 días hábiles tras cada pago. Cómo comprobarlo y qué hacer antes de irte si falta algo.",
    body: `
Desde el 1 de julio de 2026 tu empleador tiene que pagar tu super con cada día de pago, y la regla de la ATO es que tu super fund la reciba dentro de los 7 días hábiles siguientes a cuando te pagan. La tasa sigue siendo el 12 %, pero ahora se calcula sobre lo que la ATO llama tus qualifying earnings. En una working holiday eso significa que un aporte que falta se nota en días y no en meses, mientras sigues en el trabajo y todavía en Australia.

## ¿Qué cambió el 1 de julio de 2026?

Tres cosas, todas del lado del empleador:

- **Los tiempos.** Antes la super se pagaba cada trimestre. En los sueldos pagados desde el 1 de julio de 2026, cada aporte tiene que llegar a tu fondo dentro de los 7 días hábiles siguientes al pago.
- **La base.** La super guarantee es el 12 % de tus qualifying earnings. El término junta tus ordinary time earnings (el sueldo de las horas normales), las comisiones, el salary sacrifice y otros montos que ya contaban como sueldo para la super.
- **La sanción.** El empleador que no cumple el plazo debe la super guarantee charge, que ahora calcula directamente la ATO, con intereses que se capitalizan cada día y un recargo administrativo.

Las reglas están en la página de la ATO [About Payday Super](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/about-payday-super) (en inglés, actualizada el 10 de agosto de 2026). Los sueldos cobrados hasta el 30 de junio de 2026 siguen con las reglas trimestrales anteriores: un aporte por trabajo de mayo o junio de 2026 podía llegar más tarde y estar igual en plazo.

## ¿Hay excepciones a los 7 días hábiles?

Sí, y dos pesan mucho en una working holiday, donde se cambia seguido de empleador. El primer aporte de alguien recién contratado tiene 20 días hábiles desde el día de pago en lugar de 7, y lo mismo vale para el primer aporte después de una recontratación.

Un pago fuera del ciclo normal, como un bono o un pago atrasado, sigue otra regla: su super vence 7 días hábiles después del siguiente pago regular. Cuando el dinero llega, el fondo tiene 3 días hábiles para acreditarlo en tu cuenta o devolverlo. La ATO detalla todos los casos en [los plazos de pago de Payday Super](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/payday-super/paying-super-on-payday/payment-deadlines-for-payday-super) (en inglés, actualizada el 29 de septiembre de 2026).

## ¿Cómo compruebas que tu empleador pagó?

Comparando tu recibo de sueldo con lo que recibió tu fondo:

1. Mira tu payslip. Según el Fair Work Ombudsman, tiene que mostrar los aportes de super del período y el fondo que los recibe, y te la tienen que dar dentro de 1 día hábil desde el pago.
2. Pasados los 7 días hábiles, entra en la web o la app de tu fondo y busca el aporte. La payslip sola no alcanza: solo el fondo muestra que el dinero llegó.
3. Si tuviste varios trabajos, revisa cada fondo. Los servicios en línea de la ATO también muestran los aportes que tu empleador pagó e informó.
4. Guarda tus payslips y una captura de cada aporte hasta que te hayan pagado la super.

Cómo entrar a tu fondo paso a paso está en [revisar tu saldo de super](/blog/how-to-check-super-balance-working-holiday), y la cuenta para cada sueldo en [cuánta super te tiene que pagar tu empleador](/blog/how-much-super-should-employer-pay).

## ¿Y si falta un aporte?

Primero deja pasar el plazo normal, y después sigue este orden:

1. Pregúntale a tu empleador, por escrito, cuándo pagó, a qué fondo y cuánto. Son las tres preguntas que recomienda la ATO, también para un empleador anterior.
2. Pregúntale a tu fondo si entró un pago que no pudo asociar a tu cuenta. Un aporte tiene que llegar con los datos para acreditarlo; si no, lo pueden devolver.
3. Si sigue faltando, repórtalo a la ATO con su herramienta en línea para super impaga. La ATO te avisa por carta o email si pudo cobrarla y después paga la super y los intereses en tu cuenta. Puede llevar tiempo, y no todos los reportes terminan en un cobro ([super impaga de tu empleador](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/unpaid-super-from-your-employer), en inglés, actualizada el 4 de junio de 2026).

Qué juntar, y cómo funciona cuando ya te fuiste, está en [mi empleador no paga la super](/blog/super-employer-not-paying-what-to-do).

## ¿Por qué importa más cuando te vas?

Porque la ATO te pide confirmar con tu empleador que pagó toda la super que debía antes de enviar tu solicitud de DASP. Puedes empezar y guardar la solicitud en línea antes del vuelo, pero solo la puedes enviar después de salir de Australia y con la visa terminada.

Aprovecha ese intervalo. Para el último sueldo cuenta 7 días hábiles, o 20 si era tu primer pago con ese empleador, y revisa en el fondo que el aporte esté antes de enviar. El orden completo, tax return incluido, está en nuestra página [salir de Australia con la working holiday](/leaving-australia).

## ¿Payday Super cambia tus impuestos o el 65 %?

No. La super se paga además de tu sueldo, no sale de él: Payday Super cambia cuándo se mueve el dinero, no tu sueldo neto ni el impuesto que te retienen. Cuando la reclamas, la super de quien tuvo una visa 417 o 462 sigue con una retención del 65 % sobre el componente gravable, y el impuesto retenido de más en tu sueldo solo vuelve con un tax return.

## ¿Prefieres que lo revisemos contigo?

La solicitud del DASP no necesita myGov, y tampoco necesitas myGov para que te ayudemos. Escríbenos por WhatsApp dónde trabajaste y más o menos cuándo: encontramos cada fondo vinculado a tu TFN y revisamos la solicitud contigo, paso a paso. Nosotros tratamos con la ATO, y Working Holiday Tax opera bajo la supervisión de un agente fiscal registrado. Todo el proceso está en nuestra página de [superannuation](/superannuation).
`,
  },
}
