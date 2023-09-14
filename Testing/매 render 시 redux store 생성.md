## 매 render 시 redux store 생성하기

(아직까지는 확실한 코드는 아닌것 같지만, 디버깅으로 확인결과 store 를 성공적으로 생성하고 있는것을 확인하였기에 작성함)

### renderWithProvider

페이지나 컴포넌트에서 useSelector 나 dispatch 를 통해 redux 의 state 에 접근하고 있다면 그냥 render 를 해서는 에러가 발생한다. 당연하게도 렌더과정에서 redux 의 state 가 필요하기 때문이다. 이 부분에서 많이 햇갈릴 수 있는데, 우리가 처음 Redux 를 설정했을 때의 과정을 그대로 진행해서 render 함수에 overwrite 해준다고 생각하자.

### 설정하기 (공식문서에서는 redux toolkit 을 기반으로 되어있음)

현재 나는 아직 redux toolkit 을 활용하고 있지는 않았고, 추후 사용한다 하더라도 일단은 saga 를 사용하고 있으니 그에 맞게 setting 을 해보려 하기에 우선 그냥 Redux 를 사용할 떄 테스트 세팅을 해보자. <br />

```tsx
// 기존의 reducer
import { HYDRATE } from "next-redux-wrapper";

import user from "./user";
import post from "./post";
import screenEvent from "./screenEvent";

const rootReducer = (state: rootReducerType | undefined, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        post,
        screenEvent,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
```

- 현재 combineReducer 를 사용하고 있고, 그렇기에 지금 설정해둔 rootReducer 를 그대로 활용하면 좋다.
- next.js 는 페이지별 store 가 따로 생성되어야 하기에 next-redux-wrapper 라이브러리를 통해 해결하고 있다. (이 부분은 추후 다시 다루어보자)

```tsx
// setupStore

export function setupStore(preloadedState?: rootReducerType) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [sagaMiddleware];
  const enhancer: StoreEnhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}
```

- 새롭게 store 을 만들어주는 함수이다. 미들웨어 중 saga를 사용하기에 이를 enhancer 에 등록시켜주고, 이후 createStore 를 통해 기존 reducer 에 미들웨어를 추가한 store 를 생성해준다.
- sagaTask 는 이터레이터를 계속 실행시킨다고 생각하면 된다.
- 결국 store 를 return 한다.

```tsx

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: ReturnType<typeof setupStore>;
  preloadedState?: rootReducerType;
}

export const renderWithProvider = (ui: React.ReactElement, { preloadedState, store = setupStore(), ...renderOptions }: ExtendedRenderOptions = {}) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
        <RenderWithTheme>
          <Provider store={setupStore()}>{children}</Provider>
        </RenderWithTheme>
      </SWRConfig>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };


```

- 일반 컴포넌트를 children 으로 하여 감싸주는 Provider 를 추가해주겠다
- 매 렌더마다 새롭게 store 를 생성하도록 하였고, reducer 의 경우 우리가 기존에 설정해둔 그 reducer 이다.
- 함수 Wrapper 를 선언하고 내부 return 값으로 children 컴포넌트를 Provider(redux), Theme(styled-component), SWRConfig(SWR) 로 감싸준다
- 반환값은 store 와(추후 접근하기 위해) Wrapper 로 감싸진 render 함수이다.

```tsx
// overview.test.tsx

describe("overview", () => {
  it("render correctly", async () => {
    renderWithProvider(<Overview device='desktop' />); // render 대신 설정을 맞춘 renderWithProvider 를 사용

    const LastItems = OverviewResponseData.lastDatas;
    LastItems.forEach(async (item) => {
      const ItemName = await screen.findByText(item.productName);
      expect(ItemName).toBeTruthy();
    });
  });
});
```

- 매 태스트마다 redux 와 그 외 미들웨어, swr 등에 접근할 수 있게 된다.
