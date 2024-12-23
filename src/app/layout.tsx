import * as React from "react";
import type { Metadata } from "next";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { StyledEngineProvider } from "@mui/material/styles";

import { CssBaseline } from "@mui/material";
import NavBar from "@/components/general/NavBar";
import Snackbar from "@/components/general/Snackbar";

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
      <body>
        <ReactQueryProvider>
          <StyledEngineProvider injectFirst>
            <CssBaseline>
              <div id="root">
                <NavBar />
                {children}
                <Snackbar />
              </div>
            </CssBaseline>
          </StyledEngineProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
