## RefferError: ResizeObserver is not defined

테스트코드를 작성하고 실행하다가 위와 같은 오류가 발생하였었다. 저런 변수를 선언한 적도 없었고, 그럼에도 참조 오류이기에 분명 어디서 참조를 하고 있다는 말이니 계속 찾아보다가 말 그대로 새롭게 사이즈가 변동되는것을 감시한다는 의미를 생각해보았다. 그러다가 메인 페이지에서 사이즈 변동에 따라 유연하게 변화하는 것 중에서 그래프가 떠올랐다. 참고로 그래프 작성 시 Nivo 라는 라이브러리를 사용하고 있었다.

### ResizeObserver

ResizeObserver 는 브라우저 화면에서 DOM 요소의 크기 변화를 관찰하는 Javascript API이다. 요소의 크기 변화를 실시간으로 감지하고 이에 따라 이벤트를 트리거하는 기능을 제공한다. 그렇기에 웹 어플리케이션에서 동적으로 크기가 조절되는 요소를 관리하거나 반응형 디자인을 구현하는데 사용된다고 한다. <br />

- 실시간 크기 관찰 : 대상 DOM 의 요소크기를 실시간으로 감지한다. 요소가 화면 크기, 부모 요소의 크기, 요소 내용의 변경으로 인해 크기가 변할 떄 이를 감지할 수 있다.
- 요소의 크기 및 위치 추적: 크기뿐 아니라 위치 변경도 관찰할 수 있다.
- 성능 향상 : 크기 변화 이벤트를 비동기적으로 처리한다. 이는 다수의 요소의 크기를 관찰할 때 유용하며, 렌더링 성능에 영향을 미치지 않는다.

사용 예시라면 반응형 디자인 요소의 크기를 동적으로 조정하거나, 뷰포트 리사이징에 반응하는 UI 컴포넌트를 구현하는 등에 있다. <br />

```js
// 대상 요소 선택
const targetElement = document.querySelector(".resize-element");

// ResizeObserver 생성자로 관찰자 생성
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    // 크기 변경 이벤트 처리
    console.log("Element size changed:", entry.target, entry.contentRect);
  }
});

// 대상 요소를 관찰자에 등록
resizeObserver.observe(targetElement);

// 나중에 더 이상 관찰하지 않을 경우, 해당 요소를 관찰자에서 해제할 수 있다.
// resizeObserver.unobserve(targetElement);
```

### 그래프 라이브러리와 테스트 setting

요소를 관찰한다는 점에서 충분히 그래프 라이브러리에 활용될 수 있을 것이다. 따라서 이와 관련된 함수가 실행중이라면 이를 mock 처리 해주어야 한다. <br />

```ts
// 전역객체에 ResizeObserver 가 있다면 그대로 하고 아니라면 mock 함수로 대채해주자.
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('overview', () => { ... })
```

- 위와 같이 테스트코드를 실행하기전에 mock 처리 해주면 정상적으로 실행이 된다.
