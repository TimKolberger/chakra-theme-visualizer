import * as React from "react";
import { Box, ChakraTheme, List } from "@chakra-ui/react";
import { AutoGrid } from "../AutoGrid";
import { TokenItem, TokenItemProps } from "./TokenItem";

export type TokenGridProps = {
  minColWidth?: string;
  tokenVisualizer?: TokenItemProps["tokenVisualizer"];
  tokens: [string, string][];
  theme: ChakraTheme;
  description?: React.ReactNode;
};

export const TokenGrid: React.FC<TokenGridProps> = ({
  tokens,
  theme,
  tokenVisualizer,
  minColWidth = "md",
  description,
}) => {
  if (!tokens.length) {
    return null;
  }

  return (
    <>
      {description ? (
        <Box as="aside" p="8" pb="2">
          {description}
        </Box>
      ) : null}
      <AutoGrid
        as={List}
        px="2"
        pb="2"
        gap={["2", "8", "10"]}
        minColWidth={minColWidth}
        mt={["4", "8"]}
      >
        {tokens.map(([token, value]) => (
          <TokenItem
            key={token}
            token={token}
            value={value}
            theme={theme}
            tokenVisualizer={tokenVisualizer}
          />
        ))}
      </AutoGrid>
    </>
  );
};
