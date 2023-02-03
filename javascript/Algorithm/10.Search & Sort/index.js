// 선형 검색

function linearSearch(array, n) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === n) {
      return true;
    }
  }
  return false;
}

// 이진 검색

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

// 거품 정렬

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

// 선택 정렬

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

// 삽입 정렬

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

// 퀵 정렬

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

// 병합 정렬

function merge(leftA, rightA) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftA.length && rightIndex < rightA.length) {
    if (leftA[leftIndex] < rightA[rightIndex]) {
      result.push(leftA[leftIndex++]);
    } else {
      result.push(rightA[rightIndex++]);
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

  let midpoint = Math.floor(array.length / 2);
  let leftArray = array.slice(0, midpoint);
  let rightArray = array.slice(midpoint);

  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

console.log(mergeSort([6, 1, 23, 4, 2, 3]));
