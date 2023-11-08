## 라이브러리란?

라이브러리는 프로그램을 개발 할 때 필요한 다양한 기능을 미리 만들어 모듈화 해 놓은 것이라고 할 수 있다. 예를 들어 프로젝트 도중 날짜에 대한 기능이 필요할 떄, 날짜에 관련된 너무나도 다양한 기능을 직접 개발하기에 곤란할 수 있다. 이 때 날짜 기능을 미리 만들어 모듈화 해 둔 day.js 와 같은 라이브러리를 활용할 수 있는 것이다. <br />

이러한 라이브러리를 잘 활용하는 능력은 곧 개발 시간을 단축시킬 수 있는 필수적인 능력이다. <br />

라이브러리를 확인하고자 한다면 npmjs.com 을 통해 검색으로 확인할 수 있다. (마치 라이브러리의 백화점) <br />

## randomColor 설치를 통한 실제 실습

```
npm i randomcolor
```

<br />

randomcolor 라는 간단한 라이브러리를 설치해보자. 사전 조건은 npm init 이 되어있는 프로젝트여야 하며, type 은 module 로서 설정해주자.<br />

위 명령어로 라이브러리를 설치하면 크게 2가지 새로운 폴더와 파일이 생성이 된다. 각각 node_modules, pakage_lock.json 이며 우선 첫번째 폴더는 실제 설치한 라이브러리에 대한 파일이 저장이 된다. 이 파일이 있어야 실제 라이브러리를 사용할 수 있다. <br />

두 번째 pakage_lock.json 파일은 라이브러리를 설치할 때 pakage.json 에 추가되는 dependency 부분에 등록된 라이브러리들에 대한 좀 더 엄격한 정보가 담겨있는 파일이다. <br />

이 두 파일의 특징점은 서로를 의존하고 있으며 동시에 pakage.json 의 dependency 영역의 정보를 기반으로 생성된다는 점이다. 즉, 두 파일을 삭제해도 다시 npm install 을 통해 생성해줄 수 있다. npm install 의 기준이 바로 pakage.json 의 dependency 이기 때문이다. <br />

```json
{
  "name": "start-libarary",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/index.js"
  },
  "author": "",
  "license": "ISC",
  "type": "module",
  "dependencies": {
    "randomcolor": "^0.6.2"
  }
}
```
