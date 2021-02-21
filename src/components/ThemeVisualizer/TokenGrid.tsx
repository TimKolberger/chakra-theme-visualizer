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
      <Box as="aside" p="4" mb="4">
        {description}
      </Box>
      <AutoGrid as={List} px="2" pb="2" gap="4" minColWidth={minColWidth}>
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
