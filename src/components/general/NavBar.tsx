"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import ProfileWidget from "../user/ProfileWidget";
import MenuButton from "./MenuButton";
import AuthButton from "../user/AuthButton";
import userStore from "../../datastore/user";

export function NavBar() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const smallMode = useMediaQuery(theme.breakpoints.down("md"));

  const [authenticated, dmID] = userStore((s) => [s.authenticated, s.dmUUID]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar variant="dense" sx={{ display: "flex", paddingX: "8px" }} disableGutters={true}>
          <MenuButton />

          <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => router.push("/")}>
            Moonsea Codex
          </Typography>

          <Box
            sx={{
              width: "32em",
              display: smallMode ? "none" : "flex",
              justifyContent: "center",
            }}
          >
            <Link href="/characters" passHref>
              <Button
                disabled={!authenticated}
                sx={{
                  color: theme.palette.common.white,
                  opacity: pathname === "/characters" ? 1 : 0.2,
                }}
              >
                Characters
              </Button>
            </Link>
            <Link href="/tradingpost/" passHref>
              <Button
                disabled={!authenticated}
                sx={{
                  color: theme.palette.common.white,
                  opacity: pathname === "/tradingpost" ? 1 : 0.2,
                }}
              >
                Trading Post
              </Button>
            </Link>
            <Link href="/itemvault" passHref>
              <Button
                disabled={!authenticated}
                sx={{
                  color: theme.palette.common.white,
                  opacity: pathname === "/itemvault" ? 1 : 0.2,
                }}
              >
                Item Vault
              </Button>
            </Link>
            <Link href={`/dungeonmaster/${dmID}`} passHref>
              <Button
                disabled={!dmID || !authenticated}
                sx={{
                  color: theme.palette.common.white,
                  opacity: pathname === `/dungeonmaster/${dmID}` ? 1 : 0.2,
                }}
              >
                DM Records
              </Button>
            </Link>
          </Box>
          <Box sx={{ width: "6em", display: "flex", justifyContent: "flex-end" }}>
            {(authenticated && <ProfileWidget />) || <AuthButton />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
