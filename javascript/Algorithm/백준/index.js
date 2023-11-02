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

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this._dummyHead = new Node();
    this._dummyTail = new Node();
    this._dummyHead.prev = this._dummyTail;
    this._dummyTail.next = this._dummyHead;
    this._length = 0;
  }

  enqueue(value) {
    const node = new Node(value);
    const prevLast = this._dummyTail.next;
    prevLast.prev = node;
    node.next = prevLast;
    node.prev = this._dummyTail;
    this._dummyTail.next = node;
    this._length += 1;
    return this._length;
  }

  dequeue() {
    if (this._length == 0) return;
    const node = this._dummyHead.prev;
    const prevNode = node.prev;
    this._dummyHead.prev = prevNode;
    prevNode.next = this._dummyHead;

    node.prev = null;
    node.next = null;
    this._length--;
    return node.value;
  }

  isEmpty() {
    return this._length === 0;
  }

  show() {
    const array = [];
    while (this._length) {
      array.push(this.dequeue());
    }
    return array;
  }
}

const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/index.txt")
  .toString()
  .trim();

const [start, end] = input.split(" ").map((v) => Number(v));
let times = 0;
let tools = 0;

const visited = new Array(200001).fill(0);

function bfs(start) {
  visited[start] = 1;
  const queue = new Queue();
  queue.enqueue([start, 0]);

  while (!queue.isEmpty()) {
    const [num, level] = queue.dequeue();
    visited[num] = 1;
    if (num === end) {
      const filterArr = queue
        .show()
        .filter((data) => data[1] === level && data[0] === num);
      times = level;
      tools = filterArr.length + 1;
      break;
    } else {
      for (const next of [num - 1, num + 1, num * 2]) {
        if (next < 0 || next > 100000 || visited[next]) continue;
        queue.enqueue([next, level + 1]);
      }
    }
  }
}

bfs(start);

console.log(times);
console.log(tools);

// 다른사람 풀이

let ipt = require("fs").readFileSync("/dev/stdin").toString().trim();
let [N, K] = ipt.split(" ").map((v) => +v);
let G = Array(100001).fill(0);
if (N == K) G[K] = 1;

let c = 0;
let Q = [N];
while (!G[K]) {
  c++;
  let T = [];
  for (let q of Q) T.push(q + 1, q - 1, q * 2);
  T = T.filter((v) => v > -1 && v < 100001 && !G[v]);
  for (let t of T) G[t]++;
  Q = T;
}
console.log(c + "\n" + G[K]);
