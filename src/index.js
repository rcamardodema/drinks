import React, { createRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Button } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F6B825",
    },
    secondary: {
      main: "#0d0f10",
    },
  },
});

const notistackRef = createRef();
const closeNotistackHandler = (key) => {
  notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <Button
              onClick={() => {
                closeNotistackHandler(key);
              }}
            >
              Close
            </Button>
          )}
        >
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
