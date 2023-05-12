### 타입스크립트를 학습하는 이유

<p>타입스크립트를 적용시키는 가장 중요한 이유라면, 바로 프로그램의 안정성을 상승시키기 위해 타입스크립트를 사용한다. 타입스크립트는 황당한 에러들을 많이 줄여준다. 다만, 자바스크립트보다 자유도가 줄어들게 된다. 그래도 에러 안나는게 훨씬 좋으니깐 이득이 훨씬 많다.</p> <br />

<p>주의할 점은 타입스크립트는 최종적으로 자바스크립트로 변환된다. deno 라는것은 타입스크립트를 바로 실행을 할 수 있지만, 이건 좀 예외로 하자. 자바스크립트로 변환을 한다고 했는데, 자바스크립트를 브라우저마다 다른 버전을 사용할 수있고, 이를 tsconfig 에서 바꿔줄 수 있다.</p>

- typescript는 언어이자 컴파일러(tsc)이다. 컴파일러는 ts 코드를 js로 바꿔준다.
- tsc는 tsconfig.json(tsc --init 시 생성)에 따라 ts 코드를 js(tsc 시 생성)로 바꿔준다. 인풋인 ts와 아웃풋인 js 모두에 영향을 끼치므로 tsconfig.json 설정을 반드시 봐야한다.
- 단순히 타입 검사만 하고싶다면 tsc --noEmit 하면 된다
- ts 파일을 실행하는 게 아니라 결과물인 js를 실행해야 한다.

<p>보통 타입스크립트는 노드가 필요한데, 우선 폴더에 npm init -y(전부 yes 하겠다는 의미)를 통해 준비를 끝내고 타입스크립트를 설치해주자. 이후 npx tsc -init 을 통해서 tsconfig.json 까지 설정해주면 준비가 끝났다.</p>

### 기본적인 type

<p>기본적인 타입에 대해서 살펴보자. 단순하게 변수 옆에 타입을 붙여준다고 생각하자</p>

```ts
const a: number = 5;
const b: string = '5';
const c: boolean = true;
..

// any 를 쓰면 아무런 의미가 없다.
const d: any = true;

// 함수역시 매개변수에 타입을 지정함으로서 매개변수를 보고도 파악할 수 있도록 해줘야 한다
function add(x: number, y: number) => number => (x, y) => x + y;

// 인터페이스로 표현하기
interface Add {
  (x: number, y: number): number;
}

const add: Add = (x,y) => x + y;

// 객체
const obj: {lat: number, lon: number} = {lat: 34.6, lon: 12.3}

// 배열
const arr: string[] = ['1','2']

// 튜플: 길이가 고정된다.
const arr3: [number,number,string] = [1,2,'3'];


```

- 타입스크립트의 주 목적은 any 를 없에는 것이다.
- 타입스크립트는 자동적으로 타입을 추론해준다. 이러한 추론은 적극적으로 활용해야한다. 그래야 불필요한 타입을 선언하지 않아도 되기 때문이다.
- 예를 들어보자

```ts
const a = "5";

// 이렇게 하지 말자
const a: string = "5";
```

- 이때 a 의 타입은 자동적으로 추론되어 '5' 라고 정확하게 추론된다.
- 왜냐하면 const 이기에 재할당이 불가능하기 때문에, 정확한 타입이 정해진 것이다. 오히려 이 경우 string 이라는 타입은 더 광범위하면서도 부정확한 타입이 될 수 있다
- 여기서 만약 아래처럼 string 으로 추론을 해버리면 작동은 잘 하겠지만, 오히려 타입이 애매해졌다. 정확한 '5' 가 아니라 string 이 되었기 때문이다. 따라서 알아서 잘 추론한 타입은 건들지 말자.
- 물론 추론을 잘못했으면 그때는 변경해주어야 한다.
  <br />

<p>명심해야 할 점은 타입스크립트로 타입을 작성했다 하더라도, 추후 자바스크립트로 변환될 때 타입들은 다 사라진다. 이 말은 지금 타입스크립트에서 작성하는 코드에서 타입을 다 제거해도 정상적으로 작동하는 자바스크립트 코드여야 한다는 점이다.</p>

