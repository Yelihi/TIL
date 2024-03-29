## HTTP 메서드의 속성

### 안전

- 호출해도 리소스를 변경하지 않는다.
- 안전의 경우 GET, HEAD 메서드
- 당연히 나머지는 데이터를 변경하니 안전하지 않다.
- 근데 계속 호출을 하면 서버에는 로그가 쌓이고 그래서 장애가 올 수 있지 않나? 라는 질문에 대한 대답은 '안전은 해당 리소스만 고려한다'

### 멱등(Idempotent)

- 한번 호출하던 두번 호출하던 100번 호출하던 결과가 같아야 한다.
- GET : 한번 조회하든, 두번 조회하던 같은 결과가 조회된다.
- PUT : 결과를 대체한다. 따라서 같은 요청을 여러번 해도 최종 결과가 같다. 생각을 해보자. 결과 응답은 같다. 내가 요청한 데이터가 나올테니말이다. 만약 데이터가 없다면 생성하여 그 데이터가 결과값이며, 이후 두번 보내게 되면 대체할테니 결과 데이터역시 동일하다.
- DELETE: 삭제 역시 동일하다. 만일 첫번째 호출에서 데이터를 삭제했다면 결과는 데이터가 삭제됨이다. 이후 2번 3번을 호춣해도 데이터는 삭제되어있다. 결과가 같다.
- POST: 멱등이 아니다. 두번 호출하면 같은 결제가 중복해서 발생할 수 있다.
- 만약 삭제요청을 했는데 응답 메시지가 없다면, 서버에서 알아서 삭제될때까지 요청을 하면 좋다. 왜냐하면 삭제는 멱등하기 때문이다. 결과값이 변하지 않는다.
- 이러한 자동 복귀 메커니즘에 활용이 가능하다.
  <br />

<p>근데 만약 외부에 의해 중간에 데이터가 변경이 되었다면, 멱등한 GET 을 사용한다 해도 멱등하다 할 수 있을까? 그에 대한 대답은 '멱등은 외부 요인에 의한 데이터 변경까지 고려하지 않는다'이다. 이런 부분은 서버에서 알아서 체크해야한다.</p>

### 캐시가능(Casheable)

- 응답 결과 리소스를 캐시해서 사용해도 되는가?
- 보통 용량이 엄청 큰 이미지를 요청한다고 할 때, 이러한 데이터를 계속해서 요청해서 다운 받아오기에는 속도가 손해일테니, 데이터를 캐시화한다. 웹브라우저에서 한다
- GET, HEAD, POST, PATCH 는 가능하다.
- 다만 실제로는 GET, HEAD 를 사용한다. url 을 key 로 잡고 캐시화가 가능하기 떄문이다. body 까지 key 로 작업하기에는 어렵기 떄문.
