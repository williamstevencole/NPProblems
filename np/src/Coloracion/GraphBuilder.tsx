import { useState, useRef, useEffect } from "react";
import mapaSinnoh from "../assets/mapa-sinnoh.png";
import { ciudades, type Ciudad } from "./ciudades";

export default function GraphBuilder() {
  const [grafo, setGrafo] = useState<{ [key: string]: string[] }>({});
  const [ciudadAnterior, setCiudadAnterior] = useState<string | null>(null);
  const [hoveredCiudad, setHoveredCiudad] = useState<string | null>(null);
  const textRefs = useRef<Record<string, SVGTextElement | null>>({});
  const [labelWidths, setLabelWidths] = useState<Record<string, number>>({});

  useEffect(() => {
    const newWidths: Record<string, number> = {};
    for (const key in textRefs.current) {
      const el = textRefs.current[key];
      if (el) {
        newWidths[key] = el.getBBox().width;
      }
    }
    setLabelWidths(newWidths);
  }, [hoveredCiudad]);

  const handleCiudadClick = (nombre: string) => {
    if (ciudadAnterior && ciudadAnterior !== nombre) {
      setGrafo((prev) => {
        const actualizado = { ...prev };
        actualizado[ciudadAnterior] = [
          ...(actualizado[ciudadAnterior] || []),
          nombre,
        ];
        actualizado[nombre] = [...(actualizado[nombre] || []), ciudadAnterior];
        return actualizado;
      });
      setCiudadAnterior(null);
    } else {
      setCiudadAnterior(nombre);
    }
  };

  const getColorVisual = (ciudad: Ciudad): string => {
    return ciudad.color === "blue" ? "#2563eb" : "#dc2626";
  };

  return (
    <div className="fixed inset-0 w-screen h-screen">
      <svg
        viewBox="0 0 1268 734"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <image href={mapaSinnoh} width="1268" height="734" />

        {Object.entries(grafo).flatMap(([origen, destinos]) => {
          const ciudadOrigen = ciudades.find((c) => c.nombre === origen);
          if (!ciudadOrigen) return [];
          return destinos.map((destino) => {
            const ciudadDestino = ciudades.find((c) => c.nombre === destino);
            if (!ciudadDestino) return null;

            const x1 = (parseFloat(ciudadOrigen.left) / 100) * 1268;
            const y1 = (parseFloat(ciudadOrigen.top) / 100) * 734;
            const x2 = (parseFloat(ciudadDestino.left) / 100) * 1268;
            const y2 = (parseFloat(ciudadDestino.top) / 100) * 734;

            return (
              <line
                key={`${origen}-${destino}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth="2"
              />
            );
          });
        })}

        {ciudades.map((ciudad) => {
          const cx = (parseFloat(ciudad.left) / 100) * 1268;
          const cy = (parseFloat(ciudad.top) / 100) * 734;
          const backgroundColor = getColorVisual(ciudad);
          const textWidth = labelWidths[ciudad.nombre] || 0;

          return (
            <g
              key={ciudad.nombre}
              onClick={() => handleCiudadClick(ciudad.nombre)}
              onMouseEnter={() => setHoveredCiudad(ciudad.nombre)}
              onMouseLeave={() => setHoveredCiudad(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={cx}
                cy={cy}
                r="6"
                fill={
                  ciudad.nombre === ciudadAnterior ? "#facc15" : backgroundColor
                }
                stroke="white"
                strokeWidth="2"
              />
              {hoveredCiudad === ciudad.nombre && (
                <g>
                  <rect
                    x={cx + 10}
                    y={cy - 18}
                    width={textWidth + 16}
                    height={26}
                    fill={backgroundColor}
                    rx={5}
                  />
                  <text
                    ref={(el) => (textRefs.current[ciudad.nombre] = el)}
                    x={cx + 18}
                    y={cy}
                    fontSize="14"
                    fontWeight="bold"
                    fill="white"
                    fontFamily="sans-serif"
                    textAnchor="start"
                  >
                    {ciudad.nombre}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
