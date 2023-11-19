const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim()
  .split(/\n/);

const [info, ...arr] = input;
const [N, M] = info.split(" ").map((v) => Number(v));

// unionFind 가 좋아보인다

class QuickUnion {
  constructor(array) {
    this.Array = array;
    this.sz = array.map((v) => 1);
  }

  root(i) {
    while (i == this.Array[i]) {
      return i;
    }
    const currentParent = this.root(this.Array[i]);
    this.Array[i] = currentParent;

    return currentParent;
  }

  isConnected(p, q) {
    return this.root(p) === this.root(q);
  }

  union(p, q) {
    const i = this.root(p); // 1
    const j = this.root(q); // 1
    if (i === j) return;

    if (this.sz[i] < this.sz[j]) {
      this.Array[j] = i;
      this.sz[j] += this.sz[i];
    } else {
      this.Array[i] = j;
      this.sz[i] += this.sz[j];
    }
  }

  component() {
    const [except, ...arr] = this.Array;
    const rootArray = arr.map((v) => this.root(v));
    const set = [...new Set(rootArray)];
    return set.length;
  }
}

const Nodes = new Array(N).fill(0).map((_, i) => i + 1);
const array = [null, ...Nodes];

const union = new QuickUnion(array);

for (let i = 0; i < M; i++) {
  const [p, q] = arr[i].split(" ").map((v) => Number(v));
  union.union(p, q);
}

console.log(union.Array);
console.log(union.sz);
