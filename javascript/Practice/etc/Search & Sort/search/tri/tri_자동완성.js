function makeTrie(words) {
  let root = {};
  for (let word of words) {
    let current = root;
    for (let letter of word) {
      if (!current[letter]) {
        current[letter] = [0, {}];
      }
      current[letter][0] = 1 + (current[letter][0] || 0);
      current = current[letter][1];
    }
  }

  return root;
}

function solution(words) {
  let answer = 0;
  const trie = makeTrie(words);
  for (let word of words) {
    let count = 0;
    let current = trie;
    for (let [index, letter] of [...word].entries()) {
      count += 1;
      if (current[letter][0] <= 1) {
        break;
      }
      current = current[letter][1];
    }
    answer += count;
  }

  return answer;
}
