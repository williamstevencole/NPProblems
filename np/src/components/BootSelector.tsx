import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import grafo from "../assets/images/grafo.png";
import github from "../assets/images/github.png";
import docs from "../assets/images/docs.png";
import mochila from "../assets/images/mochila.png";

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
    label: "Knapsack",
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
];

export default function BootSelector() {
  return (
    <div
      className="h-screen w-screen 
      bg-gradient-to-b from-cyan-950 via-sky-900 to-blue-800
      text-white flex flex-col justify-between items-center py-10 px-6 select-none"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-6 mt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400 drop-shadow-lg">
          Proyecto: Análisis de Algoritmos
        </h1>
        <img
          src={logo}
          alt="logo"
          className="w-32 md:w-40 lg:w-48 opacity-95 hover:scale-105 transition-transform duration-300 drop-shadow-xl"
        />
      </div>

      {/* Discos */}
      <div className="flex flex-wrap justify-center gap-12 mt-6">
        {disks.map((disk) => (
          <Link
            key={disk.to}
            to={disk.to}
            target={disk.to.startsWith("http") ? "_blank" : undefined}
            className="flex flex-col items-center group hover:scale-110 transition-transform duration-300"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 shadow-2xl border border-white/10 group-hover:border-yellow-300 transition-all duration-300">
              <img
                src={disk.image}
                alt={disk.label}
                className="w-24 h-24 object-contain"
              />
            </div>
            <span className="mt-3 text-md md:text-lg text-zinc-200 group-hover:text-yellow-300 font-semibold transition-colors text-center">
              {disk.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="text-sm text-zinc-300 tracking-wide mt-10 text-center">
        <span className="block">
          Heyden Aldana · Gerardo Aeschlimann · William Cole
        </span>
        <span className="text-xs text-zinc-400 mt-1">
          Análisis de Algoritmos · 2025
        </span>
      </div>
    </div>
  );
}
