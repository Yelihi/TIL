import React, { useState, useCallback } from "react";

const Counter = () => {
  const [value, setValue] = useState(0);

  const onIncrease = useCallback(() => {
    setValue((prev) => prev + 1);
  }, []);

  const onDecrease = useCallback(() => {
    setValue((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h1>카운터</h1>
      <h2>{value}</h2>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </div>
  );
};

export default Counter;
