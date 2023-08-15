## Media Query

- html 의 meta 태그에서 viewport 설정을 해주어야 device 에 따라 적절하게 작동하게 된다.

```html
<html>
  <head>
    <meta name="viewport" content="width=device-width>
    ...
```

- 미디어 쿼리 기본 작성 방법

```CSS
@media screen and (min-width: 768px){
  /* 768 이상에는 이러한 스타일을 적용해라 */
}
```

- 이렇기 때문에 여러번 미디어 쿼리를 적용하는 것이 가능하다. 또한 최소와 최대를 동시에 설정 가능하다
- if 문이라 생각하면 쉽게 이해가 될 것이다.

```CSS
@media screen and (min-width: 768px) and (max-width: 1270px){
  /* 768 이상 1270 미만에는 이러한 스타일을 적용해라 */
}
```

- 참고로 position : absolute 의 경우 top 과 left 등으로 위치조정을 할 텐데, 반응형으로 위치를 변경할 때는, 기존값과 변경되는 부분에 한해서 처리를 해주어야 한다. 만약 top 에서 bottom 을 사용하게 된다면 top : auto 로 처리하여 기존 0 값을 변경해주어야 한다.
- 기본적으로 반응형 웹사이트를 설계할 때 모바일 환경부터 설계를 하는 편이다.
  <br>
