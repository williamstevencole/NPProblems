# Algoritmos para resolver el problema de la suma de subconjuntos
# mediante algoritmos aceptados por la comunidad.
# Adaptado de GeeksforGeeks.
# ...
# ...
import time

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
    print("\n--- ALGORITMO: Meet-in-the-Middle (Iterativo sin Recursión) ---")
    print(f"Arreglo de entrada: {arr}")
    print(f"Suma objetivo: {target_sum}")

    if n == 0:
        if target_sum == 0:
            print(f"Resultado: Subconjunto encontrado: []")
            return []
        else:
            print(f"Resultado: No se encontró ningún subconjunto que sume {target_sum}.")
            return None

    mid = n // 2
    left_half = arr[:mid]
    right_half = arr[mid:]

    print(f"\nDividiendo el arreglo en dos mitades:")
    print(f"  Mitad Izquierda: {left_half}")
    print(f"  Mitad Derecha: {right_half}")

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
            if s not in sums_map or len(sub) < len(sums_map[s]): # Priorizar subconjunto más corto (opcional)
                sums_map[s] = sub
        return sums_map

    # Generación de sumas para cada mitad (de forma iterativa)
    print("\nGenerando todas las sumas posibles para la mitad izquierda (iterativo)...")
    left_sums_map = generate_sums_iterative(left_half)
    print(f"  Total de sumas únicas en la izquierda: {len(left_sums_map)}")

    print("\nGenerando todas las sumas posibles para la mitad derecha (iterativo)...")
    right_sums_map = generate_sums_iterative(right_half)
    print(f"  Total de sumas únicas en la derecha: {len(right_sums_map)}")

    found_subset = None

    # El "Encuentro en el Medio" 
    print("\nBuscando el 'encuentro' en el medio (suma complementaria):")
    for l_sum, l_subset in left_sums_map.items():
        required_r_sum = target_sum - l_sum  
        if required_r_sum in right_sums_map:
            r_subset = right_sums_map[required_r_sum]
            found_subset = l_subset + r_subset
            print(f"  ¡Encontrado! Suma izquierda ({l_sum}) + Suma derecha ({required_r_sum}) = {target_sum}")
            print(f"  Subconjunto de izquierda: {l_subset}, Subconjunto de derecha: {r_subset}")
            break 

    # Resultado final
    if found_subset:
        print(f"\nResultado: Subconjunto encontrado: {sorted(found_subset)}")
        return sorted(found_subset)
    else:
        print(f"\nResultado: No se encontró ningún subconjunto que sume {target_sum}.")
        return None
    
# ---------------------------------------------------
arr = [3, 34, 4, 12, 5, 2, 9, 0, 7, 54, 48, 90, 44, 16, 10, 20, 33, 21, 11, 8, 6, 1, 15, 13, 14, 17, 18]
target = 22
print(subset_sum_bruteforce(arr, target))  
print(subset_sum_dynamic(arr, target))     
print(subset_sum_pseudopoly(arr, target))  
print(subset_sum_meet_in_the_middle_iterative(arr, target))