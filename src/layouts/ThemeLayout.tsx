import * as React from "react";
import { Layout } from "./Layout";
import { ThemeSidebar } from "../components/ThemeVisualizer";
import { Box, useColorModeValue } from "@chakra-ui/react";

export type ThemeLayoutProps = {};
export const ThemeLayout: React.FC<ThemeLayoutProps> = ({ children }) => {
  const bg = useColorModeValue("gray.50", "gray.700");
  const contentBg = useColorModeValue("gray.100", "gray.900");

  return (
    <Layout sidebar={<ThemeSidebar />} bg={bg}>
      <Box
        as="main"
        borderRadius="md"
        bg={contentBg}
        m="2"
        flex="1"
        p={["2", "8", "10"]}
        overflow="hidden"
      >
        {children}
      </Box>
    </Layout>
  );
};
