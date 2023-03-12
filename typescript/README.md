<h2 align="center"> Typescript </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2023.2.26](#2023-2-26)
- [2023.3.12](#2023-3-12)

  <br />

![--------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 2023-2-26

### 타입스크립트를 학습하는 이유

<p>타입스크립트를 적용시키는 가장 중요한 이유라면, 바로 프로그램의 안정성을 상승시키기 위해 타입스크립트를 사용한다. 타입스크립트는 황당한 에러들을 많이 줄여준다. 다만, 자바스크립트보다 자유도가 줄어들게 된다. 그래도 에러 안나는게 훨씬 좋으니깐 이득이 훨씬 많다.</p> <br />

<p>주의할 점은 타입스크립트는 최종적으로 자바스크립트로 변환된다. deno 라는것은 타입스크립트를 바로 실행을 할 수 있지만, 이건 좀 예외로 하자. 자바스크립트로 변환을 한다고 했는데, 자바스크립트를 브라우저마다 다른 버전을 사용할 수있고, 이를 tsconfig 에서 바꿔줄 수 있다.</p>

- typescript는 언어이자 컴파일러(tsc)이다. 컴파일러는 ts 코드를 js로 바꿔준다.
- tsc는 tsconfig.json(tsc --init 시 생성)에 따라 ts 코드를 js(tsc 시 생성)로 바꿔준다. 인풋인 ts와 아웃풋인 js 모두에 영향을 끼치므로 tsconfig.json 설정을 반드시 봐야한다.
- 단순히 타입 검사만 하고싶다면 tsc --noEmit 하면 된다
- ts 파일을 실행하는 게 아니라 결과물인 js를 실행해야 한다.

<p>보통 타입스크립트는 노드가 필요한데, 우선 폴더에 npm init -y(전부 yes 하겠다는 의미)를 통해 준비를 끝내고 타입스크립트를 설치해주자. 이후 npx tsc -init 을 통해서 tsconfig.json 까지 설정해주면 준비가 끝났다.</p>

## 2023-3-12

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
