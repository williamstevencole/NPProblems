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
    text: "Recuerda: si dos ciudades estan conectadas, no pueden tener al mismo agente.",
  },
  {
    speaker: "Giovanni",
    text: "Hazlo bien... y controlaras Sinnoh.",
  },
  {
    speaker: "Giovanni",
    text: "Hazlo mal... y sera tu fin.",
  },
  {
    speaker: "Giovanni",
    text: "En el equipo Rocket no aceptamos fracasos.",
  },
  { speaker: "Giovanni", text: "Comencemos." },
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
    text: "Recluta, nuestra misión en Sinnoh depende de cómo distribuyamos a nuestros agentes. Presta atención…",
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
    text: "Es infalible y garantiza la solución **óptima**, pero con un mapa tan grande puede consumir mucho tiempo y recursos…",
  },
  {
    speaker: "Giovanni",
    text: "Imagina enviar un ejército completo a cada ciudad, uno tras otro, hasta asegurar que no hay conflicto. Preciso… pero lento.",
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
