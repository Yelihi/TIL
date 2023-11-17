## DOM을 React 에서 조절하는 방법

지난번에는 ref 내 current 의 값은 render 여부에 관계가 없기에, 탈출용 해치로서 사용된다고 하였다. 이번에는 React 내에서 실제 DOM 요소에 접근하는 방법에 대해서 살펴 보도록 하겠다.

## DOM 에 접근하기

React 에서 DOM node 에 접근하여 관리하기 위해서는 useRef 훅을 사용하면 가능하다.
<br />

```js
import { useRef } from "react";

// ...

const myRef = useRef(null);

// ..

<div ref={myRef} />;
```

<br />

초기값으로는 null 을 보통 할당하는데, 실제 render 과정이 마무리 된 후 update 가 되면(실제 DOM 을 update) null 대신 myRef.current 에 관리하고자 하는 DOM 객체가 할당이 되게 된다. 객체에 접근이 가능하게 된다.
<br />

```js
// browser API 를 사용할 수 있다.
myRef.current.focus();
```

## 만약 접근하려는 요소가 여러개이거나 증감의 변화가 있다면?

useRef 를 통해 접근할 수 있는것은 알게 되었다. 많은 요소를 접근하여 컨트롤하는것은 바람직하지 않지만, 상황에 따라서는 여러 요소를 조작해야할 수도 있다. 이럴 경우, ref 에 대한 접근으로 어떤식으로 처리를 해야할까?
<br />

생각해볼 수 있는 상황은 부모의 요소를 ref.current 로 관리한 뒤 자식 요소를 querySelectorAll 를 통해 관리하는 방법을 생각해볼 수 있을것이다. 이는 여러 요소들을 관리할 수 있지만, 만일 관리하는 DOM 요소가 사라지거나 변화가 생기면 이 역시 문제가 생길 수 있다.

<br />

이보다 좋은 방법은 ref 속성에 함수를 전달하는 것이다. 이를 ref callback 이라고 한다. 예시 코드를 통해 살펴보도록 하자 <br />

```jsx
import { useRef } from "react";

export default function CatFriends() {
  // 우선 useRef 를 통해 하나의 ref 를 생성한다.
  const itemsRef = useRef(null);

  // 선택된 node 에 한해 화면 가운데로 오도록 하는 scrollIntoView API 를 사용하는 함수다
  // 중요한 점은 인자로 생성되는 list image 의 id 를 받는다는 것이다.
  // 즉 인자로 전달된 id 에 해당하는 이미지 요소가 가운데로 오게 된다.
  function scrollToId(itemId) {
    // itemsRef.current 를 가져온다.
    const map = getMap();
    // 해당하는 id 에 맞는 node 를 찾는다.
    const node = map.get(itemId);
    // node 객체에 한해서 scrollIntoView API 를 적용한다.
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  // ref의 current 를 가져오는 함수다.
  // 같은 map 데이터를 공유하여 사용하여야 하기에 함수로 따로 뺀 상황
  function getMap() {
    if (!itemsRef.current) {
      // 없다면 새로운 Map을 추가해준다.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToId(0)}>Tom</button>
        <button onClick={() => scrollToId(5)}>Maru</button>
        <button onClick={() => scrollToId(9)}>Jellylorum</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat.id}
              // 이 부분이 Ref callback
              // 존재하는 node 에 한하여 set 하거나, 없다면 지워버리기
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat.id, node);
                } else {
                  map.delete(cat.id);
                }
              }}
            >
              <img src={cat.imageUrl} alt={"Cat #" + cat.id} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const catList = [];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: "https://placekitten.com/250/200?image=" + i,
  });
}
```

<br />

위 코드에서 알 수 있듯이, 데이터 catList 에 따라 동적으로 li 요소가 생성이 된다. 즉, catList 의 데이터 형식이 어떻게 되어있느냐에 따라 달라지게 되는데 이에 대응하기 위하여 ref 속성에 직접 useRef 변수를 할당하는것이 아니라, 함수를 통해 대응한다.
<br />

이 함수는 쉽게 생각하자면, ref 를 활용할 수 있을 때 실행된다고 생각해도 된다. 실제 ref 의 타입을 살펴보면 객체 뿐 아니라 콜백함수 타입도 존재함을 알 수 있는데, 더 쉽게 보자면 그냥 ref 에 전달되는 props 는 모두 함수라고 생각하자.

