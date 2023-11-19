//자바스크립트에는 다차원 배열은 없다.
//대신 가변 배열이 있다.
//가변배열은 항목이 배열인 배열

function Matrix(rows, columns) {
  let jaggedarray = new Array(rows);
  for (let i = 0; i < columns; i++) {
    jaggedarray[i] = new Array(rows);
  }
  return jaggedarray;
}
