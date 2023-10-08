const fs = require("fs");
let input = require("fs")
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/)
  .map((v) => v.split(" "));
const [n, ...arr] = input;
const range = Number(n);

const dx = [-1, 1, 0, 0, 0];
const dy = [0, 0, -1, 1, 0];

const land = arr.map((row) => row.map((cell) => Number(cell)));
const indexLand = [];
for (let i = 1; i < range - 1; i++) {
  for (let j = 1; j < range - 1; j++) {
    indexLand.push([i, j]);
  }
}

function getCombination(selected, array) {
  const answer = [];

  const temp = new Array(selected);

  function DFS(L, s) {
    if (L === selected) {
      answer.push(temp.slice());
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

const combinations = getCombination(3, indexLand);

let min = Number.MAX_SAFE_INTEGER;

combinations.forEach((combination) => {
  const visit = arr.map((row) => row.map((cell) => 0));
  let count = 0;
  let sum = 0;
  combination.forEach((landIndex) => {
    const [x, y] = landIndex;
    for (let i = 0; i < 5; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (visit[nx][ny] === 1) {
        sum = 0;
        count = 0;
        break;
      }
      count++;
      sum += land[nx][ny];
      visit[nx][ny] = 1;
    }
    // if (x + 1 < range && x - 1 > -1 && y + 1 < range && y - 1 > -1) {
    //   if (
    //     visit[x][y] ||
    //     visit[x - 1][y] ||
    //     visit[x + 1][y] ||
    //     visit[x][y - 1] ||
    //     visit[x][y + 1]
    //   )
    //     return;
    //   count++;
    //   sum += land[x][y];
    //   sum += land[x - 1][y];
    //   sum += land[x + 1][y];
    //   sum += land[x][y - 1];
    //   sum += land[x][y + 1];
    //   visit[x][y] = 1;
    //   visit[x - 1][y] = 1;
    //   visit[x + 1][y] = 1;
    //   visit[x][y - 1] = 1;
    //   visit[x][y + 1] = 1;
    // } else {
    //   return;
    // }
  });

  if (count === 15) {
    min = Math.min(sum, min);
  }
});

console.log(min);

// 다른 사람 풀이

// const readFileSyncAddress =
//   process.platform === "linux" ? "/dev/stdin" : "text.txt";

// const input = require("fs")
//   .readFileSync(readFileSyncAddress)
//   .toString()
//   .trimEnd()
//   .split("\n")
//   .map((el) => el.trimEnd());

// const dy = [0, 0, -1, 1, 0];
// const dx = [-1, 1, 0, 0, 0];

// const N = Number(input[0]);
// const map = input.slice(1, 1 + N).map((el) => el.split(" ").map(Number));
// const visited = Array.from({ length: N }, () => new Array(N).fill(false));
// let minCost = Infinity;

// for (let i = 1; i < N - 1; i++) {
//   for (let j = 1; j < N - 1; j++) {
//     plantFlower(i, j);

//     for (let y = 1; y < N - 1; y++) {
//       for (let x = 1; x < N - 1; x++) {
//         if (!checkFlower(y, x)) continue;
//         plantFlower(y, x);

//         for (let a = 1; a < N - 1; a++) {
//           for (let b = 1; b < N - 1; b++) {
//             if (!checkFlower(a, b)) continue;
//             plantFlower(a, b);
//             minCost = Math.min(calcFlowers(), minCost);
//             unPlantFlower(a, b);
//           }
//         }
//         unPlantFlower(y, x);
//       }
//     }
//     unPlantFlower(i, j);
//   }
// }

// console.log(minCost);

// // 꽃이 필 위치를 체크하는 함수
// function checkFlower(y, x) {
//   for (let i = 0; i < 5; i++) {
//     const [ny, nx] = [y + dy[i], x + dx[i]];
//     if (visited[ny][nx]) return false;
//   }
//   return true;
// }

// // 꽃을 심는 함수
// function plantFlower(y, x) {
//   for (let i = 0; i < 5; i++) {
//     const [ny, nx] = [y + dy[i], x + dx[i]];
//     visited[ny][nx] = true;
//   }
// }

// // 꽃을 뽑는 함수
// function unPlantFlower(y, x) {
//   for (let i = 0; i < 5; i++) {
//     const [ny, nx] = [y + dy[i], x + dx[i]];
//     visited[ny][nx] = false;
//   }
// }

// // 비용을 계산하는 함수
// function calcFlowers() {
//   let cost = 0;
//   for (let i = 0; i < N; i++) {
//     for (let j = 0; j < N; j++) {
//       if (visited[i][j]) cost += map[i][j];
//     }
//   }
//   return cost;
// }
