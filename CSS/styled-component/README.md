### typescript 내 styled-component 셋팅하기

<p>기본적인 설치에서 type 만 추가해준다고 생각하면 될듯하다.</p>

```
npm i styled-components
npm i -D @types/styled-components
```

<p>사용자에 따라 다르겠지만, 보통 styled-component 의 장점인 theme 를 활용하기웨해서 먼저 GlobalStyle 을 설정해주자</p>

```ts
// src/styles/global-style.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  *{
    box-sizing: border-box;
    margin: 0;
  }

  body{
    font-family: ${({ theme }) => theme.font.Kfont};
  }

  input,
  input:active,
  input:focus{
    border: none;
    outline: none;
    -webkit-appearance:none;
    -moz-appearance: none;
    -o-appearance:none;
    appearance: none;
    font-family: ${({ theme }) => theme.font.Efont};
  }

  button {
    border: none;
    cursor: pointer;
    font-family: ${({ theme }) => theme.font.Efont};
  }
  
`;
```

- 여기서 일단 props 를 넘기는 부분은 생략하고, 우선 기본적으로 reset css 를 걸어줍시다.
- 이후 GlobalStyle 컴포넌트를 하위 컴포넌트에 적용시키는 작업을 해주자

```ts
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "./styles/global-style";
import { theme } from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);
```

- 위 코드처럼 Router 와 같이 배치해주고, 이후 설정해줄 ThemeProvider 컴포넌트로 감싸준다.
- theme 를 사용하기 전 일단 globalstyle 에서 설정해준 설정들은 다 적용이 된다.
- 이제 theme 를 설정해주자. theme 를 typescript 를 통해 type 을 지정해줄 때, d.ts 를 통해 defaultTheme 를 설정해주면 관리가 편해진다.

```ts
// styles/theme.ts
import styled from "styled-components";
import { DefaultTheme } from "styled-components";

const font = {
  Kfont: `'Noto Sans KR', sans-serif`,
  Efont: `'Roboto', sans-serif`,
};

const fontWeight = {
  Thin: 100,
  Light: 300,
  Regular: 400,
  Medium: 500,
  Bold: 700,
};

const colors = {
  black: "#000000",
  white: "#FFFFFF",
  lightGrey: "#B0B0B0",
  middleGrey: "#717171",
  deepGrey: "#222222",
  hoverGrey: "#DBDBDB",
  symbol: "#7A0BC0",
};

export type FontTypes = typeof font;
export type FontWeight = typeof fontWeight;
export type Colors = typeof colors;

export const theme: DefaultTheme = {
  font,
  fontWeight,
  colors,
};
```

```ts
// styles/styled.d.ts
import "styled-components";
import { FontTypes, FontWeight, Colors } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    font: FontTypes;
    fontWeight: FontWeight;
    colors: Colors;
  }
}
```

- theme.ts 에서 설정해주고 싶은 theme 를 설정하고, 각 프로퍼티에 대한 타입을 설정해준다. 대부분 같은 속성끼리 객체로 묶기 때문에, 타입을 선언할 때 typeof 를 이용하면 좀 더 편하게 설정이 가능하다.
- 타입을 선언하였다면, DefaultTheme 를 import 한 뒤, theme 에 타입으로 설정해주면 되는데, 이 DefaultTheme 를 styled.d.ts 에서 styled-components 의 모듈로서 선언해주는 것이다.
- theme.ts 에서 선언한 타입을 import 해 온 다음, interface를 활용하여 DefaultTheme 를 설정해준다.
- 이렇게 하면 좋은점이, 매 styled 를 지정해줄 때마다, props 의 타입을 계속 일일히 선언해주지 않아도 된다.

```ts
const LeftTopBrand = styled.div`
  width: 100%;
  margin-bottom: 70px;

  > span {
    text-align: start;
    font-family: ${({ theme }) => theme.font.Efont};
    font-size: 13px;
  }
`;
```

- 위에서 확인할 수 있듯이, styled.div 를 설정할 때 따로 props 에 대한 타입을 설정해주지 않아도, Efont 라는 타입이 지정되어있다.
- .을 찍으면 자동으로 목록이 나와서 편하기도 하다.
  <br />

### 상황에 따라 다른 색을 버튼에 적용시키고 싶다.

<p>테마 색상을 정해두었고, 상황에 따라 버튼의 색상을 변경해보자</p>

```ts
<Button color="black">Sign in</Button>
<Button color="">Create account</Button>


