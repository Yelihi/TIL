## 실행 컨텍스트

<p>실행 컨텍스트는 <strong>실행할 코드에 제공할 환경 정보들을 모아놓은 객체</strong>를 뜻합니다. 여기서 환경정보는 무엇일까요? 환경정보는 실행할 코드에 사용될 변수나 선언된 함수, this 의 정보등을 뜻합니다. 이러한 실행 컨택스트는 자바스크립트의 콜 스택에서 하나하나 순차적으로 전역 컨택스트 -> 실행 컨택스트1 -> 실행 컨택스트2 순으로 쌓이게 되며 그 실행은 반대로 이루어지게 됩니다. 즉, 제일 위에 쌓인 실행 컨택스트가 가장 먼저 실행을 마무리 하게 됩니다. 이러한 실행컨택스트는 보통은 처음 자동으로 생성되는 전역공간을 제외하면 함수가 실행될 시 생성이 됩니다.</p><br />

<p>실행 컨택스트는 자바스크립트 엔진이 활용할 목적으로 생성하기에 직접 코드로는 볼 수 없습니다. 실행 컨택스트를 구성하는 3가지 요소가 있습니다.</p>

- VariableEnviroment : 현재 컨텍스트 내 식별자들의 대한 정보 + 외부 환경 정보. 선언 시점의 LexicalEnviroment 의 스냅샷입니다.
- LexicalEnviroment : 변경사항이 실시간으로 반영됩니다. 현재 컨택스트는 어떠한 식별자가 있으며, 외부 정보는 어딜 참조해야하는지 사전식으로 설명합니다.
- ThisBinding : this 식별자가 바라보아야 할 대상 객체.

<p>중요한 부분은 LexicalEnviroment 입니다. 초기 LexicalEnviroment 는 VariableEnviroment 와 동일합니다. LexicalEnviroment 의 경우 2가지 특성을 지닌 정보를 가지게 되는데, 각각 enviromentRecord, outerEnviromentReference 입니다. 이제 각각에 대해 살펴보겠습니다.</p><br />

### enviromentRecord

<p>현재의 컨텍스트의 관련 식별자 정보들이 저장됩니다. var 키워드로 선언한 변수(let,const 도 저장은 되지만 초기화가 되어있지 않습니다), 함수 선언문이 저장됩니다. 수집하는 과정은 위부터 아래로 순차적으로 읽으면서 수집합니다. 하나의 코드 예시를 통해 살펴보겠습니다.</p><br />

```js
fucntion a(x){
  console.log(x);
  var x;
  console.log(x);
  var x = 2;
  console.log(x);
}

a(1);
```

<p>enviromentRecord 를 다룰 때 항상 같이 설명되는 부분이 호이스팅이라는 개념입니다. 사실 호이스팅은 enviromentRecord 를 더 쉽게 설명하기 위한 개념이며, 마치 선언된 식별자나 함수 선언문이 코드 위로 끌어올려지는것과 같은 현상이 발생한다고 해서 호이스팅이라 합니다. 그럼 위 예제 코드에서 호이스팅은 어떻게 이루어질까요?</p><br />

<p>우선 콜스택에 처음 전역 컨택스트가 실행이 됩니다. 전역 컨택스트의 LexicalEnviroment 의 enviromentRecord 에는 함수 선언문 function a 가 저장이 됩니다. 이후 코드가 실행되다가 a(1) 를 통해 함수 a 를 호출합니다. 이렇게 되면 실행 컨택스트 a 가 생성되고, 콜스택 위로 쌓이게 되어 잠시 전역 컨택스트의 실행이 중단이 됩니다. 그 다음 함수 a 가 실행이 되는데, 이 때 위 코드대로라면 순서대로 1, undefined, 2 가 나올것으로 예상하실 것입니다. 하지만 결과는 이와 다릅니다. 호이스팅이 발생하게 되면서 변수 선언인 var x 부분이 다 코드 위로 올라간다고 가정해야합니다. 단, 할당부분은 위로 올라가지 않습니다. 또한 인자로 넘겨준 1 의 경우 var x = 1 로 볼 수 있을 것입니다. 이렇게 될 경우 가상의 코드지만 아래처럼 작동하게 될 것입니다.</p><br />

```js
function a() {
  var x;
  var x;
  var x;

  x = 1;
  console.log(x); // 1
  console.log(x); // 1
  x = 2;
  console.log(x); // 2
}

a(1);
```

<p>신기한 과정입니다. 선언부분은 모두 상위위치를 이동되면 할당부분은 기존 위치에서 할당을 하게 됩니다. 따라서 결과는 1,1,2 가 찍히게 됩니다. 또 다른 예시를 살펴보겠습니다. 이번 예시에서는 특히 함수의 선언문과 표현식의 차이점이 명확하게 나타나는 것을 확인하실 수 있습니다.</p><br />

```js
console.log(sum(2, 3)); // 5
console.log(multi(2, 3)); // error

function sum(a, b) {
  return a + b;
}

var multi = function (a, b) {
  return a * b;
};
```

