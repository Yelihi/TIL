const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);
const [n, ...arr] = input;

const N = Number(n);
const Land = arr.map((row) => row.split("").map((v) => Number(v)));
let visited = Array.from(Array(N), () => new Array(N).fill(0));
let area = 1;
let areaArray = [];
let areaNumber = 0;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function dfs(y, x, visited) {
  visited[y][x] = 1;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx < 0 || ny < 0 || nx >= N || ny >= N || visited[ny][nx]) continue;
    if (Land[ny][nx] == 1) {
      dfs(ny, nx, visited);
      area += 1;
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (Land[i][j] == 1 && visited[i][j] == 0) {
      dfs(i, j, visited);
      areaNumber += 1;
      areaArray.push(area);
      area = 1;
    }
  }
}

const sortedArray = [...areaArray].sort((a, b) => a - b);
console.log(areaNumber);
sortedArray.forEach((v) => console.log(v));
