export default function convertJSONToMatrix(grafo: Record<string, string[]>): {
  matriz: number[][];
} {
  const nodos: string[] = Object.keys(grafo);
  const indexMap: Record<string, number> = {};
  nodos.forEach((nodo, idx) => {
    indexMap[nodo] = idx;
  });

  const V: number = nodos.length;
  const matriz: number[][] = Array.from({ length: V }, () => Array(V).fill(0));

  for (const [nodo, vecinos] of Object.entries(grafo)) {
    for (const vecino of vecinos) {
      const i = indexMap[nodo];
      const j = indexMap[vecino];
      matriz[i][j] = 1;
      matriz[j][i] = 1; // no dirigido
    }
  }

  return { matriz };
}