### never, !

<p>아래처럼 빈 배열을 정의해보자</p>

```ts
const array = [];
```

<p>이 때의 타입은 never[] 로 표현이 된다. never 가 무엇일까. never 를 이해하기 전 type에 대해 조금 더 이해를 해보도록 하자.</p><br />

<p>타입은 가능한 값의 집합이다. 예를 들어 string 은 무한히 가능한 모든 문자열의 집합을 의미한다. 그래서 변수 타입을 string 으로 지정하면, 해당 변수는 오직 가능한 집합 내의 값만을 가질 수 있다. 타입이 집합일 때 never 는 공집합니다. 집합에 어떠한 값도 없기 때문에 never 타입은 any 타입을 포함하여 어떠한 값도 가질 수 없다.</p>

```ts
declare const any: any;
const never: never = any; // 'any' 타입은 'never' 타입에 할당할 수 없다.
```

<p>그렇다면 never 타입은 어째서 필요한 것일까. 숫자 체계에 아무것도 없는 양을 나타내는 0처럼 문자 체계에도 불가능을 나타내는 타입이 필요하다.</p>

- 값을 포함할 수 없는 빈 타입
  - 호환되지 않는 타입들의 교차타입
  - 함수에서 허용되지 않는 매개변수
- 절대로 도달할 수 없을 else 분기의 조건 타입
- 거부된 프로미스에서 처리된 값의 타입

```ts
const p = Promise.reject("foo"); // const p : Promise<never>
```

<br />

> **유니언/교차 타입과 never 동작**

<p>숫자 0이 덧셈과 곱셈에 적용되는 상황을 떠올려보면, never 역시 그러하다</p>

- 숫자에 0을 더하면 동일한 숫자가 나오는 것과 같이, never 타입은 유니언 타입에서 없어진다
- 숫자에 0을 곱하면 0이 나오는 것과 같이, never 타입은 교차 타입을 덮어쓴다.
  <br />

> **never 타입은 어떻게 쓸까**

<p>never 를 사용하면 앞에서 설명했듯이 any 조차 포함되지 않는다. 즉, 만약에 함수 인자에 never 타입을 적용시키면, 어떠한 인자도 들어올 수 없게 된다. 오직 never 만 받을 수 있다. 이러한 점을 활용하면 switch, if-else 문의 모든 상황을 보장할 수 있게 된다. 기본케이스에 이용하는 것이다.</p>

```ts
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
    default:
      return unknownColor(c); // 'string' 타입은 'never' 타입에 할당할 수 없음
  }
}
```

- 위 코드를 보면 만일 unknownColor 의 인자 x 를 never 로 해놓지 않는다면, blue 가 case 에 설정이 되어있지 않기 때문에, unknown color 로 인식이 되어버린다. 그렇다면 blue 를 집어 넣었을 때 에러가 던지게 된다
- 정확한 코드라면 case 'blue' 도 추가를 해야겠지만, 만일 하지 않았더라도 타입 오류가 발생하지 않기 때문에 오류를 잡아내기 쉽지 않았을 것이다. 하지만 never 를 통해 string 을 전달받지 않게 함으로서 위처럼 타입오류를 띄어준다.

<p>또 타이핑을 부분적으로 허용하지 않게 할 수도 있다. 어떠한 함수에 객체 인자를 2가지 타입으로 받을 수 있게 유니언으로 조합하다고 해보자. 아래 코드를 보면 더 쉽게 이해될 수 있다 </p>

```ts
type VariantA = {
  a: string;
};

type VariantB = {
  b: number;
};

declare function fn(arg: VariantA | VariantB): void;

const input = { a: "foo", b: 123 };
fn(input); // 타입스크립트 컴파일러는 아무런 문제도 지적하지 않지만, 우리의 목적에는 맞지 않는다.
```

<p>위 코드에 never 를 추가하여 우리의 의도와 맞게 타입을 작성해보자</p>

