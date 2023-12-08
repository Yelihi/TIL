/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function (candies, extraCandies) {
  const answer = [];
  // 최대 값을 산정한다.
  const max = Math.max(...candies);
  // 순회
  candies.forEach((candy) => {
    if (candy + extraCandies >= max) {
      answer.push(true);
    } else {
      answer.push(false);
    }
  });

  return answer;
};
