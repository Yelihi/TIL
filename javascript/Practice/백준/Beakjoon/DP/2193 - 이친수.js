const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/index.txt")
  .toString()
  .trim();

const N = Number(input);

dp = [];

dp[1] = 1;
dp[2] = 1; // 10
dp[3] = 2; // 100, 101

// 파보나치 수열은 49번째항을 넘어가면 js 의 number 범위를 초과하기에 BigInt 를 써주자
for (let i = 3; i <= 90; i++) {
  dp[i] = BigInt(dp[i - 1]) + BigInt(dp[i - 2]);
}

// BigInt 는 뒤에 n 이라는 것이 붙기에 String 으로 변경해주자
console.log(String(dp[N]));
