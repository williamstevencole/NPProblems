import { useState, useRef, useEffect } from "react";
import mapaSinnoh from "../assets/images/mapa-sinnoh copy.png";
import { ciudades, conexiones } from "./ciudades";
import PokemonDialog from "./pokemonDialog";
import {
  dialogos,
  type Mensaje,
  getDialogoErrorConexion,
} from "./GiovanniDialog";
import BattleMenu from "./BattleMenu";
import { sprites } from "./sprites";
import ConvertJSONToMatrix from "../utils/ConvertJSONToMatrix";

//const URL_BACKTRACKING ="https://coleexz.pythonanywhere.com/api/coloracion-backtracking";
//const URL_BACKTRACKING_GFG ="https://coleexz.pythonanywhere.com/api/coloracion-backtracking-gfg";

const URL_BACKTRACKING = "http://127.0.0.1:5000/api/coloracion-backtracking";
const URL_BACKTRACKING_GFG =
  "http://127.0.0.1:5000/api/coloracion-backtracking-gfg";

export default function GraphBuilder({
  colorBase = "blue",
}: {
  colorBase?: "blue" | "red";
}) {
  const [grafo, setGrafo] = useState<{ [key: string]: string[] }>({});
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
  const [hoveredCiudad, setHoveredCiudad] = useState<string | null>(null);
  const [coloracion, setColoracion] = useState<{ [key: string]: number }>({});
  const textRefs = useRef<Record<string, SVGTextElement | null>>({});
  const [labelWidths, setLabelWidths] = useState<Record<string, number>>({});
  const [dialogoActivo, setDialogoActivo] = useState<Mensaje[] | null>(
    dialogos.inicio
  );
  const [modoSeleccionActiva, setModoSeleccionActiva] = useState(false);
  const [pendienteColoracion, setPendienteColoracion] = useState(false);

  const [coloracionBacktracking, setColoracionBacktracking] = useState<{
    [key: string]: number;
  }>({});
  const [coloracionBacktrackingGFG, setColoracionBacktrackingGFG] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const newW: Record<string, number> = {};
    for (const k in textRefs.current) {
      const el = textRefs.current[k];
      if (el) newW[k] = el.getBBox().width;
    }
    setLabelWidths(newW);
  }, [hoveredCiudad]);

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

  const handleMenuSelect = async (opt: string) => {
    if (opt === "Nueva Ubicacion") {
      setColoracionBacktracking({});
      setColoracionBacktrackingGFG({});
      setColoracion({});

      setDialogoActivo(dialogos.preselecionCiudad);
      setModoSeleccionActiva(false);
    } else if (opt === "Información de Algoritmos") {
      setDialogoActivo(dialogos.informacionAlgoritmos);
      setModoSeleccionActiva(false);
    } else if (opt === "Colorar") {
      if (!dialogoActivo) return;
      if (Object.keys(grafo).length === 0) {
        setDialogoActivo([
          {
            speaker: "Giovanni",
            text: "No has seleccionado ninguna ciudad. Selecciona al menos una ciudad antes de colorear.",
          },
        ]);
        setModoSeleccionActiva(false);
        return;
      }
      setDialogoActivo(dialogos.preparacion);
      setModoSeleccionActiva(false);
      setPendienteColoracion(true);
    } else {
      setDialogoActivo([
        { speaker: "Giovanni", text: `No puedes usar ${opt} ahora.` },
      ]);
      setModoSeleccionActiva(false);
    }
  };

  const handleDialogClose = async () => {
    if (!dialogoActivo) return;

    const first = dialogoActivo[0].text;

    if (
      dialogoActivo.length === dialogos.inicio.length &&
      first === dialogos.inicio[0].text
    ) {
      setDialogoActivo([{ speaker: "", text: "¿Qué acción vas a hacer?" }]);
      setModoSeleccionActiva(false);
      return;
    }

    if (
      dialogoActivo.length === dialogos.preselecionCiudad.length &&
      first === dialogos.preselecionCiudad[0].text
    ) {
      setDialogoActivo(null);
      setModoSeleccionActiva(true);
      return;
    }

    if (pendienteColoracion) {
      setPendienteColoracion(false);

      const body = JSON.stringify({ grafo });

      const [resBacktracking, resGFG] = await Promise.all([
        fetch(URL_BACKTRACKING, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        }),
        fetch(URL_BACKTRACKING_GFG, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ConvertJSONToMatrix(grafo)),
        }),
      ]);

      setDialogoActivo([{ speaker: "Giovanni", text: "Colocando agentes..." }]);
      setModoSeleccionActiva(false);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (resBacktracking.status !== 200 || resGFG.status !== 200) {
        setDialogoActivo(dialogos.resultado.fracaso);
        setModoSeleccionActiva(false);
        return;
      }

      const dataBacktracking = await resBacktracking.json();

      const asignacionBack = dataBacktracking.backtracking?.asignacion ?? {};
      const asignacionGFG =
        (await resGFG.json()).backtracking?.asignacion ?? {};

      setColoracionBacktracking(asignacionBack);
      setColoracionBacktrackingGFG(asignacionGFG);

      //Por mientras no lo estoy utilizando
      console.log(coloracionBacktracking);
      console.log(coloracionBacktrackingGFG);

      setColoracion(asignacionBack);

      setDialogoActivo(dialogos.resultado.exito);
      setModoSeleccionActiva(false);
      return;
    }

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
        <image
          href={mapaSinnoh}
          x="0"
          y="0"
          width="1268"
          height="734"
          preserveAspectRatio="none"
        />

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

        {ciudades.map((ciudad) => {
          const cx = (parseFloat(ciudad.left) / 100) * 1268;
          const cy = (parseFloat(ciudad.top) / 100) * 734;

          let bg = "#facc15";
          if (!seleccionadas.includes(ciudad.nombre)) {
            bg = colorBase === "red" ? "#dc2626" : "#2563eb";
          }
          const tw = labelWidths[ciudad.nombre] || 0;
          const colorIndex = coloracion[ciudad.nombre];
          const spriteUrl = colorIndex ? sprites[colorIndex - 1] : null;

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
              {spriteUrl && (
                <image
                  href={spriteUrl}
                  x={cx - 20}
                  y={cy - 20}
                  width={40}
                  height={40}
                  style={{ pointerEvents: "none" }}
                />
              )}
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
