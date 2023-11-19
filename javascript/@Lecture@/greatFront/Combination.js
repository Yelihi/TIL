const getCombination = function (array, selectbNumber) {
  const results = [];
  if (selectbNumber === 1) {
    return array.map((value) => [value]);
  }

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombination(rest, selectbNumber - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    results.push(...attached);
  });

  return results;
};

const example = [1, 2, 3, 4];
const result = getCombination(example, 3);
console.log(result);

// 백준 시간초과 때문에 다른 방식도 있음

const getCombinations2 = function (selectNumber, array) {
  const answer = [];

  const temp = new Array(selectNumber);

  function DFS(L, s) {
    if (L === selectNumber) {
      answer.push(temp.slice());
    } else {
      for (let i = s; i < array.length; i++) {
        temp[L] = array[i];
        DFS(L + 1, i + 1);
      }
    }
  }

  DFS(0, 0);
  return answer;
};
