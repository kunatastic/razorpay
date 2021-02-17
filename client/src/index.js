import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ChakraProvider, CSSReset } from "@chakra-ui/react";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <CSSReset />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  rootElement
);
