import time
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Endpoint 1: Backtracking tipo GFG con matriz de adyacencia
@app.route('/api/coloracion-backtracking-gfg', methods=['POST'])
def coloracion_backtracking_gfg_endpoint():
    data = request.get_json()
    grafo_dict = data.get('grafo')

    if not grafo_dict:
        return jsonify({"error": "No se proporcionó un grafo"}), 400

    nodos = list(grafo_dict.keys())
    index_map = {nodo: idx for idx, nodo in enumerate(nodos)}
    reverse_map = {idx: nodo for nodo, idx in index_map.items()}
    V = len(nodos)

    graph = [[0] * V for _ in range(V)]
    for nodo, vecinos in grafo_dict.items():
        for vecino in vecinos:
            if vecino in index_map:
                i = index_map[nodo]
                j = index_map[vecino]
                graph[i][j] = 1
                graph[j][i] = 1  # No dirigido

    color = [0] * V
    m = V
    llamadas = 0
    backtracks = 0

    def is_safe(v, c):
        for i in range(V):
            if graph[v][i] and color[i] == c:
                return False
        return True

    def util(v):
        nonlocal llamadas, backtracks
        llamadas += 1
        if v == V:
            return True
        for c in range(1, m + 1):
            if is_safe(v, c):
                color[v] = c
                if util(v + 1):
                    return True
                color[v] = 0
                backtracks += 1
        return False

    inicio = time.perf_counter()
    exito = util(0)
    fin = time.perf_counter()

    if not exito:
        return jsonify({
            "gfg_backtracking": {
                "asignacion": None,
                "colores_usados": 0,
                "tiempo": (fin - inicio) * 1000,
                "llamadas": llamadas,
                "backtracks": backtracks
            }
        })

    asignacion = {
        reverse_map[i]: color[i] for i in range(V)
    }

    return jsonify({
        "gfg_backtracking": {
            "asignacion": asignacion,
            "colores_usados": max(color),
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

    # Versión iterativa del backtracking
    def backtrack_iterativo():
        nonlocal llamadas, backtracks
        asignacion = {}
        stack = [(0, asignacion.copy())]  # (índice, asignación actual)
        
        while stack:
            llamadas += 1
            index, current_asignacion = stack.pop()
            
            if index == len(nodos):
                return current_asignacion
                
            nodo = nodos[index]
            for color in range(1, max_colores + 1):
                if es_valido(current_asignacion, nodo, color):
                    new_asignacion = current_asignacion.copy()
                    new_asignacion[nodo] = color
                    stack.append((index + 1, new_asignacion))
                else:
                    backtracks += 1
                    
        return None

    inicio = time.perf_counter()
    asignacion = backtrack_iterativo()
    fin = time.perf_counter()

    return jsonify({
        "backtracking": {
            "asignacion": asignacion,
            "colores_usados": max(asignacion.values()) if asignacion else 0,
            "tiempo": (fin - inicio) * 1000,
            "llamadas": llamadas,
            "backtracks": backtracks
        }
    })


if __name__ == '__main__':
    app.run()
