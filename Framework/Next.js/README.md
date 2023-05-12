### CSS 서버사이드 렌더링

- next.js 역시 바벨과 웹펙을 따로 설정해 줄 수 있다.
- styled-component 의 경우 첫 ssr 에서 적용이 안될수 있다. 이에 따라 환경을 설정해주어야 한다.

```
npm i babel-plugin-styled-components
```

- 위처럼 설치 한뒤, root 디렉토리에 .babelrc 파일 생성

```js
{
  "preset": ["next/babel"],
  "plugins": [
    [
      "bable-plugin-styled-components", // styled-component 를 ssr 하기 위한 설정
      {
        "ssr": true,
        "displayName": true // 개발 모드에서 클래스 네임이 외계어로 되어있는것들이 읽기 좋게 바꿔서 좋다.
      }
    ]
  ]
}
```

- 이렇게 설정을 해주자.
- 바벨만 설정을 해준다면 제대로 동작하지 않을 수 있다. 따라서 \_document.js 파일을 만들어주면서 설정을 해주어야 한다.
- \_app.js 보다 상위 문서이기에 page 폴더에 생성하자.

```js
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (error) {
      console.error(error);
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019%2Ces2020%2Ces2021%2Ces2022" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// 아직까지는 클래스 문법
// 이 문서는 _app 보다 상위 문서
// 여기에서는 getInitalProps(ctx) 를 사용... 곧 사라질듯한 느낌.
// ie 에서 실행하면 안돌아가서 이에 대해 polyfill io 를 넣어주어야 한다.
// map.set promise 등등이 babel 로도 안되고, babel.polyfill 역시 무거워서 대신 사용
```

- 깊게 생각하진 말고, 이 내용을 그대로 적어두자.
- 무거운 babel.polyfill 을 사용하기 보단 polyfill.io 사이트에서 직접 설정 스크립트를 가져와 위처럼 배치해주면 된다.
  <br />

### getStaticPath

<p>다이나믹 라우팅을 활용할 때 getStaticProps 를 사용하기 위해서 getStaticPath 가 필요하다.</p>

```js
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }, { params: { id: "3" } }],
    fallback: false,
  };
}
```

<p>paths 에는 미리 빌드하고자 하는 페이지의 id 를 넣어준다. 만약 넣어주지 않은 id 를 가진 페이지에 접근하면 에러가 뜬다. 그렇다면 방법으로서 모든 페이지 리스트를 다 가져와서 넣어주는 방식은 있다.</p>

```js
export async function getStaticPaths() {
  const result = await axios.get("/post/list");
  return {
    paths: [
      // result 의 리스트 아이디 넣어주기
    ],
    fallback: false,
  };
}
```

<p>다만 이렇게 하면 크게 의미가 없는것이, 수많은 페이지를 전체 다 가져온다는게 말이 안되기도 하기에, 만약 사용한다면 좀 규모가 작은 블로그 같은 경우는 가능하다고 할 수 있겠다.</p><br>
<p>fallback 을 true 로 하게 되면 위에서 에러가 발생하였었던 부분에 있어서 CSR 로 변경하여 적용하도록 할 수 있다. 즉 id : 4 를 path 에 넣어주지 않았지만, 이를 파악하여 서버에 요청하여 4 페이지를 가져오게 할 수 있다. 이렇게 되면 기존 리엑트의 방식대로 되기 때문에, 조건부 렌더링을 걸어주어야 한다.</p>

```js
const Post() = {

  if(router.isFallback){
    return <div>로딩중</div>
  }

  return (...)

  export async function getStaticPaths(){
  const result = await axios.get('/post/list');
  return {
    paths : [ // result 의 리스트 아이디 넣어주기
    ],
    fallback: true,
  }
}

}

```

<br />

## moment

<p>moment 는 날짜표시를 좀더 쉽게 해주는 라이브러리이다. 최근에는 용량이 적은 Dayjs 가 무섭게 치고 올라오지만, 사용법은 거진 동일하기에 moment 를 한번 사용해보자</p>

```
npm install moment --save
```

- 설치가 끝나면 import 한 뒤 사용하면 된다.

```js
import moment from "moment";

moment.locale("ko");

const PostCard = ({ post }) => {
  // 생략

  return (
    <>
      <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
        <div style={{ float: "right" }}>{moment(post.createdAt).format("YYYY.MM.DD")}</div>
        <Card.Meta avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>} title={post.Retweet.User.nickname} description={<PostCardContent postData={post.Retweet.content} />} />
      </Card>
    </>
  );
};
```

- 위 moment(날짜).format(커스텀) 방식으로 기입하면 된다.
- 함수 컴포넌트 상단에 moment.locale("ko") 로 한글화 해주는걸 잊지말자
- 공식 홈페이지에는 여러 format 이 나와있고 예시처럼 사용할 수 있다.

```js
moment().format("MMMM Do YYYY, h:mm:ss a"); // January 4th 2023, 12:15:12 am
moment().format("dddd"); // Wednesday
moment().format("MMM Do YY"); // Jan 4th 23
moment().format("YYYY [escaped] YYYY"); // 2023 escaped 2023
moment().format();
```

