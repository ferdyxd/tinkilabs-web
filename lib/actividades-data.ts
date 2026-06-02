export type Edad = 'mini' | 'maker' | 'pro';
export type TipoActividad = 'construye' | 'experimenta' | 'crea' | 'juega';
export type NivelMancha = 'limpio' | 'algo-mancha' | 'alerta';
export type Duracion = 'express' | 'tarde' | 'proyecto';
export type Temporada = 'primavera' | 'verano' | 'otono' | 'invierno' | 'navidad' | 'especial';
export type Material = 'madera' | 'papel' | 'reciclados' | 'caja';
export type Mecanismo =
  | 'engranajes'
  | 'muelles'
  | 'palancas'
  | 'poleas'
  | 'elasticos'
  | 'aire'
  | 'equilibrio'
  | 'imanes'
  | 'friccion'
  | 'gravedad';

export interface Actividad {
  slug: string;
  titulo: string;
  descripcionCorta: string;
  descripcion: string;
  edad: Edad;
  tipo: TipoActividad[];
  mancha: NivelMancha;
  duracion: Duracion;
  temporada: Temporada[];
  materialesReales: string[];
  material: Material[];
  mecanismo: Mecanismo[];
  pasos: string[];
  imagenEmoji: string;
  videoUrl?: string;
}

export const EDAD_LABELS: Record<Edad, string> = {
  mini: '3-5 años',
  maker: '6-9 años',
  pro: '10-14 años',
};

export const TIPO_LABELS: Record<TipoActividad, string> = {
  construye: 'Construye',
  experimenta: 'Experimenta',
  crea: 'Crea',
  juega: 'Juega',
};

export const MANCHA_LABELS: Record<NivelMancha, string> = {
  'limpio': 'Limpio 🧹',
  'algo-mancha': 'Algo mancha 🧼',
  'alerta': '¡Alerta! 🛁',
};

export const DURACION_LABELS: Record<Duracion, string> = {
  express: 'Express (< 30 min)',
  tarde: 'Tarde (30 min - 2 h)',
  proyecto: 'Proyecto (2 h+)',
};

export const TEMPORADA_LABELS: Record<Temporada, string> = {
  primavera: 'Primavera',
  verano: 'Verano',
  otono: 'Otoño',
  invierno: 'Invierno',
  navidad: 'Navidad',
  especial: 'Especial',
};

export const MATERIAL_LABELS: Record<Material, string> = {
  madera: 'Madera',
  papel: 'Papel/Cartón',
  reciclados: 'Reciclados',
  caja: 'Todo en la caja',
};

export const MECANISMO_LABELS: Record<Mecanismo, string> = {
  engranajes: 'Engranajes',
  muelles: 'Muelles',
  palancas: 'Palancas',
  poleas: 'Poleas',
  elasticos: 'Elásticos',
  aire: 'Aire',
  equilibrio: 'Equilibrio',
  imanes: 'Imanes',
  friccion: 'Fricción',
  gravedad: 'Gravedad',
};

