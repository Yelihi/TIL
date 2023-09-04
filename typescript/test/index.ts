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

function getRandom<T extends "char" | "int" | "bool">(
  str: T
): ReturnTypeByInputType[T] {
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

function unknownColor(x: never): never {
  throw new Error("unknown color");
}

type Color = "red" | "green" | "blue";

function getColorName(c: Color): string {
  switch (c) {
    case "red":
      return "is red";
    case "green":
      return "is green";
    case "blue":
      return "is blue";
    default:
      return unknownColor(c); // 'string' 타입은 'never' 타입에 할당할 수 없음
  }
}

const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

// enum 은 직관적이게도 dir 에 up,down,left,right 만 들어가야 한다는 것을 타입 선언할 수 있다.
function run(dir: EDirection) {
  console.log(dir);
}

run(EDirection.Up);

// 반면 객체는 이렇게 객체타입을 분리하여서 설정을 해주어야 한다.
type Direction = (typeof ODirection)[keyof typeof ODirection];

function run1(dir: Direction) {
  console.log(dir);
}

run1(ODirection.Up);

type Fruit = "orange" | "lemon" | "banana";

type Cart = { [key in Fruit]: Record<key, boolean> }[Fruit];

type Info = {
  name: string;
  password: string;
  confirm: boolean;
  email: string;
};

type PartialInfo = { [key in keyof Info]: Record<key, Info[key]> }[keyof Info];
