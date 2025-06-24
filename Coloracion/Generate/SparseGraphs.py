#!/usr/bin/env python3
import json
import urllib.request
import urllib.error
from generateJSON import generate_sparse_graph, build_adjacency_matrix

# Endpoints aproximado y exacto
API_URL_APPROX = 'http://127.0.0.1:5000/api/coloracion-backtracking'
API_URL_EXACT  = 'http://127.0.0.1:5000/api/coloracion-backtracking-gfg'

# Tamaños de grafos y conexiones máximas
SIZES     = [10, 50, 100, 250, 500, 750, 900, 950, 980, 981, 982, 983, 985, 990, 1000]
MAX_EDGES = 2
# Base para los archivos de salida
OUTPUT_BASE = 'sparse_graph_results'


def post_json(url, payload):
    """Envía POST con JSON y devuelve dict o None."""
    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        with urllib.request.urlopen(req) as resp:
            return json.load(resp)
    except Exception as e:
        print(f"Error al contactar {url}: {e}")
    return None


def pedir_int(prompt, min_val=1):
    """Solicita un entero al usuario >= min_val."""
    while True:
        try:
            v = int(input(prompt))
            if v < min_val:
                print(f"Debe ser >= {min_val}")
            else:
                return v
        except ValueError:
            print("Entrada inválida, ingresa un entero.")


def main():
    runs = pedir_int("¿Cuántos archivos deseas generar para grafos sparse? ")
    print(f"Generando {runs} archivos...\n")

    for run in range(1, runs + 1):
        filename = f"{OUTPUT_BASE}_run{run}.txt"
        lines = []

        for n in SIZES:
            graph = generate_sparse_graph(n, max_edges_per_node=MAX_EDGES)
            _, matrix = build_adjacency_matrix(graph)

            # Resumen
            degs = [len(graph[k]) for k in graph]
            m_avg = sum(degs) / n
            total_edges = sum(degs) // 2
            lines.append(f"El grafo generado contiene {n} nodos, en donde cada nodo tiene en promedio {m_avg:.2f} conexiones, formando una cantidad de {total_edges} conexiones.")

            # Aproximado
            resp_approx = post_json(API_URL_APPROX, {'grafo': graph})
            if resp_approx and 'backtracking' in resp_approx:
                b = resp_approx['backtracking']
                approx = {k: b.get(k) for k in ('colores_usados','tiempo','llamadas','backtracks')}
            else:
                print(f"n={n}: error en endpoint aproximado")
                approx = {k: None for k in ('colores_usados','tiempo','llamadas','backtracks')}
            lines.append(f"resultado aproximado -> {json.dumps(approx, ensure_ascii=False)}")

            # Exacto
            resp_exact = post_json(API_URL_EXACT, {'matriz': matrix})
            if resp_exact and 'backtracking' in resp_exact:
                b2 = resp_exact['backtracking']
                exact = {k: b2.get(k) for k in ('colores_usados','tiempo','llamadas','backtracks')}
            else:
                print(f"n={n}: error en endpoint exacto")
                exact = {k: None for k in ('colores_usados','tiempo','llamadas','backtracks')}
            lines.append(f"resultado exacto   -> {json.dumps(exact, ensure_ascii=False)}")

            lines.append("")
            print(f"Run {run}: nodos {n} procesado")

        with open(filename, 'w', encoding='utf-8') as f:
            f.write("\n".join(lines))
        print(f"Archivo '{filename}' generado.\n")

if __name__ == '__main__':
    main()
