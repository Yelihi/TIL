const fs = require("fs");
let input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\s+/);
const [n, ...arr] = input;

const dp = [];
const numArr = arr.map((v) => Number(v));

dp[0] = numArr[0];

for (let i = 1; i < Number(n); i++) {
  dp[i] = Math.max(dp[i - 1] + numArr[i], numArr[i]);
}

const result = Math.max(...dp);

console.log(result);
