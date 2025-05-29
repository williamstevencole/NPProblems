export type Mensaje = {
  speaker: "Giovanni" | "";
  text: string;
};

const dialogoIntroduccionJustificada: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "...El Team Galactic ha demostrado ser un fracaso total.",
  },
  {
    speaker: "Giovanni",
    text: "Su lider, Cyrus... demasiado obsesionado con su mundo perfecto. Ciego al verdadero poder.",
  },
  { speaker: "Giovanni", text: "Por eso he regresado." },
  {
    speaker: "Giovanni",
    text: "El Team Rocket renacera en Sinnoh. Y esta vez, lo haremos bien.",
  },
  {
    speaker: "Giovanni",
    text: "Silenciosamente. Estrategicamente. Ciudad por ciudad. Ruta por ruta.",
  },
  {
    speaker: "Giovanni",
    text: "Y tu... seras mi instrumento en esta operacion.",
  },
];

const dialogoInicio: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "...Asi que tu eres el nuevo recluta del Team Rocket, eh?",
  },
  {
    speaker: "Giovanni",
    text: "Tu mision sera critica para nuestro dominio en la region de Sinnoh.",
  },
  {
    speaker: "Giovanni",
    text: "Selecciona cuidadosamente las ciudades donde estableceremos presencia.",
  },
  {
    speaker: "Giovanni",
    text: "Cada vez que marques una ciudad, sera considerada un punto de infiltracion.",
  },
  {
    speaker: "Giovanni",
    text: "Todavia no asignaremos agentes... Eso vendra despues.",
  },
  {
    speaker: "Giovanni",
    text: "Recuerda: si dos ciudades estan conectadas, no pueden tener al mismo agente.",
  },
  {
    speaker: "Giovanni",
    text: "Hazlo bien... y controlaras Sinnoh. Hazlo mal... y no volveras a tener una mision.",
  },
  { speaker: "Giovanni", text: "Comienza. Estoy observando cada movimiento." },
];

const dialogoPreselecionCiudad: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "Piensa bien en tu seleccion. Cada ciudad cuenta. Se estrategico.",
  },
];

const getDialogoSeleccionCiudad = (nombreCiudad: string): Mensaje[] => [
  {
    speaker: "Giovanni",
    text: `Has marcado ${nombreCiudad} como punto de infiltracion.`,
  },
  {
    speaker: "Giovanni",
    text: "Recuerda: estoy observando cada paso que das.",
  },
];

const dialogoPrepararColoracion: Mensaje[] = [
  { speaker: "Giovanni", text: "Ya terminaste de seleccionar las ciudades?" },
  {
    speaker: "Giovanni",
    text: "Muy bien... procedere a enviar a nuestros agentes encubiertos.",
  },
  {
    speaker: "Giovanni",
    text: "Recuerda: ningun agente puede estar en dos ciudades conectadas.",
  },
  {
    speaker: "Giovanni",
    text: "Si existe una forma de distribuirlos sin levantar sospechas, la encontrare...",
  },
  {
    speaker: "Giovanni",
    text: "...pero si fallas, no solo perderas la mision. Perderas mi confianza.",
  },
  { speaker: "Giovanni", text: "Ejecutando operacion... preparate." },
];

const dialogoSeleccionarAlgoritmoGreedy: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "Has elegido el metodo rapido... el algoritmo greedy.",
  },
  {
    speaker: "Giovanni",
    text: "No garantiza la solucion perfecta... pero puede ser suficiente si jugaste bien tus cartas.",
  },
];

export const dialogoSeleccionarAlgoritmoBruteForce: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "Fuerza bruta? Hmm... Veo que estas dispuesto a ir al limite.",
  },
  {
    speaker: "Giovanni",
    text: "Esto llevara tiempo... pero podrias encontrar la solucion exacta, si es que existe.",
  },
];

const dialogoTerminarMision: Mensaje[] = [
  { speaker: "Giovanni", text: "Listo para ejecutar la operacion?" },
  {
    speaker: "Giovanni",
    text: "Muy bien... asignare a nuestros agentes en las ciudades seleccionadas.",
  },
  {
    speaker: "Giovanni",
    text: "Si tus conexiones son debiles, lo descubriras en segundos.",
  },
  {
    speaker: "Giovanni",
    text: "Comenzando la fase final. Que Arceus tenga piedad si fallas...",
  },
];

