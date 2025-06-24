interface Item {
  peso: number;
  valor: number;
}

export function exacto(capacidad: number, items: Item[]) {
  const n = items.length;
  const arr: number[][] = Array.from({ length: n + 1 }, () =>
    Array(capacidad + 1).fill(0)
  );

  const inicio = performance.now();

  for (let i = 1; i <= n; i++) {
    for (let CapacidadRestante = 0; CapacidadRestante <= capacidad; CapacidadRestante++) {
      if (items[i - 1].peso > CapacidadRestante) {
        arr[i][CapacidadRestante] = arr[i - 1][CapacidadRestante]; // No se puede incluir
      } else {
        arr[i][CapacidadRestante] = Math.max(
          arr[i - 1][CapacidadRestante - items[i - 1].peso] + items[i - 1].valor, // Si entra
                    arr[i - 1][CapacidadRestante] // No entra
        );
      }
    }
  }

  const fin = performance.now();
  const tiempo = fin - inicio;
  const ValorTotal = arr[n][capacidad];

/*
let a="";
  for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= capacidad; j++) {
            a+=arr[i][j]+" ";
        }
        a+="\n";
    }
    console.log(a);
  // arrays de incluidos y excluidos 
*/
  const seleccionados: Item[] = [];
  let i = n;
  let CapacidadRestante = capacidad;

  while (i > 0 && CapacidadRestante > 0) {
    if (arr[i][CapacidadRestante] !== arr[i - 1][CapacidadRestante]) {
      seleccionados.push(items[i - 1]);
      CapacidadRestante -= items[i - 1].peso;
    }
    i--;
  }

  const selectedSet = new Set(seleccionados);
  const NOseleccionados = items.filter((item) => !selectedSet.has(item));

  return { ValorTotal, seleccionados, NOseleccionados, tiempo,CapacidadRestante };
}
