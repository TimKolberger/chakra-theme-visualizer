import { Box, ChakraTheme, Heading, VStack } from "@chakra-ui/react";
import * as React from "react";
import startCase from "lodash/startCase";
import { TokenGrid } from "./TokenGrid";
import { useThemeToExplore } from "../../providers/ThemeToExploreProvider";
import {
  createTokens,
  tokenListConfig,
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
  const {
    tokenVisualizer,
    minColWidth,
    description,
    TokenListComponent = TokenGrid,
  } = tokenListConfig[section] ?? {
    tokenVisualizer: undefined,
    minColWidth: undefined,
  };

  const tokenCreator = createCustomTokensMap[section] ?? createTokens;
  const tokens = tokenCreator(themeValue);

  return (
    <VStack w="full" align="stretch">
      <Box as="header" pt="10" px="8">
        <Heading size="lg" fontWeight="300">
          {title}
        </Heading>
      </Box>
      <Box as="section">
        <TokenListComponent
          theme={theme}
          tokens={tokens}
          tokenVisualizer={tokenVisualizer}
          minColWidth={minColWidth}
          description={description}
        />
      </Box>
    </VStack>
  );
};
