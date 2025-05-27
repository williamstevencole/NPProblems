interface BattleMenuProps {
  onSelect: (option: string) => void;
}

const options = [
  { label: "Nueva Ubicacion", color: "bg-red-600" },
  { label: "Bag", color: "bg-yellow-500" },
  { label: "Pokemon", color: "bg-green-600" },
  { label: "Run", color: "bg-blue-600" },
];

export default function BattleMenu({ onSelect }: BattleMenuProps) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      {options.map((opt) => (
        <button
          key={opt.label}
          onClick={() => onSelect(opt.label)}
          className={`w-40 py-3 rounded-lg text-xl font-extrabold text-white shadow-lg border-4 border-black ${opt.color} hover:scale-105 hover:brightness-110 transition-transform duration-150`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
