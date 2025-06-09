# Algoritmos para resolver el problema de la suma de subconjuntos
# mediante algoritmos aceptados por la comunidad.
# Adaptado de GeeksforGeeks.
# ...
# ...

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

# ---------------------------------------------------
arr = [3, 34, 4, 12, 5, 2, 9, 0, 7, 54, 48, 90, 44, 16, 10, 20, 33, 21, 11, 8, 6, 1, 15, 13, 14, 17, 18]
target = 22
print(subset_sum_bruteforce(arr, target))  
print(subset_sum_dynamic(arr, target))     
print(subset_sum_pseudopoly(arr, target))  