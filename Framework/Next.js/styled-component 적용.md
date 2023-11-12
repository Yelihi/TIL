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
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
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
          <script src='https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019%2Ces2020%2Ces2021%2Ces2022' />
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
