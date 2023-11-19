const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split(/\s+/);
const [n, ...arr] = input;

const range = Number(n);

let max = String(Number.MIN_SAFE_INTEGER);
let min = String(Number.MAX_SAFE_INTEGER);

const visited = new Array(10).fill(0);

function DFS(L, prev, result) {
  if (L === range) {
    max = result > max ? result : max;
    min = result < min ? result : min;
    return;
  }

  if (arr[L] === "<") {
    for (let i = prev + 1; i < 10; i++) {
      if (visited[i]) continue;
      visited[i] = 1;
      DFS(L + 1, i, result + i);
      visited[i] = 0;
    }
  } else {
    for (let i = prev - 1; i > -1; i--) {
      if (visited[i]) continue;
      visited[i] = 1;
      DFS(L + 1, i, result + i);
      visited[i] = 0;
    }
  }

  return;
}

for (let i = 0; i < 10; i++) {
  visited[i] = 1;
  DFS(0, i, `${i}`);
  visited[i] = 0;
}

console.log(max);
console.log(min);
