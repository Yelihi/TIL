## Jsx란?

JSX(Javascript XML)이란 React에서 사용되는 javascript의 확장 문법이다. JSX는 XML과 유사한 구문을 사용하고 있고, 보통 함수 컴포넌트에서 UI를 구현할 때 훨씬 직관적으로 표현할 수 있게 해준다. (HTML Tag와 유사) <br />

- XML과 유사한 문법
- Javascript 표현식 삽입가능(`{}`)
- JSX요소는 React의 Element로 컴파일된다. (`<h1>hello</h1>` -> `React.createElement('h1', null, 'hello')`)
- JSX 요소에서는 HTML과 유사하게 속성을 지정할 수 있다.
- class 대신 className을 사용
- 조건문과 반복문 사용 가능

## 그럼 XML이란?

XML(Extensible Markup Language)는 다목적 마크업 언어로, 데이터를 저장하고 전송하기 위해 설계된 언어. XML은 사용자가 자신만의 태그를 정의하여 문서를 구조화할 수 있는 확장 가능한 형식을 제공. 이는 데이터를 계층적으로 나타내어 의미있는 구조를 갖게 하는데 사용된다. <br />

```
<configuration>
  <server>
    <host>example.com</host>
    <port>8080</port>
  </server>
  <database>
    <name>mydb</name>
    <username>user</username>
    <password>pass</password>
  </database>
</configuration>

```

<br />

XML은 여러 다른 마크업 언어와 달리, 데이터의 구조와 의미를 명확하게 표현하는데 중점을 두고 있다. 그러나 Json과 같은 경량 데이터형식이 대체하는 경우도 있다.
