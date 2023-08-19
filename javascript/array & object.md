## 배열과 객체

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

### 배열의 편리한 함수

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

### 배열의 타입은 객체다

```js
console.log(typeof arr); // Object
arr["key"] = "value"; // 실제 추가가 가능하다.
console.log(arr.length); // 허나 객체가 추가된 부분은 길이에 추가되지 않는다.
```

- 위와 같은 추가 방식은 사용하지 않도록 하자

### 객체

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
