## Object.keys 를 통해 생성된 배열에 대한 타입을 제대로 인지하지 못하는 이유는?

```tsx
const keys = Object.keys(options);
keys.forEach((key) => {
  if (options[key] == null) {
    // Expression of type 'string' can't be used to index type 'Option'
    throw new Error(`Missing option ${key}`);
  }
});
```

<br />

자주 마주하는 문제로서, 객체 options 의 key 로 구성되어 있다면 자동적으로 타입 추론을 할 수 있을텐데, 그렇지 못한다. 우선적인 해결책은 다음과 같다.
<br />

```tsx
const keys = Object.keys(options) as (keyof typeof options)[]; // 배열 keys 에 타입을 지정해준다.
keys.forEach((key) => {
  if (options[key] == null) {
    throw new Error(`Missing option ${key}`);
  }
});
```

<br />

### Object.keys 의 정의

```ts
// typescript/lib/lib.es5.d.ts

interface Object {
  keys(o: object): string[];
}

// 제네릭을 활용한 더 정확한 타이핑
class Object {
  keys<T extends Object>(o: T): (keyof T)[];
}
```

<br />

밑처럼 제네릭으로 처리했다면 더 좋았을 텐데, 타입스크립트는 의도적으로 위 인터페이스처럼 string[] 을 지정하였다. 이유는 타입스크립트의 구조적 타이핑 때문이다.
설명보다는 예제가 더 이해가 빠르니 예제를 통해서 객체 타입 지정의 특징을 살펴보자. <br />

```ts
type A = { foo: number; bar: number };
type B = { foo: number };

const obj1: A = { foo: 2, bar: 3 };
const obj2: B = { foo: 3 };

const obj3: A = obj2; // Property 'bar' is missing in type 'B' but required in type 'A'
const obj4: B = obj1;
```

<br />

위 예제는 중요한 특징을 설명한다. 에러가 발생하는 객체는 obj3 이다. obj3 는 obj2 : B 를 그대로 할당하였다. 즉 타입 A 에 타입 B 를 할당한 셈이다. 여기서 오류가 발생하였다. <br />
즉 obj3 는 타입 A 를 기준으로 하여 기준된 타입의 프로퍼티보다 더 적은 프로퍼티의 객체가 할당이 되면 오류를 발생시킨다. <br />
반면 obj4 는 obj1 : A 를 그대로 받아들였다. obj4 의 타입은 B 이고, 프로퍼티 foo 를 지정하고 있다. 그리고 obj1 은 foo, bar 2가지의 프로퍼티를 가진 객체이다. 즉 기준이 되는 타입 (여기서는 B)의 프로퍼티 전체를 만족하면서(foo), 그 외 추가적인 프로퍼티가 있는 경우(bar) 타입 에러가 발생하지 않는다. <br /><br />

요점은 객체에 T 타입이 지정되어있다면, 이 객체가 T의 프로퍼티만 가지고 있는지를 <strong>알 수 없다</strong>는 점이다!

### Object.keys의 안전하지 않은 사용

보통 form 에서 유효성 검사를 많이 하는 편이다. form 의 value 를 객체로서 다루고, 이 객체의 key 를 순회하면서 각각의 key 에 해당하는 값들에 대해 유효성 검사를 실행하는 함수를 생성할 수 있겠다. <br />

```tsx
// 제출할 form 에 대한 type 지정
interface User {
  name: string;
  password: string;
}

// 유효성 검사 (User 의 key 를 method 에 대응하기 위함)
const validators = {
  name: (name: string) => (name.length < 1 ? "Name must not be empty" : ""),
  password: (password: string) =>
    password.length < 6 ? "Password must be at least 6 characters" : "",
};

// 순회를 돌면서 함수 validators 의 메서드를 validate 에 저장한다.
// 이후 실행시키면서 error 를 확인한다.
function validateUser(user: User) {
  let error = "";
  for (const key of Object.keys(user)) {
    const validate = validators[key];
    error ||= validate(user[key]);
  }
  return error;
}
```

<br />

문제가 없어보이는 코드이지만, 타입오류를 발생시킬것이며 어떤 부분에 있어서 문제가 되는지 살펴보자. 앞에서 구조적 타이핑을 주목해보자. 우리는 form value 에 대한 type 을 User 로 지정하였다. 그리고 이 타입에는 2가지 프로퍼티가 있다. 우리가 앞에서 배운것은 이 2가지 프로퍼티를 만족하면서 그 외 추가적인 프로퍼티가 있는 객체에도 User 타입을 적용시킬 수 있다는 점이다. <br />

```ts
// 없던 email 이 추가되었다.
const user = {
  name: "Alex",
  password: "1234",
  email: "alex@example.com",
};

validateUser(user); // 그럼에도 타입적으로는 문제가없다.
```

<br />

(실제로는 런타임 이전에 타입오류가 발생하지만) 만일 그대로 런타임이 실행이 되면 validator 에는 email 에 대한 method 가 없기 때문에 validator['email'] = undefined 가 되어 오류가 발생할 것이다. 이런 부분이 있기에 Objects.keys 를 사용할때는 인수 캐스팅을 사용해주곤 한다. (위에서처럼)

### 구조적 타이핑의 유용함

불편함만 있는것은 아니다. 또다른 예시로서 구조적타이핑에 대한 장점이 있는데 바로 부분 타입을 지정할때에 그 진가가 발휘된다. <br />

```ts
function getKeyboardShortcut(e: KeyboardEvent) {
  if (e.key === "s" && e.metaKey) {
    return "save";
  }
  if (e.key === "o" && e.metaKey) {
    return "open";
  }
  return null;
}
```

<br />

타입 KeyboardEvent 는 무려 37개에 달하는 프로퍼티에 대한 타입이 지정되어있다. 실제 함수를 실행시킬 때 단순히 { key: 's', metaKey: true } 를 넣어주면 타입 에러가 발생한다. event 에는 37개의 프로퍼티가 포함되어있기 떄문이다. 해결방안으론 인수 캐스팅이 있는데, 이 방식으로는 다른 타입 에러가 가려질 수 있다. <br />

```ts
getKeyboardShortcut({ key: "s", metaKey: true } as KeyboardEvent);
```

<br />

대신 interface 를 통해 새롭게 타입을 지정해주자. <br />

```ts
interface KeyboardShortcutEvent {
  key: string;
  metaKey: boolean;
}

function getKeyboardShortCut(e: KeyboardShortcutEvent) {}
```

<br />

이벤트 객체는 37개의 프로퍼티를 지니고 있지만, 구조적 타이핑에 의해 타입 KeyboardShortcutEvent (2개의 프로퍼티를 지정) 적용이 가능하다. 2개의 프로퍼티를 포함하고, 그 외 나머지 프로퍼티를 가진 객체이기 때문이다.
