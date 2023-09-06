## useState 의 batch 동작을 멈춰보기

### batch

useState hook 에서 setState 가 실행될 때는, 동기적으로 순차적으로 실행되는 것이 아니다. 예를 들어보자 <br />

```jsx
import { useState } from 'react';

export default function App(){
  const [value, setValue] = useState(0);
  const [restValue, setRestValue] = useState(20);

  const onChange = () => {
    setValue(value+1);
    setRestValue(value-1);
  }

  return (
    <>
      <p>{value}</p>
      <p>{restValue}</p>
      <button onClick={onChange}>
  )
}

```

<br />

위 코드에서 onChange 함수는 2개의 상태 변화를 담당하게 된다. 즉 버튼을 클릭하면 2가지 상태변화가 일어나는데, 알다시피 리엑트의 함수내에서 상태변화가 일어나면 변한 상태를 반영해주기 위해 리랜더링이 일어나게 된다.<br />
만일 set함수가 순차적으로 동작한다고 가정하면, 맨 처음 setValue 를 통해 한번 랜더링이 일어나고 그 다음 setRestValue 를 통해 다시 한번 랜더링이 진행하게 된다. 사실 랜더링하는 상태값은 너무 간단하고, 굳이 순차적으로 진행할 필요는 없지 않을까?<br />
또한 지금은 2가지의 상태 변화를 다루고 있지만 규모가 커질수록 다루어야 할 상태가 늘어날 수 있기에 순차적으로 set함수로 상태를 변경시키는것은 비효율 적이다.<br /><br />

이에 리엑트에서는 상태 변경을 동기적인 아닌 비동기적으로 변경하기 위해 batch 라는 방식으로 상태를 변경하게 된다. 쉽게 말해 변화가 있는 value, restValue 2가지 상태를 한번에 가상 DOM 에 없데이트 시킨 후 실제 DOM 과 한번 비교를 통해 한번의 렌더링만을 가지게 하는 방식이다.<br />
그렇다면 아래와 같은 상황을 생각해보자 <br /><br />

```jsx
const [value, setValue] = useState(1);

const onChange = () => {
  setValue(value + 1);
  setValue(value + 1);
  setValue(value + 1); // 원하는 값은 4
};
```

- 우리가 원하는 값은 value 가 4 가 되는 방향이다. 하지만 실제 렌더가 되는 value 는 2이다.
- 이는 batch 로 인해 여러번의 setState 가 있더라도 같은 상태의 변화이니 하나로 합쳐서 가상 DOM 에 적용시킨것이다.
- 즉, value+1 이라는 상태 변화를 인지하여 중복하지않고 반영
- 우리의 의도대로 하려면 위와 같은 방식으로 해서는 안된다.
  <br />

### 상황에 따라서 batch 를 깨트려야 할 때가 있다.

리엑트를 사용하면서 상태를 변경하다 보면 의도치 않은 오류가 발생할 때도 있다. 우리가 의도한대로 작동하지 않는것이 가장 큰 걸림돌일태고, 위와 같이 batch 로 인해 발생하는 의도와 다른 렌더링은 그 중 하나일 것이다.<br /><br />

하지만 어떠한 오류가 반드시 batch 에 의한 렌더링 오류라고 단정 지을 수 있을까? 즉, 상태에 대한 렌더링 오류가 리엑트의 batch 에 의한것인지, 아니면 그냥 내가 잘못 기입해서 발생한 오류인지를 파악할 수단이 필요할 수 있다. 이러한 수단을 얻기 위해서는 우리가 의도적으로 batch 상황을 동기적으로 변화시킬 수 있어야 한다. <br />
(물론 실전 코드에서는 사용해서는 안된다. 렌더링 효율이 너무나 떨어지기 때문. 테스트 할때만 사용하자) <br /><br />

만일 아래 코드처럼, 알 수 없는 렌더 오류가 발생했다고 가정해보자.<br />

```tsx
// 여기서 주목할 부분은 setError 부분이다. 현재 contextAPI 를 통해서 Provider 를 통해 자식 컴포넌트에게 value, error 등 값들을 전달하고 있다.
// 또한 이 코드에서는 나와있지 않지만 useReducer 를 통해서 하나의 입력폼에 들어갈 value 들을 하나의 객체로 관리하고, onChange 가 생길때마다, 하나의 객체의 해당 onChange 가 담당하는 Input 의 value 만 변경되거나 error 값을 띄을 수 있도록 설정해두었다.
// 그래서 setError({ ...error, ...e }) 로 표현하는 것이다.
<InfoContext.Provider
  value={{
    value: info,
    setValue: setInfo,
    error,
    setError: (e) => setError({ ...error, ...e }),
  }}
>
  <Form onSubmit={onSubmit}>
    <TextField
      source='name'
      label='이름'
      validate={[minLength(3), maxLength(6)]}
    />
    <TextField
      source='password'
      label='패스워드'
      validate={[minLength(6), maxLength(12)]}
    />
    <CheckboxField
      source='confirm'
      label='위 내용이 제출됩니다 동의하십니까?'
      validate={[checked]}
    />
  </Form>
</InfoContext.Provider>
```

