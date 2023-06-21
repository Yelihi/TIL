// 불변성
// immer 라는 라이브러리에서 들어볼 수 있었을 것이다
// 상황에 따라 다르지만 불변성을 지켜줘야 할 때가 있다.

const originArray = ["123", "456", "789"];

const newArray = originArray;

originArray.push(10);
originArray.push(11);
originArray.push(12);
originArray.unshift(0);

console.log(newArray); // 모두 반영되어있다.

// 배열을 복사하면 알아서 해결한다. [...originArray]

// map, slice, 등등
