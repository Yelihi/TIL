<h2 align="center"> CSS </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2022.12.29](#2022-12-29)
- [2023.1.2](#2023-1-2)

  <br />

![--------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="프로젝트소개"> :book: 간단한 요약 정리 </h2>

## 2022-12-29

<br>

### Position

- 이전까지는 Position 중 relative 의 경우 absolute 와 달리, 기존 위치에 그대로 있는것이라 판단하였는데, 사실은 이전의 위치를 기억하고 있는것이었다.
- 이전 위치에 그대로 있는 것은 position : static 뿐이다.
- absolute 에서 가장 많이 쓰이는 요소 중간에 위치시키기

```css
.example {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- position: fiexd 의 경우 어디서 선언되었던, 화면 viewpoint 를 기준으로 상대위치가 결정된다.
- absolute 를 활용할 때 반드시 부모 태그에 relative 를 설정해주어야 한다.
  <br>

### Flexbox

- flex 를 다루는데 있어서 중요한 부분은 메인축(mainaxis) 를 잘 파악하는 것!
- 메인축을 다루는 프로퍼티는 justify-content, 수직축을 다루는 프로퍼티는 align-items, align-content 가 있다.

### Flex-wrap

<p align="justify">
flex 에서 wrap 과 nowrap 의 상황에 따라서 align-items, align-content 의 사용에도 영향을 끼치게 된다. 만약 wrap 으로 설정이 되어있어서, 화면이 축소함에 따라 요소가 축소되지 않고 밑으로 넘어갈 경우, align-items 로 설정했다면 생각처럼 화면 구성이 안나올 수 있다. <br>
줄 바꿈 현상이 일어나게 되면 메인축이 줄마다 생성이 되기 때문에, align-items 의 경우 각 메인축에 대한 수직축에 대해서 적용하기 때문에, center 로 설정해도 모든 요소가 viewpoint 중간으로 오는것이 아니라, 각각의 차지하는 공간의 중간으로 이동하게 된다. <br>
만일 전체가 다 가운데로 이동하게 하고 싶다면 align-content 를 사용하면 된다. 사실 사용하다보면 이를 다 따지기는 힘들기에 우선 align-items 를 사용해보고 아니다 싶으면 align-content 를 사용하자.
</p>

### Media Query

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

### Typography

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

## 2023-1-2

<br>

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

## background

- background-image: url() 안에 이미지 경로를 넣어준다. 확장자명도 반드시 포함해주기
- background-repeat: 이미지의 반복 여부를 결정한다.
- background-size: contain(요소안에 이미지 모든 부분을 넣는 것), cover(이미지 크기 변동 없음)
- contain 은 빈공간이 있더라도 이미지 전체를 넣는것이고, cover 는 원본 이미지에 요소를 대입한다 생각하자.
- background-position: x, y(center, bottom....) 이미지의 위치를 설정한다.
  <br />

### background - image 를 img 태그 대신 사용해야 하는 경우

<p>background 속성을 사용하는 이유는 사실 검색엔진 측면에서도 불리한 점이 있지만, 그럼에도 사용해야 하는 경우가 있는데, 에어비엔비 같은 경우 사용자가 자신이 소개하려는 룸 이미지를 올리게 되고, 그 이미지는 여러가지 사이즈로 이루어졌을 것이다. 너비와 높이가 제각각일 것이고, 그렇기 때문에 img 태그를 통해서 너비와 높이를 고정시켜줄 경우 안맞는 이미지가 등장할 시 문제가 발생한다. <br> 이에 background-image 를 사용하게 되면 제각각의 이미지가 들어오더라도 cover 옵션을 적용했다고 가정하면 모두 이미지가 설정해둔 box 크기에 잘 적용이 된다. 마찬가지로 이러한 상황에 있어서 background-image 는 유의미하게 사용될 수 있다.</p>
<br />

## flex-grow

<p>한 요소에 width 값을 지정해주지 않았을 때, flex 를 통해 내부 요소를 배치하게 되면, 일정 컨텐츠 크기 만큼만 가로 배치가 된다. 이때 flex-grow : 0 초과 숫자 를 기입할 시, 내부 최대 컨텐츠 가로폭을 능가하면서 배치가 이루어지게 된다는 점을 참고하자.</p>
<br />

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

  <br />

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

<br />
