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
