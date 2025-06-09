interface Item {
  weight: number;
  value: number;
}

export function greedyKnapsack(capacity: number, items: Item[]): number {
  const sorted = [...items].sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
  let totalValue = 0;
  let remaining = capacity;

  for (const item of sorted) {
    if (item.weight <= remaining) {
      totalValue += item.value;
      remaining -= item.weight;
    } else {
      totalValue += (item.value / item.weight) * remaining;
      break;
    }
  }

  return totalValue;
}
