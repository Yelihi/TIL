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

<br />

## opacity

<p>요소의 투명도를 결정하게 된다</p>

- 0 ~ 1 사이로 투명정도를 결정한다
- 주로 transition 에 사용한다.

<br />

## overflow

<p>컨텐츠가 정해진 요소의 범위를 넘어섰을 때 처리하기 위한 속성값</p>

- overflow : visible (그냥 다 보여줘라)
- overflow : auto / scroll (알아서 스크롤 처리하자)
- overflow : hidden (숨겨 버리자)
- 참고로 x 축과 y 축에 대하여 각각 속성을 설정해줄 수 있다. 예를 들어 가로로는 스크롤을 허용하지만 세로로는 허용하지 않는다면 overflow-x, overflow-y 로 각각 설정해줄 수 있다.

<br />

## transform

- 너무 다양한 속성값이 있지만 대표적으로 3가지가 있다.
- transform : translate(x, y)
- transform : scale()
- transform : rotate()
  <br/>

- translate 는 요소의 위치를 옮기는 속성인데, 특이점은 기존의 위치를 기억하고 있기에 다른 요소들에게 영향을 끼치지 않는다는 점에 있다.
- 각 축에 대해서만 움직이려한다면, translateX, translateY 처럼 설정이 가능하다.
- scale(N) / scale(x,y) 은 요소의 사이즈를 설정 가능한데, 기준점은 1 이다. 또한 transition 과 동일하게 본디 사이즈를 기억하고 있어서 다른 요소에 영향을 끼치지 않는다.
- rotate(Ndeg) 인 경우 단위에 조심을 해야하는데 90도를 돌리고 싶다면 90deg 로 표현해야 한다.
  <br/>

## Selectors

<p>셀렉터는 css 가 html 의 각 요소들을 스타일링 해주기 위해 사용하는 문법이라 생각하면 될 것 같다. css 에는 우선순위가 있고, 이러한 부분을 고려햐여 선택자를 잘 활용해야 의도한 대로 스타일링이 될 수 있으니 공부해보자.</p>

### Type, Class & ID Selector

```CSS
/* type : 요소 선택자 */
div{
  background-color: white;
}

p{
  color: black;
}

/* class : 요소 중 클래스 선언이 된 부분만 설정 */
/* 앞에 . 을 붙인다 */
/* 클래스의 특징은 여러 요소에 동일한 스타일을 적용시킬 수 있다.  */
.box{
  background-color: white;
}

/* 이렇게 and 를 표현할 수 있다 */
.box1.box2.box3{
 display: flex;
}
```

```html
<!-- 이렇게 여러가지 클래스를 적용할 수 있다 -->
<div class="box1 box2 box3"></div>
```

```CSS
/* ID : 유니크한 요소에 스타일을 적용한다 */
/* 여러 요소에 동시 적용을 하는 것은 아니다 */
#name {
  ...
}

```

### Child, Descendant & Sibling Selector

<p>html 요소들의 자식과 자손관계, 그리고 형제 관계에 대한 스타일을 표현하기 위하여 필요한 선택자</p>

```CSS
/* 자손 선택자 (자식 포함) */
section h1 {
  ...
}

/* 자식 선택자 */
section > h1 {
  ...
}

/* 형재 선택자들 */
/* ~ : 왼쪽 요소 이후 모든 요소 선택 */
.active ~ li {
  ...
}

/* + : 왼쪽 요소 바로 다음 요소 선택 */

.active + li {
  ...
}

```

<br />

### Structural Pseudo-classes (가상 클래스)

<p>여러 나열되는 요소 중 특정 인덱스의 요소에 대하여 스타일을 부여할 때 사용한다</p>

```CSS
li:first-child{
  ...
}

li:last-child{
  ...
}

li:nth-child(숫자){
  ...
}


```

### User-action Pseudo-classes (가상 클래스)

```CSS
a:hover{
  ...
}

/* 예를 들어 버튼을 클릭했을 때 */
a:active{
  ...
}

/* input 창이 focus 되어있을 때  */
a:focus{
  ...
}


```

### Cascading

<p>CSS 에서 선택자마다 우선순위가 다르고, 이를 잘 파악해야 한다.</p>

