import json
import random

def generate_complete_graph(n):
    """Genera un grafo completo con n nodos."""
    nodes = [str(i) for i in range(n)]
    return {node: [other for other in nodes if other != node] for node in nodes}


def generate_connected_graph(n, extra_edges=0):
    """Genera un grafo conexo con un árbol aleatorio más aristas extra."""
    nodes = list(range(n))
    graph = {str(i): [] for i in nodes}
    unvisited = set(nodes)
    visited = {unvisited.pop()}
    while unvisited:
        u = random.choice(list(visited))
        v = unvisited.pop()
        graph[str(u)].append(str(v))
        graph[str(v)].append(str(u))
        visited.add(v)
    pairs = [(i, j) for i in nodes for j in nodes if i < j]
    random.shuffle(pairs)
    added = 0
    for u, v in pairs:
        if added >= extra_edges:
            break
        if str(v) not in graph[str(u)]:
            graph[str(u)].append(str(v))
            graph[str(v)].append(str(u))
            added += 1
    return {k: sorted(v) for k, v in graph.items()}


def generate_bipartite_graph(n1, n2, edge_prob=0.5, complete=False):
    """Genera un grafo bipartito entre A0..A(n1-1) y B0..B(n2-1)."""
    nodes = [f"A{i}" for i in range(n1)] + [f"B{j}" for j in range(n2)]
    graph = {node: [] for node in nodes}
    for i in range(n1):
        for j in range(n2):
            if complete or random.random() < edge_prob:
                u, v = f"A{i}", f"B{j}"
                graph[u].append(v)
                graph[v].append(u)
    return {k: sorted(v) for k, v in graph.items()}


def generate_sparse_graph(n, max_edges_per_node):
    """Genera grafo disperso con hasta max_edges_per_node conexiones."""
    nodes = list(range(n))
    graph = {str(i): set() for i in nodes}
    for i in nodes:
        k = random.randint(0, max_edges_per_node)
        while len(graph[str(i)]) < k:
            j = random.choice(nodes)
            if j != i:
                graph[str(i)].add(str(j))
                graph[str(j)].add(str(i))
    return {k: sorted(v) for k, v in graph.items()}


def build_adjacency_matrix(graph):
    """Construye matriz de adyacencia y lista de nodos ordenada."""
    nodes = sorted(graph.keys(), key=lambda x: (len(x), x))
    idx = {node: i for i, node in enumerate(nodes)}
    n = len(nodes)
    matrix = [[0]*n for _ in range(n)]
    for u, neigh in graph.items():
        for v in neigh:
            matrix[idx[u]][idx[v]] = 1
    return nodes, matrix


def prompt_int(msg, min_val=None):
    while True:
        try:
            val = int(input(msg))
            if min_val is not None and val < min_val:
                print(f"Debe ser >= {min_val}.")
            else:
                return val
        except ValueError:
            print("Ingrese un entero válido.")


def main():
    print("Tipos: complete, connected, bipartite, sparse")
    t = input("Tipo de grafo: ").strip().lower()
    if t == "complete":
        n = prompt_int("N nodos: ", 1)
        g = generate_complete_graph(n)
        desc = f"complete_{n}_nodos"
    elif t == "connected":
        n = prompt_int("N nodos: ", 1)
        e = prompt_int("Aristas extra: ", 0)
        g = generate_connected_graph(n, extra_edges=e)
        desc = f"connected_{n}_nodos_{e}_extras"
    elif t == "bipartite":
        n1 = prompt_int("Tamaño A: ", 1)
        n2 = prompt_int("Tamaño B: ", 1)
        comp = input("Todos pares? (s/n): ").strip().lower() == 's'
        prob = 1.0 if comp else float(input("Probabilidad [0-1]: "))
        g = generate_bipartite_graph(n1, n2, edge_prob=prob, complete=comp)
        desc = f"bipartite_{n1}_{n2}"
    elif t == "sparse":
        n = prompt_int("N nodos: ", 1)
        m = prompt_int("Max conexiones nodo: ", 0)
        g = generate_sparse_graph(n, max_edges_per_node=m)
        desc = f"sparse_{n}_nodos_max_{m}"
    else:
        print("Tipo inválido.")
        return

    # Nombres automáticos
    list_file = f"grafo_{desc}.json"
    mat_file = f"matriz_grafo_{desc}.json"

    # Guardar lista
    with open(list_file, 'w') as f:
        json.dump({'grafo': g}, f, indent=2)
    print(f"Lista guardada en {list_file}")

    # Guardar matriz
    nodes, mat = build_adjacency_matrix(g)
    with open(mat_file, 'w') as f:
        json.dump({'nodos': nodes, 'matriz': mat}, f, indent=2)
    print(f"Matriz guardada en {mat_file}")

if __name__ == "__main__":
    main()
