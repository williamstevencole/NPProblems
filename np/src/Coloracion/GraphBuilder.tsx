// src/components/GraphBuilder.tsx
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
import InfoOverlay from "./info";

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

  const [dataBacktracking, setDataBacktracking] = useState<{
    asignacion: { [key: string]: number };
    colores_usados: number;
    tiempo: number;
    llamadas: number;
    backtracks: number;
  } | null>(null);
  const [dataGFG, setDataGFG] = useState<{
    asignacion: { [key: string]: number };
    colores_usados: number;
    tiempo: number;
    llamadas: number;
    backtracks: number;
  } | null>(null);

  const [mostrarInfoBack, setMostrarInfoBack] = useState(false);
  const [mostrarInfoGFG, setMostrarInfoGFG] = useState(false);

  //Estados de selección / grafo
  useEffect(() => {
    const newW: Record<string, number> = {};
    for (const k in textRefs.current) {
      const el = textRefs.current[k];
      if (el) newW[k] = el.getBBox().width;
    }
    setLabelWidths(newW);
  }, [hoveredCiudad]);

  // Al hacer clic en una ciudad del SVG
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
    setSeleccionadas((prev) => [...prev, nombre]);
    setGrafo((prev) => {
      const out = { ...prev };
      conex.forEach((c) => {
        out[c] = [...(out[c] || []), nombre];
        out[nombre] = [...(out[nombre] || []), c];
      });
      return out;
    });
    setDialogoActivo(dialogos.seleccionCiudad(nombre));
    setModoSeleccionActiva(false);
  };

  // Manejador de opciones del BattleMenu
  const handleMenuSelect = async (opt: string) => {
    if (opt === "Nueva Ubicacion") {
      // Reiniciar selección y resultados
      setColoracion({});
      setDataBacktracking(null);
      setDataGFG(null);
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

  // Manejador de cierre de diálogo, avanza estados según contexto
  const handleDialogClose = async () => {
    if (!dialogoActivo) return;
    const first = dialogoActivo[0].text;

    // 1) Si estoy en el diálogo inicial
    if (
      dialogoActivo.length === dialogos.inicio.length &&
      first === dialogos.inicio[0].text
    ) {
      setDialogoActivo([{ speaker: "", text: "¿Qué acción vas a hacer?" }]);
      setModoSeleccionActiva(false);
      return;
    }

    // 2) Si estoy en el diálogo de preselección
    if (
      dialogoActivo.length === dialogos.preselecionCiudad.length &&
      first === dialogos.preselecionCiudad[0].text
    ) {
      setDialogoActivo(null);
      setModoSeleccionActiva(true);
      return;
    }

    // 3) Si acabo de pulsar "Colorar" y estoy esperando resultados
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

      // Mensaje “Colocando agentes...”
      setDialogoActivo([{ speaker: "Giovanni", text: "Colocando agentes..." }]);
      setModoSeleccionActiva(false);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (resBacktracking.status !== 200 || resGFG.status !== 200) {
        setDialogoActivo(dialogos.resultado.fracaso);
        setModoSeleccionActiva(false);
        return;
      }

      // Obtener JSON de ambas respuestas
      const jsonBack = await resBacktracking.json();
      const jsonGFG = await resGFG.json();

      // Estados donde guardamos los datos devueltos
      const asignBack = jsonBack.backtracking?.asignacion ?? {};
      const coloresBack = jsonBack.backtracking?.colores_usados ?? 0;
      const tiempoBack = jsonBack.backtracking?.tiempo ?? 0;
      const llamadasBack = jsonBack.backtracking?.llamadas ?? 0;
      const backtsBack = jsonBack.backtracking?.backtracks ?? 0;

      // Estados donde guardamos los datos devueltos
      const asignG = jsonGFG.backtracking?.asignacion ?? {};
      const coloresG = jsonGFG.backtracking?.colores_usados ?? 0;
      const tiempoG = jsonGFG.backtracking?.tiempo ?? 0;
      const llamadasG = jsonGFG.backtracking?.llamadas ?? 0;
      const backtsG = jsonGFG.backtracking?.backtracks ?? 0;

      // Guardar en estado
      setDataBacktracking({
        asignacion: asignBack,
        colores_usados: coloresBack,
        tiempo: tiempoBack,
        llamadas: llamadasBack,
        backtracks: backtsBack,
      });
      setDataGFG({
        asignacion: asignG,
        colores_usados: coloresG,
        tiempo: tiempoG,
        llamadas: llamadasG,
        backtracks: backtsG,
      });

      // Actualizar coloración inmediata (usamos backtracking para pintar ahora)
      setColoracion(asignBack);

      // Pasamos al diálogo de éxito
      setDialogoActivo(dialogos.resultado.exito);
      setModoSeleccionActiva(false);
      return;
    }

    // 4) Tras cerrar el diálogo de éxito, mostramos el InfoOverlay de Backtracking
    if (
      dialogoActivo.length === dialogos.resultado.exito.length &&
      first === dialogos.resultado.exito[0].text &&
      dataBacktracking
    ) {
      setDialogoActivo(null);
      setMostrarInfoBack(true);
      return;
    }

    // 5) Si estoy viendo el InfoOverlay de Backtracking y el usuario presionó Shift/Espacio o hizo clic
    if (mostrarInfoBack) {
      setMostrarInfoBack(false);
      // Abrir diálogo intermedio antes de pasar a GFG
      setDialogoActivo([
        {
          speaker: "Giovanni",
          text: "Ahora veamos cómo lo hizo el algoritmo de GFG...",
        },
      ]);
      return;
    }

    // 6) Tras cerrar diálogo “Ahora veamos... GFG” mostramos InfoOverlay de GFG
    if (
      dialogoActivo.length === 1 &&
      dialogoActivo[0].text.includes("algoritmo de GFG") &&
      dataGFG
    ) {
      setDialogoActivo(null);
      setMostrarInfoGFG(true);
      return;
    }

    // 7) Si estoy viendo el InfoOverlay de GFG y el usuario presionó Shift/Espacio o hizo clic
    if (mostrarInfoGFG) {
      setMostrarInfoGFG(false);
      // Volver a menú de batalla
      setDialogoActivo([{ speaker: "", text: "¿Qué acción vas a hacer?" }]);
      setModoSeleccionActiva(false);
      return;
    }

    // Caso por defecto: volver al menú
    setDialogoActivo([{ speaker: "", text: "¿Qué acción vas a hacer?" }]);
    setModoSeleccionActiva(false);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black">
      {/* ------------------------------------------------------------ */}
      {/* SVG del mapa + líneas del grafo */}
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

      {/* ------------------------------------------------------------ */}
      {/* Diálogos y BattleMenu */}
      {dialogoActivo && (
        <PokemonDialog mensajes={dialogoActivo} onClose={handleDialogClose}>
          {dialogoActivo[0].speaker === "" && (
            <div className="flex justify-end mt-6 pointer-events-auto">
              <BattleMenu onSelect={handleMenuSelect} />
            </div>
          )}
        </PokemonDialog>
      )}

      {/* ------------------------------------------------------------ */}
      {/* InfoOverlay de Backtracking */}
      {mostrarInfoBack && dataBacktracking && (
        <InfoOverlay
          image={sprites[0]}
          backtracks={dataBacktracking.backtracks}
          llamadas={dataBacktracking.llamadas}
          colores={dataBacktracking.colores_usados}
          tiempo={dataBacktracking.tiempo}
          autor="Algoritmo Backtracking"
          description="Este algoritmo realiza una búsqueda exhaustiva por retroceso, garantizando una solución óptima aunque sea costoso en tiempo."
          onClose={() => {
            setMostrarInfoBack(false);
            // Al cerrar, abrimos el diálogo intermedio:
            setDialogoActivo([
              {
                speaker: "Giovanni",
                text: "Ahora veamos cómo lo hizo el algoritmo de GFG...",
              },
            ]);
          }}
        />
      )}

      {/* ------------------------------------------------------------ */}
      {/* InfoOverlay de GFG */}
      {mostrarInfoGFG && dataGFG && (
        <InfoOverlay
          image={sprites[1]}
          backtracks={dataGFG.backtracks}
          llamadas={dataGFG.llamadas}
          colores={dataGFG.colores_usados}
          tiempo={dataGFG.tiempo}
          autor="GeeksForGeeks"
          description="Este algoritmo implementa una versión heurística de coloración. Es más rápido pero no asegura siempre la solución óptima."
          onClose={() => {
            setMostrarInfoGFG(false);
            // Al cerrar, volvemos al menú de batalla
            setDialogoActivo([
              { speaker: "", text: "¿Qué acción vas a hacer?" },
            ]);
            setModoSeleccionActiva(false);
          }}
        />
      )}
    </div>
  );
}
