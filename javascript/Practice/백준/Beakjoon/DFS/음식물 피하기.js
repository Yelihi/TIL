const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);
const iterator = input[Symbol.iterator]();

const [N, M, K] = iterator
  .next()
  .value.split(" ")
  .map((v) => Number(v));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let Load = Array.from(Array(N), () => new Array(M).fill(0));
let visited = Array.from(Array(N), () => new Array(M).fill(0));

for (let i = 0; i < K; i++) {
  const [y, x] = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v) - 1);
  Load[y][x] = 1;
}

let sum = 1;
function dfs(y, x, visited) {
  visited[y][x] = 1;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx < 0 || ny < 0 || nx >= M || ny >= N || visited[ny][nx]) continue;
    if (Load[ny][nx]) {
      sum += 1;
      dfs(ny, nx, visited);
    }
  }
  return Load[y][x];
}

let answer = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (Load[i][j] == 1 && visited[i][j] === 0) {
      dfs(i, j, visited);
      answer = Math.max(sum, answer);
      sum = 1;
    }
  }
}

console.log(answer);
