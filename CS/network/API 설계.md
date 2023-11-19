## HTTP API 데이터 전송

```
POST /members HTTP/1.1
Content-Type: application/json

{
  usernama: kim
  age: 20
}

```

- 클라이언트 쪽의 라이브러리는 이를 자동적으로 잘 만들어준다.
- API 데이터 전송은 서버끼리의 통신에서 자주 사용되며, 웹 클라이언트의 경우도 자바스크립트의 AJAX 를 통해서 API 통신을 주로 한다.
- 기존에 활용했던 메서드를 그대로 활용할 수 있다. (POST, PATCH, PUT, GET)
- Content-Type: application/json 을 주로 사용(사실상 표준)
- 예전에는 XML 을 많이 사용했지만 최근에는 더 심플한 json 을 사용한다.

## HTTP API 설계 예시

<p>개략적으로 종류를 살펴보자</p>

- HTTP API - 컬렉션
  - POST 기반 등록
  - 예) 회원관리 API 제공
- HTTP API - 스토어
  - PUT 기반 등록
  - 예) 정적 컨텐츠 관리, 원격 파일 관리
- HTML FORM 사용
  - 웹 페이지 회원 관리
  - GET, POST 만 사용 가능

> **회원 관리 시스템을 설계한다 가정**

- 회원 목록 : GET /members
- 회원 등록 : POST /members
- 회원 조회 : GET /members/{id}
- 회원 수정 : PATCH,PUT,POST /members/{id}
- 회원 삭제 : DELETE /members/{id}

<p>여기서 post 를 통해 어떠한 회원을 등록시킨다고 가정해보자. post 로 회원을 등록시킬 때 클라이언트에서는 이 회원에 대한 등록될 리소스 URI 를 알 수 없다. API 를 통해 데이터를 전송시킬 뿐. 그렇다면 이 회원이 100번째 회원이라면, 그래서 클라이언트에서 이 회원을 조회하고 싶으면 이에 맞는 특정 URI 를 작성해야할텐데, 이러한 URI 는 서버에서 생성해준다. 이러한 특성을 컬렉션이라 한다.</p>

> **파일 관리 시스템 가정**

- 파일 목록 : GET /files
- 파일 조회 : GET /files/{filename}
- 파일 등록 : PUT /files/{filename}
- 파일 삭제 : DELETE /files/{filename}
- 파일 대량 등록 : POST /files

<p>특징이 있다. post 와 다르게 put 은 클라이언트가 리소스 URI 를 알고 있어야 한다. 즉, 클라이언트가 직접 URI 를 지정해야한다. 클라이언트가 직접 URI를 관리한다. 이러한 스타일의 관리를 스토어(Store) 라고 한다.</p><br />

<p>대부분은 post 를 사용한다는 점을 알고 있자. 즉 컬렉션 기반이다.</p>

> **HTML FORM 사용**

- HTML FORM 은 GET, POST 만 지원을 한다.
- AJAX 같은 기술을 사용해서 해결이 가능
- 하지만 일단은 HTML FORM 만 사용한다고 가정하자.
- GET, POST 만으로는 제약이 있어서 컨트롤 URI 를 사용해야한다.
- /new, /edit, /delete 가 컨트롤 URI (동사를 사용한다)
- HTTP 메서드로 해결하기 애매한 경우 사용하게 된다(HTTP API 포함)
- 단 최대한 기존 메서드를 활용해야 한다.
  <br />

- 회원 목록 : GET /members
- 회원 등록 폼 : GET /members/new
- 회원 등록 : POST /members/new
- 회원 조회 : GET /members/{id}
- 회원 수정 폼 : GET /members/{id}/edit
- 회원 수정 : POST /members/{id}/edit
- 회원 삭제 : POST /members/{id}/delete
