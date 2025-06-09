import React, { useState, useEffect } from 'react';
import { greedyKnapsack } from './greedyKnapsack';
import { dpKnapsack } from './dpKnapsack';

interface Item {
  weight: number;
  value: number;
}

export default function Knapsack() {
  const [items, setItems] = useState<Item[]>([
    { weight: 2, value: 300 },
    { weight: 1, value: 200 },
    { weight: 5, value: 400 },
    { weight: 3, value: 500 },
  ]);
  const [capacity, setCapacity] = useState<number>(10);
  const [newItem, setNewItem] = useState<Item>({ weight: 0, value: 0 });

  const [greedyTime, setGreedyTime] = useState<number>(0);
  const [dpTime, setDpTime] = useState<number>(0);
  const [greedyResult, setGreedyResult] = useState<number>(0);
  const [dpResult, setDpResult] = useState<number>(0);

  const measurePerformance = () => {
    const greedyStart = performance.now();
    const gResult = greedyKnapsack(capacity, items);
    const greedyEnd = performance.now();
    setGreedyTime(greedyEnd - greedyStart);
    setGreedyResult(gResult);

    const dpStart = performance.now();
    const dResult = dpKnapsack(capacity, items);
    const dpEnd = performance.now();
    setDpTime(dpEnd - dpStart);
    setDpResult(dResult);
  };

  useEffect(() => {
    measurePerformance();
  }, [items, capacity]);

  const addItem = () => {
    if (newItem.weight > 0 && newItem.value > 0) {
      setItems([...items, newItem]);
      setNewItem({ weight: 0, value: 0 });
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
        <input
          type="number"
          placeholder="Peso"
          value={newItem.weight}
          onChange={(e) => setNewItem({ ...newItem, weight: parseFloat(e.target.value) })}
          className="border rounded p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Valor"
          value={newItem.value}
          onChange={(e) => setNewItem({ ...newItem, value: parseFloat(e.target.value) })}
          className="border rounded p-2 mr-2"
        />
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar
        </button>
      </div>

      <div>
        <h2 className="font-semibold">Items:</h2>
        <ul className="list-disc ml-5">
          {items.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span>
                Peso: {item.weight}, Valor: {item.value}, Eficiencia: {(item.value / item.weight).toFixed(2)}
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

      <div className="space-y-2">
        <div>
          <h3 className="text-xl font-bold text-green-600">Greedy (Fraccionario)</h3>
          <p>Valor máximo: {greedyResult}</p>
          <p>Tiempo de ejecución: {greedyTime.toFixed(2)} ms</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-blue-600">Programación Dinámica (0/1)</h3>
          <p>Valor máximo: {dpResult}</p>
          <p>Tiempo de ejecución: {dpTime.toFixed(2)} ms</p>
        </div>
      </div>
    </div>
  );
}
