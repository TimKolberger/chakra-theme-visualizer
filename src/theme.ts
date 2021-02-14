import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
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
  styles: {
    global: {
      "html, body, #root": {
        minH: "100vh",
        display: "flex",
        flexDir: "column",
        flex: "1 0 auto",
      },
    },
  },
});
