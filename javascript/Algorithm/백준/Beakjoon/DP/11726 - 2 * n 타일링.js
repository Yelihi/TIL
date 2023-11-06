const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim();

const N = Number(input);

const dp = [];

dp[1] = 1;
dp[2] = 2;
dp[3] = 3;

for (let i = 3; i <= N; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
}

console.log(dp[N]);
