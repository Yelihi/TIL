## 집합(Set)

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
