// x와 y,p라는 세 개의 숫자에 대해 (x^y)%p 를 계산하시오
// x는 기저이고 y는 지수이고 p 는 모듈이다.
// 범위를 주목해야하는게 x 가 상당히 커질수 있기에 알고리즘 상 문제가 발생할 수 있다.
function modularExponentiation(base, exponent, moduls) {
  if (moduls === 1) return 0;

  let value = 1;

  for (let i = 0; i < exponent; i++) {
    value = (value * base) % moduls;
  }
  return value;
}

console.log(modularExponentiation(4, 3, 5));
