// ─── Estructura de artículo ───────────────────────────────────

export interface PasoProyecto {
  numero: number;
  titulo: string;
  texto: string;
  imagenDescripcion?: string;
}

export interface ArticuloEstructurado {
  intro: string;
  pasos: PasoProyecto[];
  cienciaTitulo: string;
  cienciaTexto: string;
  soluciones: { problema: string; solucion: string }[];
  juegoTitulo: string;
  juegoTexto: string;
  cta: string;
}

// ─────────────────────────────────────────────────────────────

export type CategoriaBlog =
  | 'proyectos'
  | 'ciencia'
  | 'ingenieria'
  | 'padres'
  | 'tinkilabs';

export type LineaProducto = 'mini' | 'maker' | 'pro';
export type NivelMancha = 'limpio' | 'poco' | 'mancha';
export type TipoAyuda = 'solo' | 'adulto';

export interface BlogPost {
  slug: string;
  titulo: string;
  excerpt: string;
  contenido: string;
  categoria: CategoriaBlog;
  autor: string;
  fecha: string; // ISO date
  lecturaMin: number;
  coverEmoji: string;
  tags: string[];
  edad?: LineaProducto;
  tiempoMin?: number;
  mancha?: NivelMancha;
  ayuda?: TipoAyuda;
  materialesEmoji?: { emoji: string; texto: string }[];
  aprendeCallout?: { concepto: string; puntos: string[] };
  sabiasCallout?: { titular: string; dato: string };
  contenidoEstructurado?: ArticuloEstructurado;
}

export const CATEGORIA_LABELS: Record<CategoriaBlog, string> = {
  proyectos: 'Proyectos DIY',
  ciencia: 'Ciencia alucinante',
  ingenieria: 'Ingeniería para peques',
  padres: 'Para padres',
  tinkilabs: 'Tinkilabs',
};

const IND = '/images/inidicadores';

export const EDAD_LABELS: Record<LineaProducto, { linea: string; edad: string; img: string }> = {
  mini:   { linea: 'Tinki Mini',  edad: '3-5 años',   img: `${IND}/tinki_mini_blog_logo.png` },
  maker:  { linea: 'Tinki Maker', edad: '6-9 años',   img: `${IND}/tinki_maker1_blog_logo.png` },
  pro:    { linea: 'Tinki Pro',   edad: '8-14 años',  img: `${IND}/tinki_pro_blog_logo.png` },
};

export const TIEMPO_IMG = `${IND}/tinki_time_blog_logo.png`;

export const MANCHA_LABELS: Record<NivelMancha, { texto: string; img: string }> = {
  limpio: { texto: 'Limpio',           img: `${IND}/tinki_clean_blog_logo.png` },
  poco:   { texto: 'Un poco',          img: `${IND}/tinki_Un poco_blog_logo.png` },
  mancha: { texto: '¡Que se manche!',  img: `${IND}/tinki_messy_blog_logo.png` },
};

export const AYUDA_LABELS: Record<TipoAyuda, { texto: string; img: string }> = {
  solo:   { texto: 'En solitario',  img: `${IND}/tinki_solo_blog_logo.png` },
  adulto: { texto: 'Con un adulto', img: `${IND}/tinki_adult_blog_logo.png` },
};

