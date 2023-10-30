## 상태 코드에 따른 에러 페이지 렌더링 (page routing)

next.js 에서는 여러 서버에러 사항에 대한 커스텀 에러 페이지를 쉽게 설정할 수 있다. 기본적으로 가장 많이 발생하는 에러인 404, 500(statusCode) 에러의 경우는 next 에서 404.js, 500.js 를 생성하여 커스텀해주면 된다. <br />

만일 커스텀하지 않는다면 기본적으로 정적 페이지로 next 에서 제공하는 페이지가 렌더링 된다. 커스텀이 방식은 자유로우나, 지켜야 할 규칙은 파일의 이름인데, 반드시 404, 500 으로 작성해주어야 한다. (당연하게도 이러한 에러페이지는 정적 페이지로 빌드하는것이 제일 좋다.) <br />

```js
// page/404.js

export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}
```

<br />

상태 코드 500 에러 역시 마찬가지이다. <br />

```js
// page/500.js

export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>;
}
```

<br />

그렇지만 에러 상태가 반드시 404, 500 으로만 발생하지는 않는다. 예시로서 401(unauthorized), 400(bad request), 403(forbidden error) 등 상황에 따라 다양한 상태 코드에 해당하는 에러가 발생한다. 이러한 에러들에 대해서 좀 더 사용자에게 구체적으로 보여주고 싶을 때가 있을 것이다. <br />

이에 next 는 에러 페이지를 좀 더 간단하게 커스터마이징 할 수 있도록 \_error.js 형식을 제공한다. <br />

```js
// page/_error.js

function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

// Response 의 상태코드를 props 로 전달하여, Error 컴포넌트가 코드를 렌더링하게 된다.
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
```

<br />

네이밍에 주의하자. \_error 로 작성하여야 한다. 또한 주의할 점은 이 커스텀 에러 페이지는 production 환경에서만 사용되기에, 확인 역시 dev 환경에서는 불가능 하다. <br />

마지막으로 현재 프로젝트 내에서 타입스크립트 환경 내 Error 페이지를 구현한 예시를 살펴보자. <br />

```ts
import { ReactElement } from "react";
import { NextPageContext } from "next";

import RenderNextErrorPage from "../components/state/error/RenderNextErrorPage";
import AuthLayout from "../components/AuthLayout";

type ErrorComponentProps = {
  statusCode?: number;
};

const CustomError = ({ statusCode }: ErrorComponentProps) => {
  return <RenderNextErrorPage state='Next' statusCode={statusCode} />;
};

// 참고로 Error 페이지는 기존 페이지들에 설정된 레이아웃과 다르게 적용하기 위해 따로 레이아웃을 설정하였다.
CustomError.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
```
