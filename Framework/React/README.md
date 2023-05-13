### React 를 구현을 해보자

<p>많은 회사들이 react 를 기반으로 서비스를 운영중이기에, javascript 와 더불어 react 역시 좀 더 깊게 파고들어서 학습할 필요가 있다. 학습에 어려운 측면이라고 한다면 자유도가 높다는 점이 적용되기도 한다. 즉 최적의 아키텍쳐가 무엇인가에 대해 고민이 생긴다. 이 과정에서 라이브러리를 분석하는 방법도 있지만, 규모 자체가 워낙 커서 쉽지않고, 대신 기본 개념을 익히기 위해서 직접 만들어 보는것은 가능할 것 같다.</p><br />

<p>리엑트를 구현할 때 먼저 고민해야 할 부분은 virtual DOM 이 필요하다. 왜냐면 이 가상 돔으로 통해 실제 돔을 업데이트 하기 때문이다. 그렇다면 우선 html 이 어떻게 구성되어있는지 파악해야한다. 그리고 이걸 자바스크립트내 가장 친화적은 형태로 전환한다면 어떨까.</p>

```html
<div id="root">
  <span>hello</span>
</div>
```

- 위와 같은 html 을 자바스크립트의 가상돔이자 자바스크립트이 객체로 표현을 해보자

```js
// 객체야 말로 자바스크립트에게 가장 친숙한 데이터 형태
{
  tagName: 'div',
  props: {
    id: 'root',
    className: 'container'
  },
  children: [
    {
      tagName: 'span',
      props: {},
      children: [
        'hello'
      ]
    }
  ]
}
```

- 더 복잡하겠지만, 간략하게 가상돔을 표현해보자면 이럴 수 있겠다.

<p>이제 리엑트에서 가장 대표적인 메서드인 render(), createElement() 를 구현해보자. createElement 는 가상 DOM 을 생성할 것이고 render는 실제 돔에 적용을 시킬 것이다.</p>

```js
/** @jsx createElement */
import { render, createElement } from "./react.js";

function Title() {
  return (
    <div>
      <h2>정말 동작할까</h2>
      <p>한번 확인해보자</p>
    </div>
  );
}

render(<Title />, document.querySelector("#root"));
```

- 실제 함수 컴포넌트를 생성했다고 가정하고 위처럼 작성할 것이다.
- 필요한 단계는 함수의 return 부분의 html 태그를 통해 가상돔을 생성하고
- 가상돔을 실제돔과 비교하면서
- 결국 실제돔에 render 를 통해 적용를 시켜야 한다.

```js
export function createElement(tagName, props, ...chidren) {
  // virtual DOM 만들기
  if (typeof tagName === "function") {
    return tagName.apply(null, [props, ...chidren]);
  }
  return { tagName, props, chidren };
}
```

- 우선 가상돔을 생성한다. 가상돔을 생성할 때, babel 로 변환된 부분을 먼저 확인해보면
- createElement 내 tagName 에 문자열이 들어갈 수 있으며, 동시에 함수가 들어갈 수 있다.
- 즉 babel 은 js 내 html 태그 모양에 관하여 createElement 를 적용시키게 된다.
- return 값은 위에서 만든 가상돔과 일치 한다. 실제 children 을 보게 되면 마치 이렇게 되는 것이다.

```js
createElement("div", null, createElement("h2", null, "정말 동작할까"), createElement("p", null, "한번 확인해보자"));
```

- 재귀적으로 호출이 된다고 생각하면 된다.
- 일반적으로 이렇게 tagName 이 string 이면 문제가 없는데, 함수 컴포넌트를 렌더링 할 때를 보면

```js
render(createElement(Title, null), document.querySelector("#root"));
```

- 이런 모양이 된다. 즉 함수가 들어올 수 있기에 함수가 들어오면 이 함수를 실행시켜주면된다.
- 왜냐면 이 함수의 return 값이 jsx 이기 때문이다.
- 함수를 실행시킬 때 가변변수를 넘기는 방법은 apply 를 사용하는 방법이 있다.

