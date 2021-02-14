import * as React from "react";
import { ThemeExplorer } from "./components/ThemeExplorer";
import { theme } from "./theme";

export const App = () => (
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
