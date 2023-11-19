## HTTP 메서드 활용

### 클라이언트에서 서버로 데이터 전송

- 쿼리 파라미터를 통해 데이터를 전송
  - GET
  - 주로 정렬 필터(검색어)
- 메시지 바디를 통한 데이터 전송
  - POST, PUT, PATCH
  - 회원 가입, 상품 주문, 리소스 등록, 리소스 변경

### 정적 데이터를 조회

<p>정적 데이터를 조회하는 것은 쿼리파라미터가 필요없이 간단하게 리소스 만으로 조회가 가능하다</p>

- 이미지, 정적 텍스트 문서
- 조회는 GET 사용
- 정적 데이터는 일반적으로 쿼리 파라미터 없이 리소스 경로로 단순하게 조회 가능

### 동적 데이터 조회

<p>검색어나 페이지네이션 등 추가 데이터를 전달해야할 때 쿼리파라미터를 사용. 서버에서는 이 쿼리파라미터를 꺼낼 수 있다.</p>

- 주로 검색, 게시판 목록에서 정렬 필터(검색어)
- 조회 조건을 줄여주는 필터, 조회 결과를 정렬하는 정렬 조건에 주로 사용
- 조회는 GET 사용
- GET 은 쿼리파라미터를 사용해서 데이터를 전달

### HTML Form 데이터 전송

<p>태그 중에 form 태그가 있는데, 이걸 활용해서 데이터를 전송할 수 있다.</p>

```js
<form action="/save" method="post">
  <input type='text' name='username'>
  <input type='text' name='age'>
  <button type="submit">전송<button>
</form>
```

- 이런 형식이 있다고 하면, 여기서 전송을 누를 시 HTTP 메시지가 생성이 된다.

```
POST /save HTTP/1.1
Host: localhost:8080
Content-Type: application/x-www-form-urlencoded

username=kim&age=20
```

- 이런식으로 메시지가 전송이 된다. 만약 메서드가 GET 이라면

```
GET /save?username=kim&age=20 HTTP/1.1
Host: localhost:8080
```

- 이렇게 주소가 쿼리파라미터로 변경이 된다.
- 다만 주의할점은 Get 은 조회에만 사용해야한다. 데이터를 변경시키는 것을 하면 안된다.
- 위 예시는 save 니깐 사실 잘못된 예제

### HTML Multi/Part Form-Data

<p>이미지를 같이 전송할 때처럼, 여러 데이터 타입을 같이 보낼 수 있다.</p>

- 파일 업로드 같은 바이너리 데이터 전송시 사용
- 다른 종료의 여러 파일과 폼의 내용 함께 전송 가능(그래서 이름이 multipart)
