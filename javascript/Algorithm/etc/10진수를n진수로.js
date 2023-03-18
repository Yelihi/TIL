function transfer(n, base) {
  let answer = "";

  while (n > 0) {
    let remainer = n % base;
    answer = remainer + answer;
    n = Math.floor(n / base);
  }
  return answer;
}

console.log(transfer(50, 3));
