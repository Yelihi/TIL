## commonJS 와 ESmodule 의 차이점

<p>이전 모듈 시스템이 정착되지 않았을 때에는 자바스크립트 스크립트 파일 전체를 로드시켜야 라이브러리 사용이 가능했다. 부분적인 기능만을 사용한다 하더라도 결국은 전체를 로드해야 하기에 여간 불편한 것이 아니었다.</p><br />

<p>그러다 commonJS 가 등장하게 되고, node.js 에서 우리가 흔하게 보던 require 함수를 통해서 라이브러리의 일부분을 원하는 대로 가져와 사용할 수 있었다. 이전보다 너무나도 편리해지기 시작한 것이, 수천 수만개의 자바스크립트 파일로 분리를 하는 것이 가능해졌다는 점이다. 또한 파일 단위로 자바스크립트를 작성하여 이를 어디서든 require 해서 사용할 수 있게 된 점이 핵심이다. 이로 인해 손쉬운 라이브러리 개발이 가능해졌다.</p><br />

```js
const fs = require("fs");
const lodash = require("lodash");

const { add } = require("/add.js");
```

<p>이렇기에 현재 node.js 에서 활발하게 commonJS 가 활용되고 있다. 이러면 의문이 들텐데, 우리는 이미 import 를 사용하고 있는데 왜 commonJS 가 사용된다고 알고 있는 것일까? 그 이유는 TSC/Babel 에 의해 자동의로 트랜스파일링 되고 있기 때문이다.</p></br>

```js
import React from "react";

// 트랜스파일링

const React = require("react");
```

- 이렇게 자동으로 변환이 되게 된다.
- 즉 우리가 기존까지 쓰고 있던 import 문은 가짜였다!
- 사실 우리는 여전히 commonJS 를 사용하고 있다.

<p>하지만 이 commonJs 의 문제점도 존재하는데, 우선 require 는 말그대로 함수이기에, 조건문에 넣어서 조건에 따라 참조할 수 있기에 정적 분석에 어려움이 생겼다. 거기에 언어 표준이 아니기에, 브라우저나 deno 같은 환경에서는 사용할 수 없다.</p><br />

```js
if(some condition){
  fs = require('fs')
}
// 삼항연산자에 사용
require(some condition ? 'goo' : 'bar');

// 변수에 저장해서 사용
const originalRequire = global.require;
originalRequire(...)

```

- 위 처럼 require 가 분석하기 어렵게 사용될 수 있다.

<p>그 외 비동기 모듈을 정의하는것이 불가능하다는 점과 조용한 대입이 가능하다는 점에서 이러한 문제점을 가지게 된다.</p><br />

```js
let initialized = false;

export.initialize = async function initialize(){
  if(initialized){
    throw new Error('이미 initialize 되엇음')
  }

  await connectToDB();
  initialized = true;
}

export.readFromDB = async function readFromDB( ... ) {
  if(!initialized){
    throw new Error('먼저 초기화 하세요')
  }
  ...
}
```

- 예를 들어 DB에서 무엇인가를 읽는 동작을 모듈로서 사용하겠다고 하자
- 데이터베이스에 접근하기위해서는 먼저 데이터베이스와 연결이 되어야 하는데, commonJS의 경우 비동기를 지원하지 않기 때문에 위 처럼 매번 초기화과정을 검사해야한다.
- 만일 initialized 조건이 없다면 connectDB를 하기전에 readFromDB 로 먼저 진행이 될 것이다.

<p>이러한 문제들을 해결하기 위해 ECMAScript Modules (ESM) 이 추후 등장하게 된다. 우리가 흔히 쓰고 있는 import export 문이 ESmodule 이라고 생각하면 된다. ESmodule 의 특징이라면 우선 정적분석이 쉬워진다 </p>

```js
// 틀린 코드1
if(some condition){
  import React from 'react'
}
// 틀린코드2
import something from Condition ? 'foo' : 'bar';

// 틀린코드3
const originalRequire = import;
```

- 이를 통해 파일이 어떤 모듈을 참조하는지 쉽게 알 수가 있다.
- 또한 import 라는 부분이 키워드이기 때문에(if,for와 같은 것) 변수에 저장하거나 할 수 없다.

