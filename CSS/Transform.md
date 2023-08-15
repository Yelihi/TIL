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
