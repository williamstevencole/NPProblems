import time
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

from flask import request, jsonify
import time

@app.route('/api/coloracion-backtracking-gfg', methods=['POST'])
def coloracion_backtracking_gfg():
    data = request.get_json()
    graph = data.get("matriz")

    if not graph:
        return jsonify({"error": "Falta la matriz de adyacencia"}), 400

    V = len(graph)
    color = [0] * V # Inicializar colores de los vértices a 0
    llamadas = 0
    backtracks = 0

    def is_safe(v, graph, color, c):
        for i in range(V):
            if graph[v][i] and color[i] == c:
                return False
        return True

    def graph_coloring_util(graph, m, color, v):
        nonlocal llamadas, backtracks
        llamadas += 1
        if v == V:
            return True

        for c in range(1, m + 1):
            if is_safe(v, graph, color, c):
                color[v] = c
                if graph_coloring_util(graph, m, color, v + 1):
                    return True
                color[v] = 0
                backtracks += 1
        return False

    m = V  # Hasta V colores
    inicio = time.time()
    exito = graph_coloring_util(graph, m, color, 0)
    fin = time.time()

    asignacion = {i: color[i] for i in range(V)} if exito else {}

    return jsonify({
        "backtracking": {
            "asignacion": asignacion if exito else None,
            "colores_usados": max(asignacion.values()) if exito else 0,
            "tiempo": (fin - inicio), #
            "llamadas": llamadas,
            "backtracks": backtracks
        }
    })




# Endpoint 2: Backtracking tipo diccionario sin matriz de adyacencia
@app.route('/api/coloracion-backtracking', methods=['POST'])
def coloracion_backtracking_endpoint():
    data = request.get_json() # Obtener los datos del cuerpo de la solicitud
    grafo = data.get('grafo') # Obtener el grafo del JSON

    if not grafo:
        return jsonify({"error": "No se proporcionó un grafo"}), 400

    # setea los nodos y colores máximos
    nodos = list(grafo.keys()) 
    max_colores = len(nodos)
    llamadas = 0
    backtracks = 0

    def es_valido(asignacion, nodo, color) -> bool:
        """
        Verifica si es válido asignar un color a un nodo, en base a los colores asignados a sus vecinos.
        Si su vecino tiene un color diferente al color asignado al nodo, retorna True.
        """
        return all(asignacion.get(vecino) != color for vecino in grafo[nodo])

    def backtrack(index, asignacion) -> bool:
        """
        Función recursiva de backtracking para intentar asignar colores a los nodos.
        Se incrementan los contadores de llamadas y backtracks.
        Si se asigna un color válido a un nodo, se llama recursivamente para el siguiente nodo.
        Si se llega al final de los nodos, se retorna True.
        Si no se puede asignar un color válido, se deshace la asignación y se incrementa el contador de backtracks.
        """
        nonlocal llamadas, backtracks
        llamadas += 1
        if index == len(nodos): # Si hemos asignado colores a todos los nodos, terminamos
            return True
        nodo = nodos[index]
        for color in range(1, max_colores + 1): # recorre todos los colores posibles
            if es_valido(asignacion, nodo, color): # Verificar si es válido asignar el color al nodo
                asignacion[nodo] = color # Asignar el color al nodo
                if backtrack(index + 1, asignacion): # Llamada recursiva para el siguiente nodo
                    return True 
                # Deshacer la asignación si no es válida
                del asignacion[nodo]
                backtracks += 1
        return False

    asignacion: dict[str , int] = {}
    inicio = time.time()
    exito = backtrack(0, asignacion)
    fin = time.time()

    return jsonify({
        "backtracking": {
            "asignacion": asignacion if exito else None,
            "colores_usados": max(asignacion.values()) if exito else 0,
            "tiempo": (fin - inicio), # tiempo en segundos
            "llamadas": llamadas,
            "backtracks": backtracks
        }
    })





if __name__ == '__main__':
    app.run()
