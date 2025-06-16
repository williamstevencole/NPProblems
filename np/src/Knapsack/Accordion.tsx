import { useState } from "react";
import { MagicMotion } from "react-magic-motion";


export default function Accordion() {
  const [isOpen, setIsOpen] = useState(false);

  const sampleData = [
  { time: '2019-04-11', value: 80.01 },
  { time: '2019-04-12', value: 96.63 },
  { time: '2019-04-13', value: 76.64 },
  { time: '2019-04-14', value: 81.89 },
  { time: '2019-04-15', value: 74.43 },
];


  return (
    <MagicMotion
      transition={{ type: "spring", stiffness: 180, damping: 20, mass: 1.1 }}
    >
      <div
        style={{
          backgroundColor: "rgba(238, 238, 238)",
          padding: "1rem",
          borderRadius: 12,
          margin: "1rem 0",
          overflow: "hidden",
        }}
      >
        <button
          style={{
            fontSize: "1.1em",
            fontWeight: 500,
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          Click me to see my content
            <svg
              key="exclude"
              style={{
                transform: `rotate(${isOpen ? 180 : 0}deg)`,
                transition: "320ms ease-in-out",
              }}
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 10L15.6714 21L27.5 10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
        </button>
        {isOpen && (
          <div
            style={{
              gap: "1rem",
              display: "flex",
              flexDirection: "column",
              marginTop: "1rem",
            }}
          >
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              gravida lobortis sem, vel blandit dolor ultrices nec. Donec
              dapibus tellus ut libero sagittis, a pharetra eros placerat.
              Aliquam erat volutpat. Nunc nec nisl ac turpis semper pharetra.
              Nullam pulvinar pellentesque mauris, sit amet tincidunt nisl
              convallis id.
            </div>
            
          </div>
        )}
      </div>
    </MagicMotion>
  );
}