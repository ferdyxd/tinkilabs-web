// Artículos del Help Center
// Cada artículo tiene slug, título, categoría y contenido (HTML o texto)

export interface Articulo {
  slug: string;
  titulo: string;
  categoria: string;
  contenido: string;
}

export const articulos: Articulo[] = [
  {
    slug: 'como-empezar',
    titulo: 'Cómo empezar con Tinkilabs',
    categoria: 'Primeros pasos',
    contenido: `<p>¡Bienvenido a Tinkilabs! Esto es lo que necesitas saber para empezar:</p>
<ol><li><strong>Elige tu línea</strong> según la edad del constructor: Tinki Mini (3-5 años), Tinki Maker (6-9 años) o Tinki Pro (10-14 años).</li>
<li><strong>Selecciona la duración</strong> de tu suscripción: 3, 6 o 12 meses.</li>
<li><strong>Completa el checkout</strong> con tus datos de envío y pago.</li>
<li><strong>Recibe tu primera caja</strong> en la primera semana del mes siguiente.</li>
<li><strong>¡A construir!</strong> Sigue el manual ilustrado o mira el vídeo tutorial.</li></ol>
<p>Cada caja viene con todo lo necesario. No hacen falta herramientas.</p>`,
  },
  {
    slug: 'diferencias-lineas',
    titulo: 'Diferencias entre Tinki Mini, Maker y Pro',
    categoria: 'Primeros pasos',
    contenido: `<p>Cada línea está diseñada para una etapa de desarrollo:</p>
<ul><li><strong>Tinki Mini (3-5 años):</strong> Piezas grandes, sin partes pequeñas. Construcciones rápidas (15-20 min) con mucho color. Trabaja la motricidad gruesa y el juego simbólico.</li>
<li><strong>Tinki Maker (6-9 años):</strong> Mecanismos sencillos (engranajes, palancas, muelles). Montajes de 30-45 minutos. Introduce conceptos de física y mecánica de forma divertida.</li>
<li><strong>Tinki Pro (10-14 años):</strong> Proyectos más complejos con electrónica básica, motores y programación. Montajes de 45-90 minutos. Retos de ingeniería reales.</li></ul>
<p>Si tu peque está entre dos edades, te recomendamos elegir la línea superior: el nivel de diversión es el mismo pero el desafío es mayor.</p>`,
  },
  {
    slug: 'regalo-perfecto',
    titulo: 'Guía para hacer el regalo perfecto',
    categoria: 'Regalos',
    contenido: `<p>Un certificado de regalo de Tinkilabs es el regalo perfecto para cumpleaños, Navidad o cualquier ocasión especial. Aquí te contamos cómo funciona:</p>
<ol><li><strong>Elige la línea y duración.</strong> Si no sabes cuál, te ayudamos: Tinki Maker (6-9 años) es la más popular y gusta a casi todos los peques.</li>
<li><strong>Personaliza el mensaje.</strong> Escribe una dedicatoria que aparecerá en el email que recibe el destinatario.</li>
<li><strong>Elige la fecha de entrega.</strong> El email se enviará el día que tú elijas. Ideal para cumpleaños: prográmalo para las 00:01 de ese día.</li>
<li><strong>El destinatario activa cuando quiera.</strong> No hay prisa: el código de canje no caduca.</li></ol>
<p>El certificado incluye envío gratis y el destinatario no paga nada. Solo tiene que poner su dirección cuando active la suscripción.</p>`,
  },
  {
    slug: 'que-es-stem',
    titulo: '¿Qué es STEM y por qué importa?',
    categoria: 'Primeros pasos',
    contenido: `<p>STEM son las siglas en inglés de Science, Technology, Engineering y Mathematics (Ciencia, Tecnología, Ingeniería y Matemáticas).</p>
<p>En Tinkilabs creemos que la mejor forma de aprender STEM es construyendo cosas que funcionan de verdad. Cada caja es un proyecto de ingeniería real disfrazado de juguete alucinante.</p>
<p>Al construir nuestros kits, los peques desarrollan:</p>
<ul><li><strong>Pensamiento crítico:</strong> resolver problemas cuando algo no encaja.</li>
<li><strong>Creatividad:</strong> entender cómo funcionan las cosas para imaginar otras nuevas.</li>
<li><strong>Persistencia:</strong> intentar, fallar, arreglarlo, intentar otra vez.</li>
<li><strong>Habilidades motoras finas:</strong> manipular piezas pequeñas con precisión.</li></ul>
<p>Y lo más importante: descubren que aprender no es un rollo. Es alucinante.</p>`,
  },
  {
    slug: 'kit-no-llega',
    titulo: 'Mi kit no ha llegado. ¿Qué hago?',
    categoria: 'Envíos',
    contenido: `<p>Si tu caja no ha llegado en el plazo estimado, sigue estos pasos:</p>
<ol><li><strong>Revisa tu email</strong> (incluida la carpeta de spam). Te enviamos un email con el número de seguimiento cuando la caja salió de nuestro almacén.</li>
<li><strong>Consulta el seguimiento</strong> haciendo clic en el enlace del email. A veces el paquete está en la oficina de correos esperando a ser recogido.</li>
<li><strong>Mira en tu cuenta</strong> en tinkilabs.com/mi-cuenta. Ahí aparece el estado de todos tus envíos.</li>
<li><strong>Si sigue sin aparecer</strong>, escríbenos a hola@tinkilabs.com. Te respondemos en menos de 24h y si el paquete se ha perdido, te enviamos uno nuevo sin coste.</li></ol>`,
  },
  {
    slug: 'montaje-dificil',
    titulo: '¿El montaje es demasiado difícil?',
    categoria: 'Primeros pasos',
    contenido: `<p>A veces un proyecto puede parecer complicado. No pasa nada. Aquí van unos trucos:</p>
<ul><li><strong>Mira el vídeo tutorial.</strong> Cada kit tiene un vídeo paso a paso en YouTube. A veces verlo en movimiento es más fácil que seguir el papel.</li>
<li><strong>Ve paso a paso.</strong> No intentes montar todo de golpe. El manual está dividido en fases. Haz una pausa entre cada una.</li>
<li><strong>Revisa las piezas.</strong> Asegúrate de que tienes todas las piezas de la fase actual antes de empezar. A veces una pieza se esconde en el embalaje.</li>
<li><strong>Pide ayuda.</strong> Construir en equipo es más divertido. Padres, hermanos, abuelos... ¡todos pueden participar!</li>
<li><strong>Si algo no encaja, no fuerces.</strong> Las piezas de Tinkilabs están diseñadas para encajar suavemente. Si tienes que hacer mucha fuerza, es que algo va mal. Revisa la orientación de la pieza.</li></ul>
<p>Y si aún así no sale, escríbenos a hola@tinkilabs.com. Preferimos ayudarte a que te frustres.</p>`,
  },
];
