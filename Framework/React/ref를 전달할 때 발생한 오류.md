## ref 를 전달할 때 발생했던 오류사항. (속성값을 ref 로 하였을때)

> **Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()**

<br /><br />

test 코드를 작성하고, 실제 test 를 돌려봤을 때, 위처럼 경고 문구가 나왔다. ref 의 전달과 관련된 경고같은데, 생각보다 경고창이 길어서 무시하기 힘들어지기 시작했다. 그래서 한번 요구사항을 맞춰보자고 생각했다. 일단 문장 그대로 함수형 컴포넌트는 ref 를 전달할 수 없다는 경고창이다. <br /><br />

### React 에서의 ref 와 forwardRef

우리는 js 를 통해 Dom node 에 접근할 수 있음을 알고 있다. 적절한 API 사용을 통해 dom 객체에 바인딩 하여 여러 조작을 하게 된다. React 에서는 ref 를 통해서 기본적으로 해당 변수의 Dom 객체에 접근이 가능하다. 여기에 더해 react 에서 ref 는 reactivity 라는 측면에서 state 와 차이점을 가지는데, 즉 값의 변경이 react 의 렌더링을 트리거 하지 않는다는 점에서 state 와 차이점이 있다.<br />

사실 이러한 점 때문에 간혹 렌더 트리거를 하지 않으면서 변경된 값을 유지하고 싶을 때 useRef 를 사용하곤 한다. (DOM 의 접근이 아니더라도 ref.current 를 활용) <br />

우리가 ref 의 값을 참조하는 경우는 실제 렌더링이 이루어진 다음 참조하고자 하는 DOM 객체가 존재할 때 이다. 즉, 렌더링 이후에 실행되는 componentDidMount 나 useEffect 에서 주로 ref 참조를 조회하는것이 안전하다. 또한 렌더링 전후 같은 상태를 유지하는 state 와 달리 ref 는 state 에 따라 값의 존재 여부가 결정날 수 있다. (이러한 특징 때문에 ref.current(현재) 라는 네이밍을 사용한다고 생각하자) <br />

```js
function refState() {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // isOpen 값에 따라 값이 결정됨.
    console.log(ref.current?.textContent ?? "x");
  }, []);

  return (
    <div>
      {isOpen && <span ref={ref}>state에 따라 조건부로 존재하는 ref</span>}
      <span>Mount 후에는 항상 존재하는 Element</span>
    </div>
  );
}
```

- 위 처럼 상태값 isOpen 은 렌더링 전후 그대로 존재하며, element 역시 마운트 이후 그대로이지만, state 인 isOpen 에 따라 span의 렌더링 여부가 결정이 되고, 이로 인해 이의 참조값인 ref.current 는 존재할수도, 존재하지 않을 수도 있다.
  <br />

보통 ref 는 createRef 를 통해 생성되는 객체이며, 함수형 컴포넌트의 경우 매 렌더링마다 ref 객체를 재 생성하진 말아야 하니, 렌더링 마다 기존 ref 를 참조해야했고 이를 위한 hook 이 useRef 이다.

### ref 를 활용해보기

ref 값이 reactivity 를 가지지 않는다는 점을 활용 하여 컴포넌트가 마운트 되었는지 확인할 수 있는 훅을 만들 수 있다. <br />

```jsx
function useMount() {
  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
    }
  }, []);

  return { isMount: ref.current };
}
```

- useEffect 를 통해 한번 실행이 되기에 마운트 시점을 알려준다. 다만 strict 모드에서는 useEffect가 2번 실행되니 주의하자.
  <br /><br />

또한 만약 부모 컴포넌트에서 자식 컴포넌트의 객체를 참조하고 싶다면 어떻게 해야할까? props 로 ref 를 넘겨줄 수 있으면 좋겠지만, React 에서는 이를 용인하지 않는다. 자식 컴포넌트의 객체에 바인딩 하기 위해서 react 에서는 forwardRef 를 제공한다. 사용법은 아래와 같다. <br />

```jsx
// 두번째 파라미터로 'ref'를 참조할 수 있게 된다.
function ChildComponent(props, ref) {
  return <span ref={ref}>children ref 테스트</span>;
}

// 'forwardRef'로 감싸기
const ForwardedChild = forwardRef(ChildComponent);

function ParentComponent() {
  const childRef = useRef(null);

  useEffect(() => {
    console.log(childRef.current?.textContent); // 'children ref 테스트'
  }, []);

  return (
    <div>
      <ForwardedChild ref={childRef} />
    </div>
  );
}
```

