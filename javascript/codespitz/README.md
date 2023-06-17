## 77

### memory, address, pointer, variables, dispatch

메모리는 고유한 번호를 가지는 블록체계로 이루어져 있다. 4bit, 64bit 등등에 따라 메모리 크기가 결정이 된다.
<br />
데이터가 저장되면 각 메모리에 맞게 데이터가 저장이 되고, 그 주소가 부요된다. 예를 들자면

```
A = 'TEST' &A = 11
```

근데 B라는 곳에는 A의 주소만 저장하고 싶다고 하자

```
B = &A *B = 'TEST'
```

위 표현 방식은 C의 방식이다. 주소를 저장한 B에서 그 주소에 대한 값을 얻기 위해서는 (\*) 을 붙여주면 된다.
<br />

근데 이러한 변수는 계속해서 퍼져나간다. 즉 개발을 할 떄 주의할 점은 내가 만든 변수를 누군가가 어떻게 접근할지 모른다는 점이다. 우리의 통제권을 넘어서게 된다. 만약 C,D 역시 B 를 참조한다고 해보자. B는 A의 주소값을 가지고 있고, 따라서 C,D 역시 A의 주소값이 복사되어있다.
<br />

이제 최악의 상황을 생각해보자. B는 A 를 가르켜야 하는데, 이 아이가 &K 를 가리키기 시작했다. 예정대로 C,D 는 A를 가리키고 있고, B는 K 를 가리킨다. 근데 웃긴건 분명 C = B, D = B 에서 모순점이 생겨버린다. 개발자는 C와 D가 같다고 알고 있는데, 실제 메모리 구조는 전혀 다른 결과를 보여주고 있는 것이다.
<br />

이걸 해결하기 위한 방법으로는 참조의 참조를 이용하는 방법이 있다.

```
B = { value: &A, V: 3 }
C = B
D = B

```

위처럼 B에 바로 A의 주소를 복사하는 것이 아니라, 새로운 객체를 생성하고, 그 key 들에 대한 값들을 다른 메모리 공간에 저장하는 것이다. 예를 들어 value 의 값은 12번주소, V의 값은 20번 주소라고 해보자. 또한 B 자체는 2번 주소라고 하겠다.
<br />

이렇다면 C와 D는 2번 주소를 복사하게 된다. A에 접근하고 싶다면 B.value 로 접근할 수 있겠다. 이제 만약 B의 value 가 K로 변경이 되었다고 해보자. K의 주소는 33번이고, 이렇게 된다 한들 C와 D는 여전히 같은 2번 주소를 가리키고 있다. 만약 새롭게 B가 참조하는 주소를 얻고싶다면, C.value, D.value 이런식으로 처리하면 될 것이다.
<br />

### Lexical Grammar

- Control Character : 제어문자
- White Space : 공백문자 (한칸을 띄어주는 문자. 거진 50가지 이상이 있다)
- Line Terminators : 개행문자 (라인을 끊어주는것)
- Comments : 개행문자
- Keyword : 예약어 (변수나 식별자로 사용하면 안된다)
- Literals : 리터럴 (더 이상 나눌 수 없는 최소단위. 예를 들어 37은 자바스크립트가 더이상 나눌 수 없는 최소 숫자단위이다)

### Language Element

- Statement : 문

  - 실행은 됬지만 실행했던 결과나 증거가 나지 않는다. 메모리에 if나 for 가 남지 않는다. 즉, 그냥 컴파일러한테는 하나의 힌트일 뿐이다. (다른 언어인 루비의 경우 a = if... 같은것이 성립한다)
  - 공문(빈), 식문, 제어문, 선언문(var,const,let)

  ```js
  if (true) a = 5;
  else b = 2; // 맞는 표현. 중문이 오라는 법칙은 없다
  if (true) a = 3;
  else if (a > 2) b = 3;
  else b = 2;
  // 우리가 흔히 사용하는 else if는 사실 자바스크립트에 있는 것이 아니라, else 다음 문에 if 문이 오는것 뿐이다.
  // 중괄호 {} 는 상황에 따라 의미가 달라진다. 화살표 함수에서는 언어적으로 함수의 body 를 우선시하여 의미한다
  ```

