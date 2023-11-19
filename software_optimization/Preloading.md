## 데이터 preloading

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

## 이미지 preloading

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
