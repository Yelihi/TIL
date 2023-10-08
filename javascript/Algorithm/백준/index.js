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
const input = fs.readFileSync("/dev/stdin").toString().trim().split(/\s+/);
const [n, ...arr] = input;

const range = Number(n);

let max = "";
let min = "";

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
