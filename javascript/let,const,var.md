## let,const 와 var 의 차이점

간단하게 정리하자면 var 는 함수스코프를 가지며, let,const 는 블록스코프를 가진다. 다른말로 하자면 함수 내부 var 로 선언된 변수는 외부에서 접근할 수 없으며, 블록 내부 let,const 로 선언된 변수는 외부에서 접근할 수 없다. <br />

```js
function foo() {
  // All variables are accessible within functions.
  var bar = "bar";
  let baz = "baz";
  const qux = "qux";

  console.log(bar); // bar
  console.log(baz); // baz
  console.log(qux); // qux
}

console.log(bar); // ReferenceError: bar is not defined
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined

if (true) {
  var bar = "bar";
  let baz = "baz";
  const qux = "qux";
}

// var declared variables are accessible anywhere in the function scope.
console.log(bar); // bar
// let and const defined variables are not accessible outside of the block they were defined in.
console.log(baz); // ReferenceError: baz is not defined
console.log(qux); // ReferenceError: qux is not defined
```

<br />

추가적으로 자바스크립트는 변수가 호이스팅 되는 성질이 있는데, 달리 말하면 마치 선언된 변수들이 스크립트 최상단에 끌어올려지는 현상이라고 할 수 있다. 정확히는 실행 컨택스트 내 환경정보로서 변수가 바인딩 되는것 <br />

사실 var, let, const 모두 호이스팅 현상이 발생하는데, let,const 의 경우 자바스크립트의 변수 초기화가 선언과 동시에 이루어지지 않는다. 따라서 var 와 달리 참조오류를 발생한다. <br />

> **TDZ(Temporal Dead Zone) : 선언은 되어있지만 아직 초기화가 되지않아 변수에 담길 값을 위한 공간이 메모리에 할당되지 않은 상태**

<br />

```js
console.log(foo); // undefined

var foo = "foo";

console.log(baz); // ReferenceError: can't access lexical declaration 'baz' before initialization

let baz = "baz";

console.log(bar); // ReferenceError: can't access lexical declaration 'bar' before initialization

const bar = "bar";
```

<br />

var 변수는 웃긴게 중복 선언해도 오류가 발생하지 않는다 <br />

```js
var foo = "foo";
var foo = "bar";
console.log(foo); // "bar"

let baz = "baz";
let baz = "qux"; // Uncaught SyntaxError: Identifier 'baz' has already been declared
```

<br />

let 과 const 의 차이라면 값의 재할당 여부라고 할 수 있다. 키워드에서 알 수 있듯이 const 는 상수이다. 따라서 재할당이 되지 않는다. 물론 할당된 값이 call by reference 라면 내부 프로퍼티는 언제든 수정이 된다.
