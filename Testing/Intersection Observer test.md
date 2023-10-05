## Intersection Observer

사이드 프로젝트에서 모바일 환경 시 무한 스크롤을 구현하였고, 이에 대한 테스트를 진행하려하였다. <br />

- 컴포넌트 렌더링
- 첫 랜더링 시 렌더링되는 의류 아이템의 갯수
- 스크롤 이벤트 발생
- isIntersecting 으로 인한 데이터 추가 요청
- 이후 랜더링 되는 의류 아이템 갯수 확인

<br />

위 순서대로 테스트 코드를 작성해주면 된다.

### 첫번째 작업: Intersection Observer mocking

mocking 없이 테스트 코드 실행 시 에러가 발생하게 된다. (observe() is not found). 따라서 먼저 커스텀한 Intersection Observer 를 만들어준다.
<br />

```js
// setup.js

export const mockIntersectionObserver = class {
  constructor(callback, options) {
    this.root = options.root === null ? window : options.root;
    this.rootMargin = options.rootMargin;
    this.thresholds = options.thresholds;
    this.takeRecords = options.takeRecords;
    this.viewPort = options.root === null ? window : options.root;
    this.entries = [];
    this.viewPort.addEventListener("scroll", () => {
      this.entries.map((entry) => {
        entry.isIntersecting = this.isInViewPort(entry.target);
      });
      callback(this.entries, this);
    });
  }

  isInViewPort(target) {
    return window.scrollY >= 750;
  }

  observe(target) {
    this.entries.push({ isIntersecting: false, target });
  }

  unobserve(target) {
    this.entries = this.entries.filter((ob) => ob.target !== target);
  }

  disconnect() {
    this.entries = [];
  }
};
```

<br />

Intersection Observer 의 경우, 미리 설정해둔 root 와 observe 할 target 을 설정한 다음 target 의 일정 비율(thresholds) 만큼 viewport 에서 관측이 되면 넘겨준 callback 함수가 발동한다. <br />

현재까지 테스트의 한계점은 이벤트리스너를 활용한다는 점에 있다. 원래 Intersection Observer 는 이벤트리스너를 활용하지 않지만, 테스트 환경에서 이를 더 정확하게 구현하기 힘들어서 직관적으로 스크롤의 높이가 얼마일 때로 테스트를 진행하기로 하였다. <br />

```tsx
// store.test.tsx

// 실제 IntersectionObserver 에 커스텀버전을 적용시킨다
window.IntersectionObserver = mockIntersectionObserver;
```

### 두번째 작업 : 상황에 맞는 API 를 msw 로 설정 및 jest.spyOn

현재 무한스크롤 구현과정에서 swrInfinite 를 활용하고 있고, 특징이라면 서버측에서 nextcursor 번호를 같이 넘겨주게 된다. 이후 스크롤 이동 시 전달받은 nextcursor 가 queryparameter 로 전달되어 서버에게 요청이 들어가게 된다. <br />

swr 의 경우 요청이 들어갈 시 조금은 비효율적일 수 있으나, 첫번째 0번부터 매 cursor 에 해당하는 데이터 단위만큼 분할하여 요청을 하게 된다. 예를 들면 nextcursor 간격이 10이라 치면, 0, 10, 20, 30... 이렇게 순차적으로 response 를 받게 된다. <br />

다만 실질적으로 서버에 요청이 들어간 사항은 마지막 10개의 데이터인데, 이유는 이전 데이터를 요청하는 URL key 는 이미 cache 화 되어있기 때문이다. 즉 나머지는 cache 데이터를 전달하고 최신 데이터만 서버에 요청을 하는것이니 한번 가는것이라고 할 수 있겟다.<br />

여하튼 이런 cursor 에 대한 msw API 설정을 먼저 해주자. (이는 생략)<br />

이렇게 됬다면 한번 테스트 코드를 작성해보자 <br />

```tsx
it("phone 환경에서 스크롤을 내리면 추가 데이터를 fetching 한다", async () => {
  const TestStore = await MakeStore([t.LOAD_ITEMS_REQUEST]);

  renderWithProvider(<Store device='phone' />, { store: TestStore });

  const Title = await screen.findByTestId(/storeTitle/i);
  const ItemCards = await screen.findAllByTestId(/itemcard/i);
  expect(Title).toBeInTheDocument();
  expect(ItemCards).toHaveLength(9); // 원래 9개에서

  // 실측 시 750정도 이상 내려갈 시 ref 마주침
  fireEvent.scroll(window, { target: { scrollY: 800 } });

  const AfterItemCards = await screen.findAllByTestId(/itemcard/i);

  expect(AfterItemCards).toHaveLength(10); // 10개로 증가한다.
});
```

<br />

