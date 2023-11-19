### TCP 송/수신 원리

<img src="../../images/TCP send and receive.png" alt="TCP" />
<br />

- 1.4mb의 이미지 파일을 클라이언트에서 서버에 요청을 했다고 가정하겠다
- 서버측 HW 에서 이미지파일을 고수준의 buffer 로 read 한다. 이때 한번에 다 가져올 수 없으니 64kb(예를 들어) 가져온다
- 이후 단위가 file 이니 socket 을 통해 TCP/IP 계층으로 이동시킨다.
- file 은 Segment 단위로 쪼개진 뒤 (Segment는 각자의 번호를 포함한다 예를 들어 #1, #2) Packet 에 담겨 Frame 을 통해 Client 측으로 전송된다. (receive)
- 이후 Client 측 TCP buffer 에 segment 를 쌓는다. (#1, #2)
- 정상적으로 수신되었으니 TCP 는 server 에게 ack#3(#3을 보내주세요) 를 요청하게 된다
- 이 때 ack에는 TCP buffer 의 사이즈인 window size 정보가 같이 들어있다.
- 만일 window size 가 segment 로 인해 꽉 차버렸다면 server 는 이를 인지해서 segment 를 전송하지 않고 wait 단계에 있다
- 만일 window size 가 여유있다면 server 에서는 segment#3 를 송신한다.
- 여기서 중요한 점은 window size 에 있는데, 만일 client 의 프로세스의 성능에 문제가 있어 File buffer 로의 전달이 정체되어있다면 window size 는 계속해서 쌓여갈 것이고, 그렇기에 나중에는 window size 가 가득차서 wait 상태에 걸리게 된다
- 즉, TCP 송/수신의 속도 저하 문제는 서버측의 문제가 아닐 수 있다는 점이다. (Receive Speed 가 느려서 발생할 수 있다)
- 따라서 이러한 문제가 발생하면 네트워크 문제로 짐작하기 전에 프로세스의 수신 속도에 문제가 있는지부터 파악해야한다
