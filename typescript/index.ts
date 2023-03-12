type VariantA = {
  a: string;
  b?: never;
};

type VariantB = {
  b: number;
  a?: never;
};

declare function fn(arg: VariantA | VariantB): void;

const input = { b: 123, c: "sdf" };
fn(input); // ❌ 속성 'a'의 타입은 호환되지 않는다.

type ReturnTypeByInputType = {
  int: number;
  char: string;
  bool: boolean;
};

function getRandom<T extends "char" | "int" | "bool">(str: T): ReturnTypeByInputType[T] {
  if (str === "int") {
    // generate a random number
    return Math.floor(Math.random() * 10) as ReturnTypeByInputType[T]; // ❌ 'number' 타입은 'never'타입에 할당할 수 없다.
  } else if (str === "char") {
    // generate a random char
    return String.fromCharCode(
      97 + Math.floor(Math.random() * 26) // ❌ 'string' 타입은 'never'타입에 할당할 수 없다.
    ) as ReturnTypeByInputType[T];
  } else {
    // generate a random boolean
    return Boolean(Math.round(Math.random())) as ReturnTypeByInputType[T]; // ❌ 'boolean' 타입은 'never'타입에 할당할 수 없다.
  }
}
