## Generic (closet 프로젝트 과정 회고)

프로젝트 내 로그인과 회원가입 컴포넌트의 리펙토링의 필요성을 느끼게 되었다. 이유는 다음과 같다. <br />

- 동일한 Input 컴포넌트를 Login, SignUp 컴포넌트 내에서 중복적으로 사용하였으나 모두 하드코딩
- 당시 validate 조건에 대해서 간단히 처리하였으나, 시간이 지나 validate 의 조건이 증가할 경우 코드 수정의 어려움이 있음
- 회원가입 과정에서 핸드폰 인증(혹은 이메일 인증) -> 인증번호 확인 절차 까지 확장될 가능성이 있기에, 하나의 Form 을 관리하는 방법중에서 reducer 와 contextAPI 를 생각
- 메 input 마다 error 메시지를 하드코딩으로 추가하는 과정이 있었음

### 구조 변경

기존 구조에서 새롭게 구조를 짜는 방향은 다음과 같다. <br />

- 기존 구조
  - userLogin Page -> Login / SignUp component
- 신 구조
  - userLogin Page -> Login(context) / SignUp(context) component -> TextField Input Component -> useContextInput custom hook

<br />

재사용을 위한 컴포넌트는 TextField, 커스텀훅은 useContextInput 이다. 과정은 다음과 같다. <br />

- context 는 props 를 전달하기 위한 일종의 매개체이지 그 자체로서의 의미는 없다. 다만, context 내 전달 props 가 변경이 있을 시 연관된 모든 컴포넌트가 렌더링 된다
- 이를 유의해야 하기에 context 는 Login 과 SignUp 을 나누는것이 좋다.
- Login 과 SignUp 에 같은 TextField 가 사용이 된다. 이전 방식대로라면 state 값을 props drill 로 전달받았겠지만, context API 를 통해서 전달될 예정이다.
- TextField 내에는 context 를 받아오는 useContextInput 커스텀 훅을 실행시킨 뒤, useEffect 를 통해 매 변화하는 타이핑 값에 따라 업데이트 및 error validate 를 실행시킨다.

### 첫 번째 시도

처음에는 간단하게 Login 컴포넌트 위주로 코드를 작성하였다. <br />

```tsx
// Type.ts
// Login Types

export interface MemberInfoProps {
  email: string;
  password: string;
}

export type IsValiedInfoProps = {
  [key in keyof MemberInfoProps]: string | undefined;
};

export type PartialMemberInfoProps = {
  [key in keyof MemberInfoProps]: Record<key, MemberInfoProps[key]>;
}[keyof MemberInfoProps];

export type PartialIsValiedInfoProps = {
  [key in keyof IsValiedInfoProps]: Record<key, IsValiedInfoProps[key]>;
}[keyof IsValiedInfoProps];

// MemberContext.tsx

export type LoginContextType = {
  value: MemberInfoProps;
  setValue: (v: PartialMemberInfoProps) => void;
  error: IsValiedInfoProps;
  setError: (e: PartialIsValiedInfoProps) => void;
};

export const LoginContext = createContext<LoginContextType>(null);
```

<br />

- Login 내 Context 의 value 로 들어갈 값들의 타입을 지정해주고, 이에 대한 Partial 타입과 더불어 Error 에 대한 타입도 같이 지정해준다.
- 이 후 LoginContextType 을 선언해준 다음 createContext 를 통해 LoginContext 를 생성해준다.
- 이제 이 LoginContext 를 Login 컴포넌트에 import 하여 provider 로 실제 value 를 전달해준다.
- 이렇게 되면 이제 자식 컴포넌트는 모두 useContext 로 접근이 가능하다.

<br />

