// ═══════════════════════════════════════════
//           daBeast — DATA.JS
// ═══════════════════════════════════════════

// FRASES MOTIVACIONALES
const QUOTES = [
  "Hoy entrenás o seguís negociando con la almohada.",
  "La constancia le gana al talento dormido.",
  "Un día más cerca de tu prime.",
  "El cuerpo escucha lo que repetís.",
  "No hace falta ser el más fuerte, hace falta ser el más consistente.",
  "Tu yo del futuro te lo va a agradecer.",
  "El dolor de hoy es el orgullo de mañana.",
  "Cada rep que no quisiste hacer te hizo más fuerte.",
  "No hay atajos que valgan la pena.",
  "El progreso no grita, susurra en cada repetición.",
  "La motivación arranca, la disciplina termina.",
  "Tu cuerpo puede más de lo que tu cabeza acepta.",
  "Nadie recuerda el día que descansaste sin mérito.",
  "Entrená como si alguien te estuviera mirando. Vos mismo.",
  "La versión pro de vos ya está entrenando. ¿Vos?",
  "No busques la perfección. Buscá la progresión.",
  "Cada entrenamiento cambia tu química interna.",
  "La bestia no espera el momento ideal. Lo crea.",
  "Levantate temprano o que te ganen de mano.",
  "Un mal entrenamiento sigue siendo mejor que ninguno.",
  "Fuerza no es lo que podés levantar. Es lo que no dejás caer.",
  "El partido se gana en semanas de entrenamiento, no en minutos de partido.",
  "Si no duele un poco, no está pasando nada.",
  "Tu límite es más lejano de lo que creés.",
];

