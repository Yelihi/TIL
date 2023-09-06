const hooks = [];
// useState 와 createElement 와의 연결점 (정보공유용)
let currentComponent = -1;

export class Component {}

// 예도 클로저
// value 값을 return 되는 함수로 계속 변경
export function useState(initialValue) {
  // 외부 저장소
  // 근데 return 에서 currentComponents 를 사용하면 안됨 계속 바뀌니깐
  // 따라서 캡쳐링을 하자
  const position = currentComponent;

  // 최초 호출이라면
  if (!hooks[position]) {
    hooks[position] = initialValue;
  }

  return [
    // 마지막 저장 값
    hooks[position],
    (nextValue) => {
      hooks[position] = nextValue;
    },
  ];
}

//vdom 을 real-dom 으로 변경
function renderRealDOM(vdom) {
  if (typeof vdom === "string") {
    return document.createTextNode(vdom);
  }
  if (vdom === undefined) return;
  const $el = document.createElement(vdom.tagName);

  vdom.chidren.map(renderRealDOM).forEach((node) => {
    $el.appendChild(node);
  });

  return $el;
}

// 함수는 이전값을 가질 수 없다.
// 자바스크립트에서 이를 해결하는 방법 -> 클로저
export const render = (function () {
  // 클로저를 통해 이 위치를 만든다.
  let prevVdom = null;

  return function (vdom, container) {
    if (prevVdom === null) {
      prevVdom = vdom;
    }

    // diff 로직이 들어간다.(지금은 구현 안함)

    container.appendChild(renderRealDOM(vdom));
  };
})();

// jsx 구문을 쓰지 않을 경우
// 가변인자와 배열의 차이는?
// apply?
export function createElement(tagName, props, ...chidren) {
  // virtual DOM 만들기
  if (typeof tagName === "function") {
    // 클래스의 경우 프로토타입으로 함수와 구별
    if (tagName.prototype instanceof Component) {
      // 인스턴스를 생성한다. 실제로는 리엑트 내 다른 저장소에서 인스턴스 생성
      // 그래서 클래스 컴포넌트는 이 인스턴스로 상태를 만들고, 라이프사이클을 돌린다.
      // 그럼 훅은 어떻게 상태를 저장할 수 있는가?
      const instance = new tagName({ ...props, chidren });
      return instance.render();
    } else {
      // 함수 컴포넌트
      // 인덱스 지정
      currentComponent++;
      return tagName.apply(null, [props, ...chidren]);
    }
  }
  return { tagName, props, chidren };
}
