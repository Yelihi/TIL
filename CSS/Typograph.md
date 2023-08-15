## Typography

<p>타이포그래피는 웹의 가독성을 위한 텍스트의 속성이나 배치를 구성하는 방법이라 생각하면 된다.</p>

- font-size: 글자의 크기 (px, rem, em)
- em : 실제로 적용된 font-size 를 기준으로 한다.
- rem : root em 이란 뜻으로, 실제 최상단의 노드의 font-size 를 기준으로 한다. 이렇기 때문에 주로 rem 이 쓰이게 된다.
- line-height : 줄의 높이. 즉 줄 간격을 뜻한다. 단위는 역시나 px, em, rem. 단위를 적지 않을때는 적용하는 태그의 font-size 에 비례하여 적용된다.
  그리고 line-height 가 얼마든, 글자는 항상 가운데에 놓이게 된다.
- letter-spacing : 글자의 간격. 단위는 px, em 이다. rem 은 사용하지 않는다. 그리고 단위를 생략하면 안된다.
- font-family : 폰트를 결정한다.

```CSS
.text{
  /* 특정 폰트를 적용해라 */
  font-family: "Poppins";
  /* 특정 폰트가 없다면 아무런 sans-serif 계열 중 하나를 넣어서 보여줘 */
  font-family: "Poppins", sans-serif;
  /* 특정 폰트가 없다면 그 다음 폰트를, 이마저도 없다면 아무런 sans-serif 계열 중 하나를 넣어서 보여줘 */
  font-family: "Poppins", "Roboto", sans-serif;
}
```

- sans-serif 계열은 대충 고딕계열이라고 생각하면 된다. 반대로 serif 계열은 명조? 느낌의 폰트계열이다.
- font-weight : 100 에서 900 까지 기입이 가능하며, 보통 400, 700 을 많이 사용한다. 100단위로 적용해야 한다.
- color : 글자의 색상값을 조정할 수 있다. hex 코드를 사용하거나 rgb, rgba 를 활용해서 설정할 수 있다.
- text-align : 글자를 정렬한다. (left, center, right)
- text-transform : 글자를 변형시킨다. (none, capitalize - 첫 문자만 대문자, uppercase, lowercase)
- text-decoration : 글자를 꾸며준다. (none, underline, line-trough, overline). a 태그에서 밑줄을 지워줄 때 사용한다.
- font-style : italic 만 기억을 해보자. 글자를 기울이게 된다.
  <br />

## webfont

- 폰트를 다운받아 사용하기 위해 설정을 해주려면 아래와 같이 font-face 를 작성해주면된다.
- 우선 폰트들을 다 다운받아 폴더에 저장한다.
- 이후 font.css 를 작성해준다.

```CSS
@font-face{
  font-family: '각자 정의할 이름';
  font-style: normal;
  font-weight: 400;
  src: url('webfont.eot'); /* IE9 Compat Modes */
  src: url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('webfont.woff2') format('woff2'), /* Super Modern Browsers */
       url('webfont.woff') format('woff'), /* Pretty Modern Browsers */
       url('webfont.ttf')  format('truetype'), /* Safari, Android, iOS */
       url('webfont.svg#svgFontName') format('svg'); /* Legacy iOS */
}
```

- 여기서 src 부분을 보게 되면 각 브라우저의 특징마다 사용하게 될 폰트의 포맷을 다르게 사용하겠다는 의미
- 즉 사파리에서는 ttf 를 사용하겠다는 것이다.
- 따라서 폰트를 다 다운받을 시에는 이에 맞는 파일들을 전부 받아주어야 한다.
- 안가지고 있는 포맷은 그냥 위에서 지워주도록 하자. 예를 들어 svg 가 없으면 위에서 지워주도록 하자.
- 그리고 위 'webfont' 부분을 우리가 가진 주소로 변경을 해주자.
- 예를 들면

```CSS
@font-face{
  font-family: '각자 정의할 이름';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/font/NanumSquareRound.eot'); /* IE9 Compat Modes */
  src: url('./assets/font/NanumSquareRound.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./assets/font/NanumSquareRound.woff2') format('woff2'), /* Super Modern Browsers */
       url('./assets/font/NanumSquareRound.woff') format('woff'), /* Pretty Modern Browsers */
       url('./assets/font/NanumSquareRound.ttf')  format('truetype'), /* Safari, Android, iOS */
       url('./assets/font/NanumSquareRound.svg#svgFontName') format('svg'); /* Legacy iOS */
}
```

- 이후 각 폰트의 weight 마다 font-face 를 설정해주자.
- 이후 이 font.css 파일을 import 해주어야 한다. 2가지 방식이 있는데, html 에 적용을 하기 위해서는 link 를 걸어서 적용해주면 되고, css 에 적용하려면

```CSS
@import url("./fonts.css")
```

- 이렇게 적용해주면 된다.
  <br />