- 자식 컴포넌트를 forwardRef 를 통해 감싸주면 된다. (마치 Higher-Order-Component 를 사용하는 것과 같다.)

### 헌데 왜 경고창이 뜨는 것일까?

맨 위 경고창으로 돌아가보자. 위 경고창은 자식 컴포넌트에게 props 가 아닌 ref 를 전달할 때 나오는 경고창이다. 이유는 공식 문서에서 함수컴포넌트는 인스턴스가 없기 떄문에 당연하게도 null 을 가리키게 된다고 한다. 다만 이 이유가 와닿기 보단, 리엑트의 설계 상 props 의 변화를 통한 재 랜더링을 기준으로 하고 있으며 만일 ref 를 통해 props 변화가 아닌 직접 값의 수정이 가능하다면 리엑트의 설계와 맞지 않기에 막아놓은것이 아닌가 싶다. 여하튼 이를 해결하기 위해서는 forwardRef 가 필요하고 위에서 이에 대한 예시 코드도 살펴보았다. <br /><br />

문제는 실제 프로젝트를 진행하는 과정에서 발생하였다. 분명 자식 컴포넌트를 forwardRef 로 감싸주었음에도 불구하고 에러가 발생한 것이었다. forwardRef 사용 예제와 현재 내가 작성한 코드와의 차이점은 어디 있을까 고민하였고, 깨달은 바는 내가 작성한 코드는 부모 -> 자식 -> 손자 로 이어지는 구조였고, 손자 컴포넌트에(편의상 이렇게 부르겠다) forwardRef 를 적용했던 점에 있었다. 아마도 그렇기에 forwardRef 를 test 환경에서 파악하지 못해 발생한 것이 아닌가 싶다. 다시 제대로 작동하도록 수정해보자. <br /><br />

```tsx
// Login.tsx
const Login = (props: SIprops) => {
  const { toggleGotoAccount } = props;
  const buttonRef = useRef<HTMLButtonElement>(null); // ref 를 통해 AButton 내부 자식 component 를 참조하고자 한다.
  const LinkRef = useRef<HTMLAnchorElement>(null);

  // 생략..

  return (
    <>
      <LoginBox>
        <LoginSection>
          <LoginForm>
            <AButton
              color='black'
              ref={buttonRef}
              onClick={onSubmit}
              disabled={!(isEmailValid && isPasswordValid)}
              dest='Sign in'
            />
            <AButton
              ref={buttonRef}
              color=''
              onClick={toggleGotoAccount}
              disabled={false}
              dest='Create account'
            />
            <LDivider plain>OR</LDivider>
            <AButton
              As='a'
              ref={LinkRef}
              color=''
              disabled={false}
              dest='Sign in Google'
              src={google}
              href={`${backUrl}/auth/google`}
            />
          </LoginForm>
        </LoginSection>
      </LoginBox>
    </>
  );
};

export default Login;

// AButton.tsx
import type { ButtonProp } from "../type";
import { PolymorphicComponentProps } from "../type";

import BaseButton from "./BaseButton";

type AButtonProps<T extends React.ElementType> = PolymorphicComponentProps<
  T,
  ButtonProp
>;

const AButton = <T extends React.ElementType = "button">({
  As,
  color,
  disabled,
  onClick,
  ...props
}: AButtonProps<T>) => {
  return (
    <ButtonContainer
      As={As}
      color={color}
      disabled={disabled}
      onClick={onClick}
      {...props}
    />
  );
};

export default AButton;

// BaseButton.tsx

type _BaseButtonProps = Pick<ButtonProp, "src" | "dest">;

export type BaseButtonProps<T extends React.ElementType> =
  PolymorphicComponentProps<T, _BaseButtonProps>;

type BaseButtonComponent = <T extends React.ElementType = "button">(
  props: BaseButtonProps<T>
) => React.ReactElement | null;

const BaseButton: BaseButtonComponent = React.forwardRef(
  <T extends React.ElementType = "button">(
    { As, ...props }: BaseButtonProps<T>,
    ref: PolymorphicRef<T>["ref"]
  ) => {
    const Element = As || "button";
    return (
      <Element ref={ref} {...props}>
        {props.src && (
          <Image src={props.src} alt={props.dest} priority={true} />
        )}
        {props.dest}
      </Element>
    );
  }
);
export default BaseButton;
```

- 전체 코드는 Login -> AButton -> BaseButton 순으로 이동한다
- 보는데 정신없지만 일단 BaseButton 쪽이 forwardRef 를 통해 ref 를 전달받고 있다.
- 나머지는 type이고 type 은 한번 정리를 해보겠다.

