import React, { useState, useEffect, useMemo } from 'react';
import { Card, Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@heroui/react";
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
  { id: 20, amount: 850, date: "2024-06-03", description: "Servicios de Limpieza" },
  { id: 21, amount: 1900, date: "2024-06-04", description: "Comisión por Ventas" },
  { id: 22, amount: 650, date: "2024-06-05", description: "Licencia de Software" },
  { id: 23, amount: 2400, date: "2024-06-06", description: "Inversión en Crypto Perrin Coin" },
  { id: 24, amount: 1050, date: "2024-06-07", description: "Reparación de Vehículo" },
  { id: 25, amount: 300, date: "2024-06-08", description: "Donación Benéfica" },
  { id: 26, amount: 3200, date: "2024-06-09", description: "Diseño Gráfico" },
  { id: 27, amount: 700, date: "2024-06-10", description: "Gastos de Viaje" },
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
  { id: 50, amount: 1950, date: "2024-07-03", description: "Remuneración por Logro" }
];

const transactionsById = new Map<number, Transaction>();
sampleTransactions.forEach(t => transactionsById.set(t.id, t));

// Mi algoritmo aproximado version Typescript
function generateSumsAndSubsets(
    halfArray: Transaction[]
): Map<number, number[]> {
    const sumsMap = new Map<number, number[]>();
    sumsMap.set(0, []);

    for (const element of halfArray) {
        const currentEntries = Array.from(sumsMap.entries());
        
        for (const [currentSum, currentSubsetIds] of currentEntries) {
            const newSum = currentSum + element.amount;
            const newSubsetIds = [...currentSubsetIds, element.id];

            if (!sumsMap.has(newSum) || newSubsetIds.length < (sumsMap.get(newSum)!).length) {
                sumsMap.set(newSum, newSubsetIds);
            }
        }
    }
    return sumsMap;
}

const SubsetSum: React.FC = () => {
  const [transactions] = useState<Transaction[]>(sampleTransactions);
  const [targetAmount, setTargetAmount] = useState<number | ''>('');
  const [highlightedTransactions, setHighlightedTransactions] = useState<number[]>([]); 
  const [reconciliationStatus, setReconciliationStatus] = useState<'idle' | 'success' | 'failure' | 'calculating'>('idle');

  const navigate = useNavigate(); // Inicializamos useNavigate

  const { leftSumsMap, rightSumsMap } = useMemo(() => {
    const mid = Math.floor(transactions.length / 2);
    const leftHalf = transactions.slice(0, mid);
    const rightHalf = transactions.slice(mid);

    const left = generateSumsAndSubsets(leftHalf);
    const right = generateSumsAndSubsets(rightHalf);
    
    return { leftSumsMap: left, rightSumsMap: right };
  }, [transactions]);

  const handleTargetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTargetAmount(value === '' ? '' : Number(value));
    setReconciliationStatus('idle'); 
    setHighlightedTransactions([]);
  };
  
  const currentSumOfHighlighted = useMemo(() => {
    return highlightedTransactions.reduce((acc, id) => {
        const transaction = transactionsById.get(id);
        return acc + (transaction ? transaction.amount : 0);
    }, 0);
  }, [highlightedTransactions]);

  const findExactMatch = () => {
    if (targetAmount === '' || typeof targetAmount !== 'number' || targetAmount < 0) {
      setReconciliationStatus('idle');
      setHighlightedTransactions([]);
      return;
    }

    setReconciliationStatus('calculating');
    setHighlightedTransactions([]);

    setTimeout(() => { 
        let foundSubsetIds: number[] | null = null;

        for (const [lSum, lSubsetIds] of leftSumsMap.entries()) {
            const requiredRSum = targetAmount - lSum;

            if (rightSumsMap.has(requiredRSum)) {
                const rSubsetIds = rightSumsMap.get(requiredRSum)!;
                foundSubsetIds = [...lSubsetIds, ...rSubsetIds];
                break; 
            }
        }

        if (foundSubsetIds) {
            setHighlightedTransactions(foundSubsetIds);
            setReconciliationStatus('success');
        } else {
            setReconciliationStatus('failure');
        }
    }, 500);
  };

  const handleGoToMainMenu = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-[#18191d] text-[#a2bdd2] p-8">
      <Card className="max-w-4xl mx-auto bg-[#495970] shadow-xl">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-[#ffffff] mb-4">Simulador de Reconciliación Bancaria</h1>
          
          <div className="flex items-end space-x-4">
            <Input
              type="number"
              label="" 
              placeholder="Ingrese el monto. Por ejemplo: 1000"
              value={targetAmount !== '' ? targetAmount.toString() : ''} 
              onChange={handleTargetAmountChange}
              className={'flex-grow h-12 text-center text-[#a2bdd2] bg-[#18191d] bg-opacity-50'} 
              style={{ '::placeholder': { color: '#a2bdd2', opacity: 0.7 } } as React.CSSProperties}
            />
            <Button 
              color="primary" 
              onPress={findExactMatch} 
              isDisabled={targetAmount === '' || targetAmount === 0}
              className="bg-[#18191d] text-[#a2bdd2] hover:bg-opacity-60 transition-colors duration-500 h-12" 
            >
              {reconciliationStatus === 'calculating' ? 'Calculando...' : 'Encontrar Coincidencia Exacta'}
              {reconciliationStatus === 'calculating' && (
                <Icon icon="line-md:loading-loop" className="ml-2 animate-spin" />
              )}
            </Button>
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
                  reconciliationStatus === 'failure' ? 'bg-red-600' : 'bg-blue-600'
                }`}
              >
                {reconciliationStatus === 'success' ? (
                  <p className="text-white">
                    ¡Conciliación Exitosa! Estas transacciones suman exactamente L.{targetAmount?.toFixed(2)}. Revisa la tabla...
                  </p>
                ) : reconciliationStatus === 'failure' ? (
                  <p className="text-white">
                    No se encontró un conjunto exacto de transacciones que sume L.{targetAmount?.toFixed(2)}. 
                    Por favor, revise los montos o busque discrepancias.
                  </p>
                ) : (
                    <p className="text-white flex items-center">
                        <Icon icon="line-md:loading-loop" className="mr-2 animate-spin" /> Buscando la combinación perfecta...
                    </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {highlightedTransactions.length > 0 && reconciliationStatus === 'success' && (
            <div className="text-right text-lg text-[#ffffff] font-semibold">
              Suma de Coincidencia: L.{currentSumOfHighlighted.toFixed(2)}
            </div>
          )}

          <Table 
            aria-label="Transacciones Disponibles"
            className="bg-[#18191d]"
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
                  } group hover:bg-[#495970] transition-colors duration-400`} 
                >
                  <TableCell className='text-center'>{transaction.date}</TableCell>
                  <TableCell className='text-center'>{transaction.description}</TableCell>
                  <TableCell className='text-center'>L.{transaction.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-8"> 
            <Button
              color="secondary" 
              onPress={handleGoToMainMenu}
              className="bg-[#73a8d0] text-[#18191d] hover:bg-opacity-60 transition-colors duration-500 h-12 px-6" 
            >
              Volver al Menú principal
            </Button>
          </div>

        </div>
      </Card>
    </div>
  );
};

export default SubsetSum;