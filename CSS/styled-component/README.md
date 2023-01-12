<h2 align="center"> Styled-Component </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2023.1.12](##2023-1-12)

  <br />

![--------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="프로젝트소개"> :book: 간단한 요약 정리 </h2>

## 2023-1-12

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
