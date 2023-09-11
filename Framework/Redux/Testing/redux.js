// 이게 가장 핵심
export function createStore(reducer, middleware = []) {
  let state;
  const handler = [];

  // 개별 사용자가 만든 상태를 수정하는 함수를 전달해준다
  // redux 는 이 함수를 필요한 시점에 실행기킬 뿐이다.
  function dispatch(action) {
    // 항상 미들웨어가 호출이 된다.
    middleware(dispatch, action);
    // 근데 여기서 state 는 undefined 이며 updater 로 넘겨준다.
    state = reducer(state, action);
    // listener 에 해당하는 함수를 상태를 변경하고 그 다음 호출한다.
    handler.forEach((listener) => {
      listener();
    });
  }

  // 외부에서 상태를 얻게 하기 위해서
  function getState() {
    return state;
  }
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

// 외부에서 updater 을 호출하는 시점을 알려주기 위해 doUpdate 라는 함수를 사용한다.
// 이 함수는 외부에서 호출해야한다.

// 완성 코드
export function createStore(reducer, middlewares = []) {
  let state;
  const listeners = [];
  const publish = () => {
    listeners.forEach(({ subscriber, context }) => {
      subscriber.call(context);
    });
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    publish();
  };

  const subscribe = (subscriber, context = null) => {
    listeners.push({
      subscriber,
      context,
    });
  };

  const getState = () => ({ ...state });
  const store = {
    dispatch,
    getState,
    subscribe,
  };

  middlewares = Array.from(middlewares).reverse();
  let lastDispatch = store.dispatch;

  middlewares.forEach((middleware) => {
    lastDispatch = middleware(store)(lastDispatch);
  });

  return { ...store, dispatch: lastDispatch };
}

export const actionCreator = (type, payload = {}) => ({
  type,
  payload: { ...payload },
});
