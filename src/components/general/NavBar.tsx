"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button, AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

import ProfileWidget from "@/components/user/ProfileWidget";
import AuthButton from "@/components/user/AuthButton";
import MenuButton from "./MenuButton";
import { useUserStatus } from "@/data/fetch/auth";

export function NavBar() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { data: userStatus } = useUserStatus();

  const smallMode = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar variant="dense" sx={{ display: "flex", paddingX: "8px" }} disableGutters={true}>
          <MenuButton />

          <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => router.push("/")}>
            Moonsea Codex
          </Typography>

          {/* TODO: consider tabs */}
          <Box
            sx={{
              width: "32em",
              display: smallMode ? "none" : "flex",
              justifyContent: "center",
            }}
          >
            <Link href="/characters" passHref>
              <Button
                disabled={!userStatus?.authenticated}
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
                disabled={!userStatus?.authenticated}
                sx={{
                  color: theme.palette.common.white,
                  opacity: pathname.startsWith("/tradingpost") ? 1 : 0.2,
                }}
              >
                Trading Post
              </Button>
            </Link>
            <Link href="/itemvault" passHref>
              <Button
                disabled={!userStatus?.authenticated}
                sx={{
                  color: theme.palette.common.white,
                  opacity: pathname === "/itemvault" ? 1 : 0.2,
                }}
              >
                Item Vault
              </Button>
            </Link>
            <Link href={`/dungeonmaster/${userStatus?.dmUUID}`} passHref>
              <Button
                disabled={!userStatus?.dmUUID || !userStatus?.authenticated}
                sx={{
                  color: theme.palette.common.white,
                  opacity: pathname === `/dungeonmaster/${userStatus?.dmUUID}` ? 1 : 0.2,
                }}
              >
                DM Records
              </Button>
            </Link>
          </Box>
          <Box sx={{ width: "6em", display: "flex", justifyContent: "flex-end" }}>
            {(userStatus?.authenticated && <ProfileWidget />) || <AuthButton />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
