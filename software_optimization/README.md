### Audit 응용하기

<p>Light house 를 활용하여 페이지의 성능을 검사할 수 있다. 크롬 개발자 도구에서 Light Housee 를 들어가서 각자 사용하는 device 와 성능하고자 하는 부분에 대해서 체크를 하고 측정을 할 수 있다. 이에 대한 분석 후 점수를 제공해주게 된다.</p><br />

<p>스크린샷은 페이지가 로드되는 상황을 보여주고, Opportunities 의 경우 리소스, Digostics 의 경우 렌더링 성능 최적화와 연관이 있다.</p><br />

<p>분석도구인 Light House 는 필요한 성능 개선 방안에 대해서 잘 설명을 해주니, 이에 따라서 하나하나 설정을 해주는것이 좋다. 다만 이 역시 상황에 따라서 달라지는데, 상황에 따라선 고화질의 이미지가 더 중요하게 여겨질 때가 있고, 그렇다면 단순히 이미지의 크기나 해상도를 줄이는 방안보다 로딩이 좀 더 길더라도 그에 대한 스켈레톤 UI 등등을 통해 해결하는 방안도 생각해야한다.</p><br />

- 가능하면 PNG 대신 JPG 또는 WEBP 로 압축
- 이미지 로드 전후에 Layout Shift가 발생하지 안도록 영역 잡아두기
- 이미지 로딩에 대한 UX 적용 (스켈레톤, 로더 등)

<p>이렇게 사용성을 크게 해치지 않고 고화질의 이미지를 로딩하는 방법도 존재한다.</p><br />

<p>이와 달리 이미지에 대해서 고화질의 이미지가 현재 필요한 상태가 아니며, 120px 정도의 크기에 1200px 의 이미지가 로드되고 있다면 대역폭에서 손해가 발생할 수 있다. 거기다 그 이미지가 여러개라면 더더욱 말이다. 이에 활용할 수 있는 방법이 image CDN 이다.</p><br />

<p>보통 CDN 은 물리적으로 클라이언트와 서버가 너무 먼 거리에 있을 경우를 대비하여, 클라이언트와 가깝게 존재하는 서버에 미리 데이터를 복사한 뒤, 클라이언트쪽에서 데이터를 요청하면 원 서버가 아닌 CDN 서버에서 데이터를 전달할 수 있게 하여 물리적인 거리를 최소화 시키는 방법이다. image CDN 은 이와는 좀 다른 개념인데, 원래의 이미지 사이즈를 미리 로드하기 전에 알맞은 크기로 조절한 다음 로드하는 방안으로서 어찌보면 물리적 거리를 줄이는 것과 마찮가지로 이미지의 크기를 줄여주게 된다. 대표적으로 imgix 같은 솔류션이 있다. 또한 unsplish 이미지를 활용할 경우 여기서 자체 cdn 기능을 포함한 이미지를 제공하기에 이를 활용해주면 된다.</p><br />

### 병목현상 제거해주기

<p>자바스크립트 코드 중 병목현상이 생성되는 경우가 있다. 다만 이를 Light House 에서 확인하기는 쉽지 않다. 그저 문제가 있다고만 알려줄 뿐이니. 이에 할 수 있는 방법은 개발자도구에서 performance 부분을 활용하는 것이다. performance 를 새로고침으로 실행시키면, 실제 페이지가 다 로드될 때까지의 작업들을 보여주는데, 이 탭에서 특정 자바스크립트 파일(컴포넌트) 이 오랫동안 실행되고 있다면 의심을 해야한다. 예시 코드는 아래와 같다.</p><br />

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

<p>블로그 글 중에서 제외하고 싶은 특수 문자들이 있고 이를 제거하는 함수인데, 이 함수에서 알 수 있는 점은 반복문에 더하여 while 까지 추가하여 문자들을 검사하고 있다. 블로그 글 특성상 많은 글은 9만자가 넘어가고 그렇다면 당연하게도 성능은 떨어질 수 밖에 없다. 이 코드를 아래와 같이 수정해주자.</p><br />

```js
function removeSpecialCharacter(str) {
  let _str = str.substring(0, 300); // 300자 정도까지만
  _str = _str.replace(/[\#\_\*\~\&\;\!\[\]\`\>\n\=\-]/g, "");
  // 정규화 표현식으로 수정하자.

  return _str;
}
```

<p>이런식으로 문제가 될 만한 자바스크립트 코드를 수정해주는것이 병목현상을 줄일 수 있는 방법이다.</p><br />

