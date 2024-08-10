"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import ProfileWidget from "../user/ProfileWidget";
import MenuButton from "./MenuButton";
import AuthButton from "../user/AuthButton";
import userStore from "../../datastore/user";

export default function Titlebar() {
  const theme = useTheme();
  const pathname = usePathname();

  const smallMode = useMediaQuery(theme.breakpoints.down("md"));

  const [authenticated, dmID] = userStore((s) => [s.authenticated, s.dmUUID]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar variant="dense" sx={{ display: "flex" }}>
          <MenuButton />
          <Link href="/" passHref>
            <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }}>
              Moonsea Codex
            </Typography>
          </Link>
          <Box
            sx={{
              width: "32em",
              display: smallMode ? "none" : "flex",
              justifyContent: "center",
            }}
          >
            <Link href="/" passHref>
              <Button color="inherit" disabled={!authenticated || pathname === "/"}>
                Dashboard
              </Button>
            </Link>
            <Link href="/tradingpost/" passHref>
              <Button disabled={!authenticated || pathname.includes("/tradingpost")} color="inherit">
                Trading Post
              </Button>
            </Link>
            <Link href="/itemvault" passHref>
              <Button disabled={!authenticated || pathname.includes("/itemvault")} color="inherit">
                Item Vault
              </Button>
            </Link>
            <Link href={`/dungeonmaster/${dmID}`} passHref>
              <Button disabled={!dmID || pathname.includes("/dungeonmaster")} color="inherit">
                DM Records
              </Button>
            </Link>
          </Box>
          <Box sx={{ width: "6em", display: "flex", justifyContent: "center" }}>
            {(authenticated && <ProfileWidget />) || <AuthButton />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