- Expression : 식

  - 값을 표현하는 여러가지 방식이다. 덧셈의 결과도 값이다. 함수의 호출 역시 하나의 값으로 표현된다.
  - 식 역시 문으로 인정한다.

  ```js
  3;
  5;
  6; // 이렇게 해도 작동한다. 식 또한 하나의 문으로 인정하기 때문이다
  ```

- Identifier : 식별자
  - 대부분 변수를 의미한다.

### Sync Flow

메모리에 적재되어있는 명령어를 소화하는 동안 우리는 간섭하지 못한다. 이러한 흐름을 sync flow 라고 한다. 폰 노이만 머신은 cpu 가 이렇게 작동하기 떄문에 중간에 빠져 나올 수 없다.
<br />
이러한 흐름을 바꾸어 줄 수 있는 제어문은 flow control 이라고 한다. 방향을 바꿔줄 뿐이다. 대표적으로는 for, while, if 등이 있다.
<br />
그리고 함수와 같이 여러 군데에서 사용될 수 있는 흐름 제어가 있는데 이를 sub flow 라고 한다.

### Record

자바스크립트는 문 하나하나를 레코드라는 것으로 저장해놓고 이를 해결하고 있다. 이러한 레코드들이 flow 를 타고 쭉 실행이 된다. 즉 자바스크립트의 엔진은 문을 레코드로 변환하고 이를 flow 대로 실행시키는 역할을 하는 것이다.

### Direct Flow Control(직접 flow 명령어)

현재 자바스크립트에서는 Label 이라는 것이 있다. Label 은 $를 포함할 수 없다는 점 빼고는 변수의 이름 규칙과 동일하다.
<br />

현재는 auto label 이라고 반복문같이 순회하는 경우 자동으로 label 을 생성한다. 그래서 for 를 사용할 때는 label 을 사용하지 않아도되고, break 옆에 label 이름을 작성해주지 않아도 된다.

### Switch

스위치문은 스위치라는 키워드 그리고 괄호가 나오고 중괄호가 나오게 된다. 여기서 중괄호는 사실 다른 중괄호와는 다른 어떤 문법적인 토큰 요소이다. 스위치는 중괄호 부분을 특별한 공간으로 만들어주기 때문에 좀 따로 생각해야한다.
<br />

앞에서 label 의 표현이 aa: 라는것을 알게 되었다. switch 를 보게 디면 case: 라는 것을 확인할 수 있다. 즉, switch 문은 특별한 label 문이다.
<br />

```js
switch (true) {
  // 특별한 label 만 넣을 수 있다. case, default 말고는 다른 label 을 사용할 수 없다.

  case true:
    console.log("a");
  case false:
    console.log("b");
  default:
    console.log("c");
}
```

<br />

최근 구글이나 사파리에서의 switch 문의 특징점이 있다. fall through 라는 성질이 label 에 존재하고, break 를 걸어주지 않으면 그대로 밑으로 쭉 진행이 된다. 즉, true 인 첫번쨰 케이스를 값으로서 찾았다고 해도 콘솔은 a,b,c 모두 출력이 된다. <br />

특이사항은, dafult의 경우 만일 switch 에서 일치하는 값이 존재한다면, 처리되지는 않는다. 위 예시에서 default 를 위로 올렸을 때를 생각해보자
<br />

```js
switch (true) {
  default:
    console.log("c");
  case true:
    console.log("a");
  case false:
    console.log("b");
}

// 결과는 a,b
```

<br />

신기하게도 c 는 나오지않고 값과 일치하는 a 부터 fall through 가 적용이 되어 a,b 가 나오게 된다. 즉, 우선순위는 값과 case 의 일치여부이며, 일치하지 않는다면 그제서야 default 를 출력하게 된다.
<br />