// 생략

const Button = styled.button<{ color: string }>`
  width: 100%;
  height: 40px;
  margin-bottom: 13px;
  border-radius: 20px;
  background-color: ${({ theme, color }) => (color ? color : theme.colors.white)};
  color: ${({ theme, color }) => (color ? theme.colors.white : theme.colors.black)};
  border: ${({ theme, color }) => (!color ? `1px solid ${theme.colors.black}` : "none")};
`;

```

- color 라는 새로운 props 전달값을 생성
- 이에 대한 type 을 설정해주고, 다음 color 설정에 따라 색상을 변경

### Typescript 에서 media query 셋팅해보기

<p>여러가지 방안을 생각하고, 구현도 해봤지만 현재 구현한 방식이 가장 편리하기도 하고, DefaultTheme 를 손쉽게 사용할 수 있었다.</p>

```ts
const customMediaQuery = (minWidth: number) => `@media screen and (min-width: ${minWidth}px)`;
export const media = {
  custom: customMediaQuery,
  desktop: customMediaQuery(1024),
  tablet: customMediaQuery(786),
  phone: customMediaQuery(320),
};
```

- 사실 그냥 매번 @media and screen ... 을 치는것을 좀 줄여주는 역할이다
- 함수 customMediaQuery 를 통해 인자로 각 디바이스별 사이즈를 넘겨준다
- 이후 media 객체를 통해서, 함수 실행 결과를 value 값으로 import 해주면 된다.

```ts
import { media } from "../../styles/media";

// 생략

const ListContainer = styled.div`
  width: 100%;
  height: fit-content;
  ${media.tablet} {
    position: sticky;
    position: -webkit-sticky;
    top: -1px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
```

- 이런식으로 반응형을 할 수 있고, 기존 DefaultTheme 를 사용하기 편리하다.

### styled-component 에 props 전달하기

<p>styled-component 를 사용하다보면 자주 props 를 전달해야하는 상황이 오는데, 조건에 따라 스타일을 다르게 적용하고자 할 떄 주로 사용한다. 처음에는 사용법이 어색하지만, 익숙해지면 정말 유용한 기능이니 예시를 정리하겠다</p>

```ts
import styled, { css } from 'styled-components'

// 생략
<ListBox key={i} direction={true} onClick={onClickDrop}>
// 생략
const ListBox = styled.div<{ direction: boolean }>`
  font-weight: ${({ theme }) => theme.fontWeight.Regular};
  overflow: hidden;
  ${props =>
    props.direction
      ? css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        `
      : css`
          display: flex;
          justify-content: flex-start;
          align-items: center;
        `}
`;

```

- props 를 자신이 정하고 싶은 네이밍으로 정한다음 내려주도록 하자
- typescript 는 내려주는 props 에 대해 타입을 지정해주어야 한다.
- styled-component 의 최신 버전은 css 를 import 해주어서 사용하는것을 권장한다.
- 위 코드처럼 조건식에 따라 스타일을 지정할 수 있다.

### keyframe

<p>styled-component 에서 경험삼아 keyframe 을 활용해야한다. 앞으로도 styled-component 는 자주 사용하게 될 것 같으니, 한번 더 정리하는게 좋겠다 싶었다.</p>

```ts
import styled, { keyframes } from "styled-components";

export const clickDropToggle = keyframes`
  from{
    height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  to{
    height: 38px;
    opacity: 1;
    padding-top: 9px;
    padding-bottom: 9px;
  }
`;
```

- 하나의 예시로 메뉴의 dropdown 을 설계할 때, 자연스럽게 높이가 조정되도록 애니매이션을 설계하였다.
- 사용 방법은 css 의 animation과 동일하다. 그저 keyframe 으로 통제한다고 생각하자
- 이렇게 animation 을 만들어 놓고 이 이름을 통해 직접 animation 으로 가져와서 사용하자

```ts
  ${props =>
    props.clickDrop === 'on' &&
    css`
      animation: ${clickDropToggle} 0.7s forwards;
    `}

```

- props 를 통해 조건식으로서 애니매이션을 적용할 수 있다.
- 설정하는 방식은 기존 css animation 과 같다.
