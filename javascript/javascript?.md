## javascript 의 탄생

- 자바스크립트가 없던 시절에는 html 를 통해 문서화된 페이지를 anchor 태그로 이동하는 수준에서 웹 사이트가 구성되었다.
- 이에 사용자들은 사용자의 이벤트에 반응하는, 페이지를 동적으로 변화시켜야 하는 필요성을 느끼게 되었고(인터렉션), 어떠한 행동을 지시할 수 있는 프로그래밍 언어가 필요하게 되었다.
- 이에 넷스케이프사에서 개발한 livescript 가 동작하는 netscape navigator 라는 브라우저가 탄생하게 된다. 이 브라우저에는 livescript 를 해석하는 엔진이 있고, 이를 통해 사용자의 이벤트에 반응하는 웹 문서를 만들 수 있게 된다.
- livescript 는 인기있는 언어 java 를 활용하여 광고하기 위해 이름을 javascript 를 바꾸게 된다. 따라서 java 와 javascript 는 전혀 다른 언어다.
- 한편 마이크로소프트에서는 j스크립트 언어를 따로 만들게 되었고, 이를 해석할 수 있는 인터넷 익스플로러 브라우저를 만들게 되었다.
- 즉, 만약 문서를 javascript 를 통해 작성하였다면, 그리고 이 문서를 인터넷 익스플로러로 작동시킨다면 사실 익스플로러는 javascript 를 j스크립트로 변환시키게 된다.
- 개발자들은 결국 넷스케이프와 익스플로러 모두 작동하도록 문서를 작성했어야 했는데, 이는 상당히 번거로운 작업이었고, 넷스케이프는 자바스크립트의 표준 명세를 만들기 위해 ecma 에 기술명세를 제출하였으며, 결국 ECMAscript 가 나오게 되었다.
- 허나 익스플로러는 이 표준 명세를 지키지 않았고, 다른 브라우저들도 탄생하게 되면서 개발이 더욱 난해해지기 시작했다.
- 이에 jquery 가 탄생하게 되었고, 이를 활용하여 문서를 작업하면 이 라이브러리가 알아서 각 브라우저에 최적화를 설정해주었기에, 많은 사람들이 제이쿼리를 활용하게 되었다.
- 시간이 흘러 chrome 이라는 강력한 브라우저가 탄생하였고, 이 크롬은 ECMAscript 명세를 따르기 시작하면서, ECMAscript 의 발전으로 다른 브라우저들도 표준 명세를 따르기 시작하고 이에 jquery의 사용 빈도는 낮아지게 되었다.
- javascript 로 웹 이벤트를 다루기 위해서는 브라우저에서 제공하는 웹 API 를 활용하면 된다.

## 자바스크립트의 메모리 관리

<p>저수준 프로그래밍 언어인 C는 프로그래머가 메모리를 수동으로 할당하고 해제한다. 반면 자바스크립트는 프로그래머리르 위한 가비지 컬렉터가 있는데, 이렇게 자동으로 메모리 관리를 해준다고 하더라도 어떻게 코드를 작성하느냐에 따라 메모리 관리를 더 효율적으로 할 수 있게 된다. 이러한 방법에 대해서 간단히 알아보자</p>

### 메모리 누수와 원인들

- 메모리 누수는 프로그램에서 버려진 메모리를 해제하지 못한 경우를 말한다. 성능이 저하되기도 하고 프로그램 자체가 중단되기도 한다. 즉 가비지컬렉터가 제대로 작동하지 않는 경우에 한해서 발생한다.

### 객체에 대한 참조

```js
let foo = {
  bar1: memory() // 5kb
  bar2: memory() // 5kb
}

function clickEvent(){
  alert(foo.bar1[0])
}

```

- cilckEvnet 함수가 5kb 의 메모리를 사용할 것이라 기대할 수 있지만, 실제로 ba1 에 접근하기 위해 foo 객체 전체를 clickEvnet 함수 범위에 로딩을 해야한다
- 결과적으로 5kb 의 메모리 사용을 원했지만 원치않게 10kb 메모리 사용이 되어진다.

### DOM 메모리 누수

- DOM 항목을 가리키는 변수가 이벤트 콜백 외부에 선언된 경우라면 해당 DOM 항목을 제거하더라도 해당 항목은 여전히 메모리에 남게 된다.

