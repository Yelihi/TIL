const N2 = class {
  // max 를 통해 loop 의 limit 을 걸어둔다
  // iterator 의 done 이 false 가 무한이 되면 안된다.
  constructor(max) {
    this.max = max;
  }
  [Symbol.iterator]() {
    // 자유변수 캡쳐해서 클로저에 가두기(함수의 지역변수가 아님에도 끌어서 쓸수있는것)
    let cursor = 0,
      max = this.max;
    return {
      done: false,
      next() {
        if (cursor > max) {
          this.done = true;
        } else {
          this.value = cursor * cursor;
          cursor++;
        }
        return this;
      },
    };
  }
};

console.log([...new N2(6)]);
