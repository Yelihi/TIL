<h2 align="center"> CSS </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- 2023.1.1

  <br />

![--------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="프로젝트소개"> :book: 간단한 요약 정리 </h2>

## 2022.12.29

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
