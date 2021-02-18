import * as React from "react";
import { Box, Center, ChakraTheme, Flex, Text } from "@chakra-ui/react";
import { TokenTableProps } from "./TokenTable";
import { get, isObject } from "@chakra-ui/utils";

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

/**
 * Add a visualization column to the TokenTable
 */
export const columnVisualizerMap: Partial<
  Record<keyof ChakraTheme, TokenTableProps["columnVisualizer"]>
> = {
  fonts: (row) => (
    <Box fontFamily={row.value}>
      Almost before we knew it, we had left the ground.
    </Box>
  ),

  fontSizes: (row) => (
    <Box overflow="hidden" maxW="calc(100vw - 30rem)">
      <Text fontSize={row.value} lineHeight={row.value} isTruncated>
        Almost before we knew it, we had left the ground.
      </Text>
    </Box>
  ),

  fontWeights: (row) => (
    <Box overflow="hidden" maxW="calc(100vw - 30rem)">
      <Text fontWeight={row.value} isTruncated>
        Almost before we knew it, we had left the ground.
      </Text>
    </Box>
  ),

  letterSpacings: (row) => (
    <Box overflow="hidden" maxW="calc(100vw - 30rem)">
      <Text letterSpacing={row.value} isTruncated>
        Almost before we knew it, we had left the ground.
      </Text>
    </Box>
  ),

  lineHeights: (row) => (
    <Box overflow="hidden">
      <Text lineHeight={row.value} maxW="sm">
        Almost before we knew it, we had left the ground. Almost before we knew
        it, we had left the ground. Almost before we knew it, we had left the
        ground. Almost before we knew it, we had left the ground.
      </Text>
    </Box>
  ),

  borders: (row) => (
    <Box boxSize="12" background="teal.200" border={row.value} />
  ),

  breakpoints: (row) => (
    <Box fontSize="1rem" width={row.value} h="3" background="teal.200" />
  ),

  colors: (row) => (
    <Box background={row.value} boxSize="8" borderRadius="md" boxShadow="sm" />
  ),

  radii: (row) => <Box border="2px" borderRadius={row.value} boxSize="16" />,

  sizes: (row) => <Box width={row.value} h="3" background="teal.200" />,

  space: (row) => (
    <Flex>
      <Box mr={row.value} boxSize="2" background="teal.200" />
      <Box boxSize="2" background="teal.200" />
    </Flex>
  ),

  shadows: (row) => <Box shadow={row.value} boxSize="16" />,
  transition: (row) => {
    if (row.token.startsWith("property")) {
      return null;
    }

    if (row.token.startsWith("easing")) {
      return (
        <Center
          boxSize="16"
          bg="teal.100"
          fontSize="xs"
          _hover={{ bg: "blue.900", color: "gray.50" }}
          transitionTimingFunction={row.value}
          transitionDuration="ultra-slow"
        >
          hover me
        </Center>
      );
    }

    if (row.token.startsWith("duration")) {
      return (
        <Center
          boxSize="16"
          bg="teal.100"
          fontSize="xs"
          _hover={{ bg: "blue.900", color: "gray.50" }}
          transitionDuration={row.value}
        >
          hover me
        </Center>
      );
    }

    return null;
  },

  textStyles: (row) => {
    const sx = get(row.theme, `textStyles.${row.token}`);
    return (
      <Text sx={sx}>Almost before we knew it, we had left the ground.</Text>
    );
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
