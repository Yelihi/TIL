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

class QuickUnion {
  constructor(length) {
    this.Id = [null, ...new Array(length).fill(0).map((_, i) => i + 1)];
    this.Sz = new Array(length + 1).fill(1);
  }

  root(p) {
    while (p !== this.Id[p]) {
      this.Id[p] = this.Id[this.Id[p]];
      p = this.Id[p];
    }
    return p;
  }

  isSameRoot(p, q) {
    return this.root(p) === this.root(q);
  }

  union(p, q) {
    const i = this.root(p);
    const j = this.root(q);
    if (i === j) return;
    if (this.Sz[i] < this.Sz[j]) {
      this.Id[i] = j;
      this.Sz[j] += this.Sz[i];
    } else {
      this.Id[j] = i;
      this.Sz[i] += this.Sz[j];
    }
  }

  connectArea() {
    const [except, ...arr] = this.Id;
    const roots = arr.map((id) => this.root(id));
    const set = [...new Set(roots)];
    return set;
  }
}

const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/index.txt")
  .toString()
  .trim()
  .split(/\n/);
const iterator = input[Symbol.iterator]();

const [N, M] = iterator
  .next()
  .value.split(" ")
  .map((v) => Number(v));
const graph = new QuickUnion(N);

for (let i = 0; i < M; i++) {
  const [p, q] = iterator
    .next()
    .value.split(" ")
    .map((v) => Number(v));
  graph.union(p, q);
}

console.log(graph.connectArea().length);
