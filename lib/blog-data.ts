export type CategoriaBlog =
  | 'proyectos'
  | 'ciencia'
  | 'ingenieria'
  | 'padres'
  | 'tinkilabs';

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
}

export const CATEGORIA_LABELS: Record<CategoriaBlog, string> = {
  proyectos: 'Proyectos DIY',
  ciencia: 'Ciencia alucinante',
  ingenieria: 'Ingeniería para peques',
  padres: 'Para padres',
  tinkilabs: 'Tinkilabs',
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
];
