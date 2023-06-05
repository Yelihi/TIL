import React, { useState, useCallback } from "react";

const NameForm = ({ onInsert }) => {
  const [name, setName] = useState("");

  const onChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onInsert(name);
      setName("");
    },
    [name]
  );

  return (
    <form onSubmit={onSubmit}>
      <label for="name">이름</label>
      <input type="text" value={name} onChange={onChange} id="name" />
      <button type="submit">등록</button>
    </form>
  );
};

export default NameForm;
