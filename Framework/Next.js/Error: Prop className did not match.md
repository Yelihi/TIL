## Error: Prop className did not match

클로젯 개발 환경에서 nivo/line 및 antd 컴포넌트들을 사용중이었는데, 개발 과정에서 위와같은 에러가 발생한 적이 있다. 에러의 발생 이유는 심플한데, 서버 사이드 내 렌더링 시 styled-component 가 생성하는 className 과 실제 클라이언트 단 내 (아마 hydration 과정일 것이다) className 에 차이가 생겨 발생하는 오류이다. <br />

렌더링 자체는 되는데 warnning 인지라 해결하는것이 당연히 좋기에, 이를 해결해봐야겠다 생각했다.

### 첫번째 시도 (next.config.js)

실제 위와같은 이슈가 다른 유저들에게도 발생하였는데, 가장 문제없이 해답에 근접한 방식은 next.config.js 내 설정을 수정하는것이었다. <br />

```json
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "ssr": true,
        "displayName": true
      }
    ]
  ]
}
```

<br />

기존에는 위와같이 next.js 내 .babelrc 파일을 생성하여 직접 플러그인 설정을 해 주었다. (babel-plugin-styled-components 를 따로 설치 한 뒤)
<br />

그리고 아마도 버전 12 이상부터 Next.js 에서 자체적으로 next.config.js 에 babel 설정을 해줄 수 있게 된것으로 알고 있다. 내부 compiler 설정을 통해 이것이 가능해진다. <br />

```js
module.exports = {
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: boolean | {
      // Enabled by default in development, disabled in production to reduce file size,
      // setting this will override the default for all environments.
      displayName?: boolean,
      // Enabled by default.
      ssr?: boolean,
      // Enabled by default.
      fileName?: boolean,
      // Empty by default.
      topLevelImportPaths?: string[],
      // Defaults to ["index"].
      meaninglessFileNames?: string[],
      // Enabled by default.
      cssProp?: boolean,
      // Empty by default.
      namespace?: string,
      // Not supported yet.
      minify?: boolean,
      // Not supported yet.
      transpileTemplateLiterals?: boolean,
      // Not supported yet.
      pure?: boolean,
    },
  },
}

```

<br />

공식 문서에서 직접 지원한다고 언급하고 있으니 기존의 babelrc 를 삭제하고 위 설정으로 대채하였다. <br />

### 두 번쨰 시도 (displayName: false)

compiler 를 설정하였음에도 여전히 오류가 발생하였고, 사실 이 오류부분은 현 Next.js issue 란에서 아직 뚜렷한 답변이 나오지 않은 상태로 파악하였다. <br />

어찌되었던 hydration 에서 발생하는 클래스명 불일치를 해결하는 문제였기에, 뭔가 이름에 관련된 defualt 속성값들을 다시 살펴보기 시작했고, 이 중 displayName 속성을 false 처리 해주면서 발생하는 오류가 사라짐을 경험하였다. <br />

사실 displayName 속성의 기능이라면, 우리가 styled 를 적용한 HTML Element 붙인 이름을(ex. MyButton) 을 그대로 개발자 도구에서 확인할 수 있는 기능이라 현 오류가 그렇게 연관성이 있어보이진 않았다. 하지만 일단 오류가 사라져서 좀 더 진행시켜봐야 확답을 내릴 수 있을 것 같다.