```tsx
// Login.tsx
export const memberInfo = {
  email: "",
  password: "",
};

const isValiedInfo = Object.keys(memberInfo).reduce((obj, key) => {
  obj[key as keyof IsValiedInfoProps] = undefined;
  return obj;
}, {} as IsValiedInfoProps);

const Login = (props: SIprops) => {
  // 생략

  const [Info, setInfo] = useReducer(
    (prevInfo: MemberInfoProps, partialInfo: PartialMemberInfoProps) => {
      return { ...prevInfo, ...partialInfo };
    },
    memberInfo
  );
  const [error, setError] = useReducer(
    (prevError: IsValiedInfoProps, partialError: PartialIsValiedInfoProps) => {
      return { ...prevError, ...partialError };
    },
    isValiedInfo
  );

  const disabled = Object.values(error).some((e) => e !== undefined);

  return (
    <LoginContext.Provider
      value={{
        value: Info,
        setValue: setInfo,
        error: error,
        setError: setError,
      }}
    >
      {컴포넌트들}
      <TextField />
    </LoginContext.Provider>
  );
};

// TextField.tsx

type TextFieldProps = {
  type: HTMLInputTypeAttribute;
  source: keyof MemberInfoProps;
  placeholder: string;
  connectType?: keyof MemberInfoProps;
  testId?: string;
  validate: any;
};

const TextField = ({
  type,
  source,
  placeholder,
  connectType,
  testId,
  validate,
}: TextFieldProps) => {
  const inputValue = useContextInput({ source, validate, connectType });
  if (inputValue === null || inputValue === undefined) return null;
  const { value, error, onChange } = inputValue;

  return (
    <>
      <Input
        type={type}
        name={source}
        value={value.toString()}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-testid={testId}
      />
      <Error>{value && error && `${error}`}</Error>
    </>
  );
};
```

<br />

- 실제 렌더링할 Input 에 필요한 각종 Props 를 전달받는 TextField
- 이전처럼 value, setValue 등을 넘겨주는것이 아니라 ContextAPI 를 통해서 값을 가져올 예정이다
- TextField 에는 useContext 를 통해(여기에다가 source 등 필요 인자들을 넘겨주면서) 필요한 value, error, onChange 함수를 반환값으로 얻는다
- 이를 Input 컴포넌트에 대입시켜줌으로서 Input 컴포넌트가 성공적으로 렌더링 된다.

<br />

```tsx
type ErrorProps = IsValiedInfoProps;

type StringKeys = {
  [key in keyof MemberInfoProps]: key;
}[keyof MemberInfoProps];

type UseInputProps = {
  source: StringKeys;
  validate: any;
  connectType?: StringKeys;
};

const useInput = ({ source, validate, connectType }: UseInputProps) => {
  const info = useContext(LoginContext);
  if (info === undefined || info === null) {
    throw new Error("이 커스텀훅은 LoginContext 내에 있어야 합니다");
  }
  const { value, setValue, error, setError } = info;

  useEffect(() => {
    const errors: ErrorProps[] = validate.map((validFunc: any) => {
      if (connectType) {
        if (
          info.value[source] !== undefined &&
          value[connectType] !== undefined
        ) {
          return validFunc(value[connectType], value[source]);
        }
      } else {
        if (value[source] !== undefined) {
          return validFunc(value[source]);
        }
      }
    });
    const err = errors.find((error) => error);
    setError({ [source]: err } as PartialIsValiedInfoProps);
  }, [value[source]]);

  const onChange = (v: any) => {
    setValue({ [source]: v } as PartialMemberInfoProps);
  };

  return { error: error[source], value: value[source], onChange };
};
```

- useContextInput 커스텀훅은 내부에서 useContext 를 통해 LoginContext 의 value 를 가져온다
- 이후 각 Input 이 전체 value 중 특정 key 에 대응하는 값을 변화시킬테니깐, 이를 알려주는 source 를 통해서 validate 를 실행시키고, setValue 를 발동시킨다.
- 반환 값은 변화값이 반영된 error, value, onChange 이다. (Input 컴포넌트에 필요한)

<br />

