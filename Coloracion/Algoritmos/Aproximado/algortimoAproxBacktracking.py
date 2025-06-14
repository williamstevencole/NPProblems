import time

def coloracion_backtracking(grafo) -> dict:
    """  Coloración de un grafo utilizando el algoritmo de backtracking."""
    nodos = list(grafo.keys()) # Obtener los nodos del grafo
    max_colores = len(nodos) # El número máximo de colores es igual al número de nodos

    # Variables para contar llamadas y backtracks
    llamadas = 0
    backtracks = 0

    def es_valido(asignacion, nodo, color) -> bool:
        """ 
        Verifica si es válido asignar un color a un nodo, en base a los colores asignados a sus vecinos,
        si su vecino tiene un color diferente al color asignado al nodo."""
        return all(asignacion.get(vecino) != color for vecino in grafo[nodo])

    def backtrack(index, asignacion) -> bool:
        """
        Función recursiva de backtracking para intentar asignar colores a los nodos.
        """
        nonlocal llamadas, backtracks # Acceder a las variables externas
        llamadas += 1
        if index == len(nodos): # Si hemos asignado colores a todos los nodos, terminamos
            return True
        nodo = nodos[index]
        for color in range(1, max_colores + 1): # recorre todos los colores posibles
            if es_valido(asignacion, nodo, color): # Verificar si es válido asignar el color al nodo
                asignacion[nodo] = color # Asignar el color al nodo
                if backtrack(index + 1, asignacion): # Llamada recursiva para el siguiente nodo
                    return True
                # Si la asignación no lleva a una solución, deshacer la asignación 
                del asignacion[nodo] # Deshacer la asignación si no es válida
                backtracks += 1 # Incrementar el contador de backtracks
        return False

    asignacion = {} # Diccionario para almacenar la asignación de colores a los nodos
    inicio = time.perf_counter()  
    exito = backtrack(0, asignacion)  # Iniciar el proceso de backtracking
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
