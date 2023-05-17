## This

### 명시적으로 bind 하지 않았을 경우

<p>다른 언어에서 this 는 호출 시 해당 함수나 객체를 가리킵니다. 하지만 자바스크립트의 경우 this 는 this 가 호출되는 상황에 따라 변화가 생깁니다. 사실 자바스크립트에서 함수와 메서드를 구별하는 구분하는 유일한 기준이 this 입니다. 일반적으로 누군가가 this 를 특정 객체로 바인딩 하지 않았을 경우, 함수 호출과 메서드 호출의 this 는 차이가 발생합니다.</p><br />

<p>실행 컨택스트가 생성이 될 때, 우선 LexicalEnviroment 에 선언 변수가 저장이 되며, 스코프체인이 결정되고, 마지막으로 this 가 바인딩 됩니다. 실행 컨택스트는 전역 컨텍스트가 아닌 이상 함수가 호출될 때 생성이 되는 객체입니다. 따라서 결국 this 는 함수가 호출이 될 때 결정이 됩니다.</p><br />

<p>우선 전역공간에서의 this 는 런타임 환경에 따라 다릅니다. 보통 브라우저는 window, node.js 는 global 로 형성됩니다. 참고로 우리가 선언하는 모든 변수는 특정 객체에 저장이 됩니다. 이 객체는 LexicalEnviroment 로서 자바스크립트 엔진은 호출된 변수를 이 객체에서 찾게 됩니다. </p><br />

<p>이제 함수와 메서드의 this 차이를 살펴보겠습니다. 함수의 경우 어디에서 호출을 하던 this 는 전역객체에 바인딩 되어있습니다. 반면 메서드의 경우 메서드를 호출한 상위 객체에 바인딩이 되어있습니다. 여기서 함수와 메서드의 표현적 차이를 알아야 합니다. 기본적으로 함수와 메서드의 형태는 모두 같으나, 호출시에 차이가 있습니다. 메서드를 호출할 때는 앞에 객체가 있고 . 을 통해서 내부 함수를 호출하는데 이를 메서드라고 합니다. (정말 구별법이 이거입니다). 코드 예시를 살펴보겠습니다.</p><br />

```js
var func = function (x) {
  console.log(this, x);
};

func(1); // 전역객체

var obj = {
  method: func,
};

obj.method(1); // 객체 obj
```

<p>같은 함수라 할 지라도 어떻게 호출되는지에 따라 바인딩하는 객체가 달라집니다. 즉 this 의 가장 큰 특징인 실행 컨택스트 생성 시 결정이 된다는 점이 여기서도 드러나게 됩니다. 중요한것은 어떻게 호출되느냐입니다. 즉 내부 메서드를 호출하였어도 그 메서드 안 내부 함수가 있고, 이 함수가 그냥 호출이 되는것이라면 이 함수의 this 는 전역객체를 바인딩 합니다.</p><br />

```js
var obj1 = {
  outer: function () {
    console.log(this); // outer 를 바인딩합니다.
    var innerFunc = function () {
      console.log(this); // 전역객체를 바인딩합니다.
    };
    innerFunc(); // 메서드 호출이 아닌 그냥 함수 호출입니다.

    var innerFunc2 = () => {
      console.log(this); // 가장 큰처의 this 인 outer 를 반환합니다.
    };
    innerFunc2(); // 역시나 메서드 호출이 아니지만 화살표함수는 this 를 바인딩 하지않습니다. 대신 가장 근처의 this를 반환할 뿐입니다.

    var obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod(); // 메서드로 호출하였습니다. 따라서 outer 에 바인딩 되어있습니다.
  },
};

obj1.outer();
```

<p>위에서 확인할 수 있듯이, 아무리 객체 안 메서드로 존재한다 하더라도, 호출이 어떻게 되느냐에 따라 this 가 결정이 됩니다. 화살표함수는 ES6 에서 추가된 부분인데, 특징은 this 를 바인딩 하지 않기에 가장 큰처의 this 인 outer 를 가져옵니다.</p><br />

