//blue if in right location, red if not

import type { Mensaje } from "./GiovanniDialog";

export type Ciudad = {
  nombre: string;
  top: string;
  left: string;
  color: string;
};

export const ciudades: Ciudad[] = [
  { nombre: "Twinleaf Town", top: "88%", left: "24.5%", color: "blue" },
  { nombre: "Sandgem Town", top: "84%", left: "30%", color: "blue" },
  { nombre: "Jubilife City", top: "73%", left: "29%", color: "blue" },
  { nombre: "Oreburgh City", top: "73%", left: "39.5%", color: "blue" },
  { nombre: "Floaroma Town", top: "60%", left: "30%", color: "blue" },
  { nombre: "Eterna Forest", top: "50%", left: "33%", color: "blue" },
  { nombre: "Eterna City", top: "49%", left: "39.5%", color: "blue" },
  { nombre: "Mount Coronet", top: "54%", left: "43.5%", color: "blue" },
  { nombre: "Hearthome City", top: "66%", left: "50%", color: "blue" },
  { nombre: "Solaceon Town", top: "61.5%", left: "57.5%", color: "blue" },
  { nombre: "Veilstone City", top: "57%", left: "67%", color: "blue" },
  { nombre: "Maniac Tunnel", top: "61%", left: "68%", color: "blue" },
  { nombre: "Turnback Cave", top: "66%", left: "70%", color: "blue" },
  { nombre: "Pastoria City", top: "82%", left: "61%", color: "blue" },
  { nombre: "Celestic Town", top: "48%", left: "49%", color: "blue" },
  { nombre: "Canalave City", top: "70%", left: "20.5%", color: "blue" },
  { nombre: "Snowpoint City", top: "10.5%", left: "43.3%", color: "blue" },
  { nombre: "Sunyshore City", top: "73%", left: "76.5%", color: "blue" },
  { nombre: "Sinnoh League", top: "48.3%", left: "75.5%", color: "blue" },
  { nombre: "Fight Area", top: "38.5%", left: "61.5%", color: "blue" },
  { nombre: "Survival Area", top: "28.5%", left: "62.2%", color: "blue" },
  { nombre: "Resort Area", top: "41.8%", left: "72.8%", color: "blue" },
];

export const getColorVisual = (ciudad: Ciudad): string => {
  return ciudad.color === "blue" ? "#2563eb" : "#dc2626";
};

export const conexiones: { [ciudad: string]: string[] } = {
  "Twinleaf Town": ["Sandgem Town"],
  "Sandgem Town": ["Twinleaf Town", "Jubilife City"],
  "Jubilife City": [
    "Sandgem Town",
    "Oreburgh City",
    "Floaroma Town",
    "Canalave City",
  ],
  "Oreburgh City": [
    "Jubilife City",
    "Mount Coronet",
    "Eterna City",
    "Hearthome City",
  ],
  "Floaroma Town": ["Jubilife City", "Eterna City", "Eterna Forest"],
  "Eterna Forest": ["Floaroma Town", "Eterna City"],
  "Eterna City": [
    "Floaroma Town",
    "Celestic Town",
    "Mount Coronet",
    "Oreburgh City",
  ],
  "Celestic Town": [
    "Eterna City",
    "Hearthome City",
    "Solaceon Town",
    "Oreburgh City",
  ],
  "Hearthome City": [
    "Celestic Town",
    "Solaceon Town",
    "Pastoria City",
    "Oreburgh City",
    "Mount Coronet",
  ],
  "Solaceon Town": ["Hearthome City", "Veilstone City", "Celestic Town"],
  "Veilstone City": ["Solaceon Town", "Pastoria City"],
  "Pastoria City": ["Hearthome City", "Veilstone City", "Sunyshore City"],
  "Sunyshore City": ["Pastoria City", "Pokémon League"],
  "Pokémon League": ["Sunyshore City"],
  "Canalave City": ["Jubilife City"],
  "Snowpoint City": ["Acuity Lakefront"],
  "Acuity Lakefront": ["Snowpoint City"],
  "Fight Area": ["Survival Area", "Resort Area"],
  "Survival Area": ["Fight Area"],
  "Resort Area": ["Fight Area"],
  "Mount Coronet": [
    "Oreburgh City",
    "Eterna City",
    "Celestic Town",
    "Hearthome City",
    "Mount Coronet",
  ],
};

export const getDialogoErrorConexion = (
  ciudad: string,
  seleccionadas: string[],
  conexiones: { [ciudad: string]: string[] }
): Mensaje[] => [
  {
    speaker: "Giovanni",
    text: `¡Error! ${ciudad} no tiene conexión con ninguna de las ciudades seleccionadas.`,
  },
  ...seleccionadas.map((c) => ({
    speaker: "Giovanni",
    text: `${c}: ${
      (conexiones[c] || [])
        .filter((conn) => seleccionadas.includes(conn))
        .join(", ") || "Sin conexiones"
    }`,
  })),
];
