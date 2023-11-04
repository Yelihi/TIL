## 차트 라이브러리를 실제로 테스트 하기 위한 resizeObserverMock 정의

이전에 테스트 에러로서 window.resizeObserver 를 정의할 수 없다는(참조불가) 에러에 대해, mock 함수를 설정하는 방법을 포스팅 한적이 있다. 하지만 nivo 와 같은 차트 라이브러리를 직접 테스트 하는 경우, resizeObserver 내 observe, unobserve 등의 메서드나 resizeObserver의 callback 함수 등을 사용해야할 필요성이 있기에 단순히 mock 함수로만 처리하는것은 한계가 있다. <br />

이에 직접 resizeObserverMock Class 를 정의하여 활용하는것이 좋다. <br />

```ts
// resizeObserverMock.ts
export let listener: ResizeObserverCallback | null = null;

declare global {
  interface Window {
    ResizeObserver: typeof ResizeObserver;
  }
}

// 원래 타입에는 x, y, left 등등 더 많은 프로퍼티가 있어서 현재는 이를 다 충족시킬 수 없기 때문에 따로 custom type 을 지정했다.
type CustomDOMRect = {
  width: number;
  height: number;
};

// 새롭게 ResizeObserverCallback 타입을 지정해준다.
type ResizeObserverCallback = (
  entries: { contentRect: CustomDOMRect }[]
) => void;

export default class ResizeObserverMock implements ResizeObserver {
  constructor(ls: ResizeObserverCallback) {
    listener = ls;
  }

  observe() {
    return this;
  }

  unobserve() {
    return this;
  }

  disconnect() {
    return this;
  }
}
```

<br />

이제 실제 테스트 코드에 적용시켜보자 <br />

```tsx
import { screen, render, act } from "@testing-library/react";

import TotalPie from "../../components/main/chart/TotalPie";
import { categoriObject } from "../../components/store/data/TableData";

// 위에서 생성한 클래스와 콜백함수 listener 를 import 한다.
import ResizeObserverMock, {
  listener,
} from "../../__mocks__/overview/ResizeObserver";

// 전역 객체 내 ResizeObserver 를 Mock class 로 대체한다.
window.ResizeObserver = window.ResizeObserver || ResizeObserverMock;

describe("Overview Total Pie", () => {
  const defaultCategori = {
    Outer: 4,
    Pant: 3,
    Muffler: 1,
  };
  const mountComponent = (item: categoriObject) => {
    const { container } = render(<TotalPie item={item} />);
    // 렌더 과정에서 ResizeObserver 의 listener 설정을 해준다.
    // 렌더하는 차트의 크기를 설정해주는것인데, 이를 직접 설정해주지 않으면 width, height 이 0 이어서 차트가 안보인다.(테스트 환경에서)
    act(() => {
      listener?.([
        {
          contentRect: {
            width: 800,
            height: 400,
          },
        },
      ]);
    });
    return { container };
  };

  it("전달 카테고리에 따른 그래프 렌더링", () => {
    const { container } = mountComponent(defaultCategori);

    // 원형 차트가 그려지면 전달 데이터 내 카테고리인 'Outer, Pant, Muffler' 가 label 로서 렌더링 된다.
    const Categories = Object.keys(defaultCategori);
    Categories.forEach((categori) => {
      expect(container).toHaveTextContent(categori);
    });
  });
});
```
