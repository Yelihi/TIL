const getPermutation = function(array, selectNumber){
  const results = [];
  if(selectNumber === 1) return array.map((value) => [value]);

  array.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)]
    const permutations = getPermutation(rest, selectNumber - 1);
    const attached = permutations.map((permutation) => [fixed, ...permutation]);
    results.push(...attached);
  })

  return results
}