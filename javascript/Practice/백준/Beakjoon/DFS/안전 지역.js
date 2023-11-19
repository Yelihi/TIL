const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split(/\n/);
const [n, ...arr] = input;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const N = Number(n);
let visited;
const Land = arr.map((row) =>
  row.split(" ").map((cell) => {
    const number = Number(cell);
    return number;
  })
);

function dfs(x, y, visited, land, level) {
  visited[x][y] = 1;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx < 0 || ny < 0 || nx >= N || ny >= N || visited[nx][ny]) continue;
    if (land[nx][ny] > level) {
      dfs(nx, ny, visited, land, level);
    }
  }
}
let answer = 0;
// 반복을 돌려주면서 물의 높이를 계속 변경해주자
for (let i = 0; i <= 100; i++) {
  visited = Array.from(Array(N), () => new Array(N).fill(0));
  let cnt = 0;
  for (let k = 0; k < N; k++) {
    for (let j = 0; j < N; j++) {
      if (Land[k][j] > i && visited[k][j] === 0) {
        dfs(k, j, visited, Land, i);
        cnt++;
      }
    }
  }
  answer = Math.max(cnt, answer);
}

console.log(answer);
