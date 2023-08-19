## call 과 apply 를 활용한 데코레이터 방식

call 과 apply 는 this 를 바인딩 하기 위해 사용되곤 하는데, 이를 활용하여 데코레이터를 작성하자.
<br />

```js
function slow(x) {
  // CPU 집약적인 작업이 여기에 올 수 있습니다.
  alert(`slow(${x})을/를 호출함`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function (x) {
    if (cache.has(x)) {
      // cache에 해당 키가 있으면
      return cache.get(x); // 대응하는 값을 cache에서 읽어옵니다.
    }

    let result = func(x); // 그렇지 않은 경우엔 func를 호출하고,

    cache.set(x, result); // 그 결과를 캐싱(저장)합니다.
    return result;
  };
}

slow = cachingDecorator(slow);

alert(slow(1)); // slow(1)이 저장되었습니다.
alert("다시 호출: " + slow(1)); // 동일한 결과

alert(slow(2)); // slow(2)가 저장되었습니다.
alert("다시 호출: " + slow(2)); // 윗줄과 동일한 결과
```

<br />

- 함수 실행값을 캐시 처리하여, 효율을 증가시킨다
- cachingDecorator 함수와 같이 인수로 받은 함수의 행동을 변경시켜주는 함수를 데코레이터(decorator)라고 한다.
- 이렇게 데코레이터를 만들면 여러 이득이 있다.
  - 데코레이터를 재사용할 수 있다.
  - 캐시 로직이 분리되어 있으니, 인자로 전달되는 함수는 신경쓰지 않아도 된다
  - 지금은 캐시 기능만 있지만, 필요하다면 여러 데코레이터를 조합해서 콜백식으로 사용해도 된다. 사실 이러한 방식은 미들웨어같은 느낌이라고 생각이 든다.
    <br />

위의 캐싱 데코레이터는 객체 메서드에서 활용하기에는 적합하지 않다. 제대로 동작하지 않기 때문인데, 왜냐하면 데코레이터에 메서드가 인자로 전달 될 때, this 가 바인딩 되지 않기 때문이다. 기존 메서드에 this 가 사용된다고 하면, 실제 this 는 호출된 스코프 상 this 를 따르게 되는데, 데코레이터로 한번 감싸게 되면 this 의 컨텍스트가 사라지게 되어 에러가 발생한다.
<br />

이에 대한 해결책은 call, apply 를 통해 this를 바인딩 시켜주는 방법이다.
<br />

```js
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert(`slow(${x})을/를 호출함`);
    return x * this.someMethod(); // (*)
  },
};

function cachingDecorator(func) {
  let cache = new Map();
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // 이젠 'this'가 제대로 전달됩니다.
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // 캐싱 데코레이터 적용

alert(worker.slow(2)); // 제대로 동작합니다.
alert(worker.slow(2)); // 제대로 동작합니다. 다만, 원본 함수가 호출되지 않고 캐시 된 값이 출력됩니다.
```

<br />

- 데코레이터 적용 후 worker.slow 는 래퍼 function(x){...} 가 된다
- worker.slow(2) 를 실행하면 래퍼는 2를 인수로 받고, this=worker가 된다.(점 앞의 객체)
- 현재 this(worker) 와 인수(2)를 원본 메서드에 전달한다.

<br />

여러 인수를 전달하려면 arguments 객체를 활용해주면 된다. 위 캐시 데코레이터에서는 어떤식으로 해시할지 고민을 해야하는데, 간단하게 인자들을 배열로 변경해 join 해주는 방식으로 해주면 된다.
<br />

다만 arguments 는 유사배열 이기에 join 을 사용할 순 없는데, 이를 위한 방식이 있다.

```js
[].join.call(arguments);
```

<br />

이렇게 메서드를 빌려올 수가 있다. 이제 캐시 데코레이터를 수정해주자

```js
let worker = {
  slow(min, max) {
    alert(`slow(${min},${max})을/를 호출함`);
    return min + max;
  },
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function () {
    let key = hash(arguments); // (*) 해시를 통해 1,2,3 등으로 문자열 변경
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments); // (**) 스프레드로 풀어서 전달해준다.

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return [].join.call(args);
}

worker.slow = cachingDecorator(worker.slow, hash);

alert(worker.slow(3, 5)); // 제대로 동작합니다.
alert("다시 호출: " + worker.slow(3, 5)); // 동일한 결과 출력(캐시된 결과)
```

<br />

이렇게 컨텍스트와 함께 인수 전체를 다른 함수에 전달하는것을 콜 포워딩(call forwarding) 이라고 한다.

## 예제 문제

### 1. spy decorator

wrapper 함수를 반환하는 데코레이터를 만들어야 하는데, 이 함수는 자체 프로퍼티 calls 에 인자들의 배열을 저장하는 함수다.

```js
function spy(fn) {
  function wrapper(...arg) {
    wrapper.calls.push(arguments);
    return fn.apply(this, arguments);
  }

  wrapper.calls = [];

  return wrapper;
}
```

### 2. Delaying decorator

인자로 전달되는 함수를 인자로 전달하는 ms 만큼 지연해서 동작시키는 데코레이터 함수를 만들자

```js
function delay(fn, ms) {
  return function () {
    setTimeout(() => fn.apply(this, arguments), ms);
  };
}
```

### 3. Debounce decorator

검색 기능에서 주로 사용되는 디바운스의 기능을 추가해주는 데코레이터를 생성하자.

```js
function debounce(fn, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, arguments), ms);
  };
}
```

### 4. Throttle decorator

마우스 커서 이동 이벤트나 스크롤 등 밀리초 단위로 일어나는 이벤트호출을 조절하는 throttle 데코레이터를 만들자

```js
function throttle(fn, ms) {
  let isThrottled = false; // 스로틀 여부를 결정한다.
  let saveThis;
  let saveArg;

  function wrapper() {
    if (isThrottled) {
      // (4) 이후 다시 실행시키면 스로틀 상태이기에, this와 인자를 저장해주고 함수를 나온다.
      saveThis = this;
      saveArg = arguments;
      return;
    }

    fn.apply(this, arguments); // (1) 첫 wrapper 시작시 지정해둔 함수가 실행된다 (6) 스로틀이 해제되어있기에 fn 을 실행시키게 된다. 이로서 ms 이후 두번째로 fn 이 실행되게 된다.

    isThrottled = true; // (2) 이후 스로틀 상태에 접어들게 된다. (7) 다시 스로틀 상태로 전환된다.

    setTimeout(function () {
      // (3) 지정해둔 ms 만큼 백그라운드에 진입한다. (5) 시간이 되어 콜백 함수가 실행되는데, 이때 스로틀은 해제되고, wapper 함수를 실행시킨다.(this 를 전달해주면서)
      isThrottled = false;
      if (saveArg) {
        wrapper.apply(saveThis, saveArg);
        saveThis = saveArg = null;
      }
    }, ms);
  }

  return wrapper;
}
```
