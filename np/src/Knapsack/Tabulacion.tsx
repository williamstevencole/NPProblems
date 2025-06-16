export interface Item {
  peso: number;
  valor: number;
}

export function knapsackTabulation(capacity: number, items: Item[]) {
  const start = performance.now();

  const n = items.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (items[i - 1].peso <= w) {
        dp[i][w] = Math.max(
          items[i - 1].valor + dp[i - 1][w - items[i - 1].peso],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Reconstrucción de ítems seleccionados
  let w = capacity;
  const selectedItems: Item[] = [];
  const notSelectedItems: Item[] = [...items];

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedItems.push(items[i - 1]);
      w -= items[i - 1].peso;
      const index = notSelectedItems.findIndex(
        (it) =>
          it.peso === items[i - 1].peso && it.valor === items[i - 1].valor
      );
      if (index !== -1) notSelectedItems.splice(index, 1);
    }
  }

  const end = performance.now();

  return {
    totalValue: dp[n][capacity],
    selectedItems,
    notSelectedItems,
    tiempo: end - start,
  };
}
