/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
  const output = [];

  const splitWord1 = word1.split("");
  const splitWord2 = word2.split("");

  splitWord1.forEach((spell, idx) => {
    output[2 * idx] = spell;
  });
  splitWord2.forEach((spell, idx) => {
    output[2 * idx + 1] = spell;
  });

  return output.join("");
};

// 다른 풀이

const mergeAlternately = (a, b) => {
  const maxLength = Math.max(a.length, b.length);
  let result = "";

  for (let i = 0; i < maxLength; i++) {
    result += (a[i] ?? "") + (b[i] ?? "");
  }

  return result;
};
