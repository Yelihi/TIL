## getServerSideProps 내 cookie 설정을 기존 axios 대신 fetch 로 해보기

next.js 에서 자체 제공하는 서버는 2가지 환경 중 하나를 선택할 수 있는데, nodejs 와 edge 환경을 선택할 수 있다. 사실 next.js 내 middleware 의 경우 node 환경이 아니라 edge 환경이라는 점을 한번 들어봤었던 적은 있다. <br />

공식 문서에서는 다음과 같이 설명하고 있다. <br />

<strong>Our Edge Network is both a Content Delivery Network (CDN) and a globally distributed platform for running compute at the edge.</strong><br />
(엣지 네트워크는 CDN이자 edge 내 실행을 위한 분산 플렛폼)
<br />

그리고 만일 vercel 로 배포를 한다면, 이미 edge network 를 사용하게 된다. 즉, 환경만 교체해준다면 언제든 nodejs 와 edge 환경을 옮겨다닐 수 있는것이다. 이 외 자세한 설명은 공식 문서를 참고하는게 좋겠고 추후에 한번 더 정리를 해볼 예정이다.<br />
[https://vercel.com/docs/edge-network/overview](https://vercel.com/docs/edge-network/overview)
<br />

### edge runtime

vercel 은 기본적으로 다수의 runtime 환경을 제공하고 있다. 각각의 runtime 환경은 이에 맞는 api, 라이브러리 등을 소유하고 있으며 그렇기에 각각의 runtime 마다 장단점이 존재한다. 잘 파악해서 본인의 프로젝트에 적합한 runtime 을 설정하는것이 좋을것이다. <br />

총 5가지의 runtime 을 제공하며 각각 node.js, edge, go, python, Ruby 이다.
<br />

runtime 은 우리가 작성한 코드를 함수로 변경하는데, 보통 serverless function(nodejs, go, python, ruby) 와 edge function(edge) 로 구별되게 된다. 즉, serverless function 은 모든 node.js API 에 접근할 수 있다는 의미이며, 이와 대조적으로 edge function 은 Node.js 도 browser 도 아닌지라 2가지 모든 API 에 접근할 수는 없지만, 필수 하위 API 집합(web API)과 몇몇 node API 에 접근할 수 있다. <br />

더 적은 기능을 가지게 된것이 아닌가 할 수 있지만, 실제 어플리케이션에서 모든 API 가 사용되는것도 아니고, 이를 다르게 말하자면 edge function 의 리소스가 serverless function 보다 훨씬 작다는 것을 의미한다. 이 부분이 cold start 부분의 해결책이 된다. <br />

cold start 의 경우 초기 serverless function 을 호출할 때 이에 함수가 초기화되며 메모리에서 로드되는데 까지의 시간을 의미한다. 즉, 계속 호출이 없다가 갑자기 호출을 하게 되는 경우 마치 예열이 안되있다 라는 느낌으로 cold start 를 이해하면 될 것이다. <br />

이러한 cold start 는 사용자에게 불쾌한 경험을 선사하고, 그렇기에 일정텀으로 계속 labmda(serverless function) 을 호출하여 warm 상태를 유지하는 방법부터 많은 개발자들이 이러한 부분을 해결하기 위해 노력해왔다. <br />

- 첫 로드되는 모듈 용량을 최소화한다
- serverless function 을 어플리케이션(서버 및 db) 와 가장 근접한 지역에서 호출할 수 있도록 한다
- cache 기능 중 하나인 state-while-revalidate 를 활용한다
  <br />

위와 같은 부분을 잘 고려하여 최적화 시키는것도 중요하고, edge function 의 경우 리소스 자체가 작다보니 초기 호출 속도가 훨씬 빠르게 된다. 그렇기에 edge function 은 cold start 에 있어 굉장한 메리트가 있다.

### 헌데 환경을 변경하니 axios 내 오류가 발생한다

느린 cold start 문제를 프로젝트를 진행하는 동안 계속 겪고 있어, 급한 마음에 vercel 배포와 더불어 runtime 을 edge 로 변경해주었다. <br />

```tsx

export default function Store(){ ... }

// 그냥 edge 를 하려니 아래처럼 실험용으로 하라고 에러 발생
export const config = {
  runtime: 'experimental-edge'
}

export const getServersideProps = async (context: getServerSidePropsContext) => { ... }

```

<br />

허나 이렇게 변경하니 서버 에러가 발생하면서 정상 작동하지 않았다. 공식 문서 내 설정을 그대로 따른것임에도 이런 문제가 발생하였기에 여러가지 실험을 해서 파악했어야 했다.
<br />

issue 검색도 계속 하면서, 몇가지 실험을 해봤을 때 주의할 점이자 문제가 되는 부분이 이었는데, <br />

- axois 를 사용할 시 adaptor 에러가 발생
- context.res 객체에는 접근하짐 못함
- cookie 를 통한 인증 절차인데, axios 를 사용할 수 없으니 fetch 로 대신하여 headers 에 cookie 를 직접 담아주어야 했다

<br />

우선 axios 를 edge runtime 에서는 사용할 수 없었는데, 이는 라이브러리 내 문제로 파악이 된다. 지금까지 axios 를 기반으로 default base 라던지 default credential 등 여러가지 설정을 전부 fetch 설정으로 변경해주었어야 했다. <br />

문제는 gssp 내 쿠키에 접근하는 방법은 context.req.headers.cookie 이며 값의 타입은 string 이었다. 반면 fetch 내 headers 가 요구하는 Type은 HeadersInit 타입이었기에 서로 충돌이 발생하게 되었다. (쿠키를 headers 에 같이 전달하여 요청을 보냈을 때는 인증이 통과되었다) <br />

계속 조사를 하다 타입에 맞게 cookie 를 headers 에 첨부하는 방법을 알게 되었는데, 내장 Headers 인스턴스를 활용하는 방법이었다. 이를 토대로 기존 gssp 를 수정해보면, <br />

```tsx
export const config = {
  runtime: "experimental-edge",
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    // 요청 헤더 내 cookie 가 존재하는지부터 확인을 한다.
    const cookie = context.req ? context.req.headers.cookie : "";
    // 헤더 인스턴스를 할당한다
    const customHeaders = new Headers();
    // 매번 요청마다 cookie 설정을 초기화 해주어야 한다.
    customHeaders.append("cookie", "");
    // 만일 cookie 가 존재한다면 헤더에 추가한다.
    if (context.req && cookie) {
      customHeaders.append("cookie", cookie);
    }

    // 이렇게 설정이 마무리된 headers 를 fetch 함수 내 적용시킨다. 이렇게 하면 타입 오류가 사라진다.
    const respone = await fetch(`${baseURL}/user`, {
      method: "GET",
      credentials: "include",
      headers: customHeaders,
    });
    const data = await respone.json();

    // 문제는 saga 였는데, 기존 axios 의 경우 axios.default 를 통해 cooike 를 설정할 수 있었다.
    // 그렇기에 dispatch 를 통한 API 호출 시 이미 cookie 설정이 마무리 되어있어고 그렇기에 로그인 유저로서 데이터를 가져올 수 있었다.
    // 허나 fetch 를 사용하게 되니 당장 saga 내 api 함수를 작성하는데 애매하게 되었다
    // 일단 한가지 해결책으로 saga 를 통해 분기처리르 하는게 아니라 swr 이나 react-query 를 통해 분기처리를 하면서 여기선 실제 성공 dispatch 를 전달하는데 집중하도록 하였다.
    store.dispatch({
      // store에서 dispatch 하는 api
      type: t.LOAD_TO_MY_INFO_SUCCESE,
      data: data,
    });

    store.dispatch(END);
    // 사가를 사용하지 않게 되니 의미가 없어진다.
    await (store as SagaStore).sagaTask?.toPromise();

    return {
      props: {},
    };
  }
);
```

<br />

edge runtime 으로 변경하는게 생각보다 조건이 많다는것을 알게되는 경험이었다. 또한 아직 발견하지 못한 문제가 발생할 수 있기에, 당분간은 실험만 계속하고 prod 에 적용시키진 않을 생각이다.