```ts
// Button 에 대한 props 의 type 을 정리하였다. 여기서 ref 와 As 가 빠져있는데 이 부분은 실제 DOM 객체의 속성들과 관련있기에 여기서 정할 수 없다.
// 예를 들면 link 라면 href 속성을 가지고 있다. 반면 div 는 이 속성을 가지지 않는다.
// 이처럼 As 에 따라 유동적으로 변경되기에 위 타입에는 우선 지정하지 않았다.
export interface ButtonProp {
  color: string;
  disabled: boolean;
  src?: StaticImageData;
  dest: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// 바로 아래 타입에서 정해준다. 제네릭을 활용해서 ElementType 들 중의 한가지를 T 로 정해준다. T는 즉 button, a, div 등등이다.
type AsProp<T extends React.ElementType> = {
  As?: T;
};

// 여기서 보면 유동적으로 정해지는 참조 객체에 따른 ref 의 type 을 지정해준다.
// componentProps 중에서 ref key 를 참조하게 된다. 이로서 유동적으로 정해진 객체에 적합한 ref 타입을 지정해줄 수 있다.
export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>["ref"];

// 유동적으로 요소와 ref 의 타입을 정할 수 있게 되었으니, 최종적으로 폴리몰픽 요소가 가져야 하는 타입을 & 연산자로 이어주도록 하자.
// 최종 타입에서는 추가적으로 있을 수 있는 타입 Props 에다가 (초기값은 빈 객체) 요소에 대한 타입 + ref를 제외한 나머지 react component가 가진 속성 타입 + 정해진 요소에 대한 ref 타입을 합쳐준다.
// 여기서 마지막 { ref : PolymorphicRef<T> } 가 요소 T 에 대한 ref 타입이다.
export type PolymorphicComponentProps<
  T extends React.ElementType,
  Props = {}
> = AsProp<T> &
  React.ComponentPropsWithoutRef<T> &
  Props & {
    ref?: PolymorphicRef<T>;
  };
```

- 다시 돌아와서 AButton, BaseButton 의 타입을 살펴보자

```tsx
// AButton.tsx

// T는 요소이며, 위에서 마지막으로 정의된 PolymorphicComponentProps 를 활용해준다. 초기 설정한 ButtonProps 와 더불어 요소, ref 에 대한 타입이 정해진다.
// 다만 아직 T가 결정되지 않았다.
type AButtonProps<T extends React.ElementType> = PolymorphicComponentProps<
  T,
  ButtonProp
>;

// Login 에서 As 를 통해 요소의 T를 정해주지 않았다면 기본적으로 button 으로 된다.
// props 를 통해 ref 도 전달되고 있다.
const AButton = <T extends React.ElementType = "button">({
  As,
  color,
  disabled,
  onClick,
  ...props
}: AButtonProps<T>) => {
  return (
    <ButtonContainer
      As={As}
      color={color}
      disabled={disabled}
      onClick={onClick}
      {...props}
    />
  );
};

//BaseButton.tsx

// BaseButton 에서는 참조할 src 와 문구인 dest 빼고는 사용하지 않으니 기존 ButtonProps 에서 이 2가지만 선택하여 새로 타입 지정.
type _BaseButtonProps = Pick<ButtonProp, "src" | "dest">;

// 기존처럼 같이, 기본 props 에 요소에 대한 부분과 그에 대한 ref 타입을 합쳐준다.
export type BaseButtonProps<T extends React.ElementType> =
  PolymorphicComponentProps<T, _BaseButtonProps>;

// 아래 타입은 실제 만들고자 하는 BaseButton 함수 컴포넌트에 대한 타입이다. 즉 리턴값이 무엇인지를 지정해준다.
// 왜냐하면 React.forwardRef 함수로 감싸지기 때문에, 반환값의 타입도 지정해준다.
type BaseButtonComponent = <T extends React.ElementType = "button">(
  props: BaseButtonProps<T>
) => React.ReactElement | null;

// 이제 forwardRef 문법에 맞게 props 와 ref 를 전달해주자. 이렇게 하면 최종적으로 As 에 따라 요소의 성질이 변하는 폴리메틱 컴포넌트가 완성이 된다.
const BaseButton: BaseButtonComponent = React.forwardRef(
  <T extends React.ElementType = "button">(
    { As, ...props }: BaseButtonProps<T>,
    ref: PolymorphicRef<T>["ref"]
  ) => {
    const Element = As || "button";
    return (
      <Element ref={ref} {...props}>
        {props.src && (
          <Image src={props.src} alt={props.dest} priority={true} />
        )}
        {props.dest}
      </Element>
    );
  }
);
```