```ts
type VariantA = {
  a: string;
  b?: never;
};

type VariantB = {
  b: number;
  a?: never;
};

declare function fn(arg: VariantA | VariantB): void;

const input = { a: "foo", b: 123 };
fn(input); // 속성 'a'의 타입은 호환되지 않는다.
```

- 위 never 선언을 통해 a와 b가 함께 들어있는 input 은 타입 오류가 발생힌다

<p>유니온 타입에서 필터링을 해줄수도 있다. 조건부 타입에서 원하지 않는 타입을 필터링 할 수도 있는데, 유니언 타입에서 never 는 자동적으로 제거가 된다. 즉 특정 조건이 참이면 특정 타입이고 아니라면 never 를 반환한다고 하면 결국 조건에 맞는 타입만 남게 되는것이다.</p>

```ts
type Foo = {
  name: "foo";
  id: number;
};

type Bar = {
  name: "bar";
  id: number;
};

type All = Foo | Bar;

type ExtractTypeByName<T, G> = T extends { name: G } ? T : never;

type ExtractedType = ExtractTypeByName<All, "foo">; // 결과 타입은 Foo
```

- 위 코드의 순서를 살펴보자

```ts
type ExtractedType = ExtractTypeByName<All, "foo">;

type ExtractedType = ExtractTypeByName<Foo | Bar, "foo">;

type ExtractedType = ExtractTypeByName<Foo, "foo"> | ExtractTypeByName<Bar, "foo">;

type ExtractedType = Foo extends { name: "foo" } ? Foo : never | Bar extends { name: "foo" } ? Bar : never;

type ExtractedType = Foo | never;

type ExtractedType = Foo;
```

- 결국은 유니언에서 never 가 의미가 없다는 상황이 위와 같은 결과로 이어진다.

<p>filter 에도 사용이 가능하다.</p>

```ts
type Filter<Obj extends Object, ValueType> = {
  [Key in keyof Obj as ValueType extends Obj[Key] ? Key : never]: Obj[Key];
};

interface Foo {
  name: string;
  id: number;
}

type Filtered = Filter<Foo, string>; // {name: string;}
```

<p>반면 number & string 같이 교차 타입이면서 호환되지 않는 경우는 never 타입을 얻을 수 있다. 이 부분때문에 가끔 never 형식에 할당할 수 없다는 오류가 발생하곤 한다.</p>

```ts
type Res = number & string; // never
type Res = number & never; // never
```

<p>never 를 사용하지 않고도 never 관련 오류를 경험한 적이 있을텐데, 이유는 타입스크립트는 타입 안전성을 유지하고자 암묵적으로 타입을 교차하기 때문이다.</p>

```ts
type ReturnTypeByInputType = {
  int: number;
  char: string;
  bool: boolean;
};

function getRandom<T extends "char" | "int" | "bool">(str: T): ReturnTypeByInputType[T] {
  if (str === "int") {
    // generate a random number
    return Math.floor(Math.random() * 10); // ❌ 'number' 타입은 'never'타입에 할당할 수 없다.
  } else if (str === "char") {
    // generate a random char
    return String.fromCharCode(
      97 + Math.floor(Math.random() * 26) // ❌ 'string' 타입은 'never'타입에 할당할 수 없다.
    );
  } else {
    // generate a random boolean
    return Boolean(Math.round(Math.random())); // ❌ 'boolean' 타입은 'never'타입에 할당할 수 없다.
  }
}
```

- 의도한 대로라면 조건식에 따라 str 에 대한 return 타입이 결정이 자동으로 되어야 한다.
- 하지만 타입스크립트는 return 부분이 지정해준 타입 ReturnTypeByInputType 에 모든 경우에 다 할당이 가능해야지 안정된 타입이라고 판단하여 int,char,bool 을 교차타입으로 지정해버린다.
- 따라서 never 가 되고, number 나 string은 never 에 할당할 수 없다고 나오는 것이다.
- 해결하기 위해서는 타입단언을 사용하면 된다.

