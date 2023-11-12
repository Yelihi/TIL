## next.js 빌드 및 분석하기

<p>배포 전 npm run build 를 통해 .next 폴더를 생성해주자. 이 폴더에는 getStaticProps 를 통해 생성될 html, global CSS, pre-rendering 에 사용될 js 파일들이 들어오게 된다. 그외 image 등등 SSR, SSG에 필요한 파일들이 포함된다.</p>

```json
  "scripts": {
    "dev": "next",
    "build": "cross-env ANALYZE=true NODE_EN=production next build"
  },
```

<p>script 에 build 를 넣어줌으로서 npm run build 로 실행이 가능하다. 빌드를 하게 되면 next.js 에서 알아서 파일들을 최적화 시켜준다. 파일 크기는 최소화 시키고 위에서 설명했듯이 미리 생성할 페이지까지 다 설정해준다. 다만 이 전에 webpack 을 따로 설정해주면 좋은 것이 있다.</p>

```js
// next.config.js
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true", // 이 환경변수가 true 여야 실행됨.
});

module.exports = withBundleAnalyzer({
  compress: true, // 요것도 gzip 해주는 것임
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === "production"; // 배포
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
    ];
    // if (prod) {
    //   plugins.push(new CompressPlugin());
    // }
    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval", // 히든으로 해줘야 배포 시 소스 유출 막음
      plugins,
    };
  },
});
```

- 빌드를 하게 되면, 터미널에 빌드한 페이지들에 대한 용량과 처음 로드하는 JS 에 대한 용량이 같이 표시되게 된다.
- 문제는 용량이 1mb 이상 초과하는 경우 모바일에서 렉이 걸리기 때문에, 줄여주어야 하는데 용량만 봐서는 어느 부분을 줄여주어야 하는지 감을 잡을 수 없다
- 이를 위해서 라이브러리를 설치해주자

```
npm i @next/bundle-analyzer
```

- 위 라이브러리를 설치하여 더 위의 next.config.js 에서 설정을 해주게 되면, 빌드 실행 시 client.html 이라는 페이지가 뜨게 되는데, 여기서 직사각형들의 크기를 확인하면서 어느 파일을 제거하던지 등등의 조치를 취할지 알 수 있게 된다.
- 내가 빌드할 때는, 1mb 가 넘어가서 어디서 그런것인지 파악했더니 이전에 설치해놓았던 @faker 라이브러리에서 용량을 크게 차지하고 있었고, 이를 지워주면서 최적화를 할 수 있었다.
- 마찬가지로 위에서 moment 에 대해 설명할 때, 용량이 큰 편이라고 하였었는데 이 부분을 plugin 에서 처리를 해주었다.

```js
const plugins = [
  ...config.plugins,
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
];
```

<br />

<strong>Compression-webpack-plugin</strong>
<br />

- 빌드를 하는 과정에서 css, html 파일들을 모두 gzip 으로 압축하게하는 설정이다
- 용량이 확 줄어들게 된다.
- 압축을 헤제하는것은 브라우저가 알아서 헤제하기 때문에 걱정할 것 없다.
- 원래는 내장된 plugin 을 설정해주어야 하지만, next 에서는 이미 내장되어 사용법이 나와있다.

```js
module.exports = withBundleAnalyzer({
  compress: true, // 요것도 gzip 해주는 것임
  // 생략
});
```

<br />
<strong>Cross-env</strong>
<br />

- pakage.json 에 script 부분에 build 를 설정하는 부분에서 특이점이 있다
- 'next build' 옆에 ANALYZE 와 NODE_EN 부분을 같이 설정해서 적어주었다.
- mac 이나 리눅스의 경우 그냥 이렇게 적어두기만 해도 알아서 빌드 시 적어둔데로 설정이 적용되는데, 문제는 윈도우는 그게 안된다는 점이다.
- 따라서 이를 해결하기 위해 라이브러리를 설치하자 (정확하게 이름 적어서 설치)

```
npm i cross-env
```

- 그 다음 앞에 cross-env 를 적어주면 된다.
