## MSW 를 통하여 받아온 데이터를 Store 내에 저장하여 페이지를 성공적으로 렌더링 시키기

jest 에서 redux 를 통한 외부 store 에서 state 변화에 대하여 테스트 하기 위해선 직접 mocking store 를 생성하고, 전달하고자 하는 action 을 작성해주면서 매 테스트 상황마다 알맞게 조정해줄 수 있다. <br />

이를 위한 store-mocking 라이브러리도 존재하지만 next.js 의 getServerSideProps 내에서 store 에 접근한 다음 dispatch 를 하고 있었던 내 프로젝트에서는 뭔가 적합해보이지 않았다. 즉, 페이지를 클라이언트 단에서 useEffect 를 통한 dispatch 가 아니라 이미 렌더링하는 시점에 state 가 변경되어 있어야 했고, 이러한 변경은 서버에서 데이터를 수신하는것으로 부터 시작한다. <br />

이미 전부터 msw 를 사용하고 있었고 이를 통해 중간에 API 를 인터셉터 하여 원하는 데이터를 받고, 이를 state 에 반영하여 페이지를 렌더링 하는 방식이 더 좋다고 판단하였다. <br />

- 페이지로 이동할 시, redux-saga 를 통한 request 요청.
- msw 를 통해 request 를 받아 테스트 용 response 를 전달
- response 를 reducer의 로직에 따라 적절하게 state 에 반영
- 이렇게 반영된 state 를 Provider 를 통해 실제 렌더링할 컴포넌트에 전달한다.

### 문제는 getServerSideProps 와 next-redux-wrapper

테스트를 진행하기 위해선 configStore 에서 생성하던 store 와 동일한 store 를 생성해야 했고, 여기까지는 그리 어렵지 않게 할 수 있었다. <br />

```tsx
export function setupStore(preloadedState?: rootReducerType) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [sagaMiddleware];
  const enhancer: StoreEnhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}
```

<br />

미들웨어인 saga 를 적용시킨 store 를 return 한다. store 는 메서드로 getState, dispatch 등을 가지고 이를 Provider 에 전달하여 실제 Provider의 children 컴포넌트들은 reducer state 에 접근이 가능, 메서드 사용이 가능해진다. <br />

매번 테스트마다 위 함수를 작성할 순 없으니, 테스트용 페이지 렌더링 시 공통적으로 사용하게 될 renderWithProvider 를 만들어주었다. <br />

```tsx
export const renderWithProvider = (
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupStore(),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
        <RenderWithTheme>
          <Provider store={store || setupStore()}>{children}</Provider>
        </RenderWithTheme>
      </SWRConfig>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
```

<br />

참고로 SWR 역시 사용하기 때문에 SWRConfig 역시 추가해주었고 Styled-Component 를 위한 테마 적용도 해주었다. 그 다음 자식 컴포넌트를 Provider 로 감싸준 다음 store 를 내려준다. 외부에서 store 를 얼마든지 전달할 수 있도록 설정해주었다. <br />

이제 고려해야할 부분은 dispatch 를 하는 시점이었다. useEffect 를 통한 클라이언트 단의 요청이 아니라 서버사이드 단에서의 dispatch 요청 이후 props 로 전달되는 initialState 를 기반으로 페이지가 렌더링 되는 SSR 이었기에, getServerSideProps 를 테스트에서도 다루었어야 했다. <br />

```tsx
// store.tsx

// 생략

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    // 실제 서버와의 연동이 아니기 때문에 이 부분은 패스해주면 된다.
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    // 역시나 실제 모바일 환경에서의 접속이 아니기 때문에 이 부분도 패스
    const userAgent = context.req
      ? context.req.headers["user-agent"]
      : navigator.userAgent;
    let isMobile = false;
    if (userAgent) {
      isMobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      );
    }

    // 첫번째 dispatch 요청이며, 이번 테스트에서는 다루지 않을것이라 패스. 다만 나중에 다시 추가할 수 있다.
    store.dispatch({
      // store에서 dispatch 하는 api
      type: t.LOAD_TO_MY_INFO_REQUEST,
    });

    // 실질적으로 실행되어야 할 dispatch
    store.dispatch({
      type: t.LOAD_ITEMS_REQUEST,
    });

    store.dispatch(END);
    await (store as SagaStore).sagaTask?.toPromise();

    // redirect 에 대한 사항이기에 테스트에서 다룰 사항은 아니다. 패스
    if (!store.getState().user.me) {
      return {
        redirect: {
          destination: "/userlogin",
          permanent: false,
        },
      };
    }
    // props 로 deviceType 이 결정되는데 테스트환경내에서는 직접 설정해주면 된다. 패스
    return {
      props: {
        device: isMobile ? "phone" : "desktop",
      },
    };
  }
);
```