### 코드 분할

<p>역시나 performance 탭에서 확인할 수 있는데, 처음 로드될 시 chunk.js 와 같이 번들 js 의 로딩시간이 길어지는 경우가 있다. 페이지 로드시 필요한 js 파일을 전부 받아와서 페이지를 랜더시키기 때문인데, 이러한 번들을 분석하기 위해서는 bundle-analyzer 라이브러리를 활용하면 좋다. 다만 cra를 통해 셋팅하였다면 cra-bundle-analyzer 를 통해서 가능하니 참고하자. 이 라이브러리를 설치한 다음 실행시켜주면 report.html 에서 어떠한 파일들이 얼마나 차지하고 있는지 화면상에서 알 수 있게 해준다.</p><br />

<p>블로그 예시를 통해 살펴보면 refractor 라는 라이브러리가 많은 부분을 차지함을 알 수 있는데, 이는 블로그 글에서 코드 블럭 내 하이라이트를 담당하는 라이브러리다. 반드시 필요한 라이브러리 인데, 생각해보면 첫 main 페이지에서는 코드블럭이 나올리가 없으니 필요가 없다. 즉 상세페이지로 들어갈때만 로드 시켜주면 되는 것이니, 나눠주는 방법을 생각해보자</p><br />

<p>리엑트에서는 이를 위해 코드 분할이라는 기능을 제공해주고, 실제 공식 홈페이지에서 이를 자세하게 다루고 있다. 이중 라우터에서의 코드분할을 하는 방법에 대해 알아보도록 하자</p><br />

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

<p>기존 방식대로라면 이미 ListPage, ViewPage 에 필요한 모든 js 파일이 다 한번에 로드가 된다. 이후 ViewPage 에 들어가면 이미 로드된 번들 js 에서 필요한 부분을 활용하는 것이다. 하지만 코드 분할을 하게 되면, 해당 페이지로 이동할 때 그 페이지에 필요한 js 를 로드할 수 있다. 이렇게 하게 되면 초기 메인 페이지를 렌더할 때는 refractor 을 로드할 필요가 없게 되어 성능이 좀 더 향상될 수 있다.</p><br />

### 텍스트 압축

<p>dev 상태가 아닌 실제 배포상태가 되면 성능이 조금 더 향상되곤 한다. 그런데 배포 후 Light House 를 실행시키면 텍스트 압축 여부를 확인하라는 메세지가 나온다. 보통 서버에서 데이터를 가져올 때 2mb 이상이라면 gzip 을 통해 압축하여 전달받고, 이후 클라이언트에서 렌더 시 압축 해제를 하는것이 더 유리하다. 이러한 방법은 배포 시 설정에서 설정할 수가 있다.</p><br />

### reflow, repaint

<p>브라우저가 렌더링을 할 때 단계를 보면 DOM + CSSOM 이 생성이 되고 그 다음 render tree 가 생성되며, 이후 layout 조정을 한다. 이후 각 요소에 대한 색상을 설정하는 paint 과정을 거친 후에 마지막에 각각의 레이어에서 작업한 이 모든 것들을 complie 해주게 된다.</p><br />

<p>만약 js 이벤트에 의해 width 같은 속성이 변화하게 되면 위의 렌더 과정을 다시 실행하게 된다. CSSOM 의 변화가 있으니 당연한 결과라고 할 수 있다. 만약 애니매이션에 의해서 어떠한 요소의 width 값의 변화가 초당 프레임으로 표현하기 힘들 정도로 세세하게 일어난다면, 즉 기본 60프레임을 만족시키기가 어렵다면 이에 애니매이션 효과가 버벅이는 현상이 일어나게 된다.</p><br />

<p>이를 예방하는 방법으로는 특정 속성에 따라 reflow 와 repaint 를 생략하는 경우가 있는데, 바로 gpu 연산을 이용하는 속성인 transform 과 opacity 를 활용하는 방법이다.</p><br />

```js
const Test = styled.div`
  width: ${({ width }) => width}
  transition : width 0.25s ease
  `;

const Test = styled.div`
  width: 100%
  transform: scaleX(${({ width }) => width / 100});
  transition : transform 0.25s ease
  `;
```

