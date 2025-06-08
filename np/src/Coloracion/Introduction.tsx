import { useState } from "react";
import PokemonDialog from "./pokemonDialog";
import GraphBuilder from "./GraphBuilder";
import welcome from "../assets/images/welcome.png";
import { sprites } from "./sprites";
import { dialogos } from "./GiovanniDialog";

export default function Introduction() {
  const [showIntro, setShowIntro] = useState(true);

  if (!showIntro) return <GraphBuilder />;

  const VIEWBOX_WIDTH = 1536;
  const VIEWBOX_HEIGHT = 1024;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#3D9B87]">
      {/* SVG con fondo y sprite en coordenadas fijas */}
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* Fondo de bienvenida */}
        <image
          href={welcome}
          x={0}
          y={-120}
          width={VIEWBOX_WIDTH}
          height={VIEWBOX_HEIGHT}
          preserveAspectRatio="none"
        />
        <image href={sprites[9]} x={600} y={-160} width={500} height={1200} />
      </svg>

      <div className="absolute inset-0 flex items-end justify-start pointer-events-none">
        <PokemonDialog
          mensajes={dialogos.preludio}
          onClose={() => setShowIntro(false)}
        />
      </div>
    </div>
  );
}
