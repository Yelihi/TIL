## Programers - 프렌즈4블록

### 문제 설명

블라인드 공채를 통과한 신입 사원 라이언은 신규 게임 개발 업무를 맡게 되었다. 이번에 출시할 게임 제목은 "프렌즈4블록".
같은 모양의 카카오프렌즈 블록이 2×2 형태로 4개가 붙어있을 경우 사라지면서 점수를 얻는 게임이다.<br /><br />

같은 블록은 여러 2×2에 포함될 수 있으며, 지워지는 조건에 만족하는 2×2 모양이 여러 개 있다면 한꺼번에 지워진다.<br /><br />

블록이 지워진 후에 위에 있는 블록이 아래로 떨어져 빈 공간을 채우게 된다.<br />
만약 빈 공간을 채운 후에 다시 2×2 형태로 같은 모양의 블록이 모이면 다시 지워지고 떨어지고를 반복하게 된다.<br />
입력으로 블록의 첫 배치가 주어졌을 때, 지워지는 블록은 모두 몇 개인지 판단하는 프로그램을 제작하라.

### 제한사항

- 입력으로 판의 높이 m, 폭 n과 판의 배치 정보 board가 들어온다.
- 2 ≦ n, m ≦ 30
- board는 길이 n인 문자열 m개의 배열로 주어진다. 블록을 나타내는 문자는 대문자 A에서 Z가 사용된다.

### 문제 풀이

풀긴 했는데 무려 2시간이나 걸렸다. 사실상 실패라고 봐도 될듯 하다. 문제가 이해하기 어렵다기 보단, 2차원 행렬을 다루는데 조금 어설프기 때문이라 생각한다. <br />
또한 시간제한이 있어서 작성한 코드를 보면 엉망이다. 더 깔끔하게 변경하는 것도 방법이긴 한데, 실제 테스트에서는 이 이상 잘 작성할 자신은 없다.<br /><br />

board 는 문자열이 담긴 배열로 주어지기에, 우선적으로 board 를 2차원 행렬로 변경해주고자 하였다. 다만, 일반적인 배열이 아닌 오른쪽으로 한번 회전시킨 2차원 배열을 만들것이다. 문제에서 4개의 문자가 겹쳐서 사라졌을 때, 사라진 빈 공간을 위의 아이콘들이 채워야 한다. 이러한 작업을 하기 편하기 위해 떨어지는 방향의 column 이 하나의 배열로 표현되는 것이 좋다. 그래서 오른쪽으로 회전시킬 생각이다. <br /><br />

순서는 다음과 같다.

- 오른쪽으로 회전된 board 와 이 board 의 데이터를 담당할 data 행렬을 만든다
- while 의 조건은 한번이라도 4블록이 사라지지 않을때까지 반복해야 한다.
- 순회를 돌면서 인접 4블록이 같은 문자라면 data 행렬에서 같은 index 에 대응되는 데이터를 변경한다 (2 -> 1)
- 하나의 순회가 끝났다면, 데이터 행렬을 기반으로 board 행렬의 블록을 null 로 변경해준다. (1에 해당하는 index 들을)
- 이 과정이라면 원본 행렬은 null 이 포함되고, data 행렬은 1이 포함되어있다. 이 부분이 빈 공간이다.
- 문제가 요구하는 사항은 얼만큼의 블록이 사라졌느냐이기에 빈 공간을 column 의 오른쪽으로 이동시킨다음 최종적으로 빈 공간을 세면 된다. (이래서 column 을 배열로 관리)
- board 와 data 행렬 모두 sort 를 통해 정렬해준다. ['T', 'E', 'T', null, null, null] 이런식으로 정렬이 되었다는 것은 곧 사라질 블럭들이 사라지고 위 블럭이 내려온 모습을 나타낼 수 있다.
- 이제 이렇게 정렬된 board 와 data 를 원본 board 와 data 에 대입시켜준다.
- 이 과정을 반복한다. 더이상 블록이 사라지지 않을때까지 말이다.
- 이후 loop 를 빠져나와 data 부분의 1 의 갯수를 반환하면 이게 답이다.

더 나은 방법이 있겠지만, 이 순서대로 작성하면 큰 문제없이 문제가 해결된다. <br />

```js
function solution(m, n, board) {
  // 우선 원본 board 와 data 를 오른쪽으로 회전시켜서 만들어준다.
  // 왠만하면 한번의 루프로 해주고 싶었는데.. 뭔가 각이 안나온다.
  const boardData = [];
  const Board = [];

  // 데이터 행렬 생성 & Board 만들기
  for (let i = 0; i < n; i++) {
    const rowData = [];
    const row = [];
    for (let j = 0; j < m; j++) {
      rowData.push(2);
      row.push(board[m - 1 - j][i]);
    }
    boardData.push(rowData);
    Board.push(row);
  }

  // 순환조건 만들기
  let flag = false;
  let count = 0;
  while (true) {
    // 4블록 찾기
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < m - 1; j++) {
        const o = Board[i][j]; // 기준점;
        const r = Board[i][j + 1];
        const d = Board[i + 1][j];
        const rd = Board[i + 1][j + 1];

        if (o == r && r == d && d == rd && rd == o && o !== null) {
          boardData[i][j] =
            board[i][j + 1] =
            boardData[i + 1][j] =
            board[i + 1][j + 1] =
              1;
          flag = true;
        }
      }
    }

    // break 조건
    if (!flag) {
      boardData.forEach((row) => {
        row.forEach((data) => {
          if (data == 1) count++;
        });
      });
      break;
    }

    // 데이터행렬의 변화를 원본 행렬에 대입. (지금하는 이유는 4블록 중 일부를 다른 4블록하고 공유할 수 있기 때문이다. 그래서 한번에 삭제해야한다)
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (boardData[i][j] == 1) Board[i][j] = null;
      }
    }

    // 여기까지 왔으면 이제 데이터가 변경되어있고, 이제 4블록이 삭제되고 위 블록이 내려오는 과정을 행렬로 표현한다.
    const newBoardData = boardData.map((row) => row.sort((a, b) => b - a));
    const newBoard = Board.map((row) =>
      row.sort((a, b) => {
        if (a == b) return 0;
        if (a == null) return 1;
        if (b == null) return -1;
      })
    );

    // 행렬이 정렬이 되었으니 이제 원본에다가 대입해준다
    Board = [...newBoard];
    boardData = [...newBoardData];
    // 다시 순환이 돌아야 하니 flag 를 false 로 변경해준다
    flag = false;
  }

  // 순환이 마무리 되었으니
  return count;
}
```

- 이제
