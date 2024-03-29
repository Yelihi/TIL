## SVG

<p>SVG(Scalable Vector Graphics)는 2차원 백테 그래픽을 XML 기반의 마크업 언어로 서술하며, 우리가 흔히 알고 있는 image 포맷중 하나이다. 용어 뜻 그대로 확장이 가능한 이미지 포맷인데, 이미지의 사이즈를 어떠한 파일 크기 변화없이 손쉽게 변화가 가능하다. 더군다나 화질의 저하 역시 없다. 또한 앞서서 XML 기반의 소스 코드라는 점이고 이는 웹 상의 HTML 코드에 그대로 같이 사용이 가능하다는 점이다(inline). jpg 나 png 등과 같은 포맷과 달리, html 처럼 우리가 이해할 수 있는 언어기반으로 소스코드가 작성되어 있기에, 포토샵 등과 같은 편집기를 사용하지 않고도 이미지를 코드 내에서 수정이 가능하다.</p><br />

<p>기본적으로 svg 이미지가 렌더링 될 때는 소스 코드 위에서부터 아래로 렌더링이 이루어진다. 보통 코드는 아래처럼 주어진다.</p><br />

```js
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect x=0 y=0 width=100 height=50 />
    <circle class="svg-circle" cx="50" cy="50" r="10"/>
</svg>
```

<br />

<p>svg 루트 태그 아래 여러 태그들이 들어올 수 있고, 태그의 이름에서 유추할 수 있듯이 위 코드에서는 사각형과 원형을 나타낸다. 특히 class, id 역시 속성으로 사용할 수 있는데, 이를 통해 CSS, Javascript 로 접근이 가능해진다. 기본적으로 가지고 있는 태그는 아래와 같다.</p><br />

> **기본도형태그**

- 기본 모양에 대한 다양한 태그들이 있다. 이들이 서로 모여 하나의 이미지를 생성한다.
- <rect>, <circle>, <line>, <polygon>, <path>...

> **텍스트**

- 텍스트 태그는 svg 내부에 텍스트를 만드는데 사용된다.
- <text>

> **접근성 태그**

- 제목, 설명 태그는 특히 필요한 옵션 컨텐츠를 제공하기 위한 것이며 화면에 표시되지 않는다.
- <title>, <desc>

> **그룹태그**

- 이 태그는 요소를 그룹화하여 클래스 이름을 추가하고 애니메이션, 필터, 패턴 및 효과를 그룹에 적용할 수 있게 한다.
- <g>

### 모든 이미지를 svg 로 하는것이 좋을까?

<p>제목에서 연상할 수 있듯이, 상황에 따라서는 svg 형식을 사용하지 말아야 하는데, 대표적으로 표현해야 하는 이미지가 복잡한경우이다. 실제 사진이나 질감이 복잡한 그림의 경우 svg 로 표현하는것을 피해야한다.</p>

### svg의 속성값을 살펴보기

<p>위 코드 예시를 통해서 다시한번 살펴보기로 하자</p><br />

```js
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect x=0 y=0 width=100 height=50 />
    <circle class="svg-circle" cx="50" cy="50" r="10"/>
</svg>
```

<br />

> **xmlns**

<p>이 속성은 XML 요소 간의(혹은 document와의) 이름 충돌을 방지해주기 위한 네임스페이스를 지정하는 속성이다. 이름이 충돌된다는 의미는 무엇일까? 앞서 살펴본 태그 중에서 `title` 이라는 태그를 살펴보자. 실제 title 이라는 태그는 비단 svg 뿐 아니라 DOCTYPE 내에서도 사용이 된다. 보통 title은 head 에서 대표적으로 한번 사용되는데, 네임스페이스를 통해 태그의 구역을 제한해주지 않는다면 브라우저는 title을 구별할 수 없을 것이다. 이러한 이유로서 네임스페이스가 필요하고 보통 URL 형식으로 작성된다만 실제 링크를 나타내지는 않는다.</p><br />

> **viewbox**

<p>svg의 범위를 지정하는 속성이다. css 에서 relative 를 상상하면 좀 더 쉽게 이해할 수 있을 것이다. 이 외 종횡비 역시 설정해줄 수 있다.</p><br />

<p>앞에서 설명하였듯이 속성값들은 직접 수정하기도 하고, css 를 통해 수정이 가능하기도 하다.</p>

### Embedding SVG

<p>크게 2가지 접근방식이 있는데, 한가지는 기존 image 를 임베드 해오는 방식으로 img 태그 내 src 을 지정해주거나, background-image 내 url 을 설정해주는 방법이 있다. 주로 이러한 방식을 활용하지만, 다른 한가지 방식은 직접 웹페이지 코드 내 svg 코드를 기입하는 방식이 있다.</p><br />

<p>직접 인라인으로 기입하게 되면 장점이, CSS와 Javascript 를 활용할 수 있게 된다는 점이다. 다만 커다란 단점이 있는데 코드 가독성이 매우 떨어지게 된다는 점에 있다.협업에 있어서 코드 가독성은 아주 중요한 요소로 작용하게 되는데 이러한 점에 있어서는 단점이다.</p>
