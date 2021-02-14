import * as React from "react";
import {
  Box,
  BoxProps,
  chakra,
  ChakraTheme,
  List,
  ListItem,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import pick from "lodash/pick";
import startCase from "lodash/startCase";
import { Link } from "../Link";

export type ThemeSidebarProps = {
  theme: ChakraTheme;
} & BoxProps;

export const ThemeSidebar: React.FC<ThemeSidebarProps> = ({
  theme,
  ...boxProps
}) => {
  const headingColor = useColorModeValue("gray.600", "gray.400");
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverBg = useColorModeValue("teal.50", "teal.700");
  const linkCurrentBg = useColorModeValue("teal.100", "teal.600");

  const sections = {
    Typography: pick(theme, [
      "fonts",
      "fontSizes",
      "fontWeights",
      "letterSpacings",
      "lineHeights",
    ]),
    Foundations: pick(theme, [
      "borders",
      "breakpoints",
      "colors",
      "radii",
      "shadows",
      "sizes",
      "space",
      "transition",
      "zIndices",
    ]),
    Shared: pick(theme, ["layerStyles", "textStyles", "styles"]),
    Other: pick(theme, ["config", "direction"]),
  };

  const content = Object.entries(sections).map(
    ([sectionName, themePartial]) => {
      const items = Object.keys(themePartial).map((key) => (
        <ListItem key={key}>
          <Link
            d="block"
            textStyle="sidebar-link"
            py="1"
            px="2"
            borderRadius="md"
            color={linkColor}
            _hover={{ bg: linkHoverBg }}
            sx={{
              "&.active": {
                bg: linkCurrentBg,
                fontWeight: "bold",
              },
            }}
            to={`/theme/${key}`}
          >
            {startCase(key)}
          </Link>
        </ListItem>
      ));

      return (
        <React.Fragment key={sectionName}>
          <chakra.h4 textStyle="sidebar-title" color={headingColor}>
            {sectionName}
          </chakra.h4>
          <VStack as={List} align="stretch" spacing="1">
            {items}
          </VStack>
        </React.Fragment>
      );
    }
  );

  return (
    <Box as="nav" p="4" minW="48" {...boxProps}>
      {content}
    </Box>
  );
};
