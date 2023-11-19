class QuickUnion {
  constructor(length) {
    this.Id = new Array(length).fill(0).map((_, i) => i);
  }

  root(i) {
    while (i != this.Id[i]) i = this.Id[i];
    return i;
  }

  connected(p, q) {
    return this.root(p) === this.root(q);
  }

  union(p, q) {
    const i = this.root(p); // 5
    const j = this.root(q); // 5
    if (i < j) {
      this.Id[j] = i;
    } else {
      this.Id[i] = j;
    }
  }
}

const union = new QuickUnion(7);
union.union(1, 2);
console.log(union);
union.union(2, 5);
console.log(union);
union.union(5, 1);
console.log(union);
union.union(3, 4);
union.union(4, 6);

let count = 0;

console.log(union);
