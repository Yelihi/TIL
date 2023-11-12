## Routing

<p>next.js 에서 routing 은 file-system 기반이다. 즉 파일을 생성함과 동시에 routing 설정도 된다. pages 라는 폴더 내에 있는 컴포넌트들은 그 파일 구조대로 url 주소를 가지게 된다. 당연하게도 파일 구조를 nested 하게 설정하게 되면 url 역시 그렇게 설정이 된다.</p><br />

```
src/pages/product/first-item
src/pages/product/my/second-user
```

<p>그 다음 slug 기능이 있는데, 예를 들어서 어떤 details 페이지에 각 상품마다 고유 id 를 url 에 표현해주어야 한다면, 이때 slug 를 활용할 수 있다. 파일 이름을 [id].js 와 같이 설정을 해주면 된다. [...slug] 도 있는데, details/2022/22 와 같이 deps 가 2개이상일 때 사용할 수 있다. 파일은 [...slug].js 형식으로 작성하면 된다.</p><br />

## dynamic routing

<p>위에서 slug 를 통해 slug 값에 따른 페이지를 받아올 수 있다고 했는데, 만약 details/1 과 details/2 가 같은 페이지를 보여준다면 아무런 의미가 없을 것이다. 이를 해결하기 위해 dynamic routing 설정을 해줄 수 있다.</p><br />

```js
import { useRouter } from "next/router";

export default function CategoriId() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div>Catogori Id: {id}</div>
    </>
  );
}
```

- 위와 같이 query 로 있는 id 값을 활용할 수 있다.
- 즉, details/1, details/2, details/3 ... 에서의 1,2,3 을 활용할 수 있고, 이를 통해서 서버에 id 에 맞는 데이터를 요청할 수 있다.
- 만일 쿼리가 /categori/food?from=event 와 같다면 어떻게 가져올 수 있을까

```js
import { useRouter } from "next/router";

export default function CategoriId() {
  const router = useRouter();
  const { id, from } = router.query;

  return (
    <>
      <div>
        Catogori: {id} from: {from}
      </div>
    </>
  );
}
```

- 이렇게 쿼리문에 대해서는 구조분해로 각각을 가져올 수 있다.
- 또한 [username]/[info] 처럼 2개의 slug 역시 가져올 수 있다.

```js
import { useRouter } from 'next/router'

export default function UsernameInfo(){
  const router = useRouter();
  const { username, info } = router.query;

  return (...)
}

```

- 다중 slug 같은 경우([...slug]) 배열로 받아오게 된다.

```js
// cart/2022/06/25
import { useRouter } from "next/router";

export default function CategoriSlug() {
  const router = useRouter();
  const { date } = router.query;

  return (
    <h1>Cart Date Slug {JSON.stringify(date)}</h1> // Cart Date Slug ["2022","06","25"]
  );
}
```

<p>참고로 뒤 쿼리문이 없어도 페이지가 나타나게 하고 싶다면, 파일을 생성할 때 [[username]].js 로서 만들어주면 된다.</p><br />

<p>또 알아두어야 할 것이 있는데, 페이지를 리로드 하는 방식이다. 3가지정도로 표현될 수 있는데, 각각 특성이 있다.</p><br />

- location.replace('url'): 로컬 state 유지 안됨(리렌더)
- router.push(url): 로컬 state 유지 / data fetching 일어남
- router.push(url, as, { shallow: true }): 로컬 state 유지 / data fetching 안 일어남
- 다만 url 이 변경되면 뭐가 되었던 data fetching 이 일어난다. 즉 동일한 url 에서 query 만 변경될 때 data fetching 을 shallow 으로 조절할 수 있다.
