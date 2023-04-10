<h2 align="center"> FireBase </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2023.4.10](#2023-4-10)

  <br />

![--------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="프로젝트소개"> :book: 간단한 요약 정리 </h2>

## 2023-4-10

### Audit 응용하기

<p>Light house 를 활용하여 페이지의 성능을 검사할 수 있다. 크롬 개발자 도구에서 Light Housee 를 들어가서 각자 사용하는 device 와 성능하고자 하는 부분에 대해서 체크를 하고 측정을 할 수 있다. 이에 대한 분석 후 점수를 제공해주게 된다.</p>

<p>스크린샷은 페이지가 로드되는 상황을 보여주고, Opportunities 의 경우 리소스, Digostics 의 경우 렌더링 성능 최적화와 연관이 있다.</p>

<p>분석도구인 Light House 는 필요한 성능 개선 방안에 대해서 잘 설명을 해주니, 이에 따라서 하나하나 설정을 해주는것이 좋다. 다만 이 역시 상황에 따라서 달라지는데, 상황에 따라선 고화질의 이미지가 더 중요하게 여겨질 때가 있고, 그렇다면 단순히 이미지의 크기나 해상도를 줄이는 방안보다 로딩이 좀 더 길더라도 그에 대한 스켈레톤 UI 등등을 통해 해결하는 방안도 생각해야한다.</p>

- 가능하면 PNG 대신 JPG 또는 WEBP 로 압축
- 이미지 로드 전후에 Layout Shift가 발생하지 안도록 영역 잡아두기
- 이미지 로딩에 대한 UX 적용 (스켈레톤, 로더 등)

<p>이렇게 사용성을 크게 해치지 않고 고화질의 이미지를 로딩하는 방법도 존재한다.</p>

<p>이와 달리 이미지에 대해서 고화질의 이미지가 현재 필요한 상태가 아니며, 120px 정도의 크기에 1200px 의 이미지가 로드되고 있다면 대역폭에서 손해가 발생할 수 있다. 거기다 그 이미지가 여러개라면 더더욱 말이다. 이에 활용할 수 있는 방법이 image CDN 이다.</p>

<p>보통 CDN 은 물리적으로 클라이언트와 서버가 너무 먼 거리에 있을 경우를 대비하여, 클라이언트와 가깝게 존재하는 서버에 미리 데이터를 복사한 뒤, 클라이언트쪽에서 데이터를 요청하면 원 서버가 아닌 CDN 서버에서 데이터를 전달할 수 있게 하여 물리적인 거리를 최소화 시키는 방법이다. image CDN 은 이와는 좀 다른 개념인데, 원래의 이미지 사이즈를 미리 로드하기 전에 알맞은 크기로 조절한 다음 로드하는 방안으로서 어찌보면 물리적 거리를 줄이는 것과 마찮가지로 이미지의 크기를 줄여주게 된다. 대표적으로 imgix 같은 솔류션이 있다. 또한 unsplish 이미지를 활용할 경우 여기서 자체 cdn 기능을 포함한 이미지를 제공하기에 이를 활용해주면 된다.</p>

### 병목현상 제거해주기

<p>자바스크립트 코드 중 병목현상이 생성되는 경우가 있다. 다만 이를 Light House 에서 확인하기는 쉽지 않다. 그저 문제가 있다고만 알려줄 뿐이니. 이에 할 수 있는 방법은 개발자도구에서 performance 부분을 활용하는 것이다. performance 를 새로고침으로 실행시키면, 실제 페이지가 다 로드될 때까지의 작업들을 보여주는데, 이 탭에서 특정 자바스크립트 파일(컴포넌트) 이 오랫동안 실행되고 있다면 의심을 해야한다. 예시 코드는 아래와 같다.</p>

```js
function removeSpecialCharacter(str) {
  const removeCharacters = ["#", "_", "*", "~", "&", ";", "!", "[", "]", "`", ">", "\n", "=", "-"];
  let _str = str;
  let i = 0,
    j = 0;

  for (i = 0; i < removeCharacters.length; i++) {
    j = 0;
    while (j < _str.length) {
      if (_str[j] === removeCharacters[i]) {
        _str = _str.substring(0, j).concat(_str.substring(j + 1));
        continue;
      }
      j++;
    }
  }

  return _str;
}
```

<p>블로그 글 중에서 제외하고 싶은 특수 문자들이 있고 이를 제거하는 함수인데, 이 함수에서 알 수 있는 점은 반복문에 더하여 while 까지 추가하여 문자들을 검사하고 있다. 블로그 글 특성상 많은 글은 9만자가 넘어가고 그렇다면 당연하게도 성능은 떨어질 수 밖에 없다. 이 코드를 아래와 같이 수정해주자.</p>

```js
function removeSpecialCharacter(str) {
  let _str = str.substring(0, 300); // 300자 정도까지만
  _str = _str.replace(/[\#\_\*\~\&\;\!\[\]\`\>\n\=\-]/g, "");
  // 정규화 표현식으로 수정하자.

  return _str;
}
```

<p>이런식으로 문제가 될 만한 자바스크립트 코드를 수정해주는것이 병목현상을 줄일 수 있는 방법이다.</p>

### 코드 분할

<p>역시나 performance 탭에서 확인할 수 있는데, 처음 로드될 시 chunk.js 와 같이 번들 js 의 로딩시간이 길어지는 경우가 있다. 페이지 로드시 필요한 js 파일을 전부 받아와서 페이지를 랜더시키기 때문인데, 이러한 번들을 분석하기 위해서는 bundle-analyzer 라이브러리를 활용하면 좋다. 다만 cra를 통해 셋팅하였다면 cra-bundle-analyzer 를 통해서 가능하니 참고하자. 이 라이브러리를 설치한 다음 실행시켜주면 report.html 에서 어떠한 파일들이 얼마나 차지하고 있는지 화면상에서 알 수 있게 해준다.</p>

<p>블로그 예시를 통해 살펴보면 refractor 라는 라이브러리가 많은 부분을 차지함을 알 수 있는데, 이는 블로그 글에서 코드 블럭 내 하이라이트를 담당하는 라이브러리다. 반드시 필요한 라이브러리 인데, 생각해보면 첫 main 페이지에서는 코드블럭이 나올리가 없으니 필요가 없다. 즉 상세페이지로 들어갈때만 로드 시켜주면 되는 것이니, 나눠주는 방법을 생각해보자</p>

<p>리엑트에서는 이를 위해 코드 분할이라는 기능을 제공해주고, 실제 공식 홈페이지에서 이를 자세하게 다루고 있다. 이중 라우터에서의 코드분할을 하는 방법에 대해 알아보도록 하자</p>

```js
import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

// lazy 를 통해서 만들어준 ListPage 는 실제 라우팅에서 src 가 '/' 일때만 실행이 된다.
const ListPage = lazy(() => import("./pages/ListPage/index"));
// '/view/:id' 일때만 실행이 된다.
const ViewPage = lazy(() => import("./pages/ViewPage/index"));

// Suspence 를 통해 라우터 이동 간 로딩 페이지를 설정해준다. 반드시 해주어야 한다.
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>로딩 중...</div>}>
        <Switch>
          <Route path="/" component={ListPage} exact />
          <Route path="/view/:id" component={ViewPage} exact />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
```

<p>기존 방식대로라면 이미 ListPage, ViewPage 에 필요한 모든 js 파일이 다 한번에 로드가 된다. 이후 ViewPage 에 들어가면 이미 로드된 번들 js 에서 필요한 부분을 활용하는 것이다. 하지만 코드 분할을 하게 되면, 해당 페이지로 이동할 때 그 페이지에 필요한 js 를 로드할 수 있다. 이렇게 하게 되면 초기 메인 페이지를 렌더할 때는 refractor 을 로드할 필요가 없게 되어 성능이 좀 더 향상될 수 있다.</p>

### 텍스트 압축

<p>dev 상태가 아닌 실제 배포상태가 되면 성능이 조금 더 향상되곤 한다. 그런데 배포 후 Light House 를 실행시키면 텍스트 압축 여부를 확인하라는 메세지가 나온다. 보통 서버에서 데이터를 가져올 때 2mb 이상이라면 gzip 을 통해 압축하여 전달받고, 이후 클라이언트에서 렌더 시 압축 해제를 하는것이 더 유리하다. 이러한 방법은 배포 시 설정에서 설정할 수가 있다.</p>