<p>이제 가상돔을 생성하였으니, 실제 및 render 를 통해서 실제 돔에 적용시키도록 하자.</p>

```js
function renderRealDOM(vdom) {
  if (typeof vdom === "string") {
    return document.createTextNode(vdom);
  }
  if (vdom === undefined) return;
  const $el = document.createElement(vdom.tagName);

  vdom.children.map(renderRealDOM).forEach((node) => {
    $el.appendChild(node);
  });

  return $el;
}

export function render(vdom, container) {
  return container.appendChild(renderRealDOM(vdom));
}
```

- 태그를 하나하나 만들어주어야 한다. 실제 container 에 가상돔의 태그들을 넣어주어야 한다.
- render 함수에는 실제 element 를 실제돔에 append 해주는것이니 우선 가상돔을 실제돔의 element 로 만들어 주도록하자
- 가상돔의 구조를 보면 트리 구조로 그 끝을 알기 힘드니, 재귀함수로 처리해야겠다.
- renderRealDOM 함수를 생성하여 인자의 vdom 의 tagName 을 element 로 생성한다.
- 이후 이 tag에 children 은 배열로 되어 있을 테니, map 을 통해서 각 child를 하나의 vdom 으로 생각하여 다시 renderRealDOM 을 돌리게 된다.
- 호출할때마다 $el 이 생성이 되고(tagName 에 대한), 여기서 기저조건은 vdom 이 undefined 이거나 호출한 child 가 객체가 아니라(즉, tagName 을 가진게 아니라) 문자열이라면, 이 text 를 return 하게 된다.
- return 된 text 는 상위 tag 인 $el 에 포함이 되게 된다.
- 이렇게 하위부터 상위로 태그들이 차례대로 만들어지고, 최종적으로 처음 전달했던 vdom 에 대한 요소가 만들어진다
- 이 만들어진 실제 요소트리를 render 함수에서 실제 컨테이너에 append 해준다.

<p>실제 리엑트는 가상돔과 실제돔을 비교하는 diff 알고리즘이 돌아가는데, 이 부분은 render 에서 작동할 것으로 예상된다. 이렇게 비교를 하려면 이전 가상돔과 현재 가상돔이 필요하고, 이전 상태를 가져야 한다. render 는 함수이고 함수는 이전 상태를 가질 수 없는데(내부 변수가 초기화 되니깐) 자바스크립트에서는 클로져를 활용해서 이를 해결할 수 있다.</p>

```js
export const render = (function () {
  let prevVDOM = null;

  return function (nextVDOM, container) {
    if (prevVDOM === null) {
      prevVDOM = nextVDOM;
    }

    // diff 알고리즘

    container.appendChild(renderRealDOM(nextVDOM));
  };
})();
```

- 즉시실행함수로서 render 가 실행되면 return 이 함수이며, 이 함수는 클로져 내부 변수를 사용할 수 있다.
- 여기서 내부 변수는 이전 상태값이며, 매 가상돔을 이전 가상돔으로 넣어준 뒤, 여기서는 구현하지 않았지만 diff 알고리즘을 적용하여 이전상태와 이후상태를 비교한다.

> **Class Component**

<p>클래스 컴포넌트는 내부에 render 메서드가 있고, 인스턴스를 만들어야 한다.</p>

```js
class YourTitle extends Component {
  render() {
    return <p>클래스의 타이틀</p>;
  }
}

function Title() {
  return (
    <div>
      <h2>정말 동작할까</h2>
      <YourTitle />
      <p>한번 확인해보자</p>
    </div>
  );
}
```

- 우선 클래스인지 함수인지를 자바스크립트에서는 구별할 수 없다. 즉, YourTitle 만으로는 함수인지 클래스인지 알 수 없는 것이다.
- 이름만으로는 구별할 수 없지만, 클래스의 경우 상속을 받을 수 있고
- 어떤 상위 클래스로부터 상속시킨 뒤, 인스턴스의 프로토타입을 확인하는 boolean 으로 클래스와 함수를 구별할 수 있다.

