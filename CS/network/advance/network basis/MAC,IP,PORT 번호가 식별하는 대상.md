## MAC, IP, Port 번호가 식별하는 대상하는 대상은 무엇일까?

- Mac : NIC(LAN 카드)들은 MAC 주소를 가지고 있다. 유선, 무선을 지원한다면 그 컴퓨터는 MAC 주소가 2가지라고 해도 된다.
  - MAC 주소는 하드웨어 주소지만 변경이 가능하다.
- IP : NIC 하나에 여러 IP 주소가 binding 된다. 컴퓨터 한대에 IP 주소가 여러개일 수 있다. ()
- Port: OSI 계층에 따라 user mode(프로세스 식별자), kernel mode(서비스 식별자), h/w mode(인터페이스 식별자) 로서 다양하게 해석된다.
