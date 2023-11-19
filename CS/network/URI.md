## URI

> **URI**

- URI(Uniform Resource Identifier) 라는 리소스를 식별하는(주민번호로 사람을 식별 하는 것과같은) 가장 큰 개념이 있다.
- 이 URI 는 집합관계에서 URL 과 URN 을 감싸고 있다.
- URL(Resource Locator)(리소스의 위치를 지정) 과 URN(Resource Name)(리소스의 이름)
- 대부분 URL 만 쓴다. 그래서 그냥 URI 를 URL 로 파악하면 된다.
- 다시 넘어가 URI 를 살펴보면
- Uniform : 리소스 식별하는 통일된 방식
- Resource : 자원, URI로 식별할 수 있는 모든 것(제한없음)
- Identifier : 다른 항목과 구분하는데 필요한 정보

```
http://www.google.com/search?q=hello&hl=ko
```

- 위 URL 형태를 보게 되면 아래와 같이 구성됨을 알 수 있다.
- scheme://[userinfo@]host[:port]/[/path][?query][#fragment]

> **scheme**

- scheme 에는 주로 프로토콜을 사용한다. 프로토콜이란 어떤 방식으로 자원에 접근할 것인가에 대한 약속이자 규칙이다.
- http는 80 포트, https 는 443 포트를 사용하며, 이렇기에 생략이 가능하다.

> **userinfo**

- 거의 사용하지는 않음.

> **host**

- 호스트명
- 도메인명 또는 IP 주소를 직접 사용 가능하다.

> **host**

- 접속 포트이며 일반적으로 생략이 가능하다. 생략시 http는 80. https 는 443 이다.

> **path**

- 리소스의 경로이며 계층적인 구조가 많다
- /home/members/100 (100번에 있는 회원의 정보) -> 이런식으로 계층적으로 설계되는 경우가 많다.

> **query**

- key=value 형태이며 ?로 시작한다. &으로 추가가 가능하다. ?keyA=valueA&keyB=valueB

> **fragment**

- html 내부 북마크 등에서 사용하며 서버에 전송하는 정보는 아니다.

## 웹 브라우저 요청 흐름

- 앞서 다뤘던 구글 검색 URL 을 다시 참고해보자

```
https://www.google.com/search?q=hello&hl=ko
```

- 웹 브라우저는 구글이라는 도메인 네임을 DNS 서버에서 조회를 해서 서버 IP 를 가져온다. 또한 https 를 통해 생략된 포트 443 역시 가져온다
- 이 다음 http 요청 메세지를 생성한다. 이 메세지를 간략히 적으면 아래와 같다.

```
GET /search?q=hello&hl=ko HTTP/1.1
Host: www.google.com
```

- SOCKET 라이브러리를 통해 생성한 메세지를 os 의 TCP/IP와 연결한다.
- 처음 과정은 앞에서 배웠듯이 syn,ack 과정인 3 way handshake 과정을 통해 통신하려는 서버와 연결할 수 있는지 확인을 한다.
- 이후 확인이 됬으면 TCP/IP 에서 패킷을 생성하여 메세지에 첨부한다. (이때 메세지에 아까 브라우저에서 만든 요청 메세지)
- 서버가 이 요청 패킷을 받게 되면, 메세지를 해석하게 되며 그에대한 응답 메세지를 만들게 된다.
- 이후 똑같이 패킷에 씌어서 이 응답메세지를 브라우저에 보내주게 된다.
- 컨텐츠에 따라 다르겠지만, 보통은 html 문서가 오기 때문에, 브라우저는 이 html 을 렌더링 하게 된다.
