const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/example.txt")
  .toString()
  .trim();

const array = input.split("");

const stack = [];
const numStack = [];
const num = { "]": 3, ")": 2 };
let closeBefore = false;
let openBefore = false;
let sum = 0;
let flag = 1;

// stack 의 길이가 증가한다면 + 를 해야한다.
// stack 의 길이가 감소한다면 * 을 해야한다.

for (let str of array) {
  // 괄호 열기 = stack에 집어넣음
  if (str === "(" || str === "[") {
    if (openBefore) {
      numStack.push(sum);
      sum = 0;
    }
    stack.push(str);
    openBefore = true;
    closeBefore = false;
  }
  // 괄호 닫기 = stack에서 뺌.
  else {
    const pop = stack.pop();

    // 앞의 괄호와 짝이 맞을경우
    if ((str === ")" && pop === "(") || (str === "]" && pop === "[")) {
      // 두번이상 닫는거라면
      if (closeBefore) {
        sum = sum * num[str] + numStack.pop();
      }
      // 처음 닫아보는거라면
      else {
        sum += num[str];
      }
    }
    //짝이 맞지않으면 0 리턴
    else {
      flag = 0;
      break;
    }
    openBefore = false;
    closeBefore = true;
  }
}
if (flag === 0) {
  console.log(flag);
} else {
  console.log(stack.length > 0 ? 0 : sum);
}
