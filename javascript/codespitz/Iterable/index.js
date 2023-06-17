const loop = (iter, f) => {
  if (typeof iter[Symbol.iterator] == "function") {
    iter = iter[Symbol.iterator]();
  } else return;

  if (typeof iter.next !== "function") return;

  do {
    const v = iter.next();
    if (v.done) return;
    f(v.value);
  } while (true);
};

const iter = {
  arr: [1, 2, 3, 4, 5],
  [Symbol.iterator]() {
    return this;
  },
  next() {
    return {
      done: this.arr.length == 0,
      value: this.arr.pop(),
    };
  },
};

loop(iter, console.log);

// For of

const iter2 = {
  [Symbol.iterator]() {
    return this;
  },
  arr: [1, 2, 3, 4, 5, 6],
  next() {
    return {
      done: this.arr.length == 0,
      value: this.arr.pop(),
    };
  },
};

for (const v of iter2) {
  console.log(v);
}
