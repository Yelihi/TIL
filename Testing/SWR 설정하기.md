## 데이터 Fetching 을 SWR 로 할 경우

페이지나 컴포넌트를 렌더링 할 때 서버로부터 데이터를 받아와야 하는 경우에, 데이터 캐싱을 위하여 보통 React-query 나 SWR 을 사용하게 된다. 이 중 SWR 을 사용할 때, 테스트 내 render 실행 시 의도한 시나리오 대로 흘러가지 않을 수 있는데 이를 수정하는 방법을 알아보자

### cache

jest 를 통해 테스트를 할 때, 데이터를 매번 비용을 지불하여 불러오는것이 아니라 MSW 를 활용하여 중간에 요청을 가로챈 뒤 시나리오에 맞는 응답을 대신 전달해주는 방식으로 할 수 있었다. 기본 axios 를 통한 데이터 가져오기는 문제가 없었는데, SWR 의 경우 받아온 데이터의 한하여 일정기간동안 캐시해놓기 떄문에, 문제가 발생할 수 있다. <br />

```tsx
// overview.test.tsx

describe('overview', () => {
  // 여기서 처음 SWR 의 matcher 를 통해 API 에 요청
  it('데이터가 온전히 들어왔을때는 5개의 의류 리스트가 보여야 한다', () => {
    render(<Overview />)

    //...
  })

  // 두번째 요청이기에 같은 key(API) 로의 요청 --> 이미 첫번째 받아온 데이터가 캐싱되어있음 (stale-while-revalidate)
  it('데이터가 없을 경우 '저장된 의류가 없습니다' 라는 문구가 보여야 한다', () => {
    server.use(dateFetching()) // 비어있는 데이터를 가져오기

    render(<Overview />)
  })
})

```

<br />

우리가 원하는 시나리오는 첫번째 테스트에서는 온전한 데이터를 받아와 렌더링 하고, 두번쨰 독립적인 테스트에서는 빈 데이터를 받아와 이에 맞는 상황을 연출하는것이다. 하지만 같은 key 로의 요청에 의하여 SWR 의 캐싱에 의해 두번째 테스트에도 여전히 온전한 데이터를 가져오게 된다. <br />

즉, 매 독립적인 테스트마다 캐시된 데이터를 없에야 한다는 것이 포인트이다!

### 설정방법

첫번째로 시도해보았던 방법은 jest.setup.js 파일에서의 매 태스트 시작마다 cache 를 삭제해주는 방법이었다. <br />

```js
import "@testing-library/jest-dom";
import { cache } from "swr/_internal";
import { server } from "./__mocks__/server.js";

// 테스트를 하기 전 API mocking 을 생성한다
beforeAll(() => server.listen());

// 매 테스트 마다 계속해서 핸들러를 리셋하준다. 그래야지 다른 테스트에 영향을 끼치지 않는다.
afterEach(() => {
  cache.clear();
  server.resetHandlers();
});

// 모든 테스트가 완료되면 server 를 clean 한다.
afterAll(() => {
  cache.clear();
  server.close();
});
```

<br />

매 테스트 마다 캐시를 삭제해주면 될 것이라 판단하여 swr 의 cache 를 가져왔는데, 실제 테스트를 돌려보니 여전히 오류 매시지가 발동했다. 그래서 그 다음 방법으로 직접 SWRConfig 에 설정을 변경해주기로 하였다. <br />

```tsx
//... 생략

// SWRConfig 내 value 설정을 아래처럼 해주자. 예전에는 dedupingUnterval : 0 만으로도 됬는데 요즘은 안될떄도 있다고 한다.
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
          <Provider store={setupStore()}>{children}</Provider>
        </RenderWithTheme>
      </SWRConfig>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
```

<br />

위와 같이 설정해주고 테스트 렌더 함수를 render() ---> renderWithProvider() 로 변경해줌으로서 무리없이 테스트를 완료할 수 있었다.

### 참고 문헌

<a href="https://github.com/vercel/swr/discussions/617" target='_blank'>Test Cases for useSwr in jest</a>
