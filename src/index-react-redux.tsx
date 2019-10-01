import React, { StrictMode } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "Store";
import App from "app";
import { ThemeProvider } from "app/styled";

render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
  document.getElementById("react-container")
);
