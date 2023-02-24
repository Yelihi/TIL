<h2 align="center"> Javascript </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2023.1.3](#2023-1-3)
- [2023.1.16](#2023-1-16)
- [2023.1.18](#2023-1-18)
- [2023.1.29](#2023-1-29)
- [2023.2.7](#2023-2-7)
- [2023.2.22](#2023-2-22)
- [2023.2.23](#2023-2-23)

  <br />

![--------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="프로젝트소개"> :book: 간단한 요약 정리 </h2>

## 2023-1-3

### Array.prototype.sort()

- sort 메서드는 기본적으로 오름차순으로 정렬을 해준다. 또한 배열의 프로토타입 메서드이기에 배열에서 사용이 가능하다.
- 숫자만 되는것이 아니라 문자 역시 가능하고, 특수문자가 포함된것도 가능하다.
- 다만 사용자에 맞게 커스텀하게 사용이 가능한데, sort(func(a,b))) 처럼 내부 함수를 정의하여 순서를 처리해줄 수 있다.
- 인자 a,b 는 각각 배열의 인덱스 0,1 / 1,2 / 2,3 순으로 적용이 된다.
- 이 메서드의 return 값은 원본 배열이다. 새로운 배열을 return 하는것이 아닌것에 주의를 하자.

```js
arr.sort([compareFunction]);
```

- 내부 함수는 compareFunction 으로서 말 그대로 인자의 비교 함수
- 내부함수를 설정하지 않으면 요소를 문자열로 변환하고 유니 코드 코드 포인트 순서로 문자열을 비교하여 정렬된다.
- 주의할점은 숫자 또한 문자열로 변환한뒤 순서를 조정하기에 9보다 80이 앞에오는 상황이 발생한다.

```js
let arr = ["a", "c", "b"];
arr.sort(); // ['a','b','c']
```

- compareFunction(a,b) 에서 return 이 0보다 작다면 a 가 더 작은 index로 인식된다.
- 1 과 2 를 생각할때 우리가 당연하게 1보다 2가 크지 라고 생각하는것처럼 작동하는것이 아니다.
- 1과 2를 통하여 어떠한 로직을 실행시키고 그것에 대한 return 값이 음수라면 1을 2보다 작게 판단한다는 의미다.
- 그렇기 때문에 보통 오름차순을 사용할 때 sort((a,b) => a-b) 로 표현하는 것이다.
- 이 내부함수의 return 값이 음수라는 것은 a가 b 보다 작을 때 발생하는 것일 테고, 의도한대로 나열이 될 것이다.
- 반대로 compareFunction(a,b) 에서 return 이 0보다 크다면 a 가 더 큰 index로 인식된다.

```js
compareFunction(a,b){
  if(a - b < 0){
    return -1
  }
  if(a - b > 0){
    return 1
  }
  if(a == b){
    return 0
  }
}
```

- 주목할 점은 sort 는 index 순서를 결정하는 메서드다. 인자(숫자일경우)의 큰수 작은수의 값을 비교하는 것이 아니다.
- return 값이 0 이라면 서로의(a,b) index 를 변경하지 않는다. 0 일 경우 다른 로직을 주어서 또 다른 index 나열을 결정할 수 있다.
- 예시로서 단어의 특정 index 를 기준으로 정렬하되, 만약 특정 index 의 문자가 같다면 전체 단어의 순서대로 정렬하는 문제다.

```js
function solution(strings, n) {
  let answer = strings.sort((a, b) => {
    // 특정 인덱스의 문자가 같다면, 문자를 비교하여 오름차순으로 정렬
    if (a[n] === b[n]) {
      if (a < b) {
        return -1;
      }
      return 1;
    }
    // 특정 인덱스의 문자에 대해 오름차순 정렬
    if (a[n] < b[n]) {
      return -1;
    }
    return 1;
  });
  return answer;
}
```

<br />

### .isNaN() & Number.isNaN()

<p>기본적으로 NaN 은 산술연산이 정의되지 않았거나 수로 표현할 수 없는 결과를 도출하면 생성되게 된다. NaN 을 판별하는 방법은 다음과 같다</p>

- 둘 다 NaN 인지 아닌지를 판별해주는 메서드이다.
- 사실 NaN === NaN 이 false 라는 것을 이용해서 함수를 활용할 수도 있다.

```js
function validNaN(v) {
  return v !== v; // true 이면 NaN 이다.
}
```

- 기본적으로 typeOf 로 NaN 을 구별하는것은 좋지 않기에, 위 두 메서드를 활용한다
- isNaN(a) 의 경우 a 를 강제로 Number 타입으로 변환시킨 뒤, NaN 인지 아닌지를 판단한다. NaN 이면 true, 아니면 false 를 반환한다.
- isNaN의 경우 주로 코딩테스트일때 조건문으로 활용하곤 하였는데, 왜냐하면 자동적으로 a 를 Number(a) 적용시키면서 NaN 여부를 따지기 때문이다.
- 예를 들어 '1234a' 의 경우 숫자 타입이 아님에도 불구하고, Number('1234a') 가 NaN 이기 때문에 true 를 반환한다.
- 반면 Number.isNaN(a)는 더 엄격하게 적용되는데, a 가 우선 숫자 타입이여야 한다. 위 예제처럼 아니라면 무조건 false 가 반환된다.

## 2023-1-16

### javascript 의 탄생

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

## 2023-1-18

### 자바스크립트의 메모리 관리

<p>저수준 프로그래밍 언어인 C는 프로그래머가 메모리를 수동으로 할당하고 해제한다. 반면 자바스크립트는 프로그래머리르 위한 가비지 컬렉터가 있는데, 이렇게 자동으로 메모리 관리를 해준다고 하더라도 어떻게 코드를 작성하느냐에 따라 메모리 관리를 더 효율적으로 할 수 있게 된다. 이러한 방법에 대해서 간단히 알아보자</p>

> **메모리 누수와 원인들** > <br />

- 메모리 누수는 프로그램에서 버려진 메모리를 해제하지 못한 경우를 말한다. 성능이 저하되기도 하고 프로그램 자체가 중단되기도 한다. 즉 가비지컬렉터가 제대로 작동하지 않는 경우에 한해서 발생한다.

> **객체에 대한 참조** > <br />

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

> **DOM 메모리 누수** > <br />

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

> **window 전역 객체** > <br />

<p>객체가 window 전역 객체에 포함되는 경우 해당 객체는 메모리에 존재하는 것이다. window는 브라우저에서 전역 객체이며 alert() 와 setTimeout()와 같은 다양한 내장 메소드를 지닌다. window의 속성으로 선언된 추가적인 객체는 모두 제거할 수 없다. window는 브라우저가 실행하는 데 필요한 객체이기 때문이다. 모든 선언된 전역변수는 window 객체의 속성으로 설정될 수 있다는 점을 기억하자.<br />가능하면 전역변수는 사용하지 않는 것이 좋다. 전역변수를 사용하지 않음으로써 메모리를 절약할 수 있다.</p>

```js
var a = "apples";
b = "oranges";

console.log(window.a); // 'apples'를 출력한다
console.log(window.b); // 'oranges'를 출력한다.
```

> **객체 참조 제한하기** > <br />

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

## 2023-1-29

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

## 2023-2-7

### 배열과 객체

```js
const arr1 = new Array();
const arr2 = [];
const arr3 = [1, 2, 3, 4, 5];
const arr4 = new Array(5);
```

- 위는 기본 배열을 설정하는 방법이다.
- 요소가 많은경우, 그리고 이를 초기값으로 하기 위해서는 아래와 같다

```js
const arr5 = new Array(10).fill(5); // [5,5,5,5,5,5,5,....]
```

- 일정 값이 아닌 로직을 주고싶다면 from 을 활용하면 된다.

```js
const arr6 = Array.from(Array(5), function(v, k) => {
  return k + 1;
}) // [1,2,3,4,5]

```

- 함수 첫번째인자는 배열값이고, 두번째 인자는 인덱스를 기리킨다.

> **배열의 편리한 함수**

- 배열 요소들을 합쳐서 문자열로 표현

```js
arr.join(""); // 12345 이런식으로 합쳐줌
```

- 두 배열을 합칠떄는 concat 이용

```js
const arr = [5];
const arr2 = [1, 2, 3, 4];
arr2.concat(arr); // [1,2,3,4,5]
```

- 배열 끝에 요소를 추가하거나 배열 끝 요소를 삭제하는 방법

```js
arr.push(6);
arr.pop(); // 마지막 요소 삭제
```

- 배열 첫번째 요소를 추가하거나 첫번째 요소를 삭제하는 방법

```js
arr.shift(); // 앞의 인덱스값 삭제
arr.unshift(10); // 맨 앞에 10 추가
```

- 이들의 특이점은 시간복잡도가 상수다. 유리하니 잘 활용해보자
- 이제 중간 요소를 자르고 싶다면 slice 를 활용할 수 있다. 원본 배열을 건드리지 않는다.

```js
arr.slice(2, 5); // 2번 인덱스부터 4번 인덱스까지 자르게 된다.
arr.splice(2, 3); // 2번 인덱스 부터 3개의 요소를 삭제하게 된다.
```

- 배열의 순회는 for 문을 이용하거나 for of 문법을 이용하면 된다.

> **배열의 타입은 객체다**

```js
console.log(typeof arr); // Object
arr["key"] = "value"; // 실제 추가가 가능하다.
console.log(arr.length); // 허나 객체가 추가된 부분은 길이에 추가되지 않는다.
```

- 위와 같은 추가 방식은 사용하지 않도록 하자

> **객체**

```js
const obj1 = new Object();
const obj2 = {};
const obj3 = { name: "wonik", comapany: "none" };
obj["email"] = "yelihi19@gmail.com";
obj.phone = "01022223333";

delete obj.phone; // 삭제

console.log("email" in obj); // true
```

- key 와 value 의 집합 구하기

```js
Object.keys(obj);
Object.values(obj);
```

- 객체를 순회하는 방법으로 for in 이 있다. 객체의 key 값을 순회하게 된다.

## 2023-2-22

### commonJS 와 ESmodule 의 차이점

<p>이전 모듈 시스템이 정착되지 않았을 때에는 자바스크립트 스크립트 파일 전체를 로드시켜야 라이브러리 사용이 가능했다. 부분적인 기능만을 사용한다 하더라도 결국은 전체를 로드해야 하기에 여간 불편한 것이 아니었다.</p><br />

<p>그러다 commonJS 가 등장하게 되고, node.js 에서 우리가 흔하게 보던 require 함수를 통해서 라이브러리의 일부분을 원하는 대로 가져와 사용할 수 있었다. 이전보다 너무나도 편리해지기 시작한 것이, 수천 수만개의 자바스크립트 파일로 분리를 하는 것이 가능해졌다는 점이다. 또한 파일 단위로 자바스크립트를 작성하여 이를 어디서든 require 해서 사용할 수 있게 된 점이 핵심이다. 이로 인해 손쉬운 라이브러리 개발이 가능해졌다.</p><br />

```js
const fs = require("fs");
const lodash = require("lodash");

const { add } = require("/add.js");
```

<p>이렇기에 현재 node.js 에서 활발하게 commonJS 가 활용되고 있다. 이러면 의문이 들텐데, 우리는 이미 import 를 사용하고 있는데 왜 commonJS 가 사용된다고 알고 있는 것일까? 그 이유는 TSC/Babel 에 의해 자동의로 트랜스파일링 되고 있기 때문이다.</p></br>

```js
import React from "react";

// 트랜스파일링

const React = require("react");
```

- 이렇게 자동으로 변환이 되게 된다.
- 즉 우리가 기존까지 쓰고 있던 import 문은 가짜였다!
- 사실 우리는 여전히 commonJS 를 사용하고 있다.

<p>하지만 이 commonJs 의 문제점도 존재하는데, 우선 require 는 말그대로 함수이기에, 조건문에 넣어서 조건에 따라 참조할 수 있기에 정적 분석에 어려움이 생겼다. 거기에 언어 표준이 아니기에, 브라우저나 deno 같은 환경에서는 사용할 수 없다.</p><br />

```js
if(some condition){
  fs = require('fs')
}
// 삼항연산자에 사용
require(some condition ? 'goo' : 'bar');

// 변수에 저장해서 사용
const originalRequire = global.require;
originalRequire(...)

```

- 위 처럼 require 가 분석하기 어렵게 사용될 수 있다.

<p>그 외 비동기 모듈을 정의하는것이 불가능하다는 점과 조용한 대입이 가능하다는 점에서 이러한 문제점을 가지게 된다.</p><br />

```js
let initialized = false;

export.initialize = async function initialize(){
  if(initialized){
    throw new Error('이미 initialize 되엇음')
  }

  await connectToDB();
  initialized = true;
}

export.readFromDB = async function readFromDB( ... ) {
  if(!initialized){
    throw new Error('먼저 초기화 하세요')
  }
  ...
}
```

- 예를 들어 DB에서 무엇인가를 읽는 동작을 모듈로서 사용하겠다고 하자
- 데이터베이스에 접근하기위해서는 먼저 데이터베이스와 연결이 되어야 하는데, commonJS의 경우 비동기를 지원하지 않기 때문에 위 처럼 매번 초기화과정을 검사해야한다.
- 만일 initialized 조건이 없다면 connectDB를 하기전에 readFromDB 로 먼저 진행이 될 것이다.

<p>이러한 문제들을 해결하기 위해 ECMAScript Modules (ESM) 이 추후 등장하게 된다. 우리가 흔히 쓰고 있는 import export 문이 ESmodule 이라고 생각하면 된다. ESmodule 의 특징이라면 우선 정적분석이 쉬워진다 </p>

```js
// 틀린 코드1
if(some condition){
  import React from 'react'
}
// 틀린코드2
import something from Condition ? 'foo' : 'bar';

// 틀린코드3
const originalRequire = import;
```

- 이를 통해 파일이 어떤 모듈을 참조하는지 쉽게 알 수가 있다.
- 또한 import 라는 부분이 키워드이기 때문에(if,for와 같은 것) 변수에 저장하거나 할 수 없다.

<p>그리고 비동기적으로 작동하기때문에 좀 더 쉽게 비동기 모듈을 사용할 수 있다.(Top-level await)</p><br />

```js
const db = await connectToDB();

export async function readFromDB(){
  await db.read();
}

export async function writeToDB(){
  await db.write(...);
}

```

- 먼저 연결한 다음 호출을 할 수 있게 해준다.

<p>그 외 브라우저,deno 등에서도 쉽게 사용할 수 있게 된다. 언어 표준이기 때문이다. 그래서 최근에는 좀 더 ESM 쪽으로 가는 추세이긴 하다. 다만 이러한 변화 과정에서 우리는 오류를 경험하곤 한다.</p><br />

| CommonJS        | ESM           |
| --------------- | ------------- |
| require         | import        |
| 정적분석 어려움 | 정적분석 쉬움 |
| 동기            | 비동기        |
| 언어표준이 아님 | 언어표준이다  |

<p>ESM 으로 변경하는 과정에서 나오는 오류들의 이유는 결국 동기와 비동기와의 관계에 있다. 비동기 함수에서 동기 함수를 호출하는것은 쉽다. 하지만 반대로 동기함수에서 비동기 함수를 호출하는것은 동기함수가 비동기가 되어야지만 가능하기에 어렵다.</p><br />

<p>다시 돌아와 살펴보면 CommonJS 에서는 ESM 을 사용하기 어렵고, 반대로 ESM 환경에서는 CommonJS 를 사용하기가 편하다.</p><br />

<p>commonJS 환경에서는 예를 들어 react 를 import 하는것은 쉽게 가능하지만, ESM 에서 require 를 사용하는것은 에러가 발생한다. (Error: require() of ES Module)</p><br />

<p>결국 이를 해결하려면 기존 commmonJS 를 모두 ESM 으로 변경하면 된다. 근데.. 이게 어렵다. 일단 이론적으로 어떻게 변경하면 되는지 살펴보자</p><br />

### node.js 에서 ESM 으로 변경하기

```js
// package.json
{
  ...
  "type" : "module",
}

```

- 우선 package.json 에서 타입을 모듈로 변경해준다.
- 이렇게 되면 모든 자바스크립트 파일은 ESM 을 따른다.
- 두번째 규칙은 .cjs 는 항상 commonJS, .mjs 는 항상 ESM 이다.
- 타입이 모듈이라 할지라도 .cjs 는 항상 commonJS 로 작동하게 된다. (현재로서는 반드시 commonjs 여야 한다면 사용할 수 있다)

### ESM 으로의 변경이 어려운 이유

<p>어려운 이유는 크게 2가지로 볼 수 있다.</p><br />

- 우리가 사용하는 가짜 ESM
- 성숙하지 않은 생태계 (많은 라이브러리들이 ESM 을 지원하지 않는다.)

<p>우선 우리가 사용하는 import문의 문제점은 무엇일까</p><br />

```js
// 잘못된 것
import { Component } from "./com";

// 옳은 표현 (확장자가 되어야 한다)
import { Component } from "./com.js";
```

- require 는 친절하게도 확장자가 없어도 저 이름에 대해서 모두 검색해서 적합한 주소를 찾아준다
- 다만 이렇게 되면 역시나 시간 낭비이기에 정확하게 확장자를 작성해주어야 하고, 실제로 ESM 은 반드시 확장자를 작성해야 한다.

<p>두번째는 성숙하지 않는 생태계인데, 타입스크립트의 경우도 문제가 있다. 위에서 정확한 주소를 가져와야 한다고 했는데, 타입스크립트 파일이라면 확장자가 .ts 이고 그러면 저 확장자로 적어주는게 맞지 않을까 싶지만 오류가 발생하고 .js 로 해야한다. 오류는 나지 않지만 별로 추천되는 방향이 아니기에 문제다.</p><br />

<p>commonJS 를 의존하는 라이브러리 역시 문제다. jest가 대표적이다. 이렇게 되면 선택적으로 옮겨야 하는 데 어떤 서비스를 옮길 수 있는지 확인해보자.</p>

- typescript 를 사용하지 않을 때(또는 .js 써도 괜찮을 때)
- next.js 가 아닌 기본 react,emotion 등의 라이브러리들
- Jest, Yarn PnP 등을 사용하지 않을 때

## 2023-2-23

### monkey patching

<p>monkey patching 은 다른 개발자가 작성한 코드를 변경하지 않고, 해당 코드의 기능을 변경하거나 추가할 수 있는 기술이다. 마치 선언된 객체를 직접 수정하지 않아도, 외부에서 객체내부를 변경할 수 있는것과 같다. 장점이라면 다음과 같다 </p>

- 기존 코드를 수정하지 않고 라이브러리를 확장하고 개선할 수 있다.
- 라이브러리에서 제공하지 않는 기능을 추가하거나 기존 기능을 수정할 수 있다.
- 프레임워크나 라이브러리의 버그를 우회할 수 있다.

<p>상황에 따라 사용하는 기능에 대한 맞춤 수정이 가능하다는 점. 그러나 그 수정이 원본을 건드는것이 아니라는 점에서 유용하게 사용되곤 한다.</p>

```js
// 기존의 메서드에 기능을 추가하기
const originalFunc = Math.random;
Math.random = function () {
  console.log("Math.random()가 호출되었습니다.");
  return originalFunc.apply(this, arguments);
};

// 새로운 메서드 추가하기
Array.prototype.average = function () {
  let sum = 0;
  for (let i = 0; i < this.length; i++) {
    sum += this[i];
  }
  return sum / this.length;
};

// 메서드의 동작 변경하기
const originalSetTimeout = setTimeout;
setTimeout = function (callback, delay) {
  console.log(`setTimeout가 ${delay}ms 후 실행됩니다.`);
  originalSetTimeout(callback, delay);
};

// 기존 메서드를 저장하고 변경된 메서드에서 기존 메서드를 호출하도록 하여 기능을 추가하거나 변경할 수 있다.
// 새로운 메서드를 prototype에 추가하여 기능을 확장할 수 있다.
```

- 좀 더 설명하자면

```js
// 다른 사람이 개발한 함수
function add(x, y) {
  return x + y;
}

// monkey patching 을 통해 기존 함수에 기능 추가
const originalAdd = add; // 기존 함수 저장

add = function (x, y) {
  const result = originalAdd(x, y);
  console.log(`변경`);
  return result;
};

add(2, 3); // '변경'
```

- add 를 변경하기 위해 기존 add 를 originalAdd 에 저장한다
- 기존 add 에 console.log('변경')을 추가
- 변경된 add 사용이 가능하다
- 주의할점은 반드시 기존 함수를 따로 저장해놓아야 한다. 아니면 함수 호출 시 무한 반복되는 상황이 발생할 수 있다.

<p>다만 너무 남용하면 코드의 유지보수성을 해치는 문제가 발생할 수 있기에 신중하게 사용해야한다.</p>
