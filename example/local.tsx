import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { theme } from "../src/theme";
import { StandaloneThemeExplorer } from "../src";
import {
  Center,
  ChakraProvider,
  extendTheme,
  Spinner,
  ThemeOverride,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const FetchOverrideExplorer = () => {
  const { data, isLoading, error } = useQuery<ThemeOverride, Error>(
    "theme",
    () =>
      fetch("/theme").then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status}: ${res.statusText}`);
        }

        return res.json();
      })
  );

  const generatedTheme = React.useMemo(
    () => (data ? extendTheme(data) : null),
    [data]
  );

  if (!generatedTheme || isLoading) {
    return (
      <Center py="24">
        <Spinner />
      </Center>
    );
  }

  if (error) {
    return (
      <Center py={["8", "16", "24"]}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </Center>
    );
  }

  return <StandaloneThemeExplorer theme={generatedTheme} router="hash" />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <FetchOverrideExplorer />
    </ChakraProvider>
  </QueryClientProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
