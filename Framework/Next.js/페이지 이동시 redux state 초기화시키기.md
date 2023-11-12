## resetting state after navigation

<p>프로젝트 구현을 진행하다가, 메뉴바에서 페이지를 navigate 시킬 때, redux 의 상태값이 초기화 되지 않는다는 점에서 클릭했던 메뉴바가 그대로 활성화된 상태로 유지된다는 점에서 문제점이 발생하였다. 이것 역시 문제이지만, 전역스타일에서 body 부분에 sidebar menu 가 활성화 될 시 스크롤을 없에는 overflow: hidden 을 적용시켰기 때문에 이 상태 역시 페이지가 이동해도 그대로 유지된다는 문제점이 덩달아 발생하였다. 이를 해결하기 위해서 공식문서에서 제안하는 방식을 따라서 해보자</p>

```js
// pages/[slug].js
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Page(props) {
  const router = useRouter();
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Page: {router.query.slug}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <Link href='/one'>one</Link> <Link href='/two'>two</Link>
    </div>
  );
}
```

<p>위의 예시는 실제로 공식문서에서 상태값이 그대로 변하지 않는 상황을 예시로 보여주는 코드이다. 실제로 원하는데로 구현하는 것이라면 count를 버튼으로 증가시키되, 링크를 통해 one 에서 two 로 이동하게 되면 혹은 그 반대일 경우 자연스럽게 상태값이 초기화가 되도록 하여야 한다. 하지만 실제는 초기화가 되지 않는다.</p><br />

<p>Next.js에서 같은 페이지로 이동할 때 부모 구성 요소가 변경되지 않는 한 반응이 마운트 해제되지 않기 때문에 페이지의 상태는 기본적으로 재설정되지 않는다.</p><br />

<p>그리고 이에 대한 해결책으로 useEffect 를 활용하라 제안한다. useEffect 를 통해 params 의 변동이 생길 시 상태값을 초기화 하도록 설정할 수 있다.</p>

```js
// pages/[slug].js
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Page(props) {
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [router.query.slug]);

  return (
    <div>
      <h1>Page: {router.query.slug}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <Link href='/one'>one</Link> <Link href='/two'>two</Link>
    </div>
  );
}
```

- 이 왜에도 컴포넌트에 key 값을 router.asPath 를 넘겨주는 방식으로 처리할 수도 있다. key 값이 변경되기 때문에 react 는 다시 컴포넌트를 mount 하게 된다.

<p>다만 내 경우에는 이를 응용할 순 있었어도 그대로 작용하기에는 무리가 있었다. 우선적으로 다른 페이지로의 전환이 되는 상황에서 redux 의 상태값이 유지되는 문제였기 때문이다. hydrate를 진행시키기 위해 각 페이지마다 ssr 을 설정해주면 자연스럽게 초기화가 진행이 되었지만, 현재는 그런 상황이 아니었기에, 페이지 이동 후 컴포넌트가 실행이 될 때 기존 redux 의 상태값을 따로 업데이트 시켜주어야 했다. 따라서 이번에는 그냥 useEffect 를 활용해서 redux 에 dispatch 를 보내서 간단하게 해결은 했다. 다만 방법이 이게 최선인가 하는 의문점은 계속 든다.</p>

```js
// page/add.tsx

useEffect(() => {
  dispatch({ type: RESET_PHONE_CLICK });
}, []);
```

- 사실 이 아이디어는 그렇게 선호하는 아이디어가 아니었지만, 지금 지식으로는 일단 이렇게 처리해야겠다고 판단했다.
