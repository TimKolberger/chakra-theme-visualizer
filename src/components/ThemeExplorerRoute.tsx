import * as React from "react";
import { useRouteMatch } from "react-router";
import { ChakraTheme } from "@chakra-ui/react";
import { ThemeVisualizer } from "./ThemeVisualizer";

export type ThemeExplorerRouteProps = {
  theme: ChakraTheme;
};
export const ThemeExplorerRoute: React.FC<ThemeExplorerRouteProps> = ({
  theme,
}) => {
  const match = useRouteMatch<{ section: keyof ChakraTheme }>();
  const { section } = match.params;

  return <ThemeVisualizer theme={theme} section={section} />;
};
