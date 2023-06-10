import React from "react";

import { Application } from "./components/application/application";
import Skills from "./components/skills/skills";

const skills = ["HTML", "CSS", "Javascript"];

function App() {
  return (
    <div className="App">
      <Skills skills={skills} />
    </div>
  );
}

export default App;
