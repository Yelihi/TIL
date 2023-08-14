## ol, ul, dl

### ol

- 순서가 있는 리스트를 만들 때 사용한다

```html
<ol>
  <li value="3">list</li>
  <li value="5">list</li>
  <li>list</li>
  <li>list</li>
</ol>
```

- reversed : boolean 으로 순서를 거꾸로 할지 순서대로 할지를 결정하는 속성
- start : 몇번부터 시작을 할지 결정한다
- ol 에 속하는 li 에는 value 라는 속성값이 추가된다. 이는 실제 번호를 지정해줄수 있다.

### ul

- 순서가 없는 리스트를 만들 때 사용한다.

```html
<ul>
  <li>list</li>
  <li>list</li>
  <li>list</li>
  <li>list</li>
</ul>
```

- 참고로 여러 사이트들을 보면 메뉴바가 있고, 각 메뉴마다 종속된 여러 메뉴들이 있는 경우가 있다
- 예를 들면 emart 에 들어갔을 때, 육류 메뉴를 hover 하면 옆이나 밑에 소고기, 돼지고기.. 등등 소메뉴가 등장하게 되는데, 이런 경우에도 ul 을 사용하는것이 좋다.
- 그냥 div 를 통해 종속 메뉴를 작성하면 screen reader 에서 제대로 이해하질 못한다

### dl

- ol 이나 ul 과는 달리, dt와 dd 가 있다.
- dt : 제목이나 주제어라 생각하고
- dd : 위 제목이나 주제어에 대한 설명문을 적을 때 사용가능하다.

```html
<dl>
  <dt>Title</dt>
  <dd>here is description</dd>
</dl>
```
