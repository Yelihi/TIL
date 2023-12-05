/**
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  let first = Infinity;
  let second = Infinity;
  for (let third of nums) {
    if (third < first) {
      first = third;
    } else if (third < second && third > first) {
      second = third;
    } else if (third > second && third > first) return true;
  }
  return false;
};
