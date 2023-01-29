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

// type
// 지금까지 함수 객체 클래스 비동기 등을 통해 변화의 흐름이
// 암묵적에서 명시적으로 변해가는 과정을 알 수 있다.
// 하지만 상태, 함수, 데이터의 스펙을 자바스크립트만으로는 명시적으로 표현할 수 없다.
// 그렇기에 타입스크립트는 이를 명시적으로 표현해줄 수 있게 도와준다.
// 그래서 많은 곳에서 타입스크립트로 전환을 하고 있다.
