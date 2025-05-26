export type Mensaje = {
  speaker: "Giovanni";
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

const dialogoVerGrafo: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "Quieres ver el estado actual del mapa... Muy bien.",
  },
  {
    speaker: "Giovanni",
    text: "Observa bien las conexiones que has creado. Un movimiento mal calculado... y todo se derrumba.",
  },
];

const dialogoSeleccionarOtraCiudad: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "Vas a elegir otra ciudad? Aun estas a tiempo de mejorar tu red.",
  },
  {
    speaker: "Giovanni",
    text: "Recuerda: solo las ciudades conectadas afectan el plan. Piensa estrategicamente.",
  },
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

export const dialogos = {
  preludio: dialogoIntroduccionJustificada,
  inicio: dialogoInicio,
  seleccionCiudad: getDialogoSeleccionCiudad,
  preparacion: dialogoPrepararColoracion,
  menu: {
    verGrafo: dialogoVerGrafo,
    seleccionarOtra: dialogoSeleccionarOtraCiudad,
    algoritmoGreedy: dialogoSeleccionarAlgoritmoGreedy,
    algoritmoBruteForce: dialogoSeleccionarAlgoritmoBruteForce,
    terminarMision: dialogoTerminarMision,
  },
  resultado: {
    exito: dialogoExito,
    fracaso: dialogoFracaso,
  },
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
