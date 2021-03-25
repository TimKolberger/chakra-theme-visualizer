import {
  Box,
  ChakraTheme,
  Code,
  Heading,
  HStack,
  ListItem,
  Tooltip,
  useClipboard,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

export type TokenItemProps = {
  token: string;
  value: string;
  theme: ChakraTheme;
  tokenVisualizer?: (
    row: Pick<TokenItemProps, "token" | "value" | "theme">
  ) => React.ReactNode;
};

export const TokenItem = ({
  token,
  value,
  theme,
  tokenVisualizer,
}: TokenItemProps) => {
  const bg = useColorModeValue("gray.200", "gray.700");
  const visualizerBg = useColorModeValue("white", "gray.800");
  const { hasCopied, onCopy, value: copiedValue } = useClipboard(token);
  const copiedLabel = `Copied "${copiedValue}"`;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onCopy();
    }
  };

  const tokenVisualization = tokenVisualizer?.({ token, value, theme });
  const visualization = tokenVisualization ? (
    <Box bg={visualizerBg} px="6" py="6" flex="1">
      {tokenVisualization}
    </Box>
  ) : null;

  return (
    <ListItem
      bg={bg}
      transition="box-shadow 250ms ease-out"
      _hover={{ shadow: "lg" }}
      borderRadius="md"
      shadow="md"
      overflow="hidden"
      d="flex"
      flexDir="column"
      role="button"
      onKeyDown={handleKeyDown}
      onClick={onCopy}
      tabIndex={0}
      _focus={{
        outline: 0,
        shadow: "outline",
      }}
    >
      {visualization}
      <HStack
        spacing="2"
        p="6"
        py="4"
        overflowX="auto"
        align="baseline"
        flex="0 0 auto"
      >
        <Tooltip
          label={copiedLabel}
          isOpen={hasCopied}
          placement="bottom-start"
        >
          <Heading size="md" flexBasis="8ch">
            {token}
          </Heading>
        </Tooltip>
        <Code as="pre" whiteSpace="pre-wrap">
          {value}
        </Code>
      </HStack>
    </ListItem>
  );
};
