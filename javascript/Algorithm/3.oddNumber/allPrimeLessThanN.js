// n 보다 작은 소수를 모두 출력해라
function allPrimeLessThanN(n) {
  for (let i = 0; i < n; i++) {
    if (isPrime(i)) {
      console.log(i);
    }
  }
}

function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;

  // 입력된 수가 2 또는 3인 경우 아래 반복문에서
  // 다섯개의 숫자를 건너뛸 수 있다.
  if (n % 2 == 0 || n % 3 == 0) return false;

  for (let i = 5; i * i <= n; i = i + 6) {
    if (n % i == 0 || n % (i + 2) == 0) {
      return false;
    }
  }
  return true;
}

console.log(allPrimeLessThanN(15));
