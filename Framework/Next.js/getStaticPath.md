### getStaticPath

<p>다이나믹 라우팅을 활용할 때 getStaticProps 를 사용하기 위해서 getStaticPath 가 필요하다.</p>

```js
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: false,
  };
}
```

<p>paths 에는 미리 빌드하고자 하는 페이지의 id 를 넣어준다. 만약 넣어주지 않은 id 를 가진 페이지에 접근하면 에러가 뜬다. 그렇다면 방법으로서 모든 페이지 리스트를 다 가져와서 넣어주는 방식은 있다.</p>

```js
export async function getStaticPaths() {
  const result = await axios.get("/post/list");
  return {
    paths: [
      // result 의 리스트 아이디 넣어주기
    ],
    fallback: false,
  };
}
```

<p>다만 이렇게 하면 크게 의미가 없는것이, 수많은 페이지를 전체 다 가져온다는게 말이 안되기도 하기에, 만약 사용한다면 좀 규모가 작은 블로그 같은 경우는 가능하다고 할 수 있겠다.</p><br>
<p>fallback 을 true 로 하게 되면 위에서 에러가 발생하였었던 부분에 있어서 CSR 로 변경하여 적용하도록 할 수 있다. 즉 id : 4 를 path 에 넣어주지 않았지만, 이를 파악하여 서버에 요청하여 4 페이지를 가져오게 할 수 있다. 이렇게 되면 기존 리엑트의 방식대로 되기 때문에, 조건부 렌더링을 걸어주어야 한다.</p>

```js
const Post() = {

  if(router.isFallback){
    return <div>로딩중</div>
  }

  return (...)

  export async function getStaticPaths(){
  const result = await axios.get('/post/list');
  return {
    paths : [ // result 의 리스트 아이디 넣어주기
    ],
    fallback: true,
  }
}

}

```
