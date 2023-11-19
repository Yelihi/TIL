### IP Header

<img src="../../images/ipHeader.png" alt="IP Header" />
<br />

- IHL(IP Header Length) : 헤더의 길이로 보통 5 (그래야 5 \* 4byte = 20byte)
- 32bit = 4byte
- Identification : 단편화에 대한 정보. 보통 MTU 는 1500 인데, 간혹 패킷 최대용량이 1400 인 곳이 있고 이러한 부분에 대해서 패킷전송의 순서를 정할 때 사용
- TTL(Time To Live) : 패킷의 생존 횟수. 패킷은 라우터를 따라 이동하는데, 하나의 라우터를 이동할 때마다 TTL 이 1씩 감소한다. TTL 은 0~255 까지의 갯수이므로 총 256 번 라우터를 이동할 수 있다.
- 그 외 출발지 IP, 도착지 IP 가 나타나있다.
