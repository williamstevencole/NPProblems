import time
# Para poder registrar los testeos 
import json
import os
from datetime import datetime

"""
    Usaremos el hashing para optimizar la búsqueda de subconjuntos que sumen a un valor objetivo.
    Pero este algoritmo es una aproximación y no garantiza encontrar todos los subconjuntos posibles.
    Utilizando la técnica Meet-in-the-Middle, tiene una complejidad de tiempo de ejecución de 
    O(2 elevado a la (n/2)).

    Por ahora, testeable en consola con python
"""

# Ruta para guardar los resultados de los tests
resultados_path = os.path.join(os.getcwd(), "resultados.json")
if os.path.exists(resultados_path):
    with open(resultados_path, "r", encoding="utf-8") as f:
        resultados = json.load(f)
else:
    resultados = []
# Calcular idTest autoincremental
idTest = resultados[-1]["idTest"] + 1 if resultados else 1

now = datetime.now()
fecha = now.strftime("%d/%m/%Y")
hora = now.strftime("%H:%M:%S")
# -------------------------------------------------------------


def subsetSumAproxWithHash(arr, target_sum):
    n = len(arr)

    print("\n--- ALGORITMO: Meet-in-the-Middle (con Hashes) ---")
    print(f"Arreglo de entrada: {arr}")
    print(f"Suma objetivo: {target_sum}")

    # Casos base
    if n == 0:
        if target_sum == 0:
            print(f"Resultado: Subconjunto encontrado: []")
            return []
        else:
            print(f"Resultado: No se encontró ningún subconjunto que sume {target_sum}.")
            return None

    # Un pivote para dividir el arreglo en dos mitades
    mid = n // 2
    left_half = arr[:mid]
    right_half = arr[mid:]

    print(f"\nDividiendo el arreglo en dos mitades:")
    print(f"  Mitad Izquierda (pivot): {left_half}")
    print(f"  Mitad Derecha: {right_half}")

    # --- Función auxiliar para generar todas las sumas y sus subconjuntos con hash map ---
    def generateSumsofSubsets(half_array):
        sums_map = {0: []} # Inicializamos con el subconjunto vacío 
        for element in half_array:
            temp_new_sums = {}
            for current_sum, current_subset in sums_map.items():
                new_sum = current_sum + element
                new_subset = current_subset + [element] # Concatenamos el nuevo elemento
                # Si esta nueva suma no está en el mapa, o si es un subconjunto
                # más corto para la misma suma, lo agregamos/actualizamos.
                if new_sum not in sums_map or len(new_subset) < len(sums_map[new_sum]):
                    temp_new_sums[new_sum] = new_subset   
            # Se agrega las nuevas sumas al mapa principal
            sums_map.update(temp_new_sums)
        return sums_map

    left_sums = generateSumsofSubsets(left_half)
    print(f"  Total de sumas únicas en la izquierda: {len(left_sums)}")

    right_sums = generateSumsofSubsets(right_half)
    print(f"  Total de sumas únicas en la derecha: {len(right_sums)}")

    found_subset = None

    # Itero y calculo la suma necesaria en la mitad derecha por cada izquierda
    for l_sum, l_subset in left_sums.items():
        required_r_sum = target_sum - l_sum
        # La verificación toma O(1) en promedio.
        if required_r_sum in right_sums:
            r_subset = right_sums[required_r_sum]
            # Combino los subconjuntos de ambas mitades
            found_subset = l_subset + r_subset
            print(f"  ¡Encontrado! Suma izquierda ({l_sum}) + Suma derecha ({required_r_sum}) = {target_sum}")
            print(f"  Subconjunto de izquierda: {l_subset}, Subconjunto de derecha: {r_subset}")
            break # Solucion halllada, salgo del bucle

    if found_subset:
        print(f"\nResultado: Subconjunto encontrado: {sorted(found_subset)}")
        return sorted(found_subset) 
    else:
        print(f"\nResultado: No se encontró ningún subconjunto que sume {target_sum}.")
        return None

# --- Ejemplos para quick testing ---
print("="*30)
print("DEMOSTRACIÓN DE SUBSET SUM CON MEET-IN-THE-MIDDLE Y HASHES")
print("="*30)


# Codigo personalizable para testear hasta reventar el algoritmo 
arr_large = list(range(1, 1000)) # Números del 1 al 24
target_sum_large = 1000
print("\nProbando con un arreglo más grande (Dios sepa cuantos elementos)...")
start_time = time.perf_counter()
subsetSumAproxWithHash(arr_large, target_sum_large)
end_time = time.perf_counter()
print(f"Tiempo de ejecución: {(end_time - start_time):.6f} segundos")
print("="*80)

# Registrar los nuevos resultados
nuevo_resultado = {
    "idTest": idTest,
    "fecha": fecha,
    "hora": hora,
    "tamaño del arreglo": len(arr_large) + 1,
    "target": target_sum_large,
    "tiempo tomado (en ejecucion)": round(end_time - start_time, 6)
}
resultados.append(nuevo_resultado)
with open(resultados_path, "w", encoding="utf-8") as f:
    json.dump(resultados, f, indent=4, ensure_ascii=False)