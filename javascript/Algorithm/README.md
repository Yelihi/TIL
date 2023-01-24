<h2 align="center"> Algorithm </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2023.1.12](#2023-1-12)
- [2023.1.20](#2023-1-20)
- [2023.1.24](#2023-1-24)

  <br />

![--------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="프로젝트소개"> :book: 간단한 요약 정리 </h2>

## 2023-1-12

### 자바스크립트의 문자열

- String 에는 널리 사용할 수 있는 다양한 문자열 함수가 있다.

```js
"dog".charAt(1); // 'o'
```

- 문자열 접근을 위해 지정된 인덱스 사이의 문자들을 반환하는 메서드
- 두번째 메개변수를 전달하지 않으면 지정된 시작 위치부터 끝까지의 모든 문자값을 반환한다.

```js
"Youtube".substring(3, 7); // 'tube'
"Youtube".substring(1); // 'outube'
```

### 문자열 비교

```js
let a = "a";
let b = "b";
console.log(a < b); // true

let a = "add";
let b = "b";
console.log(a < b); // true

let a = "add";
let b = "ab";
console.log(a < b); // false
```

- 예시를 보면 알 수 있듯이, 자바스크립트에서는 미만 연산자와 초과 연산자로 비교가 가능
- 정렬 알고리즘에서 유용하게 사용된다.
- 만약 다른 문자열끼리의 비교라면 맨 왼쪽부터 한글자 한글자 비교를 한다.
- 그래서 add < b 가 성립하는것은 a 와 b 를 비교하였기 때문이다.
- 맨 마지막은 ad 와 ab 를 비교하였기에 false 가 나왔다.

### 문자열 검색

- 어떤 특정 문자열이 존재하는지 확인하려면 indexOf 를 활용하고, -1 인지 아닌지로 구별이 가능하다.

```js
function existsInString(stringValue, search) {
  return stringValue.indexOf(search) !== -1;
}

console.log(existsInString("red", "r")); // true
console.log(existsInString("red", "b")); // false
```

- 이를 활용하면 문자열에서 특정 문자의 갯수를 셀 수 있다.

```js
let str = "He is my king from this day until his last day";
let count = 0;
let pos = str.indexOf("a");
while (pos !== -1) {
  count++;
  pos = str.indexOf("a", pos + 1); // pos 위치 다음 오른쪽부터 a 검색
}
```

- 마지막으로 startWith, endsWiths 가 있다. 특정문자열로 시작하는지 끝나는지를 불리언으로 나타내준다.

### 문자열 분해

- 문자열을 여러 부분으로 나누기 위해 split를 사용할 수 있다.

```js
let test1 = "chicken";
test1.split(""); // ['c','h','i','c','k','e','n']
```

### 문자열 바꾸기

- replace(string, replaceString)

```js
"Wizard of Oz".replace("Wizard", "Witch"); // "Witch of Oz"
```

### 정규 표현식

<p>정규 표현식은 검색 패턴을 정의한 문자열의 집합이다. 자바스크립트에서는 정규 표현식에 사용할 수 있는 기본 객체 RegExp가 포함된다. RegExp의 생성자가 받는 매개변수에는 필수 매개변수인 정규 표현식과 선택 매개변수인 일치 관련 설정이 있다.</p>

- i : 대소문자를 구분하지 않고 일치하는 문자열을 검색
- g : 전역적으로 일치하는 문자열을 검색한다.
- m : 다중열 문자열에 대해서도 일치하는 문자열을 검색한다.

<p>RegExp에는 다음 두가지 함수가 있다</p>

- search() : 문자열 내에 일치하는 문자열을 찾는다. 일치하는 문자열의 인덱스를 반환한다.
- match() : 일치하는 문자열을 찾는다. 모든 일치하는 문자열을 반환한다.

<p>자바스크립트 String 객체에는 정규 표현식과 관련된 다음 두 가지 함수가 있는데 두 함수는 RegExp 객체를 인자로 받는다.</p>

- exec() : 문자열 내에 일치하는 문자열을 찾는다. 일치하는 첫 번째 문자열을 반환한다.
- test() : 문자열 내에 일치하는 문자열을 찾는다. true 또는 false 를 반환한다.

<p>다음은 기본 정규 표현식이다.</p>

- ^ : 문자열/줄의 시작을 나타낸다.
- \d : 모든 숫자를 나타낸다.
- [abc] : 괄호 내의 모든 문자를 찾는다
- [^abc] : 괄호 내의 문자들을 제외한 모든 문자를 찾는다.
- [0-9] : 괄호 내의 모든 숫자들을 찾는다.
- [^0-9] : 괄호 내의 숫자들을 제외한 모든 숫자를 찾는다.
- (x|y) : x 또는 y 를 찾는다.

### 자주 사용하는 정규표현식

- 숫자를 포함하는 문자 : /\d+/
- 숫자만 포함하는 문자 : /^\d+$/
- 부동소수점 문자 : /^[0-9]_.[0-9]_[1-9]+$/
- 숫자와 알파벳만을 포함하는 문자 : /[a-zA-Z0-9]/
- 질의 문자열 : /([^?=&]+)(=([^&]\*))/

```js
let uri = "http://your.domain/product.aspx?category=4&product_id=2140&query=lcd+tv";
let queryString = {};
uri.replace(new RegExp("/([^?=&]+)(=([^&]*))/", "g"), function ($0, $1, $2, $3) {
  queryString[$1] = $3;
});
// {category: '4', product_id: '2140', query: 'lcd+tv'}
```

### 문자열 단축(인코딩 및 디코딩)

<p>기본적으로 base64 인코딩 및 디코딩은 각각 btoa(), atob() 메서드를 활용한다.이 외 문자열 단축 알고리즘을 알아보자</p>

- 정수기반 ID 를 base64 인코딩을 사용해 문자열로 단축시킬 수 있다.

```js
let DICTIONARY = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

function encodeId(num) {
  let base = DICTIONARY.length;
  let encoded = "";

  if (num === 0) {
    return DICTIONARY[0];
  }

  while (num > 0) {
    encoded += DICTIONARY[num % base];
    num = Math.floor(num / base);
  }

  return reverseWord(encoded);
}

function reverseWord(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str.charAt(i);
  }
  return reversed;
}

function decodeId(id) {
  let base = DICTIONARY.length;
  let decoded = 0;

  for (let index = 0; index < id.split("").length; index++) {
    decoded = decoded * base + DICTIONARY.indexOf(id.charAt(index));
  }

  return decoded;
}
```

## 2023-1-20

### 재귀

<p>재귀는 그 자신에 관해 정의한 것이 발생하는 것을 나타낸다. 즉 컴퓨터에선 자기 자신을 호출하는 함수를 재귀함수라고 한다. 재귀함수는 분할정복이라는 개념을 통해 문제를 해결해나간다. 즉 상위 문제에서 자신을 호출할 수록 하위 문제로 넘어가며 기저조건이 발동되는 시점부터 천천히 다시 상위로 퍼져나간다.</p><br />

<p>하지만 기저조건을 제대로 설정해주지 않느다면 스택 오버플로(콜 스택의 최대 개수가 제한된 양의 주소 공간을 초과)가 발생을 하게 된다. 그렇기에 기저조건은 중요하다.재귀는 이해하기 어려워 많은 예제를 통해 감을 익혀가는 것이 좋다.</p>

> **피보나치 수열** > <br />

```js
function getNthFibo(n) {
  if (n <= 1) {
    return n;
  }
  return getNthFibo(n - 1) + getNthFibo(n - 2);
}
```

- 문제는 이러한 재귀함수 시 O(2^n)이라는 많은 시간복잡도를 가지게 된다.
- (아직 난 잘 못하겠지만)피보나치의 갱신 부분을 살펴보면서 수정이 가능하다.
- (lastlast, last) = (last, lastlast+last)

```js
function getNthFibo(n, lastlast, last) {
  if (n == 0) {
    return lastlast;
  }
  if (n == 1) {
    return last;
  }
  return getNthFibo(n - 1, last, lastlast + last);
}
```

- 시간복잡도는 O(n)이다.
  <br />

> **파스칼의 삼각형** > <br />

<p>파스칼의 삼각형은 어떤 항목의 값이 해당 항목의 위쪽 두 개 항목과 함친 삼각형이다.</p>

- 기저조건: 기저조건은 최상위 숫자 1 (row = col = 1)이다. 그래서 열이 1이면 1을 반환하고 행이 0이면 0을 반환한다.
- 분할정복: 파스칼의 삼각형의 수학적 정의에 따르면 파스칼의 삼각형은 이전 열의 행과 그 행에서 1만큼 추가된 인덱스가 가리키는 값이다.
- pascalTriangle(row -1, col) + pascalTriangle(row-1, col-1)

```js
function pascalTriangle(row, col) {
  if (col === 0) {
    return 1;
  } else if (row === 0) {
    return 0;
  } else {
    return pascaltriangle(row - 1, col) + pascaltriangle(row - 1, col - 1);
  }
}
```

### 재귀의 빅오 분석

> **점화식** > <br/>

<p>반복 루프를 사용해 구현된 알고리즘의 경우 빅오 분석이 훨씬 간단하다. 하지만 재귀의 경우 계산이 복잡해진다. 점화식으로 판단하게 된다. 이를 마스터정리라고 한다.</p>

> **a>=1 이고 b>=1 인 T(n) = aT(n/b) + O(n^c)형태의 점화식이 있을 때, 세가지경우가 존재한다.**

- 경우 1: c < logb(a)이면 O(n^(logb(a)))) 이다.
- 경우 2: c = logb(a)이면 O((n^c)\*log(n)) 이다.
- 경우 3: c > logb(a)이면 O(f(n)) 이다.
  <br/>

- 예를 들어서 a가 8 이고 b 가 2, c 가 2라면
- log2(8) = 3, c < 3 을 만족한다.
- 따라서 결과는 n^3 이 된다.
- 이런식으로 계산을 할 수 있다.
