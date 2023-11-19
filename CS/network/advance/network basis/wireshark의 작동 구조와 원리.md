## wireshark의 작동 구조와 원리

<img src="../../images/whireshark.png" alt="whireshark" />
<br />

- 패킷을 분석할 때 와이어샤크를 활용한다.
- OSI 계층에서 패킷이 L2 를 넘어 전송이 되기 전, 의도적으로 패킷에 대한 filter 를 추가할 수 있다.
- 이 filter 는 패킷을 그대로 전송시키는 Bypass, 걸러버리는 Drop 을 결정하게 된다.
- 반면 filter 와 달리 Sencer 역시 추가할 수 있는데, 센서는 Bypass 만 가능하고, 센서의 주된 목적은 패킷의 감청에 있다.
- 이렇게 감청된 패킷을 디코딩 하여 분석하는 것이 whireshark
- 참고로 프레임이 외부 네트워크로 전달이 될 때를 Outbound 라고 하고 들어오는것을 Inbound 라고 한다.
- 자신의 패킷 전송값을 감청하는것은 괜찮으나 그 외 사용은 법 위반이다.
