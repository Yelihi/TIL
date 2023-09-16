## MSW 활용하기

### 사용이유

코드 수정이 빈번한 프론트엔드의 경우 자칫 잘못 수정되어 문제가 발생할 수 있기에 테스트코드를 먼저 작성하는것이 선호되고 있다. 테스트 코드를 작성할 떄 여러 난관들 중에 하나로 백엔드 API 와 연동되는 코드를 수정할 때가 있다. 코드 수정 자체에서 문제가 발생할 수도 있지만 프론트가 아닌 백엔드 단에서 API 에 대한 수정이 진행되고 그로 인하여 프론트엔드와 백엔드 간 API 스키마가 일치되지 않는 경우들이 발생하게 된다. 즉, 당시에 제대로 작성된 테스트코드라 할지라도 언제든지 오류를 발생할 수 있고, 이 오류가 프론트엔드 개발 진행 속도에 영향을 끼칠 수 있다는 점이 있다. <br />

이런 상황을 모색하고자 테스트 작성 시 MSW 를 도입하면 훨씬 수월하게 테스트를 작성할 수 있다.

### 원리

MSW 의 목적은 단순하면서 효과적이다. 기존 API 를 통해 서버로 request 보내는 것을 중간에 가로채서 테스트 용도의 response 를 대신 보내주는 역할을 한다. 즉, 가상의 서버가 중간에 생겼다고 생각하면 된다. (이것도 리버스 프록시의 일종인지는 잘 모르겠다..) <br />

MSW 는 한번의 모킹 처리를 통해 브라우저와 노드 환경을 대응할 수 있다. <br />

- Browser --> (request) --> Service Worker --> (request clone) --> msw
- Browser <-- (mockedResponse) <-- Service Worker <-- (Mocked response) <-- msw
  <br />

브라우저에서는 Service Worker 를 이용해 서버로 요청하는 request 를 가로채 moking한 API 를 반환해준다. 노드환경에서는 node-request-intercetopr 라이브러리를 사용하여 http, https, XMLHttpRequest 모듈을 확장해서 처리한다.

### MSW 설정

최근 테스트 셋팅중인 Closet 프로젝트 내에서 설정한 코드를 통하여 기본 세팅을 살펴보자.

- 설치

```bash
npm i msw --save-dev
```

- mocking handler 구성

```tsx
import { rest } from "msw";

const postUserInfo = (isfalse?: boolean) => {
  return rest.post(
    "http://localhost:3065/user/create",
    async (req, res, ctx) => {
      if (isfalse) {
        return res(ctx.status(500));
      }

      return res(ctx.status(200), ctx.text("가입해주셔서 감사합니다."));
    }
  );
};

const userLoginHandler = [postUserInfo()];

export default userLoginHandler;
```

- 핸들러 관리

```tsx
import userLoginHandler from "../__mocks__/userLogin/handlers";

export const handlers = [...Object.values(userLoginHandler)];
```

- (노드) server.js

```js
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

- (노드) jest 를 통한 테스트 진행 시점과 실행 후 server on/off 설정

```js
// jest.setup.js
import "@testing-library/jest-dom";
import { server } from "./__mocks__/server.js";

// 테스트를 하기 전 API mocking 을 생성한다
beforeAll(() => server.listen());

// 매 테스트 마다 계속해서 핸들러를 리셋하준다. 그래야지 다른 테스트에 영향을 끼치지 않는다.
afterEach(() => server.resetHandlers());

// 모든 테스트가 완료되면 server 를 clean 한다.
afterAll(() => {
  server.close();
});
```

<br />

브라우저의 경우 셋팅을 따로 해주어야 하는데, 이는 추후에 다시 알아보도록 하자

### 참고 문헌

<a href="https://www.fronttigger.dev/2022/react/msw-test" target="_blank" >MSW를 활용해 프론트엔드 테스트하기 (feat. Jest)</a>
