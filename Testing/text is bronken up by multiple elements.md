## Text is broken up by multiple elements

만약 테스트 하는 컴포넌트가 이런 구조의 렌더링을 시도한다고 가정해보자 <br />

```tsx
// Hello.tsx

return (
  <div>
    <p data-testid='paragraph'>
      hello <strong>World</strong>
    </p>
  </div>
);
```

<br />

흔히 사용할 수 있는 코드이며 보통 위 코드의 렌더링을 테스트할 때 테스트아이디가 제대로 렌더링 되거나 혹은 그냥 getByText 를 통해 hello world 를 렌더링하는지 확인하면 된다.
<br />

```tsx
// test.tsx

it("rendering correctly", () => {
  render(<Hello />);

  const TextElement = screen.getByText(/hello world/i);
  expect(TextElement).toBeInTheDocument();
});

// error: Unable to find an element with the text: Hello world. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.
```

<br />

간단하게 테스트 될 것이라 생각했지만, 실제 실행 결과 위 주석과 같은 에러가 발생하게 된다. 해석을 해보면 그 이유를 알 수 있는데, hello world 라는 문구가 단순히 하나의 태그내 포함된 것이 아니기 때문이다. <br />

world 라는 단어는 strong 태그 내부에 존재하며 그렇기에 hello world 라는 전체 문구를 찾을 수 없다는 에러가 발생한다.

### 해결책

공식 github issue 란에서도 같은 이슈를 제기되어있었는데, 이에 대한 답변으로 한 stackoverflow 의 답변을 알려주었다. <br />

<a href="https://stackoverflow.com/questions/55509875/how-to-query-by-text-string-which-contains-html-tags-using-react-testing-library" target="_blank">링크</a>

<br />

직접 getByText 메서드를 수정하여 사용하는 방법이 있는데, 타입 오류 및 반환값에 대한 의문(분명 return 은 boolean 타입인데 어떻게 HTMLElement 를 반환한다는지 해석이 안되서...)이 있어서 이 방식 대신, toHaveTextContent 를 사용하였다.
<br />

이미 난 jest-dom 이 설치되어있기에 사용할 수 있었기에 변경해주어서 해결할 수 있었다.
