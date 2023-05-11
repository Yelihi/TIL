## AWS 시작하기

- 빌드를 하고 이제 배포를 해야하니, 아마존에 들어가서 로그인을 해주자
- 회원가입을 하게 되면 카드번호를 입력해야하는데, 1달러가 결제가 되고 이후 자동으로 다시 환불된다.
- 로그인을 하면 콘솔 매니저 부분으로 이동하게 되고, 지역을 서울로 변경해주자
- EC2 에 들어가서 인스턴스 시작 클릭
- 우분투 클릭
- 인스턴스 설정 중 보안 그룹 -> 유형에 http, https 추가
- 이후 인스턴스 시작 -> 새로 키페어 생성
- 다시 인스턴스 시작
- 다음 EC2 로 이동 -> 실행중 인스턴스에 들어간다 -> 이름 설정해주기
- 이런식으로 인스턴스 생성 가능. 인스턴스를 삭제하려면 인스턴스 종료 해주면 된다.
- 다음에는 이제 이 인스턴스와 연결할 준비를 하자
- 연결할 서버에 연결 -> ssh 부분에 예시로 주소가 나와있다. (예 : ssh -i "react-nodebird.pem" ubuntu@ec2-3-36-85-56.ap-northeast-2.compute.amazonaws.com)
- 이 주소를 복사해서 깃 터미널에 입력 한 다음 yes 를 눌러주면 아마존 서버로 연결이 된다.
- 만약 WARNING: UNPROTECTED PRIVATE KEY FILE! 에러가 발생한다면 맥 기준으로 터미널에 `chmod 600 pem이름.pem` 을 입력해주면 된다.
- 이후 아마존 서버 터미널이 뜨면 여기에 `git clone 레포주소` 를 해주자.
- 다음 리눅스 터미널 접근키로 cd 를 통해 배포할 서버 폴더까지 접근한다.
- 아마존 서버에는 자동으로 깃허브 변경사항이 들어가지 않으니 깃허브가 변경될때마다 git pull 을 해주자.
- 다음 아마존 서버에 노드를 깔아주자

```
$ sudo apt-get update
$ sudo apt-get install -y build-essential
$ sudo apt-get install curl
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash --
$ sudo apt-get install -y nodejs
```

- node -v , npm -v 로 확인해주자
- 그 다음 npm i 를 해주자
- 이제 npm run build 를 실행하자.
- 만약 원본 파일이 업데이트 됬다면 순서는 다음과 같다
- (원본) git push -> (우분투) git pull -> npm i(먼가 설치했다면) -> npm run build -> npm run start
- 이러한 과정을 대신 처리해주는것이 CI/CD
  <br />

<strong>백엔드에 mysql 설치</strong>

```
sudo apt-get install -y mysql-server
```

- 이렇게 설치를 하면 보통 8버전이 설치가 되는데 안될 수도 있다.
- 8 버전이 설치가 안되었다면 버전을 바꾸어주어야 하는데, 구글에 검색하면 방법은 나와있다.
- 다음에는 root 터미널로 넘어가자

```
sudo su
```

- 이후 mysql_secure_installation 을 실행하자
- 여기서 이제 2가지 방향으로 나뉘게 된다. 만약 패스워드를 입력하는 창이 나오고 잘 넘어가면 괜찮은데, 만일 오류가 발생한다면 따로 비밀번호를 설정해주어야 한다.
- 오류가 발생하였다고 가정하면 우선 터미널을 종료한 다음 다시 켜주자
- 이후 아래처럼 실행하자

```
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by '비밀번호';
```

- 이렇게 비밀번호를 mysql 에서 설정을 한 뒤 다시 sudo su 를 통해서 root 로 접근
- 그 다음 mysql_secure_installation 을 진행하면 된다.
- 이 때 맨 처음 비밀번호를 교환할 것이냐고 물어보는데, 여기에 반드시 n 을 입력하자. (교환안함)
- 이후 y 를 눌러가면서 진행하자
- 진행이 완료되었다면 root 그대로 mysql -u root -p 를 진행하여 비밀번호가 제대로 입력되면 성공
- 이 과정까지 왔으면 mysql 은 성공적으로 설치가 되었다.
  <br />

<strong>npm start 를 하기 전 설정부분</strong>

