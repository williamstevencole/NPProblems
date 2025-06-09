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
  onClose: () => void;
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
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(100); // Start offscreen (100%)
  const textRefs = useRef<Record<string, SVGTextElement | null>>({});

  // Fade in and slide up effect when component mounts
  useEffect(() => {
    // Start with 0 opacity and translated down
    setOpacity(0);
    setTranslateY(100);
    // After a small delay, animate to full opacity and position
    const timer = setTimeout(() => {
      setOpacity(1);
      setTranslateY(0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

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
        handleClose(e);
      }
      if (e instanceof MouseEvent) {
        handleClose(e);
      }
    };
    window.addEventListener("keydown", handler);
    window.addEventListener("mousedown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  // Close handler with fade out effect
  const handleClose = (e: Event) => {
    e.preventDefault();
    setOpacity(0);
    setTranslateY(-100); // Move up and out
    setTimeout(onClose, 1200);
  };

  return (
    <div
      className="fixed inset-0 w-full h-full bg-black flex justify-center items-center z-50"
      style={{
        opacity,
        transform: `translateY(${translateY}%)`,
        transition: "opacity 300ms ease-in-out, transform 600ms ease-in-out",
      }}
    >
      <svg
        viewBox="0 0 1536 1024"
        preserveAspectRatio="none"
        className="w-full h-screen"
      >
        {/* Fondo fijo */}
        <image href={info} x="0" y="0" width="1536" height="1024" />

        {/* Imagen semitransparente encima */}
        <image href={image} x="120" y="180" width="500" height="500" />

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
        <text x={1070} y={220} fontSize={26} fontFamily="pokemon-dp-pro">
          {backtracks}
        </text>

        {/* Llamadas */}
        <text x={800} y={330} fontSize={26} fontFamily="pokemon-dp-pro">
          Llamadas
        </text>
        <text x={1070} y={330} fontSize={26} fontFamily="pokemon-dp-pro">
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
        <text x={800} y={660} fontSize={26} fontFamily="pokemon-dp-pro">
          Autor
        </text>
        <text x={1070} y={660} fontSize={26} fontFamily="pokemon-dp-pro">
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
