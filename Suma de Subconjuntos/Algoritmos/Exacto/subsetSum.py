import time
import random
import json
import os
from datetime import datetime

# Metodo 1 - Fuerza bruta: O(2^n)
def subset_sum_bruteforce(arr, target): 
  n = len(arr)
  for i in range(1 << n):
    subset_sum = 0
    for j in range(n):
      if i & (1 << j):
        subset_sum += arr[j]
    if subset_sum == target:
      return True
  return False

# ---------------------------------------------------
# Metodo 2 - Programacion dinamica: O(n*sum)
def subset_sum_dynamic(arr, target): 
  n = len(arr)
  dp = [[False for _ in range(target + 1)] for _ in range(n + 1)]
  
  for i in range(n + 1):
    dp[i][0] = True
    
  for i in range(1, n + 1):
    for j in range(1, target + 1):
      if arr[i-1] <= j:
        dp[i][j] = dp[i-1][j-arr[i-1]] or dp[i-1][j]
      else:
        dp[i][j] = dp[i-1][j]
  
  return dp[n][target]

# ---------------------------------------------------
# Metodo 3 - Pseudopolinomial: O(sum*n)
def subset_sum_pseudopoly(arr, target): 
  n = len(arr)
  prev = [False] * (target + 1)
  prev[0] = True
  
  for i in range(1, n + 1):
    curr = [False] * (target + 1)
    curr[0] = True
    for j in range(1, target + 1):
      if arr[i-1] <= j:
        curr[j] = prev[j-arr[i-1]] or prev[j]
      else:
        curr[j] = prev[j]
    prev = curr
  
  return prev[target]


# --------------------------------------------------------
# Metodo 4: O (2^(n/2)) iterativo (Usare este para el proyecto)
def subset_sum_meet_in_the_middle_iterative(arr, target_sum):
    n = len(arr)
    if n == 0:
        if target_sum == 0:
            return []
        else:
            return None
    mid = n // 2
    left_half = arr[:mid]
    right_half = arr[mid:]
    def generate_sums_iterative(half_array):
        all_sums_and_subsets = [(0, [])]
        for element in half_array:
            num_existing_sums = len(all_sums_and_subsets)
            for i in range(num_existing_sums):
                current_sum, current_subset = all_sums_and_subsets[i]
                new_sum = current_sum + element
                new_subset = current_subset + [element]
                all_sums_and_subsets.append((new_sum, new_subset))
        sums_map = {}
        for s, sub in all_sums_and_subsets:
            if s not in sums_map or len(sub) < len(sums_map[s]): 
                sums_map[s] = sub
        return sums_map
    left_sums_map = generate_sums_iterative(left_half)
    right_sums_map = generate_sums_iterative(right_half)
    found_subset = None
    for l_sum, l_subset in left_sums_map.items():
        required_r_sum = target_sum - l_sum 
        if required_r_sum in right_sums_map:
            r_subset = right_sums_map[required_r_sum]
            found_subset = l_subset + r_subset
            break 
    if found_subset:
        return sorted(found_subset)
    else:
        return None
    
# ---------------------------------------------------

def run_fixed_tests():
    """
    Ejecuta el algoritmo Meet-in-the-Middle con conjuntos de tamaños fijos
    y guarda los resultados en un archivo JSON.
    """
    # ESTE REVIENTA CUANTO ES > 47
    fixed_sizes = [10, 25, 40, 45, 47]
    
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

    if os.path.exists(json_file_name):
        with open(json_file_name, 'r') as f:
            try:
                results_data = json.load(f)
            except json.JSONDecodeError:
                results_data = []
    
    print("\n--- Ejecutando pruebas con conjuntos de tamaños fijos ---")

    for size in fixed_sizes:
        arr = [random.randint(1, 50) for _ in range(size)] # Generamos números aleatorios entre 1 y 50
        print(f"\nProbando con un conjunto de {size} elementos...")
        # print(f"Conjunto generado: {arr}") 
        print(f"Buscando subconjunto que sume: {target_value}")

        start_time = time.perf_counter()
        result = subset_sum_meet_in_the_middle_iterative(arr, target_value)
        end_time = time.perf_counter()
        
        time_taken = end_time - start_time

        if result is not None:
            print(f"¡Éxito! Se encontró un subconjunto que suma {target_value}.")
            # print(f"Subconjunto: {result}") 
        else:
            print(f"No se encontró ningún subconjunto que sume {target_value}.")
        
        print(f"Tiempo tomado (en ejecución): {time_taken:.6f} segundos")

        # Asignar idTest
        new_id_test = 1
        if results_data:
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

    with open(json_file_name, 'w') as f:
        json.dump(results_data, f, indent=4)
    print(f"\nTodas las pruebas se completaron. Resultados guardados en '{json_file_name}'.")

# Ejecutar el test
if __name__ == "__main__":
    run_fixed_tests()