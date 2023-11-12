## Image

<p>Next.js 에서는 이미지 파일을 업로드 할 떄 확장된 태그를 제공한다. 표현은 `Image` 로 사용하며 기존 태그에서 기능이 추가된 버전이다. next.js 를 활용한다면 이미지는 되도록 이 태그를 사용하는것을 권장한다. 왜냐하면 기본적으로 최적화기능이 포함되어 있기 때문이다.</p>

- 최신 이미지 형식을 사용하며, 디바이스 사이즈에 맞게 최적화된 이미지를 제공한다.
- Cumulative Layout Shift (CLS)를 자동으로 방지해준다. 이 말은 이미지가 로딩될 때와 로딩이 끝났을 때 크기에 따른 레이아웃의 변화가 생길 수 있는데, 이러한 이미지차이에 의한 레이아웃 변경을 막아준다.
- 이미지가 뷰포트에 들어왔을 때만 로드되기 때문에 초기 페이지 로딩 속도가 빠르다.
- 외부 이미지 역시 리사이징이 가능하다.

<p>이미지 최적화에 대해 좀 더 설명하자면, Next/Image 는 디바이스 별 srcSet을 미리 지정해두고, 사용자의 디바이스에 맞는 이미지를 다운하도록 조정한다. 또한 이미지를 webp와 같은 용량이 작은 포맷으로 이미지를 변환해서 제공한다. 역시나 초기 로딩때 next 서버에서 진행되며 이후 캐시화 하여 캐시가 만료될 때 까지 캐시 이미지를 제공하기에 로딩이 빠르다.</p>

## 사용법

<p>요구되어지는 props 가 있고 이를 채워주도록 하자. 이 props 는 필수이기 때문에 꼭 넣어주어야 한다.</p>

- src: 정적인 파일이나 외부 동적 파일을 불러올 수 있다. 단 외부 파일은 `remotePattenrs` 가 필요하다. (혹은 domain)

```js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};
```

- width, height: CLS 를 방지하기 위해서라도 반드시 입력되어야 한다. px 단위이며 만일 정적파일일 경우 생략이 가능하다. 왜냐하면 정적 파일 이미지의 크기로 설정되기 때문이다.
- alt : 역시 필수적으로 기입되어야 한다.

<p>그 외 부가적인 옵션은 [공식홈페이지](https://nextjs.org/docs/api-reference/next/image#remote-patterns)를 참고하자</p>

## Next/Image의 layout 속성

<p>Next/Image 컴포넌트에는 컨테이너 사이즈가 변경되었을 때 이미지 레이아웃이 어떻게 변경될지를 결정하는 layout이라는 props 가 있다.</p>

- intrinsic: default, 컨테이너 사이즈가 이미지 사이즈보다 작아졌을때 컨테이너에 맞게 크기를 줄임
- fixed: (컨테이너 사이즈와 관계없이) 이미지 사이즈를 width, height 속성값으로 고정
- responsive: 작은 컨테이너에서는 크기가 줄어들고, 큰 컨테이너에서는 크기가 늘어남(이미지 비율 유지)
- fill: relative 포지션을 가진 조상의 너비, 높이와 동일하게 조정함.

<p>width 와 height 속성은 layout 속성에 따라 의미가 달라진다. 예를 들어 layout 속성이 responsive, fill 일 경우 width와 height 의 사이즈가 원본 사이즈를 의미한다. 즉 비율로서 나타나기에 조상의 너비가 커지면 그 커진만큼 이미지도 사이즈가 증가하게 된다.</p>

## Image height: auto

<p>앞에서 속성값 height, width 는 고정이라고 하였다. 그렇기에 auto 를 넣고 싶은 상황에서는 어떻게 해야할까. 쉽게 생각하면, Image 를 감싸는 부모를 통해 자식 요소를 스타일 설정해줄 수도 있고, 인라인 스타일을 넣는 방법들이 있을 것이다.</p>

```ts
import Image, { ImageProps } from "next/image";

const AutoHeightImageWrapper = styled.div`
  width: 100%;
  & > span {
    position: unset !important;
    img {
      height: auto !important;
      position: relative !important;
    }
  }
`;

const AutoHeightImage = ({ ...props }: ImageProps) => {
  <AutoHeightImageWrapper>
    <Image layout='fill' {...props} />
  </AutoHeightImageWrapper>;
};

export default AutoHeightImage;
```

- 이처럼 부모 요소의 설정을 통해서 height: auto 를 설정할 수 있다.
- 아니면 Image 에 커스텀하게 설정을 해줄 수 있다.

```ts
const Img = styled(Image)`
  height: auto !important;
  position: relative !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 15px;
`;
```
