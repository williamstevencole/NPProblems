#include <ctime>
#include <iostream>
#include <cstdlib>
using namespace std;

void merge(int arr[], int izq, int centro, int der) {
    int n1 = centro - izq + 1;  
    int n2 = der - centro;    

    int* L = new int[n1];
    int* R = new int[n2];

    for (int i = 0; i < n1; i++)
        L[i] = arr[izq + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[centro + 1 + j];

    int i = 0, j = 0, k = izq;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j])
            arr[k++] = L[i++];
        else
            arr[k++] = R[j++];
    }

    while (i < n1)
        arr[k++] = L[i++];
    while (j < n2)
        arr[k++] = R[j++];

    delete[] L;
    delete[] R;
}

void merge_sort(int arr[], int izq, int der) {
    if (izq < der) {
        int centro = izq + (der - izq) / 2;

        merge_sort(arr, izq, centro);   
        merge_sort(arr, centro + 1, der); 
        merge(arr, izq, centro, der);  
    }
}

int main() {
    srand(time(0));

    int arr[500000];
    int n = sizeof(arr) / sizeof(arr[0]);

    for (int i = 0; i < n; i++) {
        arr[i] = rand() % 101;
    }

    clock_t start = clock();
    merge_sort(arr, 0, n - 1);

/*

    cout << "\nResultado:\n";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << "-";
    }
   */

    clock_t end = clock();
    double time_taken = double(end - start) / CLOCKS_PER_SEC;
   cout << "\nN es igual a: "<<n<<"\nTiempo de ejecucion: " << time_taken << " segundos" << endl;

    return 0;
}
