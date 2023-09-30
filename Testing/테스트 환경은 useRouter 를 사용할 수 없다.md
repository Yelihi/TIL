## Next.js 의 useRouter 를 테스트 환경에서 사용하기 위해선

컴포넌트 단위 테스트나 통합 테스트를 진행하다보면 페이지간의 이동을 테스트하게 될 수 있다. 혹은 다른 테스트 사이에 라우팅 관계가 있을 수 있다. 예를 들어 하나의 컴포넌트가 성공적으로 랜더링 되는지 테스트 하는 과정에서 그 컴포넌트 내 Link 태그나 Router.push 가 사용되는 경우가 그러하다. <br />

이런 경우에 테스트를 진행 할 시 에러가 발생하는데 발생하는 에러는 다음과 같다.

```
Error: `NextRouter` was not mounted
```

<br />

위 에러에 대한 Next.js 공식 의견을 홈페이지에서 확인할 수 있는데, 요약하자면 Next.js 어플리케이션의 환경이 아닌 곳에서 useRouter 를 실행시켰을 때 발생하는 에러라고 한다. 즉, 테스트 환경은 Next.js 의 환경이 아니기에 테스트 시 위와 같은 오류가 발생하는 것이다.

### 해결책

공식 홈페이지에서도 그렇고 이 전에 이러한 함수들을 테스트 환경에서 실행 시킬 때 하던것처럼 useRouter 를 mocking 작업 해야한다. 우선 모듈을 mocking 한 다음 이 모듈 내 useRouter 를 mocking 하도록 하자 <br />

```tsx
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));
```

<br />

다른 방식도 있었는데 위 방식이 가장 하기 편해서 위처럼 mocking 했다.

### 남은 과제

컴포넌트간의 조건부 렌더링에 대한 테스트가 아닌, 실제 라우팅을 통한 페이지 이동에 대한 테스트는 진행해본적이 없다. 예를 들자면 navigation 에 있는 메뉴 Link 에 대한 테스트 등이 있겠다. 이러한 테스트를 진행할 때 위와 같은 useRouter 의 mocking 방식이 제대로 작동할지는 미지수이다. (예상컨데 매 테스트 라우팅 마다 따로 route 를 설정해주어야 한다 생각한다.) <br />

<a href="https://github.com/vercel/next.js/issues/7479" target="_blank">관련된 이슈사항</a>
