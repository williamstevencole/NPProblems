import { useState } from "react";
import { MagicMotion } from "react-magic-motion";
interface Item {
  peso: number;
  valor: number;
}

interface Props {
  items: Item[];
  removeItem: (index: number) => void;
  itemsPerPage?: number; // opcional para controlar cuántos mostrar
}

const AllItems = ({ items, removeItem, itemsPerPage = 5 }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  // calcular total de páginas
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // obtener items solo para la página actual
  const pagedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  };

  return (
    <div className="space-y-2">
      
      <div className="flex justify-center space-x-4 mt-4">
<h2 
      style={{
                color:"rgb(250, 250, 250)",
                fontSize:"30px"
                }}
      className="font-semibold text-lg">Objetos en el Inventario</h2>
      </div>
      <MagicMotion>
        <table 
        style={{
        border: "3px solid rgb(250, 250, 250)", 
        borderRadius: "8px",
        color: "rgb(250, 250, 250)",
       margin: "0 auto", 
       width: "70%"
       }}
        width={"70%"}>
          <thead style={{
                border: "3px solid rgb(250, 250, 250)", 
                borderRadius: "8px",
                color:"rgb(250, 250, 250)"
                }}>
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Peso</th>
              <th className="px-4 py-2 border">Valor</th>
              <th className="px-4 py-2 border">Eficiencia</th>
            </tr>
          </thead>
          <tbody>
            {pagedItems.map((item, index) => (
              <tr key={(currentPage - 1) * itemsPerPage + index} className="text-center">
                <td className="px-4 py-2 border">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2 border">{item.peso}</td>
                <td className="px-4 py-2 border">{item.valor}</td>
                <td className="px-4 py-2 border">
                  {item.peso !== 0 ? (item.valor / item.peso).toFixed(2) : "N/A"}
                  <button
                  style={{cursor:"pointer",marginLeft:"20px"}}
                    onClick={() => removeItem((currentPage - 1) * itemsPerPage + index)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MagicMotion>

      <div className="flex justify-center space-x-4 mt-4">
        <button 
          onClick={handlePrev}
          style={{cursor:"pointer", backgroundColor: "#34fa8a", color: "white"}}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 font-bold"
        >
          Anterior
        </button>
        <span style={{
                color:"rgb(250, 250, 250)"
                }}>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={handleNext}
          style={{cursor:"pointer", backgroundColor: "#34fa8a", color: "white"}}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 font-bold"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default AllItems;
