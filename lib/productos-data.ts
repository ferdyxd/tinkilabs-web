export interface ProductoDetalle {
  slug: string;
  nombre: string;
  nombre_en: string;
  linea: string;
  edad: string;
  edad_en: string;
  pvp: string;
  mes: number;
  mecanismo: string;
  mecanismo_en: string;
  descripcion: string;
  descripcion_en: string;
  referenciaUrl: string;
  referenciaLabel: string;
  referenciaLabel_en: string;
  imagen: string;
  videoUrl?: string;
  incluye: string[];
  incluye_en: string[];
  tiempoMontaje: string;
  tiempoMontaje_en: string;
  conceptos: string[];
  conceptos_en: string[];
}

export const productosDetalle: ProductoDetalle[] = [
  {
    slug: 'tinki-launcher',
    nombre: 'Tinki Launcher',
    nombre_en: 'Tinki Launcher',
    linea: 'Tinki Maker',
    edad: '6-9 años',
    edad_en: '6-9 years',
    pvp: '24.90€',
    mes: 1,
    mecanismo: 'Lanzador pump-action, muelle, cargador 6 discos',
    mecanismo_en: 'Pump-action launcher, spring, 6-disc magazine',
    descripcion: 'Construye tu propio lanzador de discos con un tren de engranajes y un muelle de compresión. Carga hasta 6 discos, apunta y dispara uno a uno con el mecanismo de acción de bombeo. Los discos vuelan a más de 5 metros.',
    descripcion_en: 'Build your own disc launcher with a gear train and compression spring. Load up to 6 discs, aim and fire one by one with the pump-action mechanism. Discs fly over 5 meters.',
    referenciaUrl: 'https://www.youtube.com/watch?v=9AiQxV_khb4',
    referenciaLabel: 'Ver en YouTube',
    referenciaLabel_en: 'Watch on YouTube',
    imagen: '/images/productos/01-launcher.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=9AiQxV_khb4',
    incluye: ['6 discos de espuma', 'Muelle de compresión', 'Tren de engranajes', 'Cuerpo principal', 'Manual ilustrado'],
    incluye_en: ['6 foam discs', 'Compression spring', 'Gear train', 'Main body', 'Illustrated manual'],
    tiempoMontaje: '45-60 min',
    tiempoMontaje_en: '45-60 min',
    conceptos: ['Engranajes', 'Muelles', 'Mecanismo de trinquete', 'Aerodinámica básica'],
    conceptos_en: ['Gears', 'Springs', 'Ratchet mechanism', 'Basic aerodynamics'],
  },
  {
    slug: 'tinki-domino',
    nombre: 'Tinki Dominó',
    nombre_en: 'Tinki Domino',
    linea: 'Tinki Maker',
    edad: '6-9 años',
    edad_en: '6-9 years',
    pvp: '29.90€',
    mes: 2,
    mecanismo: 'Robot mecánico que coloca fichas de dominó',
    mecanismo_en: 'Mechanical robot that places domino tiles',
    descripcion: 'Un robot que coloca fichas de dominó una a una mientras avanza. Construye el mecanismo de empuje, carga el cargador con 50 fichas y mira cómo tu robot deja un rastro perfecto de dominó.',
    descripcion_en: 'A robot that places domino tiles one by one as it moves forward. Build the push mechanism, load the magazine with 50 tiles and watch your robot leave a perfect domino trail.',
    referenciaUrl: 'https://www.kiwico.com/us/store/dp/domino-machine-project-kit/3827',
    referenciaLabel: 'Ver en KiwiCo',
    referenciaLabel_en: 'View on KiwiCo',
    imagen: '/images/productos/02-domino.jpg',
    incluye: ['50 fichas de dominó', 'Mecanismo de empuje', 'Chasis con ruedas', 'Cargador', 'Manual ilustrado'],
    incluye_en: ['50 domino tiles', 'Push mechanism', 'Wheeled chassis', 'Magazine', 'Illustrated manual'],
    tiempoMontaje: '30-45 min',
    tiempoMontaje_en: '30-45 min',
    conceptos: ['Mecanismo de leva', 'Gravedad', 'Movimiento lineal', 'Precisión mecánica'],
    conceptos_en: ['Cam mechanism', 'Gravity', 'Linear motion', 'Mechanical precision'],
  },
  {
    slug: 'tinki-laberinto',
    nombre: 'Tinki Laberinto',
    nombre_en: 'Tinki Maze',
    linea: 'Tinki Maker',
    edad: '6-9 años',
    edad_en: '6-9 years',
    pvp: '24.90€',
    mes: 3,
    mecanismo: 'Laberinto basculante construible, tableros intercambiables',
    mecanismo_en: 'Buildable tilting maze, interchangeable boards',
    descripcion: 'Construye tu propio laberinto basculante con mandos de precisión. Incluye 3 tableros intercambiables con recorridos de dificultad creciente. Controla la inclinación en dos ejes y guía la bola hasta la meta sin caer en las trampas.',
    descripcion_en: 'Build your own tilting maze with precision controls. Includes 3 interchangeable boards with increasing difficulty. Control the tilt on two axes and guide the ball to the goal without falling into traps.',
    referenciaUrl: 'https://www.kiwico.com/es/store/dp/maze-arcade/6186',
    referenciaLabel: 'Ver en KiwiCo',
    referenciaLabel_en: 'View on KiwiCo',
    imagen: '/images/productos/03-laberinto.webp',
    incluye: ['3 tableros intercambiables', 'Mandos de doble eje', 'Bolas metálicas', 'Estructura basculante', 'Manual ilustrado'],
    incluye_en: ['3 interchangeable boards', 'Dual-axis controls', 'Metal balls', 'Tilting frame', 'Illustrated manual'],
    tiempoMontaje: '30-45 min',
    tiempoMontaje_en: '30-45 min',
    conceptos: ['Física de planos inclinados', 'Coordinación motora', 'Gravedad', 'Diseño de juegos'],
    conceptos_en: ['Inclined plane physics', 'Motor coordination', 'Gravity', 'Game design'],
  },
];
