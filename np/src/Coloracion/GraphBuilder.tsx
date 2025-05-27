import { useState, useRef, useEffect } from "react";
import mapaSinnoh from "../assets/images/mapa-sinnoh copy.png";
import { ciudades, getColorVisual, conexiones } from "./ciudades";
import PokemonDialog from "./pokemonDialog";
import {
  dialogos,
  type Mensaje,
  getDialogoErrorConexion,
} from "./GiovanniDialog";
import BattleMenu from "./BattleMenu";

export default function GraphBuilder() {
  const [grafo, setGrafo] = useState<{ [key: string]: string[] }>({});
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
  const [hoveredCiudad, setHoveredCiudad] = useState<string | null>(null);
  const textRefs = useRef<Record<string, SVGTextElement | null>>({});
  const [labelWidths, setLabelWidths] = useState<Record<string, number>>({});
  const [dialogoActivo, setDialogoActivo] = useState<Mensaje[] | null>(
    dialogos.inicio
  );
  const [modoSeleccionActiva, setModoSeleccionActiva] = useState(false);

  // Mide ancho de labels para tooltip
  useEffect(() => {
    const newW: Record<string, number> = {};
    for (const k in textRefs.current) {
      const el = textRefs.current[k];
      if (el) newW[k] = el.getBBox().width;
    }
    setLabelWidths(newW);
  }, [hoveredCiudad]);

  // Click en ciudad
  const handleCiudadClick = (nombre: string) => {
    if (dialogoActivo || !modoSeleccionActiva) return;
    if (seleccionadas.length === 0) {
      setSeleccionadas([nombre]);
      setDialogoActivo(dialogos.seleccionCiudad(nombre));
      setModoSeleccionActiva(false);
      return;
    }
    const conex = (conexiones[nombre] || []).filter((c) =>
      seleccionadas.includes(c)
    );
    if (conex.length === 0) {
      setDialogoActivo(
        getDialogoErrorConexion(nombre, seleccionadas, conexiones)
      );
      setModoSeleccionActiva(false);
      return;
    }
    setSeleccionadas((p) => [...p, nombre]);
    setGrafo((p) => {
      const out = { ...p };
      conex.forEach((c) => {
        out[c] = [...(out[c] || []), nombre];
        out[nombre] = [...(out[nombre] || []), c];
      });
      return out;
    });
    setDialogoActivo(dialogos.seleccionCiudad(nombre));
    setModoSeleccionActiva(false);
  };

  // Selección de menú
  const handleMenuSelect = (opt: string) => {
    if (opt === "Nueva Ubicacion") {
      setDialogoActivo(dialogos.preselecionCiudad);
      setModoSeleccionActiva(false);
    } else {
      setDialogoActivo([
        { speaker: "Giovanni", text: `No puedes usar ${opt} ahora.` },
      ]);
      setModoSeleccionActiva(false);
    }
  };

  // Cierra diálogo y avanza estado
  const handleDialogClose = () => {
    if (!dialogoActivo) return;
    const first = dialogoActivo[0].text;
    // 1) Intro
    if (
      dialogoActivo.length === dialogos.inicio.length &&
      first === dialogos.inicio[0].text
    ) {
      setDialogoActivo([{ speaker: "", text: "¿Qué acción vas a hacer?" }]);
      setModoSeleccionActiva(false);
      return;
    }
    // 2) Preselección
    if (
      dialogoActivo.length === dialogos.preselecionCiudad.length &&
      first === dialogos.preselecionCiudad[0].text
    ) {
      setDialogoActivo(null);
      setModoSeleccionActiva(true);
      return;
    }
    // 3) Selección o error
    setDialogoActivo([{ speaker: "", text: "¿Qué acción vas a hacer?" }]);
    setModoSeleccionActiva(false);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black">
      <svg
        viewBox="0 0 1268 734"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* Imagen de fondo estirada al viewBox 1268×734 */}
        <image
          href={mapaSinnoh}
          x="0"
          y="0"
          width="1268"
          height="734"
          preserveAspectRatio="none"
        />

        {/* Líneas de conexión */}
        {Object.entries(grafo).flatMap(([o, dests]) =>
          dests.map((d) => {
            const co = ciudades.find((c) => c.nombre === o);
            const cd = ciudades.find((c) => c.nombre === d);
            if (!co || !cd) return null;
            const x1 = (parseFloat(co.left) / 100) * 1268;
            const y1 = (parseFloat(co.top) / 100) * 734;
            const x2 = (parseFloat(cd.left) / 100) * 1268;
            const y2 = (parseFloat(cd.top) / 100) * 734;
            return (
              <line
                key={`${o}-${d}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth={2}
              />
            );
          })
        )}

        {/* Nodos */}
        {ciudades.map((ciudad) => {
          const cx = (parseFloat(ciudad.left) / 100) * 1268;
          const cy = (parseFloat(ciudad.top) / 100) * 734;
          const bg = getColorVisual(ciudad);
          const tw = labelWidths[ciudad.nombre] || 0;
          return (
            <g
              key={ciudad.nombre}
              onClick={() => handleCiudadClick(ciudad.nombre)}
              onMouseEnter={() => setHoveredCiudad(ciudad.nombre)}
              onMouseLeave={() => setHoveredCiudad(null)}
              style={{
                cursor: modoSeleccionActiva ? "pointer" : "not-allowed",
                opacity: modoSeleccionActiva ? 1 : 0.6,
              }}
            >
              <circle
                cx={cx}
                cy={cy}
                r={6}
                fill={bg}
                stroke="white"
                strokeWidth={2}
              />
              {hoveredCiudad === ciudad.nombre && (
                <>
                  <rect
                    x={cx + 10}
                    y={cy - 18}
                    width={tw + 16}
                    height={26}
                    fill={bg}
                    rx={5}
                  />
                  <text
                    ref={(el) => {
                      if (el) textRefs.current[ciudad.nombre] = el;
                    }}
                    x={cx + 18}
                    y={cy}
                    fontSize={14}
                    fontWeight="bold"
                    fill="white"
                    fontFamily="pokemon-dp-pro"
                  >
                    {ciudad.nombre}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>

      {dialogoActivo && (
        <PokemonDialog mensajes={dialogoActivo} onClose={handleDialogClose}>
          {dialogoActivo[0].speaker === "" && (
            <div className="flex justify-end mt-6 pointer-events-auto">
              <BattleMenu onSelect={handleMenuSelect} />
            </div>
          )}
        </PokemonDialog>
      )}
    </div>
  );
}
