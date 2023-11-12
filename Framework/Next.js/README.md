### redirect 방식에 대해서 전반적으로 정리

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

### resetting state after navigation

<p>프로젝트 구현을 진행하다가, 메뉴바에서 페이지를 navigate 시킬 때, redux 의 상태값이 초기화 되지 않는다는 점에서 클릭했던 메뉴바가 그대로 활성화된 상태로 유지된다는 점에서 문제점이 발생하였다. 이것 역시 문제이지만, 전역스타일에서 body 부분에 sidebar menu 가 활성화 될 시 스크롤을 없에는 overflow: hidden 을 적용시켰기 때문에 이 상태 역시 페이지가 이동해도 그대로 유지된다는 문제점이 덩달아 발생하였다. 이를 해결하기 위해서 공식문서에서 제안하는 방식을 따라서 해보자</p>

```js
// pages/[slug].js
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Page(props) {
  const router = useRouter();
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Page: {router.query.slug}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <Link href='/one'>one</Link> <Link href='/two'>two</Link>
    </div>
  );
}
```

<p>위의 예시는 실제로 공식문서에서 상태값이 그대로 변하지 않는 상황을 예시로 보여주는 코드이다. 실제로 원하는데로 구현하는 것이라면 count를 버튼으로 증가시키되, 링크를 통해 one 에서 two 로 이동하게 되면 혹은 그 반대일 경우 자연스럽게 상태값이 초기화가 되도록 하여야 한다. 하지만 실제는 초기화가 되지 않는다.</p><br />

<p>Next.js에서 같은 페이지로 이동할 때 부모 구성 요소가 변경되지 않는 한 반응이 마운트 해제되지 않기 때문에 페이지의 상태는 기본적으로 재설정되지 않는다.</p><br />

<p>그리고 이에 대한 해결책으로 useEffect 를 활용하라 제안한다. useEffect 를 통해 params 의 변동이 생길 시 상태값을 초기화 하도록 설정할 수 있다.</p>

```js
// pages/[slug].js
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Page(props) {
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [router.query.slug]);

  return (
    <div>
      <h1>Page: {router.query.slug}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <Link href='/one'>one</Link> <Link href='/two'>two</Link>
    </div>
  );
}
```

- 이 왜에도 컴포넌트에 key 값을 router.asPath 를 넘겨주는 방식으로 처리할 수도 있다. key 값이 변경되기 때문에 react 는 다시 컴포넌트를 mount 하게 된다.

<p>다만 내 경우에는 이를 응용할 순 있었어도 그대로 작용하기에는 무리가 있었다. 우선적으로 다른 페이지로의 전환이 되는 상황에서 redux 의 상태값이 유지되는 문제였기 때문이다. hydrate를 진행시키기 위해 각 페이지마다 ssr 을 설정해주면 자연스럽게 초기화가 진행이 되었지만, 현재는 그런 상황이 아니었기에, 페이지 이동 후 컴포넌트가 실행이 될 때 기존 redux 의 상태값을 따로 업데이트 시켜주어야 했다. 따라서 이번에는 그냥 useEffect 를 활용해서 redux 에 dispatch 를 보내서 간단하게 해결은 했다. 다만 방법이 이게 최선인가 하는 의문점은 계속 든다.</p>

```js
// page/add.tsx

useEffect(() => {
  dispatch({ type: RESET_PHONE_CLICK });
}, []);
```

- 사실 이 아이디어는 그렇게 선호하는 아이디어가 아니었지만, 지금 지식으로는 일단 이렇게 처리해야겠다고 판단했다.

### Next.js Layout

<p>기본적으로 next.js 는 Layout 을 제공한다. Layout 은 컴포넌트로 생성하며, 그렇기에 페이지에서만 가능한 SSG 나 SSR 은 불가능하다. Layout 은 주로 _app.js 와 연동이 된다. _app.js 는 전체 페이지를 컨트롤할 수 있는 페이지라고 생각하면 된다.(next.js에서 자동으로 제공)</p><br />

```jsx
export default const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps}>
    </Layout>
  )
}

```

<p>이렇게 미리 생성한 커스텀 레이아웃 컴포넌트를 나머지 페이지에 적용시켜줄 수 있다. 하지만 상황에 따라서는 페이지마다 다른 레이아웃을 적용시키고 싶은 경우가 있다. 예를 들어서 로그인 페이지에서는 아무런 레이아웃을 적용하지 않다가, 메인 페이지로 이동하게 될 경우 레이아웃을 적용시키고 싶다고 하면, 위 처럼 단일 Layout 으로는 한계가 있다. 이럴때를 위해 next.js 는 getLayout 이라는 메서드를 사용할 수 있도록 하고 있다.</p><br />

