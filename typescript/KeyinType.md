## Key in Type

입력 폼에 대한 type 을 정의하고 있다고 가정해보자. useReducer 를 활용하고 있고, 그렇기에 각각의 Input Compoenet에 { value: { key: value }} 를 넘겨준다고 해보겠다. <br />

```ts
type Info = {
  name: string;
  password: string;
  confirm: boolean;
};

type PatialInfo =
  | { name: string }
  | { password: string }
  | { confirm: boolean };
```

<br />

위처럼 type 을 정의하고 있다면, 조금 문제가 있다. 왜냐하면 만약 Form 의 Input 이 늘어나 Info 가 변경된다면, 자연스럽게 PatialInfo 역시 수동으로 변경해주어야 하기 때문이다. 이렇게 수동적으로 엮이면서 작업이 많이 필요하다면 실수를 범하기 쉽다. <br />

이럴 떄 반복 type 지정방법인 [key in Type] 을 활용하면 Info 의 변화에 대하여 자동적으로 PatialInfo 가 대응할 수 있도록 Type 을 지정할 수 있다. 이 전에 먼저 [key in Type] 에 대해서 살펴보도록 하자. <br /><br />

```ts
type Fruit = "orange" | "lemon" | "banana";

type Cart = {
  orange: boolean;
  lemon: boolean;
  banana: boolean;
};
```

- 위와 같이 과일과 카트에 대한 type 을 지정한다고 가정할 때, 과일의 변화에 따라 카트의 타입 역시 변화를 자동적으로 주고 싶다. 이럴 때는

```ts
type Fruit = "orange" | "lemon" | "banana";

type Cart = { [key in Fruit]: boolean };

// loop 1
// type Cart = { orange: boolean }

// loop 2
// type Cart = { orange: boolean, lemon: boolean }

// loop 3
// type Cart = { orange: boolean, lemon: boolean, banana: boolean }
```

- 위 코드처럼 Fruit 의 순환을 통해 Cart type 을 생성해나가는 것을 확인할 수 있다. 위 Fruit 를 어떻게 변화를 준다 해도 아래 Cart 는 그에 맞게 대응하게 된다.
- 이러한 성질을 활용하면 우리가 원했던 partialInfo 를 자동적으로 대응할 수 있도록 해줄 수 있다.

```ts
type Fruit = "orange" | "lemon" | "banana";

// type Cart = { orange: boolean } | { lemon: boolean } | { banana: boolean } 을 만들어 주고 싶다.

type Cart = { [key in Fruit]: Record<key, boolean> }[Fruit];

// type Cart = { orange: { orange: boolean }, lemon: { lemon: boolean }, banana: { banana: boolean } }
// 이런식으로 나오고, type 역시 객체처럼 key 로 접근할 수 있기 때문에 뒤에 [Fruit] 를 해놓게 되면,
// type 은 모든 가능성을 고려하기에 Fruit 가 가진 값들에 대응하는 모든 type 을 Cart 에 대응한다.
// 따라서 type Cart = { orange: boolean } | { lemon: boolean } | { banana: boolean }
```

- 위를 참고하여 실제 구하고자 하는 입력 폼의 PartialInfo 를 만들어보자

```ts
type Info = {
  name: string;
  password: string;
  confirm: boolean;
};

type PartialInfo = { [key in keyof Info]: Record<key, Info[key]> }[keyof Info];

// Record<"name", string> | Record<"password", string> | Record<"confirm", boolean>
// 이렇게 자동적으로 나오게 된다.
```

<br />

이를 좀 더 응용할 수 있는데, 자주 사용되는 방법으로는 Object 타입 변경이 있다. 설명하기 전에 하나의 상황을 예시로 들어 왜 필요한지를 설명해보겠다.

```tsx
// login

export default function LoginForm() {
  // 생략 (useContext 와 useReducer 를 통해 value 를 각각의 컴포넌트에 전달하고 있다. )

  return (
    <InfoContext.Provider value={{ value: info, setValue: setInfo }}>
      <Form onSubmit={onSubmit}>
        <TextField label='이름' source='name' />
        <CheckboxField
          label='위 내용이 제출됩니다. 동의하십니까?'
          source='confirm'
        />
      </Form>
    </InfoContext.Provider>
  );
}

// TextField
// Checkbox 예시는 들지 않겠다.

type TextFieldProps = {
  label: string;
  source: keyof Omit<Info, "confirm">;
};

const TextField = ({ label, source }: TextFieldProps) => {
  const { value, setValue } = useContext(InfoContext);
  return (
    <>
      {label}
      <input
        onChange={(e) => setValue({ [source]: e.target.value })}
        value={value[source].toString()}
      />
    </>
  );
};

export default TextField;
```

<br />

위 과정은 로그인과 로그인 페이지에 포함된 TextField 컴포넌트를 보여준다. useContext 와 useReducer 를 통해 value 를 전달하고 있고, Reducer 에 의해 각 field 의 변화에 맞게 전체 상태값인 info 가 변화하게 된다. 이 때 각 field 를 구별지어 줄 수 있는 source 가 필요하고, 이는 props 로 내려주는것으로 한다.
<br /><br />

source 는 type Info 에 의존하고 있다. 그래서 위 코드에서는 Omit 유틸을 통해 각 field 에 맞는 source 의 type 을 설정해주었다. 참고로 [source] 를 사용하려면 정확한 key 값이여야 한다. 그렇기에 soucre의 type 은 'name', 'confirm' 과 같이 지칭되어야 한다. 이렇기에 만약 Info 가 변경이되거나, Input Component 가 늘어남에 따라서 매번 직접 Omit 을 수정해주어야 하는 문제가 있다. 쉽게 말해 check : boolean 이라는 속성 하나만 추가해도 Omit 이 변해야 한다. 이를 자동적으로 해결함에 있어서 key in Type 이 응용된다. <br />

```ts
type StringKeys = {
  [K in keyof Info]: Info[K] extends string ? K : never;
}[keyof Info];

// loop1
// type StringKeys = { name: "name" }

// loop2
// type StringKeys = { name: "name", confirm: never };

// 참고로 never가 value 라면 Info[key] 는 반응하지 않는다.
```

<br />

위처럼 타입을 작성하게 되면 StringKeys 가 나타내는것은 Info 중에서 string 을 나타내는 'name' 을 정확하게 타입한다. 우선 삼항 조건식이 사용되면서 string 이 아니라면 모두 never 를 부여하고 이렇게 만들어진 type 에서 never 가 아닌 string 만 가져오게 된다. 이로서 위 코드를 아래처럼 수정할 수 있다. <br />

```ts
type StringKeys = {
  [K in keyof Info]: Info[K] extends string ? K : never;
}[keyof Info];

type TextFieldProps = {
  label: string;
  source: StringKeys;
};

const TextField = ({ label, source }: TextFieldProps) => {
  const { value, setValue } = useContext(InfoContext);
  return (
    <>
      {label}
      <input
        onChange={(e) => setValue({ [source]: e.target.value })}
        value={value[source].toString()}
      />
    </>
  );
};

export default TextField;
```

- 실무에서는 ts-toolbelt 를 설치해서 `Object.SelectKeys<Info, string>` 으로 사용하는것이 가독성면에서 훨씬 좋다.
- 물론 연습은 위처럼 직접 만드는 식으로 하고...
