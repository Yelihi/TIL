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
