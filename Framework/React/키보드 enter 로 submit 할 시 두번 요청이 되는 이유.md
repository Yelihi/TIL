## keyDown 이벤트 발동 시 한글에 한하여 두번 이벤트가 발생하는 경우

React 의 input 의 경우 직접 검색 버튼을 누르는게 일반적이긴 하지만, 채팅을 입력할 때 enter 키를 눌러 이를 대신하곤 한다. 상황에 따라서는 enter 키를 통한 입력이 훨씬 간편하고 직관적이기도 해서 이를 다루는 방법에 대해서 학습이 필요하다 생각한다. <br />

실제 실습 중 enter 키를 통해 할 일 목록을 추가하는 addTodo 함수를 실행시키고자 하였고, 로직상에는 큰 문제가 없어보였다. <br />

```tsx
const addTodoList = () => {
  // 입력값이 없다면 포커스만 맞추고 return 한다.
  if (value == "" && inputRef.current !== null) {
    inputRef.current.focus();
    return;
  }
  const newTodo: TodoListItem = {
    // ref 를 활용하여 ref.current++ 로 고유 id 를 생성할 수도 있다.
    id: Math.random() * 100,
    content: value,
    date: new Date().getTime(),
    isCheck: false,
  };
  setTodoList((prev) => [newTodo, ...prev]);
  setValue("");
};

const enterButton = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // 입력 key 가 "enter" 라면(혹은 13)
  if (e.key === "Enter") {
    addTodoList();
  }
};
```

<br />

영어로 Todo 내 content 를 작성하였을 때는 문제가 없었는데, 이상하게 한글로 작성을 하니 2번 이벤트가 실행이 되었다. (즉, 2번 중복되어 todo 부분이 저장되었다.)
<br />

원인을 찾아보면 IME(Input Method Editor)가 일으키는 문제라고 한다. IME는 한글이나 한자처럼 키보드 내에 적혀있는 문자만으로 모든 언어를 표현할 수 없을 때(예를 들면 한글은 모음과 자음이 결합하여 단어가 형성) 이 IME가 이러한 문자들을 조합하여 계산한 다음 입력시키는 시스템 소프트웨어다. <br />

반드시 필요한 시스템인데 이 과정에서 keyDown, keyUp 이벤트가 발생하면 OS 와 브라우저에서 해당 이벤트를 처리하기에 2번 이벤트가 발생하게 된다는 것이다. <br />

이를 해결하는 방안에는 조합 상태를 알 수 있게 해주는 KeyboardEvent.isComposing 의 boolean 값을 통해 가능하다. <br />

조합중일때는 말 그대로 isComposing 이 true 이며, 조합이 완료되면 false 가 된다. 실제 isComposing 을 console.log 로 확인하면 첫번째에는 true, 두번째에는 false 가 나오게 된다. <br />

따라서 아래와 같이 하나의 조건만 추가해주면 이벤트 중복을 막을 수 있다. <br />

```tsx
const enterButton = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.nativeEvent.isComposing) return; // 조합중이라면 return;
  if (e.key === "Enter") {
    addTodoList();
  }
};
```

<br />

React 에서 접근할 시 주의할 점은 event 객체에서 바로 isComposing 을 접근할 수 없다는 점이다. 위 처럼 nativeEvent 프로퍼티를 타고 들어가 접근할 수 있다.
