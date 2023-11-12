## redirect 방식에 대해서 전반적으로 정리

<p>로그인이 된 유저와, 그렇지 않은 유저에 있어서 페이지 접근 인가를 설정하는 방법에 있어서, 크게 두가지 방법을 배웠고, 아마 이후에도 이를 활용할 것 같다.</p>

- 조건은 로그인이 되었다면, 로그인 페이지에는 접근하지못한다
- 로그인이 안됬다면, 다른 나머지 페이지에도 접근하지 못한다.

> **페이지 별 getServerSideProps 를 통해 로그인 정보 확인**

```ts
export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
      // store에서 dispatch 하는 api
      type: t.LOAD_TO_MY_INFO_REQUEST,
    });

    store.dispatch(END);
    await (store as SagaStore).sagaTask?.toPromise();
    if (!store.getState().user.me) {
      // getState() 는 store의 트리를 가져와준다.
      return {
        // 이렇게 리다이렉트 해줄 수 있다.
        redirect: {
          destination: "/userlogin",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  }
);
```

- 확실하게 리다이렉트 하는 방법이다.
- 프론트서버로 벡엔드에서 쿠키를 넘겨주고, 이를 통해 로그인된 유저의 개인 정보를 dispatch 해서 가져온다
- 이후 유저 정보가 있다면 그대로 유지하고, 없다면 로그인 페이지로 리다이렉트 시킨다.
- 단점이라면 페이지별로 모두 설정을 해주어야 한다는점에 있다.

> **middleware 를 통해서 리다이렉트 설정하기**

<p>next.js 13 버전 이후 좀더 업데이트가 되었는데, 아직까지 사용법에 대해서 확신이 들정도로 알고 있는것은 아니였고, 로그인페이지와 나머지 페이지간의 쌍방 리다이렉트를 조건으로 풀기에는 무리가 있었다.</p>

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.has("connect.sid")) {
    // 기존방식
    const url = request.nextUrl.clone();
    url.pathname = "/userlogin";
    return NextResponse.redirect(url);

    // 새로운 방식
    return NextResponse.redirect(new URL("/userlogin", request.url));
  }
}

export const config = {
  matcher: "/closet/:path*",
};
```

- 현재까지 공부한 바에 의하면, 조건식을 사용할 수 있으며, 다만 matcher 의 설정이 되어있는 디렉터리 안에서만 가능한걸로 파악했다.
- 조건식을 쓰기 위해서는 로그인 여부를 쿠키에 접근해서 해결하려고 하였는데, 쿠키보다 로컬스토리지를 통해서 하는게 더 나을듯 싶다는 생각이 든다
- 쿠키를 자바스크립트로 접근하는것은 원래 기본적으로 막혀있다. 해킹의 위험이 있기 때문이다.
- 우선은 사용법을 익히는 과정이어서 httpOnly 를 false 로 했다
- 이를 통해 document.cookie 를 통해 접근이 가능하다

```ts
document.cookie = "connect.sid=; max-age=-1; path=/";
```

- 이름과 만료일자 그리고 반드시!!! path 를 정확하게 적어주어야 한다
- 전역에서 다루기 위해선 path 를 '/' 로 해주면 된다
- 다만 이렇게 되면 보안상에서 안좋다
