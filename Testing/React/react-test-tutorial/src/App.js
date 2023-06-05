import "./App.css";
import React, { useState, useCallback } from "react";

import Counter from "./components/Counter";
import NameForm from "./components/NameForm";
import NameList from "./components/NameList";

function App() {
  const [names, setNames] = useState([]);

  const onInsert = useCallback(
    (name) => {
      setNames([name, ...names]);
    },
    [names]
  );

  return (
    <div className="App">
      <Counter />
      <hr />
      <h1>이름 목록</h1>
      <NameForm onInsert={onInsert} />
      <NameList names={names} />
    </div>
  );
}

export default App;
