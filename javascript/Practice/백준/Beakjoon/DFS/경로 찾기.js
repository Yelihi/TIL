// const fs = require("fs");
// const input = fs
//   .readFileSync(__dirname + "/example.txt")
//   .toString()
//   .trim()
//   .split(/\n/);

// const [n, ...arr] = input;

// const N = Number(n);
// const Arr = arr.map((row) => row.split(" ").map((cell) => Number(cell)));
// const Visited = Arr.map((row) => row.map((cell) => 0));

// // class node
// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = [];
//   }
// }

// // class Graph
// class Graph {
//   constructor(length) {
//     this.nodes = Array(length)
//       .fill(0)
//       .map((_, i) => new Node(i));
//   }

//   connect(p, q) {
//     if (p < 0 || q < 0) return;
//     if (p > this.nodes.length || q > this.nodes.length) return;
//     this.nodes[p].next.push(q);
//     return;
//   }

//   check(p, q) {
//     if (p < 0 || q < 0) return;
//     if (p > this.nodes.length || q > this.nodes.length) return;
//     let flag = 0;

//     const dfs = (i, j, L) => {
//       if (L === this.nodes.length) return;
//       if (L > 0 && j === this.nodes[i].value) {
//         flag = 1;
//         return;
//       }
//       if (this.nodes[i].next.length === 0) return;

//       this.nodes[i].next.forEach((next) => {
//         dfs(next, j, L + 1);
//       });
//     };
//     dfs(p, q, 0);
//     return flag;
//   }
// }

// // graph 생성
// const graph = new Graph(N);

// // graph 에 conect 채워주기
// for (let i = 0; i < N; i++) {
//   for (let j = 0; j < N; j++) {
//     if (Arr[i][j] === 1) {
//       graph.connect(i, j);
//     }
//   }
// }

// // 순회돌면서 visited 에 값 넣어주기
// for (let i = 0; i < N; i++) {
//   for (let j = 0; j < N; j++) {
//     Visited[i][j] = graph.check(i, j);
//   }
// }

// // 출력 형태로 변경하기

// let answer = "";

// for (let i = 0; i < N; i++) {
//   for (let j = 0; j < N; j++) {
//     answer += Visited[i][j] + " ";
//   }
//   answer += "\n";
// }
// console.log(answer.trim());

// 위 풀이는 시간제한이 걸려서 통과시키지 못했다

// 플로이드 와샬

const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);

const [n, ...arr] = input;

const N = Number(n);
const Arr = arr.map((row) => row.split(" ").map((cell) => Number(cell)));

// 거쳐가는 노드
for (let k = 0; k < N; k++) {
  // 출발 노드
  for (let i = 0; i < N; i++) {
    // 도착 노드
    for (let j = 0; j < N; j++) {
      console.log([i, k], Arr[i][k], [k, j], Arr[k][j]);
      if (Arr[i][k] && Arr[k][j]) {
        Arr[i][j] = 1;
      }
    }
  }
}

let answer = "";

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    answer += Arr[i][j] + " ";
  }
  answer += "\n";
}
console.log(answer.trim());
