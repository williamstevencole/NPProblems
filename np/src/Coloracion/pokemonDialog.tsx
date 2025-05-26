import { useState, useEffect } from "react";
import messageBox from "../assets/images/message-box.png";

type Mensaje = {
  speaker: string;
  text: string;
};

interface PokemonDialogProps {
  mensajes: Mensaje[];
  onClose: () => void;
}

export default function PokemonDialog({
  mensajes,
  onClose,
}: PokemonDialogProps) {
  const [index, setIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
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
  }, [index, mensajes]);

  const avanzar = () => {
    if (isTyping) return;
    if (index < mensajes.length - 1) {
      setIndex(index + 1);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        avanzar();
      } else if (e.key === "Shift") {
        //saltar a despues del ultimo mensaje
        setIndex(mensajes.length - 1);
        setTypedText(mensajes[mensajes.length - 1].text);
        setIsTyping(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, isTyping]);

  // No mostrar nada si no hay mensaje válido
  if (!mensajes[index]) return null;

  return (
    <div className="absolute bottom-[-140px] left-0 w-full flex items-center justify-center pointer-events-none z-50">
      <div
        className="relative w-full aspect-[3/1] bg-no-repeat bg-contain bg-center pointer-events-auto"
        style={{
          backgroundImage: `url(${messageBox})`,
          minHeight: "160px",
        }}
        onClick={avanzar}
      >
        <div className="absolute inset-0 px-20 pt-10 text-pokemon text-black  max-w-[95%] leading-snug pointer-events-none flex flex-col justify-center">
          <span className="mb-2">
            {mensajes[index].speaker ? (
              <span className="font-bold text-4xl ">
                {mensajes[index].speaker}:
              </span>
            ) : (
              <span className="font-bold">Narrador:</span>
            )}
          </span>
          <span className="whitespace-pre-line break-words text-4xl ">
            {typedText}
          </span>
        </div>
      </div>
    </div>
  );
}
