import * as React from "react";
import {
  Box,
  BoxProps,
  chakra,
  HStack,
  Text,
  List,
  ListItem,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import pick from "lodash/pick";
import startCase from "lodash/startCase";
import { Link } from "../Link";
import { useThemeToExplore } from "../../providers/ThemeToExploreProvider";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { isObject } from "@chakra-ui/utils";

export type ThemeSidebarProps = BoxProps;

export const ThemeSidebar: React.FC<ThemeSidebarProps> = (props) => {
  const theme = useThemeToExplore();
  const bg = useColorModeValue("gray.50", "gray.700");
  const headingColor = useColorModeValue("gray.600", "gray.400");
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverBg = useColorModeValue("gray.50", "gray.700");
  const linkCurrentBg = useColorModeValue("gray.200", "gray.600");

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
    Shared: pick(theme, ["layerStyles", "textStyles"]),
    Other: pick(theme, ["config", "direction"]),
  };

  const content = Object.entries(sections).map(
    ([sectionName, themePartial]) => {
      const items = Object.entries(themePartial)
        .map(([key, value]) => {
          if (isObject(value) && !Object.keys(value).length) {
            return null;
          }

          return (
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
          );
        })
        .filter(Boolean);

      if (!items.length) {
        return null;
      }

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
    <Box
      align="flex-start"
      flex="0 0 auto"
      maxH="100vh"
      pos="sticky"
      top="0"
      overflowY="auto"
      as="nav"
      p="4"
      minW="60"
      alignSelf="stretch"
      bg={bg}
      {...props}
    >
      <HStack justify="space-between" mb="4">
        <Text fontWeight="bold">Theme Explorer</Text>
        <ColorModeSwitcher size="sm" fontSize="sm" />
      </HStack>
      {content}
    </Box>
  );
};
