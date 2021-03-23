import * as React from "react";
import { Box, Center, ChakraTheme, Code, Flex, Text } from "@chakra-ui/react";
import { TokenGridProps } from "./TokenGrid";
import { get, isObject } from "@chakra-ui/utils";
import { ColorGrid } from "./ColorGrid";

export function createTokens(value: unknown, maxDepth = 4): [string, string][] {
  if (!isObject(value) && !Array.isArray(value)) {
    return [["—", String(value)]];
  }

  const propertyPaths = extractPropertyPaths(value, maxDepth);
  return propertyPaths.map((path) => [path, String(get(value, path))]);
}

function extractPropertyPaths(target: unknown, maxDepth = 1) {
  if ((!isObject(target) && !Array.isArray(target)) || !maxDepth) {
    return [];
  }

  return Object.entries(target).reduce((allPropertyPaths, [key, value]) => {
    if (isObject(value)) {
      extractPropertyPaths(value, maxDepth - 1).forEach((childKey) =>
        // e.g. gray.500
        allPropertyPaths.push(`${key}.${childKey}`)
      );
    } else {
      // e.g. transparent
      allPropertyPaths.push(key);
    }

    return allPropertyPaths;
  }, [] as string[]);
}

export type TokenListConfig = Pick<
  TokenGridProps,
  "tokenVisualizer" | "description" | "minColWidth"
> & {
  TokenListComponent?: React.FC<TokenGridProps>;
};

/**
 * Add a visualization column to the TokenTable
 */
export const tokenListConfig: Partial<
  Record<keyof ChakraTheme, TokenListConfig>
> = {
  fonts: {
    minColWidth: "full",
    tokenVisualizer: (row) => (
      <Box fontFamily={row.value}>
        Almost before we knew it, we had left the ground.
      </Box>
    ),
    description: (
      <>
        Fonts can be applied with the prop <Code>fontFamily</Code> to every
        chakra component. E.g. <Code>{`<Text fontFamily="heading" />`}</Code>
      </>
    ),
  },

  fontSizes: {
    minColWidth: "full",
    tokenVisualizer: (row) => (
      <Box overflow="hidden" maxW="calc(100vw - 30rem)">
        <Text fontSize={row.value} lineHeight={row.value} isTruncated>
          Almost before we knew it, we had left the ground.
        </Text>
      </Box>
    ),
    description: (
      <>
        Font Sizes can be applied with the prop <Code>fontSize</Code> to every
        chakra component. E.g. <Code>{`<Text fontSize="lg" />`}</Code>
      </>
    ),
  },

  fontWeights: {
    minColWidth: "lg",
    tokenVisualizer: (row) => (
      <Box overflow="hidden" maxW="calc(100vw - 30rem)">
        <Text fontWeight={row.value} isTruncated>
          Almost before we knew it, we had left the ground.
        </Text>
      </Box>
    ),
    description: (
      <>
        Font Weights can be applied with the prop <Code>fontWeight</Code> to
        every chakra component. E.g. <Code>{`<Text fontWeight="bold" />`}</Code>
      </>
    ),
  },

  letterSpacings: {
    tokenVisualizer: (row) => (
      <Box overflow="hidden" maxW="calc(100vw - 30rem)">
        <Text letterSpacing={row.value} isTruncated>
          Almost before we knew it, we had left the ground.
        </Text>
      </Box>
    ),
    description: (
      <>
        Letter Spacings can be applied with the prop <Code>letterSpacing</Code>{" "}
        to every chakra component. E.g.{" "}
        <Code>{`<Text letterSpacing="wider" />`}</Code>
      </>
    ),
  },

  lineHeights: {
    tokenVisualizer: (row) => (
      <Box overflow="hidden">
        <Text lineHeight={row.value} maxW="sm">
          Almost before we knew it, we had left the ground. Almost before we
          knew it, we had left the ground. Almost before we knew it, we had left
          the ground. Almost before we knew it, we had left the ground.
        </Text>
      </Box>
    ),
    description: (
      <>
        Line Heights can be applied with the prop <Code>lineHeight</Code> to
        every chakra component. E.g.{" "}
        <Code>{`<Text lineHeight="short" />`}</Code>
      </>
    ),
  },

  borders: {
    tokenVisualizer: (row) => <Box h="16" w="full" border={row.value} />,
  },

  breakpoints: {
    minColWidth: "full",
    tokenVisualizer: (row) => (
      <Box fontSize="1rem" width={row.value} h="3" background="blue.200" />
    ),
  },

  colors: {
    TokenListComponent: ColorGrid,
    minColWidth: "2xs",
    tokenVisualizer: (row) => (
      <Box
        background={row.value}
        h="8"
        w="full"
        borderRadius="md"
        boxShadow="sm"
      />
    ),
  },

  radii: {
    tokenVisualizer: (row) => (
      <Box border="2px" borderRadius={row.value} h="16" w="full" />
    ),
  },

  sizes: {
    tokenVisualizer: (row) => (
      <Box width={row.value} h="3" background="blue.200" />
    ),
  },

  space: {
    minColWidth: "lg",
    tokenVisualizer: (row) => (
      <Flex>
        <Box mr={row.value} boxSize="3" background="blue.200" />
        <Box boxSize="3" background="blue.200" />
      </Flex>
    ),
  },

  shadows: {
    minColWidth: "lg",
    tokenVisualizer: (row) => <Box shadow={row.value} h="16" w="full" />,
  },

  transition: {
    tokenVisualizer: (row) => {
      if (row.token.startsWith("property")) {
        return null;
      }

      const commonProps = {
        h: "16",
        w: "full",
        bg: "blue.100",
        fontSize: "xs",
        color: "gray.900",
        _hover: { bg: "blue.900", color: "gray.50" },
      };

      if (row.token.startsWith("easing")) {
        return (
          <Center
            {...commonProps}
            transitionTimingFunction={row.value}
            transitionDuration="ultra-slow"
          >
            hover me
          </Center>
        );
      }

      if (row.token.startsWith("duration")) {
        return (
          <Center {...commonProps} transitionDuration={row.value}>
            hover me
          </Center>
        );
      }

      return null;
    },
  },

  textStyles: {
    tokenVisualizer: (row) => {
      const sx = get(row.theme, `textStyles.${row.token}`);
      return (
        <Text sx={sx}>Almost before we knew it, we had left the ground.</Text>
      );
    },
  },
};

export const createCustomTokensMap: Partial<
  Record<
    keyof ChakraTheme,
    (themeValue: any) => ReturnType<typeof createTokens>
  >
> = {
  textStyles: (themeValue: ChakraTheme["textStyles"]) =>
    themeValue
      ? Object.entries(themeValue).map(([key, value]) => [
          key,
          JSON.stringify(value, null, 2),
        ])
      : [],

  styles: (themeValue: ChakraTheme["styles"]) =>
    themeValue
      ? Object.entries(themeValue).map(([key, value]) => [
          key,
          JSON.stringify(value, null, 2),
        ])
      : [],
};
