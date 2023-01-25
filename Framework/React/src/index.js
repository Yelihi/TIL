// 아래는 지시어인데, 즉 jsx 파일을 createElement 메서드로 처리하겠다는 의미이다.
// 여기에 이름을 변경하면 실제 변경된 메서드로 처리가 된다.
/* @jsx createElement */
import { createElement, render, Component, useState } from "./react.js";

//클래스는 인스턴스를 생성해야 한다.
class YourTitle extends Component {
  render() {
    return <p>클래스의 타이틀</p>;
  }
}

function Title() {
  return (
    <div>
      <h2>정말 동작할까</h2>
      <YourTitle />
      <p>한번 확인해보자</p>
    </div>
  );
}

console.log(Title());
render(<Title />, document.querySelector("#root"));

// 어차피 vdom -> realdom 랜더링 할시, 함수형 컴포넌트는 매번 갯수와 순서가 같다. 어느 위치에 함수들의 순서와 위치를 저장해놓고, 나중에 이 저장위치에
// 상태를 저장해놓으면, 나중에 함수컴포넌트에서 상태 넘겨달라고 하였을 때 위치를 찾아서 상태를 넘겨주면 된다.
