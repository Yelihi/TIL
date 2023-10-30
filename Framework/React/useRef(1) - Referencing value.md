## Referencing value with Refs

react에서 state 만큼 많이 사용하는 것이 useRef 인 것 같다(적어도 나는 그러하다). 이번 챕터에서는 내가 처음 useRef 를 사용하였을 때의 목적이었던 '값의 참조' 로서의 ref 를 다루어 보고자 한다. (다음에는 실제 DOM 에 접근하기 위한 ref) <br />

### ref 사용하기

state 를 간단하게 사용할 수 있듯이, Ref 의 사용역시 너무 간단하다. 함수형 컴포넌트를 기준으로 useRef 선언을 통해 쉽게 ref 값을 선언해줄 수 있다. <br />

```jsx
import { useRef } from "react";

export default function home() {
  const ref = useRef(null);

  // ...
}
```

<br />

단, 주의할 점은 위 null 값이 곧 ref 인 것이 아니다. 실제 useRef 를 통해 return 하는 값은 사실 객체이다. <br />

```js
{
  current: null; // useRef 를 통해 전달하는 value
}
```

<br />

useRef 는 위 자바스크립트 객체를 반환하고, 전달해준 value 가 property 인 current 의 value 로서 전달이 된다. 즉, 우리가 값을 저장하여 사용하고자 할 때는, ref.current 를 통해 접근하여야 한다. <br />

ref.current 값은 언제든지 변경하고 삭제할 수 있다. 여기서 ref 의 특징이 나오는데, 아래 예시를 통해 살펴보자 <br />

```jsx
import { useRef, useState } from "react";

function Home() {
  const [click, setClick] = useState(0);
  const ref = useRef(0);

  let normal = 0;

  function handleClick() {
    ref.current = ref.current + 1;
    normal = normal + 1;
    alert("ref" + ref.current);
    alert("normal" + normal);
    setClick((prev) => prev + 1);
  }

  return <button onClick={handleClick}>Click me!</button>;
}
```

<br />

위 예시에서는 버튼을 클릭할 때 마다 ref, normal 를 1씩 증가시키며, 이렇게 변경된 값을 alert 로 띄어주는 함수를 실행하고 있다. 의도대로라면 normal 과 ref.current 모두 증가된 값이 알람창에 띄어지는것이다. 만약 useState 를 통해 현 컴포넌트를 리렌더링 하지 않는다면 우리가 원한 결과를 얻을 수 있다. <br />

하지만 state 값의 변동으로(setFunction) 컴포넌트 Home 은 다시 렌더링이 되며, 함수가 재 실행되는 것이니 normal 은 계속해서 0으로 초기화가 이루어 진다. 그리고 버튼이 클릭되었으니 0 + 1 = 1 이 되어 normal 은 버튼을 얼마나 클릭을 하던 항상 1 을 띄어주게 된다. <br />

여기서 ref 의 주된 특징이 나오게 된다. ref 의 경우 함수 컴포넌트의 렌더링 여부와는 관계없이 current 값을 유지한다! <br />

따라서 setfunction 을 통해 재렌더링이 계속 이루어지더라도 ref.current 값은 그대로 1, 2, 3, ... 처럼 1씩 값이 상승되며 알람창에 나타나게 된다. 이 부분은 추후에 매우 유용하게 사용될 수 있는데, 렌더링을 유발시키지 않는 선에서 렌더링과 관계없이 유지되는 값을 저장할 때 useRef 가 활용될 수 있다. (실제로 난 이렇게 정말 많이 사용하는 편이다.)

### state 와는 어떠한 차이점이 있고, 왜 ref.current 는 값을 유지하는 것인가?

react 에서 컴포넌트가 다시 실행되어도 이전 값을 기억하기 위해서는 보통 state 를 사용해야 한다. 다만, state 의 값 변경은 반드시 set 함수로 진행되어야 하며, 이는 기존값과 변경된 값의 차이를 기반으로 렌더링이 발생하기 때문이다. 상태의 변경으로 자동적으로 렌더링이 발생한다는 부분은 분명 효율적일 수 있으나, 때로는 이러한 렌더링 유발을 원치 않을 때가 있다. <br />

ref 는 이러한 점에서 값의 저장소로서 유용하게 활용 될 수 있다. ref.current 의 값이 변한다고 해도 렌더링이 유발되지 않으며, 제 랜더링이 밣생해도 값을 이전 그대로 유지하고 있다는 점이 특징이다. 그렇다면 어떠한 원리로 이러한 저장이 가능한 것일까? <br />

```js
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

<br />

생략이 되어있겠지만, 간략하게 원리를 살펴보기 위해선 useRef 가 useState 에 뿌리를 두고 있다는 것을 알 필요가 있다. 위 코드에서 ref 는 useState 의 state 라는 것을 알 수 있다. <br />

useRef 로 값이 전달되면, useState 내 초기값으로 객체 { current: value } 로 선언되게 된다. ref 는 react 의 state 이기에 컴포넌트가 계속 랜더링 되더라도 그 값을 그대로 유지한다. 이로서 왜 Ref 값이 그대로 유지되는지 알 수 있게 되었다. <br />

또한 ref.current 값이 변경되어도 렌더링을 유발하지 않는 점도 확인할 수 있는데, 이는 react 의 state 를 변경할 때 하지 말아야 하는 방법을 역 이용했다고 할 수 있다. 바로 state를 set 함수를 거쳐서가 아닌 직접 변경을 한다는 점에 있다. <br />

사실 좀 더 명확하게 말하자면, ref 자체를 변경하는 것이 아닌, ref 객체 내 프로퍼티의 값을 변경하는 것이기에 사실 ref state 자체는 변화가 없다고 볼 수 있다. 이렇기에 react 의 권고사항을 지키면서 내부 current 의 값을 얼마든지 수정할 수 있게 된다. ref 는 자바스크립트의 객체이기에 내부 프로퍼티를 참조하고 있으며, 그렇기에 내부 프로퍼티 값을 변경해도 ref 객체는 동일한 프로퍼티인 current 를 참조한다. 이렇기에 실제 ref 를 사용할때는 내부 current 에 접근하는 것이다. <br />

결국 자바스크립트의 객체 성질과 react 내 state 의 규칙을 활용한 결과가 useRef 라고 할 수 있겠다.

### 정리를 하자면

지금까지 살펴본 저장소로서의 ref 의 특징은 다음과 같다. <br />

- Refs는 렌더링에 사용되지 않는 값을 유지하기 위한 탈출구이다.
- Ref는 current라는 단일 속성을 가진 일반 JavaScript 객체이며, 이를 읽거나 설정할 수 있다.
- useRef Hook을 호출하여 React에게 ref를 제공하도록 할 수 있다.
- state와 마찬가지로 ref는 컴포넌트의 재렌더링 사이에 정보를 유지할 수 있게 해준다.
- state와 달리 ref의 current 값을 설정해도 컴포넌트를 다시 렌더링하지 않는다.
- 렌더링 중에 ref.current를 읽거나 쓰지 말자. 이렇게 하면 컴포넌트가 예측하기 어려워진다.

<br />

ref 를 잘 활용하면 debounce 같은 경우에도 활용이 될 수 있고, 값의 저장소로서 아주 유용하게 활용될 수 있다. 그리고 다음에 다룰 실제 DOM 요소를 ref.current 내 저장하는 기능은 위 저장 기능보다도 더 많이 활용되기 때문에 좀 더 자세하게 다루어 보겠다.
