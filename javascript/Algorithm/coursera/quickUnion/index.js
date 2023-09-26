class QuickUnion {
  constructor(length) {
    this.Id = Arrray(length)
      .fill(0)
      .map((_, i) => i);
  }

  root(i) {
    while (i != this.Id[i]) i = this.Id[i];
    return i;
  }

  connected(p, q) {
    return this.root(p) === this.root(q);
  }

  union(p, q) {
    const i = root(p);
    const j = root(q);
    id[i] = j;
  }
}
