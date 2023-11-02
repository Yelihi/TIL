const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/index.txt")
  .toString()
  .trim();

const N = Number(input);

dp = [];

dp[1] = 0;
dp[2] = 1;
dp[3] = 1;

for (let i = 4; i <= N; i++) {
  if (i % 3 == 0 && i % 2 == 0) {
    dp[i] = Math.min(dp[i / 3] + 1, dp[i - 1] + 1, dp[i / 2] + 1);
  } else if (i % 3 == 0) {
    dp[i] = Math.min(dp[i / 3] + 1, dp[i - 1] + 1);
  } else if (i % 2 == 0) {
    dp[i] = Math.min(dp[i / 2] + 1, dp[i - 1] + 1);
  } else {
    dp[i] = dp[i - 1] + 1;
  }
}

console.log(dp[N]);
