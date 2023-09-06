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

const iter4 = {
  [Symbol.iterator]() {
    return this;
  },
  data: [{ a: [1, 2, 3, 4], b: "-" }, [5, 6, 7], 8, 9],
  next() {
    let v;
    while ((v = this.data.shift())) {
      switch (true) {
        case Array.isArray(v):
          this.data.unshift(...v);
          break;
        case v && typeof v == "object":
          for (let k in v) this.data.unshift(v[k]);
          break;
        default:
          return { value: v, done: false };
      }
    }
    return { done: true };
  },
};

for (let v of iter4) {
  console.log(v);
}

// es6 도입
const iter5 = {
  [Symbol.iterator]() {
    return this;
  },
  data: [{ a: [1, 2, 3, 4], b: "-" }, [5, 6, 7], 8, 9],
  next() {
    let v;
    while ((v = this.data.shift())) {
      if (!v && !(v instanceof Object)) return { value: v }; // 배열이나 객체가 아니라면, 참고로 null 도 안됨.
      if (!Array.isArray(v)) v = Object.values(v); // 배열인지 아닌지 확인, 배열이 아니라면 배열로 변경하기
      this.data.unshift(...v); // 이제 배열만 내려오니 배열 처리
    }
    return { done: true };
  },
};