실제 Login 을 실행시켜보면 제대로 작동됨을 알 수 있는데, 나의 목표는 Login 에 한정된 TextField 가 아니기에, 다른 컴포넌트 내에서 사용될 경우를 대비해야 했다. 문제는 여기서부터 발생하였다.

### 두 번째 시도 (Login, SignUp 두 컴포넌트에 TextField 를 올바르게 사용하기)

아이디어는 간단했다. 2개의 별개 Context 를 생성한 뒤, TextField 내 prop 값으로 context 를 두어 context 의 값에 따라 useContextInput 내 useContext 에 사용될 context 를 결정하는 방향이었다. 실제 자바스크립트였다면 코드를 짜는게 어렵지는 않았겠으나 타입을 지정해주는 과정에서 많은 시행착오를 거쳐야 했다.

<br />

TextField 의 source 가 이젠 Login 뿐 아니라 SignUp 의 key 값을 다루어야 했기에, 이 모두의 경우를 고려했어야 했고, 자연스럽게 keyof 와 Union 을 통해서 타입을 지정해주었다. 다음 전달되는 context 의 type 을 'Login' | 'SignUp' 을 지정해주었고, useContextInput 내 useContext 에 사용될 context 를 조건식으로 처리하려고 하였다. 즉, TextField 가 Login 컴포넌트 내에서 사용이 되었다면, 이에 맞는 value = { email: string, password: string } 을 가져오고 싶었고, 이 중 key 에 해당하는 source 를 통해 `value[source]` 로서 접근하려고 하였다. 이치에 맞다고 생각했는데 타입 오류가 발생하였다.
<br />

- 앞서서 source 는 이제 Login 과 SignUp 에서 발생할 모든 경우를 고려해야 했다. 예를 들어 SignUp 의 value 가 { nickName: string, email: string, password: string, confirmPassword: string } 이라고 하자
- useContextInput 에 전달될 수 있는 source 값은 총 4가지가 된다. (Login 의 email, password 는 겹치니깐)
- 만일 context 의 조건에 의해 useContext 를 LoginContext 를 가져왔다고 하였을 때, 이때의 value 는 email 과 password 를 가지고 있다.
- 허나 source 는 가능성에 의해 nickName, confirmPassword 가 올 수 있으니, value 객체에서 참조를 못하게 되어 타입오류가 발생한다.

<br />

이를 해결하기 위해 여러 시도를 해보았는데, 여전히 해결할 수가 없었다.
<br />

- useContextInput 내 조건식 if(context === 'Login') ... else .. 를 통한 context 분리
  - 여전히 source 는 4가지의 경우로서 고려되어 지고 있어 같은 타입오류가 발생한다.
- Generic 을 통하여 TextField 내에서 useContextInput 에 T(typeof Context)를 전달하여 useContextInput 은 T에 해당하는 (Login, SignUp) context 를 가져온다.
- 또한 TextField 가 받는 source 역시 전달된 T를 통해 source 값을 결정한다.
- useContextInput 자체는 괜찮지만, TextField 에서 useContextInput 에 전달하는 source 의 타입이 불일치된다. 왜냐하면 TextField 에 전달되는 source 는 모든 경우를 고려해야 하기 때문

```tsx
type UseInputProps<T extends keyof ValueProps> = {
  source: keyof ValueProps[T]; // source는 T의 value 타입의 key 중 하나여야 한다.
  validate: any;
  connectType?: keyof ValueProps[T]; // connectType 역시 T의 value 타입의 key 중 하나여야 한다.
  context: T;
};

// useConText 내 전달되는 source 값은 위 UseInputProps 를 통해 Login 인지 SignUp 인지 결정나게 된다.
// 하지만 TextField 로 부터 전달되는 source 와 커스텀 훅 내 source 내 타입이 일치하지 않기에 여전히 value[source] 타입 오류가 발생한다.
// 정확히는 TextField 코드 내 useContextInput({ source, ... }) 에서 타입오류가 발생한다. (T로 인해 조건화된 타입에는 전체 경우를 고려한 타입이 할당되지 않는다.)

useEffect(() => {
  const errors: ErrorProps[] = validate.map((validFunc: any) => {
    if (connectType) {
      if (
        info.value[connectType] !== undefined &&
        info.value[source] !== undefined
      ) {
        return validFunc(info.value[connectType], info.value[source]);
      }
    } else {
      if (info.value[source] !== undefined) {
        return validFunc(info.value[source]);
      }
    }
  });
  const err = errors.find((error) => error);
  setError({ [source]: err } as PartialIsValiedInfoProps);
}, [info.value[source]]);
```

