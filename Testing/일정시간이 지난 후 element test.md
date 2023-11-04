## 화면이 일정 시간이 지나야 성공적으로 렌더링되어, 그 이후 테스트를 진행해야 하는 경우

프로젝트에서 저장된 의류들의 리스트를 보여주는 Store 페이지에 대한 테스트 코드를 작성중이었다. 실제 페이지가 렌더링이 될 때, count 라이브러리를 통해 의류의 갯수, 총액 등 숫자 데이터를 (타이머의 숫자가 올라가는 것 마냥) 점진적으로 증가되는 효과를 적용하였다. <br />

1~2초 사이에 최종적인 수량 데이터가 렌더링되는데, 이러한 특징 때문에 실제 테스트 코드를 작성할 시 문제가 발생하였다. <br />

테스트에서는 최종적으로 렌더링 되는 수량 데이터가 화면에 렌더링 되었는지를 확인하고자 하는데, 실제 화면에서는 일정 시간 이후 최종 데이터가 화면에 띄어지게 된다. <br />

```tsx
describe('Store', () => {
  it('desktop 환경에서 성공적으로 렌더링된다', async () => {
    const TestStore = await MakeStore([t.LOAD_ITEMS_REQUEST]);

    renderWithProvider(<Store device='desktop' />, { store: TestStore });

    const IntergratedData = await screen.findAllByTestId(/ProcessIntergratedData/i);

    await waitFor(() => {
      ['10', '1,125,000', 'Outer'].forEach((item, idx) => {
        expect(IntergratedData[idx]).toHaveTextContent(item);
      });
    });

  });

```

<br />

로딩되는 시간이 걸리는 것이라면 async await 을 통해 실제 최종 데이터값이 렌더링 될 때까지 기다리는 방식은 어떨까 하여 위처럼 테스트코드를 작성하였는데, 결과는 테스트 실패였다. <br />

오류는 다음과 같은 메시지를 보여준다. <br />

```
Expected element to have text content:
  1,125,000
Received:
  1,043,691
```

<br />

숫자를 보아하니, 테스트 시점에서의 CountUp 되는 수치가 1043691 이며 (계속 상승중..) 이는 최종 수치인 1125000 과의 차이점을 보이게 된다. 즉, 어느정도 시간을 기다린 다음에 확인을 해야한다는 것을 알 수 있다. <br />

방법을 찾아보다가 분명 어떠한 페이지에서는 setInterval 이나 setTimeout 을 사용하는 케이스가 있을 것이고, 이러한 경우 jest 에서 어떤 해결책을 제시해주는지 집중해서 검색해보았고, 이에 jest.advanceTimersByTime 을 통해 설정 시간만큼의 텀을 만들 수 있었다. <br />

```tsx

jest.useFakeTimers(); // fakeTimers 설정을 먼저 해주자

describe('Store', () => {
  it('desktop 환경에서 성공적으로 렌더링된다', async () => {
    const TestStore = await MakeStore([t.LOAD_ITEMS_REQUEST]);

    renderWithProvider(<Store device='desktop' />, { store: TestStore });

    const IntergratedData = await screen.findAllByTestId(/ProcessIntergratedData/i);

    // 주의할 점은 렌더링 과정에 변화를 주는것이기에 act() 로 감싸주는 것을 잊지말자.
    act(() => {
      jest.advanceTimersByTime(3000); // 3초 동안의 텀을 둔다.
    });

    await waitFor(() => {
      ['10', '1,125,000', 'Outer'].forEach((item, idx) => {
        expect(IntergratedData[idx]).toHaveTextContent(item);
      });
    });

  });

```

<br />

타이머 설정을 통해 테스트가 성공적으로 통과되었다. 참고로 FakeTimer 는 말 그대로 fake 인데, 자바스크립트 내 실제 타이머처럼 실제 시간이 흐른 뒤 실행이 아니라, 마치 설정해둔 시간이 흘럿다고 가정하고 그 다음 콜백 함수들이 실행이 되는것이니 실제 테스트 실행 시간에는 영향을 끼치지 않는다.
