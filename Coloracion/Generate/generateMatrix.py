import random
import json

def generar_matriz_adyacencia(n, conexiones_por_nodo):
    matriz = [[0 for _ in range(n)] for _ in range(n)]

    for i in range(n):
        posibles_vecinos = [j for j in range(n) if j != i and matriz[i][j] == 0]
        vecinos = random.sample(posibles_vecinos, min(conexiones_por_nodo, len(posibles_vecinos)))
        for j in vecinos:
            matriz[i][j] = 1
            matriz[j][i] = 1  # no dirigido

    return matriz

n = 988
conexiones_por_nodo = 988

matriz = generar_matriz_adyacencia(n, conexiones_por_nodo)

with open(f"matriz_adyacencia_{n}_{conexiones_por_nodo}.json", "w") as f:
    json.dump(matriz, f, indent=2)
