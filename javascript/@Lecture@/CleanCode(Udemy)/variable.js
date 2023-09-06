// 호이스팅 - 런타임
// 선언과 할당이 분리된 현상 (LexicalEnviroment 에 먼저 변수가 등록되는 과정에서 분리됨)
// 특히나 var 키워드는 중복선언이 가능하다.

var global = 0;

function outer() {
  console.log(global); // undefined
  var global = 2;

  function inner() {
    var global = 10;

    console.log(global); // 10
  }

  global = 1;

  console.log(global); // 1
}

// 함수도 호이스팅한다

var sum;

console.log(typeof sum); // function

function sum() {
  return 2 + 3;
}

// 결국 함수 표현식으로 처리해주는것이 좋다. 선언문보다
