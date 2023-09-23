## URL 을 인코딩 하는 이유

알아본 바에 의하면 URL 은 아스키코드로 이루어져야 하기에 그 외의 문자는 '%'와 16진수 문자를 조합해 인코딩 한다. 이를 이스케이프 처리된 URL 이라고 한다. <br />
노드에서도 인코딩, 디코딩 기능을 모듈을 통해 제공하는데 이 모듈이 querystring 이다. <br />

```js
const qs = require("querystring");

let str = "안녕하세요";
let encodedStr = qs.escape(str); // %20%E....
let decodedStr = qs.unescape(encodedStr); // '안녕하세요'
```

<br />

실제 사이드 프로젝트에서 검색 단어를 query 를 통해서 server 에 전달할 때, 디코딩 과정을 거치지 못해서 에러가 발생했었던 적이 있다. 이를 unescape 를 통해서 해결했었다. <br />

```js
router.get("/clothes/search/", isLoggedIn, async (req, res, next) => {
  try {
    let searchWord = qs.unescape(req.query.searchWord); // 디코딩 과정을 거친다.

    // 생략

    const result = {};
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
```

<br />

### 새로 알게 된 사실

express 모듈에서는 쿼리스트링을 알아서 디코딩 해주고 파싱하여 req.query 변수에 할당해준다고 한다. 즉, 사이드 프로젝트를 진행할 때 에러가 발생했던 원인이 디코딩 부분이 아니었다는 것을 알게 되었다. 이러한 자동 디코딩은 express 모듈이고 기본 http 모듈에서는 디코딩 과정을 거쳐야 한다.
