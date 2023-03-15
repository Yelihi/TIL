class UndirectedGraph {
  constructor() {
    this.edges = {};
  }

  addVertex(vertex) {
    this.edges[vertex] = {};
  }

  addEdge(vertex1, vertex2, weight) {
    if (weight === undefined) {
      weight = 0;
    }
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight;
  }

  removeEdge(vertex1, vertex2) {
    if (this.edges[vertex1] && this.edges[vertex1][vertex2] !== undefined) {
      delete this.edges[vertex1][vertex2];
    }

    if (this.edges[vertex2] && this.edges[vertex2][vertex1] !== undefined) {
      delete this.edges[vertex2][vertex1];
    }
  }

  removeVertex(vertex) {
    for (let adjacentVertex in this.edges[vertex]) {
      this.removeEdge(adjacentVertex, vertex);
    }
    delete this.edges[vertex];
  }

  BFS(vertex, fn) {
    let queue = [];
    let visited = {};

    queue.push(vertex);

    while (queue.length) {
      vertex = queue.shift();
      if (!visited[vertex]) {
        visited[vertex] = true;
        fn(vertex);
        for (let adjacentVertex in this.edges[vertex]) {
          queue.push(adjacentVertex);
        }
      }
    }
  }

  traverseDFS(vertex, fn) {
    let visited = {};
    this._traverseDFS(vertex, visited, fn);
  }

  _traverseDFS(vertex, visited, fn) {
    visited[vertex] = true;
    fn(vertex);
    for (let adjacentVertex in this.edges[vertex]) {
      if (!visited[adjacentVertex]) {
        this._traverseDFS(adjacentVertex, visited, fn);
      }
    }
  }
}

let graph1 = new UndirectedGraph();
graph1.addVertex(1);
graph1.addVertex(2);
graph1.addEdge(1, 2, 1);
graph1.addVertex(3);
graph1.addVertex(4);
graph1.addVertex(5);
graph1.addEdge(2, 3, 8);
graph1.addEdge(3, 4, 10);
graph1.addEdge(4, 5, 100);
graph1.addEdge(1, 5, 88);
graph1.BFS(1, (vertex) => console.log(vertex));
