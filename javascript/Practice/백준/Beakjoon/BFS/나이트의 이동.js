const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);
const iterator = input[Symbol.iterator]();

const N = Number(iterator.next().value);
let visited, Land;
let I, start, end;
let cnt = 0;

const dx = [-2, -1, 1, 2, -2, -1, 1, 2];
const dy = [1, 2, 2, 1, -1, -2, -2, -1];

function bfs(start, end, Land) {
  const [ey, ex] = end;
  const [y, x] = start;
  if (y == ey && x == ex) return 0;
  visited[y][x] = 1;
  const queue = [[y, x]];
  while (queue.length) {
    const [y1, x1] = queue.shift();
    for (let i = 0; i < 8; i++) {
      const nx = x1 + dx[i];
      const ny = y1 + dy[i];
      if (nx < 0 || ny < 0 || nx >= I || ny >= I || visited[ny][nx]) continue;
      if (nx == ex && ny == ey) {
        Land[ny][nx] += Land[y1][x1];
        return Land[ey][ex];
      } else {
        Land[ny][nx] += Land[y1][x1];
        queue.push([ny, nx]);
        visited[ny][nx] = 1;
      }
    }
  }
  return Land[ey][ex];
}

for (let i = 0; i < N; i++) {
  I = Number(iterator.next().value);
  start = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v));
  end = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v));

  visited = Array.from(Array(I), () => new Array(I).fill(0));
  Land = Array.from(Array(I), () => new Array(I).fill(1));
  cnt = bfs(start, end, Land);
  cnt === 0 ? console.log(0) : console.log(cnt - 1);
  cnt = 0;
}
