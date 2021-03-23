import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { theme } from "../src/theme";
import { ThemeExplorer } from "../src";
import {
  Center,
  ChakraProvider,
  VStack,
  Text,
  Heading,
  chakra,
  useColorModeValue,
  HStack,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../src/components/ColorModeSwitcher";
import { FaGithub } from "react-icons/fa";

const HomeScreen = () => (
  <Center h="100vh" mx="auto" w="full" maxW="5xl">
    <VStack
      align="flex-start"
      borderRadius="2xl"
      bg={useColorModeValue("gray.100", "gray.700")}
      color={useColorModeValue("gray.900", "gray.50")}
      p="8"
      pb="10"
      spacing="6"
    >
      <VStack align="stretch">
        <HStack>
          <Text
            textTransform="uppercase"
            size="sm"
            fontWeight="semibold"
            color={useColorModeValue("gray.600", "gray.400")}
            mr="auto"
          >
            Chakra UI Tooling
          </Text>
          <IconButton
            as={Link}
            icon={<FaGithub />}
            aria-label="Open GitHub Repository"
            isExternal
            href="https://github.com/TimKolberger/chakra-theme-visualizer"
            variant="ghost"
            size="sm"
          />
          <ColorModeSwitcher size="sm" fontSize="sm" />
        </HStack>

        <Heading size="4xl">
          <chakra.span color="teal.500">Chakra UI</chakra.span>
          Theme Explorer
        </Heading>
      </VStack>
      <Text>Open the Theme Explorer in the right bottom corner</Text>
    </VStack>
  </Center>
);

const App = () => (
  <ChakraProvider theme={theme}>
    <HomeScreen />
    <ThemeExplorer theme={theme} />
  </ChakraProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
