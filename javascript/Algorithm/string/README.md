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
