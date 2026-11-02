export const chunk: Record<string, { title: string; description: string; body: string }> = {
  'tfn-identity-documents-required': {
    title: 'Documentos para el TFN: basta con el pasaporte',
    description: 'Si haces la solicitud online, un pasaporte válido con tu visa es suficiente, sin copias certificadas. Qué verifica la ATO y qué hace fallar solicitudes.',
    body: `
Para la mayoría de los working holiday makers, el pasaporte que lleva la visa es todo el requisito de documentos. No subes nada. La solicitud verifica tu pasaporte de forma electrónica contra los registros de inmigración, así que lo importante no es qué documentos tienes, sino que lo que escribes coincida con lo que el gobierno ya tiene registrado.

## ¿Qué pide realmente la solicitud?

Datos de identidad, no pruebas. Tu nombre legal completo tal como aparece en el pasaporte, la fecha de nacimiento, el país de ciudadanía y el país de nacimiento, el pasaporte asociado a tu visa 462 o 417 vigente, la fecha en que llegaste a Australia con esa visa, una dirección residencial australiana y tus datos de contacto.

No hay un funcionario que lea la notificación de concesión de tu visa. Hay una comparación automática que coincide o no coincide. Por eso un detalle que parece insignificante puede frenar toda la solicitud.

## ¿Qué pasaporte usas si tienes más de uno?

El pasaporte con el que entraste a Australia y contra el que se concedió la visa. Quienes tienen doble nacionalidad suelen solicitar el TFN con el pasaporte que consideran principal, y no coincide, porque el registro de inmigración está vinculado al otro.

La misma trampa afecta a quien renovó el pasaporte después de que le concedieran la visa. El pasaporte nuevo tiene otro número, el registro de la visa guarda el anterior, y la verificación falla con un documento que tienes en la mano.

## ¿Qué dirección debes indicar?

Una donde puedas recibir correo con seguridad dentro de un mes, porque el TFN llega como carta física y, si la carta vuelve devuelta, la espera empieza de nuevo. Sirve una casa de alquiler o compartida, la de un amigo o familiar, un hostel donde te permitan recibir correo, o un lugar de trabajo si tu empleador lo acepta.

No sirve un hostel que vas a dejar en diez días, y es el retraso más común que la gente se causa a sí misma en este trámite. Nuestra guía sobre [cómo actualizar tu dirección ante la ATO](/blog/how-to-update-address-with-ato) explica qué hacer si te mudas antes de que llegue la carta.

## ¿Qué pasa con los nombres que no son simples?

Son la causa principal de rechazo, y el motivo es mecánico. Los guiones, los apóstrofos, los caracteres con acento, varios segundos nombres, los nombres transliterados y los apellidos cambiados por matrimonio generan diferencias entre cómo se imprime un nombre, cómo se registró cuando se tramitó la visa y cómo lo escribe la persona.

Si en el pasaporte dice François con cedilla y Müller con diéresis, las versiones sin esos signos son una discrepancia para un sistema que compara cadenas de texto. Lo mismo ocurre si omites un segundo nombre que sí figura en la concesión de la visa. Escríbelo carácter por carácter, tal como está impreso.

## ¿Cuándo pide más la ATO?

Cuando falla la comparación automática. Entonces la ATO puede pedirte copias certificadas o una verificación de identidad en persona en un centro de atención.

Ese camino es lento, sobre todo desde el extranjero, y es la razón para hacer la solicitud pronto, al llegar a Australia, y no más adelante.

## ¿Cuánto cuesta realmente un retraso?

El 30 % de lo que ganes mientras tanto. Sin un TFN registrado, el empleador retiene el 45 % en lugar del 15 %, lo que en una semana de 1000 AUD son 300 AUD retenidos, y sigue así hasta que se registre el número.

El plazo de 28 días de la declaración es la forma de reducir ese costo. Si le dices a tu empleador que la solicitud está en trámite y queda anotado en la Tax File Number Declaration, te mantiene en la tasa de working holiday maker durante ese plazo. Lo retenido de más se concilia en la liquidación; qué parte vuelve depende de tu año y lo decide la ATO.

## ¿Qué haces con el número cuando llega?

Entrégalo a cada empleador por separado y luego protégelo. Los working holiday makers son blanco del robo de TFN, porque con un TFN robado se puede presentar una declaración fraudulenta y enviar la devolución a otra cuenta, y la víctima suele enterarse cuando su propia declaración es rechazada por estar duplicada.

Nunca envíes un TFN, un pasaporte ni una notificación de visa a alguien que no pueda mostrar un registro vigente en el registro público de profesionales tributarios del gobierno. Las personas que se presentan como asesores fiscales en los grupos de mochileros son un problema recurrente, y un número de registro verificable es toda la prueba que necesitas.

## ¿Se aprobará el tuyo a la primera?

Los documentos son los mismos para todos. Que se apruebe a la primera depende de detalles propios de tu caso, y cada punto de esta lista es un fallo común y evitable.

- Si el pasaporte con el que solicitas es el mismo contra el que se concedió la visa.
- Si ese pasaporte se renovó después de concederse la visa.
- Si tu nombre tiene caracteres o segundos nombres que se registraron de forma distinta en alguna etapa.
- Si tu llegada ya quedó registrada, algo que puede no ocurrir si solicitas a las pocas horas de aterrizar.
- Si la dirección postal seguirá siendo tuya dentro de un mes.
- Si ya tuviste un TFN antes, caso en el que lo correcto es recuperarlo y no hacer una solicitud nueva.

Lo que se retenga de más durante la espera puede volver a través de la [tax return de working holiday maker](/tax-return), y puedes [estimar tu devolución de impuestos](/calculator) cuando sepas cuánto duró el período.
`,
  },
  'tfn-security-protect-from-fraud': {
    title: 'Estafas con el TFN: quién puede pedirlo y quién no',
    description: 'Tu TFN más los datos del pasaporte bastan para un fraude de identidad. Quién puede pedirlo, qué estafas circulan y qué hacer si se filtró.',
    body: `
Seis partes pueden pedirte el TFN: tu empleador una vez que empiezas a trabajar, la ATO, tu banco, tu fondo de super, un agente fiscal registrado que actúe por ti y los organismos del gobierno que administran pagos a los que tienes derecho. Nadie más tiene ningún derecho a pedírtelo. Quien no esté en esa lista y te lo pida se equivoca o intenta cometer un fraude.

## ¿Por qué vale la pena robar un TFN?

Porque es permanente y da acceso a dinero a tu nombre. Alguien que tenga tu TFN y unos datos básicos de identidad puede presentar una declaración como si fuera tú y mandar la devolución a su propia cuenta, intentar acceder a tu superannuation o crear registros de ABN vinculados a ti.

El número no se puede cancelar como una tarjeta. Una declaración fraudulenta suele aparecer solo cuando tu declaración verdadera es rechazada por duplicada, meses después, con la devolución congelada mientras se investiga.

## ¿Por qué se apunta específicamente a los working holiday makers?

Porque son nuevos en el sistema, no saben qué es normal y se mueven en entornos que funcionan con confianza informal. Los hostels, los grupos de Facebook de mochileros y las comunidades de WhatsApp son donde alguien que no conoce el sistema tributario australiano busca ayuda, y las personas que ofrecen esa ayuda no pasan ningún filtro.

El patrón es siempre el mismo. Te ofrecen presentar tu declaración o reclamar tu super por una tarifa pequeña, te piden una foto del pasaporte y de la notificación de la visa, tu TFN, tu fecha de nacimiento y tu dirección, y a veces tus datos bancarios. Después presentan la declaración con la devolución dirigida a otra cuenta y la cuenta de esa persona desaparece.

## ¿Cuáles son las señales de alerta?

La primera resuelve la mayoría de los casos: que no tenga un registro verificable en el registro público de profesionales tributarios del gobierno. El registro es público, se comprueba en menos de un minuto, y quien no quiera darte su número ya te respondió.

- Piden el pago en efectivo, criptomonedas o tarjetas de regalo
- No tienen dirección comercial y operan solo desde una app de mensajería
- Prometen una devolución grande antes de que nadie haya mirado tu situación
- Te piden las contraseñas de tus cuentas o que compartas la pantalla
- Te presionan para actuar de inmediato, casi siempre invocando una fecha límite

Conviene insistir en lo de las contraseñas. Un agente registrado accede a tus datos por su propio canal de agente y nunca necesita tus credenciales de myGov. Quien te las pida no está actuando como agente, se haga llamar como se haga llamar.

## ¿Cómo suele ocurrir la filtración?

Rara vez por algo sofisticado. Las causas habituales son los formularios de falsas ofertas de trabajo que piden todos los documentos de identidad antes de que exista cualquier trabajo, los documentos fotografiados o dejados en equipos compartidos de un hostel, y los TFN enviados por WhatsApp a alguien que se presenta como de payroll.

El hilo común es una petición que parece normal desde el punto de vista administrativo y llega cuando no tienes con qué compararla. Conocer la lista de cinco convierte una decisión de criterio en una verificación de datos.

## ¿Qué haces si ya ocurrió?

Actúa el mismo día en que lo sospeches. Contacta la línea de apoyo de identidad de clientes de la ATO y diles que tu TFN está comprometido. Pueden poner una marca en tu registro que exija una verificación adicional antes de procesar nada a tu nombre y, en algunos casos, emitirte un número nuevo.

Después asegura todo lo que esté asociado a él. Cambia tus credenciales de myGov y activa el inicio de sesión más seguro disponible, avisa a tu fondo de super porque los saldos son un blanco por sí mismos, y comprueba si ya se presentó una declaración a tu nombre este año. La marca no cuesta nada y sigue protegiéndote durante años.

## ¿Qué pasa si ya se presentó una declaración fraudulenta?

Tu declaración verdadera igual se presenta y la devolución sigue siendo tuya, pero pasa a un camino más lento mientras se investiga la duplicada. Es un retraso de meses y no una pérdida, y en la mayoría de los casos se resuelve con la ATO y no con la policía.

Denúncialo, guarda toda la correspondencia y espera verificaciones de identidad adicionales en todo lo que venga después. Estar fuera de Australia lo hace bastante más difícil.

## ¿Qué tan expuesto estás ahora mismo?

Las reglas de protección son las mismas para todos. Tu exposición no lo es, y resolverlo desde el extranjero es más lento.

- Si alguna vez enviaste documentos de identidad a alguien que no pudiste verificar.
- Si tu cuenta de myGov usa un número de teléfono que sigue funcionando, ya que una SIM australiana muerta te deja fuera de tu propio registro.
- Si los datos de contacto de tu fondo de super están al día, porque los fondos son un blanco aparte.
- Si ya saliste de Australia.
- Si se presentó a tu nombre este año una declaración que tú no presentaste.
- Si hay algún ABN registrado con tus datos que tú no registraste.

Las declaraciones presentadas como parte de la [tax return de working holiday maker](/tax-return) pasan por un canal profesional verificable y no por una cuenta anónima, y puedes [estimar tu devolución de impuestos](/calculator) por tu cuenta antes de tratar con nadie.
`,
  },
  'who-can-ask-for-your-tfn': {
    title: '¿Quién puede pedir tu TFN legalmente?',
    description: 'Solo seis partes pueden pedirlo: tu empleador, la ATO, tu fondo de super, tu banco, un agente fiscal registrado y Services Australia. Los hostels no.',
    body: `
Seis partes pueden pedirte legalmente el Tax File Number: tu empleador una vez que te contrata, la ATO, tu fondo de superannuation, tu banco, un agente fiscal registrado que actúe en tu nombre y Services Australia si estás solicitando un pago. Cualquier otra persona puede pedírtelo, pero tú puedes negarte, y esa negativa no puede usarse legalmente en tu contra.

## ¿Por qué la lista es tan corta?

Porque un TFN junto con un pasaporte es un kit de identidad que funciona, y la ley de privacidad australiana lo trata como tal. Solo pueden recopilarlo las organizaciones con un motivo tributario real para tenerlo, y cada una debe explicar para qué lo necesita, guardarlo de forma segura y usarlo únicamente con esa finalidad.

Gracias a que la lista es corta, nunca tienes que juzgar si una petición es razonable. Si quien lo pide no está en la lista, la respuesta es no, y no hace falta dar explicaciones.

## ¿Cuándo tiene derecho a pedirlo tu empleador?

Después de contratarte, no antes. La petición legítima llega como una Tax File Number Declaration durante la incorporación, que es un formulario estándar de la ATO, y el empleador usa el número para aplicar la tasa correcta del 15 % de working holiday maker y para informar tus ingresos.

Que te lo pidan antes de haber aceptado un trabajo es la señal de alerta, y es la forma más común en que caen los mochileros. Una agencia de reclutamiento no necesita tu TFN para presentarte a un empleo, y si todavía no aceptaste una oferta no hay ninguna declaración que completar.

## ¿Quién no tiene derecho a pedirlo?

Cualquiera cuyo motivo para quererlo no sea tributario. Las peticiones que reciben los working holiday makers vienen de un grupo bastante predecible.

- Propietarios y agencias inmobiliarias, incluso en solicitudes de alquiler
- Hostels, para cualquier fin
- Proveedores de teléfono, internet y servicios básicos
- Agencias de reclutamiento, antes de que te hayan contratado
- Otros viajeros, amigos o cualquier persona de un grupo de chat
- Quien ofrezca ayuda con impuestos y no pueda mostrar un registro vigente

Negarte a darlo en cualquiera de estos casos no es un asunto penal y no puede usarse legalmente para negarte un alquiler, un servicio o un trabajo.

## ¿Cómo son en realidad las estafas?

No son sofisticadas y no necesitan serlo, porque van dirigidas a personas que llevan pocas semanas en un país nuevo.

**La falsa oferta de trabajo.** Una oferta que llega sin que la hayas buscado, te pide el TFN y una foto del pasaporte antes de cualquier entrevista, y nunca pasa a un trabajo real. Lo que se obtiene es un kit de identidad, no un empleo.

**El falso agente de devoluciones en redes sociales.** Una cuenta que se ofrece a presentar tu declaración, te pide el TFN y las credenciales de tu cuenta del gobierno, y con frecuencia te promete una cifra sin haber visto ninguno de tus ingresos. Las declaraciones se presentan con cuentas bancarias que la víctima no controla.

**El formulario de payroll del tablón del hostel.** Un formulario en papel que recoge TFN para trabajos en efectivo que nunca llegan, dejado donde cien personas lo van a rellenar.

La señal constante es la promesa de un importe de devolución concreto antes de que nadie haya visto tus resúmenes de ingresos. Nadie puede saber esa cifra de antemano, y quien diga que sí no está haciendo un trabajo tributario.

## ¿Cómo compruebas a alguien antes de entregarle nada?

Todo agente fiscal que opera en Australia figura en el registro público de profesionales tributarios del gobierno, donde se puede buscar. La comprobación toma un minuto y una práctica legítima espera que la hagas.

Hay dos cosas que un agente genuino nunca necesita: la contraseña de tu cuenta del gobierno y la de tu banco. El acceso a tus registros de la ATO se obtiene por un canal profesional, no iniciando sesión como tú, y cualquier petición de esas credenciales es un fraude. Las declaraciones que se preparan aquí son revisadas y aprobadas por un agente fiscal registrado antes de presentarse ante la ATO, y ese registro se puede comprobar en el mismo registro público.

## ¿Qué pasa si ya lo diste a la persona equivocada?

No ocurre nada catastrófico de forma automática, y un TFN por sí solo no basta para vaciar una cuenta bancaria. El riesgo es que se presente una declaración fraudulenta a tu nombre o que se abra una cuenta con tu identidad, y ambas cosas se pueden detectar.

La ATO puede poner una marca en tu registro después de un compromiso de identidad, y vale la pena pedirla en lugar de esperar a ver qué pasa. Contáctala al 13 28 61 y explica con claridad qué datos entregaste y a quién. Si además entregaste el acceso a tu cuenta del gobierno, cámbialo antes que cualquier otra cosa.

## ¿Es legítima la petición que tienes delante?

La lista de quién puede pedirlo legalmente es fija, pero que una petición concreta sea legítima depende del contexto.

- Si ya aceptaste el trabajo. Es la prueba completa para la petición de un empleador.
- Si quien lo pide es un profesional registrado, algo que se comprueba en un minuto en el registro público.
- Si alguien tiene también las credenciales de tu cuenta del gobierno además de tu TFN, una situación bastante peor que la del TFN solo.
- Si estás solicitando un pago de Services Australia, el único contexto del gobierno fuera de la ATO en que la petición es legítima.
- Si lo diste a un fondo de super. Eso no es un riesgo, es necesario, y un fondo sin tu TFN grava los aportes a una tasa más alta y le cuesta asociar la cuenta contigo cuando [reclamas tu superannuation después de salir de Australia](/superannuation).
`,
  },
  'tfn-australian-address-no-fixed-address': {
    title: '¿Sin dirección fija? Cómo obtener el TFN igual',
    description: 'Tu TFN llega por carta, así que necesitas una dirección australiana que reciba correo unas cuatro semanas. Sirve un hostel, un amigo o un apartado postal.',
    body: `
Para pedir un TFN necesitas una dirección australiana, porque el número llega en una carta por correo. No hace falta un contrato de alquiler. Sirve un hostel, la casa de un amigo, un lugar de trabajo o un servicio de recepción de correo, siempre que alguien retire el correo con seguridad durante unas cuatro semanas después de tu solicitud.

## ¿Qué direcciones acepta la ATO?

La ATO pide una dirección residencial o postal australiana y no verifica que vivas allí. Necesita un lugar donde alguien recoja la carta y no la devuelvan al remitente, que es un requisito más bajo de lo que suponen muchos solicitantes.

- Una casa de alquiler, compartida o subarrendada
- Un hostel o alojamiento para mochileros
- La casa de un amigo o un familiar
- La dirección de un lugar de trabajo, con el acuerdo del empleador
- Un servicio de recepción de correo con dirección de calle

Una dirección de calle funciona mejor que un apartado postal, algo útil de saber antes de pagar por uno.

## ¿Por qué es arriesgada la dirección de un hostel?

El hostel es la opción más común y también la que más falla. Los hostels grandes manejan cientos de cartas y paquetes por semana, las cartas se pierden, se tiran o se devuelven, y casi ninguno reenvía el correo a un huésped que ya hizo el check-out.

Si un hostel es la única opción realista, pregunta en recepción si guardan el correo por nombre del huésped y empieza a preguntar después de diez días. El plazo máximo de la ATO es de 28 días, pero la carta suele llegar en menos de dos semanas.

## ¿Qué pasa si te mudas antes de que llegue la carta?

Mudarse antes de que llegue la carta es la mayor causa de que un working holiday maker nunca reciba su TFN. Una vez que la carta se envió a la dirección anterior, la ATO no manda otra de forma automática, y una carta devuelta no activa un nuevo envío.

El número en sí no se pierde, porque un TFN se emite una sola vez y es permanente. Lo único que falló fue la entrega. Para recuperarlo hay que corregir la dirección en el registro de la ATO y pedir que te confirmen el número, no volver a solicitar, porque eso crea un registro duplicado que tarda más en resolverse. Nuestra guía sobre [cómo actualizar tu dirección ante la ATO](/blog/how-to-update-address-with-ato) explica la corrección.

## ¿Qué dirección conviene usar en realidad?

Ordena las opciones según la probabilidad de que una persona se fije en la carta. La mejor opción disponible es el hogar establecido de un amigo o un familiar, porque en un hogar real se abre el correo. Después viene un lugar de trabajo, si el empleador está de acuerdo, algo que las granjas hacen con frecuencia con el personal de temporada.

- La residencia establecida de un amigo o un familiar
- La dirección de un lugar de trabajo, con el acuerdo del empleador
- Un hostel donde reservaste cuatro semanas o más y confirmaste que guardan el correo por nombre
- Un servicio de reenvío de correo con dirección de calle

Lo que rompe las entregas es previsible: hacer el check-out antes de que llegue la carta, los hostels que vacían cada semana el correo no reclamado y un número de unidad equivocado en el formulario.

## ¿Te cuesta algo el retraso?

No de forma directa. La solicitud del TFN es gratuita, el número es permanente y el impuesto retenido de más se concilia con la declaración (lo que vuelva depende de tu año y lo decide la ATO), así que una carta tardía no suele hacerte perder dinero al final.

Lo que cuesta es el flujo de caja en los meses intermedios, y eso depende de algo distinto de la carta. Desde tu primer día de trabajo tienes 28 días para entregar un TFN a tu empleador antes de que deba retener el 45 % en lugar del 15 %, y el formulario de declaración deja constancia de que la solicitud está en trámite. Lo que decide cuánto cobras es si le avisaste al empleador, no si la carta ya llegó. Nuestra guía sobre [el número de referencia del TFN](/blog/tfn-reference-number-before-tfn-arrives) explica qué puedes usar mientras tanto.

## ¿Qué decide si tu solicitud sale bien?

Tres hechos, todos bajo tu control el día que solicitas. Si la dirección seguirá recibiendo tu correo dentro de cuatro semanas. Si los datos coinciden exactamente con tu pasaporte, porque una discrepancia con los registros de inmigración es el motivo habitual de que una solicitud se rechace de plano. Y si tu empleador sabe que la solicitud está en trámite, algo que protege tu tasa de retención mientras esperas.

Nos encargamos de las solicitudes de TFN con una dirección verificada que recibe el correo durante todo el trámite, y confirmamos el número directamente al cliente, lo que elimina ese punto de falla para quien se muda cada pocas semanas. Trata la carta como un documento de mucho valor: nuestra guía sobre [cómo proteger tu TFN](/blog/tfn-security-protect-from-fraud) explica quién tiene derecho a pedirlo.
`,
  },
  'abn-invoicing-requirements-australia': {
    title: '¿Qué debe incluir una factura con ABN?',
    description: 'Una factura con ABN necesita tu nombre, tu ABN, la fecha, una descripción y el total. El GST solo va si estás registrado, y la mayoría no lo está.',
    body: `
Una tax invoice emitida con un [ABN](/abn) debe mostrar tu nombre, tu ABN, la fecha, la descripción del trabajo y el total a pagar. Las líneas de GST solo van si estás registrado para el GST. Si omites el ABN, quien te paga debe retener el 47 % del pago.

## ¿Qué debe contener toda factura con ABN?

Cinco datos en cualquier factura, sin importar el importe. El nombre debe ser el nombre legal registrado junto al ABN, no un nombre comercial que inventaste.

- Tu nombre, exactamente como está registrado junto al ABN
- Tu ABN
- La fecha de emisión
- Una descripción de los bienes o servicios
- El importe total a pagar

Cuando la factura llega a 75 AUD sin GST y estás registrado para el GST, hace falta más: las palabras Tax Invoice bien visibles, el importe del GST o una indicación de que el total lo incluye, y, en facturas de 1000 AUD o más, el nombre o el ABN del comprador.

## ¿Tienes que mostrar el GST?

Solo si estás registrado, y la mayoría de los working holiday makers no lo está. El registro es obligatorio cuando tu facturación supera los 75 000 AUD en un año fiscal, y la mayoría de los ingresos con ABN de un mochilero quedan muy por debajo.

Mostrar el GST sin estar registrado es un problema real: cobras un impuesto que no puedes declarar y quien te paga reclama un crédito al que no tiene derecho. El transporte de pasajeros con apps de rideshare es la excepción y exige registro desde el primer dólar, algo que explica nuestra guía sobre [GST y ABN](/blog/gst-and-abn-for-working-holiday-makers).

## ¿Qué pasa si no pones el ABN?

La regla de retención por falta de ABN obliga a una empresa que paga por bienes o servicios sin que se le indique un ABN a retener el 47 % y enviarlo a la ATO. Se aplica incluso si tienes un ABN válido y solo olvidaste ponerlo en la factura.

Lo retenido se concilia contra lo que debes cuando presentas la [tax return](/tax-return), y si hay un excedente o no depende de tu año y lo decide la ATO. Lo que cuesta es no poder disponer de ese dinero: en una factura de 2000 AUD son 940 AUD en poder de la ATO durante meses.

## ¿Por qué rechazan las facturas?

Casi nunca por reglas tributarias, casi siempre por pequeñas discrepancias que detienen en seco un sistema automático. Quien paga verifica el ABN con la herramienta pública ABN Lookup, y si el nombre registrado no coincide con el de la factura, el pago no avanza.

- Un nombre comercial en la factura cuando el ABN está registrado a tu nombre personal
- Un dígito equivocado en el ABN, con lo que falla por completo en la consulta
- Sin numeración de factura, cuando quien paga necesita una referencia única
- Una fecha escrita al estilo estadounidense en lugar de DD/MM/AAAA
- Sin datos bancarios, de modo que quien quiere pagar no puede hacerlo

## ¿Qué hace que te paguen de verdad?

Los campos correctos hacen que se acepte una factura. Los hábitos hacen que se pague. El más eficaz es facturar el día en que termina el trabajo, porque una factura tardía de alguien que ya se fue de la zona es fácil de ignorar.

- Facturar el día en que se completa el trabajo
- Indicar los plazos de pago de forma explícita, ya que siete días es lo normal para mano de obra y el silencio invita a los treinta
- Citar la orden de compra o el nombre del supervisor cuando el lugar los usa
- Reclamar por escrito el primer día de atraso, con amabilidad y con la factura adjunta otra vez
- Hacer una consulta en ABN Lookup de un pagador desconocido antes de un trabajo grande, algo que toma segundos y revela entidades dadas de baja

## ¿Qué decide si el problema es la factura o el acuerdo?

La factura es papeleo. Si deberías facturar o no es un asunto mucho mayor. Si la empresa fija tus horarios, supervisa el trabajo y aporta el equipo, eso es una relación laboral, y una factura no la cambia.

Que te pidan facturar por turnos supervisados es un contrato simulado (sham contracting), y te cuesta el 12 % de [superannuation](/superannuation), la tarifa del award, los recargos y la cobertura de workers compensation. Nuestra guía sobre [empleado frente a contratista](/blog/employee-vs-contractor-australia) explica la prueba, que conviene aplicar antes de la primera factura.

## ¿Qué debes hacer antes de salir de Australia?

Dos cosas, y ninguna es facturar. Las facturas impagas se pueden cobrar legalmente aunque ya te hayas ido, pero recuperarlas desde otro país, a la escala de un mochilero, es casi imposible, así que lo único que funciona es dar plazos cortos y reclamar rápido mientras sigues aquí.

La segunda es el ABN mismo, que debe cancelarse cuando dejas de trabajar como contratista. Si queda abierto, genera correspondencia de la ATO y obligaciones de presentación durante años. Nuestra guía sobre [cómo cancelar un ABN](/blog/how-to-cancel-your-abn) explica qué cerrar primero.
`,
  },
  'abn-deductions-business-expenses': {
    title: 'Deducciones con ABN: qué puede reclamar un contratista',
    description: 'Los ingresos con ABN abren deducciones más amplias: equipo, parte del teléfono, vehículo, seguros. La lista completa y los registros que espera la ATO.',
    body: `
Quien tiene un ABN deduce los gastos genuinos del negocio de sus ingresos antes de calcular el impuesto, que es la compensación por no haber tenido nada retenido. Las herramientas, la ropa de protección, los costos de operar el vehículo, la parte de teléfono e internet que corresponde al trabajo, las licencias y los honorarios de un agente califican. Los respaldos que se exigen son más estrictos que para un empleado, y ahí es donde fallan los reclamos.

## ¿Cuál es la prueba real para una deducción?

Que el gasto se haya hecho para generar tus ingresos con ABN y que puedas demostrarlo. La mayoría de los reclamos caen en la segunda parte.

Los reclamos se rechazan por no tener registro del costo, por no tener registro de la relación con el trabajo o por no tener una base defendible para dividir entre uso laboral y uso privado. Un gasto que sí ocurrió pero no se puede respaldar no es una deducción.

## ¿Qué puede reclamar un working holiday maker con ABN?

Qué categorías importan depende del tipo de trabajo como contratista. Un repartidor y un contratista agrícola con su propio equipo comparten poco más que el teléfono.

- Herramientas y equipo necesarios para el trabajo, como una motosierra para trabajos con árboles o la mochila de reparto de un mensajero
- Ropa de protección y equipo de seguridad: chalecos de alta visibilidad, botas con punta de acero, guantes, cascos
- Costos de operar el vehículo en viajes de trabajo: combustible, registro, seguro y mantenimiento, prorrateados según los kilómetros de trabajo
- El porcentaje de los costos de teléfono móvil e internet relacionado con el trabajo
- Licencias y certificados que el trabajo realmente exige, como un White Card o un RSA
- Comisiones bancarias y de procesamiento de pagos en una cuenta de negocio, incluidas las comisiones de las plataformas
- Honorarios por gestionar tus asuntos tributarios

Todo lo que se use tanto para trabajo como para fines privados se puede reclamar solo según el porcentaje de trabajo. Un teléfono usado un 60 % para trabajar es deducible en un 60 %, y ese 60 % no puede ser una suposición.

## ¿Qué registros exige realmente la ATO?

Un recibo o una tax invoice que muestre el proveedor, la fecha, el importe y qué se compró, por cada reclamo. Los gastos prorrateados necesitan además una base para el porcentaje: un logbook en el caso de los vehículos y un período representativo de uso en el caso del teléfono e internet.

Dos umbrales cambian lo que hace falta. Un artículo de 300 AUD o menos se deduce completo en el año de la compra, sin depreciarlo. Desde el año fiscal 2026-27 existe una deducción estándar de 1000 AUD relacionada con el trabajo sin recibos, que no vale para declaraciones 2025-26. Nuestra guía sobre [la deducción estándar de 1000 AUD](/blog/1000-dollar-instant-deduction-rule-2026) explica para quién es y cuándo conviene más detallar.

## ¿Qué no se puede reclamar, aunque lo parezca?

Varios costos parecen deducibles y no lo son, y explican la mayoría de los reclamos rechazados en este tema. El hilo común es un gasto privado que ocurre alrededor del trabajo, y no un gasto de hacer el trabajo.

- El viaje entre tu casa y un lugar de trabajo habitual, que es privado por muy temprano que empieces
- La ropa común, es decir, que no sea de protección ni un uniforme con marca
- La comida y la bebida durante la jornada, que son privadas para los contratistas igual que para los empleados
- El alojamiento en tu propia base, incluso si trabajas desde ella
- Los costos anteriores a que se registrara el ABN y empezara la actividad

Las reglas del vehículo son las que mueven más dinero y generan más malentendidos. Nuestra guía sobre [logbooks de vehículo con ABN](/blog/vehicle-logbook-abn-working-holiday) explica qué debe contener un logbook para que se acepte.

## ¿Por qué importan más las deducciones con ABN que con un sueldo?

Porque no se retuvo nada. Con un sueldo, el empleador ya descontó el impuesto, así que una deducción aumenta la devolución. Con ingresos por ABN, la factura completa llegó a tus manos y el impuesto todavía se debe, así que una deducción reduce un importe a pagar.

Eso cambia lo que está en juego, no la aritmética. Un asalariado que olvida deducciones recibe una devolución menor. Un contratista recibe una cuenta mayor, y si no apartó nada durante el año, esa cuenta llega sin dinero para pagarla.

## ¿Por qué tantos reclamos nunca se hacen?

Porque no se guardaron los registros, no porque los gastos no existieran. Trabajar como contratista agrícola con tu propio equipo, o hacer repartos con tu propio vehículo, genera costos deducibles todo el tiempo y casi no deja papeleo.

También hay una brecha de conocimiento entre los dos regímenes. Quienes trabajaron como empleados antes de pasar a un ABN arrastran las reglas de empleado, y el tratamiento del vehículo y del equipo no es el mismo.

## ¿Cuáles de estas deducciones se aplican a tu año?

Qué deducciones están disponibles, y si resisten una revisión, depende de cómo se organizó el trabajo y de qué guardaste.

- Qué tipo de trabajo como contratista fue, ya que las categorías cambian entre repartos, trabajo agrícola y oficios.
- Si guardaste los recibos sobre la marcha, que es lo que hace defendible un reclamo.
- Si existe un logbook para cualquier reclamo de vehículo, el concepto que más se rechaza.
- Si cada artículo costó más o menos de 300 AUD, lo que decide entre deducción inmediata y depreciación.
- Si la deducción estándar de 1000 AUD (desde 2026-27) aplica a tu caso y supera lo que podrías detallar.
- Si tuviste sueldos en el mismo año, ya que esa retención suele absorber el impuesto del ABN.
- Si te registraste para el GST, lo que decide si los importes se reclaman con o sin GST incluido.

La posición combinada se calcula en la [tax return de working holiday maker](/tax-return). Puedes [estimar tu devolución de impuestos](/calculator) cuando sepas cuánto sumó cada lado del año.
`,
  },
  'uber-doordash-rideshare-abn-working-holiday': {
    title: 'Uber y DoorDash: ABN, GST e impuestos',
    description: "El rideshare exige registrarse para el GST desde el primer dólar; el reparto no. Cómo configurarlo, el BAS trimestral y las deducciones.",
    body: `
El trabajo en plataformas es trabajo como contratista, no una relación laboral. Necesitas un ABN, la plataforma no retiene nada de lo que te paga y no se paga superannuation sobre esos ingresos. La regla que sorprende a la gente es la del GST: el rideshare exige registro desde el primer dólar, sin ningún umbral, mientras que el reparto de comida sigue el umbral habitual de 75 000 AUD.

## ¿Por qué el trabajo en plataformas se considera trabajo como contratista?

Porque la plataforma te paga por los trabajos completados y no por tu tiempo, y no controla tus horarios como lo haría un empleador. Uber, DoorDash, Menulog y las demás contratan a repartidores y conductores como contratistas independientes, una clasificación genuina en este caso, a diferencia del empleo encubierto que se ve en cafés y granjas.

Por eso necesitas un ABN antes de poder darte de alta, apartas por tu cuenta el dinero para el impuesto, recibes un resumen anual de la plataforma en lugar de un income statement y puedes deducir los costos de hacer el trabajo. Tampoco recibes superannuation, tarifa de award ni workers compensation.

## ¿Cuál es la regla del GST que sorprende a casi todos?

El trabajo con ABN normal solo exige registrarse para el GST cuando la facturación supera los 75 000 AUD en un año fiscal. El rideshare no sigue esa regla. Los servicios de transporte de pasajeros, que incluyen Uber, Ola, Didi y sus equivalentes, exigen registro para el GST desde la primera carrera.

El reparto de comida es distinto. Uber Eats, DoorDash y Menulog se rigen por el umbral general de 75 000 AUD, así que un repartidor que solo hace entregas normalmente no tiene obligación de GST. La distinción depende del trabajo y no de la app: si en una semana de reparto sumas viajes con pasajeros, se activa la obligación de registro del rideshare.

El registro trae una obligación de presentar un Business Activity Statement, normalmente trimestral, y se mantiene hasta que lo canceles. Un conductor que se registró y luego ignoró los statements puede enfrentar una deuda con efecto retroactivo por la parte de GST de cada carrera.

## ¿Qué puedes deducir de los ingresos de plataformas?

Todo lo que se incurrió de verdad para hacer el trabajo, y para conducir es una lista larga porque el vehículo es el negocio.

- Combustible, mantenimiento, registro, seguro y depreciación, prorrateados según los kilómetros de trabajo
- Intereses de un préstamo del vehículo, con el mismo prorrateo
- Teléfono móvil y datos para la app
- Peajes y parking durante el trabajo
- Limpieza del vehículo
- Equipo de reparto: mochila, casco, y mantenimiento y reparaciones de la bicicleta para quienes reparten
- Comisiones y cargos de servicio de la plataforma

Los costos del vehículo se pueden reclamar por cents por kilómetro o por costos reales respaldados con un logbook. El método del logbook suele dar una deducción mayor a quien conduce muchas horas, y también es el método que más falla por falta de registros. Nuestra guía sobre [logbooks de vehículo](/blog/vehicle-logbook-abn-working-holiday) explica qué debe contener uno.

## ¿La ATO ya sabe cuánto ganaste?

Sí. Las plataformas informan las ganancias anuales directamente a la ATO bajo el Sharing Economy Reporting Regime, así que la cifra de ingresos ya existe en los sistemas de la ATO antes de que presentes nada.

Eso hace que declarar de menos los ingresos de plataformas sea la omisión menos eficaz que existe. También hace más simple de lo que parece trabajar con varias apps a la vez: cada plataforma informa por separado, y una declaración que cubre tres plataformas se contrasta con tres informes.

## ¿Cómo tributa trabajar con varias apps a la vez?

Como un solo negocio, no como tres. Usar Uber Eats, DoorDash y Menulog al mismo tiempo es una única empresa de sole trader: un ABN, ingresos sumados entre las plataformas, gastos agrupados y un solo conjunto de datos de negocio en la declaración.

Los gastos no necesitan repartirse entre apps, porque la bicicleta o el vehículo sirven a la empresa y no a una plataforma concreta. Una sola hoja de cálculo con fecha, plataforma, ingresos brutos y kilómetros sostiene todo lo que viene después.

## ¿Por qué esto sale mal tan seguido a los working holiday makers?

Porque no se retiene nada y nada te avisa. Quien gana 25 000 AUD repartiendo en un año no ha tenido ningún impuesto descontado en ningún momento, y la tasa de working holiday del 15 % sobre esos ingresos igual se debe, pagadera en un solo importe al presentar la declaración.

Quien además tuvo sueldos normales suele salir mejor, porque el PAYG retenido de esos sueldos con frecuencia absorbe el impuesto de los ingresos de plataformas. Quien solo hizo trabajo en plataformas y no apartó nada recibe una cuenta.

## ¿Cómo fue tu año en las plataformas?

El trabajo en plataformas es sencillo cuando los registros están bien hechos. Lo que debes depende de cómo se compuso tu año.

- Si transportaste pasajeros o repartiste comida, lo que decide por completo la cuestión del GST.
- Si además tuviste sueldos, ya que la retención de esos sueldos con frecuencia cubre el impuesto de la plataforma.
- Si existe un logbook, que decide cuánto del costo del vehículo se puede reclamar.
- Cuánto apartaste sobre la marcha.
- Si te registraste para el GST y presentaste los activity statements que eso implica.
- Si el ABN y cualquier registro de GST se cancelaron cuando dejaste de trabajar.

La posición combinada se calcula en la [tax return de working holiday maker](/tax-return), y puedes [estimar tu devolución de impuestos](/calculator) para ver si tu año termina en una devolución o en un importe a pagar.
`,
  },
  'tax-return-without-tfn-australia': {
    title: '¿Trabajaste sin TFN? Qué hacer con el 45 %',
    description: 'Sin TFN durante el año te retuvieron el 45 %, pero puedes obtener el TFN ahora, presentar la declaración y recuperar la diferencia. Los pasos.',
    body: `
Sí puedes, y suele ser una de las declaraciones más valiosas de tu tiempo en Australia. Sin un TFN registrado, tu empleador tuvo que retener el 45 % en lugar del 15 %, y la diferencia puede volver a través de la declaración. Necesitas un TFN antes de poder presentar nada, y todavía se puede obtener después de haberte ido de Australia.

## ¿Cuánto te cuesta realmente un período sin TFN?

El 30 % de lo que ganaste, mientras duró. Con un TFN registrado se aplica la tasa de working holiday del 15 % a los primeros 45 000 AUD. Sin él, se retiene el 45 % desde el primer dólar, y en una semana de 1000 AUD son 300 AUD que quedaron retenidos y no se te pagaron.

El impuesto retenido de más se concilia al presentar la declaración, y qué parte vuelve depende de tu año y lo decide la ATO. Lo que cuesta mientras tanto es el flujo de caja, y por eso la conciliación de un año sin TFN puede ser una de las más grandes que ve un working holiday maker.

## ¿Por qué no se puede presentar sin un TFN?

Porque el TFN es el identificador que conecta con tu persona los ingresos que informó el empleador. La ATO tiene registrados los sueldos informados y el impuesto retenido, pero mientras no exista un TFN al que asociarlos, no hay una liquidación que hacer.

Por eso hay gente que da el tema por cerrado. Suponen que el impuesto desapareció porque nunca tuvieron un número. El impuesto retenido queda registrado junto al informe del empleador y pedir el TFN es lo que permite asociarlo; qué parte vuelve, si vuelve algo, depende de tu año y lo decide la ATO. La solicitud es gratuita y se puede hacer desde el extranjero con verificación de identidad.

## ¿Qué pasa con los registros si no guardaste nada?

Casi todo lo que hace falta ya existe en los sistemas de la ATO. Los empleadores informan sueldos y retenciones mediante Single Touch Payroll, y esa información es la base de la declaración, así que una caja de payslips perdidos es un problema menor de lo que parece.

El problema real es un empleador que nunca informó nada, algo que ocurre en los sectores que pagan en efectivo. Entonces hay que reconstruir los ingresos, y nuestra guía sobre [declaraciones con pagos en efectivo](/blog/cash-in-hand-tax-return) explica qué evidencia tiene peso.

## ¿Qué pasa si el año ya pasó?

Un año fiscal anterior se puede seguir presentando. Ningún año sin presentar pasa a ser incobrable solo porque haya pasado el tiempo, y los working holiday makers presentan de forma habitual por un año en el que se fueron del país.

Con el tiempo cambian dos cosas. Los registros del empleador son más difíciles de reclamar cuando la información fue irregular, y la verificación de identidad se hace más lenta desde el extranjero. Ninguna cierra la puerta, y la devolución, si la hay, no se reduce porque hayas esperado.

## ¿Qué cambia en la declaración si ya te fuiste?

La mecánica es la misma y la fricción es distinta. Una declaración se puede presentar desde cualquier lugar, pero la devolución se paga en una cuenta bancaria australiana, así que una cuenta cerrada camino al aeropuerto se convierte en el obstáculo, más que el impuesto en sí.

Una primera declaración, un TFN recién emitido y una dirección en el extranjero son la combinación con más probabilidad de provocar una revisión manual de identidad en la ATO. Eso es un retraso y no un rechazo, y los documentos coherentes lo acortan.

## ¿Qué más suele haber pendiente en un año sin TFN?

Más que la diferencia de retención, porque los años en que se trabaja sin TFN son los años en que no se configuró nada más. La superannuation es lo más común: los aportes hechos sin un TFN asociado a menudo quedan sin asignar en un fondo o en la ATO, y siguen siendo tuyos.

La exención del Medicare levy es lo otro. Quien tiene pasaporte de España, Argentina, Chile o Uruguay en general no tiene derecho a Medicare, porque esos países no tienen un convenio de salud recíproco con Australia, de modo que el levy del 2 % no debería aplicarse, pero solo se elimina si se reclama. Nada de esto aparece en ningún payslip.

## ¿Qué tan grande es tu retención de más?

Recuperarla es la parte sencilla. Su tamaño, y qué tan pronto la ves, dependen de tus propios datos.

- Cuántas semanas pasaron antes de que tu TFN llegara al empleador.
- Si el empleador informó tus ingresos mediante Single Touch Payroll.
- Si el empleador estaba registrado en la ATO como empleador de working holiday makers, ya que uno que no lo está retiene según las tasas de no residente aunque tenga un TFN registrado.
- Si sigue abierta una cuenta bancaria australiana para recibir la devolución.
- Si el super se pagó a un fondo que no pudo asociarlo contigo.
- Si hay más de un año fiscal involucrado, ya que cada uno es una declaración distinta.

La conciliación se hace como parte de la [tax return de working holiday maker](/tax-return), y puedes [estimar tu devolución de impuestos](/calculator) cuando sepas más o menos cuánto se retuvo.

## ¿A quién debes entregar tus documentos?

Quienes trabajaron sin TFN son el grupo al que más se apunta en esta audiencia, porque ya están inseguros sobre cómo funciona el sistema. Los grupos de Facebook de mochileros y las comunidades de mensajería tienen un suministro constante de personas que ofrecen resolverte los impuestos.

Nunca envíes un TFN, un pasaporte ni una notificación de visa a alguien que no pueda mostrarte un registro en el registro público de profesionales tributarios del gobierno. Un número de registro verificable es toda la prueba que necesitas.
`,
  },
}
