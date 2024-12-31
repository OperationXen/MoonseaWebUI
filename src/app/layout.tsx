import * as React from "react";
import type { Metadata } from "next";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { StyledEngineProvider } from "@mui/material/styles";

import { CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "@/components/general/NavBar";
import Snackbar from "@/components/general/Snackbar";

import customTheme from "@/theme";
import "../global.css";

export const metadata: Metadata = {
  title: "Moonsea Codex",
  description: "An adventurers league character journal from Triden games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <ReactQueryProvider>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={customTheme}>
              <CssBaseline>
                <div id="root">
                  <NavBar />
                  {children}
                  <Snackbar />
                </div>
              </CssBaseline>
            </ThemeProvider>
          </StyledEngineProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