<p>콜백 함수를 호출할 시 내부 함수의 this 역시 함수의 호출 방식과 관계가 있습니다. 우선 콜백함수란 무엇일까요. 함수 A 의 제어권을 다른 함수 B 에게 넘겨주는 경우 함수 A를 콜백함수라고 합니다. 콜백함수는 보통 함수의 실행 순서를 정하기 위해 사용하곤 합니다. 일단은 대표적인 콜백함수를 살펴보겠습니다.</p><br />

```js
// 이때의 this는 전역객체입니다.
setTimeout(function () {
  console.log(this);
}, 1000);

// 역시나 this는 전역객체입니다.
[1, 2, 3, 4, 5].forEach(function (x) {
  console.log(this, x);
});

// 반면 addEventListener 는 지정한 엘리먼트에 이벤트를 바인딩합니다. 따라서 this 가 엘리먼트에 바인딩됩니다.
document.body.innerHTML = `<button id="a">클릭하세요</button>`;
document.body.querySelector("#a").addEventListener("click", function () {
  console.log(this);
});
```

<p>이 외 생성자 함수의 경우 생성자 함수에 의해 생성된 인스턴스들이 있다면, this 는 이 인스턴스에 바인딩 됩니다.</p>

### 명시적으로 바인딩 하는 방법

<p>이제 사용자가 직접 특정 객체를 바인딩 하는 방법에 대해 알아보겠습니다. 가장 대표적으로 call, apply, bind 메서드가 있습니다. 하나하나 살펴보겠습니다.</p><br />

<p>우선 call 메서드는 인자로서 바인딩할 객체와, 함수에 사용될 인자들을 차례대로 전달합니다. 우리가 함수를 호출할 때 함수호출과 메서드 호출이 있었듯이, 또 다른 방법으로 call 이 있습니다. 간단한 코드 예시를 살펴봅시다</p><br />

```js
var func = function (a, b) {
  console.log(this, a, b);
};

func(1, 2); // 전역객체, 1,2
func.call({ x: 1 }, 2, 3); // { x : 1 }, 2, 3
```

<p>call 을 통해서 this를 바인딩 할 수 있습니다. 이는 메서드도 마찬가지입니다.</p><br />

<p>apply 메서드 역시 call 과 완전히 동일한 기능을 제공합니다. 그러면 왜 call 과 apply 를 구별했을까요? apply 의 경우 전달하는 인자를 배열로 전달할 수 있습니다.이 차이밖에는 없습니다.</p><br />

<p>call 과 apply 는 ES5 기준으로 한가지 특징적인 기능으로 활용되는 방법이 있습니다. 바로 유사배열객체에 배열 메서드를 사용할 수 있도록 도와줄 수 있습니다. 물론 보통 객체는 안됩니다. 유사배열객체여야 합니다. 유사배열객체는 프로퍼티가 0부터 시작하는 숫자로 되어있으며, 마지막 프로퍼티가 length 인 객체를 말합니다. 이렇기에 유사배열이라고 표현합니다. 이러한 객체라도 객체이기에 배열의 메서드(filter, map, forEach, some 등등)을 사용할 수 없습니다. 하지만 call, apply 를 사용하면 이를 가능하게 해줍니다.</p><br />

```js
var obj = {
  0: a,
  1: b,
  2: c,
  length: 3,
};

var arr = Array.prototype.silce.call(obj);
console.log(arr); // [a,b,c]
```

<p>유사배열을 변경할때는 call 이나 apply 아무거나 사용해도 관계없습니다. 또한 함수 내부에서 접근할 수 있는 argument 객체 역시 유사배열객체이기에 배열로 변경이 가능합니다.</p><br />

```js
var func = function () {
  var argv = Array.prototype.slice.call(arguments);
  argv.forEach(function (arg) {
    console.log(arg);
  });
};

func(1, 2, 3); // 1,2,3 순서대로 호출
```

