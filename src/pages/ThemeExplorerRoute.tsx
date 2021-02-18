import * as React from "react";
import { useRouteMatch } from "react-router";
import { ChakraTheme } from "@chakra-ui/react";
import { ThemeVisualizer } from "../components/ThemeVisualizer";
import { ThemeLayout } from "../layouts";

export type ThemeExplorerRouteProps = {};

export const ThemeExplorerRoute: React.FC<ThemeExplorerRouteProps> = () => {
  const match = useRouteMatch<{ section: keyof ChakraTheme }>();
  const { section } = match.params;

  return (
    <ThemeLayout>
      <ThemeVisualizer section={section} />
    </ThemeLayout>
  );
};
