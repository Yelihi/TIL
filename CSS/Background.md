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

<p>추가로 어떤 회사에서는 background-image 의 속성 중 url 부분만 따로 css 코드내에서가 아니라 html 내에서 inline style 로 적용하는 경우가 있다.</p>
