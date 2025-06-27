import time

def coloracion_backtracking(grafo) -> dict:
    nodos = list(grafo.keys()) # -> n
    max_colores = len(nodos) # -> m
 
    llamadas = 0 # -> c 
    backtracks = 0 # -> c

    def es_valido(asignacion, nodo, color) -> bool:
        for vecino in grafo[nodo]:
            if vecino in asignacion and asignacion[vecino] == color:
                return False
        return True

    def backtrack(index, asignacion) -> bool:
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

    resultado = {
        "asignacion": asignacion if exito else None,
        "colores_usados": max(asignacion.values()) if exito else 0,
        "tiempo_ms": (fin - inicio) * 1000,
        "llamadas": llamadas,
        "backtracks": backtracks
    }

    return resultado


# Ejemplo de uso
if __name__ == "__main__":
    grafo = {
        "A": ["B", "C"],
        "B": ["A", "C"],
        "C": ["A", "B"]
    }

    resultado = coloracion_backtracking(grafo)

    print("Resultado:")
    for clave, valor in resultado.items():
        print(f"{clave}: {valor}")
