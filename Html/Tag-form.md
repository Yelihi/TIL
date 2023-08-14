## Form

<p>form 안에 소속된 Input과 서버간의 정보 교환, 정보 제출을 위해 컨트롤을 포함하는 구성요소. form 태그만이 가지고 있는 특별한 속성들이 존재하는데, 다음과 같다.</p><br />

### acceptcharset

- 서버가 허용하는 문자 인코딩의 목록을 지정
- 이걸 설정하지 않으면 페이지 인코딩과 같은 인코딩을 사용하게 된다.
- 자주쓰이는 것은 UTF-8 과 ISO-8859-1 방식이 있다.
- 우리가 한글을 깨지지않게 렌더링 하고 싶다면 UTF-8 을 사용하면 된다.

### action

- form input에 작성된 값을 받는 서버의 URI (uniform resource identifier)

### autocomplate

- on, off 로 설정해주며, 예전에 주입했던 값을 보여줄것인지에 대한 설정
- 보통 브라우저 설정에 보면 autofill 이 있는데, 이 설정을 off 로 해둔다면 autocomplete 를 on 해도 소용이 없다.

### method

- post : 서버에 정보를 주입시키고 주입시킨 결과를 받는 정보 교환 방식
- get : 서버에 저장된 값을 받아 올 때 사용하는 정보 교환 방식

### novalidate

- form 에 기입된 값을 validation 과정을 거치지 않고 보내고 싶을 때

### target

- 서버에서 받은 반응값을 어느 프레임에 뿌려줄것인지를 설정하는 속성
- `_self`, `_blank`, `_parent` 처럼 링크 태그와 동일하다.

<br />
<p>코드는 form.html 에 있다.</p>
