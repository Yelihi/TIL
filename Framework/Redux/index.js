import { createStore } from "./redux.js";

// 리덕스 안 state 를 수정해야한다.
// 문제는 state 는 undefined 이며 data 는 객체이다.
// state 는 원시타입이고, 그렇기에 state 는 참조가 아니라 복사가 이루어진다.
// 그래서 이전 함수에서 전달받은 state 와 별개가 된다.
// 근데 state 를 객체로 해도 안되던데...

// 미들웨어는 커링이라는 개념을 사용한다.

const ADD_COUNTER = "ADD_COUNTER";

const middleware1 = (store) => (dispatch) => (action) => {
  console.log("mid1");
  dispatch(action);
};

const middleware2 = (store) => (dispatch) => (action) => {
  console.log("mid2");
  dispatch(action);
};

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

function listener() {
  console.log(store.getState());
}

function actionCreator(type, payload) {
  return {
    type,
    payload,
  };
}

const store = createStore(reducer, [middleware1, middleware2]);

store.subscribe(listener);

// 이렇게 함수를 호출해서 리덕스에 전달했던 상태를 바꾸는 함수를 실행하라고 명령한다.
// 어떤 것을 수정할것이며 어떻게 수정해줘 라는 데이터를 넘겨야 한다.
store.dispatch(actionCreator(ADD_COUNTER, { count: 2 }));

// 이제 바뀐 state 를 받고 싶다.
