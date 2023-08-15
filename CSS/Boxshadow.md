## boxShadow

<p>요소에게 그림자를 부여할 떄 사용한다.</p>

- box-shadow : h-offset v-offset blur spread color
- 좀 더 간단하게 표현하자면
- h-offset : x 축으로 얼마만큼 그림자를 이동시킬지
- v-offset : y 축으로 얼마만큼 그림자를 이동시킬지
- blur : 흐린정도를 설정한다.
- spread : 그림자의 사이즈를 설정한다. (보통 생략한다)
- color : 그림자의 색상을 설정해준다.

```CSS
.test{
  box-shadow: 0 10px 16px 0 rgba(255, 73, 73, 0.35);
}
```

- 보통 Neomorphism 형식의 그림자 패턴을 많이 사용한다.
  [Neomorphism 생성기](https://neumorphism.io/#e0e0e0)
