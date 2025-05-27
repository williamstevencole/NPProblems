import { useState, useEffect, type ReactNode } from "react";
import messageBox from "../assets/images/message-box.png";

type Mensaje = {
  speaker: string;
  text: string;
};

interface PokemonDialogProps {
  mensajes: Mensaje[];
  onClose: () => void;
  children?: ReactNode;
}

export default function PokemonDialog({
  mensajes,
  onClose,
  children,
}: PokemonDialogProps) {
  const [index, setIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Determina si estamos en el prompt de acción
  const isAccionTexto =
    mensajes[index]?.text.trim() === "¿Qué acción vas a hacer?" &&
    mensajes[index].speaker === "";

  // Animación de tipeo (no aplicable al prompt)
  useEffect(() => {
    if (isAccionTexto) return;
    const fullText = mensajes[index]?.text || "";
    let i = 0;
    setTypedText("");
    setIsTyping(true);
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [index, mensajes, isAccionTexto]);

  // Avanza el diálogo
  const avanzar = () => {
    if (isTyping) return;
    if (isAccionTexto) return;
    if (index < mensajes.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
      onClose();
    }
  };

  // Manejo de teclas (Enter y Shift)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAccionTexto) return;
      if (e.key === "Enter") avanzar();
      else if (e.key === "Shift") {
        setIndex(mensajes.length - 1);
        setTypedText(mensajes[mensajes.length - 1].text);
        setIsTyping(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, isTyping, isAccionTexto, mensajes]);

  if (!mensajes[index]) return null;

  return (
    <div className="absolute bottom-[-140px] left-0 w-full flex items-center justify-center pointer-events-none z-50">
      <div
        className="relative w-full aspect-[3/1] bg-no-repeat bg-contain bg-center pointer-events-auto"
        style={{ backgroundImage: `url(${messageBox})`, minHeight: "160px" }}
        onClick={avanzar}
      >
        {isAccionTexto ? (
          // Prompt de acción: texto a la izquierda, menú a la derecha
          <div className="absolute inset-0 px-24 mr-28 pb-8 text-pokemon text-black max-w-[95%] leading-snug pointer-events-none flex items-center">
            <span className="flex-1 text-4xl text-left">
              {mensajes[index].text}
            </span>
            <div className="pointer-events-auto ml-8">{children}</div>
          </div>
        ) : (
          // Diálogo normal: mantiene layout original y paddings exactos
          <div className="absolute inset-0 px-20 pt-4 text-pokemon text-black max-w-[95%] leading-snug pointer-events-none flex flex-col justify-center">
            <span className="mb-2 font-bold text-4xl">
              {mensajes[index].speaker
                ? mensajes[index].speaker + ":"
                : "Narrador:"}
            </span>
            <span className="whitespace-pre-line break-words text-4xl">
              {typedText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
