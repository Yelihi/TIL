const Operator = class {
  static factory(v) {
    if (v instanceof Object) {
      if (!Array.isArray(v)) v = Object.values(v);
      return new ArrayOp(v.map((v) => Operator.factory(v)));
    } else return new PrimaOp(v);
  }
  constructor(v) {
    this.v = v;
  }
  operation(f) {
    throw "override";
  }
};

// 기본값을 처리한다
const PrimaOp = class extends Operator {
  constructor(v) {
    super(v);
  }
  operation(f) {
    f(this.v);
  }
};

// 배열처리
const ArrayOp = class extends Operator {
  constructor(v) {
    super(v);
  }
  operation(f) {
    for (const v of this.v) v.operation(f);
  }
};

Operator.factory([1, 2, 3, { a: 4, b: 5 }, 6, 7]).operation(console.log);
