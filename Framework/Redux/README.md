<h2 align="center"> Redux </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2023.1.26](#2023-1-26)
- [2023.2.21](#2023-2-21)

  <br />

![--------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="프로젝트소개"> :book: 간단한 요약 정리 </h2>

## 2023-1-26

### Redux 를 구현해보자

<p>우선 store 을 만들어야 하는데, 이를 가능하게 하는 함수가 createStore 함수이다. 핵심적인 함수인데, 리덕스의 컨셉은 전역상태라는 것을 각각의 컴포넌트가 직접 수정하는 경우를 막는다는 것에서 시작을 한다. 전역 상태를 다루게 되면 유리한 점은 일정한 데이터 A 를 여러 컴포넌트에서 가져다가 사용할 수 있다는 점이다. 문제는 만약 어느 시점에 데이터 A 가 이상하게 변하였고, 우리는 이 A를 어느 컴포넌트가 수정을 했는지 알기가 쉽지 않았다는 것이다. 왜냐하면 어느 컴포넌트 에서도 수정이 가능하기 때문이다. 이러한 문제점을 해결하기 위해 각각 컴포넌트가 A 를 직접 수정하는것을 막고, 대신 일정한 지역에서만 수정이 이뤄지고, 나머지 컴포넌트는 그 상태 수정 지역에다가 요청만을 하는 것이다. 그렇게 되면 어찌되었던 상태를 수정하는 곳은 한군데이기 때문에, 오류가 발생한다면 바로 그 수정한 곳에서 발생했을 테니 쉽게 유지보수가 가능해진다.</p>

> **createStore**

<p>가장 핵심적인 부분을 구현해보자. 전역 스토어를 먼저 만들어야 한다. 그리고 return 부분이 밖에서 사용할 store 이다.</p><br />

<p>첫번째 인자로 함수를 받을 건데, 왜냐하면 리덕스는 상태를 직접 수정하지 않는다. 다만 사용자로부터 상태를 수정할 함수를 받아 사용자가 의도한 시점에 함수를 실행시킬 수 있다.</p>

```js
export function createStore(reducer) {
  let state;

  function dispatch(action) {
    // 근데 여기서 state 는 undefined 이며 reducer 로 넘겨준다.
    state = reducer(state, action);
  }

  // 외부에서 상태를 얻게 하기 위해서
  function getState() {
    return state;
  }

  return {
    dispatch,
    getState,
  };
}
```

- 위 코드의 진행을 살펴보게 되면 우선 저장소 state 를 정의해준다.
- 이후 상태를 수정시키는 함수 reducer 를 인자로 받아왔다가, action 이 들어오게 되면 reducer 를 실행시키게 된다.
- 즉 action 은 마치 사람들이 버튼을 클릭하는것과 같다. 상태를 변경시키는 로직은 reducer 에 작동시키며 이 로직은 사용자가 직접 짠다.
- 여기서 밖에서 정의된 reducer 를 살펴보자

```js
function reducer(state, action) {
  state = action;
  return state;
}
```

- 여기서 state 는 undefined 로 원시값이다. 원시값에 값을 대입하는것이니 여기서의 state 는 위 원본 createStore 내 state 와는 별개의 값이다. (action 이 객체니 별개의 주소를 참조한다고 하는게 맞겠다.)
- 그렇기 떄문에 reducer 함수에서 state 를 return 해주고
- createStore 내부에서 그 return 값을 state 에 대입해주는 것이다.

```js
function dispatch(action) {
  state = reducer(state, action);
}
```

- 이렇게 되면 action 에 따라 원본 state 값이 변하게 된다.
- createStore 에 reducer 를 넘겨주면서 호출해주어야 내부의 메서드를 사용할 수 있다.
- 따라서 이렇게 처리를 해주자

```js
// 외부에서 사용할 store 를 정의
const store = createStore(reducer);
```

- 문제가 있는데, 만약 store.dispatch 를 통해서 action 을 넘겨 상태값을 변화시켜주었다고 하겠다.
- 우선 첫번째 문제는 모든 상태값을 다 바꾸는게 아니라 일정 상태값만 변화시켜야 하고, 이러한 구별을 좀 더 직관적으로 하기 위해 action 에 type 을 지정해주는 방법이 있다.

```js
function reducer(state, action) {
  if (action.type === "ADD_COUNTER") {
    // 필요한 state 를 복사한다.
    return {
      ...state,
      count: action.payload.count,
    };
  }
  return state;
}

// 생략

store.dispatch({ type: "ADD_COUNTER", payload: { count: 2 } });
```

- 즉 타입에 따라 return 하는 상태값이 달라지게 설정이 가능하다.
- 두번째 문제는, 상태를 바꾼것까지는 좋다. 하지만 이 상태를 예를 들어 A, B, C 3가지의 컴포넌트가 사용중이고, 만일 A 에서 dispatch 를 통해 상태를 변경하였다면, 이후 getState 를 통해 바뀐 상태값을 가져올 수 있을거이다.
- 하지만 나머지 B, C 컴포넌트는 상태가 변한지 아닌지 알 수가 없다.
- 즉 전역적으로 변경된 상태값을 호출해주어야 하는데, 이때 만들 함수가 subscribe 함수다

```js
// 변경된 상태값을 그냥 가져와 콘솔에 뛰운다고 가정해보자
// 이 함수는 상태가 변경된 다음 호출되어야 한다.
function listener() {
  console.log(store.getState());
}

// 이 함수를 등록시켜준다.
store.subscribe(listener);
```

- 함수를 등록시킨 다음에, reducer 가 실행이 되고, 그 다음 이 listener 함수를 실행시킬 것이다.

```js
export function createStore(reducer) {
  let state;
  const handler = [];

  function dispatch(action) {
    state = reducer(state, action);
    // listener 에 해당하는 함수를 상태를 변경하고 그 다음 호출한다.
    handler.forEach((listener) => {
      listener();
    });
  }

  // 생략

  // listener 함수를 등록해야 한다. 생각해보자
  // 만약 상태값이 변화하였고, 이 상태값을 여러 컴포넌트에 사용중이라면, 업데이트 시켜줘야 한다.
  // 즉 상태가 변환 뒤 상태를 가져오는 listener 함수가 호출되어야 한다.
  function subscribe(listener) {
    handler.push(listener);
  }

  return {
    dispatch,
    getState,
    subscribe,
  };
}
```

- 상태값이 변하게 되면 이후 등록된 listener 가 실행이 되게 된다.

<p>여기까지가 리덕스의 기본 흐름이자, 초반 리덕스의 코드는 이와 거의 유사하다. 이제 지금까지 작성한 구조에서 비동기 작업을 하려면 어떻게 해야할지 생각해보자. 현재의 구조로는 비동기 실행을 할 수가 없다.</p>

```js
// 비동기인 fetch 를 설정해보자.
function reducer(state, action) {
  if (action.type === "ADD_COUNTER") {
    // 필요한 state 를 복사한다.
    return {
      ...state,
      count: action.payload.count,
    };
  }

  if (action.type === "FETCH") {
    fetch("").then((res) => {
      // 작업이 이루어진다.
      res;
    });
  }
  return state;
}
```

- 비동기인 fetch 가 실행되어 resolve 되어 then 으로 넘어가는 과정동안 이미 state 가 return 이 된다.
- 이후 createStore 내에서 state 를 저장하고 난 뒤, listener 를 호출시킨다.
- 즉 상태변경이 되지 않았음에도 작업이 종료가 된다.
- 지금의 아키텍쳐러는 비동기를 처리할 수 없다.
- 그래서 미들웨어를 제공하게 된다.

```js
function middleware(dispatch, action) {
  if (action.type === "FETCH") {
    fetch().then((res) => {
      dispatch("응답");
    });
  }
  console.log(action);
}
```

```js
export function createStore(reducer, middleware) {
  let state;
  const handler = [];

  function dispatch(action) {
    // 항상 미들웨어가 호출이 된다.
    middleware(dispatch, action);
    state = reducer(state, action);
    handler.forEach((listener) => {
      listener();
    });
  }
```

- 구조로 볼 때 미들웨어는 항상 dispatch 가 실행되면 실행되도록 설계할 수 있다.
- 보통은 첫번째 dispatch 를 request 로 한다. 이후 성공과 실패에 대한 각각의 dispatch 를 미들웨어내부에서 처리하는것이다. (위 코드처럼)
- 미들웨어는 그래서 dispatch 와 action 둘 다 인자로 받게 된다.
- 이렇게 되면 우리는 리퀘스트를 action 으로 넘기게 되고, 리퀘스트는 미들웨어에 의해 비동기적으로 응답을 받고 이 응답을 action 으로 dispatch 를 보내게 되는 것이다.
- 이렇게 되면 동기적인 reducer 는 그대로 유지되는 것이이게 해결이 된다.
- 다만, 미들웨어가 여러개인 경우에는 순서가 꼬일 수 있고, 이를 해결한 방법이 몽키디스패치인데, 공식문서에서 자세하게 설명하니 이를 참고해보자
- 여기서 사용되는 기술이 커링이라는 기술인데, 여러 인자들에 대해 각 인자마다 함수로 분해하는 방식이다.

```js
const middleware => (dispatch) => (action) => {
  dispatch(action)
  ...
}
```

- 원래 미들웨어는 인자를 2개 다 받았었는데, 이렇게 분해를 하니깐, 이러한 구조가 가능해진다
- action 이 호출되야만 dispatch 가 실행되니, 외부에서 호출 타이밍을 결정할 수 있다.

```js
const fs = middleware(dispatch);

// 딴짓

fs(action); // dispatch(action) 호출
```

- 참고로 middleware 는 store 를 먼저 인자로 받는다

```js
const middleware => (store) => (dispatch) => (action) => {
  dispatch(action)
}

```

- store 를 제공받는 이유는 미들웨어 안에서도 getState 를 사용할 수도 있으니, store 를 넘겨준다.
- 이제 미들웨어가 여러개인 경우를 생각해보자
- 미들웨어가 여러개인 경우, 순서대로 실행이 되어야 한다. 예를 들어보자

```js
const middleware1 = (store) => (dispatch) => (action) => {
  console.log("mid1");
  dispatch(action);
};

const middleware2 = (store) => (dispatch) => (action) => {
  console.log("mid2");
  dispatch(action);
};

const store = createStore(reducer, [middleware1, middleware2]);
```

- 위와 같이 미들웨어가 2개가 있다면, 순서는 middleware1 -> middleware2 -> reducer 순서로 실행이 되어야 한다.
- 그런데 dispatch 는 한 가지 함수이며, 이 dispatch 는 reducer 을 호출한다
- 즉, middleware1, 2 에 대한 dispatch 는 기존 dispatch 를 가르켜서는 안된다는 의미.
- 우선 middleware2(store)(dispatch) -> function(action){dispatch(action)} 이라는 함수가 반환이 된다.
- 이 떄 dispatch 는 reducer 를 호출하는 dispatch 이며, 알맞게 호출이 되는것이다.
- 그렇다면 middleware1(store)(dispatch) -> function(action){dispatch(action)} 의 경우 reducer 가 아니라 middleware2 가 호출이 되어야 한다.

```js
middleware1(store)(function(action){dispatch(action)}) =
function(action){(function(action){dispatch(action)})(action)}

```

- 복잡하긴 하지만, 이러한 과정을 몽키디스패치 라고 한다. 이것을 구현하려면 아래처럼 해야한다

```js
export function createStore(reducer, middleware = []) {
  let state;
  const handler = [];

  function dispatch(action) {
    state = reducer(state, action);
    handler.forEach((listener) => {
      listener();
    });
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    handler.push(listener);
  }

  middleware = Array.from(middleware).reverse();

  // reducer 를 호출할 디스패치
  let lastDispatch = dispatch;

  // 배열을 반대로 한뒤, 여기서는 middleware2 부터 시작한다.
  // middleware2 의 lastDispatch 는 reducer 를 호출한다
  // 체인처럼 연결이 되는 과정
  middleware.forEach((m) => {
    lastDispatch = m(store)(lastDispatch);
  });

  return {
    // 마지막까지 체인을 타고 온 dispatch 를 반환한다.
    // 즉 이 dispatch 를 호출하면 가장 먼저 middleware1 이 호출이 되는것이다.
    dispatch: lastDispatch,
    getState,
    subscribe,
  };
}
```

- 좀 더 이해가 필요해서 공식문서를 참고하고 다시 정리해보겠다.

## 2023-2-21

### redux의 middleware 에 의해 새로 생성된 action 은 next(action)에서 전달된 action과 동일한가?

<p>반드시 그러한 것은 아니다. 미들웨어는 여러개가 존재할 수 있다. 리덕스에서 미들웨어를 사용한다는 것은 action -> dispatch 되기 전 사이에서 작용하며, 이로인해 미들웨어에서 새로 action 이 생성되어 다음 미들웨어로 전달되는 형식이다.</p><br />

<p>예를 들어서 미들웨어가 1,2,3 개 있다고 가정한다면, 만약 1에서는 조건에 해당하지 않아 아무런 처리를 하지않으면 그대로 2로 action 이 전달된다. 그리고 2에서 조건에 해당하여 새롭게 newAction 이 생성이 되면 이 newAction 이 3으로 전달이 된다. 이런식으로 최종적으로 dispatch 된다고 할 수 있다.</p><br />

```js
const myMiddleware = (store) => (next) => (action) => {
  if (action.type === "LOAD_DATA") {
    // 비동기 작업 수행 후, 새로운 액션 객체를 생성합니다.
    const newData = { id: 1, name: "John Doe" };
    const newAction = { type: "DATA_LOADED", payload: newData };

    // 새로운 액션 객체를 다음 미들웨어나 리듀서에게 전달합니다.
    return next(newAction);
  } else {
    // 그 외의 경우에는 다음 미들웨어나 리듀서에게 기존 액션 객체를 그대로 전달합니다.
    return next(action);
  }
};
```
