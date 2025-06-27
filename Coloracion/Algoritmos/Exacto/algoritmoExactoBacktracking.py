V = 4 # Number of vertices

def print_solution(color):
    print("Solution Exists: Following are the assigned colors") # -> c 
    print(" ".join(map(str, color))) # -> n (itera sobre todos los colores)

def is_safe(v, graph, color, c):
    for i in range(V): #->
        if graph[v][i] and c == color[i]: # -> c
            return False # -> c
    return True # -> c

def graph_coloring_util(graph, m, color, v):
    # Base case: If all vertices are assigned a color, return true
    if v == V:
        return True

    # Try different colors for the current vertex 'v'
    for c in range(1, m + 1):
        # Check if assignment of color 'c' to 'v' is fine
        if is_safe(v, graph, color, c):
            color[v] = c

            # Recur to assign colors to the rest of the vertices
            if graph_coloring_util(graph, m, color, v + 1):
                return True

            # If assigning color 'c' doesn't lead to a solution, remove it
            color[v] = 0

    # If no color can be assigned to this vertex, return false
    return False

def graph_coloring(graph, m):
    color = [0] * V 

    # Call graph_coloring_util() for vertex 0
    if not graph_coloring_util(graph, m, color, 0):
        print("Solution does not exist")
        return False

    # Print the solution
    print_solution(color)
    return True

# Driver code
if __name__ == "__main__":
    graph = [
        [0, 1, 1, 1],
        [1, 0, 1, 0],
        [1, 1, 0, 1],
        [1, 0, 1, 0],
    ]

    m = 3 # Number of colors

    # Function call
    graph_coloring(graph, m)
    
    #This code is contrubting by Raja Ramakrishna