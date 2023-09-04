## Programers - 파일명 정렬

### 문제 설명

세 차례의 코딩 테스트와 두 차례의 면접이라는 기나긴 블라인드 공채를 무사히 통과해 카카오에 입사한 무지는 파일 저장소 서버 관리를 맡게 되었다.<br /><br />

저장소 서버에는 프로그램의 과거 버전을 모두 담고 있어, 이름 순으로 정렬된 파일 목록은 보기가 불편했다. 파일을 이름 순으로 정렬하면 나중에 만들어진 ver-10.zip이 ver-9.zip보다 먼저 표시되기 때문이다.<br /><br />

버전 번호 외에도 숫자가 포함된 파일 목록은 여러 면에서 관리하기 불편했다. 예컨대 파일 목록이 ["img12.png", "img10.png", "img2.png", "img1.png"]일 경우, 일반적인 정렬은 ["img1.png", "img10.png", "img12.png", "img2.png"] 순이 되지만, 숫자 순으로 정렬된 ["img1.png", "img2.png", "img10.png", img12.png"] 순이 훨씬 자연스럽다.<br /><br />

무지는 단순한 문자 코드 순이 아닌, 파일명에 포함된 숫자를 반영한 정렬 기능을 저장소 관리 프로그램에 구현하기로 했다.<br /><br />

![자세한 문제](https://school.programmers.co.kr/learn/courses/30/lessons/17686)

### 제한사항

- files는 1000 개 이하의 파일명을 포함하는 문자열 배열이다.
- 각 파일명은 100 글자 이하 길이로, 영문 대소문자, 숫자, 공백(" "), 마침표("."), 빼기 부호("-")만으로 이루어져 있다. 파일명은 영문자로 시작하며, 숫자를 하나 이상 포함하고 있다.
- 중복된 파일명은 없으나, 대소문자나 숫자 앞부분의 0 차이가 있는 경우는 함께 주어질 수 있다. (muzi1.txt, MUZI1.txt, muzi001.txt, muzi1.TXT는 함께 입력으로 주어질 수 있다.)

### 문제 풀이

MDN 의 도움을 받아서 어찌저찌 풀었지만, 코테에서 MDN 을 활용할 수 없다면 풀지 못했을 것 같다. 왜냐하면 정규표현식이 필요했기 때문이다. (아니어도 되련진 모르겠다만...)<br /><br />

문제를 천천히 읽어보면 요구사항은 다음과 같이 정리할 수 있다.

- head 부분은 파일이름에서 첫 숫자가 나오기 전까지의 부분으로 정렬할때는 대소문자를 구별하지 않고 공백이나 특수문자등이 포함될 수 있다.
- number 부분은 첫 숫자부터 이어져 가다 처음으로 문자열이 나오면 그때까지를 number 로 칭하며, 앞에 0이 붙을 수 있으나 010 과 10은 같은 수로 정렬한다.
- 그 외 나머지 이름 부분을 rest 로 하며 여기는 딱히 정렬하지 않고 주어진 배열으로 그대로 반환한다.
  <br />

이를 정렬 조건과 함께 다시 정리하면 다음과 같다.

- head 는 대소문자를 구별하지 않고 알파벳순으로 정렬한다. (a 가 b 보다 앞에 나오게)
- number는 만일 head 가 동일하다면(동일문자) 숫자순으로 정렬한다. (1, 2, 10, 11)
- rest 는 그대로 반환한다.
  <br />

이렇게 sort 조건을 변경하면서 작업해주면 된다고 생각한다. 즉, 문제를 해결하려면 먼저 head, number, rest 를 구별해야하며, 이후 조건에 따라 sort 함수의 return 을 신경써주면 된다.
<br />

```js
function getHead(...arg) {
  return arg.map((elem) => {
    const head = elem.match(/^([^0-9])*/i)[0];
    return head;
  });
}

function getNumber(...arg) {
  return arg.map((elem) => {
    const head = getHead(elem);
    const number = elem.replace(head, "").match(/^([0-9])*/i)[0];
    return number;
  });
}

function getRest(...arg) {
  return arg.map((elem) => {
    const head = getHead(elem);
    const number = getNumber(elem);
    return elem.replace(head, "").replace(number, "");
  });
}

function solution(files) {
  return files.sort((file1, file2) => {
    const [head1, head2] = getHead(file1, file2);
    const [number1, number2] = getNumber(file1, file2);
    const [rest1, rest2] = getRest(file1, file2);

    if (head1.toLowerCase() == head2.toLowerCase()) {
      if (Number(number1) < Number(number2)) {
        return -1;
      }
    }

    if (head1.toLowerCase() < head2.toLowerCase()) return -1;
  });
}
```

<br />

오랜만에 sort 를 활용해서 그런지 익숙치 않았다. 그래서 오름차순이 -1 이고 내림차순이 1 이라는 사실을 잘 모르고있어서 MDN 을 참고하게 되었다. 또한 정규표현식 문법도 까먹어서 다시 살펴봤어야 했고, 운좋게 정규표현식 표현을 잘 쓸 수 있어서 해결할 수 있었던 것 같다.

### 다른사람 풀이

```js
function solution(files) {
  const re = /^([a-zA-Z-\. ]+)([0-9]+)(.*)$/;
  let dict = [];
  files.forEach((entry, idx) => {
    let [fn, head, num] = entry.match(re);
    dict.push({ fn, head: head.toLowerCase(), num: parseInt(num), idx });
  });

  return dict
    .sort((a, b) => {
      if (a.head > b.head) return 1;
      if (a.head < b.head) return -1;
      if (a.num > b.num) return 1;
      if (a.num < b.num) return -1;
      return a.idx - b.idx;
    })
    .map((e) => e.fn);
}
```

<br />

정규표현식에서 다시 놀랐다. 한번에 표현해서 이를 구조분해 할 수 있다는 것을 참고해야 겠다. 나처럼 3가지 함수로 나누어서 표현하지 않아도 된다는 점에서
훨씬 효율적이라 생각이 든다.
