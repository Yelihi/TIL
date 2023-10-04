## Box Model

### Box Model?

CSS 박스 모델은 문서 트리의 요소들에 대해 생성되는 직사각형 박스를 설명한다. 각 박스에는 content 영역이 있고, 이를 감싸는 padding, 그리고 border, border 밖 margin 영역으로 구분된다. <br />

CSS 박스 모델은 다음을 계산하는 역할을 한다

- 블록 요소가 차지하는 공간의 크기
- 테두리 또는 여백이 겹치는지 여부
- 박스의 치수

### Box Model Rule

- 블록 요소의 치수는 너비, 높이, 패딩 및 테두리에 의해 계산된다.
- 만약 높이가 지정되지 않은 경우, 블록 요소의 높이는 content height + padding
- 너비가 지정되지 않은 경우, parent width - padding (단, max-width 가 있다면 이 수치 이상만큼은 넓어지지 않는다)
- 일부 블록 레벨 요소(table, input...)는 고유한 너비 값을 가지고 있어 부모 컨테이너의 전체 너비를 채우지 않을 수 있다.
- 참고로 span 은 인라인 요소이기에 기본 너비가 없다
- 요소의 height 는 content height 에 따라 결정된다
- 요소의 width 는 content width 에 따라 결정된다 (설정에 따라 부모의 width 를 그대로 따라가기도 한다)
- 기본적으로 (box-sizing: content-box) 로 지정하게 되면, padding 과 border 는 요소의 width, height 에 포함되지 않는다
  - 그래서 실제 작업할 때는 계산하기 귀찮아지기 때문에 (box-sizing: border-box) 로 설정하여 margin 을 제외한 나머지 속성이 width, height 에 포함되도록 하는 편이다.
- margin 은 실제 box 의 크기에 포함되지 않는다. box의 영역은 border 에서 끝나고 margin으로 확장되지는 않는다. (box model 이 총 차지하는 영역에는 margin 이 포함이지만)
