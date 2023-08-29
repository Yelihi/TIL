

## Selectors

<p>셀렉터는 css 가 html 의 각 요소들을 스타일링 해주기 위해 사용하는 문법이라 생각하면 될 것 같다. css 에는 우선순위가 있고, 이러한 부분을 고려햐여 선택자를 잘 활용해야 의도한 대로 스타일링이 될 수 있으니 공부해보자.</p>

## Type, Class & ID Selector

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

## Child, Descendant & Sibling Selector

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

## Structural Pseudo-classes (가상 클래스)

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

## User-action Pseudo-classes (가상 클래스)

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

## Cascading

<p>CSS 에서 선택자마다 우선순위가 다르고, 이를 잘 파악해야 한다.</p>

- 선택자 : type << class, pseudo-class << ID (오른쪽으로 갈 수록 우선순위가 높다)
- 스타일 : inline-style << !important
- important 는 왠만하면 쓰지 말자.


