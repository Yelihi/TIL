## nginx + https

<p>front 서버에서 ngnix 를 추가하여 클라이언트에서 443이나 80 포트로의 접근이 들어오면, ngnix 서버가 이를 받아서 실제 next.js 서버인 3000 포트에 전달해준다. 특히 포트 80이 오게 되면 ngnix 에서 알아서 443 으로 변경하여서 적용해준다. 이를 리버스 프록시라고 한다. 이렇게 하면서 포트 관련된 리다이렉트 처리는 ngnix 가 처리하고 나머지 처리는 next.js 서버가 처리하게 하는 구조로 만들게 된다.<p><br />

> **front**

- 먼저 기존 80 에서 실행되는 노드 서버를 kill 해주자(확실하게)
- 우선은 프론트에 설치하는것이니 우분트 프론트 경로로 이동한다
- `sudo apt-get install nginx` 를 입력해준다
- `sudo vim /etc/nginx/nginx.conf` 로 접근해주자
- 설정파일이 생겨져 있을 것인데, 우리는 http 만 건들면 된다.
- 그리고 Virtual Host Configs 에 가면 server 가 비워져 있을텐데, 이 부분을 작성해주어야 한다.

```
server {
  server_name closet-online.com;
  listen 80;
  location / {
    proxy_set_header HOST $host;
    proxy_pass http://127.0.0.1:3000;
    proxy_redirect off;
  }
}

```

- 이 설정하기 전에 http 인증서(3개월) 를 발급받아야 한다.
- 다만 3개월마다 갱신을 해주어야 한다.
- `wegt https://dl.eff.org/certbot-auto`
- 실행하려면 권한이 필요해서 `chmod a+x certbot-auto`
- 앞에서 80을 삭제했으니 이제 `sudo systemctl start nginx` 를 통해 실행을 해주자(권한때문에 sudo!)
- 다음 `./certbot-auto` 를 입력해주자. 이렇게 하면 설치 시작한다
- email address 를 내 이메일 적어서 갱신하라는 이메일을 받도록 하자
- 그다음 agree 하고 나머지 yes 해주자.
- 잘 되면 congratulation 이 뜨는데, 이후 경로를 잘 봐야한다
- /etc/letsencrypt/live/closet-online.com/fullchain.pem
- /etc/letsencrypt/live/closet-online.com/privkey.pem
- 위 2 경로를 기억해두자
- 그 다음 갱신하기위해서 입력할 명령어 `certbot-auto renew` 를 입력해주면 된다(3개월 전에)
- 이제 다시 `sudo vim /etc/nginx/nginx.conf` 를 들어간다 (권한 주의)
- 이후 우리가 신경쓸 부분은 server 부분이고 certbot 이 알아서 설정해주긴 한다.
- 저장한다음 `sudo systemctl restart nginx` 로 재 시작을 해준다
- 그 다음 프론트 package.json 으로 가서 start 시 포트를 3000 으로 변경해주자
- 그리고 나서 프론트 서버를 시작해주자.
- `npx pm2 start npm -- start`

> **back**

- 백엔드 역시 같은 방식으로 설치를 해주면 된다.
- 다만 ./certbot-auto 하기 전에 작성해야할 것이 있다
- 우선 vim 을 통해 ngnix.conf 에 들어가서 server 를 작성해주도록 하자

```
server {
  server_name api.closet-online.com;
  listen 80;
  location / {
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header HOST $host;
    proxy_pass http://127.0.0.1:3065;
    proxy_redirect off;
  }
}

```

- 그 다음 lsof -i tcp:80 을 통해서 실행되는게 있다면 kill 해주자
- 이 다음 ngnix 를 켜주자
- sudo systemctl start nginx
- 아무것도 안뜨면 성공적인것이다
- 이제 ./certbot-auto 실행해주자
- 프론트와 과정은 같고 2개의 pem 에 대한 루트를 기억해주고, 갱신 키워드도 기억해주자
- 이제 vim /etc/nginx/nginx.conf 들어가면 알아서 잘 작성해준다. 이제 exit 해줘서 나간다음에
- app.js 에 들어가서 포트를 80 -> 3065 로 변경해준다
- 그 다음 서버 실행해주면 된다.
- 만일 에러가 난다면 tail 하고 conf 파일에서 확인한 에러로그 루트를 적어주면 확인해줄 수 있다.
- 항상 에러 확인하고 뭔가 수정했으면 nginx 재 시작을 해줍시다

### 에러

- 만일 에러가 발생한다면, 주로 mixed content 에러가 발생한다. https -> http 로 요청을 보내면 발생하는 에러이다.
- 인증서를 받았다면 이제 backURL 이나 frontURL 모두 https 로 변경을 해주어야 한다. (프론트)
- 백을 변경안하면 cors 오류가 떠버린다. cors origin 에 대해서 https 로 변경해주자
- 참고로 secure 를 true 로 하려면 conf 에서 server 를 변경해주어야 한다.
- 우선 app.js 에서 app.set('trust proxy', 1) 을 적어주자
- 그 다음 app.use(session) 에서도 proxy: true 설정을 해준다
- 마지막으로 conf 에서 server 쪽에 위처럼 설정을 해주도록 하자.

### 만약 certbot 이 위 방법처럼 설치가 안된다면

- nginx 가 설치되었다는 것으로 간주하겠다.
- `sudo snap install certbot --classic` 을 통해 설치를 진행한다
- 이후 80 포트가 nginx 로 실행중인지, nginx.conf 파일에서 server 설정을 마무리했는지 확인한다
- 다 설정했다면 이제 `sudo certbot --nginx` 를 실행해주자 (`./certbot-auto` 와 동일하다)
- 나머지는 동일하다
- 만일 자동 갱신을 하고 싶다면 vim /etc/cron.d/certbot 으로 들어가서(없으면 생성)

```
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
0 */12 * * * root certbot -q renew --nginx --renew-hook 'service nginx reload'

```

- 위처럼 할 시 하루 2번 갱신을 시도하게 된다

### nginx 의 명령어

- nginx.conf 의 설정이 변경된다면 다시 실행해주어야 한다
- 아래 명령어를 잘 참고하자.

```
// 시작
$ sudo service nginx start
$ sudo systemctl start nginx
$ sudo /etc/init.d/nginx start

// 재시작
$ sudo service nginx restart
$ sudo systemctl restart nginx
$ sudo /etc/init.d/nginx restart

// 중지
$ sudo service nginx stop
$ sudo systemctl stop nginx
$ sudo /etc/init.d/nginx stop

// 상태
$ sudo service nginx status
$ sudo systemctl status nginx

// 설정 reload
$ sudo service nginx reload
$ sudo systemctl reload nginx
$ sudo nginx -s reload

// 설정파일 문법 체크
$ sudo nginx -t

```
