// 2,3,5 로 나누어질수 있는 숫자들의 집합을 구해보자.
// n 이 주어지면 n개의 못생긴 숫자들을 찾은 예제
function MaxDivide(number, divide) {
  while (number % divide === 0) {
    number /= divide;
  }
  return number;
}

function isUgly(number) {
  number = MaxDivide(number, 2);
  number = MaxDivide(number, 3);
  number = MaxDivide(number, 5);
  return number === 1;
}

function arrayNUglyNumber(n) {
  let count = 0;
  let currentNumber = 1;
  let uglyNumberArray = [];

  while (count !== n) {
    if (isUgly(currentNumber)) {
      count++;
      uglyNumberArray.push(currentNumber);
    }
    currentNumber++;
  }

  return uglyNumberArray;
}

console.log(arrayNUglyNumber(11));
