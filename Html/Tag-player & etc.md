## video

- src: 이미지와 마찮가지로 패스를 입력하자
- controls : 위 속성값이 주어진다면 유저가 비디오 컨트롤 권한을 가지게 된다.
- autoplay: 자동으로 실행된다
- loop: 계속 플레이 할 수 있게 한다
- muted: 소리를 자동으로 끄고 시작한다.
- poster: 비디오가 시작되기 전 먼저 보여주는 썸네일 같은 느낌
- preload: 페이지가 처음 로딩이 되었을 때 비디오도 로딩이 되어야 하는지에 대한 속성이다.
  - none: 재생을 누르기 전에는 다운되지 않는다
  - auto: 페이지 로딩 때 같이 로딩함

```html
<video src="/media/example.mp4" controls autoplay loop muted></video>
```

## source

<p>세상에는 여러 브라우저가 있고 버전도 여러가지다. 내가 만든 어플리케이션은 여러 브라우저 중 특정 브라우저에서 적용될 수 있도록 설정할 필요가 있다. 만약 비디오에 있어서 src 에 적은 형식은 익스플로러에서는 사용할 수 없는 것이라고 하면, 자식 요소인 source 에 익스플로러에 적용 가능한 파일형식을 등록해놓을 수 있다.</p>

```html
<video controls>
  <source src="myVideo.webm" type="video/webm" />
  <source src="myVideo.mp4" type="video/mp4" />
  <p>
    Your browser doesn't support HTML video. Here is a
    <a href="myVideo.mp4">link to the video</a> instead.
  </p>
</video>
```

> **audio**

- src : 역시나 video 와 같다
- controls
- autoplay
- loop
- muted
- preload

> **canvas**

<p>자바스크립트로 그림을 그릴 수 있는 영역을 잡아주는 요소이다.</p>

```html
<canvas id="myCanvas"></canvas>
<script>
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#DFDFDF";
  ctx.fillRect(0, 0, 80, 80);
</script>
```