const dialogoExito: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "Magnifico... Cada ciudad bajo control, sin fallos.",
  },
  {
    speaker: "Giovanni",
    text: "Tu estrategia fue impecable. Sin conflictos. Sin sospechas.",
  },
  {
    speaker: "Giovanni",
    text: "El Team Rocket dominara Sinnoh, gracias a ti.",
  },
];

const dialogoFracaso: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "Tonto! Pusiste al mismo agente en ciudades conectadas?",
  },
  {
    speaker: "Giovanni",
    text: "Nos arriesgaste a ser descubiertos. Esa no es forma de operar!",
  },
  {
    speaker: "Giovanni",
    text: "Fuera de mi vista. No mereces este uniforme...",
  },
];

export const informacionAlgoritmos: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "Recluta, nuestra misión en Sinnoh depende de cómo distribuyamos a nuestros agentes. Existen dos enfoques: fuerza bruta y greedy. Presta atención…",
  },
  {
    speaker: "Giovanni",
    text: "Con el método de fuerza bruta, probamos **todas** las combinaciones posibles de asignación.",
  },
  {
    speaker: "Giovanni",
    text: "No dejamos nada al azar; cada ciudad recibe cada agente hasta hallar la configuración perfecta.",
  },
  {
    speaker: "Giovanni",
    text: "Es infalible y garantiza la solución **óptima**, pero con un mapa tan grande puede consumir mucho tiempo… tiempo que nuestro enemigo podría aprovechar.",
  },
  {
    speaker: "Giovanni",
    text: "Imagina enviar un ejército completo a cada ciudad, uno tras otro, hasta asegurar que no hay conflicto. Preciso… pero lento.",
  },
  {
    speaker: "Giovanni",
    text: "En cambio, el algoritmo greedy actúa con **rapidez**. Asigna un agente a la ciudad más crítica primero, luego al siguiente, siempre eligiendo lo que parezca mejor en cada paso.",
  },
  {
    speaker: "Giovanni",
    text: "Esta estrategia voraz reduce drásticamente el tiempo de cómputo. Sin embargo, al tomar decisiones locales puede dejar **puntos débiles** en la red.",
  },
  {
    speaker: "Giovanni",
    text: "En síntesis: \n• **Fuerza bruta** = paciencia, exhaustividad, seguridad absoluta, pero lento.",
  },
  {
    speaker: "Giovanni",
    text: "\n• **Greedy** = rapidez, eficiencia, riesgo calculado, pero no 100% infalible.",
  },
  {
    speaker: "Giovanni",
    text: "Tú decides: ¿arriesgarás velocidad para cubrir más terreno rápidamente, o asegurarás cada paso aunque te cueste más tiempo?",
  },
  {
    speaker: "Giovanni",
    text: "El destino del Team Rocket en Sinnoh está en tus manos. No me falles.",
  },
];

export const dialogos = {
  preludio: dialogoIntroduccionJustificada,
  inicio: dialogoInicio,
  preselecionCiudad: dialogoPreselecionCiudad,
  seleccionCiudad: getDialogoSeleccionCiudad,
  preparacion: dialogoPrepararColoracion,
  menu: {
    algoritmoGreedy: dialogoSeleccionarAlgoritmoGreedy,
    algoritmoBruteForce: dialogoSeleccionarAlgoritmoBruteForce,
    terminarMision: dialogoTerminarMision,
  },
  resultado: {
    exito: dialogoExito,
    fracaso: dialogoFracaso,
  },
  informacionAlgoritmos: informacionAlgoritmos,
};

export const getDialogoErrorConexion = (
  ciudad: string,
  seleccionadas: string[],
  conexiones: { [ciudad: string]: string[] }
): Mensaje[] => [
  {
    speaker: "Giovanni" as const,
    text: `Error! ${ciudad} no tiene conexion con ninguna de las ciudades seleccionadas.`,
  },
  ...seleccionadas.map((c) => ({
    speaker: "Giovanni" as const,
    text: `${c}: ${
      (conexiones[c] || [])
        .filter((conn) => seleccionadas.includes(conn))
        .join(", ") || "Sin conexiones"
    }`,
  })),
];
