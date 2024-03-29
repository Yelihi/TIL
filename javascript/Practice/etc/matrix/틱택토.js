// 틱택토 판에서 승자를 판가름하기

function checkRow(rowArr, letter) {
  for (let i = 0; i < 3; i++) {
    if (rowArr[i] != letter) {
      return false;
    }
  }
  return true;
}

function checkColumn(gameBoardMatrix, columnIndex, letter) {
  for (let i = 0; i < 3; i++) {
    if (gameBoardMatrix[i][columnIndex] != letter) {
      return false;
    }
  }
  return true;
}

function ticTacToeWinner(gameBoardMatrix, letter) {
  //행을 확인한다.
  let rowWin = checkRow(gameBoardMatrix[0], letter) || checkRow(gameBoardMatrix[1], letter) || checkRow(gameBoardMatrix[2], letter);

  let colWin = checkColumn(gameBoardMatrix, 0, letter) || checkColumn(gameBoardMatrix, 1, letter) || checkColumn(gameBoardMatrix, 2, letter);

  let diagonalWinLeftToRight = gameBoardMatrix[0][0] == letter && gameBoardMatrix[1][1] == letter && gameBoardMatrix[2][2] == letter;
  let diagonalWinRightToLeft = gameBoardMatrix[0][2] == letter && gameBoardMatrix[1][1] == letter && gameBoardMatrix[2][0] == letter;

  return rowWin || colWin || diagonalWinLeftToRight || diagonalWinRightToLeft;
}

ticTacToeWinner(board, "X"); // true or false
