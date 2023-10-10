const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/)
  .map((v) => v.split(" "));

const [n, ...arr] = input;
const range = Number(n);

const rangeArr = new Array(range).fill(0).map((_, i) => i);
const scoreMaxtrix = arr.map((row) => row.map((cell) => Number(cell)));
const reversMatrix = [];
for (let i = 0; i < range; i++) {
  const row = [];
  for (let j = 0; j < range; j++) {
    row.push(scoreMaxtrix[j][i]);
  }
  reversMatrix.push(row);
}

// 경우의 수

function getCombination(selected, array) {
  const answer = [];
  const temp = new Array(selected);
  function dfs(L, s) {
    if (L === selected) {
      answer.push(temp.slice());
    } else {
      for (let i = s; i < array.length; i++) {
        temp[L] = array[i];
        dfs(L + 1, i + 1);
      }
    }
  }
  dfs(0, 0);
  return answer;
}
function getObjCombination(selected, array) {
  const answer = [];

  const temp = new Array(selected);

  function DFS(L, s) {
    if (L === selected) {
      const half = [];
      for (let i = 0; i < array.length; i++) {
        if (!temp.includes(array[i])) half.push(array[i]);
      }
      answer.push({ start: temp.slice(), link: half });
    } else {
      for (let i = s; i < array.length; i++) {
        temp[L] = array[i];
        DFS(L + 1, i + 1);
      }
    }
  }
  DFS(0, 0);

  return answer;
}

const combinations = getObjCombination(range / 2, rangeArr); // 여기서 이제 2팀이 나누어짐
const pairs = combinations.slice(combinations.length / 2); // start와 link 가 겹칠수 있기에 절반으로 나누어준다 [{start: [1,2,3], link: [4,5,6]},{}...]

// 경우의 수에 해당하는 합계 계산
function getSum(array) {
  let sum = 0;
  const combi = getCombination(2, array);
  combi.forEach((v) => {
    const [i, j] = v;
    sum += scoreMaxtrix[i][j];
    sum += reversMatrix[i][j];
  });
  return sum;
}

let min = Number.MAX_SAFE_INTEGER;
pairs.forEach((obj) => {
  const starts = obj.start;
  const links = obj.link;
  const startSum = getSum(starts);
  const linkSum = getSum(links);
  const abs = Math.abs(startSum - linkSum);
  min = Math.min(abs, min);
});

console.log(min);

// 다른 사람 풀이

// const sol = (input) => {
//   const N = +input[0];
//   const halfN = N / 2;
//   const stats = input.slice(1).map((str) => str.split(" ").map(Number));

//   const check = new Array(N).fill(0);
//   let min = Number.MAX_SAFE_INTEGER;
//   function dfs(L, K) {
//     if (L === halfN) { // 스타트팀에 N/2 명이 뽑혔다면
//       const sTeam = [];
//       const lTeam = [];
//       let sSum = (lSum = 0);
//       for (let i = 0; i < N; i++) {
//         if (check[i]) sTeam.push(i); // 체크 배열은 스타트 팀에 넣어주고, 체크 배열에 없으면 링크 팀에 넣어준다.
//         else lTeam.push(i);
//       }
//       for (let i = 0; i < halfN; i++) {
//         for (let j = i + 1; j < halfN; j++) { // (i,j), (j,i) 쌍을 계속 더해준다.
//           sSum = sSum + stats[sTeam[i]][sTeam[j]] + stats[sTeam[j]][sTeam[i]];
//           lSum = lSum + stats[lTeam[i]][lTeam[j]] + stats[lTeam[j]][lTeam[i]];
//         }
//       }
//       min = Math.min(min, Math.abs(sSum - lSum));
//       return;
//     }

//     for (let i = K; i < N; i++) { // 체크 배열을 스타트 팀 구성에 사용한다.
//       check[i] = 1;
//       dfs(L + 1, i + 1);
//       check[i] = 0;
//     }
//   }
//   dfs(0, 0);
//   return min;
// };

// // 백준에서 입력을 받는 코드
// const input = [];
// require("readline")
//   .createInterface(process.stdin, process.stdout)
//   .on("line", (line) => {
//     input.push(line);
//   })
//   .on("close", () => {
//     console.log(sol(input));
//     process.exit();
//   });
