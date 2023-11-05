## reset을 활용할때는 되도록이면 useEffect 내부에서 사용하자

react-hook-form 을 사용하다보면, 데이터를 Submit 한 다음 초기상태로 reset 하거나 기존 입력값을 받아와 input 내에 전달하고자 reset 를 활용하게 될 것이다. 그리고 reset 함수가 react 내에서 렌더링을 트리거한다는 것을 알게 된다. <br />

뭔가 렌더링을 트리거한다는 사실에 주목하여 useEffect 내부에서 처리하기보단 함수 자체를 실행할 때 처리되는 방법을 떠올려보았고, useRef 의 state store의 역할을 활용하여 아래와 같이 구현해본 적이 있다. <br />

```tsx
const change = useRef(false);
//... 생략

if (fetchingData) {
  const formValue = modifyFetchDataToFormData(fetchingData); // 받아온 데이터를 form 에 맞는 형식으로 변경
  if (!change.current) {
    // 무한 렌더링이 발생하기에 필요하다.
    change.current = true;
    reset(formValue); // 변경된 데이터로 reset
  }
} else {
  if (change.current) {
    change.current = false;
    reset(defaultValue);
  }
}

// ...
```

<br />

참고로 reset 은 useForm 훅에서에 불러올 수 있다. <br />

reset 은 랜더링을 트리거하기에 함수 컴포넌트는 재 실행될 것이며 그렇기에 이러한 점을 활용하면 굳이 effect 를 활용하지 않아도 입력 값을 변경해줄 수 있을 것이라 생각했다. 실제로 구현 자체는 문제없이 되었기에 만족하였다. <br />

하지만 위처럼 활용했었던 결정적인 이유는 렌더링의 효율때문이었는데, 나중에 렌더링 효율을 계산해보기 위해 함수 컴포넌트가 reset 시 얼마나 재 랜더링 되는지를 확인해보고자 하였다. 예상치 못한 결과를 확인할 수 있었는데, 한번만 렌더링이 트리거 될 줄 알았는데 2번이 트리거가 되는 현상이었다. <br />

자세한 내막을 알 수는 없었지만, 공식 문서내에서 reset 을 살펴보는데 주의사항으로 규칙이 적혀있었다. 그리고 이 규칙에는 분명하게도 reset 을 useEffect 내부에서 호출하라고 명시하고 있었다. <br />

- useForm 의 구독이 준비되기 전에 reset 을 호출하지 말아야 한다. 구독은 useForm의 useEffect 가 호출되면서 설정이 된다.
- 추천하는 방식은 제출이후(isSubmitSuccessful) effect 내부에서 reset 을 호출하는 것이다.

<br />

useEffect는 함수 컴포넌트의 실행이 완료된 이후 실행하기에, useForm 내부에서의 useEffect 실행 역시 마찬가지일 것으로 사료된다. 따라서 처음 effect 외부에서 reset 을 실행시키는 방식은 아직 상태 변경을 받을 준비가 덜된 useForm 에게 reset 을 요구하는것이 될 수 있고, 자칫 에러로 이어질 수 있다 판단이 든다. <br />

실제 렌더링 횟수 테스트 결과까지 고려해봤을 때 reset 은 effect 내부에서 싫행하는것이 바람직하다 생각이 든다. <br />

```tsx
// ...

useEffect(() => {
  if (fetchingData) {
    const formValue = modifyFetchDataToFormData(fetchingData);
    reset(formValue);
  } else {
    reset(defaultValue);
  }
}, []);
```
