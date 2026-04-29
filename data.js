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

  // ─────────────────────────────────────────────
  // DÍA 1: UPPER FUERZA + HOMBROS + CORE
  // ─────────────────────────────────────────────
  day1: [
    {
      id: "press_banca_pausado",
      name: "Press de Banca Pausado",
      sets: 6, reps: "5", rest: 180,
      muscle: "Pecho / Tríceps / Deltoides anterior",
      defaultWeight: 80,
      technique: {
        postura: "Espalda con leve arco natural, pies firmes en el suelo. Escápulas retraídas y deprimidas contra el banco durante todo el movimiento.",
        agarre: "Agarre prono, manos un poco más anchas que los hombros. Muñecas neutras, pulgares rodeando la barra.",
        respiracion: "Maniobra Valsalva: inspirá profundo antes de bajar. Exhalá con fuerza al empujar. No sueltes el aire en la pausa.",
        errores: "No rebotar la barra en el pecho. No levantar los glúteos. No perder la tensión en la pausa. La pausa es de 1-2 seg completos, sin apoyo.",
        seguridad: "Usá collarines siempre. Con más de 80 kg tené spotter o usa rack con seguros bien ajustados.",
        tecnica: "Bajá controlado 2-3 seg hasta el pecho medio-bajo. Pausá 1-2 seg sin rebotar. Empujá explosivo hacia arriba. Codos a 45-60° del cuerpo."
      }
    },
    {
      id: "remo_caballo",
      name: "Remo Caballo (Barbell Row)",
      sets: 4, reps: "10", rest: 90,
      muscle: "Espalda media / Romboides / Bíceps",
      defaultWeight: 60,
      technique: {
        postura: "Inclinado ~45°, rodillas levemente flexionadas, espalda completamente recta. Core activado todo el tiempo.",
        agarre: "Agarre prono, manos a ancho de hombros o algo más. Codos pegados al cuerpo al tirar.",
        respiracion: "Exhalá al tirar la barra hacia el ombligo. Inspirá al bajar controlado.",
        errores: "No redondear la lumbar. No usar impulso del torso para subir. No bajar la barra rápido — el excéntrico importa.",
        seguridad: "Con más de 70 kg usá cinturón. Si duele la lumbar, reducí el peso y revisá la postura.",
        tecnica: "Tirá la barra hacia el ombligo bajo con codos a 45°. Apretá la espalda 1 seg arriba. Bajá 2 seg."
      }
    },
    {
      id: "press_militar_sentado",
      name: "Press Militar Sentado",
      sets: 4, reps: "8", rest: 90,
      muscle: "Deltoides / Tríceps / Trapecio",
      defaultWeight: 40,
      technique: {
        postura: "Sentado con respaldo o banco vertical. Columna neutra, core activado. No hiperextender la lumbar para empujar.",
        agarre: "Agarre prono a ancho de hombros. Pulgares envolviendo la barra.",
        respiracion: "Exhalá al empujar. Inspirá en el descenso controlado.",
        errores: "No arquear la lumbar para completar la repetición. No bajar la barra detrás de la cabeza — al frente siempre. No usar impulso.",
        seguridad: "Si duelen los hombros probá con mancuernas para más libertad de movimiento.",
        tecnica: "Barra frente al mentón. Empujá en línea recta hacia arriba. Bajar controlado hasta el mentón o clavículas."
      }
    },
    {
      id: "elevaciones_laterales",
      name: "Elevaciones Laterales",
      sets: 4, reps: "15", rest: 60,
      muscle: "Deltoides lateral",
      defaultWeight: 8,
      technique: {
        postura: "De pie o sentado. Columna recta, rodillas levemente flexionadas. Torso estable sin balanceo.",
        agarre: "Mancuernas en pronación con pulgar levemente hacia abajo al elevar (como volcando agua).",
        respiracion: "Exhalá al subir. Inspirá al bajar controlado 3 seg.",
        errores: "No usar impulso del cuerpo. No elevar por encima de los hombros. No encoger los trapecios al subir.",
        seguridad: "Peso ligero y técnica impecable. Este es un ejercicio de aislamiento — el ego acá no aplica.",
        tecnica: "Elevar con leve flexión de codo hasta altura de hombros. Pausa 1 seg arriba. Bajar 3 seg. Repetir sin inercia."
      }
    },
    {
      id: "curl_biceps_d1",
      name: "Curl de Bíceps con Mancuernas",
      sets: 4, reps: "10-12", rest: 60,
      muscle: "Bíceps braquial",
      defaultWeight: 14,
      technique: {
        postura: "De pie, columna recta. Codos pegados al cuerpo en todo momento.",
        agarre: "Supino (palma hacia arriba). Podés alternar o hacer los dos a la vez.",
        respiracion: "Exhalá al subir. Inspirá al bajar.",
        errores: "No balancear el torso. No soltar los codos del cuerpo. No bajar brusco — el excéntrico construye músculo.",
        seguridad: "Peso manejable que permita rango completo. Si duelen los codos reducí rango o peso.",
        tecnica: "Flexionás completamente el codo sin adelantar los hombros. Pausa arriba 1 seg. Bajá 2-3 seg."
      }
    },
    {
      id: "press_cerrado_triceps",
      name: "Press Cerrado para Tríceps",
      sets: 3, reps: "10", rest: 60,
      muscle: "Tríceps / Pecho interno",
      defaultWeight: 50,
      technique: {
        postura: "Acostado en banco plano. Espalda apoyada, pies firmes en el suelo.",
        agarre: "Agarre prono a ancho de hombros (manos más juntas que en press normal). Muñecas neutras.",
        respiracion: "Inspirá al bajar. Exhalá al empujar.",
        errores: "No abrir los codos al subir. No bajar la barra al cuello. No arquear la espalda.",
        seguridad: "Empezá conservador — la diferencia de agarre cambia mucho la carga sobre codo y hombro.",
        tecnica: "Bajá la barra hacia la parte baja del pecho/abdomen alto. Empujá manteniendo los codos cerca del cuerpo."
      }
    },
    {
      id: "dead_bug",
      name: "Dead Bug",
      sets: 3, reps: "8 por lado", rest: 45,
      muscle: "Core profundo / Transverso abdominal",
      defaultWeight: 0,
      technique: {
        postura: "Acostado boca arriba. Zona lumbar pegada al suelo todo el tiempo — esta es la clave.",
        agarre: "Brazos extendidos al techo. Rodillas a 90° en el aire.",
        respiracion: "Exhalá al extender brazo/pierna opuestos. Inspirá al volver. La respiración es el ejercicio.",
        errores: "Permitir que la lumbar se despegue del suelo. Moverse rápido. Hacer el movimiento sin control.",
        seguridad: "Ideal para diástasis: nunca forzar si sentís protrusión abdominal. Empezá con rango pequeño.",
        tecnica: "Bajás el brazo derecho y pierna izquierda simultáneamente hacia el suelo sin tocar. Volvés. Alternás. Lento y controlado."
      }
    },
    {
      id: "pallof_press",
      name: "Pallof Press",
      sets: 3, reps: "12 por lado", rest: 45,
      muscle: "Core / Anti-rotación / Oblicuos",
      defaultWeight: 0,
      technique: {
        postura: "De pie perpendicular a la polea o banda. Pies a ancho de hombros. Rodillas levemente flexionadas.",
        agarre: "Agarrá la polea o banda con ambas manos frente al pecho.",
        respiracion: "Exhalá al extender los brazos. Inspirá al volver al pecho.",
        errores: "Rotar el torso al extender — justamente lo que tenés que evitar. No usar peso excesivo.",
        seguridad: "Perfecto para diástasis: anti-rotación sin presión intraabdominal alta.",
        tecnica: "Extendés los brazos al frente manteniendo el torso completamente quieto. El trabajo es resistir la rotación. Pausá 2 seg extendido."
      }
    },
  ],

  // ─────────────────────────────────────────────
  // DÍA 2: LOWER + AIRE + MOVILIDAD
  // ─────────────────────────────────────────────
  day2: [
    {
      id: "prensa_d2",
      name: "Prensa de Piernas",
      sets: 5, reps: "8", rest: 120,
      muscle: "Cuádriceps / Glúteos / Isquiotibiales",
      defaultWeight: 120,
      technique: {
        postura: "Espalda y glúteos apoyados contra el respaldo. Pies a ancho de cadera, paralelos o levemente abiertos.",
        agarre: "Manos en los agarres laterales para estabilidad.",
        respiracion: "Maniobra Valsalva: inspirá antes de bajar. Exhalá al empujar.",
        errores: "No desbloquear completamente las rodillas. No elevar la pelvis del asiento al bajar. No poner los pies demasiado altos o bajos.",
        seguridad: "Ajustá bien los seguros de la máquina antes de cada serie. No bloquear las rodillas al final.",
        tecnica: "Bajá controlado hasta 90° de flexión de rodilla. Empujá desde los talones. Rango completo, sin medio recorrido."
      }
    },
    {
      id: "peso_muerto_rumano_mancuerna",
      name: "Peso Muerto Rumano con Mancuernas",
      sets: 4, reps: "10", rest: 90,
      muscle: "Isquiotibiales / Glúteos / Lumbar",
      defaultWeight: 24,
      technique: {
        postura: "De pie, rodillas levemente flexionadas. Espalda completamente recta en todo el movimiento — esto es no negociable.",
        agarre: "Mancuernas frente a los muslos, agarre neutro. Dejás que bajen pegadas a las piernas.",
        respiracion: "Inspirá al bajar (bisagra de cadera). Exhalá al subir extendiendo caderas.",
        errores: "Redondear la columna. Doblar demasiado las rodillas (no es una sentadilla). No sentir el estiramiento en isquios.",
        seguridad: "El límite es tu flexibilidad — no la profundidad. Bajá hasta donde podás mantener la espalda recta.",
        tecnica: "Empujá las caderas hacia atrás mientras las mancuernas bajan por las piernas. Sentís tensión en isquios. Volvés extendiendo las caderas."
      }
    },
    {
      id: "zancadas_d2",
      name: "Zancadas con Mancuernas",
      sets: 3, reps: "10 por pierna", rest: 75,
      muscle: "Cuádriceps / Glúteos / Estabilizadores",
      defaultWeight: 16,
      technique: {
        postura: "Torso completamente erguido. Core activado. Paso largo hacia adelante.",
        agarre: "Mancuernas a los costados del cuerpo.",
        respiracion: "Inspirá al bajar. Exhalá al empujar y volver.",
        errores: "No dejar que la rodilla delantera pase el pie. No inclinar el torso adelante. No tambalear.",
        seguridad: "Si perdés equilibrio hacelo cerca de una pared. Con diástasis: core bien activado antes del paso.",
        tecnica: "Paso largo, bajá la rodilla trasera cerca del suelo sin tocar. Empujá con el talón delantero para volver. Controlado."
      }
    },
    {
      id: "curl_femoral",
      name: "Curl Femoral en Máquina",
      sets: 4, reps: "12", rest: 75,
      muscle: "Isquiotibiales",
      defaultWeight: 30,
      technique: {
        postura: "Acostado boca abajo en la máquina. Rodilla en la articulación de la palanca. Cadera pegada al asiento.",
        agarre: "Manos en los agarres laterales.",
        respiracion: "Exhalá al curlar. Inspirá al extender.",
        errores: "Levantar la cadera para ayudar. No completar el rango. Bajar demasiado rápido.",
        seguridad: "Ajustá el rodillo a la altura correcta. No uses más peso del que permite el rango completo.",
        tecnica: "Flexionás la rodilla trayendo el talón al glúteo. Pausa 1 seg. Bajá 2-3 seg controlado."
      }
    },
    {
      id: "gemelos_d2",
      name: "Elevaciones de Gemelos",
      sets: 4, reps: "20", rest: 45,
      muscle: "Gastrocnemio / Sóleo",
      defaultWeight: 0,
      technique: {
        postura: "Antepié en escalón o superficie elevada. Talones libres. Podés usar mancuerna o máquina.",
        agarre: "Manos en soporte para equilibrio.",
        respiracion: "Exhalá al subir. Inspirá al bajar.",
        errores: "No hacer rango parcial. No rebotar en el punto bajo. No inclinarte adelante.",
        seguridad: "Asegurate de tener equilibrio antes de agregar peso.",
        tecnica: "Subís a máxima extensión — 1 seg arriba. Bajás 3 seg hasta estiramiento completo del talón. Sin rebote."
      }
    },
  ],

  // ─────────────────────────────────────────────
  // DÍA 3: FULL BODY + ATLÉTICO + CORE
  // ─────────────────────────────────────────────
  day3: [
    {
      id: "trap_bar_deadlift",
      name: "Trap Bar Deadlift / Rack Pull",
      sets: 5, reps: "5", rest: 180,
      muscle: "Full Body — Cadena posterior / Cuádriceps / Core",
      defaultWeight: 80,
      technique: {
        postura: "Pies a ancho de cadera dentro de la trap bar. Caderas atrás, espalda recta, pecho hacia arriba. Si es rack pull, barra a la altura de las rodillas.",
        agarre: "Agarre neutro en las manijas. Brazos rectos, no tirás con ellos.",
        respiracion: "Maniobra Valsalva: llená el abdomen de aire antes de tirar. Exhalá al terminar la repetición.",
        errores: "Redondear la espalda. Dejar que la barra se aleje del cuerpo. Tirar con los brazos. Bloquear las rodillas antes que las caderas.",
        seguridad: "La trap bar es más segura para la lumbar que la barra convencional. Cinturón con pesos altos.",
        tecnica: "Empujá el suelo hacia abajo (no tirés hacia arriba). Caderas y hombros suben al mismo ritmo. Barra pegada al cuerpo. Lockout completo arriba."
      }
    },
    {
      id: "press_inclinado_mancuerna_d3",
      name: "Press Inclinado con Mancuernas",
      sets: 4, reps: "10", rest: 90,
      muscle: "Pecho superior / Deltoides anterior / Tríceps",
      defaultWeight: 22,
      technique: {
        postura: "Banco a 30-45°. Espalda apoyada con leve arco natural. Core activado.",
        agarre: "Mancuernas en pronación. Codos a 45-60° del cuerpo — no abiertos al 90°.",
        respiracion: "Inspirá al bajar. Exhalá al empujar.",
        errores: "Abrir demasiado los codos (lesión de hombro). Arquear la espalda para completar la rep. Bajar las mancuernas muy adentro.",
        seguridad: "Si duelen los hombros, bajá el ángulo del banco a 20-30°.",
        tecnica: "Bajá las mancuernas hasta los costados del pecho. Empujá hacia arriba y levemente adentro. Rango completo."
      }
    },
    {
      id: "jalon_cerrado",
      name: "Jalón Cerrado (Supino)",
      sets: 4, reps: "10", rest: 90,
      muscle: "Dorsal ancho / Bíceps / Romboides",
      defaultWeight: 50,
      technique: {
        postura: "Sentado, rodillas bajo el soporte. Torso levemente inclinado hacia atrás (~15°). Pecho afuera.",
        agarre: "Agarre supino (palmas hacia vos) en barra cerrada o V-bar.",
        respiracion: "Exhalá al tirar. Inspirá al subir controlado.",
        errores: "Inclinarse demasiado hacia atrás (se convierte en remo). No bajar la barra más allá del mentón. No soltar rápido.",
        seguridad: "Control total en el excéntrico — es donde más músculo se construye.",
        tecnica: "Tirá la barra hacia el pecho superior. Los codos van hacia las caderas. Apretá el dorsal 1 seg. Subí 2-3 seg."
      }
    },
    {
      id: "face_pull",
      name: "Face Pull",
      sets: 4, reps: "15", rest: 60,
      muscle: "Deltoides posterior / Manguito rotador / Trapecio medio",
      defaultWeight: 15,
      technique: {
        postura: "De pie frente a polea alta. Agarre en cuerda. Pies firmes, core activado.",
        agarre: "Agarre en cuerda con pulgares hacia arriba. Tirás separando la cuerda hacia tu cara.",
        respiracion: "Exhalá al tirar hacia la cara. Inspirá al soltar.",
        errores: "Usar peso excesivo y perder la forma. No separar la cuerda al final. Tirar con los bíceps en vez de los hombros.",
        seguridad: "Peso ligero siempre. Es un ejercicio de salud del hombro — no de ego.",
        tecnica: "Tirás la cuerda hacia tu frente/nariz separando ambos extremos. Codos a la altura de los hombros o más arriba. Pausa 1 seg."
      }
    },
    {
      id: "curl_martillo",
      name: "Curl Martillo",
      sets: 4, reps: "12", rest: 60,
      muscle: "Braquial / Braquiorradial / Bíceps",
      defaultWeight: 14,
      technique: {
        postura: "De pie, columna recta. Codos pegados al cuerpo.",
        agarre: "Agarre neutro (palma hacia el cuerpo, tipo martillo). No gires la muñeca.",
        respiracion: "Exhalá al subir. Inspirá al bajar.",
        errores: "Rotar la muñeca (eso lo convierte en curl normal). Balancear el cuerpo. Bajar rápido.",
        seguridad: "Peso manejable. El agarre neutro reduce estrés en el codo.",
        tecnica: "Flexionás el codo manteniendo el agarre neutro todo el tiempo. Pausa arriba. Bajá 2-3 seg."
      }
    },
    {
      id: "farmer_walk",
      name: "Farmer Walk",
      sets: 3, reps: "25-30 metros", rest: 90,
      muscle: "Grip / Core / Trapecios / Full Body",
      defaultWeight: 24,
      technique: {
        postura: "De pie con mancuernas o kettlebells pesadas a los costados. Hombros atrás y abajo. Pecho afuera.",
        agarre: "Agarre firme. No dejar que las mancuernas roten.",
        respiracion: "Respiración constante y controlada. No aguantes el aire en caminatas largas.",
        errores: "Encoger los hombros. Inclinarse hacia un lado. Pasos muy largos que rompen el equilibrio.",
        seguridad: "Zona despejada. Si soltás una mancuerna, dejala caer — no la atrapés.",
        tecnica: "Caminás erguido, pasos medianos, a ritmo constante. El trabajo es mantener la postura y el grip hasta el final."
      }
    },
    {
      id: "bird_dog_d3",
      name: "Bird Dog",
      sets: 3, reps: "8 por lado", rest: 45,
      muscle: "Core / Erector espinal / Glúteos",
      defaultWeight: 0,
      technique: {
        postura: "En cuadrupedia: manos bajo hombros, rodillas bajo caderas. Espalda completamente plana — ni arqueada ni redondeada.",
        agarre: "Manos abiertas sobre el suelo para mejor estabilidad.",
        respiracion: "Exhalá al extender brazo y pierna. Inspirá al volver.",
        errores: "Rotar la cadera al extender la pierna. Levantar la pierna más alto que la cadera. Moverse rápido.",
        seguridad: "Ideal para diástasis y lumbar. Empezá con rango pequeño y aumentá a medida que controlás.",
        tecnica: "Extendés brazo derecho y pierna izquierda simultáneamente. Mantenés la espalda plana. Pausa 2 seg. Volvés con control. Alternás."
      }
    },
    {
      id: "carry_unilateral",
      name: "Carry Unilateral (Suitcase Carry)",
      sets: 3, reps: "20 metros por lado", rest: 60,
      muscle: "Core lateral / Cuadrado lumbar / Grip",
      defaultWeight: 20,
      technique: {
        postura: "De pie con mancuerna en una sola mano. El desafío es mantenerte completamente vertical — sin inclinarte hacia ningún lado.",
        agarre: "Agarre firme. Hombro del lado cargado ligeramente activado hacia abajo.",
        respiracion: "Respiración constante. Exhalá cada 2-3 pasos.",
        errores: "Inclinarse hacia el lado cargado o al lado libre. Encoger el hombro. Pasos irregulares.",
        seguridad: "Zona despejada. La asimetría del ejercicio es justamente el estímulo.",
        tecnica: "Caminás erguido resistiendo la inclinación lateral. El oblicuo del lado libre trabaja para mantenerte recto."
      }
    },
  ],
};


