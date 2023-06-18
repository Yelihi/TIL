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

### what to test?

- Test component renders
- Test component renders with props
- Test component renders in different states
- Test component reacts to events

### what not to test?

- Implementation details
- Third party code
- Code that in not important from a user point of view

### RTL Queries

Every test we write generally involves the following basic steps

- Render the component
- Find an element rendered by the component
- Assert againist the element found in step 2 which will pass or fail the test

To render the component, we use the render method from RTL

For assertion, we use expect passing in a value and combine it with a matcher function from jest or jest-dom
<br />

Queries are the methods that Testing Library provides to find elements on the page

To find a single element on the page, we have

- getBy
- queryBy
- findBy

To find multiple elements on the page, we have

- getAllBy
- queryAllBy
- findAllBy

The suffix can be one of Role, LabelText, PlaceHolderText, Text, DisplayValue, AltText, Title and finally TestId

### getByRole

By default, many semantic elements in HTML have a role
<br />

Button element has a button role, anchor element has a link role, h1 to h6 elements have a heading role, checkboxes have a checkbox role, radio buttons have a radio role and so on
<br />

> **option**

- name : The accessible name is for simple cases qeual to
  - the label of a form element
  - the text content of a button or
  - the value of the aria-label attribute
- level
- hidden
- selected
- checked
- pressed

### getByLabelText

getByLabelText will search for the label that matches the given text, then find the element associated with that label

### getByPlaceholderText

getByPlaceholderText will search for all elements with a placeholder attribute and fin one that matches the given text

### getByText

getByText will search for all elements that have a text node with textContent matching the given text. Typically, you'd use this to find paragraph, div or span elements

### getByDisplayValue

getByDisplayValue returns the input, textarea, or select element that has the matching display value

### getByAltText

getByAllText will return the element that has the given alt text. This method only supports elements which accept an alt attribute like <img>, <input>, <area> or custom HTML elements

### getByTitle

getByTitle returns the element that has the matching title attribute

### getByTestId

getByTestId returns the element that has the matching data-testid attribute

### Priority Order for Queries

"Your test should resemble how users interact with your code (component, page, etc) as much as possible"
<br />

1. getByRole
2. getByLabelText
3. getByPlaceholderText
4. getByText
5. getByDisplayValue
6. getByAltText
7. getByTitle
8. getByTestId

### RTL getAllBy Queries

Find muliple elements in the DOM. getAllBy returns an array of all matching nodes for a query, and throws an error if no elements match

### TextMatch

TextMatch represents a type which can be either a

- string
- regex
- function

example
<br />

```js
screen.getByText(/hello/i);

// (content?: string, element?: Element | null) => boolean
screen.getByText((content) => content.startsWith("Hello"));
```

### queryBy and queryAllBy

queryBy

- Returns the matching node for a query, and return null if no elements match
- Useful for asserting an element that is not present
- Throws an error if more than one match is found
  <br />

queryAllBy

- Returns an array of all matching nodes for a query, and return an empty array if no elements match

### findBy and findAllBy

findBy

- Return a Promise which resolves when an element is found which matches the given query
- The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms

findAllBy

- Returns a promise which resolves to an array of elements when any elements are found which match the given query
- The Promise is rejected if no elements are found after a default timeout of 1000ms

### User Interactions

A click using a mouse or a keypress using a keyboard. Software has to respond to such interactions. Tests should ensure the interactions are handled as expected

### user-event

A companion library for Testing Library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.

<br />

It is the recommended way to test user interactions with RTL

### fireEvent vs user-event

fireEvent is a method from RTL which is used to dispatch DOM events.
<br />

user-event simulates full interactions, which may fire multiple events and do additional checks along the way.
<br />

For example, we can dispatch the change event on an input field using fireEvent.
<br />

When a user types into a text box, the change event on an input field using fireEvent.

<br />
When a user types into a text box, the element has to be focused, and then keyboard and input events are fired and the selection and value on the element are manipulated as they type.
<br />

user-event allows you to describe a user interaction instead of a concreate event. It adds visibilty and intractability checks along the way and manipulates the DOM just like a user interactions in the browser would. It factors in that the browser e.g. wouldn't let a user click a hidden element or type in a disabled text box

### Static analysis testing

All types of tests run the code and then compare the outcome against known expected outputs to see if everything works OK <br />

Static testing analyses aspects such as readability, consistency, error handling, type checking, and alignment with best practices <br />

Testing checks if your code works or not, whereas static analysis checks if it is written well or not

### Husky

Husky is a tool that helps imporve your commits and more
