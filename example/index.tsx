import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { theme } from "../src/theme";
import { StandaloneThemeExplorer } from "../src";

const App = () => <StandaloneThemeExplorer theme={theme} router="hash" />;

ReactDOM.render(<App />, document.getElementById("root"));
