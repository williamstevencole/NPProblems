import json
import random

n = 988  # Número de nodos
grafo = {}
conexiones_por_nodo = 988  # Número de conexiones por nodo 
nodos = [f"N{i}" for i in range(1, n + 1)]  # Generar nodos

# Generar un grafo aleatorio con conexiones únicas (puede incluir a sí mismo)
for nodo in nodos:
    conexiones = set()
    while len(conexiones) < conexiones_por_nodo: 
        vecino = random.choice(nodos) # Selecciona un nodo aleatorio
        conexiones.add(vecino)  # Añade el nodo seleccionado a las conexiones
    grafo[nodo] = sorted(list(conexiones)) # Ordena las conexiones

grafo_json = {"grafo": grafo} # Crea un diccionario con el grafo

with open(f"grafo{n}_aleatorio_con_{conexiones_por_nodo}_conexiones.json", "w") as f:
    json.dump(grafo_json, f, indent=2) # Guarda el grafo en un archivo JSON

print(f"✅ Grafo generado y guardado como 'grafo{n}_aleatorio_con_{conexiones_por_nodo}_conexiones.json'")
