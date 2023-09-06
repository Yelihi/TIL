// 정확한 선언 시점을 알기 위해 변수에다가 class 를 할당하는것이 좋다.
// 당장 Compx 가 let인지 const 인지 햇갈림. 일단은 let임

const Compx = class {
  constructor(data) {
    this.data = data;
  }
  [Symbol.iterator]() {
    const data = [JSON.parse(JSON.stringify(this.data))];
    return {
      next() {
        let v;
        while ((v = data.shift())) {
          if (!v && !(v instanceof Object)) return { value: v };
          if (!Array.isArray(v)) v = Object.values(v);
          data.unshift(...v);
        }
        return { done: true };
      },
    };
  }
};

const a = new Compx([{ a: [3, 4, 5], b: "-" }, [1, 2, 3], 8, 9]);
console.log([...a]);

const Compx1 = class {
  constructor(data) {
    this.data = data;
  }
  *gene() {
    const data = [JSON.parse(JSON.stringify(this.data))];
    let v;
    while ((v = data.shift())) {
      if (!(v instanceof Object)) yield v;
      else {
        if (!Array.isArray(v)) v = Object.values(v);
        data.unshift(...v);
      }
    }
  }
};
