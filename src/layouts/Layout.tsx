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
    <Flex pos="relative" flex="1" align="stretch" {...boxProps}>
      {sidebar}
      <Flex flex="1" w="auto" overflow="hidden">
        {children}
      </Flex>
    </Flex>
  );
};
