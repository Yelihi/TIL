## Flexbox?

Flex box 는 기존 position, float 등의 설정으로 쉽지 않았던 요소들의 배치를 훨씬 flexible(유연한)하게 설정할 수 있도록 해주는 레이아웃 기법이다. 크게보면 다음과 같은 특징을 지니게 된다. <br />

- 한 element 에 flex 를 선언하게 되면, 그 element 는 flex container 가 되고, 내부 아이템들은 flex item 으로 자동 선언된다
- 이러한 관계는 마치 테이블의 tr/td 와 비슷하며, 그렇기에 부모와 자식의 관계이지 손자 요소에는 영향을 끼치지 않는다.
- flex item 의 요소 설정값에 따른 free space 가 발생하게 되는데 이 공간에 대한 팽창성과 수축성을 설정해줄 수 있다.
  <br />

```css
.container {
  display: flex;
  /* 기본적으로 flex 를 선언하게 되면 기본값으로 설정되는 속성값은 다음과 같다 */
  flex-grow: 0; /* free space 에 한하여 자동적으로 flex item 이 팽창하지 않는다 */
  flex-shrink: 1; /* 음수 free space 에 한하여 자동적으로 flex item 이 균등 수축한다 */
  flex-basis: auto; /* flex item 의 기본 width, height 의 경우 설정에 따른다 */
  flex-direction: row; /* flex item 의 정렬 방향은 기본적으로 가로방향이다 */
  flex-wrap: nowrap; /* flex item 의 줄바꿈은 이루어지지 않는다 */
}
```

<br />

우선적으로 flex item 자체의 정렬방법보다 flex item의 basis 에 따른 container 내부 free space 가 존재할 시 설정되는 flex-grow, flex-shirnk 에 대해서 살펴보도록 하자

## Flex-grow

container 보다 자식 item 들의 width 합산이 작다고 가정하게 되면, 남아있는 공간이 생기게 되는데, 이를 free space 라고 칭한다. flex-grow 의 경우 이러한 공간을 요소가 어떻게 사용할지에 대한 설정값이다. 기본값이 0이라고 하였는데, 이는 설사 free space 가 존재하더라도 설정해둔 item 들의 width 값을 기준으로 배치가 된다는 의미이다. <br />

반대로 flex-grow : 1 을 주게 되면 (속성은 items 에 주면 된다) 남는 공간을 items 수로 나눈 값(px) 만큼 width가 균등 확장하게 된다. <br />

```css
/* 3개의 요소가 있다고 가정한다. 즉 모든 요소의 width 합은 150px; free space 는 150px; */
.container1 {
  display: flex;
  width: 300px;

  > * {
    flex-grow: 1; /* 균등 확장이니 150/3 = 50px 만큼 모든 요소가 확장된다. */
    width: 50px;
  }
}
```

<br />

만일 3개의 요소에 flex-grow: 2, 1, 1 씩 수치를 부여했다면 총 수치의 합은 4이다. 첫번째 요소의 확장되는 수치는 150 \* (2 / 4) = 75px 이다. <br />

```html
<h4>This is a Flex-Grow</h4>
<h5>A,B,C and F are flex-grow:1 . D and E are flex-grow:2 .</h5>
<div id="content">
  <div class="small" style="background-color:red;">A</div>
  <div class="small" style="background-color:lightblue;">B</div>
  <div class="small" style="background-color:yellow;">C</div>
  <div class="double" style="background-color:brown;">D</div>
  <div class="double" style="background-color:lightgreen;">E</div>
  <div class="small" style="background-color:brown;">F</div>
</div>
```

<br />

```css
#content {
  display: flex;

  justify-content: space-around;
  flex-flow: row wrap;
  align-items: stretch;
}

.small {
  flex-grow: 1;
  border: 3px solid rgba(0, 0, 0, 0.2);
}

.double {
  flex-grow: 2;
  border: 3px solid rgba(0, 0, 0, 0.2);
}
```

<br />

<img src="./images/flex-grow-1.png" alt="flex-grow">

## Flex-shrink

이 속성은 반대로 요소들의 width 합산이 부모 container 의 width 를 초과했을 때 생성되는 음수 free space 에 대한 설정이다. 기본값이 1인데 이는 발생한 음수 free space 만큼 균등 수축한다는 의미이다. ((free space) / (요소 갯수)) <br />

예를 들어 부모 컨테이너가 300px 이며 자식 3개의 item 들의 width 가 150px 이라면 초과된 공간은 150px 이 된다. 만일 설정값이 flex-shrink : 0 이라면 그대로 부모 컨테이너를 초과하게 된다.<br />

역시나 요소마다 설정값을 다르게 주게 되면 그 수치만큼 비례하여 더 많이 수축하게 된다. (즉, 높은 설정값이 더 많이 수축된다고 생각하면 편하다)

## Flex-wrap

<p align="justify">
flex 에서 wrap 과 nowrap 의 상황에 따라서 align-items, align-content 의 사용에도 영향을 끼치게 된다. 만약 wrap 으로 설정이 되어있어서, 화면이 축소함에 따라 요소가 축소되지 않고 밑으로 넘어갈 경우, align-items 로 설정했다면 생각처럼 화면 구성이 안나올 수 있다. <br>
줄 바꿈 현상이 일어나게 되면 메인축이 줄마다 생성이 되기 때문에, align-items 의 경우 각 메인축에 대한 수직축에 대해서 적용하기 때문에, center 로 설정해도 모든 요소가 viewpoint 중간으로 오는것이 아니라, 각각의 차지하는 공간의 중간으로 이동하게 된다. <br>
만일 전체가 다 가운데로 이동하게 하고 싶다면 align-content 를 사용하면 된다. 사실 사용하다보면 이를 다 따지기는 힘들기에 우선 align-items 를 사용해보고 아니다 싶으면 align-content 를 사용하자.
</p>
