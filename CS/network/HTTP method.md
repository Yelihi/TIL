## HTTP 메서드

<p>가장 많이 사용되는 메서드인 GET, POST 기본으로 HTTP에는 크게 5가지 정도의 대표적인 메서드가 있다.</p>

- GET: 리소스 조회
- POST: 요청 데이터 처리, 주로 등록에 사용
- PUT: 리소스를 대체, 해당 리소스가 없으면 생성
- PATCH: 리소스 부분 변경
- DELETE: 리소스 삭제

<p>그 외의 메서드들은 다음과 같다.</p>

- HEAD: GET과 동일하지만 메시지 부분을 제외하고, 상태 줄과 헤더만 반환
- OPTIONS: 대상 리소스에 대한 통신 기능 옵션(메서드)을 설명(주로 CORS에서 사용)
- CONNECT: 대상 자원으로 식별되는 서버에 대한 터널을 설정
- TRACE: 대상 리소스에 대한 경로를 따라 메시지 루프백 테스트를 수행

### GET

- 리소스 조회
- 서버에 전달하고 싶은 데이터는 query(쿼리 파라미터, 쿼리 스트링)을 통해서 전달
- 메시지 바디를 사용해서 데이터를 전달할 수 있지만, 권장하지 않는다. 보통은 쿼리 스트링으로 보내는 걸로 한다.

### POST

- 요청 데이터 처리
- 메시지 바디를 통해 서버로 요청 데이터를 전달
- 서버는 요청 데이터를 처리하는데, 바디로 들어온 모든 데이터를 다 처리한다. 주로 신규 데이터를 추가할때 사용한다.
- 근데 POST 는 다양한 의미를 지닌다.
- 예를 들어 POST 는 다음과 같은 기능에 사용된다.
  - HTML 양식에 입력 된 필드와 같은 데이터 블록을 데이터 처리 프로세스에 제공 (FORM 에서의 정보로 회원가입, 주문)
  - 게시판, 뉴스 그룹, 메일링 리스트, 블로그 또는 유사한 기사 그룹에 메시지 게시
  - 서버가 아직 식별하지 않은 새 리소스 생성 (신규 주문 생성)
  - 기존 자원에 데이터 추가 (기존 자원 끝에 내용 추가)
- 정리를 해보겠다
- POST는 새 리소스를 생성(등록)한다.
  - 서버가 아직 식별하지 않은 새 리소스 생성
- POST는 요청 데이터를 처리해야 한다.
  - 예를 들어서 음식가게에서 어떤 배달에 대한 주문 결제가 완료었다고 할 때, 이제 사장님이 배달 시작이라는 요청을 시작할때 이때도 POST 로 보내야 한다.
  - 이처럼 변경하는것을 넘어 프로세스를 처리해야 하는 경우에도 POST 를 사용하게 된다.
  - 그렇기에 POST 를 통해 새로운 리소스가 생성되지 않을 수 있다. 로그인으로 보면 알 수 있을 것이다.
  - 이렇다보니 이전에 리소스에는 행위가 들어가면 안된다고 하였지만, POST 의 경우 안되는 경우가 있다. 그래서 동사를 리소스에 넣어주는 경우도 있고, 이러한 경우를 control-uri 라고 한다. (예 POST /orders/start-delivery)
- POST는 다른 메서드로 처리하기 애매한 경우 사용한다.
  - 예를 들어서 JSON 으로 조회 데이터를 넘겨야 하는데, GET 메서드를 사용하기 어려운 경우 POST 를 사용한다.
  - 이렇게 애매하면 POST 를 사용한다.

### PUT

- PUT은 리소스를 대체하는 경우다. 어떠한 폴더에 기존 데이터를 넣으면 덮어써지게 되는 거처럼 PUT 도 이러한 경우다.
- 중요한것은 완전히 대체다. 리소스가 있다면 지금 우리가 보낸 데이터로 완전하게 대체해버린다.
- 기존데이터를 지워버리니 수정의 의미가 아니다.
- 중요한 점은 클라이언트가 리소스를 식별한다는 것에 있다.
- 주소를 예를 들면 /members/100 처럼 뒤에 특정 리소스 위치를 지정하게 된다.
- 이것은 /members 를 사용한 POST 와의 차이점이다.

### PATCH

- PUT 과 달리 부분 수정이 가능하다.
- 예를 들어 기존 데이터에 username, age 라는 데이터가 있었고
- 보내는 데이터는 age 만 있다면, PUT 은 age 만 남게 되지만, PATCH 는 age 만 수정되고 나머지 username 은 그대로 남아있는다.

### DELETE

- 말 그대로 리소스에 지정된 데이터를 제거한다.