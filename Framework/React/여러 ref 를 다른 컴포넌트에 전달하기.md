## 다중의 ref 를 다른 컴포넌트에게 전달하기

프로젝트를 진행하다보니, 2개의 button 에 ref 를 전달해야 하는 상황이 발생하였다. 생각해보면 2개의 button 을 넘어서 더 다수의 ref 를 전달해야하는 상황이라면, 어떤식으로 접근을 해야할지 고민이 되었다. <br />

다만 이전 공식문서를 통해 ref 를 학습할 시, 특정되지 않는 요소들에게 ref 를 전달하는 방식으로 ref callback 을 활용할 수 있다고 알고 있었다. useRef 를 통한 ref.current 값은 무엇이 들어와도 관계가 없으니, 배열이나 객체를 넘겨주어도 괜찮지 않을까 생각했다. <br />

## 프로젝트 코드

Closet 의 admin page 를 구현하는 과정에서 데스크탑일때와 모바일일 때 각각 button의 위치가 상단에서 하단으로 변경되도록 설정하였다. 이 과정에서 페이지의 레이아웃 상 하나의 button 그룹으로 기기에 따른 위치 설정을 하기에는 resize 이벤트 등록이 필요하였고, width의 변화에 따른 조건 체크과정은 꼭 필요한 경우가 아니라면 하고싶지 않아 다른 방법을 생각했었다. <br />

애초에 미디어쿼리만을 통해 해결하고 싶었고, 방법은 데스크탑일때 보여줄 버튼, 그리고 모바일 환경에서 보여줄 버튼을 설정해주면 된다고 판단했다. (hidden 활용) <br />

실제 변경된 개인 프로필 정보를 submit 하는것은 AdminForm 컴포넌트에서 이루어지는 것이였고, 시각적으로 보이는 button 을 클릭할 시, AdminForm 내부의 hidden 으로 감춰진 input submit 를 조작하는 방법이라면 해결할 수 있겠다 생각했다. <br />

```tsx
const Administration = () => {
  // 생략
  const refObj = useRef<RefObjType>({
    childSaveButtonRef: null,
    childCencelButtonRef: null,
  });

  return (
    //...
    // 데스크탑 환경에서 보여진다.
    <TopButtonBox>
      <ProfilePatchButtons refObj={refObj} />
    </TopButtonBox>

    // ..
    // 실제 수정사항을 업데이트 하는 Form
    <MainSection>
      <ProfileForm ref={refObj} />
    </MainSection>

    // ..

    // 모바일 환경에서 보여진다.
    <BottomButtonBox>
      <ProfilePatchButtons refObj={refObj} />
    </BottomButtonBox>

  )
}

// ProfileForm

const ProfileForm = React.forwardRef<RefObjType>((_, ref) => {
  // 많은 부분 생략

  const { current } = ref as React.MutableRefObject<RefObjType>;

  return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <button ref={el => (current.childSaveButtonRef = el)} type='submit' name='submit' hidden />
        <button ref={el => (current.childCencelButtonRef = el)} type='button' name='cencel' hidden onClick={onCencel} />

      </Form>
  );
});

// ProfileButton

const ProfilePatchButtons = ({ refObj }: ProfilePatchButtons) => {
  // 하나의 함수로 하려고 했지만 ref 가 작동하지 않았다
  // Form 내의 input 에 접근한다.
  const onRefSaveButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (refObj.current.childSaveButtonRef) {
      refObj.current.childSaveButtonRef.click();
    }
  };

  // Form 내의 input 에 접근한다.
  const onRefCencelButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (refObj.current.childCencelButtonRef) {
      refObj.current.childCencelButtonRef.click();
    }
  };

  return (
    // 생략
  )
}


```

<br />

코드가 길긴한데 아이디어는 간단하다. ref 를 객체로서 전달하는 것이다. <br />

```tsx
type RefObjType = {
  childSaveButtonRef: HTMLButtonElement | null;
  childCencelButtonRef: HTMLButtonElement | null;
};

const refObj = useRef<RefObjType>({
  childSaveButtonRef: null,
  childCencelButtonRef: null,
});
```

<br />

current 값에는 무엇이 들어가도 관계가 없기에 객체를 통해 ref 값을 전달하여, 각 button 에 맞게 ref.current 객체 속 childSaveButtonRef, childCancelButtonRef 를 프로퍼티로 접근하여 DOM 요소에 전달해준다.
<br />

하지만 아래처럼 전달하려고 하면 type 오류가 발생한다. <br />

```tsx
// 타입 단언을 해주어서 current 를 구조분해로 가져온다.
const { current } = ref as React.MutableRefObject<RefObjType>;

// 아래와 같이 전달하는것이 이치에 맞아보이나 type 에러가 발생한다.
<button ref={current.childSaveButtonRef} type='submit' name='submit' hidden />;
```

<br />

**HTMLInputElement | null 형식은 LegacyRef<HTMLInputElement> | undefined 형식에 할당할 수 없습니다**

<br />

자세한 이유를 확인하기 어려웠으나, 예상컨데 ref 의 타입상 current 로 구조분해를 하여 넘겨주는 과정에서 문제가 생겨난 것 같다. (원래같으면 그냥 ref 를 전달한다) <br />

해결 방법은 ref callback 을 활용하여 현재 접근하고자 하는 DOM 요소의 실제 Element type 을 가진 인자에 접근하는 방식이다. <br />

```tsx
// 여기서 node는 말 그대로 buttonElement 이다.
// callback ref 를 통해 동적으로 요소에 접근할 수 있다
// 여기서는 current.childSaveButtonRef 의 타입과 일치하는 node 를 활용했다.
<button
  ref={(node) => (current.childSaveButtonRef = node)}
  type='submit'
  name='submit'
  hidden
/>
```

<br />

이를 통해 성공적으로 여러 ref 를 다른 컴포넌트에 전달할 수 있었다. 주의할점은 객체로 ref 를 전달할 때는 전달 객체 내부에 또다른 useRef 가 들어가지 않도록 하자. forwardRef 가 전달받는 ref 의 type 에 맞춰야 하기 때문이다.