<br /><br />

이렇게 위 처럼 작성을 했을 때, 테스트 코드를 돌려 렌더링을 진행하면 잘 될 것 같지만, 실제 경고창이 뜨게 되는데, 예상을 해봤을 때

- 부모 바로 다음 자식으로의 ref 전달이 아닌 더 깊이 들어가는 전달이라서
- 실제 ref 를 props 로 전달하는 것 자체가 react 에서 경고로 받아들이는 경우

이라고 생각하며, 그 중 두번째는 위 예제를 통해 아니라고 판단이 들어 첫번째가 아닐까 생각이 들었다. 이에 대하여 어찌되었던 ref 값이 forward까지 온전히 전달되면 된다고 판단하여, 아예 props 전달을 innerRef 로 하여 치환하여 전달하는 방법을 생각했다.

- ref 대신 innerRef 로 변경한다.
- 이에 맞게 PolymorphicComponentProps 타입을 변경한다.
- 최종적으로 ref 가 아닌 새로운 props 인 innerRef 를 내려준다.

<br />

```tsx
// Login.tsx
const Login = (props: SIprops) => {
  const { toggleGotoAccount } = props;
  const buttonRef = useRef<HTMLButtonElement>(null); // ref 를 통해 AButton 내부 자식 component 를 참조하고자 한다.
  const LinkRef = useRef<HTMLAnchorElement>(null);

  // 생략..

  return (
    <>
      <LoginBox>
        <LoginSection>
          <LoginForm>
            <AButton
              color='black'
              innerRef={buttonRef}
              onClick={onSubmit}
              disabled={!(isEmailValid && isPasswordValid)}
              dest='Sign in'
            />
            <AButton
              innerRef={buttonRef}
              color=''
              onClick={toggleGotoAccount}
              disabled={false}
              dest='Create account'
            />
            <LDivider plain>OR</LDivider>
            <AButton
              As='a'
              innerRef={LinkRef}
              color=''
              disabled={false}
              dest='Sign in Google'
              src={google}
              href={`${backUrl}/auth/google`}
            />
          </LoginForm>
        </LoginSection>
      </LoginBox>
    </>
  );
};

export default Login;

// AButton.tsx
import type { ButtonProp } from "../type";
import { PolymorphicComponentProps } from "../type";

import BaseButton from "./BaseButton";

type AButtonProps<T extends React.ElementType> = PolymorphicComponentProps<
  T,
  ButtonProp
>;

const AButton = <T extends React.ElementType = "button">({
  As,
  color,
  disabled,
  onClick,
  ...props
}: AButtonProps<T>) => {
  return (
    <ButtonContainer
      As={As}
      color={color}
      disabled={disabled}
      onClick={onClick}
      {...props}
    />
  );
};

export default AButton;

// BaseButton.tsx

type _BaseButtonProps = Pick<ButtonProp, "src" | "dest">;

export type BaseButtonProps<T extends React.ElementType> =
  PolymorphicComponentProps<T, _BaseButtonProps>;

type BaseButtonComponent = <T extends React.ElementType = "button">(
  props: BaseButtonProps<T>
) => React.ReactElement | null;

const BaseButton: BaseButtonComponent = React.forwardRef(
  <T extends React.ElementType = "button">(
    { As, innerRef, ...props }: BaseButtonProps<T>,
    ref: PolymorphicRef<T>["ref"]
  ) => {
    const Element = As || "button";
    // 여기에 innerRef 대신 ref 를 해도 관계가 없는 것으로 확인됬다. 다만 forwardRef 의 용법상 2가지 인자가 들어가야 하기에 ref 를 그대로 둔다.
    return (
      <Element ref={innerRef} {...props}>
        {props.src && (
          <Image src={props.src} alt={props.dest} priority={true} />
        )}
        {props.dest}
      </Element>
    );
  }
);
export default BaseButton;
```

- 아래는 변경된 type 이다.

```ts
export interface ButtonProp {
  color: string;
  disabled: boolean;
  src?: StaticImageData;
  dest: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

type AsProp<T extends React.ElementType> = {
  As?: T;
};
export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>["ref"];

// ref -> innerRef
export type PolymorphicComponentProps<
  T extends React.ElementType,
  Props = {}
> = AsProp<T> &
  React.ComponentPropsWithoutRef<T> &
  Props & {
    innerRef?: PolymorphicRef<T>;
  };
```