// CALENTAMIENTOS POR DÍA
const WARMUPS = {
  day1: {
    title: "🔥 Calentamiento Día 1 — 7 minutos",
    steps: [
      { time: "0:00–3:00", name: "Caminata rápida o bici suave", desc: "Activación cardiovascular suave. Subí la temperatura corporal gradualmente." },
      { time: "3:00–4:00", name: "Respiración diafragmática ×5", desc: "Inhalá por la nariz 4 seg → exhalá por la boca 6 seg. Activa el sistema parasimpático y prepara el core." },
      { time: "4:00–5:00", name: "Movilidad hombros", desc: "Círculos adelante ×10 → círculos atrás ×10 → abrir brazos ×10. Lubrica la articulación glenohumeral." },
      { time: "5:00–6:00", name: "Activación escápulas", desc: "Juntar omóplatos ×15 (retracción escapular) → Push-up en pared ×10. Activa los estabilizadores de la espalda." },
      { time: "6:00–7:00", name: "Aproximación al press", desc: "Barra sola ×15 → peso liviano ×8. Prepara el patrón de movimiento con el peso del día." },
    ]
  },
  day2: {
    title: "🔥 Calentamiento Día 2 — 7 minutos",
    steps: [
      { time: "0:00–3:00", name: "Bici suave", desc: "Ritmo tranquilo. Calentá las piernas sin fatigarlas antes de la sesión principal." },
      { time: "3:00–4:00", name: "Respiración diafragmática ×5", desc: "Inhalá por la nariz 4 seg → exhalá por la boca 6 seg. Activa el core profundo." },
      { time: "4:00–5:00", name: "Movilidad cadera", desc: "Círculos de cadera ×10 por lado → balanceo de piernas ×10 por lado. Abre la articulación coxofemoral." },
      { time: "5:00–6:00", name: "Tobillo y sentadilla", desc: "Rodilla al frente ×10 por lado (movilidad tobillo) → sentadilla asistida con soporte 20 seg. Prepara el patrón." },
      { time: "6:00–7:00", name: "Puente de glúteo ×12", desc: "Activa los glúteos antes de cargar. Clave para proteger la lumbar en prensa y peso muerto." },
    ]
  },
  day3: {
    title: "🔥 Calentamiento Día 3 — 7 minutos",
    steps: [
      { time: "0:00–3:00", name: "Caminata o remo suave", desc: "Full body suave. Activa sin fatigar. El remo es ideal porque prepara la cadena posterior." },
      { time: "3:00–4:00", name: "Respiración diafragmática ×5", desc: "Inhalá por la nariz 4 seg → exhalá por la boca 6 seg. Activa el core antes del deadlift." },
      { time: "4:00–5:00", name: "Bisagra de cadera ×12", desc: "Sin peso. El patrón exacto del deadlift. Empujá caderas atrás con espalda recta. Sentís los isquios." },
      { time: "5:00–6:00", name: "Bird Dog ×6 por lado", desc: "Activación de core y estabilizadores antes de levantar pesado. Clave para proteger la lumbar." },
      { time: "6:00–7:00", name: "Series progresivas", desc: "50% del peso del día ×5 → 70% ×3 → 90% ×1. Llegás al peso de trabajo sin agotar el sistema nervioso." },
    ]
  }
};