// EJERCICIOS POR DÍA
const EXERCISES = {
  day1: [
    {
      id: "press_banca",
      name: "Press de Banca",
      sets: 4, reps: "8-10", rest: 90,
      muscle: "Pecho",
      gif: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
      defaultWeight: 60,
      technique: {
        postura: "Espalda con leve arco natural, pies firmes en el suelo, escápulas retraídas y deprimidas contra el banco.",
        agarre: "Agarre prono un poco más ancho que los hombros. Muñecas neutras, no dobladas.",
        respiracion: "Inspirá antes de bajar la barra. Exhalá al empujar hacia arriba.",
        errores: "No rebotar la barra en el pecho. No levantar los glúteos del banco. No desenganchar los pies.",
        seguridad: "Usá collarines. Con peso máximo, tené un spotter. Bajá controlado.",
        tecnica: "Bajá la barra al pecho medio-bajo, codos a 45-75°. Empujá de forma explosiva hacia arriba y levemente hacia atrás."
      }
    },
    {
      id: "press_militar",
      name: "Press Militar con Barra",
      sets: 4, reps: "8-10", rest: 90,
      muscle: "Hombros",
      gif: "https://media.giphy.com/media/3o7TKTDn976rzVgky4/giphy.gif",
      defaultWeight: 40,
      technique: {
        postura: "De pie o sentado, columna neutral, core activado. No hiperextender la lumbar.",
        agarre: "Agarre prono, manos a ancho de hombros o levemente más. Pulgares envolviendo la barra.",
        respiracion: "Exhalá al empujar. Inspirá en el descenso controlado.",
        errores: "No arquear la lumbar para empujar. No usar impulso del cuerpo. No bajar rápido.",
        seguridad: "Empezá con peso moderado. Si duelen los hombros, probá con mancuernas.",
        tecnica: "Barra frente al cuerpo a altura del mentón. Empujá hacia arriba en línea recta. Al frente de la cabeza, no detrás."
      }
    },
    {
      id: "remo_barra",
      name: "Remo con Barra",
      sets: 4, reps: "8-10", rest: 90,
      muscle: "Espalda",
      gif: "https://media.giphy.com/media/26ufcVAp3AiKu2RKo/giphy.gif",
      defaultWeight: 50,
      technique: {
        postura: "Inclinado hacia adelante ~45°, rodillas levemente flexionadas, espalda recta, core apretado.",
        agarre: "Agarre prono o supino, manos a ancho de hombros o más.",
        respiracion: "Exhalá al tirar. Inspirá en el descenso.",
        errores: "No redondear la espalda. No usar el impulso del torso para subir. No bajar rápido.",
        seguridad: "Con mucho peso, usá cinturón. Si duele la lumbar, reducí el peso.",
        tecnica: "Tirá hacia el ombligo bajo, codos pegados al cuerpo. Apretá la espalda en la contracción."
      }
    },
    {
      id: "elevaciones_laterales",
      name: "Elevaciones Laterales",
      sets: 4, reps: "12-15", rest: 60,
      muscle: "Hombros",
      gif: "https://media.giphy.com/media/l0HlFZfztamspT3O0/giphy.gif",
      defaultWeight: 10,
      technique: {
        postura: "De pie, columna recta, rodillas levemente flexionadas. Torso estable.",
        agarre: "Mancuernas en pronación (pulgar hacia adelante). Pulgares levemente abajo al subir.",
        respiracion: "Exhalá al subir. Inspirá al bajar controlado.",
        errores: "No usar impulso. No elevar por encima de los hombros. No doblar los codos al 90°.",
        seguridad: "Empezá liviano. Es un ejercicio de aislamiento, no de ego.",
        tecnica: "Elevar con leve flexión de codo hasta altura de hombros. Controlar el descenso 2-3 segundos."
      }
    },
    {
      id: "fondos_paralelas",
      name: "Fondos en Paralelas",
      sets: 3, reps: "10-12", rest: 90,
      muscle: "Pecho / Tríceps",
      gif: "https://media.giphy.com/media/3o7TKq3C3HeOFpWdG0/giphy.gif",
      defaultWeight: 0,
      technique: {
        postura: "Torso levemente inclinado hacia adelante para enfatizar pecho. Codos controlados.",
        agarre: "Agarre neutro sobre las paralelas. Hombros bajos y estables.",
        respiracion: "Inspirá al bajar. Exhalá al empujar.",
        errores: "No dejar caer rápido. No descender más de lo que el hombro permite sin dolor.",
        seguridad: "Si sentís presión en el hombro, reducí el rango. Podés usar asistencia con banda.",
        tecnica: "Bajá hasta que los codos formen ~90°, luego empujá al punto inicial controlando el movimiento."
      }
    },
    {
      id: "curl_bicep",
      name: "Curl de Bíceps con Mancuernas",
      sets: 3, reps: "10-12", rest: 60,
      muscle: "Bíceps",
      gif: "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif",
      defaultWeight: 14,
      technique: {
        postura: "De pie, columna recta. Codos pegados al cuerpo durante todo el movimiento.",
        agarre: "Supino (palma hacia arriba). Alternar o ambos brazos.",
        respiracion: "Exhalá al subir. Inspirá al bajar.",
        errores: "No balancear el torso. No soltar los codos del cuerpo. No bajar brusco.",
        seguridad: "Peso manejable. Si duelen los codos, reducí el rango o peso.",
        tecnica: "Flexionás completamente el codo sin que los hombros se adelanten. Pausá arriba y bajá 2s."
      }
    },
  ],

  day2: [
    {
      id: "sentadilla",
      name: "Sentadilla con Barra",
      sets: 4, reps: "8-10", rest: 120,
      muscle: "Cuádriceps / Glúteos",
      gif: "https://media.giphy.com/media/3oKIPxigNSFMXNZKs8/giphy.gif",
      defaultWeight: 70,
      technique: {
        postura: "Barra sobre trapecios. Pies a ancho de cadera/hombros, puntas levemente afuera. Core apretado.",
        agarre: "Agarre cómodo en la barra, codos hacia abajo.",
        respiracion: "Maniobra Valsalva: inspirá hondo antes de bajar, exhalá al subir.",
        errores: "No dejar que las rodillas colapsen hacia adentro. No elevar los talones. No redondear la lumbar.",
        seguridad: "Usá rack de seguridad. Con mucho peso, usá cinturón de levantamiento.",
        tecnica: "Bajá controlado manteniendo el torso erguido. Rodillas en línea con los pies. Sube desde el talón."
      }
    },
    {
      id: "peso_muerto_rumano",
      name: "Peso Muerto Rumano",
      sets: 4, reps: "10", rest: 90,
      muscle: "Isquiotibiales / Glúteos",
      gif: "https://media.giphy.com/media/26ufkD9yWVHRkXHmM/giphy.gif",
      defaultWeight: 60,
      technique: {
        postura: "De pie, rodillas levemente flexionadas, espalda recta en todo el movimiento.",
        agarre: "Agarre prono o mixto, manos a ancho de hombros.",
        respiracion: "Inspirá al bajar, exhalá al subir.",
        errores: "No redondear la columna. No bajar la barra más allá de la capacidad de la cadera.",
        seguridad: "Enfocarse en sentir el estiramiento isquiotibial, no en bajar la barra al máximo.",
        tecnica: "Empujá las caderas hacia atrás mientras bajás la barra por las piernas. Subí desde los glúteos."
      }
    },
    {
      id: "prensa",
      name: "Prensa de Piernas",
      sets: 4, reps: "12-15", rest: 90,
      muscle: "Cuádriceps",
      gif: "https://media.giphy.com/media/3o7TKWBh87t3P9jNd2/giphy.gif",
      defaultWeight: 100,
      technique: {
        postura: "Espalda apoyada contra el respaldo. Pies a ancho de cadera.",
        agarre: "Manos en los agarres laterales del asiento.",
        respiracion: "Exhalá al empujar. Inspirá al volver.",
        errores: "No desbloquear completamente las rodillas. No elevar la pelvis del asiento.",
        seguridad: "No bloquear las rodillas. Ajustá bien los seguros de la máquina.",
        tecnica: "Bajá controlado hasta 90° de rodilla. Empujá desde el talón sin bloquear la articulación."
      }
    },
    {
      id: "zancadas",
      name: "Zancadas con Mancuernas",
      sets: 3, reps: "12 c/pierna", rest: 60,
      muscle: "Cuádriceps / Glúteos",
      gif: "https://media.giphy.com/media/l0HlDHiMxMFQHHgac/giphy.gif",
      defaultWeight: 16,
      technique: {
        postura: "Torso erguido, core activado. Paso largo hacia adelante.",
        agarre: "Mancuernas a los lados del cuerpo.",
        respiracion: "Inspirá al bajar. Exhalá al subir.",
        errores: "No dejar que la rodilla delantera sobrepase el pie. No inclinar el torso.",
        seguridad: "Hacer el movimiento controlado para no perder el equilibrio.",
        tecnica: "Baja la rodilla trasera cerca del suelo. Empujá con el talón delantero para volver."
      }
    },
    {
      id: "gemelos",
      name: "Elevaciones de Gemelos",
      sets: 4, reps: "20-25", rest: 45,
      muscle: "Gemelos",
      gif: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
      defaultWeight: 0,
      technique: {
        postura: "De pie con el antepié en un escalón o superficie elevada. Talones libres.",
        agarre: "Manos apoyadas para equilibrio.",
        respiracion: "Exhalá al subir, inspirá al bajar.",
        errores: "No rebotar en el descenso. No hacer el rango parcial.",
        seguridad: "Rango completo: bajar talones bien abajo, subir en punta de pie completo.",
        tecnica: "Subí a máxima extensión, mantené 1 segundo, bajá 3 segundos controlado."
      }
    },
    {
      id: "step_ups",
      name: "Step Ups con Mancuernas",
      sets: 3, reps: "12 c/pierna", rest: 60,
      muscle: "Glúteos / Cuádriceps",
      gif: "https://media.giphy.com/media/3oKIPxigNSFMXNZKs8/giphy.gif",
      defaultWeight: 12,
      technique: {
        postura: "Cajón o banco a altura de rodilla. Torso erguido.",
        agarre: "Mancuernas a los lados.",
        respiracion: "Exhalá al subir. Inspirá al bajar.",
        errores: "No impulsar con la pierna trasera. No inclinarse adelante.",
        seguridad: "Asegurate que el cajón sea estable.",
        tecnica: "Subí lento empujando desde el talón de la pierna adelantada. Bajá controlado."
      }
    },
  ],

  day3: [
    {
      id: "peso_muerto",
      name: "Peso Muerto Convencional",
      sets: 4, reps: "5-6", rest: 180,
      muscle: "Full Body",
      gif: "https://media.giphy.com/media/26ufkD9yWVHRkXHmM/giphy.gif",
      defaultWeight: 80,
      technique: {
        postura: "Pies a ancho de cadera. Barra sobre los empeines. Caderas hacia atrás, espalda recta.",
        agarre: "Agarre doble prono o mixto, brazos fuera de las rodillas.",
        respiracion: "Maniobra Valsalva. Exhalá al terminar de subir.",
        errores: "No redondear la espalda. No dejar que la barra se aleje del cuerpo. No tirar con los brazos.",
        seguridad: "Empezá liviano para dominar la técnica. Cinturón en pesos altos.",
        tecnica: "Empujá el suelo hacia abajo con los pies, no tires hacia arriba. La barra sube pegada al cuerpo."
      }
    },
    {
      id: "dominadas",
      name: "Dominadas / Pull-ups",
      sets: 4, reps: "máx (mín 5)", rest: 90,
      muscle: "Espalda / Bíceps",
      gif: "https://media.giphy.com/media/26ufcVAp3AiKu2RKo/giphy.gif",
      defaultWeight: 0,
      technique: {
        postura: "Colgado con brazos extendidos. Escápulas deprimidas antes de empezar.",
        agarre: "Prono (pull-up) o supino (chin-up), a ancho de hombros o más.",
        respiracion: "Exhalá al subir. Inspirá al bajar.",
        errores: "No usar impulso del cuerpo. No subir parcial. No soltar rápido.",
        seguridad: "Si no podés, usá banda elástica de asistencia o máquina asistida.",
        tecnica: "Tirá los codos hacia las caderas. Mentón sobre la barra. Bajá 3 segundos controlado."
      }
    },
    {
      id: "clean_press",
      name: "Clean & Press con Mancuernas",
      sets: 3, reps: "8", rest: 90,
      muscle: "Full Body Explosivo",
      gif: "https://media.giphy.com/media/3o7TKTDn976rzVgky4/giphy.gif",
      defaultWeight: 20,
      technique: {
        postura: "Posición atlética. Rodillas flexionadas, caderas atrás. Mancuernas al frente.",
        agarre: "Prono neutro.",
        respiracion: "Exhalá al explotar hacia arriba.",
        errores: "No usar solo brazos. No perder el equilibrio en la fase de limpia.",
        seguridad: "Con pesos bajos al aprender. Suelo sin obstáculos.",
        tecnica: "Tirá explosivo hacia arriba usando las caderas, lleva las mancuernas al pecho y luego empujá sobre la cabeza."
      }
    },
    {
      id: "burpees",
      name: "Burpees",
      sets: 3, reps: "10-15", rest: 60,
      muscle: "Full Body / Cardio",
      gif: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
      defaultWeight: 0,
      technique: {
        postura: "Comenzá de pie. Cuerpo derecho.",
        agarre: "Manos al suelo al bajar.",
        respiracion: "Rítmica. No retengas el aire.",
        errores: "No arquear la lumbar en la posición de plancha. No caer con impacto al aterrizar.",
        seguridad: "Amortiguá el salto. Si duelen las rodillas, saltá sin impacto.",
        tecnica: "Baja al suelo, plancha, flexión opcional, salta los pies hacia adelante, salta y aplaude arriba."
      }
    },
    {
      id: "press_inclinado",
      name: "Press Inclinado con Mancuernas",
      sets: 3, reps: "10-12", rest: 90,
      muscle: "Pecho Superior",
      gif: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
      defaultWeight: 24,
      technique: {
        postura: "Banco a 30-45°. Espalda apoyada, core activo.",
        agarre: "Mancuernas en pronación. Codos a 45-60° del cuerpo.",
        respiracion: "Inspirá al bajar. Exhalá al empujar.",
        errores: "No abrí demasiado los codos (lesión de hombro). No arquear la espalda.",
        seguridad: "Si duelen los hombros, reducí el ángulo del banco.",
        tecnica: "Bajá las mancuernas hasta los costados del pecho. Empujá hacia arriba y levemente adentro."
      }
    },
    {
      id: "plancha",
      name: "Plancha Abdominal",
      sets: 3, reps: "45-60 seg", rest: 45,
      muscle: "Core",
      gif: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
      defaultWeight: 0,
      technique: {
        postura: "Apoyado en codos y punteras. Cuerpo en línea recta de cabeza a talones.",
        agarre: "Codos bajo los hombros.",
        respiracion: "Respiración diafragmática continua.",
        errores: "No levantar las caderas. No dejar que caigan. No mirar adelante (cervical).",
        seguridad: "Si duñelen los hombros, probá variantes en manos estiradas.",
        tecnica: "Activá el glúteo, apretá el abdomen, mantené la posición. Podés progresar con variantes dinámicas."
      }
    },
  ]
};

