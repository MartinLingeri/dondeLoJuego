import React from "react";
import {
  ChakraProvider,
  ColorModeScript,
} from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";

import customTheme from "./theme";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <>
    <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </>
);
