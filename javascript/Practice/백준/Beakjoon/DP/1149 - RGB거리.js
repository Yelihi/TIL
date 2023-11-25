const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);
const iterator = input[Symbol.iterator]();

const N = Number(iterator.next().value);

// 빨강, 초록, 파랑 이라고 하면, 예를 들어 빨강 -> 초록, 파랑 남고 -> 초록하면 빨강, 파랑 이런식으로 진행된다.

// i = 0(빨강), i = 1(초록), i = 2(파랑);

const first = iterator
  .next()
  .value.split(" ")
  .map((v) => Number(v));

const dp = [[], [], []];
dp[0][0] = first[0];
dp[1][0] = first[1];
dp[2][0] = first[2];

for (let i = 1; i < N; i++) {
  const colors = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v));
  dp[0][i] = Math.min(dp[1][i - 1], dp[2][i - 1]) + colors[0];
  dp[1][i] = Math.min(dp[0][i - 1], dp[2][i - 1]) + colors[1];
  dp[2][i] = Math.min(dp[0][i - 1], dp[1][i - 1]) + colors[2];
}

let result = Number.MAX_SAFE_INTEGER;
dp.forEach((arr) => {
  result = Math.min(result, arr[N - 1]);
});
console.log(result);