```js
export class Component {}
```

- 상위 컴포넌트를 생성한 뒤 위처럼 extends 시켜주면 상속시켜줄 수 있다.
- 이후 createElement 를 수정해보자

```js
export function createElement(tagName, props, ...children) {
  // virtual DOM 만들기
  if (typeof tagName === "function") {
    // 이 부분이 함수와 클래스 여부를 가르게 된다.
    if (tagName.prototype instanceof Component) {
      const instance = new tagName({ ...props, children });
      return instance.render();
    } else {
      return tagName.apply(null, [props, ...chidren]);
    }
  }
  return { tagName, props, chidren };
}
```

- 프로토타입을 통해 클래스와 함수를 구별한뒤, 클래스라면 인스턴스를 생성하고
- 이후 인스턴스 내 메서드 render() 로 jsx 를 실행시킨다.(createElement)
- 여기서 클래스를 호출할 때마다, 인스턴스를 생성하게 되는데 실제로는 이 인스턴스를 외부에 저장한다
- 이후 이 인스턴스에 대한 라이프사이클을 구현하는데, 이러한 특징은 클래스와 함수를 구별하게 해준다.
- 함수형 컴포넌트는 이전 상태를 저장할 수가 없다. 반면 클래스형 컴포넌트는 인스턴스를 외부에 저장하면서 이전 상태값을 업데이트 할 수가 있게 된다.
- 상태값을 업데이트하지 못하는것은 치명적인데, 현재 우리가 함수형 컴포넌트를 주로 사용할 수 있는것은 이 문제를 해결 했다는 의미다.
- 이를 해결해 주는 방식히 hook 이다.
- 어떠한 아이디어로 hook 은 이전 상태값을 저장할 수 있는 것일까?

> **hook**

<p>함수가 호출될 때 어떠한 방식으로 마지막 상태를 기억할 수 있을까에 대해 리엑트 팀의 방안은 가상돔을 통해 실제돔을 렌더링 할 때, 랜더링 할 대상인 함수 컴포넌트의 개수는 가상돔을 돌릴때마다 동일하다. 즉 함수 컴포넌트마다 인덱스를 매긴 외부 저장소를 만들고, 18번째 함수가 이전 상태가 필요하다고 할 때 그에 맞는 순서의 인덱스에서 상태값을 전달해주는 방식이다.</p>

```js
export function useState(initialValue) {
  let value = initialValue;

  return [
    value,
    (nextValue) => {
      value = nextValue;
    },
  ];
}
```

- useState 의 기본 구조는 다음과 같다. 역시 클로저이다.

```js
const hooks = [];
let currentComponent = -1;
```

- currentComponent 는 함수 컴포넌트의 순서다. 즉 랜더링 순서라고 생각이자 함수컴포넌트를 구별짓는다.
- hooks 배열은 상태값이 저장되는 배열

```js
export function useState(initialValue) {
  const position = currentComponent;
  hooks[position] = initialValue;

  return [
    hooks[position],
    (nextValue) => {
      hooks[position] = nextValue;
    },
  ];
}
```

- 다시 수정해주었다. useState 의 return 값인 함수에 currentComponent 가 사용되기에 상태값이 제대로 저장안될 수 있어서, position 으로 캡쳐링 해주었다.
- 이후 초기값과 nextValue 를 통해서 상태값을 업데이트 한다. (지금은 업데이트 로직은 아니다.)

```js
export function createElement(tagName, props, ...children) {
  // virtual DOM 만들기
  if (typeof tagName === "function") {
    // 이 부분이 함수와 클래스 여부를 가르게 된다.
    if (tagName.prototype instanceof Component) {
      const instance = new tagName({ ...props, children });
      return instance.render();
    } else {
      // 매 함수컴포넌트의 인덱스를 증가시킨다.
      currentComponent++;
      return tagName.apply(null, [props, ...chidren]);
    }
  }
  return { tagName, props, chidren };
}
```