- 즉, 제네릭을 통해 Login 으로 source 를 useContextInput 에서 가드하였다 하더라도, TextField 에서 전달되는 source 는 모든 경우의 수

### 세 번쨰 시도 (중간 switchContext 훅을 추가하여 애초에 해당 context 가 적용된 value를 전달하기)

구상 자체는 같으나, 조금 더 고민한 결과 useContextInput 의 모든 타입을 전달되는 props 의 value 로 결정하고자 하였다. <br />

- 기존 props 와 달리 useContextInput 에 value, setValue, error, setError 4개의 props 를 추가한다. 즉, 외부에서 이미 context 를 호출하여 값을 props 로 내려주겠다는 의미
- 이로서 useContextInput 커스텀훅은 완벽히 독립적이 된다.
- context 를 변경해줄 switchContext 훅을 생성한뒤, TextField 내에서 전달되는 context 를 통해 Login, SignUp 을 구별하여 이에 맞는 value 를 useContextInput 에 넘겨준다
- 전달받는 value 가 확정이 되어있고 이에 대한 source 역시 context 에 적합여부만 확인하고 넘겨줄테니, useContextInput 은 value 를 T로 두어 이에 대한 나머지 타입을 지정해줄 수 있다.

<br />

코드로 살펴보도록 하자

<br />

```tsx
// useSwitchContext.tsx

type StringKeys = keyof Merge<MemberInfoProps, SignUpInfoProps>;

interface useContextSwitchProps {
  source: StringKeys;
  validate: any;
  connectType?: StringKeys;
  context: "Login" | "SignUp";
}

const useContextSwitch = ({
  source,
  validate,
  connectType,
  context,
}: useContextSwitchProps) => {
  let returnValue;
  // 중복되는 코드가 있어서 좀 더 리펙토링이 필요할 듯 보이지만.. 일단 현재까지는 내 생각의 한계점이다
  switch (context) {
    case "Login": {
      if (Object.keys(memberInfo).includes(source)) {
        // 해당 context 가 source 를 가지는지 확인
        const info = useContext(LoginContext); // 해당 context 호출
        if (info === null || info === undefined) {
          throw new Error("생성된 context가 없습니다.");
        }
        const newSource = source as keyof MemberInfoProps; // 여기서 타입 강제를 해주지 않으면 useContextInput 에 할당이 되질 않음 (위에서 검증이 끝났음에도)
        const newConnectType = connectType as keyof MemberInfoProps;
        const { value, setValue, error, setError } = info;
        returnValue = useContextInput({
          // useContextInput 의 returnValue 인 value, error, onChange 가 반환된다.
          value,
          setValue,
          error,
          setError,
          source: newSource,
          validate,
          connectType: newConnectType,
        });
      }
      break;
    }
    case "SignUp": {
      if (Object.keys(signUpInfo).includes(source)) {
        const info = useContext(SignUpContext);
        if (info === null || info === undefined) {
          throw new Error("생성된 context가 없습니다.");
        }
        const newSource = source as keyof SignUpInfoProps;
        const newConnectType = connectType as keyof SignUpInfoProps;
        const { value, setValue, error, setError } = info;
        returnValue = useContextInput({
          value,
          setValue,
          error,
          setError,
          source: newSource,
          validate,
          connectType: newConnectType,
        });
      }
      break;
    }
    default: {
      returnValue = null;
    }
  }

  return returnValue;
};

export default useContextSwitch;
```

