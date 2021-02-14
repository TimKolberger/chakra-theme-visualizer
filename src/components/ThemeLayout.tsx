import * as React from "react";
import { ThemeSidebar } from "./ThemeVisualizer";
import { Layout } from "./Layout";
import { ChakraTheme } from "@chakra-ui/react";

export type ThemeLayoutProps = {
  theme: ChakraTheme;
};
export const ThemeLayout: React.FC<ThemeLayoutProps> = ({
  theme,
  children,
}) => {
  return (
    <Layout sidebar={<ThemeSidebar theme={theme} />} children={children} />
  );
};