- 다시 정리를 해보면 처음 렌더링을 하면서 상태값을 hooks 에 차례대로 저장을 한다.
- 이후 상태값이 업데이트가 되면 다시 함수 컴포넌트가 랜더링 되는데, 이때 랜더링 되는 순서가 동일하다
- 그렇기에 특정 함수의 상태값을 변경할 수있고 저장해놓을 수 있다.
- 이러한 특징에서 알 수 있듯이 hook 은 반드시 함수형 컴포넌트 내에서 사용하도록 하고 있다.
- 아니면 인덱스가 꼬여버릴 수 있다.

<p>인덱스가 꼬인다는게 햇갈릴 수 있다. 물론 지금도 좀 햇갈리는데, 중요한 점은 다음과 같다</p>

- 함수 컴포넌트가 실행되어 랜더링 되는것은 첫번째던지 두번째던지 동일한 순서와 갯수라 가정한다
- 즉, 어떠한 로직이 아닌(조건문이나 반복문) 필요에 의한 개발자의 직접적인 수정은 첫 랜더링이라 생각
- 상태값의 변동으로 인한 재 랜더링의 경우만이 이후 랜더링이라 판단

<p>함수 컴포넌트 마다 들어있는 useState 에 대해 외부 배열을 통해 hook 과 state 를 기억할 수 있었다. 즉, 같은 useState에 같은 state 명이라 할지라도 함수컴포넌트마다 독립성이 유지되는데, 그 이유는 외부 배열에서 currentComponent 인덱스를 통해 함수구별이 가능하기 때문이다. 이와 마찮가지로 같은 함수컴포넌트 내 여러개의 hook 에 대해서도 비슷한 작용이 이루어진다. 즉, 같은 컴포넌트 내 hook 의 구별 역시 외부 배열 속 인덱스로 순차적으로 랜더링을 진행하면서 상태값을 해석한다고 생각하면 된다.</p>

```js
let state = [];
let setters = [];
let firstRun = true;
let cursor = 0;

function createSetter(cursor) {
  return function setterWithCursor(newVal) {
    state[cursor] = newVal;
  };
}

// 앞에서 구현해본 useState 와 비슷하다.
export function useState(initVal) {
  if (firstRun) {
    state.push(initVal);
    setters.push(createSetter(cursor));
    firstRun = false;
  }

  // 함수를 전달
  const setter = setters[cursor];
  const value = state[cursor];

  cursor++;
  return [value, setter];
}

// Our component code that uses hooks
function RenderFunctionComponent() {
  const [firstName, setFirstName] = useState("Rudi"); // cursor: 0
  const [lastName, setLastName] = useState("Yardley"); // cursor: 1

  return (
    <div>
      <Button onClick={() => setFirstName("Richard")}>Richard</Button>
      <Button onClick={() => setFirstName("Fred")}>Fred</Button>
    </div>
  );
}

function MyComponent() {
  cursor = 0; // 리셋
  return <RenderFunctionComponent />; // render
}

console.log(state); // Pre-render: []
MyComponent();
console.log(state); // First-render: ['Rudi', 'Yardley']
MyComponent();
console.log(state); // Subsequent-render: ['Rudi', 'Yardley']

// 버튼 클릭

console.log(state); // After-click: ['Fred', 'Yardley']
```

- 코드가 제대로 작동하지는 않을 수 있으나 수도코드 목적으로 참고하자.
- 여기서 알고자 하는 원리는 결국 각 훅들의 상태값과 setter 함수 역시 각각의 외부 배열에 저장되면서
- 랜더링마다 순차적으로 읽힌다는 점이다.
- 즉 firstName -> lastName 순으로 배열의 인덱스대로 상태값을 가져온다.
- firstName = state[0], lastName = state[1]
- 이렇기 때문에 사실 같은 hook 을 여러번 사용해도 각각의 상태를 구별할 수 있다.
- 이렇기 떄문에 react 에서 권장하는 방식을 쓰지 않는다면, 상태값을 불러오는데 문제가 발생할 수 있다.

