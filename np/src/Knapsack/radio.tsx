import { useState } from "react";
import "./radio.css";

interface RadioalgoProps {
  onChange?: (value: string) => void;
}

export default function Radioalgo({ onChange }: RadioalgoProps) {
  const [selected, setSelected] = useState("exacto");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className="container">
      <form className="toggle">
        <input
          type="radio"
          id="choice1"
          name="choice"
          value="exacto"
          checked={selected === "exacto"}
          onChange={handleChange}
        />
        <label htmlFor="choice1">Exacto</label>

        <input
          type="radio"
          id="choice2"
          name="choice"
          value="aproximado"
          checked={selected === "aproximado"}
          onChange={handleChange}
        />
        <label htmlFor="choice2">Aproximado</label>

        <div id="flap">
          <span className="content">Algoritmo</span>
        </div>
      </form>
    </div>
  );
}
