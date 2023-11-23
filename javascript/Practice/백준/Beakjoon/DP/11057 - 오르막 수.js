const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim();

const N = Number(input);

// N 이 천이고 한 자리수에는 0~9까지 올 수 있다.

const dp = new Array(10).fill(1);

// [1,1,1,1,1,1,1,1,1,1];

// 두번째 자리수의 경우 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 이렇게해서 55 가 나오게 된다.

// 0번째 자리수는 자신의 자리수 왜 그 다음 위에 있는 수를 +1 씩 증가시킨다.

// 이렇게 각 자리수는 각각의 수를 증가시키기에 이에 대한 점화식을 작성하면

// dp[i] = copyDp[i] + copyDp[i - 1] + ... copyDp[0] 라고 할 수 있겠다.

function sum(array, index) {
  let sum = 0;
  for (let i = index; i >= 0; i--) {
    sum += array[i];
  }
  return sum;
}

for (let i = 1; i <= N; i++) {
  const copyDp = [...dp];
  for (let j = 0; j < 10; j++) {
    dp[j] = sum(copyDp, j) % 10007;
  }
}

console.log(dp[9]);
