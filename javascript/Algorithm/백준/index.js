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

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Queue {
  constructor() {
    this.dummyHead = new Node();
    this.dummyTail = new Node();
    this.dummyHead.prev = this.dummyTail;
    this.dummyTail.next = this.dummyHead;
    this.length = 0;
  }

  enqueue(value) {
    const node = new Node(value);
    const prevLast = this.dummyTail.next;

    prevLast.prev = node;

    node.prev = this.dummyTail;
    node.next = prevLast;
    this.dummyTail.next = node;
    this.length++;
    return;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const node = this.dummyHead.prev;
    const newHead = node.prev;

    this.dummyHead.prev = newHead;
    node.next = null;
    node.prev = null;
    newHead.next = this.dummyHead;
    this.length--;
    return newHead.value;
  }

  front() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.dummyHead.prev.value;
  }

  back() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.dummyTail.next.value;
  }

  overview() {
    if (this.isEmpty()) {
      return undefined;
    }
    const queue = [];

    let node = this.dummyHead;
    while (node !== this.dummyTail) {
      let prevNode = node.prev;
      if (prevNode.value === undefined) break;
      queue.push(prevNode.value);
      node = prevNode;
    }

    return queue;
  }

  isEmpty() {
    return this.length === 0;
  }
}

const queue = new Queue();

[1, 3, 4, 5, 6, 7, 8, 9, 10].forEach((elem) => {
  queue.enqueue(elem);
});

console.log(queue.front());
console.log(queue.back());
console.log(queue.overview());
console.log(queue.dequeue());
console.log(queue.overview());
