/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  if (flowerbed.length === 1 && flowerbed[0] === 0) {
    return true;
  }

  for (let i = 0; i < flowerbed.length; i++) {
    if (i === 0 && flowerbed[i] === 0 && flowerbed[i + 1] === 0) {
      flowerbed[i] = 1;
      n--;
      continue;
    }
    if (
      i === flowerbed.length - 1 &&
      flowerbed[i] === 0 &&
      flowerbed[i - 1] === 0
    ) {
      flowerbed[i] = 1;
      n--;
      continue;
    }
    if (
      flowerbed[i] === 0 &&
      flowerbed[i + 1] === 0 &&
      flowerbed[i - 1] === 0
    ) {
      flowerbed[i] = 1;
      n--;
      continue;
    }
  }

  return n > 0 ? false : true;
};

// 다른사람 풀이

function canPlaceFlowers(f, n) {
  if (!n) return true;
  for (let i = 0; i < f.length; i += 2)
    if (!f[i])
      if (f[i + 1]) i++;
      else if (!--n) return true;
  return false;
}
