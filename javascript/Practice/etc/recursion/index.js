// 재귀함수
// 재귀는 자기 자신을 호출하는 함수
// 자바스크립트에서는 콜스택에 제한이 있다. 크롬에 한해 약 1만개 정도 돌아간다
// 성능 개선을 위한 꼬리 재귀가 제공되지 않는다
// 자바스크립트에서도 재귀는 성능이 좋지 않다.

// 그럼에도 재귀로 작성하면 더 쉽게 코딩테스트 문제가 있기 때문이다.
// (Union-Find, DFS, Backtraking)

function recursion(n) {
  // 기저조건
  if (n > 10) {
    return n;
  }
  return recursion(n + 1);
}

// 피보나치 수열
// 여기서 n 은 항 번호다.
function fibonacc(n) {
  if (n <= 2) {
    return 1;
  }

  return fibonacc(n - 2) + fibonacc(n - 1);
}

// 합병 정렬
const merge = (a, b) => {
  if (a.length === 0) return b;
  else if (b.length === 0) return a;
  else if (a[0] < b[0]) return [a[0], ...merge(a.slice(1), b)];
  else return [b[0], ...merge(a, b.slice(1))];
};

const mergesort = (arr) => {
  if (arr.length < 2) return arr;
  else {
    const mid = Math.floor(arr.length / 2);
    return merge(mergesort(arr.slice(0, mid)), mergesort(arr.slice(mid)));
  }
};