```js
switch (true) {
  default:
    console.log("c");
  case a:
    console.log("a");
  case false:
    console.log("b");
}

// 결과는 c,a,b
```

<br />

일치하는 값(true)가 없기 때문에 default 인 c 가 출력이 되고, 이후 fall through 가 적용되어 c,a,b 가 출력이 되어버린다. 만일 default 가 맨 마지막에 있었다면 그냥 c 만 출력이 됬을 것이다.

<br />

스위치문은 자바스크립트에서 런타임 때 평가가 된다. 스위치는 값에 대한 평가를 하기 때문에, 이 값이 꼭 정적일 필요는 없다. 즉, case 옆에 함수호출이 와도 관계가 없다는 의미이다.
<br />

```js
switch (true) {
  case network():
    console.log("잘 가져왔습니다");
  case localCache():
    console.log("캐시라도 있으니 가져왔어요");
  default:
    console.log("안내문");
}

// 이런 표현도 가능하다.
switch (true) {
  case network() === "online":
  case network() === "offline":
  case network() === "wife":
  case localCache():
  default:
}
```

<br />

```js
var c = 2;
switch (true) {
  case c++ > 5:
    console.log(c);
    break;
  case c++ > 5:
    console.log(c);
    break;
  case c++ > 5:
    console.log(c);
    break;
  case c++ > 5:
    console.log(c);
    break;
  case c++ > 5:
    console.log(c);
    break;
}

// 답은 7 이 걸린다
// 순차적으로 해석하기 때문에 계속 c 가 증가하여 최종 true 에 해당할 때 걸리게 된다.
// 그래서 case 에 증감을 나타내는것을 사용하는것은 주의해야한다
```

### if else 는 되도록 쓰지 말자

if else 는 사실 없는 문법이다. 즉, else 다음에 오는 문이 If 일 뿐이다. 그래서 아래와 같은 코드가 더 정확하다.
<br />

```js
if (n > 2) {
  console.log("abc");
} else {
  if (n > 5) {
    console.log("ddd");
  } else {
    console.log("rrr");
  }
}

// 이를 그냥

if (n > 2) {
  console.log("abc");
} else if (n > 5) {
  console.log("ddd");
} else {
  console.log("rrr");
}

// 이렇게 표현할 뿐이다.
```

병행 조건에 의한것은 else if 보다 switch 를 사용하는것이 좋다. 다만 switch 를 쓸때는 반드시 예외 사건을 고려해서 default 를 해야한다. default 가 있기에 mandantory 루트를 탈 수 있게 된다. (즉, 조건문을 빠져나갈 가능성이 없어진다.)
<br />

아니면 if 의 옵셔널을 사용하려 한다면, 옵셔널로 끝내야한다. 예를 들어서 아래 코드는 사용하면 안되는 것이다.
<br />

```js
if(n > 2){
  //로직
}else{
  if(n > 5) // 옵셔널 로직
}

// 이렇게 되면 중간에 옵셔널이 들어가기 때문에, 코드가 오류를 발생할 가능성이 매우 커진다.

```

### 반복문

```js
for(선언문 or 식;truthy;ex){

}

// 문은 공문도 있기에 공문을 적어도 된다.
// 근데 웃긴게 for문에는 falsy 가 되는게 아니라 truthy 가 된다.

for( ;; ){
  // 무한 루프에 빠진다
}

// 반면 while 은 공문이 오면 안된다

while(truthy){
  // 뭐라도 와야한다
}

do{
  // 우선 한번은 무조건 실행한다
}while(truthy)

// 중요한건 while 에 들어가는 truthy 에 들어가는 변수가 body 에 나오는지를 확인하는 것이다.

// 이런건 파악하기가 너무 힘들다
while(act.method().c){
  other.action()
}

// 그래서 보통 조건문을 밖으로 빼낸다.

let a = act.method().c;

while(a){
  other.action();
  a = act.method().c;
}

// do while 문은 이렇게 하는게 원래 공식 문법이다
// 지금은 while 뒤에 ; 을 붙여도 된다.
do a++; while(a);

// 다양한 for

for ( of )
for ( in )

```

