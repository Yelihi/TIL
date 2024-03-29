## .isNaN() & Number.isNaN()

<p>기본적으로 NaN 은 산술연산이 정의되지 않았거나 수로 표현할 수 없는 결과를 도출하면 생성되게 된다. NaN 을 판별하는 방법은 다음과 같다</p>

- 둘 다 NaN 인지 아닌지를 판별해주는 메서드이다.
- 사실 NaN === NaN 이 false 라는 것을 이용해서 함수를 활용할 수도 있다. 그리고 이게 Number.isNaN() 보다도 더 정확하다. 되도록이면 이걸로 하자.

```js
function validNaN(v) {
  return v !== v; // true 이면 NaN 이다.
}
```

- 기본적으로 typeOf 로 NaN 을 구별하는것은 좋지 않기에, 위 두 메서드를 활용한다
- isNaN(a) 의 경우 a 를 강제로 Number 타입으로 변환시킨 뒤, NaN 인지 아닌지를 판단한다. NaN 이면 true, 아니면 false 를 반환한다.
- isNaN의 경우 주로 코딩테스트일때 조건문으로 활용하곤 하였는데, 왜냐하면 자동적으로 a 를 Number(a) 적용시키면서 NaN 여부를 따지기 때문이다.
- 예를 들어 '1234a' 의 경우 숫자 타입이 아님에도 불구하고, Number('1234a') 가 NaN 이기 때문에 true 를 반환한다.
- 반대로 '123' 의 경우 문자열이기 때문에 참이 떠야하는데, Number('123') 이 123 이 되어버리기에 isNaN('123') 은 false 가 된다. 햇갈린다
- 그래서 이런 경우들이 발생한다.

```js
// 문자열
isNaN("37"); // 거짓: "37"은 NaN이 아닌 숫자 37로 변환됩니다
isNaN("37.37"); // 거짓: "37.37"은 NaN이 아닌 숫자 37.37로 변환됩니다
isNaN("123ABC"); // 참: parseInt("123ABC")는 123이지만 Number("123ABC")는 NaN입니다
isNaN(""); // 거짓: 빈 문자열은 NaN이 아닌 0으로 변환됩니다
isNaN(" "); // 거짓: 공백이 있는 문자열은 NaN이 아닌 0으로 변환됩니다
```

- 반면 Number.isNaN(a)는 더 엄격하게 적용되는데, a 가 우선 숫자 타입이여야 한다. 위 예제처럼 아니라면 무조건 false 가 반환된다.
