const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim();

const N = Number(input);

// 근거도 없이 피보나치니 뭐니 하고 있으니 틀리는 것이다.
const dp = new Array(10).fill(1);
dp[0] = 0;

for (let i = 1; i < N; i++) {
  let copyDp = [...dp];
  for (let j = 0; j < 10; j++) {
    if (j === 0) {
      dp[j] = copyDp[j + 1] % 1000000000;
    } else if (j === 9) {
      dp[j] = copyDp[j - 1] % 1000000000;
    } else {
      dp[j] = (copyDp[j - 1] + copyDp[j + 1]) % 1000000000;
    }
  }
}

console.log(dp.reduce((a, b) => (a + b) % 1000000000, 0));
