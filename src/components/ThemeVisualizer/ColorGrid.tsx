import * as React from "react";
import { Box, List, VStack } from "@chakra-ui/react";
import { AutoGrid } from "../AutoGrid";
import { TokenGridProps } from "./TokenGrid";
import { TokenItem } from "./TokenItem";

export const ColorGrid: React.FC<TokenGridProps> = ({
  tokens,
  theme,
  tokenVisualizer,
  minColWidth = "md",
  description,
}) => {
  if (!tokens.length) {
    return null;
  }

  const colorSchemes = tokens.reduce(
    (allColorSchemes, [token, value], index, all) => {
      const prev = all[index - 1];
      const [firstTokenPart] = token.split(".");

      if (prev?.[0].startsWith(firstTokenPart)) {
        allColorSchemes[allColorSchemes.length - 1].push([token, value]);
      } else {
        allColorSchemes.push([[token, value]]);
      }

      return allColorSchemes;
    },
    [] as [string, string][][]
  );

  return (
    <>
      <Box as="aside" p="4" mb="4">
        {description}
      </Box>
      <VStack align="stretch" spacing={["8", "16"]}>
        {colorSchemes.map((colorScheme, index) => (
          <AutoGrid
            as={List}
            key={index}
            px="2"
            pb={["2", "4"]}
            gap={["4", "8"]}
            minColWidth={minColWidth}
          >
            {colorScheme.map(([token, value]) => (
              <TokenItem
                key={token}
                token={token}
                value={value}
                theme={theme}
                tokenVisualizer={tokenVisualizer}
              />
            ))}
          </AutoGrid>
        ))}
      </VStack>
    </>
  );
};
