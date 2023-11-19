const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);
const iterator = input[Symbol.iterator]();

const [N, M, V] = iterator
  .next()
  .value.split(" ")
  .map((n) => Number(n));
const graph = Array.from(Array(N + 1), () => []);
let visited;
const dfs = [];
const bfs = [];

for (let i = 0; i < M; i++) {
  const [v1, v2] = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v));
  graph[v1].push(v2);
  graph[v2].push(v1);
  graph[v1].sort((a, b) => a - b);
  graph[v2].sort((a, b) => a - b);
}

visited = new Array(N + 1).fill(0);

function DFS(start, visited) {
  dfs.push(start);
  visited[start] = 1;
  const arr = graph[start];
  arr.forEach((num) => {
    if (!visited[num]) {
      DFS(num, visited);
    }
  });
}

DFS(V, visited);

visited = new Array(N + 1).fill(0);

function BFS(start) {
  bfs.push(start);
  const queue = [start];
  visited[start] = 1;
  while (queue.length > 0) {
    const vertex = queue.shift();
    const arr = graph[vertex];
    arr.forEach((num) => {
      if (!visited[num]) {
        visited[num] = 1;
        queue.push(num);
        bfs.push(num);
      }
    });
  }
}

BFS(V);
console.log(dfs.join(" "));
console.log(bfs.join(" "));