// RECETAS ARGENTINAS
const RECIPES = [
  // DESAYUNO
  {
    id: "r1", category: "desayuno", tags: ["barata", "proteina", "rapida"],
    name: "Avena proteica con banana",
    emoji: "🥣",
    cals: 380, protein: 28, carbs: 45, fat: 8,
    ingredients: ["60g avena arrollada", "1 scoop proteína (opcional)", "1 banana madura", "200ml leche descremada o agua", "canela al gusto"],
    prep: "Hervir la leche, agregar avena y cocinar 3-4min. Agregar la proteína fuera del fuego, revolver. Rodajas de banana encima y canela."
  },
  {
    id: "r2", category: "desayuno", tags: ["barata", "proteina", "saciante"],
    name: "Huevos revueltos con tostadas",
    emoji: "🍳",
    cals: 420, protein: 30, carbs: 32, fat: 14,
    ingredients: ["3 huevos", "2 rebanadas pan integral", "1/2 tomate", "sal, pimienta", "1 cdita aceite"],
    prep: "Batir huevos con sal y pimienta. Cocinar a fuego bajo en sartén con aceite, revolviendo despacio. Servir con tostadas y tomate."
  },
  {
    id: "r3", category: "desayuno", tags: ["barata", "rapida"],
    name: "Yogur griego con granola y fruta",
    emoji: "🫙",
    cals: 310, protein: 20, carbs: 38, fat: 6,
    ingredients: ["200g yogur griego descremado", "30g granola sin azúcar", "1 fruta de estación", "miel opcional"],
    prep: "Poner yogur en un vaso, agregar granola, frutas cortadas. Miel opcional al gusto."
  },
  {
    id: "r4", category: "desayuno", tags: ["proteina", "saciante"],
    name: "Omelette de claras con queso",
    emoji: "🥚",
    cals: 290, protein: 35, carbs: 4, fat: 12,
    ingredients: ["4 claras de huevo", "1 huevo entero", "30g queso untable descremado", "sal, pimienta", "cebollín o perejil"],
    prep: "Batir claras y huevo. Cocinar en sartén antiadherente. Agregar queso cuando está casi listo, doblar y servir."
  },
  {
    id: "r5", category: "desayuno", tags: ["barata", "rapida"],
    name: "Infusión + tostadas con palta",
    emoji: "🥑",
    cals: 260, protein: 8, carbs: 28, fat: 14,
    ingredients: ["2 tostadas pan integral", "1/2 palta madura", "sal y limón", "café o té"],
    prep: "Tostar el pan. Pisar la palta con sal y limón. Untar sobre las tostadas."
  },

  // ALMUERZO
  {
    id: "r6", category: "almuerzo", tags: ["proteina", "saciante", "barata"],
    name: "Pollo a la plancha con arroz y ensalada",
    emoji: "🍗",
    cals: 520, protein: 45, carbs: 48, fat: 10,
    ingredients: ["200g pechuga de pollo", "80g arroz integral", "lechuga, tomate, zanahoria", "sal, pimienta, ajo en polvo", "1 cdita aceite de oliva"],
    prep: "Condimentar el pollo y sellar a la plancha 4-5 min por lado. Hervir el arroz. Ensalada con vinagreta de limón."
  },
  {
    id: "r7", category: "almuerzo", tags: ["proteina", "barata"],
    name: "Lomo de cerdo al horno con batata",
    emoji: "🥩",
    cals: 490, protein: 42, carbs: 36, fat: 12,
    ingredients: ["200g lomo de cerdo", "1 batata mediana", "ajo, romero, sal", "1 cdita aceite"],
    prep: "Marinar el cerdo con ajo y romero. Hornear a 180° 25 min. Batata en cubos al horno con aceite y sal."
  },
  {
    id: "r8", category: "almuerzo", tags: ["proteina", "barata", "saciante"],
    name: "Milanesa de pollo con puré de calabaza",
    emoji: "🍖",
    cals: 550, protein: 44, carbs: 42, fat: 14,
    ingredients: ["200g pechuga de pollo aplastada", "pan rallado integral", "1 huevo", "300g calabaza", "sal, ajo"],
    prep: "Pasar el pollo por huevo y pan rallado. Hornear o fritar con poco aceite. Hervir calabaza y pisarla con sal y poco aceite."
  },
  {
    id: "r9", category: "almuerzo", tags: ["barata", "rapida"],
    name: "Sopa de lentejas con carne",
    emoji: "🍲",
    cals: 480, protein: 38, carbs: 44, fat: 10,
    ingredients: ["100g lentejas", "100g carne picada magra", "zanahoria, apio, cebolla, tomate", "caldo, sal, pimentón"],
    prep: "Sofreír carne y verduras. Agregar lentejas, caldo y condimentos. Cocinar 25-30 min hasta tiernas."
  },
  {
    id: "r10", category: "almuerzo", tags: ["proteina", "saciante"],
    name: "Atún con pasta y tomate",
    emoji: "🐟",
    cals: 510, protein: 40, carbs: 52, fat: 8,
    ingredients: ["80g pasta integral", "1 lata atún al natural", "salsa de tomate casera", "ajo, orégano, albahaca"],
    prep: "Cocinar pasta al dente. Saltear ajo, agregar tomate y cocinar 5 min. Incorporar atún, mezclar con pasta."
  },

  // MERIENDA
  {
    id: "r11", category: "merienda", tags: ["barata", "rapida", "proteina"],
    name: "Batido proteico casero",
    emoji: "🥤",
    cals: 280, protein: 25, carbs: 28, fat: 5,
    ingredients: ["200ml leche descremada", "1 banana", "1 scoop proteína o 4 claras cocidas", "1 cdita cacao amargo"],
    prep: "Licuar todo hasta obtener consistencia cremosa. Servir frío."
  },
  {
    id: "r12", category: "merienda", tags: ["barata", "rapida"],
    name: "Manzana con mantequilla de maní",
    emoji: "🍎",
    cals: 230, protein: 7, carbs: 30, fat: 10,
    ingredients: ["1 manzana mediana", "2 cdas mantequilla de maní natural", "canela opcional"],
    prep: "Cortar la manzana en gajos. Mojar en mantequilla de maní. Espolvorear canela."
  },
  {
    id: "r13", category: "merienda", tags: ["barata", "proteina"],
    name: "Tostadas con queso y pavo",
    emoji: "🥪",
    cals: 290, protein: 22, carbs: 26, fat: 9,
    ingredients: ["2 tostadas pan integral", "60g pechuga de pavo feteada", "queso descremado", "mostaza o tomate"],
    prep: "Tostar el pan. Armar el sándwich con pavo, queso y condimentos al gusto."
  },
  {
    id: "r14", category: "merienda", tags: ["barata", "rapida"],
    name: "Mate + puñado de frutos secos",
    emoji: "🧉",
    cals: 180, protein: 5, carbs: 8, fat: 15,
    ingredients: ["mate (sin azúcar)", "30g mix de maní, almendras, nueces"],
    prep: "Preparar el mate como de costumbre. Acompañar con los frutos secos."
  },
  {
    id: "r15", category: "merienda", tags: ["proteina", "saciante"],
    name: "Requesón con fruta y miel",
    emoji: "🍯",
    cals: 250, protein: 18, carbs: 28, fat: 5,
    ingredients: ["200g ricota o requesón descremado", "fruta de estación picada", "1 cdita miel", "canela"],
    prep: "Poner la ricota en un bol. Agregar fruta, miel y canela. Mezclar y servir frío."
  },

  // CENA
  {
    id: "r16", category: "cena", tags: ["proteina", "barata", "saciante"],
    name: "Pollo al limón con verduras al horno",
    emoji: "🍋",
    cals: 410, protein: 42, carbs: 22, fat: 12,
    ingredients: ["200g muslos de pollo sin piel", "zucchini, morrón, cebolla morada", "jugo de limón, ajo, orégano", "sal, pimienta, aceite"],
    prep: "Marinar el pollo con limón y ajo 30 min. Hornear a 200° 35 min con las verduras en la misma asadera."
  },
  {
    id: "r17", category: "cena", tags: ["barata", "rapida", "proteina"],
    name: "Omelette de espinaca y queso",
    emoji: "🌿",
    cals: 320, protein: 28, carbs: 8, fat: 18,
    ingredients: ["3 huevos", "puñado de espinaca fresca", "30g queso muzarela magro", "ajo, sal, aceite"],
    prep: "Saltear espinaca con ajo. Batir huevos, verter en sartén, agregar espinaca y queso, doblar."
  },
  {
    id: "r18", category: "cena", tags: ["proteina", "saciante"],
    name: "Salmón a la plancha con ensalada",
    emoji: "🐠",
    cals: 440, protein: 38, carbs: 12, fat: 22,
    ingredients: ["180g filet de salmón", "mix de verdes", "tomate cherry", "vinagreta de limón y oliva", "sal, pimienta, eneldo"],
    prep: "Cocinar el salmón a la plancha 3-4 min por lado. Servir con ensalada y vinagreta."
  },
  {
    id: "r19", category: "cena", tags: ["barata", "rapida"],
    name: "Fideos con salsa de tomate y carne picada",
    emoji: "🍝",
    cals: 490, protein: 32, carbs: 56, fat: 10,
    ingredients: ["80g fideos integrales", "100g carne picada magra", "salsa de tomate natural", "ajo, cebolla, orégano"],
    prep: "Cocinar pasta al dente. Hacer la salsa con carne, ajo, cebolla y tomate. Mezclar."
  },
  {
    id: "r20", category: "cena", tags: ["barata", "saciante", "proteina"],
    name: "Merluza rebozada ligera con arroz",
    emoji: "🐟",
    cals: 420, protein: 36, carbs: 40, fat: 8,
    ingredients: ["200g filet de merluza", "pan rallado integral", "1 clara de huevo", "limón, perejil", "80g arroz"],
    prep: "Pasar la merluza por clara y pan rallado. Hornear a 200° 20 min. Servir con arroz hervido y limón."
  },

  // SNACKS
  {
    id: "r21", category: "snack", tags: ["barata", "rapida"],
    name: "Maní tostado salado",
    emoji: "🥜",
    cals: 160, protein: 7, carbs: 5, fat: 13,
    ingredients: ["30g maní sin cáscara", "sal gruesa opcional"],
    prep: "Tostar en sartén seca 2-3 min. Salar al gusto. Ideal como snack de emergencia."
  },
  {
    id: "r22", category: "snack", tags: ["barata", "proteina"],
    name: "Rodajas de pepino con queso crema",
    emoji: "🥒",
    cals: 120, protein: 6, carbs: 5, fat: 8,
    ingredients: ["1 pepino en rodajas", "50g queso crema descremado", "sal, pimienta, eneldo"],
    prep: "Cortar el pepino. Poner queso crema encima de cada rodaja con sal y eneldo."
  },
  {
    id: "r23", category: "snack", tags: ["barata", "rapida"],
    name: "Banana congelada",
    emoji: "🍌",
    cals: 100, protein: 1, carbs: 25, fat: 0,
    ingredients: ["1 banana madura pelada"],
    prep: "Congelar la banana entera durante 2 horas. Comer como helado natural. Podés agregar cacao."
  },
  {
    id: "r24", category: "snack", tags: ["proteina", "saciante"],
    name: "Huevo duro con sal",
    emoji: "🥚",
    cals: 130, protein: 12, carbs: 1, fat: 9,
    ingredients: ["2 huevos duros", "sal, pimienta o salsa picante"],
    prep: "Hervir los huevos 10 min. Enfriar en agua fría. Pelar y condimentar al gusto."
  },
  {
    id: "r25", category: "snack", tags: ["barata", "rapida"],
    name: "Galletitas de arroz con palta",
    emoji: "🫓",
    cals: 150, protein: 3, carbs: 20, fat: 8,
    ingredients: ["4 galletitas de arroz", "1/4 palta", "sal, limón"],
    prep: "Pisar la palta con sal y limón. Untar sobre las galletitas."
  },
];

