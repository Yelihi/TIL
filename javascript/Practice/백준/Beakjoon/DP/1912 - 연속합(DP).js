const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);

const [n, arr] = input;

const N = Number(n);
const NumberArray = arr.split(" ").map((v) => Number(v));

const dp = [];

dp[0] = NumberArray[0];

for (let i = 1; i < N; i++) {
  dp[i] = Math.max(dp[i - 1] + NumberArray[i], NumberArray[i]);
}

console.log(Math.max(...dp));