- 선택자 : type << class, pseudo-class << ID (오른쪽으로 갈 수록 우선순위가 높다)
- 스타일 : inline-style << !important
- important 는 왠만하면 쓰지 말자.

### Grid system

<p>레이아웃을 설계 할 때, 일관성을 유지하기 위한 방법론. Grid 라는 영역 안에서 요소를 배치한다.</p>

- container : 그리드 시스템이 적용되는 전체 범위
- column : 전체 범위를 일정 간격으로 나눌 때의 간격. 보통은 12간격
- gutter : 한 요소 내 양옆 간격 (여백을 주는 것)
- CSS 로도 가능하고, bootstrap 등을 활용하여 구현하여도 된다.
- 다만 실무에서는 되도록 직접 css 를 구성하여 작성하기를 원하고 있다.
  <br />

### Display : Grid

<p>요소의 1차원 나열을 flex 로 조정하였다면, 요소의 2차원 배열을 구성하기 위한 방법으로 grid 가 있다. 물론 flex 로도 2차원 배열을 구성할 수 있는데, grid 가 좀 더 직관적이고 사용하기가 편리하다. 다만 익숙치 않으니 어색한 부분이 있고, 이전까지는 grid 가 나타났지만 ie 에서 지원을 하지 않기 때문에 사용할 수 없었다. 아마도 11버전에서는 지원을 하는 것으로 알고 있는데, 어차피 2022년 6월 이후로 ie 의 지원이 종료되었다는 걸로 알고 있어서, 좀 더 grid 의 활용도가 높아질 것으로 생각한다.<br/>실제로 해외에서는 이전부터 grid를 통한 레이아웃 설정이 빈번하였고, 여러 스타일 라이브러리에서도 기본적으로 grid 기능을 제공한다. 다만 현업에서는 grid 를 직접 설계해야 할 수 있으니, CSS 로 grid 를 다루는 방법에 대해서 배워보자</p>

- display : grid 를 통해 설정이 가능하다.
- 위에서 설명한 container 를 먼저 설정해주어야 한다. 전체 화면을 가로, 세로로 어떻게 나눌것인지(마치 바둑판처럼) 결정하여야 하기 때문이다.
- 이렇게 row 와 column 을 설정하는 방법은 아래와 같다.

```CSS
#garden{
  display: flex;
  grid-template-columns: 20% 20% 20% 20% 20%; /* 세로선의 갯수와 비율이다. 나타낼 수 있는 방법은 여러가지가 있다(repeat 등) */
  grid-template-rows: 20% 20% 20% 20% 20%; /* 몇 줄인지, 각 줄이 화면에서 차지하는 비율을 결정한다 */
}

#water{
  grid-column-start: 1; /* garden 이라는 container 안에 water 라는 요소가 어느 위치부터 시작할지를 결정한다 */
  grid-column-end: 4; /* water 요소의 가로 너비를 결정한다. 몇번째 column 에서 시작해서 몇번째 column 에서 끝이날지 결정한다 */
  /* 값은 양수도 되고 음수도 된다. 음수라면 시작 기준을 왼쪽이 아닌 오른쪽에 두는 것이다. */
}

#water{
  grid-column-start: 1; /* garden 이라는 container 안에 water 라는 요소가 어느 위치부터 시작할지를 결정한다 */
  grid-column-end: span 2; /* 이렇게 선을 기준으로 하는 것이 아닌 column 의 너비를 이용할 수 있다. 단 너비는 시작부분의 너비도 포함인 것이다 */

  /* 반대도 가능하다 */
  grid-column-start: span 3;
  grid-column-end: 6;
}

#water{
  grid-column : 2 / 4; /* 매번 start, end 를 해주지 말고 슬래시를 통해 2번째 선에서 4번째 선까지로 지정할 수 있다 */
  grid-column : 2 / span 2; /* 위와 같은 너비다 */
}
```

- 위에는 주로 column 을 위주로 살펴보았다.
- grid 는 flex 와는 달리 2차원 배열이 가능하기에 row 설정도 가능하다.
- 설정하는 방법은 column 과 동일하다.

