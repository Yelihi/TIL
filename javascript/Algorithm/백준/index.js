// 백준에 바꿔서 입력할 버전
// let input = require("fs").readFileSync("/dev/stdin").toString().split(" ");

// 하나의 값을 받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim();

// 한 줄에 공백으로 값이 들어올 때
// let input = require("fs")
//   .readFileSync("example.txt")
//   .toString()
//   .trim()
//   .split("\n");

// 한줄에 하나씩 값이 들어올 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split("\n");

// 첫 번째 줄에 자연수 n 을 받고, 그 다음 줄에 공백으로 구분된 n개의 값들을 입력받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split(/\s+/);
// const [n, ...arr] = input;

// 첫 번째 줄에 자연수 n을 입력받고, 그 다음줄에 n개의 줄에 걸쳐 한 줄에 하나의 값을 입력받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split('\n');
// const [n, ...arr] = input;

// 디 버그 할때 : node index

// 급할때 사용하는 버전

const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/index.txt")
  .toString()
  .trim()
  .split(/\n/);
const iterator = input[Symbol.iterator]();

const T = Number(iterator.next().value);

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let visited, N, M, K, graph;

for (let i = 0; i < T; i++) {
  [N, M, K] = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v));
  graph = Array.from(Array(N), () => new Array(M).fill(0));
  visited = Array.from(Array(N), () => new Array(M).fill(0));

  for (let j = 0; j < K; j++) {
    const [y, x] = iterator
      .next()
      .value.split(" ")
      .map((v) => Number(v));
    graph[y][x] = 1;
  }

  let cnt = 0;
  for (let a = 0; a < N; a++) {
    for (let b = 0; b < M; b++) {
      if (graph[a][b] == 1 && visited[a][b] == 0) {
        dfs(a, b, visited);
        cnt++;
      }
    }
  }
  console.log(cnt);
}

function dfs(y, x, visited) {
  visited[y][x] = 1;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx < 0 || ny < 0 || nx >= M || ny >= N || visited[ny][nx]) continue;
    if (graph[ny][nx] == 1) {
      dfs(ny, nx, visited);
    }
  }
}