```ts
return Math.floor(Math.random() * 10) as ReturnTypeByInputType[T];
return Math.floor(Math.random() * 10) as never;
```

> **느낌표**

<p>참고로 타입스크립트의 장점은 오타를 줄여준다는 장점도 있다. </p>

```ts
const head = document.querySelector("#head")!;
console.log(head);

const head = document.querySelector("#head");
if (head) {
  head.innerHTML = "hello";
}
```

- head 는 상황에 따라서 null 일 수 있다. 왜냐하면 qs 로 찾지 못하면 null 이기 때문이다.
- 허나 정말로 있다고 확신이 든다면, 뒤에 !를 붙여서 null 인 가능성을 배제할 수 있다.
- 다만 추천하지는 않고, 조건문을 해서 null 인 경우를 따져주면 된다.

### 템플릿 리터럴 타입, rest

<p>템플릿 리터럴에도 타입 선언이 가능하다.</p>

```ts
type World = "world" | "hell";

// type Greeting = "hello world"
type Greeting = `hello ${World}`;
```

<p>여러 매개변수를 배열로 받을 때 rest 문법을 사용할 수 있는데, 여기에도 타입을 지정할 수 있다.</p>

```ts
let arr: string[] = [];
let arr2: Array<string> = [];
function rest(...args: string[]) {}
```

### enum, keyof, typeof

<p>enum 은 타입의 객체라고 생각하면 되는데, 마치 객체에서 key 값을 불러와서 그것에 대한 value 를 사용하는것처럼 enum 은 value 가 타입이다.</p>

```ts
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
} as const; // 나는 이 타입을 정확하게 사용하겠다 하면 사용해주면 된다.

EDirection.Up;

(enum member) EDirection.Up = 0

ODirection.Up;

(property) Up: 0

```

<p>enum 은 자동적으로 0,1,2.. 숫자 타입이 부여가 된다. 물론 커스터마이징을 해줄 수 있으며, 좀 더 쉽게 생각하면 자바스크립트에서는 사라지는 객체라고 생각하면 된다. 사용방법은 객체와 거진 동일하다.</p><br />

<p>근데 사실 enum 을 쓰는 또 하나의 이유가 있는데, 아래 코드를 보면 체감할 수 있을 것이다</p>

```ts
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
```

- enum 과 달리 객체는 keyof 와 typeof 를 통해서 객체타입을 설정해주어야 한다.
- 또한 as const 가 없다면 제대로 타입 설정이 안되니 주의하자

### union, intersection

<p>union 은 아마 타입스크립트로 작성하다보면 정말 자주 사용하게 되는 타입이긴 하다. 다만 사용빈도가 많아지는것은 좋지 않다. 그래서 타입에 대해서 좀 더 엄격하게 처리할 필요성은 있다. 일단 유니온은 합집합 개념으로 생각하면 된다. string | number 라고 하면 숫자이거나 문자이거나 둘 다 와도 관계가 없다는 의미이다. 상황에 따라서 인자 타입이 변해야 하는 함수의 경우 유니온을 활용해서 처리할 수 있다. 다만 이렇게 되면 return 값에서 타입적으로 좋지 않은 상황이 오게 된다. 타입스크립트는 모든 경우의 수를 따지기 때문에, 결과 역시 숫자 아님 문자열이라고 판단한다. 명백하게 숫자인 경우라도 숫자 아님 문자라 판단하기에, 문자에서만 사용할수 있는 메서드 사용에 타입 오류를 발생하지 않을 수 있다. (다행이도 대부분은 잘못되었다고 타입이 잡아준다)</p><br />

<p>intersection 는 교집합이라고 생각하면 된다. 두가지 타입이라면 두 가지 타입 모두 만족해야한다. 모든 속성이 다 있어야 한다는 점을 기억하자.</p>

### interface, type

```ts
interface A {
  a: string;
}
interface A {
  b: string;
}
const obj1: A = { a: "hello", b: "world" };

// 밑에는 오류가 난다.
type B = { a: string };
type B = { b: string };
const obj2: B = { a: "hello", b: "world" };
```

### void

