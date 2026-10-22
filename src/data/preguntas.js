// Banco de preguntas del Desafío Eco-Park U'wa.
//
// Cómo editar:
//  - p:    texto de la pregunta
//  - o:    opciones de respuesta. ¡La PRIMERA siempre es la correcta! (el juego las revuelve al mostrarlas)
//  - dato: dato curioso que aparece después de responder (opcional)
// Puedes agregar o quitar preguntas libremente; cada mazo se baraja solo.

export const PREGUNTAS = {
  flora: [
    {
      p: '¿Qué planta típica del páramo crece apenas cerca de 1 centímetro por año?',
      o: ['El frailejón', 'La palma de cera', 'La guadua', 'El eucalipto'],
      dato: 'Por eso un frailejón de 1 metro de alto puede tener cerca de 100 años. ¡Nunca los arranques!',
    },
    {
      p: '¿Para qué le sirven al frailejón los pelitos que cubren sus hojas?',
      o: ['Para protegerse del frío y del sol intenso', 'Para atraer mosquitos', 'Para producir miel', 'Para espantar a los osos'],
      dato: 'Esa "lana" funciona como un abrigo natural y ayuda a atrapar la humedad de la niebla.',
    },
    {
      p: '¿Por qué se dice que el páramo es una "fábrica de agua"?',
      o: [
        'Sus plantas y suelos capturan, guardan y regulan el agua de los ríos',
        'Porque allí hay represas de concreto',
        'Porque solo llueve en el páramo',
        'Porque tiene fábricas de agua embotellada',
      ],
      dato: 'Los suelos y musgos del páramo funcionan como una esponja gigante que suelta el agua poco a poco.',
    },
    {
      p: '¿Qué planta forma "colchones" verdes en el páramo capaces de guardar mucha agua?',
      o: ['El musgo', 'El cactus', 'El girasol', 'El bambú'],
      dato: 'Algunos musgos, como el Sphagnum, pueden retener muchas veces su propio peso en agua.',
    },
    {
      p: '¿Cuál es el árbol nacional de Colombia?',
      o: ['La palma de cera del Quindío', 'La ceiba', 'El roble', 'El pino'],
      dato: 'Puede superar los 50 metros de altura: es una de las palmas más altas del mundo.',
    },
    {
      p: '¿Cuál es la flor nacional de Colombia?',
      o: ['La orquídea (Cattleya trianae)', 'La rosa', 'El girasol', 'La margarita'],
      dato: 'Colombia es uno de los países con más especies de orquídeas del planeta.',
    },
    {
      p: '¿Qué guardan las bromelias en el centro de sus hojas en forma de roseta?',
      o: ['Agua de lluvia que sirve de hogar a ranas e insectos', 'Miel de abejas', 'Arena del río', 'Semillas de frailejón'],
      dato: 'Cada bromelia es un pequeño ecosistema. ¡Al oso de anteojos le encanta comerse sus cogollos!',
    },
    {
      p: '¿Qué es una especie endémica?',
      o: [
        'Una que vive de forma natural solo en un lugar determinado',
        'Una que vive en todo el planeta',
        'Una que ya se extinguió',
        'Una planta que solo crece en macetas',
      ],
      dato: 'Muchas especies de frailejón son endémicas: solo existen en un páramo específico.',
    },
    {
      p: '¿Por qué muchas plantas del páramo tienen hojas pequeñas, gruesas o peludas?',
      o: ['Para resistir el frío, el viento y la radiación solar', 'Para que los animales no las vean', 'Porque están enfermas', 'Para flotar en las lagunas'],
      dato: 'En el páramo puede hacer calor de día y helar de noche: las plantas se adaptaron a esos cambios.',
    },
    {
      p: '¿Qué gas liberan las plantas en la fotosíntesis que nosotros necesitamos para respirar?',
      o: ['Oxígeno', 'Dióxido de carbono', 'Helio', 'Metano'],
      dato: 'Además, las plantas absorben dióxido de carbono, uno de los gases que calientan el planeta.',
    },
    {
      p: '¿Qué debes hacer con las plantas y flores que encuentres en el sendero?',
      o: ['Observarlas y fotografiarlas sin arrancarlas', 'Llevarte una de recuerdo', 'Pisarlas para abrir camino', 'Arrancar flores para regalar'],
      dato: 'En un área protegida no se extrae nada: lo que encuentres, déjalo donde está.',
    },
    {
      p: '¿Qué parte de la planta absorbe el agua y los nutrientes del suelo?',
      o: ['La raíz', 'La flor', 'El fruto', 'La hoja'],
      dato: 'Las raíces también sujetan el suelo y ayudan a evitar derrumbes y erosión.',
    },
  ],

  fauna: [
    {
      p: '¿Cuál es el único oso que vive en Sudamérica?',
      o: ['El oso de anteojos', 'El oso pardo', 'El oso polar', 'El oso panda'],
      dato: 'Se llama así por las manchas claras alrededor de sus ojos: ¡cada oso tiene un dibujo diferente!',
    },
    {
      p: '¿De qué se alimenta principalmente el oso de anteojos?',
      o: ['De plantas: frutos, bromelias y cogollos', 'Solo de peces', 'Solo de carne', 'De la basura de los turistas'],
      dato: 'Es omnívoro, pero come sobre todo plantas. Al comer frutos dispersa semillas y ayuda a sembrar el bosque.',
    },
    {
      p: '¿Qué ave aparece en el escudo de Colombia?',
      o: ['El cóndor andino', 'El águila calva', 'El colibrí', 'La guacamaya'],
      dato: 'El cóndor es símbolo de libertad y una de las aves voladoras más grandes del mundo.',
    },
    {
      p: '¿Cuánto pueden medir las alas abiertas de un cóndor andino?',
      o: ['Cerca de 3 metros', 'Unos 50 centímetros', 'Apenas 1 metro', 'Más de 10 metros'],
      dato: 'Aprovecha las corrientes de aire caliente para planear durante horas casi sin aletear.',
    },
    {
      p: '¿Qué función cumple el cóndor al alimentarse de animales muertos?',
      o: ['Limpia el ecosistema y evita que se propaguen enfermedades', 'Caza a los animales más fuertes', 'Poliniza las flores', 'Construye nidos para otras aves'],
      dato: 'Los carroñeros son el "equipo de aseo" de la naturaleza.',
    },
    {
      p: '¿Qué ave puede volar hacia atrás y quedarse quieta en el aire?',
      o: ['El colibrí', 'El cóndor', 'La gallina', 'El pato'],
      dato: 'Bate sus alas decenas de veces por segundo y es un gran polinizador de flores.',
    },
    {
      p: 'Colombia es el país con mayor número de especies de...',
      o: ['Aves', 'Osos', 'Pingüinos', 'Camellos'],
      dato: 'En Colombia se han registrado más de 1.900 especies de aves.',
    },
    {
      p: '¿Qué animal de montaña tiene una trompa corta y es pariente lejano del caballo y del rinoceronte?',
      o: ['La danta de montaña', 'El oso hormiguero', 'El venado', 'El armadillo'],
      dato: 'La danta es una gran "jardinera": dispersa semillas en sus largos recorridos. Está en peligro de extinción.',
    },
    {
      p: '¿Por qué no se debe alimentar a los animales silvestres?',
      o: ['Les causa enfermedades y cambia su comportamiento natural', 'Porque engordan demasiado rápido', 'Porque se vuelven mascotas felices', 'No hay ningún problema en hacerlo'],
      dato: 'Un animal acostumbrado a la comida humana se acerca a carreteras y personas, y corre peligro.',
    },
    {
      p: '¿Cuál de estos animales es un anfibio?',
      o: ['La rana', 'La lagartija', 'La serpiente', 'La tortuga'],
      dato: 'Las ranas respiran en parte por la piel: por eso son excelentes indicadoras de un ambiente sano.',
    },
    {
      p: '¿Qué felino americano habita también en la alta montaña de los Andes?',
      o: ['El puma', 'El león', 'El tigre', 'El guepardo'],
      dato: 'El león, el tigre y el guepardo viven en África y Asia; el puma es nativo de América.',
    },
    {
      p: '¿Qué es un animal polinizador?',
      o: ['Uno que transporta polen de flor en flor', 'Uno que come solo carne', 'Uno que vive bajo tierra', 'Uno que duerme todo el invierno'],
      dato: 'Abejas, mariposas, colibríes y murciélagos ayudan a que las plantas produzcan frutos y semillas.',
    },
  ],

  paisajes: [
    {
      p: '¿Cómo se llama el ecosistema de alta montaña que está entre el bosque andino y las nieves?',
      o: ['El páramo', 'El desierto', 'El manglar', 'La sabana'],
      dato: 'Se encuentra, más o menos, entre los 3.000 y los 4.500 metros sobre el nivel del mar.',
    },
    {
      p: '¿En qué cordillera se encuentra la Sierra Nevada del Cocuy?',
      o: ['Cordillera Oriental', 'Cordillera Occidental', 'Cordillera Central', 'Cordillera de los Alpes'],
      dato: 'Es la masa de nieve y hielo más grande de la Cordillera Oriental colombiana.',
    },
    {
      p: '¿Cuál es el pico más alto de la Sierra Nevada del Cocuy?',
      o: ['Ritacuba Blanco', 'Pan de Azúcar', 'Púlpito del Diablo', 'Nevado del Ruiz'],
      dato: 'El Ritacuba Blanco supera los 5.300 metros sobre el nivel del mar.',
    },
    {
      p: '¿Qué les está pasando a los glaciares de Colombia?',
      o: ['Se están derritiendo por el calentamiento global', 'Crecen un poco más cada año', 'Se están convirtiendo en volcanes', 'No han cambiado en siglos'],
      dato: 'Desde el siglo XIX Colombia ha perdido la mayor parte de su área glaciar, y varios nevados ya desaparecieron.',
    },
    {
      p: '¿Qué país tiene aproximadamente la mitad de los páramos del mundo?',
      o: ['Colombia', 'Brasil', 'México', 'Chile'],
      dato: 'Millones de colombianos beben agua que nace en un páramo.',
    },
    {
      p: '¿En qué departamentos se ubica el Parque Nacional Natural El Cocuy?',
      o: ['Boyacá, Arauca y Casanare', 'Antioquia y Chocó', 'Nariño y Cauca', 'Magdalena y La Guajira'],
      dato: 'Fue declarado parque nacional en 1977 y protege páramos, glaciares, lagunas y bosques.',
    },
    {
      p: '¿Qué se forma cuando un río cae desde una gran altura?',
      o: ['Una cascada', 'Una laguna', 'Un delta', 'Un glaciar'],
      dato: 'Las cascadas oxigenan el agua y crean rincones húmedos donde crecen musgos y helechos.',
    },
    {
      p: '¿De dónde nace gran parte del agua de los ríos andinos?',
      o: ['De páramos, glaciares y lagunas de alta montaña', 'Del mar', 'De pozos petroleros', 'De las nubes de la ciudad'],
      dato: 'Proteger la alta montaña es proteger el agua de las ciudades y del campo.',
    },
    {
      p: '¿Qué pasa con la temperatura a medida que subimos una montaña?',
      o: ['Disminuye', 'Aumenta', 'Se mantiene igual', 'Solo cambia de noche'],
      dato: 'En promedio baja unos 6 °C por cada 1.000 metros de altura.',
    },
    {
      p: '¿Cómo se llaman las lagunas que dejaron los antiguos glaciares al retirarse?',
      o: ['Lagunas glaciares', 'Manglares', 'Oasis', 'Estuarios'],
      dato: 'En la Sierra Nevada del Cocuy hay muchas lagunas de origen glaciar, como la Laguna Grande de la Sierra.',
    },
    {
      p: '¿Cuál es una de las principales amenazas para los páramos?',
      o: ['La ganadería, la agricultura y la minería sin control', 'El exceso de frailejones', 'Las aves migratorias', 'La niebla de las mañanas'],
      dato: 'Cuando se quema o se ara el páramo, su suelo pierde la capacidad de guardar agua.',
    },
    {
      p: '¿Qué es una cuenca hidrográfica?',
      o: ['El territorio cuyas aguas drenan hacia un mismo río o lago', 'Un tipo de montaña', 'Una represa artificial', 'Un recipiente para recoger lluvia'],
      dato: 'Todo lo que hacemos en la parte alta de una cuenca afecta a quienes viven río abajo.',
    },
  ],

  cultura: [
    {
      p: '¿Qué significa aproximadamente la palabra "U\'wa"?',
      o: ['Gente inteligente que sabe hablar', 'Hijos del sol', 'Guerreros del río', 'Cazadores de la selva'],
      dato: 'Así se nombra a sí mismo este pueblo indígena de la Sierra Nevada del Cocuy.',
    },
    {
      p: '¿Dónde habita principalmente el pueblo U\'wa?',
      o: ['En la Sierra Nevada del Cocuy y su piedemonte', 'En el desierto de La Guajira', 'En la selva del Amazonas', 'En las islas de San Andrés'],
      dato: 'Su territorio abarca zonas de Boyacá, Arauca, Norte de Santander, Santander y Casanare.',
    },
    {
      p: 'Para el pueblo U\'wa, el petróleo (ruiría) es...',
      o: ['La sangre de la Madre Tierra', 'Un combustible sin importancia', 'Un regalo de los visitantes', 'Agua sucia que hay que sacar'],
      dato: 'Por eso consideran que extraerlo es herir a la tierra y romper el equilibrio del mundo.',
    },
    {
      p: '¿Por qué el pueblo U\'wa es reconocido en el mundo?',
      o: [
        'Por su defensa pacífica del territorio frente a la explotación petrolera',
        'Por construir grandes pirámides',
        'Por inventar un deporte olímpico',
        'Por fundar la ciudad de Bogotá',
      ],
      dato: 'En los años 90 su lucha contra un proyecto petrolero en su territorio recibió apoyo internacional.',
    },
    {
      p: 'En 1998, el líder U\'wa Berito Kuwaru\'wa recibió un importante premio ambiental. ¿Cuál?',
      o: ['El Premio Goldman', 'El Premio Nobel de Física', 'El Balón de Oro', 'El Premio Óscar'],
      dato: 'El Goldman es conocido como el "Nobel verde" y reconoce a defensores del medio ambiente.',
    },
    {
      p: '¿A qué familia de lenguas pertenece la lengua U\'wa?',
      o: ['Chibcha', 'Quechua', 'Arawak', 'Caribe'],
      dato: 'Es la misma gran familia de lenguas de otros pueblos, como los muiscas.',
    },
    {
      p: '¿Con qué nombre llamaban antiguamente los foráneos al pueblo U\'wa?',
      o: ['Tunebos', 'Muiscas', 'Wayuu', 'Emberá'],
      dato: 'Hoy se reconoce y se usa su nombre propio: U\'wa.',
    },
    {
      p: 'Para los U\'wa, la Sierra Nevada del Cocuy (Zizuma) es...',
      o: ['Un lugar sagrado que debe ser respetado', 'Una pista de esquí', 'Una mina de oro', 'Un lugar sin importancia'],
      dato: 'Por respeto a ese territorio sagrado y para cuidar los glaciares, hoy no se permite subir a las cumbres nevadas.',
    },
    {
      p: '¿Cuál es la actitud correcta al visitar un territorio indígena?',
      o: [
        'Respetar sus normas y lugares sagrados, y pedir permiso antes de tomar fotos',
        'Entrar a cualquier lugar sin preguntar',
        'Llevarse objetos como recuerdo',
        'Grabar a las personas sin avisar',
      ],
      dato: 'El respeto por la cultura también es parte del turismo responsable.',
    },
    {
      p: 'La forma de vida U\'wa busca el equilibrio entre...',
      o: ['Las personas, la naturaleza y el mundo espiritual', 'El dinero y el comercio', 'Las fábricas y las ciudades', 'Los carros y las carreteras'],
      dato: 'Para los U\'wa, sus cantos y rituales ayudan a mantener el orden del mundo.',
    },
    {
      p: '¿Qué es un resguardo indígena?',
      o: ['Un territorio colectivo reconocido legalmente a una comunidad indígena', 'Una cárcel para indígenas', 'Un parque de diversiones', 'Un museo de objetos antiguos'],
      dato: 'Las tierras de un resguardo no se pueden vender: pertenecen a toda la comunidad.',
    },
    {
      p: '¿Qué podemos aprender de pueblos indígenas como los U\'wa?',
      o: ['A cuidar la tierra como un ser vivo del que hacemos parte', 'A contaminar solo los domingos', 'A construir más carreteras', 'A cazar todos los animales'],
      dato: 'Muchos pueblos indígenas son guardianes de los ecosistemas mejor conservados del país.',
    },
  ],

  servicios: [
    {
      p: '¿Qué debes hacer con la basura que generes durante la visita?',
      o: ['Llevarla de regreso o depositarla en los puntos ecológicos', 'Enterrarla junto al sendero', 'Esconderla detrás de una roca', 'Quemarla en una fogata'],
      dato: 'Un empaque plástico puede tardar cientos de años en degradarse.',
    },
    {
      p: 'En Colombia, ¿de qué color es la caneca para residuos aprovechables (plástico, vidrio, papel, metal)?',
      o: ['Blanca', 'Negra', 'Verde', 'Roja'],
      dato: 'Blanca: aprovechables. Verde: orgánicos. Negra: no aprovechables.',
    },
    {
      p: '¿Qué residuos van en la caneca verde?',
      o: ['Orgánicos: restos de comida y cáscaras', 'Botellas plásticas', 'Latas de gaseosa', 'Servilletas usadas'],
      dato: 'Los residuos orgánicos se pueden convertir en abono (compost) para las plantas.',
    },
    {
      p: '¿Por qué es importante caminar solo por los senderos señalizados?',
      o: ['Para no dañar la vegetación y evitar perderse', 'Para caminar más rápido', 'Porque así salen mejores fotos', 'No es importante'],
      dato: 'Pisar fuera del sendero compacta el suelo y destruye plantas que tardan años en crecer.',
    },
    {
      p: '¿Quién te puede orientar de forma segura e informada dentro del parque?',
      o: ['Un guía o intérprete ambiental autorizado', 'Cualquier persona en redes sociales', 'Nadie, es mejor ir solo', 'El GPS del carro'],
      dato: 'Los guías locales conocen el clima, las rutas y la cultura del territorio.',
    },
    {
      p: 'Si sientes mareo, dolor de cabeza o falta de aire por la altura, debes...',
      o: ['Descansar, hidratarte, avisar al guía y descender si empeora', 'Correr para llegar más rápido', 'Ignorarlo y seguir subiendo', 'Tomar una bebida alcohólica'],
      dato: 'Ese malestar se llama mal de altura o soroche: en la montaña el aire tiene menos oxígeno disponible.',
    },
    {
      p: '¿Qué es el ecoturismo?',
      o: [
        'Turismo responsable que conserva la naturaleza y beneficia a las comunidades locales',
        'Viajar solo en avión',
        'Hacer turismo en centros comerciales',
        'Acampar donde uno quiera',
      ],
      dato: 'El ecoturismo también enseña: cada visita es una oportunidad de aprender.',
    },
    {
      p: '¿Qué es lo más recomendable llevar a una caminata por el páramo?',
      o: ['Ropa abrigada, impermeable, agua y protector solar', 'Sandalias y vestido de baño', 'Solo una camiseta', 'Un parlante a todo volumen'],
      dato: 'En el páramo el clima cambia rápido: puede haber sol fuerte, lluvia y frío el mismo día.',
    },
    {
      p: '¿Está permitido hacer fogatas en cualquier lugar del parque?',
      o: ['No, pueden provocar incendios forestales', 'Sí, siempre que haga frío', 'Sí, si es de noche', 'Sí, si se usan frailejones como leña'],
      dato: 'Un incendio en el páramo puede destruir en horas lo que la naturaleza tardó siglos en formar.',
    },
    {
      p: '¿Cuál es la línea única de emergencias en Colombia?',
      o: ['123', '321', '777', '999'],
      dato: 'Desde esa línea te comunican con la Policía, los Bomberos y los servicios de salud.',
    },
    {
      p: '¿Por qué se pide no poner música a alto volumen en el parque?',
      o: ['Porque estresa a la fauna y molesta a otros visitantes', 'Porque gasta mucha batería', 'Porque está prohibido cantar', 'Porque los árboles se duermen'],
      dato: 'Disfruta los sonidos de la naturaleza: el viento, el agua y el canto de las aves.',
    },
    {
      p: '¿Qué significa el principio "No dejar rastro"?',
      o: ['Visitar la naturaleza sin dejar huella de nuestro paso', 'Borrar las huellas de los animales', 'No tomar fotografías', 'Caminar siempre de noche'],
      dato: 'Incluye llevarte tu basura, respetar la fauna y dejar todo como lo encontraste.',
    },
  ],
}

