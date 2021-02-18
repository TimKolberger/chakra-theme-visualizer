import { Box, ChakraTheme, Heading, VStack } from "@chakra-ui/react";
import * as React from "react";
import startCase from "lodash/startCase";
import { TokenTable } from "./TokenTable";
import { useThemeToExplore } from "../../providers/ThemeToExploreProvider";
import {
  createTokens,
  columnVisualizerMap,
  createCustomTokensMap,
} from "./configuration";

export type ThemeVisualizerProps = {
  section: keyof ChakraTheme;
};

export const ThemeVisualizer: React.FC<ThemeVisualizerProps> = ({
  section,
}) => {
  const theme = useThemeToExplore();
  const themeValue = theme[section];

  const title = startCase(section);
  const rowVisualizer = columnVisualizerMap[section];

  const tokenCreator = createCustomTokensMap[section] ?? createTokens;
  const tokens = tokenCreator(themeValue);

  return (
    <VStack w="full" align="stretch">
      <Box as="header" pt="10" pb="8" px="4">
        <Heading size="lg" fontWeight="300">{title}</Heading>
      </Box>
      <TokenTable
        title={title}
        theme={theme}
        columnVisualizer={rowVisualizer}
        tokens={tokens}
      />
    </VStack>
  );
};