<p>그리고 비동기적으로 작동하기때문에 좀 더 쉽게 비동기 모듈을 사용할 수 있다.(Top-level await)</p><br />

```js
const db = await connectToDB();

export async function readFromDB(){
  await db.read();
}

export async function writeToDB(){
  await db.write(...);
}

```

- 먼저 연결한 다음 호출을 할 수 있게 해준다.

<p>그 외 브라우저,deno 등에서도 쉽게 사용할 수 있게 된다. 언어 표준이기 때문이다. 그래서 최근에는 좀 더 ESM 쪽으로 가는 추세이긴 하다. 다만 이러한 변화 과정에서 우리는 오류를 경험하곤 한다.</p><br />

| CommonJS        | ESM           |
| --------------- | ------------- |
| require         | import        |
| 정적분석 어려움 | 정적분석 쉬움 |
| 동기            | 비동기        |
| 언어표준이 아님 | 언어표준이다  |

<p>ESM 으로 변경하는 과정에서 나오는 오류들의 이유는 결국 동기와 비동기와의 관계에 있다. 비동기 함수에서 동기 함수를 호출하는것은 쉽다. 하지만 반대로 동기함수에서 비동기 함수를 호출하는것은 동기함수가 비동기가 되어야지만 가능하기에 어렵다.</p><br />

<p>다시 돌아와 살펴보면 CommonJS 에서는 ESM 을 사용하기 어렵고, 반대로 ESM 환경에서는 CommonJS 를 사용하기가 편하다.</p><br />

<p>commonJS 환경에서는 예를 들어 react 를 import 하는것은 쉽게 가능하지만, ESM 에서 require 를 사용하는것은 에러가 발생한다. (Error: require() of ES Module)</p><br />

<p>결국 이를 해결하려면 기존 commmonJS 를 모두 ESM 으로 변경하면 된다. 근데.. 이게 어렵다. 일단 이론적으로 어떻게 변경하면 되는지 살펴보자</p><br />

### node.js 에서 ESM 으로 변경하기

```js
// package.json
{
  ...
  "type" : "module",
}

```

- 우선 package.json 에서 타입을 모듈로 변경해준다.
- 이렇게 되면 모든 자바스크립트 파일은 ESM 을 따른다.
- 두번째 규칙은 .cjs 는 항상 commonJS, .mjs 는 항상 ESM 이다.
- 타입이 모듈이라 할지라도 .cjs 는 항상 commonJS 로 작동하게 된다. (현재로서는 반드시 commonjs 여야 한다면 사용할 수 있다)

### ESM 으로의 변경이 어려운 이유

<p>어려운 이유는 크게 2가지로 볼 수 있다.</p><br />

- 우리가 사용하는 가짜 ESM
- 성숙하지 않은 생태계 (많은 라이브러리들이 ESM 을 지원하지 않는다.)

<p>우선 우리가 사용하는 import문의 문제점은 무엇일까</p><br />

```js
// 잘못된 것
import { Component } from "./com";

// 옳은 표현 (확장자가 되어야 한다)
import { Component } from "./com.js";
```

- require 는 친절하게도 확장자가 없어도 저 이름에 대해서 모두 검색해서 적합한 주소를 찾아준다
- 다만 이렇게 되면 역시나 시간 낭비이기에 정확하게 확장자를 작성해주어야 하고, 실제로 ESM 은 반드시 확장자를 작성해야 한다.

<p>두번째는 성숙하지 않는 생태계인데, 타입스크립트의 경우도 문제가 있다. 위에서 정확한 주소를 가져와야 한다고 했는데, 타입스크립트 파일이라면 확장자가 .ts 이고 그러면 저 확장자로 적어주는게 맞지 않을까 싶지만 오류가 발생하고 .js 로 해야한다. 오류는 나지 않지만 별로 추천되는 방향이 아니기에 문제다.</p><br />

<p>commonJS 를 의존하는 라이브러리 역시 문제다. jest가 대표적이다. 이렇게 되면 선택적으로 옮겨야 하는 데 어떤 서비스를 옮길 수 있는지 확인해보자.</p>

- typescript 를 사용하지 않을 때(또는 .js 써도 괜찮을 때)
- next.js 가 아닌 기본 react,emotion 등의 라이브러리들
- Jest, Yarn PnP 등을 사용하지 않을 때