<p>함수의 return 값이 없거나 undefined 여야 만족하는 함수 타입이다. 근데 아래와 같은 상황이 벌어지게 된다.</p><br />

```ts
interface Human {
  talk: () => void;
}

// void 이기에 return 값이 존재하면 안되지 않나?
const human: Human = {
  talk() {
    return "abc";
  },
};
```

<p>여기서에 특징은 함수의 return 값이 void 인 것과, 전달받는 매개변수가 함수인경우, 메서드 인 경우로 나누어서 생각을 해야한다.</p><br />

```ts
function a(c: () => void): void {
  return "abc"; // error 발생
}

// 이 역시 return 값이 있어도 만족한다.
// 의미라면 결국 return 값이 업어야 된다가 아니라 사용하지 않겠다 라는 의미이다.
a(() => {
  return "3";
});

let b = a(() => {
  return "3";
}); // b 가 3이 아니라 void 가 된다.
// 강제로 바꿔주는 방법이라면
let c = a(() => {
  return 3;
}) as unknown as number;
```

<p>콜백으로 함수를 전달할 때 그 return 형식을 조금 정해주기 애매할 때 void 를 사용해주면 편리하다.</p><br />

```ts
declare function forEach(arr: number[], callback: (el: number) => void): void;

// 만약 콜백의 void 가 아닌 undefined 라면 에러가 발생한다.
// number 혹은 void 일 때 에러가 발생하지 않는다.
let target: number[] = [];
forEach([1, 2, 3], (el) => target.push(el));
```

<p>그러면 unknown 은 무엇일까. 우선 any 를 쓰지 말아야 하는 이유는 타입스크립트가 타입을 찾는것을 포기하게 된다. 반면 unknown 은 지금은 모르겠지만 나중에 직접 타입을 정해주어서 사용하겠다는 의미이기에 any 와는 다르다.</p><br />

```ts
try {
} catch (error) {
  // error 가 unknown 이다.
  (error as Error).message; // 타입을 Error 로 지정해주기. axios 면 AxiosError 등등..
}
```

### 타입가드

<p>타입스크립트는 모든 가능성을 열어두고 검토한다고 생각하면 된다. 그렇기에 타입을 지정할 때 union 의 상황에서 타입 가드를 활용해주면 좀 더 안전하게 타입을 정의할 수 있다.</p><br />

```ts
function numOrStr(a: number | string) {
  if (typeof a === "number") {
    a.toFixed(1);
  } else {
    a.charAt(3);
  }
}

function numOrnumArray(a: number | number[]) {
  if (Array.isArray(a)) {
    a.concat(4);
  } else {
    a.toFixed(2);
  }
}

numOrStr("123");
numOrStr(2);

numOrnumArray(3);
numOrnumArray([1, 2, 3]);
```

- class 인 경우도 살펴보자

```ts
class A {
  aaa(){}
}

class B {
  bbb(){}
}

function aOrb(param: A | B){
  if(param.instanceOf A){
    param.aaa();
  }
}

aOrb(new A()); // 인자로 인스턴스가 와야한다.


```

```ts
type B = { type: "b"; bbb: string };
type C = { type: "c"; ccc: string };
type D = { type: "d"; ddd: string };

// 값으로 구별하는것은 해보았으니, key 로 구별하는 방법이다.
function typeCheck(a: B | C | D) {
  if ("bbb" in a) {
    a.type;
  } else if ("ccc" in a) {
    a.ccc;
  } else {
    a.ddd;
  }
}
```

<p>때론 커스텀하게 타입을 구분해주는 함수를 직접 만들어야 한다. 아래는 is 를 활용한 예시이다.</p><br />

```ts
interface Cat {
  meow: number;
}
interface Dog {
  bow: number;
}
// 타입을 판별해준다. 이 함수는 강아지임을 찾아낸다.
function catOrDog(a: Cat | Dog): a is Dog {
  if ((a as Cat).meow) {
    return false;
  }
  return true;
}

function pet(a: Cat | Dog) {
  if (catOrDog(a)) {
    console.log(a.bow);
  }
}
```

