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
const Land = Array.from(Array(N), () => new Array(M).fill(0));
const visited = Array.from(Array(N), () => new Array(M).fill(0));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let cnt = 0;
let answerArray = [];
let answerArea = 1;

function bfs(y, x, visited) {
  visited[y][x] = 1;
  const queue = [[y, x]];
  while (queue.length) {
    const [y1, x1] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = x1 + dx[i];
      const ny = y1 + dy[i];
      if (nx < 0 || ny < 0 || nx >= M || ny >= N || visited[ny][nx]) continue;
      if (Land[ny][nx] == 0) {
        queue.push([ny, nx]);
        visited[ny][nx] = 1;
        answerArea += 1;
      }
    }
  }
}

for (let i = 0; i < K; i++) {
  const [sx, sy, ex, ey] = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v));

  for (let k = sy; k < ey; k++) {
    for (let j = sx; j < ex; j++) {
      Land[k][j] = 1;
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (visited[i][j] == 0 && Land[i][j] == 0) {
      bfs(i, j, visited);
      cnt++;
      answerArray.push(answerArea);
      answerArea = 1;
    }
  }
}

console.log(cnt);
console.log(answerArray.sort((a, b) => a - b).join(" "));