// MODOS DE CARDIO
const CARDIO_MODES = {
  base: {
    title: "🚶 Modo Base — Construcción Aeróbica",
    desc: "Para empezar a mejorar el aire desde cero. Bajo impacto, alta consistencia.",
    duration: "30-40 min",
    frequency: "3x por semana",
    exercises: [
      { name: "Caminata suave", duration: "5 min", intensity: "Muy baja", tip: "Calentamiento. Ritmo tranquilo." },
      { name: "Caminata rápida", duration: "10 min", intensity: "Moderada", tip: "Ritmo que te deje hablar pero con esfuerzo." },
      { name: "Trote suave 30s / Caminata 90s", duration: "4 repeticiones", intensity: "Media", tip: "No te ahogues en el trote. Recuperá bien." },
      { name: "Caminata rápida continua", duration: "10 min", intensity: "Moderada", tip: "Mantener ritmo estable." },
      { name: "Enfriamiento suave", duration: "5 min", intensity: "Muy baja", tip: "Bajar la frecuencia cardíaca gradualmente." },
    ]
  },
  partido: {
    title: "⚽ Modo 5 vs 5 — HIIT Específico Fútbol",
    desc: "Imitar la demanda del fútbol 5. Explosiones cortas, recuperación incompleta.",
    duration: "25-30 min",
    frequency: "2x por semana",
    exercises: [
      { name: "Calentamiento dinámico", duration: "5 min", intensity: "Baja", tip: "Círculos de cadera, estocadas, skipping." },
      { name: "Sprint 15m + vuelta trotando", duration: "8 repeticiones", intensity: "Máxima", tip: "Sprint 100%. Vuelta en 15-20 seg." },
      { name: "Descanso activo", duration: "2 min", intensity: "Muy baja", tip: "Caminar. No sentarse." },
      { name: "Cambios de dirección (5-10-5)", duration: "6 repeticiones", intensity: "Alta", tip: "Simular movimiento de partido. Rodillas levemente flexionadas al cambiar." },
      { name: "Saltos con sentadilla", duration: "3x10", intensity: "Alta", tip: "Aterrizar suave. Amortiguá con las rodillas." },
      { name: "Trote suave enfriamiento", duration: "5 min", intensity: "Baja", tip: "Bajar ritmo cardíaco. Respiración profunda." },
    ]
  },
  recuperacion: {
    title: "🧘 Modo Recuperación — Activa Post Partido",
    desc: "Para el día después de un partido o entrenamiento intenso. Regeneración.",
    duration: "25-35 min",
    frequency: "Día post partido",
    exercises: [
      { name: "Bicicleta fija suave", duration: "15 min", intensity: "Muy baja", tip: "Resistencia mínima. Cadencia alta. Solo mover las piernas." },
      { name: "Elongación cuádriceps", duration: "90 seg c/lado", intensity: "Estiramiento", tip: "De pie, talón al glúteo. No forzar la rodilla." },
      { name: "Elongación isquiotibiales", duration: "90 seg c/lado", intensity: "Estiramiento", tip: "Sentado en el suelo, pierna extendida, inclinación suave." },
      { name: "Movilidad de cadera (círculos)", duration: "2 min", intensity: "Movilidad", tip: "Acostado, rodilla al pecho y círculos lentos." },
      { name: "Movilidad de tobillo", duration: "1 min c/pie", intensity: "Movilidad", tip: "Sentado, rotaciones y flexiones de tobillo." },
      { name: "Respiración diafragmática", duration: "5 min", intensity: "Relajación", tip: "Acostado. Mano en el pecho, otra en el abdomen. Solo debe moverse la del abdomen." },
    ]
  },
  respiracion: {
    title: "🫁 Tabique Desviado — Tolerancia Respiratoria",
    desc: "Ejercicios específicos para mejorar la tolerancia al esfuerzo con tabique desviado. No curan el problema pero mejoran la funcionalidad.",
    duration: "15-20 min",
    frequency: "Todos los días",
    exercises: [
      { name: "Respiración nasal diafragmática", duration: "5 min", intensity: "Relajación", tip: "Acostado. Inhalá solo por la nariz (lento, 4 seg). Exhalá por la boca (6 seg). Ponete cómodo." },
      { name: "Box Breathing (cuadrada)", duration: "4 minutos", intensity: "Baja", tip: "Inhalar 4 seg — Retener 4 seg — Exhalar 4 seg — Retener 4 seg. Muy efectivo para el control de CO2." },
      { name: "Respiración unilateral alternada", duration: "3 min", intensity: "Baja", tip: "Tapá una fosa nasal, inhalá por la otra, cambiá. Mejora el flujo de la fosa más bloqueada." },
      { name: "Caminata con respiración nasal exclusiva", duration: "8 min", intensity: "Baja", tip: "Caminar a ritmo cómodo respirando SOLO por la nariz. Si necesitás abrir la boca, bajá el ritmo." },
      { name: "Retención post-exhalación progresiva", duration: "5 repeticiones", intensity: "Media", tip: "Exhalá todo, retenés el máximo posible sin ansiedad. Empezá con 5-10 seg e incrementá." },
    ]
  }
};