while 은 대부분 중문으로 쓴다. 당연하게도 식에 들어간 변수가 body 에 들어와야 하기 때문이다.

### Interface

1. 인터페이스란 사양에 맞는 값과 연결된 속성키의 셋트
2. 어떤 Object라도 인터페이스의 정의를 충족시킬 수 있다.
3. 하나의 Object는 여러개의 인터페이스를 충족시킬 수 있다.

### Iterator Interface

1. next 라는 키를 갖고 있고
2. 값으로 인자를 받지 않고, IteratorResultObject를 반환하는 함수가 온다
3. IteratorResultObject는 value와 done이라는 키를 갖고 있다.
4. 이 중 done은 계속 반복할 수 있을지 없을지에 따라 불린값을 반환한다.

```js
{
  next(){
    return { value: 1, done: false }
  }
}

{
  data: [1,2,3,4],
  next(){
    return {
      done: this.data.length === 0,
      value: this.data.pop()
    }
  }
}

// 이 객체는 계속 next 를 호출하다가 언젠가 done: true 가 된다.
// 즉 value = 1 일때까지 루프를 돌 수 있다.

```

표현을 조금 보면, 이터레이터 인터페이스를 지킨다라고 한다. ECMAscript 에 명시된 인터페이스를 지켜서 객체를 만든거 뿐이다.
<br />

### Iterable Interface

1. Symbol.iterator라는 키를 갖고
2. 값으로 인자를 받지 않고 Iterator Object를 반환하는 함수가 온다.

<br />
참고로 Symbol은 원시값으로 값으로 해석된다.

```js
{
  [Symbol.iterator](){
    return {
      next(){
        return { value: 1, done: false }
      }
    }
  }
}
// 스펙을 그대로 구현한 모습

```

<br />

next 만 호출한다면 루프를 계속 돌릴수 있을텐데, 왜 이터러블이 필요할까. 그 이유는 이터레이터 예시를 보면 data 배열의 원소가 다 pop 되면 더이상 루프를 돌리지않는다. 즉 일회성이라는 의미!. 따라서 이를 위해 데이터의 사본을 통해 이터레이터 루프를 돌리게 하고 싶었고, 이를 가능하게 해주는것이 바로 함수 이터러블 이다.

### while문으로 살펴보는 Iterator

```js
let arr = [1,2,3,4];
while(arr.length > 0){
  console.log(arr.pop())
}

{
  arr: [1,2,3,4],
  next(){
    return {
      done: arr.length === 0,
      value: console.log(this.arr.pop())
    }
  }
}

```

<br />

while 은 반복문이며, 얼마나 반복을 해야할지와, 실행 내용은 모두 문 안에 존재한다. 즉 배열 arr 자체로는 반복에 대한 정보를 가지고 있지 않다.
<br />

이 때 사람들은 어떤 반복의 조건을 값으로 가지고 싶어했고, 그러한 관점에서 Iterator 는 이를 만족할 수 있다. 자세히 Iterator 를 살펴보게 되면, done 이 그 반복의 조건임을 알 수 있다. 즉, 값이면서 반복의 조건이 되는 경우인셈이다.
<br />

이터레이터(이젠이렇게 표현하기로)의 경우 객체 자체가 반복의 정보를 가지고 있다고 할 수 있다. 기존 반복문은 한번 반복이 끝나면 이후 사라지는데 비해, 이터레이터는 필요할 때 필요한 만큼 반복을 할 수 있다.
<br />

다시 정리해보자

- 반복자체를 하지는 않지만, 외부에서 반복을 하려고 할때, 반복의 필요한 조건과 실행을 미리 준비해둔 객체
- 즉, 반복행위와 반복을 위한 준비를 분리
- 미리 반복에 대한 준비를 해놓고 필요할 때 필요한만큼 반복한다. 즉, 행위는 next 만 호출하면 된다.

