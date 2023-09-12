## Serverless 개발자를 위한 아키텍쳐

### Serverless

- 비용 : 사용한 만큼 지출
- 보안 : 직접 서버에 접근할 필요가 없다. 해커 역시 접근할 방법이 없다
- 성능 : 자동적인 scaling

- It 자동화
- 데이터 프로세싱
- 웹 어플리케이션
- 머신러닝 / 딥러닝

결국 워크로드에 집중할 수 있도록 도와준다.

### API 기반 아키텍쳐

client -> api-gateway -> lambda -> dynamoDB

- 응답이 올 때까지 기다려야 한다는 단점이 있지만, 안정적인 아키텍쳐이다.

### 이벤트 기반 아키텍쳐

이벤트는 시스템에 상태가 변경되었다는 신호이다. 웹사이트에 주문이 들어온걸 이벤트라고 할 수 있다. API 요청 역시 이벤트이다.
<br /><br />

client -> api-gateway -> amazon eventbridge event bus -> lambda -> dynamoDB

- 클라이언트가 받는 응답은 이벤트가 발동되었다는 응답이지, 실제 완료 응답은 나중에 별도로 받는다.
- 즉 분리되어 결과를 받게된다.
- 높은 내구성과 복원력을 가진다
- 한 시스템에 장애가 나도 다른 시스템에 장애가 전파되는 건 아니다.
- 중간 이벤트 라우팅 과정이 추가되어 좀 더 응답속도에 문제가 있을 수 있다.

### 이벤트 기반 아키텍쳐의 장점 (배달앱)

- 주문, 배달, 완료 와 같은 이벤트와 각각 라우터로 연결되어있다.
- 주문완료 때 이벤트 응답, 배달 시작 시 이벤트 응답.. 이렇게 나눠서 비동기적인 이벤트 처리
- 만일 배달 시스템에 장애가 있더라도, 이벤트 스토어가 있어서 다시 정상 동작 시 이어서 작동시키는 것이 가능

### AWS 에서 제공하는 이벤트 전달 서비스

- Amazon SQS(simple queue service) : 메시지 큐 서비스
- Amazon SNS
- EventBridge
- Step Functions

### API 기반 아키텍처 사용 사례 (이벤트 기반이지만 동기 처리)

> **관측 가능성이 향상된 RestFul 마이크로서비스**

<br />

client -> api-gateway (- aws x-ray + cloudWatch ) -> lambda -> dynamoDB

- x-ray에서 접속 로그, 트레이싱 동작 평가
- cloudWatch에 지표를 사용하여 비동기식으로 평가

<br /><br />

> **AWS AppSync**

<br />

graphQL 기반 아키텍쳐.

### 이벤트 기반 아키텍쳐 사용 사례

> **파일 업로드 아키텍쳐**

<br />

- S3 버킷에 객체 업로드
- Lambda function 실행(비동기)
- Amazon Rekognition 으로 사진 속 객체 인식
- 이미지 세부 정보 및 분석 결과 저장

<br /><br />

> **스트리밍 데이터 수집과 저장**

<br />

client -> Kinesis -> Lambda -> redshift(or s3)

<br /><br />

> **Semi-Serverless**

<br />

client -> api-gateway -> Kinesis -> Lambda -> RDS

- kinesis 는 데이터를 한번에 처리할 수 있다.
- RDS 서비스는 인스턴스 기반이라서 semi-serverless 라고 표현함

<br /><br />

> **Fan out**

<br />
