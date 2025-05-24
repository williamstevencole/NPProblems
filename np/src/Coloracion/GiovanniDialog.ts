export type Mensaje = {
  speaker: "Giovanni";
  text: string;
};

const dialogoIntroduccionJustificada: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "…El Team Galactic ha demostrado ser un fracaso total.",
  },
  {
    speaker: "Giovanni",
    text: "Su líder, Cyrus… demasiado obsesionado con su mundo perfecto. Ciego al verdadero poder.",
  },
  { speaker: "Giovanni", text: "Por eso he regresado." },
  {
    speaker: "Giovanni",
    text: "El Team Rocket renacerá en Sinnoh. Y esta vez, lo haremos bien.",
  },
  {
    speaker: "Giovanni",
    text: "Silenciosamente. Estratégicamente. Ciudad por ciudad. Ruta por ruta.",
  },
  {
    speaker: "Giovanni",
    text: "Y tú… serás mi instrumento en esta operación.",
  },
];

const dialogoInicio: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "…Así que tú eres el nuevo recluta del Team Rocket, ¿eh?",
  },
  {
    speaker: "Giovanni",
    text: "Tu misión será crítica para nuestro dominio en la región de Sinnoh.",
  },
  {
    speaker: "Giovanni",
    text: "Selecciona cuidadosamente las ciudades donde estableceremos presencia.",
  },
  {
    speaker: "Giovanni",
    text: "Cada vez que marques una ciudad, será considerada un punto de infiltración.",
  },
  {
    speaker: "Giovanni",
    text: "Todavía no asignaremos agentes… Eso vendrá después.",
  },
  {
    speaker: "Giovanni",
    text: "Recuerda: si dos ciudades están conectadas, no pueden tener al mismo agente.",
  },
  {
    speaker: "Giovanni",
    text: "Hazlo bien… y controlarás Sinnoh. Hazlo mal… y no volverás a tener una misión.",
  },
  { speaker: "Giovanni", text: "Comienza. Estoy observando cada movimiento." },
];

const getDialogoSeleccionCiudad = (nombreCiudad: string): Mensaje[] => [
  {
    speaker: "Giovanni",
    text: `Has marcado ${nombreCiudad} como punto de infiltración.`,
  },
  {
    speaker: "Giovanni",
    text: "Aún no asignaremos agentes… pero cada ciudad cuenta. Sé estratégico.",
  },
  {
    speaker: "Giovanni",
    text: "Recuerda: estoy observando cada paso que das.",
  },
];

const dialogoPrepararColoracion: Mensaje[] = [
  { speaker: "Giovanni", text: "¿Ya terminaste de seleccionar las ciudades?" },
  {
    speaker: "Giovanni",
    text: "Muy bien… procederé a enviar a nuestros agentes encubiertos.",
  },
  {
    speaker: "Giovanni",
    text: "Recuerda: ningún agente puede estar en dos ciudades conectadas.",
  },
  {
    speaker: "Giovanni",
    text: "Si existe una forma de distribuirlos sin levantar sospechas, la encontraré…",
  },
  {
    speaker: "Giovanni",
    text: "…pero si fallas, no solo perderás la misión. Perderás mi confianza.",
  },
  { speaker: "Giovanni", text: "Ejecutando operación… prepárate." },
];

const dialogoVerGrafo: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "Quieres ver el estado actual del mapa… Muy bien.",
  },
  {
    speaker: "Giovanni",
    text: "Observa bien las conexiones que has creado. Un movimiento mal calculado… y todo se derrumba.",
  },
];

const dialogoSeleccionarOtraCiudad: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "¿Vas a elegir otra ciudad? Aún estás a tiempo de mejorar tu red.",
  },
  {
    speaker: "Giovanni",
    text: "Recuerda: solo las ciudades conectadas afectan el plan. Piensa estratégicamente.",
  },
];

const dialogoSeleccionarAlgoritmoGreedy: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "Has elegido el método rápido… el algoritmo greedy.",
  },
  {
    speaker: "Giovanni",
    text: "No garantiza la solución perfecta… pero puede ser suficiente si jugaste bien tus cartas.",
  },
];

export const dialogoSeleccionarAlgoritmoBruteForce: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "¿Fuerza bruta? Hmm… Veo que estás dispuesto a ir al límite.",
  },
  {
    speaker: "Giovanni",
    text: "Esto llevará tiempo… pero podrías encontrar la solución exacta, si es que existe.",
  },
];

const dialogoTerminarMision: Mensaje[] = [
  { speaker: "Giovanni", text: "¿Listo para ejecutar la operación?" },
  {
    speaker: "Giovanni",
    text: "Muy bien… asignaré a nuestros agentes en las ciudades seleccionadas.",
  },
  {
    speaker: "Giovanni",
    text: "Si tus conexiones son débiles, lo descubrirás en segundos.",
  },
  {
    speaker: "Giovanni",
    text: "Comenzando la fase final. Que Arceus tenga piedad si fallas…",
  },
];

const dialogoExito: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "Magnífico… Cada ciudad bajo control, sin fallos.",
  },
  {
    speaker: "Giovanni",
    text: "Tu estrategia fue impecable. Sin conflictos. Sin sospechas.",
  },
  {
    speaker: "Giovanni",
    text: "El Team Rocket dominará Sinnoh, gracias a ti.",
  },
];

const dialogoFracaso: Mensaje[] = [
  {
    speaker: "Giovanni",
    text: "¡Tonto! ¿Pusiste al mismo agente en ciudades conectadas?",
  },
  {
    speaker: "Giovanni",
    text: "Nos arriesgaste a ser descubiertos. ¡Esa no es forma de operar!",
  },
  { speaker: "Giovanni", text: "Fuera de mi vista. No mereces este uniforme…" },
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
