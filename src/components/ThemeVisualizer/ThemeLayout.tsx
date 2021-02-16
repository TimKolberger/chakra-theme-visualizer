import * as React from "react";
import { ChakraTheme } from "@chakra-ui/react";
import { Layout } from "../Layout";
import { ThemeSidebar } from "./ThemeSidebar";

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
