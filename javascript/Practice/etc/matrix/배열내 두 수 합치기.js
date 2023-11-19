// 어떠한 수가 주어지고, 배열 내 두 수를 합쳐서 이 수가 나오는지 확인하는 문제
// 있으면 배열로 2 수를 리턴하고 없으면 -1 을 리턴한다.

function findSum(arr, weight) {
  let table = {};
  let answer = [];

  for (let i = 0; i < arr.length; i++) {
    let differ = weight - arr[i];
    table[differ] = 1;
  }

  for (let i = 0; i < arr.length; i++) {
    if (table[arr[i]]) {
      answer.push(i);
    }
  }

  return answer.length > 0 ? answer : -1;
}

// 교재의 풀이
function findSumBetter(arr, weight) {
  let hashtable = {};

  for (let i = 0; i < arr.length; i++) {
    let currentElement = arr[i];
    difference = weight - currentElement;

    if (hashtable[currentElement] != undefined) {
      return [i, hashtable[currentElement]];
    } else {
      hashtable[difference] = i;
    }
  }
  return -1;
}