```js
if (customValue) useHook();

// or
for (let i = 0; i < customValue; i++) useHook();

// or
if (customValue) return;
useHook();
```

- 위의 경우를 react 는 하지 말라고 권고하며, 실제로 eslint 에서 자동적으로 에러가 발생하도록 설정하고 있다.
- 만약 hook 의 순서를 바꾸면 어떻게 될까

```js
let firstRender = true;

function RenderFunctionComponent() {
  if (firstRender) {
    [initialName] = useState("Ruu"); // cursur = 0
    firstRender = false;
  }

  const [firstName, setFirstName] = useState("Rudi"); // cursur = 1
  const [lastName, setLastName] = useState("Yardley"); // cursur = 2

  return (
    <div>
      <Button onClick={() => setFirstName("Richard")}>Richard</Button>
      <Button onClick={() => setFirstName("Fred")}>Fred</Button>
    </div>
  );
}
```

- 처음 렌더링이 진행되다면, state[0] = initialName = 'Ruu' 가 들어가면서 이후 순차적으로 다른 상태값들도 들어가게 된다
- 하지만 버튼을 클릭하여 firstName = "Richard" 로 변경을 진행한다고 하면
- 다시 함수가 리랜더링 된다
- 이때 조건문에 들어가있던 useState 는 발동하지않게 되고, 원래 있어야 할 state[0] 을 initialName 이 아니라 firstName 이 받게 된다.
- 이후 firstName 을 lastName 이 받게 되는 듯이 순서가 바뀌어 버린다.
- 즉, 올바른 이전 상태값을 가리키지 않는다. (실제로 리엑트에서는 이미 에러가 떳을 것이다.)

<p>결론을 요약하자면, 리엑트의 함수 컴포넌트에서 이전 상태값을 저장할 수 있는 방법인 hook 의 등장으로 기존 클래스 컴포넌트에서 더 직관적이고 가독성이 좋은 함수 컴포넌트로의 이동이 활발해졌다. 이러한 hook 의 상태 저장 원리는 외부 배열의 인덱스를 이용하는것이었고, 그렇기에 리엑트내에서 말하는 hook 의 규칙을 잘 지키도록 해야한다.</p>

### useConfirm 커스텀 훅

<p>버튼 이벤트 발동 시 사용자에게 한번 더 확인을 해야할 때가 있다. 예를 들면 데이터를 삭제하려고 한다면, 한번 더 삭제 여부를 물어봐야 하는 것이다. 실수로 삭제버튼을 그냥 눌러버릴 수 있으니 말이다. 커스텀한 알림창을 사용하는 것이라면 따로 component 를 랜더링 하고, 그 다음 확인과 취소버튼에 실제 이벤트를 발동시키면 되겠지만, 간단하게 알림창을 뛰우고 싶다면 window.confirm(message) 를 조건식으로 활용하면 된다.</p>

```ts
import React, { useCallback } from "react";

const useConfirm = (description: string, onSubmit: () => void, onCencel: () => void) => {
  const confirm = useCallback(() => {
    if (window.confirm(description)) {
      onSubmit();
    } else {
      onCencel();
    }
  }, [description, onSubmit, onCencel]);

  return confirm;
};

export default useConfirm;
```

- 조건식응로 window.confirm(message) 를 통해 message 를 알림창에서 사용자에게 전달하고, 확인을 누르면 onSubmit, 취소라면 onCencel 이 실행된다
- 이를 좀 더 간단하게 사용하기 위해서 커스텀 훅을 제작하며, useCallback 으로 내부 함수를 캐싱화 시켜줄 수 있다.

### 리엑티브와 리엑트