```html
<div id="one">One</div>
<div id="two">Two</div>
```

```js
let one = document.getElementById("one");
let two = document.getElementById("two");

one.addEventListener("click", function () {
  two.remove();
  console.log(two); // 삭제 이후에도 html을 출력한다.
});
```

- 함수가 실행되면 two 요소는 사라지게 된다.
- 하지만 해당 DOM이 HTML 에서 사라지더라도 해당 DOM이 이벤트 콜백에서 사용됐다면 참조는 남는다.
- two 항목이 더 이상 사용중이 아닌 경우 이를 '메모리 누수' 라고 부른다.

```js
let one = document.getElementById("one");

one.addEventListener("click", function () {
  let two = document.getElementById("two");
  two.remove();
});
```

- 위처럼 이벤트 리스너 콜백함수 내부에서 DOM을 불러오는 방법으로 메모리 누수를 방지할 수 있다..

### window 전역 객체

<p>객체가 window 전역 객체에 포함되는 경우 해당 객체는 메모리에 존재하는 것이다. window는 브라우저에서 전역 객체이며 alert() 와 setTimeout()와 같은 다양한 내장 메소드를 지닌다. window의 속성으로 선언된 추가적인 객체는 모두 제거할 수 없다. window는 브라우저가 실행하는 데 필요한 객체이기 때문이다. 모든 선언된 전역변수는 window 객체의 속성으로 설정될 수 있다는 점을 기억하자.</p><br /><p>가능하면 전역변수는 사용하지 않는 것이 좋다. 전역변수를 사용하지 않음으로써 메모리를 절약할 수 있다.</p>

```js
var a = "apples";
b = "oranges";

console.log(window.a); // 'apples'를 출력한다
console.log(window.b); // 'oranges'를 출력한다.
```

### 객체 참조 제한하기

- 함수에 객체의 전체 범위가 아닌 필요 범위만 전달해야 한다. 즉 전체 객체가 아닌 필요 속성만 전달하도록 하자.
- 객체가 차지하는 메모리가 너무 크다면 하나의 속성을 사용하기 위해 전체 객체를 전달할 필요가 없기 때문이다.
- 함수에서 객체를 매개변수로 전달할 때, 필요 속성만 전달할 수 있도록 하자

```js
let test = {
  props1: "test",
};

function printProp1(test) {
  console.log(test.props1);
}

printProp1(test); // 필요한건 props1 인데 전체객체 test 를 가져오고 있다.
```

```js
let test = {
  props1: "test",
};

function printProp1(prop) {
  console.log(prop);
}

printProp1(test.props1); // 매개변수안에 필요한 객체의 속성만 전달하고 있다. 옳게 작성한 경우
```

<p>자바스크립트에서 메모리는 프로그래머에 의해 할당되지 않지만 여전히 메모리 누수 문제를 줄이기 위한 다양한 방법들이 있다. 객체가 참조 중이면 해당 객체는 메모리에 존재한다. 마찬가지로 HTML DOM 객체들은 삭제된 이후에는 참조돼서는 안된다. 마지막으로 함수에서 객체를 참조할 때 필요한 부분만 참조해야 한다. 전역변수를 선언할 때는 매우 조심해야 한다.</p>

### 변화 트렌드를 통한 방향 예측

<p>매년 ECMA Javascript 에서 스펙들이 추가되어가는 흐름이다. 즉 변화가 상당히 빠른 언어이며, 브라우저 언어라는 측면에서 자바스크립트는 표준을 잡기가 쉽지 않다. 현재는 대략적으로 5.0 을 기준으로 삼아서 개발을 하고 있다. 이 외 버전에 대해서는 바벨을 통해 해결해나가는 편이다.</p><br />

<p>자바스크립트는 함수가 가장 중요하며, 이 선언부분이 어떤식으로 발전해왔는지 살펴보도록 하자</p>

