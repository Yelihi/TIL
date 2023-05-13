```tsx
import React from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  isTitle?: boolean;
};

export const Button = (props: ButtonProps) => {
  const { children, isTitle, ...rest } = props;
  if (isTitle) {
  }
  return <button {...rest}>{children}</button>;
};

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Button onClick={() => alert("실험중")} type="button" isTitle={true}>
        실험중입니다
      </Button>
    </div>
  );
}
```
