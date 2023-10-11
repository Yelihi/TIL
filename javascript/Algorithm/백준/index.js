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

const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/index.txt")
  .toString()
  .trim()
  .split("\n");

const iterator = input[Symbol.iterator]();

let M, N, K;
let graph, visited, cnt;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let rotate = iterator.next().value;

function dfs(x, y) {
  visited[x][y] = 1;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx < 0 || ny < 0 || nx >= M || ny >= N || visited[nx][ny]) continue;
    if (graph[nx][ny] === 1) {
      dfs(nx, ny);
    }
  }
}

for (let i = 0; i < rotate; i++) {
  // M, N, K 입력받기
  [M, N, K] = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v));
  // graph, visited 초기값 생성하기
  graph = Array.from(Array(M), () => new Array(N).fill(0));
  visited = Array.from(Array(M), () => new Array(N).fill(0));

  // 순차적으로 입력값 받아 배추 심기
  for (let i = 0; i < K; i++) {
    const [x, y] = iterator
      .next()
      .value.split(" ")
      .map((v) => Number(v));
    graph[x][y] = 1;
  }

  cnt = 0;
  // dfs 를 통해 전체 graph 를 순회하며, dfs를 실행 (dfs 실행 시 cnt 1씩 증가)
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][j] == 1 && !visited[i][j]) {
        dfs(i, j);
        cnt++;
      }
    }
  }

  console.log(cnt);
}
