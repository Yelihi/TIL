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
  .trim()
  .split(/\n/);
const [n, ...arr] = input;
const N = Number(n);
const graph = arr.map((row) => row.split(" ").map((v) => Number(v)));

const team = Array(N)
  .fill(0)
  .map((_, i) => i + 1);

// N 의 절반만큼 combination 한다.
function getCombination(array, selected) {
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

function getLink(array, team) {
  const answer = [];
  team.forEach((people) => {
    if (!array.includes(people)) {
      answer.push(people);
    }
  });
  return answer;
}

function getSum(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = i; j < array.length; j++) {
      let a = array[i] - 1;
      let b = array[j] - 1;
      sum += graph[a][b] + graph[b][a];
    }
  }
  return sum;
}

const combinations = getCombination(team, N / 2);
const start = combinations.slice(0, combinations.length / 2);

// 스타트팀과 링크팀에 대해 합산을 계산한다
let config = Number.MAX_SAFE_INTEGER;
for (let i = 0; i < start.length; i++) {
  const startTeam = start[i];
  const linkTeam = getLink(startTeam, team);
  const startSum = getSum(startTeam);
  const linkSum = getSum(linkTeam);
  const diff = Math.abs(startSum - linkSum);
  config = Math.min(diff, config);
}

console.log(config);
