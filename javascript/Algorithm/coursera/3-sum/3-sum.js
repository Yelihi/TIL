// 단순 3중 중첩문은 효율적이지 않다. (n3)

// 실제 입력값이 4000개만 넘어가더라도 30초이상이 소요된다. 늘어날수록 삼차지수함수로 증가한다

function ThreeSum(array, target) {
  const sortedArray = [...array].sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < array.length; i++) {
    let a = sortedArray[i];
    let startIndex = i + 1;
    let endIndex = sortedArray.length - 1;
    while (startIndex < endIndex) {
      let b = sortedArray[startIndex];
      let c = sortedArray[endIndex];
      if (a + b + c === target) {
        result.push([a, b, c]);
        startIndex = startIndex + 1;
        endIndex = endIndex - 1;
      } else if (a + b + c > target) {
        endIndex = endIndex - 1;
      } else {
        startIndex = startIndex + 1;
      }
    }
  }

  return result;
}

const array = [-25, -10, -7, -3, 2, 4, 8, 10];
console.log(ThreeSum(array, 0));