<p>sum 은 함수 선언식이며 multi 는 함수 표현식입니다. 함수 선언문의 경우 eviromentRecord 에 함수식별자와 함께 함수식도 같이 저장됩니다. 그래서 아래에서 선언되었지만 함수로서 활용할 수 있게 됩니다. 반면 표현식은 말그대로 함수 값이 할당된 것이기 때문에, 할당 부분은 호이스팅 되지 않습니다. 그래서 위의 예제 코드를 호이스팅이 적용되었다고 가정했을 시의 상황으로 표현해보겠습니다.</p><br />

```js
var sum = function sum(a, b) {
  return a + b;
};

var multi;

console.log(sum(2, 3));
console.log(multi(2, 3));

multi = function (a, b) {
  return a * b;
};
```

<p>결국 위 코드 처럼 선언문은 전체가 호이스팅되며, 표현식은 변수 식별자만 호이스팅이 되어 함수 실행을 할 수 없었습니다.</p><br />

<p>이 부분이 시사하는 바는 큽니다. 이러한 현상이 우리가 함수 선언문의 사용을 자제해야 하는 이유이기도 하기 때문이죠. 함수 선언문은 그 위치가 어디에 있던지 실행 컨택스트 내 enviromentRecord 에 저장이 됩니다. 그 말은, 만일 전역에 첫째줄에 함수 sum 이 선언되었다고 가정하겠습니다. 이후 1000번째 코드줄이 실행이 되고 그 다음 개발자가 sum 의 존재를 잊어버려서 새로운 sum 을 선언하게 됩니다. 이때 함수선언문을 통해 선언하였기 때문에, 전역 컨택스트가 생성이 될 때 가장 위의 sum 으로 덮어씌어지게 됩니다. 즉 맨 위부터 모든 sum 은 변경된 sum 함수가 적용이 되어버리게 되는것입니다. 엄청난 오류를 발생시킬 수 있습니다. 만약 호출식이었다면 의도한 대로 호출된 시점 이후부터 새로운 sum 이 적용이 될 것입니다. 그렇기에 되도록이면 함수 호출식으로 함수를 생성하도록 합시다.</p><br />

### outerEnviromentReference 와 스코프

<p>스코프는 변수를 식별할 수 있는 범위를 뜻합니다. 변수를 식별하는데 범위가 존재하는가에 대한 대답은 그렇다입니다. 아래 간략한 코드를 살펴보겠습니다.</p><br />

```js
var a = 2;
function outer() {
  function inner() {
    console.log(a);
    var a = 3;
  }
  inner();
  console.log(a);
}

outer();
console.log(a);
```

<p>외부 함수 outer 에 내부 함수 inner 가 존재하며, 전역 변수로 a 가 선언되어있다 가정하겠습니다. 위 코드에 대한 설명을 하기 전 먼저 outerEnviromentReference 에 대해 살펴보겠습니다.</p><br />

<p>LexicalEnviroment 의 두번째 수집자료인 outerEnviromentReference 의 존재로 인해 내부 스코프에서 외부 스코프로의 연결인 스코프체인이 가능해집니다. 앞서서 스코프는 식별자 참조 범위라고 하였습니다. 참조하고자 하는 변수가 현 실행 컨택스트 내 존재하지 않는다면, outerEnviromentReference 를 통해 현 실행 컨택스트가 생성된 환경에서 다시 변수를 검색합니다. 이런식으로 내부에서 외부로 outerEnviromentReference 를 통해 바로 위 LexicalEnviroment 의 enviromentRecord 를 참조해가는 과정을 스코프체인이라 합니다. 이런 방식으로 위 예시를 다시 살펴보겠습니다.</p><br />

```js
var a = 2; // 전역 컨텍스트의 enviromentRecord 에 저장됨
function outer() {
  // 역시나 전역 컨텍스트에 저장
  function inner() {
    // outer 의 enviromentRecord 에 저장되었음
    console.log(a); // undefined : var a 는 확인하였으나 할당은 안되었기에
    var a = 3; // var a 가 inner 의 enviromentRecord 에 저장됨
  }
  inner(); // 2) inner 실행으로 inner 의 실행 컨택스트 생성
  console.log(a); // 2 : outer 의 enviromentRecord에는 존재하지 않기에 outerEnviromentReference 인 전역컨택스트 enviromentRecord 참조
}

outer(); // 1) 함수가 실행됨으로 outer 에 대한 실행 컨택스트 생성
console.log(a); // 2 : 전역 컨택스트 enviromentRecord참조
```

<p>전역 컨텍스트에서는 변수 a 와 함수 outer가 저장되며, 이후 outer 의 호출로 인해 outer 의 실행컨택스트가 생성됩니다. 이 다음 outer 내 inner 함수가 저장이 되며 다음 inner 함수가 실행됨으로서 inner 실행 컨택스트가 생성이 됩니다. inner 에서는 변수 a 가 저장이 됩니다. inner 내부 console 에는 undefined 가 찍히게 될텐데, 이유는 변수 a 가 컨택스트 내 존재하지만 할당값은 아직 없기 때문입니다. 중요한 점은 외부 전역에도 변수 a 가 존재하지만 우선순위는 무조건 현 컨택스트입니다. outer 의 console 의 경우 2가 찍히게 됩니다. 이유는 outer 컨텍스트 내에는 변수 a 가 존재하지 않기 때문에, 스코프체인에 의해 전역 변수 a 를 참조하기 때문입니다. 마지막 console 역시 2를 찍게 됩니다.</p>
