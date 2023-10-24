## route53 설정과 cors

최근에 사이드 프로젝트의 프론트 호스팅을 amplify 에서 vercel 로 이동하게 되었는데, 이 글을 작성하기 전까지 어떤 의류 사진을 업로드해보는 테스트를 진행하지 못하였다. 그러다 코드 리펙토링 도중 파일 업로드를 시도할 때 느닷없이 cors 오류가 발생하게 되었다. 어째서 cors 오류가 발생하는지를 파악하기 위해 여러 부분에서 분석해보다 기존 amplify 에서 vercel 로 전환했다는 사실 외에는 차이점이 없기에 이 부분에서 뭔가 도메인 설정의 문제가 아닐까 싶었다. <br />

### 기본적인 cors 정책

간략하게 cors 에 대한 설명을 해보면, 흔히 오류라고 생각하기 쉽지만 사실 cors 는 서로 다른 origin 끼리의 네트워크 파일 통신을 위한 일종의 정책이라고 할 수 있다. 즉, cors 정책을 지킨다면 다른 origin 이지만 httprequest 를 진행할 수 있게 되는 것이다. <br />

이 부분은 사실 필수적인 것이 때에 따라서는 외부 server 의 데이터를 참조하여야 하며 이러한 경우 origin 이 다른 경우가 일반적이기 때문이다. cors 설정은 상황에 따라 다르지만 보통 server 단에서 origin 을 설정하여 응답 헤더의 Access-Control-Allow-Origin 내 origin 을 같이 전송하여 웹 브라우저와 서버의 약속된 origin 이 같음을 확인하면서 데이터 교환이 이루어질 수 있도록 처리된다. <br />

이 외에도 응답 헤더 내 설정되어야 하는 부분이나, 단순요청이냐 인증요청이냐에 따른 설정 등 좀 더 다루어야 할 내용들을 지금 다루지는 않겠다.

### route 53 내 CNAME

도메인이 문제라면 vercel 내에서 설정해둔 도메인 설정과 route 53 내 호스팅 영역 간의 어떠한 불협화음이 원인이 아닐까 생각이 들었다. 실제로 amplify 내에서 발생하지 않았던 cors 오류이기에, vercel 부분의 도메인 설정을 살펴보았다. <br />

- www.closet-online.com [ default url ]
- closet-online.com 입력 시 영구적 redirect 통해 www.closet-online.com 전환

<br />

그리고 route53 내 호스팅 레코드 설정을 살펴보면, <br />

- A : closet-online
- CNAME: www.closet-online.com
- A : api.closet-online.com

<br />

위와 같이 레코딩 되어있었다. 이 부분에서 뭔가 어긋남을 알게 되었다. <br />

vercel 에서 도메인 등록을 route 53 내 도메인으로 하게 될 때, vercel 에서 지정한 IP 주소에 맞게 route 53 에서 레코드를 생성해야한다. 즉, 유형 A 에 해당하는 closet-online.com 이 하나의 IP 에 해당하는 하나의 도메인이자 메인이다. <br />

반면 www.closet-online.com 의 경우, 주소창에 기입 시 closet-online.com 으로 리다이렉트 되는, 실제 메인 도메인의 호출하는 다른 이름의 도메인인 CNAME 이다. 그래서 실제 vercel 내에서도 route 53 내 레코딩 등록에 사용될 value 값을 IP 값이 아닌 cname.vercel-dns.com 으로 제공하였다. <br />

이렇게 살펴 보니 vercel 에서 설정해둔 도메인 관게와 실제 route53 내 도메인 설정에 충돌이 있음을 알게 되었다. vercel 에서는 메인 도메인으로 CNAME 도메인을 설정하였고, 오히려 A 유형 도메인으로 접속 시 CNAME 도메인으로 리다이렉트 하도록 설정이 되어있었다. 즉, 반대인것이다. <br />

이를 통해 vercel 도메인 설정을 다시 해주었고, 이를 통해 정상적으로 이미지 업로드가 됨을 확인할 수 있었다.
