## Cookie, SessionStorage, LocalStorage

### 공통점

- 클라이언트 사이드 내 저장소 역할. 즉, 클라이언트 측에서 값을 읽고 수정할 수 있다는 의미
- key - value 기반 데이터
- value 값으로 오직 string 타입만 가능하다.

### 차이점

| 특징               | Cookie                                              | LocalStorage | SessionStorage  |
| ------------------ | --------------------------------------------------- | ------------ | --------------- |
| Initiator          | Client or Server                                    | Client       | Client          |
| 만료               | setting 값                                          | 영원히       | 탭을 닫기전까지 |
| HTTP 통신마다 전송 | Cookie 는 자동적으로 header 에 담겨서 server에 전달 | No           | No              |
| 용량               | 4kb                                                 | 5mb          | 5mb             |
