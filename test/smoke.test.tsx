import * as React from "react";
import * as ReactDOM from "react-dom";
import { ThemeExplorer } from "../src";
import { theme } from "../src/theme";

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ThemeExplorer theme={theme} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
