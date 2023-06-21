/**
 * Shorthand Properties
 */

const firstName = "poco";
const lastName = "jang";

const person = {
  firstname: "poco",
  lastName: "jang",
  getFullName: function () {
    return this.firstname + " " + this.lastName;
  },
};

const person2 = {
  firstName,
  lastName,
  getFullName() {
    return this.firstName + " " + this.lastName;
  },
};

// 구조분해

function Person(name, age, location) {
  this.name = name;
  this.age = age;
  this.location = location;
}

// 인자를 순서대로 기입하여야 한다.
const poco = new Person("poco", 30, "korea");

// 객체로 넣으면 순서를 마음대로 할 수 있다.

const poco1 = new Person({
  name: "poco",
  location: "korea",
  age: 30,
});

// 객체구조분해가 가능하기에 명시적인 표현이 가능하다
// name 을 제외한 부분은 options 으로 처리가 가능하다.

function Person2(name, { age, location }) {
  this.name = name;
  this.age = age;
  this.location = location;
}

const poco2 = new Person2("ddd", { location: "seoul", age: 20 });

// 리엑트를 보면 구조분해가 보인다

const [state, setState] = useState(null);

// 이러한 방식 역시 구조분해라고 할 수 있다.

const orders = ["First", "Second", "Third"];

const { 0: st2, 2: rd2 } = orders;

console.log(st2);
console.log(rd2);

// 혹은

const [st3, , rd3] = orders;

/**
 * hasOwnProperty
 * 한마디로 프로퍼티를 가졌는가?
 */

const num1 = {
  name: "wonik",
};

person.hasOwnProperty("name");

// 주의할 점은 만약 사용자가 객체 내부에 hasOwnProperty 를 작성하면, 이 메서드로 작동하게 된다
// 따라서 객체에 이 메서드를 쓰지 않는게 좋다.

const num2 = {
  hasOwnProperty() {
    return "망했음";
  },

  name: "bar",
};

num2.hasOwnProperty("name"); // '망했음'

Object.prototype.hasOwnProperty.call(num2, "name"); // true

// 그래서 그냥 함수로 만들어줘도 좋다

/**
 * optional channing
 */

const response = {
  data: {
    userList: [
      {
        name: "Jang",
        info: {
          tel: "010",
          email: "jang@gmail.com",
        },
      },
    ],
  },
};

// 깊이있게 데이터를 들어가야한다.
// 체이닝이 길어지고 있다.
// 문제가 있다.
response.data.userList[0].info.email;

function getUserEmailByIndex(userIndex) {
  return response.data.userList[userIndex].info.email;
}

getUserEmailByIndex(0); // 'jang@gmail.com'

// 만약 userList 가 사라졌다고 가정해보자.
// 바로 에러가 발생하게된다 (미친듯이 겪어봤다.)
// 런타임에서 에러가 생기지 않도록 하는 방법이 옵셔널 체이닝

response?.data?.userList?.[userIndex]?.info?.email;
