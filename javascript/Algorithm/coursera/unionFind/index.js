class UnionFind {
  constructor(length) {
    this.IdArray = Array(length)
      .fill(0)
      .map((_, i) => i);
  }

  connected(num1, num2) {
    return this.IdArray[num1] === this.IdArray[num2];
  }

  union(num1, num2) {
    const pid1 = this.IdArray[num1];
    const pid2 = this.IdArray[num2];
    for (let i = 0; i < this.IdArray.length; i++) {
      if (this.IdArray[i] == pid1) this.IdArray[i] = pid2;
    }
  }
}
