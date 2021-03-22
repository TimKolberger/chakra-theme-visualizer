import { BoxProps, Flex } from "@chakra-ui/react";
import * as React from "react";

export type LayoutProps = {
  sidebar?: React.ReactNode;
} & BoxProps;

export const Layout: React.FC<LayoutProps> = ({
  sidebar,
  children,
  ...boxProps
}) => {
  return (
    <Flex
      pos="relative"
      align="stretch"
      minH="100vh"
      flex="1 0 auto"
      {...boxProps}
    >
      {sidebar}
      <Flex flex="1" w="auto" overflow="hidden">
        {children}
      </Flex>
    </Flex>
  );
};
