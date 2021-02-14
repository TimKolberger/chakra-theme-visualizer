import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeVisualizer } from "./components/ThemeVisualizer";
import { theme } from "./theme";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { NotFoundPage } from "./components/NotFoundPage";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter basename="/">
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/theme/fonts" />} />
        <Route path="/theme/:section" exact>
          <ThemeVisualizer theme={theme} />
        </Route>
        <Route path="*" exact component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  </ChakraProvider>
);
