import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { theme } from "../src/theme";
import { ThemeExplorer } from "../src";

const App = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Chakra Theme Explorer Demo</h1>
      </div>
      <ThemeExplorer theme={theme} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
