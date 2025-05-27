import { useState, useRef, useEffect } from "react";
import mapaSinnoh from "../assets/images/mapa-sinnoh.png";
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

  // Calcular ancho de etiquetas en SVG para posicionamiento
  useEffect(() => {
    const newWidths: Record<string, number> = {};
    for (const key in textRefs.current) {
      const el = textRefs.current[key];
      if (el) newWidths[key] = el.getBBox().width;
    }
    setLabelWidths(newWidths);
  }, [hoveredCiudad]);

  // Manejo de clic en ciudades
  const handleCiudadClick = (nombre: string) => {
    if (dialogoActivo || !modoSeleccionActiva) return;

    // Primera selección
    if (seleccionadas.length === 0) {
      setSeleccionadas([nombre]);
      setDialogoActivo(dialogos.seleccionCiudad(nombre));
      setModoSeleccionActiva(false);
      return;
    }

    // Validar conexiones
    const conexionesConSeleccionadas = (conexiones[nombre] || []).filter((c) =>
      seleccionadas.includes(c)
    );
    if (conexionesConSeleccionadas.length === 0) {
      setDialogoActivo(
        getDialogoErrorConexion(nombre, seleccionadas, conexiones)
      );
      setModoSeleccionActiva(false);
      return;
    }

    // Agregar ciudad al grafo
    setSeleccionadas((prev) => [...prev, nombre]);
    setGrafo((prev) => {
      const actualizado = { ...prev };
      conexionesConSeleccionadas.forEach((c) => {
        actualizado[c] = [...(actualizado[c] || []), nombre];
        actualizado[nombre] = [...(actualizado[nombre] || []), c];
      });
      return actualizado;
    });

    setDialogoActivo(dialogos.seleccionCiudad(nombre));
    setModoSeleccionActiva(false);
  };

  // Manejo de selección en BattleMenu
  const handleMenuSelect = (option: string) => {
    if (option === "Nueva Ubicacion") {
      setDialogoActivo(dialogos.preselecionCiudad);
      setModoSeleccionActiva(false);
    } else {
      setDialogoActivo([
        {
          speaker: "Giovanni",
          text: `No puedes usar ${option} ahora mismo. Concéntrate en la misión.`,
        },
      ]);
      setModoSeleccionActiva(false);
    }
  };

  // Función de cierre del diálogo
  const handleDialogClose = () => {
    if (!dialogoActivo) return;

    const primerTexto = dialogoActivo[0].text;

    // 1) Terminó diálogo de introducción?
    if (
      dialogoActivo.length === dialogos.inicio.length &&
      primerTexto === dialogos.inicio[0].text
    ) {
      setDialogoActivo([{ speaker: "", text: "¿Qué acción vas a hacer?" }]);
      setModoSeleccionActiva(false);
      return;
    }

    // 2) Terminó diálogo de preselección?
    if (
      dialogoActivo.length === dialogos.preselecionCiudad.length &&
      primerTexto === dialogos.preselecionCiudad[0].text
    ) {
      // Activar selección de ciudades
      setDialogoActivo(null);
      setModoSeleccionActiva(true);
      return;
    }

    // 3) Terminó diálogo de selección o error de conexión?
    setDialogoActivo([{ speaker: "", text: "¿Qué acción vas a hacer?" }]);
    setModoSeleccionActiva(false);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black">
      <svg
        viewBox="0 0 1268 734"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <image
          href={mapaSinnoh}
          width="1268"
          height="734"
          className="w-full h-full"
        />

        {Object.entries(grafo).flatMap(([origen, destinos]) =>
          destinos.map((destino) => {
            const o = ciudades.find((c) => c.nombre === origen);
            const d = ciudades.find((c) => c.nombre === destino);
            if (!o || !d) return null;
            const x1 = (parseFloat(o.left) / 100) * 1268;
            const y1 = (parseFloat(o.top) / 100) * 734;
            const x2 = (parseFloat(d.left) / 100) * 1268;
            const y2 = (parseFloat(d.top) / 100) * 734;
            return (
              <line
                key={`${origen}-${destino}`}
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
                fill={seleccionadas.includes(ciudad.nombre) ? "#facc15" : bg}
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

      {dialogoActivo !== null && (
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
