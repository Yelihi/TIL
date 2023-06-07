## 리엑트 컴포넌트 테스팅

리엑트 프로젝트 또한 컴포넌트 단위로 하나하나 테스트 로직을 정해줄 수 있습니다. 리액트 컴포넌트를 테스팅할 때는, 주로 다음과 같은 형식으로 하게 됩니다

- 특정 props 에 따라 컴포넌트가 크래쉬 없이 잘 렌더링 되는지 확인
- 이전에 렌더링했던 결과와, 지금 렌더링한 결과가 일치하는지 확인
- 특정 DOM 이벤트를 시뮬레이트 하여, 원하는 변화가 제대로 발생하는지 확인
- 렌더링된 결과물을 이미지로 저장하여 픽셀을 하나하나 확인해서 모두 일치하는지 확인(이는 스토리북을 쓰는게 효율적)

### Jset / RTL

Jest 는 자바스크립트의 테스트 프레임워크입니다. 반면 RTL 은 React 가상 DOM 을 테스트 하기 유용한 프레임워크 입니다. 결론적으로 둘 다 사용해야합니다.

### 스냅샷 테스팅

스냅샷 테스팅은, 컴포넌트를 주어진 설정으로 렌더링하고, 그 결과물을 파일로 저장합니다. 그리고 다음번에 테스팅을 진행하게 되었을때, 이전의 결과물과 일치하는지 확인합니다.

초기 렌더링 결과도 비교 할 수 있지만, 컴포넌트의 내부 메소드를 호출시키고, 다시 렌더링 시켜서 그 결과물도 스냅샷을 저장시켜서, 각 상황에 모두 이전에 렌더링했던 결과와 일치하는지 비교를 할 수 있습니다.

우선 react-test-renderer 를 설치해야합니다

```
yarn add --dev react-test-renderer
```

### jest watch mode

Watch mode is an option that we can pass to Jest asking to watch files that have changed since the last commit and execute tests related only to those changed files
<br />

An optimization designed to make your tests run fast regardless of how many tests you have
<br />

(즉 jest 는 이전 commit을 기준으로 변경된 테스트 코드만 테스트를 실행한다. 그래서 속도를 향상시킬 수 있다.)
<br />

### Filename Conventions

- files with .test.js or .test.tsx suffix
- files with .spec.js or .spec.tsx suffix
- files with .js or .tsx suffix in "_"tests"_"folders

<br />

Recommendation is to always put your tests next to the code they are testing so that relative imports are shorter

<br />

### Code Coverage

A metric that can help you understand how much of your software code is tested
<br />

- Statement coverage: how many of the statements in the software code have been executed
- Branches coverage: how many of the branches of the control structures (if statements for instance) have been executed
- Function coverage: how many of the functions defined have been called and finally
- Line coverage: how many of lines of source code have been tested

```
// pakage.json

"coverage": "yarn test --coverage --watchAll --collectCoverageFrom='src/components/**/*.{ts,tsx}'"

```