```CSS
#garden{
  display: flex;
  grid-template-columns: 20% 20% 20% 20% 20%; /* 세로선의 갯수와 비율이다. 나타낼 수 있는 방법은 여러가지가 있다(repeat 등) */
  grid-template-rows: 20% 20% 20% 20% 20%; /* 몇 줄인지, 각 줄이 화면에서 차지하는 비율을 결정한다 */
}

#water{
  grid-row-start: 3;
  grid-row-end: 5;
  grid-row: 3 / 5;
}
```

- 두가지 방법을 섞어서 활용하면 2차원 위치를 쉽게 표현할 수 있다.

```CSS
#garden{
  display: flex;
  grid-template-columns: 20% 20% 20% 20% 20%; /* 세로선의 갯수와 비율이다. 나타낼 수 있는 방법은 여러가지가 있다(repeat 등) */
  grid-template-rows: 20% 20% 20% 20% 20%; /* 몇 줄인지, 각 줄이 화면에서 차지하는 비율을 결정한다 */
}

#water{
  grid-column: 2 / span 4; /* 2번째 줄에서 4개 너비 */
  grid-row: 1 / span 5; /* 1번째 출에서 5개 너비 */
}

/* 두가지를 하나로 합친 것이 grid-area 이다 */
/* grid-area : grid-row-start / grid-column-start / grid-row-end / grid-column-end */
#water{
  grid-area: 1 / 2 / span 5 / span 4;
}


```

- 예시를 들긴 힘들었지만, 그리드 요소의 순서를 표현해주는 order 속성도 있다.
- 또한 예시에서는 모두 template 를 20% 로만 설정하였는데, 이를 자유롭게 변경이 가능하다. repaet 이 주로 활용된다.

```CSS
#garden{
  display: flex;
  grid-template-columns: repeat(5, 20%); /* 세로선의 갯수와 비율이다. 나타낼 수 있는 방법은 여러가지가 있다(repeat 등) */
  grid-template-rows: 20% 20% 20% 20% 20%; /* 몇 줄인지, 각 줄이 화면에서 차지하는 비율을 결정한다 */
}

/* grid 는 새로운 단위인 fractional(fr) 을 제공한다. 만약 1fr 3fr 로 설정할 시 총 공간은 4개로 동일하게 제공된다. 1/4 3/4 와 같다 */
#garden{
  display: flex;
  grid-template-columns: 1fr 5fr; /* 1/6 5/6 */
  grid-template-rows: 20% 20% 20% 20% 20%; /* 몇 줄인지, 각 줄이 화면에서 차지하는 비율을 결정한다 */
}

#garden{
  display: flex;
  grid-template-columns: 75px 3fr 2fr; /* 왼쪽은 75px 을 사용하고, 나머지는 3/5 2/5 를 차지한다 */
}
```

- grid-template 는 마치 grid-area 와 같이 한번에 표현한 것이다.
- grid-template : grid-template-rows / grid-template-columns

```CSS
#garden{
  display: flex;
  grid-template: 3fr 2fr / 200px 1fr
}
```

- 기본적으로 그리드를 활용하는 방법에 대해서 살펴보았다
- 사실 그리드 레이아웃은 반응형일 때 그 진가가 발휘된다 생각하는데, 실제로 많은 스타일 라이브러리나 프레임워크도 이러한 기능을 제공한다.
- 보통 반응형은 media query 를 활용하게 되는데, grid 는 물론 media query 도 사용하지만, 어떤 상황에서는 사용하지 않아도 된다.

```CSS
div {
  display: grid;
  grid-template-columns: repaet(auto-fill, minmax(220px, 1fr));
  gap: 15px;
}

```

- 위처럼 컨테이너가 작성이 되었다 가정해보자
- auto-fill : 행과 열의 크기에 맞게 자동적으로 조정해준다. repaet 과 함께 사용한다
- minmax : 첫 번째 인수는 최소값이고 두번째 인수가 최대값이다.
- 또한 grid-template-areas 를 활용하면 역시나 반응형 디자인을 할 수 있다.
- 예시로서 화면이 가로모드일때와 세로모드일 때를 나누어서 배치한다고 가정하겠다.