<p>예시 코드이긴 하지만 기존에는 width 를 이벤트에 따라 변화를 주어서 처리하였는데 이렇게 되면 width 는 reflow 를 일으키게 되고 성능 저하가 발생하게 된다. 반면 transform 은 gpu 를 활용하는것이기에 거의 대부분 60프레임을 안정적으로 유지하고 메인 스레드도 크게 사용하지 않음을 performance 탭에서 확인할 수 있다.</p><br />

### 데이터 preloading

<p>이전에 코드 분할에 대해 설명한 적이 있으며, 실제로 적절한 페이지나 컴포넌트가 렌더될 때 불러오면 효율적이긴 하다. 하지만 예를 들어 모달창에 필요한 js 파일의 용량이 크며, 랜더되는 시점에 js 파일을 로드하면 이후 실행하여 랜더하기까지의 시간이 지체되는 상황이 발생한다. 즉 이렇게 된다면 사용자는 모달창을 띄었지만 빈 모달창을 지켜봐야 하는 상황인 것이다. 물론 skeleton ui 를 활용하여 처리할 수 있겠지만, preloading 의 개념으로 접근을 해보자</p><br />

<p>preloading 은 상황에 따라 여러 방향이 존재할 것이며, 단순하게 버튼을 클릭하여 모달창을 띄우는 상황에 대해서라고 생각해보자. 이 경우 2가지 상황으로 살펴보도록 하겠다</p><br />

- 버튼에 마우스가 올라갔을 경우
- 현 페이지의 랜더가 마무리 된 상황에서 바로 다음에 받아오기

<p>위 상황들에 대한 라우팅 코드는 다음과 같다.</p><br />

```js
import React, { useState, Suspense, Lazy } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import InfoTable from './components/InfoTable'
import SurveyChart from './components/SurveyChart'
import Footer from './components/Footer'
import ImageModal from './components/ImageModal'

// 다양한 컴포넌트를 대응하기 위한 팩토리 패턴
// import 함수를 기입하면 우선적으로 Lazy 가 적용된 컴포넌트가 생성이된다
// 이후 이 컴포넌트 내부 프로퍼티에 import 함수를 추가해주고
// 이 컴포넌트를 return 해준다.
const LazyWithImport = (importFunction) => {
  const component = React.Lazy(importFunction);
  component.preload = importFunction;
  return component;
}

// 함수 LazyWithImport 에 의한 반환 컴포넌트 LazyImageModal 은 preload 라는 프로퍼티 역시 지니게 된다.
const LazyImageModal = LazyWithImport(() => import('./components/ImageModal'))

function App() {
    const [showModal, setShowModal] = useState(false)

    // 이는 App 컴포넌트가 반환이 끝난 후 실행되는 상황.
    useEffect(() => {
      LazyImageModal.preload();
    },[])

    // 버튼의 api 인 onMouseEnter 에 연동시키는 함수
    const handleMouseOn = () => {
      LazyImageModal.preload();
    }

    return (
        <div className="App">
            <Header />
            <InfoTable />
            <ButtonModal onClick={() => { setShowModal(true) } onMouseEnter={handleMouseOn}}>올림픽 사진 보기</ButtonModal>
            <SurveyChart />
            <Footer />
            <Suspense fallback={null}>
              {showModal ? <LazyImageModal closeModal={() => { setShowModal(false) }} /> : null}
            <Suspense>
        </div>
    )
}

```

<p>상황이 복잡해 보이지만 위의 주석설명을 잘 따라오면 이해할 수 있다. 결국 핵심은 모달창이 띄어지기 전에 미리 데이터를 가져오는 방법이니 이를 이해하는것이 먼저다. </p><br />

### 이미지 preloading

<p>실제 모달창까지는 그에 필요한 js 를 미리 로드하는것이 가능해졌다. 하지만 실제 모달창을 누르면 사진은 여전히 늦게 가져오게 되어 사용성이 떨어지게 된다. 이에 이미지를 미리 가져오는 방법이 있는데, 자바스크립트의 new Image() 객체를 활용하는 방법이다.</p><br />

```js
const img = new Image();

img.src = "주소"; // 실행되는 순간 바로 이미지를 요청한다.
```

<p>이를 활용하면 적어도 모달을 클릭할 시 첫 페이지의 이미지는 미리 캐시화 하여 가져올 수가 있는데(중요한건 이 이미지가 캐시화가 가능한 것인지부터 따져야한다), 이걸 useEffect 에 넣어서 처리해주자</p><br />

```js
// 생략
useEffect(() => {
  LazyImageModal.preload();
  const img = new Image();
  img.src = "지정된 주소";
}, []);
```
