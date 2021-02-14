import {
  Box,
  Center,
  ChakraTheme,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { ThemeLayout } from "../ThemeLayout";
import { useRouteMatch } from "react-router";
import startCase from "lodash/startCase";
import { createTokens, TokenTable, TokenTableProps } from "./TokenTable";
import { get } from "@chakra-ui/utils";

export type ThemeVisualizerProps = {
  theme: ChakraTheme;
};

export const ThemeVisualizer: React.FC<ThemeVisualizerProps> = ({ theme }) => {
  const match = useRouteMatch<{ section: keyof ChakraTheme }>();
  const { section } = match.params;
  const themeValue = theme[section];

  const title = startCase(section);
  const rowVisualizer = columnVisualizerMap[section];

  const tokenCreator = createCustomTokensMap[section] ?? createTokens;
  const tokens = tokenCreator(themeValue);

  return (
    <ThemeLayout theme={theme}>
      <VStack w="full" align="stretch">
        <Box as="header" p="8" pl="4">
          <Heading size="xl">{title}</Heading>
        </Box>
        <TokenTable
          title={title}
          theme={theme}
          columnVisualizer={rowVisualizer}
          tokens={tokens}
        />
      </VStack>
    </ThemeLayout>
  );
};

const createCustomTokensMap: Partial<
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

/**
 * Add a visualization column to the TokenTable
 */
const columnVisualizerMap: Partial<
  Record<keyof ChakraTheme, TokenTableProps["columnVisualizer"]>
> = {
  fonts: (row) => (
    <Box fontFamily={row.value}>
      Almost before we knew it, we had left the ground.
    </Box>
  ),

  fontSizes: (row) => (
    <Box overflow="hidden" maxW="calc(100vw - 28rem)">
      <Text fontSize={row.value} lineHeight={row.value} isTruncated>
        Almost before we knew it, we had left the ground.
      </Text>
    </Box>
  ),

  fontWeights: (row) => (
    <Box overflow="hidden" maxW="calc(100vw - 350px)">
      <Text fontWeight={row.value} isTruncated>
        Almost before we knew it, we had left the ground.
      </Text>
    </Box>
  ),

  letterSpacings: (row) => (
    <Box overflow="hidden" maxW="calc(100vw - 350px)">
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
