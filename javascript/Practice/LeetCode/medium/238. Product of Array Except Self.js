/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let isOneZero = false;
  let zeroIndex = 0;
  let totalMulti = 1;
  let partialTotal = 1;
  nums.forEach((number, idx) => {
    if (number === 0 && !isOneZero) {
      isOneZero = true;
      zeroIndex = idx;
      totalMulti *= number;
      return;
    }
    partialTotal *= number;
    totalMulti *= number;
  });

  const answer = nums.map((number, idx) => {
    if (isOneZero && idx === zeroIndex) {
      return partialTotal;
    } else {
      return number === 0 ? 0 : totalMulti / number;
    }
  });

  return answer;
};

// 다른 풀이

var productExceptSelf = function (nums) {
  var output = [];
  var leftMult = 1;
  var rightMult = 1;
  for (var i = nums.length - 1; i >= 0; i--) {
    output[i] = rightMult;
    rightMult *= nums[i];
  }
  for (var j = 0; j < nums.length; j++) {
    output[j] *= leftMult;
    leftMult *= nums[j];
  }
  return output;
};
