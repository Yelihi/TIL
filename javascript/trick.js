// 1. 구조분해 할당을 이용한 변수 swap

let a = 5,
  b = 10;
[a, b] = [b, a];
console.log(a, b); // 10, 5

// 2. 배열 생성으로 루프 제거하기
// 우선 단순 범위 루프 돌리기
let sum = 0;
for (let i = 5; i < 10; i += 1) {
  sum += 1;
}

// 함수형 프로그래밍 방식으로 사용하기
const sum2 = Array.from(new Array(5), (_, k) => k + 5).reduce((acc, cur) => acc + cur, 0);

//3. 배열내 같은 요소 제거하기
const names = ["Lee", "Kim", "Park", "Lee", "Kim"];
const unigueNameArrayFrom = Array.from(new Set(names));
const unigueNameSpread = [...new Set(names)];

//4 Spread 연산자를 이용한 객체 병합

const person = {
  name: "Lee Sun-Hyoup",
  familyName: "Lee",
  givenName: "Sun-Hyoup",
};

const company = {
  name: "Cobalt. Inc.",
  address: "Seoul",
};

const leeSunHyoup = { ...person, ...company };
console.log(leeSunHyoup);

// 5. && 와 || 의 활용
// 기본값을 넣어주고 싶을 떄
let participantName = 0;
const name3 = participantName || "Guest";

// && 는 앞에가 true 일때만 적용
let flag = false;
flag && console.log(name3); // false 이면 뒤에 실행 안됨

// 객체 병합해도 사용 가능
const makeCompany = (showAddress) => {
  return {
    name: "Cobalt. Inc.",
    ...(showAddress && { address: "Seoul" }),
  };
};
console.log(makeCompany(false));
console.log(makeCompany(true));

// 구조분해 할당 사용하기
const myPerson = {
  name: "wonik",
  familyName: "Choi",
  givenName: "wonik",
  company: "Cobalt. Inc.",
  address: "Seoul",
};

const { familyName, givenName } = person;

// 객체 생성시 키 생략하기
// 객체를 생성할 때 키를 변수 이름으로 생략할 수 있다.
const keyName = "Choi Won Ik";
const KeyCompany = "Cobalt";
const my = {
  keyName,
  KeyCompany,
};

console.log(my);

//7. 비구조화 할당 사용하기
// 함수에 객체를 넘길 경우 필요한 것만 꺼내 쓸수 있다.
const createCompany = ({ name, address, serviceName }) => {
  return {
    name,
    address,
    serviceName,
  };
};

const wonik = createCompany({ name: "CoCo", address: "Seoul", serviceName: "Present" });

// 8. 동적 속성 이름
const nameKey = "name";
const emailKey = "email";
const normal = {
  [nameKey]: "Wonik",
  [emailKey]: "yelihi19@gmail.com",
};

//9. !!연산자를 사용하여 boolean 값으로 바꾸기
//!! 연산자를 이용하여 0, null, 빈 문자열, undefined, NaN을 false 로 그 외에는 true 로 변경할 수 있다.
function check(variable) {
  if (!!variable) {
    console.log(variable);
  } else {
    console.log("잘못된 값");
  }
}

check(null); // 잘못된 값
check(3.14); // 3.14
check(undefined); // 잘못된 값
