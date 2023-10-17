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

function ThreeSum(array, target) {
  const answer = [];
  const sortedArray = array.sort((a, b) => a - b);
  let start, end;

  for (let i = 0; i < sortedArray.length; i++) {
    let a = sortedArray[i];
    start = i + 1;
    end = sortedArray.length - 1;
    while (start < end) {
      let b = sortedArray[start];
      let c = sortedArray[end];
      if (a + b + c === target) {
        answer.push([a, b, c]);
        start += 1;
        end -= 1;
      } else if (a + b + c > target) {
        end -= 1;
      } else if (a + b + c < target) {
        start += 1;
      }
    }
  }
}

function binarySearch(array, target) {
  let startIndex = 0;
  let lastIndex = array.length - 1;
  let midIndex = startIndex + (lastIndex - startIndex) / 2;
  while (startIndex < lastIndex) {
    if (array[midIndex] > target) {
      lastIndex = midIndex;
    } else if (array[midIndex] < target) {
      startIndex = midIndex;
    } else {
      return midIndex;
    }
  }
  return -1;
}
