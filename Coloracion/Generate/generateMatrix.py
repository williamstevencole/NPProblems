import random
import json

def generar_matriz_adyacencia(n, conexiones_por_nodo):
    matriz = [[0 for _ in range(n)] for _ in range(n)]

    for i in range(n):
        posibles_vecinos = [j for j in range(n) if j != i and matriz[i][j] == 0]
        vecinos = random.sample(posibles_vecinos, min(conexiones_por_nodo, len(posibles_vecinos)))
        for j in vecinos:
            matriz[i][j] = 1
            matriz[j][i] = 1  # grafo no dirigido

    return matriz

n = 20
conexiones_por_nodo = 1

matriz = generar_matriz_adyacencia(n, conexiones_por_nodo)

# Envolvemos la matriz en un diccionario con la clave "matriz"
output = {
    "matriz": matriz
}

with open(f"matriz_adyacencia_{n}_{conexiones_por_nodo}.json", "w") as f:
    json.dump(output, f, indent=2)
