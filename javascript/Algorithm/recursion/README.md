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