<br />

이러한 ref 의 특징을 제대로 활용하려면 사실 useCallback 으로 감싸주는것이 좋다. 실행 시점을 컨트롤해줄 수 있기 때문이기도 하다. 예시 코드로 보는게 더 좋겠다.

<br />

```jsx

<input ref={(node) => {
  if(node){
    node.focus()
  }
}}>


```

<br />

위와 같은 내부 함수는 리엑트가 렌더링 될 때마다 렌더링 이후 node 가 확인이 되면 실행이 된다. 즉 렌더링 될 때마다 포커스가 되는데, 만일 초기 렌더링 이후 포커스가 될 필요가 없다고 가정하면 useCallback 을 통해 해결해 줄 수 있다.

<br />

```jsx

const focusRef = useCallback((node) => {
  if(node){
    node.focus()
  }
},[])

// ...

<input ref={focusRef} />


```

<br />

위처럼 하여 불필요한 함수 생성을 방지할 수 있다. 또한, 이를 활용하면 위 focusRef 함수에 state 를 변경시키는 로직을 사용할 수 있는데, 이렇게 하면 불필요한 useEffect 의 사용을 피할 수 있다.

## 한 컴포넌트에서 또 다른 함수 컴포넌트 내 DOM 요소에 접근하려면

지금까지는 input, div, button 등 현재 함수 컴포넌트를 기준으로 기본 Element 대상으로의 ref 접근을 다루었다. <br />

상황에 따라서는 다른 컴포넌트에서 렌더링하는 DOM 요소에 접근하여 조작을 해야할 때가 있다. 왜냐하면 보통 컴포넌트 단위로 분리하여 재사용하는 디자인 패턴을 리엑트에서 자주 사용하게 되고, 그러다보면 서로의 상호작용 속에서 컴포넌트를 오가면서 DOM 요소에 접근을 해야할 수 있다. <br />

React 에서는 기본적으로 이를 금지하고 있다. 무분혈한 접근이 될 수 있고, 이는 곧 웹사이트의 작동 오류로 이어질 수 있기 때문이다. 엉뚱한 곳에서 요소 삭제라도 해버린다면 이 요소와 관련되어진 모든 상태변화 로직이 다 박살이 난다! (이렇기에 공식문서에서는 ref 접근을 되도록이면 render 과정과 관련이 없는 요소로 한정하라고 하고 있다.) <br />

그래도 분명 필요할 때가 많기 떄문에 React 는 접근하고자 하는 컴포넌트에서 마치 '내가 랜더링하는 요소에 접근을 허락해줄꼐' 라는 의미를 보여주는 고차함수 forwardRef 를 제공한다. <br />

```jsx
const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});
```

<br />

두번째 인자로는 ref 가 전달되며, 이를 통해 요소에 ref 를 전달하여, 다른 컴포넌트에 input 에 접근할 수 있게 된다. <br />

허가해주는 컴포넌트 입장에서, 다른 컴포넌트가 필요 이상으로 요소를 조작하는것을 원하지 않을 수 있다. 이에 useImperativeHandle 훅을 통해 제한된 기능만을 사용할 수 있도록 조정해줄 수 있다. <br />

```jsx
const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    // 오직 focus 만 접근하여 사용할 수 있다.
    // 나머지 API 는 사용할 수 없다.
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input {...props} ref={realInputRef} />;
});
```

## 아직도 모르는 부분이 많아 보인다

습관처럼 render 여부와 관계없는 데이터를 저장할 때 사용하였던 useRef 였지만, 이번 기회에 왜 많은 개발자들이 useRef 를 빈번하고 중요하게 사용하는지 알게 되었다. 실제 프로젝트를 하다 보니 forwardRef 에 대한 타입을 지정하는경우나, 여러 ref 를 한꺼번에 전달해야하는 경우 등이 존재하였고 이에 대한 타입을 지정하는 문제도 있었다. 그 과정에서 ref callback 이 활용되었었고 이에 대한 궁금증으로부터 공식문서에 대한 공부가 시작되었다. <br />

여러 입력창이나 버튼을 다루는 웹 페이지 특성상 DOM 요소에 접근하여 처리해야할 사항들은 많을 것이다. 실습을 통해서 이를 꾸준히 연습해나가야 겠다.
