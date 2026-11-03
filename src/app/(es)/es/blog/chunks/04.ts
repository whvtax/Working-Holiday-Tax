export const chunk: Record<string, { title: string; description: string; body: string }> = {
  'what-is-a-tax-agent': {
    title: "¿Qué hace realmente un tax agent?",
    description: "Un tax agent está habilitado para presentar tu declaración, con plazos ampliados y deberes profesionales. Qué hace por un backpacker y qué señales evitar.",
    body: `
Un tax agent es una persona registrada según la ley australiana para preparar y presentar declaraciones de impuestos de otras personas. Quien cobra por trabajo de impuestos debe tener ese registro. Para un working holiday maker, las diferencias prácticas son un plazo de presentación más largo, no tener que tratar directamente con la ATO y contar con alguien que sabe qué deducciones y offsets pesan de verdad en un año con visa 462 o 417.

## ¿Qué hace un tax agent que tú no puedas hacer por tu cuenta?

Tres cosas, y solo una es la presentación en sí. Un agente obtiene tu registro de ingresos directamente de los sistemas de la ATO, en lugar de depender de que te acuerdes de cada empleador. Aplica el plazo especial que viene con su programa de presentación. Y se interpone entre tú y la ATO si después se cuestiona algo.

Presentar la declaración nunca fue lo difícil. Lo difícil es lo que va dentro de la declaración: cómo se valora tu situación de residencia en tu año, si corresponde la exención del Medicare levy y cuáles de tus gastos cumplen las reglas de respaldo documental en lugar de solo parecer relacionados con el trabajo.

## ¿Quién prepara tu declaración y quién la aprueba?

Dos personas distintas, y es a propósito. Tu declaración la prepara nuestro equipo, que trabaja solo con impuestos de visas 462 y 417 y ve las mismas situaciones todos los días. Después, un agente fiscal registrado la revisa y la aprueba antes de presentarse ante la ATO.

Esa separación te da conocimiento especializado y responsabilidad profesional, y se puede comprobar en lugar de quedarse en una promesa: el registro del agente figura en el registro público de profesionales de impuestos del gobierno.

## ¿Cómo compruebas que quien te ofrece ayuda con tus impuestos es legítimo?

Buscando su registro en el registro público de profesionales de impuestos del gobierno, la única fuente confiable, y lleva menos de un minuto. El registro muestra si la inscripción está vigente, si tiene condiciones y si cubre servicios de tax agent y no solo servicios de BAS.

Una segunda prueba detecta casi todo lo que el registro no muestra. Un agente legítimo nunca necesita tu contraseña de myGov, porque accede a tus datos por su propio canal de agentes. Quien te la pide no está actuando como agente, se llame como se llame.

Los working holiday makers son un blanco frecuente de este tipo de engaños, en grupos de Facebook y de mensajería, justamente porque son nuevos en el sistema. Nunca envíes tu TFN, tu pasaporte ni la confirmación de tu visa a alguien que no pueda darte un número de registro.

## ¿Qué cambia en la práctica cuando tienes un agente?

Pasas a su programa de presentación, que tiene un plazo especial bastante posterior al 31 de octubre, la fecha límite si presentas por tu cuenta. La comunicación con la ATO pasa por el agente, incluida cualquier consulta, ajuste o revisión que surja después de presentar.

La diferencia se nota más en la búsqueda de información que en la declaración en sí. Los income statements de un empleador cuyo nombre olvidaste, un TFN que nunca recibiste, un año sin presentar de dos veranos atrás y un reclamo de DASP están en sistemas mucho más fáciles de alcanzar desde un canal de agentes que desde una cola de espera en un call center de otra zona horaria.

## ¿Qué años son casi un trámite?

Los simples, y existen. Un solo empleador durante todo el año, un TFN registrado desde la primera semana, un 15 % retenido correctamente de principio a fin, sin ingresos con ABN, sin deducciones que valga la pena respaldar y un pasaporte sin dudas sobre el Medicare. En un año así, hay poco que alguien pueda encontrar.

Los años en que deja de ser un trámite son los más comunes en este público: varios empleadores, un período sin TFN registrado, un tiempo con ABN, una situación de residencia que nadie revisó bien, un pasaporte que cambia la respuesta sobre el Medicare o un año en el que ya saliste del país. Nuestra comparación entre [presentar tú mismo o usar un agente](/blog/diy-tax-return-vs-tax-agent-working-holiday) muestra dónde se pierde el dinero.

## ¿Se puede deducir la tarifa del agente?

Sí, pero en la declaración del año siguiente. Los honorarios por gestionar tus asuntos fiscales se deducen en el año en que los pagas, así que una tarifa pagada en octubre por el año que acaba de terminar se reclama en la declaración del año en que la pagaste.

Si tu estancia abarca dos años fiscales, la tarifa del primer año normalmente reduce los ingresos gravables del segundo. Si presentas una sola declaración final al salir del país, no hay un año siguiente en el que reclamarla.

## ¿Tu año es de los que necesitan uno?

Que un agente valga la pena depende de tu año en particular. Cuantos más de estos puntos te describan, más se aleja tu declaración de ser un simple trámite.

- Cuántos empleadores tuviste, porque los ingresos de uno olvidado son la omisión más común en una declaración presentada por cuenta propia.
- Si hubo un período antes de que tu TFN llegara al empleador, con retención del 45 % en lugar del 15 %.
- Si el Medicare levy te afecta o si puede haber una exención, algo que depende de tu caso y no se da por supuesto. 
- Si tu situación de residencia se revisó bien, ya que depende de tus circunstancias personales y no de un solo dato.
- Si tienes ingresos con ABN además del sueldo, lo que cambia tanto el cálculo como el papeleo.
- Si ya saliste de Australia, lo que hace casi imposible hacer solo la mayoría de los pasos de recuperación de datos.

El año completo se resuelve en la [tax return de working holiday maker](/tax-return), y puedes [estimar tu devolución de impuestos](/calculator) antes para ver más o menos cómo se ve la tuya.
`,
  },
  'how-does-payg-withholding-work': {
    title: "PAYG withholding: por qué te descuentan impuestos",
    description: "Tu empleador retiene impuestos en cada pago y los envía a la ATO. Cómo se fijan las tasas para working holiday makers y por qué hay devoluciones.",
    body: `
El PAYG withholding es el impuesto que tu empleador descuenta de cada pago y envía a la ATO a tu nombre. Para un working holiday maker con [TFN](/tfn) registrado debería ser del 15 %. Dos cosas deciden si lo es: tu formulario de declaración y si tu empleador está registrado.

## ¿De qué depende la tasa de retención?

Primero, del formulario de declaración. El payroll aplica una tasa según lo que dice la Tax File Number Declaration sobre ti, así que decirle tu número de palabra a un jefe o mostrarle la foto de la carta no cambia nada hasta que el formulario esté completo. Hasta entonces, la ley exige el 45 %.

Segundo, del registro del propio empleador. Si el empleador no está registrado correctamente ante la ATO, puede retener a una tasa más alta por perfectos que estén tus papeles.

- Declaración de TFN completa y empleador registrado: la retención depende de tu caso
- TFN todavía no registrado con ese empleador: la retención más alta
- Empleador no registrado correctamente: puede retener de más
- Formulario completado con datos que no correspondían: se puede retener muy poco y después llegar una deuda

## ¿Cómo lees la tasa en tu propio payslip?

Divide el impuesto retenido entre el pago bruto del mismo período. Esa es toda la comprobación, y detecta una tasa equivocada antes de que se acumulen meses con el error.

Un payslip debe mostrar por separado el pago bruto, el impuesto retenido, el super y el pago neto. El super del 12 % lo paga el empleador además de tu sueldo, no se descuenta de él, así que nunca debería reducir la cifra neta. Si el impuesto retenido da el 45 % y tu formulario de declaración se entregó hace semanas, es un problema de payroll que debes plantear de inmediato y no un problema de impuestos para resolver en octubre.

## ¿Se pierde el impuesto retenido de más?

No necesariamente. Cada dólar retenido es un pago adelantado que se acredita contra lo que realmente debes, así que si te retuvieron el 45 % y correspondía el 15 %, esa diferencia se tiene en cuenta cuando se prepara la [tax return](/tax-return).

Lo que sí se pierde es el uso de ese dinero mientras tanto. Treinta de cada cien dólares en manos de la ATO desde febrero hasta agosto es lo que realmente cuesta, y para quien paga el alquiler del hostel cada semana, ese hueco define cómo es el año. Corrige una tasa equivocada ahora en lugar de verla como una devolución más grande más adelante.

## ¿Qué pasa con las cifras al final del año?

Tu empleador cierra los reportes de payroll después del 30 de junio, y el total de sueldos del año y el total de impuestos retenidos se informan a la ATO bajo tu TFN. Esas cifras se convierten en tu income statement, y la declaración se arma a partir de ellas y no de tus payslips.

Por eso los ingresos quedan en los sistemas de la ATO aunque tus propios registros no los tengan. Un trabajo que dejaste de golpe, un empleador que ya cerró o un payslip que nunca recibiste no hacen desaparecer ese ingreso de tu declaración. Lo que significa es que el total hay que recuperarlo en lugar de recordarlo.

## ¿Qué problemas de PAYG vale la pena perseguir?

Los que cambiaron la tasa durante un período prolongado, no un solo payslip raro. Un mes al 45 % antes de que se procesara un formulario de declaración, una temporada entera de cosecha con una empresa de labour hire no registrada o un segundo trabajo que estuvo todo el año con la tasa equivocada representan dinero real, y todos se revisan al preparar la declaración.

Otros dos casos van en sentido contrario. Completar el formulario de declaración con datos que no corresponden puede significar que se retuvo muy poco, y eso produce una deuda en lugar de una devolución. El trabajo en efectivo no tiene nada retenido, así que el impuesto sobre él vence completo al final del año. Revisar [qué significa la línea de impuesto retenido en tu payslip](/blog/what-does-tax-withheld-mean-payslip) en cada pago es lo que evita que cualquiera de estos problemas dure meses.
`,
  },
  'australian-financial-year-dates': {
    title: "El año fiscal australiano: del 1 de julio al 30 de junio",
    description: "El año fiscal australiano va del 1 de julio al 30 de junio, así que una working holiday que lo cruza implica dos tax returns. Cuándo presentar cada una.",
    body: `
Del 1 de julio al 30 de junio. El año fiscal australiano no es el año calendario, así que una working holiday que cruza el 30 de junio produce dos tax returns separadas en lugar de una. El año actual, 2026-27, va del 1 de julio de 2026 al 30 de junio de 2027.

## ¿Por qué importa más aquí la división de fechas que en tu país?

Porque las working holidays casi nunca coinciden con ella. Un año que empieza en noviembre y termina en septiembre del siguiente queda repartido entre dos años fiscales, cada uno con su propia evaluación, con sus propios ingresos, su propia retención y su propio resultado.

Los ingresos de solo parte del año influyen mucho en el resultado de la declaración de un working holiday maker. La retención se calcula como si tu ritmo de pago continuara todo el año, así que el impuesto retenido y el impuesto final de seis meses de trabajo pueden no coincidir, y el resultado depende de los hechos de tu año.

## ¿En qué año fiscal cae mi trabajo?

En el año en que se ganó el dinero, que lo fija la fecha en que te pagaron y no la fecha en que trabajaste. Tres patrones cubren la mayoría de los casos.

- Llegaste en noviembre y trabajaste hasta mayo: todo en un solo año fiscal, que presentas después del 30 de junio.
- Llegaste en mayo y te fuiste en agosto: dos años fiscales, dos declaraciones, una por mayo y junio y la otra por julio y agosto.
- Llegaste en julio y trabajaste hasta junio del año siguiente: exactamente un año fiscal, el caso más limpio que existe.

Un año fiscal anterior que nunca presentaste todavía se puede presentar. Los años sin presentar son comunes entre quienes hacen la segunda visa, y el resultado de cada uno depende de los hechos de ese año.

## ¿Cuándo puedes presentar la declaración y cuándo te conviene?

La presentación abre el 1 de julio, y presentar ese mismo día suele ser un error. Los empleadores finalizan los income statements durante la primera mitad de julio, y una declaración presentada antes de que la tuya esté finalizada puede omitir por completo a un empleador y luego necesitar una corrección.

La ventana práctica es a finales de julio o principios de agosto. El plazo estándar para presentar tú mismo es el 31 de octubre, y un tax agent lo amplía, algo que importa si algún empleador todavía no ha finalizado.

## ¿Qué pasa si te vas de Australia antes del 30 de junio?

Es posible que puedas presentar una declaración anticipada, sin esperar a estar en tu país. Si te vas de forma definitiva y no vas a tener más ingresos australianos ese año, la declaración se puede presentar antes de que termine el año.

Si conviene o no depende de si todos los empleadores emitieron un income statement final, de si tienes superannuation para reclamar al mismo tiempo y de tu situación individual en el año. Irte en abril con tres empleadores, uno de ellos sin finalizar, es el caso en que presentar antes genera una corrección después.

## ¿Qué otras fechas siguen el mismo calendario?

Hay otros dos grupos de fechas fuera de la declaración en sí que se pasan por alto con frecuencia. Uno decide si tus últimos aportes de super ya existen, y el otro, cuándo puedes reclamarlos.

Hasta el 30 de junio de 2026 el super se pagaba por trimestres (28 de octubre, 28 de enero, 28 de abril y 28 de julio). Desde el 1 de julio de 2026 rige Payday Super y los empleadores en general deben pagar dentro de los siete días hábiles posteriores a cada día de pago, así que el último aporte debería llegar al fondo poco después de tu último sueldo. El calendario trimestral antiguo puede seguir importando para períodos anteriores, y un último aporte atrasado es un motivo frecuente de que un reclamo de super salga corto.

La fecha de fin de tu visa activa su propio reloj. Define cuándo puedes [reclamar tu superannuation al salir de Australia](/superannuation), y un fondo que pierde contacto contigo termina transfiriendo el saldo a la ATO como unclaimed super.

## ¿Cuándo puedes presentar y cuántas veces?

Las fechas son las mismas para todos. Cuántas declaraciones debes y cuándo puedes presentarlas, no.

- Si tu estancia cruza el 30 de junio, lo que significa dos declaraciones, y hay que presentar ambas.
- Si te vas antes del 30 de junio, lo que abre la opción de presentar antes de tiempo.
- Si todos los empleadores finalizaron tu income statement, lo que decide si ya es seguro presentar.
- Si tienes años anteriores sin presentar de una visa previa, que conviene revisar cuanto antes.
- Si ya se pagó tu último aporte de super (con Payday Super, en general dentro de los siete días hábiles posteriores a tu último día de pago).

El año por el que presentas decide qué tasas y umbrales se aplican a tu [tax return de working holiday maker](/tax-return). Puedes [estimar tu devolución de impuestos](/calculator) por separado para cada año en que trabajaste.
`,
  },
  'cash-in-hand-tax-return': {
    title: "¿Trabajaste en efectivo? Puedes presentar tu tax return",
    description: "Los ingresos en efectivo sin payslip se pueden y se deben declarar. Cómo reconstruir lo que ganaste, qué cruza la ATO y por qué declarar te protege.",
    body: `
Sí. El sueldo pagado en efectivo es un ingreso gravable igual que el que se deposita en una cuenta bancaria. La diferencia es que no se retuvo nada en el camino, así que el impuesto se liquida al presentar la declaración, y el ingreso hay que declararlo con tus propios registros y no con los reportes de un empleador.

## ¿Qué cambia cuando te pagan en efectivo?

Solo la mecánica, no la obligación. No se retiene PAYG, no se crea ningún registro de Single Touch Payroll y recibes el monto completo. La responsabilidad tributaria pasa del payroll de tu empleador a ti, y se paga cuando se evalúa el año.

La tasa que corresponda a tu situación se aplica igual, pero llega como un monto a pagar. Quien trabajó solo en efectivo y no apartó nada puede enfrentar una deuda en lugar de una devolución.

## ¿Tu empleador puede pagarte en efectivo?

Sí, y las dos cosas se confunden constantemente. Pagar el sueldo en efectivo es legal. Lo que no es legal es no retener el impuesto, no reportar los sueldos, no pagar el superannuation o no entregar un payslip.

Por eso un acuerdo en efectivo no es, en sí mismo, evidencia de nada. Un trabajo en efectivo bien llevado viene con payslip, PAYG retenido, super pagado y reporte a la ATO. Cuando eso falta, las obligaciones incumplidas son del empleador.

## ¿Qué registros permiten hacer una declaración honesta?

Tus propias notas hechas en el momento, porque no existe nada más. Las fechas trabajadas, las horas de cada turno, la tarifa acordada, el monto recibido cada vez y quién te pagó son toda la base de pruebas.

- Depósitos bancarios, incluso depósitos parciales del efectivo, que establecen un patrón
- Mensajes de texto o notificaciones de apps sobre turnos y pagos
- Rosters, fotos en el lugar de trabajo, nombres de las personas con las que trabajaste
- El nombre comercial y el ABN de quien te pagó

Guárdalo en un lugar que sobreviva a un teléfono perdido. La ATO puede preguntar por una declaración varios años después de presentada, y para entonces un hilo de WhatsApp de un hostel de Cairns suele haber desaparecido.

## ¿Qué pasa si las cifras no son exactas?

Declara tu mejor estimación honesta y sé coherente en cómo llegaste a ella. El ingreso en efectivo se reporta como salario y sueldos, sin un income statement.

Lo que importa es la diferencia entre estimar de buena fe y omitir a propósito. Una cifra imprecisa pero honesta, respaldada por un método que puedas explicar, es muy distinta a dejar ingresos fuera, y es la omisión la que genera el problema. Declarar de menos tiene sus propias consecuencias, que explicamos en nuestra guía sobre [subdeclarar ingresos y las multas de la ATO](/blog/understating-income-ato-penalty-working-holiday).

## ¿Y el superannuation del trabajo en efectivo?

Si eras empleado y no contratista, se te debía un 12 % de super sobre tus ordinary time earnings, te hayan pagado en efectivo o por transferencia. Pagar en efectivo no elimina la obligación, y es aquí donde se perdió la mayor parte del dinero en un trabajo así.

Recuperarlo depende de los mismos registros que la declaración de ingresos. Nuestra guía sobre el [super no pagado y qué hacer](/blog/super-employer-not-paying-what-to-do) explica cómo funciona el proceso del Superannuation Guarantee Charge.

## ¿Declararlo te trae problemas?

Declarar tus ingresos es lo que te protege. Una declaración honesta es un historial limpio, y que el empleador no haya retenido, reportado ni pagado el super queda de su lado.

El riesgo está en lo contrario. Un año sin presentar, o presentado con ingresos omitidos, se vuelve difícil más adelante, sobre todo para quien piensa pedir otra visa australiana. Denunciar al empleador ante el Fair Work Ombudsman es una decisión aparte, y nuestra guía sobre el [robo de sueldo en Australia](/blog/wage-theft-working-holiday-australia) explica qué implica.

## ¿Devolución o deuda? Lo deciden tus otros ingresos.

Que el ingreso en efectivo deba declararse no está en discusión. Lo que te cuesta depende del resto del panorama.

- Si además tuviste un empleo normal en el mismo año, porque la retención de ese trabajo muchas veces cubre el impuesto del efectivo.
- Si fuiste realmente empleado o contratista con un ABN, lo que decide los derechos de super y de award.
- Cuánto del efectivo puedes respaldar con pruebas.
- Si el empleador reportó algo, lo que cambia cómo se arma la declaración.
- Si hay deducciones disponibles contra ese trabajo.
- Si se pagó el 12 % de super, que suele ser la suma mayor y se puede recuperar por separado.

La posición combinada se resuelve en la [tax return de working holiday maker](/tax-return), y puedes [estimar tu devolución de impuestos](/calculator) para ver si el año termina en devolución o en un monto a pagar.
`,
  },
  'how-much-super-should-employer-pay': {
    title: "¿Cuánto super debería haberte pagado tu empleador?",
    description: "El 12 % de tus ordinary time earnings, pagado junto con tu sueldo. Cómo comprobar que llegó y qué hacer si no.",
    body: `
El doce por ciento de tus ordinary time earnings, pagado a un fondo de super, además de tu sueldo y no descontado de él. Desde el 1 de julio de 2026, con Payday Super, en general dentro de los siete días hábiles posteriores a cada día de pago; antes se pagaba por trimestres. Esa es la tasa desde el 1 de julio de 2025, el último escalón fijado por ley, así que se mantiene en el 12 %. Sobre 8000 AUD ganados, deberían aparecer 960 AUD.

## ¿Qué cuenta como ordinary time earnings?

Una base más estrecha que el pago bruto, y en esa diferencia vive el pago insuficiente que nadie nota. Incluye tu sueldo regular por las horas ordinarias, la mayoría de los allowances, comisiones, bonos, recargos y, en la mayoría de los casos, el recargo de las vacaciones anuales.

No incluye las horas extra, los gastos reembolsados ni los pagos por despido por eliminación del puesto (genuine redundancy). Para un working holiday maker con turnos normales esto rara vez importa. Sí importa en hospitality y en las granjas, donde los recargos por penalty rates, los loadings y las horas extra se mezclan y el payroll calcula el super solo sobre las horas base.

## ¿Cuándo debería aparecer el dinero?

Para el pago desde el 1 de julio de 2026, en general dentro de los siete días hábiles posteriores al día de pago con Payday Super, más unos días para que el fondo lo procese. Para períodos anteriores regían las fechas trimestrales antiguas (28 de octubre, 28 de enero, 28 de abril y 28 de julio), que causaban la mayoría de las falsas alarmas.

Ese desfase salía caro para quien se va: con el sistema trimestral, el último aporte no vencía hasta el cierre del trimestre y un reclamo temprano no lo incluía. Payday Super (desde el 1 de julio de 2026) lo acorta, pero un reclamo presentado demasiado pronto aún puede quedarse sin el último pago. Es uno de los motivos más comunes de que un pago de salida salga corto.

## ¿Cómo compruebas que se pagó?

Con dos registros que se comparan. Tu payslip debe mostrar el super devengado en una línea aparte, y la cuenta de tu fondo debe mostrar que llegó el aporte. Si divides la cifra de super entre tus ordinary time earnings, el resultado debería ser 0,12.

Si da 0,115 o 0,11, el empleador está usando una tasa anterior. Los sistemas de payroll tardaron en actualizarse durante los aumentos escalonados y algunos empleadores fijan las tasas a mano, así que es una diferencia real y recuperable, no un problema de redondeo. El historial de tasas importa si tu trabajo abarca los cambios: 11 % en 2023-24, 11,5 % en 2024-25 y 12 % desde 2025-26 en adelante, y cada una se aplica al período en que se devengaron los ingresos.

## ¿A qué fondo fue tu super y por qué importa?

Lo más probable es que al fondo en que te inscribió tu primer empleador australiano, por la regla de stapling introducida en noviembre de 2021. Con el stapling, un empleador nuevo debe comprobar si ya tienes un fondo y pagar en ese, en lugar de inscribirte en el suyo por defecto.

Para un australiano que empezó a trabajar de adolescente, esto funciona como se pensó. Para un working holiday maker funciona a medias.

- Al llegar no tienes ningún fondo australiano, así que el fondo predeterminado de tu primer empleador pasa a ser el tuyo por accidente.
- Los backpackers cambian de empleador rápido, y el registro del stapling no siempre se actualiza entre un trabajo de marzo y uno de abril, así que el segundo y el tercer empleador pueden inscribirte igual en sus propios fondos.
- Los saldos pequeños transferidos a la ATO como unclaimed rompen la cadena por completo.

Por eso un working holiday maker típico termina con dos o tres cuentas, cada una con su propia comisión de administración y muchas veces con su propia prima de seguro, sobre un saldo de pocos miles de dólares. Para evitarlo, indica el mismo fondo en el formulario estándar de elección en cada trabajo. Los saldos ya divididos no se unifican de forma retroactiva, y [consolidar el super de varios fondos](/blog/super-multiple-funds-consolidation) es un trámite aparte que vale la pena hacer antes de irte.

## ¿Qué pasa si el super no aparece del todo?

Empieza por el payroll, por escrito, porque un error administrativo real es más común que el impago deliberado y se arregla en una semana. Indica los períodos de pago, los ordinary time earnings y los datos del fondo, y pregunta qué se envió y cuándo.

Si eso falla, el super no pagado se puede recuperar mediante el proceso del superannuation guarantee charge, un mecanismo formal de cumplimiento y no un simple reclamo, y se puede seguir aunque ya hayas salido del país. Hacen falta pruebas: payslips que muestren la línea de super, extractos del fondo que muestren lo que llegó, fechas y horas de trabajo, tarifas de pago y sueldo bruto, y el nombre y el ABN del empleador. Mira [qué hacer cuando un empleador no paga el super](/blog/super-employer-not-paying-what-to-do).

El trabajo pagado en efectivo es donde esto falla con más frecuencia, porque no hay un rastro de payslips y muchas veces tampoco hay fondo. La obligación es idéntica sin importar cómo se pagó el sueldo.

## ¿Fue la base o fue el momento?

El doce por ciento es la tasa para todos, así que una diferencia suele estar en la base sobre la que se calculó o en el momento del pago.

- Si tus ingresos incluyen horas extra, que correctamente no generan super.
- Qué período estás revisando, ya que antes del 1 de julio de 2026 los aportes podían vencer hasta cuatro meses después del trabajo.
- Cuándo te vas, porque el último aporte puede seguir sin pagar en la fecha de tu salida.
- Cuántos empleadores tuviste, que es cuántos fondos probablemente tienes.
- Si algún empleador te pagó en efectivo sin payslip.
- En qué año fiscal cae el trabajo, ya que la tasa subió pasando por 11 %, 11,5 % y 12 %.

Todo lo que se aportó se puede reclamar cuando [reclamas tu superannuation al salir de Australia](/superannuation), donde los saldos de working holiday maker se retienen al 65 % antes del pago.
`,
  },
  'how-long-does-dasp-take': {
    title: "¿Cuánto tarda el DASP? Unos 28 días",
    description: "La mayoría de las solicitudes completas de DASP se aprueban en unos 28 días, y la acreditación bancaria suma días más. Qué decide el plazo en tu caso.",
    body: `
Unos 28 días para una solicitud completa. Es lo que se espera una vez que el fondo tiene todo lo que necesita, y la acreditación en un banco del exterior suma días más. Las solicitudes que tardan más casi siempre tienen una causa concreta y identificable, no un problema de cola de espera.

## ¿Qué tiene que pasar antes de que se mueva el dinero?

Tres partes comprueban tres cosas, y la solicitud espera a la más lenta. La ATO confirma que tu visa terminó y que saliste del país. Tu fondo confirma que quien solicita es el titular de la cuenta. Después el fondo calcula el pago, aplica la retención del 65 % sobre el super de un working holiday maker y libera el monto neto.

Los 28 días son el lado del fondo, donde está casi todo el retraso. Los registros de la ATO muestran lo que hace falta o no lo muestran, y eso suele resolverse en días y no en semanas. La coincidencia de identidad es la parte lenta, porque los fondos envían dinero de forma definitiva al exterior a alguien a quien no pueden ver.

## ¿Qué hace que un DASP tarde más?

Todos los reclamos demorados que revisamos caen en unas pocas categorías, y ninguna es que el fondo esté simplemente ocupado. Identificar cuál aplica es la mayor parte del trabajo.

**Tu visa o tu salida todavía no están registradas.** Presentar la solicitud a los pocos días de que tu visa terminó, o de que te fuiste, significa que el registro del Department of Home Affairs aún no se actualizó. Los registros de movimientos normalmente se actualizan entre 7 y 14 días después de la salida. No hay forma de acelerarlo ni sentido en presentar antes.

**Tu nombre no coincide.** Es el más común por mucho, y casi nunca es culpa tuya. Los empleadores abren las cuentas de super escribiendo a toda prisa el nombre del pasaporte, y un segundo nombre que falta, un nombre y un apellido invertidos o un acento omitido bastan para frenar la coincidencia.

**Tu fecha de nacimiento se ingresó mal**, por el mismo empleador y con la misma prisa.

**Solicitaste a un fondo que no tiene nada.** Los working holiday makers con cuatro empleadores suelen tener super en fondos de los que nunca oyeron hablar, y solicitar al que recuerdan no devuelve nada porque el dinero está en otro lado.

**No se aceptaron tus documentos certificados.** Los fondos difieren en quién cuenta como certificador aprobado, y la certificación obtenida en tu país después de irte es donde esto falla con más frecuencia.

## ¿Tener varios fondos de super cambia el plazo?

Sí. Cada fondo es una solicitud aparte, con su propio plazo, y terminan a distinto ritmo. Quien tuvo cuatro empleadores en un año de hospitality y cosecha suele tener tres o cuatro cuentas, así que la respuesta práctica es de cuatro a seis semanas desde la primera solicitud hasta el último pago.

El super que ya se transfirió a la ATO como unclaimed sigue otro camino, por lo general más rápido, porque no hay paso de verificación con un fondo. Eso aplica a las cuentas con las que el fondo perdió contacto, algo común en quien se fue hace más de seis meses sin actualizar su dirección.

## ¿Cuánto tarda en llegar el dinero después de la aprobación?

Aprobación y llegada son dos fechas distintas. A una cuenta bancaria australiana suele llegar en un par de días hábiles. A un banco grande del Reino Unido, Europa o Japón suele tardar de dos a cinco días hábiles después de la liberación. Los bancos más pequeños y regionales pueden tardar hasta diez.

La conversión de moneda agrega su propio paso. Si quieres el dinero en una moneda determinada, decídelo antes de presentar la solicitud y no después, porque los datos de la cuenta que lo recibe forman parte del reclamo.

## ¿Por qué tu caso podría superar los 28 días?

Veintiocho días es lo esperado para una solicitud completa, y la mayoría de los reclamos que tardan más están incompletos de una forma que el solicitante no conocía.

- Si tu visa realmente terminó y tu salida está registrada. Presentar demasiado pronto es el retraso autoinfligido más común.
- Si tu nombre en los registros del fondo coincide exactamente con tu pasaporte, incluidos los segundos nombres y los acentos.
- Cuántos empleadores tuviste, que es cuántos fondos probablemente tienes.
- Si parte de tu super ya se transfirió a la ATO como unclaimed, lo que cambia la ruta y por lo general la acorta.
- A qué banco te van a pagar y en qué moneda.
- Si tu tax return del último año también está pendiente, ya que lo más conveniente suele ser resolver las dos cosas juntas.

La posición completa sobre elegibilidad y retención está donde [reclamas tu superannuation al salir de Australia](/superannuation), y la [tax return de working holiday maker](/tax-return) de tu último año es un reclamo aparte sobre un dinero aparte.
`,
  },
  'tax-on-super-withdrawal-backpacker': {
    title: "Impuesto al super al salir de Australia: 65 %",
    description: "El impuesto al superannuation al salir de Australia: la tasa DASP del 65 %. Cuánto recibes, con ejemplos: un saldo de 10 000 AUD paga 3500 AUD.",
    body: `
Un Departing Australia Superannuation Payment para un titular de visa 462 o 417 tributa al 65 % del componente gravable, y se retiene antes de que el dinero llegue a ti. La tasa la fija la ley. Lo que sí vale la pena decidir es cuándo reclamas y si antes encontraste todos tus fondos.

## ¿A qué se aplica exactamente el 65 %?

Al componente gravable del saldo, que para un working holiday maker es en la práctica todo. El super se divide en un componente gravable, que son los aportes del empleador y lo que generan, y un componente libre de impuestos, formado por aportes personales hechos con dinero que ya tributó.

Casi ningún backpacker tiene un componente libre de impuestos, porque casi nadie hace aportes voluntarios durante un working holiday. Cuando existe, se paga sin retención. En la práctica todo el saldo tributa al 65 % y te queda el 35 % de lo que tiene el fondo. Sobre un saldo de 10 000 AUD eso es un pago de unos 3500 AUD.

## ¿Por qué la tasa es más alta para los working holiday makers?

Se subió específicamente para este tipo de visa en 2017. La tasa DASP para residentes temporales en general era del 35 %, y desde el 1 de julio de 2017 se introdujo una tasa separada del 65 % para los titulares de visas subclase 462 y 417, dentro del mismo paquete de cambios que fijó el impuesto sobre la renta del 15 % sobre los sueldos de los working holiday makers.

La lógica declarada del gobierno era que la tasa más alta del super compensa el tratamiento fiscal distinto de los sueldos de los working holiday makers. Se aplica a la visa y no a la persona, así que depende de la visa que tenías cuando se hicieron los aportes.

- Subclase 462 y 417: 65 % sobre el componente gravable
- Otras visas temporales, como una visa de estudiante: en general 35 %
- Un historial de visas mixto: el fondo evalúa los componentes por separado

## ¿Se puede reducir el 65 % o reclamarlo de vuelta?

No. Es una retención final y no un pago adelantado, así que no aparece en tu [tax return](/tax-return) australiana y no hay nada contra qué compensarlo. Los tratados tributarios tampoco lo alcanzan, y ninguna situación de residencia lo cambia.

Hay tres cosas que se confunden con una reducción. Si parte de tu super se generó con otra visa temporal, esa parte puede evaluarse al 35 %, algo que el fondo calcula a partir de tu historial de visas y no de nada que reclames tú. El DASP no se incluye en tu ingreso gravable australiano, así que aquí no se grava dos veces. Y si tu país grava el pago o no es una cuestión de la ley local, y muchos lo tratan como una pensión extranjera. Pregunta en la oficina de impuestos de tu país en lugar de suponerlo.

## ¿Vale la pena reclamar un saldo pequeño?

Sí, porque la alternativa no es quedarte con el dinero. Seis meses después de que termina la visa, el super que deja atrás alguien que salió de Australia se transfiere a la ATO como unclaimed super, donde deja de rendir, deja de erosionarse con las comisiones del fondo y queda en un lugar donde nadie lo va a buscar.

El DASP paga el 35 % de lo que tenga el fondo, así que un saldo de 1500 AUD devuelve unos 525 AUD y uno de 4000 AUD, unos 1400 AUD. Cada uno de esos montos es dinero que un empleador pagó además de tu sueldo, y ninguno vuelve a casa por sí solo.

## ¿Cuándo conviene presentar el reclamo?

Después de que tu visa haya terminado o se haya cancelado y después de que hayas salido de Australia, que son condiciones de elegibilidad y no preferencias. La aprobación suele tardar unos 28 días desde la presentación, y el pago llega después.

La cuestión de momento que realmente importa es el último aporte. Con Payday Super (desde el 1 de julio de 2026) los aportes finales en general vencen dentro de los siete días hábiles posteriores a tu último día de pago, mientras que con el sistema trimestral antiguo no vencían hasta el cierre del trimestre. Reclamar antes de que llegue el último aporte es reclamar sobre un saldo al que tu empleador no terminó de aportar, y lo que quede hay que perseguirlo por separado. Por otro lado, cada mes que el saldo queda en el fondo es un mes más de comisiones de administración sobre dinero al que ya no estás sumando. La respuesta depende de cuánto vale el aporte pendiente frente a las comisiones.
`,
  },
  'what-happens-to-unclaimed-super': {
    title: "¿Qué pasa con el super no reclamado?",
    description: "Si un fondo pierde contacto contigo, transfiere tu saldo a la ATO. Sigue siendo tuyo, no vence y se reclama por el proceso DASP. Cómo encontrarlo.",
    body: `
Nada malo. Después de un período de inactividad, un fondo transfiere tu saldo a la ATO, donde queda registrado bajo tu TFN como unclaimed super. Sigue siendo tuyo, se puede reclamar por el proceso normal del Departing Australia Superannuation Payment, y no hay un plazo después del cual deje de poder reclamarse.

## ¿Qué provoca la transferencia?

Sobre todo, perder el contacto. Un fondo debe transferir un saldo a la ATO cuando no puede localizarte, cuando la correspondencia es devuelta y las comunicaciones quedan sin respuesta, cuando la cuenta estuvo inactiva por un período o cuando se intentó una solicitud de DASP y no se pudo pagar.

Es una secuencia muy corriente. El fondo tiene la dirección de un hostel, los extractos rebotan, los aportes se detienen cuando termina el trabajo y el saldo se mueve. El dinero no desaparece, pero ahora está en un lugar donde no se te ocurriría buscarlo.

## ¿Puedes reclamarlo una vez que se movió?

Sí, por el mismo mecanismo de DASP, con el reclamo dirigido a la ATO y no a un fondo. Los mismos documentos, la misma elegibilidad y la misma retención del 65 % sobre el componente gravable para los working holiday makers.

A menudo es algo más simple, porque no hay un paso intermedio de verificación con el fondo. Tampoco hay un límite de tiempo: se reclaman con éxito saldos de visas que terminaron hace muchos años, y el paso del tiempo no reduce lo que te corresponde.

## ¿Cómo averiguas si el tuyo se movió?

Buscando con tu TFN, lo que abarca tanto los fondos como los saldos en poder de la ATO en un solo paso. Nadie te avisa cuando ocurre una transferencia, y puede que el fondo que recuerdas ya no tenga nada.

Si llevas más de seis meses fuera de Australia, da por hecho que al menos una parte de tu super pudo haberse movido, y busca en lugar de escribirle al fondo anterior. Nuestra guía sobre cómo [encontrar super perdido](/blog/how-to-find-lost-superannuation) explica qué necesita la búsqueda.

## ¿Crece mientras lo tiene la ATO?

Muy poco. La ATO aplica un ajuste de interés pensado para acompañar la inflación, que es bastante menos de lo que habría rendido un saldo invertido en un fondo durante el mismo período.

Tampoco se erosiona. A un saldo pequeño en un fondo se le cobran comisiones de administración y muchas veces primas de seguro, y unos cientos de dólares pueden consumirse en pocos años. El dinero en poder de la ATO no paga comisiones, así que para un saldo pequeño la transferencia no es necesariamente el peor resultado.

## ¿Por qué reclamarlo en vez de dejarlo?

Porque los obstáculos prácticos solo crecen. Verificar tu identidad es más difícil cuanto más tiempo llevas fuera del país, los datos de contacto quedan desactualizados y un número australiano de una SIM vencida deja de recibir los códigos de verificación.

La cifra con la que la gente tiene problemas es la retención del 65 %. Después de ella recibes el 35 % del saldo. Es una tasa mala y la única disponible; la alternativa es dejar todo el monto atrás. Para quien trabajó varios meses con un 12 % de super sobre su sueldo, el 35 % del saldo sigue siendo una suma real.

## ¿Y si una parte nunca se asoció contigo?

Es un problema distinto, y más común que la transferencia. Los aportes hechos antes de que tu TFN llegara al fondo muchas veces no se pueden asociar a una persona, y quedan sin asignar en lugar de figurar a tu nombre.

Esos no aparecen en una búsqueda por TFN, y por eso importa la lista de empleadores. Si tus payslips muestran super de un trabajo que no se refleja en ningún fondo ni en ningún saldo de la ATO, el dinero nunca se pagó o nunca se asoció, y los dos casos se resuelven de forma distinta. Nuestra guía sobre [un empleador que no paga el super](/blog/super-employer-not-paying-what-to-do) cubre el primero.

## ¿Cuántos saldos existen a tu nombre?

Que tu super esté en un fondo o en la ATO no cambia lo que recibes. Los puntos siguientes deciden cuántos saldos existen y qué tan simple será el reclamo.

- Cuántos empleadores tuviste, ya que cada uno puede haber abierto su propia cuenta.
- Hace cuánto te fuiste, lo que decide cuánto es probable que se haya transferido.
- Si tu TFN llegó a cada fondo, lo que decide si los aportes se asociaron o no.
- Si tu visa terminó y ya saliste del país, que es lo que habilita el reclamo.
- Si tus datos de identidad siguen siendo coherentes y tus datos de contacto siguen activos.
- Si algún empleador simplemente nunca pagó, lo que es una recuperación y no una búsqueda.

El super y una declaración sin presentar suelen estar pendientes a la vez, y el año se resuelve en la [tax return de working holiday maker](/tax-return).
`,
  },
}
