"use client";

import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      dark: "#332268",
      main: "#483D8B",
      light: "#6c69ae",
    },
    secondary: {
      dark: "#472e6b",
      main: "#6e3d8b",
      light: "#9b5eab",
    },
    info: {
      dark: "#3d5a8b",
      main: "#508ac4",
      light: "#5eabe8",
    },
    background: { default: "#D8D8D8", paper: "#F0F0F0" },
  },

  status: {
    danger: orange[500],
  },
});

export default theme;