// Retos: los califica el moderador (✔ lo lograron / ✘ no lo lograron).
// segundos: duración del cronómetro del reto.
export const RETOS = [
  { texto: 'Imita el canto de un ave durante 10 segundos. ¡Tu equipo debe adivinar cuál es!', segundos: 30 },
  { texto: 'Nombra 5 animales que vivan en Colombia, sin repetir.', segundos: 20 },
  { texto: 'Mímica: representa a un oso de anteojos buscando comida. Sin hablar, tu equipo debe adivinarlo.', segundos: 30 },
  { texto: 'Di 3 acciones para cuidar el agua.', segundos: 15 },
  { texto: 'Haz 10 sentadillas como si estuvieras subiendo al páramo.', segundos: 25 },
  { texto: 'Nombra 4 plantas o flores diferentes.', segundos: 15 },
  { texto: 'Equilibrio de garza: párate en un solo pie sin apoyarte hasta que termine el tiempo.', segundos: 15 },
  { texto: 'Inventa una rima corta sobre el frailejón.', segundos: 30 },
  { texto: 'Dibuja un cóndor en el aire con tu dedo. Tu equipo debe adivinar qué es.', segundos: 30 },
  { texto: 'Nombra los 3 colores de las canecas de reciclaje y qué va en cada una.', segundos: 20 },
  { texto: 'Mímica: imita a un colibrí tomando néctar de una flor.', segundos: 20 },
  { texto: 'Di 5 palabras relacionadas con el páramo, sin repetir.', segundos: 20 },
  { texto: 'Todo el equipo: formen con sus cuerpos una montaña nevada.', segundos: 15 },
  { texto: 'Explica por qué no se debe arrancar un frailejón.', segundos: 20 },
  { texto: 'Trabalenguas: di 3 veces seguidas y rápido "El cóndor coronado corona la cordillera".', segundos: 20 },
]
