<h2 align="center"> Network </h1>
<h3 align="center"> 매일 공부한 부분을 간략하게 정리하자 </h3> 
<br />

<h2 id="프로젝트소개"> :book: 작성일 기록 </h2>

- [2023.4.10](#2023-4-10)
  <br />

![--------------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<h2 id="프로젝트소개"> :book: 간단한 요약 정리 </h2>

## 2023-4-10

### listen EADDRINUSE: address already in use :::3001

<p>말 그대로 3001 번 포트가 실행중이라는 것이니, 이를 터미널에서 삭제해주자</p><br />

- lsof(List Open files): 현재 시스템에 열려있는 파일, 그 파일을 사용중인 프로세스 목록을 보여준다
- lsof -i tcp:[PORT] : 특정 tcp포트번호를 사용중인 목록을 보여준다
- kill [PID] : 해당 PID를 가진 프로세스를 종료시킨다.

```
lsof -wni tcp:3001

kill 58810(피드번호)

```