<br />

- TextField 에서 호출하는 커스텀훅으로서 전달되는 context 에 따라 useContext 로 호출하는 context 에 차이가 발생한다.
- 이 후 useContextInput 에 props 를 전달하게 된다.
  <br />

```tsx
// useContextInput.tsx

// 전달되는 props 중 value 에 의해 T가 결정이 된다
// 이 T를 통해 나머지 setValue, error, setError, source, connectType 의 타입을 선언해준다.
interface UseContextInputProps<T extends Object> {
  value: T;
  setValue: (v: { [key in keyof T]: Record<key, T[key]> }[keyof T]) => void;
  error: { [key in keyof T]: string | undefined };
  setError: (
    e: { [key in keyof T]: Record<key, "string" | "undefined"> }[keyof T]
  ) => void;
  source: keyof T;
  validate: any;
  connectType: keyof T;
}

//
const useContextInput = <T extends Object>({
  value,
  setValue,
  error,
  setError,
  source,
  validate,
  connectType,
}: UseContextInputProps<T>) => {
  useEffect(() => {
    const errors: { [key in keyof T]: string | undefined }[] = validate.map(
      (validFunc: any) => {
        if (connectType) {
          if (value[source] !== undefined && value[connectType] !== undefined) {
            return validFunc(value[connectType], value[source]);
          }
        } else {
          if (value[source] !== undefined) {
            return validFunc(value[source]);
          }
        }
      }
    );
    const err = errors.find((error) => error);
    setError({ [source]: err } as {
      [key in keyof T]: Record<key, "string" | "undefined">;
    }[keyof T]);
  }, [value[source]]);

  const onChange = (v: any) => {
    setValue({ [source]: v } as {
      [key in keyof T]: Record<key, T[key]>;
    }[keyof T]);
  };

  return { error: error[source], value: value[source], onChange };
};

export default useContextInput;
```

<br />

- 전달되는 value 에 의해 모든 타입이 결정이 되고, 그렇기에 Login, SignUp 이 아닌 다른 context 라도 useContextInput 을 활용할 수 있다.

### 한계점들

최선이라 생각하여 작성하였지만, 여전히 아쉬운 점들이 있다. <br />

- useSwitchContext 내 switch 문에서 중복 코드가 많이 있다. 이를 줄이고자 하였지만 외부로 로직을 이동 시 타입 오류가 발생하게 된다. 다른 방법을 강구해봐야겠다
- useContextInput 내 validate 함수의 경우 특정 TextField 의 유효성을 검사하는 것으로서, 만일 비밀번호 체크처럼 동시에 여러 상태값이 인자로서 활용되어야 할때, 이를 하드코딩이 아닌 다른 방법으로 호출할 수 있도록 해야한다
- 현재는 모든 state 의 타입이 string 인데, 만일 boolean 이나 number 등 다른 타입이 발생 시 이에 대응하는 source 의 타입정리가 필요하다. (하는 방법은 아는데 아직 적용을 못했다.)

<br />

이전 코드가 훨씬 간단했다고 생각하고, 그리 나쁜 코드까진 아니라 생각하지만 리펙토링을 어렵게 하면서 얻은 결과는, 앞으로의 회원가입 절차의 확장성에 있어서 전체 SignUp 내 Context 의 확장으로서 대응할 수 있다는 점이 있다.
물론 이에 대응하는 입력필드가 TextField 부터 SelectField, NumberField, CheckField 등 늘어날 예정이지만, 늘어난 필드에 대응하는 useContextInput 커스텀 훅을 그대로 활용할 수 있다. 이러한 부분에 있어서 좀 더 유지보수성의 향상이 있었다 생각한다.