<p>자바스크립트로 웹페이지를 구현할 때를 살펴보면 보통, 데이터의 변화가 발생시(Model) 이를 적절히 조치하여(Controler) 실제 화면을 다시 그려준다(View). 즉 model 이 변화하였으면 반드시 view 를 변화시켜주어야 한다. 이 과정보다 더 단순하고 간략한 과정이 있지 않을까 고민 끝에, model 을 변화해줌으로서 자동적으로 view 에 변화가 일어날 수 있도록 view 가 model 의 특정 값에 의존하는 과정을 구현하였고, 이를 리엑티브라고 한다. 리엑트는 이러한 리엑티브 반응을 이용하여 쉽게 UI 설계를 가능하게 해주는 라이브러리 이다.</p><br />

<p>또한 개발자들이 고민한 것은, DOM API 의 사용빈도였다. 어떠한 model 의 데이터값이 변화하고, 데이터값을 View 에 적용할 때마다 DOM API 를 호출했어야 했다. 웹 페이지에서는 수시로 이벤트가 발생하고 그로인해 DOM API 는 수시로 호출되게 된다. 이 호출의 빈도를 낮추어야 하는데, 그 이유는 한번 호출될 때마다 브라우저는 렌더링의 과정을 다시 거치기 때문이다. 렌더링의 과정은 DOM, CSSOM 을 통한 랜더트리형성 이후 viewport 에 맞추는 레이아웃작업을 거쳐 실제 pixel 로 paint 하는 과정을 거치게 된다. 가벼운 작업은 아니기 때문에 이를 최소화 하는것이 좋은데, 개발자들은 여기에 가상돔 이라는 개념을 통해 이를 해결하고자 하였다. 즉 실제 돔에 DOM API 를 적용하기 전에 먼저 가상돔을 비슷하게 생성하여, 실제 돔과의 비교를 통해 변경된 부분만을 실제돔의 API 를 호출하는 방식이다. 리엑트는 이러한 가상돔을 활용한 라이브러리이다.</p><br />

<p>리엑트는 React 라는 라이브러리를 먼저 import 해야한다. 이렇게 하면 React 라는 실제 모듈을 사용할 수 있는데, 그 중 React.createElement 를 통해 가상돔 내 요소를 생성할 수 있게 된다. document.createElement 와는 차이점이 있는데, React.createElement 에서 생성된 요소는 순수 객체이다. DOM API 를 통해 생성된 요소와는 차이점이 있다. 실제 document.createElement 를 통해 생성된 노드는 HTMLElement 를 프로토타입으로 가지고 있다. 반면 가상돔에 사용될 React.createElement 는 Object 를 프로토타입으로 가지고 있다. 이러한 특징은 리엑트가 비단 브라우저만을 위한 라이브러리에 종속되지 않게 만들어준다. 실제 모바일 환경에서 사용하게 되는 React Native 가 하나의 예시이다.</p><br />

<p>가상돔의 요소를 생성하였다면 이제 이 가상돔을 실제돔과 비교하여 변경된 사항은 실제돔에 적용시켜주어야 한다. 즉, 가상돔을 기반으로 실제 돔의 API 를 호출하는 역할을 React DOM 이 처리한다. 그래서 같이 import 해주어야 한다.</p><br />

<p>Class 문법을 사용할 시, 만일 ES6 를 지원하지 않는 브라우저라면 다른 방향으로 리엑트를 작성해야한다. 실제 공식문서에서도 이러한 방식을 제공해주고 있지만, 한계가 있기에 우리는 babel 트랜스파일러를 사용해야한다. 최신 문법으로 작성해도 브라우저 환경에 따라 그에 맞는 문법으로 자동 변경시켜주기에 아주 편하다. 뿐만 아니라 babel 은 리엑트에서는 지원하지 않는 템플릿 언어를 사용할 수 있도록 해준다. 자바스크립트 확장문법인 JSX 를 사용할 수 있는데, 이를 통해 흔히 우리가 html 을 작성하듯이 가상 요소를 작성할 수 있게 되어 아주 편안해진다.</p><br />

<p>요약하자면 리엑트는 리엑티브의 성질을 적용시킨 라이브러리이며, 리엑트를 사용하기 위해선 React, React Dom, babel 을 기본으로 설정해주어야 한다.</p>