export const posts: BlogPost[] = [
{
    slug: 'como-hacer-lanzador-tapones',
    titulo: 'Cómo hacer un lanzador de tapones que dispara de verdad',
    excerpt: 'Hay algo profundamente satisfactorio en construir algo que dispara. No importa la edad. Un lanzador, una catapulta, un tirachinas. El momento en qu...',
    contenido: `<p>Hay algo profundamente satisfactorio en construir algo que dispara. No importa la edad. Un lanzador, una catapulta, un tirachinas. El momento en que sueltas, el proyectil sale volando y piensas "esto lo he hecho yo".</p>
<p>Este lanzador de tapones se construye en 10 minutos con cosas que tienes por casa. Y dispara de verdad. Un tapón de botella puede volar 3, 4, hasta 5 metros si tensas bien las gomas.</p>
<p>Vamos al lío.</p>
<hr>
<h2>Materiales (todo cosas de casa)</h2>
<ul>
<li>1 pinza de tender la ropa (de madera, de las de toda la vida)</li>
<li>2 gomas elásticas</li>
<li>1 palillo de dientes</li>
<li>2 tapones de botella</li>
<li>Celo o cinta aislante</li>
<li>Tijeras</li>
</ul>
<p>¿No tienes pinza de madera? Vale una de plástico, pero la de madera aguanta mejor la tensión. ¿No tienes tapones? Vale una chapita, una moneda pequeña, o una bolita de papel de aluminio compactada.</p>
<hr>
<h2>Paso a paso</h2>
<h3>1. Fabrica el proyectil</h3>
<p>Pega los dos tapones uno contra el otro con celo, como un sándwich. La parte cóncava de cada tapón mirando hacia fuera. Esto le da peso y estabilidad en el vuelo. Un tapón solo es demasiado ligero y sale dando tumbos.</p>
<p>Déjalo secar un par de minutos mientras preparas el lanzador.</p>
<h3>2. El cuerpo del lanzador</h3>
<p>La pinza de tender es el armazón perfecto. Ya tiene un muelle incorporado (el de la propia pinza) que mantiene la boca cerrada. Eso nos viene genial para sujetar el proyectil antes de disparar.</p>
<h3>3. El mecanismo de disparo</h3>
<p>Aquí está el truco.</p>
<p>Engancha una goma elástica en la parte trasera de la pinza, justo donde se juntan las dos mitades de madera. Pasa la goma por la ranura trasera y enróllala sobre sí misma para que quede bien fijada y tensa.</p>
<p>Coge la segunda goma y átala alrededor del palillo de dientes. Luego pega el palillo con celo en la parte de DELANTE de la pinza. El palillo queda cruzado como un pestillo. La goma va desde el palillo, a lo largo de toda la pinza, hasta la parte trasera.</p>
<p>Cuando tiras del palillo hacia atrás, estiras la goma. Cuando sueltas, la goma vuelve disparada hacia delante, empujando lo que haya en la boca de la pinza.</p>
<h3>4. Carga, apunta, dispara</h3>
<p>Coloca el tapón-sándwich en la boca de la pinza. El tapón debe quedar justo delante del palillo, apoyado contra él.</p>
<p>Sujeta la pinza con una mano. Con la otra, tira del palillo hacia atrás. Notarás la resistencia de las gomas. Cuanto más tires, más energía acumulas y más lejos llega el disparo.</p>
<p>Apunta a algo que no se rompa (un vaso de plástico, una torre de rollos de papel, una pared despejada). Suelta el palillo.</p>
<p>El tapón sale disparado.</p>
<hr>
<h2>Cómo funciona (explicado para que se lo cuentes a tu hijo)</h2>
<p>Dentro de una goma elástica hay energía dormida.</p>
<p>Cuando estiras la goma, la despiertas. Esa energía se llama <strong>energía potencial elástica</strong>: la goma quiere volver a su forma original y está acumulando fuerza para hacerlo.</p>
<p>Cuando sueltas el palillo, la goma se libera de golpe. Toda esa energía acumulada se transforma en <strong>energía cinética</strong>: energía en movimiento. La goma empuja el tapón, y el tapón sale volando.</p>
<p>Es exactamente el mismo principio que un arco y una flecha. O que un muelle dentro de un juguete mecánico. Cambia la goma por un muelle de acero y tienes el mecanismo de un lanzador profesional.</p>
<hr>
<h2>Si no funciona a la primera</h2>
<ul>
<li><strong>El tapón no sale</strong>: la goma no está suficientemente tensa. Enróllala una vuelta más o usa una goma más gruesa.</li>
<li><strong>El tapón sale hacia un lado</strong>: el palillo no está bien centrado. Corrígelo y vuelve a fijarlo.</li>
<li><strong>La goma se rompe</strong>: normal. Las gomas se desgastan. Pon una nueva y esta vez no tenses tanto.</li>
</ul>
<p>Es parte del proceso. Un ingeniero prueba, rompe, ajusta y vuelve a probar. Tu hijo está haciendo ingeniería sin saberlo.</p>
<hr>
<h2>Lleva esto al siguiente nivel</h2>
<p>Una vez que domines el lanzador básico:</p>
<ul>
<li><strong>Prueba con dos gomas en paralelo</strong>. El doble de tensión = el doble de distancia.</li>
<li><strong>Cambia el proyectil</strong>. ¿Qué pasa si disparas una bola de papel? ¿Y un garbanzo? ¿Cuál llega más lejos y por qué?</li>
<li><strong>Construye una diana</strong> con vasos de plástico apilados y compite con tu hijo a ver quién los derriba primero.</li>
</ul>
<p>Mide las distancias. Apunta los resultados. Que tu hijo vea que modificar una variable (la goma, el proyectil, el ángulo) cambia el resultado. Eso es el método científico en acción, aunque él solo sepa que "mola mucho".</p>
<hr>
<h2>Esto es lo que hacemos en Tinkilabs</h2>
<p>Este lanzador de tapones usa el mismo mecanismo que el <strong>Tinki Launcher</strong>, la primera caja de nuestra suscripción mensual.</p>
<p>La diferencia: en la caja de verdad, el armazón es de madera de abedul cortada a láser, las gomas son de silicona industrial, y el proyectil es un disco de espuma que vuela 10 metros. Pero la física es idéntica. Si tu hijo construye esto con una pinza y dos gomas, cuando abra la caja de verdad ya sabrá cómo funciona.</p>
<p>Cada mes enviamos una máquina nueva. Sin pantallas, sin pilas. Construida con las manos.</p>
<p>[→ Ver qué trae la primera caja]</p>
<hr>
<p><em>¿Te ha molado? Compártelo con alguien que tenga un pequeño ingeniero en casa.</em></p>`,
    categoria: 'proyectos',
    autor: 'Tinki',
    fecha: '2026-06-02',
    lecturaMin: 4,
    coverEmoji: '🎯',
    tags: ["lanzador","gomas","física","proyectil","reciclaje"],
    edad: 'pro',
    tiempoMin: 15,
    mancha: 'poco',
    ayuda: 'solo',
  },

  {
    slug: 'como-hacer-catapulta-cuchara',
    titulo: 'Cómo hacer una catapulta con una cuchara (y que funcione)',
    excerpt: 'Una catapulta es la máquina de guerra más antigua de la humanidad. Romanos, griegos, medievales. Todos la usaron para lanzar piedras contra muralla...',
    contenido: `<p>Una catapulta es la máquina de guerra más antigua de la humanidad. Romanos, griegos, medievales. Todos la usaron para lanzar piedras contra murallas. Y tu hijo puede construir una en 15 minutos con una cuchara, un rollo de papel y tres gomas elásticas.</p>
<p>No va a tirar murallas, pero sí bolitas de papel hasta el otro lado del salón. Y de paso va a entender, sin que nadie le dé una clase, qué es una palanca.</p>
<hr>
<h2>Materiales</h2>
<ul>
<li>1 cuchara sopera (de metal, no de plástico — pesa más y lanza mejor)</li>
<li>3 gomas elásticas (mejor si son gruesas)</li>
<li>1 rollo de papel de cocina vacío</li>
<li>1 trozo de cartón de unos 15 x 10 cm</li>
<li>1 palillo de dientes</li>
<li>Celo o cinta aislante</li>
</ul>
<hr>
<h2>Paso a paso</h2>
<h3>1. Construye la base</h3>
<p>Coge el trozo de cartón. Es la plataforma. Tiene que ser lo bastante grande para que la catapulta no se vuelque al disparar.</p>
<p>Pega el rollo de papel sobre el cartón con celo generoso. El rollo va de pie, como una torre. Asegúrate de que quede firme: esta es la estructura que aguanta toda la tensión del disparo.</p>
<h3>2. Coloca el brazo lanzador</h3>
<p>Pasa el mango de la cuchara POR DENTRO del rollo. La cuchara entra desde arriba, con la parte honda (la que normalmente lleva la sopa) mirando hacia arriba. El mango asoma por la parte de abajo del rollo.</p>
<p>La cuchara debe poder bascular, como un balancín. El borde superior del rollo es el punto de apoyo.</p>
<h3>3. El sistema de tensión</h3>
<p>Este es el momento clave.</p>
<p>Engancha una goma elástica en el extremo del mango que asoma por debajo del rollo. Estira la goma hacia atrás y fíjala a la base de cartón con celo. Tiene que quedar bien tensa — si está floja, la cuchara no tendrá fuerza.</p>
<p>Añade una segunda goma igual. Y si te atreves, una tercera. Cuantas más gomas, más potencia. Pero ojo: demasiada tensión y el rollo se doblará.</p>
<h3>4. El tope de precisión</h3>
<p>Atraviesa el palillo de dientes por el rollo de papel, justo debajo del punto donde la cuchara hace palanca. Pega los extremos con celo para que no se mueva.</p>
<p>Este palillo limita el recorrido del brazo. Sin él, la cuchara se iría demasiado atrás y el lanzamiento sería impreciso. Con él, la catapulta dispara siempre igual.</p>
<h3>5. ¡Fuego!</h3>
<p>Haz una bolita de papel de aluminio o de papel normal compactado. Colócala en la cuchara. Con un dedo, tira de la cuchara hacia atrás hasta que toque el tope. Suelta.</p>
<p>La bolita sale disparada en un arco parabólico precioso.</p>
<hr>
<h2>Cómo funciona</h2>
<p>Una catapulta de cuchara es una <strong>palanca de tercera clase</strong>.</p>
<p>En una palanca tienes tres elementos: el punto de apoyo, la fuerza y la carga. En una palanca de tercera clase, la fuerza está entre el punto de apoyo y la carga:</p>
<ul>
<li><strong>Punto de apoyo</strong>: el borde del rollo de papel donde apoya la cuchara</li>
<li><strong>Fuerza</strong>: las gomas tirando del mango hacia atrás</li>
<li><strong>Carga</strong>: la bolita de papel en la punta de la cuchara</li>
</ul>
<p>Al soltar, las gomas devuelven el mango a su posición original. El brazo gira violentamente alrededor del punto de apoyo. La carga, por inercia, sale despedida.</p>
<p>Es exactamente el mismo principio que un lanzador de béisbol automático, un saque de tenis, o el brazo de una excavadora.</p>
<hr>
<h2>Solución de problemas</h2>
<ul>
<li><strong>La bolita no llega lejos</strong>: necesitas más gomas o gomas más gruesas. También prueba con una bolita más ligera.</li>
<li><strong>La catapulta se vuelca al disparar</strong>: la base de cartón es demasiado pequeña. Hazla más grande o pega unas monedas debajo como contrapeso.</li>
<li><strong>La cuchara se desvía hacia un lado</strong>: el mango no está bien centrado dentro del rollo. Mete un trocito de cartón doblado para rellenar el hueco.</li>
</ul>
<hr>
<h2>Conviértelo en un juego</h2>
<p>Pon un vaso a 1 metro de distancia. Que cada jugador dispare 5 bolitas. Un punto por cada una que entre en el vaso.</p>
<p>Luego aleja el vaso a 2 metros. ¿Cuántas gomas necesitas ahora? ¿Cambia el ángulo de lanzamiento?</p>
<p>Que tu hijo experimente. Que pruebe con más gomas, con menos. Con proyectiles más pesados o más ligeros. Que descubra él solo qué combinación funciona mejor. Eso vale más que 10 clases de física.</p>
<hr>
<h2>Esto es lo que hacemos en Tinkilabs</h2>
<p>Esta catapulta de cuchara es la prima casera de la <strong>Tinki Catapulta</strong>, una de las cajas de nuestra suscripción mensual. En la versión de verdad, el brazo es de madera de abedul, las gomas son de silicona de alta resistencia, y el tablero tiene puntuación. Pero la física —la palanca, la tensión, la parábola— es exactamente la misma.</p>
<p>Cada mes enviamos un mecanismo nuevo para construir con las manos. Sin pantallas. Sin pilas. Madera de verdad.</p>
<p>[→ Descubre la Tinki Catapulta]</p>
<hr>
<p><em>¿Le ha molado a tu hijo? Pásaselo a otro padre que necesite un plan para el finde.</em></p>`,
    categoria: 'proyectos',
    autor: 'Tinki',
    fecha: '2026-06-02',
    lecturaMin: 4,
    coverEmoji: '🏗️',
    tags: ["catapulta","palancas","física","proyectil","reciclaje"],
    edad: 'pro',
    tiempoMin: 15,
    mancha: 'poco',
    ayuda: 'solo',
  },

  {
    slug: 'como-hacer-coche-goma-elastica',
    titulo: 'Cómo hacer un coche que anda solo (sin pilas, sin motor)',
    excerpt: 'Un coche que se mueve solo. Sin pilas. Sin motor eléctrico. Sin mandos. Solo con la energía almacenada en una goma elástica retorcida.',
    contenido: `<p>Un coche que se mueve solo. Sin pilas. Sin motor eléctrico. Sin mandos. Solo con la energía almacenada en una goma elástica retorcida.</p>
<p>Esto no es un truco de magia. Es física de la buena. La misma que usaban los aviones de goma de los hermanos Wright y la misma que impulsa algunos juguetes mecánicos clásicos. Y tu hijo puede construir uno en 15 minutos con cosas del reciclaje.</p>
<hr>
<h2>Materiales</h2>
<ul>
<li>1 rollo de papel higiénico vacío (el chasis)</li>
<li>1 goma elástica larga y gruesa (el motor)</li>
<li>1 lápiz o palillo grueso</li>
<li>2 tapones de botella o de brick de leche (ruedas traseras)</li>
<li>1 canica, moneda de 1 euro o chapita (rueda delantera de giro libre)</li>
<li>Celo o cinta aislante</li>
<li>Algo puntiagudo para hacer agujeros (un punzón, un destornillador fino, o la punta de unas tijeras)</li>
</ul>
<hr>
<h2>Paso a paso</h2>
<h3>1. Prepara el chasis</h3>
<p>El rollo de papel es el cuerpo del coche. Con el punzón o la punta de las tijeras, haz dos agujeros pequeños a cada lado del rollo, a 1 cm del borde trasero. Los agujeros deben estar alineados: son por donde pasará el eje trasero.</p>
<p>Haz otro agujero en el centro de cada agujero, enfrentados. Que el lápiz o palillo pueda girar libremente dentro.</p>
<h3>2. El motor de goma</h3>
<p>Pasa la goma elástica por dentro del rollo, de un extremo a otro.</p>
<p>Por la parte delantera del coche, sujeta la goma para que no se escape hacia dentro. La forma más fácil: atraviesa un trocito de palillo en el extremo de la goma, en la boca del rollo, y pégalo con celo. La goma queda anclada en la parte delantera, tensa hacia fuera.</p>
<p>Por la parte trasera, la goma cuelga libre. Esa es la que vamos a conectar al eje motor.</p>
<h3>3. El eje trasero (el que transmite la fuerza)</h3>
<p>Pasa el lápiz o palillo por los agujeros traseros. Debe girar libremente.</p>
<p>Engancha el extremo libre de la goma al lápiz. Enrolla un par de vueltas y fíjalo con celo. La goma queda conectada al eje: cuando el eje gira en un sentido, retuerce la goma. Cuando la goma se destuerce, hace girar el eje.</p>
<h3>4. Las ruedas</h3>
<p>Pega un tapón en cada extremo del lápiz con celo o pegamento. Importante: los tapones deben girar SOLIDARIOS con el eje. Si el eje gira y las ruedas no, tienes que fijarlas mejor.</p>
<p>En la parte delantera, pega la canica o moneda debajo del rollo. Esta es la rueda libre. No transmite potencia, solo permite que el coche gire y se desplace suavemente.</p>
<h3>5. Carga y suelta</h3>
<p>Gira las ruedas traseras hacia atrás con la mano. Con cada vuelta, la goma se va retorciendo dentro del rollo. Haz 20, 30, 40 vueltas. Notarás cada vez más resistencia: es la energía acumulándose.</p>
<p>Pon el coche en el suelo. Suelta.</p>
<p>El coche avanza solo.</p>
<hr>
<h2>Cómo funciona</h2>
<p>Has construido un <strong>motor de torsión</strong>.</p>
<p>Al girar las ruedas hacia atrás, retuerces la goma elástica sobre sí misma. Una goma retorcida acumula <strong>energía potencial torsional</strong>: quiere desenrollarse, volver a su estado natural. Esa energía está ahí, dormida, esperando.</p>
<p>Cuando sueltas el coche en el suelo, la goma se destuerce. El giro se transmite al eje. El eje gira las ruedas. Las ruedas empujan contra el suelo. Por el principio de acción-reacción (tercera ley de Newton), el suelo empuja el coche hacia delante.</p>
<p>Es el mismo ciclo que un coche de gasolina pero sin explosiones ni emisiones: energía acumulada → liberación → movimiento.</p>
<hr>
<h2>Solución de problemas</h2>
<ul>
<li><strong>El coche no avanza</strong>: las ruedas patinan. El suelo está demasiado liso. Pruébalo en una alfombra fina o en el parqué.</li>
<li><strong>Avanza 10 cm y se para</strong>: necesitas más vueltas de carga. Prueba con 50 en lugar de 20. También verifica que el eje gire libre, sin rozar demasiado contra el cartón.</li>
<li><strong>Se va de lado</strong>: las ruedas no están alineadas. Una está más adelantada que la otra. Recolócalas.</li>
<li><strong>La goma se rompe</strong>: has dado demasiadas vueltas. Cambia la goma y esta vez carga con 30 vueltas máximo.</li>
</ul>
<hr>
<h2>Carreras de coches de goma</h2>
<p>Construye dos coches con tu hijo y haced una carrera en el pasillo.</p>
<p>Luego cambia una variable:</p>
<ul>
<li>¿Qué pasa si usas ruedas más grandes (tapones de leche) o más pequeñas (chapas)?</li>
<li>¿Qué pasa si das 20 vueltas de carga en lugar de 40?</li>
<li>¿Qué coche llega más lejos? ¿Cuál es más rápido?</li>
</ul>
<p>Que apunte los resultados. Que prediga qué va a pasar ANTES de probarlo. Eso es formular una hipótesis. Y eso es ciencia de verdad, aunque él solo sepa que "está jugando a carreras con su coche reciclado".</p>
<hr>
<h2>Esto es lo que hacemos en Tinkilabs</h2>
<p>Este coche de goma es el precursor del <strong>Tinki Robot</strong>, una de nuestras cajas mensuales. En el Tinki Robot, en lugar de una goma elástica usas un pequeño motor eléctrico con engranajes reductores. Pero el principio es el mismo: algo almacena energía y la convierte en movimiento.</p>
<p>Cada mes mandamos una máquina nueva para construir. Madera de abedul. Sin pantallas. Sin pilas (casi nunca). Funciona de verdad.</p>
<p>[→ Ver todas las máquinas]</p>
<hr>
<p><em>Este artículo es para compartir. Si conoces a alguien con un pequeño constructor en casa, pásaselo.</em></p>`,
    categoria: 'proyectos',
    autor: 'Tinki',
    fecha: '2026-06-02',
    lecturaMin: 4,
    coverEmoji: '🚗',
    tags: ["coche","gomas","torsión","energía","reciclaje"],
    edad: 'maker',
    tiempoMin: 30,
    mancha: 'poco',
    ayuda: 'solo',
  },

  {
    slug: 'como-hacer-peonza-carton',
    titulo: 'Cómo hacer una peonza que gira 30 segundos (con cartón y un palillo)',
    excerpt: 'Hay pocas cosas más hipnóticas que una peonza girando. Ese momento en que se mantiene de pie, desafiando la gravedad, como si el suelo no existiera...',
    contenido: `<p>Hay pocas cosas más hipnóticas que una peonza girando. Ese momento en que se mantiene de pie, desafiando la gravedad, como si el suelo no existiera. No es magia. Es física. Y construir una peonza que aguante 30 segundos sin caerse es uno de los proyectos más rápidos y satisfactorios que puedes hacer con tu hijo.</p>
<p>Cartón, un palillo y una moneda. Nada más.</p>
<hr>
<h2>Materiales</h2>
<ul>
<li>Cartón fino (el de una caja de cereales va perfecto)</li>
<li>1 palillo de dientes</li>
<li>1 moneda de 1 céntimo (o arandela pequeña)</li>
<li>Pegamento</li>
<li>Tijeras</li>
<li>Algo redondo para dibujar (un vaso, un rollo de celo)</li>
<li>Rotuladores de colores (opcional, pero quedan preciosos)</li>
</ul>
<hr>
<h2>Paso a paso</h2>
<h3>1. Dibuja y recorta el disco</h3>
<p>Pon el vaso boca abajo sobre el cartón. Repasa el borde con un lápiz. Recorta el círculo con cuidado. Cuanto más redondo quede, mejor girará la peonza.</p>
<p>Un disco de 6-8 cm de diámetro es el punto dulce: lo bastante grande para ser estable, lo bastante pequeño para girar rápido.</p>
<h3>2. El agujero central</h3>
<p>Haz un agujero diminuto justo en el centro del círculo. Si tienes compás, la marca del centro te sirve de guía. Si no: dobla el círculo por la mitad dos veces formando un cuarto. La esquina del pliegue es el centro.</p>
<p>El agujero debe ser justo para que pase el palillo, sin holgura. Si baila, la peonza vibrará y se caerá mucho antes.</p>
<h3>3. El secreto: el peso bajo</h3>
<p>Pega la moneda o arandela en el centro del disco, alrededor del agujero. Que el agujero quede libre para pasar el palillo.</p>
<p>Esto <strong>baja el centro de gravedad</strong> de la peonza. Es la diferencia entre una peonza que aguanta 5 segundos y una que aguanta 30. No te saltes este paso.</p>
<h3>4. Montaje final</h3>
<p>Pasa el palillo por el agujero. Debe sobresalir 1 cm por abajo (la punta donde apoya todo el peso) y 2-3 cm por arriba (el mango para hacerla girar).</p>
<p>Pon una gota de pegamento justo donde el palillo toca el cartón, por ambos lados. Deja secar 5 minutos.</p>
<h3>5. La punta</h3>
<p>La punta inferior del palillo es crítica. Redondéala un poco con una lija de uñas o frotándola contra una superficie áspera. Una punta redondeada gira más suave y más tiempo que una punta plana o astillada.</p>
<h3>6. Decora (esto es importante)</h3>
<p>Pinta el disco con rotuladores de colores. Haz espirales, sectores de colores, puntos. Cuando la peonza gire, los colores se mezclarán creando patrones nuevos que no existen en el disco quieto. Esto se llama <strong>persistencia retiniana</strong> y es lo mismo que hace que veas movimiento en una pantalla.</p>
<h3>7. ¡A girar!</h3>
<p>Sujeta el palillo superior entre los dedos índice y pulgar. Gira como si chasquearas los dedos. Suelta la peonza sobre una superficie lisa (mesa, suelo de parqué).</p>
<p>Mira cuánto aguanta.</p>
<hr>
<h2>Cómo funciona</h2>
<p>Una peonza se mantiene de pie gracias al <strong>efecto giroscópico</strong>.</p>
<p>Cuando un objeto gira rápido alrededor de un eje, tiende a conservar ese eje de rotación. Se resiste a cualquier fuerza que intente tumbarlo. Es como si la rotación creara un escudo invisible contra la gravedad.</p>
<p>La Tierra hace lo mismo. Gira sobre su eje a 1.670 km/h y por eso no se tambalea (bueno, y porque no hay nada que la empuje).</p>
<p>El centro de gravedad bajo (la moneda) hace que sea más difícil desequilibrar la peonza. Piensa en un coche de Fórmula 1: van pegados al suelo para bajar el centro de gravedad. Tu peonza hace lo mismo.</p>
<hr>
<h2>El experimento de las 3 peonzas</h2>
<p>Construye 3 peonzas con discos de distinto diámetro:</p>
<ul>
<li>Pequeña (4 cm)</li>
<li>Mediana (6 cm)</li>
<li>Grande (10 cm)</li>
</ul>
<p>Hazlas girar a la vez. ¿Cuál aguanta más? ¿Cuál gira más rápido?</p>
<p>La pequeña gira más rápido pero es más inestable. La grande gira más lenta pero es más difícil de tumbar. La mediana es la más equilibrada.</p>
<p>Ya tienes a tu hijo haciendo física experimental sin soltar el móvil.</p>
<hr>
<h2>Esto es lo que hacemos en Tinkilabs</h2>
<p>Esta peonza de cartón es la antesala de las <strong>Tinki Peonzas</strong>, una de nuestras cajas mensuales. En la versión de verdad, los discos son de madera de abedul intercambiables: cambias el disco en la misma base y observas cómo cambia el comportamiento. Misma física, distinta forma. Distinta diversión.</p>
<p>Cada mes llega una máquina nueva a casa. Para construirla con las manos. Sin pantalla. Sin pilas.</p>
<p>[→ Ver la colección completa]</p>
<hr>
<p><em>¿Tu hijo ha construido una peonza que aguanta más de 30 segundos? Súbela con #TinkiChallenge y presúmela.</em></p>`,
    categoria: 'proyectos',
    autor: 'Tinki',
    fecha: '2026-06-02',
    lecturaMin: 4,
    coverEmoji: '🌀',
    tags: ["peonza","giroscopio","rotación","física","cartón"],
    edad: 'maker',
    tiempoMin: 20,
    mancha: 'limpio',
    ayuda: 'solo',
  },

  {
    slug: 'como-hacer-garra-pajitas',
    titulo: 'Cómo hacer una garra atrapa-todo con pajitas y cartón',
    excerpt: 'Tus dedos son una máquina. Literalmente.',
    contenido: `<p>Tus dedos son una máquina. Literalmente.</p>
<p>Tienes 27 huesos, 34 músculos y un sistema de tendones que recorre todo el antebrazo. Cuando cierras la mano para coger un vaso, los músculos del antebrazo tiran de unos cables (los tendones) que pasan por poleas naturales (las articulaciones) y doblan los dedos.</p>
<p>Vas a construir una réplica de ese sistema con cartón, pajitas y cuerda. Una garra de 3 dedos que se cierra al tirar de un hilo y atrapa objetos sin usar las manos.</p>
<hr>
<h2>Materiales</h2>
<ul>
<li>Cartón fino (caja de cereales o similar)</li>
<li>3 pajitas de beber</li>
<li>1 metro de cuerda fina, hilo de coser resistente o hilo de pescar</li>
<li>3 palillos de dientes</li>
<li>1 trozo de cartón grueso para el mango (unos 15 x 3 cm)</li>
<li>Celo o cinta aislante</li>
<li>Tijeras</li>
</ul>
<hr>
<h2>Paso a paso</h2>
<h3>1. Fabrica los dedos</h3>
<p>Recorta 3 tiras de cartón de 10 cm de largo x 1 cm de ancho. Son los tres dedos de tu garra.</p>
<p>Cada tira debe poder doblarse sin romperse. Marca un pliegue suave (sin cortar) a 3 cm de la punta, doblando el cartón hacia dentro. Esa será la "falange" del dedo, la parte que se dobla al atrapar.</p>
<h3>2. Las poleas</h3>
<p>Corta 3 trocitos de pajita de 2 cm cada uno. Pega cada trocito de pajita con celo en el centro de cada tira de cartón, justo en la línea del pliegue.</p>
<p>La pajita hace de polea: un tubo por donde la cuerda se desliza sin fricción. Sin polea, la cuerda rozaría contra el cartón y el dedo no se movería con suavidad.</p>
<h3>3. Los tendones</h3>
<p>Corta 3 trozos de cuerda de 30 cm cada uno. Pasa cada cuerda por dentro de su pajita correspondiente. La cuerda entra por la base de la tira (la parte que irá pegada al mango), atraviesa la pajita-polea, y se fija con celo en la punta del dedo.</p>
<p>Cuando tires de la cuerda desde la base, el dedo se doblará hacia dentro. Exactamente como tu dedo índice cuando agarras algo.</p>
<h3>4. Monta la mano</h3>
<p>Pega los 3 dedos en un extremo del cartón grueso que hace de mango. Colócalos abiertos en abanico, como los dedos de una mano separados. Las puntas deben curvarse ligeramente hacia dentro, como una mano que va a coger algo.</p>
<p>Los 3 cabos de cuerda cuelgan hacia atrás a lo largo del mango.</p>
<h3>5. El sistema de tracción</h3>
<p>Junta los 3 cabos de cuerda. Átalos firmemente a una cuerda maestra de unos 40 cm.</p>
<p>Pega una pajita larga a lo largo del mango (o dos trocitos de pajita alineados). Pasa la cuerda maestra por dentro de esta pajita-guía. Esto mantiene la tensión en línea recta y evita que la cuerda se enganche.</p>
<h3>6. El gatillo</h3>
<p>En el extremo libre de la cuerda maestra, ata un palillo o una anilla de cartón. Metes el dedo índice en la anilla, tiras hacia atrás y los 3 dedos se cierran a la vez.</p>
<p>Suelta la anilla y los dedos se abren solos: la tensión natural del cartón los devuelve a la posición de reposo.</p>
<h3>7. Atrapa algo</h3>
<p>Acércate a un objeto pequeño: un tapón, una goma, una bolita de papel. Tira de la anilla. Los dedos se cierran y atrapan el objeto. Suelta la anilla para liberarlo.</p>
<hr>
<h2>Cómo funciona</h2>
<p>Acabas de construir un <strong>sistema de tendones</strong>.</p>
<p>En tu cuerpo, los tendones conectan los músculos con los huesos. Cuando el cerebro ordena "agarra ese vaso", los músculos del antebrazo se contraen. Esa contracción tira de los tendones. Los tendones pasan por túneles naturales en las articulaciones (las poleas). Y los dedos se doblan.</p>
<p>En tu garra de cartón:</p>
<ul>
<li><strong>Músculo</strong> = tu mano tirando de la anilla</li>
<li><strong>Tendón</strong> = la cuerda maestra + los 3 cabos</li>
<li><strong>Polea</strong> = las pajitas en los pliegues</li>
<li><strong>Hueso</strong> = las tiras de cartón</li>
<li><strong>Articulación</strong> = el pliegue a 3 cm de la punta</li>
</ul>
<p>Mismo principio. Distintos materiales.</p>
<hr>
<h2>Solución de problemas</h2>
<ul>
<li><strong>Los dedos no se doblan</strong>: la cuerda está demasiado suelta. Acorta el recorrido.</li>
<li><strong>Los dedos se doblan hacia fuera en lugar de hacia dentro</strong>: el pliegue está marcado al revés. Dale la vuelta al cartón.</li>
<li><strong>Se atasca al soltar</strong>: la cuerda roza en alguna parte. Revisa que pase limpiamente por todas las pajitas.</li>
<li><strong>Un dedo se cierra antes que los otros</strong>: la tensión no está igualada. Ajusta la longitud de ese cabo para que los 3 se muevan a la vez.</li>
</ul>
<hr>
<h2>El desafío de la garra</h2>
<p>Intenta esto con tu hijo (cada uno con su garra):</p>
<ol>
<li>Coger un palillo del suelo</li>
<li>Coger una goma elástica (más difícil: es blanda y resbala)</li>
<li>Coger un vaso de plástico vacío (más difícil aún: es voluminoso)</li>
<li>Coger un vaso con agua (MUCHO más difícil: pesa y se derrama)</li>
</ol>
<p>¿Qué falla cuando intentas coger algo pesado? ¿Los dedos no tienen fuerza suficiente? ¿La cuerda se desliza? ¿La base se dobla?</p>
<p>Identificar el punto débil y mejorarlo. Eso es lo que hace un ingeniero.</p>
<hr>
<h2>Esto es lo que hacemos en Tinkilabs</h2>
<p>Esta garra de cartón es la versión casera de la <strong>Tinki Garra</strong>, una de nuestras cajas mensuales. En la versión de verdad, los dedos son de madera de abedul articulada con muelles de retorno. Los tendones son de hilo de alta resistencia. Y el gatillo tiene un bloqueo para mantener la presa sin esfuerzo.</p>
<p>Pero el principio —los tendones tirando de los dedos— es el mismo que acabas de construir con pajitas y cartón.</p>
<p>Cada mes llega una máquina nueva. Construida por ti. Que funciona de verdad.</p>
<p>[→ Ver cómo funciona la Tinki Garra]</p>
<hr>
<p><em>Comparte este artículo con un padre o madre que necesite un plan de sábado por la mañana.</em></p>`,
    categoria: 'proyectos',
    autor: 'Tinki',
    fecha: '2026-06-02',
    lecturaMin: 5,
    coverEmoji: '🦾',
    tags: ["garra","tendones","biomecánica","cartón","mecanismo"],
    edad: 'pro',
    tiempoMin: 30,
    mancha: 'poco',
    ayuda: 'solo',
  },

  {
    slug: 'lanzador-discos-engranajes',
    titulo: 'Cómo construir un lanzador de discos con tren de engranajes',
    excerpt: '¿Preparado para lanzar discos a toda velocidad? Construye un lanzador con engranajes reales y un muelle de compresión que funciona de verdad.',
    contenido: `<p>¿Te imaginas construir una máquina que lance discos de madera por toda la habitación? Pues deja de imaginar y ponte a construir. Hoy te enseñamos cómo hacer un lanzador de discos con un tren de engranajes real y un muelle de compresión.</p>

<h2>¿Qué vas a aprender?</h2>
<p>Este proyecto es una clase magistral de ingeniería mecánica disfrazada de juguete. Al construirlo vas a entender:</p>
<ul>
<li>Cómo funcionan los engranajes y la relación de transmisión</li>
<li>Qué es la energía potencial elástica (la que almacena un muelle)</li>
<li>Cómo se convierte la energía del muelle en velocidad de salida</li>
<li>Por qué los discos giran al salir disparados</li>
</ul>

<h2>Materiales</h2>
<p>Necesitas madera contrachapada de 3 mm, un muelle de compresión, tornillos M3, gomas elásticas y unos cuantos discos de madera. Si no tienes madera contrachapada, el cartón grueso también funciona para un primer prototipo.</p>

<h2>Paso a paso</h2>
<ol>
<li><strong>Monta el chasis principal</strong> con las piezas de madera encajando las pestañas. Que quede sólido: va a recibir golpes.</li>
<li><strong>Ensambla el tren de engranajes:</strong> un piñón grande conectado a uno pequeño. El grande mueve al pequeño, que gira más rápido.</li>
<li><strong>Coloca el muelle de compresión</strong> en el cargador. Este es el corazón del lanzador: acumula energía cuando comprimes.</li>
<li><strong>Fija el gatillo</strong> con un tornillo M3 y una goma elástica para que vuelva a su sitio solo.</li>
<li><strong>Carga un disco, apunta hacia arriba</strong> (nunca a personas, nunca a la cara) y ¡dispara!</li>
</ol>

<h2>La física detrás del disparo</h2>
<p>Cuando comprimes el muelle, estás almacenando energía potencial elástica. Al soltar el gatillo, esa energía se libera de golpe y empuja el disco hacia adelante. Es el mismo principio que usa una catapulta o un ballesta, pero en miniatura.</p>

<p>Los engranajes no participan directamente en el disparo: su función es transmitir el movimiento del gatillo al mecanismo de liberación. El grande gira despacio pero con mucha fuerza, el pequeño gira rápido. Juntos forman lo que los ingenieros llaman un "tren de engranajes".</p>

<h2>¿Qué puedes modificar?</h2>
<p>Una vez que tengas el lanzador funcionando, prueba a cambiar cosas:</p>
<ul>
<li>¿Qué pasa si usas un muelle más largo o más corto?</li>
<li>¿Y si cambias la relación de engranajes (3:1 en vez de 2:1)?</li>
<li>¿Aguantaría discos más pesados?</li>
<li>¿Puedes añadir un cargador para disparar varios discos seguidos?</li>
</ul>

<p>Eso es ingeniería de verdad: construir, probar, romper, arreglar, mejorar. El lanzador perfecto no existe: existe el que tú diseñas.</p>`,
    categoria: 'proyectos',
    autor: 'Tinki',
    fecha: '2026-05-15',
    lecturaMin: 6,
    coverEmoji: '🛞',
    tags: ['engranajes', 'muelles', 'madera', 'lanzador'],
    edad: 'pro',
    tiempoMin: 60,
    mancha: 'poco',
    ayuda: 'adulto',
  },
  {
    slug: 'volcan-casero-bicarbonato',
    titulo: 'Volcán de bicarbonato: la ciencia que mancha (y mola)',
    excerpt: 'El clásico que nunca falla. Mezcla bicarbonato y vinagre para crear una erupción volcánica espumosa que deja a todos con la boca abierta.',
    contenido: `<p>Hay experimentos que nunca pasan de moda. El volcán de bicarbonato es uno de ellos. Es el proyecto perfecto para una tarde de fin de semana: se monta en 15 minutos, la erupción dura lo justo para gritar "¡guau!" y mancha lo suficiente para que sea memorable.</p>

<h2>La reacción química</h2>
<p>El bicarbonato de sodio (NaHCO₃) y el vinagre (ácido acético diluido) reaccionan para producir dióxido de carbono (CO₂), agua y acetato de sodio. El gas CO₂ es el que forma las burbujas y hace que la mezcla suba como espuma.</p>

<p>En cristiano: juntas dos cosas que tienes en la cocina y sale una erupción de espuma que parece lava.</p>

<h2>Materiales</h2>
<ul>
<li>Bicarbonato de sodio (el del armario de la cocina)</li>
<li>Vinagre blanco (el de la ensalada)</li>
<li>Colorante rojo (opcional pero muy recomendable)</li>
<li>Una botella de plástico pequeña</li>
<li>Plastilina o arcilla para el volcán</li>
<li>Una bandeja para recoger el desastre</li>
</ul>

<h2>Construcción</h2>
<ol>
<li>Coloca la botella en el centro de la bandeja</li>
<li>Moldea la plastilina alrededor para darle forma de volcán</li>
<li>Echa 3 cucharadas de bicarbonato dentro de la botella</li>
<li>Añade unas gotas de colorante rojo</li>
<li>Vierte el vinagre y aléjate un paso</li>
<li>¡ERUPCIÓN!</li>
</ol>

<h2>Trucos para la máxima espectacularidad</h2>
<ul>
<li>Usa vinagre templado: la reacción es más rápida con calor</li>
<li>Añade un chorrito de lavavajillas: hace más espuma y más densa</li>
<li>Haz el volcán grande: una botella de 33 cl da para una buena erupción</li>
<li>Ten bicarbonato de reserva: puedes repetir la erupción varias veces</li>
</ul>

<p>Y recuerda: pon periódicos debajo de la bandeja. Esto mancha. Pero manchar mola.</p>`,
    categoria: 'ciencia',
    autor: 'Tinki',
    fecha: '2026-05-20',
    lecturaMin: 4,
    coverEmoji: '🌋',
    tags: ['química', 'bicarbonato', 'reacción', 'experimento clásico'],
    edad: 'maker',
    tiempoMin: 15,
    mancha: 'mancha',
    ayuda: 'adulto',
  },
  {
    slug: 'por-que-stem-sin-pantallas',
    titulo: 'Por qué STEM sin pantallas es el mejor regalo que puedes hacerle a tu hijo',
    excerpt: 'En un mundo donde los niños pasan 4 horas al día frente a pantallas, construir cosas con las manos es un acto de rebeldía. Y de amor.',
    contenido: `<p>Los niños españoles pasan una media de 4 horas al día frente a pantallas. Tablets, móviles, consolas, tele. Y no es que las pantallas sean malas per se — es que están ocupando el espacio que antes ocupaban las manos, las herramientas y la imaginación.</p>

<h2>El problema no es la pantalla. Es lo que desplaza.</h2>
<p>Cada hora que un niño pasa deslizando el dedo por una pantalla es una hora que no pasa:</p>
<ul>
<li>Doblado, pegado, cortado, atornillado</li>
<li>Intentando que algo encaje y fallando</li>
<li>Entendiendo por qué falló</li>
<li>Arreglándolo y sintiendo ese subidón de "¡funciona!"</li>
</ul>

<p>STEM (Science, Technology, Engineering, Mathematics) se ha convertido en una palabra de moda. Pero el STEM de verdad no está en una app educativa ni en un juego de programación. Está en construir una catapulta con palitos de helado y ver cómo vuela un malvavisco.</p>

<h2>Tres razones por las que el STEM físico gana al digital</h2>

<h3>1. Las manos aprenden cosas que los ojos no</h3>
<p>La motricidad fina — manipular piezas pequeñas, encajar, atornillar — desarrolla conexiones neuronales que ninguna pantalla puede estimular. Esos circuitos cerebrales son los mismos que luego se usan para escribir, dibujar o tocar un instrumento.</p>

<h3>2. El fracaso duele (y eso es bueno)</h3>
<p>En una app, cuando fallas, tocas "reintentar". En el mundo real, cuando tu puente de papel se derrumba, tienes que entender por qué, arreglarlo y volver a intentarlo. Ese ciclo — intentar, fallar, entender, arreglar — es literalmente el método científico.</p>

<h3>3. Construir juntos crea recuerdos</h3>
<p>¿Recuerdas la tarde que te pasaste jugando a un juego de móvil? Probablemente no. ¿Recuerdas la tarde que construiste algo con tu padre o tu madre? Exacto.</p>

<h2>Qué estamos haciendo en Tinkilabs</h2>
<p>Nuestras cajas no traen pantalla, no traen app, no traen código QR obligatorio. Traen piezas de madera, tornillos, muelles, gomas y un manual ilustrado. El vídeo tutorial está en YouTube por si hace falta, pero el 90% del tiempo no hace falta.</p>

<p>Cada caja es un proyecto de ingeniería real. Con mecanismos que funcionan de verdad. No es un simulador: es un lanzador que lanza, un engranaje que gira, un circuito que se enciende.</p>

<p>En Tinkilabs creemos que la mejor forma de preparar a un niño para el futuro no es darle más pantallas. Es darle herramientas, piezas y la confianza de que puede construir lo que imagine.</p>`,
    categoria: 'padres',
    autor: 'Tinki',
    fecha: '2026-05-25',
    lecturaMin: 5,
    coverEmoji: '🔧',
    tags: ['STEM', 'pantallas', 'educación', 'motricidad', 'filosofía'],
  },
  {
    slug: 'catapulta-palanca-palitos',
    titulo: 'Catapulta de sobremesa: física de palancas con palitos de helado',
    excerpt: 'La física de las palancas explicada con una batalla de malvaviscos. Construye una catapulta de precisión en 10 minutos.',
    contenido: `<p>¿Quieres entender cómo funciona una palanca? Construye una catapulta. ¿Quieres entender de verdad? Dispara malvaviscos con ella hasta que no quede ninguno.</p>

<h2>El principio de la palanca</h2>
<p>Arquímedes dijo: "Dadme un punto de apoyo y moveré el mundo". No tenía palitos de helado, pero el principio es el mismo. Una palanca es una barra que gira alrededor de un punto de apoyo (fulcro). La fuerza que aplicas en un extremo se multiplica en el otro.</p>

<p>Hay tres tipos de palancas, y nuestra catapulta usa la de tercer género: el fulcro está en un extremo, la carga en el otro, y tú aplicas fuerza en el medio. Es la misma que usa tu brazo (codo = fulcro, mano = carga, bíceps = fuerza).</p>

<h2>Materiales</h2>
<ul>
<li>8 palitos de helado</li>
<li>4 gomas elásticas</li>
<li>1 cuchara de plástico</li>
<li>Proyectiles: malvaviscos, bolitas de papel o pompones</li>
</ul>

<h2>Construcción paso a paso</h2>
<ol>
<li><strong>La base:</strong> apila 6 palitos y átalos fuerte por ambos extremos con gomas. Esto será el chasis.</li>
<li><strong>El brazo:</strong> toma los 2 palitos restantes y átalos por un solo extremo con una goma.</li>
<li><strong>Ensamblaje:</strong> abre los 2 palitos como una pinza e introduce la pila de 6 en el centro.</li>
<li><strong>La cuchara:</strong> fíjala al palito superior con una goma. La cuchara mira hacia arriba.</li>
<li><strong>Carga y dispara:</strong> coloca un malvavisco en la cuchara, tensa hacia abajo y suelta.</li>
</ol>

<h2>La física del tiro perfecto</h2>
<p>La goma elástica almacena energía potencial elástica cuando la estiras. Al soltar, esa energía se convierte en energía cinética del proyectil. La trayectoria es una parábola (gracias, Galileo).</p>

<p>Tres factores determinan el alcance:</p>
<ul>
<li><strong>Ángulo de salida:</strong> 45° es el óptimo teórico para máximo alcance</li>
<li><strong>Tensión de la goma:</strong> más tensión = más energía = más distancia</li>
<li><strong>Masa del proyectil:</strong> más ligero llega más lejos, pero el viento le afecta más</li>
</ul>

<h2>Experimentos para después</h2>
<ul>
<li>¿Cuál es el alcance máximo? Mide y bate tu propio récord</li>
<li>¿Qué proyectil vuela más lejos: malvavisco, pompón o bola de papel?</li>
<li>Prueba con 2 gomas en vez de 1. ¿El doble de distancia?</li>
<li>Construye una diana con puntuaciones y juega por turnos</li>
</ul>`,
    categoria: 'proyectos',
    autor: 'Tinki',
    fecha: '2026-05-28',
    lecturaMin: 5,
    coverEmoji: '🏗️',
    tags: ['palancas', 'catapulta', 'física', 'proyectil'],
    edad: 'maker',
    tiempoMin: 10,
    mancha: 'poco',
    ayuda: 'solo',
  },
  {
    slug: 'engranajes-explicados-para-ninos',
    titulo: 'Engranajes explicados para niños (y para adultos que nunca lo pillaron)',
    excerpt: 'Los engranajes son la máquina simple más alucinante. Giras uno y todos los demás giran encadenados. Aquí te contamos por qué.',
    contenido: `<p>Un engranaje es una rueda con dientes. Dos engranajes juntos son magia: giras uno y el otro gira en dirección contraria. Si son de distinto tamaño, giran a distinta velocidad. Así de simple. Y así de potente.</p>

<h2>La relación de transmisión</h2>
<p>Imagina un engranaje grande (40 dientes) conectado a uno pequeño (10 dientes). Cuando el grande da una vuelta completa, el pequeño da 4 vueltas. La relación es 4:1.</p>

<p>Esto significa que el pequeño gira 4 veces más rápido. Pero hay un truco: el pequeño tiene 4 veces menos fuerza. En ingeniería esto se llama "relación de transmisión" y es la base de:</p>
<ul>
<li>La caja de cambios de un coche</li>
<li>El molinillo de café</li>
<li>Las agujas del reloj (horas, minutos, segundos)</li>
<li>La batidora de la cocina</li>
<li>Básicamente cualquier cosa que gire</li>
</ul>

<h2>El truco para entenderlos en 30 segundos</h2>
<p>Coge dos monedas de distinto tamaño. Ponlas juntas de canto. Gira una. La otra gira en dirección contraria. Ya está: eso es un engranaje.</p>

<p>Ahora añade dientes imaginarios para que no resbalen. Si la grande tiene el doble de dientes, girará a la mitad de velocidad. Fin de la lección.</p>

<h2>Cómo construir tu propio panel de engranajes</h2>
<p>No necesitas piezas caras. Cartón, chinchetas y un lápiz bastan:</p>
<ol>
<li>Dibuja 4 círculos dentados de distinto tamaño en cartón</li>
<li>Recórtalos (los dientes no tienen que ser perfectos)</li>
<li>Fíjalos a un panel con chinchetas (deben poder girar)</li>
<li>Colócalos de forma que los dientes se toquen</li>
<li>Gira el más grande y observa</li>
</ol>

<h2>El momento "¡ajá!"</h2>
<p>Cuando un niño gira el engranaje grande y ve que el pequeño se vuelve loco girando rápido, algo hace clic en su cabeza. No necesita que le expliques la fórmula de la relación de transmisión. Lo ha visto con sus ojos y lo ha sentido con sus manos.</p>

<p>Ese momento — cuando la teoría se convierte en experiencia — es exactamente por lo que existe Tinkilabs.</p>`,
    categoria: 'ingenieria',
    autor: 'Tinki',
    fecha: '2026-06-01',
    lecturaMin: 4,
    coverEmoji: '⚙️',
    tags: ['engranajes', 'mecánica', 'transmisión', 'física'],
    edad: 'maker',
    tiempoMin: 20,
    mancha: 'limpio',
    ayuda: 'solo',
  },
  {
    slug: 'que-buscamos-en-un-kit',
    titulo: 'Qué buscamos al diseñar un kit: las 5 reglas de Tinki',
    excerpt: 'No todo vale. Para que un proyecto entre en una caja de Tinkilabs tiene que pasar 5 pruebas. Aquí te las contamos.',
    contenido: `<p>Diseñar un kit no es juntar cuatro piezas en una caja. Es encontrar el punto exacto donde la dificultad y la diversión se tocan. Donde el "no puedo" se convierte en "¡mira lo que he hecho!".</p>

<p>Estas son las 5 reglas que usamos para decidir si un proyecto merece llevar el sello de Tinki.</p>

<h2>Regla 1: Tiene que funcionar de verdad</h2>
<p>Nada de "simuladores" ni "experiencias interactivas". Si el kit es un lanzador, los discos vuelan. Si es un circuito, la luz se enciende. Si es un engranaje, gira y transmite movimiento.</p>

<p>Un niño de 8 años sabe perfectamente cuándo algo es de mentira. Y en el momento en que lo detecta, pierde el interés. Nuestros kits funcionan de verdad porque el subidón de "¡lo he construido yo y funciona!" es insustituible.</p>

<h2>Regla 2: El "pico de dificultad" tiene que estar en el sitio correcto</h2>
<p>Demasiado fácil: aburrimiento. Demasiado difícil: frustración. El punto dulce está en que el niño piense "esto no va a salir" justo antes de que salga.</p>

<p>Probamos cada kit con niños reales. Si 8 de cada 10 lo terminan sin ayuda de un adulto, la dificultad es correcta. Si necesitan ayuda, también está bien — construir juntos es el plan B que en realidad es plan A.</p>

<h2>Regla 3: Piezas bonitas, no piezas baratas</h2>
<p>La madera contrachapada de abedul cuesta más que el plástico inyectado. Pero huele mejor, se siente mejor al tacto, y cuando encaja hace un "clic" satisfactorio que el plástico no tiene.</p>

<p>Invertimos en materiales que den gusto tocar. Un kit de Tinkilabs no es un juguete de usar y tirar: es un objeto que te da pena tirar después de montarlo.</p>

<h2>Regla 4: El manual importa tanto como las piezas</h2>
<p>Un buen manual no explica: guía. No dice "introduce la pieza A en la ranura B": dibuja la pieza A, la ranura B y una flecha gorda que no deja lugar a dudas.</p>

<p>Nuestros manuales usan ilustraciones paso a paso con el mínimo texto posible. Un niño de 6 años no quiere leer un párrafo: quiere ver un dibujo y copiarlo.</p>

<h2>Regla 5: Tiene que molar</h2>
<p>Esta es la más importante y la más difícil de definir. Un kit mola cuando al terminarlo quieres enseñárselo a alguien. Cuando llamas a tu madre a la habitación para decirle "mira". Cuando al día siguiente lo desmontas y lo vuelves a montar.</p>

<p>No tenemos fórmula para esto. Pero sabemos reconocerlo cuando lo vemos.</p>`,
    categoria: 'tinkilabs',
    autor: 'Tinki',
    fecha: '2026-06-02',
    lecturaMin: 5,
    coverEmoji: '📦',
    tags: ['diseño', 'filosofía', 'kit', 'Tinkilabs'],
  },
  {
    slug: 'cohete-globo-newton',
    titulo: 'Cohete propulsado por globo: la tercera ley de Newton en tu salón',
    excerpt: 'Tensa un hilo, infla un globo, pégalo a una pajita y suéltalo. Acabas de demostrar la tercera ley de Newton sin mancharte.',
    contenido: `<p>La tercera ley de Newton dice que a toda acción le corresponde una reacción igual y en sentido contrario. Suena complicado. En realidad significa: si empujas algo hacia atrás, tú sales disparado hacia adelante.</p>

<p>Es el principio que usan los cohetes espaciales. Y también un globo pegado a una pajita.</p>

<h2>Materiales (4 cosas)</h2>
<ul>
<li>Hilo de coser o hilo de pescar (2-3 metros)</li>
<li>Una pajita</li>
<li>Un globo</li>
<li>Celo</li>
</ul>

<h2>Montaje en 3 pasos</h2>
<ol>
<li><strong>Tensa el hilo</strong> entre dos puntos (silla a pomo de puerta) como un teleférico</li>
<li><strong>Ensarta la pajita</strong> en el hilo antes de atar el segundo extremo</li>
<li><strong>Infla el globo</strong> (sin anudar), pégalo a la pajita con celo, sujeta la boquilla y... ¡suelta!</li>
</ol>

<h2>Qué está pasando</h2>
<p>El aire dentro del globo está a presión. Cuando sueltas la boquilla, el aire escapa hacia atrás. Por la tercera ley de Newton, el globo (y la pajita) reciben una fuerza igual hacia adelante.</p>

<p>Es exactamente el mismo principio que un cohete SpaceX, con la diferencia de que el cohete quema combustible para generar el gas a presión y tu globo usa tus pulmones.</p>

<h2>Variables para experimentar</h2>
<ul>
<li><strong>Tamaño del globo:</strong> más aire = más empuje = más distancia. ¿Es lineal la relación?</li>
<li><strong>Inclinación del hilo:</strong> ¿qué pasa si el hilo va cuesta arriba?</li>
<li><strong>Forma del globo:</strong> ¿los alargados van más rápido que los redondos?</li>
<li><strong>Peso añadido:</strong> pega una moneda al globo. ¿Cuánto peso puede arrastrar?</li>
</ul>

<h2>Para nota</h2>
<p>Si quieres impresionar, di esto en la cena: "Hoy he construido un sistema de propulsión a reacción con mi hijo usando un globo y una pajita". Técnicamente correcto. Y suena increíble.</p>`,
    categoria: 'ciencia',
    autor: 'Tinki',
    fecha: '2026-05-12',
    lecturaMin: 3,
    coverEmoji: '🚀',
    tags: ['Newton', 'física', 'cohete', 'propulsión'],
    edad: 'maker',
    tiempoMin: 10,
    mancha: 'limpio',
    ayuda: 'solo',
  },
  {
    slug: 'tinkilabs-nace-para-llenar-un-vacio',
    titulo: 'Tinkilabs nace para llenar un vacío: no hay cajas STEM en España',
    excerpt: 'En EE.UU. hay CrunchLabs y KiwiCo. En España no hay nada parecido. Nosotros vamos a cambiar eso.',
    contenido: `<p>En Estados Unidos, millones de niños reciben cada mes una caja con un proyecto de ingeniería. CrunchLabs (la de Mark Rober) tiene más de 500.000 suscriptores. KiwiCo lleva repartidos más de 50 millones de kits.</p>

<p>En España: cero. No existe nadie haciendo esto en español, para niños españoles, con envíos desde España.</p>

<h2>El océano azul</h2>
<p>Llamamos "océano azul" a un mercado sin competencia directa. No hay que luchar contra nadie por los clientes porque el producto simplemente no existe en el mercado español.</p>

<p>Hay kits de ciencia en jugueterías. Hay canales de YouTube de experimentos. Pero no hay una suscripción mensual de cajas STEM con proyectos de ingeniería reales, diseñados para que un niño los monte solo, con materiales de calidad y en español.</p>

<h2>¿Por qué ahora?</h2>
<p>Tres razones:</p>
<ol>
<li><strong>Los padres españoles ya conocen el concepto de suscripción:</strong> Netflix, Spotify, Amazon Prime. Recibir algo cada mes no es raro.</li>
<li><strong>La pandemia dejó claro que hacen falta actividades sin pantalla:</strong> los niños se pegaron a las tablets y muchos padres siguen buscando alternativas.</li>
<li><strong>El STEM ya no es una moda:</strong> es una necesidad. Los trabajos del futuro son técnicos y la mejor preparación es jugar con mecanismos reales desde pequeño.</li>
</ol>

<h2>Qué nos hace diferentes</h2>
<p>No somos una empresa de juguetes. Somos ingenieros, diseñadores y makers que creemos que la mejor forma de aprender es construir. Nuestras cajas no traen plástico barato ni instrucciones que tratan al niño como si fuera tonto.</p>

<p>Tinkilabs es para niños que quieren entender cómo funcionan las cosas. Que desmontan sus juguetes. Que preguntan "¿por qué?" 40 veces al día. Esos niños no necesitan más pantallas. Necesitan herramientas.</p>

<p>Y nosotros vamos a dárselas. Una caja al mes.</p>`,
    categoria: 'tinkilabs',
    autor: 'Tinki',
    fecha: '2026-05-10',
    lecturaMin: 4,
    coverEmoji: '🚀',
    tags: ['Tinkilabs', 'origen', 'STEM', 'España'],
  },

  // ═══════════════════════════════════════════════════════════════
  // NUEVOS: adaptados de KiwiCo
  // ═══════════════════════════════════════════════════════════════

  {
    slug: 'aerodeslizador-globo-cd',
    titulo: 'Cómo hacer un aerodeslizador con un CD viejo y un globo',
    excerpt: 'Un CD que no usas, un globo de cumpleaños y un tapón de botella. En 15 minutos tienes un vehículo que flota sobre la mesa como por arte de magia.',
    contenido: `<p>Un CD viejo que ya no suena. Un globo de los que sobran de la última fiesta. Un tapón de botella de agua. Con eso, y 15 minutos, tu hijo va a construir un aerodeslizador que flota de verdad sobre la mesa.</p>
<p>No es magia. Es física. Y es alucinante.</p>

<hr>

<h2>Materiales (todo cosas de casa)</h2>
<ul>
<li>1 CD o DVD viejo (de los que ya no funcionan)</li>
<li>1 globo (de cumpleaños, cuanto más grande mejor)</li>
<li>1 tapón de botella de agua de las que se abren tirando hacia arriba</li>
<li>Pistola de silicona caliente (esto lo hace un adulto)</li>
<li>Opcional: una canica pequeña para darle más peso al centro</li>
</ul>
<p>¿No tienes silicona caliente? Puedes probar con pegamento fuerte tipo Super Glue, pero la silicona caliente sella mejor y evita fugas de aire. Este es el único paso donde necesitas ayudar.</p>

<hr>

<h2>Paso a paso</h2>

<h3>Paso 1: Prepara el tapón</h3>
<p>Abre el tapón de la botella (tirando de la boquilla hacia arriba). Con la pistola de silicona caliente, un adulto pega la base del tapón en el centro del CD. El agujero del tapón debe quedar alineado con el agujero del CD.</p>
<p><strong>Clave:</strong> la silicona debe cubrir todo el borde del tapón, sin dejar huecos. Si se escapa aire por algún lado, el hovercraft no flota. Un cordón continuo de silicona alrededor de toda la base.</p>

<h3>Paso 2: Deja secar</h3>
<p>Espera 5 minutos a que la silicona esté completamente dura. Mientras, infla y desinfla el globo un par de veces para estirarlo. Un globo recién estirado se acopla mejor al tapón.</p>

<h3>Paso 3: Coloca el globo</h3>
<p>Estira la boca del globo sobre el tapón. El globo queda sentado sobre el CD, con la boca bien ajustada alrededor del tapón.</p>

<h3>Paso 4: Infla por debajo</h3>
<p>Dale la vuelta al CD. Verás el agujero del tapón en el centro. Sopla por ahí para inflar el globo. Cuando esté bien hinchado, cierra la boquilla del tapón rápidamente (empujándola hacia abajo).</p>
<p>Si te cuesta inflarlo así, hazlo al revés: quita el globo, ciérralo con los dedos tras inflarlo, y estira la boca sobre el tapón con el globo ya lleno. Luego abre la boquilla al ponerlo en la mesa.</p>

<h3>Paso 5: ¡A volar!</h3>
<p>Coloca el hovercraft sobre una mesa lisa (cristal, madera pulida, mármol de la cocina). Abre la boquilla del tapón. El aire empieza a escapar del globo, atraviesa el tapón y sale por debajo del CD, creando un colchón de aire.</p>
<p>Dale un empujoncito con el dedo. Mira cómo se desliza. No se para.</p>

<hr>

<div class="not-prose my-10 rounded-xl border border-blue-200 bg-blue-50 p-5 sm:p-6 lg:hidden">
<div class="flex items-center gap-2 mb-3">
<span class="text-xl">💡</span>
<span class="text-base font-bold text-blue-800">¿Sabías que...?</span>
</div>
<p class="text-[15px] leading-relaxed text-blue-900/80 mb-0">El primer aerodeslizador real lo inventó Christopher Cockerell en 1956. Para probarlo usó dos latas de café, un secador de pelo y unas balanzas de cocina. El primer vuelo de prueba fue sobre el césped de su jardín. Hoy los aerodeslizadores militares transportan tanques de 60 toneladas flotando sobre un colchón de aire. Tu hijo acaba de reproducir el mismo experimento de Cockerell con un CD y un globo.</p>
</div>

<hr>

<h2>Cómo funciona (para que se lo cuentes a tu hijo)</h2>
<p>Cuando apoyas un CD en la mesa y lo empujas, roza. Ese roce se llama <strong>fricción</strong>: dos superficies que se tocan y se frenan mutuamente. Como cuando arrastras los pies por la alfombra y luego tocas a alguien (calambre incluido).</p>
<p>Pero si metes una capa de aire entre el CD y la mesa, desaparece la fricción. El CD ya no toca la mesa. Flota sobre un colchón de aire microscópico. Como un disco de air hockey. Como un aerodeslizador de verdad en el mar.</p>
<p>El aire que sale del globo empuja hacia abajo, levanta el CD y elimina el contacto. Por eso se desliza tan suave y tan lejos con un simple empujón.</p>

<hr>

<div class="not-prose my-10 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6 lg:hidden">
<div class="flex items-center gap-2 mb-3">
<span class="text-xl">🧠</span>
<span class="text-base font-bold text-amber-800">¿Qué aprendes?</span>
</div>
<p class="text-[15px] leading-relaxed text-amber-900/80 mb-0">Tu hijo acaba de entender tres conceptos de física sin que nadie le haya dado una clase:</p>
<ul class="mt-2 space-y-1 text-[15px] leading-relaxed text-amber-900/80" style="list-style-type: disc; padding-left: 1.5rem;">
<li><strong>Fricción:</strong> la fuerza que frena dos superficies cuando se tocan.</li>
<li><strong>Colchón de aire:</strong> una capa de aire a presión que separa dos superficies y elimina la fricción.</li>
<li><strong>Principio de Bernoulli:</strong> el aire al moverse más rápido genera menos presión, creando sustentación.</li>
</ul>
<p class="text-[15px] leading-relaxed text-amber-900/80 mt-2 mb-0">Lo ha aprendido con las manos. Que es como se aprende de verdad.</p>
</div>

<hr>

<h2>Solución de problemas</h2>
<ul>
<li><strong>No flota:</strong> hay una fuga de aire. Revisa que la silicona selle completamente alrededor del tapón. Si oyes un silbido, ahí está la fuga.</li>
<li><strong>Flota pero se para enseguida:</strong> el globo es demasiado pequeño o no lo has inflado lo suficiente. Prueba con un globo más grande.</li>
<li><strong>Se va de lado:</strong> el tapón no está centrado en el CD. Quita la silicona, vuelve a pegarlo bien centrado y prueba otra vez.</li>
<li><strong>No avanza:</strong> la superficie es demasiado rugosa (mantel, madera sin pulir). Necesitas una superficie lisa: cristal, espejo, mármol, parqué.</li>
</ul>

<hr>

<h2>Carreras de hovercrafts</h2>
<p>Construye dos hovercrafts con tu hijo. Poned una pajita en el suelo como línea de salida. A la de tres, empujáis los dos a la vez.</p>
<p>Luego cambia variables:</p>
<ul>
<li>¿Qué pasa si inflas más el globo? ¿Llega más lejos?</li>
<li>¿Y si le pegas una canica al centro del CD para darle más peso?</li>
<li>¿En qué superficie se desliza mejor: la mesa de la cocina, el suelo de parqué o el cristal de la mesa del salón?</li>
</ul>
<p>Que tu hijo prediga qué va a pasar ANTES de probarlo. Que apunte resultados. Eso es una hipótesis científica, aunque él solo sepa que "está jugando a carreras de CDs voladores".</p>

<hr>

<h2>Esto es lo que hacemos en Tinkilabs</h2>
<p>Este aerodeslizador de CD es la versión casera de los mecanismos que enviamos cada mes en nuestras cajas. En Tinkilabs construyes máquinas de verdad con madera de abedul: lanzadores, engranajes, catapultas. Sin pantallas. Sin pilas.</p>
<p>Si tu hijo alucina haciendo flotar un CD con un globo, imagina lo que va a sentir cuando construya un lanzador de discos con tren de engranajes real.</p>
<p>[→ Ver qué trae la primera caja]</p>

<hr>

<p><em>¿Te ha molado? Compártelo con otro padre o madre que necesite un plan para el finde.</em></p>`,
    categoria: 'proyectos',
    autor: 'Tinki',
    fecha: '2026-06-04',
    lecturaMin: 5,
    coverEmoji: '💿',
    tags: ['aerodeslizador', 'fricción', 'aire', 'globo', 'reciclaje'],
    edad: 'maker',
    tiempoMin: 15,
    mancha: 'poco',
    ayuda: 'adulto',
    materialesEmoji: [
      { emoji: '🎈', texto: '1 globo (de cumpleaños, grande)' },
      { emoji: '💿', texto: '1 CD o DVD viejo' },
      { emoji: '🧴', texto: '1 tapón de botella de agua (de las que se abren tirando)' },
      { emoji: '🔫', texto: 'Pistola de silicona caliente' },
      { emoji: '🪙', texto: '1 canica pequeña (opcional)' },
    ],
    aprendeCallout: {
      concepto: 'Tu hijo ha entendido tres conceptos de física sin que nadie le haya dado una clase:',
      puntos: [
        'Fricción: la fuerza que frena dos superficies cuando se tocan',
        'Colchón de aire: una capa de aire que elimina la fricción',
        'Principio de Bernoulli: el aire rápido genera sustentación',
      ],
    },
    sabiasCallout: {
      dato: 'El primer aerodeslizador lo inventó Christopher Cockerell en 1956. Para probarlo usó dos latas de café, un secador de pelo y unas balanzas de cocina. Hoy los aerodeslizadores militares transportan tanques de 60 toneladas.',
    },
    contenidoEstructurado: {
      intro: '<p>Un CD viejo que ya no suena. Un globo de los que sobran de la última fiesta. Un tapón de botella de agua. Con eso, y 15 minutos, tu hijo va a construir un aerodeslizador que flota de verdad sobre la mesa.</p><p>No es magia. Es física. Y es alucinante.</p>',
      pasos: [
        { numero: 1, titulo: 'Prepara el tapón', texto: 'Abre el tapón de la botella (tirando de la boquilla hacia arriba). Con la pistola de silicona caliente, un adulto pega la base del tapón en el centro del CD. El agujero del tapón debe quedar alineado con el agujero del CD. La silicona debe cubrir todo el borde del tapón, sin dejar huecos. Si se escapa aire por algún lado, el hovercraft no flota.', imagenDescripcion: 'Tapón de botella pegado con silicona al centro del CD. Primer plano.' },
        { numero: 2, titulo: 'Deja secar', texto: 'Espera 5 minutos a que la silicona esté completamente dura. Mientras, infla y desinfla el globo un par de veces para estirarlo. Un globo recién estirado se acopla mejor al tapón.', imagenDescripcion: 'CD con tapón pegado y globo al lado, listos para el montaje.' },
        { numero: 3, titulo: 'Coloca el globo', texto: 'Estira la boca del globo sobre el tapón. El globo queda sentado sobre el CD, con la boca bien ajustada alrededor del tapón. Asegúrate de que entra firme: la unión entre el globo y el tapón es por donde sale todo el aire que levanta el hovercraft.', imagenDescripcion: 'Globo colocado sobre el tapón del CD. El globo está sin inflar.' },
        { numero: 4, titulo: 'Infla por debajo', texto: 'Dale la vuelta al CD. Verás el agujero del tapón en el centro. Sopla por ahí para inflar el globo. Cuando esté bien hinchado, cierra la boquilla del tapón rápidamente. Si te cuesta inflarlo así, quita el globo, ciérralo con los dedos tras inflarlo, y estira la boca sobre el tapón con el globo ya lleno.', imagenDescripcion: 'CD visto desde abajo, con el globo inflado visible a través del agujero.' },
        { numero: 5, titulo: '¡A volar!', texto: 'Coloca el hovercraft sobre una mesa lisa (cristal, madera pulida, mármol de la cocina). Abre la boquilla del tapón. El aire empieza a escapar del globo, atraviesa el tapón y sale por debajo del CD, creando un colchón de aire. Dale un empujoncito con el dedo. Mira cómo se desliza. No se para.', imagenDescripcion: 'Hovercraft deslizándose sobre una mesa lisa. Barrido de movimiento.' },
      ],
      cienciaTitulo: 'Cómo funciona (para que se lo cuentes a tu hijo)',
      cienciaTexto: '<p>Cuando apoyas un CD en la mesa y lo empujas, roza. Ese roce se llama <strong>fricción</strong>: dos superficies que se tocan y se frenan mutuamente. Como cuando arrastras los pies por la alfombra.</p><p>Pero si metes una capa de aire entre el CD y la mesa, desaparece la fricción. El CD ya no toca la mesa. Flota sobre un colchón de aire microscópico. Como un disco de air hockey. Como un aerodeslizador de verdad en el mar.</p><p>El aire que sale del globo empuja hacia abajo, levanta el CD y elimina el contacto. Por eso se desliza tan suave y tan lejos con un simple empujón.</p>',
      soluciones: [
        { problema: 'No flota', solucion: 'hay una fuga de aire. Revisa que la silicona selle completamente alrededor del tapón. Si oyes un silbido, ahí está la fuga.' },
        { problema: 'Flota pero se para enseguida', solucion: 'el globo es demasiado pequeño o no lo has inflado lo suficiente. Prueba con un globo más grande.' },
        { problema: 'Se va de lado', solucion: 'el tapón no está centrado en el CD. Quita la silicona, vuelve a pegarlo bien centrado.' },
        { problema: 'No avanza', solucion: 'la superficie es demasiado rugosa. Necesitas una superficie lisa: cristal, espejo, mármol, parqué.' },
      ],
      juegoTitulo: 'Carreras de hovercrafts',
      juegoTexto: '<p>Construye dos hovercrafts con tu hijo. Poned una pajita en el suelo como línea de salida. A la de tres, empujáis los dos a la vez.</p><p>Luego cambia variables: ¿qué pasa si inflas más el globo? ¿Y si le pegas una canica al centro del CD? ¿En qué superficie se desliza mejor?</p><p>Que tu hijo prediga qué va a pasar ANTES de probarlo. Eso es una hipótesis científica, aunque él solo sepa que "está jugando a carreras de CDs voladores".</p>',
      cta: '<p>Este aerodeslizador de CD es la versión casera de los mecanismos que enviamos cada mes en nuestras cajas. En Tinkilabs construyes máquinas de verdad con madera de abedul: lanzadores, engranajes, catapultas. Sin pantallas. Sin pilas.</p><p>Si tu hijo alucina haciendo flotar un CD con un globo, imagina lo que va a sentir cuando construya un lanzador de discos con tren de engranajes real.</p><p>[→ Ver qué trae la primera caja]</p>',
    },
  },

  {
    slug: 'helicoptero-goma-elastica',
    titulo: 'Cómo hacer un helicóptero de goma elástica que vuela de verdad',
    excerpt: 'Un palito, un par de tiras de cartón y una goma elástica. Giras, sueltas y el helicóptero sube volando por encima de tu cabeza. Sin pilas, sin motor.',
    contenido: `<p>Un helicóptero que vuela de verdad. Construido con un palito, dos tiras de cartón y una goma elástica. Sin pilas. Sin motor eléctrico. Solo la energía que almacenas en tus manos al retorcer una goma.</p>
<p>Esto no es un juguete de feria. Es ingeniería aeronáutica de la buena. La misma física que mantiene un helicóptero real en el aire, metida en un proyecto de 45 minutos que puedes construir en la mesa del salón.</p>

<hr>

<h2>Materiales</h2>
<ul>
<li>1 palito de brocheta de madera (de los de pincho moruno)</li>
<li>2 tiras de cartón fino de 12 cm (caja de cereales va perfecta)</li>
<li>2 clips grandes (de los de oficina, para hacer los ganchos)</li>
<li>1 goma elástica gruesa y larga (el "motor")</li>
<li>1 cuenta de collar o abalorio (para que gire sin rozar)</li>
<li>Cinta aislante</li>
<li>Pistola de silicona caliente (ayuda un adulto)</li>
</ul>
<p>El cartón de caja de cereales es perfecto porque es ligero y rígido a la vez. Las hélices tienen que ser ligeras para que la goma pueda hacerlas girar rápido.</p>

<hr>

<h2>Paso a paso</h2>

<h3>Paso 1: Fabrica las hélices</h3>
<p>Corta dos tiras de cartón de 12 cm de largo x 2 cm de ancho. Redondea las esquinas con las tijeras.</p>
<p>Desdobla los dos clips hasta que tengas dos alambres rectos. En un extremo de cada alambre, dobla la punta formando un pequeño gancho (donde enganchará la goma después).</p>
<p>Pega cada tira de cartón a un clip con silicona caliente. Importante: cada tira debe quedar ligeramente inclinada, como las aspas de un ventilador. Una inclinada hacia un lado, la otra hacia el lado contrario. Esto hace que ambas empujen aire hacia abajo aunque giren en direcciones opuestas.</p>

<h3>Paso 2: Prepara el soporte</h3>
<p>Ensarta la cuenta de collar en el palito de brocheta. Deslízala hasta la mitad. Esta cuenta es el cojinete: separa el palito de la hélice inferior y reduce la fricción.</p>
<p>Corta dos trocitos de pajita de 1 cm (si tienes) y colócalos a cada lado de la cuenta. No son obligatorios pero ayudan a que gire más suave.</p>

<h3>Paso 3: Monta los ejes</h3>
<p>Inserta un clip (con su hélice de cartón) en cada extremo del palito. El clip de abajo atraviesa la cuenta y se dobla por detrás para que no se salga. El clip de arriba atraviesa el palito directamente.</p>
<p>Cada clip debe poder girar libremente. Si roza, agranda un poco el agujero del cartón o ajusta la posición.</p>

<h3>Paso 4: El motor de goma</h3>
<p>Engancha la goma elástica entre los dos ganchos de los clips. La goma va desde el gancho del clip superior hasta el gancho del clip inferior, pasando por fuera del palito (no por dentro).</p>
<p>La goma debe quedar recta pero no tensa. Si está demasiado tensa sin haberla girado, es demasiado corta. Prueba con una más larga o junta dos gomas con un nudito.</p>

<h3>Paso 5: Carga y despega</h3>
<p>Sujeta la hélice de abajo con una mano. Con la otra, gira la hélice de arriba en sentido antihorario. Dale 40, 50, 60 vueltas. Notarás cómo la goma se va retorciendo y ofrece más resistencia. Estás almacenando energía.</p>
<p>Sujeta el helicóptero por el palito (sin tocar las hélices). Suelta las dos hélices a la vez. La goma se destuerce, las hélices giran como locas, y el helicóptero... sube.</p>
<p>Vuela de verdad.</p>

<hr>

<div class="not-prose my-10 rounded-xl border border-blue-200 bg-blue-50 p-5 sm:p-6 lg:hidden">
<div class="flex items-center gap-2 mb-3">
<span class="text-xl">💡</span>
<span class="text-base font-bold text-blue-800">¿Sabías que...?</span>
</div>
<p class="text-[15px] leading-relaxed text-blue-900/80 mb-0">El primer helicóptero de juguete con goma elástica lo inventó Alphonse Pénaud en 1870. <strong>Tenía 13 años.</strong> Su juguete volaba 15 metros con una goma retorcida y dos hélices de papel. Los hermanos Wright dijeron que ese helicóptero de goma fue lo que les enganchó a la aeronáutica cuando eran niños. Sin el juguete de Pénaud, quizá no existirían los aviones. Tu hijo está a una goma elástica de distancia de los hermanos Wright.</p>
</div>

<hr>

<h2>Cómo funciona</h2>
<p>Acabas de construir una máquina que transforma <strong>energía elástica</strong> en <strong>sustentación aerodinámica</strong> en tres pasos:</p>
<ol>
<li><strong>Energía elástica:</strong> al retorcer la goma, la estás forzando a una posición que no es la suya. La goma "quiere" volver a su estado natural. Esa tensión acumulada es energía potencial elástica.</li>
<li><strong>Energía cinética (giro):</strong> al soltar, la goma se destuerce violentamente. Ese giro se transmite a las hélices a través de los clips-eje.</li>
<li><strong>Sustentación:</strong> las hélices girando empujan aire hacia abajo. Por la tercera ley de Newton (acción-reacción), el aire empuja las hélices hacia arriba con la misma fuerza. El helicóptero sube.</li>
</ol>
<p>Las dos hélices giran en direcciones opuestas. Si girasen las dos en el mismo sentido, el palito giraría sobre sí mismo como una brocheta loca y no volaría. Al girar en sentidos contrarios, se anulan los giros del palito y toda la energía va a empujar aire.</p>
<p>Es el mismo principio de un helicóptero real. Con la diferencia de que el helicóptero real quema queroseno y el tuyo quema... ganas de pasarlo bien.</p>

<hr>

<div class="not-prose my-10 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6 lg:hidden">
<div class="flex items-center gap-2 mb-3">
<span class="text-xl">🧠</span>
<span class="text-base font-bold text-amber-800">¿Qué aprendes?</span>
</div>
<p class="text-[15px] leading-relaxed text-amber-900/80 mb-0">En 45 minutos, tu hijo ha tocado con las manos tres principios de la física que mueven el mundo:</p>
<ul class="mt-2 space-y-1 text-[15px] leading-relaxed text-amber-900/80" style="list-style-type: disc; padding-left: 1.5rem;">
<li><strong>Energía potencial elástica:</strong> la goma retorcida almacena energía. Es la misma que usa un reloj de cuerda, un arco de flechas o el muelle de un coche de juguete.</li>
<li><strong>Tercera ley de Newton (acción-reacción):</strong> las hélices empujan aire hacia abajo, el aire empuja el helicóptero hacia arriba. Los cohetes de SpaceX usan exactamente el mismo principio.</li>
<li><strong>Sustentación aerodinámica:</strong> las aspas inclinadas generan una diferencia de presión entre arriba y abajo. Es lo que mantiene en el aire un avión de 300 toneladas.</li>
</ul>
<p class="text-[15px] leading-relaxed text-amber-900/80 mt-2 mb-0">Tres leyes de Newton. Un palito. Una goma. Y un niño con los ojos como platos viendo cómo sube.</p>
</div>

<hr>

<h2>Solución de problemas</h2>
<ul>
<li><strong>No sube:</strong> la goma es demasiado fina. Prueba con una goma más gruesa o junta dos. También prueba a dar más vueltas (60, 80).</li>
<li><strong>Subía y ya no sube:</strong> la goma se ha dado de sí. Las gomas se desgastan con el uso. Cambia por una nueva.</li>
<li><strong>Gira sobre sí mismo y no vuela recto:</strong> las hélices están inclinadas en la misma dirección. Una debe empujar aire hacia abajo cuando gira en sentido horario y la otra cuando gira en sentido antihorario. Revisa la inclinación de las tiras de cartón.</li>
<li><strong>Las hélices se doblan con la velocidad:</strong> el cartón es demasiado fino. Usa doble capa de cartón o cartón de calendar (más grueso).</li>
</ul>

<hr>

<h2>Conviértelo en competición</h2>
<p>Construye dos helicópteros y competid con un cronómetro:</p>
<ul>
<li>¿Cuál aguanta más tiempo en el aire?</li>
<li>¿Cuál sube más alto?</li>
<li>¿Qué pasa si cargas uno con 40 vueltas y otro con 80? ¿Vuela el doble de tiempo?</li>
<li>¿Y si pegas un clip pequeño al palito como "pasajero"? ¿Cuánto peso extra puede levantar?</li>
</ul>
<p>Que tu hijo experimente y saque sus propias conclusiones. Un ingeniero de verdad prueba, mide, anota y mejora.</p>

<hr>

<h2>Esto es lo que hacemos en Tinkilabs</h2>
<p>Este helicóptero de goma es el primo volador de los mecanismos que enviamos cada mes en Tinkilabs. En nuestras cajas, los engranajes son de madera de abedul cortada a láser, los ejes son de acero, y todo encaja con un "clic" satisfactorio.</p>
<p>Pero la física —la energía que se guarda y se libera, el movimiento que se transmite— es exactamente la misma que acabas de construir con un palito y una goma.</p>
<p>[→ Descubre las máquinas de este mes]</p>

<hr>

<p><em>¿Ha volado? Grábalo en cámara lenta y súbelo etiquetando a @tinkilabs. Queremos verlo.</em></p>`,
    categoria: 'proyectos',
    autor: 'Tinki',
    fecha: '2026-06-04',
    lecturaMin: 6,
    coverEmoji: '🚁',
    tags: ['helicóptero', 'gomas', 'energía', 'vuelo', 'hélices'],
    edad: 'pro',
    tiempoMin: 45,
    mancha: 'poco',
    ayuda: 'adulto',
    materialesEmoji: [
      { emoji: '🪵', texto: '1 palito de brocheta de madera' },
      { emoji: '📦', texto: '2 tiras de cartón fino de 12 cm (caja de cereales)' },
      { emoji: '📎', texto: '2 clips grandes (para los ganchos)' },
      { emoji: '🩹', texto: '1 goma elástica gruesa y larga' },
      { emoji: '🔮', texto: '1 cuenta de collar o abalorio' },
      { emoji: '🔫', texto: 'Pistola de silicona caliente' },
      { emoji: '📏', texto: 'Cinta aislante' },
    ],
    aprendeCallout: {
      concepto: 'En 45 minutos, tu hijo ha tocado con las manos tres principios que mueven el mundo:',
      puntos: [
        'Energía potencial elástica: la goma retorcida almacena energía, como un reloj de cuerda',
        '3ª ley de Newton: acción-reacción. El aire empuja hacia arriba. Como un SpaceX.',
        'Sustentación: las aspas inclinadas crean diferencia de presión. Como un avión de 300 toneladas.',
      ],
    },
    sabiasCallout: {
      dato: 'El primer helicóptero de juguete con goma elástica lo inventó Alphonse Pénaud en 1870. Tenía 13 años. Los hermanos Wright dijeron que ese juguete fue lo que les enganchó a volar.',
    },
    contenidoEstructurado: {
      intro: '<p>Un helicóptero que vuela de verdad. Construido con un palito, dos tiras de cartón y una goma elástica. Sin pilas. Sin motor eléctrico. Solo la energía que almacenas en tus manos al retorcer una goma.</p><p>Esto no es un juguete de feria. Es ingeniería aeronáutica de la buena. La misma física que mantiene un helicóptero real en el aire, metida en un proyecto de 45 minutos.</p>',
      pasos: [
        { numero: 1, titulo: 'Fabrica las hélices', texto: 'Corta dos tiras de cartón de 12 cm de largo x 2 cm de ancho. Redondea las esquinas. Desdobla los dos clips hasta tener dos alambres rectos. En un extremo de cada alambre, dobla la punta formando un pequeño gancho (donde enganchará la goma). Pega cada tira de cartón a un clip con silicona caliente. Cada tira debe quedar ligeramente inclinada, como las aspas de un ventilador: una hacia un lado, la otra hacia el contrario.', imagenDescripcion: 'Dos tiras de cartón pegadas a clips, inclinadas en direcciones opuestas.' },
        { numero: 2, titulo: 'Prepara el soporte', texto: 'Ensarta la cuenta de collar en el palito de brocheta hasta la mitad. Esta cuenta es el cojinete: separa el palito de la hélice inferior y reduce la fricción. Si tienes pajitas, corta dos trocitos de 1 cm y colócalos a cada lado de la cuenta para que gire aún más suave.', imagenDescripcion: 'Palito con cuenta de collar en el centro y trocitos de pajita.' },
        { numero: 3, titulo: 'Monta los ejes', texto: 'Inserta un clip (con su hélice de cartón) en cada extremo del palito. El clip de abajo atraviesa la cuenta y se dobla por detrás para que no se salga. El clip de arriba atraviesa el palito directamente. Cada clip debe poder girar libremente.', imagenDescripcion: 'Palito con hélices de cartón montadas en ambos extremos.' },
        { numero: 4, titulo: 'El motor de goma', texto: 'Engancha la goma elástica entre los dos ganchos de los clips. La goma va desde el gancho superior hasta el inferior, por fuera del palito. Debe quedar recta pero no tensa. Si está tirante sin haberla girado, es demasiado corta: junta dos gomas con un nudito.', imagenDescripcion: 'Goma elástica enganchada entre los dos clips, pasando por fuera del palito.' },
        { numero: 5, titulo: 'Carga y despega', texto: 'Sujeta la hélice de abajo con una mano. Con la otra, gira la hélice de arriba en sentido antihorario. Dale 40, 50, 60 vueltas. Notarás cómo la goma se retuerce y ofrece más resistencia. Estás almacenando energía. Sujeta el helicóptero por el palito, sin tocar las hélices. Suelta las dos a la vez. La goma se destuerce, las hélices giran, y el helicóptero sube. Vuela de verdad.', imagenDescripcion: 'Helicóptero soltado en el aire, hélices girando, a medio metro del suelo.' },
      ],
      cienciaTitulo: 'Cómo funciona',
      cienciaTexto: '<p>Acabas de construir una máquina que transforma <strong>energía elástica</strong> en <strong>sustentación aerodinámica</strong> en tres pasos:</p><ol><li><strong>Energía elástica:</strong> al retorcer la goma, la fuerzas a una posición que no es la suya. Esa tensión acumulada es energía potencial.</li><li><strong>Energía cinética:</strong> al soltar, la goma se destuerce y transmite el giro a las hélices.</li><li><strong>Sustentación:</strong> las hélices empujan aire hacia abajo. Por la tercera ley de Newton, el aire empuja hacia arriba con la misma fuerza. El helicóptero sube.</li></ol><p>Las dos hélices giran en direcciones opuestas para que el palito no gire sobre sí mismo. Es el mismo principio de un helicóptero real, pero con goma en vez de queroseno.</p>',
      soluciones: [
        { problema: 'No sube', solucion: 'la goma es demasiado fina. Prueba con una más gruesa o junta dos. También prueba a dar más vueltas (60-80).' },
        { problema: 'Subía y ya no sube', solucion: 'la goma se ha dado de sí. Cambia por una nueva.' },
        { problema: 'Gira sobre sí mismo', solucion: 'las hélices están inclinadas en la misma dirección. Una debe empujar aire hacia abajo en sentido horario y la otra en antihorario.' },
        { problema: 'Las hélices se doblan', solucion: 'el cartón es demasiado fino. Usa doble capa o cartón más grueso.' },
      ],
      juegoTitulo: 'Conviértelo en competición',
      juegoTexto: '<p>Construye dos helicópteros y competid con un cronómetro:</p><ul><li>¿Cuál aguanta más tiempo en el aire?</li><li>¿Cuál sube más alto?</li><li>¿Qué pasa si cargas uno con 40 vueltas y otro con 80?</li><li>¿Y si pegas un clip pequeño al palito como "pasajero"?</li></ul><p>Que tu hijo experimente y saque sus propias conclusiones. Un ingeniero prueba, mide, anota y mejora.</p>',
      cta: '<p>Este helicóptero de goma es el primo volador de los mecanismos que enviamos cada mes en Tinkilabs. En nuestras cajas, los engranajes son de madera de abedul cortada a láser y todo encaja con un "clic" satisfactorio.</p><p>Pero la física —la energía que se guarda y se libera— es exactamente la misma que acabas de construir con un palito y una goma.</p><p>[→ Descubre las máquinas de este mes]</p>',
    },
  },

  {
    slug: 'paracaidas-casero-bolsa',
    titulo: 'Cómo hacer un paracaídas con una bolsa de plástico (y que funcione)',
    excerpt: 'Una bolsa del súper, cuatro hilos y un muñeco pequeño. 5 minutos de montaje para entender por qué no nos caemos del cielo.',
    contenido: `<p>Una bolsa de plástico de la compra. Cuatro trozos de hilo. Un Playmobil que tienes por casa. En 5 minutos tienes un paracaídas que frena la caída de verdad.</p>
<p>Lánzalo desde una silla. Desde la escalera. Desde la ventana de tu habitación (con cuidado). Cada vez que el muñeco llega al suelo flotando en lugar de estrellarse, tu hijo está entendiendo la resistencia del aire sin que nadie le dé una clase.</p>

<hr>

<h2>Materiales (4 cosas)</h2>
<ul>
<li>1 bolsa de plástico (de la compra, cuanto más grande mejor)</li>
<li>4 trozos de hilo de coser o lana fina (30 cm cada uno)</li>
<li>1 muñeco pequeño (Playmobil, Lego, un tapón de corcho con cara dibujada)</li>
<li>Celo</li>
<li>Tijeras</li>
<li>Opcional: un clip pequeño para ajustar el peso</li>
</ul>
<p>La bolsa de plástico de camiseta del súper es perfecta: ya tiene forma rectangular, es ligera y frena muy bien. Si usas una bolsa de basura grande, el paracaídas será más potente aún.</p>

<hr>

<h2>Paso a paso</h2>

<h3>Paso 1: Recorta la vela</h3>
<p>Extiende la bolsa de plástico sobre la mesa. Recorta un cuadrado de unos 30 x 30 cm. Puedes usar las propias líneas de la bolsa como guía.</p>
<p>Cuanto más grande sea el cuadrado, más aire atrapa y más lento cae. Con 30 cm ya tienes un paracaídas que funciona. Con 50 cm, el muñeco parece que flota.</p>

<h3>Paso 2: Prepara los cabos</h3>
<p>Corta 4 trozos de hilo de 30 cm. Con un trocito de celo, pega cada hilo a una esquina del cuadrado de plástico. Refuerza el celo doblando un trocito sobre sí mismo por el otro lado de la bolsa.</p>
<p>Los 4 hilos deben tener la misma longitud. Si uno es más corto, el paracaídas se inclinará hacia ese lado durante la caída.</p>

<h3>Paso 3: Une los cabos al muñeco</h3>
<p>Junta los 4 hilos en el centro, justo debajo del plástico. Átalos todos juntos con un nudito. Luego ata ese nudo al muñeco (por la cintura, por un brazo, o donde puedas).</p>
<p>También puedes atar un clip al nudo central como punto de enganche rápido, y luego enganchar distintos muñecos al clip para comparar resultados.</p>

<h3>Paso 4: ¡Lánzalo!</h3>
<p>Sujeta el paracaídas por el centro del plástico (no por los hilos). Súbelo todo lo que puedas. Abre la mano y suelta.</p>
<p>El plástico se infla solo con el aire. Los hilos se tensan. El muñeco baja despacio, flotando, como un paracaidista de verdad.</p>

<hr>

<div class="not-prose my-10 rounded-xl border border-blue-200 bg-blue-50 p-5 sm:p-6 lg:hidden">
<div class="flex items-center gap-2 mb-3">
<span class="text-xl">💡</span>
<span class="text-base font-bold text-blue-800">¿Sabías que...?</span>
</div>
<p class="text-[15px] leading-relaxed text-blue-900/80 mb-0">El primer salto en paracaídas de la historia lo hizo André-Jacques Garnerin en 1797. Saltó desde un globo aerostático a 900 metros de altura sobre París. Su paracaídas era de seda, no tenía agujero en la parte superior (como los modernos), y al caer se balanceaba tanto que aterrizó con náuseas. Aún así, repitió la hazaña decenas de veces. Su mujer, Jeanne Labrosse, fue la primera mujer paracaidista del mundo. Todo esto empezó con un trozo de tela y una idea absurda: "¿y si salto desde ahí arriba y no me mato?".</p>
</div>

<hr>

<h2>Cómo funciona</h2>
<p>Cuando sueltas un objeto, la gravedad tira de él hacia abajo. Sin nada que lo frene, cae cada vez más rápido hasta estrellarse contra el suelo.</p>
<p>El paracaídas cambia las reglas del juego. Al caer, el plástico choca contra las moléculas de aire que están en el camino. Esas moléculas empujan hacia arriba. Es la <strong>resistencia del aire</strong>: una fuerza que se opone al movimiento.</p>
<p>Cuanta más superficie tiene el paracaídas, más moléculas de aire golpea, más resistencia genera y más lento cae. Un paracaidista real usa una vela de 50 metros cuadrados. Con 30 cm ya se nota el efecto.</p>
<p>Sin aire (en la Luna, por ejemplo) un paracaídas no serviría de nada. Da Vinci diseñó un paracaídas en 1485. El primero en probarlo fue Louis-Sébastien Lenormand en 1783. Tu hijo se une a una tradición de 240 años de gente que mira al cielo y piensa "¿y si floto?".</p>

<hr>

<div class="not-prose my-10 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6 lg:hidden">
<div class="flex items-center gap-2 mb-3">
<span class="text-xl">🧠</span>
<span class="text-base font-bold text-amber-800">¿Qué aprendes?</span>
</div>
<p class="text-[15px] leading-relaxed text-amber-900/80 mb-0">En 5 minutos de montaje y 30 segundos de vuelo, tu hijo ha experimentado con tres fuerzas fundamentales:</p>
<ul class="mt-2 space-y-1 text-[15px] leading-relaxed text-amber-900/80" style="list-style-type: disc; padding-left: 1.5rem;">
<li><strong>Gravedad:</strong> la Tierra tira de todo hacia su centro. Sin gravedad, no habría caída. Sin caída, no habría paracaídas.</li>
<li><strong>Resistencia del aire:</strong> las moléculas de aire frenan los objetos que caen. Cuanta más superficie, más frenado. Es lo que hace que una hoja de papel plana caiga más lento que la misma hoja hecha una bola.</li>
<li><strong>Velocidad terminal:</strong> llega un momento en que la resistencia del aire iguala al peso del objeto. A partir de ahí, la velocidad de caída se mantiene constante. Sin paracaídas, un cuerpo humano alcanza 200 km/h. Con paracaídas abierto, unos 20 km/h.</li>
</ul>
<p class="text-[15px] leading-relaxed text-amber-900/80 mt-2 mb-0">Tu hijo no sabe las fórmulas. Pero acaba de sentir en sus manos que una bolsa de plástico frena una caída. Eso no se olvida.</p>
</div>

<hr>

<h2>El desafío del huevo</h2>
<p>Una vez que domines el paracaídas básico, sube la apuesta:</p>
<ol>
<li><strong>Cambia el tamaño de la vela:</strong> haz paracaídas de 20, 30, 50 cm. Mide el tiempo de caída desde la misma altura. ¿El doble de grande tarda el doble en caer?</li>
<li><strong>Cambia el peso:</strong> el mismo paracaídas con un Playmobil, con un clic, con una canica. ¿Cuánto peso puede frenar?</li>
<li><strong>El huevo:</strong> envuelve un huevo crudo en papel de cocina (por si acaso). Constrúyele un paracaídas con una bolsa de basura grande. Lánzalo desde una ventana baja. ¿Sobrevive?</li>
</ol>
<p>Si el huevo llega entero al suelo, tu hijo acaba de diseñar un sistema de protección para cargas frágiles. Que es básicamente lo que hace un ingeniero de la NASA con los rovers que aterrizan en Marte. Vale, a escala cocina. Pero el principio es el mismo.</p>

<hr>

<h2>Esto es lo que hacemos en Tinkilabs</h2>
<p>Este paracaídas es un aperitivo de lo que encontrarás en nuestras cajas mensuales. En Tinkilabs cada mes construyes una máquina con tus manos: lanzadores, catapultas, engranajes. Mecanismos de verdad que funcionan de verdad.</p>
<p>La física que has visto hoy (gravedad, resistencia del aire, velocidad de caída) es la misma que aplicamos en proyectos como el Tinki Aviones o el Tinki Cohete. Pero con madera de abedul y piezas que encajan como un reloj.</p>
<p>[→ Ver la colección completa de máquinas]</p>

<hr>

<p><em>¿Ha sobrevivido el huevo? Cuéntanoslo en redes con #TinkiChallenge. Los ingenieros de la NASA también empezaron así.</em></p>`,
    categoria: 'proyectos',
    autor: 'Tinki',
    fecha: '2026-06-04',
    lecturaMin: 5,
    coverEmoji: '🪂',
    tags: ['paracaídas', 'gravedad', 'aire', 'resistencia', 'reciclaje'],
    edad: 'maker',
    tiempoMin: 10,
    mancha: 'limpio',
    ayuda: 'solo',
    materialesEmoji: [
      { emoji: '🛍️', texto: '1 bolsa de plástico (de la compra, grande)' },
      { emoji: '🧵', texto: '4 trozos de hilo o lana fina (30 cm cada uno)' },
      { emoji: '🧸', texto: '1 muñeco pequeño (Playmobil, Lego, corcho)' },
      { emoji: '📏', texto: 'Celo' },
      { emoji: '✂️', texto: 'Tijeras' },
      { emoji: '📎', texto: '1 clip pequeño (opcional, para ajustar peso)' },
    ],
    aprendeCallout: {
      concepto: 'En 5 minutos de montaje y 30 segundos de vuelo, tu hijo ha experimentado tres fuerzas fundamentales:',
      puntos: [
        'Gravedad: la Tierra tira de todo hacia su centro',
        'Resistencia del aire: las moléculas de aire frenan los objetos que caen',
        'Velocidad terminal: cuando resistencia = peso, la velocidad se estabiliza',
      ],
    },
    sabiasCallout: {
      dato: 'El primer salto en paracaídas lo hizo André-Jacques Garnerin en 1797 desde un globo a 900 metros sobre París. Su paracaídas de seda se balanceaba tanto que aterrizó con náuseas. Aun así, repitió la hazaña.',
    },
    contenidoEstructurado: {
      intro: '<p>Una bolsa de plástico de la compra. Cuatro trozos de hilo. Un Playmobil que tienes por casa. En 5 minutos tienes un paracaídas que frena la caída de verdad.</p><p>Lánzalo desde una silla. Desde la escalera. Desde la ventana de tu habitación (con cuidado). Cada vez que el muñeco llega al suelo flotando en lugar de estrellarse, tu hijo está entendiendo la resistencia del aire sin que nadie le dé una clase.</p>',
      pasos: [
        { numero: 1, titulo: 'Recorta la vela', texto: 'Extiende la bolsa de plástico sobre la mesa. Recorta un cuadrado de unos 30 x 30 cm. Puedes usar las líneas de la bolsa como guía. Cuanto más grande sea el cuadrado, más aire atrapa y más lento cae. Con 30 cm ya funciona. Con 50 cm, el muñeco parece que flota.', imagenDescripcion: 'Cuadrado de plástico de 30 cm recortado sobre una mesa.' },
        { numero: 2, titulo: 'Prepara los cabos', texto: 'Corta 4 trozos de hilo de 30 cm cada uno. Con un trocito de celo, pega cada hilo a una esquina del cuadrado de plástico. Refuerza el celo doblando un trocito sobre sí mismo por el otro lado. Los 4 hilos deben tener la misma longitud. Si uno es más corto, el paracaídas se inclinará hacia ese lado durante la caída.', imagenDescripcion: 'Cuadrado de plástico con 4 hilos pegados con celo en las esquinas.' },
        { numero: 3, titulo: 'Une los cabos al muñeco', texto: 'Junta los 4 hilos en el centro, justo debajo del plástico. Átalos todos juntos con un nudito. Luego ata ese nudo al muñeco (por la cintura, un brazo, o donde puedas). También puedes atar un clip al nudo central como punto de enganche rápido para cambiar de muñeco.', imagenDescripcion: 'Muñeco atado a los 4 hilos del paracaídas, listo para lanzar.' },
        { numero: 4, titulo: '¡Lánzalo!', texto: 'Sujeta el paracaídas por el centro del plástico (no por los hilos). Súbelo todo lo que puedas. Abre la mano y suelta. El plástico se infla solo con el aire. Los hilos se tensan. El muñeco baja despacio, flotando, como un paracaidista de verdad.', imagenDescripcion: 'Paracaídas en el aire, completamente inflado, con el muñeco colgando.' },
      ],
      cienciaTitulo: 'Cómo funciona',
      cienciaTexto: '<p>Cuando sueltas un objeto, la gravedad tira de él hacia abajo. Sin nada que lo frene, cae cada vez más rápido hasta estrellarse.</p><p>El paracaídas cambia las reglas. Al caer, el plástico choca contra las moléculas de aire. Esas moléculas empujan hacia arriba. Es la <strong>resistencia del aire</strong>: una fuerza que se opone al movimiento. Cuanta más superficie tiene el paracaídas, más moléculas golpea, más resistencia genera y más lento cae.</p><p>Sin aire (en la Luna) un paracaídas no serviría de nada. Da Vinci diseñó uno en 1485. El primero en probarlo fue Louis-Sébastien Lenormand en 1783. Tu hijo se une a una tradición de 240 años de gente que mira al cielo y piensa "¿y si floto?".</p>',
      soluciones: [
        { problema: 'El muñeco cae muy rápido', solucion: 'la vela es demasiado pequeña. Haz un cuadrado más grande (40-50 cm) o usa una bolsa de basura.' },
        { problema: 'El paracaídas se inclina', solucion: 'los hilos no tienen la misma longitud. Mídelos de nuevo y ajústalos.' },
        { problema: 'El celo se despega', solucion: 'usa dos trozos de celo por esquina, uno por delante y otro por detrás. O haz un nudito en la esquina del plástico.' },
        { problema: 'Los hilos se enredan', solucion: 'antes de lanzar, sujeta el paracaídas por el centro del plástico y deja que los hilos cuelguen rectos.' },
      ],
      juegoTitulo: 'El desafío del huevo',
      juegoTexto: '<p>Una vez que domines el paracaídas básico, sube la apuesta:</p><ol><li><strong>Cambia el tamaño:</strong> haz paracaídas de 20, 30, 50 cm. Mide el tiempo de caída. ¿El doble de grande tarda el doble en caer?</li><li><strong>Cambia el peso:</strong> mismo paracaídas con un Playmobil, con un clic, con una canica. ¿Cuánto peso puede frenar?</li><li><strong>El huevo:</strong> envuelve un huevo crudo en papel de cocina. Constrúyele un paracaídas con bolsa de basura. Lánzalo desde una ventana baja. ¿Sobrevive?</li></ol><p>Si el huevo llega entero, tu hijo acaba de diseñar un sistema de protección para cargas frágiles. Como un ingeniero de la NASA con los rovers de Marte. A escala cocina.</p>',
      cta: '<p>Este paracaídas es un aperitivo de lo que encontrarás en nuestras cajas mensuales. En Tinkilabs cada mes construyes una máquina con tus manos: lanzadores, catapultas, engranajes. Mecanismos de verdad que funcionan de verdad.</p><p>La física que has visto hoy es la misma que aplicamos en proyectos como el Tinki Aviones o el Tinki Cohete. Pero con madera de abedul y piezas que encajan como un reloj.</p><p>[→ Ver la colección completa de máquinas]</p>',
    },
  },
];
