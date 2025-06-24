import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Card, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
}

const sampleTransactions: Transaction[] = [
  { id: 1, amount: 700, date: "2024-05-15", description: "Pago de Arriendo" },
  { id: 2, amount: 2300, date: "2024-05-16", description: "Compra de Materiales" },
  { id: 3, amount: 1200, date: "2024-05-17", description: "Honorarios Legales" },
  { id: 4, amount: 800, date: "2024-05-18", description: "Venta de Mínimos en Caja" },
  { id: 5, amount: 3500, date: "2024-05-19", description: "Servicio de Marketing" },
  { id: 6, amount: 400, date: "2024-05-20", description: "Utilidades Mensuales" },
  { id: 7, amount: 1800, date: "2024-05-21", description: "Consultoría de TI" },
  { id: 8, amount: 600, date: "2024-05-22", description: "Suscripción Qt Creator" },
  { id: 9, amount: 2700, date: "2024-05-23", description: "Adquisición de Computadoras Cuánticas" },
  { id: 10, amount: 900, date: "2024-05-24", description: "Transporte Uber y Logística" },
  { id: 11, amount: 1100, date: "2024-05-25", description: "Mantenimiento General" },
  { id: 12, amount: 2000, date: "2024-05-26", description: "Factura de Luz ENEE" },
  { id: 13, amount: 500, date: "2024-05-27", description: "Pago Proveedor Mínimos (Fruta)" },
  { id: 14, amount: 1600, date: "2024-05-28", description: "Capacitación Personal contra Corrupción" },
  { id: 15, amount: 750, date: "2024-05-29", description: "Devolución Cliente" },
  { id: 16, amount: 2900, date: "2024-05-30", description: "Cena de Negocios Cósmica" },
  { id: 17, amount: 1300, date: "2024-05-31", description: "Impuesto de Propiedad" },
  { id: 18, amount: 450, date: "2024-06-01", description: "Reembolso Empleado" },
  { id: 19, amount: 3100, date: "2024-06-02", description: "Crédito Bancario" },
  /* { id: 20, amount: 850, date: "2024-06-03", description: "Servicios de Limpieza" },
  { id: 21, amount: 1900, date: "2024-06-04", description: "Comisión por Ventas" },
  { id: 22, amount: 650, date: "2024-06-05", description: "Licencia de Software" },
  { id: 23, amount: 2400, date: "2024-06-06", description: "Inversión en Crypto Perrin Coin" },
  { id: 24, amount: 1050, date: "2024-06-07", description: "Reparación de Vehículo" },
  { id: 25, amount: 300, date: "2024-06-08", description: "Donación Benéfica" },
  { id: 26, amount: 3200, date: "2024-06-09", description: "Diseño Gráfico" },
  { id: 27, amount: 800, date: "2024-06-10", description: "Gastos de Viaje" },
  { id: 28, amount: 2100, date: "2024-06-11", description: "Pago de Nómina" },
  { id: 29, amount: 950, date: "2024-06-12", description: "Desarrollo Web (Fase: Abandonado)" },
  { id: 30, amount: 1400, date: "2024-06-13", description: "Seguro Mensual" },
  { id: 31, amount: 550, date: "2024-06-14", description: "Recarga de Suministros" },
  { id: 32, amount: 2600, date: "2024-06-15", description: "Proyecto Secreto Messi" },
  { id: 33, amount: 1000, date: "2024-06-16", description: "Cuota de Membresía" },
  { id: 34, amount: 3800, date: "2024-06-17", description: "Inversión en Bonos" },
  { id: 35, amount: 1700, date: "2024-06-18", description: "Auditoría Externa" },
  { id: 36, amount: 600, date: "2024-06-19", description: "Multa de Tráfico Estelar" },
  { id: 37, amount: 2200, date: "2024-06-20", description: "Publicidad Digital" },
  { id: 38, amount: 800, date: "2024-06-21", description: "Recibo de Agua" },
  { id: 39, amount: 3300, date: "2024-06-22", description: "Compra de Activos Fijos" },
  { id: 40, amount: 1150, date: "2024-06-23", description: "Intereses Bancarios" },
  { id: 41, amount: 400, date: "2024-06-24", description: "Regalo Corporativo" },
  { id: 42, amount: 2800, date: "2024-06-25", description: "Subsidio Fantasma" },
  { id: 43, amount: 1500, date: "2024-06-26", description: "Pago de Dividendos" },
  { id: 44, amount: 750, date: "2024-06-27", description: "Reembolso por Quedar Bien" },
  { id: 45, amount: 3000, date: "2024-06-28", description: "Gastos de Investigación" },
  { id: 46, amount: 900, date: "2024-06-29", description: "Comida en Power Chicken God" },
  { id: 47, amount: 1250, date: "2024-06-30", description: "Servicio de Internet TIGO" },
  { id: 48, amount: 2500, date: "2024-07-01", description: "Cuota de Préstamo" },
  { id: 49, amount: 600, date: "2024-07-02", description: "Compra de Café Oro" },
  { id: 50, amount: 1950, date: "2024-07-03", description: "Remuneración por Logro" } */
];