<p>보이는 예제만으로는 잘 와닫지 않을 수 있는데, 쉽게 생각하면 is 는 어떠한 결과값의 범위를 정해준다고 생각하면 된다. 우리는 어떠한 처리를 하고 그에 대한 결과값이 미지수인 경우를 많이 마주하게 되는데, 대표적으로 promise 가 있다. 기본적으로 promise 는 실행 시 pending -> settled 로 전환이 되고, 이때 settled 는 resolved, rejected 로 나누어 지게 된다. 다만, 자바스크립트는 위 2가지 경우를 인지하지 않고 일단 setteled 로 판단한다.(모든 경우의 수). 그렇기 때문에 만약 여러 promise 요청 중 거절된 요청의 결과만을 배열로 담고 싶다면 아래와 같은 코드를 작성할 수 있다.</p><br />

```ts
// 거절 상황에 대한 타입 가드
const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => {
  return input.status === "rejected";
};

const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseResolvedResult<T> => {
  return input.status === "fulfilled";
};

const promise = await Promise.allSettled([Promise.resolve("a"), Promise.resolve("b")]);
const errors = promises.filter(isRejected);
// 실제 errors 의 타입은 기존 settled 에서 reject 로 변경이 된다.
// 다만 그냥 input.status === 'rejected' 를 함수로 대입하게 되면 타입 적용이 안된다.
```

### {} & Object

<p>모양이 객체처럼 되어있어서 객체인것 같지만, 사실은 모든 타입을 지향하고 있다(null 과 undefined 는 제외). 착각하지말고 진짜 객체는 소문자 object 이다. 그리고 앞에서 배운 unknown 의 경우 4.8 버전 이후부터는 null | {} | undefined 를 가리키게 된다.</p>

### 인덱스드 시그니쳐 & 맵드 타입

```ts
// 인덱스트 시그니처
type C = { [key in string]: number };

// 맵드 타입
type B = "Human" | "Mammel" | "Animal";
type A = { [key in B]: B };
```

### class 타입

<p>기본적인 클래스 타입 정의는 아래와 같다.</p><br />

```ts
class A {
  private a: string;
  b: number;

  constructor(A: string, B: number) {
    this.a = A;
    this.b = B;
  }
}

interface C {
  readonly a: string;
  b: string;
}

class B implements C {
  // 접근 못하게 하는 속성
  private a: string = "123";
  //
  protected b: string = "world";

  method() {
    console.log(this.a);
    console.log(this.b);
  }
}

class D extends B {
  method() {
    console.log(this.a); // private 는 상속받을 때 사용할 수 없다.
    console.log(this.b); // 예까지는 가능하다.
  }
}
```

- 실제 자바스크립트에서는 private, protected 모두 사라진다.

### 옵셔널, 제너릭

<p>옵셔널은 ? 로 표현하고 있어도 되고, 없어도 되는 타입에 대해서 사용하게 된다. </p><br />

```ts
let obj: { a: string; b?: string } = { a, b }; // a 만 와도 되고, 다만 c 가 오면 안된다.
```

<p>제네릭은 마치 타입을 변수로 대입한다고 생각하면 된다. 아래 예제를 살펴보도록 하자.</p><br />

```ts
// 이렇게 함수를 사용하면 1 + '2' 와 같은 상황이 올 수 있기에 문제가 될 수 있다.
function add(a: number | string, b: number | string): number | string {
  return a + b;
}

// 이렇게 타입을 변수로 넣어줄 수 있다.
// 사용자는 언제든 사용시 타입을 정해줄 수 있다.
function add<T>(a: T, b: T): T {
  return a + b;
}

add<number>(1, 2); // 3;
add<string>("1", "2"); // '12';

// 다만 위처럼 작성하면 T 의 범위가 너무 넓어져 버린다.
// 이럴떄 T 에 제한을 줄 수 있는데, extends 를 사용하면 된다.

function add<T extends number>(a: T, b: T): T;

// 상황에 따라선 매개 변수마다 다른 제한을 줄 수 있다.

function add<T extends number, K extends string>(a: T, b: K): T;

// 이런 제한사항들 중 대표적인것들은 아래와 같다.

// <T extends {...}>
// <T extends any[]>
// <T extends (...args: any) => any>
```

