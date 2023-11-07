## SWR

<p>SWR 은 데이터를 가져오기 위한 React Hook이다. 특이점이라면 가져오는 데이터를 캐시화 시킨 후, 서버로부터 데이터를 요청할 때마다 캐시화 된 데이터와의 비교를 통해 가장 최신화된 데이터를 가져오는 전략을 취하게 된다. 이 말은 이전에 캐시화 된 데이터가 현재 최신 데이터와 일치한다면 기존 캐시데이터를 그대로 활용하는 전략이라고 할 수 있겠다. 기본적으로 사용하는 방법은 아래와 같다</p>

```js
import useSWR from "swr";

// fetcher 에 대한 예시이다. fetch, graphQL 등 원하는것으로 구성해도 된다.
const fetcher = (url) => axios.get(url).then((result) => result.data);

function Profile() {
  const { data, error, isLoading } = useSWR("/api/user", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

- 위 useSWR 훅은 key 문자열과 fetcher 함수를 가지게된다. key 는 일반적으로 API 주소로 사용하게 되며, 유일성을 가지는 고유한 식별자라 판단할 수 있다.
- 이 훅을 통해 두 반환값 data, error 를 통해서 좀 더 효율적으로 데이터를 가져올 수 있다.
- 이전까지 redux-saga 를 통해서 데이터를 처리할 때, 좀 간단한 부분에 관해서는 swr 로 대체가 가능할 것이라 생각이 든다.
- 시작은 설치부터 들어가보면

```
npm install swr
```

- swr 의 장점 중 하나는, 받아온 데이터를 좀 더 쉽게 재사용하는 것이 가능하며, 데이터의 검증을 통해 기존에 캐싱된 데이터를 그대로 활용하는 것이다.
- 이렇기 때문에 여러 컴포넌트에서 uswSWR 을 실행하더라도, 고유한 키(API)가 동일하다면 처음 한번만 데이터를 받아올 때 통신이 진행되고, 다음 컴포넌트부터는 캐싱된 데이터를 활용하게 된다.

```js
// useUser 라는 재사용 훅을 만들어 여러 컴포넌트에 활용할 수 있다.
function useUser(id) {
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
```

```js
function Avatar({ id }) {
  const { user, isLoading, isError } = useUser(id);

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;
  return <img src={user.avatar} />;
}
```

- redux 와 마찬가지로 기존 useEffect 를 통해 데이터를 가져오고, 이를 props 로 전달하는 방식에서 벗어난다.

```js
// 페이지 컴포넌트

function Page() {
  return (
    <div>
      <Navbar />
      <Content />
    </div>
  );
}

// 자식 컴포넌트

function Navbar() {
  return (
    <div>
      ...
      <Avatar />
    </div>
  );
}

function Content() {
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  return <h1>Welcome back, {user.name}</h1>;
}

function Avatar() {
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  return <img src={user.avatar} alt={user.name} />;
}
```

- 개인적인 공부지식과 조금 부딛치는 부분이 있었는데, 페이지가 아닌 컴포넌트에는 서버 데이터 요청을 자제하거나 하지 않는것을 선호하도록 설계하라고 배운적이 있다.
- 다만 swr 로 컴포넌트에 useUser 를 사용할 시 컴포넌트에서 서버에 데이터를 요청하는 경우가 발생한다. (그렇게 이해하고 있다.)
- 다행인 것은 Content 나 Avatar 나 모두 동일한 SWR key 를 사용하기에, 그 요청이 자동적으로 중복 제거, 캐시, 공유되기에 단 한번의 요청만 API 로 전송이 된다.
- 여튼 SWR 의 장점은 부모 컴포넌트는 데이터의 흐름을 알 필요가 없고, 자식 컴포넌트를 위해 부모 컴포넌트에 데이터를 받아올 필요가 없이 랜더링만 하면 된다.
  <br />

<strong>API</strong>

```js
const { data, error, isLoading, isValidating, mutate } = useSWR(key, fetcher, options);
```

- key : 요청을 위한 고유한 키 문자열
- fetcher : 데이터를 가져오기 위한 함수를 반환하는 Promise
- Option : SWR hook을 위한 옵션 객체
- data : fetcher가 이행한 주어진 키에 대한 데이터(로드 안되면 undefined)
- error : fetcher가 던진 에러(또는 undefined)
- isLoading : 진행중인 요청이 있고, 로드된 데이터가 없는 경우.
- isValidating : 요청이나 갱신 로딩의 여부
- mutate(data?, options?) : 캐시된 데이터를 뮤테이트하기 위한 함수
  <br />

<strong>SWRconfig(전역설정)</strong>

- 사용할 SWR hook 에 대해 전역 설정을 해줄 수 있다.
- 예를 들자면 모든 훅에 동일한 fetcher 를 사용하게 하거나, 갱신 인터벌을 설정해줄 수 있다.

```js
import useSWR, { SWRConfig } from "swr";

function Dashboard() {
  const { data: events } = useSWR("/api/events");
  const { data: projects } = useSWR("/api/projects");
  const { data: user } = useSWR("/api/user", { refreshInterval: 0 }); // 오버라이드

  // ...
}

function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Dashboard />
    </SWRConfig>
  );
}
```

- 위 예시에서 알 수 있듯이, Dashboard 에서 사용하는 모든 hook 에 관하여 동일한 fetcher 와 3초 갱신을 설정해주고 있다.
- SWRConfig 는 중첩으로 사용이 가능하고, value 에 선택적으로 provider 함수도 받을 수 있다. 이 부분은 캐시와 관련이 있는데, 추후에 좀 더 공부하려....
  <br />

<strong>에러 재시도</strong>

- SWR 은 에러 발생 시 내부 알고리즘을 활용하여 요청을 재시도한다. 사용자가 오버라이드 할 수 있다.

```js
useSWR("/api/user", fetcher, {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // 404에서 재시도 안함
    if (error.status === 404) return;

    // 특정 키에 대해 재시도 안함
    if (key === "/api/user") return;

    // 10번까지만 재시도함
    if (retryCount >= 10) return;

    // 5초 후에 재시도
    setTimeout(() => revalidate({ retryCount }), 5000);
  },
});
```

- 이외 뮤테이션 및 프리패칭, 캐시 에 관해서는 추후 다시 공부 예정
- [SWR](https://swr.vercel.app/ko/docs/getting-started)
  <br />