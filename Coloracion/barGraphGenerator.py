import matplotlib.pyplot as plt
import numpy as np
import statistics

def graficar_tiempos_por_tipo_grafo(datos, titulo):
    import matplotlib.pyplot as plt
    import numpy as np
    import statistics

    sizes = []
    approx_median = []
    exact_median = []

    for nodo in sorted(datos.keys()):
        aprox_tiempos = datos[nodo]['aproximado']
        exact_tiempos = datos[nodo]['exacto']

        # Solo agregar si al menos una de las dos listas tiene datos válidos
        if aprox_tiempos and any(t > 0 for t in aprox_tiempos):
            sizes.append(nodo)
            approx_median.append(statistics.median([t for t in aprox_tiempos if t > 0]))
        else:
            sizes.append(nodo)
            approx_median.append(0)

        if exact_tiempos and any(t > 0 for t in exact_tiempos):
            exact_median.append(statistics.median([t for t in exact_tiempos if t > 0]))
        else:
            exact_median.append(0)

    x = np.arange(len(sizes))
    width = 0.35

    fig, ax = plt.subplots(figsize=(10, 6))
    ax.bar(x - width/2, approx_median, width, label='Aproximado')
    ax.bar(x + width/2, exact_median, width, label='Exacto')

    ax.set_xlabel('Número de vértices')
    ax.set_ylabel('Mediana del tiempo (s)')
    ax.set_title(titulo)
    ax.set_xticks(x)
    ax.set_xticklabels(sizes)
    ax.legend()
    ax.grid(True, linestyle='--', alpha=0.5)
    plt.tight_layout()
    plt.show()


# Ejemplo de uso con grafos completos
datos_dispersion = {
    10: {
        'aproximado': [
            0.00002503395080566406,
            0.00001001358032226562,
            0.00000786781311035156
        ],
        'exacto': [
            0.00001788139343261719,
            0.00000691413879394531,
            0.00000619888305664062
        ]
    },
    500: {
        'aproximado': [
            0.0006060600280761719,
            0.0003778934478759766,
            0.00040793418884277344
        ],
        'exacto': [
            0.0069031715393066410,
            0.0059750080108642580,
            0.0060491561889648440
        ]
    },
    981: {
        'aproximado': [
            0.0008099079132080078,
            0.0007569789886474609,
            0.0007569789886474609
        ],
        'exacto': [
            0.0240271091461181640,
            0.0242028236389160160,
            0.0241241455078125000
        ]
    },
    982: {
        'aproximado': [],
        'exacto': [
            0.0239739418029785160,
            0.0240259170532226560,
            0.0240011215209960940
        ]
    },
    983: {
        'aproximado': [],
        'exacto': []
    }
}




graficar_tiempos_por_tipo_grafo(datos_dispersion, "Tiempo de ejecución (mediana) - Grafos No Densos")