<br />

결론적으로 현재 getServerSideProps 내에서 실제 테스트에서 필요한 부분은 dispatch 한 부분이고, 나머지는 패스해도 무관하다. 다만, 분명한것은 useEffect 를 통한 요청이 아니기에 페이지를 렌더링하기 전에 이미 state 가 업데이트 되어 있어야 한다는 점이다.

### 첫 번째 시도: getServerSideProps 를 테스트환경에서 실행시키기

말 그대로 페이지 Store 내의 getServerSideProps 함수를 실행시켜 store 를 업데이트 한 뒤 Store 페이지를 렌더링 하면 문제가 해결될 것이라 생각했다. jest 에서 SSP(줄여서 사용하겠다)역시 함수이기 때문에 실행시킬 수 있다. (async 만 제대로 써주자) <br />

문제는 next.js 에서 사용하는 next-redux-wrapper 라이브러리였다. SSP 는 함수컴포넌트가 아니기에 useSelector, useDispatch 등을 사용할 수 없다. 즉, 생성한 store 내의 메서드인 getState, dispatch 를 사용해야 하기에 store 를 고차함수의 인자로 전달해주어야 했다. 또한 Next.js 의 경우 기본적으로 store 가 한개가 아니다. 이러한 특징들 때문에 next.js 에서 redux 를 사용할 때 next-redux-wrapper 를 같이 사용하는 것이 좋다. 여하튼 이러한 특징 때문에 wrapper 속 state 에 접근하는게 쉽지 않았다. <br />

```tsx
// store.test.tsx
// 우선적으로 context 를 지정해주어야 한다.
const context = { ctx: { req: {} } } as any;
// SSP 를 wrapper 로 감싸주어 실행시킬 수 있는데, 이렇게 store 를 SSP 내부로 전달하여 dispatch 를 통해 state 를 업데이트 할 수 있다.
const serverSideProps = await wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch({
      type: t.LOAD_ITEMS_REQUEST,
    });

    store.dispatch(END);
    // 미들웨어 saga 를 실행시킨다.
    await (store as SagaStore).sagaTask?.toPromise();

    // 이 부분은 그냥 패스해도 된다.
    return {
      props: {
        device: "desktop",
      },
    };
  }
)(context.ctx); // 즉시 실행시켜준다. 앞서 생성해둔 context를 인자로 넘긴다. 원래대로라면 서버에서 req 를 받게된다.
```

<br />

실제 위 함수를 실행시켰을 때 serverSideProps 에 저장되는 값을 디버그툴로 확인해보면 성공적으로 msw 에서 데이터를 받아와 store 에 저장하였음을 알 수 있다. <br />

이제 이를 Provider 의 store 에 전달해주면 되는데, 여기서 꽤나 고생을 하였었다. <br />

```tsx
// 코드를 이어서...

// 실제 afterStore 의 경우의 수는 { redirect: redirect } | { noFound: boolean } | { props : {} } 로 나뉘게 된다.
// 우리는 분명하게 디버그를 통해서 props 가 있음을 확인했기에 불가피하지만 그냥 타입 단언을 해주겠다
const afterStore = (serverSideProps as StoreProps).props.initialState;

// 위에서 살펴보았던 Provider 에 store 를 전달해준다.
renderWithProvider(<Store device='desktop' />, { store: afterStore });
```

<br />

여기서 에러가 발생하는데 바로 store.getState is not a function 이라는 오류가 발생한다. 어째서일까?

### SSP 가 페이지에 전달하는 것은 Props! 즉, 특정 값이다.

처음 store 에 afterStore 를 전달할 때 타입오류가 발생하였었다. `Store<rootReducerType, AnyAction>` 이라는 store 타입에 대입할 수 없다는 오류였다. 처음에는 afterStore 가 가지는 { user: Objcet, post: Object, me: Object ... } 와 같이 State 를 나타내는 타입과 동일한 의미가 아니었나? 하고 의문이 들었다가 그냥 afterStore 타입을 위처럼 맞추어서 renderWithProvider 에 전달하였다. <br />

여전히 렌더링오류가 발생하고 있었고, 그러다 문득 store.dispatch 의 이 메서드는 어떻게 접근이 가능한지에 대해 고민하게 되었다. 그리고 깨달은 것은 위 타입 `Store<rootReducerType, AnyAction>` 가 내포하고 있는 타입에는 dispatch, getState 도 포함이라는 것을 알게 되었다. 즉, Provider 에 전달되어야 하는 store 는 initialState 가 아니라는 것을 알게 되었다. (store.getState = initialState) <br />

이렇게 되니 다시 고민에 빠지게 되었는데, next-redux-wrapper 를 통해 store 가 wrapper 로 감싸졌기 때문이다. wrapper 에서 store 로 접근하는 방법을 찾아보았지만 쉽게 나오질 않았다. 그렇다고 wrapper 를 renderWithProvider 의 store 로는 전달할 수 없었다. (형식이 맞지 않다.) <br />

