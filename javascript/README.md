<h2 align="center"> Javascript </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2023.1.3](#2023-1-3)

  <br />

![--------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="프로젝트소개"> :book: 간단한 요약 정리 </h2>

## 2023-1-3

### Array.prototype.sort()

- sort 메서드는 기본적으로 오름차순으로 정렬을 해준다. 또한 배열의 프로토타입 메서드이기에 배열에서 사용이 가능하다.
- 숫자만 되는것이 아니라 문자 역시 가능하고, 특수문자가 포함된것도 가능하다.
- 다만 사용자에 맞게 커스텀하게 사용이 가능한데, sort(func(a,b))) 처럼 내부 함수를 정의하여 순서를 처리해줄 수 있다.
- 인자 a,b 는 각각 배열의 인덱스 0,1 / 1,2 / 2,3 순으로 적용이 된다.
- 이 메서드의 return 값은 원본 배열이다. 새로운 배열을 return 하는것이 아닌것에 주의를 하자.

```js
arr.sort([compareFunction]);
```

- 내부 함수는 compareFunction 으로서 말 그대로 인자의 비교 함수
- 내부함수를 설정하지 않으면 요소를 문자열로 변환하고 유니 코드 코드 포인트 순서로 문자열을 비교하여 정렬된다.
- 주의할점은 숫자 또한 문자열로 변환한뒤 순서를 조정하기에 9보다 80이 앞에오는 상황이 발생한다.

```js
let arr = ["a", "c", "b"];
arr.sort(); // ['a','b','c']
```

- compareFunction(a,b) 에서 return 이 0보다 작다면 a 가 더 작은 index로 인식된다.
- 1 과 2 를 생각할때 우리가 당연하게 1보다 2가 크지 라고 생각하는것처럼 작동하는것이 아니다.
- 1과 2를 통하여 어떠한 로직을 실행시키고 그것에 대한 return 값이 음수라면 1을 2보다 작게 판단한다는 의미다.
- 그렇기 때문에 보통 오름차순을 사용할 때 sort((a,b) => a-b) 로 표현하는 것이다.
- 이 내부함수의 return 값이 음수라는 것은 a가 b 보다 작을 때 발생하는 것일 테고, 의도한대로 나열이 될 것이다.
- 반대로 compareFunction(a,b) 에서 return 이 0보다 크다면 a 가 더 큰 index로 인식된다.

```js
compareFunction(a,b){
  if(a - b < 0){
    return -1
  }
  if(a - b > 0){
    return 1
  }
  if(a == b){
    return 0
  }
}
```

- 주목할 점은 sort 는 index 순서를 결정하는 메서드다. 인자(숫자일경우)의 큰수 작은수의 값을 비교하는 것이 아니다.
- return 값이 0 이라면 서로의(a,b) index 를 변경하지 않는다. 0 일 경우 다른 로직을 주어서 또 다른 index 나열을 결정할 수 있다.
- 예시로서 단어의 특정 index 를 기준으로 정렬하되, 만약 특정 index 의 문자가 같다면 전체 단어의 순서대로 정렬하는 문제다.

```js
function solution(strings, n) {
  let answer = strings.sort((a, b) => {
    // 특정 인덱스의 문자가 같다면, 문자를 비교하여 오름차순으로 정렬
    if (a[n] === b[n]) {
      if (a < b) {
        return -1;
      }
      return 1;
    }
    // 특정 인덱스의 문자에 대해 오름차순 정렬
    if (a[n] < b[n]) {
      return -1;
    }
    return 1;
  });
  return answer;
}
```

<br />

### .isNaN() & Number.isNaN()

<p>기본적으로 NaN 은 산술연산이 정의되지 않았거나 수로 표현할 수 없는 결과를 도출하면 생성되게 된다. NaN 을 판별하는 방법은 다음과 같다</p>

- 둘 다 NaN 인지 아닌지를 판별해주는 메서드이다.
- 사실 NaN === NaN 이 false 라는 것을 이용해서 함수를 활용할 수도 있다.

```js
function validNaN(v) {
  return v !== v; // true 이면 NaN 이다.
}
```

- 기본적으로 typeOf 로 NaN 을 구별하는것은 좋지 않기에, 위 두 메서드를 활용한다
- isNaN(a) 의 경우 a 를 강제로 Number 타입으로 변환시킨 뒤, NaN 인지 아닌지를 판단한다. NaN 이면 true, 아니면 false 를 반환한다.
- isNaN의 경우 주로 코딩테스트일때 조건문으로 활용하곤 하였는데, 왜냐하면 자동적으로 a 를 Number(a) 적용시키면서 NaN 여부를 따지기 때문이다.
- 예를 들어 '1234a' 의 경우 숫자 타입이 아님에도 불구하고, Number('1234a') 가 NaN 이기 때문에 true 를 반환한다.
- 반면 Number.isNaN(a)는 더 엄격하게 적용되는데, a 가 우선 숫자 타입이여야 한다. 위 예제처럼 아니라면 무조건 false 가 반환된다.