const transactionsById = new Map<number, Transaction>();
sampleTransactions.forEach(t => transactionsById.set(t.id, t));

// Función para formatear el monto a Lempiras
const formatLempiras = (amount: number): string => {
  return `L.${amount.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// **ALGORITMO EXACTO (Basado en subset_sum_meet_in_the_middle_iterative de subsetSum.py)**
function generateSumsAndSubsetsExact(
  halfArray: Transaction[]
): Map<number, number[]> {
  const allSumsAndSubsets: [number, number[]][] = [[0, []]]; // (suma, lista_de_ids)

  for (const element of halfArray) {
    const newAdditions: [number, number[]][] = [];
    for (const [currentSum, currentSubsetIds] of allSumsAndSubsets) {
      const newSum = currentSum + element.amount;
      const newSubsetIds = [...currentSubsetIds, element.id];
      newAdditions.push([newSum, newSubsetIds]);
    }
    allSumsAndSubsets.push(...newAdditions); // Añadir las nuevas combinaciones
  }

  // Convertir a un mapa, priorizando el subconjunto más corto si hay múltiples para la misma suma
  const sumsMap = new Map<number, number[]>();
  for (const [s, sub] of allSumsAndSubsets) {
    if (!sumsMap.has(s) || sub.length < (sumsMap.get(s)!).length) {
      sumsMap.set(s, sub);
    }
  }
  return sumsMap;
}

// **ALGORITMO APROXIMADO (Basado en subsetSumAproxWithHash de subsetSumAprox.py)**
function generateSumsAndSubsetsApprox(
  halfArray: Transaction[]
): Map<number, number[]> {
  const sumsMap = new Map<number, number[]>();
  sumsMap.set(0, []);

  for (const element of halfArray) {
    // Tomar una instantánea de las entradas existentes antes de modificarlas
    const currentEntries = Array.from(sumsMap.entries());
    for (const [currentSum, currentSubsetIds] of currentEntries) {
      const newSum = currentSum + element.amount;
      const newSubsetIds = [...currentSubsetIds, element.id];
      // Almacena solo si la nueva suma no existe O si el nuevo subconjunto es más corto
      if (!sumsMap.has(newSum) || newSubsetIds.length < (sumsMap.get(newSum)!).length) {
        sumsMap.set(newSum, newSubsetIds);
      }
    }
  }
  return sumsMap;
}


// Función auxiliar para comparar subconjuntos (orden-agnóstico)
function areSubsetsEqual(subset1: number[], subset2: number[]): boolean {
  if (subset1.length !== subset2.length) return false;
  const sorted1 = [...subset1].sort((a, b) => a - b);
  const sorted2 = [...subset2].sort((a, b) => a - b);
  return sorted1.every((value, index) => value === sorted2[index]);
}


const SubsetSum: React.FC = () => {
  const [transactions] = useState<Transaction[]>(sampleTransactions);
  const [targetAmount, setTargetAmount] = useState<number | ''>('');
  const [highlightedTransactions, setHighlightedTransactions] = useState<number[]>([]);
  const [reconciliationStatus, setReconciliationStatus] = useState<'idle' | 'success' | 'failure' | 'calculating' | 'noMoreSubsets' | 'approximateSuccess'>('idle');
  const [currentlyProcessingId, setCurrentlyProcessingId] = useState<number | null>(null);
  const [foundSubsetsHistory, setFoundSubsetsHistory] = useState<Set<string>>(new Set());
  const [displayedSubsets, setDisplayedSubsets] = useState<number[][]>([]);

  const navigate = useNavigate();

  // Memoizar los mapas de sumas para el algoritmo Exacto
  const { leftSumsMapExact, rightSumsMapExact } = useMemo(() => {
    const mid = Math.floor(transactions.length / 2);
    const leftHalf = transactions.slice(0, mid);
    const rightHalf = transactions.slice(mid);

    const left = generateSumsAndSubsetsExact(leftHalf);
    const right = generateSumsAndSubsetsExact(rightHalf);
    
    return { leftSumsMapExact: left, rightSumsMapExact: right };
  }, [transactions]);

  // Memoizar los mapas de sumas para el algoritmo Aproximado
  const { leftSumsMapApprox, rightSumsMapApprox } = useMemo(() => {
    const mid = Math.floor(transactions.length / 2);
    const leftHalf = transactions.slice(0, mid);
    const rightHalf = transactions.slice(mid);

    const left = generateSumsAndSubsetsApprox(leftHalf);
    const right = generateSumsAndSubsetsApprox(rightHalf);
    
    return { leftSumsMapApprox: left, rightSumsMapApprox: right };
  }, [transactions]);


  // Al cambiar el targetAmount, reiniciar estados relevantes
  const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTargetAmount(value === '' ? '' : Number(value));
    setReconciliationStatus('idle');
    setHighlightedTransactions([]);
    setCurrentlyProcessingId(null);
    setFoundSubsetsHistory(new Set()); 
    setDisplayedSubsets([]); 
  };
  
  const currentSumOfHighlighted = useMemo(() => {
    return highlightedTransactions.reduce((acc, id) => {
        const transaction = transactionsById.get(id);
        return acc + (transaction ? transaction.amount : 0);
    }, 0);
  }, [highlightedTransactions]);

  // Función para encontrar coincidencia EXACTA (Implementación de Meet-in-the-Middle)
  const findExactMatch = async () => {
    if (targetAmount === '' || typeof targetAmount !== 'number' || targetAmount <= 0) { 
      setReconciliationStatus('idle');
      setHighlightedTransactions([]);
      setCurrentlyProcessingId(null);
      return;
    }
    setReconciliationStatus('calculating');
    setHighlightedTransactions([]);
    setCurrentlyProcessingId(null); 
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const animationDelay = 100;
    // Simular recorrido inicial de transacciones para animación
    for (const transaction of transactions) {
      setCurrentlyProcessingId(transaction.id); 
      await delay(animationDelay); 
    }
    setCurrentlyProcessingId(null);
    let foundNewSubsetIds: number[] | null = null;
    let anySubsetFoundForTarget = false; 

    for (const [lSum, lSubsetIds] of leftSumsMapExact.entries()) { // Usar leftSumsMapExact
      const requiredRSum = targetAmount - lSum;
      if (rightSumsMapExact.has(requiredRSum)) { // Usar rightSumsMapExact
        const rSubsetIds = rightSumsMapExact.get(requiredRSum)!;
        const combinedSubset = [...lSubsetIds, ...rSubsetIds];
        const sortedCombinedSubset = [...combinedSubset].sort((a, b) => a - b);
        const subsetKey = JSON.stringify(sortedCombinedSubset);

        anySubsetFoundForTarget = true; 

        if (!foundSubsetsHistory.has(subsetKey)) {
          foundNewSubsetIds = combinedSubset;
          break; 
        }
      }
    }

    if (foundNewSubsetIds) {
      setHighlightedTransactions(foundNewSubsetIds);
      setReconciliationStatus('success');
      
      setFoundSubsetsHistory(prev => {
        const newSet = new Set(prev);
        const sortedSubset = [...foundNewSubsetIds!].sort((a, b) => a - b);
        newSet.add(JSON.stringify(sortedSubset));
        return newSet;
      });
      setDisplayedSubsets(prev => {
        const isAlreadyDisplayed = prev.some(existing => areSubsetsEqual(existing, foundNewSubsetIds!));
        if (!isAlreadyDisplayed) {
            return [...prev, foundNewSubsetIds!];
        }
        return prev;
      });

    } else {
        if (anySubsetFoundForTarget && foundSubsetsHistory.size > 0) {
            setReconciliationStatus('noMoreSubsets');
        } else {
            setReconciliationStatus('failure');
        }
        setHighlightedTransactions([]); 
    }
  };

  // Función para encontrar coincidencia APROXIMADA (Implementación de Meet-in-the-Middle "aproximado")
  const findApproximateMatch = async () => {
    if (targetAmount === '' || typeof targetAmount !== 'number' || targetAmount <= 0) {
      setReconciliationStatus('idle');
      setHighlightedTransactions([]);
      setCurrentlyProcessingId(null);
      return;
    }
    setReconciliationStatus('calculating');
    setHighlightedTransactions([]);
    setCurrentlyProcessingId(null);
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const animationDelay = 100;

    // Simular procesamiento
    for (const transaction of transactions) {
      setCurrentlyProcessingId(transaction.id);
      await delay(animationDelay / 2); // Un poco más rápido para la aproximación visual
    }
    setCurrentlyProcessingId(null);

    let foundNewSubsetIds: number[] | null = null;
    let anySubsetFoundForTarget = false; 

    // Usar los mapas generados por generateSumsAndSubsetsApprox
    for (const [lSum, lSubsetIds] of leftSumsMapApprox.entries()) {
      const requiredRSum = targetAmount - lSum;
      if (rightSumsMapApprox.has(requiredRSum)) {
        const rSubsetIds = rightSumsMapApprox.get(requiredRSum)!;
        const combinedSubset = [...lSubsetIds, ...rSubsetIds];
        const sortedCombinedSubset = [...combinedSubset].sort((a, b) => a - b);
        const subsetKey = JSON.stringify(sortedCombinedSubset);

        anySubsetFoundForTarget = true; 

        if (!foundSubsetsHistory.has(subsetKey)) {
          foundNewSubsetIds = combinedSubset;
          break; 
        }
      }
    }

    if (foundNewSubsetIds) {
        setHighlightedTransactions(foundNewSubsetIds);
        setReconciliationStatus('approximateSuccess'); 
        setFoundSubsetsHistory(prev => {
            const newSet = new Set(prev);
            const sortedSubset = [...foundNewSubsetIds!].sort((a, b) => a - b);
            newSet.add(JSON.stringify(sortedSubset));
            return newSet;
        });
        setDisplayedSubsets(prev => {
            const isAlreadyDisplayed = prev.some(existing => areSubsetsEqual(existing, foundNewSubsetIds!));
            if (!isAlreadyDisplayed) {
                return [...prev, foundNewSubsetIds!];
            }
            return prev;
        });
    } else {
        if (anySubsetFoundForTarget && foundSubsetsHistory.size > 0) {
            setReconciliationStatus('noMoreSubsets');
        } else {
            setReconciliationStatus('failure');
        }
        setHighlightedTransactions([]);
    }
  };


  const handleGoToMainMenu = () => {
    navigate('/');
  };

  // Generar el mensaje de subconjuntos encontrados/estado
  const statusMessage = useMemo(() => {
    if (reconciliationStatus === 'idle') {
      return null;
    } else if (reconciliationStatus === 'calculating') {
      return (
        <p className="text-white flex items-center justify-center">
            <Icon icon="line-md:loading-loop" className="mr-2 animate-spin" /> Buscando la combinación...
        </p>
      );
    } else if (reconciliationStatus === 'success') {
      return (
        <p className="text-white">
          ¡Conciliación Exacta Exitosa! Estas transacciones suman exactamente {formatLempiras(targetAmount as number)}. Revisa la tabla...
        </p>
      );
    } else if (reconciliationStatus === 'approximateSuccess') {
      return (
        <p className="text-white">
          ¡Coincidencia Aproximada Encontrada! Estas transacciones suman {formatLempiras(currentSumOfHighlighted as number)}.
           Revisa la tabla...
        </p>
      );
    } else if (reconciliationStatus === 'failure') {
      return (
        <p className="text-white">
          No se encontró un conjunto exacto de transacciones que sume {formatLempiras(targetAmount as number)}. 
          Por favor, revise los montos o busque discrepancias.
        </p>
      );
    } else if (reconciliationStatus === 'noMoreSubsets') {
      return (
        <p className="text-white">
          Ya se han hallado todos los subconjuntos posibles que suman {formatLempiras(targetAmount as number)}. No existen más combinaciones únicas.
        </p>
      );
    }
    return null;
  }, [reconciliationStatus, targetAmount, currentSumOfHighlighted]);

  // Mensaje de subconjuntos ya encontrados
  const foundSubsetsDisplayMessage = useMemo(() => {
    if (displayedSubsets.length === 0) {
      return null;
    }
    const formattedSubsets = displayedSubsets.map((subset, index) =>
      `     ${index + 1}.) {${subset.map(id => {
        const trans = transactionsById.get(id);
        return trans ? formatLempiras(trans.amount) : `ID:${id}`;
      }).join(', ')}}`
    ).join('\n'); 

    return (
      <p className="text-[#a2bdd2] text-justify text-lg whitespace-pre-wrap"> 
        Subconjuntos encontrados para target **{formatLempiras(targetAmount as number)}**:{'\n'}{formattedSubsets}
      </p>
    );
  }, [displayedSubsets, targetAmount]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18191d] via-[#2a3b4e] to-[#18191d] bg-fixed bg-cover animate-water-flow text-[#a2bdd2] p-8">
      <Card className="max-w-4xl mx-auto bg-[#495970] shadow-xl bg-opacity-90 backdrop-blur-sm">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-[#ffffff] mb-4">Simulador de Reconciliación Bancaria</h1>
          
          <div className="flex items-end space-x-4">
            <input
              type="number"
              placeholder="Ingrese el monto. Por ejemplo: 1000"
              value={targetAmount !== '' ? targetAmount.toString() : ''} 
              onChange={handleTargetAmountChange}
              className="flex-grow h-12 text-center text-[#a2bdd2] bg-[#18191d] bg-opacity-50 rounded-lg px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-[#a2bdd2] transition-all duration-300 placeholder-[#a2bdd2] placeholder-opacity-70"
            />
            <button 
              onClick={findExactMatch} 
              disabled={targetAmount === '' || targetAmount === 0 || reconciliationStatus === 'calculating'}
              className="bg-[#18191d] text-[#a2bdd2] hover:bg-[#a2bdd2] hover:text-[#18191d] transition-colors duration-500 h-12 px-6 rounded-lg font-semibold flex items-center justify-center" 
            >
              {reconciliationStatus === 'calculating' ? (
                <>
                  <Icon icon="line-md:loading-loop" className="mr-2 animate-spin" /> Calculando Exacto...
                </>
              ) : (
                'Encontrar Coincidencia Exacta'
              )}
            </button>
            <button 
              onClick={findApproximateMatch}
              disabled={targetAmount === '' || targetAmount === 0 || reconciliationStatus === 'calculating'}
              className="bg-[#18191d] text-[#a2bdd2] hover:bg-[#D50000] hover:text-[#ffffff] transition-colors duration-500 h-12 px-6 rounded-lg font-semibold flex items-center justify-center" 
            >
              {reconciliationStatus === 'calculating' ? (
                <>
                  <Icon icon="line-md:loading-loop" className="mr-2 animate-spin" /> Calculando Aproximado...
                </>
              ) : (
                'Encontrar Coincidencia Aproximada'
              )}
            </button>
          </div>

          <div className='mt-2 mb-8'>
            {foundSubsetsDisplayMessage} 
          </div>

          <AnimatePresence>
            {reconciliationStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-md ${
                  reconciliationStatus === 'success' ? 'bg-green-600' : 
                  reconciliationStatus === 'failure' ? 'bg-red-600' : 
                  reconciliationStatus === 'noMoreSubsets' ? 'bg-orange-600' : 
                  reconciliationStatus === 'approximateSuccess' ? 'bg-yellow-600' : // Nuevo color para aproximado
                  'bg-blue-600'
                }`}
              >
                {statusMessage} 
              </motion.div>
            )}
          </AnimatePresence>

          {((highlightedTransactions.length > 0 && reconciliationStatus === 'success') || reconciliationStatus === 'approximateSuccess') && (
            <div className="text-right text-lg text-[#ffffff] font-semibold">
              Suma de Coincidencia: {formatLempiras(currentSumOfHighlighted)}
            </div>
          )}

          <Table 
            aria-label="Transacciones Disponibles"
            className="bg-[#18191d] bg-opacity-70 rounded-lg"
            removeWrapper
          >
            <TableHeader>
              <TableColumn className="text-xl text-white font-bold border-b border-white border-opacity-30 pb-2">FECHA</TableColumn> 
              <TableColumn className="text-xl text-white font-bold border-b border-white border-opacity-30 pb-2">DESCRIPCIÓN</TableColumn>
              <TableColumn className="text-xl text-white font-bold border-b border-white border-opacity-30 pb-2">MONTO</TableColumn>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow 
                  key={transaction.id}
                  className={`${
                    highlightedTransactions.includes(transaction.id) ? 'bg-[#73a8d0] bg-opacity-30' : ''
                  } ${
                    currentlyProcessingId === transaction.id ? 'bg-[#495970]' : ''
                  } group hover:bg-[#495970] transition-colors duration-400`} 
                >
                  <TableCell className='text-center'>{transaction.date}</TableCell>
                  <TableCell className='text-center'>{transaction.description}</TableCell>
                  <TableCell className='text-center'>{formatLempiras(transaction.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-center mt-8"> 
            <button
              onClick={handleGoToMainMenu}
              className="bg-[#a2bdd2] text-[#495970] hover:bg-[#495970] hover:text-[#ffffff] transition-colors duration-500 h-12 px-6 rounded-lg font-semibold" 
            >
              Volver al Menú principal
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SubsetSum;