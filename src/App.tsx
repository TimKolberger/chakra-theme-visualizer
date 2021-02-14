import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeVisualizer } from "./components/ThemeVisualizer";
import { theme } from "./theme";
import { BrowserRouter, Redirect, Route } from "react-router-dom";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter basename="/">
      <Route path="/" exact render={() => <Redirect to="/theme/fonts" />} />
      <Route path="/theme/:section" exact>
        <ThemeVisualizer theme={theme} />
      </Route>
      <Route path="*" exact>
        Not found
      </Route>
    </BrowserRouter>
  </ChakraProvider>
);