- 위 코드에서 setError({ ...error, ...e }) 부분은 상태값 error 객체를 변경해주고 있다. 전혀 문제가 없어보이지만, 의도대로 렌더링이 작동하지 않고 있다.
- 원인은 아직 알 수 없다. 다만 우리는 상태 렌더링의 오류에는 batch 를 떠올릴 수 있다.
- 즉 문제가 batch 때문인지, 아니면 다른 원인인지를 파악해야 한다. 이를 위해서는 의도적으로 batch를 피하는 방식을 써야할 것이다.
  <br />

```tsx
// before
setError: (e) => setError({ ...error, ...e });

// after
setError: (e) => setError((prev) => ({ ...prev, ...e }));
```

- 아래처럼 변경을 하니 오류가 해결이 되었다.
- after 에 쓰인 prev 인자를 이용해서 상태를 변경해주는 방식은 체인처럼 prev 를 변경해주기 때문에 batch 로 인한 렌더링 오류를 해결하는 방안 중 하나다.
- 다만 이 해결이 단순히 batch 때문인지 아직 알 수 없다. 그렇기에 좀 더 검증을 해보자.
  <br />

```tsx
// TextField.tsx -> useInput.tsx
const useInput = ({ source, validate }: UseInput) => {
  const { value, setValue, error, setError } = useContext(InfoContext);

  useEffect(() => {
    const errors: ErrorInfo[] = validate.map((validationFunc: any) => {
      if (value[source] !== undefined) {
        return validationFunc(value[source]);
      }
    });
    const err = errors.find((error) => error); // undefined 가 아닌거 찾기
    setError({ [source]: err } as PartialErrorInfo);
  }, [value[source]]);

  const onChange = (v: any) => {
    setValue({ [source]: v } as PartialInfo);
  };

  return { error: error[source], value: value[source], onChange };
};
```

- 코드가 복잡한데, 여기서 신경쓸 부분은 실제 전달해준 setError 의 작동 부분이다.
- 이 부분을 아래처럼 변경해주면 batch 가 아닌 순차적 상태 업데이트를 실행하게 된다.
  <br />

```tsx
// 1. setTimeout 을 통해 taskQueue 를 거쳐서 실행시키기
setTimeout(() => setError({ [source]: err } as PartialErrorInfo), 0);
// 2. queueMicrotask 활용하기
queueMicrotask(() => setError({ [source]: err } as PartialErrorInfo));
```

- 위와 같은 방식으로 상태의 순차적 업데이트를 처리할 수 있다.
  <br /><br />

실제로 처리를 해주니 예상 외로 여전히 렌더링 문제가 발생하고 있었다! 즉, batch 문제가 아니었던 것이었다. 자칫 오해할 수 있었다. <br />
당시 문제는 setError 를 처리하는 useEffect 가 text, password, checkbox Component 에서 독립적으로 작동하고 있었던 것이 화근이었다. error 의 경우 객체로서 전달되는데, 초기값은 아래와 같다.<br />

```tsx
setError: (e) => {
  // 3개의 각 필드에서 실행되는 시점에 error는 {name: undefined, password: undefined, confirm: undefined}
  setError({ ...error, ...e });
};

// 순차적으로 error 가 발생하여 업데이트 된다고 생각해보자.
// setError({ name: “최소 3자 이상 입력해주세요", password: undefined, confirm: undefined})
// setError({ name: undefined, password: “최소 6자 이상 입력해주세요", confirm: “반드시 체크해주세요”})
// setError({ name: undefined, password: undefined, confirm: “반드시 체크해주세요”})
```

- 초기값이 모두 undefined 이고, useEffect 는 독립적으로 작동하기에 만일 해당 Component 에서 error 를 반환하게 되면 해당 error[source] 에 대한 부분만 업데이트 시킨다
- 마찬가지로 다른 컴포넌트도 error 를 업데이트 시키는데 이 때 전달되는 ...error 가 초기값이다. 따라서 이전 업데이트 된 부분은 반영이 되어있지 않는다.
- 결과적으로 렌더가 마무리 되면 화면에는 confirm: "반드시 체크해주세요" 부분만 나타나고 나머지는 undefined 인 상태가 된다.
  <br /><br />

위와 같은 상황은 앞선 setValue(value+1) 이 반복적으로 선언되어있던 상황이랑 비슷하다. 이를 해결하기 위해서 prev 인자가 활용되게 된다. 즉, 초기값인 error 를 그대로 변화시키는 것이 아니라, 이전 상태값을 확실하게 명시해주는 것이다. 그렇게 하여 이전 상태에서 해당 에러를 업데이트 해주면 정상적으로 3가지 error 가 렌더링 되게 된다.

### 결론

두서 없이 작성한 글이지만, 요점은 다음과 같다. <br /><br />

- 리엑트에서는 렌더링 효율을 위해 상태의 업데이트를 순차적으로 하지 않는다. 대신 리엑트가 여러 상태값들의 변화를 파악하여 적절하게 가상 DOM 에 반영하는 batch 를 활용한다
- 이러한 batch 로 인해 우리의 의도와 다른 렌더링이 나타날 수 있다. 대표적으로는 같은 상태의 순차적인 업데이트에 있다.
- 다만 상태 업데이트의 문제가 반드시 batch 라는 특징에 의해서만 발생한다고는 할 수 없다.
- 상태를 순차적으로 업데이트 '실행' 하는 방법은 setTimeout, queueMicrotask 를 활용할 수 있다.
- batch 가 일어나지만 이전 상태(prev) 를 참조하여 업데이트 시켜 의도한대로 순차 업데이트를 진행시키는 방법이 있다.
