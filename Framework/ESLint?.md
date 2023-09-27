## ESLint

ESLint 는 javascript 코드에서 문제를 찾은 뒤 고쳐주는 정적 코드 분석 도구이다.

### eslint-plugin

- plugin : 일련의 룰을 정의한 것. 예를 들어 eslint-plugin-react 는 리액트 관련 룰 패키지이다.

```json
{
  "plugins": ["react"],
  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  }
}
```

<br />

- 룰을 사용하기 위해선 위처럼 작성하는데 매번 이렇게 작성하기 어려우니 대부분의 플러그인은 recommended 나 strict 등 자체 설정을 제공한다

```json
{
  "extends": ["plugin:react/recommended"]
}
```

<br />

- 위 설정에 이미 plugin 이 포함되어 있으니 저렇게 extends 만 해도 된다.

### eslint-config

- eslint-plugin 패키지들이나 룰들을 모아서 설정으로 만든 것이 eslint-config 패키지
- eslint-config-airbnb 는 다음과 같다

  - eslint
  - eslint-plugin-import
  - eslint-plugin-react
  - eslint-plugin-react-hooks
  - eslint-plugin-jsx-a11y

- 즉 이렇게 위와 같은 plugin 들을 조합한 설정패키지가 config 이다.

### parser

```json
{
  "parser": "@typescript-eslint/parser"
}
```

<br />

- 코드를 분석하기 위한 파싱툴. 보통 js 워크스페이스에서는 @babel/eslint-parser 를 사용하고 ts 워크스페이스인 경우 @typescript-eslint/parser 를 사용한다.

### env

- 사전 정의된 전역 변수를 제공. node 환경인 워크스페이스면 node: true 를 추가해야하고, 웹 환경이면 browser: true, es6: true 등을 추가해야한다.