- 우선 실제로 sql 의 비밀번호는 .env 로 관리되고 있고, 이 파일은 깃허브에 올라가질 않으니 비밀번호를 설정해주어야 한다.

```
vim .env
```

- 이후 빈 파일에 i 로 insert 모드로 전환한뒤, .env 에 설정한 비밀번호를 다 적어주자
- 다음 :wq 를 통해서 저장을 하고 나오도록 하자. 이렇게 비밀번호가 설정이 되었다.
- 그 다음에는 포트를 설정해주어야 한다. 본인 컴퓨터로 할 때는 포트를 그대로 3065 를 사용하였는데, 실제 배포할 때는 퍼블릭 IPv4 에 사용될 포트로 변경해주어야 한다. (80 이나 440)

```
vim app.js
```

- 위처럼 app.js 로 들어간 다음 포트부분을 80으로 변경한다음 저장해주자
- 그 다음 시퀄라이즈를 mysql 과 연결시켜주자
- 이건 이전 방법과 동일하다.

```
npx sequelize db:create
```

<br />

## PM2

- 노드같은 경우 터미널을 종료해버리면 서버도 같이 꺼지게 되는데(연결이 끊어짐) 이는 노드가 foreground process 로 돌아가기 때문에 발생하는 현상이다.
- 이걸 이제 background process 로 변경해주어야 쉘이 꺼져도 서버는 그대로 돌아가게 할 수있다.

```
npm i pm2
```

- pm2 를 설치하고 package.json 으로 접근하여 명령어를 변경해주자.

```js
{
  script:{
    "start" : "pm2 start app.js",
}
}
```

- 중요한 것은 꼭 .js 까지 다 붙여주는 것이다.
- 그리고 나서 저장하고, 나와서 npm start 를 해주면 pm2 로 실행이 된다.
- 허나 명령어를 입력할 때 유의할 점음 npm start 가 아니라 sudo npm start 로 해주어야 한다.
- 왜냐면 1200번대 이하 포트는 sudo 로 root 권한으로 접근하여야 하기 때문이다
- 그리고 한번 sudo 로 접근했다면 이후 명령어에는 다 sudo 를 붙여 주어야 한다.
- 에러가 날 때 확인하는 방법이 있는데, 명령어로 아래와 같고, sudo 로 했으니 앞에 sudo 만 붙여주면 된다.

```
npx pm2 monit
```

- 끄는 건

```
npx pm2 kill
```

- 리스트를 보는것은

```
npx pm2 list
```

- 지금 서버를 다시 재시작 하는것은

```
npx pm2 reload all
```

- 로그나 에러 로그를 보고싶다면

```
npx pm2 logs
npx pm2 logs --error
```

- 실행되고 있는 포트를 알아보기

```
lsof -i tcp:포트번호
```

- 포트를 끄는것은 역시나 npx pm2 kill 로 하면 된다.

<br />

## fron 서버 연결하기

- front 서버 연결과정에서는 매번 build 의 과정이 필요하다.
- 우선 작업을 해줄 것은 기존에 front 에서 백엔드 주소를 그냥 타이핑 해주었는데, AWS 에서 고정 아이피를 하지 않는 이상 계속 일정시간 후 변하기 떄문에, 따로 config 파일을 만들어서 주소를 관리한다.
- 항상 업데이트를 해주어야 한다 (git push -> ubuntu -> git pull -> npm run build -> sudo npx pm2 start npm -- start)
- 이렇게 실행을 해주고 다음 백엔드 서버도 npm start 로 실행을 하였다면 화면이 뜨게 된다.
- 하지만 다시 cors 문제가 발생을 할 텐데, 그렇기에 back -> app.js 에서 cors 부분 origin 에 현재 프론트의 ip 주소를 추가해주면 된다.
- 이제 실행하면 잘 동작을 할텐데, 만약에 오류가 발생한다면 하나 확인해볼게 있다.
- back 에서 mysql 에 데이터베이스 테이블이 제대로 들어갔는지 확인을 해야한다.
- back 에서 sudo su -> mysql -uroot -p -> use react-nodebird(이와같이 자기가 사용하는 테이블 이름) -> show tables;
- 이렇게 입력하면 테이블이 나오게 되는데, 이 테이블이 제대로 들어가있지 않다면

```
DROP DATABASE `react-nodebird`
```

- 이렇게 데이터베이스를 변경해줄 수 있다.
