import * as React from "react";
import {
  NavLink as ReactRouterLink,
  NavLinkProps as ReactRouterLinkProps,
} from "react-router-dom";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

export type LinkProps = ReactRouterLinkProps & ChakraLinkProps;
export const Link: React.FC<LinkProps> = (props) => {
  return <ChakraLink as={ReactRouterLink}  {...props} />;
};
