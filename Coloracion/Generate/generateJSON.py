import json
import random

n = 15  # Número de nodos
grafo = {}
max_conexiones = 9  # Máximo de conexiones posibles por nodo
nodos = [f"N{i}" for i in range(1, n + 1)]  # Generar nodos

# Generar un grafo aleatorio con conexiones aleatorias para cada nodo
for nodo in nodos:
    # Número aleatorio de conexiones para este nodo (entre 1 y el máximo)
    num_conexiones = random.randint(1, max_conexiones)
    
    conexiones = set()
    while len(conexiones) < num_conexiones:
        vecino = random.choice(nodos) # Selecciona un nodo aleatorio
        conexiones.add(vecino)  # Añade el nodo seleccionado a las conexiones
    grafo[nodo] = sorted(list(conexiones)) # Ordena las conexiones
grafo_json = {"grafo": grafo} # Crea un diccionario con el grafo

with open(f"grafo{n}_aleatorio_con_max_{max_conexiones}_conexiones.json", "w") as f:
    json.dump(grafo_json, f, indent=2) # Guarda el grafo en un archivo JSON


print(f"✅ Grafo generado y guardado como 'grafo{n}_aleatorio_con_max_{max_conexiones}_conexiones.json'")