### 보충 정리

> **event.target 이 초점을 잃었을 때**

<p>이벤트를 등록할 때 사용되는 event 에 대한 타입을 적용하는 과정에서, customevent 를 생성할 때 event.target.dataset 으로의 접근이 되지 않는 상황이 발생한적이 있다. 아래 코드를 참고해보자</p><br />

```ts
  handleClick(event: Event) {
    // event의 target이 document, element, window등의 요소가 될 수 있기 때문
    // 정해둔 li 로만 설정하기
    if (event.target instanceof HTMLLIElement) {
      const value = event.target.dataset.tab;
      this.emit<{ value: string | undefined }>("@change", { value });
    }
  }


```

- 주석에 설명한대로 그냥 event.target.dateset 으로 접근하려 할 시 target이 document 인지 element 인지 확정이 되질 않기 때문에 타입오류가 발생한다.
- 타입스크립트는 모든 가능성을 고려해야 하기에, 문제가 없어보이는 코드에서도 오류가 발생하는데, 이러한 경우 범위를 축소시켜줌으로서 해결할 수 있다.
- 현재 접근하려는 DOM 요소를 명시해주면 해결된다. 현재는 <li> 요소이니 이에 맞게 instanceof HTMLLIElement 를 통해 조건을 걸어주면 된다.

> **class 보충 설명**

<p>상황은 이러하다. 2가지 유사한 view 를 담당하는 class가 있으며, 두 class 모두 View class 를 상속한다. 다만 서로 유사하기에 한가지 class 는 나머지 class 를 상속함으로서 사용하고자 한다. 다만 view 를 그려줄 template class 가 서로간의 차이점을 나타내고 있으며, 그렇기에 두 class 에서 template 를 인자로 전달받으려 한다. 이때 타입오류가 발생하였고 이를 해결한 코드는 다음과 같다.</p><br />

```ts
// KeywordListView.ts
export default class KeywordListView<T extends Template = Template> extends View {
  template: T;
  constructor(element = qs("#keyword-list-view") as HTMLElement, template?: T) {
    super(element);

    this.template = template ?? (new Template() as T);
    this.bindEvents();
  }
}
```

- template 인자가 존재한다면 제네릭을 통해 타입 T를 적용시킨다.
- 만일 인자가 없을 경우 new Template() 를 통해 내부 this.template 에 template 를 부여한다.
- T 의 범위를 Template 로 해준다. 이렇게 하지 않으면 T 와 기본값 Template 가 서로 연관되질 않는다
- 클래스 Template 는 다음과 같다.

```ts
export class Template {
  getEmptyMessage() {
    return `<div class="empty-box">추천 검색어가 없습니다</div>`;
  }

  getList(data: KeywordData[] = []) {
    return `
      <ul class="list">
        ${data.map(this._getItem).join("")}
      </ul>
    `;
  }

  _getItem({ id, keyword }: KeywordData) {
    return `
      <li data-keyword="${keyword}">
        <span class="number">${id}</span>
        ${keyword}
      </li> 
    `;
  }
}
```

- 이 다음 유사한 class는 다음과 같다.

```ts
export default class HistoryListView extends KeywordListView<KeywordTemplate> {
  constructor() {
    super(qs("#history-list-view") as HTMLElement, new KeywordTemplate());
  }
}

class KeywordTemplate extends Template {
  // 생략
}
```

- HistoryListView class 는 KeywordListView 를 상속받는다. 그리고 제네릭으로 template 에 적용해줄 KeywordTemplate 를 적용시킨다.
- 다음 인자로서 new KeywordTemplate() 를 넣어줌으로서 기본값으로 설정된 new Template() 적용을 막아준다.
- 주의할 점은 KeywordTemplate 는 Template 를 상속받는 클래스여야 한다는 점이다.
