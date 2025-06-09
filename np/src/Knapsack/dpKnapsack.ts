interface Item {
  weight: number;
  value: number;
}

export function dpKnapsack(capacity: number, items: Item[]): number {
  const n = items.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const { weight, value } = items[i - 1];
    for (let w = 1; w <= capacity; w++) {
      if (weight <= w) {
        dp[i][w] = Math.max(value + dp[i - 1][w - weight], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
}
