## Router의 내부 구조

- 방화벽과 라우터는 모두 L3 스위치에 속하고, 이는 IP 로 통신을 한다
- 내부적으로 라우터는 Bypass 인지 Drop 인지 결정하고 어디로 패킷을 보내줄 지 결정한다. 이러한 처리 과정을 inline 처리라고 한다
- 패킷을 전송할 때, NIC 수준에서 바로 전송하느냐, IP수준에서 처리하느냐, 사용자 프로세서 수준에서 처리한 이후 전송하느냐에 따라 라우터의 처리속도가 달라진다.
