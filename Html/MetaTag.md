## meta tag

<p>meta 태그는 most effective tatics available 의 줄임말으로서, 여기서 tactic은 술책이나 전술이라는 의미로서, 결국 웹 페이지를 가장 적합하게 사용하기 위해서 그 정보를 제공해주기 위한 태그이다. 페이지에 보여지지 않은 태그이면서 페이지를 렌더링하는 브라우저, 서치엔진, 웹 서비스에서 읽혀지는 하나의 헤더이다. 메타 태그는 브라우저, 사용기기, 소셜 미디어, 서치엔진을 위한 태그이다.</p><br />

```html
<!-- 한글을 지원한다. -->
<meta charset="UTF-8" />

<!-- 애플이 IPhone이나 아이패드등의 모바일 기기안의 브라우저에서 페이지를 렌더링할떄 크기를 결정하는 값을 지정하기 위해 만든 메타 테그 -->
<meta name="viewport" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- 페이지에 대한 설명을 나타내며 서치엔진이 파악하는 정보이다. -->
<meta name="Description" content="This is the page description" />

<!-- 페이지에 대한 키워드를 나타낸다. 단 설명과 더불어 불필요한 정보를 입력하면 서치엔진이 스팸 처리를 해버릴 수 있으니 주의하자 -->
<meta name="Keywords" content="Wonik, html 완전정복" />

<!-- 검색엔진 봇이 페이지에 어떻게 반응해야하는지를 나타낸다 -->
<!-- all : 이 페이지를 포함해 링크가 걸린 모든 페이지를 수집 대상으로 정하게 하는 설정 -->
<meta name="Robots" content="all" />
<!-- none : 인덱싱을 하지 말고 링크가 걸린 페이지를 수집대상에서 제외 -->
<meta name="Robots" content="none" />
<!-- index : 페이지를 수집 대상에 포함시킨다 -->
<meta name="Robots" content="index" />
<!-- follow : 페이지를 포함, 링크가 걸린 곳을 수집 대상에 포함하는 설정 -->
<meta name="Robots" content="follow" />
<!-- 인터넷 익스플로러의 호환성을 표시하는 것으로서, 어떠한 렌더링 엔진을 사용할지를 선택한다 -->
<!-- 현재는 아래처럼 최신 엔진으로 렌더링 한다 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<!-- 페이지를 캐싱하지 않고 항상 서버에서 요청한다 -->
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Pragma" content="no-cache" />
<!-- 혹은 캐시 만료일을 설정할 수 있다.-->
<meta http-equiv="Expires" content="Mon, 08 Jun 2020 12:00:00 GMT" />

<!-- 페이지가 초 단위로 리프레쉬 되도록 설정할 수 있다. url을 설정하면 지정 주소로 초 단위 후 이동하게 된다 -->
<meta http-equiv="Refresh" content="20; url=https://google.com" />
```

<br />

```html
<!--2010년 opengraph 라는 메타태그를 통해 페이스북을 통한 원할한 페이지의 공유가 가능-->
<meta property="og:url" content="https://google.com" />
<meta property="og:image" content="https://google.com/wonik.jpg" />
<meta property="og:type" content="website" />
<meta property="og:description" content="html 정복은 생각보다 어렵다" />
<meta property="og:locale" content="ko-KR" />
```

<p>우리가 만든 웹사이트를 좀 더 효과적으로 마케팅하기 위해 정말 중요한 태그들이다</p>
