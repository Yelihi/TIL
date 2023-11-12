## Next.js Layout

<p>기본적으로 next.js 는 Layout 을 제공한다. Layout 은 컴포넌트로 생성하며, 그렇기에 페이지에서만 가능한 SSG 나 SSR 은 불가능하다. Layout 은 주로 _app.js 와 연동이 된다. _app.js 는 전체 페이지를 컨트롤할 수 있는 페이지라고 생각하면 된다.(next.js에서 자동으로 제공)</p><br />

```jsx
export default const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps}>
    </Layout>
  )
}

```

<p>이렇게 미리 생성한 커스텀 레이아웃 컴포넌트를 나머지 페이지에 적용시켜줄 수 있다. 하지만 상황에 따라서는 페이지마다 다른 레이아웃을 적용시키고 싶은 경우가 있다. 예를 들어서 로그인 페이지에서는 아무런 레이아웃을 적용하지 않다가, 메인 페이지로 이동하게 될 경우 레이아웃을 적용시키고 싶다고 하면, 위 처럼 단일 Layout 으로는 한계가 있다. 이럴때를 위해 next.js 는 getLayout 이라는 메서드를 사용할 수 있도록 하고 있다.</p><br />

```js
const UserLogin = () => {
  const [gotoAccount, setGotoAccount] = useState < boolean > false;

  const toggleGotoAccount = () => {
    setGotoAccount((prev) => !prev);
  };

  return (
    <Container>
      <Section>
        {gotoAccount ? (
          <Signup toggleGotoAccount={toggleGotoAccount} />
        ) : (
          <Login toggleGotoAccount={toggleGotoAccount} />
        )}
        <ImageBox>
          <Image
            alt='todo'
            src={todoImage}
            width={500}
            height={500}
            placeholder='blur'
          />
        </ImageBox>
      </Section>
    </Container>
  );
};

UserLogin.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
```

<p>밑 userLogin.getLayout 을 살펴보도록 하자. AuthLayout 은 따로 생성해주었고, 사실 이 부분에 기존 Layout 을 첨가하여도 관계는 없다. 어차피 _app.js 에서 getLayout 의 return 값에 맞게 설정해주면 되기 때문이다. 사실 이 패턴은 몽키패칭 같기도 하다. 여하튼 페이지마다 각기 다른 레이아웃을 설정해줄 수 있다.</p><br />

```js
export default const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page) // 이 부분은 마음대로 설정해도 된다.
  return (
    <Layout>
      {getLayout(<Component {...pageProps}>)}
    </Layout>
  )
}

```

<p>다시 _app.js 에 들어가서 getLayout 을 생성해주고, 조건식으로서 만일 어떠한 페이지에 getLayout 이 적용되어있다면 이에 맞는 레이아웃을 적용하고, 아니라면 (page) => (page) 로 적용하겠다는 의미이다.</p>
