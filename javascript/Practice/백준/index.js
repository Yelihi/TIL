// 백준에 바꿔서 입력할 버전
// let input = require("fs").readFileSync("/dev/stdin").toString().split(" ");

// 하나의 값을 받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim();

// 한 줄에 공백으로 값이 들어올 때
// let input = require("fs")
//   .readFileSync("example.txt")
//   .toString()
//   .trim()
//   .split("\n");

// 한줄에 하나씩 값이 들어올 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split("\n");

// 첫 번째 줄에 자연수 n 을 받고, 그 다음 줄에 공백으로 구분된 n개의 값들을 입력받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split(/\s+/);
// const [n, ...arr] = input;

// 첫 번째 줄에 자연수 n을 입력받고, 그 다음줄에 n개의 줄에 걸쳐 한 줄에 하나의 값을 입력받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split('\n');
// const [n, ...arr] = input;

// 디 버그 할때 : node index

// 급할때 사용하는 버전

const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/index.txt")
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
  if (backTrack % 3 == 0 && backTrack % 2 == 0) {
    map.set(backTrack / 3, dp[backTrack / 3]);
    map.set(backTrack / 2, dp[backTrack / 2]);
    map.set(backTrack - 1, dp[backTrack - 1]);
    const min = Math.min(
      map.get(backTrack / 3),
      map.get(backTrack / 2),
      map.get(backTrack - 1)
    );
    for (const [key, value] of map.entries()) {
      if (value === min) {
        answer.push(key);
        backTrack = key;
        break;
      }
    }
  } else if (backTrack % 3 == 0) {
    map.set(backTrack / 3, dp[backTrack / 3]);
    map.set(backTrack - 1, dp[backTrack - 1]);
    const min = Math.min(map.get(backTrack / 3), map.get(backTrack - 1));
    for (const [key, value] of map.entries()) {
      if (value === min) {
        answer.push(key);
        backTrack = key;
        break;
      }
    }
  } else if (backTrack % 2 == 0) {
    map.set(backTrack / 2, dp[backTrack / 2]);
    map.set(backTrack - 1, dp[backTrack - 1]);
    const min = Math.min(map.get(backTrack / 2), map.get(backTrack - 1));
    for (const [key, value] of map.entries()) {
      if (value === min) {
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

console.log(answer);
