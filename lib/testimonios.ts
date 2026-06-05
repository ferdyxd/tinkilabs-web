export interface Testimonial {
  nombre: string;
  relacion: string; // "Madre de Mateo, 8 años" o "Beta tester Tinki Pro"
  cita: string;
  avatar: string; // emoji como placeholder hasta tener fotos reales
}

export const testimonios: Testimonial[] = [
  {
    nombre: 'Laura',
    relacion: 'Madre de Mateo, 8 años',
    cita: 'Mi hijo no ha vuelto a pedir el iPad desde que le llegó la caja. Se la enseñó a su abuelo, a sus primos, a la vecina... creo que hasta el perro la ha visto.',
    avatar: '👩‍👦',
  },
  {
    nombre: 'Carlos',
    relacion: 'Padre de Sara, 10 años',
    cita: 'Pensé que necesitaría mi ayuda. A los 20 minutos ya lo había montado ella sola. Lo mejor fue la cara que puso al disparar el primer disco. Flipante.',
    avatar: '👨‍👧',
  },
  {
    nombre: 'Marina',
    relacion: 'Madre de Leo, 6 años',
    cita: 'Leo quería ser youtuber. Ahora quiere ser inventor. Dice que Tinki es su "jefe de ingeniería" y que él es el ayudante. Me muero de amor.',
    avatar: '👩‍👦',
  },
  {
    nombre: 'David',
    relacion: 'Padre de Álvaro y Lucía, 7 y 9 años',
    cita: 'Compré una caja para Álvaro. Lucía se enfadó porque no era para ella. Ahora tengo dos suscripciones. Y cero tiempo libre. Pero merece la pena.',
    avatar: '👨‍👧‍👦',
  },
  {
    nombre: 'Elena',
    relacion: 'Madre de Martín, 11 años',
    cita: 'Martín desmontaba todos sus juguetes. Con Tinkilabs por fin tiene juguetes que están hechos para montar y desmontar. Y que funcionan de verdad.',
    avatar: '👩‍👦',
  },
  {
    nombre: 'Javier',
    relacion: 'Abuelo de Emma, 8 años',
    cita: 'Soy ingeniero jubilado. Cuando vi la caja pensé "esto no lo monta una niña de 8 años". Emma lo montó en 25 minutos. Me calló la boca. Bravo.',
    avatar: '👴',
  },
  {
    nombre: 'Sara',
    relacion: 'Madre de Diego, 5 años',
    cita: 'Lo que más me gusta es que no trae pantalla. Ni app. Ni código QR. Es madera, piezas e instrucciones. Como los juguetes de antes pero mucho más alucinantes.',
    avatar: '👩‍👦',
  },
  {
    nombre: 'Pablo',
    relacion: 'Tío de Aitana, 9 años',
    cita: 'Le regalé una caja por su cumpleaños. Sus padres me dijeron que estuve a punto de arruinar la fiesta porque no quería abrir los otros regalos. Victoria.',
    avatar: '🎁',
  },
  {
    nombre: 'Ana',
    relacion: 'Madre de Hugo, 12 años',
    cita: 'Hugo está en esa edad en que nada mola. Abrió la caja con cara de "buf". A los 5 minutos estaba enganchado. A los 30 me preguntó cuándo llegaba la siguiente.',
    avatar: '👩‍👦',
  },
  {
    nombre: 'Roberto',
    relacion: 'Padre de Julia, 7 años',
    cita: 'Lo mejor es verla concentrada. Saca la lengua, frunce el ceño, gira una pieza, la vuelve a poner... y de repente grita "¡PAPÁ, MIRA!". Ese momento es oro puro.',
    avatar: '👨‍👧',
  },
];
