## Programers - 오픈채팅방

### 문제 설명

카카오톡 오픈채팅방에서는 친구가 아닌 사람들과 대화를 할 수 있는데, 본래 닉네임이 아닌 가상의 닉네임을 사용하여 채팅방에 들어갈 수 있다. <br /><br />

신입사원인 김크루는 카카오톡 오픈 채팅방을 개설한 사람을 위해, 다양한 사람들이 들어오고, 나가는 것을 지켜볼 수 있는 관리자창을 만들기로 했다. 채팅방에 누군가 들어오면 다음 메시지가 출력된다. <br /><br />

"[닉네임]님이 들어왔습니다." <br /><br />

채팅방에서 누군가 나가면 다음 메시지가 출력된다. <br /><br />

"[닉네임]님이 나갔습니다." <br /><br />

채팅방에서 닉네임을 변경하는 방법은 다음과 같이 두 가지이다. <br /><br />

채팅방을 나간 후, 새로운 닉네임으로 다시 들어간다. <br />
채팅방에서 닉네임을 변경한다. <br />
닉네임을 변경할 때는 기존에 채팅방에 출력되어 있던 메시지의 닉네임도 전부 변경된다. <br /><br />

예를 들어, 채팅방에 "Muzi"와 "Prodo"라는 닉네임을 사용하는 사람이 순서대로 들어오면 채팅방에는 다음과 같이 메시지가 출력된다. <br /><br />

"Muzi님이 들어왔습니다."<br />
"Prodo님이 들어왔습니다."<br /><br />

채팅방에 있던 사람이 나가면 채팅방에는 다음과 같이 메시지가 남는다.<br /><br />

"Muzi님이 들어왔습니다."<br />
"Prodo님이 들어왔습니다."<br />
"Muzi님이 나갔습니다."<br /><br />

Muzi가 나간후 다시 들어올 때, Prodo 라는 닉네임으로 들어올 경우 기존에 채팅방에 남아있던 Muzi도 Prodo로 다음과 같이 변경된다.<br /><br />

"Prodo님이 들어왔습니다."<br />
"Prodo님이 들어왔습니다."<br />
"Prodo님이 나갔습니다."<br />
"Prodo님이 들어왔습니다."<br /><br />

채팅방은 중복 닉네임을 허용하기 때문에, 현재 채팅방에는 Prodo라는 닉네임을 사용하는 사람이 두 명이 있다. 이제, 채팅방에 두 번째로 들어왔던 Prodo가 Ryan으로 닉네임을 변경하면 채팅방 메시지는 다음과 같이 변경된다.<br /><br />

"Prodo님이 들어왔습니다."<br />
"Ryan님이 들어왔습니다."<br />
"Prodo님이 나갔습니다."<br />
"Prodo님이 들어왔습니다."<br /><br />

채팅방에 들어오고 나가거나, 닉네임을 변경한 기록이 담긴 문자열 배열 record가 매개변수로 주어질 때, 모든 기록이 처리된 후, 최종적으로 방을 개설한 사람이 보게 되는 메시지를 문자열 배열 형태로 return 하도록 solution 함수를 완성하라.

### 제한사항

- record는 다음과 같은 문자열이 담긴 배열이며, 길이는 1 이상 100,000 이하이다.
- 다음은 record에 담긴 문자열에 대한 설명이다.
  - 모든 유저는 [유저 아이디]로 구분한다.
  - [유저 아이디] 사용자가 [닉네임]으로 채팅방에 입장 - "Enter [유저 아이디] [닉네임]" (ex. "Enter uid1234 Muzi")
  - [유저 아이디] 사용자가 채팅방에서 퇴장 - "Leave [유저 아이디]" (ex. "Leave uid1234")
  - [유저 아이디] 사용자가 닉네임을 [닉네임]으로 변경 - "Change [유저 아이디] [닉네임]" (ex. "Change uid1234 Muzi")
  - 첫 단어는 Enter, Leave, Change 중 하나이다.
  - 각 단어는 공백으로 구분되어 있으며, 알파벳 대문자, 소문자, 숫자로만 이루어져있다.
  - 유저 아이디와 닉네임은 알파벳 대문자, 소문자를 구별한다.
  - 유저 아이디와 닉네임의 길이는 1 이상 10 이하이다.
  - 채팅방에서 나간 유저가 닉네임을 변경하는 등 잘못 된 입력은 주어지지 않는다.

### 문제 풀이

시간복잡도는 10만이라는 숫자를 고려할 때 이중반복을 쓰면 1억이 넘어가서 안된다. 따라서 n 이 최대라고 할 수 있겠다. <br />

구현 문제라고 생각한다. 주어진 record 를 조작하여 그에 맞는 result 배열을 만든다. 여기서 포인트라면 주어진 id 에 따른 최종적인 nickname 이 기존 메시지에 모두 적용되야 한다는 점이다.<br />
따라서 이런 경우라면 최종적으로 nickname 이 적용된 후 메시지를 마지막에 result 에 push 하는 방향이 좋다 생각한다. (실무라고 생각하진 말자. 실무는 애초에 db 를 통하는 것이니깐) <br />

- 우선 record 에서 id 에 대응하는 nickname 을 객체로 데이터구조화 한다. 순회가 필요하다
- 이후 최종 nickname 을 알게 되었다면 이제 다시 record 를 순회하면서 'Enter' 와 'Leave' 에 따라 최종 nickname 을 대입한다.
- 그리고 조건에 맞게 문장을 변경하여 result 에 push한다.

문제를 잘 풀었지만, 구조분해 및 생각전환 등 약간의 연습이 더 필요한 문제라고 생각이 든다.

```js
function solution(record) {
  const result = [];
  const nickNameById = {};

  // 우선 닉네임 데이터를 구성
  record.forEach((user) => {
    let seperate = user.split(" ");
    if (seperate[0] !== "Leave") {
      nickNameById[seperate[1]] = seperate[2];
    } else {
      return;
    }
  });

  // 다시 순회를 돌면서 record 내 유저에 해당하는 닉네임을 모두 변경
  const changeRecord = record.map((user) => {
    let seperate = user.split(" ");
    if (seperate[0] == "Enter") {
      seperate.pop();
      seperate.push(nickNameById[seperate[1]]);
      result.push(`${seperate[2]}님이 들어왔습니다.`);
      return;
    }
    if (seperate[0] == "Leave") {
      seperate.push(nickNameById[seperate[1]]);
      result.push(`${seperate[2]}님이 나갔습니다.`);
      return;
    }
  });

  return result;
}
```

<br />

- 처음 푼 방식은 위와 같았는데, 이후 구조분해의 특징과 최종 nickname 에 대한 관점 변화를 적용해보면서 아래와 같이 수정했다.

```js
function solution(record) {
  const result = [];
  const nickNameById = {};

  // 우선 닉네임 데이터를 구성
  record.forEach((user) => {
    const [order, id, nickname] = user.split(" ");
    if (order !== "Leave") {
      nickNameById[id] = nickname;
      return;
    }
  });

  // 다시 순회를 돌면서 record 내 유저에 해당하는 닉네임을 모두 변경
  record.forEach((user) => {
    const [order, id, nickname] = user.split(" ");
    if (order == "Enter") {
      result.push(`${nickNameById[id]}님이 들어왔습니다.`);
      return;
    }
    if (order == "Leave") {
      result.push(`${nickNameById[id]}님이 나갔습니다.`);
      return;
    }
  });

  return result;
}
```
