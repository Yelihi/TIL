```tsx
import React, { useCallback } from "react";

const useConfirm = (
  description: string,
  onSubmit: () => void,
  onCencel: () => void
) => {
  const confirm = useCallback(() => {
    // 알람창이 뜨고, yes 를 하면 true 가 된다.
    // 그러면 제출한다
    if (window.confirm(description)) {
      onSubmit();
    } else {
      onCencel();
    }
  }, [description, onSubmit, onCencel]);

  return confirm;
};

export default useConfirm;
```
