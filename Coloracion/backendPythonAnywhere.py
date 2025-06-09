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
    color = [0] * V
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
            "tiempo": (fin - inicio) * 1000,
            "llamadas": llamadas,
            "backtracks": backtracks
        }
    })




# Endpoint 2: Backtracking tipo diccionario sin matriz de adyacencia
@app.route('/api/coloracion-backtracking', methods=['POST'])
def coloracion_backtracking_endpoint():
    data = request.get_json()
    grafo = data.get('grafo')

    if not grafo:
        return jsonify({"error": "No se proporcionó un grafo"}), 400

    nodos = list(grafo.keys())
    max_colores = len(nodos)
    llamadas = 0
    backtracks = 0

    def es_valido(asignacion, nodo, color):
        return all(asignacion.get(vecino) != color for vecino in grafo[nodo])

    def backtrack(index, asignacion):
        nonlocal llamadas, backtracks
        llamadas += 1
        if index == len(nodos):
            return True
        nodo = nodos[index]
        for color in range(1, max_colores + 1):
            if es_valido(asignacion, nodo, color):
                asignacion[nodo] = color
                if backtrack(index + 1, asignacion):
                    return True
                del asignacion[nodo]
                backtracks += 1
        return False

    asignacion = {}
    inicio = time.perf_counter()
    exito = backtrack(0, asignacion)
    fin = time.perf_counter()

    return jsonify({
        "backtracking": {
            "asignacion": asignacion if exito else None,
            "colores_usados": max(asignacion.values()) if exito else 0,
            "tiempo": (fin - inicio) * 1000,
            "llamadas": llamadas,
            "backtracks": backtracks
        }
    })





if __name__ == '__main__':
    app.run()
