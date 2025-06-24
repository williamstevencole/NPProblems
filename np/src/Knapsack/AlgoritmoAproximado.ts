interface Item {
  peso: number;
  valor: number;
}
function mergeSort(items: Item[]): Item[] {
  if (items.length <= 1) return items;

  const mid = Math.floor(items.length / 2);
  const left = mergeSort(items.slice(0, mid));
  const right = mergeSort(items.slice(mid));

  return merge(left, right);
}

function merge(left: Item[], right: Item[]): Item[] {
  const result: Item[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    const ratioLeft = left[i].valor / left[i].peso;
    const ratioRight = right[j].valor / right[j].peso;

    if (ratioLeft >= ratioRight) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

export function aproximado(capacity: number, items: Item[]) {
  const inicio = performance.now();

  const arr = mergeSort(items);

  const seleccionados: Item[] = [];
  let ValorTotal = 0;
  let CapacidadRestante = capacity;
  for (let i = 0; i < arr.length && CapacidadRestante > 0; i++) {
    const item = arr[i];
    if (item.peso <= CapacidadRestante) {
      seleccionados.push(item);
      CapacidadRestante -= item.peso;
      ValorTotal += item.valor;
    }
  }
  const fin = performance.now();
  const tiempo = fin - inicio;

  const selectedSet = new Set(seleccionados);
  const NOseleccionados = items.filter(
    (item) => !selectedSet.has(item)
  );
  return {
    ValorTotal,
    seleccionados,
    NOseleccionados,
    tiempo,
    CapacidadRestante
  };
}
