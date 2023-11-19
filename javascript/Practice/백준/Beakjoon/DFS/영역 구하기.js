const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);
const iterator = input[Symbol.iterator]();

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const [M, N, K] = iterator
  .next()
  .value.split(" ")
  .map((v) => Number(v));
const visited = Array.from(Array(M), () => new Array(N).fill(0));
const graph = Array.from(Array(M), () => new Array(N).fill(0));

let cnt = 1;
const areaArray = [];
let areaNumber = 0;

function dfs(y, x, visited) {
  visited[y][x] = 1;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx < 0 || ny < 0 || nx >= N || ny >= M || visited[ny][nx]) continue;
    if (graph[ny][nx] === 0) {
      dfs(ny, nx, visited);
      cnt++;
    }
  }
}

for (let k = 0; k < K; k++) {
  const [x1, y1, x2, y2] = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v));
  for (let i = y1; i < y2; i++) {
    for (let j = x1; j < x2; j++) {
      graph[i][j] = 1;
    }
  }
}

for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (graph[i][j] == 0 && visited[i][j] == 0) {
      dfs(i, j, visited);
      areaNumber += 1;
      areaArray.push(cnt);
      cnt = 1;
    }
  }
}
areaArray.sort((a, b) => a - b);

console.log(areaNumber);
console.log(areaArray.join(" "));
