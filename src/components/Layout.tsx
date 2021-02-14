import { Flex } from "@chakra-ui/react";
import * as React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export type LayoutProps = {
  sidebar?: React.ReactNode;
};
export const Layout: React.FC<LayoutProps> = ({ sidebar, children }) => {
  return (
    <Flex pos="relative" flex="1">
      <ColorModeSwitcher pos="absolute" top="0" right="0" m="2" />
      {sidebar ? <Flex flex="0 0 auto" maxH="100vh" pos="sticky" top="0" overflowY="auto">{sidebar}</Flex> : null}
      <Flex flex="1" px="4" w="auto" overflow="hidden">
        {children}
      </Flex>
    </Flex>
  );
};
