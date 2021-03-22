import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    useSystemColorMode: false,
  },
  components: {
    Code: {
      defaultProps: {
        variant: "none",
      },
    },
    Table: {
      baseStyle: {
        caption: {
          textAlign: "left",
          mt: "0",
        },
      },
    },
  },
  textStyles: {
    "sidebar-title": {
      fontSize: "xs",
      fontWeight: "bold",
      my: "4",
      textTransform: "uppercase",
      letterSpacing: "wider",
      "&:first-of-type": {
        mt: "0",
      },
    },
    "sidebar-link": {
      fontSize: "sm",
    },
  },
});
