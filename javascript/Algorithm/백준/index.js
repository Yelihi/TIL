// 백준에 바꿔서 입력할 버전
// let input = require("fs").readFileSync("/dev/stdin").toString().split(" ");

// 하나의 값을 받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim();

// 한 줄에 공백으로 값이 들어올 때
// let input = require("fs")
//   .readFileSync("example.txt")
//   .toString()
//   .trim()
//   .split("\n");

// 한줄에 하나씩 값이 들어올 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split("\n");

// 첫 번째 줄에 자연수 n 을 받고, 그 다음 줄에 공백으로 구분된 n개의 값들을 입력받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split(/\s+/);
// const [n, ...arr] = input;

// 첫 번째 줄에 자연수 n을 입력받고, 그 다음줄에 n개의 줄에 걸쳐 한 줄에 하나의 값을 입력받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split('\n');
// const [n, ...arr] = input;

// 디 버그 할때 : node index

// 급할때 사용하는 버전

const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/index.txt")
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
