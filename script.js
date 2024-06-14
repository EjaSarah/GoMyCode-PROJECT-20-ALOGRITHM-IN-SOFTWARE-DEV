class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push(element);
        } else {
            let added = false;
            for (let i = 0; i < this.collection.length; i++) {
                if (element[1] < this.collection[i][1]) { // checking priorities
                    this.collection.splice(i, 0, element);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element);
            }
        }
    }

    dequeue() {
        return this.collection.shift();
    }

    isEmpty() {
        return (this.collection.length === 0);
    }
}

function dijkstra(graph, start) {
    const distances = {};
    const pq = new PriorityQueue();
    const visited = new Set();

    // Initialize distances and priority queue
    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;
    pq.enqueue([start, 0]);

    while (!pq.isEmpty()) {
        const [currentVertex, currentDistance] = pq.dequeue();

        if (!visited.has(currentVertex)) {
            visited.add(currentVertex);

            for (let neighbor in graph[currentVertex]) {
                const distance = graph[currentVertex][neighbor];
                const newDistance = currentDistance + distance;

                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    pq.enqueue([neighbor, newDistance]);
                }
            }
        }
    }

    return distances;
}

// Example usage:
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

console.log(dijkstra(graph, 'A')); 