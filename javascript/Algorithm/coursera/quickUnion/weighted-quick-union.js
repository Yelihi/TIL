class WeightedQuickUnion {
  constructor(length) {
    this.Id = Array(length)
      .fill(0)
      .map((_, i) => i);
    this.sz = Array(length).fill(1);
  }

  // logN
  root(i) {
    while (i != this.Id[i]) {
      this.Id[i] = this.Id[this.Id[i]]; // path compression. 즉 트리를 타고 올라가는게 아니라 각 노드가 하나의 Root 를 가리키도록 하는것
      i = this.Id[i];
    }
    return i;
  }

  connected(p, q) {
    return this.root(p) === this.root(q);
  }

  union(p, q) {
    const i = this.root(p);
    const j = this.root(q);
    if (i == j) return;
    if (this.sz[i] < this.sz[j]) {
      this.Id[i] = j;
      this.sz[j] += this.sz[i];
    } else {
      this.Id[j] = i;
      this.sz[i] += this.sz[j];
    }
  }

  countSet() {
    const set = this.sz.filter((sz) => sz !== 1);
    const count = set.length;
    return count;
  }
}

const test = new WeightedQuickUnion(7);

test.union(1, 2);
test.union(2, 5);
test.union(5, 1);
test.union(3, 4);
test.union(4, 6);
test.union(5, 4);
test.union(2, 4);
test.union(2, 3);

console.log(test.Id);
console.log(test.sz);

console.log(test.countSet());
