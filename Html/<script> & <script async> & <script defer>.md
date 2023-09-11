## script, script async, script defer

`<script>` 태그의 경우 보통 자바스크립트를 사용하고자 할 때 사용하는 태그이다. script 에는 async 와 defer 라는 속성이 있는데, script 를 발동시키는 방법이나 시간을 지정해주는 속성이다.

### 기본 `<script>`

기본 `<script>` 태그는 HTML parsing 중에 이 태그를 마주하면 parsing 이 중단되고(block) fetch를 즉시 실행한다. 이후에 다시 parsing 이 이어진다.

### `<script async>` : 비동기

async 속성을 사용하면, 위 처럼 순서대로 parsing 도중 fetch 를 진행하는것이 아니라(동기), parsing 과정과 병행하게 가져온 뒤 즉시 실행되며 그렇기에 HTML 문서 상의 script 태그 순서대로 실행되지 않는다 (비동기)

### `<script defer>` : 지연

병행하게 스크립트를 가져오는것은 async 와 비슷하지만 차이점이 있다면 HTML 의 parsing 이 끝난 뒤에 실행이 된다. 다만 parsing 이 끝나고 DOMContentLoaded 가 실행되기 전에 실행된다. 만일 문서 내 script 가 여러개라면 순서대로 실행이 된다. <br />

여기서 특징은 HTML 이 완전히 parse 된 이후에 실행이 되는 것이고, 그렇기에 script 가 HTML 의 완전한 parse 상태에 의존적일 떄, 즉 완전 분석이 되고 나서 실행하고 싶을 때 사용하는 속성이다. <br />

### 정리

정리하자면 async 의 경우 스크립트 끼리나 HTML 문서에 서로 독립적인 경우 사용하며, defer 는 반대로 의존적일 경우 사용하게 된다. 또한 이 2 속성은 script 내 src 가 없다면 무시된다.
