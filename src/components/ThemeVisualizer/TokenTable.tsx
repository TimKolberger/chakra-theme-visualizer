import * as React from "react";
import {
  Box,
  ChakraTheme,
  Code,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { get, isObject } from "@chakra-ui/utils";

export type TokenTableProps = {
  title: string;
  columnVisualizer?: TokenTableRowProps["columnVisualizer"];
  tokens: [string, string][];
  theme: ChakraTheme;
};
export const TokenTable: React.FC<TokenTableProps> = ({
  title,
  tokens,
  theme,
  columnVisualizer,
}) => {
  if (!tokens.length) {
    return null;
  }

  return (
    <Box overflow="auto">
      <Table size="sm">
        <TableCaption>Tokens for {title}</TableCaption>
        <Thead>
          <Tr>
            <Th w="20%">Token</Th>
            <Th w="30%">Value</Th>
            {columnVisualizer ? <Th>Visualization</Th> : null}
          </Tr>
        </Thead>
        <Tbody>
          {tokens.map(([token, value]) => (
            <TokenTableRow
              key={token}
              token={token}
              value={value}
              theme={theme}
              columnVisualizer={columnVisualizer}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

type TokenTableRowProps = {
  token: string;
  value: string;
  theme: ChakraTheme;
  columnVisualizer?: (
    row: Pick<TokenTableRowProps, "token" | "value" | "theme">
  ) => React.ReactNode;
};
const TokenTableRow = ({
  token,
  value,
  theme,
  columnVisualizer,
}: TokenTableRowProps) => {
  return (
    <Tr key={token}>
      <Td>{token}</Td>
      <Td>
        <Code>{value}</Code>
      </Td>
      {columnVisualizer ? (
        <Td>{columnVisualizer({ token, value, theme })}</Td>
      ) : null}
    </Tr>
  );
};

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
