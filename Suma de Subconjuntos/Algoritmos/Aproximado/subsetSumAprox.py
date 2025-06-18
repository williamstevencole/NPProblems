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

# La ruta para el archivo de resultados se manejará dentro de la función de prueba
# para evitar variables globales innecesarias que causen confusión.

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
            # Hacer una copia para iterar mientras se modifican los elementos
            # Esto previene el error "RuntimeError: dictionary changed size during iteration"
            current_entries = list(sums_map.items()) 
            for current_sum, current_subset in current_entries:
                new_sum = current_sum + element
                new_subset = current_subset + [element] # Concatenamos el nuevo elemento
                # Si esta nueva suma no está en el mapa, o si es un subconjunto
                # más corto para la misma suma, lo agregamos/actualizamos.
                if new_sum not in sums_map or len(new_subset) < len(sums_map[new_sum]):
                    sums_map[new_sum] = new_subset   
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

# ---------------------------------------------------
# Código para testear el algoritmo con conjuntos de tamaños fijos y guardar resultados
def run_fixed_tests_for_aprox():
    """
    Ejecuta el algoritmo subsetSumAproxWithHash con conjuntos de tamaños fijos
    y guarda los resultados en un archivo JSON.
    """
    # Tamaños de conjuntos fijos solicitados
    fixed_sizes = [10, 25, 45, 47, 100, 200, 500, 1000] 
    
    try:
        target_value = int(input("Ingrese la suma objetivo (target) para todas las pruebas: "))
        if target_value < 0:
            print("El target no puede ser un número negativo.")
            return

    except ValueError:
        print("Entrada inválida. Por favor, ingrese un número entero.")
        return

    json_file_name = "resultados.json"
    results_data = []

    # Cargar resultados existentes para preservar el historial
    if os.path.exists(json_file_name):
        with open(json_file_name, 'r', encoding='utf-8') as f:
            try:
                results_data = json.load(f)
            except json.JSONDecodeError:
                # Si el archivo está vacío o corrupto, lo iniciamos como una lista vacía
                results_data = []
    
    print("\n--- Ejecutando pruebas con conjuntos de tamaños fijos para subsetSumAproxWithHash ---")

    for size in fixed_sizes:
        # Generar un conjunto con números fijos (secuencia del 1 al 'size')
        arr = list(range(1, size + 1)) 

        print(f"\nProbando con un conjunto de {size} elementos (números del 1 al {size})...")
        print(f"Buscando subconjunto que sume: {target_value}")

        start_time = time.perf_counter()
        result = subsetSumAproxWithHash(arr, target_value)
        end_time = time.perf_counter()
        
        time_taken = end_time - start_time
        
        print(f"Tiempo tomado (en ejecución): {time_taken:.6f} segundos")
        print("="*80) # Separador visual entre pruebas

        # Asignar idTest autoincremental
        new_id_test = 1
        if results_data:
            # Buscar el máximo idTest en los datos existentes
            new_id_test = max(item.get('idTest', 0) for item in results_data) + 1

        current_datetime = datetime.now()
        new_entry = {
            "idTest": new_id_test,
            "fecha": current_datetime.strftime("%d/%m/%Y"),
            "hora": current_datetime.strftime("%H:%M:%S"),
            "tamaño del arreglo": size,
            "target": target_value,
            "tiempo tomado (en ejecucion)": round(time_taken, 6)
        }
        
        results_data.append(new_entry)

    # Guardar todos los resultados (existentes + nuevos) al final
    with open(json_file_name, 'w', encoding='utf-8') as f:
        json.dump(results_data, f, indent=4, ensure_ascii=False)

    print(f"\nTodas las pruebas se completaron. Resultados guardados en '{json_file_name}'.")

# Ejecutar el test
if __name__ == "__main__":
    run_fixed_tests_for_aprox()