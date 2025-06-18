interface Item {
  peso: number;
  valor: number;
}

export function aproximado(capacity: number, items: Item[]) {
  const inicio = performance.now();

  // Ordenar ítems por eficiencia (valor/peso) descendente
  const sortedItems = [...items].sort(
    (a, b) => b.valor / b.peso - a.valor / a.peso
  );

  const selectedItems: Item[] = [];
  let totalValue = 0;
  let remainingCapacity = capacity;

  for (let i = 0; i < sortedItems.length && remainingCapacity > 0; i++) {
    const item = sortedItems[i];

    if (item.peso <= remainingCapacity) {
      selectedItems.push(item);
      remainingCapacity -= item.peso;
      totalValue += item.valor;
    }
    // Si el ítem no cabe completo, simplemente se omite
  }
console.log(totalValue);
  const fin = performance.now();
  const tiempo = fin - inicio;

  const selectedSet = new Set(selectedItems);
  const notSelectedItems = items.filter(
    (item) => !selectedSet.has(item)
  );
console.log(selectedItems);
console.log(notSelectedItems);
  return {
    totalValue,
    selectedItems,
    notSelectedItems,
    tiempo,
    remainingCapacity
  };
}
