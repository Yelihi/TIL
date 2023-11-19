/**
 * 가지치기 하기
 * 확인해야 할 사항은 같은 행, 같은 열, 대각선
 * 3가지 모두를 루프 돌리기에는 효율이 좋지않다.
 * array[row] = col 로 표현
 * 같은 row 는 무시하기, 같은 col 무시하기
 * 대각선은 row1 - row2 = col1 - col2
 */

function check(queen, row) {
  // 같은 열과 대각선을 검사한다.
  // 같은 행은 1차원 배열이기에, a[0] = 1, a[0] = 2 가 한번에 있을 수 없으니 자동으로 제외
  for (let i = 0; i < row; i++) {
    if (queen[i] === queen[row] || Math.abs(queen[i] - queen[row]) === row - i) {
      return false;
    }
  }
  return true;
}

function search(queen, row) {
  let n = queen.length;
  // 맨 마지막 줄까지 도달하면 1이 증가한다
  let count = 0;

  if (n === row) {
    return 1;
  }

  // 같은 행에 n 가지 열에 대해서 검색을 할 것이다.
  for (let col = 0; col < n; col++) {
    // 우선 퀸을 한 자리에 둔다
    queen[row] = col;
    // 체크에 성공한다면
    if (check(queen, row)) {
      // 다음행에서 진행을 이어 한다.
      // 만일 끝까지 내려가서 return 1을 하게 되면,
      // 이 1이 타고 올라오게 된다. 왜냐하면 count 정의가 search 안에 있기 때문
      // 1을 전달받게 된다.
      count += search(queen, row + 1);
    }
  }

  return count;
}

function solution(n) {
  return search(
    Array.from(Array(n), () => 0),
    0
  );
}
