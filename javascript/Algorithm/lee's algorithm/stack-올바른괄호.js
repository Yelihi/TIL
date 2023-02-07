// 간단한 문제
function solution(s) {
  let count = 0;

  for (const c of s) {
    if (c === "(") {
      count += 1;
    } else {
      if (count === 0) {
        return false;
      }
      count -= 1;
    }
  }

  return count === 0;
}

// 내가 푼 풀이
function solution(s) {
  let stack = [];
  for (let elem of s) {
    if (elem == ")") {
      if (stack[stack.length - 1] == "(") {
        stack.pop();
        continue;
      }
    }
    stack.push(elem);
  }
  return stack.length == 0 ? true : false;
}
