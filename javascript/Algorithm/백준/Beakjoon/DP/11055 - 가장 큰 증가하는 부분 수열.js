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
for (let num of dp) {
  if (num > answer) {
    answer = num;
  }
}

console.log(answer);
