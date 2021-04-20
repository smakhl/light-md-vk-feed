import React, { useState, useEffect } from "react";
// import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { getIsLoggedIn, login } from "../vk";
import Button from "@material-ui/core/Button";
import { Feed } from "./Feed";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoggedIn(await getIsLoggedIn());
      console.log("🚀 ~ isLoggedIn", isLoggedIn);
    })();
  }, [isLoggedIn]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn === null && <CircularProgress />}
      {isLoggedIn === false && (
        <Button
          variant="contained"
          onClick={async () => {
            await login();
            setIsLoggedIn(true);
          }}
        >
          LOG IN
        </Button>
      )}
      {isLoggedIn === true && <Feed />}
    </ThemeProvider>
  );
}
