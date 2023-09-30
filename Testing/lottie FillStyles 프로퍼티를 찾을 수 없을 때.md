## TypeError: Cannot set property 'fillStyle' of 'null'

lottie-player 등 lottie animation 관련 라이브러리를 사용하는 컴포넌트를 테스트 할 때 발생하는 오류이다. 이 오류의 원인은 jestDom 는 canvas를 추가할 수 없기 때문인데, 테스트하려는 컴포넌트를 렌더링 하려면 canvas 가 추가되어야 한다.

### 해결책

간단하다. jest 용 canvas mock 패키지를 설치해주자 <br />

```
npm i jest-canvas-mock
```

<br />

그 다음 jest.setup.js 내부에 import 를 해주면 끝이다. <br />

```js
import "jest-canvas-mock";
```
