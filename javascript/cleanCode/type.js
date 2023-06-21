// 형 변환은 암묵적인 형 변환이 일어나는 것이다

"1" == 1;

1 == true;
0 == false;

// 암묵적인 형 변환

console.log(11 + "문자열"); // '11 문자열'

console.log(!!"문자열"); // true
console.log(!!""); // false

// 명시적인 형 변환 (사용자가 직접)

parseInt("9.999", 10); // 9

String(11 + "문자결함");
Boolean("문자열");
Boolean("");
Number("11");

// isNaN

// 2진수와 10진수를 변경하다보면 소수점이 생기면서 간극이 생기게 되는데
// 자바스크립트는 부동소수점(떠돌이소수점)을 정의
// 자바스크립트에서 숫자를 검사하는게 어렵다

Number.MAX_SAFE_INTEGER; // 가장많이 다룰수 있는 숫자
Number.isInteger; // 값이 정수인지 판별하는 방법

isNaN(123); // is Not a Number -> false
isNaN(123 + "테스트"); // 햇갈린다

isNaN; // 좀 느슨한 검사
Number.isNaN; // 엄격한 검사
