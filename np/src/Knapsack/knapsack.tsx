import { useState} from 'react';
import { memoizedKnapsack } from './AlgoritmoKnapsack';
import { Button, InputNumber, message, Row } from "antd";
import IncludedItemsTable from './tablaAll';
import ExcludedItemsTable from './tablaFuera';

interface Item {
  peso: number;
  valor: number;
}

export default function Knapsack() {
  const [items, setItems] = useState<Item[]>([

  ]);
  const [randomCount, setRandomCount] = useState(0);
  const [capacity, setCapacity] = useState<number>(10);
  const [newItem, setNewItem] = useState<Item>({ peso: 0, valor: 0 });

  const [Time, setTime] = useState<number>(0);
  const [greedyResult, setResult] = useState<number>(0);

  const [includedItems, setIncludedItems] = useState<Item[]>([]);
  const [excludedItems, setExcludedItems] = useState<Item[]>([]);

const measurePerformance = () => {
  const { totalValue, selectedItems, notSelectedItems,tiempo } = memoizedKnapsack(capacity, items);
 
  setTime(tiempo);
  setResult(totalValue);
  setIncludedItems(selectedItems);
  setExcludedItems(notSelectedItems);
};

   const addRandomItems = () => {
    if (randomCount <= 0) {
      message.error("La cantidad debe ser mayor a 0.");
      return;
    }

    const randomItems = Array.from({ length: randomCount }, (_, i) => ({
      name: `Item ${items.length + i + 1}`,
      peso: Math.floor(Math.random() * 100) + 1,
      valor: Math.floor(Math.random() * 200) + 1,
      key: items.length + i,
    }));

    setItems([...items, ...randomItems]);
    message.success(`${randomCount} artículos aleatorios agregados.`);
  };

  const addItem = () => {
    if (newItem.peso > 0 && newItem.valor > 0) {
      setItems([...items, newItem]);
      setNewItem({ peso: 0, valor: 0 });
    }
  };

  const removeItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Comparador de Algoritmos Knapsack</h1>

      <div>
        <label className="block font-medium">Capacidad de la mochila:</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
          className="border rounded p-2"
        />
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Agregar nuevo ítem</h2>
        <Row>
        <div>
        <p>Peso</p>
        <input
          type="number"
          placeholder="Peso"
          value={newItem.peso}
          onChange={(e) => setNewItem({ ...newItem, peso: parseFloat(e.target.value) })}
          className="border rounded p-2 mr-2"
        />
        </div>
        <div>
          <p>Valor</p>
        <input
          type="number"
          placeholder="Valor"
          value={newItem.valor}
          onChange={(e) => setNewItem({ ...newItem, valor: parseFloat(e.target.value) })}
          className="border rounded p-2 mr-2"
        />
        </div>
        </Row>
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar
        </button>
        <br></br>
        <br/>
       <InputNumber
  placeholder="Cantidad de ítems aleatorios"
  value={randomCount}
  onChange={(value) => {
    if (value === null || isNaN(value)) {
      setRandomCount(0);
    } else if (value >= 0) {
      setRandomCount(value);
    } else {
      message.error("La cantidad debe ser un número positivo.");
    }
  }}
  min={0}
  style={{ width: "200px", marginRight: "10px" }}
/>

        <Button type="primary" onClick={addRandomItems} style={{ marginRight: "10px" }}>
          Agregar Aleatorios
        </Button>
      </div>

      <div>
        <h2 className="font-semibold">Items:</h2>
        <ul className="list-disc ml-5">
          {items.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span>
                Peso: {item.peso}, Valor: {item.valor}, Eficiencia: {(item.valor / item.peso).toFixed(2)}
              </span>
              <button
                onClick={() => removeItem(idx)}
                className="text-red-500 ml-4 hover:underline"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={measurePerformance}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Calcular Resultados
      </button>

      <div className="mt-4">
        <Row>
        <div>
        <h2 className="font-bold text-lg">Ítems en la mochila</h2>
        <IncludedItemsTable data={includedItems} />
        </div>
        <div>
  <h2 className="font-bold text-lg">Ítems fuera de la mochila</h2>
  <ExcludedItemsTable data={excludedItems} />
  </div>
  </Row>
      </div>
      <div className="space-y-2">
        <div>
          <h3 className="text-xl font-bold text-green-600">Greedy (Fraccionario)</h3>
          <p>Valor máximo: {greedyResult}</p>
          <p>Tiempo de ejecución: {Time.toFixed(2)} ms</p>
        </div>
      </div>
    </div>
  );
}