const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);

const iterator = input[Symbol.iterator]();

const K = Number(iterator.next().value);

const dp = Array.from(Array(3), () => []);

let Land;

for (let i = 0; i < K; i++) {
  const row = Number(iterator.next().value);
  Land = Array.from(Array(2), () =>
    iterator
      .next()
      .value.split(" ")
      .map((v) => Number(v))
  );

  dp[0][0] = Land[0][0];
  dp[1][0] = Land[1][0];
  dp[2][0] = 0;

  for (let i = 1; i < row; i++) {
    dp[0][i] = Math.max(dp[1][i - 1], dp[2][i - 1]) + Land[0][i];
    dp[1][i] = Math.max(dp[0][i - 1], dp[2][i - 1]) + Land[1][i];
    dp[2][i] = Math.max(dp[0][i - 1], dp[1][i - 1]);
  }

  console.log(Math.max(dp[0][row - 1], dp[1][row - 1], dp[2][row - 1]));
}