<p>실제로 이를 활용한 경험이 있었습니다. 이미지를 다수 저장할 경우 저장된 event.target.files 는 유사배열객체의 형태를 띄게 됩니다. 이를 서버에 전송하고자 FormData 에 하나씩 append 했어야 했는데, 이때 call 을 활용해서 배열의 메서드를 활용했습니다.</p><br />

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
  if (e.target.files && e.target.files[0]) {
    const imageFormData = new FormData(); // 멀티파트 형식으로 데이터 보내기
    [].forEach.call(e.target.files, (file) => {
      // call 을 활용해서 배열 메서드 사용하기
      imageFormData.append("image", file);
    });
    dispatch({
      type: t.UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }
};
```

<p>다만 너무 배열 메서드를 활용하는 용도로만 사용하면, 원래 목적인 this 의 바인딩이 희석될 수 있습니다. 따라서 이에 ES6 부터는 Array.from 메서드를 제공하거나 스프레드 연산자를 제공하여 유사배열객체를 배열로 변환시킬 수 있습니다. 또한 스프레드 연산자는 기존 apply 를 통해 인자를 배열로 전달할 수 있던 유일한 방안이었는데, 이후 스프레드 연산자로 이를 대신 해결할 수 있게 되었습니다. ES6 환경에서는 되도록 이를 활용합시다.</p><br />

<p>그 다음 bind 라는 메서드가 있습니다. bind 역시 this 를 바인딩해주지만, call 이나 apply 와 달리 바로 함수를 호출하지 않고, 그냥 this 를 변경시켜주는 것 까지만 진행이 됩니다. 그러니 추후 호출을 하더라도 bind 로 인해 this 가 특정 객체로 바인딩 된 상태로 호출할 수 있게 됩니다. 만일 this 를 바인딩 하고, 이후 초기 인자를 전달하였다면, 바로 실행되는것이 아니니 추후에 인자를 추가해서 호출하게 되면 기존 인자와 추가 인자가 모두 사용되게 됩니다.</p><br />

<p>bind 를 활용하면 실제 메서드 내부 함수선언문을 호출하게 될 경우 this 가 전역객체로 바인딩 되었었는데, 이를 변경할 수 있습니다. 쉽게 내부 함수 마지막에 .bind(this) 를 통해서 this 를 메서드 호출 때의 this 로 변경해줄 수 있습니다.</p><br />

```js
var obj3 = {
  logThis: function () {
    console.log(this); // 메서드 호출이니 this 는 obj3
  },
  logThisLater1: function () {
    setTimeout(this.logThis, 500); // 내부 콜백함수의 호출 시 this 가 obj3 일것 같지만, 메서드는 setTimeout 을 호출하는 것. 따라서 전역객체
  },
  logThisLater2: function () {
    setTimeout(this.logThis.bind(this), 1000); // this를 바인딩 해줌으로서 obj3 에 바인딩 됩니다.
  },
};

obj3.logThis();
obj3.logThisLater1();
obj3.logThisLater2();
```

<p>앞에서 화살표함수는 this 를 바인딩하지 않는다고 했습니다. 따라서 메서드 선언시 화살표함수로 하게 되면 알아서 가장 근처 this 로 바인딩하기 때문에(스코프체인을 따라) bind 를 사용할 필요가 없어집니다.</p><br />

<p>추가로 배열메서드를 활용 시 각 인자의 this 를 결정지어줄 수 있는 thisAvg 에 대해 살펴봅시다. 예를 들어 어떠한 객체 내 프로퍼티를 배열메서드가 반복을 돌면서 참조해야한다고 하겠습니다. 함수가 아니기에 내부에 변수는 프로퍼티로 선언이 될것이며, 이때 프로퍼티에 접근하기위해 this.a 와 같이 선언할 텐데, 이러한 경우 thisAvg 를 설정해주지 않는다면(콜백함수가 화살표 함수가 아닐때) 참조 오류가 발생합니다. 이때 thisAvg 를 설정해줄 수 있습니다.</p><br />

```js
const report = {
  sum : 0,
  count : 0,
  add: function(){
    let argv = Array.prototype.slice.call(arguments);
    argv.forEach(function(arg){
      this.sum += arg;
      this.count += 1;
    }, this)
  }
  get: function(){
    return this.sum
  }
}

report.add(10,20,30)
report.get() // 60

```

<p>this를 따로 bind 해주었다. 이로서 sum 을 참조할 수 있게 되었다.</p>