// BADGES
const BADGES = [
  { id: "first_day", icon: "🌱", name: "Primer Día", desc: "Completaste tu primer entrenamiento", condition: (stats) => stats.total >= 1 },
  { id: "three_days", icon: "🔥", name: "3 en Raya", desc: "3 días de racha consecutiva", condition: (stats) => stats.streak >= 3 },
  { id: "week", icon: "⚡", name: "Una Semana", desc: "7 días de racha consecutiva", condition: (stats) => stats.streak >= 7 },
  { id: "ten_workouts", icon: "💪", name: "10 Entrenamientos", desc: "10 sesiones completadas", condition: (stats) => stats.total >= 10 },
  { id: "consistent", icon: "📅", name: "Consistente", desc: "3 días entrenados esta semana", condition: (stats) => stats.thisWeek >= 3 },
  { id: "beast_mode", icon: "🦁", name: "Beast Mode", desc: "50 entrenamientos totales", condition: (stats) => stats.total >= 50 },
  { id: "month", icon: "🏆", name: "Un Mes Fuerte", desc: "30 días de racha", condition: (stats) => stats.streak >= 30 },
];

// RESPUESTAS IA COACH
const AI_RESPONSES = {
  rutina: [
    "Hoy toca {dia}. Empezá con 5 minutos de movilidad y activación antes de cargar. Recordá: calidad antes que cantidad. 💪",
    "Para hoy te recomiendo {dia}. Concentrate en los ejercicios compuestos primero cuando tenés más energía. Mandá todo.",
    "¡Arrancá con {dia}! Hacé el calentamiento bien y después cargá progresivo. Hoy es día de construir.",
  ],
  cansancio: [
    "Si estás cansado, hay dos opciones: reducí la intensidad un 30% y hacé igual (sorprendentemente funciona) o day off estratégico si venís de varios días intensos. ¿Cuántos días llevás entrenando?",
    "El cansancio es parte del proceso. Pero hay cansancio normal y sobreentrenamiento. Si dormiste mal o tuviste mucho estrés, entrenamento suave es mejor que nada. Hacé 20 minutos de lo más básico.",
    "Escuchá al cuerpo, pero tampoco negocies demasiado con él. ¿Es cansancio físico o mental? Si es mental, entrená igual. Si tenés los músculos pesados, reducí volumen a la mitad.",
  ],
  futbol: [
    "¡Jugaste fútbol! Genial. Ese contó como sesión de cardio-potencia. Para la semana: descansá mañana, retomá 2 días después con Lower o Full Body suave. Hidratación y proteína hoy.",
    "Post fútbol: el día siguiente es de recuperación activa. Bicicleta suave 15 min o caminata. Después de 48hs podés volver a rutina normal. Tomá buena proteína hoy.",
    "Fútbol activa todo: cardio, piernas, cambios de dirección. Tratalo como día de entrenamiento intenso. Mañana: descanso o movilidad. Pasado: Upper o Full Body liviano.",
  ],
  dieta: [
    "Para déficit hoy: desayuno proteico (huevos o avena con proteína), almuerzo con pollo o carne y carbos, merienda liviana, cena sin carbos pesados. Total apuntá a unas 2000-2200 kcal.",
    "Plan del día: Avena con proteína de mañana, milanesa de pollo con puré de calabaza al mediodía, snack de yogur con fruta, y pollo con verduras a la noche. Fácil y efectivo.",
    "Hoy priorizá proteína en cada comida. Al menos 30-40g por comida principal. Carbos en desayuno y almuerzo, reducirlos en cena. Mucha verdura para saciar sin calorías extra.",
  ],
  motivacion: [
    "Mirá, la versión de vos que querés ser ya existe. Solo hay que ir a buscarla repetición por repetición. No hay secreto, no hay atajo. Solo trabajo y tiempo. Dale.",
    "¿Sabés qué diferencia al que logra resultados? No la genética. No el gym de moda. La consistencia en los días que no querés ir. Esos días son los que realmente cuentan.",
    "Hoy no va a ser el día que todo cambia. Tampoco mañana. Pero si seguís haciendo lo correcto todos los días, en 3 meses no vas a reconocerte. Enfocate en hoy.",
    "El mejor momento para empezar era hace un año. El segundo mejor momento es ahora mismo. Suficiente pensando, empezá.",
  ],
  tecnica: [
    "Para cualquier ejercicio: dominá el peso con buena técnica antes de agregar carga. Filmarte desde el costado ayuda mucho para ver lo que no sentís. ¿Qué ejercicio querés profundizar?",
    "Regla de oro: si no podés mantener la técnica en las últimas repeticiones, el peso es demasiado. Bajá la carga y construí fuerza real. Menos ego, más músculo.",
    "La técnica importa más cuanto más cargás. Con poco peso el error no duele. Con mucho peso, el error lastima. Siempre priorizar la forma.",
  ],
  descanso: [
    "El descanso no es rendirse — es parte del entrenamiento. Sin recuperación no hay adaptación. Si sentís los músculos pesados y el rendimiento bajo, tomá un día activo o directamente off. Tu cuerpo te lo devuelve con creces.",
    "Síntomas de sobreentrenamiento: cansancio que no se va con sueño, baja performance, mal humor, pulso elevado en reposo. Si los tenés, 2-3 días de descanso ahora valen más que forzar y lesionarte.",
    "Para recuperar más rápido: proteína en cada comida, 7-9 horas de sueño, hidratación constante y movilidad suave. El foam roller y la elongación post entreno también marcan diferencia.",
  ],
  planSemanal: [
    "Una semana ideal para vos: Día 1 Upper, descanso o cardio suave, Día 2 Lower, descanso activo, Día 3 Full Body, y si hay fútbol — ese cuenta como sesión. Total: 3-4 estímulos por semana. Más que eso sin base sólida puede ser contraproducente.",
    "Para optimizar la semana: nunca dos días de Lower consecutivos. Podés hacer Upper al día siguiente de Full Body pero bajá volumen. El fútbol reemplaza el cardio de esa semana — no lo sumes al programa, integralo.",
    "Estructura sugerida: Lunes Upper, Miércoles Lower, Viernes Full Body. Martes y Jueves: cardio suave o descanso activo. Sábado: fútbol si hay partido. Domingo: descanso total. Simple, efectivo, sostenible.",
  ],
  default: [
    "Buena pregunta. En el fitness todo es contexto. Decime más detalles y te doy una respuesta más precisa. 💪",
    "No soy un médico ni un nutricionista, pero puedo darte orientación práctica basada en principios sólidos de entrenamiento.",
    "Eso depende de varios factores. Contame más: ¿cuánto tiempo llevás entrenando? ¿Cuál es tu objetivo principal ahora mismo?",
    "Dale, estoy para ayudarte. ¿Me contás más sobre lo que necesitás? Técnica, dieta, rutina, motivación... elegí.",
  ]
};
