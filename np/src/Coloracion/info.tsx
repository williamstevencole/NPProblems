// src/components/InfoOverlay.tsx
import info from "../assets/images/info.png";
import { useEffect, useRef, useState } from "react";

interface InfoProps {
  image: any;
  backtracks: number;
  llamadas: number;
  colores: number;
  tiempo: number; // en milisegundos
  autor: string;
  description: string;
  onClose: () => void; // callback para cerrar
}

const InfoOverlay = ({
  image,
  backtracks,
  llamadas,
  colores,
  tiempo,
  autor,
  description,
  onClose,
}: InfoProps) => {
  const [, setLabelWidths] = useState<Record<string, number>>({});
  const textRefs = useRef<Record<string, SVGTextElement | null>>({});

  useEffect(() => {
    const newW: Record<string, number> = {};
    for (const k in textRefs.current) {
      const el = textRefs.current[k];
      if (el) newW[k] = el.getBBox().width;
    }
    setLabelWidths(newW);
  }, [backtracks, llamadas, colores, tiempo]);

  // Listener para cerrar al presionar Shift, Espacio o clic en toda la pantalla
  useEffect(() => {
    const handler = (e: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent && (e.key === " " || e.key === "Shift")) {
        onClose();
      }
      if (e instanceof MouseEvent) {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 w-full h-full bg-black flex justify-center items-center z-50">
      <svg
        viewBox="0 0 1536 1024"
        preserveAspectRatio="none"
        className="w-full h-screen"
      >
        {/* Fondo fijo */}
        <image href={info} x="0" y="0" width="1536" height="1024" />

        {/* Imagen semitransparente encima */}
        <image
          href={image}
          x="0"
          y="0"
          width="1536"
          height="1024"
          className="opacity-50"
        />

        {/* Backtracks */}
        <text
          x={800}
          y={220}
          fontSize={26}
          fill="black"
          fontFamily="pokemon-dp-pro"
        >
          Backtracks
        </text>
        <text
          x={1070}
          y={220}
          fontSize={26}
          fill="black"
          fontFamily="pokemon-dp-pro"
        >
          {backtracks}
        </text>

        {/* Llamadas */}
        <text
          x={800}
          y={330}
          fontSize={26}
          fill="black"
          fontFamily="pokemon-dp-pro"
        >
          Llamadas
        </text>
        <text
          x={1070}
          y={330}
          fontSize={26}
          fill="black"
          fontFamily="pokemon-dp-pro"
        >
          {llamadas}
        </text>

        {/* No. Colores */}
        <text
          x={800}
          y={440}
          fontSize={26}
          fill="black"
          fontFamily="pokemon-dp-pro"
        >
          No. Colores
        </text>
        <text
          x={1070}
          y={440}
          fontSize={26}
          fill="black"
          fontFamily="pokemon-dp-pro"
        >
          {colores}
        </text>

        {/* Tiempo */}
        <text
          x={800}
          y={550}
          fontSize={26}
          fill="black"
          fontFamily="pokemon-dp-pro"
        >
          Tiempo (ms)
        </text>
        <text
          x={1070}
          y={550}
          fontSize={26}
          fill="black"
          fontFamily="pokemon-dp-pro"
        >
          {tiempo.toFixed(8)}
        </text>

        {/* Autor */}
        <text
          x={800}
          y={660}
          fontSize={26}
          fill="black"
          fontFamily="pokemon-dp-pro"
        >
          Autor
        </text>
        <text
          x={1070}
          y={660}
          fontSize={26}
          fill="black"
          fontFamily="pokemon-dp-pro"
        >
          {autor}
        </text>

        {/* Description con wrapping */}
        <foreignObject x={50} y={750} width={1500} height={300}>
          <div
            style={{
              fontSize: "22px",
              color: "black",
              fontFamily: "pokemon-dp-pro, sans-serif",
              lineHeight: "3",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflow: "hidden",
              textAlign: "start",
            }}
          >
            {description}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default InfoOverlay;
