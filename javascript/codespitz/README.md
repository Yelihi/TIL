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