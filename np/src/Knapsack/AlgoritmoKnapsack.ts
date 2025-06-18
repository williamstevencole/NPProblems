interface Item {
  peso: number;
  valor: number;
}

export function exacto(capacity: number, items: Item[]) {
  const n = items.length;
  const arr: number[][] = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0)
  );

  const inicio = performance.now();

  // Llenar la tabla con bucles
  for (let i = 1; i <= n; i++) {
    for (let cap = 0; cap <= capacity; cap++) {
      if (items[i - 1].peso > cap) {
        arr[i][cap] = arr[i - 1][cap]; // No se puede incluir
      } else {
        arr[i][cap] = Math.max(
          arr[i - 1][cap], // No entra
          arr[i - 1][cap - items[i - 1].peso] + items[i - 1].valor // Si entra
        );
      }
    }
  }

  const fin = performance.now();
  const tiempo = fin - inicio;
  const totalValue = arr[n][capacity];

  // Construir simplemente los arrays de incluidos y excluidos 
  const selectedItems: Item[] = [];
  let i = n;
  let cap = capacity;

  while (i > 0 && cap > 0) {
    if (arr[i][cap] !== arr[i - 1][cap]) {
      selectedItems.push(items[i - 1]);
      cap -= items[i - 1].peso;
    }
    i--;
  }

  const selectedSet = new Set(selectedItems);
  const notSelectedItems = items.filter((item) => !selectedSet.has(item));
console.log(totalValue);
console.log(selectedItems);
console.log(notSelectedItems);
  return { totalValue, selectedItems, notSelectedItems, tiempo };
}
