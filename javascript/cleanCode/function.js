/**
 * rest parameter
 * 스프레드와 완전히 다르다
 *  */

function subTotal(...args) {
  return args.reduce(acc, (curr) => acc + curr);
}

console.log(sumTotal(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

/**
 * callback Function
 * 함수의 실행권을 다른 함수에 넘겨준다
 */

// 콜백 함수를 전달해준다.
someddd.addEventListner("click", somefunction);

function register() {
  const isConfirm = confirm("회원가입에 성공했습니다.");
}
