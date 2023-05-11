### listen EADDRINUSE: address already in use :::3001

<p>말 그대로 3001 번 포트가 실행중이라는 것이니, 이를 터미널에서 삭제해주자</p><br />

- lsof(List Open files): 현재 시스템에 열려있는 파일, 그 파일을 사용중인 프로세스 목록을 보여준다
- lsof -i tcp:[PORT] : 특정 tcp포트번호를 사용중인 목록을 보여준다
- kill [PID] : 해당 PID를 가진 프로세스를 종료시킨다.

```
lsof -wni tcp:3001

kill 58810(피드번호)

```
