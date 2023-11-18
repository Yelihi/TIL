```tsx
import React from 'react'

type ButtonProps<T extends React.ElementType> = {
  as?: T,
  children?: React.ReactNode,
} & Omit<React.ComponentWithoutRef<T>, "as" | "children">


const Button = <C extends React.ElementType>({as, children, ...rest}: ButtonProps<C>) => {
  const Component = as || "button";
  return <Component {...rest}>{children}</Component>
}

export default const App = () => {
  const onSubmitData = () => {
    fetch('주소').then(res => res.json).then(data => console.log(data));
  }
  return (
    <div>
      <Button as="div">div로 변경하기</Button>
      <Button as="a" href="https://closet-online.com">클로젯으로 이동하기 링크<Button>
      <Button onClick={onSubmitData}>진짜버튼</Button>
  )
}

```
