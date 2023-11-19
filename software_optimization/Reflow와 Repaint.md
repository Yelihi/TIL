## reflow, repaint

<p>브라우저가 렌더링을 할 때 단계를 보면 DOM + CSSOM 이 생성이 되고 그 다음 render tree 가 생성되며, 이후 layout 조정을 한다. 이후 각 요소에 대한 색상을 설정하는 paint 과정을 거친 후에 마지막에 각각의 레이어에서 작업한 이 모든 것들을 complie 해주게 된다.</p><br />

<p>만약 js 이벤트에 의해 width 같은 속성이 변화하게 되면 위의 렌더 과정을 다시 실행하게 된다. CSSOM 의 변화가 있으니 당연한 결과라고 할 수 있다. 만약 애니매이션에 의해서 어떠한 요소의 width 값의 변화가 초당 프레임으로 표현하기 힘들 정도로 세세하게 일어난다면, 즉 기본 60프레임을 만족시키기가 어렵다면 이에 애니매이션 효과가 버벅이는 현상이 일어나게 된다.</p><br />

<p>이를 예방하는 방법으로는 특정 속성에 따라 reflow 와 repaint 를 생략하는 경우가 있는데, 바로 gpu 연산을 이용하는 속성인 transform 과 opacity 를 활용하는 방법이다.</p><br />

```js
const Test = styled.div`
  width: ${({ width }) => width}
  transition : width 0.25s ease
  `;

const Test = styled.div`
  width: 100%
  transform: scaleX(${({ width }) => width / 100});
  transition : transform 0.25s ease
  `;
```

<p>예시 코드이긴 하지만 기존에는 width 를 이벤트에 따라 변화를 주어서 처리하였는데 이렇게 되면 width 는 reflow 를 일으키게 되고 성능 저하가 발생하게 된다. 반면 transform 은 gpu 를 활용하는것이기에 거의 대부분 60프레임을 안정적으로 유지하고 메인 스레드도 크게 사용하지 않음을 performance 탭에서 확인할 수 있다.</p><br />
