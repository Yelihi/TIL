## Animation

<p>전환 시 발생하는 transition 과는 차이점이 있다.</p>

- name : 어떠한 애니매이션을 줄것인지 결정한다.
- from...to.. : 시작점과 끝 지점에서의 구현을 나타낼 수 있다.
- animation-name : 애니매이션을 적용시킬 요소에 넣어주는 프로퍼티
- animation-duration : 애니매이션의 지속 시간을 설정한다. (ms, s)
- 애니매이션이 끝나면 다시 요소는 원래 상태로 돌아오게 된다.
- timing-function : 애니매이션의 전환 그래프 (ease-in, ease-out...)
- animation-delay : 정해진 시간 후 애니매이션 동작하게 만듬
- animation-iteration-count : 총 몇번 횟수를 반복할 것인지 결정한다. (무한 : infinite)
- animation-direction : 애니매이션을 어떠한 방향으로 진행할지 (기본값은 from -> to)
- animation-direction : alternate 속성을 부여하면 애니매이션이 번갈아가면서 방향이 바뀜.

```CSS

.box {
  position: relative;
  width: 300px;
  height: 300px;
  background-color: #0066ff;
  animation-name : move-box;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}

@keyframes move-box {
  from {
    top : 0px;
    background-color: #0066ff;
  }

  to {
    top: 200px;
    background-color: green;
  }
}

```