허나 이 테스트는 예상대로의 결과를 나타내지 않는다. 여전히 9개로 측정이 되는데 이는 테스트코드의 실행 순서와 타이밍과 연관이 있다. <br />

- 먼저 9개의 의류가 렌더링 된다
- 스크롤을 아래로 내려 isIntersecting 이 true 가 된다.
- (약간의 시간 소요) 서버에 데이터fetching 을 요청한다
- (약간의 시간 소요) 데이터를 받아와 다시 렌더링 한다.
- 이후 10개가 된다.

<br />

즉 스크롤을 내렸을 시, 성공적으로 아이템이 추가되기까지 각각의 과정에서 약간의 시간이 소요됨을 확인할 수 있다. 이를 확인하기 위해서 jest.spyOn 을 활용해보자 <br />

```tsx
it("phone 환경에서 스크롤을 내리면 추가 데이터를 fetching 한다", async () => {
  const spy = jest.spyOn(axios, "get"); // axios 의 흐름을 관측해보자
  const TestStore = await MakeStore([t.LOAD_ITEMS_REQUEST]);

  renderWithProvider(<Store device='phone' />, { store: TestStore });

  const Title = await screen.findByTestId(/storeTitle/i);
  const ItemCards = await screen.findAllByTestId(/itemcard/i);
  expect(Title).toBeInTheDocument();

  // 처음 컴포넌트를 랜더링 할 시 axios 가 호출되는것은(즉, 데이터요청) 3번이다.
  // store 컴포넌트에서는 desktop 과 phone 모두 한번에 데이터패칭을 하기 때문이다.
  // 중요한 점은 모두 queryparameter 로 lastId = 0 이다.
  expect(spy).toHaveBeenCalledTimes(3);
  expect(ItemCards).toHaveLength(9);

  // 실측 시 750정도 이상 내려갈 시 ref 마주침
  fireEvent.scroll(window, { target: { scrollY: 800 } });

  await waitFor(() => {
    // 스크롤 이벤트가 발생할 시 위에서 설명한것처럼 0번째부터 페이지단위만큼 나누어서 요청을 한다.
    // 총 10개의 데이터이니 0~9, 10 이렇게 데이터를 나눠 요청하게 된다.
    // 그렇기에 기존 3번에서 5번으로 요청이 증가하게 된다. (총 요청횟수)
    expect(spy).toHaveBeenCalledTimes(5);
    // 마지막 요청의 주소를 조니 lastId=23 이 적혀있다.(실제 의류의 id 값)
    expect(spy).toHaveBeenNthCalledWith(
      5,
      "https://api.closet-online.com/posts/clothes/store?lastId=23&categori=&deviceType=phone",
      { withCredentials: true }
    );
  });

  const AfterItemCards = await screen.findAllByTestId(/itemcard/i);

  await waitFor(() => {
    // 이후 데이터가 1개 추가되어 총 10개가 랜더링 되어있다
    expect(AfterItemCards).toHaveLength(10);
  });
});
```

<br />

주석에서 설명하였듯이 스크롤에 따른 요청의 증가가 있고, 이를 기다려주기 위해 await waitFor 를 활용하였다. 즉 5번의 요청이 될떄까지 기다리며, 이후 다시 랜더링 될 10개의 아이템을 AfterItemCards 가 전부 랜더링 될 때까지 기다린 다음 expect 로 확인해준다. <br />

- spyOn 을 통해 실제 api 로의 데이터 요청이 되는지 확인
- 이전 9개의 데이터가 10개로 증가함을 확인
- window.scrollY 의 수치를 600, 500 등으로 낮출 경우 지정 위치까지 이동하지 않았기에 테스트 오류 확인
  <br />

이러한 과정을 통해 Intersection Observer 의 테스팅을 마무리할 수 있었다.

### 한계점과 react-intersection-observer

아쉬운 점이라면 우선 스크롤 이벤트로 Intersection 을 커스텀 하였다는 점에 있다. 의도대로의 테스트라면 지정해둔 target 이 viewport 내 설정 비율만큼 나타났을 시 isIntersectiong 이 true 가 되어야 한다. 즉, 어느정도의 스크롤 수치를 모르더라도 테스팅이 진행이 되어야 했다.<br />

실제 커스텀하게 작성한 것을 보면 직접 scrollY >= 750 으로서 조건을 작성했음을 확인할 수 있다. 좋은 방향은 아니라 생각이 든다. <br />

만일 실제 업무에서의 Intersection Observer 의 활용이라면 차라리 라이브러리인 react-intersection-observer 를 활용할 것 같다. 실제 설정도 간단하고, 무엇보다도 테스팅 역시 가이드라인이 있어서 어렵지 않게 진행할 수 있다.
