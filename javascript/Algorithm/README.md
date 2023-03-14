<h2 align="center"> Algorithm </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2023.1.12](#2023-1-12)
- [2023.1.20](#2023-1-20)
- [2023.1.24](#2023-1-24)
- [2023.3.14](#2023-3-14)

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

## 2023-1-24

### 집합(Set)

<p>집합을 다루기 위해서는 자바스크립트의 기본 set 을 활용하면 된다. 그전에 집합에 대해서 먼저 살펴보자</p>

> **집합**

<p>집합은 유한하고 구분되는 객체들의 그룹이다. 집합은 정렬되지 않은 유일한 항목들의 그룹이다. 집합은 O(1) 상수 시간에 유일한 항목을 확인하고 추가할 수 있기 때문에 중요하다. 집합이 상수 시간 연산이 가능한 이유는 구현이 해시 테이블의 구현을 기초로 하기 때문이다.</p>

```js
let exampleSet = new Set();
```

- 기본 객체에는 속성이 하나 존재한다. 그게 바로 size(집합내의 현재개수)

### 집합 연산

<p>집합은 항목이 유일한지 확인할 수 있는 강력한 자료구조이다</p>

> **삽입**

```js
let exampleSet = new Set();
exampleSet.add(1);
exampleSet.add(1);
exampleSet.add(2); // Set: {1, 2}
```

- 결과에서 알 수 있듯이, 중복으로 추가해도 중복되지않는다.
- 항목을 삽입하는 시간 복잡도는 O(1)

> **삭제**

```js
let exampleSet = new Set();
exampleSet.add(1);
exampleSet.delete(1); // true
exampleSet.add(2); // Set: {2}
```

- delete 는 불리언을 반환한다. 삭제됬다면 true, 아니라면 false 를 반환한다
- 삭제 역시 시간복잡도는 O(1) 이다. 보통 O(n)을 차지하는것에 비하면 아주 유용하다

> **포함**

```js
let exampleSet = new Set();
exampleSet.add(1);
exampleSet.has(1); // true
exampleSet.has(2); // false
exampleSet.add(2); // set: {1, 2}
exampleSet.has(2); // true
```

- has 는 항목이 존재하는지 불리언으로 반환한다
- 역시 시간복잡도는 O(1) 이다.

### 기타 유틸리티 함수

> **교집합**

```js
function intersectSets(setA, setB) {
  let intersect = new Set();
  for (let elem of setA) {
    if (setB.has(elem)) {
      intersect.add(elem);
    }
  }

  return intersect;
}
```

- 간단하다. 교집합이 될 부분을 생성한다
- 이후 첫번째 집합을 반복하여 돌면서, 만일 각 요소가 두번째 집합에 포함된다면(has)
- 교집합에 그 요소를 집어넣는다

> **상위 집합 여부 확인**

<p>어떤 집합이 다른 집합의 모든 항목들을 포함하는 경우 해당 다른 집합의 상위 집합이다. 상위 집합인지를 확인하는 함수이다.</p>

```js
function isSuperSet(setA, superSet) {
  for (let elem of setA) {
    if (!superSet.has(elem)) {
      return false;
    }
  }

  return true;
}
```

- 역시 간단하다. 작은 부분함수를 전체 반복돌면서
- 상위 집합에 각 요소들이 포함하는지 파악하고, 하나라도 포함하지 않는다면 false 를 반환하면 된다.

> **합집합**

<p>양쪽 집합의 항목을 합친다. 중복이 안되기 때문에 그냥 돌면서 합치면 된다.</p>

```js
function unionSet(setA, setB) {
  let unionSet = new Set(setB);
  for (let elem of setA) {
    unionSet.add(elem);
  }
  return unionSet;
}
```

- 새로운 setB를 생성하고, setA 의 요소를 순차적으로 합쳐주자

> **차집합**

<p>차집합은 사실 합집합에서 한쪽 집합을 제거하면 그게 차집합이다. 어차피 delete 를 사용하면 알아서 불리언으로 작업이 갈리기 때문에 간단하다</p>

```js
function differenceSet(setA, setB) {
  let differSet = new Set(setA);
  for (let elem of setB) {
    differSet.delete(elem);
  }

  return differSet;
}
```

- 그냥 빼주면 된다

<p>집합은 정렬되지 않은 유일한 항목들을 나타내는 근간이 되는 자료구조이다. set 에 해당하는 모든 연산들은 시간복잡도가 O(1)이다. 이후에는 집합 연산들을 이용해서 유일성 여부를 빠르게 확인하는 알고리즘을 구현한다.</p>

### 검색과 정렬

> **검색**

<p>검색은 자료내에 특정한 갑을 찾는 과정이다. 예를 들어 배열에 어떠한 값을 찾는다고 할 때 가장 일반적으로 생각할 수 있는것은, 완전하게 전체를 돌면서 탐색하는과정이다. 이 과정에서 원하는 값을 얻게 되었다면 반환을 하는 과정이다. 이러한 방식 말고도 검색을 하는데 좀 더 효율적인 방식이 있고 그것에 대한 제한사항도 있으니 이번에 한번 살펴보자</p>

- 선형 검색 : 배열의 각 항목을 한 인덱스씩 순차적으로 접근하면서 동작한다. 정렬여부는 관계없다
- 이진 검색 : 중간 값을 확인하고 이 중간값과 검색값의 범위를 좁혀가는 방식. 정렬이 되어있어야 한다

> **선형 검색**

```js
function linearSearch(array, n) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === n) {
      return true;
    }
  }
  return false;
}
```

- 완전 간단하다. 전체를 돌면서 검색값을 확인한다.
- 최악의 경우 전체를 다 순회해서 찾아야 하기 때문에 시간복잡도는 O(n) 이다.
- 배열의 정렬여부는 관계가 없기 때문에 편리하다.

> **이진 검색**

<p>이진검색은 배열이 정렬되어있다는 조건 하에 시도할 수 있다. 우리가 사전에서 용어를 찾을 때 이미 자연스럽게 이진 검색을 활용하고 있는것이다. level 이라는 단어를 찾을 때 가장 먼저 무엇을 하는가. l 을 찾기위해 대략 중간지점까지 페이지를 열고, 만약 l 이 아니라 o 였다면 더 전 페이지를 검색할 것이다. 즉 첫 페이지부터 검색하지않는다.</p>

```js
function binarySearch(array, n) {
  let firstindex = 0;
  let lastindex = array.length - 1;

  while (firstindex <= lastindex) {
    let middleindex = Math.floor((firstindex + lastindex) / 2);

    if (array[middleindex] == n) {
      return middleindex;
    } else if (array[middleindex] < n) {
      firstindex = middleindex + 1;
    } else if (array[middleindex] > n) {
      lastindex = middleindex - 1;
    }
  }
  return -1;
}
```

- 검색 과정을 그대로 함수로 옮겨 적은 것이다.
- 첫번째 인덱스와 마지막 인덱스를 지정하고, 그 중간 인덱스를 계산한다
- 이후 그 중간 인덱스에 속한 숫자가 검색값과 어떠한 차이를 보이는지에 따라 검색 범위를 설정한다
- 예를 들어 9를 찾고 싶은데, 중간 인덱스 값이 5라고 하면, 이제 검색 범위는 중간인덱스에서 하나 더 증가한 인덱스가 최소인덱스가 된다.
- 이 과정을 통해 만약 최소인덱스와 최대 인덱스가 같아지거나 역전되면, 검색이 끝난것이기에 만일 같은값이 없다면 -1 을 반환한다.

> **정렬**

<p>앞에서 이진 검색은 정렬된 배열에서만 사용이 가능하다고 하였다. 이처럼 정렬된 데이터는 다른 알고리즘에서 아주 유용하게 활용 될 수 있다.</p>

> **거품 정렬**

<p>되도록이면 사용하지 말아야 하는 최악의 알고리즘이다.</p>

- 우선 전체 배열을 순회해야 한다.
- 첫번째 인자와 두번째 인자를 비교하고 정렬이 안되있다면 위치를 변경한다
- 이후 두번째 인자와 세번쩨 인자를 비교하면서 조건을 따진다
- 이렇게 첫번째 배열을 순회한뒤, 두 번째 부터는 맨 마지막 인덱스를 제외한 나머지 배열에서 같은 작업을 반복한다

```js
// 두 원소를 교환하는 함수
function swap(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

// 배열을 돌면서 정렬한다
function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j <= i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, i, j);
      }
    }
  }
  return array;
}
```

- 언급하였듯이 최악의 정렬방법이다
- 시간복잡도는 O(n^2) 이다.

> **선택 정렬**

- 조금 더 나을 뿐 다를건 없다.
- 첫번째 인덱스부터 시작하여 각각 배열내 최소값을 찾는 과정이다
- 인덱스가 0 일때는 당연하게도 전체 배열에서 최소값을 찾은 후 인덱스 0 위치에 대입한다
- 두번째는 인덱스 1부터 배열 끝까지 중 최소값을 검색하고, 이후 최소값을 인덱스 1 위치에 대입한다
- 이런식으로 진행을 하게 된다.

```js
function swap(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

function selectSort(array) {
  let min;

  for (let i = 0; i < array.length; i++) {
    min = i;
    for (let j = i; j < array.length; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }
    if (min != i) {
      swap(array, i, min);
    }
  }

  return array;
}
```

- 역시나 중첩문이기 때문에 O(n^2) 이다.

> **삽입 정렬**

<p>삽입 정렬은 정렬된 인덱스와 정렬되지 않은 인덱스를 구별하여, 정렬되지 않은 인덱스를 순차적으로 돌면서 정렬된 값들과 하나하나 비교를 하게 되며, 이후 자리를 잡게 되어 정렬된 인덱스에 포함이 된다. 말로 하려니깐 뭔가 설명이 안되니 수식을 살펴보자</p></br />

<p>기본적으로 외부 순환은 정렬되지 않은 부분이며, 내부 순환은 정렬된 부분이라고 생각하자.</p>

```js
function insertSort(array) {
  let value;
  let i;
  let j;
  // 인덱스 0번째는 정렬되었다고 가정하겠다
  for (i = 1; i < array.length; i++) {
    value = array[i];

    for (j = i - 1; j >= 0 && array[j] > value; j--) {
      array[j + 1] = array[j];
    }
    array[j + 1] = value;
  }
  return array;
}

console.log(insertSort([6, 1, 23, 4, 2, 3]));
```

- 시뮬레이션을 돌려보는게 이해가 쉽다
- 우선 정렬된 부분인 시작인 6이다. (j = 0)
- 정렬되지 않았다 가정하는 부분부터 순회를 시작한다 (i = 1)
- 정렬되지 않은 부분 1은 j = 0이고 array[0] > 1 이기에 내부 순환을 만족한다
- 이제 array[1](1) 에 array[0](6) 을 대입한다
- 이렇게 되면 현재는 6,6,23,4,2,3 이렇게 된다
- 다음 j 는 감소하여 0에서 -1이 되고 내부 순환 조건을 만족하지 않는다
- 따라서 다시 나와 array[-1+1] = array[0] = 6 을 value = 1 로 변경해준다.
- 이렇게 되니 결과는 1,6,23,4,2,3 식으로 변하게 되며, 전체 순환인 i 는 2로 증가한다.
- 이 말은 0~1번째까지는 정렬이 된 배열로 보겠다는 의미이며 곧 내부 순환에서 검증하게 될 부분이다.
- 한번만 더 해보면 이제 23을 value 에 저장한다
- 이후 j 는 1 이기에 내부순환을 만족하지만 array[1] = 6 < value = 23 이므로 내부순환을 돌지 않는다
- 따라서 j는 여전히 1이고, 이제 array[1+1] = value 를 하게 되면 동일하게 23이 들어간다
- 그래서 1,6,23,... 이 유지되며 정렬된 배열은 인덱스 2까지 확장된다.

> **빠른 정렬(퀵소트)**

<p>기준점인 pivot 를 잡고 이걸 기준으로 큰쪽과 작은쪽을 나누는 과정을 계속 반복하는 재귀 과정이다. 덕분에 평균적으로 nlogn의 시간 복잡도를 가지지만, 최악의 경우 n^2 이 나오게 된다.</p>

```js
function quickSort(items) {
  return quickSortHelper(items, left, right);
}

function quickSortHelper(items, left, right) {
  let index;
  if (items.length > 1) {
    index = partition(items, left, right);

    if (left < index - 1) {
      quickSortHelper(items, left, index - 1);
    }
    if (index + 1 < right) {
      quickSortHelper(items, index + 1, right);
    }
  }
  return items;
}

function partition(array, left, right) {
  let pivot = array[Math.floor((left + right) / 2)];
  while (left <= right) {
    while (pivot > array[left]) {
      left++;
    }
    while (pivot < array[right]) {
      right--;
    }
    if (left <= right) {
      let temp = array[left];
      array[left] = array[right];
      array[right] = temp;
      left++;
      right--;
    }
  }
  return left;
}
```

- 재귀 함수가 들어가 이해하기 조금 난해하지만, 한번 따라 작성해보면 흐름을 파악할 수 있다
- 예시로 [6, 1, 23, 4, 2, 3] 배열로 해보겠다.
- 퀵 정렬은 크게 partition 함수와 자기자신에 대한 재귀함수로 나뉘게 된다.
- 단 재귀함수는 고정된 index 를 기준으로 왼쪽과 오른쪽으로 나뉘어서 진행이 된다
- 재귀함수를 풀이할때는 퀵정렬을 해줄거라는 함수가 존재한다고 가정하는게 포인트다. 즉 누군가가 아주 적절하게 구현을 해놓았다고 가정하는 것이다.
- 즉 우리는 이 재귀함수에 어느 배열을 정렬할건지 인자로 보내주기만 하면 된다.
- 우선 중심점을 찾아야 한다. 맨 오른쪽에서 하는 방법도 있고, 중간 위치에서 하는 방법도 있다.
- 일단 중간점에서 한다고 가정하겠다.
  <br />

- 첫째로 전체 배열을 partition 에 넘겨주자. left는 맨처음, right 는 맨 마지막이다
- 이제 중간 pivot 을 구한다. 예시 배열에서는 23이다.
- 이제 left와 right 의 조건으로 while 을 무한 루프를 돌리게 된다. 현재 left는 0 이고 right 는 5 이다.
- 첫번째 조건을 만족하니 두번째에서 각 left 와 right 를 조정해준다
- 즉 pivot 보다 큰 수가 왼쪽에 있는지, 작은수가 오른쪽에 있는지 확인하고 이 인덱스를 left, right 에 지정해주기 위해서이다.
- 23은 왼쪽이나 오른쪽이나 모두 다 크다. 즉 왼쪽보다 다 크니 left 는 23의 위치인 2로 옮겨지고, right 는 조건에 부합하지 않으니 그대로 5 로 남겨져 있다
- 이제 if 문의 조건식을 보면 left <= right 를 만족하니 서로 스왑하고, left를 증가하고 right 를 감소시킨다.
- 현재 배열은 6, 1, 3, 4, 2, 23 이다
  <br />

- pivot은 23 그대로 있다.
- left 는 3이며 right 는 4 이다. 우선 첫번째 조건은 만족하니 두번째 while로 가자
- pivot 왼쪽값은 모두 다 작다. 따라서 left 는 5까지 이동한다.
- 반면 right 는 그대로 4이다.
- 이렇게 되면 if 문에 만족하지 않기 때문에 그대로 넘어가게 된다
- 이렇게 되면 현재는 left = 5, right = 4 이니깐 첫번째 while 조건에 해당하지 않는다.
- 따라서 return left 를 통해서 5를 반환한다.
- 이 반환값을 보면 결국 5번째 인덱스에 위치한 23은 고정되었음을 의미한다.
- 이제 index 왼쪽 6, 1, 3, 4, 2 에 대해서 partition을 돌려야 한다.
  <br />

- 중간 pivot 은 3이다.
- 첫번째 left는 0 그대로이다 (6 > 3). right 역시 4 그대로이다.(3 > 2)
- 그대로 스왑해주면 2,1,3,4,6 이 된다.
- 다시 while 로 돌아와 반복문을 돌려주면 알다싶이 left = right = 3 이 된다.
- 따라서 return 3 을 하게되고, 이것이 index 가 된다. (부분 재귀 함수)
- 정리해보자면 현재까지는 2,1,3,4,6,23 으로 정렬이 되어있고, 3의 index 를 기준으로 두 재귀함수로 나뉘게 된다
- 즉, 2,1 과 4,6 에 대해서 각각 partition 함수가 실행되게 되는데, 재귀 순서상 깊이 우선이기 때문에 앞 2,1 부터 더 파고들게 된다.
- 2,1 을 같이 실행하보면 1,2 가 되고, 이 이상은 items.length > 1 조건에 어긋나서 partition 을 포함한 재귀 과정이 멈추게 된다.
- 2 역시 마찬가지
- 그럼 이제 1,2 로 왼쪽이 마무리되었으니 이제 4,6 으로 넘어가게 된다.
- 4,6도 결국 4,6 이 되고 이렇게 하면서 최종적으로 배열이 완성이 된다.
- 1,2,3,4,6,23

<p>재귀라서 좀 작성이 길어지게 되었지만, 한번 잘 이해하면 편하다. 평균적으로 nlogn 이 나오는 편이고 최악은 제곱이다. 다만 공간 복잡도에서 다른 정렬은 O(1) 이지만 이건 O(logn) 을 차지하게 된다. 재귀함수로 인한 콜스택 때문이다.</p>

> **빠른 선택(퀵셀렉트)**

<p>주어진 배열에서 기준번째의 수를 찾는 방법이다. 즉 임의 배열 수들 중에서 몇번째의 수인지를 찾는 방법이라 생각하면 된다. 방법은 퀵정렬과 동일하게 index 고정값을 가져오는데, 이 index 를 활용해서 기준번째랑 비교를 통해서 어느 부분배열을 정렬할지를 결정하는것이기에, 양쪽 다 재귀 정렬을 하는것이 아니라 한쪽만 재귀 정렬을 하기 때문에, 시간복잡도는 O(n) 이다.</p>

```js
function quickSelect(array, left, right, order){
  let index = partition(array, left, right);
  if(index = order-1){
    return array[index];
  }else(index > order-1){
    return quickSelect(array, index+1, right, order);
  }else{
    return quickSelect(array, left, index-1, order);
  }
}

// 중간 수 찾기
function medianQuickSelect(array){
  return quickSelect(array, 0, array.length - 1, Math.floor(array.length/2));
}

// 5번째의 수
quickSelect(array, 0, array.length-1, 5)

// 10번째의 수
quickSelect(array, 0, array.length-1, 10)

```

- partition 함수는 위에서 구현한 것과 동일하다
- 배열내 고정되는 값의 인덱스를 가져온 뒤, 인자로 받은 order 와 비교를 통해 더 탐색을 할지 반환할지를 결정하게 된다.

> **병합 정렬**

<p>병합 정렬은 정렬 중 현재까지 가장 빠른 시간복잡도를 보여준다. nlogn. 병합 정렬 역시 재귀함수적 호출을 이용한 방식인데, 컨셉은 기준점을 잡은 뒤 그 기준점의 왼쪽과 오른쪽으로 배열을 나누는 과정을 재귀적으로 진행시켜서 나눠진 배열의 길이가 1이 될때까지 분해가 이루어진다. 이후 나눠진 왼쪽과 오른쪽의 배열을 순서를 맞추어서 새롭게 병합하는 과정을 타고 올라오는 형식이다. 재귀함수의 특징상 깊이우선이고 작업수준이 우선 아래쪽까지 스택에 호출이 된 이후, 맨 아래쪽 실행부터 차곡차곡 실행된다는 점에서, 병합 정렬이 이루어지는 것이다.</p>

```js
function merge(leftA, rightA) {
  let result = [],
    leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < leftA.length && rightIndex < rightA.length) {
    if (leftA[leftIndex] < rightA[rightIndex]) {
      result.push(leftA[leftIndex]);
      leftIndex++;
    } else {
      result.push(rightA[rightIndex]);
      rightIndex++;
    }
  }
  let remainLeft = leftA.slice(leftIndex);
  let remainRight = rightA.slice(rightIndex);

  return result.concat(remainLeft).concat(remainRight);
}

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }

  let midpoint = Math.floor(array.length / 2),
    leftArray = array.slice(0, midpoint),
    rightArray = array.slice(midpoint);

  return merge(mergeSort(leftArray), mergeSort(rightArray));
}
```

- 말그대로 병합 과정이 이루어진다.
- 우선 분해를 해야 하는데 이 분해 과정은 mergeSort 에서 이루어진다. 중간점을 찾은 뒤, 그 중간점을 기준으로 leftArray, rightArray 로 나누게 된다.
- 재귀적으로 호출하기 때문에, leftArray 에 대한 mergeSort, rightArray에 대한 mergeSort 가 이루어지게 된다.
- 물론 깊이 우선이기 때문에, 가장 왼쪽들의 배열이 마지막에 길이가 1이어서 return 되기까지 먼저 진행이 되고, 이후 바로 오른쪽 배열 역시 길이가 1이니 이 2가지 배열이 merge 가 이루어지게 된다.
- 예시를 들어서 6,1,23,4,2,3 이라고 하겠다
- 중간점은 23이기에, 왼쪽배열은 6,1 오른쪽 배열은 23,4,2,3 이 되게 된다.
- 이 왼쪽 배열 6,1 은 역시 midpoint 를 찾게 되고 1이 된다.
- 따라서 6 과 1로 나뉘게 되고, 이게 각각 leftA, rightA 가 되어 merge 가 이루어진다.
- merge 과정에서 1이 더 작기 때문에 result 에 1이 들어가게 되고, while 을 빠져나오고, 남아있는 remainLeft 인 6 을 concat 하면서 최종 1,6 이 만들어 진다.
  <br />

- 이제 오른쪽 배열이 남았는데, (왼쪽은 우선 오른쪽 결과를 기다리는 중)
- 23, 4, 2, 3 는 23, 4 / 2, 3 으로 나뉘게 되고, 다시 재귀적으로 23/ 4/ 2/ 3 으로 나뉜다
- 이후 4, 23 / 2,3 으로 만들어진다
- 이제 여기서 merger 가 다시 이루어지는데, 천천히 따져보면
- 첫번째 왼쪽보다 첫번째 오른쪽이 작으니 result = [2]
- 첫번째 왼쪽보다 두번째 오른쪽이 작으니 result = [2, 3]
- rightIndex = rightA.length 이므로 while 을 벗어나고 왼쪽배열은 remain 이다.
- 따라서 result.concat(remainLeft) = result = [2,3,4,23]
- 이제 최종적으로 [1,6] 과 [2,3,4,23] 을 merge 하면 된다.
- 최종 1,2,3,4,6,23 이 나오게 된다.

<p>병합 정렬은 효율성이 가장 좋다. (계수 정렬의 경우 배열 범위를 알고있어야 한다). 실제 자바스크립트 내장 sort 역시 병합정렬이 기반이 된다고 알고있다. (자세히는 Timesort). 시간복잡도는 nlogn 이니 퀵 정렬의 최악의 경우 n2 보다 더 좋다고 할 수 있겠다. 실제로 오래된 버전은 v8 은 퀵정렬이었지만 지금은 병합정렬기반이라고 알고 있다. 다만 공간복잡도가 O(n) 이라는 부분은 조금 아쉽다.</p>

> **계수 정렬**

<p>계수 정렬은 숫자만 가능하며, 그 범위가 지정되어야 한다. 예를 들어 이 배열은 숫자 10까지만 나오는 배열이며 이 배열을 정렬해봐라 라고 하면 계수 정렬이 가능하다. 계수 정렬은 각 배열의 숫자갯수를 카운트 한 다음, 새로운 배열에 push 한다.</p>

```js
function countSort(array) {
  let hash = {},
    countArr = [];
  for (let i = 0; i < array.length; i++) {
    if (!hash[i]) {
      hash[i] = 1;
    } else {
      hash[i]++;
    }
  }
  for (let key in hash) {
    for (let i = 0; i < hash[key]; i++) {
      countArr.push(paseInt(key));
    }
  }

  return countArr;
}
```

- 시간복잡도는 O(k+n) 이다.

> **자바스크립트의 내장 sort**

- 내장 정렬을 자바스크립트에서는 사용할 수가 있다. 기본적으로 오름차순으로 정렬하게 된다.

```js
let arr = [12, 3, 4, 2, 1, 34, 25];

function comparatorNumber(a, b) {
  return a - b;
}

arr.sort(comparatorNumber);
```

- sort 를 사용하다보면 커스텀함수를 굉장히 많이 사용하게 되며, 이를 활용하는 방향을 연습문제들을 풀이하면서 정리해보자.

## 2023-3-14

### 문제를 읽기전에 무조건 입출력 제한을 보자!

<p>문제를 자세히 읽기전에 입출력 제한을 보는것이 중요합니다. 특히 입력 제한을 보면 어떤 시간복잡도 내에 풀어야 하는지 알 수 있습니다.
예를 들어 입력이 100 이하인 경우 높은 확률로 완전 탐색 문제입니다. 시간복잡도 O(n3) 까지도 감당이 가능하기 때문에 플로이드 워셜과 같이 시간복잡도가 높은 알고리즘도 사용이 가능합니다. 보통 다음과 같이 판단하시면 됩니다.</p><br />

> **입력이 100 이하인 경우**

- 완전 탐색
- 백트래킹
  <br />

> **입력이 10,000 이하인 경우**

- 최대 O(n2) 이내로 끝내야하는 문제
- 문제에 따라 O(n2 log n)까지는 허용
- n\*n 2차원 리스트를 모두 순회해야하는 문제가 많음
  <br />

> **입력이 1,000,000 이하인 경우**

- 최대 O(n log n)으로 끝내야하는 문제
- 힙, 우선순위 큐
- 정렬
- 동적 계획법
- 위상 정렬
- 다익스트라 알고리즘
  <br />

> **입력이 100,000,000 이하인 경우**

- 최대 O(n)으로 끝내야하는 문제
- 동적 계획법
- 그리디
  <br />

> **그 이상인 경우**

- 최대 O(log n)으로 끝내야하는 문제가 많음
- 거의 안나오는 문제 유형
- 이진탐색
  <br />

### 문제 유형

<p>100%는 아니지만 높은 확률이라고 봐주시면 좋습니다. :)
코딩 테스트에서 많이 나오는 유형을 추렸습니다.</p><br />

> **입력값이 작은 문제**

<p>위에서 적었듯 높은 확률로 완전 탐색 혹은 백트래킹 문제입니다.
구현력이 중요한 문제로 출제될 가능성이 높습니다.</p><br />

> **지도가 주어지고 채워진 영역을 찾아야하는 경우**

<p>높은 확률로 BFS, DFS 문제입니다. FloodFill과 같이 정직한 방식으로 나오거나 전염병 문제나 치즈 문제(https://www.acmicpc.net/problem/2636)처럼 살짝 변형되서 나오는 경우가 있습니다.</p><br />

> **그래프 그림이 있는 경우**

<p>이 경우 높은 확률로 세 가지 유형 중 하나입니다.</p>

- 최단 거리 찾기
- 최소 신장 트리
- 위상 정렬 문제에서 "가장 빠른 길", "최단 거리"와 비슷한 키워드가 나온다면 당연히 최단 거리 찾기 유형이고 "X 비용 내로 갈 수 있는 길을 찾아라"와 같은 키워드가 나와도 최단 거리 찾기 유형입니다. 다익스트라, BFS, DFS 등이 사용될 수 있습니다.
- 최소 신장 트리 문제는 보통 "가장 저렴한 방법으로 모든 경로 연결해라" 등의 키워드로 출제됩니다. 경로가 아니라 통신망, 전송 시간, 회로, 배관 등 다양한 용어로 나올 수는 있지만 핵심은 모든 경로를 "가장 싸게 연결해라"입니다. 그래프는 양방향일수도 단방향일수도 있습니다. 크루스칼, 프림 알고리즘을 사용할 수 있습니다.

- 위상 정렬은 순서를 정해야할 때 사용됩니다. 보통 "순서", "차례" 등의 키워드가 나오면 위상 정렬 문제입니다.
  <br />

> **X라는 조건을 만족하는 가장 최대/최소값을 찾아라**

<p>이 경우 높은 확률로 결정 문제입니다. 파라메트릭 서치를 이용해서 풀 수 있습니다.</p><br />

> **실시간으로 정렬이 이루어져야 하는 경우**

<p>높은 확률로 우선순위 큐 혹은 힙을 사용하는 문제입니다.</p><br />

> **DP 문제**

<p>보통 완전 탐색처럼 시간이 오래걸리면 안되는데 특별한 알고리즘을 사용하는 문제가 아닐거 같을 때는 높은 확률로 DP 문제입니다. 다른 문제처럼 "딱봐도 이거네!" 하는 특징이 없어서 보통 문제를 보고 바로 유형을 판단하기 힘든 경우 DP처럼 풀 수 있는지 생각해봐야 합니다. 종이를 꺼내고 다음과 같은 방식으로 해보셔도 괜찮을 것 같습니다.</p><br />

- 문제를 따라 먼저 초기값을 적는다.
- 초기값을 포함해 모든 상태값을 적는다.
- 현재상태를 통해 다음 값을 구할 수 있는지 판단한다.
- 혹은 이전 상태들을 통해 현재 값을 구할 수 있는지 판단한다. 이런식으로 여러 번 해보고 식을 만들 수 있다면 100% DP 문제입니다.
  <br />

> **문자열이 주어지는 경우**

<p>구현력 문제인 경우가 많습니다. 문자열을 자르거나, 붙이거나 탐색하는 문제가 대부분입니다. 문자열을 탐색하는 알고리즘이 필요한 경우 KMP 알고리즘을 사용할 수 있지만 보통 파이썬과 같은 스크립트 언어에선 문자열 탐색이 빌트인으로 존재하기 때문에 구현에만 집중하면 됩니다.</p><br />

> **현재 상황에서 가장 최적인 선택을 해야하는 경우**

<p>문제에서 항상 최적의 선택을 해야하는 경우 혹은 "가장 많은 선택을 할 수 있는", "가장 작은/큰" 등의 키워드가 들어가면 그리디 문제일 가능성이 높습니다. 위에서 잠깐 말했던 최소 신장 트리도 그리디의 일종입니다.</p>
