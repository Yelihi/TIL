const fs = require("fs");
let input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\s+/);
const [n, s, ...arr] = input.map((v) => Number(v));

// 우선 횟수를 저장할 변수
// const getCombinations = function (array, selectedNumber) {
//   const results = [];
//   if (selectedNumber === 1) {
//     return array.map((value) => [value]);
//   }

//   array.forEach((fixed, index, origin) => {
//     const rest = origin.slice(index + 1);
//     const combinations = getCombinations(rest, selectedNumber - 1);
//     const attached = combinations.map((combination) => [fixed, ...combination]);
//     results.push(...attached);
//   });

//   return results;
// };

// // 우선 횟수를 저장할 변수
// let result = 0;

// // 2중 for문을 돌려준다
// for (let i = n; i > 1; i--) {
//   const combinations = getCombinations(arr, i);
//   combinations.forEach((combination) => {
//     let sum = 0;
//     sum = combination.reduce((a, b) => a + b);
//     if (sum === s) result++;
//   });
// }

// console.log(result);

// 위의 식이 메모리 초과 오류가 발생하여 아래로 변경

function getCombinations(n, arr) {
  const answer = [];

  // n개의 인덱스를 가진 배열을 확보한다.
  // [empty, empty];
  const temp = Array(n);

  // L: 현재 뎁스 레벨 / s: for()문의 시작 번호
  function DFS(L, s) {
    // 매개변수 L이 n과 같아지면 answer에 push해준다.
    // slice() 메서드를 사용한 이유는 재귀를 돌며 temp가 바뀌기 떄문이다.
    if (L === n) answer.push(temp.slice());
    else {
      for (let i = s; i < arr.length; i++) {
        // temp[L] 현재 레벨 맞는 숫자를 넣어준다.
        temp[L] = arr[i];

        // 레벨 +1, for() 시작번호 +1을 하고 DFS 재귀함수를 호출한다.
        // 레벨이 n과 같아지면 answer에 push후 종료할 것이고
        // 아닐 for()문이 돌며 레벨이 맞춰질 때 까지 재귀함수를 실행할 것이다.
        DFS(L + 1, i + 1);
      }
    }
  }

  // 레벨 0, 시작 번호 0부터 시작하면 된다.
  DFS(0, 0);

  return answer;
}

// 우선 횟수를 저장할 변수
let answer = 0;

// 2중 for문을 돌려준다
for (let i = 1; i <= n; i++) {
  const combinations = getCombinations(i, arr);
  combinations.forEach((combination) => {
    let sum = 0;
    sum = combination.reduce((a, b) => a + b);
    if (sum === s) answer++;
  });
}

console.log(answer);