export const actividades: Actividad[] = [
  {
    slug: 'lanzador-discos',
    titulo: 'Lanzador de discos de madera',
    descripcionCorta: 'Construye un lanzador de discos con tren de engranajes y muelle. ¡Los discos vuelan de verdad!',
    descripcion: '¿Preparado para lanzar discos a toda velocidad? Con este proyecto construirás un lanzador de discos de madera con un tren de engranajes real y un muelle de compresión. Carga el disco, aprieta el gatillo y ¡FIUUUM! El disco sale disparado gracias a la energía acumulada en el muelle. Un proyecto de ingeniería de los de verdad.',
    edad: 'maker',
    tipo: ['construye', 'juega'],
    mancha: 'limpio',
    duracion: 'tarde',
    temporada: ['primavera', 'verano', 'otono', 'invierno'],
    materialesReales: ['Madera contrachapada 3mm', 'Muelle de compresión', 'Tornillos M3', 'Gomas elásticas', '6 discos de madera'],
    material: ['madera', 'caja'],
    mecanismo: ['engranajes', 'muelles'],
    pasos: [
      'Monta el chasis principal con las piezas de madera encajando las pestañas',
      'Ensambla el tren de engranajes: piñón grande + piñón pequeño',
      'Coloca el muelle de compresión en el cargador',
      'Fija el gatillo con el tornillo M3 y la goma elástica de retorno',
      'Carga un disco, apunta hacia arriba (nunca a personas) y ¡dispara!',
    ],
    imagenEmoji: '🛞',
  },
  {
    slug: 'volcan-casero',
    titulo: 'Volcán de bicarbonato en erupción',
    descripcionCorta: 'Mezcla bicarbonato y vinagre para crear una erupción volcánica espumosa. Ciencia que mancha (y mola).',
    descripcion: 'El clásico que nunca falla. Construye la estructura del volcán con plastilina o papel maché, prepara la mezcla secreta en el cráter y observa cómo la reacción química entre el bicarbonato de sodio y el vinagre genera una erupción de espuma que parece lava de verdad. Puedes añadir colorante rojo para un efecto aún más espectacular.',
    edad: 'mini',
    tipo: ['experimenta', 'crea'],
    mancha: 'alerta',
    duracion: 'express',
    temporada: ['especial'],
    materialesReales: ['Bicarbonato de sodio', 'Vinagre blanco', 'Colorante rojo', 'Botella de plástico pequeña', 'Plastilina o arcilla', 'Bandeja para recoger'],
    material: ['reciclados'],
    mecanismo: ['aire'],
    pasos: [
      'Coloca la botella en el centro de la bandeja',
      'Moldea la plastilina alrededor de la botella para formar el volcán',
      'Echa 3 cucharadas de bicarbonato dentro de la botella',
      'Añade unas gotas de colorante rojo',
      'Vierte el vinagre y... ¡ERUPCIÓN!',
    ],
    imagenEmoji: '🌋',
  },
  {
    slug: 'circuito-luz-tarjeta',
    titulo: 'Tarjeta iluminada con circuito básico',
    descripcionCorta: 'Crea una tarjeta de cumpleaños que se ilumina al abrirla usando un circuito eléctrico sencillo.',
    descripcion: 'Papel, cinta de cobre, una pila de botón y un LED. Con estos cuatro elementos vas a construir un circuito eléctrico real escondido dentro de una tarjeta de felicitación. Al abrir la tarjeta, el contacto se cierra y la luz se enciende. ¿Magia? No: electricidad. Ideal para cumpleaños y días especiales.',
    edad: 'maker',
    tipo: ['construye', 'crea'],
    mancha: 'limpio',
    duracion: 'tarde',
    temporada: ['especial'],
    materialesReales: ['Cartulina de colores', 'Cinta de cobre adhesiva', 'Pila de botón CR2032', 'LED de 3mm', 'Pegamento en barra', 'Tijeras'],
    material: ['papel'],
    mecanismo: [],
    pasos: [
      'Dobla la cartulina por la mitad para hacer la tarjeta',
      'Dibuja el circuito en el interior con lápiz: dos caminos que se juntan al cerrar',
      'Pega la cinta de cobre siguiendo los caminos dibujados',
      'Coloca la pila en un extremo y el LED en el otro (respeta polaridad + y -)',
      'Al cerrar la tarjeta los contactos se tocan y el LED se enciende',
    ],
    imagenEmoji: '💡',
  },
  {
    slug: 'puente-papel',
    titulo: 'Puente de papel que aguanta peso',
    descripcionCorta: 'Dobla, pliega y construye un puente solo con papel. ¿Cuánto peso aguanta antes de caer?',
    descripcion: '¿Cuánto peso puede aguantar un simple folio? Mucho más del que crees. El secreto está en la forma. Doblando el papel en triángulos y creando una estructura de celosía, un puente de papel puede aguantar hasta 2 kg. Este experimento te enseña los fundamentos de la ingeniería estructural sin más material que folios y celo.',
    edad: 'maker',
    tipo: ['experimenta', 'construye'],
    mancha: 'limpio',
    duracion: 'express',
    temporada: ['primavera', 'verano', 'otono', 'invierno'],
    materialesReales: ['10 folios A4', 'Celo o cinta adhesiva', '2 pilas de libros (como pilares)', 'Pesas u objetos para probar (monedas, latas)'],
    material: ['papel'],
    mecanismo: ['equilibrio', 'gravedad'],
    pasos: [
      'Coloca dos pilas de libros separadas unos 20 cm como pilares del puente',
      'Enrolla 6 folios formando tubos finos y asegúralos con celo',
      'Usa 3 tubos como vigas principales entre los pilares',
      'Los otros 3 tubos forman triángulos debajo de las vigas (refuerzo)',
      'Ve colocando peso poco a poco en el centro. ¿Cuánto aguanta?',
      'Prueba distintas formas: ¿tubos redondos o triangulares? ¿Más o menos capas?',
    ],
    imagenEmoji: '🌉',
  },
  {
    slug: 'barcos-autopropulsados',
    titulo: 'Barcos autopropulsados con tensión superficial',
    descripcionCorta: 'Fabrica mini barcos que navegan solos usando jabón. Física de fluidos en la bañera.',
    descripcion: 'Recorta un barquito de cartón, ponle una gota de jabón en la parte de atrás y... ¡navega solo! El jabón rompe la tensión superficial del agua y empuja el barco hacia adelante. Es el proyecto perfecto para la bañera, la piscina de verano o un barreño en la terraza.',
    edad: 'mini',
    tipo: ['experimenta', 'juega'],
    mancha: 'algo-mancha',
    duracion: 'express',
    temporada: ['verano'],
    materialesReales: ['Cartón fino (de caja de cereales)', 'Tijeras', 'Jabón líquido', 'Palillos', 'Barreño o bañera con agua'],
    material: ['reciclados'],
    mecanismo: ['friccion'],
    pasos: [
      'Dibuja y recorta un barco en cartón (un triángulo con base funciona genial)',
      'Haz un pequeño corte en la parte trasera del barco',
      'Llena el barreño o la bañera con agua',
      'Pon el barco en el agua con cuidado',
      'Con un palillo, deposita una gota de jabón en la ranura trasera',
      'Observa cómo el barco sale disparado rompiendo la tensión superficial',
    ],
    imagenEmoji: '⛵',
  },
  {
    slug: 'catapulta-cuchara',
    titulo: 'Catapulta de cuchara con palanca',
    descripcionCorta: 'Construye una catapulta de sobremesa usando palitos de helado, gomas y una cuchara de plástico.',
    descripcion: 'La física de las palancas explicada con una batalla de malvaviscos. Usando palitos de helado como estructura, gomas elásticas como fuente de energía y una cuchara como brazo lanzador, construyes una catapulta de precisión. Proyectiles ligeros recomendados: malvaviscos, bolitas de papel o pompones.',
    edad: 'maker',
    tipo: ['construye', 'juega'],
    mancha: 'limpio',
    duracion: 'express',
    temporada: ['primavera', 'verano', 'otono', 'invierno'],
    materialesReales: ['8 palitos de helado', '4 gomas elásticas', '1 cuchara de plástico', 'Proyectiles: malvaviscos o bolitas de papel'],
    material: ['reciclados'],
    mecanismo: ['palancas', 'elasticos'],
    pasos: [
      'Apila 6 palitos de helado y átalos fuerte por ambos extremos con gomas',
      'Toma los 2 palitos restantes y átalos por un solo extremo',
      'Abre los 2 palitos como una pinza e introduce la pila de 6 en el centro',
      'Fija la cuchara al palito superior con una goma (la cuchara mira hacia arriba)',
      'Coloca un proyectil en la cuchara, tensa y... ¡FUEGO!',
    ],
    imagenEmoji: '🏗️',
  },
  {
    slug: 'tornado-en-frasco',
    titulo: 'Tornado embotellado',
    descripcionCorta: 'Crea un tornado dentro de una botella usando agua y un par de botellas unidas. Física de vórtices.',
    descripcion: 'Une dos botellas por sus tapones, llena una de agua, dale la vuelta, agita con un movimiento circular y observa cómo se forma un tornado perfecto dentro de la botella. Es el mismo principio físico que los tornados reales y los remolinos de agua del desagüe.',
    edad: 'mini',
    tipo: ['experimenta'],
    mancha: 'algo-mancha',
    duracion: 'express',
    temporada: ['especial'],
    materialesReales: ['2 botellas de plástico vacías', 'Agua', 'Cinta aislante o pegamento fuerte', 'Purpurina o colorante (opcional)'],
    material: ['reciclados'],
    mecanismo: ['gravedad', 'aire'],
    pasos: [
      'Llena una botella con agua hasta 3/4 (añade purpurina si quieres)',
      'Pega los dos tapones entre sí por la parte plana con cinta aislante',
      'Haz un agujero de 1 cm en el centro de los tapones unidos',
      'Enrosca la botella llena a un tapón y la vacía al otro',
      'Dale la vuelta al conjunto y agita con movimiento circular',
      'Observa el vórtice: el agua baja girando mientras el aire sube por el centro',
    ],
    imagenEmoji: '🌪️',
  },
  {
    slug: 'engranajes-visibles',
    titulo: 'Panel de engranajes visibles',
    descripcionCorta: 'Monta un panel de engranajes de cartón que giran todos juntos. Ingeniería mecánica en estado puro.',
    descripcion: 'Dibuja, recorta y monta un sistema de engranajes de cartón sobre un panel. Al girar el primer engranaje, todos los demás giran encadenados. Los grandes giran más despacio que los pequeños. Es la mejor manera de entender la relación de transmisión sin necesidad de piezas caras.',
    edad: 'maker',
    tipo: ['construye', 'experimenta'],
    mancha: 'limpio',
    duracion: 'tarde',
    temporada: ['primavera', 'invierno'],
    materialesReales: ['Cartón grueso (caja de envíos)', 'Chinchetas', 'Lápiz y compás', 'Tijeras o cutter', 'Regla'],
    material: ['reciclados'],
    mecanismo: ['engranajes'],
    pasos: [
      'Dibuja en cartón 4 círculos dentados de distinto tamaño con el compás',
      'Recórtalos con cuidado. Los dientes no tienen que ser perfectos',
      'Fija cada engranaje al panel de cartón con una chincheta (debe poder girar)',
      'Colócalos de forma que los dientes se toquen entre sí',
      'Gira el más grande y observa cómo los pequeños giran más rápido',
      'Cuenta las vueltas: ¿cuántas da el pequeño por cada vuelta del grande?',
    ],
    imagenEmoji: '⚙️',
  },
  {
    slug: 'laberinto-canicas-basculante',
    titulo: 'Laberinto basculante de canicas',
    descripcionCorta: 'Construye un laberinto basculante con una caja de zapatos y canicas. Controla la inclinación con hilos.',
    descripcion: 'Convierte una caja de zapatos en un laberinto basculante de precisión. Pega pajitas como paredes, crea un sistema de hilos que permita inclinar la caja en las 4 direcciones, y guía la canica desde la salida hasta la meta sin caer en los agujeros trampa.',
    edad: 'mini',
    tipo: ['construye', 'juega'],
    mancha: 'limpio',
    duracion: 'tarde',
    temporada: ['primavera', 'verano', 'otono', 'invierno'],
    materialesReales: ['Caja de zapatos', 'Pajitas de colores', 'Pegamento caliente', 'Canicas', 'Hilo o cordel fino', '4 chinchetas con cabeza'],
    material: ['reciclados'],
    mecanismo: ['equilibrio', 'palancas'],
    pasos: [
      'Pega las pajitas dentro de la caja formando las paredes del laberinto',
      'Haz 3 agujeros "trampa" en la base (canica cae y vuelta a empezar)',
      'Ata un hilo a cada esquina de la caja pasando por chinchetas arriba',
      'Sujeta los 4 hilos y practica la inclinación suave',
      'Intenta llevar la canica de salida a meta sin que caiga en las trampas',
    ],
    imagenEmoji: '🌀',
  },
  {
    slug: 'cohete-globo',
    titulo: 'Cohete propulsado por globo',
    descripcionCorta: 'Fabrica un cohete que atraviesa la habitación usando solo un globo y una pajita. Tercera ley de Newton.',
    descripcion: 'Tensa un hilo de un extremo a otro de la habitación, infla un globo, pégalo a una pajita ensartada en el hilo, suéltalo y... ¡ZIUUM! El aire escapa del globo y el cohete sale disparado en dirección contraria. Acabas de demostrar la tercera ley de Newton en tu salón.',
    edad: 'mini',
    tipo: ['experimenta', 'juega'],
    mancha: 'limpio',
    duracion: 'express',
    temporada: ['primavera', 'verano', 'otono', 'invierno'],
    materialesReales: ['Hilo de coser o hilo de pescar', 'Pajita', 'Globo', 'Celo', '2 puntos de anclaje (sillas, pomos)'],
    material: ['reciclados'],
    mecanismo: ['aire', 'friccion'],
    pasos: [
      'Tensa el hilo entre dos puntos (silla a pomo de puerta) como un teleférico',
      'Ensarta la pajita en el hilo antes de atar el segundo extremo',
      'Infla el globo (sin anudar) y pégalo a la pajita con celo',
      'Sujeta la boquilla del globo con los dedos para que no escape el aire',
      'Cuenta atrás: 3... 2... 1... ¡suelta!',
      'Mide la distancia. Prueba con globos más grandes o hilo inclinado',
    ],
    imagenEmoji: '🚀',
  },
];
