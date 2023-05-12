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