- 이 외 포맷은 [사이트 참고](https://momentjs.com/)
- 그리고 빌드 과정에서 moment 는 용량이 큰 나머지 최적화를 할 필요가 생기게 된다. 빌드에서 설명하겠음
  <br />

### next.js 빌드하기

<p>배포 전 npm run build 를 통해 .next 폴더를 생성해주자. 이 폴더에는 getStaticProps 를 통해 생성될 html, global CSS, pre-rendering 에 사용될 js 파일들이 들어오게 된다. 그외 image 등등 SSR, SSG에 필요한 파일들이 포함된다.</p>

```json
  "scripts": {
    "dev": "next",
    "build": "cross-env ANALYZE=true NODE_EN=production next build"
  },
```

<p>script 에 build 를 넣어줌으로서 npm run build 로 실행이 가능하다. 빌드를 하게 되면 next.js 에서 알아서 파일들을 최적화 시켜준다. 파일 크기는 최소화 시키고 위에서 설명했듯이 미리 생성할 페이지까지 다 설정해준다. 다만 이 전에 webpack 을 따로 설정해주면 좋은 것이 있다.</p>

```js
// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true", // 이 환경변수가 true 여야 실행됨.
});

module.exports = withBundleAnalyzer({
  compress: true, // 요것도 gzip 해주는 것임
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === "production"; // 배포
    const plugins = [...config.plugins, new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/)];
    // if (prod) {
    //   plugins.push(new CompressPlugin());
    // }
    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval", // 히든으로 해줘야 배포 시 소스 유출 막음
      plugins,
    };
  },
});
```

- 빌드를 하게 되면, 터미널에 빌드한 페이지들에 대한 용량과 처음 로드하는 JS 에 대한 용량이 같이 표시되게 된다.
- 문제는 용량이 1mb 이상 초과하는 경우 모바일에서 렉이 걸리기 때문에, 줄여주어야 하는데 용량만 봐서는 어느 부분을 줄여주어야 하는지 감을 잡을 수 없다
- 이를 위해서 라이브러리를 설치해주자

```
npm i @next/bundle-analyzer
```

- 위 라이브러리를 설치하여 더 위의 next.config.js 에서 설정을 해주게 되면, 빌드 실행 시 client.html 이라는 페이지가 뜨게 되는데, 여기서 직사각형들의 크기를 확인하면서 어느 파일을 제거하던지 등등의 조치를 취할지 알 수 있게 된다.
- 내가 빌드할 때는, 1mb 가 넘어가서 어디서 그런것인지 파악했더니 이전에 설치해놓았던 @faker 라이브러리에서 용량을 크게 차지하고 있었고, 이를 지워주면서 최적화를 할 수 있었다.
- 마찬가지로 위에서 moment 에 대해 설명할 때, 용량이 큰 편이라고 하였었는데 이 부분을 plugin 에서 처리를 해주었다.

```js
const plugins = [...config.plugins, new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/)];
```

<br />

<strong>Compression-webpack-plugin</strong>
<br />

- 빌드를 하는 과정에서 css, html 파일들을 모두 gzip 으로 압축하게하는 설정이다
- 용량이 확 줄어들게 된다.
- 압축을 헤제하는것은 브라우저가 알아서 헤제하기 때문에 걱정할 것 없다.
- 원래는 내장된 plugin 을 설정해주어야 하지만, next 에서는 이미 내장되어 사용법이 나와있다.

```js
module.exports = withBundleAnalyzer({
  compress: true, // 요것도 gzip 해주는 것임
  // 생략
});
```

<br />
<strong>Cross-env</strong>
<br />

- pakage.json 에 script 부분에 build 를 설정하는 부분에서 특이점이 있다
- 'next build' 옆에 ANALYZE 와 NODE_EN 부분을 같이 설정해서 적어주었다.
- mac 이나 리눅스의 경우 그냥 이렇게 적어두기만 해도 알아서 빌드 시 적어둔데로 설정이 적용되는데, 문제는 윈도우는 그게 안된다는 점이다.
- 따라서 이를 해결하기 위해 라이브러리를 설치하자 (정확하게 이름 적어서 설치)

```
npm i cross-env
```

- 그 다음 앞에 cross-env 를 적어주면 된다.
  <br />

### Image

<p>Next.js 에서는 이미지 파일을 업로드 할 떄 확장된 태그를 제공한다. 표현은 `Image` 로 사용하며 기존 태그에서 기능이 추가된 버전이다. next.js 를 활용한다면 이미지는 되도록 이 태그를 사용하는것을 권장한다. 왜냐하면 기본적으로 최적화기능이 포함되어 있기 때문이다.</p>

- 최신 이미지 형식을 사용하며, 디바이스 사이즈에 맞게 최적화된 이미지를 제공한다.
- Cumulative Layout Shift (CLS)를 자동으로 방지해준다. 이 말은 이미지가 로딩될 때와 로딩이 끝났을 때 크기에 따른 레이아웃의 변화가 생길 수 있는데, 이러한 이미지차이에 의한 레이아웃 변경을 막아준다.
- 이미지가 뷰포트에 들어왔을 때만 로드되기 때문에 초기 페이지 로딩 속도가 빠르다.
- 외부 이미지 역시 리사이징이 가능하다.

<p>이미지 최적화에 대해 좀 더 설명하자면, Next/Image 는 디바이스 별 srcSet을 미리 지정해두고, 사용자의 디바이스에 맞는 이미지를 다운하도록 조정한다. 또한 이미지를 webp와 같은 용량이 작은 포맷으로 이미지를 변환해서 제공한다. 역시나 초기 로딩때 next 서버에서 진행되며 이후 캐시화 하여 캐시가 만료될 때 까지 캐시 이미지를 제공하기에 로딩이 빠르다.</p>

### 사용법

<p>요구되어지는 props 가 있고 이를 채워주도록 하자. 이 props 는 필수이기 때문에 꼭 넣어주어야 한다.</p>

- src: 정적인 파일이나 외부 동적 파일을 불러올 수 있다. 단 외부 파일은 `remotePattenrs` 가 필요하다. (혹은 domain)

```js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};
```

- width, height: CLS 를 방지하기 위해서라도 반드시 입력되어야 한다. px 단위이며 만일 정적파일일 경우 생략이 가능하다. 왜냐하면 정적 파일 이미지의 크기로 설정되기 때문이다.
- alt : 역시 필수적으로 기입되어야 한다.

<p>그 외 부가적인 옵션은 [공식홈페이지](https://nextjs.org/docs/api-reference/next/image#remote-patterns)를 참고하자</p>

### Next/Image의 layout 속성

<p>Next/Image 컴포넌트에는 컨테이너 사이즈가 변경되었을 때 이미지 레이아웃이 어떻게 변경될지를 결정하는 layout이라는 props 가 있다.</p>

- intrinsic: default, 컨테이너 사이즈가 이미지 사이즈보다 작아졌을때 컨테이너에 맞게 크기를 줄임
- fixed: (컨테이너 사이즈와 관계없이) 이미지 사이즈를 width, height 속성값으로 고정
- responsive: 작은 컨테이너에서는 크기가 줄어들고, 큰 컨테이너에서는 크기가 늘어남(이미지 비율 유지)
- fill: relative 포지션을 가진 조상의 너비, 높이와 동일하게 조정함.

<p>width 와 height 속성은 layout 속성에 따라 의미가 달라진다. 예를 들어 layout 속성이 responsive, fill 일 경우 width와 height 의 사이즈가 원본 사이즈를 의미한다. 즉 비율로서 나타나기에 조상의 너비가 커지면 그 커진만큼 이미지도 사이즈가 증가하게 된다.</p>

### Image height: auto

<p>앞에서 속성값 height, width 는 고정이라고 하였다. 그렇기에 auto 를 넣고 싶은 상황에서는 어떻게 해야할까. 쉽게 생각하면, Image 를 감싸는 부모를 통해 자식 요소를 스타일 설정해줄 수도 있고, 인라인 스타일을 넣는 방법들이 있을 것이다.</p>

```ts
import Image, { ImageProps } from "next/image";

const AutoHeightImageWrapper = styled.div`
  width: 100%;
  & > span {
    position: unset !important;
    img {
      height: auto !important;
      position: relative !important;
    }
  }
`;

const AutoHeightImage = ({ ...props }: ImageProps) => {
  <AutoHeightImageWrapper>
    <Image layout="fill" {...props} />
  </AutoHeightImageWrapper>;
};

export default AutoHeightImage;
```

- 이처럼 부모 요소의 설정을 통해서 height: auto 를 설정할 수 있다.
- 아니면 Image 에 커스텀하게 설정을 해줄 수 있다.

```ts
const Img = styled(Image)`
  height: auto !important;
  position: relative !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 15px;
`;
```

### redirect 방식에 대해서 전반적으로 정리

<p>로그인이 된 유저와, 그렇지 않은 유저에 있어서 페이지 접근 인가를 설정하는 방법에 있어서, 크게 두가지 방법을 배웠고, 아마 이후에도 이를 활용할 것 같다.</p>

- 조건은 로그인이 되었다면, 로그인 페이지에는 접근하지못한다
- 로그인이 안됬다면, 다른 나머지 페이지에도 접근하지 못한다.

> **페이지 별 getServerSideProps 를 통해 로그인 정보 확인**

```ts
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context: GetServerSidePropsContext) => {
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
});
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
      <Link href="/one">one</Link> <Link href="/two">two</Link>
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
      <Link href="/one">one</Link> <Link href="/two">two</Link>
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
        {gotoAccount ? <Signup toggleGotoAccount={toggleGotoAccount} /> : <Login toggleGotoAccount={toggleGotoAccount} />}
        <ImageBox>
          <Image alt="todo" src={todoImage} width={500} height={500} placeholder="blur" />
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
