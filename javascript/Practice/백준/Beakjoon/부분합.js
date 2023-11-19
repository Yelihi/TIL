let input = require("fs").readFileSync("/dev/stdin").toString();

let i = Number(input);
let min = Number(input);

while (i) {
  const copy = i;
  let partialSum = (copy + "")
    .split("")
    .reduce((acc, crr) => (acc += Number(crr)), 0);
  if (Number(input) === i + partialSum) {
    min = Math.min(min, i);
  }
  i--;
}

min === Number(input) ? console.log(0) : console.log(min);