// MINI BLOQUE DIARIO EN CASA
const DAILY_BLOCK = {
  title: "🏠 Mini Bloque Diario — 5 minutos",
  desc: "Hacelo todos los días si podés. Antes de dormir, al levantarte, o entre tareas. Suma más que cualquier sesión esporádica.",
  exercises: [
    { name: "Respiración diafragmática ×5", desc: "Inhalá nariz 4 seg → exhalá boca 6 seg. Activa el core profundo y el sistema nervioso parasimpático.", duration: "~1 min" },
    { name: "Dead Bug ×6 por lado", desc: "Lumbar pegada al suelo siempre. Movimiento lento y controlado. Ideal para diástasis.", duration: "~1 min" },
    { name: "Sentadilla asistida hold", desc: "Agarrarte de algo y mantener la posición baja 30 seg. Movilidad de cadera, tobillo y rodilla.", duration: "30 seg" },
    { name: "Toe Touch", desc: "Intentar tocar los pies con las rodillas extendidas. Mantener 30 seg. Estira cadena posterior.", duration: "30 seg" },
    { name: "Child Pose", desc: "Arrodillado, brazos extendidos al frente, frente al suelo. Respira profundo. Cierra la sesión.", duration: "30 seg" },
  ]
};

// PROGRESIÓN SEMANAL
const PROGRESSION = {
  title: "📈 Progresión Semanal",
  desc: "Si completaste todas las series con buena técnica y te quedó energía al final, avanzá así:",
  rules: [
    { icon: "🏋️", label: "Barra", rule: "+2.5 kg la siguiente semana" },
    { icon: "💪", label: "Mancuernas", rule: "+1 kg por lado cuando la técnica lo permite" },
    { icon: "🚴", label: "Cardio", rule: "+1 minuto o aumentar la intensidad de los intervalos" },
    { icon: "⏱️", label: "Core", rule: "+1 repetición por lado o reducir descanso 5 seg" },
  ],
  priorities: [
    "Entrenar los 3 días de la semana — sin excusas.",
    "Comer en déficit moderado todos los días.",
    "Caminar más en el día a día.",
  ],
  note: "Esas 3 cosas solas mueven montañas. Todo lo demás es detalle."
};

