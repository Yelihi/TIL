import React from "react";

import { AppProviders } from "./providers/app-providers";
import { Application } from "./components/application/application";
import Skills from "./components/skills/skills";

const skills = ["HTML", "CSS", "Javascript"];

function App() {
  return (
    <AppProviders>
      <div className="App">
        <Skills skills={skills} />
      </div>
    </AppProviders>
  );
}

export default App;
