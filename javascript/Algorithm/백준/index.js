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

const [n, arr] = input;
const N = Number(n);
const NumberArray = arr.split(" ").map((v) => Number(v));

const dp = [];

dp[0] = NumberArray[0];

for (let i = 1; i < N; i++) {
  let Sum = 0;
  let j = i - 1;
  while (j >= 0) {
    if (NumberArray[j] < NumberArray[i]) {
      Sum = Math.max(Sum, dp[j]);
    }
    j--;
  }
  dp[i] = NumberArray[i] + Sum;
}

let answer = 0;
for (const num of dp) {
  answer = Math.max(answer, num);
}

console.log(answer);
