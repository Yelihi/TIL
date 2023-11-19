//행렬을 90도로 회전시켜라
// 세번째 열 -> 첫번째 행
// 두번째 열 -> 두번째 행
// 첫번째 열 -> 세번째 행

let matrix = [
  [1, 0, 1],
  [0, 0, 1],
  [1, 1, 1],
];

function rotateMatrix90Left(mat) {
  let N = mat.length;

  // 항목들을 하나씩 처리한다
  for (let x = 0; x < N / 2; x++) {
    for (let y = x; y < N - x - 1; y++) {
      let temp = mat[x][y];

      //현재 항목 기준 오른쪽 값을 현재 항목 기준 위쪽 칸에 할당한다.
      mat[x][y] = mat[y][N - 1 - x];
      //현재기준 아래쪽 값을 현재 기준 오른쪽 칸에 할당한다.
      mat[y][N - 1 - x] = mat[N - 1 - x][N - 1 - y];
      //현재기준 왼쪽 값을 현재 기준 아래쪽 칸에 할당한다.
      mat[N - 1 - x][N - 1 - y] = mat[N - 1 - y][x];
      //임시 변수의 값을 현재기준 왼쪽 칸에 할당한다.
      mat[N - 1 - y][x] = temp;
    }
  }
}

//오른쪽 회전
function rotateMatrix90Right(mat) {
  let N = mat.length;

  // 항목들을 하나씩 처리한다
  for (let x = 0; x < N / 2; x++) {
    for (let y = x; y < N - x - 1; y++) {
      let temp = mat[x][y];

      mat[x][y] = mat[N - 1 - y][x];
      mat[N - 1 - y][x] = mat[N - 1 - x][N - 1 - y];
      mat[N - 1 - x][N - 1 - y] = mat[y][N - 1 - x];
      mat[y][N - 1 - x] = temp;
    }
  }
}
