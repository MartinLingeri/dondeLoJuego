import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const fonts = {
  body: `'BlinkMacSystemFont','Inter', 'Helvetica Neue',sans-serif`,
  rawg: `'Inter', sans-serif`,
};

const customTheme = extendTheme({
  config,
  fonts,
});

export default customTheme;
