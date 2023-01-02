<h2 align="center"> Next.js </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2023.1.2](# 2023-1-2)

  <br />

![--------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="프로젝트소개"> :book: 간단한 요약 정리 </h2>

## 2023-1-2

## CSS 서버사이드 렌더링

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

## getStaticPath

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
