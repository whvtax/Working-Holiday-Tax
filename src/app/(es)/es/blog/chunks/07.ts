export const chunk: Record<string, { title: string; description: string; body: string }> = {
  'what-does-tax-withheld-mean-payslip': {
    title: 'Tax withheld en tu payslip: ¿el 15 % es correcto?',
    description: "Con una visa working holiday debería rondar el 15 % del pago bruto. Divide el tax withheld por el bruto: si te da 0,30 o 0,45, algo falló.",
    body: `
El tax withheld es el impuesto sobre la renta que tu empleador envía a la ATO a partir de tu pago bruto, antes de que el resto llegue a tu cuenta. Con una visa working holiday debería ser cerca del 15 % de los ingresos brutos hasta 45 000 AUD. Si divides el tax withheld por la cifra bruta de tu payslip, el resultado debería ser aproximadamente 0,15.

## ¿Cuáles son los tres números de un payslip y cómo se relacionan?

Todo payslip australiano en regla muestra el pago bruto (gross pay), el tax withheld y el pago neto (net pay): el primero menos el segundo da el tercero. El bruto es lo que ganaste, el tax withheld es lo que tu empleador envió a la ATO y el neto es lo que llega a tu cuenta.

El tax withheld es un adelanto, no una factura final. Es una estimación que se cobra pago a pago frente a una obligación que se calcula una sola vez, al terminar el año fiscal, sobre el total de tus ingresos. Si se retiene de más, hay devolución. Si se retiene de menos, hay una deuda.

## ¿Cómo compruebas que la tasa es correcta?

Divide el tax withheld por el pago bruto en cualquier payslip. Un working holiday maker con la Tax File Number Declaration bien completada y un empleador correctamente registrado debería quedar cerca de 0,15.

- Bruto de 600 AUD por semana: unos 90 AUD retenidos
- Bruto de 900 AUD por semana: unos 135 AUD retenidos
- Bruto de 1200 AUD por semana: unos 180 AUD retenidos
- Bruto de 2000 AUD por semana: unos 300 AUD retenidos

Hazlo con más de un payslip y con cada empleador por separado. Lo habitual no es que todos los payslips estén mal, sino que un empleador lo haga bien y otro lleve meses haciéndolo mal sin que nadie lo note.

## ¿Qué significa cada porcentaje incorrecto?

El porcentaje te dice qué regla falló, y cada uno tiene una causa y una solución distintas.

**Alrededor del 45 %.** Tu Tax File Number Declaration no llegó al payroll, o venció el plazo de 28 días sin que entregaras tu TFN. Es el caso más caro y el más común. Se resuelve en cuanto la declaración queda registrada, a partir del siguiente pago.

**Alrededor del 30 % o algo más.** Tu empleador no está registrado en la ATO como empleador de working holiday makers, así que aplica las tasas de no residente. No es un error tuyo y no hay nada que corregir en tu Tax File Number Declaration. El exceso se puede recuperar al hacer la tax return.

**Claramente por debajo del 15 %, o casi nada en un sueldo normal.** Puede deberse a una respuesta sobre el tax-free threshold (el umbral exento de impuestos) en tu Tax File Number Declaration que no se ajusta a tu situación. Es el único caso de esta lista que puede generar una deuda en lugar de una devolución, porque durante el año se retuvo muy poco y la diferencia se paga al momento de la liquidación (assessment).

**Nada de nada, y tampoco una línea de super.** Te están pagando fuera del payroll, le hayan puesto el nombre que le hayan puesto. No hay retención que reclamar ni income statement desde el cual presentar, y aun así esos ingresos se deben declarar.

## ¿A dónde va el dinero una vez retenido?

Tu empleador lo conserva por un tiempo breve y lo entrega a la ATO según su propio ciclo de reportes. Al cierre del año finaliza los totales, que quedan como tu income statement. Tu tax return se arma con ese documento, no con tus payslips.

Si un empleador nunca finaliza sus reportes, o los finaliza con cifras que no coinciden con lo que te pagaron, tus payslips son la única prueba de la diferencia. Ese es todo el argumento para guardarlos.

## ¿Por qué guardar los payslips si la ATO ya tiene los datos?

Porque la ATO tiene lo que el empleador reportó, que no siempre es lo que te pagaron. Los payslips son la forma de resolver una discrepancia y el único registro que muestra el super por separado del impuesto, que es la línea con más probabilidades de faltar por completo.

Los errores de payroll en los sueldos de backpackers no son raros y casi nunca son maliciosos. Se concentran en operaciones pequeñas de un solo local, en granjas y packing sheds que usan sistemas de papel informales durante la cosecha, y en locales donde una sola persona se encarga del payroll además de todo lo demás. Guardar los payslips que llegan por correo en una misma carpeta te permite aclarar la duda más adelante.

## ¿Por qué tu payslip muestra algo distinto?

El 15 % de referencia vale para todos los working holiday makers, así que un payslip que dice otra cosa te está hablando de tu situación particular. Estas circunstancias producen un porcentaje distinto, y no todas van en el mismo sentido.

- Cuántos empleadores tuviste. Cada uno implica una Tax File Number Declaration distinta, una tasa distinta y un income statement distinto, y la retención de más suele concentrarse en uno solo.
- Si algún empleador no estaba registrado como empleador de working holiday makers, lo que produce una retención de no residente que no puedes corregir tú.
- Si se marcó el tax-free threshold. Es la rama que produce una deuda en lugar de una devolución.
- Si parte de tus ingresos fue trabajo con ABN, donde no se retiene nada y el impuesto se salda por completo en la liquidación.
- Si hubo un período anterior a que tu TFN estuviera registrado, lo que deja un bloque de pagos al 45 % y concentra ahí tu devolución.

Todo lo que se retuvo por encima de lo que realmente debías vuelve a través de tu [tax return de working holiday](/tax-return), y puedes [estimar tu devolución de impuestos](/calculator) con tus cifras acumuladas del año.
`,
  },
  'what-is-an-income-statement': {
    title: '¿Qué es un income statement en Australia?',
    description: "El income statement reemplazó al payment summary en papel. Tu empleador lo presenta con el reporte de payroll y es definitivo cuando figura como tax ready.",
    body: `
Recibes un income statement por cada empleador y por cada año fiscal, y contiene los dos números sobre los que se arma tu tax return: el pago bruto y el tax withheld. Es el sucesor digital del PAYG payment summary que antes llegaba en papel. Hoy nadie te lo entrega: está en los sistemas de la ATO, y un año de working holiday con cinco empleadores produce cinco de ellos.

## ¿De dónde sale un income statement?

Sale del software de payroll de tu empleador, no de un formulario que alguien completa a fin de año. Con Single Touch Payroll, cada pago reporta a la ATO tus sueldos brutos, el tax withheld y tu superannuation en el momento, y el income statement es el total acumulado.

Por eso el registro pertenece a los sistemas de la ATO y no a tu antiguo empleador. Una granja en Mildura que ya no responde correos ya reportó tus sueldos, y las cifras se pueden consultar sin ella.

## ¿Cuándo se puede usar?

El año termina el 30 de junio, los empleadores empiezan a finalizar los reportes alrededor del 14 de julio y la mayoría termina antes del 31 de julio. Mientras un empleador no finalice, el statement muestra cifras acumuladas del año que todavía no se declararon completas. Cuando lo hace, el estado cambia a tax ready.

Presentar la tax return con un statement que no está tax ready es una forma segura de recibir una liquidación equivocada y tener que enmendarla después. Las cifras todavía pueden cambiar, y entonces tu tax return ya no coincide con lo que tiene la ATO. Esperar a que todos los empleadores hayan finalizado es mejor que presentar la primera semana de julio.

## ¿Cuáles son los tres números que debes revisar?

El pago bruto, el tax withheld y el super que aparece junto a ellos. Esos tres te dicen si tu año se gravó como correspondía.

- **Gross payments (pagos brutos).** Compáralos con tu propio total acumulado de los payslips. Una diferencia significa que falta un período de pago o que hubo un pago de menos.
- **Tax withheld.** Divídelo por el bruto. Cerca del 15 % es lo correcto para un working holiday maker en un empleador registrado. Bastante más indica un período sin tu TFN registrado o un empleador que nunca se registró.
- **Super.** Los empleadores en general pagan dentro de los siete días hábiles posteriores al día de pago desde el 1 de julio de 2026 (antes era trimestral), así que una cifra que se ve baja puede simplemente no haber llegado todavía al fondo.

## ¿Qué pasa si falta un empleador?

Un empleador que falta es el defecto más común y tiene tres causas. Puede que todavía no haya finalizado, y en ese caso esperar lo resuelve. Puede que te haya reportado con un nombre o una fecha de nacimiento equivocados, de modo que el registro existe pero no está asociado a ti. O puede que nunca haya reportado los sueldos, que es el caso del pago en efectivo sin declarar.

En cualquiera de los casos, lo que ganaste tributa y va en tu tax return exista o no un statement para ese ingreso. Nuestra guía sobre [cómo declarar con ingresos en efectivo](/blog/cash-in-hand-tax-return) explica cómo reconstruir un período del que no se presentó ningún registro.

## ¿Qué pasa si las cifras están mal?

Los errores del statement los corrige el empleador; no se arreglan ajustando tu tax return a tus payslips. Los más comunes son un total bruto que no cuadra, una retención que refleja un estado de residencia equivocado y períodos de pago duplicados después de un cambio de sistema de payroll.

Cuando el empleador responde, la corrección suele hacerse en uno o dos ciclos de pago. Cuando no responde, la tax return puede presentarse con una estimación bien respaldada y enmendarse una vez corregido el reporte, dentro del plazo de dos años. Lo que no funciona es usar en silencio una cifra que la ATO no tiene, porque esa diferencia es lo que manda una declaración a revisión manual.

## ¿Qué determina lo completa que es tu tax return?

Que se hayan identificado todos los empleadores del año, y nada más se le acerca. Un año de working holiday suele incluir tres, cuatro o cinco empleadores en dos estados y a menudo en dos años fiscales, y el que se olvida casi siempre es el corto: tres semanas de packing en febrero, dos semanas de trabajo promocional, un turno por una agencia.

Presentar sin contar todos es el error más común de quien presenta por su cuenta, y puede perjudicarte en los dos sentidos. Un empleador olvidado con mucha retención es una devolución que nunca reclamaste. Un empleador olvidado con ingresos que no declaraste es una enmienda y un cargo por intereses más adelante. Cuando preparamos una [tax return](/tax-return), primero sacamos la lista completa de los sistemas de la ATO, porque la memoria no es confiable después de un año de mudanzas.

## ¿Qué deberías guardar tú?

Guarda los payslips, los extractos bancarios que muestren la llegada de los sueldos y cualquier cosa por escrito sobre tu tarifa de pago. El income statement te dice qué se reportó. Solo tus propios registros te dicen si lo reportado es lo que te correspondía cobrar.

Eso importa sobre todo en el trabajo agrícola y la hospitality, donde la cifra reportada puede ser perfectamente exacta como registro de un pago insuficiente. La tax return se prepara con las cifras reportadas de todas formas, pero conviene conocer la diferencia, porque recuperarla a través de Fair Work es un proceso aparte y gratuito.
`,
  },
  'what-is-the-ato': {
    title: '¿Qué es la ATO? Guía para backpackers',
    description: 'La Australian Taxation Office emite tu TFN, recibe los reportes de tu empleador, paga tu devolución y libera tu super. Cuatro trámites, un solo número.',
    body: `
La Australian Taxation Office es el organismo federal que administra el sistema de impuestos de Australia. Para un working holiday maker hace cuatro cosas: emite tu TFN, recibe lo que tus empleadores y fondos de super reportan sobre ti, procesa tu tax return y paga la devolución, y libera tu super después de que te vas.

## ¿Qué hace la ATO que realmente te afecta?

Todo pasa por tu Tax File Number. La ATO lo emite y luego lo usa como el hilo que conecta cada reporte de sueldo, cada aporte de super, cada pago de intereses bancarios y cada tax return que presentas.

Su alcance es más amplio e incluye el impuesto sobre la renta, el GST, el registro de negocios y el sistema de superannuation guarantee. Casi nada de eso toca directamente a un backpacker.

## ¿Cómo sabe la ATO lo que ganaste?

De forma automática, antes de que le digas nada. Los empleadores reportan tus sueldos y el tax withheld en cada pago con single touch payroll, los fondos de super reportan los aportes hechos a tu nombre, los bancos reportan los intereses de las cuentas australianas y los registros de acciones reportan los dividendos.

Por eso una tax return se puede presentar desde otro país sin un solo payslip. También por eso un empleador que nunca finalizó sus reportes crea un problema real: el ingreso existe, tú lo sabes y el registro de la ATO no lo muestra. Tus payslips cierran esa brecha.

## ¿Cuándo te contactaría la ATO?

La mayoría de los working holiday makers nunca sabe nada de ella. Los motivos son pocos: necesita más información para procesar una tax return, sus cifras no coinciden con lo declarado, hay impuesto adeudado sin pagar, una verificación de identidad está demorando una devolución o, rara vez, se abrió una revisión.

El contacto legítimo llega por correo postal a la dirección registrada, o a través de un agente fiscal que actúe en tu nombre. Por eso importa una dirección desactualizada: una carta que nunca viste se considera igualmente recibida.

## ¿Cómo distingues un contacto real de una estafa?

Por lo que te piden y con qué urgencia. La ATO no llama para exigir un pago inmediato, no acepta pagos con tarjetas de regalo ni criptomonedas, no amenaza con arresto ni deportación y no te pide que sigas en la línea mientras vas a una tienda.

A los working holiday makers los eligen como blanco a propósito: acabas de llegar al país, no sabes bien qué es normal y la amenaza de un problema de visa resulta creíble de una forma en que no lo sería para un australiano. Corta la llamada y verifica por tu cuenta.

## ¿Qué papel tiene la ATO para recuperar tu super?

Más de guardián que de pagador, en la mayoría de los casos. Cuando se reclama un Departing Australia Superannuation Payment, la ATO verifica que tu visa haya terminado y que te hayas ido. Luego el reclamo pasa a tu fondo de super, que aplica la retención del 65 % y libera el saldo.

La excepción es el super que la ATO ya tiene. Cuando un fondo perdió el contacto contigo, el saldo se transfiere a la ATO como unclaimed super y la ATO lo paga directamente. Quien se fue hace más de seis meses sin actualizar su dirección tiene bastantes posibilidades de estar en esa situación. Ambos caminos se explican donde puedes [reclamar tu superannuation al salir de Australia](/superannuation).

## Tus registros determinan cómo sale todo.

Lo que decide si esos cuatro trámites rutinarios salen bien es el estado de los registros que la ATO tiene sobre ti.

- Si la dirección y los datos bancarios que tiene la ATO están actualizados.
- Si todos los empleadores finalizaron sus reportes.
- Si todavía tienes acceso a cualquier cuenta en línea que creaste, algo que se vuelve un problema cuando ya estás en el extranjero.
- Si tu super está en fondos o ya se transfirió a la ATO como unclaimed.
- Si tienes años anteriores que nunca presentaste, que los registros de la ATO seguirán mostrando.

Tu conciliación anual con la ATO es tu [tax return de working holiday](/tax-return), y puedes [estimar tu devolución de impuestos](/calculator) antes de presentar nada.
`,
  },
  'gross-pay-vs-net-pay-australia': {
    title: 'Gross vs net pay: a dónde va tu dinero',
    description: "El gross es antes de impuestos y el net es lo que llega a tu cuenta. Con una visa working holiday, cerca del 15 % queda en medio. El super se paga aparte.",
    body: `
El gross pay es lo que ganaste antes de impuestos. El net pay es lo que llega a tu cuenta bancaria. Con una visa working holiday y un TFN registrado, cerca del 15 % del bruto queda entre uno y otro. El superannuation no forma parte de esa diferencia: se paga además de tu sueldo, a un fondo, y no se descuenta de él.

## ¿Qué significan realmente los números de tu payslip?

Un payslip australiano separa cuatro cifras, y confundir dos de ellas es como la gente llega a creer que le pagaron de menos cuando no es así.

- **Gross pay**: el total de lo ganado antes de descontar nada
- **Tax withheld**: el PAYG que se envía a la ATO a tu nombre
- **Net pay**: el bruto menos el tax withheld, el monto que se te transfiere
- **Super**: una línea aparte, que el empleador paga a tu fondo

Con 1000 AUD de sueldo bruto en un empleador registrado para working holiday makers, se retienen 150 AUD al 15 %, llegan 850 AUD a tu cuenta y 120 AUD de super al 12 % van a tu fondo. El super nunca aparece dentro de los 850 AUD y no debería.

## ¿Por qué el superannuation no es un descuento?

El superannuation es un costo del empleador que se suma a tu sueldo, no una porción de él. Se calcula sobre tus ingresos ordinarios brutos al 12 % y se paga a un fondo a tu nombre, y tu pago bruto es el mismo lo pague o no el empleador. Es la lectura equivocada más común que vemos de un payslip australiano.

Si un payslip muestra el super restado del bruto para llegar a un bruto menor, no es una rareza de presentación. Significa un error de payroll, o un empleador que trató un sueldo como si ya incluyera el super, lo cual cambia lo que se te debe. Nuestra guía sobre [super impago](/blog/super-employer-not-paying-what-to-do) explica qué hacer al respecto.

## ¿Qué cifra usa tu tax return?

Tu tax return y tu income statement usan el pago bruto, nunca el neto. La ATO calcula tu obligación sobre los ingresos brutos, luego acredita el impuesto ya retenido, y la diferencia, en un sentido o en otro, es tu devolución o tu deuda. El pago neto no aparece en ningún lugar del cálculo.

Esto le pasa a quien lleva la cuenta de su año con la app del banco. La cifra que llega a tu cuenta es más o menos el 85 % del número que usará la ATO, así que el año siempre se ve más pequeño desde el lado del banco.

## ¿Qué decide cuánto de tu bruto te queda?

Tres hechos sobre tu año determinan la diferencia. La tasa de retención es el mayor: 15 % con TFN registrado en un empleador registrado para working holiday makers, 45 % sin él, y tasas de no residente si el empleador nunca se registró como empleador de WHM. Cada una produce un neto muy distinto sobre el mismo bruto.

- **Si tu TFN estuvo registrado desde el primer día.** Las semanas al 45 % antes de que se procesara la Tax File Number Declaration se notan en un neto mucho más bajo, y el exceso se puede recuperar al hacer la tax return, no en el pago.
- **Si el empleador está registrado en la ATO para emplear working holiday makers.** Un empleador no registrado retiene a tasas de no residente, más altas que el 15 % desde el primer dólar.
- **Si se pagaron las penalty rates, los recargos y los allowances.** Una tarifa casual que omite en silencio el recargo del 25 % baja el bruto antes de que entre la retención, y esa pérdida no vuelve en una devolución.

## ¿Cómo puedes comprobar que el bruto es correcto?

Reconstruir el bruto desde cero lleva unos cinco minutos, y conviene hacerlo una vez por empleador mientras todavía recuerdas los turnos.

1. Horas ordinarias multiplicadas por tu tarifa por hora
2. Más las penalty rates de los turnos de fin de semana, de noche y en días festivos
3. Más los allowances, como uniforme, herramientas o viaje
4. Más las horas extra a la tarifa correcta
5. Compara el total con la línea de bruto del payslip

Cuando los números no cuadran, la causa suele ser una clasificación un nivel más baja de lo que corresponde bajo el award y no un robo deliberado. Plantéalo por escrito a payroll, porque esa es la versión que los empleadores corrigen rápido.

## ¿Cuándo deja de ser una pregunta de payslip?

En el momento en que la diferencia entre bruto y neto la causa tu situación tributaria y no la aritmética. Una retención de más al 45 %, un empleador no registrado, un Medicare levy cobrado a alguien sin derecho a Medicare y un punto de residencia mal respondido reducen el neto durante el año, y todos se recuperan, o no, en la tax return.

El payslip muestra el monto descontado y no dice nada sobre si correspondía. Averiguar cuál de esos casos fue el tuyo es para lo que sirve una [tax return](/tax-return), y por eso dos backpackers con el mismo bruto pueden terminar con miles de dólares de diferencia.
`,
  },
  'do-working-holiday-makers-pay-tax-on-tips': {
    title: '¿Las propinas tributan en Australia? Sí',
    description: 'Las propinas en efectivo y con tarjeta son ingreso gravable. Cómo aparecen en los payslips, qué espera la ATO que declares y qué registros bastan.',
    body: `
Sí. Las propinas son ingreso gravable en Australia sea cual sea la forma en que lleguen, y tributan a la tasa de working holiday maker del 15 % sobre los primeros 45 000 AUD, junto con tu sueldo. Lo que cambia es quién reporta el dinero, y eso depende de cómo te llegó la propina.

## ¿Qué propinas ya se reportan por ti?

Todo lo que pasa por la caja del local. Las propinas con tarjeta, los cargos por servicio agregados a la cuenta y las propinas en pool repartidas con un acuerdo de tronc pasan por el payroll, así que el PAYG se retiene en el momento y los montos aparecen en tu income statement de fin de año junto con el resto de tu sueldo.

En esa parte el reporte y el impuesto ya están hechos. Revisa un payslip: un local que dice repartir propinas y no muestra nada en ningún payslip merece una pregunta.

## ¿Qué propinas te toca declarar a ti?

El efectivo que te entregan directamente. Nadie lo registra, no se retiene PAYG y no aparece en tu income statement. La obligación de declararlo al cierre del año fiscal es tuya.

El monto decide cuánto importa esto. Un café tranquilo de barrio genera casi nada en propinas en efectivo y la cuestión es teórica. Un bar concurrido del centro un viernes y un sábado por la noche puede generar una suma importante a lo largo de una temporada, y ahí pasa a ser dinero real en la [tax return](/tax-return).

- Propinas en efectivo de clientes: es tu responsabilidad, sin impuesto retenido en el momento
- Propinas repartidas en efectivo al final de un turno: mismo tratamiento, igualmente declarables
- Propinas con tarjeta y de tronc: se reportan por el payroll, no hay nada más que hacer

## ¿Qué registros necesitas realmente?

Un total acumulado. La ATO no espera que anotes cada propina por separado. Una cifra semanal anotada en algún lugar duradero, con la fecha y el local, cumple con el requisito de llevar registros.

La alternativa es adivinar en octubre una temporada que terminó en marzo. Quienes no declaran nada rara vez son deshonestos: no tienen idea de cuál fue la cifra y cero les parece lo más seguro. Una nota en el teléfono lo soluciona.

## ¿Qué pasa si no declaras las propinas en efectivo?

No llega una carta de auditoría la semana después de presentar. La hospitality es un sector con cruce de datos, y el ingreso no declarado sale a la luz más tarde por los reportes de cada local y los patrones de depósitos bancarios.

La consecuencia, cuando sale a la luz, es el impuesto que debió pagarse más una multa por la diferencia y los intereses, aplicados al año en cuestión. El impuesto sobre una temporada de propinas declarada al 15 % es menor de lo que la mayoría supone. Para quien piensa en un segundo o tercer año, una situación pendiente con la ATO es un cabo suelto en todo trámite futuro con los sistemas del gobierno australiano.

## ¿Se paga super sobre las propinas?

A veces, y depende de la misma distinción. Las propinas repartidas por el payroll del empleador pueden formar parte de los ordinary time earnings, y en ese caso se debe pagar el 12 % de [super](/superannuation) sobre ellas. El efectivo que te entrega un cliente no lo paga el empleador, así que no corresponde ninguna obligación de super.

Dónde cae cada caso depende del award y de cómo el local haya clasificado los pagos, algo que el payslip no te dice. La comprobación útil es ver si tus aportes de super parecen coherentes con tus ingresos totales, incluidos los repartos de tronc, porque una diferencia ahí es la misma conversación que cualquier otro caso de [super que no se paga](/blog/super-employer-not-paying-what-to-do).
`,
  },
  'tax-obligations-after-leaving-australia': {
    title: 'Impuestos al salir de Australia: qué queda pendiente',
    description: "Irte de Australia no cierra tu ficha de impuestos. La última tax return, el reclamo de super y la cancelación del ABN se hacen a distancia.",
    body: `
Todo lo que acumulaste trabajando en Australia sigue en la ATO después de que te vas: una tax return por cada año fiscal en que tuviste ingresos, un saldo de super que nadie reclama por ti y un ABN que sigue registrado hasta que lo canceles. Nada de eso exige que estés en el país y nada vence porque te fuiste. Una tarjeta de embarque no es un hecho tributario.

## ¿Qué queda pendiente cuando ya te fuiste?

Cuatro cosas, independientes entre sí, así que hacer una no resuelve las demás. Hay que presentar la última tax return, reclamar el [superannuation](/superannuation), cancelar cualquier [ABN](/abn) y dejar en la ATO datos de contacto que todavía te lleguen.

- Presenta una tax return por cada año fiscal australiano en que tuviste ingresos
- Reclama tu super mediante el Departing Australia Superannuation Payment
- Cancela cualquier ABN que hayas registrado como sole trader
- Conserva un correo electrónico y una cuenta bancaria que sigan funcionando

La ATO tiene tus registros de ingresos de todos los empleadores sin importar dónde estés, así que un año sin presentar no pasa inadvertido. Queda abierto.

## ¿Cómo funciona presentar la tax return desde el extranjero?

Es la misma tax return, preparada de la misma manera, desde otro código postal. Los income statements salen de los sistemas de la ATO y no de tus antiguos empleadores, lo cual importa porque perseguir desde Berlín a un packing shed de Queensland para pedirle papeles no es un plan realista.

El plazo estándar es el 31 de octubre posterior al cierre del año fiscal. Las tax returns presentadas a través de un agente registrado suelen tener un plazo extendido hasta mayo del año siguiente. Nuestra guía sobre [cómo presentar desde el extranjero](/blog/how-to-lodge-tax-return-from-overseas) explica el procedimiento.

## ¿Cuándo puedes reclamar tu super?

El reclamo del DASP se abre cuando se cumplen dos condiciones a la vez: tu visa dejó de estar vigente y saliste de Australia. No una u otra. Si te vas mientras la visa sigue vigente, tendrás que esperar a que venza o se cancele antes de que el reclamo avance.

El pago se retiene al 65 % para los aportes de working holiday makers, así que un saldo de 10 000 AUD paga unos 3500 AUD. La aprobación suele tardar alrededor de 28 días una vez completa la solicitud, y el monto neto puede pagarse a una cuenta australiana o del extranjero según el fondo. Nuestra [guía de superannuation](/superannuation) explica el proceso y los documentos.

## ¿Qué pasa si dejas el super ahí?

Si un fondo no tiene noticias tuyas durante seis meses después de que te fuiste y tu visa venció, transfiere el saldo a la ATO como unclaimed super. El dinero sigue siendo tuyo, pero el reclamo pasa a ser un reclamo ante la ATO y no ante el fondo, con otros trámites.

Lo que de verdad le cuesta dinero a la gente es tener varios fondos y reclamar solo el que recuerda. Cuatro empleadores en un año suelen significar más de un fondo, cada uno con un saldo propio que necesita un reclamo propio. Nuestra guía para [encontrar super perdido](/blog/how-to-find-lost-superannuation) explica cómo rastrearlos.

## ¿Puedes presentar antes del 30 de junio si te vas definitivamente?

Sí, y casi nadie lo sabe. Quien se va de Australia de forma permanente a mitad de un año fiscal puede presentar una tax return anticipada por ese período parcial en lugar de esperar a julio, lo que adelanta la devolución varios meses.

No es automáticamente la mejor opción. Una tax return anticipada se prepara antes de que se finalicen los reportes de los empleadores, así que las cifras hay que armarlas con los payslips en lugar de consultarlas, y si vuelves a Australia más tarde en el mismo año, hay que enmendarla. Conviene a una salida limpia con registros completos.

## ¿Qué decide si esto es simple o complicado?

Tres hechos sobre cómo te fuiste. Si tu cuenta bancaria australiana sigue abierta, porque tanto la devolución como el pago del DASP se depositan en una cuenta, y reabrir una desde el extranjero es realmente difícil. Si conoces a todos los empleadores del año, ya que un trabajo olvidado es la causa habitual de una enmienda meses después. Y si la visa realmente venció, algo que condiciona el reclamo de super.

La cuenta es lo que causa el daño real. Mucha gente cierra todo la semana antes de volar, y eso convierte una devolución sencilla en un ejercicio de meses para restablecer los datos de pago desde otro continente. Mantenla abierta tres o cuatro meses después de irte, hasta que la devolución y el super hayan llegado.

## ¿Importa si simplemente no presentas?

Importa más adelante que ahora. Un año sin presentar queda en el registro de forma indefinida, y cuando había una devolución a tu favor simplemente no se paga, que es el resultado más común y el más silencioso.

Cuando había impuesto por pagar en lugar de devolución, se acumulan intereses y la deuda queda ligada al registro fiscal y no a la persona, y sale a la luz cuando hay un motivo para revisar, incluida una futura solicitud de visa australiana. Nuestra guía sobre [tax returns tardías y multas](/blog/late-tax-return-penalty-working-holiday) explica dónde las multas realmente pegan, que casi nunca es donde la gente teme. [Escríbenos](/contact) si te fuiste con un año pendiente.
`,
  },
  'tax-residency-working-holiday-makers': {
    title: '¿Eres residente fiscal de Australia?',
    description: "La residencia puede cambiar las tasas de todo tu año, es fácil equivocarse en ambos sentidos y no se resuelve con una lista de verificación.",
    body: `
La residencia fiscal es la pregunta de mayor alcance en una tax return de working holiday. Puede cambiar las tasas aplicadas a todo tu año, y es el punto que más se responde mal entre quienes estaban seguros de su respuesta.

De qué lado de la línea quedas no se puede deducir a partir de esta página, de una calculadora ni de la experiencia de un amigo. Es un juicio sobre tu propio año, y toda tax return preparada aquí es revisada y aprobada por un agente fiscal registrado antes de adoptar una posición.

## ¿Qué cambia la residencia fiscal?

Más de lo que la mayoría espera. Puede cambiar las tasas aplicadas a tus sueldos, las deducciones a las que tienes acceso, el tratamiento de los ingresos por inversiones y de los ingresos del extranjero, y el tamaño del resultado final. Para algunas personas la diferencia vale miles de dólares. Para otras no cambia nada. Desde afuera nadie puede saber cuál es tu caso.

## ¿Por qué no puedes resolverlo por tu cuenta?

Porque no es una pregunta con una sola respuesta. Pesa muchos aspectos de tu situación en conjunto, incluidos aspectos que la mayoría nunca piensa en revisar, y ningún dato aislado ni ninguna regla práctica lo resuelve. Dos viajeros cuyos años se ven casi idénticos pueden ser evaluados correctamente de manera distinta.

## ¿Lo decide tu visa?

No por sí sola. Tener una visa 462 o 417 dice muy poco sobre cómo se evaluará tu año, y responder la pregunta de residencia en un formulario por instinto es como las tax returns terminan mal, en ambos sentidos.

## ¿Qué pasa si se responde mal?

O reclamas una posición que no puedes respaldar, lo que puede llevar más adelante a una liquidación enmendada, o pagas de más en silencio porque nunca se consideró una posición mejor. Ambos casos son comunes y ambos se pueden evitar.

## ¿Quién debería revisarlo por ti?

Un agente fiscal registrado que repase tu año completo antes de presentar nada. Así se maneja la residencia en cada [tax return de working holiday](/tax-return) preparada aquí. [Escríbenos](/contact) y lo revisamos contigo.
`,
  },
  'how-to-update-address-with-ato': {
    title: 'Cambia tu dirección en la ATO a tiempo',
    description: "Por qué importa la dirección registrada en la ATO y qué pasa si es vieja. Conviene ordenarla antes de que la carta del TFN llegue a una dirección que ya dejaste.",
    body: `
La dirección que la ATO tiene registrada se puede actualizar, y la forma más sencilla es que un agente fiscal lo haga en tu nombre. Lo importante es hacerlo antes de que se envíe lo siguiente, porque el correo que ya va en camino sigue a la dirección anterior.

## ¿Por qué la ATO tiene una dirección si las devoluciones van a una cuenta bancaria?

Porque varias cosas que deciden si te pagan todavía viajan por correo postal. La carta de tu TFN se envía por correo y solo por correo. La correspondencia de verificación de identidad se envía por correo. Los notices of assessment, las cartas de enmienda y cualquier solicitud de información van a la dirección registrada, y una carta que nunca ves se considera igualmente recibida.

Las devoluciones en sí se pagan electrónicamente a una cuenta bancaria australiana en casi todos los casos, así que una dirección vieja normalmente no detiene el dinero. Detiene todo lo que tiene que pasar antes del dinero.

## ¿Qué sale mal cuando la dirección es vieja?

El fallo más caro es la carta del TFN, porque una carta devuelta reinicia una espera de 28 días mientras puede que estés trabajando al 45 % en vez del 15 %.

El segundo es el superannuation. Tu fondo y la ATO tienen cada uno una dirección tuya, y un fondo que no logra contactarte termina reportando la cuenta como no reclamada y transfiriéndola a la ATO. Ese dinero sigue siendo tuyo y sigue siendo reclamable, pero ahora está un paso más lejos justo cuando estás saliendo del país.

El tercero es el silencioso. Una carta de la ATO con una pregunta sobre tu tax return, sin respuesta porque fue a un hostel en Byron que dejaste en marzo, se convierte en una liquidación hecha sin tu aporte.

## ¿Qué dirección das si te mudas cada pocas semanas?

Un lugar que todavía guarde tu correo dentro de cuatro semanas, que rara vez es donde duermes esta noche. La cosecha y la hospitality mueven a la gente más rápido de lo que el correo mueve las cartas.

- La dirección australiana permanente de un amigo o familiar es la mejor respuesta, aunque nunca vayas ahí.
- Un hostel de estadía larga sirve si de verdad guarda el correo de huéspedes que ya se fueron, algo que muchos no hacen.
- Un apartado postal (PO box) se acepta y es la opción más confiable para quien pasa una temporada moviéndose entre granjas.
- Un hostel que dejas el viernes es la peor respuesta, y es la que da la mayoría.

La ATO registra por separado una dirección postal y una dirección residencial. Si usas una dirección donde te guardan el correo, pon esa como postal y deja la residencial como el lugar donde realmente vives, porque la carta del TFN sigue la dirección postal.

## ¿Importa tu dirección una vez que te fuiste de Australia?

Sí, y es el punto en el que la mayoría deja de pensar en ello. Se puede registrar una dirección en el extranjero en la ATO, y conviene hacerlo, porque la correspondencia posterior a tu salida es justo la que no puedes permitirte perder: una devolución en revisión, un Departing Australia Superannuation Payment, una solicitud para confirmar tu identidad.

Tus datos bancarios importan igual. Una devolución dirigida a una cuenta australiana que cerraste camino al aeropuerto no desaparece, pero rebota y queda como un crédito en tu cuenta de la ATO hasta que alguien le indique adónde enviarla.

## ¿Es una tarea de rutina o es urgente en tu caso?

Actualizar una dirección es la misma tarea para todos, pero la urgencia no lo es.

- Si todavía esperas la carta del TFN. Si es así, es urgente y es lo único de esta página que tiene un costo semanal.
- Si tienes superannuation en un fondo con una dirección vieja. Las cuentas que no se pueden contactar terminan transferidas a la ATO como unclaimed super.
- Si estás por salir de Australia. La dirección y la cuenta bancaria deben estar correctas antes de volar, no después.
- Si tienes más de un fondo de super por haber tenido más de un empleador. Cada fondo guarda su propia dirección, y actualizar la ATO no actualiza los fondos.

Si te vas con super todavía en Australia, la dirección es uno de los datos que decide lo fácil que te resulta [reclamar tu superannuation al salir de Australia](/superannuation), y puedes [estimar tu devolución de impuestos](/calculator) antes de presentar nada.
`,
  },
}
