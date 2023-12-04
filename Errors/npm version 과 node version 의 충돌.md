## npm 과 node 버전 충돌로 인한 설치 및 실행 오류

EC2 내 자동 배포를 하는 과정에서, 갑자기 npm i 가 실행되지 않는 문제가 발생하였다. 에러 메시지를 자세히 보니 npm 과 node version 의 충돌로 인한 문제라고 파악이 되었다. <br />

## 원인

버전 충돌은 이해가 갔지만, 어째서 버전에서 충돌이 발생한 것인지를 알기 위해 yml 파일을 살펴본 결과, `npm install -g npm@latest` 명령어로 매번 최신의 npm 을 설치하고 있었다. 현재 mac 에서 다루는 node 는 18버전이며 npm 은 6버전을 사용하는데, EC2 ubuntu 에서는 10버전이 설치되어있었다. <br />

물론 10버전도 node 18 버전에서는 작동이 가능하나, 안타깝게도 ubuntu 내 node 의 버전은 14였다. <br />

여기서 문제가 발생한 것이고, 이로서 해결책은 node 버전을 업데이트 하던지 npm 버전을 낮추는 방법이다.

## 해결과정

node 의 버전을 높이는 방향으로 해결하기로 하였다. <br />

```
sudo apt-get purge node
sudo apt-get purge npm
```

<br />

원래대로라면 node와 npm 이 삭제가 되어야 하지만.. pakage node 와 npm 을 찾을 수 없다고 나왔다. 이유를 알 순 없었고, 다른 방법을 고안해야 하였다. <br />

우선 nvm 으로 node 버전을 관리하는것이 좋기에 설치를 하려고 하였지만, 이 역시 npm 을 실행시킬 수 없어서 실패하게 되었다. 아니 정확하게 말하면 원래는 node 와 npm 이 설치가 되어있지 않아도 실행되어야 하지만, 설치되어있는 npm 이 오류를 발생시키기에 어찌되었던 npm 을 삭제시켜야 했다. <br />

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

<br />

참고로 위 입력문은 nvm(노드 버전 관리자) 설치 명령어다. <br />

어찌되었던 다시 돌아와 npm 을 삭제해야 하는데, apt 명령어로는 삭제가 안되니 다른 방법을 강구해야 했다. npm 명령어를 사용할 수 없으니, npm install 역시 불가능 하였다. 이에 직접 설치되어있는 node, npm 의 위치에 접근하여 삭제를 하는 방법을 선택했다. <br />

```
which node

rm -rf node의 위치

which npm

rm -rf npm의 위치
```

<br />

이를 통해서 node 와 npm 을 삭제할 수 있었다. <br />

이제 다시 node 를 설치하기 위해 nvm을 설치해준 다음, nvm 을 활성화 하도록 하자. <br />

```
. ~/.nvm/nvm.sh
```

<br />

만약 최신 LTS 버전의 node 를 설치하고 싶다면 이후 아래의 명령어를 작성하자 <br />

```
nvm install --lts

node -v
npm -v
```

<br />

버전까지 확인하면 제대로 설치가 완료되었음을 알 수 있다. 이제 다 설치 되었으니 git pull 을 통해 작업을 진행하려고 했었다.. 허나 다시 문제가 발생했다.

## nvm의 설치 경로

기존에 node 를 설치했을 때는 nvm 으로 설치하지 않았다. 그리고 지금은 nvm 을 통해 node 를 설치하였다. 그렇기에 경로에 차이가 발생하여, 경로를 찾을 수 없다는 에러가 발생하게 된다. <br />

설치된 경로를 바꾸는것이 가능한지는 모르겠지만, 이 방식보다, 마치 바로가기 아이콘을 만들듯이 설치된 경로에 접근할 수 있는 새로운 경로를 만드는 것은 가능하다.<br />

이 새로운 경로를 원래 node 를 설치했던 경로로 지정해주면 정상적으로 작동할 수 있다. <br />

```
ln -s ${현재 노드가 설치된경로} ${새로 설정할경로}

ln -s /home/bonita-sy/node/bin/node /usr/local/bin/node
ln -s /home/bonita-sy/node/bin/npm /usr/local/bin/npm

```

<br />

실제 바로가기를 만들어 준 다음, `which node` 를 하게되면 변화가 없다. 즉, 원본 경로는 그대로 존재하며, 이 경로로 접근시켜줄 새로 지정한 경로가 추가된 것이다.
<br />

이제 제대로 설치가 되기 시작하였다.
