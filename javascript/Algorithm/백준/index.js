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
const N = Number(iterator.next().value);

for (let i = 0; i < N; i++) {
  const row = Number(iterator.next().value);

  const top = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v));
  const bottom = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v));

  const dp = Array.from(Array(3), () => []);

  dp[0][0] = top[0];
  dp[1][0] = bottom[0];
  dp[2][0] = 0;

  for (let j = 1; j < row; j++) {
    dp[0][j] = Math.max(dp[1][j - 1], dp[2][j - 1]) + top[j];
    dp[1][j] = Math.max(dp[0][j - 1], dp[2][j - 1]) + bottom[j];
    dp[2][j] = Math.max(dp[0][j - 1], dp[1][j - 1]);
  }

  console.log(Math.max(dp[0][row - 1], dp[1][row - 1], dp[2][row - 1]));
}
