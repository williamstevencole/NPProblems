import time
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  


# Brute force con backtracking
def coloracion_brute_force(grafo):
    nodos = list(grafo.keys())
    max_colores = len(nodos)
    llamadas = 0
    backtracks = 0

    #funcion para verificar si el color es valido
    def es_valido(asignacion, nodo, color):
        return all(asignacion.get(vecino) != color for vecino in grafo[nodo])

    #funcion para hacer el backtracking
    #backtrack es una funcion que se encarga de hacer el backtracking 
    #(backtracking es una tecnica de programacion que se encarga de encontrar la solucion a un problema de manera recursiva) 
    #para encontrar la solucion
    def backtrack(index, asignacion):
        nonlocal llamadas, backtracks
        llamadas += 1
        if index == len(nodos):
            return True
        nodo = nodos[index]
        #for para asignar los colores a los nodos
        for color in range(1, max_colores + 1):
            #verifica si el color es valido
            if es_valido(asignacion, nodo, color):
                asignacion[nodo] = color
                #llama a la funcion backtrack para asignar el siguiente nodo
                if backtrack(index + 1, asignacion):
                    return True
                del asignacion[nodo]
                backtracks += 1
        return False

    asignacion = {}
    inicio = time.perf_counter()
    exito = backtrack(0, asignacion)
    fin = time.perf_counter()
    #retorna la asignacion de los colores a los nodos
    return {
        "asignacion": asignacion if exito else None,
        "tiempo": (fin - inicio) * 1000,
        "llamadas": llamadas,
        "backtracks": backtracks
    }

# Greedy coloring
def coloracion_greedy(grafo):
    nodos = list(grafo.keys())
    asignacion = {}
    inicio = time.perf_counter()
    #for para asignar los colores a los nodos
    for nodo in nodos:
        colores_usados = {asignacion[vecino] for vecino in grafo[nodo] if vecino in asignacion}
        color = 1
        while color in colores_usados:
            color += 1
        asignacion[nodo] = color
    fin = time.perf_counter()
    #retorna la asignacion de los colores a los nodos
    return {
        "asignacion": asignacion,
        "tiempo": (fin - inicio) * 1000,
        "colores_usados": max(asignacion.values())
    }

#endpoint para la coloracion
@app.route('/api/coloracion', methods=['POST'])
def coloracion_endpoint():
    data = request.get_json()
    grafo = data.get('grafo')
    
    if not grafo:
        return jsonify({"error": "No se proporcionó un grafo"}), 400
    
    resultado_brute = coloracion_brute_force(grafo)
    resultado_greedy = coloracion_greedy(grafo)
    
    return jsonify({
        "brute_force": resultado_brute,
        "greedy": resultado_greedy
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)