```js
// 함수

function myFunction1() {
  // 가변인자를 처리함을 내부 argument 로 확인했어야 했다.
  arguments.length; // 3
}

// 함수 시그너쳐만 보더라도 args 를 보고 이 함수는 가변인자를 처리하는 함수구나 라고 알 수 있다.

function myFunction2(a, b, ...args) {
  args.length; // 1
}

// 이제 인자의 초기값을 표현해주었기 때문에, 인자에 초기값이 무엇인지 알 수 있게 된다.
// 표현력이 증가되었다 생각할 수 있겠다.
function myFunction3(a = true, b = 2, ...args) {}

// 아래로 올수록 함수의 표현력이 더욱 좋아졌다는 것을 알게 된다.
// 암묵적에서 명시적으로 변하고 있다.
function myFunction4(a = false, { auto, async = false }) {}
```

- 기존 암묵적인 부분에서 명시적으로 변하는 과정이다.

```js
// 객체

// 새로운 객체에 값 대입하기
for (var attName in sourceObj) {
  targetObject[attName] = sourceObj[attName];
}

// 변화 1
// 빈 객체에 sorucerObj 부터 순서대로 merge 해가는 과정이다.
// 근데 메뉴얼 안보면 해석하기가 쉽지 않다.
targetObject = Object.assign({}, sourceObj, targetObj, obj2, obj3);

// 예를 들어

x = Object.assign(sourceObj, targetObj);
// 이런식이라면 기대하는것은 두 객체가 merge 된 새로운 x 인데
// 원본 sourceObj 에 targetObj 가 override 된 결과가 나타나게 된다.
// 올바르게 하려면
x = Object.assign({}, sourceObj, targetObj);

// 변화 2
// 확실히 x 는 두 객체가 merge 되는 x 가 생성됨을 알 수 있다.
x = { ...sourceObj, ...targetObj };

// 배열
// 이것 역시 concat 을 학습해야한다.
t = targetArr.concat(sourceArr);

// 변화2
// 확실히 앞에 target 이 나오고 그 다음 source 가 나온다는 것을 안다.
// 이런식으로 암묵적에서 명시적으로 변화가 이루어지고 있다.
t = [...targetArr, ...sourceArr];
```

- 객체와 배열 역시 절차형에서 점점 명시적으로 변해가는 과정이다.

```js
// class
// 기존에는 프로토타입을 통한 함수로 표현
// 함수 자체가 생성자 역할
// 이거 자체가 암묵적인것임. 함수중에서 이 함수가 생성자라는 것이 암묵적이다.
function Person(name) {
  this.name = name;
}

// 프로토타입에 직접적인 연결
Person.prototype.getName = function () {
  return this.name;
};

const person = new Person("원익");

person.getName(); // 원익

// 변화1
// 확실히 메서드 표현 역시 좋아졌다.
// 암묵적인 것이 명시적으로 되었다.
class Person {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

const instance = new Person("원익");

// 문제는 이렇게 인스턴스에서 getName 이 아닌
// 직접 name 에 접근하는것이 가능했다.
instance.name;

// 변화 2 (2020)
// 직접 name 에 접근하는것을 막아줄 수 있다.
// privite 메서드
class Person {
  #name;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }
}

const instance2 = new Person("원익");

instance2.#name; // 접근이 안된다.
```

- 기존 암묵적으로 허용되던 생성자 함수에서, 클래스라는 명시적인 문법이 추가되었다
- 앞으로 더 발전이 이뤄질 부분

```js
// 비동기
// 콜백
// 핸들링하기 어려운 구조
asyncTask(function (error, response) {});

//변화1
//promise
//콜백을 해소
function Task() {
  return new Promise((resolve, reject) => {
    //
    resolve("data");
  });
}

const p = Task();

p.then((data) => {
  console.log(data);
});

// 변화2
// await

function Task() {
  return new Promise((resolve, reject) => {
    //
    resolve("data");
  });
}

// async await 를 통해서 좀 더 직관적으로 표현이 가능하다.
// 동기적인 코드로 변경
// 기존 콜백 형태를 유지하던 promise 의 단점을 극복
async function task() {
  try {
    const resp = await Task();

    console.log(resp);
  } catch (err) {
    console.error(err);
  }
}
```

- 이외 타입스크립트의 적극적인 도입 분위기는 결국 좀 더 코드를 명시적으로 표현하기 위한 흐름이라 생각할 수 있겠다.
- 기존 자바스크립트에서는 해결할 수 없었던 데이터의 스펙에 있어서 타입스크립트는 타입을 명시할 수 있기 때문에 앞으로도 더 사용될 것으로 파악된다.
