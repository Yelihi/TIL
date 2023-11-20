const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim();

const N = Number(input);

const dp = [];
const answer = [];

answer[0] = N;

dp[0] = 0;
dp[1] = 0;
dp[2] = 1;
dp[3] = 1;

for (let i = 4; i <= N; i++) {
  if (i % 3 == 0 && i % 2 == 0) {
    dp[i] = Math.min(dp[i / 3], dp[i / 2], dp[i - 1]) + 1;
  } else if (i % 3 == 0) {
    dp[i] = Math.min(dp[i / 3], dp[i - 1]) + 1;
  } else if (i % 2 == 0) {
    dp[i] = Math.min(dp[i / 2], dp[i - 1]) + 1;
  } else {
    dp[i] = dp[i - 1] + 1;
  }
}

let backTrack = N;

while (backTrack !== 1) {
  const map = new Map();
  if (backTrack % 3 === 0 && backTrack % 2 === 0) {
    map.set(backTrack / 3, dp[backTrack / 3]);
    map.set(backTrack / 2, dp[backTrack / 2]);
    map.set(backTrack - 1, dp[backTrack - 1]);
    const min = Math.min(
      map.get(backTrack / 3),
      map.get(backTrack / 2),
      map.get(backTrack - 1)
    );
    for (const [key, value] of map.entries()) {
      if (min === value) {
        answer.push(key);
        backTrack = key;
        break;
      }
    }
  } else if (backTrack % 3 === 0) {
    map.set(backTrack / 3, dp[backTrack / 3]);
    map.set(backTrack - 1, dp[backTrack - 1]);
    const min = Math.min(map.get(backTrack / 3), map.get(backTrack - 1));
    for (const [key, value] of map.entries()) {
      if (min === value) {
        answer.push(key);
        backTrack = key;
        break;
      }
    }
  } else if (backTrack % 2 === 0) {
    map.set(backTrack / 2, dp[backTrack / 2]);
    map.set(backTrack - 1, dp[backTrack - 1]);
    const min = Math.min(map.get(backTrack / 2), map.get(backTrack - 1));
    for (const [key, value] of map.entries()) {
      if (min === value) {
        answer.push(key);
        backTrack = key;
        break;
      }
    }
  } else {
    answer.push(backTrack - 1);
    backTrack = backTrack - 1;
  }
}
console.log(dp[N]);
console.log(answer.join(" "));
