## 프로토타입 상속이 일어나는 작동 원리

모든 자바스크립트 객체는 **proto** 속성을 가지고 있다. 이 속성으로 한 객체의 프로토타입이라 불리는 다른 객체에 대한 참조를 하게 된다. 우리가 그냥 객체를 생성하였을 때, 예를 들자면 배열을 생성할 떄 배열에 대한 여러 매서드들(push, reduce 등)을 사용할 수 있는 것도, 사실 배열의 **proto** 를 타고 더 상위 프로토타입 객체로 이동해나가면서 Array.prototype 객체에 도달하여 그 내부 메서드를 참조하게 되는 것이다. 어찌보면 상속이라기 보단 위임이라고 할 수 있다.
<br /><br />

```js
// 부모 객체 동물
function Animal(name) {
  this.name = name;
}

// 객체 Animal 의 prototype 객체의 메서드 생성
Animal.prototype.makeSound = function () {
  console.log(`The ${this.constructor.name} makes a sound`);
};

// 자식 constructor
function Dog(name) {
  Animal.call(this, name); // 부모의 constructor 를 부른다.
}

// Dog 의 prototype 객체를 상위 Animal 의 prototype 인스턴스로 지정해준다.
Dog.prototype = Object.create(Animal.prototype);

// 메서드 추가
Dog.prototype.bark = function () {
  console.log("Woof");
};

const bolt = new Dog("Bolt");

console.log(bolt.name); // Bolt
bolt.makeSound(); // 'The Dog makes a sound
bolt.bark(); // 'Woof'
```

- 참고로 프로토타입을 상속하려면
  - `Object.create(Parent.prototype)`
  - `Object.create(new Parent(null))`
  - `Object.create(objLiteral)`
- 위 3가지 방법 중 한가지를 사용하면 된다.
