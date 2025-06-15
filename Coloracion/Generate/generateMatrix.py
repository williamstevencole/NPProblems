import json

def convert_graph_to_adjacency_matrix(graph_data):
    # Extract the graph from the data
    graph = graph_data.get("grafo", {})
    
    # Get all unique nodes
    all_nodes = sorted(list(graph.keys()))
    n = len(all_nodes)
    
    # Create a mapping from node names to indices
    node_to_index = {node: i for i, node in enumerate(all_nodes)}
    
    # Initialize the adjacency matrix with zeros
    matriz = [[0 for _ in range(n)] for _ in range(n)]
    
    # Fill the adjacency matrix based on the graph
    for node, connections in graph.items():
        node_idx = node_to_index[node]
        for connection in connections:
            if connection in node_to_index:  # Check if the connection exists in the node list
                conn_idx = node_to_index[connection]
                matriz[node_idx][conn_idx] = 1
    
    return matriz, all_nodes

# Path to the input graph file
input_file = "grafo15_aleatorio_con_max_9_conexiones.json"

# Load the graph from the JSON file
with open(input_file, "r") as f:
    graph_data = json.load(f)

# Convert the graph to adjacency matrix
matriz, nodes = convert_graph_to_adjacency_matrix(graph_data)

# Prepare the output
output = {
    "matriz": matriz,
    "nodos": nodes
}

# Save the adjacency matrix to a file
output_file = f"matriz_adyacencia_from_graph.json"
with open(output_file, "w") as f:
    json.dump(output, f, indent=2)

print(f"✅ Matriz de adyacencia generada y guardada como '{output_file}'")
