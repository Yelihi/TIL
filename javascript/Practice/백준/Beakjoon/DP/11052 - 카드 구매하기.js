const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);

const [n, arr] = input;
const N = Number(n);

const cardPrice = arr.split(" ").map((v) => Number(v));

const dp = [];

dp[0] = cardPrice[0];

for (let i = 1; i < N; i++) {
  let maximum = 0;
  for (let j = i - 1; j >= 0; j--) {
    maximum = Math.max(maximum, dp[j] + cardPrice[i - 1 - j]);
  }
  dp[i] = Math.max(cardPrice[i], maximum);
}

console.log(dp[N - 1]);
