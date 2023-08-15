## Transition

<p>요소의 CSS 속성 변화를 자연스럽게 연출하기 위해 사용</p>

- property : 어떠한 속성을 적용할것인지
- duration : 어느정도의 시간동안 적용할 것인지(ms, s)
- timing-function : transition의 전환 그래프 (ease-in, ease-out...)
- delay : 일정 시간 후 전환 시작하게 만듬.

```CSS
.test{
  transition : all 0.25s /* 모든 속성에 대해 적용하기 */
}

```

- all 이 아닌 각각 속성값에 적용하기 위해서는 아래처럼 쉼표를 활용한다.

```CSS
.test{
  transition : font-size 0.5s ease-in , color 0.25s ease-out;
}
```
