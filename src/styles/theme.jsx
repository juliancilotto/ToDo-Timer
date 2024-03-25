import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "linear-gradient(rgb(241,254,255), rgb(199,255,231) )",
        height: "100vh",
      },
    },
  },
  colors: {
    ...baseTheme.colors,
    brand: baseTheme.colors.cyan,
    semiDonutPrimary: "#2A4365",
    semiDonutSecundary: "#4299E1",
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          borderWidth: "1px",
        },
      },
    },

    Popover: {
      baseStyle: {
        footer: {
          py: "10px",
          px: "0",
        },
      },
    },
  },
});
