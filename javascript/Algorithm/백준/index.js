// 백준에 바꿔서 입력할 버전
// let input = require("fs").readFileSync("/dev/stdin").toString().split(" ");

// 하나의 값을 받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim();

// 한 줄에 공백으로 값이 들어올 때
// let input = require("fs")
//   .readFileSync("example.txt")
//   .toString()
//   .trim()
//   .split("\n");

// 한줄에 하나씩 값이 들어올 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split("\n");

// 첫 번째 줄에 자연수 n 을 받고, 그 다음 줄에 공백으로 구분된 n개의 값들을 입력받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split(/\s+/);
// const [n, ...arr] = input;

// 첫 번째 줄에 자연수 n을 입력받고, 그 다음줄에 n개의 줄에 걸쳐 한 줄에 하나의 값을 입력받을 때
// let input = require("fs").readFileSync("example.txt").toString().trim().split('\n');
// const [n, ...arr] = input;

// 디 버그 할때 : node index

// 급할때 사용하는 버전

function maxHeap(array) {
  let size = array.length;
  for (let i = Math.floor(size / 2 - 1); i >= 0; i--) {
    heapfiy(array, size, i);
  }

  for (let i = size - 1; i >= 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    heapfiy(array, i, 0);
  }

  return array;
}

function heapfiy(arr, size, parentIdx) {
  let largest = parentIdx;
  const leftChildIdx = parentIdx * 2 + 1;
  const rightChildIdx = parentIdx * 2 + 2;

  if (leftChildIdx < size && arr[leftChildIdx] > arr[largest]) {
    largest = leftChildIdx;
  }

  if (rightChildIdx < size && arr[rightChildIdx] > arr[largest]) {
    largest = rightChildIdx;
  }

  if (parentIdx !== largest) {
    [arr[parentIdx], arr[largest]] = [arr[largest], arr[parentIdx]];

    heapfiy(arr, size, largest);
  }
}
