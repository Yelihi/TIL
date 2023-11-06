const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim();

const N = Number(input);

const dp = new Array(N + 1).fill(0).map((_, idx) => idx);

for (let i = 1; i <= N; i++) {
  for (let j = 1; j ** 2 <= i; j++) {
    dp[i] = Math.min(dp[i], dp[i - j ** 2] + 1);
  }
}

console.log(dp[N]);