```html
<body>
  <section id="grid">
    <div id="title">게임 제목</div>
    <div id="board">게임 보드</div>
    <div id="controls">컨트롤</div>
    <div id="stats">통계</div>
    <div id="score">점수</div>
  </section>
</body>
```

```CSS
/* areas 를 사용할 때는 템플릿 설정 column 수와 일치하도록 해야한다. */
#grid {
  display: grid;
  grid-template-columns: auto 1fr; /* 2개의 column */
}

@media (orientation: portrait) {
  #grid {
    grid-template-rows: auto auto 1fr auto;
    grid-template-areas: "title stats" "score stats" "board board" "ctrls ctrls"; /* 2개의 column */
    /* 레이아웃 화면에서 각각 차지하는 부분의 이름을 하나하나 작성해준다 */
  }
}

@media (orientation: landscape) {
  #grid {
    grid-template-rows: auto 1fr auto;
    grid-template-areas: "title board" "stats board" "score ctrls";
  }
}

#title {
  /* 그리드 영역의 이름을 설정해준다 */
  grid-area: title;
  background-color: red;
}

#score {
  grid-area: score;
  background-color: #0066ff;
}

#stats {
  grid-area: stats;
  background-color: aquamarine;
}

#board {
  grid-area: board;
  background-color: blueviolet;
}

#controls {
  grid-area: ctrls;
  background-color: yellow;
}

```

- 실제로 페이지를 실행시키면, 개발자도구에서 확인이 가능한데, 가로모드와 세로모드마다 레이아웃이 알맞게 변경하게 된다.
- 더 많은 예제나 설명을 알고싶다면 [Grid Guidebook](https://yamoo9.gitbook.io/css-grid/css-grid-guide) 을 참고하자.

<br />

### Grid의 탄생

<p>레이아웃을 격자 구조의 그리드를 바탕으로 설계하는 것은 효율성에 있어서 아주 좋다. 하지만 이전까지는 CSS 에서 그리드 기능을 지원하지 않아 프레임워크에 의존했어야 헀다. 대표적으로 Bootstrap 이나 Susy 가 있다. 다만 그리드를 활용하기 위해 Bootstrap 을 사용해야 한다면 사용법까지 익혀야 하기 때문에 단점이다.<br/>다행인 것은 이제 CSS 모듈을 언어 차원에서 지원하기 시작했고, 대부분의 브라우저에서 지원하게 된다. 물론 Ie 의 경우 부분적으로 10 이상에서 적용할 수 있다.</p><br />

<p>웹 초창기에는 대표할만한 레이아웃 기법은 없는 텍스트 위주였으며, 시간이 지나 <strong>테이블 레이아웃</stong>(투명한 보더를 넣어 테이블 안에 텍스트)을 사용하게 되었지만, 테이블 본연의 기능을 망각하고 불편하기에 당연히 오늘날에는 더이상 사용되지 않는다. 추후 <strong>프레임 레이아웃</strong>이 생겨나 여러장의 html 문서를 하나의 문서로 결합하는 방식이지만, 최근 Ajax 비동기 통신 기술 발전으로 당연하게도 사용되지 않게 되었다.<br/>웹 표준 시대가 태동하면서 더이상 구조 언어인 html 에서 레이아웃을 하지않고, 표현 언어인 CSS가 제공하는 본연 레이아웃 기술인 float 와 position 을 사용하게 되었다. 다만 버그가 많고 여러 디바이스를 지원해야하는 반응형에는 적합하지 않아 <strong>Flexbox 레이아웃</strong> 방식이 등장하게 된다. flex 란 표현에서 알 수 있듯이 유연한 레이아웃을 제공하겠다는 의미이고, x축이 y축 한 방향으로 요소를 배치, 정렬, 순서 변경을 할 수 있다는 점에서 오늘까지 많이 사용되고 있다.</p><br />

<p>다만 하나의 축에 대해서만 다루는 flex 에서도 분명 불편함이 있었기에 <strong>Grid</strong> 기술이 개발되었다. 물론 ie는 언제나 골칫거리..ie 에 크로스브라우징을 하는 방법은 <a href="https://yamoo9.gitbook.io/css-grid/css-grid-for-ie" targe="_blank">크로스 브라우징</a> 을 참고하자</p>
