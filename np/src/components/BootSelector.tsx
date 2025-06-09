import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import grafo from "../assets/images/grafo.png";
import github from "../assets/images/github.png";
import docs from "../assets/images/docs.png";
import mochila from "../assets/images/mochila.png"

type Disk = {
  to: string;
  label: string;
  image: any;
};

const disks: Disk[] = [
  {
    to: "/coloracion",
    label: "Coloración de Grafos",
    image: grafo,
  },
  {
    to: "/knapsack",
    label: "Mochila",
    image: mochila,
  },
  {
    to: "https://github.com/williamstevencole/NPProblems",
    label: "GitHub",
    image: github,
  },
  {
    to: "https://docs.google.com/document/d/1X-mLcO9X6iE0esg6RqJ-6aRle8_ljLbglCK5NAqm03E/edit?tab=t.0",
    label: "Informe",
    image: docs,
  },
   {
    to: "/knapsack",
    label: "Knapsack",
    image: mochila,
  },
  /*

  AGREGAR LOS NUEVOS PROBLEMAS NP AQUI

 
  {
    to: "/coloracion",
    label: "Coloración de Grafos",
    image: grafo,
  },
  */
];

export default function BootSelector() {
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col justify-between items-center py-12 select-none">
      {/* Logo estilo Apple arriba */}
      <div className="flex flex-col items-center justify-center gap-14">
        <text className="text-6xl font-bold text-white tracking-wide">
          Proyecto Analisis de Algoritmos
        </text>
        <img src={logo} alt="logo" className="w-1/2" />
      </div>

      {/* Discos */}
      <div className="flex flex-row gap-16 items-center justify-center">
        {disks.map((disk) => (
          <Link
            key={disk.to}
            to={disk.to}
            className="flex flex-col items-center group"
          >
            {disk.label === "Coloración de Grafos" ? (
              <img src={disk.image} alt={disk.label} className="w-38 h-32" />
            ) : (
              <img src={disk.image} alt={disk.label} className="w-32 h-32" />
            )}

            <span className="mt-4 text-lg text-zinc-300 group-hover:text-yellow-300 transition-colors duration-200 font-medium">
              {disk.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Footer nombre del estudiante */}
      <div className="text-sm text-zinc-500 tracking-wider mt-12">
        Heyden Aldana - Gerardo Aeschlimann - William Cole
      </div>
    </div>
  );
}
