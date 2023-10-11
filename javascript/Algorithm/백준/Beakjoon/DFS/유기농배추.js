const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);

const iterator = input[Symbol.iterator]();
let M,
  N,
  K = 0;
let graph;
let cnt;
let visited;
const number = iterator.next();

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

for (let i = 0; i < number.value; i++) {
  [M, N, K] = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v));
  graph = Array.from(Array(M), () => new Array(N).fill(0));
  visited = Array.from(Array(M), () => new Array(N).fill(0));

  for (let i = 0; i < K; i++) {
    let [x, y] = iterator
      .next()
      .value.split(" ")
      .map((v) => Number(v));
    graph[x][y] = 1;
  }

  cnt = 0;
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][j] == 1 && visited[i][j] == 0) {
        dfs(i, j);
        cnt++;
      }
    }
  }

  console.log(cnt);
}

function dfs(x, y) {
  visited[x][y] = 1;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx < 0 || ny < 0 || nx >= M || ny >= N || visited[nx][ny] === 1)
      continue;
    if (graph[nx][ny] === 1) {
      dfs(nx, ny);
    }
  }
}