<br />

우리가 문으로 반복을 하려고 하면, 필요할 때마다 문을 작성해주어야 한다. 너무나 복잡한 로직이라면, 올바르게 문을 작성할 수 있을지 의문이 들 수 있다.

### 사용자 반복 처리기

직접 이터레이터 반복처리기를 구현

```js
const loop = (iter, f) => {
  // Iterable 이라면 Iterator 를 얻음
  if (typeof iter[Symbol.iterator] == "function") {
    iter = iter[Symbol.iterator]();
  } else return;

  //받아온 iteratorObject 가 아니라면 건너띔
  if (typeof iter.next !== "function") return;

  do {
    const v = iter.next();
    if (v.done) return;
    f(v.value);
  } while (true);
};

const iter = {
  arr: [1, 2, 3, 4, 5],
  [Symbol.iterator]() {
    return this;
  },
  next() {
    return {
      done: this.arr.length == 0,
      value: this.arr.pop(),
    };
  },
};

loop(iter, console.log);
```

### 내장반복처리기

> **배열 해체**

```js
const iter = {
  arr: [1, 2, 3, 4],
  [Symbol.iterator]() {
    return this;
  },
  next() {
    return {
      done: this.arr.length == 0,
      value: this.arr.pop(),
    };
  },
};

// 이터러블을 지켜주면, 아래처럼 해체도 가능해진다. 언어의 지원이다. 그냥 알아두자
const [a, ...b] = iter;
console.log(a, b); // 4, [3,2,1]
```

<br />

> **펼치기**

```js
const iter = {
  arr: [1, 2, 3, 4],
  [Symbol.iterator]() {
    return this;
  },
  next() {
    return {
      done: this.arr.length == 0,
      value: this.arr.pop(),
    };
  },
};

const a = [...iter]; // iter 객체를 펼치겠다는것이다. 반드시 이터러블 객체여야 스프레드를 쓸수있다.
console.log(a); // [4,3,2,1]
```

<br />

> **나머지 인자**

```js
const iter = {
  arr: [1, 2, 3, 4],
  [Symbol.iterator]() {
    return this;
  },
  next() {
    return {
      done: this.arr.length == 0,
      value: this.arr.pop(),
    };
  },
};

const test = (...arg) => console.log(arg);
test(...arg); // [4,3,2,1]
```

<br />

> **For of**

```js
const iter2 = {
  [Symbol.iterator]() {
    return this;
  },
  arr: [1, 2, 3, 4, 5, 6],
  next() {
    return {
      done: this.arr.length == 0,
      value: this.arr.pop(),
    };
  },
};

for (const v of iter2) {
  console.log(v);
}
```

<br />

문자열도 이터러블 객체라고 할 수 있다. 이전엔 split 로 했지만 그냥 요새는 [...string] 을 해주면 된다.
<br />

폰 노이만 구조에서 코드가 실행이되면 중간에 개입할 수 없다. 이를 동기 명령이라고 한다. 우리는 CPU 를 건들 수 없고 이를 블로킹이라고 한다. 동기적인 명령을 실행하는동안 우리는 아무것도 할 수없고 따라서 블로킹 상태라고 한다.
<br />
브라우저는 보통 20초이상 블로킹이 발생한다면 용납하지 않는다. 근데 안드로이드는 어플이 5초이상 블로킹이라면 앱을 종료시켜버린다. 결국 속도 기준은 정적이라고 한다면, 이 정적인 시간동안 처리하는 능력은 CPU의 연산능력에 따라 달려있다.
어찌되었던 시간문제이기 때문에, 정말로 긴 loop 라면 이를 한번에 돌려서 블로킹 시간을 다 잡는것보다, 쪼개서 돌려야 한다.
<br />
최근에는 결국 OS 의 권한이 커지고 있는데, 이유는 게임중에 전화가 오면 게임을 바로 중단시켜야 하기 때문이다. 이러한 예시들로 통해 OS 의 권한이 커지고 있음을 알 수 있다.
