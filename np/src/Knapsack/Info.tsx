import { useState } from "react";
import { MagicCard } from "react-magic-motion";
import "react-magic-motion/card.css";
import  mochila from "./mochila.jpg"
import "./infostyle.css"
function CloseFullscreenSvg() {
  return (
    <>
      <rect
        x="1"
        y="16"
        width="14"
        height="15"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M26 5L18 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 13H22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 13V9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  );
}
 
function OpenFullscreenSvg() {
  return (
    <>
      <rect
        x="1"
        y="8"
        width="21"
        height="23"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 24L15 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 16H11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 16V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  );
}
 
export default function ExpandableCard(){
  const [isCardExpanded, setIsCardExpanded] = useState(false);
 
  return (
    <MagicCard
      isCardExpanded={isCardExpanded}
      onBackgroundFadeClick={() => setIsCardExpanded(false)}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div
        style={{
          width: isCardExpanded ? "40rem" : "17rem",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
          padding: "1.35rem 0",
          color: isCardExpanded ? "white" : "currentColor",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              fontWeight: 600,
              fontSize: "1.4em",
              color:"#ffffff"
            }}
          >
            Historia
          </h3>
 
          <button
            style={{ cursor:"pointer", position: "absolute", right: 0, zIndex: 9999 }}
            onClick={() => setIsCardExpanded(!isCardExpanded)}
          >
            <svg
              key="exclude"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isCardExpanded ? (
                <CloseFullscreenSvg />
              ) : (
                <OpenFullscreenSvg />
              )}
            </svg>
          </button>
        </div>
        <div style={{ overflowY: "auto" }}>
         <div className="card">
            <div className="card_body">
                <div className="card_title">
                <img
                style={{
                width: isCardExpanded ? "24rem" : "17.5rem",
                height: "auto",
                border: "3px solid rgb(250, 250, 250)", 
                borderRadius: "8px",
                }}
                src={mochila}
                alt="Knapsack"
                />
                </div>
            </div>
         </div>

          {isCardExpanded && (
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h4 style={{ fontSize: "1.2em", fontWeight: 600 }}>
                Problema NP: 0/1 KnapSack
              </h4>
              <p>
              Imagina que eres un ladrón que roba una exhibición de museo 
              llena de joyas, eres nuevo en esto, así que solo llevas 
              una mochila. Tu objetivo debería ser llevarte los objetos 
              más valiosos sin sobrecargarla hasta que se rompa o se 
              vuelva demasiado pesada. ¿Cómo eliges entre los objetos 
              para maximizar tu botín? Podrías hacer una lista 
              de todos los artefactos y sus pesos para calcular la 
              respuesta a mano. Pero cuantos más objetos haya, más difícil 
              se vuelve este cálculo para una persona o una computadora.
              </p>
              <p>
              El problema de la mochila pertenece a la clase de problemas "NP", 
              que significa "tiempo polinómico no determinista". El nombre hace 
              referencia a cómo estos problemas obligan a una computadora a 
              realizar muchos pasos para llegar a una solución, y el número 
              aumenta drásticamente según el tamaño de las entradas; 
              por ejemplo, el inventario de artículos disponibles al llenar 
              una mochila. Por definición, los problemas NP también tienen 
              soluciones fáciles de verificar (sería trivial comprobar 
              que una lista de artículos cabe en una mochila).
              </p>
              <p>
              En pequeños experimentos en los que se pidió a los participantes 
              que llenaran una mochila en la pantalla de una computadora con 
              artículos que tenían valores y pesos establecidos, las personas 
              tendieron a tener más dificultades para optimizar el contenido 
              de la mochila a medida que aumentaba el número de opciones de 
              artículos (el mismo problema que tienen las computadoras).
              </p>
              
            </section>
          )}
        </div>
      </div>
    </MagicCard>
  );
}