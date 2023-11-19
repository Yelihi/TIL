// 순열 조합
// 자바스크립트에서는 이를 직접 구현해야한다

// 순열과 조헙으로 푸는 문제라면 n 이 크게 나오지 않는다
// 반대로 n 이 크다면 이게 순열과 조합이 아닐수 있음을 인정하자

// 순열
// 시간복잡도 O(n!)
function permutation(arr, n) {
  // 1개만 뽑는다면 그대로 순열을 반환한다. 탈출 조건으로 사용된다.
  if (n === 1) return arr.map((v) => [v]);
  let result = [];

  // 요소를 순환한다
  arr.forEach((fixed, idx, arr) => {
    // 현재 index를 제외한 요소를 추출한다.
    // index번째는 선택된 요소
    const rest = arr.filter((_, index) => index !== idx);
    // 선택된 요소를 제외하고 재귀 호출한다
    const perms = permutation(rest, n - 1);
    // 선택된 요소와 제귀 호출을 통해 구한 순열을 합쳐준다.
    const combine = perms.map((v) => [fixed, ...v]);
    // 결과값을 추가한다.
    result.push(...combine);
  });

  return result;
}

// 조합
// 시간복잡도 O(2^n)

function combinations(arr, n) {
  // 1개만 뽑는다면 그대로 조합을 반환한다. 탈출 조건으로도 사용된다.
  if (n === 1) return arr.map((v) => [v]);
  let result = [];

  // 요소를 순환한다
  arr.forEach((fixed, idx, arr) => {
    // 현재 index 이후 요소를 추출한다
    // index번째는 선택된 요소
    const rest = arr.slice(idx + 1);
    // 선택된 요소 이전 요소들을 제외하고 재귀 호출한다
    const combis = combinations(rest, n - 1);
    // 선택된 요소와 재귀 호출을 통해 구한 조합을 합쳐준다
    const combine = combis.map((v) => [fixed, ...v]);
    // 결과값에 추가한다
    result.push(...combine);
  });

  return result;
}
