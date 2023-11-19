// k의 배열이 하나의 배열안에 메개변수로 주어짐
// 이 배열들은 정렬이 되어있고, 같은 숫자가 중복되어 있는경우도 있음
// 중복숫자도 하나로 치고 결국 배열중에서 어느 숫자가 공통적으로 다 들어있는지 찾는 문제
// 얼핏 k 개의 배열이니 일일히 그때그때 다 확인해야 할까 싶기도 했다.
// 하지만 hashtable 을 만들어서 총 갯수를 value 로 해놓으면 되겠다 판단.

function commonElement(karr) {
  let hashtable = {};
  let answer = [];

  for (let i = 0; i < karr.length; i++) {
    let currentArray = karr[i];
    let lastNum;
    for (let j = 0; j < currentArray.length; j++) {
      let current = currentArray[j];
      if (lastNum != current) {
        if (!hashtable[current]) {
          hashtable[current] = 1;
        } else {
          hashtable[current]++;
        }
      }
      lastNum = current;
    }
  }

  for (let key of Object.keys(hashtable)) {
    if (hashtable[key] == karr.length) {
      answer.push(parseInt(key));
    }
  }

  return answer;
}
