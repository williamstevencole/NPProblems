import type { FC } from "react";

interface BattleMenuProps {
  onSelect: (option: string) => void;
}

const options = [
  {
    label: "Nueva Ubicacion",
    gradient: "from-[#ff7f7f] to-[#6b0000]",
    border: "border-pink-800",
  },
  {
    label: "Colorar",
    gradient: "from-[#86c686] to-[#183218]",
    border: "border-green-900",
  },
  {
    label: "Información de Algoritmos",
    gradient: "from-[#e6b94d] to-[#6b5700]",
    border: "border-yellow-900",
  },
  {
    label: "Salir",
    gradient: "from-[#468dd3] to-[#0a1a2a]",
    border: "border-blue-900",
  },
];

const BattleMenu: FC<BattleMenuProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 pointer-events-auto">
      {options.map((opt) => (
        <button
          key={opt.label}
          onClick={() => onSelect(opt.label)}
          className={`relative w-48 h-24 flex items-center justify-center text-sm sm:text-base font-bold uppercase text-white bg-gradient-to-b ${opt.gradient} 
            border-2 border-black ${opt.border} rounded-[8px] shadow-[4px_4px_0_rgba(0,0,0,1)] active:shadow-none focus:outline-none before:absolute before:inset-0 before:border before:border-white before:rounded-[6px] before:pointer-events-none`}
        >
          <div className="relative inline-block leading-none select-none">
            <span className="relative text-base sm:text-lg font-bold uppercase text-white font-pokemon">
              {opt.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default BattleMenu;
