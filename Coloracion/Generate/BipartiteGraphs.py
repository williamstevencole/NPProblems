#!/usr/bin/env python3
import json
import urllib.request
import urllib.error
from generateJSON import generate_bipartite_graph, build_adjacency_matrix

API_URL_APPROX = 'http://127.0.0.1:5000/api/coloracion-backtracking'
API_URL_EXACT  = 'http://127.0.0.1:5000/api/coloracion-backtracking-gfg'

# Tamaños de grafos bipartitos (n1 = n2 = n)
SIZES      = [10, 50, 100, 250, 300, 350, 400, 450, 460, 470, 480, 490,  491, 495, 500 ]
EDGE_PROB  = 0.5
COMPLETE   = False
OUTPUT_BASE = 'bipartite_graph_results'


def post_json(url, payload):
    """Envía POST con JSON y devuelve la respuesta como dict o None."""
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
    runs = pedir_int("¿Cuántos archivos deseas generar para grafos bipartitos? ")
    print(f"Generando {runs} archivos...\n")

    for run in range(1, runs + 1):
        filename = f"{OUTPUT_BASE}_run{run}.txt"
        lines = []

        for n in SIZES:
            # Generar grafo bipartito y su matriz
            graph = generate_bipartite_graph(n, n, edge_prob=EDGE_PROB, complete=COMPLETE)
            _, matrix = build_adjacency_matrix(graph)

            # Calcular grados y conexiones totales
            degrees = [len(neigh) for neigh in graph.values()]
            avg_deg = sum(degrees) / len(degrees)
            total_edges = sum(degrees) // 2
            lines.append(
                f"El grafo generado contiene {2*n} nodos, "
                f"en donde cada nodo tiene en promedio {avg_deg:.2f} conexiones, "
                f"formando una cantidad de {total_edges} conexiones."
            )

            # Llamada aproximada (lista de adyacencia)
            resp_a = post_json(API_URL_APPROX, {'grafo': graph})
            if resp_a and 'backtracking' in resp_a:
                b = resp_a['backtracking']
                approx = {
                    'colores_usados': b.get('colores_usados'),
                    'tiempo_ms':      b.get('tiempo'),
                    'llamadas':       b.get('llamadas'),
                    'backtracks':     b.get('backtracks')
                }
            else:
                print(f"n={n}: error en endpoint aproximado")
                approx = {'colores_usados': None, 'tiempo_ms': None, 'llamadas': None, 'backtracks': None}
            lines.append(f"resultado aproximado -> {json.dumps(approx, ensure_ascii=False)}")

            # Llamada exacta (matriz de adyacencia)
            resp_e = post_json(API_URL_EXACT, {'matriz': matrix})
            if resp_e and 'backtracking' in resp_e:
                e = resp_e['backtracking']
                exact = {
                    'colores_usados': e.get('colores_usados'),
                    'tiempo_ms':      e.get('tiempo'),
                    'llamadas':       e.get('llamadas'),
                    'backtracks':     e.get('backtracks')
                }
            else:
                print(f"n={n}: error en endpoint exacto")
                exact = {'colores_usados': None, 'tiempo_ms': None, 'llamadas': None, 'backtracks': None}
            lines.append(f"resultado exacto   -> {json.dumps(exact, ensure_ascii=False)}")

            lines.append("")  # Separador
            print(f"Run {run}: procesado bipartito n={n}")

        # Escribir archivo de resultados
        with open(filename, 'w', encoding='utf-8') as f:
            f.write("\n".join(lines))
        print(f"Archivo '{filename}' generado con {len(SIZES)} grafos bipartitos.\n")

if __name__ == '__main__':
    main()




