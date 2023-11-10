const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);
const [n, hp, happy] = input;

const N = Number(n);
const deleteHp = hp.split(" ").map((v) => Number(v));
const plusHappy = happy.split(" ").map((v) => Number(v));

const dp = Array.from(Array(N + 1), () => new Array(101).fill(0));

// P[i, w] 란 i개의 보석이 있고, 배낭의 무게 한도가 w 일 때 최적의 이익을 의미한다.
// - i번째 보석이 배낭의 무게 한도보다 무거우면 넣을 수 없으므로 i번째 보석을 뺀 i - 1 개의 보석들을 가지고 구한 전 단계의 최적값을 그대로 가져온다
// - 그렇지 않은 경우, i 번째 보석을 위해 i번째의 보석만큼의 무게를 비웠을 때의 최적값에 i번째 보석의 가격을 더한 값 or i - 1개의 보석들을 가지고 구한 전 단계의 최적값 중 큰 것을 선택한다.
// https://gsmesie692.tistory.com/113?category=523232

for (let i = 0; i < N + 1; i++) {
  for (let j = 0; j < 101; j++) {
    if (i == 0 || j == 0) {
      dp[i][j] = 0;
    } else if (deleteHp[i - 1] <= j) {
      dp[i][j] = Math.max(
        dp[i - 1][j],
        dp[i - 1][j - deleteHp[i - 1]] + plusHappy[i - 1]
      );
    } else {
      dp[i][j] = dp[i - 1][j];
    }
  }
}

console.log(dp[N][99]);