// MODOS DE CARDIO
const CARDIO_MODES = {
  base: {
    title: "🚶 Modo Base — Construcción Aeróbica",
    desc: "Para construir la base aeróbica desde cero. Bajo impacto, alta consistencia. Hacelo 3x por semana.",
    duration: "30-40 min",
    frequency: "3x por semana",
    exercises: [
      { name: "Caminata suave", duration: "5 min", intensity: "Muy baja", tip: "Calentamiento. Ritmo tranquilo, podés hablar sin problemas." },
      { name: "Caminata rápida", duration: "10 min", intensity: "Moderada", tip: "Ritmo que te exige pero podés sostener. Algo de esfuerzo." },
      { name: "Trote 30 seg / Caminata 90 seg", duration: "×4 repeticiones", intensity: "Media", tip: "No te ahogues en el trote. Recuperá bien en la caminata." },
      { name: "Caminata rápida continua", duration: "10 min", intensity: "Moderada", tip: "Mantener ritmo estable sin bajar." },
      { name: "Enfriamiento suave", duration: "5 min", intensity: "Muy baja", tip: "Bajar la frecuencia cardíaca gradualmente. No pares de golpe." },
    ]
  },
  partido: {
    title: "⚽ Modo 5 vs 5 — HIIT Específico Fútbol",
    desc: "Imitar la demanda del fútbol 5: explosiones cortas con recuperación incompleta. Hacelo el día anterior a jugar, no el mismo día.",
    duration: "25-30 min",
    frequency: "1-2x por semana",
    exercises: [
      { name: "Calentamiento dinámico", duration: "5 min", intensity: "Baja", tip: "Círculos de cadera, estocadas, skipping, tobillo. Todo fluido." },
      { name: "Sprint 15m + vuelta trotando", duration: "×8 repeticiones", intensity: "Máxima", tip: "Sprint al 100%. Vuelta trotando en 15-20 seg. Recuperación incompleta." },
      { name: "Descanso activo", duration: "2 min", intensity: "Muy baja", tip: "Caminá. No te sentés. Mantené el flujo sanguíneo." },
      { name: "Cambios de dirección 5-10-5", duration: "×6 repeticiones", intensity: "Alta", tip: "Simula movimiento de partido. Rodillas flexionadas al cambiar dirección." },
      { name: "Saltos con sentadilla", duration: "3×10", intensity: "Alta", tip: "Aterrizá suave amortiguando con las rodillas. Explosivo al saltar." },
      { name: "Trote suave enfriamiento", duration: "5 min", intensity: "Baja", tip: "Bajá el ritmo cardíaco gradual. Respiración profunda." },
    ]
  },
  recuperacion: {
    title: "🧘 Modo Recuperación — Post Partido",
    desc: "Para el día después de un partido o sesión muy intensa. Regeneración activa — no descanso pasivo.",
    duration: "25-35 min",
    frequency: "Día después del partido",
    exercises: [
      { name: "Bicicleta fija suave", duration: "15 min", intensity: "Muy baja", tip: "Resistencia mínima, cadencia alta. Solo activar la circulación en las piernas." },
      { name: "Elongación cuádriceps", duration: "90 seg por lado", intensity: "Estiramiento", tip: "De pie, talón al glúteo. No forzar la rodilla. Respirá profundo." },
      { name: "Elongación isquiotibiales", duration: "90 seg por lado", intensity: "Estiramiento", tip: "Sentado, pierna extendida, inclinación suave hacia adelante." },
      { name: "90/90 hips", duration: "×8 por lado", intensity: "Movilidad", tip: "Sentado en el suelo con piernas en 90°. Rotá hacia cada lado con control. No fuerces." },
      { name: "Movilidad de tobillo", duration: "1 min por pie", intensity: "Movilidad", tip: "Sentado, rotaciones y flexiones de tobillo. Los tobillos rígidos acumulan el impacto del partido." },
      { name: "Respiración diafragmática", duration: "5 min", intensity: "Relajación", tip: "Acostado. Inhalá por la nariz 4 seg → exhalá por la boca 6 seg. Baja el sistema nervioso." },
    ]
  },
  respiracion: {
    title: "🫁 Tabique Desviado — Tolerancia Respiratoria",
    desc: "Ejercicios para mejorar la tolerancia al CO₂ y la eficiencia respiratoria con tabique desviado. No corrigen el problema estructural pero mejoran la funcionalidad notablemente.",
    duration: "15-20 min",
    frequency: "Todos los días",
    exercises: [
      { name: "Respiración nasal diafragmática", duration: "5 min", intensity: "Relajación", tip: "Acostado. Inhalá solo por la nariz 4 seg → exhalá por la boca 6 seg. Mano en el abdomen — solo ella debe moverse." },
      { name: "Box Breathing (cuadrada)", duration: "4 min", intensity: "Baja", tip: "Inhalar 4 seg → Retener 4 seg → Exhalar 4 seg → Retener 4 seg. Muy efectiva para el control del CO₂ y el sistema nervioso." },
      { name: "Respiración unilateral alternada", duration: "3 min", intensity: "Baja", tip: "Tapá una fosa nasal, inhalá por la otra, cambiá al exhalar. Mejora el flujo en la fosa más bloqueada." },
      { name: "Caminata con respiración nasal exclusiva", duration: "8 min", intensity: "Baja", tip: "Caminá a ritmo cómodo respirando SOLO por la nariz. Si necesitás abrir la boca, bajá el ritmo — no cedas." },
      { name: "Retención post-exhalación progresiva", duration: "×5 repeticiones", intensity: "Media", tip: "Exhalá todo → aguantá sin respirar el máximo posible sin ansiedad. Empezá con 5-10 seg e incrementá semana a semana." },
    ]
  },
  bici_intervalos: {
    title: "🚴 Cardio Día 2 — Bicicleta Intervalos",
    desc: "Parte del Día 2 de entrenamiento. Va al final de la sesión de piernas. 12-15 minutos totales.",
    duration: "12-15 min",
    frequency: "Cada Día 2",
    exercises: [
      { name: "Bici suave entrada", duration: "2 min", intensity: "Muy baja", tip: "Las piernas ya están cansadas de la sesión. Arrancá muy suave." },
      { name: "30 seg fuerte / 60 seg suave", duration: "×6 repeticiones", intensity: "Alta / Baja", tip: "El 'fuerte' es 75-80% del máximo. El 'suave' es recuperación activa. No pares." },
      { name: "Enfriamiento", duration: "2-3 min", intensity: "Muy baja", tip: "Pedaleá suave para bajar el ritmo cardíaco antes de estirar." },
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
    "Para déficit hoy: desayuno proteico (huevos o avena con proteína), almuerzo con pollo/carne + carbos, merienda liviana, cena sin carbos pesados. Apuntá a 2000-2200 kcal.",
    "Plan del día: Avena con proteína de mañana → milanesa de pollo con puré de calabaza al mediodía → yogur con fruta a la tarde → pollo con verduras a la noche. Fácil y efectivo. 💪",
    "Priorizá proteína en cada comida: mínimo 30-40g por comida principal. Carbos en desayuno y almuerzo, reducirlos en cena. Mucha verdura para saciar sin calorías extra.",
    "Para cenar con déficit: proteína magra (pollo, merluza, claras, carne magra) + verduras a la plancha o al horno. Sin arroz ni fideos a la noche — los carbos guardálos para antes de entrenar.",
    "Para el almuerzo: pollo a la plancha con arroz integral y ensalada es la combo clásica. Fácil, barata, 45g de proteína y te deja lleno. Agregá palta si necesitás más calorías.",
    "Para desayunar bien: avena con leche + banana + canela son 380 kcal y 28g de proteína si le agregás un scoop. Si no tenés proteína, 3 huevos revueltos con tostadas integrales.",
    "Antes de entrenar: carbos de absorción media (avena, arroz, banana) + algo de proteína. 60-90 minutos antes. Nada pesado que te caiga mal en el gym.",
    "Snack inteligente: maní + banana, o yogur griego + fruta, o huevo duro + tostada. Todos baratos, rápidos y te frenan el hambre hasta la próxima comida.",
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
