// Datos del FAQ — editar aquí para añadir/quitar preguntas
// Cada categoría tiene un slug, título, icono y lista de preguntas

export interface FAQItem {
  id: string;
  pregunta: string;
  respuesta: string;
}

export interface FAQCategory {
  slug: string;
  titulo: string;
  icono: string;
  preguntas: FAQItem[];
}

export const faqData: FAQCategory[] = [
  {
    slug: 'primeros-pasos',
    titulo: 'Primeros pasos',
    icono: '🚀',
    preguntas: [
      { id: 'que-incluye', pregunta: '¿Qué incluye cada caja?', respuesta: 'Cada caja Tinkilabs incluye todos los materiales necesarios para construir el proyecto del mes, un manual de instrucciones ilustrado paso a paso, y acceso a un vídeo tutorial exclusivo. No necesitas herramientas adicionales: todo viene en la caja.' },
      { id: 'primer-envio', pregunta: '¿Cuánto tarda en llegar mi primera caja?', respuesta: 'Las suscripciones se envían durante la primera semana de cada mes. Si te suscribes antes del día 25, recibirás tu primera caja en ese mismo mes. Si te suscribes después, la recibirás al mes siguiente. Los envíos tardan 3-5 días laborables en España peninsular.' },
      { id: 'como-empiezo', pregunta: '¿Cómo empiezo?', respuesta: 'Elige tu línea Tinkilabs (Mini 3-5, Maker 6-9 o Pro 10-14), selecciona la duración que prefieras y completa el checkout. Recibirás un email de confirmación y tu primera caja llegará según el calendario de envíos.' },
      { id: 'herramientas', pregunta: '¿Necesito herramientas adicionales?', respuesta: 'No. Todos nuestros kits están diseñados para construirse sin herramientas. Las piezas encajan entre sí y vienen listas para montar. Solo necesitas tus manos y ganas de construir.' },
    ],
  },
  {
    slug: 'suscripcion',
    titulo: 'Suscripción',
    icono: '📦',
    preguntas: [
      { id: 'gestionar', pregunta: '¿Cómo gestiono mi suscripción?', respuesta: 'Puedes gestionar tu suscripción desde tu área de cliente en tinkilabs.com/mi-cuenta. Ahí puedes cambiar tu dirección, pausar envíos, saltar un mes o cancelar. También puedes escribirnos a hola@tinkilabs.com.' },
      { id: 'saltar-mes', pregunta: '¿Puedo saltarme un mes?', respuesta: '¡Sí! Puedes saltarte un mes desde tu área de cliente. No se te cobrará ese mes y tu suscripción se reanudará automáticamente al mes siguiente. No hay límite de veces que puedas saltarte un mes.' },
      { id: 'cancelar', pregunta: '¿Cómo cancelo mi suscripción?', respuesta: 'Puedes cancelar tu suscripción en cualquier momento desde tu área de cliente, sin penalización. Si cancelas, recibirás todas las cajas por las que ya has pagado y no se te cobrará nada más. También puedes contactarnos en hola@tinkilabs.com y lo gestionamos por ti.' },
      { id: 'cambiar-plan', pregunta: '¿Puedo cambiar de plan?', respuesta: 'Sí. Si tu peque crece y quieres pasar de Tinki Maker a Tinki Pro, o viceversa, escríbenos a hola@tinkilabs.com y te hacemos el cambio para la siguiente caja. No tiene coste adicional.' },
      { id: 'renovacion', pregunta: '¿La suscripción se renueva automáticamente?', respuesta: 'Sí, las suscripciones se renuevan automáticamente al final del período contratado para que no te quedes sin tu caja mensual. Te avisamos por email antes de cada renovación. Puedes cancelar la renovación automática en cualquier momento desde tu cuenta.' },
    ],
  },
  {
    slug: 'envios',
    titulo: 'Envíos',
    icono: '🚚',
    preguntas: [
      { id: 'paises', pregunta: '¿A qué países enviáis?', respuesta: 'Actualmente enviamos a toda España (península, Baleares, Canarias, Ceuta y Melilla) y a países seleccionados de la Unión Europea. Consulta nuestra Política de Envíos para más detalles.' },
      { id: 'cuanto-tarda', pregunta: '¿Cuánto tardan los envíos?', respuesta: 'España peninsular: 3-5 días laborables. Baleares: 4-6 días. Canarias, Ceuta y Melilla: 5-7 días. UE: 7-12 días. Las suscripciones se envían la primera semana de cada mes.' },
      { id: 'coste-envio', pregunta: '¿Cuánto cuesta el envío?', respuesta: 'El envío es gratuito para suscripciones en España peninsular. Para el resto de destinos, los costes se calculan durante el checkout y se muestran antes de pagar. Oscilan entre 3.95€ y 9.95€ según destino.' },
      { id: 'seguimiento', pregunta: '¿Puedo seguir mi pedido?', respuesta: 'Sí, todos los envíos incluyen número de seguimiento. Te enviamos un email con el enlace en cuanto tu caja sale de nuestro almacén. También puedes ver el estado desde tu área de cliente.' },
    ],
  },
  {
    slug: 'pagos',
    titulo: 'Pagos y facturación',
    icono: '💳',
    preguntas: [
      { id: 'metodos-pago', pregunta: '¿Qué métodos de pago aceptáis?', respuesta: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express) a través de Stripe, una pasarela de pago segura. También aceptamos Apple Pay y Google Pay. No almacenamos los datos de tu tarjeta.' },
      { id: 'cuando-cobra', pregunta: '¿Cuándo se me cobra?', respuesta: 'El primer cobro se realiza en el momento de la suscripción. Los siguientes cobros se realizan alrededor del día 1 de cada mes, antes del envío de la caja. Te avisamos por email antes de cada cobro.' },
      { id: 'facturas', pregunta: '¿Puedo obtener una factura?', respuesta: 'Sí. Todas las facturas están disponibles en tu área de cliente. Si necesitas una factura con datos fiscales específicos, escríbenos a hola@tinkilabs.com y te la enviamos.' },
    ],
  },
  {
    slug: 'piezas',
    titulo: 'Piezas y repuestos',
    icono: '🔧',
    preguntas: [
      { id: 'falta-pieza', pregunta: '¿Falta una pieza en mi kit?', respuesta: '¡No pasa nada! Te enviamos la pieza que falta gratis y sin coste de envío. Escríbenos a hola@tinkilabs.com indicando tu número de pedido, la caja y qué pieza falta. Te la enviamos en 48-72 horas.' },
      { id: 'pieza-rota', pregunta: '¿Se ha roto una pieza?', respuesta: 'Si una pieza se rompe durante el montaje o el uso, te la reemplazamos gratis. Envíanos una foto a hola@tinkilabs.com y te mandamos el repuesto sin coste. Queremos que tu experiencia sea perfecta.' },
      { id: 'cuanto-tarda-repuesto', pregunta: '¿Cuánto tardan los repuestos?', respuesta: 'Los repuestos se envían en 24-48 horas desde tu solicitud y llegan en 2-4 días laborables (España peninsular). No tienen ningún coste para ti, ni la pieza ni el envío.' },
    ],
  },
  {
    slug: 'regalo',
    titulo: 'Regalos',
    icono: '🎁',
    preguntas: [
      { id: 'como-funciona-gift', pregunta: '¿Cómo funcionan los certificados de regalo?', respuesta: 'Compras un certificado de regalo eligiendo la línea y la duración. Eliges la fecha de entrega del email. En esa fecha, el destinatario recibe un email con tu mensaje personalizado y un código para canjear su suscripción. La suscripción empieza cuando el destinatario la activa.' },
      { id: 'canjear-gift', pregunta: '¿Cómo canjeo un certificado de regalo?', respuesta: 'Recibirás un email con un botón para canjear tu regalo. Haz clic, crea tu cuenta (o inicia sesión), ingresa tu dirección de envío y activa tu suscripción. Las cajas empezarán a llegar al mes siguiente.' },
      { id: 'regalar-una-caja', pregunta: '¿Puedo regalar una sola caja?', respuesta: 'De momento nuestros certificados de regalo son para suscripciones de 3, 6 o 12 meses. Si quieres regalar una caja individual, tenemos una sección de venta de cajas sueltas próximamente. ¡Pregúntanos!' },
    ],
  },
];
