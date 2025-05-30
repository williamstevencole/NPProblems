import json
import random

n = 988  # Número de nodos
grafo = {}
conexiones_por_nodo = 1  # Número de conexiones por nodo
nodos = [f"N{i}" for i in range(1, n + 1)]

for nodo in nodos:
    conexiones = set()
    while len(conexiones) < conexiones_por_nodo:
        vecino = random.choice(nodos)
        if vecino != nodo:
            conexiones.add(vecino)
    grafo[nodo] = sorted(list(conexiones))

grafo_json = {"grafo": grafo}

# Guardar el archivo
with open(f"grafo{n}_aleatorio_con_{conexiones_por_nodo}_conexiones.json", "w") as f:
    json.dump(grafo_json, f, indent=2)

print(f"✅ Grafo generado y guardado como 'grafo{n}_aleatorio_con_{conexiones_por_nodo}_conexiones.json'")
