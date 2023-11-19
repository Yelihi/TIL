const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);

const [size, ...arr] = input;
const [N, M] = size.split(" ").map((v) => Number(v));

const miro = arr.map((row) => row.split("").map((cell) => Number(cell)));
const visited = Array.from(Array(N), () => new Array(M).fill(0));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function bfs(y, x) {
  visited[y][x] = 1;
  const queue = [[y, x]];
  while (queue.length) {
    const [y1, x1] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = x1 + dx[i];
      const ny = y1 + dy[i];
      if (nx < 0 || ny < 0 || nx >= M || ny >= N || visited[ny][nx]) continue;
      if (miro[ny][nx] == 1) {
        miro[ny][nx] += miro[y1][x1];
        queue.push([ny, nx]);
        visited[ny][nx] = 1;
      }
    }
  }

  return miro[N - 1][M - 1];
}

const answer = bfs(0, 0);

console.log(answer);
