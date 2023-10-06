## 어째서 box-sizing : border-box 로 설정을 하는 것일까?

CSS 를 통해 요소의 크기를 계산할 때, 얼핏 content 의 크기만을 계산하는것이 더 편한거 아니라고 생각될 수 있다. 하지만 우리가 레이아웃에 요소를 배치할 때 border 와 padding 을 따로 생각해서 계산하려고 하면 오히려 더 불편해진다. <br />

예를 들어 가로 폭 1000px 로 주어진 부모 요소내 자식 요소 4개를 평행 배치하려고 한다. margin 을 사용하지 않았다는 가정하에, 1000을 4로 나눈 250px 만큼의 영역을 한 요소가 차지하고 있으면 되는것인데, 만약에 이 250px 에 padding, border 두께가 적용되지 않은것이라면, 개발자는 이를 따로 고려해서 content + padding + border = 250px 로 맞춰주는 content width/height 를 계산하여야 한다. 즉, 훨씬 귀찮다. <br />

이러한 설정이 사실 기본설정인 box-sizing: content-box 이다. 이러한 불편함을 해결하기 위해 새로운 설정인 box-sizing: border-box 로 해주는 것이다. 즉. 요소의 사이즈를 계산할 때 border 부근까지를 하나의 요소로 보겠다는 의미이다.
