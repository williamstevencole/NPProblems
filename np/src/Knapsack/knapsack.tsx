import { useState,useRef } from 'react';
import { memoizedKnapsack } from './AlgoritmoKnapsack';
import { InputNumber, message, Row,Col } from "antd";
import IncludedItemsTable from './tablaAll';
import ExcludedItemsTable from './tablaFuera';
import AllItems from './TablaItems';
import ExpandableCard from './Info';
import "./but.css"
import "./bu.css"
import Radioalgo from './radio';
import titulo from "./titulo.png"
interface Item {
  peso: number;
  valor: number;
}

export default function Knapsack() {
  const [items, setItems] = useState<Item[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [randomCount, setRandomCount] = useState(0);
  const [capacity, setCapacity] = useState<number>(10);
  const [newItem, setNewItem] = useState<Item>({ peso: 0, valor: 0 });

  const [Time, setTime] = useState<number>(0);
  const [greedyResult, setResult] = useState<number>(0);

  const [includedItems, setIncludedItems] = useState<Item[]>([]);
  const [excludedItems, setExcludedItems] = useState<Item[]>([]);

const measurePerformance = () => {
  const { totalValue, selectedItems, notSelectedItems,tiempo } = memoizedKnapsack(capacity, items);
  setTime(tiempo/1000);
  setResult(totalValue);
  setIncludedItems(selectedItems);
  setExcludedItems(notSelectedItems);
};
const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    buttonRef.current.style.setProperty("--x", `${x}px`);
    buttonRef.current.style.setProperty("--y", `${y}px`);
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
    <div className="p-4 space-y-4" 
    style={{
         
          background: "linear-gradient(to top , #0f2027, #203a43, #2c5364)",
        }}
    >
     <div style={{ position: 'relative', overflow: 'visible' }}>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <img src={titulo} alt="Knapsack" />
  </div>
  <div style={{ position: 'absolute', right: '1rem', top: '1rem' }}>
    <ExpandableCard />
  </div>
</div>



    <br></br>
    <br></br>
    <br></br>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <label style={{fontSize:"18px",color:"#f2ef24"}} className="font-semibold">Capacidad de la mochila:   </label>
        <input
           style={{
            marginLeft:"20px",
                border: "3px solid rgb(250, 250, 250)", 
                borderRadius: "8px",
                color:"rgb(250, 250, 250)"
                }}
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
          className="border rounded p-2"
        />
      </div>
      <br></br>
      <br></br>
 <Row justify="center" gutter={300}>

<Col>
       <div className="space-y-2">
        <h2 style={{fontSize:"18px",color:"#34fa8a"}} className="font-semibold">Agregar al inventario</h2>
        <div>
        <p style={{color:"#f2ef24"}}>Peso</p>
        <input
          type="number"
          placeholder="Peso"
           style={{
                border: "3px solid rgb(250, 250, 250)", 
                borderRadius: "8px",
                color:"rgb(250, 250, 250)"
                }}
          value={newItem.peso}
          onChange={(e) => setNewItem({ ...newItem, peso: parseFloat(e.target.value) })}
          className="border rounded p-2 mr-2"
        />
        </div>
        <div>
          <p style={{color:"#f2ef24"}}>Valor</p>
        <input
          type="number"
          placeholder="Valor"
          style={{
                border: "3px solid rgb(250, 250, 250)", 
                borderRadius: "8px",
                color:"rgb(250, 250, 250)"
                }}
          value={newItem.valor}
          onChange={(e) => setNewItem({ ...newItem, valor: parseFloat(e.target.value) })}
          className="border rounded p-2 mr-2"
        />
        </div>
        <button
          onClick={addItem}
          style={{cursor:"pointer"}}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Agregar
        </button>
        </div>
      </Col>
        <br></br>
        <br/>
       <Col>
  <div className="flex flex-col items-center text-center gap-3">
    <h2  style={{fontSize:"18px",color:"#34fa8a"}} className="font-semibold">Generar Objetos Aleatorios</h2>

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
      className="w-[200px]"
    />
    <br></br>
    <button className="rainbow-button"
    onClick={addRandomItems}>
      Agregar Aleatorios
    </button>
    
  </div>
</Col>

</Row>
      <div>
      
  <AllItems items={items} removeItem={removeItem} />
 <br></br>
      </div>
     <div style={{ width: "500px", margin: "0 auto" }}>
      <Radioalgo></Radioalgo>
     </div>
     <br></br>
        <div className="container">
        <button className="button-creative"
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onClick={measurePerformance}
        style={{marginLeft:"10%"
        }}>Calcular Resultados</button>
        </div>

      <div className="mt-4">
  <Row justify="center" gutter={300}>
    <Col>
      <div className="text-center">
        <h2 className="font-bold text-lg mb-2" style={{color:"rgb(139, 251, 35)"}}>Ítems dentro de la mochila</h2>
        <IncludedItemsTable data={includedItems} />
      </div>
    </Col>
    <Col>
      <div className="text-center">
        <h2 className="font-bold text-lg mb-2" style={{color:"#f2ef24"}}>Ítems fuera de la mochila</h2>
        <ExcludedItemsTable data={excludedItems} />
      </div>
    </Col>
  </Row>
</div>
      <div className="space-y-2">
        <div>
          <h3 className="text-xl font-bold text-green-600">KnapSack (Memorización)</h3>
          <p style={{color:"white"}}>Valor máximo: {greedyResult}</p>
          <p style={{color:"white"}}>Tiempo de ejecución: {Time} s</p>
            
        </div>
      </div>
    </div>
  );
}