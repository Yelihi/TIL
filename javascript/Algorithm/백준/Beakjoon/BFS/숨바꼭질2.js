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

const visited = new Array(100001).fill(0);

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
