## module 의 필요성

웹사이트를 제작한다면, 로그인창부터 시작해서 아티클 섹션, 피드 등등 여러 인터렉션이 필요한(즉, 자바스크립트가 필요한) 상황이 발생한다. 만약 우리가 이러한 기능 전부를 하나의 index.js 파일에서 관리한다면 불리할 점이 많다. <br />

- 첫 index.js 를 load 하는데 많은 시간과, 굳이 현재 인터렉션에 관련없는 자바스크립트 코드까지 load 해야한다는 문제가 발생한다
- 어떤 버그가 발생했을 때, 예를 들어 로그인 과정에서 버그가 발생했다 치면 이를 해결하기위해 전체 index.js 파일을 수정해야한다.

<br />

이러한 문제점들을 개선하고자 하나의 실행단위로서 독립적인 모듈을 활용할 필요성이 있다. 자바스크립트는 .js 파일을 생성하면 자동적으로 이 파일 자체를 독립적인 모듈로서 동작하게끔 되어있다. 즉, 예전 index.js 를 user.js, cart.js, fedd.js 등으로 나눈 모듈로 관리할 수 있다는 점이다.

## Module System

모듈 시스템이란 모듈을 만들고, 불러와 사용할 수 있도록 도와주는 시스템이다. <br />

1. common JS (CJS)

```js
// math.js

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

// module 이라는 내장 객체
// 안에는 exports 라는 프로퍼티가 존재
module.exports = {
  add,
  sub,
};

// index.js

// require는 내장함수
const { add, sub } = require("./math.js");

console.log(add(1, 2));
console.log(sub(2, 1));
```

2. ES Module (ESM)

- pakage.json 에서 "type":"module" 먼저 설정해주자
- 이 설정은 이제 ESM 을 사용할 것이며 CJS 를 사용하지 않겠다는 의미이다.
- 그렇기 때문에 실제 실행시켜보면 require 가 정의되어 있지 않다고 에러가 발생한다.

```js
// math.js
export function add(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}

// math.js 의 기본값
export default function multi(a, b) {
  return a * b;
}

// index.js
import { add, sub } from "./math.js";
import multi from "./math.js";

console.log(add(1, 2));
console.log(sub(2, 1));
console.log(multi(3, 4));
```
