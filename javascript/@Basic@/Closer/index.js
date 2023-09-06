/**
 * 클로저는 이전 환경을 기억하는 함수이다. 여기서 환경은 스코프체인을 의미한다
 * 함수 실행이 종료되어도 클로저 함수를 통해 전달된 내부함수는 내부 변수를 참조할 수 있게 된다
 * 이러한 특징을 활용하면, 자바스크립트에서 애를 먹었던 정보의 은닉화를 해결할 수 있게 된다
 */

// 클로저를 활용한 패턴
let setName = (function () {
  let _name = "";

  return function (name) {
    _name = name || _name;
    console.log(_name);
  };
})();

setName(); // ""

console.log(setName._name); // undefined

// 클로저를 활용하는 방법

function getName() {
  let _name = "wonik";

  return function (name) {
    _name = name || _name;
    return _name;
  };
}

const name1 = getName();
const name2 = getName();

console.log(name1("choi")); // choi
console.log(name2("워닉")); // 워닉

// 생성자 함수로서 은닉화
// 객체와 클로저를 활용하여 내부 변수는 은닉화

function Counter() {
  let _count = 0;

  function increseCount(count) {
    _count = _count + count;
    return _count;
  }

  return {
    count: increseCount,
    inc: function (count) {
      return increseCount(count);
    },
  };
}

const count1 = new Counter();
const count2 = new Counter();

console.log(count1._count); // undefined;
console.log(count1.inc(2)); // 2
console.log(count2.inc(3)); // 3

// override 를 통해 확장하기

function TwiceCounter() {
  const counter = new Counter();
  let increseCount = counter.count;

  counter.inc = function (count) {
    return increseCount(count * 2);
  };

  return counter;
}

const count3 = new TwiceCounter();

console.log(count3.inc(2)); // 0 + 4 = 4
console.log(count3.inc(3)); // 4 + 6 = 10
console.log(count3.inc(4)); // 10 + 8 = 18

// # 을 이용한 은닉화

class Human {
  #age = 30;

  get() {
    return this.#age;
  }
}

const human = new Human();

console.log(human.get());

// # 은 서로 독립된 스코프를 가진다.

class Person extends Human {
  #age = 20;

  getFork() {
    return this.#age;
  }
}

const person = new Person();

// 만일 프라이빗이 아니라면 둘다 같은 값을 가리키게 된다.
console.log(human.get()); // 30
console.log(person.getFork()); // 20
