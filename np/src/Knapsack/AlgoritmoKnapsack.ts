interface Item {
  peso: number;
  valor: number;
}

export function memoizedKnapsack(capacity: number, items: Item[]) {
  const n = items.length;
  // Creamos la matriz de memoización
  const memo: (number | null)[][] = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(null)
  );

  function knapsack(cap: number, i: number): number {
    if (memo[i][cap] !== null) {
      return memo[i][cap]!;
    }

    if (i === 0 || cap === 0) {
      memo[i][cap] = 0;
    } else if (items[i - 1].peso > cap) {
      memo[i][cap] = knapsack(cap, i - 1);
    } else {
      const include =
        items[i - 1].valor + knapsack(cap - items[i - 1].peso, i - 1);
      const exclude = knapsack(cap, i - 1);
      memo[i][cap] = Math.max(include, exclude);
    }

    return memo[i][cap]!;
  }
  const inicio = performance.now();
  const totalValue = knapsack(capacity, n);
  const fin = performance.now();
  const tiempo= fin-inicio;
  console.log("Funcion knap :"+tiempo);
  // Para reconstruir los ítems seleccionados
  const selectedItems: Item[] = [];
  let cap = capacity;
  let i = n;

  while (i > 0 && cap > 0) {
    if (memo[i][cap] !== memo[i - 1][cap]) {
      selectedItems.push(items[i - 1]);
      cap -= items[i - 1].peso;
    }
    i--;
  }

  // Los ítems que quedaron afuera
  const selectedSet = new Set(selectedItems);
  const notSelectedItems = items.filter((item) => !selectedSet.has(item));
  return { totalValue, selectedItems, notSelectedItems,tiempo}; 
}