```js
const UserLogin = () => {
  const [gotoAccount, setGotoAccount] = useState < boolean > false;

  const toggleGotoAccount = () => {
    setGotoAccount((prev) => !prev);
  };

  return (
    <Container>
      <Section>
        {gotoAccount ? (
          <Signup toggleGotoAccount={toggleGotoAccount} />
        ) : (
          <Login toggleGotoAccount={toggleGotoAccount} />
        )}
        <ImageBox>
          <Image
            alt='todo'
            src={todoImage}
            width={500}
            height={500}
            placeholder='blur'
          />
        </ImageBox>
      </Section>
    </Container>
  );
};

UserLogin.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
```

<p>밑 userLogin.getLayout 을 살펴보도록 하자. AuthLayout 은 따로 생성해주었고, 사실 이 부분에 기존 Layout 을 첨가하여도 관계는 없다. 어차피 _app.js 에서 getLayout 의 return 값에 맞게 설정해주면 되기 때문이다. 사실 이 패턴은 몽키패칭 같기도 하다. 여하튼 페이지마다 각기 다른 레이아웃을 설정해줄 수 있다.</p><br />

```js
export default const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page) // 이 부분은 마음대로 설정해도 된다.
  return (
    <Layout>
      {getLayout(<Component {...pageProps}>)}
    </Layout>
  )
}

```

<p>다시 _app.js 에 들어가서 getLayout 을 생성해주고, 조건식으로서 만일 어떠한 페이지에 getLayout 이 적용되어있다면 이에 맞는 레이아웃을 적용하고, 아니라면 (page) => (page) 로 적용하겠다는 의미이다.</p>

### Routing

<p>next.js 에서 routing 은 file-system 기반이다. 즉 파일을 생성함과 동시에 routing 설정도 된다. pages 라는 폴더 내에 있는 컴포넌트들은 그 파일 구조대로 url 주소를 가지게 된다. 당연하게도 파일 구조를 nested 하게 설정하게 되면 url 역시 그렇게 설정이 된다.</p><br />

```
src/pages/product/first-item
src/pages/product/my/second-user
```

<p>그 다음 slug 기능이 있는데, 예를 들어서 어떤 details 페이지에 각 상품마다 고유 id 를 url 에 표현해주어야 한다면, 이때 slug 를 활용할 수 있다. 파일 이름을 [id].js 와 같이 설정을 해주면 된다. [...slug] 도 있는데, details/2022/22 와 같이 deps 가 2개이상일 때 사용할 수 있다. 파일은 [...slug].js 형식으로 작성하면 된다.</p><br />

### dynamic routing

<p>위에서 slug 를 통해 slug 값에 따른 페이지를 받아올 수 있다고 했는데, 만약 details/1 과 details/2 가 같은 페이지를 보여준다면 아무런 의미가 없을 것이다. 이를 해결하기 위해 dynamic routing 설정을 해줄 수 있다.</p><br />

```js
import { useRouter } from "next/router";

export default function CategoriId() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div>Catogori Id: {id}</div>
    </>
  );
}
```

- 위와 같이 query 로 있는 id 값을 활용할 수 있다.
- 즉, details/1, details/2, details/3 ... 에서의 1,2,3 을 활용할 수 있고, 이를 통해서 서버에 id 에 맞는 데이터를 요청할 수 있다.
- 만일 쿼리가 /categori/food?from=event 와 같다면 어떻게 가져올 수 있을까

```js
import { useRouter } from "next/router";

export default function CategoriId() {
  const router = useRouter();
  const { id, from } = router.query;

  return (
    <>
      <div>
        Catogori: {id} from: {from}
      </div>
    </>
  );
}
```

- 이렇게 쿼리문에 대해서는 구조분해로 각각을 가져올 수 있다.
- 또한 [username]/[info] 처럼 2개의 slug 역시 가져올 수 있다.

```js
import { useRouter } from 'next/router'

export default function UsernameInfo(){
  const router = useRouter();
  const { username, info } = router.query;

  return (...)
}

```

- 다중 slug 같은 경우([...slug]) 배열로 받아오게 된다.

```js
// cart/2022/06/25
import { useRouter } from "next/router";

export default function CategoriSlug() {
  const router = useRouter();
  const { date } = router.query;

  return (
    <h1>Cart Date Slug {JSON.stringify(date)}</h1> // Cart Date Slug ["2022","06","25"]
  );
}
```

<p>참고로 뒤 쿼리문이 없어도 페이지가 나타나게 하고 싶다면, 파일을 생성할 때 [[username]].js 로서 만들어주면 된다.</p><br />

<p>또 알아두어야 할 것이 있는데, 페이지를 리로드 하는 방식이다. 3가지정도로 표현될 수 있는데, 각각 특성이 있다.</p><br />

- location.replace('url'): 로컬 state 유지 안됨(리렌더)
- router.push(url): 로컬 state 유지 / data fetching 일어남
- router.push(url, as, { shallow: true }): 로컬 state 유지 / data fetching 안 일어남
- 다만 url 이 변경되면 뭐가 되었던 data fetching 이 일어난다. 즉 동일한 url 에서 query 만 변경될 때 data fetching 을 shallow 으로 조절할 수 있다.
