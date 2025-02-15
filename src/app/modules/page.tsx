"use client";

import { Box, Container } from "@mui/material";

import ModulesGrid from "./ModulesGrid";

export default function PlayerModules() {
  return (
    <Container sx={{ marginTop: "0.4em" }}>
      <Box className="flex gap-2">
        <ModulesGrid />
      </Box>
    </Container>
  );
}
