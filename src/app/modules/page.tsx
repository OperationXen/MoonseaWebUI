"use client";

import { useState } from "react";

import { Box, Container, TextField } from "@mui/material";

import ModulesGrid from "./ModulesGrid";

export default function PlayerModules() {
  const [search, setSearch] = useState("");

  return (
    <Container sx={{ marginTop: "0.4em" }}>
      <Box className="flex flex-col gap-2 w-full">
        <Box className="flex w-full">
          <TextField
            className="basis-1/2 min-w-96"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Search"
          />
        </Box>
        <ModulesGrid search={search} />
      </Box>
    </Container>
  );
}
