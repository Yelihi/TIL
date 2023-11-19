const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);
const [n, ...arr] = input;

const N = Number(n);
const Land = arr.map((row) => row.split(" ").map((v) => Number(v)));
let visited;
let answer = Number.MIN_SAFE_INTEGER;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function bfs(y, x, level) {
  visited[y][x] = 1;
  const queue = [[y, x]];
  while (queue.length) {
    const [y1, x1] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = x1 + dx[i];
      const ny = y1 + dy[i];
      if (nx < 0 || ny < 0 || nx >= N || ny >= N || visited[ny][nx]) continue;
      if (Land[ny][nx] > level) {
        visited[ny][nx] = 1;
        queue.push([ny, nx]);
      }
    }
  }
}

for (let i = 0; i < 101; i++) {
  let cnt = 0;
  visited = Array.from(Array(N), () => new Array(N).fill(0));

  for (let k = 0; k < N; k++) {
    for (let j = 0; j < N; j++) {
      if (Land[k][j] > i && visited[k][j] == 0) {
        bfs(k, j, i);
        cnt++;
      }
    }
  }

  answer = Math.max(cnt, answer);
}

console.log(answer);
