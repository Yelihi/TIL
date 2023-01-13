<h2 align="center"> Next.js </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2023.1.2](#2023-1-2)
- [2023.1.3](#2023-1-3)

  <br />

![--------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="프로젝트소개"> :book: 간단한 요약 정리 </h2>

## 2023-1-2

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

## 2023-1-3

### SWR

<p>SWR 은 데이터를 가져오기 위한 React Hook이다. 특이점이라면 가져오는 데이터를 캐시화 시킨 후, 서버로부터 데이터를 요청할 때마다 캐시화 된 데이터와의 비교를 통해 가장 최신화된 데이터를 가져오는 전략을 취하게 된다. 이 말은 이전에 캐시화 된 데이터가 현재 최신 데이터와 일치한다면 기존 캐시데이터를 그대로 활용하는 전략이라고 할 수 있겠다. 기본적으로 사용하는 방법은 아래와 같다</p>

```js
import useSWR from "swr";

// fetcher 에 대한 예시이다. fetch, graphQL 등 원하는것으로 구성해도 된다.
const fetcher = (url) => axios.get(url).then((result) => result.data);

function Profile() {
  const { data, error, isLoading } = useSWR("/api/user", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

- 위 useSWR 훅은 key 문자열과 fetcher 함수를 가지게된다. key 는 일반적으로 API 주소로 사용하게 되며, 유일성을 가지는 고유한 식별자라 판단할 수 있다.
- 이 훅을 통해 두 반환값 data, error 를 통해서 좀 더 효율적으로 데이터를 가져올 수 있다.
- 이전까지 redux-saga 를 통해서 데이터를 처리할 때, 좀 간단한 부분에 관해서는 swr 로 대체가 가능할 것이라 생각이 든다.
- 시작은 설치부터 들어가보면

```
npm install swr
```

- swr 의 장점 중 하나는, 받아온 데이터를 좀 더 쉽게 재사용하는 것이 가능하며, 데이터의 검증을 통해 기존에 캐싱된 데이터를 그대로 활용하는 것이다.
- 이렇기 때문에 여러 컴포넌트에서 uswSWR 을 실행하더라도, 고유한 키(API)가 동일하다면 처음 한번만 데이터를 받아올 때 통신이 진행되고, 다음 컴포넌트부터는 캐싱된 데이터를 활용하게 된다.

```js
// useUser 라는 재사용 훅을 만들어 여러 컴포넌트에 활용할 수 있다.
function useUser(id) {
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
```

```js
function Avatar({ id }) {
  const { user, isLoading, isError } = useUser(id);

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return <img src={user.avatar} />;
}
```

- redux 와 마찬가지로 기존 useEffect 를 통해 데이터를 가져오고, 이를 props 로 전달하는 방식에서 벗어난다.

```js
// 페이지 컴포넌트

function Page() {
  return (
    <div>
      <Navbar />
      <Content />
    </div>
  );
}

// 자식 컴포넌트

function Navbar() {
  return (
    <div>
      ...
      <Avatar />
    </div>
  );
}

function Content() {
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  return <h1>Welcome back, {user.name}</h1>;
}

function Avatar() {
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  return <img src={user.avatar} alt={user.name} />;
}
```

- 개인적인 공부지식과 조금 부딛치는 부분이 있었는데, 페이지가 아닌 컴포넌트에는 서버 데이터 요청을 자제하거나 하지 않는것을 선호하도록 설계하라고 배운적이 있다.
- 다만 swr 로 컴포넌트에 useUser 를 사용할 시 컴포넌트에서 서버에 데이터를 요청하는 경우가 발생한다. (그렇게 이해하고 있다.)
- 다행인 것은 Content 나 Avatar 나 모두 동일한 SWR key 를 사용하기에, 그 요청이 자동적으로 중복 제거, 캐시, 공유되기에 단 한번의 요청만 API 로 전송이 된다.
- 여튼 SWR 의 장점은 부모 컴포넌트는 데이터의 흐름을 알 필요가 없고, 자식 컴포넌트를 위해 부모 컴포넌트에 데이터를 받아올 필요가 없이 랜더링만 하면 된다.
  <br />

<strong>API</strong>

```js
const { data, error, isLoading, isValidating, mutate } = useSWR(key, fetcher, options);
```

- key : 요청을 위한 고유한 키 문자열
- fetcher : 데이터를 가져오기 위한 함수를 반환하는 Promise
- Option : SWR hook을 위한 옵션 객체
- data : fetcher가 이행한 주어진 키에 대한 데이터(로드 안되면 undefined)
- error : fetcher가 던진 에러(또는 undefined)
- isLoading : 진행중인 요청이 있고, 로드된 데이터가 없는 경우.
- isValidating : 요청이나 갱신 로딩의 여부
- mutate(data?, options?) : 캐시된 데이터를 뮤테이트하기 위한 함수
  <br />

<strong>SWRconfig(전역설정)</strong>

- 사용할 SWR hook 에 대해 전역 설정을 해줄 수 있다.
- 예를 들자면 모든 훅에 동일한 fetcher 를 사용하게 하거나, 갱신 인터벌을 설정해줄 수 있다.

```js
import useSWR, { SWRConfig } from "swr";

function Dashboard() {
  const { data: events } = useSWR("/api/events");
  const { data: projects } = useSWR("/api/projects");
  const { data: user } = useSWR("/api/user", { refreshInterval: 0 }); // 오버라이드

  // ...
}

function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Dashboard />
    </SWRConfig>
  );
}
```

- 위 예시에서 알 수 있듯이, Dashboard 에서 사용하는 모든 hook 에 관하여 동일한 fetcher 와 3초 갱신을 설정해주고 있다.
- SWRConfig 는 중첩으로 사용이 가능하고, value 에 선택적으로 provider 함수도 받을 수 있다. 이 부분은 캐시와 관련이 있는데, 추후에 좀 더 공부하려....
  <br />

<strong>에러 재시도</strong>

- SWR 은 에러 발생 시 내부 알고리즘을 활용하여 요청을 재시도한다. 사용자가 오버라이드 할 수 있다.

```js
useSWR("/api/user", fetcher, {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // 404에서 재시도 안함
    if (error.status === 404) return;

    // 특정 키에 대해 재시도 안함
    if (key === "/api/user") return;

    // 10번까지만 재시도함
    if (retryCount >= 10) return;

    // 5초 후에 재시도
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
});
```

- 이외 뮤테이션 및 프리패칭, 캐시 에 관해서는 추후 다시 공부 예정
- [SWR](https://swr.vercel.app/ko/docs/getting-started)
  <br />

### moment

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