- store 를 생성한다. (초기 상태값)
- dispatch 를 통해 상태값을 업데이트 한다
- 상태값은 현재 업데이트 되어있고, 페이지의 렌더링을 위해 store 를 renderWithProvider 에 전달한다. (상태값이 아닌)
- 페이지인 Store 는 내부에서 useSelector 를 통해 변경된 state 에 접근한 다음(store.getState) 필요한 데이터를 가져온다
- 이 데이터를 기반으로 렌더링한다.
  <br />

결국 store 를 전달할 수 있어야 한다는것이 과제였다.

### 두 번째 방법: 굳이 SSP 를 사용하지 않고 store 를 전달하기

처리 과정을 다시 한번 살펴보니, 굳이 SSP 를 통해 상태를 업데이트 할 필요가 없다는것을 알게 되었다. 테스트 환경에서는 페이지 렌더링 시점을 조절할 수 있기 때문에, 페이지를 렌더링 하기 전에 먼저 상태값이 업데이트 되어있는 store 를 전달해주면 되는 것이었다. <br />

- store 를 생성한다 (초기 상태값)
- dispatch 를 통해 상태값을 업데이트 한다
  <br />

위 부분을 진행한 다음, 생성된 store 를 그대로 Provider 에 전달을 해주면 해결되는 것 아닐까 생각이 들었다. 즉, 서버 사이드 단에서 처리되는 작업을 테스트환경에서 직접적으로 동기적으로 처리하겠다는 의미이다. <br />

next-redux-wrapper 를 사용하는 이유 역시 테스트환경에서는 자동적으로 해결이 된다고 생각이 들었다. 기존 react 환경에서는 SPA 이면서 클라이언트 사이드 렌더링이기에 store 가 하나 존재하게 되면 되었지만, Next.js 의 경우 SSG 혹은 SSR 이 관련되어있어 Redux 와 연관된 페이지를 렌더링 하기 위해서는 서버에 따로 store 인스턴스가 필요하기 때문에 라이브러리가 필요했다. 또한 SSP 에서도 dispatch 등을 통해 store 에 접근이 가능하게 해주기에 반드시 필요한 라이브러리였다. <br />

그렇기에 테스트환경에서는 매번 store 인스턴스를 생성하여 Provider 에 전달하고 있기에 문제가 없고, 한번의 테스트에 여러 테스트를 전부 다루는것도 아니기에 다른 문제가 발생할 것 같지 않았다. (next-redux-wrapper 는 자동으로 store instance 를 생성하고 모두 동일한 상태인지 확인한다. 즉 클라이언트와 서버간의 store 일치성을 보장한다). 테스트 환경은 굳이 클라이언트와 서버간의 렌더링 차이를 나눌 필요가 없다 판단하였다. <br />

이를 통해 먼저 store 를 생성해주자 <br />

```tsx
// store 생성 함수
import { END } from "redux-saga";
import { SagaStore } from "../../store/configureStore";

import { setupStore } from "../../util/TestUtils/renderWithProvider";

type MakeStoreProps = string[];

export const MakeStore = async (actionTypes: MakeStoreProps) => {
  const store = setupStore();

  // dispatch 는 promise 반환이기에 여러 action 을 처리하기 위해 promise.all
  // 하나의 요청이라도 실패했을 경우 진행이 안되는것이 테스트에 좋다 판단
  await Promise.all(
    actionTypes.map((actionType) => store.dispatch({ type: actionType }))
  )
    .catch((err) => console.error(err))
    .then(() => {
      store.dispatch(END);
      (store as SagaStore).sagaTask?.toPromise();
    });

  return store;
};
```

<br />

이후 테스트 코드를 작성해보면 <br />

```tsx
// store를 생성한 다음(이미 dispatch 가 적용된) -> 이를 Provider 에 전달해준다
describe("Store", () => {
  it("성공적으로 렌더링된다", async () => {
    const TestStore = await MakeStore([t.LOAD_ITEMS_REQUEST]);

    renderWithProvider(<Store device='desktop' />, { store: TestStore });

    const Title = await screen.findByTestId(/storeTitle/i);
    expect(Title).toHaveTextContent(/CHECK YOUR ITEMS/i);
  });
});
```

<br />

이후 성공적으로 테스트가 통과됨을 확인할 수 있었다.

### 정리

여러 시행착오를 거쳐서 redux 사용 컴포넌트를 테스트 하는 방법을 익히게 되었고, 생각해봤을 때 next-redux-wrapper 라이브러리를 제대로 이해하지 못해서 발생한 시행착오라 생각이 들었다.
