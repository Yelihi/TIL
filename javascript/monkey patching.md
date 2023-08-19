## monkey patching

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
